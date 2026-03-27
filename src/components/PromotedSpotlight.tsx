const promoted = [
  {
    name: "Costco Wholesale",
    initials: "COSTCO",
    bgColor: "#e21836",
    textColor: "#fff",
  },
  {
    name: "Patagonia",
    initials: "PATAGONIA",
    bgColor: "#1a1a2e",
    textColor: "#fff",
  },
  {
    name: "LEGO Group",
    initials: "LEGO",
    bgColor: "#f6ec35",
    textColor: "#000",
  },
];

export default function PromotedSpotlight() {
  return (
    <section className="max-w-[1600px] mx-auto px-6 pt-12 pb-4">
      <h2 className="text-center text-4xl md:text-5xl font-serif italic mb-10">
        The Full List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {promoted.map((company) => (
          <div
            key={company.name}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div
              className="w-24 h-24 shrink-0 rounded flex items-center justify-center bg-gray-50 border border-gray-100"
            >
              <span
                className="font-black text-xs tracking-wider px-2 py-1 rounded"
                style={{
                  backgroundColor: company.bgColor,
                  color: company.textColor,
                }}
              >
                {company.initials}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-wide uppercase">
                  Profile Spotlight
                </span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Promoted
                </span>
              </div>
              <h3 className="text-lg font-semibold leading-snug mb-1">
                {company.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-red-600 group-hover:underline">
                VIEW PROFILE
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
