import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, BookOpen, CheckCircle } from "lucide-react";

interface ProgramItem {
    id: string;
    number: string;
    title: string;
    shortDesc: string;
    longDesc: string;
    image: string;
    highlights: string[];
}

const programsData: ProgramItem[] = [
    {
        id: "pre-school",
        number: "01",
        title: "Pre-School",
        shortDesc: "Nobel School Early Childhood Program with Phonics and Whole Child Development.",
        longDesc: "Our Early Childhood Program focuses on a play-based, child-centered approach that builds fundamental literacy and numeracy skills. Using a comprehensive phonics curriculum, we nurture curiosity, emotional resilience, and cross-sensory development in a secure, loving environment.",
        image: "https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/653709917_1334342871837779_2192232408136613973_n.jpg?stp=c256.0.1536.1536a_cp6_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeFFA4_CQ8DnAloHKOMGMj3mn88q5DEP7ZefzyrkMQ_tl6E4kwbUDWwD7imOwfK8kV_qkRtounlEReVW6XROx5Dy&_nc_ohc=s_7bupOxgR8Q7kNvwE35kRy&_nc_oc=Ado_nvj5zQCU5REAC6Saum6YcBZJ6eK6av3L_n6X77L3T6AQLbDArWNnu0KFDIwYkcA&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=9jokeIHsr6GPVW55x9kJ3g&_nc_ss=7b2a8&oh=00_Af_80b5rDSzLxFBA6XSejBnmeV0E2PlvDdzxcef1o3wEaQ&oe=6A247015",
        highlights: ["Synthetic Phonics Framework", "Sensory & Motor Skill Labs", "Social-Emotional Milestones Track"],
    },
    {
        id: "primary-school",
        number: "02",
        title: "Primary School",
        shortDesc: "Focus on English language, Project based learning and different extra-curricular activities for the holistic development of a child.",
        longDesc: "The Primary tier bridges foundational intuition with structured conceptual knowledge. Through experiential project-based inquiry learning modules, students apply classroom mathematics, science, and multi-lingual language tracks directly to real-world scenarios.",
        image: "/primaryschool.png",
        highlights: ["Inquiry-Based Project Models", "Advanced Linguistic Fluency", "Introductory STEM & Robotics Labs"],
    },
    {
        id: "secondary-school",
        number: "03",
        title: "Secondary School",
        shortDesc: "The Lower Secondary school (VI - VIII) is a smooth transition from Primary to Secondary School. The regular syllabus for every subject...",
        longDesc: "Secondary education refines critical analytic reasoning frameworks. Preparing students for academic rigor, our curriculum balances rigorous stem training, secondary board preparation, and ethical debate platforms to establish complete academic sovereignty.",
        image: "https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/587781171_1246573317281402_4728680125236405064_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEpEEnw9Ms3l66KZLTxbK4j7HqKMlEtl_XseooyUS2X9T-iyq1oynrF6b258ZfDngi5BMQXhwFKI8VhtGs2a1Al&_nc_ohc=O64vjuf5im4Q7kNvwHMVVRw&_nc_oc=AdqAg8qDArIVhRwmtmgGwnQT0FTHCbHQY3lZWeAUhjKNG_VqTFwKlwoZd7_MaXTNfss&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=YjAd8f7l2fGgPXdsgU4Y8w&_nc_ss=7b2a8&oh=00_Af-3IA7IFrhTWEPCjqRpTFkxzlb6GPhB6VQyfS7sCl2gbQ&oe=6A24739F",
        highlights: ["Rigorous Analytical Math/Science", "Pre-Board Simulation Systems", "Competitive Debating & Public Speaking"],
    },
    {
        id: "plus-two-management",
        number: "04",
        title: "Plus-2 Management",
        shortDesc: "Nobel School Grade XI/XII Management is providing in-depth knowledge of management at its level. Our main objective is to address the felt need for...",
        longDesc: "Our premier Management stream is precision-built to engineer future corporate leaders, entrepreneurs, and global financial controllers. Deep-diving into corporate accounting structures, modern economic theories, business mathematics, and leadership paradigms, we prepare students for high-stakes professional certification routes.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
        highlights: ["Advanced Accounting & Fiscal Controls", "Strategic Business Case Lab", "Pre-CA (Chartered Accountancy) Foundation Seminars"],
    },
];

export default function Programs() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const activeProgram = programsData.find((p) => p.id === selectedId);

    // Optimized container variants for fluid, fast-paced loading staggered entries
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08 // Faster pacing between cards
            },
        },
    };

    // Swapped spring logic for a responsive cubic-bezier transition curve
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20 // Halved traveling distance to stop the lag/dragging look
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.215, 0.610, 0.355, 1.000] // Ultra-smooth cubic ease-out
            }
        },
    };

    return (
        <section className="bg-slate-900 py-24 px-6 md:px-12 relative overflow-hidden">
            {/* Structural Minimal Backdrop Accents */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 relative">
                    <span className="text-[10px] font-sans font-bold text-amber-500 tracking-[0.3em] uppercase block mb-3">
                        Program
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white font-semibold tracking-wide">
                        Our Programs
                    </h2>
                    <div className="w-12 h-[2px] bg-amber-500/40 mx-auto mt-4" />
                </div>

                {/* Dynamic Animated Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }} // Fires the moment 15% peek onto viewport
                >
                    {programsData.map((program) => (
                        <motion.div
                            key={program.id}
                            variants={cardVariants}
                            whileHover={{ y: -5, transition: { duration: 0.15, ease: "easeOut" } }}
                            onClick={() => setSelectedId(program.id)}
                            className="group relative bg-slate-950/60 border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer overflow-hidden transition-colors hover:bg-slate-950 hover:border-amber-500/20"
                        >
                            {/* Graphic Accents */}
                            <div className="absolute top-0 right-8 w-4 h-12 flex gap-[3px]">
                                <div className="w-[1.5px] h-full bg-white/20 group-hover:bg-amber-500/40 transition-colors" />
                                <div className="w-[1.5px] h-3/4 bg-white/10 group-hover:bg-amber-500/20 transition-colors" />
                            </div>

                            {/* Circle Avatar Frame */}
                            <div className="w-36 h-36 rounded-full overflow-hidden p-1.5 border border-white/10 bg-slate-900 mb-6 group-hover:border-amber-500/30 transition-colors">
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-400 scale-100 group-hover:scale-105"
                                />
                            </div>

                            {/* Details */}
                            <h3 className="text-lg font-serif font-medium text-white tracking-wide mb-3 group-hover:text-amber-400 transition-colors">
                                {program.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mb-6 flex-grow max-w-xs">
                                {program.shortDesc}
                            </p>

                            {/* Action Trigger */}
                            <button className="inline-flex items-center gap-2 text-[11px] font-bold text-slate-300 group-hover:text-amber-500 uppercase tracking-widest transition-colors pb-1 border-b border-transparent group-hover:border-amber-500/30">
                                <span>Read More</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Backdrop Index Number */}
                            <span className="absolute bottom-[-10px] left-4 font-mono font-bold text-6xl text-slate-900/50 select-none group-hover:text-amber-500/5 transition-colors z-0">
                                {program.number}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Expandable AnimatePresence Modal Overlay View */}
                <AnimatePresence>
                    {selectedId && activeProgram && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
                            {/* Overlay Dimmer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                            />

                            {/* Animated Expansion Card Context Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="bg-slate-900 border border-white/10 w-full max-w-3xl rounded-2xl overflow-hidden relative shadow-2xl max-h-[90vh] flex flex-col z-10"
                            >
                                {/* Decorative Top Accent Line */}
                                <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 to-amber-600" />

                                {/* Close Button Trigger */}
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 z-20 p-2 border border-white/5 hover:border-white/20 text-slate-400 hover:text-white bg-slate-950 transition-all rounded-lg"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Main Expansion Inner Scrolling Flow */}
                                <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                                        {/* Media Aspect Row */}
                                        <div className="md:col-span-5 flex flex-col items-center md:items-start">
                                            <div className="w-44 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative bg-slate-950 p-1">
                                                <img
                                                    src={activeProgram.image}
                                                    alt={activeProgram.title}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-slate-500 font-mono text-xs">
                                                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                                                <span>Curriculum Track {activeProgram.number}</span>
                                            </div>
                                        </div>

                                        {/* Meta Detailed Descriptions */}
                                        <div className="md:col-span-7">
                                            <h3 className="text-2xl font-serif text-white font-medium mb-4 tracking-wide">
                                                {activeProgram.title} Overview
                                            </h3>
                                            <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                                                {activeProgram.longDesc}
                                            </p>

                                            {/* Core Highlights List */}
                                            <div className="border-t border-white/5 pt-5">
                                                <h4 className="text-[11px] font-mono uppercase tracking-widest text-amber-500 mb-3.5">
                                                    Core Pillars & Focus
                                                </h4>
                                                <ul className="space-y-2.5">
                                                    {activeProgram.highlights.map((highlight, index) => (
                                                        <li key={index} className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 font-light">
                                                            <CheckCircle className="w-4 h-4 text-amber-500/80 shrink-0" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Control Footer */}
                                <div className="border-t border-white/5 px-6 py-4 bg-slate-950/40 flex justify-end">
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-slate-900 border border-white/10 hover:border-amber-500/40 text-slate-300 hover:text-white transition-all rounded-lg"
                                    >
                                        Close Portal View
                                    </button>
                                </div>

                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}