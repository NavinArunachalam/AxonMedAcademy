import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a3 as useClassroomStore } from "./_ssr/router-ayifv62t.mjs";
import { a4 as School, ao as Video, g as BookOpen, u as ClipboardList, an as Users, o as ChevronRight } from "./_libs/lucide-react.mjs";
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
function StudentClassrooms() {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const currentStudentId = currentUser?.id || "";
  const myClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === currentStudentId && s.status === "active"));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold text-plum-dark flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-8 w-8 text-plum" }),
        " My Classrooms"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mt-1", children: [
        myClassrooms.length,
        " classroom",
        myClassrooms.length !== 1 ? "s" : "",
        " enrolled"
      ] })
    ] }),
    myClassrooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-12 w-12 text-slate-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "You haven't been enrolled in any classrooms yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-xs mt-1", children: "Contact your admin to get started." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: myClassrooms.map((cls) => {
      const myInfo = cls.students.find((s) => s.id === currentStudentId);
      const publishedRecs = cls.recordings.filter((r) => r.isPublished).length;
      const publishedQuizzes = cls.quizzes.filter((q) => q.status === "published").length;
      const upcomingMeetings = cls.meetings.filter((m) => m.status === "scheduled" || m.status === "live").length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-plum/30 hover:shadow-md transition-all group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-gradient-to-r from-plum to-plum-dark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-base leading-snug", children: cls.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-slate-400", children: cls.code })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-plum-dark/10 text-plum-dark text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded shrink-0", children: cls.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4", children: cls.description }),
          myInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-3 rounded-xl bg-plum-dark/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 font-medium", children: "My Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-plum-dark font-bold font-mono", children: [
                myInfo.progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-slate-200 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum rounded-full transition-all", style: {
              width: `${myInfo.progress}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2 text-[10px] text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Attendance: ",
                myInfo.attendance,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Quiz avg: ",
                myInfo.quizAvg,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mb-4", children: [{
            icon: Video,
            val: upcomingMeetings,
            label: "Live"
          }, {
            icon: BookOpen,
            val: publishedRecs,
            label: "Videos"
          }, {
            icon: ClipboardList,
            val: publishedQuizzes,
            label: "Tests"
          }, {
            icon: Users,
            val: cls.students.filter((s) => s.status === "active").length,
            label: "Peers"
          }].map(({
            icon: Icon,
            val,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-lg p-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-plum mx-auto mb-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-plum-dark text-sm", children: val }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-slate-400 uppercase tracking-wider", children: label })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/classroom/$id", params: {
            id: cls.id
          }, className: "w-full flex items-center justify-center gap-1.5 rounded-full bg-plum-dark text-cream px-4 py-2.5 text-sm font-bold group-hover:bg-plum transition-colors", children: [
            "Open Classroom ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }, cls.id);
    }) })
  ] });
}
export {
  StudentClassrooms as component
};
