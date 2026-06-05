import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-ByMxbkxh.mjs";
import { J as useClassroomStore, e as adminActions } from "./_ssr/router-DWKgWzSP.mjs";
import { g as BookOpen, a1 as Plus, ak as TrendingUp, J as IndianRupee, Y as Pen, aj as Trash2, ar as X } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
const CATEGORIES = ["Diploma", "Certificate", "Advanced", "Workshop", "Short Course"];
function CourseModal({
  initial,
  onClose
}) {
  const [form, setForm] = reactExports.useState({
    title: initial?.title ?? "",
    category: initial?.category ?? CATEGORIES[1],
    description: initial?.description ?? "",
    price: initial?.price ?? 15e3,
    status: initial?.status ?? "draft"
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (initial) {
      adminActions.updateCourse(initial.id, form);
    } else {
      adminActions.createCourse(form);
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-cream", children: initial ? "Edit Course" : "Create New Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-cream/50 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Course Title *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }), placeholder: "e.g. ICU Critical Care", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm({
          ...form,
          description: e.target.value
        }), rows: 3, placeholder: "What will students learn?", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.category, onChange: (e) => setForm({
            ...form,
            category: e.target.value
          }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Price (₹)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: form.price, onChange: (e) => setForm({
            ...form,
            price: Number(e.target.value)
          }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.status, onChange: (e) => setForm({
          ...form,
          status: e.target.value
        }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "archived", children: "Archived" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold", children: initial ? "Save Changes" : "Create Course" })
      ] })
    ] })
  ] }) });
}
function DeleteConfirm({
  title,
  onConfirm,
  onCancel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "w-full max-w-sm text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-10 w-10 text-red-400 mx-auto mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-cream text-lg", children: [
      'Delete "',
      title,
      '"?'
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-2", children: "This action cannot be undone. Enrollment data will be unlinked." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCancel, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onConfirm, className: "flex-1 rounded-full bg-red-500 text-white py-2.5 text-sm font-bold", children: "Delete" })
    ] })
  ] }) });
}
function AdminCourses() {
  const {
    courses,
    classrooms
  } = useClassroomStore();
  const [filter, setFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [showCreate, setShowCreate] = reactExports.useState(false);
  const [editCourse, setEditCourse] = reactExports.useState(null);
  const [deleteCourseId, setDeleteCourseId] = reactExports.useState(null);
  const filteredCourses = courses.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const totalEnrolled = classrooms.reduce((s, c) => s + c.students.filter((st) => st.status === "active").length, 0);
  const totalRevenue = classrooms.reduce((s, c) => {
    const course = courses.find((x) => x.title === c.program);
    return s + (course?.price || 0) * c.students.filter((st) => st.status === "active").length;
  }, 0);
  const publishedCount = courses.filter((c) => c.status === "published").length;
  const getEnrolled = (courseTitle) => classrooms.filter((c) => c.program === courseTitle).flatMap((c) => c.students.filter((st) => st.status === "active")).length;
  const getRevenue = (course) => getEnrolled(course.title) * course.price;
  const tabCounts = {
    all: courses.length,
    published: courses.filter((c) => c.status === "published").length,
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archived").length
  };
  const deleteCourse = courses.find((c) => c.id === deleteCourseId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    showCreate && /* @__PURE__ */ jsxRuntimeExports.jsx(CourseModal, { onClose: () => setShowCreate(false) }),
    editCourse && /* @__PURE__ */ jsxRuntimeExports.jsx(CourseModal, { initial: editCourse, onClose: () => setEditCourse(null) }),
    deleteCourse && /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteConfirm, { title: deleteCourse.title, onConfirm: () => {
      adminActions.deleteCourse(deleteCourse.id);
      setDeleteCourseId(null);
    }, onCancel: () => setDeleteCourseId(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-lime" }),
          " Courses"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm mt-1", children: [
          "Manage your course catalog · ",
          publishedCount,
          " published"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowCreate(true), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Course"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: [{
      l: "Total Courses",
      v: courses.length,
      icon: BookOpen
    }, {
      l: "Total Enrolled",
      v: totalEnrolled,
      icon: TrendingUp
    }, {
      l: "Total Revenue",
      v: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime/15 text-lime shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold mt-0.5", children: s.v })
      ] })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-cream/10 flex flex-wrap gap-2 items-center", children: [
        ["all", "published", "draft", "archived"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(t), className: `text-xs font-semibold rounded-full px-4 py-2 capitalize flex items-center gap-1.5 ${filter === t ? "bg-lime text-plum-dark" : "bg-cream/5 text-cream/70"}`, children: [
          t,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter === t ? "bg-plum-dark/20 text-plum-dark" : "bg-cream/10"}`, children: tabCounts[t] })
        ] }, t)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search courses…", className: "ml-auto bg-cream/5 rounded-full px-4 py-2 text-sm outline-none placeholder:text-cream/50 w-56" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Enrolled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Updated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filteredCourses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "p-8 text-center text-cream/50", children: "No courses match your filters." }) }),
          filteredCourses.map((c) => {
            const enrolled = getEnrolled(c.title);
            const revenue = getRevenue(c);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: c.title }),
                c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/50 mt-0.5 max-w-[220px] truncate", children: c.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/70", children: c.category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-mono", children: enrolled }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono", children: [
                "₹",
                revenue.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-lime", children: [
                "₹",
                c.price.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: c.status, onChange: (e) => adminActions.updateCourseStatus(c.id, e.target.value), className: "bg-cream/5 border border-cream/10 rounded-lg px-2 py-1 text-cream/70 text-xs outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "published", children: "Published" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draft", children: "Draft" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "archived", children: "Archived" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/60 text-xs", children: new Date(c.updatedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditCourse(c), className: "grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10 text-cream/60 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDeleteCourseId(c.id), className: "grid h-8 w-8 place-items-center rounded-lg hover:bg-red-500/10 text-cream/40 hover:text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] }) })
            ] }, c.id);
          })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-4", children: "Course-wise Enrollment & Revenue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        courses.filter((c) => c.status === "published").map((c) => {
          const enrolled = getEnrolled(c.title);
          const rev = getRevenue(c);
          const maxRev = Math.max(...courses.filter((x) => x.status === "published").map((x) => getRevenue(x)), 1);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream truncate max-w-[200px]", children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/60", children: [
                  enrolled,
                  " enrolled"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lime", children: [
                  "₹",
                  rev.toLocaleString("en-IN")
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-lime/60 to-lime rounded-full transition-all", style: {
              width: `${rev / maxRev * 100}%`
            } }) })
          ] }, c.id);
        }),
        courses.filter((c) => c.status === "published").length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50", children: "No published courses yet." })
      ] })
    ] })
  ] });
}
export {
  AdminCourses as component
};
