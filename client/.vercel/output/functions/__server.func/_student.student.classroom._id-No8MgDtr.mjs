import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { b as Route$1, X as useClassroomStore, t as formatDuration, O as saveQuizAnswer, Q as submitQuizAttempt, E as getQuizAttemptResult, x as getClassroomById, f as classroomActions, G as getRecordingStreamUrl, P as startQuizAttempt } from "./_ssr/router-DF-WlXjF.mjs";
import { N as Lock, c as ArrowLeft, R as Megaphone, ap as Video, a2 as Radio, C as Calendar, v as Clock, g as BookOpen, $ as Play, u as ClipboardList, l as Check, aq as X, am as Trophy } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
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
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1e3;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
function fmtDate(iso) {
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
const TABS = [{
  key: "announcements",
  label: "📢 Announcements"
}, {
  key: "live",
  label: "🎥 Live Classes"
}, {
  key: "recordings",
  label: "⏺ Recordings"
}, {
  key: "tests",
  label: "📝 Tests"
}];
function AnnouncementsTab({
  classroomId
}) {
  const {
    classrooms
  } = useClassroomStore();
  const cls = classrooms.find((c) => c.id === classroomId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    cls.announcements.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "h-8 w-8 text-slate-300 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No announcements yet. Check back later." })
    ] }),
    cls.announcements.map((ann) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-slate-200 bg-white p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-plum-dark text-cream font-bold text-xs", children: ann.author.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum-dark text-sm font-semibold", children: ann.author }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 text-xs", children: timeAgo(ann.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-700 text-sm leading-relaxed", children: ann.content })
      ] })
    ] }) }, ann.id))
  ] });
}
function LiveClassesTab({
  classroomId
}) {
  const {
    classrooms
  } = useClassroomStore();
  const cls = classrooms.find((c) => c.id === classroomId);
  const upcoming = cls.meetings.filter((m) => m.status === "scheduled" || m.status === "live").sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  const past = cls.meetings.filter((m) => m.status === "ended").sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    cls.meetings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-8 w-8 text-slate-300 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No live classes scheduled yet." })
    ] }),
    upcoming.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-widest text-slate-400 mb-3", children: "Upcoming & Live" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: upcoming.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-2xl border p-5 ${m.status === "live" ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-plum-dark", children: m.title }),
            m.status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-red-100 text-red-600 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-2.5 w-2.5 animate-pulse" }),
              " LIVE"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: m.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              " ",
              fmtDate(m.scheduledAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              " ",
              m.duration,
              " min"
            ] })
          ] })
        ] }),
        m.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/student/jitsi/${m.roomId}`, className: "rounded-full bg-red-500 text-white px-5 py-2.5 text-sm font-bold flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-4 w-4" }),
          " Join Now"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/student/jitsi/${m.roomId}`, className: "rounded-full bg-plum-dark text-cream px-5 py-2.5 text-sm font-bold flex items-center gap-2 shrink-0 hover:bg-plum transition-colors", children: "Join Class" })
      ] }) }, m.id)) })
    ] }),
    past.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-widest text-slate-400 mb-3", children: "Past Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-slate-200 bg-white overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-[10px] uppercase tracking-widest text-slate-400 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4", children: "Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: past.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-slate-100 hover:bg-slate-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 font-semibold text-plum-dark", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-slate-500 text-xs", children: fmtDate(m.scheduledAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "text-slate-500 text-xs font-mono", children: [
            m.duration,
            "m"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-slate-100 text-slate-500 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded", children: "Done" }) })
        ] }, m.id)) })
      ] }) })
    ] })
  ] });
}
function SecurePlayer({
  recording,
  onClose
}) {
  const {
    currentUser,
    accessToken
  } = useClassroomStore();
  ({
    id: currentUser?.id || "",
    name: currentUser?.name || ""
  });
  const [position, setPosition] = reactExports.useState(0);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [blurred, setBlurred] = reactExports.useState(false);
  const videoRef = reactExports.useRef(null);
  reactExports.useRef(null);
  const streamUrl = recording.storageProvider === "cloudflare" ? `${getRecordingStreamUrl(recording.id)}${accessToken ? `?token=${encodeURIComponent(accessToken)}` : ""}` : recording.cloudflareUrl;
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      setPosition(Math.floor(video.currentTime));
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [recording.id]);
  reactExports.useEffect(() => {
    const handler = () => {
      if (document.hidden) {
        setBlurred(true);
        setIsPlaying(false);
      } else setBlurred(false);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  reactExports.useEffect(() => {
    const block = (e) => e.preventDefault();
    document.addEventListener("contextmenu", block);
    return () => document.removeEventListener("contextmenu", block);
  }, []);
  recording.duration > 0 ? position / recording.duration * 100 : 0;
  const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black flex flex-col", onContextMenu: (e) => e.preventDefault(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 bg-black/80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-sm truncate", children: recording.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-white/60 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 relative select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 bg-linear-to-br from-plum-dark/90 to-[#0B0719] flex items-center justify-center relative", children: [
        streamUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, src: streamUrl, crossOrigin: "use-credentials", className: "w-full h-[95vh] object-contain bg-black", controls: true, controlsList: "nodownload", poster: "/default-video-thumb.jpg", onPlay: () => setIsPlaying(true), onPause: () => setIsPlaying(false) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (blurred) return;
          setIsPlaying((p) => !p);
        }, className: "text-white/80 hover:text-white transition-colors", children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-10 bg-white rounded-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-10 bg-white rounded-sm" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-16 w-16 fill-current" }) }) }),
        blurred && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 backdrop-blur-xl bg-black/80 flex flex-col items-center justify-center z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-10 w-10 text-white/60 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: "Video paused — return to this tab to continue" })
        ] })
      ] }),
      recording.chapters.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-56 bg-[#111] border-l border-white/10 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b border-white/10 text-white/70 text-xs uppercase tracking-widest", children: "Chapters" }),
        recording.chapters.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPosition(ch.startTimeSec), className: `w-full text-left px-3 py-2.5 flex items-center gap-2 hover:bg-white/5 transition-colors ${position >= ch.startTimeSec ? "text-white" : "text-white/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-lime shrink-0", children: fmt(ch.startTimeSec) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs truncate", children: ch.title })
        ] }, ch.id))
      ] })
    ] })
  ] });
}
function RecordingsTab({
  classroomId
}) {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const CURRENT_STUDENT = {
    id: currentUser?.id || "",
    name: currentUser?.name || ""
  };
  const cls = classrooms.find((c) => c.id === classroomId);
  const [activeRec, setActiveRec] = reactExports.useState(null);
  const published = cls.recordings.filter((r) => r.isPublished);
  const activeRecording = published.find((r) => r.id === activeRec);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    activeRec && activeRecording && /* @__PURE__ */ jsxRuntimeExports.jsx(SecurePlayer, { recording: activeRecording, onClose: () => setActiveRec(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      published.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-8 w-8 text-slate-300 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No recordings published yet." })
      ] }),
      published.map((rec) => {
        const myStats = rec.viewStats.find((v) => v.studentId === CURRENT_STUDENT.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 hover:border-plum/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-14 rounded-xl bg-linear-to-br from-plum/20 to-plum-dark/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-5 w-5 text-plum" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-plum-dark text-sm mb-0.5", children: rec.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-xs line-clamp-1", children: rec.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-2 text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatDuration(rec.duration) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                rec.chapters.length,
                " chapters"
              ] }),
              myStats && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-plum font-medium", children: [
                myStats.watchedPercent,
                "% watched"
              ] })
            ] }),
            myStats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1 bg-slate-100 rounded-full overflow-hidden w-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum rounded-full", style: {
              width: `${myStats.watchedPercent}%`
            } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveRec(rec.id), className: "rounded-full bg-plum-dark text-cream px-4 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-plum transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
            " ",
            myStats ? "Resume" : "Watch"
          ] })
        ] }) }, rec.id);
      })
    ] })
  ] });
}
function TestsTab({
  classroomId
}) {
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const CURRENT_STUDENT = {
    id: currentUser?.id || "",
    name: currentUser?.name || ""
  };
  const cls = classrooms.find((c) => c.id === classroomId);
  const [phase, setPhase] = reactExports.useState("list");
  const [activeQuiz, setActiveQuiz] = reactExports.useState(null);
  const [examQuestions, setExamQuestions] = reactExports.useState([]);
  const [attemptId, setAttemptId] = reactExports.useState(null);
  const [answers, setAnswers] = reactExports.useState({});
  const [result, setResult] = reactExports.useState(null);
  const [timeLeft, setTimeLeft] = reactExports.useState(null);
  const [isStarting, setIsStarting] = reactExports.useState(false);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const answersRef = reactExports.useRef(answers);
  const submitQuizRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  const submitQuiz = reactExports.useCallback(async () => {
    if (!activeQuiz || !attemptId || isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      const currentAnswers = answersRef.current;
      await Promise.all(examQuestions.map((q) => saveQuizAnswer(activeQuiz.id, {
        attemptId,
        questionId: q.id,
        selectedOptions: currentAnswers[q.id] || []
      })));
      await submitQuizAttempt(activeQuiz.id, attemptId);
      const review = await getQuizAttemptResult(activeQuiz.id, attemptId);
      setResult(review);
      const refreshed = await getClassroomById(classroomId);
      classroomActions.updateClassroom(classroomId, refreshed);
      setPhase("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  }, [activeQuiz, attemptId, classroomId, examQuestions, isSubmitting]);
  reactExports.useEffect(() => {
    submitQuizRef.current = () => {
      void submitQuiz();
    };
  }, [submitQuiz]);
  reactExports.useEffect(() => {
    if (phase !== "taking" || !activeQuiz?.duration) return;
    setTimeLeft(activeQuiz.duration * 60);
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(t);
          submitQuizRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    return () => clearInterval(t);
  }, [phase, activeQuiz]);
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setExamQuestions([]);
    setAttemptId(null);
    setAnswers({});
    setResult(null);
    setError("");
    setPhase("intro");
  };
  const beginTaking = async () => {
    if (!activeQuiz || isStarting) return;
    setError("");
    setIsStarting(true);
    try {
      const started = await startQuizAttempt(activeQuiz.id);
      setAttemptId(started.attemptId);
      setExamQuestions(started.questions);
      setAnswers({});
      setPhase("taking");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start quiz");
    } finally {
      setIsStarting(false);
    }
  };
  const selectAnswer = (qId, label, isMulti) => {
    setAnswers((prev) => {
      const current = prev[qId] || [];
      if (isMulti) {
        return {
          ...prev,
          [qId]: current.includes(label) ? current.filter((l) => l !== label) : [...current, label]
        };
      }
      return {
        ...prev,
        [qId]: [label]
      };
    });
  };
  const publishedQuizzes = cls.quizzes.filter((q) => q.status === "published");
  if (phase === "list") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600", children: error }),
      publishedQuizzes.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-slate-300 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "No tests published yet." })
      ] }),
      publishedQuizzes.map((q) => {
        const myAttempts = q.attempts.filter((a) => a.studentId === CURRENT_STUDENT.id && a.status === "submitted");
        const bestAttempt = myAttempts.sort((a, b) => b.score.percentage - a.score.percentage)[0];
        const canAttempt = myAttempts.length < q.maxAttempts;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-slate-200 bg-white p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-bold text-plum-dark mb-1", children: q.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                q.questions.length,
                " questions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                q.questions.reduce((s, x) => s + x.marks, 0),
                " marks"
              ] }),
              q.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                " ",
                q.duration,
                " min"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Pass: ",
                q.passPercent,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Attempts: ",
                myAttempts.length,
                "/",
                q.maxAttempts
              ] })
            ] }),
            bestAttempt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${bestAttempt.score.passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`, children: [
              bestAttempt.score.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
              "Best score: ",
              bestAttempt.score.percentage,
              "% — ",
              bestAttempt.score.passed ? "Passed ✓" : "Failed"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => startQuiz(q), disabled: !canAttempt, className: `rounded-full px-5 py-2.5 text-sm font-bold shrink-0 ${canAttempt ? "bg-plum-dark text-cream hover:bg-plum" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`, children: !canAttempt ? "Max attempts reached" : myAttempts.length > 0 ? "Retry" : "Start Quiz" })
        ] }) }, q.id);
      })
    ] });
  }
  if (phase === "intro" && activeQuiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-16 w-16 place-items-center rounded-full bg-plum-dark/10 mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-plum-dark" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-plum-dark mb-2", children: activeQuiz.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-sm mb-6 leading-relaxed", children: activeQuiz.instructions }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [{
        l: "Questions",
        v: activeQuiz.questions.length
      }, {
        l: "Total Marks",
        v: activeQuiz.questions.reduce((s, q) => s + q.marks, 0)
      }, {
        l: "Pass Mark",
        v: `${activeQuiz.passPercent}%`
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-slate-50 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-slate-400", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold text-plum-dark", children: s.v })
      ] }, s.l)) }),
      activeQuiz.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-sm text-amber-700 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 shrink-0" }),
        "Time limit: ",
        activeQuiz.duration,
        " minutes. The quiz will auto-submit when time runs out."
      ] }),
      activeQuiz.negativeMarking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-6 text-sm text-red-600", children: [
        "⚠️ Negative marking: −",
        activeQuiz.negativeMarkValue,
        " marks per wrong answer."
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 mb-4 text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPhase("list"), className: "flex-1 rounded-full border border-slate-200 text-slate-600 py-3 text-sm font-semibold", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: beginTaking, disabled: isStarting, className: "flex-1 rounded-full bg-plum-dark text-cream py-3 text-sm font-bold disabled:opacity-50", children: isStarting ? "Starting…" : "Start Quiz →" })
      ] })
    ] }) });
  }
  if (phase === "taking" && activeQuiz) {
    const answered = Object.keys(answers).length;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 bg-[#F5F3FF] py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white px-5 py-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum-dark font-semibold text-sm", children: activeQuiz.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 text-xs", children: [
            answered,
            "/",
            examQuestions.length,
            " answered"
          ] }),
          timeLeft !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-sm font-bold ${timeLeft < 120 ? "text-red-500" : "text-plum-dark"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 inline mr-1" }),
            Math.floor(timeLeft / 60).toString().padStart(2, "0"),
            ":",
            (timeLeft % 60).toString().padStart(2, "0")
          ] })
        ] })
      ] }) }),
      examQuestions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-plum-dark text-cream text-xs font-bold", children: i + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-plum-dark font-semibold text-sm", children: q.text }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-400 text-xs", children: [
              q.marks,
              " mark",
              q.marks !== 1 ? "s" : "",
              " ·",
              " ",
              q.type === "msq" ? "Select all correct answers" : "Select one answer"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: q.options.map((opt) => {
          const selected = answers[q.id]?.includes(opt.label);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => selectAnswer(q.id, opt.label, q.type === "msq"), className: `w-full flex items-center gap-3 rounded-xl px-4 py-3 border text-left transition-colors ${selected ? "border-plum bg-plum/5" : "border-slate-200 hover:border-plum/30 hover:bg-slate-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold transition-colors ${selected ? "bg-plum-dark border-plum-dark text-cream" : "border-slate-300 text-slate-400"}`, children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : opt.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-700", children: opt.text })
          ] }, opt.label);
        }) })
      ] }, q.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-500 text-sm", children: answered < examQuestions.length ? `${examQuestions.length - answered} question${examQuestions.length - answered !== 1 ? "s" : ""} unanswered` : "All questions answered ✓" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => void submitQuiz(), disabled: isSubmitting, className: "rounded-full bg-plum-dark text-cream px-8 py-3 text-sm font-bold hover:bg-plum transition-colors disabled:opacity-50", children: isSubmitting ? "Submitting…" : "Submit Quiz" })
      ] })
    ] });
  }
  if (phase === "result" && result && activeQuiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-20 w-20 place-items-center rounded-full mx-auto mb-4 ${result.score.passed ? "bg-green-100" : "bg-red-100"}`, children: result.score.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-10 w-10 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-10 w-10 text-red-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold text-plum-dark mb-1", children: [
          result.score.percentage,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-lg font-semibold mb-2 ${result.score.passed ? "text-green-600" : "text-red-500"}`, children: result.score.passed ? "🎉 Congratulations! You Passed!" : "Keep trying — you can do this!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-500 text-sm mb-6", children: [
          result.score.rawMarks,
          " / ",
          result.score.totalMarks,
          " marks · Pass mark: ",
          activeQuiz.passPercent,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPhase("list"), className: "rounded-full bg-plum-dark text-cream px-8 py-3 text-sm font-bold", children: "← Back to Tests" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark", children: "Answer Review" }),
        result.answers.map((myAns, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border p-5 ${myAns.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${myAns.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"}`, children: myAns.isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-slate-800 text-sm font-medium flex-1", children: [
              "Q",
              i + 1,
              ". ",
              myAns.questionText
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-slate-500 shrink-0", children: [
              "+",
              myAns.marksAwarded
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-600 ml-8", children: [
            "Your answer: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: myAns.selectedOptions.join(", ") || "—" }),
            " · Correct: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-green-700", children: myAns.correctOptions.join(", ") })
          ] }),
          myAns.explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 ml-8 mt-2 italic", children: [
            "💡 ",
            myAns.explanation
          ] })
        ] }, myAns.questionId))
      ] })
    ] });
  }
  return null;
}
function StudentClassroomDetail() {
  const params = Route$1.useParams();
  const navigate = Route$1.useNavigate();
  const id = params.id;
  const {
    classrooms,
    currentUser
  } = useClassroomStore();
  const CURRENT_STUDENT = {
    id: currentUser?.id || "",
    name: currentUser?.name || ""
  };
  const [tab, setTab] = reactExports.useState("announcements");
  const cls = classrooms.find((c) => c.id === id);
  const myInfo = cls?.students.find((s) => s.id === CURRENT_STUDENT.id);
  if (!cls || !myInfo || myInfo.status !== "active") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-12 w-12 text-slate-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-plum-dark text-xl", children: "Access Denied" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm mt-2", children: "You are not enrolled in this classroom." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/student/classrooms"
      }), className: "mt-5 rounded-full bg-plum-dark text-cream px-6 py-2.5 text-sm font-bold", children: "← My Classrooms" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/student/classrooms"
      }), className: "text-slate-400 hover:text-plum-dark mt-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-plum-dark", children: cls.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-slate-400", children: cls.code }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 text-xs", children: cls.program }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-500 text-xs", children: [
            cls.students.filter((s) => s.status === "active").length,
            " students enrolled"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-slate-100 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-plum rounded-full", style: {
            width: `${myInfo.progress}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-plum-dark font-bold", children: [
            myInfo.progress,
            "% complete"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-slate-100 rounded-2xl p-1.5 flex-wrap", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t.key), className: `flex-1 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 transition-colors ${tab === t.key ? "bg-plum-dark text-cream shadow" : "text-slate-600 hover:text-plum-dark"}`, children: t.label }, t.key)) }),
    tab === "announcements" && /* @__PURE__ */ jsxRuntimeExports.jsx(AnnouncementsTab, { classroomId: cls.id }),
    tab === "live" && /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClassesTab, { classroomId: cls.id }),
    tab === "recordings" && /* @__PURE__ */ jsxRuntimeExports.jsx(RecordingsTab, { classroomId: cls.id }),
    tab === "tests" && /* @__PURE__ */ jsxRuntimeExports.jsx(TestsTab, { classroomId: cls.id })
  ] });
}
export {
  StudentClassroomDetail as component
};
