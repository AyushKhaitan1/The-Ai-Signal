"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Subheader() {
  const pathname = usePathname();

  const pills = [
    { name: "All Signals", url: "/" },
    { name: "Models", url: "/models" },
    { name: "Tools", url: "/tools" },
    { name: "Research", url: "/research" },
    { name: "Startups", url: "/startups" },
    { name: "Funding", url: "/funding" }
  ];

  return (
    <div className="bg-white border-b border-airbnb-border-light py-3.5 overflow-x-auto no-scrollbar scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-3 min-w-max">
        {pills.map((p) => {
          // Check if active
          const isActive =
            pathname === p.url ||
            (p.url !== "/" && pathname.startsWith(p.url));

          return isActive ? (
            <Link
              key={p.name}
              href={p.url}
              className="bg-airbnb-pink/10 text-airbnb-pink border border-airbnb-pink/20 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-full font-semibold px-4 py-1.5 text-sm"
            >
              {p.name}
            </Link>
          ) : (
            <Link
              key={p.name}
              href={p.url}
              className="bg-white hover:bg-airbnb-bg text-airbnb-gray border border-airbnb-border-light rounded-full font-medium px-4 py-1.5 text-sm transition-all"
            >
              {p.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
