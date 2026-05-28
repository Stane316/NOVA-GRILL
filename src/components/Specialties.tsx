/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, ArrowDownRight, Award, Flame, FlameKindling } from "lucide-react";
import { SPECIALTIES } from "../types";
import { useSite } from "../lib/context/SiteContext";
import DynamicMedia from "./media/DynamicMedia";

export default function Specialties() {
  const { getMedia } = useSite();
  return (
    <section
      id="specialties"
      className="relative py-12 sm:py-16 bg-embers-dark text-[#f5f2eb] overflow-hidden"
    >
      {/* Decorative radial gradients to break linear flat panels */}
      <div className="absolute top-1/4 right-[-10vw] w-[50vw] h-[50vh] bg-embers-glow/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10vw] w-[50vw] h-[50vh] bg-amber-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        {/* Header section with high creative asymmetry */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-embers-glow block mb-3 flex items-center gap-2">
              <FlameKindling className="w-4 h-4" />
              SÉLECTION SENSORIELLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              Nos Créations <br />
              <span className="italic font-light text-embers-glow">Signatures.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            Chaque plat et nectar inscrit à notre carte est une œuvre d'art gastronomique brute, façonnée à la main pour le public de Cotonou et Calavi.
          </p>
        </div>

        {/* The Asymmetrical Alternating Layout list */}
        <div className="flex flex-col gap-12 sm:gap-16 relative">
          {SPECIALTIES.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Image container (takes 7 columns on desktop) */}
                <div
                  className={`lg:col-span-7 relative group ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {/* Outer decorative glowing layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-embers-glow/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none z-10" />
                  
                  {/* Picture Wrapper */}
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e0e] aspect-[4/3] relative">
                    {/* Shadow masking */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                    
                    {(() => {
                      const mediaItem = getMedia(`creations_0${idx + 1}`);
                      return (
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full h-full"
                        >
                          <DynamicMedia
                            url={mediaItem?.media_url || item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-all duration-700"
                          />
                        </motion.div>
                      );
                    })()}

                    {/* Creative absolute category floating tag */}
                    <span className="absolute top-6 left-6 z-20 bg-embers-dark/80 backdrop-blur-md border border-white/10 text-embers-glow font-mono text-[9px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full">
                      {item.category}
                    </span>

                    {/* Show price if it exists */}
                    {item.price && (
                      <div className="absolute bottom-6 right-6 z-20 bg-gradient-to-tr from-[#0a0a0a] to-embers-dark border-2 border-embers-glow/80 text-white font-display text-sm font-bold tracking-widest px-4 py-2.5 rounded-xl shadow-2xl">
                        {item.price}
                      </div>
                    )}
                  </div>

                  {/* Asymmetrical caption label */}
                  <div className="invisible lg:visible absolute -bottom-5 right-12 z-20 font-mono text-[9px] text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span>FRAME // 00{idx + 1}</span>
                    <ArrowDownRight className="w-3 h-3 text-embers-glow" />
                  </div>
                </div>

                {/* Narrative Details text content (takes 5 columns on desktop) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? "lg:order-2" : "lg:order-1 lg:pr-8"
                  }`}
                >
                  <div className="flex items-center gap-2 text-embers-glow/70 font-mono text-[9px] tracking-[0.25em] uppercase mb-3">
                    <Award className="w-3.5 h-3.5" />
                    CHEF SELECTION · EST. 2026
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight tracking-tight mb-5 group-hover:text-amber-100 transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-stone-400 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Micro-sensory pill tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tasteNotes.map((note) => (
                      <span
                        key={note}
                        className="bg-[#0a0a0a] border border-white/10 text-stone-300 font-sans text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:border-embers-glow/30 transition-colors duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-embers-glow animate-pulse" />
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Bottom CTA for individual triggers */}
                  <div className="mt-8">
                    <a
                      href="#reservation"
                      className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] text-[#f5f2eb] hover:text-embers-glow uppercase transition-colors"
                    >
                      <span>PLANIFIER CE MOMENT</span>
                      <span className="w-5 h-[1px] bg-[#f5f2eb]" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
