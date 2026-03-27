"use client";

import { useState, useEffect } from "react";
import { signUpWithEmail, loginWithEmail } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

type Props = {
  onClose: () => void;
  onAuth: () => void;
  initialMode?: "login" | "signup";
};

export default function AuthModal({ onClose, onAuth, initialMode = "signup" }: Props) {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleEsc); };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!email || !password) throw new Error("Please fill in all fields.");
      if (mode === "signup" && !name) throw new Error("Please enter your name.");
      if (mode === "signup") await signUpWithEmail(email, password, name);
      else await loginWithEmail(email, password);
      onAuth();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email) { setError("Please enter your email address."); return; }
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/check`,
      });
      if (error) throw error;
      setResetSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/check` },
    });
  }

  const Logo = () => (
    <div className="text-center mb-6">
      <div className="inline-flex items-baseline gap-[2px] mb-4">
        <span className="text-white font-black text-2xl uppercase" style={{ letterSpacing: '-0.04em' }}>Reputation</span>
        <span className="text-green-500 font-black text-2xl uppercase" style={{ letterSpacing: '-0.04em' }}>Ranks</span>
        <span className="text-gray-600 text-[6px] font-normal self-start mt-1">&reg;</span>
      </div>
    </div>
  );

  const PasswordInput = () => (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-3 pr-12 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  const EmailInput = () => (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Example@domain.com"
        className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
    </div>
  );

  const ErrorBox = () => error ? (
    <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p className="text-sm text-red-400">{error}</p>
    </div>
  ) : null;

  const GoogleButton = () => (
    <>
      <div className="mt-6 mb-5">
        <p className="text-center text-sm font-bold text-gray-400">
          Or - {mode === "signup" ? "Sign up" : "Sign in"} using:
        </p>
      </div>
      <button onClick={handleGoogle}
        className="flex items-center gap-3 px-6 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg hover:bg-[#3a3a3a] transition-colors w-full justify-center">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span className="text-sm font-semibold text-gray-300">Google</span>
      </button>
    </>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[460px] mx-0 sm:mx-4 bg-[#1a1a1a] sm:rounded-2xl shadow-2xl overflow-hidden min-h-screen sm:min-h-0">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-10 pb-8">
          <Logo />

          {/* Forgot password view */}
          {mode === "forgot" && (
            <>
              <h2 className="text-xl font-bold text-white text-center mb-2">Reset your password</h2>
              <div className="h-[3px] bg-blue-500 rounded-full mb-8" />

              {resetSent ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Check your email</h3>
                  <p className="text-sm text-gray-400 mb-6">
                    We sent a password reset link to <span className="text-white">{email}</span>
                  </p>
                  <button onClick={() => { setMode("login"); setResetSent(false); setError(""); }}
                    className="text-sm text-blue-400 font-semibold hover:underline">
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-5">
                  <p className="text-sm text-gray-400">Enter your email and we&apos;ll send you a link to reset your password.</p>
                  <EmailInput />
                  <ErrorBox />
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold rounded-lg transition-colors text-sm">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                  <div className="text-center">
                    <button type="button" onClick={() => { setMode("login"); setError(""); }}
                      className="text-sm text-gray-400 hover:text-white transition-colors">
                      Back to Sign In
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* Login / Signup view */}
          {mode !== "forgot" && (
            <>
              <h2 className="text-xl font-bold text-white text-center mb-2">
                {mode === "signup" ? "Create your account" : "Sign in to your account"}
              </h2>
              <div className="h-[3px] bg-blue-500 rounded-full mb-8" />

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors" />
                  </div>
                )}
                <EmailInput />
                <PasswordInput />
                <ErrorBox />
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-[#3a3a3a] hover:bg-[#4a4a4a] disabled:bg-[#2a2a2a] disabled:text-gray-600 text-white font-bold rounded-lg transition-colors text-sm">
                  {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </form>

              {mode === "login" && (
                <div className="text-center mt-4">
                  <button onClick={() => { setMode("forgot"); setError(""); setResetSent(false); }}
                    className="text-sm text-gray-400 underline hover:text-white transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <GoogleButton />

              <div className="text-center mt-8 pt-6 border-t border-[#2a2a2a]">
                <p className="text-sm text-gray-500">
                  {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}
                    className="text-white font-bold underline hover:text-blue-400 transition-colors">
                    {mode === "signup" ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>

              {mode === "signup" && (
                <p className="text-center text-xs text-gray-600 mt-4">
                  Get 1 free reputation report when you create an account.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
