import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

import {
  SiTelegram,
  SiWhatsapp,
  SiInstagram,
  SiYoutube,
  SiTiktok,
  SiFacebook,
  SiLinkedin,
} from "react-icons/si";

import {
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaLocationDot,
  FaLink,
} from "react-icons/fa6";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default async function CardPage({ params }) {
  const { id } = await params;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("card_id", id)
    .single();

  if (error || !profile) {
    notFound();
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("sort_order", { ascending: true });

  return (
    <main
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        background: "#dfe7ef",
        overflowX: "hidden",
      }}
    >
      {/* ==================================================
          TASHQI XIRA FON
      ================================================== */}

      {profile.background_url && (
        <div
          style={{
            position: "fixed",
            inset: "-25px",
            backgroundImage: `url("${profile.background_url}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",

            /* FAQAT ATROFDAGI RASM BLUR */
            filter: "blur(14px)",
            transform: "scale(1.10)",
            opacity: 0.78,
          }}
        />
      )}

      {/* TASHQI FON USTIDAGI YENGIL QATLAM */}

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* ==================================================
          TELEFON / VIZITKA QISMI
      ================================================== */}

      <section
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          overflow: "hidden",

          boxShadow:
            "0 0 45px rgba(0,0,0,0.22)",

          background: "#eef3f7",
        }}
      >
        {/* ==================================================
            KARTA ICHIDAGI ASOSIY TINIQ FON
        ================================================== */}

        {profile.background_url && (
          <div
            style={{
              position: "absolute",
              inset: 0,

              backgroundImage:
                `url("${profile.background_url}")`,

              backgroundSize: "cover",
              backgroundPosition: "center",

              zIndex: 0,
            }}
          />
        )}

        {/* FON USTIDAGI YENGIL QATLAM */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,

            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(220,240,250,0.18))",
          }}
        />

        {/* ==================================================
            KONTENT
        ================================================== */}

        <div
          style={{
            position: "relative",
            zIndex: 2,

            minHeight: "100vh",

            padding: "280px 20px 50px",

            boxSizing: "border-box",
          }}
        >
          {/* ==================================================
              GLASS PANEL
          ================================================== */}

          <div
            style={{
              position: "relative",

              padding: "78px 20px 30px",

              borderRadius: "32px",

              background:
                "rgba(255,255,255,0.68)",

              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",

              border:
                "1px solid rgba(255,255,255,0.65)",

              boxShadow:
                "0 12px 40px rgba(0,0,0,0.14)",

              textAlign: "center",
            }}
          >
            {/* ==================================================
                AVATAR
            ================================================== */}

            <div
              style={{
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
              }}
            >
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={
                    profile.full_name ||
                    "Profile"
                  }
                  style={{
                    width: "100%",
                    height: "100%",

                    borderRadius: "50%",

                    objectFit: "cover",

                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
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
                  }}
                >
                  👤
                </div>
              )}
            </div>

            {/* ==================================================
                ISM
            ================================================== */}

            <h1
              style={{
                margin: "0 0 6px",

                fontSize: "32px",

                lineHeight: 1.15,

                color: "#111827",

                fontWeight: "800",
              }}
            >
              {profile.full_name}
            </h1>

            {/* ==================================================
                BIO
            ================================================== */}

            {profile.bio && (
              <p
                style={{
                  margin: "0",

                  color: "#667085",

                  fontSize: "16px",

                  lineHeight: 1.5,
                }}
              >
                {profile.bio}
              </p>
            )}

            {/* ==================================================
                LINKLAR
            ================================================== */}

            <div
              style={{
                marginTop: "30px",

                display: "grid",

                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",

                gap: "22px 12px",
              }}
            >
              {links?.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  <span
                    style={{
                      ...iconStyle,
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
                    style={{
                      maxWidth: "100%",

                      overflow: "hidden",

                      textOverflow:
                        "ellipsis",

                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
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

  const size = 29;

  switch (name) {
    case "telegram":
      return <SiTelegram size={size} />;

    case "whatsapp":
      return <SiWhatsapp size={size} />;

    case "instagram":
      return <SiInstagram size={size} />;

    case "youtube":
      return <SiYoutube size={size} />;

    case "tiktok":
      return <SiTiktok size={size} />;

    case "facebook":
      return <SiFacebook size={size} />;

    case "linkedin":
      return <SiLinkedin size={size} />;

    case "phone":
      return <FaPhone size={25} />;

    case "email":
      return <FaEnvelope size={26} />;

    case "website":
      return <FaGlobe size={27} />;

    case "location":
      return <FaLocationDot size={27} />;

    default:
      return <FaLink size={26} />;
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
   LINK STYLE
========================================================= */

const linkStyle = {
  minWidth: 0,

  textDecoration: "none",

  color: "#111827",

  fontSize: "13px",

  fontWeight: "600",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  gap: "8px",
};

/* =========================================================
   ICON STYLE
========================================================= */

const iconStyle = {
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
};
