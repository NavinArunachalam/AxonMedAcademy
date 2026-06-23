import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-BCQQR-1h.mjs";
import { am as useClassroomStore } from "./_ssr/router-BxYk19q2.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { an as Users, g as BookOpen, ai as TrendingUp, v as Clock, f as Award, aj as TriangleAlert } from "./_libs/lucide-react.mjs";
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
function Analytics() {
  const {
    classrooms,
    courses
  } = useClassroomStore();
  const stats = reactExports.useMemo(() => {
    const allStudents = classrooms.flatMap((c) => c.students.filter((s) => s.status === "active"));
    const uniqueStudentIds = new Set(allStudents.map((s) => s.id));
    const totalStudents = uniqueStudentIds.size;
    const totalClassrooms = classrooms.filter((c) => c.status === "active").length;
    const avgProgress = allStudents.length ? Math.round(allStudents.reduce((s, st) => s + st.progress, 0) / allStudents.length) : 0;
    const totalWatchSeconds = classrooms.reduce((s, c) => s + c.recordings.reduce((ss, r) => ss + r.viewStats.reduce((sss, vs) => sss + vs.watchedPercent / 100 * r.duration, 0), 0), 0);
    const totalHours = Math.round(totalWatchSeconds / 3600);
    const allAttempts = classrooms.flatMap((c) => c.quizzes.flatMap((q) => q.attempts.filter((a) => a.status === "submitted")));
    const passAttempts = allAttempts.filter((a) => a.score.passed).length;
    const failAttempts = allAttempts.length - passAttempts;
    const avgQuizScore = allAttempts.length ? Math.round(allAttempts.reduce((s, a) => s + a.score.percentage, 0) / allAttempts.length) : 0;
    const completionRates = classrooms.map((c) => {
      const avgProg = c.students.length > 0 ? Math.round(c.students.reduce((s, st) => s + st.progress, 0) / c.students.length) : 0;
      return {
        name: c.name,
        prog: avgProg,
        program: c.program,
        count: c.students.filter((s) => s.status === "active").length
      };
    });
    const studentPerf = {};
    classrooms.forEach((c) => {
      c.students.forEach((st) => {
        if (!studentPerf[st.id]) studentPerf[st.id] = {
          name: st.name,
          scores: [],
          progress: []
        };
        studentPerf[st.id].progress.push(st.progress);
        if (st.quizAvg > 0) studentPerf[st.id].scores.push(st.quizAvg);
      });
      c.quizzes.forEach((q) => q.attempts.filter((a) => a.status === "submitted").forEach((a) => {
        if (studentPerf[a.studentId]) studentPerf[a.studentId].scores.push(a.score.percentage);
      }));
    });
    const topPerformers = Object.entries(studentPerf).map(([id, d]) => ({
      id,
      name: d.name,
      avgScore: d.scores.length ? Math.round(d.scores.reduce((s, x) => s + x, 0) / d.scores.length) : 0,
      avgProgress: d.progress.length ? Math.round(d.progress.reduce((s, x) => s + x, 0) / d.progress.length) : 0
    })).sort((a, b) => b.avgScore - a.avgScore).slice(0, 5);
    const atRisk = classrooms.flatMap((c) => c.students.filter((s) => s.status === "at risk" || s.status === "active" && s.progress < 30).map((s) => ({
      ...s,
      program: c.program,
      classroom: c.name
    })));
    const monthlyRev = {};
    classrooms.forEach((c) => {
      const course = courses.find((x) => x.title === c.program);
      const price = course?.price || 0;
      c.students.forEach((s) => {
        const month = new Date(s.addedAt).toLocaleDateString("en-IN", {
          year: "2-digit",
          month: "short"
        });
        monthlyRev[month] = (monthlyRev[month] || 0) + price;
      });
    });
    const monthKeys = Object.keys(monthlyRev).slice(-6);
    const maxRev = Math.max(...monthKeys.map((m) => monthlyRev[m]), 1);
    const recEngagement = classrooms.flatMap((c) => c.recordings.filter((r) => r.isPublished && r.viewStats.length > 0).map((r) => ({
      title: r.title,
      classroom: c.name,
      avgWatch: Math.round(r.viewStats.reduce((s, v) => s + v.watchedPercent, 0) / r.viewStats.length),
      viewers: r.viewStats.length
    }))).sort((a, b) => b.avgWatch - a.avgWatch);
    return {
      totalStudents,
      totalClassrooms,
      avgProgress,
      totalHours,
      allAttempts,
      passAttempts,
      failAttempts,
      avgQuizScore,
      completionRates,
      topPerformers,
      atRisk,
      monthKeys,
      monthlyRev,
      maxRev,
      recEngagement
    };
  }, [classrooms, courses]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Cohort performance, engagement, and outcomes — all real-time" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [{
      l: "Total Students",
      v: stats.totalStudents,
      icon: Users,
      color: "text-lime"
    }, {
      l: "Active Classrooms",
      v: stats.totalClassrooms,
      icon: BookOpen,
      color: "text-lime"
    }, {
      l: "Avg Progress",
      v: `${stats.avgProgress}%`,
      icon: TrendingUp,
      color: "text-lime"
    }, {
      l: "Total Hours Watched",
      v: `${stats.totalHours}h`,
      icon: Clock,
      color: "text-lime"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-5 w-5 ${s.color}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold", children: s.v })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-5", children: "Classroom Completion Rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          stats.completionRates.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/50", children: "No data available." }),
          stats.completionRates.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xs truncate max-w-[200px] block", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/50", children: [
                  r.count,
                  " students"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lime font-bold", children: [
                r.prog,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-plum-light to-lime rounded-full transition-all", style: {
              width: `${r.prog}%`
            } }) })
          ] }, r.name))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-5", children: "Quiz Performance Overview" }),
        stats.allAttempts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-40 w-40 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full", style: {
              background: `conic-gradient(#C5F542 0 ${stats.passAttempts / stats.allAttempts.length * 100}%, #f87171 ${stats.passAttempts / stats.allAttempts.length * 100}% 100%)`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-full bg-[#1A0F33] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl font-bold", children: [
                stats.avgQuizScore,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Avg Score" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded bg-lime shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Passed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lime font-bold", children: stats.passAttempts })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded bg-red-400 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-red-400 font-bold", children: stats.failAttempts })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-cream/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/60", children: "Total Submissions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold", children: stats.allAttempts.length })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No quiz submissions yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-5", children: "Monthly Revenue (Enrollment-based)" }),
      stats.monthKeys.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-3 h-48", children: stats.monthKeys.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-cream/60", children: [
          "₹",
          Math.round(stats.monthlyRev[m] / 1e3),
          "K"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t bg-gradient-to-t from-lime/60 to-lime transition-all", style: {
          height: `${stats.monthlyRev[m] / stats.maxRev * 100}%`,
          minHeight: "4px"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-cream/50 font-mono", children: m })
      ] }, m)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No enrollment data yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-lime" }),
          " Top Performers"
        ] }),
        stats.topPerformers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No quiz data yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.topPerformers.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-cream/5 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-7 w-7 place-items-center rounded-full font-bold text-xs shrink-0 ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-gray-400 text-gray-900" : i === 2 ? "bg-orange-400 text-orange-900" : "bg-cream/10 text-cream"}`, children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream font-semibold text-sm", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/50 text-xs", children: [
              "Progress: ",
              s.avgProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-sm font-bold ${s.avgScore >= 90 ? "text-lime" : s.avgScore >= 60 ? "text-yellow-300" : "text-red-400"}`, children: [
            s.avgScore,
            "%"
          ] })
        ] }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400" }),
          " At-Risk Students"
        ] }),
        stats.atRisk.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-2", children: "✅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm", children: "No at-risk students! Great performance." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: stats.atRisk.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-red-500/5 border border-red-500/20 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-full bg-red-500/20 text-red-300 text-xs font-bold shrink-0", children: s.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream font-semibold text-sm", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/50 text-xs", children: s.program })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-400 font-mono text-sm font-bold", children: [
              s.progress,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/40 text-[10px]", children: "progress" })
          ] })
        ] }, s.id + s.program)) })
      ] })
    ] }),
    stats.recEngagement.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-4", children: "Recording Engagement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: stats.recEngagement.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream font-semibold text-xs", children: r.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/50 text-[10px] block", children: [
              r.classroom,
              " · ",
              r.viewers,
              " viewer",
              r.viewers !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-sm font-bold ${r.avgWatch >= 80 ? "text-lime" : r.avgWatch >= 50 ? "text-yellow-300" : "text-red-400"}`, children: [
            r.avgWatch,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full transition-all ${r.avgWatch >= 80 ? "bg-lime" : r.avgWatch >= 50 ? "bg-yellow-400" : "bg-red-400"}`, style: {
          width: `${r.avgWatch}%`
        } }) })
      ] }, r.title)) })
    ] })
  ] });
}
export {
  Analytics as component
};
