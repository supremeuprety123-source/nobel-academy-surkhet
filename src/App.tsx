import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom"; // Added location hooks
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, AlertCircle, PhoneCall, Loader2, ChevronDown, Layers, GraduationCap, Award } from "lucide-react";
import { supabase } from "./lib/supabaseClient";

// Component imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutPreview from "./components/AboutPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Programs from "./components/programs";
import NoticeBoard from "./components/NoticeBoard";
import GalleryPreview from "./components/GalleryPreview";
import StaticGallery from "./components/StaticGallery";
import Testimonials from "./components/Testimonials";
import AdminLayout from './admin/AdminLayout';
import AdmissionsCTA from "./components/AdmissionsCTA";
import AdminLoginModal from "./components/AdminLoginModal";
import Footer from "./components/Footer";

// Sleek, clean scroll animation that only affects the Y-axis and opacity. 
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // Cinematic easing
    }
  }
};

// --- SLIDEABLE PROGRAM SELECTOR SUB-COMPONENT ---
const academicTiers = [
  {
    category: "Early Years & Primary (Nursery - Grade 5)",
    icon: <Layers className="w-3.5 h-3.5 text-gold-500" />,
    options: ["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]
  },
  {
    category: "Secondary Education (Grade 6 - 10)",
    icon: <GraduationCap className="w-3.5 h-3.5 text-gold-500" />,
    options: ["Grade 6", "Grade 7", "Grade 8 (BLE)", "Grade 9", "Grade 10 (SEE)"]
  },
  {
    category: "Higher Secondary Plus-2 (NEB)",
    icon: <Award className="w-3.5 h-3.5 text-gold-500" />,
    options: ["+2 Management", "+2 Hotel Management"]
  },
  {
    category: "Special Enrolment Schemes",
    icon: <Award className="w-3.4 h-3.5 text-gold-400 animate-pulse" />,
    options: ["Scholarship seat"]
  }
];

function SlideableProgramSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selectGrade = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
        Program Stream / Level
      </label>

      {/* Main Trigger Anchor Field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white flex justify-between items-center cursor-pointer select-none transition-all duration-300"
        style={{ backgroundColor: "#020617" }}
      >
        <span className={value ? "text-white" : "text-slate-500"}>
          {value || "Select a Grade / Stream"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </div>

      {/* Accordion Menu Drawer Layout */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-[102%] bg-slate-900 border border-white/10 rounded-none shadow-2xl overflow-hidden z-40 max-h-[320px] overflow-y-auto custom-scrollbar"
            >
              {academicTiers.map((tier, idx) => {
                const isExpanded = activeCategory === tier.category;

                return (
                  <div key={idx} className="border-b border-white/5 last:border-none">
                    <div
                      onClick={() => setActiveCategory(isExpanded ? null : tier.category)}
                      className="w-full px-4 py-3 bg-slate-950/80 hover:bg-slate-950 flex items-center justify-between text-[11px] font-mono tracking-wider font-medium text-slate-300 cursor-pointer select-none transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        {tier.icon}
                        <span>{tier.category}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180 text-gold-500" : ""
                          }`}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden bg-slate-900/60"
                        >
                          <div className="grid grid-cols-2 gap-1 p-2">
                            {tier.options.map((option) => (
                              <button
                                type="button"
                                key={option}
                                onClick={() => selectGrade(option)}
                                className={`text-left px-3 py-2.5 text-xs font-light transition-all duration-200 border ${value === option
                                  ? "bg-gold-500/10 text-gold-400 border-gold-500/30 font-medium"
                                  : "text-slate-400 hover:text-white bg-slate-950/20 border-transparent hover:bg-slate-950/60"
                                  }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- HYBRID ROUTE SCROLL MANAGER COMPONENT ---
function ScrollToSection() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If we're on a standalone sub-route page, reset viewport positioning to top cleanly
    if (pathname !== "/") {
      window.scrollTo(0, 0);
      return;
    }

    // Capture target section name out of standard path configurations (e.g., /about -> ID: about)
    const sectionId = pathname === "/" ? "" : pathname.replace("/", "");

    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Safe timeout execution to guarantee complete DOM hydration layout before shifting focus
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [pathname]);

  return null;
}

// --- MAIN APP EXPORT ---
export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"apply" | "prospectus">("apply");

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nobel_admin_authenticated') === 'true';
  });

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Form submission state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "+2 Management",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submittedUser, setSubmittedUser] = useState({ name: "", program: "", phone: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (value: string) => {
    setFormData((prev) => ({ ...prev, program: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) return setFormError("Full Name is required.");
    if (!formData.phone.trim() || formData.phone.length < 8) return setFormError("A valid Contact Number is required.");
    if (!formData.email.includes("@")) return setFormError("Please enter a valid academic or personal email.");
    if (!formData.program) return setFormError("Please select a valid grade or stream level.");

    setIsSubmitting(true);

    try {
      const targetTable = modalType === "prospectus" ? "prospectus" : "applications";

      const { error } = await supabase
        .from(targetTable)
        .insert([
          {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
            class_applying_for: formData.program || "+2 Management",
            message: formData.message,
            status: "Pending"
          }
        ]);

      if (error) throw error;

      setSubmittedUser({
        name: formData.name,
        program: formData.program || "+2 Management",
        phone: formData.phone
      });
      setFormSubmitted(true);

      setTimeout(() => {
        setFormSubmitted(false);
        setIsInquiryModalOpen(false);
        setFormData({ name: "", phone: "", email: "", program: "+2 Management", message: "" });
      }, 3500);

    } catch (err: any) {
      setFormError(err.message || "Failed to submit request setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Router>
      {/* Listens to route modifications and acts automatically */}
      <ScrollToSection />

      <div className="bg-slate-950 text-slate-100 min-h-screen antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-white">
        {isAdminAuthenticated ? (
          <AdminLayout
            onLogout={() => {
              setIsAdminAuthenticated(false);
              localStorage.removeItem('nobel_admin_authenticated');
              localStorage.removeItem('nobel_admin_current_view');
            }}
          />
        ) : (
          <>
            {/* Floating Mobile Action Button */}
            <div className="fixed bottom-6 right-6 z-40 md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setModalType("apply");
                  setIsInquiryModalOpen(true);
                }}
                className="w-14 h-14 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center border border-gold-400/30 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
              </motion.button>
            </div>

            <Navbar onInquireClick={() => {
              setModalType("apply");
              setIsInquiryModalOpen(true);
            }} />

            <Routes>
              {/* --- ROUTE 1: STACKED MAIN HOME LANDING PAGE --- */}
              <Route path="/" element={
                <main>
                  <Hero
                    onLearnMoreClick={() => {
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onTourClick={() => {
                      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                  <div id="about">
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative">
                      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
                      <AboutPreview />
                    </motion.section>
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                      <WhyChooseUs />
                    </motion.section>
                  </div>

                  <div id="programs">
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                      <Programs />
                    </motion.section>
                  </div>

                  <div id="notice-board">
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                      <NoticeBoard />
                    </motion.section>
                  </div>

                  <div id="gallery">
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                      <GalleryPreview />
                    </motion.section>
                    <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                      <StaticGallery />
                    </motion.section>
                  </div>

                  <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                    <Testimonials />
                  </motion.section>

                  <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                    <AdmissionsCTA onApplyClick={() => { setModalType("apply"); setIsInquiryModalOpen(true); }} onProspectusClick={() => { setModalType("prospectus"); setIsInquiryModalOpen(true); }} />
                  </motion.section>
                </main>
              } />

              {/* --- ROUTE 2: STANDALONE ABOUT ROUTE --- */}
              <Route path="/about" element={
                <main className="pt-24">
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <AboutPreview />
                  </motion.section>
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <WhyChooseUs />
                  </motion.section>
                </main>
              } />

              {/* --- ROUTE 3: STANDALONE PROGRAMS ROUTE --- */}
              <Route path="/programs" element={
                <main className="pt-24">
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <Programs />
                  </motion.section>
                </main>
              } />

              {/* --- ROUTE 4: STANDALONE GALLERY ROUTE --- */}
              <Route path="/gallery" element={
                <main className="pt-24">
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <GalleryPreview />
                  </motion.section>
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <StaticGallery />
                  </motion.section>
                </main>
              } />

              {/* --- ROUTE 5: STANDALONE TESTIMONIALS (STUDENT VOICE) ROUTE --- */}
              <Route path="/testimonials" element={
                <main className="pt-24">
                  <motion.section variants={sectionVariants} initial="hidden" animate="visible">
                    <Testimonials />
                  </motion.section>
                </main>
              } />
            </Routes>

            <div className="relative">
              <Footer />
              <div className="bg-slate-950 py-4 text-center border-t border-white/5">
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="text-[10px] tracking-[0.3em] uppercase font-bold text-slate-600 hover:text-gold-500 transition-colors duration-300 cursor-pointer"
                >
                  ADMIN
                </button>
              </div>
            </div>
          </>
        )}

        {/* Admin Login Modal */}
        <AdminLoginModal
          isOpen={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLoginSuccess={() => {
            localStorage.setItem('nobel_admin_authenticated', 'true');
            setIsAdminAuthenticated(true);
            setShowAdminLogin(false);
          }}
        />

        {/* Inquiry Modal */}
        <AnimatePresence>
          {isInquiryModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="bg-slate-900 border border-gold-500/20 p-8 sm:p-10 rounded-none w-full max-w-lg relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => {
                      setIsInquiryModalOpen(false);
                      setFormSubmitted(false);
                      setFormError("");
                    }}
                    className="p-2 bg-white/5 text-slate-100 hover:text-gold-500 hover:bg-white/10 border border-white/5 rounded-none transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!formSubmitted ? (
                  <>
                    <div className="mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-gold-500 font-semibold px-2.5 py-1 bg-gold-500/5 border border-gold-500/20 rounded-none">
                        {modalType === "prospectus" ? "Nobel Document Archive Desk" : "Nobel Intake Desk"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif text-white font-medium leading-tight mt-3">
                      {modalType === "prospectus" ? "Request Prospectus File" : "Admissions Inquiry"}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2 mb-6 font-light">
                      {modalType === "prospectus"
                        ? "Complete your delivery coordinates below. Our registrar channel dispatch team will route your official files within 24 hours."
                        : "Complete the brief details below. Our academic desk registrar will get back to you within 24 hours."}
                    </p>

                    {formError && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-none bg-red-500/5 border border-red-500/20 flex items-center gap-3 text-xs text-red-400 leading-relaxed font-light">
                        <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                        <span>{formError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">Full Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="e.g. Samir Thapa" className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">Personal Email</label>
                          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="samir@example.com" className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">Contact Number</label>
                          <input type="text" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="e.g. 9848XXXXXX" className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all" />
                        </div>
                      </div>

                      <SlideableProgramSelector
                        value={formData.program}
                        onChange={handleProgramChange}
                      />

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">Inquiry / Message</label>
                        <textarea name="message" rows={3} value={formData.message} onChange={handleInputChange} placeholder="Ask about boarding facilities, scholarship deadlines..." className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all resize-none" />
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full bg-gold-500 hover:bg-white text-slate-950 hover:text-slate-900 font-bold tracking-[0.2em] text-xs py-4 rounded-none uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50">
                        {isSubmitting ? (
                          <div className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /><span>Processing...</span></div>
                        ) : (
                          <><span>{modalType === "prospectus" ? "Submit File Request" : "Send Inquiry Request"}</span><Send className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 flex flex-col items-center gap-6">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="p-4 bg-gold-500/5 rounded-none border border-gold-500/20 text-gold-500">
                      <CheckCircle className="w-14 h-14" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-serif text-white font-medium leading-tight">Thank You, {submittedUser.name}!</h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4 max-w-sm mx-auto">
                        {modalType === "prospectus" ? `Your prospectus query for ${submittedUser.program} is processed.` : `Your inquiry for ${submittedUser.program} is secured.`}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}