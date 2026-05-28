import { createFileRoute } from "@tanstack/react-router";
import { IndianRupee, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/finance")({
  component: Finance,
});

function Finance() {
  return (
    <div className="space-y-6 text-cream">
      <div>
        <h1 className="font-display text-3xl font-bold">Finance</h1>
        <p className="text-cream/60 text-sm mt-1">Revenue, fees, and pending collections</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "MTD Revenue", v: "₹86.4L", d: "+18.7%", i: IndianRupee },
          { l: "Collected", v: "₹74.2L", d: "86% of due", i: TrendingUp },
          { l: "Pending", v: "₹12.2L", d: "184 invoices", i: Clock },
          { l: "Overdue", v: "₹3.8L", d: "42 students", i: AlertTriangle, warn: true },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-[#1A0F33] border border-cream/10 p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-cream/60">{s.l}</div>
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-lime/15 text-lime"><s.i className="h-4 w-4" /></div>
            </div>
            <div className={`font-display text-2xl font-bold mt-3 ${s.warn ? "text-red-400" : ""}`}>{s.v}</div>
            <div className="text-xs text-cream/60 mt-1">{s.d}</div>
          </div>
        ))}
      </div>

      <DarkCard className="p-0 overflow-hidden">
        <div className="p-5 border-b border-cream/10 flex items-center justify-between">
          <h3 className="font-display font-bold">Recent transactions</h3>
          <button className="text-xs text-lime font-semibold">View all →</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-cream/5">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cream/60">
              <th className="p-4">Invoice</th><th>Student</th><th>Course</th><th>Amount</th><th>Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { i: "INV-8412", s: "Aanya Sharma", c: "Staff Nursing", a: 45000, d: "Mar 06", st: "Paid" },
              { i: "INV-8411", s: "Rahul Verma", c: "OT Technician", a: 18000, d: "Mar 06", st: "Paid" },
              { i: "INV-8410", s: "Sneha Iyer", c: "Lab Technician", a: 16500, d: "Mar 05", st: "Pending" },
              { i: "INV-8409", s: "Karthik Rao", c: "ICU Care", a: 24000, d: "Mar 05", st: "Paid" },
              { i: "INV-8408", s: "Priya Nair", c: "Staff Nursing", a: 22500, d: "Mar 04", st: "Overdue" },
              { i: "INV-8407", s: "Arjun Pillai", c: "Radiology", a: 19500, d: "Mar 04", st: "Paid" },
            ].map((r) => (
              <tr key={r.i} className="border-t border-cream/10 hover:bg-cream/5">
                <td className="p-4 font-mono text-xs">{r.i}</td>
                <td className="font-semibold">{r.s}</td>
                <td className="text-cream/70">{r.c}</td>
                <td className="font-mono">₹{r.a.toLocaleString("en-IN")}</td>
                <td className="text-cream/60 text-xs">{r.d}</td>
                <td>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${
                    r.st === "Paid" ? "bg-lime/20 text-lime" :
                    r.st === "Pending" ? "bg-amber-500/20 text-amber-300" :
                    "bg-red-500/20 text-red-300"
                  }`}>{r.st}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DarkCard>
    </div>
  );
}
