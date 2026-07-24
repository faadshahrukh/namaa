import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard, Newspaper, AlertTriangle, Calendar,
  Users, Plus, Pencil, Trash2, X, ChevronRight, RotateCcw,
  Star, Shield, TrendingUp, Save, ArrowLeft, ExternalLink,
  Eye, EyeOff, LogOut, Lock,
} from "lucide-react";
import { useBrokers, useNews, useScamAlerts, useCalendarEvents } from "@/hooks/useCms";
import type {
  CmsBroker, CmsNewsArticle, CmsScamAlert, CmsCalendarEvent,
} from "@/data/cms-defaults";

// ─── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_USER = "admin";
const ADMIN_PASS = "namaa2026";
const AUTH_KEY   = "nm-admin-auth";

function isAuthed(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onSuccess();
    } else {
      setError("Invalid credentials");
      setPass("");
    }
  };

  return (
    <div className="min-h-screen bg-[#070C17] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-[#C9A84C]" />
          </div>
          <h1 className="text-[#E3EBF8] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>
            Admin Login
          </h1>
          <p className="text-[#6A82A8] text-sm">Namaa Markets CMS</p>
        </div>

        <form onSubmit={submit} className="bg-[#0B1322] border border-[#1D2F4A] rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-[#6A82A8] mb-1.5">Username</label>
            <input
              className="w-full bg-[#070C17] border border-[#1D2F4A] rounded-lg px-3 py-2.5 text-sm text-[#E3EBF8] placeholder:text-[#2D4060] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
              value={user}
              onChange={e => { setUser(e.target.value); setError(""); }}
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs text-[#6A82A8] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="w-full bg-[#070C17] border border-[#1D2F4A] rounded-lg px-3 py-2.5 pr-10 text-sm text-[#E3EBF8] placeholder:text-[#2D4060] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                value={pass}
                onChange={e => { setPass(e.target.value); setError(""); }}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D5270] hover:text-[#6A82A8] transition-colors"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs flex items-center gap-1.5">
              <AlertTriangle size={11} /> {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#C9A84C] text-[#070C17] rounded-lg text-sm font-medium hover:bg-[#D4B55A] transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-[#3D5270] text-xs mt-5">
          Default: <code className="text-[#5A7090]">admin</code> / <code className="text-[#5A7090]">namaa2026</code>
        </p>
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "overview" | "brokers" | "news" | "scam-alerts" | "calendar";

// ─── Shared UI ───────────────────────────────────────────────────────────────

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide"
      style={{ background: color + "20", color }}
    >
      {children}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: "critical" | "high" | "medium" }) {
  const map = {
    critical: { label: "Critical", color: "#EF4444" },
    high: { label: "High", color: "#F97316" },
    medium: { label: "Medium", color: "#C9A84C" },
  };
  const { label, color } = map[severity];
  return <Badge color={color}>{label}</Badge>;
}

function ImpactBadge({ impact }: { impact: "high" | "medium" | "low" }) {
  const map = {
    high: "#EF4444",
    medium: "#C9A84C",
    low: "#22C55E",
  };
  return <Badge color={map[impact]}>{impact}</Badge>;
}

function ConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0B1322] border border-[#1D2F4A] rounded-2xl p-6 w-80 shadow-2xl">
        <p className="text-[#E3EBF8] text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-[#1D2F4A] text-[#6A82A8] text-sm hover:bg-[#111D30] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Slide Panel ──────────────────────────────────────────────────────────────

function SlidePanel({ title, open, onClose, children }: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={onClose} />
      )}
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-[#0B1322] border-l border-[#1D2F4A] z-40 flex flex-col shadow-2xl transition-transform duration-300"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1D2F4A]">
          <h3 className="text-[#E3EBF8] text-sm font-medium">{title}</h3>
          <button onClick={onClose} className="text-[#6A82A8] hover:text-[#E3EBF8] transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </aside>
    </>
  );
}

// ─── Form fields ─────────────────────────────────────────────────────────────

function Field({
  label, required, children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-[#6A82A8] mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#070C17] border border-[#1D2F4A] rounded-lg px-3 py-2 text-sm text-[#E3EBF8] placeholder:text-[#2D4060] focus:outline-none focus:border-[#C9A84C]/50 transition-colors";
const selectCls = inputCls + " cursor-pointer";

// ─── Overview ────────────────────────────────────────────────────────────────

function Overview({
  brokerCount,
  newsCount,
  alertCount,
  eventCount,
  setSection,
}: {
  brokerCount: number;
  newsCount: number;
  alertCount: number;
  eventCount: number;
  setSection: (s: Section) => void;
}) {
  const stats = [
    { label: "Brokers", count: brokerCount, icon: Users, color: "#C9A84C", section: "brokers" as Section },
    { label: "News Articles", count: newsCount, icon: Newspaper, color: "#3B82F6", section: "news" as Section },
    { label: "Scam Alerts", count: alertCount, icon: AlertTriangle, color: "#EF4444", section: "scam-alerts" as Section },
    { label: "Calendar Events", count: eventCount, icon: Calendar, color: "#22C55E", section: "calendar" as Section },
  ];

  return (
    <div>
      <h2 className="text-[#E3EBF8] font-medium mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.5rem", fontWeight: 400 }}>
        Content Overview
      </h2>
      <p className="text-[#6A82A8] text-sm mb-8">All CMS data is stored locally. Changes persist across sessions.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map(({ label, count, icon: Icon, color, section }) => (
          <button
            key={section}
            onClick={() => setSection(section)}
            className="bg-[#0B1322] border border-[#1D2F4A] rounded-2xl p-5 text-left hover:border-[#233552] transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>
                <Icon size={16} style={{ color }} />
              </div>
              <ChevronRight size={14} className="text-[#2D4060] group-hover:text-[#6A82A8] transition-colors" />
            </div>
            <div className="text-2xl font-medium text-[#E3EBF8] mb-0.5">{count}</div>
            <div className="text-xs text-[#6A82A8]">{label}</div>
          </button>
        ))}
      </div>

      <div className="bg-[#0B1322] border border-[#1D2F4A] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={14} className="text-[#C9A84C]" />
          <span className="text-xs text-[#C9A84C] uppercase tracking-wide">Storage Info</span>
        </div>
        <p className="text-[#6A82A8] text-xs leading-relaxed">
          All edits are saved to <code className="text-[#8AA4C8] bg-[#111D30] px-1 py-0.5 rounded">localStorage</code> under
          the <code className="text-[#8AA4C8] bg-[#111D30] px-1 py-0.5 rounded">nm-cms-*</code> keys.
          Use the reset button in each section to restore default data.
        </p>
      </div>
    </div>
  );
}

// ─── Brokers Section ─────────────────────────────────────────────────────────

const emptyBroker = (): CmsBroker => ({
  id: "",
  slug: "",
  name: "",
  initials: "",
  color: "#C9A84C",
  badge: "",
  regulation: [],
  rating: 4.5,
  reviews: 0,
  spread: "0.0",
  leverage: "1:500",
  minDeposit: "$200",
  platforms: ["MT4", "MT5"],
  type: "ECN",
  features: [],
  scamRisk: "Low",
  founded: 2010,
  verified: true,
  featured: false,
});

function BrokerForm({
  value,
  onChange,
  onSave,
}: {
  value: CmsBroker;
  onChange: (b: CmsBroker) => void;
  onSave: () => void;
}) {
  const set = (k: keyof CmsBroker, v: unknown) => onChange({ ...value, [k]: v });
  const listField = (k: "regulation" | "platforms" | "features", v: string) =>
    set(k, v.split(",").map((s) => s.trim()).filter(Boolean));

  return (
    <div>
      <Field label="Name" required>
        <input className={inputCls} value={value.name} onChange={e => set("name", e.target.value)} placeholder="IC Markets" />
      </Field>
      <Field label="Slug" required>
        <input className={inputCls} value={value.slug} onChange={e => set("slug", e.target.value)} placeholder="ic-markets" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Initials">
          <input className={inputCls} value={value.initials} onChange={e => set("initials", e.target.value)} placeholder="IC" maxLength={3} />
        </Field>
        <Field label="Color">
          <div className="flex gap-2">
            <input type="color" className="w-10 h-10 rounded-lg border border-[#1D2F4A] bg-[#070C17] cursor-pointer p-1" value={value.color} onChange={e => set("color", e.target.value)} />
            <input className={inputCls} value={value.color} onChange={e => set("color", e.target.value)} />
          </div>
        </Field>
      </div>
      <Field label="Badge">
        <input className={inputCls} value={value.badge} onChange={e => set("badge", e.target.value)} placeholder="ECN Leader" />
      </Field>
      <Field label="Regulation (comma-separated)">
        <input className={inputCls} value={value.regulation.join(", ")} onChange={e => listField("regulation", e.target.value)} placeholder="ASIC, CySEC, FCA" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Rating">
          <input type="number" min={0} max={5} step={0.1} className={inputCls} value={value.rating} onChange={e => set("rating", parseFloat(e.target.value))} />
        </Field>
        <Field label="Reviews">
          <input type="number" className={inputCls} value={value.reviews} onChange={e => set("reviews", parseInt(e.target.value))} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Spread">
          <input className={inputCls} value={value.spread} onChange={e => set("spread", e.target.value)} placeholder="0.0" />
        </Field>
        <Field label="Leverage">
          <input className={inputCls} value={value.leverage} onChange={e => set("leverage", e.target.value)} placeholder="1:500" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Min. Deposit">
          <input className={inputCls} value={value.minDeposit} onChange={e => set("minDeposit", e.target.value)} placeholder="$200" />
        </Field>
        <Field label="Founded">
          <input type="number" className={inputCls} value={value.founded} onChange={e => set("founded", parseInt(e.target.value))} />
        </Field>
      </div>
      <Field label="Platforms (comma-separated)">
        <input className={inputCls} value={value.platforms.join(", ")} onChange={e => listField("platforms", e.target.value)} placeholder="MT4, MT5, cTrader" />
      </Field>
      <Field label="Features (comma-separated)">
        <input className={inputCls} value={value.features.join(", ")} onChange={e => listField("features", e.target.value)} placeholder="Islamic Account, VPS" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Broker Type">
          <input className={inputCls} value={value.type} onChange={e => set("type", e.target.value)} placeholder="ECN" />
        </Field>
        <Field label="Scam Risk">
          <select className={selectCls} value={value.scamRisk} onChange={e => set("scamRisk", e.target.value)}>
            <option>Very Low</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </Field>
      </div>
      <div className="flex gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm text-[#8AA4C8] cursor-pointer">
          <input type="checkbox" checked={value.verified} onChange={e => set("verified", e.target.checked)} className="accent-[#C9A84C]" />
          Verified
        </label>
        <label className="flex items-center gap-2 text-sm text-[#8AA4C8] cursor-pointer">
          <input type="checkbox" checked={value.featured} onChange={e => set("featured", e.target.checked)} className="accent-[#C9A84C]" />
          Featured
        </label>
      </div>
      <button onClick={onSave} className="w-full py-2.5 bg-[#C9A84C] text-[#070C17] rounded-lg text-sm font-medium hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2">
        <Save size={14} /> Save Broker
      </button>
    </div>
  );
}

function BrokersSection() {
  const { brokers, upsert, remove, reset } = useBrokers();
  const [editing, setEditing] = useState<CmsBroker | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleSave = () => {
    if (!editing) return;
    upsert(editing);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#E3EBF8] font-medium" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400 }}>Brokers</h2>
          <p className="text-[#6A82A8] text-xs mt-0.5">{brokers.length} entries</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#1D2F4A] text-[#6A82A8] hover:bg-[#111D30] transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={() => setEditing(emptyBroker())} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#C9A84C] text-[#070C17] hover:bg-[#D4B55A] transition-colors">
            <Plus size={11} /> Add Broker
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {brokers.map((b) => (
          <div key={b.id} className="bg-[#0B1322] border border-[#1D2F4A] rounded-xl px-4 py-3 flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: b.color + "22", color: b.color }}>
              {b.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-[#E3EBF8] font-medium">{b.name}</span>
                {b.badge && <Badge color={b.color}>{b.badge}</Badge>}
                {b.verified && <Shield size={11} className="text-[#22C55E]" />}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="flex items-center gap-0.5 text-xs text-[#C9A84C]">
                  <Star size={9} fill="currentColor" /> {b.rating}
                </span>
                <span className="text-xs text-[#6A82A8]">{b.regulation.join(" · ")}</span>
                <span className="text-xs text-[#6A82A8]">From {b.minDeposit}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setEditing({ ...b })} className="p-1.5 rounded-md text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#172338] transition-colors">
                <Pencil size={13} />
              </button>
              <button onClick={() => setConfirmId(b.id)} className="p-1.5 rounded-md text-[#6A82A8] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SlidePanel
        title={editing?.id ? `Edit — ${editing.name}` : "New Broker"}
        open={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing && <BrokerForm value={editing} onChange={setEditing} onSave={handleSave} />}
      </SlidePanel>

      {confirmId && (
        <ConfirmModal
          message={`Delete "${brokers.find(b => b.id === confirmId)?.name}"? This cannot be undone.`}
          onConfirm={() => { remove(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

// ─── News Section ─────────────────────────────────────────────────────────────

const emptyArticle = (): CmsNewsArticle => ({
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  category: "Forex",
  author: "Namaa Markets Research",
  publishedAt: new Date().toISOString(),
  imageUrl: "",
  featured: false,
  readTime: "3 min",
});

const NEWS_CATEGORIES = ["Forex", "Central Banks", "Commodities", "Crypto", "Analysis", "Geopolitics", "Equities"];

const categoryColors: Record<string, string> = {
  "Central Banks": "#A78BFA",
  Forex: "#C9A84C",
  Commodities: "#F97316",
  Crypto: "#3B82F6",
  Analysis: "#22C55E",
  Geopolitics: "#EF4444",
  Equities: "#06B6D4",
};

function ArticleForm({ value, onChange, onSave }: {
  value: CmsNewsArticle;
  onChange: (a: CmsNewsArticle) => void;
  onSave: () => void;
}) {
  const set = (k: keyof CmsNewsArticle, v: unknown) => onChange({ ...value, [k]: v });
  return (
    <div>
      <Field label="Title" required>
        <input className={inputCls} value={value.title} onChange={e => set("title", e.target.value)} placeholder="Article headline" />
      </Field>
      <Field label="Slug" required>
        <input className={inputCls} value={value.slug} onChange={e => set("slug", e.target.value)} placeholder="article-slug-here" />
      </Field>
      <Field label="Excerpt">
        <textarea className={inputCls} rows={3} value={value.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary..." />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category">
          <select className={selectCls} value={value.category} onChange={e => set("category", e.target.value)}>
            {NEWS_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Read Time">
          <input className={inputCls} value={value.readTime} onChange={e => set("readTime", e.target.value)} placeholder="5 min" />
        </Field>
      </div>
      <Field label="Author">
        <input className={inputCls} value={value.author} onChange={e => set("author", e.target.value)} placeholder="Namaa Markets Research" />
      </Field>
      <Field label="Published At (ISO)">
        <input type="datetime-local" className={inputCls} value={value.publishedAt.slice(0, 16)} onChange={e => set("publishedAt", new Date(e.target.value).toISOString())} />
      </Field>
      <Field label="Image URL">
        <input className={inputCls} value={value.imageUrl} onChange={e => set("imageUrl", e.target.value)} placeholder="https://..." />
      </Field>
      <label className="flex items-center gap-2 text-sm text-[#8AA4C8] cursor-pointer mb-6">
        <input type="checkbox" checked={value.featured} onChange={e => set("featured", e.target.checked)} className="accent-[#C9A84C]" />
        Featured article
      </label>
      <button onClick={onSave} className="w-full py-2.5 bg-[#C9A84C] text-[#070C17] rounded-lg text-sm font-medium hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2">
        <Save size={14} /> Save Article
      </button>
    </div>
  );
}

function NewsSection() {
  const { news, upsert, remove, reset } = useNews();
  const [editing, setEditing] = useState<CmsNewsArticle | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#E3EBF8] font-medium" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400 }}>News & Analysis</h2>
          <p className="text-[#6A82A8] text-xs mt-0.5">{news.length} articles</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#1D2F4A] text-[#6A82A8] hover:bg-[#111D30] transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={() => setEditing(emptyArticle())} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#C9A84C] text-[#070C17] hover:bg-[#D4B55A] transition-colors">
            <Plus size={11} /> Add Article
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {news.map((a) => {
          const catColor = categoryColors[a.category] ?? "#C9A84C";
          const date = new Date(a.publishedAt);
          const dateStr = isNaN(date.getTime()) ? a.publishedAt : date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
          return (
            <div key={a.id} className="bg-[#0B1322] border border-[#1D2F4A] rounded-xl px-4 py-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge color={catColor}>{a.category}</Badge>
                  {a.featured && <Badge color="#C9A84C">Featured</Badge>}
                </div>
                <p className="text-sm text-[#E3EBF8] leading-snug line-clamp-2">{a.title}</p>
                <p className="text-xs text-[#6A82A8] mt-1">{a.author} · {dateStr} · {a.readTime} read</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 pt-0.5">
                <button onClick={() => setEditing({ ...a })} className="p-1.5 rounded-md text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#172338] transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setConfirmId(a.id)} className="p-1.5 rounded-md text-[#6A82A8] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <SlidePanel title={editing?.id ? "Edit Article" : "New Article"} open={!!editing} onClose={() => setEditing(null)}>
        {editing && <ArticleForm value={editing} onChange={setEditing} onSave={() => { upsert(editing); setEditing(null); }} />}
      </SlidePanel>

      {confirmId && (
        <ConfirmModal
          message="Delete this article? This cannot be undone."
          onConfirm={() => { remove(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

// ─── Scam Alerts Section ──────────────────────────────────────────────────────

const emptyAlert = (): CmsScamAlert => ({
  id: "",
  name: "",
  severity: "high",
  type: "",
  date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
  reports: 0,
  status: "Warning",
  regulation: "None",
  country: "Unknown",
  description: "",
  tags: [],
});

function AlertForm({ value, onChange, onSave }: {
  value: CmsScamAlert;
  onChange: (a: CmsScamAlert) => void;
  onSave: () => void;
}) {
  const set = (k: keyof CmsScamAlert, v: unknown) => onChange({ ...value, [k]: v });
  return (
    <div>
      <Field label="Broker / Entity Name" required>
        <input className={inputCls} value={value.name} onChange={e => set("name", e.target.value)} placeholder="TradeXpert Pro" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Severity">
          <select className={selectCls} value={value.severity} onChange={e => set("severity", e.target.value)}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </Field>
        <Field label="Status">
          <select className={selectCls} value={value.status} onChange={e => set("status", e.target.value)}>
            <option>Blacklisted</option>
            <option>Warning</option>
            <option>Under Investigation</option>
          </select>
        </Field>
      </div>
      <Field label="Alert Type">
        <input className={inputCls} value={value.type} onChange={e => set("type", e.target.value)} placeholder="Withdrawal Issues" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <input className={inputCls} value={value.date} onChange={e => set("date", e.target.value)} placeholder="Jun 15, 2026" />
        </Field>
        <Field label="Reports">
          <input type="number" className={inputCls} value={value.reports} onChange={e => set("reports", parseInt(e.target.value) || 0)} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Regulation">
          <input className={inputCls} value={value.regulation} onChange={e => set("regulation", e.target.value)} placeholder="None" />
        </Field>
        <Field label="Country">
          <input className={inputCls} value={value.country} onChange={e => set("country", e.target.value)} placeholder="Unknown" />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={inputCls} rows={4} value={value.description} onChange={e => set("description", e.target.value)} placeholder="Describe the issue..." />
      </Field>
      <Field label="Tags (comma-separated)">
        <input className={inputCls} value={value.tags.join(", ")} onChange={e => set("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} placeholder="Withdrawal Issues, No Support" />
      </Field>
      <button onClick={onSave} className="w-full py-2.5 bg-[#C9A84C] text-[#070C17] rounded-lg text-sm font-medium hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2">
        <Save size={14} /> Save Alert
      </button>
    </div>
  );
}

function ScamAlertsSection() {
  const { alerts, upsert, remove, reset } = useScamAlerts();
  const [editing, setEditing] = useState<CmsScamAlert | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#E3EBF8] font-medium" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400 }}>Scam Alerts</h2>
          <p className="text-[#6A82A8] text-xs mt-0.5">{alerts.length} active alerts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#1D2F4A] text-[#6A82A8] hover:bg-[#111D30] transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={() => setEditing(emptyAlert())} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#C9A84C] text-[#070C17] hover:bg-[#D4B55A] transition-colors">
            <Plus size={11} /> Add Alert
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {alerts.map((a) => (
          <div key={a.id} className="bg-[#0B1322] border border-[#1D2F4A] rounded-xl px-4 py-3 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <SeverityBadge severity={a.severity} />
                <Badge color={a.status === "Blacklisted" ? "#EF4444" : "#C9A84C"}>{a.status}</Badge>
              </div>
              <p className="text-sm text-[#E3EBF8] font-medium">{a.name}</p>
              <p className="text-xs text-[#6A82A8] mt-0.5">{a.type} · {a.date} · {a.reports} reports</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={() => setEditing({ ...a })} className="p-1.5 rounded-md text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#172338] transition-colors">
                <Pencil size={13} />
              </button>
              <button onClick={() => setConfirmId(a.id)} className="p-1.5 rounded-md text-[#6A82A8] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <SlidePanel title={editing?.id ? `Edit — ${editing.name}` : "New Alert"} open={!!editing} onClose={() => setEditing(null)}>
        {editing && <AlertForm value={editing} onChange={setEditing} onSave={() => { upsert(editing); setEditing(null); }} />}
      </SlidePanel>

      {confirmId && (
        <ConfirmModal
          message={`Remove alert for "${alerts.find(a => a.id === confirmId)?.name}"?`}
          onConfirm={() => { remove(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

// ─── Calendar Section ─────────────────────────────────────────────────────────

const FLAGS: Record<string, string> = {
  USD: "🇺🇸", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", AUD: "🇦🇺",
  CAD: "🇨🇦", CHF: "🇨🇭", NZD: "🇳🇿", CNY: "🇨🇳",
};

const emptyEvent = (): CmsCalendarEvent => ({
  id: "",
  date: "Mon, Jul 7",
  dayKey: "mon",
  time: "12:30",
  currency: "USD",
  flag: "🇺🇸",
  event: "",
  impact: "medium",
  forecast: "—",
  previous: "—",
});

function EventForm({ value, onChange, onSave }: {
  value: CmsCalendarEvent;
  onChange: (e: CmsCalendarEvent) => void;
  onSave: () => void;
}) {
  const set = (k: keyof CmsCalendarEvent, v: unknown) => onChange({ ...value, [k]: v });
  const handleCurrency = (ccy: string) => {
    onChange({ ...value, currency: ccy, flag: FLAGS[ccy] ?? "🏳️" });
  };
  return (
    <div>
      <Field label="Event Name" required>
        <input className={inputCls} value={value.event} onChange={e => set("event", e.target.value)} placeholder="CPI (YoY)" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date Label">
          <input className={inputCls} value={value.date} onChange={e => set("date", e.target.value)} placeholder="Mon, Jul 7" />
        </Field>
        <Field label="Day Key">
          <select className={selectCls} value={value.dayKey} onChange={e => set("dayKey", e.target.value)}>
            {["mon", "tue", "wed", "thu", "fri"].map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Time (GMT)">
          <input className={inputCls} value={value.time} onChange={e => set("time", e.target.value)} placeholder="12:30" />
        </Field>
        <Field label="Currency">
          <select className={selectCls} value={value.currency} onChange={e => handleCurrency(e.target.value)}>
            {Object.keys(FLAGS).map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Impact">
        <select className={selectCls} value={value.impact} onChange={e => set("impact", e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Forecast">
          <input className={inputCls} value={value.forecast} onChange={e => set("forecast", e.target.value)} placeholder="2.6%" />
        </Field>
        <Field label="Previous">
          <input className={inputCls} value={value.previous} onChange={e => set("previous", e.target.value)} placeholder="2.3%" />
        </Field>
      </div>
      <button onClick={onSave} className="w-full py-2.5 bg-[#C9A84C] text-[#070C17] rounded-lg text-sm font-medium hover:bg-[#D4B55A] transition-colors flex items-center justify-center gap-2">
        <Save size={14} /> Save Event
      </button>
    </div>
  );
}

function CalendarSection() {
  const { events, upsert, remove, reset } = useCalendarEvents();
  const [editing, setEditing] = useState<CmsCalendarEvent | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const grouped = events.reduce<Record<string, CmsCalendarEvent[]>>((acc, e) => {
    (acc[e.date] = acc[e.date] ?? []).push(e);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[#E3EBF8] font-medium" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400 }}>Economic Calendar</h2>
          <p className="text-[#6A82A8] text-xs mt-0.5">{events.length} events</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[#1D2F4A] text-[#6A82A8] hover:bg-[#111D30] transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={() => setEditing(emptyEvent())} className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#C9A84C] text-[#070C17] hover:bg-[#D4B55A] transition-colors">
            <Plus size={11} /> Add Event
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([date, dayEvents]) => (
          <div key={date}>
            <div className="text-xs text-[#6A82A8] uppercase tracking-wider mb-2 px-1">{date}</div>
            <div className="space-y-1.5">
              {dayEvents.map((e) => (
                <div key={e.id} className="bg-[#0B1322] border border-[#1D2F4A] rounded-xl px-4 py-2.5 flex items-center gap-3">
                  <span className="text-sm">{e.flag}</span>
                  <span className="text-xs text-[#6A82A8] font-mono w-10 shrink-0">{e.time}</span>
                  <ImpactBadge impact={e.impact} />
                  <span className="text-xs text-[#8AA4C8] font-medium shrink-0">{e.currency}</span>
                  <span className="text-sm text-[#E3EBF8] flex-1 min-w-0 truncate">{e.event}</span>
                  <span className="text-xs text-[#6A82A8] shrink-0">{e.forecast}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => setEditing({ ...e })} className="p-1.5 rounded-md text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#172338] transition-colors">
                      <Pencil size={12} />
                    </button>
                    <button onClick={() => setConfirmId(e.id)} className="p-1.5 rounded-md text-[#6A82A8] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SlidePanel title={editing?.id ? "Edit Event" : "New Event"} open={!!editing} onClose={() => setEditing(null)}>
        {editing && <EventForm value={editing} onChange={setEditing} onSave={() => { upsert(editing); setEditing(null); }} />}
      </SlidePanel>

      {confirmId && (
        <ConfirmModal
          message="Delete this calendar event?"
          onConfirm={() => { remove(confirmId); setConfirmId(null); }}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "overview",     label: "Overview",         icon: LayoutDashboard },
  { id: "brokers",      label: "Brokers",           icon: Users           },
  { id: "news",         label: "News & Analysis",   icon: Newspaper       },
  { id: "scam-alerts",  label: "Scam Alerts",       icon: AlertTriangle   },
  { id: "calendar",     label: "Economic Calendar", icon: Calendar        },
];

export function AdminPage() {
  const [authed, setAuthed] = useState(isAuthed);
  const [section, setSection] = useState<Section>("overview");
  const { brokers } = useBrokers();
  const { news } = useNews();
  const { alerts } = useScamAlerts();
  const { events } = useCalendarEvents();

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-[#070C17] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[#1D2F4A] flex flex-col">
        <div className="px-5 py-5 border-b border-[#1D2F4A]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded bg-[#C9A84C] flex items-center justify-center">
              <TrendingUp size={12} className="text-[#070C17]" />
            </div>
            <span className="text-[#E3EBF8] text-sm font-medium">CMS</span>
          </div>
          <p className="text-[#3D5270] text-[10px]">Namaa Markets</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = section === id;
            return (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors text-left ${
                  active
                    ? "bg-[#C9A84C]/10 text-[#C9A84C]"
                    : "text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#111D30]"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-[#1D2F4A] space-y-0.5">
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#111D30] transition-colors"
          >
            <ArrowLeft size={13} /> Back to site
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#6A82A8] hover:text-[#E3EBF8] hover:bg-[#111D30] transition-colors"
          >
            <ExternalLink size={13} /> Open site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-[#6A82A8] hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {section === "overview" && (
            <Overview
              brokerCount={brokers.length}
              newsCount={news.length}
              alertCount={alerts.length}
              eventCount={events.length}
              setSection={setSection}
            />
          )}
          {section === "brokers"     && <BrokersSection />}
          {section === "news"        && <NewsSection />}
          {section === "scam-alerts" && <ScamAlertsSection />}
          {section === "calendar"    && <CalendarSection />}
        </div>
      </main>
    </div>
  );
}
