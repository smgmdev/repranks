"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import AuthModal from "./AuthModal";

export default function Navbar({ active }: { active?: string }) {
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  const links = [
    { label: "RANKINGS", href: "/" },
    { label: "CHECK", href: "/check" },
    { label: "NEWS", href: "/news" },
    { label: "METHODOLOGY", href: "/methodology" },
    { label: "ABOUT", href: "#", hasDropdown: true },
  ];

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (u) setUser({ email: u.email, name: u.user_metadata?.name });
    });
  }, []);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  function handleAuth() {
    setShowAuth(false);
    getCurrentUser().then((u) => {
      if (u) setUser({ email: u.email, name: u.user_metadata?.name });
    });
  }

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} initialMode={authMode} />}
      <nav className="bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center">
          {/* Logo */}
          <Link href="/" className="mr-12 flex items-baseline gap-[2px]">
            <span className="text-white font-black text-2xl md:text-[26px] uppercase" style={{ letterSpacing: '-0.04em' }}>
              Reputation
            </span>
            <span className="text-green-500 font-black text-2xl md:text-[26px] uppercase" style={{ letterSpacing: '-0.04em' }}>
              Ranks
            </span>
            <span className="text-gray-500 text-[7px] font-normal self-start mt-1">&reg;</span>
          </Link>

          {/* Center nav links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1 text-sm font-semibold tracking-widest transition-colors ${
                  active === link.label ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300 hidden sm:inline">{user.email}</span>
                </div>
                <button onClick={handleLogout} className="text-xs font-semibold tracking-wider text-gray-500 hover:text-white transition-colors">
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setAuthMode("login"); setShowAuth(true); }}
                  className="px-10 py-2.5 text-sm font-bold tracking-wider text-white bg-[#3b6ee6] hover:bg-[#4a7cf0] rounded-lg transition-colors"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
