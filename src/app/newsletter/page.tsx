"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-8">
        
        {/* Back Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-airbnb-gray hover:text-airbnb-charcoal transition-all group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            <span>Back to Signals Feed</span>
          </Link>
        </div>

        {/* Curation Issue Card */}
        <article className="bg-white border border-airbnb-border rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          
          {/* Cover Header */}
          <div className="bg-gradient-to-br from-[#1F1F22] to-[#2E2E33] text-white p-8 sm:p-12 text-center space-y-4 relative overflow-hidden">
            {/* Subtle light effect */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-airbnb-pink/10 blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
            
            <p className="text-[10px] tracking-widest uppercase font-extrabold text-airbnb-pink">Issue #042 — June 2026</p>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
              The Weekly Signal
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg mx-auto">
              A premium, editorial summary of foundational model breakthroughs, venture financing, and state-of-the-art developer tools.
            </p>
            
            <div className="pt-2 flex items-center justify-center space-x-4 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
              <span>By Sama & The orbit-News Team</span>
              <span>•</span>
              <span>7 min read</span>
            </div>
          </div>

          {/* Curation Body */}
          <div className="p-8 sm:p-12 space-y-10 text-airbnb-charcoal text-sm leading-relaxed font-sans">
            
            {/* Executive Brief */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold border-b border-airbnb-border-light pb-2 text-airbnb-charcoal">
                I. The Executive Brief
              </h2>
              <p className="text-zinc-700 italic">
                &ldquo;This week marked a massive step forward in the commoditization of open-weight intelligence and the rise of voice-first interfaces. As Meta drops a 405B parameter titan, the boundaries of server architecture are tested, while application-layer funding reaches new peaks.&rdquo;
              </p>
              <p className="text-zinc-600">
                The developer ecosystem is consolidating around three key rails: extremely fast, low-latency reasoning APIs; local stateful workspaces like Cursor; and audio-native pairing engines. The capital influx into Scale AI ($1B) indicates that proprietary, high-fidelity alignment data remains the most valuable commodity in the value chain.
              </p>
            </section>

            {/* Foundational Frontiers */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold border-b border-airbnb-border-light pb-2 text-airbnb-charcoal">
                II. Foundational Frontiers
              </h2>
              <div className="space-y-4">
                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Llama 3.1 405B Released</h3>
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full">Models</span>
                  </div>
                  <p className="text-xs text-airbnb-gray">
                    Meta AI&apos;s flagship open-weights release marks a new epoch for locally-hosted enterprise agents. The model matches Claude 3.5 Sonnet and GPT-4o on reasoning benchmarks but poses substantial infrastructure challenges, requiring multi-node GPU clusters for inference.
                  </p>
                </div>

                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Claude 3.5 Sonnet Sets standard</h3>
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2.5 py-0.5 rounded-full">Models</span>
                  </div>
                  <p className="text-xs text-airbnb-gray">
                    Anthropic&apos;s middle-tier model has quietly secured developer dominance. With its visual artifact canvas and vastly superior multi-file reasoning, it has become the standard model for automated codebase edits.
                  </p>
                </div>
              </div>
            </section>

            {/* Venture Vectors */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold border-b border-airbnb-border-light pb-2 text-airbnb-charcoal">
                III. Venture Vectors & Funding
              </h2>
              <div className="space-y-4">
                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Scale AI raises $1B Series F</h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full">Funding</span>
                  </div>
                  <p className="text-xs text-airbnb-gray">
                    Led by Accel at a $13.8B valuation. Scale is solidifying its position as the baseline compiler for frontier models, providing human RLHF evaluation datasets and synthetic labeling pipelines for LLMs, robotics, and autonomy.
                  </p>
                </div>

                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-2xl p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Cursor raises $60M Series A</h3>
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full">Funding</span>
                  </div>
                  <p className="text-xs text-airbnb-gray">
                    Led by Andreessen Horowitz. Cursor has achieved unprecedented product-market fit among professional engineers, replacing vanilla VS Code for hundreds of thousands of developers globally within months.
                  </p>
                </div>
              </div>
            </section>

            {/* In-Depth Spotlight */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold border-b border-airbnb-border-light pb-2 text-airbnb-charcoal">
                IV. Architectural Spotlight: State Space Models
              </h2>
              <p className="text-zinc-600">
                While transformers continue to dominate raw benchmark scores, the quadratic attention complexity is driving research into alternative architectures. This week, we analyzed the performance of State Space Models (SSMs) like Mamba.
              </p>
              <p className="text-zinc-600">
                By maintaining linear scaling properties with sequence length, SSMs show immense promise for parsing book-length contexts, long log streams, and complex repository structures. The primary challenge remains hardware-specific optimization on NVIDIA kernels, but the gaps are closing fast.
              </p>
            </section>

          </div>

          {/* Subscriptions Widget Bottom Card */}
          <div className="bg-airbnb-bg border-t border-airbnb-border p-8 sm:p-12 text-center space-y-6">
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-bold text-airbnb-charcoal">Get The Weekly Signal in your Inbox</h3>
              <p className="text-xs text-airbnb-gray">
                Join 45,000+ AI researchers, venture partners, and engineering leads receiving our Sunday morning briefing.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {subscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-xs font-semibold animate-fadeIn flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Thank you! You are now subscribed to the Sunday briefing.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="flex-grow text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-full px-5 py-3 bg-white focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold text-xs px-6 py-3.5 rounded-full transition-all shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
            
            <p className="text-[10px] text-airbnb-gray/60">
              No spam. Unsubscribe anytime. Read our privacy parameters on the Atlas Intelligence trust page.
            </p>
          </div>

        </article>

      </div>
    </div>
  );
}
