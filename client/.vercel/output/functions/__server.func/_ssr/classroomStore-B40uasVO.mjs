import { r as reactExports } from "../_libs/react.mjs";
const CURRENT_USER_KEY = "htaCurrentUser";
function loadStoredCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function persistCurrentUser(user) {
  if (typeof window === "undefined" || user === void 0) return;
  if (user) {
    window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    window.localStorage.removeItem("htaAccessToken");
  }
}
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
      persistCurrentUser(patch.currentUser);
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
  currentUser: loadStoredCurrentUser(),
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
export {
  adminActions as a,
  classroomStore as b,
  classroomActions as c,
  computeCertificates as d,
  formatTime as e,
  formatDuration as f,
  getExamType as g,
  getGrade as h,
  useClassroomStore as i,
  messageActions as m,
  uid as u
};
