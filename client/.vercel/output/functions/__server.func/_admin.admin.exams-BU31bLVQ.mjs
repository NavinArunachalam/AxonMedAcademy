import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-BbXObVDa.mjs";
import { ar as useClassroomStore, P as getExamType, Q as getGrade, a6 as publishQuiz, k as classroomActions, m as closeQuiz } from "./_ssr/router-CFicUlxS.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { d as ArrowLeft, m as ChartNoAxesColumn, h as BookOpen, x as ClipboardList, s as CircleAlert, as as Users, t as CircleCheck } from "./_libs/lucide-react.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
function AdminExams() {
  const {
    classrooms
  } = useClassroomStore();
  const [viewQuizId, setViewQuizId] = reactExports.useState(null);
  const [batchFilter, setBatchFilter] = reactExports.useState("All");
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [isUpdatingQuiz, setIsUpdatingQuiz] = reactExports.useState(null);
  const allQuizzes = reactExports.useMemo(() => {
    return classrooms.flatMap((c) => c.quizzes.map((q) => ({
      ...q,
      classroomName: c.name,
      classroomId: c.id,
      course: c.program,
      batch: c.name.split("—")[1]?.trim() || "N/A",
      studentsCount: c.students.filter((s) => s.status === "active").length,
      students: c.students.filter((s) => s.status === "active"),
      examType: getExamType(q.questions)
    }))).sort((a, b) => new Date(b.availableFrom).getTime() - new Date(a.availableFrom).getTime());
  }, [classrooms]);
  const batches = ["All", ...Array.from(new Set(allQuizzes.map((q) => q.batch)))];
  const statuses = ["All", "draft", "published", "closed"];
  const filtered = allQuizzes.filter((q) => {
    if (batchFilter !== "All" && q.batch !== batchFilter) return false;
    if (statusFilter !== "All" && q.status !== statusFilter) return false;
    return true;
  });
  if (viewQuizId) {
    const q = allQuizzes.find((x) => x.id === viewQuizId);
    if (!q) return null;
    const submitted = q.attempts.filter((a) => a.status === "submitted");
    const submittedIds = new Set(submitted.map((a) => a.studentId));
    const absent = q.students.filter((s) => !submittedIds.has(s.id));
    const passCount = submitted.filter((a) => a.score.passed).length;
    const failCount = submitted.length - passCount;
    const passRate2 = submitted.length ? Math.round(passCount / submitted.length * 100) : 0;
    const avgScore2 = submitted.length ? Math.round(submitted.reduce((s, a) => s + a.score.percentage, 0) / submitted.length) : 0;
    const gradeDist = ["A+", "A", "B+", "B", "C", "F"].map((g) => ({
      grade: g,
      count: submitted.filter((a) => getGrade(a.score.percentage) === g).length
    }));
    const maxGradeCount = Math.max(...gradeDist.map((d) => d.count), 1);
    const questionStats = q.questions.map((ques) => {
      const correct = submitted.filter((att) => {
        const ans = (att.answers || []).find((a) => a.questionId === ques.id);
        return ans?.isCorrect;
      }).length;
      return {
        ...ques,
        correctCount: correct,
        total: submitted.length,
        pct: submitted.length ? Math.round(correct / submitted.length * 100) : 0
      };
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewQuizId(null), className: "text-cream/60 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-cream text-2xl", children: q.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm mt-0.5", children: [
            q.course,
            " · ",
            q.classroomName,
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime", children: q.examType }),
            " · ",
            q.questions.length,
            " questions"
          ] })
        ] }),
        q.status === "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          setIsUpdatingQuiz(q.id);
          try {
            await publishQuiz(q.id);
            classroomActions.updateQuizStatus(q.classroomId, q.id, "published");
            setViewQuizId(null);
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "Failed to re-open exam";
            console.error("[Quiz Reopen Error]", errorMsg, error);
            alert(`Error: ${errorMsg}`);
          } finally {
            setIsUpdatingQuiz(null);
          }
        }, disabled: isUpdatingQuiz === q.id, className: "rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold disabled:opacity-50", children: isUpdatingQuiz === q.id ? "Reopening..." : "Re-open Exam" }),
        q.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
          setIsUpdatingQuiz(q.id);
          try {
            await closeQuiz(q.id);
            classroomActions.updateQuizStatus(q.classroomId, q.id, "closed");
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "Failed to close exam";
            console.error("[Quiz Close Error]", errorMsg, error);
            alert(`Error: ${errorMsg}`);
          } finally {
            setIsUpdatingQuiz(null);
          }
        }, disabled: isUpdatingQuiz === q.id, className: "rounded-full bg-cream/10 text-cream px-4 py-2 text-xs font-semibold disabled:opacity-50", children: isUpdatingQuiz === q.id ? "Closing..." : "Close Exam" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [{
        l: "Eligible",
        v: q.studentsCount
      }, {
        l: "Attended",
        v: submitted.length
      }, {
        l: "Absent",
        v: absent.length
      }, {
        l: "Pass Rate",
        v: `${passRate2}%`
      }, {
        l: "Avg Score",
        v: `${avgScore2}%`
      }, {
        l: "Passed",
        v: passCount
      }, {
        l: "Failed",
        v: failCount
      }, {
        l: "Avg Time",
        v: q.duration ? `${q.duration}m` : "No limit"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-cream mt-1", children: s.v })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "h-4 w-4 text-lime" }),
          " Grade Distribution"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-32", children: gradeDist.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-cream/60", children: d.count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full rounded-t transition-all ${d.grade === "F" ? "bg-red-400/60" : d.grade === "A+" ? "bg-lime" : "bg-lime/50"}`, style: {
            height: `${d.count / maxGradeCount * 100}%`,
            minHeight: d.count > 0 ? "4px" : "0"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-cream/80", children: d.grade })
        ] }, d.grade)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "p-4 border-b border-cream/10 font-display font-bold", children: [
            "✅ Attended Students (",
            submitted.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-cream/60 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Grade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Result" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              submitted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-cream/50 text-sm", children: "No submissions yet." }) }),
              submitted.sort((a, b) => b.score.percentage - a.score.percentage).map((att) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-cream", children: att.studentName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80", children: [
                  att.score.rawMarks,
                  "/",
                  att.score.totalMarks
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80", children: [
                  att.score.percentage,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-mono text-cream font-bold", children: getGrade(att.score.percentage) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${att.score.passed ? "bg-lime/20 text-lime" : "bg-red-500/20 text-red-300"}`, children: att.score.passed ? "Pass" : "Fail" }) })
              ] }, att.id))
            ] })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "p-4 border-b border-cream/10 font-display font-bold", children: [
            "⏳ Absent Students (",
            absent.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto max-h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5 sticky top-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-cream/60 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Enrollment ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              absent.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-6 text-center text-cream/50 text-sm", children: "100% attendance! 🎉" }) }),
              absent.map((ab) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-cream", children: ab.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-mono text-cream/70 text-xs", children: ab.enrollmentId }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-yellow-500/20 text-yellow-300", children: "Not Attempted" }) })
              ] }, ab.id))
            ] })
          ] }) })
        ] })
      ] }),
      questionStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-lime" }),
          " Question-wise Analysis"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: questionStats.map((qs, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-lime font-bold uppercase tracking-widest mr-2", children: [
                "Q",
                i + 1,
                " · ",
                qs.type.toUpperCase(),
                " · ",
                qs.marks,
                "m"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 text-sm", children: qs.text })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-bold shrink-0 ${qs.pct >= 60 ? "text-lime" : "text-red-400"}`, children: [
              qs.pct,
              "% correct"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${qs.pct >= 60 ? "bg-lime" : "bg-red-400"}`, style: {
            width: `${qs.pct}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-cream/50 mt-1", children: [
            qs.correctCount,
            " of ",
            qs.total,
            " students answered correctly"
          ] })
        ] }, qs.id)) })
      ] })
    ] });
  }
  const activeQuizzes = allQuizzes.filter((q) => q.status === "published").length;
  const allAttempts = allQuizzes.flatMap((q) => q.attempts);
  const gradedAttempts = allAttempts.filter((a) => a.status === "submitted");
  const avgScore = gradedAttempts.length ? Math.round(gradedAttempts.reduce((s, a) => s + a.score.percentage, 0) / gradedAttempts.length) : 0;
  const passRate = gradedAttempts.length ? Math.round(gradedAttempts.filter((a) => a.score.passed).length / gradedAttempts.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Exams" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Schedule, proctor and grade assessments across classrooms" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-4", children: [{
      l: "Total Exams",
      v: allQuizzes.length,
      i: ClipboardList
    }, {
      l: "Published",
      v: activeQuizzes,
      i: CircleAlert
    }, {
      l: "Submissions",
      v: gradedAttempts.length,
      i: Users
    }, {
      l: "Avg Score",
      v: `${avgScore}%`,
      i: CircleCheck
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime/15 text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.i, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold", children: s.v })
      ] })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: batchFilter, onChange: (e) => setBatchFilter(e.target.value), className: "bg-[#1A0F45] border border-cream/10 rounded-full px-4 py-2 text-sm text-cream outline-none", children: batches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b === "All" ? "All Batches" : b }, b)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-[#1A0F45] border border-cream/10 rounded-full px-4 py-2 text-sm text-cream outline-none", children: statuses.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "capitalize", children: s === "All" ? "All Statuses" : s }, s)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-cream/10 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold", children: [
          "All Exam Assessments (",
          filtered.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-cream/60", children: [
          "Overall pass rate: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime font-bold", children: [
            passRate,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Exam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Course / Batch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "text-center py-12 text-cream/50", children: "No exams found." }) }),
          filtered.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5 cursor-pointer", onClick: () => setViewQuizId(q.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: q.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/50 text-[10px] mt-0.5", children: [
                q.questions.length,
                " questions · ",
                q.attempts.length,
                " attempts"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-cream/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: q.course }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/50", children: q.batch })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/70 text-xs", children: new Date(q.availableFrom).toLocaleDateString("en-IN", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-mono text-xs", children: q.duration ? `${q.duration}m` : "No limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-xs text-cream/70", children: q.examType }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono", children: [
              q.attempts.filter((a) => a.status === "submitted").length,
              " / ",
              q.studentsCount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded capitalize ${q.status === "published" ? "bg-lime/20 text-lime" : q.status === "closed" ? "bg-red-500/20 text-red-300" : "bg-cream/10 text-cream/70"}`, children: q.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
              e.stopPropagation();
              setViewQuizId(q.id);
            }, className: "text-xs text-lime font-bold rounded-full bg-lime/10 px-3 py-1.5 hover:bg-lime/20 transition-colors", children: "Details →" }) })
          ] }, q.id))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminExams as component
};
