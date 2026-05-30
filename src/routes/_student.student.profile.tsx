import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Edit3, X, Save } from "lucide-react";
import { Card } from "@/components/portal/PortalShell";
import { useClassroomStore, adminActions } from "@/lib/classroomStore";
import { useState } from "react";

export const Route = createFileRoute("/_student/student/profile")({
  component: Profile,
});

function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { currentUser } = useClassroomStore();
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    adminActions.updateUser(currentUser.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <h2 className="font-display text-xl font-bold text-plum-dark">Edit Profile</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold">Full Name</label>
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold">Email Address <span className="text-[9px] lowercase opacity-60 font-normal">(Login ID)</span></label>
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-widest text-slate-500 block mb-1 font-semibold">Phone Number</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 90000 00000"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm outline-none focus:border-plum/50 focus:ring-2 focus:ring-plum/20 transition-all" />
          </div>
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 rounded-full bg-slate-100 text-slate-600 py-2.5 text-sm font-semibold hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark text-cream py-2.5 text-sm font-bold shadow-sm hover:bg-plum transition-colors"><Save className="h-4 w-4" /> Save Details</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Profile() {
  const { currentUser, classrooms } = useClassroomStore();
  const [showEdit, setShowEdit] = useState(false);

  const name = currentUser?.name || "Student Name";
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const email = currentUser?.email || "No email";
  const phone = currentUser?.phone || "No phone added";
  const studentId = currentUser?.id || "";

  const enrolled = classrooms.filter(c => c.students.some(s => s.id === studentId));
  const activeClassrooms = enrolled.filter(c => c.students.find(s => s.id === studentId)?.status === "active");

  const programsEnrolled = Array.from(new Set(activeClassrooms.map(c => c.program)));
  const joinDate = enrolled.length > 0 ? new Date(enrolled[0].students.find(s => s.id === studentId)!.addedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "Recently";

  return (
    <div className="space-y-6">
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}

      <div className="rounded-3xl bg-plum-dark text-cream p-6 lg:p-8 relative overflow-hidden shadow-sm border border-plum-dark/90">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime/20 blur-3xl opacity-50 mix-blend-screen pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-lime text-plum-dark font-display text-3xl font-bold shadow-lg shadow-lime/20 border-2 border-lime/50">{initials}</div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">{name}</h1>
            <p className="text-cream/70 mt-1.5 text-sm flex items-center gap-2"><span className="bg-lime/20 text-lime px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest leading-none block pt-1">Student</span> User ID: <span className="font-mono">{currentUser?.id}</span> <span className="opacity-50">·</span> Joined {joinDate}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {programsEnrolled.map(p => (
                <span key={p} className="bg-cream/10 backdrop-blur-sm border border-cream/10 text-lime text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{p}</span>
              ))}
              {programsEnrolled.length === 0 && <span className="bg-cream/10 text-cream/50 text-xs px-3 py-1 rounded-full">Not enrolled in any programs</span>}
            </div>
          </div>
          <button onClick={() => setShowEdit(true)} className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold shadow-sm hover:bg-[#b0df2b] transition-colors shrink-0">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border border-slate-100 shadow-sm p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-display font-bold text-plum-dark text-lg">Personal Information</h3>
            <p className="text-xs text-slate-500 mt-0.5">Details used for your certificates and official communications.</p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { l: "Full Name", v: name },
              { l: "Email Address", v: email },
              { l: "Phone Number", v: phone },
              { l: "Account Role", v: "Student" },
              { l: "Status", v: "Active" },
            ].map((f) => (
              <div key={f.l}>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold mb-1">{f.l}</div>
                <div className="text-sm font-medium text-slate-800 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{f.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border border-slate-100 shadow-sm">
          <h3 className="font-display font-bold text-plum-dark text-lg">Contact Detail Overview</h3>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            <li className="flex items-center gap-3"><div className="bg-slate-100 p-2 rounded-lg text-plum"><Mail className="h-4 w-4" /></div> <span className="font-medium text-slate-800">{email}</span></li>
            <li className="flex items-center gap-3"><div className="bg-slate-100 p-2 rounded-lg text-plum"><Phone className="h-4 w-4" /></div> <span className="font-medium text-slate-800">{phone}</span></li>
            <li className="flex items-start gap-3"><div className="bg-slate-100 p-2 rounded-lg text-plum"><MapPin className="h-4 w-4" /></div> <span className="font-medium text-slate-800 mt-0.5">Location details not provided.<br/><span className="text-xs text-slate-400 font-normal">Contact admin to update.</span></span></li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-slate-100 shadow-sm">
          <h3 className="font-display font-bold text-plum-dark text-lg flex items-center gap-2"><GraduationCap className="h-5 w-5 text-plum" /> Enrollment History</h3>
          <ul className="mt-5 space-y-5">
            {enrolled.map(c => {
              const me = c.students.find(s => s.id === studentId)!;
              return (
                <li key={c.id} className="relative pl-5">
                  <div className="absolute left-0 top-[7px] bottom-[-20px] w-px bg-slate-200 last:hidden" />
                  <div className={`absolute left-[-4.5px] top-[7px] h-[10px] w-[10px] rounded-full border-2 border-white shadow-sm ${me.status === "active" ? "bg-lime" : "bg-slate-400"}`} />
                  <div className="font-semibold text-plum-dark">{c.program}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{c.name} · Enrolled {new Date(me.addedAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
                  <div className="mt-2 inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-md px-2.5 py-1 text-[10px] font-mono text-slate-600">ID: {me.enrollmentId}</div>
                </li>
              );
            })}
            {enrolled.length === 0 && <li className="text-sm text-slate-500">No enrollment history available.</li>}
          </ul>
        </Card>

        <Card className="border border-slate-100 shadow-sm">
          <h3 className="font-display font-bold text-plum-dark text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-plum" /> Academic Standing</h3>
          <div className="mt-5 space-y-4 text-sm">
            {activeClassrooms.map(c => {
              const me = c.students.find(s => s.id === studentId)!;
              return (
                <div key={c.id} className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="font-semibold text-plum-dark text-sm mb-3">{c.program}</div>
                  <div className="grid grid-cols-3 gap-2 text-center divide-x divide-slate-200">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Progress</div>
                      <div className="font-mono font-bold text-plum-dark">{me.progress}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Attendance</div>
                      <div className="font-mono font-bold text-plum-dark">{me.attendance}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Quiz Avg</div>
                      <div className="font-mono font-bold text-plum-dark">{me.quizAvg}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
            {activeClassrooms.length === 0 && <div className="text-center text-slate-500 py-6">No active programs.</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
