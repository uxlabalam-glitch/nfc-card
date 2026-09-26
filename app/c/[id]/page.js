"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

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
  FaEllipsisVertical,
  FaGear,
  FaQrcode,
  FaXmark,
  FaXTwitter,
} from "react-icons/fa6";

import {
  FaVk,
  FaOdnoklassniki,
} from "react-icons/fa";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://yzkeabplmbxkvyschlop.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

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

/* =========================================================
   PAGE
========================================================= */

export default function MyCardPage() {
  const params = useParams();
  const cardId = params?.id;

  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const [publicUrl, setPublicUrl] = useState("");

  /* =======================================================
     PROFIL + LINKLARNI OLISH
  ======================================================= */

  useEffect(() => {
    if (!cardId) return;

    async function loadData() {
      try {
        setError("");

        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("card_id", cardId)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        if (!profileData) {
          setError("Profile not found.");
          return;
        }

        const {
          data: linksData,
          error: linksError,
        } = await supabase
          .from("links")
          .select("*")
          .eq("profile_id", profileData.id)
          .order("sort_order", {
            ascending: true,
          });

        if (linksError) {
          throw linksError;
        }

        setProfile(profileData);
        setLinks(linksData || []);

        setPublicUrl(
          `${window.location.origin}/c/${profileData.card_id}`
        );
      } catch (err) {
        console.error(err);

        setError(
          err?.message || "Something went wrong."
        );
      }
    }

    loadData();
  }, [cardId]);

  /* =======================================================
     TEXT
  ======================================================= */

  const languageCode =
    profile?.language || "en";

  const t =
    TEXTS[languageCode] || TEXTS.en;

  /* =======================================================
     QR
  ======================================================= */

  const qrImageUrl = publicUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=20&data=${encodeURIComponent(
        publicUrl
      )}`
    : "";

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
    let url = link?.url?.trim();

    if (!url) {
      showEmptyMessage();
      return;
    }

    const icon = String(
      link.icon || ""
    ).toLowerCase();

    if (icon === "phone") {
      if (!url.startsWith("tel:")) {
        url = `tel:${url}`;
      }

      window.location.href = url;
      return;
    }

    if (icon === "email") {
      if (!url.startsWith("mailto:")) {
        url = `mailto:${url}`;
      }

      window.location.href = url;
      return;
    }

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      url = `https://${url}`;
    }

    window.location.href = url;
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
    profile.screen_led_enabled
      ? {
          boxShadow: `
            0 0 45px rgba(0,0,0,0.22),
            0 0 7px ${profile.screen_led_color || "#3B82F6"},
            0 0 16px ${profile.screen_led_color || "#3B82F6"},
            0 0 28px ${profile.screen_led_color || "#3B82F6"}
          `,
        }
      : {};

  /* =======================================================
     CARD LED
  ======================================================= */

  const cardLedStyle =
    profile.card_led_enabled
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
    <main style={styles.page}>
      {/* ===================================================
          TASHQI BLUR FON
      =================================================== */}

      {profile.background_url && (
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

      <div style={styles.outerOverlay} />

      {/* ===================================================
          ASOSIY MARKAZIY QISM
      =================================================== */}

      <section
        style={{
          ...styles.centerSection,
          ...screenLedStyle,
        }}
      >
        {/* =================================================
            MARKAZDAGI TINIQ FON
        ================================================= */}

        {profile.background_url && (
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

        <div style={styles.centerOverlay} />

        {/* =================================================
            UCH NUQTA
        ================================================= */}

        <div style={styles.topMenu}>
          <div style={styles.menuWrapper}>
            <button
              type="button"
              aria-label="Menu"
              style={styles.menuButton}
              onClick={() =>
                setMenuOpen(
                  (current) => !current
                )
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
                  onClick={() =>
                    setMenuOpen(false)
                  }
                />

                <div style={styles.menu}>
                  <button
                    type="button"
                    style={styles.menuItem}
                    onClick={() => {
                      setMenuOpen(false);
                      setModal("settings");
                    }}
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
                    style={styles.menuItem}
                    onClick={() => {
                      setMenuOpen(false);
                      setModal("qr");
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

        {/* =================================================
            KONTENT
        ================================================= */}

        <div
          style={{
            ...styles.content,

            filter: modal
              ? "blur(8px)"
              : "none",

            transform: modal
              ? "scale(0.985)"
              : "scale(1)",
          }}
        >
          {/* ===============================================
              GLASS PANEL
          =============================================== */}

          <div
            style={{
              ...styles.glassPanel,
              ...cardLedStyle,
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

            {profile.full_name?.trim() ? (
              <h1 style={styles.name}>
                {profile.full_name}
              </h1>
            ) : (
              <button
                type="button"
                style={styles.emptyName}
                onClick={
                  showEmptyMessage
                }
              >
                {t.empty}
              </button>
            )}

            {/* =============================================
                BIO
            ============================================= */}

            {profile.bio?.trim() ? (
              <p style={styles.bio}>
                {profile.bio}
              </p>
            ) : (
              <button
                type="button"
                style={styles.emptyBio}
                onClick={
                  showEmptyMessage
                }
              >
                {t.empty}
              </button>
            )}

            {/* =============================================
                LINKLAR
            ============================================= */}

            <div style={styles.linksGrid}>
              {links.length > 0 ? (
                links.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    style={styles.linkButton}
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
                ))
              ) : (
                <button
                  type="button"
                  style={styles.emptyLinks}
                  onClick={
                    showEmptyMessage
                  }
                >
                  {t.empty}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            SETTINGS
            KEYINGI ETAPLARDA ICHI TO'LDIRILADI
        ================================================= */}

        {modal === "settings" && (
          <div style={styles.modalLayer}>
            <button
              type="button"
              aria-label="Close"
              style={
                styles.modalBackdrop
              }
              onClick={() =>
                setModal(null)
              }
            />

            <div style={styles.modalCard}>
              <div
                style={
                  styles.modalHeader
                }
              >
                <div
                  style={
                    styles.modalTitleRow
                  }
                >
                  <div
                    style={
                      styles.modalIcon
                    }
                  >
                    <FaGear />
                  </div>

                  <h2
                    style={
                      styles.modalTitle
                    }
                  >
                    {t.settings}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label={t.close}
                  style={
                    styles.closeButton
                  }
                  onClick={() =>
                    setModal(null)
                  }
                >
                  <FaXmark />
                </button>
              </div>

              <div
                style={
                  styles.settingsPlaceholder
                }
              >
                <FaGear
                  style={{
                    fontSize: "30px",
                  }}
                />

                <strong>
                  {t.settings}
                </strong>
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            QR
        ================================================= */}

        {modal === "qr" && (
          <div style={styles.modalLayer}>
            <button
              type="button"
              aria-label="Close"
              style={
                styles.modalBackdrop
              }
              onClick={() =>
                setModal(null)
              }
            />

            <div
              style={{
                ...styles.modalCard,
                ...styles.qrModal,
              }}
            >
              <div
                style={
                  styles.modalHeader
                }
              >
                <div
                  style={
                    styles.modalTitleRow
                  }
                >
                  <div
                    style={
                      styles.modalIcon
                    }
                  >
                    <FaQrcode />
                  </div>

                  <h2
                    style={
                      styles.modalTitle
                    }
                  >
                    {t.qr}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label={t.close}
                  style={
                    styles.closeButton
                  }
                  onClick={() =>
                    setModal(null)
                  }
                >
                  <FaXmark />
                </button>
              </div>

              <div style={styles.qrContent}>
                <div
                  style={
                    styles.qrWhiteBox
                  }
                >
                  {qrImageUrl && (
                    <img
                      src={qrImageUrl}
                      alt="QR Code"
                      style={
                        styles.qrImage
                      }
                    />
                  )}
                </div>

                {profile.full_name?.trim() && (
                  <strong
                    style={styles.qrName}
                  >
                    {profile.full_name}
                  </strong>
                )}

                <div style={styles.qrUrl}>
                  {publicUrl}
                </div>
              </div>
            </div>
          </div>
        )}

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
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    background: "#dfe7ef",
    overflowX: "hidden",
  },

  outerBackground: {
    position: "fixed",
    inset: "-25px",

    backgroundSize: "cover",
    backgroundPosition: "center",

    filter: "blur(14px)",
    transform: "scale(1.10)",
    opacity: 0.78,
  },

  outerOverlay: {
    position: "fixed",
    inset: 0,

    background:
      "rgba(255,255,255,0.08)",
  },

  centerSection: {
    position: "relative",
    zIndex: 1,

    width: "100%",
    maxWidth: "430px",
    minHeight: "100vh",

    overflow: "hidden",

    boxShadow:
      "0 0 45px rgba(0,0,0,0.22)",

    background: "#eef3f7",
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
      "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(220,240,250,0.18))",
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

    minHeight: "100vh",

    padding: "280px 20px 50px",

    boxSizing: "border-box",

    transition:
      "filter 220ms ease, transform 220ms ease",
  },

  glassPanel: {
    position: "relative",

    padding: "78px 20px 30px",

    borderRadius: "32px",

    background:
      "rgba(255,255,255,0.68)",

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter:
      "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.65)",

    boxShadow:
      "0 12px 40px rgba(0,0,0,0.14)",

    textAlign: "center",
  },

  avatarOuter: {
    position: "absolute",

    top: "-72px",
    left: "50%",

    transform:
      "translateX(-50%)",

    width: "142px",
    height: "142px",

    borderRadius: "50%",

    padding: "6px",

    background:
      "rgba(255,255,255,0.95)",

    boxShadow:
      "0 8px 25px rgba(0,0,0,0.18)",

    boxSizing: "border-box",
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

    fontSize: "32px",

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
