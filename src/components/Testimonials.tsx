import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ArrowLeft, ArrowRight, Award, GraduationCap } from "lucide-react";
import { Testimonial } from "../types";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Aarav Shrestha",
      role: "Graduate, Class of 2024",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200",
      quote: "My years at NOBEL Academy were pivotal. The rigorous science mentoring, peer debates, and access to premium labs laid the concrete foundations for my transition. I am now pursuing my B.E. in Computer Science under a fully funded fellowship.",
      year: "2024 Achiever",
      achievement: "Province Board Topper (GPA 3.96)",
    },
    {
      id: "t2",
      name: "Priyanka Chaudhary",
      role: "Alumna, MBBS Scholar",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
      quote: "The holistic focus at Nobel is incomparable. Beyond pure textbook metrics, our professors taught us intellectual discipline, public presentation protocols, and moral clarity. I found my passion in the chemistry lab here.",
      year: "2022 Achiever",
      achievement: "National Medical Scholar placement",
    },
    {
      id: "t3",
      name: "Deepak Budha Magar",
      role: "Management Class Valedictorian",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
      quote: "Surkhet has many schools, but Nobel Academy maintains real world-class standards. From active leadership bootcamps to state-of-the-art interactive smart screens, every single asset was focused on challenging our potential.",
      year: "2025 Graduate",
      achievement: "Top score in CA Common Entrance",
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-12"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/5 border border-gold-500/20 text-[10px] tracking-widest uppercase text-gold-500 font-semibold rounded-none mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Alumni Chronicles</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-medium leading-tight">
            Student Voices & <span className="italic text-gold-500 font-light">Triumphs</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light mt-4">
            Hear from our exemplary scholars who transitioned from Surkhet to prominent scientific institutions, medical clinics, and leadership councils around the world.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="relative bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-none p-8 sm:p-12 md:p-16 shadow-2xl">
          
          {/* Quote Icon Watermark */}
          <div className="absolute top-8 right-12 text-gold-500/5 pointer-events-none hidden sm:block">
            <Quote className="w-36 h-36" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              {/* Profile Card */}
              <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="relative mb-6">
                  <div className="absolute inset-x-0 bottom-0 top-3 bg-gradient-to-tr from-gold-500/20 to-gold-600/20 rounded-full blur-[8px]" />
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gold-500 position-relative z-10"
                  />
                </div>
                
                <h4 className="text-lg sm:text-xl font-serif text-white font-medium">
                  {current.name}
                </h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                  {current.role}
                </p>

                {/* Achievement Badge */}
                <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-gold-500/5 border border-gold-500/20 rounded-none text-[10px] sm:text-xs text-gold-500 font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>{current.achievement}</span>
                </div>
              </div>

              {/* Quote Copy */}
              <div className="md:col-span-8 flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-gold-500/40 mb-4" />
                  <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed italic">
                    "{current.quote}"
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="text-xs font-mono text-gold-500/50 uppercase tracking-wider">
                    {current.year}
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-[-24px] right-8 flex gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 bg-slate-950 border border-gold-500/10 text-gold-500 hover:text-white hover:border-white rounded-none transition-all cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3.5 bg-slate-950 border border-gold-500/10 text-gold-500 hover:text-white hover:border-white rounded-none transition-all cursor-pointer shadow-lg"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
