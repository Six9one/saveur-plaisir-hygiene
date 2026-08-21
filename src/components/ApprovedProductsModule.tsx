import React, { useState } from 'react';
import type { ApprovedProduct, User } from '../types';
import {
  ShieldCheck,
  FileText,
  Droplets,
  Clock,
  X,
  Sparkles,
  Zap,
  Flame,
  HandMetal,
  Calculator,
  Layers,
  ShoppingCart,
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface ApprovedProductsModuleProps {
  products: ApprovedProduct[];
  currentUser?: User;
  onUpdateProduct?: (updated: ApprovedProduct) => void;
  onAddProduct?: (newProd: ApprovedProduct) => void;
}

interface ProductStoreConfig {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  targetShort: string;
  dosageShort: string;
  timeShort: string;
  rinseStatus: 'needs_rinse' | 'no_rinse';
  colorGradient: string;
  badgeColor: string;
  accentBg: string;
  icon: any;
  normTag: string;
  dilutionMlPerLiter: number;
  imageUrl: string;
  packaging: string;
  metroRef: string;
  estimatedPrice: string;
}

const STORE_PRODUCTS: ProductStoreConfig[] = [
  {
    id: 'prod_suma_d10',
    name: 'Suma Bac D10',
    brand: 'DIVERSEY',
    tagline: 'Désinfectant Inox & Machines',
    targetShort: 'Diviseuse, Pétrin, Tours réfrigérés, Bacs',
    dosageShort: '20 ml / L d’eau (2%)',
    timeShort: '5 minutes',
    rinseStatus: 'needs_rinse',
    colorGradient: 'from-blue-600 via-blue-800 to-slate-950',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    accentBg: 'bg-blue-500',
    icon: Sparkles,
    normTag: 'EN 1276 • EN 13697',
    dilutionMlPerLiter: 20,
    imageUrl: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=400&q=80',
    packaging: 'Bidon de 5 Litres',
    metroRef: 'Réf METRO 108422',
    estimatedPrice: '~28,50 € HT',
  },
  {
    id: 'prod_sirafan_speed',
    name: 'Sirafan Speed',
    brand: 'ECOLAB',
    tagline: 'Spray Express Petit Matériel',
    targetShort: 'Couteaux, Lames trancheuse, Balances, Sondes',
    dosageShort: 'Prêt à l’emploi (Pur en spray)',
    timeShort: '60 secondes',
    rinseStatus: 'no_rinse',
    colorGradient: 'from-cyan-600 via-teal-800 to-slate-950',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    accentBg: 'bg-cyan-500',
    icon: Zap,
    normTag: 'Sans Rinçage • EN 1276',
    dilutionMlPerLiter: 0,
    imageUrl: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=400&q=80',
    packaging: 'Spray Pulvérisateur 750 ml',
    metroRef: 'Réf ECOLAB 3034920',
    estimatedPrice: '~11,90 € HT',
  },
  {
    id: 'prod_suma_d35',
    name: 'Suma Break Up D3.5',
    brand: 'DIVERSEY',
    tagline: 'Dégraissant Sols & Plonge',
    targetShort: 'Carrelage labo, Faïences, Bac plonge lourd',
    dosageShort: '30 à 50 ml / L d’eau chaude',
    timeShort: '10 à 15 minutes',
    rinseStatus: 'needs_rinse',
    colorGradient: 'from-amber-600 via-orange-800 to-slate-950',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    accentBg: 'bg-amber-500',
    icon: Flame,
    normTag: 'Surpuissant Graisses',
    dilutionMlPerLiter: 40,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    packaging: 'Bidon de 5 Litres',
    metroRef: 'Réf METRO 108435',
    estimatedPrice: '~24,90 € HT',
  },
  {
    id: 'prod_anios_manugerm',
    name: 'Anios Manugerm',
    brand: 'ANIOS / TORK',
    tagline: 'Savon Désinfectant Mains',
    targetShort: 'Lave-mains obligatoire fournil & pâtisserie',
    dosageShort: '1 dose (30 sec de friction)',
    timeShort: '30 secondes',
    rinseStatus: 'needs_rinse',
    colorGradient: 'from-emerald-600 via-emerald-800 to-slate-950',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentBg: 'bg-emerald-500',
    icon: HandMetal,
    normTag: 'Norme EN 1499',
    dilutionMlPerLiter: 0,
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=400&q=80',
    packaging: 'Flacon Pompe 500 ml / 1 L',
    metroRef: 'Réf ANIOS 2145',
    estimatedPrice: '~8,90 € HT',
  },
];

export const ApprovedProductsModule: React.FC<ApprovedProductsModuleProps> = ({
  products,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductStoreConfig | null>(null);
  const [waterLiters, setWaterLiters] = useState<number>(5);
  const [showFdsModal, setShowFdsModal] = useState<boolean>(false);
  const [orderModalProduct, setOrderModalProduct] = useState<ProductStoreConfig | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  const matchedRawProduct = selectedProduct
    ? products.find((p) => p.id === selectedProduct.id || p.name.includes(selectedProduct.name)) || products[0]
    : null;

  const handleCopyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-24 px-1 sm:px-0 animate-in fade-in duration-150">
      
      {/* ================= 1. COMPACT HEADER ================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-lg text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight">
                Les 4 Produits Homologués Fournil
              </h1>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Contact Alimentaire EN 1276 ✓
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">
              4 références certifiées pour zéro résidu et conformité totale DDPP.
            </p>
          </div>
        </div>

        {/* Quick Order Info */}
        <div className="text-xs text-slate-400 flex items-center gap-1.5 self-start sm:self-center font-bold">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Disponibles chez <strong className="text-white">METRO Rouen</strong></span>
        </div>
      </div>

      {/* ================= 2. THE 4 PRODUCT SQUARES (STORE STYLE WITH PACKSHOTS) ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STORE_PRODUCTS.map((prod) => {
          const Icon = prod.icon;
          return (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setWaterLiters(5);
              }}
              className={`group relative rounded-3xl p-3.5 sm:p-4 bg-gradient-to-b ${prod.colorGradient} border border-slate-700/60 hover:border-white/40 shadow-xl text-white flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:scale-96 min-h-[260px] sm:min-h-[290px] overflow-hidden`}
            >
              {/* Top Row: Brand Badge & Norm */}
              <div className="relative z-10 flex items-start justify-between gap-1.5">
                <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-lg bg-slate-950/80 text-slate-200 border border-white/10 shadow-xs">
                  {prod.brand}
                </span>

                <div className="w-7 h-7 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 shadow-xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Product Packshot Photo (Crisp Vector Graphic with Transparent Background) */}
              <div className="relative z-10 my-1 flex items-center justify-center h-28 sm:h-32">
                <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
                  <ProductVisual productId={prod.id} className="w-full h-full" />
                </div>
              </div>

              {/* Product Title & Info */}
              <div className="relative z-10 text-center">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors truncate">
                  {prod.name}
                </h3>
                <p className="text-[10px] text-slate-200 font-bold mt-0.5 line-clamp-1">
                  {prod.tagline}
                </p>
                <div className="text-[9px] font-mono text-emerald-300 mt-1 font-black">
                  {prod.dosageShort}
                </div>
              </div>

              {/* Bottom Quick Order Action Button */}
              <div className="relative z-10 pt-2.5 mt-2 border-t border-white/15 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderModalProduct(prod);
                  }}
                  className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-[10px] flex items-center justify-center gap-1 shadow-md transition-all"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Commander</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(prod);
                    setWaterLiters(5);
                  }}
                  className="px-2 py-1.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 text-white font-bold text-[10px] border border-white/15"
                  title="Voir détails"
                >
                  Fiche
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ================= 3. PRODUCT DETAILS MODAL (FAST & TACTILE) ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 p-1 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                  <ProductVisual productId={selectedProduct.id} className="w-full h-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {selectedProduct.brand}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${selectedProduct.badgeColor}`}>
                      {selectedProduct.normTag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {selectedProduct.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="pt-4 space-y-4">
              
              {/* Target & Equipment */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Matériels & Machines cibles :
                </div>
                <div className="text-xs font-bold text-slate-200">
                  {selectedProduct.targetShort}
                </div>
              </div>

              {/* Dosage & Dilution Calculator (If diluted) */}
              {selectedProduct.dilutionMlPerLiter > 0 ? (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                      <Calculator className="w-4 h-4" />
                      <span>Calculateur de Dilution :</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      {selectedProduct.dilutionMlPerLiter} ml / Litre
                    </span>
                  </div>

                  {/* Volume Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 5, 10].map((vol) => (
                      <button
                        key={vol}
                        type="button"
                        onClick={() => setWaterLiters(vol)}
                        className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          waterLiters === vol
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {vol} Litre{vol > 1 ? 's' : ''} d’eau
                      </button>
                    ))}
                  </div>

                  {/* Calculated Result Box */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Dose exacte à verser :</span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      {waterLiters * selectedProduct.dilutionMlPerLiter} ml (~{Math.round((waterLiters * selectedProduct.dilutionMlPerLiter) / 10)} bouchons)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Mode d’emploi :</span>
                    <span className="text-xs font-black text-emerald-400 font-mono">Prêt à l’emploi (Aucune dilution)</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {selectedProduct.timeShort}
                  </span>
                </div>
              )}

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Temps de contact :</span>
                  </div>
                  <div className="text-xs font-black text-white mt-0.5">
                    {selectedProduct.timeShort}
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-slate-500" />
                    <span>Rinçage :</span>
                  </div>
                  <div className={`text-xs font-black mt-0.5 ${selectedProduct.rinseStatus === 'no_rinse' ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {selectedProduct.rinseStatus === 'no_rinse' ? 'Sans Rinçage ✓' : 'Rinçage Eau Potable'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOrderModalProduct(selectedProduct);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Commander ({selectedProduct.metroRef})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowFdsModal(true)}
                  className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Fiche DDPP</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= 4. SUPPLIER & ORDER MODAL (METRO ROUEN) ================= */}
      {orderModalProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl text-white max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 font-black">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    Commander ce Produit
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Fournisseurs & Références à Rouen
                  </span>
                </div>
              </div>

              <button
                onClick={() => setOrderModalProduct(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 space-y-4">
              
              {/* Product Card Banner */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="w-13 h-13 rounded-xl p-1 bg-slate-900 border border-slate-700 shrink-0 flex items-center justify-center">
                  <ProductVisual productId={orderModalProduct.id} className="w-full h-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="text-sm font-black text-white block truncate">{orderModalProduct.name}</strong>
                  <span className="text-xs text-slate-400 block">{orderModalProduct.packaging} • {orderModalProduct.estimatedPrice}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {orderModalProduct.metroRef}
                    </span>
                    <button
                      onClick={() => handleCopyRef(orderModalProduct.metroRef)}
                      className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedRef ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRef ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Suppliers List */}
              <div className="space-y-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                  Où l'acheter à Rouen & En Ligne :
                </span>

                {/* 1. METRO ROUEN */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 space-y-2 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <strong className="text-xs font-black text-white">METRO Grand-Quevilly (Rouen)</strong>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      En Rayon
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    📍 Rue Joseph Cugnot, 76120 Le Grand-Quevilly
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="https://www.metro.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ouvrir METRO.fr</span>
                    </a>
                    <a
                      href="tel:0235688000"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Appeler</span>
                    </a>
                  </div>
                </div>

                {/* 2. POMONA PassionFroid */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-black text-white">POMONA PassionFroid Normandie</strong>
                    <span className="text-[10px] font-bold text-slate-400">Livraison Fournil</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Commande directe via votre commercial boulangerie.
                  </p>
                </div>

                {/* 3. TRANSGOURMET */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-black text-white">TRANSGOURMET Normandie</strong>
                    <span className="text-[10px] font-bold text-slate-400">Grossiste Pro</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Disponible sur catalogue Hygiène & Produits Biocides.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOrderModalProduct(null)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-colors"
              >
                Fermer
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= 5. FICHE DDPP MODAL ================= */}
      {showFdsModal && matchedRawProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-white">
                  Fiche de Sécurité & Homologation DDPP
                </h3>
              </div>
              <button
                onClick={() => setShowFdsModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 space-y-3.5 text-xs">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Produit :</div>
                <div className="text-sm font-black text-white mt-0.5">{matchedRawProduct.name} ({matchedRawProduct.brand})</div>
                <div className="text-slate-300 mt-1">{matchedRawProduct.usage}</div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Normes & Homologations Certifiées :</div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedRawProduct.norms.map((norm, idx) => (
                    <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      ✓ {norm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Protocole d'Application :</div>
                <ul className="space-y-1 text-slate-300">
                  {matchedRawProduct.instructions.map((inst, idx) => (
                    <li key={idx}>• {inst}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-amber-200">
                <strong>Précautions :</strong> {matchedRawProduct.precautions}
              </div>

              <button
                onClick={() => setShowFdsModal(false)}
                className="w-full py-3 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors"
              >
                Retour
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
