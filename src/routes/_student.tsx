import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import {
  LayoutDashboard, BookOpen, PlayCircle, ClipboardList,
  Award, User as UserIcon, Calendar, MessageCircle, School,
} from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { useClassroomStore } from "@/lib/classroomStore";

const NAV = [
  { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
  { label: "My Classrooms", to: "/student/classrooms", icon: School },
  { label: "My Courses", to: "/student/my-courses", icon: BookOpen },
  { label: "Live Classes", to: "/student/live", icon: PlayCircle },
  { label: "Exams", to: "/student/exams", icon: ClipboardList },
  { label: "Certificates", to: "/student/certificates", icon: Award },
  { label: "Schedule", to: "/student/schedule", icon: Calendar },
  { label: "Messages", to: "/student/messages", icon: MessageCircle },
  { label: "Profile", to: "/student/profile", icon: UserIcon },
];

export const Route = createFileRoute("/_student")({
  component: StudentLayout,
});

function StudentLayout() {
  const { currentUser } = useClassroomStore();

  if (!currentUser || currentUser.role !== "student") {
    return <Navigate to="/login" />;
  }

  return (
    <PortalShell
      variant="student"
      brand="Medicore Academy"
      nav={NAV}
      user={{
        name: currentUser.name,
        role: "Student",
        initials: currentUser.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
      }}
    >
      <Outlet />
    </PortalShell>
  );
}
