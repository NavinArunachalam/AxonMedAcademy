import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/site/Layout";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star, Clock, Users, X } from "lucide-react";

export const Route = createFileRoute("/courses")({ component: CoursesPage });

const SPECIALTIES = ["Nursing", "Lab Tech", "OT Tech", "ICU Care", "Radiology", "Pharmacy", "Dental", "Hospital Admin"];
const DURATIONS  = ["1 Month", "3 Months", "6 Months", "1 Year"];
const MODES      = ["Online", "Offline", "Hybrid"];

type Course = {
  id: number; title: string; specialty: string; duration: string;
  mode: string; fee: number; original: number; rating: number;
  enrolled: number; tag?: string;
};

const COURSES: Course[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: [
    "Advanced Cardiac Care", "Staff Nursing Diploma", "OT Technician Program", "Lab Technician (DMLT)",
    "Radiology & Imaging", "ICU & Critical Care", "Pharmacy Assistant", "Hospital Administration",
    "Pediatric Nursing", "Dialysis Tech", "Phlebotomy & IV", "Dental Hygienist",
    "Emergency Response", "Geriatric Care",
  ][i],
  specialty: ["ICU Care", "Nursing", "OT Tech", "Lab Tech", "Radiology", "ICU Care", "Pharmacy", "Hospital Admin", "Nursing", "Lab Tech", "Nursing", "Dental", "ICU Care", "Nursing"][i],
  duration:  ["6 Months", "1 Year", "3 Months", "1 Year", "6 Months", "6 Months", "3 Months", "1 Year", "1 Year", "3 Months", "1 Month", "1 Year", "1 Month", "3 Months"][i],
  mode:      ["Hybrid", "Offline", "Hybrid", "Hybrid", "Hybrid", "Offline", "Online", "Online", "Offline", "Hybrid", "Online", "Offline", "Online", "Hybrid"][i],
  fee:       [45000, 68000, 32000, 54000, 49000, 52000, 24000, 38000, 62000, 35000, 12000, 58000, 9000, 28000][i],
  original:  [60000, 85000, 42000, 70000, 65000, 70000, 30000, 50000, 80000, 45000, 18000, 75000, 14000, 36000][i],
  rating:    [4.9, 4.8, 4.7, 4.8, 4.6, 4.9, 4.5, 4.6, 4.8, 4.7, 4.5, 4.6, 4.4, 4.7][i],
  enrolled:  [1240, 2100, 820, 1530, 690, 1010, 460, 380, 920, 540, 320, 410, 280, 360][i],
  tag:       i % 5 === 0 ? "Bestseller" : i % 7 === 0 ? "New" : undefined,
}));

function CoursesPage() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState<string[]>([]);
  const [dur, setDur] = useState<string[]>([]);
  const [mode, setMode] = useState<string[]>([]);
  const [sort, setSort] = useState("popular");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    let r = COURSES.filter(c =>
      (!q || c.title.toLowerCase().includes(q.toLowerCase())) &&
      (spec.length === 0 || spec.includes(c.specialty)) &&
      (dur.length === 0 || dur.includes(c.duration)) &&
      (mode.length === 0 || mode.includes(c.mode))
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.fee - b.fee);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.fee - a.fee);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [q, spec, dur, mode, sort]);

  const FilterPanel = (
    <div className="space-y-7">
      <FilterGroup label="Specialty" options={SPECIALTIES} selected={spec} onChange={setSpec} />
      <FilterGroup label="Duration"  options={DURATIONS}   selected={dur}  onChange={setDur} />
      <FilterGroup label="Mode"      options={MODES}       selected={mode} onChange={setMode} />
      {(spec.length || dur.length || mode.length) > 0 && (
        <button onClick={() => { setSpec([]); setDur([]); setMode([]); }} className="text-xs font-semibold text-plum underline">Clear all filters</button>
      )}
    </div>
  );

  return (
    <PublicLayout>
      {/* Page header */}
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 lg:py-20">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-plum">— Catalog</div>
          <h1 className="mt-3 font-display text-4xl lg:text-6xl font-bold text-plum-dark tracking-tight">
            Find the course that<br/>becomes your career.
          </h1>
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-plum-dark/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-full border border-border bg-card pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-plum"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start">
            {FilterPanel}
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 gap-3">
              <div className="text-sm text-foreground/70">{filtered.length} courses</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setOpen(true)} className="lg:hidden inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold focus:outline-none">
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(c => <CourseCard key={c.id} c={c} />)}
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-plum-dark/40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-cream p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="font-display font-bold text-plum-dark text-lg">Filters</span>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><X className="h-4 w-4" /></button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </PublicLayout>
  );
}

function FilterGroup({ label, options, selected, onChange }: { label: string; options: string[]; selected: string[]; onChange: (v: string[]) => void; }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm text-plum-dark uppercase tracking-wider mb-3">{label}</h4>
      <div className="space-y-2">
        {options.map(o => {
          const on = selected.includes(o);
          return (
            <label key={o} className="flex items-center gap-3 cursor-pointer text-sm group">
              <span className={`grid h-5 w-5 place-items-center rounded-md border transition ${on ? "bg-plum-dark border-plum-dark" : "border-border group-hover:border-plum-dark/50"}`}>
                {on && <span className="h-2 w-2 bg-lime rounded-sm" />}
              </span>
              <input type="checkbox" className="sr-only" checked={on} onChange={() => onChange(on ? selected.filter(s => s !== o) : [...selected, o])} />
              <span className={on ? "text-plum-dark font-semibold" : "text-foreground/75"}>{o}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CourseCard({ c }: { c: Course }) {
  return (
    <div className="group rounded-3xl border border-border bg-card overflow-hidden hover:-translate-y-1 hover:border-plum-dark/30 transition-all">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-plum to-plum-dark overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-cream/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark">{c.specialty}</span>
          {c.tag && <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-plum-dark">{c.tag}</span>}
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-cream/95 px-2.5 py-1 text-[11px] font-bold text-plum-dark inline-flex items-center gap-1">
          <Star className="h-3 w-3 fill-lime text-lime" /> {c.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-plum-dark line-clamp-2 leading-snug">{c.title}</h3>
        <div className="mt-3 flex items-center gap-4 text-xs text-foreground/65">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {c.enrolled.toLocaleString()}</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase">{c.mode}</span>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-xs text-foreground/50 line-through">₹{c.original.toLocaleString()}</div>
            <div className="font-display text-xl font-bold text-plum-dark">₹{c.fee.toLocaleString()}</div>
          </div>
          <button className="rounded-full bg-plum-dark px-4 py-2 text-xs font-semibold text-cream hover:bg-plum transition">Enroll →</button>
        </div>
      </div>
    </div>
  );
}
