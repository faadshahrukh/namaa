import { useState } from "react";
import { Link } from "react-router";
import {
  BookOpen, Play, CheckCircle, Lock, ChevronRight,
  Award, Users, Clock, Star, ArrowRight, Search, Filter
} from "lucide-react";

const freeVideos = [
  { id: 1, title: "What is Forex?", duration: "8:24", level: "Beginner", topic: "Basics", views: "142K", desc: "Understand the foreign exchange market, how currencies are traded, and why it's the world's largest market." },
  { id: 2, title: "Reading Candlestick Charts", duration: "12:15", level: "Beginner", topic: "Charts", views: "98K", desc: "Master the language of candlestick charts — open, high, low, close, and what each pattern signals." },
  { id: 3, title: "Risk Management 101", duration: "15:40", level: "Beginner", topic: "Risk", views: "203K", desc: "The 1% rule, stop-loss placement, and position sizing — why this is the most important skill in trading." },
  { id: 4, title: "Using the Economic Calendar", duration: "9:55", level: "Beginner", topic: "Tools", views: "76K", desc: "How to read the calendar, understand impact levels, and trade around high-impact events like NFP and CPI." },
  { id: 5, title: "Technical Analysis Basics", duration: "18:30", level: "Intermediate", topic: "Charts", views: "87K", desc: "Support and resistance, trend lines, chart patterns, and how to combine multiple indicators for better signals." },
  { id: 6, title: "Fundamental Analysis in Forex", duration: "20:12", level: "Intermediate", topic: "Fundamentals", views: "64K", desc: "Interest rates, central bank policy, inflation data — how macroeconomic forces drive currency movements." },
  { id: 7, title: "Trading Psychology", duration: "22:05", level: "Intermediate", topic: "Psychology", views: "119K", desc: "The emotional traps that destroy accounts — fear, greed, revenge trading, and how professional traders think." },
  { id: 8, title: "Chart Patterns Masterclass", duration: "25:48", level: "Advanced", topic: "Charts", views: "55K", desc: "Head & shoulders, double tops, flags, wedges, and how to trade each pattern with a precise risk/reward plan." },
];

const learningPaths = [
  {
    id: 1,
    title: "FX Foundations",
    subtitle: "Path 1",
    description: "The complete beginner curriculum — from what forex is to placing your first trade with proper risk management.",
    lessons: ["What is Forex?", "Reading Candlestick Charts", "Risk Management 101", "Using the Economic Calendar", "Your First Trade Setup"],
    count: 6,
    duration: "~2.5 hours",
    level: "Beginner",
    color: "#22C55E",
  },
  {
    id: 2,
    title: "Technical Trader",
    subtitle: "Path 2",
    description: "Build a complete technical analysis skillset — chart reading, pattern recognition, and indicator-based entries.",
    lessons: ["Technical Analysis Basics", "Chart Patterns Masterclass", "Moving Averages Deep Dive", "RSI & MACD in Practice", "Building a Trading System"],
    count: 6,
    duration: "~3.5 hours",
    level: "Intermediate",
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "Risk & Psychology",
    subtitle: "Path 3",
    description: "The mental and mathematical framework that separates professional traders from gamblers.",
    lessons: ["Trading Psychology", "Risk Management 101", "Position Sizing Mastery", "Managing Drawdowns", "Building a Trading Journal"],
    count: 6,
    duration: "~4 hours",
    level: "All Levels",
    color: "#A78BFA",
  },
];

const levels = [
  { id: "preschool", title: "Preschool", subtitle: "Forex Fundamentals", color: "#22C55E", lessons: 12, duration: "4 hours", students: "24,891",
    description: "What is forex? Currency pairs, market structure, and how trading works. No experience required.",
    topics: ["What is Forex?", "Major Currency Pairs", "How to Read Quotes", "Pips and Lots", "Market Sessions", "Your First Trade"] },
  { id: "elementary", title: "Elementary", subtitle: "Building Your Foundation", color: "#3B82F6", lessons: 18, duration: "7 hours", students: "19,234",
    description: "Order types, leverage, risk management basics, and understanding charts.",
    topics: ["Order Types", "Leverage & Margin", "Support & Resistance", "Trend Lines", "Basic Candlesticks", "Risk/Reward Ratios"] },
  { id: "intermediate", title: "Intermediate", subtitle: "Technical & Fundamental", color: "#C9A84C", lessons: 24, duration: "12 hours", students: "12,045",
    description: "Moving averages, oscillators, fundamental analysis, central bank policy, and building a trading plan.",
    topics: ["Moving Averages", "RSI & MACD", "Fibonacci Retracements", "Central Banks", "Economic Indicators", "Trading Psychology"] },
  { id: "advanced", title: "Advanced", subtitle: "Pro Strategies & Systems", color: "#A78BFA", lessons: 28, duration: "18 hours", students: "7,821",
    description: "Advanced price action, multi-timeframe analysis, and professional risk management.",
    topics: ["Price Action Mastery", "SMC/ICT Concepts", "Institutional Order Flow", "Backtesting", "Portfolio Management", "Automation Basics"] },
];

const levelColors: Record<string, string> = { Beginner: "#22C55E", Intermediate: "#C9A84C", Advanced: "#A78BFA", "All Levels": "#6B8AAD" };

export function AcademyPage() {
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("All");
  const [filterTopic, setFilterTopic] = useState("All");
  const [activeLevel, setActiveLevel] = useState("preschool");
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  const levelOpts = ["All", "Beginner", "Intermediate", "Advanced"];
  const topicOpts = ["All", "Basics", "Charts", "Risk", "Tools", "Fundamentals", "Psychology"];

  const filteredVideos = freeVideos.filter((v) => {
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.desc.toLowerCase().includes(search.toLowerCase());
    const matchLevel = filterLevel === "All" || v.level === filterLevel;
    const matchTopic = filterTopic === "All" || v.topic === filterTopic;
    return matchSearch && matchLevel && matchTopic;
  });

  const active = levels.find((l) => l.id === activeLevel)!;

  return (
    <div className="pt-16 min-h-screen">

      {/* 1. HERO — Free education proposition */}
      <section className="bg-[#0B1F3A] border-b border-[#1A3A66]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Trading Academy</span>
          </div>
          <h1 className="text-[#F5F7FA] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Learn Financial Markets —{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Free.</em>
          </h1>
          <p className="text-[#6B8AAD] text-sm max-w-xl leading-relaxed mb-6">
            Beginner to advanced video lessons with no cost and no signup wall. Structured learning paths, quizzes, and certifications — built for Arabic-speaking traders and the global retail FX audience.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#6B8AAD]">
            <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-[#22C55E]" /> 100% Free — No signup required</div>
            <div className="flex items-center gap-1.5"><Users size={12} className="text-[#C9A84C]" /> 64,000+ students enrolled</div>
            <div className="flex items-center gap-1.5"><Star size={12} className="text-[#C9A84C]" /> 4.8/5 average rating</div>
            <div className="flex items-center gap-1.5"><BookOpen size={12} className="text-[#C9A84C]" /> 82 lessons · 8 free videos</div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="border-b border-[#1C1E2B] bg-[#0E0F17] sticky top-[68px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[180px] flex-1">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6E7489]" />
            <input type="text" placeholder="Search lessons..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 bg-[#141622] border border-[#1C1E2B] rounded text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Filter size={11} className="text-[#6E7489]" />
            <span className="text-[#6E7489] mr-1">Level:</span>
            {levelOpts.map((l) => (
              <button key={l} onClick={() => setFilterLevel(l)}
                className={`px-2 py-1 rounded transition-colors ${filterLevel === l ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#6E7489] mr-1">Topic:</span>
            {topicOpts.map((t) => (
              <button key={t} onClick={() => setFilterTopic(t)}
                className={`px-2 py-1 rounded transition-colors ${filterTopic === t ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* 3. FREE VIDEO LIBRARY */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Free Video Library</div>
              <h2 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>
                Watch Free — No Signup Required
              </h2>
            </div>
            <span className="text-xs text-[#6E7489]">{filteredVideos.length} videos</span>
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-10 text-[#6E7489] text-sm">No videos match your filters.</div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className="rounded-xl border border-[#1C1E2B] bg-[#0E0F17] overflow-hidden hover:border-[#C9A84C]/30 transition-colors group">
                {/* Thumbnail */}
                <div
                  className="relative h-36 bg-[#141622] flex items-center justify-center cursor-pointer"
                  onClick={() => setPlayingVideo(playingVideo === video.id ? null : video.id)}
                >
                  {playingVideo === video.id ? (
                    <div className="absolute inset-0 bg-[#0B1F3A] flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center">
                        <div className="w-2 h-4 border-l-2 border-r-2 border-[#C9A84C]" />
                      </div>
                      <span className="text-[10px] text-[#C9A84C]">Playing...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={18} className="text-[#C9A84C] ml-0.5" />
                      </div>
                      <div className="absolute bottom-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white">{video.duration}</div>
                    </>
                  )}
                  <div className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-[#22C55E]/90 text-white font-medium">FREE</div>
                </div>
                {/* Meta */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `${levelColors[video.level]}18`, color: levelColors[video.level] }}>
                      {video.level}
                    </span>
                    <span className="text-[10px] text-[#6E7489]">{video.topic}</span>
                    <span className="ml-auto text-[10px] text-[#6E7489]">{video.views} views</span>
                  </div>
                  <h4 className="text-sm text-[#EEF0F6] leading-snug mb-2">{video.title}</h4>
                  <p className="text-xs text-[#6E7489] leading-relaxed line-clamp-2">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. STRUCTURED LEARNING PATHS */}
        <section className="mb-14">
          <div className="mb-6">
            <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Structured Learning Paths</div>
            <h2 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>
              Guided Curricula — Free
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {learningPaths.map((path) => (
              <div key={path.id} className="rounded-xl border border-[#1C1E2B] bg-[#0E0F17] p-6 hover:border-opacity-50 transition-colors"
                style={{ borderColor: `${path.color}25` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: path.color }}>{path.subtitle}</div>
                    <h3 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.2rem" }}>{path.title}</h3>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded border text-[#22C55E] border-[#22C55E]/30 bg-[#22C55E]/8 shrink-0">Free</span>
                </div>
                <p className="text-xs text-[#6E7489] leading-relaxed mb-4">{path.description}</p>
                <div className="space-y-1.5 mb-5">
                  {path.lessons.map((lesson, i) => (
                    <div key={lesson} className="flex items-center gap-2 text-xs text-[#9AA0B4]">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0" style={{ backgroundColor: `${path.color}20`, color: path.color }}>
                        {i + 1}
                      </span>
                      {lesson}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#6E7489] mb-4">
                  <span>{path.count} lessons</span>
                  <span>·</span>
                  <Clock size={10} />
                  <span>{path.duration}</span>
                  <span>·</span>
                  <span style={{ color: levelColors[path.level] }}>{path.level}</span>
                </div>
                <button className="w-full py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: `${path.color}20`, color: path.color, border: `1px solid ${path.color}30` }}>
                  <Play size={11} /> Start Path
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. LEVEL SELECTOR (existing structured levels) */}
        <section className="mb-14">
          <div className="mb-6">
            <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">Structured Levels</div>
            <h2 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>
              Full Curriculum — Preschool to Advanced
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {levels.map((level) => (
              <button key={level.id} onClick={() => setActiveLevel(level.id)}
                className="text-left p-4 rounded-xl border transition-all"
                style={activeLevel === level.id
                  ? { borderColor: `${level.color}50`, backgroundColor: `${level.color}08` }
                  : { borderColor: "#1C1E2B", backgroundColor: "#0E0F17" }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: activeLevel === level.id ? level.color : "#6E7489" }}>
                  {level.title}
                </div>
                <div className="text-xs text-[#EEF0F6] mb-2">{level.subtitle}</div>
                <div className="text-xs text-[#6E7489]">{level.lessons} lessons · {level.duration}</div>
              </button>
            ))}
          </div>

          <div className="rounded-xl border p-6" style={{ borderColor: `${active.color}25`, backgroundColor: `${active.color}05` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: active.color }}>{active.title} · {active.subtitle}</div>
                <p className="text-sm text-[#9AA0B4] max-w-lg">{active.description}</p>
              </div>
              <div className="text-xs text-[#6E7489] flex items-center gap-1 shrink-0 ml-4"><Users size={11} /> {active.students}</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
              {active.topics.map((topic, i) => (
                <div key={topic} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#09090E]/60">
                  {i < 3 ? <CheckCircle size={12} style={{ color: active.color }} /> : <Lock size={12} className="text-[#6E7489]" />}
                  <span className="text-xs text-[#9AA0B4]">{topic}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link to={`/academy/${active.id}`}
                className="px-5 py-2.5 rounded-md text-sm text-[#09090E] flex items-center gap-2 hover:brightness-110 transition-all"
                style={{ backgroundColor: active.color }}>
                <Play size={13} /> Start Level
              </Link>
              <Link to={`/academy/${active.id}`} className="px-4 py-2.5 rounded-md text-sm border border-[#1C1E2B] text-[#9AA0B4] hover:text-[#EEF0F6] transition-colors">
                View Syllabus
              </Link>
            </div>
          </div>
        </section>

        {/* 6. PREMIUM UPSELL BANNER */}
        <section className="rounded-2xl border border-[#C9A84C]/20 bg-[#0B1F3A] p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-2">Go Premium</div>
            <h2 className="text-[#F5F7FA] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)" }}>
              Certified Courses + 1:1 Mentorship
            </h2>
            <p className="text-[#6B8AAD] text-sm leading-relaxed max-w-lg mb-4">
              Go beyond the free library with certified, certificate-bearing courses, live mentorship sessions, advanced strategy modules, and an ad-free experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Certificate on completion", "Live mentor sessions", "Advanced strategy modules", "Ad-free experience", "Priority support"].map((f) => (
                <span key={f} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-[#C9A84C]/20 text-[#6B8AAD]">
                  <CheckCircle size={10} className="text-[#C9A84C]" /> {f}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0 text-center">
            <Link to="/premium"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium mb-2 block"
              style={{ backgroundColor: "#C9A84C", color: "#060F1E", boxShadow: "0 0 20px rgba(201,168,76,0.25)" }}>
              View Premium Plans <ArrowRight size={14} />
            </Link>
            <p className="text-[10px] text-[#6B8AAD]">Phase 1 — Join the waitlist</p>
          </div>
        </section>
      </div>
    </div>
  );
}
