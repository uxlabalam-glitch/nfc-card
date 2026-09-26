"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

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

    chooseLanguage: "Tilni tanlang",

    deleteTitle: "Profil o‘chirilsinmi?",
    deleteWarning:
      "Barcha ma’lumotlaringiz o‘chiriladi va ularni qayta tiklab bo‘lmaydi.",
    no: "Yo‘q",
    yes: "Ha",

    empty: "Afsuski, hozircha bo‘sh",
    enterName: "Ism va familiyani kiriting.",
    onlyImage: "Faqat rasm yuklash mumkin.",
    photoTooBig:
      "Profil rasmi 5 MB dan oshmasligi kerak.",
    backgroundTooBig:
      "Orqa fon 10 MB dan oshmasligi kerak.",
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

    chooseLanguage: "Выберите язык",

    deleteTitle: "Удалить профиль?",
    deleteWarning:
      "Все ваши данные будут удалены без возможности восстановления.",
    no: "Нет",
    yes: "Да",

    empty: "К сожалению, пока пусто",
    enterName: "Введите имя и фамилию.",
    onlyImage:
      "Можно загружать только изображения.",
    photoTooBig:
      "Фото профиля не должно превышать 5 МБ.",
    backgroundTooBig:
      "Фон не должен превышать 10 МБ.",
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

    chooseLanguage: "Choose language",

    deleteTitle: "Delete profile?",
    deleteWarning:
      "All your data will be deleted and cannot be restored.",
    no: "No",
    yes: "Yes",

    empty: "Unfortunately, it is empty for now",
    enterName: "Enter your full name.",
    onlyImage:
      "Only images can be uploaded.",
    photoTooBig:
      "Profile photo must not exceed 5 MB.",
    backgroundTooBig:
      "Background must not exceed 10 MB.",
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

    chooseLanguage: "Dil seçin",

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
  },
};

/* =========================================================
   SERVICES
========================================================= */

const SERVICES = [
  {
    value: "telegram",
    label: "Telegram",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "tiktok",
    label: "TikTok",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
  },
  {
    value: "x",
    label: "X",
  },
  {
    value: "vk",
    label: "VK",
  },
  {
    value: "ok",
    label: "OK",
  },
  {
    value: "phone",
    label: "Telefon",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "website",
    label: "Website",
  },
  {
    value: "location",
    label: "Manzil",
  },
];

const LANGUAGES = [
  {
    code: "uz",
    name: "O‘zbekcha",
  },
  {
    code: "ru",
    name: "Русский",
  },
  {
    code: "en",
    name: "English",
  },
  {
    code: "tr",
    name: "Türkçe",
  },
];

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

  const [editLinks, setEditLinks] =
    useState([]);

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

  const [deleting, setDeleting] =
    useState(false);

  const [publicUrl, setPublicUrl] =
    useState("");

  const languageCode =
    profile?.language || "en";

  const t =
    TEXTS[languageCode] ||
    TEXTS.en;

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
     SECURE JSON API
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
     SECURE UPLOAD API
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
        profileData?.bio || ""
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

      if (
        typeof window !==
        "undefined"
      ) {
        setPublicUrl(
          `${window.location.origin}/c/${profileData.card_id}`
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "Something went wrong."
      );
    }
  }

  /* =========================================================
     NOTICE
  ========================================================= */

  function showNotice(
    message
  ) {
    setNotice(message);

    window.setTimeout(
      () => {
        setNotice("");
      },
      2200
    );
  }

  function showEmpty() {
    showNotice(t.empty);
  }

  /* =========================================================
     OPEN LINK
  ========================================================= */

  function openLink(link) {
    let url =
      String(
        link?.url || ""
      ).trim();

    if (!url) {
      showEmpty();
      return;
    }

    const icon =
      String(
        link?.icon || ""
      ).toLowerCase();

    if (
      icon === "phone"
    ) {
      if (
        !url.startsWith(
          "tel:"
        )
      ) {
        url = `tel:${url}`;
      }

      window.location.href =
        url;

      return;
    }

    if (
      icon === "email"
    ) {
      if (
        !url.startsWith(
          "mailto:"
        )
      ) {
        url =
          `mailto:${url}`;
      }

      window.location.href =
        url;

      return;
    }

    if (
      !url.startsWith(
        "http://"
      ) &&
      !url.startsWith(
        "https://"
      )
    ) {
      url =
        `https://${url}`;
    }

    window.location.href =
      url;
  }

  /* =========================================================
     SETTINGS
  ========================================================= */

  function openSettings() {
    setMenuOpen(false);

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
      profile?.bio || ""
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

  function backToSettings() {
    setOpenLinkIndex(
      null
    );

    setModal(
      "settings"
    );
  }

  /* =========================================================
     EDIT LINKS
  ========================================================= */

  function addLink() {
    const index =
      editLinks.length;

    setEditLinks(
      (current) => [
        ...current,

        {
          temp_id:
            `${Date.now()}-${Math.random()}`,

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
      index
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
          (link, i) =>
            i === index
              ? {
                  ...link,
                  [field]:
                    value,
                }
              : link
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
          (link, i) => {
            if (
              i !== index
            ) {
              return link;
            }

            return {
              ...link,

              icon:
                value,

              label:
                service?.label ||
                link.label ||
                "Link",
            };
          }
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
            (_, i) =>
              i !== index
          )
          .map(
            (item, i) => ({
              ...item,
              sort_order: i,
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
      !profile ||
      saving
    ) {
      return;
    }

    if (
      !fullName.trim()
    ) {
      alert(
        t.enterName
      );

      return;
    }

    setSaving(true);

    try {
      const cleanLinks =
        editLinks.map(
          (link, index) => ({
            label:
              link.label
                ?.trim() ||
              SERVICES.find(
                (item) =>
                  item.value ===
                  link.icon
              )?.label ||
              "Link",

            url:
              link.url
                ?.trim() ||
              "",

            icon:
              link.icon ||
              "website",

            sort_order:
              index,
          })
        );

      const data =
        await apiJson(
          "saveEdit",
          {
            fullName:
              fullName.trim(),

            bio:
              bio.trim(),

            links:
              cleanLinks,
          }
        );

      setProfile(
        data.profile
      );

      setLinks(
        data.links || []
      );

      setFullName(
        data.profile
          ?.full_name || ""
      );

      setBio(
        data.profile
          ?.bio || ""
      );

      setModal(null);

      showNotice(
        t.saved
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.message ||
          "Save error"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     AVATAR
  ========================================================= */

  async function uploadAvatar(
    event
  ) {
    const file =
      event.target
        .files?.[0];

    if (
      !file ||
      !profile ||
      uploadingPhoto
    ) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        t.onlyImage
      );

      event.target.value =
        "";

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        t.photoTooBig
      );

      event.target.value =
        "";

      return;
    }

    setUploadingPhoto(
      true
    );

    try {
      const data =
        await apiUpload(
          "uploadAvatar",
          file
        );

      setProfile(
        data.profile
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.message ||
          "Upload error"
      );
    } finally {
      setUploadingPhoto(
        false
      );

      event.target.value =
        "";
    }
  }

  /* =========================================================
     BACKGROUND
  ========================================================= */

  async function uploadBackground(
    event
  ) {
    const file =
      event.target
        .files?.[0];

    if (
      !file ||
      !profile ||
      uploadingBackground
    ) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        t.onlyImage
      );

      event.target.value =
        "";

      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        t.backgroundTooBig
      );

      event.target.value =
        "";

      return;
    }

    setUploadingBackground(
      true
    );

    try {
      const data =
        await apiUpload(
          "uploadBackground",
          file
        );

      setProfile(
        data.profile
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.message ||
          "Upload error"
      );
    } finally {
      setUploadingBackground(
        false
      );

      event.target.value =
        "";
    }
  }

  /* =========================================================
     DESIGN
  ========================================================= */

  async function saveDesign() {
    if (
      !profile ||
      saving
    ) {
      return;
    }

    setSaving(true);

    try {
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
      console.error(err);

      alert(
        err?.message ||
          "Save error"
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
    if (!profile) {
      return;
    }

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

      setModal(
        "settings"
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.message ||
          "Language error"
      );
    }
  }

  /* =========================================================
     DELETE COUNTDOWN
  ========================================================= */

  useEffect(() => {
    if (
      modal !==
      "delete"
    ) {
      setDeleteSeconds(
        10
      );

      return;
    }

    if (
      deleteSeconds <=
      0
    ) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          setDeleteSeconds(
            (current) =>
              current - 1
          );
        },
        1000
      );

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    modal,
    deleteSeconds,
  ]);

  async function deleteProfile() {
    if (
      !profile ||
      deleting ||
      deleteSeconds > 0
    ) {
      return;
    }

    setDeleting(true);

    try {
      await apiJson(
        "deleteProfile"
      );

      window.location.replace(
        "/"
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.message ||
          "Delete error"
      );

      setDeleting(
        false
      );
    }
  }

  /* =========================================================
     QR
  ========================================================= */

  const qrImageUrl =
    publicUrl
      ? `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=20&data=${encodeURIComponent(
          publicUrl
        )}`
      : "";

  /* =========================================================
     LED
  ========================================================= */

  const screenLedStyle =
    profile
      ?.screen_led_enabled
      ? {
          boxShadow: `
            0 0 7px ${profile.screen_led_color},
            0 0 16px ${profile.screen_led_color},
            0 0 28px ${profile.screen_led_color}
          `,
        }
      : {};

  const cardLedStyle =
    profile
      ?.card_led_enabled
      ? {
          boxShadow: `
            0 0 5px ${profile.card_led_color},
            0 0 13px ${profile.card_led_color},
            0 12px 40px rgba(0,0,0,.14)
          `,

          border:
            `1px solid ${profile.card_led_color}`,
        }
      : {};

  /* =========================================================
     INITIAL
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
        style={{
          minHeight:
            "100vh",

          background:
            "#dfe7ef",
        }}
      />
    );
  }

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main
      style={
        styles.page
      }
    >
      {profile.background_url && (
        <div
          style={{
            ...styles.outerBackground,

            backgroundImage:
              `url("${profile.background_url}")`,
          }}
        />
      )}

      <div
        style={
          styles.outerOverlay
        }
      />

      <section
        style={{
          ...styles.centerSection,
          ...screenLedStyle,
        }}
      >
        {profile.background_url && (
          <div
            style={{
              ...styles.centerBackground,

              backgroundImage:
                `url("${profile.background_url}")`,
            }}
          />
        )}

        <div
          style={
            styles.centerOverlay
          }
        />

        <div
          style={
            styles.topMenu
          }
        >
          <div
            style={
              styles.menuWrapper
            }
          >
            <button
              type="button"
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
              <>
                <button
                  type="button"
                  style={
                    styles.menuBackdrop
                  }
                  onClick={() =>
                    setMenuOpen(
                      false
                    )
                  }
                />

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

                  <div
                    style={
                      styles.menuDivider
                    }
                  />

                  <button
                    type="button"
                    style={
                      styles.menuItem
                    }
                    onClick={() => {
                      setMenuOpen(
                        false
                      );

                      setModal(
                        "qr"
                      );
                    }}
                  >
                    <FaQrcode />

                    <span>
                      {t.qr}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div
          style={{
            ...styles.content,

            filter:
              modal &&
              modal !== "qr"
                ? "blur(7px)"
                : "none",
          }}
        >
          <div
            style={{
              ...styles.glassPanel,
              ...cardLedStyle,
            }}
          >
            <div
              style={
                styles.avatarOuter
              }
            >
              {profile.photo_url ? (
                <img
                  src={
                    profile.photo_url
                  }
                  alt={
                    profile.full_name ||
                    "Profile"
                  }
                  style={
                    styles.avatarImage
                  }
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

            {profile.full_name?.trim() ? (
              <h1
                style={
                  styles.name
                }
              >
                {
                  profile.full_name
                }
              </h1>
            ) : (
              <button
                type="button"
                style={
                  styles.emptyText
                }
                onClick={
                  showEmpty
                }
              >
                {t.empty}
              </button>
            )}

            {profile.bio?.trim() ? (
              <p
                style={
                  styles.bio
                }
              >
                {profile.bio}
              </p>
            ) : (
              <button
                type="button"
                style={
                  styles.emptyText
                }
                onClick={
                  showEmpty
                }
              >
                {t.empty}
              </button>
            )}

            <div
              style={
                styles.linksGrid
              }
            >
              {links.length ? (
                links.map(
                  (link) => (
                    <button
                      key={
                        link.id
                      }
                      type="button"
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
                        {link.label ||
                          SERVICES.find(
                            (
                              item
                            ) =>
                              item.value ===
                              link.icon
                          )
                            ?.label ||
                          ""}
                      </span>
                    </button>
                  )
                )
              ) : (
                <button
                  type="button"
                  style={
                    styles.emptyText
                  }
                  onClick={
                    showEmpty
                  }
                >
                  {t.empty}
                </button>
              )}
            </div>
          </div>
        </div>

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
                onClick={() =>
                  setModal(
                    "design"
                  )
                }
              />

              <SettingsButton
                icon={
                  <FaLanguage />
                }
                label={
                  t.language
                }
                onClick={() =>
                  setModal(
                    "language"
                  )
                }
              />

              <SettingsButton
                danger
                icon={
                  <FaTrash />
                }
                label={
                  t.deleteProfile
                }
                onClick={() =>
                  setModal(
                    "delete"
                  )
                }
              />
            </div>
          </ModalShell>
        )}

        {modal === "edit" && (
          <ModalShell
            title={t.edit}
            icon={<FaPen />}
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
                    event.target
                      .value
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
                    event.target
                      .value
                  )
                }
                style={
                  styles.textarea
                }
              />

              <div
                style={
                  styles.sectionHeader
                }
              >
                <strong>
                  {t.links}
                </strong>

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

                  {
                    t.addLink
                  }
                </button>
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
                      (
                        item
                      ) =>
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
                          style={{
                            flex: 1,
                            textAlign:
                              "left",
                          }}
                        >
                          {
                            service.label
                          }
                        </span>

                        <FaChevronDown />
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
                                event
                                  .target
                                  .value
                              )
                            }
                            style={
                              styles.input
                            }
                          >
                            {SERVICES.map(
                              (
                                item
                              ) => (
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
                                event
                                  .target
                                  .value
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
                            onChange={(
                              event
                            ) =>
                              updateEditLink(
                                index,
                                "url",
                                event
                                  .target
                                  .value
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

              <strong>
                {t.background}
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
            onClose={() =>
              setModal(null)
            }
          >
            <div
              style={
                styles.languageList
              }
            >
              {LANGUAGES.map(
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

                        borderColor:
                          active
                            ? "#2563EB"
                            : "#E5E7EB",
                      }}
                      onClick={() =>
                        changeLanguage(
                          item.code
                        )
                      }
                    >
                      <span>
                        {
                          item.name
                        }
                      </span>

                      {active && (
                        <FaCheck
                          style={{
                            color:
                              "#2563EB",
                          }}
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </ModalShell>
        )}

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

        {modal === "qr" && (
          <ModalShell
            title={t.qr}
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
      <div
        style={
          styles.modalBackdrop
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
            ? "#DC2626"
            : "#111827",
      }}
      onClick={
        onClick
      }
    >
      <span
        style={
          styles.settingsIcon
        }
      >
        {icon}
      </span>

      <span
        style={{
          flex: 1,
          textAlign: "left",
        }}
      >
        {label}
      </span>

      <FaChevronLeft
        style={{
          transform:
            "rotate(180deg)",

          opacity:
            0.4,
        }}
      />
    </button>
  );
}

/* =========================================================
   LED
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
                ? "#2563EB"
                : "#CBD5E1",
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

                    outline:
                      color.toUpperCase() ===
                      item.toUpperCase()
                        ? "3px solid #2563EB"
                        : "2px solid rgba(0,0,0,.08)",
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
              style={
                styles.customColorCircle
              }
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
                    event.target
                      .value
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
    small ? 20 : 29;

  const name =
    String(
      icon || ""
    ).toLowerCase();

  switch (name) {
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
          size={
            small
              ? 18
              : 25
          }
        />
      );

    case "email":
      return (
        <FaEnvelope
          size={
            small
              ? 19
              : 26
          }
        />
      );

    case "website":
      return (
        <FaGlobe
          size={
            small
              ? 19
              : 27
          }
        />
      );

    case "location":
      return (
        <FaLocationDot
          size={
            small
              ? 19
              : 27
          }
        />
      );

    default:
      return (
        <FaLink
          size={
            small
              ? 19
              : 26
          }
        />
      );
  }
}

function getIconColor(icon) {
  switch (
    String(
      icon || ""
    ).toLowerCase()
  ) {
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
          "#E4405F",
      };

    case "youtube":
      return {
        color:
          "#FF0000",
      };

    case "tiktok":
      return {
        color:
          "#000000",
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

    case "x":
      return {
        color:
          "#000000",
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

    case "phone":
      return {
        color:
          "#16A34A",
      };

    case "email":
      return {
        color:
          "#EA4335",
      };

    case "website":
      return {
        color:
          "#2563EB",
      };

    case "location":
      return {
        color:
          "#EF4444",
      };

    default:
      return {
        color:
          "#475467",
      };
  }
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    minHeight:
      "100vh",

    position:
      "relative",

    display:
      "flex",

    justifyContent:
      "center",

    overflowX:
      "hidden",

    background:
      "#dfe7ef",

    fontFamily:
      "Arial, sans-serif",
  },

  outerBackground: {
    position:
      "fixed",

    inset:
      "-25px",

    backgroundSize:
      "cover",

    backgroundPosition:
      "center",

    filter:
      "blur(14px)",

    transform:
      "scale(1.1)",

    opacity:
      0.78,
  },

  outerOverlay: {
    position:
      "fixed",

    inset:
      0,

    background:
      "rgba(255,255,255,.08)",
  },

  centerSection: {
    position:
      "relative",

    zIndex:
      1,

    width:
      "100%",

    maxWidth:
      "430px",

    minHeight:
      "100vh",

    overflow:
      "hidden",

    background:
      "#eef3f7",

    transition:
      "box-shadow .25s ease",
  },

  centerBackground: {
    position:
      "absolute",

    inset:
      0,

    zIndex:
      0,

    backgroundSize:
      "cover",

    backgroundPosition:
      "center",
  },

  centerOverlay: {
    position:
      "absolute",

    inset:
      0,

    zIndex:
      1,

    background:
      "linear-gradient(to bottom,rgba(255,255,255,.02),rgba(220,240,250,.18))",
  },

  topMenu: {
    position:
      "absolute",

    zIndex:
      50,

    top:
      0,

    left:
      0,

    right:
      0,

    display:
      "flex",

    justifyContent:
      "flex-end",

    padding:
      "max(16px,env(safe-area-inset-top)) 16px 0",

    boxSizing:
      "border-box",
  },

  menuWrapper: {
    position:
      "relative",

    zIndex:
      60,
  },

  menuButton: {
    width:
      "46px",

    height:
      "46px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    border:
      "1px solid rgba(255,255,255,.7)",

    borderRadius:
      "16px",

    background:
      "rgba(255,255,255,.68)",

    color:
      "#111827",

    cursor:
      "pointer",

    backdropFilter:
      "blur(20px)",
  },

  menuBackdrop: {
    position:
      "fixed",

    inset:
      0,

    zIndex:
      55,

    border:
      0,

    background:
      "transparent",
  },

  menu: {
    position:
      "absolute",

    zIndex:
      70,

    top:
      "54px",

    right:
      0,

    width:
      "190px",

    padding:
      "7px",

    border:
      "1px solid rgba(255,255,255,.8)",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.94)",

    boxShadow:
      "0 18px 50px rgba(0,0,0,.2)",
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
      "0 11px",

    border:
      0,

    borderRadius:
      "12px",

    background:
      "transparent",

    color:
      "#111827",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  menuDivider: {
    height:
      "1px",

    margin:
      "4px 7px",

    background:
      "rgba(17,24,39,.08)",
  },

  content: {
    position:
      "relative",

    zIndex:
      3,

    minHeight:
      "100vh",

    display:
      "flex",

    alignItems:
      "center",

    padding:
      "90px 18px 40px",

    boxSizing:
      "border-box",

    transition:
      "filter .2s ease",
  },

  glassPanel: {
    position:
      "relative",

    width:
      "100%",

    minHeight:
      "390px",

    padding:
      "78px 22px 28px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.7)",

    borderRadius:
      "34px",

    background:
      "rgba(255,255,255,.58)",

    boxShadow:
      "0 25px 65px rgba(0,0,0,.16)",

    backdropFilter:
      "blur(25px)",

    WebkitBackdropFilter:
      "blur(25px)",

    textAlign:
      "center",
  },

  avatarOuter: {
    position:
      "absolute",

    top:
      "-58px",

    left:
      "50%",

    transform:
      "translateX(-50%)",

    width:
      "116px",

    height:
      "116px",

    padding:
      "5px",

    boxSizing:
      "border-box",

    borderRadius:
      "50%",

    background:
      "rgba(255,255,255,.9)",

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
      "#E5E7EB",

    fontSize:
      "45px",
  },

  name: {
    margin:
      "0 0 7px",

    color:
      "#111827",

    fontSize:
      "28px",

    fontWeight:
      800,
  },

  bio: {
    margin:
      "0 auto 24px",

    maxWidth:
      "330px",

    color:
      "#475467",

    fontSize:
      "15px",

    lineHeight:
      1.5,
  },

  emptyText: {
    border:
      0,

    background:
      "transparent",

    color:
      "#667085",

    fontSize:
      "14px",

    cursor:
      "pointer",

    margin:
      "5px",
  },

  linksGrid: {
    display:
      "flex",

    flexWrap:
      "wrap",

    justifyContent:
      "center",

    gap:
      "15px",

    marginTop:
      "20px",
  },

  linkButton: {
    width:
      "72px",

    display:
      "flex",

    flexDirection:
      "column",

    alignItems:
      "center",

    gap:
      "7px",

    padding:
      0,

    border:
      0,

    background:
      "transparent",

    color:
      "#111827",

    cursor:
      "pointer",
  },

  iconBox: {
    width:
      "58px",

    height:
      "58px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "18px",

    background:
      "rgba(255,255,255,.88)",

    boxShadow:
      "0 8px 24px rgba(0,0,0,.09)",
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
      "12px",

    fontWeight:
      700,
  },

  modalLayer: {
    position:
      "fixed",

    zIndex:
      1000,

    inset:
      0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    padding:
      "18px",

    boxSizing:
      "border-box",
  },

  modalBackdrop: {
    position:
      "absolute",

    inset:
      0,

    background:
      "rgba(15,23,42,.38)",

    backdropFilter:
      "blur(8px)",
  },

  modalCard: {
    position:
      "relative",

    zIndex:
      2,

    width:
      "100%",

    maxWidth:
      "400px",

    maxHeight:
      "88dvh",

    display:
      "flex",

    flexDirection:
      "column",

    padding:
      "17px",

    boxSizing:
      "border-box",

    border:
      "1px solid rgba(255,255,255,.82)",

    borderRadius:
      "28px",

    background:
      "rgba(255,255,255,.96)",

    color:
      "#111827",

    boxShadow:
      "0 30px 90px rgba(0,0,0,.3)",
  },

  largeModalCard: {
    maxHeight:
      "92dvh",
  },

  modalHeader: {
    flexShrink:
      0,

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    gap:
      "10px",

    marginBottom:
      "15px",
  },

  modalLeft: {
    minWidth:
      0,

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

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius:
      "12px",

    background:
      "rgba(17,24,39,.06)",
  },

  modalTitle: {
    margin:
      0,

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

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    border:
      0,

    borderRadius:
      "12px",

    background:
      "rgba(17,24,39,.06)",

    color:
      "#111827",

    cursor:
      "pointer",
  },

  modalBody: {
    minHeight:
      0,

    overflowY:
      "auto",

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
      "1px solid rgba(17,24,39,.07)",

    borderRadius:
      "17px",

    background:
      "rgba(17,24,39,.025)",

    fontSize:
      "15px",

    fontWeight:
      650,

    cursor:
      "pointer",
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
      "rgba(17,24,39,.055)",
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
      "#475467",

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
      "1px solid #D0D5DD",

    borderRadius:
      "14px",

    outline:
      "none",

    background:
      "#fff",

    color:
      "#111827",

    fontSize:
      "15px",
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
      "1px solid #D0D5DD",

    borderRadius:
      "14px",

    outline:
      "none",

    resize:
      "vertical",

    background:
      "#fff",

    color:
      "#111827",

    fontSize:
      "15px",
  },

  sectionHeader: {
    marginTop:
      "8px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    gap:
      "10px",
  },

  addButton: {
    minHeight:
      "38px",

    display:
      "flex",

    alignItems:
      "center",

    gap:
      "7px",

    padding:
      "0 11px",

    border:
      0,

    borderRadius:
      "12px",

    background:
      "#111827",

    color:
      "#fff",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  accordion: {
    overflow:
      "hidden",

    border:
      "1px solid rgba(17,24,39,.08)",

    borderRadius:
      "16px",

    background:
      "#fff",
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

    border:
      0,

    background:
      "#fff",

    color:
      "#111827",

    fontWeight:
      700,

    cursor:
      "pointer",
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
      "#F8FAFC",
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
      0,

    borderRadius:
      "12px",

    background:
      "#FEE2E2",

    color:
      "#DC2626",

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
      0,

    borderRadius:
      "16px",

    background:
      "#111827",

    color:
      "#fff",

    fontSize:
      "15px",

    fontWeight:
      800,

    cursor:
      "pointer",
  },

  uploadButton: {
    width:
      "100%",

    minHeight:
      "50px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    gap:
      "9px",

    border:
      "1px solid rgba(17,24,39,.1)",

    borderRadius:
      "15px",

    background:
      "#fff",

    color:
      "#111827",

    fontSize:
      "14px",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  ledBox: {
    marginTop:
      "7px",

    padding:
      "14px",

    border:
      "1px solid rgba(17,24,39,.08)",

    borderRadius:
      "18px",

    background:
      "#fff",
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

    padding:
      "3px",

    border:
      0,

    borderRadius:
      "999px",

    cursor:
      "pointer",
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
      "#fff",

    boxShadow:
      "0 1px 4px rgba(0,0,0,.25)",

    transition:
      "transform .2s ease",
  },

  colorLabel: {
    marginTop:
      "14px",

    color:
      "#667085",

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

    padding:
      0,

    border:
      "2px solid #fff",

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
      "2px solid rgba(0,0,0,.08)",

    cursor:
      "pointer",
  },

  hiddenColorInput: {
    position:
      "absolute",

    inset:
      0,

    width:
      "100%",

    height:
      "100%",

    opacity:
      0,

    cursor:
      "pointer",
  },

  languageList: {
    display:
      "flex",

    flexDirection:
      "column",

    gap:
      "8px",
  },

  languageButton: {
    width:
      "100%",

    minHeight:
      "54px",

    display:
      "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    padding:
      "0 14px",

    border:
      "1px solid",

    borderRadius:
      "15px",

    background:
      "#fff",

    color:
      "#111827",

    fontSize:
      "15px",

    fontWeight:
      700,

    cursor:
      "pointer",
  },

  deleteWarning: {
    margin:
      "5px 2px 18px",

    color:
      "#667085",

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
      "1px solid rgba(17,24,39,.1)",

    borderRadius:
      "15px",

    background:
      "#fff",

    color:
      "#111827",

    fontWeight:
      800,

    cursor:
      "pointer",
  },

  dangerButton: {
    minHeight:
      "50px",

    border:
      0,

    borderRadius:
      "15px",

    background:
      "#DC2626",

    color:
      "#fff",

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

  qrWhiteBox: {
    width:
      "min(270px,72vw)",

    aspectRatio:
      "1 / 1",

    padding:
      "14px",

    boxSizing:
      "border-box",

    borderRadius:
      "25px",

    background:
      "#fff",

    boxShadow:
      "0 20px 50px rgba(0,0,0,.16)",
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
      "10px",
  },

  notice: {
    position:
      "fixed",

    zIndex:
      3000,

    left:
      "50%",

    bottom:
      "max(25px,env(safe-area-inset-bottom))",

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

    borderRadius:
      "16px",

    background:
      "rgba(17,24,39,.92)",

    color:
      "#fff",

    fontSize:
      "14px",

    fontWeight:
      600,

    textAlign:
      "center",

    boxShadow:
      "0 15px 45px rgba(0,0,0,.3)",
  },

  errorPage: {
    minHeight:
      "100vh",

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
      "rgba(220,38,38,.1)",

    border:
      "1px solid rgba(220,38,38,.2)",

    color:
      "#991b1b",

    fontSize:
      "15px",

    lineHeight:
      1.5,
  },
};
