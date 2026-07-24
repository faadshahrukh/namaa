import { Link } from "react-router";

const siteMap = [
  {
    section: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Broker Directory", href: "/brokers" },
      { label: "Economic Calendar", href: "/calendar" },
      { label: "Market News", href: "/news" },
      { label: "Trading Academy", href: "/academy" },
      { label: "Trading Tools", href: "/tools" },
      { label: "Scam Alerts", href: "/scam-alerts" },
    ],
  },
  {
    section: "Brokers",
    links: [
      { label: "All Brokers", href: "/brokers" },
      { label: "Compare Brokers", href: "/brokers/compare" },
      { label: "IC Markets Profile", href: "/brokers/ic-markets" },
      { label: "Pepperstone Profile", href: "/brokers/pepperstone" },
      { label: "XM Group Profile", href: "/brokers/xm-group" },
      { label: "OANDA Profile", href: "/brokers/oanda" },
      { label: "IG Group Profile", href: "/brokers/ig-group" },
      { label: "Exness Profile", href: "/brokers/exness" },
    ],
  },
  {
    section: "Academy",
    links: [
      { label: "Academy Overview", href: "/academy" },
      { label: "Preschool Level", href: "/academy/preschool" },
      { label: "Elementary Level", href: "/academy/elementary" },
      { label: "Intermediate Level", href: "/academy/intermediate" },
      { label: "Advanced Level", href: "/academy/advanced" },
      { label: "My Dashboard", href: "/dashboard" },
    ],
  },
  {
    section: "Account",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "My Alerts", href: "/alerts" },
      { label: "Premium Plans", href: "/premium" },
    ],
  },
  {
    section: "Community",
    links: [
      { label: "Community Forum", href: "/forum" },
      { label: "Help Center", href: "/help" },
    ],
  },
  {
    section: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Advertise with Us", href: "/advertise" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    section: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Risk Disclosure", href: "/risk-disclosure" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export function SitemapPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Sitemap</h1>
          <p className="text-[#6E7489] text-sm">A complete directory of all pages on Namaa Markets.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteMap.map(({ section, links }) => (
            <div key={section}>
              <h2 className="text-xs text-[#6E7489] uppercase tracking-widest mb-3">{section}</h2>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link to={href} className="text-sm text-[#9AA0B4] hover:text-[#C9A84C] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
