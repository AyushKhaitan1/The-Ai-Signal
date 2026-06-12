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

const renderInfographic = () => {
  const lines = [];
  // 16 horizontal landscape curved lines
  for (let i = 0; i < 16; i++) {
    const yBaseline = 100 + i * 10;
    const amplitude = 30 - i * 1.5;
    
    // Cubic bezier interpolation curves to simulate hills
    const path = `M 0,${yBaseline} C 120,${yBaseline - amplitude * 2.5} 240,${yBaseline + amplitude * 1.5} 480,${yBaseline - amplitude}`;
    lines.push(
      <path
        key={`h-${i}`}
        d={path}
        stroke="currentColor"
        strokeWidth="0.75"
        opacity={0.12 + (i / 35)}
      />
    );
  }

  // 16 vertical cross lines that intersect exactly to form a 3D topographic grid mesh
  for (let j = 0; j <= 16; j++) {
    const x = j * 30; // From 0 to 480
    const pathSegments = [];
    for (let i = 0; i < 16; i++) {
      const yBaseline = 100 + i * 10;
      const amplitude = 30 - i * 1.5;
      
      const t = x / 480;
      const p0 = yBaseline;
      const p1 = yBaseline - amplitude * 2.5;
      const p2 = yBaseline + amplitude * 1.5;
      const p3 = yBaseline - amplitude;
      
      const y = Math.pow(1 - t, 3) * p0 + 
                3 * Math.pow(1 - t, 2) * t * p1 + 
                3 * (1 - t) * Math.pow(t, 2) * p2 + 
                Math.pow(t, 3) * p3;
                
      pathSegments.push(`${i === 0 ? 'M' : 'L'} ${x},${y}`);
    }
    lines.push(
      <path
        key={`v-${j}`}
        d={pathSegments.join(' ')}
        stroke="currentColor"
        strokeWidth="0.5"
        opacity={0.15 + (j / 80)}
      />
    );
  }

  return (
    <svg viewBox="0 0 480 260" className="w-full h-full text-airbnb-pink" fill="none">
      {lines}
    </svg>
  );
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
      {/* Premium Full-Width Hero Banner Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFF5F6] via-[#FFF8F9] to-[#FFF0F2] border border-airbnb-border-light rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Content & Unified Search/Category Box */}
        <div className="z-10 flex-grow max-w-xl space-y-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-airbnb-charcoal leading-tight">
              Discover Every AI Startup, Founder & Investor
            </h1>
            <p className="text-xs md:text-sm text-airbnb-gray mt-1.5 font-medium">
              The most comprehensive AI intelligence platform.
            </p>
          </div>

          {/* Unified Box containing both Category Tabs & Search Bar */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-4 md:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full space-y-4">
            {/* Airbnb-style Category Icon Tabs */}
            <div className="flex items-center space-x-8 pb-3 overflow-x-auto no-scrollbar border-b border-airbnb-border-light select-none">
              {(["all", "models", "tools", "funding", "research"] as const).map((cat) => {
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

            {/* Decoupled Search Box (Smaller & Sleeker) */}
            <div className="max-w-md w-full">
              <div className="bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.03)] border border-airbnb-border/80 py-1.5 px-3 flex items-center transition-all focus-within:border-airbnb-gray/50">
                <span className="text-airbnb-gray/80 pl-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                  placeholder="Search AI companies, founders, investors, products..."
                  className="flex-grow ml-2 text-xs text-airbnb-charcoal placeholder-airbnb-gray bg-transparent focus:outline-none"
                />
                <button className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white rounded-full transition-all flex items-center justify-center shrink-0 cursor-pointer ml-1.5 w-7 h-7">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Infographic (Wireframe Mountain Mesh / Topographic Map) */}
        <div className="hidden md:flex items-center justify-end w-2/5 min-w-[200px] max-w-[340px] select-none pointer-events-none relative overflow-hidden -my-8 -mr-8 self-end">
          <div className="w-full h-full transform translate-y-8 translate-x-4 scale-110">
            {renderInfographic()}
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
