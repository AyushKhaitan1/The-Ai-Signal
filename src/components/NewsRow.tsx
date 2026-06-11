"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsItem } from "@/data/news";
import { startupsData } from "@/data/startups";
import { useSignals } from "@/context/SignalContext";

const getTagStyle = (tag: string) => {
  const normalized = tag.toLowerCase();
  if (normalized.includes("model") || normalized.includes("reasoning") || normalized.includes("llama")) {
    return "border-blue-200 text-blue-700 bg-blue-50/40";
  }
  if (normalized.includes("agent") || normalized.includes("control") || normalized.includes("tool") || normalized.includes("claude")) {
    return "border-purple-200 text-purple-700 bg-purple-50/40";
  }
  if (normalized.includes("funding") || normalized.includes("valuation") || normalized.includes("vc-")) {
    return "border-emerald-200 text-emerald-700 bg-emerald-50/40";
  }
  if (normalized.includes("research") || normalized.includes("arxiv") || normalized.includes("ssm")) {
    return "border-amber-200 text-amber-700 bg-amber-50/40";
  }
  if (normalized.includes("user-submitted")) {
    return "border-airbnb-pink/20 text-airbnb-pink bg-airbnb-pink/5";
  }
  return "border-airbnb-border-light text-airbnb-gray bg-airbnb-bg/50";
};

interface NewsRowProps {
  item: NewsItem;
  rank: number;
}

export default function NewsRow({ item, rank }: NewsRowProps) {
  const { upvoteSignal } = useSignals();
  const [upvoted, setUpvoted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!upvoted) {
      upvoteSignal(item.id);
      setUpvoted(true);
    }
  };

  const s = startupsData[item.startup_slug];

  return (
    <div className="flex items-start p-4 hover:bg-[#FFF8F9]/30 transition-all duration-200 border-b border-airbnb-border-light/60 last:border-b-0">
      {/* Rank */}
      <div className="w-6 text-right pr-2 text-sm font-semibold text-airbnb-gray/40 pt-1">
        {rank}
      </div>

      {/* Upvote Button */}
      <button
        onClick={handleUpvote}
        className={`flex flex-col items-center justify-center px-2 py-1.5 text-xs font-semibold rounded-xl border border-transparent mr-3 shrink-0 transition-all ${
          upvoted
            ? "bg-airbnb-pink/5 text-airbnb-pink border-airbnb-pink/10"
            : "bg-airbnb-bg text-airbnb-gray hover:text-airbnb-pink hover:bg-airbnb-pink/5 hover:border-airbnb-pink/10"
        }`}
      >
        <svg
          className={`w-4 h-4 mb-0.5 ${upvoted ? "fill-airbnb-pink" : "fill-current"}`}
          viewBox="0 0 20 20"
        >
          <path d="M10 3a1 1 0 01.7.3l7 7a1 1 0 01-1.4 1.4L11 6.4V16a1 1 0 11-2 0V6.4L3.7 11.7a1 1 0 01-1.4-1.4l7-7A1 1 0 0110 3z" />
        </svg>
        <span>{item.upvotes}</span>
      </button>

      {/* Content */}
      <div className="flex-grow">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Link
            href={`/comments/${item.comments_slug}`}
            className="text-sm sm:text-base font-semibold text-airbnb-charcoal hover:text-airbnb-pink hover:underline leading-snug"
          >
            {item.title}
          </Link>
          <span className="text-xs text-airbnb-gray/60 font-normal">
            ({item.domain})
          </span>
        </div>

        {/* Techmeme-style Related Links / Clustering */}
        {item.related_links && item.related_links.length > 0 && (
          <div className="mt-1 text-[11px] text-airbnb-gray/80 flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-airbnb-gray/50">Also on:</span>
            {item.related_links.map((link, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-airbnb-pink/80 hover:text-airbnb-pink hover:underline font-bold transition-all"
                >
                  {link.domain}
                </a>
                {idx < item.related_links!.length - 1 && (
                  <span className="text-airbnb-gray/30 font-normal">•</span>
                )}
              </span>
            ))}
          </div>
        )}
        
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
          {s && (
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
          )}
          <span>•</span>
          <span>by {item.author}</span>
          <span>•</span>
          <span>{item.time}</span>
          {item.reading_time && (
            <>
              <span>•</span>
              <span className="flex items-center text-airbnb-gray/80 font-medium">
                <svg
                  className="w-3.5 h-3.5 mr-1 text-airbnb-gray/50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {item.reading_time}
              </span>
            </>
          )}
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
