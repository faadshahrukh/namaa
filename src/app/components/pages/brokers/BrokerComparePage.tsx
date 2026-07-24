import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, XCircle, Star, ExternalLink, ArrowLeft } from "lucide-react";
import { brokers } from "../../../data/brokers";

const compareFields = [
  { label: "Regulation", key: "regulation" },
  { label: "Rating", key: "rating" },
  { label: "Min Spread", key: "spread" },
  { label: "Commission/Lot", key: "commissionPerLot" },
  { label: "Max Leverage", key: "leverage" },
  { label: "Min Deposit", key: "minDeposit" },
  { label: "Founded", key: "founded" },
  { label: "Type", key: "type" },
  { label: "Headquarters", key: "headquarters" },
  { label: "Withdrawal", key: "withdrawalTime" },
];

const boolFields = [
  { label: "Segregated Funds", key: "segregatedFunds" },
  { label: "Neg. Balance Protection", key: "negativeBalanceProtection" },
  { label: "Islamic Account", key: "islamicAccount" },
  { label: "Demo Account", key: "demoAccount" },
];

export function BrokerComparePage() {
  const [selected, setSelected] = useState([brokers[0], brokers[1], brokers[2]]);
  const [showPicker, setShowPicker] = useState<number | null>(null);

  const replaceBroker = (idx: number, broker: typeof brokers[0]) => {
    setSelected((prev) => prev.map((b, i) => (i === idx ? broker : b)));
    setShowPicker(null);
  };

  const available = brokers.filter((b) => !selected.find((s) => s.id === b.id));

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Link to="/brokers" className="flex items-center gap-1.5 text-xs text-[#6E7489] hover:text-[#EEF0F6] mb-4 transition-colors">
            <ArrowLeft size={13} /> Back to Brokers
          </Link>
          <h1 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>Broker Comparison</h1>
          <p className="text-[#6E7489] text-sm mt-1">Compare up to 3 brokers side-by-side across all key metrics.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              <th className="text-left w-44 pr-4 pb-6 text-xs text-[#6E7489] uppercase tracking-wider align-bottom">Metric</th>
              {selected.map((broker, idx) => (
                <th key={broker.id} className="pb-6 px-3">
                  <div className="relative p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
                    <div className="w-10 h-10 rounded-xl bg-[#141622] border border-[#1C1E2B] flex items-center justify-center mx-auto mb-2">
                      <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{broker.logo}</span>
                    </div>
                    <div className="text-sm text-[#EEF0F6] mb-1">{broker.name}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star size={11} className="text-[#C9A84C] fill-[#C9A84C]" />
                      <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{broker.rating}</span>
                    </div>
                    <button onClick={() => setShowPicker(showPicker === idx ? null : idx)} className="text-xs text-[#6E7489] hover:text-[#9AA0B4] transition-colors">
                      Change ↕
                    </button>
                    {showPicker === idx && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-[#0E0F17] border border-[#1C1E2B] rounded-xl z-20 text-left overflow-hidden shadow-xl">
                        {available.map((b) => (
                          <button key={b.id} onClick={() => replaceBroker(idx, b)}
                            className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[#141622] transition-colors text-xs text-[#9AA0B4] hover:text-[#EEF0F6]">
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{b.logo}</span> {b.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1E2B]">
            {compareFields.map(({ label, key }) => (
              <tr key={key} className="hover:bg-[#0E0F17]/30 transition-colors">
                <td className="py-3 pr-4 text-xs text-[#6E7489]">{label}</td>
                {selected.map((broker) => {
                  const val = broker[key as keyof typeof broker];
                  return (
                    <td key={broker.id} className="py-3 px-3 text-center">
                      {Array.isArray(val) ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                          {(val as string[]).slice(0, 3).map((r) => (
                            <span key={r} className="text-xs px-1.5 py-0.5 rounded bg-[#141622] text-[#6E7489]">{r}</span>
                          ))}
                        </div>
                      ) : key === "rating" ? (
                        <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{String(val)}</span>
                      ) : key === "spread" ? (
                        <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>{String(val)} pips</span>
                      ) : (
                        <span className="text-xs text-[#9AA0B4]">{String(val)}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr><td colSpan={4} className="pt-5 pb-2"><div className="text-xs text-[#6E7489] uppercase tracking-wider">Features</div></td></tr>
            {boolFields.map(({ label, key }) => (
              <tr key={key} className="hover:bg-[#0E0F17]/30 transition-colors">
                <td className="py-3 pr-4 text-xs text-[#6E7489]">{label}</td>
                {selected.map((broker) => (
                  <td key={broker.id} className="py-3 px-3 text-center">
                    {broker[key as keyof typeof broker]
                      ? <CheckCircle size={15} className="text-[#22C55E] mx-auto" />
                      : <XCircle size={15} className="text-[#6E7489] mx-auto" />}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="pt-6" />
              {selected.map((broker) => (
                <td key={broker.id} className="pt-6 px-3">
                  <Link to={`/brokers/${broker.slug}`} className="block w-full py-2.5 text-center text-xs text-[#9AA0B4] border border-[#1C1E2B] rounded-lg hover:border-[#2A2D3E] hover:text-[#EEF0F6] transition-colors mb-2">
                    Full Profile
                  </Link>
                  <a href={`https://${broker.website}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 w-full py-2.5 text-xs bg-[#C9A84C] text-[#09090E] rounded-lg hover:bg-[#D4B55A] transition-colors">
                    Open Account <ExternalLink size={10} />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
