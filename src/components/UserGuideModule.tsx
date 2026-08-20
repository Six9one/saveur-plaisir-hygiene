import React, { useState } from 'react';
import {
  Thermometer,
  Truck,
  Sparkles,
  Tag,
  Bug,
  FileCheck,
  Printer,
  X,
  Clock,
  Maximize2,
  Zap,
  Camera,
  Check,
  Award,
  Users,
  Smartphone,
} from 'lucide-react';

// Guide infographics assets
import guideTemp from '../assets/guide/guide_temperature.jpg';
import guideReception from '../assets/guide/guide_reception.jpg';
import guideCleaning from '../assets/guide/guide_cleaning.jpg';
import guideDlc from '../assets/guide/guide_dlc.jpg';
import adelAvatar from '../assets/avatars/adel_b.jpg';
import baderAvatar from '../assets/avatars/bader_l.jpg';
import hamzaAvatar from '../assets/avatars/hamza_m.jpg';

interface UserGuideModuleProps {
  onClose?: () => void;
}

export const UserGuideModule: React.FC<UserGuideModuleProps> = ({ onClose }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<
    'antiflemme' | 'temperature' | 'reception' | 'cleaning' | 'dlc' | 'pest' | 'audit'
  >('antiflemme');

  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const guideTabs = [
    {
      id: 'antiflemme',
      label: '⚡ Routine Express',
      sublabel: 'Guide Anti-Flemme',
      icon: Zap,
      color: 'text-amber-400',
      badge: '3 min / jour',
    },
    {
      id: 'temperature',
      label: 'Températures',
      sublabel: 'Relevés frigos',
      icon: Thermometer,
      color: 'text-amber-400',
      badge: '2 clics',
    },
    {
      id: 'reception',
      label: 'Réceptions',
      sublabel: 'Photo BL & Lots',
      icon: Truck,
      color: 'text-blue-400',
      badge: '1 photo',
    },
    {
      id: 'cleaning',
      label: 'Nettoyage',
      sublabel: 'Checklist zones',
      icon: Sparkles,
      color: 'text-emerald-400',
      badge: '1 clic/tâche',
    },
    {
      id: 'dlc',
      label: 'DLC Secondaires',
      sublabel: 'Calcul J+3',
      icon: Tag,
      color: 'text-pink-400',
      badge: 'Auto J+3',
    },
    {
      id: 'pest',
      label: 'Nuisibles 3D',
      sublabel: 'EDEN VERT 3D',
      icon: Bug,
      color: 'text-purple-400',
      badge: 'Factures & Contrat',
    },
    {
      id: 'audit',
      label: 'Contrôle DDPP',
      sublabel: 'En cas d’inspection',
      icon: FileCheck,
      color: 'text-teal-400',
      badge: '1 clic PDF',
    },
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24 px-2 sm:px-0 animate-in fade-in duration-200">
      
      {/* ================= TOP HERO BANNER ================= */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-4 sm:p-6 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 font-black">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Guide d'Utilisation de l'App • Mode Rapide
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Zéro Papier • 100% Facile
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Fini les paperasses compliquées : voici exactement sur quels boutons appuyer pour faire le travail en moins de 30 secondes !
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer Fiche A4 (Fournil)</span>
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ================= NAVIGATION PILLS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {guideTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGuideTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGuideTab(tab.id as any)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-black scale-[1.02]'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 font-bold'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : tab.color}`} />
              <span className="text-xs font-bold leading-tight">{tab.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold truncate max-w-full ${
                  isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-950 text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 0. TAB: ROUTINE EXPRESS ANTI-FLEMME ================= */}
      {activeGuideTab === 'antiflemme' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Card: Le Défi 3 Minutes par Jour */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h2 className="text-sm font-black text-white uppercase tracking-wider">
                    La Routine d'un Boulanger en 3 Clics par Jour
                  </h2>
                  <p className="text-xs text-slate-400">Pourquoi cette application est la plus rapide du monde pour l'équipe :</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Moment 1 : Matin */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    🌅 MATIN (6h30)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">15 sec chrono</span>
                </div>
                <h3 className="text-xs font-black text-white">Relevés de Frigos</h3>
                <p className="text-[11px] text-slate-300">
                  1. Ouvre l'onglet <strong>Relevés</strong>.<br />
                  2. Clique sur <strong>« Valider Tout (RAS) »</strong> ou note les T° affichées sur les cadrans.
                </p>
                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-1.5 rounded-lg text-center">
                  ✓ Fait pour la demi-journée !
                </div>
              </div>

              {/* Moment 2 : Livraison */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20">
                    🚚 LIVRAISON (10h00)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">20 sec chrono</span>
                </div>
                <h3 className="text-xs font-black text-white">Le livreur arrive</h3>
                <p className="text-[11px] text-slate-300">
                  1. Ouvre l'onglet <strong>Réception</strong>.<br />
                  2. Prends en photo le bon papier avec l'appareil photo.<br />
                  3. Clique sur <strong>Valider</strong>.
                </p>
                <div className="text-[10px] text-blue-400 font-bold bg-blue-500/10 p-1.5 rounded-lg text-center">
                  ✓ Zéro archivage papier à classer !
                </div>
              </div>

              {/* Moment 3 : Soir */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                    🌙 SOIR (18h30)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">20 sec chrono</span>
                </div>
                <h3 className="text-xs font-black text-white">Nettoyage & Clôture</h3>
                <p className="text-[11px] text-slate-300">
                  1. Ouvre l'onglet <strong>Nettoyage</strong>.<br />
                  2. Coche les cases du pétrin et du fournil lavés.<br />
                  3. C'est signé avec ton nom !
                </p>
                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 p-1.5 rounded-lg text-center">
                  ✓ Dossier 100% à jour pour la DDPP !
                </div>
              </div>

            </div>
          </div>

          {/* Team Switcher Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Comment changer d'utilisateur (Adel, Bader, Hamza) ?
              </h3>
            </div>
            
            <p className="text-xs text-slate-300">
              En haut à droite de l'écran (ou en bas sur mobile), cliquez sur votre photo ou nom pour choisir votre profil :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                  <img src={adelAvatar} alt="Adel" className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="text-xs text-white block">Adel B.</strong>
                  <span className="text-[10px] text-slate-400">Responsable / Gérant</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
                  <img src={baderAvatar} alt="Bader" className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="text-xs text-white block">Bader L.</strong>
                  <span className="text-[10px] text-slate-400">Chef Boulanger</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
                  <img src={hamzaAvatar} alt="Hamza" className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="text-xs text-white block">Hamza M.</strong>
                  <span className="text-[10px] text-slate-400">Pâtissier / Opérateur</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= 1. TAB: TEMPÉRATURES TUTO EXACT ================= */}
      {activeGuideTab === 'temperature' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>Infographie Officielle : Relevés de Température</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideTemp)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Agrandir</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideTemp)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-amber-500 transition-all shadow-inner"
            >
              <img src={guideTemp} alt="Guide Température" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Exact App Screen Walkthrough */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Comment faire sur l'écran « Relevés » ? (Tuto Écran par Écran)</span>
            </h3>

            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-white block font-bold">Ouvrez l'onglet « Relevés »</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Dans le menu du haut ou du bas, cliquez sur l'icône thermomètre <strong>Relevés</strong>. Vous voyez vos 4 équipements : *Chambre Froide Positive, Tour Pâtissier, Vitrine Magasin, Congélateur*.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-white block font-bold">Option Super-Rapide : Le bouton « Valider Matin »</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Si vos frigos fonctionnent normalement (entre 0°C et 4°C), cliquez simplement sur le gros bouton vert <strong>« Valider (RAS) »</strong>. La température conforme par défaut (ex: 2.8°C) est enregistrée avec votre prénom et l'heure exacte.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-white block font-bold">Option Précise : Saisir un chiffre exact</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Cliquez sur le carré du frigo (ex: Chambre Froide), tapez la valeur vue sur le cadran (ex: <strong>3.2</strong>) et cliquez sur <strong>Enregistrer</strong>. Le voyant passe au vert direct !
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= 2. TAB: RÉCEPTION MARCHANDISES TUTO ================= */}
      {activeGuideTab === 'reception' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Infographie Officielle : Réception Marchandises</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideReception)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Agrandir</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideReception)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-blue-500 transition-all shadow-inner"
            >
              <img src={guideReception} alt="Guide Réception" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Exact Walkthrough */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>Comment faire quand le camion de livraison arrive ?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-blue-400 font-bold block">Étape 1 : Photo du BL</strong>
                <p className="text-slate-300 text-[11px]">
                  Clique sur <strong>« Nouvelle Réception »</strong> puis sur le bouton <strong>Prendre Photo</strong> pour photographier le bon de livraison papier.
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-blue-400 font-bold block">Étape 2 : Nom & Température</strong>
                <p className="text-slate-300 text-[11px]">
                  Sélectionne le fournisseur dans la liste (ex: *Moulins Soufflet, BackEurop, Transgourmet*) et note la T° du camion (ex: 3°C).
                </p>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-emerald-400 font-bold block">Étape 3 : C'est archivé !</strong>
                <p className="text-slate-300 text-[11px]">
                  Clique sur <strong>Valider Réception</strong>. Le bon est enregistré dans le cloud et consultable à tout moment en cas d'audit !
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ================= 3. TAB: NETTOYAGE TUTO ================= */}
      {activeGuideTab === 'cleaning' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Infographie Officielle : Plan de Nettoyage (PND)</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideCleaning)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Agrandir</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideCleaning)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500 transition-all shadow-inner"
            >
              <img src={guideCleaning} alt="Guide Nettoyage" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* Cleaning Fast Guide */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Comment valider le nettoyage en 15 secondes le soir ?</span>
            </h3>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <p className="text-slate-300">
                1. Va sur l'onglet <strong>Nettoyage</strong>.<br />
                2. Les tâches du jour sont affichées (ex : *Cuve Pétrin, Tapis Enfourneur, Trancheuse à pain, Sols*).<br />
                3. Clique sur la case à cocher à droite de chaque tâche effectuée.<br />
                4. La barre de progression passe à <strong>100% ✓</strong> et ton nom est enregistré comme signataire officiel.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ================= 4. TAB: DLC SECONDAIRES TUTO ================= */}
      {activeGuideTab === 'dlc' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-black text-pink-400 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Infographie Officielle : Dates Limites après Ouverture</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideDlc)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Agrandir</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideDlc)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-pink-500 transition-all shadow-inner"
            >
              <img src={guideDlc} alt="Guide DLC" className="w-full h-auto object-cover" />
            </div>
          </div>

          {/* DLC Easy Walkthrough */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-pink-400" />
              <span>Pourquoi c'est magique sur l'application ?</span>
            </h3>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <p className="text-slate-300">
                Vous n'avez aucun calcul de date à faire dans votre tête !<br />
                1. Cliquez sur <strong>« Nouvel Ingrédient Entamé »</strong>.<br />
                2. Choisissez le produit (ex: *Crème Pâtissière, Lait, Beurre*).<br />
                3. L'application calcule automatiquement : <strong>Date d'aujourd'hui + 3 jours = Date Limite</strong>.<br />
                4. Recopiez simplement cette date sur le bac ou imprimez l'étiquette.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ================= 5. TAB: NUISIBLES EDEN VERT 3D ================= */}
      {activeGuideTab === 'pest' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-black text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  <span>Module Nuisibles & EDEN VERT 3D : Comment ça marche ?</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Tout est centralisé dans l'onglet « Nuisibles » pour une transparence totale.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-purple-400 font-bold block text-sm">1. Les 3 Factures en 1 Clic</strong>
                <p className="text-slate-300 text-[11px]">
                  Allez sur le sous-onglet <strong>« Factures »</strong>. Vous avez vos 3 factures officielles de 162 € TTC (`F76-26-01207`, `F76-26-00642`, `F76-25-01041`). Cliquez sur <strong>Visualiser la Facture</strong> pour voir le document officiel avec bouton d'impression direct.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-emerald-400 font-bold block text-sm">2. L'Historique des Passages</strong>
                <p className="text-slate-300 text-[11px]">
                  Allez sur le sous-onglet <strong>« Passages »</strong>. Retrouvez toutes les dates d'intervention de **Jérémy CLAIRE** (Certibiocide), les actions faites et la prochaine visite planifiée au **08/09/2026**.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-sky-400 font-bold block text-sm">3. Les 4 Postes d'Appâtage</strong>
                <p className="text-slate-300 text-[11px]">
                  Suivez les boîtes PVC `P-01`, `P-02`, `P-03`, `P-04` et le désinsectiseur `UV-01`. Cliquez sur <strong>Contrôler</strong> pour valider l'état « Intact (RAS) ».
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <strong className="text-amber-400 font-bold block text-sm">4. Le Contrat Signé 2 Pages</strong>
                <p className="text-slate-300 text-[11px]">
                  Allez sur le sous-onglet <strong>« Contrat Signé »</strong> pour feuilleter les 2 pages du contrat original `CH-25-97` avec accord et signatures.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ================= 6. TAB: CONTRÔLE DDPP TUTO ================= */}
      {activeGuideTab === 'audit' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-teal-500/30 rounded-3xl p-5 shadow-lg text-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-400" />
                <h3 className="text-sm font-black text-teal-400 uppercase tracking-wider">
                  L'Inspecteur Sanitaire arrive : La Procédure en 10 Secondes Chrono
                </h3>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-teal-500/40 space-y-3 text-xs">
              <p className="text-slate-200 font-bold text-sm">
                Pas de stress ! Vous avez le dossier sanitaire le plus complet et moderne de Normandie :
              </p>

              <ol className="list-decimal list-inside space-y-2 text-slate-300">
                <li>Ouvrez l'application sur votre smartphone ou la tablette du comptoir.</li>
                <li>Cliquez sur l'onglet doré <strong>« Historique & PDF »</strong>.</li>
                <li>Cliquez sur le bouton doré <strong>« 📄 Générer Dossier Officiel DDPP »</strong>.</li>
                <li>Le rapport complet de 6 pages s'affiche avec tous vos relevés, les nettoyages signés, les BL fournisseurs, et le contrat EDEN VERT 3D.</li>
                <li>Cliquez sur <strong>« 🖨️ Imprimer le Dossier »</strong> ou tendez la tablette à l'inspecteur !</li>
              </ol>
            </div>
          </div>

        </div>
      )}

      {/* ================= FULLSCREEN IMAGE MODAL ================= */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setFullScreenImage(null)}
              className="absolute top-2 right-2 z-10 w-9 h-9 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 flex items-center justify-center cursor-pointer border border-slate-700 shadow-xl"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={fullScreenImage}
              alt="Infographie Agrandie"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain border border-slate-800 shadow-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default UserGuideModule;
