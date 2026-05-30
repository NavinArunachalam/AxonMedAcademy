import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const posts = [
  { cat: "Career", date: "May 18, 2026", title: "What hospitals actually look for in a Staff Nurse hire", excerpt: "Insights from 50+ HR heads at India's leading hospital chains.", tint: "from-plum to-plum-dark" },
  { cat: "Clinical", date: "May 12, 2026", title: "ICU monitoring trends every junior tech should master", excerpt: "Modern bedside monitoring is shifting. Here's the new baseline.", tint: "from-plum-dark to-plum" },
  { cat: "Exam Prep", date: "May 04, 2026", title: "How to pass our proctored DMLT exam (without panic)", excerpt: "A study plan from candidates who scored in the top 5%.", tint: "from-plum to-plum-dark" },
];

export function BlogPreview() {
  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— 08 / Journal</div>
            <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight">
              Read. Learn. Lead.
            </h2>
          </div>
          <Link to="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-plum-dark">
            All articles
            <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group rounded-3xl overflow-hidden bg-card border border-border hover:-translate-y-1 transition-all">
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${p.tint} overflow-hidden`}>
                <div className="absolute inset-0 bg-noise opacity-30" />
                <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-plum-dark">
                  {p.cat}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-foreground/55 font-mono">{p.date}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-plum-dark group-hover:text-plum transition leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plum-dark group-hover:gap-3 transition-all">
                  Read article <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
