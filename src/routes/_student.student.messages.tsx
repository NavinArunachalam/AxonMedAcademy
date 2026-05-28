import { createFileRoute } from "@tanstack/react-router";
import { Send, Search } from "lucide-react";

export const Route = createFileRoute("/_student/student/messages")({
  component: Messages,
});

const THREADS = [
  { n: "Dr. Meera Iyer", m: "Great answer on cannulation!", t: "2m", u: 2, init: "MI" },
  { n: "Batch 24 · General", m: "Anyone has the lab notes?", t: "12m", u: 5, init: "B24" },
  { n: "Placements Cell", m: "Apollo interview slot booked", t: "1h", init: "PC" },
  { n: "Dr. Anil Khanna", m: "Office hours 4–6 PM Tue", t: "3h", init: "AK" },
  { n: "Accounts", m: "Fee receipt attached", t: "1d", init: "AC" },
];

function Messages() {
  return (
    <div className="rounded-3xl bg-white border border-border overflow-hidden h-[calc(100vh-180px)] grid grid-cols-1 md:grid-cols-[320px_1fr]">
      <aside className="border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-display font-bold text-plum-dark">Messages</h2>
          <div className="mt-3 flex items-center gap-2 bg-secondary rounded-full px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search…" className="bg-transparent text-sm outline-none flex-1" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {THREADS.map((t, i) => (
            <button key={t.n} className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-border/60 ${i===0 ? "bg-secondary" : "hover:bg-secondary/50"}`}>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold shrink-0">{t.init}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <div className="text-sm font-semibold text-plum-dark truncate">{t.n}</div>
                  <div className="text-[10px] text-muted-foreground shrink-0">{t.t}</div>
                </div>
                <div className="text-xs text-muted-foreground truncate">{t.m}</div>
              </div>
              {t.u && <span className="grid place-items-center h-5 min-w-5 px-1 rounded-full bg-lime text-plum-dark text-[10px] font-bold">{t.u}</span>}
            </button>
          ))}
        </div>
      </aside>

      <section className="flex flex-col">
        <header className="p-4 border-b border-border flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime text-xs font-bold">MI</div>
          <div>
            <div className="font-semibold text-plum-dark">Dr. Meera Iyer</div>
            <div className="text-xs text-emerald-600">● Online</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-secondary/30">
          {[
            { me: false, t: "Hi Aanya! Your cannulation simulation went well today." },
            { me: false, t: "Make sure you review the bevel-up angle for tomorrow's practical." },
            { me: true, t: "Thank you, Dr. Iyer! Should I focus on antecubital sites?" },
            { me: false, t: "Yes — and dorsal hand for adults. Read pages 142–156." },
            { me: true, t: "Got it. Will do." },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? "bg-plum-dark text-cream rounded-br-md" : "bg-white border border-border rounded-bl-md"}`}>
                {m.t}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border flex items-center gap-2">
          <input placeholder="Type a message…" className="flex-1 rounded-full bg-secondary px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-plum" />
          <button className="grid h-10 w-10 place-items-center rounded-full bg-plum-dark text-lime hover:bg-plum"><Send className="h-4 w-4" /></button>
        </div>
      </section>
    </div>
  );
}
