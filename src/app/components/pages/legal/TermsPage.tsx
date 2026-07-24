const sections = [
  { title: "1. Acceptance of Terms", body: `By accessing or using Namaa Markets ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. These terms apply to all visitors, registered users, and others who access the Platform.` },
  { title: "2. Description of Services", body: `Namaa Markets provides an online platform offering forex market data and analysis, an economic calendar, broker listings and reviews, educational content, trading tools, scam alert information, and community features. Our services are provided for informational and educational purposes only.` },
  { title: "3. Not Financial Advice", body: `IMPORTANT: Nothing on Namaa Markets constitutes financial, investment, or trading advice. All content — including broker reviews, market analysis, news, educational material, and tools — is for informational purposes only.

Trading forex and CFDs involves substantial risk of loss and may not be suitable for all investors. You should never trade with money you cannot afford to lose. Before trading, consider your experience level, investment objectives, and risk tolerance. Consider seeking independent financial advice.

Namaa Markets is not a licensed financial adviser, investment manager, or trading service. We do not manage client funds and do not provide personalised financial recommendations.` },
  { title: "4. Broker Affiliate Disclosure", body: `Namaa Markets participates in affiliate marketing programmes. When you click "Open Account" or similar buttons and open an account with a broker, we may receive a commission from that broker. This does not affect the price you pay for any service.

Our editorial reviews are conducted independently of our commercial relationships. Affiliate compensation is disclosed on all relevant pages. Brokers cannot pay to improve their safety rating or suppress negative reviews.` },
  { title: "5. User Accounts", body: `You must register for an account to access certain features. You are responsible for maintaining the confidentiality of your login credentials. You must notify us immediately of any unauthorised use of your account. You must be at least 18 years of age to register. You agree to provide accurate, current, and complete information.` },
  { title: "6. User-Generated Content", body: `By submitting broker reviews, forum posts, scam reports, or other content, you grant Namaa Markets a non-exclusive, royalty-free, worldwide licence to use, display, and distribute that content. You represent that your content is accurate, not defamatory, and does not infringe third-party rights. We reserve the right to remove any content that violates our community standards.` },
  { title: "7. Prohibited Conduct", body: `You agree not to: post false, defamatory, or misleading broker reviews; submit fabricated scam reports; use the Platform to advertise financial services without disclosure; attempt to scrape or systematically copy our data; use automated tools to access our services without permission; or engage in any activity that disrupts or interferes with the Platform.` },
  { title: "8. Intellectual Property", body: `All content on Namaa Markets — including text, graphics, logos, and software — is owned by Namaa Markets Ltd or its licensors and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.` },
  { title: "9. Limitation of Liability", body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NAMAA MARKETS AND ITS OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE PLATFORM OR ANY CONTENT THEREON.` },
  { title: "10. Governing Law", body: `These Terms shall be governed by the laws of the Dubai International Financial Centre (DIFC), UAE. Any disputes shall be subject to the exclusive jurisdiction of the DIFC Courts. These Terms were last updated on June 15, 2025.` },
];

export function TermsPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Terms of Service</h1>
          <p className="text-[#6E7489] text-sm">Last updated: June 15, 2025 · Effective: June 15, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-[#EEF0F6] mb-3 text-base" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{s.title}</h2>
            <div className="space-y-3">
              {s.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-[#9AA0B4] leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
