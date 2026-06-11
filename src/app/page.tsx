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
  const [activeTab, setActiveTab] = useState<"hot" | "new" | "top" | "active">("hot");
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

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (activeTab === "new") {
      return getTimeInHours(a.time) - getTimeInHours(b.time);
    }
    if (activeTab === "top") {
      return b.upvotes - a.upvotes;
    }
    if (activeTab === "active") {
      return b.comments_count - a.comments_count;
    }
    // "hot" (default decay algorithm)
    const scoreA = a.upvotes / Math.pow(getTimeInHours(a.time) + 2, 1.5);
    const scoreB = b.upvotes / Math.pow(getTimeInHours(b.time) + 2, 1.5);
    return scoreB - scoreA;
  });

  const activeCount = filteredNews.length;
  const maxUpvotes = filteredNews.reduce((max, item) => item.upvotes > max ? item.upvotes : max, 0);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-white via-[#FFF8F9] to-[#FFF0F2] border border-airbnb-border-light rounded-3xl p-6 sm:p-8 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-airbnb-pink/5 rounded-full blur-2xl group-hover:bg-airbnb-pink/10 transition-colors duration-500"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-airbnb-pink/5 rounded-full blur-2xl group-hover:bg-airbnb-pink/10 transition-colors duration-500"></div>
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white border border-airbnb-border-light rounded-full px-3 py-1 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-airbnb-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-airbnb-pink"></span>
            </span>
            <span className="text-[10px] uppercase font-bold text-airbnb-charcoal tracking-wider">Live Tech Intelligence Feed</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-airbnb-charcoal leading-none mb-3">
            Welcome to <span className="text-airbnb-pink">orbit-News</span>
          </h1>
          <p className="text-sm sm:text-base text-airbnb-gray leading-relaxed font-normal">
            Mapping the global tech ecosystem. Curated intelligence on foundational model breakthroughs, compute alliances, open-source codebases, and capital raises.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Real-Time News Feed */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white border border-airbnb-border-light border-l-4 border-l-airbnb-charcoal rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal flex items-center space-x-2">
              <span>Real-Time News Feed</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-airbnb-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-airbnb-pink"></span>
              </span>
            </h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Curated intelligence on foundational model releases, startup capital raises, and developer toolkits.
            </p>

            {/* Subtildes Group Filtering (Tildes-style) & Sorting (Refetch/Tildes hybrid control) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-5 pt-4 border-t border-airbnb-border-light/60">
              {/* Tildes groups */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold text-airbnb-gray uppercase tracking-wider mr-1">Groups:</span>
                {(["all", "models", "tools", "funding", "research"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSubCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      subCategory === cat
                        ? "bg-airbnb-charcoal text-white shadow-sm"
                        : "bg-airbnb-bg text-airbnb-gray hover:text-airbnb-charcoal hover:bg-airbnb-border-light/40"
                    }`}
                  >
                    ~{cat}
                  </button>
                ))}
              </div>

              {/* Sorting Tabs */}
              <div className="flex items-center space-x-1 p-0.5 bg-airbnb-bg rounded-xl border border-airbnb-border-light/60 w-fit shrink-0">
                {(["hot", "new", "top", "active"] as const).map((tab) => {
                  const icons = { hot: "🔥", new: "🆕", top: "🏆", active: "💬" };
                  const label = tab.charAt(0).toUpperCase() + tab.slice(1);
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                        activeTab === tab
                          ? "bg-white text-airbnb-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-airbnb-border-light/20"
                          : "text-airbnb-gray hover:text-airbnb-charcoal"
                      }`}
                    >
                      <span>{icons[tab]}</span>
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-airbnb-border-light/60 text-xs">
              <div>
                <span className="text-airbnb-gray">Signals Tracked:</span>{" "}
                <span className="font-bold text-airbnb-charcoal">{activeCount}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Max Interest:</span>{" "}
                <span className="font-bold text-airbnb-pink">{maxUpvotes} ▲</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Active Trend:</span>{" "}
                <span className="font-bold text-airbnb-charcoal bg-airbnb-bg px-2 py-0.5 rounded">Reasoning & Agents</span>
              </div>
            </div>
          </div>

          {/* Refetch-style Date Grouped Feed */}
          <div className="space-y-6">
            {sortedNews.length === 0 ? (
              <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                No signals found matching &ldquo;{searchTerm}&rdquo; {subCategory !== "all" ? `in ~${subCategory}` : ""}
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
    </div>
  );
}
