import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { Z as loginUser, k as classroomStore } from "./router-BIMX1eZo.mjs";
import { ag as Stethoscope, d as ArrowRight } from "../_libs/lucide-react.mjs";
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
function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const payload = await loginUser(userId, password);
      const backendUser = payload.user;
      const accessToken = payload.accessToken || null;
      const role = backendUser.role === "student" ? "student" : "admin";
      const currentUser = {
        id: backendUser._id,
        name: backendUser.fullName || backendUser.email,
        email: backendUser.email,
        phone: backendUser.phone,
        role
      };
      classroomStore.setState(() => ({
        currentUser,
        accessToken
      }));
      navigate({
        to: role === "admin" ? "/admin/dashboard" : "/student/dashboard"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid User ID or Password");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex w-1/2 relative bg-plum-dark text-cream p-12 flex-col justify-between overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-noise opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 h-96 w-96 rounded-full bg-lime/30 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-plum/50 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "relative inline-flex items-center gap-2 w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-10 w-10 place-items-center rounded-xl bg-lime text-plum-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold", children: "Axon.Academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl lg:text-5xl font-bold leading-[1.05] tracking-[-0.02em]", children: [
          "Welcome back.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime text-plum-dark px-2 rounded", children: "cohort" }),
          " is waiting."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-cream/70 max-w-md", children: "Pick up where you left off — live classes, recorded modules, exam prep, and your career roadmap." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-xs text-cream/50", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Axon Academy"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid place-items-center p-6 lg:p-12 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "lg:hidden inline-flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-plum-dark text-lime", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-plum-dark", children: "Axon.Academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-plum-dark", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/65", children: "Enter your credentials to access your portal." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "mt-8 space-y-4", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-sm font-semibold p-3 bg-red-50 rounded-lg", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-plum-dark mb-1.5", children: "User ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: userId, onChange: (e) => setUserId(e.target.value), type: "text", placeholder: "e.g. Ajay or Admin", className: "w-full rounded-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-plum-dark", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-xs text-plum font-semibold", children: "Forgot?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: password, onChange: (e) => setPassword(e.target.value), type: "password", placeholder: "••••••••", className: "w-full rounded-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: isSubmitting, className: "group w-full inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark px-6 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition disabled:cursor-not-allowed disabled:opacity-70", children: [
          isSubmitting ? "Signing in..." : "Sign in",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition-transform" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-foreground/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        " or ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-foreground/65", children: [
        "New to Axon? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "font-semibold text-plum-dark", children: "Browse courses →" })
      ] })
    ] }) })
  ] });
}
export {
  Login as component
};
