"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsItem } from "@/data/news";
import { startupsData } from "@/data/startups";
import { useSignals } from "@/context/SignalContext";

const getTagStyle = (tag: string) => {
  const normalized = tag.toLowerCase();
  if (
    normalized.includes("model") ||
    normalized.includes("reasoning") ||
    normalized.includes("llama") ||
    normalized.includes("agent") ||
    normalized.includes("control") ||
    normalized.includes("tool") ||
    normalized.includes("claude") ||
    normalized.includes("user-submitted")
  ) {
    return "border-airbnb-pink/20 text-airbnb-pink bg-airbnb-pink/5";
  }
  return "border-airbnb-border-light text-airbnb-gray bg-airbnb-bg";
};

interface NewsRowProps {
  item: NewsItem;
  rank: number;
}

export default function NewsRow({ item, rank }: NewsRowProps) {
  const { upvoteSignal } = useSignals();
  const [voteType, setVoteType] = useState<"none" | "up" | "down">("none");
  const [showSummary, setShowSummary] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (voteType === "up") {
      setVoteType("none");
    } else {
      setVoteType("up");
      upvoteSignal(item.id);
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (voteType === "down") {
      setVoteType("none");
    } else {
      setVoteType("down");
    }
  };

  const currentScore = item.upvotes + (voteType === "up" ? 1 : voteType === "down" ? -1 : 0);

  const s = startupsData[item.startup_slug];

  return (
    <div className="flex items-start p-4 hover:bg-[#FFF8F9]/30 transition-all duration-200 border-b border-airbnb-border-light/60 last:border-b-0">
      {/* Rank Number with Up/Down Vote Arrows (no surrounding box) */}
      <div className="flex flex-col items-center justify-center mr-4 select-none shrink-0 w-6 text-center">
        {/* Upvote Arrow */}
        <button
          onClick={handleUpvote}
          className={`transition-colors cursor-pointer p-0.5 flex items-center justify-center rounded hover:bg-airbnb-bg ${
            voteType === "up" ? "text-airbnb-pink scale-110" : "text-airbnb-gray/40 hover:text-airbnb-charcoal"
          }`}
          title="Upvote"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
          </svg>
        </button>

        {/* Rank Number */}
        <span className={`text-[13px] font-extrabold my-0.5 transition-colors ${
          voteType === "up" ? "text-airbnb-pink font-black" : voteType === "down" ? "text-airbnb-charcoal font-black" : "text-airbnb-charcoal/70"
        }`}>
          {rank}
        </span>

        {/* Downvote Arrow */}
        <button
          onClick={handleDownvote}
          className={`transition-colors cursor-pointer p-0.5 flex items-center justify-center rounded hover:bg-airbnb-bg ${
            voteType === "down" ? "text-airbnb-charcoal scale-110" : "text-airbnb-gray/40 hover:text-airbnb-charcoal"
          }`}
          title="Downvote"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Link
            href={`/comments/${item.comments_slug}`}
            className="text-sm sm:text-base font-semibold text-airbnb-charcoal hover:text-airbnb-pink leading-snug"
          >
            {item.title}
          </Link>
          <span className="text-xs text-airbnb-gray/60 font-normal">
            ({item.domain})
          </span>
        </div>

        
        {/* Tags Row */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] border rounded-md px-1.5 py-0.5 font-bold uppercase tracking-wider scale-95 origin-left transition-colors ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-airbnb-gray mt-2.5 font-medium">
          <span className="font-extrabold text-airbnb-charcoal">
            {currentScore} points
          </span>
          <span>•</span>
          {s && (
            <>
              <Link
                href={`/startups/${item.startup_slug}`}
                className="bg-airbnb-pink/5 hover:bg-airbnb-pink/10 text-airbnb-pink px-2.5 py-0.5 rounded-full font-bold border border-airbnb-pink/10 transition-colors flex items-center space-x-1"
              >
                <svg
                  className="w-3.5 h-3.5 rounded shrink-0"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g dangerouslySetInnerHTML={{ __html: s.logo_grad + s.logo_svg }} />
                </svg>
                <span>{item.startup_name}</span>
              </Link>
              <span>•</span>
            </>
          )}
          <span>{item.time}</span>

          <span>•</span>
          <Link
            href={`/comments/${item.comments_slug}`}
            className="hover:text-airbnb-pink flex items-center space-x-1 font-bold"
          >
            <svg
              className="w-3.5 h-3.5 mr-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.684 10.742a3 3 0 005.12 0m-9 5.143V17c0 .414.336.75.75.75h13a.75.75 0 00.75-.75v-1.115c0-2.204-1.786-3.99-3.99-3.99H7.674c-2.204 0-3.99 1.786-3.99 3.99z"
              />
            </svg>
            <span>{item.comments_count} comments</span>
          </Link>
          {item.summary && (
            <>
              <span>•</span>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="hover:text-airbnb-pink flex items-center space-x-1 font-bold cursor-pointer transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5 mr-0.5 text-airbnb-gray/50 hover:text-airbnb-pink"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span>{showSummary ? "Hide Summary ▴" : "Summary ▾"}</span>
              </button>
            </>
          )}
        </div>

        {/* Collapsible summary blurb */}
        {showSummary && item.summary && (
          <div className="mt-3 p-3.5 bg-gradient-to-r from-airbnb-bg to-white border border-airbnb-border-light rounded-xl text-xs text-airbnb-charcoal leading-relaxed animate-fadeIn border-l-2 border-l-airbnb-pink/50 shadow-sm">
            <p className="font-medium text-airbnb-charcoal/90">{item.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
