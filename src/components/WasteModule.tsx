import React, { useState, useRef } from 'react';
import type { WasteLog, User } from '../types';
import {
  Trash2,
  Plus,
  Scale,
  CheckCircle2,
  AlertOctagon,
  Camera,
  X,
  FileText,
  Recycle,
} from 'lucide-react';
import { compressImage } from '../services/imageStorage';

interface WasteModuleProps {
  logs: WasteLog[];
  currentUser: User;
  onAddLog: (log: Omit<WasteLog, 'id'>) => void;
  onDeleteLog?: (id: string) => void;
}

const PRESET_WASTE_ITEMS = [
  { name: 'Pâtons Baguette Tradition', category: 'Pâtons / Pâte' as const, reason: 'Sur-fermentation' as const, defaultKg: '3.5' },
  { name: 'Reste Crème Pâtissière', category: 'Pâtisseries' as const, reason: 'DLC Dépassée' as const, defaultKg: '1.2' },
  { name: 'Sandwichs & Snacking J-1', category: 'Snacking/Salé' as const, reason: 'DLC Dépassée' as const, defaultKg: '2.0' },
  { name: 'Viennoiseries invendues (sec)', category: 'Pâtisseries' as const, reason: 'Altération / Goût' as const, defaultKg: '1.8' },
  { name: 'Lait & Crème Fraîche', category: 'Matières Premières' as const, reason: 'DLC Dépassée' as const, defaultKg: '1.0' },
  { name: 'Plaque Pâte Feuilletée Brûlée', category: 'Pâtons / Pâte' as const, reason: 'Erreur Cuisson' as const, defaultKg: '2.2' },
];

export const WasteModule: React.FC<WasteModuleProps> = ({
  logs,
  currentUser,
  onAddLog,
  onDeleteLog,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form states
  const [productName, setProductName] = useState<string>('');
  const [category, setCategory] = useState<WasteLog['category']>('Pâtons / Pâte');
  const [quantityKg, setQuantityKg] = useState<string>('2.5');
  const [reason, setReason] = useState<WasteLog['reason']>('DLC Dépassée');
  const [method, setMethod] = useState<WasteLog['method']>('Biodéchets Dédiés');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<string>('');
  const [previewModalImg, setPreviewModalImg] = useState<{ url: string; title: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const totalKg = (logs || []).reduce((acc, curr) => acc + (Number(curr?.quantityKg) || 0), 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.85 });
      setPhotoUrl(compressed);
    } catch (err) {
      console.error('Image compression error', err);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_WASTE_ITEMS[0]) => {
    setProductName(preset.name);
    setCategory(preset.category);
    setReason(preset.reason);
    setQuantityKg(preset.defaultKg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      alert('Veuillez indiquer le nom de la denrée ou du produit.');
      return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;

    onAddLog({
      productName: productName.trim(),
      category,
      quantityKg: parseFloat(quantityKg) || 0,
      reason,
      method,
      discardedAt: formattedDate,
      discardedBy: currentUser?.name || 'Adel B.',
      photoUrl,
      notes: notes.trim() || undefined,
    });

    setProductName('');
    setNotes('');
    setPhotoUrl(undefined);
    setShowAddModal(false);
    showToast(`✓ Déclaration de perte "${productName.trim()}" enregistrée !`);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-24 px-1 sm:px-0 animate-in fade-in duration-150">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-950 text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= 1. HEADER (CLEAN & MODERN) ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-inner">
              <Trash2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Suivi des Déchets & Pertes
                </h2>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-xs">
                  Conformité DDPP ✓
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Registre d'élimination des denrées périmées, invendus et pâtes non conformes
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Déclarer une Perte</span>
          </button>

        </div>
      </div>

      {/* ================= 2. KPI STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Total Pertes */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/25 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Total Pertes Enregistrées
            </span>
            <strong className="text-lg sm:text-xl font-black text-rose-400 block mt-0.5">
              {totalKg.toFixed(1)} kg
            </strong>
            <span className="text-[11px] text-slate-400">
              {logs.length} déclaration{logs.length > 1 ? 's' : ''} au registre
            </span>
          </div>
        </div>

        {/* Card 2: Statut DDPP */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Contrôle Sanitaire
            </span>
            <strong className="text-xs sm:text-sm font-black text-emerald-400 block mt-0.5">
              ✓ Aucun produit périmé
            </strong>
            <span className="text-[11px] text-slate-400">
              Retrait immédiat & traçabilité OK
            </span>
          </div>
        </div>

        {/* Card 3: Filière d'élimination */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl flex items-center gap-3.5 shadow-md">
          <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shrink-0">
            <Recycle className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Filière de Traitement
            </span>
            <strong className="text-xs sm:text-sm font-black text-slate-200 block mt-0.5">
              Bac Biodéchets Dédié
            </strong>
            <span className="text-[11px] text-slate-400">
              Valorisation organique conforme
            </span>
          </div>
        </div>
      </div>

      {/* ================= 3. LIST OF WASTE RECORDS ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg text-white">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              Journal Officiel des Retraits & Destructions
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {logs.length} entrée{logs.length > 1 ? 's' : ''}
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Trash2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Aucune perte enregistrée</h4>
            <p className="text-xs mt-1">Cliquez sur « Déclarer une Perte » pour consigner les denrées écartées.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md transition-all"
              >
                {/* Left: Info & Photo */}
                <div className="flex items-center gap-3 min-w-0">
                  {log.photoUrl ? (
                    <div
                      onClick={() => setPreviewModalImg({ url: log.photoUrl!, title: log.productName })}
                      className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden cursor-pointer shrink-0 relative group"
                      title="Agrandir la photo de preuve"
                    >
                      <img src={log.photoUrl} alt={log.productName} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/10 flex items-center justify-center text-[10px] text-white">
                        🔍
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-500">
                      <Trash2 className="w-5 h-5 text-slate-500" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-xs sm:text-sm font-black text-white truncate">
                        {log.productName}
                      </strong>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {log.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 flex-wrap">
                      <span>🕒 {log.discardedAt}</span>
                      <span>•</span>
                      <span>👤 {log.discardedBy}</span>
                      {log.notes && (
                        <>
                          <span>•</span>
                          <span className="text-slate-400 italic truncate max-w-xs">"{log.notes}"</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quantity & Reason Badge */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <div className="text-left sm:text-right">
                    <span className="text-sm sm:text-base font-black text-rose-400 font-mono block">
                      {log.quantityKg} kg
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {log.reason}
                    </span>
                  </div>

                  {onDeleteLog && currentUser?.name === 'Adel B.' && (
                    <button
                      onClick={() => onDeleteLog(log.id)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Supprimer cette ligne"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= 4. MODAL DECLARATION DE PERTE (DARK THEME) ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm no-print animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center">
                  <AlertOctagon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    Déclarer une Perte / Destruction
                  </h3>
                  <p className="text-xs text-slate-400">
                    Traçabilité obligatoire de retrait des produits non conformes
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Presets */}
            <div className="pt-3 pb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                ⚡ Suggestions Rapides (1 Clic) :
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {PRESET_WASTE_ITEMS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(item)}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-400 transition-all cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="pt-3 space-y-3.5">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                  Produit écarté / Denrée <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pâtons tradition, Crème pâtissière, Sandwichs poulet..."
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Category & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Catégorie :
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Pâtons / Pâte">Pâtons / Pâte</option>
                    <option value="Pâtisseries">Pâtisseries</option>
                    <option value="Matières Premières">Matières Premières</option>
                    <option value="Snacking/Salé">Snacking / Salé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Poids / Quantité (kg) <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-950 border border-slate-800 text-rose-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Reason & Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Motif du Rejet :
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="DLC Dépassée">DLC / Date Dépassée</option>
                    <option value="Sur-fermentation">Sur-fermentation Pâte</option>
                    <option value="Altération / Goût">Altération / Goût anormal</option>
                    <option value="Erreur Cuisson">Erreur Cuisson / Brûlé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                    Filière d'Élimination :
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="Biodéchets Dédiés">Bac Biodéchets Dédié</option>
                    <option value="Destruction Volontaire">Destruction Volontaire Immédiate</option>
                  </select>
                </div>
              </div>

              {/* Photo Proof (Camera or Gallery) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                  Photo de Preuve (Optionnel) :
                </label>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-amber-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Prendre Photo</span>
                  </button>
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Galerie
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />

                  {photoUrl && (
                    <div className="w-10 h-10 rounded-xl bg-slate-800 overflow-hidden border border-emerald-500 shrink-0 relative">
                      <img src={photoUrl} alt="Aperçu" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotoUrl(undefined)}
                        className="absolute inset-0 bg-slate-950/70 text-rose-400 flex items-center justify-center text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
                  Commentaire / Justification (Optionnel) :
                </label>
                <input
                  type="text"
                  placeholder="Ex: Problème chambre de pousse, décongelé non utilisé..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit / Cancel buttons */}
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
                  Valider la Destruction
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {previewModalImg && (
        <div
          onClick={() => setPreviewModalImg(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer animate-in fade-in"
        >
          <div className="relative max-w-xl max-h-[85vh]">
            <img src={previewModalImg.url} alt={previewModalImg.title} className="rounded-2xl max-h-[80vh] w-auto object-contain border border-slate-700 shadow-2xl" />
            <span className="block text-center text-xs text-slate-400 mt-2 font-bold">{previewModalImg.title} • Cliquer pour fermer</span>
          </div>
        </div>
      )}

    </div>
  );
};
