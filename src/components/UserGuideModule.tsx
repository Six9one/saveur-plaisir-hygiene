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
  HelpCircle,
  Clock,
  AlertOctagon,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

// Guide infographics assets
import guideTemp from '../assets/guide/guide_temperature.jpg';
import guideReception from '../assets/guide/guide_reception.jpg';
import guideCleaning from '../assets/guide/guide_cleaning.jpg';
import guideDlc from '../assets/guide/guide_dlc.jpg';
import contractP1 from '../assets/contract_edenvert_p1.jpg';

interface UserGuideModuleProps {
  onClose?: () => void;
}

export const UserGuideModule: React.FC<UserGuideModuleProps> = ({ onClose }) => {
  const [activeGuideTab, setActiveGuideTab] = useState<
    'temperature' | 'reception' | 'cleaning' | 'dlc' | 'pest' | 'audit'
  >('temperature');

  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const guideTabs = [
    {
      id: 'temperature',
      label: 'Températures',
      icon: Thermometer,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      badge: '2x / jour',
    },
    {
      id: 'reception',
      label: 'Réceptions',
      icon: Truck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      badge: 'À chaque livraison',
    },
    {
      id: 'cleaning',
      label: 'Nettoyage',
      icon: Sparkles,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      badge: 'Quotidien',
    },
    {
      id: 'dlc',
      label: 'DLC Secondaires',
      icon: Tag,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      badge: 'À l’ouverture',
    },
    {
      id: 'pest',
      label: 'Nuisibles & 3D',
      icon: Bug,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      badge: 'Contrat Actif',
    },
    {
      id: 'audit',
      label: 'Contrôle DDPP',
      icon: FileCheck,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      badge: 'En 1 Clic',
    },
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24 px-2 sm:px-0 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white tracking-tight">
                  Guide d'Utilisation & Fiches Pratiques
                </h1>
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Équipe Fournil & Labo
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Explications pas-à-pas avec infographies pour maîtriser chaque module HACCP en 3 étapes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Imprimer Fiche A4</span>
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

      {/* Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
        {guideTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeGuideTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGuideTab(tab.id as any)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 font-bold'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : tab.color}`} />
              <span className="text-xs">{tab.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-slate-950 text-amber-400' : 'bg-slate-950 text-slate-400'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 1. GUIDE TEMPÉRATURES ================= */}
      {activeGuideTab === 'temperature' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>Infographie : Guide Journalier des Températures</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideTemp)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Plein écran</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideTemp)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-amber-500/50 transition-all shadow-inner group relative"
            >
              <img src={guideTemp} alt="Guide Températures" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍 Cliquez pour agrandir l'infographie
                </span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Relevé Matin & Soir
              </h3>
              <p className="text-xs text-slate-300">
                À la prise de poste le matin et en fin de journée, effectuez la mesure avec le thermomètre étalonné.
              </p>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono">
                • Chambre Froide : <strong>0°C à 4°C</strong><br />
                • Congélateur : <strong>-18°C</strong>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <Thermometer className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Saisie sur l'App
              </h3>
              <p className="text-xs text-slate-300">
                Dans l'onglet <strong>Relevés</strong>, entrez la valeur ou cliquez directement sur le bouton de validation rapide.
              </p>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[11px] text-emerald-400 font-bold">
                ✓ Vert = Conforme HACCP<br />
                ⚠️ Rouge = Alerte Température
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-red-500 text-white font-black text-xs flex items-center justify-center">
                  !
                </span>
                <AlertOctagon className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Action si Alerte
              </h3>
              <p className="text-xs text-slate-300">
                Si une température dépasse <strong>+6°C</strong> :
              </p>
              <div className="bg-red-950/40 p-2 rounded-xl border border-red-500/30 text-[11px] text-red-300">
                1. Vérifier la fermeture de la porte.<br />
                2. Transférer les denrées sensibles.<br />
                3. Prévenir Adel B. ou le technicien froid.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ================= 2. GUIDE RÉCEPTION MARCHANDISES ================= */}
      {activeGuideTab === 'reception' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Infographie : Guide Réception Marchandises</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideReception)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Plein écran</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideReception)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-blue-500/50 transition-all shadow-inner group relative"
            >
              <img src={guideReception} alt="Guide Réception" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍 Cliquez pour agrandir l'infographie
                </span>
              </div>
            </div>
          </div>

          {/* 3 Step Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <span className="w-7 h-7 rounded-xl bg-blue-500 text-slate-950 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Vérification Camion
              </h3>
              <p className="text-xs text-slate-300">
                Contrôlez l'état général des cartons (farine, levure, beurre, crème), l'absence de déchirure et la propreté du camion frigorifique.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <span className="w-7 h-7 rounded-xl bg-blue-500 text-slate-950 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Photo du Bon de Livraison (BL)
              </h3>
              <p className="text-xs text-slate-300">
                Prenez une photo nette du BL fourni par le livreur (ex: Minoterie, BackEurop, Transgourmet) directement avec votre téléphone.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 text-white shadow-md">
              <span className="w-7 h-7 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Validation & Traçabilité
              </h3>
              <p className="text-xs text-slate-300">
                Saisissez le fournisseur et la température constatée. Cliquez sur <strong>Valider Réception</strong>. Le BL est archivé pour la DDPP.
              </p>
            </div>

          </div>

        </div>
      )}

      {/* ================= 3. GUIDE PLAN DE NETTOYAGE ================= */}
      {activeGuideTab === 'cleaning' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Infographie : Plan de Nettoyage & Sanitaire</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideCleaning)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Plein écran</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideCleaning)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-emerald-500/50 transition-all shadow-inner group relative"
            >
              <img src={guideCleaning} alt="Guide Nettoyage" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍 Cliquez pour agrandir l'infographie
                </span>
              </div>
            </div>
          </div>

          {/* Cleaning Zones & Routine */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-white">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              📋 Répartition des Tâches par Zone
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-emerald-400 block font-bold">1. Fournil & Pétrin</strong>
                <p className="text-slate-300 text-[11px]">
                  • Raclage et lavage cuve pétrin.<br />
                  • Brossage tapis enfourneur.<br />
                  • Balayage et lavage des sols.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-sky-400 block font-bold">2. Pâtisserie & Labo</strong>
                <p className="text-slate-300 text-[11px]">
                  • Désinfection plans de travail inox.<br />
                  • Nettoyage batteur, fouets & douilles.<br />
                  • Nettoyage poignées et joints frigos.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <strong className="text-purple-400 block font-bold">3. Vente & Trancheuse</strong>
                <p className="text-slate-300 text-[11px]">
                  • Aspiration miettes trancheuse.<br />
                  • Désinfection lame avec produit agréé.<br />
                  • Nettoyage vitrine et comptoir.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-amber-400 font-bold">💡 Astuce :</span>
              <span>Dans l'onglet <strong>Nettoyage</strong>, cochez chaque tâche terminée. La signature numérique de l'opérateur s'enregistre automatiquement.</span>
            </div>
          </div>

        </div>
      )}

      {/* ================= 4. GUIDE DLC SECONDAIRES ================= */}
      {activeGuideTab === 'dlc' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Infographic Poster */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 overflow-hidden shadow-lg">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-black text-pink-400 uppercase tracking-wider flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>Infographie : Comprendre les DLC Secondaires</span>
              </span>
              <button
                type="button"
                onClick={() => setFullScreenImage(guideDlc)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Plein écran</span>
              </button>
            </div>

            <div
              onClick={() => setFullScreenImage(guideDlc)}
              className="rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-pink-500/50 transition-all shadow-inner group relative"
            >
              <img src={guideDlc} alt="Guide DLC Secondaires" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  🔍 Cliquez pour agrandir l'infographie
                </span>
              </div>
            </div>
          </div>

          {/* DLC Golden Rules */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 text-white">
            <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider">
              ⏱️ Règle d'Or des DLC après Ouverture en Boulangerie-Pâtisserie
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <strong className="text-pink-400 block font-bold text-sm">J + 3</strong>
                <span className="text-[11px] text-slate-300 block mt-1">Crème Pâtissière & Crème anglaise</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <strong className="text-amber-400 block font-bold text-sm">J + 3</strong>
                <span className="text-[11px] text-slate-300 block mt-1">Briques de Lait & Crème liquide</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <strong className="text-blue-400 block font-bold text-sm">J + 5</strong>
                <span className="text-[11px] text-slate-300 block mt-1">Garnitures salées & Viandes cuites</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <strong className="text-emerald-400 block font-bold text-sm">J + 7</strong>
                <span className="text-[11px] text-slate-300 block mt-1">Beurre entamé & Coulis fruits</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Dès l'ouverture d'un produit, saisissez-le dans l'onglet <strong>DLC Secondaires</strong>. L'application calcule automatiquement la date limite et alerte si un produit doit être utilisé en priorité !
            </p>
          </div>

        </div>
      )}

      {/* ================= 5. GUIDE NUISIBLES & EDEN VERT 3D ================= */}
      {activeGuideTab === 'pest' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-black text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Bug className="w-4 h-4" />
                  <span>Protocole Anti-Nuisibles • Société EDEN VERT 3D</span>
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Contrat <strong>CH-25-97</strong> • Technicien Référent : <strong>Jérémy CLAIRE</strong> (02.35.03.84.59)
                </p>
              </div>

              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 uppercase self-start sm:self-auto">
                ✓ 100% Conforme DDPP
              </span>
            </div>

            {/* 3 Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <strong className="text-purple-400 font-bold block">1. Postes d'Appâtage (P-01 à P-04)</strong>
                <p className="text-slate-300 text-[11px]">
                  Les boîtes PVC fermées à clé sont disposées en Sas, Fournil et Cuisine. Ne jamais les déplacer.
                </p>
                <span className="text-[10px] text-emerald-400 font-bold block">Contrôle régulier : RAS</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <strong className="text-amber-400 font-bold block">2. Visites Trimestrielles (4/an)</strong>
                <p className="text-slate-300 text-[11px]">
                  Le technicien Certibiocide contrôle tous les appâts, applique le gel anti-blattes et délivre le bon de passage.
                </p>
                <span className="text-[10px] text-slate-400 font-mono block">Prochain : 08/09/2026</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
                <strong className="text-sky-400 font-bold block">3. Factures & Contrat Signé</strong>
                <p className="text-slate-300 text-[11px]">
                  Toutes les factures (162,00 € TTC) et le contrat signé 2 pages sont consultables et imprimables en 1 clic.
                </p>
                <span className="text-[10px] text-amber-400 font-bold block">Sous-onglets Factures & Contrat</span>
              </div>

            </div>

            {/* Contract quick preview */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={contractP1} alt="Contrat" className="w-12 h-14 object-cover rounded-lg border border-slate-700" />
                <div>
                  <strong className="text-white block">Contrat Officiel Signé Disponible</strong>
                  <span className="text-[11px] text-slate-400">Prestations rodonticides & insecticides certifiées conformes HACCP.</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveGuideTab('audit')}
                className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Voir Registres</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ================= 6. GUIDE CONTRÔLE SANITAIRE DDPP ================= */}
      {activeGuideTab === 'audit' && (
        <div className="space-y-4 animate-in fade-in">
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg text-white space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-black text-teal-400 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  <span>Procédure « En Cas de Contrôle DDPP / Vétérinaire »</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comment réagir sereinement et présenter le dossier sanitaire complet en 10 secondes chrono.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-teal-500/30 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-white font-bold block">Accueil de l'Inspecteur</strong>
                  <span className="text-slate-300 text-[11px]">
                    Présentez-vous poliment (Adel, Bader ou responsable présent). Proposez une blouse propre et un calot avant d'accéder au laboratoire.
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-teal-500/30 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-white font-bold block">Ouvrir l'onglet « Audit & Registres »</strong>
                  <span className="text-slate-300 text-[11px]">
                    Dans l'application, cliquez sur <strong>Audit & Registres</strong>. Vous y trouvez tous les relevés de températures, l'archivage des réceptions, le plan de nettoyage et le dossier EDEN VERT 3D.
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-teal-500/30 flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-teal-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-white font-bold block">Générer le Dossier Officiel Imprimable</strong>
                  <span className="text-slate-300 text-[11px]">
                    Cliquez sur <strong>« Générer Dossier Officiel DDPP »</strong> puis <strong>« Imprimer le Dossier »</strong>. L'inspecteur dispose d'un rapport certifié horodaté avec toutes les signatures numériques.
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Fullscreen Image Modal */}
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
