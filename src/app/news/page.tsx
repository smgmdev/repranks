"use client";

import { useState, useMemo } from "react";
import { articles, categories } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);
  const [industriesOpen, setIndustriesOpen] = useState(true);
  const [topicsOpen, setTopicsOpen] = useState(true);

  const industryCategories = ["Automotive", "Financial Sector", "Food & Beverage", "Healthcare", "Technology"];
  const topicCategories = ["Controversy", "Customer Trust", "Employee Reviews", "Ethics Report", "Global Brands", "Industry Analysis", "Rankings Update"];

  const featured = articles.filter((a) => a.featured).slice(0, 4);

  const filtered = useMemo(() => {
    const nonFeatured = articles.filter((a) => !a.featured);
    if (activeCategory === "All") return nonFeatured;
    return nonFeatured.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <Navbar active="NEWS" />

      {/* Featured News */}
      <section className="bg-gradient-to-b from-[#1a3550] to-[#1a3550]/80 py-14">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">Featured News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group cursor-pointer flex flex-col overflow-hidden bg-[#1e2a3a] hover:bg-[#263a50] transition-colors duration-200"
              >
                {/* Image */}
                <div
                  className={`relative h-[220px] bg-gradient-to-br ${article.gradient} overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-5 right-5 w-16 h-16 border-4 border-white/25 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-[3px] border-white/20 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  {article.badge && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-white rounded ${article.badgeColor}`}
                    >
                      {article.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col px-5 pt-5 pb-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
                    {article.category}
                  </p>
                  <h3 className="text-xl font-bold leading-snug mb-4 flex-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 text-right">
                    {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Latest News */}
      <section className="max-w-[1600px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1100px] mx-auto">
          {/* Sidebar filters */}
          <aside className="lg:w-[220px] shrink-0">
            <h3 className="text-lg font-semibold text-gray-500 mb-8">
              Filter
            </h3>

            {/* Industries group */}
            <div className="mb-8">
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                className="flex items-center justify-between w-full mb-4"
              >
                <h4 className="text-lg font-bold text-white">Industries</h4>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${industriesOpen ? "" : "rotate-180"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {industriesOpen && (
                <div className="flex flex-col gap-0.5">
                  {industryCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 py-2 cursor-pointer group/item"
                    >
                      <input
                        type="checkbox"
                        checked={activeCategory === cat}
                        onChange={() => {
                          setActiveCategory(activeCategory === cat ? "All" : cat);
                          setVisibleCount(9);
                        }}
                        className="w-[18px] h-[18px] rounded border-2 border-gray-600 bg-transparent accent-blue-500 shrink-0"
                      />
                      <span className="text-sm text-gray-400 group-hover/item:text-white transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Topics group */}
            <div className="mb-10">
              <button
                onClick={() => setTopicsOpen(!topicsOpen)}
                className="flex items-center justify-between w-full mb-4"
              >
                <h4 className="text-lg font-bold text-white">Topics</h4>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${topicsOpen ? "" : "rotate-180"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {topicsOpen && (
                <div className="flex flex-col gap-0.5">
                  {topicCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 py-2 cursor-pointer group/item"
                    >
                      <input
                        type="checkbox"
                        checked={activeCategory === cat}
                        onChange={() => {
                          setActiveCategory(activeCategory === cat ? "All" : cat);
                          setVisibleCount(9);
                        }}
                        className="w-[18px] h-[18px] rounded border-2 border-gray-600 bg-transparent accent-blue-500 shrink-0"
                      />
                      <span className="text-sm text-gray-400 group-hover/item:text-white transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Reset / Confirm */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setVisibleCount(9);
                }}
                className="text-base text-gray-500 hover:text-white transition-colors"
              >
                Reset
              </button>
              <button className="px-6 py-2 text-base font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded transition-colors">
                Confirm
              </button>
            </div>
          </aside>

          {/* Cards list */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>

            <div className="flex flex-col gap-px max-w-[820px]">
              {visible.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group cursor-pointer flex hover:bg-[#1c2330] border-l-3 border-l-transparent hover:border-l-blue-500 hover:translate-x-2 transition-all duration-200 border-b border-white/5"
                >
                  {/* Image */}
                  <div
                    className={`relative w-[340px] h-[210px] shrink-0 bg-gradient-to-br ${article.gradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white/25 rounded-full" />
                    </div>
                    {article.badge && (
                      <span
                        className={`absolute top-2.5 left-2.5 px-2 py-0.5 text-[10px] font-bold text-white rounded ${article.badgeColor}`}
                      >
                        {article.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center py-4 px-6">
                    <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-2">
                      {article.category}
                    </p>
                    <h3 className="text-xl font-bold leading-snug mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {article.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((c) => c + 6)}
                  className="px-8 py-3 bg-[#161b22] text-sm font-semibold text-gray-300 hover:bg-[#1c2330] hover:text-white border border-white/10 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-black" style={{ letterSpacing: '-0.04em' }}>
            REPUTATION<span className="text-green-500">RANKS</span><sup className="text-[5px] font-normal text-gray-500">&reg;</sup>
          </span>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ReputationRanks. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Contact
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
