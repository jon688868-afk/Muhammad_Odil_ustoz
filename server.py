#!/usr/bin/env python3
"""
IDE Desktop – Admin API Server
Serves static files + REST API for admin panel CRUD operations.
Python 3 standard library only — no external dependencies.
"""

import http.server
import json
import os
import re
import hashlib
import secrets
import shutil
import time
import cgi
import uuid
from datetime import datetime
from urllib.parse import urlparse

PORT = 8765
HOST = '0.0.0.0'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'assets', 'js', 'data.js')
BACKUP_DIR = os.path.join(BASE_DIR, 'backups')
CONFIG_FILE = os.path.join(BASE_DIR, 'admin_config.json')
UPLOAD_DIR = os.path.join(BASE_DIR, 'assets', 'uploads')
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB

# Default password: ide2025admin
DEFAULT_HASH = hashlib.sha256('ide2025admin'.encode()).hexdigest()

# In-memory sessions: { token: expiry_timestamp }
sessions = {}


def load_password_hash():
    """Load password hash from config file, or return default."""
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, 'r') as f:
                cfg = json.load(f)
            return cfg.get('password_hash', DEFAULT_HASH)
        except Exception:
            pass
    return DEFAULT_HASH


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

# ─── DATA.JS HEADER TEMPLATE ────────────────────────────────────────
DATA_HEADER = """\
// ┌─────────────────────────────────────────────────────────────┐
// │  IBXI – Imom Buxoriy Xalqaro Instituti  |  APPLICATION DATA │
// │                                                             │
// │  HOW TO EDIT THIS FILE:                                     │
// │  • Each section is marked with ═══ SECTION NAME ═══         │
// │  • To add an item: copy an existing entry, paste it at      │
// │    the END of the array, change "id" to the next number,    │
// │    and fill in all fields.                                  │
// │  • Keep uz / en / ar / tr fields for multilingual support.    │
// │  • After editing, refresh the browser (Ctrl+R) to see       │
// │    your changes.                                            │
// │                                                             │
// │  SECTIONS:                                                  │
// │   1. i18n          – UI translations (UZ/EN/AR/TR)           │
// │   2. news          – News & announcements                   │
// │   3. researchAreas – 6 research fields                      │
// │   4. events        – Seminars, conferences, workshops       │
// │   5. publications  – Books, articles, reports               │
// │   6. team          – Research team members                  │
// │   7. programs      – Academy programs                       │
// │   8. videos        – Video lectures & talks                 │
// │   9. faq           – Frequently asked questions             │
// │  10. blogPosts     – Blog / insight articles                │
// │  11. testimonials  – Scholar quotes                         │
// │  12. gallery       – Photo gallery events                   │
// └─────────────────────────────────────────────────────────────┘
"""

SECTION_COMMENTS = [
    ('i18n',          '1. TRANSLATIONS  (UI text in Uzbek / English / Arabic / Turkish)'),
    ('news',          '2. NEWS / YANGILIKLAR'),
    ('researchAreas', '3. RESEARCH AREAS / TADQIQOT YO\'NALISHLARI'),
    ('events',        '4. EVENTS / TADBIRLAR'),
    ('publications',  '5. PUBLICATIONS / NASHRLAR'),
    ('team',          '6. TEAM / JAMOA'),
    ('programs',      '7. ACADEMY PROGRAMS / AKADEMIYA DASTURLARI'),
    ('videos',        '8. VIDEOS / VIDEOLAR'),
    ('faq',           '9. FAQ / TSS'),
    ('blogPosts',     '10. BLOG POSTS / MAQOLALAR'),
    ('testimonials',  '11. TESTIMONIALS / OLIMLAR FIKRLARI'),
    ('gallery',       '12. GALLERY / GALEREYA'),
]


def read_data_js():
    """Parse data.js and return the DATA object as a Python dict."""
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract between 'const DATA = {' and the last '};'
    start_marker = 'const DATA = {'
    start_idx = content.index(start_marker) + len(start_marker) - 1  # include the {
    end_idx = content.rindex('};') + 1  # include the }

    js_obj = content[start_idx:end_idx]

    # Remove full-line comments (lines starting with //)
    lines = js_obj.split('\n')
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith('//'):
            continue
        cleaned.append(line)
    js_obj = '\n'.join(cleaned)

    # Quote unquoted object keys: word followed by colon
    # But skip keys already inside quotes
    js_obj = re.sub(r'(?m)^(\s*)([a-zA-Z_]\w*)(\s*:)', r'\1"\2"\3', js_obj)
    # Also handle keys after { or , on same line
    js_obj = re.sub(r'([{,]\s*)([a-zA-Z_]\w*)(\s*:)', r'\1"\2"\3', js_obj)

    # Remove trailing commas before } or ]
    js_obj = re.sub(r',(\s*[}\]])', r'\1', js_obj)

    try:
        return json.loads(js_obj)
    except json.JSONDecodeError as e:
        print(f"[ERROR] Failed to parse data.js: {e}")
        # Fallback: try with a more aggressive cleanup
        # Remove any remaining single-line comments at end of lines
        js_obj = re.sub(r'//[^\n]*', '', js_obj)
        js_obj = re.sub(r',(\s*[}\]])', r'\1', js_obj)
        return json.loads(js_obj)


def write_data_js(data):
    """Write the DATA dict back to data.js with section comments."""
    output = DATA_HEADER + '\nconst DATA = {\n'

    for i, (key, comment) in enumerate(SECTION_COMMENTS):
        if key not in data:
            continue
        separator = '=' * 63
        output += f'\n// {separator}\n'
        output += f'//  {comment}\n'
        output += f'// {separator}\n'

        value_json = json.dumps(data[key], indent=2, ensure_ascii=False)
        output += f'{key}: {value_json}'

        if i < len(SECTION_COMMENTS) - 1:
            output += ','
        output += '\n'

    output += '\n}; // end DATA\n'

    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        f.write(output)


def create_backup():
    """Create a timestamped backup of data.js."""
    os.makedirs(BACKUP_DIR, exist_ok=True)
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'data_{ts}.js'
    dest = os.path.join(BACKUP_DIR, filename)
    shutil.copy2(DATA_FILE, dest)
    return filename


def check_auth(headers):
    """Validate the Authorization header."""
    auth = headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return False
    token = auth[7:]
    if token in sessions and sessions[token] > time.time():
        return True
    # Clean up expired tokens
    sessions.pop(token, None)
    return False


def clean_expired_sessions():
    """Remove expired sessions."""
    now = time.time()
    expired = [t for t, exp in sessions.items() if exp <= now]
    for t in expired:
        del sessions[t]


class IDEHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler: static files + REST API."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, fmt, *args):
        # Quieter logging — only show API calls
        path = args[0].split()[1] if args else ''
        if '/api/' in str(path):
            super().log_message(fmt, *args)

    def send_json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/api/health':
            self.send_json(200, {'status': 'ok', 'version': '1.0'})

        elif path == '/api/data':
            if not check_auth(self.headers):
                self.send_json(401, {'error': 'Unauthorized'})
                return
            try:
                data = read_data_js()
                self.send_json(200, data)
            except Exception as e:
                self.send_json(500, {'error': str(e)})

        else:
            # Serve static files
            super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # Handle file upload (multipart) separately
        if path == '/api/upload':
            if not check_auth(self.headers):
                self.send_json(401, {'error': 'Unauthorized'})
                return
            content_type = self.headers.get('Content-Type', '')
            if 'multipart/form-data' not in content_type:
                self.send_json(400, {'error': 'Expected multipart/form-data'})
                return
            try:
                form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={
                        'REQUEST_METHOD': 'POST',
                        'CONTENT_TYPE': content_type,
                    }
                )
                file_item = form['file']
                if not file_item.filename:
                    self.send_json(400, {'error': 'No file provided'})
                    return
                _, ext = os.path.splitext(file_item.filename)
                ext = ext.lower()
                if ext not in ALLOWED_EXTENSIONS:
                    self.send_json(400, {'error': f'File type {ext} not allowed'})
                    return
                file_data = file_item.file.read()
                if len(file_data) > MAX_UPLOAD_SIZE:
                    self.send_json(400, {'error': 'File too large (max 5MB)'})
                    return
                os.makedirs(UPLOAD_DIR, exist_ok=True)
                safe_name = f"{int(time.time())}_{uuid.uuid4().hex[:8]}{ext}"
                dest = os.path.join(UPLOAD_DIR, safe_name)
                with open(dest, 'wb') as f:
                    f.write(file_data)
                rel_path = f"assets/uploads/{safe_name}"
                self.send_json(200, {'success': True, 'path': rel_path})
            except Exception as e:
                self.send_json(500, {'error': str(e)})
            return

        content_len = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_len) if content_len > 0 else b'{}'

        try:
            payload = json.loads(body.decode('utf-8'))
        except json.JSONDecodeError:
            self.send_json(400, {'error': 'Invalid JSON'})
            return

        if path == '/api/login':
            pwd = payload.get('password', '')
            pwd_hash = hashlib.sha256(pwd.encode()).hexdigest()
            if pwd_hash == load_password_hash():
                clean_expired_sessions()
                token = secrets.token_hex(32)
                sessions[token] = time.time() + 86400  # 24 hours
                self.send_json(200, {'success': True, 'token': token})
            else:
                self.send_json(401, {'success': False, 'error': 'Invalid password'})

        elif path == '/api/password':
            if not check_auth(self.headers):
                self.send_json(401, {'error': 'Unauthorized'})
                return
            current = payload.get('current', '')
            new_pwd = payload.get('new', '')
            if len(new_pwd) < 6:
                self.send_json(400, {'success': False, 'error': 'Password must be at least 6 characters'})
                return
            current_hash = hashlib.sha256(current.encode()).hexdigest()
            if current_hash != load_password_hash():
                self.send_json(403, {'success': False, 'error': 'Current password is incorrect'})
                return
            new_hash = hashlib.sha256(new_pwd.encode()).hexdigest()
            save_password_hash(new_hash)
            self.send_json(200, {'success': True, 'message': 'Password changed'})

        elif path == '/api/data':
            if not check_auth(self.headers):
                self.send_json(401, {'error': 'Unauthorized'})
                return
            try:
                # Auto-backup before save
                backup_name = create_backup()
                write_data_js(payload)
                self.send_json(200, {
                    'success': True,
                    'message': 'Data saved successfully',
                    'backup': backup_name
                })
            except Exception as e:
                self.send_json(500, {'success': False, 'error': str(e)})

        elif path == '/api/backup':
            if not check_auth(self.headers):
                self.send_json(401, {'error': 'Unauthorized'})
                return
            try:
                filename = create_backup()
                self.send_json(200, {'success': True, 'filename': filename})
            except Exception as e:
                self.send_json(500, {'success': False, 'error': str(e)})

        elif path == '/api/logout':
            auth = self.headers.get('Authorization', '')
            if auth.startswith('Bearer '):
                sessions.pop(auth[7:], None)
            self.send_json(200, {'success': True})

        else:
            self.send_json(404, {'error': 'Not found'})


def main():
    os.chdir(BASE_DIR)
    server = http.server.HTTPServer((HOST, PORT), IDEHandler)
    print(f'\n  IDE Server running at http://{HOST}:{PORT}')
    print(f'  Admin panel: http://{HOST}:{PORT}/admin.html')
    print(f'  Press Ctrl+C to stop\n')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n  Server stopped.')
        server.server_close()


if __name__ == '__main__':
    main()
