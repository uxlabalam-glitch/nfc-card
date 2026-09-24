"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = [
  { code: "uz", name: "O‘zbekcha", short: "UZ", flag: "🇺🇿", dir: "ltr" },
  { code: "ru", name: "Русский", short: "RU", flag: "🇷🇺", dir: "ltr" },
  { code: "en", name: "English", short: "EN", flag: "🇬🇧", dir: "ltr" },
  { code: "tr", name: "Türkçe", short: "TR", flag: "🇹🇷", dir: "ltr" },
  { code: "kk", name: "Қазақша", short: "KK", flag: "🇰🇿", dir: "ltr" },
  { code: "ar", name: "العربية", short: "AR", flag: "🇸🇦", dir: "rtl" },
  { code: "zh", name: "中文", short: "ZH", flag: "🇨🇳", dir: "ltr" },
  { code: "ja", name: "日本語", short: "JA", flag: "🇯🇵", dir: "ltr" },
  { code: "ko", name: "한국어", short: "KO", flag: "🇰🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", short: "DE", flag: "🇩🇪", dir: "ltr" },
  { code: "fr", name: "Français", short: "FR", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Español", short: "ES", flag: "🇪🇸", dir: "ltr" },
];

/* =========================================================
   TRANSLATIONS
========================================================= */

const TEXTS = {
  uz: {
    smallTitle: "RAQAMLI VIZITKA",
    title: "Profilni tahrirlash",

    name: "Ism va familiya",
    namePlaceholder: "Ism va familiyangiz",

    bio: "Ma’lumot",
    bioPlaceholder: "Masalan: Direktor, tadbirkor...",

    photo: "Profil rasmi",
    uploadPhoto: "Rasm yuklash",
    photoHint: "JPG, PNG, WEBP — maksimal 5 MB",

    background: "Orqa fon rasmi",
    uploadBackground: "Fon yuklash",
    backgroundHint: "JPG, PNG, WEBP — maksimal 10 MB",

    links: "Havolalar",
    addLink: "Yangi havola qo‘shish",
    linkName: "Nomi, masalan Telegram",

    save: "Saqlash",

    selectLanguage: "Tilni tanlang",
    languageDescription: "Vizitkani tahrirlash uchun tilni tanlang",
    searchLanguage: "Tilni qidirish...",
    notFound: "Til topilmadi",

    profileNotFound: "Vizitka topilmadi.",

    enterName: "Ism va familiyani kiriting.",
    onlyImage: "Faqat rasm yuklash mumkin.",
    photoTooBig: "Profil rasmi 5 MB dan katta bo‘lmasin.",
    backgroundTooBig: "Orqa fon rasmi 10 MB dan katta bo‘lmasin.",
  },

  ru: {
    smallTitle: "ЦИФРОВАЯ ВИЗИТКА",
    title: "Редактировать профиль",

    name: "Имя и фамилия",
    namePlaceholder: "Ваше имя и фамилия",

    bio: "Информация",
    bioPlaceholder: "Например: Директор, предприниматель...",

    photo: "Фото профиля",
    uploadPhoto: "Загрузить фото",
    photoHint: "JPG, PNG, WEBP — максимум 5 МБ",

    background: "Фоновое изображение",
    uploadBackground: "Загрузить фон",
    backgroundHint: "JPG, PNG, WEBP — максимум 10 МБ",

    links: "Ссылки",
    addLink: "Добавить ссылку",
    linkName: "Название, например Telegram",

    save: "Сохранить",

    selectLanguage: "Выберите язык",
    languageDescription: "Выберите язык для редактирования визитки",
    searchLanguage: "Поиск языка...",
    notFound: "Язык не найден",

    profileNotFound: "Визитка не найдена.",

    enterName: "Введите имя и фамилию.",
    onlyImage: "Можно загружать только изображения.",
    photoTooBig: "Фото профиля не должно превышать 5 МБ.",
    backgroundTooBig: "Фоновое изображение не должно превышать 10 МБ.",
  },

  en: {
    smallTitle: "DIGITAL BUSINESS CARD",
    title: "Edit profile",

    name: "Full name",
    namePlaceholder: "Your full name",

    bio: "Information",
    bioPlaceholder: "For example: Director, entrepreneur...",

    photo: "Profile photo",
    uploadPhoto: "Upload photo",
    photoHint: "JPG, PNG, WEBP — maximum 5 MB",

    background: "Background image",
    uploadBackground: "Upload background",
    backgroundHint: "JPG, PNG, WEBP — maximum 10 MB",

    links: "Links",
    addLink: "Add link",
    linkName: "Name, for example Telegram",

    save: "Save",

    selectLanguage: "Choose language",
    languageDescription: "Choose a language to edit your card",
    searchLanguage: "Search language...",
    notFound: "Language not found",

    profileNotFound: "Business card not found.",

    enterName: "Enter your full name.",
    onlyImage: "Only images can be uploaded.",
    photoTooBig: "Profile photo must not exceed 5 MB.",
    backgroundTooBig: "Background image must not exceed 10 MB.",
  },
};

function getText(language) {
  return TEXTS[language] || TEXTS.en;
}

/* =========================================================
   PAGE
========================================================= */

export default function EditCardPage() {
  const params = useParams();
  const cardId = params?.id;

  const [profile, setProfile] = useState(null);
  const [profileChecked, setProfileChecked] = useState(false);

  const [links, setLinks] = useState([]);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const [language, setLanguage] = useState("");
  const [showLanguage, setShowLanguage] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");

  const [saving, setSaving] = useState(false);
  const [savingLanguage, setSavingLanguage] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);

  const t = getText(language || "uz");

  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];

  useEffect(() => {
    if (cardId) {
      loadData();
    }
  }, [cardId]);

  /* =========================================================
     LOAD DATA
  ========================================================= */

  async function loadData() {
    try {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("card_id", cardId)
        .single();

      if (error) {
        throw error;
      }

      if (!profileData) {
        setProfile(null);
        return;
      }

      setProfile(profileData);

      setFullName(profileData.full_name || "");
      setBio(profileData.bio || "");
      setPhotoUrl(profileData.photo_url || "");
      setBackgroundUrl(profileData.background_url || "");

      const savedLanguage = profileData.language?.trim() || "";

      if (savedLanguage) {
        setLanguage(savedLanguage);
        setShowLanguage(false);
      } else {
        setLanguage("");
        setShowLanguage(true);
      }

      const { data: linkData, error: linkError } = await supabase
        .from("links")
        .select("*")
        .eq("profile_id", profileData.id)
        .order("sort_order", { ascending: true });

      if (linkError) {
        throw linkError;
      }

      setLinks(linkData || []);
    } catch (error) {
      console.error("LOAD ERROR:", error);
      setProfile(null);
    } finally {
      setProfileChecked(true);
    }
  }

  /* =========================================================
     LANGUAGE
  ========================================================= */

  async function selectLanguage(code) {
    if (!profile || savingLanguage) return;

    setSavingLanguage(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          language: code,
        })
        .eq("id", profile.id);

      if (error) {
        throw error;
      }

      setLanguage(code);

      setProfile((current) => ({
        ...current,
        language: code,
      }));

      setLanguageSearch("");
      setShowLanguage(false);
    } catch (error) {
      console.error("LANGUAGE ERROR:", error);

      alert(
        "Tilni saqlashda xato: " +
          error.message
      );
    } finally {
      setSavingLanguage(false);
    }
  }

  /* =========================================================
     STORAGE
  ========================================================= */

  function getStoragePath(publicUrl, bucket) {
    if (!publicUrl) return null;

    const marker = `/storage/v1/object/public/${bucket}/`;

    if (!publicUrl.includes(marker)) {
      return null;
    }

    return decodeURIComponent(publicUrl.split(marker)[1]);
  }

  async function deleteOldFile(publicUrl, bucket) {
    const path = getStoragePath(publicUrl, bucket);

    if (!path) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error("DELETE OLD FILE ERROR:", error);
    }
  }

  /* =========================================================
     PHOTO
  ========================================================= */

  async function uploadPhoto(event) {
    const file = event.target.files?.[0];

    if (!file || !profile || uploadingPhoto) return;

    if (!file.type.startsWith("image/")) {
      alert(t.onlyImage);
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t.photoTooBig);
      event.target.value = "";
      return;
    }

    setUploadingPhoto(true);

    try {
      const oldUrl = photoUrl;

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${profile.id}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const newUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          photo_url: newUrl,
        })
        .eq("id", profile.id);

      if (updateError) {
        await supabase.storage
          .from("avatars")
          .remove([fileName]);

        throw updateError;
      }

      setPhotoUrl(newUrl);

      setProfile((current) => ({
        ...current,
        photo_url: newUrl,
      }));

      if (oldUrl && oldUrl !== newUrl) {
        await deleteOldFile(oldUrl, "avatars");
      }
    } catch (error) {
      console.error("PHOTO ERROR:", error);

      alert(
        "Profil rasmini yuklashda xato: " +
          error.message
      );
    } finally {
      setUploadingPhoto(false);
      event.target.value = "";
    }
  }

  /* =========================================================
     BACKGROUND
  ========================================================= */

  async function uploadBackground(event) {
    const file = event.target.files?.[0];

    if (!file || !profile || uploadingBackground) return;

    if (!file.type.startsWith("image/")) {
      alert(t.onlyImage);
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(t.backgroundTooBig);
      event.target.value = "";
      return;
    }

    setUploadingBackground(true);

    try {
      const oldUrl = backgroundUrl;

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${profile.id}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("backgrounds")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("backgrounds")
        .getPublicUrl(fileName);

      const newUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          background_url: newUrl,
        })
        .eq("id", profile.id);

      if (updateError) {
        await supabase.storage
          .from("backgrounds")
          .remove([fileName]);

        throw updateError;
      }

      setBackgroundUrl(newUrl);

      setProfile((current) => ({
        ...current,
        background_url: newUrl,
      }));

      if (oldUrl && oldUrl !== newUrl) {
        await deleteOldFile(oldUrl, "backgrounds");
      }
    } catch (error) {
      console.error("BACKGROUND ERROR:", error);

      alert(
        "Orqa fonni yuklashda xato: " +
          error.message
      );
    } finally {
      setUploadingBackground(false);
      event.target.value = "";
    }
  }

  /* =========================================================
     LINKS
  ========================================================= */

  function addLink() {
    setLinks((current) => [
      ...current,
      {
        temp_id:
          Date.now().toString() +
          Math.random().toString(36).slice(2),

        label: "",
        url: "",
        icon: "website",
        sort_order: current.length,
      },
    ]);
  }

  function updateLink(index, field, value) {
    setLinks((current) =>
      current.map((link, i) =>
        i === index
          ? {
              ...link,
              [field]: value,
            }
          : link
      )
    );
  }

  async function removeLink(index) {
    const link = links[index];

    try {
      if (link?.id) {
        const { error } = await supabase
          .from("links")
          .delete()
          .eq("id", link.id);

        if (error) {
          throw error;
        }
      }

      setLinks((current) =>
        current
          .filter((_, i) => i !== index)
          .map((item, i) => ({
            ...item,
            sort_order: i,
          }))
      );
    } catch (error) {
      console.error("DELETE LINK ERROR:", error);

      alert(
        "Havolani o‘chirishda xato: " +
          error.message
      );
    }
  }

  /* =========================================================
     SAVE
  ========================================================= */

  async function saveEverything() {
    if (!profile || saving) return;

    if (!fullName.trim()) {
      alert(t.enterName);
      return;
    }

    setSaving(true);

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          bio: bio.trim(),
          photo_url: photoUrl || null,
          background_url: backgroundUrl || null,
          language: language || profile.language || "uz",
        })
        .eq("id", profile.id);

      if (profileError) {
        throw profileError;
      }

      const existingIds = links
        .filter((link) => link.id)
        .map((link) => link.id);

      const {
        data: existingDbLinks,
        error: existingError,
      } = await supabase
        .from("links")
        .select("id")
        .eq("profile_id", profile.id);

      if (existingError) {
        throw existingError;
      }

      const idsToDelete =
        existingDbLinks
          ?.filter(
            (item) =>
              !existingIds.includes(item.id)
          )
          .map((item) => item.id) || [];

      if (idsToDelete.length > 0) {
        const { error: deleteError } =
          await supabase
            .from("links")
            .delete()
            .in("id", idsToDelete);

        if (deleteError) {
          throw deleteError;
        }
      }

      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (
          !link.label?.trim() &&
          !link.url?.trim()
        ) {
          continue;
        }

        const payload = {
          profile_id: profile.id,
          label:
            link.label?.trim() || "Link",
          url: link.url?.trim() || "",
          icon:
            link.icon || "website",
          sort_order: i,
        };

        if (link.id) {
          const { error } = await supabase
            .from("links")
            .update(payload)
            .eq("id", link.id);

          if (error) {
            throw error;
          }
        } else {
          const { error } = await supabase
            .from("links")
            .insert(payload);

          if (error) {
            throw error;
          }
        }
      }

      window.location.replace(`/c/${cardId}`);
    } catch (error) {
      console.error("SAVE ERROR:", error);

      alert(
        "Saqlashda xato: " +
          error.message
      );

      setSaving(false);
    }
  }

  /* =========================================================
     PROFILE CHECK
  ========================================================= */

  if (!profileChecked) {
    return (
      <main style={emptyPageStyle} />
    );
  }

  if (!profile) {
    return (
      <main style={centerStyle}>
        {t.profileNotFound}
      </main>
    );
  }

  /* =========================================================
     LANGUAGE SEARCH
  ========================================================= */

  const filteredLanguages =
    LANGUAGES.filter((item) => {
      const search =
        languageSearch
          .toLowerCase()
          .trim();

      return (
        item.name
          .toLowerCase()
          .includes(search) ||
        item.code
          .toLowerCase()
          .includes(search) ||
        item.short
          .toLowerCase()
          .includes(search)
      );
    });

  /* =========================================================
     UI
  ========================================================= */

  return (
    <main
      dir={currentLanguage.dir}
      style={pageStyle}
    >
      {/* BACKGROUND */}

      {backgroundUrl && (
        <div
          style={{
            position: "fixed",
            inset: "-30px",

            backgroundImage:
              `url("${backgroundUrl}")`,

            backgroundSize: "cover",
            backgroundPosition: "center",

            filter: "blur(14px)",
            transform: "scale(1.08)",

            opacity: 0.5,
          }}
        />
      )}

      <div style={overlayStyle} />

      {/* EDITOR */}

      <section style={editorStyle}>
        {/* HEADER */}

        <div style={topStyle}>
          <div>
            <div style={smallTitleStyle}>
              {t.smallTitle}
            </div>

            <h1 style={titleStyle}>
              {t.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setLanguageSearch("");
              setShowLanguage(true);
            }}
            style={languageButtonStyle}
          >
            🌐 {currentLanguage.short}
          </button>
        </div>

        {/* NAME */}

        <label style={labelStyle}>
          {t.name}
        </label>

        <input
          value={fullName}
          onChange={(event) =>
            setFullName(
              event.target.value
            )
          }
          placeholder={t.namePlaceholder}
          style={inputStyle}
        />

        {/* BIO */}

        <label style={labelStyle}>
          {t.bio}
        </label>

        <textarea
          value={bio}
          onChange={(event) =>
            setBio(
              event.target.value
            )
          }
          placeholder={t.bioPlaceholder}
          style={{
            ...inputStyle,
            minHeight: 95,
            resize: "vertical",
          }}
        />

        {/* PROFILE PHOTO */}

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            {t.photo}
          </h2>

          <div style={uploadRowStyle}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Avatar"
                style={avatarStyle}
              />
            ) : (
              <div style={emptyAvatarStyle}>
                👤
              </div>
            )}

            <div style={{ flex: 1 }}>
              <label
                style={{
                  ...uploadButtonStyle,
                  opacity:
                    uploadingPhoto
                      ? 0.6
                      : 1,
                }}
              >
                📷 {t.uploadPhoto}

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadPhoto}
                  disabled={uploadingPhoto}
                  style={{
                    display: "none",
                  }}
                />
              </label>

              <div style={hintStyle}>
                {t.photoHint}
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND PHOTO */}

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>
            {t.background}
          </h2>

          <div style={uploadRowStyle}>
            {backgroundUrl ? (
              <img
                src={backgroundUrl}
                alt="Background"
                style={
                  backgroundPreviewStyle
                }
              />
            ) : (
              <div
                style={
                  emptyBackgroundStyle
                }
              >
                🖼️
              </div>
            )}

            <div style={{ flex: 1 }}>
              <label
                style={{
                  ...uploadButtonStyle,
                  opacity:
                    uploadingBackground
                      ? 0.6
                      : 1,
                }}
              >
                🖼️ {t.uploadBackground}

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    uploadBackground
                  }
                  disabled={
                    uploadingBackground
                  }
                  style={{
                    display: "none",
                  }}
                />
              </label>

              <div style={hintStyle}>
                {t.backgroundHint}
              </div>
            </div>
          </div>
        </div>

        {/* LINKS */}

        <div style={sectionStyle}>
          <div
            style={
              sectionHeaderStyle
            }
          >
            <h2
              style={
                sectionTitleStyle
              }
            >
              {t.links}
            </h2>

            <span
              style={counterStyle}
            >
              {links.length}
            </span>
          </div>

          {links.map(
            (link, index) => (
              <div
                key={
                  link.id ||
                  link.temp_id
                }
                style={linkBoxStyle}
              >
                <div
                  style={linkTopStyle}
                >
                  <select
                    value={
                      link.icon ||
                      "website"
                    }
                    onChange={(
                      event
                    ) =>
                      updateLink(
                        index,
                        "icon",
                        event.target
                          .value
                      )
                    }
                    style={
                      selectStyle
                    }
                  >
                    <option value="telegram">
                      Telegram
                    </option>

                    <option value="whatsapp">
                      WhatsApp
                    </option>

                    <option value="instagram">
                      Instagram
                    </option>

                    <option value="phone">
                      Telefon
                    </option>

                    <option value="youtube">
                      YouTube
                    </option>

                    <option value="tiktok">
                      TikTok
                    </option>

                    <option value="facebook">
                      Facebook
                    </option>

                    <option value="linkedin">
                      LinkedIn
                    </option>

                    <option value="email">
                      Email
                    </option>

                    <option value="website">
                      Website
                    </option>

                    <option value="location">
                      Manzil
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      removeLink(
                        index
                      )
                    }
                    style={
                      deleteButtonStyle
                    }
                  >
                    ×
                  </button>
                </div>

                <input
                  value={
                    link.label ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    updateLink(
                      index,
                      "label",
                      event.target
                        .value
                    )
                  }
                  placeholder={
                    t.linkName
                  }
                  style={
                    inputStyle
                  }
                />

                <input
                  value={
                    link.url || ""
                  }
                  onChange={(
                    event
                  ) =>
                    updateLink(
                      index,
                      "url",
                      event.target
                        .value
                    )
                  }
                  placeholder="https://..."
                  style={{
                    ...inputStyle,
                    marginBottom: 0,
                  }}
                />
              </div>
            )
          )}

          <button
            type="button"
            onClick={addLink}
            style={addButtonStyle}
          >
            ＋ {t.addLink}
          </button>
        </div>

        {/* SAVE */}

        <button
          type="button"
          onClick={saveEverything}
          disabled={saving}
          style={{
            ...saveButtonStyle,

            opacity:
              saving
                ? 0.65
                : 1,
          }}
        >
          {t.save}
        </button>
      </section>

      {/* =====================================================
          LANGUAGE MODAL
      ===================================================== */}

      {showLanguage && (
        <div
          style={
            modalOverlayStyle
          }
        >
          <div
            dir="ltr"
            style={
              languageModalStyle
            }
          >
            <div
              style={
                languageGlobeStyle
              }
            >
              🌐
            </div>

            <h2
              style={
                modalTitleStyle
              }
            >
              {language
                ? t.selectLanguage
                : "Tilni tanlang · Выберите язык · Choose language"}
            </h2>

            <p
              style={
                modalDescriptionStyle
              }
            >
              {language
                ? t.languageDescription
                : "Davom etish uchun tilni tanlang"}
            </p>

            <input
              autoFocus
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
                language
                  ? t.searchLanguage
                  : "Tilni qidirish..."
              }
              style={
                languageSearchStyle
              }
            />

            <div
              style={
                languageListStyle
              }
            >
              {filteredLanguages.map(
                (item) => (
                  <button
                    key={
                      item.code
                    }
                    type="button"
                    disabled={
                      savingLanguage
                    }
                    onClick={() =>
                      selectLanguage(
                        item.code
                      )
                    }
                    style={{
                      ...languageItemStyle,

                      ...(language ===
                      item.code
                        ? languageSelectedStyle
                        : {}),
                    }}
                  >
                    <span
                      style={
                        flagStyle
                      }
                    >
                      {item.flag}
                    </span>

                    <span
                      style={{
                        flex: 1,
                      }}
                    >
                      {item.name}
                    </span>

                    {language ===
                      item.code && (
                      <span>
                        ✓
                      </span>
                    )}
                  </button>
                )
              )}

              {filteredLanguages.length ===
                0 && (
                <div
                  style={
                    notFoundStyle
                  }
                >
                  {t.notFound}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   PAGE DESIGN
========================================================= */

const pageStyle = {
  minHeight: "100vh",
  position: "relative",
  overflowX: "hidden",

  padding: "28px 16px 60px",

  boxSizing: "border-box",

  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  background: "#eef2f6",
};

const emptyPageStyle = {
  minHeight: "100vh",
  background: "#eef2f6",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,

  background:
    "linear-gradient(135deg, rgba(240,245,250,.86), rgba(255,255,255,.68))",
};

const editorStyle = {
  position: "relative",
  zIndex: 2,

  width: "100%",
  maxWidth: 620,

  margin: "0 auto",

  padding: 26,

  boxSizing: "border-box",

  border:
    "1px solid rgba(255,255,255,.72)",

  borderRadius: 28,

  background:
    "rgba(255,255,255,.88)",

  backdropFilter:
    "blur(22px)",

  WebkitBackdropFilter:
    "blur(22px)",

  boxShadow:
    "0 20px 65px rgba(15,23,42,.12)",
};

const topStyle = {
  display: "flex",

  alignItems: "flex-start",

  justifyContent:
    "space-between",

  gap: 15,

  marginBottom: 28,
};

const smallTitleStyle = {
  marginBottom: 7,

  fontSize: 11,

  fontWeight: 800,

  letterSpacing: 1.5,

  color: "#3977ef",
};

const titleStyle = {
  margin: 0,

  fontSize: 27,

  lineHeight: 1.15,

  color: "#172033",
};

const languageButtonStyle = {
  flexShrink: 0,

  border:
    "1px solid rgba(15,23,42,.08)",

  borderRadius: 14,

  background:
    "rgba(255,255,255,.78)",

  padding:
    "10px 13px",

  fontSize: 13,

  fontWeight: 800,

  color: "#172033",

  cursor: "pointer",
};

const labelStyle = {
  display: "block",

  marginBottom: 8,

  fontSize: 13,

  fontWeight: 700,

  color: "#39445a",
};

const inputStyle = {
  width: "100%",

  boxSizing: "border-box",

  marginBottom: 20,

  padding:
    "14px 15px",

  border:
    "1px solid rgba(15,23,42,.09)",

  outline: "none",

  borderRadius: 15,

  background:
    "rgba(247,249,252,.92)",

  color: "#172033",

  fontSize: 15,

  lineHeight: 1.4,
};

const sectionStyle = {
  marginTop: 8,

  marginBottom: 22,

  padding: 18,

  border:
    "1px solid rgba(15,23,42,.07)",

  borderRadius: 20,

  background:
    "rgba(248,250,252,.72)",
};

const sectionTitleStyle = {
  margin: 0,

  fontSize: 15,

  fontWeight: 800,

  color: "#202a3b",
};

const sectionHeaderStyle = {
  display: "flex",

  alignItems: "center",

  justifyContent:
    "space-between",

  marginBottom: 15,
};

const counterStyle = {
  minWidth: 28,

  height: 28,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  borderRadius: 999,

  background: "#e8eef9",

  color: "#3977ef",

  fontSize: 12,

  fontWeight: 800,
};

const uploadRowStyle = {
  display: "flex",

  alignItems: "center",

  gap: 16,

  marginTop: 15,
};

const avatarStyle = {
  width: 78,

  height: 78,

  flexShrink: 0,

  objectFit: "cover",

  borderRadius: "50%",

  border:
    "4px solid rgba(255,255,255,.9)",

  boxShadow:
    "0 8px 24px rgba(15,23,42,.15)",
};

const emptyAvatarStyle = {
  width: 78,

  height: 78,

  flexShrink: 0,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  borderRadius: "50%",

  background: "#e8edf3",

  fontSize: 30,
};

const backgroundPreviewStyle = {
  width: 100,

  height: 75,

  flexShrink: 0,

  objectFit: "cover",

  borderRadius: 14,

  boxShadow:
    "0 7px 20px rgba(15,23,42,.12)",
};

const emptyBackgroundStyle = {
  width: 100,

  height: 75,

  flexShrink: 0,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  borderRadius: 14,

  background: "#e8edf3",

  fontSize: 27,
};

const uploadButtonStyle = {
  display: "inline-block",

  padding:
    "11px 14px",

  borderRadius: 13,

  background: "#172033",

  color: "white",

  fontSize: 13,

  fontWeight: 700,

  cursor: "pointer",
};

const hintStyle = {
  marginTop: 8,

  color: "#8791a2",

  fontSize: 11,

  lineHeight: 1.4,
};

const linkBoxStyle = {
  marginBottom: 12,

  padding: 14,

  border:
    "1px solid rgba(15,23,42,.07)",

  borderRadius: 17,

  background:
    "rgba(255,255,255,.78)",
};

const linkTopStyle = {
  display: "flex",

  gap: 10,

  alignItems: "center",

  marginBottom: 12,
};

const selectStyle = {
  flex: 1,

  minWidth: 0,

  padding:
    "12px 13px",

  border:
    "1px solid rgba(15,23,42,.09)",

  borderRadius: 13,

  outline: "none",

  background: "#f7f9fc",

  color: "#172033",

  fontSize: 14,
};

const deleteButtonStyle = {
  width: 42,

  height: 42,

  flexShrink: 0,

  border: 0,

  borderRadius: 13,

  background: "#fff0f0",

  color: "#e5484d",

  fontSize: 24,

  lineHeight: 1,

  cursor: "pointer",
};

const addButtonStyle = {
  width: "100%",

  padding:
    "13px 15px",

  border:
    "1px dashed rgba(57,119,239,.35)",

  borderRadius: 15,

  background:
    "rgba(57,119,239,.06)",

  color: "#3977ef",

  fontSize: 14,

  fontWeight: 800,

  cursor: "pointer",
};

const saveButtonStyle = {
  width: "100%",

  marginTop: 6,

  padding:
    "16px 18px",

  border: 0,

  borderRadius: 17,

  background: "#3977ef",

  color: "white",

  boxShadow:
    "0 10px 28px rgba(57,119,239,.25)",

  fontSize: 15,

  fontWeight: 800,

  cursor: "pointer",
};

/* =========================================================
   LANGUAGE MODAL DESIGN
========================================================= */

const modalOverlayStyle = {
  position: "fixed",

  inset: 0,

  zIndex: 1000,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  padding: 18,

  background:
    "rgba(15,23,42,.40)",

  backdropFilter:
    "blur(12px)",

  WebkitBackdropFilter:
    "blur(12px)",
};

const languageModalStyle = {
  width: "100%",

  maxWidth: 430,

  maxHeight: "86vh",

  overflow: "hidden",

  padding: 22,

  boxSizing: "border-box",

  border:
    "1px solid rgba(255,255,255,.7)",

  borderRadius: 26,

  background:
    "rgba(255,255,255,.96)",

  boxShadow:
    "0 30px 90px rgba(15,23,42,.28)",
};

const languageGlobeStyle = {
  width: 48,

  height: 48,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  marginBottom: 14,

  borderRadius: 15,

  background: "#edf3ff",

  fontSize: 23,
};

const modalTitleStyle = {
  margin: 0,

  color: "#172033",

  fontSize: 22,

  lineHeight: 1.2,
};

const modalDescriptionStyle = {
  margin:
    "8px 0 18px",

  color: "#7a8495",

  fontSize: 13,
};

const languageSearchStyle = {
  width: "100%",

  boxSizing: "border-box",

  marginBottom: 12,

  padding:
    "13px 14px",

  border:
    "1px solid rgba(15,23,42,.1)",

  borderRadius: 14,

  outline: "none",

  background: "#f5f7fa",

  color: "#172033",

  fontSize: 14,
};

const languageListStyle = {
  maxHeight: "52vh",

  overflowY: "auto",

  paddingRight: 2,
};

const languageItemStyle = {
  width: "100%",

  display: "flex",

  alignItems: "center",

  gap: 12,

  marginBottom: 7,

  padding:
    "12px 13px",

  border:
    "1px solid rgba(15,23,42,.07)",

  borderRadius: 14,

  background: "#fff",

  color: "#172033",

  textAlign: "left",

  fontSize: 14,

  fontWeight: 700,

  cursor: "pointer",
};

const languageSelectedStyle = {
  border:
    "1px solid rgba(57,119,239,.35)",

  background: "#edf3ff",

  color: "#3977ef",
};

const flagStyle = {
  fontSize: 21,
};

const notFoundStyle = {
  padding: 20,

  textAlign: "center",

  color: "#8791a2",

  fontSize: 13,
};

const centerStyle = {
  minHeight: "100vh",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  padding: 20,

  boxSizing: "border-box",

  background: "#f4f6f9",

  color: "#657083",

  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};
