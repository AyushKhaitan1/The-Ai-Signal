"use client";

import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { startupsData } from "@/data/startups";

export default function StartupsDirectoryPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Startups Grid */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <h1 className="text-xl font-bold tracking-tight text-airbnb-charcoal">Profiled AI Startups Directory</h1>
            <p className="text-xs text-airbnb-gray mt-1">
              Explore the relational cap tables, products, career paths, and live signals of top companies in the AI ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(startupsData).map(([slug, s]) => (
              <div
                key={slug}
                className="bg-white border border-airbnb-border-light rounded-2xl p-6 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-airbnb-bg rounded-xl border border-airbnb-border-light">
                      <svg className="w-6 h-6 rounded" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs dangerouslySetInnerHTML={{ __html: s.logo_grad }} />
                        <g dangerouslySetInnerHTML={{ __html: s.logo_svg }} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-airbnb-charcoal">{s.name}</h3>
                      <p className="text-xs text-airbnb-gray">{s.hq}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-airbnb-gray line-clamp-2">{s.description}</p>
                  
                  {/* Metrics Table */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-airbnb-bg text-center">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-airbnb-gray">Valuation</span>
                      <span className="text-xs font-bold text-airbnb-charcoal">{s.valuation}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-airbnb-gray">Total Raised</span>
                      <span className="text-xs font-bold text-airbnb-charcoal">{s.total_funding}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-airbnb-gray">Employees</span>
                      <span className="text-xs font-bold text-airbnb-charcoal">{s.employees}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-airbnb-pink bg-airbnb-pink/5 px-2.5 py-1 rounded border border-airbnb-pink/10">
                    Founded {s.founded}
                  </span>
                  <Link
                    href={`/startups/${slug}`}
                    className="text-xs font-bold text-airbnb-pink hover:text-airbnb-pink-hover transition-colors flex items-center space-x-1"
                  >
                    <span>View Profile</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      <Sidebar />

    </div>
  );
}
