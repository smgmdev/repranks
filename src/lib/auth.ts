"use client";

import { createClient } from "@/lib/supabase/client";

export type UserProfile = {
  email: string;
  name: string;
  plan: string;
  reportsUsed: number;
  reportsLimit: number;
  remaining: number;
};

// Check if env vars are configured
function isSupabaseConfigured(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_url_here"
  );
}

// ---- Supabase auth ----

export async function signUpWithEmail(email: string, password: string, name: string) {
  if (!isSupabaseConfigured()) return signUpLocal(email, name);

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw new Error(error.message);
  return data.user;
}

export async function loginWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured()) return loginLocal(email);

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data.user;
}

export async function logoutUser() {
  if (!isSupabaseConfigured()) { logoutLocal(); return; }

  const supabase = createClient();
  await supabase.auth.signOut();
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return getLocalUser();

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) return getLocalProfile();

  const res = await fetch("/api/reports");
  if (!res.ok) return null;
  const data = await res.json();
  const user = await getCurrentUser();
  return {
    email: user?.email || "",
    name: user?.user_metadata?.name || user?.email?.split("@")[0] || "User",
    ...data,
  };
}

export async function useReportCredit(companyName: string, website: string): Promise<{ success: boolean; remaining: number; error?: string }> {
  if (!isSupabaseConfigured()) return useLocalReport();

  const res = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyName, website }),
  });
  return res.json();
}

export async function upgradePlan(plan: string): Promise<{ success: boolean; remaining: number }> {
  if (!isSupabaseConfigured()) return upgradeLocal(plan);

  const res = await fetch("/api/upgrade", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  return res.json();
}

// ---- localStorage fallback (when Supabase not configured) ----

type LocalUser = {
  email: string;
  name: string;
  plan: string;
  reportsUsed: number;
  reportsLimit: number;
};

const STORAGE_KEY = "repranks_user";

function getLocalData(): LocalUser | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
}

function saveLocalData(u: LocalUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}

function signUpLocal(email: string, name: string) {
  const u: LocalUser = { email, name, plan: "free", reportsUsed: 0, reportsLimit: 1 };
  saveLocalData(u);
  return { email, user_metadata: { name } };
}

function loginLocal(email: string) {
  const u = getLocalData();
  if (!u) throw new Error("No account found. Please sign up first.");
  return { email: u.email, user_metadata: { name: u.name } };
}

function logoutLocal() {
  localStorage.removeItem(STORAGE_KEY);
}

function getLocalUser() {
  const u = getLocalData();
  if (!u) return null;
  return { email: u.email, user_metadata: { name: u.name } };
}

function getLocalProfile(): UserProfile | null {
  const u = getLocalData();
  if (!u) return null;
  return {
    email: u.email,
    name: u.name,
    plan: u.plan,
    reportsUsed: u.reportsUsed,
    reportsLimit: u.reportsLimit,
    remaining: Math.max(0, u.reportsLimit - u.reportsUsed),
  };
}

function useLocalReport() {
  const u = getLocalData();
  if (!u) return { success: false, remaining: 0, error: "Not logged in" };
  if (u.reportsUsed >= u.reportsLimit) return { success: false, remaining: 0, error: "No reports remaining" };
  u.reportsUsed++;
  saveLocalData(u);
  return { success: true, remaining: Math.max(0, u.reportsLimit - u.reportsUsed) };
}

function upgradeLocal(plan: string) {
  const u = getLocalData();
  if (!u) return { success: false, remaining: 0 };
  if (plan === "single") { u.reportsLimit++; }
  else if (plan === "starter") { u.plan = "starter"; u.reportsLimit = 5; u.reportsUsed = 0; }
  else if (plan === "pro") { u.plan = "pro"; u.reportsLimit = 20; u.reportsUsed = 0; }
  saveLocalData(u);
  return { success: true, remaining: Math.max(0, u.reportsLimit - u.reportsUsed) };
}
