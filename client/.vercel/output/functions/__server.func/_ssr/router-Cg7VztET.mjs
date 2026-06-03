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
const in2h = new Date(now.getTime() + 2 * 60 * 60 * 1e3).toISOString();
const in3d = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1e3).toISOString();
const in1h = new Date(now.getTime() + 1 * 60 * 60 * 1e3).toISOString();
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
const INITIAL_CLASSROOMS = [
  {
    id: "cls-001",
    name: "ICU Critical Care — Batch 24A",
    description: "Comprehensive critical care nursing program covering advanced patient monitoring, ventilator management, and emergency protocols.",
    code: "CLS-ICU-24A",
    status: "active",
    maxStudents: 40,
    program: "ICU Critical Care",
    createdAt: "2026-01-15T08:00:00Z",
    students: [
      { id: "Ajay", name: "Ajay Kumar", email: "ajay@ex.com", enrollmentId: "MCA-2024-AJAY", progress: 72, attendance: 85, quizAvg: 78, status: "active", addedAt: "2026-01-16T08:00:00Z" }
    ],
    announcements: [
      { id: "ann-001", content: "📌 Module 1 recordings are now available. Please complete them before the next live class.", createdAt: "2026-05-27T09:00:00Z", author: "Admin" },
      { id: "ann-002", content: "🎯 Module 2 Assessment opens on June 1st. Review all ventilator setups.", createdAt: "2026-05-25T10:00:00Z", author: "Admin" }
    ],
    meetings: [
      { id: "meet-001", title: "ICU Monitoring — Live Q&A", description: "Interactive session covering ventilator parameters and alarm management.", scheduledAt: in2h, duration: 90, status: "scheduled", attendees: [], roomId: "room-001" },
      { id: "meet-001b", title: "Haemodynamics Deep Dive", description: "Arterial lines and central venous pressure.", scheduledAt: in1h, duration: 60, status: "live", attendees: ["Ajay"], roomId: "room-001b" },
      { id: "meet-002", title: "Haemodynamic Monitoring", description: "Deep dive into arterial lines.", scheduledAt: "2026-05-22T14:00:00Z", duration: 60, status: "ended", attendees: ["Ajay"], roomId: "room-002" }
    ],
    recordings: [
      { id: "rec-001", title: "Module 1: ICU Orientation", description: "Introduction to ICU environment, equipment and roles.", duration: 3240, isPublished: true, uploadedAt: "2026-05-01T08:00:00Z", chapters: [{ id: "ch-001", title: "ICU Environment", startTimeSec: 0 }, { id: "ch-002", title: "Key Equipment", startTimeSec: 900 }], viewStats: [{ studentId: "Ajay", studentName: "Ajay Kumar", watchedPercent: 100, lastPosition: 3240 }] },
      { id: "rec-002", title: "Module 2: Ventilators", description: "Ventilator modes, settings, and alarm management.", duration: 4500, isPublished: true, uploadedAt: "2026-05-10T08:00:00Z", chapters: [{ id: "ch-003", title: "Vent Modes", startTimeSec: 0 }, { id: "ch-004", title: "Alarm Settings", startTimeSec: 1800 }], viewStats: [{ studentId: "Ajay", studentName: "Ajay Kumar", watchedPercent: 80, lastPosition: 3600 }] },
      { id: "rec-003", title: "Module 3: Arterial Lines", description: "Invasive haemodynamic monitoring and arterial lines.", duration: 3600, isPublished: false, uploadedAt: "2026-05-20T08:00:00Z", chapters: [], viewStats: [] }
    ],
    quizzes: [
      {
        id: "quiz-001",
        title: "Module 1 Assessment — ICU Basics",
        instructions: "Answer all questions. You have 30 minutes. No negative marking.",
        duration: 30,
        maxAttempts: 2,
        randomizeQuestions: true,
        randomizeOptions: true,
        showLeaderboard: true,
        negativeMarking: false,
        negativeMarkValue: 0,
        passPercent: 60,
        availableFrom: "2026-05-01T00:00:00Z",
        availableUntil: "2026-06-30T23:59:59Z",
        status: "published",
        questions: [
          { id: "q-001", type: "mcq", text: "What is the normal SpO₂ range for a healthy adult?", marks: 2, explanation: "Normal SpO₂ is 95–100%.", order: 1, options: [{ label: "A", text: "85–90%", isCorrect: false }, { label: "B", text: "90–94%", isCorrect: false }, { label: "C", text: "95–100%", isCorrect: true }, { label: "D", text: "100–105%", isCorrect: false }] },
          { id: "q-002", type: "mcq", text: "Which parameter does PEEP directly affect?", marks: 2, explanation: "PEEP (Positive End-Expiratory Pressure) maintains functional residual capacity.", order: 2, options: [{ label: "A", text: "Heart rate", isCorrect: false }, { label: "B", text: "Functional residual capacity", isCorrect: true }, { label: "C", text: "Blood glucose", isCorrect: false }, { label: "D", text: "Renal output", isCorrect: false }] },
          { id: "q-003", type: "true_false", text: "Vasopressors are typically administered via a peripheral IV line in ICU.", marks: 1, explanation: "False — vasopressors require a central line because they can cause tissue necrosis if extravasated.", order: 3, options: [{ label: "True", text: "True", isCorrect: false }, { label: "False", text: "False", isCorrect: true }] }
        ],
        attempts: [
          { id: "att-001", studentId: "Ajay", studentName: "Ajay Kumar", attemptNo: 1, status: "submitted", startedAt: "2026-05-10T10:00:00Z", submittedAt: "2026-05-10T10:28:00Z", answers: [{ questionId: "q-001", selectedOptions: ["C"], isCorrect: true, marksAwarded: 2 }, { questionId: "q-002", selectedOptions: ["B"], isCorrect: true, marksAwarded: 2 }, { questionId: "q-003", selectedOptions: ["False"], isCorrect: true, marksAwarded: 1 }], score: { rawMarks: 5, totalMarks: 5, percentage: 100, passed: true } }
        ]
      }
    ]
  },
  {
    id: "cls-002",
    name: "Staff Nursing Diploma — Batch 24B",
    description: "Foundation nursing skills including patient assessment, medication administration, and clinical documentation.",
    code: "CLS-SND-24B",
    status: "active",
    maxStudents: 60,
    program: "Staff Nursing Diploma",
    createdAt: "2026-01-20T08:00:00Z",
    students: [
      { id: "Navin", name: "Navin Raj", email: "navin@ex.com", enrollmentId: "MCA-2024-NAVIN", progress: 55, attendance: 70, quizAvg: 65, status: "active", addedAt: "2026-01-21T08:00:00Z" }
    ],
    announcements: [
      { id: "ann-003", content: "🎯 Practical assessment scheduled for June 5. Please bring your clinical kit.", createdAt: "2026-05-28T10:00:00Z", author: "Admin" }
    ],
    meetings: [
      { id: "meet-004", title: "Medication Administration", description: "Error prevention strategies and 5 rights of medication.", scheduledAt: in3d, duration: 60, status: "scheduled", attendees: [], roomId: "room-004" },
      { id: "meet-005", title: "Patient Assessment Practical", description: "Head-to-toe assessment technique.", scheduledAt: "2026-05-15T10:00:00Z", duration: 90, status: "ended", attendees: ["Navin"], roomId: "room-005" }
    ],
    recordings: [
      { id: "rec-004", title: "Module 1: Patient Assessment", description: "Systematic head-to-toe physical assessment.", duration: 2700, isPublished: true, uploadedAt: "2026-05-05T08:00:00Z", chapters: [{ id: "ch-005", title: "Head & Neck", startTimeSec: 0 }, { id: "ch-006", title: "Thorax & Abdomen", startTimeSec: 1200 }], viewStats: [{ studentId: "Navin", studentName: "Navin Raj", watchedPercent: 70, lastPosition: 1890 }] },
      { id: "rec-005", title: "Module 2: Medication Administration", description: "Safe medication practices and common errors.", duration: 3e3, isPublished: true, uploadedAt: "2026-05-15T08:00:00Z", chapters: [], viewStats: [{ studentId: "Navin", studentName: "Navin Raj", watchedPercent: 40, lastPosition: 1200 }] }
    ],
    quizzes: [
      {
        id: "quiz-002",
        title: "Module 1 Assessment — Patient Assessment Basics",
        instructions: "Answer all questions. 20 minutes. Pass at 60%.",
        duration: 20,
        maxAttempts: 1,
        randomizeQuestions: false,
        randomizeOptions: false,
        showLeaderboard: false,
        negativeMarking: false,
        negativeMarkValue: 0,
        passPercent: 60,
        availableFrom: "2026-05-10T00:00:00Z",
        availableUntil: "2026-07-30T23:59:59Z",
        status: "published",
        questions: [
          { id: "q-004", type: "mcq", text: "What does HEENT stand for in a head-to-toe assessment?", marks: 2, explanation: "HEENT = Head, Eyes, Ears, Nose, Throat.", order: 1, options: [{ label: "A", text: "Head, Eyes, Ears, Nose, Throat", isCorrect: true }, { label: "B", text: "Heart, Extremities, Ears, Neck, Teeth", isCorrect: false }, { label: "C", text: "Head, Extremities, ENT, Neurological, Thorax", isCorrect: false }, { label: "D", text: "None of the above", isCorrect: false }] },
          { id: "q-005", type: "true_false", text: "Auscultation should be performed before palpation during abdominal assessment.", marks: 1, explanation: "True — palpation can alter bowel sounds, so auscultate first.", order: 2, options: [{ label: "True", text: "True", isCorrect: true }, { label: "False", text: "False", isCorrect: false }] }
        ],
        attempts: []
      }
    ]
  }
];
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
    const ann = { id: `ann-${Date.now()}`, content, createdAt: (/* @__PURE__ */ new Date()).toISOString(), author: "Admin" };
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
    const publishedQuizzes = cls.quizzes.filter((q) => q.status === "published");
    if (publishedQuizzes.length === 0) continue;
    const allPassed = publishedQuizzes.every(
      (q) => q.attempts.some((a) => a.studentId === userId && a.status === "submitted" && a.score.passed)
    );
    if (allPassed) {
      const lastAttempt = publishedQuizzes.flatMap((q) => q.attempts.filter((a) => a.studentId === userId && a.score.passed)).sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime())[0];
      certs.push({
        classroomId: cls.id,
        classroomName: cls.name,
        program: cls.program,
        earnedAt: lastAttempt?.submittedAt || cls.createdAt
      });
    }
  }
  return certs;
}
const getApiBase = () => {
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "http://localhost:5000/api/v1";
    }
    return "https://oc-pro-production.up.railway.app/api/v1";
  }
  const runtimeApiUrl = process.env.VITE_API_URL || process.env.BACKEND_URL;
  return runtimeApiUrl?.trim() || "https://oc-pro-production.up.railway.app/api/v1";
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
      id: String(s.student?._id || s.student || `student-${Date.now()}`),
      name: s.student?.firstName ? `${s.student.firstName} ${s.student.lastName || ""}`.trim() : s.student?.email || "Student",
      email: s.student?.email || "",
      enrollmentId: s.enrollmentId || "",
      progress: 0,
      attendance: 0,
      quizAvg: 0,
      status: s.status || "active",
      addedAt: s.addedAt ? new Date(s.addedAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
    })) : [],
    announcements: [],
    meetings: Array.isArray(raw.meetings) ? raw.meetings.map((m) => ({
      id: m._id || m.id,
      title: m.title,
      description: m.description || "",
      scheduledAt: m.scheduledAt || (/* @__PURE__ */ new Date()).toISOString(),
      duration: m.duration || 60,
      status: normalizeMeetingStatus(m.status),
      attendees: Array.isArray(m.attendees) ? m.attendees.map((a) => String(a.student || a)) : [],
      roomId: m.roomId || ""
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
        studentName: v.student ? `${v.student.firstName || ""} ${v.student.lastName || ""}`.trim() || "Student" : "Student",
        watchedPercent: r.duration > 0 ? Math.round(v.totalWatchedSec / r.duration * 100) : 0
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
        score: att.score || { rawMarks: 0, totalMarks: 0, percentage: 0, passed: false }
      })) : []
    })) : []
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
      studentName: att.studentName || "Student",
      attemptNo: att.attemptNo || 1,
      status: att.status || "submitted",
      startedAt: att.startedAt,
      submittedAt: att.submittedAt,
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
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
    email: user.email || "",
    phone: user.phone || "",
    role: user.role,
    isActive: user.isActive,
    isVerified: user.isVerified,
    createdAt: user.createdAt
  }));
}
async function getClassrooms() {
  const payload = await fetchJson("/classrooms");
  return payload.classrooms.map(normalizeBackendClassroom);
}
async function getClassroomById(id) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(id)}`);
  return normalizeBackendClassroom(payload.classroom);
}
async function createQuiz(classroomId, quiz) {
  const payload = await fetchJson("/quizzes", {
    method: "POST",
    body: JSON.stringify({ ...quiz, classroom: classroomId })
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
async function uploadClassroomRecordingToCloudflare(formData) {
  const headers = {
    ...getDevAuthUserHeaders()
  };
  const response = await fetch(`${API_BASE}/recordings/classroom/upload-cloudflare`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) {
      classroomStore.setState(() => ({ currentUser: null }));
    }
    throw new Error(payload.message || "Upload failed");
  }
  return payload;
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
async function getMyNotifications(limit = 10) {
  const payload = await fetchJson(`/notifications?limit=${encodeURIComponent(String(limit))}`);
  return payload.notifications;
}
function getRecordingStreamUrl(recordingId) {
  return `${API_BASE}/recordings/classroom/${recordingId}/stream`;
}
async function logoutUser() {
  return fetchJson("/auth/logout", { method: "POST" });
}
const appCss = "/assets/styles-CSazFf6y.css";
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
const Route$x = createRootRouteWithContext()({
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
  const { queryClient } = Route$x.useRouteContext();
  const [authReady, setAuthReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    getCurrentUser().then((payload) => {
      const backendUser = payload.user;
      const accessToken = payload.accessToken || null;
      const role = backendUser.role === "student" ? "student" : "admin";
      const currentUser = {
        id: backendUser._id,
        name: `${backendUser.firstName || ""} ${backendUser.lastName || ""}`.trim() || backendUser.email,
        email: backendUser.email,
        phone: backendUser.phone,
        role
      };
      classroomStore.setState(() => ({ currentUser, accessToken }));
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
const $$splitComponentImporter$w = () => import("./placements-BhvZV741.mjs");
const Route$w = createFileRoute("/placements")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./login-BEj0DE9l.mjs");
const Route$v = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./faculty-CKTvX--s.mjs");
const Route$u = createFileRoute("/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./courses-D41pXkWk.mjs");
const Route$t = createFileRoute("/courses")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./contact-ByORprBQ.mjs");
const Route$s = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./blog-CtfMgOJq.mjs");
const Route$r = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./about-CVYP_zsH.mjs");
const Route$q = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("../_student-kFQUV9pO.mjs");
const Route$p = createFileRoute("/_student")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("../_admin-DtCncPX2.mjs");
const Route$o = createFileRoute("/_admin")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./index-CLJRMseI.mjs");
const Route$n = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_student.student.schedule-BBNw-Bw-.mjs");
const Route$m = createFileRoute("/_student/student/schedule")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("../_student.student.profile-DqFkR0ir.mjs");
const Route$l = createFileRoute("/_student/student/profile")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("../_student.student.messages-jnBxbjCY.mjs");
const Route$k = createFileRoute("/_student/student/messages")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("../_student.student.live-pfbdjWMA.mjs");
const Route$j = createFileRoute("/_student/student/live")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("../_student.student.exams-bcVb4PYZ.mjs");
const Route$i = createFileRoute("/_student/student/exams")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("../_student.student.dashboard-CRg6Bvri.mjs");
const Route$h = createFileRoute("/_student/student/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("../_student.student.certificates-CrY_ZK6n.mjs");
const Route$g = createFileRoute("/_student/student/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("../_admin.admin.students-Cvxo5fxU.mjs");
const Route$f = createFileRoute("/_admin/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("../_admin.admin.settings-CD4cYkIg.mjs");
const Route$e = createFileRoute("/_admin/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("../_admin.admin.placements-BUryPnRD.mjs");
const Route$d = createFileRoute("/_admin/admin/placements")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("../_admin.admin.finance-Cgl9WOw_.mjs");
const Route$c = createFileRoute("/_admin/admin/finance")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_admin.admin.faculty-C6VrhRW8.mjs");
const Route$b = createFileRoute("/_admin/admin/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("../_admin.admin.exams-D4p_1L8I.mjs");
const Route$a = createFileRoute("/_admin/admin/exams")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_admin.admin.dashboard-Dn__zcsS.mjs");
const Route$9 = createFileRoute("/_admin/admin/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_admin.admin.courses-DCakptjo.mjs");
const Route$8 = createFileRoute("/_admin/admin/courses")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_admin.admin.analytics-DfObfsHM.mjs");
const Route$7 = createFileRoute("/_admin/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_student.student.my-courses.index-BAEnmwVU.mjs");
const Route$6 = createFileRoute("/_student/student/my-courses/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_student.student.classrooms.index-BJ3fS_Yy.mjs");
const Route$5 = createFileRoute("/_student/student/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_admin.admin.classrooms.index-Dtf3G-Ih.mjs");
const Route$4 = createFileRoute("/_admin/admin/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_student.student.jitsi._roomId-yKDyHc00.mjs");
const Route$3 = createFileRoute("/_student/student/jitsi/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_student.student.course._id-sqq1bgrT.mjs");
const Route$2 = createFileRoute("/_student/student/course/$id")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_student.student.classroom._id-MB7bj9O1.mjs");
const Route$1 = createFileRoute("/_student/student/classroom/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_admin.admin.classrooms._id-C_hKxaGv.mjs");
const Route = createFileRoute("/_admin/admin/classrooms/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PlacementsRoute = Route$w.update({
  id: "/placements",
  path: "/placements",
  getParentRoute: () => Route$x
});
const LoginRoute = Route$v.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$x
});
const FacultyRoute = Route$u.update({
  id: "/faculty",
  path: "/faculty",
  getParentRoute: () => Route$x
});
const CoursesRoute = Route$t.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$x
});
const ContactRoute = Route$s.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$x
});
const BlogRoute = Route$r.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$x
});
const AboutRoute = Route$q.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$x
});
const StudentRoute = Route$p.update({
  id: "/_student",
  getParentRoute: () => Route$x
});
const AdminRoute = Route$o.update({
  id: "/_admin",
  getParentRoute: () => Route$x
});
const IndexRoute = Route$n.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$x
});
const StudentStudentScheduleRoute = Route$m.update({
  id: "/student/schedule",
  path: "/student/schedule",
  getParentRoute: () => StudentRoute
});
const StudentStudentProfileRoute = Route$l.update({
  id: "/student/profile",
  path: "/student/profile",
  getParentRoute: () => StudentRoute
});
const StudentStudentMessagesRoute = Route$k.update({
  id: "/student/messages",
  path: "/student/messages",
  getParentRoute: () => StudentRoute
});
const StudentStudentLiveRoute = Route$j.update({
  id: "/student/live",
  path: "/student/live",
  getParentRoute: () => StudentRoute
});
const StudentStudentExamsRoute = Route$i.update({
  id: "/student/exams",
  path: "/student/exams",
  getParentRoute: () => StudentRoute
});
const StudentStudentDashboardRoute = Route$h.update({
  id: "/student/dashboard",
  path: "/student/dashboard",
  getParentRoute: () => StudentRoute
});
const StudentStudentCertificatesRoute = Route$g.update({
  id: "/student/certificates",
  path: "/student/certificates",
  getParentRoute: () => StudentRoute
});
const AdminAdminStudentsRoute = Route$f.update({
  id: "/admin/students",
  path: "/admin/students",
  getParentRoute: () => AdminRoute
});
const AdminAdminSettingsRoute = Route$e.update({
  id: "/admin/settings",
  path: "/admin/settings",
  getParentRoute: () => AdminRoute
});
const AdminAdminPlacementsRoute = Route$d.update({
  id: "/admin/placements",
  path: "/admin/placements",
  getParentRoute: () => AdminRoute
});
const AdminAdminFinanceRoute = Route$c.update({
  id: "/admin/finance",
  path: "/admin/finance",
  getParentRoute: () => AdminRoute
});
const AdminAdminFacultyRoute = Route$b.update({
  id: "/admin/faculty",
  path: "/admin/faculty",
  getParentRoute: () => AdminRoute
});
const AdminAdminExamsRoute = Route$a.update({
  id: "/admin/exams",
  path: "/admin/exams",
  getParentRoute: () => AdminRoute
});
const AdminAdminDashboardRoute = Route$9.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminAdminCoursesRoute = Route$8.update({
  id: "/admin/courses",
  path: "/admin/courses",
  getParentRoute: () => AdminRoute
});
const AdminAdminAnalyticsRoute = Route$7.update({
  id: "/admin/analytics",
  path: "/admin/analytics",
  getParentRoute: () => AdminRoute
});
const StudentStudentMyCoursesIndexRoute = Route$6.update({
  id: "/student/my-courses/",
  path: "/student/my-courses/",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomsIndexRoute = Route$5.update({
  id: "/student/classrooms/",
  path: "/student/classrooms/",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIndexRoute = Route$4.update({
  id: "/admin/classrooms/",
  path: "/admin/classrooms/",
  getParentRoute: () => AdminRoute
});
const StudentStudentJitsiRoomIdRoute = Route$3.update({
  id: "/student/jitsi/$roomId",
  path: "/student/jitsi/$roomId",
  getParentRoute: () => StudentRoute
});
const StudentStudentCourseIdRoute = Route$2.update({
  id: "/student/course/$id",
  path: "/student/course/$id",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomIdRoute = Route$1.update({
  id: "/student/classroom/$id",
  path: "/student/classroom/$id",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIdRoute = Route.update({
  id: "/admin/classrooms/$id",
  path: "/admin/classrooms/$id",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAdminAnalyticsRoute,
  AdminAdminCoursesRoute,
  AdminAdminDashboardRoute,
  AdminAdminExamsRoute,
  AdminAdminFacultyRoute,
  AdminAdminFinanceRoute,
  AdminAdminPlacementsRoute,
  AdminAdminSettingsRoute,
  AdminAdminStudentsRoute,
  AdminAdminClassroomsIdRoute,
  AdminAdminClassroomsIndexRoute
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
  StudentStudentJitsiRoomIdRoute,
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
  FacultyRoute,
  LoginRoute,
  PlacementsRoute
};
const routeTree = Route$x._addFileChildren(rootRouteChildren)._addFileTypes();
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
  messageActions as A,
  publishQuiz as B,
  router as C,
  uid as D,
  updateClassroomStudentStatus as E,
  uploadClassroomRecordingToCloudflare as F,
  useClassroomStore as G,
  Route$3 as R,
  Route$2 as a,
  Route$1 as b,
  Route as c,
  addStudentsToClassroom as d,
  adminActions as e,
  classroomActions as f,
  classroomStore as g,
  closeQuiz as h,
  computeCertificates as i,
  createClassroom as j,
  createMeeting as k,
  createQuiz as l,
  deleteQuiz as m,
  formatDuration as n,
  formatTime as o,
  getAdminUsers as p,
  getClassroomById as q,
  getClassrooms as r,
  getExamType as s,
  getGrade as t,
  getMyClassrooms as u,
  getMyMeetings as v,
  getMyNotifications as w,
  getRecordingStreamUrl as x,
  loginUser as y,
  logoutUser as z
};
