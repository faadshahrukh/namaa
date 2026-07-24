import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar, Bell, ChevronLeft, ChevronRight,
  Globe, Search, Download, ChevronDown, ChevronUp,
  BarChart2, Newspaper, Info, TrendingUp, TrendingDown, X, Maximize2
} from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, Cell
} from "recharts";

interface CalendarEvent {
  id: number;
  date: string;
  dayKey: string;
  time: string;
  currency: string;
  flag: string;
  event: string;
  impact: "high" | "medium" | "low";
  forecast: string;
  previous: string;
  actual: string | null;
  specs: {
    source: string;
    measures: string;
    usualEffect: string;
    frequency: string;
    nextRelease: string;
    analystNotes: string;
    derivedVia: string;
    alsoCalled: string;
    acronym: string;
  };
  history: { date: string; actual: string; forecast: string; previous: string }[];
  relatedStories: { title: string; time: string; slug: string }[];
}

const events: CalendarEvent[] = [
  {
    id: 1, date: "Mon, Jul 7", dayKey: "mon", time: "08:30", currency: "GBP", flag: "🇬🇧",
    event: "CPI (YoY)", impact: "high", forecast: "2.6%", previous: "2.3%", actual: null,
    specs: {
      source: "UK Office for National Statistics (ONS)",
      measures: "Change in the price of goods and services purchased by consumers, year-over-year",
      usualEffect: "Actual > Forecast = Good for GBP",
      frequency: "Monthly",
      nextRelease: "Aug 13, 2026 · 06:00 GMT",
      analystNotes: "The Bank of England targets 2% CPI. A reading above 3% could revive rate hike expectations and push GBP higher. Watch core CPI for underlying trend.",
      derivedVia: "Weighted average of prices for a representative basket of consumer goods and services",
      alsoCalled: "Consumer Price Index, Headline Inflation",
      acronym: "CPI",
    },
    history: [
      { date: "Jun 2026", actual: "2.3%", forecast: "2.2%", previous: "2.0%" },
      { date: "May 2026", actual: "2.0%", forecast: "2.1%", previous: "2.2%" },
      { date: "Apr 2026", actual: "2.2%", forecast: "2.4%", previous: "2.6%" },
      { date: "Mar 2026", actual: "2.6%", forecast: "2.7%", previous: "2.8%" },
      { date: "Feb 2026", actual: "2.8%", forecast: "3.0%", previous: "3.0%" },
    ],
    relatedStories: [
      { title: "UK Inflation Cools Ahead of BoE Decision", time: "2h ago", slug: "fed-rate-cut-signals-q3-2025" },
      { title: "GBP/USD Technical Outlook: Bulls Eye 1.2800", time: "4h ago", slug: "gbpusd-weekly-technical-outlook" },
    ],
  },
  {
    id: 2, date: "Mon, Jul 7", dayKey: "mon", time: "09:00", currency: "EUR", flag: "🇪🇺",
    event: "ZEW Economic Sentiment", impact: "medium", forecast: "47.5", previous: "45.8", actual: null,
    specs: {
      source: "Zentrum für Europäische Wirtschaftsforschung (ZEW)",
      measures: "Economic sentiment and expectations of ~350 German institutional investors and analysts",
      usualEffect: "Actual > Forecast = Good for EUR",
      frequency: "Monthly (second Tuesday)",
      nextRelease: "Aug 11, 2026 · 09:00 GMT",
      analystNotes: "The ZEW survey is a leading indicator of economic health. Readings above 0 indicate optimism. Germany's manufacturing sensitivity to China makes this particularly volatile.",
      derivedVia: "Difference between the percentage of analysts that are optimistic versus pessimistic",
      alsoCalled: "ZEW Survey, German ZEW",
      acronym: "ZEW",
    },
    history: [
      { date: "Jun 2026", actual: "45.8", forecast: "44.0", previous: "41.2" },
      { date: "May 2026", actual: "41.2", forecast: "42.5", previous: "38.9" },
      { date: "Apr 2026", actual: "38.9", forecast: "35.0", previous: "29.7" },
      { date: "Mar 2026", actual: "29.7", forecast: "31.0", previous: "26.3" },
      { date: "Feb 2026", actual: "26.3", forecast: "24.0", previous: "18.5" },
    ],
    relatedStories: [
      { title: "EUR/USD Retreats from 1.0900 as ECB Officials Push Back", time: "1h ago", slug: "eurusd-ecb-hawkish-retreat" },
    ],
  },
  {
    id: 3, date: "Mon, Jul 7", dayKey: "mon", time: "13:30", currency: "USD", flag: "🇺🇸",
    event: "Core Retail Sales (MoM)", impact: "high", forecast: "0.4%", previous: "0.3%", actual: "0.5%",
    specs: {
      source: "US Census Bureau",
      measures: "Change in the total value of sales at the retail level, excluding automobiles — the largest component",
      usualEffect: "Actual > Forecast = Good for USD",
      frequency: "Monthly (mid-month)",
      nextRelease: "Aug 15, 2026 · 12:30 GMT",
      analystNotes: "Excludes auto sales to remove volatility. Closely watched by the Fed as a proxy for consumer spending, which drives ~70% of US GDP. A beat typically strengthens the USD and pressures rate-cut expectations.",
      derivedVia: "Survey of approximately 5,500 retail and food service firms",
      alsoCalled: "Retail Sales ex-Autos, Core Retail Sales",
      acronym: "CRS",
    },
    history: [
      { date: "Jun 2026", actual: "0.3%", forecast: "0.2%", previous: "-0.1%" },
      { date: "May 2026", actual: "-0.1%", forecast: "0.3%", previous: "0.4%" },
      { date: "Apr 2026", actual: "0.4%", forecast: "0.5%", previous: "0.6%" },
      { date: "Mar 2026", actual: "0.6%", forecast: "0.4%", previous: "0.3%" },
      { date: "Feb 2026", actual: "0.3%", forecast: "0.2%", previous: "0.2%" },
    ],
    relatedStories: [
      { title: "Federal Reserve Signals Possible Rate Cut in Q3", time: "32m ago", slug: "fed-rate-cut-signals-q3-2025" },
    ],
  },
  {
    id: 4, date: "Mon, Jul 7", dayKey: "mon", time: "14:00", currency: "USD", flag: "🇺🇸",
    event: "Fed Chair Powell Speech", impact: "high", forecast: "—", previous: "—", actual: null,
    specs: {
      source: "US Federal Reserve",
      measures: "Remarks by Federal Reserve Chair on monetary policy, economic outlook, or financial stability",
      usualEffect: "Hawkish tone = Good for USD · Dovish tone = Bad for USD",
      frequency: "Scheduled appearances (irregular)",
      nextRelease: "TBC — check Fed calendar",
      analystNotes: "One of the highest-impact market events. Every word is scrutinized for forward guidance on rates. Particular attention to language around the timing of rate cuts, labor market assessment, and inflation confidence.",
      derivedVia: "Live speech or prepared remarks delivered at economic forums, congressional hearings, or FOMC press conferences",
      alsoCalled: "Powell Speech, FOMC Presser",
      acronym: "N/A",
    },
    history: [
      { date: "Jun 12, 2026", actual: "Neutral", forecast: "Neutral", previous: "Dovish" },
      { date: "May 28, 2026", actual: "Dovish", forecast: "Neutral", previous: "Hawkish" },
      { date: "Apr 30, 2026", actual: "Hawkish", forecast: "Hawkish", previous: "Neutral" },
      { date: "Mar 20, 2026", actual: "Neutral", forecast: "Neutral", previous: "Dovish" },
    ],
    relatedStories: [
      { title: "Federal Reserve Signals Possible Rate Cut in Q3", time: "32m ago", slug: "fed-rate-cut-signals-q3-2025" },
    ],
  },
  {
    id: 5, date: "Mon, Jul 7", dayKey: "mon", time: "15:30", currency: "CAD", flag: "🇨🇦",
    event: "Manufacturing Sales (MoM)", impact: "low", forecast: "0.2%", previous: "-0.1%", actual: null,
    specs: {
      source: "Statistics Canada",
      measures: "Change in the total value of sales made by manufacturers on a monthly basis",
      usualEffect: "Actual > Forecast = Good for CAD",
      frequency: "Monthly",
      nextRelease: "Aug 19, 2026 · 12:30 GMT",
      analystNotes: "A minor indicator for CAD. More market impact is derived from Oil prices and US-Canada trade flow data. Use this as a supplementary data point rather than a primary driver.",
      derivedVia: "Monthly Survey of Manufacturing (MSM) covering approximately 10,000 manufacturers",
      alsoCalled: "Canadian Manufacturing Sales",
      acronym: "MFG Sales",
    },
    history: [
      { date: "Jun 2026", actual: "-0.1%", forecast: "0.1%", previous: "0.3%" },
      { date: "May 2026", actual: "0.3%", forecast: "0.4%", previous: "0.5%" },
      { date: "Apr 2026", actual: "0.5%", forecast: "0.3%", previous: "-0.2%" },
      { date: "Mar 2026", actual: "-0.2%", forecast: "0.0%", previous: "0.1%" },
      { date: "Feb 2026", actual: "0.1%", forecast: "0.2%", previous: "0.3%" },
    ],
    relatedStories: [],
  },
  {
    id: 6, date: "Tue, Jul 8", dayKey: "tue", time: "01:30", currency: "AUD", flag: "🇦🇺",
    event: "RBA Meeting Minutes", impact: "medium", forecast: "—", previous: "—", actual: null,
    specs: {
      source: "Reserve Bank of Australia (RBA)",
      measures: "Detailed account of the RBA board's most recent meeting, including economic assessment and rate deliberations",
      usualEffect: "Hawkish minutes = Good for AUD · Dovish minutes = Bad for AUD",
      frequency: "Monthly (2–3 weeks after meeting)",
      nextRelease: "Sep 2, 2026 · 01:30 GMT",
      analystNotes: "Markets parse the minutes for nuance not communicated in the post-meeting statement. Look for language changes around inflation tolerance, employment targets, and the pace of potential rate adjustments.",
      derivedVia: "Verbatim record of board discussions and voting positions",
      alsoCalled: "RBA Minutes, Reserve Bank Minutes",
      acronym: "RBA",
    },
    history: [
      { date: "Jun 2026", actual: "Neutral", forecast: "Neutral", previous: "Hawkish" },
      { date: "May 2026", actual: "Hawkish", forecast: "Neutral", previous: "Hawkish" },
      { date: "Apr 2026", actual: "Hawkish", forecast: "Hawkish", previous: "Neutral" },
      { date: "Mar 2026", actual: "Neutral", forecast: "Neutral", previous: "Dovish" },
    ],
    relatedStories: [
      { title: "AUD/USD Faces Resistance at 0.6600 After Mixed Employment Data", time: "7h ago", slug: "audusd-mixed-employment-data" },
    ],
  },
  {
    id: 7, date: "Tue, Jul 8", dayKey: "tue", time: "09:00", currency: "EUR", flag: "🇪🇺",
    event: "Trade Balance", impact: "low", forecast: "20.4B", previous: "18.8B", actual: null,
    specs: {
      source: "Eurostat",
      measures: "Difference in value between imported and exported goods during the reported month for the Eurozone",
      usualEffect: "Actual > Forecast = Good for EUR",
      frequency: "Monthly",
      nextRelease: "Aug 12, 2026 · 09:00 GMT",
      analystNotes: "A surplus indicates more exports than imports, a net positive for the euro. Germany dominates the Eurozone trade balance due to its manufacturing export base.",
      derivedVia: "Customs and administrative data on goods crossing Eurozone borders",
      alsoCalled: "Current Account Balance, Merchandise Trade Balance",
      acronym: "TB",
    },
    history: [
      { date: "Jun 2026", actual: "18.8B", forecast: "19.0B", previous: "17.2B" },
      { date: "May 2026", actual: "17.2B", forecast: "16.5B", previous: "15.9B" },
      { date: "Apr 2026", actual: "15.9B", forecast: "16.0B", previous: "14.3B" },
      { date: "Mar 2026", actual: "14.3B", forecast: "13.5B", previous: "12.8B" },
    ],
    relatedStories: [
      { title: "EUR/USD Retreats from 1.0900 as ECB Officials Push Back", time: "1h ago", slug: "eurusd-ecb-hawkish-retreat" },
    ],
  },
  {
    id: 8, date: "Wed, Jul 9", dayKey: "wed", time: "07:00", currency: "GBP", flag: "🇬🇧",
    event: "Average Earnings Index (3m/y)", impact: "high", forecast: "5.3%", previous: "5.6%", actual: null,
    specs: {
      source: "UK Office for National Statistics (ONS)",
      measures: "Change in the price businesses and the government pay for labor, including and excluding bonuses",
      usualEffect: "Actual > Forecast = Good for GBP",
      frequency: "Monthly",
      nextRelease: "Aug 12, 2026 · 06:00 GMT",
      analystNotes: "Critical for the BoE rate path. Wage growth above 5% sustains service sector inflation pressure. The ex-bonus figure is more closely watched as a clean measure of structural wage growth.",
      derivedVia: "Labour Force Survey and employer payroll data",
      alsoCalled: "Wage Growth, Earnings Growth, Average Weekly Earnings",
      acronym: "AEI",
    },
    history: [
      { date: "Jun 2026", actual: "5.6%", forecast: "5.8%", previous: "5.9%" },
      { date: "May 2026", actual: "5.9%", forecast: "6.0%", previous: "6.2%" },
      { date: "Apr 2026", actual: "6.2%", forecast: "6.1%", previous: "6.0%" },
      { date: "Mar 2026", actual: "6.0%", forecast: "5.8%", previous: "5.7%" },
      { date: "Feb 2026", actual: "5.7%", forecast: "5.6%", previous: "5.5%" },
    ],
    relatedStories: [
      { title: "UK Inflation Cools Ahead of BoE Decision", time: "2h ago", slug: "gbpusd-weekly-technical-outlook" },
    ],
  },
  {
    id: 9, date: "Wed, Jul 9", dayKey: "wed", time: "12:30", currency: "USD", flag: "🇺🇸",
    event: "PPI (MoM)", impact: "high", forecast: "0.2%", previous: "0.5%", actual: null,
    specs: {
      source: "US Bureau of Labor Statistics (BLS)",
      measures: "Change in the price of finished goods and services sold by producers — a leading indicator for consumer inflation",
      usualEffect: "Actual > Forecast = Good for USD (short term), but high readings can hurt if they signal persistent inflation",
      frequency: "Monthly",
      nextRelease: "Aug 12, 2026 · 12:30 GMT",
      analystNotes: "PPI measures factory-gate prices before they reach consumers, making it a leading indicator for CPI. A declining PPI trend supports the Fed's disinflation narrative and is currently dollar-negative.",
      derivedVia: "Surveys of domestic producers across 10,000 establishments covering ~72% of service-sector output",
      alsoCalled: "Producer Price Index, Wholesale Prices",
      acronym: "PPI",
    },
    history: [
      { date: "Jun 2026", actual: "0.5%", forecast: "0.3%", previous: "0.2%" },
      { date: "May 2026", actual: "0.2%", forecast: "0.2%", previous: "-0.1%" },
      { date: "Apr 2026", actual: "-0.1%", forecast: "0.1%", previous: "0.3%" },
      { date: "Mar 2026", actual: "0.3%", forecast: "0.4%", previous: "0.6%" },
      { date: "Feb 2026", actual: "0.6%", forecast: "0.5%", previous: "0.4%" },
    ],
    relatedStories: [
      { title: "Federal Reserve Signals Possible Rate Cut in Q3", time: "32m ago", slug: "fed-rate-cut-signals-q3-2025" },
      { title: "Gold Surges Past $2,350 — Safe-Haven Demand Rises", time: "2h ago", slug: "gold-surges-2350-safe-haven" },
    ],
  },
  {
    id: 10, date: "Thu, Jul 10", dayKey: "thu", time: "12:30", currency: "USD", flag: "🇺🇸",
    event: "Jobless Claims", impact: "medium", forecast: "218K", previous: "224K", actual: null,
    specs: {
      source: "US Department of Labor",
      measures: "Number of individuals filing for unemployment insurance for the first time during the past week",
      usualEffect: "Actual < Forecast = Good for USD (fewer claims = stronger labor market)",
      frequency: "Weekly (every Thursday)",
      nextRelease: "Jul 17, 2026 · 12:30 GMT",
      analystNotes: "One of the most frequent high-quality labor market signals. A sustained rise above 250K would signal labor market deterioration and could accelerate Fed rate cuts. Sub-220K reads confirm labor market resilience.",
      derivedVia: "State unemployment insurance claims data aggregated by the Department of Labor",
      alsoCalled: "Initial Jobless Claims, Weekly Unemployment Claims, Unemployment Insurance Claims",
      acronym: "IJC",
    },
    history: [
      { date: "Jul 3, 2026", actual: "224K", forecast: "220K", previous: "219K" },
      { date: "Jun 26, 2026", actual: "219K", forecast: "221K", previous: "216K" },
      { date: "Jun 19, 2026", actual: "216K", forecast: "218K", previous: "222K" },
      { date: "Jun 12, 2026", actual: "222K", forecast: "225K", previous: "230K" },
      { date: "Jun 5, 2026", actual: "230K", forecast: "228K", previous: "225K" },
    ],
    relatedStories: [
      { title: "Federal Reserve Signals Possible Rate Cut in Q3", time: "32m ago", slug: "fed-rate-cut-signals-q3-2025" },
    ],
  },
  {
    id: 11, date: "Fri, Jul 11", dayKey: "fri", time: "12:30", currency: "USD", flag: "🇺🇸",
    event: "CPI (YoY)", impact: "high", forecast: "3.1%", previous: "3.3%", actual: null,
    specs: {
      source: "US Bureau of Labor Statistics (BLS)",
      measures: "Change in the price of goods and services purchased by consumers, year-over-year",
      usualEffect: "Actual > Forecast = Bad for USD (delays rate cuts) · Actual < Forecast = Good for USD risk assets",
      frequency: "Monthly",
      nextRelease: "Aug 12, 2026 · 12:30 GMT",
      analystNotes: "The single most market-moving data release of the month. With the Fed watching for sustained disinflation toward 2%, each CPI print significantly shapes rate cut expectations. Core CPI (ex-food & energy) is the primary Fed focus.",
      derivedVia: "Monthly price survey of approximately 94,000 goods and services from 23,000 retail outlets and service providers",
      alsoCalled: "Consumer Price Index, Headline CPI, Inflation Rate",
      acronym: "CPI",
    },
    history: [
      { date: "Jun 2026", actual: "3.3%", forecast: "3.4%", previous: "3.5%" },
      { date: "May 2026", actual: "3.5%", forecast: "3.4%", previous: "3.4%" },
      { date: "Apr 2026", actual: "3.4%", forecast: "3.4%", previous: "3.5%" },
      { date: "Mar 2026", actual: "3.5%", forecast: "3.4%", previous: "3.2%" },
      { date: "Feb 2026", actual: "3.2%", forecast: "3.1%", previous: "3.1%" },
    ],
    relatedStories: [
      { title: "Federal Reserve Signals Possible Rate Cut in Q3", time: "32m ago", slug: "fed-rate-cut-signals-q3-2025" },
      { title: "Bitcoin Consolidates at $67,000 Ahead of Critical US CPI Release", time: "3h ago", slug: "bitcoin-consolidates-67k-cpi" },
      { title: "Gold Surges Past $2,350 — Safe-Haven Demand Rises", time: "2h ago", slug: "gold-surges-2350-safe-haven" },
    ],
  },
];

const impactConfig = {
  high: { color: "#EF4444", label: "High" },
  medium: { color: "#F59E0B", label: "Med" },
  low: { color: "#22C55E", label: "Low" },
};

const currencies = ["All", "USD", "EUR", "GBP", "AUD", "CAD", "CHF", "NZD"];
const impacts = ["All", "High", "Medium", "Low"];
const sessions = ["All", "Asian", "London", "New York"];

const weekDays = [
  { key: "mon", label: "Mon", date: "Jul 7" },
  { key: "tue", label: "Tue", date: "Jul 8" },
  { key: "wed", label: "Wed", date: "Jul 9" },
  { key: "thu", label: "Thu", date: "Jul 10" },
  { key: "fri", label: "Fri", date: "Jul 11" },
];

function SpecsPanel({ ev }: { ev: CalendarEvent }) {
  const s = ev.specs;
  const rows = [
    { label: "Source", value: s.source },
    { label: "Measures", value: s.measures },
    { label: "Usual Effect", value: s.usualEffect },
    { label: "Frequency", value: s.frequency },
    { label: "Next Release", value: s.nextRelease },
    { label: "Analyst Notes", value: s.analystNotes },
    { label: "Derived Via", value: s.derivedVia },
    { label: "Also Called", value: s.alsoCalled },
    { label: "Acronym", value: s.acronym },
  ];
  return (
    <div>
      <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <Info size={11} /> Specs Panel
      </div>
      <div className="space-y-2.5">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <div className="text-[10px] text-[#6E7489] uppercase tracking-wider mb-0.5">{label}</div>
            <div className="text-xs text-[#9AA0B4] leading-relaxed">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryPanel({ ev }: { ev: CalendarEvent }) {
  const chartData = [...ev.history].reverse().map((h) => ({
    date: h.date.replace("2026", "").trim().replace(",", ""),
    actual: parseFloat(h.actual) || 0,
    forecast: parseFloat(h.forecast) || 0,
  }));

  return (
    <div>
      <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-3 flex items-center gap-1.5">
        <BarChart2 size={11} /> History Panel
      </div>

      {/* Mini chart */}
      {chartData.length > 0 && !isNaN(chartData[0].actual) && (
        <div className="mb-4 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#6A82A8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "#6A82A8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0B1322", border: "1px solid #1D2F4A", borderRadius: 6, fontSize: 11 }}
                itemStyle={{ color: "#8AA4C8" }}
                labelStyle={{ color: "#C9A84C", fontSize: 10 }}
              />
              <Bar dataKey="actual" fill="#C9A84C" opacity={0.8} radius={[2, 2, 0, 0]} />
              <Bar dataKey="forecast" fill="#1C1E2B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* History table */}
      <table className="w-full text-xs mb-4">
        <thead>
          <tr className="border-b border-[#1C1E2B]">
            {["Date", "Actual", "Forecast", "Previous"].map((h) => (
              <th key={h} className="text-left py-1.5 text-[#6E7489] text-[10px] uppercase tracking-wider font-normal pr-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ev.history.map((row, i) => {
            const beat = parseFloat(row.actual) > parseFloat(row.forecast);
            return (
              <tr key={i} className="border-b border-[#1C1E2B]/50">
                <td className="py-1.5 text-[#6E7489] pr-3">{row.date}</td>
                <td className="py-1.5 pr-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: beat ? "#22C55E" : "#EF4444" }}>{row.actual}</td>
                <td className="py-1.5 pr-3" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9AA0B4" }}>{row.forecast}</td>
                <td className="py-1.5" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6E7489" }}>{row.previous}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Related Stories */}
      {ev.relatedStories.length > 0 && (
        <div>
          <div className="text-[10px] text-[#6E7489] uppercase tracking-wider mb-2 flex items-center gap-1">
            <Newspaper size={9} /> Related Stories
          </div>
          <div className="space-y-2">
            {ev.relatedStories.map((story, i) => (
              <Link
                key={i}
                to={`/news/${story.slug}`}
                className="block p-2.5 rounded-lg border border-[#1C1E2B] hover:border-[#C9A84C]/30 hover:bg-[#141622] transition-colors"
              >
                <div className="text-xs text-[#9AA0B4] leading-snug mb-1 line-clamp-2">{story.title}</div>
                <div className="text-[10px] text-[#6E7489]">{story.time}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChartModal({ ev, onClose }: { ev: CalendarEvent; onClose: () => void }) {
  const chartData = [...ev.history].reverse().map((h) => ({
    date: h.date.replace("2026", "").replace("2025", "").trim().replace(/,$/, ""),
    actual: parseFloat(h.actual) || null,
    forecast: parseFloat(h.forecast) || null,
    rawActual: h.actual,
    rawForecast: h.forecast,
  }));

  const hasNumeric = chartData.some((d) => d.actual !== null && !isNaN(d.actual as number));
  const impact = impactConfig[ev.impact];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(5,6,10,0.88)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-[#1C1E2B] shadow-2xl overflow-hidden"
        style={{ backgroundColor: "#0E0F17", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#1C1E2B] bg-[#141622]">
          <span className="text-lg">{ev.flag}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>
                {ev.currency}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1C1E2B]" />
              <span className="text-[#EEF0F6] text-sm font-medium">{ev.event}</span>
              <span className="ml-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider"
                style={{ backgroundColor: impact.color + "20", color: impact.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: impact.color }} />
                {impact.label} Impact
              </span>
            </div>
            <div className="text-xs text-[#6E7489] mt-0.5">
              {ev.date} · {ev.time} GMT · Source: {ev.specs.source.split(" (")[0]}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            {ev.actual && (
              <div className="text-right">
                <div className="text-[10px] text-[#6E7489] uppercase tracking-wider">Actual</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E", fontSize: 14, fontWeight: 600 }}>{ev.actual}</div>
              </div>
            )}
            <div className="text-right">
              <div className="text-[10px] text-[#6E7489] uppercase tracking-wider">Forecast</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9AA0B4", fontSize: 14 }}>{ev.forecast}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#6E7489] uppercase tracking-wider">Previous</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6E7489", fontSize: 14 }}>{ev.previous}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-[#1C1E2B] text-[#6E7489] hover:text-[#EEF0F6] hover:bg-[#1C1E2B] transition-colors ml-2"
          >
            <X size={14} />
          </button>
        </div>

        {/* Chart area */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[#6E7489]">
              {chartData.length > 0 ? `${chartData[0].date} – ${chartData[chartData.length - 1].date}` : "Historical Data"}
              <span className="ml-2 text-[#C9A84C]">· {chartData.length} releases</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[#6E7489]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#C9A84C" }} /> Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#1C3A5E" }} /> Forecast</span>
            </div>
          </div>

          {hasNumeric ? (
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} barGap={2}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#6A82A8", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={{ stroke: "#1D2F4A" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#6A82A8", fontFamily: "'JetBrains Mono', monospace" }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0B1322", border: "1px solid #1D2F4A", borderRadius: 8, fontSize: 11 }}
                    itemStyle={{ color: "#8AA4C8" }}
                    labelStyle={{ color: "#C9A84C", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
                  />
                  <ReferenceLine y={0} stroke="#1D2F4A" strokeWidth={1} />
                  <Bar dataKey="actual" name="Actual" radius={[3, 3, 0, 0]} maxBarSize={36}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={(entry.actual ?? 0) >= 0 ? "#C9A84C" : "#EF4444"} opacity={0.85} />
                    ))}
                  </Bar>
                  <Bar dataKey="forecast" name="Forecast" fill="#1C3A5E" radius={[3, 3, 0, 0]} maxBarSize={36} opacity={0.7} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            /* Non-numeric (speeches, minutes) — sentiment timeline */
            <div style={{ height: 280 }} className="flex flex-col justify-center items-center gap-4">
              <div className="text-xs text-[#6E7489] uppercase tracking-wider mb-2">Sentiment History</div>
              <div className="w-full flex items-end justify-around gap-2 px-8">
                {chartData.map((d, i) => {
                  const sentimentMap: Record<string, { h: number; color: string }> = {
                    Hawkish: { h: 80, color: "#22C55E" },
                    Neutral: { h: 48, color: "#C9A84C" },
                    Dovish: { h: 24, color: "#EF4444" },
                  };
                  const s = sentimentMap[d.rawActual ?? ""] ?? { h: 48, color: "#6E7489" };
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                      <div className="text-[10px]" style={{ color: s.color }}>{d.rawActual}</div>
                      <div className="w-full rounded-t-sm" style={{ height: s.h, backgroundColor: s.color, opacity: 0.75 }} />
                      <div className="text-[9px] text-[#6E7489] text-center leading-tight">{d.date}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* History table */}
        <div className="px-6 pb-5 overflow-y-auto" style={{ maxHeight: 220 }}>
          <table className="w-full text-xs border-t border-[#1C1E2B]">
            <thead className="sticky top-0 bg-[#0E0F17]">
              <tr>
                {["Release Date", "Actual", "Forecast", "Previous"].map((h) => (
                  <th key={h} className="text-left py-2 text-[10px] text-[#6E7489] uppercase tracking-wider font-normal pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ev.history.map((row, i) => {
                const beat = parseFloat(row.actual) > parseFloat(row.forecast);
                return (
                  <tr key={i} className="border-b border-[#1C1E2B]/40 hover:bg-[#141622]/50 transition-colors">
                    <td className="py-2 text-[#6E7489] pr-4">{row.date}</td>
                    <td className="py-2 pr-4 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: beat ? "#22C55E" : "#EF4444" }}>{row.actual}</td>
                    <td className="py-2 pr-4" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9AA0B4" }}>{row.forecast}</td>
                    <td className="py-2" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6E7489" }}>{row.previous}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal footer */}
        <div className="px-6 py-3 border-t border-[#1C1E2B] bg-[#141622]/50 flex items-center gap-3 flex-wrap">
          <span className="text-[10px] text-[#6E7489]">{ev.specs.measures}</span>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/news"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1C1E2B] text-[#9AA0B4] text-xs hover:text-[#EEF0F6] transition-colors"
            >
              <Newspaper size={11} /> Related News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarPage() {
  const [filterCurrency, setFilterCurrency] = useState("All");
  const [filterImpact, setFilterImpact] = useState("All");
  const [filterSession, setFilterSession] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState("all");
  const [alertSet, setAlertSet] = useState<Set<number>>(new Set());
  const [exported, setExported] = useState(false);
  const [chartModal, setChartModal] = useState<number | null>(null);

  const filtered = events.filter((e) => {
    const matchCcy = filterCurrency === "All" || e.currency === filterCurrency;
    const matchImpact = filterImpact === "All" || e.impact === filterImpact.toLowerCase();
    const matchDay = activeDay === "all" || e.dayKey === activeDay;
    const matchSearch = e.event.toLowerCase().includes(search.toLowerCase()) || e.currency.toLowerCase().includes(search.toLowerCase());
    return matchCcy && matchImpact && matchDay && matchSearch;
  });

  const grouped = filtered.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={14} className="text-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-wider">Economic Calendar</span>
          </div>
          <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Market-Moving Events
          </h1>
          <p className="text-[#6E7489] text-sm max-w-xl">
            Real-time economic releases with forecasts, actuals, and ForexFactory-style Specs + History detail. Click any row to expand.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Date Navigator */}
        <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
          <button className="p-1.5 rounded text-[#6E7489] hover:text-[#9AA0B4] transition-colors shrink-0">
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setActiveDay("all")}
            className={`px-3 py-1.5 rounded text-xs transition-colors shrink-0 ${activeDay === "all" ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}
          >
            All Week
          </button>
          {weekDays.map((d) => (
            <button
              key={d.key}
              onClick={() => setActiveDay(d.key)}
              className={`px-3 py-1.5 rounded text-xs transition-colors shrink-0 ${
                activeDay === d.key
                  ? "bg-[#C9A84C] text-[#09090E] font-medium"
                  : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"
              }`}
            >
              <span className="block text-[10px] opacity-70">{d.label}</span>
              <span>{d.date}</span>
            </button>
          ))}
          <button className="p-1.5 rounded text-[#6E7489] hover:text-[#9AA0B4] transition-colors shrink-0">
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
          <div className="relative min-w-[160px] flex-1">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6E7489]" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-7 pr-3 py-1.5 bg-[#141622] border border-[#1C1E2B] rounded text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
            />
          </div>
          <div className="flex items-center gap-1 text-xs text-[#6E7489]">
            <span className="text-[10px] uppercase tracking-wider mr-1">Currency:</span>
            {currencies.map((c) => (
              <button key={c} onClick={() => setFilterCurrency(c)}
                className={`px-2 py-1 rounded transition-colors ${filterCurrency === c ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#6E7489]">
            <span className="text-[10px] uppercase tracking-wider mr-1">Impact:</span>
            {impacts.map((imp) => (
              <button key={imp} onClick={() => setFilterImpact(imp)}
                className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${filterImpact === imp ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"}`}>
                {imp !== "All" && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: impactConfig[imp.toLowerCase() as keyof typeof impactConfig]?.color }} />
                )}
                {imp}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => { setExported(true); setTimeout(() => setExported(false), 2000); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#1C1E2B] rounded text-xs transition-colors"
              style={{ color: exported ? "#22C55E" : "#6E7489" }}
            >
              <Download size={11} /> {exported ? "Exported!" : "Export"}
            </button>
            <Link to="/alerts" className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#C9A84C]/30 rounded text-xs text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors">
              <Bell size={11} /> Alerts
            </Link>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-xs text-[#6E7489]">
          {(["high", "medium", "low"] as const).map((imp) => (
            <div key={imp} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: impactConfig[imp].color }} />
              {impactConfig[imp].label} Impact
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <Globe size={11} />
            Timezone: GMT+0 (UTC)
          </div>
          <span className="text-[10px]">{filtered.length} events</span>
        </div>

        {/* Chart Modal */}
        {chartModal !== null && (() => {
          const ev = events.find((e) => e.id === chartModal);
          return ev ? <ChartModal ev={ev} onClose={() => setChartModal(null)} /> : null;
        })()}

        {/* Calendar Table */}
        <div className="rounded-xl border border-[#1C1E2B] overflow-hidden">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 px-4 py-3 bg-[#141622] text-[10px] text-[#6E7489] uppercase tracking-wider border-b border-[#1C1E2B]">
            <span className="col-span-1">Time</span>
            <span className="col-span-1">CCY</span>
            <span className="col-span-3">Event</span>
            <span className="col-span-1 text-center">Impact</span>
            <span className="col-span-1 text-right">Forecast</span>
            <span className="col-span-1 text-right">Previous</span>
            <span className="col-span-1 text-right">Actual</span>
            <span className="col-span-3 text-right">Actions</span>
          </div>

          {Object.keys(grouped).length === 0 && (
            <div className="px-6 py-10 text-center text-[#6E7489] text-sm">No events match your filters.</div>
          )}

          {Object.entries(grouped).map(([date, dayEvents]) => (
            <div key={date}>
              {/* Date separator */}
              <div className="px-4 py-2.5 bg-[#0E0F17] border-b border-[#1C1E2B] flex items-center gap-2">
                <Calendar size={11} className="text-[#C9A84C]" />
                <span className="text-xs text-[#C9A84C] uppercase tracking-wider">{date}</span>
                <span className="text-xs text-[#6E7489] ml-1">— {dayEvents.length} events</span>
              </div>

              {dayEvents.map((ev) => {
                const impact = impactConfig[ev.impact];
                const isExpanded = expandedRow === ev.id;
                const actualNum = parseFloat(ev.actual ?? "");
                const forecastNum = parseFloat(ev.forecast);
                const actualIsUp = !isNaN(actualNum) && !isNaN(forecastNum) && actualNum > forecastNum;

                return (
                  <div key={ev.id}>
                    {/* Row */}
                    <div
                      className={`grid grid-cols-12 px-4 py-3.5 border-b border-[#1C1E2B] items-center transition-colors ${isExpanded ? "bg-[#141622]" : "hover:bg-[#141622]/40"}`}
                    >
                      <span className="col-span-2 sm:col-span-1 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9AA0B4" }}>
                        {ev.time}
                      </span>
                      <span className="col-span-2 sm:col-span-1 text-xs text-[#EEF0F6] flex items-center gap-1">
                        {ev.flag} <span className="hidden sm:inline">{ev.currency}</span>
                      </span>
                      <span className="col-span-4 sm:col-span-3 text-xs pr-2" style={{ color: isExpanded ? "#EEF0F6" : "#9AA0B4" }}>
                        {ev.event}
                      </span>
                      <div className="hidden sm:flex col-span-1 justify-center items-center">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: impact.color }} title={impact.label} />
                      </div>
                      <span className="hidden sm:block col-span-1 text-right text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#9AA0B4" }}>
                        {ev.forecast}
                      </span>
                      <span className="hidden sm:block col-span-1 text-right text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#6E7489" }}>
                        {ev.previous}
                      </span>
                      <span className="hidden sm:flex col-span-1 text-right text-xs items-center justify-end gap-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: ev.actual ? (actualIsUp ? "#22C55E" : "#EF4444") : "#6E7489" }}>
                        {ev.actual ? (actualIsUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />) : null}
                        {ev.actual ?? "—"}
                      </span>
                      {/* Two action buttons */}
                      <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedRow(isExpanded ? null : ev.id); }}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] border transition-colors shrink-0 ${
                            isExpanded
                              ? "bg-[#C9A84C]/15 border-[#C9A84C]/40 text-[#C9A84C]"
                              : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8"
                          }`}
                          title="View Specs & History"
                        >
                          {isExpanded ? <ChevronUp size={11} /> : <Info size={11} />}
                          <span className="hidden sm:inline">Details</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setChartModal(ev.id); }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] border border-[#1C1E2B] text-[#9AA0B4] hover:border-[#3B82F6]/40 hover:text-[#60A5FA] hover:bg-[#3B82F6]/8 transition-colors shrink-0"
                          title="View Full Chart"
                        >
                          <Maximize2 size={11} />
                          <span className="hidden sm:inline">Chart</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Specs + History Panel */}
                    {isExpanded && (
                      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
                        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1C1E2B]">
                          {/* Left: Specs */}
                          <div className="p-5">
                            <SpecsPanel ev={ev} />
                          </div>
                          {/* Right: History */}
                          <div className="p-5">
                            <HistoryPanel ev={ev} />
                          </div>
                        </div>
                        {/* Actions bar */}
                        <div className="px-5 py-3 border-t border-[#1C1E2B] flex items-center gap-3 flex-wrap bg-[#141622]/50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAlertSet((prev) => {
                                const next = new Set(prev);
                                next.has(ev.id) ? next.delete(ev.id) : next.add(ev.id);
                                return next;
                              });
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors ${alertSet.has(ev.id) ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C]/20"}`}
                          >
                            <Bell size={11} /> {alertSet.has(ev.id) ? "Alert Set ✓" : "Set Alert"}
                          </button>
                          <Link
                            to="/news"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141622] border border-[#1C1E2B] text-[#9AA0B4] text-xs hover:text-[#EEF0F6] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Newspaper size={11} /> Related News
                          </Link>
                          <Link
                            to="/tools"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141622] border border-[#1C1E2B] text-[#9AA0B4] text-xs hover:text-[#EEF0F6] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <BarChart2 size={11} /> Full Chart View
                          </Link>
                          <span className="ml-auto text-[10px] text-[#6E7489]">
                            Source: {ev.specs.source.split(" (")[0]}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Info note */}
        <p className="text-[10px] text-[#6E7489] mt-4 text-center">
          <span className="text-[#C9A84C]">Details</span> — expands Specs &amp; History inline &nbsp;·&nbsp; <span className="text-[#60A5FA]">Chart</span> — opens full historical chart popup
        </p>
      </div>
    </div>
  );
}
