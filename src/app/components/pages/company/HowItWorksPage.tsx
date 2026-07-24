import { Link } from "react-router";
import { Search, Shield, BookOpen, BarChart2, Bell, Users, ArrowRight } from "lucide-react";

const steps = [
  { step: "01", icon: Search, title: "Discover & Research", desc: "Search our database of 238 verified brokers. Filter by regulation (FCA, ASIC, CySEC), account type, spreads, platforms, and deposit requirements. Every broker has been independently reviewed.", link: "/brokers", linkLabel: "Browse Brokers" },
  { step: "02", icon: Shield, title: "Verify Safety", desc: "Check any broker's safety score, regulation status, and community scam reports before depositing. Our scam database is updated in real time from regulatory sources and user evidence.", link: "/scam-alerts", linkLabel: "Check Scam Alerts" },
  { step: "03", icon: BarChart2, title: "Follow the Markets", desc: "Track the economic calendar for high-impact events, read real-time analysis, and monitor live rates. Set personalized alerts for price moves and data releases.", link: "/calendar", linkLabel: "Open Calendar" },
  { step: "04", icon: BookOpen, title: "Learn to Trade", desc: "Work through our structured Academy — from Preschool (absolute beginner) to Advanced (institutional-grade strategies). Earn certifications as you complete each level.", link: "/academy", linkLabel: "Start Learning" },
  { step: "05", icon: Bell, title: "Stay Informed", desc: "Subscribe to our daily market briefing. Get high-impact event alerts, breaking news notifications, and scam warnings — all personalised to your watchlist and preferences.", link: "/register", linkLabel: "Create Free Account" },
  { step: "06", icon: Users, title: "Join the Community", desc: "Discuss markets, share analysis, and get feedback in our trader forum. Compare notes with 10,000+ traders across 50+ countries.", link: "/forum", linkLabel: "Visit Forum" },
];

export function HowItWorksPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>How Namaa Markets Works</h1>
          <p className="text-[#6E7489] text-sm max-w-xl">Everything a forex trader needs — broker research, market data, education, and community — in one transparent, trader-first platform.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {steps.map(({ step, icon: Icon, title, desc, link, linkLabel }) => (
            <div key={step} className="flex gap-5 p-6 rounded-2xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group">
              <div className="shrink-0">
                <div className="text-2xl mb-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1C1E2B" }}>{step}</div>
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#C9A84C]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.1rem" }}>{title}</h3>
                <p className="text-sm text-[#9AA0B4] leading-relaxed mb-3">{desc}</p>
                <Link to={link} className="inline-flex items-center gap-1.5 text-xs text-[#C9A84C] hover:underline">
                  {linkLabel} <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-[#141622] to-[#0E0F17] border border-[#C9A84C]/15 text-center">
          <h2 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Ready to get started?</h2>
          <p className="text-sm text-[#6E7489] mb-5">Create a free account in 60 seconds. No credit card required.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">
            Get Started Free <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
