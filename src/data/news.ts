export interface Comment {
  user: string;
  points: number;
  time: string;
  text: string;
  replies: Comment[];
}

export interface RelatedLink {
  domain: string;
  url: string;
}

export interface NewsItem {
  id: number;
  title: string;
  url: string;
  domain: string;
  category: string;
  tags: string[];
  comments_slug: string;
  startup_slug: string;
  startup_name: string;
  upvotes: number;
  author: string;
  time: string;
  comments_count: number;
  comments: Comment[];
  reading_time?: string;
  related_links?: RelatedLink[];
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "DeepSeek releases R1: Open reasoning model matching o1 benchmarks at 10x lower cost",
    url: "https://github.com/deepseek-ai/DeepSeek-R1",
    domain: "github.com/deepseek-ai",
    category: "Models",
    tags: ["Reasoning-LLM", "Open-Weights", "RL-Alignment"],
    comments_slug: "deepseek-r1-open-reasoning-model",
    startup_slug: "deepseek",
    startup_name: "DeepSeek",
    upvotes: 894,
    author: "ml_pioneer",
    time: "45 minutes ago",
    comments_count: 3,
    reading_time: "5 min read",
    related_links: [
      { domain: "arxiv.org", url: "https://arxiv.org/abs/2501.12948" },
      { domain: "deepseek.com", url: "https://www.deepseek.com" }
    ],
    comments: [
      {
        user: "cuda_lord",
        points: 142,
        time: "30 minutes ago",
        text: "The fact that they trained this using Pure RL (GRPO) without the supervised fine-tuning warm start (for R1-Zero) and still got o1-level reasoning is insane. The math behind GRPO saving value-model memory overhead is going to change post-training pipelines.",
        replies: [
          {
            user: "tensor_flow",
            points: 54,
            time: "15 minutes ago",
            text: "Agreed. GRPO eliminates the critic network from memory, which allows them to run RL loops at massive context lengths (up to 128k) without running out of VRAM on H800 clusters.",
            replies: []
          }
        ]
      },
      {
        user: "safety_first",
        points: 87,
        time: "20 minutes ago",
        text: "The self-evolution logs show the model automatically developing 'thinking time' loops, correcting its own mathematical steps mid-generation. It's fascinating to see system 2 reasoning emerge purely from reward signals.",
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "OpenAI releases Operator agent to automate desktop and browser actions",
    url: "https://openai.com/blog/introducing-operator",
    domain: "openai.com",
    category: "Tools",
    tags: ["Agentic-AI", "Computer-Control", "Desktop-Agent"],
    comments_slug: "openai-operator-desktop-agent",
    startup_slug: "openai",
    startup_name: "OpenAI",
    upvotes: 624,
    author: "sama",
    time: "2 hours ago",
    comments_count: 2,
    reading_time: "3 min read",
    related_links: [
      { domain: "techcrunch.com", url: "https://techcrunch.com" }
    ],
    comments: [
      {
        user: "agent_builder",
        points: 95,
        time: "1 hour ago",
        text: "We've been testing the developer beta. The visual grounding model they are using to translate screenshots to mouse click coordinates is much more robust than standard selenium or accessibility tree approaches.",
        replies: []
      },
      {
        user: "hacker_news_vet",
        points: 43,
        time: "45 minutes ago",
        text: "Security is going to be the major bottleneck here. An autonomous agent with browser access needs isolated sandboxing to prevent prompt injection attacks from malicious web page text.",
        replies: []
      }
    ]
  },
  {
    id: 3,
    title: "Anthropic launches Claude 3.5 Computer Use API allowing Claude to control PCs",
    url: "https://anthropic.com/news/claude-3-5-sonnet-computer-use",
    domain: "anthropic.com",
    category: "Tools",
    tags: ["API-Release", "Computer-Control", "Claude-3.5"],
    comments_slug: "claude-computer-use-api",
    startup_slug: "anthropic",
    startup_name: "Anthropic",
    upvotes: 542,
    author: "dario_a",
    time: "4 hours ago",
    comments_count: 2,
    reading_time: "4 min read",
    related_links: [
      { domain: "github.com/anthropic", url: "https://github.com/anthropic-ai" }
    ],
    comments: [
      {
        user: "ui_designer",
        points: 110,
        time: "3 hours ago",
        text: "This is different from standard RPA. Claude visually inspects the screen state, determines where the buttons are, and simulates actual keypresses and scroll steps. It actually worked through a multi-step Excel-to-SaaS data entry loop for me.",
        replies: [
          {
            user: "dev_lead",
            points: 62,
            time: "2 hours ago",
            text: "The latency is around 1-2 seconds per action due to screenshot roundtrips. Good for back-office batch jobs, but too slow for real-time user-facing interactive apps.",
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "xAI brings Memphis Colossus cluster online with 100,000 liquid-cooled H100 GPUs",
    url: "https://x.com/elonmusk/status/colossus-100k",
    domain: "x.com/elonmusk",
    category: "Models",
    tags: ["GPU-Cluster", "Infra-Scale", "Memphis-Colossus"],
    comments_slug: "xai-colossus-100k-gpus",
    startup_slug: "xai",
    startup_name: "xAI",
    upvotes: 712,
    author: "elon_m",
    time: "6 hours ago",
    comments_count: 2,
    reading_time: "6 min read",
    related_links: [
      { domain: "supermicro.com", url: "https://supermicro.com" }
    ],
    comments: [
      {
        user: "datacenter_guru",
        points: 180,
        time: "5 hours ago",
        text: "Building a single-site 100k GPU cluster with liquid cooling in 122 days is a massive logistical feat. The power grid negotiations alone must have been intense; 100k H100s plus cooling infrastructure consumes close to 150 Megawatts.",
        replies: [
          {
            user: "grid_engineer",
            points: 75,
            time: "4 hours ago",
            text: "They are running massive gas turbines locally to supplement the TVA grid during peak hours. The local utility substation had to rush-install custom transformers.",
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Cursor AI editor raises $60M Series A at $2.5B valuation led by a16z",
    url: "https://cursor.com/blog/series-a",
    domain: "cursor.com",
    category: "Funding",
    tags: ["VC-Funding", "Anysphere", "a16z"],
    comments_slug: "cursor-series-a-funding",
    startup_slug: "cursor",
    startup_name: "Cursor",
    upvotes: 489,
    author: "arvid_l",
    time: "8 hours ago",
    comments_count: 2,
    reading_time: "3 min read",
    related_links: [
      { domain: "a16z.com", url: "https://a16z.com" }
    ],
    comments: [
      {
        user: "composer_fan",
        points: 124,
        time: "7 hours ago",
        text: "The composer mode is what hooked me. I can specify edits across 4 different files, watch it write them concurrently, and review the Git diff in-line. It completely replaces standard single-file generation prompts.",
        replies: []
      },
      {
        user: "vs_code_vet",
        points: 38,
        time: "6 hours ago",
        text: "I wonder how Microsoft will react. They host VS Code but Cursor is taking their entire power-user developer base. Copilot Workspace is lagging.",
        replies: []
      }
    ]
  },
  {
    id: 6,
    title: "Meta releases Llama 3.3 70B: Matching Llama 3.1 70B reasoning at much lower cost",
    url: "https://meta.ai/news/llama-3-3",
    domain: "meta.ai",
    category: "Models",
    tags: ["Llama-3.3", "Open-Weights", "Quantization"],
    comments_slug: "meta-llama-3-3-70b",
    startup_slug: "meta",
    startup_name: "Meta AI",
    upvotes: 432,
    author: "yann_l",
    time: "12 hours ago",
    comments_count: 1,
    reading_time: "4 min read",
    related_links: [
      { domain: "ai.meta.com", url: "https://ai.meta.com/blog/introducing-llama-3-3" }
    ],
    comments: [
      {
        user: "server_host",
        points: 59,
        time: "10 hours ago",
        text: "This model fits comfortably on a single RTX 4090 using 4-bit AWQ/EXL2 quantization, making local 70B inference accessible to hobbyists at over 40 tokens per second.",
        replies: []
      }
    ]
  },
  {
    id: 7,
    title: "Perplexity secures $500M funding round at $9B valuation led by IVP",
    url: "https://perplexity.ai/blog/funding-9b",
    domain: "perplexity.ai",
    category: "Funding",
    tags: ["VC-Funding", "Search-Engine", "IVP"],
    comments_slug: "perplexity-raises-9b-valuation",
    startup_slug: "perplexity",
    startup_name: "Perplexity",
    upvotes: 395,
    author: "aravind_s",
    time: "1 day ago",
    comments_count: 2,
    reading_time: "3 min read",
    related_links: [
      { domain: "bloomberg.com", url: "https://www.bloomberg.com" }
    ],
    comments: [
      {
        user: "search_analyst",
        points: 92,
        time: "20 hours ago",
        text: "Perplexity's growth is driven by their shopping agent features and Pro Search reasoning models. They are successfully converting search traffic into actual ecommerce purchases by managing checkout actions directly.",
        replies: []
      },
      {
        user: "news_reader",
        points: 51,
        time: "18 hours ago",
        text: "The publishers' revenue-share model they introduced recently seems to have settled some copyright friction. Happy to see them paying creators.",
        replies: []
      }
    ]
  },
  {
    id: 8,
    title: "Scale AI partners with US government to compile RLHF evaluation datasets for defense models",
    url: "https://scale.com/news/government-rlhf-partnership",
    domain: "scale.com",
    category: "Research",
    tags: ["Government-Defense", "RLHF-Data", "Model-Evaluation"],
    comments_slug: "scale-ai-government-rlhf",
    startup_slug: "scale",
    startup_name: "Scale AI",
    upvotes: 312,
    author: "alexandr_w",
    time: "2 days ago",
    comments_count: 1,
    reading_time: "5 min read",
    related_links: [
      { domain: "defense.gov", url: "https://www.defense.gov" }
    ],
    comments: [
      {
        user: "data_curator",
        points: 84,
        time: "1 day ago",
        text: "Scale AI remains the absolute bottleneck. Synthesized simulation data is good, but expert-in-the-loop annotations are still critical for calibrating models on military, medical, and legal domains.",
        replies: []
      }
    ]
  },
  {
    id: 9,
    title: "ElevenLabs releases Voice Design API: Generate custom voices from description prompts",
    url: "https://elevenlabs.io/blog/voice-design-release",
    domain: "elevenlabs.io",
    category: "Tools",
    tags: ["Text-to-Speech", "Voice-Cloning", "Voice-Design"],
    comments_slug: "elevenlabs-voice-design-api",
    startup_slug: "elevenlabs",
    startup_name: "ElevenLabs",
    upvotes: 278,
    author: "mati_s",
    time: "1 day ago",
    comments_count: 1,
    comments: [
      {
        user: "audio_dev",
        points: 47,
        time: "22 hours ago",
        text: "I typed 'elderly wizard with a crackly, raspy voice and a slight Scottish accent' and got back a fully customized voice profile that sounds extremely expressive. The integration with indie game engines will be huge.",
        replies: []
      }
    ]
  },
  {
    id: 10,
    title: "Physical Intelligence (Pi) raises $400M from Bezos and OpenAI for physical robot models",
    url: "https://physical.ai/series-a",
    domain: "physical.ai",
    category: "Funding",
    tags: ["VC-Funding", "Robotics-AI", "Thrive-Capital"],
    comments_slug: "physical-intelligence-raises-400m",
    startup_slug: "openai",
    startup_name: "OpenAI",
    upvotes: 367,
    author: "robotics_fan",
    time: "2 days ago",
    comments_count: 1,
    comments: [
      {
        user: "control_systems",
        points: 62,
        time: "1 day ago",
        text: "Their Pi-0 model shows that general-purpose foundation models can control robotic limbs across multiple configurations. If we can get a standard controller library for hardware, robot deployment costs will plummet.",
        replies: []
      }
    ]
  },
  {
    id: 11,
    title: "DeepSeek open-sources DeepSeek-Coder-V2: Outperforming GPT-4 Turbo on code benchmarks",
    url: "https://github.com/deepseek-ai/DeepSeek-Coder-V2",
    domain: "github.com/deepseek-ai",
    category: "Models",
    tags: ["Coding-LLM", "Open-Weights", "MoE-Architecture"],
    comments_slug: "deepseek-coder-v2-outperforms-gpt-4",
    startup_slug: "deepseek",
    startup_name: "DeepSeek",
    upvotes: 495,
    author: "hacker_ml",
    time: "3 days ago",
    comments_count: 1,
    comments: [
      {
        user: "rust_coder",
        points: 79,
        time: "2 days ago",
        text: "The model runs on a Mixture-of-Experts (MoE) setup. Out of 236B total parameters, only 21B are active per token, which gives it top-tier inference speeds. Coding syntax completion is highly accurate.",
        replies: []
      }
    ]
  },
  {
    id: 12,
    title: "Google Gemini 1.5 Pro update: Context window expanded to 2 Million tokens with native audio search",
    url: "https://deepmind.google/gemini-pro-1-5",
    domain: "deepmind.google",
    category: "Models",
    tags: ["Gemini-1.5", "Multimodal", "Long-Context"],
    comments_slug: "gemini-1-5-pro-2m-context",
    startup_slug: "openai", // Google not in startups record, mapping to openai/general
    startup_name: "OpenAI",
    upvotes: 342,
    author: "gemini_fan",
    time: "3 days ago",
    comments_count: 1,
    comments: [
      {
        user: "context_king",
        points: 104,
        time: "2 days ago",
        text: "Uploading a whole codebase (100+ files) and asking Claude-like reasoning queries with 99.8% needle-in-a-haystack recall is wild. No vector search DB chunking necessary, though retrieval costs compile fast.",
        replies: []
      }
    ]
  },
  {
    id: 13,
    title: "State Space Models (SSMs) like Mamba solving quadratic scaling bottlenecks of Transformers",
    url: "https://arxiv.org/abs/2312.00752",
    domain: "arxiv.org",
    category: "Research",
    tags: ["SSM-Mamba", "Transformer-Alternative", "Linear-Complexity"],
    comments_slug: "ssm-mamba-transformer-alternative",
    startup_slug: "mistral",
    startup_name: "Mistral AI",
    upvotes: 289,
    author: "arxiv_bot",
    time: "4 days ago",
    comments_count: 1,
    comments: [
      {
        user: "rnn_reborn",
        points: 62,
        time: "3 days ago",
        text: "Mamba's selective scan mechanism allows it to compress context states linearly instead of quadratically. This means infinite sequence lengths are theoretically possible without compute costs exploding.",
        replies: []
      }
    ]
  },
  {
    id: 14,
    title: "Mistral AI releases Codestral Mamba: A state space model for code generation",
    url: "https://mistral.ai/news/codestral-mamba",
    domain: "mistral.ai",
    category: "Models",
    tags: ["Coding-LLM", "Mamba-Architecture", "Open-Source"],
    comments_slug: "mistral-codestral-mamba",
    startup_slug: "mistral",
    startup_name: "Mistral AI",
    upvotes: 215,
    author: "arthur_m",
    time: "5 days ago",
    comments_count: 1,
    comments: [
      {
        user: "inference_eng",
        points: 44,
        time: "4 days ago",
        text: "Awesome to see Mamba-architecture models deployed in the wild for coding tasks. The local autocomplete latency is virtually non-existent compared to heavy attention-based transformers.",
        replies: []
      }
    ]
  },
  {
    id: 15,
    title: "DeepSeek releases DeepSeek-V3: A 671B parameter MoE model matching frontier metrics",
    url: "https://github.com/deepseek-ai/DeepSeek-V3",
    domain: "github.com/deepseek-ai",
    category: "Models",
    tags: ["Frontier-LLM", "MoE-Architecture", "Low-Cost-Training"],
    comments_slug: "deepseek-v3-moe-model-release",
    startup_slug: "deepseek",
    startup_name: "DeepSeek",
    upvotes: 567,
    author: "chinas_tech",
    time: "5 days ago",
    comments_count: 1,
    comments: [
      {
        user: "hardware_whale",
        points: 134,
        time: "4 days ago",
        text: "They trained this for only $5.5 Million in compute costs. Compared to the hundreds of millions spent on GPT-4, they have optimized their multi-node FP8 communications (DualPipe) to push NVIDIA hardware to its absolute limit.",
        replies: []
      }
    ]
  }
];
