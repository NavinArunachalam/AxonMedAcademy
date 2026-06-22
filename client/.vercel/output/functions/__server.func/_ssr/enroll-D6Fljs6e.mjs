import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as getAdminPrograms } from "./router-D4JeZwA9.mjs";
import { s as submitToGoogleSheet } from "./googleSheets-DSvYDwmb.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__messaging.mjs";
import { r as CircleCheck, af as Stethoscope, M as LoaderCircle, d as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__installations.mjs";
function Enroll() {
  const [formData, setFormData] = reactExports.useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    address: "",
    program: "",
    message: ""
  });
  const [programs, setPrograms] = reactExports.useState([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = reactExports.useState(true);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await getAdminPrograms();
        setPrograms(data.filter((p) => p.status === "published"));
      } catch (err) {
        console.error("Failed to fetch programs:", err);
      } finally {
        setIsLoadingPrograms(false);
      }
    }
    fetchPrograms();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    if (!formData.fullName || !formData.email) {
      setError("Please fill in all required fields (Full Name, Email)");
      setIsSubmitting(false);
      return;
    }
    try {
      const selectedProgram = programs.find((p) => p.id === formData.program);
      const result = await submitToGoogleSheet("Enrollment Registrations", {
        Timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        FullName: formData.fullName,
        Email: formData.email,
        Phone: formData.phone,
        Qualification: formData.qualification,
        Address: formData.address,
        Program: selectedProgram?.title || formData.program,
        Message: formData.message
      });
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (error2) {
      console.error(error2);
      setError(error2 instanceof Error ? error2.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  if (success) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-lime/20 text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-plum-dark", children: "Application Received!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/65", children: "Thank you for applying to Axon Academy. Your registration is now under review by our admissions team." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/50", children: "We will contact you via email once your application has been processed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center gap-2 rounded-full bg-plum-dark px-8 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition", children: "Return Home" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col lg:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex w-1/3 relative bg-plum-dark text-cream p-12 flex-col justify-between overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 h-96 w-96 rounded-full bg-lime/30 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "relative inline-flex items-center gap-2 w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime text-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold", children: "Axon.Academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em]", children: [
          "Start your",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lime", children: "medical career" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "journey here."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-cream/70 text-sm leading-relaxed", children: "Join a community of dedicated healthcare professionals. Complete the form to begin your enrollment process." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6", children: [{
          title: "Expert Faculty",
          desc: "Learn from industry-leading practitioners."
        }, {
          title: "Live Cohorts",
          desc: "Interactive real-time learning environment."
        }, {
          title: "Career Support",
          desc: "Dedicated placement and roadmap guidance."
        }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-5 w-5 shrink-0 rounded-full border border-lime/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-lime" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold text-cream", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50 mt-0.5", children: item.desc })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-xs text-cream/50", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Axon Academy"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto bg-background p-6 lg:p-12 lg:px-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "lg:hidden inline-flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-plum-dark text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-plum-dark", children: "Axon.Academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-plum-dark", children: "Student Registration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/65", children: "Fill out the details below to apply for enrollment." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-8", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-[10px]", children: "✕" }),
          error
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Full Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "fullName", value: formData.fullName, onChange: handleChange, type: "text", placeholder: "e.g. John Doe", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Email Address *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, name: "email", value: formData.email, onChange: handleChange, type: "email", placeholder: "john.doe@example.com", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "phone", value: formData.phone, onChange: handleChange, type: "tel", placeholder: "+91 00000 00000", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Program Interest" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "program", value: formData.program, onChange: handleChange, className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all appearance-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a program" }),
              isLoadingPrograms ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { disabled: true, children: "Loading programs..." }) : programs.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.id, children: p.title }, p.id))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Educational Qualification" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "qualification", value: formData.qualification, onChange: handleChange, type: "text", placeholder: "e.g. MBBS, BHMS", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "address", value: formData.address, onChange: handleChange, rows: 3, placeholder: "Your full mailing address", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-plum-dark/50", children: "Message / Remarks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", value: formData.message, onChange: handleChange, rows: 2, placeholder: "Anything else you'd like us to know?", className: "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum/20 focus:border-plum transition-all resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "group w-full md:w-fit inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark px-10 py-4 text-sm font-semibold text-cream hover:bg-plum transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-plum-dark/10", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Submitting..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Submit Application",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-foreground/50", children: [
          "Already have an account? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-bold text-plum hover:underline", children: "Sign in" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Enroll as component
};
