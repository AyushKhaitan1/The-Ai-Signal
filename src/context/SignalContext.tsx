"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { newsItems as initialNewsItems, NewsItem, Comment } from "@/data/news";

interface SignalContextType {
  news: NewsItem[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  upvoteSignal: (id: number) => void;
  addSignal: (title: string, url: string, category: string, startupSlug: string) => void;
  addComment: (slug: string, username: string, commentText: string) => void;
}

const SignalContext = createContext<SignalContextType | undefined>(undefined);

export function SignalProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load initial data
  useEffect(() => {
    const saved = localStorage.getItem("atlas_signals_news");
    if (saved) {
      try {
        setNews(JSON.parse(saved));
      } catch (e) {
        setNews(initialNewsItems);
      }
    } else {
      setNews(initialNewsItems);
    }
  }, []);

  // Persist data helper
  const saveNews = (updated: NewsItem[]) => {
    setNews(updated);
    localStorage.setItem("atlas_signals_news", JSON.stringify(updated));
  };

  const upvoteSignal = (id: number) => {
    const updated = news.map((item) => {
      if (item.id === id) {
        // Simple client-side toggle or increment
        return { ...item, upvotes: item.upvotes + 1 };
      }
      return item;
    });
    saveNews(updated);
  };

  const addSignal = (title: string, url: string, category: string, startupSlug: string) => {
    let domain = "link";
    try {
      domain = new URL(url).hostname;
    } catch (_) {}

    // Find startup name
    let startupName = "Other";
    if (startupSlug === "openai") startupName = "OpenAI";
    else if (startupSlug === "anthropic") startupName = "Anthropic";
    else if (startupSlug === "cursor") startupName = "Cursor";
    else if (startupSlug === "perplexity") startupName = "Perplexity";
    else if (startupSlug === "elevenlabs") startupName = "ElevenLabs";
    else if (startupSlug === "scale") startupName = "Scale AI";
    else if (startupSlug === "mistral") startupName = "Mistral AI";
    else if (startupSlug === "meta") startupName = "Meta AI";
    else if (startupSlug === "xai") startupName = "xAI";
    else if (startupSlug === "deepseek") startupName = "DeepSeek";

    const newSignal: NewsItem = {
      id: Date.now(),
      title,
      url,
      domain,
      category,
      tags: ["User-Submitted"],
      comments_slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      startup_slug: startupSlug,
      startup_name: startupName,
      upvotes: 1,
      author: "you",
      time: "Just now",
      comments_count: 0,
      comments: [],
      reading_time: "1 min read",
      related_links: []
    };

    saveNews([newSignal, ...news]);
  };

  const addComment = (slug: string, username: string, commentText: string) => {
    const newComment: Comment = {
      user: username || "anonymous",
      points: 1,
      time: "Just now",
      text: commentText,
      replies: []
    };

    const updated = news.map((item) => {
      if (item.comments_slug === slug) {
        return {
          ...item,
          comments_count: item.comments_count + 1,
          comments: [...item.comments, newComment]
        };
      }
      return item;
    });
    saveNews(updated);
  };

  return (
    <SignalContext.Provider
      value={{
        news,
        searchTerm,
        setSearchTerm,
        upvoteSignal,
        addSignal,
        addComment
      }}
    >
      {children}
    </SignalContext.Provider>
  );
}

export function useSignals() {
  const context = useContext(SignalContext);
  if (!context) {
    throw new Error("useSignals must be used within a SignalProvider");
  }
  return context;
}
