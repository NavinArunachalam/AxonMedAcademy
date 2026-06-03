import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-CGcQfm0v.mjs";
import { a8 as Search, ad as SlidersHorizontal, ar as X, af as Star, v as Clock, ap as Users } from "../_libs/lucide-react.mjs";
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
const SPECIALTIES = ["Nursing", "Lab Tech", "OT Tech", "ICU Care", "Radiology", "Pharmacy", "Dental", "Hospital Admin"];
const DURATIONS = ["1 Month", "3 Months", "6 Months", "1 Year"];
const MODES = ["Online", "Offline", "Hybrid"];
const COURSES = Array.from({
  length: 14
}, (_, i) => ({
  id: i + 1,
  title: ["Advanced Cardiac Care", "Staff Nursing Diploma", "OT Technician Program", "Lab Technician (DMLT)", "Radiology & Imaging", "ICU & Critical Care", "Pharmacy Assistant", "Hospital Administration", "Pediatric Nursing", "Dialysis Tech", "Phlebotomy & IV", "Dental Hygienist", "Emergency Response", "Geriatric Care"][i],
  specialty: ["ICU Care", "Nursing", "OT Tech", "Lab Tech", "Radiology", "ICU Care", "Pharmacy", "Hospital Admin", "Nursing", "Lab Tech", "Nursing", "Dental", "ICU Care", "Nursing"][i],
  duration: ["6 Months", "1 Year", "3 Months", "1 Year", "6 Months", "6 Months", "3 Months", "1 Year", "1 Year", "3 Months", "1 Month", "1 Year", "1 Month", "3 Months"][i],
  mode: ["Hybrid", "Offline", "Hybrid", "Hybrid", "Hybrid", "Offline", "Online", "Online", "Offline", "Hybrid", "Online", "Offline", "Online", "Hybrid"][i],
  fee: [45e3, 68e3, 32e3, 54e3, 49e3, 52e3, 24e3, 38e3, 62e3, 35e3, 12e3, 58e3, 9e3, 28e3][i],
  original: [6e4, 85e3, 42e3, 7e4, 65e3, 7e4, 3e4, 5e4, 8e4, 45e3, 18e3, 75e3, 14e3, 36e3][i],
  rating: [4.9, 4.8, 4.7, 4.8, 4.6, 4.9, 4.5, 4.6, 4.8, 4.7, 4.5, 4.6, 4.4, 4.7][i],
  enrolled: [1240, 2100, 820, 1530, 690, 1010, 460, 380, 920, 540, 320, 410, 280, 360][i],
  tag: i % 5 === 0 ? "Bestseller" : i % 7 === 0 ? "New" : void 0
}));
function CoursesPage() {
  const [q, setQ] = reactExports.useState("");
  const [spec, setSpec] = reactExports.useState([]);
  const [dur, setDur] = reactExports.useState([]);
  const [mode, setMode] = reactExports.useState([]);
  const [sort, setSort] = reactExports.useState("popular");
  const [open, setOpen] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    let r = COURSES.filter((c) => (!q || c.title.toLowerCase().includes(q.toLowerCase())) && (spec.length === 0 || spec.includes(c.specialty)) && (dur.length === 0 || dur.includes(c.duration)) && (mode.length === 0 || mode.includes(c.mode)));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.fee - b.fee);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.fee - a.fee);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, spec, dur, mode, sort]);
  const FilterPanel = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Specialty", options: SPECIALTIES, selected: spec, onChange: setSpec }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Duration", options: DURATIONS, selected: dur, onChange: setDur }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FilterGroup, { label: "Mode", options: MODES, selected: mode, onChange: setMode }),
    (spec.length || dur.length || mode.length) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      setSpec([]);
      setDur([]);
      setMode([]);
    }, className: "text-xs font-semibold text-plum underline", children: "Clear all filters" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 py-14 lg:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Catalog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-4xl lg:text-6xl font-bold text-plum-dark tracking-tight", children: [
        "Find the course that",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "becomes your career."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 relative max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-plum-dark/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search courses…", className: "w-full rounded-full border border-border bg-card pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-5 lg:px-8 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-64 shrink-0 sticky top-24 self-start", children: FilterPanel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/70", children: [
            filtered.length,
            " courses"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(true), className: "lg:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
              " Filters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold focus:outline-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "Most Popular" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "Price: Low to High" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "Price: High to Low" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "Rating" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { c }, c.id)) })
      ] })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-plum-dark/40", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-cream p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-plum-dark text-lg", children: "Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "grid h-9 w-9 place-items-center rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
        ] }),
        FilterPanel
      ] })
    ] })
  ] });
}
function FilterGroup({
  label,
  options,
  selected,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-sm text-plum-dark uppercase tracking-wider mb-3", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: options.map((o) => {
      const on = selected.includes(o);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer text-sm group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-5 w-5 place-items-center rounded-md border transition ${on ? "bg-plum-dark border-plum-dark" : "border-border group-hover:border-plum-dark/50"}`, children: on && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 bg-lime rounded-sm" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "sr-only", checked: on, onChange: () => onChange(on ? selected.filter((s) => s !== o) : [...selected, o]) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: on ? "text-plum-dark font-semibold" : "text-foreground/75", children: o })
      ] }, o);
    }) })
  ] });
}
function CourseCard({
  c
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] bg-gradient-to-br from-plum to-plum-dark overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark", children: c.specialty }),
        c.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark", children: c.tag })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-bold text-plum-dark inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-lime text-lime" }),
        " ",
        c.rating
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-plum-dark line-clamp-2 leading-snug", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4 text-xs text-foreground/65", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          " ",
          c.duration
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
          " ",
          c.enrolled.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase", children: c.mode })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-foreground/50 line-through", children: [
            "₹",
            c.original.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl font-bold text-plum-dark", children: [
            "₹",
            c.fee.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full bg-plum-dark px-4 py-2 text-xs font-semibold text-cream hover:bg-plum transition", children: "Enroll →" })
      ] })
    ] })
  ] });
}
export {
  CoursesPage as component
};
