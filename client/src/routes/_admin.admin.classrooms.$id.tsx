import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useRef } from "react";
import {
  ArrowLeft, Megaphone, Video, BookOpen, ClipboardList, Users,
  Plus, X, Trash2, Play, Eye, EyeOff, Check, Send,
  Calendar, Clock, Radio, Upload,
} from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";
import {
  useClassroomStore,
  classroomActions,
  formatDuration,
  uid,
  type Meeting,
  type Quiz,
  type Question,
  type Classroom,
  type Option,
} from "@/lib/classroomStore";
import { addStudentsToClassroom, createMeeting, deleteMeeting, getAdminUsers, getClassroomById, publishQuiz, closeQuiz, deleteQuiz as apiDeleteQuiz, createQuiz, updateClassroomStudentStatus, uploadClassroomRecordingToCloudflare, publishRecording, unpublishRecording, deleteRecording, createClassroomAnnouncement, deleteClassroomAnnouncement } from "@/lib/api";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/classrooms/$id")({
  component: AdminClassroomDetail,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function fmtShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function MeetingStatusBadge({ status }: { status: Meeting["status"] }) {
  const map: Record<Meeting["status"], { cls: string; label: string }> = {
    live: { cls: "bg-red-500/20 text-red-300", label: "🔴 LIVE" },
    scheduled: { cls: "bg-lime/20 text-lime", label: "⏰ Scheduled" },
    ended: { cls: "bg-cream/10 text-cream/60", label: "✓ Done" },
    cancelled: { cls: "bg-red-900/30 text-red-400", label: "✗ Cancelled" },
  };
  const { cls, label } = map[status];
  return <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${cls}`}>{label}</span>;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: "announcements", label: "📢 Announcements" },
  { key: "live", label: "🎥 Live Classes" },
  { key: "recordings", label: "⏺ Recordings" },
  { key: "tests", label: "📝 Tests" },
  { key: "students", label: "👥 Students" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

// ─── Announcements Tab ────────────────────────────────────────────────────────

function AnnouncementsTab({ classroom, refreshClassroom }: { classroom: Classroom; refreshClassroom: () => Promise<Classroom> }) {
  const cls = classroom;
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingAnnouncementId, setDeletingAnnouncementId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!text.trim()) return;
    setSaving(true);
    setError("");
    try {
      await createClassroomAnnouncement(classroom.id, text.trim());
      setText("");
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post announcement");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    setDeletingAnnouncementId(announcementId);
    setError("");
    try {
      await deleteClassroomAnnouncement(classroom.id, announcementId);
      await refreshClassroom();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete announcement");
    } finally {
      setDeletingAnnouncementId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Compose */}
      <DarkCard>
        <h3 className="font-display font-bold text-sm text-cream mb-3 flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-lime" /> Post Announcement
        </h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your announcement… (supports emoji 🎯)"
          rows={3}
          className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-cream text-sm outline-none focus:border-lime/50 resize-none"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handlePost}
            disabled={!text.trim() || saving}
            className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2 text-sm font-bold disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" /> {saving ? "Posting..." : "Post to All Students"}
          </button>
        </div>
        {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
      </DarkCard>

      {/* Feed */}
      <div className="space-y-3">
        {cls.announcements.length === 0 && (
          <DarkCard className="text-center py-10">
            <Megaphone className="h-8 w-8 text-cream/20 mx-auto mb-2" />
            <p className="text-cream/50 text-sm">No announcements yet.</p>
          </DarkCard>
        )}
        {cls.announcements.map((ann) => (
          <DarkCard key={ann.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-plum-dark font-bold text-xs">
                  {ann.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cream text-sm font-semibold">{ann.author}</span>
                    <span className="text-cream/50 text-xs">{timeAgo(ann.createdAt)}</span>
                  </div>
                  <p className="text-cream/80 text-sm leading-relaxed">{ann.content}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAnnouncement(ann.id)}
                disabled={deletingAnnouncementId === ann.id}
                className="text-cream/30 hover:text-red-400 transition-colors shrink-0 disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </DarkCard>
        ))}
      </div>
    </div>
  );
}

// ─── Live Classes Tab ─────────────────────────────────────────────────────────

function LiveClassesTab({ classroomId }: { classroomId: string }) {
  const { classrooms } = useClassroomStore();
  const cls = classrooms.find((c) => c.id === classroomId)!;
  const [deletingMeetingId, setDeletingMeetingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", scheduledAt: "", duration: 60 });
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const formatForDateTimeLocal = (value: string) => {
    if (!value) return "";
    // normalize ISO and local datetime values for the browser picker
    const local = value.includes("T") ? value.slice(0, 16) : value;
    return local;
  };

  const handleDeleteMeeting = async (meetingId: string) => {
    setError("");
    setDeletingMeetingId(meetingId);
    try {
      await deleteMeeting(meetingId);
      classroomActions.deleteMeeting(classroomId, meetingId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete meeting");
    } finally {
      setDeletingMeetingId(null);
    }
  };

  const handleSchedule = (e: React.FormEvent) => {
    if (!form.title || !form.scheduledAt) return;
    setError("");
    setSaving(true);
    createMeeting({
      classroom: cls.code || classroomId,
      title: form.title,
      description: form.description,
      scheduledAt: new Date(form.scheduledAt).toISOString(),
      duration: form.duration,
      sendPortalNotification: notifyStudents,
      sendWhatsApp: false,
    })
      .then((res) => {
        const meeting = res.meeting;
        classroomActions.addMeeting(classroomId, {
          id: meeting._id || meeting.id,
          title: meeting.title,
          description: meeting.description,
          scheduledAt: meeting.scheduledAt,
          duration: meeting.duration,
          status: meeting.status,
          roomId: meeting.roomId,
          attendees: [],
        });
        setForm({ title: "", description: "", scheduledAt: "", duration: 60 });
        setShowForm(false);
      })
      .catch((err) => {
        setError(err.message || "Could not schedule meeting");
      })
      .finally(() => setSaving(false));
  };

  const upcoming = cls.meetings.filter((m) => m.status !== "ended" && m.status !== "cancelled");
  const past = cls.meetings.filter((m) => m.status === "ended" || m.status === "cancelled");

  return (
    <div className="space-y-5">
      {/* Schedule button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold"
        >
          <Plus className="h-4 w-4" /> Schedule Live Class
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <DarkCard>
          <h3 className="font-display font-bold text-cream mb-4">Schedule a Live Class</h3>
          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Class Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Ventilator Mode Deep Dive" className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="What will be covered?" rows={2} className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Date & Time *</label>
                <input required type="datetime-local" value={formatForDateTimeLocal(form.scheduledAt)} onChange={(e) => setForm({ ...form, scheduledAt: e.currentTarget.value })}
                  className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Duration</label>
                <select value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                  className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50">
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-cream/70">
              <input
                id="notify-students"
                type="checkbox"
                checked={notifyStudents}
                onChange={(e) => setNotifyStudents(e.target.checked)}
                className="h-4 w-4 rounded border-cream/20 bg-cream/5 text-lime focus:ring-lime"
              />
              <label htmlFor="notify-students" className="select-none">Send join-link notification to active students</label>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-50">{saving ? 'Scheduling…' : 'Confirm & Schedule'}</button>
            </div>
          </form>
        </DarkCard>
      )}

      {/* Upcoming/Live meetings */}
      {upcoming.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-cream/60 mb-3">Upcoming & Live</h3>
          <div className="space-y-3">
            {upcoming.map((m) => (
              <DarkCard key={m.id} className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-lime/10 text-lime">
                  {m.status === "live" ? <Radio className="h-5 w-5 animate-pulse" /> : <Calendar className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-cream text-sm truncate">{m.title}</span>
                    <MeetingStatusBadge status={m.status} />
                  </div>
                  <div className="text-cream/60 text-xs mt-0.5 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {fmtShortDate(m.scheduledAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {fmtTime(m.scheduledAt)}</span>
                    <span>{m.duration} min</span>
                    <span>{m.attendees.length} joined</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {m.status === "scheduled" && (
                    <button onClick={() => classroomActions.startMeeting(classroomId, m.id)}
                      className="rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold flex items-center gap-1">
                      <Play className="h-3 w-3" /> Start
                    </button>
                  )}
                  {m.status === "live" && (
                    <>
                      <button onClick={() => window.open(`https://meet.jit.si/HTA-${m.roomId}`, "_blank")}
                        className="rounded-full bg-red-500/20 text-red-300 px-4 py-2 text-xs font-bold flex items-center gap-1">
                        <Radio className="h-3 w-3" /> Rejoin
                      </button>
                      <button onClick={() => classroomActions.endMeeting(classroomId, m.id)}
                        className="rounded-full bg-cream/10 text-cream/70 px-3 py-2 text-xs">
                        End
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDeleteMeeting(m.id)}
                    disabled={deletingMeetingId === m.id}
                    className="rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2 text-xs disabled:opacity-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </DarkCard>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest text-cream/60 mb-3">Past Sessions</h3>
          <DarkCard className="p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-cream/5">
                <tr className="text-left text-[10px] uppercase tracking-widest text-cream/60">
                  <th className="p-4">Class</th><th>Date</th><th>Duration</th><th>Attendees</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {past.map((m) => (
                  <tr key={m.id} className="border-t border-cream/10">
                    <td className="p-4 font-semibold text-cream">{m.title}</td>
                    <td className="text-cream/70 text-xs">{fmtDate(m.scheduledAt)}</td>
                    <td className="font-mono text-cream/60 text-xs">{m.duration}m</td>
                    <td className="font-mono text-cream/80">{m.attendees.length}</td>
                    <td><MeetingStatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DarkCard>
        </div>
      )}

      {cls.meetings.length === 0 && (
        <DarkCard className="text-center py-12">
          <Video className="h-8 w-8 text-cream/20 mx-auto mb-2" />
          <p className="text-cream/50 text-sm">No classes scheduled yet.</p>
        </DarkCard>
      )}
    </div>
  );
}

// ─── Recordings Tab ───────────────────────────────────────────────────────────

function RecordingsTab({ classroom, refreshClassroom }: { classroom: Classroom; refreshClassroom: () => Promise<Classroom> }) {
  const cls = classroom;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", duration: 3600, isPublished: true, chapters: [] as { id: string; title: string; startTimeSec: number }[] });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadBytes, setUploadBytes] = useState({ loaded: 0, total: 0 });
  const [uploadPhase, setUploadPhase] = useState<'idle' | 'preparing' | 'uploading' | 'saving'>('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [chapterInput, setChapterInput] = useState({ title: "", startTimeSec: 0 });

  const formatMB = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    if (!videoFile) {
      setUploadError('Please select a video file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadBytes({ loaded: 0, total: 0 });
    setUploadPhase('preparing');
    setUploadError(null);

    try {
      // Video goes directly to R2 — Railway never sees the file bytes
      await uploadClassroomRecordingToCloudflare({
        file: videoFile,
        classroom: classroom.id,
        title: form.title,
        description: form.description,
        duration: form.duration,
        isPublished: form.isPublished,
        chapters: form.chapters,
        onProgress: ({ loaded, total, percentage }) => {
          setUploadPhase('uploading');
          setUploadProgress(percentage);
          setUploadBytes({ loaded, total });
          if (percentage === 100) setUploadPhase('saving');
        },
      });
      setUploadPhase('idle');
      setForm({ title: "", description: "", duration: 3600, isPublished: false, chapters: [] });
      setVideoFile(null);
      setShowForm(false);
      await refreshClassroom();
    } catch (error) {
      setUploadPhase('idle');
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadBytes({ loaded: 0, total: 0 });
    }
  };

  const addChapter = () => {
    if (!chapterInput.title) return;
    setForm((f) => ({ ...f, chapters: [...f.chapters, { id: uid(), ...chapterInput }] }));
    setChapterInput({ title: "", startTimeSec: 0 });
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold">
          <Upload className="h-4 w-4" /> Upload Recording
        </button>
      </div>

      {showForm && (
        <DarkCard>
          <h3 className="font-display font-bold text-cream mb-4">Upload Recorded Class</h3>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Recording Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Module 3: Advanced Haemodynamics" className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Video File *</label>
              <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                className="w-full text-cream text-sm file:bg-cream/10 file:border-cream/10 file:rounded-xl file:px-3 file:py-2 file:text-cream" />
              {videoFile && (
                <p className="text-xs text-cream/50 mt-1">
                  {videoFile.name} &mdash; {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              )}
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2} className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Duration (seconds)</label>
              <input type="number" min={60} value={form.duration} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>

            {/* Chapter markers */}
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-2">Chapter Markers</label>
              <div className="flex gap-2 mb-2">
                <input value={chapterInput.title} onChange={(e) => setChapterInput({ ...chapterInput, title: e.target.value })}
                  placeholder="Chapter title" className="flex-1 bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream text-xs outline-none focus:border-lime/50" />
                <input type="number" min={0} value={chapterInput.startTimeSec} onChange={(e) => setChapterInput({ ...chapterInput, startTimeSec: Number(e.target.value) })}
                  placeholder="Start (sec)" className="w-24 bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream text-xs outline-none focus:border-lime/50" />
                <button type="button" onClick={addChapter} className="rounded-xl bg-lime/10 text-lime px-3 py-2 text-xs font-bold">+ Add</button>
              </div>
              {form.chapters.map((ch, i) => (
                <div key={ch.id} className="flex items-center gap-2 bg-cream/5 rounded-lg px-3 py-1.5 mb-1 text-xs text-cream/80">
                  <span className="font-mono text-lime">{Math.floor(ch.startTimeSec / 60).toString().padStart(2, "0")}:{(ch.startTimeSec % 60).toString().padStart(2, "0")}</span>
                  <span className="flex-1">{ch.title}</span>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, chapters: f.chapters.filter((_, ci) => ci !== i) }))} className="text-cream/40 hover:text-red-400"><X className="h-3 w-3" /></button>
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="accent-lime" />
              <span className="text-cream/80 text-sm">Publish immediately (notify students)</span>
            </label>

            {/* Progress bar — shown while uploading */}
            {uploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cream/60">
                    {uploadPhase === 'preparing' && '⏳ Preparing upload…'}
                    {uploadPhase === 'uploading' && `⬆ Uploading to cloud… ${formatMB(uploadBytes.loaded)} / ${formatMB(uploadBytes.total)} (${uploadProgress}%)`}
                    {uploadPhase === 'saving' && '💾 Saving recording…'}
                  </span>
                  <span className="font-mono text-lime">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime rounded-full transition-all duration-300"
                    style={{ width: `${uploadPhase === 'saving' ? 100 : uploadProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-cream/40">Upload goes directly to cloud storage — no timeout risk</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowForm(false)} disabled={uploading} className="flex-1 rounded-full bg-cream/10 text-cream py-2.5 text-sm font-semibold disabled:opacity-40">Cancel</button>
              <button type="submit" disabled={uploading} className="flex-1 rounded-full bg-lime text-plum-dark py-2.5 text-sm font-bold disabled:opacity-60">
                {uploading ? (
                  uploadPhase === 'saving' ? 'Saving…' : `Uploading ${formatMB(uploadBytes.loaded)} / ${formatMB(uploadBytes.total)} (${uploadProgress}%)`
                ) : 'Save Recording'}
              </button>
            </div>
            {uploadError && <p className="text-sm text-red-400 mt-1">{uploadError}</p>}
          </form>
        </DarkCard>
      )}

      {/* Recording cards */}
      {cls.recordings.length === 0 && (
        <DarkCard className="text-center py-12">
          <BookOpen className="h-8 w-8 text-cream/20 mx-auto mb-2" />
          <p className="text-cream/50 text-sm">No recordings uploaded yet.</p>
        </DarkCard>
      )}
      <div className="space-y-3">
        {cls.recordings.map((rec) => {
          const avgWatch = rec.viewStats.length
            ? Math.round(rec.viewStats.reduce((s, v) => s + v.watchedPercent, 0) / rec.viewStats.length)
            : 0;
          return (
            <DarkCard key={rec.id}>
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-14 rounded-lg bg-linear-to-br from-lime/20 to-lime/5 flex items-center justify-center shrink-0">
                  <Play className="h-5 w-5 text-lime" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-cream text-sm">{rec.title}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${rec.isPublished ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/60"}`}>
                      {rec.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-cream/60 text-xs mt-0.5 line-clamp-1">{rec.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-cream/50 font-mono">{formatDuration(rec.duration)}</span>
                    <span className="text-xs text-cream/50">{rec.viewStats.length} viewers · {avgWatch}% avg watched</span>
                    <span className="text-xs text-cream/50">{rec.chapters.length} chapters</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                <button
  onClick={async () => {
    console.log("PUBLISH BUTTON CLICKED");
    console.log("Recording:", rec);
    console.log("Recording ID:", rec.id);
    console.log("Published:", rec.isPublished);

    try {
      if (rec.isPublished) {
        console.log("Calling unpublishRecording...");
        await unpublishRecording(rec.id);
      } else {
        console.log("Calling publishRecording...");
        await publishRecording(rec.id);
      }

      console.log("Refresh classroom...");
      await refreshClassroom();
    } catch (error) {
      console.error("Publish/Unpublish Error:", error);
    }
  }}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1 ${rec.isPublished ? "bg-cream/10 text-cream/70" : "bg-lime/10 text-lime"}`}
                  >
                    {rec.isPublished ? <><EyeOff className="h-3 w-3" /> Unpublish</> : <><Eye className="h-3 w-3" /> Publish</>}
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await deleteRecording(rec.id);
                        await refreshClassroom();
                      } catch (error) {
                        console.error('Failed to delete recording', error);
                      }
                    }}
                    className="rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {/* View analytics */}
              {rec.viewStats.length > 0 && (
                <div className="mt-3 pt-3 border-t border-cream/10">
                  <div className="text-[10px] uppercase tracking-widest text-cream/50 mb-2">Viewer Progress</div>
                  <div className="space-y-1.5">
                    {rec.viewStats.map((vs) => (
                      <div key={vs.studentId} className="flex items-center gap-3">
                        <span className="text-xs text-cream/80 w-32 truncate">{vs.studentName}</span>
                        <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden">
                          <div className="h-full bg-lime rounded-full" style={{ width: `${vs.watchedPercent}%` }} />
                        </div>
                        <span className="text-xs font-mono text-cream/60 w-8">{vs.watchedPercent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </DarkCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── Quiz Builder Tab ─────────────────────────────────────────────────────────

function newQuestion(order: number): Question {
  return {
    id: uid(),
    type: "mcq",
    text: "",
    marks: 1,
    explanation: "",
    order,
    options: [
      { label: "A", text: "", isCorrect: false },
      { label: "B", text: "", isCorrect: false },
      { label: "C", text: "", isCorrect: false },
      { label: "D", text: "", isCorrect: false },
    ],
  };
}

function QuestionCard({ q, qIdx, onChange, onRemove }: {
  q: Question; qIdx: number;
  onChange: (updated: Question) => void;
  onRemove: () => void;
}) {
  const setType = (type: Question["type"]) => {
    const opts: Option[] = type === "true_false"
      ? [{ label: "True", text: "True", isCorrect: true }, { label: "False", text: "False", isCorrect: false }]
      : [{ label: "A", text: "", isCorrect: false }, { label: "B", text: "", isCorrect: false }, { label: "C", text: "", isCorrect: false }, { label: "D", text: "", isCorrect: false }];
    onChange({ ...q, type, options: opts });
  };

  const toggleCorrect = (label: string) => {
    onChange({
      ...q,
      options: q.options.map((o) => ({
        ...o,
        isCorrect: q.type === "msq" ? (o.label === label ? !o.isCorrect : o.isCorrect) : (o.label === label),
      })),
    });
  };

  const LABELS = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="rounded-xl bg-cream/3 border border-cream/10 p-4 space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-lime/10 text-lime text-xs font-bold shrink-0">Q{qIdx + 1}</span>
        <select value={q.type} onChange={(e) => setType(e.target.value as Question["type"])}
          className="bg-cream/5 border border-cream/10 rounded-lg px-3 py-1.5 text-cream text-xs outline-none">
          <option value="mcq">Single Correct (MCQ)</option>
          <option value="msq">Multiple Correct (MSQ)</option>
          <option value="true_false">True / False</option>
        </select>
        <div className="flex items-center gap-2 ml-auto">
          <input type="number" min={0.5} step={0.5} value={q.marks} onChange={(e) => onChange({ ...q, marks: Number(e.target.value) })}
            className="w-16 bg-cream/5 border border-cream/10 rounded-lg px-2 py-1.5 text-cream text-xs outline-none text-center" />
          <span className="text-cream/50 text-xs">marks</span>
          <button onClick={onRemove} className="text-cream/30 hover:text-red-400 ml-2"><Trash2 className="h-4 w-4" /></button>
        </div>
      </div>

      <textarea value={q.text} onChange={(e) => onChange({ ...q, text: e.target.value })}
        placeholder={`Question ${qIdx + 1} text…`} rows={2}
        className="w-full bg-cream/5 border border-cream/10 rounded-xl px-3 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" />

      <div className="space-y-2">
        {q.options.map((opt, oi) => (
          <div key={opt.label} className={`flex items-center gap-2 rounded-lg px-3 py-2 border transition-colors ${opt.isCorrect ? "border-lime/40 bg-lime/5" : "border-cream/10 bg-cream/2"}`}>
            <button onClick={() => toggleCorrect(opt.label)}
              className={`h-5 w-5 shrink-0 rounded-full grid place-items-center text-[10px] font-bold border transition-colors ${opt.isCorrect ? "bg-lime border-lime text-plum-dark" : "border-cream/30 text-cream/50"}`}>
              {opt.isCorrect ? <Check className="h-3 w-3" /> : opt.label}
            </button>
            {q.type === "true_false" ? (
              <span className="flex-1 text-sm text-cream/80">{opt.text}</span>
            ) : (
              <input value={opt.text} onChange={(e) => {
                const opts = [...q.options]; opts[oi] = { ...opts[oi], text: e.target.value };
                onChange({ ...q, options: opts });
              }} placeholder={`Option ${opt.label}`} className="flex-1 bg-transparent outline-none text-sm text-cream placeholder:text-cream/30" />
            )}
          </div>
        ))}
        {q.type !== "true_false" && q.options.length < 6 && (
          <button onClick={() => onChange({ ...q, options: [...q.options, { label: LABELS[q.options.length] || `Opt${q.options.length + 1}`, text: "", isCorrect: false }] })}
            className="text-lime/70 hover:text-lime text-xs flex items-center gap-1 mt-1">
            <Plus className="h-3 w-3" /> Add option
          </button>
        )}
      </div>
      <input value={q.explanation} onChange={(e) => onChange({ ...q, explanation: e.target.value })}
        placeholder="Explanation shown to student after submission (optional)" className="w-full bg-cream/5 border border-cream/10 rounded-xl px-3 py-2 text-cream/70 text-xs outline-none focus:border-lime/50" />
    </div>
  );
}

function TestsTab({ classroomId }: { classroomId: string }) {
  const { classrooms } = useClassroomStore();
  const cls = classrooms.find((c) => c.id === classroomId)!;
  const [isSavingQuiz, setIsSavingQuiz] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [quizOperationQuizId, setQuizOperationQuizId] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [viewQuizId, setViewQuizId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<Omit<Quiz, "id" | "attempts">>({
    title: "", instructions: "", duration: null, maxAttempts: 1,
    randomizeQuestions: true, randomizeOptions: true,
    showLeaderboard: false, negativeMarking: false,
    negativeMarkValue: 0.25, passPercent: 60,
    availableFrom: "", availableUntil: "",
    status: "draft", questions: [],
  });

  const updateQ = (idx: number, updated: Question) => {
    setQuiz((q) => { const qs = [...q.questions]; qs[idx] = updated; return { ...q, questions: qs }; });
  };

  const totalMarks = quiz.questions.reduce((s, q) => s + q.marks, 0);

  const handleSave = async (status: Quiz["status"]) => {
    if (!quiz.title || quiz.questions.length === 0) return;
    setSaveError(null);
    setIsSavingQuiz(true);
    try {
      const createdQuiz = await createQuiz(classroomId, { ...quiz, status });
      classroomActions.addQuiz(classroomId, createdQuiz);
      setShowBuilder(false);
      setQuiz({ title: "", instructions: "", duration: null, maxAttempts: 1, randomizeQuestions: true, randomizeOptions: true, showLeaderboard: false, negativeMarking: false, negativeMarkValue: 0.25, passPercent: 60, availableFrom: "", availableUntil: "", status: "draft", questions: [] });
    } catch (error) {
      console.error(error);
      setSaveError(error instanceof Error ? error.message : 'Could not save quiz.');
    } finally {
      setIsSavingQuiz(false);
    }
  };

  const handlePublishQuiz = async (quizId: string) => {
    setQuizOperationQuizId(quizId);
    try {
      await publishQuiz(quizId);
      classroomActions.updateQuizStatus(classroomId, quizId, "published");
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };

  const handleCloseQuiz = async (quizId: string) => {
    setQuizOperationQuizId(quizId);
    try {
      await closeQuiz(quizId);
      classroomActions.updateQuizStatus(classroomId, quizId, "closed");
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    setQuizOperationQuizId(quizId);
    try {
      await apiDeleteQuiz(quizId);
      classroomActions.deleteQuiz(classroomId, quizId);
    } catch (error) {
      console.error(error);
    } finally {
      setQuizOperationQuizId(null);
    }
  };

  if (showBuilder) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowBuilder(false)} className="text-cream/60 hover:text-cream"><ArrowLeft className="h-5 w-5" /></button>
          <h2 className="font-display font-bold text-cream text-xl">Quiz Builder</h2>
        </div>

        {/* Settings */}
        <DarkCard className="space-y-4">
          <h3 className="font-display font-bold text-cream">Quiz Settings</h3>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Quiz Title *</label>
            <input value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              placeholder="e.g. Module 2 Assessment — Ventilator Management" className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Instructions for students</label>
            <textarea value={quiz.instructions} onChange={(e) => setQuiz({ ...quiz, instructions: e.target.value })}
              rows={2} className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50 resize-none" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Timer (min, blank = no timer)</label>
              <input type="number" min={1} value={quiz.duration ?? ""} onChange={(e) => setQuiz({ ...quiz, duration: e.target.value ? Number(e.target.value) : null })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Max Attempts</label>
              <input type="number" min={1} value={quiz.maxAttempts} onChange={(e) => setQuiz({ ...quiz, maxAttempts: Number(e.target.value) })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Pass Mark %</label>
              <input type="number" min={1} max={100} value={quiz.passPercent} onChange={(e) => setQuiz({ ...quiz, passPercent: Number(e.target.value) })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Available From</label>
              <input type="datetime-local" value={quiz.availableFrom} onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-cream/60 block mb-1">Available Until</label>
              <input type="datetime-local" value={quiz.availableUntil} onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
                className="w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { key: "randomizeQuestions", label: "Randomize question order" },
              { key: "randomizeOptions", label: "Randomize option order" },
              { key: "negativeMarking", label: "Negative marking (−0.25/wrong)" },
              { key: "showLeaderboard", label: "Show leaderboard to students" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={Boolean(quiz[key as keyof typeof quiz])}
                  onChange={(e) => setQuiz({ ...quiz, [key]: e.target.checked })} className="accent-lime" />
                <span className="text-cream/80 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </DarkCard>

        {/* Questions */}
        <div className="space-y-3">
          {quiz.questions.map((q, i) => (
            <QuestionCard key={q.id} q={q} qIdx={i} onChange={(u) => updateQ(i, u)} onRemove={() => setQuiz((qz) => ({ ...qz, questions: qz.questions.filter((_, ci) => ci !== i) }))} />
          ))}
        </div>

        <button onClick={() => setQuiz((q) => ({ ...q, questions: [...q.questions, newQuestion(q.questions.length + 1)] }))}
          className="w-full rounded-2xl border-2 border-dashed border-lime/20 hover:border-lime/40 py-5 text-lime/70 hover:text-lime text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
          <Plus className="h-4 w-4" /> Add Question
        </button>

        <div className="flex items-center justify-between rounded-2xl bg-cream/5 px-5 py-3">
          <span className="text-cream/60 text-sm">Questions: <strong className="text-cream">{quiz.questions.length}</strong></span>
          <span className="text-cream/60 text-sm">Total marks: <strong className="text-cream">{totalMarks}</strong></span>
          <span className="text-cream/60 text-sm">Est. time: <strong className="text-cream">~{quiz.questions.length * 2}m</strong></span>
        </div>

        <div className="flex gap-3">
          <button onClick={() => handleSave("draft")}
            disabled={quiz.questions.length === 0 || isSavingQuiz}
            className="flex-1 rounded-full bg-cream/10 text-cream py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
            {isSavingQuiz ? 'Saving...' : 'Save Draft'}
          </button>
          <button onClick={() => handleSave("published")}
            disabled={quiz.questions.length === 0 || isSavingQuiz}
            className="flex-1 rounded-full bg-lime text-plum-dark py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50">
            {isSavingQuiz ? 'Publishing...' : 'Publish & Notify Students'}
          </button>
        </div>
        {saveError && <p className="text-sm text-red-400 mt-2">{saveError}</p>}
      </div>
    );
  }

  // Quiz Report View
  if (viewQuizId) {
    const q = cls.quizzes.find((x) => x.id === viewQuizId);
    if (!q) return null;
    const submitted = q.attempts.filter((a) => a.status === "submitted");
    const passRate = submitted.length ? Math.round(submitted.filter((a) => a.score.passed).length / submitted.length * 100) : 0;
    const avgScore = submitted.length ? Math.round(submitted.reduce((s, a) => s + a.score.percentage, 0) / submitted.length) : 0;

    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewQuizId(null)} className="text-cream/60 hover:text-cream"><ArrowLeft className="h-5 w-5" /></button>
          <div className="flex-1">
            <h2 className="font-display font-bold text-cream">{q.title} — Report</h2>
            <p className="text-cream/60 text-xs">{submitted.length} submissions · {passRate}% pass rate · {avgScore}% avg score</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[{ l: "Submitted", v: submitted.length }, { l: "Pass Rate", v: `${passRate}%` }, { l: "Avg Score", v: `${avgScore}%` }].map((s) => (
            <div key={s.l} className="rounded-2xl bg-[#1A0F33] border border-cream/10 p-4 text-center">
              <div className="text-[10px] uppercase tracking-widest text-cream/60">{s.l}</div>
              <div className="font-display text-2xl font-bold text-cream mt-1">{s.v}</div>
            </div>
          ))}
        </div>

        <DarkCard className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream/5">
              <tr className="text-[10px] uppercase tracking-widest text-cream/60 text-left">
                <th className="p-4">Student</th>
                <th>Score</th>
                <th>%</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {submitted.map((att) => (
                <tr key={att.id} className="border-t border-cream/10 hover:bg-cream/5">
                  <td className="p-4 font-semibold text-cream">{att.studentName}</td>
                  <td className="font-mono text-cream/80">{att.score.rawMarks}/{att.score.totalMarks}</td>
                  <td className="font-mono text-cream/80">{att.score.percentage}%</td>
                  <td><span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${att.score.passed ? "bg-lime/20 text-lime" : "bg-red-500/20 text-red-300"}`}>{att.score.passed ? "Pass" : "Fail"}</span></td>
                  <td className="text-cream/60 text-xs">{att.submittedAt ? fmtDate(att.submittedAt) : "—"}</td>
                </tr>
              ))}
              {submitted.length === 0 && (<tr><td colSpan={5} className="p-6 text-center text-cream/50 text-sm">No submissions yet.</td></tr>)}
            </tbody>
          </table>
        </DarkCard>
      </div>
    );
  }

  // Quiz list
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setShowBuilder(true)} className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold">
          <Plus className="h-4 w-4" /> Create Quiz
        </button>
      </div>

      {cls.quizzes.length === 0 && (
        <DarkCard className="text-center py-12">
          <ClipboardList className="h-8 w-8 text-cream/20 mx-auto mb-2" />
          <p className="text-cream/50 text-sm">No quizzes created yet.</p>
        </DarkCard>
      )}

      <div className="space-y-3">
        {cls.quizzes.map((q) => {
          const subCount = q.attempts.filter((a) => a.status === "submitted").length;
          return (
            <DarkCard key={q.id}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-cream">{q.title}</span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${q.status === "published" ? "bg-lime/20 text-lime" : q.status === "closed" ? "bg-cream/10 text-cream/60" : "bg-yellow-500/20 text-yellow-300"}`}>
                      {q.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-cream/60">
                    <span>{q.questions.length} questions</span>
                    <span>{q.questions.reduce((s, x) => s + x.marks, 0)} total marks</span>
                    {q.duration && <span>{q.duration} min timer</span>}
                    <span>{subCount} submissions</span>
                    <span>Pass: {q.passPercent}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setViewQuizId(q.id)} className="rounded-full bg-cream/10 text-cream px-3 py-1.5 text-xs font-semibold flex items-center gap-1">
                    <Eye className="h-3 w-3" /> Report
                  </button>
                  {q.status === "draft" && (
                    <button onClick={() => handlePublishQuiz(q.id)}
                      disabled={quizOperationQuizId === q.id}
                      className="rounded-full bg-lime/10 text-lime px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50">
                      {quizOperationQuizId === q.id ? 'Publishing...' : 'Publish'}
                    </button>
                  )}
                  {q.status === "published" && (
                    <button onClick={() => handleCloseQuiz(q.id)}
                      disabled={quizOperationQuizId === q.id}
                      className="rounded-full bg-cream/10 text-cream/70 px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50">
                      {quizOperationQuizId === q.id ? 'Closing...' : 'Close'}
                    </button>
                  )}
                  <button onClick={() => handleDeleteQuiz(q.id)}
                    disabled={quizOperationQuizId === q.id}
                    className="rounded-full bg-cream/5 text-cream/40 hover:text-red-400 p-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </DarkCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── Students Tab ─────────────────────────────────────────────────────────────

function StudentsTab({ classroom, refreshClassroom }: { classroom: Classroom; refreshClassroom: () => Promise<Classroom> }) {
  const { users } = useClassroomStore();
  const cls = classroom;
  const [showAdd, setShowAdd] = useState(false);
  const [mongoStudents, setMongoStudents] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [error, setError] = useState("");

  React.useEffect(() => {
    let active = true;
    const loadStudents = async () => {
      try {
        const students = await getAdminUsers("student");
        if (!active) return;
        setMongoStudents(students);
        setError("");
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Could not load students from MongoDB");
      }
    };
    loadStudents();
    return () => {
      active = false;
    };
  }, []);

  const refreshClassroomLocal = refreshClassroom;

  const handleAddStudent = async (studentId: string) => {
    setError("");
    setIsAdding(studentId);
    try {
      await addStudentsToClassroom(classroom.id, [studentId]);
      await refreshClassroomLocal();
      setShowAdd(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add student to classroom");
    } finally {
      setIsAdding(null);
    }
  };

  const handleStatusChange = async (studentId: string, status: "active" | "held" | "removed") => {
    setError("");
    try {
      await updateClassroomStudentStatus(classroom.id, studentId, status);
      await refreshClassroomLocal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update student status");
    }
  };

  const studentsOnly = mongoStudents.length > 0 ? mongoStudents : users.filter((u) => u.role === "student");
  const notEnrolled = studentsOnly.filter((s) => !cls.students.find((cs) => cs.id === s.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-cream/60 text-sm">{cls.students.length} enrolled · {cls.students.filter((s) => s.status === "active").length} active</p>
        <button onClick={() => setShowAdd(!showAdd)} className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold">
          <Plus className="h-4 w-4" /> Add Student
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {showAdd && notEnrolled.length > 0 && (
        <DarkCard>
          <h3 className="font-display font-bold text-cream mb-3">Add Students to Classroom</h3>
          <div className="space-y-2">
            {notEnrolled.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg bg-cream/5 px-4 py-3">
                <div>
                  <div className="text-cream text-sm font-semibold">{s.name}</div>
                  <div className="text-cream/60 text-xs">{s.email}</div>
                </div>
                <button
                  onClick={() => handleAddStudent(s.id)}
                  disabled={isAdding === s.id}
                  className="rounded-full bg-lime text-plum-dark px-4 py-1.5 text-xs font-bold disabled:opacity-60"
                >
                  {isAdding === s.id ? "Adding..." : "Add"}
                </button>
              </div>
            ))}
          </div>
        </DarkCard>
      )}

      {showAdd && notEnrolled.length === 0 && (
        <DarkCard className="text-center py-8">
          <p className="text-cream/50 text-sm">No available MongoDB students to add.</p>
        </DarkCard>
      )}

      <DarkCard className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream/5">
            <tr className="text-[10px] uppercase tracking-widest text-cream/60 text-left">
              <th className="p-4">Student</th>
              <th>Progress</th>
              <th>Attendance</th>
              <th>Quiz Avg</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cls.students.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-cream/50">No students enrolled yet.</td></tr>
            )}
            {cls.students.map((s) => (
              <tr key={s.id} className="border-t border-cream/10 hover:bg-cream/5">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-lime text-plum-dark text-xs font-bold shrink-0">
                      {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold text-cream">{s.name}</div>
                      <div className="text-[11px] text-cream/60 font-mono">{s.enrollmentId}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 w-28">
                    <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden">
                      <div className="h-full bg-lime rounded-full" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-xs font-mono text-cream/70">{s.progress}%</span>
                  </div>
                </td>
                <td className="font-mono text-cream/80 text-sm">{s.attendance}%</td>
                <td className="font-mono text-cream/80 text-sm">{s.quizAvg}%</td>
                <td>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${s.status === "active" ? "bg-lime/20 text-lime" : s.status === "held" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}`}>
                    {s.status}
                  </span>
                </td>
                <td className="pr-4">
                  <select value={s.status} onChange={(e) => handleStatusChange(s.id, e.target.value as "active" | "held" | "removed")}
                    className="bg-cream/5 border border-cream/10 rounded-lg px-2 py-1 text-cream/70 text-xs outline-none">
                    <option value="active">Active</option>
                    <option value="held">Hold</option>
                    <option value="removed">Remove</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DarkCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function AdminClassroomDetail() {
  const params = (Route.useParams as any)();
  const id = params.id as string;
  const { classrooms } = useClassroomStore();
  const [backendClassroom, setBackendClassroom] = useState<Classroom | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<TabKey>("announcements");

  const storeClassroom = classrooms.find((c) => c.id === id);

  const refreshClassroom = async () => {
    const refreshed = await getClassroomById(id);
    setBackendClassroom(refreshed);
    if (storeClassroom) {
      classroomActions.updateClassroom(id, refreshed);
    } else {
      classroomActions.addClassroom(refreshed);
    }
    return refreshed;
  };

  React.useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        await refreshClassroom();
        if (!active) return;
      } catch (err) {
        console.error("Could not load classroom by id", err);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [id]);

  const classroom = backendClassroom || storeClassroom;

  if (isLoading) {
    return (
      <div className="text-cream text-center py-20">
        <p className="text-cream/60">Loading classroom...</p>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="text-cream text-center py-20">
        <p className="text-cream/60">Classroom not found.</p>
        <Link to="/admin/classrooms" className="mt-4 text-lime block">← Back to Classrooms</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-cream">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link to="/admin/classrooms" className="text-cream/60 hover:text-cream mt-1 shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-2xl font-bold">{classroom.name}</h1>
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded ${classroom.status === "active" ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/60"}`}>{classroom.status}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 flex-wrap">
            <span className="font-mono text-[11px] text-cream/50">{classroom.code}</span>
            <span className="text-cream/60 text-xs">·</span>
            <span className="text-cream/60 text-xs">{classroom.students.filter((s) => s.status === "active").length} / {classroom.maxStudents} students</span>
            <span className="text-cream/60 text-xs">·</span>
            <span className="text-cream/60 text-xs">{classroom.program}</span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 flex-wrap bg-cream/5 rounded-2xl p-1.5">
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex-1 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 transition-colors ${tab === t.key ? "bg-lime text-plum-dark" : "text-cream/70 hover:text-cream"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "announcements" && <AnnouncementsTab classroom={classroom} refreshClassroom={refreshClassroom} />}
      {tab === "live" && <LiveClassesTab classroomId={classroom.id} />}
      {tab === "recordings" && <RecordingsTab classroom={classroom} refreshClassroom={refreshClassroom} />}
      {tab === "tests" && <TestsTab classroomId={classroom.id} />}
      {tab === "students" && <StudentsTab classroom={classroom} refreshClassroom={refreshClassroom} />}
    </div>
  );
}
