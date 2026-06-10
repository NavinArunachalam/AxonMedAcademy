import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMeetingByRoomId } from "@/lib/api";
import { X, Video } from "lucide-react";

export const Route = createFileRoute("/_student/student/webex/$roomId")({
  component: WebexRoom,
});

function WebexRoom() {
  const { roomId } = Route.useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const meetingData = await getMeetingByRoomId(roomId);
        setMeeting(meetingData);
      } catch (err: any) {
        setError(err.message || "Failed to load meeting");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [roomId]);

  const handleClose = () => {
    navigate({ to: "/student/dashboard" });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-plum border-t-transparent mx-auto"></div>
          <p>Loading Webex Class...</p>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Connection Error</h1>
          <p className="text-gray-400 mb-6">{error || "Could not join the meeting room."}</p>
          <button 
            onClick={handleClose}
            className="rounded-full bg-plum px-6 py-2 font-bold hover:bg-plum-light transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // If meeting exists but no webex link (old meeting)
  if (!meeting.webexLink) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Incompatible Meeting</h1>
          <p className="text-gray-400 mb-6">This meeting was scheduled with Jitsi and cannot be opened in Webex.</p>
          <button 
            onClick={handleClose}
            className="rounded-full bg-plum px-6 py-2 font-bold hover:bg-plum-light transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#060606] overflow-hidden flex flex-col items-center justify-center p-6 text-white font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-plum/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header / Nav */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-[60]">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 transition-all shadow-2xl"
            title="Exit"
          >
            <X className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{meeting.title}</h1>
            <p className="text-xs text-white/40 font-medium uppercase tracking-widest">Live Classroom</p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[32px] p-8 lg:p-12 backdrop-blur-2xl shadow-2xl relative z-10 text-center">
        <div className="mb-8 relative inline-block">
          <div className="h-24 w-24 bg-gradient-to-br from-plum to-plum-dark rounded-[24px] flex items-center justify-center mx-auto shadow-2xl rotate-3">
             <Video className="h-10 w-10 text-white -rotate-3" />
          </div>
          <div className="absolute -top-2 -right-2 h-6 w-6 bg-lime rounded-full border-4 border-[#060606] animate-pulse" />
        </div>

        <h2 className="text-3xl font-bold mb-2">Class is ready!</h2>
        <p className="text-white/60 mb-8 max-w-sm mx-auto">
          The instructor has started the session. Click below to join the live class.
        </p>

        <div className="space-y-4">
          {/* Main Join Button */}
          <a 
            href={meeting.webexLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-white text-black px-8 py-5 font-bold text-lg hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl shadow-white/5"
          >
            Join Live Class
          </a>

          <p className="text-xs text-white/30 pt-2 uppercase tracking-widest font-bold">Options</p>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Password</p>
                <p className="text-lg font-mono font-bold text-lime">{meeting.webexPassword || "None"}</p>
             </div>
             <a 
                href={meeting.webexLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left hover:bg-white/10 transition-all flex flex-col justify-center"
             >
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">App Mode</p>
                <p className="text-sm font-bold">Open Webex App</p>
             </a>
          </div>
        </div>

        {/* Technical Help */}
        <div className="mt-12 pt-8 border-t border-white/10 text-left">
          <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
            <div className="h-1 w-1 bg-lime rounded-full" /> Technical Help
          </h4>
          <ul className="space-y-2 text-xs text-white/40 leading-relaxed">
            <li>• If the link doesn't open, ensure pop-ups are allowed.</li>
            <li>• Use the <strong>Password</strong> shown above if prompted.</li>
            <li>• For the best experience, we recommend the Webex Desktop App.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
