import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:flex w-1/2 relative bg-plum-dark text-cream p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-lime/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-plum/50 blur-3xl" />

        <Link to="/" className="relative inline-flex items-center gap-2 w-fit">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-plum-dark">
            <Stethoscope className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold">Medicore.Academy</span>
        </Link>

        <div className="relative">
          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05] tracking-[-0.02em]">
            Welcome back.<br />
            Your <span className="bg-lime text-plum-dark px-2 rounded">cohort</span> is waiting.
          </h1>
          <p className="mt-5 text-cream/70 max-w-md">
            Pick up where you left off — live classes, recorded modules, exam prep, and your career roadmap.
          </p>
        </div>

        <div className="relative text-xs text-cream/50">© {new Date().getFullYear()} Medicore Academy</div>
      </div>

      {/* Right form */}
      <div className="flex-1 grid place-items-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-plum-dark text-lime">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="font-display font-bold text-plum-dark">Medicore.Academy</span>
          </Link>

          <h2 className="font-display text-3xl font-bold text-plum-dark">Sign in</h2>
          <p className="mt-2 text-sm text-foreground/65">Enter your credentials to access your portal.</p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-plum-dark mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full rounded-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-plum-dark">Password</label>
                <a href="#" className="text-xs text-plum font-semibold">Forgot?</a>
              </div>
              <input type="password" placeholder="••••••••" className="w-full rounded-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-plum" />
            </div>

            <button type="button" className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-plum-dark px-6 py-3.5 text-sm font-semibold text-cream hover:bg-plum transition">
              Sign in <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-foreground/50">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <button className="w-full rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-plum-dark hover:bg-secondary transition">
            Continue with Google
          </button>

          <div className="mt-6 rounded-2xl border border-dashed border-plum/30 bg-secondary/60 p-4">
            <div className="text-[10px] uppercase tracking-widest text-plum font-bold">Demo access</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/student/dashboard" className="rounded-full bg-plum-dark text-cream text-xs font-semibold py-2.5 text-center hover:bg-plum">
                Student portal →
              </Link>
              <Link to="/admin/dashboard" className="rounded-full bg-lime text-plum-dark text-xs font-bold py-2.5 text-center hover:brightness-95">
                Admin console →
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-foreground/65">
            New to Medicore? <Link to="/courses" className="font-semibold text-plum-dark">Browse courses →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
