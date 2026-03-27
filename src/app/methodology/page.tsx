import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
  {
    title: "Online News & Media Coverage",
    weight: "30%",
    icon: "📰",
    color: "from-blue-600 to-blue-800",
    description:
      "We monitor 15,000+ online news outlets, magazines, and digital media publications worldwide. Our AI reads and classifies every article mentioning a company — from investigative exposés to press releases — scoring tone, credibility, and reach. Coverage from tier-1 outlets (Reuters, Bloomberg, NYT, BBC) carries higher weight than blogs or tabloids. Negative coverage involving scandals, lawsuits, or regulatory action triggers penalty multipliers.",
    sources: ["Reuters", "Bloomberg", "NYT", "BBC", "The Guardian", "Forbes", "TechCrunch", "Local Press"],
    metrics: ["Article Sentiment Score", "Coverage Volume", "Source Credibility Weight", "Negative Event Multiplier", "Headline vs Body Tone Gap"],
  },
  {
    title: "Social Media & Public Discourse",
    weight: "25%",
    icon: "📱",
    color: "from-purple-600 to-purple-800",
    description:
      "We track real-time conversations across X (Twitter), Reddit, TikTok, YouTube comments, Facebook, and forums. Our NLP models detect viral moments, boycott movements, praise threads, and shifting public opinion. We measure not just volume but velocity — how fast sentiment changes after a news event. Astroturfing and bot activity is filtered out using behavioral pattern detection.",
    sources: ["X (Twitter)", "Reddit", "TikTok", "YouTube", "Facebook", "Quora", "HackerNews", "Forums"],
    metrics: ["Social Sentiment Index", "Virality Score", "Boycott/Praise Detection", "Opinion Velocity", "Bot-Filtered Engagement"],
  },
  {
    title: "Consumer Review Aggregation",
    weight: "20%",
    icon: "⭐",
    color: "from-amber-600 to-amber-800",
    description:
      "We scrape and normalize consumer reviews from 50+ platforms globally. Each review is analyzed for authenticity, detail, and recency. Fake reviews are flagged using our proprietary detection model trained on 10M+ verified vs fraudulent reviews. We weight recent reviews higher and track rating trajectory over time — a company dropping from 4.5 to 3.8 in 6 months gets a steeper penalty than one stable at 3.8.",
    sources: ["Trustpilot", "Google Reviews", "Yelp", "BBB", "Amazon", "App Store", "G2", "Capterra"],
    metrics: ["Weighted Star Rating", "Review Authenticity Score", "Rating Trajectory", "Response & Resolution Rate", "Review Volume Index"],
  },
  {
    title: "Investigative & Whistleblower Reports",
    weight: "15%",
    icon: "🔍",
    color: "from-red-600 to-red-800",
    description:
      "We track court filings, regulatory actions, whistleblower reports, leaked documents, and investigative journalism pieces. This pillar captures what companies try to hide — from environmental violations to labor abuses to financial fraud. Data is sourced from SEC enforcement actions, OSHA records, EPA violations, EU regulatory bodies, and award-winning investigative outlets. A single major investigation can significantly move a company's score.",
    sources: ["SEC Enforcement", "OSHA Records", "EPA Violations", "EU Regulators", "ICIJ", "ProPublica", "Court Records"],
    metrics: ["Active Litigation Count", "Regulatory Violation Score", "Whistleblower Report Index", "Investigation Severity Rating", "Settlement/Fine History"],
  },
  {
    title: "Employee & Insider Sentiment",
    weight: "10%",
    icon: "🏢",
    color: "from-teal-600 to-teal-800",
    description:
      "Anonymous employee reviews and insider discussions reveal what no press release ever will. We analyze Glassdoor, Blind, Fishbowl, and LinkedIn commentary to understand internal culture, management trust, and whether a company's public image matches its private reality. Sudden spikes in negative employee reviews often precede public reputation crises by 3–6 months.",
    sources: ["Glassdoor", "Blind", "Fishbowl", "LinkedIn", "Indeed", "Comparably"],
    metrics: ["Employee NPS", "Management Trust Score", "Culture Gap Index", "Internal Sentiment Trend", "Attrition Signal"],
  },
];

const process = [
  {
    step: "01",
    title: "Web Crawling & Ingestion",
    description: "Our distributed crawlers scan 15,000+ news sites, social platforms, review sites, and public records daily — ingesting 2M+ data points per day into our pipeline.",
  },
  {
    step: "02",
    title: "Deduplication & Filtering",
    description: "Duplicate articles, syndicated content, bot-generated reviews, and spam are identified and removed. Only authentic, unique signals pass through to scoring.",
  },
  {
    step: "03",
    title: "NLP & Sentiment Scoring",
    description: "Each data point is processed by our fine-tuned LLM ensemble — classifying sentiment, extracting entities, detecting tone, and assigning per-pillar scores with confidence intervals.",
  },
  {
    step: "04",
    title: "Cross-Validation & Anomaly Detection",
    description: "Scores are cross-validated against historical baselines. Sudden score changes trigger anomaly review — our analysts verify whether shifts are driven by real events or data noise.",
  },
  {
    step: "05",
    title: "Ranking & Publication",
    description: "Final weighted scores produce the global ranking. Results are reviewed by our editorial board, tagged with confidence levels, and published with full source attribution.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <Navbar active="METHODOLOGY" />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-[#0d1117] via-[#111827] to-[#0d1117] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 border-[40px] border-white/10 rounded-full" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 border-[30px] border-white/10 rounded-full" />
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-green-400 mb-4">
            How We Rank
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Our Methodology
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            ReputationRanks continuously monitors the global media landscape — news articles,
            social conversations, consumer reviews, and public records — to produce the most
            comprehensive, data-driven company reputation scores on the web.
          </p>
        </div>
      </section>

      {/* Formula overview */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-3">The Reputation Score Formula</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Each company receives a composite score from 0–100, derived from online media signals across five weighted pillars.
        </p>

        <div className="bg-[#161b22] border border-white/10 rounded-xl p-8 mb-16">
          <div className="text-center font-mono text-sm md:text-base text-gray-300 leading-loose">
            <span className="text-green-400 font-bold">ReputationScore</span> = <br className="md:hidden" />
            (<span className="text-blue-400">NewsMedia</span> × 0.30) + <br className="md:hidden" />
            (<span className="text-purple-400">SocialDiscourse</span> × 0.25) + <br className="md:hidden" />
            (<span className="text-amber-400">ConsumerReviews</span> × 0.20) + <br className="md:hidden" />
            (<span className="text-red-400">Investigations</span> × 0.15) + <br className="md:hidden" />
            (<span className="text-teal-400">EmployeeSentiment</span> × 0.10)
          </div>
        </div>

        {/* Weight visualization */}
        <div className="flex h-4 rounded-full overflow-hidden mb-2">
          <div className="bg-blue-600 w-[30%]" />
          <div className="bg-purple-600 w-[25%]" />
          <div className="bg-amber-600 w-[20%]" />
          <div className="bg-red-600 w-[15%]" />
          <div className="bg-teal-600 w-[10%]" />
        </div>
        <div className="flex text-[10px] text-gray-500 mb-16">
          <div className="w-[30%]">News & Media 30%</div>
          <div className="w-[25%]">Social 25%</div>
          <div className="w-[20%]">Reviews 20%</div>
          <div className="w-[15%]">Investigations 15%</div>
          <div className="w-[10%]">Employee 10%</div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#161b22] border-y border-white/5 py-10 mb-16">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-green-400">15K+</div>
            <div className="text-sm text-gray-400 mt-1">News Sources Monitored</div>
          </div>
          <div>
            <div className="text-3xl font-black text-blue-400">2M+</div>
            <div className="text-sm text-gray-400 mt-1">Data Points Per Day</div>
          </div>
          <div>
            <div className="text-3xl font-black text-purple-400">50+</div>
            <div className="text-sm text-gray-400 mt-1">Review Platforms Scraped</div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400">190</div>
            <div className="text-sm text-gray-400 mt-1">Countries Covered</div>
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-10">The Five Pillars</h2>
        <div className="flex flex-col gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-[#161b22] border border-white/5 rounded-xl overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${pillar.color}`} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{pillar.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{pillar.title}</h3>
                      <span className="text-sm text-gray-500">Weight: {pillar.weight}</span>
                    </div>
                  </div>
                  <span className="text-3xl font-black text-white/10">{pillar.weight}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                      Data Sources
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pillar.sources.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs bg-white/5 text-gray-300 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">
                      Key Metrics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pillar.metrics.map((m) => (
                        <span
                          key={m}
                          className="px-2.5 py-1 text-xs bg-white/5 text-gray-300 rounded"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#161b22] py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-2xl font-bold mb-3 text-center">Our Process</h2>
          <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">
            From raw web data to published rankings — a rigorous five-step pipeline running 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((step, i) => (
              <div key={step.step} className="relative">
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-6 border-t border-dashed border-gray-700 z-10" />
                )}
                <div className="text-4xl font-black text-white/10 mb-3">{step.step}</div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How media impacts scores */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-10 text-center">How Online Media Moves Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="text-red-400 text-2xl mb-3">↓ Score Drops</div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Investigative exposé published by major outlet</li>
              <li>• Viral social media boycott or scandal</li>
              <li>• Regulatory fine or enforcement action reported</li>
              <li>• Sudden spike in 1-star consumer reviews</li>
              <li>• Whistleblower report gains media traction</li>
              <li>• CEO controversy covered across outlets</li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="text-yellow-400 text-2xl mb-3">→ Score Stable</div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Consistent neutral media coverage</li>
              <li>• Steady review ratings with no major shifts</li>
              <li>• Normal volume of employee reviews</li>
              <li>• No active investigations or legal actions</li>
              <li>• Social mentions within historical baseline</li>
              <li>• Press releases with no organic amplification</li>
            </ul>
          </div>
          <div className="bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="text-green-400 text-2xl mb-3">↑ Score Rises</div>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Positive investigative feature or profile</li>
              <li>• Viral praise campaign on social media</li>
              <li>• Industry award covered by multiple outlets</li>
              <li>• Sustained improvement in consumer reviews</li>
              <li>• Employee satisfaction trending upward</li>
              <li>• Crisis handled well with transparent response</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-white/5 rounded-xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Transparency Commitment</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-6">
            Companies do not pay for placement. Rankings are determined solely by
            what the internet says — news coverage, public reviews, social conversations,
            and official records. Promoted profiles are always clearly labeled. We publish
            our data sources, update frequency, and scoring methodology in full.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-sm font-bold rounded transition-colors">
              Download Full Methodology (PDF)
            </button>
            <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-sm font-bold rounded border border-white/10 transition-colors">
              Contact Research Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
