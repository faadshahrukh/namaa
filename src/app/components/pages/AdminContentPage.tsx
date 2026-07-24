import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Newspaper, Video, Plus, Pencil, Trash2, Save, X, Lock, LogOut, ArrowLeft, Eye, EyeOff } from "lucide-react";
import {
  listNewsPosts, listTutorials, saveNewsPost, deleteNewsPost, saveTutorial, deleteTutorial, verifyAdminPassword,
  type NewsPostInput, type TutorialInput,
} from "@/lib/content.functions";

const AUTH_KEY = "nm-content-admin-auth";

// ─── Types (matching DB rows) ─────────────────────────────────────────────────

interface NewsRow {
  id: string; slug: string; title: string; excerpt: string; content: string;
  category: string; author: string; image_url: string | null;
  featured: boolean; read_time: string; published: boolean; published_at: string;
}

interface TutorialRow {
  id: string; slug: string; title: string; description: string; video_url: string;
  thumbnail_url: string | null; category: string; level: string; duration: string;
  instructor: string; featured: boolean; published: boolean; published_at: string;
}

// ─── Login ────────────────────────────────────────────────────────────────────

function AdminLogin({ onSuccess }: { onSuccess: (pw: string) => void }) {
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const res = await verifyAdminPassword({ data: { password: pass } });
      if (res.ok) {
        sessionStorage.setItem(AUTH_KEY, pass);
        onSuccess(pass);
      } else {
        setError("Invalid password"); setPass("");
      }
    } catch {
      setError("Server error");
    } finally { setBusy(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/25 flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-[var(--gold)]" />
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.6rem" }}>Content Admin</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">Sign in to publish news and tutorials.</p>
        </div>
        <form onSubmit={submit} className="space-y-3 bg-[var(--card)] border border-[var(--border)] p-6 rounded-xl">
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Admin password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full px-3 py-2.5 pr-10 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm"
              autoFocus
            />
            <button type="button" onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <div className="text-xs text-[var(--destructive)]">{error}</div>}
          <button disabled={busy} className="w-full py-2.5 rounded-lg bg-[var(--gold)] text-[var(--primary-foreground)] text-sm hover:opacity-90 disabled:opacity-60">
            {busy ? "Verifying…" : "Sign In"}
          </button>
          <Link to="/" className="block text-center text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">← Back to site</Link>
        </form>
      </div>
    </div>
  );
}

// ─── News editor ──────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

function NewsEditor({ password, initial, onDone }: { password: string; initial?: NewsRow; onDone: () => void }) {
  const [form, setForm] = useState<NewsPostInput>(() => ({
    id: initial?.id,
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    category: initial?.category ?? "Forex",
    author: initial?.author ?? "Namaa Team",
    image_url: initial?.image_url ?? "",
    featured: initial?.featured ?? false,
    read_time: initial?.read_time ?? "5 min",
    published: initial?.published ?? true,
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title), image_url: form.image_url || null };
      await saveNewsPost({ data: { password, post: payload } });
      onDone();
    } catch (e: any) { setErr(e.message || "Failed to save"); }
    finally { setBusy(false); }
  };

  const F = (props: any) => (
    <div>
      <label className="block text-xs text-[var(--muted-foreground)] mb-1">{props.label}</label>
      {props.children}
    </div>
  );

  return (
    <form onSubmit={save} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <F label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
        <F label="Slug (auto)">
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-from-title" className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
        <F label="Category">
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
        <F label="Author">
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
        <F label="Image URL">
          <input value={form.image_url ?? ""} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://…" className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
        <F label="Read time">
          <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </F>
      </div>
      <F label="Excerpt">
        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
      </F>
      <F label="Body (Markdown / plain text)">
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm font-mono" />
      </F>
      <div className="flex gap-6 items-center text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
      </div>
      {err && <div className="text-sm text-[var(--destructive)]">{err}</div>}
      <div className="flex gap-2">
        <button disabled={busy} className="px-4 py-2 rounded-lg bg-[var(--gold)] text-[var(--primary-foreground)] text-sm flex items-center gap-1"><Save size={14} /> {busy ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onDone} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm">Cancel</button>
      </div>
    </form>
  );
}

// ─── Tutorial editor ──────────────────────────────────────────────────────────

function TutorialEditor({ password, initial, onDone }: { password: string; initial?: TutorialRow; onDone: () => void }) {
  const [form, setForm] = useState<TutorialInput>(() => ({
    id: initial?.id,
    slug: initial?.slug ?? "",
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    video_url: initial?.video_url ?? "",
    thumbnail_url: initial?.thumbnail_url ?? "",
    category: initial?.category ?? "Basics",
    level: initial?.level ?? "Beginner",
    duration: initial?.duration ?? "10 min",
    instructor: initial?.instructor ?? "Namaa Academy",
    featured: initial?.featured ?? false,
    published: initial?.published ?? true,
  }));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr("");
    try {
      // Normalize youtube URL to /embed/
      let vu = form.video_url.trim();
      const yt = vu.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
      if (yt) vu = `https://www.youtube.com/embed/${yt[1]}`;
      const payload = { ...form, video_url: vu, slug: form.slug || slugify(form.title), thumbnail_url: form.thumbnail_url || null };
      await saveTutorial({ data: { password, tutorial: payload } });
      onDone();
    } catch (e: any) { setErr(e.message || "Failed to save"); }
    finally { setBusy(false); }
  };

  return (
    <form onSubmit={save} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Slug (auto)</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Video URL (YouTube link or embed)</label>
          <input required value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=…" className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Thumbnail URL (optional)</label>
          <input value={form.thumbnail_url ?? ""} onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Instructor</label>
          <input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Category</label>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Level</label>
          <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm">
            <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-[var(--muted-foreground)] mb-1">Duration</label>
          <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-[var(--muted-foreground)] mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-3 py-2 rounded-lg bg-[var(--input-background)] border border-[var(--border)] text-sm" />
      </div>
      <div className="flex gap-6 items-center text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
      </div>
      {err && <div className="text-sm text-[var(--destructive)]">{err}</div>}
      <div className="flex gap-2">
        <button disabled={busy} className="px-4 py-2 rounded-lg bg-[var(--gold)] text-[var(--primary-foreground)] text-sm flex items-center gap-1"><Save size={14} /> {busy ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onDone} className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm">Cancel</button>
      </div>
    </form>
  );
}

// ─── Main admin panel ─────────────────────────────────────────────────────────

export function AdminContentPage() {
  const [password, setPassword] = useState<string | null>(() => sessionStorage.getItem(AUTH_KEY));
  const [tab, setTab] = useState<"news" | "tutorials">("news");
  const [news, setNews] = useState<NewsRow[]>([]);
  const [tuts, setTuts] = useState<TutorialRow[]>([]);
  const [editing, setEditing] = useState<null | { kind: "news"; row?: NewsRow } | { kind: "tutorial"; row?: TutorialRow }>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const [n, t] = await Promise.all([listNewsPosts(), listTutorials()]);
    setNews(n as NewsRow[]); setTuts(t as TutorialRow[]);
    setLoading(false);
  };

  useEffect(() => { if (password) refresh(); }, [password]);

  if (!password) return <AdminLogin onSuccess={setPassword} />;

  const signOut = () => {
    sessionStorage.removeItem(AUTH_KEY); setPassword(null);
  };

  const onDelete = async (kind: "news" | "tutorial", id: string) => {
    if (!confirm("Delete this item?")) return;
    if (kind === "news") await deleteNewsPost({ data: { password, id } });
    else await deleteTutorial({ data: { password, id } });
    refresh();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <header className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1 text-sm"><ArrowLeft size={14} /> Site</Link>
            <div className="w-px h-5 bg-[var(--border)]" />
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.25rem" }}>Content Admin</h1>
          </div>
          <button onClick={signOut} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6 border-b border-[var(--border)]">
          <button onClick={() => { setTab("news"); setEditing(null); }} className={`px-4 py-3 text-sm flex items-center gap-2 border-b-2 ${tab === "news" ? "border-[var(--gold)] text-[var(--gold)]" : "border-transparent text-[var(--muted-foreground)]"}`}>
            <Newspaper size={16} /> News ({news.length})
          </button>
          <button onClick={() => { setTab("tutorials"); setEditing(null); }} className={`px-4 py-3 text-sm flex items-center gap-2 border-b-2 ${tab === "tutorials" ? "border-[var(--gold)] text-[var(--gold)]" : "border-transparent text-[var(--muted-foreground)]"}`}>
            <Video size={16} /> Tutorials ({tuts.length})
          </button>
        </div>

        {editing ? (
          editing.kind === "news"
            ? <NewsEditor password={password} initial={editing.row} onDone={() => { setEditing(null); refresh(); }} />
            : <TutorialEditor password={password} initial={editing.row} onDone={() => { setEditing(null); refresh(); }} />
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setEditing({ kind: tab === "news" ? "news" : "tutorial" })}
                className="px-4 py-2 rounded-lg bg-[var(--gold)] text-[var(--primary-foreground)] text-sm flex items-center gap-1"
              >
                <Plus size={14} /> New {tab === "news" ? "post" : "tutorial"}
              </button>
            </div>
            {loading ? (
              <div className="text-[var(--muted-foreground)]">Loading…</div>
            ) : tab === "news" ? (
              <div className="space-y-2">
                {news.map((n) => (
                  <div key={n.id} className="flex items-center justify-between bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{n.title}</span>
                        {n.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">Featured</span>}
                        {!n.published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">Draft</span>}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-1 truncate">/{n.slug} · {n.category} · {n.author}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditing({ kind: "news", row: n })} className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--gold)]"><Pencil size={14} /></button>
                      <button onClick={() => onDelete("news", n.id)} className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--destructive)] text-[var(--destructive)]"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                {news.length === 0 && <div className="text-[var(--muted-foreground)] text-sm">No posts yet.</div>}
              </div>
            ) : (
              <div className="space-y-2">
                {tuts.map((t) => (
                  <div key={t.id} className="flex items-center justify-between bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{t.title}</span>
                        {t.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">Featured</span>}
                        {!t.published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">Draft</span>}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-1 truncate">/{t.slug} · {t.level} · {t.duration} · {t.instructor}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditing({ kind: "tutorial", row: t })} className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--gold)]"><Pencil size={14} /></button>
                      <button onClick={() => onDelete("tutorial", t.id)} className="p-2 rounded-lg border border-[var(--border)] hover:border-[var(--destructive)] text-[var(--destructive)]"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                {tuts.length === 0 && <div className="text-[var(--muted-foreground)] text-sm">No tutorials yet.</div>}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
