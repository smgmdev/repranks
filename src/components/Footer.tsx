export default function Footer() {
  return (
    <footer className="bg-[#181716] text-white mt-16">
      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <h3 className="text-xl font-black mb-2" style={{ letterSpacing: '-0.04em' }}>REPUTATION<span className="text-green-500">RANKS</span><sup className="text-[6px] font-normal text-gray-500">&reg;</sup></h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Data-driven company reputation rankings based on public reviews,
              employee feedback, and ethical business practices.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-gray-400">
            <div>
              <h4 className="text-white font-semibold mb-2">Rankings</h4>
              <ul className="space-y-1">
                <li>Top Companies</li>
                <li>Worst Companies</li>
                <li>By Industry</li>
                <li>By Country</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">About</h4>
              <ul className="space-y-1">
                <li>Methodology</li>
                <li>Data Sources</li>
                <li>Contact</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          Rankings do not imply endorsement. Data sourced from public reviews
          and filings. Companies do not pay for placement.
        </div>
        <div className="text-center text-xs text-gray-600 mt-2">
          &copy; {new Date().getFullYear()} ReputationRanks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
