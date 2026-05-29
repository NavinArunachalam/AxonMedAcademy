import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useClassroomStore } from "@/lib/classroomStore";

export const Route = createFileRoute("/_student/student/jitsi/$roomId")({
  component: JitsiRoom,
});

function JitsiRoom() {
  const { roomId } = Route.useParams();
  const navigate = useNavigate();
  const { currentUser } = useClassroomStore();
  
  const studentName = currentUser?.name || "Student";
  const studentEmail = currentUser?.email || "";

  const handleClose = () => {
    // Return to the dashboard or previous page
    navigate({ to: "/student/dashboard" });
  };

  return (
    <div className="absolute inset-0 z-50 bg-black">
      <JitsiMeeting
        domain="meet.jit.si"
        roomName={`HTA-${roomId}`}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: studentName,
          email: studentEmail,
        }}
        onApiReady={(externalApi) => {
          // Listen to the hung up event
          externalApi.addListener("videoConferenceLeft", () => {
            handleClose();
          });
          externalApi.addListener("readyToClose", () => {
            handleClose();
          });
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
          iframeRef.style.width = "100%";
        }}
      />
    </div>
  );
}
