/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Flame } from "lucide-react";

interface PoeticSeparatorProps {
  quote: string;
  subtext?: string;
  chapterNumber?: string;
}

export default function PoeticSeparator({ quote, subtext, chapterNumber }: PoeticSeparatorProps) {
  return (
    <section className="relative py-12 sm:py-16 px-6 sm:px-12 md:px-16 lg:px-24 bg-gradient-to-b from-[#0B0908] to-[#0B0908] min-h-[25vh] sm:min-h-[30vh] flex flex-col items-center justify-center overflow-hidden border-y border-white/5">
      {/* Background cinematic grid lighting lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,94,40,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-embers-glow/20 to-transparent top-0" />
      <div className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-embers-glow/20 to-transparent bottom-0" />

      {/* Narrative block content */}
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-4">
        {chapterNumber && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-stone-500 font-bold">
              interlude ·
            </span>
            <span className="p-1 rounded bg-embers-glow/10 border border-embers-glow/30 text-embers-glow font-mono text-[9px] font-bold">
              {chapterNumber}
            </span>
          </motion.div>
        )}

        {/* Poetic serif display quote */}
        <motion.p
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-serif italic text-lg sm:text-2xl md:text-3xl text-stone-400 font-light max-w-2xl leading-relaxed text-center"
        >
          "{quote}"
        </motion.p>

        {subtext && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-embers-gold mt-2 flex items-center gap-1.5"
          >
            <Flame className="w-3 h-3 text-embers-glow" />
            <span>{subtext}</span>
          </motion.div>
        )}
      </div>

      {/* Decorative floating embers accents matching the poetry */}
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-embers-glow opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-amber-500 opacity-25 animate-pulse delay-700 pointer-events-none" />
    </section>
  );
}
