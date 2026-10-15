export const runtime = "nodejs";

export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

    if (!botToken || !webhookSecret) {
      return Response.json(
        { ok: false, error: "Server configuration missing." },
        { status: 500 }
      );
    }

    const authorization = request.headers.get("authorization") || "";
    const expected = `Bearer ${webhookSecret}`;

    if (authorization !== expected) {
      return Response.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const webhookUrl =
      "https://nfcqrinfo.vercel.app/api/telegram/premium/webhook";

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/setWebhook`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: webhookUrl,
          secret_token: webhookSecret,
          allowed_updates: [
            "message",
            "pre_checkout_query",
          ],
          drop_pending_updates: false,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.ok) {
      return Response.json(
        {
          ok: false,
          error: "Telegram webhook setup failed.",
        },
        { status: 502 }
      );
    }

    return Response.json({
      ok: true,
      webhookConnected: true,
    });
  } catch (error) {
    console.error("WEBHOOK SETUP ERROR:", error);

    return Response.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}
