import React from "react";
import { Mail, Phone, MapPin, ArrowUp, Facebook, Instagram, Compass, Navigation } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Exact coordinates extracted from your custom iframe string to pinpoint the school precisely without a registered name
  const coordinateEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3503.152816660898!2d81.59319432528761!3d28.59519202568519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1779763822934!5m2!1sen!2snp";
  const coordinateNavigationUrl = "https://www.google.com/maps/search/?api=1&query=28.595192,81.593194";

  return (
    <footer
      id="contact"
      className="relative bg-slate-950 border-t border-white/5 pt-24 pb-12 sm:pb-20 px-6 md:px-12"
    >
      {/* Top decorative gradient border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* --- SECTION 1: THREE-COLUMN LINKS AND ADDRESSES --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">

          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Nobel Academy Logo"
                className="w-10 h-10 object-contain rounded-full border border-amber-500/30 p-0.5 bg-white"
              />
              <span className="font-serif text-lg tracking-[0.2em] text-white uppercase font-medium">
                NOBEL <span className="text-amber-500 font-light">Academy</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light max-w-sm">
              A Sanctuary of Higher Learning. Committed to unprecedented secondary science mentoring, modern management curriculums, and ethical leadership development in Nepal.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-sans font-semibold text-amber-500 tracking-[0.25em] uppercase mb-8">

            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-light">
              <li>
                <a href="#" className="hover:text-amber-500 hover:translate-x-1.5 transition-all inline-block">

                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 hover:translate-x-1.5 transition-all inline-block">

                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 hover:translate-x-1.5 transition-all inline-block">

                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 hover:translate-x-1.5 transition-all inline-block">

                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 hover:translate-x-1.5 transition-all inline-block">

                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Integrated Social Grid */}
          <div className="md:col-span-4 flex flex-col items-start">
            <h4 className="text-[10px] font-sans font-semibold text-amber-500 tracking-[0.25em] uppercase mb-8">
              Contact Us Direct
            </h4>

            <div className="space-y-6 text-xs sm:text-sm text-slate-400 font-light w-full">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed text-slate-300">
                  Birendranagar-3, Surkhet,<br />
                  Karnali Province, Nepal
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="tel:+977-083-590828" className="hover:text-amber-500 text-slate-300 transition-colors">
                  +977-083-590828
                </a>
              </div>

              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="mailto:nobelacademyskt@gmail.com" className="hover:text-amber-500 text-slate-300 transition-colors break-all">
                  nobelacademyskt@gmail.com
                </a>
              </div>

              {/* Comprehensive Social Links Matrix */}
              <div className="pt-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
                  Connect With Nobel
                </p>
                <div className="flex flex-wrap gap-2.5">

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/Nobelskt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 hover:border-amber-500/40 text-slate-400 flex items-center justify-center hover:text-amber-400 transition-all bg-slate-900 group"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4 group-hover:scale-105 transition-transform" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 hover:border-amber-500/40 text-slate-400 flex items-center justify-center hover:text-amber-400 transition-all bg-slate-900 group"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4 group-hover:scale-105 transition-transform" />
                  </a>

                  {/* Viber */}
                  <a
                    href="viber://chat?number=%2B977083590828"
                    className="w-10 h-10 border border-white/10 hover:border-amber-500/40 text-slate-400 flex items-center justify-center hover:text-amber-400 transition-all bg-slate-900 group"
                    title="Viber"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:scale-105 transition-transform">
                      <path d="M19.95 2.2c-1.84-.4-4.8-.2-7.22.46-3.8 1.05-6.57 3.52-8.32 7.37-1.12 2.47-1.24 5.3-.23 7.6.14.3.1.58-.12.83l-1.63 1.83c-.45.5-.2.13-.3.8.1.53.4.82.94.75l2.45-.3c.27-.03.5 0 .7.17 2.62 1.63 5.43 1.67 8.23.47 4.02-1.7 6.4-4.72 7.14-8.98.54-3.1.03-6.17-1.94-8.86a4.8 4.8 0 00-1.7-1.57zm-2.4 11.23c-.42.84-1.23 1.25-2.23.95-.58-.17-1.14-.48-1.64-.84a11.5 11.5 0 01-2.9-3.23c-.34-.54-.6-1.14-.72-1.76-.2-.93.22-1.67 1-2.02.32-.14.65-.2.96-.06.28.12.47.38.63.66.3.56.6 1.15.86 1.74.15.34.1.66-.16.94-.23.25-.48.48-.75.7-.13.1-.16.22-.1.37.45.98 1.12 1.8 1.95 2.48.14.1.25.1.37-.03.26-.28.5-.58.78-.85.27-.27.6-.33.93-.17.58.28 1.15.6 1.7.93.3.17.5.4.58.74.1.48-.05 1-.4 1.4z" />
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 hover:border-amber-500/40 text-slate-400 flex items-center justify-center hover:text-amber-400 transition-all bg-slate-900 group"
                    title="TikTok"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:scale-105 transition-transform">
                      <path d="M12.525.02c1.31 0 2.58.33 3.7.94a7.1 7.1 0 01-2.73 4.41c-.04-.84-.04-1.68-.03-2.52v12.28c0 2.37-1.4 4.5-3.6 5.3a5.75 5.75 0 01-6.9-2.22 6.07 6.07 0 01-.13-6.8 5.7 5.7 0 014.88-2.9c.04 1.52.04 1.52-.02 3.03a2.76 2.76 0 00-1.86.86 3.03 3.03 0 00.7 4.7 2.8 2.8 0 003.56-.88c.3-.5.44-1.07.42-1.65V0h1.98z" />
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/10 hover:border-amber-500/40 text-slate-400 flex items-center justify-center hover:text-amber-400 transition-all bg-slate-900 group"
                    title="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:scale-105 transition-transform">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- SECTION 2: GOOGLE MAP LOCATION ROW (COORDINATE ACCURATE) --- */}
        <div className="py-16 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Map Text Meta Info (Left Side) */}
            <div className="lg:col-span-4 flex flex-col items-start pr-4">
              <div className="flex items-center gap-2.5 mb-3">
                <Compass className="w-4 h-4 text-amber-500" />
                <h5 className="text-[10px] font-mono tracking-widest text-amber-500 uppercase">
                  Campus Coordinates
                </h5>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">
                Our Geographic Center
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">
                Explore our exact coordinates interactively or link directly with mobile map services for turn-by-turn navigation straight to our gate.
              </p>

              {/* Dynamic Redirect Navigation Button using Coordinate Query */}
              <a
                href={coordinateNavigationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-bold text-amber-500 hover:text-white uppercase tracking-widest border border-white/10 hover:border-amber-500/40 bg-slate-900 px-4 py-2.5 transition-all"
              >
                <Navigation className="w-3 h-3" />
                <span>Launch Navigation</span>
              </a>
            </div>

            {/* Inverted Dark Map Canvas Frame (Right Side) */}
            <div className="lg:col-span-8 w-full h-[260px] sm:h-[320px] border border-white/5 p-1.5 bg-slate-900/60 relative">
              {/* Gold Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-[1px] bg-amber-500" />
              <div className="absolute top-0 left-0 w-[1px] h-3 bg-amber-500" />
              <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-amber-500" />
              <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-amber-500" />

              {/* Precise Embedded Coordinate-Mapped Inline Map Frame */}
              <iframe
                src={coordinateEmbedUrl}
                className="w-full h-full grayscale opacity-60 contrast-125 invert-[85%] hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nobel Academy Surkhet Google Maps Pinpoint Location"
              />
            </div>

          </div>
        </div>

        {/* --- SECTION 3: COPYRIGHT ROW --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6 text-[10px] sm:text-xs text-slate-500 tracking-wider">
          <p>© 2026 NOBEL Academy Surkhet. Securely cultivated for higher learning.</p>

          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <button
              onClick={handleScrollToTop}
              className="flex items-center gap-1.5 p-2 px-3 border border-white/10 hover:border-amber-500 text-amber-500 hover:text-white transition-all rounded-none bg-slate-900 cursor-pointer text-[10px] tracking-widest uppercase font-bold"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}