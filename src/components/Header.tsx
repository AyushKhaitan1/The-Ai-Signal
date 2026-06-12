"use client";

import Link from "next/link";
import { useSignals } from "@/context/SignalContext";
import { useState } from "react";

export default function Header() {
  const { searchTerm, setSearchTerm } = useSignals();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-airbnb-border-light shadow-[0_1px_2px_rgba(0,0,0,0.03)] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 group">
          <svg className="w-8 h-8 mr-2 transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L3 26H9L12.5 19H19.5L23 26H29L16 2ZM13.8 16L16 11L18.2 16H13.8Z" fill="url(#atlasLogoGrad)" />
            <path d="M16 30C23.732 30 30 23.732 30 16" stroke="#FF385C" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <linearGradient id="atlasLogoGrad" x1="3" y1="16" x2="29" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF385C"/>
                <stop offset="1" stopColor="#E31C5F"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="flex items-center space-x-1 select-none">
            <span className="text-lg font-extrabold tracking-tight text-airbnb-charcoal">Atlas</span>
            <span className="text-lg font-extrabold tracking-tight text-airbnb-pink">Intelligence</span>
          </div>
        </Link>

        {/* Center Search */}
        <div className="hidden md:flex items-center flex-grow max-w-lg bg-white border border-airbnb-border rounded-full px-5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups, founders, investors, products, news..."
            className="w-full text-sm font-medium text-airbnb-charcoal placeholder-airbnb-gray bg-transparent focus:outline-none"
          />
          <button className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white p-2 rounded-full transition-colors ml-2 -mr-3 flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4 relative">
          {/* Watchlist */}
          <button className="border border-airbnb-border rounded-xl px-4 py-2 text-xs font-bold text-airbnb-charcoal flex items-center space-x-1.5 hover:bg-airbnb-bg transition-all cursor-pointer">
            <svg className="w-3.5 h-3.5 text-airbnb-gray" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="hidden sm:inline">Watchlist</span>
          </button>
          
          {/* Sign In */}
          <Link href="#signin" className="text-xs font-bold text-airbnb-charcoal px-1 py-2 hover:opacity-85 transition-all">
            Sign in
          </Link>

          {/* Create Account */}
          <Link href="#create-account" className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all">
            Create account
          </Link>
        </div>

      </div>
    </header>
  );
}
