import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/site/Layout";
import { Star, Award, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { api, getAssetUrl } from "@/lib/api";

export const Route = createFileRoute("/faculty")({ component: FacultyPage });

function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/public/faculty");
        if (res.success) {
          setFaculty(res.facultyList || []);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

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
          {loading ? (
            <div className="text-center py-20 text-foreground/60">Loading faculty directory...</div>
          ) : faculty.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">No faculty members found.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {faculty.map((f) => (
                <div key={f._id || f.id} className="group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all">
                  <div className="relative h-60 bg-gradient-to-br from-plum to-plum-dark overflow-hidden grid place-items-center">
                    <div className="absolute inset-0 bg-noise opacity-30" />
                    {f.image ? (
                      <img src={getAssetUrl(f.image)} alt={f.name} className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="relative font-display text-6xl font-bold text-cream/90">{f.initials || f.name.charAt(0)}</span>
                    )}
                    <span className="absolute top-3 left-3 rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark z-10">{f.specialty}</span>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-[11px] font-bold text-plum-dark z-10">
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
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
