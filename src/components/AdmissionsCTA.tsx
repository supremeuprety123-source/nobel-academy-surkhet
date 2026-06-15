import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, GraduationCap, BookOpen } from "lucide-react";

interface AdmissionsCTAProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export default function AdmissionsCTA({ onApplyClick, onProspectusClick }: AdmissionsCTAProps) {
  return (
    <section
      id="admissions"
      className="relative py-28 md:py-36 overflow-hidden px-4 sm:px-6 md:px-12 bg-slate-950"
    >
      {/* Background Frame */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950/85 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900 z-10" />

        {/* Soft Golden Orbs */}
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-[110px]" />

        <div
          className="w-full h-full bg-cover bg-center opacity-30 scale-102 pointer-events-none"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmXj1wtgyLpDFfU7AKa75cHFvvjD0STaeR6soORnUDXF88aNfIL_M-Aqc00F5PzRBk0I-hoqYr03W87xJ1p4c_JDlhdkHdQI6_At64gJmng1cIT-Cd4EH7UPJhqAawa6JlhJuhBRK7njyL3PmyyjFBrW9dfRmAkcL6oUb4-6htD4UtzLJPXhIa2wfUBDU3nCRtO0k6mOF2oSmSYnWBOzHyjTEtgyGbJ0I4YGKDezU0TbVNuLhP9BknYCCsBUUYZcWdI_wj3wmoE9Y')`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-none bg-gold-500/5 border border-gold-500/20 text-gold-500 text-xs tracking-widest font-semibold uppercase mb-8"
        >
          <GraduationCap className="w-4 h-4" />
          <span>JOIN THE LEGACY</span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-[64px] font-serif font-medium text-white leading-[1.1] tracking-tight mb-8"
        >
          Secure Your Place Among <br />
          <span className="gold-gradient-text italic font-light">Future Leaders</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-16"
        >
          Begin your journey towards academic refinement and leadership excellence. Our simplified intake procedure coordinates with national standards, offering extensive financial support for merit scholars.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-stretch sm:items-center"
        >
          <button
            onClick={onApplyClick}
            className="px-10 py-5 bg-gold-500 text-slate-950 font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer text-center"
          >
            <span>Apply Online Now</span>
            <ArrowUpRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={onProspectusClick}
            className="px-10 py-5 border border-white/20 hover:border-gold-500 hover:bg-white/5 text-white rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2.5 cursor-pointer text-center"
          >
            <BookOpen className="w-4 h-4 text-gold-500" />
            <span>Request Prospectus</span>
          </button>
        </motion.div>

        {/* Sub-note info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[10px] sm:text-xs font-mono text-slate-500 tracking-widest uppercase mt-12"
        >
          ..
        </motion.p>

      </div>
    </section>
  );
}
