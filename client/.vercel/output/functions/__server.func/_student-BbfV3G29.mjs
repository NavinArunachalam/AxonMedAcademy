import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { N as Navigate, O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { P as PortalShell } from "./_ssr/PortalShell-C1_rQjF1.mjs";
import { _ as useClassroomStore, C as getMyClassrooms, f as classroomActions } from "./_ssr/router-uunjdzvU.mjs";
import { L as LayoutDashboard, a6 as School, g as BookOpen, s as CirclePlay, u as ClipboardList, f as Award, C as Calendar, T as MessageCircle, ao as User } from "./_libs/lucide-react.mjs";
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
const NAV = [{
  label: "Dashboard",
  to: "/student/dashboard",
  icon: LayoutDashboard
}, {
  label: "My Classrooms",
  to: "/student/classrooms",
  icon: School
}, {
  label: "My Courses",
  to: "/student/my-courses",
  icon: BookOpen
}, {
  label: "Live Classes",
  to: "/student/live",
  icon: CirclePlay
}, {
  label: "Exams",
  to: "/student/exams",
  icon: ClipboardList
}, {
  label: "Certificates",
  to: "/student/certificates",
  icon: Award
}, {
  label: "Schedule",
  to: "/student/schedule",
  icon: Calendar
}, {
  label: "Messages",
  to: "/student/messages",
  icon: MessageCircle
}, {
  label: "Profile",
  to: "/student/profile",
  icon: User
}];
function StudentLayout() {
  const {
    currentUser
  } = useClassroomStore();
  const [loadError, setLoadError] = reactExports.useState("");
  const [hasMounted, setHasMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setHasMounted(true);
  }, []);
  reactExports.useEffect(() => {
    let active = true;
    const loadMyClassrooms = async () => {
      if (!currentUser || currentUser.role !== "student") return;
      try {
        const classrooms = await getMyClassrooms();
        if (!active) return;
        classroomActions.setClassrooms(classrooms);
        setLoadError("");
      } catch (err) {
        if (!active) return;
        setLoadError(err instanceof Error ? err.message : "Could not load your classrooms");
      }
    };
    loadMyClassrooms();
    return () => {
      active = false;
    };
  }, [currentUser?.id, currentUser?.role]);
  if (!hasMounted) {
    return null;
  }
  if (!currentUser || currentUser.role !== "student") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PortalShell, { variant: "student", brand: "Axon Academy", nav: NAV, user: {
    name: currentUser.name,
    role: "Student",
    initials: currentUser.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
  }, children: [
    loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600", children: loadError }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  StudentLayout as component
};
