import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }

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

export async function GET(request) {
  try {
    const { searchParams } = new URL(
      request.url
    );

    const slug = String(
      searchParams.get("slug") || ""
    ).trim();

    if (!slug) {
      return Response.json(
        {
          ok: false,
          error: "Public slug is missing.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      getSupabaseAdmin();

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        `
          id,
          public_slug,
          full_name,
          bio,
          photo_url,
          background_url,
          language,
          screen_led_enabled,
          screen_led_color,
          card_led_enabled,
          card_led_color
        `
      )
      .eq("public_slug", slug)
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    if (!profile) {
      return Response.json(
        {
          ok: false,
          error: "Profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    const {
      data: links,
      error: linksError,
    } = await supabase
      .from("links")
      .select(
        `
          id,
          label,
          url,
          icon,
          sort_order
        `
      )
      .eq("profile_id", profile.id)
      .order("sort_order", {
        ascending: true,
      });

    if (linksError) {
      throw linksError;
    }

    // Ichki database ID public browserga
    // qaytarilmaydi.
    const {
      id,
      ...publicProfile
    } = profile;

    return Response.json(
      {
        ok: true,
        profile: publicProfile,
        links: links || [],
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, max-age=30, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error(
      "PUBLIC PROFILE API ERROR:",
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
}
