import { Link } from "react-router";
import { Shield, TrendingUp, BookOpen, Users, Globe, Award, ChevronRight, ArrowRight } from "lucide-react";
import logo from "../../../../imports/Frame_14.png";

const values = [
  { icon: Shield, title: "Trust First", desc: "Every broker listing is independently verified. Every scam alert is evidence-reviewed. We never publish what we can't stand behind." },
  { icon: TrendingUp, title: "Data Over Opinion", desc: "Market data, regulation databases, and user-verified reviews — not paid placements or affiliate bias." },
  { icon: BookOpen, title: "Education for All", desc: "Whether you've never traded a pip or run a $1M portfolio, our Academy meets you where you are." },
  { icon: Globe, title: "Global Coverage", desc: "Serving traders in 50+ countries with localized timezone, currency, and regulatory information." },
];

const team = [
  { name: "Khalid Al-Rashid", role: "CEO & Co-founder", bio: "15 years in institutional FX at Barclays and Deutsche Bank. Founded Namaa Markets to bring institutional-grade tools to retail traders." },
  { name: "Sarah Chen", role: "CTO & Co-founder", bio: "Former engineering lead at Bloomberg LP. Architected real-time data systems serving 400,000+ daily users." },
  { name: "Marcus Webb", role: "Head of Research", bio: "CFA charterholder with 12 years as an FX strategist. Previously at Société Générale and Standard Chartered." },
  { name: "Aisha Okonkwo", role: "Head of Education", bio: "Former Forex Factory community manager and author of two bestselling trading psychology books." },
];

const milestones = [
  { year: "2020", event: "Namaa Markets founded in Dubai with a mission to democratize forex market intelligence." },
  { year: "2021", event: "Launched broker verification database with 50 initial listings. Reached 1,000 monthly users." },
  { year: "2022", event: "Economic Calendar goes live with real-time data feeds. 25,000 monthly active users." },
  { year: "2023", event: "Trading Academy launches with 40+ lessons. Community forum exceeds 5,000 members." },
  { year: "2024", event: "Expanded to 200+ broker listings, 8 tool suites, and a live scam alert database." },
  { year: "2025", event: "10,000+ daily active traders. Serving users in 50+ countries across 6 continents." },
];

const stats = [
  { value: "10,000+", label: "Daily Active Traders" },
  { value: "238", label: "Verified Brokers" },
  { value: "50+", label: "Countries" },
  { value: "82", label: "Academy Lessons" },
];

export function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#C9A84C 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 relative">
          <img src={logo} alt="Namaa Markets" className="h-10 brightness-0 invert mb-8" />
          <h1 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Built by traders,<br />for traders.
          </h1>
          <p className="text-[#6E7489] text-base leading-relaxed max-w-xl mb-8">
            Namaa Markets was founded with one conviction: retail traders deserve the same quality of market intelligence, broker research, and education that institutional desks take for granted.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="p-4 rounded-xl bg-[#141622] border border-[#1C1E2B] text-center">
                <div className="text-xl mb-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{s.value}</div>
                <div className="text-xs text-[#6E7489]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <p className="text-[#9AA0B4] text-sm leading-relaxed">
              The forex market is the world's largest financial market — yet it remains one of the least transparent for retail participants. Brokers go unvetted. Scams proliferate. Educational resources are scattered and unreliable. High-quality economic data sits behind expensive paywalls.
            </p>
            <p className="text-[#9AA0B4] text-sm leading-relaxed">
              Namaa Markets changes this. We provide free, professional-grade market intelligence: a verified broker database, a real-time economic calendar, curated market news, structured forex education, and a community scam-alert system — all in one platform.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-sm text-[#EEF0F6] mb-1">{title}</div>
                  <div className="text-xs text-[#9AA0B4] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>Our Journey</h2>
          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-[#1C1E2B]" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex items-start gap-6">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{m.year}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-1.5 shrink-0 relative z-10" />
                  <p className="text-sm text-[#9AA0B4] leading-relaxed flex-1">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.6rem" }}>Leadership Team</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {team.map((member) => (
              <div key={member.name} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#141622] border border-[#1C1E2B] flex items-center justify-center text-sm text-[#C9A84C]">
                    {member.name[0]}
                  </div>
                  <div>
                    <div className="text-sm text-[#EEF0F6]">{member.name}</div>
                    <div className="text-xs text-[#6E7489]">{member.role}</div>
                  </div>
                </div>
                <p className="text-xs text-[#9AA0B4] leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-[#0E0F17] border border-[#1C1E2B] p-8 text-center">
          <h2 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.4rem" }}>Join our community</h2>
          <p className="text-[#6E7489] text-sm mb-6 max-w-md mx-auto">10,000+ traders trust Namaa Markets daily. Join free and get instant access to all tools.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">
              Create Free Account <ArrowRight size={13} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1C1E2B] text-[#9AA0B4] rounded-lg text-sm hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
