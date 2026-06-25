import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { d as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { a as Route$5 } from "./_ssr/router-78ZVeuz1.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
function RedirectToLive() {
  const {
    roomId
  } = Route$5.useParams();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    navigate({
      to: "/live/$roomId",
      params: {
        roomId
      }
    });
  }, [roomId, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center bg-black text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 h-12 w-12 animate-spin rounded-full border-4 border-plum border-t-transparent mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Connecting to Live Class..." })
  ] }) });
}
export {
  RedirectToLive as component
};
