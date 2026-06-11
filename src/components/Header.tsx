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
          <svg className="w-9 h-9 mr-2 transition-transform group-hover:scale-105" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2ZM14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5V22.5C17.5 23.3284 16.8284 24 16 24C15.1716 24 14.5 23.3284 14.5 22.5V9.5ZM10.5 13.5C10.5 12.6716 11.1716 12 12 12C12.8284 12 13.5 12.6716 13.5 13.5V18.5C13.5 19.3284 12.8284 20 12 20C11.1716 20 10.5 19.3284 10.5 18.5V13.5ZM18.5 11.5C18.5 10.6716 19.1716 10 20 10C20.8284 10 21.5 10.6716 21.5 11.5V20.5C21.5 21.3284 20.8284 22 20 22C19.1716 22 18.5 21.3284 18.5 20.5V11.5Z" fill="url(#waveGradLayout)"/>
            <defs>
              <linearGradient id="waveGradLayout" x1="2" y1="16" x2="30" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF385C"/>
                <stop offset="1" stopColor="#E31C5F"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-airbnb-charcoal">orbit-News</span>
            <span className="text-[10px] font-bold text-airbnb-pink uppercase tracking-wider -mt-1">Atlas Intelligence</span>
          </div>
        </Link>

        {/* Center Search */}
        <div className="hidden md:flex items-center flex-grow max-w-lg bg-white border border-airbnb-border rounded-full px-5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search startups, tools, news..."
            className="w-full text-sm font-medium text-airbnb-charcoal placeholder-airbnb-gray bg-transparent focus:outline-none"
          />
          <button className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white p-2 rounded-full transition-colors ml-2 -mr-3 flex items-center justify-center">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center space-x-4 relative">
          <Link href="/submit" className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold px-3.5 sm:px-6 py-2.5 rounded-full text-sm shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center">
            <svg className="w-4 h-4 sm:mr-1.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
            <span className="hidden sm:inline">Submit Link</span>
          </Link>
          
          {/* Airbnb profile pill button */}
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-3 border border-airbnb-border rounded-full p-1.5 sm:p-2 bg-white hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)] cursor-pointer transition-all relative"
          >
            <svg className="w-4 h-4 text-airbnb-charcoal ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
            <div className="w-7 h-7 rounded-full bg-airbnb-pink text-white flex items-center justify-center font-bold text-xs">S</div>
          </div>

          {/* Profile Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-14 bg-white border border-airbnb-border-light rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] w-56 py-2.5 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-airbnb-bg">
                <p className="text-xs text-airbnb-gray">Logged in as</p>
                <p className="text-sm font-bold text-airbnb-charcoal">Sama (Admin)</p>
              </div>
              <Link
                href="/logs"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-xs text-airbnb-charcoal hover:bg-airbnb-bg font-semibold transition-all"
              >
                Developer Crawler Console
              </Link>
              <Link
                href="/newsletter"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 text-xs text-airbnb-charcoal hover:bg-airbnb-bg font-semibold transition-all"
              >
                Weekly Signal Recap
              </Link>
              <div className="border-t border-airbnb-bg my-1"></div>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  alert("Logged out of session.");
                }}
                className="w-full text-left px-4 py-2 text-xs text-rose-500 hover:bg-airbnb-bg font-bold transition-all"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
