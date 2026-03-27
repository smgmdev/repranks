import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#0d1117] text-white">
      <Navbar active="NEWS" />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${article.gradient} py-20`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-[20%] w-48 h-48 border-[16px] border-white/20 rounded-full" />
          <div className="absolute bottom-10 left-[15%] w-32 h-32 border-[12px] border-white/15 rounded-full" />
        </div>
        <div className="relative max-w-[800px] mx-auto px-6">
          <Link href="/news" className="text-sm text-white/60 hover:text-white transition-colors mb-6 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to News
          </Link>
          <div className="mt-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
              {article.category}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              {article.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-white/50">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{article.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>ReputationRanks Research</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-[800px] mx-auto px-6 py-12">
        {article.body.map((paragraph, i) => (
          <p key={i} className="text-gray-300 text-base leading-[1.8] mb-6">
            {paragraph}
          </p>
        ))}

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <p className="text-xs text-gray-500 mb-6">
            This analysis is based on data collected by ReputationRanks from 200+ sources.
            Scores are updated quarterly. Read our <Link href="/methodology" className="text-blue-400 hover:underline">full methodology</Link> for details.
          </p>
        </div>

        {/* Related articles */}
        <h3 className="text-xl font-bold mb-6">More from ReputationRanks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles
            .filter((a) => a.id !== article.id)
            .slice(0, 4)
            .map((related) => (
              <Link
                key={related.id}
                href={`/news/${related.id}`}
                className="group flex gap-4 p-4 bg-[#161b22] hover:bg-[#1c2330] transition-colors"
              >
                <div className={`w-20 h-20 shrink-0 bg-gradient-to-br ${related.gradient} rounded overflow-hidden`}>
                  <div className="w-full h-full opacity-15">
                    <div className="absolute top-2 right-2 w-6 h-6 border-2 border-white/25 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 mb-1">
                    {related.category}
                  </p>
                  <h4 className="text-sm font-bold leading-snug line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{related.date}</p>
                </div>
              </Link>
            ))}
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-black" style={{ letterSpacing: '-0.04em' }}>
            REPUTATION<span className="text-green-500">RANKS</span><sup className="text-[5px] font-normal text-gray-500">&reg;</sup>
          </span>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ReputationRanks. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
