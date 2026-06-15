import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Shield, Award } from "lucide-react";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-12"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[30%] right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-gold-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Visual Composition */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group rounded-none overflow-hidden border border-white/5 shadow-2xl">
              {/* Image Frame */}
              <div className="overflow-hidden aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-none relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    /* Pointing to your image saved in the public directory */
                    backgroundImage: `url('/schooldrone1.png')`,
                  }}
                />

                {/* Frosted Detail Card */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-slate-950/85 backdrop-blur-md rounded-none border border-gold-500/20 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-serif text-white font-medium">Visionary Pedagogy</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Surkhet's premier gold-standard academy</p>
                  </div>
                  <div className="bg-gold-500/10 text-gold-500 px-3 py-1.5 rounded-none text-[10px] tracking-widest font-mono font-medium uppercase border border-gold-500/20">
                    ESTD. 2067
                  </div>
                </div>
              </div>

              {/* Decorative borders */}
              <div className="absolute -top-3 -right-3 w-12 h-12 border-t border-r border-gold-500/30 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b border-l border-gold-500/30 pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-left">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase mb-4"
            >
              Surkhet's Academic Heritage
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight mb-8"
            >
              Cultivating Brilliance, <br />
              <span className="italic text-gold-500 font-light">Inspiring Excellence.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-12"
            >
              <p>
                At NOBEL Academy, we transcend traditional pedagogy. Education here is not merely the acquisition of textbook facts, but the rigorous preparation of the mind to think critically, innovate deeply, and communicate creatively.
              </p>
              <p>
                Our state-of-the-art laboratory facilities, robust sporting arenas, and outstanding academic mentors build an interactive, high-fidelity ecosystem. Here, ambitious minds are diligently guided to become the visionary leaders of modern Nepal, firmly rooted in native values while achieving international excellence.
              </p>
            </motion.div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 border-t border-b border-white/5 py-8"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-none bg-gold-500/5 text-gold-500 border border-gold-500/10">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">Pioneering</h4>
                  <p className="text-[10px] text-slate-500">Guiding light since '98</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-none bg-gold-500/5 text-gold-500 border border-gold-500/10">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">Inclusivity</h4>
                  <p className="text-[10px] text-slate-500">Holistic support & care</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-none bg-gold-500/5 text-gold-500 border border-gold-500/10">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">Prestige</h4>
                  <p className="text-[10px] text-slate-500">First rate mentors</p>
                </div>
              </div>
            </motion.div>

            {/* Link Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#programs"
                className="inline-flex items-center gap-3 group text-xs text-gold-300 font-semibold uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
              >
                <span>Explore Our Heritage</span>
                <span className="w-8 h-[1px] bg-gold-300 group-hover:w-12 transition-all duration-300" />
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}