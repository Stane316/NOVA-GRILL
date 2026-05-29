/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Flame, Users, Calendar, Sparkles } from "lucide-react";
import { NOVA_CONTACT } from "../types";

export default function Story() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as any }
    }
  };

  return (
    <section
      id="concept"
      className="relative py-12 sm:py-16 bg-[#0B0908] overflow-hidden text-luxury-cream"
    >
      {/* Decorative smoky overlays */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-embers-glow/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-embers-glow/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.08]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        {/* Editorial Title Section */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-embers-glow block mb-3 italic">
            · L'ADN NOVA GRILL ·
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
            Bien plus qu'un <span className="italic font-normal text-embers-glow">simple repas</span>, un rituel.
          </h3>
          <p className="font-sans text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Nova Grill fusionne la haute cuisson brûlante et l'ambiance d'un lounge d'exception à Tankpè, Calavi. Un dialogue sensoriel entre le parfum envoûtant de la braise et l'énergie vibrante des nuits de Cotonou.
          </p>
        </div>

        {/* Cinematic horizontal visual line split */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Asymmetrical Quote Callout */}
        <div className="bg-[#161210] border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-embers-glow/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-2 right-8 text-stone-900 font-serif text-[10rem] select-none leading-none opacity-15 mt-2 pointer-events-none">
            “
          </div>
          <div className="relative z-10 max-w-4xl">
            <span className="font-mono text-[10px] tracking-[0.34em] text-embers-glow uppercase flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-embers-glow" />
              LIFESTYLE CHOC & CRAFT
            </span>
            <blockquote className="font-serif italic text-lg sm:text-xl md:text-2xl font-light text-stone-200 leading-snug">
              "Nous créons une tension sensorielle entre la chaleur intense de l'esprit braisé et la fraîcheur glacée de nos nectars de bar. C'est l'essence même de Nova."
            </blockquote>
          </div>
        </div>

        {/* 3 Pillars layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
        >
          {/* Pillar 1 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-embers-glow/30 to-rose-500/10 border border-embers-glow/30 flex items-center justify-center text-embers-glow group-hover:border-embers-glow group-hover:bg-embers-glow/10 transition-all duration-500 shadow-lg shadow-embers-glow/5">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-2">
              Le Feu Sacré
            </h4>
            <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              Notre charbon de bois sélectionné en circuit court confère à nos poulets braisés, canards et poissons froids un parfum boisé absolument unique au Bénin.
            </p>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:border-amber-400 group-hover:bg-amber-500/10 transition-all duration-500 shadow-lg shadow-amber-500/5">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-2">
              La Scène Sociale
            </h4>
            <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              Une terrasse chaleureuse et un lounge luxueux conçus pour rassembler. Anniversaires étincelants, réunions d'affaires savoureuses ou afterworks décontractés.
            </p>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-red-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:border-rose-400 group-hover:bg-rose-500/10 transition-all duration-500 shadow-lg shadow-rose-500/5">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-2">
              Saturdays DJ sets
            </h4>
            <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
              Tous les samedis soirs d'Abomey-Calavi vibrent au son de notre DJ Live. Une célébration de rythmes Afrobeats, Amapiano, de rires et de gastronomie.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
