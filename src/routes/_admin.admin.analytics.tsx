import { createFileRoute } from "@tanstack/react-router";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div className="space-y-6 text-cream">
      <div>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-cream/60 text-sm mt-1">Cohort performance, traffic, and outcomes</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DarkCard>
          <h3 className="font-display font-bold text-lg">Course completion rate</h3>
          <div className="mt-5 space-y-3">
            {[
              { c: "Staff Nursing", p: 88 },
              { c: "OT Technician", p: 81 },
              { c: "Lab Technician", p: 92 },
              { c: "ICU Critical Care", p: 74 },
              { c: "Radiology", p: 67 },
            ].map((r) => (
              <div key={r.c}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{r.c}</span>
                  <span className="font-mono text-lime">{r.p}%</span>
                </div>
                <div className="h-2 rounded-full bg-cream/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-plum-light to-lime" style={{ width: `${r.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </DarkCard>

        <DarkCard>
          <h3 className="font-display font-bold text-lg">Traffic sources</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-40 w-40 shrink-0">
              <div className="absolute inset-0 rounded-full" style={{
                background: "conic-gradient(#C5F542 0 42%, #6B4E9B 42% 68%, #ffffff20 68% 84%, #C5F54260 84% 100%)"
              }} />
              <div className="absolute inset-6 rounded-full bg-[#1A0F33] grid place-items-center">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold">48K</div>
                  <div className="text-[10px] uppercase tracking-widest text-cream/60">Visitors</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-sm flex-1">
              {[
                { l: "Organic search", p: "42%", c: "bg-lime" },
                { l: "Direct", p: "26%", c: "bg-plum-light" },
                { l: "Referral", p: "16%", c: "bg-cream/30" },
                { l: "Social", p: "16%", c: "bg-lime/60" },
              ].map((s) => (
                <li key={s.l} className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded ${s.c}`} />
                  <span className="flex-1">{s.l}</span>
                  <span className="font-mono text-cream/70">{s.p}</span>
                </li>
              ))}
            </ul>
          </div>
        </DarkCard>
      </div>

      <DarkCard>
        <h3 className="font-display font-bold text-lg">Revenue & enrolments (12 mo)</h3>
        <div className="mt-5 h-64 flex items-end gap-2">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = 30 + Math.sin(i / 2) * 18 + i * 3;
            const b = 20 + Math.cos(i / 2.4) * 14 + i * 4;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end h-full">
                  <div className="flex-1 rounded-t bg-lime" style={{ height: `${a}%` }} />
                  <div className="flex-1 rounded-t bg-plum-light" style={{ height: `${b}%` }} />
                </div>
                <div className="text-[9px] text-cream/50 font-mono">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-5 text-xs">
          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-lime" /> Revenue</div>
          <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-plum-light" /> Enrolments</div>
        </div>
      </DarkCard>
    </div>
  );
}
