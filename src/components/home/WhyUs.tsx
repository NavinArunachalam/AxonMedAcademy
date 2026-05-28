import { Video, ShieldCheck, Award, Briefcase, Users, CreditCard } from "lucide-react";

const items = [
  { icon: Video, title: "Live + Recorded Classes", desc: "Flexible learning at your own pace with HD recordings of every session." },
  { icon: ShieldCheck, title: "Proctored Exams", desc: "AI-monitored, tamper-proof assessments that hospitals trust." },
  { icon: Award, title: "Blockchain Certificates", desc: "Lifetime-verifiable credentials with QR-based proof of authenticity." },
  { icon: Briefcase, title: "95% Placement Rate", desc: "Industry-leading job outcomes through 200+ hospital partnerships." },
  { icon: Users, title: "Expert Faculty", desc: "Learn from doctors and senior nurses with 15+ years clinical experience." },
  { icon: CreditCard, title: "Easy EMI Options", desc: "Begin your career journey for as little as ₹999/month, no hidden fees." },
];

export function WhyUs() {
  return (
    <section className="py-10 lg:py-16 bg-secondary/40">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— 02 / Why Medicore</div>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight">
            Built for the realities<br />of modern healthcare.
          </h2>
        </div>

        <div className="mt-14 grid gap-px bg-border rounded-3xl overflow-hidden lg:grid-cols-3 sm:grid-cols-2">
          {items.map((it) => (
            <div key={it.title} className="group bg-card p-8 hover:bg-plum-dark transition-colors duration-300">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary group-hover:bg-lime transition-colors">
                <it.icon className="h-5 w-5 text-plum-dark" />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-plum-dark group-hover:text-cream transition-colors">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65 group-hover:text-cream/75 transition-colors">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
