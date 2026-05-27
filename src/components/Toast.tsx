/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Check, Calendar, Flame } from "lucide-react";

export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  duration?: number;
}

export function showToast(message: string, title?: string, duration = 6000) {
  const event = new CustomEvent("nova-toast", {
    detail: { message, title, duration }
  });
  window.dispatchEvent(event);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleAddToast = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; title?: string; duration?: number }>;
      const { message, title, duration = 6000 } = customEvent.detail;
      const id = Math.random().toString(36).substring(2, 9);
      
      const newToast: ToastMessage = { id, title, message, duration };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    };

    window.addEventListener("nova-toast", handleAddToast);
    return () => window.removeEventListener("nova-toast", handleAddToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-55 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="pointer-events-auto w-full bg-[#0a0a0a]/95 backdrop-blur-md border border-embers-glow/30 p-4 rounded-2xl shadow-2xl relative overflow-hidden flex gap-3.5 items-start"
          >
            {/* Ambient golden corner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-embers-glow/10 rounded-full filter blur-xl pointer-events-none" />
            
            {/* Visual Icon */}
            <div className="p-2 rounded-xl bg-gradient-to-br from-embers-glow/20 to-amber-600/10 border border-embers-glow/30 text-embers-glow flex-shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>

            {/* Contents */}
            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-embers-gold" />
                  {toast.title}
                </h4>
              )}
              <p className="font-sans text-xs text-stone-300 leading-relaxed font-light">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing animated visual duration progress bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: (toast.duration || 6000) / 1000, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-embers-glow to-amber-500"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
