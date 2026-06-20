import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { a as LuAward, L as LuArrowLeft, q as LuSearch, d as LuCheck, l as LuLink, t as LuUpload, w as LuX } from "./_libs/react-icons.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-DHcp8hRR.mjs";
import { am as useClassroomStore, K as getClassrooms, C as getAdminUsers, ak as updateStudentCertificate, j as classroomActions } from "./_ssr/router-CXHGCxdL.mjs";
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
import "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
function AdminCertificates() {
  const {
    currentUser
  } = useClassroomStore();
  const [classrooms, setClassrooms] = reactExports.useState([]);
  const [selectedClass, setSelectedClass] = reactExports.useState(null);
  const [selectedStudentId, setSelectedStudentId] = reactExports.useState(null);
  const [certLink, setCertLink] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [mongoUsers, setMongoUsers] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [classroomsData, users] = await Promise.all([getClassrooms(), getAdminUsers("student")]);
        if (!active) return;
        setClassrooms(classroomsData);
        setMongoUsers(users);
        setLoading(false);
      } catch (err) {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);
  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setSelectedStudentId(null);
    setCertLink("");
    setSaved(false);
    setError("");
  };
  const handleSelectStudent = (studentId, currentLink) => {
    setSelectedStudentId(studentId);
    setCertLink(currentLink || "");
    setSaved(false);
    setError("");
  };
  const handleSave = async () => {
    if (!selectedClass || !selectedStudentId) return;
    setError("");
    setSaving(true);
    setSaved(false);
    try {
      await updateStudentCertificate(selectedClass.id, selectedStudentId, certLink.trim() || "");
      const updatedClass = {
        ...selectedClass,
        students: selectedClass.students.map((s) => s.id === selectedStudentId ? {
          ...s,
          certificateUrl: certLink.trim() || void 0
        } : s)
      };
      setSelectedClass(updatedClass);
      classroomActions.updateClassroom(selectedClass.id, updatedClass);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      setSelectedStudentId(null);
      setCertLink("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save certificate");
    } finally {
      setSaving(false);
    }
  };
  const handleRemove = async (studentId) => {
    if (!selectedClass) return;
    setError("");
    setSaving(true);
    try {
      await updateStudentCertificate(selectedClass.id, studentId, "");
      const updatedClass = {
        ...selectedClass,
        students: selectedClass.students.map((s) => s.id === studentId ? {
          ...s,
          certificateUrl: void 0
        } : s)
      };
      setSelectedClass(updatedClass);
      classroomActions.updateClassroom(selectedClass.id, updatedClass);
      if (selectedStudentId === studentId) {
        setSelectedStudentId(null);
        setCertLink("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove certificate");
    } finally {
      setSaving(false);
    }
  };
  const getClassStudents = () => {
    if (!selectedClass) return [];
    const enrolled = selectedClass.students || [];
    return enrolled.map((s) => {
      const mongoUser = mongoUsers.find((u) => u.id === s.id);
      return {
        ...s,
        email: s.email || mongoUser?.email || "",
        phone: s.phone || mongoUser?.phone || ""
      };
    });
  };
  const classStudents = getClassStudents();
  const filteredStudents = searchQuery ? classStudents.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())) : classStudents;
  const activeCount = classStudents.filter((s) => s.status === "active").length;
  const certCount = classStudents.filter((s) => s.certificateUrl).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-cream", children: "Certificates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60 mt-1", children: "Upload and manage certificates per student per classroom" })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300", children: error }),
    !selectedClass ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm", children: "Loading classrooms…" }) }) : classrooms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LuAward, { className: "h-10 w-10 text-cream/20 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm", children: "No classrooms found. Create a classroom first." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: classrooms.map((cls) => {
      const activeStudentCount = cls.students?.filter((s) => s.status === "active").length || 0;
      const certStudentCount = cls.students?.filter((s) => s.certificateUrl).length || 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSelectClass(cls), className: "rounded-2xl border border-cream/10 bg-[#1A0F33] p-5 text-left hover:shadow-lg hover:border-lime/30 transition-all group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-cream group-hover:text-lime transition-colors", children: cls.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50 font-mono mt-0.5", children: cls.code })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${cls.status === "active" ? "bg-lime/20 text-lime" : "bg-cream/10 text-cream/60"}`, children: cls.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-cream/60 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            activeStudentCount,
            " active"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime font-semibold", children: [
            certStudentCount,
            " certified"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/50", children: cls.program || "No program" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(LuAward, { className: "h-4 w-4 text-lime/60 group-hover:text-lime transition-colors" })
        ] })
      ] }, cls.id);
    }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setSelectedClass(null);
          setSelectedStudentId(null);
          setCertLink("");
        }, className: "flex items-center gap-1 text-sm text-cream/60 hover:text-cream transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LuArrowLeft, { className: "h-4 w-4" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-cream/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-cream", children: selectedClass.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-cream/50 font-mono", children: [
            selectedClass.code,
            " · ",
            selectedClass.program
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            activeCount,
            " active"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime font-semibold", children: [
            certCount,
            " certified"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LuSearch, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search students…", className: "w-full bg-[#1A0F33] border border-cream/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-cream outline-none focus:border-lime/50" })
      ] }),
      filteredStudents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DarkCard, { className: "text-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm", children: "No students in this classroom." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredStudents.map((student) => {
        const isSelected = selectedStudentId === student.id;
        const hasCert = !!student.certificateUrl;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl border bg-[#1A0F33] p-4 transition-all ${isSelected ? "border-lime shadow-md" : hasCert ? "border-lime/30" : "border-cream/10 hover:border-lime/20"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-full text-sm font-bold shrink-0 ${hasCert ? "bg-lime text-plum-dark" : "bg-cream/10 text-cream/60"}`, children: student.name.split(" ").map((w) => w[0]).join("").slice(0, 2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream text-sm", children: student.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${student.status === "active" ? "bg-lime/20 text-lime" : student.status === "held" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}`, children: student.status }),
                hasCert && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-lime/20 text-lime flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LuCheck, { className: "h-3 w-3" }),
                  " Certified"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-0.5", children: student.email }),
              student.certificateUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: student.certificateUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-xs text-lime hover:text-lime/80 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LuLink, { className: "h-3 w-3" }),
                " View certificate"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: !isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSelectStudent(student.id, student.certificateUrl), className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${hasCert ? "bg-lime/10 text-lime hover:bg-lime/20" : "bg-cream/10 text-cream/70 hover:bg-cream/20"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LuUpload, { className: "h-3 w-3" }),
              hasCert ? "Update" : "Upload",
              " Certificate"
            ] }) : null })
          ] }),
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-cream/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/60 mb-2", children: "Certificate Link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", value: certLink, onChange: (e) => setCertLink(e.target.value), placeholder: "Paste Google Drive certificate link (set sharing to 'Anyone with link can view')", className: "w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-cream text-sm outline-none focus:border-lime/50" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: saving, className: "rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold disabled:opacity-50", children: saving ? "Saving…" : saved ? "Saved ✓" : "Save Certificate" }),
              hasCert && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRemove(student.id), disabled: saving, className: "text-cream/30 hover:text-red-400 transition-colors", title: "Remove certificate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuX, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                setSelectedStudentId(null);
                setCertLink("");
                setError("");
              }, className: "text-cream/40 hover:text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LuX, { className: "h-4 w-4" }) })
            ] })
          ] })
        ] }, student.id);
      }) })
    ] })
  ] });
}
export {
  AdminCertificates as component
};
