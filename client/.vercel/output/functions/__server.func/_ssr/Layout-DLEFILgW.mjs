import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { af as Stethoscope, S as Menu, ap as X, J as Instagram, K as Linkedin, aq as Youtube, Q as MapPin, Y as Phone, P as Mail } from "../_libs/lucide-react.mjs";
const NAV = [
  { label: "Courses", to: "/courses" },
  { label: "About", to: "/about" },
  { label: "Faculty", to: "/faculty" },
  { label: "Placements", to: "/placements" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed top-0 left-0 z-50 w-full transition-all duration-300 ${open ? "bg-cream" : "bg-cream/65 backdrop-blur-md"} border-b border-border shadow-sm`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 lg:px-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-plum-dark text-lime transition-transform group-hover:rotate-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-[17px] font-bold tracking-tight text-plum-dark", children: [
              "Axon",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "." }),
              "Academy"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: n.to,
              activeProps: { className: "text-plum-dark bg-secondary" },
              className: "rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:text-plum-dark hover:bg-secondary transition-colors",
              children: n.label
            },
            n.to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "text-sm font-medium text-foreground/80 hover:text-plum-dark",
                children: "Login"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/enroll",
                className: "group inline-flex items-center gap-2 rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream hover:bg-plum transition-colors",
                children: [
                  "Enrollment",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full bg-lime text-plum-dark text-[10px] font-bold group-hover:rotate-45 transition-transform", children: "→" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "aria-label": "menu",
              onClick: () => setOpen(true),
              className: "lg:hidden grid h-10 w-10 place-items-center rounded-full  text-plum-dark",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[60] lg:hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 bg-plum-dark/50 backdrop-blur-sm",
              onClick: () => setOpen(false)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-0 h-full w-[85%] max-w-sm bg-cream p-6 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-plum-dark", children: "Menu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setOpen(false),
                  className: "grid h-10 w-10 place-items-center rounded-full bg-secondary",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mt-8 flex flex-col gap-1", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: n.to,
                onClick: () => setOpen(false),
                className: "rounded-xl px-4 py-3 text-base font-semibold text-plum-dark hover:bg-secondary",
                children: n.label
              },
              n.to
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  onClick: () => setOpen(false),
                  className: "rounded-full border border-plum-dark/20 px-5 py-3 text-center text-sm font-semibold text-plum-dark",
                  children: "Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/enroll",
                  onClick: () => setOpen(false),
                  className: "rounded-full bg-plum-dark px-5 py-3 text-center text-sm font-semibold text-cream",
                  children: "Enrollment"
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-24 bg-plum-dark text-cream/85 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-50 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 h-96 w-96 rounded-full bg-lime/20 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-[1400px] px-5 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime text-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-cream", children: "Axon.Academy" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-relaxed max-w-xs", children: "India's most trusted paramedical training academy. Train, certify, and get placed in leading hospitals nationwide." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-2", children: [Instagram, Linkedin, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "#",
              className: "grid h-10 w-10 place-items-center rounded-full bg-cream/10 hover:bg-lime hover:text-plum-dark transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
            },
            i
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FCol, { title: "Courses", links: [
          ["Staff Nursing", "/courses"],
          ["OT Technician", "/courses"],
          ["Lab Technician", "/courses"],
          ["ICU Care", "/courses"],
          ["Radiology", "/courses"]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FCol, { title: "Academy", links: [
          ["About", "/about"],
          ["Faculty", "/faculty"],
          ["Placements", "/placements"],
          ["Blog", "/blog"],
          ["Contact", "/contact"]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-cream text-sm uppercase tracking-widest", children: "Reach Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mt-0.5 text-lime shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Plot 21, Medical Campus,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Bengaluru 560001"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 mt-0.5 text-lime shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 8300581589" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 mt-0.5 text-lime shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@axonmedacademy.com", children: "support@axonmedacademy.com" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Axon Med Academy. All rights reserved."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Privacy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Terms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Accessibility" })
        ] })
      ] })
    ] })
  ] });
}
function FCol({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-cream text-sm uppercase tracking-widest", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-2.5 text-sm", children: links.map(([l, to]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "hover:text-lime transition-colors", children: l }) }, l)) })
  ] });
}
function PublicLayout({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background text-foreground w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full pt-16", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PublicLayout as P
};
