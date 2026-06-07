import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-qsXs4SIH.mjs";
import { X as useClassroomStore, w as getAdminUsers, v as getAdminPrograms } from "./_ssr/router-B1vgvhbB.mjs";
import { ao as Users, g as BookOpen, I as IndianRupee, A as Activity, e as ArrowUpRight, b as ArrowDownRight } from "./_libs/lucide-react.mjs";
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
const HEARTBEAT_INTERVAL_MS = 3e4;
function Stat({
  label,
  value,
  delta,
  up = true,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-5 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-cream/60", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg bg-lime/15 text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-display text-3xl font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-1 flex items-center gap-1 text-xs ${up ? "text-lime" : "text-red-400"}`, children: [
      up ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3 w-3" }),
      " ",
      delta
    ] })
  ] });
}
function timeAgoStr(dateIso) {
  const diff = (Date.now() - new Date(dateIso).getTime()) / 6e4;
  if (diff < 0) return "Upcoming";
  if (diff < 60) return `${Math.floor(diff)}m`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h`;
  return `${Math.floor(diff / 1440)}d`;
}
function HeartbeatDot({
  pulse
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5 mr-1", children: [
    pulse && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" }, Date.now()),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-lime" })
  ] });
}
function AdminHome() {
  const {
    classrooms
  } = useClassroomStore();
  const [students, setStudents] = reactExports.useState([]);
  const [courses, setCourses] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [lastRefreshed, setLastRefreshed] = reactExports.useState(null);
  const [pulse, setPulse] = reactExports.useState(false);
  const intervalRef = reactExports.useRef(null);
  const loadData = reactExports.useCallback(async () => {
    try {
      const [studentUsers, programsList] = await Promise.all([getAdminUsers("student"), getAdminPrograms()]);
      setStudents(studentUsers);
      setCourses(programsList);
      setLastRefreshed(/* @__PURE__ */ new Date());
      setPulse(true);
      setTimeout(() => setPulse(false), 1500);
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    loadData();
    intervalRef.current = setInterval(() => {
      loadData();
    }, HEARTBEAT_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loadData]);
  const activeStudentsSet = /* @__PURE__ */ new Set();
  classrooms.forEach((c) => {
    c.students.forEach((st) => {
      if (st.status === "active") {
        activeStudentsSet.add(st.id);
      }
    });
  });
  const activeStudents = activeStudentsSet.size;
  const totalEnrolments = classrooms.reduce((s, c) => s + c.students.length, 0);
  const totalRevenue = classrooms.reduce((s, cls) => {
    const course = courses.find((x) => x.title === cls.program);
    return s + (course?.price || 0) * cls.students.filter((st) => st.status === "active").length;
  }, 0);
  const formattedRevenue = totalRevenue >= 1e5 ? `₹${(totalRevenue / 1e5).toFixed(1)}L` : `₹${totalRevenue.toLocaleString("en-IN")}`;
  const activities = classrooms.flatMap((c) => [...c.announcements.map((a) => ({
    c: "News",
    t: `${c.name} - ${a.content.substring(0, 40)}...`,
    stamp: new Date(a.createdAt).getTime(),
    w: timeAgoStr(a.createdAt)
  })), ...c.meetings.filter((m) => m.status === "scheduled").map((m) => ({
    c: "Live",
    t: `${m.title} scheduled for ${c.name}`,
    stamp: new Date(m.scheduledAt).getTime() - 1e5,
    w: timeAgoStr(m.scheduledAt)
  })), ...c.quizzes.filter((q) => q.status === "published").map((q) => ({
    c: "Exam",
    t: `${q.title} published in ${c.name}`,
    stamp: new Date(q.availableFrom).getTime(),
    w: timeAgoStr(q.availableFrom)
  }))]).sort((a, b) => b.stamp - a.stamp).slice(0, 5);
  const topCourses = courses.map((c) => {
    const enrolled = classrooms.filter((cls) => cls.program === c.title).reduce((acc, cls) => acc + cls.students.filter((st) => st.status === "active").length, 0);
    return {
      title: c.title,
      count: enrolled
    };
  }).sort((a, b) => b.count - a.count).slice(0, 5);
  const trendMax = Math.max(...topCourses.map((c) => c.count), 1);
  const recentStudents = [...students].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/60 text-sm mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeartbeatDot, { pulse }),
          "Academy performance · Live",
          lastRefreshed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-cream/40 text-[11px]", children: [
            "· updated ",
            lastRefreshed.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["7d", "30d", "90d", "All"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `text-xs font-semibold rounded-full px-3 py-1.5 ${i === 1 ? "bg-lime text-plum-dark" : "bg-cream/10 text-cream/70"}`, children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Active Students", value: activeStudents.toString(), delta: "+12.4%", icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Course Enrolments", value: totalEnrolments.toString(), delta: "+8.1%", icon: BookOpen }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Revenue", value: formattedRevenue, delta: "+18.7%", icon: IndianRupee })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Enrolment trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/60 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HeartbeatDot, { pulse }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
            " Live · refreshes every 30s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-56 flex items-end gap-3", children: topCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-cream/40 text-sm", children: "No enrollment data yet" }) : topCourses.map((c, idx) => {
          const barPct = Math.round(c.count / trendMax * 80);
          const shortLabel = c.title.split(" ")[0].slice(0, 9);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1.5 group relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 hidden group-hover:flex flex-col items-center pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0f0820] border border-lime/20 rounded-lg px-3 py-1.5 text-[11px] text-cream whitespace-nowrap shadow-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-lime", children: c.count }),
                " enrolled",
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-cream/50 text-[10px] mt-0.5 max-w-[140px] truncate", children: c.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-[#0f0820] border-r border-b border-lime/20 rotate-45 -mt-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-lime/70", children: c.count > 0 ? c.count : "" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-full rounded-t-md transition-all duration-700 ${pulse ? "bg-gradient-to-t from-lime to-lime/80 shadow-[0_0_8px_2px_rgba(163,230,53,0.5)]" : "bg-gradient-to-t from-lime/30 to-lime"}`, style: {
              height: `${barPct}%`,
              minHeight: c.count > 0 ? "6px" : "2px"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-cream/50 font-mono text-center leading-tight mt-0.5 w-full truncate px-0.5", title: c.title, children: [
              "#",
              idx + 1,
              " ",
              shortLabel
            ] })
          ] }, c.title);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Top courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/40 uppercase tracking-widest mt-0.5 mb-4", children: "Best 5 by enrolment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3", children: [
          topCourses.map((c, idx) => {
            const pct = Math.round(c.count / trendMax * 100);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold truncate max-w-[150px] flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime/60 font-mono text-[10px]", children: [
                    "#",
                    idx + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: c.title, children: c.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-cream/60", children: [
                  c.count,
                  " enrolled"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full transition-all duration-700", style: {
                width: `${pct}%`
              } }) })
            ] }, c.title);
          }),
          topCourses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50 text-center py-4", children: "No courses available" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Recent activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3", children: activities.length > 0 ? activities.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 border-b border-cream/10 pb-3 last:border-0 hover:bg-cream/[0.02] transition-colors rounded p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime/15 text-lime text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded", children: a.c }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm line-clamp-2", children: a.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/50 font-mono shrink-0 pt-0.5", children: a.w })
        ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-cream/50 text-center py-4", children: "No recent activity" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Recent Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cream/10", children: [
          loading && recentStudents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-cream/40 text-sm animate-pulse", children: "Loading…" }),
          recentStudents.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3.5 flex items-center gap-4 hover:bg-cream/10 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-lime text-plum-dark font-bold text-xs shrink-0", children: s.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold truncate text-cream", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/60 truncate", children: s.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-cream/50", children: "Joined" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono text-lime mt-0.5", children: new Date(s.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "2-digit"
              }) })
            ] })
          ] }, s.id)),
          !loading && recentStudents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-cream/50 text-sm", children: "No recent students found." })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminHome as component
};
