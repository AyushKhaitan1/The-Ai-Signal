"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";
import { useState } from "react";

interface ModelRecord {
  name: string;
  developer: string;
  release: string;
  license: "Open" | "Closed";
  licenseName: string;
  context: string;
  strength: string;
  benchmark: string;
  cost: string;
  baseUpvotes: number;
}

const frontierModels: ModelRecord[] = [
  {
    name: "DeepSeek-R1",
    developer: "DeepSeek",
    release: "Jan 2026",
    license: "Open",
    licenseName: "MIT (Open Weights)",
    context: "128k",
    strength: "Logical Reasoning, Math, Coding",
    benchmark: "97.3% Math / o1-level",
    cost: "Ultra low ($0.55/M tokens)",
    baseUpvotes: 489
  },
  {
    name: "OpenAI o1",
    developer: "OpenAI",
    release: "Sep 2024",
    license: "Closed",
    licenseName: "Proprietary API",
    context: "128k",
    strength: "Chain-of-thought, Hard Sciences",
    benchmark: "First RL reasoning standard",
    cost: "High ($15.00/M tokens)",
    baseUpvotes: 395
  },
  {
    name: "Claude 3.5 Sonnet",
    developer: "Anthropic",
    release: "Oct 2024",
    license: "Closed",
    licenseName: "Proprietary API",
    context: "200k",
    strength: "Multi-file coding, Agentic loops",
    benchmark: "49.0% SWE-bench Leader",
    cost: "Moderate ($3.00/M tokens)",
    baseUpvotes: 367
  },
  {
    name: "Llama 3.3 70B",
    developer: "Meta AI",
    release: "Dec 2024",
    license: "Open",
    licenseName: "Llama 3.3 License",
    context: "128k",
    strength: "Instruction following, Tool calls",
    benchmark: "86.2% MMLU / 70B baseline",
    cost: "Self-hosted / Free",
    baseUpvotes: 215
  },
  {
    name: "Gemini 1.5 Pro",
    developer: "Google DeepMind",
    release: "May 2024",
    license: "Closed",
    licenseName: "Proprietary API",
    context: "2,000k",
    strength: "Massive context, Audio/Video",
    benchmark: "99.8% Needle-in-Haystack recall",
    cost: "Flexible ($7.00/M tokens)",
    baseUpvotes: 184
  }
];

export default function ModelsPage() {
  const { news, searchTerm } = useSignals();
  const [modelType, setModelType] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  const [upvotesState, setUpvotesState] = useState<Record<string, number>>({});
  const [upvotedModels, setUpvotedModels] = useState<Record<string, boolean>>({});

  const handleModelUpvote = (name: string) => {
    if (upvotedModels[name]) return;
    setUpvotesState(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + 1
    }));
    setUpvotedModels(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const getUpvotes = (m: ModelRecord) => {
    return m.baseUpvotes + (upvotesState[m.name] || 0);
  };

  const filteredModels = frontierModels.filter(m => {
    if (modelType === "OPEN") return m.license === "Open";
    if (modelType === "CLOSED") return m.license === "Closed";
    return true;
  });

  const filteredItems = news.filter((item) => {
    if (item.category !== "Models") return false;
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
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Frontier Models & Architectures</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Tracking foundation models, open weights, reinforcement learning loops, and Mixture-of-Experts benchmarks.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-airbnb-bg text-xs">
              <div>
                <span className="text-airbnb-gray">Active Models:</span>{" "}
                <span className="font-bold text-airbnb-charcoal">{activeCount}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Peak Interest:</span>{" "}
                <span className="font-bold text-airbnb-pink">{maxUpvotes}</span>
              </div>
              <div className="h-4 w-px bg-airbnb-border-light"></div>
              <div>
                <span className="text-airbnb-gray">Focus Area:</span>{" "}
                <span className="font-bold text-airbnb-charcoal bg-airbnb-bg px-2 py-0.5 rounded">MoE & Reasoning</span>
              </div>
            </div>
          </div>

          {/* Model Comparison Matrix Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-airbnb-bg">
              <div>
                <h3 className="font-bold text-base text-airbnb-charcoal">Frontier Intelligence Directory</h3>
                <p className="text-xs text-airbnb-gray mt-0.5">Compare parameters, licenses, and core strengths of active models.</p>
              </div>
              
              {/* Tabs */}
              <div className="bg-airbnb-bg border border-airbnb-border-light rounded-lg p-0.5 flex self-start sm:self-center text-xs font-semibold">
                {(["ALL", "OPEN", "CLOSED"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setModelType(tab)}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      modelType === tab 
                        ? "bg-white text-airbnb-charcoal shadow-sm border border-airbnb-border-light font-bold" 
                        : "text-airbnb-gray hover:text-airbnb-charcoal"
                    }`}
                  >
                    {tab === "ALL" ? "All Models" : tab === "OPEN" ? "Open Weights" : "Closed API"}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left text-xs border-collapse min-w-[600px] sm:min-w-0">
                <thead>
                  <tr className="border-b border-airbnb-bg text-airbnb-gray font-bold">
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Model & Author</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Access</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Context</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px]">Benchmark Key</th>
                    <th className="py-2.5 px-4 font-extrabold uppercase tracking-wider text-[10px] text-right">Vote</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-airbnb-bg font-medium text-airbnb-charcoal">
                  {filteredModels.map(m => (
                    <tr key={m.name} className="hover:bg-airbnb-bg/45 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sm text-airbnb-charcoal">{m.name}</div>
                        <div className="text-[10px] text-airbnb-gray font-semibold">{m.developer} • {m.release}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                          m.license === "Open" 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}>
                          {m.licenseName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-600">{m.context}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold">{m.benchmark}</div>
                        <div className="text-[10px] text-airbnb-gray font-normal">{m.strength}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleModelUpvote(m.name)}
                          disabled={upvotedModels[m.name]}
                          className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-lg border transition-all min-w-[48px] h-8 ${
                            upvotedModels[m.name]
                              ? "bg-[#222222] text-white border-[#222222] cursor-default"
                              : "bg-white text-airbnb-charcoal border-[#DDDDDD] hover:bg-airbnb-bg hover:border-airbnb-charcoal cursor-pointer"
                          }`}
                        >
                          <span>{upvotedModels[m.name] ? `+${getUpvotes(m)}` : getUpvotes(m)}</span>
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
              Related Frontier Signals
            </h3>
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                  No model signals found matching &ldquo;{searchTerm}&rdquo;
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
