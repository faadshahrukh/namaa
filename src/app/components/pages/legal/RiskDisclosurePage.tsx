export function RiskDisclosurePage() {
  const risks = [
    { title: "Market Risk", body: "Foreign exchange rates can change rapidly and unpredictably due to economic events, central bank policy changes, geopolitical developments, and market sentiment shifts. You may lose some or all of your invested capital." },
    { title: "Leverage Risk", body: "Leveraged trading amplifies both gains and losses. A small adverse price move can result in losses that exceed your initial deposit. Only trade with leverage if you fully understand its mechanics and have sufficient risk management in place." },
    { title: "Liquidity Risk", body: "During periods of extreme market volatility (major economic announcements, geopolitical events, market open/close), liquidity can dry up significantly. This can lead to wide spreads, slippage, and the inability to execute orders at desired prices." },
    { title: "Counterparty Risk", body: "When trading through a broker, you are exposed to the risk that the broker may default on its obligations. This is why regulation, segregated funds, and our broker verification process matter. Always verify regulation status independently." },
    { title: "Technology Risk", body: "Technical failures — including internet outages, platform crashes, and server errors — can prevent you from managing open positions at critical moments. Always have contingency plans such as direct broker phone lines for order management." },
    { title: "Psychological Risk", body: "Emotional decision-making is one of the greatest risks in trading. Fear, greed, overconfidence, and revenge trading lead to poor decisions. Our Academy covers trading psychology in detail — this is not an optional subject." },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>Risk Disclosure</h1>
          <p className="text-[#6E7489] text-sm">Last updated: June 15, 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20 mb-8">
          <p className="text-sm text-red-400 leading-relaxed font-medium">
            Trading forex and CFDs involves significant risk of loss and is not suitable for all investors. You may lose more than your initial deposit. Only trade with capital you can afford to lose entirely.
          </p>
        </div>
        <p className="text-sm text-[#9AA0B4] leading-relaxed mb-8">
          Namaa Markets is an information and education platform. We do not provide financial advice, manage client funds, or execute trades on behalf of users. The following disclosure describes the key risks involved in forex and CFD trading that our users should understand before beginning to trade.
        </p>
        <div className="space-y-6">
          {risks.map((r) => (
            <div key={r.title} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <h3 className="text-[#EEF0F6] mb-2 text-sm" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>{r.title}</h3>
              <p className="text-sm text-[#9AA0B4] leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#6E7489] mt-8 leading-relaxed">
          This risk disclosure is not exhaustive. We strongly recommend reading the full risk disclosure provided by any broker you choose to trade with, and considering whether trading is appropriate for your personal financial situation. If in doubt, consult an independent financial adviser.
        </p>
      </div>
    </div>
  );
}
