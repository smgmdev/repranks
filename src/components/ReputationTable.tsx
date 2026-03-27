"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { companies, Company } from "@/data/companies";
import { worstCompanies } from "@/data/worst-companies";
import Filters from "./Filters";

type SortKey = keyof Pick<
  Company,
  | "rank"
  | "reputationScore"
  | "newsMediaScore"
  | "socialScore"
  | "consumerReviewScore"
  | "investigationScore"
  | "employeeSentiment"
>;

const columns: { key: SortKey; label: string; format: (v: number) => string }[] = [
  { key: "rank", label: "RANK", format: (v) => `#${v}` },
  { key: "reputationScore", label: "SCORE", format: (v) => `${v}/100` },
  { key: "newsMediaScore", label: "NEWS & MEDIA", format: (v) => `${v}` },
  { key: "socialScore", label: "SOCIAL", format: (v) => `${v}` },
  { key: "consumerReviewScore", label: "REVIEWS", format: (v) => `${v}` },
  { key: "investigationScore", label: "INVESTIGATIONS", format: (v) => `${v}` },
  { key: "employeeSentiment", label: "EMPLOYEE", format: (v) => `${v}` },
];

const tagColors: Record<Company["tag"], string> = {
  excellent: "bg-green-100 text-green-800",
  good: "bg-emerald-50 text-emerald-700",
  average: "bg-yellow-50 text-yellow-700",
  poor: "bg-orange-50 text-orange-700",
  terrible: "bg-red-100 text-red-800",
};

const trendIcons: Record<Company["trend"], string> = {
  up: "↑",
  down: "↓",
  stable: "→",
};

const trendColors: Record<Company["trend"], string> = {
  up: "text-green-600",
  down: "text-red-500",
  stable: "text-gray-400",
};

type Tab = "best" | "worst";

export default function ReputationTable() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("best");
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const sourceList = tab === "best"
    ? companies.filter((c) => c.tag === "excellent" || c.tag === "good")
    : worstCompanies.filter((c) => c.tag === "poor" || c.tag === "terrible");

  const filtered = useMemo(() => {
    let list = sourceList;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (industry) list = list.filter((c) => c.industry === industry);
    if (country) list = list.filter((c) => c.country === country);

    list = [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });

    return list;
  }, [search, industry, country, sortKey, sortAsc, sourceList]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "rank");
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 mb-8 border-b border-gray-200">
        <button
          onClick={() => { setTab("best"); setSearch(""); setIndustry(""); setCountry(""); setSortKey("rank"); setSortAsc(true); }}
          className={`px-6 py-3 text-sm font-semibold tracking-wide transition-colors relative ${
            tab === "best"
              ? "text-green-700"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Best Reputation
          {tab === "best" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-600 rounded-t" />}
        </button>
        <button
          onClick={() => { setTab("worst"); setSearch(""); setIndustry(""); setCountry(""); setSortKey("rank"); setSortAsc(true); }}
          className={`px-6 py-3 text-sm font-semibold tracking-wide transition-colors relative ${
            tab === "worst"
              ? "text-red-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Worst Reputation
          {tab === "worst" && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-500 rounded-t" />}
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        {tab === "best"
          ? "100 companies with the strongest public image based on news coverage, social sentiment, reviews, and investigations over the last 6 months."
          : "100 companies with the worst public reputation including SMEs — based on negative PR, poor reviews, investigations, and public backlash."}
      </p>

      <Filters
        search={search}
        onSearchChange={setSearch}
        industry={industry}
        onIndustryChange={setIndustry}
        country={country}
        onCountryChange={setCountry}
      />

      <div className="text-sm text-gray-500 mb-3">
        Showing {filtered.length} of {sourceList.length} companies
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b-2 border-[#181716]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="text-left text-xs font-semibold tracking-wide py-3 px-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key && (
                      <svg
                        className={`w-3 h-3 transition-transform ${sortAsc ? "" : "rotate-180"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
              <th className="text-left text-xs font-semibold tracking-wide py-3 px-3">
                COMPANY
              </th>
              <th className="text-left text-xs font-semibold tracking-wide py-3 px-3">
                INDUSTRY
              </th>
              <th className="text-left text-xs font-semibold tracking-wide py-3 px-3">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((company) => (
              <tr
                key={company.name}
                onClick={() => router.push(`/company/${company.slug}`)}
                className="border-b border-[#e2e2e2] hover:bg-[#f5f5f5] transition-colors cursor-pointer group"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-3 text-sm tabular-nums">
                    {col.key === "reputationScore" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${company.reputationScore}%`,
                              backgroundColor:
                                company.reputationScore >= 70
                                  ? "#16a34a"
                                  : company.reputationScore >= 50
                                    ? "#ca8a04"
                                    : "#dc2626",
                            }}
                          />
                        </div>
                        <span className="font-medium">
                          {col.format(company[col.key] as number)}
                        </span>
                      </div>
                    ) : (
                      <span className={col.key === "rank" ? "font-semibold" : ""}>
                        {col.format(company[col.key] as number)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="py-3 px-3 text-sm font-medium group-hover:text-blue-600 transition-colors">
                  {company.name}
                </td>
                <td className="py-3 px-3 text-sm text-gray-600">
                  {company.industry}
                </td>
                <td className="py-3 px-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${tagColors[company.tag]}`}
                    >
                      {company.tag}
                    </span>
                    <span className={`text-sm font-bold ${trendColors[company.trend]}`}>
                      {trendIcons[company.trend]}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  No companies match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
