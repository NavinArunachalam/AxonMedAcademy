import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, ClipboardList,
  Briefcase, BarChart3, CreditCard, Settings, School, MessageCircle,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useClassroomStore } from "@/lib/classroomStore";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Classrooms", to: "/admin/classrooms", icon: School },
  { label: "Attendance", to: "/admin/classes", icon: School },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Students", to: "/admin/students", icon: Users },
  // { label: "Faculty", to: "/admin/faculty", icon: GraduationCap },
  { label: "Exams", to: "/admin/exams", icon: ClipboardList },
  // { label: "Placements", to: "/admin/placements", icon: Briefcase },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  // { label: "Finance", to: "/admin/finance", icon: CreditCard },
  { label: "Messages", to: "/admin/messages", icon: MessageCircle },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { currentUser } = useClassroomStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "faculty")) {
    return <Navigate to="/login" />;
  }

  return (
    <PortalShell
      variant="admin"
      brand="Axon Academy"
      nav={NAV}
      user={{
        name: currentUser.name,
        role: currentUser.role === "faculty" ? "Faculty" : "Super Admin",
        initials: currentUser.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
      }}
    >
      <Outlet />
    </PortalShell>
  );
}
