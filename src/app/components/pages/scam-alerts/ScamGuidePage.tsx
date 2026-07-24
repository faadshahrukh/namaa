import { Link } from "react-router";
import { AlertTriangle, CheckCircle, Search, ArrowRight, Shield, XCircle, ExternalLink } from "lucide-react";

const redFlags = [
  { flag: "Unrealistic returns promised", detail: "Any broker guaranteeing 50%+ monthly returns, 'risk-free' trading, or 'guaranteed profits' is lying. Professional traders consider 15–20% annually exceptional." },
  { flag: "Pressure to deposit quickly", detail: "Legitimate brokers never pressure you to deposit. If you're told a 'bonus offer expires today' or you need to act now, this is a sales manipulation tactic common in fraudulent operations." },
  { flag: "Difficulty withdrawing funds", detail: "Withdrawal problems are the #1 sign of a scam broker. If your withdrawal is delayed beyond the stated processing time without clear explanation, act immediately." },
  { flag: "Unverifiable or fake regulation", detail: "Many scam brokers claim to be regulated but are not listed in the official regulatory database. Always verify directly on the regulator's website — not just the broker's website." },
  { flag: "No physical address or contact details", detail: "Legitimate brokers have verifiable business addresses, phone numbers, and responsive support. A broker with only a contact form and no company address is a serious red flag." },
  { flag: "Cold calls and unsolicited approaches", detail: "Legitimate brokers do not cold-call you to offer trading opportunities. Unsolicited approaches via phone, social media, or messaging apps claiming special opportunities are almost always scams." },
  { flag: "Clone firm impersonation", detail: "Fraudsters clone legitimate regulated brokers, copying their name, registration number, and website. Always verify the website URL and compare it to the official firm registered with the regulator." },
  { flag: "Unusually high leverage", detail: "While high leverage (1:500, 1:2000) exists at some regulated brokers, offers of unlimited leverage with no margin calls can indicate a bucket shop that trades against its clients." },
];

const steps = [
  { step: "01", title: "Stop all activity immediately", desc: "Do not deposit more money. Do not respond to pressure calls. Do not accept 'special offers' to recover losses. Preserve all evidence." },
  { step: "02", title: "Gather all evidence", desc: "Screenshot everything: account statements, chat logs, email correspondence, withdrawal requests and responses, and any contracts or agreements signed." },
  { step: "03", title: "Report to the regulator", desc: "Submit a complaint to the relevant financial regulator (FCA, ASIC, CySEC, etc.). Find the appropriate regulator at our regulatory authority database below." },
  { step: "04", title: "Report to Namaa Markets", desc: "Submit your report on our scam alerts page. This helps warn other traders and increases pressure on fraudulent operators." },
  { step: "05", title: "Contact law enforcement", desc: "For significant losses, file a report with your national police's cybercrime unit and, if applicable, Action Fraud (UK), the FBI IC3 (US), or equivalent." },
  { step: "06", title: "Be cautious of recovery scams", desc: "After being scammed, you may be contacted by 'fund recovery companies' — many of these are secondary scams. Legitimate legal firms do not cold-call scam victims." },
];

const regulators = [
  { name: "FCA (UK)", url: "register.fca.org.uk", note: "Financial Conduct Authority" },
  { name: "ASIC (Australia)", url: "moneysmart.gov.au/check", note: "Australian Securities & Investments Commission" },
  { name: "CySEC (Cyprus/EU)", url: "cysec.gov.cy/registers", note: "Cyprus Securities and Exchange Commission" },
  { name: "CFTC (USA)", url: "cftc.gov/Check", note: "Commodity Futures Trading Commission" },
  { name: "FSCA (South Africa)", url: "fsca.co.za", note: "Financial Sector Conduct Authority" },
  { name: "MAS (Singapore)", url: "mas.gov.sg/investor-protection", note: "Monetary Authority of Singapore" },
];

export function ScamGuidePage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-red-500/15 bg-[#0E0F17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-red-400" />
            <span className="text-xs text-red-400 uppercase tracking-wider">Trader Protection</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            How to Spot and Avoid Forex Scams
          </h1>
          <p className="text-[#6E7489] text-sm max-w-xl">
            Fraud costs retail forex traders billions of dollars annually. This guide covers the most common scam types, the red flags to watch for, and what to do if you've been defrauded.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Warning */}
        <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300 leading-relaxed">
              <strong>If you believe you've already been scammed:</strong> Do not deposit more funds. Stop all communication with the broker immediately. Skip to the "What to do if you've been scammed" section below and take action today.
            </p>
          </div>
        </div>

        {/* Red flags */}
        <section>
          <h2 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem" }}>
            8 Red Flags That Signal a Scam Broker
          </h2>
          <div className="space-y-3">
            {redFlags.map(({ flag, detail }, i) => (
              <div key={flag} className="flex gap-4 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                  <XCircle size={14} className="text-red-400" />
                </div>
                <div>
                  <div className="text-sm text-[#EEF0F6] mb-1">{flag}</div>
                  <p className="text-xs text-[#9AA0B4] leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification checklist */}
        <section>
          <h2 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem" }}>
            Before You Deposit: 5-Point Verification Checklist
          </h2>
          <div className="space-y-2">
            {[
              "Verify regulation status directly on the regulator's official website (not the broker's website)",
              "Search the broker name on Namaa Markets scam database and Google with 'scam' or 'withdrawal problem'",
              "Check for a real physical address and verify it is not a virtual office or residential address",
              "Test customer support — call the phone number, send an email, and use live chat before depositing",
              "Start with the minimum deposit only — never deposit your full trading capital with a new broker",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#0E0F17] border border-[#1C1E2B]">
                <CheckCircle size={14} className="text-[#22C55E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#9AA0B4]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What to do */}
        <section>
          <h2 className="text-[#EEF0F6] mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem" }}>
            What to Do If You've Been Scammed
          </h2>
          <div className="space-y-4">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div className="text-2xl shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#2A2D3E" }}>{step}</div>
                <div>
                  <div className="text-sm text-[#EEF0F6] mb-1">{title}</div>
                  <p className="text-xs text-[#9AA0B4] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory links */}
        <section>
          <h2 className="text-[#EEF0F6] mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.5rem" }}>Verify Regulation Directly</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {regulators.map((r) => (
              <div key={r.name} className="flex items-center justify-between p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                <div>
                  <div className="text-sm text-[#EEF0F6]">{r.name}</div>
                  <div className="text-xs text-[#6E7489]">{r.note}</div>
                </div>
                <a href={`https://${r.url}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[#C9A84C] hover:underline shrink-0 ml-2">
                  Visit <ExternalLink size={10} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 rounded-2xl bg-[#0E0F17] border border-red-500/15">
          <div className="flex-1">
            <div className="text-sm text-[#EEF0F6] mb-1">Encountered a scam broker?</div>
            <p className="text-xs text-[#6E7489]">Report it to protect other traders. All reports are reviewed and verified before publication.</p>
          </div>
          <Link to="/scam-alerts" className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-500/25 text-red-400 rounded-lg text-sm hover:bg-red-500/8 transition-colors shrink-0">
            Submit Report <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
