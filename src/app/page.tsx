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
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [subCategory, setSubCategory] = useState<"all" | "models" | "tools" | "funding" | "research" | "startups" | "safety" | "compute">("all");

  const filteredNews = news.filter((item) => {
    // Global navbar search filter
    const globalTerm = searchTerm.toLowerCase();
    const globalMatch = !searchTerm ||
      item.title.toLowerCase().includes(globalTerm) ||
      item.category.toLowerCase().includes(globalTerm) ||
      item.startup_name.toLowerCase().includes(globalTerm) ||
      item.domain.toLowerCase().includes(globalTerm) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(globalTerm)));

    if (!globalMatch) return false;

    // Local news feed search filter
    const localTerm = localSearchTerm.toLowerCase();
    const localMatch = !localSearchTerm ||
      item.title.toLowerCase().includes(localTerm) ||
      item.category.toLowerCase().includes(localTerm) ||
      item.startup_name.toLowerCase().includes(localTerm) ||
      item.domain.toLowerCase().includes(localTerm) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(localTerm)));

    if (!localMatch) return false;

    if (subCategory !== "all") {
      const categoryLower = item.category.toLowerCase();
      if (subCategory === "models") {
        if (categoryLower !== "models") return false;
      } else if (subCategory === "tools") {
        if (categoryLower !== "tools") return false;
      } else if (subCategory === "funding") {
        if (categoryLower !== "funding") return false;
      } else if (subCategory === "research") {
        if (categoryLower !== "research") return false;
      } else if (subCategory === "startups") {
        const isStartup = item.startup_name !== "Other" || categoryLower === "funding";
        if (!isStartup) return false;
      } else if (subCategory === "safety") {
        const text = (item.title + " " + item.tags.join(" ")).toLowerCase();
        const isSafety = text.includes("safety") || text.includes("align") || text.includes("eval");
        if (!isSafety) return false;
      } else if (subCategory === "compute") {
        const text = (item.title + " " + item.tags.join(" ")).toLowerCase();
        const isCompute = text.includes("compute") || text.includes("gpu") || text.includes("chip") || text.includes("hardware") || text.includes("colossus") || text.includes("nvidia");
        if (!isCompute) return false;
      }
    }

    return true;
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

            {/* Local Search Input (Airbnb style consistency) */}
            <div className="flex items-center w-full md:w-80 bg-white border border-airbnb-border rounded-full px-4 py-2.5 shadow-sm hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] transition-all cursor-pointer shrink-0">
              <input
                type="text"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                placeholder="Search signals..."
                className="w-full text-xs font-semibold text-airbnb-charcoal placeholder-airbnb-gray bg-transparent focus:outline-none"
              />
              <button className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white p-1.5 rounded-full transition-colors ml-2 -mr-2 flex items-center justify-center cursor-pointer">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Airbnb-style Category Icon Tabs */}
          <div className="flex items-center space-x-8 mt-5 pb-1 overflow-x-auto no-scrollbar border-b border-airbnb-border-light select-none">
            {(["all", "models", "tools", "funding", "research", "startups", "safety", "compute"] as const).map((cat) => {
              const isActive = subCategory === cat;
              
              const categories = {
                all: {
                  label: "All Signals",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FF385C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" />
                      <rect x="14" y="3" width="7" height="5" />
                      <rect x="14" y="12" width="7" height="9" />
                      <rect x="3" y="16" width="7" height="5" />
                    </svg>
                  )
                },
                models: {
                  label: "Models",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 6v12" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )
                },
                tools: {
                  label: "Tools",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                      <line x1="14" y1="4" x2="10" y2="20" />
                    </svg>
                  )
                },
                funding: {
                  label: "Funding",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  )
                },
                research: {
                  label: "Research",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  )
                },
                startups: {
                  label: "Startups",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  )
                },
                safety: {
                  label: "Safety",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )
                },
                compute: {
                  label: "Compute",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                  )
                }
              };

              const current = categories[cat];

              return (
                <button
                  key={cat}
                  onClick={() => setSubCategory(cat)}
                  className={`flex flex-col items-center space-y-1.5 pb-2 transition-all cursor-pointer group shrink-0 ${
                    isActive
                      ? "text-[#222222]"
                      : "text-airbnb-gray opacity-60 hover:opacity-100 hover:text-[#222222]"
                  }`}
                >
                  <span className="transition-transform duration-200 group-hover:scale-105">
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
              No signals found matching &ldquo;{searchTerm || localSearchTerm}&rdquo; {subCategory !== "all" ? `in ${subCategory}` : ""}
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
