const API_BASE = "http://oc-pro-production.up.railway.app/api/v1"?.trim() || "/api/v1";
const ACCESS_TOKEN_KEY = "htaAccessToken";
function getStoredAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}
function setStoredAccessToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}
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
  const headers = {
    "Content-Type": "application/json",
    ...getDevAuthUserHeaders()
  };
  const accessToken = getStoredAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const extraHeaders = options.headers;
  if (extraHeaders) Object.assign(headers, extraHeaders);
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers,
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Server error");
  }
  return payload;
}
async function loginUser(identifier, password) {
  const payload = await fetchJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: normalizeLoginIdentifier(identifier), password })
  });
  if (payload.accessToken) {
    setStoredAccessToken(payload.accessToken);
  }
  return payload;
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
  const accessToken = getStoredAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const response = await fetch(`${API_BASE}/recordings/classroom/upload-cloudflare`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
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
export {
  addStudentsToClassroom as a,
  createClassroom as b,
  closeQuiz as c,
  createMeeting as d,
  createQuiz as e,
  deleteQuiz as f,
  getAdminUsers as g,
  getClassroomById as h,
  getClassrooms as i,
  getMyClassrooms as j,
  getMyMeetings as k,
  getMyNotifications as l,
  loginUser as m,
  uploadClassroomRecordingToCloudflare as n,
  publishQuiz as p,
  updateClassroomStudentStatus as u
};
