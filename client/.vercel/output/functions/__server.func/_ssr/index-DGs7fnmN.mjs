import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PublicLayout } from "./Layout-dYQ0o33O.mjs";
import { ab as useClassroomStore, K as getPublicPrograms, A as getAssetUrl, f as api } from "./router-DjvsagK9.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { ad as Sparkles, d as ArrowRight, _ as Play, e as ArrowUpRight, K as LoaderCircle, g as BookOpen, v as Clock, an as Users, ae as Star, ao as Video, ab as ShieldCheck, f as Award, h as Briefcase, w as CreditCard, t as ClipboardCheck, G as GraduationCap, a5 as ScrollText, n as ChevronLeft, o as ChevronRight, a0 as Quote, V as Minus, $ as Plus, y as HeartPulse, A as Activity, U as Microscope, Z as Pill } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const stats$1 = [
  { v: "5,000+", l: "Students Trained" },
  { v: "200+", l: "Hospital Partners" },
  { v: "95%", l: "Placement Rate" },
  { v: "30+", l: "Specialized Courses" }
];
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden pt-6 lg:pt-10 pb-12 lg:pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-grid opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-lime/25 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-plum/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "inline-flex items-center gap-2 rounded-full bg-plum-dark/5 border border-plum-dark/10 px-3 py-1.5 text-xs font-semibold text-plum-dark",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-plum" }),
              "India's #1 Paramedical Training Academy"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.05 },
            className: "mt-5 font-display font-bold text-plum-dark text-balance text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.02] tracking-[-0.03em]",
            children: [
              "Train. Certify.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Get placed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-0 bottom-1 h-3 lg:h-4 bg-lime -z-0 rounded-sm" })
              ] }),
              " ",
              "in top hospitals."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.15 },
            className: "mt-6 max-w-xl text-base lg:text-lg text-foreground/70 leading-relaxed",
            children: "Join 5,000+ paramedical professionals who trained with Axon and now build careers at India's leading hospitals. Live classes, proctored exams, blockchain certificates."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.25 },
            className: "mt-8 flex flex-wrap gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/courses",
                  className: "group inline-flex items-center gap-2 rounded-full bg-plum-dark px-6 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition",
                  children: [
                    "Explore Courses",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-full border border-plum-dark/15 bg-white/50 backdrop-blur px-6 py-3.5 text-sm font-semibold text-plum-dark hover:bg-white transition", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-full bg-lime text-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-current" }) }),
                "Book a Free Demo"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.8, delay: 0.4 },
            className: "mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl",
            children: stats$1.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl lg:text-3xl font-bold text-plum-dark", children: s.v }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs lg:text-sm text-foreground/60", children: s.l })
            ] }, s.l))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.7, delay: 0.2 },
          className: "lg:col-span-5 relative hidden md:block",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroArt, {})
        }
      )
    ] }) })
  ] });
}
function HeroArt() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[5/6] w-full max-w-md mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-[40px] bg-gradient-to-br from-plum-dark via-plum to-plum-dark overflow-hidden shadow-2xl shadow-plum-dark/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-10 h-64 w-64 rounded-full bg-lime/30 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 400 100", className: "absolute top-1/2 -translate-y-1/2 inset-x-0 w-full text-lime/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d: "M0 50 L80 50 L100 20 L120 80 L140 35 L160 50 L260 50 L280 25 L300 75 L320 40 L340 50 L400 50",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: { duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatChip, { icon: HeartPulse, label: "Live Vitals", pos: "top-8 left-6", delay: 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatChip, { icon: Activity, label: "Pulse 76", pos: "top-24 right-4", delay: 0.4 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatChip, { icon: Microscope, label: "Lab Module", pos: "bottom-28 left-4", delay: 0.8 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatChip, { icon: Pill, label: "Pharma Prep", pos: "bottom-8 right-6", delay: 1.2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { delay: 0.4, duration: 0.6 },
        className: "absolute bottom-6 left-6 right-6 rounded-2xl bg-cream/95 backdrop-blur p-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { className: "h-5 w-5 text-plum-dark" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-plum-dark/60 font-medium", children: "Now Live" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark", children: "Cardiac Care Module — Dr. Sharma" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold uppercase text-plum-dark bg-lime rounded-full px-2 py-1", children: "LIVE" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 h-1.5 w-full rounded-full bg-plum-dark/10 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full bg-plum-dark rounded-full",
              initial: { width: "0%" },
              animate: { width: "62%" },
              transition: { duration: 1.5, delay: 0.6 }
            }
          ) })
        ]
      }
    )
  ] }) });
}
function FloatChip({
  icon: Icon,
  label,
  pos,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: [0, -8, 0] },
      transition: {
        opacity: { delay, duration: 0.6 },
        y: { delay, duration: 3.5, repeat: Infinity, ease: "easeInOut" }
      },
      className: `absolute ${pos} flex items-center gap-2 rounded-full bg-cream/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-plum-dark shadow-lg`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-plum" }),
        label
      ]
    }
  );
}
function CourseStrip() {
  const [programs, setPrograms] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    getPublicPrograms().then((data) => setPrograms(data)).catch((err) => console.error(err)).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 01 / Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: [
          "Career-grade courses,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "built with hospitals." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "group inline-flex items-center gap-2 text-sm font-semibold text-plum-dark hover:gap-3 transition-all", children: [
        "View all 30+ courses",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:rotate-45 transition-transform" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-plum" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: programs.slice(0, 6).map((c, i) => {
      const color = i % 2 === 0 ? "from-plum to-plum-dark" : "from-plum-dark to-plum";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 hover:border-plum-dark/30 hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            c.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 overflow-hidden rounded-2xl bg-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(c.image), alt: c.title, className: "h-full w-full object-cover" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-2xl bg-plum-dark text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark", children: c.specialty || c.category || "Course" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-lg font-semibold text-plum-dark group-hover:text-plum transition", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4 text-xs text-foreground/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              " ",
              c.duration || "6 Months"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
              " ",
              c.title.length * 123 % 2e3 + 300
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-lime text-lime" }),
              " ",
              c.rating || 4.5
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/50", children: "Starting at" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl font-bold text-plum-dark", children: [
                "₹",
                c.price.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "rounded-full bg-plum-dark px-4 py-2 text-xs font-semibold text-cream hover:bg-plum transition", children: "Enroll →" })
          ] })
        ] })
      ] }, c.id);
    }) })
  ] }) });
}
const items$1 = [
  { icon: Video, title: "Live + Recorded Classes", desc: "Flexible learning at your own pace with HD recordings of every session." },
  { icon: ShieldCheck, title: "Proctored Exams", desc: "AI-monitored, tamper-proof assessments that hospitals trust." },
  { icon: Award, title: "Blockchain Certificates", desc: "Lifetime-verifiable credentials with QR-based proof of authenticity." },
  { icon: Briefcase, title: "95% Placement Rate", desc: "Industry-leading job outcomes through 200+ hospital partnerships." },
  { icon: Users, title: "Expert Faculty", desc: "Learn from doctors and senior nurses with 15+ years clinical experience." },
  { icon: CreditCard, title: "Easy EMI Options", desc: "Begin your career journey for as little as ₹999/month, no hidden fees." }
];
function WhyUs() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 02 / Why Axon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: [
        "Built for the realities",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "of modern healthcare."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-px bg-border rounded-3xl overflow-hidden lg:grid-cols-3 sm:grid-cols-2", children: items$1.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card p-8 hover:bg-plum-dark transition-colors duration-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 place-items-center rounded-xl bg-secondary group-hover:bg-lime transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-5 w-5 text-plum-dark" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-display text-lg font-semibold text-plum-dark group-hover:text-cream transition-colors", children: it.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-foreground/65 group-hover:text-cream/75 transition-colors", children: it.desc })
    ] }, it.title)) })
  ] }) });
}
const stats = [
  { v: 4280, suffix: "+", l: "Placements this year" },
  { v: 42, suffix: "K", l: "Avg starting salary (₹)" },
  { v: 215, suffix: "", l: "Partner hospitals" },
  { v: 28, suffix: "", l: "States covered" }
];
function useCountUp(target, active) {
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!active) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return val;
}
function PlacementBanner() {
  const ref = reactExports.useRef(null);
  const [active, setActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative py-12 lg:py-20 overflow-hidden bg-plum-dark text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-lime/15 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CrossPattern, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-lime", children: "— 03 / Outcomes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight", children: [
          "The numbers speak for our",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime", children: "students' careers." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCell, { ...s, active }, s.l)) })
    ] })
  ] });
}
function StatCell({ v, suffix, l, active }) {
  const count = useCountUp(v, active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-cream/15 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-5xl lg:text-6xl font-bold text-cream tracking-tight", children: [
      count.toLocaleString(),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime", children: suffix })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-sm text-cream/65", children: l })
  ] });
}
function CrossPattern() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 w-full h-full opacity-[0.04]", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "crosses", width: "60", height: "60", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M28 18h4v8h8v4h-8v8h-4v-8h-8v-4h8z", fill: "white" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#crosses)" })
  ] });
}
function Faculty() {
  const [faculty, setFaculty] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [idx, setIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/public/faculty");
        if (res.success) {
          const tints = ["from-plum to-plum-dark", "from-plum-dark to-plum"];
          const listWithTints = (res.facultyList || []).map((f, i) => ({
            ...f,
            tint: tints[i % tints.length]
          }));
          setFaculty(listWithTints);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);
  const visible = faculty.length > 0 ? faculty.slice(idx, idx + 4).concat(faculty.slice(0, Math.max(0, idx + 4 - faculty.length))) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 04 / Faculty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: [
          "Taught by clinicians,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "not just instructors."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => faculty.length > 0 && setIdx((i) => (i - 1 + faculty.length) % faculty.length), className: "grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-plum-dark hover:text-cream hover:border-plum-dark transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => faculty.length > 0 && setIdx((i) => (i + 1) % faculty.length), className: "grid h-11 w-11 place-items-center rounded-full border border-border hover:bg-plum-dark hover:text-cream hover:border-plum-dark transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-foreground/50", children: "Loading faculty..." }) : faculty.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-foreground/50", children: "No faculty members found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: visible.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-3xl border border-border bg-card p-6 hover:-translate-y-1 hover:border-plum-dark/30 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative h-44 rounded-2xl bg-gradient-to-br ${f.tint || "from-plum to-plum-dark"} overflow-hidden grid place-items-center`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
        f.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(f.image), alt: f.name, className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative font-display text-5xl font-bold text-cream/90", children: f.initials || f.name.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-cream/95 px-2 py-1 text-[11px] font-bold text-plum-dark z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-lime text-lime" }),
          " ",
          f.rating
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display font-semibold text-plum-dark", children: f.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-foreground/60", children: f.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-plum-dark", children: f.specialty }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-foreground/60", children: [
          f.years,
          "y"
        ] })
      ] })
    ] }, `${f._id || f.id}-${i}`)) })
  ] }) });
}
const items = [
  { name: "Priya Krishnan", role: "Staff Nurse · Apollo Hospitals", text: "From classroom to a top hospital in 8 months. The proctored exams gave my employer real confidence.", initials: "PK" },
  { name: "Arjun Reddy", role: "OT Technician · Manipal", text: "The hands-on OT simulation modules made my transition to the operating theatre seamless. Top-tier faculty.", initials: "AR" },
  { name: "Sneha Pillai", role: "Lab Technician · Fortis", text: "I started with ₹999/month EMI and now earn 6× that monthly. The placement team was relentlessly supportive.", initials: "SP" }
];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 05 / Voices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: [
          "5,000 careers.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "One academy."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-full bg-card border border-border px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-lime text-lime" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-plum-dark", children: "4.9 / 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/60", children: "· 2,300+ reviews" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 lg:grid-cols-3", children: items.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative rounded-3xl p-7 border ${i === 1 ? "bg-plum-dark text-cream border-plum-dark" : "bg-card border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: `h-8 w-8 ${i === 1 ? "text-lime" : "text-plum/40"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-5 text-base leading-relaxed ${i === 1 ? "text-cream/90" : "text-foreground/80"}`, children: [
        '"',
        t.text,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-11 w-11 place-items-center rounded-full font-display font-bold ${i === 1 ? "bg-lime text-plum-dark" : "bg-plum-dark text-lime"}`, children: t.initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-semibold text-sm ${i === 1 ? "text-cream" : "text-plum-dark"}`, children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs ${i === 1 ? "text-cream/65" : "text-foreground/60"}`, children: t.role })
        ] })
      ] })
    ] }, t.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-plum to-plum-dark", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-full bg-lime text-plum-dark group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 fill-current" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-3 left-3 right-3 text-cream text-xs font-semibold", children: [
        "Watch student story #",
        i
      ] })
    ] }, i)) })
  ] }) });
}
const HOSPITALS = ["Apollo", "Fortis", "Manipal", "Max Healthcare", "Narayana Health", "Medanta", "Aster", "Columbia Asia", "Kokilaben", "AIIMS", "Tata Memorial", "Lilavati"];
function Partners() {
  const row = [...HOSPITALS, ...HOSPITALS];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-8 lg:py-12 border-y border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 06 / Partners" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl lg:text-2xl font-semibold text-plum-dark", children: "Where our students build careers" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max marquee gap-12 hover:[animation-play-state:paused]", children: row.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl lg:text-3xl font-bold text-plum-dark/30 hover:text-plum-dark transition-colors whitespace-nowrap", children: n }) }, i)) }) })
  ] });
}
const steps = [
  { icon: ClipboardCheck, title: "Enroll", desc: "Pick your course and onboard in minutes." },
  { icon: GraduationCap, title: "Learn", desc: "Live + recorded classes from senior clinicians." },
  { icon: ScrollText, title: "Exam", desc: "AI-proctored, tamper-proof assessments." },
  { icon: Award, title: "Certify", desc: "Blockchain-verified lifetime credentials." },
  { icon: Briefcase, title: "Get Placed", desc: "95% placement rate across 200+ hospitals.", highlight: true }
];
function LearningPath() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 07 / Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: [
        "Your path from ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "student" }),
        " to ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime px-2 rounded", children: "staff." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-12 left-[10%] right-[10%] h-px border-t-2 border-dashed border-plum/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid lg:grid-cols-5 gap-8 lg:gap-4", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative grid h-24 w-24 place-items-center rounded-3xl ${s.highlight ? "bg-lime text-plum-dark" : "bg-card border border-border text-plum-dark"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-9 w-9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-plum-dark text-lime font-mono text-xs font-bold", children: i + 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-display text-lg font-semibold text-plum-dark", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-[180px] text-sm text-foreground/65 leading-relaxed", children: s.desc })
      ] }, s.title)) })
    ] })
  ] }) });
}
function BlogPreview() {
  const [posts, setPosts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await api.get("/public/blogs");
        if (res.success && res.blogs) {
          setPosts(res.blogs.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching homepage preview blogs:", err);
      }
    };
    loadBlogs();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-6 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 08 / Journal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "Read. Learn. Lead." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "group inline-flex items-center gap-2 text-sm font-semibold text-plum-dark", children: [
        "All articles",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:rotate-45 transition-transform" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 lg:grid-cols-3", children: posts.map((p, index) => {
      const tint = index % 2 === 0 ? "from-plum to-plum-dark" : "from-plum-dark to-plum";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group rounded-3xl overflow-hidden bg-card border border-border hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative aspect-[16/10] bg-gradient-to-br ${tint} overflow-hidden`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-plum-dark", children: p.cat || p.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/55 font-mono", children: p.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-lg font-semibold text-plum-dark group-hover:text-plum transition leading-snug", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/70 leading-relaxed", children: p.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plum-dark group-hover:gap-3 transition-all", children: [
            "Read article ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }, p.title);
    }) })
  ] }) });
}
const faqs = [
  { q: "What are the eligibility criteria for paramedical courses?", a: "Most diploma programs require 10+2 with Biology. Certain certificate courses accept 10th-pass candidates. We assess each application individually." },
  { q: "Are the certificates recognized by hospitals?", a: "Yes — every certificate is blockchain-verified and recognized by our 200+ hospital partners across India. Verification is instant via a QR code." },
  { q: "What is the placement support?", a: "Dedicated placement managers, mock interviews, resume workshops, and direct interviews with partner hospitals. Our placement rate is 95% within 6 months." },
  { q: "Can I pay in installments?", a: "Absolutely. We offer 0% EMI through partner NBFCs starting at ₹999/month. Scholarships are available for merit and need-based applicants." },
  { q: "Are classes online or offline?", a: "We offer Online, Offline, and Hybrid modes. Live classes are recorded so you can revisit anytime. Practical labs are in-campus or at partner hospital sites." },
  { q: "How long are the programs?", a: "From 1-month intensive certificates to 1-year diploma programs. Course duration is listed clearly on each course page." },
  { q: "Is there a refund policy?", a: "Yes — full refund within the first 7 days, no questions asked. Pro-rated thereafter as per our policy." },
  { q: "How are exams conducted?", a: "Through our AI-proctored online platform with identity verification, screen recording, and live invigilation. Practical exams are on-site at partner labs." }
];
function FAQ() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— 09 / Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "Frequently asked." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: faqs.map((f, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border bg-card transition-colors ${isOpen ? "border-plum-dark" : "border-border"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setOpen(isOpen ? null : i),
            className: "w-full flex items-center justify-between gap-4 p-5 text-left",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-plum-dark", children: f.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-lime text-plum-dark" : "bg-secondary text-plum-dark"}`, children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-5 text-sm leading-relaxed text-foreground/75", children: f.a })
          }
        ) })
      ] }, i);
    }) })
  ] }) });
}
function CtaBlock() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 lg:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-full max-w-[1400px] px-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[40px] bg-plum-dark text-cream p-10 lg:p-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-40 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-80 w-80 rounded-full bg-lime/30 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-plum/40 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-lime", children: "— Next Cohort Open" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05]", children: [
        "Your hospital badge is",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime text-plum-dark px-3 rounded-lg", children: "8 months away." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-cream/75 max-w-lg", children: "Limited seats per cohort. Lock yours today with a refundable ₹999 hold — no commitment required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", className: "group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold text-plum-dark hover:bg-cream transition", children: [
          "Reserve My Seat",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-4 text-sm font-bold text-cream hover:bg-cream/10 transition", children: "Talk to a Counsellor" })
      ] })
    ] })
  ] }) }) });
}
function Home() {
  const {
    currentUser
  } = useClassroomStore();
  if (currentUser) {
    if (currentUser.role === "admin") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin/dashboard", replace: true });
    } else if (currentUser.role === "student") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/student/dashboard", replace: true });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CourseStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhyUs, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlacementBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LearningPath, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Faculty, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Partners, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BlogPreview, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQ, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBlock, {})
  ] });
}
export {
  Home as component
};
