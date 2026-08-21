import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import mascotImg from '../assets/baker_mascot.jpg';

interface SplashScreenProps {
  onFinish?: () => void;
  currentUser?: { name: string; role?: string };
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, currentUser }) => {
  const [progress, setProgress] = useState<number>(10);
  const [statusText, setStatusText] = useState<string>('Démarrage du bouclier anti-microbes...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Step 1: Microbes hunting
    const t1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Chasse aux bactéries & vérification HACCP...');
    }, 380);

    // Step 2: Welcome user
    const t2 = setTimeout(() => {
      setProgress(85);
      setStatusText(currentUser?.name ? `Bonjour Chef ${currentUser.name} !` : 'Bienvenue au Fournil !');
    }, 850);

    // Step 3: All clear
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Boulangerie 100% Propre & Conforme ✓');
    }, 1250);

    // Step 4: Fade out
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1600);

    // Step 5: Finish
    const t5 = setTimeout(() => {
      onFinish?.();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [currentUser, onFinish]);

  return (
    <div
      onClick={() => onFinish?.()}
      className={`fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-[#0b1329] to-slate-950 flex flex-col items-center justify-center p-5 select-none transition-all duration-300 cursor-pointer ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background glowing radiant aura */}
      <div className="absolute w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -bottom-10" />

      {/* Main Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full space-y-4">
        
        {/* Creative Baker Hero Mascot with Baguette Laser */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full blur-lg opacity-80 animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-3 border-amber-400 shadow-2xl bg-slate-900 flex items-center justify-center">
            <img
              src={mascotImg}
              alt="Boulanger Héros Anti-Microbes"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Floating funny badge */}
          <div className="absolute -bottom-2 -right-1 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 animate-bounce">
            <span>🥖 Laser Anti-Microbe</span>
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Zéro Microbe • 100% Artisanal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-50">
            Plaisirs & Saveurs
          </h1>

          <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Maîtrise Sanitaire & HACCP
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2 pt-1 max-w-[280px]">
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700/60 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-md shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status text */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 min-h-[22px]">
            {progress === 100 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            )}
            <span className="text-xs text-amber-200 font-semibold tracking-wide">
              {statusText}
            </span>
          </div>
        </div>

        {/* Tap to enter hint */}
        <div className="text-[10px] text-slate-500 font-medium tracking-wide pt-1">
          (Touchez l'écran pour entrer directement)
        </div>

      </div>
    </div>
  );
};
