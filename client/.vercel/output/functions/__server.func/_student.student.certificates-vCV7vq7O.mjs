import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { aj as useClassroomStore, m as computeCertificates } from "./_ssr/router-LScdOZhk.mjs";
import { aa as ShieldCheck, f as Award, D as Download, M as Lock } from "./_libs/lucide-react.mjs";
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
function Certificates() {
  const {
    currentUser,
    classrooms
  } = useClassroomStore();
  const name = currentUser?.name || "Student Name";
  const studentId = currentUser?.id || "";
  const certs = computeCertificates(classrooms, studentId);
  const enrolledClassrooms = classrooms.filter((c) => c.students.some((s) => s.id === studentId && s.status === "active"));
  const inProgress = enrolledClassrooms.filter((c) => !certs.some((cert) => cert.classroomId === c.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-plum-dark", children: "Certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Blockchain-verified credentials awarded upon course completion" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }),
        "All certificates verified on-chain"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
      certs.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl overflow-hidden border border-border bg-white shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] bg-gradient-to-br from-plum-dark to-plum p-6 text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-lime text-plum-dark shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full flex flex-col pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-lime font-bold", children: "Certificate of Completion" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-cream/70 text-xs", children: "This is to certify that" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold mt-1 text-lime", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-cream/80 text-xs leading-relaxed max-w-[85%]", children: "has successfully completed all requirements, passing all assessments for the program:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold leading-tight", children: c.program }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/70 mt-1 capitalize", children: c.classroomName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 border-t border-cream/20 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] text-lime/70", children: [
                  c.classroomId.toUpperCase(),
                  "-",
                  studentId.toUpperCase(),
                  "-",
                  new Date(c.earnedAt).getFullYear()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-cream/70 text-right", children: [
                  "Issued ",
                  new Date(c.earnedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })
                ] })
              ] })
            ] })
          ] })
        ] }),
        c.certificateUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-slate-50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.certificateUrl, target: "_blank", rel: "noreferrer", download: true, className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-semibold hover:bg-lime/90 shadow-sm transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          "Download PDF"
        ] }) }) }),
        !c.certificateUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center justify-between bg-slate-50 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
            " Verified"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "No certificate file uploaded yet" })
        ] })
      ] }, c.classroomId)),
      inProgress.map((c) => {
        const studentInfo = c.students.find((s) => s.id === studentId);
        const progress = studentInfo?.progress || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-dashed border-border bg-slate-50 p-8 flex flex-col justify-center items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-12 w-12 text-slate-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-slate-200 text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-display font-bold text-plum-dark text-lg", children: c.program }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1 capitalize", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 w-full max-w-[220px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] text-muted-foreground mb-1.5 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                progress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-slate-200 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-slate-400 transition-all rounded-full", style: {
              width: `${progress}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] mt-3 text-slate-500", children: "Complete all modules and pass all assessments with ≥60% to unlock." })
          ] })
        ] }, c.id);
      }),
      enrolledClassrooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full rounded-3xl border border-border bg-white p-12 text-center text-slate-500 text-sm", children: "You are not enrolled in any programs yet." })
    ] })
  ] });
}
export {
  Certificates as component
};
