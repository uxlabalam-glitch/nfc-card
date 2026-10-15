export const runtime = "nodejs";

export async function GET() {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
      return Response.json(
        { ok: false, error: "Bot token is missing." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/getWebhookInfo`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return Response.json(
        { ok: false, error: "Telegram request failed." },
        { status: 502 }
      );
    }

    const info = data.result;

    return Response.json({
      ok: true,
      webhookConnected: Boolean(info.url),
      pendingUpdates: info.pending_update_count,
      lastErrorDate: info.last_error_date || null,
      hasError: Boolean(info.last_error_message),
    });
  } catch (error) {
    console.error("WEBHOOK STATUS ERROR:", error);

    return Response.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}
