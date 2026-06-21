import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onInquireClick: () => void;
}

export default function Navbar({ onInquireClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero"); // Tracks active section sectionId
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", to: "/", sectionId: "hero" },
    { name: "About", to: "/about", sectionId: "about" },
    { name: "Programs", to: "/programs", sectionId: "programs" },
    { name: "Life at Nobel", to: "/gallery", sectionId: "gallery" },
    { name: "Student Voice", to: "/testimonials", sectionId: "testimonials" },
    { name: "Contact", to: "/contact", sectionId: "contact" },
  ];

  // 1. Monitor scrolling window height to change navbar background visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer: Updates underline and URL automatically as you scroll down the page
  useEffect(() => {
    // If we are currently browsing on a standalone sub-route, sync active highlight with url path
    if (location.pathname !== "/") {
      const currentItem = navItems.find(item => item.to === location.pathname);
      if (currentItem) setActiveSection(currentItem.sectionId || "");
      return;
    }

    const targetIds = ["hero", "about", "programs", "gallery", "testimonials", "contact"];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // If a section occupies the viewport viewport focal sweetspot, activate it
        if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.4) {
          setActiveSection(entry.target.id);

          // Match section back to its navItem route destination path mapping
          const matchedItem = navItems.find(item => item.sectionId === entry.target.id);
          if (matchedItem && location.pathname === "/") {
            // Silently updates the window path in the address bar without creating infinite history pop reloads
            window.history.replaceState(null, "", matchedItem.to);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Strict viewing area framework wrapper targeting page center
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Elite cross-route navigation handler with explicit path history synchronization
  const handleNavigation = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.to === "/") {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("hero");
        navigate("/", { replace: true });
      }
      setIsMobileMenuOpen(false);
    } else if (location.pathname === "/" && item.sectionId) {
      e.preventDefault();
      const targetElement = document.getElementById(item.sectionId);
      if (targetElement) {
        // Perform smooth scroll transition to targeted DOM node element position
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(item.sectionId);

        // Pushes the descriptive page route name into the browser address bar dynamically
        navigate(item.to, { replace: true });
      }
      setIsMobileMenuOpen(false);
    } else {
      // Traditional routing path if clicked from a isolated outside nested webpage module
      setIsMobileMenuOpen(false);
    }
  };

  const isItemActive = (item: typeof navItems[0]) => {
    if (location.pathname === "/") {
      if (item.sectionId === "hero" && activeSection === "hero") return true;
      return activeSection === item.sectionId;
    }
    return location.pathname === item.to;
  };

  return (
    <>
      <motion.header
        id="navbar-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "py-4 px-4 md:px-8" : "py-6 px-6 md:px-12"
          }`}
      >
        <div
          className={`mx-auto max-w-7xl transition-all duration-500 rounded-full ${isScrolled
              ? "bg-navy-950/75 backdrop-blur-xl border border-gold-300/15 py-3 px-6 shadow-2xl shadow-gold-400/5"
              : "bg-transparent py-2 px-4 border border-transparent"
            }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <Link to="/" onClick={(e) => handleNavigation(e, navItems[0])} className="flex items-center gap-4 group">
              <img
                src="/logo.png"
                alt="Nobel Academy Logo"
                className="w-10 h-10 object-contain rounded-full border border-gold-500/30 p-0.5 group-hover:scale-105 transition-all duration-500 bg-white"
              />
              <div className="flex flex-col">
                <span className="font-sans font-bold tracking-[0.2em] text-sm uppercase text-white">
                  NOBEL <span className="text-gold-500">Academy Surkhet</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    onClick={(e) => handleNavigation(e, item)}
                    className={`relative text-xs tracking-widest font-medium uppercase transition-colors duration-300 py-1 font-sans ${active ? "text-gold-400" : "text-navy-100 hover:text-gold-300"
                      }`}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold-300 to-gold-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
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
              {navItems.map((item, i) => {
                const active = isItemActive(item);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -25, opacity: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to={item.to}
                      onClick={(e) => handleNavigation(e, item)}
                      className={`text-3xl font-serif uppercase tracking-wide block transition-colors ${active ? "text-gold-400" : "text-navy-50 hover:text-gold-300"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
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