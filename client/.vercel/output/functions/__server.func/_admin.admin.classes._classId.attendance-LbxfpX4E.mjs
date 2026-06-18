import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-YOCk55cg.mjs";
import { e as Route, G as getClassStudents, I as getClassroomMeetings, E as getClassAttendance, F as getClassAttendanceReport, a9 as saveAttendance } from "./_ssr/router-BWvv7VQm.mjs";
import { n as ChevronLeft, u as ClipboardList, K as LoaderCircle, C as Calendar, ap as Video, g as BookOpen, q as CircleAlert, ae as SquareCheckBig, a3 as Save } from "./_libs/lucide-react.mjs";
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
function ClassAttendance() {
  const {
    classId
  } = Route.useParams();
  const [activeTab, setActiveTab] = reactExports.useState("mark");
  const [roster, setRoster] = reactExports.useState([]);
  const [loadingRoster, setLoadingRoster] = reactExports.useState(true);
  const [errorRoster, setErrorRoster] = reactExports.useState(null);
  const [meetings, setMeetings] = reactExports.useState([]);
  const [selectedMeetingId, setSelectedMeetingId] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [subject, setSubject] = reactExports.useState("General");
  const [markedRecords, setMarkedRecords] = reactExports.useState({});
  const [loadingRecords, setLoadingRecords] = reactExports.useState(false);
  const [saveStatus, setSaveStatus] = reactExports.useState({
    type: null,
    msg: ""
  });
  const [historyList, setHistoryList] = reactExports.useState([]);
  const [loadingHistory, setLoadingHistory] = reactExports.useState(false);
  const [errorHistory, setErrorHistory] = reactExports.useState(null);
  const loadRoster = async () => {
    try {
      const res = await getClassStudents(classId);
      const activeStudents = (res.students || []).filter((s) => s.status === "active");
      setRoster(activeStudents);
      setErrorRoster(null);
    } catch (err) {
      setErrorRoster(err instanceof Error ? err.message : "Failed to load students roster");
    } finally {
      setLoadingRoster(false);
    }
  };
  const loadMeetings = async () => {
    try {
      const res = await getClassroomMeetings(classId);
      const mList = (res.meetings || []).map((m) => ({
        id: m._id || m.id,
        title: m.title,
        scheduledAt: m.scheduledAt
      }));
      setMeetings(mList);
    } catch (err) {
      console.error("Failed to load meetings:", err);
    }
  };
  const checkExistingAttendance = async () => {
    if (!date) return;
    setLoadingRecords(true);
    setSaveStatus({
      type: null,
      msg: ""
    });
    try {
      const res = await getClassAttendance(classId, date, subject, selectedMeetingId);
      const records = res.attendance || [];
      const newMarked = {};
      roster.forEach((s) => {
        newMarked[s.studentId] = "present";
      });
      records.forEach((rec) => {
        const studId = rec.student?._id || rec.student;
        if (studId) {
          newMarked[String(studId)] = rec.status;
        }
      });
      setMarkedRecords(newMarked);
    } catch (err) {
      console.error("Failed to load attendance records:", err);
    } finally {
      setLoadingRecords(false);
    }
  };
  const loadHistory = async () => {
    setLoadingHistory(true);
    setErrorHistory(null);
    try {
      const res = await getClassAttendanceReport(classId);
      setHistoryList(res.report || []);
    } catch (err) {
      setErrorHistory(err instanceof Error ? err.message : "Failed to load attendance history");
    } finally {
      setLoadingHistory(false);
    }
  };
  reactExports.useEffect(() => {
    loadRoster();
    loadMeetings();
  }, [classId]);
  reactExports.useEffect(() => {
    if (roster.length > 0) {
      checkExistingAttendance();
    }
  }, [date, subject, selectedMeetingId, roster]);
  reactExports.useEffect(() => {
    if (activeTab === "history") {
      loadHistory();
    }
  }, [activeTab]);
  const handleStatusChange = (studentId, status) => {
    setMarkedRecords((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };
  const handleMarkAllPresent = () => {
    const updated = {};
    roster.forEach((s) => {
      updated[s.studentId] = "present";
    });
    setMarkedRecords(updated);
  };
  const handleSaveAttendance = async () => {
    if (!date.trim()) {
      setSaveStatus({
        type: "error",
        msg: "Date field is required"
      });
      return;
    }
    setLoadingRecords(true);
    setSaveStatus({
      type: null,
      msg: ""
    });
    try {
      const recordsPayload = Object.entries(markedRecords).map(([studentId, status]) => ({
        studentId,
        status
      }));
      await saveAttendance({
        classId,
        date,
        subject: selectedMeetingId ? void 0 : subject,
        meetingId: selectedMeetingId || void 0,
        records: recordsPayload
      });
      setSaveStatus({
        type: "success",
        msg: "Attendance saved successfully"
      });
      setTimeout(() => setSaveStatus({
        type: null,
        msg: ""
      }), 3e3);
    } catch (err) {
      setSaveStatus({
        type: "error",
        msg: err instanceof Error ? err.message : "Failed to save attendance"
      });
    } finally {
      setLoadingRecords(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/classes", className: "p-2 rounded-full hover:bg-cream/10 text-cream/70 hover:text-cream transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl font-bold flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-lime" }),
          " Class Attendance"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Track, review, and register students attendance statuses" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("mark"), className: `px-5 py-3 text-sm font-semibold border-b-2 transition-colors focus:outline-none ${activeTab === "mark" ? "border-lime text-lime font-bold" : "border-transparent text-cream/60 hover:text-cream"}`, children: "Mark Attendance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("history"), className: `px-5 py-3 text-sm font-semibold border-b-2 transition-colors focus:outline-none ${activeTab === "history" ? "border-lime text-lime font-bold" : "border-transparent text-cream/60 hover:text-cream"}`, children: "Attendance History" })
    ] }),
    loadingRoster ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-cream/60 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-lime" }),
      "Loading class roster…"
    ] }) : errorRoster ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
      "Error loading class roster: ",
      errorRoster
    ] }) : activeTab === "mark" ? (
      /* Mark Attendance View */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "grid md:grid-cols-3 gap-4 border border-white/5 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/50 font-bold block mb-1", children: "Attendance Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#1A0F45] border border-white/10 rounded-xl px-4 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-cream/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "bg-transparent outline-none text-sm text-cream flex-1 outline-none appearance-none" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/50 font-bold block mb-1", children: "Select Meeting (Optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#1A0F45] border border-white/10 rounded-xl px-4 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4 text-cream/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: selectedMeetingId, onChange: (e) => setSelectedMeetingId(e.target.value), className: "bg-transparent outline-none text-sm text-cream flex-1 appearance-none cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-plum-dark", children: "-- No Meeting --" }),
                meetings.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: m.id, className: "bg-plum-dark", children: [
                  m.title,
                  " (",
                  new Date(m.scheduledAt).toLocaleDateString(),
                  ")"
                ] }, m.id))
              ] })
            ] })
          ] }),
          !selectedMeetingId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/50 font-bold block mb-1", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-[#1A0F45] border border-white/10 rounded-xl px-4 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-cream/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: subject, onChange: (e) => setSubject(e.target.value), placeholder: "e.g. Critical Care, Anatomy", className: "bg-transparent outline-none text-sm text-cream flex-1" })
            ] })
          ] })
        ] }),
        saveStatus.type && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 border rounded-2xl flex items-center gap-3 text-sm ${saveStatus.type === "success" ? "bg-lime/10 border-lime/30 text-lime" : "bg-red-500/10 border-red-500/30 text-red-400"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-5 w-5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: saveStatus.msg })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-cream/60", children: [
            "Total Enrolled Students: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-cream font-mono", children: roster.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleMarkAllPresent, className: "inline-flex items-center gap-1.5 px-4 py-2 bg-cream/10 hover:bg-cream/15 text-cream text-xs font-semibold rounded-full transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-3.5 w-3.5" }),
              " Mark All Present"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleSaveAttendance, disabled: loadingRecords, className: "inline-flex items-center gap-1.5 px-5 py-2 bg-lime hover:opacity-90 disabled:opacity-50 text-plum-dark text-xs font-bold rounded-full transition-opacity shadow-lg shadow-lime/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
              " Save Attendance"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden border border-white/10 relative", children: [
          loadingRecords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[#1A0F33]/60 backdrop-blur-xs z-10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-lime" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Roll Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Student Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pr-4 text-center w-64", children: "Attendance Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: roster.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-cream/50", children: "No active students enrolled in this classroom to mark." }) }) : roster.map((s) => {
              const currentStatus = markedRecords[s.studentId] || "present";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-mono font-semibold text-lime text-xs", children: s.rollNumber }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-semibold text-cream", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/75", children: s.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex gap-1 bg-white/5 border border-white/10 rounded-full p-1", children: ["present", "absent", "late", "leave"].map((st) => {
                  const isSelected = currentStatus === st;
                  const activeCls = {
                    present: "bg-lime text-plum-dark font-bold",
                    absent: "bg-red-500 text-white font-bold",
                    late: "bg-yellow-500 text-plum-dark font-bold",
                    leave: "bg-blue-500 text-white font-bold"
                  }[st];
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleStatusChange(s.studentId, st), className: `px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full transition-all focus:outline-none ${isSelected ? activeCls : "text-cream/50 hover:text-cream"}`, children: st }, st);
                }) }) })
              ] }, s.studentId);
            }) })
          ] }) })
        ] })
      ] })
    ) : (
      /* Attendance History View */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: loadingHistory ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-cream/60 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-lime" }),
        "Loading history reports…"
      ] }) : errorHistory ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-red-400", children: [
        "Error: ",
        errorHistory
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Meeting / Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Present Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Absent Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Attendance Percentage" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: historyList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-8 text-center text-cream/50", children: "No history reports recorded yet." }) }) : historyList.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-mono text-cream/80 text-xs", children: new Date(h.date).toLocaleDateString(void 0, {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-semibold text-cream", children: h.meetingTitle ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3.5 w-3.5 text-lime" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.meetingTitle })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 text-cream/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h.subject || "General" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-lime font-bold font-mono", children: h.presentCount + h.lateCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-red-400 font-bold font-mono", children: h.absentCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-cream font-mono w-10", children: [
              h.attendancePercentage,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-24 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime", style: {
              width: `${h.attendancePercentage}%`
            } }) })
          ] }) })
        ] }, idx)) })
      ] }) }) }) })
    )
  ] });
}
export {
  ClassAttendance as component
};
