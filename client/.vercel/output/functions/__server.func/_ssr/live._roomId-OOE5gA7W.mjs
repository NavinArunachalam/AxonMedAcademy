import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navigate, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as Provider_default, u as useDispatch, a as useSelector } from "../_libs/react-redux.mjs";
import { c as configureStore, a as createSlice } from "../_libs/reduxjs__toolkit.mjs";
import { ap as useClassroomStore, R as Route$s, Z as heartbeatMeetingByRoomId, $ as joinMeetingByRoomId, a0 as leaveMeetingByRoomId, i as api } from "./router-78ZVeuz1.mjs";
import { l as lookup } from "../_libs/socket.io-client.mjs";
import { W, u as ur, V as Ve, B as Bt, a as ae } from "../_libs/livekit__components-react.mjs";
import { T as Track } from "../_libs/livekit-client.mjs";
import "../_libs/firebase.mjs";
import "../_libs/firebase__messaging.mjs";
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
import "../_libs/use-sync-external-store.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/firebase__app.mjs";
import "../_libs/firebase__component.mjs";
import "../_libs/firebase__util.mjs";
import "../_libs/firebase__logger.mjs";
import "../_libs/idb.mjs";
import "../_libs/firebase__installations.mjs";
import "../_libs/engine.io-client.mjs";
import "../_libs/xmlhttprequest-ssl.mjs";
import "fs";
import "url";
import "child_process";
import "http";
import "https";
import "../_libs/engine.io-parser.mjs";
import "../_libs/socket.io__component-emitter.mjs";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/ws.mjs";
import "events";
import "net";
import "tls";
import "zlib";
import "buffer";
import "../_libs/socket.io-parser.mjs";
const saved = (() => {
  try {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    return u && t ? { user: JSON.parse(u), token: t } : null;
  } catch {
    return null;
  }
})();
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: saved?.user || null,
    token: saved?.token || null,
    isAuthenticated: !!saved
  },
  reducers: {
    loginSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
    setGuestUser(state, { payload }) {
      state.user = payload;
      state.token = null;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});
const { loginSuccess, setGuestUser, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
const meetingSlice = createSlice({
  name: "meeting",
  initialState: {
    roomId: null,
    status: "idle",
    // idle | waiting | live | ended | rejected | error
    participants: [],
    // [{ socketId, name, role, audio, video }]
    waitingList: [],
    // [{ socketId, name }]
    messages: [],
    // [{ senderId, senderName, message, timestamp, _unread, _system }]
    activePanel: null,
    // null | 'chat' | 'participants' | 'waiting'
    isScreenSharing: false,
    raisedHands: [],
    // [{ socketId, name }]
    viewMode: "gallery",
    // 'gallery' | 'speaker'
    speakerSocketId: null
    // socketId of the pinned/spotlighted participant
  },
  reducers: {
    setRoomId(state, { payload }) {
      state.roomId = payload;
    },
    setStatus(state, { payload }) {
      state.status = payload;
    },
    setParticipants(state, { payload }) {
      state.participants = payload;
    },
    addParticipant(state, { payload }) {
      if (!state.participants.find((p) => p.socketId === payload.socketId))
        state.participants.push({ audio: true, video: true, ...payload });
    },
    removeParticipant(state, { payload: socketId }) {
      state.participants = state.participants.filter((p) => p.socketId !== socketId);
    },
    updateParticipantMedia(state, { payload: { socketId, audio, video } }) {
      const p = state.participants.find((p2) => p2.socketId === socketId);
      if (p) {
        if (audio !== void 0) p.audio = audio;
        if (video !== void 0) p.video = video;
      }
    },
    addToWaiting(state, { payload }) {
      if (!state.waitingList.find((w) => w.socketId === payload.socketId))
        state.waitingList.push(payload);
    },
    removeFromWaiting(state, { payload: socketId }) {
      state.waitingList = state.waitingList.filter((w) => w.socketId !== socketId);
    },
    // Mark as unread automatically unless chat panel is currently open
    addMessage(state, { payload }) {
      state.messages.push({
        ...payload,
        _unread: state.activePanel !== "chat" && !payload._system
      });
    },
    // Clear unread flag on all messages (called when chat panel opens)
    markMessagesRead(state) {
      state.messages.forEach((m) => {
        m._unread = false;
      });
    },
    clearMessages(state) {
      state.messages = [];
    },
    setActivePanel(state, { payload }) {
      const next = state.activePanel === payload ? null : payload;
      state.activePanel = next;
      if (next === "chat") {
        state.messages.forEach((m) => {
          m._unread = false;
        });
      }
    },
    closePanel(state) {
      state.activePanel = null;
    },
    setScreenSharing(state, { payload }) {
      state.isScreenSharing = payload;
    },
    addRaisedHand(state, { payload }) {
      if (!state.raisedHands.find((h) => h.socketId === payload.socketId))
        state.raisedHands.push(payload);
    },
    removeRaisedHand(state, { payload: socketId }) {
      state.raisedHands = state.raisedHands.filter((h) => h.socketId !== socketId);
    },
    setViewMode(state, { payload }) {
      state.viewMode = payload;
    },
    setSpeaker(state, { payload }) {
      state.speakerSocketId = payload;
    },
    resetMeeting() {
      return {
        roomId: null,
        status: "idle",
        participants: [],
        waitingList: [],
        messages: [],
        activePanel: null,
        isScreenSharing: false,
        raisedHands: [],
        viewMode: "gallery",
        speakerSocketId: null
      };
    }
  }
});
const {
  setRoomId,
  setStatus,
  setParticipants,
  addParticipant,
  removeParticipant,
  updateParticipantMedia,
  addToWaiting,
  removeFromWaiting,
  addMessage,
  markMessagesRead,
  clearMessages,
  setActivePanel,
  closePanel,
  setScreenSharing,
  addRaisedHand,
  removeRaisedHand,
  setViewMode,
  setSpeaker,
  resetMeeting
} = meetingSlice.actions;
const meetingReducer = meetingSlice.reducer;
const store = configureStore({
  reducer: {
    auth: authReducer,
    meeting: meetingReducer
  }
});
function playJoinSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + delay + 0.3);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.32);
    });
  } catch {
  }
}
function playHandSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.42);
  } catch {
  }
}
const SOCKET_URL = "https://oc-pro-production.up.railway.app";
let socket = null;
function getSocket() {
  return socket;
}
function connectSocket({ token, guestName } = {}) {
  if (socket && socket.connected) return socket;
  const auth = {};
  if (token) auth.token = token;
  if (guestName) auth.guestName = guestName;
  socket = lookup(SOCKET_URL, {
    auth,
    // Start with polling so mobile carrier proxies don't block the connection.
    // Socket.IO will automatically upgrade to WebSocket once polling is stable.
    transports: ["polling", "websocket"],
    upgrade: true,
    // Longer timeouts for Render cold-starts and slow mobile networks
    timeout: 2e4,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1e3,
    reconnectionDelayMax: 5e3
  });
  return socket;
}
function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
function VideoTile({
  trackRef,
  // camera (or screen) TrackReference
  audioTrackRef,
  // microphone TrackReference (separate from camera)
  name,
  isLocal,
  audioEnabled = true,
  videoEnabled = true,
  isScreenShare = false
}) {
  const videoHolderRef = reactExports.useRef(null);
  const letter = name?.charAt(0)?.toUpperCase() || "?";
  const showVideo = trackRef && videoEnabled;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "video-tile",
      ref: videoHolderRef,
      style: {
        position: "relative",
        background: "#0F0820",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      },
      children: [
        showVideo && trackRef && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bt,
          {
            trackRef,
            style: {
              width: "100%",
              height: "100%",
              objectFit: isScreenShare ? "contain" : "cover",
              transform: isLocal && !isScreenShare ? "scaleX(-1)" : "none"
            }
          }
        ),
        !isLocal && audioEnabled && audioTrackRef && /* @__PURE__ */ jsxRuntimeExports.jsx(ae, { trackRef: audioTrackRef }),
        !showVideo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F0820 0%, #1A0D3A 100%)",
          position: "absolute",
          inset: 0
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #E879F9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "700",
          color: "white",
          boxShadow: "0 0 20px rgba(124,58,237,0.5)",
          fontFamily: "Plus Jakarta Sans, sans-serif"
        }, children: letter }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          position: "absolute",
          bottom: "3px",
          left: "8px",
          right: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            fontSize: "10px",
            fontWeight: "600",
            padding: "2px 6px 2px 2px",
            borderRadius: "99px",
            maxWidth: "60%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#7C3AED,#E879F9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              fontWeight: "700",
              color: "#fff",
              flexShrink: 0
            }, children: letter }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: [
              name,
              isLocal ? " (You)" : ""
            ] })
          ] }),
          !audioEnabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            background: "rgba(255,74,106,0.85)",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
          ] }) })
        ] }),
        showVideo && isScreenShare && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.4)",
              opacity: 0,
              transition: "opacity 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              zIndex: 10
            },
            onMouseEnter: (e) => e.currentTarget.style.opacity = 1,
            onMouseLeave: (e) => e.currentTarget.style.opacity = 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  if (videoHolderRef.current) {
                    if (document.fullscreenElement) document.exitFullscreen().catch(() => {
                    });
                    else videoHolderRef.current.requestFullscreen().catch(() => {
                    });
                  }
                },
                style: {
                  background: "rgba(124,58,237,0.85)",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                  backdropFilter: "blur(4px)",
                  pointerEvents: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" }) }),
                  "Full Screen"
                ]
              }
            )
          }
        ),
        isScreenShare && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          top: "8px",
          left: "8px",
          background: "rgba(124,58,237,0.9)",
          color: "white",
          fontSize: "11px",
          fontWeight: "700",
          padding: "3px 8px",
          borderRadius: "5px",
          zIndex: 11
        }, children: "Screen" })
      ]
    }
  );
}
const S = {
  root: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#030108",
    overflow: "hidden",
    minHeight: 0,
    minWidth: 0
  },
  mainWrapper: {
    position: "relative",
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    overflow: "hidden"
  },
  strip: (visible) => ({
    position: "relative",
    width: "100%",
    background: "rgba(3, 1, 8, 0.92)",
    backdropFilter: "blur(8px)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    overflowX: "auto",
    flexShrink: 0,
    height: visible ? void 0 : "0px",
    overflow: visible ? "auto" : "hidden",
    transition: "height 0.22s cubic-bezier(0.4,0,0.2,1)",
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(124,58,237,0.4) transparent",
    WebkitOverflowScrolling: "touch"
  }),
  thumb: (active) => ({
    flexShrink: 0,
    width: "90px",
    height: "65px",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    border: active ? "2px solid #7C3AED" : "2px solid rgba(255,255,255,0.12)",
    boxShadow: active ? "0 0 0 2px rgba(124,58,237,0.4)" : "0 2px 8px rgba(0,0,0,0.5)",
    position: "relative",
    transition: "border-color 0.18s, box-shadow 0.18s, transform 0.15s",
    transform: active ? "scale(1.05)" : "scale(1)"
  }),
  floatToggleBtn: (stripVisible) => ({
    position: "absolute",
    bottom: "12px",
    right: "12px",
    width: "36px",
    height: "36px",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#fff",
    zIndex: 20,
    transition: "background 0.18s"
  }),
  thumbLabel: {
    position: "absolute",
    bottom: "4px",
    left: "4px",
    right: "4px",
    background: "rgba(0,0,0,0.65)",
    color: "#fff",
    fontSize: "6px",
    fontWeight: "600",
    padding: "2px 5px",
    borderRadius: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "Plus Jakarta Sans, sans-serif",
    pointerEvents: "none"
  },
  activeIndicator: {
    position: "absolute",
    top: "4px",
    left: "4px",
    width: "8px",
    height: "8px",
    background: "#7C3AED",
    borderRadius: "50%",
    pointerEvents: "none"
  },
  grid: (cols) => ({
    flex: 1,
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "6px",
    padding: "8px",
    overflow: "hidden",
    minHeight: 0
  })
};
function ChevronIcon({ up }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: up ? /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "18 15 12 9 6 15" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "6 9 12 15 18 9" }) });
}
function PeopleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 21v-2a4 4 0 00-3-3.87" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 010 7.75" })
  ] });
}
function VideoGrid() {
  const { viewMode, speakerSocketId, participants } = useSelector((s) => s.meeting);
  const { currentUser } = useClassroomStore();
  const [focusedTileId, setFocusedTileId] = reactExports.useState(null);
  const [stripVisible, setStripVisible] = reactExports.useState(true);
  const stripRef = reactExports.useRef(null);
  const cameraTracks = ur([{ source: Track.Source.Camera, withPlaceholder: true }]);
  const screenTracks = ur([{ source: Track.Source.ScreenShare, withPlaceholder: false }]);
  const micTracks = ur([{ source: Track.Source.Microphone, withPlaceholder: false }]);
  const micByIdentity = Object.fromEntries(micTracks.map((t) => [t.participant.identity, t]));
  const allTiles = [];
  screenTracks.forEach((t) => {
    allTiles.push({
      id: t.participant.identity + "_screen",
      trackRef: t,
      audioTrackRef: void 0,
      name: `${t.participant.name || t.participant.identity}'s Screen`,
      isLocal: t.participant.isLocal,
      isScreen: true,
      audio: false,
      video: true
    });
  });
  cameraTracks.forEach((t) => {
    const identity = t.participant.identity;
    allTiles.push({
      id: identity,
      trackRef: t,
      audioTrackRef: micByIdentity[identity],
      name: t.participant.name || identity,
      isLocal: t.participant.isLocal,
      isScreen: false,
      audio: t.participant.isMicrophoneEnabled,
      video: t.participant.isCameraEnabled
    });
  });
  const total = allTiles.length;
  if (total === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, background: "#030108" } });
  const screenTile = allTiles.find((t) => t.isScreen);
  const staffTile = allTiles.find((tile) => {
    const role = tile.isLocal ? currentUser?.role || "student" : participants.find((p) => p.name === tile.name)?.role || "student";
    return ["staff", "admin", "superadmin"].includes(role);
  });
  const defaultFocusedId = screenTile?.id ?? staffTile?.id ?? allTiles[0]?.id;
  const activeFocusedId = focusedTileId && allTiles.some((t) => t.id === focusedTileId) ? focusedTileId : defaultFocusedId;
  const handleThumbClick = (tileId) => {
    setFocusedTileId(tileId);
    setStripVisible(true);
    if (stripRef.current) {
      const el = stripRef.current.querySelector(`[data-tile-id="${tileId}"]`);
      el?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }
  };
  if (total === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, minHeight: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      VideoTile,
      {
        trackRef: allTiles[0].trackRef,
        audioTrackRef: allTiles[0].audioTrackRef,
        name: allTiles[0].name,
        isLocal: allTiles[0].isLocal,
        audioEnabled: allTiles[0].audio,
        videoEnabled: allTiles[0].video,
        isScreenShare: allTiles[0].isScreen
      }
    ) });
  }
  const mainTile = allTiles.find((t) => t.id === activeFocusedId) || allTiles[0];
  allTiles.filter((t) => t.id !== mainTile.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.root, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mainWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoTile,
        {
          trackRef: mainTile.trackRef,
          audioTrackRef: mainTile.audioTrackRef,
          name: mainTile.name,
          isLocal: mainTile.isLocal,
          videoEnabled: mainTile.video,
          isScreenShare: mainTile.isScreen
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          title: stripVisible ? "Hide participants" : "Show participants",
          onClick: () => setStripVisible((v) => !v),
          style: S.floatToggleBtn(stripVisible),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronIcon, { up: !stripVisible })
        }
      ),
      !stripVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "absolute",
        bottom: "1px",
        right: "60px",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        color: "rgba(255,255,255,0.8)",
        fontSize: "12px",
        fontWeight: "600",
        padding: "6px 10px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        zIndex: 20
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PeopleIcon, {}),
        total,
        " participants"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: stripRef,
        style: S.strip(stripVisible),
        "aria-hidden": !stripVisible,
        children: allTiles.map((tile) => {
          const isActive = tile.id === mainTile.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-tile-id": tile.id,
              style: S.thumb(isActive),
              onClick: () => handleThumbClick(tile.id),
              title: `Switch to ${tile.name}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  VideoTile,
                  {
                    trackRef: tile.trackRef,
                    audioTrackRef: tile.audioTrackRef,
                    name: tile.name,
                    isLocal: tile.isLocal,
                    audioEnabled: tile.audio,
                    videoEnabled: tile.video && !isActive,
                    isScreenShare: tile.isScreen
                  }
                ),
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.activeIndicator })
              ]
            },
            tile.id
          );
        })
      }
    )
  ] });
}
const MicIcon = ({ on }) => on ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })
] });
const CamIcon = ({ on }) => on ? /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
] });
const Btn = ({ icon, label, onClick, active = false, danger = false, off = false, badge = 0, id }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "button",
  {
    id,
    onClick,
    className: `ctrl-btn${active ? " active" : ""}${off ? " off" : ""}${danger ? " danger" : ""}`,
    title: label,
    style: { position: "relative" },
    children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      badge > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctrl-badge", children: badge > 9 ? "9+" : badge })
    ]
  }
);
function ControlBar({
  audioEnabled,
  videoEnabled,
  isScreenSharing,
  onToggleAudio,
  onToggleVideo,
  onScreenShare,
  onEnd,
  onRaiseHand,
  isStaff
}) {
  const dispatch = useDispatch();
  const { activePanel, waitingList, messages, raisedHands } = useSelector((s) => s.meeting);
  const unreadCount = messages.filter((m) => m._unread).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "control-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-bar-inner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-mic",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MicIcon, { on: audioEnabled }),
        label: audioEnabled ? "Mute" : "Unmute",
        onClick: onToggleAudio,
        off: !audioEnabled
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-cam",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CamIcon, { on: videoEnabled }),
        label: videoEnabled ? "Camera" : "No Video",
        onClick: onToggleVideo,
        off: !videoEnabled
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-share",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "8 21 12 17 16 21" })
        ] }),
        label: isScreenSharing ? "Stop" : "Share",
        onClick: onScreenShare,
        active: isScreenSharing
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-chat",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" }) }),
        label: "Chat",
        onClick: () => dispatch(setActivePanel("chat")),
        active: activePanel === "chat",
        badge: activePanel !== "chat" ? unreadCount : 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-people",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 21v-2a4 4 0 00-3-3.87" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 010 7.75" })
        ] }),
        label: "People",
        onClick: () => dispatch(setActivePanel("participants")),
        active: activePanel === "participants"
      }
    ),
    isStaff ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-waiting",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "12 8 12 12 14 14" })
        ] }),
        label: "Waiting",
        onClick: () => dispatch(setActivePanel("waiting")),
        active: activePanel === "waiting",
        badge: waitingList.length
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Btn,
      {
        id: "btn-hand",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15" })
        ] }),
        label: raisedHands.some((h) => h.socketId === getSocket()?.id) ? "Lower Hand" : "Raise Hand",
        onClick: onRaiseHand,
        active: raisedHands.some((h) => h.socketId === getSocket()?.id)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ctrl-divider" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { id: "btn-end", onClick: onEnd, className: "ctrl-btn danger btn-end", title: isStaff ? "End Class" : "Leave", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.42 19.42 0 013.07 8.83 19.79 19.79 0 01.75 .75 2 2 0 012.75 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.68 7.93" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "23", y1: "1", x2: "1", y2: "23" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isStaff ? "End" : "Leave" })
    ] })
  ] }) });
}
function ChatPanel({ roomId }) {
  const [input, setInput] = reactExports.useState("");
  const dispatch = useDispatch();
  const { messages } = useSelector((s) => s.meeting);
  const { user } = useSelector((s) => s.auth);
  const bottomRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const socket2 = getSocket();
    socket2?.emit("send-message", { roomId, message: input.trim() });
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", style: { color: "#fff" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💬 Live Chat" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => dispatch(closePanel()),
          style: { background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-messages", children: [
      messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", color: "var(--text-dim)", marginTop: "40px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "13px" }, children: "No messages yet. Say hello!" })
      ] }),
      messages.map((msg, i) => {
        if (msg._system) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "system-message", children: msg.message }, i);
        }
        const isMe = msg.senderName === user?.name;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `chat-bubble ${isMe ? "mine" : "theirs"}`, children: [
          !isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bubble-author", children: msg.senderName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bubble-body ${isMe ? "mine" : "theirs"}`, children: msg.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "10px", color: "var(--text-dim)", marginTop: "3px", textAlign: isMe ? "right" : "left" }, children: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) })
        ] }, i);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: send, className: "chat-input-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "chat-input",
          placeholder: "Type a message...",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) send(e);
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: !input.trim(),
          style: {
            background: "var(--primary)",
            border: "none",
            borderRadius: "8px",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: input.trim() ? 1 : 0.4,
            transition: "opacity 0.2s",
            flexShrink: 0
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
          ] })
        }
      )
    ] })
  ] });
}
function ParticipantsPanel({ localUser, roomId }) {
  const dispatch = useDispatch();
  const { participants, raisedHands } = useSelector((s) => s.meeting);
  const all = [
    { socketId: "local", name: localUser?.name || "You", role: localUser?.role, isLocal: true, audio: true, video: true },
    ...participants
  ];
  const isStaff = localUser?.role === "staff";
  const kickParticipant = (socketId) => {
    getSocket()?.emit("kick-participant", { roomId, targetSocketId: socketId });
  };
  const lowerHand = (socketId) => {
    dispatch(removeRaisedHand(socketId));
    getSocket()?.emit("lower-hand", { roomId, targetSocketId: socketId });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", style: { color: "#fff" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "👥 Participants (",
        all.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => dispatch(closePanel()),
          style: { background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }, children: [
      isStaff && raisedHands.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "var(--yellow)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✋" }),
          " Raised Hands (",
          raisedHands.length,
          ")"
        ] }),
        raisedHands.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          marginBottom: "6px",
          background: "rgba(255,181,71,0.1)",
          border: "1px solid rgba(255,181,71,0.35)",
          borderRadius: "10px"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "20px" }, children: "✋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--yellow)", fontWeight: "700", fontSize: "14px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: h.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "rgba(255,181,71,0.6)", fontSize: "11px", margin: "2px 0 0" }, children: "Raised their hand" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => lowerHand(h.socketId),
              title: "Lower hand",
              style: { background: "rgba(255,181,71,0.15)", border: "1px solid rgba(255,181,71,0.3)", borderRadius: "6px", padding: "4px 8px", color: "var(--yellow)", fontSize: "11px", fontWeight: "600", cursor: "pointer", flexShrink: 0, fontFamily: "inherit" },
              children: "Lower"
            }
          )
        ] }, h.socketId)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "1px", background: "var(--border-light)", margin: "8px 0 4px" } })
      ] }),
      all.map((p) => {
        const hasRaisedHand = raisedHands.some((h) => h.socketId === p.socketId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 12px",
          background: hasRaisedHand ? "rgba(255,181,71,0.06)" : "rgba(255,255,255,0.04)",
          borderRadius: "10px",
          border: hasRaisedHand ? "1px solid rgba(255,181,71,0.25)" : "1px solid var(--border-light)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            flexShrink: 0,
            background: `linear-gradient(135deg, ${p.role === "staff" ? "#7C3AED, #A855F7" : "#C084FC, #E879F9"})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            color: "#fff",
            fontSize: "15px"
          }, children: p.name?.charAt(0)?.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "#fff", fontWeight: "600", fontSize: "14px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "4px" }, children: [
              p.name,
              p.isLocal && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-dim)", fontWeight: "400" }, children: " (You)" }),
              hasRaisedHand && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "✋" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: p.role === "staff" ? "var(--primary-light)" : "var(--text-muted)", fontSize: "11px", margin: "2px 0 0", fontWeight: "600", textTransform: "capitalize" }, children: p.role === "staff" ? "⭐ Staff" : "🎓 Student" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "4px", flexShrink: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                title: p.audio === false ? "Muted" : "Mic on",
                style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.audio === false ? "rgba(255,74,106,0.2)" : "rgba(0,214,143,0.12)",
                  color: p.audio === false ? "var(--red)" : "var(--green)"
                },
                children: p.audio === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                title: p.video === false ? "Camera off" : "Camera on",
                style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: p.video === false ? "rgba(255,74,106,0.2)" : "rgba(0,214,143,0.12)",
                  color: p.video === false ? "var(--red)" : "var(--green)"
                },
                children: p.video === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" }) })
              }
            )
          ] }),
          isStaff && !p.isLocal && p.role !== "staff" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => kickParticipant(p.socketId),
              title: "Remove from class",
              style: {
                background: "none",
                border: "1px solid rgba(255,74,106,0.3)",
                borderRadius: "6px",
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--red)",
                flexShrink: 0,
                transition: "all 0.15s"
              },
              onMouseOver: (e) => e.currentTarget.style.background = "rgba(255,74,106,0.15)",
              onMouseOut: (e) => e.currentTarget.style.background = "none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] })
            }
          )
        ] }, p.socketId);
      })
    ] })
  ] });
}
function WaitingPanel({ roomId }) {
  const dispatch = useDispatch();
  const { waitingList } = useSelector((s) => s.meeting);
  const admit = (socketId) => {
    getSocket()?.emit("admit-student", { roomId, targetSocketId: socketId });
    dispatch(removeFromWaiting(socketId));
  };
  const reject = (socketId) => {
    getSocket()?.emit("reject-student", { roomId, targetSocketId: socketId });
    dispatch(removeFromWaiting(socketId));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "side-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", style: { color: "#fff" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "🚪 Waiting Room (",
        waitingList.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dispatch(closePanel()), style: { background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "4px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, overflowY: "auto", padding: "12px" }, children: waitingList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", color: "var(--text-dim)", marginTop: "40px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", marginBottom: "8px" }, children: "✅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "13px" }, children: "No students waiting" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
      waitingList.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => waitingList.forEach((w) => admit(w.socketId)),
          style: { width: "100%", background: "rgba(0,214,143,0.12)", border: "1px solid rgba(0,214,143,0.3)", color: "var(--green)", borderRadius: "10px", padding: "10px", cursor: "pointer", fontWeight: "600", fontSize: "13px", fontFamily: "inherit", marginBottom: "4px" },
          children: [
            "Admit All (",
            waitingList.length,
            ")"
          ]
        }
      ),
      waitingList.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-in", style: { background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-light)", borderRadius: "12px", padding: "14px 16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #E879F9)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", color: "#fff", fontSize: "15px", flexShrink: 0 }, children: w.name.charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#fff", fontWeight: "600", fontSize: "14px", margin: 0 }, children: w.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--text-dim)", fontSize: "11px", margin: "2px 0 0" }, children: "Wants to join" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => admit(w.socketId),
              style: { flex: 1, background: "var(--green)", border: "none", borderRadius: "8px", padding: "8px", color: "#fff", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" },
              children: "✓ Admit"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => reject(w.socketId),
              style: { flex: 1, background: "rgba(255,74,106,0.15)", border: "1px solid rgba(255,74,106,0.3)", borderRadius: "8px", padding: "8px", color: "var(--red)", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" },
              children: "✗ Deny"
            }
          )
        ] })
      ] }, w.socketId))
    ] }) })
  ] });
}
const LK_SERVER_URL = "wss://axon-6ojdv3b4.livekit.cloud";
function LiveClassroomWrapper() {
  const {
    currentUser
  } = useClassroomStore();
  if (!currentUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClassroomRoom, {}) });
}
function LiveClassroomRoom() {
  const {
    roomId: routeRoomId
  } = Route$s.useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    currentUser: user,
    accessToken: token
  } = useClassroomStore();
  const {
    status,
    activePanel,
    raisedHands
  } = useSelector((s) => s.meeting);
  reactExports.useEffect(() => {
    document.body.classList.add("in-meeting");
    document.documentElement.classList.add("in-meeting");
    return () => {
      document.body.classList.remove("in-meeting");
      document.documentElement.classList.remove("in-meeting");
    };
  }, []);
  const isStaff = user?.role !== "student";
  const [liveRoomId, setLiveRoomId] = reactExports.useState(routeRoomId);
  const roomIdRef = reactExports.useRef(routeRoomId);
  const [lkToken, setLkToken] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (status !== "live" || !liveRoomId || liveRoomId === "new") return;
    if (user?.role === "student") {
      const joinMeeting = async () => {
        try {
          await joinMeetingByRoomId(liveRoomId);
        } catch (err) {
          console.error("Failed to log meeting join in DB:", err);
        }
      };
      void joinMeeting();
      const heartbeatInterval = setInterval(async () => {
        try {
          await heartbeatMeetingByRoomId(liveRoomId);
        } catch (err) {
          console.error("Failed to send meeting heartbeat to DB:", err);
        }
      }, 3e4);
      return () => {
        clearInterval(heartbeatInterval);
        const leaveMeeting = async () => {
          try {
            await leaveMeetingByRoomId(liveRoomId);
          } catch (err) {
            console.error("Failed to log meeting leave in DB:", err);
          }
        };
        void leaveMeeting();
      };
    }
  }, [status, liveRoomId, user?.role]);
  const [audioEnabled, setAudioEnabled] = reactExports.useState(true);
  const [videoEnabled, setVideoEnabled] = reactExports.useState(true);
  const [isScreenSharingState, setIsScreenSharingState] = reactExports.useState(false);
  const lkActionsRef = reactExports.useRef(null);
  const [elapsed, setElapsed] = reactExports.useState(0);
  const timerRef = reactExports.useRef(null);
  const [linkCopied, setLinkCopied] = reactExports.useState(false);
  const [joinRequests, setJoinRequests] = reactExports.useState([]);
  const startTimer = reactExports.useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1e3);
  }, []);
  reactExports.useEffect(() => {
    roomIdRef.current = liveRoomId;
  }, [liveRoomId]);
  const fetchLiveKitToken = async (roomIdentifier, uName) => {
    try {
      const data = await api.get(`/livekit/get-token?room=${roomIdentifier}`);
      setLkToken(data.token);
    } catch (err) {
      console.error("LK Token fetch error:", err);
      dispatch(setStatus("error"));
    }
  };
  reactExports.useEffect(() => {
    let mounted = true;
    let socket2;
    const run = async () => {
      socket2 = connectSocket({
        token: token || void 0
      });
      socket2.on("connect_error", (err) => {
        if (mounted) dispatch(setStatus("error"));
      });
      socket2.on("admitted", ({
        roomId: admittedRoomId,
        existingParticipants
      }) => {
        if (!mounted) return;
        socket2.emit("join-room", {
          roomId: admittedRoomId
        }, (res) => {
          if (!mounted) return;
          dispatch(setStatus("live"));
          startTimer();
          fetchLiveKitToken(admittedRoomId, user?.name || "");
        });
      });
      socket2.on("rejected", () => {
        if (mounted) dispatch(setStatus("rejected"));
      });
      socket2.on("user-joined", ({
        socketId,
        name,
        role
      }) => {
        if (!mounted) return;
        dispatch(addParticipant({
          socketId,
          name,
          role
        }));
        dispatch(addMessage({
          senderId: "__system__",
          senderName: "System",
          message: `${name} joined the class`,
          timestamp: Date.now(),
          _system: true
        }));
      });
      socket2.on("join-request", ({
        socketId,
        name
      }) => {
        if (!mounted) return;
        dispatch(addToWaiting({
          socketId,
          name
        }));
        setJoinRequests((prev) => [...prev, {
          socketId,
          name,
          id: Date.now()
        }]);
        if (isStaff) playJoinSound();
      });
      socket2.on("user-left", ({
        socketId,
        name
      }) => {
        if (!mounted) return;
        dispatch(removeParticipant(socketId));
        dispatch(removeFromWaiting(socketId));
        if (name) {
          dispatch(addMessage({
            senderId: "__system__",
            senderName: "System",
            message: `${name} left the class`,
            timestamp: Date.now(),
            _system: true
          }));
        }
      });
      socket2.on("meeting-ended", () => {
        if (mounted) dispatch(setStatus("ended"));
      });
      socket2.on("kicked", () => {
        if (!mounted) return;
        dispatch(resetMeeting());
        navigate({
          to: "/"
        });
      });
      socket2.on("new-message", (msg) => {
        if (mounted) dispatch(addMessage(msg));
      });
      socket2.on("hand-raised", (data) => {
        if (mounted) {
          dispatch(addRaisedHand(data));
          if (isStaff) playHandSound();
        }
      });
      socket2.on("hand-lowered", ({
        socketId
      }) => {
        if (mounted) dispatch(removeRaisedHand(socketId));
      });
      const onConnect = () => {
        if (!mounted) return;
        if (isStaff) {
          socket2.emit("staff-create-room", {
            roomId: routeRoomId
          }, (res) => {
            if (!mounted) return;
            if (res?.error) {
              dispatch(setStatus("error"));
              return;
            }
            const resolvedRoomId = res.roomId;
            setLiveRoomId(resolvedRoomId);
            roomIdRef.current = resolvedRoomId;
            dispatch(setRoomId(resolvedRoomId));
            dispatch(setStatus("live"));
            startTimer();
            fetchLiveKitToken(resolvedRoomId, user?.name || "");
          });
        } else {
          dispatch(setStatus("waiting"));
          socket2.emit("student-request-join", {
            roomId: routeRoomId
          }, (res) => {
            if (res?.error) dispatch(setStatus("error"));
          });
        }
      };
      if (socket2.connected) {
        onConnect();
      } else {
        socket2.once("connect", onConnect);
      }
    };
    run();
    return () => {
      mounted = false;
      clearInterval(timerRef.current);
      const s = getSocket();
      if (s) {
        const r = roomIdRef.current;
        if (r) s.emit("leave-room", {
          roomId: r
        });
        disconnectSocket();
      }
      dispatch(resetMeeting());
    };
  }, [routeRoomId, token, user?.name, isStaff, startTimer, dispatch, navigate]);
  const getRoomId = () => liveRoomId || routeRoomId;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const displayRoomId = liveRoomId && liveRoomId !== "new" ? liveRoomId : routeRoomId;
  const handleEnd = () => {
    const roomId = getRoomId();
    const s = getSocket();
    if (isStaff) s?.emit("end-meeting", {
      roomId
    });
    else s?.emit("leave-room", {
      roomId
    });
    disconnectSocket();
    dispatch(resetMeeting());
    navigate({
      to: "/"
    });
  };
  const copyLink = () => {
    const roomId = getRoomId();
    if (!roomId) return;
    navigator.clipboard.writeText(`${window.location.origin}/live/${roomId}`).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    });
  };
  const dismissRequest = (id) => setJoinRequests((prev) => prev.filter((r) => r.id !== id));
  const admitFromToast = (req) => {
    getSocket()?.emit("admit-student", {
      roomId: getRoomId(),
      targetSocketId: req.socketId
    });
    dispatch(removeFromWaiting(req.socketId));
    dismissRequest(req.id);
  };
  const rejectFromToast = (req) => {
    getSocket()?.emit("reject-student", {
      roomId: getRoomId(),
      targetSocketId: req.socketId
    });
    dispatch(removeFromWaiting(req.socketId));
    dismissRequest(req.id);
  };
  if (status === "waiting") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      height: "100vh",
      background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.3), transparent), #070412",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "24px",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "8px"
      }, children: "Waiting for the host" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/"
      }), style: {
        background: "none",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.5)",
        borderRadius: "8px",
        padding: "8px 20px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "13px"
      }, children: "Cancel" })
    ] });
  }
  if (status === "rejected") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      height: "100vh",
      background: "#070412",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: "56px"
      }, children: "🚫" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "700"
      }, children: "Entry Declined" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", onClick: () => navigate({
        to: "/"
      }), children: "Return to Dashboard" })
    ] });
  }
  if (status === "ended") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      height: "100vh",
      background: "#070412",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: "56px"
      }, children: "🎓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "700"
      }, children: "Class Ended" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", onClick: () => navigate({
        to: "/"
      }), children: "Return to Dashboard" })
    ] });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      height: "100vh",
      background: "#070412",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        fontSize: "56px"
      }, children: "⚠️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
        color: "#fff",
        fontSize: "24px",
        fontWeight: "700"
      }, children: "Connection Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", onClick: () => navigate({
        to: "/"
      }), children: "Return to Dashboard" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meeting-layout animate-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meeting-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meeting-header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#fff",
          flexShrink: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "28px",
            height: "28px",
            borderRadius: "7px",
            background: "linear-gradient(135deg, #7C3AED, #A855F7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "logo-text", style: {
            fontWeight: "800",
            fontSize: "14px"
          }, children: "Axon Meeting" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "1px",
          height: "20px",
          background: "var(--border)",
          flexShrink: 0
        } }),
        displayRoomId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "room-code-badge", children: displayRoomId }),
        status === "live" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "live-badge", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "live-dot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "live-label", children: "Live" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meeting-header-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "timer-badge", children: fmt(elapsed) }),
        isStaff && displayRoomId && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyLink, style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: linkCopied ? "rgba(0,214,143,0.15)" : "rgba(124,58,237,0.15)",
          border: `1px solid ${linkCopied ? "rgba(0,214,143,0.3)" : "var(--border)"}`,
          borderRadius: "8px",
          padding: "6px 12px",
          color: linkCopied ? "var(--green)" : "var(--secondary)",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: "600",
          flexShrink: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "16 6 12 2 8 6" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "2", x2: "12", y2: "15" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "share-btn-text", children: linkCopied ? "Copied!" : "Share Link" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-avatar-container", style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid var(--border-light)",
          borderRadius: "99px",
          padding: "4px 10px 4px 4px",
          flexShrink: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7C3AED,#E879F9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
            color: "#fff"
          }, children: user?.name?.charAt(0)?.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "user-name-text", style: {
            fontSize: "12px",
            fontWeight: "600",
            color: "#fff",
            maxWidth: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }, children: user?.name })
        ] })
      ] })
    ] }),
    lkToken ? /* @__PURE__ */ jsxRuntimeExports.jsxs(W, { serverUrl: LK_SERVER_URL, token: lkToken, connect: true, audio: true, video: true, onDisconnected: handleEnd, style: {
      display: "flex",
      minHeight: 0,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meeting-main animate-in", style: {
        flex: 1,
        minHeight: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(VideoGrid, {}),
        activePanel === "chat" && /* @__PURE__ */ jsxRuntimeExports.jsx(ChatPanel, { roomId: getRoomId() }),
        activePanel === "participants" && /* @__PURE__ */ jsxRuntimeExports.jsx(ParticipantsPanel, { localUser: user, roomId: getRoomId() }),
        activePanel === "waiting" && isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(WaitingPanel, { roomId: getRoomId() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(_MediaControllerSync, { audioEnabled, videoEnabled, isScreenSharing: isScreenSharingState, isStaff, onSyncActions: (actions) => {
        lkActionsRef.current = actions;
      }, onToggleAudio: setAudioEnabled, onToggleVideo: setVideoEnabled, onToggleScreen: setIsScreenSharingState })
    ] }) : (
      /* Placeholder content while waiting for LK token */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#030108",
        minHeight: 0
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "40px",
          height: "40px",
          border: "3px solid rgba(124,58,237,0.3)",
          borderTopColor: "#7C3AED",
          borderRadius: "50%",
          animation: "spin 0.9s linear infinite"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          color: "rgba(255,255,255,0.4)",
          fontSize: "14px",
          fontWeight: "600"
        }, children: "Connecting media…" })
      ] }) })
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ControlBar, { audioEnabled, videoEnabled, isScreenSharing: isScreenSharingState, onToggleAudio: () => lkActionsRef.current ? lkActionsRef.current.toggleAudio() : setAudioEnabled((p) => !p), onToggleVideo: () => lkActionsRef.current ? lkActionsRef.current.toggleVideo() : setVideoEnabled((p) => !p), onScreenShare: () => lkActionsRef.current ? lkActionsRef.current.toggleScreen() : setIsScreenSharingState((p) => !p), onRaiseHand: () => {
      const socket2 = getSocket();
      const localHandRaised = raisedHands.some((h) => h.socketId === socket2?.id);
      if (localHandRaised) {
        socket2?.emit("lower-hand", {
          roomId: getRoomId(),
          targetSocketId: socket2?.id
        });
      } else {
        socket2?.emit("raise-hand", {
          roomId: getRoomId()
        });
      }
    }, onEnd: handleEnd, isStaff }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "fixed",
      top: "72px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      zIndex: 9999
    }, children: joinRequests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "request-popup animate-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#7C3AED,#E879F9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          color: "#fff"
        }, children: req.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
          color: "#fff",
          fontWeight: "700",
          fontSize: "14px",
          margin: 0
        }, children: req.name }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        display: "flex",
        gap: "8px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => admitFromToast(req), style: {
          flex: 1,
          background: "var(--green)",
          border: "none",
          borderRadius: "8px",
          padding: "9px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "13px",
          cursor: "pointer"
        }, children: "✓ Admit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => rejectFromToast(req), style: {
          flex: 1,
          background: "rgba(255,74,106,0.15)",
          border: "1px solid rgba(255,74,106,0.35)",
          borderRadius: "8px",
          padding: "9px",
          color: "var(--red)",
          fontWeight: "700",
          fontSize: "13px",
          cursor: "pointer"
        }, children: "✗ Deny" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dismissRequest(req.id), style: {
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--border-light)",
          borderRadius: "8px",
          width: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--text-muted)"
        }, children: "X" })
      ] })
    ] }, req.id)) })
  ] });
}
function _MediaControllerSync({
  audioEnabled,
  videoEnabled,
  isScreenSharing,
  isStaff,
  onSyncActions,
  onToggleAudio,
  onToggleVideo,
  onToggleScreen
}) {
  const {
    localParticipant
  } = Ve();
  const stateRef = reactExports.useRef({
    audioEnabled,
    videoEnabled,
    isScreenSharing
  });
  stateRef.current = {
    audioEnabled,
    videoEnabled,
    isScreenSharing
  };
  reactExports.useEffect(() => {
    onSyncActions({
      toggleAudio: async () => {
        const next = !stateRef.current.audioEnabled;
        try {
          await localParticipant.setMicrophoneEnabled(next);
        } catch (e) {
          console.warn("[LK] mic", e);
        }
        onToggleAudio(next);
      },
      toggleVideo: async () => {
        const next = !stateRef.current.videoEnabled;
        try {
          await localParticipant.setCameraEnabled(next);
        } catch (e) {
          console.warn("[LK] cam", e);
        }
        onToggleVideo(next);
      },
      toggleScreen: async () => {
        const next = !stateRef.current.isScreenSharing;
        if (next && !isStaff) {
          alert("Only instructors and administrators have permission to share screen.");
          return;
        }
        if (next && !navigator.mediaDevices?.getDisplayMedia) {
          alert("Screen sharing is not supported by this browser or device. Please try a different browser or desktop.");
          return;
        }
        try {
          await localParticipant.setScreenShareEnabled(next);
          onToggleScreen(next);
        } catch (e) {
          console.warn("[LK] screen", e);
          alert("Could not start screen sharing: " + (e?.message || String(e)));
        }
      }
    });
  }, [localParticipant]);
  return null;
}
export {
  LiveClassroomWrapper as component
};
