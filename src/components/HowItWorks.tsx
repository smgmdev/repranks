"use client";

import { useState } from "react";

const steps = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h2" />
      </svg>
    ),
    title: "Step 1. Enter company details",
    description: "Provide the company name, website, and industry. Our system begins scanning 15,000+ online sources immediately.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Step 2. AI analyzes reputation",
    description: "Our AI processes news articles, social media, consumer reviews, regulatory filings, and employee sentiment in real time.",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Step 3. Get your reputation score",
    description: "Receive a full 5-pillar breakdown with score calculation, media signals, and actionable insights — all in seconds.",
  },
];

const faqs = [
  {
    question: "How is the reputation score calculated?",
    answer: "The score is a weighted composite of 5 pillars: News & Media (30%), Social Discourse (25%), Consumer Reviews (20%), Investigations (15%), and Employee Sentiment (10%). Each pillar is scored 0–100 using AI analysis of public data.",
  },
  {
    question: "What data sources do you use?",
    answer: "We scan 15,000+ news outlets, social media platforms (X, Reddit, TikTok, YouTube), 50+ review sites (Trustpilot, Glassdoor, Google Reviews), court filings, SEC records, and regulatory databases — processing over 2 million data points daily.",
  },
  {
    question: "How often are rankings updated?",
    answer: "Rankings are updated quarterly with monthly interim signals. The Check tool provides real-time scores based on the latest available data at the time of your query.",
  },
  {
    question: "Can companies pay to improve their ranking?",
    answer: "No. ReputationRanks does not accept payment for placement on rankings. Scores are determined solely by our data-driven methodology. Promoted profiles are always clearly labeled.",
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Steps section */}
      <section className="bg-white py-16">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <div key={i}>
                <div className="text-gray-800 mb-4">{step.icon}</div>
                <h3 className="text-lg font-bold text-[#181716] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get to know more */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ accordion */}
            <div>
              <h2 className="text-2xl font-bold text-[#181716] mb-8 flex items-center gap-2">
                <span className="w-1 h-7 bg-red-500 rounded-full" />
                Get to know more
              </h2>

              <div className="space-y-0">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-t border-gray-300 last:border-b">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex items-center justify-between w-full py-4 text-left"
                    >
                      <span className="text-base font-medium text-[#181716]">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="pb-4">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-[400px] h-[320px]">
                {/* Browser window */}
                <div className="absolute top-6 left-6 w-[300px] h-[220px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                        <span className="text-green-600 font-black text-xs">R</span>
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="h-2.5 bg-gray-200 rounded w-3/4" />
                        <div className="h-2 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-full" />
                      <div className="h-2 bg-gray-100 rounded w-5/6" />
                      <div className="h-2 bg-gray-100 rounded w-4/6" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-blue-50 rounded flex-1" />
                      <div className="h-8 bg-purple-50 rounded flex-1" />
                      <div className="h-8 bg-amber-50 rounded flex-1" />
                    </div>
                  </div>
                </div>

                {/* Floating card */}
                <div className="absolute bottom-4 right-0 w-[140px] bg-white rounded-lg border border-gray-200 shadow-md p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-800">Score: 87</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-gray-100 rounded w-full" />
                    <div className="h-1.5 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>

                {/* Magnifying glass */}
                <div className="absolute bottom-0 left-0">
                  <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Dotted connection lines */}
                <svg className="absolute inset-0 w-full h-full" fill="none" stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" opacity={0.2}>
                  <path d="M180 130 Q 250 100 320 180" />
                  <path d="M80 200 Q 60 260 100 290" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
