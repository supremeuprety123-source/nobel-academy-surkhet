import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Calendar, ChevronRight, Trophy, ArrowRight, X, Clock } from "lucide-react";
import { Notice, NewsEvent } from "../types";

export default function NoticeBoard() {
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>("1");

  // --- STATE FOR EXPANDED NEWS REPORT MODAL ---
  const [activeEvent, setActiveEvent] = useState<NewsEvent | null>(null);

  // Lock background window scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeEvent]);

  const notices: Notice[] = [
    {
      id: "1",
      title: "Admissions Open for New Session 2026 / 2027",
      date: "May 24, 2026",
      tag: "Admission",
      content: "Online and physical applications are officially open for secondary and higher secondary levels (+2 Science, Management & Humanities) at NOBEL Academy. Scholarship examinations will take place on June 15, 2026.",
    },
    {
      id: "2",
      title: "Science and Innovation Symposium Postponement",
      date: "May 18, 2026",
      tag: "Academic",
      content: "Kindly note that the Annual Science and Digital Innovation Symposium has been rescheduled to June 8, 2026, due to regional academic calendar aligning. Registered model contributors should submit final designs by June 1.",
    },
    {
      id: "3",
      title: "First-Term Assessment Routine & Guidelines",
      date: "May 12, 2026",
      tag: "Urgent",
      content: "The detailed routine and guidelines for the upcoming First-Term Examination have been uploaded to the student portal. Admit cards will be distributed from the administrative desks starting next Monday.",
    },
    {
      id: "4",
      title: "Nobel Scholarship Quota Merit List Out",
      date: "May 05, 2026",
      tag: "Notice",
      content: "The merit list for the Nobel Talent Scholarship scheme (Karnali Province excellence seats) is published. Successful applicants listed in the merit tier must claim their seats by submitting documents within 7 days.",
    },
  ];

  const newsEvents: NewsEvent[] = [
    {
      id: "ev1",
      title: "Karnali Province Annual Sports Shield Triumph",
      date: "May 20, 2026",
      category: "Athletics",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQMHfHXtBBMPdlnNyjBUX3IgbKzYthLALzfbqK1nxC3dYyc7KuoNkflbNWVVtzsP_ks377B5jRRyIrKmBrwK5hclY9C9WcHbFRJOLw4xndFk1l09yhCmKQo55L53Ar-w9rZwQupUt4WcIhrmCJ5spTKyLrsAIqYn5J5zTqkECJn9QgyPoIkdpoMw8Ks-ZYBb5dSJrBgNvydcPc3PsAv5QryKTG2sXj8SDL01d-Qe15DleVaVa7Wd7u3sr74Chvnk3XYLQdyI-798",
      summary: "Our sports federation dominated the regional track, field, and football events, securing the coveted golden shield and 12 individual medals.",
      readTime: "4 min read",
    },
    {
      id: "ev2",
      title: "Nobel Multi-Media Arts & Debate Gala Complete",
      date: "May 10, 2026",
      category: "Culture",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA1Rm6UQ-6yx_sAlh3A3qqJtIjYCYVhpdaINaOC82Pdf7QfRoyG4iqElY33sDx1i5OpjlXYxS4MHAHm7cwVdZdBsaQBqV4NVvNpDTvYFRVQcPPsjqDLifdcZeHnRyE6vblCjcWUe-_VDj78JkGwxyU40WHE63w-zWkA68lbpFVfaSis9PRytdVVsK7aPKA5RunNVfmOCILCzgge92I3o-tQnefBKg0J26894rI-63myOBIVfp0ZcY-egTFL1GQGzqtDCWkwfIkMwc",
      summary: "Over 500 students showcased their research presentations, theatrical masterpieces, and digital art creations before regional dignitaries.",
      readTime: "3 min read",
    },
  ];

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case "Urgent":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "Admission":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Academic":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-white/5 text-slate-400 border-white/10";
    }
  };

  return (
    <section
      id="notice-board"
      className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-12"
    >
      {/* Background Radial Glow Blur effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Notices Accordion */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-none bg-amber-500/5 text-amber-500 border border-amber-500/10">
                <Bell className="w-5 h-5" />
              </span>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">
                Active Bulletin
              </h3>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-10 leading-tight">
              Notice Board
            </h2>

            <div className="space-y-4">
              {notices.map((notice) => {
                const isSelected = selectedNoticeId === notice.id;
                return (
                  <motion.div
                    key={notice.id}
                    layout="position"
                    onClick={() => setSelectedNoticeId(isSelected ? null : notice.id)}
                    className={`p-6 rounded-none border transition-all duration-300 cursor-pointer ${isSelected
                        ? "bg-slate-950 border-amber-500/30 shadow-xl"
                        : "bg-slate-950/20 border-white/5 hover:border-amber-500/15"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-none text-[10px] tracking-wider uppercase font-semibold border ${getTagStyle(notice.tag)}`}>
                          {notice.tag}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {notice.date}
                        </span>
                      </div>

                      <span className={`w-6 h-6 rounded-none bg-white/5 flex items-center justify-center text-amber-500 border border-white/5 transition-transform duration-300 ${isSelected ? "rotate-90" : ""}`}>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <h3 className={`mt-3 text-sm sm:text-base font-semibold tracking-wide ${isSelected ? "text-amber-500" : "text-white"}`}>
                      {notice.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light border-t border-white/5 pt-4">
                            {notice.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: News & Events Cards */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-none bg-amber-500/5 text-amber-500 border border-amber-500/10">
                <Trophy className="w-5 h-5" />
              </span>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">
                Campus Highlights
              </h3>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-10 leading-tight">
              News & Events
            </h2>

            <div className="space-y-8">
              {newsEvents.map((evt, idx) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="group rounded-none overflow-hidden border border-white/5 bg-slate-950/40 hover:border-amber-500/20 transition-all duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.2 }}
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${evt.imageUrl}')` }}
                    />
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-none bg-slate-950/90 backdrop-blur-sm border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-500">
                      {evt.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {evt.date} • {evt.readTime}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white mt-1.5 mb-3 group-hover:text-amber-500 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6">
                      {evt.summary}
                    </p>

                    {/* FIXED: Action Trigger safely opens the overlay report portal */}
                    <button
                      onClick={() => setActiveEvent(evt)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-white uppercase tracking-widest border-b border-amber-500/30 hover:border-white pb-0.5 transition-all text-left"
                    >
                      <span>Read Full Report</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- OVERLAY MODAL FOR EXPANDED EVENTS ARCHIVE --- */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Blurry dark backdrop glass panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Centralized Sheet Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ type: "spring", duration: 0.45 }}
              className="relative bg-slate-950 border border-white/10 w-full max-w-2xl p-6 sm:p-10 rounded-none shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Icon Toggle */}
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Meta Label Categories */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mb-4">
                <span className="text-amber-500 uppercase tracking-wider font-semibold">{activeEvent.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeEvent.date}
                </span>
              </div>

              {/* Display Header Graphic within Modal */}
              <div className="w-full aspect-video border border-white/5 overflow-hidden mb-6">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${activeEvent.imageUrl}')` }}
                />
              </div>

              {/* Main Headline Title */}
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-4 leading-tight">
                {activeEvent.title}
              </h3>

              {/* Detailed Context Section */}
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4">
                {activeEvent.summary} Nobel Academy's dedication to constructing premier educational ecosystems ensures students achieve outstanding results across all regional circuits. Additional reports regarding student group profiles, campus milestones, and registration schedules will be processed through our primary channels.
              </p>

              {/* Exit Interactive Layer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setActiveEvent(null)}
                  className="px-5 py-2 bg-slate-900 border border-white/10 text-xs font-semibold tracking-wider uppercase text-white hover:border-amber-500/40 hover:text-amber-400 transition-all"
                >
                  Close Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}