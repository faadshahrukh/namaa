import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface TickerItem {
  pair: string;
  price: string;
  change: number;
  changePercent: number;
}

const initialData: TickerItem[] = [
  { pair: "EUR/USD", price: "1.08542", change: 0.00123, changePercent: 0.11 },
  { pair: "GBP/USD", price: "1.26871", change: -0.00234, changePercent: -0.18 },
  { pair: "USD/JPY", price: "149.823", change: 0.312, changePercent: 0.21 },
  { pair: "AUD/USD", price: "0.65234", change: -0.00098, changePercent: -0.15 },
  { pair: "USD/CHF", price: "0.89123", change: 0.00067, changePercent: 0.08 },
  { pair: "USD/CAD", price: "1.35678", change: 0.00145, changePercent: 0.11 },
  { pair: "NZD/USD", price: "0.60123", change: -0.00056, changePercent: -0.09 },
  { pair: "EUR/GBP", price: "0.85567", change: 0.00089, changePercent: 0.10 },
  { pair: "EUR/JPY", price: "162.345", change: 0.432, changePercent: 0.27 },
  { pair: "GBP/JPY", price: "190.123", change: -0.234, changePercent: -0.12 },
  { pair: "XAU/USD", price: "2,341.50", change: 8.20, changePercent: 0.35 },
  { pair: "BTC/USD", price: "67,234.00", change: -234.00, changePercent: -0.35 },
];

function TickerItemView({ item, isDark }: { item: TickerItem; isDark: boolean }) {
  const isUp = item.change >= 0;
  return (
    <div className="flex items-center gap-3 px-5 shrink-0">
      <span className="text-xs uppercase tracking-wider" style={{ color: isDark ? "#6A82A8" : "#5C7094" }}>
        {item.pair}
      </span>
      <span
        className="text-xs"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: isDark ? "#E3EBF8" : "#0D1E38" }}
      >
        {item.price}
      </span>
      <span
        className="flex items-center gap-0.5 text-xs"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: isUp ? (isDark ? "#22C55E" : "#16A34A") : (isDark ? "#EF4444" : "#DC2626"),
        }}
      >
        {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {isUp ? "+" : ""}
        {item.changePercent.toFixed(2)}%
      </span>
      <span style={{ color: isDark ? "#1D2F4A" : "#C2D3EC" }}>|</span>
    </div>
  );
}

export function MarketTicker() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [data, setData] = useState<TickerItem[]>(initialData);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.5) * 0.0004;
          const newChange = item.change + delta;
          const newPercent = item.changePercent + delta * 100;
          return { ...item, change: newChange, changePercent: newPercent };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...data, ...data];

  return (
    <div
      className="overflow-hidden border-b"
      style={{
        backgroundColor: isDark ? "#0B1322" : "#FFFFFF",
        borderColor: isDark ? "#1D2F4A" : "#C2D3EC",
      }}
    >
      <div className="flex items-center">
        <div
          className="shrink-0 px-4 py-2.5 text-xs uppercase tracking-widest z-10"
          style={{ backgroundColor: isDark ? "#C9A84C" : "#B8922A", color: isDark ? "#070C17" : "#FFFFFF" }}
        >
          Live
        </div>
        <div className="overflow-hidden flex-1">
          <div
            ref={trackRef}
            className="flex"
            style={{
              animation: "ticker-scroll 60s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((item, i) => (
              <TickerItemView key={i} item={item} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
