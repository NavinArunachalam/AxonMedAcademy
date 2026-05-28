import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame, Trophy, Clock, BookOpen, PlayCircle, ChevronRight, CheckCircle2,
} from "lucide-react";
import { Card, StatTile } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_student/student/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-3xl bg-plum-dark text-cream p-7 lg:p-9 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest text-lime">Welcome back</div>
            <h1 className="mt-2 font-display text-3xl lg:text-4xl font-bold">
              Good morning, Aanya 👋
            </h1>
            <p className="mt-2 text-cream/75 text-sm">
              You're on a <b className="text-lime">14-day streak</b>. Your next live class
              starts in <b className="text-cream">2h 14m</b>.
            </p>
            <div className="mt-5 flex gap-3">
              <Link to="/student/live" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-plum-dark">
                Join live class <PlayCircle className="h-4 w-4" />
              </Link>
              <Link to="/student/my-courses" className="rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold">
                Continue learning
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:w-[380px]">
            {[
              { k: "Hours", v: "127" },
              { k: "Streak", v: "14d" },
              { k: "Rank", v: "#08" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-cream/10 border border-cream/10 p-4 text-center">
                <div className="font-display text-2xl font-bold text-lime">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest mt-1 text-cream/70">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active Courses" value="3" delta="+1 this month" icon={BookOpen} accent="plum" />
        <StatTile label="Hours This Week" value="18.5" delta="+12% vs last" icon={Clock} accent="lime" />
        <StatTile label="Assignments Done" value="42/48" icon={CheckCircle2} accent="plum" />
        <StatTile label="Achievement Points" value="1,284" delta="+86 today" icon={Trophy} accent="lime" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-plum-dark">Continue learning</h3>
            <Link to="/student/my-courses" className="text-xs font-medium text-plum hover:text-plum-dark inline-flex items-center gap-1">
              All courses <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { t: "Module 6 · IV Cannulation Technique", c: "Staff Nursing Diploma", p: 72 },
              { t: "Module 3 · OT Sterilisation Protocols", c: "OT Technician", p: 45 },
              { t: "Module 8 · Hematology Lab Practice", c: "Lab Technician", p: 91 },
            ].map((m) => (
              <div key={m.t} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-plum/40 transition-colors">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark shrink-0">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-plum-dark truncate">{m.t}</div>
                  <div className="text-xs text-muted-foreground">{m.c}</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-plum-dark rounded-full" style={{ width: `${m.p}%` }} />
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{m.p}%</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Streak */}
        <Card>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="font-display text-lg font-bold text-plum-dark">Streak</h3>
          </div>
          <div className="mt-3 font-display text-5xl font-bold text-plum-dark">14<span className="text-base font-medium text-muted-foreground"> days</span></div>
          <p className="mt-1 text-xs text-muted-foreground">Best: 21 days · Keep it up!</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i < 14 ? "bg-lime" : i < 21 ? "bg-lime-soft" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-plum-dark text-cream p-4">
            <div className="text-xs uppercase tracking-widest text-lime">Next badge</div>
            <div className="font-display font-bold mt-1">Iron Discipline</div>
            <div className="text-xs text-cream/70 mt-1">7 more days to unlock</div>
          </div>
        </Card>
      </div>

      {/* Upcoming + Announcements */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-bold text-plum-dark">Upcoming</h3>
          <ul className="mt-4 space-y-3">
            {[
              { d: "Today", t: "Live · ICU Ventilator Mgmt", w: "4:00 PM", a: "Dr. Rao" },
              { d: "Tomorrow", t: "Mock Exam · Anatomy II", w: "10:00 AM", a: "Proctored" },
              { d: "Fri", t: "Workshop · Suturing Practice", w: "2:30 PM", a: "Campus Lab 3" },
            ].map((e) => (
              <li key={e.t} className="flex items-center gap-4 rounded-xl border border-border p-3">
                <div className="text-center w-14 shrink-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{e.d}</div>
                  <div className="font-display font-bold text-plum-dark text-sm">{e.w}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-plum-dark">{e.t}</div>
                  <div className="text-xs text-muted-foreground">{e.a}</div>
                </div>
                <button className="text-xs font-semibold rounded-full bg-plum-dark text-cream px-3 py-1.5">Join</button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-display text-lg font-bold text-plum-dark">Announcements</h3>
          <ul className="mt-4 space-y-3">
            {[
              { t: "Apollo Hospitals on-campus drive — Mar 14", c: "Placements" },
              { t: "New module released: Trauma Care basics", c: "Curriculum" },
              { t: "Fee reminder · Installment 3 due Mar 30", c: "Finance" },
            ].map((a) => (
              <li key={a.t} className="rounded-xl bg-secondary p-3.5">
                <div className="text-[10px] uppercase tracking-widest text-plum">{a.c}</div>
                <div className="text-sm font-semibold text-plum-dark mt-0.5">{a.t}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
