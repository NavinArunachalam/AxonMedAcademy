import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { R as Route$3, B as getMeetingByRoomId } from "./_ssr/router-B58fWewC.mjs";
import { aq as X, ap as Video } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
function WebexRoom() {
  const {
    roomId
  } = Route$3.useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const meetingData = await getMeetingByRoomId(roomId);
        setMeeting(meetingData);
      } catch (err) {
        setError(err.message || "Failed to load meeting");
      } finally {
        setLoading(false);
      }
    };
    fetchMeeting();
  }, [roomId]);
  const handleClose = () => {
    navigate({
      to: "/student/dashboard"
    });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-black text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-12 w-12 animate-spin rounded-full border-4 border-plum border-t-transparent mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading Webex Class..." })
    ] }) });
  }
  if (error || !meeting) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-black text-white p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "Connection Error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-6", children: error || "Could not join the meeting room." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "rounded-full bg-plum px-6 py-2 font-bold hover:bg-plum-light transition-colors", children: "Back to Dashboard" })
    ] }) });
  }
  if (!meeting.webexLink) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-black text-white p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-4", children: "Incompatible Meeting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 mb-6", children: "This meeting was scheduled with Jitsi and cannot be opened in Webex." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "rounded-full bg-plum px-6 py-2 font-bold hover:bg-plum-light transition-colors", children: "Back to Dashboard" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-50 bg-[#060606] overflow-hidden flex flex-col items-center justify-center p-6 text-white font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-plum/20 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-6 left-6 right-6 flex items-center justify-between z-[60]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClose, className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 transition-all shadow-2xl", title: "Exit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold tracking-tight", children: meeting.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 font-medium uppercase tracking-widest", children: "Live Classroom" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[32px] p-8 lg:p-12 backdrop-blur-2xl shadow-2xl relative z-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 relative inline-block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 bg-gradient-to-br from-plum to-plum-dark rounded-[24px] flex items-center justify-center mx-auto shadow-2xl rotate-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-10 w-10 text-white -rotate-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 h-6 w-6 bg-lime rounded-full border-4 border-[#060606] animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-2", children: "Class is ready!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 mb-8 max-w-sm mx-auto", children: "The instructor has started the session. Click below to join the live class." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: meeting.webexLink, target: "_blank", rel: "noopener noreferrer", className: "w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-black px-8 py-5 font-bold text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl shadow-white/5", children: "Join Live Class" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30 pt-2 uppercase tracking-widest font-bold", children: "Options" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-2xl p-4 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/40 uppercase font-bold mb-1", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-mono font-bold text-lime", children: meeting.webexPassword || "None" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: meeting.webexLink, target: "_blank", rel: "noopener noreferrer", className: "bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-all flex flex-col justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/40 uppercase font-bold mb-1", children: "App Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", children: "Open Webex App" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 pt-8 border-t border-white/10 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-1 bg-lime rounded-full" }),
          " Technical Help"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-xs text-white/40 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• If the link doesn't open, ensure pop-ups are allowed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            "• Use the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Password" }),
            " shown above if prompted."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• For the best experience, we recommend the Webex Desktop App." })
        ] })
      ] })
    ] })
  ] });
}
export {
  WebexRoom as component
};
