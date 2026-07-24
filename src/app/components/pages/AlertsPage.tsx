import { useState } from "react";
import { Bell, Plus, X, TrendingUp, TrendingDown, Calendar, Newspaper, Check } from "lucide-react";
import { Link } from "react-router";

interface Alert {
  id: number;
  type: "price" | "event" | "news";
  label: string;
  condition: string;
  value: string;
  active: boolean;
  triggered?: boolean;
}

const initialAlerts: Alert[] = [
  { id: 1, type: "price", label: "EUR/USD", condition: "rises above", value: "1.0900", active: true },
  { id: 2, type: "price", label: "XAU/USD", condition: "falls below", value: "2300.00", active: true },
  { id: 3, type: "event", label: "US Non-Farm Payrolls", condition: "30 min before", value: "Jun 16 13:30 GMT", active: true, triggered: true },
  { id: 4, type: "news", label: "Federal Reserve", condition: "any news mentioning", value: "rate cut", active: false },
  { id: 5, type: "price", label: "GBP/USD", condition: "rises above", value: "1.2800", active: true },
];

const typeIcons = { price: TrendingUp, event: Calendar, news: Newspaper };
const typeColors = { price: "#C9A84C", event: "#3B82F6", news: "#22C55E" };

export function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [showNew, setShowNew] = useState(false);
  const [newType, setNewType] = useState<"price" | "event" | "news">("price");
  const [newLabel, setNewLabel] = useState("");
  const [newCondition, setNewCondition] = useState("rises above");
  const [newValue, setNewValue] = useState("");

  const toggleAlert = (id: number) => setAlerts((p) => p.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  const deleteAlert = (id: number) => setAlerts((p) => p.filter((a) => a.id !== id));

  const addAlert = () => {
    if (!newLabel || !newValue) return;
    setAlerts((p) => [...p, { id: Date.now(), type: newType, label: newLabel, condition: newCondition, value: newValue, active: true }]);
    setNewLabel(""); setNewValue(""); setShowNew(false);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Bell size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">My Alerts</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>Price & Event Alerts</h1>
              <p className="text-[#6E7489] text-sm">{alerts.filter((a) => a.active).length} active alerts</p>
            </div>
            <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors shrink-0">
              <Plus size={14} /> New Alert
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* New alert form */}
        {showNew && (
          <div className="mb-6 p-5 rounded-2xl bg-[#0E0F17] border border-[#C9A84C]/25">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#EEF0F6]">Create New Alert</span>
              <button onClick={() => setShowNew(false)} className="text-[#6E7489] hover:text-[#EEF0F6]"><X size={15} /></button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {(["price", "event", "news"] as const).map((t) => (
                <button key={t} onClick={() => setNewType(t)} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs capitalize transition-colors ${newType === t ? "border-[#C9A84C]/40 bg-[#C9A84C]/8 text-[#C9A84C]" : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E]"}`}>
                  {t === "price" && <TrendingUp size={12} />}
                  {t === "event" && <Calendar size={12} />}
                  {t === "news" && <Newspaper size={12} />}
                  {t} Alert
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder={newType === "price" ? "EUR/USD" : newType === "event" ? "Event name" : "Keyword"} className="px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
              <select value={newCondition} onChange={(e) => setNewCondition(e.target.value)} className="px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] focus:outline-none focus:border-[#C9A84C]/40">
                {newType === "price" ? (
                  <><option>rises above</option><option>falls below</option><option>crosses</option></>
                ) : newType === "event" ? (
                  <><option>30 min before</option><option>1 hour before</option><option>at release</option></>
                ) : (
                  <><option>any news mentioning</option><option>breaking news about</option></>
                )}
              </select>
              <input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder={newType === "price" ? "1.0900" : "Value"} className="px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-lg text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowNew(false)} className="px-4 py-2 text-sm text-[#9AA0B4] border border-[#1C1E2B] rounded-lg hover:border-[#2A2D3E] transition-colors">Cancel</button>
              <button onClick={addAlert} className="px-4 py-2 text-sm bg-[#C9A84C] text-[#09090E] rounded-lg hover:bg-[#D4B55A] transition-colors">Create Alert</button>
            </div>
          </div>
        )}

        {/* Alert list */}
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = typeIcons[alert.type];
            const color = typeColors[alert.type];
            return (
              <div key={alert.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${alert.triggered ? "border-[#C9A84C]/30 bg-[#C9A84C]/5" : alert.active ? "border-[#1C1E2B] bg-[#0E0F17]" : "border-[#1C1E2B] bg-[#0E0F17] opacity-50"}`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm text-[#EEF0F6]">{alert.label}</span>
                    {alert.triggered && <span className="text-xs px-1.5 py-0.5 rounded bg-[#C9A84C]/15 text-[#C9A84C] flex items-center gap-0.5"><Check size={9} /> Triggered</span>}
                  </div>
                  <div className="text-xs text-[#6E7489]">{alert.condition} {alert.value}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleAlert(alert.id)} className={`relative w-10 h-5 rounded-full transition-colors ${alert.active ? "bg-[#C9A84C]" : "bg-[#1C1E2B]"}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${alert.active ? "left-5" : "left-0.5"}`} />
                  </button>
                  <button onClick={() => deleteAlert(alert.id)} className="p-1.5 rounded-lg text-[#6E7489] hover:text-red-400 hover:bg-red-500/8 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {alerts.length === 0 && (
          <div className="text-center py-16">
            <Bell size={32} className="text-[#6E7489] mx-auto mb-3" />
            <p className="text-sm text-[#6E7489]">No alerts yet. Create your first alert above.</p>
          </div>
        )}

        <div className="mt-6 p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-xs text-[#6E7489]">
          Free accounts: up to 5 alerts. <Link to="/premium" className="text-[#C9A84C] hover:underline">Upgrade to Pro</Link> for unlimited alerts and push notifications.
        </div>
      </div>
    </div>
  );
}
