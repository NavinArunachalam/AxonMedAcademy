import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, PlayCircle, ClipboardList,
  Award, User as UserIcon, Calendar, MessageCircle,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";

const NAV = [
  { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Courses", to: "/student/my-courses", icon: BookOpen },
  { label: "Live Classes", to: "/student/live", icon: PlayCircle },
  { label: "Exams", to: "/student/exams", icon: ClipboardList },
  { label: "Certificates", to: "/student/certificates", icon: Award },
  { label: "Schedule", to: "/student/schedule", icon: Calendar },
  { label: "Messages", to: "/student/messages", icon: MessageCircle },
  { label: "Profile", to: "/student/profile", icon: UserIcon },
];

export const Route = createFileRoute("/_student")({
  component: () => (
    <PortalShell
      variant="student"
      brand="Medicore Academy"
      nav={NAV}
      user={{ name: "Aanya Sharma", role: "Staff Nursing • Batch 24", initials: "AS" }}
    >
      <Outlet />
    </PortalShell>
  ),
});
