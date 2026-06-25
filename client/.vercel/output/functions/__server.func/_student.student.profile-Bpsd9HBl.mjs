import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card } from "./_ssr/PortalShell-CzMijqXG.mjs";
import { ap as useClassroomStore, h as adminActions, ak as updateMyProfile, ao as uploadProfileAvatar } from "./_ssr/router-b9USinVv.mjs";
import "./_libs/firebase.mjs";
import "./_libs/firebase__messaging.mjs";
import { _ as PenLine, R as Mail, $ as Phone, S as MapPin, H as GraduationCap, h as Briefcase, as as X, t as CircleCheckBig, r as CircleAlert, O as LoaderCircle, a6 as Save, j as Camera } from "./_libs/lucide-react.mjs";
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
import "./_libs/firebase__app.mjs";
import "./_libs/firebase__component.mjs";
import "./_libs/firebase__util.mjs";
import "./_libs/firebase__logger.mjs";
import "./_libs/idb.mjs";
import "./_libs/firebase__installations.mjs";
function AvatarUploader({
  current,
  initials,
  onUploaded
}) {
  const inputRef = reactExports.useRef(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [error, setError] = reactExports.useState(null);
  const avatarSrc = preview || current;
  const apiBase = "https://oc-pro-production.up.railway.app/api/v1".replace(/\/+$/, "") || "/api/v1";
  const resolveUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    const backendBase = apiBase.replace("/api/v1", "");
    return `${backendBase}${url}`;
  };
  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result);
    reader.readAsDataURL(file);
    setUploading(true);
    setProgress(0);
    try {
      const result = await uploadProfileAvatar(file, setProgress);
      onUploaded(result.avatar);
    } catch (err) {
      setError(err.message || "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group cursor-pointer", onClick: () => !uploading && inputRef.current?.click(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-plum/20", children: resolveUrl(avatarSrc) ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolveUrl(avatarSrc), alt: "Profile", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-plum-dark to-plum flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-white font-display", children: initials }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 text-white animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-6 w-6 text-white" }) }),
      uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-plum-dark flex items-center justify-center text-[10px] text-white font-bold shadow", children: [
        progress,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
      e.target.value = "";
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => !uploading && inputRef.current?.click(), disabled: uploading, className: "text-xs font-semibold text-plum hover:text-plum-dark transition-colors disabled:opacity-50 flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3" }),
      uploading ? `Uploading… ${progress}%` : "Change Photo"
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-red-500 text-center max-w-[140px]", children: error })
  ] });
}
function EditProfileModal({
  onClose
}) {
  const {
    currentUser
  } = useClassroomStore();
  const [form, setForm] = reactExports.useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || ""
  });
  const [avatarUrl, setAvatarUrl] = reactExports.useState(currentUser?.avatar);
  const [saving, setSaving] = reactExports.useState(false);
  const [toast, setToast] = reactExports.useState(null);
  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(null), 3500);
  };
  const handleAvatarUploaded = (url) => {
    setAvatarUrl(url);
    if (currentUser) {
      adminActions.updateUser(currentUser.id, {
        avatar: url
      });
    }
    showToast({
      type: "success",
      message: "Profile photo updated!"
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    try {
      const result = await updateMyProfile({
        fullName: form.name,
        phone: form.phone,
        address: form.address
      });
      adminActions.updateUser(currentUser.id, {
        name: form.name,
        phone: form.phone,
        address: form.address,
        avatar: result.user?.avatar ?? avatarUrl
      });
      showToast({
        type: "success",
        message: "Profile saved successfully!"
      });
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      showToast({
        type: "error",
        message: err.message || "Failed to save profile"
      });
    } finally {
      setSaving(false);
    }
  };
  const initials = form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md p-0 overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-plum-dark to-plum p-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-white", children: "Edit Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 mt-0.5", children: "Update your personal details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarUploader, { current: avatarUrl, initials, onUploaded: handleAvatarUploaded }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "px-6 pb-6 space-y-4 pt-4", children: [
      toast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200 ${toast.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`, children: [
        toast.type === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 shrink-0" }),
        toast.message
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1.5 font-semibold", children: [
          "Full Name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), placeholder: "Enter your full name", className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all placeholder:text-slate-300" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1.5 font-semibold", children: "Mobile Number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", value: form.phone, onChange: (e) => setForm({
            ...form,
            phone: e.target.value
          }), placeholder: "+91 90000 00000", className: "w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all placeholder:text-slate-300" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] uppercase tracking-widest text-slate-500 block mb-1.5 font-semibold", children: "Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "absolute left-3 top-3 h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.address, onChange: (e) => setForm({
            ...form,
            address: e.target.value
          }), placeholder: "House no., Street, City, State – PIN", rows: 3, className: "w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all placeholder:text-slate-300 resize-none" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onClose, disabled: saving, className: "flex-1 rounded-full bg-slate-100 text-slate-600 py-2.5 text-sm font-semibold hover:bg-slate-200 transition-colors disabled:opacity-50", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark text-cream py-2.5 text-sm font-bold shadow-sm hover:bg-plum transition-colors disabled:opacity-60", children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Saving…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " Save Changes"
        ] }) })
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
  const email = currentUser?.email || "No email";
  const phone = currentUser?.phone || "";
  const address = currentUser?.address || "";
  const avatar = currentUser?.avatar || "";
  const studentId = currentUser?.id || "";
  const apiBase = "https://oc-pro-production.up.railway.app/api/v1".replace(/\/+$/, "") || "/api/v1";
  const resolveUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${apiBase.replace("/api/v1", "")}${url}`;
  };
  const enrolled = classrooms.filter((c) => c.students.some((s) => s.id === studentId));
  const joinedYear = enrolled.length > 0 ? new Date(enrolled[0].students.find((s) => s.id === studentId).addedAt).getFullYear() : (/* @__PURE__ */ new Date()).getFullYear();
  const activeClassrooms = enrolled.filter((c) => c.students.find((s) => s.id === studentId)?.status === "active");
  const programsEnrolled = Array.from(new Set(activeClassrooms.map((c) => c.program)));
  const joinDate = enrolled.length > 0 ? new Date(enrolled[0].students.find((s) => s.id === studentId).addedAt).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  }) : "Recently";
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const resolvedAvatar = resolveUrl(avatar);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    showEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(EditProfileModal, { onClose: () => setShowEdit(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-br from-plum-dark via-plum to-[#1a0a2e] text-cream p-6 shadow-2xl border border-white/10 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 opacity-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-lime/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-lime font-bold mb-1", children: "AXON ACADEMY" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-cream/50 font-mono", children: "Student Identity Card" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowEdit(true), className: "flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-cream text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/10 transition-all hover:scale-105 active:scale-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3 w-3" }),
            " Edit Profile"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-28 sm:w-28 sm:h-32 rounded-xl border-2 border-lime/40 shadow-lg overflow-hidden", children: resolvedAvatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolvedAvatar, alt: name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-lime/30 to-lime/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold text-lime", children: initials }) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-lime via-lime/80 to-lime/60 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl sm:text-2xl font-bold text-white leading-tight mb-1 truncate", children: name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-cream/60 font-semibold mb-2", children: "Student" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-cream/40 w-14 shrink-0", children: "ID No." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-lime bg-white/10 px-2 py-0.5 rounded border border-white/10", children: [
                  "AXON",
                  studentId.slice(0, 5).toUpperCase(),
                  "-",
                  joinedYear
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-cream/40 w-14 shrink-0", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/80 truncate", children: email })
              ] }),
              phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] uppercase tracking-widest text-cream/40 w-14 shrink-0", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-cream/80", children: phone })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-cream/40 mb-1", children: "Programs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: programsEnrolled.length > 0 ? programsEnrolled.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-lime/15 text-lime text-[10px] font-semibold px-2 py-0.5 rounded-md border border-lime/20", children: p }, p)) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cream/40 text-[11px]", children: "Not enrolled" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-widest text-cream/40 mb-1", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-cream/80", children: joinDate })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 border border-slate-100 shadow-sm p-0 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg", children: "Personal Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: "Details used for certificates and official communications." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowEdit(true), className: "flex items-center gap-1.5 bg-plum-dark text-cream text-xs font-semibold px-3 py-2 rounded-full hover:bg-plum transition-all hover:scale-105 active:scale-95 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3 w-3" }),
            " Edit"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 grid sm:grid-cols-2 gap-x-6 gap-y-5", children: [{
          l: "Full Name",
          v: name
        }, {
          l: "Email Address",
          v: email
        }, {
          l: "Phone Number",
          v: phone || "—"
        }, {
          l: "Address",
          v: address || "—",
          full: true
        }, {
          l: "Account Role",
          v: "Student"
        }, {
          l: "Status",
          v: "Active"
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: f.full ? "sm:col-span-2" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-1", children: f.l }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 whitespace-pre-wrap", children: f.v })
        ] }, f.l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-slate-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-plum-dark text-lg", children: "Contact Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-4 text-sm text-slate-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800 break-all", children: email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800", children: phone || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-normal italic", children: "Not added" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100 p-2 rounded-lg text-plum shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-800 mt-0.5 whitespace-pre-wrap", children: address || /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400 font-normal italic", children: "Not provided." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowEdit(true), className: "text-xs text-plum hover:underline font-semibold mt-1", children: "Add address →" })
            ] }) })
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
