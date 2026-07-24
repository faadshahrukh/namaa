import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle, AlertTriangle, Star } from "lucide-react";
import svgPaths from "@/imports/CompleteResponsiveWebsite/svg-ah4uccxoro";
import imgFedReserve from "@/imports/CompleteResponsiveWebsite/8567c1a8782e7566938e3815efc68a805ad83a72.png";
import imgGoldSurges from "@/imports/CompleteResponsiveWebsite/fcdc94b6d60abc426c5a78cd2eb8c796632a254c.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useTheme } from "../../context/ThemeContext";

function SparkLine({ fillPath, linePath, color }: { fillPath: string; linePath: string; color: string }) {
  const uid = color === "#22C55E" ? "sg" : color === "#16A34A" ? "slg" : "sr";
  const id = `sp-${uid}-${fillPath.length}`;
  return (
    <div className="flex-1 h-9 min-w-0 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 364 36">
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0.05" stopColor={color} stopOpacity="0.2" />
            <stop offset="0.95" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#${id})`} fillOpacity="0.6" />
        <path d={linePath} stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

const sparklines = [
  { pair: "EUR/USD", price: "1.0854", change: "+0.11%", up: true,  fill: svgPaths.p29568300, line: svgPaths.p122f0300 },
  { pair: "GBP/USD", price: "1.2687", change: "-0.12%", up: false, fill: svgPaths.p35b88b00, line: svgPaths.pc4d50d8   },
  { pair: "AUD/USD", price: "0.6523", change: "-0.10%", up: false, fill: svgPaths.p3dcced80, line: svgPaths.pc4d50d8   },
  { pair: "USD/CHF", price: "0.8912", change: "+0.14%", up: true,  fill: svgPaths.p29568300, line: svgPaths.p122f0300 },
  { pair: "USD/CAD", price: "1.3568", change: "+0.21%", up: true,  fill: svgPaths.p35b88b00, line: svgPaths.p36c01280 },
  { pair: "XAU/USD", price: "2341.50", change: "+0.42%", up: true, fill: svgPaths.p29568300, line: svgPaths.p36c01280 },
];

const calendarEvents = [
  { time: "08:30", flag: "🇬🇧", ccy: "GBP", event: "CPI (YoY)",              forecast: "2.6%" },
  { time: "12:30", flag: "🇺🇸", ccy: "USD", event: "Core Retail Sales (MoM)", forecast: "0.4%" },
  { time: "14:00", flag: "🇺🇸", ccy: "USD", event: "Fed Chair Powell Speech", forecast: "—"   },
];

const newsArticles = [
  { img: imgFedReserve, category: "Central Banks", title: "Federal Reserve Signals Possible Rate Cut Cycle Beginning in Q3 As Inflation Cools", excerpt: "Fed officials hint at pivot as core PCE eases to 2.6%, prompting speculation over timing and pace of cuts.", author: "James M.", time: "2h ago", slug: "fed-rate-cut-signals-q3-2025" },
  { img: imgGoldSurges, category: "Commodities",   title: "Gold Surges Past $2,350 — Safe-Haven Demand Rises Amid Geopolitical Tensions",              excerpt: "XAU/USD breaks key resistance as Middle East uncertainty and dollar weakness drive institutional buying.",     author: "Sara K.", time: "4h ago", slug: "gold-surges-2350-safe-haven" },
  { img: null,          category: "Forex",          title: "EUR/USD Retreats from 1.0900 as ECB Officials Push Back on Rate Cut Hopes",                  excerpt: "Hawkish ECB commentary caps euro gains despite soft German CPI data, keeping the pair in a tight range.",   author: "Anna R.", time: "6h ago", slug: "eurusd-ecb-hawkish-retreat" },
];

const brokers = [
  { name: "IC Markets",  badge: "ECN",      regs: ["ASIC","CySEC","FSA"],  rating: 4.9, spread: "0.0 pips", leverage: "1:500",  slug: "ic-markets",  initials: "IC", color: "#C9A84C" },
  { name: "Pepperstone", badge: "STP/ECN",  regs: ["FCA","ASIC","DFSA"],  rating: 4.8, spread: "0.0 pips", leverage: "1:400",  slug: "pepperstone", initials: "PP", color: "#3B82F6" },
  { name: "XM Group",    badge: "Beginners",regs: ["CySEC","ASIC","FSCA"],rating: 4.7, spread: "0.6 pips", leverage: "1:1000", slug: "xm-group",    initials: "XM", color: "#22C55E" },
];

const scamAlerts = [
  { name: "TradeMax Pro",    severity: "critical", type: "Withdrawal Scam", date: "Jul 5, 2026" },
  { name: "FXVault Capital", severity: "critical", type: "Clone Firm",      date: "Jul 3, 2026" },
  { name: "AlphaTrade FX",   severity: "high",     type: "Fake Signals",    date: "Jun 29, 2026" },
];

const premiumFeatures = [
  { icon: Star,          title: "Pro Analytics",  desc: "Advanced charts & indicators" },
  { icon: AlertTriangle, title: "Smart Alerts",   desc: "Custom price & event notifications" },
  { icon: CheckCircle,   title: "Pro Community",  desc: "Private forums & signals" },
  { icon: CheckCircle,   title: "No Ads",         desc: "Clean, distraction-free experience" },
];

function StarRating({ rating, emptyColor }: { rating: number; emptyColor: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-[9px] h-[9px]" viewBox="0 0 9 9" fill="none">
          <path
            d={svgPaths.p1eb6d000}
            fill={i <= Math.floor(rating) ? "#C9A84C" : "none"}
            stroke={i <= Math.floor(rating) ? "#C9A84C" : emptyColor}
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [prices, setPrices] = useState(sparklines);

  const c = {
    bg:      isDark ? "#070C17" : "#F2F6FF",
    card:    isDark ? "#0B1322" : "#FFFFFF",
    muted:   isDark ? "#111D30" : "#E4EDF9",
    accent:  isDark ? "#172338" : "#D4E1F4",
    border:  isDark ? "#1D2F4A" : "#C2D3EC",
    fg:      isDark ? "#E3EBF8" : "#0D1E38",
    fgMid:   isDark ? "#8AA4C8" : "#4A6080",
    fgDim:   isDark ? "#6A82A8" : "#5C7094",
    gold:    isDark ? "#C9A84C" : "#B8922A",
    green:   isDark ? "#22C55E" : "#16A34A",
    red:     isDark ? "#EF4444" : "#DC2626",
    btnText: isDark ? "#070C17" : "#FFFFFF",
  };

  useEffect(() => {
    const id = setInterval(() => {
      setPrices((prev) =>
        prev.map((p) => {
          const delta = (Math.random() - 0.48) * 0.0004;
          const base = parseFloat(p.price.replace(",", ""));
          const next = (base + delta).toFixed(p.pair.includes("JPY") || p.pair.includes("XAU") ? 2 : 4);
          const pct = ((delta / base) * 100).toFixed(2);
          return { ...p, price: next, change: `${delta >= 0 ? "+" : ""}${pct}%`, up: delta >= 0 };
        })
      );
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: c.bg }}>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ backgroundColor: c.bg }}>
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `rgba(201,168,76,0.05)`, filter: "blur(100px)", transform: "translateX(-50%)" }} />

        <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
                style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.green, opacity: 0.81 }} />
                <span className="text-xs tracking-[0.6px] uppercase" style={{ color: c.gold }}>Markets Open · Live Data</span>
              </div>

              <h1 className="mb-5 leading-tight" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>
                <span className="block" style={{ color: c.fg, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: "1.1" }}>Navigate Markets</span>
                <span className="block" style={{ color: c.gold, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: "1.1" }}>with Confidence</span>
              </h1>

              <p className="text-base leading-relaxed mb-8 max-w-[448px]" style={{ color: c.fgDim }}>
                Real-time forex intelligence, verified broker rankings, economic calendar, and trader education — all in one platform built for serious traders.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/brokers"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.gold, color: c.btnText }}>
                  Explore Brokers <ArrowRight size={13} />
                </Link>
                <Link to="/scam-alerts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-opacity hover:opacity-80"
                  style={{ color: "#FF6467", border: "1px solid rgba(255,100,103,0.25)" }}>
                  Check Scam Alerts <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Live rates panel */}
            <div className="w-full lg:w-[420px] shrink-0 rounded-xl overflow-hidden"
              style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${c.border}` }}>
                <span className="text-xs tracking-wider uppercase" style={{ color: c.fgMid }}>Live Rates</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: c.green }} />
                  <span className="text-[10px] tracking-[0.6px] uppercase" style={{ color: c.green }}>Live</span>
                </div>
              </div>
              {prices.map((p, i) => (
                <div key={p.pair} className="flex items-center gap-3 px-4 py-3"
                  style={{ borderBottom: i < prices.length - 1 ? `1px solid ${c.border}` : "none" }}>
                  <span className="w-[80px] shrink-0 text-xs tracking-[0.6px] uppercase" style={{ color: c.fgDim }}>{p.pair}</span>
                  <SparkLine fillPath={p.fill} linePath={p.line} color={p.up ? c.green : c.red} />
                  <div className="w-[80px] shrink-0 text-right">
                    <div className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: c.fg }}>{p.price}</div>
                    <div className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: p.up ? c.green : c.red }}>{p.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Key Events */}
      <section className="py-14" style={{ backgroundColor: c.bg }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs tracking-[0.6px] uppercase mb-1" style={{ color: c.gold }}>From the Calendar</p>
              <h2 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg }}>{"Today's Key Events"}</h2>
            </div>
            <Link to="/calendar" className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity" style={{ color: c.gold }}>
              Full Calendar <ArrowRight size={11} />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${c.border}` }}>
            <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] tracking-[0.5px] uppercase"
              style={{ backgroundColor: c.muted, borderBottom: `1px solid ${c.border}`, color: c.fgDim }}>
              <span className="col-span-2">Time</span>
              <span className="col-span-2">CCY</span>
              <span className="col-span-5">Event</span>
              <span className="col-span-1 text-center">Impact</span>
              <span className="col-span-2 text-right">Forecast</span>
            </div>
            {calendarEvents.map((ev, i) => (
              <Link key={ev.event} to="/calendar"
                className="grid grid-cols-12 px-5 py-3 items-center transition-opacity hover:opacity-80"
                style={{ borderBottom: i < calendarEvents.length - 1 ? `1px solid ${c.border}` : "none", backgroundColor: c.card }}>
                <span className="col-span-2 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: c.fgMid }}>{ev.time}</span>
                <span className="col-span-2 text-xs" style={{ color: c.fg }}>{ev.flag} {ev.ccy}</span>
                <span className="col-span-5 text-xs" style={{ color: c.fgMid }}>{ev.event}</span>
                <div className="col-span-1 flex justify-center">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.red }} />
                </div>
                <span className="col-span-2 text-right text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: c.fgDim }}>{ev.forecast}</span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-[11px]" style={{ color: c.fgDim }}>
            Click any event on the{" "}
            <Link to="/calendar" className="hover:underline" style={{ color: c.gold }}>Calendar</Link>
            {" "}page to reveal deep Specs + History panels.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-14" style={{ backgroundColor: c.card, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs tracking-[0.6px] uppercase mb-1" style={{ color: c.gold }}>Market Intelligence</p>
              <h2 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg }}>Latest News</h2>
            </div>
            <Link to="/news" className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity" style={{ color: c.gold }}>
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newsArticles.map((article) => (
              <Link key={article.slug} to={`/news/${article.slug}`}
                className="rounded-xl overflow-hidden flex flex-col group transition-opacity hover:opacity-90"
                style={{ backgroundColor: c.muted, border: `1px solid ${c.border}` }}>
                <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: c.accent }}>
                  {article.img ? (
                    <ImageWithFallback src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: c.border }}>
                        <span className="text-xs" style={{ color: c.fgDim }}>{article.category[0]}</span>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-medium tracking-wider"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", color: c.gold, border: "1px solid rgba(201,168,76,0.3)" }}>
                    {article.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-medium leading-snug mb-2 line-clamp-2" style={{ color: c.fg }}>{article.title}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3 flex-1" style={{ color: c.fgDim }}>{article.excerpt}</p>
                  <div className="flex items-center justify-between text-[10px]" style={{ color: c.fgDim }}>
                    <span>{article.author}</span>
                    <span>{article.time}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Top Brokers */}
      <section className="py-14" style={{ backgroundColor: c.bg, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs tracking-[0.6px] uppercase mb-1" style={{ color: c.gold }}>Broker Rankings</p>
              <h2 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg }}>Verified Top Brokers</h2>
            </div>
            <Link to="/brokers" className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity" style={{ color: c.gold }}>
              View All <ArrowRight size={11} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brokers.map((broker) => (
              <div key={broker.slug} className="rounded-xl p-5 flex flex-col gap-4"
                style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ backgroundColor: broker.color, color: "#FFFFFF" }}>
                      {broker.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium" style={{ color: c.fg }}>{broker.name}</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 13 13">
                          <path d={svgPaths.p210875c0} stroke={c.green} strokeWidth="1.083" strokeLinecap="round" strokeLinejoin="round" />
                          <path d={svgPaths.p13bbe000} stroke={c.green} strokeWidth="1.083" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        {broker.regs.map((r) => (
                          <span key={r} className="text-[10px] px-1.5 py-px rounded" style={{ color: c.fgDim, backgroundColor: c.muted }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: "rgba(201,168,76,0.1)", color: c.gold }}>
                    {broker.badge}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: broker.rating.toFixed(1), label: "Rating", isRating: true },
                    { val: broker.spread,  label: "Spread"   },
                    { val: broker.leverage,label: "Leverage" },
                  ].map(({ val, label, isRating }) => (
                    <div key={label} className="rounded-lg p-2 text-center" style={{ backgroundColor: c.muted }}>
                      {isRating ? (
                        <>
                          <StarRating rating={parseFloat(val)} emptyColor={c.border} />
                          <div className="text-[10px] mt-1" style={{ color: c.fgMid }}>{val}</div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: c.fg }}>{val}</div>
                          <div className="text-[10px] mt-0.5" style={{ color: c.fgDim }}>{label}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <Link to={`/brokers/${broker.slug}`}
                  className="w-full text-center py-2 rounded-md text-xs transition-opacity hover:opacity-80"
                  style={{ color: c.gold, border: `1px solid rgba(201,168,76,0.25)` }}>
                  View Full Profile
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px]" style={{ color: c.fgDim }}>* Affiliate disclosure — some broker links may earn a commission.</p>
        </div>
      </section>

      {/* Academy + Scam Alerts */}
      <section className="py-14" style={{ backgroundColor: c.card, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="rounded-xl p-6 flex flex-col gap-4" style={{ backgroundColor: c.muted, border: `1px solid ${c.border}` }}>
              <div>
                <p className="text-[10px] tracking-[0.6px] uppercase mb-1" style={{ color: c.gold }}>Free Education</p>
                <h3 className="text-lg leading-snug" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg }}>
                  Start with Free<br />Structured Learning Paths
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: c.fgDim }}>
                From absolute beginner to advanced technical trader — free video lessons, learning paths, and quizzes with no signup required.
              </p>
              <div className="space-y-2">
                {[
                  { label: "FX Foundations",     count: "6 lessons", color: "#22C55E" },
                  { label: "Technical Trader",   count: "6 lessons", color: "#3B82F6" },
                  { label: "Risk & Psychology",  count: "6 lessons", color: "#A78BFA" },
                ].map((path) => (
                  <div key={path.label} className="flex items-center justify-between px-3 py-2 rounded-lg"
                    style={{ backgroundColor: c.accent, border: `1px solid ${c.border}` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 rounded-full" style={{ backgroundColor: path.color }} />
                      <span className="text-xs" style={{ color: c.fg }}>{path.label}</span>
                    </div>
                    <span className="text-[10px]" style={{ color: c.fgDim }}>{path.count}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Link to="/academy" className="px-4 py-2 rounded-md text-xs font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: c.gold, color: c.btnText }}>Start Learning Free</Link>
                <Link to="/academy" className="px-4 py-2 rounded-md text-xs transition-opacity hover:opacity-80"
                  style={{ color: c.fgMid, border: `1px solid ${c.border}` }}>Browse All Lessons</Link>
              </div>
            </div>

            <div className="rounded-xl p-6 flex flex-col gap-4"
              style={{ backgroundColor: c.muted, border: "1px solid rgba(251,44,54,0.15)" }}>
              <div>
                <p className="text-[10px] tracking-[0.6px] uppercase mb-1" style={{ color: "#FF6467" }}>Fraud Protection</p>
                <h3 className="text-lg leading-snug" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg }}>Recent Broker Alerts</h3>
              </div>
              <div className="space-y-2">
                {scamAlerts.map((alert) => (
                  <div key={alert.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                    style={{ backgroundColor: c.accent, border: `1px solid ${c.border}` }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: alert.severity === "critical" ? c.red : "#F59E0B" }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium" style={{ color: c.fg }}>{alert.name}</div>
                      <div className="text-[10px]" style={{ color: c.fgDim }}>{alert.type}</div>
                    </div>
                    <div className="text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0"
                      style={{ backgroundColor: alert.severity === "critical" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", color: alert.severity === "critical" ? c.red : "#F59E0B" }}>
                      {alert.severity}
                    </div>
                    <span className="text-[10px] shrink-0" style={{ color: c.fgDim }}>{alert.date}</span>
                  </div>
                ))}
              </div>
              <Link to="/scam-alerts"
                className="inline-flex items-center gap-2 text-xs transition-opacity hover:opacity-80"
                style={{ color: "#FF6467", border: "1px solid rgba(251,44,54,0.25)", padding: "8px 16px", borderRadius: 6, width: "fit-content" }}>
                View all alerts <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium upsell */}
      <section className="py-14" style={{ backgroundColor: c.bg, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="rounded-2xl overflow-hidden relative" style={{ backgroundColor: c.card, border: `1px solid ${c.border}` }}>
            <div className="absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
              style={{ background: "rgba(201,168,76,0.05)", filter: "blur(80px)" }} />
            <div className="relative flex flex-col lg:flex-row gap-8 p-12">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={14} style={{ color: c.gold }} />
                  <span className="text-xs tracking-[0.6px] uppercase" style={{ color: c.gold }}>Premium Membership</span>
                </div>
                <h2 className="mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, color: c.fg, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.3 }}>
                  Unlock the Full<br />Trading Edge
                </h2>
                <p className="text-sm leading-relaxed mb-6 max-w-[420px]" style={{ color: c.fgDim }}>
                  Ad-free experience, advanced analytics, personalized alerts, priority broker research, and access to our pro trader community.
                </p>
                <div className="flex gap-3">
                  <Link to="/premium" className="px-5 py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-90"
                    style={{ backgroundColor: c.gold, color: c.btnText }}>Start Free Trial</Link>
                  <Link to="/premium" className="px-5 py-2.5 rounded-md text-sm transition-opacity hover:opacity-80"
                    style={{ color: c.fgMid, border: `1px solid ${c.border}` }}>View Plans</Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:w-[500px] shrink-0">
                {premiumFeatures.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ backgroundColor: c.muted, border: `1px solid ${c.border}` }}>
                    <Icon size={18} style={{ color: c.gold }} />
                    <div className="text-xs font-medium" style={{ color: c.fg }}>{title}</div>
                    <div className="text-[11px] leading-relaxed" style={{ color: c.fgDim }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer stats */}
      <div style={{ backgroundColor: c.card, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-4">
            {[
              { val: "10,000+", label: "Active Traders"   },
              { val: "200+",    label: "Brokers Listed"   },
              { val: "50+",     label: "Countries"        },
              { val: "24/7",    label: "Market Coverage"  },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="text-2xl font-normal mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: c.gold }}>{val}</div>
                <div className="text-[10px] tracking-[0.6px] uppercase" style={{ color: c.fgDim }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
