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
        background: "#e9edf2",
      }}
    >
      {/* ORQA FON */}
      {profile.background_url && (
        <div
          style={{
            position: "fixed",
            inset: "-30px",
            backgroundImage: `url("${profile.background_url}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(18px)",
            transform: "scale(1.08)",
            opacity: 0.8,
          }}
        />
      )}

      {/* FONNI YUMSHATISH */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.22)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* ASOSIY KARTA */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          boxSizing: "border-box",
          textAlign: "center",
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          paddingBottom: "50px",
          boxShadow: "0 0 50px rgba(0,0,0,0.12)",
        }}
      >
        {/* KARTA YUQORI FONI */}
        <div
          style={{
            height: "210px",
            backgroundImage: profile.background_url
              ? `url("${profile.background_url}")`
              : "linear-gradient(135deg,#dbeafe,#f8fafc)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* AVATAR */}
        <div
          style={{
            marginTop: "-70px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {profile.photo_url ? (
            <img
              src={profile.photo_url}
              alt={profile.full_name || "Profile"}
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid white",
                boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
              }}
            />
          ) : (
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "#e5e7eb",
                border: "5px solid white",
                margin: "0 auto",
              }}
            />
          )}
        </div>

        {/* ISM */}
        <div style={{ padding: "0 22px" }}>
          <h1
            style={{
              margin: "18px 0 5px",
              fontSize: "30px",
              color: "#111827",
            }}
          >
            {profile.full_name}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            {profile.bio}
          </p>

          {/* LINKLAR */}
          <div
            style={{
              marginTop: "35px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "26px 16px",
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
                <span style={iconStyle}>
                  {getIcon(link.icon)}
                </span>

                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function getIcon(icon) {
  const icons = {
    telegram: "✈️",
    instagram: "◎",
    whatsapp: "☎",
    youtube: "▶",
    tiktok: "♪",
    phone: "📞",
    email: "✉️",
    website: "🌐",
    location: "📍",
  };

  return icons[icon?.toLowerCase()] || "🔗";
}

const linkStyle = {
  textDecoration: "none",
  color: "#111827",
  fontSize: "13px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
};

const iconStyle = {
  width: "58px",
  height: "58px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.82)",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
};
