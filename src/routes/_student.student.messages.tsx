import { createFileRoute } from "@tanstack/react-router";
import { Send, Search } from "lucide-react";
import { useClassroomStore, messageActions } from "@/lib/classroomStore";
import { useState, useMemo, useEffect, useRef } from "react";

export const Route = createFileRoute("/_student/student/messages")({
  component: Messages,
});

function Messages() {
  const { currentUser, threads } = useClassroomStore();
  const studentId = currentUser?.id || "";
  const studentName = currentUser?.name || "";

  const myThreads = useMemo(() => {
    return threads.filter(t => t.participantIds.includes(studentId))
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [threads, studentId]);

  const [activeThreadId, setActiveThreadId] = useState<string | null>(myThreads[0]?.id || null);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = myThreads.find(t => t.id === activeThreadId);

  useEffect(() => {
    if (activeThreadId) {
      messageActions.markRead(activeThreadId, studentId);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeThreadId, myThreads.find(t => t.id === activeThreadId)?.messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !activeThreadId) return;
    messageActions.sendMessage(activeThreadId, studentId, studentName, text.trim());
    setText("");
  };

  const getOtherName = (t: typeof myThreads[0]) => {
    const idx = t.participantIds.findIndex(id => id !== studentId);
    return t.participantNames[idx] || "Unknown";
  };

  const filteredThreads = myThreads.filter(t => 
    getOtherName(t).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl bg-white border border-border overflow-hidden h-[calc(100vh-180px)] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="border-r border-border flex flex-col w-full md:w-[320px] shrink-0 bg-slate-50/50">
        <div className="p-4 border-b border-border bg-white">
          <h2 className="font-display font-bold text-plum-dark text-lg">Messages</h2>
          <div className="mt-3 flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2.5">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-sm outline-none flex-1 text-slate-700" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredThreads.map(t => {
            const otherName = getOtherName(t);
            const init = otherName.substring(0, 2).toUpperCase();
            const lastMsg = t.messages[t.messages.length - 1];
            const unread = t.messages.filter(m => !m.read && m.senderId !== studentId).length;
            const isActive = activeThreadId === t.id;

            return (
              <button key={t.id} onClick={() => setActiveThreadId(t.id)} 
                className={`w-full text-left px-4 py-4 flex items-start gap-3 border-b border-border/60 transition-colors ${isActive ? "bg-plum-dark/5" : "hover:bg-slate-100"}`}>
                <div className="grid h-11 w-11 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold shrink-0">{init}</div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <div className="text-sm font-semibold text-plum-dark truncate">{otherName}</div>
                    {lastMsg && <div className="text-[10px] font-mono text-slate-400 shrink-0">{new Date(lastMsg.createdAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}</div>}
                  </div>
                  {lastMsg && (
                    <div className={`text-xs truncate mt-0.5 ${unread > 0 ? "font-semibold text-plum-dark" : "text-slate-500"}`}>
                      {lastMsg.senderId === studentId ? "You: " : ""}{lastMsg.text}
                    </div>
                  )}
                </div>
                {unread > 0 && <span className="grid place-items-center h-5 min-w-[20px] px-1 rounded-full bg-lime text-plum-dark text-[10px] font-bold mt-1 shadow-sm">{unread}</span>}
              </button>
            );
          })}
          {filteredThreads.length === 0 && (
            <div className="text-center p-6 text-sm text-slate-500">No messages found.</div>
          )}
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex flex-col flex-1 h-full min-w-0 bg-white">
        {activeThread ? (
          <>
            <header className="p-4 border-b border-border flex items-center gap-3 bg-white z-10 shadow-sm">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold">
                {getOtherName(activeThread).substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-plum-dark">{getOtherName(activeThread)}</div>
                <div className="text-xs text-emerald-600 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 block" /> Support Staff</div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]">
              {activeThread.messages.length === 0 && (
                <div className="text-center text-sm text-slate-400 font-medium py-10">Start the conversation...</div>
              )}
              {activeThread.messages.map((m, i, arr) => {
                const isMe = m.senderId === studentId;
                const showTime = i === 0 || new Date(m.createdAt).getTime() - new Date(arr[i-1].createdAt).getTime() > 1000 * 60 * 30; // 30 mins
                return (
                  <div key={m.id}>
                    {showTime && <div className="text-center text-[10px] text-slate-400 mb-4 mt-2 font-mono uppercase tracking-widest">{new Date(m.createdAt).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</div>}
                    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed ${isMe ? "bg-plum-dark text-cream rounded-br-sm" : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"}`}>
                        {m.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-border bg-white flex items-center gap-3">
              <input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..." className="flex-1 rounded-full bg-slate-100 border border-slate-200 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-plum/30 transition-all text-slate-700" />
              <button disabled={!text.trim()} type="submit" className="grid h-12 w-12 place-items-center rounded-full bg-plum-dark text-lime hover:bg-plum transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"><Send className="h-5 w-5 ml-1" /></button>
            </form>
          </>
        ) : (
          <div className="flex-1 grid place-items-center bg-slate-50 text-slate-400 text-sm">
            Select a conversation to start messaging
          </div>
        )}
      </section>
    </div>
  );
}
