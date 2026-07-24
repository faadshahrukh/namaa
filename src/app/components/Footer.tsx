import { Link } from "react-router";
import { Twitter, Youtube, Linkedin, Facebook, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import logo from "../../imports/Frame_14.png";
import { useTheme } from "../context/ThemeContext";

const footerLinks = {
  Platform: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Advertise", href: "/advertise" },
    { label: "Careers", href: "/careers" },
  ],
  Resources: [
    { label: "Brokers", href: "/brokers" },
    { label: "Economic Calendar", href: "/calendar" },
    { label: "Market News", href: "/news" },
    { label: "Trading Academy", href: "/academy" },
    { label: "Tools", href: "/tools" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Community Forum", href: "/forum" },
    { label: "Scam Alerts", href: "/scam-alerts" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Risk Disclosure", href: "/risk-disclosure" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Access Policy", href: "/admin" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Send, href: "https://t.me", label: "Telegram" },
];


export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0E0F17] border-t border-[#1C1E2B]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src={logo} alt="Namaa Markets" className={`h-9 w-auto mb-4 ${isDark ? "brightness-0 invert" : "brightness-0"}`} />
            </Link>
            <p className="text-[#6E7489] text-sm leading-relaxed mb-5">
              Your trusted partner for forex market intelligence, broker research, and trader education.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="p-2 rounded-md bg-[#141622] text-[#6E7489] hover:text-[#EEF0F6] hover:bg-[#1C1E2B] transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs text-[#6E7489] uppercase tracking-widest mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-[#9AA0B4] hover:text-[#EEF0F6] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-[#1C1E2B]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm text-[#EEF0F6] mb-1">Market Intelligence Newsletter</h4>
              <p className="text-xs text-[#6E7489]">Daily briefings, high-impact events, and verified broker alerts.</p>
            </div>
            {subscribed ? (
              <p className="text-sm text-[#22C55E]">✓ Subscribed! Check your inbox.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                <input type="email" placeholder="your@email.com" value={email}
                  onChange={(e) => setEmail(e.target.value)} required
                  className="flex-1 md:w-64 px-3.5 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/50" />
                <button type="submit"
                  className="px-4 py-2.5 text-sm bg-[#C9A84C] text-[#09090E] rounded-md hover:bg-[#D4B55A] transition-colors flex items-center gap-1.5 shrink-0">
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#1C1E2B] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6E7489]">© 2025 Namaa Markets. All rights reserved.</p>
          <p className="text-xs text-[#6E7489] text-center sm:text-right max-w-lg">
            Trading forex and CFDs carries significant risk of loss. Content is for informational purposes only.{" "}
            <Link to="/risk-disclosure" className="hover:text-[#C9A84C] transition-colors">Risk Disclosure</Link>
            {" · "}
            <Link to="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
