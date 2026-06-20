import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { C as Card } from "./_ssr/PortalShell-B5wQZJyj.mjs";
import { am as useClassroomStore } from "./_ssr/router-BgLlorBt.mjs";
import { g as BookOpen, o as ChevronRight, ao as Video, v as Clock, s as CirclePlay, u as ClipboardList } from "./_libs/lucide-react.mjs";
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
function MyCourses() {
  const {
    classrooms,
    courses,
    currentUser
  } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const myCourses = enrolledClassrooms.map((cls) => {
    const me = cls.students.find((s) => s.id === studentId);
    const course = courses.find((c) => c.title === cls.program);
    const publishedRecs = cls.recordings.filter((r) => r.isPublished);
    const watchedRecs = publishedRecs.filter((r) => r.viewStats.some((v) => v.studentId === studentId && v.watchedPercent > 0));
    const totalWatchedSec = publishedRecs.reduce((s, r) => {
      const vs = r.viewStats.find((v) => v.studentId === studentId);
      return s + (vs ? vs.watchedPercent / 100 * r.duration : 0);
    }, 0);
    const upcomingLive = cls.meetings.filter((m) => m.status === "scheduled" || m.status === "live").length;
    const totalQuizzes = cls.quizzes.filter((q) => q.status === "published").length;
    const completedQuizzes = cls.quizzes.filter((q) => q.status === "published" && q.attempts.some((a) => a.studentId === studentId && a.status === "submitted")).length;
    return {
      cls,
      me,
      course,
      publishedRecs,
      watchedRecs,
      totalWatchedSec,
      upcomingLive,
      totalQuizzes,
      completedQuizzes
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-plum-dark flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-plum" }),
        " My Courses"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mt-1", children: [
        myCourses.length,
        " course",
        myCourses.length !== 1 ? "s" : "",
        " enrolled"
      ] })
    ] }),
    myCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-slate-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "You haven't been enrolled in any courses yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mt-1", children: "Contact your admin to get started." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: myCourses.map(({
      cls,
      me,
      course,
      publishedRecs,
      watchedRecs,
      totalWatchedSec,
      upcomingLive,
      totalQuizzes,
      completedQuizzes
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gradient-to-r from-plum to-plum-dark" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-plum-dark", children: cls.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-plum-dark/10 text-plum-dark text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded", children: cls.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm mt-1", children: cls.program }),
            course?.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mt-1.5 max-w-xl", children: course.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/classroom/$id", params: {
            id: cls.id
          }, className: "inline-flex items-center gap-2 rounded-full bg-plum-dark text-cream px-5 py-2.5 text-sm font-bold hover:bg-plum transition-colors shrink-0", children: [
            "Continue Learning ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 p-4 rounded-2xl bg-plum-dark/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-plum-dark", children: "Overall Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-plum-dark font-bold", children: [
              me.progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 bg-slate-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum rounded-full transition-all", style: {
            width: `${me.progress}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-3 text-xs text-slate-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Attendance: ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-plum-dark", children: [
                me.attendance,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Quiz Avg: ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-plum-dark", children: [
                me.quizAvg,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Enrollment: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-plum-dark", children: me.enrollmentId })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4", children: [{
          icon: Video,
          label: "Videos",
          val: `${watchedRecs.length}/${publishedRecs.length}`,
          sub: "watched"
        }, {
          icon: Clock,
          label: "Hours",
          val: `${Math.round(totalWatchedSec / 3600)}h`,
          sub: "watched"
        }, {
          icon: CirclePlay,
          label: "Live",
          val: upcomingLive,
          sub: "upcoming"
        }, {
          icon: ClipboardList,
          label: "Quizzes",
          val: `${completedQuizzes}/${totalQuizzes}`,
          sub: "done"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 text-plum mx-auto mb-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-plum-dark", children: s.val }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 uppercase tracking-wider", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-slate-400", children: s.sub })
        ] }, s.label)) }),
        publishedRecs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-plum-dark mb-3", children: "Course Recordings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            publishedRecs.slice(0, 3).map((r) => {
              const vs = r.viewStats.find((v) => v.studentId === studentId);
              const pct = vs?.watchedPercent || 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-plum/20 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-plum-dark/10 text-plum shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: r.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400", children: [
                    Math.floor(r.duration / 60),
                    "m · ",
                    r.chapters.length,
                    " chapters"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1 w-full rounded-full bg-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum rounded-full", style: {
                    width: `${pct}%`
                  } }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-plum-dark shrink-0", children: [
                  pct,
                  "%"
                ] })
              ] }, r.id);
            }),
            publishedRecs.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/classroom/$id", params: {
              id: cls.id
            }, className: "text-xs font-semibold text-plum flex items-center gap-1 hover:text-plum-dark", children: [
              "View all ",
              publishedRecs.length,
              " recordings ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
            ] })
          ] })
        ] }),
        course && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-plum-dark", children: course.category }),
            " · Code: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: cls.code })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-plum-dark", children: [
            "₹",
            course.price.toLocaleString("en-IN")
          ] })
        ] })
      ] })
    ] }, cls.id)) })
  ] });
}
export {
  MyCourses as component
};
