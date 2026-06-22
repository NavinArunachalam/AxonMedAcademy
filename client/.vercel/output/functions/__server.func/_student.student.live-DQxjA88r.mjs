import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { C as Card } from "./_ssr/PortalShell-BrkJ3mSa.mjs";
import { P as getMyClassrooms } from "./_ssr/router-7BnTJDC3.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { M as LoaderCircle, an as Users, v as Clock, ao as Video, C as Calendar, B as Bell } from "./_libs/lucide-react.mjs";
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
function LiveClasses() {
  const [meetings, setMeetings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [reminded, setReminded] = reactExports.useState(/* @__PURE__ */ new Set());
  async function fetchMeetings() {
    try {
      const classrooms = await getMyClassrooms();
      const all = classrooms.flatMap((c) => (c.meetings || []).map((m) => ({
        ...m,
        classroomName: c.name
      })));
      all.sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
      setMeetings(all);
      setError("");
    } catch (err) {
      setError(err?.message || "Failed to load meetings");
    } finally {
      setLoading(false);
    }
  }
  reactExports.useEffect(() => {
    fetchMeetings();
    const interval = setInterval(fetchMeetings, 3e4);
    return () => clearInterval(interval);
  }, []);
  const liveNow = meetings.filter((m) => m.status === "live");
  const upcoming = meetings.filter((m) => m.status === "scheduled");
  const latestLive = liveNow.length ? liveNow.reduce((prev, cur) => new Date(cur.scheduledAt) > new Date(prev.scheduledAt) ? cur : prev) : null;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center h-64 gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Loading your classes…" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600", children: error });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-plum-dark", children: "Live Classes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Real-time sessions with faculty and peers" })
    ] }),
    latestLive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 p-4 bg-gradient-to-r from-plum-dark to-plum text-cream rounded-xl flex flex-col items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl", children: "Latest Live Class" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
        latestLive.title,
        " – ",
        latestLive.classroomName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live/$roomId", params: {
        roomId: latestLive.roomId
      }, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-4 py-2 font-bold mt-2", children: "Join latest" })
    ] }),
    liveNow.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: liveNow.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-gradient-to-br from-plum-dark to-plum text-cream p-6 lg:p-8 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col lg:flex-row gap-6 lg:items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 bg-lime text-plum-dark text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-plum-dark animate-pulse" }),
            "Live now"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-2xl lg:text-3xl font-bold", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-cream/75 text-sm", children: [
            m.classroomName,
            " · Started",
            " ",
            new Date(m.scheduledAt).toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit"
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-4 text-xs text-cream/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              m.attendees.length,
              " attending"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              m.duration,
              " min"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/live/$roomId", params: {
          roomId: m.roomId
        }, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-6 py-3 font-bold shrink-0 hover:bg-lime/90 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
          " Join class"
        ] })
      ] })
    ] }, m.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-dashed border-plum-dark/20 p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-8 w-8 text-plum-dark/30 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No live classes right now" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-plum-dark text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5" }),
        " Upcoming Classes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
        upcoming.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-36 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-plum", children: new Date(m.scheduledAt).toLocaleDateString("en-IN", {
              weekday: "short",
              month: "short",
              day: "numeric"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: new Date(m.scheduledAt).toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.classroomName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                m.duration,
                " min"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live/$roomId", params: {
            roomId: m.roomId
          }, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-4 py-2 font-bold shrink-0 hover:bg-lime/90 transition-colors", children: "Join class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setReminded((prev) => new Set(prev).add(m.id)), className: `text-xs font-semibold border rounded-full px-4 py-1.5 flex items-center gap-1.5 transition-colors shrink-0 ${reminded.has(m.id) ? "bg-plum-dark text-cream border-plum-dark" : "border-plum-dark/20 text-plum-dark hover:bg-plum-dark hover:text-cream"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
            reminded.has(m.id) ? "Reminded" : "Remind me"
          ] })
        ] }, m.id)),
        upcoming.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-2", children: "No upcoming classes scheduled." })
      ] })
    ] })
  ] });
}
export {
  LiveClasses as component
};
