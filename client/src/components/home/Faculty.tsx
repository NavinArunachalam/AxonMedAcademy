import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const faculty = [
  { name: "Dr. Anita Sharma",  role: "Senior Cardiologist", specialty: "Cardiac Care",     years: 18, rating: 4.9, initials: "AS", tint: "from-plum to-plum-dark" },
  { name: "Dr. Rohan Mehta",   role: "Anesthesiologist",    specialty: "OT Technology",    years: 14, rating: 4.8, initials: "RM", tint: "from-plum-dark to-plum" },
  { name: "Dr. Priya Iyer",    role: "Chief Pathologist",   specialty: "Lab Sciences",     years: 22, rating: 5.0, initials: "PI", tint: "from-plum to-plum-dark" },
  { name: "Dr. Aman Khan",     role: "Radiologist",         specialty: "Imaging",          years: 12, rating: 4.7, initials: "AK", tint: "from-plum-dark to-plum" },
  { name: "Nurse Latha R.",    role: "Nursing Head",        specialty: "Staff Nursing",    years: 20, rating: 4.9, initials: "LR", tint: "from-plum to-plum-dark" },
  { name: "Dr. Sanjay V.",     role: "ICU Specialist",      specialty: "Critical Care",    years: 16, rating: 4.8, initials: "SV", tint: "from-plum-dark to-plum" },
];

export function Faculty() {
  const [idx, setIdx] = useState(0);
  const visible = faculty.slice(idx, idx + 4).concat(faculty.slice(0, Math.max(0, idx + 4 - faculty.length)));

  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— 04 / Faculty</div>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight">
              Taught by clinicians,<br/>not just instructors.
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIdx((i) => (i - 1 + faculty.length) % faculty.length)} className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-plum-dark hover:text-cream hover:border-plum-dark transition">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setIdx((i) => (i + 1) % faculty.length)} className="grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-plum-dark hover:text-cream hover:border-plum-dark transition">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((f, i) => (
            <div key={`${f.name}-${i}`} className="group rounded-3xl border border-border bg-card p-6 hover:-translate-y-1 hover:border-plum-dark/30 transition-all">
              <div className={`relative h-44 rounded-2xl bg-gradient-to-br ${f.tint} overflow-hidden grid place-items-center`}>
                <div className="absolute inset-0 bg-noise opacity-30" />
                <span className="relative font-display text-5xl font-bold text-cream/90">{f.initials}</span>
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-1 text-[11px] font-bold text-plum-dark">
                  <Star className="h-3 w-3 fill-lime text-lime" /> {f.rating}
                </div>
              </div>
              <h3 className="mt-5 font-display font-semibold text-plum-dark">{f.name}</h3>
              <div className="mt-1 text-xs text-foreground/60">{f.role}</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-plum-dark">{f.specialty}</span>
                <span className="text-xs text-foreground/60">{f.years}y</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
