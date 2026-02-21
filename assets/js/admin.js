// ============================================
// IBXI Admin Panel – Content Management System
// Full CRUD for all 12 data sections
// Clean SVG icon system, no emoji
// ============================================

(function () {
  'use strict';

  // === SVG ICONS (16x16, stroke currentColor) ===
  const I = {
    dashboard:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="1.5" width="5" height="5" rx="1"/><rect x="9.5" y="1.5" width="5" height="5" rx="1"/><rect x="1.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/></svg>',
    globe:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.25"/><path d="M1.75 8h12.5"/><ellipse cx="8" cy="8" rx="3" ry="6.25"/></svg>',
    settings:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="2"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"/></svg>',
    logout:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6"/></svg>',
    edit:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13.5H14M11 2.5a1.414 1.414 0 112 2L5 12.5l-3 1 1-3z"/></svg>',
    trash:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4.5h11M5.5 4.5V3a1 1 0 011-1h3a1 1 0 011 1v1.5M12 4.5l-.5 8.5a1 1 0 01-1 1h-5a1 1 0 01-1-1L4 4.5"/></svg>',
    duplicate:  '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="9" height="9" rx="1"/><path d="M2 11V2.5a.5.5 0 01.5-.5H11"/></svg>',
    save:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 14H3a1 1 0 01-1-1V3a1 1 0 011-1h7.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V13a1 1 0 01-1 1z"/><path d="M10 14v-4H6v4M6 2v3h4"/></svg>',
    preview:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5S1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/></svg>',
    sun:        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1M8 13.5v1M3.4 3.4l.7.7M11.9 11.9l.7.7M1.5 8h1M13.5 8h1M3.4 12.6l.7-.7M11.9 4.1l.7-.7"/></svg>',
    moon:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8.5A6 6 0 117.5 2a4.5 4.5 0 006.5 6.5z"/></svg>',
    search:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="4.5"/><path d="M14 14l-3.5-3.5"/></svg>',
    grip:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="6" cy="4" r="1.2"/><circle cx="10" cy="4" r="1.2"/><circle cx="6" cy="8" r="1.2"/><circle cx="10" cy="8" r="1.2"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/></svg>',
    plus:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>',
    warning:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.134 2.5a1 1 0 011.732 0l5.196 9a1 1 0 01-.866 1.5H2.804a1 1 0 01-.866-1.5z"/><path d="M8 6v3M8 11.5v.01"/></svg>',
    check:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-7"/></svg>',
    error:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.25"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5"/></svg>',
    info:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.25"/><path d="M8 7v4M8 5v.01"/></svg>',
    lock:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5 7V5a3 3 0 016 0v2"/></svg>',
    backup:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3M8 2v8M5 5l3-3 3 3"/></svg>',
    news:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="1"/><path d="M2 6h12M6 6v8"/></svg>',
    research:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="7" cy="7" r="4.5"/><path d="M14 14l-3.5-3.5M7 4.5v5M4.5 7h5"/></svg>',
    calendar:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="11" rx="1"/><path d="M2 7h12M5 1v4M11 1v4"/></svg>',
    book:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h4a2 2 0 012 2v10a1.5 1.5 0 00-1.5-1.5H2V2zM14 2h-4a2 2 0 00-2 2v10a1.5 1.5 0 011.5-1.5H14V2z"/></svg>',
    users:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5" r="2.5"/><path d="M1 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5"/><circle cx="12" cy="5.5" r="1.5"/><path d="M15 14c0-1.5-1-3-3-3.5"/></svg>',
    academic:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1L1 5l7 4 7-4zM3 7v4c0 1.5 2.5 3 5 3s5-1.5 5-3V7"/></svg>',
    video:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="3" width="10" height="10" rx="1"/><path d="M11.5 6l3-2v8l-3-2"/></svg>',
    help:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.25"/><path d="M6 6a2 2 0 013.5 1.5c0 1.5-2 1.5-2 3"/><circle cx="8" cy="12.5" r=".5" fill="currentColor" stroke="none"/></svg>',
    pencil:     '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2.5a1.414 1.414 0 112 2L5 12.5l-3 1 1-3z"/></svg>',
    chat:       '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 2h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 3V3a1 1 0 011-1z"/></svg>',
    image:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="12" height="12" rx="1"/><circle cx="5.5" cy="5.5" r="1"/><path d="M14 10l-3-3-7 7"/></svg>',
    empty:      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M2 7h12"/></svg>',
  };

  // Section key → icon key mapping
  const SI = {
    news:'news', researchAreas:'research', events:'calendar',
    publications:'book', team:'users', programs:'academic',
    videos:'video', faq:'help', blogPosts:'pencil',
    testimonials:'chat', gallery:'image'
  };

  // === STATE ===
  let authToken = sessionStorage.getItem('ibxi_admin_token') || null;
  let currentData = null;
  let currentSection = 'dashboard';
  let hasUnsaved = false;
  let darkMode = localStorage.getItem('ibxi_theme') !== 'light';
  let confirmCallback = null;
  let dragFromIdx = null;
  let dragSectionKey = null;

  // === SECTION SCHEMAS ===
  const SCHEMAS = {
    news: {
      label: 'Yangiliklar / News', icon: I.news, idKey: 'id',
      display: i => ({ t: i.title, m: [i.category, i.date, i.author].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'image', type: 'image', label: 'Thumbnail image' },
        { key: 'featured', type: 'checkbox', label: 'Featured' },
        { key: 'tag', type: 'text', label: 'Teg (UZ)', required: true, half: true },
        { key: 'tag_en', type: 'text', label: 'Tag (EN)', half: true },
        { key: 'tag_ar', type: 'text', label: 'Tag (AR)', dir: 'rtl', half: true },
        { key: 'tag_tr', type: 'text', label: 'Etiket (TR)', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'summary', type: 'textarea', label: 'Qisqacha (UZ)', required: true },
        { key: 'summary_en', type: 'textarea', label: 'Summary (EN)' },
        { key: 'summary_ar', type: 'textarea', label: 'Summary (AR)', dir: 'rtl' },
        { key: 'summary_tr', type: 'textarea', label: 'Özet (TR)' },
        { key: 'date', type: 'text', label: 'Sana', half: true, placeholder: '15 Yanvar 2025' },
        { key: 'category', type: 'select', label: 'Kategoriya', half: true,
          options: ['Tadbir', 'Nashr', 'Akademiya', 'Xalqaro', 'Tadqiqot', 'Konferensiya'] },
        { key: 'color', type: 'color', label: 'Rang', half: true },
        { key: 'author', type: 'text', label: 'Muallif', half: true },
        { key: 'readTime', type: 'text', label: 'O\'qish vaqti', half: true, placeholder: '3 daq' },
      ]
    },
    researchAreas: {
      label: 'Tadqiqot yo\'nalishlari / Research', icon: I.research, idKey: 'id',
      display: i => ({ t: i.title, m: (i.count || 0) + ' study' }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'image', type: 'image', label: 'Cover image' },
        { key: 'count', type: 'number', label: 'Study count', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'desc', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'desc_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'desc_ar', type: 'textarea', label: 'Description (AR)', dir: 'rtl' },
        { key: 'desc_tr', type: 'textarea', label: 'Açıklama (TR)' },
      ]
    },
    events: {
      label: 'Tadbirlar / Events', icon: I.calendar, idKey: 'id',
      display: i => ({ t: i.title, m: [i.day + ' ' + i.month, i.type, i.location].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'image', type: 'image', label: 'Event banner' },
        { key: 'day', type: 'text', label: 'Kun', half: true, placeholder: '25' },
        { key: 'month', type: 'text', label: 'Oy (UZ)', half: true, placeholder: 'YAN' },
        { key: 'month_en', type: 'text', label: 'Month (EN)', half: true, placeholder: 'JAN' },
        { key: 'month_ar', type: 'text', label: 'Month (AR)', half: true, dir: 'rtl' },
        { key: 'month_tr', type: 'text', label: 'Ay (TR)', half: true, placeholder: 'OCA' },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'type', type: 'select', label: 'Type', half: true,
          options: ['seminar', 'conference', 'workshop', 'online'] },
        { key: 'location', type: 'text', label: 'Location', half: true },
        { key: 'time', type: 'text', label: 'Time', half: true, placeholder: '14:00 - 17:00' },
        { key: 'speaker', type: 'text', label: 'Speaker', half: true },
        { key: 'description', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'description_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'description_tr', type: 'textarea', label: 'Açıklama (TR)' },
        { key: 'capacity', type: 'number', label: 'Capacity', half: true },
        { key: 'registered', type: 'number', label: 'Registered', half: true },
      ]
    },
    publications: {
      label: 'Nashrlar / Publications', icon: I.book, idKey: 'id',
      display: i => ({ t: i.title, m: [i.author, i.year, i.type].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'abbr', type: 'text', label: 'Abbreviation', half: true, placeholder: 'UMI' },
        { key: 'year', type: 'text', label: 'Year', half: true, placeholder: '2024' },
        { key: 'type', type: 'select', label: 'Type', half: true,
          options: ['Kitob', 'Tadqiqot', 'To\'plam', 'Hisobot', 'Maqola', 'Lug\'at'] },
        { key: 'coverImage', type: 'image', label: 'Book cover' },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'author', type: 'text', label: 'Author', required: true },
        { key: 'desc', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'desc_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'desc_tr', type: 'textarea', label: 'Açıklama (TR)' },
        { key: 'color', type: 'color', label: 'Color', half: true },
        { key: 'pages', type: 'number', label: 'Pages', half: true },
        { key: 'language', type: 'text', label: 'Language', half: true, placeholder: 'O\'zbekcha' },
        { key: 'series', type: 'text', label: 'Series', half: true },
        { key: 'tags', type: 'tags', label: 'Tags' },
      ]
    },
    team: {
      label: 'Jamoa / Team', icon: I.users, idKey: 'id',
      display: i => ({ t: i.name, m: [i.role, i.dept].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'name', type: 'text', label: 'Full name', required: true },
        { key: 'initials', type: 'text', label: 'Initials', half: true, placeholder: 'AY' },
        { key: 'avatarColor', type: 'color', label: 'Avatar color', half: true },
        { key: 'avatar', type: 'image', label: 'Profile photo' },
        { key: 'role', type: 'text', label: 'Lavozim (UZ)', required: true, half: true },
        { key: 'role_en', type: 'text', label: 'Role (EN)', half: true },
        { key: 'role_tr', type: 'text', label: 'Role (TR)', half: true },
        { key: 'dept', type: 'text', label: 'Bo\'lim (UZ)', half: true },
        { key: 'dept_en', type: 'text', label: 'Dept (EN)', half: true },
        { key: 'dept_tr', type: 'text', label: 'Dept (TR)', half: true },
        { key: 'bio', type: 'textarea', label: 'Tarjimai hol (UZ)' },
        { key: 'bio_en', type: 'textarea', label: 'Bio (EN)' },
        { key: 'bio_tr', type: 'textarea', label: 'Bio (TR)' },
        { key: 'education', type: 'text', label: 'Education' },
        { key: 'specialization', type: 'tags', label: 'Specialization' },
      ]
    },
    programs: {
      label: 'Dasturlar / Programs', icon: I.academic, idKey: 'id',
      display: i => ({ t: i.title, m: [i.duration, i.level, i.status].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'status', type: 'select', label: 'Status', half: true, options: ['active', 'upcoming'] },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'duration', type: 'text', label: 'Duration', half: true, placeholder: '12 hafta' },
        { key: 'level', type: 'select', label: 'Level', half: true,
          options: ['Boshlang\'ich', 'O\'rta', 'Yuqori', 'Barcha darajalar'] },
        { key: 'lang', type: 'text', label: 'Language', half: true, placeholder: 'O\'zbekcha' },
        { key: 'students', type: 'number', label: 'Students', half: true },
      ]
    },
    videos: {
      label: 'Videolar / Videos', icon: I.video, idKey: 'id',
      display: i => ({ t: i.title, m: [i.category, i.duration, i.speaker].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'emoji', type: 'text', label: 'Emoji', half: true },
        { key: 'thumbnail', type: 'image', label: 'Video thumbnail' },
        { key: 'videoUrl', type: 'text', label: 'Video URL (YouTube)', placeholder: 'https://youtube.com/watch?v=...' },
        { key: 'category', type: 'select', label: 'Category', half: true,
          options: ['Konferensiya', 'Dars', 'Panel'] },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'views', type: 'text', label: 'Views', half: true, placeholder: '12.4K' },
        { key: 'duration', type: 'text', label: 'Duration', half: true, placeholder: '52:18' },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-15' },
        { key: 'speaker', type: 'text', label: 'Speaker', half: true },
        { key: 'description', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'description_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'description_tr', type: 'textarea', label: 'Açıklama (TR)' },
      ]
    },
    faq: {
      label: 'TSS / FAQ', icon: I.help, idKey: null,
      display: i => ({ t: i.q, m: i.category || '' }),
      fields: [
        { key: 'q', type: 'text', label: 'Savol (UZ)', required: true },
        { key: 'q_en', type: 'text', label: 'Question (EN)' },
        { key: 'q_ar', type: 'text', label: 'Question (AR)', dir: 'rtl' },
        { key: 'q_tr', type: 'text', label: 'Soru (TR)' },
        { key: 'a', type: 'textarea', label: 'Javob (UZ)', required: true },
        { key: 'a_en', type: 'textarea', label: 'Answer (EN)' },
        { key: 'a_ar', type: 'textarea', label: 'Answer (AR)', dir: 'rtl' },
        { key: 'a_tr', type: 'textarea', label: 'Cevap (TR)' },
        { key: 'category', type: 'select', label: 'Category',
          options: ['Akademiya', 'Xalqaro', 'Nashr', 'Umumiy', 'Tadbir', 'Tadqiqot'] },
      ]
    },
    blogPosts: {
      label: 'Maqolalar / Blog', icon: I.pencil, idKey: 'id',
      display: i => ({ t: i.title, m: [i.category, i.date, i.author].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'image', type: 'image', label: 'Article image' },
        { key: 'featured', type: 'checkbox', label: 'Featured' },
        { key: 'category', type: 'text', label: 'Category', half: true, placeholder: 'Falsafa' },
        { key: 'color', type: 'color', label: 'Color', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'excerpt', type: 'textarea', label: 'Parcha (UZ)', required: true },
        { key: 'excerpt_en', type: 'textarea', label: 'Excerpt (EN)' },
        { key: 'excerpt_tr', type: 'textarea', label: 'Excerpt (TR)' },
        { key: 'author', type: 'text', label: 'Author', half: true },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-10' },
        { key: 'readTime', type: 'text', label: 'Read time', half: true, placeholder: '8 daq' },
        { key: 'tags', type: 'tags', label: 'Tags' },
      ]
    },
    testimonials: {
      label: 'Fikrlar / Testimonials', icon: I.chat, idKey: 'id',
      display: i => ({ t: i.name, m: [i.institution, i.country].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'emoji', type: 'text', label: 'Flag emoji', half: true },
        { key: 'avatar', type: 'image', label: 'Photo' },
        { key: 'name', type: 'text', label: 'Full name', required: true },
        { key: 'institution', type: 'text', label: 'Institution' },
        { key: 'country', type: 'text', label: 'Country', half: true },
        { key: 'quote', type: 'textarea', label: 'Iqtibos (UZ)', required: true },
        { key: 'quote_en', type: 'textarea', label: 'Quote (EN)' },
        { key: 'quote_tr', type: 'textarea', label: 'Alıntı (TR)' },
      ]
    },
    gallery: {
      label: 'Galereya / Gallery', icon: I.image, idKey: 'id',
      display: i => ({ t: i.title, m: [i.category, i.date, (i.count||0) + ' photos'].filter(Boolean).join(' \u00b7 ') }),
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'coverImage', type: 'image', label: 'Cover image' },
        { key: 'count', type: 'number', label: 'Photo count', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_tr', type: 'text', label: 'Başlık (TR)' },
        { key: 'category', type: 'text', label: 'Category', half: true, placeholder: 'Simpozium' },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-15' },
        { key: 'color', type: 'color', label: 'Color', half: true },
      ]
    },
  };

  const SECTION_ORDER = ['news','researchAreas','events','publications','team','programs','videos','faq','blogPosts','testimonials','gallery'];

  // ───────────────────────────────────────────
  // INITIALIZATION
  // ───────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    if (authToken) verifyAndLoad();
  });

  async function verifyAndLoad() {
    try {
      const res = await fetch('/api/data', { headers: authHeaders() });
      if (res.ok) {
        currentData = await res.json();
        showApp();
      } else {
        sessionStorage.removeItem('ibxi_admin_token');
        authToken = null;
      }
    } catch (e) { console.error(e); }
  }

  // ───────────────────────────────────────────
  // API LAYER
  // ───────────────────────────────────────────
  function authHeaders() {
    return { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' };
  }

  async function api(method, path, body) {
    const opts = { method, headers: path === '/api/login' ? { 'Content-Type': 'application/json' } : authHeaders() };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(path, opts);
    return res.json();
  }

  // ───────────────────────────────────────────
  // AUTH
  // ───────────────────────────────────────────
  window.handleLogin = async function (e) {
    e.preventDefault();
    const pwd = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    const err = document.getElementById('login-error');
    if (!pwd) { err.textContent = 'Enter password'; return; }
    btn.disabled = true; btn.textContent = 'Logging in...';
    try {
      const r = await api('POST', '/api/login', { password: pwd });
      if (r.success) {
        authToken = r.token;
        sessionStorage.setItem('ibxi_admin_token', authToken);
        currentData = await api('GET', '/api/data');
        showApp();
      } else {
        err.textContent = r.error || 'Invalid password';
      }
    } catch (ex) { err.textContent = 'Connection error'; }
    btn.disabled = false; btn.textContent = 'Login';
  };

  function showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    renderSidebar();
    renderTopbar();
    nav('dashboard');
  }

  // ───────────────────────────────────────────
  // NAVIGATION
  // ───────────────────────────────────────────
  function nav(section) {
    currentSection = section;
    renderSidebar();
    renderTopbar();
    const el = document.getElementById('admin-content');
    if (section === 'dashboard') renderDashboard(el);
    else if (section === 'i18n') renderI18n(el);
    else if (section === 'settings') renderSettings(el);
    else renderSection(el, section);
    el.scrollTop = 0;
  }
  window.adminNav = function (s) { nav(s); };

  // ───────────────────────────────────────────
  // SIDEBAR
  // ───────────────────────────────────────────
  function renderSidebar() {
    const sb = document.getElementById('admin-sidebar');
    const contentItems = SECTION_ORDER.map(key => {
      const s = SCHEMAS[key];
      const arr = currentData[key];
      const count = Array.isArray(arr) ? arr.length : 0;
      return `<div class="admin-nav-item ${currentSection===key?'active':''}" onclick="adminNav('${key}')">
        <span class="nav-icon">${s.icon}</span>
        <span>${s.label.split('/')[0].trim()}</span>
        <span class="nav-count">${count}</span>
      </div>`;
    }).join('');

    sb.innerHTML = `
      <div class="admin-sidebar-logo">
        <img src="assets/img/logo-gold.png" alt="Logo" style="width:28px;height:28px;object-fit:contain" />
        <span>Admin Panel</span>
      </div>
      <nav class="admin-nav">
        <div class="admin-nav-label">Overview</div>
        <div class="admin-nav-item ${currentSection==='dashboard'?'active':''}" onclick="adminNav('dashboard')">
          <span class="nav-icon">${I.dashboard}</span><span>Dashboard</span>
        </div>
        <div class="admin-nav-item ${currentSection==='i18n'?'active':''}" onclick="adminNav('i18n')">
          <span class="nav-icon">${I.globe}</span><span>Translations</span>
          <span class="nav-count">${Object.keys(currentData.i18n.uz||{}).length}</span>
        </div>
        <div class="admin-nav-label">Content</div>
        ${contentItems}
        <div class="admin-nav-label">System</div>
        <div class="admin-nav-item ${currentSection==='settings'?'active':''}" onclick="adminNav('settings')">
          <span class="nav-icon">${I.settings}</span><span>Settings</span>
        </div>
      </nav>
      <div class="admin-sidebar-footer">
        <div class="admin-nav-item" onclick="doLogout()">
          <span class="nav-icon">${I.logout}</span><span>Logout</span>
        </div>
      </div>`;
  }

  // ───────────────────────────────────────────
  // TOPBAR
  // ───────────────────────────────────────────
  function renderTopbar() {
    const tb = document.getElementById('admin-topbar');
    const labels = { dashboard:'Dashboard', i18n:'Translations', settings:'Settings' };
    const label = labels[currentSection] || (SCHEMAS[currentSection]?.label || currentSection);
    tb.innerHTML = `
      <div class="admin-topbar-left">
        <span class="admin-breadcrumb">${label}</span>
      </div>
      <div class="admin-topbar-right">
        <button class="admin-topbar-btn" onclick="window.open('/','_blank')" title="Preview site">
          ${I.preview} Preview
        </button>
        <button class="admin-topbar-btn" onclick="toggleTheme()">
          ${darkMode ? I.sun : I.moon}
        </button>
        <button class="admin-topbar-btn admin-save-btn${hasUnsaved?' has-unsaved':''}" onclick="saveAll()" id="save-btn">
          ${I.save} Save${hasUnsaved?' *':''}
        </button>
      </div>`;
  }

  // ───────────────────────────────────────────
  // DASHBOARD
  // ───────────────────────────────────────────
  function renderDashboard(el) {
    const stats = SECTION_ORDER.map(key => {
      const s = SCHEMAS[key]; const c = (currentData[key]||[]).length;
      return `<div class="admin-stat-card" onclick="adminNav('${key}')">
        <div class="admin-stat-count">${c}</div>
        <div class="admin-stat-label">${s.label.split('/')[0].trim()}</div>
      </div>`;
    }).join('');
    const i18nC = Object.keys(currentData.i18n.uz||{}).length;
    el.innerHTML = `
      <div class="admin-dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage all content for the IBXI application</p>
      </div>
      <div class="admin-stat-grid">
        <div class="admin-stat-card" onclick="adminNav('i18n')">
          <div class="admin-stat-count">${i18nC}</div>
          <div class="admin-stat-label">Translation keys</div>
        </div>
        ${stats}
      </div>`;
  }

  // ───────────────────────────────────────────
  // SECTION LIST VIEW
  // ───────────────────────────────────────────
  function renderSection(el, key) {
    const schema = SCHEMAS[key];
    const items = currentData[key] || [];

    const cards = items.map((item, idx) => {
      const d = schema.display(item);
      return `<div class="admin-item-card" data-idx="${idx}"
          data-search="${esc(d.t+' '+d.m).toLowerCase()}"
          draggable="true"
          ondragstart="dStart(event,${idx},'${key}')" ondragover="dOver(event)"
          ondrop="dDrop(event,${idx},'${key}')" ondragend="dEnd(event)">
        <div class="admin-drag-handle" title="Drag to reorder">${I.grip}</div>
        <div class="admin-item-info">
          <div class="admin-item-title">${esc(d.t)}</div>
          <div class="admin-item-meta">${esc(d.m)}</div>
        </div>
        <div class="admin-item-actions">
          <button class="admin-action-btn" onclick="aDup('${key}',${idx})" title="Duplicate">${I.duplicate}</button>
          <button class="admin-action-btn" onclick="aEdit('${key}',${idx})" title="Edit">${I.edit}</button>
          <button class="admin-action-btn danger" onclick="aDel('${key}',${idx})" title="Delete">${I.trash}</button>
        </div>
      </div>`;
    }).join('');

    const emptyHtml = '<div class="admin-empty"><div class="admin-empty-icon">' + I.empty + '</div><div class="admin-empty-text">No records yet</div></div>';

    el.innerHTML = `
      <div class="admin-section-header">
        <div class="admin-section-title">
          ${schema.label}
          <span class="admin-section-count">${items.length}</span>
        </div>
        <button class="admin-add-btn" onclick="aAdd('${key}')">${I.plus} Add new</button>
      </div>
      <div class="admin-search-bar">
        <span class="search-icon">${I.search}</span>
        <input type="text" placeholder="Search..." oninput="aSearch(this.value)" id="section-search" />
      </div>
      <div class="admin-item-list" id="item-list">
        ${cards || emptyHtml}
      </div>`;
  }

  // ───────────────────────────────────────────
  // SEARCH
  // ───────────────────────────────────────────
  window.aSearch = function (q) {
    q = q.toLowerCase();
    document.querySelectorAll('#item-list .admin-item-card').forEach(c => {
      c.style.display = (c.dataset.search || '').includes(q) ? '' : 'none';
    });
  };

  // ───────────────────────────────────────────
  // ADD / EDIT / DUPLICATE / DELETE
  // ───────────────────────────────────────────
  window.aAdd = function (key) {
    const schema = SCHEMAS[key];
    const item = {};
    schema.fields.forEach(f => {
      if (f.auto && f.key === 'id') item.id = nextId(key);
      else if (f.type === 'number') item[f.key] = 0;
      else if (f.type === 'checkbox') item[f.key] = false;
      else if (f.type === 'tags') item[f.key] = [];
      else item[f.key] = '';
    });
    openForm(key, item, true, -1);
  };

  window.aEdit = function (key, idx) {
    const item = currentData[key][idx];
    if (!item) return;
    openForm(key, JSON.parse(JSON.stringify(item)), false, idx);
  };

  window.aDup = function (key, idx) {
    const schema = SCHEMAS[key];
    const original = currentData[key][idx];
    if (!original) return;
    const clone = JSON.parse(JSON.stringify(original));
    if (schema.idKey) clone[schema.idKey] = nextId(key);
    const tf = schema.fields.find(f => f.key === 'title' || f.key === 'name' || f.key === 'q');
    if (tf && clone[tf.key]) clone[tf.key] += ' (copy)';
    openForm(key, clone, true, -1);
    toast('Record duplicated', 'info');
  };

  window.aDel = function (key, idx) {
    const item = currentData[key][idx];
    const title = item?.title || item?.name || item?.q || '#' + (idx+1);
    showConfirm('Delete this record?', '"' + title + '" will be permanently removed.', () => {
      currentData[key].splice(idx, 1);
      markUnsaved();
      renderSection(document.getElementById('admin-content'), key);
      renderSidebar();
      toast('Record deleted', 'info');
    });
  };

  // ───────────────────────────────────────────
  // FORM (MODAL)
  // ───────────────────────────────────────────
  function openForm(sectionKey, item, isNew, idx) {
    const schema = SCHEMAS[sectionKey];
    const fieldsHtml = schema.fields.map(f => {
      const val = item[f.key] ?? '';
      const cls = f.half ? 'admin-form-group' : 'admin-form-group full-width';
      const req = f.required ? '<span class="req">*</span>' : '';
      const ro = f.auto ? 'readonly' : '';
      const ph = f.placeholder ? 'placeholder="' + f.placeholder + '"' : '';
      const dir = f.dir ? 'dir="' + f.dir + '"' : '';

      if (f.type === 'textarea') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
          '<textarea class="admin-form-input" data-key="' + f.key + '" ' + dir + ' ' + ro + '>' + esc(String(val)) + '</textarea></div>';
      }
      if (f.type === 'select') {
        const opts = (f.options||[]).map(o => '<option value="' + o + '" ' + (val===o?'selected':'') + '>' + o + '</option>').join('');
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
          '<select class="admin-form-input" data-key="' + f.key + '"><option value="">-- Select --</option>' + opts + '</select></div>';
      }
      if (f.type === 'checkbox') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-toggle" onclick="togClick(this)">' +
            '<div class="admin-toggle-track ' + (val?'on':'') + '" data-key="' + f.key + '"><div class="admin-toggle-thumb"></div></div>' +
            '<span class="admin-toggle-label">' + (val ? 'Yes' : 'No') + '</span>' +
          '</div></div>';
      }
      if (f.type === 'color') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-color-group">' +
            '<input type="color" value="' + (val||'#0e3526') + '" onchange="this.nextElementSibling.value=this.value" />' +
            '<input type="text" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" onchange="this.previousElementSibling.value=this.value" />' +
          '</div></div>';
      }
      if (f.type === 'tags') {
        const tags = Array.isArray(val) ? val : [];
        const pills = tags.map(t => '<span class="admin-tag-pill">' + esc(t) + '<span class="tag-remove" onclick="rmTag(this)">\u00d7</span></span>').join('');
        return '<div class="admin-form-group full-width"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-tags-wrap" data-key="' + f.key + '" onclick="this.querySelector(\'input\').focus()">' +
            pills + '<input class="admin-tags-input" placeholder="Type and press Enter..." onkeydown="tagKey(event,this)" />' +
          '</div></div>';
      }
      if (f.type === 'image') {
        const preview = val
          ? '<img src="' + esc(String(val)) + '" class="admin-img-preview" />'
          : '<div class="admin-img-placeholder">' + I.image + '<span>No image</span></div>';
        return '<div class="admin-form-group full-width"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-img-field" data-key="' + f.key + '">' +
            '<div class="admin-img-preview-wrap">' + preview + '</div>' +
            '<div class="admin-img-actions">' +
              '<label class="admin-btn admin-btn-ghost admin-img-upload-btn">' +
                I.backup + ' Choose file' +
                '<input type="file" accept="image/*" onchange="imgUpload(this,\'' + f.key + '\')" />' +
              '</label>' +
              (val ? '<button type="button" class="admin-btn admin-btn-ghost" onclick="imgClear(\'' + f.key + '\')">Clear</button>' : '') +
            '</div>' +
            '<input type="hidden" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" />' +
          '</div></div>';
      }
      return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
        '<input type="' + (f.type==='number'?'number':'text') + '" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" ' + dir + ' ' + ro + ' ' + ph + ' /></div>';
    }).join('');

    const mc = document.getElementById('admin-modal-content');
    mc.innerHTML = '<div class="admin-form">' +
      '<h2>' + (isNew ? 'Add new' : 'Edit') + ' \u2014 ' + schema.label.split('/')[0].trim() + '</h2>' +
      '<div class="admin-form-grid">' + fieldsHtml + '</div>' +
      '<div class="admin-form-actions">' +
        '<button class="admin-btn admin-btn-ghost" onclick="closeModal(\'admin-modal\')">Cancel</button>' +
        '<button class="admin-btn admin-btn-primary" onclick="formSave(\'' + sectionKey + '\',' + (isNew?1:0) + ',' + idx + ')">' +
          (isNew ? 'Add' : 'Save') +
        '</button>' +
      '</div></div>';
    openModal('admin-modal');
  }

  // Toggle click handler
  window.togClick = function (el) {
    const track = el.querySelector('.admin-toggle-track');
    track.classList.toggle('on');
    el.querySelector('.admin-toggle-label').textContent = track.classList.contains('on') ? 'Yes' : 'No';
  };

  // Tag helpers
  window.tagKey = function (e, input) {
    if (e.key === 'Enter' && input.value.trim()) {
      e.preventDefault();
      const wrap = input.closest('.admin-tags-wrap');
      const pill = document.createElement('span');
      pill.className = 'admin-tag-pill';
      pill.innerHTML = esc(input.value.trim()) + '<span class="tag-remove" onclick="rmTag(this)">\u00d7</span>';
      wrap.insertBefore(pill, input);
      input.value = '';
    }
  };
  window.rmTag = function (el) { el.closest('.admin-tag-pill').remove(); };

  // Image upload handler
  window.imgUpload = async function (input, key) {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast('File too large (max 5MB)', 'error'); return; }
    if (!file.type.startsWith('image/')) { toast('Only image files allowed', 'error'); return; }
    const wrap = input.closest('.admin-img-field');
    const pw = wrap.querySelector('.admin-img-preview-wrap');
    pw.innerHTML = '<div class="admin-img-placeholder">' + I.info + '<span>Uploading...</span></div>';
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: { 'Authorization': 'Bearer ' + authToken }, body: fd });
      const r = await res.json();
      if (r.success) {
        wrap.querySelector('input[data-key="' + key + '"]').value = r.path;
        pw.innerHTML = '<img src="' + r.path + '" class="admin-img-preview" />';
        wrap.querySelector('.admin-img-actions').innerHTML =
          '<label class="admin-btn admin-btn-ghost admin-img-upload-btn">' + I.backup + ' Change<input type="file" accept="image/*" onchange="imgUpload(this,\'' + key + '\')" /></label>' +
          '<button type="button" class="admin-btn admin-btn-ghost" onclick="imgClear(\'' + key + '\')">Clear</button>';
        toast('Image uploaded', 'success');
      } else {
        toast('Upload failed: ' + (r.error || ''), 'error');
        pw.innerHTML = '<div class="admin-img-placeholder">' + I.image + '<span>No image</span></div>';
      }
    } catch (e) {
      toast('Upload error: ' + e.message, 'error');
      pw.innerHTML = '<div class="admin-img-placeholder">' + I.image + '<span>No image</span></div>';
    }
  };

  window.imgClear = function (key) {
    const modal = document.getElementById('admin-modal-content');
    const wrap = modal.querySelector('.admin-img-field[data-key="' + key + '"]');
    if (!wrap) return;
    wrap.querySelector('input[data-key="' + key + '"]').value = '';
    wrap.querySelector('.admin-img-preview-wrap').innerHTML =
      '<div class="admin-img-placeholder">' + I.image + '<span>No image</span></div>';
    wrap.querySelector('.admin-img-actions').innerHTML =
      '<label class="admin-btn admin-btn-ghost admin-img-upload-btn">' + I.backup + ' Choose file<input type="file" accept="image/*" onchange="imgUpload(this,\'' + key + '\')" /></label>';
  };

  // Collect form data
  function collectForm(sectionKey) {
    const schema = SCHEMAS[sectionKey];
    const item = {};
    const modal = document.getElementById('admin-modal-content');
    schema.fields.forEach(f => {
      if (f.type === 'checkbox') {
        const t = modal.querySelector('[data-key="' + f.key + '"]');
        item[f.key] = t ? t.classList.contains('on') : false;
      } else if (f.type === 'tags') {
        const w = modal.querySelector('.admin-tags-wrap[data-key="' + f.key + '"]');
        item[f.key] = w ? [...w.querySelectorAll('.admin-tag-pill')].map(p => p.childNodes[0].textContent.trim()) : [];
      } else if (f.type === 'color') {
        const inp = modal.querySelector('input[data-key="' + f.key + '"]');
        item[f.key] = inp ? inp.value : '';
      } else {
        const inp = modal.querySelector('[data-key="' + f.key + '"]');
        if (!inp) return;
        item[f.key] = f.type === 'number' ? (Number(inp.value) || 0) : inp.value;
      }
    });
    return item;
  }

  // Save form
  window.formSave = function (key, isNew, idx) {
    const schema = SCHEMAS[key];
    const item = collectForm(key);
    const missing = schema.fields.filter(f => f.required && !item[f.key]);
    if (missing.length) {
      toast('Required fields: ' + missing.map(f => f.label).join(', '), 'error');
      return;
    }
    if (isNew) {
      currentData[key].push(item);
    } else {
      currentData[key][idx] = item;
    }
    markUnsaved();
    closeModal('admin-modal');
    renderSection(document.getElementById('admin-content'), key);
    renderSidebar();
    toast(isNew ? 'Record added' : 'Record updated', 'success');
  };

  // ───────────────────────────────────────────
  // DRAG & DROP
  // ───────────────────────────────────────────
  window.dStart = function (e, idx, key) {
    dragFromIdx = idx; dragSectionKey = key;
    e.target.closest('.admin-item-card').classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  };
  window.dOver = function (e) {
    e.preventDefault(); e.dataTransfer.dropEffect = 'move';
    const card = e.target.closest('.admin-item-card');
    if (card) {
      document.querySelectorAll('.drag-over').forEach(c => c.classList.remove('drag-over'));
      card.classList.add('drag-over');
    }
  };
  window.dDrop = function (e, toIdx, key) {
    e.preventDefault();
    document.querySelectorAll('.drag-over').forEach(c => c.classList.remove('drag-over'));
    if (dragSectionKey !== key || dragFromIdx === null || dragFromIdx === toIdx) return;
    const arr = currentData[key];
    const [moved] = arr.splice(dragFromIdx, 1);
    arr.splice(toIdx, 0, moved);
    dragFromIdx = null; dragSectionKey = null;
    markUnsaved();
    renderSection(document.getElementById('admin-content'), key);
    toast('Order updated', 'info');
  };
  window.dEnd = function (e) {
    e.target.closest('.admin-item-card')?.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(c => c.classList.remove('drag-over'));
    dragFromIdx = null;
  };

  // ───────────────────────────────────────────
  // i18n EDITOR
  // ───────────────────────────────────────────
  function renderI18n(el) {
    const keys = Object.keys(currentData.i18n.uz || {});
    const rows = keys.map(k => '<tr>' +
      '<td><span class="admin-i18n-key">' + esc(k) + '</span></td>' +
      '<td><input value="' + esc(currentData.i18n.uz[k]||'') + '" data-lang="uz" data-key="' + k + '" onchange="i18nSet(this)" /></td>' +
      '<td><input value="' + esc(currentData.i18n.en[k]||'') + '" data-lang="en" data-key="' + k + '" onchange="i18nSet(this)" /></td>' +
      '<td><input value="' + esc(currentData.i18n.ar[k]||'') + '" data-lang="ar" data-key="' + k + '" dir="rtl" onchange="i18nSet(this)" /></td>' +
      '<td><input value="' + esc(currentData.i18n.tr[k]||'') + '" data-lang="tr" data-key="' + k + '" onchange="i18nSet(this)" /></td>' +
    '</tr>').join('');

    el.innerHTML = `
      <div class="admin-section-header">
        <div class="admin-section-title">Translations <span class="admin-section-count">${keys.length} keys</span></div>
        <button class="admin-add-btn" onclick="i18nAdd()">${I.plus} Add key</button>
      </div>
      <p style="font-size:11px;color:var(--text-3);margin-bottom:12px">
        Edit all interface text for Uzbek, English, Arabic and Turkish.
      </p>
      <div style="overflow-x:auto">
        <table class="admin-i18n-table">
          <thead><tr><th style="width:140px">Key</th><th>O'zbekcha (UZ)</th><th>English (EN)</th><th>Arabic (AR)</th><th>Türkçe (TR)</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  window.i18nSet = function (inp) {
    currentData.i18n[inp.dataset.lang][inp.dataset.key] = inp.value;
    markUnsaved();
  };

  window.i18nAdd = function () {
    const k = prompt('Enter new translation key (e.g. nav_settings):');
    if (!k || !k.trim()) return;
    const key = k.trim();
    if (currentData.i18n.uz[key] !== undefined) { toast('Key already exists', 'error'); return; }
    currentData.i18n.uz[key] = '';
    currentData.i18n.en[key] = '';
    currentData.i18n.ar[key] = '';
    currentData.i18n.tr[key] = '';
    markUnsaved();
    renderI18n(document.getElementById('admin-content'));
    toast('Translation key added', 'success');
  };

  // ───────────────────────────────────────────
  // SETTINGS
  // ───────────────────────────────────────────
  function renderSettings(el) {
    el.innerHTML = `
      <div class="admin-dashboard-header">
        <h1>Settings</h1>
        <p>Admin panel configuration</p>
      </div>
      <div class="settings-grid">
        <div class="settings-card">
          <h3>Change password</h3>
          <p>Update the admin panel login password</p>
          <div class="settings-form">
            <div class="admin-form-group full-width">
              <label class="admin-form-label">Current password <span class="req">*</span></label>
              <input type="password" class="admin-form-input" id="pwd-current" />
            </div>
            <div class="admin-form-group full-width">
              <label class="admin-form-label">New password <span class="req">*</span></label>
              <input type="password" class="admin-form-input" id="pwd-new" />
            </div>
            <div class="admin-form-group full-width">
              <label class="admin-form-label">Confirm new password <span class="req">*</span></label>
              <input type="password" class="admin-form-input" id="pwd-confirm" />
            </div>
          </div>
          <button class="admin-btn admin-btn-primary" onclick="changePwd()" id="pwd-btn">Change password</button>
          <div id="pwd-error" class="settings-error"></div>
        </div>

        <div class="settings-card">
          <h3>Backup</h3>
          <p>Create a manual backup. Automatic backups are created on every save.</p>
          <button class="admin-btn admin-btn-ghost" onclick="manualBackup()">Create backup</button>
        </div>

        <div class="settings-card">
          <h3>About</h3>
          <p>IBXI Admin Panel v2.0</p>
          <div style="font-size:11px;color:var(--text-3);line-height:2">
            <div>Default password: <code>ide2025admin</code></div>
            <div>Data file: <code>assets/js/data.js</code></div>
            <div>Backups: <code>backups/</code></div>
          </div>
        </div>
      </div>`;
  }

  window.changePwd = async function () {
    const cur = document.getElementById('pwd-current').value;
    const np = document.getElementById('pwd-new').value;
    const conf = document.getElementById('pwd-confirm').value;
    const err = document.getElementById('pwd-error');
    const btn = document.getElementById('pwd-btn');
    err.textContent = '';
    if (!cur || !np || !conf) { err.textContent = 'All fields required'; return; }
    if (np.length < 6) { err.textContent = 'Password must be at least 6 characters'; return; }
    if (np !== conf) { err.textContent = 'Passwords do not match'; return; }
    btn.disabled = true; btn.textContent = 'Changing...';
    try {
      const r = await api('POST', '/api/password', { current: cur, new: np });
      if (r.success) {
        toast('Password changed', 'success');
        document.getElementById('pwd-current').value = '';
        document.getElementById('pwd-new').value = '';
        document.getElementById('pwd-confirm').value = '';
      } else { err.textContent = r.error || 'Error'; }
    } catch (e) { err.textContent = 'Connection error'; }
    btn.disabled = false; btn.textContent = 'Change password';
  };

  window.manualBackup = async function () {
    try {
      const r = await api('POST', '/api/backup');
      if (r.success) toast('Backup created: ' + r.filename, 'success');
    } catch (e) { toast('Backup failed', 'error'); }
  };

  // ───────────────────────────────────────────
  // SAVE ALL
  // ───────────────────────────────────────────
  window.saveAll = async function () {
    const btn = document.getElementById('save-btn');
    btn.disabled = true; btn.innerHTML = I.save + ' Saving...';
    try {
      const r = await api('POST', '/api/data', currentData);
      if (r.success) {
        hasUnsaved = false;
        toast('Saved. Backup: ' + r.backup, 'success');
      } else {
        toast('Save error: ' + (r.error || ''), 'error');
      }
    } catch (e) { toast('Save error: ' + e.message, 'error'); }
    btn.disabled = false;
    renderTopbar();
  };

  // ───────────────────────────────────────────
  // LOGOUT
  // ───────────────────────────────────────────
  window.doLogout = function () {
    showConfirm('Logout?',
      hasUnsaved ? 'You have unsaved changes.' : 'You will be redirected to the login page.',
      () => {
        sessionStorage.removeItem('ibxi_admin_token');
        authToken = null; currentData = null; hasUnsaved = false;
        document.getElementById('admin-app').style.display = 'none';
        document.getElementById('login-screen').style.display = '';
        document.getElementById('login-password').value = '';
      });
  };

  // ───────────────────────────────────────────
  // THEME
  // ───────────────────────────────────────────
  window.toggleTheme = function () {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ibxi_theme', darkMode ? 'dark' : 'light');
    renderTopbar();
  };

  // ───────────────────────────────────────────
  // HELPERS
  // ───────────────────────────────────────────
  function nextId(key) {
    const items = currentData[key] || [];
    if (!items.length) return 1;
    return Math.max(...items.map(i => i.id || 0)) + 1;
  }

  function markUnsaved() { hasUnsaved = true; renderTopbar(); }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // ───────────────────────────────────────────
  // MODAL & CONFIRM
  // ───────────────────────────────────────────
  function openModal(id) { document.getElementById(id).classList.add('show'); }
  window.closeModal = function (id) { document.getElementById(id).classList.remove('show'); };

  function showConfirm(title, msg, cb) {
    confirmCallback = cb;
    document.getElementById('confirm-content').innerHTML =
      '<div class="admin-confirm">' +
        '<div class="admin-confirm-icon">' + I.warning + '</div>' +
        '<h3>' + title + '</h3>' +
        '<p>' + msg + '</p>' +
        '<div class="admin-confirm-actions">' +
          '<button class="admin-btn admin-btn-ghost" onclick="closeModal(\'confirm-modal\')">Cancel</button>' +
          '<button class="admin-btn admin-btn-danger" onclick="doConfirmAction()">Confirm</button>' +
        '</div>' +
      '</div>';
    openModal('confirm-modal');
  }
  window.doConfirmAction = function () {
    closeModal('confirm-modal');
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  };

  // ───────────────────────────────────────────
  // TOAST
  // ───────────────────────────────────────────
  function toast(msg, type) {
    const iconMap = { success: I.check, error: I.error, info: I.info, warning: I.warning };
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast ' + (type || 'info');
    t.innerHTML = '<span class="toast-icon">' + (iconMap[type] || I.info) + '</span><span class="toast-msg">' + esc(msg) + '</span>';
    c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
  }

  // ───────────────────────────────────────────
  // UNSAVED WARNING
  // ───────────────────────────────────────────
  window.addEventListener('beforeunload', e => {
    if (hasUnsaved) { e.preventDefault(); e.returnValue = ''; }
  });

})();
