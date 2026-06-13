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
  const [subCategory, setSubCategory] = useState<"all" | "models" | "tools" | "funding" | "research">("all");

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
    <div className="space-y-8">
      {/* Premium Full-Width Hero Banner Card (Height reduced by 50%) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFF5F6] via-[#FFF8F9] to-[#FFF0F2] border border-airbnb-border-light rounded-[24px] p-4 md:py-4 md:px-6 shadow-[0_4px_30px_rgba(0,0,0,0.012)] flex flex-col lg:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Content & Search Section (Tighter vertical spacing) */}
        <div className="z-10 flex-grow max-w-2xl space-y-2.5">
          {/* Sparkles Badge */}
          <div className="flex items-center space-x-1.5 bg-white/80 border border-airbnb-pink/15 px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider text-airbnb-pink w-fit uppercase shadow-sm">
            <svg className="w-2.5 h-2.5 text-airbnb-pink" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L8.188 15.904 3 15 8.188 14.096 9 9l.813 5.096 5.187.904-5.187.904zM19.006 5.006L18.5 8l-.506-2.994L15 4.5l2.994-.506L18.5 1l.506 2.994L22 4.5l-2.994.506z" />
            </svg>
            <span>AI News & Insights</span>
          </div>

          <div className="space-y-0.5">
            <h1 className="text-xl md:text-[23px] font-extrabold tracking-tight text-airbnb-charcoal leading-[1.12]">
              Stay Ahead of the AI Revolution
            </h1>
            <p className="text-[11px] text-airbnb-gray font-medium">
              Real-time AI news, funding updates, and product launches.
            </p>
          </div>

          {/* Search Box - Floating directly on the banner background (Sleeker height) */}
          <div className="bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-airbnb-border/75 py-1.5 px-3 flex items-center transition-all duration-300 hover:border-airbnb-gray/30 focus-within:border-airbnb-pink focus-within:ring-4 focus-within:ring-airbnb-pink/5 w-full max-w-xl">
            <span className="text-airbnb-gray/80 pl-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder="Search AI news, companies, people, topics..."
              className="flex-grow ml-2 text-[11px] text-airbnb-charcoal placeholder-airbnb-gray bg-transparent focus:outline-none"
            />
            <button className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white rounded-full transition-all duration-300 flex items-center justify-center shrink-0 cursor-pointer ml-1 w-6 h-6 shadow-sm">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Category Buttons Row - Floating directly on the banner background (Tighter spacing) */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-0.5 select-none">
            {(["all", "models", "tools", "funding", "research"] as const).map((cat) => {
              const isActive = subCategory === cat;
              
              const categories = {
                all: {
                  label: "AI News",
                  icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  )
                },
                models: {
                  label: "Models",
                  icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  )
                },
                tools: {
                  label: "Tools",
                  icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.5 1.5 0 0019.5 21l2-2a1.5 1.5 0 000-2.25l-5.83-5.83M11.42 15.17l2.42-2.42M11.42 15.17L6 10.25M13.84 12.75l2.42-2.42m-2.42 2.42L18.5 8M10.25 6l4.25 4.25M6 10.25a8.96 8.96 0 00-2.28 5.68 1.5 1.5 0 001.35 1.35 8.96 8.96 0 005.68-2.28L6 10.25z" />
                    </svg>
                  )
                },
                funding: {
                  label: "Funding",
                  icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.22.03a4.5 4.5 0 003.552-1.124A4.502 4.502 0 0022.5 12c0-2.485-2.015-4.5-4.5-4.5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  )
                },
                research: {
                  label: "Research",
                  icon: (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
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
                  className={`flex items-center space-x-1.2 px-2.5 py-1 rounded-xl border transition-all duration-200 cursor-pointer text-[11px] font-semibold ${
                    isActive
                      ? "border-airbnb-pink text-airbnb-pink bg-white shadow-[0_2px_8px_rgba(255,56,92,0.05)] ring-1 ring-airbnb-pink/10"
                      : "border-airbnb-border-light/70 text-airbnb-charcoal hover:border-airbnb-pink/40 hover:text-airbnb-pink hover:shadow-[0_2px_6px_rgba(0,0,0,0.012)] bg-white"
                  }`}
                >
                  <span className={isActive ? "text-airbnb-pink" : "text-airbnb-gray"}>
                    {current.icon}
                  </span>
                  <span>{current.label}</span>
                </button>
              );
            })}
          </div>

          {/* Trending now Row - Floating directly on the banner background (Tighter horizontal & vertical padding) */}
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            <span className="text-[9.5px] font-bold text-airbnb-gray uppercase tracking-wider mr-0.5">Trending now:</span>
            {[
              { label: "GPT-4o", term: "gpt-4o" },
              { label: "Claude 3.5", term: "claude 3.5" },
              { label: "OpenAI", term: "openai" },
              { label: "AI Agents", term: "agents" },
              { label: "Databricks", term: "databricks" }
            ].map((tag) => (
              <button
                key={tag.label}
                onClick={() => setLocalSearchTerm(tag.term)}
                className="bg-white border border-airbnb-border-light hover:border-airbnb-pink/40 hover:text-airbnb-pink hover:shadow-[0_2px_6px_rgba(0,0,0,0.012)] px-2 py-0.5 rounded-full text-[9.5px] font-bold text-airbnb-charcoal flex items-center space-x-1 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
              >
                <span className="w-1 h-1 rounded-full bg-airbnb-pink" />
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: AI Signal Sphere & Floating Cards (Overlayed - Compact Height to completely avoid overlaps) */}
        <div className="hidden lg:flex items-center justify-center w-[45%] min-w-[340px] max-w-[440px] relative h-[130px] select-none self-center">
          {/* Sphere SVG backdrop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-70">
            <svg viewBox="0 0 300 300" className="w-full h-full text-airbnb-pink/20" fill="none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="150" cy="150" r="120" strokeWidth="0.5" strokeDasharray="2 4" />
              <ellipse cx="150" cy="150" rx="120" ry="40" />
              <ellipse cx="150" cy="150" rx="40" ry="120" />
              <ellipse cx="150" cy="150" rx="120" ry="80" strokeWidth="0.5" strokeDasharray="2 2" />
              <ellipse cx="150" cy="150" rx="80" ry="120" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="30" y1="150" x2="270" y2="150" />
              <line x1="150" y1="30" x2="150" y2="270" />
              
              <circle cx="150" cy="150" r="140" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
              
              <circle cx="60" cy="80" r="3" fill="#FF385C" opacity="0.6" />
              <circle cx="240" cy="90" r="4" fill="#FF385C" opacity="0.8" />
              <circle cx="270" cy="180" r="3" fill="#FF385C" opacity="0.5" />
              <circle cx="100" cy="240" r="3" fill="#FF385C" opacity="0.6" />
            </svg>
          </div>

          {/* Floating Card 1: OpenAI raises $6.5B (Top Right) */}
          <div className="absolute top-[0px] right-[0px] bg-white rounded-xl p-1.5 px-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-airbnb-border-light/60 flex items-center space-x-2 w-[150px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
            <div className="p-1 bg-red-50 text-airbnb-pink rounded-lg flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.75A1.125 1.125 0 0110.125 16.5h3.75a1.125 1.125 0 011.125 1.125V21" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-[9px] font-bold text-airbnb-charcoal leading-tight truncate">OpenAI raises $6.5B</h4>
              <span className="text-[7.5px] text-airbnb-gray font-medium block mt-0.5">2h ago</span>
            </div>
          </div>

          {/* Floating Card 2: Anthropic launches Claude 3.5 (Middle Left - Positioned further left and staggered) */}
          <div className="absolute top-[45px] left-[-15px] bg-white rounded-xl p-1.5 px-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-airbnb-border-light/60 flex items-center space-x-2 w-[150px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
            <div className="p-1 bg-orange-50 text-airbnb-pink rounded-lg flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-1.5a4.5 4.5 0 003.25-7.66l-.11-.12A7.37 7.37 0 0016.5 6.75h-1.5a5.85 5.85 0 01-3.25 1.62l-.11.13a4.47 4.47 0 00-1.14 3.75 4.5 4.5 0 003.75-1.14l.13-.11A5.85 5.85 0 0115.75 6h-1.5A7.38 7.38 0 006.75 16.5v1.5a6 6 0 017.38-5.84l.24-.29zM2.25 21.75a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-3 3a.75.75 0 000 1.06z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-[9px] font-bold text-[#222222] leading-tight truncate">Anthropic Claude 3.5</h4>
              <span className="text-[7.5px] text-airbnb-gray font-medium block mt-0.5">4h ago</span>
            </div>
          </div>

          {/* Floating Card 3: AI funding hits record high (Bottom Right - Staggered to ensure zero overlap) */}
          <div className="absolute bottom-[0px] right-[0px] bg-white rounded-xl p-1.5 px-2 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-airbnb-border-light/60 flex items-center space-x-2 w-[150px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
            <div className="p-1 bg-rose-50 text-airbnb-pink rounded-lg flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="text-[9px] font-bold text-airbnb-charcoal leading-tight truncate">AI funding hits record</h4>
              <span className="text-[7.5px] text-airbnb-gray font-medium block mt-0.5">6h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout containing Main Feed and Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Real-Time News Feed */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Section title with live pulse indicator */}
          <div className="flex items-center space-x-2.5 pb-3 border-b border-airbnb-border-light">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-airbnb-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-airbnb-pink"></span>
            </span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-airbnb-charcoal">
              Real-Time News Feed
            </h2>
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
    </div>
  );
}
