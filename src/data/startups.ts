export interface Product {
  name: string;
  desc: string;
}

export interface Career {
  title: string;
  loc: string;
  sal: string;
}

export interface FundingRound {
  round: string;
  amount: string;
  date: string;
  lead: string;
}

export interface Startup {
  name: string;
  slug: string;
  logo_svg: string;
  logo_grad: string;
  valuation: string;
  total_funding: string;
  hq: string;
  founded: string;
  employees: string;
  description: string;
  founders: string[];
  investors: string[];
  products: Product[];
  careers: Career[];
  rounds: FundingRound[];
}

export const startupsData: Record<string, Startup> = {
  openai: {
    name: "OpenAI",
    slug: "openai",
    logo_svg: '<circle cx="16" cy="16" r="10" fill="url(#opGrad)"/><path d="M16 11v10M11 16h10" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="opGrad"><stop stop-color="#10a37f"/><stop offset="1" stop-color="#0e8a6b"/></linearGradient>',
    valuation: "$80.0 Billion",
    total_funding: "$13.0 Billion",
    hq: "San Francisco, CA",
    founded: "2015",
    employees: "1,200+",
    description: "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
    founders: ["Sam Altman", "Greg Brockman", "Ilya Sutskever"],
    investors: ["Microsoft", "Thrive Capital", "Khosla Ventures", "Sequoia Capital"],
    products: [
      { name: "ChatGPT", desc: "Conversational AI assistant powered by GPT-4o." },
      { name: "GPT-4o API", desc: "Developer access to cutting-edge intelligence models." },
      { name: "Sora", desc: "Generative text-to-video foundation model." }
    ],
    careers: [
      { title: "Research Scientist - Reinforcement Learning", loc: "San Francisco", sal: "$250k - $450k" },
      { title: "Member of Technical Staff - Voice Engine", loc: "San Francisco", sal: "$220k - $400k" },
      { title: "Software Engineer - Developer Platform", loc: "San Francisco", sal: "$180k - $320k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$10.0B", date: "Jan 2023", lead: "Microsoft" },
      { round: "Secondary Market", amount: "$490M", date: "Apr 2023", lead: "Thrive Capital" },
      { round: "Venture Round", amount: "$1.0B", date: "Jul 2019", lead: "Microsoft" }
    ]
  },
  anthropic: {
    name: "Anthropic",
    slug: "anthropic",
    logo_svg: '<polygon points="16,6 26,24 6,24" fill="url(#antGrad)"/><circle cx="16" cy="16" r="4" fill="white"/>',
    logo_grad: '<linearGradient id="antGrad"><stop stop-color="#CC9966"/><stop offset="1" stop-color="#996633"/></linearGradient>',
    valuation: "$18.0 Billion",
    total_funding: "$7.3 Billion",
    hq: "San Francisco, CA",
    founded: "2021",
    employees: "500+",
    description: "Anthropic is an AI safety and research company that builds reliable, beneficial, and controllable AI systems, starting with Claude.",
    founders: ["Dario Amodei", "Daniela Amodei", "Jared Kaplan"],
    investors: ["Google", "Amazon", "Spark Capital", "Index Ventures"],
    products: [
      { name: "Claude 3.5 Sonnet", desc: "State-of-the-art conversational LLM." },
      { name: "Claude API", desc: "High-speed developer access to Claude models." },
      { name: "Artifacts", desc: "Interactive canvas for co-creating code and documents." }
    ],
    careers: [
      { title: "AI Safety Researcher", loc: "San Francisco", sal: "$230k - $420k" },
      { title: "Frontend Engineer - Claude Core", loc: "San Francisco", sal: "$190k - $350k" },
      { title: "Security Engineer - Infrastructure", loc: "San Francisco", sal: "$200k - $360k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$2.0B", date: "Oct 2023", lead: "Google" },
      { round: "Venture Round", amount: "$1.25B", date: "Sep 2023", lead: "Amazon" },
      { round: "Series C", amount: "$450M", date: "May 2023", lead: "Spark Capital" }
    ]
  },
  cursor: {
    name: "Cursor",
    slug: "cursor",
    logo_svg: '<rect x="6" y="6" width="20" height="20" rx="6" fill="url(#curGrad)"/><path d="M11 11l6 6M17 11l-6 6" stroke="white" stroke-width="2.5" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="curGrad"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#0284c7"/></linearGradient>',
    valuation: "$500 Million",
    total_funding: "$68.0 Million",
    hq: "San Francisco, CA",
    founded: "2022",
    employees: "40+",
    description: "Cursor is an AI-powered code editor built on top of VS Code. It helps developers write, edit, and debug code faster using AI.",
    founders: ["Arvid Lunnemark", "Jerry Zhang", "Sualeha Mahmood"],
    investors: ["Andreessen Horowitz", "OpenAI Startup Fund", "Founders Fund"],
    products: [
      { name: "Cursor Editor", desc: "Desktop editor with integrated codebase indexing and auto-edit capabilities." },
      { name: "Composer", desc: "Multi-file generation panel for rapid app building."}
    ],
    careers: [
      { title: "Backend Systems Engineer", loc: "San Francisco", sal: "$180k - $300k" },
      { title: "Product Designer", loc: "San Francisco", sal: "$160k - $260k" }
    ],
    rounds: [
      { round: "Series A", amount: "$60.0M", date: "Aug 2026", lead: "Andreessen Horowitz" },
      { round: "Seed Round", amount: "$8.0M", date: "Oct 2023", lead: "OpenAI Startup Fund" }
    ]
  },
  perplexity: {
    name: "Perplexity",
    slug: "perplexity",
    logo_svg: '<circle cx="16" cy="16" r="10" fill="url(#perpGrad)"/><path d="M12 16h8M16 12v8" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="perpGrad"><stop stop-color="#0891b2"/><stop offset="1" stop-color="#0e7490"/></linearGradient>',
    valuation: "$3.0 Billion",
    total_funding: "$165.0 Million",
    hq: "San Francisco, CA",
    founded: "2022",
    employees: "80+",
    description: "Perplexity AI is a conversational search engine that delivers answers to queries using language models.",
    founders: ["Aravind Srinivas", "Denis Yarats", "Johnny Ho"],
    investors: ["Institutional Venture Partners", "Jeff Bezos", "NVIDIA", "NEA"],
    products: [
      { name: "Perplexity Pro", desc: "Conversational search with file analysis and model selection." },
      { name: "Pro Search", desc: "Multi-step reasoning search engine." }
    ],
    careers: [
      { title: "Search Infrastructure Engineer", loc: "San Francisco", sal: "$200k - $350k" },
      { title: "Product Engineer - iOS/Android", loc: "San Francisco", sal: "$170k - $280k" }
    ],
    rounds: [
      { round: "Series B", amount: "$73.6M", date: "Jan 2024", lead: "IVP" },
      { round: "Series A", amount: "$25.6M", date: "Mar 2023", lead: "NEA" }
    ]
  },
  elevenlabs: {
    name: "ElevenLabs",
    slug: "elevenlabs",
    logo_svg: '<rect x="6" y="8" width="20" height="16" rx="4" fill="url(#elGrad)"/><line x1="10" y1="12" x2="10" y2="20" stroke="white" stroke-width="2"/><line x1="14" y1="10" x2="14" y2="22" stroke="white" stroke-width="2"/><line x1="18" y1="13" x2="18" y2="19" stroke="white" stroke-width="2"/><line x1="22" y1="11" x2="22" y2="21" stroke="white" stroke-width="2"/>',
    logo_grad: '<linearGradient id="elGrad"><stop stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/></linearGradient>',
    valuation: "$1.1 Billion",
    total_funding: "$101.0 Million",
    hq: "New York, NY",
    founded: "2022",
    employees: "70+",
    description: "ElevenLabs is a voice technology research company, building natural text-to-speech and voice cloning software.",
    founders: ["Mati Staniszewski", "Piotr Dabkowski"],
    investors: ["Andreessen Horowitz", "Nat Friedman", "Daniel Gross", "Sequoia Capital"],
    products: [
      { name: "Voice Design", desc: "Ultra-realistic text-to-speech generator." },
      { name: "Voice Lab", desc: "Clone custom voice models from short audio samples." },
      { name: "Reader App", desc: "Mobile app that reads aloud documents and books." }
    ],
    careers: [
      { title: "Audio Research Scientist", loc: "Remote / London", sal: "$190k - $320k" },
      { title: "Fullstack Product Engineer", loc: "New York", sal: "$160k - $270k" }
    ],
    rounds: [
      { round: "Series B", amount: "$80.0M", date: "Jan 2024", lead: "Andreessen Horowitz" },
      { round: "Series A", amount: "$19.0M", date: "Jun 2023", lead: "Nat Friedman & Daniel Gross" }
    ]
  },
  scale: {
    name: "Scale AI",
    slug: "scale",
    logo_svg: '<polygon points="6,24 16,6 26,24" fill="url(#scGrad)"/>',
    logo_grad: '<linearGradient id="scGrad"><stop stop-color="#f59e0b"/><stop offset="1" stop-color="#d97706"/></linearGradient>',
    valuation: "$13.8 Billion",
    total_funding: "$1.6 Billion",
    hq: "San Francisco, CA",
    founded: "2016",
    employees: "900+",
    description: "Scale AI provides data infrastructure for AI, supplying high-quality training data for LLMs, robotics, and AV models.",
    founders: ["Alexandr Wang", "Lucy Guo"],
    investors: ["Accel", "Founders Fund", "Coatue", "Index Ventures"],
    products: [
      { name: "Scale GenAI Platform", desc: "RLHF fine-tuning and evaluation tools for enterprises." },
      { name: "Scale Catalog", desc: "Structured training data pipelines for LLMs." }
    ],
    careers: [
      { title: "VP of Engineering - GenAI", loc: "San Francisco", sal: "$350k - $600k" },
      { title: "Staff Evaluation Scientist", loc: "San Francisco", sal: "$220k - $380k" }
    ],
    rounds: [
      { round: "Series F", amount: "$1.0B", date: "May 2026", lead: "Accel" },
      { round: "Series E", amount: "$325M", date: "Apr 2021", lead: "Dragoneer" }
    ]
  },
  mistral: {
    name: "Mistral AI",
    slug: "mistral",
    logo_svg: '<path d="M6 10l10-6 10 6v12l-10 6-10-6z" fill="url(#misGrad)"/><path d="M11 15l5-3 5 3M16 12v6" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="misGrad"><stop stop-color="#f97316"/><stop offset="1" stop-color="#ea580c"/></linearGradient>',
    valuation: "$6.0 Billion",
    total_funding: "$640.0 Million",
    hq: "Paris, France",
    founded: "2023",
    employees: "60+",
    description: "Mistral AI is a French startup developing fast, open-weights large language models that rival closed competitors.",
    founders: ["Arthur Mensch", "Guillaume Lample", "Timothée Lacroix"],
    investors: ["Andreessen Horowitz", "Lightspeed Venture Partners", "Microsoft", "CMA CGM"],
    products: [
      { name: "Mistral Large 2", desc: "123B open-weights flagship LLM." },
      { name: "Codestral Mamba", desc: "State Space Model optimized for code autocomplete." },
      { name: "Le Chat", desc: "Free user interface for accessing Mistral models." }
    ],
    careers: [
      { title: "Core LLM Training Engineer", loc: "Paris", sal: "€120k - €220k" },
      { title: "Developer Relations Lead", loc: "London / Remote", sal: "€90k - €150k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$640.0M", date: "Jun 2024", lead: "General Catalyst" },
      { round: "Series A", amount: "$415M", date: "Dec 2023", lead: "Andreessen Horowitz" }
    ]
  },
  meta: {
    name: "Meta AI",
    slug: "meta",
    logo_svg: '<path d="M8 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="url(#metGrad)"/><path d="M12 12c2 4 6 4 8 0s-6-4-8 0" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
    logo_grad: '<linearGradient id="metGrad"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#2563eb"/></linearGradient>',
    valuation: "Public (Meta)",
    total_funding: "N/A",
    hq: "Menlo Park, CA",
    founded: "2013",
    employees: "2,000+",
    description: "Meta AI is the research division of Meta Platforms, developing open-weight foundational intelligence models.",
    founders: ["Mark Zuckerberg", "Yann LeCun"],
    investors: ["Publicly Traded"],
    products: [
      { name: "Llama 3.1 405B", desc: "First open weights model to compete on state-of-the-art benchmarks." },
      { name: "Segment Anything", desc: "Foundational computer vision segmenting model." }
    ],
    careers: [
      { title: "Research Scientist - Foundational Models", loc: "Menlo Park", sal: "$220k - $450k" },
      { title: "Software Engineer - PyTorch Core", loc: "Seattle", sal: "$180k - $340k" }
    ],
    rounds: [
      { round: "Venture Capital", amount: "N/A (Corporate Dev)", date: "N/A", lead: "Meta" }
    ]
  },
  xai: {
    name: "xAI",
    slug: "xai",
    logo_svg: '<rect x="6" y="6" width="20" height="20" rx="4" fill="url(#xGrad)"/><path d="M10 10l12 12M22 10L10 22" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="xGrad"><stop stop-color="#0f172a"/><stop offset="1" stop-color="#020617"/></linearGradient>',
    valuation: "$24.0 Billion",
    total_funding: "$6.0 Billion",
    hq: "San Francisco, CA",
    founded: "2023",
    employees: "100+",
    description: "xAI is a startup founded by Elon Musk to build artificial intelligence that understands the true nature of the universe.",
    founders: ["Elon Musk"],
    investors: ["Valor Equity Partners", "Vy Capital", "Andreessen Horowitz", "Sequoia Capital"],
    products: [
      { name: "Grok 2", desc: "Frontier LLM integrated with X social platform real-time search." },
      { name: "Grok API", desc: "Developer access endpoint with custom prompt formatting." }
    ],
    careers: [
      { title: "Frontier Model Training Specialist", loc: "Palo Alto", sal: "$250k - $500k" },
      { title: "GPU Infrastructure Architect", loc: "Palo Alto", sal: "$300k - $600k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$6.0B", date: "May 2024", lead: "Valor Equity & Vy Capital" }
    ]
  }
};
