import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_student/student/schedule")({
  component: Schedule,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
const EVENTS: Record<string, { t: string; type: string }> = {
  "Mon-9 AM": { t: "Anatomy", type: "lec" },
  "Mon-11 AM": { t: "Lab Prac", type: "lab" },
  "Tue-10 AM": { t: "Pharma", type: "lec" },
  "Wed-9 AM": { t: "Workshop", type: "lab" },
  "Wed-2 PM": { t: "Live Q&A", type: "live" },
  "Thu-10 AM": { t: "Patient Care", type: "lec" },
  "Thu-4 PM": { t: "Mock Exam", type: "exam" },
  "Fri-11 AM": { t: "ICU Care", type: "lec" },
  "Fri-3 PM": { t: "Suturing", type: "lab" },
};

const typeStyle: Record<string, string> = {
  lec: "bg-plum-dark text-cream",
  lab: "bg-lime text-plum-dark",
  live: "bg-orange-500 text-white",
  exam: "bg-red-500 text-white",
};

function Schedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-plum-dark">Weekly Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">Week of March 10 – 16, 2026</p>
      </div>

      <Card className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-8 gap-2 text-xs">
            <div></div>
            {DAYS.map((d) => (
              <div key={d} className="text-center font-display font-bold text-plum-dark py-2 border-b border-border">{d}</div>
            ))}
            {SLOTS.map((s) => (
              <Fragment key={s}>
                <div className="text-muted-foreground text-right pr-3 py-3 font-mono">{s}</div>
                {DAYS.map((d) => {
                  const ev = EVENTS[`${d}-${s}`];
                  return (
                    <div key={`${d}-${s}`} className="min-h-[56px] rounded-lg border border-dashed border-border/60 p-1.5">
                      {ev && (
                        <div className={`h-full rounded-md p-2 text-[11px] font-semibold ${typeStyle[ev.type]}`}>
                          {ev.t}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 text-xs">
        {[
          { l: "Lecture", c: "bg-plum-dark" },
          { l: "Lab/Workshop", c: "bg-lime" },
          { l: "Live class", c: "bg-orange-500" },
          { l: "Exam", c: "bg-red-500" },
        ].map((k) => (
          <div key={k.l} className="flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1.5">
            <span className={`h-2.5 w-2.5 rounded ${k.c}`} /> {k.l}
          </div>
        ))}
      </div>
    </div>
  );
}
