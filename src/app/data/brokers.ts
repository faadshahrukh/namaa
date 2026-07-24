export interface Broker {
  id: number; slug: string; name: string; logo: string; tagline: string;
  regulation: string[]; rating: number; reviews: number; spread: string;
  commissionPerLot: string; leverage: string; minDeposit: string;
  platforms: string[]; badge: string; badgeColor: string; scamRisk: string;
  scamScore: number; founded: number; type: string; features: string[];
  verified: boolean; headquarters: string; assets: string[];
  withdrawalTime: string; segregatedFunds: boolean;
  negativeBalanceProtection: boolean; islamicAccount: boolean;
  demoAccount: boolean; website: string; description: string;
  pros: string[]; cons: string[];
  spreadsTable: { pair: string; typical: string; min: string }[];
  userReviews: { author: string; rating: number; date: string; comment: string }[];
}

export const brokers: Broker[] = [
  {
    id: 1, slug: "ic-markets", name: "IC Markets", logo: "ICM",
    tagline: "The Raw Spreads Broker",
    regulation: ["ASIC", "CySEC", "FSA"], rating: 4.8, reviews: 3241,
    spread: "0.0", commissionPerLot: "$3.50", leverage: "1:500", minDeposit: "$200",
    platforms: ["MT4", "MT5", "cTrader"], badge: "ECN Leader", badgeColor: "#22C55E",
    scamRisk: "Very Low", scamScore: 98, founded: 2007, type: "ECN",
    features: ["Islamic Account", "VPS Hosting", "Copy Trading"],
    verified: true, headquarters: "Sydney, Australia",
    assets: ["Forex", "CFDs", "Commodities", "Indices", "Crypto"],
    withdrawalTime: "Same day", segregatedFunds: true,
    negativeBalanceProtection: true, islamicAccount: true, demoAccount: true,
    website: "icmarkets.com",
    description: "IC Markets is one of the world's largest True ECN forex brokers, with a global trading community exceeding 180,000 clients in 200+ countries. Founded in 2007, regulated by ASIC, CySEC, and FSA, they are best known for ultra-tight raw spreads starting from 0.0 pips and fast execution speeds averaging 40ms.",
    pros: ["Ultra-low spreads from 0.0 pips on Raw accounts", "Multiple tier-1 regulations (ASIC, CySEC, FSA)", "Supports MT4, MT5, and cTrader", "Very fast execution — average 40ms", "Segregated client funds", "No restrictions on scalping, EA, hedging"],
    cons: ["No proprietary trading platform", "$200 minimum deposit for Raw accounts", "Limited educational resources", "Customer support can be slow at peak times"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "0.02", min: "0.0" },
      { pair: "GBP/USD", typical: "0.20", min: "0.0" },
      { pair: "USD/JPY", typical: "0.08", min: "0.0" },
      { pair: "AUD/USD", typical: "0.10", min: "0.0" },
      { pair: "USD/CAD", typical: "0.30", min: "0.0" },
    ],
    userReviews: [
      { author: "Ahmed R.", rating: 5, date: "Jun 10, 2025", comment: "Best ECN broker I've used. Spreads are genuinely 0.0 on EUR/USD during London session. Withdrawals always processed same day." },
      { author: "Sarah M.", rating: 5, date: "Jun 2, 2025", comment: "Switched from XM to IC Markets 2 years ago and never looked back. Execution is lightning fast with no slippage on my scalping strategy." },
      { author: "James T.", rating: 4, date: "May 28, 2025", comment: "Great broker overall. Raw spreads are excellent but commission adds up for high-frequency traders. Still my top choice." },
    ],
  },
  {
    id: 2, slug: "pepperstone", name: "Pepperstone", logo: "PP",
    tagline: "Fast, Flexible, Trusted",
    regulation: ["FCA", "ASIC", "DFSA", "BaFin"], rating: 4.7, reviews: 2812,
    spread: "0.0", commissionPerLot: "$3.76", leverage: "1:400", minDeposit: "$200",
    platforms: ["MT4", "MT5", "cTrader", "TradingView"], badge: "Top Rated", badgeColor: "#C9A84C",
    scamRisk: "Very Low", scamScore: 97, founded: 2010, type: "ECN/STP",
    features: ["Islamic Account", "Smart Trader Tools", "Autochartist", "VPS"],
    verified: true, headquarters: "Melbourne, Australia",
    assets: ["Forex", "CFDs", "Indices", "Commodities", "Crypto", "ETFs"],
    withdrawalTime: "1-2 business days", segregatedFunds: true,
    negativeBalanceProtection: true, islamicAccount: true, demoAccount: true,
    website: "pepperstone.com",
    description: "Pepperstone is an award-winning global forex and CFD broker founded in 2010 in Melbourne. Regulated by five major authorities including FCA and ASIC, renowned for outstanding customer service, competitive pricing, and TradingView integration.",
    pros: ["5 major regulations including FCA and ASIC", "TradingView integration — unique among ECN brokers", "Excellent 24/7 customer support", "Smart Trader Tools suite included free", "Competitive Raw spreads from 0.0 pips", "Wide range of 1,200+ instruments"],
    cons: ["No proprietary mobile app", "No bonuses or promotions", "Inactivity fee after 12 months", "Limited crypto offering"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "0.09", min: "0.0" },
      { pair: "GBP/USD", typical: "0.30", min: "0.0" },
      { pair: "USD/JPY", typical: "0.10", min: "0.0" },
      { pair: "AUD/USD", typical: "0.14", min: "0.0" },
      { pair: "USD/CAD", typical: "0.35", min: "0.0" },
    ],
    userReviews: [
      { author: "Mohammed K.", rating: 5, date: "Jun 12, 2025", comment: "Pepperstone's customer service is simply the best in the industry. Response time under 2 minutes." },
      { author: "Lisa C.", rating: 5, date: "Jun 5, 2025", comment: "Love that they support TradingView for execution. Finally a broker that lets me trade from my analysis platform." },
      { author: "David W.", rating: 4, date: "May 20, 2025", comment: "Solid broker in every department. The inactivity fee is annoying but would still recommend." },
    ],
  },
  {
    id: 3, slug: "xm-group", name: "XM Group", logo: "XM",
    tagline: "Trade the World",
    regulation: ["CySEC", "ASIC", "FSCA", "DFSA"], rating: 4.5, reviews: 5621,
    spread: "0.6", commissionPerLot: "$0", leverage: "1:888", minDeposit: "$5",
    platforms: ["MT4", "MT5"], badge: "Best for Beginners", badgeColor: "#3B82F6",
    scamRisk: "Low", scamScore: 89, founded: 2009, type: "Market Maker",
    features: ["Islamic Account", "Bonuses", "Free VPS", "Loyalty Program"],
    verified: true, headquarters: "Limassol, Cyprus",
    assets: ["Forex", "Stocks", "Commodities", "Indices", "Crypto"],
    withdrawalTime: "1-3 business days", segregatedFunds: true,
    negativeBalanceProtection: true, islamicAccount: true, demoAccount: true,
    website: "xm.com",
    description: "XM Group is one of the world's largest retail forex brokers, serving over 10 million clients in 190+ countries. Particularly popular with beginners due to a $5 minimum deposit and extensive educational resources.",
    pros: ["Very low $5 minimum deposit", "Excellent educational resources", "Welcome and deposit bonuses", "Free VPS hosting for active traders", "10 million+ clients globally"],
    cons: ["Higher spreads than ECN brokers", "Market maker model", "No cTrader platform", "Bonuses have volume requirements"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "0.6", min: "0.6" },
      { pair: "GBP/USD", typical: "0.9", min: "0.8" },
      { pair: "USD/JPY", typical: "0.8", min: "0.7" },
      { pair: "AUD/USD", typical: "0.9", min: "0.8" },
      { pair: "USD/CAD", typical: "1.3", min: "1.1" },
    ],
    userReviews: [
      { author: "Yusuf A.", rating: 5, date: "Jun 8, 2025", comment: "Perfect broker for beginners. Started with $50 and the educational webinars taught me everything I needed." },
      { author: "Anna P.", rating: 4, date: "May 30, 2025", comment: "Good for learning but spreads are higher than ECN brokers. Once profitable I moved to IC Markets." },
      { author: "Carlos M.", rating: 4, date: "May 15, 2025", comment: "Reliable withdrawals and good support. The bonus system is decent if you read the terms carefully." },
    ],
  },
  {
    id: 4, slug: "oanda", name: "OANDA", logo: "OA",
    tagline: "Trusted. Transparent. Global.",
    regulation: ["FCA", "CFTC", "IIROC", "MAS"], rating: 4.6, reviews: 4102,
    spread: "1.0", commissionPerLot: "$0", leverage: "1:50", minDeposit: "$0",
    platforms: ["MT4", "OANDA Platform", "TradingView"], badge: "US Licensed", badgeColor: "#A78BFA",
    scamRisk: "Very Low", scamScore: 96, founded: 1996, type: "Market Maker",
    features: ["No Minimum Deposit", "API Access", "Advanced Analytics", "US Clients"],
    verified: true, headquarters: "New York, USA",
    assets: ["Forex", "CFDs", "Commodities", "Indices", "Bonds"],
    withdrawalTime: "2-3 business days", segregatedFunds: true,
    negativeBalanceProtection: false, islamicAccount: false, demoAccount: true,
    website: "oanda.com",
    description: "OANDA is one of the oldest forex brokers in the world, founded in 1996. Holds CFTC/NFA licences making it one of the few brokers legally able to serve US clients. Known for transparency and institutional-grade currency data.",
    pros: ["No minimum deposit requirement", "One of the few US-regulated brokers (CFTC/NFA)", "Institutional-grade currency data", "API access for algorithmic trading", "Founded 1996 — nearly 30 years of reliability"],
    cons: ["Lower leverage due to US/UK regulations", "Slightly higher spreads", "No Islamic account", "Limited product range"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "1.0", min: "0.8" },
      { pair: "GBP/USD", typical: "1.4", min: "1.2" },
      { pair: "USD/JPY", typical: "1.0", min: "0.8" },
      { pair: "AUD/USD", typical: "1.4", min: "1.2" },
      { pair: "USD/CAD", typical: "1.6", min: "1.4" },
    ],
    userReviews: [
      { author: "Robert L.", rating: 5, date: "Jun 11, 2025", comment: "As a US-based trader, OANDA is one of my only real options and it's actually excellent." },
      { author: "Jennifer K.", rating: 4, date: "Jun 1, 2025", comment: "Very trustworthy broker. The API access is brilliant for algorithmic trading." },
      { author: "Tom B.", rating: 4, date: "May 22, 2025", comment: "OANDA's been around for decades for a reason. Solid, reliable, transparent." },
    ],
  },
  {
    id: 5, slug: "ig-group", name: "IG Group", logo: "IG",
    tagline: "The World's No.1 CFD Provider",
    regulation: ["FCA", "ASIC", "FSCA", "MAS", "BaFin"], rating: 4.6, reviews: 3890,
    spread: "0.6", commissionPerLot: "$0", leverage: "1:200", minDeposit: "$250",
    platforms: ["MT4", "IG Platform", "ProRealTime"], badge: "Most Trusted", badgeColor: "#22C55E",
    scamRisk: "Very Low", scamScore: 95, founded: 1974, type: "Market Maker",
    features: ["CFDs", "Shares", "ETFs", "Options", "Weekend Trading"],
    verified: true, headquarters: "London, United Kingdom",
    assets: ["Forex", "CFDs", "Stocks", "Indices", "Commodities", "Crypto", "Options"],
    withdrawalTime: "1-3 business days", segregatedFunds: true,
    negativeBalanceProtection: true, islamicAccount: false, demoAccount: true,
    website: "ig.com",
    description: "IG Group is one of the world's oldest CFD and forex brokers, founded in London in 1974. Listed on the London Stock Exchange, serving over 300,000 clients. The world's #1 CFD provider by revenue with access to 17,000+ instruments.",
    pros: ["Founded 1974 — over 50 years of operation", "17,000+ instruments", "LSE-listed public company", "ProRealTime advanced charting", "Excellent mobile app"],
    cons: ["Higher spreads vs raw ECN brokers", "No Islamic account", "$250 minimum deposit", "Complex fee structure for share CFDs"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "0.6", min: "0.6" },
      { pair: "GBP/USD", typical: "0.9", min: "0.9" },
      { pair: "USD/JPY", typical: "0.7", min: "0.7" },
      { pair: "AUD/USD", typical: "0.9", min: "0.9" },
      { pair: "USD/CAD", typical: "1.8", min: "1.8" },
    ],
    userReviews: [
      { author: "Claire D.", rating: 5, date: "Jun 9, 2025", comment: "IG has been my main broker for 5 years. ProRealTime platform is incredible." },
      { author: "Mark H.", rating: 5, date: "May 28, 2025", comment: "The sheer breadth of instruments on IG is unmatched. Stocks, ETFs, options, forex all in one place." },
      { author: "Fatima S.", rating: 4, date: "May 10, 2025", comment: "Very professional broker. The mobile app is the best I've used across any broker." },
    ],
  },
  {
    id: 6, slug: "exness", name: "Exness", logo: "EX",
    tagline: "Trade with Unlimited Leverage",
    regulation: ["FCA", "CySEC", "FSCA", "CBCS"], rating: 4.4, reviews: 6231,
    spread: "0.1", commissionPerLot: "$3.50", leverage: "1:2000", minDeposit: "$1",
    platforms: ["MT4", "MT5", "Exness Terminal"], badge: "Ultra-Low Deposit", badgeColor: "#F97316",
    scamRisk: "Low", scamScore: 85, founded: 2008, type: "ECN",
    features: ["Instant Withdrawal", "Islamic Account", "Unlimited Leverage"],
    verified: true, headquarters: "Limassol, Cyprus",
    assets: ["Forex", "CFDs", "Metals", "Energies", "Crypto", "Indices"],
    withdrawalTime: "Instant", segregatedFunds: true,
    negativeBalanceProtection: true, islamicAccount: true, demoAccount: true,
    website: "exness.com",
    description: "Exness was founded in 2008 and has grown rapidly to exceed $4 trillion monthly trading volume. Known for a $1 minimum deposit, instant withdrawals, and leverage up to 1:2000. Particularly popular in the Middle East and Africa.",
    pros: ["$1 minimum deposit — most accessible major broker", "Instant automated withdrawals 24/7", "Ultra-high leverage up to 1:2000", "Tight spreads from 0.1 pips", "Monthly volume exceeds $4 trillion"],
    cons: ["Very high leverage can lead to rapid losses", "Limited educational resources", "Customer support quality inconsistent", "Offshore regulation for highest leverage"],
    spreadsTable: [
      { pair: "EUR/USD", typical: "0.1", min: "0.0" },
      { pair: "GBP/USD", typical: "0.4", min: "0.2" },
      { pair: "USD/JPY", typical: "0.2", min: "0.1" },
      { pair: "AUD/USD", typical: "0.3", min: "0.1" },
      { pair: "USD/CAD", typical: "0.6", min: "0.3" },
    ],
    userReviews: [
      { author: "Omar F.", rating: 5, date: "Jun 13, 2025", comment: "Instant withdrawals are a game changer. Withdrawn funds at 2am on a Sunday and they hit my account within seconds." },
      { author: "Priya N.", rating: 4, date: "Jun 4, 2025", comment: "Good for tight spreads and low deposit. The high leverage is attractive but use it carefully." },
      { author: "Felix G.", rating: 4, date: "May 25, 2025", comment: "The Exness Terminal is surprisingly good and instant withdrawals are genuine." },
    ],
  },
];

export function getBrokerBySlug(slug: string) {
  return brokers.find((b) => b.slug === slug);
}
