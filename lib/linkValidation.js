
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export const SERVICE_URL_PREFIXES = {
  telegram: "https://t.me/",
  whatsapp: "https://wa.me/",
  instagram: "https://www.instagram.com/",
  threads: "https://www.threads.net/@",
  youtube: "https://www.youtube.com/@",
  tiktok: "https://www.tiktok.com/@",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/in/",
  x: "https://x.com/",
  vk: "https://vk.com/",
  ok: "https://ok.ru/profile/",
  phone: "tel:",
  email: "mailto:",
};

export const LINK_SERVICES = [
  ...Object.keys(SERVICE_URL_PREFIXES),
  "website",
  "location",
];

const SOCIAL_PATTERNS = {
  telegram: /^[A-Za-z][A-Za-z0-9_]{4,31}$/,
  instagram: /^(?!\.)(?!.*\.\.)(?!.*\.$)[A-Za-z0-9._]{1,30}$/,
  threads: /^[A-Za-z0-9._]{1,30}$/,
  youtube: /^[A-Za-z0-9._-]{3,30}$/,
  tiktok: /^[A-Za-z0-9._]{1,24}$/,
  facebook: /^[A-Za-z0-9.]{1,50}$/,
  linkedin: /^[A-Za-z0-9_-]{3,100}$/,
  x: /^[A-Za-z0-9_]{1,15}$/,
  vk: /^[A-Za-z0-9_.]{1,100}$/,
  ok: /^[0-9]+$/,
};

const MAP_HOSTS = new Set([
  "google.com",
  "www.google.com",
  "maps.google.com",
  "maps.app.goo.gl",
  "yandex.com",
  "yandex.ru",
  "yandex.uz",
  "maps.yandex.com",
  "yandex.com",
  "yandex.uz",
  "yandex.ru",
  "2gis.ru",
  "2gis.com",
  "2gis.uz",
  "maps.apple.com",
  "www.openstreetmap.org",
]);

function result(ok, url = "", error = "") {
  return { ok, url, error };
}


function parseHttpsUrl(value) {
  try {
    const parsed = new URL(value);
    const hostname = parsed.hostname.toLowerCase();

    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      parsed.port ||
      hostname.length > 253 ||
      !hostname.includes(".") ||
      hostname.endsWith(".") ||
      hostname.startsWith("[") ||
      /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname) ||
      /(^|\.)(localhost|local|internal|test|invalid|onion)$/.test(hostname) ||
      !/^[a-z0-9.-]+$/.test(hostname) ||
      hostname.split(".").some(
        (part) =>
          !part ||
          part.length > 63 ||
          part.startsWith("-") ||
          part.endsWith("-")
      )
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}


export function validateLink(icon, rawUrl) {
  const service = String(icon || "").trim().toLowerCase();
  const value = String(rawUrl || "").trim();

  if (!LINK_SERVICES.includes(service)) {
    return result(false, "", "Unsupported service.");
  }

  if (!value || value.length > 2048) {
    return result(false, "", "Link is empty or too long.");
  }

  if (/[\u0000-\u001F\u007F\\]/.test(value)) {
    return result(false, "", "Invalid characters in link.");
  }

  if (service === "phone") {
    if (!/^tel:\+[1-9][0-9]{7,14}$/.test(value)) {
      return result(false, "", "Invalid phone format.");
    }

    const phone = parsePhoneNumberFromString(value.slice(4));

    if (!phone || !phone.isValid()) {
      return result(false, "", "Invalid phone number.");
    }

    return result(true, `tel:${phone.number}`);
  }

  if (service === "whatsapp") {
    const match = /^https:\/\/wa\.me\/([1-9][0-9]{6,14})$/.exec(value);

    if (!match) {
      return result(false, "", "Invalid WhatsApp link.");
    }

    const phone = parsePhoneNumberFromString(`+${match[1]}`);

    if (!phone || !phone.isValid()) {
      return result(false, "", "Invalid WhatsApp number.");
    }

    return result(true, `https://wa.me/${phone.number.slice(1)}`);
  }

  if (service === "email") {
    const email = value.startsWith("mailto:")
      ? value.slice(7)
      : "";

    const valid =
      email.length <= 254 &&
      /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(email);

    return valid
      ? result(true, `mailto:${email}`)
      : result(false, "", "Invalid email address.");
  }

  if (service === "website" || service === "location") {
    const parsed = parseHttpsUrl(value);

    if (!parsed || parsed.hostname.length > 253) {
      return result(false, "", "Invalid HTTPS link.");
    }

    if (service === "location" && !MAP_HOSTS.has(parsed.hostname.toLowerCase())) {
      return result(false, "", "Unsupported map service.");
    }

    return result(true, parsed.href);
  }

  const prefix = SERVICE_URL_PREFIXES[service];
  if (!value.startsWith(prefix)) {
    return result(false, "", "Invalid service domain.");
  }

  const username = value.slice(prefix.length);
  const pattern = SOCIAL_PATTERNS[service];

  if (!pattern || !pattern.test(username)) {
    return result(false, "", "Invalid profile identifier.");
  }

  if (service === "telegram" && /^(?:joinchat|addstickers)$/i.test(username)) {
    return result(false, "", "Invalid Telegram profile.");
  }

  if (
    service === "instagram" &&
    /^(?:p|reel|reels|stories|explore|direct)$/i.test(username)
  ) {
    return result(false, "", "Invalid Instagram profile.");
  }

  return result(true, prefix + username);
}
