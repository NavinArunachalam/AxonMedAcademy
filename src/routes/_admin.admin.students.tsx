import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Download, Mail } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/students")({
  component: AdminStudents,
});

const STUDENTS = [
  { n: "Aanya Sharma", id: "MCA-2024-0381", c: "Staff Nursing", b: "Batch 24", p: 72, s: "Active", e: "aanya.s@ex.com" },
  { n: "Rahul Verma", id: "MCA-2024-0382", c: "OT Technician", b: "Batch 24", p: 45, s: "Active", e: "rahul.v@ex.com" },
  { n: "Sneha Iyer", id: "MCA-2024-0383", c: "Lab Technician", b: "Batch 24", p: 91, s: "Active", e: "sneha.i@ex.com" },
  { n: "Karthik Rao", id: "MCA-2023-0214", c: "ICU Critical Care", b: "Batch 23", p: 100, s: "Placed", e: "karthik.r@ex.com" },
  { n: "Priya Nair", id: "MCA-2024-0388", c: "Staff Nursing", b: "Batch 24", p: 38, s: "At risk", e: "priya.n@ex.com" },
  { n: "Arjun Pillai", id: "MCA-2024-0391", c: "Radiology", b: "Batch 24", p: 62, s: "Active", e: "arjun.p@ex.com" },
  { n: "Meera Joshi", id: "MCA-2023-0118", c: "Staff Nursing", b: "Batch 23", p: 100, s: "Placed", e: "meera.j@ex.com" },
];

const statusStyle: Record<string, string> = {
  Active: "bg-lime/20 text-lime",
  Placed: "bg-blue-500/20 text-blue-300",
  "At risk": "bg-red-500/20 text-red-300",
};

function AdminStudents() {
  return (
    <div className="space-y-6 text-cream">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Students</h1>
          <p className="text-cream/60 text-sm mt-1">2,847 total · 184 enrolled this week</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-full bg-cream/10 text-cream px-4 py-2 text-sm font-semibold"><Download className="h-4 w-4" /> Export</button>
          <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold"><Plus className="h-4 w-4" /> Add student</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { l: "Total", v: "2,847" },
          { l: "Active", v: "2,143" },
          { l: "Placed", v: "612" },
          { l: "At risk", v: "92", warn: true },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-[#1A0F33] border border-cream/10 p-4">
            <div className="text-[10px] uppercase tracking-widest text-cream/60">{s.l}</div>
            <div className={`font-display text-2xl font-bold mt-1 ${s.warn ? "text-red-400" : "text-cream"}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <DarkCard className="p-0 overflow-hidden">
        <div className="p-4 border-b border-cream/10 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-cream/5 rounded-full px-3 py-2 flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-cream/50" />
            <input placeholder="Search by name, ID, email…" className="bg-transparent outline-none text-sm flex-1" />
          </div>
          <select className="bg-cream/5 rounded-full px-4 py-2 text-sm outline-none">
            <option>All courses</option>
            <option>Staff Nursing</option>
            <option>OT Technician</option>
          </select>
          <select className="bg-cream/5 rounded-full px-4 py-2 text-sm outline-none">
            <option>All batches</option>
            <option>Batch 24</option>
            <option>Batch 23</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream/5">
              <tr className="text-left text-[10px] uppercase tracking-widest text-cream/60">
                <th className="p-4">Student</th><th>Course</th><th>Batch</th><th>Progress</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((s) => (
                <tr key={s.id} className="border-t border-cream/10 hover:bg-cream/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-lime text-plum-dark text-xs font-bold">{s.n.split(" ").map(w=>w[0]).join("")}</div>
                      <div>
                        <div className="font-semibold">{s.n}</div>
                        <div className="text-[11px] text-cream/60 font-mono">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-cream/80">{s.c}</td>
                  <td className="text-cream/60 text-xs">{s.b}</td>
                  <td>
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden">
                        <div className="h-full bg-lime" style={{ width: `${s.p}%` }} />
                      </div>
                      <span className="text-[11px] font-mono">{s.p}%</span>
                    </div>
                  </td>
                  <td><span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${statusStyle[s.s]}`}>{s.s}</span></td>
                  <td className="text-right pr-4">
                    <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-cream/10"><Mail className="h-4 w-4" /></button>
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
