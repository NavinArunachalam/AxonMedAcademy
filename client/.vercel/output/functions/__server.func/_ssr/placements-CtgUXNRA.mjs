import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-dYQ0o33O.mjs";
import { i as Building2, Q as MapPin, ak as TrendingUp } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const HOSPITALS = ["Apollo Hospitals", "Fortis Healthcare", "Manipal Hospitals", "Max Healthcare", "Narayana Health", "Medanta", "Aster", "Columbia Asia", "Kokilaben", "AIIMS Delhi", "Tata Memorial", "Lilavati"];
const STORIES = [{
  name: "Priya Krishnan",
  role: "Staff Nurse",
  hospital: "Apollo Hospitals",
  salary: "₹3.6L",
  city: "Bengaluru"
}, {
  name: "Arjun Reddy",
  role: "OT Technician",
  hospital: "Manipal",
  salary: "₹4.2L",
  city: "Hyderabad"
}, {
  name: "Sneha Pillai",
  role: "Lab Technician",
  hospital: "Fortis",
  salary: "₹3.2L",
  city: "Mumbai"
}, {
  name: "Karthik N.",
  role: "ICU Tech",
  hospital: "Medanta",
  salary: "₹4.8L",
  city: "Gurgaon"
}, {
  name: "Aisha Banu",
  role: "Radiology Tech",
  hospital: "Aster",
  salary: "₹4.0L",
  city: "Kochi"
}, {
  name: "Rahul Mehrotra",
  role: "Staff Nurse",
  hospital: "Max Healthcare",
  salary: "₹3.8L",
  city: "Delhi"
}];
function Placements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 lg:py-28 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 right-0 h-[500px] w-[500px] rounded-full bg-lime/25 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Placements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
          "Where our graduates",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "are ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime px-3 rounded", children: "working today." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-plum-dark text-cream py-16 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8", children: [{
        v: "95%",
        l: "Placement rate"
      }, {
        v: "₹3.8L",
        l: "Avg starting salary"
      }, {
        v: "215+",
        l: "Partner hospitals"
      }, {
        v: "28",
        l: "States covered"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl lg:text-5xl font-bold text-lime", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-cream/70", children: s.l })
      ] }, s.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Recruiters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "Hospitals that hire from us." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: HOSPITALS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 text-center hover:border-plum-dark/30 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-7 w-7 mx-auto text-plum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-sm font-semibold text-plum-dark", children: h })
      ] }, h)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "Recently placed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: STORIES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-plum-dark text-lime font-display font-bold", children: s.name.split(" ").map((n) => n[0]).join("") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-plum-dark", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/60", children: s.role })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-secondary p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/60 inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
            " Placed at"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-plum-dark mt-1", children: s.hospital })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-foreground/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            s.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-semibold text-plum-dark", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-plum" }),
            " ",
            s.salary,
            "/yr"
          ] })
        ] })
      ] }, s.name)) })
    ] }) })
  ] });
}
export {
  Placements as component
};
