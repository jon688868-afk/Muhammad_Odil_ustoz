#!/usr/bin/env python3
"""
IBXI -- SQLite database layer for the Imom Buxoriy Xalqaro Instituti project.

Python stdlib only (sqlite3, json, os, threading).
Thread-safe connections. All queries parameterized.
"""

import json
import os
import sqlite3
import threading
from datetime import datetime

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "ibxi.db")

# Thread-local storage for per-thread connections
_local = threading.local()


# ---------------------------------------------------------------------------
# Mapping between JS camelCase section names and DB table names
# ---------------------------------------------------------------------------

_SECTION_TO_TABLE = {
    "news":          "news",
    "researchAreas": "research_areas",
    "events":        "events",
    "publications":  "publications",
    "team":          "team",
    "programs":      "programs",
    "videos":        "videos",
    "faq":           "faq",
    "blogPosts":     "blog_posts",
    "testimonials":  "testimonials",
    "gallery":       "gallery",
}

# Columns whose JS name differs from the DB column name.
# Maps  db_column -> js_key  (used when reading FROM the DB)
_DB_TO_JS = {
    "research_areas": {"description": "desc", "avatar_color": "avatarColor"},
    "publications":   {"description": "desc", "pdf_url": "pdfUrl"},
    "team":           {"avatar_color": "avatarColor"},
    "news":           {"read_time": "readTime"},
    "blog_posts":     {"read_time": "readTime"},
    "videos":         {"video_url": "videoUrl"},
}

# Reverse: maps  js_key -> db_column  (used when writing INTO the DB)
_JS_TO_DB = {
    "research_areas": {"desc": "description", "avatarColor": "avatar_color"},
    "publications":   {"desc": "description", "pdfUrl": "pdf_url"},
    "team":           {"avatarColor": "avatar_color"},
    "news":           {"readTime": "read_time"},
    "blog_posts":     {"readTime": "read_time"},
    "videos":         {"videoUrl": "video_url"},
}

# Columns stored as JSON text in the DB but as native arrays in JS
_JSON_COLUMNS = {
    "publications": {"tags"},
    "team":         {"specialization"},
    "blog_posts":   {"tags"},
    "gallery":      {"images"},
}


# ---------------------------------------------------------------------------
# Schema -- DDL for every table
# ---------------------------------------------------------------------------

_SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS config (
    key   TEXT PRIMARY KEY,
    value TEXT
);

CREATE TABLE IF NOT EXISTS i18n (
    lang  TEXT NOT NULL,
    key   TEXT NOT NULL,
    value TEXT,
    PRIMARY KEY (lang, key)
);

CREATE TABLE IF NOT EXISTS news (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    icon         TEXT,
    tag          TEXT,
    tag_en       TEXT,
    tag_ar       TEXT,
    title        TEXT NOT NULL,
    title_en     TEXT,
    title_ar     TEXT,
    summary      TEXT,
    summary_en   TEXT,
    summary_ar   TEXT,
    date         TEXT,
    category     TEXT,
    color        TEXT,
    author       TEXT,
    read_time    TEXT,
    featured     INTEGER DEFAULT 0,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS research_areas (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    icon         TEXT,
    count        INTEGER DEFAULT 0,
    title        TEXT NOT NULL,
    title_en     TEXT,
    title_ar     TEXT,
    description  TEXT,
    desc_en      TEXT,
    desc_ar      TEXT,
    link         TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS events (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    day            TEXT,
    month          TEXT,
    month_en       TEXT,
    month_ar       TEXT,
    title          TEXT NOT NULL,
    title_en       TEXT,
    title_ar       TEXT,
    type           TEXT,
    location       TEXT,
    time           TEXT,
    speaker        TEXT,
    description    TEXT,
    description_en TEXT,
    capacity       INTEGER,
    registered     INTEGER DEFAULT 0,
    sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS publications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    abbr         TEXT,
    year         TEXT,
    type         TEXT,
    title        TEXT NOT NULL,
    title_en     TEXT,
    author       TEXT,
    description  TEXT,
    desc_en      TEXT,
    color        TEXT,
    pages        INTEGER,
    language     TEXT,
    series       TEXT,
    tags         TEXT,
    pdf_url      TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS team (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    initials       TEXT,
    avatar_color   TEXT,
    role           TEXT,
    role_en        TEXT,
    dept           TEXT,
    dept_en        TEXT,
    bio            TEXT,
    bio_en         TEXT,
    education      TEXT,
    specialization TEXT,
    email          TEXT,
    phone          TEXT,
    telegram       TEXT,
    website        TEXT,
    sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS programs (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    icon         TEXT,
    status       TEXT DEFAULT 'active',
    title        TEXT NOT NULL,
    title_en     TEXT,
    title_ar     TEXT,
    duration     TEXT,
    level        TEXT,
    lang         TEXT,
    students     INTEGER DEFAULT 0,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS videos (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    emoji          TEXT,
    video_url      TEXT,
    title          TEXT NOT NULL,
    title_en       TEXT,
    description    TEXT,
    description_en TEXT,
    duration       TEXT,
    views          TEXT,
    category       TEXT,
    speaker        TEXT,
    date           TEXT,
    sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    q            TEXT NOT NULL,
    q_en         TEXT,
    q_ar         TEXT,
    a            TEXT NOT NULL,
    a_en         TEXT,
    a_ar         TEXT,
    category     TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    featured     INTEGER DEFAULT 0,
    category     TEXT,
    color        TEXT,
    title        TEXT NOT NULL,
    title_en     TEXT,
    title_ar     TEXT,
    excerpt      TEXT,
    excerpt_en   TEXT,
    author       TEXT,
    date         TEXT,
    read_time    TEXT,
    tags         TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    emoji        TEXT,
    name         TEXT NOT NULL,
    institution  TEXT,
    quote        TEXT,
    quote_en     TEXT,
    country      TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    icon         TEXT,
    category     TEXT,
    color        TEXT,
    title        TEXT NOT NULL,
    title_en     TEXT,
    date         TEXT,
    count        INTEGER DEFAULT 0,
    images       TEXT,
    sort_order   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS audit_log (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp    TEXT NOT NULL,
    action       TEXT NOT NULL,
    section      TEXT,
    item_id      INTEGER,
    details      TEXT,
    ip_address   TEXT
);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT,
    email        TEXT,
    subject      TEXT,
    message      TEXT,
    submitted_at TEXT,
    ip_address   TEXT,
    status       TEXT DEFAULT 'unread'
);

CREATE TABLE IF NOT EXISTS applications (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name    TEXT NOT NULL,
    email        TEXT,
    phone        TEXT,
    program      TEXT,
    education    TEXT,
    motivation   TEXT,
    status       TEXT DEFAULT 'pending',
    submitted_at TEXT,
    ip_address   TEXT
);

CREATE TABLE IF NOT EXISTS custom_sections (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    slug         TEXT NOT NULL UNIQUE,
    label        TEXT NOT NULL,
    icon         TEXT DEFAULT '',
    fields       TEXT NOT NULL DEFAULT '[]',
    sort_order   INTEGER DEFAULT 0,
    created_at   TEXT
);

CREATE TABLE IF NOT EXISTS custom_items (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    section_slug TEXT NOT NULL,
    data         TEXT NOT NULL DEFAULT '{}',
    sort_order   INTEGER DEFAULT 0,
    FOREIGN KEY (section_slug) REFERENCES custom_sections(slug) ON DELETE CASCADE
);
"""


# ---------------------------------------------------------------------------
# Ordered list of columns per table (excluding 'id' which is auto-generated
# on INSERT but included on SELECT).  Used for deterministic INSERT/UPDATE.
# ---------------------------------------------------------------------------

_TABLE_COLUMNS = {
    "news": [
        "icon", "tag", "tag_en", "tag_ar",
        "title", "title_en", "title_ar",
        "summary", "summary_en", "summary_ar",
        "date", "category", "color", "author", "read_time",
        "featured", "sort_order",
    ],
    "research_areas": [
        "icon", "count",
        "title", "title_en", "title_ar",
        "description", "desc_en", "desc_ar",
        "link", "sort_order",
    ],
    "events": [
        "day", "month", "month_en", "month_ar",
        "title", "title_en", "title_ar",
        "type", "location", "time", "speaker",
        "description", "description_en",
        "capacity", "registered", "sort_order",
    ],
    "publications": [
        "abbr", "year", "type",
        "title", "title_en",
        "author", "description", "desc_en",
        "color", "pages", "language", "series",
        "tags", "pdf_url", "sort_order",
    ],
    "team": [
        "name", "initials", "avatar_color",
        "role", "role_en",
        "dept", "dept_en",
        "bio", "bio_en",
        "education", "specialization",
        "email", "phone", "telegram", "website",
        "sort_order",
    ],
    "programs": [
        "icon", "status",
        "title", "title_en", "title_ar",
        "duration", "level", "lang",
        "students", "sort_order",
    ],
    "videos": [
        "emoji", "video_url",
        "title", "title_en",
        "description", "description_en",
        "duration", "views", "category", "speaker", "date",
        "sort_order",
    ],
    "faq": [
        "q", "q_en", "q_ar",
        "a", "a_en", "a_ar",
        "category", "sort_order",
    ],
    "blog_posts": [
        "featured", "category", "color",
        "title", "title_en", "title_ar",
        "excerpt", "excerpt_en",
        "author", "date", "read_time",
        "tags", "sort_order",
    ],
    "testimonials": [
        "emoji", "name", "institution",
        "quote", "quote_en",
        "country", "sort_order",
    ],
    "gallery": [
        "icon", "category", "color",
        "title", "title_en",
        "date", "count", "images",
        "sort_order",
    ],
}


# ---------------------------------------------------------------------------
# Helpers: connection, row factory, field mapping
# ---------------------------------------------------------------------------

def get_connection():
    """Return a thread-local ``sqlite3.Connection`` with ``Row`` factory.

    Each thread gets its own connection so the module is safe for use from
    multi-threaded HTTP servers.  WAL journal mode is enabled for better
    concurrency.
    """
    conn = getattr(_local, "connection", None)
    if conn is None:
        conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        _local.connection = conn
    return conn


def _row_to_dict(row):
    """Convert a ``sqlite3.Row`` to a plain ``dict``."""
    return dict(row)


def _resolve_table(section_name):
    """Return the table name for a section, raising ``ValueError`` if unknown."""
    table = _SECTION_TO_TABLE.get(section_name)
    if table is None:
        raise ValueError(f"Unknown section: {section_name!r}")
    return table


def _js_item_to_db_row(table, item):
    """Translate a single JS-style dict into DB column names, serialising
    JSON columns as needed.

    Returns a new dict keyed by DB column names.
    """
    mapping = _JS_TO_DB.get(table, {})
    json_cols = _JSON_COLUMNS.get(table, set())
    result = {}
    for js_key, value in item.items():
        if js_key == "id":
            # Preserve id for explicit-id imports but never map it
            result["id"] = value
            continue
        db_col = mapping.get(js_key, js_key)
        if db_col in json_cols and isinstance(value, (list, dict)):
            value = json.dumps(value, ensure_ascii=False)
        # Convert Python bool to int for INTEGER columns
        if isinstance(value, bool):
            value = int(value)
        result[db_col] = value
    return result


def _db_row_to_js_item(table, row_dict):
    """Translate a DB row dict into a JS-style dict, deserialising JSON
    columns and renaming fields back to camelCase where needed.
    """
    mapping = _DB_TO_JS.get(table, {})
    json_cols = _JSON_COLUMNS.get(table, set())
    result = {}
    for db_col, value in row_dict.items():
        # Skip sort_order -- the frontend does not use it
        if db_col == "sort_order":
            continue
        # Deserialise JSON text back to lists/dicts
        if db_col in json_cols and isinstance(value, str):
            try:
                value = json.loads(value)
            except (json.JSONDecodeError, TypeError):
                pass
        # Convert INTEGER featured back to bool
        if db_col == "featured":
            value = bool(value) if value is not None else False
        js_key = mapping.get(db_col, db_col)
        result[js_key] = value
    return result


# ---------------------------------------------------------------------------
# Initialisation
# ---------------------------------------------------------------------------

def init_db():
    """Create all tables if they do not already exist."""
    conn = get_connection()
    conn.executescript(_SCHEMA_SQL)
    conn.commit()


# ---------------------------------------------------------------------------
# Full-data retrieval  (matches frontend DATA object format)
# ---------------------------------------------------------------------------

def get_all_data():
    """Return the complete ``DATA`` dict that mirrors the structure in
    ``data.js`` so the frontend works without modification.

    Keys:  i18n, news, researchAreas, events, publications, team,
           programs, videos, faq, blogPosts, testimonials, gallery.
    """
    data = {}

    # i18n ------------------------------------------------------------------
    data["i18n"] = get_i18n()

    # Content sections ------------------------------------------------------
    for section_name, table in _SECTION_TO_TABLE.items():
        data[section_name] = get_section(section_name)

    return data


def get_section(section_name):
    """Return all rows of *section_name* as a list of dicts using the
    JS field names expected by the frontend.

    Items are ordered by ``sort_order ASC, id ASC``.
    """
    table = _resolve_table(section_name)
    conn = get_connection()
    cursor = conn.execute(
        f"SELECT * FROM [{table}] ORDER BY sort_order ASC, id ASC"
    )
    rows = cursor.fetchall()
    return [_db_row_to_js_item(table, _row_to_dict(r)) for r in rows]


# ---------------------------------------------------------------------------
# Section-level write  (replaces all items at once)
# ---------------------------------------------------------------------------

def save_section(section_name, items):
    """Replace **all** rows in *section_name* with *items*.

    Each element of *items* is a dict using JS field names.  The function
    handles key-name mapping and JSON serialisation automatically.

    ``sort_order`` is set to the list index if not already present.
    """
    table = _resolve_table(section_name)
    columns = _TABLE_COLUMNS[table]
    conn = get_connection()

    try:
        conn.execute(f"DELETE FROM [{table}]")

        for idx, item in enumerate(items):
            db_row = _js_item_to_db_row(table, item)
            # Default sort_order to list position
            db_row.setdefault("sort_order", idx)

            # Build INSERT with only the columns we actually have values for
            # (so we don't overwrite defaults with NULL for missing keys).
            cols_present = [c for c in columns if c in db_row]
            # If the source data includes an explicit "id" we honour it.
            if "id" in db_row:
                cols_present = ["id"] + cols_present
            placeholders = ", ".join("?" for _ in cols_present)
            col_list = ", ".join(f"[{c}]" for c in cols_present)
            values = [db_row.get(c) for c in cols_present]

            conn.execute(
                f"INSERT INTO [{table}] ({col_list}) VALUES ({placeholders})",
                values,
            )

        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Item-level CRUD
# ---------------------------------------------------------------------------

def add_item(section_name, item_dict):
    """Insert a single item into *section_name*.

    Returns the new ``id`` (AUTOINCREMENT).
    """
    table = _resolve_table(section_name)
    columns = _TABLE_COLUMNS[table]
    conn = get_connection()

    db_row = _js_item_to_db_row(table, item_dict)
    # Assign sort_order if not provided -- put it at the end.
    if "sort_order" not in db_row:
        cur = conn.execute(
            f"SELECT COALESCE(MAX(sort_order), -1) + 1 FROM [{table}]"
        )
        db_row["sort_order"] = cur.fetchone()[0]

    cols_present = [c for c in columns if c in db_row]
    placeholders = ", ".join("?" for _ in cols_present)
    col_list = ", ".join(f"[{c}]" for c in cols_present)
    values = [db_row.get(c) for c in cols_present]

    try:
        cursor = conn.execute(
            f"INSERT INTO [{table}] ({col_list}) VALUES ({placeholders})",
            values,
        )
        conn.commit()
        return cursor.lastrowid
    except Exception:
        conn.rollback()
        raise


def update_item(section_name, item_id, item_dict):
    """Update the row with *item_id* in *section_name*.

    Only the keys present in *item_dict* are updated; other columns are
    left untouched.

    Returns ``True`` if a row was actually modified.
    """
    table = _resolve_table(section_name)
    columns = _TABLE_COLUMNS[table]
    conn = get_connection()

    db_row = _js_item_to_db_row(table, item_dict)
    # Remove 'id' from the update payload -- we use it only in WHERE.
    db_row.pop("id", None)

    cols_to_update = [c for c in columns if c in db_row]
    if not cols_to_update:
        return False

    set_clause = ", ".join(f"[{c}] = ?" for c in cols_to_update)
    values = [db_row[c] for c in cols_to_update]
    values.append(int(item_id))

    try:
        cursor = conn.execute(
            f"UPDATE [{table}] SET {set_clause} WHERE id = ?",
            values,
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception:
        conn.rollback()
        raise


def delete_item(section_name, item_id):
    """Delete the row with *item_id* from *section_name*.

    Returns ``True`` if a row was actually deleted.
    """
    table = _resolve_table(section_name)
    conn = get_connection()

    try:
        cursor = conn.execute(
            f"DELETE FROM [{table}] WHERE id = ?", (int(item_id),)
        )
        conn.commit()
        return cursor.rowcount > 0
    except Exception:
        conn.rollback()
        raise


def reorder_items(section_name, id_order_list):
    """Set ``sort_order`` for every id in *id_order_list*.

    *id_order_list* is an iterable of ``int`` ids in the desired display
    order.  The first id receives ``sort_order = 0``, the second ``1``, etc.
    """
    table = _resolve_table(section_name)
    conn = get_connection()

    try:
        for position, item_id in enumerate(id_order_list):
            conn.execute(
                f"UPDATE [{table}] SET sort_order = ? WHERE id = ?",
                (position, int(item_id)),
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Audit log
# ---------------------------------------------------------------------------

def log_audit(action, section=None, item_id=None, details=None, ip=None):
    """Append a row to the ``audit_log`` table."""
    conn = get_connection()
    now = datetime.utcnow().isoformat(timespec="seconds") + "Z"

    try:
        conn.execute(
            "INSERT INTO audit_log (timestamp, action, section, item_id, "
            "details, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
            (now, action, section, item_id, details, ip),
        )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# i18n helpers
# ---------------------------------------------------------------------------

def get_i18n():
    """Return the i18n translations as ``{lang: {key: value, ...}, ...}``."""
    conn = get_connection()
    cursor = conn.execute("SELECT lang, key, value FROM i18n ORDER BY lang, key")
    result = {}
    for row in cursor.fetchall():
        lang = row["lang"]
        if lang not in result:
            result[lang] = {}
        result[lang][row["key"]] = row["value"]
    return result


def save_i18n(i18n_dict):
    """Persist i18n translations.

    *i18n_dict* has the shape ``{lang: {key: value, ...}, ...}``.
    All existing rows are replaced.
    """
    conn = get_connection()
    try:
        conn.execute("DELETE FROM i18n")
        for lang, translations in i18n_dict.items():
            for key, value in translations.items():
                conn.execute(
                    "INSERT INTO i18n (lang, key, value) VALUES (?, ?, ?)",
                    (lang, key, value),
                )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Contact form submissions
# ---------------------------------------------------------------------------

def save_contact(name, email, subject, message, ip=None):
    """Save a contact-form submission.  Returns the new row id."""
    conn = get_connection()
    now = datetime.utcnow().isoformat(timespec="seconds") + "Z"

    try:
        cursor = conn.execute(
            "INSERT INTO contact_submissions "
            "(name, email, subject, message, submitted_at, ip_address) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (name, email, subject, message, now, ip),
        )
        conn.commit()
        return cursor.lastrowid
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Applications (ariza)
# ---------------------------------------------------------------------------

def save_application(full_name, email, phone, program, education, motivation, ip=None):
    """Save an application submission. Returns the new row id."""
    conn = get_connection()
    now = datetime.utcnow().isoformat(timespec="seconds") + "Z"
    try:
        cursor = conn.execute(
            "INSERT INTO applications "
            "(full_name, email, phone, program, education, motivation, submitted_at, ip_address) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (full_name, email, phone, program, education, motivation, now, ip),
        )
        conn.commit()
        return cursor.lastrowid
    except Exception:
        conn.rollback()
        raise


def get_applications():
    """Return all applications ordered by newest first."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM applications ORDER BY id DESC"
    ).fetchall()
    return [dict(r) for r in rows]


def update_application_status(app_id, status):
    """Update application status (pending/accepted/rejected)."""
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE applications SET status=? WHERE id=?",
            (status, int(app_id)),
        )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


def get_contact_submissions():
    """Return all contact submissions ordered by newest first."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM contact_submissions ORDER BY id DESC"
    ).fetchall()
    return [dict(r) for r in rows]


def update_contact_status(submission_id, status):
    """Update contact submission status (unread/read)."""
    conn = get_connection()
    try:
        conn.execute(
            "UPDATE contact_submissions SET status=? WHERE id=?",
            (status, int(submission_id)),
        )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Site config (key-value)
# ---------------------------------------------------------------------------

def get_site_config():
    """Return all config as {key: value, ...}."""
    conn = get_connection()
    rows = conn.execute("SELECT key, value FROM config").fetchall()
    return {r["key"]: r["value"] for r in rows}


def save_site_config(key, value):
    """Upsert a config key-value pair."""
    conn = get_connection()
    try:
        conn.execute(
            "INSERT INTO config (key, value) VALUES (?, ?) "
            "ON CONFLICT(key) DO UPDATE SET value=excluded.value",
            (key, value),
        )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Custom sections CRUD
# ---------------------------------------------------------------------------

def get_custom_sections():
    """Return all custom section definitions."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM custom_sections ORDER BY sort_order ASC, id ASC"
    ).fetchall()
    result = []
    for r in rows:
        d = dict(r)
        d["fields"] = json.loads(d["fields"]) if d["fields"] else []
        result.append(d)
    return result


def save_custom_section(section):
    """Create or update a custom section definition.
    Returns the section id."""
    conn = get_connection()
    fields_json = json.dumps(section.get("fields", []), ensure_ascii=False)
    now = datetime.utcnow().isoformat(timespec="seconds") + "Z"

    try:
        if section.get("id"):
            conn.execute(
                "UPDATE custom_sections SET label=?, icon=?, fields=?, sort_order=? WHERE id=?",
                (section["label"], section.get("icon", ""), fields_json,
                 section.get("sort_order", 0), section["id"]),
            )
            conn.commit()
            return section["id"]
        else:
            cursor = conn.execute(
                "INSERT INTO custom_sections (slug, label, icon, fields, sort_order, created_at) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (section["slug"], section["label"], section.get("icon", ""),
                 fields_json, section.get("sort_order", 0), now),
            )
            conn.commit()
            return cursor.lastrowid
    except Exception:
        conn.rollback()
        raise


def delete_custom_section(section_id):
    """Delete a custom section and all its items."""
    conn = get_connection()
    try:
        row = conn.execute("SELECT slug FROM custom_sections WHERE id=?", (section_id,)).fetchone()
        if row:
            conn.execute("DELETE FROM custom_items WHERE section_slug=?", (row["slug"],))
            conn.execute("DELETE FROM custom_sections WHERE id=?", (section_id,))
            conn.commit()
            return True
        return False
    except Exception:
        conn.rollback()
        raise


def get_custom_items(section_slug):
    """Return all items for a custom section."""
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM custom_items WHERE section_slug=? ORDER BY sort_order ASC, id ASC",
        (section_slug,),
    ).fetchall()
    result = []
    for r in rows:
        item = json.loads(r["data"]) if r["data"] else {}
        item["id"] = r["id"]
        result.append(item)
    return result


def save_custom_items(section_slug, items):
    """Replace all items for a custom section."""
    conn = get_connection()
    try:
        conn.execute("DELETE FROM custom_items WHERE section_slug=?", (section_slug,))
        for idx, item in enumerate(items):
            item_data = {k: v for k, v in item.items() if k != "id"}
            conn.execute(
                "INSERT INTO custom_items (section_slug, data, sort_order) VALUES (?, ?, ?)",
                (section_slug, json.dumps(item_data, ensure_ascii=False), idx),
            )
        conn.commit()
    except Exception:
        conn.rollback()
        raise


# ---------------------------------------------------------------------------
# Migration from in-memory DATA dict (parsed from data.js)
# ---------------------------------------------------------------------------

def migrate_from_data_js(data_dict):
    """Import a complete DATA object (as returned by ``read_data_js()`` in
    ``server.py``) into the database.

    This function is idempotent: it drops existing content in every section
    and replaces it with the contents of *data_dict*.

    Handles:
        - i18n dict
        - All twelve content sections with field-name mapping
    """
    # Ensure tables exist
    init_db()

    # i18n ------------------------------------------------------------------
    i18n = data_dict.get("i18n")
    if i18n:
        save_i18n(i18n)

    # Content sections ------------------------------------------------------
    for section_name in _SECTION_TO_TABLE:
        items = data_dict.get(section_name)
        if items is not None:
            save_section(section_name, items)

    log_audit(
        action="migrate_from_data_js",
        details=f"Imported {sum(len(data_dict.get(s, [])) for s in _SECTION_TO_TABLE)} items across all sections",
    )


# ---------------------------------------------------------------------------
# Module-level convenience: ensure tables exist on first import
# ---------------------------------------------------------------------------

def migrate_schema():
    """Add new columns to existing tables (safe to run multiple times)."""
    conn = get_connection()
    migrations = [
        ("team", "email", "TEXT"),
        ("team", "phone", "TEXT"),
        ("team", "telegram", "TEXT"),
        ("team", "website", "TEXT"),
        ("research_areas", "link", "TEXT"),
        ("publications", "pdf_url", "TEXT"),
        ("gallery", "images", "TEXT"),
        ("contact_submissions", "status", "TEXT DEFAULT 'unread'"),
    ]
    for table, column, col_type in migrations:
        try:
            conn.execute(f"ALTER TABLE [{table}] ADD COLUMN [{column}] {col_type}")
            conn.commit()
        except sqlite3.OperationalError:
            pass  # Column already exists


if __name__ == "__main__":
    init_db()
    migrate_schema()
    print(f"Database initialised at {DB_PATH}")
