import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onInquireClick: () => void;
}

export default function Navbar({ onInquireClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Notice Board", href: "#notice-board" },
    { name: "Life at Nobel", href: "#gallery" },
    { name: "Student Voices", href: "#testimonials" },
  ];

  return (
    <>
      <motion.header
        id="navbar-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "py-4 px-4 md:px-8"
            : "py-6 px-6 md:px-12"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 rounded-full ${
            isScrolled
              ? "bg-navy-950/75 backdrop-blur-xl border border-gold-300/15 py-3 px-6 shadow-2xl shadow-gold-400/5"
              : "bg-transparent py-2 px-4 border border-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <a href="#" className="flex items-center gap-4 group">
              <img
                src="/logo.png"
                alt="Nobel Academy Logo"
                className="w-10 h-10 object-contain rounded-full border border-gold-500/30 p-0.5 group-hover:scale-105 transition-all duration-500 bg-white"
              />
              <div className="flex flex-col">
                <span className="font-sans font-bold tracking-[0.2em] text-sm uppercase text-white">
                  NOBEL <span className="text-gold-500">Academy</span>
                </span>
                <span className="text-[9px] font-sans text-gold-500/65 uppercase tracking-[0.3em] -mt-0.5">
                  Surkhet
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-xs tracking-widest font-medium uppercase text-navy-100 hover:text-gold-300 transition-colors duration-300 py-1 font-sans group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-gold-300 to-gold-400 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Action buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={onInquireClick}
                className="relative overflow-hidden group cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-gold-400/10 to-gold-600/10 border border-gold-300/30 text-gold-200 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:border-gold-300 transition-all duration-500"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-300 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Inquire Now</span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex items-center md:hidden gap-3">
              <button
                onClick={onInquireClick}
                className="bg-gold-300/10 text-gold-300 p-2 rounded-full border border-gold-300/20"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-navy-100 hover:text-gold-300 focus:outline-none p-2 rounded-lg border border-navy-100/10"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-navy-950/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8"
          >
            <div className="absolute top-24 left-8 text-xs font-serif text-gold-300/50 uppercase tracking-widest">
              A Sanctuary of Higher Learning
            </div>

            <nav className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -25, opacity: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-serif text-navy-50 hover:text-gold-300 transition-colors uppercase tracking-wide"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 flex flex-col gap-6"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onInquireClick();
                }}
                className="w-full justify-center bg-gold-300 text-navy-950 font-semibold tracking-widest text-xs py-4 rounded-full uppercase flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(233,193,118,0.2)]"
              >
                Inquire Now <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] text-navy-100/30 tracking-widest mt-4">
                BIRENDRANAGAR, SURKHET, NEPAL
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
