import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, Film, Sparkles, Image as ImageIcon, Video, ChevronLeft, ChevronRight, Maximize2, Download } from "lucide-react";

interface LocalMediaItem {
    id: string;
    heading: string;
    type: "Image" | "Video";
    category: string;
    media_url: string[];
    thumbnail_url?: string;
    description: string;
}

// 1. Get all scanned images from the folder
const scannedPaddyImages = Object.keys(
    import.meta.glob("/public/nationalpaddyday/*.{png,jpg,jpeg,PNG,JPG,JPEG}", { eager: true })
).map((path) => path.replace("/public", ""));

// 2. Filter out 'pady.jpeg' from its random position so it doesn't repeat
const orderedPaddyImages = [
    "/nationalpaddyday/pady.jpeg",
    ...scannedPaddyImages.filter(path => !path.endsWith("/pady.jpeg"))
];

const localMedia: LocalMediaItem[] = [
    {
        id: "national-paddy-day",
        heading: "National Paddy Day",
        type: "Image",
        category: "Cultural",
        media_url: orderedPaddyImages,
        description: "Celebrating National Paddy Day with traditional farming activities, muddy fun, and rich cultural heritage."
    },
    {
        id: "morning-assembly",
        heading: "Morning Assembly",
        type: "Image",
        category: "School Life",
        media_url: [
            "/morningacembly.jpeg",
        ],
        description: "Students gathering at the morning assembly to start the day with enthusiasm and discipline."
    },
    {
        id: "local-2",
        heading: "Official Campus Drone View",
        type: "Video",
        category: "School Life",
        media_url: ["/videos/hero-drone.mp4"],
        thumbnail_url: "/dronephoto.png",
        description: "Take an immersive digital journey through our beautiful campus."
    },
    {
        id: "local-3",
        heading: "Science Lab Tour",
        type: "Video",
        category: "Academics",
        media_url: ["/videos/sciencelab.mp4"],
        thumbnail_url: "/sciencelab.png",
        description: "Take an immersive digital journey through our science lab."
    },
];

export default function LocalGallery() {
    const [activeFilter, setActiveFilter] = useState<"All" | "Image" | "Video">("All");
    const [activeItem, setActiveItem] = useState<LocalMediaItem | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number>(0);
    const [gridCardIndices, setGridCardIndices] = useState<Record<string, number>>({});

    // Reference pointer attached to the image viewport container for full-screen management
    const mediaViewportRef = useRef<HTMLDivElement>(null);

    const getVideoThumbnail = (item: LocalMediaItem) => {
        return item.thumbnail_url || "/dronephoto.png";
    };

    // ==========================================
    // NEW FEATURES: FULLSCREEN & DOWNLOAD HANDLERS
    // ==========================================
    const handleToggleFullscreen = () => {
        if (!mediaViewportRef.current) return;

        if (!document.fullscreenElement) {
            mediaViewportRef.current.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleDownloadImage = async (imgUrl: string, fileName: string) => {
        try {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${fileName.toLowerCase().replace(/\s+/g, "-")}-${lightboxIndex + 1}.jpeg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download image seamlessly, opening fallback in new window", error);
            window.open(imgUrl, "_blank");
        }
    };

    const filteredItems = localMedia.filter(
        (item) => activeFilter === "All" || item.type === activeFilter
    );

    const handlePrevSlide = (e: React.MouseEvent, max: number, current: number, setter: (n: number) => void) => {
        e.stopPropagation();
        setter(current === 0 ? max - 1 : current - 1);
    };

    const handleNextSlide = (e: React.MouseEvent, max: number, current: number, setter: (n: number) => void) => {
        e.stopPropagation();
        setter(current === max - 1 ? 0 : current + 1);
    };

    return (
        <section id="local-gallery" className="relative py-24 bg-slate-950 overflow-hidden px-4 sm:px-6 md:px-8 border-t border-white/5">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[130px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">
                {/* Header Layout */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/5 border border-amber-500/20 text-[10px] tracking-widest uppercase text-amber-500 font-semibold rounded-none mb-4">
                            <Film className="w-3.5 h-3.5" />
                            <span>Direct Archive</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-serif text-white font-medium leading-tight">
                            Gallery of <span className="italic text-amber-500 font-light">Nobel</span>
                        </h2>
                    </div>

                    <div className="flex p-1 bg-slate-900 border border-white/5 rounded-none self-start md:self-auto">
                        {(["All", "Image", "Video"] as const).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 text-xs font-mono uppercase transition-all duration-300 ${activeFilter === filter ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                            >
                                {filter === "All" ? "All Media" : `${filter}s`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Display Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => {
                            const currentMediaIndex = gridCardIndices[item.id] || 0;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3) }}
                                    key={item.id}
                                    onClick={() => {
                                        setActiveItem(item);
                                        setLightboxIndex(0);
                                    }}
                                    className="h-64 sm:h-72 rounded-none overflow-hidden relative border border-amber-500/10 group cursor-pointer shadow-xl bg-slate-900"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-all duration-500" />

                                    {/* Action Badges */}
                                    <div className="absolute top-4 left-4 z-20 flex gap-2 items-center">
                                        <div className="px-2.5 py-1 bg-slate-950/90 backdrop-blur-md border border-amber-500/20 text-[9px] uppercase font-mono text-amber-400 tracking-wider flex items-center gap-1.5">
                                            {item.type === "Image" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                                            <span>{item.category}</span>
                                        </div>
                                        {item.media_url.length > 1 && (
                                            <div className="px-2 py-1 bg-amber-500 text-slate-950 text-[9px] font-bold font-mono">
                                                {item.media_url.length} Photos
                                            </div>
                                        )}
                                    </div>

                                    {/* Embedded Card Controls */}
                                    {item.media_url.length > 1 && (
                                        <div className="absolute top-4 right-4 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => handlePrevSlide(e, item.media_url.length, currentMediaIndex, (next) =>
                                                    setGridCardIndices(prev => ({ ...prev, [item.id]: next }))
                                                )}
                                                className="p-1 bg-slate-950/90 border border-white/5 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors"
                                            >
                                                <ChevronLeft className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={(e) => handleNextSlide(e, item.media_url.length, currentMediaIndex, (next) =>
                                                    setGridCardIndices(prev => ({ ...prev, [item.id]: next }))
                                                )}
                                                className="p-1 bg-slate-950/90 border border-white/5 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors"
                                            >
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}

                                    {item.type === "Image" ? (
                                        <motion.div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${item.media_url[currentMediaIndex] || item.media_url[0]}')` }}
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    ) : (
                                        <div className="w-full h-full relative">
                                            <div
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url('${getVideoThumbnail(item)}')` }}
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                                                <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                                                    <span className="ml-1 border-y-[6px] border-y-transparent border-l-[10px] border-l-slate-950" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end gap-4">
                                        <h4 className="text-base font-serif text-white font-medium line-clamp-1">
                                            {item.heading}
                                        </h4>
                                        <div className="p-2.5 bg-amber-500 text-slate-950 rounded-none transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
                    >
                        {/* Upper Header Control Tray */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
                            {activeItem.type === "Image" && (
                                <>
                                    <button
                                        onClick={() => handleDownloadImage(activeItem.media_url[lightboxIndex], activeItem.heading)}
                                        title="Download Photo"
                                        className="p-3 bg-white/5 text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleToggleFullscreen}
                                        title="Toggle Fullscreen"
                                        className="p-3 bg-white/5 text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10"
                                    >
                                        <Maximize2 className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                            <button onClick={() => setActiveItem(null)} className="p-3 bg-white/5 text-white hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/10">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <motion.div initial={{ scale: 0.96, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 15 }} className="max-w-4xl w-full bg-slate-900 border border-amber-500/20 rounded-none overflow-hidden shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-12">

                                {/* Visual Viewport Area (Linked with useRef for Fullscreen support) */}
                                <div
                                    ref={mediaViewportRef}
                                    className="md:col-span-7 bg-slate-950 p-4 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[450px] fullscreen-target"
                                >
                                    {activeItem.media_url.length > 1 && (
                                        <>
                                            <button onClick={(e) => handlePrevSlide(e, activeItem.media_url.length, lightboxIndex, setLightboxIndex)} className="absolute left-4 p-2 bg-slate-900/90 text-white hover:bg-amber-500 hover:text-slate-950 transition-all z-20">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button onClick={(e) => handleNextSlide(e, activeItem.media_url.length, lightboxIndex, setLightboxIndex)} className="absolute right-4 p-2 bg-slate-900/90 text-white hover:bg-amber-500 hover:text-slate-950 transition-all z-20">
                                                <ChevronRight size={20} />
                                            </button>
                                        </>
                                    )}

                                    {activeItem.type === "Image" ? (
                                        <img key={lightboxIndex} src={activeItem.media_url[lightboxIndex]} alt={activeItem.heading} className="max-h-[60vh] object-contain w-full" />
                                    ) : (
                                        <video src={activeItem.media_url[0]} controls autoPlay className="max-h-[60vh] w-full bg-black" />
                                    )}

                                    {activeItem.media_url.length > 1 && (
                                        <div className="flex gap-1 mt-4">
                                            {activeItem.media_url.map((_, dotIdx) => (
                                                <div key={dotIdx} className={`h-1 transition-all duration-300 ${dotIdx === lightboxIndex ? "w-4 bg-amber-500" : "w-1 bg-white/30"}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-5 p-8 flex flex-col justify-between items-start gap-8 bg-slate-900">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-semibold tracking-widest text-amber-500 uppercase px-2.5 py-1 bg-amber-500/5 border border-amber-500/20">
                                                {activeItem.type} Frame
                                            </span>
                                            {activeItem.media_url.length > 1 && (
                                                <span className="text-[10px] text-slate-400 font-mono">
                                                    Photo {lightboxIndex + 1} of {activeItem.media_url.length}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-serif text-white font-medium mt-4">{activeItem.heading}</h3>
                                        <p className="text-xs sm:text-sm text-slate-400 font-light mt-4">{activeItem.description}</p>
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