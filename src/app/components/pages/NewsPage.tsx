import { useEffect, useState } from "react";
import { getCmsNews } from "@/hooks/useCms";
import { Link } from "react-router";
import { listNewsPosts } from "@/lib/content.functions";
import {
  Search, Clock, TrendingUp, Bookmark, Share2,
  MessageSquare, ChevronRight, Play, ArrowRight
} from "lucide-react";

const categories = ["All", "Forex", "Central Banks", "Commodities", "Crypto", "Geopolitics", "Equities", "Analysis"];

function timeAgo(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const diff = Date.now() - d.getTime();
  const h = Math.floor(diff / 3600000);
  return h < 1 ? "just now" : h < 24 ? `${h}h ago` : `${Math.floor(h / 24)}d ago`;
}

const staticNews = getCmsNews().map((a) => ({
  id: `cms-${a.id}`,
  slug: a.slug,
  category: a.category,
  title: a.title,
  excerpt: a.excerpt,
  author: a.author,
  time: timeAgo(a.publishedAt),
  readTime: `${a.readTime} read`,
  comments: 0,
  bookmarks: 0,
  featured: a.featured,
  image: a.imageUrl,
}));

const videos = [
  { title: "Weekly Market Outlook — June 16, 2025", duration: "18:42", views: "12.4K" },
  { title: "EUR/USD Technical Deep Dive", duration: "09:15", views: "8.2K" },
  { title: "Trading NFP: A Complete Guide", duration: "24:30", views: "21.1K" },
];

const categoryColors: Record<string, string> = {
  "Central Banks": "#A78BFA",
  Forex: "#C9A84C",
  Commodities: "#F97316",
  Crypto: "#3B82F6",
  Analysis: "#22C55E",
  Geopolitics: "#EF4444",
  Equities: "#06B6D4",
};

type NewsItem = (typeof staticNews)[number];

export function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [dbNews, setDbNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    listNewsPosts().then((rows) => {
      const mapped: NewsItem[] = (rows as any[])
        .filter((r) => r.published)
        .map((r) => ({
          id: `db-${r.id}`,
          slug: r.slug,
          category: r.category ?? "Forex",
          title: r.title,
          excerpt: r.excerpt ?? "",
          author: r.author ?? "Namaa Team",
          time: timeAgo(r.published_at),
          readTime: `${r.read_time ?? "5 min"} read`,
          comments: 0,
          bookmarks: 0,
          featured: !!r.featured,
          image: r.image_url ?? "",
        }));
      setDbNews(mapped);
    }).catch(() => {});
  }, []);

  const news: NewsItem[] = [...dbNews, ...staticNews];

  const filtered = news.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Market Intelligence</span>
          </div>
          <h1
            className="text-[#EEF0F6] mb-2"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            News & Analysis
          </h1>
          <p className="text-[#6E7489] text-sm">
            Real-time forex, commodities, and macro news with in-depth market analysis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search + Categories */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative w-full sm:w-72">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7489]" />
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-[#0E0F17] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors ${
                  activeCategory === c
                    ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                    : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Featured article */}
            {featured && (
              <Link to={`/news/${featured.slug}`} className="block rounded-xl overflow-hidden bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group cursor-pointer">
                {featured.image && (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090E]/80 to-transparent" />
                    <span
                      className="absolute bottom-3 left-4 text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${categoryColors[featured.category] || "#C9A84C"}25`,
                        color: categoryColors[featured.category] || "#C9A84C",
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-[#C9A84C] text-[#09090E] text-xs px-2 py-0.5 rounded">
                      Featured
                    </span>
                  </div>
                )}
                <div className="p-5">
                  <h2
                    className="text-[#EEF0F6] mb-2 group-hover:text-[#C9A84C] transition-colors leading-snug"
                    style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.1rem" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-xs text-[#6E7489] leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[#6E7489]">
                    <span>{featured.author}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {featured.time}</span>
                    <span>{featured.readTime}</span>
                    <div className="ml-auto flex items-center gap-3">
                      <button className="flex items-center gap-1 hover:text-[#EEF0F6] transition-colors">
                        <MessageSquare size={12} /> {featured.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#EEF0F6] transition-colors">
                        <Bookmark size={12} /> {featured.bookmarks}
                      </button>
                      <button className="hover:text-[#EEF0F6] transition-colors">
                        <Share2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* News list */}
            {rest.map((article) => (
              <Link to={`/news/${article.slug}`}
                key={article.id}
                className="flex gap-4 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `${categoryColors[article.category] || "#C9A84C"}18`,
                        color: categoryColors[article.category] || "#C9A84C",
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-[#6E7489] flex items-center gap-1">
                      <Clock size={9} /> {article.time}
                    </span>
                  </div>
                  <h3
                    className="text-[#9AA0B4] mb-1 leading-snug group-hover:text-[#EEF0F6] transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#6E7489] mt-2">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                    <div className="ml-auto flex items-center gap-2">
                      <button className="flex items-center gap-1 hover:text-[#9AA0B4] transition-colors">
                        <MessageSquare size={11} /> {article.comments}
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#9AA0B4] transition-colors">
                        <Bookmark size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video section */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1C1E2B]">
                <span className="text-xs text-[#EEF0F6]">Video & Webinars</span>
                <button className="text-xs text-[#C9A84C] hover:underline flex items-center gap-0.5">
                  All <ChevronRight size={11} />
                </button>
              </div>
              <div className="divide-y divide-[#1C1E2B]">
                {videos.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-[#141622] transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-[#141622] border border-[#1C1E2B] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/10 transition-colors">
                      <Play size={14} className="text-[#C9A84C] ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#9AA0B4] leading-tight group-hover:text-[#EEF0F6] transition-colors truncate">{v.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#6E7489]">
                        <span>{v.duration}</span>
                        <span>·</span>
                        <span>{v.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most read */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1C1E2B]">
                <span className="text-xs text-[#EEF0F6]">Most Read Today</span>
              </div>
              <div className="divide-y divide-[#1C1E2B]">
                {news.slice(0, 5).map((n, i) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-[#141622] transition-colors cursor-pointer group">
                    <span
                      className="text-xl shrink-0 mt-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1C1E2B" }}
                    >
                      0{i + 1}
                    </span>
                    <p className="text-xs text-[#6E7489] leading-relaxed group-hover:text-[#9AA0B4] transition-colors line-clamp-2">
                      {n.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="rounded-xl bg-gradient-to-br from-[#141622] to-[#0E0F17] border border-[#C9A84C]/15 p-5">
              <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-2">Daily Briefing</div>
              <h4 className="text-[#EEF0F6] text-sm mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>
                Get the market brief every morning at 7 AM GMT
              </h4>
              <p className="text-xs text-[#6E7489] mb-4">Key events, overnight moves, and what to watch — in 5 minutes.</p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 mb-2 bg-[#09090E] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
              />
              <button className="w-full py-2 bg-[#C9A84C] text-[#09090E] rounded-md text-xs hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-1">
                Subscribe <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
