/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Phone, MapPin, Clock, Instagram, Send, ExternalLink, Sparkles, Navigation } from "lucide-react";
import { NOVA_CONTACT } from "../types";
import { useSite } from "../lib/context/SiteContext";

export default function Footer() {
  const { settings } = useSite();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer-section"
      className="bg-[#0B0908] border-t border-white/10 text-luxury-cream pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16">
          
          {/* Brand Manifesto block (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-display font-black text-2xl tracking-[0.25em] text-white">
              NOVA <span className="text-embers-glow">GRILL</span>
            </h3>
            <p className="font-sans text-stone-400 text-sm font-light leading-relaxed max-w-sm">
              L'essence de la braise, de la mixologie et de l'ambiance nocturne au Bénin. Notre mission est de vous faire vibrer à chaque bouchée, chaque cocktail, chaque samedi soir.
            </p>

            <div className="flex gap-4 mt-2">
              <a
                href={settings.tiktok_url || "https://www.tiktok.com/@restaurant.nova.grill"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-stone-400 hover:text-rose-500 hover:border-rose-500/30 transition-all duration-300"
                title="Suivez-nous sur TikTok"
              >
                <span className="font-bold text-xs">TikTok</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-stone-400 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-300"
                title="Suivez-nous sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links & Hours (4 Columns) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] tracking-widest text-[#f5f2eb] uppercase">
                CRÉATIONS
              </h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { name: "La Braise", url: "#concept" },
                  { name: "Signatures", url: "#specialties" },
                  { name: "Atmosphère", url: "#experience" },
                  { name: "DJ Weekly", url: "#events" },
                  { name: "La Galerie", url: "#gallery" }
                ].map((lnk) => (
                  <a
                    key={lnk.name}
                    href={lnk.url}
                    className="text-stone-400 hover:text-embers-glow text-xs font-light tracking-wide transition-colors"
                  >
                    {lnk.name}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-mono text-[10px] tracking-widest text-[#f5f2eb] uppercase">
                HORAIRES ONDA
              </h4>
              <div className="flex flex-col gap-3 font-sans text-stone-400 text-xs font-light">
                <span className="text-stone-300 font-bold block">Chronomètre de Service</span>
                <span>{settings.opening_hours || "07:00 — 01:00 du matin"}</span>
                <span className="text-stone-300 font-bold block pt-2">Saturdays DJ sets</span>
                <span>Dès 20h00 jusqu'au bout</span>
              </div>
            </div>
          </div>

          {/* Styled Geolocation Interactive block (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] tracking-widest text-[#f5f2eb] uppercase">
              RECONNAISSANCE GÉOGRAPHIQUE
            </h4>
            
            {/* Dark Styled Map panel Graphic mockup */}
            <div className="bg-[#161210] border border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-xl relative overflow-hidden">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-lg bg-black border border-white/5 text-embers-glow mt-1 font-bold">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <h5 className="font-display font-bold text-xs uppercase text-white tracking-wide">
                    NOVA GRILL TANKPÈ
                  </h5>
                  <p className="font-sans text-stone-400 text-xs font-light mt-1 select-all">
                    {settings.address || "Carrefour Tankpè, Abomey-Calavi, Bénin"}
                  </p>
                </div>
              </div>

              {/* Fake aesthetic vector coordinates map design lines */}
              <div className="h-16 w-full bg-black rounded-xl relative overflow-hidden border border-white/5 border-dashed">
                <div className="absolute inset-x-4 inset-y-6 border-b border-white/5"></div>
                <div className="absolute inset-y-2 inset-x-12 border-l border-white/5"></div>
                {/* Glowing red map pin pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inline-flex h-4 w-4 rounded-full bg-embers-glow animate-ping opacity-45"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-embers-glow border border-white"></span>
                </div>
                <span className="absolute bottom-2 right-2 text-[8px] font-mono text-stone-600">
                  LAT 6.425 / LON 2.348
                </span>
              </div>

              {/* Geolocation target trigger deep link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address || "Carrefour Tankpè, Abomey-Calavi, Bénin")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl py-2.5 font-display text-[10px] font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-embers-gold" />
                <span>Ouvrir sur Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Closing Foot line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
          <p>© {currentYear} NOVA GRILL. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${(settings.phone || "+2290196135287").replace(/\s+/g, '')}`}
              className="text-white hover:text-embers-glow flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact direct : {settings.phone || "+229 01 96 13 52 87"}</span>
            </a>
            <span>|</span>
            <span className="text-zinc-650 block sm:inline">CONÇU PAR GROW TECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
