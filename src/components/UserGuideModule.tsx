import React, { useState } from 'react';
import { X } from 'lucide-react';
import workflowArt from '../assets/guide/vertical_workflow_art.png';

interface UserGuideModuleProps {
  onClose?: () => void;
}

export const UserGuideModule: React.FC<UserGuideModuleProps> = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  return (
    <div className="max-w-2xl mx-auto pb-24 px-1 animate-in fade-in duration-200">
      {/* Image direct view without buttons */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-amber-300/30 cursor-pointer bg-[#fbf6ed] transition-transform duration-300 hover:scale-[1.005]"
      >
        <img
          src={workflowArt}
          alt="Plan de Maîtrise Sanitaire & HACCP - Plaisirs & Saveurs"
          className="w-full h-auto block rounded-3xl object-contain"
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-60 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[96vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-3 -right-2 z-10 w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl border border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={workflowArt}
              alt="Fresque HD Plaisirs & Saveurs"
              className="max-w-full max-h-[92vh] object-contain rounded-2xl shadow-2xl border border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};
