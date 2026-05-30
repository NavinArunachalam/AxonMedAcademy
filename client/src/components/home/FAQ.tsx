import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  { q: "What are the eligibility criteria for paramedical courses?", a: "Most diploma programs require 10+2 with Biology. Certain certificate courses accept 10th-pass candidates. We assess each application individually." },
  { q: "Are the certificates recognized by hospitals?", a: "Yes — every certificate is blockchain-verified and recognized by our 200+ hospital partners across India. Verification is instant via a QR code." },
  { q: "What is the placement support?", a: "Dedicated placement managers, mock interviews, resume workshops, and direct interviews with partner hospitals. Our placement rate is 95% within 6 months." },
  { q: "Can I pay in installments?", a: "Absolutely. We offer 0% EMI through partner NBFCs starting at ₹999/month. Scholarships are available for merit and need-based applicants." },
  { q: "Are classes online or offline?", a: "We offer Online, Offline, and Hybrid modes. Live classes are recorded so you can revisit anytime. Practical labs are in-campus or at partner hospital sites." },
  { q: "How long are the programs?", a: "From 1-month intensive certificates to 1-year diploma programs. Course duration is listed clearly on each course page." },
  { q: "Is there a refund policy?", a: "Yes — full refund within the first 7 days, no questions asked. Pro-rated thereafter as per our policy." },
  { q: "How are exams conducted?", a: "Through our AI-proctored online platform with identity verification, screen recording, and live invigilation. Practical exams are on-site at partner labs." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-10 lg:py-16 bg-secondary/40">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— 09 / Questions</div>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight">
            Frequently asked.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`rounded-2xl border bg-card transition-colors ${isOpen ? "border-plum-dark" : "border-border"}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold text-plum-dark">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-lime text-plum-dark" : "bg-secondary text-plum-dark"}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/75">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
