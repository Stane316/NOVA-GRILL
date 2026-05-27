/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, Flame, Eye, EyeOff, AlertTriangle, CheckCircle, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface AdminLoginProps {
  onLoginSuccess: (session: any) => void;
  onBackToSite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSimulated = !supabase;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMsg("Veuillez remplir tous les champs.");
      setIsLoading(false);
      return;
    }

    try {
      if (isSimulated) {
        // Simulation credentials
        if (email.trim() === "admin@novagrill.com" && password === "admin") {
          setSuccessMsg("Connexion réussie (Mode Simulation active) !");
          setTimeout(() => {
            onLoginSuccess({ user: { email: "admin@novagrill.com", id: "simulated-id" } });
            setIsLoading(false);
          }, 1000);
        } else {
          setErrorMsg("Identifiants incorrects. En mode simulation, utilisez: admin@novagrill.com / admin");
          setIsLoading(false);
        }
      } else {
        // Live Supabase Authenticate
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          throw error;
        }

        setSuccessMsg("Authentification validée ! Chargement du terminal de contrôle...");
        setTimeout(() => {
          onLoginSuccess(data.session);
          setIsLoading(false);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erreur d'authentification.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0908] text-luxury-cream flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans select-none">
      {/* Background cinematic visuals */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,94,40,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-embers-glow/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/3 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.05]" />

      {/* Back button to public portal */}
      <button
        onClick={onBackToSite}
        className="absolute top-8 left-8 text-stone-400 hover:text-white text-xs font-mono tracking-[0.2em] transition-colors duration-300 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full hover:border-[#2d221c]"
      >
        <span>← RETOUR AU PORTAL</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-[#161210]/95 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-xl"
      >
        {/* Glow Line Indicator */}
        <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-embers-glow to-transparent" />

        {/* Brand visual header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-embers-glow/10 border border-embers-glow/30 text-embers-glow mb-4">
            <Flame className="w-8 h-8 filter drop-shadow-[0_0_8px_rgba(235,94,40,0.5)] animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white tracking-tight">
            Terminal de <span className="italic font-normal text-embers-glow">Contrôle</span>
          </h2>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 mt-2">
            NOVA GRILL · ADMINISTRATION PORTAL
          </p>
        </div>

        {/* Safe alert callouts depending on Simulation Status */}
        {isSimulated ? (
          <div className="bg-amber-600/5 border border-amber-600/20 text-amber-200/90 rounded-2xl p-4 mb-6 flex gap-3 text-xs leading-relaxed font-light">
            <AlertTriangle className="w-5 h-5 text-embers-glow shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-embers-glow uppercase tracking-wider text-[10px] mb-1">
                Mode de Simulation Activé
              </p>
              <p className="text-stone-300">
                Aucune clé Supabase n'est définie. Vous pouvez vous connecter librement avec :
              </p>
              <div className="mt-2 font-mono text-[11px] bg-black/40 p-2 rounded border border-white/5 flex flex-col gap-1 select-text">
                <span className="text-white">Email : <strong className="text-embers-glow font-bold">admin@novagrill.com</strong></span>
                <span className="text-white">Mot de passe : <strong className="text-embers-glow font-bold">admin</strong></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-600/5 border border-emerald-600/20 text-emerald-200/90 rounded-2xl p-4 mb-6 flex gap-3 text-xs leading-relaxed font-light">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] mb-1">
                Connexion Supabase Sécurisée
              </p>
              <p className="text-stone-300">
                Vos clés sont connectées. Connectez-vous avec vos identifiants administratives enregistrés.
              </p>
            </div>
          </div>
        )}

        {/* Errors / Success displays */}
        {errorMsg && (
          <div className="mb-6 px-4 py-3 bg-red-950/40 border border-red-500/20 text-red-200 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 px-4 py-3 bg-green-950/40 border border-green-500/20 text-green-200 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email input field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-widest uppercase text-stone-400 font-bold">
              Adresse e-mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: chef@novagrill.com"
                required
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-embers-glow/40 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-widest uppercase text-stone-400 font-bold">
              Clé d'accès secrète
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe secret"
                required
                className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-embers-glow/40 transition-colors duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Connect button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-embers-dark hover:bg-embers-glow hover:text-white hover:shadow-2xl hover:shadow-embers-glow/15 active:scale-98 font-display text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-all duration-300 mt-2 flex items-center justify-center gap-2 disabled:opacity-55"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>RACCORDER LE FLUX SANITAIRE</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
