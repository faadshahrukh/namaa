import { useState } from "react";
import { Link } from "react-router";
import { Search, ChevronRight, ChevronDown, MessageSquare, Mail, BookOpen } from "lucide-react";

const faqCategories = [
  {
    category: "Getting Started",
    items: [
      { q: "Is Namaa Markets free to use?", a: "Yes — the core platform is completely free. You can access broker listings, the economic calendar, market news, and the Preschool and Elementary Academy levels without any payment. Pro features like advanced alerts, full Academy access, and ad-free experience require a $19/month subscription." },
      { q: "Do I need to create an account?", a: "You can browse most content without an account. However, creating a free account unlocks personalized alerts, watchlists, learning progress tracking, bookmarks, and community forum participation. Registration takes 60 seconds." },
      { q: "Is Namaa Markets regulated or licensed?", a: "Namaa Markets is an information and education platform, not a financial services provider. We do not require a financial services licence. All financial services (trading, brokerage) are provided by the licensed brokers we list, not by us." },
    ],
  },
  {
    category: "Brokers",
    items: [
      { q: "How does Namaa Markets verify brokers?", a: "Every broker is independently checked against official regulatory databases (FCA, ASIC, CySEC, etc.), their terms and conditions are reviewed, user reviews are moderated, and a safety score is calculated based on 14 criteria including regulation quality, fund segregation, withdrawal history, and complaint record." },
      { q: "Do you get paid by brokers?", a: "We participate in affiliate programmes — when you click 'Open Account' and register with a broker, we may earn a commission. This is clearly disclosed on all relevant pages. Affiliate relationships do not affect our safety ratings, and brokers cannot pay to improve their review scores." },
      { q: "Can I submit a broker review?", a: "Yes. Registered users can submit broker reviews. Reviews are moderated for accuracy and may be removed if they appear to be fake (from brokers or their competitors) or are defamatory without evidence." },
    ],
  },
  {
    category: "Economic Calendar",
    items: [
      { q: "How real-time is the calendar data?", a: "Actual results are published within seconds of the official release. Forecasts and previous values are updated as consensus estimates change. The calendar is refreshed continuously throughout the trading day." },
      { q: "Can I filter the calendar by my pairs?", a: "Yes. Use the currency filter to show only events relevant to the currencies in your watchlist. You can also filter by impact level (High, Medium, Low) and date range." },
      { q: "How do I set event alerts?", a: "Click on any event row to expand it, then click 'Set Alert'. You'll receive an email and/or push notification (requires a registered account) before the event. Pro users get unlimited alerts; free users get up to 5 per month." },
    ],
  },
  {
    category: "Academy",
    items: [
      { q: "Do I need trading experience for the Academy?", a: "No. The Preschool level starts from absolute zero — what forex is, what a currency pair is, and how the market works. You can progress at your own pace through Elementary, Intermediate, and Advanced." },
      { q: "Are certifications included?", a: "Certificates are available for completing each Academy level. They are currently available to registered users and can be shared on LinkedIn or downloaded as a PDF." },
      { q: "Is the Academy available in other languages?", a: "Currently, all Academy content is in English. Arabic translations of the Preschool and Elementary levels are in development and expected to launch in Q3 2025." },
    ],
  },
];

export function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const allItems = faqCategories.flatMap((c) => c.items.map((i) => ({ ...i, cat: c.category })));
  const filtered = search ? allItems.filter((i) => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())) : null;

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Help Center</h1>
          <p className="text-[#6E7489] text-sm mb-6">Find answers or get in touch with our team.</p>
          <div className="relative max-w-md mx-auto">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E7489]" />
            <input type="text" placeholder="Search help articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-[#141622] border border-[#1C1E2B] rounded-xl text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick links */}
        {!search && (
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: BookOpen, label: "Academy Guide", desc: "Learn how to use the Trading Academy", link: "/academy" },
              { icon: MessageSquare, label: "Community Forum", desc: "Ask other traders for help", link: "/forum" },
              { icon: Mail, label: "Contact Support", desc: "Get help from our team", link: "/contact" },
            ].map(({ icon: Icon, label, desc, link }) => (
              <Link key={label} to={link} className="flex items-center gap-3 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-all group">
                <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="text-sm text-[#EEF0F6] group-hover:text-[#C9A84C] transition-colors">{label}</div>
                  <div className="text-xs text-[#6E7489]">{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* FAQ */}
        <div className="space-y-8">
          {(filtered ? [{ category: "Search Results", items: filtered }] : faqCategories).map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-xs text-[#6E7489] uppercase tracking-widest mb-3">{category}</h2>
              <div className="space-y-2">
                {items.map((item, i) => {
                  const key = `${category}-${i}`;
                  const isOpen = openFAQ === key;
                  return (
                    <div key={key} className={`rounded-xl border transition-colors ${isOpen ? "border-[#C9A84C]/25 bg-[#C9A84C]/4" : "border-[#1C1E2B] bg-[#0E0F17]"}`}>
                      <button onClick={() => setOpenFAQ(isOpen ? null : key)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                        <span className={`text-sm ${isOpen ? "text-[#C9A84C]" : "text-[#EEF0F6]"}`}>{item.q}</span>
                        {isOpen ? <ChevronDown size={14} className="text-[#C9A84C] shrink-0" /> : <ChevronRight size={14} className="text-[#6E7489] shrink-0" />}
                      </button>
                      {isOpen && <div className="px-5 pb-4 text-sm text-[#9AA0B4] leading-relaxed">{item.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
          <h3 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Still need help?</h3>
          <p className="text-sm text-[#6E7489] mb-4">Our support team responds within 24 hours, Mon–Fri.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors">
            <Mail size={13} /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
