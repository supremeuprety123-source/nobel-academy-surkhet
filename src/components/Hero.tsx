import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Minimize2, BarChart2, Info } from "lucide-react";

// Simple custom counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface HeroProps {
  onLearnMoreClick: () => void;
  onTourClick: () => void;
}

export default function Hero({ onLearnMoreClick, onTourClick }: HeroProps) {
  const [surkhetTime, setSurkhetTime] = useState("");

  // Interactive Panel States
  const [leftExpanded, setLeftExpanded] = useState(true);
  const [rightExpanded, setRightExpanded] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const nepalOffset = 5.75;
      const nepalLocal = new Date(utc + 3600000 * nepalOffset);
      const timeStr = nepalLocal.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setSurkhetTime(timeStr);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end justify-between overflow-hidden bg-slate-950 px-4 sm:px-6 md:px-8 pb-8 lg:pb-12 pt-24"
    >
      {/* Background Video Media Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* MOBILE FALLBACK IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center block lg:hidden"
          style={{
            backgroundImage: `url('/dronephoto.png')`
          }}
        />

        {/* Ambient Dark Blending Frames */}
        <div className="absolute inset-0 bg-slate-950/80 lg:bg-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10 hidden lg:block" />

        {/* Desktop Video Layer */}
        <div className="w-full h-full hidden lg:block">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/hero-drone.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Main Core Viewport Layout Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-6">

        {/* ================= LEFT SIDE PANEL: MAIN HIGHLIGHTS INFO ================= */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          onClick={() => !leftExpanded && setLeftExpanded(true)}
          className={`bg-slate-950/85 lg:bg-slate-950/45 lg:backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col transition-all duration-300
            ${leftExpanded
              ? "w-full lg:w-[58%] p-6 sm:p-10 lg:p-12 h-auto cursor-default"
              : "w-fit p-4 lg:p-5 h-auto bg-slate-950/95 cursor-pointer hover:bg-slate-900/90 hover:border-amber-500/40 hover:-translate-y-1 active:scale-98 select-none"
            }
          `}
        >
          {/* Collapse Action Button (Only visible when open) */}
          {leftExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents immediate re-expansion trigger from bubbling to parent div
                setLeftExpanded(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-amber-400 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer z-30"
              title="Collapse Panel"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {leftExpanded ? (
              <motion.div
                key="left-expanded-content"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col"
              >
                {/* Tagline */}
                <div className="mb-4 lg:mb-6 flex items-center gap-3">
                  <div className="h-[2px] w-12 bg-amber-500" />
                  <span className="text-amber-400 uppercase tracking-[0.4em] text-[10px] lg:text-xs font-bold">
                    Excellence in Education
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[70px] leading-[1.05] lg:leading-[0.95] tracking-tight text-white font-light mb-6">
                  <span className="block drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">Nurturing</span>
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent italic font-normal block drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                    Global Leaders.
                  </span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-100 font-light leading-relaxed max-w-md mb-8 drop-shadow-[0_2px_6px_rgba(0,0,0,1)]">
                  Experience world-class learning in the heart of Karnali. Nobel Academy Surkhet combines traditional values with modern cinematic pedagogy.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={onLearnMoreClick}
                    className="px-8 py-4 bg-amber-500 text-slate-950 font-bold uppercase tracking-widest text-xs hover:bg-amber-400 shadow-xl transition-all cursor-pointer text-center active:scale-95"
                  >
                    Discover Our Programs
                  </button>
                  <button
                    onClick={onTourClick}
                    className="px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-slate-950 transition-all duration-300 cursor-pointer text-center backdrop-blur-md active:scale-95"
                  >
                    Virtual Tour
                  </button>
                </div>

                {/* Nepal Info Banner */}
                <div className="mt-8 lg:mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-200 tracking-wider font-mono border-t border-white/10 pt-4 w-fit">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    <span>BIRENDRANAGAR, SURKHET, NEPAL</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
                  <div>
                    <span>SURKHET TIME: </span>
                    <span className="text-amber-400 font-medium">{surkhetTime || "00:00:00 AM"}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Minimized Bottom-Left Tab */
              <motion.div
                key="left-collapsed-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-4"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                  <Info className="w-5 h-5" />
                </div>
                <div className="text-left font-mono pr-2">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Show Info</p>
                  <p className="text-[9px] text-slate-400 uppercase">Nobel Academy Panel</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>


        {/* ================= RIGHT SIDE PANEL: INTERACTIVE METRICS ================= */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          onClick={() => !rightExpanded && setRightExpanded(true)}
          className={`bg-slate-950/85 lg:bg-slate-950/45 lg:backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col transition-all duration-300
            ${rightExpanded
              ? "w-full lg:w-[36%] p-6 sm:p-8 flex flex-col gap-4 lg:gap-6 h-auto cursor-default"
              : "w-fit p-4 lg:p-5 h-auto bg-slate-950/95 cursor-pointer hover:bg-slate-900/90 hover:border-amber-500/40 hover:-translate-y-1 active:scale-98 select-none"
            }
          `}
        >
          {/* Collapse Action Button (Only visible when open) */}
          {rightExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents immediate re-expansion trigger from bubbling to parent div
                setRightExpanded(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-amber-400 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer z-30"
              title="Collapse Panel"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {rightExpanded ? (
              <motion.div
                key="right-expanded-content"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col gap-4 lg:gap-5"
              >
                {/* Metric Card 1 */}
                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/50 transition-all hover:border-amber-500/30 hover:bg-slate-900/40 hover:-translate-y-0.5 group">
                  <span className="text-amber-400 text-3xl font-serif block mb-1">
                    <AnimatedCounter target={1497} suffix="+" />
                  </span>
                  <span className="uppercase tracking-widest text-[9px] text-slate-300 font-bold">
                    Enrolled Minds
                  </span>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Nurturing thinkers, pioneers, and global champions.
                  </p>
                </div>

                {/* Metric Card 2 */}
                <div className="p-4 rounded-xl border border-white/5 bg-slate-950/50 transition-all hover:border-amber-500/30 hover:bg-slate-900/40 hover:-translate-y-0.5 group">
                  <span className="text-amber-400 text-3xl font-serif block mb-1">
                    <AnimatedCounter target={100} suffix="%" />
                  </span>
                  <span className="uppercase tracking-widest text-[9px] text-slate-300 font-bold">
                    Academic Success Score
                  </span>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Maintaining flawless performance in board standings.
                  </p>
                </div>

                {/* Spotlight Block */}
                <div className="p-4 border border-amber-500/20 bg-slate-950/80 rounded-xl shadow-lg relative overflow-hidden">
                  <h3 className="text-amber-400 uppercase tracking-[0.2em] text-xs font-bold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 relative flex">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    </span>
                    Latest Spotlight
                  </h3>
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-200 font-light leading-snug">
                      • Admissions Open for This Year.
                    </p>
                    <p className="text-[11px] text-slate-200 font-light leading-snug">
                      • Rewarded as Karnali Province One of the Best school .
                    </p>
                  </div>
                  <a
                    href="#notice-board"
                    className="inline-block mt-3 text-[10px] uppercase font-bold tracking-widest border-b border-amber-400 pb-0.5 text-amber-400 hover:text-white"
                  >
                    View Notice board
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Minimized Bottom-Right Tab */
              <motion.div
                key="right-collapsed-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-4"
              >
                <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shadow-md">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div className="text-left font-mono pr-2">
                  <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Show Stats</p>
                  <p className="text-[9px] text-slate-400 uppercase">Metrics & Spotlight</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Cinematic Mouse Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden lg:block">
        <div className="w-6 h-9 border-2 border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-amber-400 rounded-full"
          />
        </div>
      </div>

    </section>
  );
}