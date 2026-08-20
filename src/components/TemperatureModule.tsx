import React, { useState, useRef } from 'react';
import type { TemperatureTarget, TemperatureRecord, User } from '../types';
import {
  Thermometer,
  Snowflake,
  Plus,
  Trash2,
  Camera,
  CalendarCheck,
  CheckCircle2,
  X,
} from 'lucide-react';
import { compressImage } from '../services/imageStorage';

interface TemperatureModuleProps {
  targets: TemperatureTarget[];
  records?: TemperatureRecord[];
  currentUser?: User;
  onAddRecord: (targetId: string, tempValue: number, correctiveAction?: string, customOperatorName?: string) => void;
  onAddEquipment?: (newEquipment: Omit<TemperatureTarget, 'id' | 'status'>) => void;
  onUpdateEquipment?: (id: string, updates: Partial<TemperatureTarget>) => void;
  onDeleteEquipment?: (id: string) => void;
  onClearAllEquipment?: () => void;
}

export const TemperatureModule: React.FC<TemperatureModuleProps> = ({
  targets,
  currentUser,
  onAddRecord,
  onAddEquipment,
  onUpdateEquipment,
  onDeleteEquipment,
}) => {
  // Modals
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [selectedTarget, setSelectedTarget] = useState<TemperatureTarget | null>(null);

  // Target for on-card photo upload
  const [uploadingTargetId, setUploadingTargetId] = useState<string | null>(null);

  // Manual Log form
  const [tempInput, setTempInput] = useState<string>('3.0');
  const [correctiveAction, setCorrectiveAction] = useState<string>('');

  // Add Equipment form (Adel B only)
  const [newEqName, setNewEqName] = useState<string>('');
  const [newEqZone, setNewEqZone] = useState<'Fournil' | 'Pâtisserie' | 'Boutique' | 'Réserve'>('Fournil');
  const [newEqType, setNewEqType] = useState<'froid_positif' | 'froid_negatif' | 'chambre_pousse' | 'vitrine'>('froid_positif');
  const [newEqMinTemp, setNewEqMinTemp] = useState<number>(0);
  const [newEqMaxTemp, setNewEqMaxTemp] = useState<number>(4);
  const [newEqPhoto, setNewEqPhoto] = useState<string | undefined>(undefined);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Refs for file uploads
  const addFridgePhotoInputRef = useRef<HTMLInputElement>(null);
  const cardPhotoInputRef = useRef<HTMLInputElement>(null);
  const editLogPhotoInputRef = useRef<HTMLInputElement>(null);

  // Check if current user is strictly Adel B
  const isAdmin =
    currentUser?.id === 'u_adel' ||
    currentUser?.name === 'Adel B' ||
    currentUser?.name?.trim().toLowerCase().startsWith('adel');

  // Check 1 time per day status
  const isCheckedToday = (target: TemperatureTarget): boolean => {
    if (!target.lastChecked || target.currentTemp === undefined) return false;
    const checkDate = new Date(target.lastChecked).toDateString();
    const today = new Date().toDateString();
    return checkDate === today;
  };

  const checkedCount = targets.filter(isCheckedToday).length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTypeSelect = (type: 'froid_positif' | 'froid_negatif' | 'chambre_pousse' | 'vitrine') => {
    setNewEqType(type);
    if (type === 'froid_positif') {
      setNewEqMinTemp(0);
      setNewEqMaxTemp(4);
    } else if (type === 'froid_negatif') {
      setNewEqMinTemp(-22);
      setNewEqMaxTemp(-18);
    } else if (type === 'chambre_pousse') {
      setNewEqMinTemp(10);
      setNewEqMaxTemp(18);
    } else if (type === 'vitrine') {
      setNewEqMinTemp(2);
      setNewEqMaxTemp(4);
    }
  };

  // Upload photo during creation
  const handleAddFridgePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.8 });
      setNewEqPhoto(compressed);
    } catch (err) {
      console.error('Failed to compress fridge photo', err);
    }
  };

  // Upload photo directly from the card (when created without photo)
  const handleCardPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingTargetId || !onUpdateEquipment) return;
    try {
      const compressed = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.8 });
      onUpdateEquipment(uploadingTargetId, { photoUrl: compressed });
      showToast('✓ Photo du frigo enregistrée !');
      setUploadingTargetId(null);
    } catch (err) {
      console.error('Failed to compress fridge photo', err);
    }
  };

  // Upload photo from inside log modal
  const handleEditLogPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedTarget || !onUpdateEquipment) return;
    try {
      const compressed = await compressImage(file, { maxWidth: 1000, maxHeight: 1000, quality: 0.8 });
      onUpdateEquipment(selectedTarget.id, { photoUrl: compressed });
      setSelectedTarget((prev) => (prev ? { ...prev, photoUrl: compressed } : null));
      showToast('✓ Photo mise à jour !');
    } catch (err) {
      console.error('Failed to compress fridge photo', err);
    }
  };

  // Submit New Equipment (Adel B only)
  const handleCreateEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEqName.trim()) {
      alert('Veuillez renseigner le nom du frigo ou congélateur.');
      return;
    }

    if (onAddEquipment) {
      onAddEquipment({
        name: newEqName.trim(),
        zone: newEqZone,
        type: newEqType,
        minTemp: Number(newEqMinTemp),
        maxTemp: Number(newEqMaxTemp),
        photoUrl: newEqPhoto,
      });
    }

    setNewEqName('');
    setNewEqPhoto(undefined);
    setShowAddModal(false);
    showToast(`✓ ${newEqName} ajouté !`);
  };

  const openLogModal = (target: TemperatureTarget) => {
    setSelectedTarget(target);
    const hasTodayCheck = isCheckedToday(target);
    setTempInput(
      hasTodayCheck && target.currentTemp !== undefined
        ? target.currentTemp.toString()
        : ((target.minTemp + target.maxTemp) / 2).toFixed(1)
    );
    setCorrectiveAction('');
    setShowLogModal(true);
  };

  const handleSaveManualLog = () => {
    if (!selectedTarget) return;
    const val = parseFloat(tempInput);
    if (isNaN(val)) return;

    const isAlert = val < selectedTarget.minTemp || val > selectedTarget.maxTemp;
    if (isAlert && !correctiveAction.trim()) {
      alert('⚠️ Température hors norme : veuillez indiquer une action corrective.');
      return;
    }

    const opName = currentUser?.name || 'Sonde IoT Autonome (EN 12830)';
    onAddRecord(selectedTarget.id, val, correctiveAction, opName);
    setShowLogModal(false);
    showToast(`✓ Relevé du jour validé pour ${selectedTarget.name}`);
  };

  const isCurrentInputAlert = selectedTarget
    ? parseFloat(tempInput) < selectedTarget.minTemp || parseFloat(tempInput) > selectedTarget.maxTemp
    : false;

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-24 animate-in fade-in duration-150 px-1 sm:px-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-slate-950 text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for On-Card Photo Upload */}
      <input
        ref={cardPhotoInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCardPhotoUpload}
      />

      {/* ================= 1. Shift Header Bar (Clean, Grid-Aligned, Mobile First) ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          
          {/* Left: Icon + Title & Progress Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-inner">
              <CalendarCheck className="w-5 h-5 text-amber-400" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight whitespace-nowrap">
                  Relevés Frigos
                </h2>
                {targets.length > 0 && (
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0 shadow-xs ${
                      checkedCount === targets.length
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {checkedCount === targets.length ? 'Complet ✓' : `${targets.length - checkedCount} à relever`}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                {checkedCount}/{targets.length} appareils vérifiés aujourd'hui • 1x / jour
              </p>
            </div>
          </div>

          {/* Right Actions: Add Fridge (Adel B only) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="h-10 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
                title="Ajouter un frigo ou congélateur"
              >
                <Plus className="w-4 h-4 stroke-[3] shrink-0" />
                <span>Nouveau Frigo</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ================= 2. Grid of Fridge Cards ================= */}
      {targets.length === 0 ? (
        /* Empty State */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white space-y-4 my-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
            <Thermometer className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Aucun frigo ou congélateur</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              {isAdmin
                ? "Vous êtes connecté avec le profil Adel B (Admin). Ajoutez vos équipements de froid pour commencer les relevés quotidiens."
                : "Connectez-vous avec Adel B pour ajouter vos frigos et congélateurs."}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Ajouter mon premier Frigo / Congélateur</span>
            </button>
          )}
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-3.5">
          {targets.map((target) => {
            const isNegative = target.type === 'froid_negatif';
            const isChecked = isCheckedToday(target);
            const isAlert = target.status === 'alerte';

            return (
              <div
                key={target.id}
                onClick={() => openLogModal(target)}
                className={`bg-slate-900 hover:bg-slate-850 border rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer active:scale-97 group shadow-sm ${
                  isAlert
                    ? 'border-rose-500/60 ring-2 ring-rose-500/20 bg-rose-950/20'
                    : isChecked
                    ? 'border-emerald-500/40 bg-slate-900'
                    : 'border-slate-800 hover:border-amber-500/40'
                }`}
              >
                {/* 1. Image Preview Section (Top) */}
                <div className="relative h-28 sm:h-32 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80 flex items-center justify-center">
                  {target.photoUrl ? (
                    <img
                      src={target.photoUrl}
                      alt={target.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/90 text-slate-500 p-2 text-center">
                      {isNegative ? (
                        <Snowflake className="w-8 h-8 text-blue-400/80 mb-1" />
                      ) : (
                        <Thermometer className="w-8 h-8 text-amber-400/80 mb-1" />
                      )}
                      
                      {/* If Adel B and no photo: Camera upload button directly on the card */}
                      {isAdmin ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadingTargetId(target.id);
                            cardPhotoInputRef.current?.click();
                          }}
                          className="mt-1 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                          title="Prendre ou ajouter la photo maintenant"
                        >
                          <Camera className="w-3 h-3" />
                          <span>+ Photo</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-medium">Sans Photo</span>
                      )}
                    </div>
                  )}

                  {/* Top-Left Badge: Type & Max Norm */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg backdrop-blur-md shadow-xs ${
                        isNegative
                          ? 'bg-blue-600/90 text-white'
                          : 'bg-amber-500/95 text-slate-950'
                      }`}
                    >
                      {isNegative ? '❄️ -18°C' : '🧊 +4°C'}
                    </span>
                  </div>

                  {/* Top-Right Delete Button (Adel B Admin only) */}
                  {isAdmin && onDeleteEquipment && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteEquipment(target.id);
                        showToast(`✓ "${target.name}" supprimé !`);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-slate-900/90 hover:bg-rose-600 active:scale-90 text-rose-400 hover:text-white flex items-center justify-center backdrop-blur-xs transition-all cursor-pointer border border-rose-500/30 z-10"
                      title="Supprimer cet appareil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* 2. Body Info Section (Bottom) */}
                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-400 transition-colors truncate">
                      {target.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                      {target.zone}
                    </p>
                  </div>

                  {/* Temperature Display & Status Row */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      {isChecked ? (
                        <span
                          className={`text-base sm:text-lg font-black font-mono leading-none ${
                            isAlert ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {target.currentTemp! > 0 ? `+${target.currentTemp}` : target.currentTemp}°C
                        </span>
                      ) : (
                        <span className="text-xs font-bold font-mono text-slate-500">
                          -- °C
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isChecked
                          ? isAlert
                            ? 'bg-rose-900/40 text-rose-300 border border-rose-800/50'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-slate-800 text-amber-400 border border-slate-700'
                      }`}
                    >
                      {isChecked ? (isAlert ? 'Alerte' : 'Fait ✓') : 'Saisir'}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ================= 3. MODAL: SAISIE DU RELEVÉ DU JOUR ================= */}
      {showLogModal && selectedTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs no-print">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-md overflow-hidden">
                  {selectedTarget.photoUrl ? (
                    <img src={selectedTarget.photoUrl} alt={selectedTarget.name} className="w-full h-full object-cover" />
                  ) : selectedTarget.type === 'froid_negatif' ? (
                    <Snowflake className="w-6 h-6" />
                  ) : (
                    <Thermometer className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    {selectedTarget.zone} • {selectedTarget.minTemp}°C à {selectedTarget.maxTemp}°C
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                    {selectedTarget.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-800">
              
              {/* Temperature Value Input */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Température mesurée (°C) :
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTempInput((prev) => (parseFloat(prev || '0') - 0.5).toFixed(1))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-black flex items-center justify-center transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    step="0.1"
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    className={`flex-1 h-12 px-4 rounded-2xl border text-center font-mono text-2xl font-black focus:outline-none transition-all ${
                      isCurrentInputAlert
                        ? 'border-rose-500 text-rose-600 bg-rose-50 ring-2 ring-rose-500/20'
                        : 'border-slate-300 text-slate-900 bg-slate-50 focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setTempInput((prev) => (parseFloat(prev || '0') + 0.5).toFixed(1))}
                    className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xl font-black flex items-center justify-center transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Alert Warning if out of range */}
              {isCurrentInputAlert && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <span>⚠️ Température non conforme (Norme: {selectedTarget.minTemp}°C à {selectedTarget.maxTemp}°C)</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Action corrective (ex: thermostat réglé, porte refermée...)"
                    value={correctiveAction}
                    onChange={(e) => setCorrectiveAction(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-rose-300 rounded-xl text-xs text-rose-900 placeholder:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              )}

              {/* Adel B: Photo Management inside Modal */}
              {isAdmin && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    Photo du frigo (Adel B) :
                  </span>
                  <button
                    type="button"
                    onClick={() => editLogPhotoInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-600" />
                    <span>{selectedTarget.photoUrl ? 'Changer photo' : '+ Ajouter photo'}</span>
                  </button>
                  <input
                    ref={editLogPhotoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditLogPhotoUpload}
                  />
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 flex-wrap">
              {isAdmin && onDeleteEquipment && (
                <button
                  type="button"
                  onClick={() => {
                    if (selectedTarget) {
                      onDeleteEquipment(selectedTarget.id);
                      setShowLogModal(false);
                      showToast(`✓ "${selectedTarget.name}" supprimé !`);
                    }
                  }}
                  className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={handleSaveManualLog}
                className="flex-1 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black rounded-2xl text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Valider</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= 4. MODAL: AJOUTER UN FRIGO / CONGEL (ADEL B ONLY) ================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs no-print">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500 text-slate-950 rounded-2xl font-black">
                  <Plus className="w-5 h-5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Ajouter un appareil</h3>
                  <p className="text-[11px] text-slate-400">Profil Admin • Adel B</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateEquipment} className="p-5 space-y-4 overflow-y-auto flex-1 text-slate-800">
              
              {/* Nom */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Nom du Frigo / Congélateur * :
                </label>
                <input
                  type="text"
                  required
                  value={newEqName}
                  onChange={(e) => setNewEqName(e.target.value)}
                  placeholder="Ex: Frigo Pâtisserie, Congélateur Pains..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              {/* Type d'appareil */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Type & Norme :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('froid_positif')}
                    className={`p-2.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                      newEqType === 'froid_positif'
                        ? 'bg-amber-50 border-amber-500 text-slate-950 ring-2 ring-amber-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    🧊 Froid Positif (0°C à +4°C)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('froid_negatif')}
                    className={`p-2.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                      newEqType === 'froid_negatif'
                        ? 'bg-blue-50 border-blue-500 text-slate-950 ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    ❄️ Congélateur (-22°C à -18°C)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('vitrine')}
                    className={`p-2.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                      newEqType === 'vitrine'
                        ? 'bg-purple-50 border-purple-500 text-slate-950 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    🍰 Vitrine Magasin (+2°C à +4°C)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeSelect('chambre_pousse')}
                    className={`p-2.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                      newEqType === 'chambre_pousse'
                        ? 'bg-emerald-50 border-emerald-500 text-slate-950 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    🌾 Chambre Pousse (+10°C à +18°C)
                  </button>
                </div>
              </div>

              {/* Zone */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Zone :
                </label>
                <select
                  value={newEqZone}
                  onChange={(e) => setNewEqZone(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800"
                >
                  <option value="Fournil">Fournil (Boulangerie)</option>
                  <option value="Pâtisserie">Laboratoire Pâtisserie</option>
                  <option value="Boutique">Boutique & Vente</option>
                  <option value="Réserve">Réserve & Stockage</option>
                </select>
              </div>

              {/* Photo (Optionnelle - Peut être ajoutée plus tard depuis la carte) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1.5">
                  Photo de l'appareil (Optionnel - Peut être ajoutée plus tard) :
                </label>

                {newEqPhoto ? (
                  <div className="relative rounded-2xl overflow-hidden border border-slate-300 h-28 flex items-center justify-center bg-slate-950">
                    <img src={newEqPhoto} alt="Frigo" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewEqPhoto(undefined)}
                      className="absolute top-2 right-2 bg-rose-600 text-white p-1 rounded-lg text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => addFridgePhotoInputRef.current?.click()}
                    className="w-full p-3 border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-800 cursor-pointer transition-colors"
                  >
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>Prendre photo maintenant (ou plus tard)</span>
                  </button>
                )}

                <input
                  ref={addFridgePhotoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAddFridgePhotoUpload}
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs shadow-md shadow-amber-500/20"
                >
                  + Ajouter l'appareil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom spacer */}
      <div className="h-6" />

    </div>
  );
};
