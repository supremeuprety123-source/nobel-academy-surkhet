import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, Images, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface GalleryItem {
  id: string;
  heading: string;
  type: string;
  photo_url: string;
  description: string; // Enabled inside types
}

export default function GalleryPreview() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  async function fetchGallery() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("life_at_nobel")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setItems(data as GalleryItem[]);
      }
    } catch (err) {
      console.error("Error loading gallery assets:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  const leadItem = items[0];
  const trailingItems = items.slice(1);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-slate-900 overflow-hidden px-4 sm:px-6 md:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/5 border border-amber-500/20 text-[10px] tracking-widest uppercase text-amber-500 font-semibold rounded-none mb-4">
              <Images className="w-3.5 h-3.5" />
              <span>Campus Radiance</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif text-white font-medium leading-tight">
              Life at <span className="italic text-amber-500 font-light">Nobel</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light mt-4 max-w-xl">
              A curated look into our world-class visual landscape, campus activities, academic highlights, and spirited competitive games.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 tracking-widest uppercase">
            <span className="h-[1px] w-12 bg-white/10 block"></span>
            <span>Click any image to enlarge</span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-60 items-center justify-center text-slate-400">
            <Loader2 className="animate-spin text-amber-500" size={32} />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <p className="text-sm text-slate-500">No media assets found in the gallery collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto min-h-[500px]">
            {/* Primary Main Showcase Block */}
            {leadItem && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                onClick={() => setActivePhoto(leadItem)}
                className="md:col-span-7 h-80 md:h-auto rounded-none overflow-hidden relative border border-amber-500/10 group cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-500" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-none bg-slate-950/80 backdrop-blur-md border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-500">
                  {leadItem.type}
                </div>

                <motion.div
                  className="w-full h-full min-h-[320px] bg-cover bg-center"
                  style={{ backgroundImage: `url('${leadItem.photo_url}')` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                  <div>
                    <h4 className="text-lg sm:text-2xl font-serif text-white font-medium">
                      {leadItem.heading}
                    </h4>
                    {leadItem.description && (
                      <p className="text-xs text-slate-400 font-light mt-2 max-w-sm hidden sm:line-clamp-1">
                        {leadItem.description}
                      </p>
                    )}
                  </div>
                  <div className="p-3 bg-amber-500 text-slate-950 rounded-none group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid Sub-Column Feed */}
            <div className="md:col-span-5 flex flex-col gap-6 max-h-[680px] overflow-y-auto pr-1 custom-scrollbar">
              {trailingItems.length === 0 ? (
                <div className="flex h-full items-center justify-center border border-white/5 p-4 text-center">
                  <p className="text-xs text-slate-600 italic">More event updates coming soon</p>
                </div>
              ) : (
                trailingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: Math.min(index * 0.1, 0.4) }}
                    onClick={() => setActivePhoto(item)}
                    className="h-60 md:h-[220px] flex-shrink-0 rounded-none overflow-hidden relative border border-amber-500/10 group cursor-pointer shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-500" />
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-none bg-slate-950/80 backdrop-blur-md border border-amber-500/20 text-[10px] uppercase font-semibold text-amber-500">
                      {item.type}
                    </div>

                    <motion.div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.photo_url}')` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                      <div>
                        <h4 className="text-base sm:text-lg font-serif text-white font-medium line-clamp-1">
                          {item.heading}
                        </h4>
                      </div>
                      <div className="p-2 bg-amber-500 text-slate-950 rounded-none group-hover:scale-110 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Module Container */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white rounded-none transition-all duration-300 border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="max-w-4xl w-full bg-slate-900 border border-amber-500/20 rounded-none overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 bg-slate-950 p-2 flex items-center justify-center">
                  <img
                    src={activePhoto.photo_url}
                    alt={activePhoto.heading}
                    className="max-h-[60vh] object-contain rounded-none w-full"
                  />
                </div>

                <div className="md:col-span-5 p-8 flex flex-col justify-between items-start gap-8">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase px-2.5 py-1 bg-amber-500/5 rounded-none border border-amber-500/20">
                      {activePhoto.type} Portfolio
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium leading-tight mt-4">
                      {activePhoto.heading}
                    </h3>

                    {/* Render live database description dynamically */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4">
                      {activePhoto.description || "No supplemental details provided for this asset selection row column context directory."}
                    </p>
                  </div>

                  <div className="w-full flex items-center gap-3 border-t border-white/5 pt-6 text-[11px] text-slate-500">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>NOBEL Academy Surkhet • Fine Heritage</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}