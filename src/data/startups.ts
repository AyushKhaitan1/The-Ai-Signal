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
  website: string;
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
    website: "https://openai.com",
    valuation: "$157.0 Billion",
    total_funding: "$17.9 Billion",
    hq: "San Francisco, CA",
    founded: "2015",
    employees: "2,000+",
    description: "OpenAI is an AI research and deployment company. Our mission is to build safe, beneficial artificial general intelligence (AGI), currently pioneered by the o1 reasoning series and Advanced Voice interface.",
    founders: ["Sam Altman", "Greg Brockman", "Ilya Sutskever"],
    investors: ["Microsoft", "Thrive Capital", "Khosla Ventures", "Sequoia Capital", "NVIDIA", "Altimeter Capital"],
    products: [
      { name: "OpenAI o1", desc: "Foundational reasoning model that uses reinforcement learning to think before responding." },
      { name: "ChatGPT Search", desc: "Conversational web search engine delivering real-time citation links." },
      { name: "Operator", desc: "Desktop agentic tool executing complex multi-step browser tasks autonomously." }
    ],
    careers: [
      { title: "Post-Training Alignment Engineer (RLHF/DPO)", loc: "San Francisco", sal: "$260k - $460k" },
      { title: "Member of Technical Staff - Distributed Training", loc: "San Francisco", sal: "$240k - $420k" },
      { title: "Security Engineer - Agentic Red Teaming", loc: "San Francisco", sal: "$190k - $340k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$6.6B", date: "Oct 2024", lead: "Thrive Capital" },
      { round: "Venture Round", amount: "$10.0B", date: "Jan 2023", lead: "Microsoft" },
      { round: "Secondary Market", amount: "$490M", date: "Apr 2023", lead: "Thrive Capital" }
    ]
  },
  anthropic: {
    name: "Anthropic",
    slug: "anthropic",
    logo_svg: '<polygon points="16,6 26,24 6,24" fill="url(#antGrad)"/><circle cx="16" cy="16" r="4" fill="white"/>',
    logo_grad: '<linearGradient id="antGrad"><stop stop-color="#CC9966"/><stop offset="1" stop-color="#996633"/></linearGradient>',
    website: "https://anthropic.com",
    valuation: "$40.0 Billion",
    total_funding: "$9.7 Billion",
    hq: "San Francisco, CA",
    founded: "2021",
    employees: "800+",
    description: "Anthropic is an AI safety and research company that builds helpful, honest, and harmless AI systems, leading the industry with Claude's visual artifacts and active desktop computer control API.",
    founders: ["Dario Amodei", "Daniela Amodei", "Jared Kaplan"],
    investors: ["Amazon", "Google", "Spark Capital", "Index Ventures", "Menlo Ventures"],
    products: [
      { name: "Claude 3.5 Sonnet", desc: "Flagship reasoning and code generation foundation model." },
      { name: "Computer Use API", desc: "Developer API allowing Claude to control standard mouse and keyboard actions." },
      { name: "Claude Artifacts", desc: "Interactive UI canvas for co-building vector graphics, HTML websites, and text." }
    ],
    careers: [
      { title: "AI Safety Researcher - Mechanistic Interpretability", loc: "San Francisco", sal: "$240k - $450k" },
      { title: "Systems Engineer - Computer Use Infrastructure", loc: "San Francisco", sal: "$210k - $380k" },
      { title: "Product Engineer - Claude Core UI", loc: "San Francisco", sal: "$170k - $310k" }
    ],
    rounds: [
      { round: "Strategic Round", amount: "$4.0B", date: "Nov 2024", lead: "Amazon" },
      { round: "Venture Round", amount: "$2.0B", date: "Oct 2023", lead: "Google" },
      { round: "Venture Round", amount: "$1.25B", date: "Sep 2023", lead: "Amazon" }
    ]
  },
  cursor: {
    name: "Cursor",
    slug: "cursor",
    logo_svg: '<rect x="6" y="6" width="20" height="20" rx="6" fill="url(#curGrad)"/><path d="M11 11l6 6M17 11l-6 6" stroke="white" stroke-width="2.5" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="curGrad"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#0284c7"/></linearGradient>',
    website: "https://cursor.com",
    valuation: "$2.5 Billion",
    total_funding: "$68.0 Million",
    hq: "San Francisco, CA",
    founded: "2022",
    employees: "60+",
    description: "Cursor (developed by Anysphere) is an AI-first code editor designed to boost developer productivity by integrating semantic index searching and multi-file code editing capabilities.",
    founders: ["Arvid Lunnemark", "Jerry Zhang", "Sualeha Mahmood", "Michael Truell"],
    investors: ["Andreessen Horowitz", "OpenAI Startup Fund", "Founders Fund", "Benchmark"],
    products: [
      { name: "Cursor Editor", desc: "Desktop editor with integrated codebase parsing and real-time completions." },
      { name: "Composer Mode", desc: "Concurrently edit multiple files in a single agentic reasoning cycle." }
    ],
    careers: [
      { title: "Distributed File Sync Systems Engineer", loc: "San Francisco", sal: "$190k - $320k" },
      { title: "VS Code Extension Compiler Architect", loc: "San Francisco", sal: "$180k - $300k" }
    ],
    rounds: [
      { round: "Series A", amount: "$60.0M", date: "Aug 2024", lead: "Andreessen Horowitz" },
      { round: "Seed Round", amount: "$8.0M", date: "Oct 2023", lead: "OpenAI Startup Fund" }
    ]
  },
  perplexity: {
    name: "Perplexity",
    slug: "perplexity",
    logo_svg: '<circle cx="16" cy="16" r="10" fill="url(#perpGrad)"/><path d="M12 16h8M16 12v8" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="perpGrad"><stop stop-color="#0891b2"/><stop offset="1" stop-color="#0e7490"/></linearGradient>',
    website: "https://perplexity.ai",
    valuation: "$9.0 Billion",
    total_funding: "$500.0 Million",
    hq: "San Francisco, CA",
    founded: "2022",
    employees: "150+",
    description: "Perplexity AI is a conversational search engine delivering citation-rich answers, currently expanding into shopping agents and publisher revenue sharing systems.",
    founders: ["Aravind Srinivas", "Denis Yarats", "Johnny Ho"],
    investors: ["Institutional Venture Partners", "Jeff Bezos", "NVIDIA", "NEA", "Bessemer Venture Partners"],
    products: [
      { name: "Perplexity Pro", desc: "Conversational reasoning search utilizing top LLM checkpoints (Claude/Gemini/Llama)." },
      { name: "Pro Shopping Agent", desc: "Browse, compare, and complete checkout processes autonomously." }
    ],
    careers: [
      { title: "Retrieval-Augmented Generation (RAG) Architect", loc: "San Francisco", sal: "$210k - $360k" },
      { title: "Search Infrastructure Engineer - Indexing Node", loc: "San Francisco", sal: "$180k - $310k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$500M", date: "Jan 2025", lead: "IVP" },
      { round: "Series B", amount: "$73.6M", date: "Jan 2024", lead: "IVP" }
    ]
  },
  elevenlabs: {
    name: "ElevenLabs",
    slug: "elevenlabs",
    logo_svg: '<rect x="6" y="8" width="20" height="16" rx="4" fill="url(#elGrad)"/><line x1="10" y1="12" x2="10" y2="20" stroke="white" stroke-width="2"/><line x1="14" y1="10" x2="14" y2="22" stroke="white" stroke-width="2"/><line x1="18" y1="13" x2="18" y2="19" stroke="white" stroke-width="2"/><line x1="22" y1="11" x2="22" y2="21" stroke="white" stroke-width="2"/>',
    logo_grad: '<linearGradient id="elGrad"><stop stop-color="#8b5cf6"/><stop offset="1" stop-color="#6d28d9"/></linearGradient>',
    website: "https://elevenlabs.io",
    valuation: "$3.0 Billion",
    total_funding: "$101.0 Million",
    hq: "New York, NY",
    founded: "2022",
    employees: "120+",
    description: "ElevenLabs is a voice technology research company, specializing in natural text-to-speech, instant voice generation, and expressive voice design APIs.",
    founders: ["Mati Staniszewski", "Piotr Dabkowski"],
    investors: ["Andreessen Horowitz", "Nat Friedman", "Daniel Gross", "Sequoia Capital", "Smash Capital"],
    products: [
      { name: "Voice Design API", desc: "Generate custom, highly-expressive voice profiles from descriptive text prompts." },
      { name: "Voice Cloning Lab", desc: "Recreate accurate voice model matrices from short audio samples." }
    ],
    careers: [
      { title: "Audio Generative Model Researcher", loc: "Remote / London", sal: "$200k - $340k" },
      { title: "Fullstack Product Engineer - Audio Pipeline", loc: "New York", sal: "$165k - $280k" }
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
    website: "https://scale.com",
    valuation: "$13.8 Billion",
    total_funding: "$1.6 Billion",
    hq: "San Francisco, CA",
    founded: "2016",
    employees: "1,100+",
    description: "Scale AI provides the data engine for foundational intelligence models, supplying high-quality RLHF evaluation datasets and synthetic labeling pipelines for LLMs, autonomous vehicles, and defense applications.",
    founders: ["Alexandr Wang", "Lucy Guo"],
    investors: ["Accel", "Founders Fund", "Coatue", "Index Ventures", "DFJ Growth"],
    products: [
      { name: "Scale RLHF Engine", desc: "Expert-in-the-loop alignment and reinforcement learning loops." },
      { name: "Scale catalog", desc: "Pre-trained dataset matrices for vision and reasoning models." }
    ],
    careers: [
      { title: "VP of Engineering - Generative AI Datasets", loc: "San Francisco", sal: "$350k - $600k" },
      { title: "Staff RLHF Evaluation Scientist", loc: "San Francisco", sal: "$230k - $390k" }
    ],
    rounds: [
      { round: "Series F", amount: "$1.0B", date: "May 2024", lead: "Accel" },
      { round: "Series E", amount: "$325M", date: "Apr 2021", lead: "Dragoneer" }
    ]
  },
  mistral: {
    name: "Mistral AI",
    slug: "mistral",
    logo_svg: '<path d="M6 10l10-6 10 6v12l-10 6-10-6z" fill="url(#misGrad)"/><path d="M11 15l5-3 5 3M16 12v6" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="misGrad"><stop stop-color="#f97316"/><stop offset="1" stop-color="#ea580c"/></linearGradient>',
    website: "https://mistral.ai",
    valuation: "$6.0 Billion",
    total_funding: "$640.0 Million",
    hq: "Paris, France",
    founded: "2023",
    employees: "100+",
    description: "Mistral AI is a French startup developing fast, open-weights and custom large language models that rival closed US competitors in compute efficiency.",
    founders: ["Arthur Mensch", "Guillaume Lample", "Timothée Lacroix"],
    investors: ["General Catalyst", "Andreessen Horowitz", "Lightspeed Venture Partners", "Microsoft", "CMA CGM"],
    products: [
      { name: "Codestral Mamba", desc: "State Space Model optimized for latency-free code autocomplete." },
      { name: "Mistral Large 2", desc: "Flagship 123B open-weights model matching reasoning benchmarks." }
    ],
    careers: [
      { title: "Core LLM Pre-Training Engineer", loc: "Paris", sal: "€130k - €230k" },
      { title: "Inference Optimization Specialist", loc: "Paris / Remote", sal: "€100k - €180k" }
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
    website: "https://meta.ai",
    valuation: "Public (Meta Platforms)",
    total_funding: "N/A",
    hq: "Menlo Park, CA",
    founded: "2013",
    employees: "3,000+",
    description: "Meta AI is the research division of Meta Platforms, driving the open-source community by releasing the Llama foundation model series.",
    founders: ["Mark Zuckerberg", "Yann LeCun"],
    investors: ["Publicly Traded"],
    products: [
      { name: "Llama 3.3 70B", desc: "State-of-the-art open-weights model delivering high-performance reasoning." },
      { name: "Llama 3.2 Vision", desc: "Lightweight multimodal vision-language models for edge devices." }
    ],
    careers: [
      { title: "PyTorch Distributed Training Architect", loc: "Menlo Park", sal: "$230k - $460k" },
      { title: "Inference Systems Engineer - Triton Kernel Dev", loc: "Seattle", sal: "$190k - $350k" }
    ],
    rounds: [
      { round: "Corporate R&D Funding", amount: "N/A", date: "N/A", lead: "Meta Platforms" }
    ]
  },
  xai: {
    name: "xAI",
    slug: "xai",
    logo_svg: '<rect x="6" y="6" width="20" height="20" rx="4" fill="url(#xGrad)"/><path d="M10 10l12 12M22 10L10 22" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    logo_grad: '<linearGradient id="xGrad"><stop stop-color="#0f172a"/><stop offset="1" stop-color="#020617"/></linearGradient>',
    website: "https://x.ai",
    valuation: "$40.0 Billion",
    total_funding: "$12.0 Billion",
    hq: "Burlingame, CA",
    founded: "2023",
    employees: "150+",
    description: "xAI is a startup founded by Elon Musk to accelerate human scientific discovery, utilizing the liquid-cooled 100k H100 GPU Colossus cluster in Memphis.",
    founders: ["Elon Musk"],
    investors: ["Valor Equity Partners", "Vy Capital", "Andreessen Horowitz", "Sequoia Capital", "Fidelity"],
    products: [
      { name: "Grok 2", desc: "Frontier LLM integrated with real-time news retrieval loops." },
      { name: "Grok API Endpoint", desc: "Low-latency developer endpoint with custom prompt routing." }
    ],
    careers: [
      { title: "Distributed Cluster GPU Architect (Colossus)", loc: "Palo Alto", sal: "$320k - $620k" },
      { title: "Reinforcement Learning Post-Training Lead", loc: "Palo Alto", sal: "$280k - $550k" }
    ],
    rounds: [
      { round: "Venture Round", amount: "$6.0B", date: "Nov 2024", lead: "Sequoia Capital & Valor Equity" },
      { round: "Series B", amount: "$6.0B", date: "May 2024", lead: "Valor Equity & Vy Capital" }
    ]
  },
  deepseek: {
    name: "DeepSeek",
    slug: "deepseek",
    logo_svg: '<circle cx="16" cy="16" r="10" fill="url(#dsGrad)"/><path d="M12 18c2-4 6-4 8 0M16 11v6" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/>',
    logo_grad: '<linearGradient id="dsGrad"><stop stop-color="#0066FF"/><stop offset="1" stop-color="#003399"/></linearGradient>',
    website: "https://deepseek.com",
    valuation: "$15.0 Billion",
    total_funding: "$800.0 Million",
    hq: "Hangzhou, China",
    founded: "2023",
    employees: "200+",
    description: "DeepSeek is an open-source AI research company funded by quantitative fund High-Flyer, disrupting model pre-training costs with Mixture-of-Experts (MoE) and Pure RL reasoning models like DeepSeek-R1.",
    founders: ["Liang Wenfeng"],
    investors: ["High-Flyer Capital", "Quantitative Technology Consortiums"],
    products: [
      { name: "DeepSeek-R1", desc: "Open-weights reasoning model that uses reinforcement learning (GRPO) to process logical chains." },
      { name: "DeepSeek-V3", desc: "A 671B parameter Mixture-of-Experts (MoE) model trained on optimized low-cost infrastructure." }
    ],
    careers: [
      { title: "Triton Compiler Optimization Engineer", loc: "Hangzhou", sal: "$180k - $320k" },
      { title: "Reinforcement Learning Scientist (GRPO Research)", loc: "Hangzhou", sal: "$220k - $400k" }
    ],
    rounds: [
      { round: "Venture Capital", amount: "$800M", date: "2024", lead: "High-Flyer Capital" }
    ]
  }
};
