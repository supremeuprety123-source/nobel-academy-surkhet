import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, Film, Sparkles, Image as ImageIcon, Video } from "lucide-react";

interface LocalMediaItem {
    id: string;
    heading: string;
    type: "Image" | "Video";
    category: "Academics" | "Sports" | "Cultural" | "School Life";
    media_url: string; // Path to your local public folder asset
    thumbnail_url?: string; // Optional cover image for video items
    description: string;
}

export default function StaticGallery() {
    const [activeFilter, setActiveFilter] = useState<"All" | "Image" | "Video">("All");
    const [activeItem, setActiveItem] = useState<LocalMediaItem | null>(null);

    // 1. HARDCODED MEDIA ASSETS (Add your direct local paths here)
    const localMedia: LocalMediaItem[] = [
        {
            id: "local-1",
            heading: "Morning Acembly",
            type: "Image",
            category: "School Life",
            media_url: "/morningacembly.jpeg",
            description: "Students gathering at the morning assembly to start the day with enthusiasm and discipline."
        },
        {
            id: "local-2",
            heading: "Official Campus Drone View",
            type: "Video",
            category: "School Life",
            media_url: "/videos/hero-drone.mp4",
            thumbnail_url: "/dronephoto.png", // Displays before video plays
            description: "Take an immersive digital journey through our beautiful campus."
        },
        {
            id: "local-3",
            heading: "Science Lab Tour",
            type: "Video",
            category: "Academics",
            media_url: "/videos/sciencelab.mp4",
            thumbnail_url: "/sciencelab.png", // Displays before video plays
            description: "Take an immersive digital journey through our science lab."
        },
    ];

    const filteredItems = localMedia.filter(
        (item) => activeFilter === "All" || item.type === activeFilter
    );

    return (
        <section id="local-gallery" className="relative py-24 bg-slate-950 overflow-hidden px-4 sm:px-6 md:px-8 border-t border-white/5">
            {/* Subtle Background Ambiance */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">

                {/* Header Layout Grid */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/5 border border-amber-500/20 text-[10px] tracking-widest uppercase text-amber-500 font-semibold rounded-none mb-4">
                            <Film className="w-3.5 h-3.5" />
                            <span>Direct Archive</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif text-white font-medium leading-tight">
                            Gallery of <span className="italic text-amber-500 font-light">Nobel</span>
                        </h2>
                        <p className="text-sm text-slate-400 font-light mt-4 max-w-xl">
                            An uncompressed continuous storage showcase of our static event photography portfolios and active video reels.
                        </p>
                    </div>

                    {/* Filtering Control Toggles */}
                    <div className="flex p-1 bg-slate-900 border border-white/5 rounded-none self-start md:self-auto">
                        {(["All", "Image", "Video"] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 text-xs font-mono uppercase transition-all duration-300 ${activeFilter === filter
                                    ? "bg-amber-500 text-slate-950 font-bold"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {filter === "All" ? "All Media" : `${filter}s`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Display Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3) }}
                                key={item.id}
                                onClick={() => setActiveItem(item)}
                                className="h-64 sm:h-72 rounded-none overflow-hidden relative border border-amber-500/10 group cursor-pointer shadow-xl bg-slate-900"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-all duration-500" />

                                {/* Upper Left Format Indicator Badge */}
                                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-slate-950/90 backdrop-blur-md border border-amber-500/20 text-[9px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                                    {item.type === "Image" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                                    <span>{item.category}</span>
                                </div>

                                {/* Local Visual Elements */}
                                {item.type === "Image" ? (
                                    <motion.div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url('${item.media_url}')` }}
                                        whileHover={{ scale: 1.04 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                    />
                                ) : (
                                    <div className="w-full h-full relative">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${item.thumbnail_url || "/images/gallery/video-fallback.jpg"}')` }}
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 group-hover:bg-black/0 transition-colors duration-300">
                                            <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 transform group-hover:scale-110 transition-transform duration-300">
                                                <span className="ml-1 border-y-[6px] border-y-transparent border-l-[10px] border-l-slate-950" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Titles Content Positioning */}
                                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end gap-4">
                                    <div className="max-w-[80%]">
                                        <h4 className="text-base sm:text-lg font-serif text-white font-medium line-clamp-1 group-hover:text-amber-400 transition-colors duration-300">
                                            {item.heading}
                                        </h4>
                                    </div>
                                    <div className="p-2.5 bg-amber-500 text-slate-950 rounded-none transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>

            {/* Lightbox Module Container */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
                    >
                        <button
                            onClick={() => setActiveItem(null)}
                            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white rounded-none transition-all duration-300 border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.96, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.96, y: 15 }}
                            transition={{ ease: "easeOut", duration: 0.3 }}
                            className="max-w-4xl w-full bg-slate-900 border border-amber-500/20 rounded-none overflow-hidden shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12">

                                {/* Visual Viewport Area */}
                                <div className="md:col-span-7 bg-slate-950 p-2 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                                    {activeItem.type === "Image" ? (
                                        <img
                                            src={activeItem.media_url}
                                            alt={activeItem.heading}
                                            className="max-h-[60vh] object-contain rounded-none w-full"
                                        />
                                    ) : (
                                        <video
                                            src={activeItem.media_url}
                                            controls
                                            autoPlay
                                            className="max-h-[60vh] w-full focus:outline-none bg-black"
                                        />
                                    )}
                                </div>

                                {/* Text Content Sidebar */}
                                <div className="md:col-span-5 p-8 flex flex-col justify-between items-start gap-8 bg-slate-900">
                                    <div>
                                        <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase px-2.5 py-1 bg-amber-500/5 rounded-none border border-amber-500/20">
                                            {activeItem.type} Frame
                                        </span>
                                        <h3 className="text-2xl font-serif text-white font-medium leading-tight mt-4">
                                            {activeItem.heading}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4">
                                            {activeItem.description}
                                        </p>
                                    </div>

                                    <div className="w-full flex items-center gap-3 border-t border-white/5 pt-6 text-[11px] text-slate-500">
                                        <Sparkles className="w-4 h-4 text-amber-500" />
                                        <span>NOBEL Academy Surkhet • Local Asset</span>
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