import { createFileRoute } from "@tanstack/react-router";
import { Plus, ClipboardList, Users, CheckCircle2, AlertCircle } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/exams")({
  component: AdminExams,
});

function AdminExams() {
  return (
    <div className="space-y-6 text-cream">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Exams</h1>
          <p className="text-cream/60 text-sm mt-1">Schedule, proctor and grade assessments</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold"><Plus className="h-4 w-4" /> Create exam</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "Scheduled", v: "14", i: ClipboardList },
          { l: "In progress", v: "2", i: AlertCircle },
          { l: "Awaiting grading", v: "138", i: Users },
          { l: "Avg score (30d)", v: "82%", i: CheckCircle2 },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-[#1A0F33] border border-cream/10 p-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime/15 text-lime"><s.i className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-cream/60">{s.l}</div>
              <div className="font-display text-xl font-bold">{s.v}</div>
            </div>
          </div>
        ))}
      </div>

      <DarkCard className="p-0 overflow-hidden">
        <div className="p-5 border-b border-cream/10">
          <h3 className="font-display font-bold">Upcoming exams</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-cream/5">
            <tr className="text-left text-[10px] uppercase tracking-widest text-cream/60">
              <th className="p-4">Exam</th><th>Course</th><th>Date</th><th>Duration</th><th>Students</th><th>Type</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { t: "Anatomy & Physiology Final", c: "Staff Nursing", d: "Mar 18 · 10:00", du: "90m", s: 184, ty: "Proctored", st: "Scheduled" },
              { t: "OT Sterilisation Mid", c: "OT Technician", d: "Mar 22 · 14:00", du: "45m", s: 142, ty: "Online", st: "Scheduled" },
              { t: "Pharmacology Final", c: "Staff Nursing", d: "Mar 24 · 09:00", du: "120m", s: 184, ty: "Proctored", st: "Scheduled" },
              { t: "Lab Practical", c: "Lab Technician", d: "Mar 28 · 11:00", du: "150m", s: 96, ty: "On-site", st: "Confirmed" },
            ].map((r) => (
              <tr key={r.t} className="border-t border-cream/10 hover:bg-cream/5">
                <td className="p-4 font-semibold">{r.t}</td>
                <td className="text-cream/70">{r.c}</td>
                <td className="text-cream/70">{r.d}</td>
                <td className="font-mono text-xs">{r.du}</td>
                <td className="font-mono">{r.s}</td>
                <td><span className="bg-cream/10 text-cream text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">{r.ty}</span></td>
                <td><span className="bg-lime/20 text-lime text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">{r.st}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </DarkCard>
    </div>
  );
}
