import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

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
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        background: "#eeeeee",
      }}
    >
      {/* XIRA ORQA FON */}
      {profile.background_url && (
        <div
          style={{
            position: "fixed",
            inset: "-30px",
            backgroundImage: `url("${profile.background_url}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(7px)",
            transform: "scale(1.03)",
            opacity: 0.82,
          }}
        />
      )}

      {/* FONNI BIR OZ YUMSHATISH */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.08)",
        }}
      />

      {/* ASOSIY VIZITKA */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          background: "rgba(255,255,255,0.96)",
          textAlign: "center",
          padding: "50px 20px",
          boxSizing: "border-box",
          boxShadow: "0 0 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* AVATAR */}
        {profile.photo_url ? (
          <img
            src={profile.photo_url}
            alt={profile.full_name || "Profile"}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        ) : (
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              background: "#e5e5e5",
              margin: "0 auto 20px",
            }}
          />
        )}

        <h1
          style={{
            margin: "0 0 6px",
            fontSize: "32px",
          }}
        >
          {profile.full_name}
        </h1>

        <p
          style={{
            margin: 0,
            color: "#777",
            fontSize: "16px",
          }}
        >
          {profile.bio}
        </p>

        {/* LINKLAR */}
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px 18px",
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
              <span style={iconStyle}>{getIcon(link.icon)}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

function getIcon(icon) {
  const icons = {
    telegram: "✈️",
    instagram: "◎",
    whatsapp: "☎",
    youtube: "▶",
    website: "🌐",
    location: "📍",
    facebook: "f",
    tiktok: "♪",
    linkedin: "in",
    email: "✉️",
    phone: "☎",
  };

  return icons[String(icon || "").toLowerCase()] || "🔗";
}

const linkStyle = {
  textDecoration: "none",
  color: "#111",
  fontSize: "13px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
};

const iconStyle = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  background: "#f1f1f1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};
