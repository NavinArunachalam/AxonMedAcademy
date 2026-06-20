import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card } from "./_ssr/PortalShell-B5wQZJyj.mjs";
import { am as useClassroomStore, h as adminActions } from "./_ssr/router-BgLlorBt.mjs";
import { X as PenLine, O as Mail, Y as Phone, P as MapPin, G as GraduationCap, h as Briefcase, ap as X, a3 as Save } from "./_libs/lucide-react.mjs";
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
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
function EditProfileModal({
  onClose
}) {
  const {
    currentUser
  } = useClassroomStore();
  const [form, setForm] = reactExports.useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    adminActions.updateUser(currentUser.id, form);
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5 border-b border-slate-100 pb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-plum-dark", children: "Edit Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold", children: [
          "Email Address ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] lowercase opacity-60 font-normal", children: "(Login ID)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold", children: "Phone Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), placeholder: "+91 90000 00000", className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, className: "flex-1 rounded-full bg-slate-100 text-slate-600 py-2.5 text-sm font-semibold hover:bg-slate-200 transition-colors", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark text-cream py-2.5 text-sm font-bold shadow-sm hover:bg-plum transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Save Details"
        ] })
      ] })
    ] })
  ] }) });
}
function Profile() {
  const {
    currentUser,
    classrooms
  } = useClassroomStore();
  const [showEdit, setShowEdit] = reactExports.useState(false);
  const name = currentUser?.name || "Student Name";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const email = currentUser?.email || "No email";
  const phone = currentUser?.phone || "No phone added";
  const studentId = currentUser?.id || "";
  const enrolled = classrooms.filter((c) => c.students.some((s) => s.id === studentId));
  const activeClassrooms = enrolled.filter((c) => c.students.find((s) => s.id === studentId)?.status === "active");
  const programsEnrolled = Array.from(new Set(activeClassrooms.map((c) => c.program)));
  const joinDate = enrolled.length > 0 ? new Date(enrolled[0].students.find((s) => s.id === studentId).addedAt).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  }) : "Recently";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    showEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(EditProfileModal, { onClose: () => setShowEdit(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-plum-dark text-cream p-6 lg:p-8 relative overflow-hidden shadow-sm border border-plum-dark/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid opacity-15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl opacity-50 mix-blend-screen pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col sm:flex-row gap-6 items-start sm:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-24 w-24 place-items-center rounded-2xl bg-lime text-plum-dark font-display text-3xl font-bold shadow-lg shadow-lime/20 border-2 border-lime/50", children: initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-cream/70 mt-1.5 text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime/20 text-lime px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest leading-none block pt-1", children: "Student" }),
            " User ID: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: currentUser?.id }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50", children: "·" }),
            " Joined ",
            joinDate
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            programsEnrolled.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-cream/10 backdrop-blur-sm border border-cream/10 text-lime text-xs font-semibold px-3 py-1 rounded-full shadow-sm", children: p }, p)),
            programsEnrolled.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-cream/10 text-cream/50 text-xs px-3 py-1 rounded-full", children: "Not enrolled in any programs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowEdit(true), className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow-sm hover:bg-[#b0df2b] transition-colors shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }),
          " Edit Profile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border border-slate-100 shadow-sm p-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg", children: "Personal Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "Details used for your certificates and official communications." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 grid sm:grid-cols-2 gap-x-6 gap-y-5", children: [{
          l: "Full Name",
          v: name
        }, {
          l: "Email Address",
          v: email
        }, {
          l: "Phone Number",
          v: phone
        }, {
          l: "Account Role",
          v: "Student"
        }, {
          l: "Status",
          v: "Active"
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-1", children: f.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2", children: f.v })
        ] }, f.l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg", children: "Contact Detail Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-4 text-sm text-slate-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-slate-800 mt-0.5", children: [
              "Location details not provided.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 font-normal", children: "Contact admin to update." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-plum-dark text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5 text-plum" }),
          " Enrollment History"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-5", children: [
          enrolled.map((c) => {
            const me = c.students.find((s) => s.id === studentId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative pl-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-[7px] bottom-[-20px] w-px bg-slate-200 last:hidden" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute left-[-4.5px] top-[7px] h-[10px] w-[10px] rounded-full border-2 border-white shadow-sm ${me.status === "active" ? "bg-lime" : "bg-slate-400"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark", children: c.program }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-500 mt-0.5", children: [
                c.name,
                " · Enrolled ",
                new Date(me.addedAt).toLocaleDateString("en-IN", {
                  month: "short",
                  year: "numeric"
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-[10px] font-mono text-slate-600", children: [
                "ID: ",
                me.enrollmentId
              ] })
            ] }, c.id);
          }),
          enrolled.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-slate-500", children: "No enrollment history available." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-plum-dark text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-plum" }),
          " Academic Standing"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4 text-sm", children: [
          activeClassrooms.map((c) => {
            const me = c.students.find((s) => s.id === studentId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border border-slate-100 p-4 rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-plum-dark text-sm mb-3", children: c.program }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-center divide-x divide-slate-200", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 mb-1", children: "Progress" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-plum-dark", children: [
                    me.progress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 mb-1", children: "Attendance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-plum-dark", children: [
                    me.attendance,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 mb-1", children: "Quiz Avg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-plum-dark", children: [
                    me.quizAvg,
                    "%"
                  ] })
                ] })
              ] })
            ] }, c.id);
          }),
          activeClassrooms.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-slate-500 py-6", children: "No active programs." })
        ] })
      ] })
    ] })
  ] });
}
export {
  Profile as component
};
