import React, { useState } from 'react';
import type { SecondaryDlcItem, User } from '../types';
import {
  Tag,
  Plus,
  Printer,
  X,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface SecondaryDlcModuleProps {
  items: SecondaryDlcItem[];
  currentUser: User;
  onAddItem: (item: Omit<SecondaryDlcItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
}

export const SecondaryDlcModule: React.FC<SecondaryDlcModuleProps> = ({
  items,
  currentUser,
  onAddItem,
  onDeleteItem,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedLabelForPrint, setSelectedLabelForPrint] = useState<SecondaryDlcItem | null>(null);

  // Form states
  const [productName, setProductName] = useState<string>('Crème Pâtissière');
  const [category, setCategory] = useState<SecondaryDlcItem['category']>('Pâtisserie');
  const [durationHours, setDurationHours] = useState<number>(48);
  const [lotOriginal, setLotOriginal] = useState<string>('LT-2026-0819');
  const [storageTemp, setStorageTemp] = useState<string>('+2°C à +4°C');

  const presets = [
    { name: 'Crème Pâtissière (Vanille/Choco)', cat: 'Pâtisserie' as const, hours: 48, temp: '+2°C à +4°C' },
    { name: 'Bouteille Blancs/Jaunes d’Œufs', cat: 'Matière Première Ouverte' as const, hours: 24, temp: '+2°C à +4°C' },
    { name: 'Garniture Salée Sandwichs / Quiches', cat: 'Snacking/Salé' as const, hours: 48, temp: '+3°C' },
    { name: 'Décongélation Fonds de Tarte / Pâtes', cat: 'Boulangerie' as const, hours: 72, temp: '+4°C' },
    { name: 'Ganache Montée / Mousses', cat: 'Pâtisserie' as const, hours: 72, temp: '+2°C à +4°C' },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setProductName(preset.name);
    setCategory(preset.cat);
    setDurationHours(preset.hours);
    setStorageTemp(preset.temp);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const prepDate = new Date().toISOString();
    const expiryDate = new Date(Date.now() + durationHours * 3600 * 1000).toISOString();

    const newItem: Omit<SecondaryDlcItem, 'id'> = {
      productName: productName.trim(),
      category,
      prepDate,
      durationHours,
      expiryDate,
      preparedBy: currentUser.name,
      lotOriginal: lotOriginal.trim(),
      storageTemp,
    };

    onAddItem(newItem);
    setShowAddModal(false);
  };

  const triggerPrint = (item: SecondaryDlcItem) => {
    setSelectedLabelForPrint(item);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-24 px-1 sm:px-0 animate-in fade-in duration-150">
      
      {/* ================= 1. HEADER (CLEAN & MODERN) ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-inner">
              <Tag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Étiquettes & DLC Secondaires
                </h2>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
                  ⏳ Bientôt Disponible
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Traçabilité des préparations ouvertes • En attente de l'imprimante à stickers
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-400 text-xs sm:text-sm font-bold border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Tester une Étiquette</span>
          </button>

        </div>
      </div>

      {/* ================= 2. COMING SOON HERO CARD (WAITING FOR STICKER PRINTER) ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
            <Printer className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Arrive Très Prochainement !</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              Option en cours d'activation • En attente de l'imprimante
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl">
              Nous attendons actuellement la livraison de l'imprimante thermique à étiquettes autocollantes. Dès son arrivée et son branchement, vous pourrez imprimer les stickers DLC en 1 clic pour vos crèmes, bacs et matières premières.
            </p>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/90 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">Stickers Autocollants</strong>
              <span className="text-slate-400 text-[11px]">Format étiquette résistant au froid et à l'humidité.</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">Calcul Automatique DLC</strong>
              <span className="text-slate-400 text-[11px]">Date et heure limites calculées selon la recette (24h, 48h, 72h).</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white block font-bold">100% Conforme HACCP</strong>
              <span className="text-slate-400 text-[11px]">Traçabilité garantie avec nom de l'opérateur et n° de lot.</span>
            </div>
          </div>

        </div>

      </div>

      {/* ================= 3. EXISTING LABELS LIST (IF ANY) ================= */}
      {items.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
            Aperçu des étiquettes enregistrées ({items.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between space-y-3 shadow-md text-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.durationHours}h max
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white mt-2 leading-snug">
                    {item.productName}
                  </h3>

                  <div className="text-xs text-slate-400 space-y-1 mt-2.5 pt-2.5 border-t border-slate-800/80 font-medium">
                    <div className="flex items-center justify-between">
                      <span>Préparé le :</span>
                      <strong className="text-slate-200">{new Date(item.prepDate).toLocaleDateString('fr-FR')}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>DLC Limite :</span>
                      <strong className="text-amber-400">{new Date(item.expiryDate).toLocaleDateString('fr-FR')} {new Date(item.expiryDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Par :</span>
                      <strong className="text-slate-300">{item.preparedBy}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerPrint(item)}
                    className="flex-1 py-2 px-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Aperçu Impression</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 rounded-2xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Supprimer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. MODAL: ADD LABEL (TEST/PREVIEW) ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs no-print">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-black text-white">Créer une Étiquette DLC</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="my-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                Modèles rapides Boulangerie / Pâtisserie :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                  Nom du produit :
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Catégorie :
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Pâtisserie">Pâtisserie</option>
                    <option value="Boulangerie">Boulangerie</option>
                    <option value="Snacking/Salé">Snacking / Salé</option>
                    <option value="Matière Première Ouverte">Matière Première</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Durée DLC :
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full text-xs p-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value={24}>24 Heures (J+1)</option>
                    <option value={48}>48 Heures (J+2)</option>
                    <option value={72}>72 Heures (J+3)</option>
                    <option value={120}>5 Jours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                  N° Lot d'origine (Optionnel) :
                </label>
                <input
                  type="text"
                  value={lotOriginal}
                  onChange={(e) => setLotOriginal(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 cursor-pointer transition-all"
                >
                  Enregistrer
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ================= PRINT LABEL VIEW (HIDDEN ON SCREEN, VISIBLE ON PRINT) ================= */}
      {selectedLabelForPrint && (
        <div className="hidden print:block p-4 border-2 border-black text-black max-w-xs mx-auto text-center font-mono">
          <h2 className="text-lg font-black uppercase">{selectedLabelForPrint.productName}</h2>
          <p className="text-xs font-bold my-1">PLAISIRS & SAVEURS • HACCP</p>
          <div className="text-xs text-left my-2 border-t border-b border-black py-1 space-y-0.5">
            <p>Ouvert/Préparé : <strong>{new Date(selectedLabelForPrint.prepDate).toLocaleString('fr-FR')}</strong></p>
            <p>À CONSOMMER AVANT : <strong className="text-sm font-black">{new Date(selectedLabelForPrint.expiryDate).toLocaleString('fr-FR')}</strong></p>
            <p>Lot : {selectedLabelForPrint.lotOriginal || 'N/A'}</p>
            <p>Par : {selectedLabelForPrint.preparedBy}</p>
          </div>
          <p className="text-[10px] italic">Conserver à {selectedLabelForPrint.storageTemp}</p>
        </div>
      )}

    </div>
  );
};
