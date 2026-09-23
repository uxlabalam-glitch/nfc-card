export default function CardPage() {
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
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            background: "#e5e5e5",
            margin: "0 auto 20px",
          }}
        />

        <h1 style={{ marginBottom: "6px" }}>
          Ism Familiya
        </h1>

        <p style={{ marginTop: "0", color: "#777" }}>
          Lavozim yoki qisqa ma'lumot
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
          }}
        >
          <a href="https://t.me/" style={linkStyle}>
            <span style={iconStyle}>✈️</span>
            Telegram
          </a>

          <a href="https://instagram.com/" style={linkStyle}>
            <span style={iconStyle}>◎</span>
            Instagram
          </a>

          <a href="https://wa.me/" style={linkStyle}>
            <span style={iconStyle}>☎</span>
            WhatsApp
          </a>

          <a href="https://youtube.com/" style={linkStyle}>
            <span style={iconStyle}>▶</span>
            YouTube
          </a>

          <a href="https://example.com/" style={linkStyle}>
            <span style={iconStyle}>🌐</span>
            Website
          </a>

          <a href="https://maps.google.com/" style={linkStyle}>
            <span style={iconStyle}>📍</span>
            Toshkent
          </a>
        </div>
      </div>
    </main>
  );
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
