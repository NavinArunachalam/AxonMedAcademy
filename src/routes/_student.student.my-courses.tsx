import { createFileRoute, Link } from "@tanstack/react-router";
import { PlayCircle, Clock, BookOpen, Award } from "lucide-react";

export const Route = createFileRoute("/_student/student/my-courses")({
  component: MyCourses,
});

const COURSES = [
  { id: "staff-nursing", title: "Staff Nursing Diploma", instr: "Dr. Meera Iyer", p: 72, mods: "14/20", hrs: 86, next: "IV Cannulation" },
  { id: "ot-tech", title: "OT Technician Pro", instr: "Dr. Anil Khanna", p: 45, mods: "9/24", hrs: 41, next: "Sterilisation Protocols" },
  { id: "lab-tech", title: "Lab Technician", instr: "Dr. Sneha Patil", p: 91, mods: "22/26", hrs: 118, next: "Hematology Lab" },
];

function MyCourses() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-plum-dark">My Courses</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your progress across enrolled programs</p>
        </div>
        <div className="hidden sm:flex gap-2">
          {["All", "In Progress", "Completed", "Archived"].map((t, i) => (
            <button key={t} className={`rounded-full px-4 py-2 text-xs font-semibold ${i===0 ? "bg-plum-dark text-cream" : "bg-white border border-border text-foreground/70"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {COURSES.map((c) => (
          <div key={c.id} className="rounded-3xl bg-white border border-border overflow-hidden hover:shadow-xl hover:shadow-plum/10 transition-all">
            <div className="h-32 bg-gradient-to-br from-plum-dark to-plum relative">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-lime font-bold">In progress</span>
                <span className="text-[10px] text-cream/70 font-mono">{c.hrs}h</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-plum-dark">{c.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">with {c.instr}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{c.mods} modules</span>
                <span className="font-mono font-bold text-plum-dark">{c.p}%</span>
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-lime rounded-full" style={{ width: `${c.p}%` }} />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs">
                  <div className="text-muted-foreground">Up next</div>
                  <div className="font-semibold text-plum-dark">{c.next}</div>
                </div>
                <Link
                  to="/student/course/$id"
                  params={{ id: c.id }}
                  className="grid h-11 w-11 place-items-center rounded-full bg-plum-dark text-lime hover:bg-plum"
                >
                  <PlayCircle className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-secondary p-6 grid sm:grid-cols-3 gap-4 text-center">
        {[
          { icon: BookOpen, k: "Total Enrolled", v: "3" },
          { icon: Clock, k: "Total Hours", v: "245h" },
          { icon: Award, k: "Certificates Earned", v: "2" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-white p-4">
            <s.icon className="h-5 w-5 mx-auto text-plum" />
            <div className="font-display font-bold text-2xl text-plum-dark mt-2">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
