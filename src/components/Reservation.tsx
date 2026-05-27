/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Users, Clock, Flame, CheckCircle2, Phone, Sparkles, MapPin, Copy, Layers } from "lucide-react";
import { NOVA_CONTACT } from "../types";
import { showToast } from "./Toast";
import { trackGAEvent } from "../lib/analytics";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "20:00",
    area: "terrasse", // terrasse, lounge, bar
    notes: ""
  });

  const [bookingRef, setBookingRef] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Simulate luxury reference generator code
    const randomCode = `NOVA-${Math.floor(100000 + Math.random() * 90000).toString()}`;
    setBookingRef(randomCode);
    setIsSubmitted(true);
    
    // Dispatch conversion event to Google Analytics
    trackGAEvent(
      "submit_reservation", 
      "Conversion", 
      `Guests: ${formData.guests} | Area: ${formData.area}`, 
      parseInt(formData.guests) || 1
    );

    // Trigger majestic custom toast
    showToast(
      "Votre demande de réservation a été placée en file d'attente prioritaire. Un agent Nova Grill vous contactera par téléphone d'ici quelques minutes pour confirmer !",
      "Réservation Enregistrée"
    );
  };

  const copyRefCode = () => {
    navigator.clipboard.writeText(bookingRef);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      guests: "2",
      date: "",
      time: "20:00",
      area: "terrasse",
      notes: ""
    });
    setIsSubmitted(false);
    setBookingRef("");
  };

  return (
    <section
      id="reservation"
      className="relative py-12 sm:py-16 bg-[#0B0908] text-luxury-cream overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-embers-glow/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.05]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        {/* Reservation Branding Head */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-embers-glow block mb-4 flex items-center justify-center gap-1.5 italic font-bold">
            <Flame className="w-4 h-4 text-embers-glow" />
            VOTRE SÉJOUR COMMENCE ICI
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            Réserver <br className="sm:hidden" />
            <span className="italic font-light text-embers-glow">Une Table.</span>
          </h2>
          <p className="font-sans text-stone-400 text-sm sm:text-base font-light mt-4 leading-relaxed">
            Bloquez votre table instantanément. Notre équipe d'accueil vous contactera par téléphone pour coordonner votre arrivée et personnaliser vos grillades.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="booking-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="bg-[#161210] border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Full Name Input */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tobi Sanni"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-embers-glow transition-all"
                  />
                </div>

                {/* Telephone Input (Pre-formatted with Benin support) */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase flex justify-between">
                    <span>Numéro de Téléphone (WhatsApp) *</span>
                    <span className="text-embers-glow font-mono text-[9px] lowercase italic font-bold">pré-bloqué +229</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 font-mono text-sm border-r border-white/5 pr-3.5">
                      +229
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="01 96 13 52 87"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl pl-20 pr-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-embers-glow transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Number of guests Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    Nombre de Personnes
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-embers-glow">
                      <Users className="w-4 h-4" />
                    </span>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-embers-glow transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">1 Personne</option>
                      <option value="2">2 Personnes (Duo)</option>
                      <option value="4">4 Personnes (Famille)</option>
                      <option value="6">6 Personnes (Groupe)</option>
                      <option value="8">8 Personnes (Fêtes)</option>
                      <option value="12">12+ Personnes (Privé)</option>
                    </select>
                  </div>
                </div>

                {/* Seating Area Selection Tabs (Instead of basic select inputs) */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    Heure du Service
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-embers-glow">
                      <Clock className="w-4 h-4" />
                    </span>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-embers-glow transition-all appearance-none cursor-pointer font-mono"
                    >
                      <option value="12:00">Midi - 12h00 (Lunch)</option>
                      <option value="13:30">Midi - 13h30 (Lunch)</option>
                      <option value="18:30">Soir - 18h30 (Sunset chill)</option>
                      <option value="20:00">Soir - 20h00 (Service Noble)</option>
                      <option value="21:30">Soir - 21h30 (Lounge Vibes)</option>
                      <option value="23:00">Nuit - 23h00 (Late Night Grill)</option>
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    Choisir une Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-embers-glow">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-embers-glow transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Notes Input block */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    Régime ou Demande Spéciale (Ex: Anniversaire)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Célébration d'anniversaire, bougies, etc."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-embers-glow transition-all"
                  />
                </div>
              </div>

              {/* Seating Map Interactive buttons panel */}
              <div className="mt-8 flex flex-col gap-3">
                <label className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase block">
                  Préférence d'Emplacement
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "terrasse", name: "La Terrasse sous Étoiles", desc: "Pergolas suspendues" },
                    { id: "lounge", name: "Le Salon Lounge", desc: "Cosy & Fauteuils bas" },
                    { id: "bar", name: "Le Comptoir de Création", desc: "Face aux mixologues" }
                  ].map((zone) => {
                    const active = formData.area === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, area: zone.id })}
                        className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${
                          active
                            ? "bg-gradient-to-tr from-[#0a0a0a] to-[#010101] border-embers-glow text-white shadow-xl"
                            : "bg-black border-white/5 text-stone-400 hover:border-zinc-850"
                        }`}
                      >
                        <span className={`font-display text-xs font-bold uppercase ${active ? "text-embers-glow" : "text-stone-300"}`}>
                          {zone.name}
                        </span>
                        <span className="font-mono text-[9px] text-stone-500 tracking-wider">
                          {zone.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Master Submission Action Button (Design Piece) */}
              <div className="mt-10 border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-zinc-500 text-center sm:text-left">
                  <MapPin className="w-4 h-4 text-embers-glow" />
                  <span>Carrefour Tankpè, Calavi</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-embers-glow to-amber-600 hover:from-amber-500 hover:to-embers-glow text-white font-display text-xs font-bold uppercase tracking-[0.25em] px-10 py-4 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-embers-glow/20 transform hover:-translate-y-0.5"
                >
                  VALIDER MON ENREGISTREMENT
                </button>
              </div>
            </motion.form>
          ) : (
            // Success State Ticket Render
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#161210] border border-embers-glow/30 rounded-3xl p-6 sm:p-10 text-center relative max-w-2xl mx-auto shadow-2xl"
            >
              {/* Gold light particle */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/10 rounded-full filter blur-[40px] pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 mb-6 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl font-extrabold text-white tracking-tight leading-none mb-3">
                Table Pré-bloquée !
              </h3>
              
              <p className="font-sans text-stone-300 text-sm font-light max-w-md mx-auto leading-relaxed mb-8">
                Ravi de vous accueillir, <span className="text-white font-bold">{formData.name}</span>! Votre code d'enregistrement est généré ci-dessous. Notre équipe d'accueil va vous contacter sur le <span className="text-white font-bold font-mono">+229 {formData.phone}</span> pour finaliser.
              </p>

              {/* Print Ticket Voucher design */}
              <div className="bg-black border border-white/5 rounded-2xl p-6 mb-8 text-left border-dashed border-zinc-800">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4 font-mono text-xs text-zinc-500">
                  <span>TICKET DE TABLE NOVA</span>
                  <span className="text-embers-glow">STatus: CONFIRMÉ</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">RÉFÉRENCE</span>
                    <span className="font-mono font-bold text-white uppercase text-sm tracking-widest">{bookingRef}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">CONVIADOS</span>
                    <span className="font-sans font-bold text-white text-sm">{formData.guests} Personnes</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">PLANNING</span>
                    <span className="font-mono font-bold text-white text-sm">{formData.date} à {formData.time}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">ZONA</span>
                    <span className="font-display font-bold text-embers-glow text-sm uppercase">{formData.area === "terrasse" ? "Terrasse Étoiles" : formData.area === "lounge" ? "Lounge cosy" : "Bar créateurs"}</span>
                  </div>
                </div>

                {/* Simulated barcode for cinematic design */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col items-center justify-center gap-2">
                  <div className="h-8 w-full bg-gradient-to-r from-zinc-900 via-stone-700 to-zinc-900 opacity-30 relative" style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 8px)" }}></div>
                  <span className="font-mono text-[8px] tracking-[0.4em] text-zinc-650 block uppercase">
                    * {bookingRef} *
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={copyRefCode}
                  className="bg-[#161210] border border-white/10 text-stone-300 hover:text-white font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Copy className="w-4 h-4 text-embers-glow" />
                  <span>{isCopied ? "COPIÉ !" : "COPIER LE CODE"}</span>
                </button>

                <button
                  onClick={resetForm}
                  className="bg-white text-black hover:bg-embers-glow hover:text-white font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-300"
                >
                  ENREGISTRER UNE AUTRE TABLE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
