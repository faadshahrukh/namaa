import { Link } from "react-router";
import { BookOpen, Bell, Star, TrendingUp, Award, Clock, ChevronRight, BarChart2 } from "lucide-react";
import { levels } from "../../data/academy";
import { articles } from "../../data/news";
import { brokers } from "../../data/brokers";

const recentActivity = [
  { type: "lesson", text: "Completed: Pips, Lots, and Position Sizing", time: "2h ago" },
  { type: "alert", text: "Alert triggered: EUR/USD crossed 1.0880", time: "4h ago" },
  { type: "broker", text: "Saved broker: IC Markets", time: "1d ago" },
  { type: "lesson", text: "Completed: Understanding Currency Pairs", time: "2d ago" },
];

export function DashboardPage() {
  const completedLessons = levels.flatMap((l) => l.lessons.filter((ll) => ll.completed));
  const totalLessons = levels.flatMap((l) => l.lessons).length;
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-[#6E7489] mb-1">Welcome back</div>
              <h1 className="text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "1.8rem" }}>
                My Dashboard
              </h1>
            </div>
            <Link to="/premium" className="px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/25 text-[#C9A84C] text-xs rounded-lg hover:bg-[#C9A84C]/20 transition-colors">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: BookOpen, label: "Lessons Done", value: `${completedLessons.length}/${totalLessons}`, color: "#22C55E" },
                { icon: Bell, label: "Active Alerts", value: "5", color: "#C9A84C" },
                { icon: Star, label: "Saved Brokers", value: "3", color: "#A78BFA" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="p-4 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center">
                  <Icon size={16} className="mx-auto mb-2" style={{ color }} />
                  <div className="text-xl mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace", color }}>{value}</div>
                  <div className="text-xs text-[#6E7489]">{label}</div>
                </div>
              ))}
            </div>

            {/* Academy progress */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-[#EEF0F6]">Academy Progress</h2>
                <Link to="/academy" className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1">
                  Continue <ChevronRight size={11} />
                </Link>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-2 rounded-full bg-[#1C1E2B] overflow-hidden">
                  <div className="h-full rounded-full bg-[#C9A84C] transition-all" style={{ width: `${overallProgress}%` }} />
                </div>
                <span className="text-xs shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{overallProgress}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {levels.map((level) => {
                  const done = level.lessons.filter((l) => l.completed).length;
                  const pct = Math.round((done / level.lessons.length) * 100);
                  return (
                    <Link key={level.id} to={`/academy/${level.id}`} className="p-3 rounded-lg bg-[#141622] border border-[#1C1E2B] hover:border-[#2A2D3E] transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[#9AA0B4]">{level.title}</span>
                        <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: level.color }}>{pct}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-[#1C1E2B] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: level.color }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Latest news */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm text-[#EEF0F6]">Latest News</h2>
                <Link to="/news" className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1">All news <ChevronRight size={11} /></Link>
              </div>
              <div className="space-y-3">
                {articles.slice(0, 4).map((a) => (
                  <Link key={a.id} to={`/news/${a.slug}`} className="flex items-start gap-3 group">
                    <div className="text-xs px-1.5 py-0.5 rounded bg-[#141622] text-[#6E7489] shrink-0 mt-0.5">{a.category}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#9AA0B4] group-hover:text-[#EEF0F6] transition-colors line-clamp-2">{a.title}</p>
                      <span className="text-xs text-[#6E7489] flex items-center gap-1 mt-0.5"><Clock size={9} /> {a.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Recent activity */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <h3 className="text-sm text-[#EEF0F6] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-[#9AA0B4] leading-relaxed">{a.text}</p>
                      <span className="text-xs text-[#6E7489]">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved brokers */}
            <div className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-[#EEF0F6]">Saved Brokers</h3>
                <Link to="/brokers" className="text-xs text-[#C9A84C] hover:underline">Browse</Link>
              </div>
              <div className="space-y-2">
                {brokers.slice(0, 3).map((b) => (
                  <Link key={b.id} to={`/brokers/${b.slug}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#141622] transition-colors group">
                    <div className="w-7 h-7 rounded-lg bg-[#141622] border border-[#1C1E2B] flex items-center justify-center text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#C9A84C" }}>{b.logo}</div>
                    <div className="flex-1">
                      <div className="text-xs text-[#EEF0F6] group-hover:text-[#C9A84C] transition-colors">{b.name}</div>
                      <div className="text-xs text-[#6E7489]">★ {b.rating}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cert banner */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#141622] to-[#0E0F17] border border-[#C9A84C]/15">
              <Award size={20} className="text-[#C9A84C] mb-3" />
              <div className="text-sm text-[#EEF0F6] mb-1">1 Certificate Earned</div>
              <div className="text-xs text-[#6E7489] mb-3">Complete Preschool level. 3 more levels remaining.</div>
              <Link to="/academy" className="text-xs text-[#C9A84C] hover:underline flex items-center gap-1">
                Continue Academy <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
