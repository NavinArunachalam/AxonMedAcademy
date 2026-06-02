import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-232oUaaL.mjs";
import { a3 as Save } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function Settings() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Academy configuration and integrations" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[220px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-1", children: ["Organization", "Branding", "Domains", "Payments", "Email", "Integrations", "Roles & Access", "Security"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `w-full text-left rounded-xl px-4 py-2.5 text-sm font-medium ${i === 0 ? "bg-lime text-plum-dark" : "text-cream/70 hover:bg-cream/5"}`, children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Organization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Public info about your academy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid sm:grid-cols-2 gap-5", children: [{
          l: "Academy name",
          v: "Medicore Academy"
        }, {
          l: "Display URL",
          v: "medicore.academy"
        }, {
          l: "Support email",
          v: "hello@medicore.academy"
        }, {
          l: "Phone",
          v: "+91 98765 43210"
        }, {
          l: "GST",
          v: "29AABCM1234C1ZK"
        }, {
          l: "Time zone",
          v: "Asia/Kolkata"
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: f.l, value: f.v }, f.l)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: "Plot 21, Medical Campus,\nBengaluru 560001", className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "About" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { defaultValue: "India's most trusted paramedical training academy.", className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex justify-end gap-3 border-t border-cream/10 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full bg-cream/10 px-5 py-2.5 text-sm font-semibold", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " Save changes"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { defaultValue: value, className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
  ] });
}
export {
  Settings as component
};
