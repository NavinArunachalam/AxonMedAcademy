import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { J as JitsiMeeting } from "./_libs/jitsi__react-sdk.mjs";
import { R as Route$3, G as useClassroomStore } from "./_ssr/router-CuPinYbg.mjs";
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
function JitsiRoom() {
  const {
    roomId
  } = Route$3.useParams();
  const navigate = useNavigate();
  const {
    currentUser
  } = useClassroomStore();
  const studentName = currentUser?.name || "Student";
  const studentEmail = currentUser?.email || "";
  const handleClose = () => {
    navigate({
      to: "/student/dashboard"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JitsiMeeting, { domain: "meet.jit.si", roomName: `HTA-${roomId}`, configOverwrite: {
    startWithAudioMuted: true,
    disableModeratorIndicator: true,
    startScreenSharing: true,
    enableEmailInStats: false
  }, interfaceConfigOverwrite: {
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
  }, userInfo: {
    displayName: studentName,
    email: studentEmail
  }, onApiReady: (externalApi) => {
    externalApi.addListener("videoConferenceLeft", () => {
      handleClose();
    });
    externalApi.addListener("readyToClose", () => {
      handleClose();
    });
  }, getIFrameRef: (iframeRef) => {
    iframeRef.style.height = "100%";
    iframeRef.style.width = "100%";
  } }) });
}
export {
  JitsiRoom as component
};
