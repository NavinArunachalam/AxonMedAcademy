import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, CheckCircle2, Clock, X, ChevronLeft, ChevronRight, AlertCircle, Trophy } from "lucide-react";
import { Card } from "@/components/portal/PortalShell";
import { useClassroomStore, classroomActions, getGrade, formatTime, type Quiz, type Question } from "@/lib/classroomStore";
import { useState, useEffect, useCallback } from "react";

export const Route = createFileRoute("/_student/student/exams")({
  component: Exams,
});

// ─── Quiz Attempt Modal ───────────────────────────────────────────────────────

function QuizModal({ quiz, classroomId, studentId, studentName, onClose }: {
  quiz: Quiz; classroomId: string; studentId: string; studentName: string; onClose: () => void;
}) {
  const [phase, setPhase] = useState<"intro" | "taking" | "result">("intro");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [timeLeft, setTimeLeft] = useState((quiz.duration || 0) * 60);
  const [result, setResult] = useState<{ rawMarks: number; totalMarks: number; percentage: number; passed: boolean } | null>(null);

  // Timer
  useEffect(() => {
    if (phase !== "taking" || !quiz.duration) return;
    if (timeLeft <= 0) { handleSubmit(); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [phase, timeLeft]);

  const handleSelect = (qId: string, optLabel: string, isMulti: boolean) => {
    setSelected(prev => {
      const cur = prev[qId] || [];
      if (isMulti) {
        return { ...prev, [qId]: cur.includes(optLabel) ? cur.filter(x => x !== optLabel) : [...cur, optLabel] };
      }
      return { ...prev, [qId]: [optLabel] };
    });
  };

  const handleSubmit = useCallback(() => {
    let raw = 0;
    let total = 0;
    const answers = quiz.questions.map(q => {
      total += q.marks;
      const sel = selected[q.id] || [];
      const correctLabels = q.options.filter(o => o.isCorrect).map(o => o.label);
      let isCorrect = false;
      if (q.type === "mcq" || q.type === "true_false") {
        isCorrect = sel.length === 1 && correctLabels.includes(sel[0]);
      } else {
        isCorrect = sel.length === correctLabels.length && sel.every(s => correctLabels.includes(s));
      }
      const marks = isCorrect ? q.marks : (quiz.negativeMarking ? -quiz.negativeMarkValue : 0);
      raw += Math.max(marks, 0);
      return { questionId: q.id, selectedOptions: sel, isCorrect, marksAwarded: Math.max(marks, 0) };
    });
    const pct = total > 0 ? Math.round((raw / total) * 100) : 0;
    const passed = pct >= quiz.passPercent;
    const res = { rawMarks: raw, totalMarks: total, percentage: pct, passed };
    setResult(res);

    const prevAttempts = quiz.attempts.filter(a => a.studentId === studentId);
    classroomActions.submitQuizAttempt(classroomId, quiz.id, {
      studentId, studentName,
      attemptNo: prevAttempts.length + 1,
      status: "submitted",
      startedAt: new Date(Date.now() - ((quiz.duration || 0) * 60 - timeLeft) * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      answers,
      score: res,
    });
    setPhase("result");
  }, [quiz, selected, timeLeft, studentId, studentName, classroomId]);

  const q: Question = quiz.questions[qIdx];
  const isMulti = q?.type === "msq";
  const sel = selected[q?.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* INTRO */}
        {phase === "intro" && (
          <div className="p-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-plum-dark text-lime mx-auto mb-4">
              <ClipboardList className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-bold text-plum-dark">{quiz.title}</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">{quiz.instructions}</p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { l: "Questions", v: quiz.questions.length },
                { l: "Duration", v: quiz.duration ? `${quiz.duration} min` : "No limit" },
                { l: "Pass Mark", v: `${quiz.passPercent}%` },
              ].map(s => (
                <div key={s.l} className="bg-slate-50 rounded-2xl p-3">
                  <div className="font-display text-xl font-bold text-plum-dark">{s.v}</div>
                  <div className="text-xs text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 text-left flex gap-2 items-start">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Do not refresh or close this window during the exam. Your progress will be lost.</span>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={onClose} className="flex-1 rounded-full bg-slate-100 text-slate-600 py-3 font-semibold">Cancel</button>
              <button onClick={() => setPhase("taking")} className="flex-1 rounded-full bg-plum-dark text-cream py-3 font-bold">Start Exam →</button>
            </div>
          </div>
        )}

        {/* TAKING */}
        {phase === "taking" && q && (
          <div>
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400">Question {qIdx + 1} of {quiz.questions.length}</div>
                <div className="font-semibold text-plum-dark text-sm mt-0.5">{quiz.title}</div>
              </div>
              <div className="flex items-center gap-3">
                {quiz.duration && (
                  <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-mono font-bold ${timeLeft < 120 ? "bg-red-100 text-red-600" : "bg-plum-dark/10 text-plum-dark"}`}>
                    <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
                  </div>
                )}
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-100">
              <div className="h-full bg-plum transition-all" style={{ width: `${((qIdx + 1) / quiz.questions.length) * 100}%` }} />
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-6">
                <span className="bg-plum-dark text-cream text-xs font-bold rounded-full h-6 w-6 grid place-items-center shrink-0 mt-0.5">{qIdx + 1}</span>
                <div>
                  <p className="text-plum-dark font-semibold text-base leading-relaxed">{q.text}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {q.marks} mark{q.marks !== 1 ? "s" : ""} ·{" "}
                    {q.type === "mcq" ? "Single choice" : q.type === "msq" ? "Multiple correct answers" : "True / False"}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {q.options.map(opt => {
                  const isSelected = sel.includes(opt.label);
                  return (
                    <button key={opt.label} onClick={() => handleSelect(q.id, opt.label, isMulti)}
                      className={`w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                        isSelected ? "border-plum bg-plum-dark/5" : "border-slate-200 hover:border-plum/40"
                      }`}>
                      <span className={`grid h-6 w-6 place-items-center rounded-full border-2 text-xs font-bold shrink-0 transition-colors ${
                        isSelected ? "border-plum bg-plum-dark text-cream" : "border-slate-300 text-slate-500"
                      }`}>
                        {isMulti ? (isSelected ? "✓" : opt.label) : opt.label}
                      </span>
                      <span className="text-sm text-slate-700">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button disabled={qIdx === 0} onClick={() => setQIdx(i => i - 1)}
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 disabled:opacity-40">
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <div className="flex gap-1">
                  {quiz.questions.map((_, i) => (
                    <button key={i} onClick={() => setQIdx(i)}
                      className={`h-2 w-2 rounded-full transition-all ${i === qIdx ? "bg-plum-dark w-5" : selected[quiz.questions[i].id]?.length ? "bg-plum/50" : "bg-slate-300"}`} />
                  ))}
                </div>
                {qIdx < quiz.questions.length - 1 ? (
                  <button onClick={() => setQIdx(i => i + 1)} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-cream bg-plum-dark">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-plum-dark bg-lime">
                    Submit Exam ✓
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && result && (
          <div className="p-8 text-center">
            <div className={`grid h-20 w-20 place-items-center rounded-3xl mx-auto mb-4 ${result.passed ? "bg-lime text-plum-dark" : "bg-red-500/10 text-red-500"}`}>
              {result.passed ? <Trophy className="h-10 w-10" /> : <X className="h-10 w-10" />}
            </div>
            <h2 className={`font-display text-3xl font-bold ${result.passed ? "text-plum-dark" : "text-red-600"}`}>
              {result.passed ? "You Passed! 🎉" : "Not Passed"}
            </h2>
            <p className="text-slate-500 text-sm mt-2">{quiz.title}</p>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { l: "Score", v: `${result.rawMarks}/${result.totalMarks}` },
                { l: "Percentage", v: `${result.percentage}%` },
                { l: "Grade", v: getGrade(result.percentage) },
              ].map(s => (
                <div key={s.l} className={`rounded-2xl p-4 ${result.passed ? "bg-lime/10" : "bg-red-50"}`}>
                  <div className={`font-display text-2xl font-bold ${result.passed ? "text-plum-dark" : "text-red-600"}`}>{s.v}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <p className={`mt-4 text-sm font-semibold ${result.passed ? "text-lime-700" : "text-red-600"}`}>
              {result.passed ? `Great work! You scored above the ${quiz.passPercent}% pass mark.` : `You needed ${quiz.passPercent}% to pass. Keep practicing!`}
            </p>
            <button onClick={onClose} className="mt-6 w-full rounded-full bg-plum-dark text-cream py-3 font-bold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Exams Page ───────────────────────────────────────────────────────────────

function Exams() {
  const { classrooms, currentUser } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const studentName = currentUser?.name || "";
  const [activeQuiz, setActiveQuiz] = useState<{ quiz: Quiz; classroomId: string } | null>(null);

  const enrolledClassrooms = classrooms.filter(c =>
    c.students.some(s => s.id === studentId && s.status === "active")
  );
  const allQuizzes = enrolledClassrooms.flatMap(c =>
    c.quizzes.filter(q => q.status === "published").map(q => ({ ...q, classroomName: c.name, classroomId: c.id }))
  );

  const upcomingQuizzes = allQuizzes.filter(q =>
    !q.attempts.some(a => a.studentId === studentId && a.status === "submitted")
  );
  const completedAttempts = allQuizzes.flatMap(q =>
    q.attempts.filter(a => a.studentId === studentId && a.status === "submitted")
      .map(a => ({ ...a, quizTitle: q.title, classroomName: q.classroomName }))
  );
  const avgScore = completedAttempts.length
    ? Math.round(completedAttempts.reduce((s, a) => s + a.score.percentage, 0) / completedAttempts.length) : 0;

  const canAttempt = (q: typeof allQuizzes[0]) => {
    const prevAttempts = q.attempts.filter(a => a.studentId === studentId);
    return prevAttempts.length < q.maxAttempts;
  };

  return (
    <div className="space-y-6">
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz.quiz}
          classroomId={activeQuiz.classroomId}
          studentId={studentId}
          studentName={studentName}
          onClose={() => setActiveQuiz(null)}
        />
      )}

      <div>
        <h1 className="font-display text-3xl font-bold text-plum-dark">Exams & Assessments</h1>
        <p className="text-sm text-muted-foreground mt-1">Proctored finals, mock tests and practice quizzes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { k: "Average Score", v: `${avgScore}%`, icon: CheckCircle2 },
          { k: "Exams Taken", v: completedAttempts.length.toString(), icon: ClipboardList },
          { k: "Upcoming", v: upcomingQuizzes.length.toString(), icon: Clock },
        ].map(s => (
          <Card key={s.k} className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark"><s.icon className="h-5 w-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</div>
              <div className="font-display text-2xl font-bold text-plum-dark">{s.v}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Upcoming Exams */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-plum-dark text-lg">Upcoming Exams</h3>
        </div>
        <div className="space-y-3">
          {upcomingQuizzes.map(e => (
            <div key={e.id} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-border p-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-plum-dark text-lime shrink-0">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-plum-dark">{e.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {new Date(e.availableFrom).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                  {e.duration ? ` · ${e.duration} min` : ""}
                  {e.questions.length ? ` · ${e.questions.length} questions` : ""}
                  {` · Pass: ${e.passPercent}%`}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-plum-dark/60 mt-1">{e.classroomName}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase tracking-widest bg-lime text-plum-dark px-2.5 py-1 rounded-full font-bold">Pending</span>
                {canAttempt(e) ? (
                  <button
                    onClick={() => setActiveQuiz({ quiz: e, classroomId: e.classroomId })}
                    className="rounded-full bg-plum-dark text-cream text-xs font-semibold px-4 py-2 hover:bg-plum transition-colors"
                  >
                    Start Exam
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground rounded-full border border-border px-4 py-2">Max attempts reached</span>
                )}
              </div>
            </div>
          ))}
          {upcomingQuizzes.length === 0 && <p className="text-sm text-muted-foreground">No upcoming exams. 🎉</p>}
        </div>
      </Card>

      {/* Results Table */}
      <Card>
        <h3 className="font-display font-bold text-plum-dark text-lg mb-4">Recent Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="pb-3">Exam</th><th className="pb-3">Date</th><th className="pb-3">Score</th><th className="pb-3">Grade</th><th className="pb-3">Result</th>
              </tr>
            </thead>
            <tbody>
              {completedAttempts.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()).map(r => (
                <tr key={r.id} className="border-b border-border/60 last:border-0 hover:bg-secondary/40 transition-colors">
                  <td className="py-3.5 font-semibold text-plum-dark">
                    {r.quizTitle}
                    <div className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground mt-0.5">{r.classroomName}</div>
                  </td>
                  <td className="py-3.5 text-muted-foreground">
                    {r.submittedAt ? new Date(r.submittedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : ""}
                  </td>
                  <td className="py-3.5"><span className="font-mono font-bold">{r.score.percentage}%</span></td>
                  <td className="py-3.5"><span className={`text-xs font-bold px-2 py-0.5 rounded ${r.score.passed ? "bg-lime text-plum-dark" : "bg-red-100 text-red-700"}`}>{getGrade(r.score.percentage)}</span></td>
                  <td className="py-3.5">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${r.score.passed ? "bg-lime/20 text-plum-dark" : "bg-red-100 text-red-700"}`}>{r.score.passed ? "Passed" : "Failed"}</span>
                  </td>
                </tr>
              ))}
              {completedAttempts.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No results yet. Attempt an exam above!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 items-start">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <div className="font-semibold text-amber-900">Proctoring requirements</div>
          <div className="text-amber-800 mt-0.5">A working webcam and quiet room are required for all proctored exams. Test your setup 24h before the exam.</div>
        </div>
      </div>
    </div>
  );
}
