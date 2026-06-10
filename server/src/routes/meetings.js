const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const User = require('../models/User');
const LiveMeeting = require('../models/LiveMeeting');
const Classroom = require('../models/Classroom');
const Notification = require('../models/Notification');
const { protect, restrictTo } = require('../middleware/auth');

// Socket notification helper
const notifyMeetingCreated = async (meeting) => {
  try {
    const { getIO } = require('../config/socket');
    const io = getIO();
    io.to(`classroom:${meeting.classroom}`).emit('meeting:created', {
      _id: meeting._id,
      title: meeting.title,
      scheduledAt: meeting.scheduledAt,
      roomId: meeting.roomId
    });
  } catch (err) {
    console.log('[Socket Error] Could not notify meeting creation:', err.message);
  }
};

const resolveClassroom = async (classroomIdentifier) => {
  if (!classroomIdentifier) return null;
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(classroomIdentifier);
  let classroom = null;
  if (isObjectId) {
    classroom = await Classroom.findById(classroomIdentifier);
  }
  if (!classroom) {
    classroom = await Classroom.findOne({
      $or: [
        { code: classroomIdentifier },
        { name: classroomIdentifier }
      ]
    });
  }
  return classroom;
};

// GET /classroom/:classroomId → Get all meetings for a classroom (accessible to enrolled students/admins)
router.get('/classroom/:classroomId', protect, async (req, res, next) => {
  try {
    const classroom = await resolveClassroom(req.params.classroomId);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    // Verify enrollment
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active');
    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not enrolled in this classroom' });
    }

    const meetings = await LiveMeeting.find({ classroom: classroom._id })
      .populate('createdBy', 'fullName')
      .sort({ scheduledAt: 1 });

    res.json({ success: true, meetings });
  } catch (error) {
    next(error);
  }
});

// GET /my → Student/Admin: get all meetings for enrolled classrooms
router.get('/my', protect, async (req, res, next) => {
  try {
    const classrooms = await Classroom.find({
      'students.student': req.user._id,
      'students.status': 'active',
      status: 'active'
    }).select('_id');

    const meetings = await LiveMeeting.find({
      classroom: { $in: classrooms.map((c) => c._id) },
      status: { $ne: 'cancelled' }
    })
      .populate('classroom', 'name code')
      .populate('createdBy', 'fullName')
      .sort({ scheduledAt: 1 });

    res.json({ success: true, meetings });
  } catch (error) {
    next(error);
  }
});

// GET /room/:roomId → Get meeting detail by roomId (used for lobby/room route)
router.get('/room/:roomId', protect, async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findOne({ roomId: req.params.roomId })
      .populate('classroom', 'name code students')
      .populate('createdBy', 'fullName email')
      .populate('attendees.student', 'fullName email avatar');

    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    const classroom = meeting.classroom;
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom ? classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active') : false;
    
    if (!isAdmin && !isEnrolled) {
      console.warn(`[Meeting Access Denied] User: ${req.user._id} (${req.user.role}) for Room: ${req.params.roomId}`);
      return res.status(403).json({ success: false, message: 'You are not authorized to view this meeting room. Please ensure you are enrolled in the classroom.' });
    }

    res.json({ success: true, meeting });
  } catch (error) {
    next(error);
  }
});

// POST /room/:roomId/join → Student/Admin joins by roomId
router.post('/room/:roomId/join', protect, async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findOne({ roomId: req.params.roomId })
      .populate('classroom', 'students');
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    const classroom = meeting.classroom;
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom ? classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active') : false;
    
    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not authorized to join this meeting room. Please ensure you are enrolled in the classroom.' });
    }

    const alreadyAttended = meeting.attendees.find(a => a.student.toString() === req.user._id.toString() && !a.leftAt);
    if (!alreadyAttended) {
      meeting.attendees.push({
        student: req.user._id,
        joinedAt: new Date()
      });
      await meeting.save();
    }

    res.json({
      success: true,
      message: 'Successfully joined meeting lobby',
      meeting: {
        _id: meeting._id,
        title: meeting.title,
        roomId: meeting.roomId,
        webexLink: meeting.webexLink,
        webexPassword: meeting.webexPassword,
        status: meeting.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /today → Admin: get today's scheduled/live meetings (for "Today's Classes" panel)
// IMPORTANT: must be defined BEFORE /:id to prevent 'today' being treated as an ObjectId
router.get('/today', protect, restrictTo('admin', 'superadmin'), async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meetings = await LiveMeeting.find({
      scheduledAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: 'cancelled' }
    })
      .populate('classroom', 'name code students')
      .sort({ scheduledAt: 1 });

    res.json({ success: true, meetings });
  } catch (error) {
    next(error);
  }
});

// GET /:id → Get meeting detail
router.get('/:id', protect, async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findById(req.params.id)
      .populate('classroom')
      .populate('createdBy', 'fullName')
      .populate('attendees.student', 'fullName email avatar');

    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    // Auth check
    const classroom = await Classroom.findById(meeting.classroom);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom ? classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active') : false;

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not authorized to view this meeting' });
    }

    res.json({ success: true, meeting });
  } catch (error) {
    next(error);
  }
});

// POST /:id/join → Student/Admin: join meeting room (auth check: enrolled in classroom)
router.post('/:id/join', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await LiveMeeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    const classroom = await Classroom.findById(meeting.classroom);
    const isAdmin = ['admin', 'superadmin'].includes(req.user.role);
    const isEnrolled = classroom ? classroom.students.some(s => s.student.toString() === req.user._id.toString() && s.status === 'active') : false;

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({ success: false, message: 'You are not authorized to join this meeting room' });
    }

    // Auto-log join attendance
    const alreadyAttended = meeting.attendees.find(a => a.student.toString() === req.user._id.toString() && !a.leftAt);
    if (!alreadyAttended) {
      meeting.attendees.push({
        student: req.user._id,
        joinedAt: new Date()
      });
      await meeting.save();
    }

    res.json({
      success: true,
      message: 'Successfully joined meeting lobby',
      meeting: {
        _id: meeting._id,
        title: meeting.title,
        roomId: meeting.roomId,
        webexLink: meeting.webexLink,
        webexPassword: meeting.webexPassword,
        status: meeting.status
      }
    });
  } catch (error) {
    next(error);
  }
});

// POST /:id/leave → Student leaves meeting room, log duration
router.post('/:id/leave', protect, async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    const attendee = meeting.attendees.find(a => a.student.toString() === req.user._id.toString() && !a.leftAt);
    if (attendee) {
      attendee.leftAt = new Date();
      const diffMs = attendee.leftAt - attendee.joinedAt;
      attendee.duration = Math.round(diffMs / 60000); // duration in minutes
      await meeting.save();
    }

    res.json({ success: true, message: 'Successfully left meeting room' });
  } catch (error) {
    next(error);
  }
});

// Admin-only endpoints (applied to routes below)
router.use(protect);
router.use(restrictTo('admin', 'superadmin'));

// POST / → Admin: create live meeting for classroom
router.post('/', async (req, res, next) => {
  try {
    const {
      classroom,
      title,
      description,
      scheduledAt,
      duration,
      sendWhatsApp = false,
      sendPortalNotification = true,
    } = req.body;

    if (!classroom || !title || !scheduledAt) {
      return res.status(400).json({ success: false, message: 'Classroom, title, and scheduled time are required' });
    }

    const classroomDoc = await resolveClassroom(classroom);
    if (!classroomDoc) {
      console.error('[Meeting Create Error] Classroom not found:', classroom);
      return res.status(404).json({ success: false, message: 'Classroom not found for meeting creation' });
    }

    console.log(`[Meeting Create] Creating Webex meeting for classroom: ${classroomDoc.name} (${classroomDoc._id})`);

    const uuid = crypto.randomUUID();
    let webexData = null;
    try {
      const { createWebexMeeting } = require('../services/webexService');
      webexData = await createWebexMeeting({
        title,
        start: scheduledAt,
        duration: duration || 60
      });
      console.log('[Meeting Create] Webex meeting created:', webexData.id);
    } catch (err) {
      console.error('[Webex Create Error]', err.message);
      return res.status(500).json({ success: false, message: 'Failed to create Webex meeting: ' + err.message });
    }

    const meeting = await LiveMeeting.create({
      classroom: classroomDoc._id,
      title,
      description,
      scheduledAt: new Date(scheduledAt),
      duration: duration || 60,
      createdBy: req.user._id,
      roomId: uuid,
      meetingLink: `/portal/live/${uuid}/room`,
      webexMeetingId: webexData.id,
      webexLink: webexData.webLink,
      webexPassword: webexData.password,
      notified: {
        whatsapp: !!sendWhatsApp,
        portal: !!sendPortalNotification,
        sentAt: (sendWhatsApp || sendPortalNotification) ? new Date() : null
      }
    });

    // Increment totalLiveSessions classroom stats
    await Classroom.findByIdAndUpdate(classroomDoc._id, {
      $inc: { 'stats.totalLiveSessions': 1 }
    });

    if (sendPortalNotification) {
      await notifyMeetingCreated(meeting);

      const studentIds = classroomDoc.students
        .filter((s) => s.status === 'active')
        .map((s) => s.student)
        .filter(Boolean);
      const notifications = studentIds.map((studentId) => ({
        recipient: studentId,
        type: 'live_session',
        title: `Join live class: ${title}`,
        message: `${title} is scheduled for ${new Date(scheduledAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}. Join link: ${process.env.CLIENT_URL || 'http://localhost:8080'}/student/webex/${uuid}`,
        priority: 'medium',
        actionUrl: `/student/webex/${uuid}`,
        metadata: {
          classroom: classroomDoc._id,
          meetingId: meeting._id,
          roomId: uuid,
        }
      }));
      if (notifications.length > 0) {
        const createdNotifications = await Notification.insertMany(notifications);
        try {
          const { getIO } = require('../config/socket');
          const io = getIO();
          createdNotifications.forEach((notif) => {
            io.to(`user:${notif.recipient}`).emit('notification:new', notif);
          });
        } catch (socketErr) {
          console.log('[Socket Error] Could not emit portal notifications:', socketErr.message);
        }
      }
    }

    if (sendWhatsApp) {
      console.log(`[WhatsApp Service Mock] Notify classroom students about: "${title}"`);
    }

    res.status(201).json({ success: true, message: 'Meeting scheduled successfully', meeting });
  } catch (error) {
    next(error);
  }
});

// PUT /:id → Admin: edit meeting
router.put('/:id', async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }
    res.json({ success: true, message: 'Meeting updated successfully', meeting });
  } catch (error) {
    next(error);
  }
});

// DELETE /:id → Admin: cancel meeting
router.delete('/:id', async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    meeting.status = 'cancelled';
    await meeting.save();

    // Delete from Webex if exists
    if (meeting.webexMeetingId) {
      try {
        const { deleteWebexMeeting } = require('../services/webexService');
        await deleteWebexMeeting(meeting.webexMeetingId);
      } catch (err) {
        console.error('[Webex Delete Error]', err.message);
      }
    }

    // Decrement totalLiveSessions classroom stats
    await Classroom.findByIdAndUpdate(meeting.classroom, {
      $inc: { 'stats.totalLiveSessions': -1 }
    });

    res.json({ success: true, message: 'Meeting cancelled successfully' });
  } catch (error) {
    next(error);
  }
});

// POST /:id/start → Admin: start meeting
router.post('/:id/start', async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await LiveMeeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    meeting.status = 'live';
    meeting.startedAt = new Date();
    await meeting.save();

    // Notify classroom students via socket
    try {
      const { getIO } = require('../config/socket');
      const io = getIO();
      io.to(`classroom:${meeting.classroom}`).emit('meeting:live', {
        meetingId: meeting._id,
        title: meeting.title,
        roomId: meeting.roomId
      });
      // also notify global admins/instructors
      io.emit('admin:class-started', { meetingId: meeting._id, roomId: meeting.roomId });
    } catch (socketErr) {
      console.log('[Socket Error] Could not emit class started alert:', socketErr.message);
    }

    res.json({ success: true, message: 'Live class started successfully', meeting });
  } catch (error) {
    next(error);
  }
});

// POST /:id/end → Admin: end meeting
router.post('/:id/end', async (req, res, next) => {
  try {
    const { id } = req.params;
    const meeting = await LiveMeeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    meeting.status = 'ended';
    meeting.endedAt = new Date();

    // Auto-mark leftAt for attendees still in room
    meeting.attendees.forEach(attendee => {
      if (!attendee.leftAt) {
        attendee.leftAt = meeting.endedAt;
        const diffMs = attendee.leftAt - attendee.joinedAt;
        attendee.duration = Math.round(diffMs / 60000);
      }
    });

    await meeting.save();

    // Emit ended socket alert
    try {
      const { getIO } = require('../config/socket');
      const io = getIO();
      io.to(`classroom:${meeting.classroom}`).emit('meeting:ended', { meetingId: meeting._id });
    } catch (socketErr) {
      console.log('[Socket Error] Could not emit class ended alert:', socketErr.message);
    }

    res.json({ success: true, message: 'Live class ended successfully', meeting });
  } catch (error) {
    next(error);
  }
});

// GET /:id/attendance → Admin: get attendance list for this meeting
router.get('/:id/attendance', async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findById(req.params.id)
      .populate('attendees.student', 'fullName email phone avatar');

    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    res.json({ success: true, attendees: meeting.attendees });
  } catch (error) {
    next(error);
  }
});

// POST /:id/notify → Admin: re-send notifications
router.post('/:id/notify', async (req, res, next) => {
  try {
    const meeting = await LiveMeeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    }

    console.log(`[Notification Service Mock] Resending WhatsApp/Portal notification for meeting: "${meeting.title}"`);
    res.json({ success: true, message: 'Notifications resent successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
