/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Instagram, Compass, Flame, Clock } from "lucide-react";
import { IMAGES, NOVA_CONTACT } from "../types";
import { useSite } from "../lib/context/SiteContext";
import DynamicMedia from "./media/DynamicMedia";

export default function Hero() {
  const { settings, heroMedia } = useSite();
  const [beninTime, setBeninTime] = useState("");
  const [status, setStatus] = useState({ isOpen: true, label: "Ouvert jusqu'à 01:00" });

  // Compute Benin current local time (UTC +1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // UTC time + 1 hour (Benin Timezone)
      const benin = new Date(now.getTime() + 1 * 60 * 60 * 1000);
      const hours = String(benin.getUTCHours()).padStart(2, "0");
      const minutes = String(benin.getUTCMinutes()).padStart(2, "0");
      const seconds = String(benin.getUTCSeconds()).padStart(2, "0");
      
      setBeninTime(`${hours}:${minutes}:${seconds}`);

      // Check opening status: 07:00 AM to 01:00 AM next morning.
      const hour = benin.getUTCHours();
      if (hour >= 7 || hour < 1) {
        setStatus({ isOpen: true, label: "OUVERT EN CE MOMENT · TANKPÈ" });
      } else {
        setStatus({ isOpen: false, label: "OUVRE À 07h00 · LUNCH & NIGHT" });
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Visual array of floating sparks
  const sparks = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: i * 0.4,
    duration: 3 + Math.random() * 3,
    left: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 5
  }));

  return (
    <section
      id="hero"
      className="relative min-h-[100vh] flex flex-col justify-end lg:justify-center items-start overflow-hidden bg-embers-dark text-[#f5f2eb] pt-24 pb-12 px-6 sm:px-12 md:px-16 lg:px-24"
    >
      {/* Cinematic Vignette Overlay & Image Layer with Ken Burns Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <DynamicMedia
            url={heroMedia.video_url || heroMedia.poster_url || IMAGES.heroEmbers}
            poster={heroMedia.poster_url || IMAGES.heroEmbers}
            className="w-full h-full object-cover brightness-[0.4] contrast-[1.12]"
          />
        </motion.div>
        {/* Layer gradients for severe artistic density */}
        <div className="absolute inset-0 bg-gradient-to-t from-embers-dark via-embers-dark/30 to-embers-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-embers-dark via-transparent to-embers-dark/20" />
        {/* Glowing warm light bloom from center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-embers-glow/10 filter blur-[120px] rounded-full" />
      </div>

      {/* Interactive Floating Embers Spark Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: ["100%", "-20%"],
              opacity: [0, 0.9, 0],
              x: ["0px", `${20 + Math.random() * 40}px`, "-20px"]
            }}
            transition={{
              repeat: Infinity,
              duration: spark.duration,
              delay: spark.delay,
              ease: "easeOut"
            }}
            className="absolute rounded-full bg-gradient-to-t from-orange-500 to-amber-300 pointer-events-none filter blur-[0.5px]"
            style={{
              left: spark.left,
              width: spark.size,
              height: spark.size,
              bottom: "0px"
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-20 z-0" />

      {/* Hero Master Layout Content */}
      <div className="relative z-20 max-w-5xl w-full flex flex-col gap-6 lg:gap-8 justify-center mt-auto py-10">
        {/* Calavi Live Badge Coordinate */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-zinc-400"
        >
          <span className="flex items-center gap-2 text-embers-glow font-bold">
            <span className="w-1.5 h-1.5 bg-embers-glow rounded-full animate-ping" />
            NOVA GRILL TANKPÈ
          </span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="flex items-center gap-2 text-luxury-cream bg-white/5 px-2.5 py-1 rounded border border-white/10">
            <Clock className="w-3.5 h-3.5 text-embers-glow" />
            LIVE COTONOU : {beninTime || "16:35:00"}
          </span>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <span className="flex items-center gap-2 text-zinc-300">
            <span className={`w-2 h-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-red-500"} animate-pulse`} />
            {status.label}
          </span>
        </motion.div>

        {/* Sophisticated Dark Layout Decorative Elements */}
        <div className="flex items-center space-x-4 opacity-70 mt-4">
          <div className="w-8 h-px bg-embers-glow"></div>
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.5em] text-embers-glow font-display font-medium">L'Art de la Braise</span>
          <div className="w-8 h-px bg-embers-glow"></div>
        </div>

        {/* Cinematic Title Block */}
        <div className="flex flex-col mt-2">
          {settings.hero_title && settings.hero_title !== "Quand les lumières baissent..." ? (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-serif leading-[1.0] tracking-tight text-white select-none text-4xl sm:text-6xl md:text-8xl italic"
            >
              {settings.hero_title}
            </motion.h1>
          ) : (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="font-serif leading-[0.85] tracking-tight italic select-none text-6xl sm:text-8xl md:text-[10rem] text-white"
            >
              Nova <br/>
              <span className="not-italic font-sans font-black text-embers-glow opacity-90 tracking-tighter">
                GRILL
              </span>
            </motion.h1>
          )}
        </div>

        {/* Narrative tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-xl text-stone-300 font-serif text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide italic"
        >
          {settings.hero_subtitle || "Une odyssée sensorielle où le feu rencontre l'élégance. Un restaurant chaleureux sous les étoiles de Calavi, un lounge feutré, et le rendez-vous incontournable des samedis soirs rythmés de Cotonou."}
        </motion.p>

        {/* Interactive Luxury CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
        >
          <a
            href="#reservation"
            className="group inline-flex items-center justify-center gap-3 bg-white text-embers-dark hover:bg-embers-glow hover:text-white transition-all duration-500 font-display text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full shadow-2xl"
          >
            <span>RÉSERVER UNE TABLE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </a>
          
          <a
            href="#specialties"
            className="group inline-flex items-center justify-center gap-2.5 bg-charcoal/30 hover:bg-charcoal/70 border border-[#2d221c] text-zinc-300 hover:text-white transition-all duration-300 font-display text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
          >
            <Compass className="w-4 h-4 text-embers-glow group-hover:rotate-45 transition-transform duration-500" />
            <span>EXPLORER LE CORNER</span>
          </a>
        </motion.div>
      </div>

      {/* Floating Indicators along bottom */}
      <div className="absolute bottom-6 left-6 sm:left-12 right-6 sm:right-12 relative z-20 flex justify-between items-center sm:block hidden pointer-events-none mt-auto">
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-zinc-500">
          <span>TÉL: {NOVA_CONTACT.phone}</span>
          <span className="text-zinc-800">·</span>
          <span>CALAVI TANKPÈ, BÉNIN</span>
        </div>
      </div>
    </section>
  );
}
