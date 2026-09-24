"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

/* =========================
   TILLAR
========================= */

const LANGUAGES = [
  { code: "uz", name: "O‘zbekcha", native: "O‘zbekcha", flag: "🇺🇿" },
  { code: "ru", name: "Русский", native: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", native: "Türkçe", flag: "🇹🇷" },
  { code: "kk", name: "Қазақша", native: "Қазақша", flag: "🇰🇿" },
  { code: "ar", name: "العربية", native: "العربية", flag: "🇸🇦", rtl: true },
  { code: "zh", name: "中文", native: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", native: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", native: "한국어", flag: "🇰🇷" },
  { code: "de", name: "Deutsch", native: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", native: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", native: "Español", flag: "🇪🇸" },
];

const TEXTS = {
  uz: {
    digitalCard: "RAQAMLI TASHRIF QOG‘OZI",
    editProfile: "Profilni tahrirlash",
    name: "Ism",
    namePlaceholder: "Ismingiz",
    bio: "Biografiya / lavozim",
    bioPlaceholder: "Masalan: Direktor, tadbirkor...",
    profilePhoto: "Profil rasmi",
    uploadPhoto: "Rasm yuklash",
    uploading: "Yuklanmoqda...",
    photoHint: "JPG, PNG, WEBP — maksimal 5 MB",
    photoDelete: "Yangi rasm yuklanganda avvalgisi avtomatik o‘chiriladi.",
    background: "Orqa fon rasmi",
    uploadBackground: "Fon yuklash",
    backgroundHint: "JPG, PNG, WEBP — maksimal 10 MB",
    backgroundDelete: "Yangi fon yuklanganda eski fon Storage’dan o‘chiriladi.",
    links: "Havolalar",
    linkName: "Nomi, masalan Telegram",
    addLink: "Yangi havola qo‘shish",
    save: "Saqlash",
    saving: "Saqlanmoqda...",
    preview: "Vizitkani ko‘rish",
    chooseLanguage: "Tilni tanlang",
    chooseLanguageInfo: "Davom etish uchun interfeys tilini tanlang",
    changeLanguage: "Tilni almashtirish",
    saved: "Saqlandi ✅",
    enterName: "Ismni kiriting.",
    cardNotFound: "Vizitka topilmadi.",
    loading: "Yuklanmoqda...",
    phone: "Telefon",
    location: "Manzil",
  },

  ru: {
    digitalCard: "ЦИФРОВАЯ ВИЗИТКА",
    editProfile: "Редактировать профиль",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    bio: "Биография / должность",
    bioPlaceholder: "Например: Директор, предприниматель...",
    profilePhoto: "Фото профиля",
    uploadPhoto: "Загрузить фото",
    uploading: "Загрузка...",
    photoHint: "JPG, PNG, WEBP — максимум 5 МБ",
    photoDelete: "При загрузке нового фото предыдущее будет удалено.",
    background: "Фоновое изображение",
    uploadBackground: "Загрузить фон",
    backgroundHint: "JPG, PNG, WEBP — максимум 10 МБ",
    backgroundDelete: "При загрузке нового фона старый будет удалён.",
    links: "Ссылки",
    linkName: "Название, например Telegram",
    addLink: "Добавить ссылку",
    save: "Сохранить",
    saving: "Сохранение...",
    preview: "Посмотреть визитку",
    chooseLanguage: "Выберите язык",
    chooseLanguageInfo: "Выберите язык интерфейса, чтобы продолжить",
    changeLanguage: "Сменить язык",
    saved: "Сохранено ✅",
    enterName: "Введите имя.",
    cardNotFound: "Визитка не найдена.",
    loading: "Загрузка...",
    phone: "Телефон",
    location: "Адрес",
  },

  en: {
    digitalCard: "DIGITAL BUSINESS CARD",
    editProfile: "Edit profile",
    name: "Name",
    namePlaceholder: "Your name",
    bio: "Biography / position",
    bioPlaceholder: "For example: Director, entrepreneur...",
    profilePhoto: "Profile photo",
    uploadPhoto: "Upload photo",
    uploading: "Uploading...",
    photoHint: "JPG, PNG, WEBP — maximum 5 MB",
    photoDelete: "The previous photo will be deleted when a new one is uploaded.",
    background: "Background image",
    uploadBackground: "Upload background",
    backgroundHint: "JPG, PNG, WEBP — maximum 10 MB",
    backgroundDelete: "The old background will be deleted when a new one is uploaded.",
    links: "Links",
    linkName: "Name, for example Telegram",
    addLink: "Add new link",
    save: "Save",
    saving: "Saving...",
    preview: "View business card",
    chooseLanguage: "Choose your language",
    chooseLanguageInfo: "Select the interface language to continue",
    changeLanguage: "Change language",
    saved: "Saved ✅",
    enterName: "Enter your name.",
    cardNotFound: "Business card not found.",
    loading: "Loading...",
    phone: "Phone",
    location: "Location",
  },
};

/* Boshqa tillarda hozircha English interfeys fallback bo‘ladi */
function getText(language) {
  return TEXTS[language] || TEXTS.en;
}

export default function EditCardPage() {
  const params = useParams();
  const cardId = params.id;

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");

  const [language, setLanguage] = useState("");
  const [showLanguage, setShowLanguage] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [savingLanguage, setSavingLanguage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);

  const t = getText(language || "en");

  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) || LANGUAGES[2];

  const rtl = Boolean(currentLanguage?.rtl);

  useEffect(() => {
    if (cardId) loadData();
  }, [cardId]);

  async function loadData() {
    setLoading(true);

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("card_id", cardId)
      .single();

    if (error || !profileData) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProfile(profileData);
    setFullName(profileData.full_name || "");
    setBio(profileData.bio || "");
    setPhotoUrl(profileData.photo_url || "");
    setBackgroundUrl(profileData.background_url || "");

    const savedLanguage = profileData.language || "";

    setLanguage(savedLanguage);

    if (!savedLanguage) {
      setShowLanguage(true);
    }

    const { data: linkData, error: linkError } = await supabase
      .from("links")
      .select("*")
      .eq("profile_id", profileData.id)
      .order("sort_order", { ascending: true });

    if (linkError) console.error(linkError);

    setLinks(linkData || []);
    setLoading(false);
  }

  async function selectLanguage(code) {
    if (!profile || savingLanguage) return;

    setSavingLanguage(true);

    const { error } = await supabase
      .from("profiles")
      .update({ language: code })
      .eq("id", profile.id);

    if (error) {
      console.error(error);
      alert("Language save error: " + error.message);
      setSavingLanguage(false);
      return;
    }

    setLanguage(code);
    setProfile((current) => ({
      ...current,
      language: code,
    }));

    setShowLanguage(false);
    setLanguageSearch("");
    setSavingLanguage(false);
  }

  function getStoragePath(publicUrl, bucket) {
    if (!publicUrl) return null;

    const marker = `/storage/v1/object/public/${bucket}/`;

    if (!publicUrl.includes(marker)) return null;

    return decodeURIComponent(publicUrl.split(marker)[1]);
  }

  async function deleteOldFile(publicUrl, bucket) {
    const path = getStoragePath(publicUrl, bucket);
    if (!path) return;

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error("Eski faylni o‘chirish xatosi:", error);
    }
  }

  async function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum image size is 5 MB.");
      return;
    }

    setUploadingPhoto(true);

    try {
      const oldUrl = photoUrl;
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${profile.id}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const newUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ photo_url: newUrl })
        .eq("id", profile.id);

      if (updateError) {
        await supabase.storage.from("avatars").remove([fileName]);
        throw updateError;
      }

      setPhotoUrl(newUrl);

      if (oldUrl && oldUrl !== newUrl) {
        await deleteOldFile(oldUrl, "avatars");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error: " + error.message);
    } finally {
      setUploadingPhoto(false);
      event.target.value = "";
    }
  }

  async function uploadBackground(event) {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Maximum background size is 10 MB.");
      return;
    }

    setUploadingBackground(true);

    try {
      const oldUrl = backgroundUrl;
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `${profile.id}-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("backgrounds")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("backgrounds")
        .getPublicUrl(fileName);

      const newUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ background_url: newUrl })
        .eq("id", profile.id);

      if (updateError) {
        await supabase.storage.from("backgrounds").remove([fileName]);
        throw updateError;
      }

      setBackgroundUrl(newUrl);

      if (oldUrl && oldUrl !== newUrl) {
        await deleteOldFile(oldUrl, "backgrounds");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error: " + error.message);
    } finally {
      setUploadingBackground(false);
      event.target.value = "";
    }
  }

  function addLink() {
    setLinks((current) => [
      ...current,
      {
        temp_id:
          Date.now().toString() + Math.random().toString(36).slice(2),
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
        i === index ? { ...link, [field]: value } : link
      )
    );
  }

  async function removeLink(index) {
    const link = links[index];

    if (link?.id) {
      const { error } = await supabase
        .from("links")
        .delete()
        .eq("id", link.id);

      if (error) {
        alert("Delete error: " + error.message);
        return;
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
  }

  async function saveEverything() {
    if (!profile) return;

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
          language: language || null,
        })
        .eq("id", profile.id);

      if (profileError) throw profileError;

      const existingIds = links
        .filter((link) => link.id)
        .map((link) => link.id);

      const { data: existingDbLinks } = await supabase
        .from("links")
        .select("id")
        .eq("profile_id", profile.id);

      const idsToDelete =
        existingDbLinks
          ?.filter((item) => !existingIds.includes(item.id))
          .map((item) => item.id) || [];

      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("links")
          .delete()
          .in("id", idsToDelete);

        if (deleteError) throw deleteError;
      }

      for (let i = 0; i < links.length; i++) {
        const link = links[i];

        if (!link.label?.trim() && !link.url?.trim()) continue;

        const payload = {
          profile_id: profile.id,
          label: link.label?.trim() || "Link",
          url: link.url?.trim() || "",
          icon: link.icon || "website",
          sort_order: i,
        };

        if (link.id) {
          const { error } = await supabase
            .from("links")
            .update(payload)
            .eq("id", link.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("links")
            .insert(payload);

          if (error) throw error;
        }
      }

      alert(t.saved);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Save error: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  const filteredLanguages = LANGUAGES.filter((item) => {
    const q = languageSearch.toLowerCase().trim();

    return (
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.native.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <main style={loadingStyle}>Loading...</main>;
  }

  if (!profile) {
    return <main style={loadingStyle}>{t.cardNotFound}</main>;
  }

  return (
    <main style={pageStyle} dir={rtl ? "rtl" : "ltr"}>
      {backgroundUrl && (
        <div
          style={{
            position: "fixed",
            inset: "-25px",
            backgroundImage: `url("${backgroundUrl}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            transform: "scale(1.05)",
            opacity: 0.55,
          }}
        />
      )}

      <div style={overlayStyle} />

      <section style={editorStyle}>
        <div style={topStyle}>
          <div>
            <div style={smallTitle}>{t.digitalCard}</div>
            <h1 style={titleStyle}>{t.editProfile}</h1>
          </div>

          <button
            type="button"
            onClick={() => setShowLanguage(true)}
            style={languageStyle}
            title={t.changeLanguage}
          >
            🌐 {currentLanguage.code.toUpperCase()}
          </button>
        </div>

        <label style={labelStyle}>{t.name}</label>

        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t.namePlaceholder}
          style={inputStyle}
        />

        <label style={labelStyle}>{t.bio}</label>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder={t.bioPlaceholder}
          style={{
            ...inputStyle,
            minHeight: "90px",
            resize: "vertical",
          }}
        />

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>{t.profilePhoto}</h2>

          <div style={uploadRowStyle}>
            <div>
              {photoUrl ? (
                <img src={photoUrl} alt="Avatar" style={avatarStyle} />
              ) : (
                <div style={emptyAvatarStyle}>👤</div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <label style={uploadButtonStyle}>
                {uploadingPhoto ? t.uploading : `📷 ${t.uploadPhoto}`}

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadPhoto}
                  disabled={uploadingPhoto}
                  style={{ display: "none" }}
                />
              </label>

              <div style={hintStyle}>{t.photoHint}</div>
              <div style={hintStyle}>{t.photoDelete}</div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>{t.background}</h2>

          <div style={uploadRowStyle}>
            {backgroundUrl ? (
              <img
                src={backgroundUrl}
                alt="Background"
                style={backgroundPreviewStyle}
              />
            ) : (
              <div style={emptyBackgroundStyle}>🖼️</div>
            )}

            <div style={{ flex: 1 }}>
              <label style={uploadButtonStyle}>
                {uploadingBackground
                  ? t.uploading
                  : `🖼️ ${t.uploadBackground}`}

                <input
                  type="file"
                  accept="image/*"
                  onChange={uploadBackground}
                  disabled={uploadingBackground}
                  style={{ display: "none" }}
                />
              </label>

              <div style={hintStyle}>{t.backgroundHint}</div>
              <div style={hintStyle}>{t.backgroundDelete}</div>
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>{t.links}</h2>
            <span style={counterStyle}>{links.length}</span>
          </div>

          {links.map((link, index) => (
            <div
              key={link.id || link.temp_id}
              style={linkBoxStyle}
            >
              <div style={linkTopStyle}>
                <select
                  value={link.icon || "website"}
                  onChange={(e) =>
                    updateLink(index, "icon", e.target.value)
                  }
                  style={selectStyle}
                >
                  <option value="telegram">Telegram</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="phone">{t.phone}</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="email">Email</option>
                  <option value="website">Website</option>
                  <option value="location">{t.location}</option>
                </select>

                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  style={deleteButtonStyle}
                >
                  🗑
                </button>
              </div>

              <input
                value={link.label || ""}
                onChange={(e) =>
                  updateLink(index, "label", e.target.value)
                }
                placeholder={t.linkName}
                style={inputStyle}
              />

              <input
                value={link.url || ""}
                onChange={(e) =>
                  updateLink(index, "url", e.target.value)
                }
                placeholder="https://..."
                style={{
                  ...inputStyle,
                  marginBottom: 0,
                }}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addLink}
            style={addButtonStyle}
          >
            ＋ {t.addLink}
          </button>
        </div>

        <button
          type="button"
          onClick={saveEverything}
          disabled={saving}
          style={{
            ...saveButtonStyle,
            opacity: saving ? 0.65 : 1,
          }}
        >
          {saving ? t.saving : t.save}
        </button>

        <a
          href={`/c/${cardId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={previewButtonStyle}
        >
          👁 {t.preview}
        </a>
      </section>

      {showLanguage && (
        <div style={languageOverlayStyle}>
          <div
            style={languageModalStyle}
            dir="ltr"
          >
            <div style={languageIconStyle}>🌐</div>

            <h2 style={languageTitleStyle}>
              {language ? t.chooseLanguage : "Choose your language"}
            </h2>

            <p style={languageDescriptionStyle}>
              {language
                ? t.chooseLanguageInfo
                : "Tilni tanlang · Выберите язык · Choose your language"}
            </p>

            <input
              type="text"
              value={languageSearch}
              onChange={(e) => setLanguageSearch(e.target.value)}
              placeholder="Search language..."
              style={languageSearchStyle}
            />

            <div style={languageListStyle}>
              {filteredLanguages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  disabled={savingLanguage}
                  onClick={() => selectLanguage(item.code)}
                  style={{
                    ...languageOptionStyle,
                    ...(language === item.code
                      ? languageOptionActiveStyle
                      : {}),
                  }}
                >
                  <span style={flagStyle}>{item.flag}</span>

                  <span style={{ flex: 1 }}>
                    {item.native}
                  </span>

                  {language === item.code && (
                    <span style={checkStyle}>✓</span>
                  )}
                </button>
              ))}
            </div>

            {language && (
              <button
                type="button"
                onClick={() => {
                  setShowLanguage(false);
                  setLanguageSearch("");
                }}
                style={languageCloseStyle}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================
   DIZAYN
========================= */

const pageStyle = {
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  padding: "30px 16px",
  boxSizing: "border-box",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background:
    "linear-gradient(135deg, rgba(240,246,255,.80), rgba(255,255,255,.60))",
};

const editorStyle = {
  position: "relative",
  zIndex: 2,
  width: "100%",
  maxWidth: "620px",
  margin: "0 auto",
  padding: "28px",
  borderRadius: "28px",
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  boxShadow:
    "0 20px 70px rgba(20,60,120,0.16)",
  boxSizing: "border-box",
};

const topStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "30px",
};

const smallTitle = {
  color: "#2879ff",
  fontSize: "11px",
  fontWeight: "800",
  letterSpacing: "1.2px",
  marginBottom: "8px",
};

const titleStyle = {
  margin: 0,
  color: "#101828",
  fontSize: "28px",
};

const languageStyle = {
  padding: "10px 14px",
  background: "#fff",
  border: "1px solid #e3e8ef",
  borderRadius: "14px",
  fontSize: "14px",
  boxShadow:
    "0 5px 20px rgba(0,0,0,.05)",
  cursor: "pointer",
  color: "#172033",
  whiteSpace: "nowrap",
};

const labelStyle = {
  display: "block",
  fontWeight: "700",
  color: "#182230",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  marginBottom: "16px",
  boxSizing: "border-box",
  border: "1px solid #d9e0ea",
  borderRadius: "12px",
  background: "rgba(255,255,255,.94)",
  color: "#101828",
  fontSize: "15px",
  outline: "none",
};

const sectionStyle = {
  marginTop: "12px",
  marginBottom: "26px",
  paddingTop: "22px",
  borderTop: "1px solid #e7ebf0",
};

const sectionTitleStyle = {
  margin: "0 0 16px",
  color: "#101828",
  fontSize: "18px",
};

const sectionHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const counterStyle = {
  marginBottom: "16px",
  padding: "4px 8px",
  borderRadius: "20px",
  background: "#eaf2ff",
  color: "#1672ff",
  fontSize: "12px",
  fontWeight: "700",
};

const uploadRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const avatarStyle = {
  width: "95px",
  height: "95px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid white",
  boxShadow:
    "0 8px 25px rgba(0,0,0,.15)",
};

const emptyAvatarStyle = {
  ...avatarStyle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#eef1f5",
  fontSize: "32px",
};

const backgroundPreviewStyle = {
  width: "105px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "14px",
  boxShadow:
    "0 8px 25px rgba(0,0,0,.12)",
};

const emptyBackgroundStyle = {
  ...backgroundPreviewStyle,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#eef1f5",
  fontSize: "30px",
};

const uploadButtonStyle = {
  display: "inline-block",
  padding: "11px 16px",
  borderRadius: "11px",
  background:
    "linear-gradient(135deg,#2385ff,#0865ef)",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "14px",
};

const hintStyle = {
  color: "#7b8494",
  fontSize: "12px",
  marginTop: "8px",
  lineHeight: "1.4",
};

const linkBoxStyle = {
  padding: "15px",
  marginBottom: "12px",
  background: "rgba(255,255,255,.78)",
  border: "1px solid #e5eaf0",
  borderRadius: "16px",
};

const linkTopStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "12px",
};

const selectStyle = {
  flex: 1,
  padding: "11px",
  borderRadius: "10px",
  border: "1px solid #d9e0ea",
  background: "white",
  fontSize: "14px",
};

const deleteButtonStyle = {
  width: "44px",
  border: "none",
  borderRadius: "10px",
  background: "#fff0f0",
  color: "#ff3333",
  cursor: "pointer",
  fontSize: "18px",
};

const addButtonStyle = {
  width: "100%",
  padding: "13px",
  border: "1px dashed #8ab8ff",
  borderRadius: "12px",
  background: "#eef5ff",
  color: "#0874ff",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
};

const saveButtonStyle = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "13px",
  background:
    "linear-gradient(135deg,#2489ff,#0567f1)",
  color: "white",
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow:
    "0 10px 25px rgba(20,110,255,.25)",
};

const previewButtonStyle = {
  display: "block",
  width: "100%",
  marginTop: "12px",
  padding: "14px",
  boxSizing: "border-box",
  textAlign: "center",
  textDecoration: "none",
  borderRadius: "13px",
  background: "#eef3f9",
  color: "#172033",
  fontSize: "14px",
  fontWeight: "700",
};

const loadingStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: "18px",
};

/* =========================
   TIL TANLASH MODALI
========================= */

const languageOverlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "rgba(8,18,35,.58)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
};

const languageModalStyle = {
  position: "relative",
  width: "100%",
  maxWidth: "440px",
  maxHeight: "85vh",
  overflow: "hidden",
  padding: "28px",
  boxSizing: "border-box",
  background: "rgba(255,255,255,.97)",
  borderRadius: "28px",
  boxShadow: "0 30px 100px rgba(0,0,0,.25)",
};

const languageIconStyle = {
  width: "56px",
  height: "56px",
  margin: "0 auto 14px",
  borderRadius: "18px",
  background: "#eaf3ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "27px",
};

const languageTitleStyle = {
  margin: "0 0 8px",
  textAlign: "center",
  color: "#101828",
  fontSize: "25px",
};

const languageDescriptionStyle = {
  margin: "0 0 20px",
  textAlign: "center",
  color: "#667085",
  fontSize: "14px",
  lineHeight: "1.5",
};

const languageSearchStyle = {
  width: "100%",
  padding: "13px 14px",
  marginBottom: "14px",
  boxSizing: "border-box",
  border: "1px solid #d9e0ea",
  borderRadius: "13px",
  outline: "none",
  fontSize: "15px",
};

const languageListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  maxHeight: "48vh",
  overflowY: "auto",
};

const languageOptionStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  border: "1px solid #e4e9f0",
  borderRadius: "13px",
  background: "#fff",
  color: "#172033",
  fontSize: "15px",
  fontWeight: "600",
  textAlign: "left",
  cursor: "pointer",
};

const languageOptionActiveStyle = {
  border: "1px solid #2385ff",
  background: "#edf5ff",
};

const flagStyle = {
  fontSize: "23px",
};

const checkStyle = {
  color: "#0874ff",
  fontWeight: "900",
  fontSize: "18px",
};

const languageCloseStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  width: "36px",
  height: "36px",
  border: "none",
  borderRadius: "50%",
  background: "#eef1f5",
  color: "#344054",
  cursor: "pointer",
  fontSize: "16px",
};
