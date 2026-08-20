import { useEffect } from 'react';
import { Home, FileSpreadsheet, HelpCircle } from 'lucide-react';
import type { User } from '../types';

interface HeaderProps {
  onGoHome?: () => void;
  onOpenPinModal?: () => void;
  onOpenHistory?: () => void;
  onOpenGuide?: () => void;
  currentUser?: User;
  isHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenPinModal,
  onOpenHistory,
  onOpenGuide,
  currentUser,
  isHome = true,
}) => {
  // PWA auto-update: check for new service worker on focus
  useEffect(() => {
    const checkUpdate = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          regs.forEach((reg) => reg.update());
        });
      }
    };
    window.addEventListener('focus', checkUpdate);
    window.addEventListener('visibilitychange', () => {
      if (!document.hidden) checkUpdate();
    });
    return () => {
      window.removeEventListener('focus', checkUpdate);
    };
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand Identity (Left) */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group transition-transform active:scale-98"
            onClick={onGoHome}
            title="Plaisirs & Saveurs • Retour à l'accueil"
          >
            {/* Chef Avatar Icon */}
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl overflow-hidden shadow-lg shadow-amber-500/25 border-2 border-amber-500/70 shrink-0 bg-slate-950 flex items-center justify-center group-hover:border-amber-400 transition-colors">
              <img
                src="/logo.png"
                alt="Plaisirs & Saveurs Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon.svg';
                }}
              />
            </div>

            {/* Brand Title & Badge */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-black text-white tracking-tight leading-none uppercase">
                  PLAISIRS & SAVEURS
                </h1>
                <span className="bg-amber-500 text-slate-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs shrink-0">
                  HACCP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block mt-1">
                Plan de Maîtrise Sanitaire • Boulangerie-Pâtisserie Artisanale
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">

            {/* User Profile Switcher */}
            {currentUser && onOpenPinModal && (
              <button
                onClick={onOpenPinModal}
                className="flex items-center gap-2.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 px-2.5 py-1.5 rounded-2xl shadow-inner transition-all cursor-pointer group"
                title="Changer d'utilisateur"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs overflow-hidden shrink-0 shadow-sm"
                  style={{
                    border: `2.5px solid ${currentUser.avatarColor || '#f59e0b'}`,
                    background: currentUser.avatarColor || '#f59e0b',
                  }}
                >
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-black">{currentUser.name.charAt(0)}</span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500">{currentUser.role}</span>
                </div>
              </button>
            )}

            {/* Guide & Tutos Shortcut */}
            {onOpenGuide && (
              <button
                onClick={onOpenGuide}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-400 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-xs transition-all cursor-pointer text-slate-200 hover:text-amber-400 font-bold text-xs"
                title="Guide d'Utilisation & Tutos"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Guide & Tutos</span>
              </button>
            )}

            {/* Historique & PDF Shortcut */}
            {onOpenHistory && (
              <button
                onClick={onOpenHistory}
                className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-xs transition-all cursor-pointer text-amber-400 font-black text-xs"
                title="Consulter l'Historique & Générer le PDF"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Historique & PDF</span>
              </button>
            )}

            {/* Return to Home Button (if inside a sub-module) */}
            {!isHome && onGoHome && (
              <button
                onClick={onGoHome}
                className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
                title="Retour au Tableau de Bord"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Accueil</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
