// ┌─────────────────────────────────────────────────────────────┐
// │  IBXI – Imom Buxoriy Xalqaro Instituti  |  APPLICATION DATA │
// │                                                             │
// │  HOW TO EDIT THIS FILE:                                     │
// │  • Each section is marked with ═══ SECTION NAME ═══         │
// │  • To add an item: copy an existing entry, paste it at      │
// │    the END of the array, change "id" to the next number,    │
// │    and fill in all fields.                                  │
// │  • Keep tr / en / ar fields for trilingual support.          │
// │  • After editing, refresh the browser (Ctrl+R) to see       │
// │    your changes.                                            │
// │                                                             │
// │  SECTIONS:                                                  │
// │   1. i18n          – UI translations (TR/EN/AR)             │
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

const DATA = {

// ===============================================================
//  1. TRANSLATIONS  (UI text in Turkish / English / Arabic)
// ===============================================================
i18n: {
  "tr": {
    "nav_home": "Bosh sahifa",
    "nav_foundation": "Institut",
    "nav_corporate": "Tashkilot",
    "nav_research": "Tadqiqot",
    "nav_academy": "Akademiya",
    "nav_international": "Xalqaro",
    "nav_publications": "Nashrlar",
    "nav_blog": "Blog",
    "nav_gallery": "Galereya",
    "nav_archive": "Arxiv",
    "nav_contact": "Aloqa",
    "hero_title": "Islom tafakkurini anglash va rivojlantirish",
    "hero_sub": "Imom Buxoriy Xalqaro Instituti — islom tsivilizatsiyasining intellektual merosini tadqiq qiluvchi va rivojlantiruvchi mustaqil ilmiy-tadqiqot muassasasidir.",
    "hero_btn1": "Tadqiqotlarimiz",
    "hero_btn2": "Akademiya dasturlari",
    "stat_researchers": "Tadqiqotchi",
    "stat_publications": "Nashr",
    "stat_events": "Tadbir",
    "stat_years": "Yillik tajriba",
    "section_news": "So'nggi yangiliklar",
    "section_research": "Tadqiqot yo'nalishlari",
    "section_events": "Yaqinlashayotgan tadbirlar",
    "section_videos": "Video materiallar",
    "section_blog": "Blog va tadqiqot maqolalari",
    "section_testimonials": "Olimlar fikrlari",
    "section_gallery": "Galereya",
    "read_more": "Batafsil o'qish",
    "see_all": "Barchasini ko'rish",
    "share": "Ulashish",
    "back": "Orqaga",
    "filter_all": "Barchasi",
    "loading_text": "Yuklanmoqda...",
    "form_required": "Bu maydon to'ldirilishi shart.",
    "form_invalid_email": "To'g'ri elektron pochta manzilini kiriting.",
    "form_success": "Xabaringiz muvaffaqiyatli yuborildi!",
    "footer_rights": "Barcha huquqlar himoyalangan."
  },
  "en": {
    "nav_home": "Home",
    "nav_foundation": "The Institute",
    "nav_corporate": "Corporate",
    "nav_research": "Research",
    "nav_academy": "Academy",
    "nav_international": "International",
    "nav_publications": "Publications",
    "nav_blog": "Blog",
    "nav_gallery": "Gallery",
    "nav_archive": "Archive",
    "nav_contact": "Contact",
    "hero_title": "Understanding and Developing Islamic Thought",
    "hero_sub": "The Imam Bukhari International Institute is an independent research institution that investigates and advances the intellectual heritage of Islamic civilization.",
    "hero_btn1": "Our Research",
    "hero_btn2": "Academy Programs",
    "stat_researchers": "Researchers",
    "stat_publications": "Publications",
    "stat_events": "Events",
    "stat_years": "Years Experience",
    "section_news": "Latest News",
    "section_research": "Research Areas",
    "section_events": "Upcoming Events",
    "section_videos": "Video Content",
    "section_blog": "Blog & Research Articles",
    "section_testimonials": "Scholar Perspectives",
    "section_gallery": "Gallery",
    "read_more": "Read More",
    "see_all": "See All",
    "share": "Share",
    "back": "Back",
    "filter_all": "All",
    "loading_text": "Loading...",
    "form_required": "This field is required.",
    "form_invalid_email": "Please enter a valid email address.",
    "form_success": "Your message has been sent successfully!",
    "footer_rights": "All rights reserved."
  },
  "ar": {
    "nav_home": "الرئيسية",
    "nav_foundation": "معهد الإمام البخاري",
    "nav_corporate": "المؤسسي",
    "nav_research": "البحث",
    "nav_academy": "الأكاديمية",
    "nav_international": "الدولي",
    "nav_publications": "المنشورات",
    "nav_blog": "المدونة",
    "nav_gallery": "المعرض",
    "nav_archive": "الأرشيف",
    "nav_contact": "اتصل بنا",
    "hero_title": "فهم الفكر الإسلامي وتطويره",
    "hero_sub": "معهد الفكر الإسلامي مؤسسة بحثية مستقلة تبحث في التراث الفكري للحضارة الإسلامية وتعمل على تطويره.",
    "hero_btn1": "أبحاثنا",
    "hero_btn2": "برامج الأكاديمية",
    "stat_researchers": "باحث",
    "stat_publications": "منشور",
    "stat_events": "فعالية",
    "stat_years": "سنة خبرة",
    "section_news": "آخر الأخبار",
    "section_research": "مجالات البحث",
    "section_events": "الفعاليات القادمة",
    "section_videos": "محتوى الفيديو",
    "section_blog": "المدونة والمقالات البحثية",
    "section_testimonials": "آراء الأكاديميين",
    "section_gallery": "المعرض",
    "read_more": "اقرأ المزيد",
    "see_all": "عرض الكل",
    "share": "مشاركة",
    "back": "رجوع",
    "filter_all": "الكل",
    "loading_text": "جارٍ التحميل...",
    "form_required": "هذا الحقل مطلوب.",
    "form_invalid_email": "يرجى إدخال بريد إلكتروني صالح.",
    "form_success": "تم إرسال رسالتك بنجاح!",
    "footer_rights": "جميع الحقوق محفوظة."
  }
},

// ===============================================================
//  2. NEWS / HABERLER
// ===============================================================
news: [
  {
    "id": 1,
    "icon": "📜",
    "tag": "Duyuru",
    "tag_en": "Announcement",
    "tag_ar": "إعلان",
    "title": "İslam Felsefesi Uluslararası Sempozyumu – Ankara 2025",
    "title_en": "International Symposium on Islamic Philosophy – Ankara 2025",
    "title_ar": "الندوة الدولية للفلسفة الإسلامية – أنقرة 2025",
    "summary": "Sempozyum, 50'den fazla uluslararası akademisyenin katılımıyla İslam felsefesinin temel meselelerini ele alacak.",
    "summary_en": "The symposium will bring together over 50 international scholars to discuss fundamental issues of Islamic philosophy.",
    "summary_ar": "ستجمع الندوة أكثر من 50 باحثاً دولياً لمناقشة القضايا الأساسية في الفلسفة الإسلامية.",
    "date": "15 Ocak 2025",
    "category": "Etkinlik",
    "color": "#0e3526",
    "author": "IBXI Matbuot",
    "readTime": "3 dk",
    "featured": true
  },
  {
    "id": 2,
    "icon": "📚",
    "tag": "Yayın",
    "tag_en": "Publication",
    "tag_ar": "منشور",
    "title": "Usûl ve Makâsıd: İslam Hukukunun Metodolojisi – Yeni Kitap",
    "title_en": "Usul and Maqasid: Methodology of Islamic Law – New Book",
    "title_ar": "الأصول والمقاصد: منهجية الفقه الإسلامي – كتاب جديد",
    "summary": "Dr. Fatma Çetin'in yeni eseri, İslam hukuk metodolojisinin temel kavramlarını çağdaş perspektifle ele alıyor.",
    "summary_en": "Dr. Fatma Cetin's new work examines the fundamental concepts of Islamic legal methodology from a contemporary perspective.",
    "summary_ar": "يتناول الكتاب الجديد للدكتورة فاطمة شتين المفاهيم الأساسية لمنهجية الفقه الإسلامي من منظور معاصر.",
    "date": "8 Ocak 2025",
    "category": "Yayın",
    "color": "#1e3a5f",
    "author": "IBXI Nashriyot",
    "readTime": "4 dk",
    "featured": true
  },
  {
    "id": 3,
    "icon": "🎓",
    "tag": "Akademi",
    "tag_en": "Academy",
    "tag_ar": "أكاديمية",
    "title": "IBXI Akademiya Bahar Dönemi Başvuruları Açıldı",
    "title_en": "IBXI Academy Spring Term Applications are Open",
    "title_ar": "فتح باب التسجيل لفصل الربيع في أكاديمية المعهد",
    "summary": "2025 Bahar dönemi için 6 farklı programda toplam 200 kontenjan ile başvurular başladı.",
    "summary_en": "Applications have opened for 200 spots across 6 different programs for the Spring 2025 term.",
    "summary_ar": "بدأ التسجيل لـ 200 مقعد في 6 برامج مختلفة لفصل الربيع 2025.",
    "date": "3 Ocak 2025",
    "category": "Akademi",
    "color": "#1a3a2a",
    "author": "IBXI Akademiya",
    "readTime": "2 dk",
    "featured": true
  },
  {
    "id": 4,
    "icon": "🌍",
    "tag": "Uluslararası",
    "tag_en": "International",
    "tag_ar": "دولي",
    "title": "Ziyaretçi Akademisyen Programı – 2025 Başvuruları",
    "title_en": "Visiting Scholar Program – 2025 Applications",
    "title_ar": "برنامج الأكاديمي الزائر – طلبات 2025",
    "summary": "Program, dünya genelinden araştırmacılara IBXI tarkibida çalışma imkânı sunmaktadır.",
    "summary_en": "The program offers researchers from around the world the opportunity to work within IBXI.",
    "summary_ar": "يوفر البرنامج للباحثين من جميع أنحاء العالم فرصة العمل ضمن معهد الإمام البخاري.",
    "date": "28 Aralık 2024",
    "category": "Uluslararası",
    "color": "#2a1a3a",
    "author": "IBXI Xalqaro",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 5,
    "icon": "🔬",
    "tag": "Araştırma",
    "tag_en": "Research",
    "tag_ar": "بحث",
    "title": "Islom tafakkurida Bilgi Teorisi Çalışma Grubu Raporu",
    "title_en": "Report of the Study Group on Epistemology in Islamic Thought",
    "title_ar": "تقرير مجموعة الدراسة حول نظرية المعرفة في الفكر الإسلامي",
    "summary": "12 aylık çalışmanın sonuçları, İslam epistemolojisine yeni bir perspektif sunuyor.",
    "summary_en": "The results of a 12-month study offer a new perspective on Islamic epistemology.",
    "summary_ar": "تقدم نتائج الدراسة التي استمرت 12 شهراً منظوراً جديداً في المعرفة الإسلامية.",
    "date": "20 Aralık 2024",
    "category": "Araştırma",
    "color": "#3a2a1a",
    "author": "IBXI Tadqiqot",
    "readTime": "5 dk",
    "featured": false
  },
  {
    "id": 6,
    "icon": "🎤",
    "tag": "Konferans",
    "tag_en": "Conference",
    "tag_ar": "مؤتمر",
    "title": "\"İslam ve Modernite\" Konferansı Tebliğleri Yayımlandı",
    "title_en": "Papers from the 'Islam and Modernity' Conference Published",
    "title_ar": "نشر أوراق مؤتمر 'الإسلام والحداثة'",
    "summary": "Konferansta sunulan 32 tebliğ, IBXI Nashriyot tarafından kitap olarak basıldı.",
    "summary_en": "32 papers presented at the conference have been published as a book by IBXI Publications.",
    "summary_ar": "تم نشر 32 ورقة قدمت في المؤتمر ككتاب من قبل منشورات المعهد.",
    "date": "15 Aralık 2024",
    "category": "Etkinlik",
    "color": "#1a2a3a",
    "author": "IBXI Matbuot",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 7,
    "icon": "📖",
    "tag": "Yayın",
    "tag_en": "Publication",
    "tag_ar": "منشور",
    "title": "İslam Hukuk Felsefesi Dergisi 12. Sayısı Çıktı",
    "title_en": "Islamic Legal Philosophy Journal Issue 12 Published",
    "title_ar": "صدور العدد 12 من مجلة فلسفة الفقه الإسلامي",
    "summary": "Dergi, bu sayıda makâsıd teorisinin çağdaş uygulamalarını ele alan 8 makale içeriyor.",
    "summary_en": "This issue features 8 articles examining contemporary applications of maqasid theory.",
    "summary_ar": "يتضمن هذا العدد 8 مقالات تتناول التطبيقات المعاصرة لنظرية المقاصد.",
    "date": "10 Aralık 2024",
    "category": "Yayın",
    "color": "#1e3a5f",
    "author": "IBXI Nashriyot",
    "readTime": "2 dk",
    "featured": false
  },
  {
    "id": 8,
    "icon": "🏛️",
    "tag": "Araştırma",
    "tag_en": "Research",
    "tag_ar": "بحث",
    "title": "Medeniyet Araştırmaları Merkezi Yeni Projelerini Duyurdu",
    "title_en": "Civilization Research Center Announces New Projects",
    "title_ar": "مركز أبحاث الحضارة يعلن عن مشاريعه الجديدة",
    "summary": "Merkez, 2025 yılı için İslam medeniyetinin farklı boyutlarını inceleyen 4 yeni proje başlattı.",
    "summary_en": "The center has launched 4 new projects examining different dimensions of Islamic civilization for 2025.",
    "summary_ar": "أطلق المركز 4 مشاريع جديدة تدرس أبعاداً مختلفة من الحضارة الإسلامية لعام 2025.",
    "date": "5 Aralık 2024",
    "category": "Araştırma",
    "color": "#0e3526",
    "author": "IBXI Tadqiqot",
    "readTime": "4 dk",
    "featured": false
  },
  {
    "id": 9,
    "icon": "🎓",
    "tag": "Akademi",
    "tag_en": "Academy",
    "tag_ar": "أكاديمية",
    "title": "Güz Dönemi Mezuniyet Töreni Gerçekleştirildi",
    "title_en": "Fall Term Graduation Ceremony Held",
    "title_ar": "أقيم حفل تخرج الفصل الخريفي",
    "summary": "IBXI Akademiya'nin 2024 Güz dönemi programlarından toplam 156 katılımcı sertifika aldı.",
    "summary_en": "A total of 156 participants received certificates from IBXI Academy's Fall 2024 programs.",
    "summary_ar": "حصل 156 مشاركاً على شهادات من برامج أكاديمية المعهد لخريف 2024.",
    "date": "1 Aralık 2024",
    "category": "Akademi",
    "color": "#1a3a2a",
    "author": "IBXI Akademiya",
    "readTime": "2 dk",
    "featured": false
  },
  {
    "id": 10,
    "icon": "🌍",
    "tag": "Uluslararası",
    "tag_en": "International",
    "tag_ar": "دولي",
    "title": "Malezya İslam Üniversitesi ile İş Birliği Protokolü",
    "title_en": "Cooperation Protocol with International Islamic University Malaysia",
    "title_ar": "بروتوكول تعاون مع الجامعة الإسلامية الدولية في ماليزيا",
    "summary": "IBXI ile IIUM arasında araştırma ve akademik değişim alanında iş birliği anlaşması imzalandı.",
    "summary_en": "A cooperation agreement was signed between IBXIand IIUM in research and academic exchange.",
    "summary_ar": "تم توقيع اتفاقية تعاون بين IBXIوIIUM في مجال البحث والتبادل الأكاديمي.",
    "date": "25 Kasım 2024",
    "category": "Uluslararası",
    "color": "#2a1a3a",
    "author": "IBXI Xalqaro",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 11,
    "icon": "⚖️",
    "tag": "Araştırma",
    "tag_en": "Research",
    "tag_ar": "بحث",
    "title": "Usûl Araştırma Birimi: Fıkıh Usûlü Terminoloji Sözlüğü Tamamlandı",
    "title_en": "Usul Research Unit: Fiqh Methodology Terminology Dictionary Completed",
    "title_ar": "وحدة بحث الأصول: اكتمال معجم مصطلحات أصول الفقه",
    "summary": "3 yıllık çalışma sonucunda 1200'den fazla terimi kapsayan sözlük kullanıma hazır.",
    "summary_en": "After 3 years of work, the dictionary covering over 1200 terms is ready for use.",
    "summary_ar": "بعد 3 سنوات من العمل، المعجم الذي يغطي أكثر من 1200 مصطلح جاهز للاستخدام.",
    "date": "20 Kasım 2024",
    "category": "Araştırma",
    "color": "#3a2a1a",
    "author": "IBXI Tadqiqot",
    "readTime": "4 dk",
    "featured": true
  },
  {
    "id": 12,
    "icon": "📚",
    "tag": "Yayın",
    "tag_en": "Publication",
    "tag_ar": "منشور",
    "title": "IBXI Klasik Metin Serisi: Gazali'nin İhyâ'sı Yeni Çevirisi",
    "title_en": "IBXI Classic Text Series: New Translation of Ghazali's Ihya",
    "title_ar": "سلسلة النصوص الكلاسيكية: ترجمة جديدة لإحياء الغزالي",
    "summary": "Tam metin çevirisi ve modern Türkçe şerh ile klasik eser yeniden okura sunuluyor.",
    "summary_en": "The classic work is presented to readers with full text translation and modern Turkish commentary.",
    "summary_ar": "يُقدَّم العمل الكلاسيكي للقراء مع ترجمة كاملة وشرح تركي حديث.",
    "date": "15 Kasım 2024",
    "category": "Yayın",
    "color": "#1e3a5f",
    "author": "IBXI Nashriyot",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 13,
    "icon": "🎤",
    "tag": "Konferans",
    "tag_en": "Conference",
    "tag_ar": "مؤتمر",
    "title": "İslam Ekonomisi ve Finans Konferansı – Kayıtlar Başladı",
    "title_en": "Islamic Economics and Finance Conference – Registration Open",
    "title_ar": "مؤتمر الاقتصاد والمالية الإسلامية – بدء التسجيل",
    "summary": "Konferans, İslam ekonomisinin teorik temelleri ve modern finansal uygulamaları ele alacak.",
    "summary_en": "The conference will address the theoretical foundations and modern financial applications of Islamic economics.",
    "summary_ar": "سيتناول المؤتمر الأسس النظرية والتطبيقات المالية الحديثة للاقتصاد الإسلامي.",
    "date": "10 Kasım 2024",
    "category": "Etkinlik",
    "color": "#1a2a3a",
    "author": "IBXI Matbuot",
    "readTime": "2 dk",
    "featured": false
  },
  {
    "id": 14,
    "icon": "🔬",
    "tag": "Araştırma",
    "tag_en": "Research",
    "tag_ar": "بحث",
    "title": "Kelam Araştırmaları: Mu'tezile Düşüncesi Üzerine Yeni Bulgular",
    "title_en": "Kalam Research: New Findings on Mu'tazilite Thought",
    "title_ar": "أبحاث الكلام: اكتشافات جديدة حول الفكر المعتزلي",
    "summary": "Araştırma ekibi, daha önce bilinmeyen el yazması metinlerden yeni veriler ortaya koydu.",
    "summary_en": "The research team has uncovered new data from previously unknown manuscript texts.",
    "summary_ar": "كشف فريق البحث عن بيانات جديدة من مخطوطات لم تكن معروفة سابقاً.",
    "date": "5 Kasım 2024",
    "category": "Araştırma",
    "color": "#3a2a1a",
    "author": "IBXI Tadqiqot",
    "readTime": "6 dk",
    "featured": false
  },
  {
    "id": 15,
    "icon": "🎓",
    "tag": "Akademi",
    "tag_en": "Academy",
    "tag_ar": "أكاديمية",
    "title": "Online Arapça Programı: Yeni Modül Eklendi",
    "title_en": "Online Arabic Program: New Module Added",
    "title_ar": "برنامج العربية أونلاين: إضافة وحدة جديدة",
    "summary": "Klasik Arapça metin okuma becerilerine odaklanan yeni modül, 60 saatlik içerik sunuyor.",
    "summary_en": "The new module focusing on classical Arabic text reading skills offers 60 hours of content.",
    "summary_ar": "تقدم الوحدة الجديدة المركزة على مهارات قراءة النصوص العربية الكلاسيكية 60 ساعة من المحتوى.",
    "date": "1 Kasım 2024",
    "category": "Akademi",
    "color": "#1a3a2a",
    "author": "IBXI Akademiya",
    "readTime": "2 dk",
    "featured": false
  },
  {
    "id": 16,
    "icon": "🌍",
    "tag": "Uluslararası",
    "tag_en": "International",
    "tag_ar": "دولي",
    "title": "Londra İslam Araştırmaları Merkezi'nde IBXI Sunumu",
    "title_en": "IBXI Presentation at London Centre for Islamic Studies",
    "title_ar": "عرض IBXIفي مركز لندن للدراسات الإسلامية",
    "summary": "IBXI Başkanı Prof. Dr. Mustafa Kara, IBXI ning araştırma vizyonunu uluslararası platformda anlattı.",
    "summary_en": "IBXI President Prof. Dr. Mustafa Kara presented IBXI's research vision on the international platform.",
    "summary_ar": "قدم رئيس IBXIالأستاذ الدكتور مصطفى كارا رؤية IBXIالبحثية على المنصة الدولية.",
    "date": "28 Ekim 2024",
    "category": "Uluslararası",
    "color": "#2a1a3a",
    "author": "IBXI Xalqaro",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 17,
    "icon": "📖",
    "tag": "Yayın",
    "tag_en": "Publication",
    "tag_ar": "منشور",
    "title": "İslam Sanat Felsefesi: Estetik ve Maneviyat",
    "title_en": "Islamic Art Philosophy: Aesthetics and Spirituality",
    "title_ar": "فلسفة الفن الإسلامي: الجماليات والروحانية",
    "summary": "Yeni kitap, İslam sanatının felsefi temellerini ve manevî boyutlarını inceliyor.",
    "summary_en": "The new book examines the philosophical foundations and spiritual dimensions of Islamic art.",
    "summary_ar": "يدرس الكتاب الجديد الأسس الفلسفية والأبعاد الروحية للفن الإسلامي.",
    "date": "20 Ekim 2024",
    "category": "Yayın",
    "color": "#1e3a5f",
    "author": "IBXI Nashriyot",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 18,
    "icon": "🏛️",
    "tag": "Duyuru",
    "tag_en": "Announcement",
    "tag_ar": "إعلان",
    "title": "IBXI Kutubxonasi Dijital Arşiv Projesi Başladı",
    "title_en": "IBXI Library Digital Archive Project Launched",
    "title_ar": "انطلاق مشروع الأرشيف الرقمي لمكتبة المعهد",
    "summary": "5000'den fazla nadir eser ve el yazmasının dijitalleştirilmesi projesi başlatıldı.",
    "summary_en": "A project to digitize over 5000 rare works and manuscripts has been launched.",
    "summary_ar": "تم إطلاق مشروع لرقمنة أكثر من 5000 عمل نادر ومخطوطة.",
    "date": "15 Ekim 2024",
    "category": "Araştırma",
    "color": "#0e3526",
    "author": "IBXI Matbuot",
    "readTime": "4 dk",
    "featured": true
  },
  {
    "id": 19,
    "icon": "🎤",
    "tag": "Konferans",
    "tag_en": "Conference",
    "tag_ar": "مؤتمر",
    "title": "Türk-Arap Düşünce Diyalogu Forumu Sonuç Bildirgesi",
    "title_en": "Turkish-Arab Thought Dialogue Forum Final Declaration",
    "title_ar": "البيان الختامي لمنتدى الحوار الفكري التركي العربي",
    "summary": "Forum, İslam dünyasında entelektüel iş birliğinin güçlendirilmesi çağrısında bulundu.",
    "summary_en": "The forum called for strengthening intellectual cooperation in the Islamic world.",
    "summary_ar": "دعا المنتدى إلى تعزيز التعاون الفكري في العالم الإسلامي.",
    "date": "10 Ekim 2024",
    "category": "Etkinlik",
    "color": "#1a2a3a",
    "author": "IBXI Matbuot",
    "readTime": "5 dk",
    "featured": false
  },
  {
    "id": 20,
    "icon": "🔬",
    "tag": "Araştırma",
    "tag_en": "Research",
    "tag_ar": "بحث",
    "title": "Ahlak Felsefesi Çalışma Grubu: Erdem Etiği Raporu",
    "title_en": "Ethics Philosophy Working Group: Virtue Ethics Report",
    "title_ar": "مجموعة فلسفة الأخلاق: تقرير أخلاق الفضيلة",
    "summary": "Rapor, İslam ahlak geleneğindeki erdem kavramının çağdaş etik tartışmalarla mukayesesini sunuyor.",
    "summary_en": "The report presents a comparison of the concept of virtue in Islamic moral tradition with contemporary ethical discussions.",
    "summary_ar": "يقدم التقرير مقارنة لمفهوم الفضيلة في التقليد الأخلاقي الإسلامي مع النقاشات الأخلاقية المعاصرة.",
    "date": "5 Ekim 2024",
    "category": "Araştırma",
    "color": "#3a2a1a",
    "author": "IBXI Tadqiqot",
    "readTime": "7 dk",
    "featured": false
  },
  {
    "id": 21,
    "icon": "🎓",
    "tag": "Akademi",
    "tag_en": "Academy",
    "tag_ar": "أكاديمية",
    "title": "Yaz Okulu 2024: Kayıt Rekorunu Kırdı",
    "title_en": "Summer School 2024: Registration Record Broken",
    "title_ar": "المدرسة الصيفية 2024: تحطيم رقم قياسي في التسجيل",
    "summary": "IBXI Yaz Okulu'na bu yıl 14 ülkeden 320 başvuru yapıldı; program 80 katılımcıyla gerçekleştirildi.",
    "summary_en": "IBXI Summer School received 320 applications from 14 countries this year; the program was held with 80 participants.",
    "summary_ar": "تلقت المدرسة الصيفية 320 طلباً من 14 دولة هذا العام؛ أُقيم البرنامج بمشاركة 80 مشاركاً.",
    "date": "28 Eylül 2024",
    "category": "Akademi",
    "color": "#1a3a2a",
    "author": "IBXI Akademiya",
    "readTime": "3 dk",
    "featured": false
  },
  {
    "id": 22,
    "icon": "📚",
    "tag": "Yayın",
    "tag_en": "Publication",
    "tag_ar": "منشور",
    "title": "IBXI Tadqiqot Raporları Serisi – 2024 Cilt II Yayımlandı",
    "title_en": "IBXI Research Reports Series – 2024 Volume II Published",
    "title_ar": "سلسلة تقارير أبحاث IBXI– صدور المجلد الثاني 2024",
    "summary": "İkinci cilt, 6 araştırma biriminin yıllık çalışmalarını ve bulgularını içeriyor.",
    "summary_en": "The second volume contains the annual work and findings of 6 research units.",
    "summary_ar": "يتضمن المجلد الثاني الأعمال السنوية ونتائج 6 وحدات بحثية.",
    "date": "20 Eylül 2024",
    "category": "Yayın",
    "color": "#1e3a5f",
    "author": "IBXI Nashriyot",
    "readTime": "2 dk",
    "featured": false
  }
],

// ===============================================================
//  3. RESEARCH AREAS / ARAŞTIRMA ALANLARI
// ===============================================================
researchAreas: [
  {
    "id": 1,
    "icon": "⚖️",
    "title": "Usûl",
    "title_en": "Principles",
    "title_ar": "الأصول",
    "desc": "İslam ilimlerinin metodolojik temelleri ve ilkeleri üzerine araştırmalar",
    "desc_en": "Research on the methodological foundations and principles of Islamic sciences",
    "desc_ar": "أبحاث حول الأسس المنهجية ومبادئ العلوم الإسلامية",
    "count": 47
  },
  {
    "id": 2,
    "icon": "🎯",
    "title": "Makâsıd",
    "title_en": "Objectives",
    "title_ar": "المقاصد",
    "desc": "İslam hukukunun amaçları ve hedefleri; değerler felsefesi",
    "desc_en": "Objectives and goals of Islamic law; philosophy of values",
    "desc_ar": "غايات وأهداف الشريعة الإسلامية؛ فلسفة القيم",
    "count": 38
  },
  {
    "id": 3,
    "icon": "🔗",
    "title": "Bilgi Birliği",
    "title_en": "Unity of Knowledge",
    "title_ar": "وحدة المعرفة",
    "desc": "İslam perspektifinden bilimlerin birliği ve entegrasyonu",
    "desc_en": "Unity and integration of sciences from an Islamic perspective",
    "desc_ar": "وحدة وتكامل العلوم من منظور إسلامي",
    "count": 29
  },
  {
    "id": 4,
    "icon": "🌿",
    "title": "Ahlak & Estetik",
    "title_en": "Ethics & Aesthetics",
    "title_ar": "الأخلاق والجماليات",
    "desc": "İslam düşüncesinde ahlak felsefesi ve estetik anlayışı",
    "desc_en": "Philosophy of ethics and aesthetics in Islamic thought",
    "desc_ar": "فلسفة الأخلاق والجماليات في الفكر الإسلامي",
    "count": 22
  },
  {
    "id": 5,
    "icon": "📖",
    "title": "Kelam & Akaid",
    "title_en": "Theology & Creed",
    "title_ar": "الكلام والعقيدة",
    "desc": "İslam teolojisi, inançlar sistemi ve kelamî tartışmalar",
    "desc_en": "Islamic theology, belief systems and theological discussions",
    "desc_ar": "علم الكلام الإسلامي ومنظومة العقائد والحوارات الكلامية",
    "count": 35
  },
  {
    "id": 6,
    "icon": "🏛️",
    "title": "Medeniyet",
    "title_en": "Civilization",
    "title_ar": "الحضارة",
    "desc": "İslam medeniyetinin tarihi, kültürü ve günümüzdeki yansımaları",
    "desc_en": "History, culture and contemporary reflections of Islamic civilization",
    "desc_ar": "تاريخ الحضارة الإسلامية وثقافتها وانعكاساتها المعاصرة",
    "count": 41
  }
],

// ===============================================================
//  4. EVENTS / ETKİNLİKLER
// ===============================================================
events: [
  {
    "id": 1,
    "day": "25",
    "month": "OCA",
    "month_en": "JAN",
    "month_ar": "ينا",
    "title": "İslam Felsefesine Giriş Semineri",
    "title_en": "Introduction to Islamic Philosophy Seminar",
    "title_ar": "ندوة مدخل إلى الفلسفة الإسلامية",
    "type": "seminar",
    "location": "Samarqand, IBXI Markaz",
    "time": "14:00 - 17:00",
    "description": "İslam felsefesinin temel kavramları, tarihsel gelişimi ve günümüzdeki önemi.",
    "description_en": "Fundamental concepts, historical development and contemporary significance of Islamic philosophy.",
    "speaker": "Prof. Dr. Mehmet Arslan",
    "capacity": 120,
    "registered": 87
  },
  {
    "id": 2,
    "day": "02",
    "month": "ŞUB",
    "month_en": "FEB",
    "month_ar": "فبر",
    "title": "Uluslararası Hadis Araştırmaları Konferansı",
    "title_en": "International Hadith Studies Conference",
    "title_ar": "مؤتمر الدراسات الحديثية الدولي",
    "type": "conference",
    "location": "Online / Ankara",
    "time": "09:00 - 18:00",
    "description": "Hadis ilminin çağdaş meseleleri ve metodolojik tartışmaları üzerine uluslararası akademik buluşma.",
    "description_en": "International academic meeting on contemporary issues and methodological discussions in hadith sciences.",
    "speaker": "Çeşitli Konuşmacılar",
    "capacity": 300,
    "registered": 245
  },
  {
    "id": 3,
    "day": "10",
    "month": "ŞUB",
    "month_en": "FEB",
    "month_ar": "فبر",
    "title": "Akademi Tez Geliştirme Atölyesi",
    "title_en": "Academy Thesis Development Workshop",
    "title_ar": "ورشة تطوير الأطروحات الأكاديمية",
    "type": "workshop",
    "location": "IBXI Akademiya Salonu",
    "time": "10:00 - 16:00",
    "description": "Akademik tez yazım sürecinde metodoloji, kaynak kullanımı ve argümantasyon teknikleri.",
    "description_en": "Methodology, source usage and argumentation techniques in the academic thesis writing process.",
    "speaker": "Dr. Fatma Çetin",
    "capacity": 40,
    "registered": 38
  },
  {
    "id": 4,
    "day": "18",
    "month": "ŞUB",
    "month_en": "FEB",
    "month_ar": "فبر",
    "title": "Makâsıd Teorisi Online Ders Serisi – 3. Oturum",
    "title_en": "Maqasid Theory Online Lecture Series – Session 3",
    "title_ar": "سلسلة محاضرات نظرية المقاصد أونلاين – الجلسة 3",
    "type": "online",
    "location": "Zoom Webinar",
    "time": "20:00 - 22:00",
    "description": "Makâsıd teorisinin Şâtıbî sonrası gelişimi ve çağdaş yorumları.",
    "description_en": "Post-Shatibi development of maqasid theory and its contemporary interpretations.",
    "speaker": "Prof. Dr. Ahmed Yıldız",
    "capacity": 200,
    "registered": 167
  },
  {
    "id": 5,
    "day": "28",
    "month": "ŞUB",
    "month_en": "FEB",
    "month_ar": "فبر",
    "title": "İslam ve Modernite Paneli",
    "title_en": "Islam and Modernity Panel",
    "title_ar": "ندوة الإسلام والحداثة",
    "type": "seminar",
    "location": "Ankara Üniversitesi",
    "time": "15:00 - 18:30",
    "description": "İslam düşüncesinin moderniteyle etkileşimi ve çağdaş sorunlara yaklaşımı.",
    "description_en": "The interaction of Islamic thought with modernity and its approach to contemporary issues.",
    "speaker": "Panel: 4 Konuşmacı",
    "capacity": 250,
    "registered": 198
  },
  {
    "id": 6,
    "day": "08",
    "month": "MAR",
    "month_en": "MAR",
    "month_ar": "مار",
    "title": "Klasik Metin Okuma Semineri: İbn Sina",
    "title_en": "Classical Text Reading Seminar: Ibn Sina",
    "title_ar": "ندوة قراءة النصوص الكلاسيكية: ابن سينا",
    "type": "seminar",
    "location": "IBXI Kutubxonasi",
    "time": "10:00 - 13:00",
    "description": "İbn Sina'nın eş-Şifa eserinden seçme bölümlerin okunması ve tahlili.",
    "description_en": "Reading and analysis of selected chapters from Ibn Sina's al-Shifa.",
    "speaker": "Dr. Ali Özcan",
    "capacity": 30,
    "registered": 28
  },
  {
    "id": 7,
    "day": "15",
    "month": "MAR",
    "month_en": "MAR",
    "month_ar": "مار",
    "title": "İslam Ekonomisi Çalıştayı",
    "title_en": "Islamic Economics Workshop",
    "title_ar": "ورشة عمل الاقتصاد الإسلامي",
    "type": "workshop",
    "location": "IBXI Konferensiya zali",
    "time": "09:30 - 17:00",
    "description": "İslam ekonomisinin temel prensipleri ve modern finansal sistemle ilişkisi.",
    "description_en": "Fundamental principles of Islamic economics and its relationship with modern financial systems.",
    "speaker": "Prof. Dr. Hasan Karaman",
    "capacity": 60,
    "registered": 42
  },
  {
    "id": 8,
    "day": "22",
    "month": "MAR",
    "month_en": "MAR",
    "month_ar": "مار",
    "title": "Genç Araştırmacılar Sunumları",
    "title_en": "Young Researchers Presentations",
    "title_ar": "عروض الباحثين الشباب",
    "type": "conference",
    "location": "IBXI Akademiya Salonu",
    "time": "13:00 - 18:00",
    "description": "IBXI tarkibidaki genç araştırmacıların devam eden projelerini sundukları platform.",
    "description_en": "A platform where young researchers at IBXIpresent their ongoing projects.",
    "speaker": "8 Genç Araştırmacı",
    "capacity": 80,
    "registered": 65
  },
  {
    "id": 9,
    "day": "05",
    "month": "NİS",
    "month_en": "APR",
    "month_ar": "أبر",
    "title": "Tasavvuf ve Felsefe İlişkisi Semineri",
    "title_en": "Sufism and Philosophy Relationship Seminar",
    "title_ar": "ندوة العلاقة بين التصوف والفلسفة",
    "type": "seminar",
    "location": "Samarqand, IBXI Markaz",
    "time": "14:00 - 17:00",
    "description": "Tasavvuf düşüncesi ile felsefi gelenekler arasındaki tarihsel ve kavramsal etkileşimler.",
    "description_en": "Historical and conceptual interactions between Sufi thought and philosophical traditions.",
    "speaker": "Prof. Dr. Mustafa Kara",
    "capacity": 100,
    "registered": 76
  },
  {
    "id": 10,
    "day": "20",
    "month": "NİS",
    "month_en": "APR",
    "month_ar": "أبر",
    "title": "Dijital İnsaniyat ve İslam Araştırmaları",
    "title_en": "Digital Humanities and Islamic Studies",
    "title_ar": "الإنسانيات الرقمية والدراسات الإسلامية",
    "type": "online",
    "location": "Zoom Webinar",
    "time": "19:00 - 21:00",
    "description": "Dijital araçların İslam araştırmalarında kullanımı ve yeni metodolojik imkânlar.",
    "description_en": "The use of digital tools in Islamic studies and new methodological possibilities.",
    "speaker": "Dr. Zeynep Demir",
    "capacity": 150,
    "registered": 98
  },
  {
    "id": 11,
    "day": "10",
    "month": "MAY",
    "month_en": "MAY",
    "month_ar": "ماي",
    "title": "İslam Hukuku ve İnsan Hakları Konferansı",
    "title_en": "Islamic Law and Human Rights Conference",
    "title_ar": "مؤتمر الفقه الإسلامي وحقوق الإنسان",
    "type": "conference",
    "location": "Ankara Hilton",
    "time": "09:00 - 18:00",
    "description": "İslam hukuk geleneğindeki haklar kavramı ile çağdaş insan hakları söyleminin karşılaştırması.",
    "description_en": "Comparison of the concept of rights in Islamic legal tradition with contemporary human rights discourse.",
    "speaker": "12 Uluslararası Konuşmacı",
    "capacity": 400,
    "registered": 312
  },
  {
    "id": 12,
    "day": "25",
    "month": "MAY",
    "month_en": "MAY",
    "month_ar": "ماي",
    "title": "Ramazan Sonrası Değerlendirme Paneli",
    "title_en": "Post-Ramadan Evaluation Panel",
    "title_ar": "ندوة تقييم ما بعد رمضان",
    "type": "seminar",
    "location": "IBXI Konferensiya zali",
    "time": "15:00 - 17:30",
    "description": "Ramazan ayının toplumsal ve bireysel boyutları üzerine akademik bir değerlendirme.",
    "description_en": "An academic evaluation on the social and individual dimensions of the month of Ramadan.",
    "speaker": "Panel: 3 Konuşmacı",
    "capacity": 150,
    "registered": 120
  }
],

// ===============================================================
//  5. PUBLICATIONS / YAYINLAR
// ===============================================================
publications: [
  {
    "id": 1,
    "abbr": "KT",
    "title": "Kelam Tarihi: Erken Dönem İslam Teolojisi",
    "title_en": "History of Kalam: Early Islamic Theology",
    "author": "Prof. Dr. Ahmed Yıldız",
    "year": "2024",
    "type": "Kitap",
    "desc": "İslam teolojisinin oluşum sürecini ele alan kapsamlı bir akademik çalışma.",
    "desc_en": "A comprehensive academic study examining the formation process of Islamic theology.",
    "color": "#0e3526",
    "pages": 384,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "kelam",
      "tarih",
      "teoloji"
    ]
  },
  {
    "id": 2,
    "abbr": "UM",
    "title": "Usûl ve Makâsıd: Yöntem ve Amaç Birliği",
    "title_en": "Usul and Maqasid: Unity of Method and Purpose",
    "author": "Dr. Fatma Çetin",
    "year": "2024",
    "type": "Kitap",
    "desc": "İslam hukuk metodolojisinin temel kavramlarını modern perspektifle inceler.",
    "desc_en": "Examines the fundamental concepts of Islamic legal methodology from a modern perspective.",
    "color": "#1e3a5f",
    "pages": 296,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "usul",
      "makasid",
      "hukuk"
    ]
  },
  {
    "id": 3,
    "abbr": "İM",
    "title": "İslam Medeniyetinde Bilim ve Felsefe",
    "title_en": "Science and Philosophy in Islamic Civilization",
    "author": "Prof. Dr. Mehmet Arslan",
    "year": "2023",
    "type": "Kitap",
    "desc": "Ortaçağ İslam dünyasında bilimsel ve felsefi düşüncenin gelişimi.",
    "desc_en": "The development of scientific and philosophical thought in the medieval Islamic world.",
    "color": "#2a1a3a",
    "pages": 420,
    "language": "Türkçe",
    "series": "Medeniyet Serisi",
    "tags": [
      "medeniyet",
      "bilim",
      "felsefe"
    ]
  },
  {
    "id": 4,
    "abbr": "AD",
    "title": "Ahlak Düşüncesi: Klasik ve Çağdaş Yaklaşımlar",
    "title_en": "Ethical Thought: Classical and Contemporary Approaches",
    "author": "Dr. Sümeyye Kaya",
    "year": "2023",
    "type": "Derleme",
    "desc": "İslam ahlak filozoflarının görüşlerini bugünün perspektifiyle değerlendiren makale derlemesi.",
    "desc_en": "A compilation of articles evaluating the views of Islamic moral philosophers from today's perspective.",
    "color": "#1a3a2a",
    "pages": 248,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "ahlak",
      "etik",
      "felsefe"
    ]
  },
  {
    "id": 5,
    "abbr": "İD",
    "title": "Islom tafakkurida Epistemoloji",
    "title_en": "Epistemology in Islamic Thought",
    "author": "Prof. Dr. Ali Özcan",
    "year": "2022",
    "type": "Araştırma",
    "desc": "Bilgi ve hakikat sorununa İslam filozoflarının yaklaşımını sistematik olarak inceler.",
    "desc_en": "Systematically examines the approach of Islamic philosophers to the problem of knowledge and truth.",
    "color": "#3a1a1a",
    "pages": 312,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "epistemoloji",
      "bilgi",
      "felsefe"
    ]
  },
  {
    "id": 6,
    "abbr": "FT",
    "title": "Fıkıh Teorisi ve Çağdaş Sorunlar",
    "title_en": "Fiqh Theory and Contemporary Issues",
    "author": "Dr. Osman Erdoğan",
    "year": "2022",
    "type": "Kitap",
    "desc": "Modern hukuki sorunlara klasik fıkıh metodolojisiyle yaklaşım.",
    "desc_en": "Approaching modern legal issues with classical fiqh methodology.",
    "color": "#1a2a3a",
    "pages": 276,
    "language": "Türkçe",
    "series": "Hukuk Serisi",
    "tags": [
      "fikih",
      "hukuk",
      "metodoloji"
    ]
  },
  {
    "id": 7,
    "abbr": "TS",
    "title": "Tasavvuf Geleneği ve Çağdaş Yorumları",
    "title_en": "Sufi Tradition and Contemporary Interpretations",
    "author": "Prof. Dr. Mustafa Kara",
    "year": "2024",
    "type": "Kitap",
    "desc": "Tasavvuf düşüncesinin tarihsel gelişimi ve modern dönemdeki yeniden yorumlanması.",
    "desc_en": "Historical development of Sufi thought and its reinterpretation in the modern era.",
    "color": "#2a1a2a",
    "pages": 368,
    "language": "Türkçe",
    "series": "Medeniyet Serisi",
    "tags": [
      "tasavvuf",
      "tarih",
      "maneviyat"
    ]
  },
  {
    "id": 8,
    "abbr": "KA",
    "title": "Karşılaştırmalı Ahlak Felsefesi",
    "title_en": "Comparative Ethics Philosophy",
    "author": "Dr. Sümeyye Kaya",
    "year": "2024",
    "type": "Araştırma",
    "desc": "İslam, Batı ve Doğu Asya ahlak geleneklerinin karşılaştırmalı analizi.",
    "desc_en": "Comparative analysis of Islamic, Western and East Asian ethical traditions.",
    "color": "#1a3a1a",
    "pages": 224,
    "language": "Türkçe / İngilizce",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "ahlak",
      "karsilastirmali",
      "felsefe"
    ]
  },
  {
    "id": 9,
    "abbr": "İH",
    "title": "İslam Hukukunda Devlet Teorisi",
    "title_en": "Theory of State in Islamic Law",
    "author": "Prof. Dr. Hasan Karaman",
    "year": "2023",
    "type": "Kitap",
    "desc": "Klasik İslam hukuku kaynaklarında devlet kavramı ve yönetim ilkeleri.",
    "desc_en": "The concept of state and governance principles in classical Islamic law sources.",
    "color": "#0e3526",
    "pages": 340,
    "language": "Türkçe",
    "series": "Hukuk Serisi",
    "tags": [
      "hukuk",
      "devlet",
      "siyaset"
    ]
  },
  {
    "id": 10,
    "abbr": "MF",
    "title": "Mantık ve Felsefe: İbn Sina Perspektifi",
    "title_en": "Logic and Philosophy: The Perspective of Ibn Sina",
    "author": "Dr. Ali Özcan",
    "year": "2023",
    "type": "Araştırma",
    "desc": "İbn Sina'nın mantık anlayışı ve Batı felsefesine etkisi.",
    "desc_en": "Ibn Sina's understanding of logic and its influence on Western philosophy.",
    "color": "#2a1a3a",
    "pages": 288,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "mantik",
      "felsefe",
      "ibnsina"
    ]
  },
  {
    "id": 11,
    "abbr": "YR",
    "title": "Yıllık Araştırma Raporu 2024",
    "title_en": "Annual Research Report 2024",
    "author": "IBXI Tadqiqot Birimi",
    "year": "2024",
    "type": "Rapor",
    "desc": "IBXI ning 2024 yılındaki tüm araştırma faaliyetlerinin kapsamlı özeti.",
    "desc_en": "Comprehensive summary of all IBXIresearch activities in 2024.",
    "color": "#1e3a5f",
    "pages": 156,
    "language": "Türkçe / İngilizce",
    "series": "Yıllık Raporlar",
    "tags": [
      "rapor",
      "yillik",
      "arastirma"
    ]
  },
  {
    "id": 12,
    "abbr": "GI",
    "title": "Gazali'nin İhyâ'sı: Şerh ve Tahlil",
    "title_en": "Ghazali's Ihya: Commentary and Analysis",
    "author": "Prof. Dr. Mustafa Kara",
    "year": "2024",
    "type": "Kitap",
    "desc": "İhyâu Ulûmi'd-din'in seçme bölümlerinin modern Türkçe şerhi.",
    "desc_en": "Modern Turkish commentary on selected chapters of Ihya Ulum al-Din.",
    "color": "#3a2a1a",
    "pages": 512,
    "language": "Türkçe / Arapça",
    "series": "Klasik Metin Serisi",
    "tags": [
      "gazali",
      "ihya",
      "klasik"
    ]
  },
  {
    "id": 13,
    "abbr": "DI",
    "title": "Dijital İnsaniyat ve İslam Araştırmaları",
    "title_en": "Digital Humanities and Islamic Studies",
    "author": "Ar. Gör. Zeynep Demir",
    "year": "2024",
    "type": "Makale",
    "desc": "Dijital araçların İslam araştırmalarında kullanım potansiyeli üzerine metodolojik bir değerlendirme.",
    "desc_en": "A methodological evaluation on the potential use of digital tools in Islamic studies.",
    "color": "#1a2a3a",
    "pages": 42,
    "language": "İngilizce",
    "series": "IBXI Maqola seriyasi",
    "tags": [
      "dijital",
      "metodoloji",
      "teknoloji"
    ]
  },
  {
    "id": 14,
    "abbr": "SF",
    "title": "İslam Sanat Felsefesi: Estetik ve Maneviyat",
    "title_en": "Islamic Art Philosophy: Aesthetics and Spirituality",
    "author": "Dr. Sümeyye Kaya",
    "year": "2024",
    "type": "Kitap",
    "desc": "İslam sanatının felsefi temellerini ve manevî boyutlarını inceleyen özgün bir çalışma.",
    "desc_en": "An original study examining the philosophical foundations and spiritual dimensions of Islamic art.",
    "color": "#2a1a2a",
    "pages": 264,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "sanat",
      "estetik",
      "maneviyat"
    ]
  },
  {
    "id": 15,
    "abbr": "HM",
    "title": "Hadis Metodolojisi: Geleneksel ve Modern Yaklaşımlar",
    "title_en": "Hadith Methodology: Traditional and Modern Approaches",
    "author": "Prof. Dr. Ahmed Yıldız",
    "year": "2023",
    "type": "Kitap",
    "desc": "Hadis ilminin tarihsel metodolojisi ile modern eleştirel yaklaşımların karşılaştırması.",
    "desc_en": "Comparison of the historical methodology of hadith science with modern critical approaches.",
    "color": "#0e3526",
    "pages": 356,
    "language": "Türkçe",
    "series": "IBXI Tadqiqot seriyasi",
    "tags": [
      "hadis",
      "metodoloji",
      "elestiri"
    ]
  },
  {
    "id": 16,
    "abbr": "UT",
    "title": "Usûl Terminoloji Sözlüğü",
    "title_en": "Dictionary of Usul Terminology",
    "author": "IBXI Usûl Araştırma Birimi",
    "year": "2024",
    "type": "Sözlük",
    "desc": "1200'den fazla fıkıh usûlü terimini Türkçe, Arapça ve İngilizce açıklamalarıyla sunan kapsamlı sözlük.",
    "desc_en": "A comprehensive dictionary presenting over 1200 usul al-fiqh terms with Turkish, Arabic and English explanations.",
    "color": "#1e3a5f",
    "pages": 480,
    "language": "Türkçe / Arapça / İngilizce",
    "series": "Referans Serisi",
    "tags": [
      "sozluk",
      "usul",
      "terminoloji"
    ]
  }
],

// ===============================================================
//  6. TEAM / EKİP
// ===============================================================
team: [
  {
    "id": 1,
    "name": "Prof. Dr. Mustafa Kara",
    "role": "Kurucu Başkan",
    "role_en": "Founding President",
    "dept": "Temel İslam Bilimleri",
    "dept_en": "Fundamental Islamic Sciences",
    "initials": "MK",
    "bio": "30 yıllık akademik kariyerinde İslam düşüncesi üzerine 12 kitap ve 80'den fazla makale yayımlamıştır.",
    "bio_en": "In his 30-year academic career, he has published 12 books and over 80 articles on Islamic thought.",
    "education": "İstanbul Üniversitesi, İlahiyat Fakültesi",
    "specialization": [
      "İslam Felsefesi",
      "Kelam",
      "Tasavvuf"
    ],
    "avatarColor": "#0e3526"
  },
  {
    "id": 2,
    "name": "Prof. Dr. Ahmed Yıldız",
    "role": "Araştırma Direktörü",
    "role_en": "Research Director",
    "dept": "Kelam & Akaid",
    "dept_en": "Theology & Creed",
    "initials": "AY",
    "bio": "Kelam alanında uluslararası çapta tanınan uzman; 6 kitap ve 45 hakemli makale sahibi.",
    "bio_en": "An internationally recognized expert in Kalam; author of 6 books and 45 peer-reviewed articles.",
    "education": "Ankara Üniversitesi, İlahiyat Fakültesi",
    "specialization": [
      "Kelam",
      "Hadis",
      "Akaid"
    ],
    "avatarColor": "#1e3a5f"
  },
  {
    "id": 3,
    "name": "Dr. Fatma Çetin",
    "role": "Kıdemli Araştırmacı",
    "role_en": "Senior Researcher",
    "dept": "Usûl & Makâsıd",
    "dept_en": "Principles & Objectives",
    "initials": "FÇ",
    "bio": "Usûl-i fıkıh alanında doktora yapmış, makâsıd teorisinin çağdaş uygulamaları üzerine çalışmaktadır.",
    "bio_en": "Holds a PhD in Usul al-Fiqh, working on contemporary applications of maqasid theory.",
    "education": "SOAS, University of London",
    "specialization": [
      "Usûl",
      "Makâsıd",
      "İslam Hukuku"
    ],
    "avatarColor": "#1a3a2a"
  },
  {
    "id": 4,
    "name": "Prof. Dr. Mehmet Arslan",
    "role": "Akademi Başkanı",
    "role_en": "Academy Director",
    "dept": "İslam Felsefesi",
    "dept_en": "Islamic Philosophy",
    "initials": "MA",
    "bio": "İslam felsefesi alanında 25 yıllık deneyime sahip; IBXI Akademiya'nin kurucu koordinatörü.",
    "bio_en": "Has 25 years of experience in Islamic philosophy; founding coordinator of IBXI Academy.",
    "education": "McGill University, Islamic Studies",
    "specialization": [
      "İslam Felsefesi",
      "Mantık",
      "Bilim Tarihi"
    ],
    "avatarColor": "#2a1a3a"
  },
  {
    "id": 5,
    "name": "Dr. Sümeyye Kaya",
    "role": "Araştırmacı",
    "role_en": "Researcher",
    "dept": "Ahlak & Estetik",
    "dept_en": "Ethics & Aesthetics",
    "initials": "SK",
    "bio": "İslam ahlak felsefesi ve sanat estetiği üzerine uzmanlaşmış genç akademisyen.",
    "bio_en": "A young scholar specializing in Islamic moral philosophy and art aesthetics.",
    "education": "Marmara Üniversitesi, Felsefe",
    "specialization": [
      "Ahlak Felsefesi",
      "Estetik",
      "Sanat"
    ],
    "avatarColor": "#3a1a1a"
  },
  {
    "id": 6,
    "name": "Dr. Ali Özcan",
    "role": "Araştırmacı",
    "role_en": "Researcher",
    "dept": "Epistemoloji",
    "dept_en": "Epistemology",
    "initials": "AÖ",
    "bio": "İslam düşüncesinde bilgi teorisi ve İbn Sina mantığı üzerine çalışmaktadır.",
    "bio_en": "Works on epistemology in Islamic thought and Ibn Sina's logic.",
    "education": "Hacettepe Üniversitesi, Felsefe",
    "specialization": [
      "Epistemoloji",
      "Mantık",
      "İbn Sina"
    ],
    "avatarColor": "#1a2a3a"
  },
  {
    "id": 7,
    "name": "Ar. Gör. Zeynep Demir",
    "role": "Araştırma Asistanı",
    "role_en": "Research Assistant",
    "dept": "Medeniyet Araştırmaları",
    "dept_en": "Civilization Studies",
    "initials": "ZD",
    "bio": "Dijital insaniyat yöntemlerini İslam araştırmalarına uygulamak üzere çalışmaktadır.",
    "bio_en": "Working on applying digital humanities methods to Islamic studies.",
    "education": "Boğaziçi Üniversitesi, Tarih",
    "specialization": [
      "Dijital İnsaniyat",
      "Medeniyet",
      "Tarih"
    ],
    "avatarColor": "#0e3526"
  },
  {
    "id": 8,
    "name": "Ar. Gör. Hamza Öztürk",
    "role": "Araştırma Asistanı",
    "role_en": "Research Assistant",
    "dept": "Klasik Metinler",
    "dept_en": "Classical Texts",
    "initials": "HÖ",
    "bio": "Klasik Arapça metin tahkiki ve çevirisi alanında uzmanlaşmaktadır.",
    "bio_en": "Specializing in classical Arabic text editing and translation.",
    "education": "Ankara Üniversitesi, Arap Dili",
    "specialization": [
      "Klasik Metinler",
      "Arapça",
      "Tahkik"
    ],
    "avatarColor": "#1e3a5f"
  },
  {
    "id": 9,
    "name": "Prof. Dr. Hasan Karaman",
    "role": "Kıdemli Danışman",
    "role_en": "Senior Advisor",
    "dept": "İslam Hukuku",
    "dept_en": "Islamic Law",
    "initials": "HK",
    "bio": "İslam hukuk felsefesi ve devlet teorisi alanında 20 yıllık akademik deneyime sahip.",
    "bio_en": "Has 20 years of academic experience in Islamic legal philosophy and theory of state.",
    "education": "Selçuk Üniversitesi, İlahiyat",
    "specialization": [
      "İslam Hukuku",
      "Devlet Teorisi",
      "Siyaset"
    ],
    "avatarColor": "#2a1a3a"
  },
  {
    "id": 10,
    "name": "Dr. Osman Erdoğan",
    "role": "Araştırmacı",
    "role_en": "Researcher",
    "dept": "Fıkıh Çalışmaları",
    "dept_en": "Fiqh Studies",
    "initials": "OE",
    "bio": "Fıkıh teorisi ve çağdaş hukuki sorunlar üzerine uzmanlaşmış araştırmacı.",
    "bio_en": "A researcher specializing in fiqh theory and contemporary legal issues.",
    "education": "İstanbul Üniversitesi, Hukuk",
    "specialization": [
      "Fıkıh",
      "Çağdaş Hukuk",
      "Metodoloji"
    ],
    "avatarColor": "#1a3a2a"
  },
  {
    "id": 11,
    "name": "Merve Aktaş",
    "role": "Yayın Editörü",
    "role_en": "Publications Editor",
    "dept": "IBXI Nashriyot",
    "dept_en": "IBXI Publications",
    "initials": "MA",
    "bio": "IBXI ning tüm yayınlarının editörlük sürecini yürüten deneyimli yayıncı.",
    "bio_en": "An experienced publisher managing the editorial process of all IBXIpublications.",
    "education": "Bilkent Üniversitesi, Türk Edebiyatı",
    "specialization": [
      "Yayıncılık",
      "Editörlük",
      "Metin Analizi"
    ],
    "avatarColor": "#3a2a1a"
  },
  {
    "id": 12,
    "name": "Ahmet Yılmaz",
    "role": "Kütüphane Müdürü",
    "role_en": "Library Director",
    "dept": "IBXI Kutubxonasi",
    "dept_en": "IBXI Library",
    "initials": "AY",
    "bio": "5000'den fazla nadir eserin dijitalleştirilmesi projesinin koordinatörü.",
    "bio_en": "Coordinator of the digitization project for over 5000 rare works.",
    "education": "Ankara Üniversitesi, Bilgi ve Belge Yönetimi",
    "specialization": [
      "Kütüphanecilik",
      "Dijitalleştirme",
      "Arşiv"
    ],
    "avatarColor": "#1a2a3a"
  },
  {
    "id": 13,
    "name": "Elif Şahin",
    "role": "Akademi Koordinatörü",
    "role_en": "Academy Coordinator",
    "dept": "IBXI Akademiya",
    "dept_en": "IBXI Academy",
    "initials": "EŞ",
    "bio": "Akademi programlarının organizasyonu ve katılımcı ilişkilerinden sorumlu.",
    "bio_en": "Responsible for the organization of academy programs and participant relations.",
    "education": "Orta Doğu Teknik Üniversitesi, Eğitim Bilimleri",
    "specialization": [
      "Eğitim",
      "Program Geliştirme",
      "Koordinasyon"
    ],
    "avatarColor": "#2a1a2a"
  },
  {
    "id": 14,
    "name": "Burak Koç",
    "role": "İdari Koordinatör",
    "role_en": "Administrative Coordinator",
    "dept": "İdari İşler",
    "dept_en": "Administrative Affairs",
    "initials": "BK",
    "bio": "IBXI ning idari süreçleri, etkinlik organizasyonu ve kurumsal iletişimden sorumlu.",
    "bio_en": "Responsible for IBXI's administrative processes, event organization and corporate communication.",
    "education": "Gazi Üniversitesi, İşletme",
    "specialization": [
      "İdari Yönetim",
      "Etkinlik",
      "İletişim"
    ],
    "avatarColor": "#0e3526"
  }
],

// ===============================================================
//  7. ACADEMY PROGRAMS / AKADEMİ PROGRAMLARI
// ===============================================================
programs: [
  {
    "id": 1,
    "icon": "📘",
    "title": "Temel İslam Bilimleri",
    "title_en": "Foundations of Islamic Sciences",
    "title_ar": "أساسيات العلوم الإسلامية",
    "duration": "12 Hafta",
    "level": "Başlangıç",
    "lang": "Türkçe",
    "students": 45,
    "status": "active"
  },
  {
    "id": 2,
    "icon": "⚖️",
    "title": "Usûl-i Fıkıh İleri Seviye",
    "title_en": "Advanced Usul al-Fiqh",
    "title_ar": "أصول الفقه المتقدم",
    "duration": "16 Hafta",
    "level": "İleri",
    "lang": "Türkçe / Arapça",
    "students": 28,
    "status": "active"
  },
  {
    "id": 3,
    "icon": "🌟",
    "title": "İslam Felsefesi Sertifikası",
    "title_en": "Certificate in Islamic Philosophy",
    "title_ar": "شهادة في الفلسفة الإسلامية",
    "duration": "20 Hafta",
    "level": "Orta",
    "lang": "Türkçe / İngilizce",
    "students": 52,
    "status": "active"
  },
  {
    "id": 4,
    "icon": "🎯",
    "title": "Makâsıd Teorisi ve Uygulamaları",
    "title_en": "Maqasid Theory and Applications",
    "title_ar": "نظرية المقاصد وتطبيقاتها",
    "duration": "10 Hafta",
    "level": "İleri",
    "lang": "Türkçe",
    "students": 19,
    "status": "upcoming"
  },
  {
    "id": 5,
    "icon": "📜",
    "title": "Klasik Metin Okuma",
    "title_en": "Classical Text Reading",
    "title_ar": "قراءة النصوص الكلاسيكية",
    "duration": "8 Hafta",
    "level": "Orta",
    "lang": "Arapça",
    "students": 31,
    "status": "active"
  },
  {
    "id": 6,
    "icon": "🔬",
    "title": "İslam Araştırma Metodolojisi",
    "title_en": "Islamic Research Methodology",
    "title_ar": "منهجية البحث الإسلامي",
    "duration": "12 Hafta",
    "level": "Tüm Seviyeler",
    "lang": "Türkçe / İngilizce",
    "students": 67,
    "status": "active"
  },
  {
    "id": 7,
    "icon": "🌍",
    "title": "Karşılaştırmalı Din Çalışmaları",
    "title_en": "Comparative Religious Studies",
    "title_ar": "الدراسات الدينية المقارنة",
    "duration": "14 Hafta",
    "level": "İleri",
    "lang": "İngilizce",
    "students": 23,
    "status": "active"
  },
  {
    "id": 8,
    "icon": "🏛️",
    "title": "İslam Medeniyeti Tarihi",
    "title_en": "History of Islamic Civilization",
    "title_ar": "تاريخ الحضارة الإسلامية",
    "duration": "12 Hafta",
    "level": "Başlangıç",
    "lang": "Türkçe",
    "students": 58,
    "status": "upcoming"
  }
],

// ===============================================================
//  8. VIDEOS / VIBXIOLAR
// ===============================================================
videos: [
  {
    "id": 1,
    "title": "İslam'da Bilgi Anlayışı – Prof. Dr. Ahmed Yıldız",
    "title_en": "Understanding Knowledge in Islam – Prof. Dr. Ahmed Yildiz",
    "views": "12.4K",
    "duration": "52:18",
    "emoji": "🎓",
    "description": "İslam epistemolojisinin temel kavramları ve bilgi hiyerarşisi üzerine kapsamlı bir konuşma.",
    "description_en": "A comprehensive talk on the fundamental concepts of Islamic epistemology and the hierarchy of knowledge.",
    "date": "2024-11-15",
    "category": "Konferans",
    "speaker": "Prof. Dr. Ahmed Yıldız"
  },
  {
    "id": 2,
    "title": "Usûl'ün Önemi ve Günümüzdeki Yeri – Dr. Fatma Çetin",
    "title_en": "The Importance of Usul and Its Place Today – Dr. Fatma Cetin",
    "views": "8.7K",
    "duration": "38:45",
    "emoji": "⚖️",
    "description": "İslam hukuk metodolojisinin günümüz dünyasındaki geçerliliği ve önemi.",
    "description_en": "The validity and importance of Islamic legal methodology in today's world.",
    "date": "2024-10-22",
    "category": "Ders",
    "speaker": "Dr. Fatma Çetin"
  },
  {
    "id": 3,
    "title": "İslam Medeniyeti ve Bilim – Konferans 2024",
    "title_en": "Islamic Civilization and Science – Conference 2024",
    "views": "15.2K",
    "duration": "1:24:32",
    "emoji": "🏛️",
    "description": "İslam medeniyetinin bilimsel mirası üzerine çok konuşmacılı uluslararası konferans kaydı.",
    "description_en": "Multi-speaker international conference recording on the scientific legacy of Islamic civilization.",
    "date": "2024-09-18",
    "category": "Konferans",
    "speaker": "Çeşitli Konuşmacılar"
  },
  {
    "id": 4,
    "title": "Makâsıd el-Şeria – Temel Kavramlar",
    "title_en": "Maqasid al-Sharia – Fundamental Concepts",
    "views": "6.1K",
    "duration": "44:20",
    "emoji": "🎯",
    "description": "Şeriatın amaçları teorisinin beş temel ilkesi ve çağdaş yorumları.",
    "description_en": "The five fundamental principles of the theory of objectives of Sharia and their contemporary interpretations.",
    "date": "2024-08-30",
    "category": "Ders",
    "speaker": "Prof. Dr. Ahmed Yıldız"
  },
  {
    "id": 5,
    "title": "Gazali ve Felsefeye Bakışı – Panel Kaydı",
    "title_en": "Ghazali and His View on Philosophy – Panel Recording",
    "views": "9.8K",
    "duration": "1:12:05",
    "emoji": "📖",
    "description": "Gazali'nin felsefe eleştirisi ve İslam düşünce tarihindeki yeri üzerine akademik panel.",
    "description_en": "An academic panel on Ghazali's critique of philosophy and his place in the history of Islamic thought.",
    "date": "2024-07-14",
    "category": "Panel",
    "speaker": "Prof. Dr. Mustafa Kara"
  },
  {
    "id": 6,
    "title": "Klasik Arapça Metin Okuma Dersi – Giriş",
    "title_en": "Classical Arabic Text Reading Course – Introduction",
    "views": "4.3K",
    "duration": "35:22",
    "emoji": "📜",
    "description": "Klasik İslam metinlerini orijinal dilinde okumak için gerekli temel bilgiler.",
    "description_en": "Essential knowledge required for reading classical Islamic texts in their original language.",
    "date": "2024-06-20",
    "category": "Ders",
    "speaker": "Ar. Gör. Hamza Öztürk"
  },
  {
    "id": 7,
    "title": "İslam Ahlak Felsefesi: Erdem ve Karakter",
    "title_en": "Islamic Moral Philosophy: Virtue and Character",
    "views": "5.6K",
    "duration": "48:15",
    "emoji": "🌿",
    "description": "İslam ahlak geleneğinde erdem kavramı ve karakter eğitiminin temelleri.",
    "description_en": "The concept of virtue and foundations of character education in the Islamic ethical tradition.",
    "date": "2024-05-10",
    "category": "Konferans",
    "speaker": "Dr. Sümeyye Kaya"
  },
  {
    "id": 8,
    "title": "Dijital Çağda İslam Araştırmaları",
    "title_en": "Islamic Studies in the Digital Age",
    "views": "3.9K",
    "duration": "42:30",
    "emoji": "💻",
    "description": "Dijital araçlar ve yapay zekanın İslam araştırmalarını nasıl dönüştürdüğü.",
    "description_en": "How digital tools and AI are transforming Islamic studies.",
    "date": "2024-04-15",
    "category": "Panel",
    "speaker": "Ar. Gör. Zeynep Demir"
  },
  {
    "id": 9,
    "title": "İbn Haldun'un Umran Teorisi",
    "title_en": "Ibn Khaldun's Theory of Civilization",
    "views": "11.1K",
    "duration": "56:40",
    "emoji": "🏛️",
    "description": "İbn Haldun'un medeniyet anlayışı ve modern sosyal bilimlere katkısı.",
    "description_en": "Ibn Khaldun's understanding of civilization and his contribution to modern social sciences.",
    "date": "2024-03-22",
    "category": "Konferans",
    "speaker": "Prof. Dr. Mehmet Arslan"
  },
  {
    "id": 10,
    "title": "İslam Hukuku ve İnsan Hakları",
    "title_en": "Islamic Law and Human Rights",
    "views": "7.2K",
    "duration": "1:05:18",
    "emoji": "⚖️",
    "description": "İslam hukuk geleneğindeki haklar kavramı ve çağdaş insan hakları söylemiyle mukayese.",
    "description_en": "The concept of rights in Islamic legal tradition and its comparison with contemporary human rights discourse.",
    "date": "2024-02-18",
    "category": "Panel",
    "speaker": "Prof. Dr. Hasan Karaman"
  }
],

// ===============================================================
//  9. FAQ / SSS
// ===============================================================
faq: [
  {
    "q": "IBXI Akademiya programlarına kimler başvurabilir?",
    "q_en": "Who can apply to IBXI Academy programs?",
    "q_ar": "من يمكنه التقدم لبرامج أكاديمية المعهد؟",
    "a": "İlahiyat, felsefe, hukuk ve sosyal bilimler alanlarında lisans veya lisansüstü eğitim gören ya da bu alanlarda araştırma yapan herkes başvurabilir. Temel Arapça bilgisi bazı programlar için gereklidir.",
    "a_en": "Anyone with a bachelor's or postgraduate degree in theology, philosophy, law, or social sciences, or conducting research in these fields, can apply. Basic Arabic knowledge is required for some programs.",
    "a_ar": "يمكن لأي شخص حاصل على درجة البكالوريوس أو الدراسات العليا في اللاهوت أو الفلسفة أو القانون أو العلوم الاجتماعية التقدم. المعرفة الأساسية بالعربية مطلوبة لبعض البرامج.",
    "category": "Akademi"
  },
  {
    "q": "Programlar online mı yoksa yüz yüze mi?",
    "q_en": "Are the programs online or in-person?",
    "q_ar": "هل البرامج أونلاين أم حضورية؟",
    "a": "IBXI programlarının büyük çoğunluğu yüz yüze Ankara'da yürütülmekte olup, bazı programlar hibrit veya tamamen online olarak da sunulmaktadır.",
    "a_en": "Most IBXIprograms are conducted in-person in Ankara, while some programs are offered in hybrid or fully online formats.",
    "a_ar": "تُقام معظم برامج IBXIحضورياً في أنقرة، بينما تُقدم بعض البرامج بصيغة هجينة أو أونلاين بالكامل.",
    "category": "Akademi"
  },
  {
    "q": "Uluslararası ziyaretçi akademisyen programı nedir?",
    "q_en": "What is the international visiting scholar program?",
    "q_ar": "ما هو برنامج الأكاديمي الزائر الدولي؟",
    "a": "Bu program, yurt dışında akademik çalışmalarını yürüten araştırmacıların belirli bir dönem için IBXI tarkibida çalışmalarını sürdürmesine imkân tanır. Program; ofis imkânı, kütüphane erişimi ve yerel araştırmacılarla iş birliği fırsatı sunmaktadır.",
    "a_en": "This program allows researchers conducting academic work abroad to continue their studies within IBXIfor a specific period. The program offers office space, library access, and opportunities for collaboration with local researchers.",
    "a_ar": "يتيح هذا البرنامج للباحثين الذين يعملون أكاديمياً في الخارج مواصلة دراساتهم ضمن IBXIلفترة محددة. يوفر البرنامج مساحة مكتبية وإمكانية الوصول للمكتبة وفرص التعاون مع الباحثين المحليين.",
    "category": "Uluslararası"
  },
  {
    "q": "Yayınlara nasıl erişebilirim?",
    "q_en": "How can I access publications?",
    "q_ar": "كيف يمكنني الوصول إلى المنشورات؟",
    "a": "IBXI yayınlarının büyük bölümü kurumsal web sitesi üzerinden ücretsiz olarak indirilebilmektedir. Basılı kopyalar ise IBXI Nashriyot üzerinden temin edilebilir.",
    "a_en": "Most IBXIpublications can be downloaded for free from the institutional website. Printed copies can be obtained through IBXI Publications.",
    "a_ar": "يمكن تحميل معظم منشورات IBXIمجاناً من الموقع المؤسسي. يمكن الحصول على النسخ المطبوعة من خلال منشورات المعهد.",
    "category": "Yayın"
  },
  {
    "q": "IBXI ga nasıl bağış yapabilirim?",
    "q_en": "How can I donate to IBXI?",
    "q_ar": "كيف يمكنني التبرع للمعهد؟",
    "a": "IBXI'na banka havalesi, kredi kartı veya kurumsal web sitesi üzerinden online bağış yapabilirsiniz. Bağışlarınız vergi indirimine tabidir.",
    "a_en": "You can donate to IBXI via bank transfer, credit card, or online donation through the institutional website. Donations are tax-deductible.",
    "a_ar": "يمكنك التبرع لمعهد الإمام البخاري عبر التحويل البنكي أو بطاقة الائتمان أو التبرع أونلاين عبر الموقع المؤسسي. التبرعات معفاة من الضرائب.",
    "category": "Genel"
  },
  {
    "q": "Etkinliklere katılım ücreti var mı?",
    "q_en": "Is there a participation fee for events?",
    "q_ar": "هل هناك رسوم للمشاركة في الفعاليات؟",
    "a": "Seminerler ve paneller genellikle ücretsizdir. Konferanslar ve atölye çalışmaları için sembolik bir katılım ücreti alınabilir. Detaylar her etkinliğin sayfasında belirtilmektedir.",
    "a_en": "Seminars and panels are generally free. A nominal participation fee may be charged for conferences and workshops. Details are specified on each event's page.",
    "a_ar": "الندوات والحلقات النقاشية مجانية عموماً. قد يتم فرض رسوم رمزية للمؤتمرات وورش العمل. التفاصيل موضحة في صفحة كل فعالية.",
    "category": "Etkinlik"
  },
  {
    "q": "Araştırma projelerine nasıl katılabilirim?",
    "q_en": "How can I participate in research projects?",
    "q_ar": "كيف يمكنني المشاركة في المشاريع البحثية؟",
    "a": "IBXI araştırma projelerine katılım, açık çağrılar ve doğrudan davet yoluyla gerçekleşmektedir. Güncel çağrılar web sitesinde ve sosyal medya hesaplarında duyurulmaktadır.",
    "a_en": "Participation in IBXIresearch projects is through open calls and direct invitation. Current calls are announced on the website and social media accounts.",
    "a_ar": "المشاركة في مشاريع IBXIالبحثية تتم عبر الدعوات المفتوحة والدعوة المباشرة. يتم الإعلان عن الدعوات الحالية على الموقع وحسابات التواصل الاجتماعي.",
    "category": "Araştırma"
  },
  {
    "q": "Kütüphane hizmetlerinden kimler yararlanabilir?",
    "q_en": "Who can benefit from library services?",
    "q_ar": "من يمكنه الاستفادة من خدمات المكتبة؟",
    "a": "IBXI kütüphanesi, araştırmacılara, akademisyenlere ve IBXI Akademiya katılımcılarına açıktır. Ziyaretçilerin önceden randevu alması gerekmektedir.",
    "a_en": "The IBXIlibrary is open to researchers, academics, and IBXI Academy participants. Visitors are required to make an appointment in advance.",
    "a_ar": "مكتبة المعهد مفتوحة للباحثين والأكاديميين والمشاركين في أكاديمية المعهد. يُطلب من الزوار حجز موعد مسبقاً.",
    "category": "Genel"
  },
  {
    "q": "Sertifika programlarının geçerliliği nedir?",
    "q_en": "What is the validity of certificate programs?",
    "q_ar": "ما مدى صلاحية برامج الشهادات؟",
    "a": "IBXI sertifikaları, vakıf statüsünde verilen katılım ve başarı belgeleridir. Akademik kredi olarak kabul edilmeleri, ilgili üniversitenin değerlendirmesine bağlıdır.",
    "a_en": "IBXI certificates are participation and achievement documents issued under foundation status. Their acceptance as academic credits depends on the evaluation of the relevant university.",
    "a_ar": "شهادات IBXIهي وثائق مشاركة وإنجاز صادرة تحت صفة المؤسسة. قبولها كأرصدة أكاديمية يعتمد على تقييم الجامعة المعنية.",
    "category": "Akademi"
  },
  {
    "q": "IBXI ning kuruluş amacı nedir?",
    "q_en": "What is the founding purpose of IBXI?",
    "q_ar": "ما هو الغرض التأسيسي للمعهد؟",
    "a": "IBXI, İslam düşünce geleneğini bilimsel yöntemlerle araştırmak, bu alanda nitelikli araştırmacılar yetiştirmek ve toplumun entelektüel düzeyini yükseltmeye katkıda bulunmak amacıyla kurulmuştur.",
    "a_en": "IBXI was established to research the Islamic intellectual tradition using scientific methods, train qualified researchers in this field, and contribute to raising the intellectual level of society.",
    "a_ar": "تأسس IBXIللبحث في التقليد الفكري الإسلامي باستخدام المناهج العلمية، وتدريب باحثين مؤهلين في هذا المجال، والمساهمة في رفع المستوى الفكري للمجتمع.",
    "category": "Genel"
  }
],

// ===============================================================
//  10. BLOG POSTS / YAZILAR
// ===============================================================
blogPosts: [
  {
    "id": 1,
    "title": "Islom tafakkurida Bilgi ve Hikmet Ayrımı",
    "title_en": "The Distinction Between Knowledge and Wisdom in Islamic Thought",
    "title_ar": "التمييز بين العلم والحكمة في الفكر الإسلامي",
    "excerpt": "Klasik İslam kaynaklarında bilgi (ilm) ve hikmet kavramları arasındaki ince ayrım, modern epistemolojik tartışmalara yeni bir perspektif sunmaktadır. Bu yazıda, Gazali, İbn Rüşd ve İbn Arabi'nin bilgi anlayışlarını karşılaştırarak çağdaş bilgi toplumu için çıkarımlar sunuyoruz.",
    "excerpt_en": "The subtle distinction between knowledge (ilm) and wisdom (hikma) in classical Islamic sources offers a new perspective to modern epistemological discussions. In this article, we compare the epistemologies of Ghazali, Ibn Rushd and Ibn Arabi to draw implications for contemporary knowledge society.",
    "author": "Dr. Fatma Çetin",
    "date": "2025-01-10",
    "readTime": "8 dk",
    "category": "Felsefe",
    "tags": [
      "epistemoloji",
      "hikmet",
      "ilm"
    ],
    "featured": true,
    "color": "#1e3a5f"
  },
  {
    "id": 2,
    "title": "Makâsıd Teorisinin Güncel Uygulamaları",
    "title_en": "Contemporary Applications of Maqasid Theory",
    "title_ar": "التطبيقات المعاصرة لنظرية المقاصد",
    "excerpt": "İslam hukukunun amaçları (makâsıd) teorisi, çağdaş meselelere yaklaşımda esneklik ve derinlik sunmaktadır. Biyoetik, çevre hukuku ve dijital haklar gibi alanlarda makâsıd perspektifinin nasıl kullanılabileceğini inceliyoruz.",
    "excerpt_en": "The theory of objectives (maqasid) of Islamic law offers flexibility and depth in approaching contemporary issues. We examine how the maqasid perspective can be applied in areas such as bioethics, environmental law and digital rights.",
    "author": "Prof. Dr. Ahmed Yıldız",
    "date": "2024-12-20",
    "readTime": "10 dk",
    "category": "Hukuk",
    "tags": [
      "makasid",
      "hukuk",
      "biyoetik"
    ],
    "featured": true,
    "color": "#0e3526"
  },
  {
    "id": 3,
    "title": "Dijital Çağda Klasik Metin Araştırmaları",
    "title_en": "Classical Text Research in the Digital Age",
    "title_ar": "أبحاث النصوص الكلاسيكية في العصر الرقمي",
    "excerpt": "Yapay zeka ve metin madenciliği teknolojileri, klasik İslam metinlerinin analizi ve karşılaştırmalı çalışmalarında devrim niteliğinde imkânlar sunmaktadır.",
    "excerpt_en": "AI and text mining technologies offer revolutionary possibilities in the analysis and comparative study of classical Islamic texts.",
    "author": "Ar. Gör. Zeynep Demir",
    "date": "2024-12-05",
    "readTime": "6 dk",
    "category": "Teknoloji",
    "tags": [
      "dijital",
      "yapayzeka",
      "klasikmetin"
    ],
    "featured": false,
    "color": "#1a2a3a"
  },
  {
    "id": 4,
    "title": "İslam Ahlak Geleneğinde Erdem Etiği",
    "title_en": "Virtue Ethics in the Islamic Moral Tradition",
    "title_ar": "أخلاق الفضيلة في التقليد الأخلاقي الإسلامي",
    "excerpt": "İslam ahlak düşüncesinde erdem (fazîlet) kavramının Aristoteles geleneğiyle karşılaştırmalı analizi ve günümüz karakter eğitimi tartışmalarına katkısı.",
    "excerpt_en": "A comparative analysis of the concept of virtue (fadila) in Islamic moral thought with the Aristotelian tradition and its contribution to contemporary character education discussions.",
    "author": "Dr. Sümeyye Kaya",
    "date": "2024-11-18",
    "readTime": "12 dk",
    "category": "Ahlak",
    "tags": [
      "erdem",
      "ahlak",
      "karakter"
    ],
    "featured": true,
    "color": "#1a3a2a"
  },
  {
    "id": 5,
    "title": "İbn Sina'nın Mantık Mirasının İzinde",
    "title_en": "Tracing the Legacy of Ibn Sina's Logic",
    "title_ar": "تتبع إرث منطق ابن سينا",
    "excerpt": "İbn Sina'nın mantık sisteminin Latin Batı dünyasına geçişi ve Avrupa üniversitelerinde yüzyıllarca ders kitabı olarak okutulan eserlerinin etkisi.",
    "excerpt_en": "The transmission of Ibn Sina's logical system to the Latin West and the influence of his works taught as textbooks in European universities for centuries.",
    "author": "Dr. Ali Özcan",
    "date": "2024-11-02",
    "readTime": "9 dk",
    "category": "Felsefe",
    "tags": [
      "ibnsina",
      "mantik",
      "bati"
    ],
    "featured": false,
    "color": "#2a1a3a"
  },
  {
    "id": 6,
    "title": "İslam Medeniyetinde Kütüphane Geleneği",
    "title_en": "Library Tradition in Islamic Civilization",
    "title_ar": "تقليد المكتبات في الحضارة الإسلامية",
    "excerpt": "Beytü'l-Hikme'den Endülüs kütüphanelerine, İslam medeniyetinin bilgi koruma ve aktarma geleneğinin tarihsel yolculuğu.",
    "excerpt_en": "From Bayt al-Hikma to Andalusian libraries, the historical journey of Islamic civilization's tradition of preserving and transmitting knowledge.",
    "author": "Ahmet Yılmaz",
    "date": "2024-10-15",
    "readTime": "7 dk",
    "category": "Tarih",
    "tags": [
      "kutuphane",
      "medeniyet",
      "tarih"
    ],
    "featured": false,
    "color": "#3a2a1a"
  },
  {
    "id": 7,
    "title": "Kelam İlminde Yenilikçi Yaklaşımlar",
    "title_en": "Innovative Approaches in Kalam Science",
    "title_ar": "مناهج مبتكرة في علم الكلام",
    "excerpt": "Çağdaş kelam çalışmalarında yeni metodolojik yaklaşımlar ve geleneksel sorunların modern bilimsel verilerle yeniden ele alınması.",
    "excerpt_en": "New methodological approaches in contemporary kalam studies and the re-examination of traditional problems with modern scientific data.",
    "author": "Prof. Dr. Ahmed Yıldız",
    "date": "2024-09-28",
    "readTime": "11 dk",
    "category": "Kelam",
    "tags": [
      "kelam",
      "yenilik",
      "metodoloji"
    ],
    "featured": false,
    "color": "#1e3a5f"
  },
  {
    "id": 8,
    "title": "Tasavvuf ve Modern Psikoloji Diyalogu",
    "title_en": "Dialogue Between Sufism and Modern Psychology",
    "title_ar": "حوار بين التصوف وعلم النفس الحديث",
    "excerpt": "Tasavvuf geleneğindeki nefs terbiyesi kavramı ile modern psikolojinin öz-düzenleme teorileri arasındaki paralelliklerin incelenmesi.",
    "excerpt_en": "Examining the parallels between the concept of nafs training in the Sufi tradition and self-regulation theories of modern psychology.",
    "author": "Prof. Dr. Mustafa Kara",
    "date": "2024-09-10",
    "readTime": "8 dk",
    "category": "Tasavvuf",
    "tags": [
      "tasavvuf",
      "psikoloji",
      "nefs"
    ],
    "featured": false,
    "color": "#2a1a2a"
  },
  {
    "id": 9,
    "title": "İslam Hukuk Felsefesinde Maslahat Kavramı",
    "title_en": "The Concept of Maslaha in Islamic Legal Philosophy",
    "title_ar": "مفهوم المصلحة في فلسفة الفقه الإسلامي",
    "excerpt": "Maslahat (kamu yararı) kavramının İslam hukuk felsefesindeki yeri ve çağdaş yasama süreçlerine katkısı üzerine değerlendirme.",
    "excerpt_en": "An evaluation of the place of maslaha (public interest) in Islamic legal philosophy and its contribution to contemporary legislative processes.",
    "author": "Dr. Osman Erdoğan",
    "date": "2024-08-22",
    "readTime": "10 dk",
    "category": "Hukuk",
    "tags": [
      "maslahat",
      "hukuk",
      "fikih"
    ],
    "featured": false,
    "color": "#0e3526"
  },
  {
    "id": 10,
    "title": "Karşılaştırmalı Medeniyetler: Doğu ve Batı",
    "title_en": "Comparative Civilizations: East and West",
    "title_ar": "حضارات مقارنة: الشرق والغرب",
    "excerpt": "İslam medeniyeti ile Batı medeniyetinin tarihsel etkileşimleri, bilgi transferi ve karşılıklı zenginleşme süreçleri.",
    "excerpt_en": "Historical interactions between Islamic and Western civilizations, knowledge transfer and mutual enrichment processes.",
    "author": "Prof. Dr. Mehmet Arslan",
    "date": "2024-08-05",
    "readTime": "14 dk",
    "category": "Medeniyet",
    "tags": [
      "medeniyet",
      "karsilastirmali",
      "tarih"
    ],
    "featured": false,
    "color": "#1a2a3a"
  }
],

// ===============================================================
//  11. TESTIMONIALS / AKADEMİSYEN GÖRÜŞLERİ
// ===============================================================
testimonials: [
  {
    "id": 1,
    "name": "Prof. Dr. Seyyed Hossein Nasr",
    "institution": "George Washington University",
    "quote": "IBXI, İslam düşüncesinin çağdaş akademik dünyayla buluşmasında önemli bir köprü görevi görmektedir.",
    "quote_en": "IBXI serves as an important bridge connecting Islamic thought with the contemporary academic world.",
    "country": "ABD",
    "emoji": "🇺🇸"
  },
  {
    "id": 2,
    "name": "Prof. Dr. Tariq Ramadan",
    "institution": "University of Oxford",
    "quote": "IBXI ning disiplinlerarası yaklaşımı, İslam araştırmalarında yeni ufuklar açmaktadır.",
    "quote_en": "IBXI's interdisciplinary approach opens new horizons in Islamic studies.",
    "country": "İngiltere",
    "emoji": "🇬🇧"
  },
  {
    "id": 3,
    "name": "Prof. Dr. Wael Hallaq",
    "institution": "Columbia University",
    "quote": "İslam hukuk çalışmalarında IBXI ning ürettiği eserler, uluslararası akademik camiada takdirle karşılanmaktadır.",
    "quote_en": "IBXI's works in Islamic legal studies are welcomed with appreciation in the international academic community.",
    "country": "ABD",
    "emoji": "🇺🇸"
  },
  {
    "id": 4,
    "name": "Prof. Dr. Ibrahim Kalin",
    "institution": "Georgetown University",
    "quote": "IBXI, İslam medeniyetinin entelektüel mirasını araştırma konusunda Türkiye'nin öncü kurumlarından biridir.",
    "quote_en": "IBXI is one of Turkey's leading institutions in researching the intellectual heritage of Islamic civilization.",
    "country": "Türkiye",
    "emoji": "🇹🇷"
  },
  {
    "id": 5,
    "name": "Prof. Dr. Khaled Abou El Fadl",
    "institution": "UCLA School of Law",
    "quote": "Makâsıd araştırmaları alanında IBXI ning çalışmaları, modern İslam hukuk düşüncesine önemli katkılar sunmaktadır.",
    "quote_en": "IBXI's work in the field of maqasid research offers significant contributions to modern Islamic legal thought.",
    "country": "ABD",
    "emoji": "🇺🇸"
  },
  {
    "id": 6,
    "name": "Prof. Dr. Recep Şentürk",
    "institution": "İbn Haldun Üniversitesi",
    "quote": "IBXI ning akademi programları, genç araştırmacılar için benzersiz bir eğitim ortamı sağlamaktadır.",
    "quote_en": "IBXI's academy programs provide a unique educational environment for young researchers.",
    "country": "Türkiye",
    "emoji": "🇹🇷"
  },
  {
    "id": 7,
    "name": "Dr. Mona Siddiqui",
    "institution": "University of Edinburgh",
    "quote": "IBXI ning karşılaştırmalı ahlak çalışmaları, Doğu-Batı diyaloguna değerli bir katkı sunuyor.",
    "quote_en": "IBXI's comparative ethics studies offer a valuable contribution to East-West dialogue.",
    "country": "İskoçya",
    "emoji": "🏴󠁧󠁢󠁳󠁣󠁴󠁿"
  },
  {
    "id": 8,
    "name": "Prof. Dr. Ahmad Dallal",
    "institution": "American University of Beirut",
    "quote": "İslam bilim tarihi araştırmalarında IBXI, uluslararası standartlarda çalışmalar üretmektedir.",
    "quote_en": "IBXI produces works at international standards in the research of Islamic science history.",
    "country": "Lübnan",
    "emoji": "🇱🇧"
  }
],

// ===============================================================
//  12. GALLERY / GALERİ
// ===============================================================
gallery: [
  {
    "id": 1,
    "title": "Uluslararası İslam Felsefesi Sempozyumu 2024",
    "title_en": "International Islamic Philosophy Symposium 2024",
    "category": "Sempozyum",
    "date": "2024-11-20",
    "color": "#0e3526",
    "icon": "🎤",
    "count": 45
  },
  {
    "id": 2,
    "title": "IBXI Akademiya Güz Dönemi Mezuniyet Töreni",
    "title_en": "IBXI Academy Fall Graduation Ceremony",
    "category": "Akademi",
    "date": "2024-12-01",
    "color": "#1a3a2a",
    "icon": "🎓",
    "count": 32
  },
  {
    "id": 3,
    "title": "Klasik Metin Okuma Atölyesi",
    "title_en": "Classical Text Reading Workshop",
    "category": "Atölye",
    "date": "2024-10-15",
    "color": "#2a1a3a",
    "icon": "📜",
    "count": 18
  },
  {
    "id": 4,
    "title": "IBXI Kutubxonasi – Nadir Eserler Koleksiyonu",
    "title_en": "IBXI Library – Rare Works Collection",
    "category": "Kurum",
    "date": "2024-09-20",
    "color": "#1e3a5f",
    "icon": "📚",
    "count": 28
  },
  {
    "id": 5,
    "title": "Türk-Arap Düşünce Diyalogu Forumu",
    "title_en": "Turkish-Arab Thought Dialogue Forum",
    "category": "Konferans",
    "date": "2024-10-10",
    "color": "#1a2a3a",
    "icon": "🌍",
    "count": 56
  },
  {
    "id": 6,
    "title": "IBXI Markaz Binası – Ankara",
    "title_en": "IBXI Headquarters – Ankara",
    "category": "Kurum",
    "date": "2024-06-15",
    "color": "#0e3526",
    "icon": "🏛️",
    "count": 24
  },
  {
    "id": 7,
    "title": "Yaz Okulu 2024 – Kampüs Hayatı",
    "title_en": "Summer School 2024 – Campus Life",
    "category": "Akademi",
    "date": "2024-07-20",
    "color": "#1a3a2a",
    "icon": "☀️",
    "count": 67
  },
  {
    "id": 8,
    "title": "İslam Ekonomisi Çalıştayı",
    "title_en": "Islamic Economics Workshop",
    "category": "Atölye",
    "date": "2024-03-15",
    "color": "#3a2a1a",
    "icon": "⚖️",
    "count": 22
  },
  {
    "id": 9,
    "title": "Genç Araştırmacılar Sunumları 2024",
    "title_en": "Young Researchers Presentations 2024",
    "category": "Konferans",
    "date": "2024-03-22",
    "color": "#2a1a2a",
    "icon": "🔬",
    "count": 38
  },
  {
    "id": 10,
    "title": "İslam Sanatı Sergisi",
    "title_en": "Islamic Art Exhibition",
    "category": "Sergi",
    "date": "2024-04-05",
    "color": "#1e3a5f",
    "icon": "🎨",
    "count": 42
  },
  {
    "id": 11,
    "title": "Malezya IIUM Ziyareti ve İş Birliği",
    "title_en": "Malaysia IIUM Visit and Cooperation",
    "category": "Uluslararası",
    "date": "2024-11-25",
    "color": "#1a2a3a",
    "icon": "✈️",
    "count": 30
  },
  {
    "id": 12,
    "title": "Londra İslam Araştırmaları Merkezi Sunumu",
    "title_en": "London Centre for Islamic Studies Presentation",
    "category": "Uluslararası",
    "date": "2024-10-28",
    "color": "#2a1a3a",
    "icon": "🇬🇧",
    "count": 15
  }
]

}; // end DATA
