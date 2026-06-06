import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-CRWmY4Hw.mjs";
import { V as useClassroomStore } from "./_ssr/router-BVMkNovA.mjs";
import { ao as Users, g as BookOpen, I as IndianRupee, h as Briefcase, A as Activity, ak as TrendingUp, e as ArrowUpRight, b as ArrowDownRight } from "./_libs/lucide-react.mjs";
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
function AdminHome() {
  const {
    classrooms
  } = useClassroomStore();
  const activeStudents = classrooms.reduce((s, c) => s + c.students.filter((st) => st.status === "active").length, 0);
  const totalEnrolments = classrooms.reduce((s, c) => s + c.students.length, 0);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Academy performance · Real-time" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["7d", "30d", "90d", "All"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `text-xs font-semibold rounded-full px-3 py-1.5 ${i === 1 ? "bg-lime text-plum-dark" : "bg-cream/10 text-cream/70"}`, children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Active Students", value: activeStudents.toString(), delta: "+12.4%", icon: Users }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Course Enrolments", value: totalEnrolments.toString(), delta: "+8.1%", icon: BookOpen }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Revenue (MTD)", value: "₹86.4L", delta: "+18.7%", icon: IndianRupee }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Placement Rate", value: "95.2%", delta: "-0.3%", up: false, icon: Briefcase })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Enrolment trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/60 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
            " Live"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-56 flex items-end gap-2", children: [42, 58, 64, 51, 73, 86, 78, 92, 104, 88, 110, 124].map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t-md bg-gradient-to-t from-lime/30 to-lime", style: {
            height: `${v / 1.4}%`
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-cream/50 font-mono", children: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Top courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-3", children: [{
          t: "Staff Nursing Diploma",
          n: 842,
          p: 95
        }, {
          t: "OT Technician Pro",
          n: 614,
          p: 78
        }, {
          t: "Lab Technician",
          n: 548,
          p: 72
        }, {
          t: "ICU Critical Care",
          n: 421,
          p: 58
        }, {
          t: "Radiology Basics",
          n: 312,
          p: 44
        }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: c.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-cream/60", children: c.n })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime rounded-full", style: {
            width: `${c.p}%`
          } }) })
        ] }, c.t)) })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Placement pipeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: [{
          h: "Apollo Hospitals",
          o: 24,
          c: "Bengaluru",
          s: "Interviewing"
        }, {
          h: "Fortis Healthcare",
          o: 18,
          c: "Mumbai",
          s: "Offers extended"
        }, {
          h: "Manipal Hospitals",
          o: 15,
          c: "Bengaluru",
          s: "Shortlisting"
        }, {
          h: "Max Healthcare",
          o: 22,
          c: "Delhi NCR",
          s: "On-site visit"
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-3.5 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-lime text-plum-dark font-bold text-xs", children: p.h.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold truncate", children: p.h }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-cream/60", children: [
              p.c,
              " · ",
              p.s
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lime", children: p.o }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-cream/50", children: "Openings" })
          ] })
        ] }, p.h)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-lime" }),
          " Conversion funnel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/60", children: "Last 30 days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-5 gap-2", children: [{
        l: "Visitors",
        v: "48,210",
        p: 100
      }, {
        l: "Leads",
        v: "6,842",
        p: 72
      }, {
        l: "Counselling",
        v: "3,128",
        p: 58
      }, {
        l: "Applied",
        v: "1,486",
        p: 42
      }, {
        l: "Enrolled",
        v: "412",
        p: 28
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-cream/5 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl font-bold", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-lime", style: {
          width: `${s.p}%`
        } }) })
      ] }, s.l)) })
    ] })
  ] });
}
export {
  AdminHome as component
};
