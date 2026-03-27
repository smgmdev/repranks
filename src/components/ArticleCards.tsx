const articles = [
  {
    badge: "NEW",
    badgeColor: "bg-green-500",
    category: "EMPLOYEE REVIEWS",
    title: "Why Costco Tops Every Employee Satisfaction Survey",
    description: "Costco's legendary employee retention and benefits make it a standout in retail — here's what others can learn.",
    tag: "Workplace Culture",
    gradient: "from-blue-900 to-blue-600",
  },
  {
    badge: null,
    badgeColor: "",
    category: "ETHICS REPORT",
    title: "Patagonia's Blueprint for Ethical Business",
    description: "How a clothing company became the gold standard for corporate responsibility.",
    tag: "Sustainability",
    gradient: "from-green-900 to-green-600",
  },
  {
    badge: "TRENDING",
    badgeColor: "bg-red-500",
    category: "CONTROVERSY",
    title: "Meta's Ongoing Trust Crisis: A Deep Dive",
    description: "Privacy scandals, misinformation, and declining public trust — what went wrong at Meta.",
    tag: "Big Tech",
    gradient: "from-purple-900 to-purple-600",
  },
  {
    badge: null,
    badgeColor: "",
    category: "INDUSTRY ANALYSIS",
    title: "Boeing's Reputation Freefall After Safety Failures",
    description: "From aviation leader to public safety concern — the full timeline of Boeing's decline.",
    tag: "Aerospace",
    gradient: "from-gray-900 to-gray-600",
  },
  {
    badge: "HOT",
    badgeColor: "bg-orange-500",
    category: "RANKINGS UPDATE",
    title: "NVIDIA Climbs to Top 5 in Reputation Rankings",
    description: "AI boom and strong employee culture propel NVIDIA up the charts in 2026.",
    tag: "Technology",
    gradient: "from-teal-900 to-teal-600",
  },
  {
    badge: null,
    badgeColor: "",
    category: "CUSTOMER TRUST",
    title: "Amazon's Customer Love vs Worker Criticism",
    description: "High customer ratings but low employee scores — Amazon's reputation paradox explained.",
    tag: "E-Commerce",
    gradient: "from-yellow-900 to-amber-700",
  },
  {
    badge: null,
    badgeColor: "",
    category: "FINANCIAL SECTOR",
    title: "Wells Fargo: Can a Bank Rebuild Trust?",
    description: "Years after the fake accounts scandal, Wells Fargo is still fighting for credibility.",
    tag: "Banking",
    gradient: "from-red-900 to-red-700",
  },
  {
    badge: "NEW",
    badgeColor: "bg-green-500",
    category: "GLOBAL BRANDS",
    title: "LEGO: The Most Loved Company in the World?",
    description: "From toy bricks to cultural icon — why LEGO consistently ranks at the top globally.",
    tag: "Consumer Goods",
    gradient: "from-yellow-800 to-yellow-500",
  },
  {
    badge: null,
    badgeColor: "",
    category: "WATCHLIST",
    title: "Tesla's Polarizing Reputation Explained",
    description: "Loved by fans, criticized by analysts — how Tesla became the most divisive brand.",
    tag: "Automotive",
    gradient: "from-slate-900 to-slate-600",
  },
  {
    badge: "REPORT",
    badgeColor: "bg-blue-500",
    category: "HEALTH & PHARMA",
    title: "Purdue Pharma: The Lowest Score on Our List",
    description: "The opioid crisis legacy continues to make Purdue Pharma the worst-rated company.",
    tag: "Healthcare",
    gradient: "from-rose-950 to-rose-800",
  },
];

export default function ArticleCards() {
  return (
    <section className="bg-[#0d1117] px-6 py-12">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-white text-2xl font-bold mb-6">Recommended</h2>
        <div className="flex lg:grid lg:grid-cols-5 gap-5 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-4 lg:pb-0 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {articles.slice(0, 5).map((article, i) => (
            <div
              key={i}
              className="group cursor-pointer flex flex-col overflow-hidden min-w-[260px] sm:min-w-[280px] lg:min-w-0 snap-start"
            >
              {/* Image area */}
              <div
                className={`relative h-[200px] bg-gradient-to-br ${article.gradient} overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white/30 rounded-full" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-4 border-white/20 rounded" />
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

                {article.badge && (
                  <span
                    className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-[10px] font-bold text-white rounded ${article.badgeColor}`}
                  >
                    {article.badge}
                  </span>
                )}
              </div>

              {/* Content area — dark grey background */}
              <div className="flex-1 flex flex-col bg-[#1a1d23] p-5">
                <p className="text-[11px] font-semibold tracking-wider text-gray-400 mb-2 uppercase">
                  {article.category}
                </p>
                <h3 className="text-white text-base font-bold leading-snug mb-2 group-hover:text-gray-300">
                  {article.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed mb-3 line-clamp-3">
                  {article.description}
                </p>
                <p className="mt-auto text-gray-500 text-xs pt-2 border-t border-white/5">
                  {article.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
