import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-dYQ0o33O.mjs";
import { y as getAssetUrl, f as api } from "./router-DoD7BHRO.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function FacultyPage() {
  const [faculty, setFaculty] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/public/faculty");
        if (res.success) {
          setFaculty(res.facultyList || []);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-foreground/60", children: "Loading faculty directory..." }) : faculty.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-foreground/60", children: "No faculty members found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: faculty.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-60 bg-gradient-to-br from-plum to-plum-dark overflow-hidden grid place-items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
        f.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(f.image), alt: f.name, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative font-display text-6xl font-bold text-cream/90", children: f.initials || f.name.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark z-10", children: f.specialty }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-plum-dark z-10", children: [
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
    ] }, f._id || f.id)) }) }) })
  ] });
}
export {
  FacultyPage as component
};
