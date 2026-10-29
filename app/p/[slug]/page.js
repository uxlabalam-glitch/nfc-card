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

import { useEffect, useState, useRef } from "react";
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
} from "react-icons/fa6";

import {
  FaVk,
  FaOdnoklassniki,
} from "react-icons/fa";

import { CARD_THEMES } from "../../lib/cardThemes";

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

/* =========================================================
   TILLAR
========================================================= */

const TEXTS = {
  uz: {
    settings: "Sozlamalar",
    qr: "QR kod",
    empty: "Afsuski, hozircha bo‘sh",
    close: "Yopish",
  },

  ru: {
    settings: "Настройки",
    qr: "QR-код",
    empty: "К сожалению, пока пусто",
    close: "Закрыть",
  },

  en: {
    settings: "Settings",
    qr: "QR Code",
    empty: "Unfortunately, it is empty for now",
    close: "Close",
  },

  tr: {
    settings: "Ayarlar",
    qr: "QR Kod",
    empty: "Maalesef, şimdilik boş",
    close: "Kapat",
  },
};

const TEXT_STYLES = [
  {
    id: "standard",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  {
    id: "handwriting",
    fontFamily: fontHandwriting.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.3px",
  },
  {
    id: "signature",
    fontFamily: fontSignature.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.4px",
  },
  {
    id: "luxury",
    fontFamily: fontLuxury.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.4px",
  },
  {
    id: "mono",
    fontFamily: fontMono.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "0.8px",
  },
  {
    id: "poster",
    fontFamily: fontPoster.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "1.8px",
  },
  {
    id: "tech",
    fontFamily: fontTech.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "1px",
  },
  {
    id: "retro",
    fontFamily: fontRounded.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.2px",
  },
  {
    id: "classic",
    fontFamily: fontClassic.style.fontFamily,
    fontWeight: 700,
    letterSpacing: "1px",
  },
  {
    id: "marker",
    fontFamily: fontMarker.style.fontFamily,
    fontWeight: 400,
    letterSpacing: "0.3px",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function MyCardPage() {
  const params = useParams();
const publicSlug = params?.slug;

 const [profile, setProfile] = useState(null);
const [links, setLinks] = useState([]);

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

  const [cardRotation, setCardRotation] = useState(0);

const dragStartX = useRef(0);
const startRotation = useRef(0);
const isDragging = useRef(false);
const cardRotationRef = useRef(0);
const movedRef = useRef(false);

function handlePointerDown(event) {
  if (event.target.closest("button, a")) return;

  isDragging.current = true;
  movedRef.current = false;
  dragStartX.current = event.clientX;
  startRotation.current = cardRotationRef.current;

  event.currentTarget.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  if (!isDragging.current) return;

  const delta = event.clientX - dragStartX.current;

  if (Math.abs(delta) > 5) {
    movedRef.current = true;
  }

  const rotation = startRotation.current + delta * 0.55;

  cardRotationRef.current = rotation;
  setCardRotation(rotation);
}

function handlePointerUp() {
  if (!isDragging.current) return;

  isDragging.current = false;

  const snapped =
    Math.round(cardRotationRef.current / 180) * 180;

  cardRotationRef.current = snapped;
  setCardRotation(snapped);
}

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");


  /* =======================================================
     PROFIL + LINKLARNI OLISH
  ======================================================= */

  useEffect(() => {
    if (!publicSlug) return;
    async function loadData() {
  try {
    setError("");

    const response = await fetch(
      `/api/public/profile?slug=${encodeURIComponent(
        publicSlug
      )}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.ok) {
      throw new Error(
        data?.error || "Profile not found."
      );
    }

    setProfile(data.profile);
    setLinks(data.links || []);
  } catch (err) {
    console.error(err);

    setError(
      err?.message || "Something went wrong."
    );
  }
}
   
    loadData();
 }, [publicSlug]);
  /* =======================================================
     TEXT
  ======================================================= */

  const languageCode =
    profile?.language || "en";

  const t =
    TEXTS[languageCode] || TEXTS.en;

  const savedCardTheme =
  isPremiumActive
    ? CARD_THEMES.find(
        (theme) =>
          theme.id === profile?.card_theme
      ) || null
    : null;

const selectedTextStyle =
  TEXT_STYLES.find(
    (item) =>
      item.id ===
      (isPremiumActive
        ? profile?.text_style || "standard"
        : "standard")
  ) || TEXT_STYLES[0];
  
const profileEmpty =
  !String(profile?.full_name || "").trim() &&
  !String(profile?.bio || "").trim() &&
  links.length === 0;
  
  /* =======================================================
     BO'SH XABAR
  ======================================================= */

  function showEmptyMessage() {
    setNotice(t.empty);

    window.setTimeout(() => {
      setNotice("");
    }, 2200);
  }

  /* =======================================================
     LINK OCHISH
  ======================================================= */

 function openLink(link) {
  let url = String(
    link?.url || ""
  ).trim();

  if (!url) {
    showEmptyMessage();
    return;
  }

  const icon = String(
    link?.icon || ""
  ).toLowerCase();

  // Telefon
  if (icon === "phone") {
    window.location.href =
      url.startsWith("tel:")
        ? url
        : `tel:${url}`;

    return;
  }

  // Email
  if (icon === "email") {
    window.location.href =
      url.startsWith("mailto:")
        ? url
        : `mailto:${url}`;

    return;
  }

  function openApp(
    appUrl,
    webUrl
  ) {
    let finished = false;

    const timer =
      window.setTimeout(() => {
        if (
          !finished &&
          document.visibilityState ===
            "visible"
        ) {
          window.location.href =
            webUrl;
        }
      }, 1400);

    const visibilityHandler =
      () => {
        if (
          document.visibilityState ===
          "hidden"
        ) {
          finished = true;

          window.clearTimeout(
            timer
          );

          document.removeEventListener(
            "visibilitychange",
            visibilityHandler
          );
        }
      };

    document.addEventListener(
      "visibilitychange",
      visibilityHandler
    );

    window.location.href =
      appUrl;
  }

  // TELEGRAM
  if (icon === "telegram") {
    const username =
      url
        .replace(
          /^https?:\/\/(www\.)?(t\.me|telegram\.me)\//i,
          ""
        )
        .replace(/^@/, "")
        .split(/[/?#]/)[0];

    if (username) {
      const webUrl =
        `https://t.me/${username}`;

      const tg =
        window.Telegram?.WebApp;

      if (
        tg &&
        typeof tg.openTelegramLink ===
          "function"
      ) {
        tg.openTelegramLink(
          webUrl
        );

        return;
      }

      openApp(
        `tg://resolve?domain=${encodeURIComponent(
          username
        )}`,
        webUrl
      );

      return;
    }
  }

  // WHATSAPP
  if (icon === "whatsapp") {
    const phone =
      url.replace(/\D/g, "");

    if (phone) {
      openApp(
        `whatsapp://send?phone=${phone}`,
        `https://wa.me/${phone}`
      );

      return;
    }
  }

  // INSTAGRAM
  if (icon === "instagram") {
    const username =
      url
        .replace(
          /^https?:\/\/(www\.)?instagram\.com\//i,
          ""
        )
        .replace(/^@/, "")
        .split(/[/?#]/)[0];

    if (username) {
      openApp(
        `instagram://user?username=${encodeURIComponent(
          username
        )}`,
        `https://www.instagram.com/${username}/`
      );

      return;
    }
  }

  // Oddiy linklar
  const finalUrl =
    /^(https?:\/\/)/i.test(url)
      ? url
      : `https://${url}`;

  window.location.href =
    finalUrl;
}
  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <main style={styles.errorPage}>
        <div style={styles.errorBox}>
          {error}
        </div>
      </main>
    );
  }

  /* =======================================================
     PROFIL TEKSHIRILAYOTGAN PAYT
     HECH QANDAY LOADING YO'Q
  ======================================================= */

  if (!profile) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#dfe7ef",
        }}
      />
    );
  }

  /* =======================================================
     SCREEN LED
  ======================================================= */

const screenLedStyle =
  isPremiumActive && profile.screen_led_enabled
  ? {
      outline: `3px solid ${profile.screen_led_color || "#3B82F6"}`,
      outlineOffset: "-3px",
      boxShadow: `
          inset 0 0 3px 2px ${profile.screen_led_color || "#3B82F6"},
          inset 0 0 18px ${profile.screen_led_color || "#3B82F6"},
          0 0 12px ${profile.screen_led_color || "#3B82F6"},
          0 0 28px ${profile.screen_led_color || "#3B82F6"}
        `,
      }
    : {};

  /* =======================================================
     CARD LED
  ======================================================= */

 const cardLedStyle =
  isPremiumActive && profile.card_led_enabled
    ? {
          boxShadow: `
            0 0 5px ${profile.card_led_color || "#3B82F6"},
            0 0 14px ${profile.card_led_color || "#3B82F6"},
            0 12px 40px rgba(0,0,0,0.14)
          `,
        }
      : {};

  /* =======================================================
     UI
  ======================================================= */

  return (
   <main
  style={{
    ...styles.page,

    ...(savedCardTheme
      ? { background: savedCardTheme.bg }
      : {}),
  }}
>
      {/* ===================================================
          TASHQI BLUR FON
      =================================================== */}

     {isPremiumActive && profile.background_url && (
        <div
          style={{
            ...styles.outerBackground,
            backgroundImage: `url("${profile.background_url}")`,
          }}
        />
      )}

      {/* ===================================================
          TASHQI YENGIL QATLAM
      =================================================== */}

     <div
  style={{
    ...styles.outerOverlay,

    ...(savedCardTheme &&
    !(isPremiumActive && profile.background_url)
      ? { background: "transparent" }
      : {}),
  }}
/>
      {/* ===================================================
          ASOSIY MARKAZIY QISM
      =================================================== */}

<section
  style={{
    ...styles.centerSection,
    ...screenLedStyle,
   backgroundImage: isPremiumActive && profile.background_url
  ? `url("${profile.background_url}")`
  : savedCardTheme
    ? "none"
    : "linear-gradient(145deg,#dfe7ef,#cbd5e1)",

...(savedCardTheme &&
  !(isPremiumActive && profile.background_url)
    ? { background: savedCardTheme.bg }
    : {}),
  }}
>

        {/* =================================================
            MARKAZDAGI TINIQ FON
        ================================================= */}

        {isPremiumActive && profile.background_url && (
          <div
            style={{
              ...styles.centerBackground,
              backgroundImage: `url("${profile.background_url}")`,
            }}
          />
        )}

        {/* =================================================
            FON USTIDAGI QATLAM
        ================================================= */}

   <div
  style={{
    ...styles.centerOverlay,

    ...(savedCardTheme &&
    !(isPremiumActive && profile.background_url)
      ? { background: "transparent" }
      : {}),
  }}
/>

{isPremiumActive && profile.screen_led_enabled && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 100,
      pointerEvents: "none",
      border: `3px solid ${
        profile.screen_led_color || "#3B82F6"
      }`,
      boxSizing: "border-box",
      boxShadow: `
        inset 0 0 12px ${
          profile.screen_led_color || "#3B82F6"
        },
        inset 0 0 28px ${
          profile.screen_led_color || "#3B82F6"
        }
      `,
    }}
  />
)}

        

        {/* =================================================
            KONTENT
        ================================================= */}

        <div
          style={{
            ...styles.content,

            filter: "none",
transform: "scale(1)",
          }}
        >
          {/* ===============================================
              GLASS PANEL
          =============================================== */}
<div
  style={{
    position: "relative",
    width: "100%",
height: "330px",
    minHeight: "330px",

    perspective: "1200px",
  }}
>
  <div
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onPointerCancel={handlePointerUp}
    style={{
      position: "relative",
      width: "100%",
      height: "100%",

      transform: `rotateY(${cardRotation}deg)`,
      transformStyle: "preserve-3d",

      transition: isDragging.current
        ? "none"
        : "transform 350ms ease-out",

      touchAction: "pan-y",
      cursor: "grab",
      userSelect: "none",
    }}
  >
    {/* OLD TOMON */}

   <div
  style={{
    ...styles.glassPanel,

    background: savedCardTheme
      ? savedCardTheme.card
      : "rgba(255,255,255,.48)",

    border: savedCardTheme
      ? `1px solid ${savedCardTheme.accent}`
      : "1px solid rgba(255,255,255,.55)",

    boxShadow: isPremiumActive && profile.card_led_enabled
  ? `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20),
      0 0 10px ${profile.card_led_color || "#3B82F6"},
      0 0 24px ${profile.card_led_color || "#3B82F6"},
      0 0 45px ${profile.card_led_color || "#3B82F6"}
    `
  : `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20)
    `,

        height: "100%",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",

        transform: "rotateY(0deg)",
      }}
    >
            {/* =============================================
                PROFIL RASMI
            ============================================= */}

            <div style={styles.avatarOuter}>
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={
                    profile.full_name ||
                    "Profile"
                  }
                  style={styles.avatarImage}
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

            {/* =============================================
                ISM
            ============================================= */}

           {profile.full_name?.trim() && (
  <h1
  style={{
    ...styles.name,

    ...(savedCardTheme
      ? { color: savedCardTheme.text }
      : {}),

    fontFamily: selectedTextStyle.fontFamily,
    fontWeight: selectedTextStyle.fontWeight,
    letterSpacing: selectedTextStyle.letterSpacing,
  }}
>
    {profile.full_name}
  </h1>
)}

            {/* =============================================
                BIO
            ============================================= */}

           {profile.bio?.trim() && (
 <p
  style={{
    ...styles.bio,

    ...(savedCardTheme
      ? { color: savedCardTheme.text }
      : {}),

    fontFamily: selectedTextStyle.fontFamily,
    fontWeight: selectedTextStyle.fontWeight,
    letterSpacing: selectedTextStyle.letterSpacing,
  }}
>
    {profile.bio}
  </p>
)}
{/* BITTA BO'SH XABAR */}
{profileEmpty && (
  <button
    type="button"
    style={styles.singleEmpty}
    onClick={showEmptyMessage}
  >
    {t.empty}
  </button>
)}


            {/* =============================================
                LINKLAR
            ============================================= */}

            <div style={styles.linksGrid}>
            {links.length > 0 &&
  (isPremiumActive ? links : links.slice(0, 1)).map((link) => (
                 <button
  key={link.id}
  type="button"
  style={{
    ...styles.linkButton,

    ...(savedCardTheme
      ? { color: savedCardTheme.text }
      : {}),
  }}
  onClick={() =>
    openLink(link)
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
                        icon={link.icon}
                      />
                    </span>

                    <span
                      style={
                        styles.linkLabel
                      }
                    >
                      {link.label ||
                        link.icon ||
                        ""}
                    </span>
                           </button>
          ))}
            </div>
                   </div>

          {/* ORQA TOMON */}
         <div
  style={{
    ...styles.glassPanel,

    background: savedCardTheme
      ? savedCardTheme.card
      : "rgba(255,255,255,.48)",

    border: savedCardTheme
      ? `1px solid ${savedCardTheme.accent}`
      : "1px solid rgba(255,255,255,.55)",

    boxShadow: profile.card_led_enabled
  ? `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20),
      0 0 10px ${profile.card_led_color || "#3B82F6"},
      0 0 24px ${profile.card_led_color || "#3B82F6"},
      0 0 45px ${profile.card_led_color || "#3B82F6"}
    `
  : `
      inset 0 1px 0 rgba(255,255,255,.7),
      inset 0 -2px 4px rgba(0,0,0,.08),
      0 18px 38px rgba(0,0,0,.20)
    `,

              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",

              padding: "22px",
              textAlign: "left",

              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",

              overflowY: "auto",
              overflowX: "hidden",
              overscrollBehavior: "contain",
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
              About me
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
              {profile?.about_text || ""}
            </div>
          </div>
        </div>
      </div>
      </div>

        {/* =================================================
            BO'SH XABAR
        ================================================= */}

        {notice && (
          <div style={styles.notice}>
            {notice}
          </div>
        )}
      </section>
    </main>
  );
}

/* =========================================================
   ORIGINAL LOGOLAR
========================================================= */

function SocialIcon({ icon }) {
  const name = String(
    icon || ""
  ).toLowerCase();

  switch (name) {
    case "telegram":
      return (
        <SiTelegram size={29} />
      );

    case "whatsapp":
      return (
        <SiWhatsapp size={29} />
      );

    case "instagram":
      return (
        <SiInstagram size={29} />
      );

    case "youtube":
      return (
        <SiYoutube size={29} />
      );

    case "tiktok":
      return (
        <SiTiktok size={29} />
      );

    case "facebook":
      return (
        <SiFacebook size={29} />
      );

    case "linkedin":
      return (
        <FaLinkedin size={29} />
      );

    case "x":
    case "twitter":
      return (
        <FaXTwitter size={28} />
      );

    case "vk":
      return (
        <FaVk size={29} />
      );

    case "ok":
    case "odnoklassniki":
      return (
        <FaOdnoklassniki size={28} />
      );

    case "phone":
      return (
        <FaPhone size={25} />
      );

    case "email":
      return (
        <FaEnvelope size={26} />
      );

    case "website":
      return (
        <FaGlobe size={27} />
      );

    case "location":
      return (
        <FaLocationDot size={27} />
      );

    default:
      return (
        <FaLink size={26} />
      );
  }
}

/* =========================================================
   LOGO RANGLARI
========================================================= */

function getIconColor(icon) {
  const name = String(
    icon || ""
  ).toLowerCase();

  switch (name) {
    case "telegram":
      return {
        color: "#229ED9",
      };

    case "whatsapp":
      return {
        color: "#25D366",
      };

    case "instagram":
      return {
        color: "#E4405F",
      };

    case "youtube":
      return {
        color: "#FF0000",
      };

    case "tiktok":
      return {
        color: "#000000",
      };

    case "facebook":
      return {
        color: "#1877F2",
      };

    case "linkedin":
      return {
        color: "#0A66C2",
      };

    case "x":
    case "twitter":
      return {
        color: "#000000",
      };

    case "vk":
      return {
        color: "#0077FF",
      };

    case "ok":
    case "odnoklassniki":
      return {
        color: "#EE8208",
      };

    case "phone":
      return {
        color: "#16A34A",
      };

    case "email":
      return {
        color: "#EA4335",
      };

    case "website":
      return {
        color: "#2563EB",
      };

    case "location":
      return {
        color: "#EF4444",
      };

    default:
      return {
        color: "#475467",
      };
  }
}

/* =========================================================
   STYLE
========================================================= */

const styles = {
  page: {
  height: "100dvh",
minHeight: "100dvh",
overflow: "hidden",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    background: "#dfe7ef",
    overflowX: "hidden",
  },

 outerBackground: {
  position: "absolute",
  inset: "-35px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  filter: "blur(28px)",
  transform: "scale(1.08)",
  opacity: 0.92,
},
  
outerOverlay: {
  position: "absolute",
  inset: 0,
  background: "rgba(17,24,39,.15)",
  pointerEvents: "none",
},

 centerSection: {
  position: "relative",
  zIndex: 2,
  width: "100%",
  maxWidth: "430px",
  height: "100dvh",
  margin: "0 auto",
  overflow: "hidden",
  backgroundPosition: "center",
  backgroundSize: "cover",
  boxShadow: "0 0 70px rgba(0,0,0,.20)",
},

  centerBackground: {
    position: "absolute",
    inset: 0,

    backgroundSize: "cover",
    backgroundPosition: "center",

    zIndex: 0,
  },

 centerOverlay: {
  position: "absolute",
  inset: 0,
  zIndex: 1,

  background:
    "linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.03) 40%,rgba(0,0,0,.14))",

  pointerEvents: "none",
},

  /* =======================================================
     MENU
  ======================================================= */

  topMenu: {
    position: "absolute",
    zIndex: 50,

    top: 0,
    left: 0,
    right: 0,

    display: "flex",
    justifyContent: "flex-end",

    padding:
      "max(16px, env(safe-area-inset-top)) 16px 0",

    boxSizing: "border-box",
  },

  menuWrapper: {
    position: "relative",
    zIndex: 60,
  },

  menuButton: {
    position: "relative",
    zIndex: 62,

    width: "46px",
    height: "46px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: 0,

    border:
      "1px solid rgba(255,255,255,0.70)",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.68)",

    color: "#111827",

    fontSize: "19px",

    boxShadow:
      "0 7px 22px rgba(0,0,0,0.13)",

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter:
      "blur(18px)",

    cursor: "pointer",
  },

  menuBackdrop: {
    position: "fixed",

    zIndex: 60,

    inset: 0,

    width: "100%",
    height: "100%",

    padding: 0,
    border: 0,

    background: "transparent",
  },

  menu: {
    position: "absolute",

    zIndex: 63,

    top: "54px",
    right: 0,

    width: "190px",

    padding: "7px",

    boxSizing: "border-box",

    border:
      "1px solid rgba(255,255,255,0.82)",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.91)",

    color: "#111827",

    boxShadow:
      "0 18px 50px rgba(0,0,0,0.20)",

    backdropFilter: "blur(24px)",
    WebkitBackdropFilter:
      "blur(24px)",
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

    color: "#111827",

    fontSize: "15px",
    fontWeight: "650",

    fontFamily: "inherit",

    cursor: "pointer",

    textAlign: "left",
  },

  menuDivider: {
    height: "1px",

    margin: "2px 8px",

    background:
      "rgba(17,24,39,0.08)",
  },

  /* =======================================================
     CONTENT
  ======================================================= */

content: {
  position: "relative",
  zIndex: 2,
  minHeight: "100dvh",
  padding: "0 18px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
  singleEmpty: {
  margin: "28px auto",
  padding: "12px 18px",
  border: "1px solid rgba(17,24,39,.08)",
  borderRadius: "15px",
  background: "rgba(255,255,255,.32)",
  color: "#667085",
  fontSize: "14px",
  cursor: "pointer",
},

glassPanel: {
  position: "relative",
  width: "100%",

  minHeight: "330px",
  maxHeight: "calc(100dvh - 115px)",

  padding: "72px 22px 24px",
  boxSizing: "border-box",

  borderRadius: "32px",

  background: "rgba(255,255,255,.48)",

  backdropFilter: "blur(25px) saturate(145%)",
  WebkitBackdropFilter: "blur(25px) saturate(145%)",

  border: "1px solid rgba(255,255,255,.55)",

  boxShadow: "0 25px 70px rgba(0,0,0,.18)",

  textAlign: "center",
  overflow: "visible",
},

avatarOuter: {
  position: "absolute",
  zIndex: 5,
  top: "-51px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "102px",
  height: "102px",
  padding: "4px",
  boxSizing: "border-box",
  borderRadius: "50%",
  background: "rgba(255,255,255,.68)",
  border: "1px solid rgba(255,255,255,.72)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 12px 35px rgba(0,0,0,.18)",
},

  avatarImage: {
    width: "100%",
    height: "100%",

    borderRadius: "50%",

    objectFit: "cover",

    display: "block",
  },

  avatarPlaceholder: {
    width: "100%",
    height: "100%",

    borderRadius: "50%",

    background:
      "rgba(230,230,230,0.95)",

    display: "flex",

    alignItems: "center",
    justifyContent: "center",

    color: "#98a2b3",

    fontSize: "44px",
  },

  name: {
    margin: "0 0 6px",

fontSize: "clamp(22px,7vw,28px)",

    lineHeight: 1.15,

    color: "#111827",

    fontWeight: "800",
  },

  bio: {
    margin: 0,

    color: "#667085",

    fontSize: "16px",

    lineHeight: 1.5,

    whiteSpace: "pre-wrap",
  },

  emptyName: {
    width: "100%",

    margin: "0 0 6px",

    padding: "4px",

    border: 0,

    background: "transparent",

    color: "#667085",

    fontFamily: "inherit",

    fontSize: "16px",

    fontWeight: "600",

    cursor: "pointer",
  },

  emptyBio: {
    width: "100%",

    padding: "4px",

    border: 0,

    background: "transparent",

    color: "#98a2b3",

    fontFamily: "inherit",

    fontSize: "14px",

    cursor: "pointer",
  },

  /* =======================================================
     LINKS
  ======================================================= */

  linksGrid: {
    marginTop: "30px",

    display: "grid",

    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",

    gap: "22px 12px",
  },

  linkButton: {
    minWidth: 0,

    padding: 0,

    border: 0,

    background: "transparent",

    color: "#111827",

    fontSize: "13px",

    fontWeight: "600",

    fontFamily: "inherit",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "8px",

    cursor: "pointer",
  },

  iconBox: {
    width: "60px",

    height: "60px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.88)",

    border:
      "1px solid rgba(255,255,255,0.9)",

    boxShadow:
      "0 6px 18px rgba(0,0,0,0.10)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  linkLabel: {
    maxWidth: "100%",

    overflow: "hidden",

    textOverflow: "ellipsis",

    whiteSpace: "nowrap",
  },

  emptyLinks: {
    gridColumn: "1 / -1",

    width: "100%",

    minHeight: "54px",

    border:
      "1px dashed rgba(17,24,39,0.15)",

    borderRadius: "17px",

    background:
      "rgba(255,255,255,0.30)",

    color: "#667085",

    fontFamily: "inherit",

    fontSize: "14px",

    cursor: "pointer",
  },

  /* =======================================================
     MODAL
  ======================================================= */

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

    padding: 0,

    border: 0,

    background:
      "rgba(15,23,42,0.36)",

    backdropFilter: "blur(9px)",
    WebkitBackdropFilter:
      "blur(9px)",
  },

  modalCard: {
    position: "relative",

    zIndex: 2,

    width: "100%",

    maxWidth: "410px",

    padding: "18px",

    boxSizing: "border-box",

    border:
      "1px solid rgba(255,255,255,0.82)",

    borderRadius: "28px",

    background:
      "rgba(255,255,255,0.92)",

    color: "#111827",

    boxShadow:
      "0 30px 90px rgba(0,0,0,0.30)",

    backdropFilter: "blur(30px)",
    WebkitBackdropFilter:
      "blur(30px)",
  },

  modalHeader: {
    display: "flex",

    alignItems: "center",

    justifyContent:
      "space-between",

    gap: "15px",

    marginBottom: "18px",
  },

  modalTitleRow: {
    display: "flex",

    alignItems: "center",

    gap: "11px",
  },

  modalIcon: {
    width: "39px",
    height: "39px",

    flexShrink: 0,

    display: "flex",

    alignItems: "center",
    justifyContent: "center",

    borderRadius: "13px",

    background:
      "rgba(17,24,39,0.06)",

    color: "#111827",

    fontSize: "16px",
  },

  modalTitle: {
    margin: 0,

    fontSize: "20px",

    fontWeight: "800",
  },

  closeButton: {
    width: "39px",
    height: "39px",

    flexShrink: 0,

    display: "flex",

    alignItems: "center",
    justifyContent: "center",

    padding: 0,

    border: 0,

    borderRadius: "13px",

    background:
      "rgba(17,24,39,0.06)",

    color: "#111827",

    fontSize: "17px",

    cursor: "pointer",
  },

  settingsPlaceholder: {
    minHeight: "150px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    gap: "12px",

    border:
      "1px solid rgba(17,24,39,0.08)",

    borderRadius: "20px",

    background:
      "rgba(17,24,39,0.025)",

    color: "#667085",
  },

  /* =======================================================
     QR
  ======================================================= */

  qrModal: {
    maxWidth: "390px",
  },

  qrContent: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    padding: "4px 2px 8px",
  },

  qrWhiteBox: {
    width: "min(270px, 72vw)",

    aspectRatio: "1 / 1",

    padding: "14px",

    boxSizing: "border-box",

    borderRadius: "25px",

    background: "#ffffff",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.16)",
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

    color: "#667085",

    fontSize: "12px",
  },

  /* =======================================================
     NOTICE
  ======================================================= */

  notice: {
    position: "fixed",

    zIndex: 3000,

    left: "50%",

    bottom:
      "max(25px, env(safe-area-inset-bottom))",

    transform:
      "translateX(-50%)",

    width: "max-content",

    maxWidth:
      "calc(100% - 36px)",

    padding: "13px 17px",

    boxSizing: "border-box",

    border:
      "1px solid rgba(255,255,255,0.25)",

    borderRadius: "16px",

    background:
      "rgba(17,24,39,0.92)",

    color: "#ffffff",

    fontSize: "14px",

    fontWeight: "600",

    textAlign: "center",

    boxShadow:
      "0 15px 45px rgba(0,0,0,0.30)",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter:
      "blur(22px)",
  },

  errorPage: {
    minHeight: "100vh",

    padding: "30px 18px",

    boxSizing: "border-box",

    background: "#dfe7ef",

    fontFamily:
      "Arial, sans-serif",
  },

  errorBox: {
    width: "100%",

    maxWidth: "420px",

    margin: "0 auto",

    padding: "18px",

    boxSizing: "border-box",

    borderRadius: "18px",

    background:
      "rgba(220,38,38,0.10)",

    border:
      "1px solid rgba(220,38,38,0.20)",

    color: "#991b1b",

    fontSize: "15px",

    lineHeight: 1.5,
  },
};
