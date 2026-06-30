import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Sparkles, Activity, HeartPulse, Pill, Microscope } from "lucide-react";

const stats = [
  { v: "5,000+", l: "Sidhha Aspirants Mentored " },
  { v: "1,00,000", l: "MCQs Practiced" },
  { v: "500+", l: "Government Selection/Rank Holders" },
  { v: "10+", l: "AIAPGET.MRB.Crash Courses.Test Series" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 lg:pt-10 pb-12 lg:pb-16 bg-navy">
      {/* Background art */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-gold/15 blur-3xl" />
      <div className="absolute -z-10 -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-sky/20 blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-5 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-bold text-gold"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              India's #1 Siddha & AYUSH Academy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display font-extrabold text-white text-balance text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.02] tracking-[-0.03em]"
            >
          Prepare. Practice.Crack{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-gold"> AIAPGET & MRB.</span>
                <span className="absolute inset-x-0 bottom-1 h-3 lg:h-4 bg-gold/30 -z-0 rounded-sm" />
              </span>{" "}
  
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-xl text-base lg:text-lg text-white/80 leading-relaxed"
            >
              Master high-yield concepts, smart revision strategies, daily MCQs, grand tests, and expert guidance to secure top ranks in AIAPGET & MRB Siddha examinations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-navy hover:bg-gold/90 transition"
              >
                Start Learning Today
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-navy">
                  <Play className="h-3 w-3 fill-current" />
                </span>
                Explore Courses
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl"
            >
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl lg:text-3xl font-bold text-gold">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs lg:text-sm text-white/70">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative hidden md:block"
          >
            <HeroArt />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="relative aspect-[5/6] w-full max-w-md mx-auto">
      <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #12294D 60%, #1A3560 100%)', boxShadow: '0 25px 50px -12px rgba(11,31,58,0.5)' }}>
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(244,180,0,0.18)' }} />
        <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(45,156,219,0.15)' }} />

        {/* ECG line in Sky color */}
        <svg viewBox="0 0 400 100" className="absolute top-1/2 -translate-y-1/2 inset-x-0 w-full" style={{ color: '#2D9CDB', opacity: 0.6 }}>
          <motion.path
            d="M0 50 L80 50 L100 20 L120 80 L140 35 L160 50 L260 50 L280 25 L300 75 L320 40 L340 50 L400 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          />
        </svg>

        {/* Floating chips with Navy & Sky accents */}
        <FloatChip icon={HeartPulse} label="Live Vitals" pos="top-8 left-6" delay={0} />
        <FloatChip icon={Activity} label="Pulse 76" pos="top-24 right-4" delay={0.4} />
        <FloatChip icon={Microscope} label="Lab Module" pos="bottom-28 left-4" delay={0.8} />
        <FloatChip icon={Pill} label="Pharma Prep" pos="bottom-8 right-6" delay={1.2} />

        {/* Center card themed in white/gold/navy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ backgroundColor: '#0B1F3A' }}>
              <HeartPulse className="h-5 w-5" style={{ color: '#F4B400' }} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-500">Now Live</div>
              <div className="text-sm font-bold text-slate-800">Siddha &amp; AYUSH Examinations</div>
            </div>
            <div className="text-[10px] font-bold uppercase rounded-full px-2.5 py-1 text-[#0B1F3A]" style={{ backgroundColor: '#F4B400' }}>
              LIVE
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #F4B400, #2D9CDB)' }}
              initial={{ width: "0%" }}
              animate={{ width: "62%" }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FloatChip({
  icon: Icon,
  label,
  pos,
  delay,
}: {
  icon: typeof HeartPulse;
  label: string;
  pos: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        y: { delay, duration: 3.5, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute ${pos} flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-lg`}
    >
      <Icon className="h-3.5 w-3.5" style={{ color: '#2D9CDB' }} />
      <span style={{ color: '#0B1F3A' }}>{label}</span>
    </motion.div>
  );
}

