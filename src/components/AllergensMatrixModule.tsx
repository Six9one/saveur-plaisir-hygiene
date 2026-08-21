import React, { useState } from 'react';
import type { AllergenItem, MajorAllergen, User } from '../types';
import {
  Wheat,
  Printer,
  Search,
  Plus,
  AlertCircle,
  X,
  Check,
  Filter,
} from 'lucide-react';

interface AllergensMatrixModuleProps {
  allergensList: AllergenItem[];
  currentUser?: User;
  onAddAllergenItem?: (item: AllergenItem) => void;
  onUpdateAllergenItem?: (item: AllergenItem) => void;
}

export const AllergensMatrixModule: React.FC<AllergensMatrixModuleProps> = ({
  allergensList,
  onAddAllergenItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAllergenFilter, setSelectedAllergenFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New item form state
  const [newName, setNewName] = useState<string>('');
  const [newCategory, setNewCategory] = useState<
    'Viennoiseries' | 'Pains & Baguettes' | 'Pâtisseries' | 'Snacking & Salé'
  >('Viennoiseries');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newAllergens, setNewAllergens] = useState<MajorAllergen[]>(['Gluten (Blé/Seigle/Orge)']);
  const [newTraces, setNewTraces] = useState<MajorAllergen[]>([]);

  const allMajorAllergens: MajorAllergen[] = [
    'Gluten (Blé/Seigle/Orge)',
    'Lait & Lactose (Beurre/Crème)',
    'Œufs',
    'Fruits à coque (Amandes/Noisettes)',
    'Soja (Lécithine)',
    'Graines de sésame',
    'Moutarde',
    'Poisson',
    'Arachides',
    'Céleri',
    'Crustacés',
    'Mollusques',
    'Lupin',
    'Sulfites (>10mg/kg)',
  ];

  const categories = [
    { id: 'all', label: 'Toutes Catégories' },
    { id: 'Viennoiseries', label: '🥐 Viennoiseries (Obligatoire DDPP)' },
    { id: 'Pains & Baguettes', label: '🥖 Pains & Baguettes' },
    { id: 'Pâtisseries', label: '🍰 Pâtisseries' },
    { id: 'Snacking & Salé', label: '🥪 Snacking & Salé' },
  ];

  const filteredItems = allergensList.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAllergen =
      selectedAllergenFilter === 'all' ||
      item.allergens.includes(selectedAllergenFilter as MajorAllergen) ||
      item.tracesPossible?.includes(selectedAllergenFilter as MajorAllergen);
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.allergens.some((a) => a.toLowerCase().includes(query));
    return matchesCat && matchesAllergen && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: AllergenItem = {
      id: `all_${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Préparation artisanale maison.',
      allergens: newAllergens,
      tracesPossible: newTraces,
      lastUpdated: new Date().toLocaleDateString('fr-FR'),
      isHouseMade: true,
    };

    onAddAllergenItem?.(newItem);
    setNewName('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const toggleAllergenInForm = (allergen: MajorAllergen, isTrace = false) => {
    if (isTrace) {
      setNewTraces((prev) =>
        prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
      );
    } else {
      setNewAllergens((prev) =>
        prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 rounded-3xl border border-amber-900/50 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Wheat className="w-4 h-4" />
              Conformité Directive Européenne INCO n°1169/2011 & Code de la Consommation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Matrice des 14 Allergènes & Viennoiseries
            </h1>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              Registre obligatoire à disposition de la clientèle et des inspecteurs. Toutes les viennoiseries, pains, pâtisseries et snacking sont répertoriés avec leurs allergènes majeurs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un Produit</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer Affichage A4 Boutique</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-800/40">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="text-xs text-amber-300">Viennoiseries</div>
            <div className="text-lg font-black text-white">100% Déclarées</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="text-xs text-amber-300">Allergènes Majeurs</div>
            <div className="text-lg font-black text-white">14 Familles CE</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="text-xs text-amber-300">Produits Référencés</div>
            <div className="text-lg font-black text-white">{allergensList.length} Produits</div>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="text-xs text-amber-300">Statut DDPP</div>
            <div className="text-lg font-black text-emerald-400">Conforme</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Allergen Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl px-3 py-1.5 shadow-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedAllergenFilter}
              onChange={(e) => setSelectedAllergenFilter(e.target.value)}
              className="text-xs font-bold text-slate-700 bg-transparent focus:outline-hidden"
            >
              <option value="all">Tous les allergènes</option>
              {allMajorAllergens.map((all) => (
                <option key={all} value={all}>
                  {all}
                </option>
              ))}
            </select>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher produit..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Allergens Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {item.category}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-1.5">{item.name}</h3>
                </div>
                {item.isHouseMade && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Maison
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.description}</p>

              {/* Major Allergens */}
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Allergènes Majeurs Présents
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.allergens.map((all, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-black px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200"
                      >
                        {all}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Traces */}
                {item.tracesPossible && item.tracesPossible.length > 0 && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Traces Possibles (Atelier)
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tracesPossible.map((trace, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600"
                        >
                          {trace}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Mise à jour : {item.lastUpdated}</span>
              <span className="font-bold text-slate-600">INCO 1169/2011</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Allergen */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Ajouter un Produit à la Matrice Allergènes</h3>
                <p className="text-xs text-amber-200">Enregistrez les allergènes pour l'affichage boutique</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nom du Produit *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex : Chausson aux pommes, Sandwich poulet..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Catégorie *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  >
                    <option value="Viennoiseries">🥐 Viennoiseries</option>
                    <option value="Pains & Baguettes">🥖 Pains & Baguettes</option>
                    <option value="Pâtisseries">🍰 Pâtisseries</option>
                    <option value="Snacking & Salé">🥪 Snacking & Salé</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Description courte</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Ex : Pur beurre, compote maison..."
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900"
                  />
                </div>
              </div>

              {/* Major Allergens Checkboxes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Allergènes Majeurs Présents (Cochez) :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-2 border border-slate-100 rounded-2xl bg-slate-50">
                  {allMajorAllergens.map((all) => {
                    const isChecked = newAllergens.includes(all);
                    return (
                      <button
                        type="button"
                        key={all}
                        onClick={() => toggleAllergenInForm(all, false)}
                        className={`text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-rose-500 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{all}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md"
                >
                  Enregistrer le Produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
