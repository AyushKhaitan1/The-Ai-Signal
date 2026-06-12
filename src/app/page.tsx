"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

const getTimeInHours = (timeStr: string): number => {
  const normalized = timeStr.toLowerCase();
  if (normalized.includes("just now")) return 0.01;
  const match = normalized.match(/\d+/);
  if (!match) return 24; // fallback
  const val = parseInt(match[0], 10);
  if (normalized.includes("minute")) return val / 60;
  if (normalized.includes("hour")) return val;
  if (normalized.includes("day")) return val * 24;
  return val;
};

const getGroupHeader = (timeStr: string): "Today" | "Yesterday" | "Earlier This Week" => {
  const normalized = timeStr.toLowerCase();
  if (normalized.includes("minute") || normalized.includes("hour") || normalized.includes("just now")) {
    return "Today";
  }
  if (normalized.includes("1 day ago") || normalized.includes("yesterday")) {
    return "Yesterday";
  }
  return "Earlier This Week";
};

export default function Home() {
  const { news, searchTerm } = useSignals();
  const [subCategory, setSubCategory] = useState<"all" | "models" | "tools" | "funding" | "research">("all");

  const filteredNews = news.filter((item) => {
    if (subCategory !== "all" && item.category.toLowerCase() !== subCategory) {
      return false;
    }

    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.startup_name.toLowerCase().includes(term) ||
      item.domain.toLowerCase().includes(term) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(term)))
    );
  });

  const sortedNews = [...filteredNews].sort((a, b) => getTimeInHours(a.time) - getTimeInHours(b.time));

  // Group the sorted news items by relative day groups
  const groupedNews: {
    Today: typeof sortedNews;
    Yesterday: typeof sortedNews;
    "Earlier This Week": typeof sortedNews;
  } = {
    Today: [],
    Yesterday: [],
    "Earlier This Week": []
  };

  sortedNews.forEach((item) => {
    const group = getGroupHeader(item.time);
    groupedNews[group].push(item);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Side: Real-Time News Feed */}
      <div className="col-span-1 lg:col-span-2 space-y-6">
        
        {/* Airbnb-style Header Section */}
        <div className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-airbnb-border-light">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-airbnb-charcoal flex items-center space-x-2">
                <span>Real-Time News Feed</span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-airbnb-pink opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-airbnb-pink"></span>
                </span>
              </h1>
              <p className="text-xs text-airbnb-gray mt-1">
                Curated intelligence on foundational model releases, startup capital raises, and developer toolkits.
              </p>
            </div>
          </div>

          {/* Airbnb-style Category Icon Tabs */}
          <div className="flex items-center space-x-8 mt-5 pb-1 overflow-x-auto no-scrollbar border-b border-airbnb-border-light select-none">
            {(["all", "models", "tools", "funding", "research"] as const).map((cat) => {
              const isActive = subCategory === cat;
              
              const categories = {
                all: {
                  label: "All Signals",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                  )
                },
                models: {
                  label: "Models",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-2.013-2.013M9 21l2.013-2.013M2.28 18.096l3.42-3.42M21.72 5.904l-3.42 3.42M12 12a3 3 0 100-6 3 3 0 000 6zm0 0a6 6 0 100 12 6 6 0 000-12zm-3.5 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm11 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    </svg>
                  )
                },
                tools: {
                  label: "Tools",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  )
                },
                funding: {
                  label: "Funding",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                research: {
                  label: "Research",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  )
                }
              };

              const current = categories[cat];

              return (
                <button
                  key={cat}
                  onClick={() => setSubCategory(cat)}
                  className={`flex flex-col items-center space-y-1.5 pb-2 border-b-2 transition-all cursor-pointer group shrink-0 ${
                    isActive
                      ? "border-b-[#222222] text-[#222222]"
                      : "border-b-transparent text-airbnb-gray hover:text-[#222222] hover:border-b-airbnb-border-light"
                  }`}
                >
                  <span className={`transition-transform duration-200 group-hover:scale-105 ${isActive ? "text-[#222222]" : "text-airbnb-gray/80 group-hover:text-[#222222]"}`}>
                    {current.icon}
                  </span>
                  <span className={`text-[11px] font-bold tracking-tight ${isActive ? "text-[#222222] font-extrabold" : "text-airbnb-gray"}`}>
                    {current.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Refetch-style Date Grouped Feed */}
        <div className="space-y-6">
          {sortedNews.length === 0 ? (
            <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
              No signals found matching &ldquo;{searchTerm}&rdquo; {subCategory !== "all" ? `in ${subCategory}` : ""}
            </div>
          ) : (
            (["Today", "Yesterday", "Earlier This Week"] as const).map((groupName) => {
              const groupItems = groupedNews[groupName];
              if (groupItems.length === 0) return null;

              return (
                <div key={groupName} className="space-y-3">
                  {/* Refetch Date Header */}
                  <div className="flex items-center space-x-3 pt-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-airbnb-gray bg-airbnb-bg px-2.5 py-1 rounded-md border border-airbnb-border-light/50">
                      {groupName}
                    </span>
                    <div className="h-px flex-grow bg-airbnb-border-light/60"></div>
                  </div>

                  {/* Unified Card Container */}
                  <div className="bg-white border border-airbnb-border-light rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                    {groupItems.map((item) => {
                      const globalRank = sortedNews.findIndex((n) => n.id === item.id) + 1;
                      return <NewsRow key={item.id} item={item} rank={globalRank} />;
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Side: Sidebar Widgets */}
      <Sidebar />
    </div>
  );
}
