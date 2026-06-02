import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/site/Layout";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PublicLayout>
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 h-[400px] w-[400px] rounded-full bg-lime/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— Contact</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]">
            Let's start your<br /><span className="text-plum">healthcare career.</span>
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, t: "Visit us", v: "Plot 21, Medical Campus, Hosur Road, Bengaluru — 560001" },
              { icon: Phone, t: "Call us", v: "+91 98765 43210 · Mon–Sat 9am–8pm" },
              { icon: Mail, t: "Email", v: "hello@Axon.academy" },
              { icon: Clock, t: "Office", v: "Monday – Saturday, 9 AM to 8 PM" },
            ].map(c => (
              <div key={c.t} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-plum-dark text-lime shrink-0">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display font-semibold text-plum-dark">{c.t}</div>
                  <div className="mt-1 text-sm text-foreground/70">{c.v}</div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="lg:col-span-3 rounded-3xl border border-border bg-card p-8 lg:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-plum-dark">Tell us about you.</h2>
            <p className="mt-2 text-sm text-foreground/65">A counsellor will reach out within 24 hours.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Full name" placeholder="Priya Krishnan" required />
              <Field label="Email" type="email" placeholder="you@example.com" required />
              <Field label="Phone" placeholder="+91 98xxx xxxxx" />
              <Field label="Interest" placeholder="Staff Nursing, OT Tech…" />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-plum-dark mb-1.5">Message</label>
              <textarea rows={5} placeholder="Anything you'd like us to know…" className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum" />
            </div>
            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-plum-dark px-7 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition">
              {sent ? "Sent — we'll be in touch ✓" : <>Send message <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-plum-dark mb-1.5">{label}</label>
      <input {...props} className="w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum" />
    </div>
  );
}
