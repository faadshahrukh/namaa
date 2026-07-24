import { useEffect, useState } from "react";
import { Play, Clock, User, Star, Search } from "lucide-react";
import { listTutorials } from "@/lib/content.functions";

interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string | null;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  featured: boolean;
  published: boolean;
  published_at: string;
}

const LEVEL_COLOR: Record<string, string> = {
  Beginner: "#22C55E",
  Intermediate: "#C9A84C",
  Advanced: "#EF4444",
};

function ytEmbedToId(url: string): string | null {
  const m = url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function thumbFor(t: Tutorial): string | null {
  if (t.thumbnail_url) return t.thumbnail_url;
  const id = ytEmbedToId(t.video_url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function TutorialsPage() {
  const [items, setItems] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Tutorial | null>(null);
  const [levelFilter, setLevelFilter] = useState<string>("All");

  useEffect(() => {
    listTutorials()
      .then((rows) => setItems(rows as Tutorial[]))
      .finally(() => setLoading(false));
  }, []);

  const visible = items
    .filter((t) => t.published)
    .filter((t) => (levelFilter === "All" ? true : t.level === levelFilter))
    .filter((t) =>
      q ? (t.title + " " + t.description + " " + t.category).toLowerCase().includes(q.toLowerCase()) : true,
    );

  const featured = visible.find((t) => t.featured) ?? visible[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="mb-8">
          <div className="text-[var(--gold)] text-xs uppercase tracking-widest mb-2">Namaa Academy</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.4rem" }}>Tutorial Videos</h1>
          <p className="text-[var(--muted-foreground)] mt-2 max-w-2xl">
            Learn forex, trading strategy, and market analysis through free, curated video lessons.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center mb-8">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tutorials…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm"
            />
          </div>
          {["All", "Beginner", "Intermediate", "Advanced"].map((lv) => (
            <button
              key={lv}
              onClick={() => setLevelFilter(lv)}
              className={`px-3.5 py-2 rounded-lg text-sm border transition-colors ${
                levelFilter === lv
                  ? "bg-[var(--gold)] text-[var(--primary-foreground)] border-transparent"
                  : "bg-transparent border-[var(--border)] text-[var(--foreground)] hover:border-[var(--gold)]"
              }`}
            >
              {lv}
            </button>
          ))}
        </div>

        {loading && <div className="text-[var(--muted-foreground)]">Loading tutorials…</div>}

        {!loading && featured && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)]">
            <div className="grid md:grid-cols-2 gap-0">
              <button
                onClick={() => setActive(featured)}
                className="relative aspect-video bg-black group"
              >
                {thumbFor(featured) && (
                  <img src={thumbFor(featured)!} alt={featured.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-2xl">
                    <Play size={28} className="text-[var(--primary-foreground)] ml-1" />
                  </div>
                </div>
              </button>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">Featured</span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${LEVEL_COLOR[featured.level] ?? "#666"}22`, color: LEVEL_COLOR[featured.level] ?? "#888" }}>
                    {featured.level}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">{featured.category}</span>
                </div>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.75rem" }}>{featured.title}</h2>
                <p className="text-[var(--muted-foreground)] mt-3 mb-5">{featured.description}</p>
                <div className="flex gap-4 text-xs text-[var(--muted-foreground)] mb-5">
                  <span className="flex items-center gap-1"><User size={12} /> {featured.instructor}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featured.duration}</span>
                </div>
                <button
                  onClick={() => setActive(featured)}
                  className="self-start px-5 py-2.5 bg-[var(--gold)] text-[var(--primary-foreground)] rounded-lg text-sm hover:opacity-90 transition"
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.filter((t) => t.id !== featured?.id).map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              className="text-left rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card)] hover:border-[var(--gold)] transition group"
            >
              <div className="relative aspect-video bg-black">
                {thumbFor(t) && (
                  <img src={thumbFor(t)!} alt={t.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold)] flex items-center justify-center">
                    <Play size={20} className="text-[var(--primary-foreground)] ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded bg-black/70 text-white flex items-center gap-1">
                  <Clock size={10} /> {t.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="flex gap-2 mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${LEVEL_COLOR[t.level] ?? "#666"}22`, color: LEVEL_COLOR[t.level] ?? "#888" }}>
                    {t.level}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">{t.category}</span>
                </div>
                <h3 className="font-medium mb-2 line-clamp-2">{t.title}</h3>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{t.description}</p>
                <div className="mt-3 text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                  <User size={11} /> {t.instructor}
                </div>
              </div>
            </button>
          ))}
        </div>

        {!loading && visible.length === 0 && (
          <div className="text-center py-16 text-[var(--muted-foreground)]">
            <Star className="mx-auto mb-3" />
            No tutorials yet. Check back soon — or head to <a href="/admin/content" className="text-[var(--gold)]">the admin panel</a> to post the first one.
          </div>
        )}
      </div>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-4xl bg-[var(--card)] rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video bg-black">
              <iframe
                src={active.video_url}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem" }}>{active.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">{active.description}</p>
              <div className="mt-3 flex gap-4 text-xs text-[var(--muted-foreground)]">
                <span>{active.instructor}</span>
                <span>{active.duration}</span>
                <span>{active.level}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
