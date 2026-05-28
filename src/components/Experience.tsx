/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Music, Flame, GlassWater, Landmark } from "lucide-react";
import { IMAGES } from "../types";
import { useSite } from "../lib/context/SiteContext";
import DynamicMedia from "./media/DynamicMedia";

export default function Experience() {
  const [activeMood, setActiveMood] = useState("braise");
  const { getMedia } = useSite();

  const ambiance01 = getMedia("ambiance_01");
  const ambiance02 = getMedia("ambiance_02");
  const ambiance03 = getMedia("ambiance_03");

  const moods = [
    {
      id: "braise",
      tabTitle: "L'Alchimie du Feu",
      motto: "Braises ardentes & Saveurs fumées",
      description: "Le clapotis des huiles épicées sur le gril ardent. Une fumée subtile parfumée qui sublime les chaires dorées sous les yeux de nos chefs. C'est l'âme rustique de Calavi.",
      bgImage: ambiance01?.media_url || IMAGES.heroEmbers,
      icon: Flame,
      color: "from-orange-600/30",
      accent: "text-orange-500"
    },
    {
      id: "cocktail",
      tabTitle: "Tempête de Glace",
      motto: "Mixologie tropicale rafraîchissante",
      description: "Les shakers frappent au rythme du lounge bar. Des cocktails givrés aux fruits frais cueillis du Bénin, glacés à souhait pour tempérer l'ardeur du gril.",
      bgImage: ambiance02?.media_url || IMAGES.loungeBar,
      icon: GlassWater,
      color: "from-cyan-600/30",
      accent: "text-cyan-400"
    },
    {
      id: "night",
      tabTitle: "L'Heure Sauvage",
      motto: "Le spot social favori d'Abomey-Calavi",
      description: "À mesure que la nuit s'installe, les lumières s'adoucissent. Les rires se mêlent aux vibrations acoustiques, créant le plus chaleureux lounge club en plein air du Bénin.",
      bgImage: ambiance03?.media_url || IMAGES.terrasseDJ,
      icon: Music,
      color: "from-amber-600/30",
      accent: "text-amber-500"
    }
  ];

  const currentMood = moods.find((m) => m.id === activeMood) || moods[0];
  const IconComponent = currentMood.icon;

  return (
    <section
      id="experience"
      className="relative py-12 sm:py-16 bg-[#0B0908] flex flex-col justify-center text-luxury-cream overflow-hidden"
    >
      {/* Background image crossfade and atmospheric transition */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMood.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <DynamicMedia
              url={currentMood.bgImage}
              alt={currentMood.tabTitle}
              className="w-full h-full object-cover brightness-[0.22] contrast-[1.12]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient atmospheric shades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908] via-[#0B0908]/70 to-[#0B0908]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0908] via-transparent to-[#0B0908]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10 w-full">
        {/* Dynamic section header */}
        <div className="mb-8 max-w-2xl">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-embers-glow block mb-4 italic">
            · ATMOSPHÈRE IMMERSIVE ·
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Vivre la nuit chez <br />
            <span className="italic font-light text-embers-glow">Nova Grill</span>
          </h2>
          <p className="font-sans text-stone-400 text-sm sm:text-base font-light py-4">
            Le changement de rythme est le secret de notre renommée. Touchez les différents aspects pour ressentir les vagues d'énergie de Nova Grill.
          </p>
        </div>

        {/* Dynamic Deck Controller and Information Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Controls: Left bar of buttons (Toggles) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {moods.map((mood) => {
              const IsSelected = mood.id === activeMood;
              const MoodIcon = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => setActiveMood(mood.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-500 relative flex items-center justify-between overflow-hidden group ${
                    IsSelected
                      ? "bg-[#161210]/95 border-embers-glow/50 shadow-xl shadow-embers-glow/5"
                      : "bg-black/50 border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Sliding warmth background on hover */}
                  {!IsSelected && (
                    <span className="absolute inset-0 bg-white/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  )}

                  <div className="relative z-10 flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                        IsSelected
                          ? "bg-embers-glow/10 border-embers-glow/40 text-embers-glow"
                          : "bg-charcoal/50 border-white/5 text-stone-500"
                      }`}
                    >
                      <MoodIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`font-display text-sm font-bold uppercase tracking-wider transition-colors ${
                          IsSelected ? "text-white" : "text-stone-400 group-hover:text-stone-200"
                        }`}
                      >
                        {mood.tabTitle}
                      </h4>
                      <p className="font-mono text-[9px] tracking-widest uppercase text-stone-500 mt-0.5">
                        {mood.id === "braise" ? "07h00 - 01h00" : mood.id === "cocktail" ? "MIXOLOGY BAR" : "SAMEDI LIVE"}
                      </p>
                    </div>
                  </div>

                  {/* Selected check indicators */}
                  {IsSelected && (
                    <motion.div
                      layoutId="tab-active-pill"
                      className="w-2 h-2 rounded-full bg-embers-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Cinematic Display details panels (Right 8 columns) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMood}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-[#161210]/95 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[360px]"
              >
                {/* Gilded particle highlights inside */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr from-transparent via-embers-glow/5 to-transparent rounded-full filter blur-[20px]" />

                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="p-2 rounded-lg bg-embers-dark/60 text-embers-glow border border-white/10">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                      NOVA MOMENTUM // 0{moods.findIndex((m) => m.id === activeMood) + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight tracking-tight mb-4">
                    {currentMood.motto}
                  </h3>

                  <p className="font-sans text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl mb-8">
                    {currentMood.description}
                  </p>
                </div>

                {/* Sub-details panel at the end of the item cards */}
                <div className="border-t border-white/10 pt-6 mt-auto flex flex-wrap gap-6 justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    <Landmark className="w-4 h-4 text-embers-glow" />
                    <span>LIGNES ÉLECTRIQUES · TANKPÈ</span>
                  </div>

                  <div className="flex items-center gap-2 bg-embers-glow/10 border border-embers-glow/30 px-4 py-2 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-embers-glow" />
                    <span className="font-display font-medium text-xs text-white uppercase tracking-wider">
                      Rester Connecté : 07h - 01h
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
