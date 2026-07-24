export function CookiePolicyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Cookie Policy</h1>
          <p className="text-[#6E7489] text-sm">Last updated: June 15, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <p className="text-sm text-[#9AA0B4] leading-relaxed">This Cookie Policy explains how Namaa Markets uses cookies and similar technologies when you visit our platform.</p>
        {[
          { title: "What are cookies?", body: "Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences, keep you logged in, and understand how you use the site. Cookies cannot carry viruses or access your personal files." },
          { title: "Essential Cookies", body: "These cookies are necessary for the platform to function. They enable core features like user authentication, session management, timezone preferences, and security. You cannot opt out of essential cookies without disabling the platform." },
          { title: "Analytics Cookies", body: "We use anonymised, aggregated analytics to understand which pages are most visited and how users navigate the site. We do not use Google Analytics with personally identifiable information. All data is aggregated before being stored." },
          { title: "Preference Cookies", body: "These cookies remember your settings such as dark/light mode, timezone selection, watchlist, and calendar filters. They improve your experience by not requiring you to reconfigure settings on each visit." },
          { title: "Affiliate Tracking Cookies", body: "When you click broker affiliate links, the broker or their affiliate network may set a tracking cookie. This lets them attribute your account registration to our platform for commission purposes. You can disable these through your browser settings." },
          { title: "Managing Cookies", body: "You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be alerted when a cookie is set. Note that disabling cookies may affect functionality. For guidance on managing cookies in your specific browser, visit the browser's help documentation." },
        ].map((s) => (
          <div key={s.title}>
            <h2 className="text-[#EEF0F6] mb-2 text-base" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{s.title}</h2>
            <p className="text-sm text-[#9AA0B4] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
