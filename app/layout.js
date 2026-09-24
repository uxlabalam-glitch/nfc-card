import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Digital Card",
  description: "Digital business card",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
