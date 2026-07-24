import { Link } from "react-router";
import { Handshake, TrendingUp, Users, BarChart2, CheckCircle, ArrowRight, Globe } from "lucide-react";

const partnerTypes = [
  {
    icon: TrendingUp,
    title: "Broker Partnerships",
    desc: "Get your brokerage listed, verified, and featured on Namaa Markets. Our traders are actively seeking regulated brokers — we send qualified, high-intent leads.",
    features: ["Verified broker profile page", "Featured placement in rankings", "Performance-based affiliate programme", "Custom review campaigns", "Co-branded educational content"],
    cta: "Apply for Listing",
  },
  {
    icon: Globe,
    title: "Media & Affiliate Partners",
    desc: "Earn commission by referring traders to Namaa Markets premium subscriptions or partner brokers. Competitive rates with transparent tracking.",
    features: ["Up to 40% revenue share on subscriptions", "Per-deposit affiliate commission on brokers", "Real-time dashboard with conversion tracking", "Dedicated affiliate manager", "Custom landing pages"],
    cta: "Join Affiliate Programme",
  },
  {
    icon: Users,
    title: "Technology Partners",
    desc: "Integrate your data feeds, trading tools, or financial technology into the Namaa Markets platform. Reach 10,000+ daily active traders.",
    features: ["API data feed integrations", "Widget embedding & white-label options", "Co-marketing and joint campaigns", "Platform co-development agreements", "Priority technical support"],
    cta: "Discuss Integration",
  },
];

const stats = [
  { value: "10,000+", label: "Monthly active traders" },
  { value: "65%", label: "Are actively seeking a broker" },
  { value: "4.2 min", label: "Avg session duration" },
  { value: "50+", label: "Countries represented" },
];

export function PartnershipsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Handshake size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Work With Us</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Partnership Opportunities</h1>
          <p className="text-[#6E7489] text-sm max-w-xl">We work with brokers, data providers, media companies, and fintech platforms. Let's grow together.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Audience stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
              <div className="text-xl mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{s.value}</div>
              <div className="text-xs text-[#6E7489]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Partner types */}
        <div className="space-y-5">
          {partnerTypes.map(({ icon: Icon, title, desc, features, cta }) => (
            <div key={title} className="p-6 rounded-2xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all">
              <div className="flex gap-5 flex-wrap">
                <div className="w-11 h-11 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-[#C9A84C]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{title}</h3>
                  <p className="text-sm text-[#9AA0B4] leading-relaxed mb-4">{desc}</p>
                  <div className="grid sm:grid-cols-2 gap-1.5 mb-5">
                    {features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#9AA0B4]">
                        <CheckCircle size={11} className="text-[#22C55E] shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">
                    {cta} <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
