import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, ArrowLeft, ArrowRight, Award, GraduationCap } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [voices, setVoices] = useState<any[]>([]);

  useEffect(() => {
    async function fetchVoices() {
      const { data } = await supabase
        .from('student_voices')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setVoices(data);
    }
    fetchVoices();
  }, []);

  const current = voices[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % voices.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + voices.length) % voices.length);

  if (!current) return null;

  return (
    <section id="testimonials" className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/5 border border-gold-500/20 text-[10px] tracking-widest uppercase text-gold-500 font-semibold rounded-none mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Alumni Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-medium leading-tight">
            Student Voices & <span className="italic text-gold-500 font-light">Triumphs</span>
          </h2>
        </div>

        <div className="relative bg-slate-950/40 border border-white/5 backdrop-blur-md rounded-none p-8 sm:p-12 md:p-16 shadow-2xl">
          <div className="absolute top-8 right-12 text-gold-500/5 pointer-events-none hidden sm:block"><Quote className="w-36 h-36" /></div>

          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start">
                <img src={current.student_photo_url} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gold-500" />
                <h4 className="text-lg sm:text-xl font-serif text-white mt-6">{current.student_name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{current.education_status}</p>
                {current.achievement && (
                  <div className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-gold-500/5 border border-gold-500/20 rounded-none text-[10px] text-gold-500 font-semibold uppercase tracking-wider">
                    <Award className="w-4 h-4" /><span>{current.achievement}</span>
                  </div>
                )}
              </div>
              <div className="md:col-span-8">
                <Quote className="w-8 h-8 text-gold-500/40 mb-4" />
                <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed italic">"{current.review}"</p>
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />)}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[-24px] right-8 flex gap-3">
            <button onClick={handlePrev} className="p-3.5 bg-slate-950 border border-gold-500/10 text-gold-500 hover:text-white transition-all"><ArrowLeft className="w-4 h-4" /></button>
            <button onClick={handleNext} className="p-3.5 bg-slate-950 border border-gold-500/10 text-gold-500 hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}