import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { b as Route$4 } from "./_ssr/router-C0aDfAXV.mjs";
import { n as ChevronLeft, $ as Play, F as FileText, D as Download, U as MessageSquare, r as CircleCheck, N as Lock } from "./_libs/lucide-react.mjs";
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
const MODULES = [{
  t: "Foundations of Patient Care",
  done: true,
  lessons: 6
}, {
  t: "Vital Signs & Monitoring",
  done: true,
  lessons: 8
}, {
  t: "Medication Administration",
  done: true,
  lessons: 7
}, {
  t: "IV Cannulation Technique",
  done: false,
  current: true,
  lessons: 9
}, {
  t: "Infection Control",
  done: false,
  lessons: 6
}, {
  t: "Emergency Response",
  done: false,
  lessons: 10,
  locked: true
}];
function CoursePlayer() {
  const {
    id
  } = Route$4.useParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/my-courses", className: "inline-flex items-center gap-1 text-sm text-plum hover:text-plum-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
      " Back to courses"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden bg-plum-dark aspect-video relative grid place-items-center group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-plum-dark via-plum to-plum-dark opacity-90" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "relative grid h-20 w-20 place-items-center rounded-full bg-lime text-plum-dark group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-8 w-8 fill-plum-dark ml-1" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-cream/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime w-[34%]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-xs text-cream/70 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "04:12" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "12:08" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-plum", children: "Module 4 · Lesson 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 font-display text-2xl font-bold text-plum-dark", children: "Vein Selection & Site Preparation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "Course: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum-dark capitalize", children: id.replaceAll("-", " ") }),
            " · Dr. Meera Iyer"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-1 border-b border-border", children: ["Overview", "Resources", "Q&A", "Notes"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `px-4 py-2.5 text-sm font-medium border-b-2 -mb-px ${i === 0 ? "border-plum-dark text-plum-dark" : "border-transparent text-muted-foreground hover:text-plum-dark"}`, children: t }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-white border border-border p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "In this lesson you'll learn the systematic approach to selecting the optimal vein, proper aseptic technique for site preparation, and the clinical reasoning behind each choice. Includes hands-on demonstrations on the simulation arm." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: [{
            icon: FileText,
            l: "Lesson PDF"
          }, {
            icon: Download,
            l: "Practice sheet"
          }, {
            icon: MessageSquare,
            l: "Ask instructor"
          }].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-3 rounded-xl bg-secondary p-3 hover:bg-plum-dark hover:text-cream transition-colors text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(r.icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: r.l })
          ] }, r.l)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-3xl bg-white border border-border p-5 h-fit lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark", children: "Course content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: "46% complete" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime w-[46%]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2", children: MODULES.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl p-3 border ${m.current ? "bg-plum-dark text-cream border-plum-dark" : m.locked ? "border-border opacity-60" : "border-border hover:border-plum/40"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-8 w-8 place-items-center rounded-lg text-xs font-bold ${m.done ? "bg-lime text-plum-dark" : m.current ? "bg-lime text-plum-dark" : "bg-secondary text-plum-dark"}`, children: m.done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : m.locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }) : i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm font-semibold truncate ${m.current ? "text-cream" : "text-plum-dark"}`, children: m.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-[11px] ${m.current ? "text-cream/70" : "text-muted-foreground"}`, children: [
              m.lessons,
              " lessons"
            ] })
          ] })
        ] }) }, m.t)) })
      ] })
    ] })
  ] });
}
export {
  CoursePlayer as component
};
