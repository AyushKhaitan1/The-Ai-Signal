import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { startupsData } from "@/data/startups";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StartupDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const s = startupsData[slug];

  if (!s) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Profile Details */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Back button */}
          <Link
            href="/startups"
            className="inline-flex items-center space-x-2 text-xs font-bold text-airbnb-gray hover:text-airbnb-pink mb-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
            <span>Back to Startups Directory</span>
          </Link>

          {/* Startup Detail Card */}
          <div className="bg-white border border-airbnb-border-light rounded-2xl p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] space-y-8">
            
            {/* Top Header Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6 border-b border-airbnb-bg">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 text-center sm:text-left">
                <div className="p-3 bg-airbnb-bg border border-airbnb-border-light rounded-2xl shadow-sm shrink-0">
                  <svg className="w-12 h-12 rounded" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs dangerouslySetInnerHTML={{ __html: s.logo_grad }} />
                    <g dangerouslySetInnerHTML={{ __html: s.logo_svg }} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-airbnb-charcoal">{s.name}</h2>
                  <p className="text-xs font-medium text-airbnb-gray mt-1">
                    {s.hq} • Founded {s.founded}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                    <span className="text-[10px] uppercase font-bold bg-airbnb-pink/5 text-airbnb-pink px-2.5 py-0.5 rounded border border-airbnb-pink/10">
                      Valuation: {s.valuation}
                    </span>
                    <span className="text-[10px] uppercase font-bold bg-airbnb-bg text-airbnb-gray px-2.5 py-0.5 rounded border border-airbnb-border-light">
                      Employees: {s.employees}
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={s.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-airbnb-pink hover:bg-airbnb-pink-hover text-white font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
              >
                Visit Website
              </a>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">Overview</h3>
              <p className="text-sm text-airbnb-gray leading-relaxed">{s.description}</p>
            </div>

            {/* Balanced columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              
              {/* Left column (Products, founders, backers) */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">Products</h3>
                  <div className="space-y-2">
                    {s.products.map((p) => (
                      <div key={p.name} className="p-4 bg-airbnb-bg border border-airbnb-border-light rounded-xl space-y-1">
                        <h4 className="text-sm font-bold text-airbnb-charcoal">{p.name}</h4>
                        <p className="text-xs text-airbnb-gray">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">Founders</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.founders.map((f) => (
                      <span
                        key={f}
                        className="bg-airbnb-bg border border-airbnb-border-light text-xs font-semibold px-3 py-1 rounded-full text-airbnb-charcoal"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray">Key Backers</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.investors.map((i) => (
                      <span
                        key={i}
                        className="bg-airbnb-bg border border-airbnb-border-light text-xs font-semibold px-3 py-1 rounded-full text-airbnb-charcoal"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column (Timeline and careers) */}
              <div className="space-y-6">
                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-xl p-5 space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray pb-2 border-b border-airbnb-border-light">
                    Funding Timeline
                  </h3>
                  <div className="space-y-1">
                    {s.rounds.map((r) => (
                      <div key={r.date} className="flex items-start justify-between p-3 border-b border-airbnb-bg last:border-b-0">
                        <div>
                          <span className="text-xs font-bold text-airbnb-charcoal">{r.round}</span>
                          <span className="text-[10px] block text-airbnb-gray">Lead: {r.lead}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-airbnb-pink">{r.amount}</span>
                          <span className="text-[10px] block text-airbnb-gray">{r.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-airbnb-bg/60 border border-airbnb-border-light rounded-xl p-5 space-y-3">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-airbnb-gray pb-2 border-b border-airbnb-border-light">
                    Active Job Openings
                  </h3>
                  <div className="space-y-1">
                    {s.careers.map((c) => (
                      <div key={c.title} className="flex items-center justify-between p-3 border-b border-airbnb-bg last:border-b-0 hover:bg-airbnb-bg/30 transition-colors">
                        <div>
                          <h4 className="text-xs font-bold text-airbnb-charcoal">{c.title}</h4>
                          <p className="text-[10px] text-airbnb-gray">{c.loc}</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {c.sal}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        <Sidebar />

      </div>
    </div>
  );
}
