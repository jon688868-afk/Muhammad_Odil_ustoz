#!/usr/bin/env python3
"""
IBXI – Imom Buxoriy Xalqaro Instituti  |  Admin API Server v2.0

Security-hardened HTTP server with SQLite backend.
Python 3 standard library only — no external dependencies.

Security features:
  - PBKDF2 password hashing with random salt
  - CSRF token validation on state-changing requests
  - Rate limiting on login endpoint
  - Security headers (CSP, X-Frame-Options, etc.)
  - Magic byte file validation for uploads
  - Max request body size enforcement
  - No information disclosure in error messages
  - Audit logging for all admin actions
"""

import http.server
import json
import os
import re
import hashlib
import secrets
import shutil
import time
import uuid
import io
from datetime import datetime
from urllib.parse import urlparse, parse_qs
from http.cookies import SimpleCookie

import database as db

# ─── Configuration ─────────────────────────────────────────────────────────

PORT = 8765
HOST = '127.0.0.1'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'assets', 'js', 'data.js')
BACKUP_DIR = os.path.join(BASE_DIR, 'backups')
CONFIG_FILE = os.path.join(BASE_DIR, 'admin_config.json')
UPLOAD_DIR = os.path.join(BASE_DIR, 'assets', 'uploads')

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
MAX_UPLOAD_SIZE = 5 * 1024 * 1024     # 5 MB
MAX_BODY_SIZE = 10 * 1024 * 1024      # 10 MB
SESSION_DURATION = 86400              # 24 hours
PBKDF2_ITERATIONS = 260_000

# Rate limiting
MAX_LOGIN_ATTEMPTS = 5
RATE_WINDOW = 300  # 5 minutes

# Magic bytes for file type validation
MAGIC_BYTES = {
    b'\xff\xd8\xff':       '.jpg',   # JPEG
    b'\x89PNG\r\n\x1a\n':  '.png',   # PNG
    b'GIF87a':              '.gif',   # GIF87a
    b'GIF89a':              '.gif',   # GIF89a
}

# ─── In-memory state ───────────────────────────────────────────────────────

# sessions: { token: { 'expires': float, 'csrf': str } }
sessions = {}

# rate_limits: { ip: [timestamp, ...] }
rate_limits = {}


# ─── Password Management (PBKDF2) ─────────────────────────────────────────

def hash_password(password, salt=None):
    """Hash a password using PBKDF2-HMAC-SHA256 with a random salt."""
    if salt is None:
        salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac(
        'sha256', password.encode('utf-8'), salt, PBKDF2_ITERATIONS
    )
    return salt.hex() + ':' + key.hex()


def verify_password(password, stored_hash):
    """Verify a password against a stored PBKDF2 hash."""
    if ':' not in stored_hash:
        # Legacy SHA256 format — verify and signal migration needed
        legacy_hash = hashlib.sha256(password.encode()).hexdigest()
        return legacy_hash == stored_hash
    salt_hex, key_hex = stored_hash.split(':', 1)
    salt = bytes.fromhex(salt_hex)
    key = hashlib.pbkdf2_hmac(
        'sha256', password.encode('utf-8'), salt, PBKDF2_ITERATIONS
    )
    return key.hex() == key_hex


def load_password_hash():
    """Load password hash from config file."""
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r') as f:
                cfg = json.load(f)
            return cfg.get('password_hash', '')
        except Exception:
            pass
    return ''


def save_password_hash(new_hash):
    """Save password hash to config file."""
    cfg = {}
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r') as f:
                cfg = json.load(f)
        except Exception:
            pass
    cfg['password_hash'] = new_hash
    with open(CONFIG_FILE, 'w') as f:
        json.dump(cfg, f, indent=2)


def ensure_password_exists():
    """On first run, generate a random password if none is set."""
    stored = load_password_hash()
    if not stored:
        default_pwd = secrets.token_urlsafe(12)
        hashed = hash_password(default_pwd)
        save_password_hash(hashed)
        print(f'\n  ╔══════════════════════════════════════════════╗')
        print(f'  ║  BIRINCHI ISHGA TUSHIRISH                     ║')
        print(f'  ║  Admin paroli avtomatik yaratildi:             ║')
        print(f'  ║  >>> {default_pwd:<40} ║')
        print(f'  ║  Iltimos, bu parolni saqlab qo\'ying!          ║')
        print(f'  ╚══════════════════════════════════════════════╝\n')
        return
    # Migrate legacy SHA256 hash to PBKDF2 on next successful login
    if ':' not in stored:
        print('  [INFO] Legacy parol formati aniqlandi. Keyingi kirishda yangilanadi.')


# ─── Rate Limiting ─────────────────────────────────────────────────────────

def check_rate_limit(ip):
    """Return True if the request is within rate limits, False if blocked."""
    now = time.time()
    if ip not in rate_limits:
        rate_limits[ip] = []
    # Clean old entries
    rate_limits[ip] = [t for t in rate_limits[ip] if now - t < RATE_WINDOW]
    if len(rate_limits[ip]) >= MAX_LOGIN_ATTEMPTS:
        return False
    rate_limits[ip].append(now)
    return True


# ─── Session Management ───────────────────────────────────────────────────

def create_session():
    """Create a new session, returning (token, csrf_token)."""
    clean_expired_sessions()
    token = secrets.token_hex(32)
    csrf = secrets.token_hex(32)
    sessions[token] = {
        'expires': time.time() + SESSION_DURATION,
        'csrf': csrf,
    }
    return token, csrf


def check_auth(headers):
    """Validate authentication from Authorization header or Cookie.
    Returns (is_valid, token_str)."""
    token = None

    # Try Authorization header first
    auth = headers.get('Authorization', '')
    if auth.startswith('Bearer '):
        token = auth[7:]

    # Fallback to cookie
    if not token:
        cookie_str = headers.get('Cookie', '')
        cookie = SimpleCookie()
        try:
            cookie.load(cookie_str)
        except Exception:
            pass
        if 'ibxi_token' in cookie:
            token = cookie['ibxi_token'].value

    if not token:
        return False, None

    session = sessions.get(token)
    if session and session['expires'] > time.time():
        return True, token

    # Clean up expired token
    sessions.pop(token, None)
    return False, None


def check_csrf(headers, token):
    """Validate CSRF token for state-changing requests."""
    session = sessions.get(token)
    if not session:
        return False
    csrf_header = headers.get('X-CSRF-Token', '')
    return csrf_header == session['csrf']


def clean_expired_sessions():
    """Remove expired sessions."""
    now = time.time()
    expired = [t for t, s in sessions.items() if s['expires'] <= now]
    for t in expired:
        del sessions[t]


# ─── File Upload Validation ───────────────────────────────────────────────

def validate_file_magic(data, claimed_ext):
    """Validate file content matches its claimed extension using magic bytes."""
    # Check binary magic bytes
    for magic, ext in MAGIC_BYTES.items():
        if data[:len(magic)] == magic:
            return True

    # WebP check (RIFF header + WEBP at offset 8)
    if claimed_ext == '.webp' and data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        return True

    # SVG check (XML-based)
    if claimed_ext == '.svg':
        text_start = data[:500].decode('utf-8', errors='ignore').strip().lower()
        if '<svg' in text_start or '<?xml' in text_start:
            return True

    return False


# ─── Multipart Parser (replaces deprecated cgi module) ─────────────────────

def parse_multipart(headers, body):
    """Parse multipart/form-data without the deprecated cgi module.
    Returns dict of {field_name: {'filename': str, 'data': bytes}}."""
    content_type = headers.get('Content-Type', '')
    boundary_match = re.search(r'boundary=([^\s;]+)', content_type)
    if not boundary_match:
        return {}

    boundary = boundary_match.group(1).encode('utf-8')
    delimiter = b'--' + boundary
    end_delimiter = delimiter + b'--'

    parts = body.split(delimiter)
    result = {}

    for part in parts:
        part = part.strip()
        if not part or part == b'--' or part.startswith(b'--'):
            continue

        # Split headers from body
        if b'\r\n\r\n' in part:
            head, file_data = part.split(b'\r\n\r\n', 1)
        elif b'\n\n' in part:
            head, file_data = part.split(b'\n\n', 1)
        else:
            continue

        # Remove trailing boundary markers
        if file_data.endswith(b'\r\n'):
            file_data = file_data[:-2]

        head_str = head.decode('utf-8', errors='replace')

        # Extract field name
        name_match = re.search(r'name="([^"]+)"', head_str)
        if not name_match:
            continue
        field_name = name_match.group(1)

        # Extract filename if present
        filename = None
        fn_match = re.search(r'filename="([^"]*)"', head_str)
        if fn_match:
            filename = fn_match.group(1)

        result[field_name] = {
            'filename': filename,
            'data': file_data,
        }

    return result


# ─── data.js Read/Write (for backward compatibility + migration) ──────────

DATA_HEADER = """\
// IBXI - Imom Buxoriy Xalqaro Instituti | APPLICATION DATA
// Auto-generated from database. Do not edit manually.
"""

SECTION_COMMENTS = [
    ('i18n',          '1. TRANSLATIONS'),
    ('news',          '2. NEWS'),
    ('researchAreas', '3. RESEARCH AREAS'),
    ('events',        '4. EVENTS'),
    ('publications',  '5. PUBLICATIONS'),
    ('team',          '6. TEAM'),
    ('programs',      '7. PROGRAMS'),
    ('videos',        '8. VIDEOS'),
    ('faq',           '9. FAQ'),
    ('blogPosts',     '10. BLOG POSTS'),
    ('testimonials',  '11. TESTIMONIALS'),
    ('gallery',       '12. GALLERY'),
]


def read_data_js():
    """Parse data.js and return the DATA object as a Python dict."""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    start_marker = 'const DATA = {'
    start_idx = content.index(start_marker) + len(start_marker) - 1
    end_idx = content.rindex('};') + 1
    js_obj = content[start_idx:end_idx]
    lines = js_obj.split('\n')
    cleaned = [l for l in lines if not l.strip().startswith('//')]
    js_obj = '\n'.join(cleaned)
    js_obj = re.sub(r'(?m)^(\s*)([a-zA-Z_]\w*)(\s*:)', r'\1"\2"\3', js_obj)
    js_obj = re.sub(r'([{,]\s*)([a-zA-Z_]\w*)(\s*:)', r'\1"\2"\3', js_obj)
    js_obj = re.sub(r',(\s*[}\]])', r'\1', js_obj)
    try:
        return json.loads(js_obj)
    except json.JSONDecodeError:
        js_obj = re.sub(r'//[^\n]*', '', js_obj)
        js_obj = re.sub(r',(\s*[}\]])', r'\1', js_obj)
        return json.loads(js_obj)


def write_data_js(data):
    """Write the DATA dict back to data.js."""
    output = DATA_HEADER + '\nconst DATA = {\n'
    for i, (key, comment) in enumerate(SECTION_COMMENTS):
        if key not in data:
            continue
        output += f'\n// === {comment} ===\n'
        value_json = json.dumps(data[key], indent=2, ensure_ascii=False)
        output += f'{key}: {value_json}'
        if i < len(SECTION_COMMENTS) - 1:
            output += ','
        output += '\n'
    output += '\n}; // end DATA\n'
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(output)


def create_backup():
    """Create a timestamped backup of the database."""
    os.makedirs(BACKUP_DIR, exist_ok=True)
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'ibxi_backup_{ts}.db'
    dest = os.path.join(BACKUP_DIR, filename)
    shutil.copy2(db.DB_PATH, dest)
    return filename


# ─── Request Handler ───────────────────────────────────────────────────────

class IBXIHandler(http.server.SimpleHTTPRequestHandler):
    """Security-hardened HTTP handler with REST API."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, fmt, *args):
        path = args[0].split()[1] if args else ''
        if '/api/' in str(path):
            super().log_message(fmt, *args)

    def end_headers(self):
        """Add security headers to all responses."""
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
        self.send_header('Content-Security-Policy',
            "default-src 'self'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: blob:; "
            "script-src 'self' 'unsafe-inline'; "
            "connect-src 'self'")
        super().end_headers()

    def get_client_ip(self):
        """Get client IP address."""
        forwarded = self.headers.get('X-Forwarded-For', '')
        if forwarded:
            return forwarded.split(',')[0].strip()
        return self.client_address[0]

    def send_json(self, status, data):
        """Send a JSON response."""
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.end_headers()
        self.wfile.write(body)

    def require_auth(self):
        """Check authentication, return token or None (sends 401 on failure)."""
        valid, token = check_auth(self.headers)
        if not valid:
            self.send_json(401, {'error': 'Unauthorized'})
            return None
        return token

    def require_csrf(self, token):
        """Check CSRF token, return True or send 403."""
        if not check_csrf(self.headers, token):
            self.send_json(403, {'error': 'CSRF token invalid'})
            return False
        return True

    def read_body(self, max_size=MAX_BODY_SIZE):
        """Read and validate request body size."""
        content_len = int(self.headers.get('Content-Length', 0))
        if content_len > max_size:
            self.send_json(413, {'error': 'Request too large'})
            return None
        if content_len > 0:
            return self.rfile.read(content_len)
        return b'{}'

    def parse_json_body(self):
        """Read body and parse as JSON."""
        body = self.read_body()
        if body is None:
            return None
        try:
            return json.loads(body.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_json(400, {'error': 'Invalid JSON'})
            return None

    # ─── GET Routes ────────────────────────────────────────────────────

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/health':
            self.send_json(200, {'status': 'ok', 'version': '2.0'})

        elif path == '/api/public-data':
            # Public endpoint — serves all data for the frontend
            try:
                data = db.get_all_data()
                self.send_json(200, data)
            except Exception:
                self.send_json(500, {'error': 'Failed to load data'})

        elif path == '/api/data':
            token = self.require_auth()
            if not token:
                return
            try:
                data = db.get_all_data()
                self.send_json(200, data)
            except Exception:
                self.send_json(500, {'error': 'Failed to load data'})

        elif path == '/api/audit':
            token = self.require_auth()
            if not token:
                return
            try:
                conn = db.get_connection()
                rows = conn.execute(
                    'SELECT * FROM audit_log ORDER BY id DESC LIMIT 100'
                ).fetchall()
                items = [dict(r) for r in rows]
                self.send_json(200, {'items': items})
            except Exception:
                self.send_json(500, {'error': 'Failed to load audit log'})

        else:
            super().do_GET()

    # ─── POST Routes ───────────────────────────────────────────────────

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        client_ip = self.get_client_ip()

        # ── File Upload ────────────────────────────────────────────────
        if path == '/api/upload':
            token = self.require_auth()
            if not token:
                return
            if not self.require_csrf(token):
                return

            content_type = self.headers.get('Content-Type', '')
            if 'multipart/form-data' not in content_type:
                self.send_json(400, {'error': 'Expected multipart/form-data'})
                return

            body = self.read_body()
            if body is None:
                return

            try:
                parts = parse_multipart(self.headers, body)
                file_part = parts.get('file')
                if not file_part or not file_part['filename']:
                    self.send_json(400, {'error': 'No file provided'})
                    return

                _, ext = os.path.splitext(file_part['filename'])
                ext = ext.lower()
                if ext not in ALLOWED_EXTENSIONS:
                    self.send_json(400, {'error': 'File type not allowed'})
                    return

                file_data = file_part['data']
                if len(file_data) > MAX_UPLOAD_SIZE:
                    self.send_json(400, {'error': 'File too large (max 5MB)'})
                    return

                # Validate file content matches extension
                if not validate_file_magic(file_data, ext):
                    self.send_json(400, {'error': 'File content does not match extension'})
                    return

                os.makedirs(UPLOAD_DIR, exist_ok=True)
                safe_name = f"{int(time.time())}_{uuid.uuid4().hex[:8]}{ext}"
                dest = os.path.join(UPLOAD_DIR, safe_name)
                with open(dest, 'wb') as f:
                    f.write(file_data)

                rel_path = f"assets/uploads/{safe_name}"
                db.log_audit('upload', details=f'Uploaded {safe_name}', ip=client_ip)
                self.send_json(200, {'success': True, 'path': rel_path})

            except Exception:
                self.send_json(500, {'error': 'Upload failed'})
            return

        # ── JSON body routes ───────────────────────────────────────────
        payload = self.parse_json_body()
        if payload is None:
            return

        # ── Login ──────────────────────────────────────────────────────
        if path == '/api/login':
            if not check_rate_limit(client_ip):
                self.send_json(429, {
                    'error': 'Too many login attempts. Try again in 5 minutes.'
                })
                return

            pwd = payload.get('password', '')
            if not pwd:
                self.send_json(400, {'error': 'Password required'})
                return

            stored_hash = load_password_hash()
            if not stored_hash:
                self.send_json(500, {'error': 'Server not configured'})
                return

            if verify_password(pwd, stored_hash):
                # Migrate legacy hash to PBKDF2 on successful login
                if ':' not in stored_hash:
                    new_hash = hash_password(pwd)
                    save_password_hash(new_hash)

                token, csrf = create_session()
                db.log_audit('login', ip=client_ip)

                self.send_json(200, {
                    'success': True,
                    'token': token,
                    'csrf': csrf,
                })
            else:
                db.log_audit('login_failed', ip=client_ip)
                self.send_json(401, {'error': 'Invalid password'})

        # ── Change Password ────────────────────────────────────────────
        elif path == '/api/password':
            token = self.require_auth()
            if not token:
                return
            if not self.require_csrf(token):
                return

            current = payload.get('current', '')
            new_pwd = payload.get('new', '')

            if len(new_pwd) < 8:
                self.send_json(400, {'error': 'Password must be at least 8 characters'})
                return

            stored_hash = load_password_hash()
            if not verify_password(current, stored_hash):
                self.send_json(403, {'error': 'Current password is incorrect'})
                return

            new_hash = hash_password(new_pwd)
            save_password_hash(new_hash)
            db.log_audit('password_changed', ip=client_ip)
            self.send_json(200, {'success': True, 'message': 'Password changed'})

        # ── Save All Data ──────────────────────────────────────────────
        elif path == '/api/data':
            token = self.require_auth()
            if not token:
                return
            if not self.require_csrf(token):
                return

            try:
                backup_name = create_backup()

                # Save i18n if present
                if 'i18n' in payload:
                    db.save_i18n(payload['i18n'])

                # Save each content section
                for section_name in db._SECTION_TO_TABLE:
                    if section_name in payload:
                        db.save_section(section_name, payload[section_name])

                # Also update data.js for static fallback
                full_data = db.get_all_data()
                write_data_js(full_data)

                db.log_audit('save_all_data', details=f'backup: {backup_name}', ip=client_ip)
                self.send_json(200, {
                    'success': True,
                    'message': 'Data saved successfully',
                    'backup': backup_name,
                })
            except Exception:
                self.send_json(500, {'error': 'Failed to save data'})

        # ── Create Backup ──────────────────────────────────────────────
        elif path == '/api/backup':
            token = self.require_auth()
            if not token:
                return
            if not self.require_csrf(token):
                return

            try:
                filename = create_backup()
                db.log_audit('backup_created', details=filename, ip=client_ip)
                self.send_json(200, {'success': True, 'filename': filename})
            except Exception:
                self.send_json(500, {'error': 'Backup failed'})

        # ── Contact Form ───────────────────────────────────────────────
        elif path == '/api/contact':
            name = payload.get('name', '').strip()
            email = payload.get('email', '').strip()
            subject = payload.get('subject', '').strip()
            message = payload.get('message', '').strip()

            # Validation
            if not name or not email or not message:
                self.send_json(400, {'error': 'Name, email, and message are required'})
                return

            # Basic email validation
            if not re.match(r'^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$', email):
                self.send_json(400, {'error': 'Invalid email address'})
                return

            if len(message) > 5000:
                self.send_json(400, {'error': 'Message too long'})
                return

            try:
                db.save_contact(name, email, subject, message, client_ip)
                self.send_json(200, {'success': True, 'message': 'Message sent'})
            except Exception:
                self.send_json(500, {'error': 'Failed to save message'})

        # ── Logout ─────────────────────────────────────────────────────
        elif path == '/api/logout':
            valid, token = check_auth(self.headers)
            if valid and token:
                sessions.pop(token, None)
                db.log_audit('logout', ip=client_ip)
            self.send_json(200, {'success': True})

        else:
            self.send_json(404, {'error': 'Not found'})


# ─── Database Initialization ──────────────────────────────────────────────

def init_and_migrate():
    """Initialize database and migrate from data.js if needed."""
    db.init_db()

    # Check if database has any data
    conn = db.get_connection()
    row = conn.execute('SELECT COUNT(*) FROM news').fetchone()
    if row[0] == 0 and os.path.exists(DATA_FILE):
        print('  [MIGRATE] data.js dan SQLite ga migratsiya qilinmoqda...')
        try:
            data = read_data_js()
            db.migrate_from_data_js(data)
            print(f'  [MIGRATE] Muvaffaqiyatli! {sum(len(data.get(s, [])) for s in db._SECTION_TO_TABLE)} ta element import qilindi.')
        except Exception as e:
            print(f'  [MIGRATE] Xatolik: {e}')
            print('  [MIGRATE] data.js dan to\'g\'ridan-to\'g\'ri xizmat ko\'rsatiladi.')


# ─── Main ──────────────────────────────────────────────────────────────────

def main():
    os.chdir(BASE_DIR)

    # Initialize database
    init_and_migrate()

    # Ensure admin password exists
    ensure_password_exists()

    server = http.server.HTTPServer((HOST, PORT), IBXIHandler)
    print(f'\n  ╔══════════════════════════════════════════════╗')
    print(f'  ║  IBXI Server v2.0 (Security Hardened)        ║')
    print(f'  ╠══════════════════════════════════════════════╣')
    print(f'  ║  URL:   http://localhost:{PORT}               ║')
    print(f'  ║  Admin: http://localhost:{PORT}/admin.html     ║')
    print(f'  ║  DB:    ibxi.db (SQLite)                     ║')
    print(f'  ╠══════════════════════════════════════════════╣')
    print(f'  ║  Xavfsizlik: PBKDF2, CSRF, Rate Limit, CSP  ║')
    print(f'  ║  To\'xtatish: Ctrl+C                          ║')
    print(f'  ╚══════════════════════════════════════════════╝\n')

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server to\'xtatildi.')
        server.server_close()


if __name__ == '__main__':
    main()
