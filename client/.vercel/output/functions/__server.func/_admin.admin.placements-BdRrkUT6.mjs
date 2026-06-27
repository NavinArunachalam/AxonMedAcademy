import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-CojTJ1Gj.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { j as Building2, i as Briefcase, an as TrendingUp, T as MapPin } from "./_libs/lucide-react.mjs";
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
import "./_ssr/router-Dlc6vLg3.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
function AdminPlacements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Placements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Hospital partnerships and student hiring" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-4", children: [{
      l: "Partner hospitals",
      v: "214",
      i: Building2
    }, {
      l: "Open positions",
      v: "486",
      i: Briefcase
    }, {
      l: "Placement rate",
      v: "95.2%",
      i: TrendingUp
    }, {
      l: "Cities covered",
      v: "32",
      i: MapPin
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg bg-lime/15 text-lime mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.i, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60 mt-1", children: s.l })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Active recruiters" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: [{
          h: "Apollo Hospitals",
          o: 24,
          c: "Bengaluru, Chennai",
          s: "Interviewing"
        }, {
          h: "Fortis Healthcare",
          o: 18,
          c: "Mumbai, Delhi",
          s: "Offers extended"
        }, {
          h: "Manipal Hospitals",
          o: 15,
          c: "Bengaluru",
          s: "Shortlisting"
        }, {
          h: "Max Healthcare",
          o: 22,
          c: "Delhi NCR",
          s: "On-site visit"
        }, {
          h: "Narayana Health",
          o: 12,
          c: "Bengaluru",
          s: "JD review"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-lime text-plum-dark font-bold", children: p.h.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold truncate", children: p.h }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-cream/60", children: [
              p.c,
              " · ",
              p.s
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lime text-xl", children: p.o }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-cream/50", children: "Open" })
          ] })
        ] }, p.h)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Recent placements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: [{
          s: "Karthik Rao",
          r: "Staff Nurse · Apollo",
          w: "₹4.8L",
          t: "2d"
        }, {
          s: "Meera Joshi",
          r: "OT Asst · Fortis",
          w: "₹4.2L",
          t: "3d"
        }, {
          s: "Vikrant Singh",
          r: "Lab Tech · Manipal",
          w: "₹3.8L",
          t: "5d"
        }, {
          s: "Asha Pillai",
          r: "ICU Nurse · Max",
          w: "₹5.2L",
          t: "1w"
        }, {
          s: "Rohit Sen",
          r: "Radiology · Narayana",
          w: "₹4.4L",
          t: "1w"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-cream/10 pb-3 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-lime/15 text-lime text-xs font-bold", children: p.s.split(" ").map((w) => w[0]).join("") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: p.s }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/60", children: p.r })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lime font-bold text-sm", children: p.w }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-cream/50", children: [
              p.t,
              " ago"
            ] })
          ] })
        ] }, p.s)) })
      ] })
    ] })
  ] });
}
export {
  AdminPlacements as component
};
