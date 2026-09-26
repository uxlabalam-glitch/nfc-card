"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yzkeabplmbxkvyschlop.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

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
    search: "azerbaijani azeri azərbaycan azerbaijan",
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
    search: "kazakh қазақша qazaq kazakhstan",
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
    search: "kyrgyz кыргызча kirgiz kyrgyzstan",
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
    search: "persian farsi فارسی iran",
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
    search: "russian russian rus русский russkiy",
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
    search: "turkmen türkmençe turkmenistan",
  },
  {
    code: "uk",
    name: "Українська",
    english: "Ukrainian",
    search: "ukrainian українська ukraine",
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
    search: "uzbek o‘zbekcha ozbek uz o'zbek uzbekistan",
  },
  {
    code: "vi",
    name: "Tiếng Việt",
    english: "Vietnamese",
    search: "vietnamese vietnam tiếng việt",
  },
].sort((a, b) => a.english.localeCompare(b.english));

export default function Home() {
  const [telegramId, setTelegramId] = useState(null);
  const [profile, setProfile] = useState(null);

  const [showLanguages, setShowLanguages] = useState(false);
  const [search, setSearch] = useState("");

  const [savingLanguage, setSavingLanguage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function startApp() {
      try {
        const tg = window.Telegram?.WebApp;

        if (!tg) {
          setError("This Mini App must be opened through Telegram.");
          return;
        }

        tg.ready();
        tg.expand();

        const telegramUser = tg.initDataUnsafe?.user;

        if (!telegramUser?.id) {
          setError("Telegram user could not be identified.");
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

        if (!data) {
          setShowLanguages(true);
          return;
        }

        setProfile(data);

        if (!data.language) {
          setShowLanguages(true);
          return;
        }

        window.location.replace(`/my/${data.card_id}`);
      } catch (err) {
        console.error(err);

        setError(
          err?.message || "Something went wrong."
        );
      }
    }

    startApp();
  }, []);

  const filteredLanguages = useMemo(() => {
    const value = search
      .trim()
      .toLocaleLowerCase();

    if (!value) {
      return LANGUAGES;
    }

    return LANGUAGES.filter((language) => {
      const searchableText = [
        language.name,
        language.english,
        language.code,
        language.search,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchableText.includes(value);
    });
  }, [search]);

  async function selectLanguage(languageCode) {
    if (!telegramId || savingLanguage) {
      return;
    }

    try {
      setSavingLanguage(true);
      setError("");

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

        window.location.replace(
          `/my/${profile.card_id}`
        );

        return;
      }

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

      window.location.replace(`/my/${cardId}`);
    } catch (err) {
      console.error(err);

      setError(
        err?.message ||
          "The language could not be saved."
      );

      setSavingLanguage(false);
    }
  }

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

  if (showLanguages) {
    return (
      <main style={styles.page}>
        <div style={styles.backgroundGlowOne} />
        <div style={styles.backgroundGlowTwo} />

        <div style={styles.container}>
          <div style={styles.languageCard}>
            <div style={styles.icon}>
              🌐
            </div>

            <h1 style={styles.title}>
              Choose your language
            </h1>

            <p style={styles.subtitle}>
              Select the language you want to use
            </p>

            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search language..."
                style={styles.searchInput}
                autoComplete="off"
              />
            </div>

            <div style={styles.languageList}>
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map(
                  (language) => (
                    <button
                      key={language.code}
                      type="button"
                      style={{
                        ...styles.languageButton,
                        opacity: savingLanguage
                          ? 0.55
                          : 1,
                      }}
                      disabled={savingLanguage}
                      onClick={() =>
                        selectLanguage(
                          language.code
                        )
                      }
                    >
                      <div
                        style={
                          styles.languageText
                        }
                      >
                        <span
                          style={
                            styles.nativeName
                          }
                        >
                          {language.name}
                        </span>

                        {language.name !==
                          language.english && (
                          <span
                            style={
                              styles.englishName
                            }
                          >
                            {
                              language.english
                            }
                          </span>
                        )}
                      </div>

                      <span
                        style={styles.arrow}
                      >
                        ›
                      </span>
                    </button>
                  )
                )
              ) : (
                <div style={styles.noResult}>
                  No languages found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <main style={styles.page} />;
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    background:
      "linear-gradient(145deg, #06101d 0%, #101827 48%, #07111f 100%)",
    color: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  backgroundGlowOne: {
    position: "fixed",
    width: "280px",
    height: "280px",
    top: "-100px",
    right: "-100px",
    borderRadius: "50%",
    background:
      "rgba(59,130,246,0.16)",
    filter: "blur(70px)",
    pointerEvents: "none",
  },

  backgroundGlowTwo: {
    position: "fixed",
    width: "260px",
    height: "260px",
    left: "-120px",
    bottom: "-80px",
    borderRadius: "50%",
    background:
      "rgba(14,165,233,0.10)",
    filter: "blur(70px)",
    pointerEvents: "none",
  },

  container: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "460px",
    margin: "0 auto",
    padding: "24px 16px 34px",
    boxSizing: "border-box",
  },

  languageCard: {
    width: "100%",
    padding: "26px 16px 16px",
    boxSizing: "border-box",
    borderRadius: "30px",
    background:
      "rgba(255,255,255,0.075)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    boxShadow:
      "0 24px 70px rgba(0,0,0,0.28)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },

  icon: {
    width: "62px",
    height: "62px",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.10)",
    border:
      "1px solid rgba(255,255,255,0.10)",
    fontSize: "29px",
  },

  title: {
    margin: 0,
    textAlign: "center",
    fontSize: "27px",
    lineHeight: 1.15,
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },

  subtitle: {
    margin: "9px 0 22px",
    textAlign: "center",
    fontSize: "14px",
    lineHeight: 1.5,
    color: "rgba(255,255,255,0.56)",
  },

  searchWrapper: {
    width: "100%",
    height: "54px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 15px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "17px",
    background:
      "rgba(255,255,255,0.085)",
    border:
      "1px solid rgba(255,255,255,0.11)",
  },

  searchIcon: {
    flexShrink: 0,
    fontSize: "25px",
    lineHeight: 1,
    color: "rgba(255,255,255,0.55)",
    transform: "rotate(-20deg)",
  },

  searchInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    margin: 0,
    outline: "none",
    border: "none",
    background: "transparent",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "inherit",
  },

  languageList: {
    width: "100%",
    maxHeight: "54vh",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    paddingRight: "2px",
    boxSizing: "border-box",
  },

  languageButton: {
    width: "100%",
    minHeight: "58px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "9px 15px",
    boxSizing: "border-box",
    borderRadius: "17px",
    border:
      "1px solid rgba(255,255,255,0.09)",
    background:
      "rgba(255,255,255,0.065)",
    color: "#ffffff",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
  },

  languageText: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  nativeName: {
    fontSize: "16px",
    lineHeight: 1.25,
    fontWeight: "650",
    color: "#ffffff",
  },

  englishName: {
    fontSize: "12px",
    lineHeight: 1.2,
    color: "rgba(255,255,255,0.46)",
  },

  arrow: {
    flexShrink: 0,
    fontSize: "25px",
    fontWeight: "300",
    color: "rgba(255,255,255,0.40)",
  },

  noResult: {
    padding: "30px 15px",
    textAlign: "center",
    fontSize: "14px",
    color: "rgba(255,255,255,0.50)",
  },

  errorBox: {
    marginTop: "30px",
    padding: "18px",
    borderRadius: "18px",
    background:
      "rgba(220,38,38,0.16)",
    border:
      "1px solid rgba(248,113,113,0.35)",
    fontSize: "15px",
    lineHeight: "1.5",
  },
};
