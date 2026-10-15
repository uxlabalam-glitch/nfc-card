

import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

function verifyTelegram(initData, botToken) {
  if (!initData || !botToken) return null;

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");

  if (!hash || !/^[0-9a-f]{64}$/i.test(hash)) {
    return null;
  }

  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secret = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const expected = crypto
    .createHmac("sha256", secret)
    .update(dataCheckString)
    .digest();

  const received = Buffer.from(hash, "hex");

  if (!crypto.timingSafeEqual(expected, received)) {
    return null;
  }

  const authDate = Number(params.get("auth_date"));
  const now = Math.floor(Date.now() / 1000);

  if (
    !Number.isFinite(authDate) ||
    authDate > now + 60 ||
    now - authDate > 86400
  ) {
    return null;
  }

  try {
    const user = JSON.parse(params.get("user") || "");
    return user?.id ? user : null;
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!botToken || !serviceKey || !supabaseUrl) {
      return Response.json(
        { ok: false, error: "Server configuration missing." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const initData = body?.initData;
    const cardId = body?.cardId;

    const user = verifyTelegram(initData, botToken);

    if (!user) {
      return Response.json(
        { ok: false, error: "Telegram verification failed." },
        { status: 401 }
      );
    }

    if (typeof cardId !== "string" || !cardId.trim()) {
      return Response.json(
        { ok: false, error: "Card ID missing." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("id, telegram_id, card_id")
        .eq("card_id", cardId)
        .maybeSingle();

    if (profileError) throw profileError;

    if (
      !profile ||
      String(profile.telegram_id) !== String(user.id)
    ) {
      return Response.json(
        { ok: false, error: "Profile access denied." },
        { status: 403 }
      );
    }

    const payload = [
      "premium30",
      String(user.id),
      String(profile.id),
      crypto.randomBytes(12).toString("hex"),
    ].join(":");

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/createInvoiceLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "NFC/QR Info Premium",
          description:
            "Barcha Premium imkoniyatlardan 30 kun foydalanish.",
          payload,
          provider_token: "",
          currency: "XTR",
          prices: [
            {
              label: "30 kunlik Premium",
              amount: 1,
            },
          ],
        }),
        cache: "no-store",
      }
    );

    const invoice = await telegramResponse.json();

    if (!telegramResponse.ok || !invoice.ok) {
      console.error("Telegram invoice error:", invoice);
      throw new Error("Telegram invoice creation failed.");
    }

    return Response.json({
      ok: true,
      invoiceUrl: invoice.result,
    });
  } catch (error) {
    console.error("PREMIUM INVOICE ERROR:", error);

    return Response.json(
      {
        ok: false,
        error: "Premium invoice could not be created.",
      },
      { status: 500 }
    );
  }
}
