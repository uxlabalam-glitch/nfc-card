"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yzkeabplmbxkvyschlop.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Alifbo tartibida
const LANGUAGES = [
  { code: "ar", name: "العربية" },
  { code: "de", name: "Deutsch" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ja", name: "日本語" },
  { code: "kk", name: "Қазақша" },
  { code: "ko", name: "한국어" },
  { code: "ru", name: "Русский" },
  { code: "tr", name: "Türkçe" },
  { code: "uz", name: "O‘zbekcha" },
  { code: "zh", name: "中文" },
];

export default function Home() {
  const [telegramId, setTelegramId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLanguages, setShowLanguages] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function startApp() {
      try {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
          setError("Mini App Telegram orqali ochilishi kerak.");
          return;
        }

        tg.ready();
        tg.expand();

        const telegramUser = tg.initDataUnsafe?.user;

        if (!telegramUser?.id) {
          setError("Telegram foydalanuvchisi aniqlanmadi.");
          return;
        }

        const userId = Number(telegramUser.id);

        setTelegramId(userId);

        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("telegram_id", userId)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        // Profil hali mavjud emas
        if (!data) {
          setShowLanguages(true);
          return;
        }

        setProfile(data);

        // Profil bor, lekin til hali tanlanmagan
        if (!data.language) {
          setShowLanguages(true);
          return;
        }

        // Til avval saqlangan.
        // Qayta til so‘ramaydi.
        window.location.replace(`/edit/${data.card_id}`);
      } catch (err) {
        console.error(err);
        setError(err?.message || "Xatolik yuz berdi.");
      }
    }

    startApp();
  }, []);

  async function selectLanguage(languageCode) {
    try {
      if (!telegramId) {
        return;
      }

      // Eski profil mavjud
      if (profile) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            language: languageCode,
          })
          .eq("id", profile.id);

        if (updateError) {
          throw updateError;
        }

        window.location.replace(`/edit/${profile.card_id}`);
        return;
      }

      // Yangi foydalanuvchi
      const cardId = `card-${telegramId}`;

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          telegram_id: telegramId,
          card_id: cardId,
          full_name: "",
          bio: "",
          language: languageCode,
          is_premium: false,
        });

      if (insertError) {
        throw insertError;
      }

      window.location.replace(`/edit/${cardId}`);
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "Tilni saqlashda xatolik yuz berdi."
      );
    }
  }

  // Xatolik bo‘lsa
  if (error) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.errorBox}>
            {error}
          </div>
        </div>
      </main>
    );
  }

  // Birinchi kirishda til tanlash
  if (showLanguages) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <div style={styles.languageCard}>
            <div style={styles.icon}>🌐</div>

            <h1 style={styles.title}>
              Tilni tanlang
            </h1>

            <div style={styles.subtitle}>
              Choose your language
            </div>

            <div style={styles.languageGrid}>
              {LANGUAGES.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  style={styles.languageButton}
                  onClick={() =>
                    selectLanguage(language.code)
                  }
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Tekshirayotgan paytda hech qanday yozuv chiqmaydi
  return <main style={styles.page} />;
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    background:
      "linear-gradient(145deg, #07111f 0%, #111827 50%, #08101d 100%)",
    color: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  container: {
    width: "100%",
    maxWidth: "460px",
    margin: "0 auto",
    padding: "28px 18px 40px",
    boxSizing: "border-box",
  },

  languageCard: {
    width: "100%",
    padding: "28px 18px",
    boxSizing: "border-box",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.13)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },

  icon: {
    width: "66px",
    height: "66px",
    margin: "0 auto 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.10)",
    fontSize: "32px",
  },

  title: {
    margin: 0,
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "800",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "26px",
    textAlign: "center",
    fontSize: "15px",
    color: "rgba(255,255,255,0.58)",
  },

  languageGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  languageButton: {
    width: "100%",
    minHeight: "54px",
    padding: "10px 8px",
    border: "1px solid rgba(255,255,255,0.13)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.09)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  errorBox: {
    marginTop: "30px",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(220,38,38,0.16)",
    border: "1px solid rgba(248,113,113,0.35)",
    fontSize: "15px",
    lineHeight: "1.5",
  },
};
