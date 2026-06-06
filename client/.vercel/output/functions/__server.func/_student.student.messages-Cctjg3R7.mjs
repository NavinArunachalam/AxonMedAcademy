import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { V as useClassroomStore, I as messageActions } from "./_ssr/router-yTr2aInw.mjs";
import { a8 as Search, a9 as Send } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function Messages() {
  const {
    currentUser,
    threads
  } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const studentName = currentUser?.name || "";
  const myThreads = reactExports.useMemo(() => {
    return threads.filter((t) => t.participantIds.includes(studentId)).sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [threads, studentId]);
  const [activeThreadId, setActiveThreadId] = reactExports.useState(myThreads[0]?.id || null);
  const [text, setText] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const messagesEndRef = reactExports.useRef(null);
  const activeThread = myThreads.find((t) => t.id === activeThreadId);
  reactExports.useEffect(() => {
    if (activeThreadId) {
      messageActions.markRead(activeThreadId, studentId);
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [activeThreadId, myThreads.find((t) => t.id === activeThreadId)?.messages.length]);
  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !activeThreadId) return;
    messageActions.sendMessage(activeThreadId, studentId, studentName, text.trim());
    setText("");
  };
  const getOtherName = (t) => {
    const idx = t.participantIds.findIndex((id) => id !== studentId);
    return t.participantNames[idx] || "Unknown";
  };
  const filteredThreads = myThreads.filter((t) => getOtherName(t).toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-white border border-border overflow-hidden h-[calc(100vh-180px)] flex flex-col md:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "border-r border-border flex flex-col w-full md:w-[320px] shrink-0 bg-slate-50/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-plum-dark text-lg", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search...", className: "bg-transparent text-sm outline-none flex-1 text-slate-700" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
        filteredThreads.map((t) => {
          const otherName = getOtherName(t);
          const init = otherName.substring(0, 2).toUpperCase();
          const lastMsg = t.messages[t.messages.length - 1];
          const unread = t.messages.filter((m) => !m.read && m.senderId !== studentId).length;
          const isActive = activeThreadId === t.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveThreadId(t.id), className: `w-full text-left px-4 py-4 flex items-start gap-3 border-b border-border/60 transition-colors ${isActive ? "bg-plum-dark/5" : "hover:bg-slate-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold shrink-0", children: init }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-plum-dark truncate", children: otherName }),
                lastMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono text-slate-400 shrink-0", children: new Date(lastMsg.createdAt).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit"
                }) })
              ] }),
              lastMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs truncate mt-0.5 ${unread > 0 ? "font-semibold text-plum-dark" : "text-slate-500"}`, children: [
                lastMsg.senderId === studentId ? "You: " : "",
                lastMsg.text
              ] })
            ] }),
            unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center h-5 min-w-[20px] px-1 rounded-full bg-lime text-plum-dark text-[10px] font-bold mt-1 shadow-sm", children: unread })
          ] }, t.id);
        }),
        filteredThreads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-6 text-sm text-slate-500", children: "No messages found." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "flex flex-col flex-1 h-full min-w-0 bg-white", children: activeThread ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "p-4 border-b border-border flex items-center gap-3 bg-white z-10 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold", children: getOtherName(activeThread).substring(0, 2).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark", children: getOtherName(activeThread) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-emerald-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 block" }),
            " Support Staff"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]", children: [
        activeThread.messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-slate-400 font-medium py-10", children: "Start the conversation..." }),
        activeThread.messages.map((m, i, arr) => {
          const isMe = m.senderId === studentId;
          const showTime = i === 0 || new Date(m.createdAt).getTime() - new Date(arr[i - 1].createdAt).getTime() > 1e3 * 60 * 30;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            showTime && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[10px] text-slate-400 mb-4 mt-2 font-mono uppercase tracking-widest", children: new Date(m.createdAt).toLocaleString("en-IN", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit"
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${isMe ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[75%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed ${isMe ? "bg-plum-dark text-cream rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"}`, children: m.text }) })
          ] }, m.id);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSend, className: "p-4 border-t border-border bg-white flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: text, onChange: (e) => setText(e.target.value), placeholder: "Type a message...", className: "flex-1 rounded-full bg-slate-100 border border-slate-200 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-plum/30 transition-all text-slate-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !text.trim(), type: "submit", className: "grid h-12 w-12 place-items-center rounded-full bg-plum-dark text-lime hover:bg-plum transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-5 w-5 ml-1" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 grid place-items-center bg-slate-50 text-slate-400 text-sm", children: "Select a conversation to start messaging" }) })
  ] });
}
export {
  Messages as component
};
