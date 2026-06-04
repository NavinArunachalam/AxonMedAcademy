import { classroomStore } from '@/lib/classroomStore';

// Auth is cookie-based, with Authorization header fallback from the in-memory store.
const getApiBase = () => {
  const runtimeApiUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.BACKEND_URL ||
    (typeof process !== 'undefined' ? process.env.VITE_API_URL || process.env.BACKEND_URL : '');

  const apiBase = (runtimeApiUrl?.trim() || '/api/v1').replace(/\/+$/, '');
  
  // Log API base in development and when no explicit URL is provided
  if (import.meta.env.DEV || !runtimeApiUrl) {
    console.log('[API] Using API base:', apiBase);
  }
  
  return apiBase;
};

const API_BASE = getApiBase();

function getDevAuthUserHeaders(): Record<string, string> {
  if (import.meta.env.PROD) return {};
  const currentUser = classroomStore.getState().currentUser;
  if (!currentUser?.email) return {};
  const name = currentUser.name || 'Dev User';
  return {
    'x-dev-user-email': currentUser.email,
    'x-dev-user-role': currentUser.role,
    'x-dev-user-name': name || 'Dev User',
  };
}

function normalizeLoginIdentifier(value: string) {
  if (value.includes('@')) return value;
  const map: Record<string, string> = {
    Ajay: 'ajay@ex.com',
    Navin: 'navin@ex.com',
    Admin: 'admin@ex.com',
  };
  return map[value] ?? value;
}

export interface PortalNotification {
  _id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  read: boolean;
  readAt?: string | null;
  actionUrl?: string | null;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

function normalizeBackendClassroom(raw: any) {
  const normalizeMeetingStatus = (status: string) => {
    if (status === 'waiting') return 'scheduled';
    return status || 'scheduled';
  };

  return {
    id: raw._id || raw.id,
    name: raw.name || '',
    description: raw.description || '',
    code: raw.code || '',
    status: raw.status || 'active',
    maxStudents: raw.maxStudents ?? 100,
    program: raw.program?.name || raw.program?.title || raw.program || '',
    createdAt: raw.createdAt || new Date().toISOString(),
    students: Array.isArray(raw.students)
      ? raw.students.map((s: any) => ({
        id: String(s.student?._id || s.student || `student-${Date.now()}`),
        name: s.student?.firstName ? `${s.student.firstName} ${s.student.lastName || ''}`.trim() : s.student?.email || 'Student',
        email: s.student?.email || '',
        enrollmentId: s.enrollmentId || '',
        progress: 0,
        attendance: 0,
        quizAvg: 0,
        status: s.status || 'active',
        addedAt: s.addedAt ? new Date(s.addedAt).toISOString() : new Date().toISOString(),
      }))
      : [],
    announcements: Array.isArray(raw.announcements)
      ? raw.announcements.map(normalizeBackendAnnouncement)
      : [],
    meetings: Array.isArray(raw.meetings)
      ? raw.meetings.map((m: any) => ({
        id: m._id || m.id,
        title: m.title,
        description: m.description || '',
        scheduledAt: m.scheduledAt || new Date().toISOString(),
        duration: m.duration || 60,
        status: normalizeMeetingStatus(m.status),
        attendees: Array.isArray(m.attendees) ? m.attendees.map((a: any) => String(a.student || a)) : [],
        roomId: m.roomId || '',
      }))
      : [],
    recordings: Array.isArray(raw.recordings)
      ? raw.recordings.map((r: any) => ({
        id: r._id || r.id,
        title: r.title,
        description: r.description || '',
        duration: r.duration || 0,
        isPublished: r.isPublished || false,
        chapters: r.chapters || [],
        storageProvider: r.storageProvider,
        cloudflareKey: r.cloudflareKey,
        cloudflareUrl: r.cloudflareUrl,
        viewStats: Array.isArray(r.viewStats)
          ? r.viewStats.map((v: any) => ({
            studentId: String(v.student?._id || v.student),
            studentName: v.student ? `${v.student.firstName || ''} ${v.student.lastName || ''}`.trim() || 'Student' : 'Student',
            watchedPercent: r.duration > 0 ? Math.round((v.totalWatchedSec / r.duration) * 100) : 0,
          }))
          : [],
      }))
      : [],
    quizzes: Array.isArray(raw.quizzes)
      ? raw.quizzes.map((q: any) => ({
        id: q._id || q.id,
        title: q.title,
        instructions: q.instructions || '',
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
        status: q.status || 'draft',
        questions: Array.isArray(q.questions) ? q.questions.map((quest: any) => ({
          id: quest._id || quest.id,
          type: quest.type || 'mcq',
          text: quest.text,
          marks: quest.marks || 1,
          explanation: quest.explanation || '',
          order: quest.order || 1,
          options: Array.isArray(quest.options) ? quest.options.map((o: any) => ({
            label: o.label,
            text: o.text,
            isCorrect: o.isCorrect || false
          })) : []
        })) : [],
        attempts: Array.isArray(q.attempts) ? q.attempts.map((att: any) => ({
          id: att._id || att.id,
          studentId: String(att.student?._id || att.student),
          studentName: att.studentName || 'Student',
          attemptNo: att.attemptNo || 1,
          status: att.status || 'submitted',
          startedAt: att.startedAt,
          submittedAt: att.submittedAt,
          score: att.score || { rawMarks: 0, totalMarks: 0, percentage: 0, passed: false }
        })) : []
      }))
      : [],
  };
}

function normalizeBackendAnnouncement(raw: any) {
  const author = raw.author;
  return {
    id: raw._id || raw.id,
    content: raw.content || '',
    createdAt: raw.createdAt || new Date().toISOString(),
    author: author?.firstName
      ? `${author.firstName} ${author.lastName || ''}`.trim()
      : author?.email || author?.role || 'Admin',
  };
}

function normalizeBackendQuiz(raw: any) {
  return {
    id: raw._id || raw.id,
    title: raw.title || '',
    instructions: raw.instructions || '',
    duration: raw.duration ?? null,
    maxAttempts: raw.maxAttempts || 1,
    randomizeQuestions: raw.randomizeQuestions || false,
    randomizeOptions: raw.randomizeOptions || false,
    showLeaderboard: raw.showLeaderboard || false,
    negativeMarking: raw.negativeMarking || false,
    negativeMarkValue: raw.negativeMarkValue ?? 0.25,
    passPercent: raw.passPercent || 0,
    availableFrom: raw.availableFrom || '',
    availableUntil: raw.availableUntil || '',
    status: raw.status || 'draft',
    questions: Array.isArray(raw.questions) ? raw.questions.map((quest: any) => ({
      id: quest._id || quest.id,
      type: quest.type || 'mcq',
      text: quest.text || '',
      marks: quest.marks || 1,
      explanation: quest.explanation || '',
      order: quest.order || 0,
      options: Array.isArray(quest.options) ? quest.options.map((o: any) => ({
        label: o.label,
        text: o.text,
        isCorrect: !!o.isCorrect,
      })) : [],
    })) : [],
    attempts: Array.isArray(raw.attempts) ? raw.attempts.map((att: any) => ({
      id: att._id || att.id,
      studentId: String(att.student?._id || att.student || ''),
      studentName: att.studentName || 'Student',
      attemptNo: att.attemptNo || 1,
      status: att.status || 'submitted',
      startedAt: att.startedAt,
      submittedAt: att.submittedAt,
      score: att.score || { rawMarks: 0, totalMarks: 0, percentage: 0, passed: false },
    })) : [],
  };
}

async function fetchJson(path: string, options: RequestInit = {}) {
  const accessToken = classroomStore.getState().accessToken;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    ...getDevAuthUserHeaders(),
  };
  const extraHeaders = options.headers as Record<string, string> | undefined;
  if (extraHeaders) Object.assign(headers, extraHeaders);

  const fullUrl = `${API_BASE}${path}`;
  console.log('[API Request]', options.method || 'GET', fullUrl);

  const response = await fetch(fullUrl, {
    credentials: 'include', // sends HttpOnly cookies cross-origin (Vercel → Railway)
    headers,
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    // On 401, clear the in-memory user so the router redirects to /login.
    // Exclude /auth/me — boot-time rehydration handles that path itself.
    if (response.status === 401 && path !== '/auth/login' && path !== '/auth/me') {
      classroomStore.setState(() => ({ currentUser: null }));
    }
    const errorMsg = payload.message || `Server error (${response.status})`;
    console.error('[API Error]', fullUrl, response.status, errorMsg);
    throw new Error(errorMsg);
  }
  console.log('[API Success]', fullUrl, response.status);
  return payload;
}

export async function loginUser(identifier: string, password: string) {
  // Server sets HttpOnly cookies (accessToken, refreshToken, session) in the response.
  // Nothing to store client-side — cookies are sent automatically on every subsequent request.
  return fetchJson('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: normalizeLoginIdentifier(identifier), password }),
  });
}

export async function getCurrentUser() {
  return fetchJson('/auth/me');
}

export async function getAdminUsers(role?: string) {
  const query = role ? `?role=${encodeURIComponent(role)}` : '';
  const payload = await fetchJson(`/admin/users${query}`);
  return payload.users.map((user: any) => ({
    id: String(user._id || user.id),
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
    email: user.email || '',
    phone: user.phone || '',
    role: user.role,
    isActive: user.isActive,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  }));
}

export async function getClassrooms() {
  const payload = await fetchJson('/classrooms');
  return payload.classrooms.map(normalizeBackendClassroom);
}

export async function getClassroomById(id: string) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(id)}`);
  return normalizeBackendClassroom(payload.classroom);
}

export async function createClassroomAnnouncement(classroomId: string, content: string) {
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/announcements`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
  return normalizeBackendAnnouncement(payload.announcement);
}

export async function deleteClassroomAnnouncement(classroomId: string, announcementId: string) {
  return fetchJson(
    `/classrooms/${encodeURIComponent(classroomId)}/announcements/${encodeURIComponent(announcementId)}`,
    { method: 'DELETE' }
  );
}

export async function createQuiz(classroomId: string, quiz: any) {
  const payload = await fetchJson('/quizzes', {
    method: 'POST',
    body: JSON.stringify({ ...quiz, classroom: classroomId }),
  });
  return normalizeBackendQuiz(payload.quiz);
}

export async function publishQuiz(quizId: string) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/publish`, { method: 'PUT' });
}

export async function closeQuiz(quizId: string) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/close`, { method: 'PUT' });
}

export async function deleteQuiz(quizId: string) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}`, { method: 'DELETE' });
}

/**
 * Upload a classroom recording using the presigned-URL flow:
 *   1. Ask Railway for a presigned R2 PUT URL  (tiny JSON request)
 *   2. PUT the video bytes directly to R2      (never touches Railway → no timeout)
 *   3. POST only the metadata to Railway        (tiny JSON request)
 *
 * @param options.file          - The File / Blob to upload
 * @param options.classroom     - Classroom ObjectId
 * @param options.title         - Recording title
 * @param options.description   - Optional description
 * @param options.duration      - Duration in seconds
 * @param options.isPublished   - Whether to publish immediately
 * @param options.chapters      - Optional chapters array
 * @param options.onProgress    - Progress callback (0–100)
 */
export async function uploadClassroomRecordingToCloudflare({
  file,
  classroom,
  title,
  description = '',
  duration = 0,
  isPublished = false,
  chapters = [],
  onProgress,
}: {
  file: File;
  classroom: string;
  title: string;
  description?: string;
  duration?: number;
  isPublished?: boolean;
  chapters?: unknown[];
  onProgress?: (progress: { loaded: number; total: number; percentage: number }) => void;
}) {
  const authHeaders = getDevAuthUserHeaders();
  const accessToken = classroomStore.getState().accessToken;
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...authHeaders,
  };

  // ── Step 1: get presigned upload URL from Railway (instant) ─────────────
  const presignRes = await fetch(`${API_BASE}/recordings/classroom/presigned-url`, {
    method: 'POST',
    credentials: 'include',
    headers: baseHeaders,
    body: JSON.stringify({
      classroom,
      filename: file.name,
      contentType: file.type || 'video/mp4',
    }),
  });

  const presignData = await presignRes.json().catch(() => ({}));
  if (!presignRes.ok) {
    if (presignRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
    throw new Error(presignData.message || 'Failed to get upload URL');
  }

  const { uploadUrl, objectKey, publicUrl } = presignData as {
    uploadUrl: string;
    objectKey: string;
    publicUrl: string;
  };

  // ── Step 2: PUT directly to R2 with progress tracking (never hits Railway) ──
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress({
            loaded: e.loaded,
            total: e.total,
            percentage: Math.round((e.loaded / e.total) * 100),
          });
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.({
          loaded: file.size,
          total: file.size,
          percentage: 100,
        });
        resolve();
      } else {
        reject(new Error(`R2 upload failed: HTTP ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
    xhr.addEventListener('abort', () => reject(new Error('Upload was cancelled')));

    xhr.send(file);
  });

  // ── Step 3: save metadata in Railway DB (tiny JSON, instant) ─────────────
  const saveRes = await fetch(`${API_BASE}/recordings/classroom/save-recording`, {
    method: 'POST',
    credentials: 'include',
    headers: baseHeaders,
    body: JSON.stringify({
      classroom,
      title,
      description,
      duration,
      isPublished,
      objectKey,
      publicUrl,
      chapters,
    }),
  });

  const saveData = await saveRes.json().catch(() => ({}));
  if (!saveRes.ok) {
    if (saveRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
    throw new Error(saveData.message || 'Failed to save recording metadata');
  }

  return saveData;
}

export async function addStudentsToClassroom(classroomId: string, studentIds: string[]) {
  if (classroomId.startsWith('cls-')) {
    // Mock success for seed data
    return { success: true, message: `Successfully added students to mock classroom` };
  }

  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/add`, {
    method: 'POST',
    body: JSON.stringify({ studentIds }),
  });
  return payload;
}

export async function updateClassroomStudentStatus(classroomId: string, studentId: string, status: string) {
  if (classroomId.startsWith('cls-')) {
    return { success: true, message: `Successfully updated student status to ${status}` };
  }

  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/${encodeURIComponent(studentId)}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return payload;
}

export async function createClassroom(payload: {
  name: string;
  description?: string;
  thumbnail?: string;
  code: string;
  program?: string;
  batch?: string;
  maxStudents?: number;
  settings?: Record<string, any>;
}) {
  const result = await fetchJson('/classrooms', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return normalizeBackendClassroom(result.classroom);
}

export async function getMyClassrooms() {
  const payload = await fetchJson('/classrooms/my');
  return payload.classrooms.map(normalizeBackendClassroom);
}

export async function getMyMeetings() {
  return fetchJson('/meetings/my');
}

export async function createMeeting(payload: {
  classroom: string;
  title: string;
  description?: string;
  scheduledAt: string;
  duration: number;
  sendWhatsApp?: boolean;
  sendPortalNotification?: boolean;
}) {
  return fetchJson('/meetings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteMeeting(meetingId: string) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}`, {
    method: 'DELETE',
  });
}

export async function startMeeting(meetingId: string) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}/start`, {
    method: 'POST',
  });
}

export async function endMeeting(meetingId: string) {
  return fetchJson(`/meetings/${encodeURIComponent(meetingId)}/end`, {
    method: 'POST',
  });
}

export async function getClassroomMeetings(classroomIdentifier: string) {
  return fetchJson(`/meetings/classroom/${encodeURIComponent(classroomIdentifier)}`);
}

export async function getMyNotifications(limit = 10) {
  const payload = await fetchJson(`/notifications?limit=${encodeURIComponent(String(limit))}`);
  return payload.notifications as PortalNotification[];
}

export async function getUnreadNotificationCount() {
  const payload = await fetchJson('/notifications/unread-count');
  return payload.unreadCount as number;
}

export async function markNotificationRead(notificationId: string) {
  return fetchJson(`/notifications/${encodeURIComponent(notificationId)}/read`, {
    method: 'PUT',
  });
}

export function getRecordingStreamUrl(recordingId: string): string {
  return `${API_BASE}/recordings/classroom/${recordingId}/stream`;
}

export async function publishRecording(recordingId: string) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}/publish`, {
    method: 'PUT',
  });
}

export async function unpublishRecording(recordingId: string) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}`, {
    method: 'PUT',
    body: JSON.stringify({ isPublished: false }),
  });
}

export async function deleteRecording(recordingId: string) {
  return fetchJson(`/recordings/classroom/${encodeURIComponent(recordingId)}`, {
    method: 'DELETE',
  });
}

export async function logoutUser() {
  return fetchJson('/auth/logout', { method: 'POST' });
}

