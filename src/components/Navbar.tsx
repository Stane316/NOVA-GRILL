/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Menu, X, Phone, Volume2, VolumeX, MapPin, Sparkles } from "lucide-react";
import { NOVA_CONTACT } from "../types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Audio state refs using Web Audio API to synthesize relaxing fire crackles & warm lounge chord synth
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio API Synthesizer for warm embers crackle and a gentle low lounge pad
  const startSynthesizer = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5); // Warm fade-in
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Warm low-frequency pad synthesizer to give a soothing cozy atmosphere
      const oscillator1 = ctx.createOscillator();
      const oscillator2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      
      oscillator1.type = "sine";
      oscillator1.frequency.setValueAtTime(95, ctx.currentTime); // Deep warm baseline
      
      oscillator2.type = "triangle";
      oscillator2.frequency.setValueAtTime(143, ctx.currentTime); // Warm chord offset (perfect fifth)

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, ctx.currentTime);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.04, ctx.currentTime);

      oscillator1.connect(filter);
      oscillator2.connect(filter);
      filter.connect(padGain);
      padGain.connect(masterGain);

      oscillator1.start();
      oscillator2.start();

      // Store oscillator node references to stop them later
      (oscillator1 as any)._isActive = true;
      (oscillator2 as any)._isActive = true;

      // 2. Ember Sparks Synthesizer (emulated using filtered noise burst impulses)
      const bufferSize = ctx.sampleRate * 0.1; // short bursts
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const playEmberSpark = () => {
        if (!gainNodeRef.current || ctx.state === "suspended") return;

        const noiseNode = ctx.createBufferSource();
        noiseNode.buffer = noiseBuffer;

        const sparkFilter = ctx.createBiquadFilter();
        sparkFilter.type = "bandpass";
        // Slightly random wood crackle frequencies
        sparkFilter.frequency.setValueAtTime(400 + Math.random() * 1500, ctx.currentTime);
        sparkFilter.Q.setValueAtTime(4.0, ctx.currentTime);

        const sparkGain = ctx.createGain();
        // High variations of intensity and amplitude
        const intensity = 0.05 + Math.random() * 0.15;
        sparkGain.gain.setValueAtTime(0.0, ctx.currentTime);
        sparkGain.gain.linearRampToValueAtTime(intensity, ctx.currentTime + 0.002);
        sparkGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04 + Math.random() * 0.06);

        noiseNode.connect(sparkFilter);
        sparkFilter.connect(sparkGain);
        sparkGain.connect(masterGain);

        noiseNode.start();
      };

      // Interval trigger for random embers crackling popping sounds
      const intervalId = window.setInterval(() => {
        if (Math.random() > 0.3) {
          playEmberSpark();
          // Occasionally play an additional rapid double peak
          if (Math.random() > 0.7) {
            setTimeout(playEmberSpark, 50 + Math.random() * 150);
          }
        }
      }, 250);

      synthIntervalRef.current = intervalId;

      // Keep references to stop oscillators on mute
      (audioContextRef.current as any).oscillators = [oscillator1, oscillator2];
    } catch (e) {
      console.warn("Audio Context is not supported or was blocked by policy.", e);
    }
  };

  const stopSynthesizer = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const gNode = gainNodeRef.current;
      const ctx = audioContextRef.current;
      gNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.3); // Smooth fade-out before disconnect
      
      setTimeout(() => {
        if (synthIntervalRef.current) {
          clearInterval(synthIntervalRef.current);
          synthIntervalRef.current = null;
        }
        
        const activeOscs = (audioContextRef.current as any).oscillators || [];
        activeOscs.forEach((osc: any) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        
        ctx.suspend();
      }, 350);
    }
  };

  const toggleSound = () => {
    if (isMuted) {
      startSynthesizer();
      setIsMuted(false);
    } else {
      stopSynthesizer();
      setIsMuted(true);
    }
  };

  // Safe release of audio on unmount
  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    };
  }, []);

  return (
    <motion.header
      id="main-nav-bar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0908]/95 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/50 group-hover:border-embers-glow/90 transition-all duration-500 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Flame className="w-5 h-5 text-embers-glow group-hover:text-amber-400 transition-colors" />
            </motion.div>
            <span className="absolute inset-0 bg-embers-glow/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </div>
          <div>
            <h1 className="font-display font-bold tracking-[0.25em] text-lg uppercase text-white group-hover:text-amber-100 transition-colors font-sans">
              NOVA <span className="text-embers-glow">GRILL</span>
            </h1>
            <p className="font-mono text-[9px] text-zinc-500 tracking-[0.15em] hidden sm:block">
              LIFESTYLE · BENIN
            </p>
          </div>
        </a>

        {/* Flat navigation - studio style spacing */}
        <nav id="desktop-narbar-links" className="hidden md:flex items-center gap-8 lg:gap-10">
          {[
            { name: "La Braise", url: "#concept" },
            { name: "Créations", url: "#specialties" },
            { name: "Atmosphère", url: "#experience" },
            { name: "DJ Nights", url: "#events" },
            { name: "La Galerie", url: "#gallery" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-white/80 font-display text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:text-embers-glow relative before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[1px] before:bg-embers-glow before:transition-all hover:before:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Quick controls: ambient controller + CTA */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Spatial audio trigger */}
          <button
            onClick={toggleSound}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${
              !isMuted
                ? "bg-embers-glow/20 border-embers-glow/80 text-embers-glow animate-pulse"
                : "bg-black/40 border-white/10 text-white/50 hover:text-white hover:border-zinc-550"
            }`}
            title={isMuted ? "Activer l'ambiance sonore de la braise" : "Couper l'ambiance sonore"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <div className="relative">
                <Volume2 className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#e11d48] rounded-full animate-ping" />
              </div>
            )}
          </button>

          {/* Table reservation trigger CTA */}
          <a
            href="#reservation"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-embers-glow to-amber-600 hover:from-amber-500 hover:to-embers-glow text-white font-display text-xs font-semibold uppercase tracking-[0.15em] px-5 py-2.5 rounded-full shadow-lg shadow-embers-glow/15 hover:shadow-embers-glow/35 transition-all duration-500 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Réserver</span>
          </a>

          {/* Map pin info, click to scroll to map */}
          <a
            href="#footer-section"
            className="w-9 h-9 sm:flex hidden rounded-full bg-black/40 border border-white/10 items-center justify-center text-white/60 hover:text-white hover:border-zinc-550 transition-all duration-300"
            title="Notre adresse à Calavi"
          >
            <MapPin className="w-4 h-4" />
          </a>

          {/* Toggle for mobile navigations Drawer */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-[#161210] border-b border-white/10 overflow-hidden absolute top-full left-0 w-full shadow-2xl z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {[
                { name: "La Braise Concept", url: "#concept" },
                { name: "Créations Gourmandes", url: "#specialties" },
                { name: "Atmosphère & Expérience", url: "#experience" },
                { name: "Saturday DJ Nights", url: "#events" },
                { name: "Galerie & Lifestyle", url: "#gallery" },
              ].map((item, idx) => (
                <motion.a
                  key={item.name}
                  initial={{ x: -25, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  href={item.url}
                  onClick={() => setIsOpen(false)}
                  className="font-display font-medium text-lg uppercase tracking-widest text-zinc-300 hover:text-embers-glow transition-colors py-1"
                >
                  {item.name}
                </motion.a>
              ))}

              <div className="border-t border-white/5 pt-6 mt-2 flex flex-col gap-4">
                <p className="font-mono text-xs text-zinc-500 tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {NOVA_CONTACT.hours}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#reservation"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center bg-embers-glow text-white font-display text-xs font-bold uppercase tracking-widest py-3 rounded-md hover:bg-orange-500 transition-colors"
                  >
                    RÉSERVER MAINTENANT
                  </a>
                  <a
                    href={`tel:${NOVA_CONTACT.phone.replace(/\s+/g, '')}`}
                    className="w-12 h-12 rounded-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
