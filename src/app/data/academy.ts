export interface Lesson {
  id: string; title: string; duration: string; type: string;
  completed?: boolean; locked?: boolean; desc: string;
  content: string[];
  quiz?: { question: string; options: string[]; answer: number }[];
}

export interface Level {
  id: string; title: string; subtitle: string; color: string;
  lessons: Lesson[]; duration: string; students: string; description: string;
}

export const levels: Level[] = [
  {
    id: "preschool", title: "Preschool", subtitle: "Forex Fundamentals",
    color: "#22C55E", duration: "4 hours", students: "24,891",
    description: "Everything you need to know before placing your first trade. No prior experience required.",
    lessons: [
      {
        id: "what-is-forex", title: "What is the Forex Market?",
        duration: "18 min", type: "Video + Reading", completed: true,
        desc: "An introduction to the foreign exchange market — how it works, who participates, and why it's the largest financial market in the world.",
        content: [
          "The foreign exchange market (forex, FX) is the world's largest and most liquid financial market, with a daily trading volume exceeding $7.5 trillion. Unlike stock markets, forex has no central exchange — it operates over-the-counter (OTC), meaning trades happen directly between participants through a global network of banks, brokers, and electronic networks.",
          "The forex market is open 24 hours a day, 5 days a week, from Sunday evening (Sydney open) to Friday evening (New York close). This continuous operation is possible because different financial centers around the world are always open during this period.",
          "The primary participants include: Central banks who manage currency reserves and implement monetary policy; Commercial banks who handle the majority of forex volume; Hedge funds and institutional investors; Corporations hedging international trade; and Retail traders like you.",
        ],
        quiz: [
          { question: "What is the approximate daily trading volume of the forex market?", options: ["$1 trillion", "$3.5 trillion", "$7.5 trillion", "$15 trillion"], answer: 2 },
          { question: "When does the forex market operate?", options: ["9 AM to 5 PM EST only", "24 hours, 7 days a week", "24 hours, 5 days a week", "Only during US trading hours"], answer: 2 },
        ],
      },
      {
        id: "currency-pairs", title: "Understanding Currency Pairs",
        duration: "22 min", type: "Video + Reading", completed: true,
        desc: "Learn how currency pairs work, what base and quote currencies mean, and how to read a forex quote.",
        content: [
          "In forex, currencies are always traded in pairs. A currency pair shows how much of the quote currency (second) you need to buy one unit of the base currency (first).",
          "For example, EUR/USD = 1.0850 means 1 Euro costs 1.0850 US Dollars. EUR is the base currency, USD is the quote currency.",
          "Major pairs involve the US dollar: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD.",
        ],
        quiz: [
          { question: "In the pair EUR/USD, which is the base currency?", options: ["USD", "EUR", "Both equally", "Neither"], answer: 1 },
          { question: "If EUR/USD = 1.0850, what does this mean?", options: ["1 USD costs 1.0850 EUR", "1 EUR costs 1.0850 USD", "EUR is worth more", "USD is worth more"], answer: 1 },
        ],
      },
      {
        id: "pips-and-lots", title: "Pips, Lots, and Position Sizing",
        duration: "28 min", type: "Video + Calculator", completed: true,
        desc: "Master the key units of measurement in forex — pips, lots, and how they translate to real money.",
        content: [
          "A pip (percentage in point) is the standard unit of measurement for price movements. For most pairs, 1 pip = 0.0001. For JPY pairs, 1 pip = 0.01.",
          "Lot sizes: 1 Standard Lot = 100,000 units; 1 Mini Lot = 10,000 units; 1 Micro Lot = 1,000 units.",
          "For EUR/USD with a standard lot, 1 pip = $10. With a mini lot, 1 pip = $1. With a micro lot, 1 pip = $0.10.",
        ],
        quiz: [
          { question: "For most currency pairs, 1 pip equals:", options: ["0.1", "0.01", "0.001", "0.0001"], answer: 3 },
          { question: "How many units does 1 Standard Lot represent?", options: ["1,000", "10,000", "100,000", "1,000,000"], answer: 2 },
        ],
      },
      {
        id: "market-sessions", title: "Forex Market Sessions",
        duration: "20 min", type: "Video + Reading",
        desc: "Discover the four main trading sessions, their characteristics, and the best times to trade.",
        content: [
          "The four main sessions: Sydney (10 PM–7 AM GMT), Tokyo (12 AM–9 AM GMT), London (8 AM–5 PM GMT), New York (1 PM–10 PM GMT).",
          "The London session is most active, accounting for ~35% of all transactions. The London-New York overlap (1 PM–5 PM GMT) sees the highest liquidity and volatility.",
          "Understanding sessions helps you choose when to trade based on your pairs and strategy.",
        ],
        quiz: [
          { question: "Which session accounts for the most forex trading volume?", options: ["Sydney", "Tokyo", "London", "New York"], answer: 2 },
          { question: "When is the highest liquidity period?", options: ["Sydney-Tokyo overlap", "Tokyo-London overlap", "London-New York overlap", "New York-Sydney overlap"], answer: 2 },
        ],
      },
      { id: "reading-charts", title: "Reading Forex Charts", duration: "25 min", type: "Video + Interactive", locked: true, desc: "Line, bar, and candlestick charts explained — and why candlesticks are the preferred choice.", content: [], quiz: [] },
      { id: "placing-first-trade", title: "Placing Your First Trade", duration: "30 min", type: "Guided Practice", locked: true, desc: "A step-by-step walkthrough of opening, managing, and closing a demo trade on MT4/MT5.", content: [], quiz: [] },
    ],
  },
  {
    id: "elementary", title: "Elementary", subtitle: "Building Your Foundation",
    color: "#3B82F6", duration: "7 hours", students: "19,234",
    description: "Order types, leverage, risk management basics, and understanding charts in depth.",
    lessons: [
      {
        id: "order-types", title: "Order Types Explained",
        duration: "24 min", type: "Video + Reading", completed: true,
        desc: "Market orders, limit orders, stop orders — when to use each type and why.",
        content: [
          "Market orders execute immediately at the current market price. They guarantee execution but not price — during fast-moving markets you may experience slippage.",
          "Limit orders are placed at a specific price and only execute when the market reaches that price. A buy limit is placed below current price; a sell limit above it.",
          "Stop orders become market orders when triggered. Stop-loss orders close losing positions automatically.",
        ],
        quiz: [
          { question: "Which order executes immediately at market price?", options: ["Limit Order", "Stop Order", "Market Order", "Take Profit"], answer: 2 },
        ],
      },
      { id: "leverage-margin", title: "Leverage & Margin Deep Dive", duration: "32 min", type: "Video + Calculator", desc: "The most important concept in forex — leverage amplifies both gains and losses.", content: [], quiz: [] },
      { id: "support-resistance", title: "Support & Resistance Levels", duration: "35 min", type: "Video + Chart Practice", locked: true, desc: "The foundation of technical analysis — identifying where price is likely to pause or reverse.", content: [], quiz: [] },
      { id: "trend-lines", title: "Drawing Trend Lines Correctly", duration: "28 min", type: "Video + Practice", locked: true, desc: "How to identify and draw valid trend lines to spot high-probability trade setups.", content: [], quiz: [] },
      { id: "candlestick-patterns", title: "Key Candlestick Patterns", duration: "40 min", type: "Video + Flashcards", locked: true, desc: "Doji, hammer, engulfing, pin bar — the most powerful candlestick patterns every trader must know.", content: [], quiz: [] },
      { id: "risk-reward", title: "Risk/Reward Ratios & Position Sizing", duration: "38 min", type: "Video + Calculator", locked: true, desc: "The math behind professional risk management and why a 1:2 R:R changes everything.", content: [], quiz: [] },
    ],
  },
  {
    id: "intermediate", title: "Intermediate", subtitle: "Technical & Fundamental Analysis",
    color: "#C9A84C", duration: "12 hours", students: "12,045",
    description: "Moving averages, oscillators, fundamental analysis, central bank policy, and building a trading plan.",
    lessons: [
      { id: "moving-averages", title: "Moving Averages — The Complete Guide", duration: "42 min", type: "Video + Reading", desc: "SMA, EMA, WMA — how they work and how to use them for trend identification.", content: [], quiz: [] },
      { id: "rsi-macd", title: "RSI & MACD — Using Oscillators Effectively", duration: "45 min", type: "Video + Chart Practice", desc: "Two of the most widely-used indicators — how to read them correctly and avoid common mistakes.", content: [], quiz: [] },
      { id: "fibonacci", title: "Fibonacci Retracements in Trending Markets", duration: "38 min", type: "Video + Quiz", locked: true, desc: "How to draw and use Fibonacci levels to identify high-probability trade setups.", content: [], quiz: [] },
      { id: "fundamental-analysis", title: "Introduction to Fundamental Analysis", duration: "50 min", type: "Video + Reading", locked: true, desc: "Interest rates, inflation, GDP, employment — how macroeconomic data moves currency markets.", content: [], quiz: [] },
      { id: "central-banks", title: "Central Banks & Monetary Policy", duration: "55 min", type: "Video + Reading", locked: true, desc: "The Fed, ECB, BoE, RBA — how central bank decisions drive forex trends for months.", content: [], quiz: [] },
      { id: "trading-psychology", title: "The Psychology of Trading", duration: "48 min", type: "Video + Workbook", locked: true, desc: "Fear, greed, revenge trading, FOMO — why 90% of traders fail and how to be in the 10%.", content: [], quiz: [] },
    ],
  },
  {
    id: "advanced", title: "Advanced", subtitle: "Pro Strategies & Systems",
    color: "#A78BFA", duration: "18 hours", students: "7,821",
    description: "Advanced price action, multi-timeframe analysis, algorithmic concepts, and professional risk management.",
    lessons: [
      { id: "price-action", title: "Price Action Trading Mastery", duration: "60 min", type: "Video + Workbook", locked: true, desc: "Trading without indicators using pure price structure, patterns, and market context.", content: [], quiz: [] },
      { id: "smc-ict", title: "Smart Money Concepts & Institutional Order Flow", duration: "75 min", type: "Video + Workbook", locked: true, desc: "Order blocks, fair value gaps, liquidity grabs — how institutions move markets.", content: [], quiz: [] },
      { id: "multi-timeframe", title: "Multi-Timeframe Analysis", duration: "50 min", type: "Video + Practice", locked: true, desc: "Top-down analysis from monthly to 5-minute charts — aligning timeframes for high-probability entries.", content: [], quiz: [] },
      { id: "backtesting", title: "Strategy Backtesting & Validation", duration: "65 min", type: "Video + Simulator", locked: true, desc: "How to test your strategy on historical data and calculate edge, expectancy, and win rate.", content: [], quiz: [] },
      { id: "portfolio-management", title: "Portfolio & Risk Management at Scale", duration: "55 min", type: "Video + Workbook", locked: true, desc: "Managing multiple positions, correlation risk, and scaling a trading account professionally.", content: [], quiz: [] },
      { id: "automation", title: "Introduction to Trading Automation", duration: "70 min", type: "Video + Code Examples", locked: true, desc: "Expert Advisors, MQL4/5, and Python basics for automating your trading strategies.", content: [], quiz: [] },
    ],
  },
];

export function getLevelById(id: string) {
  return levels.find((l) => l.id === id);
}

export function getLessonById(levelId: string, lessonId: string) {
  return getLevelById(levelId)?.lessons.find((l) => l.id === lessonId);
}
