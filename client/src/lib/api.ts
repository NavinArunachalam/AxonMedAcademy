import { classroomStore } from '@/lib/classroomStore';

// Auth is cookie-based, with Authorization header fallback from the in-memory store.
const getApiBase = () => {
  const runtimeApiUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.BACKEND_URL ||
    (typeof process !== 'undefined' ? process.env.VITE_API_URL || process.env.BACKEND_URL : '');

  return (runtimeApiUrl?.trim() || '/api/v1').replace(/\/+$/, '');
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

  const response = await fetch(`${API_BASE}${path}`, {
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
    throw new Error(payload.message || 'Server error');
  }
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

function normalizeBackendQuizAttempt(att: any) {
  return {
    id: att._id || att.id,
    studentId: String(att.student?._id || att.student || ''),
    studentName: att.studentName
      || (att.student?.firstName ? `${att.student.firstName} ${att.student.lastName || ''}`.trim() : 'Student'),
    attemptNo: att.attemptNo || 1,
    status: att.status || 'submitted',
    startedAt: att.startedAt,
    submittedAt: att.submittedAt,
    score: {
      rawMarks: att.score?.rawMarks ?? 0,
      totalMarks: att.score?.totalMarks ?? 0,
      percentage: Math.round(att.score?.percentage ?? 0),
      passed: !!att.score?.passed,
    },
  };
}

function normalizeApiQuizQuestion(q: any) {
  return {
    id: q._id || q.id,
    type: q.type || 'mcq',
    text: q.text || '',
    marks: q.marks || 1,
    explanation: q.explanation || '',
    order: q.order || 0,
    options: Array.isArray(q.options)
      ? q.options.map((o: any) => ({ label: o.label, text: o.text, isCorrect: !!o.isCorrect }))
      : [],
  };
}

export async function startQuizAttempt(quizId: string) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/start`, { method: 'POST' });
  return {
    attemptId: String(payload.attempt._id || payload.attempt.id),
    startedAt: payload.attempt.startedAt,
    attemptNo: payload.attempt.attemptNo,
    duration: payload.attempt.duration,
    questions: Array.isArray(payload.questions) ? payload.questions.map(normalizeApiQuizQuestion) : [],
  };
}

export async function saveQuizAnswer(
  quizId: string,
  data: { attemptId: string; questionId: string; selectedOptions: string[]; timeTakenSec?: number },
) {
  return fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/answer`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function submitQuizAttempt(quizId: string, attemptId: string) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/submit`, {
    method: 'POST',
    body: JSON.stringify({ attemptId }),
  });
  return {
    score: {
      rawMarks: payload.score?.rawMarks ?? 0,
      totalMarks: payload.score?.totalMarks ?? 0,
      percentage: Math.round(payload.score?.percentage ?? 0),
      passed: !!payload.score?.passed,
    },
  };
}

export async function getQuizAttemptResult(quizId: string, attemptId?: string) {
  const query = attemptId ? `?attemptId=${encodeURIComponent(attemptId)}` : '';
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/attempt/my-result${query}`);
  return {
    score: {
      rawMarks: payload.score?.rawMarks ?? 0,
      totalMarks: payload.score?.totalMarks ?? 0,
      percentage: Math.round(payload.score?.percentage ?? 0),
      passed: !!payload.score?.passed,
    },
    submittedAt: payload.submittedAt,
    answers: Array.isArray(payload.answers) ? payload.answers.map((ans: any) => ({
      questionId: String(ans.questionId),
      selectedOptions: ans.selectedOptions || [],
      isCorrect: !!ans.isCorrect,
      marksAwarded: ans.marksAwarded ?? 0,
      questionText: ans.questionText || '',
      explanation: ans.explanation || '',
      correctOptions: ans.correctOptions || [],
    })) : [],
  };
}

export async function getQuizReport(quizId: string) {
  const payload = await fetchJson(`/quizzes/${encodeURIComponent(quizId)}/report`);
  return Array.isArray(payload.attempts) ? payload.attempts.map(normalizeBackendQuizAttempt) : [];
}

// ─── Chunk size for multipart uploads ────────────────────────────────────────
// 50 MB per part. Files ≥ 50 MB use the multipart path; smaller files use a
// single presigned PUT (simpler, no overhead). R2 minimum part size is 5 MB
// (last part exempt), so 50 MB chunks satisfy that rule for any real video.
const MULTIPART_CHUNK_SIZE = 50 * 1024 * 1024; // 50 MB in bytes

/**
 * Upload one part of a multipart upload directly to R2 and return its ETag.
 *
 * NOTE: your R2 bucket's CORS policy must include `ETag` in
 * `Access-Control-Expose-Headers` so the browser can read it.
 * Example CORS rule to add in the Cloudflare dashboard:
 *   AllowedOrigins: ["https://your-frontend.vercel.app"]
 *   AllowedMethods: ["PUT"]
 *   AllowedHeaders: ["Content-Type"]
 *   ExposedHeaders: ["ETag"]
 */
async function uploadPartToR2(
  presignedUrl: string,
  chunk: Blob,
  partNumber: number,
  onPartBytes?: (loaded: number) => void,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presignedUrl, true);
    // Parts must be sent as binary — do NOT set Content-Type to the video MIME type
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onPartBytes) onPartBytes(e.loaded);
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // R2 returns ETag in the response header (quoted string, e.g. "abc123")
        const etag =
          xhr.getResponseHeader('ETag') ||
          xhr.getResponseHeader('etag') ||
          xhr.getResponseHeader('Etag') ||
          '';
        if (!etag) {
          // ETag is mandatory for CompleteMultipartUpload — missing means CORS
          // is not exposing it. See the NOTE above about your R2 CORS policy.
          reject(
            new Error(
              `Part ${partNumber} uploaded but ETag header is missing. ` +
              `Add "ETag" to Access-Control-Expose-Headers in your R2 bucket CORS policy.`,
            ),
          );
          return;
        }
        resolve(etag); // Keep quotes — R2 expects them in CompleteMultipartUpload
      } else {
        reject(new Error(`Part ${partNumber} upload failed: HTTP ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () =>
      reject(new Error(`Network error while uploading part ${partNumber}`)),
    );
    xhr.addEventListener('abort', () =>
      reject(new Error(`Upload aborted on part ${partNumber}`)),
    );

    xhr.send(chunk);
  });
}

/**
 * Upload a classroom recording to Cloudflare R2.
 *
 * Strategy (chosen automatically by file size):
 *
 *   • File < 100 MB  → single presigned PUT  (simple, no overhead)
 *   • File ≥ 100 MB  → S3 multipart upload   (100 MB chunks, direct to R2)
 *
 * The multipart path supports files from 100 MB up to 3 GB+ without any
 * Railway timeout risk — Railway only handles tiny JSON orchestration calls.
 *
 * @param options.file          - The File / Blob to upload
 * @param options.classroom     - Classroom ObjectId
 * @param options.title         - Recording title
 * @param options.description   - Optional description
 * @param options.duration      - Duration in seconds
 * @param options.isPublished   - Whether to publish immediately
 * @param options.chapters      - Optional chapters array
 * @param options.onProgress    - Progress callback ({ loaded, total, percentage, part?, totalParts? })
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
  onProgress?: (progress: {
    loaded: number;
    total: number;
    percentage: number;
    part?: number;       // current chunk number (multipart only)
    totalParts?: number; // total chunks (multipart only)
  }) => void;
}) {
  const authHeaders = getDevAuthUserHeaders();
  const accessToken = classroomStore.getState().accessToken;
  const baseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...authHeaders,
  };

  // Helper: fire onProgress safely
  const reportProgress = (
    loaded: number,
    total: number,
    part?: number,
    totalParts?: number,
  ) => {
    onProgress?.({
      loaded,
      total,
      percentage: total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0,
      ...(part != null ? { part, totalParts } : {}),
    });
  };

  const fileMB = (file.size / (1024 * 1024)).toFixed(1);

  // ============================================================
  // PATH A — Single presigned PUT for small files (< 50 MB)
  // ============================================================
  if (file.size < MULTIPART_CHUNK_SIZE) {
    console.log(`[Upload] PATH A — single PUT | ${file.name} | ${fileMB} MB (below 50 MB threshold)`);
    // ── Step 1: get presigned upload URL from Railway ────────────────────
    const presignRes = await fetch(`${API_BASE}/recordings/classroom/presigned-url`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders,
      body: JSON.stringify({ classroom, filename: file.name, contentType: file.type || 'video/mp4' }),
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

    // ── Step 2: PUT directly to R2 ───────────────────────────────────────
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) reportProgress(e.loaded, e.total);
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          reportProgress(file.size, file.size);
          resolve();
        } else {
          reject(new Error(`R2 upload failed: HTTP ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => reject(new Error('Network error during upload')));
      xhr.addEventListener('abort', () => reject(new Error('Upload was cancelled')));

      xhr.send(file);
    });

    // ── Step 3: save metadata ────────────────────────────────────────────
    const saveRes = await fetch(`${API_BASE}/recordings/classroom/save-recording`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders,
      body: JSON.stringify({ classroom, title, description, duration, isPublished, objectKey, publicUrl, chapters }),
    });

    const saveData = await saveRes.json().catch(() => ({}));
    if (!saveRes.ok) {
      if (saveRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
      throw new Error(saveData.message || 'Failed to save recording metadata');
    }

    return saveData;
  }

  // ============================================================
  // PATH B — S3 Multipart Upload for large files (≥ 50 MB)
  // ============================================================
  const totalParts = Math.ceil(file.size / MULTIPART_CHUNK_SIZE);
  console.log(`[Upload] PATH B — multipart | ${file.name} | ${fileMB} MB | ${totalParts} parts × 50 MB`);

  // ── Step 1: Initiate multipart — Railway creates the upload on R2 ────
  const initiateRes = await fetch(`${API_BASE}/recordings/classroom/multipart/initiate`, {
    method: 'POST',
    credentials: 'include',
    headers: baseHeaders,
    body: JSON.stringify({ classroom, filename: file.name, contentType: file.type || 'video/mp4' }),
  });

  const initiateData = await initiateRes.json().catch(() => ({}));
  if (!initiateRes.ok) {
    if (initiateRes.status === 401) classroomStore.setState(() => ({ currentUser: null }));
    throw new Error(initiateData.message || 'Failed to initiate multipart upload');
  }

  const { uploadId, objectKey, publicUrl } = initiateData as {
    uploadId: string;
    objectKey: string;
    publicUrl: string;
  };

  // Track bytes uploaded per part so progress is accurate across all chunks
  const partBytesLoaded = new Array<number>(totalParts).fill(0);

  // Collect { PartNumber, ETag } after each successful part
  const completedParts: { PartNumber: number; ETag: string }[] = [];

  // ── Steps 2–3: Upload each 100 MB chunk sequentially ────────────────
  // Sequential is safer than parallel for unstable connections; each part
  // is independently retryable at the application level if needed.
  try {
    for (let i = 0; i < totalParts; i++) {
      const partNumber = i + 1;
      const start = i * MULTIPART_CHUNK_SIZE;
      const end = Math.min(start + MULTIPART_CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      console.log(`[Upload] Starting part ${partNumber}/${totalParts} — ${(chunk.size / 1024 / 1024).toFixed(1)} MB`);

      // 2a. Get a presigned URL for this specific part from Railway (instant)
      const partUrlRes = await fetch(`${API_BASE}/recordings/classroom/multipart/presign-part`, {
        method: 'POST',
        credentials: 'include',
        headers: baseHeaders,
        body: JSON.stringify({ objectKey, uploadId, partNumber }),
      });

      const partUrlData = await partUrlRes.json().catch(() => ({}));
      if (!partUrlRes.ok) {
        throw new Error(partUrlData.message || `Failed to get presigned URL for part ${partNumber}`);
      }

      const { presignedUrl } = partUrlData as { presignedUrl: string };

      // 2b. PUT the chunk directly to R2 (never touches Railway)
      const etag = await uploadPartToR2(presignedUrl, chunk, partNumber, (loaded) => {
        partBytesLoaded[i] = loaded;
        const totalLoaded = partBytesLoaded.reduce((acc, b) => acc + b, 0);
        reportProgress(totalLoaded, file.size, partNumber, totalParts);
      });

      // Mark this part's bytes as fully loaded in the tracker
      partBytesLoaded[i] = chunk.size;
      completedParts.push({ PartNumber: partNumber, ETag: etag });
      console.log(`[Upload] Part ${partNumber}/${totalParts} done ✓  ETag: ${etag}`);

      // Intermediate progress update after part completes
      const totalLoaded = partBytesLoaded.reduce((acc, b) => acc + b, 0);
      reportProgress(totalLoaded, file.size, partNumber, totalParts);
    }
  } catch (uploadError) {
    // Clean up incomplete multipart upload on R2 (best-effort, fire-and-forget)
    fetch(`${API_BASE}/recordings/classroom/multipart/abort`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders,
      body: JSON.stringify({ objectKey, uploadId }),
    }).catch(() => { /* ignore abort errors */ });

    throw uploadError; // Re-throw so the UI shows the real error
  }

  // ── Step 4: Tell R2 to assemble all parts into the final object ──────
  const completeRes = await fetch(`${API_BASE}/recordings/classroom/multipart/complete`, {
    method: 'POST',
    credentials: 'include',
    headers: baseHeaders,
    body: JSON.stringify({ objectKey, uploadId, parts: completedParts }),
  });

  const completeData = await completeRes.json().catch(() => ({}));
  if (!completeRes.ok) {
    throw new Error(completeData.message || 'Failed to complete multipart upload on R2');
  }

  reportProgress(file.size, file.size); // 100%

  // ── Step 5: Save metadata in Railway DB (tiny JSON, instant) ────────
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
  const payload = await fetchJson(`/classrooms/${encodeURIComponent(classroomId)}/students/add`, {
    method: 'POST',
    body: JSON.stringify({ studentIds }),
  });
  return payload;
}

export async function updateClassroomStudentStatus(classroomId: string, studentId: string, status: string) {
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

// ─── Programs (Courses) ───────────────────────────────────────────────────────

export interface ProgramCourse {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  status: 'published' | 'draft' | 'archived';
  updatedAt: string;
}

function normalizeBackendProgram(raw: any): ProgramCourse {
  const status: ProgramCourse['status'] =
    raw.status === 'archived' ? 'archived' :
    (raw.isPublished || raw.status === 'published') ? 'published' : 'draft';
  return {
    id: String(raw._id || raw.id),
    title: raw.title || '',
    category: raw.category || 'Other',
    description: raw.description || raw.shortDesc || '',
    price: raw.fee?.baseAmount ?? 0,
    status,
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

export async function getAdminPrograms(): Promise<ProgramCourse[]> {
  const payload = await fetchJson('/programs/admin-all');
  return (payload.programs as any[]).map(normalizeBackendProgram);
}

export async function createAdminProgram(
  data: Omit<ProgramCourse, 'id' | 'updatedAt'>
): Promise<ProgramCourse> {
  const payload = await fetchJson('/programs', {
    method: 'POST',
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      category: data.category,
      fee: { baseAmount: data.price, gstPercent: 18 },
      status: data.status,
    }),
  });
  return normalizeBackendProgram(payload.program);
}

export async function updateAdminProgram(
  id: string,
  data: Partial<Omit<ProgramCourse, 'id'>>
): Promise<ProgramCourse> {
  const body: Record<string, any> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.description !== undefined) body.description = data.description;
  if (data.category !== undefined) body.category = data.category;
  if (data.price !== undefined) body.fee = { baseAmount: data.price, gstPercent: 18 };
  if (data.status !== undefined) body.status = data.status;
  const payload = await fetchJson(`/programs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  return normalizeBackendProgram(payload.program);
}

export async function deleteAdminProgram(id: string) {
  return fetchJson(`/programs/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
