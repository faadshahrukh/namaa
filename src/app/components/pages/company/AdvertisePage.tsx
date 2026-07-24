import { Link } from "react-router";
import { BarChart2, Target, Users, Eye, ArrowRight, CheckCircle, Zap } from "lucide-react";

const adFormats = [
  { title: "Homepage Banner", placement: "Hero section + above fold", impressions: "~45,000/mo", formats: ["728×90", "300×250", "320×50 mobile"], cpm: "$18–28" },
  { title: "Broker Listing Spotlight", placement: "Top of broker results", impressions: "~30,000/mo", formats: ["Native card format", "Logo + CTA"], cpm: "$25–40" },
  { title: "Calendar Sponsorship", placement: "Economic calendar header", impressions: "~22,000/mo", formats: ["Logo + 60-char tagline", "300×100 banner"], cpm: "$22–35" },
  { title: "Newsletter Placement", placement: "Daily briefing email", impressions: "~8,000 opens", formats: ["170×80 image + copy", "Text placement"], cpm: "$30–50" },
  { title: "Academy Co-Brand", placement: "Lesson pages & completion screens", impressions: "~12,000/mo", formats: ["Sponsored lesson", "Banner + logo"], cpm: "$20–35" },
];

const audience = [
  { label: "Active retail forex traders", pct: "68%" },
  { label: "Actively seeking a broker", pct: "61%" },
  { label: "Account balance $5k+", pct: "44%" },
  { label: "Age 25–45", pct: "71%" },
  { label: "Middle East & Asia-Pacific", pct: "58%" },
];

export function AdvertisePage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Advertise</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Reach Serious Forex Traders</h1>
          <p className="text-[#6E7489] text-sm max-w-xl">10,000+ active traders visit Namaa Markets daily — most are actively researching brokers. Put your brand in front of exactly the right audience.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Eye, value: "320K+", label: "Monthly page views" },
            { icon: Users, value: "10K+", label: "Daily active users" },
            { icon: BarChart2, value: "4.2 min", label: "Avg session time" },
            { icon: Zap, value: "61%", label: "Broker-seeking intent" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
              <Icon size={16} className="text-[#C9A84C] mx-auto mb-2" />
              <div className="text-xl mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{value}</div>
              <div className="text-xs text-[#6E7489]">{label}</div>
            </div>
          ))}
        </div>

        {/* Audience breakdown */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Our Audience</h2>
            <div className="space-y-3">
              {audience.map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-[#9AA0B4]">{label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{pct}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1C1E2B] overflow-hidden">
                    <div className="h-full rounded-full bg-[#C9A84C]" style={{ width: pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141622] to-[#0E0F17] border border-[#C9A84C]/15">
            <h3 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Request a Media Kit</h3>
            <p className="text-sm text-[#9AA0B4] mb-4">Full rate card, audience analytics, and ad specifications. We'll respond within one business day.</p>
            <input type="email" placeholder="Work email address" className="w-full px-4 py-2.5 mb-3 bg-[#09090E] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
            <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">
              Request Media Kit <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Ad formats */}
        <div>
          <h2 className="text-[#EEF0F6] mb-5" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Ad Formats & Placements</h2>
          <div className="space-y-3">
            {adFormats.map((f) => (
              <div key={f.title} className="grid sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] items-center">
                <div>
                  <div className="text-sm text-[#EEF0F6] mb-0.5">{f.title}</div>
                  <div className="text-xs text-[#6E7489]">{f.placement}</div>
                </div>
                <div className="text-xs text-[#9AA0B4]"><span className="text-[#6E7489] block mb-0.5">Impressions</span>{f.impressions}</div>
                <div className="text-xs text-[#9AA0B4]"><span className="text-[#6E7489] block mb-0.5">Formats</span>{f.formats.join(" · ")}</div>
                <div className="text-right">
                  <div className="text-xs text-[#6E7489] mb-0.5">CPM Range</div>
                  <div className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{f.cpm}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#6E7489] text-center">All advertising placements are clearly labelled as "Sponsored" in compliance with our editorial standards. Namaa Markets does not accept advertising that conflicts with our broker safety ratings.</p>
      </div>
    </div>
  );
}
