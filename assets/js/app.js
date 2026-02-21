// ============================================
// Imom Buxoriy Xalqaro Instituti
// Main Application Logic — v3.0 (Premium redesign)
// ============================================

(function () {
  'use strict';

  // === STATE ===
  let currentLang    = localStorage.getItem('ibxi_lang')  || 'uz';
  let currentPage    = 'home';
  let sidebarCollapsed = false;
  let darkMode       = localStorage.getItem('ibxi_theme') !== 'light';
  let archiveTextQ   = '';
  let archiveCatQ    = 'Barchasi';
  let readingList    = JSON.parse(localStorage.getItem('ibxi_reading') || '[]');
  let notifRead      = JSON.parse(localStorage.getItem('ibxi_notif_read') || 'false');

  // === DOM READY ===
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderSidebar();
    renderTopbar();
    renderAllPages();
    navigateTo('home');
    initEventListeners();
    initScrollToTop();
    initCountUp();
    setTimeout(() => {
      document.getElementById('loader').classList.remove('show');
    }, 700);
    setTimeout(() => {
      showToast('Imom Buxoriy Xalqaro Instituti ishga tushdi', 'info');
    }, 800);
  });

  // ============================================
  // THEME
  // ============================================
  function initTheme() {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }

  window.toggleTheme = function () {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('ibxi_theme', darkMode ? 'dark' : 'light');
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.innerHTML = darkMode ? '☀️' : '🌙';
    showToast(darkMode ? 'Qorong\'u mavzu faol' : 'Yorug\' mavzu faol', 'info');
  };

  // ============================================
  // SIDEBAR
  // ============================================
  function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    const t = DATA.i18n[currentLang];
    document.documentElement.dir  = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    const navItems = [
      { id: 'home',          icon: '🏠',  label: t.nav_home },
      { id: 'foundation',    icon: '🕌',  label: t.nav_foundation },
      { id: 'corporate',     icon: '🏛️', label: t.nav_corporate },
      { id: 'research',      icon: '🔬',  label: t.nav_research },
      { id: 'academy',       icon: '🎓',  label: t.nav_academy },
      { id: 'international', icon: '🌍',  label: t.nav_international },
      { id: 'publications',  icon: '📚',  label: t.nav_publications },
      { id: 'blog',          icon: '✏️',  label: t.nav_blog },
      { id: 'gallery',       icon: '🖼️',  label: t.nav_gallery },
      { id: 'archive',       icon: '📁',  label: t.nav_archive },
      { id: 'contact',       icon: '✉️',  label: t.nav_contact },
    ];

    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <img src="assets/img/logo-gold.png" alt="Logo" class="logo-mark" style="width:38px;height:38px;object-fit:contain;border-radius:0;background:none;box-shadow:none" />
        <div class="logo-text">
          <span class="lt-main">Imom Buxoriy</span>
          <span class="lt-sub">Xalqaro Instituti</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-group-label">MENYU</div>
        ${navItems.map(item => `
          <div class="nav-item ${currentPage === item.id ? 'active' : ''}"
               onclick="navigateTo('${item.id}')"
               data-page="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
            <span class="nav-tooltip">${item.label}</span>
          </div>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <div style="font-size:9.5px;color:rgba(255,255,255,0.22);text-align:center;margin-bottom:7px;letter-spacing:1.4px;text-transform:uppercase;font-weight:700">TIL / LANGUAGE</div>
        <div class="lang-grid">
          <button class="lang-btn ${currentLang === 'uz' ? 'active' : ''}" onclick="setLang('uz')">UZ</button>
          <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
          <button class="lang-btn ${currentLang === 'ar' ? 'active' : ''}" onclick="setLang('ar')">عر</button>
          <button class="lang-btn ${currentLang === 'tr' ? 'active' : ''}" onclick="setLang('tr')">TR</button>
        </div>
      </div>
    `;
  }

  // ============================================
  // TOPBAR
  // ============================================
  function renderTopbar() {
    const topbar = document.getElementById('topbar');
    const unread  = notifRead ? 0 : 3;
    const themeIcon = darkMode ? '☀️' : '🌙';

    topbar.innerHTML = `
      <div class="topbar-left">
        <button id="toggle-sidebar" class="tb-toggle" onclick="toggleSidebar()" title="Menyuni yashirish">☰</button>
        <div class="breadcrumb">
          <span>IBXI</span>
          <span class="bc-sep">›</span>
          <span class="bc-current" id="breadcrumb-label">${DATA.i18n[currentLang].nav_home}</span>
        </div>
      </div>
      <div class="topbar-right">
        <div class="search-wrap" id="search-container" style="position:relative">
          <div class="search-box">
            <span class="si">🔍</span>
            <input type="text" id="search-input"
                   placeholder="${currentLang === 'uz' ? 'Qidirish...' : currentLang === 'en' ? 'Search...' : currentLang === 'tr' ? 'Ara...' : 'بحث...'}"
                   oninput="handleSearch(this.value)"
                   onfocus="showSearchResults()" />
          </div>
          <div class="search-results" id="search-results"></div>
        </div>
        <button class="tb-btn" onclick="toggleTheme()" id="theme-toggle" title="${currentLang === 'uz' ? 'Mavzuni almashtirish' : 'Toggle Theme'}">${themeIcon}</button>
        <button class="tb-btn" onclick="openNotifications()" title="${currentLang === 'uz' ? 'Bildirishnomalar' : 'Notifications'}" style="position:relative">
          🔔
          ${unread > 0 ? `<span class="notif-dot" id="notif-badge">${unread}</span>` : ''}
        </button>
        <button class="tb-btn" onclick="openReadingList()" title="${currentLang === 'uz' ? "O'qish ro'yxati" : 'Reading List'}" style="position:relative">
          🔖
          ${readingList.length > 0 ? `<span class="notif-dot" style="background:#10b981">${readingList.length}</span>` : ''}
        </button>
        <button class="tb-btn" onclick="openModal('about-modal')" title="${currentLang === 'uz' ? 'Haqida' : 'About'}">ℹ️</button>
      </div>
    `;
  }

  // ============================================
  // NAVIGATION
  // ============================================
  window.navigateTo = function (pageId) {
    currentPage = pageId;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === pageId);
    });

    const labels = {
      home:          DATA.i18n[currentLang].nav_home,
      foundation:    DATA.i18n[currentLang].nav_foundation,
      corporate:     DATA.i18n[currentLang].nav_corporate,
      research:      DATA.i18n[currentLang].nav_research,
      academy:       DATA.i18n[currentLang].nav_academy,
      international: DATA.i18n[currentLang].nav_international,
      publications:  DATA.i18n[currentLang].nav_publications,
      blog:          DATA.i18n[currentLang].nav_blog,
      gallery:       DATA.i18n[currentLang].nav_gallery,
      archive:       DATA.i18n[currentLang].nav_archive,
      contact:       DATA.i18n[currentLang].nav_contact,
    };
    const el = document.getElementById('breadcrumb-label');
    if (el && labels[pageId]) el.textContent = labels[pageId];

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('mobile-overlay').classList.remove('show');
    hideSearchDropdown();

    if (pageId === 'home') setTimeout(initCountUp, 100);
    setTimeout(initScrollReveal, 50);
  };

  window.toggleSidebar = function () {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      document.getElementById('sidebar').classList.toggle('mobile-open');
      document.getElementById('mobile-overlay').classList.toggle('show');
    } else {
      sidebarCollapsed = !sidebarCollapsed;
      document.getElementById('sidebar').classList.toggle('collapsed', sidebarCollapsed);
      document.getElementById('topbar').classList.toggle('collapsed', sidebarCollapsed);
      document.getElementById('main-content').classList.toggle('collapsed', sidebarCollapsed);
    }
  };

  // ============================================
  // LANGUAGE
  // ============================================
  window.setLang = function (lang) {
    currentLang = lang;
    localStorage.setItem('ibxi_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    renderSidebar();
    renderTopbar();
    renderAllPages();
    navigateTo(currentPage);
    showToast(
      lang === 'uz' ? "O'zbekcha tanlandi" :
      lang === 'en' ? 'English selected' :
      lang === 'tr' ? 'Türkçe seçildi' :
      'تم اختيار العربية',
      'success'
    );
  };

  // ============================================
  // RENDER ALL PAGES
  // ============================================
  function renderAllPages() {
    const container = document.getElementById('pages-container');
    container.innerHTML =
      renderHomePage()        +
      renderFoundationPage()  +
      renderCorporatePage()   +
      renderResearchPage()    +
      renderAcademyPage()     +
      renderInternationalPage() +
      renderPublicationsPage() +
      renderBlogPage()        +
      renderGalleryPage()     +
      renderArchivePage()     +
      renderContactPage();
  }

  // ============================================
  // LOCALISATION HELPER
  // ============================================
  function L(obj, uzKey, enKey, arKey, trKey) {
    if (currentLang === 'en' && enKey) return obj[enKey] || obj[uzKey];
    if (currentLang === 'ar' && arKey) return obj[arKey] || obj[uzKey];
    if (currentLang === 'tr' && trKey) return obj[trKey] || obj[uzKey];
    return obj[uzKey]; // default key used for Uzbek (uz) content
  }

  // ============================================
  // SECTION HEAD HELPER
  // ============================================
  function sectionHead(title, seeAllLabel, seeAllPage) {
    const right = seeAllLabel
      ? `<button class="see-all" onclick="navigateTo('${seeAllPage}')">${seeAllLabel} →</button>`
      : '';
    return `
      <div class="section-head">
        <div class="sh-left">
          <div class="sh-bar"></div>
          <h2>${title}</h2>
        </div>
        ${right}
      </div>
    `;
  }

  // ============================================
  // HOME PAGE
  // ============================================
  function renderHomePage() {
    const t     = DATA.i18n[currentLang];
    const news  = DATA.news;
    const areas = DATA.researchAreas;
    const evts  = DATA.events;
    const vids  = DATA.videos;

    const statItems = [
      { icon:'👨‍🎓', sc:'sc-gold',   si:'si-gold',   num:48,  suffix:'',  label: t.stat_researchers },
      { icon:'📚',   sc:'sc-blue',   si:'si-blue',   num:212, suffix:'',  label: t.stat_publications },
      { icon:'🎤',   sc:'sc-green',  si:'si-green',  num:340, suffix:'+', label: t.stat_events },
      { icon:'🕐',   sc:'sc-purple', si:'si-purple', num:15,  suffix:'',  label: t.stat_years },
    ];

    return `
    <div class="page" id="page-home">

      <!-- Hero -->
      <div class="hero-banner">
        <div class="hero-content">
          <div class="hero-eyebrow">Imam Bukhari International Institute</div>
          <h1>${t.hero_title}</h1>
          <p>${t.hero_sub}</p>
          <div class="hero-actions">
            <button class="btn btn-gold btn-lg" onclick="navigateTo('research')">${t.hero_btn1}</button>
            <button class="btn btn-outline btn-lg" onclick="navigateTo('academy')">${t.hero_btn2}</button>
          </div>
        </div>
        <div class="hero-deco"><img src="assets/img/logo-white.png" alt="" style="width:110px;height:110px;object-fit:contain;opacity:.12" /></div>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        ${statItems.map(s => `
          <div class="stat-card ${s.sc}">
            <div class="stat-icon-wrap ${s.si}">${s.icon}</div>
            <div>
              <div class="stat-val" data-target="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</div>
              <div class="stat-lbl">${s.label}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- News -->
      ${sectionHead(t.section_news, currentLang==='en'?'All News':currentLang==='ar'?'كل الأخبار':currentLang==='tr'?'Tüm Haberler':'Barcha yangiliklar', 'archive')}
      <div class="g-3 mb-6 reveal">
        ${news.slice(0, 6).map(n => `
          <div class="news-card" onclick="openNewsModal(${n.id})">
            <div class="news-thumb" style="${n.image ? '' : 'background:linear-gradient(135deg,'+n.color+',#0e3526)'}">
              ${n.image
                ? '<img src="'+n.image+'" alt="" style="width:100%;height:100%;object-fit:cover" />'
                : '<span style="position:relative;z-index:1">'+n.icon+'</span>'}
            </div>
            <div class="news-body">
              <span class="news-chip">${L(n,'tag','tag_en','tag_ar','tag_tr')}</span>
              <h3>${L(n,'title','title_en','title_ar','title_tr')}</h3>
              <p style="font-size:12px;color:var(--text-3);line-height:1.5;margin:6px 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${L(n,'summary','summary_en','summary_ar','summary_tr')}</p>
              <div class="news-meta">
                <span>📅 ${n.date}</span>
                <span>• ${n.readTime || n.category}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Research Areas -->
      ${sectionHead(t.section_research, currentLang==='en'?'All Research':currentLang==='ar'?'كل الأبحاث':currentLang==='tr'?'Tüm Araştırmalar':'Barcha tadqiqotlar', 'research')}
      <div class="g-3 mb-6 reveal">
        ${areas.map(a => `
          <div class="research-card" onclick="navigateTo('research')">
            <div class="rc-icon">${a.icon}</div>
            <h3>${L(a,'title','title_en','title_ar','title_tr')}</h3>
            <p>${L(a,'desc','desc_en','desc_ar','desc_tr')}</p>
            <div style="margin-top:12px">
              <span class="chip chip-gold">
                ${a.count} ${currentLang==='ar' ? 'دراسة' : currentLang==='en' ? 'studies' : currentLang==='tr' ? 'araştırma' : 'tadqiqot'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Blog / Insights -->
      ${sectionHead(t.section_blog, t.see_all, 'blog')}
      <div class="g-3 mb-6 reveal">
        ${DATA.blogPosts.filter(b => b.featured).slice(0, 3).map(b => `
          <div class="card card-hover" style="cursor:pointer;overflow:hidden" onclick="openBlogModal(${b.id})">
            <div style="height:6px;background:linear-gradient(135deg,${b.color},var(--gold));border-radius:3px;margin-bottom:16px"></div>
            <span class="chip chip-gold" style="margin-bottom:10px;display:inline-flex">${b.category}</span>
            <h3 style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">${L(b,'title','title_en','title_ar','title_tr')}</h3>
            <p style="font-size:12.5px;color:var(--text-3);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:12px">${L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--text-3)">
              <span>✍️ ${b.author}</span>
              <span>⏱ ${b.readTime}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Testimonials -->
      ${sectionHead(t.section_testimonials)}
      <div class="g-3 mb-6 reveal">
        ${DATA.testimonials.slice(0, 3).map(q => `
          <div class="card card-hover" style="position:relative;overflow:hidden">
            <div style="font-size:48px;color:rgba(228,183,58,0.15);position:absolute;top:8px;left:16px;font-family:serif;line-height:1">"</div>
            <p style="font-size:13px;color:var(--text-2);line-height:1.8;padding:20px 8px 12px 8px;font-style:italic">${L(q,'quote','quote_en','quote_ar','quote_tr')}</p>
            <div style="display:flex;align-items:center;gap:10px;padding:0 8px 4px">
              <span style="font-size:20px">${q.emoji}</span>
              <div>
                <div style="font-size:12.5px;font-weight:700;color:var(--text-1)">${q.name}</div>
                <div style="font-size:11px;color:var(--text-3)">${q.institution}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Events + Videos -->
      <div class="g-2">
        <div>
          ${sectionHead(t.section_events, currentLang==='en'?'All Events':currentLang==='tr'?'Tüm Etkinlikler':'Barcha tadbirlar', 'archive')}
          <div style="display:flex;flex-direction:column;gap:10px">
            ${evts.slice(0,6).map(e => `
              <div class="event-row" onclick="openEventModal(${e.id})">
                <div class="event-date-box">
                  <span class="eday">${e.day}</span>
                  <span class="emon">${L(e,'month','month_en','month_ar','month_tr')}</span>
                </div>
                <div class="event-info">
                  <h4>${L(e,'title','title_en','title_ar','title_tr')}</h4>
                  <p>📍 ${e.location} &nbsp; ⏰ ${e.time}</p>
                  <div style="display:flex;align-items:center;gap:8px;margin-top:5px">
                    <span class="event-tag ${e.type}">${e.type}</span>
                    ${e.capacity ? `<span style="font-size:10px;color:var(--text-3)">👥 ${e.registered}/${e.capacity}</span>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          ${sectionHead(t.section_videos, '', '')}
          <div style="display:flex;flex-direction:column;gap:10px">
            ${vids.slice(0,5).map(v => `
              <div class="video-row" onclick="openVideoModal(${v.id})">
                <div class="vid-thumb" style="${v.thumbnail ? 'position:relative' : ''}">
                  ${v.thumbnail
                    ? '<img src="'+v.thumbnail+'" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:inherit" />'
                    : '<span class="vt-emoji">'+v.emoji+'</span>'}
                  <div class="play-ring">▶</div>
                  <div class="vid-dur">${v.duration}</div>
                </div>
                <div class="vid-info">
                  <div class="vi-title">${L(v,'title','title_en','title_ar','title_tr')}</div>
                  <div class="vi-views">▶ ${v.views} ${currentLang==='ar'?'مشاهدة':currentLang==='en'?'views':currentLang==='tr'?'görüntüleme':'ko\'rish'}${v.speaker ? ' • '+v.speaker : ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
    `;
  }

  // ============================================
  // FOUNDATION PAGE
  // ============================================
  function renderFoundationPage() {
    const t = DATA.i18n[currentLang];
    const h = {
      uz: { about:'Institut haqida', sub:'Imom Buxoriy Xalqaro Instituti – Missiya, Vazifa va Qadriyatlar',
            mission:'Missiyamiz', vision:'Vazifamiz', values:'Asosiy qadriyatlar',
            history:'Tarixiy bosqichlar', team:'Tadqiqotchi jamoa' },
      en: { about:'About the Institute', sub:'Mission, Vision and Values',
            mission:'Our Mission', vision:'Our Vision', values:'Core Values',
            history:'Historical Journey', team:'Research Team' },
      ar: { about:'حول المعهد', sub:'الرسالة والرؤية والقيم',
            mission:'مهمتنا', vision:'رؤيتنا', values:'القيم الأساسية',
            history:'المسيرة التاريخية', team:'فريق البحث' },
    }[currentLang] || {};

    const missionText = currentLang==='ar'
      ? 'مؤسسة IDE مؤسسة بحثية مستقلة تهدف إلى البحث في الأسس المنهجية للعلوم الإسلامية وتفسير التراث الفكري للفكر الإسلامي في سياق معاصر وتنشئة جيل جديد من الباحثين.'
      : currentLang==='en'
      ? 'The IDE Foundation is an independent research institution established to research the methodological foundations of Islamic sciences, interpret the intellectual heritage of Islamic thought in a contemporary context, and train a new generation of researchers.'
      : currentLang==='tr'
      ? 'İmam Buhari Uluslararası Enstitüsü, İslam medeniyetinin entelektüel mirasını araştıran bağımsız bir araştırma kuruluşudur.'
      : 'Imom Buxoriy Xalqaro Instituti — islom ilmlarining metodologik asoslarini tadqiq qilish, islom tafakkuri intellektual merosini zamonaviy kontekstda sharhlash va yangi avlod tadqiqotchilarni tayyorlash maqsadida tashkil etilgan mustaqil ilmiy-tadqiqot muassasasidir.';

    const visionText = currentLang==='ar'
      ? 'إعادة إنتاج الرصيد المعرفي للحضارة الإسلامية وفق المعايير الأكاديمية العالمية؛ والسعي إلى أن نكون مركزاً يطور الفكر الإسلامي بالاستناد إلى جذوره التقليدية والتحاور مع النقاشات المعاصرة.'
      : currentLang==='en'
      ? 'To reproduce the knowledge base of Islamic civilization to universal academic standards; to be a center that develops Islamic thought by both drawing from its traditional roots and engaging in dialogue with contemporary discussions.'
      : currentLang==='tr'
      ? 'İslam düşüncesini evrensel düzeyde tartışılan, araştırılan ve anlaşılan bir alan haline getirmek.'
      : 'Islom tsivilizatsiyasining bilim boyligini universal akademik standartlarda qayta ishlab chiqarish; islom tafakkurini an\'anaviy ildizlaridan oziqlanib, zamonaviy munozaralar bilan dialog qurib rivojlantiruvchi markaz bo\'lish.';

    const coreValues = [
      { icon:'📖',
        uz:['Ilmiy halollik','Har bir tadqiqotda akademik halollik va puxtalik'],
        en:['Academic Integrity','Academic honesty and rigor in every research'],
        ar:['النزاهة العلمية','الأمانة الأكاديمية والدقة في كل بحث'] },
      { icon:'🤝',
        uz:['Hamkorlik','Milliy va xalqaro olimlar bilan hamkorlik'],
        en:['Collaboration','Collaboration with national and international scholars'],
        ar:['التعاون','التعاون مع الأكاديميين الوطنيين والدوليين'] },
      { icon:'🌱',
        uz:['Yangilik','An\'anaviy bilimni zamonaviy usullar bilan uyg\'unlashtirish'],
        en:['Innovation','Bringing traditional knowledge together with modern methods'],
        ar:['الابتكار','الجمع بين المعرفة التقليدية والمناهج الحديثة'] },
      { icon:'🌍',
        uz:['Universallik','Butun insoniyatga qaratilgan keng qamrovli nuqtai nazar'],
        en:['Universality','A comprehensive perspective addressing all of humanity'],
        ar:['العالمية','منظور شامل يخاطب الإنسانية جمعاء'] },
    ];

    const timeline = [
      { date:'2009', uz:['Tashkil etilishi','Imom Buxoriy Xalqaro Instituti tashkil topildi. Birinchi tadqiqot dasturlari boshlandi.'],
        en:['Foundation','Imam Bukhari International Institute established. First research programs launched.'] },
      { date:'2011', uz:['Akademiya','Tadqiqotchilarni tayyorlash dasturlari bilan Akademiya ishga tushirildi.'],
        en:['Academy','Academy launched with researcher training programs.'] },
      { date:'2014', uz:['Xalqarolashtirish','Tashrif buyuruvchi olimlar dasturi bilan xalqaro hamkorliklar o\'rnatildi.'],
        en:['Internationalization','International partnerships established with the Visiting Scholar Program.'] },
      { date:'2017', uz:['Nashriyot seriyasi','Institut nashriyoti doirasida muntazam kitob va tadqiqot seriyalari boshlandi.'],
        en:['Publication Series','Systematic book and research series launched under Institute Publications.'] },
      { date:'2020', uz:['Raqamli o\'zgarish','Onlayn ta\'lim platformasi va raqamli kutubxona ishga tushirildi.'],
        en:['Digital Transformation','Online education platform and digital library launched.'] },
      { date:'2024', uz:['O\'sish','Tadqiqot yo\'nalishlari kengaytirildi; 48 tadqiqotchi bilan faoliyat davom ettirilmoqda.'],
        en:['Growth','Research areas expanded; activities continue with 48 researchers.'] },
    ];

    return `
    <div class="page" id="page-foundation">
      <div class="page-hero">
        <h1>${h.about}</h1>
        <p>${h.sub}</p>
      </div>

      <div class="g-2 mb-6">
        <div class="card card-hover">
          <div style="font-size:36px;margin-bottom:16px">🕌</div>
          <h3 style="font-size:17px;font-weight:700;color:var(--gold);margin-bottom:12px">${h.mission}</h3>
          <p style="font-size:13.5px;color:var(--text-2);line-height:1.8">${missionText}</p>
        </div>
        <div class="card card-hover">
          <div style="font-size:36px;margin-bottom:16px">🌟</div>
          <h3 style="font-size:17px;font-weight:700;color:var(--gold);margin-bottom:12px">${h.vision}</h3>
          <p style="font-size:13.5px;color:var(--text-2);line-height:1.8">${visionText}</p>
        </div>
      </div>

      ${sectionHead(h.values)}
      <div class="g-4 mb-6">
        ${coreValues.map(v => {
          const [title, desc] = currentLang==='en' ? v.en : currentLang==='ar' ? v.ar : currentLang==='tr' ? (v.tr || v.uz) : v.uz;
          return `
            <div class="card card-hover" style="text-align:center">
              <div style="font-size:32px;margin-bottom:12px">${v.icon}</div>
              <h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:8px">${title}</h4>
              <p style="font-size:12px;color:var(--text-2);line-height:1.6">${desc}</p>
            </div>
          `;
        }).join('')}
      </div>

      ${sectionHead(h.history)}
      <div class="card mb-6">
        <div class="timeline">
          ${timeline.map(item => {
            const [title, desc] = currentLang==='en' ? item.en : currentLang==='tr' ? (item.tr || item.uz) : item.uz;
            return `
              <div class="tl-item">
                <div class="tl-date">${item.date}</div>
                <div class="tl-title">${title}</div>
                <div class="tl-desc">${desc}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${sectionHead(h.team)}
      <div class="g-4">
        ${DATA.team.map(m => `
          <div class="team-card" onclick="openTeamModal('${m.id}')">
            <div class="team-avatar" style="${m.avatar ? 'padding:0;overflow:hidden' : (m.avatarColor ? 'background:linear-gradient(135deg,'+m.avatarColor+',var(--navy-500))' : '')}">
              ${m.avatar ? '<img src="'+m.avatar+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" />' : m.initials}
            </div>
            <h4>${m.name}</h4>
            <div class="team-role">${L(m,'role','role_en','role_ar','role_tr')}</div>
            <div class="team-dept">${L(m,'dept','dept_en','dept_ar','dept_tr')}</div>
            ${m.bio ? `<p style="font-size:11px;color:var(--text-3);line-height:1.5;margin-top:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${L(m,'bio','bio_en','bio_ar','bio_tr')}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  // ============================================
  // CORPORATE PAGE
  // ============================================
  function renderCorporatePage() {
    const isEn = currentLang === 'en';
    const boards = [
      { icon:'👑',
        uz:['Vasiylar kengashi','7 a\'zo','Institutning oliy qaror qabul qilish organi. Strategik yo\'nalishni belgilaydi va muhim qarorlarni tasdiqlaydi.'],
        en:['Board of Trustees','7 Members','The highest decision-making body of the foundation. Determines strategic direction and approves major decisions.'] },
      { icon:'🏛️',
        uz:['Oliy maslahat kengashi','15 a\'zo','Milliy va xalqaro taniqli olimlardan tashkil topgan maslahat organi.'],
        en:['High Consultative Council','15 Members','An advisory body composed of nationally and internationally recognized scholars.'] },
      { icon:'🎓',
        uz:['Akademik kengash','12 a\'zo','Tadqiqot dasturlarini va akademik faoliyatlarni muvofiqlashtiradi.'],
        en:['Academic Board','12 Members','Coordinates research programs and academic activities.'] },
    ];

    const orgMid   = isEn ? ['General Director','Research Director','Academy President'] : ['Bosh direktor','Tadqiqot direktori','Akademiya raisi'];
    const orgLeafs = isEn ? ['Research Units','Publication Unit','Academy Programs','International Relations','Administrative Affairs']
                          : ['Tadqiqot bo\'limlari','Nashriyot bo\'limi','Akademiya dasturlari','Xalqaro aloqalar','Ma\'muriy ishlar'];

    return `
    <div class="page" id="page-corporate">
      <div class="page-hero">
        <h1>${isEn ? 'Institutional Structure' : 'Tashkiliy tuzilma'}</h1>
        <p>${isEn ? 'Management and organizational structure of the Institute' : 'Institut boshqaruv va tashkiliy tuzilmasi'}</p>
      </div>

      <div class="g-3 mb-6">
        ${boards.map(b => {
          const [title, members, desc] = isEn ? b.en : b.uz;
          return `
            <div class="card card-hover">
              <div style="font-size:32px;margin-bottom:14px">${b.icon}</div>
              <h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:8px">${title}</h3>
              <span class="chip chip-gold" style="margin-bottom:12px;display:inline-flex">${members}</span>
              <p style="font-size:13px;color:var(--text-2);line-height:1.7">${desc}</p>
            </div>
          `;
        }).join('')}
      </div>

      ${sectionHead(isEn ? 'Organizational Chart' : 'Tashkiliy sxema')}
      <div class="card mb-6" style="text-align:center;padding:40px 24px">
        <div class="org-box">${isEn ? 'Board of Trustees' : 'Vasiylar kengashi'}</div>
        <div class="org-line" style="height:28px;margin:0 auto"></div>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">
          ${orgMid.map(t => `
            <div style="display:flex;flex-direction:column;align-items:center">
              <div class="org-line" style="height:24px"></div>
              <div class="org-mid">${t}</div>
            </div>
          `).join('')}
        </div>
        <div class="org-line" style="height:28px;margin:0 auto"></div>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap">
          ${orgLeafs.map(t => `<div class="org-leaf">${t}</div>`).join('')}
        </div>
      </div>

      ${sectionHead(isEn ? 'Annual Reports' : 'Yillik hisobotlar')}
      <div style="display:flex;flex-direction:column;gap:10px">
        ${[2024, 2023, 2022, 2021, 2020].map(year => `
          <div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px">
            <div style="display:flex;align-items:center;gap:14px">
              <span style="font-size:24px">📊</span>
              <div>
                <div style="font-size:14px;font-weight:600;color:var(--text-1)">${isEn ? 'Annual Report' : 'Yillik hisobot'} ${year}</div>
                <div style="font-size:12px;color:var(--text-3)">${isEn ? 'Summary of research, academy and institutional activities' : 'Tadqiqot, akademiya va muassasa faoliyati xulosasi'}</div>
              </div>
            </div>
            <button class="btn btn-gold btn-sm"
                    onclick="showToast('${year} ${isEn ? 'report downloading' : 'hisobot yuklab olinmoqda'}...', 'info', '📥')">
              ${isEn ? '📥 Download' : '📥 Yuklab olish'}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  // ============================================
  // RESEARCH PAGE
  // ============================================
  function renderResearchPage() {
    const areas = DATA.researchAreas;
    const isEn  = currentLang === 'en';
    const isAr  = currentLang === 'ar';
    const lbl   = isAr ? 'مجالات البحث' : isEn ? 'Research Areas' : 'Tadqiqot yo\'nalishlari';
    const sub   = isAr ? 'موضوعات ومشاريع البحث الأساسية للمعهد' : isEn ? 'Institute\'s core research topics and projects' : 'Institutning asosiy tadqiqot mavzulari va loyihalari';

    const projects = [
      { uz:'Klassik islom matnlarining raqamli arxivi',      en:'Digital Archive of Classical Islamic Texts',      status:'Davom etmoqda', sc:'chip-gold',  prog:68, team:5 },
      { uz:'Usul al-fiqh va zamonaviy huquq: Tahlil',        en:'Usul al-Fiqh and Contemporary Law: Analysis',     status:'Davom etmoqda', sc:'chip-gold',  prog:45, team:3 },
      { uz:'Islom dunyosida atrof-muhit axloqi',             en:'Environmental Ethics in the Islamic World',       status:'Yangi boshlangan', sc:'chip-blue',  prog:15, team:4 },
      { uz:'O\'rta asr islom falsafasida siyosat nazariyasi', en:'Political Theory in Medieval Islamic Philosophy', status:'Yakunlangan',   sc:'chip-green', prog:100, team:2 },
    ];

    return `
    <div class="page" id="page-research">
      <div class="page-hero">
        <h1>${lbl}</h1>
        <p>${sub}</p>
      </div>

      <div class="g-2 mb-6">
        ${areas.map(a => `
          <div class="card card-hover" style="cursor:pointer" onclick="openResearchModal(${a.id})">
            <div style="display:flex;align-items:flex-start;gap:16px">
              <div style="width:52px;height:52px;background:rgba(228,183,58,0.1);border:1px solid rgba(228,183,58,.18);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${a.icon}</div>
              <div style="flex:1">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:7px;gap:8px">
                  <h3 style="font-size:15px;font-weight:700;color:var(--text-1)">${L(a,'title','title_en','title_ar','title_tr')}</h3>
                  <span class="chip chip-gold">${a.count}</span>
                </div>
                <p style="font-size:13px;color:var(--text-2);line-height:1.6;margin-bottom:12px">${L(a,'desc','desc_en','desc_ar','desc_tr')}</p>
                <div class="progress">
                  <div class="progress-bar" style="width:0%" data-width="${Math.min(100, a.count * 1.8)}"></div>
                </div>
                <div style="font-size:11px;color:var(--text-3);margin-top:5px">${a.count} ${isAr?'دراسة':isEn?'studies':'tadqiqot'}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      ${sectionHead(isAr ? 'المشاريع النشطة' : isEn ? 'Active Projects' : 'Faol loyihalar')}
      <div style="display:flex;flex-direction:column;gap:10px">
        ${projects.map(p => `
          <div class="card" style="padding:18px 22px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:12px">
              <h4 style="font-size:14px;font-weight:600;color:var(--text-1)">${isEn ? p.en : p.uz}</h4>
              <span class="chip ${p.sc}" style="flex-shrink:0">${p.status}</span>
            </div>
            <div style="display:flex;align-items:center;gap:12px">
              <div class="progress" style="flex:1">
                <div class="progress-bar" style="width:0%" data-width="${p.prog}"></div>
              </div>
              <span style="font-size:12px;color:var(--text-3);min-width:36px">${p.prog}%</span>
              <span style="font-size:12px;color:var(--text-3)">👥 ${p.team}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  // ============================================
  // ACADEMY PAGE
  // ============================================
  function renderAcademyPage() {
    const programs = DATA.programs;
    const isEn = currentLang === 'en';
    const isAr = currentLang === 'ar';

    const scheduleItems = [
      { month:'Yanvar / January 2025',  items:['Asosiy islom ilmlari – 3-semestr | Foundations – Term 3','Onlayn Maqosid darslari – 1-sessiya | Maqasid Lessons – Session 1'] },
      { month:'Fevral / February 2025', items:['Dissertatsiya ustaxonasi | Thesis Workshop','Usul ilg\'or daraja – Oraliq baholash | Advanced Usul – Mid-Term'] },
      { month:'Mart / March 2025',     items:['Klassik matn o\'qish – Yangi semestr | Classical Text – New Term','Xalqaro simpozium | International Symposium'] },
      { month:'Aprel / April 2025',    items:['Akademiya bitirish marosimi | Academy Graduation','Yozgi semestr arizalari | Summer Term Applications'] },
    ];

    const requirements = isEn
      ? ['BA in Theology, Philosophy or related field','Basic Arabic knowledge (for some programs)','Motivation letter','Transcript and CV']
      : ['Ilohiyot, Falsafa yoki tegishli sohada bakalavr','Asosiy arab tili bilimi (ba\'zi dasturlar uchun)','Motivatsion xat','Transkript va CV'];

    return `
    <div class="page" id="page-academy">
      <div class="page-hero">
        <h1>${isAr ? 'أكاديمية المعهد' : isEn ? 'Academy' : 'Akademiya'}</h1>
        <p>${isEn ? 'Researcher training programs and courses' : isAr ? 'برامج تدريب الباحثين والدورات' : 'Tadqiqotchilarni tayyorlash dasturlari va kurslar'}</p>
      </div>

      <div class="tabs-wrap" id="academy-tabs">
        <button class="tab-btn active" onclick="switchTab('academy','programs')">📘 ${isEn?'Programs':isAr?'البرامج':'Dasturlar'}</button>
        <button class="tab-btn"        onclick="switchTab('academy','schedule')">📅 ${isEn?'Schedule':isAr?'الجدول':'Taqvim'}</button>
        <button class="tab-btn"        onclick="switchTab('academy','apply')">✍️ ${isEn?'Apply':isAr?'التقديم':'Ariza'}</button>
        <button class="tab-btn"        onclick="switchTab('academy','faq')">❓ ${isEn?'FAQ':isAr?'الأسئلة':'TSS'}</button>
      </div>

      <div class="tab-content active" id="academy-programs">
        <div class="g-3">
          ${programs.map(p => `
            <div class="card card-hover" style="cursor:pointer" onclick="openProgramModal(${p.id})">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
                <span style="font-size:32px">${p.icon}</span>
                <span class="chip ${p.status==='active' ? 'chip-green' : 'chip-blue'}">
                  ${p.status==='active' ? (isEn?'Active':isAr?'نشط':'Faol') : (isEn?'Upcoming':isAr?'قريباً':'Tez kunda')}
                </span>
              </div>
              <h3 style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:10px;line-height:1.4">
                ${L(p,'title','title_en','title_ar','title_tr')}
              </h3>
              <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px">
                <div style="font-size:12px;color:var(--text-3)">⏱ ${p.duration} &nbsp;|&nbsp; 📊 ${p.level}</div>
                <div style="font-size:12px;color:var(--text-3)">🌐 ${p.lang}</div>
                <div style="font-size:12px;color:var(--text-3)">👥 ${p.students} ${isEn?'students':isAr?'طالب':'talaba'}</div>
              </div>
              <div class="progress">
                <div class="progress-bar" style="width:0%" data-width="${Math.min(100,p.students*1.5)}"></div>
              </div>
              <button class="btn btn-gold w-full" style="margin-top:14px;font-size:12px"
                      onclick="event.stopPropagation();applyProgram(${p.id})">
                ${isEn?'Apply':isAr?'تقدم':'Ariza berish'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="tab-content" id="academy-schedule">
        <div class="card">
          <h3 style="font-size:16px;font-weight:700;margin-bottom:20px;color:var(--gold)">📅 2025 ${isEn?'Education Calendar':'Ta\'lim taqvimi'}</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${scheduleItems.map(m => `
              <div style="padding:16px;background:var(--surface-2);border-radius:10px;border:1px solid var(--border-1)">
                <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:10px">📌 ${m.month}</div>
                ${m.items.map(i => `
                  <div style="font-size:12.5px;color:var(--text-2);margin-bottom:6px;padding-left:12px;border-left:2px solid var(--gold)">• ${i}</div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="tab-content" id="academy-apply">
        <div class="g-2">
          <div class="card">
            <h3 style="font-size:16px;font-weight:700;color:var(--gold);margin-bottom:20px">✍️ ${isEn?'Application Form':isAr?'نموذج التقديم':'Ariza shakli'}</h3>
            <form onsubmit="submitApplication(event)">
              <div class="form-group">
                <label class="form-label">${isEn?'Full Name':isAr?'الاسم الكامل':'Ism Familiya'}</label>
                <input class="form-input" type="text" placeholder="${isEn?'Your full name':'Ismingiz va familiyangiz'}" required />
              </div>
              <div class="form-group">
                <label class="form-label">${isEn?'Email':isAr?'البريد الإلكتروني':'Elektron pochta'}</label>
                <input class="form-input" type="email" placeholder="ornek@email.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">${isEn?'Program':'Tanlangan dastur'}</label>
                <select class="form-select">
                  ${DATA.programs.map(p => `<option value="${p.id}">${L(p,'title','title_en','title_ar','title_tr')}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${isEn?'Academic Background':'Akademik tajriba'}</label>
                <select class="form-select">
                  ${(isEn
                    ? ['Undergraduate Student','Bachelor Graduate','Master\'s Student','Master\'s Graduate','PhD Student','Dr. / Academic']
                    : ['Bakalavr talabasi','Bakalavr bitiruvchisi','Magistratura talabasi','Magistr','Doktorant','PhD / Olim']
                  ).map(o => `<option>${o}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">${isEn?'Motivation Letter':'Motivatsion xat'}</label>
                <textarea class="form-textarea" placeholder="${isEn?'Why are you applying to this program?':'Nega bu dasturga ariza beryapsiz?'}"></textarea>
              </div>
              <button type="submit" class="btn btn-gold w-full">${isEn?'Submit Application':isAr?'إرسال الطلب':'Arizani yuborish'}</button>
            </form>
          </div>
          <div>
            <div class="card mb-4">
              <h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:14px">📋 ${isEn?'Requirements':'Ariza shartlari'}</h4>
              ${requirements.map(c => `
                <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:9px;font-size:12.5px;color:var(--text-2)">
                  <span style="color:var(--gold);flex-shrink:0;font-weight:700">✓</span> ${c}
                </div>
              `).join('')}
            </div>
            <div class="card">
              <h4 style="font-size:14px;font-weight:700;color:var(--gold);margin-bottom:12px">📞 ${isEn?'Support':'Ariza yordami'}</h4>
              <p style="font-size:12.5px;color:var(--text-2);line-height:1.7">
                ${isEn ? 'For questions about the application process, please contact the academy unit.' : 'Ariza jarayoni bo\'yicha savollaringiz uchun akademiya bo\'limiga murojaat qiling.'}
              </p>
              <div style="margin-top:12px;font-size:13px;color:var(--text-1)">📧 academy@imambukhari.uz</div>
              <div style="font-size:13px;color:var(--text-1);margin-top:5px">📞 +998 XX XXX XX XX</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="academy-faq">
        <div style="max-width:720px">
          ${DATA.faq.map((f, i) => `
            <div class="acc-item" id="acc-${i}">
              <div class="acc-header" onclick="toggleAccordion('acc-${i}')">
                <span>${L(f,'q','q_en','q_ar','q_tr')}</span>
                <span class="acc-arrow">▾</span>
              </div>
              <div class="acc-body">${L(f,'a','a_en','a_ar','a_tr')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  }

  // ============================================
  // INTERNATIONAL PAGE
  // ============================================
  function renderInternationalPage() {
    const isEn = currentLang === 'en';

    const programs = [
      { icon:'🌍',
        uz:['Mehmon olim','Xalqaro tadqiqotchilar uchun IBXI tarkibida ishlash imkoniyati. Muddatli arizalar qabul qilinadi.','Ochiq'],
        en:['Visiting Scholar','Opportunity for international researchers to work within IDE. Periodic applications are accepted.','Open'] },
      { icon:'🤝',
        uz:['Qo\'shma tadqiqot','Xorijiy universitet va institutlar bilan qo\'shma tadqiqot loyihalari va nashrlar.','Faol'],
        en:['Joint Research','Joint research projects and publications with universities and institutes abroad.','Active'] },
      { icon:'🎓',
        uz:['Grant dasturi','Xalqaro talaba va tadqiqotchilar uchun grant imkoniyatlari va qo\'llab-quvvatlash dasturlari.','2025'],
        en:['Scholarship Program','Scholarship opportunities and support programs for international students and researchers.','2025'] },
      { icon:'📡',
        uz:['Xalqaro konferensiyalar','Yilda ikki marta o\'tkaziladigan xalqaro akademik konferensiyalar.','Yillik'],
        en:['International Conferences','International academic conferences held twice a year.','Annual'] },
    ];

    const partners = [
      { name:'IRCICA',       country:'Istanbul, Turkiya',          emoji:'🇹🇷' },
      { name:'ISESCO',       country:'Rabat, Marokash',           emoji:'🇲🇦' },
      { name:'IIIT',         country:'Virginia, AQSh',            emoji:'🇺🇸' },
      { name:'Al-Azhar',     country:'Qohira, Misr',              emoji:'🇪🇬' },
      { name:'ISTAC',        country:'Kuala Lumpur',               emoji:'🇲🇾' },
      { name:'Umm al-Qura',  country:'Makka, Saudiya Arabistoni', emoji:'🇸🇦' },
      { name:'Jordan Univ.', country:'Amman, Iordaniya',          emoji:'🇯🇴' },
      { name:'SOAS',         country:'London, Buyuk Britaniya',   emoji:'🇬🇧' },
    ];

    const programDetails = [
      ['📅', isEn?'Duration':'Muddat',           isEn?'1–6 months':'1-6 oy'],
      ['🏢', isEn?'Workspace':'Ish joyi',        isEn?'Private office':'Shaxsiy ofis imkoniyati'],
      ['📖', isEn?'Library':'Kutubxona',          isEn?'Full access':'To\'liq foydalanish'],
      ['🤝', isEn?'Mentoring':'Mentorlik',        isEn?'Senior researcher support':'Tajribali tadqiqotchi yordami'],
      ['✈️', isEn?'Housing':'Turar joy',          isEn?'Recommendation list':'Tavsiya ro\'yxati beriladi'],
      ['💰', isEn?'Grant':'Grant',                isEn?'For selected applicants':'Tanlangan arizachilar uchun'],
    ];

    return `
    <div class="page" id="page-international">
      <div class="page-hero">
        <h1>${isEn ? 'International Programs' : 'Xalqaro dasturlar'}</h1>
        <p>${isEn ? 'Global research cooperation, visiting scholar and scholarship programs' : 'Global tadqiqot hamkorliklari, mehmon olim va grant dasturlari'}</p>
      </div>

      <div class="g-2 mb-6">
        ${programs.map(p => {
          const [title, desc, badge] = isEn ? p.en : p.uz;
          return `
            <div class="card card-hover">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
                <span style="font-size:32px">${p.icon}</span>
                <div>
                  <h3 style="font-size:15px;font-weight:700;color:var(--text-1)">${title}</h3>
                  <span class="chip chip-gold" style="margin-top:5px;display:inline-flex">${badge}</span>
                </div>
              </div>
              <p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:14px">${desc}</p>
              <button class="btn btn-gold btn-sm"
                      onclick="showToast('${isEn ? 'Application form opening...' : 'Ariza shakli ochilmoqda...'}', 'info', '📋')">
                ${isEn ? 'Details' : 'Batafsil'}
              </button>
            </div>
          `;
        }).join('')}
      </div>

      ${sectionHead(isEn ? 'Partner Institutions' : 'Hamkor tashkilotlar')}
      <div class="g-4 mb-6">
        ${partners.map(i => `
          <div class="card card-hover" style="text-align:center;padding:18px;cursor:pointer"
               onclick="showToast('${i.name} – ${i.country}', 'info', '${i.emoji}')">
            <div style="font-size:28px;margin-bottom:8px">${i.emoji}</div>
            <div style="font-size:14px;font-weight:600;color:var(--text-1)">${i.name}</div>
            <div style="font-size:11.5px;color:var(--text-3);margin-top:3px">${i.country}</div>
          </div>
        `).join('')}
      </div>

      ${sectionHead(isEn ? 'Visiting Scholar Application' : 'Mehmon olim arizasi')}
      <div class="g-2">
        <div class="card">
          <form onsubmit="submitVisiting(event)">
            <div class="form-group">
              <label class="form-label">To'liq ism</label>
              <input class="form-input" type="text" placeholder="To'liq ismingiz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Muassasa</label>
              <input class="form-input" type="text" placeholder="Muassasangiz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Davlat</label>
              <input class="form-input" type="text" placeholder="Davlatingiz" required />
            </div>
            <div class="form-group">
              <label class="form-label">Muddat</label>
              <select class="form-select">
                <option>1 oy</option>
                <option>2 oy</option>
                <option>3 oy</option>
                <option>6 oy</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Tadqiqot mavzusi</label>
              <textarea class="form-textarea" placeholder="Tadqiqot loyihangizni tasvirlab bering..." required></textarea>
            </div>
            <button type="submit" class="btn btn-gold w-full">Yuborish</button>
          </form>
        </div>
        <div class="card">
          <h4 style="font-size:15px;font-weight:700;color:var(--gold);margin-bottom:16px">${isEn ? 'Program Details' : 'Dastur tafsilotlari'}</h4>
          ${programDetails.map(d => `
            <div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border-1)">
              <span style="font-size:18px">${d[0]}</span>
              <div>
                <div style="font-size:11.5px;color:var(--text-3);font-weight:600">${d[1]}</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${d[2]}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  }

  // ============================================
  // PUBLICATIONS PAGE
  // ============================================
  function renderPublicationsPage() {
    const pubs = DATA.publications;
    const isEn = currentLang === 'en';

    const journals = [
      { name:'Islom tadqiqotlari jurnali', issues:28, freq: isEn?'Twice a Year':'Yilda 2 marta', icon:'📰' },
      { name:'Akademiya byulleteni',         issues:15, freq: isEn?'3 Times a Year':'Yilda 3 marta', icon:'📋' },
      { name:'Usul: Islom tadqiqotlari',     issues:42, freq: isEn?'Twice a Year':'Yilda 2 marta', icon:'📖' },
    ];

    return `
    <div class="page" id="page-publications">
      <div class="page-hero">
        <h1>${currentLang==='ar' ? 'المنشورات' : isEn ? 'Publications' : currentLang==='tr' ? 'Yayınlar' : 'Nashrlar'}</h1>
        <p>${isEn ? '200+ academic books, articles and journals' : '200+ akademik kitob, maqola va jurnal'}</p>
      </div>

      <div class="tabs-wrap" id="pub-tabs">
        <button class="tab-btn active" onclick="switchTab('pub','all')">📚 ${isEn?'All':'Barchasi'}</button>
        <button class="tab-btn"        onclick="switchTab('pub','books')">📖 ${isEn?'Books':'Kitoblar'}</button>
        <button class="tab-btn"        onclick="switchTab('pub','articles')">📄 ${isEn?'Articles':'Maqolalar'}</button>
        <button class="tab-btn"        onclick="switchTab('pub','journals')">📰 ${isEn?'Journals':'Jurnallar'}</button>
      </div>

      <div class="tab-content active" id="pub-all">
        ${renderPubList(pubs)}
      </div>
      <div class="tab-content" id="pub-books">
        ${renderPubList(pubs.filter(p => p.type === 'Kitap'))}
      </div>
      <div class="tab-content" id="pub-articles">
        ${renderPubList(pubs.filter(p => p.type !== 'Kitap'))}
        </div>
      </div>
      <div class="tab-content" id="pub-journals">
        <div class="g-2">
          ${journals.map(j => `
            <div class="card card-hover">
              <div style="display:flex;gap:14px;align-items:flex-start">
                <span style="font-size:36px;flex-shrink:0">${j.icon}</span>
                <div>
                  <h4 style="font-size:14px;font-weight:700;color:var(--text-1)">${j.name}</h4>
                  <div style="font-size:12px;color:var(--text-3);margin-top:3px">${j.issues} ${isEn?'Issues':'Son'} • ${j.freq}</div>
                  <div style="display:flex;gap:8px;margin-top:12px">
                    <button class="btn btn-gold btn-sm"
                            onclick="showToast('${j.name.replace(/'/g,"&#39;")} ${isEn?'opening':'ochilmoqda'}...', 'info', '${j.icon}')">
                      ${isEn?'View':'Ko\'rish'}
                    </button>
                    <button class="btn btn-ghost btn-sm"
                            onclick="showToast('${isEn?'Added to reading list':'O\'qish ro\'yxatiga qo\'shildi'}', 'success', '🔖')">
                      🔖 ${isEn?'Save':'Saqlash'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  }

  function renderPubList(pubs) {
    const isEn = currentLang === 'en';
    if (!pubs.length) {
      return `<div class="card" style="text-align:center;padding:40px;color:var(--text-3)">
        ${isEn ? 'No publications found.' : 'Nashr topilmadi.'}
      </div>`;
    }
    return `<div style="display:flex;flex-direction:column;gap:12px">
      ${pubs.map(p => `
        <div class="pub-row" onclick="openPubModal(${p.id})">
          <div class="pub-spine" style="${p.coverImage ? 'padding:0;overflow:hidden' : 'background:linear-gradient(135deg,'+p.color+',#0e3526)'}">
            ${p.coverImage
              ? '<img src="'+p.coverImage+'" alt="" style="width:100%;height:100%;object-fit:cover" />'
              : '<span>'+p.abbr+'</span>'}
          </div>
          <div class="pub-info">
            <h4>${isEn ? p.title_en : p.title}</h4>
            <div class="pub-author">✍️ ${p.author}</div>
            <p class="pub-desc">${p.desc}</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <span class="chip chip-gold">${p.type}</span>
              <span style="font-size:12px;color:var(--text-3)">📅 ${p.year}</span>
              ${p.pages ? `<span style="font-size:11px;color:var(--text-3)">📄 ${p.pages} ${isEn?'pages':'sahifa'}</span>` : ''}
              ${readingList.includes(p.id) ? '<span class="chip chip-green">🔖 ' + (isEn?'Saved':'Saqlangan') + '</span>' : ''}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;justify-content:center;flex-shrink:0">
            <button class="btn btn-gold btn-sm"
                    onclick="event.stopPropagation();showToast('${isEn?'Downloading PDF...':'PDF yuklab olinmoqda...'}', 'info', '📥')">
              📥 PDF
            </button>
            <button class="btn btn-ghost btn-sm"
                    onclick="event.stopPropagation();saveToReadingList(${p.id})">
              🔖 ${isEn?'Save':'Saqlash'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  // ============================================
  // BLOG PAGE
  // ============================================
  function renderBlogPage() {
    const t = DATA.i18n[currentLang];
    const isEn = currentLang === 'en';
    const isAr = currentLang === 'ar';
    const posts = DATA.blogPosts;
    const categories = [...new Set(posts.map(b => b.category))];

    return `
    <div class="page" id="page-blog">
      <div class="page-hero">
        <h1>${t.section_blog}</h1>
        <p>${isEn ? 'Academic articles, research insights and scholarly reflections' : isAr ? 'مقالات أكاديمية ورؤى بحثية وتأملات علمية' : 'Akademik maqolalar, tadqiqot eslatmalari va ilmiy baholashlar'}</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">
        <button class="tab-btn active" onclick="filterBlog(this,'all')">${t.filter_all}</button>
        ${categories.map(c => `<button class="tab-btn" onclick="filterBlog(this,'${c}')">${c}</button>`).join('')}
      </div>

      <div class="g-3" id="blog-grid">
        ${posts.map(b => `
          <div class="card card-hover blog-card" data-cat="${b.category}" style="cursor:pointer;overflow:hidden" onclick="openBlogModal(${b.id})">
            <div style="height:6px;background:linear-gradient(135deg,${b.color},var(--gold));border-radius:3px;margin-bottom:16px"></div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
              <span class="chip chip-gold" style="font-size:10px">${b.category}</span>
              <span style="font-size:11px;color:var(--text-3)">📅 ${b.date}</span>
            </div>
            <h3 style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">${L(b,'title','title_en','title_ar','title_tr')}</h3>
            <p style="font-size:12.5px;color:var(--text-3);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:14px">${L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;font-size:11.5px;color:var(--text-3);border-top:1px solid var(--border-1);padding-top:12px">
              <span>✍️ ${b.author}</span>
              <span>⏱ ${b.readTime}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  window.filterBlog = function (btn, cat) {
    btn.closest('div').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.blog-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  };

  window.openBlogModal = function (id) {
    const b = DATA.blogPosts.find(x => x.id === id);
    if (!b) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="margin-bottom:16px">
        <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <span class="chip chip-gold">${b.category}</span>
          <span style="font-size:12px;color:var(--text-3)">📅 ${b.date}</span>
          <span style="font-size:12px;color:var(--text-3)">⏱ ${b.readTime}</span>
        </div>
        <h2 style="font-size:18px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:12px">${L(b,'title','title_en','title_ar','title_tr')}</h2>
        <div style="font-size:13px;color:var(--gold);font-weight:600;margin-bottom:16px">✍️ ${b.author}</div>
      </div>
      <p style="font-size:13.5px;color:var(--text-2);line-height:1.9;margin-bottom:16px">${L(b,'excerpt','excerpt_en','excerpt_ar','excerpt_tr')}</p>
      ${b.tags ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">${b.tags.map(t => `<span class="chip chip-blue" style="font-size:10px">#${t}</span>`).join('')}</div>` : ''}
      <div style="display:flex;gap:10px">
        <button class="btn btn-gold"
                onclick="showToast('${isEn?'Sharing...':'Ulashilmoqda...'}','info','📤');closeModal('news-modal')">
          📤 ${isEn?'Share':'Ulashish'}
        </button>
        <button class="btn btn-ghost"
                onclick="navigateTo('blog');closeModal('news-modal')">
          ${isEn?'All Articles':'Barcha maqolalar'}
        </button>
      </div>
    `;
    openModal('news-modal');
  };

  // ============================================
  // GALLERY PAGE
  // ============================================
  function renderGalleryPage() {
    const t = DATA.i18n[currentLang];
    const isEn = currentLang === 'en';
    const isAr = currentLang === 'ar';
    const items = DATA.gallery;
    const categories = [...new Set(items.map(g => g.category))];

    return `
    <div class="page" id="page-gallery">
      <div class="page-hero">
        <h1>${t.section_gallery}</h1>
        <p>${isEn ? 'Events, conferences, campus and institutional photos' : isAr ? 'صور الفعاليات والمؤتمرات والحرم الجامعي' : 'Tadbirlar, konferensiyalar, kampus va muassasa suratlari'}</p>
      </div>

      <div style="display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap">
        <button class="tab-btn active" onclick="filterGallery(this,'all')">${t.filter_all}</button>
        ${categories.map(c => `<button class="tab-btn" onclick="filterGallery(this,'${c}')">${c}</button>`).join('')}
      </div>

      <div class="g-3" id="gallery-grid">
        ${items.map(g => `
          <div class="card card-hover gallery-card" data-cat="${g.category}" style="cursor:pointer;overflow:hidden;padding:0"
               onclick="openGalleryModal(${g.id})">
            <div style="height:160px;${g.coverImage ? '' : 'background:linear-gradient(135deg,'+g.color+',#0e3526);'}display:flex;align-items:center;justify-content:center;position:relative">
              ${g.coverImage
                ? '<img src="'+g.coverImage+'" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />'
                : '<span style="font-size:48px;opacity:0.8;position:relative;z-index:1">'+g.icon+'</span>'}
              <div style="position:absolute;bottom:10px;right:12px;background:rgba(0,0,0,0.6);color:#fff;font-size:11px;padding:4px 10px;border-radius:20px">📷 ${g.count}</div>
            </div>
            <div style="padding:14px 16px">
              <span class="chip chip-gold" style="font-size:10px;margin-bottom:8px;display:inline-flex">${g.category}</span>
              <h4 style="font-size:14px;font-weight:600;color:var(--text-1);line-height:1.4;margin-bottom:6px">${L(g,'title','title_en','title_ar','title_tr')}</h4>
              <div style="font-size:11px;color:var(--text-3)">📅 ${g.date}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  window.filterGallery = function (btn, cat) {
    btn.closest('div').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.gallery-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  };

  window.openGalleryModal = function (id) {
    const g = DATA.gallery.find(x => x.id === id);
    if (!g) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="height:200px;${g.coverImage ? '' : 'background:linear-gradient(135deg,'+g.color+',#0e3526);'}border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;position:relative;overflow:hidden">
        ${g.coverImage
          ? '<img src="'+g.coverImage+'" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />'
          : '<span style="font-size:72px;opacity:0.8;position:relative;z-index:1">'+g.icon+'</span>'}
        <div style="position:absolute;bottom:12px;right:16px;background:rgba(0,0,0,0.6);color:#fff;font-size:12px;padding:5px 12px;border-radius:20px">📷 ${g.count} ${isEn?'photos':'surat'}</div>
      </div>
      <h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-bottom:10px">${L(g,'title','title_en','title_ar','title_tr')}</h2>
      <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <span class="chip chip-gold">${g.category}</span>
        <span style="font-size:12px;color:var(--text-3)">📅 ${g.date}</span>
      </div>
      <button class="btn btn-gold"
              onclick="showToast('${isEn?'Loading gallery...':'Galereya yuklanmoqda...'}','info','🖼️');closeModal('news-modal')">
        🖼️ ${isEn?'View Gallery':'Galereyani ko\'rish'}
      </button>
    `;
    openModal('news-modal');
  };

  // ============================================
  // ARCHIVE PAGE
  // ============================================
  function renderArchivePage() {
    const allNews = DATA.news;
    const isEn = currentLang === 'en';
    const cats = isEn
      ? ['All','Event','Publication','Academy','Research','International']
      : ['Barchasi','Tadbir','Nashr','Akademiya','Tadqiqot','Xalqaro'];

    return `
    <div class="page" id="page-archive">
      <div class="page-hero">
        <h1>${isEn ? 'News & Archive' : 'Yangiliklar & Arxiv'}</h1>
        <p>${isEn ? 'All news, events, publications and activities' : 'Barcha yangiliklar, tadbirlar, nashrlar va faoliyatlar'}</p>
      </div>

      <div style="display:flex;gap:12px;align-items:center;margin-bottom:24px;flex-wrap:wrap">
        <div class="search-box" style="width:280px;flex-shrink:0">
          <span class="si">🔍</span>
          <input type="text" id="archive-search-input"
                 placeholder="${isEn ? 'Search news...' : 'Yangilik qidirish...'}"
                 oninput="archiveTextQ=this.value;applyArchiveFilter()" />
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap" id="archive-cat-buttons">
          ${(() => {
            const catValues = ['Barchasi','Tadbir','Nashr','Akademiya','Tadqiqot','Xalqaro'];
            return cats.map((cat, i) => `
              <button class="tab-btn ${i===0?'active':''}"
                      style="padding:7px 14px;font-size:12px"
                      onclick="setArchiveCat(this,'${catValues[i]}')">
                ${cat}
              </button>
            `).join('');
          })()}
        </div>
      </div>

      <div id="archive-count" style="font-size:12px;color:var(--text-3);margin-bottom:14px">
        ${allNews.length} ${isEn?'results':'natija'}
      </div>

      <div id="archive-list" style="display:flex;flex-direction:column;gap:10px">
        ${allNews.map(n => `
          <div class="card archive-item"
               data-category="${n.category}"
               data-uz="${n.title.toLowerCase()}"
               data-en="${n.title_en.toLowerCase()}"
               style="display:flex;gap:16px;padding:16px;cursor:pointer"
               onclick="openNewsModal(${n.id})">
            <div style="width:60px;height:60px;${n.image ? 'overflow:hidden' : 'background:linear-gradient(135deg,'+n.color+',#0e3526)'};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">
              ${n.image ? '<img src="'+n.image+'" alt="" style="width:100%;height:100%;object-fit:cover" />' : n.icon}
            </div>
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
                <span class="chip chip-gold" style="font-size:10px">${L(n,'tag','tag_en','tag_ar','tag_tr')}</span>
                <span style="font-size:11px;color:var(--text-3)">📅 ${n.date}</span>
              </div>
              <h4 style="font-size:14px;font-weight:600;color:var(--text-1);line-height:1.5">
                ${L(n,'title','title_en','title_ar','title_tr')}
              </h4>
            </div>
            <div style="display:flex;align-items:center;flex-shrink:0">
              <span style="font-size:18px;color:var(--text-3)">›</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  // ============================================
  // CONTACT PAGE
  // ============================================
  function renderContactPage() {
    const isEn = currentLang === 'en';
    const isAr = currentLang === 'ar';

    const contactInfo = [
      { icon:'📍', uz:['Manzil','Samarqand sh., O\'zbekiston'],
                   en:['Address','Samarkand, Uzbekistan'] },
      { icon:'📞', uz:['Telefon','+998 XX XXX XX XX'],
                   en:['Phone','+998 XX XXX XX XX'] },
      { icon:'📧', uz:['E-pochta','info@imambukhari.uz'],
                   en:['Email','info@imambukhari.uz'] },
      { icon:'🕐', uz:['Ish vaqti','Dush–Jum: 09:00 – 18:00'],
                   en:['Working Hours','Mon–Fri: 09:00 – 18:00'] },
    ];

    const socialLinks = [
      { icon:'🐦', name:'X (Twitter)', handle:'@imambukhari_uz' },
      { icon:'▶️', name:'YouTube',     handle:'Imom Buxoriy Instituti' },
      { icon:'📘', name:'Facebook',    handle:'imambukhari.uz' },
      { icon:'📸', name:'Instagram',   handle:'@imambukhari_uz' },
    ];

    return `
    <div class="page" id="page-contact">
      <div class="page-hero">
        <h1>${isAr ? 'اتصل بنا' : isEn ? 'Contact' : 'Aloqa'}</h1>
        <p>${isEn ? 'Get in touch with our team' : isAr ? 'تواصل مع فريقنا' : 'Biz bilan bog\'laning'}</p>
      </div>

      <div class="g-2 mb-6">
        <div class="card">
          <h3 style="font-size:16px;font-weight:700;color:var(--gold);margin-bottom:20px">
            ✉️ ${isEn ? 'Send a Message' : isAr ? 'أرسل رسالة' : 'Bizga xabar yuboring'}
          </h3>
          <form onsubmit="submitContact(event)">
            <div class="form-group">
              <label class="form-label">${isEn?'Full Name':isAr?'الاسم الكامل':'Ismingiz'}</label>
              <input class="form-input" type="text"
                     placeholder="${isEn?'Your full name':isAr?'اسمك الكامل':'Ismingiz va familiyangiz'}" required />
            </div>
            <div class="form-group">
              <label class="form-label">${isEn?'Email':isAr?'البريد الإلكتروني':'Elektron pochtangiz'}</label>
              <input class="form-input" type="email" placeholder="email@ornek.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">${isEn?'Subject':isAr?'الموضوع':'Mavzu'}</label>
              <select class="form-select">
                ${(isEn
                  ? ['General Info','Academy Programs','Publication Request','Partnership Proposal','Media']
                  : ['Umumiy ma\'lumot','Akademiya dasturlari','Nashr so\'rovi','Hamkorlik taklifi','Media']
                ).map(o => `<option>${o}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">${isEn?'Message':isAr?'الرسالة':'Xabaringiz'}</label>
              <textarea class="form-textarea"
                        placeholder="${isEn?'Write your message here...':isAr?'اكتب رسالتك هنا...':'Xabaringizni shu yerga yozing...'}"
                        required></textarea>
            </div>
            <button type="submit" class="btn btn-gold w-full">${isEn?'Send':isAr?'إرسال':'Yuborish'}</button>
          </form>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          ${contactInfo.map(c => {
            const [label, value] = isEn ? c.en : c.uz;
            return `
              <div class="contact-item">
                <div class="ci-icon">${c.icon}</div>
                <div>
                  <div class="ci-label">${label}</div>
                  <div class="ci-value">${value}</div>
                </div>
              </div>
            `;
          }).join('')}

          <div class="card">
            <h4 style="font-size:13px;font-weight:700;color:var(--text-2);margin-bottom:12px">
              📱 ${isEn ? 'Social Media' : 'Ijtimoiy tarmoqlar'}
            </h4>
            <div class="social-row">
              ${socialLinks.map(s => `
                <button class="social-btn"
                        onclick="showToast('${s.name} ${isEn?'opening':'ochilmoqda'}...', 'info', '${s.icon}')">
                  ${s.icon} ${s.handle}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="map-block mb-6">
        <div class="map-inner">
          <div class="map-pin">📍</div>
          <h3>${isEn ? 'Imam Bukhari International Institute' : 'Imom Buxoriy Xalqaro Instituti'}</h3>
          <p>Samarqand, O'zbekiston</p>
          <button class="btn btn-gold" onclick="openMap()">
            🗺️ ${isEn ? 'Show on Map' : 'Xaritada ko\'rish'}
          </button>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="newsletter-banner">
        <div class="nl-text">
          <h3>📬 ${isEn ? 'Subscribe to Newsletter' : 'Axborotnomamizga obuna bo\'ling'}</h3>
          <p>${isEn ? 'Receive news about events and publications by email.' : 'Tadbirlar va nashrlar haqidagi yangiliklarni elektron pochta orqali oling.'}</p>
        </div>
        <div class="nl-form">
          <input type="email" id="newsletter-email" class="form-input"
                 placeholder="${isEn ? 'Your email address' : 'Elektron pochta manzilingiz'}" />
          <button class="btn btn-gold" onclick="subscribeNewsletter()">
            ${isEn ? 'Subscribe' : 'Obuna bo\'lish'}
          </button>
        </div>
      </div>
    </div>
    `;
  }

  // ============================================
  // MODALS
  // ============================================
  window.openNewsModal = function (id) {
    const n = DATA.news.find(x => x.id === id);
    if (!n) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        ${n.image
          ? '<div style="height:180px;border-radius:12px;overflow:hidden;margin-bottom:12px"><img src="'+n.image+'" alt="" style="width:100%;height:100%;object-fit:cover" /></div>'
          : '<div style="font-size:56px;margin-bottom:12px">'+n.icon+'</div>'}
        <span class="chip chip-gold">${L(n,'tag','tag_en','tag_ar','tag_tr')}</span>
      </div>
      <h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-bottom:12px;line-height:1.4">
        ${L(n,'title','title_en','title_ar','title_tr')}
      </h2>
      <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <span style="font-size:12px;color:var(--text-3)">📅 ${n.date}</span>
        <span style="font-size:12px;color:var(--text-3)">🏷️ ${n.category}</span>
      </div>
      <p style="font-size:13.5px;color:var(--text-2);line-height:1.8;margin-bottom:12px">
        ${n.summary ? L(n,'summary','summary_en','summary_ar','summary_tr') : ''}
      </p>
      <p style="font-size:12.5px;color:var(--text-3);line-height:1.7">
        ${isEn
          ? 'For detailed information, you can visit the Institute website or contact us directly.'
          : 'Batafsil ma\'lumot uchun institut veb-saytiga tashrif buyuring yoki biz bilan bevosita bog\'laning.'}
      </p>
      ${n.author ? `<div style="font-size:12px;color:var(--text-3);margin-top:8px">✍️ ${n.author}${n.readTime ? ' • ⏱ '+n.readTime : ''}</div>` : ''}
      <div style="display:flex;gap:10px;margin-top:16px">
        <button class="btn btn-gold"
                onclick="showToast('${isEn?'Sharing...':'Ulashilmoqda...'}','info','📤');closeModal('news-modal')">
          📤 ${isEn?'Share':'Ulashish'}
        </button>
        <button class="btn btn-ghost"
                onclick="navigateTo('archive');closeModal('news-modal')">
          ${isEn?'All News':'Barcha yangiliklar'}
        </button>
      </div>
    `;
    openModal('news-modal');
  };

  window.openResearchModal = function (id) {
    const a = DATA.researchAreas.find(x => x.id === id);
    if (!a) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="font-size:52px;margin-bottom:12px">${a.icon}</div>
        <h2 style="font-size:20px;font-weight:700;color:var(--gold)">${L(a,'title','title_en','title_ar','title_tr')}</h2>
      </div>
      <p style="font-size:14px;color:var(--text-2);line-height:1.8;margin-bottom:16px">${L(a,'desc','desc_en','desc_ar','desc_tr')}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
        <span class="chip chip-gold">📄 ${a.count} ${isEn?'Studies':'Tadqiqot'}</span>
        <span class="chip chip-blue">🔬 ${isEn?'Active Research':'Faol tadqiqot'}</span>
      </div>
      <div class="progress">
        <div class="progress-bar" style="width:${Math.min(100, a.count * 1.8)}%"></div>
      </div>
      <p style="font-size:12px;color:var(--text-3);margin-top:8px">
        ${isEn?'Research intensity':'Tadqiqot intensivligi'}: ${Math.min(100, Math.round(a.count * 1.8))}%
      </p>
      <button class="btn btn-gold" style="margin-top:16px"
              onclick="navigateTo('research');closeModal('news-modal')">
        ${isEn?'Go to Research':'Tadqiqotga o\'tish'}
      </button>
    `;
    openModal('news-modal');
  };

  window.openPubModal = function (id) {
    const p = DATA.publications.find(x => x.id === id);
    if (!p) return;
    const isEn = currentLang === 'en';
    const saved = readingList.includes(p.id);
    document.getElementById('modal-content').innerHTML = `
      <div style="display:flex;gap:20px;margin-bottom:20px;align-items:flex-start">
        <div style="width:90px;height:120px;background:linear-gradient(135deg,${p.color},#0e3526);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:3px 4px 14px rgba(0,0,0,.3)">
          <span style="font-size:13px;font-weight:800;color:var(--gold-300);text-align:center;padding:6px;line-height:1.2">${p.abbr}</span>
        </div>
        <div>
          <h2 style="font-size:17px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:8px">
            ${isEn ? p.title_en : p.title}
          </h2>
          <div style="color:var(--gold);font-size:13px;margin-bottom:10px">✍️ ${p.author}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span class="chip chip-gold">${p.type}</span>
            <span class="chip chip-blue">📅 ${p.year}</span>
          </div>
        </div>
      </div>
      <p style="font-size:13.5px;color:var(--text-2);line-height:1.8;margin-bottom:14px">${isEn && p.desc_en ? p.desc_en : p.desc}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;font-size:12px;color:var(--text-3)">
        ${p.pages ? `<span>📄 ${p.pages} ${isEn?'pages':'sahifa'}</span>` : ''}
        ${p.language ? `<span>🌐 ${p.language}</span>` : ''}
        ${p.series ? `<span>📚 ${p.series}</span>` : ''}
      </div>
      ${p.tags ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">${p.tags.map(t => `<span class="chip chip-blue" style="font-size:10px">${t}</span>`).join('')}</div>` : ''}
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-gold"
                onclick="showToast('PDF ${isEn?'downloading':'yuklab olinmoqda'}...','info','📥');closeModal('news-modal')">
          📥 ${isEn?'Download PDF':'PDF yuklab olish'}
        </button>
        <button class="btn ${saved ? 'btn-ghost' : 'btn-ghost'}"
                style="${saved ? 'border-color:#10b981;color:#10b981' : ''}"
                onclick="saveToReadingList(${p.id});closeModal('news-modal')">
          🔖 ${saved ? (isEn?'Saved':'Saqlangan') : (isEn?'Save':'Saqlash')}
        </button>
      </div>
    `;
    openModal('news-modal');
  };

  window.openProgramModal = function (id) {
    const p = DATA.programs.find(x => x.id === id);
    if (!p) return;
    const isEn = currentLang === 'en';
    const details = [
      ['⏱', isEn?'Duration':'Muddat',     p.duration],
      ['📊', isEn?'Level':'Daraja',       p.level],
      ['🌐', isEn?'Language':'Til',       p.lang],
      ['👥', isEn?'Enrolled':'Ro\'yxatdan o\'tgan',   p.students + (isEn?' students':' talaba')],
    ];
    document.getElementById('modal-content').innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <span style="font-size:48px">${p.icon}</span>
        <h2 style="font-size:18px;font-weight:700;color:var(--text-1);margin-top:12px">${L(p,'title','title_en','title_ar','title_tr')}</h2>
        <span class="chip ${p.status==='active' ? 'chip-green' : 'chip-blue'}" style="margin-top:10px;display:inline-flex">
          ${p.status==='active' ? (isEn?'Active':'Faol') : (isEn?'Upcoming':'Tez kunda')}
        </span>
      </div>
      <div class="g-2" style="margin-bottom:20px">
        ${details.map(d => `
          <div style="padding:14px;background:var(--surface-2);border-radius:10px;text-align:center;border:1px solid var(--border-1)">
            <div style="font-size:20px">${d[0]}</div>
            <div style="font-size:11px;color:var(--text-3);margin-top:4px">${d[1]}</div>
            <div style="font-size:13px;font-weight:700;color:var(--text-1);margin-top:2px">${d[2]}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-gold w-full"
              onclick="applyProgram(${p.id});closeModal('news-modal')">
        ✍️ ${isEn?'Apply to Program':'Dasturga ariza berish'}
      </button>
    `;
    openModal('news-modal');
  };

  window.openVideoModal = function (id) {
    const v = DATA.videos.find(x => x.id === id);
    if (!v) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">▶️ ${L(v,'title','title_en','title_ar','title_tr')}</h3>
      <div style="background:linear-gradient(135deg,var(--navy-800),var(--navy-600));border-radius:14px;height:220px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;position:relative;overflow:hidden">
        ${v.thumbnail ? '<img src="'+v.thumbnail+'" alt="" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" />' : ''}
        <div style="text-align:center;position:relative;z-index:1">
          ${v.thumbnail ? '' : '<div style="font-size:56px;margin-bottom:10px">'+v.emoji+'</div>'}
          <div style="width:60px;height:60px;background:rgba(228,183,58,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;cursor:pointer;box-shadow:0 4px 20px rgba(228,183,58,.5)"
               onclick="${v.videoUrl ? 'window.open(\''+v.videoUrl+'\',\'_blank\')' : 'showToast(\''+( isEn?'Opening YouTube...':'YouTube ochilmoqda...')+'\',\'info\')'}">
            <span style="font-size:22px;margin-left:4px;color:#061a12;font-weight:800">▶</span>
          </div>
        </div>
      </div>
      ${v.description ? `<p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:14px">${L(v,'description','description_en','description_ar','description_tr')}</p>` : ''}
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
        <span class="chip chip-gray">⏱ ${v.duration}</span>
        <span class="chip chip-gray">👁 ${v.views}</span>
        ${v.category ? `<span class="chip chip-gold">${v.category}</span>` : ''}
        ${v.speaker ? `<span style="font-size:12px;color:var(--text-3)">🎤 ${v.speaker}</span>` : ''}
      </div>
      <button class="btn btn-gold"
              onclick="${v.videoUrl ? 'window.open(\''+v.videoUrl+'\',\'_blank\')' : 'showToast(\''+( isEn?'Opening on YouTube':'YouTube ochilmoqda')+'...\',\'info\')'};closeModal('news-modal')">
        ${isEn?'Watch Video':'Videoni ko\'rish'}
      </button>
    `;
    openModal('news-modal');
  };

  window.openEventModal = function (id) {
    const e = DATA.events.find(x => x.id === id);
    if (!e) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px">
        <div style="width:70px;height:80px;background:linear-gradient(135deg,var(--gold),var(--gold-600));border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;color:white;box-shadow:0 4px 16px rgba(228,183,58,.4)">
          <div style="font-size:24px;font-weight:800;line-height:1">${e.day}</div>
          <div style="font-size:12px;font-weight:600">${L(e,'month','month_en','month_ar','month_tr')}</div>
        </div>
        <div>
          <h2 style="font-size:17px;font-weight:700;color:var(--text-1);line-height:1.4;margin-bottom:10px">
            ${L(e,'title','title_en','title_ar','title_tr')}
          </h2>
          <span class="event-tag ${e.type}">${e.type}</span>
        </div>
      </div>
      ${e.description ? `<p style="font-size:13px;color:var(--text-2);line-height:1.7;margin-bottom:16px">${L(e,'description','description_en','description_ar','description_tr')}</p>` : ''}
      ${[
        ['📍', isEn?'Location':'Joylashuv', e.location],
        ['⏰', isEn?'Time':'Vaqt',    e.time],
        e.speaker ? ['🎤', isEn?'Speaker':'Ma\'ruzachi', e.speaker] : null,
      ].filter(Boolean).map(d => `
        <div style="display:flex;gap:12px;padding:11px 0;border-bottom:1px solid var(--border-1)">
          <span style="font-size:18px">${d[0]}</span>
          <div>
            <div style="font-size:11.5px;color:var(--text-3);font-weight:600">${d[1]}</div>
            <div style="font-size:13.5px;font-weight:600;color:var(--text-1)">${d[2]}</div>
          </div>
        </div>
      `).join('')}
      ${e.capacity ? `
        <div style="margin-top:14px">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-bottom:6px">
            <span>👥 ${e.registered}/${e.capacity} ${isEn?'registered':'ro\'yxatdan o\'tgan'}</span>
            <span>${Math.round(e.registered/e.capacity*100)}%</span>
          </div>
          <div class="progress"><div class="progress-bar" style="width:${Math.round(e.registered/e.capacity*100)}%"></div></div>
        </div>
      ` : ''}
      <div style="display:flex;gap:10px;margin-top:18px">
        <button class="btn btn-gold"
                onclick="showToast('${isEn?'Registered!':'Ro\'yxatdan o\'tish muvaffaqiyatli!'}','success','✅');closeModal('news-modal')">
          ✅ ${isEn?'Register':'Ro\'yxatdan o\'tish'}
        </button>
        <button class="btn btn-ghost"
                onclick="showToast('${isEn?'Added to calendar':'Taqvimga qo\'shildi'}','info','📅');closeModal('news-modal')">
          📅 ${isEn?'Add to Calendar':'Taqvimga qo\'shish'}
        </button>
      </div>
    `;
    openModal('news-modal');
  };

  window.openTeamModal = function (id) {
    const m = DATA.team.find(x => x.id === +id);
    if (!m) return;
    const isEn = currentLang === 'en';
    document.getElementById('modal-content').innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <div style="width:84px;height:84px;border-radius:50%;background:linear-gradient(135deg,${m.avatarColor || 'var(--navy-600)'},var(--navy-500));display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:var(--gold);margin:0 auto 14px;border:3px solid rgba(228,183,58,.5);box-shadow:0 4px 20px rgba(0,0,0,.25)">
          ${m.initials}
        </div>
        <h2 style="font-size:20px;font-weight:700;color:var(--text-1)">${m.name}</h2>
        <div style="color:var(--gold);font-size:14px;font-weight:600;margin-top:5px">${L(m,'role','role_en','role_ar','role_tr')}</div>
        <div style="color:var(--text-3);font-size:12px;margin-top:3px">${L(m,'dept','dept_en','dept_ar','dept_tr')}</div>
      </div>
      ${m.bio ? `<p style="font-size:13px;color:var(--text-2);line-height:1.8;margin-bottom:16px;text-align:center">${L(m,'bio','bio_en','bio_ar','bio_tr')}</p>` : ''}
      ${m.education ? `<div style="font-size:12px;color:var(--text-3);margin-bottom:12px;text-align:center">🎓 ${m.education}</div>` : ''}
      ${m.specialization ? `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:16px">${m.specialization.map(s => `<span class="chip chip-gold" style="font-size:10px">${s}</span>`).join('')}</div>` : ''}
      <button class="btn btn-gold w-full"
              onclick="showToast('${m.name} ${isEn?'contacting...':'bilan bog\'lanilmoqda...'}','info','✉️');closeModal('news-modal')">
        ✉️ ${isEn?'Contact':'Aloqa qilish'}
      </button>
    `;
    openModal('news-modal');
  };

  window.openModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
  };

  window.closeModal = function (id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
  };

  // ============================================
  // TABS
  // ============================================
  window.switchTab = function (group, tabId) {
    const prefix = group + '-';
    document.querySelectorAll(`.tab-content[id^="${prefix}"]`).forEach(t => t.classList.remove('active'));
    const target = document.getElementById(prefix + tabId);
    if (target) target.classList.add('active');

    const tabsEl = document.getElementById(group + '-tabs');
    if (tabsEl) {
      tabsEl.querySelectorAll('.tab-btn').forEach(btn => {
        const oc = btn.getAttribute('onclick') || '';
        btn.classList.toggle('active', oc.includes(`'${tabId}'`));
      });
    }
  };

  // ============================================
  // ACCORDION
  // ============================================
  window.toggleAccordion = function (id) {
    const item = document.getElementById(id);
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(a => a.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };

  // ============================================
  // SEARCH
  // ============================================
  function getSearchPool() {
    return [
      ...DATA.news.map(n         => ({ icon: n.icon, title: L(n,'title','title_en','title_ar','title_tr'), cat: n.category, page: 'archive', id: n.id })),
      ...DATA.researchAreas.map(a => ({ icon: a.icon, title: L(a,'title','title_en','title_ar','title_tr'), cat: 'Tadqiqot', page: 'research' })),
      ...DATA.publications.map(p  => ({ icon: '📚',   title: currentLang==='en' ? p.title_en : currentLang==='tr' ? (p.title_tr||p.title) : p.title, cat: 'Nashr', page: 'publications' })),
      ...DATA.programs.map(p      => ({ icon: p.icon, title: L(p,'title','title_en','title_ar','title_tr'), cat: 'Akademiya', page: 'academy' })),
      ...DATA.blogPosts.map(b    => ({ icon: '✏️',  title: L(b,'title','title_en','title_ar','title_tr'), cat: 'Blog',   page: 'blog', id: b.id })),
      ...DATA.gallery.map(g      => ({ icon: g.icon, title: L(g,'title','title_en','title_ar','title_tr'), cat: 'Galereya', page: 'gallery' })),
      ...DATA.videos.map(v       => ({ icon: v.emoji, title: L(v,'title','title_en','title_ar','title_tr'), cat: 'Video', page: 'home' })),
    ];
  }

  window.handleSearch = function (query) {
    const container = document.getElementById('search-results');
    if (!container) return;
    if (!query || query.length < 2) { container.classList.remove('show'); return; }

    const pool = getSearchPool();
    const q = query.toLowerCase();
    const results = pool.filter(s => s.title.toLowerCase().includes(q)).slice(0, 7);

    if (!results.length) {
      container.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-3);font-size:12px">
        ${currentLang==='en' ? 'No results found' : currentLang==='tr' ? 'Sonuç bulunamadı' : 'Natija topilmadi'}
      </div>`;
      container.classList.add('show');
      return;
    }

    const escapedQ = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    container.innerHTML = results.map(r => {
      const hiTitle = r.title.replace(
        new RegExp(`(${escapedQ})`, 'gi'),
        '<mark>$1</mark>'
      );
      const action = (r.page === 'archive' && r.id != null)
        ? `openNewsModal(${r.id});closeSearchResults()`
        : `navigateTo('${r.page}');closeSearchResults()`;
      return `
        <div class="sr-item" onclick="${action}">
          <span class="sr-icon">${r.icon}</span>
          <div>
            <div class="sr-title">${hiTitle}</div>
            <div class="sr-cat">${r.cat}</div>
          </div>
        </div>
      `;
    }).join('');
    container.classList.add('show');
  };

  window.showSearchResults = function () {
    const input = document.getElementById('search-input');
    if (input && input.value.length >= 2) handleSearch(input.value);
  };

  function hideSearchDropdown() {
    const r = document.getElementById('search-results');
    if (r) r.classList.remove('show');
  }

  window.closeSearchResults = function () {
    hideSearchDropdown();
  };

  // ============================================
  // NOTIFICATIONS
  // ============================================
  window.openNotifications = function () {
    notifRead = true;
    localStorage.setItem('ibxi_notif_read', 'true');
    const badge = document.getElementById('notif-badge');
    if (badge) badge.remove();

    const notifications = [
      { icon:'📢', msg:'Akademiya Bahor semestri uchun arizalar qabul qilinmoqda', msg_en:'Academy Spring term applications are open',         time:'2 soat', read:false },
      { icon:'📚', msg:'Yangi nashr: Kalom tarixi kitobi mavjud',         msg_en:'New publication: Kalam History book available',        time:'1 kun', read:false },
      { icon:'🎤', msg:'Xalqaro simpozium uchun ro\'yxatga olish boshlandi', msg_en:'International symposium registrations have started',   time:'3 kun', read:false },
      { icon:'✅', msg:'Arizangiz qabul qilindi va ko\'rib chiqilmoqda',    msg_en:'Your application was received and is under review',    time:'1 hafta', read:true },
    ];

    document.getElementById('modal-content').innerHTML = `
      <h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">
        🔔 ${currentLang==='en' ? 'Notifications' : currentLang==='tr' ? 'Bildirimler' : 'Bildirishnomalar'}
      </h3>
      ${notifications.map(n => {
        const msg = currentLang==='en' ? n.msg_en : currentLang==='tr' ? (n.msg_tr||n.msg) : n.msg;
        const bg  = n.read ? 'transparent' : 'rgba(228,183,58,0.06)';
        return `
          <div style="display:flex;gap:12px;padding:12px;border-radius:9px;background:${bg};border-bottom:1px solid var(--border-1);cursor:pointer"
               onclick="this.style.background='transparent'">
            <span style="font-size:22px;flex-shrink:0">${n.icon}</span>
            <div style="flex:1">
              <div style="font-size:13px;color:var(--text-1);font-weight:${n.read?'400':'600'}">${msg}</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:3px">${n.time} ${currentLang==='en'?'ago':currentLang==='tr'?'önce':'oldin'}</div>
            </div>
            ${!n.read ? '<div style="width:8px;height:8px;background:var(--gold);border-radius:50%;flex-shrink:0;margin-top:6px"></div>' : ''}
          </div>
        `;
      }).join('')}
    `;
    openModal('news-modal');
  };

  // ============================================
  // READING LIST
  // ============================================
  window.saveToReadingList = function (id) {
    if (readingList.includes(id)) {
      readingList = readingList.filter(x => x !== id);
      showToast(currentLang==='en' ? 'Removed from reading list' : currentLang==='tr' ? 'Okuma listesinden çıkarıldı' : 'O\'qish ro\'yxatidan o\'chirildi', 'info', '🔖');
    } else {
      readingList.push(id);
      showToast(currentLang==='en' ? 'Added to reading list' : currentLang==='tr' ? 'Okuma listesine eklendi' : 'O\'qish ro\'yxatiga qo\'shildi', 'success', '🔖');
    }
    localStorage.setItem('ibxi_reading', JSON.stringify(readingList));
    renderTopbar();
  };

  window.openReadingList = function () {
    const isEn = currentLang === 'en';
    const saved = DATA.publications.filter(p => readingList.includes(p.id));
    document.getElementById('modal-content').innerHTML = `
      <h3 style="font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:16px">
        🔖 ${isEn ? 'Reading List' : 'O\'qish ro\'yxatim'}
        ${saved.length > 0 ? `<span class="chip chip-gold" style="margin-left:8px;vertical-align:middle">${saved.length}</span>` : ''}
      </h3>
      ${saved.length === 0
        ? `<div style="text-align:center;padding:32px;color:var(--text-3)">
             <div style="font-size:40px;margin-bottom:12px">📚</div>
             <p>${isEn ? 'Your reading list is empty.' : 'O\'qish ro\'yxatingiz bo\'sh.'}</p>
             <button class="btn btn-gold" style="margin-top:16px"
                     onclick="navigateTo('publications');closeModal('news-modal')">
               ${isEn ? 'Browse Publications' : 'Nashrlarni ko\'rish'}
             </button>
           </div>`
        : saved.map(p => `
            <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border-1);align-items:center">
              <div style="width:40px;height:54px;background:linear-gradient(135deg,${p.color},#0e3526);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:2px 2px 8px rgba(0,0,0,.2)">
                <span style="font-size:10px;font-weight:800;color:var(--gold-300)">${p.abbr}</span>
              </div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:var(--text-1)">${isEn ? p.title_en : p.title}</div>
                <div style="font-size:11px;color:var(--text-3)">${p.author} • ${p.year}</div>
              </div>
              <button class="btn btn-ghost btn-sm"
                      onclick="saveToReadingList(${p.id});openReadingList()">
                ✕
              </button>
            </div>
          `).join('')
      }
    `;
    openModal('news-modal');
  };

  // ============================================
  // FORMS
  // ============================================
  window.submitContact = function (e) {
    e.preventDefault();
    const form = e.target;
    const t = DATA.i18n[currentLang];
    clearFormErrors(form);

    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    let valid = true;

    if (nameInput && !nameInput.value.trim()) {
      showFieldError(nameInput, t.form_required);
      valid = false;
    }
    if (emailInput && (!emailInput.value.includes('@') || !emailInput.value.includes('.'))) {
      showFieldError(emailInput, t.form_invalid_email);
      valid = false;
    }
    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      const origText = btn.textContent;
      btn.innerHTML = '<span class="btn-spinner"></span> ' + t.loading_text;
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = origText;
        showToast(t.form_success, 'success', '✅');
        form.reset();
      }, 1200);
    }
  };

  window.submitApplication = function (e) {
    e.preventDefault();
    showToast(
      currentLang==='en' ? 'Application received! You will be notified by email.' : currentLang==='tr' ? 'Başvurunuz alındı! E-posta ile bilgilendirileceksiniz.' : 'Arizangiz qabul qilindi! Natija elektron pochta orqali bildiriladi.',
      'success', '🎓'
    );
    e.target.reset();
  };

  window.submitVisiting = function (e) {
    e.preventDefault();
    showToast(
      currentLang==='en' ? 'Visiting Scholar application received!' : currentLang==='tr' ? 'Ziyaretçi Akademisyen başvurunuz alındı!' : 'Mehmon olim arizangiz qabul qilindi!',
      'success', '🌍'
    );
    e.target.reset();
  };

  window.applyProgram = function (id) {
    const p = DATA.programs.find(x => x.id === id);
    if (!p) return;
    const name = currentLang==='en' ? p.title_en : currentLang==='tr' ? (p.title_tr||p.title) : p.title;
    showToast(`"${name}" ${currentLang==='en' ? 'application submitted!' : currentLang==='tr' ? 'başvurunuz alındı!' : 'dasturiga arizangiz qabul qilindi!'}`, 'success', '✅');
    navigateTo('academy');
    setTimeout(() => switchTab('academy', 'apply'), 200);
  };

  window.subscribeNewsletter = function () {
    const input = document.getElementById('newsletter-email');
    if (input && !input.value.includes('@')) {
      showToast(currentLang==='en' ? 'Please enter a valid email.' : currentLang==='tr' ? 'Lütfen geçerli bir e-posta girin.' : 'To\'g\'ri elektron pochta manzilini kiriting.', 'warning', '⚠️');
      return;
    }
    showToast(
      currentLang==='en' ? 'Successfully subscribed to our newsletter!' : currentLang==='tr' ? 'Bültenimize başarıyla abone oldunuz!' : 'Axborotnomamizga muvaffaqiyatli obuna bo\'ldingiz!',
      'success', '📬'
    );
    if (input) input.value = '';
  };

  window.openMap = function () {
    showToast(currentLang==='en' ? 'Opening map...' : currentLang==='tr' ? 'Harita açılıyor...' : 'Xarita ochilmoqda...', 'info', '🗺️');
    setTimeout(() => window.open('https://maps.google.com?q=Samarqand+Uzbekistan', '_blank'), 400);
  };

  // ============================================
  // ARCHIVE FILTER
  // ============================================
  window.setArchiveCat = function (btn, cat) {
    archiveCatQ = cat;
    btn.closest('#archive-cat-buttons').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyArchiveFilter();
  };

  window.applyArchiveFilter = function () {
    const items = document.querySelectorAll('.archive-item');
    let visible = 0;
    items.forEach(item => {
      const catMatch = !archiveCatQ || archiveCatQ === 'Barchasi' || item.dataset.category === archiveCatQ;
      const q = archiveTextQ.toLowerCase().trim();
      const textMatch = !q || (item.dataset.uz || '').includes(q) || (item.dataset.en || '').includes(q) || item.textContent.toLowerCase().includes(q);
      const show = catMatch && textMatch;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const countEl = document.getElementById('archive-count');
    if (countEl) {
      countEl.textContent = `${visible} ${currentLang==='en' ? 'results' : currentLang==='tr' ? 'sonuç' : 'natija'}`;
    }
  };

  // ============================================
  // COUNT-UP ANIMATION
  // ============================================
  function initCountUp() {
    document.querySelectorAll('.stat-val[data-target]').forEach(el => {
      const target   = parseInt(el.dataset.target, 10);
      const suffix   = el.dataset.suffix || '';
      const steps    = 40;
      const increment = target / steps;
      let current = 0;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        el.textContent = current + suffix;
        if (step >= steps) clearInterval(timer);
      }, 1200 / steps);
    });
  }

  // ============================================
  // PROGRESS BAR ANIMATION
  // ============================================
  function animateProgressBars() {
    document.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
      const w = bar.dataset.width;
      setTimeout(() => { bar.style.width = w + '%'; }, 100);
    });
  }

  const pageObserver = new MutationObserver(() => animateProgressBars());
  document.querySelectorAll && setTimeout(() => {
    document.querySelectorAll('.page').forEach(p => {
      pageObserver.observe(p, { attributes: true, attributeFilter: ['class'] });
    });
    animateProgressBars();
  }, 800);

  // ============================================
  // SCROLL TO TOP
  // ============================================
  function initScrollToTop() {
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('scroll-top-btn');
      if (btn) btn.classList.toggle('show', window.scrollY > 300);
    });
  }

  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================
  // TOAST
  // ============================================
  window.showToast = function (msg, type = 'info', icon = 'ℹ️') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="ti">${icon}</span><span class="tm">${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity  = '0';
      toast.style.transform = 'translateX(110%)';
      setTimeout(() => toast.remove(), 320);
    }, 3500);
  };

  // ============================================
  // SCROLL REVEAL
  // ============================================
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ============================================
  // FORM VALIDATION HELPER
  // ============================================
  function showFieldError(input, message) {
    input.classList.add('error');
    const existing = input.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

  // ============================================
  // EMPTY STATE HELPER
  // ============================================
  function emptyState(icon, title, subtitle) {
    return `<div class="empty-state"><div class="es-icon">${icon}</div><h3 class="es-title">${title}</h3><p class="es-sub">${subtitle}</p></div>`;
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  function initEventListeners() {
    document.addEventListener('click', (e) => {
      const searchBox = document.getElementById('search-container');
      if (searchBox && !searchBox.contains(e.target)) hideSearchDropdown();

      const modal = document.querySelector('.modal-backdrop.show');
      if (modal && e.target === modal) modal.classList.remove('show');

      if (e.target.id === 'mobile-overlay') {
        document.getElementById('sidebar').classList.remove('mobile-open');
        document.getElementById('mobile-overlay').classList.remove('show');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(m => m.classList.remove('show'));
        hideSearchDropdown();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

})();
