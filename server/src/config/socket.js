const { Server } = require('socket.io');

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    },
    pingTimeout: 60000
  });

  console.log('[Socket.io] Realtime Server initialized');

  io.on('connection', (socket) => {
    console.log(`[Socket.io] New client connected: ${socket.id}`);

    // Join room event
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`[Socket.io] Socket ${socket.id} joined room ${roomId}`);
    });

    // Join active live class room
    socket.on('join_live_room', (roomId) => {
      const liveRoom = `live:${roomId}`;
      socket.join(liveRoom);
      console.log(`[Socket.io] Socket ${socket.id} joined live room ${liveRoom}`);
    });

    // Live class chat messages
    socket.on('live_chat_message', (data) => {
      if (!data?.roomId || !data?.message) return;
      const liveRoom = `live:${data.roomId}`;
      socket.to(liveRoom).emit('live_chat_message', {
        message: data.message,
        sender: data.sender,
        createdAt: new Date().toISOString()
      });
    });

    // Raise hand event for live class
    socket.on('raise_hand', (data) => {
      if (!data?.roomId || !data?.sender) return;
      const liveRoom = `live:${data.roomId}`;
      socket.to(liveRoom).emit('student_raised_hand', {
        sender: data.sender,
        reason: data.reason || 'Requesting attention',
        timestamp: new Date().toISOString()
      });
    });

    // Proctor flags/incidents real-time event
    socket.on('proctor_incident', (data) => {
      console.log(`[Socket.io] AI proctoring flag received:`, data);
      socket.to(data.roomId).emit('proctor_flag_alert', data);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('[Socket.io] Cannot retrieve socket instance before initialization!');
  }
  return io;
};

module.exports = {
  initSocket,
  getIO
};
