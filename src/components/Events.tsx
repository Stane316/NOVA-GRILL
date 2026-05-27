/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Music, Calendar, Flame, Disc, Radio, ShieldCheck, Ticket } from "lucide-react";
import { EVENT_SCHEDULE, IMAGES } from "../types";

export default function Events() {
  const highlightedEvent = EVENT_SCHEDULE.find((evt) => evt.highlight);
  const generalEvents = EVENT_SCHEDULE.filter((evt) => !evt.highlight);

  return (
    <section
      id="events"
      className="relative py-12 sm:py-16 bg-[#0B0908] text-luxury-cream overflow-hidden"
    >
      {/* Decorative dark bar lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-red-800/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.06]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10 w-full">
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-embers-glow block mb-4 flex items-center justify-center gap-2 italic">
            <Radio className="w-4 h-4 text-embers-glow animate-pulse" />
            WEEK-END RIGOR & VIBES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
            Soirées & <br className="sm:hidden" />
            <span className="italic font-light text-embers-glow">Événements</span>
          </h2>
          <p className="font-sans text-stone-400 text-sm sm:text-base font-light mt-4">
            Du coucher de soleil calme de la semaine aux tempêtes sonores du samedi soir. L'excellence de la fête à Abomey-Calavi.
          </p>
        </div>

        {/* Dynamic split box between Highlights and Agenda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Main Visual Saturday DJ Live Spotlight (7 Columns) */}
          <div className="lg:col-span-7 flex">
            <div className="bg-[#161210] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between w-full relative overflow-hidden shadow-2xl group">
              {/* Gold borders active glowing outline */}
              <div className="absolute inset-0 border border-white/5 group-hover:border-embers-glow/30 transition-colors duration-500 rounded-3xl pointer-events-none" />

              <div>
                {/* Spotlight Floating Header */}
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-red-500/15 border border-red-500/35 text-red-500 font-mono text-[9px] tracking-[0.2em] uppercase px-3.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    CHEF-D'ŒUVRE DE LA SEMAINE
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                    SAMEDI // 20H
                  </span>
                </div>

                {/* Event Photo with overlay */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6 group">
                  <img
                    src={IMAGES.terrasseDJ}
                    alt="Saturday DJ Live at Nova Grill"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Floating active DJ badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <Disc className="w-4 h-4 text-embers-glow animate-spin" />
                    <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                      DJ SET LIVE ON TERRACE
                    </span>
                  </div>
                </div>

                {/* Highlight Info text */}
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                  {highlightedEvent?.title}
                </h3>
                
                <p className="font-sans text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                  {highlightedEvent?.vibes}. Notre maître de cérémonie et DJ résident distillera les meilleures ondes musicales au Bénin. Tables grillades, cocktails démesurés et champagne de minuit pour célébrer la vie.
                </p>
              </div>

              {/* Saturday Features badges */}
              <div className="border-t border-white/10 pt-6 mt-4 flex flex-wrap gap-4 justify-between items-center">
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Sécurité confirmée & Parking sécurisé</span>
                </div>

                <a
                  href="#reservation"
                  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-embers-glow hover:bg-embers-glow hover:text-white transition-all duration-300 font-display text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-xl"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Table Recommandée</span>
                </a>
              </div>
            </div>
          </div>

          {/* Regular Schedule list (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6 h-full">
              {generalEvents.map((schedule, idx) => (
                <div
                  key={schedule.day}
                  className="bg-[#161210] border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-1/2 relative group hover:border-[#2d221c] transition-all duration-500"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-embers-glow uppercase">
                        {schedule.day}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                        {schedule.time}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-2 leading-tight group-hover:text-amber-100 transition-colors">
                      {schedule.title}
                    </h4>

                    <p className="font-sans text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
                      {schedule.vibes}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-4">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block font-bold">
                      ENTRÉE LIBRE · SÉLECTION À LA CARTE
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* General privatization advertisement box */}
            <div className="bg-[#161210] border border-white/10 rounded-3xl p-6">
              <span className="font-mono text-[9px] text-embers-glow uppercase tracking-widest block mb-1 font-bold">
                PRIVATISATIONS & ANNIVERSAIRES
              </span>
              <p className="font-sans text-stone-300 text-xs font-light leading-relaxed">
                Un anniversaire étincelant à fêter ? Une réunion professionnelle savoureuse ? Nous aménageons notre terrasse ou notre lounge sur-mesure pour vous. Contactez-nous pour un devis.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
