"use client";

import Link from "next/link";
import { startupsData } from "@/data/startups";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push("/newsletter");
    }
  };

  return (
    <aside className="col-span-1 space-y-8 w-full">
      {/* Trending Startups Widget */}
      <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-airbnb-bg">
          <h3 className="font-bold text-base text-airbnb-charcoal">Trending Startups</h3>
          <Link href="/startups" className="text-xs font-bold text-airbnb-pink hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-2">
          {Object.entries(startupsData).map(([slug, s]) => (
            <Link
              key={slug}
              href={`/startups/${slug}`}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-airbnb-bg transition-all border border-transparent hover:border-airbnb-border-light"
            >
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 rounded shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g dangerouslySetInnerHTML={{ __html: s.logo_grad + s.logo_svg }} />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-airbnb-charcoal">{s.name}</h4>
                  <p className="text-xs text-airbnb-gray">{s.valuation} val</p>
                </div>
              </div>
              <svg className="w-4 h-4 text-airbnb-gray" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
          ))}
        </div>
      </div>

      {/* Crawler Ingest Logs Widget */}
      <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-airbnb-bg">
          <h3 className="font-bold text-base text-airbnb-charcoal">Crawler Signals Ingestion</h3>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <div className="bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[10px] p-4 rounded-xl space-y-1.5 border border-[#333333] shadow-inner h-36 overflow-y-auto">
          <div className="text-[#85C46C]">[INFO] crawler_agent: initialized</div>
          <div className="text-[#D4D4D4]">[INFO] crawling: https://arxiv.org/list/cs.AI</div>
          <div className="text-[#85C46C]">[SUCCESS] found paper: SSM vs Transformers</div>
          <div className="text-[#D4D4D4]">[INFO] classifying: Category -&gt; Research</div>
          <div className="text-[#E5C07B]">[WARN] rate_limit: sleeping for 200ms...</div>
          <div className="text-[#85C46C]">[SUCCESS] ingested: codestral mamba news</div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/logs" className="text-xs font-bold text-airbnb-pink hover:underline">
            Open Live Log Console
          </Link>
        </div>
      </div>

      {/* Weekly newsletter subscription widget */}
      <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <h3 className="font-bold text-base text-airbnb-charcoal mb-2">Weekly Signal Recap</h3>
        <p className="text-xs text-airbnb-gray mb-4">Get the weekly recap of the fastest growing AI startups, valuations, and funding rounds.</p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-1 focus:ring-airbnb-pink rounded-xl px-4 py-3 bg-airbnb-bg focus:outline-none transition-all"
          />
          <button type="submit" className="w-full bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold text-sm py-3 rounded-xl transition-all shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
