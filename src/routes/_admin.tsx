import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, Users, GraduationCap, ClipboardList,
  Briefcase, BarChart3, CreditCard, Settings,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Courses", to: "/admin/courses", icon: BookOpen },
  { label: "Students", to: "/admin/students", icon: Users },
  { label: "Faculty", to: "/admin/faculty", icon: GraduationCap },
  { label: "Exams", to: "/admin/exams", icon: ClipboardList },
  { label: "Placements", to: "/admin/placements", icon: Briefcase },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Finance", to: "/admin/finance", icon: CreditCard },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export const Route = createFileRoute("/_admin")({
  component: () => (
    <PortalShell
      variant="admin"
      brand="Medicore Academy"
      nav={NAV}
      user={{ name: "Vikram Mehta", role: "Super Admin", initials: "VM" }}
    >
      <Outlet />
    </PortalShell>
  ),
});
