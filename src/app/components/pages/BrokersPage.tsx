import { useState } from "react";
import { getCmsBrokers } from "@/hooks/useCms";
import { Link, useNavigate } from "react-router";
import {
  Search, Star, CheckCircle, Shield, ExternalLink,
  SlidersHorizontal, TrendingUp,
  ArrowUpDown
} from "lucide-react";

const brokers = getCmsBrokers().map((b, i) => ({
  id: parseInt(b.id) || i + 1,
  slug: b.slug,
  name: b.name,
  logo: b.initials,
  regulation: b.regulation,
  rating: b.rating,
  reviews: b.reviews,
  spread: b.spread,
  leverage: b.leverage,
  minDeposit: b.minDeposit,
  platforms: b.platforms,
  badge: b.badge,
  badgeColor: b.color,
  scamRisk: b.scamRisk,
  founded: b.founded,
  type: b.type,
  features: b.features,
  verified: b.verified,
}));

const filterOptions = {
  Regulation: ["FCA", "ASIC", "CySEC", "DFSA", "FSCA", "CFTC"],
  Type: ["ECN", "STP", "Market Maker", "NDD"],
  Platform: ["MT4", "MT5", "cTrader"],
  Features: ["Islamic Account", "Bonuses", "VPS", "Copy Trading"],
};

export function BrokersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "spread" | "reviews">("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<"grid" | "list">("list");

  const toggleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList((p) => p.filter((x) => x !== id));
    } else if (compareList.length < 3) {
      setCompareList((p) => [...p, id]);
    }
  };

  const filtered = brokers
    .filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.regulation.some((r) => r.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "spread") return parseFloat(a.spread) - parseFloat(b.spread);
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Broker Directory</span>
          </div>
          <h1
            className="text-[#EEF0F6] mb-2"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Find Your Ideal Broker
          </h1>
          <p className="text-[#6E7489] text-sm max-w-xl">
            238 brokers reviewed and verified. Filter by regulation, spreads, platforms, and account types.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7489]" />
            <input
              type="text"
              placeholder="Search by name, regulation, or feature..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#0E0F17] border border-[#1C1E2B] rounded-md text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 border rounded-md text-sm transition-colors ${
              showFilters ? "border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/8" : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E]"
            }`}
          >
            <SlidersHorizontal size={13} />
            Filters {selected.length > 0 && `(${selected.length})`}
          </button>
          <div className="flex items-center gap-1.5 text-xs text-[#6E7489]">
            <ArrowUpDown size={12} />
            <span>Sort:</span>
            {(["rating", "spread", "reviews"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2.5 py-1.5 rounded capitalize transition-colors ${
                  sortBy === s ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#6E7489] hover:text-[#9AA0B4]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-6 p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(filterOptions).map(([category, opts]) => (
                <div key={category}>
                  <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-2.5">{category}</div>
                  <div className="space-y-1.5">
                    {opts.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selected.includes(opt)}
                          onChange={() =>
                            setSelected((p) =>
                              p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]
                            )
                          }
                          className="w-3.5 h-3.5 accent-[#C9A84C]"
                        />
                        <span className="text-xs text-[#9AA0B4] group-hover:text-[#EEF0F6] transition-colors">
                          {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compare banner */}
        {compareList.length > 0 && (
          <div className="mb-4 flex items-center gap-3 p-3.5 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/25">
            <span className="text-xs text-[#C9A84C]">
              {compareList.length} broker{compareList.length > 1 ? "s" : ""} selected for comparison
            </span>
            {compareList.length >= 2 && (
              <button onClick={() => navigate("/brokers/compare")} className="ml-auto px-3 py-1.5 bg-[#C9A84C] text-[#09090E] rounded-md text-xs hover:bg-[#D4B55A] transition-colors">
                Compare Now
              </button>
            )}
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-[#6E7489] hover:text-[#EEF0F6]"
            >
              Clear
            </button>
          </div>
        )}

        {/* Results count */}
        <div className="text-xs text-[#6E7489] mb-4">{filtered.length} brokers found</div>

        {/* Broker list */}
        <div className="space-y-3">
          {filtered.map((b, i) => (
            <div
              key={b.id}
              className={`p-5 rounded-xl bg-[#0E0F17] border transition-all group ${
                compareList.includes(b.id)
                  ? "border-[#C9A84C]/40"
                  : "border-[#1C1E2B] hover:border-[#2A2D3E]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Rank + Logo */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-lg text-[#2A2D3E] w-5 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#141622] border border-[#1C1E2B] flex items-center justify-center shrink-0">
                    <span className="text-xs text-[#C9A84C]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {b.logo}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm text-[#EEF0F6]">{b.name}</span>
                      {b.verified && <CheckCircle size={12} className="text-[#22C55E]" />}
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${b.badgeColor}18`,
                          color: b.badgeColor,
                        }}
                      >
                        {b.badge}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-1">
                      {b.regulation.map((r) => (
                        <span key={r} className="text-xs px-1.5 py-0.5 rounded bg-[#141622] text-[#6E7489]">
                          <Shield size={8} className="inline mr-0.5" />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:px-4">
                  <div>
                    <div className="text-xs text-[#6E7489] mb-0.5">Rating</div>
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
                      <span className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {b.rating}
                      </span>
                      <span className="text-xs text-[#6E7489]">({(b.reviews / 1000).toFixed(1)}k)</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6E7489] mb-0.5">Avg Spread</div>
                    <span className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {b.spread} pips
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-[#6E7489] mb-0.5">Max Leverage</div>
                    <span className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {b.leverage}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-[#6E7489] mb-0.5">Min Deposit</div>
                    <span className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {b.minDeposit}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleCompare(b.id)}
                    className={`px-3 py-2 rounded-md text-xs border transition-colors ${
                      compareList.includes(b.id)
                        ? "border-[#C9A84C]/40 text-[#C9A84C] bg-[#C9A84C]/8"
                        : "border-[#1C1E2B] text-[#6E7489] hover:border-[#2A2D3E] hover:text-[#9AA0B4]"
                    }`}
                  >
                    {compareList.includes(b.id) ? "✓ Added" : "Compare"}
                  </button>
                  <Link to={`/brokers/${b.slug}`} className="px-4 py-2 rounded-md text-xs bg-[#C9A84C] text-[#09090E] hover:bg-[#D4B55A] transition-colors flex items-center gap-1">
                    View Profile <ExternalLink size={10} />
                  </Link>
                </div>
              </div>

              {/* Features */}
              <div className="mt-3 pt-3 border-t border-[#1C1E2B] flex flex-wrap gap-1.5 items-center">
                {b.platforms.map((p) => (
                  <span key={p} className="text-xs px-2 py-0.5 rounded bg-[#141622] text-[#9AA0B4]">{p}</span>
                ))}
                <span className="text-[#2A2D3E]">·</span>
                {b.features.map((f) => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded bg-[#141622] text-[#9AA0B4]">{f}</span>
                ))}
                <span className="ml-auto text-xs text-[#6E7489]">Est. {b.founded}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
