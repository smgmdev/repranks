import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ArticleCards from "@/components/ArticleCards";

import PromotedSpotlight from "@/components/PromotedSpotlight";
import ReputationTable from "@/components/ReputationTable";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main>
      <Navbar active="RANKINGS" />
      <HeroSlider />
      <ArticleCards />
      <PromotedSpotlight />
      <section id="rankings" className="max-w-[1600px] mx-auto px-6 pb-10 scroll-mt-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">2026 Global Reputation Rankings</h2>
        </div>
        <p className="text-gray-500 text-sm mb-8">
          Edited by ReputationRanks Research Team &middot; March 27, 2026
        </p>
        <ReputationTable />
      </section>
      <HowItWorks />
      <Footer />
    </main>
  );
}
