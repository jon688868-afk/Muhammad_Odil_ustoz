// ============================================
// IBXI Admin Panel – Content Management System v2.0
// Full CRUD for all 12 data sections
// Security: CSRF tokens, escaped output, event delegation
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
    activity:   '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1.5 8 4.5 8 6 4 8 12 10 6 11.5 8 14.5 8"/></svg>',
  };

  const SI = {
    news:'news', researchAreas:'research', events:'calendar',
    publications:'book', team:'users', programs:'academic',
    videos:'video', faq:'help', blogPosts:'pencil',
    testimonials:'chat', gallery:'image'
  };

  // === STATE ===
  let authToken = sessionStorage.getItem('ibxi_admin_token') || null;
  let csrfToken = sessionStorage.getItem('ibxi_csrf_token') || null;
  let currentData = null;
  let currentSection = 'dashboard';
  let hasUnsaved = false;
  let darkMode = localStorage.getItem('ibxi_theme') !== 'light';
  let confirmCallback = null;
  let dragFromIdx = null;
  let dragSectionKey = null;
  let autoSaveTimeout = null;
  let customSections = [];  // loaded from server

  // === SECTION SCHEMAS ===
  const SCHEMAS = {
    news: {
      label: 'Yangiliklar / News', icon: I.news, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.category, i.date, i.author].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'image', type: 'image', label: 'Thumbnail image' },
        { key: 'featured', type: 'checkbox', label: 'Featured' },
        { key: 'tag', type: 'text', label: 'Teg (UZ)', required: true, half: true },
        { key: 'tag_en', type: 'text', label: 'Tag (EN)', half: true },
        { key: 'tag_ar', type: 'text', label: 'Tag (AR)', dir: 'rtl', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'summary', type: 'textarea', label: 'Qisqacha (UZ)', required: true },
        { key: 'summary_en', type: 'textarea', label: 'Summary (EN)' },
        { key: 'summary_ar', type: 'textarea', label: 'Summary (AR)', dir: 'rtl' },
        { key: 'date', type: 'text', label: 'Sana', half: true, placeholder: '15 Yanvar 2025' },
        { key: 'category', type: 'select', label: 'Kategoriya', half: true,
          options: ['Tadbir', 'Nashr', 'Akademiya', 'Xalqaro', 'Tadqiqot'] },
        { key: 'color', type: 'color', label: 'Rang', half: true },
        { key: 'author', type: 'text', label: 'Muallif', half: true },
        { key: 'readTime', type: 'text', label: 'O\'qish vaqti', half: true, placeholder: '3 daq' },
      ]
    },
    researchAreas: {
      label: 'Tadqiqot / Research', icon: I.research, idKey: 'id',
      display: function(i) { return { t: i.title, m: (i.count || 0) + ' study' }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'image', type: 'image', label: 'Cover image' },
        { key: 'count', type: 'number', label: 'Study count', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'desc', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'desc_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'desc_ar', type: 'textarea', label: 'Description (AR)', dir: 'rtl' },
      ]
    },
    events: {
      label: 'Tadbirlar / Events', icon: I.calendar, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.day + ' ' + i.month, i.type, i.location].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'image', type: 'image', label: 'Event banner' },
        { key: 'day', type: 'text', label: 'Kun', half: true, placeholder: '25' },
        { key: 'month', type: 'text', label: 'Oy (UZ)', half: true, placeholder: 'YAN' },
        { key: 'month_en', type: 'text', label: 'Month (EN)', half: true, placeholder: 'JAN' },
        { key: 'month_ar', type: 'text', label: 'Month (AR)', half: true, dir: 'rtl' },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'type', type: 'select', label: 'Type', half: true,
          options: ['seminar', 'conference', 'workshop', 'online'] },
        { key: 'location', type: 'text', label: 'Location', half: true },
        { key: 'time', type: 'text', label: 'Time', half: true, placeholder: '14:00 - 17:00' },
        { key: 'speaker', type: 'text', label: 'Speaker', half: true },
        { key: 'description', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'description_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'capacity', type: 'number', label: 'Capacity', half: true },
        { key: 'registered', type: 'number', label: 'Registered', half: true },
      ]
    },
    publications: {
      label: 'Nashrlar / Publications', icon: I.book, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.author, i.year, i.type].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'abbr', type: 'text', label: 'Abbreviation', half: true, placeholder: 'UMI' },
        { key: 'year', type: 'text', label: 'Year', half: true, placeholder: '2024' },
        { key: 'type', type: 'select', label: 'Type', half: true,
          options: ['Kitob', 'Tadqiqot', 'To\'plam', 'Hisobot', 'Maqola', 'Lug\'at'] },
        { key: 'coverImage', type: 'image', label: 'Book cover' },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'author', type: 'text', label: 'Author', required: true },
        { key: 'desc', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'desc_en', type: 'textarea', label: 'Description (EN)' },
        { key: 'color', type: 'color', label: 'Color', half: true },
        { key: 'pages', type: 'number', label: 'Pages', half: true },
        { key: 'language', type: 'text', label: 'Language', half: true, placeholder: 'O\'zbekcha' },
        { key: 'series', type: 'text', label: 'Series', half: true },
        { key: 'tags', type: 'tags', label: 'Tags' },
      ]
    },
    team: {
      label: 'Jamoa / Team', icon: I.users, idKey: 'id',
      display: function(i) { return { t: i.name, m: [i.role, i.dept].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'name', type: 'text', label: 'Full name', required: true },
        { key: 'initials', type: 'text', label: 'Initials', half: true, placeholder: 'AY' },
        { key: 'avatarColor', type: 'color', label: 'Avatar color', half: true },
        { key: 'avatar', type: 'image', label: 'Profile photo' },
        { key: 'role', type: 'text', label: 'Lavozim (UZ)', required: true, half: true },
        { key: 'role_en', type: 'text', label: 'Role (EN)', half: true },
        { key: 'dept', type: 'text', label: 'Bo\'lim (UZ)', half: true },
        { key: 'dept_en', type: 'text', label: 'Dept (EN)', half: true },
        { key: 'bio', type: 'textarea', label: 'Tarjimai hol (UZ)' },
        { key: 'bio_en', type: 'textarea', label: 'Bio (EN)' },
        { key: 'education', type: 'text', label: 'Education' },
        { key: 'specialization', type: 'tags', label: 'Specialization' },
      ]
    },
    programs: {
      label: 'Dasturlar / Programs', icon: I.academic, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.duration, i.level, i.status].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'status', type: 'select', label: 'Status', half: true, options: ['active', 'upcoming'] },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'duration', type: 'text', label: 'Duration', half: true, placeholder: '12 hafta' },
        { key: 'level', type: 'select', label: 'Level', half: true,
          options: ['Boshlang\'ich', 'O\'rta', 'Yuqori', 'Barcha darajalar'] },
        { key: 'lang', type: 'text', label: 'Language', half: true, placeholder: 'O\'zbekcha' },
        { key: 'students', type: 'number', label: 'Students', half: true },
      ]
    },
    videos: {
      label: 'Videolar / Videos', icon: I.video, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.category, i.duration, i.speaker].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'emoji', type: 'text', label: 'Emoji', half: true },
        { key: 'thumbnail', type: 'image', label: 'Video thumbnail' },
        { key: 'videoUrl', type: 'text', label: 'Video URL (YouTube)', placeholder: 'https://youtube.com/watch?v=...' },
        { key: 'category', type: 'select', label: 'Category', half: true,
          options: ['Konferensiya', 'Dars', 'Panel'] },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'views', type: 'text', label: 'Views', half: true, placeholder: '12.4K' },
        { key: 'duration', type: 'text', label: 'Duration', half: true, placeholder: '52:18' },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-15' },
        { key: 'speaker', type: 'text', label: 'Speaker', half: true },
        { key: 'description', type: 'textarea', label: 'Tavsif (UZ)' },
        { key: 'description_en', type: 'textarea', label: 'Description (EN)' },
      ]
    },
    faq: {
      label: 'TSS / FAQ', icon: I.help, idKey: null,
      display: function(i) { return { t: i.q, m: i.category || '' }; },
      fields: [
        { key: 'q', type: 'text', label: 'Savol (UZ)', required: true },
        { key: 'q_en', type: 'text', label: 'Question (EN)' },
        { key: 'q_ar', type: 'text', label: 'Question (AR)', dir: 'rtl' },
        { key: 'a', type: 'textarea', label: 'Javob (UZ)', required: true },
        { key: 'a_en', type: 'textarea', label: 'Answer (EN)' },
        { key: 'a_ar', type: 'textarea', label: 'Answer (AR)', dir: 'rtl' },
        { key: 'category', type: 'select', label: 'Category',
          options: ['Akademiya', 'Xalqaro', 'Nashr', 'Umumiy', 'Tadbir', 'Tadqiqot'] },
      ]
    },
    blogPosts: {
      label: 'Maqolalar / Blog', icon: I.pencil, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.category, i.date, i.author].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'image', type: 'image', label: 'Article image' },
        { key: 'featured', type: 'checkbox', label: 'Featured' },
        { key: 'category', type: 'text', label: 'Category', half: true, placeholder: 'Falsafa' },
        { key: 'color', type: 'color', label: 'Color', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'title_ar', type: 'text', label: 'Title (AR)', dir: 'rtl' },
        { key: 'excerpt', type: 'textarea', label: 'Parcha (UZ)', required: true },
        { key: 'excerpt_en', type: 'textarea', label: 'Excerpt (EN)' },
        { key: 'author', type: 'text', label: 'Author', half: true },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-10' },
        { key: 'readTime', type: 'text', label: 'Read time', half: true, placeholder: '8 daq' },
        { key: 'tags', type: 'tags', label: 'Tags' },
      ]
    },
    testimonials: {
      label: 'Fikrlar / Testimonials', icon: I.chat, idKey: 'id',
      display: function(i) { return { t: i.name, m: [i.institution, i.country].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'emoji', type: 'text', label: 'Flag emoji', half: true },
        { key: 'avatar', type: 'image', label: 'Photo' },
        { key: 'name', type: 'text', label: 'Full name', required: true },
        { key: 'institution', type: 'text', label: 'Institution' },
        { key: 'country', type: 'text', label: 'Country', half: true },
        { key: 'quote', type: 'textarea', label: 'Iqtibos (UZ)', required: true },
        { key: 'quote_en', type: 'textarea', label: 'Quote (EN)' },
      ]
    },
    gallery: {
      label: 'Galereya / Gallery', icon: I.image, idKey: 'id',
      display: function(i) { return { t: i.title, m: [i.category, i.date, (i.count||0) + ' photos'].filter(Boolean).join(' \u00b7 ') }; },
      fields: [
        { key: 'id', type: 'number', label: 'ID', auto: true, half: true },
        { key: 'icon', type: 'text', label: 'Icon (emoji)', half: true },
        { key: 'coverImage', type: 'image', label: 'Cover image' },
        { key: 'count', type: 'number', label: 'Photo count', half: true },
        { key: 'title', type: 'text', label: 'Sarlavha (UZ)', required: true },
        { key: 'title_en', type: 'text', label: 'Title (EN)' },
        { key: 'category', type: 'text', label: 'Category', half: true, placeholder: 'Simpozium' },
        { key: 'date', type: 'text', label: 'Date', half: true, placeholder: '2025-03-15' },
        { key: 'color', type: 'color', label: 'Color', half: true },
      ]
    },
  };

  var SECTION_ORDER = ['news','researchAreas','events','publications','team','programs','videos','faq','blogPosts','testimonials','gallery'];

  // === CUSTOM SECTION HELPERS ===
  function loadCustomSections() {
    customSections = currentData._customSections || [];
    customSections.forEach(function(cs) {
      var sKey = '_custom_' + cs.slug;
      // Build dynamic schema
      var fields = (cs.fields || []).map(function(f) {
        var field = { key: f.key, type: f.type || 'text', label: f.label || f.key };
        if (f.half) field.half = true;
        if (f.required) field.required = true;
        if (f.placeholder) field.placeholder = f.placeholder;
        if (f.options) field.options = f.options;
        if (f.dir) field.dir = f.dir;
        return field;
      });
      // Add auto ID field
      fields.unshift({ key: 'id', type: 'number', label: 'ID', auto: true, half: true });

      SCHEMAS[sKey] = {
        label: cs.label, icon: cs.icon ? '<span style="font-size:16px">' + esc(cs.icon) + '</span>' : I.empty, idKey: 'id',
        _customId: cs.id, _customSlug: cs.slug,
        display: function(i) {
          var title = i.title || i.name || i.sarlavha || Object.values(i).find(function(v) { return typeof v === 'string' && v.length > 0 && v.length < 100; }) || '#' + (i.id || '?');
          return { t: title, m: '' };
        },
        fields: fields,
      };

      // Add to section order if not already there
      if (SECTION_ORDER.indexOf(sKey) === -1) {
        SECTION_ORDER.push(sKey);
      }

      // Ensure data array exists
      if (!currentData[sKey]) currentData[sKey] = [];
    });
  }

  var FIELD_TYPES = [
    { value: 'text', label: 'Matn (text)' },
    { value: 'textarea', label: 'Katta matn (textarea)' },
    { value: 'number', label: 'Raqam (number)' },
    { value: 'select', label: 'Tanlov (select)' },
    { value: 'checkbox', label: 'Belgi (checkbox)' },
    { value: 'color', label: 'Rang (color)' },
    { value: 'image', label: 'Rasm (image)' },
    { value: 'tags', label: 'Teglar (tags)' },
  ];

  // ───────────────────────────────────────────
  // INITIALIZATION
  // ───────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    if (authToken) verifyAndLoad();
    initEventDelegation();
  });

  // ───────────────────────────────────────────
  // EVENT DELEGATION (replaces inline onclick)
  // ───────────────────────────────────────────
  function initEventDelegation() {
    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-action]');
      if (!el) return;

      var action = el.dataset.action;
      e.preventDefault();

      switch (action) {
        case 'admin-nav': nav(el.dataset.section); break;
        case 'admin-add': handleAdd(el.dataset.key); break;
        case 'admin-edit': handleEdit(el.dataset.key, +el.dataset.idx); break;
        case 'admin-dup': handleDup(el.dataset.key, +el.dataset.idx); break;
        case 'admin-del': handleDel(el.dataset.key, +el.dataset.idx); break;
        case 'admin-save': saveAll(); break;
        case 'admin-preview': window.open('/', '_blank'); break;
        case 'admin-theme': toggleAdminTheme(); break;
        case 'admin-logout': handleLogout(); break;
        case 'admin-backup': manualBackup(); break;
        case 'admin-pwd': changePwd(); break;
        case 'admin-i18n-add': handleI18nAdd(); break;
        case 'admin-form-save': handleFormSave(el.dataset.key, +el.dataset.isnew, +el.dataset.idx); break;
        case 'admin-modal-close': closeAdminModal(el.dataset.modal); break;
        case 'admin-confirm': handleConfirmAction(); break;
        case 'admin-img-clear': handleImgClear(el.dataset.key); break;
        case 'admin-toggle': handleToggleClick(el); break;
        case 'admin-mobile-menu': toggleMobileSidebar(); break;
        case 'admin-new-section': openNewSectionForm(); break;
        case 'admin-edit-section': openEditSectionForm(el.dataset.slug); break;
        case 'admin-delete-section': handleDeleteSection(el.dataset.slug); break;
        case 'admin-section-save': handleSectionFormSave(); break;
        case 'admin-section-add-field': handleSectionAddField(); break;
        case 'admin-section-remove-field': handleSectionRemoveField(el); break;
      }
    });

    // Handle login form
    var loginForm = document.querySelector('#login-screen form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
      });
    }

    // Handle i18n input changes
    document.addEventListener('change', function(e) {
      if (e.target.dataset && e.target.dataset.lang && e.target.dataset.key) {
        handleI18nSet(e.target);
      }
    });

    // Handle tag input
    document.addEventListener('keydown', function(e) {
      if (e.target.classList.contains('admin-tags-input') && e.key === 'Enter' && e.target.value.trim()) {
        e.preventDefault();
        handleTagAdd(e.target);
      }
    });

    // Handle tag remove
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('tag-remove') || e.target.closest('.tag-remove')) {
        var pill = (e.target.closest('.admin-tag-pill'));
        if (pill) pill.remove();
      }
    });

    // Image upload via file input change
    document.addEventListener('change', function(e) {
      if (e.target.type === 'file' && e.target.closest('.admin-img-upload-btn')) {
        var fieldKey = e.target.closest('.admin-img-field').dataset.key;
        handleImgUpload(e.target, fieldKey);
      }
    });

    // Color input sync
    document.addEventListener('input', function(e) {
      if (e.target.type === 'color') {
        var textInput = e.target.nextElementSibling;
        if (textInput) textInput.value = e.target.value;
      }
    });
    document.addEventListener('change', function(e) {
      if (e.target.type === 'text' && e.target.closest('.admin-color-group')) {
        var colorInput = e.target.previousElementSibling;
        if (colorInput && colorInput.type === 'color') colorInput.value = e.target.value;
      }
    });

    // Search debounce
    document.addEventListener('input', function(e) {
      if (e.target.id === 'section-search') {
        handleAdminSearch(e.target.value);
      }
    });

    // Drag & drop
    document.addEventListener('dragstart', function(e) {
      var card = e.target.closest('.admin-item-card');
      if (!card) return;
      dragFromIdx = +card.dataset.idx;
      dragSectionKey = card.dataset.sectionkey;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    document.addEventListener('dragover', function(e) {
      var card = e.target.closest('.admin-item-card');
      if (card) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        document.querySelectorAll('.drag-over').forEach(function(c) { c.classList.remove('drag-over'); });
        card.classList.add('drag-over');
      }
    });
    document.addEventListener('drop', function(e) {
      var card = e.target.closest('.admin-item-card');
      if (!card) return;
      e.preventDefault();
      document.querySelectorAll('.drag-over').forEach(function(c) { c.classList.remove('drag-over'); });
      var toIdx = +card.dataset.idx;
      var key = card.dataset.sectionkey;
      if (dragSectionKey !== key || dragFromIdx === null || dragFromIdx === toIdx) return;
      var arr = currentData[key];
      var moved = arr.splice(dragFromIdx, 1)[0];
      arr.splice(toIdx, 0, moved);
      dragFromIdx = null;
      dragSectionKey = null;
      markUnsaved();
      renderSection(document.getElementById('admin-content'), key);
      toast('Order updated', 'info');
    });
    document.addEventListener('dragend', function(e) {
      var card = e.target.closest('.admin-item-card');
      if (card) card.classList.remove('dragging');
      document.querySelectorAll('.drag-over').forEach(function(c) { c.classList.remove('drag-over'); });
      dragFromIdx = null;
    });
  }

  // ───────────────────────────────────────────
  // API LAYER (with CSRF)
  // ───────────────────────────────────────────
  function authHeaders() {
    var headers = {
      'Authorization': 'Bearer ' + authToken,
      'Content-Type': 'application/json'
    };
    if (csrfToken) {
      headers['X-CSRF-Token'] = csrfToken;
    }
    return headers;
  }

  async function api(method, path, body) {
    var headers = path === '/api/login'
      ? { 'Content-Type': 'application/json' }
      : authHeaders();
    var opts = { method: method, headers: headers };
    if (body) opts.body = JSON.stringify(body);
    try {
      var res = await fetch(path, opts);
      return await res.json();
    } catch (e) {
      return { success: false, error: 'Connection error' };
    }
  }

  async function verifyAndLoad() {
    try {
      var res = await fetch('/api/data', { headers: authHeaders() });
      if (res.ok) {
        currentData = await res.json();
        showApp();
      } else {
        clearAuth();
      }
    } catch (e) {
      console.error('Verify failed:', e);
    }
  }

  function clearAuth() {
    sessionStorage.removeItem('ibxi_admin_token');
    sessionStorage.removeItem('ibxi_csrf_token');
    authToken = null;
    csrfToken = null;
  }

  // ───────────────────────────────────────────
  // AUTH
  // ───────────────────────────────────────────
  async function handleLogin() {
    var pwd = document.getElementById('login-password').value;
    var btn = document.getElementById('login-btn');
    var err = document.getElementById('login-error');
    if (!pwd) { err.textContent = 'Parolni kiriting'; return; }
    btn.disabled = true; btn.textContent = 'Kirilmoqda...';
    try {
      var r = await api('POST', '/api/login', { password: pwd });
      if (r.success) {
        authToken = r.token;
        csrfToken = r.csrf || null;
        sessionStorage.setItem('ibxi_admin_token', authToken);
        if (csrfToken) sessionStorage.setItem('ibxi_csrf_token', csrfToken);
        currentData = await api('GET', '/api/data');
        showApp();
      } else {
        err.textContent = r.error || 'Noto\'g\'ri parol';
      }
    } catch (ex) { err.textContent = 'Ulanish xatosi'; }
    btn.disabled = false; btn.textContent = 'Kirish';
  }

  function showApp() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    loadCustomSections();
    renderSidebar();
    renderTopbar();
    nav('dashboard');
  }

  // ───────────────────────────────────────────
  // NAVIGATION
  // ───────────────────────────────────────────
  function nav(section) {
    currentSection = section;
    closeMobileSidebar();
    renderSidebar();
    renderTopbar();
    var el = document.getElementById('admin-content');
    if (section === 'dashboard') renderDashboard(el);
    else if (section === 'i18n') renderI18n(el);
    else if (section === 'settings') renderSettings(el);
    else if (section === 'activity') renderActivity(el);
    else renderSection(el, section);
    window.scrollTo(0, 0);
    document.getElementById('admin-main').scrollTop = 0;
  }

  // ───────────────────────────────────────────
  // SIDEBAR
  // ───────────────────────────────────────────
  function renderSidebar() {
    var sb = document.getElementById('admin-sidebar');
    var builtinItems = SECTION_ORDER.filter(function(k) { return !k.startsWith('_custom_'); }).map(function(key) {
      var s = SCHEMAS[key];
      var arr = currentData[key];
      var count = Array.isArray(arr) ? arr.length : 0;
      return '<div class="admin-nav-item ' + (currentSection===key?'active':'') + '" data-action="admin-nav" data-section="' + key + '">' +
        '<span class="nav-icon">' + s.icon + '</span>' +
        '<span>' + esc(s.label.split('/')[0].trim()) + '</span>' +
        '<span class="nav-count">' + count + '</span>' +
      '</div>';
    }).join('');

    var customItems = customSections.map(function(cs) {
      var sKey = '_custom_' + cs.slug;
      var arr = currentData[sKey];
      var count = Array.isArray(arr) ? arr.length : 0;
      return '<div class="admin-nav-item ' + (currentSection===sKey?'active':'') + '" data-action="admin-nav" data-section="' + sKey + '">' +
        '<span class="nav-icon">' + (cs.icon ? '<span style="font-size:14px">' + esc(cs.icon) + '</span>' : I.empty) + '</span>' +
        '<span>' + esc(cs.label) + '</span>' +
        '<span class="nav-count">' + count + '</span>' +
      '</div>';
    }).join('');

    var contentItems = builtinItems;

    sb.innerHTML =
      '<div class="admin-sidebar-logo">' +
        '<img src="assets/img/logo-gold.png" alt="Logo" style="width:28px;height:28px;object-fit:contain" />' +
        '<span>Admin Panel</span>' +
      '</div>' +
      '<nav class="admin-nav">' +
        '<div class="admin-nav-label">Overview</div>' +
        '<div class="admin-nav-item ' + (currentSection==='dashboard'?'active':'') + '" data-action="admin-nav" data-section="dashboard">' +
          '<span class="nav-icon">' + I.dashboard + '</span><span>Dashboard</span>' +
        '</div>' +
        '<div class="admin-nav-item ' + (currentSection==='i18n'?'active':'') + '" data-action="admin-nav" data-section="i18n">' +
          '<span class="nav-icon">' + I.globe + '</span><span>Translations</span>' +
          '<span class="nav-count">' + Object.keys((currentData.i18n && currentData.i18n.uz) || {}).length + '</span>' +
        '</div>' +
        '<div class="admin-nav-item ' + (currentSection==='activity'?'active':'') + '" data-action="admin-nav" data-section="activity">' +
          '<span class="nav-icon">' + I.activity + '</span><span>Activity Log</span>' +
        '</div>' +
        '<div class="admin-nav-label">Content</div>' +
        contentItems +
        (customItems ? '<div class="admin-nav-label">Maxsus bo\'limlar</div>' + customItems : '') +
        '<div class="admin-nav-item" data-action="admin-new-section" style="opacity:0.6">' +
          '<span class="nav-icon">' + I.plus + '</span><span>Bo\'lim qo\'shish</span>' +
        '</div>' +
        '<div class="admin-nav-label">System</div>' +
        '<div class="admin-nav-item ' + (currentSection==='settings'?'active':'') + '" data-action="admin-nav" data-section="settings">' +
          '<span class="nav-icon">' + I.settings + '</span><span>Settings</span>' +
        '</div>' +
      '</nav>' +
      '<div class="admin-sidebar-footer">' +
        '<div class="admin-nav-item" data-action="admin-logout">' +
          '<span class="nav-icon">' + I.logout + '</span><span>Logout</span>' +
        '</div>' +
      '</div>';
  }

  // ───────────────────────────────────────────
  // TOPBAR
  // ───────────────────────────────────────────
  function renderTopbar() {
    var tb = document.getElementById('admin-topbar');
    var labels = { dashboard:'Dashboard', i18n:'Translations', settings:'Settings', activity:'Activity Log' };
    var label = labels[currentSection] || (SCHEMAS[currentSection] ? SCHEMAS[currentSection].label : currentSection);
    tb.innerHTML =
      '<div class="admin-topbar-left">' +
        '<button class="admin-topbar-btn admin-mobile-menu-btn" data-action="admin-mobile-menu">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 4h12M2 8h12M2 12h12"/></svg>' +
        '</button>' +
        '<span class="admin-breadcrumb">' + esc(label) + '</span>' +
      '</div>' +
      '<div class="admin-topbar-right">' +
        '<button class="admin-topbar-btn" data-action="admin-preview" title="Preview site">' +
          I.preview + ' Preview' +
        '</button>' +
        '<button class="admin-topbar-btn" data-action="admin-theme">' +
          (darkMode ? I.sun : I.moon) +
        '</button>' +
        '<button class="admin-topbar-btn admin-save-btn' + (hasUnsaved?' has-unsaved':'') + '" data-action="admin-save" id="save-btn">' +
          I.save + ' Save' + (hasUnsaved?' *':'') +
        '</button>' +
      '</div>';
  }

  // ───────────────────────────────────────────
  // DASHBOARD
  // ───────────────────────────────────────────
  function renderDashboard(el) {
    var stats = SECTION_ORDER.map(function(key) {
      var s = SCHEMAS[key]; var c = (currentData[key]||[]).length;
      return '<div class="admin-stat-card" data-action="admin-nav" data-section="' + key + '">' +
        '<div class="admin-stat-count">' + c + '</div>' +
        '<div class="admin-stat-label">' + esc(s.label.split('/')[0].trim()) + '</div>' +
      '</div>';
    }).join('');
    var customStats = customSections.map(function(cs) {
      var sKey = '_custom_' + cs.slug;
      var c = (currentData[sKey] || []).length;
      return '<div class="admin-stat-card" data-action="admin-nav" data-section="' + sKey + '">' +
        '<div class="admin-stat-count">' + c + '</div>' +
        '<div class="admin-stat-label">' + esc(cs.label) + '</div>' +
      '</div>';
    }).join('');

    var i18nC = Object.keys((currentData.i18n && currentData.i18n.uz) || {}).length;
    el.innerHTML =
      '<div class="admin-dashboard-header">' +
        '<h1>Dashboard</h1>' +
        '<p>IBXI ilova kontentini boshqaring</p>' +
      '</div>' +
      '<div class="admin-stat-grid">' +
        '<div class="admin-stat-card" data-action="admin-nav" data-section="i18n">' +
          '<div class="admin-stat-count">' + i18nC + '</div>' +
          '<div class="admin-stat-label">Tarjima kalitlari</div>' +
        '</div>' +
        stats +
        customStats +
      '</div>';
  }

  // ───────────────────────────────────────────
  // ACTIVITY LOG (NEW)
  // ───────────────────────────────────────────
  async function renderActivity(el) {
    el.innerHTML = '<div class="admin-dashboard-header"><h1>Activity Log</h1><p>Oxirgi amallar tarixi</p></div><div style="text-align:center;padding:24px;color:var(--text-3)">Yuklanmoqda...</div>';
    try {
      var r = await api('GET', '/api/audit');
      if (r && r.items && r.items.length) {
        var rows = r.items.map(function(a) {
          return '<tr>' +
            '<td style="white-space:nowrap">' + esc(a.timestamp || '') + '</td>' +
            '<td><span class="admin-tag-pill">' + esc(a.action || '') + '</span></td>' +
            '<td>' + esc(a.section || '-') + '</td>' +
            '<td>' + esc(a.details || '-') + '</td>' +
            '<td>' + esc(a.ip_address || '-') + '</td>' +
          '</tr>';
        }).join('');
        el.innerHTML =
          '<div class="admin-dashboard-header"><h1>Activity Log</h1><p>Oxirgi 100 ta amal</p></div>' +
          '<div style="overflow-x:auto"><table class="admin-i18n-table">' +
            '<thead><tr><th>Vaqt</th><th>Amal</th><th>Bo\'lim</th><th>Tafsilot</th><th>IP</th></tr></thead>' +
            '<tbody>' + rows + '</tbody>' +
          '</table></div>';
      } else {
        el.innerHTML = '<div class="admin-dashboard-header"><h1>Activity Log</h1><p>Oxirgi amallar tarixi</p></div>' +
          '<div class="admin-empty"><div class="admin-empty-icon">' + I.activity + '</div><div class="admin-empty-text">Hozircha amallar yo\'q</div></div>';
      }
    } catch (e) {
      el.innerHTML = '<div class="admin-dashboard-header"><h1>Activity Log</h1></div><p style="color:var(--text-3)">Yuklab bo\'lmadi</p>';
    }
  }

  // ───────────────────────────────────────────
  // SECTION LIST VIEW
  // ───────────────────────────────────────────
  function renderSection(el, key) {
    var schema = SCHEMAS[key];
    var items = currentData[key] || [];

    var cards = items.map(function(item, idx) {
      var d = schema.display(item);
      return '<div class="admin-item-card" data-idx="' + idx + '" data-sectionkey="' + key + '"' +
          ' data-search="' + esc(d.t+' '+d.m).toLowerCase() + '"' +
          ' draggable="true">' +
        '<div class="admin-drag-handle" title="Tartibni o\'zgartirish">' + I.grip + '</div>' +
        '<div class="admin-item-info">' +
          '<div class="admin-item-title">' + esc(d.t) + '</div>' +
          '<div class="admin-item-meta">' + esc(d.m) + '</div>' +
        '</div>' +
        '<div class="admin-item-actions">' +
          '<button class="admin-action-btn" data-action="admin-dup" data-key="' + key + '" data-idx="' + idx + '" title="Duplicate">' + I.duplicate + '</button>' +
          '<button class="admin-action-btn" data-action="admin-edit" data-key="' + key + '" data-idx="' + idx + '" title="Edit">' + I.edit + '</button>' +
          '<button class="admin-action-btn danger" data-action="admin-del" data-key="' + key + '" data-idx="' + idx + '" title="Delete">' + I.trash + '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var emptyHtml = '<div class="admin-empty"><div class="admin-empty-icon">' + I.empty + '</div><div class="admin-empty-text">Hali yozuvlar yo\'q</div></div>';

    var sectionActions = '<button class="admin-add-btn" data-action="admin-add" data-key="' + key + '">' + I.plus + ' Yangi qo\'shish</button>';
    if (schema._customSlug) {
      sectionActions =
        '<div style="display:flex;gap:6px;align-items:center">' +
          '<button class="admin-add-btn" data-action="admin-add" data-key="' + key + '">' + I.plus + ' Yangi qo\'shish</button>' +
          '<button class="admin-action-btn" data-action="admin-edit-section" data-slug="' + schema._customSlug + '" title="Bo\'limni tahrirlash">' + I.settings + '</button>' +
          '<button class="admin-action-btn danger" data-action="admin-delete-section" data-slug="' + schema._customSlug + '" title="Bo\'limni o\'chirish">' + I.trash + '</button>' +
        '</div>';
    }

    el.innerHTML =
      '<div class="admin-section-header">' +
        '<div class="admin-section-title">' +
          esc(schema.label) +
          ' <span class="admin-section-count">' + items.length + '</span>' +
        '</div>' +
        sectionActions +
      '</div>' +
      '<div class="admin-search-bar">' +
        '<span class="search-icon">' + I.search + '</span>' +
        '<input type="text" placeholder="Qidirish..." id="section-search" />' +
      '</div>' +
      '<div class="admin-item-list" id="item-list">' +
        (cards || emptyHtml) +
      '</div>';
  }

  // ───────────────────────────────────────────
  // SEARCH
  // ───────────────────────────────────────────
  function handleAdminSearch(q) {
    q = q.toLowerCase();
    document.querySelectorAll('#item-list .admin-item-card').forEach(function(c) {
      c.style.display = (c.dataset.search || '').includes(q) ? '' : 'none';
    });
  }

  // ───────────────────────────────────────────
  // ADD / EDIT / DUPLICATE / DELETE
  // ───────────────────────────────────────────
  function handleAdd(key) {
    var schema = SCHEMAS[key];
    var item = {};
    schema.fields.forEach(function(f) {
      if (f.auto && f.key === 'id') item.id = nextId(key);
      else if (f.type === 'number') item[f.key] = 0;
      else if (f.type === 'checkbox') item[f.key] = false;
      else if (f.type === 'tags') item[f.key] = [];
      else item[f.key] = '';
    });
    openForm(key, item, true, -1);
  }

  function handleEdit(key, idx) {
    var item = currentData[key][idx];
    if (!item) return;
    openForm(key, JSON.parse(JSON.stringify(item)), false, idx);
  }

  function handleDup(key, idx) {
    var schema = SCHEMAS[key];
    var original = currentData[key][idx];
    if (!original) return;
    var clone = JSON.parse(JSON.stringify(original));
    if (schema.idKey) clone[schema.idKey] = nextId(key);
    var tf = schema.fields.find(function(f) { return f.key === 'title' || f.key === 'name' || f.key === 'q'; });
    if (tf && clone[tf.key]) clone[tf.key] += ' (nusxa)';
    openForm(key, clone, true, -1);
    toast('Yozuv nusxalandi', 'info');
  }

  function handleDel(key, idx) {
    var item = currentData[key][idx];
    var title = item ? (item.title || item.name || item.q || '#' + (idx+1)) : '#' + (idx+1);
    showConfirm('O\'chirilsinmi?', '"' + esc(title) + '" butunlay o\'chiriladi.', function() {
      currentData[key].splice(idx, 1);
      markUnsaved();
      renderSection(document.getElementById('admin-content'), key);
      renderSidebar();
      toast('Yozuv o\'chirildi', 'info');
    });
  }

  // ───────────────────────────────────────────
  // FORM (MODAL)
  // ───────────────────────────────────────────
  function openForm(sectionKey, item, isNew, idx) {
    var schema = SCHEMAS[sectionKey];
    var fieldsHtml = schema.fields.map(function(f) {
      var val = item[f.key] != null ? item[f.key] : '';
      var cls = f.half ? 'admin-form-group' : 'admin-form-group full-width';
      var req = f.required ? '<span class="req">*</span>' : '';
      var ro = f.auto ? 'readonly' : '';
      var ph = f.placeholder ? 'placeholder="' + esc(f.placeholder) + '"' : '';
      var dir = f.dir ? 'dir="' + f.dir + '"' : '';

      if (f.type === 'textarea') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
          '<textarea class="admin-form-input" data-key="' + f.key + '" ' + dir + ' ' + ro + '>' + esc(String(val)) + '</textarea></div>';
      }
      if (f.type === 'select') {
        var opts = (f.options||[]).map(function(o) { return '<option value="' + esc(o) + '" ' + (val===o?'selected':'') + '>' + esc(o) + '</option>'; }).join('');
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
          '<select class="admin-form-input" data-key="' + f.key + '"><option value="">-- Tanlang --</option>' + opts + '</select></div>';
      }
      if (f.type === 'checkbox') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-toggle" data-action="admin-toggle">' +
            '<div class="admin-toggle-track ' + (val?'on':'') + '" data-key="' + f.key + '"><div class="admin-toggle-thumb"></div></div>' +
            '<span class="admin-toggle-label">' + (val ? 'Ha' : 'Yo\'q') + '</span>' +
          '</div></div>';
      }
      if (f.type === 'color') {
        return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-color-group">' +
            '<input type="color" value="' + (val||'#0d4a4a') + '" />' +
            '<input type="text" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" />' +
          '</div></div>';
      }
      if (f.type === 'tags') {
        var tags = Array.isArray(val) ? val : [];
        var pills = tags.map(function(t) { return '<span class="admin-tag-pill">' + esc(t) + '<span class="tag-remove">\u00d7</span></span>'; }).join('');
        return '<div class="admin-form-group full-width"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-tags-wrap" data-key="' + f.key + '">' +
            pills + '<input class="admin-tags-input" placeholder="Yozing va Enter bosing..." />' +
          '</div></div>';
      }
      if (f.type === 'image') {
        var preview = val
          ? '<img src="' + esc(String(val)) + '" class="admin-img-preview" />'
          : '<div class="admin-img-placeholder">' + I.image + '<span>Rasm yo\'q</span></div>';
        return '<div class="admin-form-group full-width"><label class="admin-form-label">' + f.label + '</label>' +
          '<div class="admin-img-field" data-key="' + f.key + '">' +
            '<div class="admin-img-preview-wrap">' + preview + '</div>' +
            '<div class="admin-img-actions">' +
              '<label class="admin-btn admin-btn-ghost admin-img-upload-btn">' +
                I.backup + ' Fayl tanlash' +
                '<input type="file" accept="image/*" style="display:none" />' +
              '</label>' +
              (val ? '<button type="button" class="admin-btn admin-btn-ghost" data-action="admin-img-clear" data-key="' + f.key + '">Tozalash</button>' : '') +
            '</div>' +
            '<input type="hidden" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" />' +
          '</div></div>';
      }
      return '<div class="' + cls + '"><label class="admin-form-label">' + f.label + req + '</label>' +
        '<input type="' + (f.type==='number'?'number':'text') + '" class="admin-form-input" data-key="' + f.key + '" value="' + esc(String(val)) + '" ' + dir + ' ' + ro + ' ' + ph + ' /></div>';
    }).join('');

    var mc = document.getElementById('admin-modal-content');
    mc.innerHTML = '<div class="admin-form">' +
      '<h2>' + (isNew ? 'Yangi qo\'shish' : 'Tahrirlash') + ' \u2014 ' + esc(schema.label.split('/')[0].trim()) + '</h2>' +
      '<div class="admin-form-grid">' + fieldsHtml + '</div>' +
      '<div class="admin-form-actions">' +
        '<button class="admin-btn admin-btn-ghost" data-action="admin-modal-close" data-modal="admin-modal">Bekor qilish</button>' +
        '<button class="admin-btn admin-btn-primary" data-action="admin-form-save" data-key="' + sectionKey + '" data-isnew="' + (isNew?1:0) + '" data-idx="' + idx + '">' +
          (isNew ? 'Qo\'shish' : 'Saqlash') +
        '</button>' +
      '</div></div>';
    openAdminModal('admin-modal');
  }

  function handleToggleClick(el) {
    var track = el.querySelector('.admin-toggle-track') || el.closest('[data-action]').querySelector('.admin-toggle-track');
    if (!track) return;
    track.classList.toggle('on');
    var label = track.parentElement.querySelector('.admin-toggle-label');
    if (label) label.textContent = track.classList.contains('on') ? 'Ha' : 'Yo\'q';
  }

  function handleTagAdd(input) {
    var wrap = input.closest('.admin-tags-wrap');
    var pill = document.createElement('span');
    pill.className = 'admin-tag-pill';
    pill.innerHTML = esc(input.value.trim()) + '<span class="tag-remove">\u00d7</span>';
    wrap.insertBefore(pill, input);
    input.value = '';
  }

  // Image upload handler
  async function handleImgUpload(input, key) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast('Fayl juda katta (max 5MB)', 'error'); return; }
    if (!file.type.startsWith('image/')) { toast('Faqat rasm fayllari ruxsat etiladi', 'error'); return; }
    var wrap = input.closest('.admin-img-field');
    var pw = wrap.querySelector('.admin-img-preview-wrap');
    pw.innerHTML = '<div class="admin-img-placeholder">' + I.info + '<span>Yuklanmoqda...</span></div>';

    var fd = new FormData();
    fd.append('file', file);

    var uploadHeaders = { 'Authorization': 'Bearer ' + authToken };
    if (csrfToken) uploadHeaders['X-CSRF-Token'] = csrfToken;

    try {
      var res = await fetch('/api/upload', { method: 'POST', headers: uploadHeaders, body: fd });
      var r = await res.json();
      if (r.success) {
        wrap.querySelector('input[data-key="' + key + '"]').value = r.path;
        pw.innerHTML = '<img src="' + esc(r.path) + '" class="admin-img-preview" />';
        toast('Rasm yuklandi', 'success');
      } else {
        toast('Yuklash xatosi', 'error');
        pw.innerHTML = '<div class="admin-img-placeholder">' + I.image + '<span>Rasm yo\'q</span></div>';
      }
    } catch (e) {
      toast('Yuklash xatosi', 'error');
      pw.innerHTML = '<div class="admin-img-placeholder">' + I.image + '<span>Rasm yo\'q</span></div>';
    }
  }

  function handleImgClear(key) {
    var modal = document.getElementById('admin-modal-content');
    var wrap = modal.querySelector('.admin-img-field[data-key="' + key + '"]');
    if (!wrap) return;
    wrap.querySelector('input[data-key="' + key + '"]').value = '';
    wrap.querySelector('.admin-img-preview-wrap').innerHTML =
      '<div class="admin-img-placeholder">' + I.image + '<span>Rasm yo\'q</span></div>';
  }

  // Collect form data
  function collectForm(sectionKey) {
    var schema = SCHEMAS[sectionKey];
    var item = {};
    var modal = document.getElementById('admin-modal-content');
    schema.fields.forEach(function(f) {
      if (f.type === 'checkbox') {
        var t = modal.querySelector('[data-key="' + f.key + '"]');
        item[f.key] = t ? t.classList.contains('on') : false;
      } else if (f.type === 'tags') {
        var w = modal.querySelector('.admin-tags-wrap[data-key="' + f.key + '"]');
        item[f.key] = w ? Array.from(w.querySelectorAll('.admin-tag-pill')).map(function(p) { return p.childNodes[0].textContent.trim(); }) : [];
      } else if (f.type === 'color') {
        var inp = modal.querySelector('input[data-key="' + f.key + '"]');
        item[f.key] = inp ? inp.value : '';
      } else {
        var inp2 = modal.querySelector('[data-key="' + f.key + '"]');
        if (!inp2) return;
        item[f.key] = f.type === 'number' ? (Number(inp2.value) || 0) : inp2.value;
      }
    });
    return item;
  }

  function handleFormSave(key, isNew, idx) {
    var schema = SCHEMAS[key];
    var item = collectForm(key);
    var missing = schema.fields.filter(function(f) { return f.required && !item[f.key]; });
    if (missing.length) {
      toast('Majburiy maydonlar: ' + missing.map(function(f) { return f.label; }).join(', '), 'error');
      return;
    }
    if (isNew) {
      currentData[key].push(item);
    } else {
      currentData[key][idx] = item;
    }
    markUnsaved();
    closeAdminModal('admin-modal');
    renderSection(document.getElementById('admin-content'), key);
    renderSidebar();
    toast(isNew ? 'Yozuv qo\'shildi' : 'Yozuv yangilandi', 'success');
  }

  // ───────────────────────────────────────────
  // i18n EDITOR
  // ───────────────────────────────────────────
  function renderI18n(el) {
    var uzData = (currentData.i18n && currentData.i18n.uz) || {};
    var enData = (currentData.i18n && currentData.i18n.en) || {};
    var arData = (currentData.i18n && currentData.i18n.ar) || {};
    var trData = (currentData.i18n && currentData.i18n.tr) || {};
    var keys = Object.keys(uzData);
    var rows = keys.map(function(k) {
      return '<tr>' +
        '<td><span class="admin-i18n-key">' + esc(k) + '</span></td>' +
        '<td><input value="' + esc(uzData[k]||'') + '" data-lang="uz" data-key="' + esc(k) + '" /></td>' +
        '<td><input value="' + esc(enData[k]||'') + '" data-lang="en" data-key="' + esc(k) + '" /></td>' +
        '<td><input value="' + esc(arData[k]||'') + '" data-lang="ar" data-key="' + esc(k) + '" dir="rtl" /></td>' +
        '<td><input value="' + esc(trData[k]||'') + '" data-lang="tr" data-key="' + esc(k) + '" /></td>' +
      '</tr>';
    }).join('');

    el.innerHTML =
      '<div class="admin-section-header">' +
        '<div class="admin-section-title">Tarjimalar <span class="admin-section-count">' + keys.length + ' kalit</span></div>' +
        '<button class="admin-add-btn" data-action="admin-i18n-add">' + I.plus + ' Kalit qo\'shish</button>' +
      '</div>' +
      '<p style="font-size:11px;color:var(--text-3);margin-bottom:12px">' +
        'O\'zbek, Ingliz, Arab va Turk tillari uchun barcha interfeys matnlarini tahrirlang.' +
      '</p>' +
      '<div style="overflow-x:auto">' +
        '<table class="admin-i18n-table">' +
          '<thead><tr><th style="width:140px">Kalit</th><th>O\'zbekcha (UZ)</th><th>English (EN)</th><th>Arabic (AR)</th><th>T\u00FCrk\u00E7e (TR)</th></tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>';
  }

  function handleI18nSet(inp) {
    if (!currentData.i18n[inp.dataset.lang]) currentData.i18n[inp.dataset.lang] = {};
    currentData.i18n[inp.dataset.lang][inp.dataset.key] = inp.value;
    markUnsaved();
  }

  function handleI18nAdd() {
    var k = prompt('Yangi tarjima kalitini kiriting (masalan: nav_settings):');
    if (!k || !k.trim()) return;
    var key = k.trim();
    if (currentData.i18n.uz && currentData.i18n.uz[key] !== undefined) { toast('Kalit allaqachon mavjud', 'error'); return; }
    ['uz','en','ar','tr'].forEach(function(lang) {
      if (!currentData.i18n[lang]) currentData.i18n[lang] = {};
      currentData.i18n[lang][key] = '';
    });
    markUnsaved();
    renderI18n(document.getElementById('admin-content'));
    toast('Tarjima kaliti qo\'shildi', 'success');
  }

  // ───────────────────────────────────────────
  // CUSTOM SECTION BUILDER
  // ───────────────────────────────────────────
  function openNewSectionForm() {
    renderSectionBuilder(null);
  }

  function openEditSectionForm(slug) {
    var cs = customSections.find(function(s) { return s.slug === slug; });
    if (!cs) return;
    renderSectionBuilder(cs);
  }

  function renderSectionBuilder(existing) {
    var isEdit = !!existing;
    var label = existing ? existing.label : '';
    var icon = existing ? (existing.icon || '') : '';
    var fields = existing ? (existing.fields || []) : [];

    var fieldsHtml = fields.map(function(f, idx) {
      return buildFieldRow(f, idx);
    }).join('');

    var mc = document.getElementById('admin-modal-content');
    mc.innerHTML =
      '<div class="admin-form">' +
        '<h2>' + (isEdit ? 'Bo\'limni tahrirlash' : 'Yangi bo\'lim yaratish') + '</h2>' +
        '<div class="admin-form-grid">' +
          '<div class="admin-form-group">' +
            '<label class="admin-form-label">Bo\'lim nomi <span class="req">*</span></label>' +
            '<input type="text" class="admin-form-input" id="cs-label" value="' + esc(label) + '" placeholder="Masalan: Kutubxona" />' +
          '</div>' +
          '<div class="admin-form-group">' +
            '<label class="admin-form-label">Icon (emoji)</label>' +
            '<input type="text" class="admin-form-input" id="cs-icon" value="' + esc(icon) + '" placeholder="Masalan: &#128218;" />' +
          '</div>' +
        '</div>' +
        '<div style="margin:16px 0 8px;font-weight:600;font-size:13px">Maydonlar</div>' +
        '<div id="cs-fields-list">' + fieldsHtml + '</div>' +
        '<button class="admin-btn admin-btn-ghost" data-action="admin-section-add-field" style="margin:8px 0 16px">' + I.plus + ' Maydon qo\'shish</button>' +
        '<div class="admin-form-actions">' +
          '<button class="admin-btn admin-btn-ghost" data-action="admin-modal-close" data-modal="admin-modal">Bekor qilish</button>' +
          '<button class="admin-btn admin-btn-primary" data-action="admin-section-save" data-edit-id="' + (existing ? existing.id : '') + '" data-edit-slug="' + (existing ? existing.slug : '') + '">' +
            (isEdit ? 'Saqlash' : 'Yaratish') +
          '</button>' +
        '</div>' +
      '</div>';
    openAdminModal('admin-modal');
  }

  function buildFieldRow(f, idx) {
    var typeOpts = FIELD_TYPES.map(function(ft) {
      return '<option value="' + ft.value + '" ' + (f.type === ft.value ? 'selected' : '') + '>' + ft.label + '</option>';
    }).join('');

    return '<div class="cs-field-row" data-fidx="' + idx + '" style="display:flex;gap:6px;align-items:center;margin-bottom:6px;padding:8px;background:var(--bg-2);border-radius:6px">' +
      '<input type="text" class="admin-form-input cs-field-key" value="' + esc(f.key || '') + '" placeholder="Kalit (slug)" style="flex:1;min-width:0" />' +
      '<input type="text" class="admin-form-input cs-field-label" value="' + esc(f.label || '') + '" placeholder="Nomi" style="flex:1.5;min-width:0" />' +
      '<select class="admin-form-input cs-field-type" style="flex:1;min-width:0">' + typeOpts + '</select>' +
      '<label style="display:flex;align-items:center;gap:3px;font-size:11px;white-space:nowrap"><input type="checkbox" class="cs-field-required" ' + (f.required ? 'checked' : '') + ' /> Shart</label>' +
      '<label style="display:flex;align-items:center;gap:3px;font-size:11px;white-space:nowrap"><input type="checkbox" class="cs-field-half" ' + (f.half ? 'checked' : '') + ' /> Yarim</label>' +
      '<button class="admin-action-btn danger" data-action="admin-section-remove-field" title="O\'chirish" style="flex-shrink:0">' + I.trash + '</button>' +
    '</div>';
  }

  function handleSectionAddField() {
    var list = document.getElementById('cs-fields-list');
    var idx = list.children.length;
    var div = document.createElement('div');
    div.innerHTML = buildFieldRow({ key: '', label: '', type: 'text' }, idx);
    list.appendChild(div.firstElementChild);
  }

  function handleSectionRemoveField(el) {
    var row = el.closest('.cs-field-row');
    if (row) row.remove();
  }

  async function handleSectionFormSave() {
    var label = document.getElementById('cs-label').value.trim();
    var icon = document.getElementById('cs-icon').value.trim();
    var saveBtn = document.querySelector('[data-action="admin-section-save"]');
    var editId = saveBtn.dataset.editId ? parseInt(saveBtn.dataset.editId) : null;
    var editSlug = saveBtn.dataset.editSlug || '';

    if (!label) { toast('Bo\'lim nomini kiriting', 'error'); return; }

    var fields = [];
    document.querySelectorAll('#cs-fields-list .cs-field-row').forEach(function(row) {
      var key = row.querySelector('.cs-field-key').value.trim();
      var flabel = row.querySelector('.cs-field-label').value.trim();
      var type = row.querySelector('.cs-field-type').value;
      var required = row.querySelector('.cs-field-required').checked;
      var half = row.querySelector('.cs-field-half').checked;
      if (key) {
        var f = { key: key, label: flabel || key, type: type };
        if (required) f.required = true;
        if (half) f.half = true;
        fields.push(f);
      }
    });

    if (fields.length === 0) { toast('Kamida bitta maydon qo\'shing', 'error'); return; }

    var payload = {
      action: editId ? 'update' : 'create',
      label: label,
      icon: icon,
      fields: fields,
    };
    if (editId) { payload.id = editId; payload.slug = editSlug; }

    try {
      var r = await api('POST', '/api/custom-sections', payload);
      if (r.success) {
        // Reload all data to get fresh custom sections
        var data = await api('GET', '/api/data');
        if (data && !data.error) {
          currentData = data;
          // Rebuild custom section schemas
          customSections.forEach(function(cs) {
            var sKey = '_custom_' + cs.slug;
            delete SCHEMAS[sKey];
            var idx = SECTION_ORDER.indexOf(sKey);
            if (idx !== -1) SECTION_ORDER.splice(idx, 1);
          });
          loadCustomSections();
        }
        closeAdminModal('admin-modal');
        renderSidebar();
        toast(editId ? 'Bo\'lim yangilandi' : 'Yangi bo\'lim yaratildi!', 'success');
        if (r.slug) nav('_custom_' + r.slug);
      } else {
        toast(r.error || 'Xatolik', 'error');
      }
    } catch (e) {
      toast('Server xatosi', 'error');
    }
  }

  function handleDeleteSection(slug) {
    var cs = customSections.find(function(s) { return s.slug === slug; });
    if (!cs) return;
    showConfirm('Bo\'lim o\'chirilsinmi?', '"' + esc(cs.label) + '" va undagi barcha ma\'lumotlar butunlay o\'chiriladi.', async function() {
      try {
        var r = await api('POST', '/api/custom-sections', { action: 'delete', id: cs.id });
        if (r.success) {
          var sKey = '_custom_' + slug;
          delete SCHEMAS[sKey];
          delete currentData[sKey];
          var idx = SECTION_ORDER.indexOf(sKey);
          if (idx !== -1) SECTION_ORDER.splice(idx, 1);
          customSections = customSections.filter(function(s) { return s.slug !== slug; });
          renderSidebar();
          nav('dashboard');
          toast('Bo\'lim o\'chirildi', 'info');
        } else { toast(r.error || 'Xatolik', 'error'); }
      } catch (e) { toast('Server xatosi', 'error'); }
    });
  }

  // ───────────────────────────────────────────
  // SETTINGS
  // ───────────────────────────────────────────
  function renderSettings(el) {
    el.innerHTML =
      '<div class="admin-dashboard-header">' +
        '<h1>Sozlamalar</h1>' +
        '<p>Admin panel konfiguratsiyasi</p>' +
      '</div>' +
      '<div class="settings-grid">' +
        '<div class="settings-card">' +
          '<h3>Parolni o\'zgartirish</h3>' +
          '<p>Admin panel kirish parolini yangilang</p>' +
          '<div class="settings-form">' +
            '<div class="admin-form-group full-width">' +
              '<label class="admin-form-label">Joriy parol <span class="req">*</span></label>' +
              '<input type="password" class="admin-form-input" id="pwd-current" />' +
            '</div>' +
            '<div class="admin-form-group full-width">' +
              '<label class="admin-form-label">Yangi parol <span class="req">*</span></label>' +
              '<input type="password" class="admin-form-input" id="pwd-new" />' +
            '</div>' +
            '<div class="admin-form-group full-width">' +
              '<label class="admin-form-label">Yangi parolni tasdiqlang <span class="req">*</span></label>' +
              '<input type="password" class="admin-form-input" id="pwd-confirm" />' +
            '</div>' +
          '</div>' +
          '<button class="admin-btn admin-btn-primary" data-action="admin-pwd" id="pwd-btn">Parolni o\'zgartirish</button>' +
          '<div id="pwd-error" class="settings-error"></div>' +
        '</div>' +
        '<div class="settings-card">' +
          '<h3>Zaxira nusxa</h3>' +
          '<p>Qo\'lda zaxira nusxa yarating. Har bir saqlashda avtomatik zaxira yaratiladi.</p>' +
          '<button class="admin-btn admin-btn-ghost" data-action="admin-backup">Zaxira yaratish</button>' +
        '</div>' +
        '<div class="settings-card">' +
          '<h3>Haqida</h3>' +
          '<p>IBXI Admin Panel v2.0 (Xavfsiz)</p>' +
          '<div style="font-size:11px;color:var(--text-3);line-height:2">' +
            '<div>Ma\'lumotlar bazasi: <code>ibxi.db</code> (SQLite)</div>' +
            '<div>Zaxiralar: <code>backups/</code></div>' +
            '<div>Xavfsizlik: PBKDF2, CSRF, Rate Limiting</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  async function changePwd() {
    var cur = document.getElementById('pwd-current').value;
    var np = document.getElementById('pwd-new').value;
    var conf = document.getElementById('pwd-confirm').value;
    var err = document.getElementById('pwd-error');
    var btn = document.getElementById('pwd-btn');
    err.textContent = '';
    if (!cur || !np || !conf) { err.textContent = 'Barcha maydonlar to\'ldirilishi shart'; return; }
    if (np.length < 8) { err.textContent = 'Parol kamida 8 belgidan iborat bo\'lishi kerak'; return; }
    if (np !== conf) { err.textContent = 'Parollar mos kelmaydi'; return; }
    btn.disabled = true; btn.textContent = 'O\'zgartirilmoqda...';
    try {
      var r = await api('POST', '/api/password', { current: cur, new: np });
      if (r.success) {
        toast('Parol o\'zgartirildi', 'success');
        document.getElementById('pwd-current').value = '';
        document.getElementById('pwd-new').value = '';
        document.getElementById('pwd-confirm').value = '';
      } else { err.textContent = r.error || 'Xatolik'; }
    } catch (e) { err.textContent = 'Ulanish xatosi'; }
    btn.disabled = false; btn.textContent = 'Parolni o\'zgartirish';
  }

  async function manualBackup() {
    try {
      var r = await api('POST', '/api/backup');
      if (r.success) toast('Zaxira yaratildi: ' + r.filename, 'success');
    } catch (e) { toast('Zaxira yaratish xatosi', 'error'); }
  }

  // ───────────────────────────────────────────
  // SAVE ALL (with auto-save)
  // ───────────────────────────────────────────
  async function saveAll() {
    var btn = document.getElementById('save-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = I.save + ' Saqlanmoqda...'; }
    try {
      var r = await api('POST', '/api/data', currentData);
      if (r.success) {
        hasUnsaved = false;
        clearTimeout(autoSaveTimeout);
        toast('Saqlandi. Zaxira: ' + (r.backup || ''), 'success');
      } else {
        toast('Saqlash xatosi', 'error');
      }
    } catch (e) { toast('Saqlash xatosi', 'error'); }
    if (btn) btn.disabled = false;
    renderTopbar();
  }

  // ───────────────────────────────────────────
  // LOGOUT
  // ───────────────────────────────────────────
  function handleLogout() {
    showConfirm('Chiqilsinmi?',
      hasUnsaved ? 'Saqlanmagan o\'zgarishlar bor.' : 'Login sahifasiga qaytasiz.',
      function() {
        api('POST', '/api/logout');
        clearAuth();
        currentData = null;
        hasUnsaved = false;
        document.getElementById('admin-app').style.display = 'none';
        document.getElementById('login-screen').style.display = '';
        document.getElementById('login-password').value = '';
      });
  }

  // ───────────────────────────────────────────
  // MOBILE SIDEBAR
  // ───────────────────────────────────────────
  function toggleMobileSidebar() {
    var sb = document.getElementById('admin-sidebar');
    sb.classList.toggle('open');
  }

  // Close sidebar on nav click (mobile)
  function closeMobileSidebar() {
    var sb = document.getElementById('admin-sidebar');
    if (sb) sb.classList.remove('open');
  }

  // ───────────────────────────────────────────
  // THEME
  // ───────────────────────────────────────────
  function toggleAdminTheme() {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ibxi_theme', darkMode ? 'dark' : 'light');
    renderTopbar();
  }

  // ───────────────────────────────────────────
  // HELPERS
  // ───────────────────────────────────────────
  function nextId(key) {
    var items = currentData[key] || [];
    if (!items.length) return 1;
    return Math.max.apply(null, items.map(function(i) { return i.id || 0; })) + 1;
  }

  function markUnsaved() {
    hasUnsaved = true;
    renderTopbar();
    // Auto-save after 30 seconds of inactivity
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(function() {
      if (hasUnsaved) {
        saveAll();
        toast('Avtomatik saqlandi', 'info');
      }
    }, 30000);
  }

  function esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
  }

  // ───────────────────────────────────────────
  // MODAL & CONFIRM
  // ───────────────────────────────────────────
  function openAdminModal(id) { document.getElementById(id).classList.add('show'); }
  function closeAdminModal(id) { document.getElementById(id).classList.remove('show'); }

  function showConfirm(title, msg, cb) {
    confirmCallback = cb;
    document.getElementById('confirm-content').innerHTML =
      '<div class="admin-confirm">' +
        '<div class="admin-confirm-icon">' + I.warning + '</div>' +
        '<h3>' + esc(title) + '</h3>' +
        '<p>' + esc(msg) + '</p>' +
        '<div class="admin-confirm-actions">' +
          '<button class="admin-btn admin-btn-ghost" data-action="admin-modal-close" data-modal="confirm-modal">Bekor qilish</button>' +
          '<button class="admin-btn admin-btn-danger" data-action="admin-confirm">Tasdiqlash</button>' +
        '</div>' +
      '</div>';
    openAdminModal('confirm-modal');
  }

  function handleConfirmAction() {
    closeAdminModal('confirm-modal');
    if (confirmCallback) confirmCallback();
    confirmCallback = null;
  }

  // ───────────────────────────────────────────
  // TOAST
  // ───────────────────────────────────────────
  function toast(msg, type) {
    var iconMap = { success: I.check, error: I.error, info: I.info, warning: I.warning };
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast ' + (type || 'info');
    t.innerHTML = '<span class="toast-icon">' + (iconMap[type] || I.info) + '</span><span class="toast-msg">' + esc(msg) + '</span>';
    c.appendChild(t);
    requestAnimationFrame(function() { t.classList.add('show'); });
    setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 300); }, 3000);
  }

  // ───────────────────────────────────────────
  // UNSAVED WARNING
  // ───────────────────────────────────────────
  window.addEventListener('beforeunload', function(e) {
    if (hasUnsaved) { e.preventDefault(); e.returnValue = ''; }
  });

  // Expose closeModal for HTML onclick in admin.html
  window.closeModal = closeAdminModal;

})();
