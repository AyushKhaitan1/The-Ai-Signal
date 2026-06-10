export interface Comment {
  user: string;
  points: number;
  time: string;
  text: string;
  replies: Comment[];
}

export interface NewsItem {
  id: number;
  title: string;
  url: string;
  domain: string;
  category: string;
  comments_slug: string;
  startup_slug: string;
  startup_name: string;
  upvotes: number;
  author: string;
  time: string;
  comments_count: number;
  comments: Comment[];
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "OpenAI introduces Advanced Voice Mode for interactive coding agent",
    url: "https://openai.com/voice-agent",
    domain: "openai.com",
    category: "Tools",
    comments_slug: "openai-voice-agent",
    startup_slug: "openai",
    startup_name: "OpenAI",
    upvotes: 412,
    author: "sama",
    time: "2 hours ago",
    comments_count: 3,
    comments: [
      {
        user: "alex_coder",
        points: 84,
        time: "1 hour ago",
        text: "This voice coding agent changes the workflow entirely. The latency is practically imperceptible, making pairing feel natural.",
        replies: [
          {
            user: "dev_mind",
            points: 32,
            time: "45 minutes ago",
            text: "Agreed. The voice modulation matches developer urgency. When you talk fast, it replies fast.",
            replies: []
          }
        ]
      },
      {
        user: "vc_tracker",
        points: 45,
        time: "1 hour ago",
        text: "OpenAI continues to ship at an unbelievable pace. The developer tooling ecosystem is consolidating.",
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "Anthropic launches Claude 3.5 Sonnet setting new benchmarks for coding",
    url: "https://anthropic.com/claude-3-5",
    domain: "anthropic.com",
    category: "Models",
    comments_slug: "claude-3-5-sonnet",
    startup_slug: "anthropic",
    startup_name: "Anthropic",
    upvotes: 342,
    author: "dario_a",
    time: "4 hours ago",
    comments_count: 3,
    comments: [
      {
        user: "jerry_code",
        points: 120,
        time: "3 hours ago",
        text: "Claude 3.5 Sonnet's coding capabilities are remarkable. It handles multi-file refactoring far better than GPT-4o currently.",
        replies: [
          {
            user: "ml_wiz",
            points: 54,
            time: "2 hours ago",
            text: "The reasoning trace is much clearer. It seems to plan its file writes before execution.",
            replies: []
          }
        ]
      },
      {
        user: "sam_v",
        points: 39,
        time: "3 hours ago",
        text: "Anthropic has really taken the developer mindshare in coding tools. Cursor + Sonnet is the absolute meta right now.",
        replies: []
      }
    ]
  },
  {
    id: 3,
    title: "Cursor AI editor raises $60M Series A led by Andreessen Horowitz",
    url: "https://cursor.com/blog/series-a",
    domain: "cursor.com",
    category: "Tools",
    comments_slug: "cursor-series-a",
    startup_slug: "cursor",
    startup_name: "Cursor",
    upvotes: 289,
    author: "arvid_l",
    time: "6 hours ago",
    comments_count: 3,
    comments: [
      {
        user: "hacker_news",
        points: 95,
        time: "5 hours ago",
        text: "$60M Series A is huge for a team of this size. But Cursor has captured the entire dev community.",
        replies: [
          {
            user: "jake_s",
            points: 41,
            time: "4 hours ago",
            text: "Absolutely worth it. The Composer feature has cut my prototyping time in half.",
            replies: []
          }
        ]
      },
      {
        user: "investor_dan",
        points: 62,
        time: "5 hours ago",
        text: "A16z leading this makes perfect sense. This is an application-layer winner in AI coding.",
        replies: []
      }
    ]
  },
  {
    id: 4,
    title: "Meta releases Llama 3.1 405B, the largest open weight model",
    url: "https://meta.ai/news/llama-3-1",
    domain: "meta.ai",
    category: "Models",
    comments_slug: "llama-3-1-405b",
    startup_slug: "meta",
    startup_name: "Meta AI",
    upvotes: 512,
    author: "yann_l",
    time: "1 day ago",
    comments_count: 3,
    comments: [
      {
        user: "open_weight_fan",
        points: 182,
        time: "18 hours ago",
        text: "Meta releasing a 405B model as open weight is a historic gift to the open-source community.",
        replies: [
          {
            user: "server_guy",
            points: 92,
            time: "17 hours ago",
            text: "The host costs are going to be massive though. 8x H100s needed just for FP8 inference.",
            replies: []
          }
        ]
      },
      {
        user: "zuck_sup",
        points: 74,
        time: "20 hours ago",
        text: "Open ecosystem wins. The ecosystem building around Llama 3.1 is going to run circles around closed models.",
        replies: []
      }
    ]
  },
  {
    id: 5,
    title: "Perplexity launches Pro Search with multi-step reasoning capabilities",
    url: "https://perplexity.ai/pro-search",
    domain: "perplexity.ai",
    category: "Tools",
    comments_slug: "perplexity-pro-search",
    startup_slug: "perplexity",
    startup_name: "Perplexity",
    upvotes: 256,
    author: "aravind_s",
    time: "8 hours ago",
    comments_count: 2,
    comments: [
      {
        user: "search_geek",
        points: 53,
        time: "7 hours ago",
        text: "Multi-step reasoning search is the future. Instead of giving me one quick link, it does the work of an analyst.",
        replies: []
      },
      {
        user: "aravind_fan",
        points: 29,
        time: "6 hours ago",
        text: "Perplexity continues to replace Google Search for 90% of my research queries.",
        replies: []
      }
    ]
  },
  {
    id: 6,
    title: "ElevenLabs releases Reader App with ultra-realistic text-to-speech",
    url: "https://elevenlabs.io/reader-app",
    domain: "elevenlabs.io",
    category: "Tools",
    comments_slug: "elevenlabs-reader-app",
    startup_slug: "elevenlabs",
    startup_name: "ElevenLabs",
    upvotes: 198,
    author: "mati_s",
    time: "12 hours ago",
    comments_count: 1,
    comments: [
      {
        user: "voice_act",
        points: 48,
        time: "10 hours ago",
        text: "The voice reading is incredibly expressive. It handles pauses, inhalations, and emotional inflection perfectly.",
        replies: []
      }
    ]
  },
  {
    id: 7,
    title: "xAI announces Grok 2 with advanced visual understanding",
    url: "https://x.ai/grok-2",
    domain: "x.ai",
    category: "Models",
    comments_slug: "xai-grok-2",
    startup_slug: "xai",
    startup_name: "xAI",
    upvotes: 310,
    author: "elon_m",
    time: "10 hours ago",
    comments_count: 1,
    comments: [
      {
        user: "grok_user",
        points: 88,
        time: "9 hours ago",
        text: "Grok 2 is extremely fast. The integration with real-time X news feed provides context other LLMs miss.",
        replies: []
      }
    ]
  },
  {
    id: 8,
    title: "Scale AI secures $1B funding at $13.8B valuation to scale frontier data",
    url: "https://scale.com/news/1b-funding",
    domain: "scale.com",
    category: "Funding",
    comments_slug: "scale-ai-funding",
    startup_slug: "scale",
    startup_name: "Scale AI",
    upvotes: 275,
    author: "alexandr_w",
    time: "3 days ago",
    comments_count: 1,
    comments: [
      {
        user: "data_king",
        points: 64,
        time: "2 days ago",
        text: "Scale is the arms dealer of the AI gold rush. High-quality human RLHF data is the primary bottleneck.",
        replies: []
      }
    ]
  },
  {
    id: 9,
    title: "Mistral releases Mistral Large 2, a 123B model with multi-lingual reasoning",
    url: "https://mistral.ai/news/large-2",
    domain: "mistral.ai",
    category: "Models",
    comments_slug: "mistral-large-2",
    startup_slug: "mistral",
    startup_name: "Mistral AI",
    upvotes: 214,
    author: "arthur_m",
    time: "1 day ago",
    comments_count: 1,
    comments: [
      {
        user: "french_tech",
        points: 55,
        time: "20 hours ago",
        text: "Mistral Large 2 is an incredible achievement. Multilingual benchmarks are highly competitive.",
        replies: []
      }
    ]
  },
  {
    id: 10,
    title: "Evaluation report on Llama 3.1 safety and alignment guardrails",
    url: "https://arxiv.org/abs/llama-evaluation",
    domain: "arxiv.org",
    category: "Research",
    comments_slug: "llama-safety-evaluation",
    startup_slug: "meta",
    startup_name: "Meta AI",
    upvotes: 180,
    author: "research_bot",
    time: "2 days ago",
    comments_count: 1,
    comments: [
      {
        user: "safety_first",
        points: 31,
        time: "1 day ago",
        text: "The evaluation shows open weights models are not inherently riskier than closed models if proper guardrails are placed at compile time.",
        replies: []
      }
    ]
  },
  {
    id: 11,
    title: "State Space Models (SSMs) vs Transformers for long context window analysis",
    url: "https://arxiv.org/abs/ssm-mamba",
    domain: "arxiv.org",
    category: "Research",
    comments_slug: "ssm-vs-transformers",
    startup_slug: "mistral",
    startup_name: "Mistral AI",
    upvotes: 165,
    author: "albert_g",
    time: "5 days ago",
    comments_count: 1,
    comments: [
      {
        user: "theory_crafter",
        points: 42,
        time: "4 days ago",
        text: "Mamba and State Space Models solving the quadratic complexity of transformers is beautiful mathematically.",
        replies: []
      }
    ]
  }
];
