import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { N as Navigate, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { P as PortalShell } from "./_ssr/PortalShell-BLPF8Jzh.mjs";
import { a0 as useClassroomStore } from "./_ssr/router-CbIg4qJV.mjs";
import { L as LayoutDashboard, a6 as School, g as BookOpen, ap as Users, u as ClipboardList, j as ChartColumn, aa as Settings } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
const NAV = [
  {
    label: "Overview",
    to: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Classrooms",
    to: "/admin/classrooms",
    icon: School
  },
  {
    label: "Courses",
    to: "/admin/courses",
    icon: BookOpen
  },
  {
    label: "Students",
    to: "/admin/students",
    icon: Users
  },
  // { label: "Faculty", to: "/admin/faculty", icon: GraduationCap },
  {
    label: "Exams",
    to: "/admin/exams",
    icon: ClipboardList
  },
  // { label: "Placements", to: "/admin/placements", icon: Briefcase },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: ChartColumn
  },
  // { label: "Finance", to: "/admin/finance", icon: CreditCard },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings
  }
];
function AdminLayout() {
  const {
    currentUser
  } = useClassroomStore();
  const [hasMounted, setHasMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  if (!currentUser || currentUser.role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalShell, { variant: "admin", brand: "Axon Academy", nav: NAV, user: {
    name: currentUser.name,
    role: "Super Admin",
    initials: currentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  AdminLayout as component
};
