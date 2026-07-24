export interface Article {
  id: number; slug: string; category: string; title: string;
  excerpt: string; body: string[]; author: string; authorRole: string;
  time: string; publishedAt: string; readTime: string;
  comments: number; bookmarks: number; featured: boolean;
  image?: string; tags: string[]; relatedEvents?: string[];
}

export const articles: Article[] = [
  {
    id: 1, slug: "fed-rate-cut-signals-q3-2025", category: "Central Banks",
    title: "Federal Reserve Signals Possible Rate Cut Cycle Beginning in Q3 2025 as Inflation Cools to 2.4%",
    excerpt: "Fed Chair Jerome Powell's latest remarks suggest the central bank is gaining confidence that inflation is sustainably moving toward the 2% target, opening the door for rate reductions.",
    body: [
      "Federal Reserve Chair Jerome Powell delivered a notably dovish message at the Economic Club of New York on Monday, suggesting the central bank may be approaching the point where it can begin cutting interest rates — potentially as early as September 2025.",
      "Powell noted that inflation has made 'significant progress' toward the Fed's 2% target, with the latest PCE data showing headline inflation at 2.4% year-over-year. 'We are getting closer to the point where it will be appropriate to begin dialing back the level of policy restraint,' Powell said.",
      "The remarks sent U.S. Treasury yields sharply lower, with the 2-year yield falling 12 basis points to 4.68%. The dollar index weakened 0.6% while gold surged to $2,341.",
      "Markets quickly repriced rate cut expectations. Fed funds futures now imply a 72% probability of a 25 basis point cut at the September FOMC meeting, up from 54% before Powell's remarks.",
      "EUR/USD jumped 80 pips in the immediate aftermath, breaking above the 1.0880 resistance level. GBP/USD followed suit, climbing to 1.2730. USD/JPY fell from 149.90 to 149.10.",
      "The next key data point will be the June CPI report due July 11, followed by the July 31 FOMC meeting. A soft CPI print could cement expectations for the first rate cut since the pandemic-era easing cycle.",
    ],
    author: "Namaa Markets Research", authorRole: "Macro Research Desk",
    time: "32 min ago", publishedAt: "June 15, 2025 · 09:28 GMT",
    readTime: "6 min read", comments: 47, bookmarks: 123, featured: true,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop&auto=format",
    tags: ["Fed", "Interest Rates", "USD", "Monetary Policy", "Inflation"],
    relatedEvents: ["FOMC Meeting — Jul 31", "US CPI — Jul 11"],
  },
  {
    id: 2, slug: "eurusd-ecb-hawkish-retreat", category: "Forex",
    title: "EUR/USD Retreats from 1.0900 as ECB Officials Push Back on Rate Cut Expectations",
    excerpt: "The euro fell sharply after multiple ECB Governing Council members cautioned against premature policy easing.",
    body: [
      "The euro retreated from a two-week high of 1.0897 on Monday as several European Central Bank Governing Council members reiterated their cautious stance on the timing of further rate cuts.",
      "Bundesbank President Joachim Nagel told reporters in Frankfurt that the ECB needs to be 'very careful' about cutting rates too quickly, warning that service sector inflation — currently running at 4.1% — remains 'a source of concern'.",
      "EUR/USD fell from its session high of 1.0897 to an intra-day low of 1.0831, a decline of 66 pips. The pair is now consolidating near 1.0850, finding support at the 100-day moving average.",
      "From a technical perspective, EUR/USD needs to reclaim 1.0880 to resume the uptrend. A break below 1.0800 would expose the 200-day MA at 1.0755.",
    ],
    author: "FX Desk", authorRole: "Currency Strategist",
    time: "1h ago", publishedAt: "June 15, 2025 · 08:55 GMT",
    readTime: "4 min read", comments: 28, bookmarks: 67, featured: false,
    tags: ["EUR/USD", "ECB", "Euro", "Rate Cuts"],
    relatedEvents: ["ECB Press Conference — Jun 16"],
  },
  {
    id: 3, slug: "gold-surges-2350-safe-haven", category: "Commodities",
    title: "Gold Surges Past $2,350 — Safe-Haven Demand Rises Amid Geopolitical Tensions",
    excerpt: "Spot gold climbed to its highest level in three weeks as geopolitical risks and dollar weakness combined to fuel bullion demand.",
    body: [
      "Spot gold climbed to $2,362 per troy ounce on Monday, its highest level in three weeks, driven by geopolitical risk premium and a weaker US dollar.",
      "The precious metal has gained 4.2% over the past five trading sessions, breaking above the key $2,300 resistance level that had acted as a ceiling since early May.",
      "From a technical standpoint, the break above $2,300 and the 50-day MA at $2,318 is bullish, and gold is now targeting the April all-time high of $2,431.",
      "Central bank gold buying remains strong, with the World Gold Council reporting 290 tonnes purchased in Q1 2025 — the strongest quarter on record.",
    ],
    author: "Commodities Desk", authorRole: "Commodities Analyst",
    time: "2h ago", publishedAt: "June 15, 2025 · 07:45 GMT",
    readTime: "5 min read", comments: 19, bookmarks: 89, featured: false,
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=400&fit=crop&auto=format",
    tags: ["Gold", "XAU/USD", "Safe Haven", "Commodities"],
  },
  {
    id: 4, slug: "bitcoin-consolidates-67k-cpi", category: "Crypto",
    title: "Bitcoin Consolidates at $67,000 Ahead of Critical US CPI Release",
    excerpt: "The largest cryptocurrency is treading water as traders await the pivotal inflation print.",
    body: [
      "Bitcoin (BTC/USD) is trading in a tight range between $66,400 and $67,800 as markets brace for the upcoming US Consumer Price Index report.",
      "A lower-than-expected CPI print would strengthen the case for Fed rate cuts, which has historically been bullish for risk assets including Bitcoin.",
      "Technically, Bitcoin is finding support at the 50-day moving average around $66,200. A sustained break above $68,500 would be bullish, targeting $75,000.",
      "Institutional demand remains robust, with US spot Bitcoin ETFs recording net inflows of $312 million on Friday alone.",
    ],
    author: "Crypto Desk", authorRole: "Digital Assets Analyst",
    time: "3h ago", publishedAt: "June 15, 2025 · 07:00 GMT",
    readTime: "4 min read", comments: 64, bookmarks: 201, featured: false,
    tags: ["Bitcoin", "BTC", "Crypto", "CPI", "Macro"],
  },
  {
    id: 5, slug: "gbpusd-weekly-technical-outlook", category: "Analysis",
    title: "GBP/USD Weekly Technical Outlook: Bulls Eye 1.2800 Resistance Zone",
    excerpt: "Cable has established a constructive technical structure after bouncing from key support at 1.2600.",
    body: [
      "GBP/USD enters the new week in a constructive technical posture following a recovery from the key 1.2600 support level.",
      "The bullish case rests on several technical factors: a higher-low structure since the May trough, a golden cross on the daily chart that formed two weeks ago, and bullish divergence on the weekly RSI.",
      "Key resistance levels: 1.2720 (200-day MA), 1.2770 (June 2 swing high), and 1.2800 (psychological + 61.8% Fibonacci retracement).",
      "From a fundamental standpoint, the pair will be sensitive to UK CPI data on Tuesday and the Bank of England's tone.",
    ],
    author: "Technical Analysis", authorRole: "Chief Technical Analyst",
    time: "4h ago", publishedAt: "June 15, 2025 · 06:00 GMT",
    readTime: "8 min read", comments: 33, bookmarks: 112, featured: false,
    tags: ["GBP/USD", "Technical Analysis", "Forex"],
    relatedEvents: ["UK CPI — Jun 16", "BoE Meeting — Jun 19"],
  },
  {
    id: 6, slug: "opec-emergency-meeting-oil", category: "Geopolitics",
    title: "OPEC+ Considers Emergency Meeting as Oil Prices Test $85/barrel Support",
    excerpt: "Cartel members are weighing additional production adjustments as oversupply concerns collide with weakening demand forecasts.",
    body: [
      "Sources within OPEC+ told Reuters on Monday that several member nations are pushing for an emergency meeting as crude oil prices fall toward the critical $85 per barrel support level.",
      "West Texas Intermediate crude fell to $85.20 on Monday before recovering slightly to $86.10.",
      "The International Energy Agency revised its 2025 global oil demand forecast lower by 200,000 barrels per day last week, citing slower growth in China.",
      "For forex traders, lower oil prices typically weigh on the Canadian dollar (CAD). USD/CAD climbed 0.3% on Monday to 1.3610.",
    ],
    author: "Energy Desk", authorRole: "Commodities & Energy Analyst",
    time: "5h ago", publishedAt: "June 15, 2025 · 05:20 GMT",
    readTime: "5 min read", comments: 41, bookmarks: 78, featured: false,
    tags: ["Oil", "OPEC+", "WTI", "Energy", "CAD"],
  },
  {
    id: 7, slug: "boj-policy-normalization", category: "Central Banks",
    title: "Bank of Japan Policy Normalization on Track — Deputy Governor Confirms Gradual Approach",
    excerpt: "BoJ Deputy Governor Ryozo Himino reiterated the central bank's commitment to slowly unwinding its ultra-loose monetary policy.",
    body: [
      "Bank of Japan Deputy Governor Ryozo Himino confirmed the central bank remains committed to gradually normalizing monetary policy, while emphasizing the word 'gradual' to avoid excessive yen appreciation.",
      "The BoJ raised its policy rate to 0.5% in January 2025 — its highest level since 2008.",
      "USD/JPY remains elevated above 149.50 as the interest rate differential between Japan (0.5%) and the US (5.25-5.50%) stays historically wide.",
      "Technically, USD/JPY remains bullish above 148.00, with the path of least resistance toward 151.00.",
    ],
    author: "Asia Desk", authorRole: "Asia-Pacific Strategist",
    time: "6h ago", publishedAt: "June 15, 2025 · 04:30 GMT",
    readTime: "5 min read", comments: 22, bookmarks: 55, featured: false,
    tags: ["USD/JPY", "Bank of Japan", "JPY", "Carry Trade"],
  },
  {
    id: 8, slug: "audusd-mixed-employment-data", category: "Forex",
    title: "AUD/USD Faces Resistance at 0.6600 After Mixed Australian Employment Data",
    excerpt: "The Australian dollar stalled after employment change beat expectations but the unemployment rate ticked higher.",
    body: [
      "AUD/USD struggled to maintain gains above 0.6600 after Australia's May employment report delivered mixed signals.",
      "The economy added 38,500 jobs in May — beating the consensus of 25,000 — but unemployment ticked higher to 4.1% as participation rose.",
      "AUD/USD initially spiked to 0.6612 before retreating to 0.6580 as the unemployment rate was digested.",
      "The Australian dollar is highly sensitive to Chinese data given Australia's trade relationship with China, accounting for roughly 33% of Australian exports.",
    ],
    author: "AsiaPac Desk", authorRole: "Asia-Pacific FX Strategist",
    time: "7h ago", publishedAt: "June 15, 2025 · 03:15 GMT",
    readTime: "4 min read", comments: 15, bookmarks: 43, featured: false,
    tags: ["AUD/USD", "RBA", "Australia", "Employment"],
    relatedEvents: ["RBA Meeting — Jul 1"],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
