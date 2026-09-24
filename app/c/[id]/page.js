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
        display: "flex",
        justifyContent: "center",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          background: "white",
          textAlign: "center",
          padding: "50px 20px",
          boxSizing: "border-box",
        }}
      >
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

        <h1 style={{ marginBottom: "6px" }}>
          {profile.full_name}
        </h1>

        <p style={{ marginTop: 0, color: "#777" }}>
          {profile.bio}
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
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

              {link.label}
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
  };

  return icons[icon] || "🔗";
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
