import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as StatTile, C as Card } from "./_ssr/PortalShell-qsXs4SIH.mjs";
import { X as useClassroomStore, C as getMyMeetings, D as getMyNotifications } from "./_ssr/router-B1vgvhbB.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { s as CirclePlay, g as BookOpen, v as Clock, r as CircleCheck, am as Trophy, o as ChevronRight, x as Flame, a2 as Radio } from "./_libs/lucide-react.mjs";
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
function timeUntil(dateIso) {
  const diff = (new Date(dateIso).getTime() - Date.now()) / 6e4;
  if (diff < 0) return "Started";
  if (diff < 60) return `${Math.floor(diff)}m`;
  return `${Math.floor(diff / 60)}h ${Math.floor(diff % 60)}m`;
}
function timeAgoDate(dateIso) {
  return new Date(dateIso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function Dashboard() {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const {
    data
  } = useQuery({
    queryKey: ["myMeetings"],
    queryFn: getMyMeetings,
    enabled: !!currentUser,
    staleTime: 1e3 * 60,
    retry: 1
  });
  const studentId = currentUser?.id || "";
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const activeCoursesCount = enrolledClassrooms.length;
  const backendMeetings = data?.meetings ?? [];
  const remoteMeetings = backendMeetings.map((m) => ({
    id: m._id,
    title: m.title,
    description: m.description,
    scheduledAt: m.scheduledAt,
    duration: m.duration,
    status: m.status,
    attendees: m.attendees ? m.attendees.map((a) => a.student?.firstName ?? "").filter(Boolean) : [],
    roomId: m.roomId,
    classroomName: m.classroom?.name ?? m.classroom?.code ?? "Classroom"
  }));
  const localMeetings = enrolledClassrooms.flatMap((c) => c.meetings.map((m) => ({
    ...m,
    classroomName: c.name
  })));
  const allMeetings = remoteMeetings.length > 0 ? remoteMeetings : localMeetings;
  const nextLiveMeeting = allMeetings.filter((m) => m.status === "scheduled").sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];
  const totalQuizzes = enrolledClassrooms.reduce((s, c) => s + c.quizzes.filter((q) => q.status === "published").length, 0);
  const totalSubmissions = enrolledClassrooms.reduce((s, c) => s + c.quizzes.reduce((ss, q) => ss + q.attempts.filter((a) => a.studentId === studentId && a.status === "submitted").length, 0), 0);
  const studentAnnouncements = enrolledClassrooms.flatMap((c) => c.announcements.map((a) => ({
    ...a,
    classroomName: c.name
  }))).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const upcomingEvents = allMeetings.filter((m) => m.status === "scheduled" || m.status === "live").sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()).slice(0, 3);
  const nextClassText = nextLiveMeeting ? timeUntil(nextLiveMeeting.scheduledAt) : "No classes scheduled";
  const totalWatchedSeconds = enrolledClassrooms.reduce((s, c) => {
    return s + c.recordings.reduce((ss, r) => {
      const vs = r.viewStats.find((v) => v.studentId === studentId);
      return ss + (vs ? vs.watchedPercent / 100 * r.duration : 0);
    }, 0);
  }, 0);
  const totalHoursWatched = Math.round(totalWatchedSeconds / 3600);
  const {
    data: notificationPayload
  } = useQuery({
    queryKey: ["myNotifications"],
    queryFn: () => getMyNotifications(),
    enabled: !!currentUser,
    staleTime: 1e3 * 30,
    retry: 1
  });
  const notifications = notificationPayload ?? [];
  const joinableNotifications = notifications.filter((n) => n.actionUrl && n.type === "live_session");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-plum-dark text-cream p-7 lg:p-9 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-lime", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-display text-3xl lg:text-4xl font-bold", children: [
            "Hello, ",
            currentUser?.name?.split(" ")[0] || "Student",
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-cream/75 text-sm", children: [
            "You are enrolled in ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { className: "text-lime", children: [
              activeCoursesCount,
              " classroom",
              activeCoursesCount !== 1 ? "s" : ""
            ] }),
            ". Your next live class starts in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-cream", children: nextClassText }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/live", className: "inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-plum-dark", children: [
              "Join live class ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/my-courses", className: "rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold", children: "Continue learning" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 lg:w-95", children: [{
          k: "Hours",
          v: totalHoursWatched.toString()
        }, {
          k: "Exams Done",
          v: totalSubmissions.toString()
        }, {
          k: "Classrooms",
          v: activeCoursesCount.toString()
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-cream/10 border border-cream/10 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-lime", children: s.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest mt-1 text-cream/70", children: s.k })
        ] }, s.k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Active Courses", value: activeCoursesCount.toString(), delta: "+1 this month", icon: BookOpen, accent: "plum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Hours This Week", value: "18.5", delta: "+12% vs last", icon: Clock, accent: "lime" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Assignments Done", value: `${totalSubmissions}/${totalQuizzes}`, icon: CircleCheck, accent: "plum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Achievement Points", value: "1,284", delta: "+86 today", icon: Trophy, accent: "lime" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Continue learning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/my-courses", className: "text-xs font-medium text-plum hover:text-plum-dark inline-flex items-center gap-1", children: [
            "All courses ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
          enrolledClassrooms.map((c) => {
            const enrolledStudentDetails = c.students.find((s) => s.id === studentId);
            const progress = enrolledStudentDetails ? enrolledStudentDetails.progress : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-plum/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-6 w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.program }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum-dark rounded-full", style: {
                  width: `${progress}%`
                } }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-muted-foreground", children: [
                progress,
                "%"
              ] })
            ] }, c.id);
          }),
          enrolledClassrooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You are not enrolled in any courses." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Streak" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 font-display text-5xl font-bold text-plum-dark", children: [
          "14",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-medium text-muted-foreground", children: " days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Best: 21 days · Keep it up!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-7 gap-1.5", children: Array.from({
          length: 28
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-square rounded ${i < 14 ? "bg-lime" : i < 21 ? "bg-lime-soft" : "bg-secondary"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-plum-dark text-cream p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-lime", children: "Next badge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold mt-1", children: "Iron Discipline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/70 mt-1", children: "7 more days to unlock" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Upcoming Classes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3", children: [
          upcomingEvents.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 rounded-xl border border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-14 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: new Date(e.scheduledAt).toLocaleDateString("en-IN", {
                weekday: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-plum-dark text-sm", children: new Date(e.scheduledAt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: e.classroomName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/student/jitsi/${e.roomId}`, className: `text-xs font-semibold rounded-full px-3 py-1.5 flex items-center gap-1.5 ${e.status === "live" ? "bg-red-500 text-white" : "bg-plum-dark text-cream"}`, children: [
              e.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3 w-3 animate-pulse" }),
              e.status === "live" ? "Join Now" : "Join"
            ] })
          ] }, e.id)),
          upcomingEvents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-muted-foreground", children: "No upcoming classes." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Live session alerts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
            joinableNotifications.length,
            " actionable"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: joinableNotifications.length > 0 ? joinableNotifications.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border p-4 bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark", children: notif.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: notif.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: notif.actionUrl || "#", className: "rounded-full bg-red-500 text-white px-4 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-red-600 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3 w-3 animate-pulse" }),
            "Join Now"
          ] })
        ] }) }, notif._id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No joinable live session alerts yet." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Announcements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3", children: [
          studentAnnouncements.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl bg-secondary p-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-plum", children: a.classroomName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: timeAgoDate(a.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark line-clamp-2", children: a.content })
          ] }, a.id)),
          studentAnnouncements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-muted-foreground", children: "No announcements." })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
