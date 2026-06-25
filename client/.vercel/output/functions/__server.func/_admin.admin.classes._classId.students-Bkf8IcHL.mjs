import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-Cse3hHWN.mjs";
import { e as Route$1, I as getClassStudents, Y as getStudentAttendanceDetails } from "./_ssr/router-53Dm0F3b.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { o as ChevronLeft, aq as Users, O as LoaderCircle, a9 as Search, e as ArrowUpRight, as as X, k as ChartColumn, C as Calendar, g as BookOpen, x as Clock } from "./_libs/lucide-react.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
function StudentAttendanceDetailsModal({
  studentId,
  studentName,
  onClose
}) {
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [data, setData] = reactExports.useState(null);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  reactExports.useEffect(() => {
    let active = true;
    getStudentAttendanceDetails(studentId).then((res) => {
      if (!active) return;
      setData(res);
    }).catch((err) => {
      if (!active) return;
      setError(err.message || "Failed to load student statistics");
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [studentId]);
  const overallPercentage = reactExports.useMemo(() => {
    if (!data || data.overall.total === 0) return 0;
    const attended = data.overall.present + data.overall.late;
    return Math.round(attended / data.overall.total * 100);
  }, [data]);
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-lime/20 text-lime border-lime/30";
      case "absent":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "late":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "leave":
      case "excused":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-cream/10 text-cream/70 border-cream/20";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "w-full max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden border border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-lime font-bold", children: "Student Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-cream mt-0.5", children: studentName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-cream/50 hover:text-cream p-1.5 rounded-full hover:bg-white/5 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-lime mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50", children: "Assembling attendance metrics…" })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-red-400 flex-1", children: error }) : !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-cream/50 flex-1", children: "No data available." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs uppercase tracking-widest text-cream/50 mb-4 font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-3.5 w-3.5 text-lime" }),
            " Overall Attendance"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center h-32 w-32 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r: "54", className: "stroke-white/10", strokeWidth: "8", fill: "transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "64", cy: "64", r: "54", className: "stroke-lime transition-all duration-500 ease-out", strokeWidth: "8", fill: "transparent", strokeDasharray: 2 * Math.PI * 54, strokeDashoffset: 2 * Math.PI * 54 * (1 - overallPercentage / 100) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute text-2xl font-bold font-display text-cream font-mono", children: [
              overallPercentage,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 w-full text-xs border-t border-white/5 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 block", children: "Classes Taken" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-cream text-base", children: data.overall.total })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 block", children: "Present Count" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lime text-base", children: data.overall.present })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs uppercase tracking-widest text-cream/50 mb-3 font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5 text-lime" }),
            " Monthly Breakdown"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-3 overflow-y-auto max-h-[180px] pr-1", children: data.monthly.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/40 text-center py-6", children: "No monthly records." }) : data.monthly.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream font-medium", children: [
                monthNames[m.month - 1],
                " ",
                m.year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-cream/90", children: [
                m.percentage,
                "% (",
                m.present + m.late,
                "/",
                m.total,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime", style: {
              width: `${m.percentage}%`
            } }) })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs uppercase tracking-widest text-cream/50 mb-3 font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-lime" }),
            " Subject Breakdown"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-3 overflow-y-auto max-h-[180px] pr-1", children: data.subjectWise.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/40 text-center py-6", children: "No subject records." }) : data.subjectWise.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream font-medium truncate max-w-[140px]", children: s.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-cream/90", children: [
                s.percentage,
                "% (",
                s.present + s.late,
                "/",
                s.total,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime", style: {
              width: `${s.percentage}%`
            } }) })
          ] }, idx)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-2xl p-5 border border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs uppercase tracking-widest text-cream/50 mb-4 font-bold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-lime" }),
          " Attendance History Timeline"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-cream/60 text-[9px] uppercase tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Classroom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pr-3 text-right", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-6 text-center text-cream/40", children: "No history timeline recorded." }) }) : data.timeline.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5 hover:bg-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-cream/80 font-mono", children: new Date(event.date).toLocaleDateString(void 0, {
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "UTC"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/75 max-w-[200px] truncate", children: event.classroom?.name || "N/A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/80 font-medium", children: event.subject || "General" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeClass(event.status)}`, children: event.status }) })
          ] }, event._id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-white/10 bg-white/5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "rounded-full bg-cream/10 text-cream px-6 py-2 text-xs font-semibold hover:bg-cream/15 transition-colors", children: "Close" }) })
  ] }) });
}
function ClassStudents() {
  const {
    classId
  } = Route$1.useParams();
  const [students, setStudents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [selectedStudent, setSelectedStudent] = reactExports.useState(null);
  const fetchRoster = async () => {
    try {
      const res = await getClassStudents(classId);
      setStudents(res.students || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load class roster");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchRoster();
  }, [classId]);
  const filtered = reactExports.useMemo(() => {
    return students.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = s.name.toLowerCase().includes(q) || s.rollNumber.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [students, search, statusFilter]);
  const statusStyle = {
    active: "bg-lime/20 text-lime border-lime/30",
    removed: "bg-red-500/20 text-red-300 border-red-500/30",
    held: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    selectedStudent && /* @__PURE__ */ jsxRuntimeExports.jsx(StudentAttendanceDetailsModal, { studentId: selectedStudent.id, studentName: selectedStudent.name, onClose: () => setSelectedStudent(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/classes", className: "p-2 rounded-full hover:bg-cream/10 text-cream/70 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-lime" }),
          " Class Students"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Roster roster of students enrolled in this class" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-cream/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-lime" }),
      "Loading class roster…"
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
      "Error: ",
      error
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-cream/5 rounded-full px-4 py-2 flex-1 min-w-50 max-w-xs border border-cream/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-cream/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by name, roll no, email…", className: "bg-transparent outline-none text-sm flex-1 text-cream placeholder:text-cream/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-[#1A0F45] rounded-full px-4 py-2 text-sm outline-none text-cream focus:border-lime/50 border border-cream/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Statuses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "held", children: "Hold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "removed", children: "Removed" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Roll Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Student Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pr-4 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-8 text-center text-cream/50", children: "No students found." }) }) : filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-mono font-semibold text-lime text-xs", children: s.rollNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedStudent({
            id: s.studentId,
            name: s.name
          }), className: "text-cream font-semibold hover:text-lime text-left focus:outline-none transition-colors flex items-center gap-1 group", children: [
            s.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/80", children: s.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/80 font-mono text-xs", children: s.phone || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border capitalize ${statusStyle[s.status] || "bg-cream/10 text-cream/60 border-cream/20"}`, children: s.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedStudent({
            id: s.studentId,
            name: s.name
          }), className: "inline-flex items-center gap-1 px-3 py-1 bg-cream/10 hover:bg-cream/15 text-cream text-xs font-semibold rounded-full", children: "Attendance Details" }) })
        ] }, s.studentId)) })
      ] }) }) })
    ] })
  ] });
}
export {
  ClassStudents as component
};
