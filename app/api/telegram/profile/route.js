import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://yzkeabplmbxkvyschlop.supabase.co";

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

/* =========================================================
   SUPABASE SERVER
========================================================= */

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
      error:
        "Telegram security data is missing.",
    };
  }

  const params =
    new URLSearchParams(initData);

  const receivedHash =
    params.get("hash");

  if (!receivedHash) {
    return {
      valid: false,
      error:
        "Telegram hash is missing.",
    };
  }

  /*
    Telegram Bot Token HMAC verification:
    faqat hash data-check-stringdan olib
    tashlanadi.

    Yangi Telegram Mini App initData ichida
    signature maydoni ham bo'lishi mumkin.
    Uni bu HMAC tekshiruvda o'chirmaymiz.
  */
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
    receivedBuffer =
      Buffer.from(
        receivedHash,
        "hex"
      );

    calculatedBuffer =
      Buffer.from(
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

  const userRaw =
    params.get("user");

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
        message || "Unauthorized.",
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
        message || "Access denied.",
    },
    {
      status: 403,
    }
  );
}

function badRequest(message) {
  return Response.json(
    {
      ok: false,
      error:
        message || "Bad request.",
    },
    {
      status: 400,
    }
  );
}

function notFound(message) {
  return Response.json(
    {
      ok: false,
      error:
        message || "Not found.",
    },
    {
      status: 404,
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
      error: "Server error.",
    },
    {
      status: 500,
    }
  );
}

/* =========================================================
   TELEGRAM USER
========================================================= */

function getVerifiedTelegramUser(
  initData
) {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN is not configured."
    );
  }

  return verifyTelegramInitData(
    initData,
    botToken
  );
}

/* =========================================================
   OWNER VERIFY
========================================================= */

async function getVerifiedOwner(
  initData,
  cardId
) {
  const verification =
    getVerifiedTelegramUser(
      initData
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

      response: badRequest(
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

      response: notFound(
        "Profile not found."
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
   LINKS
========================================================= */

async function getLinks(
  supabase,
  profileId
) {
  const {
    data,
    error,
  } = await supabase
    .from("links")
    .select("*")
    .eq(
      "profile_id",
      profileId
    )
    .order(
      "sort_order",
      {
        ascending: true,
      }
    );

  if (error) {
    throw error;
  }

  return data || [];
}

/* =========================================================
   FILE HELPERS
========================================================= */

function safeFileExtension(file) {
  const originalName =
    String(file?.name || "");

  const lastPart =
    originalName
      .split(".")
      .pop()
      ?.toLowerCase();

  if (
    lastPart &&
    /^[a-z0-9]+$/.test(lastPart) &&
    lastPart.length <= 10
  ) {
    return lastPart;
  }

  const type =
    String(file?.type || "");

  if (type === "image/png") {
    return "png";
  }

  if (
    type === "image/jpeg" ||
    type === "image/jpg"
  ) {
    return "jpg";
  }

  if (type === "image/webp") {
    return "webp";
  }

  if (type === "image/avif") {
    return "avif";
  }

  return "jpg";
}

function isAllowedImage(file) {
  if (!file) {
    return false;
  }

  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  return allowed.includes(
    String(file.type || "")
      .toLowerCase()
  );
}

function storagePathFromPublicUrl(
  url,
  bucket
) {
  if (!url) {
    return null;
  }

  try {
    const parsed =
      new URL(url);

    const marker =
      `/storage/v1/object/public/${bucket}/`;

    const index =
      parsed.pathname.indexOf(
        marker
      );

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(
      parsed.pathname.slice(
        index + marker.length
      )
    );
  } catch {
    return null;
  }
}

/* =========================================================
   CREATE PROFILE
========================================================= */

async function createProfileAction(
  body
) {
  const initData =
    typeof body?.initData ===
    "string"
      ? body.initData
      : "";

  const verification =
    getVerifiedTelegramUser(
      initData
    );

  if (!verification.valid) {
    return unauthorized(
      verification.error
    );
  }

  const supabase =
    getSupabaseAdmin();

  const telegramUser =
    verification.user;

  const {
    data: existing,
    error: existingError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq(
      "telegram_id",
      telegramUser.id
    )
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    const links =
      await getLinks(
        supabase,
        existing.id
      );

    return Response.json({
      ok: true,
      created: false,
      profile: existing,
      links,
      telegramUser,
    });
  }

  const requestedLanguage =
    typeof body?.language ===
    "string"
      ? body.language.trim()
      : "";

  const fullName = [
    telegramUser.first_name,
    telegramUser.last_name,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const baseCardId =
    `card-${telegramUser.id}`;

  let cardId =
    baseCardId;

  const {
    data: sameCard,
    error: sameCardError,
  } = await supabase
    .from("profiles")
    .select("id")
    .eq(
      "card_id",
      cardId
    )
    .maybeSingle();

  if (sameCardError) {
    throw sameCardError;
  }

  if (sameCard) {
    cardId =
      `${baseCardId}-${crypto
        .randomBytes(4)
        .toString("hex")}`;
  }

  const {
    data: created,
    error: createError,
  } = await supabase
    .from("profiles")
    .insert({
      telegram_id:
        telegramUser.id,

      card_id:
        cardId,

      full_name:
        fullName || "NFC Card",

      bio: "",

      language:
        requestedLanguage || null,

      is_premium: false,

      screen_led_enabled:
        false,

      screen_led_color:
        "#3B82F6",

      card_led_enabled:
        false,

      card_led_color:
        "#3B82F6",
    })
    .select("*")
    .single();

  if (createError) {
    throw createError;
  }

  return Response.json({
    ok: true,
    created: true,
    profile: created,
    links: [],
    telegramUser,
  });
}

/* =========================================================
   GET OWNER PROFILE
========================================================= */

async function getProfileAction(
  body
) {
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

  const links =
    await getLinks(
      owner.supabase,
      owner.profile.id
    );

  return Response.json({
    ok: true,
    profile: owner.profile,
    links,
    telegramUser:
      owner.telegramUser,
  });
}

/* =========================================================
   SAVE EDIT
========================================================= */

async function saveEditAction(
  body
) {
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

  const fullName =
    typeof body?.fullName ===
    "string"
      ? body.fullName.trim()
      : "";

  const bio =
    typeof body?.bio ===
    "string"
      ? body.bio.trim()
      : "";

  const links =
    Array.isArray(body?.links)
      ? body.links
      : [];

  const {
    data: updatedProfile,
    error: updateError,
  } = await owner.supabase
    .from("profiles")
    .update({
      full_name:
        fullName,
      bio,
    })
    .eq(
      "id",
      owner.profile.id
    )
    .select("*")
    .single();

  if (updateError) {
    throw updateError;
  }

  const {
    error: deleteLinksError,
  } = await owner.supabase
    .from("links")
    .delete()
    .eq(
      "profile_id",
      owner.profile.id
    );

  if (deleteLinksError) {
    throw deleteLinksError;
  }

  const cleanLinks =
    links
      .map(
        (link, index) => ({
          profile_id:
            owner.profile.id,

          label:
            String(
              link?.label || ""
            ).trim(),

          url:
            String(
              link?.url || ""
            ).trim(),

          icon:
            String(
              link?.icon || ""
            ).trim(),

          sort_order:
            Number.isFinite(
              Number(
                link?.sort_order
              )
            )
              ? Number(
                  link.sort_order
                )
              : index,
        })
      )
      .filter(
        (link) =>
          link.label ||
          link.url ||
          link.icon
      );

  if (cleanLinks.length > 0) {
    const {
      error: insertLinksError,
    } = await owner.supabase
      .from("links")
      .insert(cleanLinks);

    if (insertLinksError) {
      throw insertLinksError;
    }
  }

  const savedLinks =
    await getLinks(
      owner.supabase,
      owner.profile.id
    );

  return Response.json({
    ok: true,
    profile:
      updatedProfile,
    links:
      savedLinks,
  });
}

/* =========================================================
   SAVE DESIGN
========================================================= */

async function saveDesignAction(
  body
) {
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

  const screenLedEnabled =
    body?.screenLedEnabled ===
    true;

  const cardLedEnabled =
    body?.cardLedEnabled ===
    true;

  const screenLedColor =
    typeof body?.screenLedColor ===
    "string"
      ? body.screenLedColor.trim()
      : "#3B82F6";

  const cardLedColor =
    typeof body?.cardLedColor ===
    "string"
      ? body.cardLedColor.trim()
      : "#3B82F6";

  const hexColor =
    /^#[0-9A-Fa-f]{6}$/;

  const {
    data: profile,
    error,
  } = await owner.supabase
    .from("profiles")
    .update({
      screen_led_enabled:
        screenLedEnabled,

      screen_led_color:
        hexColor.test(
          screenLedColor
        )
          ? screenLedColor
          : "#3B82F6",

      card_led_enabled:
        cardLedEnabled,

      card_led_color:
        hexColor.test(
          cardLedColor
        )
          ? cardLedColor
          : "#3B82F6",
    })
    .eq(
      "id",
      owner.profile.id
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return Response.json({
    ok: true,
    profile,
  });
}

/* =========================================================
   CHANGE LANGUAGE
========================================================= */

async function changeLanguageAction(
  body
) {
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

  const language =
    typeof body?.language ===
    "string"
      ? body.language.trim()
      : "";

  if (!language) {
    return badRequest(
      "Language is missing."
    );
  }

  const owner =
    await getVerifiedOwner(
      initData,
      cardId
    );

  if (!owner.ok) {
    return owner.response;
  }

  const {
    data: profile,
    error,
  } = await owner.supabase
    .from("profiles")
    .update({
      language,
    })
    .eq(
      "id",
      owner.profile.id
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return Response.json({
    ok: true,
    profile,
  });
}

/* =========================================================
   UPLOAD IMAGE
========================================================= */

async function uploadImageAction(
  formData,
  type
) {
  const initData =
    String(
      formData.get(
        "initData"
      ) || ""
    );

  const cardId =
    String(
      formData.get(
        "cardId"
      ) || ""
    ).trim();

  const file =
    formData.get("file");

  const owner =
    await getVerifiedOwner(
      initData,
      cardId
    );

  if (!owner.ok) {
    return owner.response;
  }

  if (
    !file ||
    typeof file.arrayBuffer !==
      "function"
  ) {
    return badRequest(
      "Image file is missing."
    );
  }

  if (!isAllowedImage(file)) {
    return badRequest(
      "Unsupported image format."
    );
  }

  if (
    typeof file.size ===
      "number" &&
    file.size >
      10 * 1024 * 1024
  ) {
    return badRequest(
      "Image is too large."
    );
  }

  const isAvatar =
    type === "avatar";

  const bucket =
    isAvatar
      ? "avatars"
      : "backgrounds";

  const column =
    isAvatar
      ? "photo_url"
      : "background_url";

  const oldUrl =
    owner.profile[column] ||
    "";

  const extension =
    safeFileExtension(file);

  const filePath =
    `${owner.profile.id}/${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}.${extension}`;

  const arrayBuffer =
    await file.arrayBuffer();

  const buffer =
    Buffer.from(
      arrayBuffer
    );

  const {
    error: uploadError,
  } = await owner.supabase
    .storage
    .from(bucket)
    .upload(
      filePath,
      buffer,
      {
        contentType:
          file.type ||
          "image/jpeg",

        upsert: false,
      }
    );

  if (uploadError) {
    throw uploadError;
  }

  const {
    data: publicData,
  } = owner.supabase
    .storage
    .from(bucket)
    .getPublicUrl(
      filePath
    );

  const publicUrl =
    publicData?.publicUrl;

  if (!publicUrl) {
    await owner.supabase
      .storage
      .from(bucket)
      .remove([
        filePath,
      ]);

    throw new Error(
      "Public URL was not created."
    );
  }

  const {
    data: profile,
    error: profileError,
  } = await owner.supabase
    .from("profiles")
    .update({
      [column]:
        publicUrl,
    })
    .eq(
      "id",
      owner.profile.id
    )
    .select("*")
    .single();

  if (profileError) {
    await owner.supabase
      .storage
      .from(bucket)
      .remove([
        filePath,
      ]);

    throw profileError;
  }

  const oldPath =
    storagePathFromPublicUrl(
      oldUrl,
      bucket
    );

  if (
    oldPath &&
    oldPath !== filePath
  ) {
    const {
      error: removeOldError,
    } = await owner.supabase
      .storage
      .from(bucket)
      .remove([
        oldPath,
      ]);

    if (removeOldError) {
      console.error(
        "OLD IMAGE DELETE ERROR:",
        removeOldError
      );
    }
  }

  return Response.json({
    ok: true,
    profile,
    url:
      publicUrl,
  });
}

/* =========================================================
   DELETE PROFILE
========================================================= */

async function deleteProfileAction(
  body
) {
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

  const avatarPath =
    storagePathFromPublicUrl(
      owner.profile.photo_url,
      "avatars"
    );

  const backgroundPath =
    storagePathFromPublicUrl(
      owner.profile.background_url,
      "backgrounds"
    );

  const {
    error: linksError,
  } = await owner.supabase
    .from("links")
    .delete()
    .eq(
      "profile_id",
      owner.profile.id
    );

  if (linksError) {
    throw linksError;
  }

  const {
    error: profileError,
  } = await owner.supabase
    .from("profiles")
    .delete()
    .eq(
      "id",
      owner.profile.id
    );

  if (profileError) {
    throw profileError;
  }

  if (avatarPath) {
    const {
      error,
    } = await owner.supabase
      .storage
      .from("avatars")
      .remove([
        avatarPath,
      ]);

    if (error) {
      console.error(
        "AVATAR DELETE ERROR:",
        error
      );
    }
  }

  if (backgroundPath) {
    const {
      error,
    } = await owner.supabase
      .storage
      .from("backgrounds")
      .remove([
        backgroundPath,
      ]);

    if (error) {
      console.error(
        "BACKGROUND DELETE ERROR:",
        error
      );
    }
  }

  return Response.json({
    ok: true,
    deleted: true,
  });
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request
) {
  try {
    const contentType =
      request.headers.get(
        "content-type"
      ) || "";

    if (
      contentType.includes(
        "multipart/form-data"
      )
    ) {
      const formData =
        await request.formData();

      const action =
        String(
          formData.get(
            "action"
          ) || ""
        );

      if (
        action ===
        "uploadAvatar"
      ) {
        return await uploadImageAction(
          formData,
          "avatar"
        );
      }

      if (
        action ===
        "uploadBackground"
      ) {
        return await uploadImageAction(
          formData,
          "background"
        );
      }

      return badRequest(
        "Unknown upload action."
      );
    }

    const body =
      await request.json();

    const action =
      typeof body?.action ===
      "string"
        ? body.action
        : "get";

    if (
      action === "get"
    ) {
      return await getProfileAction(
        body
      );
    }

    if (
      action ===
      "createProfile"
    ) {
      return await createProfileAction(
        body
      );
    }

    if (
      action ===
      "saveEdit"
    ) {
      return await saveEditAction(
        body
      );
    }

    if (
      action ===
      "saveDesign"
    ) {
      return await saveDesignAction(
        body
      );
    }

    if (
      action ===
      "changeLanguage"
    ) {
      return await changeLanguageAction(
        body
      );
    }

    if (
      action ===
      "deleteProfile"
    ) {
      return await deleteProfileAction(
        body
      );
    }

    return badRequest(
      "Unknown action."
    );
  } catch (error) {
    return serverError(
      error
    );
  }
}
