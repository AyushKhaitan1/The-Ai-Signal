"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const logTemplates = [
  { level: "INFO", source: "crawler_node_alpha", message: "Fetching https://arxiv.org/list/cs.AI" },
  { level: "SUCCESS", source: "model_detector", message: "Found new open-weights model: DeepSeek-Coder-V2" },
  { level: "INFO", source: "parser", message: "Successfully extracted metadata for 12 arXiv preprints" },
  { level: "WARN", source: "rate_limiter", message: "Received 429 from HuggingFace, introducing 500ms jitter sleep" },
  { level: "INFO", source: "crawler_node_beta", message: "Monitoring YCombinator Launch Directory" },
  { level: "SUCCESS", source: "ingestor", message: "Ingested startup signal: 'Cursor raises $60M led by a16z'" },
  { level: "INFO", source: "entity_matcher", message: "Mapping 'Claude 3.5 Sonnet' to parent company Anthropic" },
  { level: "ERROR", source: "link_checker", message: "Broken link detected at scale.com/blog/invalid-url-path" },
  { level: "INFO", source: "vector_db", message: "Updating semantic graph indexes: 4 nodes, 8 edges updated" },
  { level: "SUCCESS", source: "sec_crawler", message: "SEC Form 4 filing detected: OpenAI executive equity transactions" },
  { level: "INFO", source: "crawler_node_gamma", message: "Scraping Mistral AI official blog announcements" },
  { level: "WARN", source: "crawler_node_alpha", message: "Connection timeout on arxiv.org, retrying in 3s..." },
  { level: "SUCCESS", source: "model_detector", message: "Extracted Llama 3.1 405B FP8 quantization weights on HuggingFace" },
  { level: "INFO", source: "crawler_node_delta", message: "Checking Pitchbook API endpoints for seed stage updates" },
  { level: "INFO", source: "crawler_node_beta", message: "Monitoring GitHub Trending repositories in 'AI' topic" }
];

interface LogEntry {
  timestamp: string;
  level: string;
  source: string;
  message: string;
  id: number;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [speed, setSpeed] = useState(1000); // ms
  const [urlsScanned, setUrlsScanned] = useState(14821);
  const [signalsFound, setSignalsFound] = useState(384);
  const [errorRate, setErrorRate] = useState(0.8);
  const [activeSpiders, setActiveSpiders] = useState(4);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const consoleContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  // Initialize with some seed logs
  useEffect(() => {
    const seedLogs: LogEntry[] = [];
    const now = new Date();
    for (let i = 8; i > 0; i--) {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const logTime = new Date(now.getTime() - i * 5000);
      counterRef.current += 1;
      seedLogs.push({
        id: counterRef.current,
        timestamp: logTime.toLocaleTimeString(),
        level: template.level,
        source: template.source,
        message: template.message
      });
    }
    setLogs(seedLogs);
  }, []);

  // Streaming effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
      const now = new Date();
      counterRef.current += 1;

      // Update counters dynamically
      setUrlsScanned(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (template.level === "SUCCESS") {
        setSignalsFound(prev => prev + 1);
      }
      if (template.level === "ERROR") {
        setErrorRate(prev => Math.min(5, Math.max(0.1, prev + 0.2)));
      } else {
        setErrorRate(prev => Math.max(0.4, prev - 0.02));
      }

      setLogs(prev => {
        const nextLogs = [...prev, {
          id: counterRef.current,
          timestamp: now.toLocaleTimeString(),
          level: template.level,
          source: template.source,
          message: template.message
        }];
        // Keep last 100 logs
        if (nextLogs.length > 100) nextLogs.shift();
        return nextLogs;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPaused, speed]);

  // Scroll to bottom of the console container on new logs
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    if (filter === "ALL") return true;
    return log.level === filter;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "SUCCESS": return "text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-md text-[10px]";
      case "WARN": return "text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-md text-[10px]";
      case "ERROR": return "text-rose-700 bg-rose-50 border border-rose-200/50 px-2 py-0.5 rounded-md text-[10px]";
      default: return "text-blue-700 bg-blue-50 border border-blue-200/50 px-2 py-0.5 rounded-md text-[10px]";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        
        {/* Header Block */}
        <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-airbnb-charcoal">Ingestion Logs Console</h1>
            </div>
            <p className="text-xs text-airbnb-gray mt-1 max-w-2xl">
              Real-time feed from Atlas Intelligence scraper spiders indexing frontier repositories, research vaults, and venture announcements.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <Link
              href="/"
              className="bg-white border border-airbnb-border text-airbnb-charcoal hover:bg-airbnb-bg font-bold px-4 py-2 rounded-full text-xs transition-all"
            >
              Back to Feed
            </Link>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-airbnb-gray">URLs Scanned</p>
            <p className="text-2xl font-bold text-airbnb-charcoal mt-1 font-mono">{urlsScanned.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-600 mt-1 flex items-center">
              <span>+12.4% vs yesterday</span>
            </p>
          </div>

          <div className="bg-white border border-airbnb-border-light rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-airbnb-gray">Signals Extracted</p>
            <p className="text-2xl font-bold text-airbnb-charcoal mt-1 font-mono">{signalsFound}</p>
            <p className="text-[10px] text-emerald-600 mt-1">
              <span>Accuracy match: 99.4%</span>
            </p>
          </div>

          <div className="bg-white border border-airbnb-border-light rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-airbnb-gray">Active Spiders</p>
            <p className="text-2xl font-bold text-airbnb-charcoal mt-1 font-mono">{activeSpiders} / 4</p>
            <p className="text-[10px] text-airbnb-gray mt-1">
              <span>All nodes online & active</span>
            </p>
          </div>

          <div className="bg-white border border-airbnb-border-light rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <p className="text-[10px] uppercase font-extrabold tracking-widest text-airbnb-gray">System Error Rate</p>
            <p className="text-2xl font-bold text-airbnb-charcoal mt-1 font-mono">{errorRate.toFixed(2)}%</p>
            <p className="text-[10px] text-emerald-600 mt-1">
              <span>Normal operating threshold</span>
            </p>
          </div>
        </div>

        {/* Console Box */}
        <div className="bg-white border border-airbnb-border-light rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
          {/* Console Top Toolbar */}
          <div className="bg-[#F8F9FA] border-b border-airbnb-border-light px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-xs text-airbnb-gray font-mono ml-4">crawler_daemon@atlas:~$</span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs font-mono">
              {/* Filter Tabs */}
              <div className="bg-white border border-airbnb-border-light rounded-lg p-0.5 flex">
                {["ALL", "INFO", "SUCCESS", "WARN", "ERROR"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      filter === f 
                        ? "bg-airbnb-pink text-white" 
                        : "text-airbnb-gray hover:text-airbnb-charcoal hover:bg-airbnb-bg"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Speed Controller */}
              <div className="bg-white border border-airbnb-border-light rounded-lg p-0.5 flex">
                {[
                  { label: "0.5x", val: 2000 },
                  { label: "1.0x", val: 1000 },
                  { label: "2.0x", val: 4000 }
                ].map(s => {
                  let mappedVal = 1000;
                  if (s.label === "0.5x") mappedVal = 1800;
                  if (s.label === "1.0x") mappedVal = 900;
                  if (s.label === "2.0x") mappedVal = 400;

                  return (
                    <button
                      key={s.label}
                      onClick={() => setSpeed(mappedVal)}
                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        speed === mappedVal 
                          ? "bg-airbnb-charcoal text-white" 
                          : "text-airbnb-gray hover:text-airbnb-charcoal"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Pause/Clear Buttons */}
              <button
                onClick={() => setIsPaused(prev => !prev)}
                className={`px-3 py-1.5 rounded-lg border font-bold text-[10px] transition-all flex items-center space-x-1 cursor-pointer ${
                  isPaused 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100" 
                    : "bg-white border-airbnb-border text-airbnb-charcoal hover:bg-airbnb-bg"
                }`}
              >
                {isPaused ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/></svg>
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                    <span>Pause</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setLogs([])}
                className="bg-white border border-airbnb-border text-airbnb-charcoal hover:bg-airbnb-bg px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Console Output Screen */}
          <div ref={consoleContainerRef} className="p-6 h-[480px] overflow-y-auto font-mono text-xs leading-relaxed space-y-2.5 bg-[#FCF9F9] shadow-inner no-scrollbar">
            {filteredLogs.length === 0 ? (
              <div className="text-airbnb-gray h-full flex flex-col items-center justify-center space-y-2">
                <svg className="w-8 h-8 animate-pulse text-airbnb-gray/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <p>Console is silent. Waiting for next crawler cycle...</p>
              </div>
            ) : (
              filteredLogs.map(log => (
                <div key={log.id} className="flex items-center space-x-3 hover:bg-airbnb-bg/40 px-2.5 py-1 rounded transition-all">
                  <span className="text-airbnb-gray/60 select-none text-[10px]">{log.timestamp}</span>
                  <span className={`font-bold shrink-0 min-w-[70px] ${getLevelColor(log.level)}`}>
                    [{log.level}]
                  </span>
                  <span className="text-purple-700 shrink-0 font-semibold text-[11px]">{log.source}:</span>
                  <span className="text-airbnb-charcoal">{log.message}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
