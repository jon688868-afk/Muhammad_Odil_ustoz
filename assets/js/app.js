// ============================================
// IBXI – Imom Buxoriy ilmiy tadqiqot markazi
// Main Application Logic — v4.0 (Secured)
// ============================================

(function () {
  'use strict';

  // Sanitize shortcuts
  var esc      = IBXI.Sanitize.escapeHTML;
  var escAttr  = IBXI.Sanitize.escapeAttr;
  // sanitizeHTML used for trusted rich modal content built server-side; kept for future use
  // var sanitize = IBXI.Sanitize.sanitizeHTML;

  // === SVG ICON LIBRARY ===
  var _s = function(d,w){w=w||16;return '<svg width="'+w+'" height="'+w+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+d+'</svg>';};
  var _i = function(d){return '<span class="ic">'+_s(d)+'</span>';};
  var _il = function(d){return '<span class="ic-lg">'+_s(d,32)+'</span>';};
  var _ix = function(d,w){return '<span class="ic-lg">'+_s(d,w||48)+'</span>';};

  var IC = {
    sun:       _s('<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'),
    moon:      _s('<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>'),
    search:    _s('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    check:     _s('<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),
    info:      _s('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'),
    warn:      _s('<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    cal:       '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    calendar:  '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock:     '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pen:       '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    mapPin:    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    barChart:  '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    tag:       '<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    camera:    '<path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/>',
    mic:       '<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    globe:     '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
    book:      '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
    bookOpen:  '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
    file:      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    download:  '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    share:     '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    bookmark:  '<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>',
    mail:      '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    phone:     '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
    map:       '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
    image:     '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    play:      '<polygon points="5 3 19 12 5 21 5 3"/>',
    bell:      '<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>',
    grad:      '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>',
    building:  '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>',
    crown:     '<path d="M2 20h20"/><path d="M4 20l1-12 5 5 3-7 3 7 5-5 1 12"/>',
    star:      '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    users:     '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
    handshake: '<path d="M11 17l-1 4-4-1 1-4"/><path d="M13 17l1 4 4-1-1-4"/><path d="M7 7l-2 5 4 1"/><path d="M17 7l2 5-4 1"/><path d="M9 12l3-3 3 3"/>',
    seedling:  '<path d="M12 22V12"/><path d="M7 12c0-4 5-8 5-8s5 4 5 8"/><path d="M4 8c2-2 5-2 8 0"/><path d="M20 8c-2-2-5-2-8 0"/>',
    mosque:    '<path d="M5 21V11l7-7 7 7v10"/><path d="M1 21h22"/><path d="M9 21v-4a3 3 0 016 0v4"/><path d="M12 4c0 0 3 2 3 5H9c0-3 3-5 3-5z"/>',
    clipboard: '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
    newspaper: '<path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="6" x2="18" y2="6"/><line x1="10" y1="10" x2="18" y2="10"/><line x1="10" y1="14" x2="14" y2="14"/>',
    pin:       '<path d="M15 4.5l-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-3.5 4-4"/><line x1="9" y1="15" x2="4.5" y2="19.5"/><line x1="14.5" y1="4" x2="20" y2="9.5"/>',
    mailbox:   '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/><path d="M2 20l7.05-7.05M22 20l-7.05-7.05"/>',
    satellite: '<path d="M13 7L8.7 2.7a2.41 2.41 0 00-3.4 0L2.7 5.3a2.41 2.41 0 000 3.4L7 13"/><path d="M11 17l4.3 4.3c.94.94 2.46.94 3.4 0l2.6-2.6c.94-.94.94-2.46 0-3.4L17 11"/><line x1="8" y1="11" x2="13" y2="16"/><line x1="16" y1="2" x2="22" y2="8"/>',
    plane:     '<path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    dollar:    '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
    office:    '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9.01" y2="6"/><line x1="15" y1="6" x2="15.01" y2="6"/><line x1="9" y1="10" x2="9.01" y2="10"/><line x1="15" y1="10" x2="15.01" y2="10"/><path d="M9 22v-4h6v4"/>',
    megaphone: '<path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/>',
    twitter:   '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    youtube:   '<path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    facebook:  '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>',
    eye:       '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    scope:     '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>',
    question:  '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    smartphone:'<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
    send:      '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    award:     '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
    list:      '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  };

  // === STATE ===
  var currentLang      = localStorage.getItem('ibxi_lang')  || 'uz';
  var currentPage      = 'home';
  var sidebarCollapsed = false;
  var darkMode         = localStorage.getItem('ibxi_theme') !== 'light';
  var archiveTextQ     = '';
  var archiveCatQ      = 'Barchasi';
  var readingList      = JSON.parse(localStorage.getItem('ibxi_reading') || '[]');
  var notifRead        = JSON.parse(localStorage.getItem('ibxi_notif_read') || 'false');

  // Lazy-load page cache; cleared on language change
  var pageCache = {};

  // MutationObserver reference so we can disconnect it
  var pageObserver = null;

  // === DOMContentLoaded ===
  document.addEventListener('DOMContentLoaded', function () {
    try {
      initTheme();
      renderSidebar();
      renderTopbar();
      renderFooter();

      // Hash routing: navigate to hash if present
      var hash = window.location.hash.replace('#', '');
      var validPages = ['home','foundation','corporate','research','academy',
                        'international','publications','blog','gallery','archive','contact'];
      var startPage = validPages.indexOf(hash) !== -1 ? hash : 'home';
      navigateTo(startPage);

      initEventListeners();
      initScrollToTop();

      setTimeout(function () {
        var loader = document.getElementById('loader');
        if (loader) loader.classList.remove('show');
      }, 700);
      setTimeout(function () {
        showToast('Imom Buxoriy ilmiy tadqiqot markazi ishga tushdi', 'info', IC.info);
      }, 800);
    } catch (err) {
      console.error('IBXI init error:', err);
    }
  });

  // Hash routing
  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash && hash !== currentPage) {
      navigateTo(hash);
    }
  });

  // ============================================
  // HELPERS
  // ============================================
  function L(obj, uzKey, enKey, arKey, trKey) {
    if (currentLang === 'en' && enKey) return obj[enKey] || obj[uzKey] || '';
    if (currentLang === 'ar' && arKey) return obj[arKey] || obj[uzKey] || '';
    if (currentLang === 'tr' && trKey) return obj[trKey] || obj[uzKey] || '';
    return obj[uzKey] || '';
  }

  function formatDate(d) {
    if (!d) return '';
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      var parts = d.split('-');
      return parts[2] + '.' + parts[1] + '.' + parts[0];
    }
    return d;
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      var ctx  = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  function sectionHead(title, seeAllLabel, seeAllPage) {
    var right = seeAllLabel
      ? '<button class="see-all" data-action="navigate" data-page="' + escAttr(seeAllPage) + '">' + esc(seeAllLabel) + ' \u2192</button>'
      : '';
    return '<div class="section-head"><div class="sh-left"><div class="sh-bar"></div><h2>' + esc(title) + '</h2></div>' + right + '</div>';
  }

  function emptyState(icon, title, subtitle) {
    return '<div class="empty-state"><div class="es-icon">' + icon + '</div><h3 class="es-title">' + esc(title) + '</h3><p class="es-sub">' + esc(subtitle) + '</p></div>';
  }

  // ============================================
  // THEME
  // ============================================
  function initTheme() {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }

  function toggleTheme() {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ibxi_theme', darkMode ? 'dark' : 'light');
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = darkMode ? IC.sun : IC.moon;
    showToast(darkMode ? 'Qorong\'u mavzu faol' : 'Yorug\' mavzu faol', 'info', IC.info);
  }

  // ============================================
  // SIDEBAR
  // ============================================
  function renderSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    var t = DATA.i18n[currentLang];
    document.documentElement.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    var navItems = [
      { id: 'home',          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', label: t.nav_home },
      { id: 'foundation',    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', label: t.nav_foundation },
      { id: 'corporate',     icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>', label: t.nav_corporate },
      { id: 'research',      icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>', label: t.nav_research },
      { id: 'academy',       icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>', label: t.nav_academy },
      { id: 'international', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>', label: t.nav_international },
      { id: 'publications',  icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>', label: t.nav_publications },
      { id: 'blog',          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>', label: t.nav_blog },
      { id: 'gallery',       icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', label: t.nav_gallery },
      { id: 'archive',       icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>', label: t.nav_archive },
      { id: 'contact',       icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', label: t.nav_contact },
    ];

    var navHTML = navItems.map(function (item) {
      return '<div class="nav-item ' + (currentPage === item.id ? 'active' : '') + '" data-action="navigate" data-page="' + escAttr(item.id) + '">'
        + '<span class="nav-icon">' + item.icon + '</span>'
        + '<span class="nav-label">' + esc(item.label) + '</span>'
        + '<span class="nav-tooltip">' + esc(item.label) + '</span>'
        + '</div>';
    }).join('');

    sidebar.innerHTML = '<div class="sidebar-logo">'
      + '<img src="assets/img/logo.png" alt="Imom Buxoriy" class="logo-mark" />'
      + '<div class="logo-text">'
      + '<span class="lt-main">IMOM BUXORIY</span>'
      + '<span class="lt-divider"></span>'
      + '<span class="lt-sub">Ilmiy Tadqiqot Markazi</span>'
      + '</div>'
      + '</div>'
      + '<nav class="sidebar-nav">' + navHTML + '</nav>';
  }

  // ============================================
  // TOPBAR
  // ============================================
  function renderTopbar() {
    var topbar = document.getElementById('topbar');
    if (!topbar) return;
    var themeIcon = darkMode ? IC.sun : IC.moon;
    var searchPh  = currentLang === 'uz' ? 'Qidirish...' : currentLang === 'en' ? 'Search...' : currentLang === 'tr' ? 'Ara...' : 'بحث...';
    var themeTip  = currentLang === 'uz' ? 'Mavzuni almashtirish' : 'Toggle Theme';

    topbar.innerHTML = '<div class="topbar-left">'
      + '<button id="toggle-sidebar" class="tb-toggle" data-action="toggle-sidebar" title="Menyuni yashirish">☰</button>'
      + '</div>'
      + '<div class="topbar-right">'
      + '<div class="search-wrap" id="search-container" style="position:relative">'
      + '<div class="search-box"><span class="si">' + IC.search + '</span>'
      + '<input type="text" id="search-input" placeholder="' + escAttr(searchPh) + '" autocomplete="off" /></div>'
      + '<div class="search-results" id="search-results"></div>'
      + '</div>'
      + '<div class="lang-dropdown" id="lang-dropdown">'
      + '<button class="tb-btn" data-action="toggle-lang-dd" title="Til / Language">' + esc(currentLang.toUpperCase()) + '</button>'
      + '<div class="lang-dropdown-menu" id="lang-dropdown-menu">'
      + '<button class="lang-dd-item ' + (currentLang === 'uz' ? 'active' : '') + '" data-action="set-lang" data-lang="uz"><span class="lang-dd-code">UZ</span><span class="lang-dd-name">O\'zbekcha</span></button>'
      + '<button class="lang-dd-item ' + (currentLang === 'en' ? 'active' : '') + '" data-action="set-lang" data-lang="en"><span class="lang-dd-code">EN</span><span class="lang-dd-name">English</span></button>'
      + '<button class="lang-dd-item ' + (currentLang === 'ar' ? 'active' : '') + '" data-action="set-lang" data-lang="ar"><span class="lang-dd-code">عر</span><span class="lang-dd-name">العربية</span></button>'
      + '<button class="lang-dd-item ' + (currentLang === 'tr' ? 'active' : '') + '" data-action="set-lang" data-lang="tr"><span class="lang-dd-code">TR</span><span class="lang-dd-name">Türkçe</span></button>'
      + '</div></div>'
      + '<button class="tb-btn" data-action="toggle-theme" id="theme-toggle" title="' + escAttr(themeTip) + '">' + themeIcon + '</button>'
      + '</div>';
  }

  // ============================================
  // FOOTER
  // ============================================
  function renderFooter() {
    var footer = document.getElementById('site-footer');
    if (!footer) return;
    var isEn = currentLang === 'en';
    var isTr = currentLang === 'tr';
    var year = new Date().getFullYear();
    footer.classList.toggle('collapsed', sidebarCollapsed);

    var brandDesc = isEn
      ? 'An independent research center studying the intellectual heritage of Islamic civilization.'
      : isTr
      ? 'İslam medeniyetinin entelektüel mirasını araştıran bağımsız bir araştırma merkezi.'
      : 'Islom tsivilizatsiyasining intellektual merosini tadqiq qiluvchi mustaqil ilmiy-tadqiqot markazi.';

    var t = DATA.i18n[currentLang];
    footer.innerHTML = '<div class="footer-inner"><div class="footer-grid">'
      + '<div class="footer-brand">'
      + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">'
      + '<img src="assets/img/logo.png" alt="" style="width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 1px 4px rgba(228,183,58,.2))" />'
      + '<div>'
      + '<div style="font-size:13px;font-weight:700;color:#fff;letter-spacing:1.4px">IMOM BUXORIY</div>'
      + '<div style="width:20px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);margin:3px 0 2px"></div>'
      + '<div style="font-size:9px;font-weight:500;color:var(--gold);letter-spacing:1px;text-transform:uppercase;opacity:.8">Ilmiy Tadqiqot Markazi</div>'
      + '</div></div>'
      + '<p style="font-size:12px;color:rgba(255,255,255,.45);line-height:1.7">' + esc(brandDesc) + '</p>'
      + '</div>'
      + '<div class="footer-links"><h4>' + esc(isEn ? 'Quick Links' : isTr ? 'Hızlı Bağlantılar' : 'Tezkor havolalar') + '</h4><ul>'
      + '<li><a href="#home" data-action="navigate" data-page="home">' + esc(t.nav_home) + '</a></li>'
      + '<li><a href="#research" data-action="navigate" data-page="research">' + esc(t.nav_research) + '</a></li>'
      + '<li><a href="#publications" data-action="navigate" data-page="publications">' + esc(t.nav_publications) + '</a></li>'
      + '<li><a href="#academy" data-action="navigate" data-page="academy">' + esc(t.nav_academy) + '</a></li>'
      + '</ul></div>'
      + '<div class="footer-links"><h4>' + esc(isEn ? 'Resources' : isTr ? 'Kaynaklar' : 'Resurslar') + '</h4><ul>'
      + '<li><a href="#blog" data-action="navigate" data-page="blog">' + esc(t.nav_blog) + '</a></li>'
      + '<li><a href="#gallery" data-action="navigate" data-page="gallery">' + esc(t.nav_gallery) + '</a></li>'
      + '<li><a href="#archive" data-action="navigate" data-page="archive">' + esc(t.nav_archive) + '</a></li>'
      + '<li><a href="#contact" data-action="navigate" data-page="contact">' + esc(t.nav_contact) + '</a></li>'
      + '</ul></div>'
      + '<div class="footer-links"><h4>' + esc(isEn ? 'Contact' : isTr ? 'İletişim' : 'Aloqa') + '</h4><ul>'
      + '<li style="color:rgba(255,255,255,.45);font-size:12.5px">Samarqand, O\'zbekiston</li>'
      + '<li style="color:rgba(255,255,255,.45);font-size:12.5px">info@imambukhari.uz</li>'
      + '<li style="color:rgba(255,255,255,.45);font-size:12.5px">+998 66 233 00 00</li>'
      + '</ul></div>'
      + '</div>'
      + '<div class="footer-bottom"><span>&copy; ' + year + ' Imom Buxoriy ilmiy tadqiqot markazi. ' + esc(t.footer_rights) + '</span></div>'
      + '</div>';
  }

  // ============================================
  // NAVIGATION
  // ============================================
  function navigateTo(pageId) {
    try {
      currentPage = pageId;

      // Lazy render: build page HTML if not yet cached
      renderPage(pageId);

      document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
      var target = document.getElementById('page-' + pageId);
      if (target) target.classList.add('active');

      document.querySelectorAll('.nav-item').forEach(function (n) {
        n.classList.toggle('active', n.dataset.page === pageId);
      });

      // Update hash
      if (window.location.hash !== '#' + pageId) {
        history.replaceState(null, '', '#' + pageId);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      var sb = document.getElementById('sidebar');
      if (sb) sb.classList.remove('mobile-open');
      var mo = document.getElementById('mobile-overlay');
      if (mo) mo.classList.remove('show');
      hideSearchDropdown();

      if (pageId === 'home') {
        setTimeout(initCountUp, 100);
      }
      setTimeout(function () {
        animateProgressBars();
        initScrollReveal();
        attachPageObserver();
      }, 50);
    } catch (err) {
      console.error('navigateTo error:', err);
    }
  }

  // ============================================
  // LAZY PAGE RENDERING
  // ============================================
  function renderPage(pageId) {
    var container = document.getElementById('pages-container');
    if (!container) return;

    // If page div already exists, just return (cache hit)
    if (document.getElementById('page-' + pageId)) return;

    var html = '';
    switch (pageId) {
      case 'home':          html = renderHomePage();          break;
      case 'foundation':    html = renderFoundationPage();    break;
      case 'corporate':     html = renderCorporatePage();     break;
      case 'research':      html = renderResearchPage();      break;
      case 'academy':       html = renderAcademyPage();       break;
      case 'international': html = renderInternationalPage(); break;
      case 'publications':  html = renderPublicationsPage();  break;
      case 'blog':          html = renderBlogPage();          break;
      case 'gallery':       html = renderGalleryPage();       break;
      case 'archive':       html = renderArchivePage();       break;
      case 'contact':       html = renderContactPage();       break;
      default: return;
    }
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    while (wrapper.firstChild) container.appendChild(wrapper.firstChild);
  }

  function toggleSidebar() {
    var isMobile = window.innerWidth <= 768;
    if (isMobile) {
      var sb = document.getElementById('sidebar');
      var mo = document.getElementById('mobile-overlay');
      if (sb) sb.classList.toggle('mobile-open');
      if (mo) mo.classList.toggle('show');
    } else {
      sidebarCollapsed = !sidebarCollapsed;
      var sidebar  = document.getElementById('sidebar');
      var topbar   = document.getElementById('topbar');
      var main     = document.getElementById('main-content');
      var ftr      = document.getElementById('site-footer');
      if (sidebar) sidebar.classList.toggle('collapsed', sidebarCollapsed);
      if (topbar)  topbar.classList.toggle('collapsed', sidebarCollapsed);
      if (main)    main.classList.toggle('collapsed', sidebarCollapsed);
      if (ftr)     ftr.classList.toggle('collapsed', sidebarCollapsed);
    }
  }

  // ============================================
  // LANGUAGE
  // ============================================
  function toggleLangDropdown() {
    var menu = document.getElementById('lang-dropdown-menu');
    if (menu) menu.classList.toggle('show');
  }

  function closeLangDD() {
    var menu = document.getElementById('lang-dropdown-menu');
    if (menu) menu.classList.remove('show');
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('ibxi_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    // Invalidate page cache on language change
    pageCache = {};
    // Remove all rendered page divs so they are re-rendered
    var container = document.getElementById('pages-container');
    if (container) container.innerHTML = '';
    renderSidebar();
    renderTopbar();
    renderFooter();
    navigateTo(currentPage);
    closeLangDD();
    showToast(
      lang === 'uz' ? "O'zbekcha tanlandi" :
      lang === 'en' ? 'English selected' :
      lang === 'tr' ? 'Türkçe seçildi' :
      'تم اختيار العربية',
      'success', IC.check
    );
  }

  // ============================================
  // HOME PAGE
  // ============================================
  function renderHomePage() {
    var t    = DATA.i18n[currentLang];
    var news = DATA.news;
    var areas = DATA.researchAreas;
    var evts  = DATA.events;
    var vids  = DATA.videos;

    var statItems = [
      { icon:_s(IC.grad,24),     sc:'sc-gold',   si:'si-gold',   num:48,  suffix:'',  label: t.stat_researchers },
      { icon:_s(IC.book,24),     sc:'sc-blue',   si:'si-blue',   num:212, suffix:'',  label: t.stat_publications },
      { icon:_s(IC.mic,24),      sc:'sc-green',  si:'si-green',  num:340, suffix:'+', label: t.stat_events },
      { icon:_s(IC.clock,24),    sc:'sc-purple', si:'si-purple', num:15,  suffix:'',  label: t.stat_years },
    ];

    var seeAllNews = currentLang==='en' ? 'All News' : currentLang==='ar' ? 'كل الأخبار' : currentLang==='tr' ? 'Tüm Haberler' : 'Barcha yangiliklar';
    var seeAllRes  = currentLang==='en' ? 'All Research' : currentLang==='ar' ? 'كل الأبحاث' : currentLang==='tr' ? 'Tüm Araştırmalar' : 'Barcha tadqiqotlar';
    var seeAllEvt  = currentLang==='en' ? 'All Events' : currentLang==='tr' ? 'Tüm Etkinlikler' : 'Barcha tadbirlar';
    var viewsWord  = currentLang==='ar' ? 'مشاهدة' : currentLang==='en' ? 'views' : currentLang==='tr' ? 'görüntüleme' : 'ko\'rish';
    var studyWord  = currentLang==='ar' ? 'دراسة' : currentLang==='en' ? 'studies' : currentLang==='tr' ? 'araştırma' : 'tadqiqot';

    var statsHTML = statItems.map(function (s) {
      return '<div class="stat-card ' + s.sc + '">'
        + '<div class="stat-icon-wrap ' + s.si + '">' + s.icon + '</div>'
        + '<div>'
        + '<div class="stat-val" data-target="' + s.num + '" data-suffix="' + escAttr(s.suffix) + '">0' + s.suffix + '</div>'
        + '<div class="stat-lbl">' + esc(s.label) + '</div>'
        + '</div></div>';
    }).join('');

    var newsHTML = news.slice(0, 6).map(function (n) {
      var thumbStyle = n.image ? '' : 'background:linear-gradient(135deg,' + n.color + ',#019395)';
      var thumbContent = n.image
        ? '<img src="' + escAttr(n.image) + '" alt="" style="width:100%;height:100%;object-fit:cover" />'
        : '<span style="position:relative;z-index:1">' + n.icon + '</span>';
      return '<div class="news-card" data-action="open-news" data-id="' + n.id + '">'
        + '<div class="news-thumb" style="' + thumbStyle + '">' + thumbContent + '</div>'
        + '<div class="news-body">'
        + '<span class="news-chip">' + esc(L(n,'tag','tag_en','tag_ar','tag_tr')) + '</span>'
        + '<h3>' + esc(L(n,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<p style="font-size:12px;color:var(--text-3);line-height:1.5;margin:6px 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(L(n,'summary','summary_en','summary_ar','summary_tr')) + '</p>'
        + '<div class="news-meta"><span>' + _i(IC.calendar) + ' ' + esc(formatDate(n.date)) + '</span><span>• ' + esc(n.readTime || n.category) + '</span></div>'
        + '</div></div>';
    }).join('');

    var areasHTML = areas.map(function (a) {
      return '<div class="research-card" data-action="navigate" data-page="research">'
        + '<div class="rc-icon">' + a.icon + '</div>'
        + '<h3>' + esc(L(a,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<p>' + esc(L(a,'desc','desc_en','desc_ar','desc_tr')) + '</p>'
        + '<div style="margin-top:12px"><span class="chip chip-gold">' + a.count + ' ' + esc(studyWord) + '</span></div>'
        + '</div>';
    }).join('');

    var blogHTML = DATA.blogPosts.filter(function (b) { return b.featured; }).slice(0, 3).map(function (b) {
      return '<div class="card card-hover" style="cursor:pointer;overflow:hidden" data-action="open-blog" data-id="' + b.id + '">'
        + '<div style="height:6px;background:linear-gradient(135deg,' + b.color + ',var(--gold));border-radius:3px;margin-bottom:16px"></div>'
        + '<span class="chip chip-gold" style="margin-bottom:10px;display:inline-flex">' + esc(b.category) + '</span>'
        + '<h3 style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">' + esc(L(b,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<p style="font-size:12.5px;color:var(--text-3);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:12px">' + esc(L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')) + '</p>'
        + '<div style="display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--text-3)">'
        + '<span>' + _i(IC.pen) + ' ' + esc(b.author) + '</span><span>' + _i(IC.clock) + ' ' + esc(b.readTime) + '</span>'
        + '</div></div>';
    }).join('');

    var testimHTML = DATA.testimonials.slice(0, 3).map(function (q) {
      return '<div class="card card-hover" style="position:relative;overflow:hidden">'
        + '<div style="font-size:48px;color:rgba(228,183,58,0.15);position:absolute;top:8px;left:16px;font-family:serif;line-height:1">"</div>'
        + '<p style="font-size:13px;color:var(--text-2);line-height:1.8;padding:20px 8px 12px 8px;font-style:italic">' + esc(L(q,'quote','quote_en','quote_ar','quote_tr')) + '</p>'
        + '<div style="display:flex;align-items:center;gap:10px;padding:0 8px 4px">'
        + '<span style="font-size:20px">' + q.emoji + '</span>'
        + '<div><div style="font-size:12.5px;font-weight:700;color:var(--text-1)">' + esc(q.name) + '</div>'
        + '<div style="font-size:11px;color:var(--text-3)">' + esc(q.institution) + '</div></div>'
        + '</div></div>';
    }).join('');

    var evtsHTML = evts.slice(0, 6).map(function (e) {
      return '<div class="event-row" data-action="open-event" data-id="' + e.id + '">'
        + '<div class="event-date-box"><span class="eday">' + esc(e.day) + '</span><span class="emon">' + esc(L(e,'month','month_en','month_ar','month_tr')) + '</span></div>'
        + '<div class="event-info">'
        + '<h4>' + esc(L(e,'title','title_en','title_ar','title_tr')) + '</h4>'
        + '<p>' + _i(IC.mapPin) + ' ' + esc(e.location) + ' &nbsp; ' + _i(IC.clock) + ' ' + esc(e.time) + '</p>'
        + '<div style="display:flex;align-items:center;gap:8px;margin-top:5px">'
        + '<span class="event-tag ' + escAttr(e.type) + '">' + esc(e.type) + '</span>'
        + (e.capacity ? '<span style="font-size:10px;color:var(--text-3)">' + _i(IC.users) + ' ' + esc(String(e.registered)) + '/' + esc(String(e.capacity)) + '</span>' : '')
        + '</div></div></div>';
    }).join('');

    var vidsHTML = vids.slice(0, 5).map(function (v) {
      var thumbStyle = v.thumbnail ? 'position:relative' : '';
      var thumbContent = v.thumbnail
        ? '<img src="' + escAttr(v.thumbnail) + '" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:inherit" />'
        : '<span class="vt-emoji">' + v.emoji + '</span>';
      return '<div class="video-row" data-action="open-video" data-id="' + v.id + '">'
        + '<div class="vid-thumb" style="' + thumbStyle + '">'
        + thumbContent
        + '<div class="play-ring">▶</div>'
        + '<div class="vid-dur">' + esc(v.duration) + '</div>'
        + '</div>'
        + '<div class="vid-info">'
        + '<div class="vi-title">' + esc(L(v,'title','title_en','title_ar','title_tr')) + '</div>'
        + '<div class="vi-views">' + _i(IC.play) + ' ' + esc(String(v.views)) + ' ' + esc(viewsWord) + (v.speaker ? ' • ' + esc(v.speaker) : '') + '</div>'
        + '</div></div>';
    }).join('');

    return '<div class="page" id="page-home">'
      + '<div class="page-hero" style="padding:var(--sp-12) var(--sp-10)">'
      + '<div style="position:relative;z-index:1">'
      + '<div class="hero-eyebrow">Imam Bukhari International Institute</div>'
      + '<h1>' + esc(t.hero_title) + '</h1>'
      + '<p style="max-width:600px">' + esc(t.hero_sub) + '</p>'
      + '<div class="hero-actions" style="margin-top:var(--sp-6)">'
      + '<button class="btn btn-gold btn-lg" data-action="navigate" data-page="research">' + esc(t.hero_btn1) + '</button>'
      + '<button class="btn btn-outline btn-lg" data-action="navigate" data-page="academy">' + esc(t.hero_btn2) + '</button>'
      + '</div></div>'
      + '</div>'
      + '<div class="stats-row">' + statsHTML + '</div>'
      + sectionHead(t.section_news, seeAllNews, 'archive')
      + '<div class="g-3 mb-6 reveal">' + newsHTML + '</div>'
      + sectionHead(t.section_research, seeAllRes, 'research')
      + '<div class="g-3 mb-6 reveal">' + areasHTML + '</div>'
      + sectionHead(t.section_blog, t.see_all, 'blog')
      + '<div class="g-3 mb-6 reveal">' + blogHTML + '</div>'
      + sectionHead(t.section_testimonials)
      + '<div class="g-3 mb-6 reveal">' + testimHTML + '</div>'
      + '<div class="g-2">'
      + '<div>' + sectionHead(t.section_events, seeAllEvt, 'archive') + '<div style="display:flex;flex-direction:column;gap:10px">' + evtsHTML + '</div></div>'
      + '<div>' + sectionHead(t.section_videos, '', '') + '<div style="display:flex;flex-direction:column;gap:10px">' + vidsHTML + '</div></div>'
      + '</div>'
      + '</div>';
  }

  // ============================================
  // FOUNDATION PAGE
  // ============================================
  function renderFoundationPage() {
    var t = DATA.i18n[currentLang];
    var h = {
      uz: { about:'Institut haqida', sub:'Imom Buxoriy ilmiy tadqiqot markazi – Missiya, Vazifa va Qadriyatlar',
            mission:'Missiyamiz', vision:'Vazifamiz', values:'Asosiy qadriyatlar',
            history:'Tarixiy bosqichlar', team:'Tadqiqotchi jamoa' },
      en: { about:'About the Institute', sub:'Mission, Vision and Values',
            mission:'Our Mission', vision:'Our Vision', values:'Core Values',
            history:'Historical Journey', team:'Research Team' },
      ar: { about:'حول المعهد', sub:'الرسالة والرؤية والقيم',
            mission:'مهمتنا', vision:'رؤيتنا', values:'القيم الأساسية',
            history:'المسيرة التاريخية', team:'فريق البحث' },
      tr: { about:'Enstitü Hakkında', sub:'Misyon, Vizyon ve Değerler',
            mission:'Misyonumuz', vision:'Vizyonumuz', values:'Temel Değerler',
            history:'Tarihsel Süreç', team:'Araştırma Ekibi' },
    }[currentLang] || { about:'Institut haqida', sub:'', mission:'Missiyamiz', vision:'Vazifamiz', values:'Asosiy qadriyatlar', history:'Tarixiy bosqichlar', team:'Jamoa' };

    var missionText = currentLang==='ar'
      ? 'مؤسسة IDE مؤسسة بحثية مستقلة تهدف إلى البحث في الأسس المنهجية للعلوم الإسلامية وتفسير التراث الفكري للفكر الإسلامي في سياق معاصر وتنشئة جيل جديد من الباحثين.'
      : currentLang==='en'
      ? 'The IDE Foundation is an independent research institution established to research the methodological foundations of Islamic sciences, interpret the intellectual heritage of Islamic thought in a contemporary context, and train a new generation of researchers.'
      : currentLang==='tr'
      ? 'İmam Buhari Uluslararası Enstitüsü, İslam medeniyetinin entelektüel mirasını araştıran bağımsız bir araştırma kuruluşudur.'
      : 'Imom Buxoriy ilmiy tadqiqot markazi — islom ilmlarining metodologik asoslarini tadqiq qilish, islom tafakkuri intellektual merosini zamonaviy kontekstda sharhlash va yangi avlod tadqiqotchilarni tayyorlash maqsadida tashkil etilgan mustaqil ilmiy-tadqiqot muassasasidir.';

    var visionText = currentLang==='ar'
      ? 'إعادة إنتاج الرصيد المعرفي للحضارة الإسلامية وفق المعايير الأكاديمية العالمية؛ والسعي إلى أن نكون مركزاً يطور الفكر الإسلامي بالاستناد إلى جذوره التقليدية والتحاور مع النقاشات المعاصرة.'
      : currentLang==='en'
      ? 'To reproduce the knowledge base of Islamic civilization to universal academic standards; to be a center that develops Islamic thought by both drawing from its traditional roots and engaging in dialogue with contemporary discussions.'
      : currentLang==='tr'
      ? 'İslam düşüncesini evrensel düzeyde tartışılan, araştırılan ve anlaşılan bir alan haline getirmek.'
      : 'Islom tsivilizatsiyasining bilim boyligini universal akademik standartlarda qayta ishlab chiqarish; islom tafakkurini an\'anaviy ildizlaridan oziqlanib, zamonaviy munozaralar bilan dialog qurib rivojlantiruvchi markaz bo\'lish.';

    var coreValues = [
      { icon:IC.bookOpen, uz:['Ilmiy halollik','Har bir tadqiqotda akademik halollik va puxtalik'],
        en:['Academic Integrity','Academic honesty and rigor in every research'],
        ar:['النزاهة العلمية','الأمانة الأكاديمية والدقة في كل بحث'],
        tr:['Akademik Dürüstlük','Her araştırmada akademik dürüstlük ve titizlik'] },
      { icon:IC.handshake, uz:['Hamkorlik','Milliy va xalqaro olimlar bilan hamkorlik'],
        en:['Collaboration','Collaboration with national and international scholars'],
        ar:['التعاون','التعاون مع الأكاديميين الوطنيين والدوليين'],
        tr:['İşbirliği','Ulusal ve uluslararası akademisyenlerle işbirliği'] },
      { icon:IC.seedling, uz:['Yangilik','An\'anaviy bilimni zamonaviy usullar bilan uyg\'unlashtirish'],
        en:['Innovation','Bringing traditional knowledge together with modern methods'],
        ar:['الابتكار','الجمع بين المعرفة التقليدية والمناهج الحديثة'],
        tr:['Yenilik','Geleneksel bilgiyi modern yöntemlerle bir araya getirmek'] },
      { icon:IC.globe, uz:['Universallik','Butun insoniyatga qaratilgan keng qamrovli nuqtai nazar'],
        en:['Universality','A comprehensive perspective addressing all of humanity'],
        ar:['العالمية','منظور شامل يخاطب الإنسانية جمعاء'],
        tr:['Evrensellik','Tüm insanlığa hitap eden kapsamlı bir perspektif'] },
    ];

    var timeline = [
      { date:'2009', uz:['Tashkil etilishi','Imom Buxoriy ilmiy tadqiqot markazi tashkil topildi. Birinchi tadqiqot dasturlari boshlandi.'],
        en:['Foundation','Imam Bukhari International Institute established. First research programs launched.'],
        tr:['Kuruluş','Enstitü kuruldu. İlk araştırma programları başlatıldı.'] },
      { date:'2011', uz:['Akademiya','Tadqiqotchilarni tayyorlash dasturlari bilan Akademiya ishga tushirildi.'],
        en:['Academy','Academy launched with researcher training programs.'],
        tr:['Akademi','Akademi, araştırmacı yetiştirme programlarıyla başlatıldı.'] },
      { date:'2014', uz:['Xalqarolashtirish','Tashrif buyuruvchi olimlar dasturi bilan xalqaro hamkorliklar o\'rnatildi.'],
        en:['Internationalization','International partnerships established with the Visiting Scholar Program.'],
        tr:['Uluslararasılaşma','Misafir Akademisyen Programı ile uluslararası ortaklıklar kuruldu.'] },
      { date:'2017', uz:['Nashriyot seriyasi','Institut nashriyoti doirasida muntazam kitob va tadqiqot seriyalari boshlandi.'],
        en:['Publication Series','Systematic book and research series launched under Institute Publications.'],
        tr:['Yayın Serisi','Enstitü Yayınları çerçevesinde sistematik kitap ve araştırma serileri başlatıldı.'] },
      { date:'2020', uz:['Raqamli o\'zgarish','Onlayn ta\'lim platformasi va raqamli kutubxona ishga tushirildi.'],
        en:['Digital Transformation','Online education platform and digital library launched.'],
        tr:['Dijital Dönüşüm','Çevrimiçi eğitim platformu ve dijital kütüphane hayata geçirildi.'] },
      { date:'2024', uz:['O\'sish','Tadqiqot yo\'nalishlari kengaytirildi; 48 tadqiqotchi bilan faoliyat davom ettirilmoqda.'],
        en:['Growth','Research areas expanded; activities continue with 48 researchers.'],
        tr:['Büyüme','Araştırma alanları genişletildi; 48 araştırmacıyla faaliyetler devam ediyor.'] },
    ];

    var valuesHTML = coreValues.map(function (v) {
      var pair = currentLang==='en' ? v.en : currentLang==='ar' ? v.ar : currentLang==='tr' ? v.tr : v.uz;
      return '<div class="card card-hover" style="text-align:center">'
        + '<div style="margin-bottom:12px;color:var(--gold);display:flex;justify-content:center">' + _s(v.icon,32) + '</div>'
        + '<h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:8px">' + esc(pair[0]) + '</h4>'
        + '<p style="font-size:12px;color:var(--text-2);line-height:1.6">' + esc(pair[1]) + '</p>'
        + '</div>';
    }).join('');

    var tlHTML = timeline.map(function (item) {
      var pair = currentLang==='en' ? item.en : currentLang==='tr' ? (item.tr || item.uz) : item.uz;
      return '<div class="tl-item">'
        + '<div class="tl-date">' + esc(item.date) + '</div>'
        + '<div class="tl-title">' + esc(pair[0]) + '</div>'
        + '<div class="tl-desc">' + esc(pair[1]) + '</div>'
        + '</div>';
    }).join('');

    var teamHTML = DATA.team.map(function (m) {
      var avatarStyle = m.avatar ? 'padding:0;overflow:hidden' : (m.avatarColor ? 'background:linear-gradient(135deg,' + m.avatarColor + ',var(--navy-500))' : '');
      var avatarContent = m.avatar
        ? '<img src="' + escAttr(m.avatar) + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" />'
        : esc(m.initials);
      var bioLine = m.bio
        ? '<p style="font-size:11px;color:var(--text-3);line-height:1.5;margin-top:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(L(m,'bio','bio_en','bio_ar','bio_tr')) + '</p>'
        : '';
      return '<div class="team-card" data-action="open-team" data-id="' + escAttr(String(m.id)) + '">'
        + '<div class="team-avatar" style="' + avatarStyle + '">' + avatarContent + '</div>'
        + '<h4>' + esc(m.name) + '</h4>'
        + '<div class="team-role">' + esc(L(m,'role','role_en','role_ar','role_tr')) + '</div>'
        + '<div class="team-dept">' + esc(L(m,'dept','dept_en','dept_ar','dept_tr')) + '</div>'
        + bioLine
        + '</div>';
    }).join('');

    return '<div class="page" id="page-foundation">'
      + '<div class="page-hero"><h1>' + esc(h.about) + '</h1><p>' + esc(h.sub) + '</p></div>'
      + '<div class="g-2 mb-6">'
      + '<div class="card card-hover"><div style="margin-bottom:16px;color:var(--gold)">' + _s(IC.mosque,36) + '</div>'
      + '<h3 style="font-size:17px;font-weight:700;color:var(--gold);margin-bottom:12px">' + esc(h.mission) + '</h3>'
      + '<p style="font-size:13.5px;color:var(--text-2);line-height:1.8">' + esc(missionText) + '</p></div>'
      + '<div class="card card-hover"><div style="margin-bottom:16px;color:var(--gold)">' + _s(IC.star,36) + '</div>'
      + '<h3 style="font-size:17px;font-weight:700;color:var(--gold);margin-bottom:12px">' + esc(h.vision) + '</h3>'
      + '<p style="font-size:13.5px;color:var(--text-2);line-height:1.8">' + esc(visionText) + '</p></div>'
      + '</div>'
      + sectionHead(h.values)
      + '<div class="g-4 mb-6">' + valuesHTML + '</div>'
      + sectionHead(h.history)
      + '<div class="card mb-6"><div class="timeline">' + tlHTML + '</div></div>'
      + sectionHead(h.team)
      + '<div class="g-4">' + teamHTML + '</div>'
      + '</div>';
  }

  // ============================================
  // CORPORATE PAGE
  // ============================================
  function renderCorporatePage() {
    var isEn = currentLang === 'en';
    var boards = [
      { icon:IC.crown,
        uz:['Vasiylar kengashi','7 a\'zo','Institutning oliy qaror qabul qilish organi. Strategik yo\'nalishni belgilaydi va muhim qarorlarni tasdiqlaydi.'],
        en:['Board of Trustees','7 Members','The highest decision-making body of the foundation. Determines strategic direction and approves major decisions.'] },
      { icon:IC.building,
        uz:['Oliy maslahat kengashi','15 a\'zo','Milliy va xalqaro taniqli olimlardan tashkil topgan maslahat organi.'],
        en:['High Consultative Council','15 Members','An advisory body composed of nationally and internationally recognized scholars.'] },
      { icon:IC.grad,
        uz:['Akademik kengash','12 a\'zo','Tadqiqot dasturlarini va akademik faoliyatlarni muvofiqlashtiradi.'],
        en:['Academic Board','12 Members','Coordinates research programs and academic activities.'] },
    ];

    var orgMid   = isEn ? ['General Director','Research Director','Academy President'] : ['Bosh direktor','Tadqiqot direktori','Akademiya raisi'];
    var orgLeafs = isEn
      ? ['Research Units','Publication Unit','Academy Programs','International Relations','Administrative Affairs']
      : ['Tadqiqot bo\'limlari','Nashriyot bo\'limi','Akademiya dasturlari','Xalqaro aloqalar','Ma\'muriy ishlar'];

    var boardsHTML = boards.map(function (b) {
      var arr = isEn ? b.en : b.uz;
      return '<div class="card card-hover">'
        + '<div style="font-size:32px;margin-bottom:14px">' + _s(b.icon, 32) + '</div>'
        + '<h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:8px">' + esc(arr[0]) + '</h3>'
        + '<span class="chip chip-gold" style="margin-bottom:12px;display:inline-flex">' + esc(arr[1]) + '</span>'
        + '<p style="font-size:13px;color:var(--text-2);line-height:1.7">' + esc(arr[2]) + '</p>'
        + '</div>';
    }).join('');

    var orgMidHTML = orgMid.map(function (txt) {
      return '<div style="display:flex;flex-direction:column;align-items:center">'
        + '<div class="org-line" style="height:24px"></div>'
        + '<div class="org-mid">' + esc(txt) + '</div>'
        + '</div>';
    }).join('');

    var orgLeafsHTML = orgLeafs.map(function (txt) {
      return '<div class="org-leaf">' + esc(txt) + '</div>';
    }).join('');

    var reportsHTML = [2024, 2023, 2022, 2021, 2020].map(function (year) {
      var msgAttr = escAttr(year + ' ' + (isEn ? 'report downloading' : 'hisobot yuklab olinmoqda') + '...');
      return '<div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px">'
        + '<div style="display:flex;align-items:center;gap:14px">'
        + '<span style="display:flex;color:var(--gold)">' + _s(IC.barChart,24) + '</span>'
        + '<div>'
        + '<div style="font-size:14px;font-weight:600;color:var(--text-1)">' + esc(isEn ? 'Annual Report' : 'Yillik hisobot') + ' ' + year + '</div>'
        + '<div style="font-size:12px;color:var(--text-3)">' + esc(isEn ? 'Summary of research, academy and institutional activities' : 'Tadqiqot, akademiya va muassasa faoliyati xulosasi') + '</div>'
        + '</div></div>'
        + '<button class="btn btn-gold btn-sm" data-action="download-report" data-msg="' + msgAttr + '">'
        + _i(IC.download) + ' ' + esc(isEn ? 'Download' : 'Yuklab olish')
        + '</button></div>';
    }).join('');

    return '<div class="page" id="page-corporate">'
      + '<div class="page-hero">'
      + '<h1>' + esc(isEn ? 'Institutional Structure' : 'Tashkiliy tuzilma') + '</h1>'
      + '<p>' + esc(isEn ? 'Management and organizational structure of the Institute' : 'Institut boshqaruv va tashkiliy tuzilmasi') + '</p>'
      + '</div>'
      + '<div class="g-3 mb-6">' + boardsHTML + '</div>'
      + sectionHead(isEn ? 'Organizational Chart' : 'Tashkiliy sxema')
      + '<div class="card mb-6" style="text-align:center;padding:40px 24px">'
      + '<div class="org-box">' + esc(isEn ? 'Board of Trustees' : 'Vasiylar kengashi') + '</div>'
      + '<div class="org-line" style="height:28px;margin:0 auto"></div>'
      + '<div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">' + orgMidHTML + '</div>'
      + '<div class="org-line" style="height:28px;margin:0 auto"></div>'
      + '<div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap">' + orgLeafsHTML + '</div>'
      + '</div>'
      + sectionHead(isEn ? 'Annual Reports' : 'Yillik hisobotlar')
      + '<div style="display:flex;flex-direction:column;gap:10px">' + reportsHTML + '</div>'
      + '</div>';
  }

  // ============================================
  // RESEARCH PAGE
  // ============================================
  function renderResearchPage() {
    var areas = DATA.researchAreas;
    var isEn  = currentLang === 'en';
    var isAr  = currentLang === 'ar';
    var lbl   = isAr ? 'مجالات البحث' : isEn ? 'Research Areas' : 'Tadqiqot yo\'nalishlari';
    var sub   = isAr ? 'موضوعات ومشاريع البحث الأساسية للمعهد' : isEn ? 'Institute\'s core research topics and projects' : 'Institutning asosiy tadqiqot mavzulari va loyihalari';

    var projects = [
      { uz:'Klassik islom matnlarining raqamli arxivi',      en:'Digital Archive of Classical Islamic Texts',      status:'Davom etmoqda', sc:'chip-gold',  prog:68, team:5 },
      { uz:'Usul al-fiqh va zamonaviy huquq: Tahlil',        en:'Usul al-Fiqh and Contemporary Law: Analysis',     status:'Davom etmoqda', sc:'chip-gold',  prog:45, team:3 },
      { uz:'Islom dunyosida atrof-muhit axloqi',             en:'Environmental Ethics in the Islamic World',       status:'Yangi boshlangan', sc:'chip-blue', prog:15, team:4 },
      { uz:'O\'rta asr islom falsafasida siyosat nazariyasi', en:'Political Theory in Medieval Islamic Philosophy', status:'Yakunlangan',   sc:'chip-green', prog:100, team:2 },
    ];

    var studyWord = isAr ? 'دراسة' : isEn ? 'studies' : 'tadqiqot';

    var areasHTML = areas.map(function (a) {
      var w = Math.min(100, a.count * 1.8);
      return '<div class="card card-hover" style="cursor:pointer" data-action="open-research" data-id="' + a.id + '">'
        + '<div style="display:flex;align-items:flex-start;gap:16px">'
        + '<div style="width:52px;height:52px;background:rgba(228,183,58,0.1);border:1px solid rgba(228,183,58,.18);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">' + a.icon + '</div>'
        + '<div style="flex:1">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;gap:8px">'
        + '<h3 style="font-size:15px;font-weight:700;color:var(--text-1)">' + esc(L(a,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<span class="chip chip-gold">' + a.count + '</span>'
        + '</div>'
        + '<p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:12px">' + esc(L(a,'desc','desc_en','desc_ar','desc_tr')) + '</p>'
        + '<div class="progress"><div class="progress-bar" style="width:0%" data-width="' + w + '"></div></div>'
        + '<div style="font-size:11px;color:var(--text-3);margin-top:5px">' + a.count + ' ' + esc(studyWord) + '</div>'
        + '</div></div></div>';
    }).join('');

    var projHTML = projects.map(function (p) {
      return '<div class="card" style="padding:18px 22px">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:12px">'
        + '<h4 style="font-size:14px;font-weight:600;color:var(--text-1)">' + esc(isEn ? p.en : p.uz) + '</h4>'
        + '<span class="chip ' + escAttr(p.sc) + '" style="flex-shrink:0">' + esc(p.status) + '</span>'
        + '</div>'
        + '<div style="display:flex;align-items:center;gap:12px">'
        + '<div class="progress" style="flex:1"><div class="progress-bar" style="width:0%" data-width="' + p.prog + '"></div></div>'
        + '<span style="font-size:12px;color:var(--text-3);min-width:36px">' + p.prog + '%</span>'
        + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.users) + ' ' + p.team + '</span>'
        + '</div></div>';
    }).join('');

    return '<div class="page" id="page-research">'
      + '<div class="page-hero"><h1>' + esc(lbl) + '</h1><p>' + esc(sub) + '</p></div>'
      + '<div class="g-2 mb-6">' + areasHTML + '</div>'
      + sectionHead(isAr ? 'المشاريع النشطة' : isEn ? 'Active Projects' : 'Faol loyihalar')
      + '<div style="display:flex;flex-direction:column;gap:10px">' + projHTML + '</div>'
      + '</div>';
  }

  // ============================================
  // ACADEMY PAGE
  // ============================================
  function renderAcademyPage() {
    var programs = DATA.programs;
    var isEn = currentLang === 'en';
    var isAr = currentLang === 'ar';

    var scheduleItems = [
      { month:'Yanvar / January 2025',  items:['Asosiy islom ilmlari – 3-semestr | Foundations – Term 3','Onlayn Maqosid darslari – 1-sessiya | Maqasid Lessons – Session 1'] },
      { month:'Fevral / February 2025', items:['Dissertatsiya ustaxonasi | Thesis Workshop','Usul ilg\'or daraja – Oraliq baholash | Advanced Usul – Mid-Term'] },
      { month:'Mart / March 2025',      items:['Klassik matn o\'qish – Yangi semestr | Classical Text – New Term','Xalqaro simpozium | International Symposium'] },
      { month:'Aprel / April 2025',     items:['Akademiya bitirish marosimi | Academy Graduation','Yozgi semestr arizalari | Summer Term Applications'] },
    ];

    var requirements = isEn
      ? ['BA in Theology, Philosophy or related field','Basic Arabic knowledge (for some programs)','Motivation letter','Transcript and CV']
      : ['Ilohiyot, Falsafa yoki tegishli sohada bakalavr','Asosiy arab tili bilimi (ba\'zi dasturlar uchun)','Motivatsion xat','Transkript va CV'];

    var studWord = isEn ? 'students' : isAr ? 'طالب' : 'talaba';

    var progHTML = programs.map(function (p) {
      var statusLabel = p.status === 'active'
        ? (isEn ? 'Active' : isAr ? 'نشط' : 'Faol')
        : (isEn ? 'Upcoming' : isAr ? 'قريباً' : 'Tez kunda');
      var statusChip = p.status === 'active' ? 'chip-green' : 'chip-blue';
      var pw = Math.min(100, p.students * 1.5);
      var applyLabel = isEn ? 'Apply' : isAr ? 'تقدم' : 'Ariza berish';
      return '<div class="card card-hover" style="cursor:pointer" data-action="open-program" data-id="' + p.id + '">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">'
        + '<span style="font-size:32px">' + p.icon + '</span>'
        + '<span class="chip ' + statusChip + '">' + esc(statusLabel) + '</span>'
        + '</div>'
        + '<h3 style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:10px;line-height:1.4">' + esc(L(p,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px">'
        + '<div style="font-size:12px;color:var(--text-3)">' + _i(IC.clock) + ' ' + esc(p.duration) + ' &nbsp;|&nbsp; ' + _i(IC.barChart) + ' ' + esc(p.level) + '</div>'
        + '<div style="font-size:12px;color:var(--text-3)">' + _i(IC.globe) + ' ' + esc(p.lang) + '</div>'
        + '<div style="font-size:12px;color:var(--text-3)">' + _i(IC.users) + ' ' + p.students + ' ' + esc(studWord) + '</div>'
        + '</div>'
        + '<div class="progress"><div class="progress-bar" style="width:0%" data-width="' + pw + '"></div></div>'
        + '<button class="btn btn-gold w-full" style="margin-top:14px;font-size:12px" data-action="apply-program" data-id="' + p.id + '">' + esc(applyLabel) + '</button>'
        + '</div>';
    }).join('');

    var schedHTML = scheduleItems.map(function (m) {
      var itemsHTML = m.items.map(function (i) {
        return '<div style="font-size:12.5px;color:var(--text-2);margin-bottom:6px;padding-left:12px;border-left:2px solid var(--gold)">• ' + esc(i) + '</div>';
      }).join('');
      return '<div style="padding:16px;background:var(--surface-2);border-radius:10px;border:1px solid var(--border-1)">'
        + '<div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:10px">' + _i(IC.pin) + ' ' + esc(m.month) + '</div>'
        + itemsHTML + '</div>';
    }).join('');

    var reqHTML = requirements.map(function (c) {
      return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:9px;font-size:12.5px;color:var(--text-2)">'
        + '<span style="color:var(--gold);flex-shrink:0;font-weight:700">✓</span> ' + esc(c) + '</div>';
    }).join('');

    var progOpts = DATA.programs.map(function (p) {
      return '<option value="' + escAttr(String(p.id)) + '">' + esc(L(p,'title','title_en','title_ar','title_tr')) + '</option>';
    }).join('');

    var bgOpts = (isEn
      ? ['Undergraduate Student','Bachelor Graduate','Master\'s Student','Master\'s Graduate','PhD Student','Dr. / Academic']
      : ['Bakalavr talabasi','Bakalavr bitiruvchisi','Magistratura talabasi','Magistr','Doktorant','PhD / Olim']
    ).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');

    var faqHTML = DATA.faq.map(function (f, i) {
      return '<div class="acc-item" id="acc-' + i + '">'
        + '<div class="acc-header" data-action="toggle-accordion" data-target="acc-' + i + '">'
        + '<span>' + esc(L(f,'q','q_en','q_ar','q_tr')) + '</span>'
        + '<span class="acc-arrow">▾</span>'
        + '</div>'
        + '<div class="acc-body">' + esc(L(f,'a','a_en','a_ar','a_tr')) + '</div>'
        + '</div>';
    }).join('');

    return '<div class="page" id="page-academy">'
      + '<div class="page-hero">'
      + '<h1>' + esc(isAr ? 'أكاديمية المعهد' : isEn ? 'Academy' : 'Akademiya') + '</h1>'
      + '<p>' + esc(isEn ? 'Researcher training programs and courses' : isAr ? 'برامج تدريب الباحثين والدورات' : 'Tadqiqotchilarni tayyorlash dasturlari va kurslar') + '</p>'
      + '</div>'
      + '<div class="tabs-wrap" id="academy-tabs">'
      + '<button class="tab-btn active" data-action="switch-tab" data-group="academy" data-tab="programs">' + _i(IC.book) + ' ' + esc(isEn ? 'Programs' : isAr ? 'البرامج' : 'Dasturlar') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="academy" data-tab="schedule">' + _i(IC.calendar) + ' ' + esc(isEn ? 'Schedule' : isAr ? 'الجدول' : 'Taqvim') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="academy" data-tab="apply">' + _i(IC.pen) + ' ' + esc(isEn ? 'Apply' : isAr ? 'التقديم' : 'Ariza') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="academy" data-tab="faq">' + _i(IC.question) + ' ' + esc(isEn ? 'FAQ' : isAr ? 'الأسئلة' : 'TSS') + '</button>'
      + '</div>'
      + '<div class="tab-content active" id="academy-programs"><div class="g-3">' + progHTML + '</div></div>'
      + '<div class="tab-content" id="academy-schedule"><div class="card">'
      + '<h3 style="font-size:16px;font-weight:700;margin-bottom:20px;color:var(--gold)">' + _i(IC.calendar) + ' 2025 ' + esc(isEn ? 'Education Calendar' : 'Ta\'lim taqvimi') + '</h3>'
      + '<div style="display:flex;flex-direction:column;gap:12px">' + schedHTML + '</div>'
      + '</div></div>'
      + '<div class="tab-content" id="academy-apply"><div class="g-2">'
      + '<div class="card">'
      + '<h3 style="font-size:16px;font-weight:700;color:var(--gold);margin-bottom:20px">' + _i(IC.pen) + ' ' + esc(isEn ? 'Application Form' : isAr ? 'نموذج التقديم' : 'Ariza shakli') + '</h3>'
      + '<form data-form="application">'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Full Name' : isAr ? 'الاسم الكامل' : 'Ism Familiya') + '</label>'
      + '<input class="form-input" type="text" placeholder="' + escAttr(isEn ? 'Your full name' : 'Ismingiz va familiyangiz') + '" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Email' : isAr ? 'البريد الإلكتروني' : 'Elektron pochta') + '</label>'
      + '<input class="form-input" type="email" placeholder="ornek@email.com" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Program' : 'Tanlangan dastur') + '</label>'
      + '<select class="form-select">' + progOpts + '</select></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Academic Background' : 'Akademik tajriba') + '</label>'
      + '<select class="form-select">' + bgOpts + '</select></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Motivation Letter' : 'Motivatsion xat') + '</label>'
      + '<textarea class="form-textarea" placeholder="' + escAttr(isEn ? 'Why are you applying to this program?' : 'Nega bu dasturga ariza beryapsiz?') + '"></textarea></div>'
      + '<button type="submit" class="btn btn-gold w-full">' + esc(isEn ? 'Submit Application' : isAr ? 'إرسال الطلب' : 'Arizani yuborish') + '</button>'
      + '</form></div>'
      + '<div>'
      + '<div class="card mb-4"><h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:14px">' + _i(IC.clipboard) + ' ' + esc(isEn ? 'Requirements' : 'Ariza shartlari') + '</h4>'
      + reqHTML + '</div>'
      + '<div class="card"><h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:12px">' + _i(IC.phone) + ' ' + esc(isEn ? 'Support' : 'Ariza yordami') + '</h4>'
      + '<p style="font-size:12.5px;color:var(--text-2);line-height:1.7">' + esc(isEn ? 'For questions about the application process, please contact the academy unit.' : 'Ariza jarayoni bo\'yicha savollaringiz uchun akademiya bo\'limiga murojaat qiling.') + '</p>'
      + '<div style="margin-top:12px;font-size:13px;color:var(--text-1)">' + _i(IC.mail) + ' academy@imambukhari.uz</div>'
      + '<div style="font-size:13px;color:var(--text-1);margin-top:5px">' + _i(IC.phone) + ' +998 XX XXX XX XX</div>'
      + '</div></div>'
      + '</div></div>'
      + '<div class="tab-content" id="academy-faq"><div style="max-width:720px">' + faqHTML + '</div></div>'
      + '</div>';
  }

  // ============================================
  // INTERNATIONAL PAGE
  // ============================================
  function renderInternationalPage() {
    var isEn = currentLang === 'en';

    var programs = [
      { icon:_s(IC.globe,32),
        uz:['Mehmon olim','Xalqaro tadqiqotchilar uchun IBXI tarkibida ishlash imkoniyati. Muddatli arizalar qabul qilinadi.','Ochiq'],
        en:['Visiting Scholar','Opportunity for international researchers to work within IDE. Periodic applications are accepted.','Open'] },
      { icon:_s(IC.handshake,32),
        uz:['Qo\'shma tadqiqot','Xorijiy universitet va institutlar bilan qo\'shma tadqiqot loyihalari va nashrlar.','Faol'],
        en:['Joint Research','Joint research projects and publications with universities and institutes abroad.','Active'] },
      { icon:_s(IC.grad,32),
        uz:['Grant dasturi','Xalqaro talaba va tadqiqotchilar uchun grant imkoniyatlari va qo\'llab-quvvatlash dasturlari.','2025'],
        en:['Scholarship Program','Scholarship opportunities and support programs for international students and researchers.','2025'] },
      { icon:_s(IC.satellite,32),
        uz:['Xalqaro konferensiyalar','Yilda ikki marta o\'tkaziladigan xalqaro akademik konferensiyalar.','Yillik'],
        en:['International Conferences','International academic conferences held twice a year.','Annual'] },
    ];

    var partners = [
      { name:'IRCICA',       country:'Istanbul, Turkiya',          emoji:'🇹🇷' },
      { name:'ISESCO',       country:'Rabat, Marokash',            emoji:'🇲🇦' },
      { name:'IIIT',         country:'Virginia, AQSh',             emoji:'🇺🇸' },
      { name:'Al-Azhar',     country:'Qohira, Misr',               emoji:'🇪🇬' },
      { name:'ISTAC',        country:'Kuala Lumpur',                emoji:'🇲🇾' },
      { name:'Umm al-Qura',  country:'Makka, Saudiya Arabistoni',  emoji:'🇸🇦' },
      { name:'Jordan Univ.', country:'Amman, Iordaniya',           emoji:'🇯🇴' },
      { name:'SOAS',         country:'London, Buyuk Britaniya',    emoji:'🇬🇧' },
    ];

    var programDetails = [
      [_s(IC.calendar,20), isEn?'Duration':'Muddat',    isEn?'1–6 months':'1-6 oy'],
      [_s(IC.office,20), isEn?'Workspace':'Ish joyi', isEn?'Private office':'Shaxsiy ofis imkoniyati'],
      [_s(IC.bookOpen,20), isEn?'Library':'Kutubxona',  isEn?'Full access':'To\'liq foydalanish'],
      [_s(IC.handshake,20), isEn?'Mentoring':'Mentorlik',isEn?'Senior researcher support':'Tajribali tadqiqotchi yordami'],
      [_s(IC.plane,20), isEn?'Housing':'Turar joy',  isEn?'Recommendation list':'Tavsiya ro\'yxati beriladi'],
      [_s(IC.dollar,20), isEn?'Grant':'Grant',         isEn?'For selected applicants':'Tanlangan arizachilar uchun'],
    ];

    var progMsg = escAttr(isEn ? 'Application form opening...' : 'Ariza shakli ochilmoqda...');
    var progsHTML = programs.map(function (p) {
      var arr = isEn ? p.en : p.uz;
      return '<div class="card card-hover">'
        + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
        + '<span style="font-size:32px">' + p.icon + '</span>'
        + '<div><h3 style="font-size:15px;font-weight:700;color:var(--text-1)">' + esc(arr[0]) + '</h3>'
        + '<span class="chip chip-gold" style="margin-top:5px;display:inline-flex">' + esc(arr[2]) + '</span></div>'
        + '</div>'
        + '<p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:14px">' + esc(arr[1]) + '</p>'
        + '<button class="btn btn-gold btn-sm" data-action="toast" data-msg="' + progMsg + '" data-type="info" data-icon="">'
        + esc(isEn ? 'Details' : 'Batafsil') + '</button>'
        + '</div>';
    }).join('');

    var partnersHTML = partners.map(function (i) {
      var tipMsg = escAttr(i.name + ' – ' + i.country);
      return '<div class="card card-hover" style="text-align:center;padding:18px;cursor:pointer"'
        + ' data-action="toast" data-msg="' + tipMsg + '" data-type="info" data-icon="' + escAttr(i.emoji) + '">'
        + '<div style="font-size:28px;margin-bottom:8px">' + i.emoji + '</div>'
        + '<div style="font-size:14px;font-weight:600;color:var(--text-1)">' + esc(i.name) + '</div>'
        + '<div style="font-size:11.5px;color:var(--text-3);margin-top:3px">' + esc(i.country) + '</div>'
        + '</div>';
    }).join('');

    var detailsHTML = programDetails.map(function (d) {
      return '<div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border-1)">'
        + '<span style="font-size:18px">' + d[0] + '</span>'
        + '<div><div style="font-size:11.5px;color:var(--text-3);font-weight:600">' + esc(d[1]) + '</div>'
        + '<div style="font-size:13px;font-weight:600;color:var(--text-1)">' + esc(d[2]) + '</div></div>'
        + '</div>';
    }).join('');

    return '<div class="page" id="page-international">'
      + '<div class="page-hero">'
      + '<h1>' + esc(isEn ? 'International Programs' : 'Xalqaro dasturlar') + '</h1>'
      + '<p>' + esc(isEn ? 'Global research cooperation, visiting scholar and scholarship programs' : 'Global tadqiqot hamkorliklari, mehmon olim va grant dasturlari') + '</p>'
      + '</div>'
      + '<div class="g-2 mb-6">' + progsHTML + '</div>'
      + sectionHead(isEn ? 'Partner Institutions' : 'Hamkor tashkilotlar')
      + '<div class="g-4 mb-6">' + partnersHTML + '</div>'
      + sectionHead(isEn ? 'Visiting Scholar Application' : 'Mehmon olim arizasi')
      + '<div class="g-2">'
      + '<div class="card"><form data-form="visiting">'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Full Name' : 'To\'liq ism') + '</label>'
      + '<input class="form-input" type="text" placeholder="' + escAttr(isEn ? 'Your full name' : 'To\'liq ismingiz') + '" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Institution' : 'Muassasa') + '</label>'
      + '<input class="form-input" type="text" placeholder="' + escAttr(isEn ? 'Your institution' : 'Muassasangiz') + '" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Country' : 'Davlat') + '</label>'
      + '<input class="form-input" type="text" placeholder="' + escAttr(isEn ? 'Your country' : 'Davlatingiz') + '" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Duration' : 'Muddat') + '</label>'
      + '<select class="form-select"><option>1 ' + esc(isEn ? 'month' : 'oy') + '</option><option>2 ' + esc(isEn ? 'months' : 'oy') + '</option><option>3 ' + esc(isEn ? 'months' : 'oy') + '</option><option>6 ' + esc(isEn ? 'months' : 'oy') + '</option></select></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Research Topic' : 'Tadqiqot mavzusi') + '</label>'
      + '<textarea class="form-textarea" placeholder="' + escAttr(isEn ? 'Describe your research project...' : 'Tadqiqot loyihangizni tasvirlab bering...') + '" required></textarea></div>'
      + '<button type="submit" class="btn btn-gold w-full">' + esc(isEn ? 'Submit' : 'Yuborish') + '</button>'
      + '</form></div>'
      + '<div class="card"><h4 style="font-size:15px;font-weight:700;color:var(--gold);margin-bottom:16px">' + esc(isEn ? 'Program Details' : 'Dastur tafsilotlari') + '</h4>'
      + detailsHTML + '</div>'
      + '</div></div>';
  }

  // ============================================
  // PUBLICATIONS PAGE
  // ============================================
  function renderPublicationsPage() {
    var pubs  = DATA.publications;
    var isEn  = currentLang === 'en';

    var journals = [
      { name:'Islom tadqiqotlari jurnali', issues:28, freq: isEn?'Twice a Year':'Yilda 2 marta', icon:_s(IC.newspaper,24) },
      { name:'Akademiya byulleteni',        issues:15, freq: isEn?'3 Times a Year':'Yilda 3 marta', icon:_s(IC.clipboard,24) },
      { name:'Usul: Islom tadqiqotlari',    issues:42, freq: isEn?'Twice a Year':'Yilda 2 marta', icon:_s(IC.bookOpen,24) },
    ];

    var saveMsg   = escAttr(isEn ? 'Added to reading list' : 'O\'qish ro\'yxatiga qo\'shildi');
    var jrnlsHTML = journals.map(function (j) {
      var viewMsg = escAttr(j.name + ' ' + (isEn ? 'opening' : 'ochilmoqda') + '...');
      return '<div class="card card-hover">'
        + '<div style="display:flex;gap:14px;align-items:flex-start">'
        + '<span style="font-size:36px;flex-shrink:0">' + j.icon + '</span>'
        + '<div><h4 style="font-size:14px;font-weight:700;color:var(--text-1)">' + esc(j.name) + '</h4>'
        + '<div style="font-size:12px;color:var(--text-3);margin-top:3px">' + j.issues + ' ' + esc(isEn ? 'Issues' : 'Son') + ' • ' + esc(j.freq) + '</div>'
        + '<div style="display:flex;gap:8px;margin-top:12px">'
        + '<button class="btn btn-gold btn-sm" data-action="toast" data-msg="' + viewMsg + '" data-type="info" data-icon="' + escAttr(j.icon) + '">' + esc(isEn ? 'View' : 'Ko\'rish') + '</button>'
        + '<button class="btn btn-ghost btn-sm" data-action="toast" data-msg="' + saveMsg + '" data-type="success" data-icon="">' + _i(IC.bookmark) + ' ' + esc(isEn ? 'Save' : 'Saqlash') + '</button>'
        + '</div></div></div></div>';
    }).join('');

    return '<div class="page" id="page-publications">'
      + '<div class="page-hero">'
      + '<h1>' + esc(currentLang==='ar' ? 'المنشورات' : isEn ? 'Publications' : currentLang==='tr' ? 'Yayınlar' : 'Nashrlar') + '</h1>'
      + '<p>' + esc(isEn ? '200+ academic books, articles and journals' : '200+ akademik kitob, maqola va jurnal') + '</p>'
      + '</div>'
      + '<div class="tabs-wrap" id="pub-tabs">'
      + '<button class="tab-btn active" data-action="switch-tab" data-group="pub" data-tab="all">' + _i(IC.book) + ' ' + esc(isEn ? 'All' : 'Barchasi') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="pub" data-tab="books">' + _i(IC.bookOpen) + ' ' + esc(isEn ? 'Books' : 'Kitoblar') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="pub" data-tab="articles">' + _i(IC.file) + ' ' + esc(isEn ? 'Articles' : 'Maqolalar') + '</button>'
      + '<button class="tab-btn" data-action="switch-tab" data-group="pub" data-tab="journals">' + _i(IC.newspaper) + ' ' + esc(isEn ? 'Journals' : 'Jurnallar') + '</button>'
      + '</div>'
      + '<div class="tab-content active" id="pub-all">' + renderPubList(pubs) + '</div>'
      + '<div class="tab-content" id="pub-books">' + renderPubList(pubs.filter(function (p) { return p.type === 'Kitob'; })) + '</div>'
      + '<div class="tab-content" id="pub-articles">' + renderPubList(pubs.filter(function (p) { return p.type !== 'Kitob'; })) + '</div>'
      + '<div class="tab-content" id="pub-journals"><div class="g-2">' + jrnlsHTML + '</div></div>'
      + '</div>';
  }

  function renderPubList(pubs) {
    var isEn    = currentLang === 'en';
    var dlMsg   = escAttr(isEn ? 'Downloading PDF...' : 'PDF yuklab olinmoqda...');
    var pageWord = isEn ? 'pages' : 'sahifa';
    var savedWord = isEn ? 'Saved' : 'Saqlangan';
    var saveWord  = isEn ? 'Save'  : 'Saqlash';

    if (!pubs.length) {
      return '<div class="card" style="text-align:center;padding:40px;color:var(--text-3)">' + esc(isEn ? 'No publications found.' : 'Nashr topilmadi.') + '</div>';
    }
    return '<div style="display:flex;flex-direction:column;gap:12px">'
      + pubs.map(function (p) {
          var title = isEn ? p.title_en : p.title;
          var saved = readingList.indexOf(p.id) !== -1;
          var spineStyle = p.coverImage ? 'padding:0;overflow:hidden' : 'background:linear-gradient(135deg,' + p.color + ',#019395)';
          var spineContent = p.coverImage
            ? '<img src="' + escAttr(p.coverImage) + '" alt="" style="width:100%;height:100%;object-fit:cover" />'
            : '<span>' + esc(p.abbr) + '</span>';
          return '<div class="pub-row" data-action="open-pub" data-id="' + p.id + '">'
            + '<div class="pub-spine" style="' + spineStyle + '">' + spineContent + '</div>'
            + '<div class="pub-info">'
            + '<h4>' + esc(title) + '</h4>'
            + '<div class="pub-author">' + _i(IC.pen) + ' ' + esc(p.author) + '</div>'
            + '<p class="pub-desc">' + esc(p.desc) + '</p>'
            + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
            + '<span class="chip chip-gold">' + esc(p.type) + '</span>'
            + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(String(p.year)) + '</span>'
            + (p.pages ? '<span style="font-size:11px;color:var(--text-3)">' + _i(IC.file) + ' ' + p.pages + ' ' + esc(pageWord) + '</span>' : '')
            + (saved ? '<span class="chip chip-green">' + _i(IC.bookmark) + ' ' + esc(savedWord) + '</span>' : '')
            + '</div></div>'
            + '<div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;justify-content:center;flex-shrink:0">'
            + '<button class="btn btn-gold btn-sm" data-action="toast" data-msg="' + dlMsg + '" data-type="info" data-icon="">' + _i(IC.download) + ' PDF</button>'
            + '<button class="btn btn-ghost btn-sm" data-action="save-reading" data-id="' + p.id + '">' + _i(IC.bookmark) + ' ' + esc(saved ? savedWord : saveWord) + '</button>'
            + '</div></div>';
        }).join('')
      + '</div>';
  }

  // ============================================
  // BLOG PAGE
  // ============================================
  function renderBlogPage() {
    var t    = DATA.i18n[currentLang];
    var isEn = currentLang === 'en';
    var isAr = currentLang === 'ar';
    var posts = DATA.blogPosts;
    var categories = [];
    posts.forEach(function (b) {
      if (categories.indexOf(b.category) === -1) categories.push(b.category);
    });

    var catsHTML = categories.map(function (c) {
      return '<button class="tab-btn" data-action="filter-blog" data-cat="' + escAttr(c) + '">' + esc(c) + '</button>';
    }).join('');

    var postsHTML = posts.map(function (b) {
      return '<div class="card card-hover blog-card" data-cat="' + escAttr(b.category) + '" style="cursor:pointer;overflow:hidden" data-action="open-blog" data-id="' + b.id + '">'
        + '<div style="height:6px;background:linear-gradient(135deg,' + b.color + ',var(--gold));border-radius:3px;margin-bottom:16px"></div>'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
        + '<span class="chip chip-gold" style="font-size:10px">' + esc(b.category) + '</span>'
        + '<span style="font-size:11px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(b.date)) + '</span>'
        + '</div>'
        + '<h3 style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">' + esc(L(b,'title','title_en','title_ar','title_tr')) + '</h3>'
        + '<p style="font-size:12.5px;color:var(--text-3);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:14px">' + esc(L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')) + '</p>'
        + '<div style="display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--text-3);border-top:1px solid var(--border-1);padding-top:12px">'
        + '<span>' + _i(IC.pen) + ' ' + esc(b.author) + '</span><span>' + _i(IC.clock) + ' ' + esc(b.readTime) + '</span>'
        + '</div></div>';
    }).join('');

    return '<div class="page" id="page-blog">'
      + '<div class="page-hero"><h1>' + esc(t.section_blog) + '</h1>'
      + '<p>' + esc(isEn ? 'Academic articles, research insights and scholarly reflections' : isAr ? 'مقالات أكاديمية ورؤى بحثية وتأملات علمية' : 'Akademik maqolalar, tadqiqot eslatmalari va ilmiy baholashlar') + '</p>'
      + '</div>'
      + '<div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">'
      + '<button class="tab-btn active" data-action="filter-blog" data-cat="all">' + esc(t.filter_all) + '</button>'
      + catsHTML
      + '</div>'
      + '<div class="g-3" id="blog-grid">' + postsHTML + '</div>'
      + '</div>';
  }

  function filterBlog(btn, cat) {
    var parent = btn.closest('div');
    if (parent) parent.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.blog-card').forEach(function (card) {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  }

  // ============================================
  // GALLERY PAGE
  // ============================================
  function renderGalleryPage() {
    var t    = DATA.i18n[currentLang];
    var isEn = currentLang === 'en';
    var isAr = currentLang === 'ar';
    var items = DATA.gallery;
    var categories = [];
    items.forEach(function (g) {
      if (categories.indexOf(g.category) === -1) categories.push(g.category);
    });

    var catsHTML = categories.map(function (c) {
      return '<button class="tab-btn" data-action="filter-gallery" data-cat="' + escAttr(c) + '">' + esc(c) + '</button>';
    }).join('');

    var itemsHTML = items.map(function (g) {
      var coverContent = g.coverImage
        ? '<img src="' + escAttr(g.coverImage) + '" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />'
        : '<span style="font-size:48px;opacity:0.8;position:relative;z-index:1">' + g.icon + '</span>';
      var bgStyle = g.coverImage ? '' : 'background:linear-gradient(135deg,' + g.color + ',#019395);';
      return '<div class="card card-hover gallery-card" data-cat="' + escAttr(g.category) + '" style="cursor:pointer;overflow:hidden;padding:0" data-action="open-gallery" data-id="' + g.id + '">'
        + '<div style="height:160px;' + bgStyle + 'display:flex;align-items:center;justify-content:center;position:relative">'
        + coverContent
        + '<div style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.6);color:#fff;font-size:11px;padding:4px 10px;border-radius:20px">' + _i(IC.camera) + ' ' + g.count + '</div>'
        + '</div>'
        + '<div style="padding:14px 16px">'
        + '<span class="chip chip-gold" style="font-size:10px;margin-bottom:8px;display:inline-flex">' + esc(g.category) + '</span>'
        + '<h4 style="font-size:14px;font-weight:600;color:var(--text-1);line-height:1.4;margin-bottom:6px">' + esc(L(g,'title','title_en','title_ar','title_tr')) + '</h4>'
        + '<div style="font-size:11px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(g.date)) + '</div>'
        + '</div></div>';
    }).join('');

    return '<div class="page" id="page-gallery">'
      + '<div class="page-hero"><h1>' + esc(t.section_gallery) + '</h1>'
      + '<p>' + esc(isEn ? 'Events, conferences, campus and institutional photos' : isAr ? 'صور الفعاليات والمؤتمرات والحرم الجامعي' : 'Tadbirlar, konferensiyalar, kampus va muassasa suratlari') + '</p>'
      + '</div>'
      + '<div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">'
      + '<button class="tab-btn active" data-action="filter-gallery" data-cat="all">' + esc(t.filter_all) + '</button>'
      + catsHTML
      + '</div>'
      + '<div class="g-3" id="gallery-grid">' + itemsHTML + '</div>'
      + '</div>';
  }

  function filterGallery(btn, cat) {
    var parent = btn.closest('div');
    if (parent) parent.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('.gallery-card').forEach(function (card) {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  }

  // ============================================
  // ARCHIVE PAGE
  // ============================================
  function renderArchivePage() {
    var allNews = DATA.news;
    var isEn    = currentLang === 'en';
    var cats    = isEn
      ? ['All','Event','Publication','Academy','Research','International']
      : ['Barchasi','Tadbir','Nashr','Akademiya','Tadqiqot','Xalqaro'];
    var catValues = ['Barchasi','Tadbir','Nashr','Akademiya','Tadqiqot','Xalqaro'];

    var catsHTML = cats.map(function (cat, i) {
      return '<button class="tab-btn ' + (i === 0 ? 'active' : '') + '" style="padding:7px 14px;font-size:12px"'
        + ' data-action="archive-cat" data-cat="' + escAttr(catValues[i]) + '">' + esc(cat) + '</button>';
    }).join('');

    var itemsHTML = allNews.map(function (n) {
      var thumbStyle = n.image ? 'overflow:hidden' : 'background:linear-gradient(135deg,' + n.color + ',#019395)';
      var thumbContent = n.image
        ? '<img src="' + escAttr(n.image) + '" alt="" style="width:100%;height:100%;object-fit:cover" />'
        : n.icon;
      return '<div class="card archive-item"'
        + ' data-category="' + escAttr(n.category) + '"'
        + ' data-uz="' + escAttr(n.title.toLowerCase()) + '"'
        + ' data-en="' + escAttr(n.title_en.toLowerCase()) + '"'
        + ' style="display:flex;gap:16px;padding:16px;cursor:pointer"'
        + ' data-action="open-news" data-id="' + n.id + '">'
        + '<div style="width:60px;height:60px;' + thumbStyle + ';border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">'
        + thumbContent + '</div>'
        + '<div style="flex:1">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">'
        + '<span class="chip chip-gold" style="font-size:10px">' + esc(L(n,'tag','tag_en','tag_ar','tag_tr')) + '</span>'
        + '<span style="font-size:11px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(n.date)) + '</span>'
        + '</div>'
        + '<h4 style="font-size:14px;font-weight:600;color:var(--text-1);line-height:1.5">' + esc(L(n,'title','title_en','title_ar','title_tr')) + '</h4>'
        + '</div>'
        + '<div style="display:flex;align-items:center;flex-shrink:0"><span style="font-size:18px;color:var(--text-3)">›</span></div>'
        + '</div>';
    }).join('');

    return '<div class="page" id="page-archive">'
      + '<div class="page-hero">'
      + '<h1>' + esc(isEn ? 'News & Archive' : 'Yangiliklar & Arxiv') + '</h1>'
      + '<p>' + esc(isEn ? 'All news, events, publications and activities' : 'Barcha yangiliklar, tadbirlar, nashrlar va faoliyatlar') + '</p>'
      + '</div>'
      + '<div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">'
      + '<div class="search-box search-box--archive">' + '<span class="si">' + IC.search + '</span>' + ''
      + '<input type="text" id="archive-search-input" placeholder="' + escAttr(isEn ? 'Search news...' : 'Yangilik qidirish...') + '" /></div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap" id="archive-cat-buttons">' + catsHTML + '</div>'
      + '</div>'
      + '<div id="archive-count" style="font-size:12px;color:var(--text-3);margin-bottom:14px">' + allNews.length + ' ' + esc(isEn ? 'results' : 'natija') + '</div>'
      + '<div id="archive-list" style="display:flex;flex-direction:column;gap:10px">' + itemsHTML + '</div>'
      + '</div>';
  }

  // ============================================
  // CONTACT PAGE
  // ============================================
  function renderContactPage() {
    var isEn = currentLang === 'en';
    var isAr = currentLang === 'ar';

    var contactInfo = [
      { icon:_s(IC.mapPin,20), uz:['Manzil','Samarqand sh., O\'zbekiston'],          en:['Address','Samarkand, Uzbekistan'] },
      { icon:_s(IC.phone,20), uz:['Telefon','+998 XX XXX XX XX'],                   en:['Phone','+998 XX XXX XX XX'] },
      { icon:_s(IC.mail,20), uz:['E-pochta','info@imambukhari.uz'],                 en:['Email','info@imambukhari.uz'] },
      { icon:_s(IC.clock,20), uz:['Ish vaqti','Dush–Jum: 09:00 – 18:00'],          en:['Working Hours','Mon–Fri: 09:00 – 18:00'] },
    ];

    var socialLinks = [
      { icon:_s(IC.twitter,18), name:'X (Twitter)', handle:'@imambukhari_uz' },
      { icon:_s(IC.youtube,18), name:'YouTube',     handle:'Imom Buxoriy Instituti' },
      { icon:_s(IC.facebook,18), name:'Facebook',    handle:'imambukhari.uz' },
      { icon:_s(IC.instagram,18), name:'Instagram',   handle:'@imambukhari_uz' },
    ];

    var subjectsEn  = ['General Info','Academy Programs','Publication Request','Partnership Proposal','Media'];
    var subjectsUz  = ['Umumiy ma\'lumot','Akademiya dasturlari','Nashr so\'rovi','Hamkorlik taklifi','Media'];
    var subjectOpts = (isEn ? subjectsEn : subjectsUz).map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('');

    var contactItemsHTML = contactInfo.map(function (c) {
      var pair = isEn ? c.en : c.uz;
      return '<div class="contact-item"><div class="ci-icon">' + c.icon + '</div>'
        + '<div><div class="ci-label">' + esc(pair[0]) + '</div><div class="ci-value">' + esc(pair[1]) + '</div></div>'
        + '</div>';
    }).join('');

    var socOpening = isEn ? 'opening' : 'ochilmoqda';
    var socialHTML = socialLinks.map(function (s) {
      var msg = escAttr(s.name + ' ' + socOpening + '...');
      return '<button class="social-btn" data-action="toast" data-msg="' + msg + '" data-type="info" data-icon="' + escAttr(s.icon) + '">'
        + s.icon + ' ' + esc(s.handle) + '</button>';
    }).join('');

    return '<div class="page" id="page-contact">'
      + '<div class="page-hero">'
      + '<h1>' + esc(isAr ? 'اتصل بنا' : isEn ? 'Contact' : 'Aloqa') + '</h1>'
      + '<p>' + esc(isEn ? 'Get in touch with our team' : isAr ? 'تواصل مع فريقنا' : 'Biz bilan bog\'laning') + '</p>'
      + '</div>'
      + '<div class="g-2 mb-6">'
      + '<div class="card">'
      + '<h3 style="font-size:16px;font-weight:700;color:var(--gold);margin-bottom:20px">' + _i(IC.mail) + ' ' + esc(isEn ? 'Send a Message' : isAr ? 'أرسل رسالة' : 'Bizga xabar yuboring') + '</h3>'
      + '<form data-form="contact">'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Full Name' : isAr ? 'الاسم الكامل' : 'Ismingiz') + '</label>'
      + '<input class="form-input" type="text" placeholder="' + escAttr(isEn ? 'Your full name' : isAr ? 'اسمك الكامل' : 'Ismingiz va familiyangiz') + '" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Email' : isAr ? 'البريد الإلكتروني' : 'Elektron pochtangiz') + '</label>'
      + '<input class="form-input" type="email" placeholder="email@ornek.com" required /></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Subject' : isAr ? 'الموضوع' : 'Mavzu') + '</label>'
      + '<select class="form-select">' + subjectOpts + '</select></div>'
      + '<div class="form-group"><label class="form-label">' + esc(isEn ? 'Message' : isAr ? 'الرسالة' : 'Xabaringiz') + '</label>'
      + '<textarea class="form-textarea" placeholder="' + escAttr(isEn ? 'Write your message here...' : isAr ? 'اكتب رسالتك هنا...' : 'Xabaringizni shu yerga yozing...') + '" required></textarea></div>'
      + '<button type="submit" class="btn btn-gold w-full">' + esc(isEn ? 'Send' : isAr ? 'إرسال' : 'Yuborish') + '</button>'
      + '</form></div>'
      + '<div style="display:flex;flex-direction:column;gap:12px">'
      + contactItemsHTML
      + '<div class="card"><h4 style="font-size:13px;font-weight:700;color:var(--text-2);margin-bottom:12px">' + _i(IC.smartphone) + ' ' + esc(isEn ? 'Social Media' : 'Ijtimoiy tarmoqlar') + '</h4>'
      + '<div class="social-row">' + socialHTML + '</div></div>'
      + '</div></div>'
      + '<div class="map-block mb-6"><div class="map-inner">'
      + '<div class="map-pin">' + _s(IC.mapPin,32) + '</div>'
      + '<h3>' + esc(isEn ? 'Imam Bukhari International Institute' : 'Imom Buxoriy ilmiy tadqiqot markazi') + '</h3>'
      + '<p>Samarqand, O\'zbekiston</p>'
      + '<button class="btn btn-gold" data-action="open-map">' + _i(IC.map) + ' ' + esc(isEn ? 'Show on Map' : 'Xaritada ko\'rish') + '</button>'
      + '</div></div>'
      + '<div class="newsletter-banner"><div class="nl-text">'
      + '<h3>' + _i(IC.mailbox) + ' ' + esc(isEn ? 'Subscribe to Newsletter' : 'Axborotnomamizga obuna bo\'ling') + '</h3>'
      + '<p>' + esc(isEn ? 'Receive news about events and publications by email.' : 'Tadbirlar va nashrlar haqidagi yangiliklarni elektron pochta orqali oling.') + '</p>'
      + '</div>'
      + '<div class="nl-form">'
      + '<input type="email" id="newsletter-email" class="form-input" placeholder="' + escAttr(isEn ? 'Your email address' : 'Elektron pochta manzilingiz') + '" />'
      + '<button class="btn btn-gold" data-action="subscribe-newsletter">' + esc(isEn ? 'Subscribe' : 'Obuna bo\'lish') + '</button>'
      + '</div></div>'
      + '</div>';
  }

  // ============================================
  // MODALS
  // ============================================
  function openNewsModal(id) {
    var n = DATA.news.find(function (x) { return x.id === id; });
    if (!n) return;
    var isEn = currentLang === 'en';
    var thumbHTML = n.image
      ? '<div style="height:180px;border-radius:12px;overflow:hidden;margin-bottom:12px"><img src="' + escAttr(n.image) + '" alt="" style="width:100%;height:100%;object-fit:cover" /></div>'
      : '<div style="font-size:56px;margin-bottom:12px">' + n.icon + '</div>';
    var authorLine = n.author
      ? '<div style="font-size:12px;color:var(--text-3);margin-top:8px">' + _i(IC.pen) + ' ' + esc(n.author) + (n.readTime ? ' • ' + _i(IC.clock) + ' ' + esc(n.readTime) : '') + '</div>'
      : '';
    var shareMsg = escAttr(isEn ? 'Sharing...' : 'Ulashilmoqda...');
    var allNewsLabel = esc(isEn ? 'All News' : 'Barcha yangiliklar');
    var detailText = esc(isEn
      ? 'For detailed information, you can visit the Institute website or contact us directly.'
      : 'Batafsil ma\'lumot uchun institut veb-saytiga tashrif buyuring yoki biz bilan bevosita bog\'laning.');

    document.getElementById('modal-content').innerHTML =
      '<div style="text-align:center;margin-bottom:20px">' + thumbHTML
      + '<span class="chip chip-gold">' + esc(L(n,'tag','tag_en','tag_ar','tag_tr')) + '</span></div>'
      + '<h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-bottom:12px;line-height:1.4">' + esc(L(n,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '<div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">'
      + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(n.date)) + '</span>'
      + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.tag) + ' ' + esc(n.category) + '</span>'
      + '</div>'
      + '<p style="font-size:13.5px;color:var(--text-2);line-height:1.8;margin-bottom:12px">' + (n.summary ? esc(L(n,'summary','summary_en','summary_ar','summary_tr')) : '') + '</p>'
      + '<p style="font-size:12.5px;color:var(--text-3);line-height:1.7">' + detailText + '</p>'
      + authorLine
      + '<div style="display:flex;gap:10px;margin-top:16px">'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + shareMsg + '" data-type="info" data-icon="">' + _i(IC.share) + ' ' + esc(isEn ? 'Share' : 'Ulashish') + '</button>'
      + '<button class="btn btn-ghost" data-action="navigate" data-page="archive">' + allNewsLabel + '</button>'
      + '</div>';
    openModal('news-modal');
  }

  function openResearchModal(id) {
    var a = DATA.researchAreas.find(function (x) { return x.id === id; });
    if (!a) return;
    var isEn = currentLang === 'en';
    var pct  = Math.min(100, Math.round(a.count * 1.8));
    var goLabel = esc(isEn ? 'Go to Research' : 'Tadqiqotga o\'tish');

    document.getElementById('modal-content').innerHTML =
      '<div style="text-align:center;margin-bottom:20px">'
      + '<div style="font-size:52px;margin-bottom:12px">' + a.icon + '</div>'
      + '<h2 style="font-size:20px;font-weight:700;color:var(--gold)">' + esc(L(a,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '</div>'
      + '<p style="font-size:14px;color:var(--text-2);line-height:1.8;margin-bottom:16px">' + esc(L(a,'desc','desc_en','desc_ar','desc_tr')) + '</p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">'
      + '<span class="chip chip-gold">' + _i(IC.file) + ' ' + a.count + ' ' + esc(isEn ? 'Studies' : 'Tadqiqot') + '</span>'
      + '<span class="chip chip-blue">' + _i(IC.scope) + ' ' + esc(isEn ? 'Active Research' : 'Faol tadqiqot') + '</span>'
      + '</div>'
      + '<div class="progress"><div class="progress-bar" style="width:' + pct + '%"></div></div>'
      + '<p style="font-size:12px;color:var(--text-3);margin-top:8px">' + esc(isEn ? 'Research intensity' : 'Tadqiqot intensivligi') + ': ' + pct + '%</p>'
      + '<button class="btn btn-gold" style="margin-top:16px" data-action="navigate" data-page="research">' + goLabel + '</button>';
    openModal('news-modal');
  }

  function openPubModal(id) {
    var p = DATA.publications.find(function (x) { return x.id === id; });
    if (!p) return;
    var isEn  = currentLang === 'en';
    var saved = readingList.indexOf(p.id) !== -1;
    var dlMsg = escAttr(isEn ? 'PDF downloading...' : 'PDF yuklab olinmoqda...');
    var tagsHTML = p.tags
      ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">' + p.tags.map(function (t) { return '<span class="chip chip-blue" style="font-size:10px">' + esc(t) + '</span>'; }).join('') + '</div>'
      : '';

    document.getElementById('modal-content').innerHTML =
      '<div style="display:flex;gap:20px;margin-bottom:20px;align-items:flex-start">'
      + '<div style="width:90px;height:120px;background:linear-gradient(135deg,' + p.color + ',#019395);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:3px 4px 14px rgba(0,0,0,.3)">'
      + '<span style="font-size:13px;font-weight:800;color:var(--gold-300);text-align:center;padding:6px;line-height:1.2">' + esc(p.abbr) + '</span>'
      + '</div><div>'
      + '<h2 style="font-size:17px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">' + esc(isEn ? p.title_en : p.title) + '</h2>'
      + '<div style="color:var(--gold);font-size:13px;margin-bottom:10px">' + _i(IC.pen) + ' ' + esc(p.author) + '</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="chip chip-gold">' + esc(p.type) + '</span><span class="chip chip-blue">' + _i(IC.calendar) + ' ' + esc(String(p.year)) + '</span></div>'
      + '</div></div>'
      + '<p style="font-size:13.5px;color:var(--text-2);line-height:1.8;margin-bottom:14px">' + esc(isEn && p.desc_en ? p.desc_en : p.desc) + '</p>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;font-size:12px;color:var(--text-3)">'
      + (p.pages    ? '<span>' + _i(IC.file) + ' ' + p.pages + ' ' + esc(isEn ? 'pages' : 'sahifa') + '</span>' : '')
      + (p.language ? '<span>' + _i(IC.globe) + ' ' + esc(p.language) + '</span>' : '')
      + (p.series   ? '<span>' + _i(IC.book) + ' ' + esc(p.series) + '</span>' : '')
      + '</div>'
      + tagsHTML
      + '<div style="display:flex;gap:10px;flex-wrap:wrap">'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + dlMsg + '" data-type="info" data-icon="">' + _i(IC.download) + ' ' + esc(isEn ? 'Download PDF' : 'PDF yuklab olish') + '</button>'
      + '<button class="btn btn-ghost" style="' + (saved ? 'border-color:#01CED1;color:#01CED1' : '') + '" data-action="save-reading" data-id="' + p.id + '">' + _i(IC.bookmark) + ' ' + esc(saved ? (isEn ? 'Saved' : 'Saqlangan') : (isEn ? 'Save' : 'Saqlash')) + '</button>'
      + '</div>';
    openModal('news-modal');
  }

  function openProgramModal(id) {
    var p = DATA.programs.find(function (x) { return x.id === id; });
    if (!p) return;
    var isEn = currentLang === 'en';
    var statusLabel = p.status === 'active' ? (isEn ? 'Active' : 'Faol') : (isEn ? 'Upcoming' : 'Tez kunda');
    var statusChip  = p.status === 'active' ? 'chip-green' : 'chip-blue';
    var details = [
      [_s(IC.clock,20), isEn ? 'Duration' : 'Muddat',   p.duration],
      [_s(IC.barChart,20), isEn ? 'Level' : 'Daraja',      p.level],
      [_s(IC.globe,20), isEn ? 'Language' : 'Til',      p.lang],
      [_s(IC.users,20), isEn ? 'Enrolled' : 'Ro\'yxatdan o\'tgan', p.students + (isEn ? ' students' : ' talaba')],
    ];
    var detHTML = details.map(function (d) {
      return '<div style="padding:14px;background:var(--surface-2);border-radius:10px;text-align:center;border:1px solid var(--border-1)">'
        + '<div style="font-size:20px">' + d[0] + '</div>'
        + '<div style="font-size:11px;color:var(--text-3);margin-top:4px">' + esc(d[1]) + '</div>'
        + '<div style="font-size:13px;font-weight:700;color:var(--text-1);margin-top:2px">' + esc(d[2]) + '</div>'
        + '</div>';
    }).join('');

    document.getElementById('modal-content').innerHTML =
      '<div style="text-align:center;margin-bottom:20px">'
      + '<span style="font-size:48px">' + p.icon + '</span>'
      + '<h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-top:12px">' + esc(L(p,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '<span class="chip ' + statusChip + '" style="margin-top:10px;display:inline-flex">' + esc(statusLabel) + '</span>'
      + '</div>'
      + '<div class="g-2" style="margin-bottom:20px">' + detHTML + '</div>'
      + '<button class="btn btn-gold w-full" data-action="apply-program" data-id="' + p.id + '">' + _i(IC.pen) + ' ' + esc(isEn ? 'Apply to Program' : 'Dasturga ariza berish') + '</button>';
    openModal('news-modal');
  }

  function openVideoModal(id) {
    var v = DATA.videos.find(function (x) { return x.id === id; });
    if (!v) return;
    var isEn = currentLang === 'en';
    var ytMsg = escAttr(isEn ? 'Opening YouTube...' : 'YouTube ochilmoqda...');
    var thumbContent = v.thumbnail
      ? '<img src="' + escAttr(v.thumbnail) + '" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />'
      : '';
    var emojiContent = v.thumbnail ? '' : '<div style="font-size:56px;margin-bottom:10px">' + v.emoji + '</div>';
    var playAction = v.videoUrl
      ? 'window.open(\'' + escAttr(v.videoUrl) + '\',\'_blank\')'
      : 'showToast(\'' + (isEn ? 'Opening YouTube...' : 'YouTube ochilmoqda...') + '\',\'info\')';
    var descHTML = v.description
      ? '<p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:14px">' + esc(L(v,'description','description_en','description_ar','description_tr')) + '</p>'
      : '';
    var catChip    = v.category ? '<span class="chip chip-gold">' + esc(v.category) + '</span>' : '';
    var spkLine    = v.speaker  ? '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.mic) + ' ' + esc(v.speaker) + '</span>' : '';
    var watchLabel = esc(isEn ? 'Watch Video' : 'Videoni ko\'rish');

    document.getElementById('modal-content').innerHTML =
      '<h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">' + _i(IC.play) + ' ' + esc(L(v,'title','title_en','title_ar','title_tr')) + '</h3>'
      + '<div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-600));border-radius:14px;height:220px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;position:relative;overflow:hidden">'
      + thumbContent
      + '<div style="text-align:center;position:relative;z-index:1">' + emojiContent
      + '<div style="width:60px;height:60px;background:rgba(228,183,58,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;cursor:pointer;box-shadow:0 4px 20px rgba(228,183,58,.5)"'
      + ' data-action="toast" data-msg="' + ytMsg + '" data-type="info" data-icon="">'
      + '<span style="font-size:22px;margin-left:4px;color:#061a12;font-weight:800">▶</span>'
      + '</div></div></div>'
      + descHTML
      + '<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;flex-wrap:wrap">'
      + '<span class="chip chip-gray">' + _i(IC.clock) + ' ' + esc(v.duration) + '</span>'
      + '<span class="chip chip-gray">' + _i(IC.eye) + ' ' + esc(String(v.views)) + '</span>'
      + catChip + spkLine
      + '</div>'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + ytMsg + '" data-type="info" data-icon="">' + watchLabel + '</button>';
    openModal('news-modal');
  }

  function openEventModal(id) {
    var e = DATA.events.find(function (x) { return x.id === id; });
    if (!e) return;
    var isEn = currentLang === 'en';
    var regMsg  = escAttr(isEn ? 'Registered!' : 'Ro\'yxatdan o\'tish muvaffaqiyatli!');
    var calMsg  = escAttr(isEn ? 'Added to calendar' : 'Taqvimga qo\'shildi');
    var descHTML = e.description
      ? '<p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:16px">' + esc(L(e,'description','description_en','description_ar','description_tr')) + '</p>'
      : '';
    var infoRows = [
      [_s(IC.mapPin,20), isEn ? 'Location' : 'Joylashuv', e.location],
      [_s(IC.clock,20), isEn ? 'Time'     : 'Vaqt',      e.time],
    ];
    if (e.speaker) infoRows.push([_s(IC.mic,20), isEn ? 'Speaker' : 'Ma\'ruzachi', e.speaker]);
    var infoHTML = infoRows.map(function (d) {
      return '<div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border-1)">'
        + '<span style="font-size:18px">' + d[0] + '</span>'
        + '<div><div style="font-size:11.5px;color:var(--text-3);font-weight:600">' + esc(d[1]) + '</div>'
        + '<div style="font-size:13.5px;font-weight:600;color:var(--text-1)">' + esc(d[2]) + '</div></div>'
        + '</div>';
    }).join('');
    var capHTML = e.capacity
      ? '<div style="margin-top:14px"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-bottom:6px">'
        + '<span>' + _i(IC.users) + ' ' + e.registered + '/' + e.capacity + ' ' + esc(isEn ? 'registered' : 'ro\'yxatdan o\'tgan') + '</span>'
        + '<span>' + Math.round(e.registered / e.capacity * 100) + '%</span></div>'
        + '<div class="progress"><div class="progress-bar" style="width:' + Math.round(e.registered / e.capacity * 100) + '%"></div></div>'
        + '</div>'
      : '';

    document.getElementById('modal-content').innerHTML =
      '<div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px">'
      + '<div style="width:70px;height:80px;background:linear-gradient(135deg,var(--gold),var(--gold-600));border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;color:white;box-shadow:0 4px 16px rgba(228,183,58,.4)">'
      + '<div style="font-size:24px;font-weight:800;line-height:1">' + esc(e.day) + '</div>'
      + '<div style="font-size:12px;font-weight:600">' + esc(L(e,'month','month_en','month_ar','month_tr')) + '</div>'
      + '</div>'
      + '<div><h2 style="font-size:17px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:10px">' + esc(L(e,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '<span class="event-tag ' + escAttr(e.type) + '">' + esc(e.type) + '</span></div>'
      + '</div>'
      + descHTML + infoHTML + capHTML
      + '<div style="display:flex;gap:10px;margin-top:18px">'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + regMsg + '" data-type="success" data-icon="">' + _i(IC.check) + ' ' + esc(isEn ? 'Register' : 'Ro\'yxatdan o\'tish') + '</button>'
      + '<button class="btn btn-ghost" data-action="toast" data-msg="' + calMsg + '" data-type="info" data-icon="">' + _i(IC.calendar) + ' ' + esc(isEn ? 'Add to Calendar' : 'Taqvimga qo\'shish') + '</button>'
      + '</div>';
    openModal('news-modal');
  }

  function openTeamModal(id) {
    var m = DATA.team.find(function (x) { return x.id === +id; });
    if (!m) return;
    var isEn   = currentLang === 'en';
    var contMsg = escAttr(m.name + ' ' + (isEn ? 'contacting...' : 'bilan bog\'lanilmoqda...'));
    var bioHTML = m.bio
      ? '<p style="font-size:13px;color:var(--text-2);line-height:1.8;margin-bottom:16px;text-align:center">' + esc(L(m,'bio','bio_en','bio_ar','bio_tr')) + '</p>'
      : '';
    var eduHTML = m.education
      ? '<div style="font-size:12px;color:var(--text-3);margin-bottom:12px;text-align:center">' + _i(IC.grad) + ' ' + esc(m.education) + '</div>'
      : '';
    var specHTML = m.specialization
      ? '<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:16px">'
        + m.specialization.map(function (s) { return '<span class="chip chip-gold" style="font-size:10px">' + esc(s) + '</span>'; }).join('')
        + '</div>'
      : '';
    var avatarStyle = m.avatar
      ? 'padding:0;overflow:hidden'
      : 'background:linear-gradient(135deg,' + (m.avatarColor || 'var(--navy-600)') + ',var(--navy-500))';
    var avatarContent = m.avatar
      ? '<img src="' + escAttr(m.avatar) + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />'
      : esc(m.initials);

    document.getElementById('modal-content').innerHTML =
      '<div style="text-align:center;margin-bottom:20px">'
      + '<div style="width:84px;height:84px;border-radius:50%;' + avatarStyle + ';display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:var(--gold);margin:0 auto 14px;border:3px solid rgba(228,183,58,.5);box-shadow:0 4px 20px rgba(0,0,0,.25)">'
      + avatarContent + '</div>'
      + '<h2 style="font-size:20px;font-weight:700;color:var(--text-1)">' + esc(m.name) + '</h2>'
      + '<div style="color:var(--gold);font-size:14px;font-weight:600;margin-top:5px">' + esc(L(m,'role','role_en','role_ar','role_tr')) + '</div>'
      + '<div style="color:var(--text-3);font-size:12px;margin-top:3px">' + esc(L(m,'dept','dept_en','dept_ar','dept_tr')) + '</div>'
      + '</div>'
      + bioHTML + eduHTML + specHTML
      + '<button class="btn btn-gold w-full" data-action="toast" data-msg="' + contMsg + '" data-type="info" data-icon="">' + _i(IC.mail) + ' ' + esc(isEn ? 'Contact' : 'Aloqa qilish') + '</button>';
    openModal('news-modal');
  }

  function openBlogModal(id) {
    var b = DATA.blogPosts.find(function (x) { return x.id === id; });
    if (!b) return;
    var isEn   = currentLang === 'en';
    var shareMsg = escAttr(isEn ? 'Sharing...' : 'Ulashilmoqda...');
    var tagsHTML = b.tags
      ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">' + b.tags.map(function (t) { return '<span class="chip chip-blue" style="font-size:10px">#' + esc(t) + '</span>'; }).join('') + '</div>'
      : '';

    document.getElementById('modal-content').innerHTML =
      '<div style="margin-bottom:16px">'
      + '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">'
      + '<span class="chip chip-gold">' + esc(b.category) + '</span>'
      + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(b.date)) + '</span>'
      + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.clock) + ' ' + esc(b.readTime) + '</span>'
      + '</div>'
      + '<h2 style="font-size:18px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:12px">' + esc(L(b,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '<div style="font-size:13px;color:var(--gold);font-weight:600;margin-bottom:16px">' + _i(IC.pen) + ' ' + esc(b.author) + '</div>'
      + '</div>'
      + '<p style="font-size:13.5px;color:var(--text-2);line-height:1.9;margin-bottom:16px">' + esc(L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')) + '</p>'
      + tagsHTML
      + '<div style="display:flex;gap:10px">'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + shareMsg + '" data-type="info" data-icon="">' + _i(IC.share) + ' ' + esc(isEn ? 'Share' : 'Ulashish') + '</button>'
      + '<button class="btn btn-ghost" data-action="navigate" data-page="blog">' + esc(isEn ? 'All Articles' : 'Barcha maqolalar') + '</button>'
      + '</div>';
    openModal('news-modal');
  }

  function openGalleryModal(id) {
    var g = DATA.gallery.find(function (x) { return x.id === id; });
    if (!g) return;
    var isEn = currentLang === 'en';
    var galMsg = escAttr(isEn ? 'Loading gallery...' : 'Galereya yuklanmoqda...');
    var coverContent = g.coverImage
      ? '<img src="' + escAttr(g.coverImage) + '" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />'
      : '<span style="font-size:72px;opacity:0.8;position:relative;z-index:1">' + g.icon + '</span>';
    var bgStyle = g.coverImage ? '' : 'background:linear-gradient(135deg,' + g.color + ',#019395);';

    document.getElementById('modal-content').innerHTML =
      '<div style="height:200px;' + bgStyle + 'border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;position:relative;overflow:hidden">'
      + coverContent
      + '<div style="position:absolute;bottom:12px;right:16px;background:rgba(0,0,0,0.6);color:#fff;font-size:12px;padding:5px 12px;border-radius:20px">' + _i(IC.camera) + ' ' + g.count + ' ' + esc(isEn ? 'photos' : 'surat') + '</div>'
      + '</div>'
      + '<h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-bottom:10px">' + esc(L(g,'title','title_en','title_ar','title_tr')) + '</h2>'
      + '<div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">'
      + '<span class="chip chip-gold">' + esc(g.category) + '</span>'
      + '<span style="font-size:12px;color:var(--text-3)">' + _i(IC.calendar) + ' ' + esc(formatDate(g.date)) + '</span>'
      + '</div>'
      + '<button class="btn btn-gold" data-action="toast" data-msg="' + galMsg + '" data-type="info" data-icon="">' + _i(IC.image) + ' ' + esc(isEn ? 'View Gallery' : 'Galereyani ko\'rish') + '</button>';
    openModal('news-modal');
  }

  function openModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('show');
  }

  function closeModal(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
  }

  // ============================================
  // NOTIFICATIONS
  // ============================================
  function openNotifications() {
    notifRead = true;
    localStorage.setItem('ibxi_notif_read', 'true');
    var badge = document.getElementById('notif-badge');
    if (badge) badge.remove();

    var notifications = [
      { icon:_s(IC.megaphone,20), msg:'Akademiya Bahor semestri uchun arizalar qabul qilinmoqda', msg_en:'Academy Spring term applications are open',         time:'2 soat', read:false },
      { icon:_s(IC.book,20), msg:'Yangi nashr: Kalom tarixi kitobi mavjud',                  msg_en:'New publication: Kalam History book available',        time:'1 kun', read:false },
      { icon:_s(IC.mic,20), msg:'Xalqaro simpozium uchun ro\'yxatga olish boshlandi',         msg_en:'International symposium registrations have started',   time:'3 kun', read:false },
      { icon:_s(IC.check,20), msg:'Arizangiz qabul qilindi va ko\'rib chiqilmoqda',            msg_en:'Your application was received and is under review',    time:'1 hafta', read:true },
    ];

    var agoPfx = currentLang === 'en' ? 'ago' : currentLang === 'tr' ? 'önce' : 'oldin';
    var ntfHTML = notifications.map(function (n) {
      var msg = currentLang === 'en' ? n.msg_en : n.msg;
      var bg  = n.read ? 'transparent' : 'rgba(228,183,58,0.06)';
      var dot = !n.read ? '<div style="width:8px;height:8px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:6px"></div>' : '';
      return '<div style="display:flex;gap:12px;padding:12px;border-radius:9px;background:' + bg + ';border-bottom:1px solid var(--border-1)">'
        + '<span style="font-size:22px;flex-shrink:0">' + n.icon + '</span>'
        + '<div style="flex:1"><div style="font-size:13px;color:var(--text-1);font-weight:' + (n.read ? '400' : '600') + '">' + esc(msg) + '</div>'
        + '<div style="font-size:11px;color:var(--text-3);margin-top:3px">' + esc(n.time) + ' ' + esc(agoPfx) + '</div></div>'
        + dot + '</div>';
    }).join('');

    var hdr = currentLang === 'en' ? 'Notifications' : currentLang === 'tr' ? 'Bildirimler' : 'Bildirishnomalar';
    document.getElementById('modal-content').innerHTML =
      '<h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">' + _i(IC.bell) + ' ' + esc(hdr) + '</h3>'
      + ntfHTML;
    openModal('news-modal');
  }

  // ============================================
  // READING LIST
  // ============================================
  function saveToReadingList(id) {
    var idx = readingList.indexOf(id);
    if (idx !== -1) {
      readingList.splice(idx, 1);
      showToast(
        currentLang === 'en' ? 'Removed from reading list' : currentLang === 'tr' ? 'Okuma listesinden çıkarıldı' : 'O\'qish ro\'yxatidan o\'chirildi',
        'info', _s(IC.bookmark)
      );
    } else {
      readingList.push(id);
      showToast(
        currentLang === 'en' ? 'Added to reading list' : currentLang === 'tr' ? 'Okuma listesine eklendi' : 'O\'qish ro\'yxatiga qo\'shildi',
        'success', _s(IC.bookmark)
      );
    }
    localStorage.setItem('ibxi_reading', JSON.stringify(readingList));
  }

  function openReadingList() {
    var isEn  = currentLang === 'en';
    var saved = DATA.publications.filter(function (p) { return readingList.indexOf(p.id) !== -1; });
    var header = '<h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">' + _i(IC.bookmark) + ' '
      + esc(isEn ? 'Reading List' : 'O\'qish ro\'yxatim')
      + (saved.length > 0 ? '<span class="chip chip-gold" style="margin-left:8px;vertical-align:middle">' + saved.length + '</span>' : '')
      + '</h3>';
    var bodyHTML;
    if (saved.length === 0) {
      bodyHTML = '<div style="text-align:center;padding:32px;color:var(--text-3)">'
        + '<div style="display:flex;align-items:center;justify-content:center;color:var(--gold);margin-bottom:12px">' + _s(IC.book,40) + '</div>'
        + '<p>' + esc(isEn ? 'Your reading list is empty.' : 'O\'qish ro\'yxatingiz bo\'sh.') + '</p>'
        + '<button class="btn btn-gold" style="margin-top:16px" data-action="navigate" data-page="publications">'
        + esc(isEn ? 'Browse Publications' : 'Nashrlarni ko\'rish') + '</button>'
        + '</div>';
    } else {
      bodyHTML = saved.map(function (p) {
        return '<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-1);align-items:center">'
          + '<div style="width:40px;height:54px;background:linear-gradient(135deg,' + p.color + ',#019395);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:2px 2px 8px rgba(0,0,0,.2)">'
          + '<span style="font-size:10px;font-weight:800;color:var(--gold-300)">' + esc(p.abbr) + '</span>'
          + '</div>'
          + '<div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--text-1)">' + esc(isEn ? p.title_en : p.title) + '</div>'
          + '<div style="font-size:11px;color:var(--text-3)">' + esc(p.author) + ' • ' + esc(String(p.year)) + '</div>'
          + '</div>'
          + '<button class="btn btn-ghost btn-sm" data-action="save-reading" data-id="' + p.id + '">✕</button>'
          + '</div>';
      }).join('');
    }
    document.getElementById('modal-content').innerHTML = header + bodyHTML;
    openModal('news-modal');
  }

  // ============================================
  // TABS
  // ============================================
  function switchTab(group, tabId) {
    var prefix = group + '-';
    document.querySelectorAll('.tab-content[id^="' + prefix + '"]').forEach(function (t) { t.classList.remove('active'); });
    var target = document.getElementById(prefix + tabId);
    if (target) target.classList.add('active');

    var tabsEl = document.getElementById(group + '-tabs');
    if (tabsEl) {
      tabsEl.querySelectorAll('.tab-btn').forEach(function (btn) {
        var dTab = btn.dataset.tab;
        btn.classList.toggle('active', dTab === tabId);
      });
    }
  }

  // ============================================
  // ACCORDION
  // ============================================
  function toggleAccordion(id) {
    var item = document.getElementById(id);
    if (!item) return;
    var wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(function (a) { a.classList.remove('open'); });
    if (!wasOpen) item.classList.add('open');
  }

  // ============================================
  // SEARCH
  // ============================================
  function getSearchPool() {
    return [].concat(
      DATA.news.map(function (n) {
        return { icon: n.icon, title: L(n,'title','title_en','title_ar','title_tr'), cat: n.category, page: 'archive', id: n.id };
      }),
      DATA.researchAreas.map(function (a) {
        return { icon: a.icon, title: L(a,'title','title_en','title_ar','title_tr'), cat: 'Tadqiqot', page: 'research' };
      }),
      DATA.publications.map(function (p) {
        return { icon: _s(IC.book,16), title: currentLang === 'en' ? p.title_en : currentLang === 'tr' ? (p.title_tr || p.title) : p.title, cat: 'Nashr', page: 'publications' };
      }),
      DATA.programs.map(function (p) {
        return { icon: p.icon, title: L(p,'title','title_en','title_ar','title_tr'), cat: 'Akademiya', page: 'academy' };
      }),
      DATA.blogPosts.map(function (b) {
        return { icon: _s(IC.pen,16), title: L(b,'title','title_en','title_ar','title_tr'), cat: 'Blog', page: 'blog', id: b.id };
      }),
      DATA.gallery.map(function (g) {
        return { icon: g.icon, title: L(g,'title','title_en','title_ar','title_tr'), cat: 'Galereya', page: 'gallery' };
      }),
      DATA.videos.map(function (v) {
        return { icon: v.emoji, title: L(v,'title','title_en','title_ar','title_tr'), cat: 'Video', page: 'home' };
      })
    );
  }

  function handleSearch(query) {
    var container = document.getElementById('search-results');
    if (!container) return;
    if (!query || query.length < 2) { container.classList.remove('show'); return; }

    var pool    = getSearchPool();
    var q       = query.toLowerCase();
    var results = pool.filter(function (s) { return s.title.toLowerCase().indexOf(q) !== -1; }).slice(0, 7);

    if (!results.length) {
      container.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-3);font-size:12px">'
        + esc(currentLang === 'en' ? 'No results found' : currentLang === 'tr' ? 'Sonuç bulunamadı' : 'Natija topilmadi')
        + '</div>';
      container.classList.add('show');
      return;
    }

    var escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    container.innerHTML = results.map(function (r) {
      var hiTitle = esc(r.title).replace(
        new RegExp('(' + escapedQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'),
        '<mark>$1</mark>'
      );
      var action = (r.page === 'archive' && r.id != null) ? 'open-news' : 'navigate';
      var dataId = (r.page === 'archive' && r.id != null) ? ' data-id="' + r.id + '"' : '';
      var dataPage = action === 'navigate' ? ' data-page="' + escAttr(r.page) + '"' : '';
      return '<div class="sr-item" data-action="' + action + '"' + dataId + dataPage + '>'
        + '<span class="sr-icon">' + r.icon + '</span>'
        + '<div><div class="sr-title">' + hiTitle + '</div>'
        + '<div class="sr-cat">' + esc(r.cat) + '</div></div>'
        + '</div>';
    }).join('');
    container.classList.add('show');
  }

  var debouncedSearch = debounce(handleSearch, 250);

  function hideSearchDropdown() {
    var r = document.getElementById('search-results');
    if (r) r.classList.remove('show');
  }

  // ============================================
  // ARCHIVE FILTER
  // ============================================
  function setArchiveCat(btn, cat) {
    archiveCatQ = cat;
    var btnsEl = document.getElementById('archive-cat-buttons');
    if (btnsEl) btnsEl.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    applyArchiveFilter();
  }

  var debouncedArchive = debounce(function () { applyArchiveFilter(); }, 250);

  function applyArchiveFilter() {
    var items   = document.querySelectorAll('.archive-item');
    var visible = 0;
    items.forEach(function (item) {
      var catMatch  = !archiveCatQ || archiveCatQ === 'Barchasi' || item.dataset.category === archiveCatQ;
      var q         = archiveTextQ.toLowerCase().trim();
      var textMatch = !q || (item.dataset.uz || '').indexOf(q) !== -1 || (item.dataset.en || '').indexOf(q) !== -1 || item.textContent.toLowerCase().indexOf(q) !== -1;
      var show      = catMatch && textMatch;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    var countEl = document.getElementById('archive-count');
    if (countEl) {
      countEl.textContent = visible + ' ' + (currentLang === 'en' ? 'results' : currentLang === 'tr' ? 'sonuç' : 'natija');
    }
  }

  // ============================================
  // FORMS
  // ============================================
  function submitContact(e) {
    e.preventDefault();
    var form = e.target;
    var t    = DATA.i18n[currentLang];
    clearFormErrors(form);

    var nameInput  = form.querySelector('input[type="text"]');
    var emailInput = form.querySelector('input[type="email"]');
    var valid      = true;

    if (nameInput && !nameInput.value.trim()) {
      showFieldError(nameInput, t.form_required);
      valid = false;
    }
    if (emailInput && (emailInput.value.indexOf('@') === -1 || emailInput.value.indexOf('.') === -1)) {
      showFieldError(emailInput, t.form_invalid_email);
      valid = false;
    }
    if (!valid) return;

    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      var origText = btn.textContent;
      btn.innerHTML = '<span class="btn-spinner"></span> ' + esc(t.loading_text);
      setTimeout(function () {
        btn.disabled  = false;
        btn.textContent = origText;
        showToast(t.form_success, 'success', IC.check);
        form.reset();
      }, 1200);
    }
  }

  function submitApplication(e) {
    e.preventDefault();
    showToast(
      currentLang === 'en' ? 'Application received! You will be notified by email.'
      : currentLang === 'tr' ? 'Başvurunuz alındı! E-posta ile bilgilendirileceksiniz.'
      : 'Arizangiz qabul qilindi! Natija elektron pochta orqali bildiriladi.',
      'success', _s(IC.grad)
    );
    e.target.reset();
  }

  function submitVisiting(e) {
    e.preventDefault();
    showToast(
      currentLang === 'en' ? 'Visiting Scholar application received!'
      : currentLang === 'tr' ? 'Ziyaretçi Akademisyen başvurunuz alındı!'
      : 'Mehmon olim arizangiz qabul qilindi!',
      'success', _s(IC.globe)
    );
    e.target.reset();
  }

  function applyProgram(id) {
    var p    = DATA.programs.find(function (x) { return x.id === id; });
    if (!p) return;
    var name = currentLang === 'en' ? p.title_en : currentLang === 'tr' ? (p.title_tr || p.title) : p.title;
    showToast(
      '"' + name + '" ' + (currentLang === 'en' ? 'application submitted!' : currentLang === 'tr' ? 'başvurunuz alındı!' : 'dasturiga arizangiz qabul qilindi!'),
      'success', IC.check
    );
    navigateTo('academy');
    setTimeout(function () { switchTab('academy', 'apply'); }, 200);
  }

  function subscribeNewsletter() {
    var input = document.getElementById('newsletter-email');
    if (input && input.value.indexOf('@') === -1) {
      showToast(
        currentLang === 'en' ? 'Please enter a valid email.' : currentLang === 'tr' ? 'Lütfen geçerli bir e-posta girin.' : 'To\'g\'ri elektron pochta manzilini kiriting.',
        'warning', IC.warn
      );
      return;
    }
    showToast(
      currentLang === 'en' ? 'Successfully subscribed to our newsletter!' : currentLang === 'tr' ? 'Bültenimize başarıyla abone oldunuz!' : 'Axborotnomamizga muvaffaqiyatli obuna bo\'ldingiz!',
      'success', _s(IC.mailbox)
    );
    if (input) input.value = '';
  }

  function openMap() {
    showToast(currentLang === 'en' ? 'Opening map...' : currentLang === 'tr' ? 'Harita açılıyor...' : 'Xarita ochilmoqda...', 'info', _s(IC.map));
    setTimeout(function () { window.open('https://maps.google.com?q=Samarqand+Uzbekistan', '_blank'); }, 400);
  }

  // ============================================
  // COUNT-UP (requestAnimationFrame)
  // ============================================
  function initCountUp() {
    document.querySelectorAll('.stat-val[data-target]').forEach(function (el) {
      var target  = parseInt(el.dataset.target, 10);
      var suffix  = el.dataset.suffix || '';
      var start   = null;
      var duration = 1200;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        el.textContent = Math.round(progress * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // ============================================
  // PROGRESS BAR ANIMATION
  // ============================================
  function animateProgressBars() {
    document.querySelectorAll('.progress-bar[data-width]').forEach(function (bar) {
      var w = bar.dataset.width;
      setTimeout(function () { bar.style.width = w + '%'; }, 100);
    });
  }

  function attachPageObserver() {
    if (pageObserver) { pageObserver.disconnect(); }
    pageObserver = new MutationObserver(function () { animateProgressBars(); });
    document.querySelectorAll('.page').forEach(function (p) {
      pageObserver.observe(p, { attributes: true, attributeFilter: ['class'] });
    });
  }

  // ============================================
  // SCROLL TO TOP
  // ============================================
  function initScrollToTop() {
    window.addEventListener('scroll', function () {
      var btn = document.getElementById('scroll-top-btn');
      if (btn) btn.classList.toggle('show', window.scrollY > 300);
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ============================================
  // TOAST
  // ============================================
  function showToast(msg, type, icon) {
    type = type || 'info';
    icon = icon || IC.info;
    var container = document.getElementById('toast-container');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    // Icon is a safe hardcoded emoji; msg is escaped
    toast.innerHTML = '<span class="ti">' + icon + '</span><span class="tm">' + esc(String(msg)) + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateX(110%)';
      setTimeout(function () { toast.remove(); }, 320);
    }, 3500);
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================
  function initScrollReveal() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  // ============================================
  // FORM VALIDATION HELPERS
  // ============================================
  function showFieldError(input, message) {
    input.classList.add('error');
    var existing = input.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
    var error = document.createElement('div');
    error.className  = 'form-error';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(function (el) { el.remove(); });
    form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  function initEventListeners() {
    // Delegated click handler
    document.addEventListener('click', function (e) {
      // Close search dropdown when clicking outside
      var searchBox = document.getElementById('search-container');
      if (searchBox && !searchBox.contains(e.target)) hideSearchDropdown();

      // Close lang dropdown when clicking outside
      var langDD = document.getElementById('lang-dropdown');
      if (langDD && !langDD.contains(e.target)) {
        var menu = document.getElementById('lang-dropdown-menu');
        if (menu) menu.classList.remove('show');
      }

      // Close modal when clicking backdrop
      var modal = document.querySelector('.modal-backdrop.show');
      if (modal && e.target === modal) modal.classList.remove('show');

      // Mobile overlay
      if (e.target.id === 'mobile-overlay') {
        var sb = document.getElementById('sidebar');
        var mo = document.getElementById('mobile-overlay');
        if (sb) sb.classList.remove('mobile-open');
        if (mo) mo.classList.remove('show');
      }

      // data-action dispatch
      var el = e.target.closest('[data-action]');
      if (!el) return;
      var action = el.dataset.action;
      try {
        switch (action) {
          case 'navigate':
            e.preventDefault();
            navigateTo(el.dataset.page);
            break;
          case 'open-news':
            openNewsModal(+el.dataset.id);
            break;
          case 'open-research':
            openResearchModal(+el.dataset.id);
            break;
          case 'open-pub':
            openPubModal(+el.dataset.id);
            break;
          case 'open-program':
            openProgramModal(+el.dataset.id);
            break;
          case 'open-video':
            openVideoModal(+el.dataset.id);
            break;
          case 'open-event':
            openEventModal(+el.dataset.id);
            break;
          case 'open-team':
            openTeamModal(el.dataset.id);
            break;
          case 'open-blog':
            openBlogModal(+el.dataset.id);
            break;
          case 'open-gallery':
            openGalleryModal(+el.dataset.id);
            break;
          case 'toggle-theme':
            toggleTheme();
            break;
          case 'toggle-sidebar':
            toggleSidebar();
            break;
          case 'toggle-lang-dd':
            toggleLangDropdown();
            break;
          case 'set-lang':
            setLang(el.dataset.lang);
            break;
          case 'switch-tab':
            switchTab(el.dataset.group, el.dataset.tab);
            break;
          case 'toggle-accordion':
            toggleAccordion(el.dataset.target);
            break;
          case 'filter-blog':
            filterBlog(el, el.dataset.cat);
            break;
          case 'filter-gallery':
            filterGallery(el, el.dataset.cat);
            break;
          case 'open-notifications':
            openNotifications();
            break;
          case 'save-reading':
            saveToReadingList(+el.dataset.id);
            break;
          case 'open-reading-list':
            openReadingList();
            break;
          case 'close-modal':
            closeModal(el.dataset.modal);
            break;
          case 'scroll-top':
            scrollToTop();
            break;
          case 'archive-cat':
            setArchiveCat(el, el.dataset.cat);
            break;
          case 'subscribe-newsletter':
            subscribeNewsletter();
            break;
          case 'open-map':
            openMap();
            break;
          case 'apply-program':
            e.stopPropagation();
            applyProgram(+el.dataset.id);
            break;
          case 'toast':
            showToast(el.dataset.msg || '', el.dataset.type || 'info', el.dataset.icon || IC.info);
            break;
          case 'download-report':
            showToast(el.dataset.msg || '', 'info', _s(IC.download));
            break;
        }
      } catch (err) {
        console.error('Action error [' + action + ']:', err);
      }
    });

    // Delegated search input (debounced)
    document.addEventListener('input', function (e) {
      if (e.target.id === 'search-input') {
        debouncedSearch(e.target.value);
      }
      if (e.target.id === 'archive-search-input') {
        archiveTextQ = e.target.value;
        debouncedArchive();
      }
    });

    // Search focus: show results if query already present
    document.addEventListener('focusin', function (e) {
      if (e.target.id === 'search-input' && e.target.value.length >= 2) {
        handleSearch(e.target.value);
      }
    });

    // Delegated form submit
    document.addEventListener('submit', function (e) {
      var form = e.target;
      if (form.dataset.form === 'contact')     { submitContact(e); }
      else if (form.dataset.form === 'application') { submitApplication(e); }
      else if (form.dataset.form === 'visiting')    { submitVisiting(e); }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(function (m) { m.classList.remove('show'); });
        hideSearchDropdown();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        var si = document.getElementById('search-input');
        if (si) si.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

}());
