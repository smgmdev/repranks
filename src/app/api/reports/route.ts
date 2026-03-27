import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true; // Same-origin requests may not have origin header
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

// GET — get user's report credits
export async function GET() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    const { data: newProfile, error } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
        plan: "free",
        reports_used: 0,
        reports_limit: 1,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
    }
    profile = newProfile;
  }

  return NextResponse.json({
    plan: profile.plan,
    reportsUsed: profile.reports_used,
    reportsLimit: profile.reports_limit,
    remaining: Math.max(0, profile.reports_limit - profile.reports_used),
  });
}

// POST — use a report credit
export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { companyName?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const companyName = typeof body.companyName === "string" ? body.companyName.slice(0, 200).trim() : "";
  const website = typeof body.website === "string" ? body.website.slice(0, 500).trim() : "";

  if (!companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (profile.reports_used >= profile.reports_limit) {
    return NextResponse.json({ error: "No reports remaining. Please upgrade." }, { status: 403 });
  }

  // Increment with optimistic locking
  const { error: incError, count } = await supabase
    .from("profiles")
    .update({ reports_used: profile.reports_used + 1 })
    .eq("id", user.id)
    .eq("reports_used", profile.reports_used); // Only update if value hasn't changed

  if (incError || count === 0) {
    return NextResponse.json({ error: "Please try again" }, { status: 409 });
  }

  await supabase.from("reports").insert({
    user_id: user.id,
    company_name: companyName,
    website: website || null,
    created_at: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    remaining: Math.max(0, profile.reports_limit - profile.reports_used - 1),
  });
}
