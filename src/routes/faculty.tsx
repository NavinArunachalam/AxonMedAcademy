import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/site/Layout";
import { Star, Award, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/faculty")({ component: FacultyPage });

const FACULTY = [
  { name: "Dr. Anita Sharma",  role: "Senior Cardiologist", specialty: "Cardiac Care",  years: 18, rating: 4.9, initials: "AS" },
  { name: "Dr. Rohan Mehta",   role: "Anesthesiologist",    specialty: "OT Technology", years: 14, rating: 4.8, initials: "RM" },
  { name: "Dr. Priya Iyer",    role: "Chief Pathologist",   specialty: "Lab Sciences",  years: 22, rating: 5.0, initials: "PI" },
  { name: "Dr. Aman Khan",     role: "Radiologist",         specialty: "Imaging",       years: 12, rating: 4.7, initials: "AK" },
  { name: "Nurse Latha R.",    role: "Nursing Head",        specialty: "Staff Nursing", years: 20, rating: 4.9, initials: "LR" },
  { name: "Dr. Sanjay V.",     role: "ICU Specialist",      specialty: "Critical Care", years: 16, rating: 4.8, initials: "SV" },
  { name: "Dr. Meera Joshi",   role: "Pediatrician",        specialty: "Pediatric Care",years: 11, rating: 4.8, initials: "MJ" },
  { name: "Dr. Vikram Rao",    role: "Emergency Physician", specialty: "ER & Trauma",   years: 13, rating: 4.7, initials: "VR" },
];

function FacultyPage() {
  return (
    <PublicLayout>
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-lime/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— Faculty</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]">
            The clinicians who<br />will shape <span className="text-plum">your craft.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-foreground/70">
            Every faculty member is a practicing clinician with 10+ years of bedside experience.
            We don't hire educators — we hire experts who teach.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACULTY.map((f) => (
              <div key={f.name} className="group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all">
                <div className="relative h-60 bg-gradient-to-br from-plum to-plum-dark overflow-hidden grid place-items-center">
                  <div className="absolute inset-0 bg-noise opacity-30" />
                  <span className="relative font-display text-6xl font-bold text-cream/90">{f.initials}</span>
                  <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark">{f.specialty}</span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-plum-dark">
                    <Star className="h-3 w-3 fill-plum-dark" /> {f.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-plum-dark text-lg">{f.name}</h3>
                  <div className="mt-1 text-sm text-foreground/65">{f.role}</div>
                  <div className="mt-4 flex items-center gap-3 text-xs text-foreground/60">
                    <span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" /> {f.years} yrs</span>
                    <span className="inline-flex items-center gap-1"><Award className="h-3.5 w-3.5" /> Top-rated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
