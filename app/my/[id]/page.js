"use client";

import {
  Caveat,
  Great_Vibes,
  Playfair_Display,
  Space_Mono,
  Bebas_Neue,
  Orbitron,
  Lobster,
  Cinzel,
  Permanent_Marker,
} from "next/font/google";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  SiTelegram,
  SiWhatsapp,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiFacebook,
} from "react-icons/si";

import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaLocationDot,
  FaLink,
  FaLinkedin,
  FaXTwitter,
  FaThreads,
  FaEllipsisVertical,
  FaGear,
  FaQrcode,
  FaXmark,
  FaPen,
  FaPalette,
  FaLanguage,
  FaTrash,
  FaChevronLeft,
  FaChevronDown,
  FaPlus,
  FaCamera,
  FaImage,
  FaCheck,
  FaMagnifyingGlass,
  FaFont,
} from "react-icons/fa6";

import {
  FaVk,
  FaOdnoklassniki,
} from "react-icons/fa";

import { CARD_THEMES } from "../../lib/cardThemes";

/* =========================================================
   TEXT
========================================================= */

const PREMIUM_REQUIRED_TEXT = {
  ar: "اشترك في Premium.",
  az: "Premium-a abunə olun.",
  bn: "Premium-এ সাবস্ক্রাইব করুন।",
  bg: "Абонирайте се за Premium.",
  zh: "订阅 Premium。",
  cs: "Předplaťte si Premium.",
  da: "Abonnér på Premium.",
  nl: "Abonneer op Premium.",
  en: "Subscribe to Premium.",
  fi: "Tilaa Premium.",
  fr: "Abonnez-vous à Premium.",
  de: "Premium abonnieren.",
  el: "Κάντε συνδρομή στο Premium.",
  he: "הירשמו ל-Premium.",
  hi: "Premium की सदस्यता लें।",
  hu: "Fizess elő a Premiumra.",
  id: "Berlangganan Premium.",
  it: "Abbonati a Premium.",
  ja: "Premiumに登録してください。",
  kk: "Premium-ға жазылыңыз.",
  ko: "Premium을 구독하세요.",
  ky: "Premium'га жазылыңыз.",
  ms: "Langgan Premium.",
  no: "Abonner på Premium.",
  fa: "در Premium مشترک شوید.",
  pl: "Subskrybuj Premium.",
  pt: "Assine o Premium.",
  ro: "Abonează-te la Premium.",
  ru: "Оформите Premium.",
  sr: "Претплатите се на Premium.",
  sk: "Predplaťte si Premium.",
  es: "Suscríbete a Premium.",
  sv: "Prenumerera på Premium.",
  tg: "Ба Premium обуна шавед.",
  th: "สมัคร Premium",
  tr: "Premium’a abone olun.",
  tk: "Premium-a ýazylyň.",
  uk: "Підпишіться на Premium.",
  ur: "Premium سبسکرائب کریں۔",
  uz: "Premiumga obuna bo‘ling.",
  vi: "Đăng ký Premium.",
};

const UPLOADED_TEXT = {
  ar: "تم الرفع.",
  az: "Yükləndi.",
  bn: "আপলোড হয়েছে।",
  bg: "Качено.",
  zh: "已上传。",
  cs: "Nahráno.",
  da: "Uploadet.",
  nl: "Geüpload.",
  en: "Uploaded.",
  fi: "Ladattu.",
  fr: "Chargé.",
  de: "Hochgeladen.",
  el: "Μεταφορτώθηκε.",
  he: "הועלה.",
  hi: "अपलोड हो गया।",
  hu: "Feltöltve.",
  id: "Diunggah.",
  it: "Caricato.",
  ja: "アップロードされました。",
  kk: "Жүктелді.",
  ko: "업로드되었습니다.",
  ky: "Жүктөлдү.",
  ms: "Dimuat naik.",
  no: "Lastet opp.",
  fa: "بارگذاری شد.",
  pl: "Przesłano.",
  pt: "Carregado.",
  ro: "Încărcat.",
  ru: "Загружено.",
  sr: "Отпремљено.",
  sk: "Nahrané.",
  es: "Cargado.",
  sv: "Uppladdat.",
  tg: "Боргузорӣ шуд.",
  th: "อัปโหลดแล้ว",
  tr: "Yüklendi.",
  tk: "Ýüklendi.",
  uk: "Завантажено.",
  ur: "اپ لوڈ ہو گیا۔",
  uz: "Yuklandi.",
  vi: "Đã tải lên.",
};

const fontHandwriting = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fontSignature = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const fontLuxury = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fontMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const fontPoster = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const fontTech = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fontRounded = Lobster({
  subsets: ["latin"],
  weight: "400",
});

const fontClassic = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fontMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
});

const TEXTS = {
  uz: {
    settings: "Sozlamalar",
    edit: "Tahrirlash",
    design: "Asosiy fon",
    language: "Til",
    deleteProfile: "Profilni o‘chirish",

    qr: "QR kod",
    qrEdit: "QR kodni tahrirlash",

    name: "Ism Familiya",
    bio: "Qisqa ma’lumot",

    links: "Havolalar",
    addLink: "Havola qo‘shish",

    service: "Xizmat",
    linkName: "Nomi",
    linkUrl: "Havola",

    save: "Saqlash",
    saved: "Saqlandi",

    avatar: "Profil rasmi",
    background: "Orqa fon",

    changeAvatar: "Rasmni almashtirish",
    changeBackground: "Fonni almashtirish",

screenLed: "Ekran cheti LED",
cardLed: "Karta cheti LED",
ledThickness: "LED qalinligi",

    ledColor: "LED rangi",
    customColor: "Maxsus rang",

    textStyle: "Yozuv stili",
    textStyleInfo:
      "Ism va qisqa ma’lumot ko‘rinishini tanlang",

    standard: "Standart",
    elegant: "Elegant",
    modern: "Modern",
    strong: "Qalin",

    chooseLanguage: "Tilni tanlang",
    searchLanguage: "Tilni qidirish...",
    searchTextStyle: "Yozuv stilini qidirish...",
    noTextStyle: "Yozuv stili topilmadi",

    deleteTitle: "Profil o‘chirilsinmi?",

    deleteWarning:
      "Barcha ma’lumotlaringiz o‘chiriladi va ularni qayta tiklab bo‘lmaydi.",

    no: "Yo‘q",
    yes: "Ha",

    empty: "Afsuski, hozircha bo‘sh",

    enterName:
      "Ism va familiyani kiriting.",

    onlyImage:
      "Faqat rasm yuklash mumkin.",

    photoTooBig:
      "Profil rasmi 5 MB dan oshmasligi kerak.",

    backgroundTooBig:
      "Orqa fon 10 MB dan oshmasligi kerak.",

    noLanguage:
      "Til topilmadi",
  },

  ru: {
    settings: "Настройки",
    edit: "Редактировать",
    design: "Основной фон",
    language: "Язык",
    deleteProfile: "Удалить профиль",

    qr: "QR-код",
    qrEdit: "Редактировать QR-код",

    name: "Имя и фамилия",
    bio: "Краткая информация",

    links: "Ссылки",
    addLink: "Добавить ссылку",

    service: "Сервис",
    linkName: "Название",
    linkUrl: "Ссылка",

    save: "Сохранить",
    saved: "Сохранено",

    avatar: "Фото профиля",
    background: "Фон",

    changeAvatar: "Изменить фото",
    changeBackground: "Изменить фон",

   screenLed: "LED по краю экрана",
cardLed: "LED по краю карточки",
ledThickness: "Толщина свечения LED",

    ledColor: "Цвет LED",
    customColor: "Свой цвет",

    textStyle: "Стиль текста",
    textStyleInfo:
      "Выберите стиль имени и описания",

    standard: "Стандарт",
    elegant: "Элегант",
    modern: "Современный",
    strong: "Жирный",

    chooseLanguage: "Выберите язык",
    searchLanguage: "Поиск языка...",
    searchTextStyle: "Поиск стиля текста...",
    noTextStyle: "Стиль текста не найден",

    deleteTitle: "Удалить профиль?",

    deleteWarning:
      "Все ваши данные будут удалены без возможности восстановления.",

    no: "Нет",
    yes: "Да",

    empty: "К сожалению, пока пусто",

    enterName:
      "Введите имя и фамилию.",

    onlyImage:
      "Можно загружать только изображения.",

    photoTooBig:
      "Фото профиля не должно превышать 5 МБ.",

    backgroundTooBig:
      "Фон не должен превышать 10 МБ.",

    noLanguage:
      "Язык не найден",
  },

  en: {
    settings: "Settings",
    edit: "Edit",
    design: "Main background",
    language: "Language",
    deleteProfile: "Delete profile",

    qr: "QR Code",
    qrEdit: "Edit QR Code",

    name: "Full name",
    bio: "Short information",

    links: "Links",
    addLink: "Add link",

    service: "Service",
    linkName: "Name",
    linkUrl: "Link",

    save: "Save",
    saved: "Saved",

    avatar: "Profile photo",
    background: "Background",

    changeAvatar: "Change photo",
    changeBackground: "Change background",

   screenLed: "Screen edge LED",
cardLed: "Card edge LED",
ledThickness: "LED thickness",

    ledColor: "LED color",
    customColor: "Custom color",

    textStyle: "Text style",
    textStyleInfo:
      "Choose the appearance of your name and description",

    standard: "Standard",
    elegant: "Elegant",
    modern: "Modern",
    strong: "Bold",

    chooseLanguage: "Choose language",
    searchLanguage: "Search language...",
    searchTextStyle: "Search text style...",
    noTextStyle: "No text style found",

    deleteTitle: "Delete profile?",

    deleteWarning:
      "All your data will be deleted and cannot be restored.",

    no: "No",
    yes: "Yes",

    empty: "Unfortunately, it is empty for now",

    enterName:
      "Enter your full name.",

    onlyImage:
      "Only images can be uploaded.",

    photoTooBig:
      "Profile photo must not exceed 5 MB.",

    backgroundTooBig:
      "Background must not exceed 10 MB.",

    noLanguage:
      "No language found",
  },

  tr: {
    settings: "Ayarlar",
    edit: "Düzenle",
    design: "Ana arka plan",
    language: "Dil",
    deleteProfile: "Profili sil",

    qr: "QR Kod",
    qrEdit: "QR kodu düzenle",

    name: "Ad Soyad",
    bio: "Kısa bilgi",

    links: "Bağlantılar",
    addLink: "Bağlantı ekle",

    service: "Hizmet",
    linkName: "Ad",
    linkUrl: "Bağlantı",

    save: "Kaydet",
    saved: "Kaydedildi",

    avatar: "Profil fotoğrafı",
    background: "Arka plan",

    changeAvatar: "Fotoğrafı değiştir",
    changeBackground: "Arka planı değiştir",

   screenLed: "Ekran kenarı LED",
cardLed: "Kart kenarı LED",
ledThickness: "LED kalınlığı",

    ledColor: "LED rengi",
    customColor: "Özel renk",

    textStyle: "Yazı stili",
    textStyleInfo:
      "Ad ve açıklama stilini seçin",

    standard: "Standart",
    elegant: "Zarif",
    modern: "Modern",
    strong: "Kalın",

    chooseLanguage: "Dil seçin",
    searchLanguage: "Dil ara...",
    searchTextStyle: "Yazı stili ara...",
    noTextStyle: "Yazı stili bulunamadı",

    deleteTitle: "Profil silinsin mi?",

    deleteWarning:
      "Tüm verileriniz silinecek ve geri yüklenemeyecek.",

    no: "Hayır",
    yes: "Evet",

    empty: "Maalesef, şimdilik boş",

    enterName:
      "Adınızı ve soyadınızı girin.",

    onlyImage:
      "Yalnızca resim yüklenebilir.",

    photoTooBig:
      "Profil fotoğrafı 5 MB'ı geçmemelidir.",

    backgroundTooBig:
      "Arka plan 10 MB'ı geçmemelidir.",

    noLanguage:
      "Dil bulunamadı",
  },
};

/* =========================================================
   SERVICES
========================================================= */

const SERVICES = [
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "instagram", label: "Instagram" },
  { value: "threads", label: "Threads" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X" },
  { value: "vk", label: "VK" },
  { value: "ok", label: "OK" },
  { value: "phone", label: "Telefon" },
  { value: "email", label: "Email" },
  { value: "website", label: "Website" },
  { value: "location", label: "Manzil" },
];

/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = [
  {
    code: "ar",
    name: "العربية",
    english: "Arabic",
    search: "arabic arab العربية",
  },
  {
    code: "az",
    name: "Azərbaycanca",
    english: "Azerbaijani",
    search: "azerbaijani azeri azərbaycan",
  },
  {
    code: "bn",
    name: "বাংলা",
    english: "Bengali",
    search: "bengali bangla বাংলা",
  },
  {
    code: "bg",
    name: "Български",
    english: "Bulgarian",
    search: "bulgarian български",
  },
  {
    code: "zh",
    name: "中文",
    english: "Chinese",
    search: "chinese china 中文",
  },
  {
    code: "cs",
    name: "Čeština",
    english: "Czech",
    search: "czech čeština",
  },
  {
    code: "da",
    name: "Dansk",
    english: "Danish",
    search: "danish dansk",
  },
  {
    code: "nl",
    name: "Nederlands",
    english: "Dutch",
    search: "dutch nederlands",
  },
  {
    code: "en",
    name: "English",
    english: "English",
    search: "english",
  },
  {
    code: "fi",
    name: "Suomi",
    english: "Finnish",
    search: "finnish suomi",
  },
  {
    code: "fr",
    name: "Français",
    english: "French",
    search: "french français francais",
  },
  {
    code: "de",
    name: "Deutsch",
    english: "German",
    search: "german deutsch",
  },
  {
    code: "el",
    name: "Ελληνικά",
    english: "Greek",
    search: "greek ελληνικά",
  },
  {
    code: "he",
    name: "עברית",
    english: "Hebrew",
    search: "hebrew עברית",
  },
  {
    code: "hi",
    name: "हिन्दी",
    english: "Hindi",
    search: "hindi हिन्दी india",
  },
  {
    code: "hu",
    name: "Magyar",
    english: "Hungarian",
    search: "hungarian magyar",
  },
  {
    code: "id",
    name: "Bahasa Indonesia",
    english: "Indonesian",
    search: "indonesian indonesia bahasa",
  },
  {
    code: "it",
    name: "Italiano",
    english: "Italian",
    search: "italian italiano",
  },
  {
    code: "ja",
    name: "日本語",
    english: "Japanese",
    search: "japanese japan 日本語",
  },
  {
    code: "kk",
    name: "Қазақша",
    english: "Kazakh",
    search: "kazakh қазақша qazaq",
  },
  {
    code: "ko",
    name: "한국어",
    english: "Korean",
    search: "korean korea 한국어",
  },
  {
    code: "ky",
    name: "Кыргызча",
    english: "Kyrgyz",
    search: "kyrgyz кыргызча kirgiz",
  },
  {
    code: "ms",
    name: "Bahasa Melayu",
    english: "Malay",
    search: "malay malaysia melayu",
  },
  {
    code: "no",
    name: "Norsk",
    english: "Norwegian",
    search: "norwegian norsk",
  },
  {
    code: "fa",
    name: "فارسی",
    english: "Persian",
    search: "persian farsi فارسی",
  },
  {
    code: "pl",
    name: "Polski",
    english: "Polish",
    search: "polish polski",
  },
  {
    code: "pt",
    name: "Português",
    english: "Portuguese",
    search: "portuguese português portugues",
  },
  {
    code: "ro",
    name: "Română",
    english: "Romanian",
    search: "romanian română romana",
  },
  {
    code: "ru",
    name: "Русский",
    english: "Russian",
    search: "russian rus русский",
  },
  {
    code: "sr",
    name: "Српски",
    english: "Serbian",
    search: "serbian српски",
  },
  {
    code: "sk",
    name: "Slovenčina",
    english: "Slovak",
    search: "slovak slovenčina",
  },
  {
    code: "es",
    name: "Español",
    english: "Spanish",
    search: "spanish español espanol",
  },
  {
    code: "sv",
    name: "Svenska",
    english: "Swedish",
    search: "swedish svenska",
  },
  {
    code: "tg",
    name: "Тоҷикӣ",
    english: "Tajik",
    search: "tajik тоҷикӣ tojik",
  },
  {
    code: "th",
    name: "ไทย",
    english: "Thai",
    search: "thai thailand ไทย",
  },
  {
    code: "tr",
    name: "Türkçe",
    english: "Turkish",
    search: "turkish türkçe turk",
  },
  {
    code: "tk",
    name: "Türkmençe",
    english: "Turkmen",
    search: "turkmen türkmençe",
  },
  {
    code: "uk",
    name: "Українська",
    english: "Ukrainian",
    search: "ukrainian українська",
  },
  {
    code: "ur",
    name: "اردو",
    english: "Urdu",
    search: "urdu اردو pakistan",
  },
  {
    code: "uz",
    name: "O‘zbekcha",
    english: "Uzbek",
    search: "uzbek o‘zbekcha ozbek o'zbek",
  },
  {
    code: "vi",
    name: "Tiếng Việt",
    english: "Vietnamese",
    search: "vietnamese vietnam tiếng việt",
  },
].sort((a, b) =>
  a.english.localeCompare(b.english)
);



/* =========================================================
   ADDITIONAL LANGUAGE TRANSLATIONS — PART 2
   31 LANGUAGES
========================================================= */

const TRANSLATION_KEYS = [
  "settings", "edit", "design", "language",
  "deleteProfile", "qr", "qrEdit", "name",
  "bio", "links", "addLink", "service",
  "linkName", "linkUrl", "save", "saved",
  "avatar", "background", "changeAvatar",
  "changeBackground", "screenLed", "cardLed",
  "ledThickness", "ledColor", "customColor",
  "textStyle", "textStyleInfo", "standard",
  "elegant", "modern", "strong",
  "chooseLanguage", "searchLanguage",
  "searchTextStyle", "noTextStyle",
  "deleteTitle", "deleteWarning",
  "no", "yes", "empty", "enterName",
  "onlyImage", "photoTooBig",
  "backgroundTooBig", "noLanguage",
  "premiumDescription",
  "premiumMonthly", "premiumYearly",
];

const OTHER_LANGUAGES = {

  ar: [
    "الإعدادات", "تعديل", "الخلفية الرئيسية", "اللغة",
    "حذف الملف الشخصي", "رمز QR", "تعديل رمز QR", "الاسم الكامل",
    "معلومات مختصرة", "الروابط", "إضافة رابط", "الخدمة",
    "الاسم", "الرابط", "حفظ", "تم الحفظ",
    "صورة الملف الشخصي", "الخلفية", "تغيير الصورة",
    "تغيير الخلفية", "إضاءة LED لحافة الشاشة", "إضاءة LED لحافة البطاقة",
    "سُمك إضاءة LED", "لون LED", "لون مخصص",
    "نمط النص", "اختر مظهر الاسم والوصف", "قياسي",
    "أنيق", "حديث", "عريض",
    "اختر اللغة", "البحث عن لغة...",
    "البحث عن نمط النص...", "لم يتم العثور على نمط",
    "حذف الملف الشخصي؟", "سيتم حذف جميع بياناتك ولا يمكن استعادتها.",
    "لا", "نعم", "لا يوجد محتوى بعد", "أدخل اسمك الكامل.",
    "يمكن تحميل الصور فقط.", "يجب ألا تتجاوز صورة الملف الشخصي 5 ميغابايت.",
    "يجب ألا تتجاوز الخلفية 10 ميغابايت.", "لم يتم العثور على اللغة",
    "استمتع بجميع مزايا Premium",
    "Premium لمدة 30 يومًا", "Premium سنوي",
  ],

  az: [
    "Parametrlər", "Redaktə et", "Əsas fon", "Dil",
    "Profili sil", "QR kod", "QR kodu redaktə et", "Tam ad",
    "Qısa məlumat", "Keçidlər", "Keçid əlavə et", "Xidmət",
    "Ad", "Keçid", "Yadda saxla", "Yadda saxlanıldı",
    "Profil şəkli", "Fon", "Şəkli dəyiş",
    "Fonu dəyiş", "Ekran kənarının LED işığı", "Kart kənarının LED işığı",
    "LED qalınlığı", "LED rəngi", "Fərdi rəng",
    "Mətn üslubu", "Ad və təsvirin görünüşünü seçin", "Standart",
    "Zərif", "Müasir", "Qalın",
    "Dil seçin", "Dil axtarın...",
    "Mətn üslubu axtarın...", "Mətn üslubu tapılmadı",
    "Profili silmək?", "Bütün məlumatlarınız silinəcək və bərpa edilə bilməyəcək.",
    "Xeyr", "Bəli", "Hələlik boşdur", "Tam adınızı daxil edin.",
    "Yalnız şəkillər yüklənə bilər.", "Profil şəkli 5 MB-dan böyük olmamalıdır.",
    "Fon 10 MB-dan böyük olmamalıdır.", "Dil tapılmadı",
    "Bütün Premium imkanlarından istifadə edin",
    "30 günlük Premium", "İllik Premium",
  ],
  
  bn: [
    "সেটিংস", "সম্পাদনা", "প্রধান পটভূমি", "ভাষা",
    "প্রোফাইল মুছুন", "QR কোড", "QR কোড সম্পাদনা", "পুরো নাম",
    "সংক্ষিপ্ত তথ্য", "লিংক", "লিংক যোগ করুন", "সেবা",
    "নাম", "লিংক", "সংরক্ষণ", "সংরক্ষিত হয়েছে",
    "প্রোফাইল ছবি", "পটভূমি", "ছবি পরিবর্তন",
    "পটভূমি পরিবর্তন", "স্ক্রিনের প্রান্তের LED", "কার্ডের প্রান্তের LED",
    "LED-এর পুরুত্ব", "LED-এর রং", "নিজস্ব রং",
    "লেখার ধরন", "নাম ও বিবরণের চেহারা বেছে নিন", "সাধারণ",
    "মার্জিত", "আধুনিক", "গাঢ়",
    "ভাষা নির্বাচন করুন", "ভাষা খুঁজুন...",
    "লেখার ধরন খুঁজুন...", "লেখার ধরন পাওয়া যায়নি",
    "প্রোফাইল মুছবেন?", "আপনার সব তথ্য মুছে যাবে এবং পুনরুদ্ধার করা যাবে না।",
    "না", "হ্যাঁ", "এখনও খালি", "আপনার পুরো নাম লিখুন।",
    "শুধু ছবি আপলোড করা যাবে।", "প্রোফাইল ছবি ৫ MB-এর বেশি হতে পারবে না।",
    "পটভূমি ১০ MB-এর বেশি হতে পারবে না।", "ভাষা পাওয়া যায়নি",
    "Premium-এর সব সুবিধা উপভোগ করুন",
    "৩০ দিনের Premium", "বার্ষিক Premium",
  ],

  bg: [
    "Настройки", "Редактиране", "Основен фон", "Език",
    "Изтриване на профила", "QR код", "Редактиране на QR код", "Пълно име",
    "Кратка информация", "Връзки", "Добавяне на връзка", "Услуга",
    "Име", "Връзка", "Запазване", "Запазено",
    "Снимка на профила", "Фон", "Смяна на снимката",
    "Смяна на фона", "LED по ръба на екрана", "LED по ръба на картата",
    "Дебелина на LED", "Цвят на LED", "Персонализиран цвят",
    "Стил на текста", "Изберете вида на името и описанието", "Стандартен",
    "Елегантен", "Модерен", "Удебелен",
    "Изберете език", "Търсене на език...",
    "Търсене на стил...", "Няма намерен стил",
    "Изтриване на профила?", "Всичките ви данни ще бъдат изтрити без възможност за възстановяване.",
    "Не", "Да", "Засега е празно", "Въведете пълното си име.",
    "Могат да се качват само изображения.", "Снимката не трябва да надвишава 5 MB.",
    "Фонът не трябва да надвишава 10 MB.", "Езикът не е намерен",
    "Използвайте всички функции на Premium",
    "30-дневен Premium", "Годишен Premium",
  ],

  zh: [
    "设置", "编辑", "主背景", "语言",
    "删除个人资料", "二维码", "编辑二维码", "姓名",
    "简介", "链接", "添加链接", "服务",
    "名称", "链接", "保存", "已保存",
    "头像", "背景", "更换头像",
    "更换背景", "屏幕边缘 LED", "卡片边缘 LED",
    "LED 灯光粗细", "LED 颜色", "自定义颜色",
    "文字样式", "选择姓名和简介的显示样式", "标准",
    "优雅", "现代", "粗体",
    "选择语言", "搜索语言...",
    "搜索文字样式...", "未找到文字样式",
    "删除个人资料？", "您的所有数据将被删除且无法恢复。",
    "否", "是", "目前为空", "请输入您的姓名。",
    "只能上传图片。", "头像不能超过 5 MB。",
    "背景不能超过 10 MB。", "未找到语言",
    "享受所有 Premium 功能",
    "30 天 Premium", "年度 Premium",
  ],

  cs: [
    "Nastavení", "Upravit", "Hlavní pozadí", "Jazyk",
    "Smazat profil", "QR kód", "Upravit QR kód", "Celé jméno",
    "Stručné informace", "Odkazy", "Přidat odkaz", "Služba",
    "Název", "Odkaz", "Uložit", "Uloženo",
    "Profilová fotografie", "Pozadí", "Změnit fotografii",
    "Změnit pozadí", "LED na okraji obrazovky", "LED na okraji karty",
    "Tloušťka LED", "Barva LED", "Vlastní barva",
    "Styl textu", "Vyberte vzhled jména a popisu", "Standardní",
    "Elegantní", "Moderní", "Tučné",
    "Vyberte jazyk", "Hledat jazyk...",
    "Hledat styl textu...", "Styl textu nebyl nalezen",
    "Smazat profil?", "Všechna vaše data budou smazána a nebude možné je obnovit.",
    "Ne", "Ano", "Zatím prázdné", "Zadejte celé jméno.",
    "Lze nahrávat pouze obrázky.", "Profilová fotografie nesmí přesáhnout 5 MB.",
    "Pozadí nesmí přesáhnout 10 MB.", "Jazyk nebyl nalezen",
    "Využívejte všechny funkce Premium",
    "Premium na 30 dní", "Roční Premium",
  ],

  da: [
    "Indstillinger", "Rediger", "Primær baggrund", "Sprog",
    "Slet profil", "QR-kode", "Rediger QR-kode", "Fulde navn",
    "Kort information", "Links", "Tilføj link", "Tjeneste",
    "Navn", "Link", "Gem", "Gemt",
    "Profilbillede", "Baggrund", "Skift billede",
    "Skift baggrund", "LED langs skærmkanten", "LED langs kortkanten",
    "LED-tykkelse", "LED-farve", "Brugerdefineret farve",
    "Tekststil", "Vælg udseende for navn og beskrivelse", "Standard",
    "Elegant", "Moderne", "Fed",
    "Vælg sprog", "Søg efter sprog...",
    "Søg efter tekststil...", "Ingen tekststil fundet",
    "Slet profil?", "Alle dine data slettes og kan ikke gendannes.",
    "Nej", "Ja", "Tomt indtil videre", "Indtast dit fulde navn.",
    "Kun billeder kan uploades.", "Profilbilledet må ikke overstige 5 MB.",
    "Baggrunden må ikke overstige 10 MB.", "Sproget blev ikke fundet",
    "Få adgang til alle Premium-funktioner",
    "30 dages Premium", "Årligt Premium",
  ],

  nl: [
    "Instellingen", "Bewerken", "Hoofdachtergrond", "Taal",
    "Profiel verwijderen", "QR-code", "QR-code bewerken", "Volledige naam",
    "Korte informatie", "Links", "Link toevoegen", "Dienst",
    "Naam", "Link", "Opslaan", "Opgeslagen",
    "Profielfoto", "Achtergrond", "Foto wijzigen",
    "Achtergrond wijzigen", "LED langs schermrand", "LED langs kaartrand",
    "LED-dikte", "LED-kleur", "Aangepaste kleur",
    "Tekststijl", "Kies de weergave van naam en beschrijving", "Standaard",
    "Elegant", "Modern", "Vet",
    "Kies taal", "Taal zoeken...",
    "Tekststijl zoeken...", "Geen tekststijl gevonden",
    "Profiel verwijderen?", "Al je gegevens worden verwijderd en kunnen niet worden hersteld.",
    "Nee", "Ja", "Voorlopig leeg", "Voer je volledige naam in.",
    "Alleen afbeeldingen kunnen worden geüpload.", "De profielfoto mag niet groter zijn dan 5 MB.",
    "De achtergrond mag niet groter zijn dan 10 MB.", "Taal niet gevonden",
    "Geniet van alle Premium-functies",
    "30 dagen Premium", "Jaarlijks Premium",
  ],

    en: [
    "Settings", "Edit", "Main background", "Language",
    "Delete profile", "QR Code", "Edit QR Code", "Full name",
    "Short information", "Links", "Add link", "Service",
    "Name", "Link", "Save", "Saved",
    "Profile photo", "Background", "Change photo",
    "Change background", "Screen edge LED", "Card edge LED",
    "LED thickness", "LED color", "Custom color",
    "Text style", "Choose the appearance of your name and description", "Standard",
    "Elegant", "Modern", "Bold",
    "Choose language", "Search language...",
    "Search text style...", "No text style found",
    "Delete profile?", "All your data will be deleted and cannot be restored.",
    "No", "Yes", "Unfortunately, it is empty for now", "Enter your full name.",
    "Only images can be uploaded.", "Profile photo must not exceed 5 MB.",
    "Background must not exceed 10 MB.", "No language found",
    "Enjoy all Premium features",
    "30-day Premium", "Annual Premium",
  ],
  
  fi: [
    "Asetukset", "Muokkaa", "Päätausta", "Kieli",
    "Poista profiili", "QR-koodi", "Muokkaa QR-koodia", "Koko nimi",
    "Lyhyet tiedot", "Linkit", "Lisää linkki", "Palvelu",
    "Nimi", "Linkki", "Tallenna", "Tallennettu",
    "Profiilikuva", "Tausta", "Vaihda kuva",
    "Vaihda tausta", "Näytön reunan LED", "Kortin reunan LED",
    "LED-valon paksuus", "LED-väri", "Mukautettu väri",
    "Tekstin tyyli", "Valitse nimen ja kuvauksen ulkoasu", "Vakio",
    "Tyylikäs", "Moderni", "Lihavoitu",
    "Valitse kieli", "Hae kieltä...",
    "Hae tekstityyliä...", "Tekstityyliä ei löytynyt",
    "Poistetaanko profiili?", "Kaikki tietosi poistetaan, eikä niitä voi palauttaa.",
    "Ei", "Kyllä", "Toistaiseksi tyhjä", "Anna koko nimesi.",
    "Vain kuvia voi ladata.", "Profiilikuvan koko saa olla enintään 5 Mt.",
    "Taustan koko saa olla enintään 10 Mt.", "Kieltä ei löytynyt",
    "Käytä kaikkia Premium-ominaisuuksia",
    "30 päivän Premium", "Vuotuinen Premium",
  ],

  fr: [
    "Paramètres", "Modifier", "Arrière-plan principal", "Langue",
    "Supprimer le profil", "Code QR", "Modifier le code QR", "Nom complet",
    "Brève description", "Liens", "Ajouter un lien", "Service",
    "Nom", "Lien", "Enregistrer", "Enregistré",
    "Photo de profil", "Arrière-plan", "Changer la photo",
    "Changer l'arrière-plan", "LED au bord de l'écran", "LED au bord de la carte",
    "Épaisseur LED", "Couleur LED", "Couleur personnalisée",
    "Style de texte", "Choisissez l'apparence du nom et de la description", "Standard",
    "Élégant", "Moderne", "Gras",
    "Choisir une langue", "Rechercher une langue...",
    "Rechercher un style...", "Aucun style trouvé",
    "Supprimer le profil ?", "Toutes vos données seront supprimées définitivement.",
    "Non", "Oui", "Vide pour le moment", "Saisissez votre nom complet.",
    "Seules les images sont autorisées.", "La photo de profil ne doit pas dépasser 5 Mo.",
    "L'arrière-plan ne doit pas dépasser 10 Mo.", "Langue introuvable",
    "Profitez de toutes les fonctionnalités Premium",
    "Premium 30 jours", "Premium annuel",
  ],

  de: [
    "Einstellungen", "Bearbeiten", "Haupthintergrund", "Sprache",
    "Profil löschen", "QR-Code", "QR-Code bearbeiten", "Vollständiger Name",
    "Kurzinfo", "Links", "Link hinzufügen", "Dienst",
    "Name", "Link", "Speichern", "Gespeichert",
    "Profilfoto", "Hintergrund", "Foto ändern",
    "Hintergrund ändern", "LED am Bildschirmrand", "LED am Kartenrand",
    "LED-Dicke", "LED-Farbe", "Eigene Farbe",
    "Textstil", "Darstellung von Name und Beschreibung wählen", "Standard",
    "Elegant", "Modern", "Fett",
    "Sprache wählen", "Sprache suchen...",
    "Textstil suchen...", "Kein Textstil gefunden",
    "Profil löschen?", "Alle Ihre Daten werden unwiderruflich gelöscht.",
    "Nein", "Ja", "Noch leer", "Geben Sie Ihren vollständigen Namen ein.",
    "Es können nur Bilder hochgeladen werden.", "Das Profilfoto darf höchstens 5 MB groß sein.",
    "Der Hintergrund darf höchstens 10 MB groß sein.", "Sprache nicht gefunden",
    "Nutzen Sie alle Premium-Funktionen",
    "30 Tage Premium", "Jahres-Premium",
  ],

  el: [
    "Ρυθμίσεις", "Επεξεργασία", "Κύριο φόντο", "Γλώσσα",
    "Διαγραφή προφίλ", "Κωδικός QR", "Επεξεργασία QR", "Ονοματεπώνυμο",
    "Σύντομες πληροφορίες", "Σύνδεσμοι", "Προσθήκη συνδέσμου", "Υπηρεσία",
    "Όνομα", "Σύνδεσμος", "Αποθήκευση", "Αποθηκεύτηκε",
    "Φωτογραφία προφίλ", "Φόντο", "Αλλαγή φωτογραφίας",
    "Αλλαγή φόντου", "LED στην άκρη της οθόνης", "LED στην άκρη της κάρτας",
    "Πάχος LED", "Χρώμα LED", "Προσαρμοσμένο χρώμα",
    "Στυλ κειμένου", "Επιλέξτε την εμφάνιση ονόματος και περιγραφής", "Τυπικό",
    "Κομψό", "Μοντέρνο", "Έντονο",
    "Επιλογή γλώσσας", "Αναζήτηση γλώσσας...",
    "Αναζήτηση στυλ...", "Δεν βρέθηκε στυλ κειμένου",
    "Διαγραφή προφίλ;", "Όλα τα δεδομένα σας θα διαγραφούν χωρίς δυνατότητα ανάκτησης.",
    "Όχι", "Ναι", "Προς το παρόν κενό", "Εισαγάγετε το ονοματεπώνυμό σας.",
    "Επιτρέπονται μόνο εικόνες.", "Η φωτογραφία δεν πρέπει να υπερβαίνει τα 5 MB.",
    "Το φόντο δεν πρέπει να υπερβαίνει τα 10 MB.", "Η γλώσσα δεν βρέθηκε",
    "Απολαύστε όλες τις δυνατότητες Premium",
    "Premium 30 ημερών", "Ετήσιο Premium",
  ],

  he: [
    "הגדרות", "עריכה", "רקע ראשי", "שפה",
    "מחיקת פרופיל", "קוד QR", "עריכת קוד QR", "שם מלא",
    "מידע קצר", "קישורים", "הוספת קישור", "שירות",
    "שם", "קישור", "שמירה", "נשמר",
    "תמונת פרופיל", "רקע", "החלפת תמונה",
    "החלפת רקע", "LED בשולי המסך", "LED בשולי הכרטיס",
    "עובי LED", "צבע LED", "צבע מותאם אישית",
    "סגנון טקסט", "בחרו את מראה השם והתיאור", "רגיל",
    "אלגנטי", "מודרני", "מודגש",
    "בחירת שפה", "חיפוש שפה...",
    "חיפוש סגנון טקסט...", "לא נמצא סגנון טקסט",
    "למחוק את הפרופיל?", "כל הנתונים שלכם יימחקו ולא ניתן יהיה לשחזר אותם.",
    "לא", "כן", "ריק בינתיים", "הזינו שם מלא.",
    "ניתן להעלות תמונות בלבד.", "תמונת הפרופיל לא יכולה לחרוג מ־5 MB.",
    "הרקע לא יכול לחרוג מ־10 MB.", "השפה לא נמצאה",
    "ליהנות מכל תכונות Premium",
    "Premium ל־30 יום", "Premium שנתי",
  ],

  hi: [
    "सेटिंग्स", "संपादित करें", "मुख्य पृष्ठभूमि", "भाषा",
    "प्रोफ़ाइल हटाएं", "QR कोड", "QR कोड संपादित करें", "पूरा नाम",
    "संक्षिप्त जानकारी", "लिंक", "लिंक जोड़ें", "सेवा",
    "नाम", "लिंक", "सहेजें", "सहेजा गया",
    "प्रोफ़ाइल फ़ोटो", "पृष्ठभूमि", "फ़ोटो बदलें",
    "पृष्ठभूमि बदलें", "स्क्रीन किनारे की LED", "कार्ड किनारे की LED",
    "LED की मोटाई", "LED का रंग", "पसंदीदा रंग",
    "टेक्स्ट शैली", "नाम और विवरण का रूप चुनें", "मानक",
    "सुंदर", "आधुनिक", "बोल्ड",
    "भाषा चुनें", "भाषा खोजें...",
    "टेक्स्ट शैली खोजें...", "कोई शैली नहीं मिली",
    "प्रोफ़ाइल हटाएं?", "आपका सारा डेटा हटा दिया जाएगा और वापस नहीं लाया जा सकेगा।",
    "नहीं", "हाँ", "अभी खाली है", "अपना पूरा नाम दर्ज करें।",
    "केवल चित्र अपलोड किए जा सकते हैं।", "प्रोफ़ाइल फ़ोटो 5 MB से अधिक नहीं होनी चाहिए।",
    "पृष्ठभूमि 10 MB से अधिक नहीं होनी चाहिए।", "भाषा नहीं मिली",
    "Premium की सभी सुविधाओं का आनंद लें",
    "30 दिनों का Premium", "वार्षिक Premium",
  ],

  hu: [
    "Beállítások", "Szerkesztés", "Fő háttér", "Nyelv",
    "Profil törlése", "QR-kód", "QR-kód szerkesztése", "Teljes név",
    "Rövid információ", "Hivatkozások", "Hivatkozás hozzáadása", "Szolgáltatás",
    "Név", "Hivatkozás", "Mentés", "Mentve",
    "Profilkép", "Háttér", "Kép módosítása",
    "Háttér módosítása", "LED a képernyő szélén", "LED a kártya szélén",
    "LED vastagsága", "LED színe", "Egyéni szín",
    "Szövegstílus", "Válassza ki a név és leírás megjelenését", "Normál",
    "Elegáns", "Modern", "Félkövér",
    "Nyelv kiválasztása", "Nyelv keresése...",
    "Szövegstílus keresése...", "Nem található szövegstílus",
    "Törli a profilt?", "Minden adata törlődik, és nem állítható vissza.",
    "Nem", "Igen", "Egyelőre üres", "Adja meg a teljes nevét.",
    "Csak képek tölthetők fel.", "A profilkép nem lehet nagyobb 5 MB-nál.",
    "A háttér nem lehet nagyobb 10 MB-nál.", "A nyelv nem található",
    "Használja az összes Premium-funkciót",
    "30 napos Premium", "Éves Premium",
  ],

  id: [
    "Pengaturan", "Edit", "Latar utama", "Bahasa",
    "Hapus profil", "Kode QR", "Edit kode QR", "Nama lengkap",
    "Informasi singkat", "Tautan", "Tambah tautan", "Layanan",
    "Nama", "Tautan", "Simpan", "Tersimpan",
    "Foto profil", "Latar belakang", "Ganti foto",
    "Ganti latar", "LED tepi layar", "LED tepi kartu",
    "Ketebalan LED", "Warna LED", "Warna khusus",
    "Gaya teks", "Pilih tampilan nama dan deskripsi", "Standar",
    "Elegan", "Modern", "Tebal",
    "Pilih bahasa", "Cari bahasa...",
    "Cari gaya teks...", "Gaya teks tidak ditemukan",
    "Hapus profil?", "Semua data Anda akan dihapus dan tidak dapat dipulihkan.",
    "Tidak", "Ya", "Masih kosong", "Masukkan nama lengkap Anda.",
    "Hanya gambar yang dapat diunggah.", "Foto profil tidak boleh lebih dari 5 MB.",
    "Latar tidak boleh lebih dari 10 MB.", "Bahasa tidak ditemukan",
    "Nikmati semua fitur Premium",
    "Premium 30 hari", "Premium tahunan",
  ],

  it: [
    "Impostazioni", "Modifica", "Sfondo principale", "Lingua",
    "Elimina profilo", "Codice QR", "Modifica codice QR", "Nome completo",
    "Breve descrizione", "Link", "Aggiungi link", "Servizio",
    "Nome", "Link", "Salva", "Salvato",
    "Foto profilo", "Sfondo", "Cambia foto",
    "Cambia sfondo", "LED sul bordo dello schermo", "LED sul bordo della scheda",
    "Spessore LED", "Colore LED", "Colore personalizzato",
    "Stile del testo", "Scegli l'aspetto di nome e descrizione", "Standard",
    "Elegante", "Moderno", "Grassetto",
    "Scegli lingua", "Cerca lingua...",
    "Cerca stile del testo...", "Nessuno stile trovato",
    "Eliminare il profilo?", "Tutti i tuoi dati saranno eliminati e non potranno essere recuperati.",
    "No", "Sì", "Per ora è vuoto", "Inserisci il nome completo.",
    "È possibile caricare solo immagini.", "La foto del profilo non deve superare 5 MB.",
    "Lo sfondo non deve superare 10 MB.", "Lingua non trovata",
    "Goditi tutte le funzionalità Premium",
    "Premium per 30 giorni", "Premium annuale",
  ],

  ja: [
    "設定", "編集", "メイン背景", "言語",
    "プロフィールを削除", "QRコード", "QRコードを編集", "氏名",
    "簡単な情報", "リンク", "リンクを追加", "サービス",
    "名前", "リンク", "保存", "保存しました",
    "プロフィール写真", "背景", "写真を変更",
    "背景を変更", "画面端のLED", "カード端のLED",
    "LEDの太さ", "LEDの色", "カスタムカラー",
    "文字スタイル", "名前と説明の表示を選択", "標準",
    "エレガント", "モダン", "太字",
    "言語を選択", "言語を検索...",
    "文字スタイルを検索...", "文字スタイルが見つかりません",
    "プロフィールを削除しますか？", "すべてのデータが削除され、復元できなくなります。",
    "いいえ", "はい", "まだ空です", "氏名を入力してください。",
    "画像のみアップロードできます。", "プロフィール写真は5MB以下にしてください。",
    "背景は10MB以下にしてください。", "言語が見つかりません",
    "Premiumのすべての機能を利用",
    "30日間のPremium", "年間Premium",
  ],

  kk: [
    "Параметрлер", "Өңдеу", "Негізгі фон", "Тіл",
    "Профильді жою", "QR код", "QR кодты өңдеу", "Толық аты-жөні",
    "Қысқаша ақпарат", "Сілтемелер", "Сілтеме қосу", "Қызмет",
    "Атауы", "Сілтеме", "Сақтау", "Сақталды",
    "Профиль суреті", "Фон", "Суретті өзгерту",
    "Фонды өзгерту", "Экран жиегінің LED жарығы", "Карта жиегінің LED жарығы",
    "LED қалыңдығы", "LED түсі", "Өз түсіңіз",
    "Мәтін стилі", "Атау мен сипаттаманың көрінісін таңдаңыз", "Стандартты",
    "Талғампаз", "Заманауи", "Қалың",
    "Тілді таңдаңыз", "Тілді іздеу...",
    "Мәтін стилін іздеу...", "Мәтін стилі табылмады",
    "Профильді жою керек пе?", "Барлық деректеріңіз жойылады және қалпына келтірілмейді.",
    "Жоқ", "Иә", "Әзірге бос", "Толық аты-жөніңізді енгізіңіз.",
    "Тек суреттерді жүктеуге болады.", "Профиль суреті 5 MB-тан аспауы керек.",
    "Фон 10 MB-тан аспауы керек.", "Тіл табылмады",
    "Premium мүмкіндіктерінің барлығын пайдаланыңыз",
    "30 күндік Premium", "Жылдық Premium",
  ],
  
  ko: [
    "설정", "편집", "기본 배경", "언어",
    "프로필 삭제", "QR 코드", "QR 코드 편집", "성명",
    "간단한 소개", "링크", "링크 추가", "서비스",
    "이름", "링크", "저장", "저장됨",
    "프로필 사진", "배경", "사진 변경",
    "배경 변경", "화면 가장자리 LED", "카드 가장자리 LED",
    "LED 두께", "LED 색상", "사용자 지정 색상",
    "텍스트 스타일", "이름과 설명의 표시 방식을 선택하세요", "기본",
    "우아한", "모던", "굵게",
    "언어 선택", "언어 검색...",
    "텍스트 스타일 검색...", "텍스트 스타일을 찾을 수 없습니다",
    "프로필을 삭제하시겠습니까?", "모든 데이터가 삭제되며 복구할 수 없습니다.",
    "아니요", "예", "아직 비어 있습니다", "성명을 입력하세요.",
    "이미지만 업로드할 수 있습니다.", "프로필 사진은 5MB를 초과할 수 없습니다.",
    "배경은 10MB를 초과할 수 없습니다.", "언어를 찾을 수 없습니다",
    "모든 Premium 기능을 이용하세요",
    "30일 Premium", "연간 Premium",
  ],

  ky: [
    "Жөндөөлөр", "Түзөтүү", "Негизги фон", "Тил",
    "Профилди өчүрүү", "QR код", "QR кодду түзөтүү", "Толук аты-жөнү",
    "Кыскача маалымат", "Шилтемелер", "Шилтеме кошуу", "Кызмат",
    "Аталышы", "Шилтеме", "Сактоо", "Сакталды",
    "Профиль сүрөтү", "Фон", "Сүрөттү өзгөртүү",
    "Фонду өзгөртүү", "Экран четинин LED жарыгы", "Карта четинин LED жарыгы",
    "LED калыңдыгы", "LED түсү", "Өзгөчө түс",
    "Текст стили", "Ат менен сүрөттөмөнүн көрүнүшүн тандаңыз", "Стандарттуу",
    "Саркеч", "Заманбап", "Калың",
    "Тилди тандаңыз", "Тил издөө...",
    "Текст стилин издөө...", "Текст стили табылган жок",
    "Профилди өчүрөсүзбү?", "Бардык маалыматтарыңыз өчүрүлөт жана калыбына келтирилбейт.",
    "Жок", "Ооба", "Азырынча бош", "Толук аты-жөнүңүздү киргизиңиз.",
    "Сүрөттөрдү гана жүктөөгө болот.", "Профиль сүрөтү 5 MBдан ашпашы керек.",
    "Фон 10 MBдан ашпашы керек.", "Тил табылган жок",
    "Бардык Premium мүмкүнчүлүктөрүн колдонуңуз",
    "30 күндүк Premium", "Жылдык Premium",
  ],
  
  ms: [
    "Tetapan", "Edit", "Latar utama", "Bahasa",
    "Padam profil", "Kod QR", "Edit kod QR", "Nama penuh",
    "Maklumat ringkas", "Pautan", "Tambah pautan", "Perkhidmatan",
    "Nama", "Pautan", "Simpan", "Disimpan",
    "Foto profil", "Latar belakang", "Tukar foto",
    "Tukar latar", "LED tepi skrin", "LED tepi kad",
    "Ketebalan LED", "Warna LED", "Warna tersuai",
    "Gaya teks", "Pilih rupa nama dan penerangan", "Standard",
    "Elegan", "Moden", "Tebal",
    "Pilih bahasa", "Cari bahasa...",
    "Cari gaya teks...", "Gaya teks tidak ditemui",
    "Padam profil?", "Semua data anda akan dipadam dan tidak boleh dipulihkan.",
    "Tidak", "Ya", "Masih kosong", "Masukkan nama penuh anda.",
    "Hanya imej boleh dimuat naik.", "Foto profil tidak boleh melebihi 5 MB.",
    "Latar tidak boleh melebihi 10 MB.", "Bahasa tidak ditemui",
    "Nikmati semua ciri Premium",
    "Premium 30 hari", "Premium tahunan",
  ],

  no: [
    "Innstillinger", "Rediger", "Hovedbakgrunn", "Språk",
    "Slett profil", "QR-kode", "Rediger QR-kode", "Fullt navn",
    "Kort informasjon", "Lenker", "Legg til lenke", "Tjeneste",
    "Navn", "Lenke", "Lagre", "Lagret",
    "Profilbilde", "Bakgrunn", "Endre bilde",
    "Endre bakgrunn", "LED langs skjermkanten", "LED langs kortkanten",
    "LED-tykkelse", "LED-farge", "Egendefinert farge",
    "Tekststil", "Velg utseende for navn og beskrivelse", "Standard",
    "Elegant", "Moderne", "Fet",
    "Velg språk", "Søk etter språk...",
    "Søk etter tekststil...", "Ingen tekststil funnet",
    "Slett profil?", "Alle dataene dine blir slettet og kan ikke gjenopprettes.",
    "Nei", "Ja", "Foreløpig tomt", "Skriv inn ditt fulle navn.",
    "Bare bilder kan lastes opp.", "Profilbildet kan ikke være større enn 5 MB.",
    "Bakgrunnen kan ikke være større enn 10 MB.", "Språket ble ikke funnet",
    "Få tilgang til alle Premium-funksjoner",
    "30 dagers Premium", "Årlig Premium",
  ],

  fa: [
    "تنظیمات", "ویرایش", "پس‌زمینه اصلی", "زبان",
    "حذف پروفایل", "کد QR", "ویرایش کد QR", "نام کامل",
    "اطلاعات کوتاه", "پیوندها", "افزودن پیوند", "خدمات",
    "نام", "پیوند", "ذخیره", "ذخیره شد",
    "عکس پروفایل", "پس‌زمینه", "تغییر عکس",
    "تغییر پس‌زمینه", "LED لبه صفحه", "LED لبه کارت",
    "ضخامت LED", "رنگ LED", "رنگ دلخواه",
    "سبک متن", "ظاهر نام و توضیحات را انتخاب کنید", "استاندارد",
    "شیک", "مدرن", "پررنگ",
    "انتخاب زبان", "جستجوی زبان...",
    "جستجوی سبک متن...", "سبک متن پیدا نشد",
    "پروفایل حذف شود؟", "تمام داده‌های شما حذف می‌شود و قابل بازیابی نخواهد بود.",
    "خیر", "بله", "فعلاً خالی است", "نام کامل خود را وارد کنید.",
    "فقط تصاویر قابل بارگذاری هستند.", "عکس پروفایل نباید بیش از ۵ مگابایت باشد.",
    "پس‌زمینه نباید بیش از ۱۰ مگابایت باشد.", "زبان پیدا نشد",
    "از تمام امکانات Premium استفاده کنید",
    "Premium سی‌روزه", "Premium سالانه",
  ],

  pl: [
    "Ustawienia", "Edytuj", "Główne tło", "Język",
    "Usuń profil", "Kod QR", "Edytuj kod QR", "Imię i nazwisko",
    "Krótka informacja", "Linki", "Dodaj link", "Usługa",
    "Nazwa", "Link", "Zapisz", "Zapisano",
    "Zdjęcie profilowe", "Tło", "Zmień zdjęcie",
    "Zmień tło", "LED przy krawędzi ekranu", "LED przy krawędzi karty",
    "Grubość LED", "Kolor LED", "Własny kolor",
    "Styl tekstu", "Wybierz wygląd imienia i opisu", "Standardowy",
    "Elegancki", "Nowoczesny", "Pogrubiony",
    "Wybierz język", "Szukaj języka...",
    "Szukaj stylu tekstu...", "Nie znaleziono stylu tekstu",
    "Usunąć profil?", "Wszystkie dane zostaną usunięte bez możliwości przywrócenia.",
    "Nie", "Tak", "Na razie pusto", "Wpisz imię i nazwisko.",
    "Można przesyłać tylko obrazy.", "Zdjęcie profilowe nie może przekraczać 5 MB.",
    "Tło nie może przekraczać 10 MB.", "Nie znaleziono języka",
    "Korzystaj ze wszystkich funkcji Premium",
    "Premium na 30 dni", "Roczne Premium",
  ],

  pt: [
    "Definições", "Editar", "Fundo principal", "Idioma",
    "Eliminar perfil", "Código QR", "Editar código QR", "Nome completo",
    "Informações breves", "Ligações", "Adicionar ligação", "Serviço",
    "Nome", "Ligação", "Guardar", "Guardado",
    "Foto de perfil", "Fundo", "Alterar foto",
    "Alterar fundo", "LED na borda do ecrã", "LED na borda do cartão",
    "Espessura do LED", "Cor do LED", "Cor personalizada",
    "Estilo do texto", "Escolha o aspeto do nome e da descrição", "Padrão",
    "Elegante", "Moderno", "Negrito",
    "Escolher idioma", "Pesquisar idioma...",
    "Pesquisar estilo...", "Nenhum estilo encontrado",
    "Eliminar perfil?", "Todos os seus dados serão eliminados e não poderão ser recuperados.",
    "Não", "Sim", "Ainda está vazio", "Introduza o nome completo.",
    "Apenas imagens podem ser carregadas.", "A foto de perfil não pode exceder 5 MB.",
    "O fundo não pode exceder 10 MB.", "Idioma não encontrado",
    "Desfrute de todas as funcionalidades Premium",
    "Premium de 30 dias", "Premium anual",
  ],

  ro: [
    "Setări", "Editează", "Fundal principal", "Limbă",
    "Șterge profilul", "Cod QR", "Editează codul QR", "Nume complet",
    "Informații scurte", "Linkuri", "Adaugă link", "Serviciu",
    "Nume", "Link", "Salvează", "Salvat",
    "Fotografie de profil", "Fundal", "Schimbă fotografia",
    "Schimbă fundalul", "LED pe marginea ecranului", "LED pe marginea cardului",
    "Grosimea LED", "Culoarea LED", "Culoare personalizată",
    "Stilul textului", "Alege aspectul numelui și descrierii", "Standard",
    "Elegant", "Modern", "Aldin",
    "Alege limba", "Caută limba...",
    "Caută stilul textului...", "Nu s-a găsit stilul",
    "Ștergi profilul?", "Toate datele tale vor fi șterse și nu vor putea fi recuperate.",
    "Nu", "Da", "Deocamdată gol", "Introdu numele complet.",
    "Pot fi încărcate doar imagini.", "Fotografia nu poate depăși 5 MB.",
    "Fundalul nu poate depăși 10 MB.", "Limba nu a fost găsită",
    "Bucură-te de toate funcțiile Premium",
    "Premium pentru 30 de zile", "Premium anual",
  ],

  ru: [
    "Настройки", "Редактировать", "Основной фон", "Язык",
    "Удалить профиль", "QR-код", "Редактировать QR-код", "Имя и фамилия",
    "Краткая информация", "Ссылки", "Добавить ссылку", "Сервис",
    "Название", "Ссылка", "Сохранить", "Сохранено",
    "Фото профиля", "Фон", "Изменить фото",
    "Изменить фон", "LED по краю экрана", "LED по краю карточки",
    "Толщина свечения LED", "Цвет LED", "Свой цвет",
    "Стиль текста", "Выберите стиль имени и описания", "Стандарт",
    "Элегант", "Современный", "Жирный",
    "Выберите язык", "Поиск языка...",
    "Поиск стиля текста...", "Стиль текста не найден",
    "Удалить профиль?", "Все ваши данные будут удалены без возможности восстановления.",
    "Нет", "Да", "К сожалению, пока пусто", "Введите имя и фамилию.",
    "Можно загружать только изображения.", "Фото профиля не должно превышать 5 МБ.",
    "Фон не должен превышать 10 МБ.", "Язык не найден",
    "Пользуйтесь всеми возможностями Premium",
    "Premium на 30 дней", "Годовой Premium",
  ],
  
  sr: [
    "Подешавања", "Уреди", "Главна позадина", "Језик",
    "Обриши профил", "QR код", "Уреди QR код", "Име и презиме",
    "Кратке информације", "Линкови", "Додај линк", "Услуга",
    "Назив", "Линк", "Сачувај", "Сачувано",
    "Профилна фотографија", "Позадина", "Промени фотографију",
    "Промени позадину", "LED дуж ивице екрана", "LED дуж ивице картице",
    "Дебљина LED", "Боја LED", "Прилагођена боја",
    "Стил текста", "Изаберите изглед имена и описа", "Стандардни",
    "Елегантни", "Модерни", "Подебљани",
    "Изаберите језик", "Претрага језика...",
    "Претрага стила текста...", "Стил није пронађен",
    "Обриши профил?", "Сви ваши подаци ће бити обрисани без могућности враћања.",
    "Не", "Да", "За сада празно", "Унесите име и презиме.",
    "Могу се отпремати само слике.", "Фотографија не сме бити већа од 5 MB.",
    "Позадина не сме бити већа од 10 MB.", "Језик није пронађен",
    "Користите све Premium могућности",
    "Premium на 30 дана", "Годишњи Premium",
  ],

  sk: [
    "Nastavenia", "Upraviť", "Hlavné pozadie", "Jazyk",
    "Odstrániť profil", "QR kód", "Upraviť QR kód", "Celé meno",
    "Stručné informácie", "Odkazy", "Pridať odkaz", "Služba",
    "Názov", "Odkaz", "Uložiť", "Uložené",
    "Profilová fotografia", "Pozadie", "Zmeniť fotografiu",
    "Zmeniť pozadie", "LED na okraji obrazovky", "LED na okraji karty",
    "Hrúbka LED", "Farba LED", "Vlastná farba",
    "Štýl textu", "Vyberte vzhľad mena a popisu", "Štandardný",
    "Elegantný", "Moderný", "Tučné",
    "Vyberte jazyk", "Hľadať jazyk...",
    "Hľadať štýl textu...", "Štýl textu sa nenašiel",
    "Odstrániť profil?", "Všetky vaše údaje budú odstránené bez možnosti obnovy.",
    "Nie", "Áno", "Zatiaľ prázdne", "Zadajte celé meno.",
    "Nahrať možno iba obrázky.", "Profilová fotografia nesmie presiahnuť 5 MB.",
    "Pozadie nesmie presiahnuť 10 MB.", "Jazyk sa nenašiel",
    "Využívajte všetky funkcie Premium",
    "Premium na 30 dní", "Ročný Premium",
  ],

  es: [
    "Configuración", "Editar", "Fondo principal", "Idioma",
    "Eliminar perfil", "Código QR", "Editar código QR", "Nombre completo",
    "Información breve", "Enlaces", "Añadir enlace", "Servicio",
    "Nombre", "Enlace", "Guardar", "Guardado",
    "Foto de perfil", "Fondo", "Cambiar foto",
    "Cambiar fondo", "LED del borde de pantalla", "LED del borde de tarjeta",
    "Grosor del LED", "Color del LED", "Color personalizado",
    "Estilo de texto", "Elige el aspecto del nombre y descripción", "Estándar",
    "Elegante", "Moderno", "Negrita",
    "Elegir idioma", "Buscar idioma...",
    "Buscar estilo de texto...", "No se encontró el estilo",
    "¿Eliminar perfil?", "Todos tus datos se eliminarán y no podrán recuperarse.",
    "No", "Sí", "Por ahora está vacío", "Introduce tu nombre completo.",
    "Solo se pueden subir imágenes.", "La foto de perfil no debe superar los 5 MB.",
    "El fondo no debe superar los 10 MB.", "Idioma no encontrado",
    "Disfruta de todas las funciones Premium",
    "Premium de 30 días", "Premium anual",
  ],

  sv: [
    "Inställningar", "Redigera", "Huvudbakgrund", "Språk",
    "Ta bort profil", "QR-kod", "Redigera QR-kod", "Fullständigt namn",
    "Kort information", "Länkar", "Lägg till länk", "Tjänst",
    "Namn", "Länk", "Spara", "Sparat",
    "Profilbild", "Bakgrund", "Byt bild",
    "Byt bakgrund", "LED längs skärmkanten", "LED längs kortkanten",
    "LED-tjocklek", "LED-färg", "Anpassad färg",
    "Textstil", "Välj utseende för namn och beskrivning", "Standard",
    "Elegant", "Modern", "Fet",
    "Välj språk", "Sök språk...",
    "Sök textstil...", "Ingen textstil hittades",
    "Ta bort profil?", "Alla dina uppgifter raderas och kan inte återställas.",
    "Nej", "Ja", "Tomt än så länge", "Ange ditt fullständiga namn.",
    "Endast bilder får laddas upp.", "Profilbilden får inte överstiga 5 MB.",
    "Bakgrunden får inte överstiga 10 MB.", "Språket hittades inte",
    "Använd alla Premium-funktioner",
    "30 dagars Premium", "Årlig Premium",
  ],

  tg: [
    "Танзимот", "Таҳрир", "Заминаи асосӣ", "Забон",
    "Нест кардани профил", "Рамзи QR", "Таҳрири рамзи QR", "Ному насаб",
    "Маълумоти мухтасар", "Пайвандҳо", "Иловаи пайванд", "Хизматрасонӣ",
    "Ном", "Пайванд", "Сабт кардан", "Сабт шуд",
    "Акси профил", "Замина", "Иваз кардани акс",
    "Иваз кардани замина", "LED дар канори экран", "LED дар канори корт",
    "Ғафсии LED", "Ранги LED", "Ранги интихобӣ",
    "Услуби матн", "Намуди ном ва тавсифро интихоб кунед", "Стандартӣ",
    "Зебо", "Муосир", "Ғафс",
    "Интихоби забон", "Ҷустуҷӯи забон...",
    "Ҷустуҷӯи услуби матн...", "Услуби матн ёфт нашуд",
    "Профил нест карда шавад?", "Ҳамаи маълумоти шумо нест мешавад ва барқарор намегардад.",
    "Не", "Ҳа", "Ҳоло холӣ аст", "Ному насаби худро ворид кунед.",
    "Танҳо тасвирҳоро бор кардан мумкин аст.", "Акси профил набояд аз 5 MB зиёд бошад.",
    "Замина набояд аз 10 MB зиёд бошад.", "Забон ёфт нашуд",
    "Аз ҳамаи имкониятҳои Premium истифода баред",
    "Premium барои 30 рӯз", "Premium солона",
  ],
  
  th: [
    "การตั้งค่า", "แก้ไข", "พื้นหลังหลัก", "ภาษา",
    "ลบโปรไฟล์", "คิวอาร์โค้ด", "แก้ไขคิวอาร์โค้ด", "ชื่อเต็ม",
    "ข้อมูลสั้น ๆ", "ลิงก์", "เพิ่มลิงก์", "บริการ",
    "ชื่อ", "ลิงก์", "บันทึก", "บันทึกแล้ว",
    "รูปโปรไฟล์", "พื้นหลัง", "เปลี่ยนรูป",
    "เปลี่ยนพื้นหลัง", "LED ขอบหน้าจอ", "LED ขอบการ์ด",
    "ความหนาของ LED", "สี LED", "สีกำหนดเอง",
    "รูปแบบข้อความ", "เลือกรูปแบบชื่อและคำอธิบาย", "มาตรฐาน",
    "หรูหรา", "ทันสมัย", "ตัวหนา",
    "เลือกภาษา", "ค้นหาภาษา...",
    "ค้นหารูปแบบข้อความ...", "ไม่พบรูปแบบข้อความ",
    "ลบโปรไฟล์?", "ข้อมูลทั้งหมดของคุณจะถูกลบและไม่สามารถกู้คืนได้",
    "ไม่", "ใช่", "ยังไม่มีข้อมูล", "กรุณากรอกชื่อเต็ม",
    "อัปโหลดได้เฉพาะรูปภาพ", "รูปโปรไฟล์ต้องไม่เกิน 5 MB",
    "พื้นหลังต้องไม่เกิน 10 MB", "ไม่พบภาษา",
    "เพลิดเพลินกับฟีเจอร์ Premium ทั้งหมด",
    "Premium 30 วัน", "Premium รายปี",
  ],

  tr: [
    "Ayarlar", "Düzenle", "Ana arka plan", "Dil",
    "Profili sil", "QR Kod", "QR kodu düzenle", "Ad Soyad",
    "Kısa bilgi", "Bağlantılar", "Bağlantı ekle", "Hizmet",
    "Ad", "Bağlantı", "Kaydet", "Kaydedildi",
    "Profil fotoğrafı", "Arka plan", "Fotoğrafı değiştir",
    "Arka planı değiştir", "Ekran kenarı LED", "Kart kenarı LED",
    "LED kalınlığı", "LED rengi", "Özel renk",
    "Yazı stili", "Ad ve açıklama stilini seçin", "Standart",
    "Zarif", "Modern", "Kalın",
    "Dil seçin", "Dil ara...",
    "Yazı stili ara...", "Yazı stili bulunamadı",
    "Profil silinsin mi?", "Tüm verileriniz silinecek ve geri yüklenemeyecek.",
    "Hayır", "Evet", "Maalesef, şimdilik boş", "Adınızı ve soyadınızı girin.",
    "Yalnızca resim yüklenebilir.", "Profil fotoğrafı 5 MB'ı geçmemelidir.",
    "Arka plan 10 MB'ı geçmemelidir.", "Dil bulunamadı",
    "Tüm Premium özelliklerinden yararlanın",
    "30 günlük Premium", "Yıllık Premium",
  ],

  
  tk: [
    "Sazlamalar", "Üýtgetmek", "Esasy fon", "Dil",
    "Profili pozmak", "QR kod", "QR kody üýtgetmek", "Doly ady",
    "Gysga maglumat", "Salgylanmalar", "Salgylanma goşmak", "Hyzmat",
    "Ady", "Salgylanma", "Ýatda saklamak", "Ýatda saklandy",
    "Profil suraty", "Fon", "Suraty üýtgetmek",
    "Fony üýtgetmek", "Ekranyň gyrasyndaky LED", "Kartyň gyrasyndaky LED",
    "LED galyňlygy", "LED reňki", "Şahsy reňk",
    "Tekst görnüşi", "Adyň we düşündirişiň görnüşini saýlaň", "Adaty",
    "Nejis", "Döwrebap", "Goýy",
    "Dil saýlaň", "Dil gözlemek...",
    "Tekst görnüşini gözlemek...", "Tekst görnüşi tapylmady",
    "Profili pozmalymy?", "Ähli maglumatlaryňyz pozular we dikeldilip bilinmez.",
    "Ýok", "Hawa", "Häzirlikçe boş", "Doly adyňyzy giriziň.",
    "Diňe suratlary ýükläp bolýar.", "Profil suraty 5 MB-dan uly bolmaly däl.",
    "Fon 10 MB-dan uly bolmaly däl.", "Dil tapylmady",
    "Ähli Premium mümkinçiliklerinden peýdalanyň",
    "30 günlük Premium", "Ýyllyk Premium",
  ],

  uk: [
    "Налаштування", "Редагувати", "Основне тло", "Мова",
    "Видалити профіль", "QR-код", "Редагувати QR-код", "Повне ім’я",
    "Коротка інформація", "Посилання", "Додати посилання", "Послуга",
    "Назва", "Посилання", "Зберегти", "Збережено",
    "Фото профілю", "Тло", "Змінити фото",
    "Змінити тло", "LED по краю екрана", "LED по краю картки",
    "Товщина LED", "Колір LED", "Власний колір",
    "Стиль тексту", "Виберіть вигляд імені та опису", "Стандартний",
    "Елегантний", "Сучасний", "Жирний",
    "Виберіть мову", "Пошук мови...",
    "Пошук стилю тексту...", "Стиль тексту не знайдено",
    "Видалити профіль?", "Усі ваші дані буде видалено без можливості відновлення.",
    "Ні", "Так", "Поки що порожньо", "Введіть повне ім’я.",
    "Можна завантажувати лише зображення.", "Фото профілю не повинно перевищувати 5 МБ.",
    "Тло не повинно перевищувати 10 МБ.", "Мову не знайдено",
    "Користуйтеся всіма можливостями Premium",
    "Premium на 30 днів", "Річний Premium",
  ],
  
  ur: [
    "ترتیبات", "ترمیم کریں", "مرکزی پس منظر", "زبان",
    "پروفائل حذف کریں", "QR کوڈ", "QR کوڈ میں ترمیم", "پورا نام",
    "مختصر معلومات", "لنکس", "لنک شامل کریں", "سروس",
    "نام", "لنک", "محفوظ کریں", "محفوظ ہو گیا",
    "پروفائل تصویر", "پس منظر", "تصویر تبدیل کریں",
    "پس منظر تبدیل کریں", "اسکرین کنارے کی LED", "کارڈ کنارے کی LED",
    "LED کی موٹائی", "LED کا رنگ", "اپنی مرضی کا رنگ",
    "متن کا انداز", "نام اور تفصیل کی ظاہری شکل منتخب کریں", "معیاری",
    "خوبصورت", "جدید", "جلی",
    "زبان منتخب کریں", "زبان تلاش کریں...",
    "متن کا انداز تلاش کریں...", "کوئی انداز نہیں ملا",
    "پروفائل حذف کریں؟", "آپ کا تمام ڈیٹا حذف ہو جائے گا اور واپس نہیں آ سکے گا۔",
    "نہیں", "ہاں", "فی الحال خالی ہے", "اپنا پورا نام درج کریں۔",
    "صرف تصاویر اپ لوڈ کی جا سکتی ہیں۔", "پروفائل تصویر 5 MB سے زیادہ نہیں ہونی چاہیے۔",
    "پس منظر 10 MB سے زیادہ نہیں ہونا چاہیے۔", "زبان نہیں ملی",
    "Premium کی تمام خصوصیات استعمال کریں",
    "30 دن کا Premium", "سالانہ Premium",
  ],

    uz: [
    "Sozlamalar", "Tahrirlash", "Asosiy fon", "Til",
    "Profilni o‘chirish", "QR kod", "QR kodni tahrirlash", "Ism Familiya",
    "Qisqa ma’lumot", "Havolalar", "Havola qo‘shish", "Xizmat",
    "Nomi", "Havola", "Saqlash", "Saqlandi",
    "Profil rasmi", "Orqa fon", "Rasmni almashtirish",
    "Fonni almashtirish", "Ekran cheti LED", "Karta cheti LED",
    "LED qalinligi", "LED rangi", "Maxsus rang",
    "Yozuv stili", "Ism va qisqa ma’lumot ko‘rinishini tanlang", "Standart",
    "Elegant", "Modern", "Qalin",
    "Tilni tanlang", "Tilni qidirish...",
    "Yozuv stilini qidirish...", "Yozuv stili topilmadi",
    "Profil o‘chirilsinmi?", "Barcha ma’lumotlaringiz o‘chiriladi va ularni qayta tiklab bo‘lmaydi.",
    "Yo‘q", "Ha", "Afsuski, hozircha bo‘sh", "Ism va familiyani kiriting.",
    "Faqat rasm yuklash mumkin.", "Profil rasmi 5 MB dan oshmasligi kerak.",
    "Orqa fon 10 MB dan oshmasligi kerak.", "Til topilmadi",
    "Barcha Premium imkoniyatlardan foydalaning",
    "30 kunlik Premium", "Yillik Premium",
  ],

  vi: [
    "Cài đặt", "Chỉnh sửa", "Nền chính", "Ngôn ngữ",
    "Xóa hồ sơ", "Mã QR", "Chỉnh sửa mã QR", "Họ và tên",
    "Thông tin ngắn", "Liên kết", "Thêm liên kết", "Dịch vụ",
    "Tên", "Liên kết", "Lưu", "Đã lưu",
    "Ảnh hồ sơ", "Nền", "Đổi ảnh",
    "Đổi nền", "LED viền màn hình", "LED viền thẻ",
    "Độ dày LED", "Màu LED", "Màu tùy chỉnh",
    "Kiểu chữ", "Chọn giao diện cho tên và mô tả", "Tiêu chuẩn",
    "Thanh lịch", "Hiện đại", "Đậm",
    "Chọn ngôn ngữ", "Tìm ngôn ngữ...",
    "Tìm kiểu chữ...", "Không tìm thấy kiểu chữ",
    "Xóa hồ sơ?", "Toàn bộ dữ liệu sẽ bị xóa và không thể khôi phục.",
    "Không", "Có", "Hiện đang trống", "Nhập họ và tên.",
    "Chỉ có thể tải lên hình ảnh.", "Ảnh hồ sơ không được vượt quá 5 MB.",
    "Nền không được vượt quá 10 MB.", "Không tìm thấy ngôn ngữ",
    "Tận hưởng tất cả tính năng Premium",
    "Premium 30 ngày", "Premium hằng năm",
  ],
};

// Validate translations before adding them.
for (const [code, values] of Object.entries(OTHER_LANGUAGES)) {
  if (values.length !== TRANSLATION_KEYS.length) {
    throw new Error(
      `Translation key count mismatch: ${code}`
    );
  }

  TEXTS[code] = Object.fromEntries(
    TRANSLATION_KEYS.map((key, index) => [
      key,
      values[index],
    ])
  );
}

/* =========================================================
   COLORS
========================================================= */

const LED_COLORS = [
  "#000000",
  "#FFFFFF",
  "#EF4444",
  "#22C55E",
  "#3B82F6",
  "#FACC15",
  "#F97316",
  "#A855F7",
  "#EC4899",
  "#06B6D4",
  "#14B8A6",
  "#6366F1",
];

/* =========================================================
   TEXT STYLE PREVIEW
========================================================= */

const TEXT_STYLES = [
  {
    id: "standard",
    name: "Standard",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    fontWeight: 800,
    letterSpacing: "-0.5px",
    premium: false,
  },
  {
    id: "handwriting",
    name: "Handwriting",
    fontFamily:
      fontHandwriting.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.3px",
    premium: true,
  },
  {
    id: "signature",
    name: "Signature",
    fontFamily:
      fontSignature.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.4px",
    premium: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    fontFamily:
      fontLuxury.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.4px",
    premium: true,
  },
  {
    id: "mono",
    name: "Mono",
    fontFamily:
      fontMono.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.8px",
    premium: true,
  },
  {
    id: "poster",
    name: "Poster",
    fontFamily:
      fontPoster.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "1.8px",
    premium: true,
  },
  {
    id: "tech",
    name: "Tech",
    fontFamily:
      fontTech.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "1px",
    premium: true,
  },
  {
    id: "retro",
    name: "Retro",
    fontFamily:
      fontRounded.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.2px",
    premium: true,
  },
  {
    id: "classic",
    name: "Classic",
    fontFamily:
      fontClassic.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "1px",
    premium: true,
  },
  {
    id: "marker",
    name: "Marker",
    fontFamily:
      fontMarker.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.3px",
    premium: true,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function MyCardPage() {
  const params = useParams();

  const cardId =
    typeof params?.id === "string"
      ? params.id
      : "";

  const avatarInputRef =
    useRef(null);

  const backgroundInputRef =
    useRef(null);

const [profile, setProfile] =
  useState(null);

const [, setPremiumClock] = useState(0);

useEffect(() => {
  const timer = window.setInterval(() => {
    setPremiumClock(Date.now());
  }, 1000);

  return () => window.clearInterval(timer);
}, []);

const isPremiumActive =
  Boolean(profile?.premium_until) &&
  new Date(profile.premium_until).getTime() >
    Date.now();

const effectiveProfile = profile
  ? {
      ...profile,
      background_url: isPremiumActive
        ? profile.background_url
        : null,
      text_style: isPremiumActive
        ? profile.text_style
        : "standard",
      screen_led_enabled: isPremiumActive
        ? profile.screen_led_enabled
        : false,
      card_led_enabled: isPremiumActive
        ? profile.card_led_enabled
        : false,
    }
  : null;
  
  const [links, setLinks] =
    useState([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [modal, setModal] =
    useState(null);

  const [notice, setNotice] =
    useState("");

  const [error, setError] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [bio, setBio] =
    useState("");
  const [aboutText, setAboutText] =
  useState("");

  const [cardRotation, setCardRotation] =
  useState(0);

  const [cardUnlocked, setCardUnlocked] =
  useState(false);

const [
  cardTutorialSeen,
  setCardTutorialSeen,
] = useState(false);

const [
  cardTutorialPlaying,
  setCardTutorialPlaying,
] = useState(false);
  
const cardRotationRef =
  useRef(0);

const dragStartXRef =
  useRef(0);

const dragStartRotationRef =
  useRef(0);

const lastPointerXRef =
  useRef(0);

const lastPointerTimeRef =
  useRef(0);

const velocityRef =
  useRef(0);

const draggingRef =
  useRef(false);

const animationRef =
  useRef(null);

  useEffect(() => {
  if (typeof window === "undefined") {
    return;
  }

  const tutorialSeen =
    localStorage.getItem(
      "nfcqr_owner_card_tutorial_seen_v2"
    ) === "1";

  const unlocked =
    localStorage.getItem(
      "nfcqr_owner_card_unlocked"
    ) === "1";

  setCardTutorialSeen(
    tutorialSeen
  );

  setCardUnlocked(
    tutorialSeen
      ? unlocked
      : false
  );
}, []);

function startCardTutorial(
  event
) {
  event?.stopPropagation?.();

  setCardTutorialSeen(true);
  setCardTutorialPlaying(true);
  setCardUnlocked(true);

  if (
    typeof window !==
    "undefined"
  ) {
    localStorage.setItem(
      "nfcqr_owner_card_tutorial_seen_v2",
      "1"
    );

    localStorage.setItem(
      "nfcqr_owner_card_unlocked",
      "1"
    );
  }

  window.setTimeout(() => {
    setCardTutorialPlaying(
      false
    );
  }, 1400);
}

function toggleCardLock(
  event
) {
  event?.stopPropagation?.();

  setCardUnlocked(
    (current) => {
      const next =
        !current;

      if (
        typeof window !==
        "undefined"
      ) {
        localStorage.setItem(
          "nfcqr_owner_card_unlocked",
          next
            ? "1"
            : "0"
        );
      }

      return next;
    }
  );
}
  
  const [editLinks, setEditLinks] =
    useState([]);

  function updateCardRotation(value) {
  cardRotationRef.current = value;
  setCardRotation(value);
}

function handleCardPointerDown(event) {
  if (event.button !== undefined && event.button !== 0) return;
  if (event.isPrimary === false) return;

  if (event.target?.closest?.(
    "button, a, input, textarea, select, [role='button']"
  )) return;

  event.preventDefault();

  draggingRef.current = true;
  dragStartXRef.current = event.clientX;
  dragStartRotationRef.current = cardRotationRef.current;
  lastPointerXRef.current = event.clientX;
  lastPointerTimeRef.current = performance.now();
  velocityRef.current = 0;

  if (animationRef.current !== null) {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }

  try {
    event.currentTarget.setPointerCapture(event.pointerId);
  } catch {}
}

function handleCardPointerMove(event) {
  if (!draggingRef.current) {
    return;
  }

  const deltaX =
    event.clientX -
    dragStartXRef.current;

  const nextRotation =
    dragStartRotationRef.current +
  deltaX * 0.55;

  const now =
    performance.now();

  const deltaTime =
    Math.max(
      1,
      now -
        lastPointerTimeRef.current
    );

  velocityRef.current =
    ((event.clientX -
      lastPointerXRef.current) /
      deltaTime) *
16 * 0.55;

  lastPointerXRef.current =
    event.clientX;

  lastPointerTimeRef.current =
    now;

  updateCardRotation(
    nextRotation
  );
}

function handleCardPointerUp() {
  if (!draggingRef.current) {
    return;
  }

  draggingRef.current = false;

  let rotation =
    cardRotationRef.current;

  let velocity =
    velocityRef.current;

  function animate() {
    rotation += velocity;

 velocity *= 0.90;

    updateCardRotation(
      rotation
    );

    if (
      Math.abs(velocity) >
      0.15
    ) {
      animationRef.current =
        requestAnimationFrame(
          animate
        );

      return;
    }

    const snapped =
      Math.round(
        rotation / 180
      ) * 180;

    const start =
      rotation;

    const distance =
      snapped - start;

    const startedAt =
      performance.now();

    const duration = 220;

    function snapFrame(now) {
      const progress =
        Math.min(
          1,
          (now - startedAt) /
            duration
        );

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      updateCardRotation(
        start +
          distance * eased
      );

      if (progress < 1) {
        animationRef.current =
          requestAnimationFrame(
            snapFrame
          );
      } else {
        updateCardRotation(
          snapped
        );

        animationRef.current =
          null;
      }
    }

    animationRef.current =
      requestAnimationFrame(
        snapFrame
      );
  }

  animationRef.current =
    requestAnimationFrame(
      animate
    );
}
  const [
    openLinkIndex,
    setOpenLinkIndex,
  ] = useState(null);

  const [
    screenLedEnabled,
    setScreenLedEnabled,
  ] = useState(false);

  const [
    screenLedColor,
    setScreenLedColor,
  ] = useState("#3B82F6");

  const [
    cardLedEnabled,
    setCardLedEnabled,
  ] = useState(false);

 const [
  cardLedColor,
  setCardLedColor,
] = useState("#3B82F6");

const [
  screenLedThickness,
  setScreenLedThickness,
] = useState(100);

const [
  cardLedThickness,
  setCardLedThickness,
] = useState(100);

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingPhoto,
    setUploadingPhoto,
  ] = useState(false);

  const [
    uploadingBackground,
    setUploadingBackground,
  ] = useState(false);

  const [
    deleteSeconds,
    setDeleteSeconds,
  ] = useState(10);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const [
    publicUrl,
    setPublicUrl,
  ] = useState("");

  const [
    languageSearch,
    setLanguageSearch,
  ] = useState("");

 const [
  previewTextStyle,
  setPreviewTextStyle,
] = useState("standard");

const [
  previewThemeId,
  setPreviewThemeId,
] = useState(null);

  const [
    textStyleSearch,
    setTextStyleSearch,
  ] = useState("");
  
const [
  pendingAvatarFile,
  setPendingAvatarFile,
] = useState(null);

const [
  pendingAvatarUrl,
  setPendingAvatarUrl,
] = useState("");

const [
  pendingBackgroundFile,
  setPendingBackgroundFile,
] = useState(null);

const [
  pendingBackgroundUrl,
  setPendingBackgroundUrl,
] = useState("");

const [
  pendingBackgroundTemplate,
  setPendingBackgroundTemplate,
] = useState(null);
  
const [aiTranslations, setAiTranslations] =
  useState({});

const languageCode =
  profile?.language || "en";

const activeAiTranslations =
  aiTranslations.language === languageCode
    ? aiTranslations.texts
    : {};

const t = {
  ...TEXTS.en,
  ...(TEXTS[languageCode] || {}),

  design:
    TEXTS[languageCode]?.design ||
    TEXTS.en.design,

  screenLed:
    TEXTS[languageCode]?.screenLed ||
    TEXTS.en.screenLed,

  cardLed:
    TEXTS[languageCode]?.cardLed ||
    TEXTS.en.cardLed,
};

  useEffect(() => {
  let cancelled = false;

  async function loadAiTranslations() {
    setAiTranslations({});

    const initData =
      window.Telegram?.WebApp?.initData;

    if (!initData) return;

  const keys = [
  "ledThickness",
  "save",
  "saved",
  "settings",
  "mainBackground",
  "screenLed",
  "cardLed",
  "ledColor",
  "premiumRequired",
  "saveContact",
  "premiumDescription",
  "premiumMonthly",
  "premiumYearly",

  "edit",
  "design",
  "language",
  "deleteProfile",
  "qr",
  "qrEdit",
  "name",
  "bio",
  "links",
  "addLink",
  "service",
  "linkName",
  "linkUrl",
  "avatar",
  "background",
  "changeAvatar",
  "changeBackground",
  "customColor",
  "textStyle",
  "textStyleInfo",
  "standard",
  "elegant",
  "modern",
  "strong",
  "chooseLanguage",
  "searchLanguage",
  "searchTextStyle",
  "noTextStyle",
  "deleteTitle",
  "deleteWarning",
  "no",
  "yes",
  "empty",
  "enterName",
  "onlyImage",
  "photoTooBig",
  "backgroundTooBig",
  "noLanguage",
];

   const response = await fetch("/api/translate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    initData,
    keys,
    language: languageCode,
  }),
});

if (!response.ok) return;

const data = await response.json();

if (!data.ok || !data.translations) return;

  if (cancelled) return;

setAiTranslations({
  language: languageCode,
  texts: data.translations,
});
  }

 // loadAiTranslations();

  return () => {
    cancelled = true;
  };
}, [languageCode]);

 const selectedTextStyle =
  TEXT_STYLES.find(
    (item) =>
      item.id ===
      (isPremiumActive || modal === "design"
        ? previewTextStyle
        : "standard")
  ) || TEXT_STYLES[0];

 const savedCardTheme =
  isPremiumActive
    ? CARD_THEMES.find(
        (theme) =>
          theme.id === profile?.card_theme
      ) || null
    : null;

const filteredTextStyles =
  useMemo(() => {
      const query =
        textStyleSearch
          .trim()
          .toLocaleLowerCase();

      if (!query) {
        return TEXT_STYLES;
      }

      return TEXT_STYLES.filter(
        (item) =>
          `${item.id} ${item.name} ${item.fontFamily}`
            .toLocaleLowerCase()
            .includes(query)
      );
    }, [textStyleSearch]);

  const filteredLanguages =
    useMemo(() => {
      const query =
        languageSearch
          .trim()
          .toLocaleLowerCase();

      if (!query) {
        return LANGUAGES;
      }

      return LANGUAGES.filter(
        (item) => {
          const text = [
            item.code,
            item.name,
            item.english,
            item.search,
          ]
            .join(" ")
            .toLocaleLowerCase();

          return text.includes(
            query
          );
        }
      );
    }, [languageSearch]);

  /* =========================================================
     TELEGRAM
  ========================================================= */

  function getInitData() {
    if (
      typeof window ===
      "undefined"
    ) {
      return "";
    }

    return (
      window.Telegram?.WebApp
        ?.initData || ""
    );
  }

  /* =========================================================
     API JSON
  ========================================================= */

  async function apiJson(
    action,
    payload = {}
  ) {
    const initData =
      getInitData();

    if (!initData) {
      throw new Error(
        "Telegram Mini App ma’lumoti topilmadi."
      );
    }

    const response =
      await fetch(
        "/api/telegram/profile",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          cache: "no-store",

          body: JSON.stringify({
            action,
            initData,
            cardId,
            ...payload,
          }),
        }
      );

    let data = null;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Server javobi noto‘g‘ri."
      );
    }

   if (
  !response.ok ||
  !data?.ok
) {
  if (
    data?.errorCode ===
      "PREMIUM_REQUIRED" ||
    data?.error ===
      "Premium required."
  ) {
    throw new Error(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );
  }

  throw new Error(
    data?.error ||
      "Server error."
  );
}

    return data;
  }

  /* =========================================================
     API UPLOAD
  ========================================================= */

  async function apiUpload(
    action,
    file
  ) {
    const initData =
      getInitData();

    if (!initData) {
      throw new Error(
        "Telegram Mini App ma’lumoti topilmadi."
      );
    }

    const formData =
      new FormData();

    formData.append(
      "action",
      action
    );

    formData.append(
      "initData",
      initData
    );

    formData.append(
      "cardId",
      cardId
    );

    formData.append(
      "file",
      file
    );

    const response =
      await fetch(
        "/api/telegram/profile",
        {
          method: "POST",
          body: formData,
        }
      );

    let data = null;

    try {
      data =
        await response.json();
    } catch {
      throw new Error(
        "Server javobi noto‘g‘ri."
      );
    }

    if (
      !response.ok ||
      !data?.ok
    ) {
      throw new Error(
        data?.error ||
          "Server error."
      );
    }

    return data;
  }
    /* =========================================================
     LOAD
  ========================================================= */

  useEffect(() => {
    if (!cardId) {
      return;
    }

    loadData();
  }, [cardId]);

  async function loadData() {
    try {
      setError("");

      const data =
        await apiJson("get");

      const profileData =
        data.profile;

      const linksData =
        data.links || [];

    setProfile({
  ...profileData,
  is_premium:
    Boolean(profileData?.premium_until) &&
    new Date(profileData.premium_until).getTime() >
      Date.now(),
});

      setLinks(
        linksData
      );

      setFullName(
        profileData?.full_name ||
          ""
      );

      setBio(
        profileData?.bio ||
          ""
      );
      setPreviewTextStyle(
  profileData?.text_style ||
    "standard"
);
setAboutText(
  profileData?.about_text ||
    ""
);
      
      setScreenLedEnabled(
        Boolean(
          profileData
            ?.screen_led_enabled
        )
      );

      setScreenLedColor(
        profileData
          ?.screen_led_color ||
          "#3B82F6"
      );

      setCardLedEnabled(
        Boolean(
          profileData
            ?.card_led_enabled
        )
      );

      setCardLedColor(
  profileData?.card_led_color ||
    "#3B82F6"
);

setScreenLedThickness(
  Math.max(
    0,
    Math.min(
      100,
      Number(profileData?.screen_led_thickness ?? 100)
    )
  )
);

setCardLedThickness(
  Math.max(
    0,
    Math.min(
      100,
      Number(profileData?.card_led_thickness ?? 100)
    )
  )
);

      setEditLinks(
        linksData.map(
          (item) => ({
            ...item,
          })
        )
      );

      if (
        typeof window !==
        "undefined"
      ) {
        setPublicUrl(
          `${window.location.origin}/p/${profileData.public_slug}`
        );
      }
    } catch (err) {
      setError(
        err?.message ||
          "Server error."
      );
    }
  }

  /* =========================================================
     NOTICE
  ========================================================= */

  function showNotice(
    message
  ) {
    setNotice(
      message
    );

    window.clearTimeout(
      window.__nfcNoticeTimer
    );

    window.__nfcNoticeTimer =
      window.setTimeout(
        () => {
          setNotice("");
        },
        2200
      );
  }

  /* =========================================================
     MENU / MODALS
  ========================================================= */

  function openSettings() {
    setMenuOpen(false);

    setModal(
      "settings"
    );
  }

  function openQr() {
    setMenuOpen(false);

    setModal(
      "qr"
    );
  }

  function backToSettings() {
    setOpenLinkIndex(
      null
    );

    setLanguageSearch("");
    setTextStyleSearch("");

    setModal(
      "settings"
    );
  }

  function openEdit() {
    setFullName(
      profile?.full_name ||
        ""
    );

    setBio(
      profile?.bio ||
        ""
    );

    setAboutText(
  profile?.about_text ||
    ""
);
    
    setEditLinks(
      links.map(
        (item) => ({
          ...item,
        })
      )
    );

    setOpenLinkIndex(
      null
    );

    setModal(
      "edit"
    );
  }

  /* =========================================================
     EDIT LINKS
  ========================================================= */

 function addLink() {
  
   if (
  editLinks.length >= 1 &&
  !isPremiumActive
) {
    showNotice(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );

    return;
  }

  setEditLinks(
    (current) => [
      ...current,

      {
        temp_id:
          `new-${Date.now()}-${Math.random()}`,

        id: null,

        label:
          "Telegram",

        url: "",

        icon:
          "telegram",

        sort_order:
          current.length,
      },
    ]
  );

  setOpenLinkIndex(
    editLinks.length
  );
}

  function updateEditLink(
    index,
    field,
    value
  ) {
    setEditLinks(
      (current) =>
        current.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex ===
            index
              ? {
                  ...item,

                  [field]:
                    value,
                }
              : item
        )
    );
  }

  function chooseService(
    index,
    value
  ) {
    const service =
      SERVICES.find(
        (item) =>
          item.value ===
          value
      );

    setEditLinks(
      (current) =>
        current.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex ===
            index
              ? {
                  ...item,

                  icon:
                    value,

                  label:
                    service?.label ||
                    item.label,
                }
              : item
        )
    );
  }

  function removeEditLink(
    index
  ) {
    setEditLinks(
      (current) =>
        current
          .filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          )
          .map(
            (
              item,
              itemIndex
            ) => ({
              ...item,

              sort_order:
                itemIndex,
            })
          )
    );

    setOpenLinkIndex(
      null
    );
  }

  /* =========================================================
     SAVE EDIT
  ========================================================= */

  async function saveEdit() {
    if (
      !fullName.trim()
    ) {
      showNotice(
        t.enterName
      );

      return;
    }

    try {
      setSaving(true);

      const cleanedLinks =
        editLinks
          .map(
            (
              item,
              index
            ) => ({
              id:
                item.id ||
                null,

              label:
                (
                  item.label ||
                  ""
                ).trim(),

              url:
                (
                  item.url ||
                  ""
                ).trim(),

              icon:
                item.icon ||
                "website",

              sort_order:
                index,
            })
          )
          .filter(
            (item) =>
              item.label ||
              item.url
          );

      const data =
        await apiJson(
          "saveEdit",
          {
            fullName:
              fullName.trim(),

            bio:
              bio.trim(),

            aboutText:
  aboutText.trim(),

            links:
              cleanedLinks,
          }
        );

      setProfile(
        data.profile
      );

      setLinks(
        data.links || []
      );

      setEditLinks(
        (
          data.links ||
          []
        ).map(
          (item) => ({
            ...item,
          })
        )
      );

     showNotice(
  t.saved
);
    } catch (err) {
      showNotice(
        err?.message ||
          "Server error."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     UPLOAD AVATAR
  ========================================================= */

  function uploadAvatar(event) {
  const file =
    event.target.files?.[0];

  if (!file || !profile) {
    return;
  }

  if (
    !file.type.startsWith(
      "image/"
    )
  ) {
    showNotice(t.onlyImage);
    event.target.value = "";
    return;
  }

  if (
    file.size >
    5 * 1024 * 1024
  ) {
    showNotice(t.photoTooBig);
    event.target.value = "";
    return;
  }

  if (pendingAvatarUrl) {
    URL.revokeObjectURL(
      pendingAvatarUrl
    );
  }

  const previewUrl =
    URL.createObjectURL(file);

  setPendingAvatarFile(file);

  setPendingAvatarUrl(
    previewUrl
  );

  showNotice(
    UPLOADED_TEXT[
      languageCode
    ] ||
      UPLOADED_TEXT.en
  );

  event.target.value = "";
}

  /* =========================================================
     UPLOAD BACKGROUND
  ========================================================= */

  function uploadBackground(event) {
  const file =
    event.target.files?.[0];

  if (!file || !profile) {
    return;
  }

 if (
  !isPremiumActive
) {
    showNotice(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );

    event.target.value = "";
    return;
  }

  if (
    !file.type.startsWith(
      "image/"
    )
  ) {
    showNotice(
      t.onlyImage
    );

    event.target.value = "";
    return;
  }

  if (
    file.size >
    10 * 1024 * 1024
  ) {
    showNotice(
      t.backgroundTooBig
    );

    event.target.value = "";
    return;
  }

  if (
    pendingBackgroundUrl
  ) {
    URL.revokeObjectURL(
      pendingBackgroundUrl
    );
  }

  const previewUrl =
    URL.createObjectURL(file);

  setPendingBackgroundFile(
    file
  );

  setPendingBackgroundUrl(
    previewUrl
  );

  setPendingBackgroundTemplate(
    null
  );

  showNotice(
    UPLOADED_TEXT[
      languageCode
    ] ||
      UPLOADED_TEXT.en
  );

  event.target.value = "";
}
 
  /* =========================================================
     SAVE DESIGN
  ========================================================= */

 function resetDesignPreview() {
setPreviewThemeId(
  isPremiumActive
    ? profile?.card_theme || null
    : null
);

  setScreenLedEnabled(
    Boolean(
      profile?.screen_led_enabled
    )
  );

  setScreenLedColor(
    profile?.screen_led_color ||
      "#3B82F6"
  );

  setCardLedEnabled(
    Boolean(
      profile?.card_led_enabled
    )
  );

setCardLedColor(
  profile?.card_led_color ||
    "#3B82F6"
);

setScreenLedThickness(
  Math.max(
    0,
    Math.min(
      100,
      Number(profile?.screen_led_thickness ?? 100)
    )
  )
);

setCardLedThickness(
  Math.max(
    0,
    Math.min(
      100,
      Number(profile?.card_led_thickness ?? 100)
    )
  )
);

  setPreviewTextStyle(
    profile?.text_style ||
      "standard"
  );

  if (
    pendingAvatarUrl &&
    pendingAvatarUrl.startsWith(
      "blob:"
    )
  ) {
    URL.revokeObjectURL(
      pendingAvatarUrl
    );
  }

  if (
    pendingBackgroundUrl &&
    pendingBackgroundUrl.startsWith(
      "blob:"
    )
  ) {
    URL.revokeObjectURL(
      pendingBackgroundUrl
    );
  }

  setPendingAvatarFile(null);
  setPendingAvatarUrl("");

  setPendingBackgroundFile(null);
  setPendingBackgroundUrl("");

  setPendingBackgroundTemplate(null);
}

function openDesign() {
  resetDesignPreview();
  setTextStyleSearch("");
  setModal("design");
}

function closeDesign() {
  resetDesignPreview();
  setTextStyleSearch("");
  setModal(null);
}

function backFromDesign() {
  resetDesignPreview();
  setTextStyleSearch("");
  setModal("settings");
}
  
async function saveDesign() {
  if (
    !profile ||
    saving
  ) {
    return;
  }

const premiumDesignSelected =
  previewTextStyle !== "standard" ||
  screenLedEnabled ||
  cardLedEnabled ||
  Boolean(pendingBackgroundFile) ||
  Boolean(previewThemeId);

  if (
  !isPremiumActive &&
  premiumDesignSelected
) {
    showNotice(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );

    return;
  }

  try {
    setSaving(true);

    let latestProfile =
      profile;

    // AVATAR:
    // faqat Save bosilganda upload
    if (pendingAvatarFile) {
      const avatarData =
        await apiUpload(
          "uploadAvatar",
          pendingAvatarFile
        );

      latestProfile =
        avatarData.profile ||
        latestProfile;
    }

    // CUSTOM BACKGROUND:
    // faqat Premium va Save bosilganda upload
    if (
      pendingBackgroundFile
    ) {
      const backgroundData =
        await apiUpload(
          "uploadBackground",
          pendingBackgroundFile
        );

      latestProfile =
        backgroundData.profile ||
        latestProfile;
    }
    // BACKGROUND TEMPLATE:
// faqat Save bosilganda saqlanadi
if (
  pendingBackgroundTemplate
) {
  const templateData =
    await apiJson(
      "saveBackgroundTemplate",
      {
        templateNumber:
          pendingBackgroundTemplate,
      }
    );

  latestProfile =
    templateData.profile ||
    latestProfile;
}

    // FONT + LED
   const data =
  await apiJson(
    "saveDesign",
    {
      screenLedEnabled,
      screenLedColor,
      screenLedThickness,
      cardLedEnabled,
      cardLedColor,
     cardLedThickness,
textStyle:
  previewTextStyle,
cardTheme:
  previewThemeId,
    }
  );

    latestProfile =
      data.profile ||
      latestProfile;

    setProfile(
      latestProfile
    );

    if (pendingAvatarUrl) {
      URL.revokeObjectURL(
        pendingAvatarUrl
      );
    }

    if (
      pendingBackgroundUrl
    ) {
      URL.revokeObjectURL(
        pendingBackgroundUrl
      );
    }

    setPendingAvatarFile(
      null
    );
    setPendingAvatarUrl("");

    setPendingBackgroundFile(
      null
    );
    setPendingBackgroundUrl("");

    setPendingBackgroundTemplate(
      null
    );

    showNotice(
      t.saved
    );
  } catch (err) {
    console.error(err);

    showNotice(
      err?.message ||
        "Server error."
    );
  } finally {
    setSaving(false);
  }
}

  /* =========================================================
     LANGUAGE
  ========================================================= */

  async function changeLanguage(
    code
  ) {
    try {
      const data =
        await apiJson(
          "changeLanguage",
          {
            language:
              code,
          }
        );

     setProfile({
  ...data.profile,
  is_premium:
    Boolean(data.profile?.premium_until) &&
    new Date(data.profile.premium_until).getTime() >
      Date.now(),
});

      setLanguageSearch(
        ""
      );

      setModal(null);
    } catch (err) {
      showNotice(
        err?.message ||
          "Server error."
      );
    }
  }

  /* =========================================================
     DELETE
  ========================================================= */

  useEffect(() => {
    if (
      modal !== "delete"
    ) {
      return;
    }

    setDeleteSeconds(
      10
    );

    const timer =
      window.setInterval(
        () => {
          setDeleteSeconds(
            (value) => {
              if (
                value <= 1
              ) {
                window.clearInterval(
                  timer
                );

                return 0;
              }

              return (
                value - 1
              );
            }
          );
        },
        1000
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [modal]);

  useEffect(() => {
  const preventZoom = (event) => {
    if (
      event.ctrlKey ||
      event.metaKey
    ) {
      event.preventDefault();
    }
  };

  window.addEventListener(
    "wheel",
    preventZoom,
    { passive: false }
  );

  return () => {
    window.removeEventListener(
      "wheel",
      preventZoom
    );
  };
}, []);

  async function deleteProfile() {
    if (
      deleteSeconds >
        0 ||
      deleting
    ) {
      return;
    }

    try {
      setDeleting(true);

      await apiJson(
        "deleteProfile"
      );

      if (
        typeof window !==
        "undefined"
      ) {
        window.location.replace(
          "/"
        );
      }
    } catch (err) {
      showNotice(
        err?.message ||
          "Server error."
      );

      setDeleting(false);
    }
  }

  /* =========================================================
     OPEN LINK
  ========================================================= */

  function openLink(link) {
  const url = (link?.url || "").trim();

  if (!url) {
    showNotice(t.empty);
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  // Telefon
  if (link.icon === "phone") {
    window.location.href = url.startsWith("tel:")
      ? url
      : `tel:${url}`;
    return;
  }

  // Email
  if (link.icon === "email") {
    window.location.href = url.startsWith("mailto:")
      ? url
      : `mailto:${url}`;
    return;
  }

  // Oddiy URL bo'lmasa https qo'shamiz
  const finalUrl =
    /^(https?:\/\/)/i.test(url)
      ? url
      : `https://${url}`;

  // Telegram Mini App ichida:
  // linkni Telegram ichki browserida emas,
  // tashqi ilova/browser orqali ochishga harakat qilamiz.
  const tg = window.Telegram?.WebApp;

  if (
    tg &&
    typeof tg.openLink === "function"
  ) {
    try {
      tg.openLink(finalUrl, {
        try_instant_view: false,
      });
      return;
    } catch (error) {
      // Pastdagi fallback ishlaydi
    }
  }

  // Telegram Mini App tashqarisida fallback
  try {
    window.open(
      finalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  } catch (error) {
    window.location.href = finalUrl;
  }
}

  /* =========================================================
     QR
  ========================================================= */

  const qrImageUrl =
    publicUrl
      ? `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=18&data=${encodeURIComponent(
          publicUrl
        )}`
      : "";

  /* =========================================================
     EMPTY
  ========================================================= */

  const profileEmpty =
    !(
      profile?.full_name ||
      ""
    ).trim() &&
    !(
      profile?.bio ||
      ""
    ).trim() &&
    links.length === 0;

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main
        style={
          styles.errorPage
        }
      >
        <div
          style={
            styles.errorBox
          }
        >
          {error}
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main
        style={
          styles.blankPage
        }
      />
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

return (
  <main
    style={{
      ...styles.page,

      fontFamily:
        selectedTextStyle.fontFamily,

      fontWeight:
        selectedTextStyle.fontWeight,

      letterSpacing:
        selectedTextStyle.letterSpacing,
    }}
    onClick={() => {
      if (menuOpen) {
        setMenuOpen(
          false
        );
      }
    }}
  >
   <style jsx global>{`
  button,
  input,
  textarea,
  select {
    font-family: inherit !important;
    font-weight: inherit;
    letter-spacing: inherit;
  }

  img {
    -webkit-touch-callout: none !important;
    -webkit-user-select: none !important;
    user-select: none !important;
    -webkit-user-drag: none !important;
  }
`}</style>

    {/* BLURRED FULL BACKGROUND */}
      {/* BLURRED FULL BACKGROUND */}

      <div
        style={{
          ...styles.backgroundBlur,

backgroundImage:
  isPremiumActive &&
  (pendingBackgroundUrl || effectiveProfile?.background_url)
    ? `url("${
        pendingBackgroundUrl ||
        effectiveProfile.background_url
      }")`
    : "none",
        }}
      />

      <div
        style={
          styles.backgroundShade
        }
      />

    {/* SCREEN LED */}

{isPremiumActive && screenLedEnabled && (
  <div
          style={{
            ...styles.screenLed,

            boxShadow:
  screenLedThickness === 0
    ? "none"
    : `
        inset 0 0 ${18 * screenLedThickness / 100}px ${screenLedColor},
        inset 0 0 ${35 * screenLedThickness / 100}px ${screenLedColor},
        inset 0 0 ${58 * screenLedThickness / 100}px ${screenLedColor}
      `,
          }}
        />
      )}

      {/* CENTER STRIP */}

      <section
        style={{
          ...styles.centerStrip,

    backgroundImage:
  isPremiumActive &&
  (pendingBackgroundUrl || effectiveProfile?.background_url)
    ? `url("${
        pendingBackgroundUrl ||
        effectiveProfile.background_url
      }")`
    : "linear-gradient(145deg,#dfe7ef,#cbd5e1)",
        }}
      >
        <div
          style={
            styles.centerShade
          }
        />

        {/* TOP RIGHT — Premium / QR / Settings */}
<style>{`
  @keyframes premiumStarSpin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
  }
`}</style>

<div
  style={{
    ...styles.topRight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "8px",
    flexWrap: "nowrap",
  }}
  onClick={(event) => event.stopPropagation()}
>
  <button
    type="button"
    aria-label="Premium sotib olish"
  onClick={() => setModal("premiumPlans")}

    style={{
      ...styles.menuButton,
      width: "44px",
      minWidth: "44px",
      height: "44px",
      borderRadius: "50%",
      flexShrink: 0,
      padding: 0,
      background: "linear-gradient(145deg,#303948,#111827)",
      perspective: "140px",
    }}
  >
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: "26px",
        lineHeight: 1,
        color: "#FFD700",
        textShadow: "1px 2px 0 #956400, 0 0 7px rgba(255,210,30,.55)",
        transformStyle: "preserve-3d",
        animation: "premiumStarSpin 4s linear infinite",
      }}
    >
      ★
    </span>
  </button>

  <button
    type="button"
    aria-label="QR kod"
    onClick={openQr}
    style={{
      ...styles.menuButton,
      width: "44px",
      minWidth: "44px",
      height: "44px",
      borderRadius: "50%",
      flexShrink: 0,
      padding: 0,
    }}
  >
    <FaQrcode />
  </button>

  <button
    type="button"
    aria-label="Sozlamalar"
    onClick={openSettings}
    style={{
      ...styles.menuButton,
      width: "44px",
      minWidth: "44px",
      height: "44px",
      borderRadius: "50%",
      flexShrink: 0,
      padding: 0,
    }}
  >
    <FaGear />
  </button>
</div>

        {/* CARD */}

        <div
          style={{
            ...styles.cardWrap,
 }}
        >
         <div
  style={{
    position: "relative",
    width: "100%",

    fontFamily:
  selectedTextStyle.fontFamily,

fontWeight:
  selectedTextStyle.fontWeight,

letterSpacing:
  selectedTextStyle.letterSpacing,
    
    transform:
      `perspective(1200px) rotateY(${cardRotation}deg)`,

transformStyle: "preserve-3d",
touchAction: "none",
cursor: "grab",
userSelect: "none",
WebkitUserSelect: "none",
  }}
  onPointerDown={handleCardPointerDown}
  onPointerMove={handleCardPointerMove}
  onPointerUp={handleCardPointerUp}
  onPointerCancel={handleCardPointerUp}
    onDragStart={(event) => event.preventDefault()}
>
  {/* FRONT FACE */}

  <div
    style={{
     ...styles.glassPanel,

background: savedCardTheme
  ? savedCardTheme.card
  : "rgba(255,255,255,.48)",

border: savedCardTheme
  ? `1px solid ${savedCardTheme.accent}`
  : "1px solid rgba(255,255,255,.55)",
      
  boxShadow: isPremiumActive && cardLedEnabled
  ? `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20),
     0 0 ${10 * cardLedThickness / 100}px ${cardLedThickness === 0 ? "transparent" : cardLedColor},
0 0 ${24 * cardLedThickness / 100}px ${cardLedThickness === 0 ? "transparent" : cardLedColor},
0 0 ${45 * cardLedThickness / 100}px ${cardLedThickness === 0 ? "transparent" : cardLedColor}
    `
  : `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20)
    `,
      
      backfaceVisibility:
        "hidden",

      WebkitBackfaceVisibility:
        "hidden",

      transform:
        "rotateY(0deg)",
    }}
  >
            {/* AVATAR */}

            <div
              style={
                styles.avatarOuter
              }
            >
            {(pendingAvatarUrl ||
  profile.photo_url) ? (
  <div
    aria-label={
      profile.full_name ||
      "Profile"
    }
    style={{
      ...styles.avatarImage,
     backgroundImage: `url("${
  pendingAvatarUrl ||
  profile.photo_url
}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />
) : (
  <div
    style={
      styles.avatarPlaceholder
    }
  >
    👤
  </div>
)}
            </div>

            {/* NAME */}

            {!!profile.full_name && (
             <h1
  style={{
    ...styles.name,

    color: savedCardTheme
      ? savedCardTheme.text
      : "#111827",

    fontFamily:
      selectedTextStyle.fontFamily,

                  fontWeight:
                    selectedTextStyle.fontWeight,

                  letterSpacing:
                    selectedTextStyle.letterSpacing,
                }}
              >
                {
                  profile.full_name
                }
              </h1>
            )}

            {/* BIO */}

            {!!profile.bio && (
             <p
  style={{
    ...styles.bio,

    ...(savedCardTheme
      ? { color: savedCardTheme.text }
      : {}),

    fontFamily:
      selectedTextStyle.fontFamily,

                  fontWeight:
                    Math.min(
                      selectedTextStyle.fontWeight,
                      700
                    ),

                  letterSpacing:
                    selectedTextStyle.letterSpacing,
                }}
              >
                {profile.bio}
              </p>
            )}

            {/* ONE EMPTY MESSAGE ONLY */}

            {profileEmpty && (
              <button
                type="button"
                style={
                  styles.singleEmpty
                }
                onClick={
                  openSettings
                }
              >
                {t.empty}
              </button>
            )}

         {/* LINKS */}

{links.length > 0 && (
  <div
    style={{
      ...styles.linksGrid
    }}
  >
    {(isPremiumActive ? links : links.slice(0, 1)).map(
                  (link) => (
                    <button
                      type="button"
                      key={
                        link.id
                      }
                    style={{
  ...styles.linkButton,

  color: savedCardTheme
    ? savedCardTheme.text
    : "#111827",
}}
                      onClick={() =>
                        openLink(
                          link
                        )
                      }
                    >
                      <span
                        style={{
                          ...styles.iconBox,

                          ...getIconColor(
                            link.icon
                          ),
                        }}
                      >
                        <SocialIcon
                          icon={
                            link.icon
                          }
                        />
                      </span>

                      <span
                        style={
                          styles.linkLabel
                        }
                      >
                        {
                          link.label
                        }
                      </span>
                    </button>
                  )
                )}
              </div>
            )}
                  </div>

          {/* BACK FACE */}

          <div
            style={{
             ...styles.glassPanel,

background: savedCardTheme
  ? savedCardTheme.card
  : "rgba(255,255,255,.48)",

border: savedCardTheme
  ? `1px solid ${savedCardTheme.accent}`
  : "1px solid rgba(255,255,255,.55)",
              
boxShadow: isPremiumActive && cardLedEnabled
  ? `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20),
      0 0 10px ${cardLedColor},
      0 0 24px ${cardLedColor},
      0 0 45px ${cardLedColor}
    `
  : `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20)
    `,
              
              position: "absolute",
              inset: 0,

              padding: "22px",

              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",

              transform: "rotateY(180deg)",

              textAlign: "left",
             overflowY: "auto",
overflowX: "hidden",

overscrollBehavior:
  "contain",

WebkitOverflowScrolling:
  "touch",

touchAction:
  "pan-y",
              display: "flex",
              flexDirection: "column",
            }}
          >
           <div
  style={{
    position: "relative",
    width: "100%",
    minHeight: "32px",
  }}
            >
              <div
                style={{
                 fontSize: "16px",
fontWeight: 800,
color: savedCardTheme
  ? savedCardTheme.text
  : "#111827",
                }}
              >
  {t.bio}
</div>
                  <button
  type="button"
  onPointerDown={(event) =>
    event.stopPropagation()
  }
  onClick={() =>
    setModal("about")
  }
  style={{
    position: "absolute",
top: "0",
right: "0",
    border: "none",
    background: "rgba(255,255,255,.45)",
    borderRadius: "10px",
    padding: "6px 10px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#111827",
    cursor: "pointer",
  }}
>
  {t.edit}
</button>
            </div>

            <div
              style={{
                marginTop: "18px",
                color: "#374151",
                fontSize: "15px",
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {aboutText || ""}
            </div>
          </div>

              </div>
              
      </div>

        {/* SETTINGS */}

        {modal ===
          "settings" && (
          <ModalShell
            title={
              t.settings
            }
            icon={
              <FaGear />
            }
            onClose={() =>
              setModal(null)
            }
          >
            <div
              style={
                styles.settingsList
              }
            >
              <SettingsButton
                icon={
                  <FaPen />
                }
                label={
                  t.edit
                }
                onClick={
                  openEdit
                }
              />

              <SettingsButton
                icon={
                  <FaPalette />
                }
                label={
                  t.design
                }
              onClick={openDesign}
              />

              <SettingsButton
                icon={
                  <FaLanguage />
                }
                label={
                  t.language
                }
                onClick={() => {
                  setLanguageSearch(
                    ""
                  );

                  setModal(
                    "language"
                  );
                }}
              />

              <SettingsButton
                icon={
                  <FaTrash />
                }
                label={
                  t.deleteProfile
                }
                danger
                onClick={() =>
                  setModal(
                    "delete"
                  )
                }
              />
            </div>
          </ModalShell>
        )}
{/* ABOUT */}
{modal ===
  "about" && (
 <ModalShell
  title={t.bio}
  icon={<FaPen />}
    onClose={() =>
      setModal(null)
    }
    large
  >
    <div
      style={
        styles.form
      }
    >
      <textarea
        value={aboutText}
        onChange={(
          event
        ) =>
          setAboutText(
            event.target.value
          )
        }
        style={{
          ...styles.textarea,
          minHeight: "180px",
        }}
       placeholder={t.bio}
      />

      <button
        type="button"
        disabled={saving}
        style={{
          ...styles.primaryButton,
          opacity:
            saving
              ? 0.55
              : 1,
        }}
        onClick={
          saveEdit
        }
      >
        <FaCheck />

        {t.save}
      </button>
    </div>
  </ModalShell>
)}
        {/* EDIT */}

        {modal ===
          "edit" && (
          <ModalShell
            title={
              t.edit
            }
            icon={
              <FaPen />
            }
            onBack={
              backToSettings
            }
            onClose={() =>
              setModal(null)
            }
            large
          >
            <div
              style={
                styles.form
              }
            >
              <label
                style={
                  styles.label
                }
              >
                {t.name}
              </label>

              <input
                value={
                  fullName
                }
                onChange={(
                  event
                ) =>
                  setFullName(
                    event.target.value
                  )
                }
                style={
                  styles.input
                }
              />

              <label
                style={
                  styles.label
                }
              >
                {t.bio}
              </label>

              <textarea
                value={bio}
                onChange={(
                  event
                ) =>
                  setBio(
                    event.target.value
                  )
                }
                style={
                  styles.textarea
                }
              />
  
              <div
                style={
                  styles.sectionTitle
                }
              >
                {t.links}
              </div>

              {editLinks.map(
                (
                  link,
                  index
                ) => {
                  const opened =
                    openLinkIndex ===
                    index;

                  const service =
                    SERVICES.find(
                      (item) =>
                        item.value ===
                        link.icon
                    ) ||
                    SERVICES[0];

                  return (
                    <div
                      key={
                        link.id ||
                        link.temp_id ||
                        index
                      }
                      style={
                        styles.accordion
                      }
                    >
                      <button
                        type="button"
                        style={
                          styles.accordionHeader
                        }
                        onClick={() =>
                          setOpenLinkIndex(
                            opened
                              ? null
                              : index
                          )
                        }
                      >
                        <span
                          style={{
                            ...styles.smallIcon,

                            ...getIconColor(
                              link.icon
                            ),
                          }}
                        >
                          <SocialIcon
                            icon={
                              link.icon
                            }
                            small
                          />
                        </span>

                        <span
                          style={
                            styles.accordionText
                          }
                        >
                          {
                            service.label
                          }
                        </span>

                        <FaChevronDown
                          style={{
                            transform:
                              opened
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition:
                              "transform .2s ease",
                          }}
                        />
                      </button>

                      {opened && (
                        <div
                          style={
                            styles.accordionBody
                          }
                        >
                          <label
                            style={
                              styles.label
                            }
                          >
                            {
                              t.service
                            }
                          </label>

                          <select
                            value={
                              link.icon ||
                              "telegram"
                            }
                            onChange={(
                              event
                            ) =>
                              chooseService(
                                index,
                                event.target.value
                              )
                            }
                            style={
                              styles.input
                            }
                          >
                            {SERVICES.map(
                              (item) => (
                                <option
                                  key={
                                    item.value
                                  }
                                  value={
                                    item.value
                                  }
                                >
                                  {
                                    item.label
                                  }
                                </option>
                              )
                            )}
                          </select>

                          <label
                            style={
                              styles.label
                            }
                          >
                            {
                              t.linkName
                            }
                          </label>

                          <input
                            value={
                              link.label ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateEditLink(
                                index,
                                "label",
                                event.target.value
                              )
                            }
                            style={
                              styles.input
                            }
                          />

                          <label
                            style={
                              styles.label
                            }
                          >
                            {
                              t.linkUrl
                            }
                          </label>

                          <input
                            value={
  link.url ||
  ""
}
placeholder={
  link.icon === "telegram"
    ? "https://t.me/username"
    : link.icon === "whatsapp"
    ? "https://wa.me/998XXXXXXXXX"
    : link.icon === "instagram"
    ? "https://instagram.com/username"
    : link.icon === "threads"
    ? "https://www.threads.net/@username"
    : link.icon === "youtube"
    ? "https://youtube.com/@username"
    : link.icon === "tiktok"
    ? "https://tiktok.com/@username"
    : link.icon === "facebook"
    ? "https://facebook.com/username"
    : link.icon === "linkedin"
    ? "https://linkedin.com/in/username"
    : link.icon === "x"
    ? "https://x.com/username"
    : link.icon === "vk"
    ? "https://vk.com/username"
    : link.icon === "ok"
    ? "https://ok.ru/profile/..."
    : link.icon === "phone"
    ? "+998901234567"
    : link.icon === "email"
    ? "name@example.com"
    : link.icon === "website"
    ? "https://example.com"
    : link.icon === "location"
    ? "https://maps.google.com/..."
    : "https://..."
}
                            onChange={(
                              event
                            ) =>
                              updateEditLink(
                                index,
                                "url",
                                event.target.value
                              )
                            }
                            style={
                              styles.input
                            }
                          />

                          <button
                            type="button"
                            style={
                              styles.deleteLink
                            }
                            onClick={() =>
                              removeEditLink(
                                index
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }
              )}

              <button
                type="button"
                style={
                  styles.addButton
                }
                onClick={
                  addLink
                }
              >
                <FaPlus />

                {t.addLink}
              </button>

              <button
                type="button"
                disabled={
                  saving
                }
                style={{
                  ...styles.primaryButton,

                  opacity:
                    saving
                      ? 0.55
                      : 1,
                }}
                onClick={
                  saveEdit
                }
              >
                <FaCheck />

                {t.save}
              </button>
            </div>
          </ModalShell>
        )}

        {/* DESIGN */}

        {modal ===
          "design" && (
          <ModalShell
            title={
              t.design
            }
            icon={
              <FaPalette />
            }
         onBack={
  backFromDesign
}
onClose={
  closeDesign
}
            large
          >
            <div
              style={
                styles.form
              }
            >
              <input
                ref={
                  avatarInputRef
                }
                type="file"
                accept="image/*"
                hidden
                onChange={
                  uploadAvatar
                }
              />

              <input
                ref={
                  backgroundInputRef
                }
                type="file"
                accept="image/*"
                hidden
                onChange={
                  uploadBackground
                }
              />

              <div
                style={
                  styles.designSection
                }
              >
                <strong>
                  {t.avatar}
                </strong>

                <button
                  type="button"
                  disabled={
                    uploadingPhoto
                  }
                  style={{
                    ...styles.uploadButton,

                    opacity:
                      uploadingPhoto
                        ? 0.55
                        : 1,
                  }}
                 onClick={() => {
  avatarInputRef.current?.click();
}}
                >
                  <FaCamera />

                  {
                    t.changeAvatar
                  }
                </button>
              </div>

              <div
                style={
                  styles.designSection
                }
              >
                <strong>
                  {
                    t.background
                  }
                </strong>

                <button
                  type="button"
                  disabled={
                    uploadingBackground
                  }
                  style={{
                    ...styles.uploadButton,

                    opacity:
                      uploadingBackground
                        ? 0.55
                        : 1,
                  }}
                  onClick={() => {
  if (
  !isPremiumActive
) {
    showNotice(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );

    return;
  }

  backgroundInputRef.current?.click();
}}
                >
                  <FaImage />

                  {
                    t.changeBackground
                  }
                </button>

                  <div
  style={{
    marginTop: "14px",
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    paddingBottom: "8px",
    WebkitOverflowScrolling: "touch",
  }}
>
  {Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;

    const imageUrl =
      `https://yzkeabplmbxkvyschlop.supabase.co/storage/v1/object/public/backgrounds/templates/nature-${String(
        number
      ).padStart(2, "0")}.webp`;

    return (
     <button
        key={number}
    type="button"
onClick={() => {
  if (
  number > 1 &&
  !isPremiumActive
) {
    showNotice(
      PREMIUM_REQUIRED_TEXT[
        languageCode
      ] ||
        PREMIUM_REQUIRED_TEXT.en
    );

    return;
  }

  if (
    pendingBackgroundUrl &&
    pendingBackgroundUrl.startsWith(
      "blob:"
    )
  ) {
    URL.revokeObjectURL(
      pendingBackgroundUrl
    );
  }

  setPendingBackgroundFile(null);

  setPendingBackgroundUrl(
    imageUrl
  );

  setPendingBackgroundTemplate(
    number
  );

  showNotice(
    UPLOADED_TEXT[
      languageCode
    ] ||
      UPLOADED_TEXT.en
  );
}}
        style={{
          position: "relative",
          flex: "0 0 90px",
          height: "120px",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

       {number > 1 && !isPremiumActive && (
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "rgba(0,0,0,.65)",
              color: "#fff",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            🔒
          </div>
        )}
      </button>
    );
  })}
</div>
              </div>


{/* PREMIUM CARD THEMES */}

<div style={{ marginBottom: "24px" }}>
  <div
    style={{
      fontSize: "16px",
      fontWeight: 700,
      marginBottom: "14px",
    }}
  >
    ✨ Premium
  </div>


{/* TANLANGAN RANGNI OLDINDAN KO'RISH */}

{previewThemeId && (() => {
  const theme = CARD_THEMES.find(
    (item) => item.id === previewThemeId
  );

  if (!theme) return null;

  return (
    <div
      style={{
        background: theme.bg,
        padding: "14px",
        borderRadius: "20px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          background: theme.card,
          color: theme.text,
          border: `1px solid ${theme.accent}`,
          borderRadius: "20px",
          padding: "24px 16px",
          textAlign: "center",
          boxShadow: `0 6px 25px ${theme.accent}40`,
        }}
      >
        {profile?.photo_url && (
          <img
            src={profile.photo_url}
            alt=""
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              objectFit: "cover",
              border: `2px solid ${theme.accent}`,
              marginBottom: "12px",
            }}
          />
        )}

        <div
          style={{
            fontSize: "20px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          {profile?.full_name || "Personal Card"}
        </div>

        <div style={{ fontSize: "13px", opacity: 0.85 }}>
          {profile?.bio || ""}
        </div>

        <div
          style={{
            color: theme.accent,
            fontSize: "12px",
            marginTop: "16px",
            fontWeight: 600,
          }}
        >
          ✦ {theme.name} · Preview
        </div>
      </div>
    </div>
  );
})()}

      
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",
      gap: "10px",
    }}
  >
    {CARD_THEMES.map((theme) => {
      const active =
        previewThemeId === theme.id;

      return (
        <button
          key={theme.id}
          type="button"
          aria-pressed={active}
          onClick={() =>
            setPreviewThemeId(theme.id)
          }
          style={{
            padding: "7px",
            borderRadius: "14px",
            border: active
              ? `2px solid ${theme.accent}`
              : "2px solid transparent",
            background: theme.bg,
            cursor: "pointer",
            minWidth: 0,
          }}
        >
          <div
            style={{
              height: "65px",
              borderRadius: "9px",
              background: theme.card,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.accent,
              fontSize: "24px",
            }}
          >
            {active ? "✓" : "✦"}
          </div>

          <div
            style={{
              marginTop: "7px",
              color: theme.text,
              fontSize: "10px",
              fontWeight: 600,
              textAlign: "center",
              overflowWrap: "anywhere",
            }}
          >
            {theme.name}
          </div>
        </button>
      );
    })}
  </div>
</div>


              {/* TEXT STYLE */}

              <div
                style={
                  styles.textStyleBox
                }
              >
                <div
                  style={
                    styles.textStyleHeader
                  }
                >
                  <span
                    style={
                      styles.textStyleIcon
                    }
                  >
                    <FaFont />
                  </span>

                  <div>
                    <strong>
                      {
                        t.textStyle
                      }
                    </strong>

                    <div
                      style={
                        styles.textStyleInfo
                      }
                    >
                      {
                        t.textStyleInfo
                      }
                    </div>
                  </div>
                </div>

                <div
                  style={
                    styles.textStyleSearch
                  }
                >
                  <FaMagnifyingGlass />

                  <input
                    value={
                      textStyleSearch
                    }
                    onChange={(event) =>
                      setTextStyleSearch(
                        event.target.value
                      )
                    }
                    placeholder={
                      t.searchTextStyle ||
                      "Search text style..."
                    }
                    style={
                      styles.textStyleSearchInput
                    }
                  />
                </div>

                {filteredTextStyles.length > 0 ? (
                  <div
                    style={
                      styles.textStyleGrid
                    }
                  >
                    {filteredTextStyles.map(
                      (item) => {
                        const active =
                          previewTextStyle ===
                          item.id;

                        return (
                          <button
                            type="button"
                            key={
                              item.id
                            }
                            style={{
                              ...styles.textStyleButton,

                              ...(active
                                ? styles.textStyleButtonActive
                                : {}),
                            }}
  onClick={() => {
  setPreviewTextStyle(item.id);
}}
                          >
                            <span
                              style={{
                                fontFamily:
                                  item.fontFamily,

                                fontWeight:
                                  item.fontWeight,

                                letterSpacing:
                                  item.letterSpacing,

                                fontSize:
                                  "19px",
                              }}
                            >
                              Aa
                            </span>

                 <small>
  {
    item.premium &&
    !isPremiumActive
      ? `🔒 ${item.name}`
      : item.name
  }
</small>

                            {active && (
                              <span
                                style={
                                  styles.textStyleCheck
                                }
                              >
                                <FaCheck />
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div
                    style={
                      styles.noTextStyle
                    }
                  >
                    {t.noTextStyle ||
                      "No text style found"}
                  </div>
                )}
              </div>

              <LedEditor
                title={
                  t.screenLed
                }
                colorTitle={
                  t.ledColor
                }
                customTitle={
                  t.customColor
                }
                enabled={
                  screenLedEnabled
                }
                setEnabled={
                  setScreenLedEnabled
                }
                color={
                  screenLedColor
                }
                setColor={
  setScreenLedColor
}
thickness={
  screenLedThickness
}
setThickness={
  setScreenLedThickness
}
thicknessTitle={
  t.ledThickness || TEXTS.en.ledThickness
}
/>

              <LedEditor
                title={
                  t.cardLed
                }
                colorTitle={
                  t.ledColor
                }
                customTitle={
                  t.customColor
                }
                enabled={
                  cardLedEnabled
                }
                setEnabled={
                  setCardLedEnabled
                }
                color={
                  cardLedColor
                }
             setColor={
  setCardLedColor
}
thickness={
  cardLedThickness
}
setThickness={
  setCardLedThickness
}
thicknessTitle={
  t.ledThickness || "LED thickness"
}
              />

              <button
                type="button"
                disabled={
                  saving
                }
                style={{
                  ...styles.primaryButton,

                  opacity:
                    saving
                      ? 0.55
                      : 1,
                }}
                onClick={
                  saveDesign
                }
              >
                <FaCheck />

                {t.save}
              </button>
            </div>
          </ModalShell>
        )}

        {/* LANGUAGE */}

        {modal ===
          "language" && (
          <ModalShell
            title={
              t.chooseLanguage
            }
            icon={
              <FaLanguage />
            }
            onBack={
              backToSettings
            }
            onClose={() => {
              setLanguageSearch(
                ""
              );

              setModal(null);
            }}
            large
          >
            <div
              style={
                styles.languageContainer
              }
            >
              <div
                style={
                  styles.languageSearch
                }
              >
                <FaMagnifyingGlass />

                <input
                  value={
                    languageSearch
                  }
                  onChange={(
                    event
                  ) =>
                    setLanguageSearch(
                      event.target.value
                    )
                  }
                  placeholder={
                    t.searchLanguage
                  }
                  style={
                    styles.languageSearchInput
                  }
                />
              </div>

              <div
                style={
                  styles.languageList
                }
              >
                {filteredLanguages.length >
                0 ? (
                  filteredLanguages.map(
                    (item) => {
                      const active =
                        profile.language ===
                        item.code;

                      return (
                        <button
                          type="button"
                          key={
                            item.code
                          }
                          style={{
                            ...styles.languageButton,

                            ...(active
                              ? styles.languageButtonActive
                              : {}),
                          }}
                          onClick={() =>
                            changeLanguage(
                              item.code
                            )
                          }
                        >
                          <span
                            style={
                              styles.languageNames
                            }
                          >
                            <strong>
                              {
                                item.name
                              }
                            </strong>

                            {item.name !==
                              item.english && (
                              <small>
                                {
                                  item.english
                                }
                              </small>
                            )}
                          </span>

                          {active && (
                            <span
                              style={
                                styles.languageCheck
                              }
                            >
                              <FaCheck />
                            </span>
                          )}
                        </button>
                      );
                    }
                  )
                ) : (
                  <div
                    style={
                      styles.noLanguage
                    }
                  >
                    {
                      t.noLanguage
                    }
                  </div>
                )}
              </div>
            </div>
          </ModalShell>
        )}

        {/* DELETE */}

        {modal ===
          "delete" && (
          <ModalShell
            title={
              t.deleteTitle
            }
            icon={
              <FaTrash />
            }
            onBack={
              backToSettings
            }
            onClose={() =>
              setModal(null)
            }
          >
            <p
              style={
                styles.deleteWarning
              }
            >
              {
                t.deleteWarning
              }
            </p>

            <div
              style={
                styles.deleteActions
              }
            >
              <button
                type="button"
                style={
                  styles.secondaryButton
                }
                onClick={
                  backToSettings
                }
              >
                {t.no}
              </button>

              <button
                type="button"
                disabled={
                  deleteSeconds >
                    0 ||
                  deleting
                }
                style={{
                  ...styles.dangerButton,

                  opacity:
                    deleteSeconds >
                      0 ||
                    deleting
                      ? 0.45
                      : 1,
                }}
                onClick={
                  deleteProfile
                }
              >
                {deleteSeconds >
                0
                  ? `${t.yes} (${deleteSeconds})`
                  : t.yes}
              </button>
            </div>
          </ModalShell>
        )}

{/* PREMIUM PLANS */}

{modal === "premiumPlans" && (
  <ModalShell
    title="Premium"
    icon={<span>⭐</span>}
    onClose={() => setModal(null)}
  >
    <div style={{ display: "grid", gap: "14px" }}>
     <p style={{ textAlign: "center", fontWeight: 700 }}>
  {t.premiumDescription ||
    "Barcha Premium imkoniyatlardan foydalaning"}
</p>

      {[
  {
    days: 30,
    title: t.premiumMonthly || "30 kunlik Premium",
  },
  {
    days: 365,
    title: t.premiumYearly || "Yillik Premium",
  },
].map((plan) => {
  const planDisabled =
    isPremiumActive &&
    (
      Number(profile?.premium_plan_days) === 365 ||
      Number(profile?.premium_plan_days) === plan.days
    );

  return (
        <button
  key={plan.days}
  type="button"
  disabled={planDisabled}
  onClick={() => {
    if (planDisabled) return;
    setModal(`premium${plan.days}`);
  }}
          style={{
            padding: "18px",
            borderRadius: "16px",
            border: "1px solid #d1d5db",
            background: planDisabled
  ? "#374151"
  : "rgba(255,255,255,.8)",
color: planDisabled
  ? "#9ca3af"
  : "#111827",
cursor: planDisabled
  ? "not-allowed"
  : "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ marginTop: "8px", fontSize: "20px" }}>
  ⭐ 1 Star
</div>

{isPremiumActive &&
  Number(profile?.premium_plan_days) === plan.days &&
  profile?.premium_until && (
  <div
    style={{
      marginTop: "10px",
      fontSize: "13px",
      fontWeight: 600,
    }}
  >
    {({
  ar: "مفعّل · صالح حتى:",
  az: "Aktivləşdirilib · Etibarlılıq müddəti:",
  bn: "সক্রিয় করা হয়েছে · মেয়াদ:",
  bg: "Активиран · Срок на валидност:",
  zh: "已激活 · 有效期至：",
  cs: "Aktivováno · Platnost do:",
  da: "Aktiveret · Gyldig indtil:",
  nl: "Geactiveerd · Geldig tot:",
  en: "Activated · Valid until:",
  fi: "Aktivoitu · Voimassa asti:",
  fr: "Activé · Valable jusqu’au :",
  de: "Aktiviert · Gültig bis:",
  el: "Ενεργοποιημένο · Ισχύει έως:",
  he: "הופעל · בתוקף עד:",
  hi: "सक्रिय किया गया · वैधता अवधि:",
  hu: "Aktiválva · Érvényes eddig:",
  id: "Diaktifkan · Berlaku hingga:",
  it: "Attivato · Valido fino al:",
  ja: "有効化済み · 有効期限：",
  kk: "Белсендірілген · Жарамдылық мерзімі:",
  ko: "활성화됨 · 유효 기간:",
  ky: "Иштетилди · Жарактуулук мөөнөтү:",
  ms: "Diaktifkan · Sah sehingga:",
  no: "Aktivert · Gyldig til:",
  fa: "فعال شده · معتبر تا:",
  pl: "Aktywowano · Ważny do:",
  pt: "Ativado · Válido até:",
  ro: "Activat · Valabil până la:",
  ru: "Активировано · Срок действия до:",
  sr: "Активирано · Важи до:",
  sk: "Aktivované · Platné do:",
  es: "Activado · Válido hasta:",
  sv: "Aktiverad · Giltig till:",
  tg: "Фаъол карда шуд · Муҳлати амал:",
  th: "เปิดใช้งานแล้ว · ใช้ได้ถึง:",
  tr: "Etkinleştirildi · Geçerlilik süresi:",
  tk: "Işjeňleşdirildi · Möhleti:",
  uk: "Активовано · Термін дії до:",
  ur: "فعال کر دیا گیا · میعاد:",
  uz: "Faollashtirilgan · Amal qilish muddati:",
  vi: "Đã kích hoạt · Có hiệu lực đến:",
})[languageCode] || "Activated · Valid until:"}{" "}
   {new Intl.DateTimeFormat(
  undefined,
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
).format(new Date(profile.premium_until))}
  </div>
)}
        </button>
     );
})}
    </div>
  </ModalShell>
)}


{/* PREMIUM DETAILS */}

{(modal === "premium30" || modal === "premium365") && (
  <ModalShell
    title="Premium"
    icon={<span>⭐</span>}
    onBack={() => setModal("premiumPlans")}
    onClose={() => setModal(null)}
  >
    <div style={{ display: "grid", gap: "15px" }}>
      <h2 style={{ textAlign: "center", margin: 0 }}>
        {modal === "premium30"
          ? "30 kunlik Premium"
          : "Yillik Premium"}
      </h2>

      <div
        style={{
          textAlign: "center",
          fontSize: "26px",
          fontWeight: 800,
          color: "#111827",
        }}
      >
        ⭐ 1 Star
      </div>

      <p style={{ textAlign: "center", margin: 0 }}>
        {modal === "premium30"
          ? "30 kun davomida barcha Premium imkoniyatlar"
          : "365 kun davomida barcha Premium imkoniyatlar"}
      </p>

      {[
        "Cheksiz havolalar qo‘shish",
        "Premium yozuv uslublari",
        "Premium fon shablonlari",
        "Shaxsiy fon rasmini yuklash",
        "Karta cheti LED yoritishi",
        "Ekran cheti LED yoritishi",
        "LED ranglarini sozlash",
      ].map((feature) => (
        <div
          key={feature}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#111827",
            fontSize: "14px",
          }}
        >
          <span style={{ color: "#16a34a", fontSize: "20px" }}>
            ✓
          </span>
          <span>{feature}</span>
        </div>
      ))}

      <button
  type="button"
  disabled={
    isPremiumActive &&
    (
      Number(profile?.premium_plan_days) === 365 ||
      Number(profile?.premium_plan_days) ===
        (modal === "premium30" ? 30 : 365)
    )
  }
 style={{
  ...styles.primaryButton,
  background:
    isPremiumActive &&
    (
      Number(profile?.premium_plan_days) === 365 ||
      Number(profile?.premium_plan_days) ===
        (modal === "premium30" ? 30 : 365)
    )
      ? "#374151"
      : styles.primaryButton.background,
  opacity:
    isPremiumActive &&
    (
      Number(profile?.premium_plan_days) === 365 ||
      Number(profile?.premium_plan_days) ===
        (modal === "premium30" ? 30 : 365)
    )
      ? 0.65
      : 1,
  cursor:
    isPremiumActive &&
    (
      Number(profile?.premium_plan_days) === 365 ||
      Number(profile?.premium_plan_days) ===
        (modal === "premium30" ? 30 : 365)
    )
      ? "not-allowed"
      : "pointer",
}}
  onClick={async () => {
  try {
    const days = modal === "premium30" ? 30 : 365;

    if (
      isPremiumActive &&
      (
        Number(profile?.premium_plan_days) === 365 ||
        Number(profile?.premium_plan_days) === days
      )
    ) {
      showNotice("Bu tarif allaqachon ulangan.");
      return;
    }

    const tg = window.Telegram?.WebApp;

    if (!tg?.initData) {
      alert("Premium xaridi uchun Telegram Mini App orqali kiring.");
      return;
    }

    const response = await fetch(
      "/api/telegram/premium/invoice",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initData: tg.initData,
          cardId,
          days,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok || !result.invoiceUrl) {
      throw new Error(
        result.error || "To‘lov havolasi yaratilmadi."
      );
    }

    if (typeof tg.openInvoice !== "function") {
      throw new Error("Telegram to‘lov oynasi mavjud emas.");
    }

const previousPremiumUntil =
  new Date(profile?.premium_until || 0).getTime();
    
   tg.openInvoice(result.invoiceUrl, async (status) => {
  if (status !== "paid") return;

  setModal(null);

 for (let attempt = 0; attempt < 30; attempt++) {
    try {
      const data = await apiJson("get");

if (
  data.profile?.is_premium === true &&
  Number(data.profile?.premium_plan_days) === days &&
  new Date(data.profile?.premium_until).getTime() >
    Math.max(Date.now(), previousPremiumUntil)
) {
        setProfile(data.profile);
        setLinks(data.links || []);
        showNotice("Premium ulandi!");
        return;
      }
    } catch (error) {
      console.error("Premium tekshiruvi:", error);
    }

    await new Promise((resolve) =>
      window.setTimeout(resolve, 1000)
    );
  }

  showNotice(
    "To‘lov qabul qilindi. Premium holatini tekshirish uchun ilovani qayta oching."
  );
});
  } catch (error) {
    alert(error.message || "To‘lovda xatolik yuz berdi.");
  }
}}
      >
       {isPremiumActive &&
(
  Number(profile?.premium_plan_days) === 365 ||
  Number(profile?.premium_plan_days) ===
    (modal === "premium30" ? 30 : 365)
)
  ? "✓ Premium ulangan"
  : "⭐ 1 Star — Sotib olish"}
      </button>
    </div>
  </ModalShell>
)}

                    

        {/* QR */}

        {modal === "qr" && (
          <ModalShell
            title={
              t.qr
            }
            icon={
              <FaQrcode />
            }
            onClose={() =>
              setModal(null)
            }
          >
            <div
              style={
                styles.qrContent
              }
            >
              <div
                style={
                  styles.qrGlow
                }
              >
                <div
                  style={
                    styles.qrWhiteBox
                  }
                >
                  {qrImageUrl && (
                    <img
                      src={
                        qrImageUrl
                      }
                      alt="QR Code"
                      style={
                        styles.qrImage
                      }
                    />
                  )}
                </div>
              </div>

              <button
                type="button"
                style={
                  styles.primaryButton
                }
                onClick={() =>
                  showNotice(
                    t.qrEdit
                  )
                }
              >
                <FaPen />

                {t.qrEdit}
              </button>
            </div>
          </ModalShell>
        )}

        {notice && (
          <div
            style={
              styles.notice
            }
          >
            {notice}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   MODAL
========================================================= */

function ModalShell({
  title,
  icon,
  onBack,
  onClose,
  large = false,
  children,
}) {
  return (
    <div
      style={
        styles.modalLayer
      }
    >
      <button
        type="button"
        aria-label="Close"
        style={
          styles.modalBackdrop
        }
        onClick={
          onClose
        }
      />

      <div
        style={{
          ...styles.modalCard,

          ...(large
            ? styles.largeModalCard
            : {}),
        }}
      >
        <div
          style={
            styles.modalShine
          }
        />

        <div
          style={
            styles.modalHeader
          }
        >
          <div
            style={
              styles.modalLeft
            }
          >
            {onBack && (
              <button
                type="button"
                style={
                  styles.headerButton
                }
                onClick={
                  onBack
                }
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              style={
                styles.modalIcon
              }
            >
              {icon}
            </div>

            <h2
              style={
                styles.modalTitle
              }
            >
              {title}
            </h2>
          </div>

          <button
            type="button"
            style={
              styles.headerButton
            }
            onClick={
              onClose
            }
          >
            <FaXmark />
          </button>
        </div>

        <div
          style={
            styles.modalBody
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SETTINGS BUTTON
========================================================= */

function SettingsButton({
  icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      style={{
        ...styles.settingsButton,

        color:
          danger
            ? "#ff7b86"
            : "#ffffff",
      }}
      onClick={
        onClick
      }
    >
      <span
        style={{
          ...styles.settingsIcon,

          color:
            danger
              ? "#ff7b86"
              : "#ffffff",
        }}
      >
        {icon}
      </span>

      <span
        style={
          styles.settingsLabel
        }
      >
        {label}
      </span>

      <FaChevronLeft
        style={{
          transform:
            "rotate(180deg)",

          opacity:
            0.55,
        }}
      />
    </button>
  );
}

/* =========================================================
   LED EDITOR
========================================================= */

function LedEditor({
  title,
  colorTitle,
  customTitle,
  enabled,
  setEnabled,
  color,
  setColor,
  thickness,
  setThickness,
  thicknessTitle,
}) {
  return (
    <div
      style={
        styles.ledBox
      }
    >
      <div
        style={
          styles.ledHeader
        }
      >
        <strong>
          {title}
        </strong>

        <button
          type="button"
          aria-label={
            title
          }
          style={{
            ...styles.switch,

            background:
              enabled
                ? color
                : "rgba(255,255,255,.18)",

            boxShadow:
              enabled
                ? `0 0 16px ${color}`
                : "none",
          }}
          onClick={() =>
            setEnabled(
              (value) =>
                !value
            )
          }
        >
          <span
            style={{
              ...styles.switchDot,

              transform:
                enabled
                  ? "translateX(22px)"
                  : "translateX(0)",
            }}
          />
        </button>
      </div>

     {enabled && (
  <>
    <div style={{ marginTop: "16px", marginBottom: "16px" }}>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          fontWeight: 600,
        }}
      >
       <span>{thicknessTitle}</span>
        <span>{thickness}%</span>
      </label>

      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={thickness}
        onChange={(event) =>
          setThickness(Number(event.target.value))
        }
        style={{
          width: "100%",
          accentColor: color,
          cursor: "pointer",
        }}
      />
    </div>

    <div
      style={
        styles.colorLabel
      }
    >
      {colorTitle}
    </div>

          <div
            style={
              styles.colorGrid
            }
          >
            {LED_COLORS.map(
              (item) => (
                <button
                  type="button"
                  key={item}
                  aria-label={
                    item
                  }
                  style={{
                    ...styles.colorCircle,

                    background:
                      item,

                    boxShadow:
                      color ===
                      item
                        ? `0 0 0 3px rgba(255,255,255,.90),0 0 16px ${item}`
                        : "none",
                  }}
                  onClick={() =>
                    setColor(
                      item
                    )
                  }
                />
              )
            )}

            <label
              title={
                customTitle
              }
              style={{
                ...styles.customColorCircle,

                boxShadow:
                  !LED_COLORS.includes(
                    color
                  )
                    ? `0 0 0 3px rgba(255,255,255,.90),0 0 16px ${color}`
                    : "none",
              }}
            >
              <input
                type="color"
                value={
                  color
                }
                onChange={(
                  event
                ) =>
                  setColor(
                    event.target.value
                  )
                }
                style={
                  styles.hiddenColorInput
                }
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({
  icon,
  small = false,
}) {
  const size =
    small ? 17 : 25;

  switch (icon) {
    case "telegram":
      return (
        <SiTelegram
          size={size}
        />
      );

    case "whatsapp":
      return (
        <SiWhatsapp
          size={size}
        />
      );

    case "instagram":
      return (
        <SiInstagram
          size={size}
        />
      );

      case "threads":
  return (
    <FaThreads
      size={size}
    />
  );
      
    case "youtube":
      return (
        <SiYoutube
          size={size}
        />
      );

    case "tiktok":
      return (
        <SiTiktok
          size={size}
        />
      );

    case "facebook":
      return (
        <SiFacebook
          size={size}
        />
      );

    case "linkedin":
      return (
        <FaLinkedin
          size={size}
        />
      );

    case "x":
      return (
        <FaXTwitter
          size={size}
        />
      );

    case "vk":
      return (
        <FaVk
          size={size}
        />
      );

    case "ok":
      return (
        <FaOdnoklassniki
          size={size}
        />
      );

    case "phone":
      return (
        <FaPhone
          size={size}
        />
      );

    case "email":
      return (
        <FaEnvelope
          size={size}
        />
      );

    case "location":
      return (
        <FaLocationDot
          size={size}
        />
      );

    case "website":
      return (
        <FaGlobe
          size={size}
        />
      );

    default:
      return (
        <FaLink
          size={size}
        />
      );
  }
}

/* =========================================================
   ICON COLORS
========================================================= */

function getIconColor(
  icon
) {
  switch (icon) {
    case "telegram":
      return {
        color:
          "#229ED9",
      };

    case "whatsapp":
      return {
        color:
          "#25D366",
      };

    case "instagram":
      return {
        color:
          "#E1306C",
      };

      case "threads":
  return {
    color: "#000000",
  };
      
    case "youtube":
      return {
        color:
          "#FF0000",
      };

    case "tiktok":
      return {
        color:
          "#111111",
      };

    case "facebook":
      return {
        color:
          "#1877F2",
      };

    case "linkedin":
      return {
        color:
          "#0A66C2",
      };

    case "vk":
      return {
        color:
          "#0077FF",
      };

    case "ok":
      return {
        color:
          "#EE8208",
      };

    default:
      return {
        color:
          "#111827",
      };
  }
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  blankPage: {
    position:
      "fixed",

    inset: 0,

    background:
      "#dfe7ef",
  },

  page: {
    position:
      "fixed",

    inset: 0,

    width:
      "100%",

    height:
      "100dvh",

    overflow:
      "hidden",

    background:
      "#dfe7ef",

    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif',
  },

  backgroundBlur: {
    position:
      "absolute",

    inset:
      "-35px",

    backgroundPosition:
      "center",

    backgroundSize:
      "cover",

    filter:
      "blur(28px)",

    transform:
      "scale(1.08)",

    opacity:
      0.92,
  },

  backgroundShade: {
    position:
      "absolute",

    inset: 0,

    background:
      "rgba(17,24,39,.15)",
  },

  screenLed: {
    position:
      "fixed",

    zIndex: 30,

    inset: 0,

    pointerEvents:
      "none",

    borderRadius:
      "1px",
  },

  centerStrip: {
    position:
      "relative",

    zIndex: 2,

    width:
      "100%",

    maxWidth:
      "430px",

    height:
      "100dvh",

    margin:
      "0 auto",

    overflow:
      "hidden",

    backgroundPosition:
      "center",

    backgroundSize:
      "cover",

    boxShadow:
      "0 0 70px rgba(0,0,0,.20)",
  },

  centerShade: {
    position:
      "absolute",

    inset: 0,

    background:
      "linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.03) 40%,rgba(0,0,0,.14))",

    pointerEvents:
      "none",
  },

  topRight: {
    position:
      "absolute",

    zIndex: 50,

    top:
      "max(14px,env(safe-area-inset-top))",

    right:
      "14px",
  },

  menuButton: {
    width:
      "44px",

    height:
      "44px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    border:
      "1px solid rgba(255,255,255,.55)",

    borderRadius:
      "15px",

    background:
      "rgba(255,255,255,.52)",

    color:
      "#111827",

    backdropFilter:
      "blur(18px)",

    WebkitBackdropFilter:
      "blur(18px)",

    boxShadow:
      "0 8px 24px rgba(0,0,0,.12)",

    cursor:
      "pointer",

    fontSize:
      "18px",
  },

  menu: {
    position:
      "absolute",

    top:
      "52px",

    right: 0,

    width:
      "175px",

    overflow:
      "hidden",

    padding:
      "6px",

    border:
      "1px solid rgba(255,255,255,.45)",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.78)",

    backdropFilter:
      "blur(22px)",

    WebkitBackdropFilter:
      "blur(22px)",

    boxShadow:
      "0 16px 45px rgba(0,0,0,.18)",
  },

  menuItem: {
    width:
      "100%",

    minHeight:
      "45px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "10px",

    padding:
      "0 12px",

    border: 0,

    borderRadius:
      "13px",

    background:
      "transparent",

    color:
      "#111827",

    fontSize:
      "14px",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  cardWrap: {
    position:
      "absolute",

    zIndex: 10,

    left:
      "18px",

    right:
      "18px",

    top:
      "50%",

    transform:
      "translateY(-46%)",

    borderRadius:
      "32px",

    transition:
      "box-shadow .25s ease",
  },

  glassPanel: {
    position:
      "relative",

    width:
      "100%",

    minHeight:
      "330px",

    maxHeight:
      "calc(100dvh - 115px)",

    padding:
      "72px 22px 24px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.55)",

    borderRadius:
      "32px",

    background:
      "rgba(255,255,255,.48)",

    backdropFilter:
      "blur(25px) saturate(145%)",

    WebkitBackdropFilter:
      "blur(25px) saturate(145%)",

    boxShadow:
      "0 25px 70px rgba(0,0,0,.18)",

    textAlign:
      "center",

    overflow:
      "visible",
  },

  avatarOuter: {
    position:
      "absolute",

    zIndex: 5,

    top:
      "-51px",

    left:
      "50%",

    transform:
      "translateX(-50%)",

    width:
      "102px",

    height:
      "102px",

    padding:
      "4px",

    boxSizing:
      "border-box",

    borderRadius:
      "50%",

    background:
      "rgba(255,255,255,.68)",

    border:
      "1px solid rgba(255,255,255,.72)",

    backdropFilter:
      "blur(16px)",

    boxShadow:
      "0 12px 35px rgba(0,0,0,.18)",
  },

  avatarImage: {
    width:
      "100%",

    height:
      "100%",

    display:
      "block",

    objectFit:
      "cover",

    borderRadius:
      "50%",

    userSelect:
      "none",

    WebkitUserSelect:
      "none",

    WebkitTouchCallout:
      "none",
  },

  avatarPlaceholder: {
    width:
      "100%",

    height:
      "100%",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "50%",

    background:
      "rgba(229,231,235,.78)",

    fontSize:
      "41px",
  },

  name: {
    margin:
      "0 0 6px",

    color:
      "#111827",

    fontSize:
      "clamp(22px,7vw,28px)",

    lineHeight:
      1.15,

    overflow:
      "hidden",

    textOverflow:
      "ellipsis",

    whiteSpace:
      "nowrap",
  },

  bio: {
    margin:
      "0 auto 18px",

    maxWidth:
      "320px",

    color:
      "#475467",

    fontSize:
      "14px",

    lineHeight:
      1.4,

    display:
      "-webkit-box",

    WebkitLineClamp: 3,

    WebkitBoxOrient:
      "vertical",

    overflow:
      "hidden",
  },

  singleEmpty: {
    margin:
      "28px auto",

    padding:
      "12px 18px",

    border:
      "1px solid rgba(17,24,39,.08)",

    borderRadius:
      "15px",

    background:
      "rgba(255,255,255,.32)",

    color:
      "#667085",

    fontSize:
      "14px",

    cursor:
      "pointer",
  },

  linksGrid: {
    display:
      "flex",

    flexWrap:
      "wrap",

    justifyContent:
      "center",

    gap:
      "13px",

    marginTop:
      "14px",

    maxHeight:
      "230px",

    overflowY:
      "auto",

    overscrollBehavior:
      "contain",
  },

  linkButton: {
    width:
      "66px",

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    gap:
      "6px",

    padding: 0,

    border: 0,

    background:
      "transparent",

    color:
      "#111827",

    cursor:
      "pointer",
  },

  iconBox: {
    width:
      "54px",

    height:
      "54px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "17px",

    background:
      "rgba(255,255,255,.72)",

    border:
      "1px solid rgba(255,255,255,.65)",

    backdropFilter:
      "blur(14px)",

    boxShadow:
      "0 7px 22px rgba(0,0,0,.09)",
  },

  linkLabel: {
    width:
      "100%",

    overflow:
      "hidden",

    textOverflow:
      "ellipsis",

    whiteSpace:
      "nowrap",

    fontSize:
      "11px",

    fontWeight:
      700,
  },

  modalLayer: {
    position:
      "fixed",

    zIndex: 1000,

    inset: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    padding:
      "16px",

    boxSizing:
      "border-box",
  },

  modalBackdrop: {
    position:
      "absolute",

    inset: 0,

    width:
      "100%",

    height:
      "100%",

    padding: 0,

    border: 0,

    background:
      "rgba(4,10,20,.34)",

    backdropFilter:
      "blur(12px)",

    WebkitBackdropFilter:
      "blur(12px)",
  },

  modalCard: {
    position:
      "relative",

    zIndex: 2,

    width:
      "100%",

    maxWidth:
      "400px",

    maxHeight:
      "86dvh",

    display:
      "flex",

    flexDirection:
      "column",

    overflow:
      "hidden",

    padding:
      "16px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.28)",

    borderRadius:
      "28px",

    background:
      "linear-gradient(145deg,rgba(35,44,58,.72),rgba(17,24,39,.58))",

    color:
      "#ffffff",

    backdropFilter:
      "blur(32px) saturate(165%)",

    WebkitBackdropFilter:
      "blur(32px) saturate(165%)",

    boxShadow:
      "0 30px 100px rgba(0,0,0,.42)",
  },

  largeModalCard: {
    maxHeight:
      "92dvh",
  },

  modalShine: {
    position:
      "absolute",

    zIndex: -1,

    top:
      "-100px",

    right:
      "-80px",

    width:
      "230px",

    height:
      "230px",

    borderRadius:
      "50%",

    background:
      "rgba(255,255,255,.10)",

    filter:
      "blur(50px)",

    pointerEvents:
      "none",
  },

  modalHeader: {
    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    gap:
      "10px",

    marginBottom:
      "14px",
  },

  modalLeft: {
    minWidth: 0,

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "9px",
  },

  modalIcon: {
    width:
      "38px",

    height:
      "38px",

    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "12px",

    background:
      "rgba(255,255,255,.10)",

    border:
      "1px solid rgba(255,255,255,.10)",
  },

  modalTitle: {
    margin: 0,

    overflow:
      "hidden",

    textOverflow:
      "ellipsis",

    whiteSpace:
      "nowrap",

    fontSize:
      "19px",

    fontWeight:
      800,
  },

  headerButton: {
    width:
      "38px",

    height:
      "38px",

    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    border:
      "1px solid rgba(255,255,255,.09)",

    borderRadius:
      "12px",

    background:
      "rgba(255,255,255,.09)",

    color:
      "#ffffff",

    cursor:
      "pointer",
  },

  modalBody: {
    minHeight: 0,

    overflowY:
      "auto",

    overscrollBehavior:
      "contain",

    WebkitOverflowScrolling:
      "touch",

    padding:
      "2px",
  },

  settingsList: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "8px",
  },

  settingsButton: {
    width:
      "100%",

    minHeight:
      "58px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "12px",

    padding:
      "0 14px",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "17px",

    background:
      "rgba(255,255,255,.075)",

    fontSize:
      "15px",

    fontWeight:
      650,

    cursor:
      "pointer",

    backdropFilter:
      "blur(12px)",
  },

  settingsIcon: {
    width:
      "34px",

    height:
      "34px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "11px",

    background:
      "rgba(255,255,255,.09)",
  },

  settingsLabel: {
    flex: 1,

    textAlign:
      "left",
  },

  form: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "10px",
  },

  label: {
    marginTop:
      "3px",

    color:
      "rgba(255,255,255,.67)",

    fontSize:
      "13px",

    fontWeight:
      700,
  },

  input: {
    width:
      "100%",

    minHeight:
      "48px",

    padding:
      "0 13px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.13)",

    borderRadius:
      "14px",

    outline:
      "none",

    background:
      "rgba(255,255,255,.09)",

    color:
      "#ffffff",

    fontSize:
      "15px",

    fontFamily:
      "inherit",
  },

  textarea: {
    width:
      "100%",

    minHeight:
      "90px",

    padding:
      "12px 13px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.13)",

    borderRadius:
      "14px",

    outline:
      "none",

    resize:
      "vertical",

    background:
      "rgba(255,255,255,.09)",

    color:
      "#ffffff",

    fontSize:
      "15px",

    fontFamily:
      "inherit",
  },

  sectionTitle: {
    margin:
      "9px 2px 2px",

    fontSize:
      "15px",

    fontWeight:
      800,

    color:
      "#ffffff",
  },

  addButton: {
    width:
      "100%",

    minHeight:
      "46px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap:
      "8px",

    marginTop:
      "3px",

    border:
      "1px dashed rgba(255,255,255,.26)",

    borderRadius:
      "14px",

    background:
      "rgba(255,255,255,.07)",

    color:
      "#ffffff",

    fontSize:
      "14px",

    fontWeight:
      750,

    cursor:
      "pointer",
  },

  accordion: {
    overflow:
      "hidden",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "16px",

    background:
      "rgba(255,255,255,.065)",
  },

  accordionHeader: {
    width:
      "100%",

    minHeight:
      "56px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "10px",

    padding:
      "8px 12px",

    border: 0,

    background:
      "transparent",

    color:
      "#ffffff",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  accordionText: {
    flex: 1,

    textAlign:
      "left",
  },

  accordionBody: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "9px",

    padding:
      "4px 12px 13px",
  },

  smallIcon: {
    width:
      "36px",

    height:
      "36px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "11px",

    background:
      "rgba(255,255,255,.80)",
  },

  deleteLink: {
    alignSelf:
      "flex-end",

    width:
      "42px",

    height:
      "42px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    border:
      "1px solid rgba(248,113,113,.18)",

    borderRadius:
      "12px",

    background:
      "rgba(220,38,38,.18)",

    color:
      "#ff9299",

    cursor:
      "pointer",
  },

  primaryButton: {
    width:
      "100%",

    minHeight:
      "52px",

    marginTop:
      "8px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap:
      "9px",

    border:
      "1px solid rgba(255,255,255,.15)",

    borderRadius:
      "16px",

    background:
      "rgba(255,255,255,.92)",

    color:
      "#111827",

    fontSize:
      "15px",

    fontWeight:
      800,

    cursor:
      "pointer",

    boxShadow:
      "0 12px 30px rgba(0,0,0,.15)",
  },

  designSection: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "8px",

    padding:
      "13px",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.065)",
  },

  uploadButton: {
    width:
      "100%",

    minHeight:
      "48px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap:
      "9px",

    border:
      "1px solid rgba(255,255,255,.11)",

    borderRadius:
      "14px",

    background:
      "rgba(255,255,255,.08)",

    color:
      "#ffffff",

    fontSize:
      "14px",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  textStyleBox: {
    padding:
      "14px",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.065)",
  },

  textStyleHeader: {
    display:
      "flex",

    alignItems:
      "center",

    gap:
      "10px",

    marginBottom:
      "13px",
  },

  textStyleIcon: {
    width:
      "38px",

    height:
      "38px",

    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "12px",

    background:
      "rgba(255,255,255,.10)",
  },

  textStyleInfo: {
    marginTop:
      "3px",

    color:
      "rgba(255,255,255,.55)",

    fontSize:
      "11px",

    lineHeight:
      1.35,
  },

  textStyleSearch: {
    minHeight:
      "48px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "10px",

    marginBottom:
      "10px",

    padding:
      "0 13px",

    border:
      "1px solid rgba(255,255,255,.11)",

    borderRadius:
      "14px",

    background:
      "rgba(255,255,255,.08)",

    color:
      "rgba(255,255,255,.55)",
  },

  textStyleSearchInput: {
    width:
      "100%",

    height:
      "46px",

    padding: 0,

    border: 0,

    outline:
      "none",

    background:
      "transparent",

    color:
      "#ffffff",

    fontSize:
      "14px",

    fontFamily:
      "inherit",
  },

  textStyleGrid: {
    display:
      "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap:
      "8px",

    maxHeight:
      "320px",

    overflowY:
      "auto",

    overscrollBehavior:
      "contain",

    paddingRight:
      "2px",
  },

  noTextStyle: {
    padding:
      "24px 8px",

    textAlign:
      "center",

    color:
      "rgba(255,255,255,.55)",

    fontSize:
      "13px",
  },

  textStyleButton: {
    position:
      "relative",

    minHeight:
      "72px",

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap:
      "5px",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "14px",

    background:
      "rgba(255,255,255,.055)",

    color:
      "#ffffff",

    cursor:
      "pointer",
  },

  textStyleButtonActive: {
    border:
      "1px solid rgba(96,165,250,.75)",

    background:
      "rgba(59,130,246,.18)",

    boxShadow:
      "0 0 18px rgba(59,130,246,.14)",
  },

  textStyleCheck: {
    position:
      "absolute",

    top:
      "7px",

    right:
      "7px",

    width:
      "19px",

    height:
      "19px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "50%",

    background:
      "#3B82F6",

    color:
      "#ffffff",

    fontSize:
      "10px",
  },

  ledBox: {
    marginTop:
      "2px",

    padding:
      "14px",

    border:
      "1px solid rgba(255,255,255,.10)",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.065)",
  },

  ledHeader: {
    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    gap:
      "10px",
  },

  switch: {
    width:
      "48px",

    height:
      "26px",

    flexShrink: 0,

    padding:
      "3px",

    border: 0,

    borderRadius:
      "999px",

    cursor:
      "pointer",

    transition:
      "background .2s ease,box-shadow .2s ease",
  },

  switchDot: {
    width:
      "20px",

    height:
      "20px",

    display:
      "block",

    borderRadius:
      "50%",

    background:
      "#ffffff",

    boxShadow:
      "0 1px 5px rgba(0,0,0,.30)",

    transition:
      "transform .2s ease",
  },

  colorLabel: {
    marginTop:
      "14px",

    color:
      "rgba(255,255,255,.60)",

    fontSize:
      "12px",

    fontWeight:
      700,
  },

  colorGrid: {
    marginTop:
      "10px",

    display:
      "flex",

    flexWrap:
      "wrap",

    gap:
      "10px",
  },

  colorCircle: {
    width:
      "34px",

    height:
      "34px",

    padding: 0,

    border:
      "2px solid rgba(255,255,255,.65)",

    borderRadius:
      "50%",

    cursor:
      "pointer",
  },

  customColorCircle: {
    position:
      "relative",

    width:
      "34px",

    height:
      "34px",

    overflow:
      "hidden",

    borderRadius:
      "50%",

    background:
      "conic-gradient(red,yellow,lime,cyan,blue,magenta,red)",

    outline:
      "2px solid rgba(255,255,255,.18)",

    cursor:
      "pointer",
  },

  hiddenColorInput: {
    position:
      "absolute",

    inset: 0,

    width:
      "100%",

    height:
      "100%",

    opacity: 0,

    cursor:
      "pointer",
  },

  languageContainer: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "10px",
  },

  languageSearch: {
    minHeight:
      "50px",

    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "10px",

    padding:
      "0 14px",

    border:
      "1px solid rgba(255,255,255,.11)",

    borderRadius:
      "15px",

    background:
      "rgba(255,255,255,.08)",

    color:
      "rgba(255,255,255,.55)",
  },

  languageSearchInput: {
    width:
      "100%",

    height:
      "48px",

    padding: 0,

    border: 0,

    outline:
      "none",

    background:
      "transparent",

    color:
      "#ffffff",

    fontSize:
      "15px",

    fontFamily:
      "inherit",
  },

  languageList: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "7px",
  },

  languageButton: {
    width:
      "100%",

    minHeight:
      "57px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    gap:
      "10px",

    padding:
      "8px 13px",

    border:
      "1px solid rgba(255,255,255,.09)",

    borderRadius:
      "15px",

    background:
      "rgba(255,255,255,.055)",

    color:
      "#ffffff",

    cursor:
      "pointer",
  },

  languageButtonActive: {
    border:
      "1px solid rgba(96,165,250,.70)",

    background:
      "rgba(59,130,246,.17)",
  },

  languageNames: {
    minWidth: 0,

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "flex-start",

    gap:
      "2px",

    fontSize:
      "15px",
  },

  languageCheck: {
    width:
      "25px",

    height:
      "25px",

    flexShrink: 0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "50%",

    background:
      "#3B82F6",

    color:
      "#ffffff",

    fontSize:
      "12px",
  },

  noLanguage: {
    padding:
      "30px 10px",

    textAlign:
      "center",

    color:
      "rgba(255,255,255,.55)",

    fontSize:
      "14px",
  },

  deleteWarning: {
    margin:
      "5px 2px 18px",

    color:
      "rgba(255,255,255,.65)",

    fontSize:
      "15px",

    lineHeight:
      1.55,
  },

  deleteActions: {
    display:
      "grid",

    gridTemplateColumns:
      "1fr 1fr",

    gap:
      "10px",
  },

  secondaryButton: {
    minHeight:
      "50px",

    border:
      "1px solid rgba(255,255,255,.11)",

    borderRadius:
      "15px",

    background:
      "rgba(255,255,255,.08)",

    color:
      "#ffffff",

    fontWeight:
      800,

    cursor:
      "pointer",
  },

  dangerButton: {
    minHeight:
      "50px",

    border:
      "1px solid rgba(255,120,120,.18)",

    borderRadius:
      "15px",

    background:
      "rgba(220,38,38,.78)",

    color:
      "#ffffff",

    fontWeight:
      800,

    cursor:
      "pointer",
  },

  qrContent: {
    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    gap:
      "15px",
  },

  qrGlow: {
    padding:
      "8px",

    borderRadius:
      "29px",

    background:
      "rgba(255,255,255,.09)",

    boxShadow:
      "0 0 35px rgba(255,255,255,.10)",
  },

  qrWhiteBox: {
    width:
      "min(260px,68vw)",

    aspectRatio:
      "1 / 1",

    padding:
      "13px",

    boxSizing:
      "border-box",

    borderRadius:
      "22px",

    background:
      "#ffffff",

    boxShadow:
      "0 20px 50px rgba(0,0,0,.20)",
  },

  qrImage: {
    width:
      "100%",

    height:
      "100%",

    display:
      "block",

    objectFit:
      "contain",

    borderRadius:
      "9px",
  },

  notice: {
    position:
      "fixed",

    zIndex:
      3000,

    left:
      "50%",

    bottom:
      "max(24px,env(safe-area-inset-bottom))",

    transform:
      "translateX(-50%)",

    width:
      "max-content",

    maxWidth:
      "calc(100% - 36px)",

    padding:
      "13px 17px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.15)",

    borderRadius:
      "16px",

    background:
      "rgba(17,24,39,.78)",

    backdropFilter:
      "blur(20px)",

    WebkitBackdropFilter:
      "blur(20px)",

    color:
      "#ffffff",

    fontSize:
      "14px",

    fontWeight:
      600,

    textAlign:
      "center",

    boxShadow:
      "0 15px 45px rgba(0,0,0,.30)",
  },

  errorPage: {
    position:
      "fixed",

    inset: 0,

    minHeight:
      "100dvh",

    padding:
      "30px 18px",

    boxSizing:
      "border-box",

    background:
      "#dfe7ef",

    fontFamily:
      "Arial,sans-serif",
  },

  errorBox: {
    width:
      "100%",

    maxWidth:
      "420px",

    margin:
      "0 auto",

    padding:
      "18px",

    boxSizing:
      "border-box",

    borderRadius:
      "18px",

    background:
      "rgba(220,38,38,.10)",

    border:
      "1px solid rgba(220,38,38,.20)",

    color:
      "#991b1b",

    fontSize:
      "15px",

    lineHeight:
      1.5,
  },
};
