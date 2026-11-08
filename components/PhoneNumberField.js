
"use client";

import { useMemo, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";

const COUNTRIES = getCountries();

function getCountryName(code) {
  try {
    return new Intl.DisplayNames(["en"], {
      type: "region",
    }).of(code) || code;
  } catch {
    return code;
  }
}

function extractNumber(value, service) {
  const text = String(value || "");

  if (service === "whatsapp") {
    return text.startsWith("https://wa.me/")
      ? text.slice("https://wa.me/".length)
      : text.replace(/\D/g, "");
  }

  return text.startsWith("tel:")
    ? text.slice(4)
    : text;
}

export default function PhoneNumberField({
  service = "phone",
  value = "",
  onChange,
}) {
  const internationalNumber = extractNumber(
    value,
    service
  );

  const parsed = parsePhoneNumberFromString(
    internationalNumber.startsWith("+")
      ? internationalNumber
      : `+${internationalNumber}`
  );

  const [selectedCountry, setSelectedCountry] =
    useState(parsed?.country || "US");

  const callingCode = getCountryCallingCode(
    selectedCountry
  );

  const nationalNumber = (() => {
    const digits = internationalNumber.replace(
      /\D/g,
      ""
    );

    if (digits.startsWith(callingCode)) {
      return digits.slice(callingCode.length);
    }

    if (parsed?.countryCallingCode) {
      return digits.slice(
        parsed.countryCallingCode.length
      );
    }

    return digits;
  })();

  const countryOptions = useMemo(
    () =>
      COUNTRIES.map((code) => ({
        code,
        name: getCountryName(code),
        callingCode: getCountryCallingCode(code),
      })).sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    []
  );

  function updateNumber(country, national) {
    const digits = String(national || "")
      .replace(/\D/g, "")
      .slice(0, 15);

    if (!digits) {
      onChange?.("");
      return;
    }

    const code = getCountryCallingCode(country);
    const fullNumber = `${code}${digits}`;

    onChange?.(
      service === "whatsapp"
        ? `https://wa.me/${fullNumber}`
        : `tel:+${fullNumber}`
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        width: "100%",
        alignItems: "center",
      }}
    >
      <select
        aria-label="Country"
        value={selectedCountry}
        onChange={(event) => {
          const country = event.target.value;

          setSelectedCountry(country);
          updateNumber(country, nationalNumber);
        }}
        style={{
          maxWidth: "48%",
          minWidth: 115,
          padding: "12px 8px",
          borderRadius: 12,
          border: "1px solid #49616B",
          background: "#243944",
          color: "#FFFFFF",
          colorScheme: "dark",
          fontSize: 13,
        }}
      >
        {countryOptions.map((country) => (
          <option
            key={country.code}
            value={country.code}
          >
            {country.name} (+{country.callingCode})
          </option>
        ))}
      </select>

      <div
        style={{
          display: "flex",
          flex: 1,
          minWidth: 0,
          alignItems: "center",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #49616B",
        }}
      >
        <span
          style={{
            padding: "12px 8px",
            background: "#243944",
            color: "#FFFFFF",
            whiteSpace: "nowrap",
            fontSize: 13,
          }}
        >
          +{callingCode}
        </span>

        <input
          type="tel"
          inputMode="tel"
          aria-label="Phone number"
          autoComplete="tel-national"
          value={nationalNumber}
          placeholder="901234567"
          onChange={(event) =>
            updateNumber(
              selectedCountry,
              event.target.value
            )
          }
          style={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            padding: 12,
            border: 0,
            outline: "none",
            background: "#FFFFFF",
            color: "#111827",
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}
