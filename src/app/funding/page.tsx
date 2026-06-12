"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

import { useState } from "react";

interface DealRecord {
  startup: string;
  round: string;
  amount: string;
  valuation: string;
  lead: string;
  computeAllied: boolean;
  date: string;
  baseVotes: number;
}

const recentDeals: DealRecord[] = [
  {
    startup: "OpenAI",
    round: "Venture Round",
    amount: "$6.6B",
    valuation: "$157.0B",
    lead: "Thrive Capital",
    computeAllied: true,
    date: "Oct 2024",
    baseVotes: 342
  },
  {
    startup: "xAI",
    round: "Series B / Venture",
    amount: "$6.0B",
    valuation: "$40.0B",
    lead: "Valor Equity / Sequoia",
    computeAllied: true,
    date: "Nov 2024",
    baseVotes: 289
  },
  {
    startup: "Scale AI",
    round: "Series F / Meta Stake",
    amount: "$1.0B",
    valuation: "$29.0B",
    lead: "Meta Platforms / Accel",
    computeAllied: true,
    date: "Jun 2025",
    baseVotes: 265
  },
  {
    startup: "Perplexity",
    round: "Venture Round",
    amount: "$500M",
    valuation: "$9.0B",
    lead: "IVP / Jeff Bezos",
    computeAllied: false,
    date: "Jan 2025",
    baseVotes: 224
  },
  {
    startup: "Mistral AI",
    round: "Venture Round",
    amount: "$640M",
    valuation: "$6.0B",
    lead: "General Catalyst",
    computeAllied: true,
    date: "Jun 2024",
    baseVotes: 187
  },
  {
    startup: "Cursor (Anysphere)",
    round: "Series A",
    amount: "$60M",
    valuation: "$2.5B",
    lead: "a16z",
    computeAllied: false,
    date: "Aug 2024",
    baseVotes: 195
  }
];

export default function FundingPage() {
  const { news, searchTerm } = useSignals();
  const [computeFilter, setComputeFilter] = useState<"ALL" | "COMPUTE" | "CASH">("ALL");
  const [dealVotes, setDealVotes] = useState<Record<string, number>>({});
  const [votedDeals, setVotedDeals] = useState<Record<string, boolean>>({});

  const handleDealVote = (startup: string) => {
    if (votedDeals[startup]) return;
    setDealVotes(prev => ({
      ...prev,
      [startup]: (prev[startup] || 0) + 1
    }));
    setVotedDeals(prev => ({
      ...prev,
      [startup]: true
    }));
  };

  const getVotes = (d: DealRecord) => {
    return d.baseVotes + (dealVotes[d.startup] || 0);
  };

  const filteredDeals = recentDeals.filter(d => {
    if (computeFilter === "COMPUTE") return d.computeAllied;
    if (computeFilter === "CASH") return !d.computeAllied;
    return true;
  });

  const filteredItems = news.filter((item) => {
    const isFunding = 
      item.category === "Funding" ||
      item.title.toLowerCase().includes("raises") ||
      item.title.toLowerCase().includes("secures");
      
    if (!isFunding) return false;

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
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Venture Finance & Capital</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Tracking venture capital financing rounds, seed stage investments, Series A/B/C valuations, and compute allocation deals.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-airbnb-bg text-xs">
              <div>
                <span className="text-airbnb-gray">Active Deals:</span>{" "}
                <span className="font-bold text-airbnb-charcoal">{activeCount}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Peak Interest:</span>{" "}
                <span className="font-bold text-airbnb-pink">{maxUpvotes}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Market Vibe:</span>{" "}
                <span className="font-bold text-airbnb-charcoal bg-airbnb-bg px-2 py-0.5 rounded">High-Multiple Valuations</span>
              </div>
            </div>
          </div>

          {/* Quick Valuation Metrics Ribbon */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-airbnb-border-light rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-[9px] uppercase font-bold text-airbnb-gray">Total VC Tracked</span>
              <span className="text-sm sm:text-base font-extrabold text-airbnb-charcoal mt-0.5 block">$14.76 Billion</span>
            </div>
            <div className="bg-white border border-airbnb-border-light rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-[9px] uppercase font-bold text-airbnb-gray">Avg revenue multiple</span>
              <span className="text-sm sm:text-base font-extrabold text-airbnb-charcoal mt-0.5 block">50x - 80x ARR</span>
            </div>
            <div className="bg-white border border-airbnb-border-light rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-[9px] uppercase font-bold text-airbnb-gray">Compute allied share</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-600 mt-0.5 block">66% of capital</span>
            </div>
          </div>

          {/* VC & Compute Deal Tracker Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-airbnb-bg">
              <div>
                <h3 className="font-bold text-base text-airbnb-charcoal">Capital & Compute Tracker</h3>
                <p className="text-xs text-airbnb-gray mt-0.5">Relational mappings of AI startup valuations and backing alliances.</p>
              </div>

              {/* Toggles */}
              <div className="bg-airbnb-bg border border-airbnb-border-light rounded-lg p-0.5 flex text-xs font-semibold">
                {(["ALL", "COMPUTE", "CASH"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setComputeFilter(tab)}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      computeFilter === tab 
                        ? "bg-white text-airbnb-charcoal shadow-sm border border-airbnb-border-light font-bold" 
                        : "text-airbnb-gray hover:text-airbnb-charcoal"
                    }`}
                  >
                    {tab === "ALL" ? "All Rounds" : tab === "COMPUTE" ? "Compute Allied" : "Pure Cash"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tracker Table */}
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left text-xs border-collapse min-w-[550px] sm:min-w-0">
                <thead>
                  <tr className="border-b border-airbnb-bg text-airbnb-gray font-bold">
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Company & Lead</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Round Details</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Valuation</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Alliance</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px] text-right">Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-airbnb-bg font-medium text-airbnb-charcoal">
                  {filteredDeals.map(d => (
                    <tr key={d.startup} className="hover:bg-airbnb-bg/45 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sm text-airbnb-charcoal">{d.startup}</div>
                        <div className="text-[10px] text-airbnb-gray font-semibold">{d.lead}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-airbnb-pink">{d.amount}</div>
                        <div className="text-[10px] text-airbnb-gray font-normal">{d.round} ({d.date})</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-700">{d.valuation}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${
                          d.computeAllied 
                            ? "bg-amber-50 text-amber-700 border-amber-200" 
                            : "bg-zinc-50 text-zinc-600 border-zinc-200"
                        }`}>
                          {d.computeAllied ? "Compute Allied" : "Pure Capital"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDealVote(d.startup)}
                          disabled={votedDeals[d.startup]}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-lg border transition-all min-w-[48px] h-8 ${
                            votedDeals[d.startup]
                              ? "bg-[#222222] text-white border-[#222222] cursor-default"
                              : "bg-white text-airbnb-charcoal border-[#DDDDDD] hover:bg-airbnb-bg hover:border-airbnb-charcoal cursor-pointer"
                          }`}
                        >
                          <span>{votedDeals[d.startup] ? `+${getVotes(d)}` : getVotes(d)}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Signals Header */}
          <div className="pt-2">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray mb-3 px-1">
              Related Venture Capital Signals
            </h3>
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                  No funding signals found matching &ldquo;{searchTerm}&rdquo;
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
