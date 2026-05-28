import { Quote, Play, Star } from "lucide-react";

const items = [
  { name: "Priya Krishnan", role: "Staff Nurse · Apollo Hospitals", text: "From classroom to a top hospital in 8 months. The proctored exams gave my employer real confidence.", initials: "PK" },
  { name: "Arjun Reddy",    role: "OT Technician · Manipal",        text: "The hands-on OT simulation modules made my transition to the operating theatre seamless. Top-tier faculty.", initials: "AR" },
  { name: "Sneha Pillai",   role: "Lab Technician · Fortis",        text: "I started with ₹999/month EMI and now earn 6× that monthly. The placement team was relentlessly supportive.", initials: "SP" },
];

export function Testimonials() {
  return (
    <section className="py-10 lg:py-16 bg-secondary/40">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— 05 / Voices</div>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight">
              5,000 careers.<br />One academy.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-card border border-border px-4 py-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-lime text-lime" />)}
            </div>
            <span className="text-sm font-semibold text-plum-dark">4.9 / 5</span>
            <span className="text-xs text-foreground/60">· 2,300+ reviews</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <div key={t.name} className={`relative rounded-3xl p-7 border ${i === 1 ? "bg-plum-dark text-cream border-plum-dark" : "bg-card border-border"}`}>
              <Quote className={`h-8 w-8 ${i === 1 ? "text-lime" : "text-plum/40"}`} />
              <p className={`mt-5 text-base leading-relaxed ${i === 1 ? "text-cream/90" : "text-foreground/80"}`}>"{t.text}"</p>
              <div className="mt-8 flex items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-full font-display font-bold ${i === 1 ? "bg-lime text-plum-dark" : "bg-plum-dark text-lime"}`}>
                  {t.initials}
                </div>
                <div>
                  <div className={`font-semibold text-sm ${i === 1 ? "text-cream" : "text-plum-dark"}`}>{t.name}</div>
                  <div className={`text-xs ${i === 1 ? "text-cream/65" : "text-foreground/60"}`}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video testimonial strip */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <button key={i} className="group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-plum to-plum-dark">
              <div className="absolute inset-0 bg-noise opacity-30" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-lime text-plum-dark group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-cream text-xs font-semibold">Watch student story #{i}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
