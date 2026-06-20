import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, e as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const now = /* @__PURE__ */ new Date();
new Date(now.getTime() + 2 * 60 * 60 * 1e3).toISOString();
new Date(now.getTime() + 3 * 24 * 60 * 60 * 1e3).toISOString();
new Date(now.getTime() + 1 * 60 * 60 * 1e3).toISOString();
const INITIAL_USERS = [
  { id: "Ajay", name: "Ajay Kumar", email: "ajay@ex.com", role: "student", password: "1111", phone: "+91 98700 11110" },
  { id: "Navin", name: "Navin Raj", email: "navin@ex.com", role: "student", password: "2222", phone: "+91 98700 22220" },
  { id: "admin", name: "Admin", email: "admin@ex.com", role: "admin", password: "axon@admin" }
];
const INITIAL_COURSES = [
  { id: "crs-01", title: "Staff Nursing Diploma", category: "Diploma", description: "Comprehensive nursing diploma covering patient care, medication administration, and clinical skills.", price: 22500, status: "published", updatedAt: "2026-03-04T08:00:00Z" },
  { id: "crs-02", title: "OT Technician Pro", category: "Certificate", description: "Operation theatre technician certification with hands-on surgical training.", price: 18e3, status: "published", updatedAt: "2026-02-28T08:00:00Z" },
  { id: "crs-03", title: "Lab Technician", category: "Certificate", description: "Clinical laboratory technology and diagnostic procedures.", price: 16500, status: "published", updatedAt: "2026-02-26T08:00:00Z" },
  { id: "crs-04", title: "ICU Critical Care", category: "Advanced", description: "Advanced critical care nursing covering ventilator management, haemodynamics, and ICU protocols.", price: 24e3, status: "published", updatedAt: "2026-02-20T08:00:00Z" },
  { id: "crs-05", title: "Radiology Basics", category: "Certificate", description: "Introduction to radiological techniques and imaging interpretation.", price: 19500, status: "draft", updatedAt: "2026-02-12T08:00:00Z" },
  { id: "crs-06", title: "Trauma Response", category: "Workshop", description: "Emergency trauma response and pre-hospital care workshop.", price: 9500, status: "draft", updatedAt: "2026-03-06T08:00:00Z" }
];
const INITIAL_CLASSROOMS = [];
const INITIAL_THREADS = [
  {
    id: "thread-001",
    participantIds: ["Ajay", "admin-01"],
    participantNames: ["Ajay Kumar", "Admin"],
    type: "direct",
    lastUpdated: new Date(now.getTime() - 30 * 60 * 1e3).toISOString(),
    messages: [
      { id: "msg-001", senderId: "admin-01", senderName: "Admin", text: "Hi Ajay! Great work on the Module 1 assessment — 100% score! 🎉", createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1e3).toISOString(), read: true },
      { id: "msg-002", senderId: "Ajay", senderName: "Ajay Kumar", text: "Thank you! The questions were very clear. Looking forward to Module 2.", createdAt: new Date(now.getTime() - 90 * 60 * 1e3).toISOString(), read: true },
      { id: "msg-003", senderId: "admin-01", senderName: "Admin", text: "Module 2 recording (Ventilators) is now published. Please complete it before the next live class.", createdAt: new Date(now.getTime() - 30 * 60 * 1e3).toISOString(), read: false }
    ]
  },
  {
    id: "thread-002",
    participantIds: ["Navin", "admin-01"],
    participantNames: ["Navin Raj", "Admin"],
    type: "direct",
    lastUpdated: new Date(now.getTime() - 3 * 60 * 60 * 1e3).toISOString(),
    messages: [
      { id: "msg-004", senderId: "admin-01", senderName: "Admin", text: "Hi Navin! Please complete the Patient Assessment recording before June 5th practical.", createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1e3).toISOString(), read: true },
      { id: "msg-005", senderId: "Navin", senderName: "Navin Raj", text: "Understood. I'll complete it by June 3rd. Should I attempt the quiz as well?", createdAt: new Date(now.getTime() - 3.5 * 60 * 60 * 1e3).toISOString(), read: true },
      { id: "msg-006", senderId: "admin-01", senderName: "Admin", text: "Yes please! The quiz is now open. Good luck!", createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1e3).toISOString(), read: false }
    ]
  }
];
const INITIAL_PAYMENTS = [
  { studentId: "Ajay", classroomId: "cls-001", status: "Paid" },
  { studentId: "Navin", classroomId: "cls-002", status: "Paid" }
];
function createStore(initial) {
  let state = initial;
  const listeners = /* @__PURE__ */ new Set();
  return {
    getState: () => state,
    setState: (updater) => {
      const patch = updater(state);
      state = { ...state, ...patch };
      listeners.forEach((l) => l());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
const classroomStore = createStore({
  classrooms: INITIAL_CLASSROOMS,
  users: INITIAL_USERS,
  courses: INITIAL_COURSES,
  currentUser: null,
  // always null at boot; __root.tsx rehydrates via GET /auth/me (cookie)
  accessToken: null,
  threads: INITIAL_THREADS,
  payments: INITIAL_PAYMENTS
});
function useClassroomStore() {
  return reactExports.useSyncExternalStore(
    classroomStore.subscribe,
    classroomStore.getState,
    classroomStore.getState
  );
}
const STALE_MS = 6e4;
const classroomFetchCache = /* @__PURE__ */ new Map();
function isClassroomStale(id) {
  const last = classroomFetchCache.get(id);
  if (last === void 0) return true;
  return Date.now() - last > STALE_MS;
}
function markClassroomFresh(id) {
  classroomFetchCache.set(id, Date.now());
}
const adminActions = {
  // Users
  createUser: (u) => {
    const newUser = { ...u, id: `user-${Date.now()}` };
    classroomStore.setState((s) => ({ users: [...s.users, newUser] }));
    return newUser;
  },
  updateUser: (id, updates) => {
    classroomStore.setState((s) => ({
      users: s.users.map((u) => u.id === id ? { ...u, ...updates } : u),
      currentUser: s.currentUser?.id === id ? { ...s.currentUser, ...updates } : s.currentUser
    }));
  },
  // Courses
  createCourse: (c) => {
    const nc = { ...c, id: `crs-${Date.now()}`, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    classroomStore.setState((s) => ({ courses: [...s.courses, nc] }));
    return nc;
  },
  updateCourse: (id, updates) => {
    classroomStore.setState((s) => ({
      courses: s.courses.map((c) => c.id === id ? { ...c, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : c)
    }));
  },
  deleteCourse: (id) => {
    classroomStore.setState((s) => ({
      courses: s.courses.filter((c) => c.id !== id)
    }));
  },
  updateCourseStatus: (id, status) => {
    classroomStore.setState((s) => ({ courses: s.courses.map((c) => c.id === id ? { ...c, status, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : c) }));
  },
  // Payments
  updatePaymentStatus: (studentId, classroomId, status) => {
    classroomStore.setState((s) => {
      const existing = s.payments.find((p) => p.studentId === studentId && p.classroomId === classroomId);
      if (existing) {
        return { payments: s.payments.map((p) => p.studentId === studentId && p.classroomId === classroomId ? { ...p, status } : p) };
      }
      return { payments: [...s.payments, { studentId, classroomId, status }] };
    });
  }
};
const classroomActions = {
  // Classroom CRUD
  createClassroom: (c) => {
    const newCls = {
      ...c,
      id: `cls-${Date.now()}`,
      students: [],
      announcements: [],
      meetings: [],
      recordings: [],
      quizzes: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    classroomStore.setState((s) => ({ classrooms: [...s.classrooms, newCls] }));
    return newCls;
  },
  addClassroom: (c) => {
    classroomStore.setState((s) => ({ classrooms: [...s.classrooms, c] }));
  },
  setClassrooms: (classrooms) => {
    classroomStore.setState(() => ({ classrooms }));
  },
  updateClassroom: (id, updates) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map((c) => c.id === id ? { ...c, ...updates } : c)
    }));
  },
  archiveClassroom: (id) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map((c) => c.id === id ? { ...c, status: "archived" } : c)
    }));
  },
  // Announcements
  addAnnouncement: (classroomId, content) => {
    const ann = {
      id: `ann-${Date.now()}`,
      content,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      author: "Admin",
      attachments: void 0
    };
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, announcements: [ann, ...c.announcements] } : c
      )
    }));
  },
  deleteAnnouncement: (classroomId, annId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, announcements: c.announcements.filter((a) => a.id !== annId) } : c
      )
    }));
  },
  // Meetings
  addMeeting: (classroomId, m) => {
    const meeting = {
      ...m,
      id: m.id ?? `meet-${Date.now()}`,
      roomId: m.roomId ?? `room-${Date.now()}`,
      status: m.status ?? "scheduled",
      attendees: m.attendees ?? []
    };
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, meetings: [...c.meetings, meeting] } : c
      )
    }));
    return meeting;
  },
  startMeeting: (classroomId, meetingId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, meetings: c.meetings.map((m) => m.id === meetingId ? { ...m, status: "live" } : m) } : c
      )
    }));
  },
  endMeeting: (classroomId, meetingId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, meetings: c.meetings.map((m) => m.id === meetingId ? { ...m, status: "ended" } : m) } : c
      )
    }));
  },
  deleteMeeting: (classroomId, meetingId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, meetings: c.meetings.filter((m) => m.id !== meetingId) } : c
      )
    }));
  },
  // Recordings
  addRecording: (classroomId, r) => {
    const rec = {
      ...r,
      id: "id" in r && r.id ? r.id : `rec-${Date.now()}`,
      viewStats: [],
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, recordings: [...c.recordings, rec] } : c
      )
    }));
    return rec;
  },
  publishRecording: (classroomId, recordingId, publish) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, recordings: c.recordings.map((r) => r.id === recordingId ? { ...r, isPublished: publish } : r) } : c
      )
    }));
  },
  deleteRecording: (classroomId, recordingId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, recordings: c.recordings.filter((r) => r.id !== recordingId) } : c
      )
    }));
  },
  updateViewStat: (classroomId, recordingId, studentId, studentName, watchedPercent, lastPosition) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? {
          ...c,
          recordings: c.recordings.map((r) => {
            if (r.id !== recordingId) return r;
            const existing = r.viewStats.find((v) => v.studentId === studentId);
            const updatedStats = existing ? r.viewStats.map((v) => v.studentId === studentId ? { ...v, watchedPercent, lastPosition } : v) : [...r.viewStats, { studentId, studentName, watchedPercent, lastPosition }];
            return { ...r, viewStats: updatedStats };
          })
        } : c
      )
    }));
  },
  // Quizzes
  addQuiz: (classroomId, q) => {
    const quiz = { ...q, id: q.id ?? `quiz-${Date.now()}`, attempts: q.attempts ?? [] };
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, quizzes: [...c.quizzes, quiz] } : c
      )
    }));
    return quiz;
  },
  updateQuizStatus: (classroomId, quizId, status) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, quizzes: c.quizzes.map((q) => q.id === quizId ? { ...q, status } : q) } : c
      )
    }));
  },
  updateQuiz: (classroomId, quizId, updates) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? {
          ...c,
          quizzes: c.quizzes.map((q) => q.id === quizId ? { ...q, ...updates } : q)
        } : c
      )
    }));
  },
  deleteQuiz: (classroomId, quizId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, quizzes: c.quizzes.filter((q) => q.id !== quizId) } : c
      )
    }));
  },
  // Quiz Attempts (student submits)
  submitQuizAttempt: (classroomId, quizId, attempt) => {
    const att = { ...attempt, id: `att-${Date.now()}` };
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, quizzes: c.quizzes.map((q) => q.id === quizId ? { ...q, attempts: [...q.attempts, att] } : q) } : c
      )
    }));
    return att;
  },
  // Students
  addStudent: (classroomId, student) => {
    classroomStore.setState((s) => {
      const cls = s.classrooms.find((c) => c.id === classroomId);
      if (cls?.students.some((st) => st.id === student.id)) return s;
      return {
        classrooms: s.classrooms.map(
          (c) => c.id === classroomId ? { ...c, students: [...c.students, student] } : c
        )
      };
    });
  },
  updateStudentStatus: (classroomId, studentId, status) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, students: c.students.map((st) => st.id === studentId ? { ...st, status } : st) } : c
      )
    }));
  },
  removeStudent: (classroomId, studentId) => {
    classroomStore.setState((s) => ({
      classrooms: s.classrooms.map(
        (c) => c.id === classroomId ? { ...c, students: c.students.filter((st) => st.id !== studentId) } : c
      )
    }));
  }
};
const messageActions = {
  sendMessage: (threadId, senderId, senderName, text) => {
    const msg = {
      id: `msg-${Date.now()}`,
      senderId,
      senderName,
      text,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      read: false
    };
    classroomStore.setState((s) => ({
      threads: s.threads.map(
        (t) => t.id === threadId ? { ...t, messages: [...t.messages, msg], lastUpdated: msg.createdAt } : t
      )
    }));
  },
  createThread: (studentId, studentName) => {
    const s = classroomStore.getState();
    const exists = s.threads.find((t) => t.participantIds.includes(studentId) && t.participantIds.includes("admin-01") && t.type === "direct");
    if (exists) return exists;
    const thread = {
      id: `thread-${Date.now()}`,
      participantIds: [studentId, "admin-01"],
      participantNames: [studentName, "Admin"],
      type: "direct",
      messages: [],
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    };
    classroomStore.setState((s2) => ({ threads: [...s2.threads, thread] }));
    return thread;
  },
  markRead: (threadId, userId) => {
    classroomStore.setState((s) => ({
      threads: s.threads.map(
        (t) => t.id === threadId ? { ...t, messages: t.messages.map((m) => m.senderId !== userId ? { ...m, read: true } : m) } : t
      )
    }));
  }
};
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function uid() {
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
function getExamType(questions) {
  const types = new Set(questions.map((q) => q.type));
  if (types.size === 1) {
    if (types.has("mcq")) return "MCQ";
    if (types.has("msq")) return "MSQ";
    if (types.has("true_false")) return "True/False";
  }
  return "Mixed";
}
function getGrade(percent) {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B+";
  if (percent >= 60) return "B";
  if (percent >= 50) return "C";
  return "F";
}
function computeCertificates(classrooms, userId) {
  const certs = [];
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === userId && s.status === "active"));
  for (const cls of enrolledClassrooms) {
    const studentRecord = cls.students.find((s) => s.id === userId);
    const certUrl = studentRecord?.certificateUrl || cls.certificateUrl;
    const publishedQuizzes = cls.quizzes.filter((q) => q.status === "published");
    if (publishedQuizzes.length > 0 && !certUrl) {
      const allPassed = publishedQuizzes.every(
        (q) => q.attempts.some((a) => a.studentId === userId && a.status === "submitted" && a.score.passed)
      );
      if (!allPassed) continue;
    }
    const lastAttempt = publishedQuizzes.flatMap((q) => q.attempts.filter((a) => a.studentId === userId && a.score.passed)).sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime())[0];
    certs.push({
      classroomId: cls.id,
      classroomName: cls.name,
      program: cls.program,
      earnedAt: lastAttempt?.submittedAt || cls.createdAt,
      certificateUrl: certUrl
    });
  }
  return certs;
}
const getApiBase = () => {
  const runtimeApiUrl = "https://oc-pro.onrender.com/api/v1";
  return (runtimeApiUrl?.trim() || "/api/v1").replace(/\/+$/, "");
};
const API_BASE = getApiBase();
function getDevAuthUserHeaders() {
  return {};
}
function normalizeLoginIdentifier(value) {
  if (value.includes("@")) return value;
  const map = {
    Ajay: "ajay@ex.com",
    Navin: "navin@ex.com",
    Admin: "admin@ex.com"
  };
  return map[value] ?? value;
}
function normalizeBackendClassroom(raw) {
  const normalizeMeetingStatus = (status) => {
    if (status === "waiting") return "scheduled";
    return status || "scheduled";
  };
  const computeStudentMetrics = (studentId) => {
    const meetings = Array.isArray(raw.meetings) ? raw.meetings : [];
    const countableMeetings = meetings.filter((m) => ["live", "ended"].includes(normalizeMeetingStatus(m.status)));
    const attendedMeetings = countableMeetings.filter(
      (m) => Array.isArray(m.attendees) && m.attendees.some((a) => {
        const attendeeId = String(a.student?._id || a.student || a);
        return attendeeId === studentId && (a.joinedAt || (a.duration ?? 0) > 0);
      })
    );
    const attendance = countableMeetings.length ? Math.round(attendedMeetings.length / countableMeetings.length * 100) : 0;
    const recordings = Array.isArray(raw.recordings) ? raw.recordings : [];
    const publishedRecordings = recordings.filter((r) => r.isPublished);
    const recordingPercents = publishedRecordings.map((r) => {
      const stats = Array.isArray(r.viewStats) ? r.viewStats.find((v) => String(v.student?._id || v.student) === studentId) : null;
      const duration = Number(r.duration || 0);
      return stats && duration > 0 ? Math.min(100, Math.round((stats.totalWatchedSec || 0) / duration * 100)) : 0;
    });
    const recordingProgress = recordingPercents.length ? Math.round(recordingPercents.reduce((sum, pct) => sum + pct, 0) / recordingPercents.length) : 0;
    const quizzes = Array.isArray(raw.quizzes) ? raw.quizzes : [];
    const publishedQuizzes = quizzes.filter((q) => ["published", "closed"].includes(q.status));
    const submittedAttempts = publishedQuizzes.flatMap(
      (q) => Array.isArray(q.attempts) ? q.attempts.filter((a) => String(a.student?._id || a.student) === studentId && a.status === "submitted") : []
    );
    const quizAvg = submittedAttempts.length ? Math.round(submittedAttempts.reduce((sum, att) => sum + (att.score?.percentage || 0), 0) / submittedAttempts.length) : 0;
    const quizProgress = publishedQuizzes.length ? Math.round(new Set(submittedAttempts.map((att) => String(att.quiz?._id || att.quiz))).size / publishedQuizzes.length * 100) : 0;
    const progress = Math.round(
      attendance * 0.3 + recordingProgress * 0.4 + quizProgress * 0.3
    );
    return { attendance, quizAvg, progress };
  };
  return {
    id: raw._id || raw.id,
    name: raw.name || "",
    description: raw.description || "",
    code: raw.code || "",
    status: raw.status || "active",
    maxStudents: raw.maxStudents ?? 100,
    program: raw.program?.name || raw.program?.title || raw.program || "",
    createdAt: raw.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    students: Array.isArray(raw.students) ? raw.students.map((s) => ({
      ...(() => {
        const id = String(s.student?._id || s.student || `student-${Date.now()}`);
        const metrics = computeStudentMetrics(id);
        return {
          id,
          name: s.student?.fullName || s.student?.email || "Student",
          email: s.student?.email || "",
          enrollmentId: s.enrollmentId || "",
          progress: metrics.progress,
          attendance: metrics.attendance,
          quizAvg: metrics.quizAvg,
          status: s.status || "active",
          addedAt: s.addedAt ? new Date(s.addedAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          certificateUrl: s.certificateUrl || void 0
        };
      })()
    })) : [],
    announcements: Array.isArray(raw.announcements) ? raw.announcements.map(normalizeBackendAnnouncement) : [],
    meetings: Array.isArray(raw.meetings) ? raw.meetings.map((m) => ({
      id: m._id || m.id,
      title: m.title,
      description: m.description || "",
      scheduledAt: m.scheduledAt || (/* @__PURE__ */ new Date()).toISOString(),
      duration: m.duration || 60,
      status: normalizeMeetingStatus(m.status),
      attendees: Array.isArray(m.attendees) ? m.attendees.map((a) => String(a.student?._id || a.student || a)) : [],
      roomId: m.roomId || "",
      webexLink: m.webexLink || "",
      webexPassword: m.webexPassword || ""
    })) : [],
    recordings: Array.isArray(raw.recordings) ? raw.recordings.map((r) => ({
      id: r._id || r.id,
      title: r.title,
      description: r.description || "",
      duration: r.duration || 0,
      isPublished: r.isPublished || false,
      chapters: r.chapters || [],
      storageProvider: r.storageProvider,
      cloudflareKey: r.cloudflareKey,
      cloudflareUrl: r.cloudflareUrl,
      viewStats: Array.isArray(r.viewStats) ? r.viewStats.map((v) => ({
        studentId: String(v.student?._id || v.student),
        studentName: v.student ? v.student.fullName || "Student" : "Student",
        watchedPercent: r.duration > 0 ? Math.round(v.totalWatchedSec / r.duration * 100) : 0,
        totalWatchedSec: v.totalWatchedSec || 0,
        lastPosition: v.lastPosition || 0
      })) : []
    })) : [],
    quizzes: Array.isArray(raw.quizzes) ? raw.quizzes.map((q) => ({
      id: q._id || q.id,
      title: q.title,
      instructions: q.instructions || "",
      duration: q.duration,
      maxAttempts: q.maxAttempts || 1,
      randomizeQuestions: q.randomizeQuestions,
      randomizeOptions: q.randomizeOptions,
      showLeaderboard: q.showLeaderboard,
      negativeMarking: q.negativeMarking,
      negativeMarkValue: q.negativeMarkValue,
      passPercent: q.passPercent,
      availableFrom: q.availableFrom,
      availableUntil: q.availableUntil,
      status: q.status || "draft",
      questions: Array.isArray(q.questions) ? q.questions.map((quest) => ({
        id: quest._id || quest.id,
        type: quest.type || "mcq",
        text: quest.text,
        marks: quest.marks || 1,
        explanation: quest.explanation || "",
        order: quest.order || 1,
        options: Array.isArray(quest.options) ? quest.options.map((o) => ({
          label: o.label,
          text: o.text,
          isCorrect: o.isCorrect || false
        })) : []
      })) : [],
      attempts: Array.isArray(q.attempts) ? q.attempts.map((att) => ({
        id: att._id || att.id,
        studentId: String(att.student?._id || att.student),
        studentName: att.studentName || "Student",
        attemptNo: att.attemptNo || 1,
        status: att.status || "submitted",
        startedAt: att.startedAt,
        submittedAt: att.submittedAt,
        totalTimeTakenSec: att.totalTimeTakenSec || 0,
        answers: Array.isArray(att.answers) ? att.answers.map((ans) => ({
          questionId: String(ans.questionId),
          selectedOptions: ans.selectedOptions || [],
          isCorrect: !!ans.isCorrect,
          marksAwarded: ans.marksAwarded ?? 0
        })) : [],
        score: att.score || { rawMarks: 0, totalMarks: 0, percentage: 0, passed: false }
      })) : []
    })) : []
  };
}
function normalizeBackendAnnouncement(raw) {
  const author = raw.author;
  return {
    id: raw._id || raw.id,
    content: raw.content || "",
    createdAt: raw.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    author: author?.fullName || author?.email || author?.role || "Admin",
    attachments: Array.isArray(raw.attachments) ? raw.attachments : []
  };
}
function normalizeBackendQuiz(raw) {
  return {
    id: raw._id || raw.id,
    title: raw.title || "",
    instructions: raw.instructions || "",
    duration: raw.duration ?? null,
    maxAttempts: raw.maxAttempts || 1,
    randomizeQuestions: raw.randomizeQuestions || false,
    randomizeOptions: raw.randomizeOptions || false,
    showLeaderboard: raw.showLeaderboard || false,
    negativeMarking: raw.negativeMarking || false,
    negativeMarkValue: raw.negativeMarkValue ?? 0.25,
    passPercent: raw.passPercent || 0,
    availableFrom: raw.availableFrom || "",
    availableUntil: raw.availableUntil || "",
    status: raw.status || "draft",
    questions: Array.isArray(raw.questions) ? raw.questions.map((quest) => ({
      id: quest._id || quest.id,
      type: quest.type || "mcq",
      text: quest.text || "",
      marks: quest.marks || 1,
      explanation: quest.explanation || "",
      order: quest.order || 0,
      options: Array.isArray(quest.options) ? quest.options.map((o) => ({
        label: o.label,
        text: o.text,
        isCorrect: !!o.isCorrect
      })) : []
    })) : [],
    attempts: Array.isArray(raw.attempts) ? raw.attempts.map((att) => ({
      id: att._id || att.id,
      studentId: String(att.student?._id || att.student || ""),
      studentName: att.studentName || att.student?.fullName || "Student",
      attemptNo: att.attemptNo || 1,
      status: att.status || "submitted",
      startedAt: att.startedAt,
      submittedAt: att.submittedAt,
      totalTimeTakenSec: att.totalTimeTakenSec || 0,
      answers: Array.isArray(att.answers) ? att.answers.map((ans) => ({
        questionId: String(ans.questionId),
        selectedOptions: ans.selectedOptions || [],
        isCorrect: !!ans.isCorrect,
        marksAwarded: ans.marksAwarded ?? 0
      })) : [],
      score: att.score || { rawMarks: 0, totalMarks: 0, percentage: 0, passed: false }
    })) : []
  };
}
async function fetchJson(path, options = {}) {
  const accessToken = classroomStore.getState().accessToken;
  const headers = {
    "Content-Type": "application/json",
    ...accessToken ? { "Authorization": `Bearer ${accessToken}` } : {},
    ...getDevAuthUserHeaders()
  };
  const extraHeaders = options.headers;
  if (extraHeaders) Object.assign(headers, extraHeaders);
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    // sends HttpOnly cookies cross-origin (Vercel → Railway)
    headers,
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && path !== "/auth/login" && path !== "/auth/me") {
      classroomStore.setState(() => ({ currentUser: null }));
    }
    throw new Error(payload.message || "Server error");
  }
  return payload;
}
async function loginUser(identifier, password) {
  return fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: normalizeLoginIdentifier(identifier), password })
  });
}
async function getCurrentUser() {
  return fetchJson("/auth/me");
}
async function getAdminUsers(role) {
  const query = `?role=${encodeURIComponent(role)}`;
  const payload = await fetchJson(`/admin/users${query}`);
  return payload.users.map((user) => ({
    id: String(user._id || user.id),
    name: user.fullName || user.email,
    email: user.email || "",
    phone: user.phone || "",
    role: user.role,
    isActive: user.isActive,
    isVerified: user.isVerified,
    createdAt: user.createdAt
  }));
}
async function createAdminUser(data) {
  return fetchJson("/admin/users", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
async function getClassrooms() {
  const payload = await fetchJson("/classrooms");
  return payload.classrooms.map(normalizeBackendClassroom);
}
async function getClassroomById(id) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(id)}`);
  return normalizeBackendClassroom(payload.classroom);
}
async function createClassroomAnnouncement(classroomId, content, attachments = []) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/announcements`, {
    method: "POST",
    body: JSON.stringify({ content, attachments })
  });
  return normalizeBackendAnnouncement(payload.announcement);
}
async function deleteClassroomAnnouncement(classroomId, announcementId) {
  return fetchJson(
    `/classrooms/${encodeURIComponent(classroomId)}/announcements/${encodeURIComponent(announcementId)}`,
    { method: "DELETE" }
  );
}
async function createQuiz(classroomId, quiz) {
  const payload = await fetchJson("/quizzes", {
    method: "POST",
    body: JSON.stringify({ ...quiz, classroom: classroomId })
  });
  return normalizeBackendQuiz(payload.quiz);
}
async function updateQuiz(quizId, quiz) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}`, {
    method: "PUT",
    body: JSON.stringify(quiz)
  });
  return normalizeBackendQuiz(payload.quiz);
}
async function publishQuiz(quizId) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/publish`, { method: "PUT" });
}
async function closeQuiz(quizId) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/close`, { method: "PUT" });
}
async function deleteQuiz(quizId) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}`, { method: "DELETE" });
}
function normalizeBackendQuizAttempt(att) {
  return {
    id: att._id || att.id,
    studentId: String(att.student?._id || att.student || ""),
    studentName: att.studentName || att.student?.fullName || "Student",
    attemptNo: att.attemptNo || 1,
    status: att.status || "submitted",
    startedAt: att.startedAt,
    submittedAt: att.submittedAt,
    totalTimeTakenSec: att.totalTimeTakenSec || 0,
    answers: Array.isArray(att.answers) ? att.answers.map((ans) => ({
      questionId: String(ans.questionId),
      selectedOptions: ans.selectedOptions || [],
      isCorrect: !!ans.isCorrect,
      marksAwarded: ans.marksAwarded ?? 0
    })) : [],
    score: {
      rawMarks: att.score?.rawMarks ?? 0,
      totalMarks: att.score?.totalMarks ?? 0,
      percentage: Math.round(att.score?.percentage ?? 0),
      passed: !!att.score?.passed
    }
  };
}
function normalizeApiQuizQuestion(q) {
  return {
    id: q._id || q.id,
    type: q.type || "mcq",
    text: q.text || "",
    marks: q.marks || 1,
    explanation: q.explanation || "",
    order: q.order || 0,
    options: Array.isArray(q.options) ? q.options.map((o) => ({ label: o.label, text: o.text, isCorrect: !!o.isCorrect })) : []
  };
}
async function startQuizAttempt(quizId) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/start`, { method: "POST" });
  return {
    attemptId: String(payload.attempt._id || payload.attempt.id),
    startedAt: payload.attempt.startedAt,
    attemptNo: payload.attempt.attemptNo,
    duration: payload.attempt.duration,
    questions: Array.isArray(payload.questions) ? payload.questions.map(normalizeApiQuizQuestion) : []
  };
}
async function saveQuizAnswer(quizId, data) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/answer`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}
async function submitQuizAttempt(quizId, attemptId) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/submit`, {
    method: "POST",
    body: JSON.stringify({ attemptId })
  });
  return {
    score: {
      rawMarks: payload.score?.rawMarks ?? 0,
      totalMarks: payload.score?.totalMarks ?? 0,
      percentage: Math.round(payload.score?.percentage ?? 0),
      passed: !!payload.score?.passed
    }
  };
}
async function getQuizAttemptResult(quizId, attemptId) {
  const query = attemptId ? `?attemptId=${encodeURIComponent(attemptId)}` : "";
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/my-result${query}`);
  return {
    score: {
      rawMarks: payload.score?.rawMarks ?? 0,
      totalMarks: payload.score?.totalMarks ?? 0,
      percentage: Math.round(payload.score?.percentage ?? 0),
      passed: !!payload.score?.passed
    },
    submittedAt: payload.submittedAt,
    answers: Array.isArray(payload.answers) ? payload.answers.map((ans) => ({
      questionId: String(ans.questionId),
      selectedOptions: ans.selectedOptions || [],
      isCorrect: !!ans.isCorrect,
      marksAwarded: ans.marksAwarded ?? 0,
      questionText: ans.questionText || "",
      explanation: ans.explanation || "",
      correctOptions: ans.correctOptions || []
    })) : []
  };
}
async function getQuizReport(quizId) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/report`);
  return Array.isArray(payload.attempts) ? payload.attempts.map(normalizeBackendQuizAttempt) : [];
}
const MULTIPART_CHUNK_SIZE = 50 * 1024 * 1024;
async function uploadPartToR2(presignedUrl, chunk, partNumber, onPartBytes) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onPartBytes) onPartBytes(e.loaded);
    });
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader("ETag") || xhr.getResponseHeader("etag") || xhr.getResponseHeader("Etag") || "";
        if (!etag) {
          reject(
            new Error(
              `Part ${partNumber} uploaded but ETag header is missing. Add "ETag" to Access-Control-Expose-Headers in your R2 bucket CORS policy.`
            )
          );
          return;
        }
        resolve(etag);
      } else {
        reject(new Error(`Part ${partNumber} upload failed: HTTP ${xhr.status}`));
      }
    });
    xhr.addEventListener(
      "error",
      () => reject(new Error(`Network error while uploading part ${partNumber}`))
    );
    xhr.addEventListener(
      "abort",
      () => reject(new Error(`Upload aborted on part ${partNumber}`))
    );
    xhr.send(chunk);
  });
}
async function uploadClassroomRecordingToCloudflare({
  file,
  classroom,
  title,
  description = "",
  duration = 0,
  isPublished = false,
  chapters = [],
  onProgress
}) {
  const authHeaders = getDevAuthUserHeaders();
  const accessToken = classroomStore.getState().accessToken;
  const baseHeaders = {
    "Content-Type": "application/json",
    ...accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    ...authHeaders
  };
  const reportProgress = (loaded, total, part, totalParts2) => {
    onProgress?.({
      loaded,
      total,
      percentage: total > 0 ? Math.min(100, Math.round(loaded / total * 100)) : 0,
      ...part != null ? { part, totalParts: totalParts2 } : {}
    });
  };
  const fileMB = (file.size / (1024 * 1024)).toFixed(1);
  if (file.size < MULTIPART_CHUNK_SIZE) {
    console.log(`[Upload] PATH A — single PUT | ${file.name} | ${fileMB} MB (below 50 MB threshold)`);
    const presignRes = await fetch(`${API_BASE}/recordings/classroom/presigned-url`, {
      method: "POST",
      credentials: "include",
      headers: baseHeaders,
      body: JSON.stringify({ classroom, filename: file.name, contentType: file.type || "video/mp4" })
    });
    const presignData = await presignRes.json().catch(() => ({}));
    if (!presignRes.ok) {
      if (presignRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
      throw new Error(presignData.message || "Failed to get upload URL");
    }
    const { uploadUrl, objectKey: objectKey2, publicUrl: publicUrl2 } = presignData;
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", uploadUrl, true);
      xhr.setRequestHeader("Content-Type", file.type || "video/mp4");
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) reportProgress(e.loaded, e.total);
      });
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          reportProgress(file.size, file.size);
          resolve();
        } else {
          reject(new Error(`R2 upload failed: HTTP ${xhr.status}`));
        }
      });
      xhr.addEventListener("error", () => reject(new Error("Network error during upload")));
      xhr.addEventListener("abort", () => reject(new Error("Upload was cancelled")));
      xhr.send(file);
    });
    const saveRes2 = await fetch(`${API_BASE}/recordings/classroom/save-recording`, {
      method: "POST",
      credentials: "include",
      headers: baseHeaders,
      body: JSON.stringify({ classroom, title, description, duration, isPublished, objectKey: objectKey2, publicUrl: publicUrl2, chapters })
    });
    const saveData2 = await saveRes2.json().catch(() => ({}));
    if (!saveRes2.ok) {
      if (saveRes2.status === 401) classroomStore.setState(() => ({ currentUser: null }));
      throw new Error(saveData2.message || "Failed to save recording metadata");
    }
    return saveData2;
  }
  const totalParts = Math.ceil(file.size / MULTIPART_CHUNK_SIZE);
  console.log(`[Upload] PATH B — multipart | ${file.name} | ${fileMB} MB | ${totalParts} parts × 50 MB`);
  const initiateRes = await fetch(`${API_BASE}/recordings/classroom/multipart/initiate`, {
    method: "POST",
    credentials: "include",
    headers: baseHeaders,
    body: JSON.stringify({ classroom, filename: file.name, contentType: file.type || "video/mp4" })
  });
  const initiateData = await initiateRes.json().catch(() => ({}));
  if (!initiateRes.ok) {
    if (initiateRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
    throw new Error(initiateData.message || "Failed to initiate multipart upload");
  }
  const { uploadId, objectKey, publicUrl } = initiateData;
  const partBytesLoaded = new Array(totalParts).fill(0);
  const completedParts = [];
  try {
    for (let i = 0; i < totalParts; i++) {
      const partNumber = i + 1;
      const start = i * MULTIPART_CHUNK_SIZE;
      const end = Math.min(start + MULTIPART_CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      console.log(`[Upload] Starting part ${partNumber}/${totalParts} — ${(chunk.size / 1024 / 1024).toFixed(1)} MB`);
      const partUrlRes = await fetch(`${API_BASE}/recordings/classroom/multipart/presign-part`, {
        method: "POST",
        credentials: "include",
        headers: baseHeaders,
        body: JSON.stringify({ objectKey, uploadId, partNumber })
      });
      const partUrlData = await partUrlRes.json().catch(() => ({}));
      if (!partUrlRes.ok) {
        throw new Error(partUrlData.message || `Failed to get presigned URL for part ${partNumber}`);
      }
      const { presignedUrl } = partUrlData;
      const etag = await uploadPartToR2(presignedUrl, chunk, partNumber, (loaded) => {
        partBytesLoaded[i] = loaded;
        const totalLoaded2 = partBytesLoaded.reduce((acc, b) => acc + b, 0);
        reportProgress(totalLoaded2, file.size, partNumber, totalParts);
      });
      partBytesLoaded[i] = chunk.size;
      completedParts.push({ PartNumber: partNumber, ETag: etag });
      console.log(`[Upload] Part ${partNumber}/${totalParts} done ✓  ETag: ${etag}`);
      const totalLoaded = partBytesLoaded.reduce((acc, b) => acc + b, 0);
      reportProgress(totalLoaded, file.size, partNumber, totalParts);
    }
  } catch (uploadError) {
    fetch(`${API_BASE}/recordings/classroom/multipart/abort`, {
      method: "POST",
      credentials: "include",
      headers: baseHeaders,
      body: JSON.stringify({ objectKey, uploadId })
    }).catch(() => {
    });
    throw uploadError;
  }
  const completeRes = await fetch(`${API_BASE}/recordings/classroom/multipart/complete`, {
    method: "POST",
    credentials: "include",
    headers: baseHeaders,
    body: JSON.stringify({ objectKey, uploadId, parts: completedParts })
  });
  const completeData = await completeRes.json().catch(() => ({}));
  if (!completeRes.ok) {
    throw new Error(completeData.message || "Failed to complete multipart upload on R2");
  }
  reportProgress(file.size, file.size);
  const saveRes = await fetch(`${API_BASE}/recordings/classroom/save-recording`, {
    method: "POST",
    credentials: "include",
    headers: baseHeaders,
    body: JSON.stringify({
      classroom,
      title,
      description,
      duration,
      isPublished,
      objectKey,
      publicUrl,
      chapters
    })
  });
  const saveData = await saveRes.json().catch(() => ({}));
  if (!saveRes.ok) {
    if (saveRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
    throw new Error(saveData.message || "Failed to save recording metadata");
  }
  return saveData;
}
async function addStudentsToClassroom(classroomId, studentIds) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/add`, {
    method: "POST",
    body: JSON.stringify({ studentIds })
  });
  return payload;
}
async function updateClassroomStudentStatus(classroomId, studentId, status) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/${encodeURIComponent(studentId)}/status`, {
    method: "PUT",
    body: JSON.stringify({ status })
  });
  return payload;
}
async function updateStudentCertificate(classroomId, studentId, certificateUrl) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/${encodeURIComponent(studentId)}/certificate`, {
    method: "PUT",
    body: JSON.stringify({ certificateUrl })
  });
  return payload;
}
async function createClassroom(payload) {
  const result = await fetchJson("/classrooms", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return normalizeBackendClassroom(result.classroom);
}
async function getMyClassrooms() {
  const payload = await fetchJson("/classrooms/my");
  return payload.classrooms.map(normalizeBackendClassroom);
}
async function getMyMeetings() {
  return fetchJson("/meetings/my");
}
async function createMeeting(payload) {
  return fetchJson("/meetings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function startMeeting(meetingId) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}/start`, {
    method: "POST"
  });
}
async function endMeeting(meetingId) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}/end`, {
    method: "POST"
  });
}
async function deleteMeeting(meetingId) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}`, {
    method: "DELETE"
  });
}
async function getClassroomMeetings(classroomIdentifier) {
  return fetchJson(`/meetings/classroom/${encodeURIComponent(classroomIdentifier)}`);
}
async function getMyNotifications(limit = 10) {
  const payload = await fetchJson(`/notifications?limit=${encodeURIComponent(String(limit))}`);
  return payload.notifications;
}
function getRecordingStreamUrl(recordingId) {
  return `${API_BASE}/recordings/classroom/${recordingId}/stream`;
}
async function trackRecordingProgress(recordingId, data) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}/progress`, {
    method: "POST",
    body: JSON.stringify(data)
  });
}
function getAssetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrl = API_BASE.replace(/\/api\/v1$/, "");
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
async function publishRecording(recordingId) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}/publish`, {
    method: "PUT"
  });
}
async function unpublishRecording(recordingId) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}`, {
    method: "PUT",
    body: JSON.stringify({ isPublished: false })
  });
}
async function deleteRecording(recordingId) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}`, {
    method: "DELETE"
  });
}
async function reuseClassroomRecording(payload) {
  return fetchJson("/recordings/classroom/reuse", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
async function getDetailedProgress(classroomId) {
  const payload = await fetchJson(`/enrollments/classroom/${encodeURIComponent(classroomId)}/progress`);
  return payload.stats;
}
async function logoutUser() {
  return fetchJson("/auth/logout", { method: "POST" });
}
function normalizeBackendProgram(raw) {
  const status = raw.status === "archived" ? "archived" : raw.isPublished || raw.status === "published" ? "published" : "draft";
  return {
    id: String(raw._id || raw.id),
    title: raw.title || "",
    category: raw.category || "Other",
    description: raw.description || raw.shortDesc || "",
    price: raw.fee?.baseAmount ?? 0,
    status,
    updatedAt: raw.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
    specialty: raw.specialty,
    duration: raw.duration,
    rating: raw.rating,
    image: raw.image
  };
}
async function getAdminPrograms() {
  const payload = await fetchJson("/programs/admin-all");
  return payload.programs.map(normalizeBackendProgram);
}
async function getPublicPrograms() {
  const payload = await fetchJson("/programs");
  return payload.programs.map(normalizeBackendProgram);
}
async function createAdminProgram(data, imageFile) {
  const fd = new FormData();
  fd.append("title", data.title);
  fd.append("category", data.category);
  fd.append("status", data.status);
  if (data.description) fd.append("description", data.description);
  if (data.specialty) fd.append("specialty", data.specialty);
  if (data.duration) fd.append("duration", data.duration);
  if (data.rating) fd.append("rating", String(data.rating));
  fd.append("fee", JSON.stringify({ baseAmount: data.price, gstPercent: 18 }));
  if (imageFile) {
    fd.append("image", imageFile);
  }
  const payload = await api.multipart("/programs", "POST", fd);
  return normalizeBackendProgram(payload.program);
}
async function updateAdminProgram(id, data, imageFile, removeImage) {
  const fd = new FormData();
  if (data.title !== void 0) fd.append("title", data.title);
  if (data.category !== void 0) fd.append("category", data.category);
  if (data.status !== void 0) fd.append("status", data.status);
  if (data.description !== void 0) fd.append("description", data.description);
  if (data.specialty !== void 0) fd.append("specialty", data.specialty);
  if (data.duration !== void 0) fd.append("duration", data.duration);
  if (data.rating !== void 0) fd.append("rating", String(data.rating));
  if (data.price !== void 0) {
    fd.append("fee", JSON.stringify({ baseAmount: data.price, gstPercent: 18 }));
  }
  if (imageFile) {
    fd.append("image", imageFile);
  } else if (removeImage) {
    fd.append("removeImage", "true");
  }
  const payload = await api.multipart(`/programs/${encodeURIComponent(id)}`, "PUT", fd);
  return normalizeBackendProgram(payload.program);
}
async function deleteAdminProgram(id) {
  return fetchJson(`/programs/${encodeURIComponent(id)}`, { method: "DELETE" });
}
const api = {
  get: (path) => fetchJson(path, { method: "GET" }),
  post: (path, body) => fetchJson(path, { method: "POST", body: body ? JSON.stringify(body) : void 0 }),
  put: (path, body) => fetchJson(path, { method: "PUT", body: body ? JSON.stringify(body) : void 0 }),
  delete: (path) => fetchJson(path, { method: "DELETE" }),
  multipart: async (path, method, formData) => {
    const accessToken = classroomStore.getState().accessToken;
    const headers = {
      ...accessToken ? { "Authorization": `Bearer ${accessToken}` } : {},
      ...getDevAuthUserHeaders()
    };
    const response = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: "include",
      headers,
      body: formData
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 401 && path !== "/auth/login" && path !== "/auth/me") {
        classroomStore.setState(() => ({ currentUser: null }));
      }
      throw new Error(payload.message || "Server error");
    }
    return payload;
  }
};
async function joinMeetingByRoomId(roomId) {
  const payload = await fetchJson(`/meetings/room/${encodeURIComponent(roomId)}/join`, {
    method: "POST"
  });
  return payload.meeting;
}
async function heartbeatMeetingByRoomId(roomId) {
  return fetchJson(`/meetings/room/${encodeURIComponent(roomId)}/heartbeat`, {
    method: "POST"
  });
}
async function leaveMeetingByRoomId(roomId) {
  return fetchJson(`/meetings/room/${encodeURIComponent(roomId)}/leave`, {
    method: "POST"
  });
}
async function getClassStudents(classId) {
  return fetchJson(`/classes/${encodeURIComponent(classId)}/students`);
}
async function getClassAttendance(classId, date, subject, meetingId) {
  const params = new URLSearchParams();
  if (date) params.append("date", date);
  if (subject) params.append("subject", subject);
  if (meetingId) params.append("meetingId", meetingId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return fetchJson(`/attendance/class/${encodeURIComponent(classId)}${query}`);
}
async function saveAttendance(data) {
  return fetchJson("/attendance", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
async function getStudentAttendanceDetails(studentId) {
  return fetchJson(`/attendance/student/${encodeURIComponent(studentId)}`);
}
async function getClassAttendanceReport(classId) {
  return fetchJson(`/attendance/report/class/${encodeURIComponent(classId)}`);
}
async function getChatUsers() {
  const payload = await fetchJson("/messages/users");
  return payload.data;
}
async function getConversation(userId) {
  const payload = await fetchJson(`/messages/conversation/${encodeURIComponent(userId)}`);
  return payload.data;
}
async function sendMessage(receiverId, message) {
  const payload = await fetchJson("/messages/send", {
    method: "POST",
    body: JSON.stringify({ receiverId, message })
  });
  return payload.data;
}
const appCss = "/assets/styles-DOl_4QAN.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-display font-bold text-plum-dark", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream hover:bg-plum",
        children: "Back home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try again or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-5 py-2.5 text-sm font-semibold", children: "Go home" })
    ] })
  ] }) });
}
const Route$D = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Axon Academy — Train. Certify. Get Placed." },
      { name: "description", content: "India's #1 paramedical training academy. Live classes, proctored exams, blockchain certificates, 95% placement rate across 200+ partner hospitals." },
      { property: "og:title", content: "Axon Academy" },
      { property: "og:description", content: "Train. Certify. Get placed in leading hospitals." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$D.useRouteContext();
  const [authReady, setAuthReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    Promise.all([
      getCurrentUser(),
      getClassrooms().catch(() => [])
      // if not logged in, this might fail, default to empty
    ]).then(([payload, classrooms]) => {
      const backendUser = payload.user;
      const accessToken = payload.accessToken || null;
      const role = backendUser.role === "student" ? "student" : backendUser.role;
      const currentUser = {
        id: backendUser._id,
        name: backendUser.fullName || backendUser.email,
        email: backendUser.email,
        phone: backendUser.phone,
        role
      };
      classroomStore.setState(() => ({ currentUser, accessToken, classrooms }));
    }).catch(() => {
      classroomStore.setState(() => ({ currentUser: null, accessToken: null }));
    }).finally(() => {
      setAuthReady(true);
    });
  }, []);
  if (!authReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#faf9f7" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 32, height: 32, border: "3px solid #e5e7eb", borderTopColor: "#4c1d95", borderRadius: "50%", animation: "spin 0.7s linear infinite" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes spin { to { transform: rotate(360deg); } }` })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$C = () => import("./placements-DqPbBW7-.mjs");
const Route$C = createFileRoute("/placements")({
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import("./login-fhHUmo-a.mjs");
const Route$B = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./enroll-DK-G2yuh.mjs");
const Route$A = createFileRoute("/enroll")({
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./courses-vdjO0e3z.mjs");
const Route$z = createFileRoute("/courses")({
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./contact-DTSm5sOx.mjs");
const Route$y = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./blog-CNCoV8s3.mjs");
const Route$x = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./about-DJ2MOR0r.mjs");
const Route$w = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("../_student-DmhsAlmx.mjs");
const Route$v = createFileRoute("/_student")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("../_admin-C3QYpp-0.mjs");
const Route$u = createFileRoute("/_admin")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./index-CoDmnqRG.mjs");
const Route$t = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./live._roomId-CyEXakXt.mjs");
const Route$s = createFileRoute("/live/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("../_student.student.schedule-smpJe6mv.mjs");
const Route$r = createFileRoute("/_student/student/schedule")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("../_student.student.profile-DFqVLM1J.mjs");
const Route$q = createFileRoute("/_student/student/profile")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("../_student.student.messages-DgAMvvIY.mjs");
const Route$p = createFileRoute("/_student/student/messages")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("../_student.student.live-BfyYiO33.mjs");
const Route$o = createFileRoute("/_student/student/live")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("../_student.student.exams-CFTeoNdy.mjs");
const Route$n = createFileRoute("/_student/student/exams")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_student.student.dashboard-DK0LY22V.mjs");
const Route$m = createFileRoute("/_student/student/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("../_student.student.certificates-BYPHeNJn.mjs");
const Route$l = createFileRoute("/_student/student/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("../_admin.admin.students-BnZGlhpq.mjs");
const Route$k = createFileRoute("/_admin/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("../_admin.admin.settings-o_Ur2Wbp.mjs");
const Route$j = createFileRoute("/_admin/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("../_admin.admin.placements-CrW2l2mF.mjs");
const Route$i = createFileRoute("/_admin/admin/placements")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("../_admin.admin.messages-B-_wR1kl.mjs");
const Route$h = createFileRoute("/_admin/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("../_admin.admin.finance-Pt3wnAJ1.mjs");
const Route$g = createFileRoute("/_admin/admin/finance")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("../_admin.admin.faculty-Bae0Qrgh.mjs");
const Route$f = createFileRoute("/_admin/admin/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("../_admin.admin.exams-BImQROIG.mjs");
const Route$e = createFileRoute("/_admin/admin/exams")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("../_admin.admin.dashboard-B702h53g.mjs");
const Route$d = createFileRoute("/_admin/admin/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("../_admin.admin.courses-8mfyTGFt.mjs");
const Route$c = createFileRoute("/_admin/admin/courses")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_admin.admin.certificates-DEglGPqJ.mjs");
const Route$b = createFileRoute("/_admin/admin/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("../_admin.admin.analytics-D6Qpe5Em.mjs");
const Route$a = createFileRoute("/_admin/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_student.student.my-courses.index-Ck4pMatf.mjs");
const Route$9 = createFileRoute("/_student/student/my-courses/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_student.student.classrooms.index-Du5gWn5g.mjs");
const Route$8 = createFileRoute("/_student/student/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_admin.admin.classrooms.index-BEOWQDGN.mjs");
const Route$7 = createFileRoute("/_admin/admin/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_admin.admin.classes.index-BL4pcOvt.mjs");
const Route$6 = createFileRoute("/_admin/admin/classes/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_student.student.webex._roomId-DwmZJz__.mjs");
const Route$5 = createFileRoute("/_student/student/webex/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_student.student.course._id-BkdN-ZrI.mjs");
const Route$4 = createFileRoute("/_student/student/course/$id")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_student.student.classroom._id-Ml92Y-Ig.mjs");
const Route$3 = createFileRoute("/_student/student/classroom/$id")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_admin.admin.classrooms._id-CCtagOD1.mjs");
const Route$2 = createFileRoute("/_admin/admin/classrooms/$id")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_admin.admin.classes._classId.students-DG0Lfmgk.mjs");
const Route$1 = createFileRoute("/_admin/admin/classes/$classId/students")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_admin.admin.classes._classId.attendance-CAH3LVr8.mjs");
const Route = createFileRoute("/_admin/admin/classes/$classId/attendance")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PlacementsRoute = Route$C.update({
  id: "/placements",
  path: "/placements",
  getParentRoute: () => Route$D
});
const LoginRoute = Route$B.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$D
});
const EnrollRoute = Route$A.update({
  id: "/enroll",
  path: "/enroll",
  getParentRoute: () => Route$D
});
const CoursesRoute = Route$z.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$D
});
const ContactRoute = Route$y.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$D
});
const BlogRoute = Route$x.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$D
});
const AboutRoute = Route$w.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$D
});
const StudentRoute = Route$v.update({
  id: "/_student",
  getParentRoute: () => Route$D
});
const AdminRoute = Route$u.update({
  id: "/_admin",
  getParentRoute: () => Route$D
});
const IndexRoute = Route$t.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$D
});
const LiveRoomIdRoute = Route$s.update({
  id: "/live/$roomId",
  path: "/live/$roomId",
  getParentRoute: () => Route$D
});
const StudentStudentScheduleRoute = Route$r.update({
  id: "/student/schedule",
  path: "/student/schedule",
  getParentRoute: () => StudentRoute
});
const StudentStudentProfileRoute = Route$q.update({
  id: "/student/profile",
  path: "/student/profile",
  getParentRoute: () => StudentRoute
});
const StudentStudentMessagesRoute = Route$p.update({
  id: "/student/messages",
  path: "/student/messages",
  getParentRoute: () => StudentRoute
});
const StudentStudentLiveRoute = Route$o.update({
  id: "/student/live",
  path: "/student/live",
  getParentRoute: () => StudentRoute
});
const StudentStudentExamsRoute = Route$n.update({
  id: "/student/exams",
  path: "/student/exams",
  getParentRoute: () => StudentRoute
});
const StudentStudentDashboardRoute = Route$m.update({
  id: "/student/dashboard",
  path: "/student/dashboard",
  getParentRoute: () => StudentRoute
});
const StudentStudentCertificatesRoute = Route$l.update({
  id: "/student/certificates",
  path: "/student/certificates",
  getParentRoute: () => StudentRoute
});
const AdminAdminStudentsRoute = Route$k.update({
  id: "/admin/students",
  path: "/admin/students",
  getParentRoute: () => AdminRoute
});
const AdminAdminSettingsRoute = Route$j.update({
  id: "/admin/settings",
  path: "/admin/settings",
  getParentRoute: () => AdminRoute
});
const AdminAdminPlacementsRoute = Route$i.update({
  id: "/admin/placements",
  path: "/admin/placements",
  getParentRoute: () => AdminRoute
});
const AdminAdminMessagesRoute = Route$h.update({
  id: "/admin/messages",
  path: "/admin/messages",
  getParentRoute: () => AdminRoute
});
const AdminAdminFinanceRoute = Route$g.update({
  id: "/admin/finance",
  path: "/admin/finance",
  getParentRoute: () => AdminRoute
});
const AdminAdminFacultyRoute = Route$f.update({
  id: "/admin/faculty",
  path: "/admin/faculty",
  getParentRoute: () => AdminRoute
});
const AdminAdminExamsRoute = Route$e.update({
  id: "/admin/exams",
  path: "/admin/exams",
  getParentRoute: () => AdminRoute
});
const AdminAdminDashboardRoute = Route$d.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminAdminCoursesRoute = Route$c.update({
  id: "/admin/courses",
  path: "/admin/courses",
  getParentRoute: () => AdminRoute
});
const AdminAdminCertificatesRoute = Route$b.update({
  id: "/admin/certificates",
  path: "/admin/certificates",
  getParentRoute: () => AdminRoute
});
const AdminAdminAnalyticsRoute = Route$a.update({
  id: "/admin/analytics",
  path: "/admin/analytics",
  getParentRoute: () => AdminRoute
});
const StudentStudentMyCoursesIndexRoute = Route$9.update({
  id: "/student/my-courses/",
  path: "/student/my-courses/",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomsIndexRoute = Route$8.update({
  id: "/student/classrooms/",
  path: "/student/classrooms/",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIndexRoute = Route$7.update({
  id: "/admin/classrooms/",
  path: "/admin/classrooms/",
  getParentRoute: () => AdminRoute
});
const AdminAdminClassesIndexRoute = Route$6.update({
  id: "/admin/classes/",
  path: "/admin/classes/",
  getParentRoute: () => AdminRoute
});
const StudentStudentWebexRoomIdRoute = Route$5.update({
  id: "/student/webex/$roomId",
  path: "/student/webex/$roomId",
  getParentRoute: () => StudentRoute
});
const StudentStudentCourseIdRoute = Route$4.update({
  id: "/student/course/$id",
  path: "/student/course/$id",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomIdRoute = Route$3.update({
  id: "/student/classroom/$id",
  path: "/student/classroom/$id",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIdRoute = Route$2.update({
  id: "/admin/classrooms/$id",
  path: "/admin/classrooms/$id",
  getParentRoute: () => AdminRoute
});
const AdminAdminClassesClassIdStudentsRoute = Route$1.update({
  id: "/admin/classes/$classId/students",
  path: "/admin/classes/$classId/students",
  getParentRoute: () => AdminRoute
});
const AdminAdminClassesClassIdAttendanceRoute = Route.update({
  id: "/admin/classes/$classId/attendance",
  path: "/admin/classes/$classId/attendance",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAdminAnalyticsRoute,
  AdminAdminCertificatesRoute,
  AdminAdminCoursesRoute,
  AdminAdminDashboardRoute,
  AdminAdminExamsRoute,
  AdminAdminFacultyRoute,
  AdminAdminFinanceRoute,
  AdminAdminMessagesRoute,
  AdminAdminPlacementsRoute,
  AdminAdminSettingsRoute,
  AdminAdminStudentsRoute,
  AdminAdminClassroomsIdRoute,
  AdminAdminClassesIndexRoute,
  AdminAdminClassroomsIndexRoute,
  AdminAdminClassesClassIdAttendanceRoute,
  AdminAdminClassesClassIdStudentsRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const StudentRouteChildren = {
  StudentStudentCertificatesRoute,
  StudentStudentDashboardRoute,
  StudentStudentExamsRoute,
  StudentStudentLiveRoute,
  StudentStudentMessagesRoute,
  StudentStudentProfileRoute,
  StudentStudentScheduleRoute,
  StudentStudentClassroomIdRoute,
  StudentStudentCourseIdRoute,
  StudentStudentWebexRoomIdRoute,
  StudentStudentClassroomsIndexRoute,
  StudentStudentMyCoursesIndexRoute
};
const StudentRouteWithChildren = StudentRoute._addFileChildren(StudentRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  StudentRoute: StudentRouteWithChildren,
  AboutRoute,
  BlogRoute,
  ContactRoute,
  CoursesRoute,
  EnrollRoute,
  LoginRoute,
  PlacementsRoute,
  LiveRoomIdRoute
};
const routeTree = Route$D._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  leaveMeetingByRoomId as $,
  formatTime as A,
  getAdminPrograms as B,
  getAdminUsers as C,
  getAssetUrl as D,
  getChatUsers as E,
  getClassAttendance as F,
  getClassAttendanceReport as G,
  getClassStudents as H,
  getClassroomById as I,
  getClassroomMeetings as J,
  getClassrooms as K,
  getConversation as L,
  getDetailedProgress as M,
  getExamType as N,
  getGrade as O,
  getMyClassrooms as P,
  getMyMeetings as Q,
  Route$s as R,
  getMyNotifications as S,
  getPublicPrograms as T,
  getQuizAttemptResult as U,
  getQuizReport as V,
  getRecordingStreamUrl as W,
  getStudentAttendanceDetails as X,
  heartbeatMeetingByRoomId as Y,
  isClassroomStale as Z,
  joinMeetingByRoomId as _,
  Route$5 as a,
  loginUser as a0,
  logoutUser as a1,
  markClassroomFresh as a2,
  messageActions as a3,
  publishQuiz as a4,
  publishRecording as a5,
  reuseClassroomRecording as a6,
  router as a7,
  saveAttendance as a8,
  saveQuizAnswer as a9,
  sendMessage as aa,
  startMeeting as ab,
  startQuizAttempt as ac,
  submitQuizAttempt as ad,
  trackRecordingProgress as ae,
  uid as af,
  unpublishRecording as ag,
  updateAdminProgram as ah,
  updateClassroomStudentStatus as ai,
  updateQuiz as aj,
  updateStudentCertificate as ak,
  uploadClassroomRecordingToCloudflare as al,
  useClassroomStore as am,
  Route$4 as b,
  Route$3 as c,
  Route$2 as d,
  Route$1 as e,
  Route as f,
  addStudentsToClassroom as g,
  adminActions as h,
  api as i,
  classroomActions as j,
  classroomStore as k,
  closeQuiz as l,
  computeCertificates as m,
  createAdminProgram as n,
  createAdminUser as o,
  createClassroom as p,
  createClassroomAnnouncement as q,
  createMeeting as r,
  createQuiz as s,
  deleteAdminProgram as t,
  deleteClassroomAnnouncement as u,
  deleteMeeting as v,
  deleteQuiz as w,
  deleteRecording as x,
  endMeeting as y,
  formatDuration as z
};
