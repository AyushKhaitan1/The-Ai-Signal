"use client";

import Link from "next/link";
import { useState } from "react";
import { NewsItem } from "@/data/news";
import { startupsData } from "@/data/startups";
import { useSignals } from "@/context/SignalContext";

interface NewsRowProps {
  item: NewsItem;
  rank: number;
}

export default function NewsRow({ item, rank }: NewsRowProps) {
  const { upvoteSignal } = useSignals();
  const [upvoted, setUpvoted] = useState(false);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!upvoted) {
      upvoteSignal(item.id);
      setUpvoted(true);
    }
  };

  const s = startupsData[item.startup_slug];

  return (
    <div className="flex items-start p-4 bg-white border border-airbnb-border-light rounded-2xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-200">
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
        
        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-airbnb-gray mt-2 font-medium">
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
        </div>
      </div>
    </div>
  );
}
