import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  RefreshCw,
  Smartphone,
  ShieldCheck,
  X,
  Database,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { getActiveStoreId, setActiveStoreId, getDeviceId } from '../services/cloudSync';
import {
  getSupabaseConfig,
  saveSupabaseConfig,
  isSupabaseConfigured,
  SUPABASE_SQL_SCHEMA
} from '../services/supabase';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForceSync: () => void;
  isSyncing: boolean;
  lastSyncedTime: string;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  onForceSync,
  isSyncing,
  lastSyncedTime,
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'supabase'>('supabase');
  const [storeIdInput, setStoreIdInput] = useState<string>(getActiveStoreId());
  
  // Supabase fields
  const initialSupabaseConfig = getSupabaseConfig();
  const [supabaseUrl, setSupabaseUrl] = useState<string>(initialSupabaseConfig.url);
  const [supabaseKey, setSupabaseKey] = useState<string>(initialSupabaseConfig.anonKey);
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);
  const [showSchemaCode, setShowSchemaCode] = useState<boolean>(false);

  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentStoreId = getActiveStoreId();
  const deviceId = getDeviceId();
  const shareableUrl = `${window.location.origin}${window.location.pathname}?sync=${encodeURIComponent(currentStoreId)}`;

  // Quick QR Code generator via standard public safe API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareableUrl)}&bgcolor=0f172a&color=f59e0b&margin=10`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const handleSaveStoreId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeIdInput.trim()) return;
    setActiveStoreId(storeIdInput.trim());
    setSaveToast(`✓ Code boutique mis à jour : "${storeIdInput.trim()}"`);
    setTimeout(() => setSaveToast(null), 3000);
    onForceSync();
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      alert('Veuillez renseigner votre URL Supabase et votre Anon Key.');
      return;
    }

    saveSupabaseConfig(supabaseUrl.trim(), supabaseKey.trim());
    setSaveToast('✓ Connexion Supabase enregistrée avec succès !');
    setTimeout(() => setSaveToast(null), 3000);
    onForceSync();
  };

  const hasSupabase = isSupabaseConfigured();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md no-print overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-white animate-in fade-in zoom-in duration-150 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                Liaison Base de Données & Cloud
              </h3>
              <p className="text-xs text-slate-400">
                Synchronisation Supabase PostgreSQL & Multi-Appareils
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {saveToast && (
          <div className="my-3 p-3 bg-emerald-950/90 border border-emerald-800 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Tab Switcher: Supabase Direct vs QR Code */}
        <div className="grid grid-cols-2 gap-2 mt-4 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'supabase'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>⚡ Supabase Database</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 QR Code Téléphone</span>
          </button>
        </div>

        <div className="py-4 space-y-4">
          
          {/* TAB 1: SUPABASE CONFIGURATION */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              
              {/* Status Pill */}
              <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${hasSupabase ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                    <span className={`text-xs font-bold ${hasSupabase ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {hasSupabase ? 'Supabase Actif & Synchronisé' : 'En attente de vos clés Supabase'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Synchro : <strong className="text-slate-200">{lastSyncedTime || 'En direct'}</strong> • PostgreSQL & Photos
                  </p>
                </div>

                <button
                  onClick={onForceSync}
                  disabled={isSyncing}
                  className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Test...' : 'Tester'}</span>
                </button>
              </div>

              {/* Form Config */}
              <form onSubmit={handleSaveSupabase} className="space-y-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                    <span>1. URL du Projet Supabase :</span>
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Ouvrir Supabase</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://xyzabcdefg.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono placeholder-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    2. Clé Publique (Anon Key) :
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono placeholder-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enregistrer & Connecter Supabase</span>
                </button>
              </form>

              {/* SQL Script in 1-Click */}
              <div className="bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Script SQL d'initialisation (1-Clic) :</span>
                  </span>
                  <button
                    onClick={handleCopySchema}
                    className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold border border-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSchema ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-emerald-400" />
                        <span>Copier le SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-400">
                  Collez ce script dans l'onglet <strong>SQL Editor</strong> de Supabase pour créer automatiquement les 5 tables et le bucket de photos.
                </p>

                <button
                  onClick={() => setShowSchemaCode(!showSchemaCode)}
                  className="text-[10px] text-emerald-400 hover:underline font-mono"
                >
                  {showSchemaCode ? '▲ Masquer le code SQL' : '▼ Voir le code SQL des tables'}
                </button>

                {showSchemaCode && (
                  <pre className="p-3 bg-slate-950 rounded-xl text-[10px] font-mono text-slate-300 max-h-36 overflow-y-auto border border-slate-800 whitespace-pre-wrap">
                    {SUPABASE_SQL_SCHEMA}
                  </pre>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: QR CODE INSTANT PAIRING */}
          {activeTab === 'qr' && (
            <div className="space-y-4">
              
              <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
                  <Smartphone className="w-4 h-4" />
                  <span>Scannez pour connecter votre smartphone :</span>
                </div>

                <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/50 p-2 bg-slate-900 shadow-lg shadow-amber-500/10 flex items-center justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Synchronisation"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>

                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Ouvrez l'appareil photo de votre téléphone et scannez ce QR Code pour accéder au même compte en direct.
                </p>

                {/* Share Link Button */}
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Lien copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copier le lien de synchronisation</span>
                    </>
                  )}
                </button>
              </div>

              {/* Custom Store ID Config */}
              <form onSubmit={handleSaveStoreId} className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Identifiant / Code Boutique partagé :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={storeIdInput}
                    onChange={(e) => setStoreIdInput(e.target.value)}
                    placeholder="Ex: plaisirs-saveurs-principal"
                    className="flex-1 text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono placeholder-slate-600 focus:border-amber-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    Appliquer
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PostgreSQL & Photos sécurisées</span>
          </span>
          <span className="font-mono text-[10px]">Appareil : {deviceId.substring(0, 10)}...</span>
        </div>

      </div>
    </div>
  );
};
