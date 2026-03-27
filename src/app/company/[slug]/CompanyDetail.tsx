"use client";

import { Company } from "@/data/companies";
import Link from "next/link";

const pillarConfig = [
  { key: "newsMediaScore" as const, label: "News & Media", weight: "30%", color: "#3b82f6", description: "Coverage tone and volume across 15K+ online news outlets, weighted by source credibility." },
  { key: "socialScore" as const, label: "Social Discourse", weight: "25%", color: "#a855f7", description: "Public sentiment on X, Reddit, TikTok, YouTube and forums. Measures opinion velocity and viral moments." },
  { key: "consumerReviewScore" as const, label: "Consumer Reviews", weight: "20%", color: "#f59e0b", description: "Aggregated ratings from 50+ review platforms. Fake reviews filtered, recency weighted." },
  { key: "investigationScore" as const, label: "Investigations", weight: "15%", color: "#ef4444", description: "Court filings, regulatory actions, whistleblower reports, and investigative journalism." },
  { key: "employeeSentiment" as const, label: "Employee Sentiment", weight: "10%", color: "#14b8a6", description: "Anonymous employee reviews from Glassdoor, Blind, and LinkedIn. Culture gap detection." },
];

const tagLabels: Record<Company["tag"], { text: string; color: string; bg: string }> = {
  excellent: { text: "Excellent", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  good: { text: "Good", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  average: { text: "Average", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
  poor: { text: "Poor", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  terrible: { text: "Terrible", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

const trendLabels: Record<Company["trend"], { text: string; color: string; icon: string }> = {
  up: { text: "Trending Up", color: "text-green-600", icon: "▲" },
  down: { text: "Trending Down", color: "text-red-500", icon: "▼" },
  stable: { text: "Stable", color: "text-gray-500", icon: "●" },
};

const newsSources = ["Reuters", "Bloomberg", "CNBC", "Forbes", "The Guardian", "NYT", "BBC", "TechCrunch", "Wall Street Journal", "Financial Times", "AP News", "Business Insider"];
const socialSources = ["Reddit", "X (Twitter)", "TikTok", "YouTube", "HackerNews", "LinkedIn"];
const reviewSources = ["Glassdoor", "Trustpilot", "Google Reviews", "Indeed", "Comparably", "G2"];

type MediaItem = { source: string; title: string; sentiment: string; date: string };

function generateMedia(company: Company): MediaItem[] {
  const items: MediaItem[] = [];
  const score = company.reputationScore;
  const name = company.name;
  const posRatio = score >= 70 ? 0.7 : score >= 50 ? 0.4 : 0.15;
  const negRatio = score >= 70 ? 0.05 : score >= 50 ? 0.3 : 0.6;
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const pick = (arr: string[], idx: number) => arr[(seed + idx) % arr.length];
  const pickSentiment = (idx: number): string => {
    const r = ((seed * (idx + 1) * 7) % 100) / 100;
    if (r < posRatio) return "positive";
    if (r < posRatio + negRatio) return "negative";
    return "neutral";
  };

  const positiveNews = [
    `${name} receives praise for strong leadership in 2026`,
    `${name} ranked among top companies for customer satisfaction`,
    `${name} announces expansion amid positive reception`,
    `Analysts upgrade ${name} outlook citing strong brand`,
  ];
  const negativeNews = [
    `${name} faces backlash over recent policy changes`,
    `Regulatory scrutiny increases for ${name}`,
    `Consumer group criticizes ${name} practices`,
    `${name} faces lawsuit over alleged misconduct`,
  ];
  const neutralNews = [
    `${name} reports quarterly earnings in line with expectations`,
    `Industry analysis: Where ${name} stands in 2026`,
    `${name} announces restructuring plans`,
    `Market analysts maintain neutral outlook on ${name}`,
  ];

  const dates = ["Mar 27, 2026", "Mar 26, 2026", "Mar 25, 2026", "Mar 24, 2026", "Mar 23, 2026", "Mar 22, 2026", "Mar 21, 2026", "Mar 20, 2026"];
  for (let i = 0; i < 8; i++) {
    const sentiment = pickSentiment(i);
    let source: string;
    let title: string;
    if (i < 4) {
      source = pick(newsSources, i);
      title = sentiment === "positive" ? pick(positiveNews, i) : sentiment === "negative" ? pick(negativeNews, i) : pick(neutralNews, i);
    } else if (i < 6) {
      source = pick(socialSources, i);
      title = sentiment === "positive" ? `${name} trending for positive stories` : sentiment === "negative" ? `Viral thread: frustrations with ${name}` : `${name} discussed in industry context`;
    } else {
      source = pick(reviewSources, i);
      title = sentiment === "positive" ? `Employee reviews highlight strong culture at ${name}` : sentiment === "negative" ? `Recent reviews flag concerns at ${name}` : `${name} review ratings remain steady`;
    }
    items.push({ source, title, sentiment, date: dates[i] });
  }
  return items;
}

function generateStats(company: Company) {
  const seed = company.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const base = company.reputationScore;
  return {
    totalArticles: Math.round(800 + (seed % 400) + base * 12).toLocaleString(),
    socialMentions: `${Math.round(1.2 + (seed % 30) / 10 + base * 0.05)}K`,
    reviewsAnalyzed: Math.round(2000 + (seed % 3000) + base * 50).toLocaleString(),
    dataPoints: `${Math.round(15 + (seed % 20) + base * 0.3)}K`,
  };
}

const sentimentDot: Record<string, string> = {
  positive: "bg-green-500",
  negative: "bg-red-500",
  neutral: "bg-gray-400",
};

export default function CompanyDetail({ company }: { company: Company }) {
  const trend = trendLabels[company.trend];
  const tag = tagLabels[company.tag];
  const media = generateMedia(company);
  const stats = generateStats(company);
  const scoreColor = company.reputationScore >= 70 ? "#16a34a" : company.reputationScore >= 50 ? "#ca8a04" : "#dc2626";

  return (
    <div className="bg-white text-[#181716] min-h-screen">
      {/* Profile header bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#181716] rounded flex items-center justify-center">
            <span className="text-white text-xs font-black">R</span>
          </div>
          <span className="text-sm font-bold tracking-wide uppercase text-[#181716]">Profile</span>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-sm font-semibold text-[#8b7355] hover:underline uppercase tracking-wide">
            Back to Rankings
          </Link>
        </div>
      </div>

      {/* Company name & core info */}
      <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight mb-4">
          {company.name}
        </h1>
        <p className="text-base text-[#181716] mb-1">
          {company.industry} &middot; {company.country}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Rank #{company.rank} of 100 &middot; Updated March 27, 2026
        </p>

        {/* Score + trend row */}
        <div className="flex flex-wrap items-end gap-10 pb-8 border-b border-gray-200">
          {/* Big score */}
          <div>
            <div className="text-6xl md:text-7xl font-serif" style={{ color: scoreColor }}>
              {company.reputationScore}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm font-semibold ${trend.color}`}>
                {trend.icon} {trend.text}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="text-sm font-bold text-[#181716] mb-1">Reputation Score</div>
            <div className="text-sm text-gray-500 mb-3">out of 100 &middot; as of March 27, 2026</div>
            <div className={`inline-block px-3 py-1 text-xs font-semibold rounded border ${tag.bg} ${tag.color}`}>
              {tag.text}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <div className="text-gray-500">Articles Analyzed</div>
              <div className="font-bold">{stats.totalArticles}</div>
            </div>
            <div>
              <div className="text-gray-500">Social Mentions</div>
              <div className="font-bold">{stats.socialMentions}</div>
            </div>
            <div>
              <div className="text-gray-500">Reviews Analyzed</div>
              <div className="font-bold">{stats.reviewsAnalyzed}</div>
            </div>
            <div>
              <div className="text-gray-500">Data Points</div>
              <div className="font-bold">{stats.dataPoints}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pillar scores */}
      <div className="max-w-[1100px] mx-auto px-6 pb-10">
        <h2 className="text-xl font-bold mb-6">Score Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {pillarConfig.map((p) => {
            const score = company[p.key];
            return (
              <div key={p.key} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{p.label}</span>
                </div>
                <div className="text-3xl font-serif mb-1" style={{ color: p.color }}>{score}</div>
                <div className="text-xs text-gray-400 mb-3">Weight: {p.weight}</div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: p.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed pillars */}
        <div className="space-y-4">
          {pillarConfig.map((p) => {
            const score = company[p.key];
            return (
              <div key={p.key} className="flex flex-col md:flex-row md:items-center gap-4 py-5 border-b border-gray-100">
                <div className="md:w-[240px] shrink-0">
                  <div>
                    <div className="text-sm font-bold">{p.label}</div>
                    <div className="text-xs text-gray-400">{p.weight}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{p.description}</p>
                <div className="text-2xl font-serif font-medium md:w-[80px] text-right" style={{ color: p.color }}>
                  {score}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          <h2 className="text-xl font-bold mb-4">Score Calculation</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="font-mono text-sm text-gray-600 leading-loose mb-4">
              <span className="font-bold" style={{ color: scoreColor }}>ReputationScore</span> ={" "}
              (<span className="text-blue-500">{company.newsMediaScore}</span> × 0.30) +{" "}
              (<span className="text-purple-500">{company.socialScore}</span> × 0.25) +{" "}
              (<span className="text-amber-500">{company.consumerReviewScore}</span> × 0.20) +{" "}
              (<span className="text-red-500">{company.investigationScore}</span> × 0.15) +{" "}
              (<span className="text-teal-500">{company.employeeSentiment}</span> × 0.10)
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-gray-500">
              <span>=</span>
              <span className="text-blue-500">{(company.newsMediaScore * 0.3).toFixed(1)}</span>
              <span>+</span>
              <span className="text-purple-500">{(company.socialScore * 0.25).toFixed(1)}</span>
              <span>+</span>
              <span className="text-amber-500">{(company.consumerReviewScore * 0.2).toFixed(1)}</span>
              <span>+</span>
              <span className="text-red-500">{(company.investigationScore * 0.15).toFixed(1)}</span>
              <span>+</span>
              <span className="text-teal-500">{(company.employeeSentiment * 0.1).toFixed(1)}</span>
              <span>=</span>
              <span className="text-lg font-bold" style={{ color: scoreColor }}>{company.reputationScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent media */}
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-2">Recent Media Coverage</h2>
        <p className="text-sm text-gray-500 mb-6">
          Latest articles and mentions influencing this score
        </p>
        <div className="space-y-0">
          {media.map((item, i) => (
            <div key={i} className="flex items-start gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-[100px] shrink-0 pt-0.5">
                <span className="text-xs font-semibold text-gray-400">{item.source}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium leading-snug mb-1 text-[#181716]">{item.title}</h4>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 pt-1">
                <div className={`w-2 h-2 rounded-full ${sentimentDot[item.sentiment]}`} />
                <span className="text-xs text-gray-500 capitalize">{item.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6 py-6">
          <p className="text-xs text-gray-400">
            ReputationRanks does not accept payment for placement on rankings. Scores are determined
            solely by our data-driven methodology. Read our{" "}
            <Link href="/methodology" className="text-[#8b7355] hover:underline">full methodology</Link> for details.
          </p>
        </div>
      </div>
    </div>
  );
}
