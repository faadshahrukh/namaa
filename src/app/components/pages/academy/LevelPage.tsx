import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Play, Lock, CheckCircle, Clock, Award, ChevronRight, BookOpen, Users } from "lucide-react";
import { getLevelById } from "../../../data/academy";

export function LevelPage() {
  const { level: levelId } = useParams<{ level: string }>();
  const navigate = useNavigate();
  const level = getLevelById(levelId ?? "");

  if (!level) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <div className="text-[#6E7489] mb-4">Level not found.</div>
        <Link to="/academy" className="text-[#C9A84C] hover:underline">← Back to Academy</Link>
      </div>
    );
  }

  const completedCount = level.lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedCount / level.lessons.length) * 100);

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B]" style={{ backgroundColor: `${level.color}08` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-[#6E7489] hover:text-[#EEF0F6] mb-5 transition-colors">
            <ArrowLeft size={13} /> Back to Academy
          </button>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ color: level.color }}>{level.title} · {level.subtitle}</div>
              <h1 className="text-[#EEF0F6] mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                {level.subtitle}
              </h1>
              <p className="text-sm text-[#6E7489] max-w-lg">{level.description}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-[#6E7489]">
                <span className="flex items-center gap-1"><BookOpen size={11} /> {level.lessons.length} lessons</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {level.duration}</span>
                <span className="flex items-center gap-1"><Users size={11} /> {level.students} enrolled</span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="text-xs text-[#6E7489] mb-1">{completedCount}/{level.lessons.length} completed</div>
              <div className="w-28 h-2 rounded-full bg-[#1C1E2B] overflow-hidden mb-1">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: level.color }} />
              </div>
              <div className="text-xs" style={{ color: level.color }}>{progress}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-3">
          {level.lessons.map((lesson) => {
            const isLocked = !!lesson.locked;
            const isDone = !!lesson.completed;
            return (
              <div key={lesson.id} className={`rounded-xl border transition-all ${isLocked ? "border-[#1C1E2B] opacity-70" : isDone ? "border-[#22C55E]/20" : "border-[#1C1E2B] hover:border-[#2A2D3E]"}`}>
                {isLocked ? (
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl bg-[#141622] border border-[#1C1E2B] flex items-center justify-center shrink-0">
                      <Lock size={14} className="text-[#6E7489]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm text-[#6E7489]">{lesson.title}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[#1C1E2B] text-[#6E7489]">Locked</span>
                      </div>
                      <div className="text-xs text-[#6E7489]">{lesson.duration} · {lesson.type}</div>
                    </div>
                    <Lock size={14} className="text-[#6E7489] shrink-0" />
                  </div>
                ) : (
                  <Link to={`/academy/${level.id}/${lesson.id}`} className="flex items-center gap-4 p-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                      style={{ backgroundColor: isDone ? `${level.color}20` : "#141622", borderColor: isDone ? `${level.color}40` : "#1C1E2B" }}>
                      {isDone
                        ? <CheckCircle size={16} style={{ color: level.color }} />
                        : <Play size={14} className="text-[#6E7489] group-hover:text-[#EEF0F6] transition-colors ml-0.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[#9AA0B4] group-hover:text-[#EEF0F6] transition-colors mb-0.5">{lesson.title}</div>
                      <div className="text-xs text-[#6E7489]">{lesson.desc}</div>
                      <div className="text-xs text-[#6E7489] mt-1">{lesson.duration} · {lesson.type}</div>
                    </div>
                    <ChevronRight size={14} className="text-[#6E7489] group-hover:text-[#EEF0F6] transition-colors shrink-0" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-2xl border flex items-center gap-4"
          style={{ borderColor: `${level.color}25`, backgroundColor: `${level.color}05` }}>
          <Award size={32} style={{ color: level.color }} />
          <div>
            <div className="text-sm text-[#EEF0F6] mb-1">Complete this level to earn your certificate</div>
            <div className="text-xs text-[#6E7489]">
              {completedCount < level.lessons.length
                ? `${level.lessons.length - completedCount} lessons remaining`
                : "You've completed all lessons — claim your certificate!"}
            </div>
          </div>
          {completedCount >= level.lessons.length && (
            <button className="ml-auto px-4 py-2 rounded-lg text-sm text-[#09090E] shrink-0" style={{ backgroundColor: level.color }}>
              Claim Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
