import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { y as getAssetUrl, f as api } from "./_ssr/router-CqaaUdl3.mjs";
import { D as DarkCard } from "./_ssr/PortalShell-MA-T_BoU.mjs";
import { i as Building2, a3 as Save, g as BookOpen, $ as Plus, W as Pen, ah as Trash2, an as Users, ap as X, al as Upload, ae as Star, O as Mail, T as MessageSquare, l as Check } from "./_libs/lucide-react.mjs";
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
function Settings() {
  const [activeTab, setActiveTab] = reactExports.useState("Organization");
  const [toast, setToast] = reactExports.useState(null);
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3e3);
  };
  const [org, setOrg] = reactExports.useState({
    name: "Axon Academy",
    url: "axon.academy",
    email: "hello@axon.academy",
    phone: "+91 98765 43210",
    gst: "29AABCM1234C1ZK",
    timezone: "Asia/Kolkata",
    address: "Plot 21, Medical Campus,\nBengaluru 560001",
    about: "India's most trusted paramedical training academy."
  });
  const [courses, setCourses] = reactExports.useState([{
    id: 1,
    title: "Advanced Cardiac Care",
    specialty: "ICU Care",
    duration: "6 Months",
    mode: "Hybrid",
    fee: 45e3,
    original: 6e4,
    rating: 4.9,
    enrolled: 1240,
    tag: "Bestseller"
  }, {
    id: 2,
    title: "Staff Nursing Diploma",
    specialty: "Nursing",
    duration: "1 Year",
    mode: "Offline",
    fee: 68e3,
    original: 85e3,
    rating: 4.8,
    enrolled: 2100
  }, {
    id: 3,
    title: "OT Technician Program",
    specialty: "OT Tech",
    duration: "3 Months",
    mode: "Hybrid",
    fee: 32e3,
    original: 42e3,
    rating: 4.7,
    enrolled: 820
  }, {
    id: 4,
    title: "Lab Technician (DMLT)",
    specialty: "Lab Tech",
    duration: "1 Year",
    mode: "Hybrid",
    fee: 54e3,
    original: 7e4,
    rating: 4.8,
    enrolled: 1530
  }, {
    id: 5,
    title: "Radiology & Imaging",
    specialty: "Radiology",
    duration: "6 Months",
    mode: "Hybrid",
    fee: 49e3,
    original: 65e3,
    rating: 4.6,
    enrolled: 690
  }, {
    id: 6,
    title: "ICU & Critical Care",
    specialty: "ICU Care",
    duration: "6 Months",
    mode: "Offline",
    fee: 52e3,
    original: 7e4,
    rating: 4.9,
    enrolled: 1010
  }]);
  const [editingCourse, setEditingCourse] = reactExports.useState(null);
  const [isAddingCourse, setIsAddingCourse] = reactExports.useState(false);
  const [aboutText, setAboutText] = reactExports.useState({
    mission: "To make world-class paramedical education accessible to every aspirant in India — regardless of background or budget.",
    vision: "A future where every hospital bedside is supported by a confident, certified, expertly trained paramedical professional.",
    values: "Empathy in care. Rigor in training. Honesty in assessment. Respect for every learner who trusts us with their future."
  });
  const [milestones, setMilestones] = reactExports.useState([{
    id: 1,
    year: "2018",
    title: "Academy founded",
    description: "Started with 32 students in Bengaluru."
  }, {
    id: 2,
    year: "2020",
    title: "Online expansion",
    description: "Pivoted to hybrid model serving 1,000+ students nationally."
  }, {
    id: 3,
    year: "2022",
    title: "100 hospital partners",
    description: "Signed flagship MOUs with Apollo, Fortis, Manipal."
  }, {
    id: 4,
    year: "2024",
    title: "Blockchain certificates",
    description: "First Indian academy with on-chain verifiable credentials."
  }]);
  const [editingMilestone, setEditingMilestone] = reactExports.useState(null);
  const [isAddingMilestone, setIsAddingMilestone] = reactExports.useState(false);
  const [facultyList, setFacultyList] = reactExports.useState([]);
  const [editingFaculty, setEditingFaculty] = reactExports.useState(null);
  const [isAddingFaculty, setIsAddingFaculty] = reactExports.useState(false);
  const [isLoadingFaculty, setIsLoadingFaculty] = reactExports.useState(false);
  const facultyPhotoRef = reactExports.useRef(null);
  const [facultyPhotoFile, setFacultyPhotoFile] = reactExports.useState(null);
  const [facultyPhotoPreview, setFacultyPhotoPreview] = reactExports.useState(null);
  const fetchFaculty = async () => {
    setIsLoadingFaculty(true);
    try {
      const res = await api.get("/admin/faculty");
      if (res.success) {
        setFacultyList(res.facultyList || []);
      }
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
      showToast("Error loading faculty members");
    } finally {
      setIsLoadingFaculty(false);
    }
  };
  reactExports.useEffect(() => {
    if (activeTab === "Faculty") {
      fetchFaculty();
    }
  }, [activeTab]);
  const [hospitalPartners, setHospitalPartners] = reactExports.useState(["Apollo Hospitals", "Fortis Healthcare", "Manipal Hospitals", "Max Healthcare", "Narayana Health", "Medanta"]);
  const [newHospital, setNewHospital] = reactExports.useState("");
  const [stories, setStories] = reactExports.useState([{
    id: 1,
    name: "Priya Krishnan",
    role: "Staff Nurse",
    hospital: "Apollo Hospitals",
    salary: "₹3.6L",
    city: "Bengaluru"
  }, {
    id: 2,
    name: "Arjun Reddy",
    role: "OT Technician",
    hospital: "Manipal",
    salary: "₹4.2L",
    city: "Hyderabad"
  }, {
    id: 3,
    name: "Sneha Pillai",
    role: "Lab Technician",
    hospital: "Fortis",
    salary: "₹3.2L",
    city: "Mumbai"
  }]);
  const [editingStory, setEditingStory] = reactExports.useState(null);
  const [isAddingStory, setIsAddingStory] = reactExports.useState(false);
  const [blogPosts, setBlogPosts] = reactExports.useState([{
    id: 1,
    title: "What hospitals look for in a Staff Nurse hire",
    category: "Career",
    date: "May 18, 2026",
    readTime: "6 min",
    excerpt: "Insights from 50+ HR heads at India's leading hospital chains.",
    featured: true
  }, {
    id: 2,
    title: "ICU monitoring trends every junior tech should master",
    category: "Clinical",
    date: "May 12, 2026",
    readTime: "8 min",
    excerpt: "Modern bedside monitoring is shifting. Here's the new baseline.",
    featured: false
  }, {
    id: 3,
    title: "How to pass our proctored DMLT exam (without panic)",
    category: "Exam Prep",
    date: "May 04, 2026",
    readTime: "5 min",
    excerpt: "A study plan from candidates who scored in the top 5.",
    featured: false
  }]);
  const [editingPost, setEditingPost] = reactExports.useState(null);
  const [isAddingPost, setIsAddingPost] = reactExports.useState(false);
  const [contactMeta, setContactMeta] = reactExports.useState({
    address: "Plot 21, Medical Campus, Hosur Road, Bengaluru — 560001",
    phone: "+91 98765 43210",
    email: "hello@axon.academy",
    hours: "Monday – Saturday, 9 AM to 8 PM"
  });
  const [inquiries, setInquiries] = reactExports.useState([{
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    phone: "+91 99887 76655",
    interest: "Cardiac Care",
    message: "Hi, I want to know about the batch starting date and fees installment options.",
    resolved: false,
    date: "June 12, 2026"
  }, {
    id: 2,
    name: "Sunitha Rao",
    email: "sunitha@outlook.com",
    phone: "+91 98765 00112",
    interest: "OT Tech",
    message: "Is placement assistance provided after graduation?",
    resolved: true,
    date: "June 10, 2026"
  }]);
  const handleSaveOrg = (e) => {
    e.preventDefault();
    showToast("Organization settings saved successfully!");
  };
  const handleSaveAbout = (e) => {
    e.preventDefault();
    showToast("About content saved successfully!");
  };
  const handleSaveContact = (e) => {
    e.preventDefault();
    showToast("Contact information saved successfully!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-cream pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Admin settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-cream/60 text-sm mt-1", children: "Manage public site pages, configurations and layouts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[220px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-1", children: ["Organization", "Course", "About", "Faculty", "Placement", "Blog", "Contact"].map((tab) => {
        const isSelected = activeTab === tab;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setActiveTab(tab);
          setEditingCourse(null);
          setIsAddingCourse(false);
          setEditingMilestone(null);
          setIsAddingMilestone(false);
          setEditingFaculty(null);
          setIsAddingFaculty(false);
          setEditingStory(null);
          setIsAddingStory(false);
          setEditingPost(null);
          setIsAddingPost(false);
        }, className: `w-full text-left rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isSelected ? "bg-lime text-plum-dark font-bold" : "text-cream/70 hover:bg-cream/5 hover:text-cream"}`, children: tab }, tab);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        activeTab === "Organization" && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Organization details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "General public information about Axon Academy" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "text-lime w-6 h-6 opacity-80" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveOrg, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Academy name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: org.name, onChange: (e) => setOrg({
                  ...org,
                  name: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Display URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: org.url, onChange: (e) => setOrg({
                  ...org,
                  url: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Support email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: org.email, onChange: (e) => setOrg({
                  ...org,
                  email: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: org.phone, onChange: (e) => setOrg({
                  ...org,
                  phone: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "GST Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: org.gst, onChange: (e) => setOrg({
                  ...org,
                  gst: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Time zone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: org.timezone, onChange: (e) => setOrg({
                  ...org,
                  timezone: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: org.address, onChange: (e) => setOrg({
                  ...org,
                  address: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "About summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: org.about, onChange: (e) => setOrg({
                  ...org,
                  about: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 flex justify-end gap-3 border-t border-cream/10 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow hover:opacity-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              " Save changes"
            ] }) })
          ] })
        ] }),
        activeTab === "About" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "About details & Core values" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Configure company pillars and statements" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "text-lime w-6 h-6 opacity-80" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveAbout, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Mission statement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: aboutText.mission, onChange: (e) => setAboutText({
                    ...aboutText,
                    mission: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Vision statement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: aboutText.vision, onChange: (e) => setAboutText({
                    ...aboutText,
                    vision: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Pillar values description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: aboutText.values, onChange: (e) => setAboutText({
                    ...aboutText,
                    values: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end border-t border-cream/10 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold hover:opacity-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                " Save Core Statements"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base", children: "Academy history timeline" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-0.5", children: "Edit milestones showing progress year over year" })
              ] }),
              !editingMilestone && !isAddingMilestone && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setIsAddingMilestone(true);
                setEditingMilestone({
                  year: "",
                  title: "",
                  description: ""
                });
              }, className: "inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-3 py-1.5 text-[11px] font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                " Add milestone"
              ] })
            ] }),
            editingMilestone || isAddingMilestone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-cream/10 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-xs text-lime", children: isAddingMilestone ? "Add Milestone" : "Edit Milestone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Year" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingMilestone.year, onChange: (e) => setEditingMilestone({
                    ...editingMilestone,
                    year: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. 2026" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Heading Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingMilestone.title, onChange: (e) => setEditingMilestone({
                    ...editingMilestone,
                    title: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. Signed flagship hospital partnerships" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Detail description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editingMilestone.description, onChange: (e) => setEditingMilestone({
                  ...editingMilestone,
                  description: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime min-h-[60px]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  setEditingMilestone(null);
                  setIsAddingMilestone(false);
                }, className: "px-3.5 py-1.5 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  if (!editingMilestone.year || !editingMilestone.title) {
                    alert("Please fill year and title");
                    return;
                  }
                  if (isAddingMilestone) {
                    const newId = milestones.length ? Math.max(...milestones.map((m) => m.id)) + 1 : 1;
                    setMilestones([...milestones, {
                      ...editingMilestone,
                      id: newId
                    }]);
                    showToast("Academy milestone added!");
                  } else {
                    setMilestones(milestones.map((m) => m.id === editingMilestone.id ? editingMilestone : m));
                    showToast("Milestone updated!");
                  }
                  setEditingMilestone(null);
                  setIsAddingMilestone(false);
                }, className: "px-3.5 py-1.5 bg-lime text-plum-dark text-xs font-bold rounded-full", children: "Save Milestone" })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-cream/5 mt-3", children: milestones.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex justify-between gap-4 items-start group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lime font-bold text-sm bg-cream/5 rounded px-2.5 py-1 h-fit shrink-0", children: m.year }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-sm text-cream", children: m.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: m.description })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingMilestone(m), className: "p-1 hover:bg-cream/10 rounded text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                  if (confirm("Delete this milestone?")) {
                    setMilestones(milestones.filter((x) => x.id !== m.id));
                    showToast("Milestone deleted");
                  }
                }, className: "p-1 hover:bg-red-500/20 rounded text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
              ] })
            ] }, m.id)) })
          ] })
        ] }),
        activeTab === "Faculty" && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Faculty & Clinicians" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Manage public profile cards for teaching doctors and nurses" })
            ] }),
            !editingFaculty && !isAddingFaculty && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setIsAddingFaculty(true);
              setEditingFaculty({
                name: "",
                role: "",
                specialty: "",
                years: 10,
                rating: 4.8,
                initials: ""
              });
              setFacultyPhotoFile(null);
              setFacultyPhotoPreview(null);
            }, className: "inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Add Faculty"
            ] })
          ] }),
          editingFaculty || isAddingFaculty ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-cream/10 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-lime", children: isAddingFaculty ? "Register New Faculty" : "Edit Faculty credentials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 overflow-hidden rounded-2xl bg-cream/5 border-2 border-dashed border-cream/10 grid place-items-center", children: facultyPhotoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: facultyPhotoPreview, alt: "Preview", className: "h-full w-full object-cover" }) : editingFaculty?.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(editingFaculty.image), alt: "Current", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-cream/10" }) }),
                (facultyPhotoPreview || editingFaculty?.image) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  setFacultyPhotoFile(null);
                  setFacultyPhotoPreview(null);
                  setEditingFaculty((f) => ({
                    ...f,
                    image: null,
                    removeImage: true
                  }));
                  if (facultyPhotoRef.current) facultyPhotoRef.current.value = "";
                }, className: "absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-red-500 text-white grid place-items-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => facultyPhotoRef.current?.click(), className: "inline-flex items-center gap-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream border border-cream/10 px-4 py-2 text-xs font-bold transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3.5 w-3.5" }),
                  facultyPhotoPreview || editingFaculty?.image ? "Change Photo" : "Upload Photo"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-cream/30 uppercase tracking-[0.15em]", children: "JPG, PNG or WebP · Max 2MB" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: facultyPhotoRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFacultyPhotoFile(file);
                    setFacultyPhotoPreview(URL.createObjectURL(file));
                  }
                } })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Full Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingFaculty.name, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  name: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. Dr. Anita Sharma" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Initials (For Avatar)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", maxLength: 2, value: editingFaculty.initials, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  initials: e.target.value.toUpperCase()
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. AS" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Role Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingFaculty.role, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  role: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. Chief Cardiologist" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Specialty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingFaculty.specialty, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  specialty: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. Cardiac Care" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Years of Experience" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: editingFaculty.years, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  years: parseInt(e.target.value) || 0
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Rating score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.1", min: "1", max: "5", value: editingFaculty.rating, onChange: (e) => setEditingFaculty({
                  ...editingFaculty,
                  rating: parseFloat(e.target.value) || 5
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2.5 mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setEditingFaculty(null);
                setIsAddingFaculty(false);
                setFacultyPhotoFile(null);
                setFacultyPhotoPreview(null);
                if (facultyPhotoRef.current) facultyPhotoRef.current.value = "";
              }, className: "px-4 py-2 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: async () => {
                if (!editingFaculty.name || !editingFaculty.role) {
                  alert("Please fill name and role");
                  return;
                }
                try {
                  const fd = new FormData();
                  fd.append("name", editingFaculty.name);
                  fd.append("role", editingFaculty.role);
                  fd.append("specialty", editingFaculty.specialty || "");
                  fd.append("years", String(editingFaculty.years || 0));
                  fd.append("rating", String(editingFaculty.rating || 5));
                  fd.append("initials", editingFaculty.initials || "");
                  if (facultyPhotoFile) {
                    fd.append("image", facultyPhotoFile);
                  } else if (editingFaculty.removeImage) {
                    fd.append("removeImage", "true");
                  }
                  if (isAddingFaculty) {
                    const res = await api.multipart("/admin/faculty", "POST", fd);
                    if (res.success) {
                      showToast("New faculty profile created!");
                      fetchFaculty();
                    }
                  } else {
                    const res = await api.multipart(`/admin/faculty/${editingFaculty._id || editingFaculty.id}`, "PUT", fd);
                    if (res.success) {
                      showToast("Faculty profile updated successfully!");
                      fetchFaculty();
                    }
                  }
                  setEditingFaculty(null);
                  setIsAddingFaculty(false);
                  setFacultyPhotoFile(null);
                  setFacultyPhotoPreview(null);
                  if (facultyPhotoRef.current) facultyPhotoRef.current.value = "";
                } catch (err) {
                  alert(err.message || "Operation failed");
                }
              }, className: "px-4 py-2 bg-lime text-plum-dark text-xs font-bold rounded-full", children: "Save Faculty Profile" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: isLoadingFaculty ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-center py-6 text-sm text-cream/50", children: "Loading faculty members..." }) : facultyList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-center py-6 text-sm text-cream/50", children: "No faculty members found." }) : facultyList.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 rounded-2xl bg-cream/5 border border-cream/10 relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-lime text-plum-dark rounded-xl overflow-hidden flex items-center justify-center font-display font-bold text-base shrink-0", children: f.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getAssetUrl(f.image), alt: f.name, className: "h-full w-full object-cover" }) : f.initials || f.name.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 pr-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-cream", children: f.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-cream/70 font-medium", children: f.role }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-cream/55 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f.specialty }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  f.years,
                  " yrs exp"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-lime", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-lime" }),
                  " ",
                  f.rating
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                setEditingFaculty(f);
                setFacultyPhotoFile(null);
                setFacultyPhotoPreview(null);
              }, className: "p-1 hover:bg-cream/10 rounded text-cream/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: async () => {
                if (confirm(`Remove ${f.name} from faculty?`)) {
                  try {
                    const res = await api.delete(`/admin/faculty/${f._id || f.id}`);
                    if (res.success) {
                      showToast("Faculty profile removed");
                      fetchFaculty();
                    }
                  } catch (err) {
                    alert(err.message || "Failed to remove faculty member");
                  }
                }
              }, className: "p-1 hover:bg-red-500/20 rounded text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
            ] })
          ] }, f._id || f.id)) })
        ] }),
        activeTab === "Placement" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base", children: "Partner hospital networks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-0.5", children: "Recruiting medical networks appearing on the site" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "text-lime w-5 h-5 opacity-70" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-cream/5 border border-cream/10", children: hospitalPartners.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-plum-dark border border-cream/15 text-cream rounded-full text-xs font-semibold", children: [
              h,
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                setHospitalPartners(hospitalPartners.filter((x) => x !== h));
                showToast("Partner hospital removed");
              }, className: "text-cream/50 hover:text-red-400 font-bold ml-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
            ] }, h)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. Columbia Asia", value: newHospital, onChange: (e) => setNewHospital(e.target.value), className: "flex-1 bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-lime" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (!newHospital.trim()) return;
                if (hospitalPartners.includes(newHospital.trim())) {
                  alert("Hospital already added");
                  return;
                }
                setHospitalPartners([...hospitalPartners, newHospital.trim()]);
                setNewHospital("");
                showToast("Hospital partner listed!");
              }, className: "inline-flex items-center gap-1 bg-lime text-plum-dark px-3 py-2 text-xs font-bold rounded-xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                " Add"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Placement success stories" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Manage testimonials and placements of recent graduates" })
              ] }),
              !editingStory && !isAddingStory && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setIsAddingStory(true);
                setEditingStory({
                  name: "",
                  role: "",
                  hospital: "",
                  salary: "",
                  city: ""
                });
              }, className: "inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-3.5 py-1.5 text-xs font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
                " Add Story"
              ] })
            ] }),
            editingStory || isAddingStory ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-cream/10 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-xs text-lime", children: isAddingStory ? "Add Placement Story" : "Edit Story" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Graduate Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingStory.name, onChange: (e) => setEditingStory({
                    ...editingStory,
                    name: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. Priya Krishnan" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Placed Role" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingStory.role, onChange: (e) => setEditingStory({
                    ...editingStory,
                    role: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. Staff Nurse" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Hospital Recruiter" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingStory.hospital, onChange: (e) => setEditingStory({
                    ...editingStory,
                    hospital: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. Apollo Hospitals" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Package (Per Year)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingStory.salary, onChange: (e) => setEditingStory({
                    ...editingStory,
                    salary: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. ₹3.6L" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "City" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingStory.city, onChange: (e) => setEditingStory({
                    ...editingStory,
                    city: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime", placeholder: "e.g. Bengaluru" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2.5 mt-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  setEditingStory(null);
                  setIsAddingStory(false);
                }, className: "px-4 py-1.5 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                  if (!editingStory.name || !editingStory.hospital) {
                    alert("Please fill name and hospital");
                    return;
                  }
                  if (isAddingStory) {
                    const newId = stories.length ? Math.max(...stories.map((s) => s.id)) + 1 : 1;
                    setStories([...stories, {
                      ...editingStory,
                      id: newId
                    }]);
                    showToast("New success story added!");
                  } else {
                    setStories(stories.map((s) => s.id === editingStory.id ? editingStory : s));
                    showToast("Success story updated!");
                  }
                  setEditingStory(null);
                  setIsAddingStory(false);
                }, className: "px-4 py-1.5 bg-lime text-plum-dark text-xs font-bold rounded-full", children: "Save Story" })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs whitespace-nowrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-cream/10 text-cream/60 uppercase font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Graduate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "Hospital" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3", children: "City" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 text-right", children: "Salary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 text-right", children: "Action" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-cream/5", children: stories.map((story) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group hover:bg-cream/[0.02]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 font-medium text-cream", children: story.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-cream/70", children: story.role }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-cream/70 font-semibold", children: story.hospital }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-cream/60", children: story.city }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right font-mono font-bold text-lime", children: story.salary }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingStory(story), className: "p-1 hover:bg-cream/10 rounded text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    if (confirm("Delete this story?")) {
                      setStories(stories.filter((x) => x.id !== story.id));
                      showToast("Placement story removed");
                    }
                  }, className: "p-1 hover:bg-red-500/20 rounded text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
                ] }) })
              ] }, story.id)) })
            ] }) })
          ] })
        ] }),
        activeTab === "Blog" && /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Site Journal / Blog" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Manage featured posts, clinical trends, and study plans" })
            ] }),
            !editingPost && !isAddingPost && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setIsAddingPost(true);
              setEditingPost({
                title: "",
                category: "Career",
                date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                }),
                readTime: "5 min",
                excerpt: "",
                featured: false
              });
            }, className: "inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " New Article"
            ] })
          ] }),
          editingPost || isAddingPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 border-t border-cream/10 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-lime", children: isAddingPost ? "Compose Article" : "Edit Article summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Article Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingPost.title, onChange: (e) => setEditingPost({
                  ...editingPost,
                  title: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. Salary benchmarks for paramedical roles" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: editingPost.category, onChange: (e) => setEditingPost({
                  ...editingPost,
                  category: e.target.value
                }), className: "mt-1.5 w-full bg-plum-dark text-cream border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", children: ["Career", "Clinical", "Exam Prep", "Stories"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Read Time (minutes)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingPost.readTime, onChange: (e) => setEditingPost({
                  ...editingPost,
                  readTime: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime", placeholder: "e.g. 6 min" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Publish Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editingPost.date, onChange: (e) => setEditingPost({
                  ...editingPost,
                  date: e.target.value
                }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "featured", checked: editingPost.featured, onChange: (e) => setEditingPost({
                  ...editingPost,
                  featured: e.target.checked
                }), className: "h-4 w-4 rounded border-cream/20 bg-cream/5 accent-lime text-plum-dark" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "featured", className: "text-xs font-semibold text-cream cursor-pointer select-none", children: "Pin to Featured Hero Banner" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Excerpt description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: editingPost.excerpt, onChange: (e) => setEditingPost({
                ...editingPost,
                excerpt: e.target.value
              }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]", placeholder: "Brief excerpt summing up article..." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2.5 mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                setEditingPost(null);
                setIsAddingPost(false);
              }, className: "px-4 py-2 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
                if (!editingPost.title || !editingPost.excerpt) {
                  alert("Please fill title and excerpt content");
                  return;
                }
                let updatedPosts = [...blogPosts];
                if (editingPost.featured) {
                  updatedPosts = updatedPosts.map((p) => ({
                    ...p,
                    featured: false
                  }));
                }
                if (isAddingPost) {
                  const newId = blogPosts.length ? Math.max(...blogPosts.map((p) => p.id)) + 1 : 1;
                  setBlogPosts([...updatedPosts, {
                    ...editingPost,
                    id: newId
                  }]);
                  showToast("New blog post published!");
                } else {
                  setBlogPosts(updatedPosts.map((p) => p.id === editingPost.id ? editingPost : p));
                  showToast("Blog post saved!");
                }
                setEditingPost(null);
                setIsAddingPost(false);
              }, className: "px-4 py-2 bg-lime text-plum-dark text-xs font-bold rounded-full", children: "Publish Article" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 divide-y divide-cream/5", children: blogPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 flex items-start justify-between gap-4 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-lime bg-lime/10 px-2 py-0.5 rounded", children: post.category }),
                post.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-plum-dark bg-lime px-2 py-0.5 rounded", children: "Featured" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-cream/55 font-mono", children: [
                  post.date,
                  " · ",
                  post.readTime,
                  " read"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm text-cream", children: post.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 line-clamp-1", children: post.excerpt })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingPost(post), className: "p-1 hover:bg-cream/10 rounded text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                if (confirm("Delete this blog post?")) {
                  setBlogPosts(blogPosts.filter((x) => x.id !== post.id));
                  showToast("Blog post deleted");
                }
              }, className: "p-1 hover:bg-red-500/20 rounded text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, post.id)) })
        ] }),
        activeTab === "Contact" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Contact info configuration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-1", children: "Configure details appearing on the Contact Us page" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "text-lime w-6 h-6 opacity-80" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveContact, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Office Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: contactMeta.phone, onChange: (e) => setContactMeta({
                    ...contactMeta,
                    phone: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Office Email" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: contactMeta.email, onChange: (e) => setContactMeta({
                    ...contactMeta,
                    email: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Office timings / Hours" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: contactMeta.hours, onChange: (e) => setContactMeta({
                    ...contactMeta,
                    hours: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] uppercase tracking-widest text-cream/60", children: "Location / Map Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: contactMeta.address, onChange: (e) => setContactMeta({
                    ...contactMeta,
                    address: e.target.value
                  }), className: "mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end border-t border-cream/10 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow hover:opacity-90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                " Save Contact Details"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DarkCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base", children: "Counselling inquiries" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/60 mt-0.5", children: "Leads and messages submitted from the public contact page" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "text-lime w-5 h-5 opacity-70" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mt-3", children: inquiries.map((inq) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-4 rounded-2xl border transition ${inq.resolved ? "bg-cream/[0.01] border-cream/5 opacity-60" : "bg-cream/5 border-cream/10"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-cream", children: inq.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/40", children: inq.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-bold px-2 py-0.5 rounded ${inq.resolved ? "bg-cream/10 text-cream/65" : "bg-lime/20 text-lime"}`, children: inq.resolved ? "Resolved" : "Active inquiry" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 text-xs text-cream/75 font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Phone: ",
                    inq.phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Email: ",
                    inq.email
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "|" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lime", children: [
                    "Interest: ",
                    inq.interest
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs bg-plum-dark/40 p-2.5 rounded-lg border border-cream/5 text-cream/80", children: inq.message })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 shrink-0", children: [
                !inq.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  setInquiries(inquiries.map((i) => i.id === inq.id ? {
                    ...i,
                    resolved: true
                  } : i));
                  showToast("Inquiry marked as resolved");
                }, className: "px-2.5 py-1 bg-lime hover:bg-lime/90 text-plum-dark rounded text-[10px] font-bold flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                  " Resolve"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                  if (confirm("Delete this inquiry record?")) {
                    setInquiries(inquiries.filter((i) => i.id !== inq.id));
                    showToast("Inquiry record deleted");
                  }
                }, className: "p-1 hover:bg-red-500/20 text-cream/50 hover:text-red-400 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
              ] })
            ] }) }, inq.id)) })
          ] })
        ] })
      ] })
    ] }),
    toast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 bg-lime text-plum-dark px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold animate-pulse text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 stroke-[3px]" }),
      toast
    ] })
  ] });
}
export {
  Settings as component
};
