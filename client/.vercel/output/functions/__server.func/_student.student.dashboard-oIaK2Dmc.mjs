import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as StatTile, C as Card$1 } from "./_ssr/PortalShell-BrkJ3mSa.mjs";
import { am as useClassroomStore, Q as getMyMeetings, M as getDetailedProgress, S as getMyNotifications } from "./_ssr/router-7BnTJDC3.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { R as Root, I as Indicator } from "./_libs/radix-ui__react-progress.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { s as CirclePlay, g as BookOpen, v as Clock, r as CircleCheck, ak as Trophy, o as ChevronRight, y as Flame, a1 as Radio, D as Download, ai as TrendingUp, j as ChartColumn, an as Users, ao as Video, F as FileText } from "./_libs/lucide-react.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const ProgressStats = ({ stats }) => {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    return `${hrs}h ${mins}m`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-muted-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            "Overall Learning Progress"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-3xl font-bold mt-1", children: [
            stats.overallProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-8 h-8 text-primary" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats.overallProgress, className: "h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "Your overall progress is calculated based on live attendance (30%), video watching (40%), and quiz performance (30%)." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Live Attendance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-blue-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
            stats.attendance.percentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats.attendance.percentage, className: "h-2 mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
            stats.attendance.attended,
            " / ",
            stats.attendance.total,
            " sessions"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Video Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 text-purple-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
            stats.videos.percentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats.videos.percentage, className: "h-2 mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
              stats.videos.completed,
              " / ",
              stats.videos.total,
              " videos watched"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              formatTime(stats.videos.watchedSec),
              " watched"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between space-y-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Quiz Analytics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-orange-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
            stats.quizzes.avgScore,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: stats.quizzes.avgScore, className: "h-2 mt-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
              stats.quizzes.completed,
              " / ",
              stats.quizzes.total,
              " quizzes taken"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
              "Avg Score: ",
              stats.quizzes.avgScore,
              "%"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
};
function timeUntil(dateIso) {
  const diff = (new Date(dateIso).getTime() - Date.now()) / 6e4;
  if (diff < 0) return "Started";
  if (diff < 60) return `${Math.floor(diff)}m`;
  return `${Math.floor(diff / 60)}h ${Math.floor(diff % 60)}m`;
}
function timeAgoDate(dateIso) {
  return new Date(dateIso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}
function Dashboard() {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const {
    data
  } = useQuery({
    queryKey: ["myMeetings"],
    queryFn: getMyMeetings,
    enabled: !!currentUser,
    staleTime: 1e3 * 60,
    retry: 1
  });
  const studentId = currentUser?.id || "";
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const activeCoursesCount = enrolledClassrooms.length;
  const firstClassroomId = enrolledClassrooms[0]?.id;
  const {
    data: progressStats,
    isLoading: progressLoading
  } = useQuery({
    queryKey: ["detailedProgress", firstClassroomId],
    queryFn: () => getDetailedProgress(firstClassroomId),
    enabled: !!firstClassroomId,
    staleTime: 1e3 * 60 * 5
    // 5 minutes
  });
  const backendMeetings = data?.meetings ?? [];
  const remoteMeetings = backendMeetings.map((m) => ({
    id: m._id,
    title: m.title,
    description: m.description,
    scheduledAt: m.scheduledAt,
    duration: m.duration,
    status: m.status,
    attendees: m.attendees ? m.attendees.map((a) => a.student?.fullName ?? "").filter(Boolean) : [],
    roomId: m.roomId,
    classroomName: m.classroom?.name ?? m.classroom?.code ?? "Classroom"
  }));
  const localMeetings = enrolledClassrooms.flatMap((c) => c.meetings.map((m) => ({
    ...m,
    classroomName: c.name
  })));
  const allMeetings = remoteMeetings.length > 0 ? remoteMeetings : localMeetings;
  const nextLiveMeeting = allMeetings.filter((m) => m.status === "scheduled" || m.status === "live").sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];
  const totalQuizzes = enrolledClassrooms.reduce((s, c) => s + c.quizzes.filter((q) => q.status === "published").length, 0);
  const totalSubmissions = enrolledClassrooms.reduce((s, c) => s + c.quizzes.reduce((ss, q) => ss + q.attempts.filter((a) => a.studentId === studentId && a.status === "submitted").length, 0), 0);
  const studentAnnouncements = enrolledClassrooms.flatMap((c) => c.announcements.map((a) => ({
    ...a,
    classroomName: c.name
  }))).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const upcomingEvents = allMeetings.filter((m) => m.status === "scheduled" || m.status === "live").sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()).slice(0, 3);
  const nextClassText = nextLiveMeeting ? timeUntil(nextLiveMeeting.scheduledAt) : "No classes scheduled";
  const totalWatchedSeconds = enrolledClassrooms.reduce((s, c) => {
    return s + c.recordings.reduce((ss, r) => {
      const vs = r.viewStats.find((v) => v.studentId === studentId);
      return ss + (vs ? vs.watchedPercent / 100 * r.duration : 0);
    }, 0);
  }, 0);
  const totalHoursWatched = Math.round(totalWatchedSeconds / 3600);
  const {
    data: notificationPayload
  } = useQuery({
    queryKey: ["myNotifications"],
    queryFn: () => getMyNotifications(),
    enabled: !!currentUser,
    staleTime: 1e3 * 30,
    retry: 1
  });
  const notifications = notificationPayload ?? [];
  const joinableNotifications = notifications.filter((n) => {
    if (n.read) return false;
    if (n.type !== "live_session") return false;
    if (!n.actionUrl) return false;
    const meetingId = n.metadata?.meetingId;
    if (meetingId) {
      const meeting = allMeetings.find((m) => m.id === meetingId);
      if (meeting && (meeting.status === "ended" || meeting.status === "cancelled")) {
        return false;
      }
    }
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-plum-dark text-cream p-7 lg:p-9 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-lime", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-2 font-display text-3xl lg:text-4xl font-bold", children: [
            "Hello, ",
            currentUser?.name?.split(" ")[0] || "Student",
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-cream/75 text-sm", children: [
            "You are enrolled in ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { className: "text-lime", children: [
              activeCoursesCount,
              " classroom",
              activeCoursesCount !== 1 ? "s" : ""
            ] }),
            ". Your next live class starts in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-cream", children: nextClassText }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/live", className: "inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-plum-dark", children: [
              "Join live class ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/my-courses", className: "rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold", children: "Continue learning" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 lg:w-100", children: [{
          k: "Hours",
          v: totalHoursWatched.toString()
        }, {
          k: "Exams Done",
          v: totalSubmissions.toString()
        }, {
          k: "Class rooms",
          v: activeCoursesCount.toString()
        }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-cream/10 border border-cream/10 p-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-lime", children: s.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest mt-1 text-cream/70", children: s.k })
        ] }, s.k)) })
      ] })
    ] }),
    progressStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-plum-dark", children: "Learning Analysis" }),
        enrolledClassrooms.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground italic", children: [
          "Showing progress for: ",
          enrolledClassrooms[0].name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressStats, { stats: progressStats })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Active Courses", value: activeCoursesCount.toString(), delta: "+1 this month", icon: BookOpen, accent: "plum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Hours This Week", value: "18.5", delta: "+12% vs last", icon: Clock, accent: "lime" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Assignments Done", value: `${totalSubmissions}/${totalQuizzes}`, icon: CircleCheck, accent: "plum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatTile, { label: "Achievement Points", value: "1,284", delta: "+86 today", icon: Trophy, accent: "lime" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { className: "sm:col-span-2 lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base sm:text-lg font-bold text-plum-dark", children: "Continue learning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/student/my-courses", className: "text-xs font-medium text-plum hover:text-plum-dark inline-flex items-center gap-1", children: [
            "All courses ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 sm:mt-4 space-y-2 sm:space-y-3", children: [
          enrolledClassrooms.map((c) => {
            const enrolledStudentDetails = c.students.find((s) => s.id === studentId);
            const progress = enrolledStudentDetails ? enrolledStudentDetails.progress : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4 rounded-2xl border border-border p-3 sm:p-4 hover:border-plum/40 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-secondary text-plum-dark shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-5 w-5 sm:h-6 sm:w-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.program }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 h-1.5 w-full rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum-dark rounded-full", style: {
                  width: `${progress}%`
                } }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-mono text-muted-foreground", children: [
                progress,
                "%"
              ] })
            ] }, c.id);
          }),
          enrolledClassrooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You are not enrolled in any courses." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base sm:text-lg font-bold text-plum-dark", children: "Streak" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 sm:mt-3 font-display text-4xl sm:text-5xl font-bold text-plum-dark", children: [
          "14",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm sm:text-base font-medium text-muted-foreground", children: " days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Best: 21 days · Keep it up!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 sm:mt-4 grid grid-cols-7 gap-1", children: Array.from({
          length: 28
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-square rounded ${i < 14 ? "bg-lime" : i < 21 ? "bg-lime-soft" : "bg-secondary"}` }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl bg-plum-dark text-cream p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-lime", children: "Next badge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold mt-1", children: "Iron Discipline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/70 mt-1", children: "7 more days to unlock" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { className: "sm:col-span-2 lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base sm:text-lg font-bold text-plum-dark", children: "Live Sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 sm:mt-4 space-y-2 sm:space-y-3", children: [
          upcomingEvents.length > 0 ? upcomingEvents.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-xl border border-border p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 shrink-0 place-items-center rounded-full ${e.status === "live" ? "bg-red-100 text-red-600" : "bg-secondary text-plum-dark"}`, children: e.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 animate-pulse" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: e.title }),
                e.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-1.5 py-0.5 rounded", children: "LIVE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: e.classroomName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                new Date(e.scheduledAt).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short"
                }),
                " ",
                "· ",
                new Date(e.scheduledAt).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit"
                })
              ] })
            ] })
          ] }, e.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-muted-foreground py-2", children: "No upcoming classes." }),
          joinableNotifications.length > 0 && upcomingEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-t border-border my-2" }),
          joinableNotifications.map((notif) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-100 text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4 animate-pulse" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: notif.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5 line-clamp-1", children: notif.message })
            ] })
          ] }, notif._id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card$1, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-plum-dark", children: "Announcements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3", children: [
          studentAnnouncements.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl bg-secondary p-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-plum", children: a.classroomName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: timeAgoDate(a.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark line-clamp-2", children: a.content }),
            a.attachments && a.attachments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex gap-1.5", children: a.attachments.map((at, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: at.url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-lg bg-white/50 px-2 py-1 text-[10px] font-bold text-plum hover:bg-white transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-2.5 w-2.5" }),
              "PDF"
            ] }, i)) })
          ] }, a.id)),
          studentAnnouncements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-muted-foreground", children: "No announcements." })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
