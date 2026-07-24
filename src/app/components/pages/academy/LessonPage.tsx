import { useParams, Link, useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock, Play, RotateCcw } from "lucide-react";
import { getLevelById, getLessonById } from "../../../data/academy";

export function LessonPage() {
  const { level: levelId, lesson: lessonId } = useParams<{ level: string; lesson: string }>();
  const navigate = useNavigate();
  const level = getLevelById(levelId ?? "");
  const lesson = getLessonById(levelId ?? "", lessonId ?? "");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!level || !lesson) {
    return (
      <div className="pt-32 text-center min-h-screen">
        <div className="text-[#6E7489] mb-4">Lesson not found.</div>
        <Link to="/academy" className="text-[#C9A84C] hover:underline">← Back to Academy</Link>
      </div>
    );
  }

  const lessonIdx = level.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = level.lessons[lessonIdx - 1];
  const nextLesson = level.lessons[lessonIdx + 1];
  const quizScore = lesson.quiz
    ? lesson.quiz.filter((q, i) => quizAnswers[i] === q.answer).length
    : 0;

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1C1E2B] bg-[#0E0F17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center gap-2 text-xs text-[#6E7489] mb-3">
            <Link to={`/academy/${level.id}`} className="hover:text-[#EEF0F6] transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> {level.title}
            </Link>
            <span className="text-[#2A2D3E]">/</span>
            <span style={{ color: level.color }}>{lesson.title}</span>
          </div>
          <div className="w-full h-1 rounded-full bg-[#1C1E2B] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${((lessonIdx + 1) / level.lessons.length) * 100}%`, backgroundColor: level.color }} />
          </div>
          <div className="flex items-center justify-between mt-1.5 text-xs text-[#6E7489]">
            <span>{lessonIdx + 1} of {level.lessons.length}</span>
            <span>{level.title} Level</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${level.color}18`, color: level.color }}>{lesson.type}</span>
          <span className="text-xs text-[#6E7489] flex items-center gap-1"><Clock size={10} /> {lesson.duration}</span>
        </div>
        <h1 className="text-[#EEF0F6] mb-3" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
          {lesson.title}
        </h1>
        <p className="text-sm text-[#6E7489] leading-relaxed mb-8">{lesson.desc}</p>

        {/* Video placeholder */}
        {lesson.type.includes("Video") && (
          <div className="rounded-xl bg-[#0E0F17] border border-[#1C1E2B] aspect-video flex items-center justify-center mb-8 cursor-pointer group hover:border-[#2A2D3E] transition-colors">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#C9A84C]/20 transition-colors">
                <Play size={22} className="text-[#C9A84C] ml-1" />
              </div>
              <div className="text-sm text-[#9AA0B4]">Play Lesson Video</div>
              <div className="text-xs text-[#6E7489]">{lesson.duration}</div>
            </div>
          </div>
        )}

        {/* Content */}
        {lesson.content.length > 0 ? (
          <div className="space-y-5 mb-10">
            <h2 className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Reading Material</h2>
            {lesson.content.map((para, i) => (
              <p key={i} className="text-sm text-[#9AA0B4] leading-[1.85]">{para}</p>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-[#0E0F17] border border-[#1C1E2B] text-center mb-10">
            <BookOpen size={28} className="text-[#C9A84C] mx-auto mb-3" />
            <div className="text-sm text-[#EEF0F6] mb-1">Full lesson content available</div>
            <div className="text-xs text-[#6E7489]">Watch the video above to complete this lesson.</div>
          </div>
        )}

        {/* Quiz */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm text-[#EEF0F6]" style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400 }}>Knowledge Check</h2>
              {quizSubmitted && (
                <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="flex items-center gap-1.5 text-xs text-[#6E7489] hover:text-[#9AA0B4] transition-colors">
                  <RotateCcw size={11} /> Retry
                </button>
              )}
            </div>
            <div className="space-y-5">
              {lesson.quiz.map((q, qi) => (
                <div key={qi} className="p-5 rounded-xl bg-[#0E0F17] border border-[#1C1E2B]">
                  <div className="text-xs text-[#EEF0F6] mb-3">{qi + 1}. {q.question}</div>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      const isSelected = quizAnswers[qi] === oi;
                      const isCorrect = quizSubmitted && oi === q.answer;
                      const isWrong = quizSubmitted && isSelected && oi !== q.answer;
                      return (
                        <button key={oi} disabled={quizSubmitted} onClick={() => setQuizAnswers((p) => ({ ...p, [qi]: oi }))}
                          className={`w-full text-left px-4 py-2.5 rounded-lg border text-xs transition-colors ${
                            isCorrect ? "border-[#22C55E]/40 bg-[#22C55E]/8 text-[#22C55E]"
                            : isWrong ? "border-red-500/40 bg-red-500/8 text-red-400"
                            : isSelected ? "border-[#C9A84C]/40 bg-[#C9A84C]/8 text-[#C9A84C]"
                            : "border-[#1C1E2B] text-[#9AA0B4] hover:border-[#2A2D3E] hover:text-[#EEF0F6]"
                          }`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {!quizSubmitted ? (
              <button onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < lesson.quiz!.length}
                className="mt-4 px-5 py-2.5 bg-[#C9A84C] text-[#09090E] rounded-lg text-sm hover:bg-[#D4B55A] transition-colors disabled:opacity-40">
                Submit Answers
              </button>
            ) : (
              <div className={`mt-4 p-4 rounded-xl border ${quizScore === lesson.quiz.length ? "border-[#22C55E]/25 bg-[#22C55E]/5" : "border-[#C9A84C]/25 bg-[#C9A84C]/5"}`}>
                <div className="text-sm text-[#EEF0F6]">
                  {quizScore === lesson.quiz.length ? "🎉 Perfect score!" : `You got ${quizScore}/${lesson.quiz.length} correct`}
                </div>
                <div className="text-xs text-[#6E7489] mt-0.5">
                  {quizScore === lesson.quiz.length ? "Excellent understanding of the material." : "Review the lesson and try again."}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="border-t border-[#1C1E2B] pt-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            {prevLesson && !prevLesson.locked && (
              <Link to={`/academy/${level.id}/${prevLesson.id}`} className="flex items-center gap-1.5 text-xs text-[#6E7489] hover:text-[#EEF0F6] transition-colors">
                <ArrowLeft size={12} /> {prevLesson.title}
              </Link>
            )}
          </div>
          <button
            onClick={() => {
              if (nextLesson && !nextLesson.locked) navigate(`/academy/${level.id}/${nextLesson.id}`);
              else navigate(`/academy/${level.id}`);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm text-[#09090E] hover:brightness-110 transition-all"
            style={{ backgroundColor: level.color }}>
            {nextLesson && !nextLesson.locked
              ? <>Next Lesson <ArrowRight size={13} /></>
              : <><CheckCircle size={13} /> Mark Complete</>}
          </button>
        </div>
      </div>
    </div>
  );
}
