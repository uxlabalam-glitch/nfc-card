"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  FaEllipsisVertical,
  FaPen,
  FaGear,
  FaQrcode,
  FaGlobe,
  FaTrash,
  FaXmark,
  FaCheck,
  FaPalette,
} from "react-icons/fa6";

const supabase = createClient(
  "https://yzkeabplmbxkvyschlop.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const LANGUAGES = [
  { code: "ar", name: "العربية", english: "Arabic" },
  { code: "az", name: "Azərbaycanca", english: "Azerbaijani" },
  { code: "bn", name: "বাংলা", english: "Bengali" },
  { code: "bg", name: "Български", english: "Bulgarian" },
  { code: "zh", name: "中文", english: "Chinese" },
  { code: "cs", name: "Čeština", english: "Czech" },
  { code: "da", name: "Dansk", english: "Danish" },
  { code: "nl", name: "Nederlands", english: "Dutch" },
  { code: "en", name: "English", english: "English" },
  { code: "fi", name: "Suomi", english: "Finnish" },
  { code: "fr", name: "Français", english: "French" },
  { code: "de", name: "Deutsch", english: "German" },
  { code: "el", name: "Ελληνικά", english: "Greek" },
  { code: "he", name: "עברית", english: "Hebrew" },
  { code: "hi", name: "हिन्दी", english: "Hindi" },
  { code: "hu", name: "Magyar", english: "Hungarian" },
  { code: "id", name: "Bahasa Indonesia", english: "Indonesian" },
  { code: "it", name: "Italiano", english: "Italian" },
  { code: "ja", name: "日本語", english: "Japanese" },
  { code: "kk", name: "Қазақша", english: "Kazakh" },
  { code: "ko", name: "한국어", english: "Korean" },
  { code: "ky", name: "Кыргызча", english: "Kyrgyz" },
  { code: "ms", name: "Bahasa Melayu", english: "Malay" },
  { code: "no", name: "Norsk", english: "Norwegian" },
  { code: "fa", name: "فارسی", english: "Persian" },
  { code: "pl", name: "Polski", english: "Polish" },
  { code: "pt", name: "Português", english: "Portuguese" },
  { code: "ro", name: "Română", english: "Romanian" },
  { code: "ru", name: "Русский", english: "Russian" },
  { code: "sr", name: "Српски", english: "Serbian" },
  { code: "sk", name: "Slovenčina", english: "Slovak" },
  { code: "es", name: "Español", english: "Spanish" },
  { code: "sv", name: "Svenska", english: "Swedish" },
  { code: "tg", name: "Тоҷикӣ", english: "Tajik" },
  { code: "th", name: "ไทย", english: "Thai" },
  { code: "tr", name: "Türkçe", english: "Turkish" },
  { code: "tk", name: "Türkmençe", english: "Turkmen" },
  { code: "uk", name: "Українська", english: "Ukrainian" },
  { code: "ur", name: "اردو", english: "Urdu" },
  { code: "uz", name: "O‘zbekcha", english: "Uzbek" },
  { code: "vi", name: "Tiếng Việt", english: "Vietnamese" },
].sort((a, b) => a.english.localeCompare(b.english));

const TEXTS = {
  uz: {
    title: "Mening NFC vizitkam",
    edit: "Tahrirlash",
    settings: "Sozlamalar",
    qr: "QR kod",
    language: "Til",
    theme: "Asosiy fon",
    delete: "Profilni o‘chirish",
    chooseLanguage: "Tilni tanlang",
    searchLanguage: "Tilni qidirish...",
    deleteTitle: "Profil o‘chirilsinmi?",
    deleteWarning:
      "Barcha ma’lumotlaringiz o‘chiriladi va ularni qayta tiklab bo‘lmaydi.",
    no: "Yo‘q",
    yes: "Ha",
    emptyName: "Ism Familiya",
    emptyBio: "Qisqa ma’lumot",
    close: "Yopish",
    qrText: "Mening NFC vizitkam",
    light: "Yorug‘",
    dark: "Qorong‘i",
    blue: "Ko‘k",
    green: "Yashil",
    deleteError: "Profilni o‘chirishda xatolik yuz berdi.",
    languageError: "Tilni saqlashda xatolik yuz berdi.",
  },

  ru: {
    title: "Моя NFC-визитка",
    edit: "Редактировать",
    settings: "Настройки",
    qr: "QR-код",
    language: "Язык",
    theme: "Основной фон",
    delete: "Удалить профиль",
    chooseLanguage: "Выберите язык",
    searchLanguage: "Поиск языка...",
    deleteTitle: "Удалить профиль?",
    deleteWarning:
      "Все ваши данные будут удалены, и восстановить их будет невозможно.",
    no: "Нет",
    yes: "Да",
    emptyName: "Имя Фамилия",
    emptyBio: "Краткая информация",
    close: "Закрыть",
    qrText: "Моя NFC-визитка",
    light: "Светлая",
    dark: "Тёмная",
    blue: "Синяя",
    green: "Зелёная",
    deleteError: "Не удалось удалить профиль.",
    languageError: "Не удалось сохранить язык.",
  },

  en: {
    title: "My NFC Card",
    edit: "Edit",
    settings: "Settings",
    qr: "QR Code",
    language: "Language",
    theme: "Main background",
    delete: "Delete profile",
    chooseLanguage: "Choose your language",
    searchLanguage: "Search language...",
    deleteTitle: "Delete profile?",
    deleteWarning:
      "All your data will be deleted and cannot be restored.",
    no: "No",
    yes: "Yes",
    emptyName: "Full Name",
    emptyBio: "Short information",
    close: "Close",
    qrText: "My NFC Card",
    light: "Light",
    dark: "Dark",
    blue: "Blue",
    green: "Green",
    deleteError: "The profile could not be deleted.",
    languageError: "The language could not be saved.",
  },

  tr: {
    title: "NFC Kartım",
    edit: "Düzenle",
    settings: "Ayarlar",
    qr: "QR Kod",
    language: "Dil",
    theme: "Ana arka plan",
    delete: "Profili sil",
    chooseLanguage: "Dilinizi seçin",
    searchLanguage: "Dil ara...",
    deleteTitle: "Profil silinsin mi?",
    deleteWarning:
      "Tüm verileriniz silinecek ve geri yüklenemeyecek.",
    no: "Hayır",
    yes: "Evet",
    emptyName: "Ad Soyad",
    emptyBio: "Kısa bilgi",
    close: "Kapat",
    qrText: "NFC Kartım",
    light: "Açık",
    dark: "Koyu",
    blue: "Mavi",
    green: "Yeşil",
    deleteError: "Profil silinemedi.",
    languageError: "Dil kaydedilemedi.",
  },
};

const THEMES = {
  dark: {
    background:
      "linear-gradient(145deg, #06101d 0%, #111827 48%, #07111f 100%)",
    card: "rgba(255,255,255,0.09)",
    cardBorder: "rgba(255,255,255,0.14)",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.58)",
  },

  light: {
    background:
      "linear-gradient(145deg, #e9eef5 0%, #ffffff 48%, #e8edf4 100%)",
    card: "rgba(255,255,255,0.68)",
    cardBorder: "rgba(255,255,255,0.85)",
    text: "#101828",
    muted: "rgba(16,24,40,0.58)",
  },

  blue: {
    background:
      "linear-gradient(145deg, #071c38 0%, #0b3565 48%, #061426 100%)",
    card: "rgba(255,255,255,0.10)",
    cardBorder: "rgba(255,255,255,0.16)",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.62)",
  },

  green: {
    background:
      "linear-gradient(145deg, #071b17 0%, #123c31 48%, #061510 100%)",
    card: "rgba(255,255,255,0.10)",
    cardBorder: "rgba(255,255,255,0.15)",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.60)",
  },
};

export default function MyCardPage() {
  const params = useParams();
  const cardId = params?.id;

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const [languageSearch, setLanguageSearch] = useState("");

  const [theme, setTheme] = useState("dark");

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteSeconds, setDeleteSeconds] = useState(10);
  const [deleting, setDeleting] = useState(false);

  const [publicUrl, setPublicUrl] = useState("");

  useEffect(() => {
    if (!cardId) return;

    async function loadProfile() {
      try {
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("card_id", cardId)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        if (!data) {
          setError("Profile not found.");
          return;
        }

        setProfile(data);

        const savedTheme = window.localStorage.getItem(
          `nfc-theme-${data.card_id}`
        );

        if (savedTheme && THEMES[savedTheme]) {
          setTheme(savedTheme);
        }

        setPublicUrl(
          `${window.location.origin}/c/${data.card_id}`
        );
      } catch (err) {
        console.error(err);
        setError(err?.message || "Something went wrong.");
      }
    }

    loadProfile();
  }, [cardId]);

  useEffect(() => {
    if (!deleteConfirm) {
      setDeleteSeconds(10);
      return;
    }

    setDeleteSeconds(10);

    const timer = window.setInterval(() => {
      setDeleteSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [deleteConfirm]);

  const languageCode = profile?.language || "en";
  const t = TEXTS[languageCode] || TEXTS.en;

  const currentTheme = THEMES[theme] || THEMES.dark;

  const filteredLanguages = useMemo(() => {
    const value = languageSearch
      .trim()
      .toLocaleLowerCase();

    if (!value) return LANGUAGES;

    return LANGUAGES.filter((language) => {
      const searchText = `${language.name} ${language.english} ${language.code}`
        .toLocaleLowerCase();

      return searchText.includes(value);
    });
  }, [languageSearch]);

  const qrImageUrl = publicUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=20&data=${encodeURIComponent(
        publicUrl
      )}`
    : "";

  function openModal(name) {
    setMenuOpen(false);
    setModal(name);
  }

  function closeModal() {
    setModal(null);
    setLanguageSearch("");
    setDeleteConfirm(false);
  }

  function selectTheme(themeName) {
    setTheme(themeName);

    if (profile?.card_id) {
      window.localStorage.setItem(
        `nfc-theme-${profile.card_id}`,
        themeName
      );
    }
  }

  async function changeLanguage(languageCode) {
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          language: languageCode,
        })
        .eq("id", profile.id);

      if (updateError) {
        throw updateError;
      }

      setProfile((current) => ({
        ...current,
        language: languageCode,
      }));

      setModal("settings");
      setLanguageSearch("");
    } catch (err) {
      console.error(err);
      window.alert(t.languageError);
    }
  }

  async function deleteProfile() {
    if (
      deleteSeconds !== 0 ||
      deleting ||
      !profile
    ) {
      return;
    }

    try {
      setDeleting(true);

      const { error: linksError } = await supabase
        .from("links")
        .delete()
        .eq("profile_id", profile.id);

      if (linksError) {
        throw linksError;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", profile.id);

      if (profileError) {
        throw profileError;
      }

      window.localStorage.removeItem(
        `nfc-theme-${profile.card_id}`
      );

      window.location.replace("/");
    } catch (err) {
      console.error(err);
      setDeleting(false);
      window.alert(
        err?.message || t.deleteError
      );
    }
  }

  if (error) {
    return (
      <main
        style={{
          ...styles.page,
          background: THEMES.dark.background,
        }}
      >
        <div style={styles.errorBox}>
          {error}
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main
        style={{
          ...styles.page,
          background: THEMES.dark.background,
        }}
      />
    );
  }

  return (
    <main
      style={{
        ...styles.page,
        background: currentTheme.background,
        color: currentTheme.text,
      }}
    >
      <div
        style={{
          ...styles.mainContent,
          filter: modal ? "blur(9px)" : "none",
          transform: modal
            ? "scale(0.985)"
            : "scale(1)",
          opacity: modal ? 0.68 : 1,
        }}
      >
        <header style={styles.header}>
          <div>
            <div
              style={{
                ...styles.smallTitle,
                color: currentTheme.muted,
              }}
            >
              NFC QR INFO
            </div>

            <h1 style={styles.pageTitle}>
              {t.title}
            </h1>
          </div>

          <div style={styles.menuWrapper}>
            <button
              type="button"
              aria-label="Menu"
              style={{
                ...styles.iconButton,
                color: currentTheme.text,
                background: currentTheme.card,
                borderColor:
                  currentTheme.cardBorder,
              }}
              onClick={() =>
                setMenuOpen((current) => !current)
              }
            >
              <FaEllipsisVertical />
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  style={styles.menuBackdrop}
                  onClick={() => setMenuOpen(false)}
                />

                <div
                  style={{
                    ...styles.menu,
                    background:
                      theme === "light"
                        ? "rgba(255,255,255,0.94)"
                        : "rgba(17,24,39,0.94)",
                    borderColor:
                      currentTheme.cardBorder,
                    color: currentTheme.text,
                  }}
                >
                  <button
                    type="button"
                    style={{
                      ...styles.menuItem,
                      color: currentTheme.text,
                    }}
                    onClick={() =>
                      openModal("settings")
                    }
                  >
                    <FaGear />
                    <span>{t.settings}</span>
                  </button>

                  <div
                    style={{
                      ...styles.menuDivider,
                      background:
                        currentTheme.cardBorder,
                    }}
                  />

                  <button
                    type="button"
                    style={{
                      ...styles.menuItem,
                      color: currentTheme.text,
                    }}
                    onClick={() =>
                      openModal("qr")
                    }
                  >
                    <FaQrcode />
                    <span>{t.qr}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <section
          style={{
            ...styles.profileCard,
            background: currentTheme.card,
            borderColor:
              currentTheme.cardBorder,
          }}
        >
          <div style={styles.avatarOuter}>
            {profile.photo_url ? (
              <img
                src={profile.photo_url}
                alt=""
                style={styles.avatarImage}
              />
            ) : (
              <div
                style={{
                  ...styles.avatarPlaceholder,
                  background:
                    "rgba(255,255,255,0.13)",
                  borderColor:
                    currentTheme.cardBorder,
                }}
              >
                <span>👤</span>
              </div>
            )}
          </div>

          <h2 style={styles.name}>
            {profile.full_name?.trim() ||
              t.emptyName}
          </h2>

          <p
            style={{
              ...styles.bio,
              color: currentTheme.muted,
            }}
          >
            {profile.bio?.trim() || t.emptyBio}
          </p>

          <div style={styles.previewLine} />

          <button
            type="button"
            style={styles.editButton}
            onClick={() =>
              window.location.replace(
                `/edit/${profile.card_id}`
              )
            }
          >
            <FaPen />
            <span>{t.edit}</span>
          </button>
        </section>
      </div>

      {modal && (
        <div style={styles.modalLayer}>
          <button
            type="button"
            aria-label="Close"
            style={styles.modalBackdrop}
            onClick={closeModal}
          />

          {modal === "settings" && (
            <div style={styles.modalCard}>
              <div style={styles.modalHeader}>
                <div style={styles.modalTitleRow}>
                  <div style={styles.modalIcon}>
                    <FaGear />
                  </div>

                  <h2 style={styles.modalTitle}>
                    {t.settings}
                  </h2>
                </div>

                <button
                  type="button"
                  style={styles.closeButton}
                  onClick={closeModal}
                >
                  <FaXmark />
                </button>
              </div>

              <div style={styles.settingsContent}>
                <div style={styles.settingSection}>
                  <div style={styles.settingHeading}>
                    <FaPalette />
                    <span>{t.theme}</span>
                  </div>

                  <div style={styles.themeGrid}>
                    <ThemeButton
                      active={theme === "light"}
                      label={t.light}
                      preview="linear-gradient(135deg,#ffffff,#dce3ec)"
                      onClick={() =>
                        selectTheme("light")
                      }
                    />

                    <ThemeButton
                      active={theme === "dark"}
                      label={t.dark}
                      preview="linear-gradient(135deg,#111827,#030712)"
                      onClick={() =>
                        selectTheme("dark")
                      }
                    />

                    <ThemeButton
                      active={theme === "blue"}
                      label={t.blue}
                      preview="linear-gradient(135deg,#0b3565,#061426)"
                      onClick={() =>
                        selectTheme("blue")
                      }
                    />

                    <ThemeButton
                      active={theme === "green"}
                      label={t.green}
                      preview="linear-gradient(135deg,#1b5142,#061510)"
                      onClick={() =>
                        selectTheme("green")
                      }
                    />
                  </div>
                </div>

                <button
                  type="button"
                  style={styles.settingRow}
                  onClick={() =>
                    setModal("language")
                  }
                >
                  <div style={styles.settingRowLeft}>
                    <div style={styles.settingRowIcon}>
                      <FaGlobe />
                    </div>

                    <span>{t.language}</span>
                  </div>

                  <span style={styles.settingValue}>
                    {LANGUAGES.find(
                      (item) =>
                        item.code ===
                        profile.language
                    )?.name || "English"}
                    {"  ›"}
                  </span>
                </button>

                <button
                  type="button"
                  style={styles.deleteRow}
                  onClick={() =>
                    setDeleteConfirm(true)
                  }
                >
                  <div style={styles.settingRowLeft}>
                    <div
                      style={{
                        ...styles.settingRowIcon,
                        background:
                          "rgba(239,68,68,0.12)",
                        color: "#ef4444",
                      }}
                    >
                      <FaTrash />
                    </div>

                    <span>{t.delete}</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {modal === "language" && (
            <div style={styles.modalCard}>
              <div style={styles.modalHeader}>
                <div style={styles.modalTitleRow}>
                  <div style={styles.modalIcon}>
                    <FaGlobe />
                  </div>

                  <h2 style={styles.modalTitle}>
                    {t.chooseLanguage}
                  </h2>
                </div>

                <button
                  type="button"
                  style={styles.closeButton}
                  onClick={() =>
                    setModal("settings")
                  }
                >
                  <FaXmark />
                </button>
              </div>

              <div style={styles.languageSearchBox}>
                <FaGlobe />

                <input
                  type="text"
                  value={languageSearch}
                  onChange={(event) =>
                    setLanguageSearch(
                      event.target.value
                    )
                  }
                  placeholder={t.searchLanguage}
                  style={styles.languageInput}
                />
              </div>

              <div style={styles.languageList}>
                {filteredLanguages.map(
                  (language) => {
                    const selected =
                      profile.language ===
                      language.code;

                    return (
                      <button
                        type="button"
                        key={language.code}
                        style={{
                          ...styles.languageButton,
                          background: selected
                            ? "rgba(59,130,246,0.13)"
                            : "rgba(255,255,255,0.055)",
                          borderColor: selected
                            ? "rgba(59,130,246,0.34)"
                            : "rgba(255,255,255,0.08)",
                        }}
                        onClick={() =>
                          changeLanguage(
                            language.code
                          )
                        }
                      >
                        <div
                          style={
                            styles.languageNames
                          }
                        >
                          <strong>
                            {language.name}
                          </strong>

                          {language.name !==
                            language.english && (
                            <small>
                              {
                                language.english
                              }
                            </small>
                          )}
                        </div>

                        {selected && (
                          <FaCheck
                            style={{
                              color: "#60a5fa",
                            }}
                          />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {modal === "qr" && (
            <div
              style={{
                ...styles.modalCard,
                ...styles.qrModal,
              }}
            >
              <div style={styles.modalHeader}>
                <div style={styles.modalTitleRow}>
                  <div style={styles.modalIcon}>
                    <FaQrcode />
                  </div>

                  <h2 style={styles.modalTitle}>
                    {t.qr}
                  </h2>
                </div>

                <button
                  type="button"
                  style={styles.closeButton}
                  onClick={closeModal}
                >
                  <FaXmark />
                </button>
              </div>

              <div style={styles.qrContent}>
                <div style={styles.qrWhiteBox}>
                  {qrImageUrl && (
                    <img
                      src={qrImageUrl}
                      alt="QR Code"
                      style={styles.qrImage}
                    />
                  )}
                </div>

                <strong style={styles.qrName}>
                  {profile.full_name?.trim() ||
                    t.qrText}
                </strong>

                <div style={styles.qrUrl}>
                  {publicUrl}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {deleteConfirm && (
        <div style={styles.confirmLayer}>
          <button
            type="button"
            aria-label="Close"
            style={styles.confirmBackdrop}
            onClick={() =>
              !deleting &&
              setDeleteConfirm(false)
            }
          />

          <div style={styles.confirmCard}>
            <div style={styles.deleteIconLarge}>
              <FaTrash />
            </div>

            <h2 style={styles.confirmTitle}>
              {t.deleteTitle}
            </h2>

            <p style={styles.confirmWarning}>
              {t.deleteWarning}
            </p>

            <div style={styles.confirmButtons}>
              <button
                type="button"
                disabled={deleting}
                style={styles.noButton}
                onClick={() =>
                  setDeleteConfirm(false)
                }
              >
                {t.no}
              </button>

              <button
                type="button"
                disabled={
                  deleteSeconds > 0 ||
                  deleting
                }
                style={{
                  ...styles.yesButton,
                  opacity:
                    deleteSeconds > 0 ||
                    deleting
                      ? 0.38
                      : 1,
                  cursor:
                    deleteSeconds > 0 ||
                    deleting
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={deleteProfile}
              >
                {deleteSeconds > 0
                  ? `${t.yes} (${deleteSeconds})`
                  : t.yes}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ThemeButton({
  active,
  label,
  preview,
  onClick,
}) {
  return (
    <button
      type="button"
      style={{
        ...styles.themeButton,
        borderColor: active
          ? "#3b82f6"
          : "rgba(255,255,255,0.10)",
        background: active
          ? "rgba(59,130,246,0.12)"
          : "rgba(255,255,255,0.05)",
      }}
      onClick={onClick}
    >
      <span
        style={{
          ...styles.themePreview,
          background: preview,
        }}
      />

      <span>{label}</span>

      {active && (
        <span style={styles.themeCheck}>
          <FaCheck />
        </span>
      )}
    </button>
  );
}

const styles = {
  page: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition:
      "background 300ms ease, color 300ms ease",
  },

  mainContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "460px",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "22px 17px 40px",
    boxSizing: "border-box",
    transition:
      "filter 260ms ease, transform 260ms ease, opacity 260ms ease",
  },

  header: {
    position: "relative",
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "28px",
  },

  smallTitle: {
    marginBottom: "5px",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "25px",
    lineHeight: 1.15,
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  menuWrapper: {
    position: "relative",
    zIndex: 50,
  },

  iconButton: {
    position: "relative",
    zIndex: 52,
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "15px",
    fontSize: "18px",
    cursor: "pointer",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  },

  menuBackdrop: {
    position: "fixed",
    zIndex: 50,
    inset: 0,
    padding: 0,
    border: 0,
    background: "transparent",
  },

  menu: {
    position: "absolute",
    zIndex: 53,
    top: "53px",
    right: 0,
    width: "190px",
    padding: "7px",
    border: "1px solid",
    borderRadius: "18px",
    boxShadow:
      "0 18px 50px rgba(0,0,0,0.30)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
  },

  menuItem: {
    width: "100%",
    height: "48px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 13px",
    border: 0,
    borderRadius: "13px",
    background: "transparent",
    fontSize: "15px",
    fontWeight: "650",
    fontFamily: "inherit",
    cursor: "pointer",
    textAlign: "left",
  },

  menuDivider: {
    height: "1px",
    margin: "2px 8px",
  },

  profileCard: {
    width: "100%",
    padding: "34px 22px 22px",
    boxSizing: "border-box",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "32px",
    textAlign: "center",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.22)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
  },

  avatarOuter: {
    width: "112px",
    height: "112px",
    margin: "0 auto 18px",
  },

  avatarImage: {
    width: "112px",
    height: "112px",
    display: "block",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(255,255,255,0.72)",
    boxShadow:
      "0 14px 35px rgba(0,0,0,0.22)",
  },

  avatarPlaceholder: {
    width: "112px",
    height: "112px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
    fontSize: "46px",
  },

  name: {
    margin: "0 0 8px",
    fontSize: "26px",
    lineHeight: 1.2,
    fontWeight: "800",
    letterSpacing: "-0.4px",
  },

  bio: {
    maxWidth: "310px",
    margin: "0 auto",
    fontSize: "15px",
    lineHeight: 1.55,
  },

  previewLine: {
    width: "100%",
    height: "1px",
    margin: "28px 0 20px",
    background:
      "rgba(255,255,255,0.11)",
  },

  editButton: {
    width: "100%",
    minHeight: "54px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    border: 0,
    borderRadius: "17px",
    background:
      "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "750",
    fontFamily: "inherit",
    boxShadow:
      "0 12px 30px rgba(37,99,235,0.28)",
    cursor: "pointer",
  },

  modalLayer: {
    position: "fixed",
    zIndex: 1000,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "18px",
    boxSizing: "border-box",
  },

  modalBackdrop: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
    background: "rgba(0,0,0,0.38)",
    backdropFilter: "blur(9px)",
    WebkitBackdropFilter: "blur(9px)",
  },

  modalCard: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "420px",
    maxHeight: "88vh",
    overflow: "hidden",
    padding: "18px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.16)",
    borderRadius: "28px",
    background: "rgba(17,24,39,0.90)",
    color: "#ffffff",
    boxShadow:
      "0 30px 90px rgba(0,0,0,0.48)",
    backdropFilter: "blur(32px)",
    WebkitBackdropFilter: "blur(32px)",
    animation: "none",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "18px",
  },

  modalTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    minWidth: 0,
  },

  modalIcon: {
    width: "38px",
    height: "38px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "13px",
    background:
      "rgba(255,255,255,0.09)",
    color: "#ffffff",
    fontSize: "16px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
  },

  closeButton: {
    width: "38px",
    height: "38px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: "13px",
    background:
      "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontSize: "17px",
    cursor: "pointer",
  },

  settingsContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  settingSection: {
    padding: "15px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.045)",
  },

  settingHeading: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "13px",
    fontSize: "14px",
    fontWeight: "750",
    color: "rgba(255,255,255,0.74)",
  },

  themeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "9px",
  },

  themeButton: {
    position: "relative",
    minHeight: "75px",
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "9px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "16px",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "13px",
    fontWeight: "650",
    cursor: "pointer",
  },

  themePreview: {
    width: "34px",
    height: "48px",
    flexShrink: 0,
    borderRadius: "11px",
    border:
      "1px solid rgba(255,255,255,0.22)",
  },

  themeCheck: {
    position: "absolute",
    top: "7px",
    right: "7px",
    fontSize: "10px",
    color: "#60a5fa",
  },

  settingRow: {
    width: "100%",
    minHeight: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 14px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "19px",
    background:
      "rgba(255,255,255,0.045)",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "650",
    cursor: "pointer",
  },

  settingRowLeft: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
  },

  settingRowIcon: {
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background:
      "rgba(255,255,255,0.08)",
    fontSize: "15px",
  },

  settingValue: {
    maxWidth: "145px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "rgba(255,255,255,0.50)",
    fontSize: "13px",
    fontWeight: "500",
  },

  deleteRow: {
    width: "100%",
    minHeight: "64px",
    display: "flex",
    alignItems: "center",
    padding: "10px 14px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(239,68,68,0.17)",
    borderRadius: "19px",
    background:
      "rgba(239,68,68,0.065)",
    color: "#ef4444",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },

  languageSearchBox: {
    height: "52px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 14px",
    marginBottom: "10px",
    border:
      "1px solid rgba(255,255,255,0.10)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.45)",
  },

  languageInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    border: 0,
    outline: "none",
    background: "transparent",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
  },

  languageList: {
    maxHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },

  languageButton: {
    width: "100%",
    minHeight: "58px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "9px 13px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "16px",
    color: "#ffffff",
    fontFamily: "inherit",
    textAlign: "left",
    cursor: "pointer",
  },

  languageNames: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    fontSize: "15px",
  },

  qrModal: {
    maxWidth: "390px",
  },

  qrContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 4px 8px",
  },

  qrWhiteBox: {
    width: "min(270px, 75vw)",
    aspectRatio: "1 / 1",
    padding: "14px",
    boxSizing: "border-box",
    borderRadius: "25px",
    background: "#ffffff",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.28)",
  },

  qrImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "10px",
  },

  qrName: {
    marginTop: "20px",
    fontSize: "18px",
    textAlign: "center",
  },

  qrUrl: {
    maxWidth: "100%",
    marginTop: "7px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "rgba(255,255,255,0.48)",
    fontSize: "12px",
  },

  confirmLayer: {
    position: "fixed",
    zIndex: 2000,
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "22px",
    boxSizing: "border-box",
  },

  confirmBackdrop: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
    background: "rgba(0,0,0,0.58)",
    backdropFilter: "blur(13px)",
    WebkitBackdropFilter: "blur(13px)",
  },

  confirmCard: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "350px",
    padding: "26px 20px 20px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "27px",
    background: "rgba(17,24,39,0.95)",
    color: "#ffffff",
    textAlign: "center",
    boxShadow:
      "0 30px 90px rgba(0,0,0,0.55)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
  },

  deleteIconLarge: {
    width: "56px",
    height: "56px",
    margin: "0 auto 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "18px",
    background:
      "rgba(239,68,68,0.12)",
    color: "#ef4444",
    fontSize: "21px",
  },

  confirmTitle: {
    margin: "0 0 10px",
    fontSize: "21px",
    fontWeight: "800",
  },

  confirmWarning: {
    margin: "0 auto 23px",
    maxWidth: "285px",
    color: "rgba(255,255,255,0.60)",
    fontSize: "14px",
    lineHeight: 1.55,
  },

  confirmButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  noButton: {
    minHeight: "51px",
    border:
      "1px solid rgba(255,255,255,0.11)",
    borderRadius: "16px",
    background:
      "rgba(255,255,255,0.075)",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },

  yesButton: {
    minHeight: "51px",
    border: 0,
    borderRadius: "16px",
    background: "#dc2626",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "750",
  },

  errorBox: {
    width: "calc(100% - 36px)",
    maxWidth: "420px",
    margin: "30px auto",
    padding: "18px",
    boxSizing: "border-box",
    borderRadius: "18px",
    background:
      "rgba(220,38,38,0.16)",
    border:
      "1px solid rgba(248,113,113,0.35)",
    color: "#ffffff",
    fontSize: "15px",
    lineHeight: 1.5,
  },
};
