# IBXI – Imom Buxoriy Xalqaro Instituti

Rasmiy veb-sayti va admin panel. Python 3 stdlib HTTP server + SQLite.

**Sayt:** https://bukhariinstitute.com
**Admin:** https://bukhariinstitute.com/admin.html
**Server:** 109.199.121.225 (Contabo VPS, Ubuntu 24.04)

---

## Loyiha tuzilmasi

```
├── server.py              # HTTP server + REST API (port 8765)
├── database.py            # SQLite ORM — barcha jadvallar va so'rovlar
├── index.html             # Asosiy sayt (SPA)
├── admin.html             # Admin panel (SPA)
├── admin_config.json      # Admin paroli (PBKDF2 hash) — gitignore
├── ibxi.db                # SQLite database — gitignore
├── start.sh               # Lokal ishga tushirish (desktop)
├── .github/workflows/
│   └── deploy.yml         # GitHub Actions — auto deploy
├── assets/
│   ├── css/
│   │   ├── style.css      # Asosiy sayt dizayni
│   │   └── admin.css      # Admin panel dizayni
│   ├── js/
│   │   ├── app.js         # Frontend SPA (hash routing, i18n, tema)
│   │   ├── admin.js       # Admin CMS (12 bo'lim CRUD)
│   │   ├── data.js        # Eski statik ma'lumot (migration uchun)
│   │   └── sanitize.js    # XSS himoya kutubxonasi
│   ├── img/               # Logotiplar va rasmlar
│   ├── fonts/             # NotoSansArabic shriftlari
│   └── uploads/           # Admin yuklagan fayllar
├── ImomBuxoriy XI fayllari/  # Brend materiallari (logo, ranglar)
└── backups/               # Ma'lumot zaxiralari — gitignore
```

---

## Texnologiyalar

| Texnologiya | Tavsif |
|---|---|
| **Backend** | Python 3.12 stdlib (`http.server`) — hech qanday tashqi kutubxona kerak emas |
| **Database** | SQLite3 (WAL mode) |
| **Frontend** | Vanilla JS SPA (framework yoq) |
| **Server** | Nginx reverse proxy + Cloudflare SSL |
| **Deploy** | GitHub Actions (push to main = auto deploy) |

---

## Lokal ishga tushirish

```bash
# 1. Klonlash
git clone git@github.com:jon688868-afk/Muhammad_Odil_ustoz.git
cd Muhammad_Odil_ustoz

# 2. Ishga tushirish (Python 3.8+ kerak, boshqa hech narsa kerak emas)
python3 server.py

# Yoki start.sh bilan (brauzer ham ochiladi):
./start.sh
```

- Sayt: http://localhost:8765
- Admin: http://localhost:8765/admin.html

### Admin parolni o'rnatish (birinchi marta)

Agar `admin_config.json` fayli yo'q bo'lsa, admin parolni server.py dagi `set_password()` funksiyasi orqali o'rnatiladi. Birinchi login da yangi parol qo'yish mumkin.

---

## Server ma'lumotlari

### Ulanish
```bash
ssh root@109.199.121.225
# Parol: Contabo dashboardda (yoki siz bilasiz)
```

### Servis boshqarish
```bash
# Holatni ko'rish
systemctl status ibxi.service

# Qayta ishga tushirish
systemctl restart ibxi.service

# Loglarni ko'rish
journalctl -u ibxi.service -f

# Nginx qayta yuklash
systemctl reload nginx
```

### Fayl joylashuvi (serverda)
```
/var/www/ibxi/              # Loyiha papkasi
/var/www/ibxi/ibxi.db       # Database
/var/www/ibxi/admin_config.json  # Admin paroli
/etc/nginx/sites-available/ibxi  # Nginx config
/etc/systemd/system/ibxi.service # Systemd service
/etc/nginx/ssl/ibxi.crt     # SSL sertifikat (Cloudflare uchun)
/etc/nginx/ssl/ibxi.key     # SSL kalit
/etc/cron.d/ibxi-backup     # Avtomatik zaxira (har kuni 03:00)
/root/.ssh/deploy_key        # GitHub deploy key
```

---

## Auto-Deploy

Push qilganingizda avtomatik deploy bo'ladi:

```
git add . && git commit -m "O'zgarish tavsifi" && git push origin main
```

**Jarayon:**
1. GitHub Actions `.github/workflows/deploy.yml` ni ishga tushiradi
2. SSH orqali serverga ulanadi
3. `git pull origin main` — yangi kodni oladi
4. `systemctl restart ibxi.service` — serverni qayta ishga tushiradi
5. Health check (`/api/health`) — muvaffaqiyatni tekshiradi

**GitHub Secrets** (Settings → Secrets → Actions):
- `SERVER_HOST` = `109.199.121.225`
- `SERVER_PASSWORD` = server paroli

Agar deploy muvaffaqiyatsiz bo'lsa — GitHub Actions tabida qizil belgi ko'rinadi.

---

## API endpointlar

### Ochiq (autentifikatsiyasiz)
| Metod | Endpoint | Tavsif |
|---|---|---|
| GET | `/api/health` | Server holati |
| GET | `/api/public-data` | Barcha sayt ma'lumotlari (frontend uchun) |
| GET | `/api/site-config` | Sayt sozlamalari |
| POST | `/api/login` | Admin login (rate limited: 3/min) |
| POST | `/api/contact` | Aloqa formasi |

### Admin (token kerak)
| Metod | Endpoint | Tavsif |
|---|---|---|
| GET | `/api/data` | Barcha ma'lumotlar (admin uchun) |
| GET | `/api/audit` | Audit log |
| POST | `/api/save` | Ma'lumotlarni saqlash |
| POST | `/api/upload` | Fayl yuklash (max 5MB) |
| POST | `/api/change-password` | Parol o'zgartirish |
| DELETE | `/api/upload/:filename` | Faylni o'chirish |

### Custom bo'limlar (admin)
| Metod | Endpoint | Tavsif |
|---|---|---|
| POST | `/api/custom-sections` | Yangi bo'lim qo'shish |
| PUT | `/api/custom-sections/:slug` | Bo'limni tahrirlash |
| DELETE | `/api/custom-sections/:slug` | Bo'limni o'chirish |
| POST | `/api/custom-sections/:slug/items` | Element qo'shish |
| PUT | `/api/custom-sections/:slug/items/:id` | Elementni tahrirlash |
| DELETE | `/api/custom-sections/:slug/items/:id` | Elementni o'chirish |

---

## Database jadvallari

SQLite da 18 ta jadval:

| Jadval | Tavsif |
|---|---|
| `news` | Yangiliklar (22 ta) |
| `team` | Xodimlar (14 ta) |
| `publications` | Nashrlar (16 ta) |
| `events` | Tadbirlar (12 ta) |
| `gallery` | Galereya (12 ta) |
| `videos` | Videolar (10 ta) |
| `faq` | Savol-javoblar (10 ta) |
| `blog_posts` | Blog maqolalari (10 ta) |
| `testimonials` | Fikrlar (8 ta) |
| `programs` | Dasturlar (8 ta) |
| `research_areas` | Tadqiqot yo'nalishlari (6 ta) |
| `i18n` | Tarjimalar — UZ, EN, AR, TR (144 ta) |
| `config` | Sayt sozlamalari |
| `audit_log` | Admin harakatlari logi |
| `contact_submissions` | Aloqa formasi yuborishlari |
| `custom_sections` | Dinamik bo'limlar |
| `custom_items` | Dinamik bo'lim elementlari |

---

## Xavfsizlik

### Himoya choralari
- **Parol:** PBKDF2-HMAC-SHA256 (260,000 iteratsiya) + random salt
- **CSRF:** Har bir admin so'rovda X-CSRF-Token tekshiriladi
- **Rate limiting:** Login: 3/min, API: 10/sec (nginx)
- **CSP headerlar:** script-src, style-src, connect-src cheklangan
- **XSS:** sanitize.js frontend da, SVG bloklash serverda
- **Fayl yuklash:** Magic byte validatsiya, faqat .jpg/.jpeg/.png/.gif/.webp/.svg
- **Maxfiy fayllar:** .py, .db, .json, .env — 403 Forbidden
- **Firewall:** UFW — faqat 22, 80, 443 portlar ochiq
- **fail2ban:** SSH brute-force: 3 urinish = 1 soat ban
- **Cloudflare:** DDoS himoya, SSL proxy
- **Audit log:** Barcha admin harakatlari qayd qilinadi

### Muhim
- `admin_config.json` va `ibxi.db` gitignore da — GitHub ga tushmaydi
- Server parolini va GitHub Secrets ni xavfsiz saqlang
- Cloudflare orqali real server IP yashiringan

---

## Rang sxemasi

| Rang | Hex | Ishlatilish |
|---|---|---|
| Turquoise | `#01CED1` | Asosiy rang |
| Gold | `#e4b73a` | Aksent rang |
| Dark BG | `#0a1628` | Qorong'u tema foni |
| Navy | `#0d1b2e` | Karta foni |

---

## Tillar

4 tilda ishlaydi: **O'zbek** (UZ), **English** (EN), **العربية** (AR), **Türkçe** (TR)

Tarjimalar `i18n` jadvalida saqlanadi. Admin paneldan boshqariladi.

---

## Zaxiralash

- **Avtomatik:** Har kuni soat 03:00 da (`/etc/cron.d/ibxi-backup`)
- **Qo'lda:** `cp /var/www/ibxi/ibxi.db ~/ibxi_backup_$(date +%Y%m%d).db`
- **30 kundan eski** zaxiralar avtomatik o'chiriladi

---

## Muammolar va yechimlar

### Server ishlamayapti
```bash
ssh root@109.199.121.225
systemctl status ibxi.service    # Holatni tekshir
journalctl -u ibxi.service -n 50 # Logni kor
systemctl restart ibxi.service   # Qayta ishga tushir
```

### Deploy ishlamayapti
1. GitHub → Actions tabini tekshiring (qizil belgi bormi)
2. `SERVER_HOST` va `SERVER_PASSWORD` secretlar to'g'rimi
3. Serverda: `cd /var/www/ibxi && git pull origin main` — qo'lda pull qiling

### Database buzilgan
```bash
# Serverda
cd /var/www/ibxi
sqlite3 ibxi.db 'PRAGMA integrity_check;'  # Tekshirish
# Agar buzilgan bo'lsa, zaxiradan tiklash:
cp backups/ibxi_YYYYMMDD.db ibxi.db
systemctl restart ibxi.service
```

### Sayt ochilmayapti (502/503)
1. Cloudflare DNS to'g'ri ekanini tekshiring (bukhariinstitute.com → 109.199.121.225)
2. Nginx ishlayaptimi: `systemctl status nginx`
3. Python server ishlayaptimi: `systemctl status ibxi.service`
4. SSL sertifikat: `/etc/nginx/ssl/ibxi.crt` mavjudmi
