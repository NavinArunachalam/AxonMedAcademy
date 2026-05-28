import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_student/student/exams")({
  component: Exams,
});

function Exams() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-plum-dark">Exams & Assessments</h1>
        <p className="text-sm text-muted-foreground mt-1">Proctored finals, mock tests, and practice quizzes</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { k: "Average Score", v: "84%", icon: CheckCircle2 },
          { k: "Exams Taken", v: "27", icon: ClipboardList },
          { k: "Upcoming", v: "3", icon: Clock },
        ].map((s) => (
          <Card key={s.k} className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark"><s.icon className="h-5 w-5" /></div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</div>
              <div className="font-display text-2xl font-bold text-plum-dark">{s.v}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-plum-dark text-lg">Upcoming exams</h3>
          <span className="text-xs text-muted-foreground">Live proctored</span>
        </div>
        <div className="space-y-3">
          {[
            { t: "Anatomy & Physiology — Final", d: "Mar 18, 2026 · 10:00 AM", dur: "90 min", q: 60, status: "Scheduled" },
            { t: "Pharmacology — Module Test", d: "Mar 22, 2026 · 2:00 PM", dur: "45 min", q: 30, status: "Scheduled" },
            { t: "Patient Care Practical", d: "Mar 28, 2026 · 11:00 AM", dur: "120 min", q: 0, status: "Mandatory" },
          ].map((e) => (
            <div key={e.t} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-border p-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-plum-dark text-lime shrink-0">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-plum-dark">{e.t}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{e.d} · {e.dur}{e.q ? ` · ${e.q} questions` : ""}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest bg-lime text-plum-dark px-2.5 py-1 rounded-full font-bold">{e.status}</span>
                <button className="rounded-full bg-plum-dark text-cream text-xs font-semibold px-4 py-2">Details</button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="font-display font-bold text-plum-dark text-lg mb-4">Recent results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
                <th className="pb-3">Exam</th><th className="pb-3">Date</th><th className="pb-3">Score</th><th className="pb-3">Grade</th><th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { t: "Microbiology Quiz 4", d: "Mar 02", s: 92, g: "A+" },
                { t: "Infection Control Mock", d: "Feb 24", s: 78, g: "B+" },
                { t: "Vital Signs Practical", d: "Feb 18", s: 88, g: "A" },
                { t: "Anatomy Module 5", d: "Feb 10", s: 71, g: "B" },
              ].map((r) => (
                <tr key={r.t} className="border-b border-border/60 last:border-0">
                  <td className="py-3.5 font-semibold text-plum-dark">{r.t}</td>
                  <td className="py-3.5 text-muted-foreground">{r.d}</td>
                  <td className="py-3.5"><span className="font-mono font-bold">{r.s}%</span></td>
                  <td className="py-3.5"><span className="bg-lime text-plum-dark text-xs font-bold px-2 py-0.5 rounded">{r.g}</span></td>
                  <td className="py-3.5 text-right"><button className="text-xs font-semibold text-plum hover:text-plum-dark">Review →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 items-start">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <div className="font-semibold text-amber-900">Proctoring requirements</div>
          <div className="text-amber-800 mt-0.5">A working webcam and quiet room are required for all proctored exams. Test your setup 24h before the exam.</div>
        </div>
      </div>
    </div>
  );
}
