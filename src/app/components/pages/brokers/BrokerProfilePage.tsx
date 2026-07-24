import { useParams, Link, useNavigate } from "react-router";
import { Star, CheckCircle, Shield, ExternalLink, ArrowLeft, AlertTriangle, ChevronRight } from "lucide-react";
import { getBrokerBySlug } from "../../../data/brokers";

export function BrokerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const broker = getBrokerBySlug(slug ?? "");

  if (!broker) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <div className="text-[#6E7489] mb-4">Broker not found.</div>
        <Link to="/brokers" className="text-[#C9A84C] hover:underline">← Back to Brokers</Link>
      </div>
    );
  }

  const riskColor = broker.scamScore >= 90 ? "#22C55E" : broker.scamScore >= 75 ? "#C9A84C" : "#EF4444";

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-[#6E7489] hover:text-[#EEF0F6] mb-5 transition-colors">
            <ArrowLeft size={13} /> Back to Brokers
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#141622] border border-[#1C1E2B] flex items-center justify-center shrink-0">
              <span className="text-lg" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{broker.logo}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>{broker.name}</h1>
                {broker.verified && <CheckCircle size={16} className="text-[#22C55E]" />}
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${broker.badgeColor}18`, color: broker.badgeColor }}>{broker.badge}</span>
              </div>
              <p className="text-sm text-[#6E7489] mb-2">{broker.tagline}</p>
              <div className="flex flex-wrap gap-1">
                {broker.regulation.map((r) => (
                  <span key={r} className="text-xs px-1.5 py-0.5 rounded bg-[#141622] text-[#6E7489]">
                    <Shield size={8} className="inline mr-0.5" />{r}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link to="/brokers/compare" className="px-4 py-2.5 border border-[#1C1E2B] text-[#9AA0B4] rounded-lg text-sm hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors">Compare</Link>
              <a href={`https://${broker.website}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors flex items-center gap-1.5">
                Open Account <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Rating", value: broker.rating.toString(), sub: `${(broker.reviews / 1000).toFixed(1)}k reviews` },
                { label: "Min Spread", value: `${broker.spread} pips`, sub: "EUR/USD typical" },
                { label: "Leverage", value: broker.leverage, sub: "Maximum" },
                { label: "Min Deposit", value: broker.minDeposit, sub: "To open account" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
                  <div className="text-xs text-[#6E7489] mb-1">{s.label}</div>
                  <div className="text-sm text-[#EEF0F6] mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                  <div className="text-xs text-[#6E7489]">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <h2 className="text-sm text-[#EEF0F6] mb-3">About {broker.name}</h2>
              <p className="text-xs text-[#9AA0B4] leading-relaxed">{broker.description}</p>
            </div>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#22C55E]/15">
                <h3 className="text-[#22C55E] text-xs uppercase tracking-wider mb-3">Pros</h3>
                <ul className="space-y-2">
                  {broker.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-[#9AA0B4]">
                      <CheckCircle size={12} className="text-[#22C55E] shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-[#0E0F17] border border-red-500/15">
                <h3 className="text-red-400 text-xs uppercase tracking-wider mb-3">Cons</h3>
                <ul className="space-y-2">
                  {broker.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-[#9AA0B4]">
                      <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Spreads */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1C1E2B]"><h2 className="text-sm text-[#EEF0F6]">Typical Spreads</h2></div>
              <div className="grid grid-cols-3 px-5 py-2.5 bg-[#141622] text-xs text-[#6E7489] uppercase tracking-wider">
                <span>Pair</span><span className="text-right">Typical</span><span className="text-right">Min</span>
              </div>
              {broker.spreadsTable.map((row) => (
                <div key={row.pair} className="grid grid-cols-3 px-5 py-3 border-t border-[#1C1E2B] hover:bg-[#141622]/50 transition-colors">
                  <span className="text-xs text-[#9AA0B4]">{row.pair}</span>
                  <span className="text-right text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{row.typical}</span>
                  <span className="text-right text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>{row.min}</span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-[#EEF0F6]">User Reviews</h2>
                <div className="flex items-center gap-1.5 text-xs text-[#6E7489]">
                  <Star size={12} className="text-[#C9A84C] fill-[#C9A84C]" />
                  {broker.rating} / 5 · {broker.reviews.toLocaleString()} reviews
                </div>
              </div>
              <div className="space-y-3">
                {broker.userReviews.map((review, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#141622] border border-[#1C1E2B] flex items-center justify-center text-xs text-[#C9A84C]">{review.author[0]}</div>
                      <div className="flex-1">
                        <div className="text-xs text-[#EEF0F6]">{review.author}</div>
                        <div className="text-xs text-[#6E7489]">{review.date}</div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={10} className={j < review.rating ? "text-[#C9A84C] fill-[#C9A84C]" : "text-[#2A2D3E]"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#9AA0B4] leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Safety score */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-3">Safety Score</div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1C1E2B" strokeWidth="2.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={riskColor} strokeWidth="2.5"
                      strokeDasharray={`${broker.scamScore} ${100 - broker.scamScore}`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: riskColor }}>{broker.scamScore}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#EEF0F6] mb-0.5">{broker.scamRisk} Risk</div>
                  <div className="text-xs text-[#6E7489]">Based on 14 criteria</div>
                </div>
              </div>
              <Link to="/scam-alerts" className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1">
                View safety database <ChevronRight size={11} />
              </Link>
            </div>

            {/* Key info */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-3">Key Information</div>
              <div className="space-y-3">
                {[
                  { label: "Founded", value: broker.founded.toString() },
                  { label: "Headquarters", value: broker.headquarters },
                  { label: "Type", value: broker.type },
                  { label: "Withdrawal", value: broker.withdrawalTime },
                  { label: "Commission", value: broker.commissionPerLot + " / lot" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-[#6E7489]">{label}</span>
                    <span className="text-[#9AA0B4]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-3">Features</div>
              <div className="space-y-2">
                {[
                  { label: "Segregated Funds", val: broker.segregatedFunds },
                  { label: "Negative Balance Protection", val: broker.negativeBalanceProtection },
                  { label: "Islamic Account", val: broker.islamicAccount },
                  { label: "Demo Account", val: broker.demoAccount },
                ].map(({ label, val }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA0B4]">{label}</span>
                    {val ? <CheckCircle size={13} className="text-[#22C55E]" /> : <span className="text-[#6E7489]">—</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-3">Platforms</div>
              <div className="flex flex-wrap gap-2">
                {broker.platforms.map((p) => (
                  <span key={p} className="text-xs px-2.5 py-1.5 rounded-lg bg-[#141622] border border-[#1C1E2B] text-[#9AA0B4]">{p}</span>
                ))}
              </div>
            </div>

            <a href={`https://${broker.website}`} target="_blank" rel="noopener noreferrer"
              className="block w-full py-3 bg-[#C9A84C] text-[#09090E] rounded-xl text-sm text-center hover:bg-[#D4B55A] transition-colors">
              Open Live Account →
            </a>
            <p className="text-xs text-[#6E7489] text-center">Affiliate disclosure: We may earn commission on signups.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
