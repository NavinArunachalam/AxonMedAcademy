import { r as reactExports, j as jsxRuntimeExports, R as React__default } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-232oUaaL.mjs";
import { i as useClassroomStore, c as classroomActions, a as adminActions, m as messageActions } from "./_ssr/classroomStore-B40uasVO.mjs";
import { i as getClassrooms, g as getAdminUsers } from "./_ssr/api-GlGI6V_B.mjs";
import { D as Download, a0 as Plus, aq as X, a7 as Search, ap as Video, P as Mail, p as ChevronUp, m as ChevronDown, u as ClipboardList } from "./_libs/lucide-react.mjs";
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
const statusStyle = {
  active: "bg-lime/20 text-lime",
  placed: "bg-blue-500/20 text-blue-300",
  "at risk": "bg-red-500/20 text-red-300",
  removed: "bg-red-900/40 text-red-200",
  held: "bg-yellow-500/20 text-yellow-300"
};
function SendMessageModal({
  studentId,
  studentName,
  onClose
}) {
  const {
    threads,
    currentUser
  } = useClassroomStore();
  const [text, setText] = reactExports.useState("");
  const thread = threads.find((t) => t.participantIds.includes(studentId) && t.participantIds.includes("admin-01") && t.type === "direct");
  const handleSend = () => {
    if (!text.trim()) return;
    let t = thread;
    if (!t) {
      t = messageActions.createThread(studentId, studentName);
    }
    messageActions.sendMessage(t.id, "admin-01", "Admin", text.trim());
    setText("");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-lg font-bold text-cream", children: [
        "Message ",
        studentName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-cream/50 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    thread && thread.messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 space-y-2 max-h-48 overflow-y-auto", children: thread.messages.slice(-3).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl px-3 py-2 text-sm ${m.senderId === "admin-01" ? "bg-lime/10 text-lime ml-8" : "bg-cream/5 text-cream/80 mr-8"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/50 mb-0.5", children: m.senderName }),
      m.text
    ] }, m.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 3, placeholder: "Type your message to the student…", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-lime/50 resize-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSend, disabled: !text.trim(), className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-40", children: "Send Message" })
    ] })
  ] }) });
}
function StudentDetail({
  studentId
}) {
  const {
    classrooms
  } = useClassroomStore();
  const enrolled = classrooms.filter((c) => c.students.some((s) => s.id === studentId));
  const totalPublishedRecs = enrolled.reduce((s, c) => s + c.recordings.filter((r) => r.isPublished).length, 0);
  const totalWatchedRecs = enrolled.reduce((s, c) => s + c.recordings.filter((r) => r.isPublished && r.viewStats.some((v) => v.studentId === studentId && v.watchedPercent > 0)).length, 0);
  const totalHoursWatched = enrolled.reduce((s, c) => s + c.recordings.reduce((ss, r) => {
    const vs = r.viewStats.find((v) => v.studentId === studentId);
    return ss + (vs ? vs.watchedPercent / 100 * r.duration : 0);
  }, 0), 0);
  const avgWatchPct = totalPublishedRecs > 0 ? Math.round(enrolled.reduce((s, c) => s + c.recordings.filter((r) => r.isPublished).reduce((ss, r) => {
    const vs = r.viewStats.find((v) => v.studentId === studentId);
    return ss + (vs?.watchedPercent || 0);
  }, 0), 0) / totalPublishedRecs) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cream/5 rounded-xl p-4 mt-2 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: [{
      l: "Classrooms",
      v: enrolled.length
    }, {
      l: "Videos Watched",
      v: `${totalWatchedRecs}/${totalPublishedRecs}`
    }, {
      l: "Hours Watched",
      v: `${Math.round(totalHoursWatched / 3600)}h`
    }, {
      l: "Avg Watch %",
      v: `${avgWatchPct}%`
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-cream/5 rounded-lg p-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-cream text-sm", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-cream/50 uppercase tracking-wider mt-0.5", children: s.l })
    ] }, s.l)) }),
    enrolled.map((c) => {
      const me = c.students.find((s) => s.id === studentId);
      const pubRecs = c.recordings.filter((r) => r.isPublished);
      const watchedRecs = pubRecs.filter((r) => r.viewStats.some((v) => v.studentId === studentId && v.watchedPercent > 0));
      const quizAttempts = c.quizzes.flatMap((q) => q.attempts.filter((a) => a.studentId === studentId));
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-cream/10 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream font-semibold text-sm", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/50 text-[10px]", children: c.program })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: me.status, onChange: (e) => classroomActions.updateStudentStatus(c.id, studentId, e.target.value), className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border border-cream/10 bg-cream/5 text-cream outline-none`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "held", children: "Hold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "at risk", children: "At Risk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "placed", children: "Placed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "removed", children: "Remove" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/40 text-[10px] uppercase tracking-widest mb-0.5", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full", style: {
                width: `${me.progress}%`
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                me.progress,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/40 text-[10px] uppercase tracking-widest mb-0.5", children: "Videos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3 text-lime" }),
              watchedRecs.length,
              "/",
              pubRecs.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/40 text-[10px] uppercase tracking-widest mb-0.5", children: "Quiz Attempts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-3 w-3 text-lime" }),
              quizAttempts.length
            ] })
          ] })
        ] }),
        pubRecs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/40", children: "Recording Progress" }),
          pubRecs.map((r) => {
            const vs = r.viewStats.find((v) => v.studentId === studentId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/60 flex-1 truncate", children: r.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 bg-cream/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full", style: {
                width: `${vs?.watchedPercent || 0}%`
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-cream/50 w-8", children: [
                vs?.watchedPercent || 0,
                "%"
              ] })
            ] }, r.id);
          })
        ] })
      ] }, c.id);
    })
  ] });
}
function AdminStudents() {
  const {
    classrooms,
    courses,
    users
  } = useClassroomStore();
  const [backendError, setBackendError] = reactExports.useState(null);
  const [mongoStudents, setMongoStudents] = reactExports.useState([]);
  const [search, setSearch] = reactExports.useState("");
  const [courseFilter, setCourseFilter] = reactExports.useState("All");
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    selectedClassroom: ""
  });
  const [expandedId, setExpandedId] = reactExports.useState(null);
  const [msgStudent, setMsgStudent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let active2 = true;
    const loadClassrooms = async () => {
      try {
        const [data, students] = await Promise.all([getClassrooms(), getAdminUsers("student")]);
        if (!active2) return;
        classroomActions.setClassrooms(data);
        setMongoStudents(students);
        setBackendError(null);
      } catch (err) {
        if (!active2) return;
        setBackendError(err instanceof Error ? err.message : "Could not load students from MongoDB");
      }
    };
    loadClassrooms();
    return () => {
      active2 = false;
    };
  }, []);
  const enrollments = reactExports.useMemo(() => {
    const classroomEnrollments = classrooms.flatMap((c) => c.students.map((s) => ({
      ...s,
      course: c.program,
      batch: c.name.split("—")[1]?.trim() || "N/A",
      classroomId: c.id,
      classroomName: c.name,
      totalPubRecs: c.recordings.filter((r) => r.isPublished).length,
      watchedRecs: c.recordings.filter((r) => r.isPublished && r.viewStats.some((v) => v.studentId === s.id && v.watchedPercent > 0)).length
    })));
    const enrolledIds = new Set(classroomEnrollments.map((student) => student.id));
    const unenrolledStudents = mongoStudents.filter((student) => !enrolledIds.has(student.id)).map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      enrollmentId: "Not enrolled",
      progress: 0,
      attendance: 0,
      quizAvg: 0,
      status: student.isActive === false ? "removed" : "active",
      addedAt: "",
      course: "Not enrolled",
      batch: "N/A",
      classroomId: "none",
      classroomName: "Not enrolled",
      totalPubRecs: 0,
      watchedRecs: 0
    }));
    return [...classroomEnrollments, ...unenrolledStudents];
  }, [classrooms, mongoStudents]);
  const filtered = enrollments.filter((e) => {
    if (courseFilter !== "All" && e.course !== courseFilter) return false;
    if (statusFilter !== "All" && e.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!e.name.toLowerCase().includes(q) && !e.email.toLowerCase().includes(q) && !e.enrollmentId.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const total = enrollments.length;
  const active = enrollments.filter((e) => e.status === "active").length;
  const placed = enrollments.filter((e) => e.status === "placed").length;
  const atRisk = enrollments.filter((e) => e.status === "at risk").length;
  const programOptions = Array.from(new Set(enrollments.map((e) => e.course).filter(Boolean)));
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const user = adminActions.createUser({
      name: form.name,
      email: form.email,
      role: "student",
      password: form.password || "1111"
    });
    if (form.selectedClassroom) {
      classroomActions.addStudent(form.selectedClassroom, {
        id: user.id,
        name: user.name,
        email: user.email,
        enrollmentId: `MCA-${(/* @__PURE__ */ new Date()).getFullYear()}-${user.name.split(" ")[0].toUpperCase().slice(0, 4)}`,
        progress: 0,
        attendance: 0,
        quizAvg: 0,
        status: "active",
        addedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    setShowAdd(false);
    setForm({
      name: "",
      email: "",
      password: "",
      selectedClassroom: ""
    });
  };
  const handleExport = () => {
    const csv = ["Name,Email,Course,Batch,Progress,Attendance,Quiz Avg,Status,Watch Progress", ...filtered.map((e) => `${e.name},${e.email},${e.course},${e.batch},${e.progress}%,${e.attendance}%,${e.quizAvg}%,${e.status},${e.watchedRecs}/${e.totalPubRecs}`)].join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    msgStudent && /* @__PURE__ */ jsxRuntimeExports.jsx(SendMessageModal, { studentId: msgStudent.id, studentName: msgStudent.name, onClose: () => setMsgStudent(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm mt-1", children: [
          total,
          " total enrollments"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExport, className: "inline-flex items-center gap-2 rounded-full bg-cream/10 text-cream px-4 py-2 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Export CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAdd(true), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Add Student"
        ] })
      ] })
    ] }),
    backendError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
      "Using fallback mock data: ",
      backendError
    ] }),
    showAdd && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream", children: "Register New Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowAdd(false), className: "text-cream/50 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddStudent, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), placeholder: "Student name", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Email *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm({
              ...form,
              email: e.target.value
            }), placeholder: "student@example.com", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Initial Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.password, onChange: (e) => setForm({
              ...form,
              password: e.target.value
            }), placeholder: "Defaults to 1111", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Enroll in Classroom" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.selectedClassroom, onChange: (e) => setForm({
              ...form,
              selectedClassroom: e.target.value
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "None (Just register)" }),
              classrooms.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowAdd(false), className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold", children: "Register & Enroll" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-4", children: [{
      l: "Total",
      v: total
    }, {
      l: "Active",
      v: active
    }, {
      l: "Placed",
      v: placed
    }, {
      l: "At Risk",
      v: atRisk,
      warn: true
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-2xl font-bold mt-1 ${s.warn && s.v > 0 ? "text-red-400" : "text-cream"}`, children: s.v })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-cream/10 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-cream/5 rounded-full px-3 py-2 flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-cream/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by name, ID, email…", className: "bg-transparent outline-none text-sm flex-1 text-cream placeholder:text-cream/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: courseFilter, onChange: (e) => setCourseFilter(e.target.value), className: "bg-cream/5 rounded-full px-4 py-2 text-sm outline-none text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All programs" }),
          (programOptions.length > 0 ? programOptions : courses.map((c) => c.title)).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-cream/5 rounded-full px-4 py-2 text-sm outline-none text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All statuses" }),
          ["active", "held", "at risk", "placed", "removed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, className: "capitalize", children: s }, s))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Program / Batch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Videos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Quiz Avg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "p-8 text-center text-cream/50", children: "No students found." }) }),
          filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React__default.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-t border-cream/10 hover:bg-cream/5 cursor-pointer ${expandedId === s.id + s.classroomId ? "bg-cream/5" : ""}`, onClick: () => setExpandedId((prev) => prev === s.id + s.classroomId ? null : s.id + s.classroomId), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-lime text-plum-dark text-xs font-bold", children: s.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/60 font-mono", children: s.enrollmentId })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/80 text-xs", children: s.course }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/50 text-[11px]", children: s.batch })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-28", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime", style: {
                  width: `${s.progress}%`
                } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono", children: [
                  s.progress,
                  "%"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3 text-lime" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  s.watchedRecs,
                  "/",
                  s.totalPubRecs
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-xs", children: [
                s.quizAvg,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded capitalize ${statusStyle[s.status] || "bg-cream/10 text-cream/60"}`, children: s.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", onClick: (e) => e.stopPropagation(), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMsgStudent({
                  id: s.id,
                  name: s.name
                }), className: "grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10", title: "Send message", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10", children: expandedId === s.id + s.classroomId ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" }) })
              ] }) })
            ] }),
            expandedId === s.id + s.classroomId && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-cream/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentDetail, { studentId: s.id }) }) })
          ] }, s.id + s.classroomId))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminStudents as component
};
