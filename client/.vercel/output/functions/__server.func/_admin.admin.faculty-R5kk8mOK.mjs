import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-232oUaaL.mjs";
import { a0 as Plus, ae as Star, ao as Users } from "./_libs/lucide-react.mjs";
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
const FACULTY = [{
  n: "Dr. Meera Iyer",
  d: "Patient Care · 18y",
  r: 4.9,
  s: 842,
  c: 4,
  init: "MI"
}, {
  n: "Dr. Anil Khanna",
  d: "OT & Surgery · 24y",
  r: 4.8,
  s: 614,
  c: 3,
  init: "AK"
}, {
  n: "Dr. Sneha Patil",
  d: "Pathology Lab · 12y",
  r: 4.9,
  s: 548,
  c: 2,
  init: "SP"
}, {
  n: "Dr. Rajeev Rao",
  d: "ICU · 21y",
  r: 4.7,
  s: 421,
  c: 3,
  init: "RR"
}, {
  n: "Dr. Kavya Menon",
  d: "Radiology · 15y",
  r: 4.8,
  s: 312,
  c: 2,
  init: "KM"
}, {
  n: "Dr. Vinod Sharma",
  d: "Pharmacology · 19y",
  r: 4.6,
  s: 287,
  c: 3,
  init: "VS"
}];
function AdminFaculty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Faculty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "28 instructors · 12 active courses" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Invite faculty"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3", children: FACULTY.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-lime text-plum-dark font-bold", children: f.init }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold truncate", children: f.n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/60", children: f.d })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-lime", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-lime" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: f.r })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Rating" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-lime flex items-center justify-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
            f.s
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Students" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lime", children: f.c }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mt-1", children: "Courses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 rounded-full bg-cream/10 text-cream text-xs font-semibold py-2", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex-1 rounded-full bg-lime text-plum-dark text-xs font-bold py-2", children: "Profile" })
      ] })
    ] }, f.n)) })
  ] });
}
export {
  AdminFaculty as component
};
