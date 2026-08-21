import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SplashScreenProps {
  onFinish?: () => void;
  currentUser?: { name: string; role?: string };
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, currentUser }) => {
  const [progress, setProgress] = useState<number>(10);
  const [statusText, setStatusText] = useState<string>('Vérification des mises à jour...');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    // Step 1: Check updates
    const t1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Synchronisation des données HACCP...');
    }, 350);

    // Step 2: Load profiles & equipment
    const t2 = setTimeout(() => {
      setProgress(85);
      setStatusText(currentUser?.name ? `Bienvenue, ${currentUser.name}` : 'Bienvenue chez Plaisirs & Saveurs');
    }, 750);

    // Step 3: Complete
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Système prêt ✓');
    }, 1100);

    // Step 4: Fade out
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
    }, 1350);

    // Step 5: Finish
    const t5 = setTimeout(() => {
      onFinish?.();
    }, 1650);

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
      className={`fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-950 flex flex-col items-center justify-center p-6 select-none transition-all duration-300 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background radial glowing aura */}
      <div className="absolute w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -bottom-10" />

      {/* Main Card Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full space-y-6">
        
        {/* Animated Royal Logo Icon */}
        <div className="relative group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-slate-900 border-2 border-amber-400/80 shadow-2xl flex flex-col items-center justify-center p-3 text-amber-400">
            <span className="text-3xl filter drop-shadow-md transform -translate-y-0.5">👑</span>
            <span className="font-serif font-black text-xs tracking-wider text-amber-300 uppercase mt-0.5">
              P & S
            </span>
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Boulangerie Artisanale</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
            Plaisirs & Saveurs
          </h1>

          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Plan de Maîtrise Sanitaire • HACCP
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-2 pt-2">
          <div className="h-1.5 w-full bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-amber-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status text */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 min-h-[20px]">
            {progress === 100 ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
            )}
            <span className="text-[11px] tracking-wide text-slate-300 transition-opacity">
              {statusText}
            </span>
          </div>
        </div>

        {/* Device Sync Footer Badge */}
        <div className="pt-4 text-[10px] text-slate-400 font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Synchronisation automatique active</span>
        </div>

      </div>
    </div>
  );
};
