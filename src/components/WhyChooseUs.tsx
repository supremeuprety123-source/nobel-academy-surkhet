import React from "react";
import { motion } from "motion/react";
import {
  FlaskConical,
  Users,
  BookOpen,
  MonitorPlay,
  Check,
  Phone,
  Bus,
  Home,
  GraduationCap,
  Droplet,
  Palette,
  ShieldAlert
} from "lucide-react";

export default function WhyChooseUs() {
  const advantageItems = [
    {
      title: "Advanced Stream Architecture (+2)",
      desc: "Comprehensive higher secondary (+2) academic tracks specialized in Management, Hotel Management, and Computer Science formats.",
      icon: GraduationCap,
    },
    {
      title: "Modern Educational Tech",
      desc: "State-of-the-art classrooms featuring interactive Digital AI and Smart Board facilities designed to enhance daily conceptual immersion.",
      icon: MonitorPlay,
    },
    {
      title: "Science & Computer Labs",
      desc: "Fully equipped physics, chemistry, and biology setups alongside a well-managed computer laboratory and dedicated e-library network.",
      icon: FlaskConical,
    },
    {
      title: "Disciplined English Medium",
      desc: "Classes run within a pristine, peaceful, and structured ecosystem built entirely upon an English-medium framework.",
      icon: ShieldAlert,
    },
    {
      title: "Creative Arts & Extracurriculars",
      desc: "Dedicated art rooms and expansive programs across competitive sports, structural dance, classical music networks, and holistic yoga.",
      icon: Palette,
    },
    {
      title: "Secure Transit & Accommodations",
      desc: "Reliable school bus fleets tracking multiple routes across different areas, alongside complete, fully managed campus hostel facilities.",
      icon: Bus,
    },
    {
      title: "Merit & Discipline Scholarships",
      desc: "Targeted financial aid programs and academic scholarships provided based on strict merit matrices, student discipline, and diverse core criteria.",
      icon: Users,
    },
    {
      title: "Pure Safe Water Ecosystem",
      desc: "Advanced industrial-grade electric water filter infrastructure guaranteeing pure, healthy, continuous drinking water across all blocks.",
      icon: Droplet,
    },
  ];

  return (
    <section
      id="programs"
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden px-4 sm:px-6 md:px-12"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-none bg-amber-500/5 border border-amber-500/20 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-amber-500 mb-6"
          >
            The Nobel Advantage
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif text-white leading-tight mb-6"
          >
            Our Institutional <span className="italic text-amber-500 font-light">Features</span>
          </motion.h2>

          {/* Quick Info Bar for Contact Numbers */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900 border border-white/5 hover:border-amber-500/20 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span className="text-xs sm:text-sm font-mono tracking-wider text-slate-300">
              For More Info: <span className="text-white font-bold">083-590828</span> or <span className="text-white font-bold">9858076072</span>
            </span>
          </motion.div>
        </div>

        {/* Dynamic Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantageItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-slate-900/40 border border-white/5 hover:border-amber-500/30 rounded-none p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-950 pointer-events-none opacity-5 group-hover:bg-amber-500/5 transition-all duration-300" />

                <div>
                  <div className="p-3.5 w-fit rounded-none bg-amber-500/5 text-amber-500 border border-amber-500/20 group-hover:scale-105 transition-transform duration-300 mb-5">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif text-white font-medium mb-3 group-hover:text-amber-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-[11px] sm:text-xs text-slate-500 tracking-wider flex flex-wrap justify-center items-center gap-x-6 gap-y-4 border-t border-white/5 pt-8"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-500" />
            <span>NEB Approved High School Structure</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-500" />
            <span>Advanced Smart Academic Tools</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-500" />
            <span>Holistic Student Growth & Support</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}