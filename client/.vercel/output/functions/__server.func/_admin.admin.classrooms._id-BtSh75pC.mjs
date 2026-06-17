import { a as React__default, r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as LuArrowLeft, k as LuMegaphone, s as LuVideo, d as LuCircleDot, e as LuClipboardList, r as LuUsers, o as LuSend, p as LuTrash2, m as LuPlus, n as LuRadio, b as LuCalendar, f as LuClock, l as LuPlay, q as LuUpload, g as LuCopy, t as LuX, a as LuBookOpen, j as LuEyeOff, i as LuEye, h as LuDownload, c as LuCheck } from "./_libs/react-icons.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-B8LslV4d.mjs";
import { c as Route$2, aj as useClassroomStore, G as getClassroomById, i as classroomActions, a0 as markClassroomFresh, X as isClassroomStale, U as getRecordingStreamUrl, y as formatDuration, ae as unpublishRecording, a3 as publishRecording, w as deleteRecording, T as getQuizReport, p as createClassroomAnnouncement, t as deleteClassroomAnnouncement, q as createMeeting, a9 as startMeeting, x as endMeeting, u as deleteMeeting, a5 as reuseClassroomRecording, ai as uploadClassroomRecordingToCloudflare, ad as uid, ah as updateQuiz, r as createQuiz, a2 as publishQuiz, k as closeQuiz, v as deleteQuiz, B as getAdminUsers, f as addStudentsToClassroom, ag as updateClassroomStudentStatus } from "./_ssr/router-CMo-f-AL.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import "./_libs/lucide-react.mjs";
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
function fmtDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function fmtShortDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short"
  });
}
function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1e3;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function MeetingStatusBadge({
  status
}) {
  const map = {
    live: {
      cls: "bg-red-500/20 text-red-300",
      icon: LuRadio,
      label: "LIVE"
    },
    scheduled: {
      cls: "bg-lime/20 text-lime",
      icon: LuClock,
      label: "Scheduled"
    },
    ended: {
      cls: "bg-cream/10 text-cream/60",
      icon: LuCheck,
      label: "Done"
    },
    cancelled: {
      cls: "bg-red-900/30 text-red-400",
      icon: LuX,
      label: "Cancelled"
    }
  };
  const {
    cls,
    icon: Icon,
    label
  } = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${cls}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-3 w-3 ${status === "live" ? "animate-pulse" : ""}` }),
    label
  ] });
}
const TABS = [{
  key: "announcements",
  label: "Announcements",
  icon: LuMegaphone
}, {
  key: "live",
  label: "Live Classes",
  icon: LuVideo
}, {
  key: "recordings",
  label: "Recordings",
  icon: LuCircleDot
}, {
  key: "tests",
  label: "Tests",
  icon: LuClipboardList
}, {
  key: "students",
  label: "Students",
  icon: LuUsers
}];
function AnnouncementsTab({
  classroom,
  refreshClassroom
}) {
  const cls = classroom;
  const [text, setText] = reactExports.useState("");
  const [isPosting, setIsPosting] = reactExports.useState(false);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const handlePost = async () => {
    if (!text.trim() || isPosting) return;
    setError("");
    setIsPosting(true);
    try {
      await createClassroomAnnouncement(classroom.id, text.trim());
      setText("");
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post announcement");
    } finally {
      setIsPosting(false);
    }
  };
  const handleDelete = async (announcementId) => {
    if (deletingId) return;
    setError("");
    setDeletingId(announcementId);
    try {
      await deleteClassroomAnnouncement(classroom.id, announcementId);
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete announcement");
    } finally {
      setDeletingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-sm text-cream mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuMegaphone, { className: "h-4 w-4 text-lime" }),
        " Post Announcement"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), placeholder: "Type your announcement… (supports emoji 🎯)", rows: 3, disabled: isPosting, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-lime/50 resize-none disabled:opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handlePost, disabled: !text.trim() || isPosting, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2 text-sm font-bold disabled:opacity-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuSend, { className: "h-3.5 w-3.5" }),
        " ",
        isPosting ? "Posting…" : "Post to All Students"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      cls.announcements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuMegaphone, { className: "h-8 w-8 text-cream/20 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No announcements yet." })
      ] }),
      cls.announcements.map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-plum-dark font-bold text-xs", children: ann.author.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream text-sm font-semibold", children: ann.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-xs", children: timeAgo(ann.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/80 text-sm leading-relaxed", children: ann.content })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDelete(ann.id), disabled: deletingId === ann.id, className: "text-cream/30 hover:text-red-400 transition-colors shrink-0 disabled:opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuTrash2, { className: "h-4 w-4" }) })
      ] }) }, ann.id))
    ] })
  ] });
}
function LiveClassesTab({
  classroomId,
  refreshClassroom
}) {
  const {
    classrooms
  } = useClassroomStore();
  const cls = classrooms.find((c) => c.id === classroomId);
  const [deletingMeetingId, setDeletingMeetingId] = reactExports.useState(null);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    scheduledAt: "",
    duration: 60
  });
  const [notifyStudents, setNotifyStudents] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const formatForDateTimeLocal = (value) => {
    if (!value) return "";
    const local = value.includes("T") ? value.slice(0, 16) : value;
    return local;
  };
  const handleDeleteMeeting = async (meetingId) => {
    setError("");
    setDeletingMeetingId(meetingId);
    try {
      await deleteMeeting(meetingId);
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete meeting");
    } finally {
      setDeletingMeetingId(null);
    }
  };
  const handleStartMeeting = async (meetingId) => {
    setError("");
    try {
      await startMeeting(meetingId);
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start meeting");
    }
  };
  const handleEndMeeting = async (meetingId) => {
    setError("");
    try {
      await endMeeting(meetingId);
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not end meeting");
    }
  };
  const handleSchedule = (e) => {
    e.preventDefault();
    if (!form.title || !form.scheduledAt) return;
    setError("");
    setSaving(true);
    createMeeting({
      classroom: cls.code || classroomId,
      title: form.title,
      description: form.description,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
      duration: form.duration,
      sendPortalNotification: notifyStudents,
      sendWhatsApp: false
    }).then(async () => {
      await refreshClassroom();
      setForm({
        title: "",
        description: "",
        scheduledAt: "",
        duration: 60
      });
      setShowForm(false);
      alert("Webex meeting scheduled successfully!");
    }).catch((err) => {
      console.error("Schedule Error:", err);
      setError(err.message || "Could not schedule meeting");
      alert("Error scheduling meeting: " + (err.message || "Unknown error"));
    }).finally(() => setSaving(false));
  };
  const upcoming = cls.meetings.filter((m) => m.status !== "ended" && m.status !== "cancelled");
  const past = cls.meetings.filter((m) => m.status === "ended" || m.status === "cancelled");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowForm(!showForm), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlus, { className: "h-4 w-4" }),
      " Schedule Live Class"
    ] }) }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream mb-4", children: "Schedule a Live Class" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSchedule, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Class Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }), placeholder: "e.g. Ventilator Mode Deep Dive", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), placeholder: "What will be covered?", rows: 2, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Date & Time *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "datetime-local", value: formatForDateTimeLocal(form.scheduledAt), onChange: (e) => setForm({
              ...form,
              scheduledAt: e.currentTarget.value
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Duration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.duration, onChange: (e) => setForm({
              ...form,
              duration: Number(e.target.value)
            }), className: "w-full bg-[#1A0F33] border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 30, children: "30 minutes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 60, children: "1 hour" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 90, children: "1.5 hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 120, children: "2 hours" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-cream/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "notify-students", type: "checkbox", checked: notifyStudents, onChange: (e) => setNotifyStudents(e.target.checked), className: "h-4 w-4 rounded border-cream/20 bg-cream/5 text-lime focus:ring-lime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "notify-students", className: "select-none", children: "Send join-link notification to active students" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowForm(false), className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-50", children: saving ? "Scheduling…" : "Confirm & Schedule" })
        ] })
      ] })
    ] }),
    upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-widest text-cream/60 mb-3", children: "Upcoming & Live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime", children: m.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LuRadio, { className: "h-5 w-5 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LuCalendar, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream text-sm truncate", children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingStatusBadge, { status: m.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream/60 text-xs mt-0.5 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuCalendar, { className: "h-3 w-3" }),
              " ",
              fmtShortDate(m.scheduledAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuClock, { className: "h-3 w-3" }),
              " ",
              fmtTime(m.scheduledAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              m.duration,
              " min"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              m.attendees.length,
              " joined"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
          m.status === "scheduled" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => void handleStartMeeting(m.id), className: "rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlay, { className: "h-3 w-3" }),
            " Start"
          ] }),
          m.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.open(m.webexLink, "_blank"), className: "rounded-full bg-red-500/20 text-red-300 px-4 py-2 text-xs font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuRadio, { className: "h-3 w-3" }),
              " Rejoin"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void handleEndMeeting(m.id), className: "rounded-full bg-cream/10 text-cream/70 px-3 py-2 text-xs", children: "End" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void handleDeleteMeeting(m.id), disabled: deletingMeetingId === m.id, className: "rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2 text-xs disabled:opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuTrash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }, m.id)) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: error }),
    past.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-widest text-cream/60 mb-3", children: "Past Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Attendees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: past.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-cream", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/70 text-xs", children: fmtDate(m.scheduledAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/60 text-xs", children: [
            m.duration,
            "m"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "font-mono text-cream/80", children: m.attendees.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeetingStatusBadge, { status: m.status }) })
        ] }, m.id)) })
      ] }) })
    ] }),
    cls.meetings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuVideo, { className: "h-8 w-8 text-cream/20 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No classes scheduled yet." })
    ] })
  ] });
}
function RecordingsTab({
  classroom,
  refreshClassroom
}) {
  const cls = classroom;
  const {
    accessToken,
    classrooms
  } = useClassroomStore();
  const [showForm, setShowForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    duration: 3600,
    isPublished: true,
    chapters: []
  });
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [uploadBytes, setUploadBytes] = reactExports.useState({
    loaded: 0,
    total: 0
  });
  const [uploadPhase, setUploadPhase] = reactExports.useState("idle");
  const [uploadError, setUploadError] = reactExports.useState(null);
  const [uploadPartInfo, setUploadPartInfo] = reactExports.useState(null);
  const [chapterInput, setChapterInput] = reactExports.useState({
    title: "",
    startTimeSec: 0
  });
  const [activeRec, setActiveRec] = reactExports.useState(null);
  const [showReuseModal, setShowReuseModal] = reactExports.useState(false);
  const [selectedSourceClassroomId, setSelectedSourceClassroomId] = reactExports.useState("");
  const [selectedSourceRecordingId, setSelectedSourceRecordingId] = reactExports.useState("");
  const [reuseTitle, setReuseTitle] = reactExports.useState("");
  const [reuseDescription, setReuseDescription] = reactExports.useState("");
  const [isReusing, setIsReusing] = reactExports.useState(false);
  const [reuseError, setReuseError] = reactExports.useState(null);
  const formatMB = (bytes) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    if (!videoFile) {
      setUploadError("Please select a video file to upload");
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    setUploadBytes({
      loaded: 0,
      total: 0
    });
    setUploadPhase("preparing");
    setUploadError(null);
    try {
      await uploadClassroomRecordingToCloudflare({
        file: videoFile,
        classroom: classroom.id,
        title: form.title,
        description: form.description,
        duration: form.duration,
        isPublished: form.isPublished,
        chapters: form.chapters,
        onProgress: ({
          loaded,
          total,
          percentage,
          part,
          totalParts
        }) => {
          setUploadPhase("uploading");
          setUploadProgress(percentage);
          setUploadBytes({
            loaded,
            total
          });
          if (part != null && totalParts != null) {
            setUploadPartInfo({
              part,
              totalParts
            });
          }
          if (percentage === 100) setUploadPhase("saving");
        }
      });
      setUploadPhase("idle");
      setForm({
        title: "",
        description: "",
        duration: 3600,
        isPublished: false,
        chapters: []
      });
      setVideoFile(null);
      setShowForm(false);
      await refreshClassroom();
    } catch (error) {
      setUploadPhase("idle");
      setUploadError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadBytes({
        loaded: 0,
        total: 0
      });
      setUploadPartInfo(null);
    }
  };
  const addChapter = () => {
    if (!chapterInput.title) return;
    setForm((f) => ({
      ...f,
      chapters: [...f.chapters, {
        id: uid(),
        ...chapterInput
      }]
    }));
    setChapterInput({
      title: "",
      startTimeSec: 0
    });
  };
  const handleConfirmReuse = async (e) => {
    e.preventDefault();
    if (!selectedSourceRecordingId || !reuseTitle) return;
    setIsReusing(true);
    setReuseError(null);
    try {
      await reuseClassroomRecording({
        sourceRecordingId: selectedSourceRecordingId,
        targetClassroomId: classroom.id,
        title: reuseTitle,
        description: reuseDescription
      });
      setShowReuseModal(false);
      setSelectedSourceClassroomId("");
      setSelectedSourceRecordingId("");
      setReuseTitle("");
      setReuseDescription("");
      await refreshClassroom();
      alert("Video recording reused successfully!");
    } catch (err) {
      setReuseError(err instanceof Error ? err.message : "Failed to reuse recording");
    } finally {
      setIsReusing(false);
    }
  };
  const streamUrl = activeRec ? activeRec.storageProvider === "cloudflare" ? `${getRecordingStreamUrl(activeRec.id)}${accessToken ? `?token=${encodeURIComponent(accessToken)}` : ""}` : activeRec.cloudflareUrl : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setShowForm(!showForm);
        setShowReuseModal(false);
      }, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuUpload, { className: "h-4 w-4" }),
        " Upload Recording"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        setShowReuseModal(!showReuseModal);
        setShowForm(false);
      }, className: "inline-flex items-center gap-2 rounded-full bg-cream/10 text-cream px-5 py-2.5 text-sm font-bold hover:bg-cream/20 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuCopy, { className: "h-4 w-4" }),
        " Reuse Video from other Class"
      ] })
    ] }),
    showReuseModal && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream mb-4", children: "Reuse Video from another Classroom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleConfirmReuse, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Source Classroom *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, value: selectedSourceClassroomId, onChange: (e) => {
            setSelectedSourceClassroomId(e.target.value);
            setSelectedSourceRecordingId("");
            setReuseTitle("");
            setReuseDescription("");
          }, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-plum-dark", children: "-- Select Class --" }),
            classrooms.filter((c) => c.id !== classroom.id && c.status === "active").map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, className: "bg-plum-dark", children: [
              c.name,
              " (",
              c.code,
              ")"
            ] }, c.id))
          ] })
        ] }),
        selectedSourceClassroomId && (() => {
          const sourceClassroom = classrooms.find((c) => c.id === selectedSourceClassroomId);
          const recordings = sourceClassroom ? sourceClassroom.recordings : [];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Select Recording *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, value: selectedSourceRecordingId, onChange: (e) => {
              const recId = e.target.value;
              setSelectedSourceRecordingId(recId);
              const r = recordings.find((x) => x.id === recId);
              if (r) {
                setReuseTitle(r.title);
                setReuseDescription(r.description || "");
              }
            }, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-plum-dark", children: "-- Select Recording --" }),
              recordings.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r.id, className: "bg-plum-dark", children: [
                r.title,
                " (",
                Math.round(r.duration / 60),
                " min)"
              ] }, r.id))
            ] })
          ] });
        })(),
        selectedSourceRecordingId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "New Recording Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: reuseTitle, onChange: (e) => setReuseTitle(e.target.value), placeholder: "Enter title for this class", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "New Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: reuseDescription, onChange: (e) => setReuseDescription(e.target.value), rows: 2, placeholder: "Enter description for this class", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            setShowReuseModal(false);
            setSelectedSourceClassroomId("");
            setSelectedSourceRecordingId("");
            setReuseTitle("");
            setReuseDescription("");
          }, disabled: isReusing, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold disabled:opacity-40", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !selectedSourceRecordingId || !reuseTitle || isReusing, className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-60", children: isReusing ? "Reusing..." : "Reuse Recording" })
        ] }),
        reuseError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400 mt-1", children: reuseError })
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream mb-4", children: "Upload Recorded Class" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpload, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Recording Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }), placeholder: "e.g. Module 3: Advanced Haemodynamics", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Video File *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "video/*", onChange: (e) => setVideoFile(e.target.files?.[0] ?? null), className: "w-full text-cream text-sm file:bg-cream/10 file:border-cream/10 file:rounded-xl file:px-3 file:py-2 file:text-cream" }),
          videoFile && (() => {
            const mb = videoFile.size / (1024 * 1024);
            const CHUNK_MB = 50;
            const isMultipart = mb >= CHUNK_MB;
            const parts = isMultipart ? Math.ceil(mb / CHUNK_MB) : null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/50", children: [
                videoFile.name,
                " — ",
                mb.toFixed(1),
                " MB"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${isMultipart ? "bg-lime/15 text-lime" : "bg-cream/10 text-cream/60"}`, children: isMultipart ? `⚡ Multipart · ${parts} × 50 MB chunks` : "↑ Single upload" })
            ] });
          })()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), rows: 2, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Duration (seconds)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 60, value: form.duration, onChange: (e) => setForm({
            ...form,
            duration: Number(e.target.value)
          }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-2", children: "Chapter Markers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: chapterInput.title, onChange: (e) => setChapterInput({
              ...chapterInput,
              title: e.target.value
            }), placeholder: "Chapter title", className: "flex-1 bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream text-xs outline-none focus:border-lime/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, value: chapterInput.startTimeSec, onChange: (e) => setChapterInput({
              ...chapterInput,
              startTimeSec: Number(e.target.value)
            }), placeholder: "Start (sec)", className: "w-24 bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream text-xs outline-none focus:border-lime/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: addChapter, className: "rounded-xl bg-lime/10 text-lime px-3 py-2 text-xs font-bold", children: "+ Add" })
          ] }),
          form.chapters.map((ch, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-cream/5 rounded-lg px-3 py-1.5 mb-1 text-xs text-cream/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lime", children: [
              Math.floor(ch.startTimeSec / 60).toString().padStart(2, "0"),
              ":",
              (ch.startTimeSec % 60).toString().padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: ch.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setForm((f) => ({
              ...f,
              chapters: f.chapters.filter((_, ci) => ci !== i)
            })), className: "text-cream/40 hover:text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuX, { className: "h-3 w-3" }) })
          ] }, ch.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.isPublished, onChange: (e) => setForm({
            ...form,
            isPublished: e.target.checked
          }), className: "accent-lime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 text-sm", children: "Publish immediately (notify students)" })
        ] }),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 border border-cream/10 p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-cream/80", children: [
              uploadPhase === "preparing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-3 rounded-full border-2 border-lime border-t-transparent animate-spin" }),
                uploadPartInfo ? `Initiating multipart upload…` : "Preparing upload…"
              ] }),
              uploadPhase === "uploading" && uploadPartInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-lime animate-pulse" }),
                "Part ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime font-bold", children: uploadPartInfo.part }),
                " of ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime font-bold", children: uploadPartInfo.totalParts }),
                " uploading…"
              ] }),
              uploadPhase === "uploading" && !uploadPartInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-lime animate-pulse" }),
                "Uploading to cloud…"
              ] }),
              uploadPhase === "saving" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-lime" }),
                "Saving metadata…"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-lime text-sm font-bold", children: [
              uploadProgress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-3 bg-cream/10 rounded-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 bg-lime rounded-full transition-all duration-200", style: {
              width: `${uploadPhase === "saving" ? 100 : uploadProgress}%`
            } }),
            uploadPartInfo && uploadPartInfo.totalParts > 1 && Array.from({
              length: uploadPartInfo.totalParts - 1
            }, (_, i) => {
              const pct = (i + 1) / uploadPartInfo.totalParts * 100;
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 w-px bg-cream/20", style: {
                left: `${pct}%`
              } }, i);
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 font-mono", children: uploadPhase === "uploading" ? `${formatMB(uploadBytes.loaded)} / ${formatMB(uploadBytes.total)}` : uploadPhase === "saving" ? `${formatMB(uploadBytes.total)} — assembling on R2…` : "Connecting…" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `uppercase tracking-widest font-bold px-2 py-0.5 rounded ${uploadPartInfo ? "bg-lime/15 text-lime" : "bg-cream/10 text-cream/50"}`, children: uploadPartInfo ? `⚡ Multipart · ${uploadPartInfo.totalParts} chunks` : "↑ Direct upload" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowForm(false), disabled: uploading, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold disabled:opacity-40", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: uploading, className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-60", children: uploading ? uploadPhase === "saving" ? "Saving…" : uploadPartInfo ? `Part ${uploadPartInfo.part}/${uploadPartInfo.totalParts} — ${uploadProgress}%` : uploadProgress > 0 ? `Uploading… ${uploadProgress}%` : "Preparing…" : "Save Recording" })
        ] }),
        uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400 mt-1", children: uploadError })
      ] })
    ] }),
    cls.recordings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuBookOpen, { className: "h-8 w-8 text-cream/20 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No recordings uploaded yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cls.recordings.map((rec) => {
      const avgWatch = rec.viewStats.length ? Math.round(rec.viewStats.reduce((s, v) => s + v.watchedPercent, 0) / rec.viewStats.length) : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveRec(rec), className: "w-20 h-14 rounded-lg bg-linear-to-br from-lime/20 to-lime/5 flex items-center justify-center shrink-0 hover:from-lime/30 hover:to-lime/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlay, { className: "h-5 w-5 text-lime" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream text-sm", children: rec.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${rec.isPublished ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/60"}`, children: rec.isPublished ? "Published" : "Draft" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-xs mt-0.5 line-clamp-1", children: rec.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/50 font-mono", children: formatDuration(rec.duration) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/50", children: [
                rec.viewStats.length,
                " viewers · ",
                avgWatch,
                "% avg watched"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/50", children: [
                rec.chapters.length,
                " chapters"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveRec(rec), className: "rounded-full bg-lime text-plum-dark px-3.5 py-1.5 text-xs font-bold flex items-center gap-1 hover:bg-lime/90 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlay, { className: "h-3 w-3 fill-plum-dark animate-pulse" }),
              " Watch"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
              console.log("PUBLISH BUTTON CLICKED");
              console.log("Recording:", rec);
              console.log("Recording ID:", rec.id);
              console.log("Published:", rec.isPublished);
              try {
                if (rec.isPublished) {
                  console.log("Calling unpublishRecording...");
                  await unpublishRecording(rec.id);
                } else {
                  console.log("Calling publishRecording...");
                  await publishRecording(rec.id);
                }
                console.log("Refresh classroom...");
                await refreshClassroom();
              } catch (error) {
                console.error("Publish/Unpublish Error:", error);
              }
            }, className: `rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 ${rec.isPublished ? "bg-cream/10 text-cream/70" : "bg-lime/10 text-lime"}`, children: rec.isPublished ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuEyeOff, { className: "h-3 w-3" }),
              " Unpublish"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuEye, { className: "h-3 w-3" }),
              " Publish"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
              try {
                await deleteRecording(rec.id);
                await refreshClassroom();
              } catch (error) {
                console.error("Failed to delete recording", error);
              }
            }, className: "rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuTrash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }),
        rec.viewStats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-cream/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/50 mb-2", children: "Viewer Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: rec.viewStats.map((vs) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/80 w-32 truncate", children: vs.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full", style: {
              width: `${vs.watchedPercent}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-cream/60 w-8", children: [
              vs.watchedPercent,
              "%"
            ] })
          ] }, vs.studentId)) })
        ] })
      ] }, rec.id);
    }) }),
    activeRec && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-[#110D26] border-b border-cream/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-sm truncate", children: activeRec.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-[10px] uppercase tracking-widest font-mono font-medium", children: "Admin Video Preview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveRec(null), className: "text-white/60 hover:text-white p-1 hover:bg-cream/10 rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuX, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-black flex items-center justify-center relative", children: streamUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: streamUrl, crossOrigin: "use-credentials", className: "w-full h-full max-h-[85vh] object-contain bg-black", controls: true, autoPlay: true, poster: "/default-video-thumb.jpg" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "Video stream URL not configured." }) }),
        activeRec.chapters && activeRec.chapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64 bg-[#110D26] border-l border-cream/10 overflow-y-auto animate-in slide-in-from-right duration-250", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-cream/10 text-white/70 text-xs uppercase tracking-widest font-bold", children: "Chapters" }),
          activeRec.chapters.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            const video = document.querySelector("video");
            if (video) {
              video.currentTime = ch.startTimeSec;
              video.play().catch(() => {
              });
            }
          }, className: "w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-cream/5 border-b border-cream/5 text-cream/70 hover:text-cream transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-lime font-bold shrink-0", children: [
              Math.floor(ch.startTimeSec / 60).toString().padStart(2, "0"),
              ":",
              (ch.startTimeSec % 60).toString().padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate font-medium", children: ch.title })
          ] }, ch.id))
        ] })
      ] })
    ] })
  ] });
}
function newQuestion(order, defaultMarks = 1) {
  return {
    id: uid(),
    type: "mcq",
    text: "",
    marks: defaultMarks,
    explanation: "",
    order,
    options: [{
      label: "A",
      text: "",
      isCorrect: false
    }, {
      label: "B",
      text: "",
      isCorrect: false
    }, {
      label: "C",
      text: "",
      isCorrect: false
    }, {
      label: "D",
      text: "",
      isCorrect: false
    }]
  };
}
function QuestionCard({
  q,
  qIdx,
  onChange,
  onRemove
}) {
  const setType = (type) => {
    const opts = type === "true_false" ? [{
      label: "True",
      text: "True",
      isCorrect: true
    }, {
      label: "False",
      text: "False",
      isCorrect: false
    }] : [{
      label: "A",
      text: "",
      isCorrect: false
    }, {
      label: "B",
      text: "",
      isCorrect: false
    }, {
      label: "C",
      text: "",
      isCorrect: false
    }, {
      label: "D",
      text: "",
      isCorrect: false
    }];
    onChange({
      ...q,
      type,
      options: opts
    });
  };
  const toggleCorrect = (label) => {
    onChange({
      ...q,
      options: q.options.map((o) => ({
        ...o,
        isCorrect: q.type === "msq" ? o.label === label ? !o.isCorrect : o.isCorrect : o.label === label
      }))
    });
  };
  const LABELS = ["A", "B", "C", "D", "E", "F"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/3 border border-cream/10 p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-lime/10 text-lime text-xs font-bold shrink-0", children: [
        "Q",
        qIdx + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: q.type, onChange: (e) => setType(e.target.value), className: "bg-cream/5 border border-cream/10 rounded-lg px-3 py-1.5 text-cream text-xs outline-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mcq", children: "Single Correct (MCQ)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "msq", children: "Multiple Correct (MSQ)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "true_false", children: "True / False" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0.5, step: 0.5, value: q.marks, onChange: (e) => onChange({
          ...q,
          marks: Number(e.target.value)
        }), className: "w-16 bg-cream/5 border border-cream/10 rounded-lg px-2 py-1.5 text-cream text-xs outline-none text-center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-xs", children: "marks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onRemove, className: "text-cream/30 hover:text-red-400 ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuTrash2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: q.text, onChange: (e) => onChange({
      ...q,
      text: e.target.value
    }), placeholder: `Question ${qIdx + 1} text…`, rows: 2, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-3 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      q.options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors ${opt.isCorrect ? "border-lime/40 bg-lime/5" : "border-cream/10 bg-cream/2"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleCorrect(opt.label), className: `h-5 w-5 shrink-0 rounded-full grid place-items-center text-[10px] font-bold border transition-colors ${opt.isCorrect ? "bg-lime border-lime text-plum-dark" : "border-cream/30 text-cream/50"}`, children: opt.isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(LuCheck, { className: "h-3 w-3" }) : opt.label }),
        q.type === "true_false" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm text-cream/80", children: opt.text }) : /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: opt.text, onChange: (e) => {
          const opts = [...q.options];
          opts[oi] = {
            ...opts[oi],
            text: e.target.value
          };
          onChange({
            ...q,
            options: opts
          });
        }, placeholder: `Option ${opt.label}`, className: "flex-1 bg-transparent outline-none text-sm text-cream placeholder:text-cream/30" })
      ] }, opt.label)),
      q.type !== "true_false" && q.options.length < 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onChange({
        ...q,
        options: [...q.options, {
          label: LABELS[q.options.length] || `Opt${q.options.length + 1}`,
          text: "",
          isCorrect: false
        }]
      }), className: "text-lime/70 hover:text-lime text-xs flex items-center gap-1 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlus, { className: "h-3 w-3" }),
        " Add option"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q.explanation, onChange: (e) => onChange({
      ...q,
      explanation: e.target.value
    }), placeholder: "Explanation shown to student after submission (optional)", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream/70 text-xs outline-none focus:border-lime/50" })
  ] });
}
function TestsTab({
  classroom,
  refreshClassroom
}) {
  const cls = classroom;
  const classroomId = classroom.id;
  const {
    classrooms
  } = useClassroomStore();
  const [isSavingQuiz, setIsSavingQuiz] = reactExports.useState(false);
  const [saveError, setSaveError] = reactExports.useState(null);
  const [quizOperationQuizId, setQuizOperationQuizId] = reactExports.useState(null);
  const [showBuilder, setShowBuilder] = reactExports.useState(false);
  const [viewQuizId, setViewQuizId] = reactExports.useState(null);
  const [reportAttempts, setReportAttempts] = reactExports.useState([]);
  const [isLoadingReport, setIsLoadingReport] = reactExports.useState(false);
  const [reportError, setReportError] = reactExports.useState("");
  const [editingQuizId, setEditingQuizId] = reactExports.useState(null);
  const [duplicateQuiz, setDuplicateQuiz] = reactExports.useState(null);
  const [selectedTargetClassrooms, setSelectedTargetClassrooms] = reactExports.useState([]);
  const [isDuplicating, setIsDuplicating] = reactExports.useState(false);
  const [bulkMarksEnabled, setBulkMarksEnabled] = reactExports.useState(false);
  const [bulkMarksValue, setBulkMarksValue] = reactExports.useState(4);
  const [bulkNegEnabled, setBulkNegEnabled] = reactExports.useState(false);
  const [bulkNegValue, setBulkNegValue] = reactExports.useState(1);
  React__default.useEffect(() => {
    if (!viewQuizId) {
      setReportAttempts([]);
      setReportError("");
      return;
    }
    let active = true;
    const loadReport = async () => {
      setIsLoadingReport(true);
      setReportError("");
      try {
        const attempts = await getQuizReport(viewQuizId);
        if (!active) return;
        setReportAttempts(attempts);
      } catch (err) {
        if (active) setReportError(err instanceof Error ? err.message : "Could not load quiz report");
      } finally {
        if (active) setIsLoadingReport(false);
      }
    };
    loadReport();
    return () => {
      active = false;
    };
  }, [viewQuizId]);
  const [quiz, setQuiz] = reactExports.useState({
    title: "",
    instructions: "",
    duration: null,
    maxAttempts: 1,
    randomizeQuestions: true,
    randomizeOptions: true,
    showLeaderboard: false,
    negativeMarking: true,
    negativeMarkValue: 1,
    passPercent: 60,
    availableFrom: "",
    availableUntil: "",
    status: "draft",
    questions: []
  });
  const updateQ = (idx, updated) => {
    setQuiz((q) => {
      const qs = [...q.questions];
      qs[idx] = updated;
      return {
        ...q,
        questions: qs
      };
    });
    if (updated.marks !== bulkMarksValue) {
      setBulkMarksEnabled(false);
    }
  };
  const totalMarks = quiz.questions.reduce((s, q) => s + q.marks, 0);
  const handleSave = async (status) => {
    if (!quiz.title || quiz.questions.length === 0) return;
    setSaveError(null);
    setIsSavingQuiz(true);
    try {
      if (editingQuizId) {
        const updatedQuiz = await updateQuiz(editingQuizId, {
          ...quiz,
          status
        });
        classroomActions.updateQuiz(classroomId, editingQuizId, updatedQuiz);
      } else {
        const createdQuiz = await createQuiz(classroomId, {
          ...quiz,
          status
        });
        classroomActions.addQuiz(classroomId, createdQuiz);
      }
      setShowBuilder(false);
      setEditingQuizId(null);
      setQuiz({
        title: "",
        instructions: "",
        duration: null,
        maxAttempts: 1,
        randomizeQuestions: true,
        randomizeOptions: true,
        showLeaderboard: false,
        negativeMarking: true,
        negativeMarkValue: 1,
        passPercent: 60,
        availableFrom: "",
        availableUntil: "",
        status: "draft",
        questions: []
      });
      setBulkMarksEnabled(false);
      setBulkMarksValue(4);
      setBulkNegEnabled(false);
      setBulkNegValue(1);
    } catch (error) {
      console.error(error);
      setSaveError(error instanceof Error ? error.message : "Could not save quiz.");
    } finally {
      setIsSavingQuiz(false);
    }
  };
  const handlePublishQuiz = async (quizId) => {
    setQuizOperationQuizId(quizId);
    try {
      await publishQuiz(quizId);
      classroomActions.updateQuizStatus(classroomId, quizId, "published");
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };
  const handleCloseQuiz = async (quizId) => {
    setQuizOperationQuizId(quizId);
    try {
      await closeQuiz(quizId);
      classroomActions.updateQuizStatus(classroomId, quizId, "closed");
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };
  const handleDeleteQuiz = async (quizId) => {
    setQuizOperationQuizId(quizId);
    try {
      await deleteQuiz(quizId);
      classroomActions.deleteQuiz(classroomId, quizId);
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };
  const handleDownloadQuiz = (q, format) => {
    let txt = ``;
    q.questions.forEach((quest, i) => {
      txt += `${i + 1}. ${quest.text}
`;
      quest.options.forEach((opt) => {
        txt += `  Option ${opt.label}: ${opt.text}
`;
      });
      if (quest.explanation) {
        txt += `  Explanation: ${quest.explanation}
`;
      }
      const correctOpt = quest.options.find((o) => o.isCorrect);
      if (correctOpt) {
        txt += `  Ans: Option ${correctOpt.label}
`;
      }
      txt += `
`;
    });
    if (format === "doc") {
      const blob = new Blob([txt], {
        type: "application/msword"
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${q.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_quiz.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${q.title}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; padding: 40px; white-space: pre-wrap; color: black; background: white; }
              </style>
            </head>
            <body>${txt.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      } else {
        alert("Please allow popups to generate PDF");
      }
    }
  };
  const handleDuplicateConfirm = async () => {
    if (!duplicateQuiz || selectedTargetClassrooms.length === 0) return;
    setIsDuplicating(true);
    try {
      const quizData = {
        title: `${duplicateQuiz.title}`,
        instructions: duplicateQuiz.instructions,
        duration: duplicateQuiz.duration,
        maxAttempts: duplicateQuiz.maxAttempts,
        randomizeQuestions: duplicateQuiz.randomizeQuestions,
        randomizeOptions: duplicateQuiz.randomizeOptions,
        showLeaderboard: duplicateQuiz.showLeaderboard,
        negativeMarking: duplicateQuiz.negativeMarking,
        negativeMarkValue: duplicateQuiz.negativeMarkValue,
        passPercent: duplicateQuiz.passPercent,
        availableFrom: duplicateQuiz.availableFrom,
        availableUntil: duplicateQuiz.availableUntil,
        status: "draft",
        questions: duplicateQuiz.questions.map((quest) => ({
          type: quest.type,
          text: quest.text,
          marks: quest.marks,
          explanation: quest.explanation,
          options: quest.options.map((o) => ({
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect
          }))
        }))
      };
      for (const targetId of selectedTargetClassrooms) {
        await createQuiz(targetId, quizData);
      }
      alert("Quiz duplicated successfully to selected class(es)!");
      setDuplicateQuiz(null);
      setSelectedTargetClassrooms([]);
      await refreshClassroom();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Duplication failed");
    } finally {
      setIsDuplicating(false);
    }
  };
  if (showBuilder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setShowBuilder(false);
          setEditingQuizId(null);
          setQuiz({
            title: "",
            instructions: "",
            duration: null,
            maxAttempts: 1,
            randomizeQuestions: true,
            randomizeOptions: true,
            showLeaderboard: false,
            negativeMarking: false,
            negativeMarkValue: 0.25,
            passPercent: 60,
            availableFrom: "",
            availableUntil: "",
            status: "draft",
            questions: []
          });
          setBulkMarksEnabled(false);
          setBulkMarksValue(1);
          setBulkNegEnabled(true);
          setBulkNegValue(1);
        }, className: "text-cream/60 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-cream text-xl", children: editingQuizId ? "Edit Quiz" : "Quiz Builder" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream", children: "Quiz Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Quiz Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: quiz.title, onChange: (e) => setQuiz({
            ...quiz,
            title: e.target.value
          }), placeholder: "e.g. Module 2 Assessment — Ventilator Management", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Instructions for students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: quiz.instructions, onChange: (e) => setQuiz({
            ...quiz,
            instructions: e.target.value
          }), rows: 2, className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Timer (min, blank = no timer)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: quiz.duration ?? "", onChange: (e) => setQuiz({
              ...quiz,
              duration: e.target.value ? Number(e.target.value) : null
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Max Attempts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, value: quiz.maxAttempts, onChange: (e) => setQuiz({
              ...quiz,
              maxAttempts: Number(e.target.value)
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Pass Mark %" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 100, value: quiz.passPercent, onChange: (e) => setQuiz({
              ...quiz,
              passPercent: Number(e.target.value)
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Available From" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "datetime-local", value: quiz.availableFrom, onChange: (e) => setQuiz({
              ...quiz,
              availableFrom: e.target.value
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-cream/60 block mb-1", children: "Available Until" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "datetime-local", value: quiz.availableUntil, onChange: (e) => setQuiz({
              ...quiz,
              availableUntil: e.target.value
            }), className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4", children: [{
          key: "randomizeQuestions",
          label: "Randomize question order"
        }, {
          key: "randomizeOptions",
          label: "Randomize option order"
        }, {
          key: "negativeMarking",
          label: "Negative marking (−1/wrong)"
        }, {
          key: "showLeaderboard",
          label: "Show leaderboard to students"
        }].map(({
          key,
          label
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: Boolean(quiz[key]), onChange: (e) => setQuiz({
            ...quiz,
            [key]: e.target.checked
          }), className: "accent-lime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 text-sm", children: label })
        ] }, key)) })
      ] }),
      quiz.questions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/70 text-sm font-semibold", children: "Quick apply to all questions:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: bulkMarksEnabled, className: "accent-lime h-4 w-4", onChange: (e) => {
              setBulkMarksEnabled(e.target.checked);
              if (e.target.checked) {
                setQuiz((q) => ({
                  ...q,
                  questions: q.questions.map((quest) => ({
                    ...quest,
                    marks: bulkMarksValue
                  }))
                }));
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 text-sm", children: "Fix marks:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0.5, step: 0.5, value: bulkMarksValue, onChange: (e) => {
              const val = Number(e.target.value);
              setBulkMarksValue(val);
              if (bulkMarksEnabled && val > 0) {
                setQuiz((q) => ({
                  ...q,
                  questions: q.questions.map((quest) => ({
                    ...quest,
                    marks: val
                  }))
                }));
              }
            }, className: "w-16 bg-cream/5 border border-cream/20 rounded-lg px-2 py-1 text-cream text-xs outline-none text-center focus:border-lime/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-xs", children: "marks / question" })
          ] }),
          quiz.negativeMarking && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: bulkNegEnabled, className: "accent-red-400 h-4 w-4", onChange: (e) => {
              setBulkNegEnabled(e.target.checked);
              if (e.target.checked) {
                setQuiz((q) => ({
                  ...q,
                  negativeMarkValue: bulkNegValue
                }));
              }
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/80 text-sm", children: "Fix negative mark:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0.25, step: 0.25, value: bulkNegValue, onChange: (e) => {
              const val = Number(e.target.value);
              setBulkNegValue(val);
              if (bulkNegEnabled && val > 0) {
                setQuiz((q) => ({
                  ...q,
                  negativeMarkValue: val
                }));
              }
            }, className: "w-16 bg-cream/5 border border-cream/20 rounded-lg px-2 py-1 text-cream text-xs outline-none text-center focus:border-red-400/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/50 text-xs", children: "marks deducted" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: quiz.questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCard, { q, qIdx: i, onChange: (u) => updateQ(i, u), onRemove: () => setQuiz((qz) => ({
        ...qz,
        questions: qz.questions.filter((_, ci) => ci !== i)
      })) }, q.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setQuiz((q) => ({
        ...q,
        questions: [...q.questions, newQuestion(q.questions.length + 1, bulkMarksEnabled ? bulkMarksValue : 1)]
      })), className: "w-full rounded-2xl border-2 border-dashed border-lime/20 hover:border-lime/40 py-5 text-lime/70 hover:text-lime text-sm font-semibold flex items-center justify-center gap-2 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlus, { className: "h-4 w-4" }),
        " Add Question"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-cream/5 px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/60 text-sm", children: [
          "Questions: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-cream", children: quiz.questions.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/60 text-sm", children: [
          "Total marks: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-cream", children: totalMarks })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/60 text-sm", children: [
          "Est. time: ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-cream", children: [
            "~",
            quiz.questions.length * 2,
            "m"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSave("draft"), disabled: quiz.questions.length === 0 || isSavingQuiz, className: "flex-1 rounded-full bg-cream/10 text-cream py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50", children: isSavingQuiz ? "Saving..." : "Save Draft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSave("published"), disabled: quiz.questions.length === 0 || isSavingQuiz, className: "flex-1 rounded-full bg-lime text-plum-dark py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50", children: isSavingQuiz ? "Publishing..." : "Publish & Notify Students" })
      ] }),
      saveError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400 mt-2", children: saveError })
    ] });
  }
  if (viewQuizId) {
    const q = cls.quizzes.find((x) => x.id === viewQuizId);
    if (!q) return null;
    const submitted = reportAttempts.filter((a) => a.status === "submitted");
    const passRate = submitted.length ? Math.round(submitted.filter((a) => a.score.passed).length / submitted.length * 100) : 0;
    const avgScore = submitted.length ? Math.round(submitted.reduce((s, a) => s + a.score.percentage, 0) / submitted.length) : 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewQuizId(null), className: "text-cream/60 hover:text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-cream", children: [
            q.title,
            " — Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-xs", children: isLoadingReport ? "Loading submissions…" : `${submitted.length} submissions · ${passRate}% pass rate · ${avgScore}% avg score` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void refreshClassroom().then(() => getQuizReport(viewQuizId).then(setReportAttempts)), disabled: isLoadingReport, className: "rounded-full bg-cream/10 text-cream px-3 py-1.5 text-xs font-semibold disabled:opacity-40", children: "Refresh" })
      ] }),
      reportError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300", children: reportError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [{
        l: "Submitted",
        v: submitted.length
      }, {
        l: "Pass Rate",
        v: `${passRate}%`
      }, {
        l: "Avg Score",
        v: `${avgScore}%`
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-cream mt-1", children: s.v })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-cream/60 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Submitted" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          submitted.map((att) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-cream", children: att.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80", children: [
              att.score.rawMarks,
              "/",
              att.score.totalMarks
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80", children: [
              att.score.percentage,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${att.score.passed ? "bg-lime/20 text-lime" : "bg-red-500/20 text-red-300"}`, children: att.score.passed ? "Pass" : "Fail" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/60 text-xs", children: att.submittedAt ? fmtDate(att.submittedAt) : "—" })
          ] }, att.id)),
          isLoadingReport && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-cream/50 text-sm", children: "Loading report…" }) }),
          !isLoadingReport && submitted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-6 text-center text-cream/50 text-sm", children: "No submissions yet." }) })
        ] })
      ] }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setEditingQuizId(null);
      setQuiz({
        title: "",
        instructions: "",
        duration: null,
        maxAttempts: 1,
        randomizeQuestions: true,
        randomizeOptions: true,
        showLeaderboard: false,
        negativeMarking: true,
        negativeMarkValue: 1,
        passPercent: 60,
        availableFrom: "",
        availableUntil: "",
        status: "draft",
        questions: []
      });
      setBulkMarksEnabled(false);
      setBulkMarksValue(1);
      setBulkNegEnabled(false);
      setBulkNegValue(1);
      setShowBuilder(true);
    }, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlus, { className: "h-4 w-4" }),
      " Create Quiz"
    ] }) }),
    cls.quizzes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuClipboardList, { className: "h-8 w-8 text-cream/20 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No quizzes created yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cls.quizzes.map((q) => {
      const subCount = q.attempts.filter((a) => a.status === "submitted").length;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream", children: q.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${q.status === "published" ? "bg-lime/20 text-lime" : q.status === "closed" ? "bg-cream/10 text-cream/60" : "bg-yellow-500/20 text-yellow-300"}`, children: q.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-xs text-cream/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              q.questions.length,
              " questions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              q.questions.reduce((s, x) => s + x.marks, 0),
              " total marks"
            ] }),
            q.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              q.duration,
              " min timer"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              subCount,
              " submissions"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Pass: ",
              q.passPercent,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setViewQuizId(q.id), className: "rounded-full bg-cream/10 text-cream px-3 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-cream/20 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LuEye, { className: "h-3 w-3" }),
            " Report"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setEditingQuizId(q.id);
            setQuiz({
              title: q.title,
              instructions: q.instructions || "",
              duration: q.duration,
              maxAttempts: q.maxAttempts || 1,
              randomizeQuestions: q.randomizeQuestions ?? true,
              randomizeOptions: q.randomizeOptions ?? true,
              showLeaderboard: q.showLeaderboard ?? false,
              negativeMarking: q.negativeMarking ?? false,
              negativeMarkValue: q.negativeMarkValue ?? 0.25,
              passPercent: q.passPercent || 60,
              availableFrom: q.availableFrom || "",
              availableUntil: q.availableUntil || "",
              status: q.status || "draft",
              questions: q.questions || []
            });
            const hasQuestions = q.questions && q.questions.length > 0;
            const allSameMarks = hasQuestions && q.questions.every((quest) => quest.marks === q.questions[0].marks);
            if (allSameMarks) {
              setBulkMarksEnabled(true);
              setBulkMarksValue(q.questions[0].marks);
            } else {
              setBulkMarksEnabled(false);
              setBulkMarksValue(1);
            }
            setBulkNegEnabled(q.negativeMarking ?? false);
            setBulkNegValue(q.negativeMarkValue ?? 0);
            setShowBuilder(true);
          }, className: "rounded-full bg-cream/10 text-cream px-3 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-cream/20 transition-colors", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setDuplicateQuiz(q);
            setSelectedTargetClassrooms([]);
          }, className: "rounded-full bg-cream/10 text-cream px-3 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-cream/20 transition-colors", title: "Reuse/Duplicate to another class", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LuCopy, { className: "h-3 w-3" }),
            " Reuse"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDownloadQuiz(q, "pdf"), className: "rounded-full bg-cream/10 text-cream px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-cream/20 transition-colors", title: "Download Quiz as PDF", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LuDownload, { className: "h-3.5 w-3.5" }),
            " PDF"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDownloadQuiz(q, "doc"), className: "rounded-full bg-cream/10 text-cream px-2.5 py-1.5 text-xs font-semibold flex items-center gap-1 hover:bg-cream/20 transition-colors", title: "Download Quiz as Word Doc", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LuDownload, { className: "h-3.5 w-3.5" }),
            " DOC"
          ] }),
          q.status === "draft" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handlePublishQuiz(q.id), disabled: quizOperationQuizId === q.id, className: "rounded-full bg-lime/10 text-lime px-3 py-1.5 text-xs font-semibold hover:bg-lime/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", children: quizOperationQuizId === q.id ? "Publishing..." : "Publish" }),
          q.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCloseQuiz(q.id), disabled: quizOperationQuizId === q.id, className: "rounded-full bg-cream/10 text-cream/70 px-3 py-1.5 text-xs font-semibold hover:bg-cream/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", children: quizOperationQuizId === q.id ? "Closing..." : "Close" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleDeleteQuiz(q.id), disabled: quizOperationQuizId === q.id, className: "rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuTrash2, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }) }, q.id);
    }) }),
    duplicateQuiz && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#1A0F33] border border-cream/10 rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-cream/10 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream", children: "Reuse Quiz in other Classes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDuplicateQuiz(null), className: "text-cream/50 hover:text-cream p-1 rounded-full hover:bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuX, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4 max-h-[60vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-cream/70 mb-2", children: [
          "Duplicate ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-lime", children: duplicateQuiz.title }),
          " to the following classroom(s):"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          classrooms.filter((c) => c.id !== classroomId && c.status === "active").map((targetCls) => {
            const isChecked = selectedTargetClassrooms.includes(targetCls.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 bg-cream/5 border border-cream/10 rounded-xl p-3 cursor-pointer hover:border-lime/30 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isChecked, onChange: (e) => {
                if (e.target.checked) {
                  setSelectedTargetClassrooms([...selectedTargetClassrooms, targetCls.id]);
                } else {
                  setSelectedTargetClassrooms(selectedTargetClassrooms.filter((id) => id !== targetCls.id));
                }
              }, className: "accent-lime h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-cream", children: targetCls.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-mono text-cream/50 uppercase tracking-widest", children: [
                  targetCls.code,
                  " · ",
                  targetCls.program
                ] })
              ] })
            ] }, targetCls.id);
          }),
          classrooms.filter((c) => c.id !== classroomId && c.status === "active").length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/40 text-center py-4", children: "No other active classes available." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 bg-black/20 border-t border-cream/10 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDuplicateQuiz(null), disabled: isDuplicating, className: "flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold disabled:opacity-40", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleDuplicateConfirm, disabled: selectedTargetClassrooms.length === 0 || isDuplicating, className: "flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-40", children: isDuplicating ? "Duplicating…" : "Confirm Duplicate" })
      ] })
    ] }) })
  ] });
}
function StudentsTab({
  classroom,
  refreshClassroom
}) {
  const {
    users
  } = useClassroomStore();
  const cls = classroom;
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [mongoStudents, setMongoStudents] = reactExports.useState([]);
  const [isAdding, setIsAdding] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  React__default.useEffect(() => {
    let active = true;
    const loadStudents = async () => {
      try {
        const students = await getAdminUsers("student");
        if (!active) return;
        setMongoStudents(students);
        setError("");
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Could not load students from MongoDB");
      }
    };
    loadStudents();
    return () => {
      active = false;
    };
  }, []);
  const refreshClassroomLocal = refreshClassroom;
  const handleAddStudent = async (studentId) => {
    setError("");
    setIsAdding(studentId);
    try {
      await addStudentsToClassroom(classroom.id, [studentId]);
      await refreshClassroomLocal();
      setShowAdd(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add student to classroom");
    } finally {
      setIsAdding(null);
    }
  };
  const handleStatusChange = async (studentId, status) => {
    setError("");
    try {
      await updateClassroomStudentStatus(classroom.id, studentId, status);
      await refreshClassroomLocal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update student status");
    }
  };
  const studentsOnly = mongoStudents.length > 0 ? mongoStudents : users.filter((u) => u.role === "student");
  const notEnrolled = studentsOnly.filter((s) => !cls.students.find((cs) => cs.id === s.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm", children: [
        cls.students.length,
        " enrolled · ",
        cls.students.filter((s) => s.status === "active").length,
        " active"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAdd(!showAdd), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuPlus, { className: "h-4 w-4" }),
        " Add Student"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-400", children: error }),
    showAdd && notEnrolled.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream mb-3", children: "Add Students to Classroom" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: notEnrolled.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-cream/5 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream text-sm font-semibold", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/60 text-xs", children: s.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleAddStudent(s.id), disabled: isAdding === s.id, className: "rounded-full bg-lime text-plum-dark px-4 py-1.5 text-xs font-bold disabled:opacity-60", children: isAdding === s.id ? "Adding..." : "Add" })
      ] }, s.id)) })
    ] }),
    showAdd && notEnrolled.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No available MongoDB students to add." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "p-0 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-cream/60 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Attendance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Quiz Avg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        cls.students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-8 text-center text-cream/50", children: "No students enrolled yet." }) }),
        cls.students.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-lime text-plum-dark text-xs font-bold shrink-0", children: s.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-cream", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/60 font-mono", children: s.enrollmentId })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-28", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full", style: {
              width: `${s.progress}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-cream/70", children: [
              s.progress,
              "%"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80 text-sm", children: [
            s.attendance,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-cream/80 text-sm", children: [
            s.quizAvg,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${s.status === "active" ? "bg-lime/20 text-lime" : s.status === "held" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}`, children: s.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: s.status, onChange: (e) => handleStatusChange(s.id, e.target.value), className: "bg-[#1A0F33] border border-cream/10 rounded-lg px-2 py-1 text-cream/70 text-xs outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "held", children: "Hold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "removed", children: "Remove" })
          ] }) })
        ] }, s.id))
      ] })
    ] }) })
  ] });
}
function AdminClassroomDetail() {
  const params = Route$2.useParams();
  const id = params.id;
  const {
    classrooms
  } = useClassroomStore();
  const storeClassroom = React__default.useMemo(() => classrooms.find((c) => c.id === id) ?? null, [classrooms, id]);
  const [isLoading, setIsLoading] = reactExports.useState(!storeClassroom);
  const [loadError, setLoadError] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState("announcements");
  const refreshClassroom = React__default.useCallback(async () => {
    const refreshed = await getClassroomById(id);
    if (storeClassroom) {
      classroomActions.updateClassroom(id, refreshed);
    } else {
      classroomActions.addClassroom(refreshed);
    }
    markClassroomFresh(id);
    return refreshed;
  }, [id, storeClassroom]);
  React__default.useEffect(() => {
    let active = true;
    const load = async () => {
      if (storeClassroom && !isClassroomStale(id)) return;
      try {
        setLoadError(null);
        if (!storeClassroom) setIsLoading(true);
        await refreshClassroom();
      } catch (err) {
        if (active && !storeClassroom) {
          setLoadError(err instanceof Error ? err.message : "Could not load classroom by id");
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id]);
  const classroom = React__default.useMemo(() => storeClassroom, [storeClassroom]);
  if (isLoading && !classroom) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream text-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60", children: "Loading classroom..." }) });
  }
  if (loadError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-red-400", children: [
        "Error loading classroom: ",
        loadError
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/classrooms", className: "mt-4 text-lime block", children: "← Back to Classrooms" })
    ] });
  }
  if (!classroom) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cream text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60", children: "Classroom not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/classrooms", className: "mt-4 text-lime block", children: "← Back to Classrooms" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/classrooms", className: "text-cream/60 hover:text-cream mt-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuArrowLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: classroom.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${classroom.status === "active" ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/60"}`, children: classroom.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-cream/50", children: classroom.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60 text-xs", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/60 text-xs", children: [
            classroom.students.filter((s) => s.status === "active").length,
            " / ",
            classroom.maxStudents,
            " students"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60 text-xs", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/60 text-xs", children: classroom.program })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap bg-cream/5 rounded-2xl p-1.5", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.key), className: `flex-1 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 transition-colors ${tab === t.key ? "bg-lime text-plum-dark" : "text-cream/70 hover:text-cream"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-3.5 w-3.5 shrink-0" }),
      t.label
    ] }, t.key)) }),
    tab === "announcements" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsTab, { classroom, refreshClassroom }),
    tab === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClassesTab, { classroomId: classroom.id, refreshClassroom }),
    tab === "recordings" && /* @__PURE__ */ jsxRuntimeExports.jsx(RecordingsTab, { classroom, refreshClassroom }),
    tab === "tests" && /* @__PURE__ */ jsxRuntimeExports.jsx(TestsTab, { classroom, refreshClassroom }),
    tab === "students" && /* @__PURE__ */ jsxRuntimeExports.jsx(StudentsTab, { classroom, refreshClassroom })
  ] });
}
export {
  AdminClassroomDetail as component
};
