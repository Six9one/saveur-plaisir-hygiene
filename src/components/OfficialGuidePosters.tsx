import {
  CheckCircle2,
  AlertTriangle,
  Camera,
} from 'lucide-react';

interface PosterProps {
  type: 'temperature' | 'reception' | 'cleaning' | 'dlc';
}

export const OfficialGuidePoster: React.FC<PosterProps> = ({ type }) => {
  switch (type) {
    case 'temperature':
      return (
        <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50/70 border-2 border-amber-300/80 rounded-3xl p-4 sm:p-6 text-slate-900 shadow-xl space-y-4 font-sans select-none overflow-hidden relative">
          
          {/* Top Poster Header with Official Bakery Logo */}
          <div className="flex items-center justify-between border-b-2 border-amber-200 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                🥖
              </div>
              <div>
                <div className="text-[11px] font-black tracking-wider uppercase text-amber-700">
                  PLAISIRS & SAVEURS • HACCP
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  GUIDE DE SURVEILLANCE DES TEMPÉRATURES
                </h2>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 shrink-0 font-mono shadow-xs">
              06h30 & 19h00
            </span>
          </div>

          {/* 3 Step Infographic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    1
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    CONTRÔLE DES ENCEINTES
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Relever les températures sur les thermomètres des frigos et congélateurs.
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-900">Chambre Froide</span>
                  <span className="text-xs font-black text-blue-700 font-mono">0°C à +4°C ✓</span>
                </div>
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-900">Surgélateur</span>
                  <span className="text-xs font-black text-cyan-700 font-mono">≤ -18°C ✓</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    2
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    VÉRIFICATION SUR L'APP
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  L'application analyse la conformité instantanément pour chaque frigo.
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[10px] font-bold text-emerald-900">Vert : Conforme (RAS)</span>
                </div>
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-[10px] font-bold text-rose-900">Rouge : Alerte &gt; 5°C</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    3
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    VALIDATION EN 1 CLIC
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Enregistrer les relevés du matin (06h30) et du soir (19h00).
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 text-center font-black text-xs shadow-sm">
                ✓ 1 Clic « Valider Tout (RAS) »
              </div>
            </div>

          </div>

          {/* Bottom Compliance Strip */}
          <div className="text-center text-[10px] font-black tracking-wider uppercase text-amber-800 pt-1">
            CONFORME AUX NORMES SANITAIRES OFFICIELLES DDPP • PAQUET HYGIÈNE CE 852/2004
          </div>

        </div>
      );

    case 'reception':
      return (
        <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50/70 border-2 border-cyan-300/80 rounded-3xl p-4 sm:p-6 text-slate-900 shadow-xl space-y-4 font-sans select-none overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-cyan-200 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                🚚
              </div>
              <div>
                <div className="text-[11px] font-black tracking-wider uppercase text-cyan-700">
                  PLAISIRS & SAVEURS • TRAÇABILITÉ
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  CONTRÔLE À RÉCEPTION DES MARCHANDISES
                </h2>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-cyan-500 text-slate-950 shrink-0 font-mono shadow-xs">
              À CHAQUE ARRIVAGE
            </span>
          </div>

          {/* 3 Step Infographic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-cyan-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    1
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    CONTRÔLE DU CAMION
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Vérifier la propreté de la caisse frigorifique et l'absence de rupture de froid.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-[10px] text-blue-950 font-bold">
                ❄️ Produits Frais : +2°C à +4°C
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-cyan-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    2
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    PHOTO DU BON (BL)
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Photographier le bon papier du livreur avec le numéro de lot bien net.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-cyan-500 text-slate-950 text-center font-black text-xs shadow-xs flex items-center justify-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>1 Photo = 100% Archivé</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-cyan-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    3
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    VALIDATION INSTANTANÉE
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Appuyer sur Valider : le document est horodaté pour toute inspection DDPP.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-900 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Preuve numérique certifiée</span>
              </div>
            </div>

          </div>

          <div className="text-center text-[10px] font-black tracking-wider uppercase text-cyan-800 pt-1">
            TRAÇABILITÉ TOTALE AMONT-AVAL • CONFORMITÉ RÈGLEMENT CE 178/2002
          </div>

        </div>
      );

    case 'cleaning':
      return (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50/70 border-2 border-emerald-300/80 rounded-3xl p-4 sm:p-6 text-slate-900 shadow-xl space-y-4 font-sans select-none overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-emerald-200 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                🧼
              </div>
              <div>
                <div className="text-[11px] font-black tracking-wider uppercase text-emerald-700">
                  PLAISIRS & SAVEURS • HYGIÈNE DU FOURNIL
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  PLAN DE NETTOYAGE & DÉSINFECTION DU FOURNIL
                </h2>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 shrink-0 font-mono shadow-xs">
              QUOTIDIEN & CLÔTURE
            </span>
          </div>

          {/* 3 Step Infographic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    1
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    DÉBARRASSER & RÂCLER
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Retirer les résidus de farine et pâte sèche sur le pétrin, la diviseuse et les plans de travail.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-700 font-bold">
                🥣 Pré-nettoyage à sec
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    2
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    PRODUITS HOMOLOGUÉS
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Utiliser les 4 références certifiées Contact Alimentaire :
                </p>
              </div>

              <div className="space-y-1 text-[10px] font-bold">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200">
                  • Suma Bac D10 : Surfaces Inox & Pétrin
                </div>
                <div className="p-1.5 rounded-lg bg-teal-50 text-teal-900 border border-teal-200">
                  • Sirafan Speed : Sans rinçage lames & couteaux
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    3
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    VALIDATION NUMÉRIQUE
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Cocher les matériels nettoyés sur le smartphone pour signer la clôture du soir.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 text-center font-black text-xs shadow-xs">
                ✓ Clôturé & Signé
              </div>
            </div>

          </div>

          <div className="text-center text-[10px] font-black tracking-wider uppercase text-emerald-800 pt-1">
            DÉSINFECTION BACTÉRICIDE & FONGICIDE CONFORME EN 1276 / EN 13697
          </div>

        </div>
      );

    case 'dlc':
    default:
      return (
        <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50/70 border-2 border-purple-300/80 rounded-3xl p-4 sm:p-6 text-slate-900 shadow-xl space-y-4 font-sans select-none overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-purple-200 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md">
                🏷️
              </div>
              <div>
                <div className="text-[11px] font-black tracking-wider uppercase text-purple-700">
                  PLAISIRS & SAVEURS • PÂTISSERIE
                </div>
                <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-tight">
                  GESTION DES DLC SECONDAIRES & PRÉPARATIONS
                </h2>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-purple-500 text-slate-950 shrink-0 font-mono shadow-xs">
              RÈGLE DES 72H
            </span>
          </div>

          {/* 3 Step Infographic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Step 1 */}
            <div className="bg-white p-3.5 rounded-2xl border border-purple-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    1
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    ÉTIQUETAGE IMMÉDIAT
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Coller une étiquette sur tout bac ouvert (lait, beurre, ovoproduits) ou préparation maison.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-[10px] text-purple-950 font-bold">
                📝 Mentionner : Nom + Date d'ouverture
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-3.5 rounded-2xl border border-purple-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    2
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    DURÉE MAXIMALE J+3
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Toute préparation contenant des œufs ou produits laitiers doit être consommée dans les 72 heures.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-purple-600 text-white text-center font-black text-xs shadow-xs">
                ⏱️ J+3 MAX (72h Chrono)
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-3.5 rounded-2xl border border-purple-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                    3
                  </span>
                  <strong className="text-xs font-black text-slate-900">
                    CONSERVATION +3°C
                  </strong>
                </div>
                <p className="text-[11px] text-slate-600 leading-tight">
                  Filmer hermétiquement et stocker en chambre froide pâtisserie entre 0°C et +3°C.
                </p>
              </div>

              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-900 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zéro risque microbiologique</span>
              </div>
            </div>

          </div>

          <div className="text-center text-[10px] font-black tracking-wider uppercase text-purple-800 pt-1">
            MAÎTRISE DES RISQUES MICROBIOLOGIQUES • GUIDE DE BONNES PRATIQUES D'HYGIÈNE
          </div>

        </div>
      );
  }
};
