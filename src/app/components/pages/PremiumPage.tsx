import { Link } from "react-router";
import { Check, Zap, Shield, Bell, BarChart2, Users, BookOpen, Star } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to get started.",
    cta: "Get Started Free",
    ctaLink: "/register",
    highlight: false,
    features: [
      "Live market rates & ticker",
      "Economic calendar (basic)",
      "Market news feed",
      "Broker directory access",
      "Academy Preschool & Elementary",
      "Basic trading calculators",
      "Community forum access",
    ],
    missing: ["Advanced charting tools", "Price & event alerts", "Ad-free experience", "Broker comparison (full)", "Academy Intermediate & Advanced", "Portfolio analytics", "Priority support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "per month",
    desc: "For active traders who want every edge.",
    cta: "Start 14-Day Free Trial",
    ctaLink: "/register",
    highlight: true,
    features: [
      "Everything in Free",
      "100% ad-free experience",
      "Unlimited price & event alerts",
      "Full economic calendar with email alerts",
      "Advanced charting & volatility tools",
      "Full broker comparison tool",
      "All Academy levels + certifications",
      "Sentiment & correlation tools",
      "Portfolio performance analytics",
      "Priority customer support",
    ],
    missing: [],
  },
  {
    id: "team",
    name: "Team",
    price: "$49",
    period: "per month",
    desc: "For prop firms, signal providers, and trading teams.",
    cta: "Contact Sales",
    ctaLink: "/contact",
    highlight: false,
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared watchlists & alerts",
      "API access for data feeds",
      "White-label economic calendar widget",
      "Custom broker shortlist for your team",
      "Dedicated account manager",
      "SLA-backed uptime guarantee",
    ],
    missing: [],
  },
];

const testimonials = [
  { name: "Ahmed R.", role: "Forex Trader, Dubai", text: "The Pro alerts alone are worth the $19. I haven't missed a high-impact event since I subscribed.", rating: 5 },
  { name: "Sarah L.", role: "Trading Coach, London", text: "My students use the Academy levels and the broker comparison tool constantly. Pro pays for itself.", rating: 5 },
  { name: "Marcus T.", role: "Prop Trader", text: "The Team plan with API access lets us pipe the calendar data directly into our internal dashboard. Exactly what we needed.", rating: 5 },
];

const proFeatureDetails = [
  { icon: Bell, title: "Smart Alerts", desc: "Custom price alerts on any pair and push/email notifications for high-impact events." },
  { icon: BarChart2, title: "Advanced Tools", desc: "Sentiment heatmaps, correlation matrix, volatility tracker, and backtesting simulator." },
  { icon: Shield, title: "Ad-Free", desc: "Clean, distraction-free platform. No banner ads, no pop-ups." },
  { icon: BookOpen, title: "Full Academy", desc: "Intermediate and Advanced courses, certifications, and exclusive webinars." },
  { icon: Users, title: "Priority Support", desc: "Dedicated email lane with 4-hour response time, Mon–Fri." },
  { icon: Zap, title: "Portfolio Analytics", desc: "Upload your trade history and get detailed performance metrics and insights." },
];

export function PremiumPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 mb-5">
            <Zap size={12} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C]">No credit card required · Cancel anytime</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Upgrade Your Trading Edge
          </h1>
          <p className="text-[#6E7489] text-sm max-w-lg mx-auto">Start free. Upgrade when you need more. Every plan includes our core platform — Pro adds the professional-grade tools serious traders use.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {plans.map((plan) => (
            <div key={plan.id} className={`rounded-2xl border p-6 flex flex-col relative ${plan.highlight ? "border-[#C9A84C]/40 bg-[#C9A84C]/5" : "border-[#1C1E2B] bg-[#0E0F17]"}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#C9A84C] text-[#09090E] text-xs rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="mb-4">
                <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-1">{plan.name}</div>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="text-3xl text-[#EEF0F6]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{plan.price}</span>
                  <span className="text-xs text-[#6E7489] mb-1">{plan.period}</span>
                </div>
                <p className="text-xs text-[#9AA0B4]">{plan.desc}</p>
              </div>

              <Link
                to={plan.ctaLink}
                className={`w-full py-2.5 rounded-lg text-sm text-center mb-5 transition-colors ${plan.highlight ? "bg-[#C9A84C] text-[#09090E] hover:bg-[#D4B55A]" : "border border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E] hover:text-[#EEF0F6]"}`}
              >
                {plan.cta}
              </Link>

              <div className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-[#9AA0B4]">
                    <Check size={12} className="text-[#22C55E] shrink-0 mt-0.5" /> {f}
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-[#6E7489] opacity-50">
                    <span className="w-3 h-3 rounded-full border border-[#6E7489] shrink-0 mt-0.5 flex items-center justify-center text-[8px]">–</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro features detail */}
        <div className="mb-16">
          <h2 className="text-[#EEF0F6] text-center mb-8" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>What's included in Pro</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {proFeatureDetails.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center mb-3">
                  <Icon size={16} className="text-[#C9A84C]" />
                </div>
                <div className="text-sm text-[#EEF0F6] mb-1">{title}</div>
                <div className="text-xs text-[#9AA0B4] leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="text-[#EEF0F6] text-center mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>What Pro traders say</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="text-[#C9A84C] fill-[#C9A84C]" />)}
                </div>
                <p className="text-xs text-[#9AA0B4] leading-relaxed mb-3">"{t.text}"</p>
                <div>
                  <div className="text-xs text-[#EEF0F6]">{t.name}</div>
                  <div className="text-xs text-[#6E7489]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
