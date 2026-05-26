import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Calendar, ChevronRight, Trophy, ArrowRight, X, Clock, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function NoticeBoard() {
  const [notices, setNotices] = useState<any[]>([]);
  const [newsEvents, setNewsEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<any | null>(null);

  async function fetchData() {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      // Fetching records directly without the complex network string filter
      const [noticesRes, newsRes] = await Promise.all([
        supabase.from('notices')
          .select('*')
          .order('is_pinned', { ascending: false })
          .order('date', { ascending: false }),
        supabase.from('news_events')
          .select('*')
          .order('date', { ascending: false })
      ]);

      // Handle and parse notices data safely in memory
      if (noticesRes.error) {
        console.error("Supabase Notice Fetch Error:", noticesRes.error);
      } else if (noticesRes.data) {
        console.log("Raw Notices from Database:", noticesRes.data); // Look here in your browser console!

        const activeNotices = noticesRes.data.filter(notice => {
          if (!notice.expiry_date) return true;
          return notice.expiry_date >= today;
        });

        setNotices(activeNotices);

        // Auto-select the first notice if available
        if (activeNotices.length > 0) {
          setSelectedNoticeId(activeNotices[0].id);
        }
      }

      if (newsRes.error) {
        console.error("Supabase News Fetch Error:", newsRes.error);
      } else if (newsRes.data) {
        setNewsEvents(newsRes.data);
      }

    } catch (err) {
      console.error("Data pipeline processing error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeEvent]);

  const getTagStyle = (tag: string) => {
    switch (tag?.toLowerCase()) {
      case "urgent": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "admission": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "academic": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default: return "bg-white/5 text-slate-400 border-white/10";
    }
  };

  const estimateReadTime = (text: string = "") => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    return `${minutes} min read`;
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-amber-500" /></div>;

  return (
    <section id="notice-board" className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-12">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Column: Notices */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-none bg-amber-500/5 text-amber-500 border border-amber-500/10"><Bell className="w-5 h-5" /></span>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">Active Bulletin</h3>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-10 leading-tight">Notice Board</h2>
            <div className="space-y-4">
              {notices.map((notice) => {
                const isSelected = selectedNoticeId === notice.id;
                return (
                  <motion.div
                    key={notice.id}
                    layout="position"
                    onClick={() => setSelectedNoticeId(isSelected ? null : notice.id)}
                    className={`p-6 rounded-none border transition-all duration-300 cursor-pointer ${isSelected ? "bg-slate-950 border-amber-500/30 shadow-xl" : "bg-slate-950/20 border-white/5 hover:border-amber-500/15"}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-none text-[10px] tracking-wider uppercase font-semibold border ${getTagStyle(notice.type || notice.category)}`}>
                          {notice.type || notice.category || "General"}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> {notice.date || "Recent"}
                        </span>
                      </div>
                      <span className={`w-6 h-6 rounded-none bg-white/5 flex items-center justify-center text-amber-500 border border-white/5 transition-transform duration-300 ${isSelected ? "rotate-90" : ""}`}>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Fixed Heading Mappings: Safely supports topic, title, or heading fields */}
                    <h3 className={`mt-3 text-sm sm:text-base font-semibold tracking-wide ${isSelected ? "text-amber-500" : "text-white"}`}>
                      {notice.topic || notice.title || notice.heading || "Untitled Notice"}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light border-t border-white/5 pt-4 whitespace-pre-line">
                            {notice.description || notice.summary || "No details provided."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              {notices.length === 0 && (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-none bg-slate-950/20">
                  <p className="text-slate-500 text-sm italic font-light">No active notices logged on the bulletin.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: News & Events */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 rounded-none bg-amber-500/5 text-amber-500 border border-amber-500/10"><Trophy className="w-5 h-5" /></span>
              <h3 className="text-xs font-semibold tracking-[0.25em] text-amber-500 uppercase">Campus Highlights</h3>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium mb-10 leading-tight">News & Events</h2>
            <div className="space-y-8">
              {newsEvents.map((evt, idx) => (
                <motion.div key={evt.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="group rounded-none overflow-hidden border border-white/5 bg-slate-950/40 hover:border-amber-500/20 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden bg-slate-950/60 flex items-center justify-center">
                    {evt.photo_url ? (
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 1.2 }} className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${evt.photo_url}')` }} />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-600">
                        <ImageIcon size={28} className="text-slate-700" />
                        <span className="text-[10px] font-mono">No Event Poster Attached</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 px-2.5 py-1 rounded-none bg-slate-950/90 backdrop-blur-sm border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-500">
                      {evt.type || 'Event'}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {evt.date || 'Recent'} • {estimateReadTime(evt.description)}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white mt-1.5 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {evt.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6 line-clamp-3">
                      {evt.description}
                    </p>
                    <button onClick={() => setActiveEvent(evt)} className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-white uppercase tracking-widest border-b border-amber-500/30 hover:border-white pb-0.5 transition-all text-left">
                      <span>Read Full Report</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
              {newsEvents.length === 0 && (
                <p className="text-slate-500 text-sm italic font-light">No recent campus highlights found.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* --- OVERLAY MODAL --- */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveEvent(null)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 15 }} transition={{ type: "spring", duration: 0.45 }} className="relative bg-slate-950 border border-white/10 w-full max-w-2xl p-6 sm:p-10 rounded-none shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActiveEvent(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white border border-transparent hover:border-white/10 transition-all"><X className="w-4 h-4" /></button>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500 mb-4">
                <span className="text-amber-500 uppercase tracking-wider font-semibold">{activeEvent.type}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeEvent.date || 'Recent'}</span>
              </div>
              {activeEvent.photo_url && (
                <div className="w-full aspect-video border border-white/5 overflow-hidden mb-6 bg-slate-900">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${activeEvent.photo_url}')` }} />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-serif text-white mb-4 leading-tight">{activeEvent.heading}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4 whitespace-pre-line">{activeEvent.description}</p>
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-end">
                <button onClick={() => setActiveEvent(null)} className="px-5 py-2 bg-slate-900 border border-white/10 text-xs font-semibold tracking-wider uppercase text-white hover:border-amber-500/40 hover:text-amber-400 transition-all">Close Report</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}