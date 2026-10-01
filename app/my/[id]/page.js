"use client";

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

/* =========================================================
   TEXT
========================================================= */

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
  },
  {
    id: "aptos",
    name: "Aptos",
    fontFamily:
      'Aptos,"Segoe UI",Arial,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "calibri",
    name: "Calibri",
    fontFamily:
      'Calibri,Carlito,Arial,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "arial",
    name: "Arial",
    fontFamily:
      "Arial,Helvetica,sans-serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "arial-black",
    name: "Arial Black",
    fontFamily:
      '"Arial Black",Arial,sans-serif',
    fontWeight: 900,
    letterSpacing: "-0.4px",
  },
  {
    id: "bahnschrift",
    name: "Bahnschrift",
    fontFamily:
      'Bahnschrift,"Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "book-antiqua",
    name: "Book Antiqua",
    fontFamily:
      '"Book Antiqua",Palatino,serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "bookman",
    name: "Bookman",
    fontFamily:
      '"Bookman Old Style",Bookman,serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "cambria",
    name: "Cambria",
    fontFamily:
      "Cambria,Georgia,serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "candara",
    name: "Candara",
    fontFamily:
      'Candara,"Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "century",
    name: "Century",
    fontFamily:
      'Century,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "century-gothic",
    name: "Century Gothic",
    fontFamily:
      '"Century Gothic",Futura,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "comic-sans",
    name: "Comic Sans MS",
    fontFamily:
      '"Comic Sans MS","Comic Sans",cursive',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "consolas",
    name: "Consolas",
    fontFamily:
      'Consolas,"Courier New",monospace',
    fontWeight: 700,
    letterSpacing: "-0.2px",
  },
  {
    id: "constantia",
    name: "Constantia",
    fontFamily:
      "Constantia,Georgia,serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "corbel",
    name: "Corbel",
    fontFamily:
      'Corbel,"Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "courier-new",
    name: "Courier New",
    fontFamily:
      '"Courier New",Courier,monospace',
    fontWeight: 700,
    letterSpacing: "-0.3px",
  },
  {
    id: "didot",
    name: "Didot",
    fontFamily:
      'Didot,"Bodoni MT","Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "franklin",
    name: "Franklin Gothic",
    fontFamily:
      '"Franklin Gothic Medium","Arial Narrow",Arial,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "garamond",
    name: "Garamond",
    fontFamily:
      'Garamond,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "georgia",
    name: "Georgia",
    fontFamily:
      'Georgia,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "gill-sans",
    name: "Gill Sans",
    fontFamily:
      '"Gill Sans","Gill Sans MT",Calibri,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "helvetica",
    name: "Helvetica",
    fontFamily:
      "Helvetica,Arial,sans-serif",
    fontWeight: 700,
    letterSpacing: "-0.2px",
  },
  {
    id: "impact",
    name: "Impact",
    fontFamily:
      'Impact,Haettenschweiler,"Arial Narrow Bold",sans-serif',
    fontWeight: 400,
    letterSpacing: "0.2px",
  },
  {
    id: "lucida-bright",
    name: "Lucida Bright",
    fontFamily:
      '"Lucida Bright",Georgia,serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "lucida-console",
    name: "Lucida Console",
    fontFamily:
      '"Lucida Console",Monaco,monospace',
    fontWeight: 700,
    letterSpacing: "-0.3px",
  },
  {
    id: "lucida-sans",
    name: "Lucida Sans",
    fontFamily:
      '"Lucida Sans Unicode","Lucida Grande",sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "palatino",
    name: "Palatino",
    fontFamily:
      'Palatino,"Palatino Linotype","Book Antiqua",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "perpetua",
    name: "Perpetua",
    fontFamily:
      "Perpetua,Baskerville,Georgia,serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "rockwell",
    name: "Rockwell",
    fontFamily:
      'Rockwell,"Courier New",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "segoe-ui",
    name: "Segoe UI",
    fontFamily:
      '"Segoe UI",Arial,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "segoe-print",
    name: "Segoe Print",
    fontFamily:
      '"Segoe Print","Bradley Hand",cursive',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "tahoma",
    name: "Tahoma",
    fontFamily:
      "Tahoma,Verdana,sans-serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "times-new-roman",
    name: "Times New Roman",
    fontFamily:
      '"Times New Roman",Times,serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "trebuchet",
    name: "Trebuchet MS",
    fontFamily:
      '"Trebuchet MS","Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0.2px",
  },
  {
    id: "verdana",
    name: "Verdana",
    fontFamily:
      "Verdana,Geneva,sans-serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "baskerville",
    name: "Baskerville",
    fontFamily:
      'Baskerville,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "bodoni",
    name: "Bodoni",
    fontFamily:
      '"Bodoni MT",Didot,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "copperplate",
    name: "Copperplate",
    fontFamily:
      'Copperplate,"Copperplate Gothic Light",fantasy',
    fontWeight: 700,
    letterSpacing: "0.4px",
  },
  {
    id: "futura",
    name: "Futura",
    fontFamily:
      'Futura,"Century Gothic",Arial,sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "optima",
    name: "Optima",
    fontFamily:
      'Optima,Candara,"Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "modern",
    name: "Modern",
    fontFamily:
      '"Trebuchet MS","Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  {
    id: "elegant",
    name: "Elegant",
    fontFamily:
      'Georgia,"Times New Roman",serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  {
    id: "strong",
    name: "Bold",
    fontFamily:
      'Arial,"Helvetica Neue",sans-serif',
    fontWeight: 900,
    letterSpacing: "-0.8px",
  },
  {
    id: "light",
    name: "Light",
    fontFamily:
      '"Segoe UI",Arial,sans-serif',
    fontWeight: 300,
    letterSpacing: "0.2px",
  },
  {
    id: "wide",
    name: "Wide",
    fontFamily:
      '"Century Gothic","Segoe UI",sans-serif',
    fontWeight: 700,
    letterSpacing: "1.6px",
  },
  {
    id: "compact",
    name: "Compact",
    fontFamily:
      '"Arial Narrow",Arial,sans-serif',
    fontWeight: 800,
    letterSpacing: "-0.8px",
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
  if (!cardUnlocked) {
  return;
}
  draggingRef.current = true;

  dragStartXRef.current =
    event.clientX;

  dragStartRotationRef.current =
    cardRotationRef.current;

  lastPointerXRef.current =
    event.clientX;

  lastPointerTimeRef.current =
    performance.now();

  velocityRef.current = 0;

  if (animationRef.current) {
    cancelAnimationFrame(
      animationRef.current
    );

    animationRef.current = null;
  }

  try {
    event.currentTarget.setPointerCapture(
      event.pointerId
    );
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
    textStyleSearch,
    setTextStyleSearch,
  ] = useState("");

  const languageCode =
    profile?.language || "en";

  const t =
    TEXTS[languageCode] ||
    TEXTS.en;

  const selectedTextStyle =
    TEXT_STYLES.find(
      (item) =>
        item.id ===
        previewTextStyle
    ) || TEXT_STYLES[0];

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

      setProfile(
        profileData
      );

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
        profileData
          ?.card_led_color ||
          "#3B82F6"
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

      setModal(null);

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

  async function uploadAvatar(
    event
  ) {
    const file =
      event.target
        .files?.[0];

    event.target.value =
      "";

    if (!file) {
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

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      showNotice(
        t.photoTooBig
      );

      return;
    }

    try {
      setUploadingPhoto(
        true
      );

      const data =
        await apiUpload(
          "uploadAvatar",
          file
        );

      setProfile(
        data.profile
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
      setUploadingPhoto(
        false
      );
    }
  }

  /* =========================================================
     UPLOAD BACKGROUND
  ========================================================= */

  async function uploadBackground(
    event
  ) {
    const file =
      event.target
        .files?.[0];

    event.target.value =
      "";

    if (!file) {
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

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      showNotice(
        t.backgroundTooBig
      );

      return;
    }

    try {
      setUploadingBackground(
        true
      );

      const data =
        await apiUpload(
          "uploadBackground",
          file
        );

      setProfile(
        data.profile
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
      setUploadingBackground(
        false
      );
    }
  }

  /* =========================================================
     SAVE DESIGN
  ========================================================= */

  async function saveDesign() {
    try {
      setSaving(true);

      const data =
        await apiJson(
          "saveDesign",
          {
            screenLedEnabled,
            screenLedColor,
            cardLedEnabled,
            cardLedColor,
          }
        );

      setProfile(
        data.profile
      );

      setModal(null);

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

      setProfile(
        data.profile
      );

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
      style={
        styles.page
      }
      onClick={() => {
        if (menuOpen) {
          setMenuOpen(
            false
          );
        }
      }}
    >
      {/* BLURRED FULL BACKGROUND */}

      <div
        style={{
          ...styles.backgroundBlur,

          backgroundImage:
            profile.background_url
              ? `url("${profile.background_url}")`
              : "none",
        }}
      />

      <div
        style={
          styles.backgroundShade
        }
      />

      {/* SCREEN LED */}

      {screenLedEnabled && (
        <div
          style={{
            ...styles.screenLed,

            boxShadow: `
              inset 0 0 18px ${screenLedColor},
              inset 0 0 35px ${screenLedColor},
              inset 0 0 58px ${screenLedColor}
            `,
          }}
        />
      )}

      {/* CENTER STRIP */}

      <section
        style={{
          ...styles.centerStrip,

          backgroundImage:
            profile.background_url
              ? `url("${profile.background_url}")`
              : "linear-gradient(145deg,#dfe7ef,#cbd5e1)",
        }}
      >
        <div
          style={
            styles.centerShade
          }
        />

        {/* TOP RIGHT */}

        <div
          style={
            styles.topRight
          }
          onClick={(
            event
          ) =>
            event.stopPropagation()
          }
        >
          <button
            type="button"
            aria-label="Menu"
            style={
              styles.menuButton
            }
            onClick={() =>
              setMenuOpen(
                (value) =>
                  !value
              )
            }
          >
            <FaEllipsisVertical />
          </button>

          {menuOpen && (
            <div
              style={
                styles.menu
              }
            >
              <button
                type="button"
                style={
                  styles.menuItem
                }
                onClick={
                  openSettings
                }
              >
                <FaGear />

                <span>
                  {t.settings}
                </span>
              </button>

              <button
                type="button"
                style={
                  styles.menuItem
                }
                onClick={
                  openQr
                }
              >
                <FaQrcode />

                <span>
                  {t.qr}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* CARD */}

        <div
          style={{
            ...styles.cardWrap,

            ...(cardLedEnabled
              ? {
                  boxShadow: `
                    0 0 10px ${cardLedColor},
                    0 0 24px ${cardLedColor},
                    0 0 45px ${cardLedColor}
                  `,
                }
              : {}),
          }}
        >
         <div
  style={{
    position: "relative",
    width: "100%",

    transform:
      `perspective(1200px) rotateY(${cardRotation}deg)`,

    transformStyle:
      "preserve-3d",

    touchAction:
      "pan-y",

    cursor:
      "grab",

    userSelect:
      "none",
  }}
  onPointerDown={
    handleCardPointerDown
  }
  onPointerMove={
    handleCardPointerMove
  }
  onPointerUp={
    handleCardPointerUp
  }
  onPointerCancel={
    handleCardPointerUp
  }
>
  {/* FRONT FACE */}

  <div
    style={{
      ...styles.glassPanel,

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
            {profile.photo_url ? (
  <div
    aria-label={
      profile.full_name ||
      "Profile"
    }
    style={{
      ...styles.avatarImage,
      backgroundImage: `url("${profile.photo_url}")`,
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

            {links.length >
              0 && (
              <div
                style={
                  styles.linksGrid
                }
              >
                {links.map(
                  (link) => (
                    <button
                      type="button"
                      key={
                        link.id
                      }
                      style={
                        styles.linkButton
                      }
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

              position: "absolute",
              inset: 0,

              padding: "22px",

              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",

              transform: "rotateY(180deg)",

              textAlign: "left",
              overflow: "hidden",

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
                  color: "#111827",
                }}
              >
                About me
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

        {/* CARD TUTORIAL / LOCK */}

{cardTutorialPlaying && (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      right: "-6px",
bottom: "54px",
      zIndex: 29,
      pointerEvents: "none",
    }}
  >
    <style>
      {`
        @keyframes nfcqrCardTutorialArrow {
         0% {
  transform: translateX(0);
  opacity: 0;
}

20% {
  opacity: 1;
}

70% {
  opacity: 1;
}

100% {
  transform: translateX(-82px);
  opacity: 0;
          }
        }
      `}
    </style>

   <svg
  width="62"
  height="62"
  viewBox="0 0 62 62"
  style={{
    animation:
      "nfcqrCardTutorialArrow .7s ease-in-out 2",

    filter:
      "drop-shadow(0 3px 3px rgba(0,0,0,.35))",
  }}
>
  <defs>
    <linearGradient
      id="tutorialArrowMetal"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop
        offset="0%"
        stopColor="#dcfce7" 
          />

      <stop
        offset="28%"
        stopColor="#22c55e" 
          />

      <stop
        offset="52%"
        stopColor="#86efac"
      />

      <stop
        offset="75%"
         stopColor="#15803d"
      />

      <stop
        offset="100%"
        stopColor="#4ade80"
      />
    </linearGradient>
  </defs>

  <path
    d="M51 45 C47 23 26 16 11 30"
    fill="none"
    stroke="url(#tutorialArrowMetal)"
    strokeWidth="5"
    strokeLinecap="round"
  />

  <path
    d="M11 30 L20 21"
    fill="none"
    stroke="url(#tutorialArrowMetal)"
    strokeWidth="5"
    strokeLinecap="round"
  />

  <path
    d="M11 30 L21 36"
    fill="none"
    stroke="url(#tutorialArrowMetal)"
    strokeWidth="5"
    strokeLinecap="round"
  />
</svg>
  </div>
)}
  
        <button
          type="button"
          onPointerDown={(event) =>
            event.stopPropagation()
          }
          onClick={
            cardTutorialSeen
              ? toggleCardLock
              : startCardTutorial
          }
          style={{
            position: "absolute",
           right: "12px",
bottom: "12px",

            zIndex: 30,

            width: "38px",
            height: "38px",

            border:
              "1px solid rgba(255,255,255,.65)",

            borderRadius: "50%",

            background:
              "rgba(255,255,255,.48)",

            backdropFilter:
              "blur(14px)",

            WebkitBackdropFilter:
              "blur(14px)",

            boxShadow:
              "0 6px 20px rgba(0,0,0,.16)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            padding: 0,

            fontSize: "18px",
            lineHeight: 1,

            cursor: "pointer",
          }}
        >
          {!cardTutorialSeen ? (
  <svg
    width="27"
    height="27"
    viewBox="0 0 64 64"
    style={{
      filter:
        "drop-shadow(0 3px 3px rgba(0,0,0,.35))",
    }}
  >
    <defs>
      <linearGradient
        id="mainArrowMetal"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="32%" stopColor="#8b95a1" />
        <stop offset="55%" stopColor="#f8fafc" />
        <stop offset="78%" stopColor="#5f6874" />
        <stop offset="100%" stopColor="#d9dee5" />
      </linearGradient>
    </defs>

    <path
      d="M7 24 H38 V13 L57 32 L38 51 V40 H7 Z"
      fill="url(#mainArrowMetal)"
      stroke="#4b5563"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
) : cardUnlocked ? (
  <svg
    width="27"
    height="27"
    viewBox="0 0 64 64"
    style={{
      filter:
        "drop-shadow(0 3px 3px rgba(0,0,0,.35))",
    }}
  >
    <defs>
      <linearGradient
        id="openLockMetal"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
        <stop offset="0%" stopColor="#dcfce7" />
<stop offset="30%" stopColor="#22c55e" />
<stop offset="55%" stopColor="#86efac" />
<stop offset="80%" stopColor="#15803d" />
<stop offset="100%" stopColor="#4ade80" />
      </linearGradient>
    </defs>

    <path
      d="M22 28 V20
         C22 10 29 6 37 7
         C44 8 48 13 48 20"
      fill="none"
      stroke="url(#openLockMetal)"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <rect
      x="14"
      y="27"
      width="36"
      height="28"
      rx="7"
      fill="url(#openLockMetal)"
      stroke="#4b5563"
      strokeWidth="2"
    />

    <circle
      cx="32"
      cy="40"
      r="4"
      fill="#374151"
    />

    <rect
      x="30"
      y="40"
      width="4"
      height="8"
      rx="2"
      fill="#374151"
    />
  </svg>
) : (
  <svg
    width="27"
    height="27"
    viewBox="0 0 64 64"
    style={{
      filter:
        "drop-shadow(0 3px 3px rgba(0,0,0,.35))",
    }}
  >
    <defs>
      <linearGradient
        id="closedLockMetal"
        x1="0"
        y1="0"
        x2="1"
        y2="1"
      >
      <stop offset="0%" stopColor="#fee2e2" />
<stop offset="30%" stopColor="#ef4444" />
<stop offset="55%" stopColor="#fca5a5" />
<stop offset="80%" stopColor="#b91c1c" />
<stop offset="100%" stopColor="#f87171" />
      </linearGradient>
    </defs>

    <path
      d="M20 28 V20
         C20 10 25 6 32 6
         C39 6 44 10 44 20
         V28"
      fill="none"
      stroke="url(#closedLockMetal)"
      strokeWidth="7"
      strokeLinecap="round"
    />

    <rect
      x="14"
      y="27"
      width="36"
      height="28"
      rx="7"
      fill="url(#closedLockMetal)"
      stroke="#4b5563"
      strokeWidth="2"
    />

    <circle
      cx="32"
      cy="40"
      r="4"
      fill="#374151"
    />

    <rect
      x="30"
      y="40"
      width="4"
      height="8"
      rx="2"
      fill="#374151"
    />
  </svg>
)}

        </button>

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
                onClick={() => {
                  setTextStyleSearch("");
                  setModal(
                    "design"
                  );
                }}
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
    title="About me"
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
        placeholder="About me"
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
                  onClick={() =>
                    avatarInputRef
                      .current
                      ?.click()
                  }
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
                  onClick={() =>
                    backgroundInputRef
                      .current
                      ?.click()
                  }
                >
                  <FaImage />

                  {
                    t.changeBackground
                  }
                </button>
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
                            onClick={() =>
                              setPreviewTextStyle(
                                item.id
                              )
                            }
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
                                item.name
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
