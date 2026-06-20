import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-CBNc5iIb.mjs";
import { am as useClassroomStore, K as getClassrooms, j as classroomActions } from "./_ssr/router-CT3O2n_w.mjs";
import { a4 as School, K as LoaderCircle, a6 as Search, an as Users, E as Eye, u as ClipboardList } from "./_libs/lucide-react.mjs";
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
function AdminClasses() {
  const {
    classrooms
  } = useClassroomStore();
  const [loading, setLoading] = reactExports.useState(classrooms.length === 0);
  const [error, setError] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const fetchList = async () => {
    try {
      const data = await getClassrooms();
      classroomActions.setClassrooms(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load classes");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchList();
  }, []);
  const filtered = reactExports.useMemo(() => {
    return classrooms.filter((c) => {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    });
  }, [classrooms, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between flex-wrap gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-8 w-8 text-lime" }),
        " Classes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Manage class details, enrollment, and attendance records" })
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-cream/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-lime" }),
      "Loading class configurations…"
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
      "Error loading classes: ",
      error
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-cream/5 rounded-full px-4 py-2 flex-1 min-w-50 max-w-xs border border-cream/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-cream/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search classes…", className: "bg-transparent outline-none text-sm flex-1 text-cream placeholder:text-cream/40" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Class Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Total Students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pr-4 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "p-8 text-center text-cream/50", children: "No classes found." }) }) : filtered.map((c) => {
          const totalStudents = c.students.filter((s) => s.status === "active").length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cream", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/50 font-mono", children: c.code })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-mono text-lime font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              totalStudents
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/classes/$classId/students", params: {
                classId: c.id
              }, className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cream/10 hover:bg-cream/15 text-cream text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
                " View Students"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/classes/$classId/attendance", params: {
                classId: c.id
              }, className: "inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-lime hover:opacity-90 text-plum-dark text-xs font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-3.5 w-3.5" }),
                " Attendance"
              ] })
            ] }) })
          ] }, c.id);
        }) })
      ] }) }) })
    ] })
  ] });
}
export {
  AdminClasses as component
};
