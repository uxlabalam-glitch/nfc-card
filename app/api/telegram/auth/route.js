import crypto from "crypto";

export const runtime = "nodejs";

function verifyTelegramInitData(initData, botToken) {
  if (!initData || !botToken) {
    return {
      valid: false,
      error: "Telegram ma’lumoti yoki BOT_TOKEN yo‘q.",
    };
  }

  const params = new URLSearchParams(initData);

  const receivedHash = params.get("hash");

  if (!receivedHash) {
    return {
      valid: false,
      error: "Telegram hash topilmadi.",
    };
  }

  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const receivedBuffer = Buffer.from(receivedHash, "hex");
  const calculatedBuffer = Buffer.from(calculatedHash, "hex");

  if (
    receivedBuffer.length !== calculatedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, calculatedBuffer)
  ) {
    return {
      valid: false,
      error: "Telegram tekshiruvi muvaffaqiyatsiz.",
    };
  }

  const authDate = Number(params.get("auth_date"));

  if (!authDate) {
    return {
      valid: false,
      error: "auth_date topilmadi.",
    };
  }

  const now = Math.floor(Date.now() / 1000);

  // initData 24 soatdan eski bo‘lsa qabul qilmaymiz.
  if (now - authDate > 86400 || authDate > now + 60) {
    return {
      valid: false,
      error: "Telegram sessiyasi eskirgan.",
    };
  }

  const userRaw = params.get("user");

  if (!userRaw) {
    return {
      valid: false,
      error: "Telegram foydalanuvchisi topilmadi.",
    };
  }

  let user;

  try {
    user = JSON.parse(userRaw);
  } catch {
    return {
      valid: false,
      error: "Telegram user ma’lumoti noto‘g‘ri.",
    };
  }

  if (!user?.id) {
    return {
      valid: false,
      error: "Telegram ID topilmadi.",
    };
  }

  return {
    valid: true,
    user: {
      id: user.id,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      language_code: user.language_code || "",
    },
  };
}

export async function POST(request) {
  try {
    const body = await request.json();

    const initData =
      typeof body?.initData === "string"
        ? body.initData
        : "";

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      console.error("TELEGRAM_BOT_TOKEN is not configured.");

      return Response.json(
        {
          ok: false,
          error: "Server sozlamasi topilmadi.",
        },
        {
          status: 500,
        }
      );
    }

    const result = verifyTelegramInitData(
      initData,
      botToken
    );

    if (!result.valid) {
      return Response.json(
        {
          ok: false,
          error: result.error,
        },
        {
          status: 401,
        }
      );
    }

    return Response.json({
      ok: true,

      telegramUser: result.user,

      telegramId: String(result.user.id),
    });
  } catch (error) {
    console.error(
      "TELEGRAM AUTH ERROR:",
      error
    );

    return Response.json(
      {
        ok: false,
        error: "Telegram tekshiruvida server xatosi.",
      },
      {
        status: 500,
      }
    );
  }
