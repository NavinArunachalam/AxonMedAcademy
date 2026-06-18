import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame, Trophy, Clock, BookOpen, PlayCircle, ChevronRight, CheckCircle2, Radio, Download
} from "lucide-react";
import { Card, StatTile } from "@/components/portal/PortalShell";
import { useClassroomStore } from "@/lib/classroomStore";
import { useQuery } from "@tanstack/react-query";
import { getMyMeetings, getMyNotifications, getDetailedProgress, type PortalNotification } from "@/lib/api";
import ProgressStats from "@/components/portal/ProgressStats";

interface MeetingsResponse {
  success: boolean;
  meetings: Array<any>;
}

function timeUntil(dateIso: string) {
  const diff = (new Date(dateIso).getTime() - Date.now()) / 60000;
  if(diff < 0) return "Started";
  if(diff < 60) return `${Math.floor(diff)}m`;
  return `${Math.floor(diff/60)}h ${Math.floor(diff%60)}m`;
}

function timeAgoDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export const Route = createFileRoute("/_student/student/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { classrooms, currentUser } = useClassroomStore();
  const { data } = useQuery<MeetingsResponse>({
    queryKey: ['myMeetings'],
    queryFn: getMyMeetings,
    enabled: !!currentUser,
    staleTime: 1000 * 60,
    retry: 1,
  });
  const studentId = currentUser?.id || "";
  
  const enrolledClassrooms = classrooms.filter(c => c.students.some(s => s.id === studentId && s.status === 'active'));
  const activeCoursesCount = enrolledClassrooms.length;

  // Fetch progress for the first active classroom for the dashboard summary
  const firstClassroomId = enrolledClassrooms[0]?.id;
  const { data: progressStats, isLoading: progressLoading } = useQuery({
    queryKey: ['detailedProgress', firstClassroomId],
    queryFn: () => getDetailedProgress(firstClassroomId!),
    enabled: !!firstClassroomId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const backendMeetings = data?.meetings ?? [];
  const remoteMeetings = backendMeetings.map((m: any) => ({
    id: m._id,
    title: m.title,
    description: m.description,
    scheduledAt: m.scheduledAt,
    duration: m.duration,
    status: m.status,
    attendees: m.attendees ? m.attendees.map((a: any) => a.student?.fullName ?? '').filter(Boolean) : [],
    roomId: m.roomId,
    classroomName: m.classroom?.name ?? m.classroom?.code ?? 'Classroom',
  }));
  const localMeetings = enrolledClassrooms.flatMap(c => c.meetings.map(m => ({ ...m, classroomName: c.name })));
  const allMeetings = remoteMeetings.length > 0 ? remoteMeetings : localMeetings;
  const nextLiveMeeting = allMeetings.filter(m => m.status === 'scheduled' || m.status === 'live').sort((a,b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];
  
  const totalQuizzes = enrolledClassrooms.reduce((s, c) => s + c.quizzes.filter(q => q.status === 'published').length, 0);
  const totalSubmissions = enrolledClassrooms.reduce((s, c) => s + c.quizzes.reduce((ss, q) => ss + q.attempts.filter(a => a.studentId === studentId && a.status === 'submitted').length, 0), 0);
  
  const studentAnnouncements = enrolledClassrooms.flatMap(c => c.announcements.map(a => ({ ...a, classroomName: c.name }))).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const upcomingEvents = allMeetings.filter(m => m.status === 'scheduled' || m.status === 'live').sort((a,b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()).slice(0, 3);
  const nextClassText = nextLiveMeeting ? timeUntil(nextLiveMeeting.scheduledAt) : "No classes scheduled";

  const totalWatchedSeconds = enrolledClassrooms.reduce((s, c) => {
    return s + c.recordings.reduce((ss, r) => {
      const vs = r.viewStats.find(v => v.studentId === studentId);
      return ss + (vs ? (vs.watchedPercent / 100) * r.duration : 0);
    }, 0);
  }, 0);
  const totalHoursWatched = Math.round(totalWatchedSeconds / 3600);

  const { data: notificationPayload } = useQuery<PortalNotification[]>({
    queryKey: ['myNotifications'],
    queryFn: () => getMyNotifications(),
    enabled: !!currentUser,
    staleTime: 1000 * 30,
    retry: 1,
  });

  const notifications = notificationPayload ?? [];
  const joinableNotifications = notifications.filter((n) => {
    if (n.read) return false;
    if (n.type !== 'live_session') return false;
    if (!n.actionUrl) return false;
    
    // Cross-check with allMeetings to see if the session is still active/scheduled
    const meetingId = n.metadata?.meetingId;
    if (meetingId) {
      const meeting = allMeetings.find(m => m.id === meetingId);
      if (meeting && (meeting.status === 'ended' || meeting.status === 'cancelled')) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-3xl bg-plum-dark text-cream p-7 lg:p-9 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest text-lime">Welcome back</div>
            <h1 className="mt-2 font-display text-3xl lg:text-4xl font-bold">
              Hello, {currentUser?.name?.split(" ")[0] || "Student"} 👋
            </h1>
            <p className="mt-2 text-cream/75 text-sm">
              You are enrolled in <b className="text-lime">{activeCoursesCount} classroom{activeCoursesCount !== 1 ? "s" : ""}</b>. Your next live class
              starts in <b className="text-cream">{nextClassText}</b>.
            </p>
            <div className="mt-5 flex gap-3">
              <Link to="/student/live" className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-plum-dark">
                Join live class <PlayCircle className="h-4 w-4" />
              </Link>
              <Link to="/student/my-courses" className="rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold">
                Continue learning
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:w-95">
            {[
              { k: "Hours", v: totalHoursWatched.toString() },
              { k: "Exams Done", v: totalSubmissions.toString() },
              { k: "Classrooms", v: activeCoursesCount.toString() },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-cream/10 border border-cream/10 p-4 text-center">
                <div className="font-display text-2xl font-bold text-lime">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest mt-1 text-cream/70">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Progress Section */}
      {progressStats && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-plum-dark">Learning Analysis</h2>
            {enrolledClassrooms.length > 1 && (
              <span className="text-xs text-muted-foreground italic">Showing progress for: {enrolledClassrooms[0].name}</span>
            )}
          </div>
          <ProgressStats stats={progressStats} />
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active Courses" value={activeCoursesCount.toString()} delta="+1 this month" icon={BookOpen} accent="plum" />
        <StatTile label="Hours This Week" value="18.5" delta="+12% vs last" icon={Clock} accent="lime" />
        <StatTile label="Assignments Done" value={`${totalSubmissions}/${totalQuizzes}`} icon={CheckCircle2} accent="plum" />
        <StatTile label="Achievement Points" value="1,284" delta="+86 today" icon={Trophy} accent="lime" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-plum-dark">Continue learning</h3>
            <Link to="/student/my-courses" className="text-xs font-medium text-plum hover:text-plum-dark inline-flex items-center gap-1">
              All courses <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {enrolledClassrooms.map((c) => {
              const enrolledStudentDetails = c.students.find(s => s.id === studentId);
              const progress = enrolledStudentDetails ? enrolledStudentDetails.progress : 0;
              return (
              <div key={c.id} className="flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-plum/40 transition-colors">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-plum-dark shrink-0">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-plum-dark truncate">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.program}</div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-plum-dark rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{progress}%</div>
              </div>
            )})}
            {enrolledClassrooms.length === 0 && <p className="text-sm text-muted-foreground">You are not enrolled in any courses.</p>}
          </div>
        </Card>

        {/* Streak */}
        <Card>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h3 className="font-display text-lg font-bold text-plum-dark">Streak</h3>
          </div>
          <div className="mt-3 font-display text-5xl font-bold text-plum-dark">14<span className="text-base font-medium text-muted-foreground"> days</span></div>
          <p className="mt-1 text-xs text-muted-foreground">Best: 21 days · Keep it up!</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${
                  i < 14 ? "bg-lime" : i < 21 ? "bg-lime-soft" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-plum-dark text-cream p-4">
            <div className="text-xs uppercase tracking-widest text-lime">Next badge</div>
            <div className="font-display font-bold mt-1">Iron Discipline</div>
            <div className="text-xs text-cream/70 mt-1">7 more days to unlock</div>
          </div>
        </Card>
      </div>

      {/* Upcoming + Announcements */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-lg font-bold text-plum-dark">Upcoming Classes</h3>
          <ul className="mt-4 space-y-3">
            {upcomingEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-4 rounded-xl border border-border p-3">
                <div className="text-center w-14 shrink-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{new Date(e.scheduledAt).toLocaleDateString("en-IN", { weekday: "short" })}</div>
                  <div className="font-display font-bold text-plum-dark text-sm">{new Date(e.scheduledAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-plum-dark truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{e.classroomName}</div>
                </div>
                <a 
                  href={`/student/webex/${e.roomId}`}
                  className={`text-xs font-semibold rounded-full px-3 py-1.5 flex items-center gap-1.5 ${e.status === 'live' ? "bg-red-500 text-white" : "bg-plum-dark text-cream"}`}
                >
                  {e.status === 'live' && <Radio className="h-3 w-3 animate-pulse" />}
                  {e.status === 'live' ? "Join Now" : "Join"}
                </a>
              </li>
            ))}
            {upcomingEvents.length === 0 && <li className="text-sm text-muted-foreground">No upcoming classes.</li>}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-bold text-plum-dark">Live session alerts</h3>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{joinableNotifications.length} actionable</span>
          </div>
          <div className="mt-4 space-y-3">
            {joinableNotifications.length > 0 ? (
              joinableNotifications.map((notif) => (
                <div key={notif._id} className="rounded-2xl border border-border p-4 bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-plum-dark">{notif.title}</div>
                      <p className="text-xs text-slate-500 mt-1">{notif.message}</p>
                    </div>
                    <a 
                      href={notif.actionUrl || '#'} 
                      className="rounded-full bg-red-500 text-white px-4 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-red-600 transition-colors"
                    >
                      <Radio className="h-3 w-3 animate-pulse" />
                      Join Now
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No joinable live session alerts yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="font-display text-lg font-bold text-plum-dark">Announcements</h3>
          <ul className="mt-4 space-y-3">
            {studentAnnouncements.map((a) => (
              <li key={a.id} className="rounded-xl bg-secondary p-3.5">
                <div className="flex justify-between items-start mb-0.5">
                  <div className="text-[10px] uppercase tracking-widest text-plum">{a.classroomName}</div>
                  <div className="text-[9px] text-muted-foreground">{timeAgoDate(a.createdAt)}</div>
                </div>
                <div className="text-sm font-semibold text-plum-dark line-clamp-2">{a.content}</div>
                {a.attachments && a.attachments.length > 0 && (
                  <div className="mt-2 flex gap-1.5">
                    {a.attachments.map((at: any, i: number) => {
                      // Use proxy for Cloudinary URLs to bypass 401 errors
                      const proxyUrl = at.url?.includes('res.cloudinary.com')
                        ? `/api/v1/classrooms/files?url=${encodeURIComponent(at.url)}`
                        : at.url;
                      console.log('[Dashboard Attachment] Stored URL:', at.url, '→ Rendered URL:', proxyUrl);
                      return (
                        <a
                          key={i}
                          href={proxyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white/50 px-2 py-1 text-[10px] font-bold text-plum hover:bg-white transition-colors"
                        >
                          <Download className="h-2.5 w-2.5" />
                          PDF
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
            {studentAnnouncements.length === 0 && <li className="text-sm text-muted-foreground">No announcements.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
