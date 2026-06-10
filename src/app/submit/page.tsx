"use client";

import Link from "next/link";
import { useState } from "react";
import { useSignals } from "@/context/SignalContext";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const { addSignal } = useSignals();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Models");
  const [entity, setEntity] = useState("openai");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      addSignal(title, url, category, entity);
      router.push("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Interactive Glassmorphic Form Card (2/3 width) */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur border border-airbnb-border-light rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-airbnb-charcoal">Submit a New AI Signal</h2>
            <p className="text-xs text-airbnb-gray mt-1">
              Found a new model release, seed round, or breakthrough paper? Add it to the Atlas Intelligence graph.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1">
              <label className="block text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">
                Signal Title / Headline
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. OpenAI releases Advanced Voice Mode coding agent"
                className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-xl px-4 py-3 bg-airbnb-bg/60 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">
                Source URL
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/blog/announcement"
                className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-xl px-4 py-3 bg-airbnb-bg/60 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">
                  Primary Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-xl px-4 py-3 bg-airbnb-bg/60 focus:bg-white focus:outline-none transition-all"
                >
                  <option>Models</option>
                  <option>Tools</option>
                  <option>Research</option>
                  <option>Funding</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">
                  Associated Entity
                </label>
                <select
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                  className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-xl px-4 py-3 bg-airbnb-bg/60 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="cursor">Cursor</option>
                  <option value="perplexity">Perplexity</option>
                  <option value="elevenlabs">ElevenLabs</option>
                  <option value="scale">Scale AI</option>
                  <option value="mistral">Mistral AI</option>
                  <option value="meta">Meta AI</option>
                  <option value="xai">xAI</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">
                Brief Editorial Context (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Provide a quick sentence explaining the significance of this signal..."
                className="w-full text-sm border border-airbnb-border focus:border-airbnb-pink focus:ring-2 focus:ring-airbnb-pink/15 rounded-xl px-4 py-3 bg-airbnb-bg/60 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-airbnb-bg">
              <Link
                href="/"
                className="bg-white border border-airbnb-border text-airbnb-gray hover:bg-airbnb-bg font-bold px-6 py-2.5 rounded-full text-xs transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              >
                Submit Signal
              </button>
            </div>

          </form>
        </div>
        
        {/* Right Side: Submission Guidelines Widget (1/3 width) */}
        <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] space-y-4">
          <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-charcoal border-b border-airbnb-bg pb-2">
            Submission Guidelines
          </h3>
          <ul className="space-y-3 text-xs text-airbnb-gray leading-relaxed">
            <li className="flex items-start">
              <svg className="w-4 h-4 text-airbnb-pink mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>High-Quality Signals only:</strong> We catalog primary announcements, seed/VC funding rounds, and verified model weights. No blog spam or duplicate articles.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-airbnb-pink mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Direct Sources Preferred:</strong> Link directly to original research papers, official company blogs, or SEC filings rather than third-party news rewrites.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-airbnb-pink mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span><strong>Entity Relationship:</strong> Always associate the signal with a profiled startup to preserve knowledge graph linkages.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
