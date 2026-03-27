"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    headline: "2026 Reputation Rankings",
    subtitle: "200 companies ranked by what the internet really thinks — powered by AI analysis of 15K+ news sources, social media, and consumer reviews.",
    cta: "View Full Rankings",
    ctaLink: "#rankings",
    gradient: "linear-gradient(to right, #0a1628, #1a3a5c, #2980b9)",
    accent: "#3b82f6",
    stat: "200 Companies Ranked",
  },
  {
    headline: "Best Reputation 2026",
    subtitle: "The 100 companies with the strongest public image over the last 6 months — from Costco and Patagonia to LEGO and Mayo Clinic.",
    cta: "See Top 100",
    ctaLink: "#rankings",
    gradient: "linear-gradient(to right, #0a1a0a, #1a3a1a, #15803d)",
    accent: "#22c55e",
    stat: "Score 70+",
  },
  {
    headline: "Worst Reputation 2026",
    subtitle: "100 companies with the worst public reputation — including SMEs, crypto firms, and brands hit by scandals, lawsuits, and boycotts.",
    cta: "See the List",
    ctaLink: "#rankings",
    gradient: "linear-gradient(to right, #1a0a0a, #4a1a1a, #991b1b)",
    accent: "#ef4444",
    stat: "Score Below 30",
  },
  {
    headline: "How We Rank",
    subtitle: "Our scores are built from 5 pillars: News & Media (30%), Social Discourse (25%), Consumer Reviews (20%), Investigations (15%), and Employee Sentiment (10%).",
    cta: "Read Methodology",
    ctaLink: "/methodology",
    gradient: "linear-gradient(to right, #1a0a28, #3a1a5c, #7c3aed)",
    accent: "#8b5cf6",
    stat: "2M+ Data Points Daily",
  },
  {
    headline: "Latest News & Analysis",
    subtitle: "In-depth articles on corporate reputation — from Meta's trust crisis to NVIDIA's rise, Boeing's freefall, and Amazon's worker paradox.",
    cta: "Read News",
    ctaLink: "/news",
    gradient: "linear-gradient(to right, #0a1a1a, #1a3a3a, #0d9488)",
    accent: "#14b8a6",
    stat: "16 Feature Articles",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <div className="relative bg-[#0d1117] select-none">
      {/* Slide track — all slides in a row, translate the whole strip */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${(current * 100) / slides.length}%)`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative h-[320px] md:h-[350px] flex-shrink-0"
              style={{ width: `${100 / slides.length}%`, background: slide.gradient }}
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-10 overflow-hidden">
                <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[40px] border-white/20 rotate-12" />
                <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[300px] h-[300px] rounded-full border-[30px] border-white/15 -rotate-45" />
              </div>

              <div className="relative max-w-[1600px] mx-auto px-16 h-full flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span
                    className="px-3 py-1 text-xs font-bold text-white rounded-full"
                    style={{ backgroundColor: slide.accent }}
                  >
                    {slide.stat}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
                  {slide.headline}
                </h2>
                <p className="text-lg md:text-xl text-white/60 mb-6 max-w-2xl leading-relaxed">
                  {slide.subtitle}
                </p>
                <div>
                  <a
                    href={slide.ctaLink}
                    className="inline-block px-8 py-3 rounded-md text-base font-bold text-white transition-transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: slide.accent }}
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-[calc(50%-20px)] -translate-y-1/2 z-10 w-10 h-14 bg-black/50 hover:bg-black/70 rounded flex items-center justify-center transition-colors"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-[calc(50%-20px)] -translate-y-1/2 z-10 w-10 h-14 bg-black/50 hover:bg-black/70 rounded flex items-center justify-center transition-colors"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-3 py-3 bg-[#0d1117]">
        <button
          onClick={() => setPaused(!paused)}
          className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          {paused ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          )}
        </button>

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group py-1"
          >
            <div
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-blue-500"
                  : "w-5 bg-white/30 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
