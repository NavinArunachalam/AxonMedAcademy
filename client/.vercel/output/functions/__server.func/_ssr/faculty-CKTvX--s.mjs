import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-CGcQfm0v.mjs";
import { ae as Star, G as GraduationCap, f as Award } from "../_libs/lucide-react.mjs";
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
const FACULTY = [{
  name: "Dr. Anita Sharma",
  role: "Senior Cardiologist",
  specialty: "Cardiac Care",
  years: 18,
  rating: 4.9,
  initials: "AS"
}, {
  name: "Dr. Rohan Mehta",
  role: "Anesthesiologist",
  specialty: "OT Technology",
  years: 14,
  rating: 4.8,
  initials: "RM"
}, {
  name: "Dr. Priya Iyer",
  role: "Chief Pathologist",
  specialty: "Lab Sciences",
  years: 22,
  rating: 5,
  initials: "PI"
}, {
  name: "Dr. Aman Khan",
  role: "Radiologist",
  specialty: "Imaging",
  years: 12,
  rating: 4.7,
  initials: "AK"
}, {
  name: "Nurse Latha R.",
  role: "Nursing Head",
  specialty: "Staff Nursing",
  years: 20,
  rating: 4.9,
  initials: "LR"
}, {
  name: "Dr. Sanjay V.",
  role: "ICU Specialist",
  specialty: "Critical Care",
  years: 16,
  rating: 4.8,
  initials: "SV"
}, {
  name: "Dr. Meera Joshi",
  role: "Pediatrician",
  specialty: "Pediatric Care",
  years: 11,
  rating: 4.8,
  initials: "MJ"
}, {
  name: "Dr. Vikram Rao",
  role: "Emergency Physician",
  specialty: "ER & Trauma",
  years: 13,
  rating: 4.7,
  initials: "VR"
}];
function FacultyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 lg:py-28 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-lime/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Faculty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
          "The clinicians who",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "will shape ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "your craft." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-lg text-foreground/70", children: "Every faculty member is a practicing clinician with 10+ years of bedside experience. We don't hire educators — we hire experts who teach." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: FACULTY.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-60 bg-gradient-to-br from-plum to-plum-dark overflow-hidden grid place-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative font-display text-6xl font-bold text-cream/90", children: f.initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark", children: f.specialty }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-plum-dark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-plum-dark" }),
          " ",
          f.rating
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-plum-dark text-lg", children: f.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-foreground/65", children: f.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 text-xs text-foreground/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
            " ",
            f.years,
            " yrs"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
            " Top-rated"
          ] })
        ] })
      ] })
    ] }, f.name)) }) }) })
  ] });
}
export {
  FacultyPage as component
};
