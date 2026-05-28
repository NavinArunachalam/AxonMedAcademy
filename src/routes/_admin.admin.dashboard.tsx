import { createFileRoute } from "@tanstack/react-router";
import {
  Users, GraduationCap, IndianRupee, TrendingUp, Briefcase, BookOpen,
  ArrowUpRight, ArrowDownRight, Activity,
} from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/dashboard")({
  component: AdminHome,
});

function Stat({ label, value, delta, up = true, icon: Icon }: {
  label: string; value: string; delta: string; up?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl bg-[#1A0F33] border border-cream/10 p-5 text-cream">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-widest text-cream/60">{label}</div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-lime/15 text-lime"><Icon className="h-4 w-4" /></div>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      <div className={`mt-1 flex items-center gap-1 text-xs ${up ? "text-lime" : "text-red-400"}`}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {delta}
      </div>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="space-y-6 text-cream">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Overview</h1>
          <p className="text-cream/60 text-sm mt-1">Academy performance · March 2026</p>
        </div>
        <div className="flex gap-2">
          {["7d", "30d", "90d", "All"].map((t, i) => (
            <button key={t} className={`text-xs font-semibold rounded-full px-3 py-1.5 ${i===1 ? "bg-lime text-plum-dark" : "bg-cream/10 text-cream/70"}`}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active Students" value="2,847" delta="+12.4%" icon={Users} />
        <Stat label="Course Enrolments" value="4,128" delta="+8.1%" icon={BookOpen} />
        <Stat label="Revenue (MTD)" value="₹86.4L" delta="+18.7%" icon={IndianRupee} />
        <Stat label="Placement Rate" value="95.2%" delta="-0.3%" up={false} icon={Briefcase} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <DarkCard className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg">Enrolment trend</h3>
            <span className="text-xs text-cream/60 flex items-center gap-1"><Activity className="h-3 w-3" /> Live</span>
          </div>
          <div className="mt-5 h-56 flex items-end gap-2">
            {[42, 58, 64, 51, 73, 86, 78, 92, 104, 88, 110, 124].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-gradient-to-t from-lime/30 to-lime" style={{ height: `${v / 1.4}%` }} />
                <div className="text-[9px] text-cream/50 font-mono">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard>
          <h3 className="font-display font-bold text-lg">Top courses</h3>
          <ul className="mt-4 space-y-3">
            {[
              { t: "Staff Nursing Diploma", n: 842, p: 95 },
              { t: "OT Technician Pro", n: 614, p: 78 },
              { t: "Lab Technician", n: 548, p: 72 },
              { t: "ICU Critical Care", n: 421, p: 58 },
              { t: "Radiology Basics", n: 312, p: 44 },
            ].map((c) => (
              <li key={c.t}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold">{c.t}</span>
                  <span className="font-mono text-cream/60">{c.n}</span>
                </div>
                <div className="h-1.5 rounded-full bg-cream/10 overflow-hidden">
                  <div className="h-full bg-lime rounded-full" style={{ width: `${c.p}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </DarkCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DarkCard>
          <h3 className="font-display font-bold text-lg">Recent activity</h3>
          <ul className="mt-4 space-y-3">
            {[
              { c: "Enrolment", t: "Aanya Sharma joined Staff Nursing", w: "2m" },
              { c: "Payment", t: "₹45,000 received from Rahul Verma", w: "11m" },
              { c: "Placement", t: "Apollo confirmed 12 hires", w: "1h" },
              { c: "Exam", t: "Anatomy Final completed by 184 students", w: "3h" },
              { c: "Course", t: "New module published · Trauma Care", w: "5h" },
            ].map((a) => (
              <li key={a.t} className="flex items-start gap-3 border-b border-cream/10 pb-3 last:border-0">
                <span className="bg-lime/15 text-lime text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">{a.c}</span>
                <span className="flex-1 text-sm">{a.t}</span>
                <span className="text-[10px] text-cream/50 font-mono">{a.w}</span>
              </li>
            ))}
          </ul>
        </DarkCard>

        <DarkCard>
          <h3 className="font-display font-bold text-lg">Placement pipeline</h3>
          <div className="mt-4 space-y-3">
            {[
              { h: "Apollo Hospitals", o: 24, c: "Bengaluru", s: "Interviewing" },
              { h: "Fortis Healthcare", o: 18, c: "Mumbai", s: "Offers extended" },
              { h: "Manipal Hospitals", o: 15, c: "Bengaluru", s: "Shortlisting" },
              { h: "Max Healthcare", o: 22, c: "Delhi NCR", s: "On-site visit" },
            ].map((p) => (
              <div key={p.h} className="rounded-xl bg-cream/5 p-3.5 flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-lime text-plum-dark font-bold text-xs">{p.h.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{p.h}</div>
                  <div className="text-[11px] text-cream/60">{p.c} · {p.s}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-lime">{p.o}</div>
                  <div className="text-[9px] uppercase tracking-widest text-cream/50">Openings</div>
                </div>
              </div>
            ))}
          </div>
        </DarkCard>
      </div>

      <DarkCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-lime" /> Conversion funnel</h3>
          <span className="text-xs text-cream/60">Last 30 days</span>
        </div>
        <div className="grid sm:grid-cols-5 gap-2">
          {[
            { l: "Visitors", v: "48,210", p: 100 },
            { l: "Leads", v: "6,842", p: 72 },
            { l: "Counselling", v: "3,128", p: 58 },
            { l: "Applied", v: "1,486", p: 42 },
            { l: "Enrolled", v: "412", p: 28 },
          ].map((s) => (
            <div key={s.l} className="rounded-xl bg-cream/5 p-4">
              <div className="text-[10px] uppercase tracking-widest text-cream/60">{s.l}</div>
              <div className="mt-1 font-display text-xl font-bold">{s.v}</div>
              <div className="mt-2 h-1 rounded-full bg-cream/10 overflow-hidden">
                <div className="h-full bg-lime" style={{ width: `${s.p}%` }} />
              </div>
            </div>
          ))}
        </div>
      </DarkCard>
    </div>
  );
}
