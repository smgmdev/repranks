import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

const VALID_PLANS = ["single", "starter", "pro"] as const;

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!checkOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { plan?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const plan = body.plan;
  if (!plan || !VALID_PLANS.includes(plan as typeof VALID_PLANS[number])) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  // TODO: Verify Stripe payment before upgrading
  // In production, this endpoint should:
  // 1. Create a Stripe Checkout session
  // 2. Redirect user to Stripe
  // 3. Handle webhook on payment success to update the profile
  // For demo purposes, we simulate instant upgrade below.

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  let newLimit = profile.reports_limit;
  let newPlan = profile.plan;
  let newUsed = profile.reports_used;

  if (plan === "single") {
    newLimit = profile.reports_limit + 1;
  } else if (plan === "starter") {
    newPlan = "starter";
    newLimit = 5;
    newUsed = 0;
  } else if (plan === "pro") {
    newPlan = "pro";
    newLimit = 20;
    newUsed = 0;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      plan: newPlan,
      reports_limit: newLimit,
      reports_used: newUsed,
    })
    .eq("id", user.id);

  if (error) {
    return NextResponse.json({ error: "Failed to upgrade" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    plan: newPlan,
    remaining: Math.max(0, newLimit - newUsed),
  });
}
