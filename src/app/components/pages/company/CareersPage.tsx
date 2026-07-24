import { useState } from "react";
import { MapPin, Clock, ArrowRight, Briefcase, Users, Globe, Zap } from "lucide-react";
import { Link } from "react-router";

const openRoles = [
  { id: 1, title: "Senior FX Market Analyst", dept: "Research", location: "Dubai / Remote", type: "Full-time", desc: "Lead weekly and daily market analysis, covering major currency pairs, central bank decisions, and macroeconomic events. Minimum 5 years institutional FX experience required." },
  { id: 2, title: "Frontend Engineer (React / TypeScript)", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Build and maintain our trading tools, data dashboards, and educational platform. Experience with real-time data (WebSockets), charting libraries, and performance optimization required." },
  { id: 3, title: "Broker Research Analyst", dept: "Research", location: "Remote", type: "Full-time", desc: "Independently verify broker regulation, review terms, and produce detailed broker profiles. Background in compliance, regulatory research, or financial services preferred." },
  { id: 4, title: "Content Writer — Forex Education", dept: "Academy", location: "Remote", type: "Contract", desc: "Create engaging, accurate forex and trading education content at all levels. Traders who can also write clearly are especially welcome." },
  { id: 5, title: "Growth & Partnerships Manager", dept: "Business Development", location: "Dubai / London", type: "Full-time", desc: "Own our broker partnership program and affiliate relationships. Drive growth through strategic deals with brokers, fintech companies, and trading communities." },
];

const perks = [
  { icon: Globe, label: "Fully Remote-Friendly", desc: "Work from anywhere. Core team hours overlap 10am–4pm GMT." },
  { icon: Zap, label: "Fast-Moving Team", desc: "Small, focused teams with real ownership and impact from day one." },
  { icon: Users, label: "Trader-First Culture", desc: "Most of us are traders ourselves. We build what we'd want to use." },
  { icon: Briefcase, label: "Competitive Comp", desc: "Market salary + equity for senior roles + annual performance bonus." },
];

export function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const depts = ["All", ...Array.from(new Set(openRoles.map((r) => r.dept)))];
  const filtered = openRoles.filter((r) => selectedDept === "All" || r.dept === selectedDept);

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Join the Team</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>Careers at Namaa Markets</h1>
          <p className="text-[#6E7489] text-sm max-w-xl">We're a small, focused team building the forex platform we always wished existed. Join us if you care about transparency, trader education, and doing it properly.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Perks */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {perks.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <Icon size={18} className="text-[#C9A84C] mb-3" />
              <div className="text-sm text-[#EEF0F6] mb-1">{label}</div>
              <div className="text-xs text-[#9AA0B4] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        {/* Roles */}
        <div>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Open Positions ({filtered.length})</h2>
            <div className="flex gap-1.5">
              {depts.map((d) => (
                <button key={d} onClick={() => setSelectedDept(d)} className={`px-2.5 py-1.5 rounded text-xs transition-colors ${selectedDept === d ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}>{d}</button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((role) => (
              <div key={role.id} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-sm text-[#EEF0F6] group-hover:text-[#C9A84C] transition-colors">{role.title}</h3>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#141622] text-[#6E7489]">{role.dept}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${role.type === "Full-time" ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#C9A84C]/10 text-[#C9A84C]"}`}>{role.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#6E7489] mb-2">
                      <span className="flex items-center gap-1"><MapPin size={10} /> {role.location}</span>
                    </div>
                    <p className="text-xs text-[#9AA0B4] leading-relaxed">{role.desc}</p>
                  </div>
                  <Link to="/contact" className="flex items-center gap-1.5 px-4 py-2 bg-[#C9A84C] text-[#09090E] rounded-lg text-xs hover:bg-[#D4B55A] transition-colors shrink-0 mt-1">
                    Apply <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spontaneous */}
        <div className="p-6 rounded-2xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
          <h3 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Don't see a fit?</h3>
          <p className="text-sm text-[#6E7489] mb-4 max-w-sm mx-auto">We love spontaneous applications from talented people. Send us your story.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1C1E2B] text-[#9AA0B4] rounded-lg text-sm hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
