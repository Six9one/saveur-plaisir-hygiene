import React, { useState } from 'react';
import type { NonConformanceIncident, User } from '../types';
import { AlertTriangle } from 'lucide-react';

interface IncidentModalProps {
  currentUser: User;
  onAddIncident: (incident: Omit<NonConformanceIncident, 'id'>) => void;
  onClose: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  currentUser,
  onAddIncident,
  onClose,
}) => {
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<NonConformanceIncident['type']>('Panne Froid');
  const [description, setDescription] = useState<string>('');
  const [correctiveAction, setCorrectiveAction] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !correctiveAction) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    onAddIncident({
      title,
      type,
      severity: 'Moyenne',
      description,
      correctiveAction,
      reportedBy: currentUser.name,
      timestamp: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'Résolu',
      resolvedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Déclarer une Non-Conformité</h3>
              <p className="text-[11px] text-slate-500">Obligation HACCP de traçabilité des anomalies.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Type d'incident :</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
            >
              <option value="Panne Froid">🌡️ Panne Froid / Hausse de température</option>
              <option value="Bris de Verre">🪟 Bris de verre / Matériel cassé</option>
              <option value="Nuisibles">🐭 Détection nuisibles / Piège contrôlé</option>
              <option value="Rappel Produit">⚠️ Rappel Produit / Matière défectueuse</option>
              <option value="Autre">📌 Autre anomalie</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé court :</label>
            <input
              type="text"
              required
              placeholder="Ex: Porte frigo entr'ouverte, ampoule cassée au labo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description détaillée :</label>
            <textarea
              required
              rows={2}
              placeholder="Décrivez ce qu'il s'est passé..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-900 mb-1">
              Action Corrective Immédiate réalisée :
            </label>
            <textarea
              required
              rows={2}
              placeholder="Ex: Produits jetés, zone nettoyée et aspirée, technicien appelé..."
              value={correctiveAction}
              onChange={(e) => setCorrectiveAction(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/20"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
            >
              Enregistrer l’Anomalie
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
