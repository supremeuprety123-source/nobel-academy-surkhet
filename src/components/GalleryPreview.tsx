import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, Images, Sparkles } from "lucide-react";
import { GalleryItem } from "../types";

export default function GalleryPreview() {
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "gal1",
      title: "The Central Library Desk",
      category: "Campus",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8zrQRekRI6C8RR4cQi_lldyXrprL1JPLGBemGfP4UKHHP40hXERO7F2zi_RBi00u6yqEWrKqpwYIUxVZ4NFNDXmpTeEqmtjQF2_dvu5Zdii8amgi7ucPIkhRS5wIw5DY2U5iKSHBGVgpFRuasqzII30Cu4Qnv5-qQo945I_cvCqdS_AbUtFhynejH7eK7cYNQkhc4EsoW_2yfNpwoCuHyaulYwRunIqM1dArgvNZJn2VwfpVRBbgQ9sHwYn5AsQe49XR-LeaLzU8",
      description: "A beautifully structured scholastic haven containing over 35,000 physical volumes, reference guides, and collaborative tables under timber frameworks.",
    },
    {
      id: "gal2",
      title: "Athletic Leagues & Sport Day Blast",
      category: "Athletics",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQMHfHXtBBMPdlnNyjBUX3IgbKzYthLALzfbqK1nxC3dYyc7KuoNkflbNWVVtzsP_ks377B5jRRyIrKmBrwK5hclY9C9WcHbFRJOLw4xndFk1l09yhCmKQo55L53Ar-w9rZwQupUt4WcIhrmCJ5spTKyLrsAIqYn5J5zTqkECJn9QgyPoIkdpoMw8Ks-ZYBb5dSJrBgNvydcPc3PsAv5QryKTG2sXj8SDL01d-Qe15DleVaVa7Wd7u3sr74Chvnk3XYLQdyI-798",
      description: "Our signature regional sports tournament gathering, cultivating sportsmanship, active physical resilience, and team bonds across Karnali province.",
    },
    {
      id: "gal3",
      title: "Annual Commencement Ceremonies",
      category: "Events",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA1Rm6UQ-6yx_sAlh3A3qqJtIjYCYVhpdaINaOC82Pdf7QfRoyG4iqElY33sDx1i5OpjlXYxS4MHAHm7cwVdZdBsaQBqV4NVvNpDTvYFRVQcPPsjqDLifdcZeHnRyE6vblCjcWUe-_VDj78JkGwxyU40WHE63w-zWkA68lbpFVfaSis9PRytdVVsK7aPKA5RunNVfmOCILCzgge92I3o-tQnefBKg0J26894rI-63myOBIVfp0ZcY-egTFL1GQGzqtDCWkwfIkMwc",
      description: "Nurturing professional prospects. Smiling academic success as high school graduates secure placements globally and within local administrative fields.",
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-28 md:py-36 bg-slate-950 overflow-hidden px-4 sm:px-6 md:px-12-desktop"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[-5%] w-[450px] h-[450px] bg-gold-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/5 border border-gold-500/20 text-[10px] tracking-widest uppercase text-gold-500 font-semibold rounded-none mb-4">
              <Images className="w-3.5 h-3.5" />
              <span>Campus Radiance</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-serif text-white font-medium leading-tight">
              Life at <span className="italic text-gold-500 font-light">Nobel</span>
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[680px]">
          
          {/* Large Item: Library */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            onClick={() => setActivePhoto(galleryItems[0])}
            className="md:col-span-7 h-80 md:h-full rounded-none overflow-hidden relative border border-gold-500/10 group cursor-pointer shadow-xl"
          >
            {/* Hover details */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-500" />
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-none bg-slate-950/80 backdrop-blur-md border border-gold-500/20 text-[10px] uppercase font-semibold text-gold-500">
              {galleryItems[0].category}
            </div>

            {/* Background image */}
            <motion.div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${galleryItems[0].imageUrl}')` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Click detail widget */}
            <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
              <div>
                <h4 className="text-lg sm:text-2xl font-serif text-white font-medium">
                  {galleryItems[0].title}
                </h4>
                <p className="text-xs text-slate-400 font-light mt-1 max-w-sm hidden sm:block">
                  A glimpse inside our primary library studying area.
                </p>
              </div>
              <div className="p-3 bg-gold-500 text-slate-950 rounded-none group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </motion.div>

          {/* Secondary Items Column */}
          <div className="md:col-span-5 flex flex-col gap-6 h-full">
            
            {/* Athletics Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.15 }}
              onClick={() => setActivePhoto(galleryItems[1])}
              className="h-60 md:h-[48%] rounded-none overflow-hidden relative border border-gold-500/10 group cursor-pointer shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-500" />
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-none bg-slate-950/80 backdrop-blur-md border border-gold-500/20 text-[10px] uppercase font-semibold text-gold-500">
                {galleryItems[1].category}
              </div>

              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${galleryItems[1].imageUrl}')` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div>
                  <h4 className="text-base sm:text-lg font-serif text-white font-medium">
                    {galleryItems[1].title}
                  </h4>
                </div>
                <div className="p-2 bg-gold-500 text-slate-950 rounded-none group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

            {/* Events Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3 }}
              onClick={() => setActivePhoto(galleryItems[2])}
              className="h-60 md:h-[48%] rounded-none overflow-hidden relative border border-gold-500/10 group cursor-pointer shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-all duration-500" />
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-none bg-slate-950/80 backdrop-blur-md border border-gold-500/20 text-[10px] uppercase font-semibold text-gold-500">
                {galleryItems[2].category}
              </div>

              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${galleryItems[2].imageUrl}')` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                <div>
                  <h4 className="text-base sm:text-lg font-serif text-white font-medium">
                    {galleryItems[2].title}
                  </h4>
                </div>
                <div className="p-2 bg-gold-500 text-slate-950 rounded-none group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Lightbox Overlay */}
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
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-gold-500 hover:text-slate-950 text-white rounded-none transition-all duration-300 border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              className="max-w-4xl w-full bg-slate-900 border border-gold-500/20 rounded-none overflow-hidden shadow-2xl animate-fade-in"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Photo Frame */}
                <div className="md:col-span-7 bg-slate-950 p-2 flex items-center justify-center">
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="max-h-[60vh] object-contain rounded-none w-full"
                  />
                </div>

                {/* Metadata Info */}
                <div className="md:col-span-5 p-8 flex flex-col justify-between items-start gap-8">
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest text-gold-500 uppercase px-2.5 py-1 bg-gold-500/5 rounded-none border border-gold-500/20">
                      {activePhoto.category} Portfolio
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white font-medium leading-tight mt-4">
                      {activePhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4">
                      {activePhoto.description}
                    </p>
                  </div>

                  <div className="w-full flex items-center gap-3 border-t border-white/5 pt-6 text-[11px] text-slate-500">
                    <Sparkles className="w-4 h-4 text-gold-500" />
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
