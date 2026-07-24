import { useState } from "react";
import { Link } from "react-router";
import { MessageSquare, ThumbsUp, Eye, Clock, Pin, TrendingUp, Search, PlusCircle, ChevronRight, Flame } from "lucide-react";

const categories = [
  { id: "all", label: "All", count: 847 },
  { id: "analysis", label: "Market Analysis", count: 312 },
  { id: "strategies", label: "Strategies", count: 198 },
  { id: "brokers", label: "Brokers", count: 145 },
  { id: "beginners", label: "Beginners", count: 121 },
  { id: "news", label: "News & Events", count: 71 },
];

const threads = [
  { id: 1, pinned: true, category: "Analysis", title: "Weekly Thread: EUR/USD — Are we breaking 1.09 this week?", author: "Ahmed_FX", authorBadge: "Pro Trader", replies: 87, views: 2341, likes: 64, time: "2h ago", hot: true, excerpt: "With NFP coming up and Powell sounding dovish yesterday, I'm watching the 1.0880 level closely. If we can close above it on the daily..." },
  { id: 2, pinned: false, category: "Brokers", title: "IC Markets vs Pepperstone for scalping — personal experience after 6 months", author: "ScalperKing92", authorBadge: "Verified Trader", replies: 53, views: 1890, likes: 47, time: "4h ago", hot: true, excerpt: "I've been running both accounts side by side with the same EA for 6 months. Here are my real execution stats..." },
  { id: 3, pinned: false, category: "Strategies", title: "My modified RSI divergence system — 68% win rate over 200 trades", author: "PriceActionPro", authorBadge: "Member", replies: 41, views: 1205, likes: 89, time: "6h ago", hot: false, excerpt: "After backtesting this across EUR/USD, GBP/USD, and USD/JPY on the H4 chart for the past 2 years, I'm sharing the full rules..." },
  { id: 4, pinned: false, category: "Beginners", title: "I blew my first account. Here's everything I learned.", author: "NewTrader2025", authorBadge: "Member", replies: 112, views: 4521, likes: 203, time: "1d ago", hot: true, excerpt: "I deposited $500, over-leveraged, ignored my stop losses, and lost it all in 3 days. I'm sharing this so you don't make the same mistakes..." },
  { id: 5, pinned: false, category: "News", title: "FOMC preview: What's actually priced in vs what could surprise", author: "MacroMaven", authorBadge: "Analyst", replies: 29, views: 876, likes: 38, time: "1d ago", hot: false, excerpt: "The market is pricing 72% probability of a September cut. But looking at the language and the data, here's what I think actually happens..." },
  { id: 6, pinned: false, category: "Analysis", title: "Gold technical update — the $2,400 breakout trade setup", author: "GoldBull_FX", authorBadge: "Pro Trader", replies: 35, views: 1102, likes: 55, time: "2d ago", hot: false, excerpt: "XAU/USD is forming a textbook flag pattern on the daily. If oil and geopolitical tension continues, here's my full trade plan..." },
  { id: 7, pinned: false, category: "Brokers", title: "WARNING: FX Prime Global — they've held my $4,200 for 3 months", author: "Victim_Alert88", authorBadge: "Member", replies: 78, views: 5231, likes: 142, time: "3d ago", hot: true, excerpt: "I submitted a withdrawal on March 12. It's now June. Support goes silent after one reply. I have screenshots of every communication..." },
];

const categoryColors: Record<string, string> = {
  Analysis: "#C9A84C",
  Brokers: "#3B82F6",
  Strategies: "#22C55E",
  Beginners: "#A78BFA",
  News: "#F97316",
};

export function ForumPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const filtered = threads.filter((t) => {
    const matchCat = activeCategory === "all" || t.category.toLowerCase() === activeCategory;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Community</span>
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}>Trader Forum</h1>
              <p className="text-[#6E7489] text-sm">Discuss markets, strategies, and brokers with 10,000+ traders worldwide.</p>
            </div>
            <button onClick={() => setShowNewThread(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors shrink-0">
              <PlusCircle size={14} /> New Thread
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* New thread modal */}
        {showNewThread && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#0E0F17] rounded-2xl border border-[#1C1E2B] p-6">
              <h3 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Start a New Thread</h3>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Thread title..." className="w-full px-4 py-3 mb-3 bg-[#141622] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
              <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={5} placeholder="Share your analysis, question, or story..." className="w-full px-4 py-3 mb-4 bg-[#141622] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 resize-none" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowNewThread(false)} className="px-4 py-2 text-sm text-[#9AA0B4] border border-[#1C1E2B] rounded-lg hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors">Cancel</button>
                <button onClick={() => setShowNewThread(false)} className="px-4 py-2 text-sm bg-[#C9A84C] text-[#09090E] rounded-lg hover:bg-[#D4B55A] transition-colors">Post Thread</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7489]" />
              <input type="text" placeholder="Search threads..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2.5 bg-[#0E0F17] border border-[#1C1E2B] rounded-lg text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
            </div>
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1C1E2B] text-xs text-[#6E7489] uppercase tracking-wider">Categories</div>
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors border-b border-[#1C1E2B] last:border-0 ${activeCategory === cat.id ? "text-[#C9A84C] bg-[#C9A84C]/5" : "text-[#9AA0B4] hover:text-[#EEF0F6] hover:bg-[#141622]"}`}>
                  <span>{cat.label}</span>
                  <span className="text-[#6E7489]">{cat.count}</span>
                </button>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="text-xs text-[#6E7489] mb-3">Community Stats</div>
              {[["Members", "10,482"], ["Threads", "847"], ["Replies", "14,291"], ["Online now", "234"]].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between text-xs py-1">
                  <span className="text-[#9AA0B4]">{l}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thread list */}
          <div className="lg:col-span-3 space-y-3">
            {filtered.map((thread) => (
              <div key={thread.id} className={`p-4 rounded-xl bg-[#0E0F17] border transition-all hover:border-[#2A2D3E] group cursor-pointer ${thread.pinned ? "border-[#C9A84C]/20" : "border-[#1C1E2B]"}`}>
                {thread.pinned && (
                  <div className="flex items-center gap-1 text-xs text-[#C9A84C] mb-2">
                    <Pin size={10} /> Pinned
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#141622] border border-[#1C1E2B] flex items-center justify-center text-xs text-[#C9A84C] shrink-0">
                    {thread.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm text-[#EEF0F6] leading-snug group-hover:text-[#C9A84C] transition-colors">{thread.title}</h3>
                      {thread.hot && <Flame size={13} className="text-[#F97316] shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-xs text-[#6E7489] mb-2 line-clamp-1">{thread.excerpt}</p>
                    <div className="flex items-center gap-3 flex-wrap text-xs text-[#6E7489]">
                      <span className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: `${categoryColors[thread.category] || "#C9A84C"}18`, color: categoryColors[thread.category] || "#C9A84C" }}>{thread.category}</span>
                      <span>{thread.author}</span>
                      <span className="flex items-center gap-1"><Clock size={9} /> {thread.time}</span>
                      <span className="flex items-center gap-1 ml-auto"><MessageSquare size={9} /> {thread.replies}</span>
                      <span className="flex items-center gap-1"><Eye size={9} /> {thread.views}</span>
                      <span className="flex items-center gap-1"><ThumbsUp size={9} /> {thread.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
