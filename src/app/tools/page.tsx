"use client";

import Sidebar from "@/components/Sidebar";
import NewsRow from "@/components/NewsRow";
import { useSignals } from "@/context/SignalContext";

import { useState } from "react";

interface ToolRecord {
  name: string;
  developer: string;
  category: "IDEs" | "Frameworks" | "APIs";
  categoryName: string;
  desc: string;
  openSource: boolean;
  keyFeature: string;
  baseInterest: number;
}

const toolStackData: ToolRecord[] = [
  {
    name: "Cursor Editor",
    developer: "Anysphere",
    category: "IDEs",
    categoryName: "Developer IDEs",
    desc: "AI-first code editor with Composer multi-file edit loops and semantic indexing.",
    openSource: false,
    keyFeature: "Multi-file Agentic Apply",
    baseInterest: 389
  },
  {
    name: "Windsurf",
    developer: "Codeium",
    category: "IDEs",
    categoryName: "Developer IDEs",
    desc: "Agentic coding environment integrating active task planning and tool-execution rails.",
    openSource: false,
    keyFeature: "Dynamic Planning Agent",
    baseInterest: 278
  },
  {
    name: "Computer Use API",
    developer: "Anthropic",
    category: "APIs",
    categoryName: "APIs & Runtimes",
    desc: "Developer API giving Claude OS-level keyboard, mouse, and visual click execution.",
    openSource: false,
    keyFeature: "Visual GUI Grounding",
    baseInterest: 312
  },
  {
    name: "LangGraph",
    developer: "LangChain",
    category: "Frameworks",
    categoryName: "Agentic Frameworks",
    desc: "Stateful, multi-actor orchestration framework designed for cyclic agentic flows.",
    openSource: true,
    keyFeature: "Cyclic Graph Routing",
    baseInterest: 245
  },
  {
    name: "vLLM Engine",
    developer: "UC Berkeley Open-Source",
    category: "APIs",
    categoryName: "APIs & Runtimes",
    desc: "High-throughput, memory-efficient LLM serving infrastructure utilizing PagedAttention.",
    openSource: true,
    keyFeature: "PagedAttention KV Caching",
    baseInterest: 219
  },
  {
    name: "CrewAI",
    developer: "CrewAI Inc.",
    category: "Frameworks",
    categoryName: "Agentic Frameworks",
    desc: "Role-playing multi-agent system orchestrator with native memory sharing.",
    openSource: true,
    keyFeature: "Task & Role Delegation",
    baseInterest: 198
  }
];

export default function ToolsPage() {
  const { news, searchTerm } = useSignals();
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | "IDEs" | "Frameworks" | "APIs">("ALL");
  const [interestState, setInterestState] = useState<Record<string, number>>({});
  const [votedTools, setVotedTools] = useState<Record<string, boolean>>({});

  const handleToolVote = (name: string) => {
    if (votedTools[name]) return;
    setInterestState(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + 1
    }));
    setVotedTools(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const getInterest = (t: ToolRecord) => {
    return t.baseInterest + (interestState[t.name] || 0);
  };

  const filteredTools = toolStackData.filter(t => {
    if (selectedCategory === "ALL") return true;
    return t.category === selectedCategory;
  });

  const filteredItems = news.filter((item) => {
    if (item.category !== "Tools") return false;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Agentic Systems & IDEs</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Tracking software development IDEs, visual computer-use interfaces, and autonomous workspace agents.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-airbnb-bg text-xs">
              <div>
                <span className="text-airbnb-gray">Active Systems:</span>{" "}
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
                <span className="font-bold text-airbnb-charcoal bg-airbnb-bg px-2 py-0.5 rounded">Desktop Control & Composer</span>
              </div>
            </div>
          </div>

          {/* Ecosystem Map Widget */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-airbnb-bg">
              <div>
                <h3 className="font-bold text-base text-airbnb-charcoal">AI Tooling Stack Ecosystem</h3>
                <p className="text-xs text-airbnb-gray mt-0.5">Explore the orchestrations, runtimes, and developer canvases.</p>
              </div>
              
              {/* Category Pills */}
              <div className="bg-airbnb-bg border border-airbnb-border-light rounded-lg p-0.5 flex flex-wrap gap-0.5 text-xs font-semibold">
                {[
                  { id: "ALL", label: "All Stacks" },
                  { id: "IDEs", label: "IDEs" },
                  { id: "Frameworks", label: "Frameworks" },
                  { id: "APIs", label: "APIs & Infra" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      selectedCategory === tab.id 
                        ? "bg-white text-airbnb-charcoal shadow-sm border border-airbnb-border-light font-bold" 
                        : "text-airbnb-gray hover:text-airbnb-charcoal"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Tool Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map(t => (
                <div 
                  key={t.name}
                  className="bg-airbnb-bg/30 border border-airbnb-border-light rounded-2xl p-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-airbnb-charcoal">{t.name}</h4>
                        <span className="text-[10px] text-airbnb-gray font-semibold">{t.developer}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1.5">
                        <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                          t.openSource 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                        }`}>
                          {t.openSource ? "Open Source" : "Proprietary"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-airbnb-gray leading-relaxed">{t.desc}</p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-airbnb-bg flex items-center justify-between text-xs">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-airbnb-gray">Key Core Feature</span>
                      <span className="font-bold text-airbnb-charcoal">{t.keyFeature}</span>
                    </div>
                    
                    <button
                      onClick={() => handleToolVote(t.name)}
                      disabled={votedTools[t.name]}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${
                        votedTools[t.name]
                          ? "bg-airbnb-pink/5 text-airbnb-pink border-airbnb-pink/10 cursor-default"
                          : "bg-white hover:bg-airbnb-bg border-airbnb-border text-airbnb-gray hover:text-airbnb-pink hover:border-airbnb-pink/25"
                      }`}
                    >
                      <span>▲</span>
                      <span>{getInterest(t)}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Signals Header */}
          <div className="pt-2">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray mb-3 px-1">
              Related Systems Signals
            </h3>
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 bg-white border border-airbnb-border-light rounded-2xl p-6 text-airbnb-gray">
                  No tool signals found matching &ldquo;{searchTerm}&rdquo;
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
    </div>
  );
}
