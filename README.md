# 📡 The AI Signal — Atlas Intelligence

A premium, highly interactive intelligence dashboard cataloging foundational model releases, venture funding rounds, and cognitive developer tools in the global AI ecosystem. 

This portal is styled with strict **Airbnb design tokens** and built on a production-ready stack: **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

---

## ✨ Key Features

* **🛡️ Locked Layout (Zero Shifting)**: Viewport-optimized shell with an identically structured Header navbar, category Subheader navigation, and dynamic sticky Footer.
* **🗳️ Interactive Client-Side Upvotes**: Click-to-upvote mechanics highlight signals in the signature Airbnb coral-pink (`#FF385C`), persisting values on reload via `localStorage`.
* **🔍 Live Global Search**: Fully integrated search capsule in the header that filters category feeds dynamically by company name, category, title, or domain.
* **📥 Signal Link Submission**: Interactive glassmorphic form for submitting new AI signals. Auto-calculates domains and prepends them to the home feed in real-time.
* **💬 Recursive Comment Discussions**: Detailed `/comments/[slug]` route with nested reply trees allowing comment submissions.
* **🎮 Crawler Ingestion Console**: Monospace scraper console simulation running in an optimized React frame with custom controllers (Pause/Resume, Clear, Speed multi-pliers, and Severity Filter Tabs).
* **✉️ Weekly Newsletter**: Curation issue page featuring startup spotlights, funding timelines, job listings, and an interactive email subscription widget.

---

## 🛠️ Technology Stack

* **Core Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Fonts**: Google Fonts (`Outfit`, `Inter`, `Playfair Display`)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the development compiler (with Turbopack):
```bash
npm run dev
# or
npx next dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the portal.

### 3. Build for Production
Verify typescript compilation, optimization checks, and generate static site pages:
```bash
npm run build
```

---

## 📂 Project Architecture

```bash
├── public/                 # Static assets & icons
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── comments/       # Dynamic Comment/Discussion threads
│   │   ├── funding/        # Funding category feed
│   │   ├── logs/           # Monospace Ingestion Console
│   │   ├── models/         # Foundational Models category feed
│   │   ├── newsletter/     # Curation Recaps issue view
│   │   ├── research/       # Research papers category feed
│   │   ├── startups/       # Startups directory & dynamic profiles
│   │   ├── submit/         # Glassmorphic Link Submission Form
│   │   ├── tools/          # Developer Tools category feed
│   │   ├── globals.css     # Tailwind directive imports & theme variables
│   │   └── layout.tsx      # Global wrapper containing shell structure
│   ├── components/         # Shared UI elements
│   │   ├── Header.tsx      # Locked top header & global search capsule
│   │   ├── Subheader.tsx   # Horizontal scroll category pills
│   │   ├── Sidebar.tsx     # Widget boxes (Trending, Scraper log stream, Curation)
│   │   ├── NewsRow.tsx     # Standard news signal row with upvote hooks
│   │   └── Footer.tsx      # Dynamic page-bottom layout
│   ├── context/
│   │   └── SignalContext.tsx # Client-side state manager (upvotes, search, comments)
│   └── data/               # Static dataset schemas
│       ├── news.ts         # Pre-seeded news records
│       └── startups.ts     # Pre-seeded startup profiles
```
