
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

function parsePremiumPayload(payload) {
  const match = /^premium30:(\d+):(\d+):([a-f0-9]{24})$/.exec(
    String(payload || "")
  );

  if (!match) return null;

  return {
    telegramId: match[1],
    profileId: match[2],
  };
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase configuration missing.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function telegramApi(method, body) {
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/${method}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(`Telegram ${method} failed.`);
  }

  return result.result;
}

async function verifyProfile(supabase, payload, userId) {
  const parsed = parsePremiumPayload(payload);

  if (!parsed || parsed.telegramId !== String(userId)) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, telegram_id")
    .eq("id", parsed.profileId)
    .maybeSingle();

  if (error) throw error;

  if (
    !data ||
    String(data.telegram_id) !== parsed.telegramId
  ) {
    return null;
  }

  return data;
}

export async function POST(request) {
  try {
    if (!botToken || !webhookSecret) {
      throw new Error("Telegram webhook configuration missing.");
    }

    const receivedSecret =
      request.headers.get("x-telegram-bot-api-secret-token") || "";

    const expected = Buffer.from(webhookSecret);
    const received = Buffer.from(receivedSecret);

    if (
      expected.length !== received.length ||
      !crypto.timingSafeEqual(expected, received)
    ) {
      return Response.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const update = await request.json();

    if (update.pre_checkout_query) {
      const query = update.pre_checkout_query;

      const validAmount =
        query.currency === "XTR" &&
        query.total_amount === 1;

      let approved = false;

      if (validAmount) {
        try {
          const supabase = getSupabase();

          approved = Boolean(
            await verifyProfile(
              supabase,
              query.invoice_payload,
              query.from?.id
            )
          );
        } catch (error) {
          console.error("Pre-checkout verification:", error);
        }
      }

      await telegramApi("answerPreCheckoutQuery", {
        pre_checkout_query_id: query.id,
        ok: approved,
        ...(approved
          ? {}
          : {
              error_message:
                "Premium xaridini hozir tasdiqlab bo‘lmadi.",
            }),
      });

      return Response.json({ ok: true });
    }

    const payment = update.message?.successful_payment;

    if (payment) {
      if (
        payment.currency !== "XTR" ||
        payment.total_amount !== 1 ||
        !payment.telegram_payment_charge_id
      ) {
        console.error("Unexpected Premium payment:", payment);
        return Response.json({ ok: true });
      }

      const supabase = getSupabase();

      const profile = await verifyProfile(
        supabase,
        payment.invoice_payload,
        update.message.from?.id
      );

      if (!profile) {
        console.error("Payment profile verification failed.");
        return Response.json(
          { ok: false, error: "Profile verification failed." },
          { status: 500 }
        );
      }

      const { error } = await supabase.rpc(
        "activate_premium_payment",
        {
          p_charge_id: payment.telegram_payment_charge_id,
          p_telegram_id: Number(update.message.from.id),
          p_profile_id: profile.id,
          p_stars: 1,
        }
      );

      if (error) throw error;

      return Response.json({ ok: true });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("PREMIUM WEBHOOK ERROR:", error);

    return Response.json(
      { ok: false, error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}

