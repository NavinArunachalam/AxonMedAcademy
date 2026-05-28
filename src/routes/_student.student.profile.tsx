import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Edit3 } from "lucide-react";
import { Card } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_student/student/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-plum-dark text-cream p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="relative flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="grid h-24 w-24 place-items-center rounded-2xl bg-lime text-plum-dark font-display text-3xl font-bold">AS</div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold">Aanya Sharma</h1>
            <p className="text-cream/70 mt-1 text-sm">Student ID · MCA-2024-0381 · Joined Sep 2024</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="bg-cream/10 text-lime text-xs font-semibold px-3 py-1 rounded-full">Staff Nursing</span>
              <span className="bg-cream/10 text-cream text-xs font-semibold px-3 py-1 rounded-full">Batch 24</span>
              <span className="bg-cream/10 text-cream text-xs font-semibold px-3 py-1 rounded-full">Bengaluru</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-semibold">
            <Edit3 className="h-4 w-4" /> Edit profile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="font-display font-bold text-plum-dark text-lg">Personal information</h3>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {[
              { l: "Full name", v: "Aanya Priya Sharma" },
              { l: "Date of birth", v: "12 Aug 2002" },
              { l: "Gender", v: "Female" },
              { l: "Blood group", v: "B+" },
              { l: "Aadhaar", v: "•••• •••• 4521" },
              { l: "Emergency contact", v: "+91 98123 ••••" },
            ].map((f) => (
              <div key={f.l}>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{f.l}</div>
                <div className="text-sm font-semibold text-plum-dark mt-1">{f.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-plum-dark text-lg">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-plum" /> aanya.sharma@example.com</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-plum" /> +91 98765 43210</li>
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-plum mt-0.5" /> <span>HSR Layout, Sector 4<br/>Bengaluru 560102</span></li>
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-display font-bold text-plum-dark text-lg flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Education</h3>
          <ul className="mt-4 space-y-4">
            {[
              { t: "12th — Science (PCB)", s: "St. Joseph's PU College", y: "2020 · 87%" },
              { t: "10th CBSE", s: "DPS Bangalore", y: "2018 · 92%" },
            ].map((e) => (
              <li key={e.t} className="border-l-2 border-lime pl-4">
                <div className="font-semibold text-plum-dark">{e.t}</div>
                <div className="text-xs text-muted-foreground">{e.s} · {e.y}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-display font-bold text-plum-dark text-lg flex items-center gap-2"><Briefcase className="h-5 w-5" /> Placement preferences</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Preferred cities</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {["Bengaluru", "Chennai", "Hyderabad"].map((c) => (
                  <span key={c} className="bg-secondary text-plum-dark text-xs font-semibold px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Hospital type</div>
              <div className="text-plum-dark font-semibold">Multi-specialty · Tier 1</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Expected joining</div>
              <div className="flex items-center gap-2 text-plum-dark font-semibold"><Calendar className="h-4 w-4 text-plum" /> Jun 2026</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
