import React from 'react';
import type { DdpAuditPoint } from '../types';
import { AlertOctagon, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface DdpAuditSimulatorModuleProps {
  auditPoints: DdpAuditPoint[];
  onToggleAuditPoint: (id: string) => void;
}

export const DdpAuditSimulatorModule: React.FC<DdpAuditSimulatorModuleProps> = ({
  auditPoints,
  onToggleAuditPoint,
}) => {
  const safePoints = auditPoints || [];
  const nonCompliantPoints = safePoints.filter((p) => p?.status === 'Non-Conforme');
  const closureRiskCount = nonCompliantPoints.filter((p) => p?.isImmediateClosureRisk).length;
  const totalFineExposure = nonCompliantPoints.reduce((acc, curr) => acc + (Number(curr?.fineRiskEur) || 0), 0);

  // Alim'confiance Rating
  const alimLevel =
    closureRiskCount > 0
      ? {
          name: 'À CORRIGER DE MANIÈRE URGENTE',
          sub: 'Risque de Fermeture Administrative Immédiate par le Préfet',
          color: 'bg-rose-600 text-white',
          border: 'border-rose-300 ring-2 ring-rose-500/30',
          badge: 'Niveau 4 (Fermeture)',
        }
      : nonCompliantPoints.length > 1
      ? {
          name: 'À AMÉLIORER',
          sub: 'Mise en demeure sous 15 jours + Amende de 5e classe',
          color: 'bg-amber-500 text-slate-950 font-bold',
          border: 'border-amber-300',
          badge: 'Niveau 3 (Avertissement)',
        }
      : nonCompliantPoints.length === 1
      ? {
          name: 'SATISFAISANT',
          sub: 'Manquements mineurs sans danger sanitaire immédiat',
          color: 'bg-blue-600 text-white',
          border: 'border-blue-300',
          badge: 'Niveau 2',
        }
      : {
          name: 'TRÈS SATISFAISANT',
          sub: 'Conformité totale aux normes sanitaires européennes (PMS/HACCP)',
          color: 'bg-emerald-600 text-white',
          border: 'border-emerald-300',
          badge: 'Niveau 1 (Excellent)',
        };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-900 text-amber-400">
              <AlertOctagon className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Simulateur Contrôle Sanitaire & Risque Fermeture</h2>
                <span className="bg-slate-900 text-amber-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  Grille DDPP / Alim'confiance
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Évaluez en temps réel la conformité de votre boulangerie face aux points éliminatoires des inspecteurs d'hygiène.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Alim'confiance Simulated Score Box */}
      <div className={`p-6 rounded-3xl border ${alimLevel.border} bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-xs uppercase font-black px-3 py-1 rounded-full ${alimLevel.color}`}>
              {alimLevel.badge}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Note prévisionnelle Alim'confiance :</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{alimLevel.name}</h3>
          <p className="text-xs text-slate-600 max-w-xl">{alimLevel.sub}</p>
        </div>

        {/* Fine Exposure & Closure Badge */}
        <div className="flex items-center gap-4 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <div className="text-xs text-slate-500 font-medium">Risque d'Amende Cumulée</div>
            <div className={`text-2xl font-black ${totalFineExposure > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {totalFineExposure} €
            </div>
          </div>
          <div className="border-l border-slate-200 pl-4">
            <div className="text-xs text-slate-500 font-medium">Motifs de Fermeture</div>
            <div className={`text-2xl font-black ${closureRiskCount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {closureRiskCount}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Points Checklist */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Les 5 Points Critiques Contrôlés par la DDPP :
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {auditPoints.map((pt) => {
            const isCompliant = pt.status === 'Conforme';

            return (
              <div
                key={pt.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompliant
                    ? 'bg-white border-slate-200 hover:border-emerald-300'
                    : 'bg-rose-50/40 border-rose-300 ring-1 ring-rose-500/20'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {pt.category}
                    </span>
                    {pt.isImmediateClosureRisk && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-rose-600" />
                        Motif Fermeture Immédiate
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Amende potentielle : {pt.fineRiskEur} €
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{pt.title}</h4>
                  <p className="text-xs text-slate-500">{pt.description}</p>
                  
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-100 mt-2">
                    <strong>💡 Solution dans l'appli :</strong> {pt.correctiveAdvice}
                  </div>
                </div>

                {/* Status Toggle Button */}
                <div className="shrink-0">
                  <button
                    onClick={() => onToggleAuditPoint(pt.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                      isCompliant
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200'
                        : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                    }`}
                  >
                    {isCompliant ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>✓ Conforme (RAS)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-white" />
                        <span>⚠️ Non-Conforme</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
