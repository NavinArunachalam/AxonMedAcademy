import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { C as Card } from "./_ssr/PortalShell-CaU8LxpJ.mjs";
import { ak as useClassroomStore, Q as getMyMeetings } from "./_ssr/router-BIMX1eZo.mjs";
import "./_libs/tanstack__query-core.mjs";
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
import "./_libs/lucide-react.mjs";
const typeStyle = {
  live: "bg-orange-500 text-white",
  scheduled: "bg-plum-dark text-cream",
  ended: "bg-slate-200 text-slate-500 line-through"
};
function Schedule() {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["myMeetings"],
    queryFn: getMyMeetings,
    enabled: !!currentUser,
    staleTime: 1e3 * 60,
    retry: 1
  });
  const backendMeetings = data?.meetings ?? [];
  const allMeetings = backendMeetings.map((m) => ({
    id: m._id,
    title: m.title,
    description: m.description,
    scheduledAt: m.scheduledAt,
    duration: m.duration,
    status: m.status,
    attendees: m.attendees ? m.attendees.map((a) => a.student?.fullName ?? "").filter(Boolean) : [],
    roomId: m.roomId,
    classroomName: m.classroom?.name ?? m.classroom?.code ?? "Classroom"
  }));
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const localMeetings = enrolledClassrooms.flatMap((c) => c.meetings.map((m) => ({
    ...m,
    classroomName: c.name,
    program: c.program
  }))).sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  const meetings = backendMeetings.length > 0 ? allMeetings.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()) : localMeetings;
  const upcoming = meetings.filter((m) => m.status !== "ended" && m.status !== "cancelled");
  const past = meetings.filter((m) => m.status === "ended" || m.status === "cancelled");
  function fmt(iso) {
    return new Date(iso).toLocaleString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-plum-dark", children: "My Schedule" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All upcoming live classes and sessions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg mb-4", children: "Upcoming Sessions" }),
      upcoming.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No upcoming classes scheduled." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border p-4 hover:bg-secondary/30 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-20 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: new Date(m.scheduledAt).toLocaleDateString("en-IN", {
            weekday: "short"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-plum-dark text-sm", children: new Date(m.scheduledAt).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
            m.duration,
            " min"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: m.classroomName }),
          m.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground/70 truncate mt-0.5", children: m.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${typeStyle[m.status] || "bg-secondary text-plum-dark"}`, children: m.status }),
          m.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/live/${m.roomId}`, className: "rounded-full bg-orange-500 text-white text-xs font-bold px-4 py-2 animate-pulse inline-flex", children: "Join Now" })
        ] })
      ] }, m.id)) })
    ] }),
    past.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg mb-4", children: "Past Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: past.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark", children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5", children: m.classroomName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-muted-foreground text-xs", children: fmt(m.scheduledAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-mono text-xs", children: [
            m.duration,
            "m"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded bg-slate-100 text-slate-500", children: m.status }) })
        ] }, m.id)) })
      ] }) })
    ] }),
    allMeetings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-slate-200 p-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm", children: "No sessions found for your enrolled classrooms." }) })
  ] });
}
export {
  Schedule as component
};
