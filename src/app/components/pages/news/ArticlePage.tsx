import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, Clock, Bookmark, Share2, MessageSquare, Copy, ChevronRight, Calendar } from "lucide-react";
import { getArticleBySlug, articles } from "../../../data/news";

const categoryColors: Record<string, string> = {
  "Central Banks": "#A78BFA", Forex: "#C9A84C", Commodities: "#F97316",
  Crypto: "#3B82F6", Analysis: "#22C55E", Geopolitics: "#EF4444",
};

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getArticleBySlug(slug ?? "");
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comment, setComment] = useState("");

  if (!article) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <div className="text-[#6E7489] mb-4">Article not found.</div>
        <Link to="/news" className="text-[#C9A84C] hover:underline">← Back to News</Link>
      </div>
    );
  }

  const related = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const catColor = categoryColors[article.category] || "#C9A84C";

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#6E7489] mb-6">
          <Link to="/news" className="hover:text-[#EEF0F6] transition-colors">News</Link>
          <ChevronRight size={11} />
          <span style={{ color: catColor }}>{article.category}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs px-2.5 py-1 rounded" style={{ backgroundColor: `${catColor}18`, color: catColor }}>{article.category}</span>
          <span className="text-xs text-[#6E7489] flex items-center gap-1"><Clock size={10} /> {article.time}</span>
          <span className="text-xs text-[#6E7489]">{article.readTime}</span>
        </div>

        <h1 className="text-[#EEF0F6] mb-4 leading-tight" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
          {article.title}
        </h1>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#141622] border border-[#1C1E2B] flex items-center justify-center text-xs text-[#C9A84C]">
              {article.author[0]}
            </div>
            <div>
              <div className="text-xs text-[#EEF0F6]">{article.author}</div>
              <div className="text-xs text-[#6E7489]">{article.authorRole} · {article.publishedAt}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${bookmarked ? "border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/8" : "border-[#1C1E2B] text-[#6E7489] hover:text-[#9AA0B4]"}`}>
              <Bookmark size={12} /> {bookmarked ? "Saved" : "Save"}
            </button>
            <button onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1E2B] text-xs text-[#6E7489] hover:text-[#9AA0B4] transition-colors">
              <Copy size={12} /> {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        {article.image && (
          <div className="rounded-xl overflow-hidden mb-8 aspect-video bg-[#0E0F17]">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <p className="text-[#9AA0B4] text-base leading-relaxed mb-8 border-l-2 border-[#C9A84C] pl-4 italic">
          {article.excerpt}
        </p>

        <div className="space-y-5 mb-10">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-[#9AA0B4] text-sm leading-[1.85]">{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-[#141622] border border-[#1C1E2B] text-[#6E7489]">#{tag}</span>
          ))}
        </div>

        {article.relatedEvents && article.relatedEvents.length > 0 && (
          <div className="mb-8 p-4 rounded-xl bg-[#0E0F17] border border-[#C9A84C]/20">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={13} className="text-[#C9A84C]" />
              <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Related Events</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.relatedEvents.map((ev) => (
                <Link key={ev} to="/calendar" className="text-xs px-2.5 py-1 rounded-lg border border-[#1C1E2B] text-[#9AA0B4] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors">
                  {ev}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="mb-12">
          <h3 className="text-[#EEF0F6] text-sm mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>
            Discussion <span className="text-[#6E7489]">({article.comments})</span>
          </h3>
          <textarea
            placeholder="Share your analysis or reaction..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 mb-2 bg-[#0E0F17] border border-[#1C1E2B] rounded-xl text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 resize-none"
          />
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-[#C9A84C] text-[#09090E] rounded-lg text-xs hover:bg-[#D4B55A] transition-colors">Post Comment</button>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="text-[#EEF0F6] text-sm mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <Link key={a.id} to={`/news/${a.slug}`} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group">
                  <span className="text-xs px-1.5 py-0.5 rounded mb-2 inline-block" style={{ backgroundColor: `${categoryColors[a.category] || "#C9A84C"}18`, color: categoryColors[a.category] || "#C9A84C" }}>
                    {a.category}
                  </span>
                  <p className="text-xs text-[#9AA0B4] leading-relaxed group-hover:text-[#EEF0F6] transition-colors line-clamp-3">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
