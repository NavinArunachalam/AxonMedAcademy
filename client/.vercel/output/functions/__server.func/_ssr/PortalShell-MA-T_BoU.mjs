import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLocation, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { N as logoutUser, h as classroomStore } from "./router-CqaaUdl3.mjs";
import { R as Menu, ap as X, N as LogOut } from "../_libs/lucide-react.mjs";
function PortalShell({ variant, brand, nav, user, children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const isAdmin = variant === "admin";
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      classroomStore.setState(() => ({ currentUser: null, accessToken: null }));
      navigate({ to: "/login" });
    }
  };
  const shellClass = isAdmin ? "dark bg-[#0B0719] text-cream" : "bg-[#F5F3FF] text-slate-900";
  const sidebarClass = isAdmin ? "bg-[#110828] border-white/5" : "bg-white border-slate-200";
  const linkBaseClass = isAdmin ? "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5 text-cream/70" : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-slate-100 text-slate-600";
  const linkActiveClass = isAdmin ? "bg-lime/10 !text-lime font-medium" : "bg-plum-dark/10 !text-plum-dark font-medium";
  const brandColorClass = isAdmin ? "text-lime" : "text-plum-dark";
  const initialsBgClass = isAdmin ? "bg-lime/15 text-lime" : "bg-plum-dark/10 text-plum-dark";
  const SidebarContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `h-16 flex items-center justify-between px-6 border-b ${isAdmin ? "border-white/5" : "border-slate-200"} font-display font-bold text-lg tracking-tight ${brandColorClass} shrink-0`, children: [
      brand,
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "md:hidden", onClick: () => setMobileMenuOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 opacity-70" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 py-4 px-3 space-y-1 overflow-y-auto", children: [
      nav.map((item) => {
        const isActive = currentPath === item.to || item.to !== "/" && currentPath.startsWith(item.to + "/");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            onClick: () => setMobileMenuOpen(false),
            className: `${linkBaseClass} ${isActive ? linkActiveClass : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-[18px] h-[18px] opacity-75 shrink-0" }),
              item.label
            ]
          },
          item.label
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `my-2 h-px ${isAdmin ? "bg-white/5" : "bg-slate-100"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleLogout,
          className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-red-500 ${isAdmin ? "hover:bg-red-500/10" : "hover:bg-red-50"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-[18px] h-[18px] shrink-0" }),
            "Sign Out"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-4 border-t ${isAdmin ? "border-white/5" : "border-slate-200"} flex items-center gap-3 shrink-0`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${initialsBgClass}`, children: user.initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[13px] truncate", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[11px] truncate ${isAdmin ? "text-cream/50" : "text-slate-500"}`, children: user.role })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex min-h-screen w-full font-sans ${shellClass}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `hidden md:flex flex-col w-64 shrink-0 border-r ${sidebarClass} sticky top-0 h-screen overflow-hidden`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex md:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/60 backdrop-blur-sm", onClick: () => setMobileMenuOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `relative flex flex-col w-[280px] max-w-[80%] h-full shadow-2xl ${sidebarClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `md:hidden flex items-center justify-between h-16 px-4 border-b sticky top-0 z-40 ${isAdmin ? "bg-[#110828] border-white/5" : "bg-white border-slate-200"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-display font-bold text-lg ${brandColorClass}`, children: brand }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileMenuOpen(true), className: "p-2 -mr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5 opacity-70" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-[1400px] mx-auto", children })
    ] })
  ] });
}
function Card({ className = "", children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl sm:rounded-3xl border border-border bg-card text-card-foreground p-5 sm:p-6 shadow-sm overflow-hidden ${className}`, children });
}
function DarkCard({ className = "", children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl sm:rounded-2xl border border-white/10 bg-[#1A0F33] text-cream p-5 sm:p-6 overflow-hidden ${className}`, children });
}
function StatTile({ label, value, delta, icon: Icon, accent = "plum" }) {
  const iconBg = accent === "lime" ? "bg-lime/10 text-lime" : "bg-plum/10 text-plum";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground truncate", children: label }),
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-lg ${iconBg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 sm:mt-3 font-display text-2xl sm:text-3xl font-bold truncate", children: value }),
    delta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] sm:text-xs text-muted-foreground truncate", children: delta })
  ] });
}
export {
  Card as C,
  DarkCard as D,
  PortalShell as P,
  StatTile as S
};
