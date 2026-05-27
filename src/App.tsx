/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ArrowUp, Sparkles, Navigation } from "lucide-react";

// Modular Imports
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Specialties from "./components/Specialties";
import Experience from "./components/Experience";
import Events from "./components/Events";
import TikTokBuzz from "./components/TikTokBuzz";
import Gallery from "./components/Gallery";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";
import ToastContainer from "./components/Toast";
import PoeticSeparator from "./components/PoeticSeparator";
import CinematicIntro from "./components/CinematicIntro";
import { NOVA_CONTACT } from "./types";

// Admin & State context imports
import { SiteProvider, useSite } from "./lib/context/SiteContext";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { trackGAEvent } from "./lib/analytics";

function MainAppContents() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  
  // Realtime router states
  const [currentRoute, setCurrentRoute] = useState<"home" | "login" | "admin">("home");
  const [session, setSession] = useState<any>(() => {
    try {
      const stored = sessionStorage.getItem("nova_admin_session");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // Handle URL path and hash adjustments
  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === "/admin" || hash === "#/admin" || hash === "#admin") {
        setCurrentRoute("admin");
      } else if (path === "/login" || hash === "#/login" || hash === "#login") {
        setCurrentRoute("login");
      } else {
        setCurrentRoute("home");
      }
    };

    handleNavigation();
    window.addEventListener("hashchange", handleNavigation);
    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("hashchange", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  // Secure route guards: Non-logged users cannot inspect dashboard
  useEffect(() => {
    if (currentRoute === "admin" && !session) {
      window.location.hash = "#/login";
      setCurrentRoute("login");
    }
  }, [currentRoute, session]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleLoginSuccess = (newSession: any) => {
    setSession(newSession);
    try {
      sessionStorage.setItem("nova_admin_session", JSON.stringify(newSession));
    } catch (e) {}
    window.location.hash = "#/admin";
    setCurrentRoute("admin");
  };

  const handleLogout = () => {
    setSession(null);
    try {
      sessionStorage.removeItem("nova_admin_session");
    } catch (e) {}
    window.location.hash = "#/login";
    setCurrentRoute("login");
  };

  const whatsappLink = `https://wa.me/2290196135287?text=Bonjour%20Nova%20Grill,%20je%20souhaite%20réserver%20une%20table%20pour%20ce%20soir.`;

  // Render Login Panel
  if (currentRoute === "login") {
    return (
      <AnimatePresence mode="wait">
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess} 
          onBackToSite={() => {
            window.location.hash = "#/";
            setCurrentRoute("home");
          }} 
        />
      </AnimatePresence>
    );
  }

  // Render Admin controls console
  if (currentRoute === "admin") {
    return (
      <AnimatePresence mode="wait">
        <AdminDashboard onLogout={handleLogout} />
      </AnimatePresence>
    );
  }

  // Render Immersive Public site
  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <CinematicIntro key="intro" onComplete={handleIntroComplete} />
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen bg-embers-dark text-luxury-cream antialiased selection:bg-embers-glow selection:text-black"
        >
          {/* Dynamic Toast Notifications */}
          <ToastContainer />

          {/* Real-time Procedural Fractal Noise SVG Overlay - Sophisticated Dark Trademark */}
          <svg className="fixed inset-0 w-full h-full opacity-[0.035] pointer-events-none z-50">
            <filter id="sophisticated-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#sophisticated-noise)" />
          </svg>

          {/* Elegant Architectural Vertical Framing Lines */}
          <div className="fixed left-6 lg:left-12 top-0 bottom-0 w-px bg-white/5 pointer-events-none z-30 hidden sm:block" />
          <div className="fixed right-6 lg:right-12 top-0 bottom-0 w-px bg-white/5 pointer-events-none z-30 hidden sm:block" />

          {/* Global Navbar */}
          <Navbar />

          {/* Main Single Page Narrative Flow */}
          <main className="relative">
            <Hero />
            
            <PoeticSeparator 
              quote="La braise ardente s’éveille au chant du bois sec de Calavi."
              subtext="L'ALCHIMIE DU FEU SACRÉ"
              chapterNumber="CH. I"
            />
            
            <Story />
            
            <PoeticSeparator 
              quote="Tout commence à 500°C. Saisir l’instant, sceller les jus caramélisés."
              subtext="LE SOUCI DE LA PRÉCISION"
              chapterNumber="CH. II"
            />
            
            <Specialties />
            
            <Experience />
            
            <Events />
            
            <TikTokBuzz />
            
            <Gallery />
            
            <PoeticSeparator 
              quote="Prenez place autour du dôme ardent. Les grills sont déjà lancés sous les étoiles."
              subtext="LE RETOUR DU RITUEL"
              chapterNumber="CH. III"
            />
            
            <Reservation />
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Sticky floating responsive action deck */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            {/* Floating WhatsApp Hotline Link */}
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackGAEvent("click_whatsapp_floating", "Conversion", "WhatsApp Hotline Connected")}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
              className="h-12 w-12 sm:w-auto sm:px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-2xl shadow-emerald-600/20 hover:shadow-emerald-600/45 transition-all duration-300"
              title="Nous contacter sur WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span className="text-[10px] font-display font-bold uppercase tracking-widest hidden sm:inline">
                WhatsApp Live
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </motion.a>

            {/* Back to top scroll button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  onClick={scrollToTop}
                  className="h-12 w-12 rounded-full bg-charcoal hover:bg-embers-glow text-white/70 hover:text-white flex items-center justify-center border border-stone-850 hover:border-embers-glow transition-all duration-300 shadow-2xl"
                  title="Retourner au sommet"
                >
                  <ArrowUp className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <MainAppContents />
    </SiteProvider>
  );
}
