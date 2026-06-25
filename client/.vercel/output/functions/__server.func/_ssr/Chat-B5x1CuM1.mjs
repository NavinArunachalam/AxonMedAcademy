import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as lookup } from "../_libs/socket.io-client.mjs";
import { ap as useClassroomStore, F as getChatUsers, M as getConversation, k as classroomStore, ab as sendMessage } from "./router-C73_oHkz.mjs";
import { W as MessageSquare, a9 as Search, aa as Send } from "../_libs/lucide-react.mjs";
const SOCKET_URL = "https://oc-pro-production.up.railway.app/api/v1".replace(/\/api\/v1$/, "");
function useChatSocket(onMessageReceived, currentUserId) {
  const socketRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!currentUserId) return;
    const token = classroomStore.getState().accessToken;
    const socket = lookup(SOCKET_URL, {
      auth: {
        token: token ? `Bearer ${token}` : void 0
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1e3
    });
    socket.on("connect", () => {
      console.log("[ChatSocket] Connected:", socket.id);
      socket.emit("join_user_room", currentUserId);
    });
    socket.on("receive_private_message", (data) => {
      console.log("[ChatSocket] Message received:", data);
      onMessageReceived(data);
    });
    socket.on("disconnect", () => {
      console.log("[ChatSocket] Disconnected");
    });
    socket.on("connect_error", (err) => {
      console.error("[ChatSocket] Connection error:", err);
    });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId, onMessageReceived, SOCKET_URL]);
  const sendMessage2 = reactExports.useCallback((receiverId, message) => {
    if (!socketRef.current || !currentUserId) return false;
    socketRef.current.emit("send_private_message", {
      senderId: currentUserId,
      receiverId,
      message
    });
    return true;
  }, [currentUserId]);
  return { sendMessage: sendMessage2 };
}
function Chat({ currentUserRole }) {
  const [chatUsers, setChatUsers] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [activeUserId, setActiveUserId] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [sending, setSending] = reactExports.useState(false);
  const messagesEndRef = reactExports.useRef(null);
  const { currentUser } = useClassroomStore();
  const currentUserId = currentUser?.id || "";
  const isStudent = currentUserRole === "student";
  const isFaculty = currentUserRole === "faculty";
  const isAdmin = currentUserRole === "admin";
  reactExports.useEffect(() => {
    if (!isStudent && !isFaculty && !isAdmin) {
      setLoading(false);
      return;
    }
    const fetchUsers = async () => {
      try {
        const users = await getChatUsers();
        setChatUsers(users);
      } catch (err) {
        console.error("Failed to fetch chat users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [isStudent, isFaculty, isAdmin]);
  reactExports.useEffect(() => {
    if (!activeUserId) {
      setMessages([]);
      return;
    }
    const fetchMessages = async () => {
      try {
        const msgs = await getConversation(activeUserId);
        setMessages(msgs);
      } catch (err) {
        console.error("Failed to fetch conversation:", err);
      }
    };
    fetchMessages();
  }, [activeUserId]);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleMessageReceived = reactExports.useCallback((msg) => {
    const isToMe = msg.receiverId._id === currentUserId;
    const isFromMe = msg.senderId._id === currentUserId;
    if (!isToMe && !isFromMe) return;
    const otherId = activeUserId;
    const isFromOther = msg.senderId._id === otherId;
    const isToOther = msg.receiverId._id === otherId;
    if (isFromOther || isToOther) {
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    } else if (isToMe && !otherId) {
      setActiveUserId(msg.senderId._id);
    }
    getChatUsers().then(setChatUsers).catch(console.error);
  }, [activeUserId, currentUserId]);
  const { sendMessage: socketSend } = useChatSocket(handleMessageReceived, currentUserId);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !activeUserId || sending) return;
    const content = text.trim();
    setText("");
    setSending(true);
    try {
      const sent = socketSend(activeUserId, content);
      if (!sent) {
        const msg = await sendMessage(activeUserId, content);
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setText(content);
    } finally {
      setSending(false);
    }
  };
  const activeUser = chatUsers.find((u) => u._id === activeUserId);
  const filteredUsers = chatUsers.filter(
    (u) => u.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const sortedMessages = reactExports.useMemo(() => {
    return [...messages].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };
  if (!isStudent && !isFaculty && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-[calc(100vh-180px)] bg-slate-50 rounded-3xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-12 w-12 text-slate-300 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-sm", children: "Messaging is available for students, faculty, and admin." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-white border border-border overflow-hidden h-[calc(100vh-80px)] flex flex-col md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "border-r border-border flex flex-col w-full md:w-[320px] shrink-0 bg-slate-50/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-plum-dark text-lg", children: isStudent ? "Faculty & Admin" : isFaculty ? "Students" : "All Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search...",
              className: "bg-transparent text-sm outline-none flex-1 text-slate-700"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-400", children: "Loading..." }) }) : filteredUsers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-6 text-sm text-slate-500", children: search ? "No users found." : "No users available for chat." }) : filteredUsers.map((user) => {
        const isActive = activeUserId === user._id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setActiveUserId(user._id),
            className: `w-full text-left px-4 py-4 flex items-start gap-3 border-b border-border/60 transition-colors ${isActive ? "bg-plum-dark/5" : "hover:bg-slate-100"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold shrink-0", children: getInitials(user.fullName) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: user.fullName }),
                  user.lastMessageTime && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-slate-400 shrink-0", children: new Date(user.lastMessageTime).toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit"
                  }) })
                ] }),
                user.lastMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs truncate mt-0.5 text-slate-500", children: user.lastMessage })
              ] })
            ]
          },
          user._id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex flex-col flex-1 h-full min-w-0 bg-white", children: activeUser ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "p-4 border-b border-border flex items-center gap-3 bg-white z-10 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold", children: getInitials(activeUser.fullName) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark", children: activeUser.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 capitalize", children: activeUser.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]", children: [
        sortedMessages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-slate-400 font-medium py-10", children: "Start the conversation..." }),
        sortedMessages.map((m, i, arr) => {
          const isMe = m.senderId._id === currentUserId;
          const showTime = i === 0 || new Date(m.createdAt).getTime() - new Date(arr[i - 1].createdAt).getTime() > 1e3 * 60 * 30;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            showTime && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] text-slate-400 mb-4 mt-2 font-mono uppercase tracking-widest", children: new Date(m.createdAt).toLocaleString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isMe ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `max-w-[75%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed ${isMe ? "bg-plum-dark text-cream rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"}`,
                children: m.message
              }
            ) })
          ] }, m._id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "p-4 border-t border-border bg-white flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: text,
            onChange: (e) => setText(e.target.value),
            placeholder: "Type a message...",
            className: "flex-1 rounded-full bg-slate-100 border border-slate-200 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-plum/30 transition-all text-slate-700"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: !text.trim() || sending,
            type: "submit",
            className: "grid h-12 w-12 place-items-center rounded-full bg-plum-dark text-lime hover:bg-plum transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-5 w-5 ml-1" })
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid place-items-center bg-slate-50 text-slate-400 text-sm", children: "Select a conversation to start messaging" }) })
  ] });
}
export {
  Chat as C
};
