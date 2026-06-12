"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

import { useState } from "react";

interface PaperRecord {
  title: string;
  authors: string;
  date: string;
  breakthrough: string;
  whyMatters: string;
  technical: string;
  link: string;
  upvotes: number;
}

const papersData: PaperRecord[] = [
  {
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: "DeepSeek AI Team",
    date: "Jan 2026",
    breakthrough: "Group Relative Policy Optimization (GRPO) training showing o1-level reasoning emerging purely from RL without SFT warm-start.",
    whyMatters: "Bypasses costly supervised data collection and critic model memory overhead, making frontier reasoning open-weights.",
    technical: "GRPO replaces standard PPO by sampling a group of answers for each input, using their average reward as the baseline. This eliminates the critic network entirely, saving up to 25% VRAM.",
    link: "https://arxiv.org/abs/2501.12948",
    upvotes: 512
  },
  {
    title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    authors: "Albert Gu, Tri Dao",
    date: "Dec 2023",
    breakthrough: "A new class of state space models utilizing selection mechanisms to scan sequences linearly instead of quadratically.",
    whyMatters: "Breaks the O(N^2) compute bottleneck of standard self-attention, permitting infinite sequence contexts and extreme inference speedups.",
    technical: "Selective Scan computes state transitions dynamically using input-dependent parameters, implemented as a hardware-aware parallel scan on GPU SRAM.",
    link: "https://arxiv.org/abs/2312.00752",
    upvotes: 389
  },
  {
    title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    authors: "Rafael Rafailov et al. (Stanford)",
    date: "May 2023",
    breakthrough: "A mathematical proof that RLHF alignment can be optimized directly via binary cross-entropy loss on preference data.",
    whyMatters: "Avoids training complex reward and critic networks, eliminating the instability of traditional PPO alignment pipelines.",
    technical: "Derives the reward function in closed-form as a ratio of the active policy's likelihood to the reference model's likelihood, optimizing the policy directly.",
    link: "https://arxiv.org/abs/2305.18290",
    upvotes: 342
  }
];

export default function ResearchPage() {
  const { news, searchTerm } = useSignals();
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const [paperVotes, setPaperVotes] = useState<Record<string, number>>({});
  const [votedPapers, setVotedPapers] = useState<Record<string, boolean>>({});

  const handlePaperUpvote = (title: string) => {
    if (votedPapers[title]) return;
    setPaperVotes(prev => ({
      ...prev,
      [title]: (prev[title] || 0) + 1
    }));
    setVotedPapers(prev => ({
      ...prev,
      [title]: true
    }));
  };

  const getVotes = (p: PaperRecord) => {
    return p.upvotes + (paperVotes[p.title] || 0);
  };

  const filteredItems = news.filter((item) => {
    if (item.category !== "Research") return false;
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.startup_name.toLowerCase().includes(term) ||
      item.domain.toLowerCase().includes(term) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(term)))
    );
  });

  const activeCount = filteredItems.length;
  const maxUpvotes = filteredItems.reduce((max, item) => item.upvotes > max ? item.upvotes : max, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Research & AI Safety</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Tracking mathematical preprints, reinforcement learning alignment methodologies, and safety evaluations.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-airbnb-bg text-xs">
              <div>
                <span className="text-airbnb-gray">Active Papers:</span>{" "}
                <span className="font-bold text-airbnb-charcoal">{activeCount}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Peak Interest:</span>{" "}
                <span className="font-bold text-airbnb-pink">{maxUpvotes} ▲</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Focus Area:</span>{" "}
                <span className="font-bold text-airbnb-charcoal bg-airbnb-bg px-2 py-0.5 rounded">RLHF & SSM Alternatives</span>
              </div>
            </div>
          </div>

          {/* Research Vault Widget */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="pb-3 border-b border-airbnb-bg">
              <h3 className="font-bold text-base text-airbnb-charcoal">Breakthrough Paper Vault</h3>
              <p className="text-xs text-airbnb-gray mt-0.5">Click any paper to expand the TL;DR, mathematical context, and industry impact.</p>
            </div>

            <div className="space-y-3">
              {papersData.map(p => {
                const isExpanded = expandedPaper === p.title;
                return (
                  <div 
                    key={p.title}
                    className="border border-airbnb-border-light rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    {/* Collapsed Header Bar */}
                    <div 
                      onClick={() => setExpandedPaper(isExpanded ? null : p.title)}
                      className="p-5 bg-white hover:bg-airbnb-bg/30 cursor-pointer transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] uppercase font-bold text-airbnb-pink bg-airbnb-pink/5 border border-airbnb-pink/10 px-2 py-0.5 rounded">
                            {p.date}
                          </span>
                          <span className="text-[10px] text-airbnb-gray font-semibold">
                            {p.authors}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-airbnb-charcoal hover:text-airbnb-pink transition-colors">
                          {p.title}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePaperUpvote(p.title);
                          }}
                          disabled={votedPapers[p.title]}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                            votedPapers[p.title]
                              ? "bg-airbnb-pink/5 text-airbnb-pink border-airbnb-pink/10 cursor-default"
                              : "bg-white hover:bg-airbnb-bg border-airbnb-border text-airbnb-gray hover:text-airbnb-pink hover:border-airbnb-pink/25"
                          }`}
                        >
                          <span>▲</span>
                          <span>{getVotes(p)}</span>
                        </button>
                        
                        <svg 
                          className={`w-4 h-4 text-airbnb-gray transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                        </svg>
                      </div>
                    </div>

                    {/* Expanding Drawer Content */}
                    {isExpanded && (
                      <div className="p-6 bg-airbnb-bg/40 border-t border-airbnb-border-light space-y-4 text-xs leading-relaxed animate-fadeIn">
                        <div>
                          <span className="block font-bold uppercase tracking-wider text-[9px] text-airbnb-gray mb-1">
                            The Core Breakthrough
                          </span>
                          <p className="text-airbnb-charcoal font-medium">{p.breakthrough}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="block font-bold uppercase tracking-wider text-[9px] text-airbnb-gray mb-1">
                              Why it Matters
                            </span>
                            <p className="text-airbnb-gray">{p.whyMatters}</p>
                          </div>
                          <div>
                            <span className="block font-bold uppercase tracking-wider text-[9px] text-airbnb-gray mb-1">
                              Technical & Mathematical Context
                            </span>
                            <p className="text-zinc-600 font-mono text-[11px] bg-white p-3 rounded-xl border border-airbnb-border-light">
                              {p.technical}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <a 
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-airbnb-bg border border-airbnb-border text-airbnb-charcoal font-bold px-4 py-2 rounded-full text-[10px] transition-all flex items-center space-x-1"
                          >
                            <span>Read ArXiv Preprint</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related Signals Header */}
          <div className="pt-2">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray mb-3 px-1">
              Related Research Signals
            </h3>
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                  No research signals found matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => (
                  <NewsRow key={item.id} item={item} rank={index + 1} />
                ))
              )}
            </div>
          </div>
        </div>

      <Sidebar />

    </div>
  );
}
