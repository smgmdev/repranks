"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import AuthModal from "./AuthModal";

export default function Navbar({ active }: { active?: string }) {
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    setMenuOpen(false);
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

          {/* Center nav links — desktop */}
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

          {/* Right side — desktop */}
          <div className="ml-auto hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <button onClick={handleLogout} className="text-xs font-semibold tracking-wider text-gray-500 hover:text-white transition-colors">
                  LOGOUT
                </button>
              </>
            ) : (
              <button
                onClick={() => { setAuthMode("login"); setShowAuth(true); }}
                className="px-10 py-2.5 text-sm font-bold tracking-wider text-white bg-[#3b6ee6] hover:bg-[#4a7cf0] rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Burger menu — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 top-16 bg-[#0a0a0a] z-40 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full px-6 pt-6 pb-10">
            {/* User info */}
            {user && (
              <div className="flex items-center gap-3 pb-6 mb-4 border-b border-white/10">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{user.name || "User"}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
            )}

            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between py-4 text-base font-semibold tracking-wider border-b border-white/5 transition-colors ${
                    active === link.label ? "text-white" : "text-gray-400"
                  }`}
                >
                  {link.label}
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="mt-auto pt-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 text-sm font-bold tracking-wider text-white bg-[#1a1a1a] border border-white/10 rounded-lg transition-colors"
                >
                  LOG OUT
                </button>
              ) : (
                <button
                  onClick={() => { setAuthMode("login"); setShowAuth(true); setMenuOpen(false); }}
                  className="w-full py-3.5 text-sm font-bold tracking-wider text-white bg-[#3b6ee6] hover:bg-[#4a7cf0] rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
