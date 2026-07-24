const sections = [
  { title: "1. Information We Collect", body: `We collect information you provide directly to us when you register for an account, subscribe to our newsletter, submit a broker report, or contact us. This includes your name, email address, trading experience level, and any content you submit.

We automatically collect certain information when you use Namaa Markets, including log data (IP address, browser type, pages visited, time spent), device information, and cookies and similar tracking technologies.

We do not collect or store financial information such as credit card numbers or bank account details.` },
  { title: "2. How We Use Your Information", body: `We use the information we collect to provide, maintain, and improve our services; send you transactional communications and newsletters (with your consent); personalise your experience based on your stated preferences; monitor and analyse usage trends; detect and prevent fraudulent or abusive activity; and comply with legal obligations.

We do not sell your personal information to third parties. We do not use your data to make automated decisions that have legal or similarly significant effects on you.` },
  { title: "3. Cookies and Tracking", body: `We use essential cookies required for the platform to function, analytics cookies (via anonymised, aggregated data) to understand how users interact with our services, and preference cookies to remember your settings.

You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of some features. We do not use third-party advertising cookies or tracking pixels.` },
  { title: "4. Data Sharing", body: `We share your information only with service providers who assist us in operating our platform (hosting, email delivery, analytics) under strict data processing agreements; when required by law, court order, or regulatory authority; and with your explicit consent.

Broker affiliate links on our platform may be tracked by third-party affiliate networks. When you click an affiliate link, the third party may place a cookie on your browser. Their privacy policies govern how they use that data.` },
  { title: "5. Data Retention", body: `We retain your personal data for as long as your account is active or as needed to provide our services. You may request deletion of your account and associated data at any time by contacting us at privacy@namaamarkets.com. We will process deletion requests within 30 days, subject to any legal retention obligations.` },
  { title: "6. Your Rights", body: `Depending on your location, you may have the following rights: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to or restrict certain processing; request portability of your data; and withdraw consent where processing is based on consent.

To exercise any of these rights, contact us at privacy@namaamarkets.com.` },
  { title: "7. Security", body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include encryption in transit (HTTPS/TLS), hashed password storage, and access controls.

No method of internet transmission or storage is 100% secure. We cannot guarantee absolute security but we take our obligations seriously and respond promptly to any data incidents.` },
  { title: "8. Contact Us", body: `For privacy-related inquiries, contact our Data Protection Officer at:\n\nEmail: privacy@namaamarkets.com\nAddress: Namaa Markets Ltd, DIFC, Dubai, UAE\n\nThis policy was last updated on June 15, 2025.` },
];

export function PrivacyPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Privacy Policy</h1>
          <p className="text-[#6E7489] text-sm">Last updated: June 15, 2025 · Effective: June 15, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <p className="text-sm text-[#9AA0B4] leading-relaxed">This Privacy Policy describes how Namaa Markets Ltd ("Namaa Markets", "we", "our", "us") collects, uses, and shares information about you when you use our website and services. By using Namaa Markets, you agree to the collection and use of information in accordance with this policy.</p>
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-[#EEF0F6] mb-3 text-base" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{s.title}</h2>
            <div className="space-y-3">
              {s.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-[#9AA0B4] leading-relaxed whitespace-pre-line">{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
