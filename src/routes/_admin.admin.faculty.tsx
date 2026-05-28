import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star, Users } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/faculty")({
  component: AdminFaculty,
});

const FACULTY = [
  { n: "Dr. Meera Iyer", d: "Patient Care · 18y", r: 4.9, s: 842, c: 4, init: "MI" },
  { n: "Dr. Anil Khanna", d: "OT & Surgery · 24y", r: 4.8, s: 614, c: 3, init: "AK" },
  { n: "Dr. Sneha Patil", d: "Pathology Lab · 12y", r: 4.9, s: 548, c: 2, init: "SP" },
  { n: "Dr. Rajeev Rao", d: "ICU · 21y", r: 4.7, s: 421, c: 3, init: "RR" },
  { n: "Dr. Kavya Menon", d: "Radiology · 15y", r: 4.8, s: 312, c: 2, init: "KM" },
  { n: "Dr. Vinod Sharma", d: "Pharmacology · 19y", r: 4.6, s: 287, c: 3, init: "VS" },
];

function AdminFaculty() {
  return (
    <div className="space-y-6 text-cream">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Faculty</h1>
          <p className="text-cream/60 text-sm mt-1">28 instructors · 12 active courses</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold"><Plus className="h-4 w-4" /> Invite faculty</button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {FACULTY.map((f) => (
          <DarkCard key={f.n}>
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-lime text-plum-dark font-bold">{f.init}</div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold truncate">{f.n}</div>
                <div className="text-xs text-cream/60">{f.d}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-cream/5 p-3">
                <div className="flex items-center justify-center gap-1 text-lime"><Star className="h-3.5 w-3.5 fill-lime" /><span className="font-bold">{f.r}</span></div>
                <div className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">Rating</div>
              </div>
              <div className="rounded-xl bg-cream/5 p-3">
                <div className="font-bold text-lime flex items-center justify-center gap-1"><Users className="h-3.5 w-3.5" />{f.s}</div>
                <div className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">Students</div>
              </div>
              <div className="rounded-xl bg-cream/5 p-3">
                <div className="font-bold text-lime">{f.c}</div>
                <div className="text-[10px] uppercase tracking-widest text-cream/50 mt-1">Courses</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-full bg-cream/10 text-cream text-xs font-semibold py-2">Message</button>
              <button className="flex-1 rounded-full bg-lime text-plum-dark text-xs font-bold py-2">Profile</button>
            </div>
          </DarkCard>
        ))}
      </div>
    </div>
  );
}
