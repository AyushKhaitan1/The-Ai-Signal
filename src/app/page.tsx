"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

export default function Home() {
  const { news, searchTerm } = useSignals();

  const filteredNews = news.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.startup_name.toLowerCase().includes(term) ||
      item.domain.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Real-Time News Feed */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Real-Time AI Signals Feed</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Curated intelligence on foundational model releases, startup capital raises, and developer toolkits.
            </p>
          </div>

          <div className="space-y-4">
            {filteredNews.length === 0 ? (
              <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                No signals found matching &ldquo;{searchTerm}&rdquo;
              </div>
            ) : (
              filteredNews.map((item, index) => (
                <NewsRow key={item.id} item={item} rank={index + 1} />
              ))
            )}
          </div>
        </div>

        {/* Right Side: Sidebar Widgets */}
        <Sidebar />

      </div>
    </div>
  );
}
