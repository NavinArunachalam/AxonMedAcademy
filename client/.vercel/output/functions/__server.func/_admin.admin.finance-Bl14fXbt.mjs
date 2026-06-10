import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-CK4rTZz2.mjs";
import { Y as useClassroomStore, e as adminActions } from "./_ssr/router-B58fWewC.mjs";
import { I as IndianRupee, ak as TrendingUp, v as Clock, al as TriangleAlert } from "./_libs/lucide-react.mjs";
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
function Finance() {
  const {
    classrooms,
    courses,
    payments
  } = useClassroomStore();
  const [courseFilter, setCourseFilter] = reactExports.useState("All");
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const transactions = reactExports.useMemo(() => {
    const txs = [];
    classrooms.forEach((c) => {
      const course = courses.find((x) => x.title === c.program);
      const price = course?.price || 15e3;
      c.students.forEach((s) => {
        const paymentRecord = payments.find((p) => p.studentId === s.id && p.classroomId === c.id);
        const status = paymentRecord ? paymentRecord.status : s.status === "active" ? "Paid" : s.status === "held" ? "Pending" : "Overdue";
        txs.push({
          id: `${s.id}-${c.id}`,
          studentId: s.id,
          studentName: s.name,
          email: s.email,
          course: c.program,
          classroomId: c.id,
          amount: price,
          date: new Date(s.addedAt).toLocaleDateString("en-IN", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          }),
          status
        });
      });
    });
    return txs.reverse();
  }, [classrooms, courses, payments]);
  const filtered = transactions.filter((t) => {
    if (courseFilter !== "All" && t.course !== courseFilter) return false;
    if (statusFilter !== "All" && t.status !== statusFilter) return false;
    return true;
  });
  const totalRevenue = transactions.reduce((s, t) => s + t.amount, 0);
  const collected = transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const pending = transactions.filter((t) => t.status === "Pending").reduce((s, t) => s + t.amount, 0);
  const overdue = transactions.filter((t) => t.status === "Overdue").reduce((s, t) => s + t.amount, 0);
  const overdueCount = transactions.filter((t) => t.status === "Overdue").length;
  const fmt = (v) => v >= 1e5 ? `₹${(v / 1e5).toFixed(1)}L` : `₹${v.toLocaleString("en-IN")}`;
  const courseRevenue = courses.map((c) => {
    const enrolled = classrooms.filter((cls) => cls.program === c.title).flatMap((cls) => cls.students.filter((s) => s.status === "active"));
    const rev = enrolled.length * c.price;
    return {
      title: c.title,
      enrolled: enrolled.length,
      price: c.price,
      rev
    };
  }).filter((c) => c.enrolled > 0).sort((a, b) => b.rev - a.rev);
  const maxCourseRev = Math.max(...courseRevenue.map((c) => c.rev), 1);
  const monthlyData = {};
  transactions.forEach((t) => {
    const key = t.date.split(" ").slice(0, 2).join(" ");
    if (!monthlyData[key]) monthlyData[key] = 0;
    if (t.status === "Paid") monthlyData[key] += t.amount;
  });
  const monthKeys = Object.keys(monthlyData).slice(-6);
  const maxMonth = Math.max(...monthKeys.map((k) => monthlyData[k]), 1);
  const handleStatusChange = (studentId, classroomId, status) => {
    adminActions.updatePaymentStatus(studentId, classroomId, status);
  };
  const statusColor = (s) => s === "Paid" ? "bg-lime/20 text-lime" : s === "Pending" ? "bg-amber-500/20 text-amber-300" : "bg-red-500/20 text-red-300";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Finance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Revenue, fees, and payment status tracking across cohorts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-4", children: [{
      l: "Total Revenue",
      v: fmt(totalRevenue),
      d: "All enrollments",
      i: IndianRupee
    }, {
      l: "Collected",
      v: fmt(collected),
      d: `${totalRevenue ? Math.round(collected / totalRevenue * 100) : 0}% of total`,
      i: TrendingUp
    }, {
      l: "Pending",
      v: fmt(pending),
      d: `${transactions.filter((t) => t.status === "Pending").length} invoices`,
      i: Clock
    }, {
      l: "Overdue",
      v: fmt(overdue),
      d: `${overdueCount} students`,
      i: TriangleAlert,
      warn: true
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-[#1A0F33] border border-cream/10 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg bg-lime/15 text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.i, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display text-2xl font-bold mt-3 ${s.warn && overdueCount > 0 ? "text-red-400" : ""}`, children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/60 mt-1", children: s.d })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-4", children: "Revenue by Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          courseRevenue.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-xs text-cream", children: c.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-cream/50", children: [
                  c.enrolled,
                  " enrolled · ₹",
                  c.price.toLocaleString("en-IN"),
                  "/student"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lime text-sm font-bold", children: fmt(c.rev) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-cream/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-lime/60 to-lime rounded-full", style: {
              width: `${c.rev / maxCourseRev * 100}%`
            } }) })
          ] }, c.title)),
          courseRevenue.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No enrollment data yet." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg mb-4", children: "Collection Trend" }),
        monthKeys.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2 h-32", children: monthKeys.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full rounded-t bg-lime/60 hover:bg-lime transition-colors", style: {
              height: `${monthlyData[m] / maxMonth * 100}%`,
              minHeight: "4px"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] text-cream/50 truncate w-full text-center", children: m.split(" ")[0] })
          ] }, m)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center rounded-lg bg-lime/10 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/60", children: "Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-bold text-lime", children: transactions.filter((t) => t.status === "Paid").length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center rounded-lg bg-amber-500/10 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/60", children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-bold text-amber-300", children: transactions.filter((t) => t.status === "Pending").length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center rounded-lg bg-red-500/10 p-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/60", children: "Overdue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-sm font-bold text-red-400", children: overdueCount })
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/50 text-sm", children: "No payment data yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-cream/10 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold", children: "Fee Transactions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: courseFilter, onChange: (e) => setCourseFilter(e.target.value), className: "bg-cream/5 border border-cream/10 rounded-full px-3 py-1.5 text-sm text-cream outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Courses" }),
            courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.title, children: c.title }, c.id))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "bg-cream/5 border border-cream/10 rounded-full px-3 py-1.5 text-sm text-cream outline-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "All", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Paid", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Overdue", children: "Overdue" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-cream/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "text-center py-12 text-cream/50", children: "No transactions found." }) }),
          filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-cream/10 hover:bg-cream/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: r.studentName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-cream/50", children: r.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/70", children: r.course }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "font-mono text-lime", children: [
              "₹",
              r.amount.toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-cream/60 text-xs", children: r.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${statusColor(r.status)}`, children: r.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: r.status, onChange: (e) => handleStatusChange(r.studentId, r.classroomId, e.target.value), className: "bg-cream/5 border border-cream/10 rounded-lg px-2 py-1 text-cream/70 text-xs outline-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Paid", children: "Mark Paid" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pending", children: "Mark Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Overdue", children: "Mark Overdue" })
            ] }) })
          ] }, r.id))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Finance as component
};
