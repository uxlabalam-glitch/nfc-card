"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import {
  FaEllipsisVertical,
  FaGear,
  FaQrcode,
  FaXmark,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaLocationDot,
  FaLink,
  FaLinkedin,
} from "react-icons/fa6";

import {
  SiTelegram,
  SiWhatsapp,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiFacebook,
} from "react-icons/si";

const supabase = createClient(
  "https://yzkeabplmbxkvyschlop.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

/* =========================================================
   TEXTS
========================================================= */

const TEXTS = {
  uz: {
    settings: "Sozlamalar",
    qr: "QR kod",
    empty: "Afsuski, hozircha bo‘sh",
    qrTitle: "QR kod",
    close: "Yopish",
  },

  ru: {
    settings: "Настройки",
    qr: "QR-код",
    empty: "К сожалению, пока пусто",
    qrTitle: "QR-код",
    close: "Закрыть",
  },

  en: {
    settings: "Settings",
    qr: "QR Code",
    empty: "Unfortunately, it is empty for now",
    qrTitle: "QR Code",
    close: "Close",
  },

  tr: {
    settings: "Ayarlar",
    qr: "QR Kod",
    empty: "Maalesef, şimdilik boş",
    qrTitle: "QR Kod",
    close: "Kapat",
  },
};

/* =========================================================
   SOCIAL COLORS
========================================================= */

const SOCIAL_COLORS = {
  telegram: "#229ED9",
  whatsapp: "#25D366",
  instagram: "#E4405F",
  youtube: "#FF0000",
  tiktok: "#111111",
  facebook: "#1877F2",
  linkedin: "#0A66C2",
  phone: "#16A34A",
  email: "#EA4335",
  website: "#2563EB",
  location: "#EA4335",
  link: "#475569",
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

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [publicUrl, setPublicUrl] = useState("");

  /* =======================================================
     LOAD PROFILE + LINKS
  ======================================================= */

  useEffect(() => {
    if (!cardId) return;

    async function loadData() {
      try {
        setError("");

        const { data: profileData, error: profileError } =
          await supabase
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

        const { data: linksData, error: linksError } =
          await supabase
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
     LANGUAGE
  ======================================================= */

  const languageCode = profile?.language || "en";
  const t = TEXTS[languageCode] || TEXTS.en;

  /* =======================================================
     QR
  ======================================================= */

  const qrImageUrl = publicUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=700x700&margin=20&data=${encodeURIComponent(
        publicUrl
      )}`
    : "";

  /* =======================================================
     OPEN LINK
  ======================================================= */

  function openLink(link) {
    const value = link?.url?.trim();

    if (!value) {
      showNotice();
      return;
    }

    let finalUrl = value;

    if (link.icon === "phone") {
      finalUrl = value.startsWith("tel:")
        ? value
        : `tel:${value}`;
    }

    if (link.icon === "email") {
      finalUrl = value.startsWith("mailto:")
        ? value
        : `mailto:${value}`;
    }

    if (
      link.icon !== "phone" &&
      link.icon !== "email" &&
      !/^https?:\/\//i.test(finalUrl)
    ) {
      finalUrl = `https://${finalUrl}`;
    }

    window.location.href = finalUrl;
  }

  function showNotice() {
    setNotice(t.empty);

    window.setTimeout(() => {
      setNotice("");
    }, 2200);
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
     EMPTY WHILE FETCHING
  ======================================================= */

  if (!profile) {
    return <main style={styles.emptyPage} />;
  }

  const backgroundImage =
    profile.background_url?.trim() || "";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main style={styles.page}>
      {/* ===============================================
          BLURRED FULL BACKGROUND
      =============================================== */}

      {backgroundImage ? (
        <>
          <div
            style={{
              ...styles.fullBackground,
              backgroundImage: `url("${backgroundImage}")`,
            }}
          />

          <div style={styles.backgroundDarkener} />
        </>
      ) : (
        <div style={styles.defaultBackground} />
      )}

      {/* ===============================================
          CENTER SHARP BACKGROUND
      =============================================== */}

      <div
        style={{
          ...styles.phoneCanvas,

          ...(backgroundImage
            ? {
                backgroundImage: `url("${backgroundImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background:
                  "linear-gradient(160deg,#0f172a,#172554 48%,#020617)",
              }),
        }}
      >
        <div style={styles.centerOverlay} />

        {/* =============================================
            TOP MENU
        ============================================= */}

        <div style={styles.topBar}>
          <div />

          <div style={styles.menuWrapper}>
            <button
              type="button"
              aria-label="Menu"
              style={styles.menuButton}
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

                  <div style={styles.menuDivider} />

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

        {/* =============================================
            RESULT CARD
        ============================================= */}

        <div
          style={{
            ...styles.cardArea,
            filter: modal
              ? "blur(8px)"
              : "none",
            transform: modal
              ? "scale(0.985)"
              : "scale(1)",
          }}
        >
          <section style={styles.profileCard}>
            {/* AVATAR */}

            <div style={styles.avatarOuter}>
              {profile.photo_url?.trim() ? (
                <img
                  src={profile.photo_url}
                  alt=""
                  style={styles.avatar}
                />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <FaUser />
                </div>
              )}
            </div>

            {/* NAME */}

            {profile.full_name?.trim() ? (
              <h1 style={styles.name}>
                {profile.full_name}
              </h1>
            ) : (
              <button
                type="button"
                style={styles.emptyTextButton}
                onClick={showNotice}
              >
                {t.empty}
              </button>
            )}

            {/* BIO */}

            {profile.bio?.trim() ? (
              <p style={styles.bio}>
                {profile.bio}
              </p>
            ) : (
              <button
                type="button"
                style={styles.emptyBioButton}
                onClick={showNotice}
              >
                {t.empty}
              </button>
            )}

            {/* SOCIAL LINKS */}

            <div style={styles.socialGrid}>
              {links.length > 0 ? (
                links.map((link) => (
                  <button
                    key={
                      link.id ||
                      `${link.icon}-${link.sort_order}`
                    }
                    type="button"
                    aria-label={
                      link.label ||
                      link.icon ||
                      "Link"
                    }
                    title={
                      link.label ||
                      link.icon ||
                      "Link"
                    }
                    style={{
                      ...styles.socialButton,
                      background:
                        SOCIAL_COLORS[
                          link.icon
                        ] ||
                        SOCIAL_COLORS.link,
                    }}
                    onClick={() =>
                      openLink(link)
                    }
                  >
                    <SocialIcon
                      type={link.icon}
                    />
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  style={styles.emptyLinks}
                  onClick={showNotice}
                >
                  {t.empty}
                </button>
              )}
            </div>
          </section>
        </div>

        {/* =============================================
            SETTINGS MODAL
            3+ ETAPLARDA TO'LDIRILADI
        ============================================= */}

        {modal === "settings" && (
          <div style={styles.modalLayer}>
            <button
              type="button"
              aria-label="Close"
              style={styles.modalBackdrop}
              onClick={() =>
                setModal(null)
              }
            />

            <div style={styles.modalCard}>
              <div style={styles.modalHeader}>
                <div style={styles.modalTitleGroup}>
                  <div style={styles.modalIcon}>
                    <FaGear />
                  </div>

                  <h2 style={styles.modalTitle}>
                    {t.settings}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label={t.close}
                  style={styles.closeButton}
                  onClick={() =>
                    setModal(null)
                  }
                >
                  <FaXmark />
                </button>
              </div>

              <div style={styles.futureBox}>
                <FaGear
                  style={styles.futureIcon}
                />

                <div style={styles.futureText}>
                  {t.settings}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =============================================
            QR MODAL
        ============================================= */}

        {modal === "qr" && (
          <div style={styles.modalLayer}>
            <button
              type="button"
              aria-label="Close"
              style={styles.modalBackdrop}
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
              <div style={styles.modalHeader}>
                <div style={styles.modalTitleGroup}>
                  <div style={styles.modalIcon}>
                    <FaQrcode />
                  </div>

                  <h2 style={styles.modalTitle}>
                    {t.qrTitle}
                  </h2>
                </div>

                <button
                  type="button"
                  aria-label={t.close}
                  style={styles.closeButton}
                  onClick={() =>
                    setModal(null)
                  }
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

                {profile.full_name?.trim() && (
                  <strong style={styles.qrName}>
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

        {/* =============================================
            NOTICE
        ============================================= */}

        {notice && (
          <div style={styles.notice}>
            {notice}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   SOCIAL ICON
========================================================= */

function SocialIcon({ type }) {
  switch (type) {
    case "telegram":
      return <SiTelegram />;

    case "whatsapp":
      return <SiWhatsapp />;

    case "instagram":
      return <SiInstagram />;

    case "youtube":
      return <SiYoutube />;

    case "tiktok":
      return <SiTiktok />;

    case "facebook":
      return <SiFacebook />;

    case "linkedin":
      return <FaLinkedin />;

    case "phone":
      return <FaPhone />;

    case "email":
      return <FaEnvelope />;

    case "website":
      return <FaGlobe />;

    case "location":
      return <FaLocationDot />;

    default:
      return <FaLink />;
  }
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    position: "relative",
    width: "100%",
    minHeight: "100dvh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    background: "#020617",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  emptyPage: {
    width: "100%",
    minHeight: "100dvh",
    margin: 0,
    background: "#020617",
  },

  errorPage: {
    width: "100%",
    minHeight: "100dvh",
    padding: "30px 18px",
    boxSizing: "border-box",
    background:
      "linear-gradient(145deg,#06101d,#111827)",
    color: "#ffffff",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  errorBox: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    padding: "18px",
    boxSizing: "border-box",
    borderRadius: "18px",
    background:
      "rgba(220,38,38,0.16)",
    border:
      "1px solid rgba(248,113,113,0.35)",
    lineHeight: 1.5,
  },

  fullBackground: {
    position: "fixed",
    zIndex: 0,
    inset: "-40px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(32px)",
    transform: "scale(1.12)",
  },

  backgroundDarkener: {
    position: "fixed",
    zIndex: 1,
    inset: 0,
    background:
      "rgba(2,6,23,0.26)",
  },

  defaultBackground: {
    position: "fixed",
    zIndex: 0,
    inset: 0,
    background:
      "radial-gradient(circle at top,#1e3a8a 0%,#0f172a 42%,#020617 100%)",
  },

  phoneCanvas: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "460px",
    minHeight: "100dvh",
    margin: "0 auto",
    overflow: "hidden",
    boxShadow:
      "0 0 70px rgba(59,130,246,0.18)",
  },

  centerOverlay: {
    position: "absolute",
    zIndex: 0,
    inset: 0,
    background:
      "linear-gradient(to bottom,rgba(0,0,0,0.16),rgba(0,0,0,0.05) 35%,rgba(0,0,0,0.24))",
    pointerEvents: "none",
  },

  topBar: {
    position: "relative",
    zIndex: 50,
    width: "100%",
    minHeight: "76px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding:
      "max(16px, env(safe-area-inset-top)) 17px 8px",
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
      "1px solid rgba(255,255,255,0.24)",
    borderRadius: "16px",
    background:
      "rgba(15,23,42,0.40)",
    color: "#ffffff",
    fontSize: "19px",
    cursor: "pointer",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.18)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
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
      "1px solid rgba(255,255,255,0.16)",
    borderRadius: "18px",
    background:
      "rgba(15,23,42,0.92)",
    color: "#ffffff",
    boxShadow:
      "0 20px 55px rgba(0,0,0,0.38)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
  },

  menuItem: {
    width: "100%",
    minHeight: "49px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 13px",
    border: 0,
    borderRadius: "13px",
    background: "transparent",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
    fontWeight: "650",
    cursor: "pointer",
    textAlign: "left",
  },

  menuDivider: {
    height: "1px",
    margin: "2px 8px",
    background:
      "rgba(255,255,255,0.10)",
  },

  cardArea: {
    position: "relative",
    zIndex: 5,
    width: "100%",
    minHeight:
      "calc(100dvh - 76px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px 17px 70px",
    boxSizing: "border-box",
    transition:
      "filter 220ms ease, transform 220ms ease",
  },

  profileCard: {
    position: "relative",
    width: "100%",
    padding: "74px 22px 28px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.28)",
    borderRadius: "34px",
    background:
      "rgba(255,255,255,0.16)",
    color: "#ffffff",
    textAlign: "center",
    boxShadow:
      "0 28px 80px rgba(0,0,0,0.28)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
  },

  avatarOuter: {
    position: "absolute",
    top: "-58px",
    left: "50%",
    width: "116px",
    height: "116px",
    transform: "translateX(-50%)",
  },

  avatar: {
    width: "116px",
    height: "116px",
    display: "block",
    boxSizing: "border-box",
    objectFit: "cover",
    borderRadius: "50%",
    border:
      "3px solid rgba(255,255,255,0.88)",
    background:
      "rgba(255,255,255,0.18)",
    boxShadow:
      "0 14px 38px rgba(0,0,0,0.28)",
  },

  avatarPlaceholder: {
    width: "116px",
    height: "116px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: "50%",
    border:
      "3px solid rgba(255,255,255,0.75)",
    background:
      "rgba(15,23,42,0.46)",
    color:
      "rgba(255,255,255,0.88)",
    fontSize: "45px",
    boxShadow:
      "0 14px 38px rgba(0,0,0,0.28)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  },

  name: {
    margin: "0 0 8px",
    padding: 0,
    fontSize: "27px",
    lineHeight: 1.2,
    fontWeight: "800",
    letterSpacing: "-0.5px",
    textShadow:
      "0 2px 12px rgba(0,0,0,0.22)",
  },

  bio: {
    maxWidth: "320px",
    margin: "0 auto",
    color:
      "rgba(255,255,255,0.78)",
    fontSize: "15px",
    lineHeight: 1.55,
    whiteSpace: "pre-wrap",
  },

  emptyTextButton: {
    display: "block",
    width: "100%",
    margin: "0 0 8px",
    padding: "3px 8px",
    border: 0,
    background: "transparent",
    color:
      "rgba(255,255,255,0.66)",
    fontFamily: "inherit",
    fontSize: "17px",
    fontWeight: "650",
    cursor: "pointer",
  },

  emptyBioButton: {
    display: "block",
    width: "100%",
    margin: "0 auto",
    padding: "5px 8px",
    border: 0,
    background: "transparent",
    color:
      "rgba(255,255,255,0.52)",
    fontFamily: "inherit",
    fontSize: "14px",
    cursor: "pointer",
  },

  socialGrid: {
    width: "100%",
    marginTop: "27px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
  },

  socialButton: {
    width: "52px",
    height: "52px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    border:
      "1px solid rgba(255,255,255,0.22)",
    borderRadius: "17px",
    color: "#ffffff",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow:
      "0 9px 24px rgba(0,0,0,0.19)",
  },

  emptyLinks: {
    width: "100%",
    minHeight: "50px",
    padding: "10px 14px",
    border:
      "1px dashed rgba(255,255,255,0.22)",
    borderRadius: "17px",
    background:
      "rgba(255,255,255,0.07)",
    color:
      "rgba(255,255,255,0.60)",
    fontFamily: "inherit",
    fontSize: "14px",
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
    zIndex: 0,
    inset: 0,
    width: "100%",
    height: "100%",
    padding: 0,
    border: 0,
    background:
      "rgba(2,6,23,0.52)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  modalCard: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "410px",
    padding: "18px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.16)",
    borderRadius: "28px",
    background:
      "rgba(15,23,42,0.93)",
    color: "#ffffff",
    boxShadow:
      "0 30px 90px rgba(0,0,0,0.50)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
  },

  modalHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "18px",
  },

  modalTitleGroup: {
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
      "rgba(255,255,255,0.09)",
    fontSize: "16px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.2,
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
      "rgba(255,255,255,0.08)",
    color: "#ffffff",
    fontSize: "17px",
    cursor: "pointer",
  },

  futureBox: {
    width: "100%",
    minHeight: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    boxSizing: "border-box",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.045)",
  },

  futureIcon: {
    fontSize: "28px",
    color:
      "rgba(255,255,255,0.55)",
  },

  futureText: {
    color:
      "rgba(255,255,255,0.58)",
    fontSize: "15px",
    fontWeight: "650",
  },

  qrModal: {
    maxWidth: "390px",
  },

  qrContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px 2px 8px",
    boxSizing: "border-box",
  },

  qrWhiteBox: {
    width: "min(270px, 72vw)",
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
    maxWidth: "100%",
    fontSize: "18px",
    textAlign: "center",
  },

  qrUrl: {
    width: "100%",
    marginTop: "8px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color:
      "rgba(255,255,255,0.48)",
    fontSize: "12px",
    textAlign: "center",
  },

  notice: {
    position: "fixed",
    zIndex: 3000,
    left: "50%",
    bottom:
      "max(25px, env(safe-area-inset-bottom))",
    width: "max-content",
    maxWidth: "calc(100% - 36px)",
    padding: "13px 17px",
    boxSizing: "border-box",
    transform: "translateX(-50%)",
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    background:
      "rgba(15,23,42,0.94)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    boxShadow:
      "0 15px 45px rgba(0,0,0,0.35)",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
  },
};
