import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, e as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-BVEkzrmj.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-display font-bold text-plum-dark", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream hover:bg-plum",
        children: "Back home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try again or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-plum-dark px-5 py-2.5 text-sm font-semibold text-cream",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-5 py-2.5 text-sm font-semibold", children: "Go home" })
    ] })
  ] }) });
}
const Route$x = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Axon Academy — Train. Certify. Get Placed." },
      { name: "description", content: "India's #1 paramedical training academy. Live classes, proctored exams, blockchain certificates, 95% placement rate across 200+ partner hospitals." },
      { property: "og:title", content: "Axon Academy" },
      { property: "og:description", content: "Train. Certify. Get placed in leading hospitals." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$x.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter$w = () => import("./placements-BhvZV741.mjs");
const Route$w = createFileRoute("/placements")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./login-D0lT60Xw.mjs");
const Route$v = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./faculty-CKTvX--s.mjs");
const Route$u = createFileRoute("/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./courses-D41pXkWk.mjs");
const Route$t = createFileRoute("/courses")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./contact-ByORprBQ.mjs");
const Route$s = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./blog-CtfMgOJq.mjs");
const Route$r = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./about-CVYP_zsH.mjs");
const Route$q = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("../_student-BMdXL8ca.mjs");
const Route$p = createFileRoute("/_student")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("../_admin-Do6QgMYj.mjs");
const Route$o = createFileRoute("/_admin")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./index-QFPkHxCg.mjs");
const Route$n = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_student.student.schedule-BGKATnSR.mjs");
const Route$m = createFileRoute("/_student/student/schedule")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("../_student.student.profile-BUMyXmI8.mjs");
const Route$l = createFileRoute("/_student/student/profile")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("../_student.student.messages-nVQ-69-f.mjs");
const Route$k = createFileRoute("/_student/student/messages")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("../_student.student.live-CD-eyfY9.mjs");
const Route$j = createFileRoute("/_student/student/live")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("../_student.student.exams-CR4pydml.mjs");
const Route$i = createFileRoute("/_student/student/exams")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("../_student.student.dashboard-BtEWGz6_.mjs");
const Route$h = createFileRoute("/_student/student/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("../_student.student.certificates-CE0doAz7.mjs");
const Route$g = createFileRoute("/_student/student/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("../_admin.admin.students-BtBbW0DI.mjs");
const Route$f = createFileRoute("/_admin/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("../_admin.admin.settings-Nao9yNaq.mjs");
const Route$e = createFileRoute("/_admin/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("../_admin.admin.placements-B8LXR61N.mjs");
const Route$d = createFileRoute("/_admin/admin/placements")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("../_admin.admin.finance-BLloRkjf.mjs");
const Route$c = createFileRoute("/_admin/admin/finance")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_admin.admin.faculty-R5kk8mOK.mjs");
const Route$b = createFileRoute("/_admin/admin/faculty")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("../_admin.admin.exams-DBlzgqzY.mjs");
const Route$a = createFileRoute("/_admin/admin/exams")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_admin.admin.dashboard-rI35KISv.mjs");
const Route$9 = createFileRoute("/_admin/admin/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_admin.admin.courses-C3J1AgAC.mjs");
const Route$8 = createFileRoute("/_admin/admin/courses")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_admin.admin.analytics-sIp5bdPx.mjs");
const Route$7 = createFileRoute("/_admin/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_student.student.my-courses.index-gWMar-Sg.mjs");
const Route$6 = createFileRoute("/_student/student/my-courses/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_student.student.classrooms.index-CyWZ-7qS.mjs");
const Route$5 = createFileRoute("/_student/student/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("../_admin.admin.classrooms.index-CYjjZBp6.mjs");
const Route$4 = createFileRoute("/_admin/admin/classrooms/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_student.student.jitsi._roomId-DxHOx7P5.mjs");
const Route$3 = createFileRoute("/_student/student/jitsi/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_student.student.course._id-B4gDKmPp.mjs");
const Route$2 = createFileRoute("/_student/student/course/$id")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_student.student.classroom._id-CJa7uIx7.mjs");
const Route$1 = createFileRoute("/_student/student/classroom/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_admin.admin.classrooms._id-DFoc9Pae.mjs");
const Route = createFileRoute("/_admin/admin/classrooms/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PlacementsRoute = Route$w.update({
  id: "/placements",
  path: "/placements",
  getParentRoute: () => Route$x
});
const LoginRoute = Route$v.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$x
});
const FacultyRoute = Route$u.update({
  id: "/faculty",
  path: "/faculty",
  getParentRoute: () => Route$x
});
const CoursesRoute = Route$t.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => Route$x
});
const ContactRoute = Route$s.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$x
});
const BlogRoute = Route$r.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$x
});
const AboutRoute = Route$q.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$x
});
const StudentRoute = Route$p.update({
  id: "/_student",
  getParentRoute: () => Route$x
});
const AdminRoute = Route$o.update({
  id: "/_admin",
  getParentRoute: () => Route$x
});
const IndexRoute = Route$n.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$x
});
const StudentStudentScheduleRoute = Route$m.update({
  id: "/student/schedule",
  path: "/student/schedule",
  getParentRoute: () => StudentRoute
});
const StudentStudentProfileRoute = Route$l.update({
  id: "/student/profile",
  path: "/student/profile",
  getParentRoute: () => StudentRoute
});
const StudentStudentMessagesRoute = Route$k.update({
  id: "/student/messages",
  path: "/student/messages",
  getParentRoute: () => StudentRoute
});
const StudentStudentLiveRoute = Route$j.update({
  id: "/student/live",
  path: "/student/live",
  getParentRoute: () => StudentRoute
});
const StudentStudentExamsRoute = Route$i.update({
  id: "/student/exams",
  path: "/student/exams",
  getParentRoute: () => StudentRoute
});
const StudentStudentDashboardRoute = Route$h.update({
  id: "/student/dashboard",
  path: "/student/dashboard",
  getParentRoute: () => StudentRoute
});
const StudentStudentCertificatesRoute = Route$g.update({
  id: "/student/certificates",
  path: "/student/certificates",
  getParentRoute: () => StudentRoute
});
const AdminAdminStudentsRoute = Route$f.update({
  id: "/admin/students",
  path: "/admin/students",
  getParentRoute: () => AdminRoute
});
const AdminAdminSettingsRoute = Route$e.update({
  id: "/admin/settings",
  path: "/admin/settings",
  getParentRoute: () => AdminRoute
});
const AdminAdminPlacementsRoute = Route$d.update({
  id: "/admin/placements",
  path: "/admin/placements",
  getParentRoute: () => AdminRoute
});
const AdminAdminFinanceRoute = Route$c.update({
  id: "/admin/finance",
  path: "/admin/finance",
  getParentRoute: () => AdminRoute
});
const AdminAdminFacultyRoute = Route$b.update({
  id: "/admin/faculty",
  path: "/admin/faculty",
  getParentRoute: () => AdminRoute
});
const AdminAdminExamsRoute = Route$a.update({
  id: "/admin/exams",
  path: "/admin/exams",
  getParentRoute: () => AdminRoute
});
const AdminAdminDashboardRoute = Route$9.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminAdminCoursesRoute = Route$8.update({
  id: "/admin/courses",
  path: "/admin/courses",
  getParentRoute: () => AdminRoute
});
const AdminAdminAnalyticsRoute = Route$7.update({
  id: "/admin/analytics",
  path: "/admin/analytics",
  getParentRoute: () => AdminRoute
});
const StudentStudentMyCoursesIndexRoute = Route$6.update({
  id: "/student/my-courses/",
  path: "/student/my-courses/",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomsIndexRoute = Route$5.update({
  id: "/student/classrooms/",
  path: "/student/classrooms/",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIndexRoute = Route$4.update({
  id: "/admin/classrooms/",
  path: "/admin/classrooms/",
  getParentRoute: () => AdminRoute
});
const StudentStudentJitsiRoomIdRoute = Route$3.update({
  id: "/student/jitsi/$roomId",
  path: "/student/jitsi/$roomId",
  getParentRoute: () => StudentRoute
});
const StudentStudentCourseIdRoute = Route$2.update({
  id: "/student/course/$id",
  path: "/student/course/$id",
  getParentRoute: () => StudentRoute
});
const StudentStudentClassroomIdRoute = Route$1.update({
  id: "/student/classroom/$id",
  path: "/student/classroom/$id",
  getParentRoute: () => StudentRoute
});
const AdminAdminClassroomsIdRoute = Route.update({
  id: "/admin/classrooms/$id",
  path: "/admin/classrooms/$id",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAdminAnalyticsRoute,
  AdminAdminCoursesRoute,
  AdminAdminDashboardRoute,
  AdminAdminExamsRoute,
  AdminAdminFacultyRoute,
  AdminAdminFinanceRoute,
  AdminAdminPlacementsRoute,
  AdminAdminSettingsRoute,
  AdminAdminStudentsRoute,
  AdminAdminClassroomsIdRoute,
  AdminAdminClassroomsIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const StudentRouteChildren = {
  StudentStudentCertificatesRoute,
  StudentStudentDashboardRoute,
  StudentStudentExamsRoute,
  StudentStudentLiveRoute,
  StudentStudentMessagesRoute,
  StudentStudentProfileRoute,
  StudentStudentScheduleRoute,
  StudentStudentClassroomIdRoute,
  StudentStudentCourseIdRoute,
  StudentStudentJitsiRoomIdRoute,
  StudentStudentClassroomsIndexRoute,
  StudentStudentMyCoursesIndexRoute
};
const StudentRouteWithChildren = StudentRoute._addFileChildren(StudentRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  StudentRoute: StudentRouteWithChildren,
  AboutRoute,
  BlogRoute,
  ContactRoute,
  CoursesRoute,
  FacultyRoute,
  LoginRoute,
  PlacementsRoute
};
const routeTree = Route$x._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$3 as R,
  Route$2 as a,
  Route$1 as b,
  Route as c,
  router as r
};
