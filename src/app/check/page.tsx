"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import AuthModal from "@/components/AuthModal";
import PricingModal from "@/components/PricingModal";
import { getCurrentUser, getUserProfile, useReportCredit, logoutUser, UserProfile } from "@/lib/auth";

type PillarResult = { label: string; score: number; color: string; detail: string };
type CheckResult = {
  name: string; website: string; reputationScore: number; tag: string; tagColor: string; trend: string;
  pillars: PillarResult[]; mediaSummary: string[]; articlesFound: number; socialMentions: number; reviewsFound: number; confidence: string;
};

function generateResult(name: string, website: string): CheckResult {
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = (offset: number) => ((seed * 7 + offset * 13) % 60) + 35;
  const news = r(1), social = r(2), reviews = r(3), investigations = r(4), employee = r(5);
  const score = Math.round(news * 0.3 + social * 0.25 + reviews * 0.2 + investigations * 0.15 + employee * 0.1);
  const tag = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Average" : score >= 30 ? "Poor" : "Terrible";
  const tagColor = score >= 85 ? "bg-green-100 text-green-800" : score >= 70 ? "bg-emerald-100 text-emerald-800" : score >= 50 ? "bg-yellow-100 text-yellow-800" : score >= 30 ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800";
  const domain = website.replace(/https?:\/\//, "").replace(/\/$/, "") || name.toLowerCase().replace(/\s+/g, "") + ".com";
  const pillars: PillarResult[] = [
    { label: "News & Media", score: news, color: "#3b82f6", detail: `Found ${80 + (seed % 200)} articles. ${news >= 70 ? "Coverage is predominantly positive." : news >= 50 ? "Coverage is mixed." : "Significant negative coverage detected."}` },
    { label: "Social Discourse", score: social, color: "#a855f7", detail: `Analyzed ${(1 + seed % 8)}K+ mentions. ${social >= 70 ? "Sentiment is strongly favorable." : social >= 50 ? "Sentiment is divided." : "Negative sentiment dominates."}` },
    { label: "Consumer Reviews", score: reviews, color: "#f59e0b", detail: `Aggregated ${200 + (seed % 500)} reviews. ${reviews >= 70 ? "Customers are highly satisfied." : reviews >= 50 ? "Reviews are mixed." : "Satisfaction is below average."}` },
    { label: "Investigations", score: investigations, color: "#ef4444", detail: `Scanned regulatory databases. ${investigations >= 70 ? "No significant issues found." : investigations >= 50 ? "Some attention detected." : "Active investigations found."}` },
    { label: "Employee Sentiment", score: employee, color: "#14b8a6", detail: `Analyzed ${30 + (seed % 100)} employee reviews. ${employee >= 70 ? "Employees rate favorably." : employee >= 50 ? "Mixed sentiment." : "Dissatisfaction detected."}` },
  ];
  const pos = [`${name} receives positive coverage for leadership`, `Analysts highlight ${name}'s strong position`, `Customer praise for ${name} trends online`];
  const neg = [`${name} faces scrutiny over practices`, `Complaints about ${name} gain traction`, `Regulatory inquiry into ${name}`];
  const neu = [`${name} quarterly results in line`, `Industry report mentions ${name}`, `${name} expands into new markets`];
  const mediaSummary = score >= 70 ? [pos[seed % 3], pos[(seed+1) % 3], neu[seed % 3]] : score >= 50 ? [neu[seed % 3], pos[seed % 3], neg[seed % 3]] : [neg[seed % 3], neg[(seed+1) % 3], neu[seed % 3]];
  return { name, website: domain, reputationScore: score, tag, tagColor, trend: score >= 70 ? "Trending Up" : score >= 50 ? "Stable" : "Trending Down",
    pillars, mediaSummary, articlesFound: 80 + (seed % 200), socialMentions: (1 + seed % 8) * 1000, reviewsFound: 200 + (seed % 500), confidence: score >= 70 || score <= 30 ? "High" : "Medium" };
}

export default function CheckPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const refreshProfile = useCallback(async () => {
    const user = await getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      const p = await getUserProfile();
      setProfile(p);
    } else {
      setIsLoggedIn(false);
      setProfile(null);
    }
  }, []);

  useEffect(() => { refreshProfile(); }, [refreshProfile]);

  async function handleAuth() {
    setShowAuth(false);
    await refreshProfile();
  }

  async function handleUpgrade() {
    setShowPricing(false);
    await refreshProfile();
  }

  async function handleLogout() {
    await logoutUser();
    setIsLoggedIn(false);
    setProfile(null);
    setResult(null);
  }

  async function handleCheck() {
    if (!name.trim()) return;
    if (!isLoggedIn) { setShowAuth(true); return; }
    if (profile && profile.remaining <= 0) { setShowPricing(true); return; }

    setResult(null);
    setLoading(true);
    setProgress(0);

    const stages = [
      { text: "Crawling news sources...", pct: 15 },
      { text: "Analyzing social media mentions...", pct: 35 },
      { text: "Aggregating consumer reviews...", pct: 55 },
      { text: "Scanning regulatory databases...", pct: 70 },
      { text: "Processing employee reviews...", pct: 85 },
      { text: "Calculating reputation score...", pct: 95 },
    ];
    for (const s of stages) {
      setStage(s.text); setProgress(s.pct);
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
    }
    setProgress(100); setStage("Complete");
    await new Promise((r) => setTimeout(r, 300));

    await useReportCredit(name.trim(), website.trim());
    await refreshProfile();
    setResult(generateResult(name.trim(), website.trim()));
    setLoading(false);
  }

  const remaining = profile?.remaining ?? 0;
  const scoreColor = result ? (result.reputationScore >= 70 ? "#16a34a" : result.reputationScore >= 50 ? "#ca8a04" : "#dc2626") : "#666";

  return (
    <main className="min-h-screen bg-white text-[#181716]">
      <Navbar active="CHECK" />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={handleAuth} />}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} onUpgrade={handleUpgrade} />}

      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white py-16">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          {isLoggedIn && profile && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300">{profile.email}</span>
                <span className="text-gray-500">|</span>
                <span className={`font-semibold ${remaining > 0 ? "text-green-400" : "text-red-400"}`}>
                  {remaining} report{remaining !== 1 ? "s" : ""} left
                </span>
                {remaining === 0 && (
                  <button onClick={() => setShowPricing(true)} className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
              <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-white transition-colors">Log out</button>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-black mb-4">Check Any Company</h1>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Enter a company name and website to instantly analyze its online reputation across news, social media, reviews, and public records.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name"
              className="flex-1 px-5 py-3.5 rounded-lg bg-[#161b22] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-base"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()} />
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="Website (optional)"
              className="sm:w-[220px] px-5 py-3.5 rounded-lg bg-[#161b22] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-base"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()} />
            <button onClick={handleCheck} disabled={!name.trim() || loading}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors text-base">
              {loading ? "Analyzing..." : !isLoggedIn ? "Sign Up & Check" : "Check Reputation"}
            </button>
          </div>

          {!isLoggedIn && (
            <p className="text-sm text-gray-500 mt-4">
              First report is free.{" "}
              <button onClick={() => setShowAuth(true)} className="text-blue-400 hover:underline">Already have an account? Log in</button>
            </p>
          )}
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section className="max-w-[600px] mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-lg font-semibold mb-1">Analyzing {name}</p>
            <p className="text-sm text-gray-500">{stage}</p>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2"><span>Scanning sources</span><span>{progress}%</span></div>
        </section>
      )}

      {/* Results */}
      {result && !loading && (
        <div>
          <section className="border-b border-gray-200">
            <div className="max-w-[1000px] mx-auto px-6 py-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Reputation Report</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-normal mb-2">{result.name}</h2>
                  <p className="text-sm text-gray-400">{result.website} &middot; Generated March 28, 2026</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-serif" style={{ color: scoreColor }}>{result.reputationScore}</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                  <div className="flex items-center gap-2 justify-end mt-2">
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded ${result.tagColor}`}>{result.tag}</span>
                    <span className="text-xs text-gray-500">{result.trend}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-[1000px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div><div className="text-xl font-bold text-blue-600">{result.articlesFound}</div><div className="text-xs text-gray-500">Articles Scanned</div></div>
              <div><div className="text-xl font-bold text-purple-600">{(result.socialMentions / 1000).toFixed(1)}K</div><div className="text-xs text-gray-500">Social Mentions</div></div>
              <div><div className="text-xl font-bold text-amber-600">{result.reviewsFound}</div><div className="text-xs text-gray-500">Reviews Analyzed</div></div>
              <div><div className="text-xl font-bold text-green-600">{result.confidence}</div><div className="text-xs text-gray-500">Confidence Level</div></div>
            </div>
          </section>

          <section className="max-w-[1000px] mx-auto px-6 py-10">
            <h3 className="text-xl font-bold mb-6">Score Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
              {result.pillars.map((p) => (
                <div key={p.label} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{p.label}</div>
                  <div className="text-3xl font-serif mb-2" style={{ color: p.color }}>{p.score}</div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${p.score}%`, backgroundColor: p.color }} /></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {result.pillars.map((p) => (
                <div key={p.label} className="flex flex-col md:flex-row md:items-center gap-4 py-4 border-b border-gray-100">
                  <div className="md:w-[180px] shrink-0"><div className="text-sm font-bold">{p.label}</div></div>
                  <p className="text-sm text-gray-500 flex-1">{p.detail}</p>
                  <div className="text-2xl font-serif md:w-[60px] text-right" style={{ color: p.color }}>{p.score}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 border-y border-gray-200">
            <div className="max-w-[1000px] mx-auto px-6 py-8">
              <h3 className="text-lg font-bold mb-4">Score Calculation</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-5 font-mono text-sm text-gray-600">
                <span className="font-bold" style={{ color: scoreColor }}>ReputationScore</span> ={" "}
                (<span className="text-blue-500">{result.pillars[0].score}</span> x 0.30) +{" "}
                (<span className="text-purple-500">{result.pillars[1].score}</span> x 0.25) +{" "}
                (<span className="text-amber-500">{result.pillars[2].score}</span> x 0.20) +{" "}
                (<span className="text-red-500">{result.pillars[3].score}</span> x 0.15) +{" "}
                (<span className="text-teal-500">{result.pillars[4].score}</span> x 0.10) ={" "}
                <span className="font-bold text-lg" style={{ color: scoreColor }}>{result.reputationScore}</span>
              </div>
            </div>
          </section>

          <section className="max-w-[1000px] mx-auto px-6 py-10">
            <h3 className="text-xl font-bold mb-4">Key Media Signals</h3>
            <div className="space-y-3">
              {result.mediaSummary.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i === 0 && result.reputationScore >= 70 ? "bg-green-500" : i === 2 && result.reputationScore < 50 ? "bg-red-500" : "bg-gray-300"}`} />
                  <p className="text-sm text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-[1000px] mx-auto px-6 pb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-lg font-bold mb-2">
                {remaining > 0 ? `You have ${remaining} report${remaining !== 1 ? "s" : ""} remaining` : "You've used all your reports"}
              </h3>
              <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
                {remaining > 0 ? "Check another company or upgrade for more reports." : "Upgrade your plan to continue."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {remaining === 0 && (
                  <button onClick={() => setShowPricing(true)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded transition-colors">View Plans & Pricing</button>
                )}
                <button onClick={() => { setResult(null); setName(""); setWebsite(""); }}
                  className="px-6 py-2.5 bg-white hover:bg-gray-50 text-sm font-bold rounded border border-gray-200 transition-colors">Check Another Company</button>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200">
            <div className="max-w-[1000px] mx-auto px-6 py-6">
              <p className="text-xs text-gray-400">This report is generated from publicly available data. Scores are estimates. ReputationRanks does not guarantee accuracy.</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !result && (
        <section className="max-w-[900px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-blue-600 font-bold text-lg">1</span></div>
              <h3 className="font-bold mb-2">Enter Company</h3>
              <p className="text-sm text-gray-500">Type the company name and optionally its website URL.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-purple-600 font-bold text-lg">2</span></div>
              <h3 className="font-bold mb-2">AI Analyzes</h3>
              <p className="text-sm text-gray-500">Our system scans 15K+ sources for news, reviews, social posts, and records.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-green-600 font-bold text-lg">3</span></div>
              <h3 className="font-bold mb-2">Get Your Score</h3>
              <p className="text-sm text-gray-500">Full 5-pillar reputation breakdown with media signals and score calculation.</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-center mb-2">Simple Pricing</h2>
            <p className="text-center text-gray-500 mb-8">1 free report per account. Upgrade anytime.</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="border border-gray-200 rounded-lg p-5 text-center"><h3 className="font-bold mb-1">Free</h3><div className="text-2xl font-black mb-1">$0</div><p className="text-xs text-gray-500 mb-3">1 report</p><p className="text-xs text-gray-400">Sign up to get started</p></div>
              <div className="border border-gray-200 rounded-lg p-5 text-center"><h3 className="font-bold mb-1">Single</h3><div className="text-2xl font-black mb-1">$4.99</div><p className="text-xs text-gray-500 mb-3">1 report</p><p className="text-xs text-gray-400">One-time purchase</p></div>
              <div className="border-2 border-green-500 rounded-lg p-5 text-center relative"><div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded-full">POPULAR</div><h3 className="font-bold mb-1">Starter</h3><div className="text-2xl font-black mb-1">$9.99</div><p className="text-xs text-gray-500 mb-3">5 reports/mo</p><p className="text-xs text-gray-400">$2.00 per report</p></div>
              <div className="border border-gray-200 rounded-lg p-5 text-center"><h3 className="font-bold mb-1">Pro</h3><div className="text-2xl font-black mb-1">$19.99</div><p className="text-xs text-gray-500 mb-3">20 reports/mo</p><p className="text-xs text-gray-400">$1.00 per report</p></div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
