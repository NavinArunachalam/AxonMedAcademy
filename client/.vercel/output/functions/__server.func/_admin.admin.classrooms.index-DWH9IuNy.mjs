import { r as reactExports, a as React__default, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-BF4VkZVA.mjs";
import { a3 as useClassroomStore, g as classroomActions, A as getClassrooms, w as getAdminPrograms, m as createClassroom } from "./_ssr/router-DoD7BHRO.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a4 as School, $ as Plus, a6 as Search, ap as X, K as LoaderCircle, an as Users, ao as Video, g as BookOpen, u as ClipboardList, o as ChevronRight, a as Archive } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
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
function StatusBadge({
  status
}) {
  const cls = status === "active" ? "bg-lime/20 text-lime" : status === "archived" ? "bg-cream/10 text-cream/60" : "bg-yellow-500/20 text-yellow-300";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${cls}`, children: status });
}
function CreateClassroomModal({
  onClose,
  onCreated
}) {
  const [programs, setPrograms] = reactExports.useState([]);
  const [loadingPrograms, setLoadingPrograms] = reactExports.useState(true);
  const [programsError, setProgramsError] = reactExports.useState(null);
  const [createError, setCreateError] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let active = true;
    getAdminPrograms().then((data) => {
      if (!active) return;
      const published = data.filter((p) => p.status === "published");
      setPrograms(published);
      setForm((f) => ({
        ...f,
        program: published[0]?.title ?? ""
      }));
    }).catch((err) => {
      if (!active) return;
      setProgramsError(err.message || "Failed to load programs");
    }).finally(() => {
      if (active) setLoadingPrograms(false);
    });
    return () => {
      active = false;
    };
  }, []);
  const [form, setForm] = reactExports.useState({
    name: "",
    description: "",
    code: `CLS-${Math.random().toString(36).slice(2, 5).toUpperCase()}`,
    program: "",
    maxStudents: 40,
    status: "active"
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || isSubmitting) return;
    setCreateError(null);
    setIsSubmitting(true);
    try {
      const created = await createClassroom(form);
      classroomActions.addClassroom(created);
      onCreated?.(created);
      onClose();
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : "Failed to create classroom");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-cream", children: "Create Classroom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-cream/50 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      createError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs", children: createError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Classroom Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), placeholder: "e.g. ICU Critical Care — Batch 24A", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }), placeholder: "What will students learn in this classroom?", rows: 3, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Class Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.code, onChange: (e) => setForm({
            ...form,
            code: e.target.value
          }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 font-mono" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Max Students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 500, value: form.maxStudents, onChange: (e) => setForm({
            ...form,
            maxStudents: Number(e.target.value)
          }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Program" }),
        loadingPrograms ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 bg-cream/5 border border-cream/10 rounded-xl text-cream/50 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }),
          "Loading programs…"
        ] }) : programsError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs", children: programsError }) : programs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2.5 bg-cream/5 border border-cream/10 rounded-xl text-cream/50 text-xs", children: "No published programs found. Create one in Courses first." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.program, onChange: (e) => setForm({
          ...form,
          program: e.target.value
        }), className: "w-full bg-[#1A0F33] border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: programs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: p.title, children: [
          p.title,
          p.category ? ` — ${p.category}` : ""
        ] }, p.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-50", children: isSubmitting ? "Creating..." : "Create Classroom" })
      ] })
    ] })
  ] }) });
}
function ClassroomCard({
  cls
}) {
  const activeStudents = cls.students.filter((s) => s.status === "active").length;
  const publishedRecs = cls.recordings.filter((r) => r.isPublished).length;
  const publishedQuizzes = cls.quizzes.filter((q) => q.status === "published").length;
  const liveOrUpcoming = cls.meetings.filter((m) => m.status === "scheduled" || m.status === "live").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 overflow-hidden hover:border-lime/30 transition-colors group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-linear-to-r from-lime/60 to-lime" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream text-base leading-snug truncate", children: cls.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-cream/50", children: cls.code })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: cls.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-xs leading-relaxed line-clamp-2 mb-4", children: cls.description || "No description." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mb-4", children: [{
        icon: Users,
        val: activeStudents,
        label: "Students"
      }, {
        icon: Video,
        val: liveOrUpcoming,
        label: "Live"
      }, {
        icon: BookOpen,
        val: publishedRecs,
        label: "Vids"
      }, {
        icon: ClipboardList,
        val: publishedQuizzes,
        label: "Quizzes"
      }].map(({
        icon: Icon,
        val,
        label
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cream/5 rounded-lg p-2 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-lime mx-auto mb-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-cream text-sm", children: val }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-cream/50 uppercase tracking-wider", children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/classrooms/$id", params: {
          id: cls.id
        }, className: "flex-1 flex items-center justify-center gap-1.5 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold group-hover:shadow-lg group-hover:shadow-lime/20 transition-shadow", children: [
          "Open Classroom ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
        ] }),
        cls.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => classroomActions.archiveClassroom(cls.id), className: "rounded-full bg-cream/10 text-cream/70 px-3 py-2", title: "Archive classroom", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-3.5 w-3.5" }) })
      ] })
    ] })
  ] });
}
const STALE_MS = 6e4;
let listLastFetchedAt = 0;
const isListStale = () => Date.now() - listLastFetchedAt > STALE_MS;
function AdminClassrooms() {
  const {
    classrooms
  } = useClassroomStore();
  const [loadingBackend, setLoadingBackend] = reactExports.useState(classrooms.length === 0);
  const [backendError, setBackendError] = reactExports.useState(null);
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  reactExports.useEffect(() => {
    let active = true;
    const load = async () => {
      if (classrooms.length > 0 && !isListStale()) return;
      if (classrooms.length === 0) setLoadingBackend(true);
      try {
        const data = await getClassrooms();
        if (active) {
          classroomActions.setClassrooms(data);
          listLastFetchedAt = Date.now();
          setBackendError(null);
        }
      } catch (err) {
        if (active && classrooms.length === 0) {
          setBackendError(String(err instanceof Error ? err.message : err));
        }
      } finally {
        if (active) setLoadingBackend(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);
  const sourceClassrooms = classrooms;
  const filtered = React__default.useMemo(() => sourceClassrooms.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase()) || c.program.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  }), [sourceClassrooms, search, filterStatus]);
  const {
    totalStudents,
    totalRecordings
  } = React__default.useMemo(() => ({
    totalStudents: sourceClassrooms.reduce((s, c) => s + c.students.filter((st) => st.status === "active").length, 0),
    totalRecordings: sourceClassrooms.reduce((s, c) => s + c.recordings.filter((r) => r.isPublished).length, 0)
  }), [sourceClassrooms]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateClassroomModal, { onClose: () => setShowCreate(false), onCreated: (classroom) => {
      classroomActions.addClassroom(classroom);
      listLastFetchedAt = 0;
    } }),
    loadingBackend && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: "Loading classrooms from MongoDB…" }),
    backendError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
      "Error loading classrooms: ",
      backendError
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-8 w-8 text-lime" }),
          " Classrooms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Manage live classes, recordings, and quizzes per batch" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowCreate(true), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Create Classroom"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-4", children: [{
      label: "Total Classrooms",
      value: sourceClassrooms.length
    }, {
      label: "Active",
      value: sourceClassrooms.filter((c) => c.status === "active").length
    }, {
      label: "Total Students",
      value: totalStudents
    }, {
      label: "Published Recordings",
      value: totalRecordings
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold mt-1 text-cream", children: s.value })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-cream/5 rounded-full px-4 py-2 flex-1 min-w-50 max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-cream/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search classrooms…", className: "bg-transparent outline-none text-sm flex-1 text-cream placeholder:text-cream/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["all", "active", "archived", "draft"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilterStatus(s), className: `text-xs font-semibold rounded-full px-3 py-1.5 capitalize transition-colors ${filterStatus === s ? "bg-lime text-plum-dark" : "bg-cream/10 text-cream/70"}`, children: s }, s)) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "h-12 w-12 text-cream/20 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm", children: "No classrooms found. Create one to get started." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3", children: filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(ClassroomCard, { cls: c }, c.id)) })
  ] });
}
export {
  AdminClassrooms as component
};
