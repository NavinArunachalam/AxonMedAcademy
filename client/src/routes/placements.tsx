import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "../components/site/Layout";
import { Building2, TrendingUp, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/placements")({ component: Placements });

const NAVY = "#0B1F3A";
const GOLD = "#F4B400";
const SKY  = "#2D9CDB";
const EMERALD = "#16A34A";

function Placements() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const loadPlacements = async () => {
      try {
        const res = await api.get("/public/placements");
        if (res.success) {
          if (res.partners) {
            setHospitals(res.partners);
          }
          if (res.stories) {
            setStories(res.stories);
          }
        }
      } catch (err) {
        console.error("Error loading placements:", err);
      }
    };
    loadPlacements();
  }, []);

  return (
    <PublicLayout>
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Decorative gold blur */}
        <div className="absolute -z-10 top-0 right-0 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: 'rgba(244,180,0,0.18)' }} />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: SKY }}>— Placements</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02]"
            style={{ color: NAVY }}>
            Where our graduates<br />are <span className="px-3 rounded text-navy" style={{ backgroundColor: GOLD }}>working today.</span>
          </h1>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden text-white" style={{ backgroundColor: NAVY }}>
        <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { v: "95%",   l: "Placement rate" },
            { v: "₹3.8L", l: "Avg starting salary" },
            { v: "215+",  l: "Partner hospitals" },
            { v: "28",    l: "States covered" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-display text-4xl lg:text-5xl font-bold" style={{ color: GOLD }}>{s.v}</div>
              <div className="mt-2 text-sm text-white/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: SKY }}>— Recruiters</div>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight" style={{ color: NAVY }}>Hospitals that hire from us.</h2>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {hospitals.map(h => {
              const name = typeof h === 'string' ? h : h.name;
              return (
                <div key={name} className="rounded-2xl border border-border bg-card p-6 text-center hover:-translate-y-0.5 transition duration-300"
                  style={{ borderColor: 'rgba(45,156,219,0.15)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = SKY}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(45,156,219,0.15)'}>
                  <Building2 className="h-7 w-7 mx-auto" style={{ color: SKY }} />
                  <div className="mt-3 font-display text-sm font-semibold" style={{ color: NAVY }}>{name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#FBFAFC]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: SKY }}>— Stories</div>
          <h2 className="mt-3 font-display text-3xl lg:text-5xl font-bold tracking-tight" style={{ color: NAVY }}>Recently placed.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map(s => (
              <div key={s._id || s.name} className="rounded-3xl bg-card border border-border p-6 hover:-translate-y-1 transition-all"
                style={{ borderColor: 'rgba(45,156,219,0.15)' }}>
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl font-display font-bold text-white"
                    style={{ backgroundColor: NAVY }}>
                    {s.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-display font-semibold" style={{ color: NAVY }}>{s.name}</div>
                    <div className="text-xs text-foreground/60">{s.role}</div>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl p-4" style={{ backgroundColor: 'rgba(45,156,219,0.06)' }}>
                  <div className="text-xs text-foreground/60 inline-flex items-center gap-1"><Building2 className="h-3 w-3" /> Placed at</div>
                  <div className="font-display font-semibold mt-1" style={{ color: NAVY }}>{s.hospital}</div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1 text-foreground/60"><MapPin className="h-3.5 w-3.5" /> {s.city}</span>
                  <span className="inline-flex items-center gap-1 font-semibold" style={{ color: NAVY }}>
                    <TrendingUp className="h-3.5 w-3.5" style={{ color: EMERALD }} /> {s.salary}/yr
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
