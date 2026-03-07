# IBXI Project — AI Context

## What is this
IBXI (Imom Buxoriy Xalqaro Instituti) official website and admin CMS.
Python 3 stdlib HTTP server + SQLite. No external dependencies.

## Architecture
- `server.py` — HTTP server on port 8765, REST API, security middleware
- `database.py` — SQLite ORM, all tables and queries, parameterized (no SQL injection)
- `index.html` + `assets/js/app.js` — Frontend SPA (vanilla JS, hash routing)
- `admin.html` + `assets/js/admin.js` — Admin CMS SPA (CRUD for 12 sections)
- `assets/js/sanitize.js` — XSS prevention library
- `admin_config.json` — password hash (PBKDF2-HMAC-SHA256, 260K iterations)
- `ibxi.db` — SQLite database (WAL mode)

## Deployment
- **Server:** 109.199.121.225 (Contabo VPS, Ubuntu 24.04)
- **Domain:** bukhariinstitute.com (Cloudflare DNS proxy + SSL)
- **Auto-deploy:** Push to `main` → GitHub Actions SSHs into server, pulls, restarts
- **Path on server:** `/var/www/ibxi/`
- **Service:** `systemctl restart ibxi.service`
- **Nginx:** reverse proxy, rate limiting, static assets
- **Backup:** Daily at 03:00 via cron, 30-day retention

## Key conventions
- All SQL queries use parameterized statements (never string concatenation)
- All API responses go through `send_json()` method
- Admin auth uses bearer token in `Authorization` header
- CSRF token required via `X-CSRF-Token` header on POST/PUT/DELETE
- Frontend uses `window.sanitize.*` for all user-generated content
- Colors: turquoise `#01CED1`, gold `#e4b73a`
- 4 languages: UZ, EN, AR, TR (stored in `i18n` table)
- `.py`, `.db`, `.json`, `.env` files are blocked from HTTP access (403)

## Files NOT in git
- `ibxi.db`, `ibxi.db-shm`, `ibxi.db-wal` (database)
- `admin_config.json` (password hash)
- `backups/` directory
- `*.jpg` (except assets/)

## GitHub Secrets
- `SERVER_HOST` — server IP
- `SERVER_PASSWORD` — SSH password

## Don't
- Don't add external dependencies (no pip, no npm)
- Don't change HOST from 127.0.0.1 (nginx proxies)
- Don't expose server.py, database.py, ibxi.db via HTTP
- Don't commit admin_config.json or ibxi.db to git
