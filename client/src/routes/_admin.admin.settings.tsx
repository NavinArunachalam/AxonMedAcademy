import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { api, getAssetUrl } from "@/lib/api";
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  X,
  Building2,
  BookOpen,
  Users,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Check,
  Upload
} from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/settings")({
  component: Settings,
});

function Settings() {
  const [activeTab, setActiveTab] = useState<
    "Organization"| "About" | "Faculty" | "Placement" | "Blog" | "Contact"
  >("Organization");

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // --- STATE FOR TABS ---

  // 1. Organization
  const [org, setOrg] = useState({
    name: "Axon Academy",
    url: "axon.academy",
    email: "hello@axon.academy",
    phone: "+91 98765 43210",
    gst: "29AABCM1234C1ZK",
    timezone: "Asia/Kolkata",
    address: "Plot 21, Medical Campus,\nBengaluru 560001",
    about: "India's most trusted paramedical training academy."
  });

  // 2. Courses
  const [courses, setCourses] = useState([
    { id: 1, title: "Advanced Cardiac Care", specialty: "ICU Care", duration: "6 Months", mode: "Hybrid", fee: 45000, original: 60000, rating: 4.9, enrolled: 1240, tag: "Bestseller" },
    { id: 2, title: "Staff Nursing Diploma", specialty: "Nursing", duration: "1 Year", mode: "Offline", fee: 68000, original: 85000, rating: 4.8, enrolled: 2100 },
    { id: 3, title: "OT Technician Program", specialty: "OT Tech", duration: "3 Months", mode: "Hybrid", fee: 32000, original: 42000, rating: 4.7, enrolled: 820 },
    { id: 4, title: "Lab Technician (DMLT)", specialty: "Lab Tech", duration: "1 Year", mode: "Hybrid", fee: 54000, original: 70000, rating: 4.8, enrolled: 1530 },
    { id: 5, title: "Radiology & Imaging", specialty: "Radiology", duration: "6 Months", mode: "Hybrid", fee: 49000, original: 65000, rating: 4.6, enrolled: 690 },
    { id: 6, title: "ICU & Critical Care", specialty: "ICU Care", duration: "6 Months", mode: "Offline", fee: 52000, original: 70000, rating: 4.9, enrolled: 1010 }
  ]);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);

  // 3. About Us
  const [aboutText, setAboutText] = useState({
    mission: "To make world-class paramedical education accessible to every aspirant in India — regardless of background or budget.",
    vision: "A future where every hospital bedside is supported by a confident, certified, expertly trained paramedical professional.",
    values: "Empathy in care. Rigor in training. Honesty in assessment. Respect for every learner who trusts us with their future."
  });
  const [milestones, setMilestones] = useState([
    { id: 1, year: "2018", title: "Academy founded", description: "Started with 32 students in Bengaluru." },
    { id: 2, year: "2020", title: "Online expansion", description: "Pivoted to hybrid model serving 1,000+ students nationally." },
    { id: 3, year: "2022", title: "100 hospital partners", description: "Signed flagship MOUs with Apollo, Fortis, Manipal." },
    { id: 4, year: "2024", title: "Blockchain certificates", description: "First Indian academy with on-chain verifiable credentials." }
  ]);
  const [editingMilestone, setEditingMilestone] = useState<any | null>(null);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);

  // 4. Faculty
  const [facultyList, setFacultyList] = useState<any[]>([]);
  const [editingFaculty, setEditingFaculty] = useState<any | null>(null);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [isLoadingFaculty, setIsLoadingFaculty] = useState(false);
  const facultyPhotoRef = useRef<HTMLInputElement>(null);
  const [facultyPhotoFile, setFacultyPhotoFile] = useState<File | null>(null);
  const [facultyPhotoPreview, setFacultyPhotoPreview] = useState<string | null>(null);

  const fetchFaculty = async () => {
    setIsLoadingFaculty(true);
    try {
      const res = await api.get("/admin/faculty");
      if (res.success) {
        setFacultyList(res.facultyList || []);
      }
    } catch (err: any) {
      console.error("Failed to fetch faculty:", err);
      showToast("Error loading faculty members");
    } finally {
      setIsLoadingFaculty(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Faculty") {
      fetchFaculty();
    }
  }, [activeTab]);

  // 5. Placements
  const [hospitalPartners, setHospitalPartners] = useState([
    "Apollo Hospitals", "Fortis Healthcare", "Manipal Hospitals", "Max Healthcare", "Narayana Health", "Medanta"
  ]);
  const [newHospital, setNewHospital] = useState("");
  const [stories, setStories] = useState([
    { id: 1, name: "Priya Krishnan", role: "Staff Nurse", hospital: "Apollo Hospitals", salary: "₹3.6L", city: "Bengaluru" },
    { id: 2, name: "Arjun Reddy", role: "OT Technician", hospital: "Manipal", salary: "₹4.2L", city: "Hyderabad" },
    { id: 3, name: "Sneha Pillai", role: "Lab Technician", hospital: "Fortis", salary: "₹3.2L", city: "Mumbai" }
  ]);
  const [editingStory, setEditingStory] = useState<any | null>(null);
  const [isAddingStory, setIsAddingStory] = useState(false);

  // 6. Blog
  const [blogPosts, setBlogPosts] = useState([
    { id: 1, title: "What hospitals look for in a Staff Nurse hire", category: "Career", date: "May 18, 2026", readTime: "6 min", excerpt: "Insights from 50+ HR heads at India's leading hospital chains.", featured: true },
    { id: 2, title: "ICU monitoring trends every junior tech should master", category: "Clinical", date: "May 12, 2026", readTime: "8 min", excerpt: "Modern bedside monitoring is shifting. Here's the new baseline.", featured: false },
    { id: 3, title: "How to pass our proctored DMLT exam (without panic)", category: "Exam Prep", date: "May 04, 2026", readTime: "5 min", excerpt: "A study plan from candidates who scored in the top 5.", featured: false }
  ]);
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  // 7. Contact Info & Submissions
  const [contactMeta, setContactMeta] = useState({
    address: "Plot 21, Medical Campus, Hosur Road, Bengaluru — 560001",
    phone: "+91 98765 43210",
    email: "hello@axon.academy",
    hours: "Monday – Saturday, 9 AM to 8 PM"
  });
  const [inquiries, setInquiries] = useState([
    { id: 1, name: "Ramesh Kumar", email: "ramesh@gmail.com", phone: "+91 99887 76655", interest: "Cardiac Care", message: "Hi, I want to know about the batch starting date and fees installment options.", resolved: false, date: "June 12, 2026" },
    { id: 2, name: "Sunitha Rao", email: "sunitha@outlook.com", phone: "+91 98765 00112", interest: "OT Tech", message: "Is placement assistance provided after graduation?", resolved: true, date: "June 10, 2026" }
  ]);

  // --- ACTIONS ---

  const handleSaveOrg = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Organization settings saved successfully!");
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("About content saved successfully!");
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Contact information saved successfully!");
  };

  return (
    <div className="space-y-6 text-cream pb-12">
      <div>
        <h1 className="font-display text-3xl font-bold">Admin settings</h1>
        <p className="text-cream/60 text-sm mt-1">Manage public site pages, configurations and layouts</p>
      </div>

      {/* Main settings layout */}
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">

        {/* Navigation sidebar */}
        <aside className="space-y-1">
          {["Organization", "Course", "About", "Faculty", "Placement", "Blog", "Contact"].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as any);
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
                }}
                className={`w-full text-left rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${isSelected
                    ? "bg-lime text-plum-dark font-bold"
                    : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </aside>

        {/* Dynamic configurations view card */}
        <div className="space-y-6">

          {/* 1. ORGANIZATION SETTINGS */}
          {activeTab === "Organization" && (
            <DarkCard>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg">Organization details</h3>
                  <p className="text-xs text-cream/60 mt-1">General public information about Axon Academy</p>
                </div>
                <Building2 className="text-lime w-6 h-6 opacity-80" />
              </div>

              <form onSubmit={handleSaveOrg} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Academy name</label>
                    <input
                      type="text"
                      value={org.name}
                      onChange={(e) => setOrg({ ...org, name: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Display URL</label>
                    <input
                      type="text"
                      value={org.url}
                      onChange={(e) => setOrg({ ...org, url: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Support email</label>
                    <input
                      type="email"
                      value={org.email}
                      onChange={(e) => setOrg({ ...org, email: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Phone</label>
                    <input
                      type="text"
                      value={org.phone}
                      onChange={(e) => setOrg({ ...org, phone: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">GST Code</label>
                    <input
                      type="text"
                      value={org.gst}
                      onChange={(e) => setOrg({ ...org, gst: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Time zone</label>
                    <input
                      type="text"
                      value={org.timezone}
                      onChange={(e) => setOrg({ ...org, timezone: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Address</label>
                    <textarea
                      value={org.address}
                      onChange={(e) => setOrg({ ...org, address: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">About summary</label>
                    <textarea
                      value={org.about}
                      onChange={(e) => setOrg({ ...org, about: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]"
                    />
                  </div>
                </div>

                <div className="mt-7 flex justify-end gap-3 border-t border-cream/10 pt-5">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow hover:opacity-90">
                    <Save className="h-4 w-4" /> Save changes
                  </button>
                </div>
              </form>
            </DarkCard>
          )}

          {/* 3. ABOUT PAGE CONTENT SETTINGS */}
          {activeTab === "About" && (
            <div className="space-y-6">
              <DarkCard>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg">About details & Core values</h3>
                    <p className="text-xs text-cream/60 mt-1">Configure company pillars and statements</p>
                  </div>
                  <BookOpen className="text-lime w-6 h-6 opacity-80" />
                </div>

                <form onSubmit={handleSaveAbout} className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Mission statement</label>
                      <textarea
                        value={aboutText.mission}
                        onChange={(e) => setAboutText({ ...aboutText, mission: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Vision statement</label>
                      <textarea
                        value={aboutText.vision}
                        onChange={(e) => setAboutText({ ...aboutText, vision: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Pillar values description</label>
                      <textarea
                        value={aboutText.values}
                        onChange={(e) => setAboutText({ ...aboutText, values: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[70px]"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end border-t border-cream/10 pt-4">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold hover:opacity-90">
                      <Save className="h-4 w-4" /> Save Core Statements
                    </button>
                  </div>
                </form>
              </DarkCard>

              {/* Milestones settings */}
              <DarkCard>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base">Academy history timeline</h3>
                    <p className="text-xs text-cream/60 mt-0.5">Edit milestones showing progress year over year</p>
                  </div>
                  {!editingMilestone && !isAddingMilestone && (
                    <button
                      onClick={() => {
                        setIsAddingMilestone(true);
                        setEditingMilestone({ year: "", title: "", description: "" });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-3 py-1.5 text-[11px] font-bold"
                    >
                      <Plus className="h-3 w-3" /> Add milestone
                    </button>
                  )}
                </div>

                {(editingMilestone || isAddingMilestone) ? (
                  <div className="space-y-4 border-t border-cream/10 pt-4">
                    <h4 className="font-semibold text-xs text-lime">{isAddingMilestone ? "Add Milestone" : "Edit Milestone"}</h4>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Year</label>
                        <input
                          type="text"
                          value={editingMilestone.year}
                          onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. 2026"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Heading Title</label>
                        <input
                          type="text"
                          value={editingMilestone.title}
                          onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. Signed flagship hospital partnerships"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Detail description</label>
                      <textarea
                        value={editingMilestone.description}
                        onChange={(e) => setEditingMilestone({ ...editingMilestone, description: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime min-h-[60px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMilestone(null);
                          setIsAddingMilestone(false);
                        }}
                        className="px-3.5 py-1.5 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingMilestone.year || !editingMilestone.title) {
                            alert("Please fill year and title");
                            return;
                          }
                          if (isAddingMilestone) {
                            const newId = milestones.length ? Math.max(...milestones.map(m => m.id)) + 1 : 1;
                            setMilestones([...milestones, { ...editingMilestone, id: newId }]);
                            showToast("Academy milestone added!");
                          } else {
                            setMilestones(milestones.map(m => m.id === editingMilestone.id ? editingMilestone : m));
                            showToast("Milestone updated!");
                          }
                          setEditingMilestone(null);
                          setIsAddingMilestone(false);
                        }}
                        className="px-3.5 py-1.5 bg-lime text-plum-dark text-xs font-bold rounded-full"
                      >
                        Save Milestone
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-cream/5 mt-3">
                    {milestones.map((m) => (
                      <div key={m.id} className="py-3 flex justify-between gap-4 items-start group">
                        <div className="flex gap-4">
                          <span className="font-mono text-lime font-bold text-sm bg-cream/5 rounded px-2.5 py-1 h-fit shrink-0">{m.year}</span>
                          <div>
                            <h5 className="font-semibold text-sm text-cream">{m.title}</h5>
                            <p className="text-xs text-cream/60 mt-1">{m.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingMilestone(m)}
                            className="p-1 hover:bg-cream/10 rounded text-cream"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this milestone?")) {
                                setMilestones(milestones.filter(x => x.id !== m.id));
                                showToast("Milestone deleted");
                              }
                            }}
                            className="p-1 hover:bg-red-500/20 rounded text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DarkCard>
            </div>
          )}

          {/* 4. FACULTY SETTINGS */}
          {activeTab === "Faculty" && (
            <DarkCard>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg">Faculty & Clinicians</h3>
                  <p className="text-xs text-cream/60 mt-1">Manage public profile cards for teaching doctors and nurses</p>
                </div>
                {!editingFaculty && !isAddingFaculty && (
                  <button
                    onClick={() => {
                      setIsAddingFaculty(true);
                      setEditingFaculty({ name: "", role: "", specialty: "", years: 10, rating: 4.8, initials: "" });
                      setFacultyPhotoFile(null);
                      setFacultyPhotoPreview(null);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Faculty
                  </button>
                )}
              </div>

              {(editingFaculty || isAddingFaculty) ? (
                <div className="space-y-4 border-t border-cream/10 pt-4">
                  <h4 className="font-semibold text-sm text-lime">{isAddingFaculty ? "Register New Faculty" : "Edit Faculty credentials"}</h4>
                  
                  {/* ── Photo picker ── */}
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0">
                      <div className="h-24 w-24 overflow-hidden rounded-2xl bg-cream/5 border-2 border-dashed border-cream/10 grid place-items-center">
                        {facultyPhotoPreview ? (
                          <img src={facultyPhotoPreview} alt="Preview" className="h-full w-full object-cover" />
                        ) : editingFaculty?.image ? (
                          <img src={getAssetUrl(editingFaculty.image)} alt="Current" className="h-full w-full object-cover" />
                        ) : (
                          <Users className="h-8 w-8 text-cream/10" />
                        )}
                      </div>
                      {(facultyPhotoPreview || editingFaculty?.image) && (
                        <button
                          type="button"
                          onClick={() => {
                            setFacultyPhotoFile(null);
                            setFacultyPhotoPreview(null);
                            setEditingFaculty((f: any) => ({ ...f, image: null, removeImage: true }));
                            if (facultyPhotoRef.current) facultyPhotoRef.current.value = "";
                          }}
                          className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-red-500 text-white grid place-items-center shadow"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => facultyPhotoRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-full bg-cream/10 hover:bg-cream/20 text-cream border border-cream/10 px-4 py-2 text-xs font-bold transition-colors"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {facultyPhotoPreview || editingFaculty?.image ? "Change Photo" : "Upload Photo"}
                      </button>
                      <p className="text-[10px] text-cream/30 uppercase tracking-[0.15em]">JPG, PNG or WebP · Max 2MB</p>
                      <input
                        ref={facultyPhotoRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFacultyPhotoFile(file);
                            setFacultyPhotoPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Full Name</label>
                      <input
                        type="text"
                        value={editingFaculty.name}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. Dr. Anita Sharma"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Initials (For Avatar)</label>
                      <input
                        type="text"
                        maxLength={2}
                        value={editingFaculty.initials}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, initials: e.target.value.toUpperCase() })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. AS"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Role Title</label>
                      <input
                        type="text"
                        value={editingFaculty.role}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, role: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. Chief Cardiologist"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Specialty</label>
                      <input
                        type="text"
                        value={editingFaculty.specialty}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, specialty: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. Cardiac Care"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Years of Experience</label>
                      <input
                        type="number"
                        value={editingFaculty.years}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, years: parseInt(e.target.value) || 0 })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Rating score</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={editingFaculty.rating}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, rating: parseFloat(e.target.value) || 5.0 })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaculty(null);
                        setIsAddingFaculty(false);
                        setFacultyPhotoFile(null);
                        setFacultyPhotoPreview(null);
                        if (facultyPhotoRef.current) facultyPhotoRef.current.value = "";
                      }}
                      className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
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
                          fd.append("rating", String(editingFaculty.rating || 5.0));
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
                        } catch (err: any) {
                          alert(err.message || "Operation failed");
                        }
                      }}
                      className="px-4 py-2 bg-lime text-plum-dark text-xs font-bold rounded-full"
                    >
                      Save Faculty Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {isLoadingFaculty ? (
                    <div className="col-span-2 text-center py-6 text-sm text-cream/50">Loading faculty members...</div>
                  ) : facultyList.length === 0 ? (
                    <div className="col-span-2 text-center py-6 text-sm text-cream/50">No faculty members found.</div>
                  ) : (
                    facultyList.map(f => (
                      <div key={f._id || f.id} className="flex gap-4 p-4 rounded-2xl bg-cream/5 border border-cream/10 relative group">
                        <div className="w-12 h-12 bg-lime text-plum-dark rounded-xl overflow-hidden flex items-center justify-center font-display font-bold text-base shrink-0">
                          {f.image ? (
                            <img src={getAssetUrl(f.image)} alt={f.name} className="h-full w-full object-cover" />
                          ) : (
                            f.initials || f.name.charAt(0)
                          )}
                        </div>
                        <div className="space-y-1 pr-16">
                          <h4 className="font-semibold text-sm text-cream">{f.name}</h4>
                          <div className="text-xs text-cream/70 font-medium">{f.role}</div>
                          <div className="text-[10px] text-cream/55 flex items-center gap-3">
                            <span>{f.specialty}</span>
                            <span>·</span>
                            <span>{f.years} yrs exp</span>
                            <span>·</span>
                            <span className="inline-flex items-center gap-0.5 text-lime"><Star className="h-3 w-3 fill-lime" /> {f.rating}</span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setEditingFaculty(f);
                              setFacultyPhotoFile(null);
                              setFacultyPhotoPreview(null);
                            }}
                            className="p-1 hover:bg-cream/10 rounded text-cream/80"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Remove ${f.name} from faculty?`)) {
                                try {
                                  const res = await api.delete(`/admin/faculty/${f._id || f.id}`);
                                  if (res.success) {
                                    showToast("Faculty profile removed");
                                    fetchFaculty();
                                  }
                                } catch (err: any) {
                                  alert(err.message || "Failed to remove faculty member");
                                }
                              }
                            }}
                            className="p-1 hover:bg-red-500/20 rounded text-red-400"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </DarkCard>
          )}

          {/* 5. PLACEMENT & RECRUITER SETTINGS */}
          {activeTab === "Placement" && (
            <div className="space-y-6">

              {/* Partner Hospitals */}
              <DarkCard>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base">Partner hospital networks</h3>
                    <p className="text-xs text-cream/60 mt-0.5">Recruiting medical networks appearing on the site</p>
                  </div>
                  <Building2 className="text-lime w-5 h-5 opacity-70" />
                </div>

                <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-cream/5 border border-cream/10">
                  {hospitalPartners.map(h => (
                    <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1 bg-plum-dark border border-cream/15 text-cream rounded-full text-xs font-semibold">
                      {h}
                      <button
                        onClick={() => {
                          setHospitalPartners(hospitalPartners.filter(x => x !== h));
                          showToast("Partner hospital removed");
                        }}
                        className="text-cream/50 hover:text-red-400 font-bold ml-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="e.g. Columbia Asia"
                    value={newHospital}
                    onChange={(e) => setNewHospital(e.target.value)}
                    className="flex-1 bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-xs outline-none focus:border-lime"
                  />
                  <button
                    onClick={() => {
                      if (!newHospital.trim()) return;
                      if (hospitalPartners.includes(newHospital.trim())) {
                        alert("Hospital already added");
                        return;
                      }
                      setHospitalPartners([...hospitalPartners, newHospital.trim()]);
                      setNewHospital("");
                      showToast("Hospital partner listed!");
                    }}
                    className="inline-flex items-center gap-1 bg-lime text-plum-dark px-3 py-2 text-xs font-bold rounded-xl"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </DarkCard>

              {/* Placement success stories */}
              <DarkCard>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg">Placement success stories</h3>
                    <p className="text-xs text-cream/60 mt-1">Manage testimonials and placements of recent graduates</p>
                  </div>
                  {!editingStory && !isAddingStory && (
                    <button
                      onClick={() => {
                        setIsAddingStory(true);
                        setEditingStory({ name: "", role: "", hospital: "", salary: "", city: "" });
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-3.5 py-1.5 text-xs font-bold"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Story
                    </button>
                  )}
                </div>

                {(editingStory || isAddingStory) ? (
                  <div className="space-y-4 border-t border-cream/10 pt-4">
                    <h4 className="font-semibold text-xs text-lime">{isAddingStory ? "Add Placement Story" : "Edit Story"}</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Graduate Name</label>
                        <input
                          type="text"
                          value={editingStory.name}
                          onChange={(e) => setEditingStory({ ...editingStory, name: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. Priya Krishnan"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Placed Role</label>
                        <input
                          type="text"
                          value={editingStory.role}
                          onChange={(e) => setEditingStory({ ...editingStory, role: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. Staff Nurse"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Hospital Recruiter</label>
                        <input
                          type="text"
                          value={editingStory.hospital}
                          onChange={(e) => setEditingStory({ ...editingStory, hospital: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. Apollo Hospitals"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">Package (Per Year)</label>
                        <input
                          type="text"
                          value={editingStory.salary}
                          onChange={(e) => setEditingStory({ ...editingStory, salary: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. ₹3.6L"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-cream/60">City</label>
                        <input
                          type="text"
                          value={editingStory.city}
                          onChange={(e) => setEditingStory({ ...editingStory, city: e.target.value })}
                          className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-lime"
                          placeholder="e.g. Bengaluru"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 mt-5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStory(null);
                          setIsAddingStory(false);
                        }}
                        className="px-4 py-1.5 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingStory.name || !editingStory.hospital) {
                            alert("Please fill name and hospital");
                            return;
                          }
                          if (isAddingStory) {
                            const newId = stories.length ? Math.max(...stories.map(s => s.id)) + 1 : 1;
                            setStories([...stories, { ...editingStory, id: newId }]);
                            showToast("New success story added!");
                          } else {
                            setStories(stories.map(s => s.id === editingStory.id ? editingStory : s));
                            showToast("Success story updated!");
                          }
                          setEditingStory(null);
                          setIsAddingStory(false);
                        }}
                        className="px-4 py-1.5 bg-lime text-plum-dark text-xs font-bold rounded-full"
                      >
                        Save Story
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead>
                        <tr className="border-b border-cream/10 text-cream/60 uppercase font-semibold">
                          <th className="pb-3">Graduate</th>
                          <th className="pb-3">Role</th>
                          <th className="pb-3">Hospital</th>
                          <th className="pb-3">City</th>
                          <th className="pb-3 text-right">Salary</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cream/5">
                        {stories.map(story => (
                          <tr key={story.id} className="group hover:bg-cream/[0.02]">
                            <td className="py-2.5 font-medium text-cream">{story.name}</td>
                            <td className="py-2.5 text-cream/70">{story.role}</td>
                            <td className="py-2.5 text-cream/70 font-semibold">{story.hospital}</td>
                            <td className="py-2.5 text-cream/60">{story.city}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-lime">{story.salary}</td>
                            <td className="py-2.5 text-right">
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => setEditingStory(story)}
                                  className="p-1 hover:bg-cream/10 rounded text-cream"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm("Delete this story?")) {
                                      setStories(stories.filter(x => x.id !== story.id));
                                      showToast("Placement story removed");
                                    }
                                  }}
                                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </DarkCard>
            </div>
          )}

          {/* 6. BLOG POST CONFIGURATIONS */}
          {activeTab === "Blog" && (
            <DarkCard>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg">Site Journal / Blog</h3>
                  <p className="text-xs text-cream/60 mt-1">Manage featured posts, clinical trends, and study plans</p>
                </div>
                {!editingPost && !isAddingPost && (
                  <button
                    onClick={() => {
                      setIsAddingPost(true);
                      setEditingPost({ title: "", category: "Career", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), readTime: "5 min", excerpt: "", featured: false });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-lime text-plum-dark px-4 py-2 text-xs font-bold"
                  >
                    <Plus className="h-3.5 w-3.5" /> New Article
                  </button>
                )}
              </div>

              {(editingPost || isAddingPost) ? (
                <div className="space-y-4 border-t border-cream/10 pt-4">
                  <h4 className="font-semibold text-sm text-lime">{isAddingPost ? "Compose Article" : "Edit Article summary"}</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Article Title</label>
                      <input
                        type="text"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. Salary benchmarks for paramedical roles"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Category</label>
                      <select
                        value={editingPost.category}
                        onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                        className="mt-1.5 w-full bg-plum-dark text-cream border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      >
                        {["Career", "Clinical", "Exam Prep", "Stories"].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Read Time (minutes)</label>
                      <input
                        type="text"
                        value={editingPost.readTime}
                        onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                        placeholder="e.g. 6 min"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Publish Date</label>
                      <input
                        type="text"
                        value={editingPost.date}
                        onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={editingPost.featured}
                        onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                        className="h-4 w-4 rounded border-cream/20 bg-cream/5 accent-lime text-plum-dark"
                      />
                      <label htmlFor="featured" className="text-xs font-semibold text-cream cursor-pointer select-none">
                        Pin to Featured Hero Banner
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-cream/60">Excerpt description</label>
                    <textarea
                      value={editingPost.excerpt}
                      onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                      className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]"
                      placeholder="Brief excerpt summing up article..."
                    />
                  </div>

                  <div className="flex justify-end gap-2.5 mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPost(null);
                        setIsAddingPost(false);
                      }}
                      className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-xs font-semibold rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!editingPost.title || !editingPost.excerpt) {
                          alert("Please fill title and excerpt content");
                          return;
                        }

                        let updatedPosts = [...blogPosts];
                        if (editingPost.featured) {
                          // Unfeature all others since there can be only one featured hero
                          updatedPosts = updatedPosts.map(p => ({ ...p, featured: false }));
                        }

                        if (isAddingPost) {
                          const newId = blogPosts.length ? Math.max(...blogPosts.map(p => p.id)) + 1 : 1;
                          setBlogPosts([...updatedPosts, { ...editingPost, id: newId }]);
                          showToast("New blog post published!");
                        } else {
                          setBlogPosts(updatedPosts.map(p => p.id === editingPost.id ? editingPost : p));
                          showToast("Blog post saved!");
                        }
                        setEditingPost(null);
                        setIsAddingPost(false);
                      }}
                      className="px-4 py-2 bg-lime text-plum-dark text-xs font-bold rounded-full"
                    >
                      Publish Article
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-cream/5">
                  {blogPosts.map(post => (
                    <div key={post.id} className="py-4 flex items-start justify-between gap-4 group">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-lime bg-lime/10 px-2 py-0.5 rounded">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-plum-dark bg-lime px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          <span className="text-[10px] text-cream/55 font-mono">{post.date} · {post.readTime} read</span>
                        </div>
                        <h4 className="font-semibold text-sm text-cream">{post.title}</h4>
                        <p className="text-xs text-cream/60 line-clamp-1">{post.excerpt}</p>
                      </div>
                      <div className="flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="p-1 hover:bg-cream/10 rounded text-cream"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this blog post?")) {
                              setBlogPosts(blogPosts.filter(x => x.id !== post.id));
                              showToast("Blog post deleted");
                            }
                          }}
                          className="p-1 hover:bg-red-500/20 rounded text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DarkCard>
          )}

          {/* 7. CONTACT & INQUIRIES SETTINGS */}
          {activeTab === "Contact" && (
            <div className="space-y-6">

              {/* Public Contact details */}
              <DarkCard>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-display font-bold text-lg">Contact info configuration</h3>
                    <p className="text-xs text-cream/60 mt-1">Configure details appearing on the Contact Us page</p>
                  </div>
                  <Mail className="text-lime w-6 h-6 opacity-80" />
                </div>

                <form onSubmit={handleSaveContact} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Office Phone</label>
                      <input
                        type="text"
                        value={contactMeta.phone}
                        onChange={(e) => setContactMeta({ ...contactMeta, phone: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Office Email</label>
                      <input
                        type="email"
                        value={contactMeta.email}
                        onChange={(e) => setContactMeta({ ...contactMeta, email: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Office timings / Hours</label>
                      <input
                        type="text"
                        value={contactMeta.hours}
                        onChange={(e) => setContactMeta({ ...contactMeta, hours: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-cream/60">Location / Map Address</label>
                      <input
                        type="text"
                        value={contactMeta.address}
                        onChange={(e) => setContactMeta({ ...contactMeta, address: e.target.value })}
                        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end border-t border-cream/10 pt-4">
                    <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow hover:opacity-90">
                      <Save className="h-4 w-4" /> Save Contact Details
                    </button>
                  </div>
                </form>
              </DarkCard>

              {/* Submitted Inquiries List */}
              <DarkCard>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base">Counselling inquiries</h3>
                    <p className="text-xs text-cream/60 mt-0.5">Leads and messages submitted from the public contact page</p>
                  </div>
                  <MessageSquare className="text-lime w-5 h-5 opacity-70" />
                </div>

                <div className="space-y-4 mt-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-2xl border transition ${inq.resolved
                          ? "bg-cream/[0.01] border-cream/5 opacity-60"
                          : "bg-cream/5 border-cream/10"
                        }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-cream">{inq.name}</span>
                            <span className="text-[10px] text-cream/40">{inq.date}</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${inq.resolved ? "bg-cream/10 text-cream/65" : "bg-lime/20 text-lime"
                              }`}>
                              {inq.resolved ? "Resolved" : "Active inquiry"}
                            </span>
                          </div>
                          <div className="mt-1.5 text-xs text-cream/75 font-mono">
                            <span>Phone: {inq.phone}</span>
                            <span className="mx-2">|</span>
                            <span>Email: {inq.email}</span>
                            <span className="mx-2">|</span>
                            <span className="text-lime">Interest: {inq.interest}</span>
                          </div>
                          <p className="mt-3 text-xs bg-plum-dark/40 p-2.5 rounded-lg border border-cream/5 text-cream/80">
                            {inq.message}
                          </p>
                        </div>

                        <div className="flex gap-1 shrink-0">
                          {!inq.resolved && (
                            <button
                              onClick={() => {
                                setInquiries(inquiries.map(i => i.id === inq.id ? { ...i, resolved: true } : i));
                                showToast("Inquiry marked as resolved");
                              }}
                              className="px-2.5 py-1 bg-lime hover:bg-lime/90 text-plum-dark rounded text-[10px] font-bold flex items-center gap-1"
                            >
                              <Check className="h-3 w-3" /> Resolve
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (confirm("Delete this inquiry record?")) {
                                setInquiries(inquiries.filter(i => i.id !== inq.id));
                                showToast("Inquiry record deleted");
                              }
                            }}
                            className="p-1 hover:bg-red-500/20 text-cream/50 hover:text-red-400 rounded"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DarkCard>
            </div>
          )}

        </div>
      </div>

      {/* Premium Save Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-lime text-plum-dark px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 font-bold animate-pulse text-xs">
          <Check className="h-4 w-4 stroke-[3px]" />
          {toast}
        </div>
      )}
    </div>
  );
}
