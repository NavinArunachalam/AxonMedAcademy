import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card } from "./_ssr/PortalShell-DpJHKv_h.mjs";
import { ak as useClassroomStore, L as getGrade, a8 as saveQuizAnswer, ab as submitQuizAttempt, S as getQuizAttemptResult, G as getClassroomById, i as classroomActions, z as formatTime, aa as startQuizAttempt } from "./_ssr/router-DSLNBAbv.mjs";
import { r as CircleCheck, u as ClipboardList, v as Clock, q as CircleAlert, aq as X, n as ChevronLeft, o as ChevronRight, al as Trophy, l as Check } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
function QuizModal({
  quiz,
  classroomId,
  reviewAttemptId,
  onClose
}) {
  const [phase, setPhase] = reactExports.useState(reviewAttemptId ? "result" : "intro");
  const [examQuestions, setExamQuestions] = reactExports.useState([]);
  const [attemptId, setAttemptId] = reactExports.useState(null);
  const [qIdx, setQIdx] = reactExports.useState(0);
  const [selected, setSelected] = reactExports.useState({});
  const [timeLeft, setTimeLeft] = reactExports.useState((quiz.duration || 0) * 60);
  const [result, setResult] = reactExports.useState(null);
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const selectedRef = reactExports.useRef(selected);
  const submitRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  reactExports.useEffect(() => {
    if (reviewAttemptId) {
      const loadReview = async () => {
        setError("");
        try {
          const review = await getQuizAttemptResult(quiz.id, reviewAttemptId);
          setResult(review);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not load quiz review");
        }
      };
      void loadReview();
    }
  }, [reviewAttemptId, quiz.id]);
  const handleSubmit = reactExports.useCallback(async () => {
    if (!attemptId || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      const currentSelected = selectedRef.current;
      await Promise.all(examQuestions.map((q2) => saveQuizAnswer(quiz.id, {
        attemptId,
        questionId: q2.id,
        selectedOptions: currentSelected[q2.id] || []
      })));
      await submitQuizAttempt(quiz.id, attemptId);
      const review = await getQuizAttemptResult(quiz.id, attemptId);
      setResult(review);
      const refreshed = await getClassroomById(classroomId);
      classroomActions.updateClassroom(classroomId, refreshed);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit exam");
    } finally {
      setIsSubmitting(false);
    }
  }, [attemptId, classroomId, examQuestions, isSubmitting, quiz.id]);
  reactExports.useEffect(() => {
    submitRef.current = () => {
      void handleSubmit();
    };
  }, [handleSubmit]);
  const beginTaking = async () => {
    if (isStarting) return;
    setError("");
    setIsStarting(true);
    try {
      const started = await startQuizAttempt(quiz.id);
      setAttemptId(started.attemptId);
      setExamQuestions(started.questions);
      setSelected({});
      setQIdx(0);
      setTimeLeft((started.duration || quiz.duration || 0) * 60);
      setPhase("taking");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start exam");
    } finally {
      setIsStarting(false);
    }
  };
  reactExports.useEffect(() => {
    if (phase !== "taking" || !quiz.duration) return;
    if (timeLeft <= 0) {
      submitRef.current();
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1e3);
    return () => clearInterval(t);
  }, [phase, timeLeft, quiz.duration]);
  const handleSelect = (qId, optLabel, isMulti2) => {
    setSelected((prev) => {
      const cur = prev[qId] || [];
      if (isMulti2) {
        return {
          ...prev,
          [qId]: cur.includes(optLabel) ? cur.filter((x) => x !== optLabel) : [...cur, optLabel]
        };
      }
      return {
        ...prev,
        [qId]: [optLabel]
      };
    });
  };
  const q = examQuestions[qIdx];
  const isMulti = q?.type === "msq";
  const sel = selected[q?.id] || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl", children: [
    phase === "intro" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-2xl bg-plum-dark text-lime mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-plum-dark", children: quiz.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm mt-2 max-w-md mx-auto", children: quiz.instructions }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-4", children: [{
        l: "Questions",
        v: quiz.questions.length
      }, {
        l: "Duration",
        v: quiz.duration ? `${quiz.duration} min` : "No limit"
      }, {
        l: "Pass Mark",
        v: `${quiz.passPercent}%`
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-2xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-plum-dark", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400", children: s.l })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 text-left flex gap-2 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Do not refresh or close this window during the exam. Your progress will be lost." })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-left", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 rounded-full bg-slate-100 text-slate-600 py-3 font-semibold", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: beginTaking, disabled: isStarting, className: "flex-1 rounded-full bg-plum-dark text-cream py-3 font-bold disabled:opacity-50", children: isStarting ? "Starting…" : "Start Exam →" })
      ] })
    ] }),
    phase === "taking" && q && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-slate-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs uppercase tracking-widest text-slate-400", children: [
            "Question ",
            qIdx + 1,
            " of ",
            examQuestions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark text-sm mt-0.5", children: quiz.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          quiz.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-mono font-bold ${timeLeft < 120 ? "bg-red-100 text-red-600" : "bg-plum-dark/10 text-plum-dark"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
            " ",
            formatTime(timeLeft)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum transition-all", style: {
        width: `${(qIdx + 1) / examQuestions.length * 100}%`
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-plum-dark text-cream text-xs font-bold rounded-full h-6 w-6 grid place-items-center shrink-0 mt-0.5", children: qIdx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-plum-dark font-semibold text-base leading-relaxed", children: q.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-1", children: [
              q.marks,
              " mark",
              q.marks !== 1 ? "s" : "",
              " ·",
              " ",
              q.type === "mcq" ? "Single choice" : q.type === "msq" ? "Multiple correct answers" : "True / False"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: q.options.map((opt) => {
          const isSelected = sel.includes(opt.label);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSelect(q.id, opt.label, isMulti), className: `w-full flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${isSelected ? "border-plum bg-plum-dark/5" : "border-slate-200 hover:border-plum/40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-6 w-6 place-items-center rounded-full border-2 text-xs font-bold shrink-0 transition-colors ${isSelected ? "border-plum bg-plum-dark text-cream" : "border-slate-300 text-slate-500"}`, children: isMulti ? isSelected ? "✓" : opt.label : opt.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-700", children: opt.text })
          ] }, opt.label);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: qIdx === 0, onClick: () => setQIdx((i) => i - 1), className: "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 disabled:opacity-40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
            " Previous"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: examQuestions.map((eq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQIdx(i), className: `h-2 w-2 rounded-full transition-all ${i === qIdx ? "bg-plum-dark w-5" : selected[eq.id]?.length ? "bg-plum/50" : "bg-slate-300"}` }, i)) }),
          qIdx < examQuestions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setQIdx((i) => i + 1), className: "flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-cream bg-plum-dark", children: [
            "Next ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void handleSubmit(), disabled: isSubmitting, className: "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-plum-dark bg-lime disabled:opacity-50", children: isSubmitting ? "Submitting…" : "Submit Exam ✓" })
        ] })
      ] })
    ] }),
    phase === "result" && result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-20 w-20 place-items-center rounded-3xl mx-auto mb-4 ${result.score.passed ? "bg-lime text-plum-dark" : "bg-red-500/10 text-red-500"}`, children: result.score.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `font-display text-3xl font-bold ${result.score.passed ? "text-plum-dark" : "text-red-600"}`, children: result.score.passed ? "You Passed! 🎉" : "Not Passed" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm mt-2", children: quiz.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-4", children: [{
        l: "Score",
        v: `${result.score.rawMarks}/${result.score.totalMarks}`
      }, {
        l: "Percentage",
        v: `${result.score.percentage}%`
      }, {
        l: "Grade",
        v: getGrade(result.score.percentage)
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-4 ${result.score.passed ? "bg-lime/10" : "bg-red-50"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-2xl font-bold ${result.score.passed ? "text-plum-dark" : "text-red-600"}`, children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-1", children: s.l })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-4 text-sm font-semibold ${result.score.passed ? "text-lime-700" : "text-red-600"}`, children: result.score.passed ? `Great work! You scored above the ${quiz.passPercent}% pass mark.` : `You needed ${quiz.passPercent}% to pass. Keep practicing!` }),
      result.answers && result.answers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-6 text-left pr-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark", children: "Answer Review" }),
        result.answers.map((myAns, i) => {
          const quizQ = quiz.questions.find((q2) => q2.id === myAns.questionId) || quiz.questions.find((q2) => q2.text === myAns.questionText) || quiz.questions[i];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${myAns.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${myAns.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}`, children: myAns.isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-800 text-sm font-semibold flex-1", children: [
                "Q",
                i + 1,
                ". ",
                myAns.questionText || quizQ?.text || ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-500 shrink-0", children: [
                "+",
                myAns.marksAwarded,
                " marks"
              ] })
            ] }),
            quizQ && quizQ.options && quizQ.options.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-8 space-y-1.5 mb-3", children: quizQ.options.map((opt) => {
              const isSelected = myAns.selectedOptions.includes(opt.label);
              const isCorrectOpt = myAns.correctOptions.includes(opt.label);
              let optClass = "border-slate-200 bg-white text-slate-600";
              if (isCorrectOpt && isSelected) optClass = "border-green-500 bg-green-100 text-green-800 font-semibold";
              else if (isCorrectOpt) optClass = "border-green-400 bg-green-50 text-green-700 font-semibold";
              else if (isSelected) optClass = "border-red-400 bg-red-100 text-red-700";
              let badge = null;
              if (isCorrectOpt && isSelected) badge = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-green-600 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap", children: "✓ Your answer (Correct)" });
              else if (isCorrectOpt) badge = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-green-600 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap", children: "✓ Correct Answer" });
              else if (isSelected) badge = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-red-500 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap", children: "✗ Your answer (Wrong)" });
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${optClass}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-5 w-5 shrink-0 grid place-items-center rounded-full text-[10px] font-bold border ${isCorrectOpt ? "bg-green-500 border-green-500 text-white" : isSelected ? "bg-red-400 border-red-400 text-white" : "border-slate-300 text-slate-400"}`, children: isCorrectOpt ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) : opt.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.text }),
                badge
              ] }, opt.label);
            }) }),
            myAns.explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 ml-8 mt-1 italic", children: [
              "💡 ",
              myAns.explanation
            ] })
          ] }, myAns.questionId || i);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "mt-6 w-full rounded-full bg-plum-dark text-cream py-3 font-bold", children: "Close" })
    ] })
  ] }) });
}
function Exams() {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const studentName = currentUser?.name || "";
  const [activeQuiz, setActiveQuiz] = reactExports.useState(null);
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const allQuizzes = enrolledClassrooms.flatMap((c) => c.quizzes.filter((q) => q.status === "published").map((q) => ({
    ...q,
    classroomName: c.name,
    classroomId: c.id
  })));
  const upcomingQuizzes = allQuizzes.filter((q) => !q.attempts.some((a) => a.studentId === studentId && a.status === "submitted"));
  const completedAttempts = allQuizzes.flatMap((q) => q.attempts.filter((a) => a.studentId === studentId && a.status === "submitted").map((a) => ({
    ...a,
    quizTitle: q.title,
    classroomName: q.classroomName
  })));
  const avgScore = completedAttempts.length ? Math.round(completedAttempts.reduce((s, a) => s + a.score.percentage, 0) / completedAttempts.length) : 0;
  const canAttempt = (q) => {
    const prevAttempts = q.attempts.filter((a) => a.studentId === studentId);
    return prevAttempts.length < q.maxAttempts;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    activeQuiz && /* @__PURE__ */ jsxRuntimeExports.jsx(QuizModal, { quiz: activeQuiz.quiz, classroomId: activeQuiz.classroomId, studentId, studentName, onClose: () => setActiveQuiz(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-plum-dark", children: "Exams & Assessments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Proctored finals, mock tests and practice quizzes" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: [{
      k: "Average Score",
      v: `${avgScore}%`,
      icon: CircleCheck
    }, {
      k: "Exams Taken",
      v: completedAttempts.length.toString(),
      icon: ClipboardList
    }, {
      k: "Upcoming",
      v: upcomingQuizzes.length.toString(),
      icon: Clock
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: s.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-plum-dark", children: s.v })
      ] })
    ] }, s.k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg", children: "Upcoming Exams" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        upcomingQuizzes.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-plum-dark text-lime shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
              new Date(e.availableFrom).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric"
              }),
              e.duration ? ` · ${e.duration} min` : "",
              e.questions.length ? ` · ${e.questions.length} questions` : "",
              ` · Pass: ${e.passPercent}%`
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-plum-dark/60 mt-1", children: e.classroomName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest bg-lime text-plum-dark px-2.5 py-1 rounded-full font-bold", children: "Pending" }),
            canAttempt(e) ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveQuiz({
              quiz: e,
              classroomId: e.classroomId
            }), className: "rounded-full bg-plum-dark text-cream text-xs font-semibold px-4 py-2 hover:bg-plum transition-colors", children: "Start Exam" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground rounded-full border border-border px-4 py-2", children: "Max attempts reached" })
          ] })
        ] }, e.id)),
        upcomingQuizzes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No upcoming exams. 🎉" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg mb-4", children: "Recent Results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Exam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Grade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Result" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          completedAttempts.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime()).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 last:border-0 hover:bg-secondary/40 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 font-semibold text-plum-dark", children: [
              r.quizTitle,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-normal uppercase tracking-widest text-muted-foreground mt-0.5", children: r.classroomName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-muted-foreground", children: r.submittedAt ? new Date(r.submittedAt).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric"
            }) : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold", children: [
              r.score.percentage,
              "%"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold px-2 py-0.5 rounded ${r.score.passed ? "bg-lime text-plum-dark" : "bg-red-100 text-red-700"}`, children: getGrade(r.score.percentage) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${r.score.passed ? "bg-lime/20 text-plum-dark" : "bg-red-100 text-red-700"}`, children: r.score.passed ? "Passed" : "Failed" }) })
          ] }, r.id)),
          completedAttempts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-8 text-center text-muted-foreground", children: "No results yet. Attempt an exam above!" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 text-amber-600 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-amber-900", children: "Proctoring requirements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-amber-800 mt-0.5", children: "A working webcam and quiet room are required for all proctored exams. Test your setup 24h before the exam." })
      ] })
    ] })
  ] });
}
export {
  Exams as component
};
