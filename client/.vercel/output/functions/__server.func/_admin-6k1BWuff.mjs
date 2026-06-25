import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { N as Navigate, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { P as PortalShell } from "./_ssr/PortalShell-BaLvjVQp.mjs";
import { ap as useClassroomStore } from "./_ssr/router-78ZVeuz1.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { a7 as School, aq as Users, w as ClipboardList, V as MessageCircle, M as LayoutDashboard, g as BookOpen, k as ChartColumn, f as Award, ab as Settings } from "./_libs/lucide-react.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
const ADMIN_NAV = [
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
    label: "Attendance",
    to: "/admin/classes",
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
    label: "Messages",
    to: "/admin/messages",
    icon: MessageCircle
  },
  {
    label: "Certificates",
    to: "/admin/certificates",
    icon: Award
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings
  }
];
const FACULTY_NAV = [{
  label: "Classrooms",
  to: "/admin/classrooms",
  icon: School
}, {
  label: "Attendance",
  to: "/admin/classes",
  icon: School
}, {
  label: "Students",
  to: "/admin/students",
  icon: Users
}, {
  label: "Exams",
  to: "/admin/exams",
  icon: ClipboardList
}, {
  label: "Messages",
  to: "/admin/messages",
  icon: MessageCircle
}];
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
  if (!currentUser || currentUser.role !== "admin" && currentUser.role !== "faculty") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  const navItems = currentUser.role === "faculty" ? FACULTY_NAV : ADMIN_NAV;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalShell, { variant: "admin", brand: "Axon Academy", nav: navItems, user: {
    name: currentUser.name,
    role: currentUser.role === "faculty" ? "Faculty" : "Admin",
    initials: currentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
export {
  AdminLayout as component
};
