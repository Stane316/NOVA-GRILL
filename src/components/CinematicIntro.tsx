/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CinematicIntroProps {
  onComplete: () => void;
  key?: string;
}

const PHRASES = [
  { 
    lines: ["Quand les", "lumières baissent…"],
    italic: true, 
    tracking: "tracking-[0.02em] sm:tracking-[0.03em]", 
    fontSize: "clamp(2.4rem, 6.2vw, 4.8rem)",
    lineHeight: "1.15",
    color: "text-stone-300 font-light" 
  },
  { 
    lines: ["Nova", "s’éveille."],
    italic: false, 
    tracking: "tracking-[0.03em] sm:tracking-[0.04em]", 
    fontSize: "clamp(3.8rem, 10vw, 7.8rem)",
    lineHeight: "1.05",
    color: "text-white font-normal" 
  },
  { 
    lines: ["Le feu", "crépite."],
    italic: true, 
    tracking: "tracking-[0.03em] sm:tracking-[0.04em]", 
    fontSize: "clamp(2.6rem, 6.8vw, 5.2rem)",
    lineHeight: "1.15",
    color: "text-[#eb5e28] font-light" 
  },
  { 
    lines: ["Les verres", "s’entrechoquent."],
    italic: false, 
    tracking: "tracking-[0.01em] sm:tracking-[0.02em]", 
    fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
    lineHeight: "1.2",
    color: "text-stone-300 font-light" 
  },
  { 
    lines: ["La nuit", "commence."],
    italic: true, 
    tracking: "tracking-[0.03em] sm:tracking-[0.04em]", 
    fontSize: "clamp(3.8rem, 10vw, 7.8rem)",
    lineHeight: "1.05",
    color: "text-white font-normal" 
  }
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"entering" | "resting" | "exiting">("entering");
  
  const grainCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. High Performance Cinema Grain Canvas (cycles pre-rendered noise frames to achieve pure 60fps with absolute 0 CPU overhead)
  useEffect(() => {
    const canvas = grainCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create 6 pre-rendered noise matrices pattern frames
    const patternSize = 128;
    const noisePatterns: HTMLCanvasElement[] = [];

    for (let i = 0; i < 6; i++) {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = patternSize;
      pCanvas.height = patternSize;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        const imgData = pCtx.createImageData(patternSize, patternSize);
        const data = imgData.data;
        for (let j = 0; j < data.length; j += 4) {
          const value = Math.floor(Math.random() * 26); // velvety soft grain grey values
          data[j] = value;     // R
          data[j + 1] = value; // G
          data[j + 2] = value; // B
          data[j + 3] = 9;     // Microscopic low visibility (around 3.5% opacity) to provide a premium analog look
        }
        pCtx.putImageData(imgData, 0, 0);
        noisePatterns.push(pCanvas);
      }
    }

    let frameCount = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentPattern = noisePatterns[frameCount % noisePatterns.length];
      if (currentPattern) {
        const pattern = ctx.createPattern(currentPattern, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      frameCount++;
      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Exact pacing timer variables for each cinematic phrase
  useEffect(() => {
    if (step >= PHRASES.length) {
      onComplete();
      return;
    }

    setPhase("entering");

    // All line layers enter simultaneously (takes 1.5s for complete breathing transition)
    const enterTimeout = setTimeout(() => {
      setPhase("resting");
    }, 1500);

    // Pacing rest window allows the line to live and breathe peacefully
    const restingDuration = step === PHRASES.length - 1 ? 2400 : 1800;
    const restTimeout = setTimeout(() => {
      setPhase("exiting");
    }, 1500 + restingDuration);

    // Dynamic right-to-left dissolve timing based on line length
    const activePhrase = PHRASES[step];
    const maxLineLength = Math.max(...activePhrase.lines.map(l => l.length));
    const exitDuration = 600 + (maxLineLength * 25); // generous dissolve timeline

    const stepTimeout = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 1500 + restingDuration + exitDuration);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(restTimeout);
      clearTimeout(stepTimeout);
    };
  }, [step, onComplete]);

  if (step >= PHRASES.length) {
    return null;
  }

  const activePhrase = PHRASES[step];

  // Horizontal clip-path swipe & blur transition for ultimate premium feeling on word reveal
  const containerVariants = {
    hidden: {
      clipPath: "inset(0 100% 0 0)",
      filter: "blur(20px)",
      x: -15,
      opacity: 0
    },
    visible: {
      clipPath: "inset(0 0% 0 0)",
      filter: "blur(0px)",
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] // legendary custom ease curve for luxury brands
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exiting: (custom: { idx: number; total: number }) => {
      // Dissolves progressively from right to left (reverse order)
      const reversedIndex = custom.total - 1 - custom.idx;
      return {
        opacity: 0,
        filter: "blur(10px)",
        y: -4,
        scale: 0.98,
        transition: {
          duration: 0.65,
          ease: [0.25, 1, 0.5, 1],
          delay: reversedIndex * 0.02 // right-to-left organic stagger delay
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020202] z-9999 flex flex-col items-center justify-center overflow-hidden select-none">
      
      {/* 1. Subtle, slow breathing warm ember spotlight far in the background */}
      <motion.div
        animate={{
          opacity: [0.12, 0.28, 0.12],
          scale: [0.96, 1.04, 0.96]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-radial-vignette from-[#eb5e28]/10 via-transparent to-transparent pointer-events-none z-1 filter blur-[60px]"
      />

      {/* Extreme luxury dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-5 pointer-events-none" />

      {/* 2. HIGH PERFORMANCE CINEMA GRAIN CANVAS */}
      <canvas 
        ref={grainCanvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60"
      />

      {/* 3. Subtle Anamorphic horizontal aspect ratio rails (premium cinematic letterbox bounds) */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black border-b border-white/[0.025] z-55" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-black border-t border-white/[0.025] z-55" />

      {/* 4. Elegant, quiet top corner metadata */}
      <div className="absolute top-8 left-8 right-8 z-50 flex justify-between items-center text-stone-600">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#eb5e28] animate-pulse" />
          <span className="font-mono text-[8px] uppercase tracking-[0.45em] font-bold text-stone-400">
            Nova Experience · Acte 0{step + 1}
          </span>
        </div>
      </div>

      {/* 5. Minimal running timeline marker line at bottom left */}
      <div className="absolute bottom-12 left-12 hidden sm:flex flex-col gap-1.5 z-45">
        <div className="font-mono text-[7px] tracking-[0.5em] text-stone-500 uppercase">
          NOVA GRILL / PRESTIGE
        </div>
        <div className="h-[1px] w-8 bg-stone-800" />
      </div>

      {/* 6. TYPOGRAPHIC SEGMENT (Manual lines control to protect responsive poster grid layout) */}
      <div className="relative z-25 max-w-[85vw] md:max-w-[min(90vw,1100px)] text-center flex flex-col items-center justify-center min-h-[350px] mx-auto w-full">
        <AnimatePresence mode="popLayout">
          {/* Main container animates whole phrase left to right */}
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate={phase === "entering" || phase === "resting" ? "visible" : undefined}
            className={`flex flex-col gap-2 sm:gap-4 justify-center items-center select-none w-full font-cormorant ${
              activePhrase.italic ? "italic" : ""
            }`}
            style={{
              textWrap: "balance" as any
            }}
          >
            {activePhrase.lines.map((lineText, lineIdx) => {
              const chars = lineText.split("");
              return (
                <div 
                  key={lineIdx} 
                  className="intro-line-group block leading-tight select-none"
                  style={{
                    fontSize: activePhrase.fontSize,
                    lineHeight: activePhrase.lineHeight,
                    letterSpacing: "normal" // completely reset to rely strictly on tracking props below
                  }}
                >
                  <span className={`line block ${activePhrase.color} ${activePhrase.tracking}`}>
                    {chars.map((char, charIdx) => {
                      return (
                        <motion.span
                          key={charIdx}
                          custom={{ idx: charIdx, total: chars.length }}
                          variants={charVariants}
                          initial="hidden"
                          animate={phase === "exiting" ? "exiting" : "visible"}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 7. Subtle vertical grid line accents */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/[0.012] pointer-events-none z-5" />
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/[0.012] pointer-events-none z-5" />

      {/* 8. Elegant & Minimal Discrete Skip CTA conforming precisely to mobile and desktop positioning boundaries */}
      <button
        onClick={onComplete}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-[5%] md:translate-x-0 text-[9px] sm:text-[9.5px] tracking-[0.3em] font-mono uppercase text-stone-500 hover:text-white opacity-40 hover:opacity-100 transition-all duration-300 pointer-events-auto bg-transparent border-0 outline-none select-none z-50 whitespace-nowrap"
      >
        Passer l’introduction
      </button>

    </div>
  );
}
