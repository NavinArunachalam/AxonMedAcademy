import { createFileRoute, Link } from "@tanstack/react-router";
import { Video, Users, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/portal/PortalShell";
import { useClassroomStore } from "@/lib/classroomStore";

export const Route = createFileRoute("/_student/student/live")({
  component: LiveClasses,
});

function LiveClasses() {
  const { classrooms, currentUser } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const enrolledClassrooms = classrooms.filter(c => c.students.some(s => s.id === studentId && s.status === 'active'));
  const allMeetings = enrolledClassrooms.flatMap(c => c.meetings.map(m => ({ ...m, classroomName: c.name })));
  
  const upcomingMeetings = allMeetings.filter(m => m.status === 'scheduled' || m.status === 'live').sort((a,b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
  
  const liveNow = upcomingMeetings.find(m => m.status === 'live');
  const thisWeek = upcomingMeetings.filter(m => m.status !== 'live').slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-plum-dark">Live Classes</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time sessions with faculty and peers</p>
      </div>

      {liveNow && (
        <div className="rounded-3xl bg-gradient-to-br from-plum-dark to-plum text-cream p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-15" />
          <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 bg-lime text-plum-dark text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-plum-dark animate-pulse" /> Live now
              </span>
              <h2 className="mt-3 font-display text-2xl lg:text-3xl font-bold">{liveNow.title}</h2>
              <p className="mt-2 text-cream/75 text-sm">{liveNow.classroomName} · Started</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-cream/70">
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {liveNow.attendees.length} attending</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {liveNow.duration} min duration</span>
              </div>
            </div>
            <Link to={`/student/jitsi/${liveNow.roomId}`} className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-6 py-3 font-bold">
              <Video className="h-4 w-4" /> Join class
            </Link>
          </div>
        </div>
      )}

      <Card>
        <h3 className="font-display font-bold text-plum-dark text-lg flex items-center gap-2"><Calendar className="h-5 w-5" /> This week</h3>
        <div className="mt-4 space-y-3">
          {thisWeek.map((c) => (
            <div key={c.id} className="flex items-center gap-4 rounded-xl border border-border p-3.5">
              <div className="w-32 shrink-0">
                <div className="text-xs font-mono text-plum">{new Date(c.scheduledAt).toLocaleDateString("en-IN", { weekday: "short", hour: "numeric", minute: "2-digit" })}</div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-plum-dark">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.classroomName}</div>
              </div>
              <button className="text-xs font-semibold border border-plum-dark/20 text-plum-dark rounded-full px-4 py-1.5 hover:bg-plum-dark hover:text-cream">Remind me</button>
            </div>
          ))}
          {thisWeek.length === 0 && <p className="text-sm text-muted-foreground">No upcoming classes this week.</p>}
        </div>
      </Card>
    </div>
  );
}
