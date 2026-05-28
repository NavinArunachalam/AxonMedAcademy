import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal, Edit, Eye } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/courses")({
  component: AdminCourses,
});

const ROWS = [
  { t: "Staff Nursing Diploma", c: "Diploma", e: 842, p: 22500, st: "Published", l: "Mar 04" },
  { t: "OT Technician Pro", c: "Certificate", e: 614, p: 18000, st: "Published", l: "Feb 28" },
  { t: "Lab Technician", c: "Certificate", e: 548, p: 16500, st: "Published", l: "Feb 26" },
  { t: "ICU Critical Care", c: "Advanced", e: 421, p: 24000, st: "Published", l: "Feb 20" },
  { t: "Radiology Basics", c: "Certificate", e: 312, p: 19500, st: "Draft", l: "Feb 12" },
  { t: "Trauma Response", c: "Workshop", e: 0, p: 9500, st: "Draft", l: "Mar 06" },
];

function AdminCourses() {
  return (
    <div className="space-y-6 text-cream">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Courses</h1>
          <p className="text-cream/60 text-sm mt-1">Manage your catalog · 12 active programs</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold">
          <Plus className="h-4 w-4" /> New course
        </button>
      </div>

      <DarkCard className="p-0 overflow-hidden">
        <div className="p-5 border-b border-cream/10 flex flex-wrap gap-2">
          {["All", "Published", "Draft", "Archived"].map((t, i) => (
            <button key={t} className={`text-xs font-semibold rounded-full px-4 py-2 ${i===0 ? "bg-lime text-plum-dark" : "bg-cream/5 text-cream/70"}`}>{t}</button>
          ))}
          <input placeholder="Search courses…" className="ml-auto bg-cream/5 rounded-full px-4 py-2 text-sm outline-none placeholder:text-cream/50 w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream/5">
              <tr className="text-left text-[10px] uppercase tracking-widest text-cream/60">
                <th className="p-4">Course</th><th>Category</th><th>Enrolled</th><th>Price</th><th>Status</th><th>Updated</th><th></th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.t} className="border-t border-cream/10 hover:bg-cream/5">
                  <td className="p-4">
                    <div className="font-semibold">{r.t}</div>
                  </td>
                  <td className="text-cream/70">{r.c}</td>
                  <td className="font-mono">{r.e}</td>
                  <td className="font-mono">₹{r.p.toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${r.st === "Published" ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/70"}`}>{r.st}</span>
                  </td>
                  <td className="text-cream/60 text-xs">{r.l}</td>
                  <td className="text-right pr-4">
                    <div className="inline-flex gap-1">
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10"><Eye className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10"><Edit className="h-4 w-4" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DarkCard>
    </div>
  );
}
