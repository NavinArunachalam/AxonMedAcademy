import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-CiVkrVcI.mjs";
import { i as api } from "./router-b9USinVv.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__messaging.mjs";
import { H as GraduationCap, f as Award, ah as Star } from "../_libs/lucide-react.mjs";
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
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__installations.mjs";
function FacultyPage() {
  const [faculty, setFaculty] = reactExports.useState([]);
  reactExports.useEffect(() => {
    api.get("/public/faculty").then((res) => {
      if (res.success) setFaculty(res.facultyList || []);
    }).catch(() => {
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 lg:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-grid opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 right-0 h-[500px] w-[500px] rounded-full bg-lime/25 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Faculty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 max-w-4xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
          "Learn from the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "best" }),
          " in the industry."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed", children: "Our faculty includes experienced doctors, senior nurses, and hospital administrators who bring real-world expertise to every lesson." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: faculty.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-foreground/60", children: "Loading faculty..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: faculty.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-plum to-plum-dark flex items-center justify-center font-display font-bold text-2xl text-lime shrink-0", children: f.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.image, alt: f.name, className: "h-full w-full object-cover" }) : f.initials || f.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display font-bold text-plum-dark text-lg", children: f.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/60", children: f.role }),
      f.specialty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-xs text-foreground/70 bg-secondary rounded-full px-3 py-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5" }),
        f.specialty
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 w-full flex items-center justify-between border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-foreground/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
          f.years || 0,
          "+ yrs"
        ] }),
        f.rating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-semibold text-plum-dark", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-lime text-lime" }),
          f.rating
        ] })
      ] })
    ] }, f._id || f.name)) }) }) })
  ] });
}
export {
  FacultyPage as component
};
