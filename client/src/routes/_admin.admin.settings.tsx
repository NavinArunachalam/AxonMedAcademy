import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { DarkCard } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/_admin/admin/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6 text-cream">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-cream/60 text-sm mt-1">Academy configuration and integrations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-1">
          {["Organization", "Branding", "Domains", "Payments", "Email", "Integrations", "Roles & Access", "Security"].map((s, i) => (
            <button key={s} className={`w-full text-left rounded-xl px-4 py-2.5 text-sm font-medium ${i === 0 ? "bg-lime text-plum-dark" : "text-cream/70 hover:bg-cream/5"}`}>{s}</button>
          ))}
        </aside>

        <DarkCard>
          <h3 className="font-display font-bold text-lg">Organization</h3>
          <p className="text-xs text-cream/60 mt-1">Public info about your academy</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {[
              { l: "Academy name", v: "Axon Academy" },
              { l: "Display URL", v: "Axon.academy" },
              { l: "Support email", v: "hello@Axon.academy" },
              { l: "Phone", v: "+91 98765 43210" },
              { l: "GST", v: "29AABCM1234C1ZK" },
              { l: "Time zone", v: "Asia/Kolkata" },
            ].map((f) => (
              <Field key={f.l} label={f.l} value={f.v} />
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-cream/60">Address</label>
              <textarea
                defaultValue={"Plot 21, Medical Campus,\nBengaluru 560001"}
                className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-cream/60">About</label>
              <textarea
                defaultValue="India's most trusted paramedical training academy."
                className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime min-h-[90px]"
              />
            </div>
          </div>

          <div className="mt-7 flex justify-end gap-3 border-t border-cream/10 pt-5">
            <button className="rounded-full bg-cream/10 px-5 py-2.5 text-sm font-semibold">Cancel</button>
            <button className="inline-flex items-center gap-2 rounded-full bg-lime text-plum-dark px-5 py-2.5 text-sm font-bold"><Save className="h-4 w-4" /> Save changes</button>
          </div>
        </DarkCard>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-cream/60">{label}</label>
      <input
        defaultValue={value}
        className="mt-1.5 w-full bg-cream/5 border border-cream/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-lime"
      />
    </div>
  );
}
