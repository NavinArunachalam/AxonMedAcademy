import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PublicLayout } from "./Layout-dYQ0o33O.mjs";
import { f as api } from "./router-HIz9jB09.mjs";
import { P as MapPin, Y as Phone, O as Mail, v as Clock, a7 as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function Contact() {
  const [sent, setSent] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [contactInfo, setContactInfo] = reactExports.useState({
    address: "Plot 21, Medical Campus, Hosur Road, Bengaluru — 560001",
    phone: "+91 98765 43210",
    email: "hello@Axon.academy",
    hours: "Monday – Saturday, 9 AM to 8 PM"
  });
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  reactExports.useEffect(() => {
    async function loadContact() {
      try {
        const res = await api.get("/public/contact-details");
        if (res.success && res.contactDetails) {
          setContactInfo(res.contactDetails);
        }
      } catch (err) {
        console.error("Failed to load contact info:", err);
      }
    }
    loadContact();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      const res = await api.post("/public/contact", formData);
      if (res.success) {
        setSent(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
          message: ""
        });
      } else {
        setErrorMsg(res.message || "Failed to submit inquiry");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Error submitting inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PublicLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 lg:py-28 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -z-10 top-0 right-0 h-[400px] w-[400px] rounded-full bg-lime/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-mono uppercase tracking-[0.2em] text-plum", children: "— Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold text-plum-dark tracking-[-0.03em] leading-[1.02]", children: [
          "Let's start your",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum", children: "healthcare career." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-5 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-4", children: [{
        icon: MapPin,
        t: "Visit us",
        v: contactInfo.address
      }, {
        icon: Phone,
        t: "Call us",
        v: contactInfo.phone
      }, {
        icon: Mail,
        t: "Email",
        v: contactInfo.email
      }, {
        icon: Clock,
        t: "Office",
        v: contactInfo.hours
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-5 flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-plum-dark text-lime shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-plum-dark", children: c.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-foreground/70", children: c.v })
        ] })
      ] }, c.t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "lg:col-span-3 rounded-3xl border border-border bg-card p-8 lg:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-plum-dark", children: "Tell us about you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/65", children: "A counsellor will reach out within 24 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", placeholder: "Priya Krishnan", required: true, value: formData.name, onChange: (e) => setFormData({
            ...formData,
            name: e.target.value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", placeholder: "you@example.com", required: true, value: formData.email, onChange: (e) => setFormData({
            ...formData,
            email: e.target.value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", placeholder: "+91 98xxx xxxxx", value: formData.phone, onChange: (e) => setFormData({
            ...formData,
            phone: e.target.value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Interest", placeholder: "Staff Nursing, OT Tech…", value: formData.interest, onChange: (e) => setFormData({
            ...formData,
            interest: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-plum-dark mb-1.5", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, placeholder: "Anything you'd like us to know…", className: "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum", value: formData.message, onChange: (e) => setFormData({
            ...formData,
            message: e.target.value
          }) })
        ] }),
        errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-red-500 font-medium", children: errorMsg }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "mt-6 inline-flex items-center gap-2 rounded-full bg-plum-dark px-7 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition disabled:opacity-50", children: sent ? "Sent — we'll be in touch ✓" : isSubmitting ? "Sending..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Send message ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-plum-dark mb-1.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: "w-full rounded-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum" })
  ] });
}
export {
  Contact as component
};
