import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/* =========================================================
   SUPABASE SERVER
========================================================= */

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://yzkeabplmbxkvyschlop.supabase.co";

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseAdmin() {
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured."
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/* =========================================================
   TELEGRAM VERIFY
========================================================= */

function verifyTelegramInitData(
  initData,
  botToken
) {
  if (!initData || !botToken) {
    return {
      valid: false,
      error: "Telegram security data is missing.",
    };
  }

  const params = new URLSearchParams(initData);

  const receivedHash = params.get("hash");

  if (!receivedHash) {
    return {
      valid: false,
      error: "Telegram hash is missing.",
    };
  }

  params.delete("hash");

  const dataCheckString = [
    ...params.entries(),
  ]
    .sort(([a], [b]) =>
      a.localeCompare(b)
    )
    .map(
      ([key, value]) =>
        `${key}=${value}`
    )
    .join("\n");

  const secretKey = crypto
    .createHmac(
      "sha256",
      "WebAppData"
    )
    .update(botToken)
    .digest();

  const calculatedHash = crypto
    .createHmac(
      "sha256",
      secretKey
    )
    .update(dataCheckString)
    .digest("hex");

  let receivedBuffer;
  let calculatedBuffer;

  try {
    receivedBuffer = Buffer.from(
      receivedHash,
      "hex"
    );

    calculatedBuffer = Buffer.from(
      calculatedHash,
      "hex"
    );
  } catch {
    return {
      valid: false,
      error:
        "Telegram hash is invalid.",
    };
  }

  if (
    receivedBuffer.length !==
      calculatedBuffer.length ||
    !crypto.timingSafeEqual(
      receivedBuffer,
      calculatedBuffer
    )
  ) {
    return {
      valid: false,
      error:
        "Telegram verification failed.",
    };
  }

  const authDate = Number(
    params.get("auth_date")
  );

  if (!authDate) {
    return {
      valid: false,
      error:
        "Telegram auth date is missing.",
    };
  }

  const now = Math.floor(
    Date.now() / 1000
  );

  if (
    now - authDate > 86400 ||
    authDate > now + 60
  ) {
    return {
      valid: false,
      error:
        "Telegram session has expired.",
    };
  }

  const userRaw = params.get("user");

  if (!userRaw) {
    return {
      valid: false,
      error:
        "Telegram user is missing.",
    };
  }

  let user;

  try {
    user = JSON.parse(userRaw);
  } catch {
    return {
      valid: false,
      error:
        "Telegram user data is invalid.",
    };
  }

  if (!user?.id) {
    return {
      valid: false,
      error:
        "Telegram user ID is missing.",
    };
  }

  return {
    valid: true,

    user: {
      id: Number(user.id),

      first_name:
        user.first_name || "",

      last_name:
        user.last_name || "",

      username:
        user.username || "",

      language_code:
        user.language_code || "",
    },
  };
}

/* =========================================================
   RESPONSE HELPERS
========================================================= */

function unauthorized(message) {
  return Response.json(
    {
      ok: false,
      error:
        message ||
        "Unauthorized.",
    },
    {
      status: 401,
    }
  );
}

function forbidden(message) {
  return Response.json(
    {
      ok: false,
      error:
        message ||
        "Access denied.",
    },
    {
      status: 403,
    }
  );
}

function serverError(error) {
  console.error(
    "TELEGRAM PROFILE API ERROR:",
    error
  );

  return Response.json(
    {
      ok: false,
      error:
        "Server error.",
    },
    {
      status: 500,
    }
  );
}

/* =========================================================
   VERIFY REQUEST OWNER
========================================================= */

async function getVerifiedOwner(
  initData,
  cardId
) {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN is not configured."
    );
  }

  const verification =
    verifyTelegramInitData(
      initData,
      botToken
    );

  if (!verification.valid) {
    return {
      ok: false,
      response: unauthorized(
        verification.error
      ),
    };
  }

  if (!cardId) {
    return {
      ok: false,
      response: forbidden(
        "Card ID is missing."
      ),
    };
  }

  const supabase =
    getSupabaseAdmin();

  const {
    data: profile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq("card_id", cardId)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  if (!profile) {
    return {
      ok: false,

      response: Response.json(
        {
          ok: false,
          error:
            "Profile not found.",
        },
        {
          status: 404,
        }
      ),
    };
  }

  if (
    String(profile.telegram_id) !==
    String(verification.user.id)
  ) {
    return {
      ok: false,

      response: forbidden(
        "This profile does not belong to this Telegram account."
      ),
    };
  }

  return {
    ok: true,
    supabase,
    profile,
    telegramUser:
      verification.user,
  };
}

/* =========================================================
   GET PROFILE
========================================================= */

export async function POST(request) {
  try {
    const body =
      await request.json();

    const initData =
      typeof body?.initData ===
      "string"
        ? body.initData
        : "";

    const cardId =
      typeof body?.cardId ===
      "string"
        ? body.cardId.trim()
        : "";

    const owner =
      await getVerifiedOwner(
        initData,
        cardId
      );

    if (!owner.ok) {
      return owner.response;
    }

    const {
      data: links,
      error: linksError,
    } = await owner.supabase
      .from("links")
      .select("*")
      .eq(
        "profile_id",
        owner.profile.id
      )
      .order("sort_order", {
        ascending: true,
      });

    if (linksError) {
      throw linksError;
    }

    return Response.json({
      ok: true,

      profile: owner.profile,

      links: links || [],

      telegramUser:
        owner.telegramUser,
    });
  } catch (error) {
    return serverError(error);
  }
}
