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

export default function Home() {
  const { news, searchTerm } = useSignals();
  const [activeTab, setActiveTab] = useState<"hot" | "new" | "top" | "active">("hot");

  const filteredNews = news.filter((item) => {
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
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-r from-white via-[#FFF8F9] to-[#FFF0F2] border border-airbnb-border-light border-l-4 border-l-airbnb-pink rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-airbnb-pink/5 rounded-full blur-xl pointer-events-none"></div>

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

            {/* Sorting Tabs */}
            <div className="flex items-center space-x-1.5 mt-4 p-1 bg-airbnb-bg rounded-xl w-fit border border-airbnb-border-light/60">
              <button
                onClick={() => setActiveTab("hot")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === "hot"
                    ? "bg-white text-airbnb-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-airbnb-border-light/20"
                    : "text-airbnb-gray hover:text-airbnb-charcoal"
                }`}
              >
                <span>🔥</span>
                <span>Hot</span>
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === "new"
                    ? "bg-white text-airbnb-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-airbnb-border-light/20"
                    : "text-airbnb-gray hover:text-airbnb-charcoal"
                }`}
              >
                <span>🆕</span>
                <span>New</span>
              </button>
              <button
                onClick={() => setActiveTab("top")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === "top"
                    ? "bg-white text-airbnb-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-airbnb-border-light/20"
                    : "text-airbnb-gray hover:text-airbnb-charcoal"
                }`}
              >
                <span>🏆</span>
                <span>Top</span>
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer ${
                  activeTab === "active"
                    ? "bg-white text-airbnb-charcoal shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-airbnb-border-light/20"
                    : "text-airbnb-gray hover:text-airbnb-charcoal"
                }`}
              >
                <span>💬</span>
                <span>Active</span>
              </button>
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

          <div className="space-y-4">
            {sortedNews.length === 0 ? (
              <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                No signals found matching &ldquo;{searchTerm}&rdquo;
              </div>
            ) : (
              sortedNews.map((item, index) => (
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
