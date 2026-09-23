import "./globals.css";

export const metadata = {
  title: "Digital Card",
  description: "Digital business card",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
