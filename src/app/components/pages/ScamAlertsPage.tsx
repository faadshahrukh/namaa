import { useState } from "react";
import { getCmsScamAlerts } from "@/hooks/useCms";
import { Link } from "react-router";
import {
  AlertTriangle, Search, Shield, CheckCircle, XCircle,
  Clock, Users, ChevronRight, ExternalLink, Upload,
  Flag, BookOpen
} from "lucide-react";

const alerts = getCmsScamAlerts().map((a, i) => ({
  id: parseInt(a.id) || i + 1,
  broker: a.name,
  type: a.type,
  severity: a.severity,
  reports: a.reports,
  date: a.date,
  status: a.status,
  regulation: a.regulation,
  country: a.country,
  desc: a.description,
  tags: a.tags,
}));

const verifiedSafe = [
  { name: "IC Markets", reg: "ASIC · CySEC", score: 98, verified: true },
  { name: "Pepperstone", reg: "FCA · ASIC · DFSA", score: 97, verified: true },
  { name: "OANDA", reg: "FCA · CFTC · IIROC", score: 96, verified: true },
  { name: "IG Group", reg: "FCA · ASIC · MAS", score: 95, verified: true },
];

const scamTypes = [
  { title: "Clone Firms", icon: "🎭", desc: "Fraudsters copy legitimate broker details to deceive traders." },
  { title: "Withdrawal Scams", icon: "🔒", desc: "Blocking profitable withdrawals under fabricated conditions." },
  { title: "Fake Signals", icon: "📊", desc: "Selling fabricated trading signals with false track records." },
  { title: "Ponzi Schemes", icon: "⚠️", desc: "Using new investor funds to pay existing investors." },
];

const severityConfig = {
  critical: { color: "#EF4444", bg: "bg-red-500/10", label: "Critical" },
  high: { color: "#F97316", bg: "bg-orange-500/10", label: "High Risk" },
  medium: { color: "#F59E0B", bg: "bg-amber-500/10", label: "Medium" },
};

const statusConfig = {
  "Blacklisted": { color: "#EF4444", icon: XCircle },
  "Warning": { color: "#F59E0B", icon: AlertTriangle },
  "Under Review": { color: "#3B82F6", icon: Clock },
};

export function ScamAlertsPage() {
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [verifySearch, setVerifySearch] = useState("");
  const [verifyResult, setVerifyResult] = useState<"safe" | "risk" | null>(null);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [reportBroker, setReportBroker] = useState("");
  const [reportEvidence, setReportEvidence] = useState("");
  const [reportEmail, setReportEmail] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [addReportId, setAddReportId] = useState<number | null>(null);
  const [investigationId, setInvestigationId] = useState<number | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportBroker.trim() || !reportEvidence.trim()) return;
    setReportSubmitted(true);
    setReportBroker("");
    setReportEvidence("");
    setReportEmail("");
  };

  const filtered = alerts.filter((a) => {
    const matchSearch = a.broker.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase());
    const matchSev = filterSeverity === "all" || a.severity === filterSeverity;
    return matchSearch && matchSev;
  });

  const handleVerify = () => {
    if (!verifySearch.trim()) return;
    const known = alerts.map((a) => a.broker.toLowerCase());
    setVerifyResult(known.some((b) => b.includes(verifySearch.toLowerCase())) ? "risk" : "safe");
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="border-b border-red-500/15 bg-[#0E0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs text-red-400 uppercase tracking-wider">Scam Alerts</span>
          </div>
          <h1
            className="text-[#EEF0F6] mb-2"
            style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Broker Fraud Database
          </h1>
          <p className="text-[#6E7489] text-sm max-w-xl">
            Community-reported and verified broker scam alerts. Search before you deposit. Protect yourself and other traders.
          </p>
          <div className="flex items-center gap-5 mt-4 text-xs text-[#6E7489]">
            <span className="flex items-center gap-1.5"><AlertTriangle size={11} className="text-red-400" /> 211 blacklisted brokers</span>
            <span className="flex items-center gap-1.5"><Users size={11} className="text-[#C9A84C]" /> 1,892 community reports</span>
            <span className="flex items-center gap-1.5"><Clock size={11} /> Updated hourly</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Verify tool */}
            <div className="mb-6 p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} className="text-[#C9A84C]" />
                <span className="text-sm text-[#EEF0F6]">Quick Broker Verification</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter broker name..."
                  value={verifySearch}
                  onChange={(e) => { setVerifySearch(e.target.value); setVerifyResult(null); }}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="flex-1 px-3 py-2.5 bg-[#141622] border border-[#1C1E2B] rounded-md text-sm text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
                />
                <button
                  onClick={handleVerify}
                  className="px-4 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-md text-sm hover:bg-[#D4B55A] transition-colors"
                >
                  Verify
                </button>
              </div>
              {verifyResult && (
                <div
                  className={`mt-3 flex items-center gap-2.5 p-3 rounded-lg ${
                    verifyResult === "safe" ? "bg-[#22C55E]/8 border border-[#22C55E]/20" : "bg-red-500/8 border border-red-500/20"
                  }`}
                >
                  {verifyResult === "safe" ? (
                    <CheckCircle size={16} className="text-[#22C55E] shrink-0" />
                  ) : (
                    <XCircle size={16} className="text-red-400 shrink-0" />
                  )}
                  <div>
                    <span className={`text-sm ${verifyResult === "safe" ? "text-[#22C55E]" : "text-red-400"}`}>
                      {verifyResult === "safe"
                        ? `"${verifySearch}" — No alerts found in our database`
                        : `"${verifySearch}" — FLAGGED: Appears in our scam database`}
                    </span>
                    <p className="text-xs text-[#6E7489] mt-0.5">
                      {verifyResult === "safe"
                        ? "Always verify regulation directly with the relevant authority before depositing."
                        : "Do NOT deposit. View full report below for details."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Search + Filter */}
            <div className="flex gap-3 mb-4">
              <div className="relative flex-1">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E7489]" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-[#0E0F17] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
                />
              </div>
              {(["all", "critical", "high", "medium"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterSeverity(s)}
                  className={`px-2.5 py-1.5 rounded text-xs capitalize transition-colors ${
                    filterSeverity === s
                      ? "bg-[#C9A84C]/15 text-[#C9A84C]"
                      : "text-[#6E7489] hover:text-[#9AA0B4] hover:bg-[#1C1E2B]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Alert list */}
            <div className="space-y-3">
              {filtered.map((alert) => {
                const sev = severityConfig[alert.severity as keyof typeof severityConfig];
                const sts = statusConfig[alert.status as keyof typeof statusConfig];
                const StatusIcon = sts.icon;
                const isExpanded = expandedAlert === alert.id;

                return (
                  <div
                    key={alert.id}
                    className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden hover:border-[#2A2D3E] transition-colors"
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle size={15} className="text-red-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-sm text-[#EEF0F6]">{alert.broker}</span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded flex items-center gap-1 ${sev.bg}`}
                              style={{ color: sev.color }}
                            >
                              {sev.label}
                            </span>
                            <span
                              className="text-xs flex items-center gap-1 ml-auto shrink-0"
                              style={{ color: sts.color }}
                            >
                              <StatusIcon size={11} /> {alert.status}
                            </span>
                          </div>
                          <div className="flex items-center flex-wrap gap-3 text-xs text-[#6E7489]">
                            <span>{alert.type}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1"><Users size={10} /> {alert.reports} reports</span>
                            <span>·</span>
                            <span>{alert.date}</span>
                            <span>·</span>
                            <span>{alert.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-[#1C1E2B] pt-3">
                        <p className="text-xs text-[#9AA0B4] leading-relaxed mb-3">{alert.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {alert.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-[#141622] text-[#6E7489]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={(e) => { e.stopPropagation(); setAddReportId(addReportId === alert.id ? null : alert.id); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs transition-colors ${addReportId === alert.id ? "bg-[#C9A84C]/15 border-[#C9A84C]/30 text-[#C9A84C]" : "bg-[#141622] border-[#1C1E2B] text-[#9AA0B4] hover:text-[#EEF0F6]"}`}>
                            <Flag size={11} /> {addReportId === alert.id ? "Report Added ✓" : "Add Report"}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setInvestigationId(investigationId === alert.id ? null : alert.id); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#141622] border border-[#1C1E2B] text-[#9AA0B4] text-xs hover:text-[#EEF0F6] transition-colors">
                            <ExternalLink size={11} /> Full Investigation
                          </button>
                        </div>
                        {investigationId === alert.id && (
                          <div className="mt-3 p-3 rounded-lg bg-[#141622] border border-[#1C1E2B] text-xs text-[#9AA0B4] leading-relaxed">
                            <strong className="text-[#EEF0F6] block mb-1">Investigation Report: {alert.broker}</strong>
                            Evidence reviewed by the Namaa Markets editorial team. Regulation status: <strong className="text-red-400">{alert.regulation}</strong>.
                            Community reports: <strong className="text-[#EEF0F6]">{alert.reports}</strong>. If you have been affected, report immediately to your local financial regulator and submit evidence below.
                            <Link to="/scam-alerts/guide" className="block mt-2 text-[#C9A84C] hover:underline">Read our full scam protection guide →</Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Verified Safe */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#22C55E]/15 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1C1E2B]">
                <Shield size={13} className="text-[#22C55E]" />
                <span className="text-xs text-[#22C55E]">Verified Safe Brokers</span>
              </div>
              <div className="divide-y divide-[#1C1E2B]">
                {verifiedSafe.map((b) => (
                  <div key={b.name} className="flex items-center gap-3 px-4 py-3">
                    <CheckCircle size={13} className="text-[#22C55E] shrink-0" />
                    <div className="flex-1">
                      <div className="text-xs text-[#EEF0F6]">{b.name}</div>
                      <div className="text-xs text-[#6E7489]">{b.reg}</div>
                    </div>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#22C55E" }}
                    >
                      {b.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Scam Types */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1C1E2B]">
                <span className="text-xs text-[#EEF0F6]">Know the Scams</span>
              </div>
              <div className="divide-y divide-[#1C1E2B]">
                {scamTypes.map((s) => (
                  <div key={s.title} className="flex items-start gap-3 px-4 py-3">
                    <span className="text-base shrink-0">{s.icon}</span>
                    <div>
                      <div className="text-xs text-[#EEF0F6] mb-0.5">{s.title}</div>
                      <div className="text-xs text-[#6E7489] leading-tight">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-[#1C1E2B]">
                <Link to="/scam-alerts/guide" className="flex items-center gap-1.5 text-xs text-[#C9A84C] hover:underline">
                  <BookOpen size={11} /> Full Scam Detection Guide
                </Link>
              </div>
            </div>

            {/* Submit Report */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload size={13} className="text-[#C9A84C]" />
                <span className="text-xs text-[#EEF0F6]">Submit a Report</span>
              </div>
              <p className="text-xs text-[#6E7489] leading-relaxed mb-4">
                Experienced fraud? Report it with evidence. Our team reviews and verifies all submissions before publication.
              </p>
              {reportSubmitted ? (
                <div className="p-3 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 text-xs text-[#22C55E] text-center">
                  ✓ Report submitted. Our team will review and contact you within 48 hours.
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Broker name *"
                    value={reportBroker}
                    onChange={(e) => setReportBroker(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
                  />
                  <textarea
                    placeholder="Describe what happened — include withdrawal issues, promises made, or evidence of fraud... *"
                    rows={3}
                    value={reportEvidence}
                    onChange={(e) => setReportEvidence(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40 resize-none"
                  />
                  <input
                    type="email"
                    placeholder="Your email (optional — for follow-up)"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#141622] border border-[#1C1E2B] rounded-md text-xs text-[#EEF0F6] placeholder:text-[#6E7489] focus:outline-none focus:border-[#C9A84C]/40"
                  />
                  <button type="submit" className="w-full py-2 bg-red-500/10 border border-red-500/25 text-red-400 rounded-md text-xs hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1.5">
                    <Flag size={11} /> Submit Report for Review
                  </button>
                </form>
              )}
            </div>

            {/* Regulatory authorities */}
            <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] p-4">
              <div className="text-xs text-[#EEF0F6] mb-3">Verify Regulation Directly</div>
              <div className="space-y-2">
                {[
                  { reg: "FCA", url: "register.fca.org.uk" },
                  { reg: "ASIC", url: "moneysmart.gov.au" },
                  { reg: "CySEC", url: "cysec.gov.cy" },
                  { reg: "CFTC", url: "cftc.gov" },
                ].map(({ reg, url }) => (
                  <div key={reg} className="flex items-center justify-between text-xs">
                    <span className="text-[#9AA0B4]">{reg}</span>
                    <span className="text-[#6E7489]">{url}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
