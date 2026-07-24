// ─── Types ────────────────────────────────────────────────────────────────────

export interface CmsBroker {
  id: string;
  slug: string;
  name: string;
  initials: string;
  color: string;
  badge: string;
  regulation: string[];
  rating: number;
  reviews: number;
  spread: string;
  leverage: string;
  minDeposit: string;
  platforms: string[];
  type: string;
  features: string[];
  scamRisk: "Very Low" | "Low" | "Medium" | "High";
  founded: number;
  verified: boolean;
  featured: boolean;
}

export interface CmsNewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  featured: boolean;
  readTime: string;
}

export interface CmsScamAlert {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium";
  type: string;
  date: string;
  reports: number;
  status: "Blacklisted" | "Warning" | "Under Investigation";
  regulation: string;
  country: string;
  description: string;
  tags: string[];
}

export interface CmsCalendarEvent {
  id: string;
  date: string;
  dayKey: string;
  time: string;
  currency: string;
  flag: string;
  event: string;
  impact: "high" | "medium" | "low";
  forecast: string;
  previous: string;
}

export interface CmsData {
  brokers: CmsBroker[];
  news: CmsNewsArticle[];
  scamAlerts: CmsScamAlert[];
  calendarEvents: CmsCalendarEvent[];
}

// ─── Default Brokers ──────────────────────────────────────────────────────────

export const defaultBrokers: CmsBroker[] = [
  {
    id: "1",
    slug: "ic-markets",
    name: "IC Markets",
    initials: "IC",
    color: "#C9A84C",
    badge: "ECN Leader",
    regulation: ["ASIC", "CySEC", "FSA"],
    rating: 4.8,
    reviews: 3241,
    spread: "0.0",
    leverage: "1:500",
    minDeposit: "$200",
    platforms: ["MT4", "MT5", "cTrader"],
    type: "ECN",
    features: ["Islamic Account", "VPS", "Copy Trading"],
    scamRisk: "Very Low",
    founded: 2007,
    verified: true,
    featured: true,
  },
  {
    id: "2",
    slug: "pepperstone",
    name: "Pepperstone",
    initials: "PP",
    color: "#3B82F6",
    badge: "Top Rated",
    regulation: ["FCA", "ASIC", "DFSA", "BaFin"],
    rating: 4.7,
    reviews: 2812,
    spread: "0.0",
    leverage: "1:400",
    minDeposit: "$200",
    platforms: ["MT4", "MT5", "cTrader"],
    type: "ECN/STP",
    features: ["Islamic Account", "Smart Trader Tools"],
    scamRisk: "Very Low",
    founded: 2010,
    verified: true,
    featured: true,
  },
  {
    id: "3",
    slug: "xm-group",
    name: "XM Group",
    initials: "XM",
    color: "#22C55E",
    badge: "Best for Beginners",
    regulation: ["CySEC", "ASIC", "FSCA"],
    rating: 4.5,
    reviews: 5621,
    spread: "0.6",
    leverage: "1:888",
    minDeposit: "$5",
    platforms: ["MT4", "MT5"],
    type: "Market Maker",
    features: ["Islamic Account", "Bonuses", "Free VPS"],
    scamRisk: "Low",
    founded: 2009,
    verified: true,
    featured: false,
  },
  {
    id: "4",
    slug: "oanda",
    name: "OANDA",
    initials: "OA",
    color: "#A78BFA",
    badge: "Best Spreads",
    regulation: ["FCA", "CFTC", "IIROC", "MAS"],
    rating: 4.6,
    reviews: 4102,
    spread: "1.0",
    leverage: "1:50",
    minDeposit: "$0",
    platforms: ["MT4", "OANDA Platform"],
    type: "Market Maker",
    features: ["No Minimum Deposit", "API Access", "Advanced Charting"],
    scamRisk: "Very Low",
    founded: 1996,
    verified: true,
    featured: false,
  },
  {
    id: "5",
    slug: "ftmo",
    name: "FTMO",
    initials: "FT",
    color: "#F97316",
    badge: "Prop Firm",
    regulation: ["CySEC"],
    rating: 4.4,
    reviews: 8934,
    spread: "0.2",
    leverage: "1:100",
    minDeposit: "$155",
    platforms: ["MT4", "MT5", "cTrader"],
    type: "Prop Firm",
    features: ["Funded Accounts", "Performance Coaching", "Daily Loss Limit"],
    scamRisk: "Low",
    founded: 2015,
    verified: true,
    featured: false,
  },
  {
    id: "6",
    slug: "ig-group",
    name: "IG Group",
    initials: "IG",
    color: "#06B6D4",
    badge: "Most Trusted",
    regulation: ["FCA", "ASIC", "MAS", "BaFin"],
    rating: 4.5,
    reviews: 6712,
    spread: "0.6",
    leverage: "1:200",
    minDeposit: "$250",
    platforms: ["IG Platform", "MT4", "ProRealTime"],
    type: "Market Maker",
    features: ["Stocks CFDs", "Options", "Weekend Trading"],
    scamRisk: "Very Low",
    founded: 1974,
    verified: true,
    featured: false,
  },
];

// ─── Default News ─────────────────────────────────────────────────────────────

export const defaultNews: CmsNewsArticle[] = [
  {
    id: "1",
    slug: "fed-rate-cut-signals-q3-2025",
    title: "Federal Reserve Signals Possible Rate Cut Cycle Beginning in Q3 As Inflation Cools",
    excerpt: "Fed officials hint at pivot as core PCE eases to 2.6%, prompting speculation over timing and pace of cuts.",
    category: "Central Banks",
    author: "Namaa Markets Research",
    publishedAt: "2026-07-10T08:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop&auto=format",
    featured: true,
    readTime: "6 min",
  },
  {
    id: "2",
    slug: "eurusd-ecb-hawkish-retreat",
    title: "EUR/USD Retreats from 1.0900 as ECB Officials Push Back on Rate Cut Hopes",
    excerpt: "Hawkish ECB commentary caps euro gains despite soft German CPI data, keeping the pair in a tight range.",
    category: "Forex",
    author: "FX Desk",
    publishedAt: "2026-07-10T07:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "4 min",
  },
  {
    id: "3",
    slug: "gold-surges-2350-safe-haven",
    title: "Gold Surges Past $2,350 — Safe-Haven Demand Rises Amid Geopolitical Tensions",
    excerpt: "XAU/USD breaks key resistance as Middle East uncertainty and dollar weakness drive institutional buying.",
    category: "Commodities",
    author: "Commodities Desk",
    publishedAt: "2026-07-10T06:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=450&fit=crop&auto=format",
    featured: false,
    readTime: "3 min",
  },
  {
    id: "4",
    slug: "bitcoin-consolidates-67k-cpi",
    title: "Bitcoin Consolidates at $67,000 Ahead of Critical US CPI Release",
    excerpt: "The largest cryptocurrency by market cap is treading water as traders await the pivotal inflation print.",
    category: "Crypto",
    author: "Crypto Desk",
    publishedAt: "2026-07-10T05:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "3 min",
  },
  {
    id: "5",
    slug: "gbpusd-weekly-technical-outlook",
    title: "GBP/USD Weekly Technical Outlook: Bulls Eye 1.2800 Resistance Zone",
    excerpt: "Cable has established a constructive technical structure after bouncing from key support at 1.2600.",
    category: "Analysis",
    author: "Technical Analysis",
    publishedAt: "2026-07-10T04:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "8 min",
  },
  {
    id: "6",
    slug: "opec-emergency-meeting-oil",
    title: "OPEC+ Considers Emergency Meeting as Oil Prices Test $85/barrel Support",
    excerpt: "Cartel members are weighing additional production adjustments as oversupply concerns collide with weakening demand forecasts.",
    category: "Geopolitics",
    author: "Energy Desk",
    publishedAt: "2026-07-10T03:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "5 min",
  },
  {
    id: "7",
    slug: "boj-policy-normalization",
    title: "Bank of Japan Policy Normalization on Track — Deputy Governor Confirms Gradual Approach",
    excerpt: "BoJ Deputy Governor reiterated the central bank's commitment to slowly unwinding its ultra-loose monetary policy.",
    category: "Central Banks",
    author: "Asia Desk",
    publishedAt: "2026-07-10T02:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "4 min",
  },
  {
    id: "8",
    slug: "audusd-mixed-employment-data",
    title: "AUD/USD Faces Resistance at 0.6600 After Mixed Australian Employment Data",
    excerpt: "The Australian dollar stalled after employment change beat expectations but unemployment ticked higher.",
    category: "Forex",
    author: "AsiaPac Desk",
    publishedAt: "2026-07-10T01:00:00Z",
    imageUrl: "",
    featured: false,
    readTime: "3 min",
  },
];

// ─── Default Scam Alerts ──────────────────────────────────────────────────────

export const defaultScamAlerts: CmsScamAlert[] = [
  {
    id: "1",
    name: "FX Prime Global",
    severity: "critical",
    type: "Withdrawal Issues",
    date: "Jun 15, 2026",
    reports: 47,
    status: "Blacklisted",
    regulation: "None",
    country: "Unknown",
    description: "Multiple users reporting funds held for 90+ days with no explanation. Customer support has gone silent.",
    tags: ["Withdrawal Issues", "No Support", "Unregulated"],
  },
  {
    id: "2",
    name: "TradeXpert Pro",
    severity: "high",
    type: "Unregulated Operation",
    date: "Jun 14, 2026",
    reports: 23,
    status: "Warning",
    regulation: "Claimed FSA — Unverified",
    country: "Seychelles",
    description: "Broker claims FSA regulation but FSA database shows no record. Offering 1:5000 leverage with unverifiable segregated accounts.",
    tags: ["Fake Regulation", "High Risk", "Suspicious"],
  },
  {
    id: "3",
    name: "CryptoForex Hub",
    severity: "critical",
    type: "Clone Firm",
    date: "Jun 12, 2026",
    reports: 89,
    status: "Blacklisted",
    regulation: "Cloning FCA firm",
    country: "Unknown",
    description: "Fraudulently using the name and registration number of a legitimate FCA-authorized firm. FCA has issued a public warning.",
    tags: ["Clone Firm", "FCA Warning", "Fraud"],
  },
  {
    id: "4",
    name: "AlphaSignals Ltd",
    severity: "medium",
    type: "Fake Signals Service",
    date: "Jun 10, 2026",
    reports: 34,
    status: "Warning",
    regulation: "None",
    country: "UAE",
    description: "Promises guaranteed 80%+ monthly returns via AI signals. Falsified trading records shared with investors.",
    tags: ["Fake Returns", "Signal Scam", "MLM Structure"],
  },
  {
    id: "5",
    name: "TradeMax Pro",
    severity: "critical",
    type: "Withdrawal Scam",
    date: "Jul 5, 2026",
    reports: 61,
    status: "Blacklisted",
    regulation: "None",
    country: "Unknown",
    description: "Platform suddenly went offline after collecting deposits from users across multiple countries.",
    tags: ["Exit Scam", "Withdrawal Scam", "Unregulated"],
  },
  {
    id: "6",
    name: "FXVault Capital",
    severity: "critical",
    type: "Clone Firm",
    date: "Jul 3, 2026",
    reports: 18,
    status: "Blacklisted",
    regulation: "Cloning ASIC firm",
    country: "Unknown",
    description: "Using stolen ASIC license number. ASIC has issued a public warning. Do not send funds.",
    tags: ["Clone Firm", "ASIC Warning", "Fraud"],
  },
];

// ─── Default Calendar Events ─────────────────────────────────────────────────

export const defaultCalendarEvents: CmsCalendarEvent[] = [
  { id: "1",  date: "Mon, Jul 7",  dayKey: "mon", time: "08:30", currency: "GBP", flag: "🇬🇧", event: "CPI (YoY)",                 impact: "high",   forecast: "2.6%",  previous: "2.3%"  },
  { id: "2",  date: "Mon, Jul 7",  dayKey: "mon", time: "12:30", currency: "USD", flag: "🇺🇸", event: "Core Retail Sales (MoM)",    impact: "high",   forecast: "0.4%",  previous: "0.1%"  },
  { id: "3",  date: "Mon, Jul 7",  dayKey: "mon", time: "14:00", currency: "USD", flag: "🇺🇸", event: "Fed Chair Powell Speech",     impact: "high",   forecast: "—",     previous: "—"     },
  { id: "4",  date: "Mon, Jul 7",  dayKey: "mon", time: "09:00", currency: "EUR", flag: "🇪🇺", event: "German ZEW Economic Sentiment",impact: "medium",forecast: "44.3",  previous: "42.7"  },
  { id: "5",  date: "Mon, Jul 7",  dayKey: "mon", time: "15:30", currency: "USD", flag: "🇺🇸", event: "Empire State Manufacturing",  impact: "low",    forecast: "-3.5",  previous: "-8.1"  },
  { id: "6",  date: "Tue, Jul 8",  dayKey: "tue", time: "02:30", currency: "AUD", flag: "🇦🇺", event: "Employment Change",           impact: "high",   forecast: "25.2K", previous: "38.5K" },
  { id: "7",  date: "Tue, Jul 8",  dayKey: "tue", time: "09:30", currency: "GBP", flag: "🇬🇧", event: "Employment Change (3M/3M)",   impact: "high",   forecast: "-55K",  previous: "-33K"  },
  { id: "8",  date: "Tue, Jul 8",  dayKey: "tue", time: "12:30", currency: "USD", flag: "🇺🇸", event: "PPI (MoM)",                  impact: "medium", forecast: "0.2%",  previous: "0.4%"  },
  { id: "9",  date: "Tue, Jul 8",  dayKey: "tue", time: "14:00", currency: "USD", flag: "🇺🇸", event: "JOLTS Job Openings",         impact: "medium", forecast: "8.37M", previous: "8.06M" },
  { id: "10", date: "Wed, Jul 9",  dayKey: "wed", time: "12:30", currency: "USD", flag: "🇺🇸", event: "CPI (YoY)",                  impact: "high",   forecast: "3.4%",  previous: "3.5%"  },
  { id: "11", date: "Wed, Jul 9",  dayKey: "wed", time: "12:30", currency: "USD", flag: "🇺🇸", event: "Core CPI (MoM)",             impact: "high",   forecast: "0.3%",  previous: "0.4%"  },
  { id: "12", date: "Wed, Jul 9",  dayKey: "wed", time: "18:00", currency: "USD", flag: "🇺🇸", event: "FOMC Meeting Minutes",       impact: "high",   forecast: "—",     previous: "—"     },
  { id: "13", date: "Thu, Jul 10", dayKey: "thu", time: "11:45", currency: "EUR", flag: "🇪🇺", event: "ECB Interest Rate Decision", impact: "high",   forecast: "4.25%", previous: "4.50%" },
  { id: "14", date: "Thu, Jul 10", dayKey: "thu", time: "12:30", currency: "USD", flag: "🇺🇸", event: "Initial Jobless Claims",     impact: "medium", forecast: "220K",  previous: "231K"  },
  { id: "15", date: "Thu, Jul 10", dayKey: "thu", time: "12:30", currency: "CAD", flag: "🇨🇦", event: "Retail Sales (MoM)",         impact: "medium", forecast: "0.5%",  previous: "-0.4%" },
  { id: "16", date: "Fri, Jul 11", dayKey: "fri", time: "12:30", currency: "USD", flag: "🇺🇸", event: "Core PPI (MoM)",             impact: "medium", forecast: "0.2%",  previous: "0.3%"  },
  { id: "17", date: "Fri, Jul 11", dayKey: "fri", time: "14:00", currency: "USD", flag: "🇺🇸", event: "Michigan Consumer Sentiment", impact: "medium", forecast: "79.4",  previous: "77.2"  },
];

export const defaultCmsData: CmsData = {
  brokers: defaultBrokers,
  news: defaultNews,
  scamAlerts: defaultScamAlerts,
  calendarEvents: defaultCalendarEvents,
};
