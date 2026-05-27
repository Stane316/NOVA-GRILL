/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Camera, Eye, MapPin, Sparkles } from "lucide-react";
import { useSite } from "../lib/context/SiteContext";
import DynamicMedia from "./media/DynamicMedia";

export default function Gallery() {
  const { gallery } = useSite();

  return (
    <section
      id="gallery"
      className="relative py-12 sm:py-16 bg-[#0B0908] text-luxury-cream overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-embers-glow/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 w-full">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-embers-glow block mb-3 flex items-center gap-1.5 italic">
              <Camera className="w-4 h-4" />
              RÉTINE & SENSATIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
              Fragments de <br />
              <span className="italic font-light text-embers-glow">Mouvements.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-stone-400 text-sm sm:text-base font-light leading-relaxed">
            Un instantané pris au bar central, la fumée s'élevant d'un poulet braisé fumant, la terrasse baignée dans la lumière dorée... Découvrez Nova Grill en images réelles de vie.
          </p>
        </div>

        {/* The Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {gallery.map((item, idx) => {
            // Give specific cards slight offsets to create an Awwwards-style staggered editorial flow on large screens
            const offsetClass = idx === 1 ? "lg:translate-y-6" : idx === 4 ? "lg:-translate-y-4" : idx === 5 ? "lg:translate-y-2" : "";

            return (
              <div
                key={item.id}
                className={`bg-[#161210] border border-white/5 rounded-3xl overflow-hidden relative group shadow-xl hover:border-embers-glow/30 transition-all duration-500 flex flex-col ${offsetClass}`}
              >
                {/* Media frame */}
                <div className={`relative ${item.aspect || "aspect-square"} w-full overflow-hidden bg-black`}>
                  {/* Overlap shade top and bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 opacity-80 z-10 pointer-events-none" />

                  <DynamicMedia
                    url={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 duration-700 transition"
                  />

                  {/* Absolute visual float details actions */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
                    {/* Top tags */}
                    <div className="flex justify-between items-start">
                      <span className="bg-black/85 backdrop-blur-md border border-white/10 text-luxury-cream font-mono text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-md">
                        {item.type === "video" ? "Vidéo Ciné" : "Art Photo"}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-embers-dark/80 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-embers-glow group-hover:border-embers-glow/30 transition-all duration-300">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Bottom slide up label block */}
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="font-mono text-[9px] text-embers-glow uppercase tracking-widest block mb-1">
                        PIECE NO. 0{idx + 1}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white group-hover:text-amber-100 transition-colors">
                        {item.title}
                      </h4>
                    </div>
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
