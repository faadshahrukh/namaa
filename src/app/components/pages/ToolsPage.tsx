import { useState, useMemo, useId } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Calculator, BarChart2, TrendingUp, Layers, Target,
  DollarSign, Percent, RefreshCw, ChevronRight, Wrench, Activity
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const tools = [
  { id: "pip", icon: Calculator, label: "Pip Value Calculator", desc: "Calculate the value of one pip in your account currency", category: "calculator" },
  { id: "position", icon: Target, label: "Position Size Calculator", desc: "Determine optimal lot size based on risk percentage", category: "calculator" },
  { id: "margin", icon: Percent, label: "Margin Calculator", desc: "Calculate required margin for any trade", category: "calculator" },
  { id: "pnl", icon: DollarSign, label: "Profit/Loss Calculator", desc: "Estimate P&L before entering a trade", category: "calculator" },
  { id: "fib", icon: Layers, label: "Fibonacci Calculator", desc: "Auto-calculate Fib levels from swing high/low", category: "analysis" },
  { id: "heatmap", icon: Activity, label: "Currency Heatmap", desc: "Visual strength/weakness overview of all majors", category: "market" },
  { id: "correlation", icon: TrendingUp, label: "Correlation Matrix", desc: "Identify correlated and inversely correlated pairs", category: "analysis" },
  { id: "volatility", icon: BarChart2, label: "Volatility Tracker", desc: "Average daily range and ATR for all pairs", category: "market" },
];

const heatmapData = [
  { ccy: "USD", EUR: 45, GBP: 62, JPY: 78, AUD: 55, CAD: 58, CHF: 42, NZD: 50 },
  { ccy: "EUR", USD: 55, GBP: 48, JPY: 68, AUD: 52, CAD: 54, CHF: 61, NZD: 47 },
  { ccy: "GBP", USD: 38, EUR: 52, JPY: 71, AUD: 44, CAD: 49, CHF: 40, NZD: 46 },
  { ccy: "JPY", USD: 22, EUR: 32, GBP: 29, AUD: 35, CAD: 38, CHF: 45, NZD: 31 },
  { ccy: "AUD", USD: 45, EUR: 48, GBP: 56, JPY: 65, CAD: 52, CHF: 43, NZD: 58 },
  { ccy: "CAD", USD: 42, EUR: 46, GBP: 51, JPY: 62, AUD: 48, CHF: 39, NZD: 55 },
  { ccy: "CHF", USD: 58, EUR: 39, GBP: 60, JPY: 55, AUD: 57, CAD: 61, NZD: 52 },
];

// Deterministic baseline — no Math.random() at module level
const sparkBaseline = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  value: parseFloat((50 + Math.sin(i * 0.6) * 20 + Math.cos(i * 1.1) * 5).toFixed(2)),
}));

function getHeatColor(value: number) {
  if (value >= 65) return { bg: "#22C55E20", color: "#22C55E" };
  if (value >= 50) return { bg: "#C9A84C15", color: "#C9A84C" };
  if (value >= 35) return { bg: "#F9731615", color: "#F97316" };
  return { bg: "#EF444415", color: "#EF4444" };
}

export function ToolsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gradId = useId();
  const sparkData = useMemo(() => sparkBaseline, []);
  const [activeTool, setActiveTool] = useState("pip");
  const [activeCategory, setActiveCategory] = useState("all");

  // Pip calculator state
  const [pipPair, setPipPair] = useState("EUR/USD");
  const [pipLots, setPipLots] = useState("1");
  const [pipAccount, setPipAccount] = useState("USD");
  const pipValue = (parseFloat(pipLots) * 10).toFixed(2);

  // Position size calculator
  const [balance, setBalance] = useState("10000");
  const [riskPct, setRiskPct] = useState("1");
  const [stopPips, setStopPips] = useState("30");
  const positionSize = ((parseFloat(balance) * parseFloat(riskPct) / 100) / (parseFloat(stopPips) * 0.0001 * 100000)).toFixed(2);

  const categories = ["all", "calculator", "analysis", "market"];
  const filteredTools = tools.filter((t) => activeCategory === "all" || t.category === activeCategory);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Wrench size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Trading Tools</span>
          </div>
          <h1
            className="text-[#EEF0F6] mb-2"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Professional Trading Utilities
          </h1>
          <p className="text-[#6E7489] text-sm">
            Calculators, market analysis tools, and sentiment indicators for smarter decision-making.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tool list */}
          <div className="lg:col-span-1">
            <div className="flex gap-2 mb-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1.5 rounded text-xs capitalize transition-colors ${
                    activeCategory === cat
                      ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                      : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {filteredTools.map(({ id, icon: Icon, label, desc }) => (
                <button
                  key={id}
                  onClick={() => setActiveTool(id)}
                  className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                    activeTool === id
                      ? "border-[#C9A84C]/30 bg-[#C9A84C]/6"
                      : "border-[#1C1E2B] bg-[#0E0F17] hover:border-[#2A2D3E]"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      activeTool === id ? "bg-[#C9A84C]/15" : "bg-[#141622]"
                    }`}
                  >
                    <Icon size={14} className={activeTool === id ? "text-[#C9A84C]" : "text-[#6E7489]"} />
                  </div>
                  <div>
                    <div className={`text-xs mb-0.5 ${activeTool === id ? "text-[#C9A84C]" : "text-[#9AA0B4]"}`}>{label}</div>
                    <div className="text-xs text-[#6E7489] leading-tight">{desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tool workspace */}
          <div className="lg:col-span-2">
            {activeTool === "pip" && (
              <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-6">
                <h3 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Pip Value Calculator</h3>
                <p className="text-xs text-[#6E7489] mb-6">Calculate the monetary value of one pip for any currency pair.</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Currency Pair</label>
                    <select
                      value={pipPair}
                      onChange={(e) => setPipPair(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    >
                      {["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "USD/CHF"].map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Lot Size</label>
                    <input
                      type="number"
                      value={pipLots}
                      onChange={(e) => setPipLots(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Account Currency</label>
                    <select
                      value={pipAccount}
                      onChange={(e) => setPipAccount(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    >
                      {["USD", "EUR", "GBP", "JPY"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#141622] border border-[#1C1E2B] text-center">
                  <div className="text-xs text-[#6E7489] mb-1">Pip Value (1 pip)</div>
                  <div
                    className="text-3xl"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}
                  >
                    ${pipValue}
                  </div>
                  <div className="text-xs text-[#6E7489] mt-1">{pipPair} · {pipLots} lot · {pipAccount} account</div>
                </div>
              </div>
            )}

            {activeTool === "position" && (
              <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-6">
                <h3 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Position Size Calculator</h3>
                <p className="text-xs text-[#6E7489] mb-6">Determine the optimal position size based on your risk tolerance.</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Account Balance ($)</label>
                    <input
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Risk % per Trade</label>
                    <input
                      type="number"
                      value={riskPct}
                      onChange={(e) => setRiskPct(e.target.value)}
                      step="0.5"
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6E7489] mb-1.5">Stop Loss (pips)</label>
                    <input
                      type="number"
                      value={stopPips}
                      onChange={(e) => setStopPips(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#141622] border border-[#1C1E2B] text-center">
                    <div className="text-xs text-[#6E7489] mb-1">Position Size</div>
                    <div className="text-2xl" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>
                      {positionSize}
                    </div>
                    <div className="text-xs text-[#6E7489]">lots</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141622] border border-[#1C1E2B] text-center">
                    <div className="text-xs text-[#6E7489] mb-1">Risk Amount</div>
                    <div className="text-2xl" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#EF4444" }}>
                      ${(parseFloat(balance) * parseFloat(riskPct) / 100).toFixed(0)}
                    </div>
                    <div className="text-xs text-[#6E7489]">{riskPct}% of balance</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141622] border border-[#1C1E2B] text-center">
                    <div className="text-xs text-[#6E7489] mb-1">Units</div>
                    <div className="text-2xl" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}>
                      {Math.round(parseFloat(positionSize) * 100000).toLocaleString()}
                    </div>
                    <div className="text-xs text-[#6E7489]">base currency</div>
                  </div>
                </div>
              </div>
            )}

            {activeTool === "heatmap" && (
              <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-6">
                <h3 className="text-[#EEF0F6] mb-1" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Currency Strength Heatmap</h3>
                <p className="text-xs text-[#6E7489] mb-5">Relative strength of each currency pair. Green = strong, Red = weak.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left pb-2 text-[#6E7489] w-10">—</th>
                        {["EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"].map((h) => (
                          <th key={h} className="pb-2 text-[#6E7489] text-center">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {heatmapData.map((row) => (
                        <tr key={row.ccy}>
                          <td className="py-1 pr-2 text-[#9AA0B4]">{row.ccy}</td>
                          {["EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD"].map((col) => {
                            const val = row[col as keyof typeof row] as number | undefined;
                            if (val === undefined || col === row.ccy) {
                              return <td key={col} className="p-1 text-center"><div className="w-10 h-8 rounded bg-[#1C1E2B] mx-auto" /></td>;
                            }
                            const { bg, color } = getHeatColor(val);
                            return (
                              <td key={col} className="p-1 text-center">
                                <div
                                  className="w-10 h-8 rounded flex items-center justify-center mx-auto"
                                  style={{ backgroundColor: bg, color }}
                                >
                                  {val}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!["pip", "position", "heatmap"].includes(activeTool) && (
              <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#141622] flex items-center justify-center mx-auto mb-4">
                  <Wrench size={22} className="text-[#C9A84C]" />
                </div>
                <h3 className="text-[#EEF0F6] mb-2 text-sm">Coming Soon</h3>
                <p className="text-xs text-[#6E7489] max-w-xs mx-auto mb-5">
                  This tool is being developed and will be available in the next update. Sign up for alerts.
                </p>
                <button className="px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-xs rounded-md hover:bg-[#C9A84C]/20 transition-colors">
                  Notify Me
                </button>
              </div>
            )}

            {/* Volatility chart */}
            <div className="mt-6 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-[#EEF0F6] mb-0.5">EUR/USD Volatility — 14 Day</div>
                  <div className="text-xs text-[#6E7489]">Average Daily Range (pips)</div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-[#22C55E]/10 text-[#22C55E]">Live</span>
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={sparkData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#1D2F4A" : "#D4E1F4"} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: isDark ? "#6A82A8" : "#5C7094" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: isDark ? "#6A82A8" : "#5C7094" }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: isDark ? "#0B1322" : "#FFFFFF", border: `1px solid ${isDark ? "#1D2F4A" : "#C2D3EC"}`, borderRadius: "8px", fontSize: "11px" }}
                    labelStyle={{ color: isDark ? "#6A82A8" : "#5C7094" }}
                    itemStyle={{ color: isDark ? "#C9A84C" : "#B8922A" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#C9A84C" strokeWidth={1.5} fill={`url(#${gradId})`} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
