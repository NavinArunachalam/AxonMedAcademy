import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Share2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_student/student/certificates")({
  component: Certificates,
});

const CERTS = [
  { t: "Basic Life Support (BLS)", issued: "Jan 12, 2026", id: "MCA-BLS-2401", verified: true },
  { t: "Infection Control Specialist", issued: "Dec 04, 2025", id: "MCA-ICS-1124", verified: true },
];

function Certificates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-plum-dark">Certificates</h1>
          <p className="text-sm text-muted-foreground mt-1">Blockchain-verified credentials you can share anywhere</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          All certificates verified on-chain
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {CERTS.map((c) => (
          <div key={c.id} className="rounded-3xl overflow-hidden border border-border bg-white">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-plum-dark to-plum p-6 text-cream">
              <div className="absolute inset-0 bg-grid opacity-15" />
              <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-lime text-plum-dark">
                <Award className="h-5 w-5" />
              </div>
              <div className="relative h-full flex flex-col">
                <div className="text-[10px] uppercase tracking-widest text-lime">Certificate of Completion</div>
                <div className="mt-auto">
                  <div className="font-display text-2xl font-bold leading-tight">{c.t}</div>
                  <div className="mt-2 text-xs text-cream/70">Aanya Sharma · Issued {c.issued}</div>
                  <div className="font-mono text-[10px] text-lime mt-1">{c.id}</div>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {c.verified && <span className="text-emerald-600 font-semibold">✓ Verified</span>}
              </div>
              <div className="flex gap-2">
                <button className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-plum-dark hover:bg-plum-dark hover:text-cream"><Share2 className="h-4 w-4" /></button>
                <button className="inline-flex items-center gap-2 rounded-full bg-plum-dark text-cream px-4 py-2 text-xs font-semibold"><Download className="h-3.5 w-3.5" /> Download PDF</button>
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-3xl border-2 border-dashed border-border bg-white p-8 grid place-items-center text-center">
          <Award className="h-10 w-10 text-plum/40" />
          <div className="mt-3 font-display font-bold text-plum-dark">Staff Nursing Diploma</div>
          <div className="text-xs text-muted-foreground mt-1">Unlock at 100% course completion</div>
          <div className="mt-4 w-full max-w-[200px]">
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-lime w-[72%]" />
            </div>
            <div className="text-[10px] mt-1 text-muted-foreground font-mono">72% complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
