export default function Footer() {
  return (
    <footer className="bg-white border-t border-airbnb-border-light py-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-airbnb-gray">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="font-semibold text-airbnb-charcoal">© 2026 Atlas Intelligence, Inc.</span>
          <span>•</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>•</span>
          <a href="#" className="hover:underline">Sitemap</a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center cursor-pointer hover:underline">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9M3 9h18M3 15h18"/></svg>
            English (US)
          </span>
          <span className="font-semibold text-airbnb-charcoal">$ USD</span>
        </div>
      </div>
    </footer>
  );
}
