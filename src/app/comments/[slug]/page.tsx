"use client";

import { use, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useSignals } from "@/context/SignalContext";
import { startupsData } from "@/data/startups";
import { Comment } from "@/data/news";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CommentsPage({ params }: PageProps) {
  const { slug } = use(params);
  const { news, addComment, upvoteSignal } = useSignals();

  const item = news.find(x => x.comments_slug === slug);
  const [commentText, setCommentText] = useState("");
  const [upvoted, setUpvoted] = useState(false);

  if (!item) {
    notFound();
  }

  const s = startupsData[item.startup_slug];

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!upvoted) {
      upvoteSignal(item.id);
      setUpvoted(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(slug, "you", commentText.trim());
      setCommentText("");
    }
  };

  // Helper to render nested comments recursively
  const renderComments = (commentsList: Comment[]) => {
    return commentsList.map((c, index) => {
      return (
        <div key={index} className="space-y-4">
          <div className="p-4 bg-white border border-airbnb-border-light rounded-2xl">
            <div className="flex items-start space-x-3">
              <button className="text-[10px] font-bold text-airbnb-gray hover:text-airbnb-charcoal transition-colors border border-airbnb-border rounded-md px-1.5 py-0.5 bg-white hover:bg-airbnb-bg cursor-pointer">
                +1
              </button>
              <div className="flex-grow">
                <div className="flex items-center space-x-1.5 text-xs text-airbnb-gray font-semibold mb-1.5">
                  <span className="text-airbnb-charcoal font-bold">{c.user}</span>
                  <span>•</span>
                  <span>{c.points} points</span>
                  <span>•</span>
                  <span>{c.time}</span>
                </div>
                <p className="text-sm text-airbnb-charcoal leading-relaxed">{c.text}</p>
                
                {/* Nested Replies */}
                {c.replies && c.replies.length > 0 && (
                  <div className="space-y-3 mt-3 pl-4 border-l-2 border-airbnb-bg">
                    {c.replies.map((r, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-3 p-3 bg-airbnb-bg border border-airbnb-border-light rounded-xl">
                        <button className="text-[10px] font-bold text-airbnb-gray hover:text-airbnb-charcoal transition-colors border border-airbnb-border rounded-md px-1.5 py-0.5 bg-white hover:bg-airbnb-bg cursor-pointer">
                          +1
                        </button>
                        <div>
                          <div className="flex items-center space-x-1.5 text-[10px] sm:text-xs text-airbnb-gray font-semibold mb-1">
                            <span className="text-airbnb-charcoal font-bold">{r.user}</span>
                            <span>•</span>
                            <span>{r.points} points</span>
                            <span>•</span>
                            <span>{r.time}</span>
                          </div>
                          <p className="text-xs text-airbnb-gray leading-relaxed">{r.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Discussion & Post */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-airbnb-gray hover:text-airbnb-pink mb-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            <span>Back to All Signals</span>
          </Link>

          {/* Post Detail Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex items-start">
              <button
                onClick={handleUpvote}
                className={`flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-lg border mr-3 shrink-0 transition-all cursor-pointer min-w-[48px] h-8 ${
                  upvoted
                    ? "bg-[#222222] text-white border-[#222222]"
                    : "bg-white text-airbnb-charcoal border-[#DDDDDD] hover:bg-airbnb-bg hover:border-airbnb-charcoal"
                }`}
              >
                <span>{upvoted ? `+${item.upvotes}` : item.upvotes}</span>
              </button>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-airbnb-charcoal leading-snug">
                  {item.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2 mt-2 text-xs text-airbnb-gray">
                  <span className="font-bold text-airbnb-charcoal">{item.domain}</span>
                  {s && (
                    <>
                      <span>•</span>
                      <Link href={`/startups/${item.startup_slug}`} className="font-bold text-airbnb-pink">
                        {item.startup_name}
                      </Link>
                    </>
                  )}
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="pt-4 border-t border-airbnb-bg space-y-3">
              <textarea
                rows={3}
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts on this AI signal?"
                className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-1 focus:ring-airbnb-pink rounded-xl px-4 py-3 bg-airbnb-bg focus:outline-none transition-all"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold px-5 py-2 rounded-xl text-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                >
                  Add Comment
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray mb-2">
              {item.comments_count} Discussion Comments
            </h3>
            {renderComments(item.comments)}
          </div>

        </div>

      <Sidebar />

    </div>
  );
}
