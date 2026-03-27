export default function Hero() {
  return (
    <section className="relative bg-[#181716] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-transparent to-red-500" />
      </div>
      <div className="relative max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-green-400 mb-4">
          2026 Rankings
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl">
          Company Reputation
          <br />
          <span className="text-green-400">Rankings</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
          The definitive ranking of global companies based on customer reviews,
          employee satisfaction, ethical practices, and public sentiment data
          scraped from across the web.
        </p>
        <div className="flex gap-6 text-sm text-gray-400">
          <div>
            <span className="block text-2xl font-bold text-white">50</span>
            Companies Ranked
          </div>
          <div className="border-l border-gray-700 pl-6">
            <span className="block text-2xl font-bold text-white">5</span>
            Data Sources
          </div>
          <div className="border-l border-gray-700 pl-6">
            <span className="block text-2xl font-bold text-white">15</span>
            Countries
          </div>
        </div>
      </div>
    </section>
  );
}
