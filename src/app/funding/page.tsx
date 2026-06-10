"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

export default function FundingPage() {
  const { news, searchTerm } = useSignals();

  const filteredItems = news.filter((item) => {
    const isFunding = 
      item.category === "Funding" ||
      item.title.toLowerCase().includes("raises") ||
      item.title.toLowerCase().includes("secures");
      
    if (!isFunding) return false;

    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.startup_name.toLowerCase().includes(term) ||
      item.domain.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">VC Funding Rounds & Cap Tables</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Tracking valuations, seed raises, Series A/B/C rounds, and corporate debt placements.
            </p>
          </div>

          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                No funding signals found matching &ldquo;{searchTerm}&rdquo;
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <NewsRow key={item.id} item={item} rank={index + 1} />
              ))
            )}
          </div>
        </div>

        <Sidebar />

      </div>
    </div>
  );
}
