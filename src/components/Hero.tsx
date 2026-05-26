import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

// Simple custom counter component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2500; // 2.5 seconds to count up

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease-out cubic curve
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
  // Track local time in Surkhet (UTC+5:45)
  const [surkhetTime, setSurkhetTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Nepal Offset (UTC + 5:45)
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

  // Title text
  const titleLine1 = "A Sanctuary of";
  const titleLine2 = "Higher Learning";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950 px-4 sm:px-6 md:px-12 pt-28 pb-12"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent z-10" />
        
        {/* Glow Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-gold-400/5 blur-[150px]" />

        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtJs2NrKAcwg1S-y5HCWpNQzRCUw7X0zpz9MZUWKzXbcMn2gFSImj7pUkke_PBDmhZQaMfEcmBD_M3BUIaIXItJ6XMdxo4ElcrHnihjFbo62esRVwbLuAga_TR2rp1Jp-us341E2cJ6lmZyW3V3ZpTPNoYc2c7Gxl9ViQuFcmHjasAh0hTPUdcYQrgE8kay64QEkZDL3zQSjsujRcg6tVqkC271tdDcp121oAwLP9q6brOj15lYIXKkMhKFi8UpwSkVsglV5sumyA')`,
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch border border-white/5 bg-slate-950/30 backdrop-blur-md rounded-lg overflow-hidden">
        
        {/* Left Side: Copy Panel */}
        <div className="w-full lg:w-[62%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-left">
          {/* Tagline */}
          <div className="mb-6 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-500 uppercase tracking-[0.4em] text-xs font-semibold">
              Excellence in Education
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-[80px] leading-[0.95] tracking-tight text-white font-light mb-8">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              Nurturing
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="gold-gradient-text italic font-normal block"
            >
              Global Leaders.
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-md mb-10"
          >
            Experience world-class learning in the heart of Karnali. Nobel Academy Surkhet combines traditional values with modern cinematic pedagogy.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
          >
            <button
              onClick={onLearnMoreClick}
              className="px-10 py-5 bg-gold-500 text-slate-950 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all cursor-pointer text-center"
            >
              Discover Our Programs
            </button>

            <button
              onClick={onTourClick}
              className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all cursor-pointer text-center"
            >
              Virtual Tour
            </button>
          </motion.div>

          {/* Nepal Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] text-slate-500 tracking-wider font-mono border-t border-white/5 pt-6 w-fit"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold-500" />
              <span>BIRENDRANAGAR, SURKHET, NEPAL</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
            <div>
              <span>SURKHET TIME: </span>
              <span className="text-gold-300 font-medium">{surkhetTime || "00:00:00 AM"}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Metrics Panel */}
        <div className="w-full lg:w-[38%] border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-950/40 p-8 sm:p-12 flex flex-col justify-center gap-8">
          
          {/* Metric Card 1 */}
          <div className="glass-card p-8 rounded-sm transition-all duration-300">
            <span className="text-gold-500 text-4xl font-serif block mb-1">
              <AnimatedCounter target={1497} suffix="+" />
            </span>
            <span className="uppercase tracking-widest text-[10px] text-slate-400 font-bold">
              Enrolled Minds
            </span>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Nurturing thinkers, pioneers, and global champions.
            </p>
          </div>

          {/* Metric Card 2 */}
          <div className="glass-card p-8 rounded-sm transition-all duration-300">
            <span className="text-gold-500 text-4xl font-serif block mb-1">
              <AnimatedCounter target={100} suffix="%" />
            </span>
            <span className="uppercase tracking-widest text-[10px] text-slate-400 font-bold">
              Academic Success Score
            </span>
            <p className="text-xs text-slate-500 mt-2 font-light">
              Maintaining flawless performance in NEB board and provincial standings.
            </p>
          </div>

          {/* Spotlight Block */}
          <div className="p-8 border border-gold-500/20 bg-gold-500/5 rounded-sm">
            <h3 className="text-gold-500 uppercase tracking-[0.2em] text-xs font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-ping"></span>
              Latest Spotlight
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-gold-500 text-lg leading-none">•</span>
                <p className="text-xs text-slate-300 font-light">
                  Admissions Open for Year 2026/2027. Scholarship quotas claim closing June 10.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gold-500 text-lg leading-none">•</span>
                <p className="text-xs text-slate-300 font-light">
                  Karnali Province Annual Sports Shield Triumph ceremony coming next week.
                </p>
              </div>
            </div>
            <a
              href="#notice-board"
              className="inline-block mt-6 text-[10px] uppercase font-bold tracking-widest border-b border-gold-500 pb-1 text-gold-500 hover:text-white hover:border-white transition-all cursor-pointer"
            >
              View Notice board
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
