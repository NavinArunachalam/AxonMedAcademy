import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-C6GZW3qv.mjs";
import { ah as Target, E as Eye, H as Heart, f as Award } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const VALUES = [{
  icon: Target,
  t: "Mission",
  d: "To make world-class paramedical education accessible to every aspirant in India — regardless of background or budget."
}, {
  icon: Eye,
  t: "Vision",
  d: "A future where every hospital bedside is supported by a confident, certified, expertly trained paramedical professional."
}, {
  icon: Heart,
  t: "Values",
  d: "Empathy in care. Rigor in training. Honesty in assessment. Respect for every learner who trusts us with their future."
}];
const MILESTONES = [{
  year: "2018",
  t: "Academy founded",
  d: "Started with 32 students in Bengaluru."
}, {
  year: "2020",
  t: "Online expansion",
  d: "Pivoted to hybrid model serving 1,000+ students nationally."
}, {
  year: "2022",
  t: "100 hospital partners",
  d: "Signed flagship MOUs with Apollo, Fortis, Manipal."
}, {
  year: "2024",
  t: "Blockchain certificates",
  d: "First Indian academy with on-chain verifiable credentials."
}, {
  year: "2026",
  t: "5,000+ alumni",
  d: "95% placement rate · 200+ partner hospitals · 28 states covered."
}];
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, {
    children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", {
      className: "relative overflow-hidden py-20 lg:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-grid opacity-60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 right-0 h-[500px] w-[500px] rounded-full bg-lime/25 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— About Axon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", {
          className: "mt-3 max-w-4xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
            "Built by clinicians,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "for the next generation" }),
            " of clinicians."
          ]
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed", children: "Axon Academy was started in 2018 by a small group of doctors, senior nurses, and hospital administrators who saw a single truth — India needs more well-trained paramedical professionals, and the path to becoming one should be rigorous, transparent, and humane." })
        ]
      })
      ]
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "border-y border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8", children: [{
          v: "8 yrs",
          l: "Operating"
        }, {
          v: "5,200+",
          l: "Alumni placed"
        }, {
          v: "215",
          l: "Hospital partners"
        }, {
          v: "98%",
          l: "Student satisfaction"
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl lg:text-5xl font-bold text-plum-dark", children: s.v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-foreground/60", children: s.l })
          ]
        }, s.l))
      })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "grid gap-6 lg:grid-cols-3", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: `rounded-3xl p-8 ${i === 1 ? "bg-plum-dark text-cream" : "bg-card border border-border"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-12 w-12 place-items-center rounded-xl ${i === 1 ? "bg-lime text-plum-dark" : "bg-secondary text-plum-dark"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `mt-6 font-display text-2xl font-bold ${i === 1 ? "text-cream" : "text-plum-dark"}`, children: v.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-3 leading-relaxed ${i === 1 ? "text-cream/80" : "text-foreground/70"}`, children: v.d })
            ]
          }, v.t))
        })
      })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "py-20 lg:py-28 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "mx-auto max-w-4xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Our Story" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "From a single classroom to a national academy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
          className: "mt-14 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[27px] top-2 bottom-2 w-px bg-plum/30" }),
            MILESTONES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
              className: "relative flex gap-6 pb-10 last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-plum-dark text-lime font-mono text-xs font-bold", children: m.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
                className: "pt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-plum-dark", children: m.t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/70", children: m.d })
                ]
              })
              ]
            }, m.year))
          ]
        })
        ]
      })
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", {
      className: "py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
        className: "mx-auto max-w-7xl px-5 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Trust" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-3xl lg:text-5xl font-bold text-plum-dark tracking-tight", children: "Recognized & accredited." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          className: "mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: ["ISO 9001:2015", "NSDC Aligned", "Skill India", "AICTE Approved"].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
            className: "rounded-2xl border border-border bg-card p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-8 w-8 mx-auto text-plum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display font-semibold text-plum-dark", children: a })
            ]
          }, a))
        })
        ]
      })
    })
    ]
  });
}
export {
  About as component
};
