import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, AlertCircle, Info, PhoneCall, Loader2 } from "lucide-react";
import { supabase } from "./lib/supabaseClient";

// Component imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutPreview from "./components/AboutPreview";
import WhyChooseUs from "./components/WhyChooseUs";
import Programs from "./components/programs";
import NoticeBoard from "./components/NoticeBoard";
import GalleryPreview from "./components/GalleryPreview";
import Testimonials from "./components/Testimonials";
import AdminLayout from './admin/AdminLayout';
import AdmissionsCTA from "./components/AdmissionsCTA";
import AdminLoginModal from "./components/AdminLoginModal";
import Footer from "./components/Footer";

export default function App() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  // 1. ADDED STATE TRACKER: Detects whether the user is requesting a prospectus or general admission
  const [modalType, setModalType] = useState<"apply" | "prospectus">("apply");

  // FIX: Read from localStorage on initial render to keep the admin layout open on page refresh
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nobel_admin_authenticated') === 'true';
  });

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Form submission state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "+2 Science",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notice ticker state
  const [isTickerOpen, setIsTickerOpen] = useState(true);

  // Keep track of submission data separately so it doesn't vanish mid-animation
  const [submittedUser, setSubmittedUser] = useState({ name: "", program: "", phone: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Field validation
    if (!formData.name.trim()) {
      setFormError("Full Name is required.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setFormError("A valid Contact Number is required.");
      return;
    }
    if (!formData.email.includes("@")) {
      setFormError("Please enter a valid academic or personal email.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. DYNAMIC TABLE ROUTING BLOCK
      // Routes data to either 'prospectus' or 'applications' depending on what button triggered the click
      const targetTable = modalType === "prospectus" ? "prospectus" : "applications";

      const { error } = await supabase
        .from(targetTable)
        .insert([
          {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
            class_applying_for: formData.program || "+2 Science",
            message: formData.message,
            status: "Pending"
          }
        ]);

      if (error) throw error;

      setSubmittedUser({
        name: formData.name,
        program: formData.program || "+2 Science",
        phone: formData.phone
      });
      setFormSubmitted(true);

      setTimeout(() => {
        setFormSubmitted(false);
        setIsInquiryModalOpen(false);
        setFormData({
          name: "",
          phone: "",
          email: "",
          program: "+2 Science",
          message: ""
        });
      }, 3500);

    } catch (err: any) {
      setFormError(err.message || "Failed to submit request setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isAdminAuthenticated ? (
        /* 1. CLEAN ADMIN SWITCH: 
           If authenticated, ONLY render the AdminLayout dashboard panel.
        */
        <AdminLayout
          onLogout={() => {
            // FIX: Wipe both authentication keys and view states when logging out
            setIsAdminAuthenticated(false);
            localStorage.removeItem('nobel_admin_authenticated');
            localStorage.removeItem('nobel_admin_current_view');
          }}
        />
      ) : (
        /* 2. PUBLIC STUDENT SITE WORKSPACE: 
           Renders normally when not logged into the admin configuration dashboard.
        */
        <>
          <AnimatePresence>
            {isTickerOpen && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-slate-950 border-b border-gold-500/10 text-gold-500 text-center py-2.5 px-4 text-[11px] h-auto flex items-center justify-center gap-3 relative z-50 font-sans tracking-widest uppercase font-semibold"
              >
                <Info className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>Admissions Open for Year 2026/2027. Early entrance scholarship exam slot booking runs till June 10.</span>
                <button
                  onClick={() => setIsTickerOpen(false)}
                  className="p-1 hover:bg-white/5 border border-white/10 rounded-none text-gold-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating mobile phone action button for Admissions Inquiry */}
          <div className="fixed bottom-6 right-6 z-30 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setModalType("apply");
                setIsInquiryModalOpen(true);
              }}
              className="w-14 h-14 rounded-none bg-gold-500 text-slate-950 flex items-center justify-center border border-gold-500/30 shadow-2xl cursor-pointer"
            >
              <PhoneCall className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Navigation Capsule Bar */}
          <Navbar onInquireClick={() => {
            setModalType("apply");
            setIsInquiryModalOpen(true);
          }} />

          <main>
            {/* Hero Section */}
            <Hero
              onLearnMoreClick={() => {
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              onTourClick={() => {
                const el = document.getElementById("gallery");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* About Preview Section */}
            <section className="relative">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
              <AboutPreview />
            </section>

            {/* Why Choose Us Accents */}
            <WhyChooseUs />

            {/* Dynamic Expandable Study Programs Section */}
            <Programs />

            {/* Active Notice Board & News */}
            <NoticeBoard />

            {/* Gallery Preview with Lightbox */}
            <GalleryPreview />

            {/* Testimonials and Student Chronicles */}
            <Testimonials />

            {/* 3. ADMISSIONS CTA PORTAL ACCENTS LINK */}
            <AdmissionsCTA
              onApplyClick={() => {
                setModalType("apply");
                setIsInquiryModalOpen(true);
              }}
              onProspectusClick={() => {
                setModalType("prospectus"); // Sets table destination mapping target properties
                setIsInquiryModalOpen(true);
              }}
            />
          </main>

          {/* Contact Footer Layout wrapper containing the hidden login trigger link */}
          <div className="relative">
            <Footer />

            {/* Discrete Admin Link Element at the absolute bottom */}
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

      {/* Login Portal Container Modal */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={() => {
          localStorage.setItem('nobel_admin_authenticated', 'true');
          setIsAdminAuthenticated(true);
          setShowAdminLogin(false);
        }}
      />

      {/* Admissions Inquiry Modal Portal */}
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

                  {/* 4. DYNAMICAL TEXT UPDATER SWITCH CODES */}
                  <h3 className="text-2xl font-serif text-white font-medium leading-tight mt-3">
                    {modalType === "prospectus" ? "Request Prospectus File" : "Admissions Inquiry"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2 mb-6 font-light">
                    {modalType === "prospectus"
                      ? "Complete your delivery coordinates below. Our registrar channel dispatch team will route your official files within 24 hours."
                      : "Complete the brief details below. Our academic desk registrar will get back to you within 24 hours."}
                  </p>

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-none bg-red-500/5 border border-red-500/20 flex items-center gap-3 text-xs text-red-400 leading-relaxed font-light"
                    >
                      <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                      <span>{formError}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Samir Thapa"
                        className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                          Personal Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="samir@example.com"
                          className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 9848XXXXXX"
                          className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                        Program Stream / Level
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all"
                        style={{ backgroundColor: "#020617" }}
                      >
                        <option value="">Select a Grade / Stream</option>
                        <option value="Nursery">Nursery</option>
                        <option value="L.K.G">L.K.G</option>
                        <option value="U.K.G">U.K.G</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="+2 Science">+2 Science (NEB)</option>
                        <option value="+2 Management">+2 Management (NEB)</option>
                        <option value="+2 Hotel Management">+2 Hotel Management (NEB)</option>
                        <option value="+2 Computer Science">+2 Computer Science (NEB)</option>
                        <option value="Scholarship seat">Talent Merit Scholarship Scheme</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase mb-1.5">
                        Inquiry / Message
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Ask about boarding facilities, scholarship deadlines, or course streams..."
                        className="w-full bg-slate-950 border border-white/10 focus:border-gold-500/50 rounded-none px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-700 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold-500 hover:bg-white text-slate-950 hover:text-slate-900 font-bold tracking-[0.2em] text-xs py-4 rounded-none uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <Loader2 size={14} className="animate-spin" />
                          <span>Streaming to database...</span>
                        </div>
                      ) : (
                        <>
                          <span>{modalType === "prospectus" ? "Submit File Request" : "Send Inquiry Request"}</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-4 bg-gold-500/5 rounded-none border border-gold-500/20 text-gold-500"
                  >
                    <CheckCircle className="w-14 h-14" />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-serif text-white font-medium leading-tight">
                      Thank You, {submittedUser.name}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4 max-w-sm mx-auto">
                      {modalType === "prospectus"
                        ? `Your official prospectus documentation query for ${submittedUser.program} has been processed. Check your contact entry coordinates shortly.`
                        : `Your interest stream inquiry for ${submittedUser.program} has been secured in our records. Our staff will coordinate to review your lead details shortly.`}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}