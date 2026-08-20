import type {
  User,
  TemperatureTarget,
  GoodsReceipt,
  CleaningTask,
  SecondaryDlcItem,
  NonConformanceIncident,
  PestBaitStation,
  PestContractInfo,
  PestIntervention,
  PestInvoice,
  WasteLog,
  DdpAuditPoint,
} from '../types';

import baderAvatar from '../assets/avatars/bader_l.jpg';
import adelAvatar from '../assets/avatars/adel_b.jpg';
import hamzaAvatar from '../assets/avatars/hamza_m.jpg';

export const DEFAULT_USERS: User[] = [
  { id: 'u_bader', name: 'Bader L', role: 'Responsable', pin: '1234', avatarUrl: baderAvatar, avatarColor: '#3b82f6' },
  { id: 'u_adel', name: 'Adel B', role: 'Responsable', pin: '1234', avatarUrl: adelAvatar, avatarColor: '#f59e0b' },
  { id: 'u_hamza', name: 'Hamza M', role: 'Boulanger', pin: '1234', avatarUrl: hamzaAvatar, avatarColor: '#22c55e' },
  { id: 'u_said_n', name: 'Said N', role: 'Boulanger', pin: '1234', avatarColor: '#a855f7' },
  { id: 'u_said_dz', name: 'Said dz', role: 'Pâtissier', pin: '1234', avatarColor: '#ef4444' },
];
export const DEFAULT_TEMPERATURE_TARGETS: TemperatureTarget[] = [];

export const DEFAULT_CLEANING_TASKS: CleaningTask[] = [];

export const DEFAULT_RECEIPTS: GoodsReceipt[] = [];

export const DEFAULT_SECONDARY_DLC: SecondaryDlcItem[] = [
  {
    id: 'dlc_01',
    productName: 'Crème Pâtissière Vanille Bourbon',
    category: 'Pâtisserie',
    prepDate: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    durationHours: 48,
    expiryDate: new Date(Date.now() + 44 * 3600 * 1000).toISOString(),
    preparedBy: 'Sophie (Chef Pâtissière)',
    lotOriginal: 'Lait 4882 / OVO-9921',
    storageTemp: '+2°C à +4°C',
    notes: 'Refroidie immédiatement en cellule.',
  },
  {
    id: 'dlc_02',
    productName: 'Bouteille Blancs d’Œufs (Entamée)',
    category: 'Matière Première Ouverte',
    prepDate: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    durationHours: 24,
    expiryDate: new Date(Date.now() + 16 * 3600 * 1000).toISOString(),
    preparedBy: 'Said dz',
    lotOriginal: 'OVO-9921',
    storageTemp: '+2°C à +4°C',
    notes: 'À consommer ou jeter d’ici demain matin.',
  }
];

export const DEFAULT_INCIDENTS: NonConformanceIncident[] = [
  {
    id: 'inc_01',
    title: 'Thermostat Vitrine Pâtisserie décalé',
    type: 'Panne Froid',
    severity: 'Moyenne',
    description: 'La vitrine affichait +7.2°C à 11h suite à forte chaleur en boutique.',
    correctiveAction: 'Gâteaux déplacés 20 min en chambre froide, thermostat réglé à +3°C, contrôle effectué à +4.1°C à 11h45.',
    reportedBy: 'Hamza M.',
    timestamp: '19/08/2026 11:30',
    status: 'Résolu',
    resolvedAt: '19/08/2026 11:50',
  }
];

// 🐭 Pièges Anti-Nuisibles
export const DEFAULT_PEST_STATIONS: PestBaitStation[] = [
  {
    id: 'pest_01',
    code: 'P-01',
    location: 'Fournil - Arrière du four à soles',
    type: 'Souris/Rats',
    status: 'Intact (RAS)',
    lastChecked: '27/05/2025 09:30',
    checkedBy: 'Adel B.',
    notes: 'Passage EDEN VERT 3D (Jérémy Claire) : Rodenticide anticoagulant vérifié, boîte verrouillée.',
  },
  {
    id: 'pest_02',
    code: 'P-02',
    location: 'Réserve - Angle stockage palettes farine',
    type: 'Souris/Rats',
    status: 'Intact (RAS)',
    lastChecked: '27/05/2025 09:35',
    checkedBy: 'Adel B.',
    notes: 'Passage EDEN VERT 3D : Zone stockage farine propre, appât sécurisé conforme.',
  },
  {
    id: 'pest_03',
    code: 'P-03',
    location: 'Labo Pâtisserie - Sous tour réfrigéré inox',
    type: 'Insectes/Cafards',
    status: 'Intact (RAS)',
    lastChecked: '27/05/2025 09:40',
    checkedBy: 'Adel B.',
    notes: 'Passage EDEN VERT 3D : Gel insecticide rémanent anti-blattes renouvelé.',
  },
  {
    id: 'pest_04',
    code: 'UV-01',
    location: 'Sas Livraison & Entrée Fournil',
    type: 'Désinsectiseur UV',
    status: 'Intact (RAS)',
    lastChecked: '27/05/2025 09:45',
    checkedBy: 'Adel B.',
    notes: 'Contrôle EDEN VERT 3D : Tube UV fonctionnel, bac récepteur nettoyé.',
  }
];

export const DEFAULT_PEST_CONTRACT: PestContractInfo = {
  companyName: 'EDEN VERT 3D (SARL MJC 3D)',
  contractNumber: 'CH-25-97',
  lastVisitDate: '08/06/2026',
  nextVisitDate: '08/09/2026',
  status: 'Actif & Conforme',
  technicianName: 'Jérémy CLAIRE (Tél: 02.35.03.84.59)',
  annualFeeHt: 540.0,
  passagesPerYear: 4,
  siret: '88004805300016',
  phone: '02.35.03.84.59',
};

// 🚚 Historique des Passages & Interventions EDEN VERT 3D
export const DEFAULT_PEST_INTERVENTIONS: PestIntervention[] = [
  {
    id: 'pest_int_01',
    passageNumber: 1,
    totalPassages: 4,
    date: '08/06/2026',
    invoiceNumber: 'F76-26-01207',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Renouvellement annuel 2026/2027)',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur', 'Fournil & Sas'],
    actions: [
      'Contrôle préventif et renouvellement du rodonticide anticoagulant dans les postes PVC',
      'Traitement de désinsectisation par application de gel insecticide rémanent anti-blattes aux zones stratégiques',
      'Contrôle du désinsectiseur UV Sas Livraison (tube & récepteur)',
    ],
    observations: 'Locaux et laboratoire en parfait état d’hygiène. Aucune trace de rongeurs vivants. Boîtes d’appâtage sécurisées réapprovisionnées.',
    status: 'Effectué & Conforme',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
  {
    id: 'pest_int_02',
    passageNumber: 4,
    totalPassages: 4,
    date: '30/03/2026',
    invoiceNumber: 'F76-26-00642',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Passage N°4 - Clôture Contrat 2025/2026)',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur', 'Réserve farine'],
    actions: [
      'Contrôle complet des postes PVC souris & rats',
      'Remplacement intégral des rodonticides consommés par molécule anticoagulante HACCP',
      'Renouvellement des points de gel anti-blattes sous réfrigérateur et four',
    ],
    observations: 'Postes PVC souris et rats : consommation forte constatée. Traitement curatif et préventif appliqué, renouvellement total des appâts.',
    status: 'Effectué & Conforme',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
  {
    id: 'pest_int_03',
    passageNumber: 3,
    totalPassages: 4,
    date: '15/12/2025',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Passage N°3 - Trimestre Hiver)',
    locations: ['Local commercial', 'Fournil & Sas', 'Laboratoire Pâtisserie'],
    actions: [
      'Contrôle d’activité hivernale',
      'Vérification des appâts rodonticides et gel',
      'Test de fonctionnement UV sas',
    ],
    observations: 'RAS - Appâts intacts à 80%, dépoussiérage des boîtes et renouvellement préventif.',
    status: 'Effectué & Conforme',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
  {
    id: 'pest_int_04',
    passageNumber: 2,
    totalPassages: 4,
    date: '18/09/2025',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Passage N°2 - Trimestre Automne)',
    locations: ['Local commercial', 'Fournil', 'Réserve farine'],
    actions: [
      'Contrôle des boîtes d’appâtage rongeurs',
      'Application préventive gel insecticide',
    ],
    observations: 'RAS - Très faible consommation en réserve farine, poste réarmé et sécurisé.',
    status: 'Effectué & Conforme',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
  {
    id: 'pest_int_05',
    passageNumber: 1,
    totalPassages: 4,
    date: '09/06/2025',
    invoiceNumber: 'F76-25-01041',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Passage N°1 - Mise en service Contrat)',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur', 'Fournil & Sas'],
    actions: [
      'Installation et numérotation des postes PVC sécurisés P-01 à P-04',
      'Mise en place de rodonticide anticoagulant homologué HACCP',
      'Traitement de désinsectisation par pulvérisation d’un insecticide contact à fort pouvoir rémanent + gel anti-blattes cuisine',
    ],
    observations: 'Mise en place du plan anti-nuisibles initial conforme DDPP. Boîtes d’appâtage étiquetées et fixées.',
    status: 'Effectué & Conforme',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
  {
    id: 'pest_int_06',
    passageNumber: 2,
    totalPassages: 4,
    date: '08/09/2026',
    contractNumber: 'CH-25-97',
    technician: 'Jérémy CLAIRE (Agréé Certibiocide)',
    type: 'Dératisation & Désinsectisation (Passage N°2 - Contrat 2026/2027)',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur', 'Fournil & Sas'],
    actions: [
      'Contrôle trimestriel programmé',
      'Vérification consommation rodonticides et rémanence gel',
      'Inspection sas et réserve',
    ],
    observations: 'Visite de maintenance trimestrielle planifiée conforme au calendrier du contrat.',
    status: 'Planifié',
    amountHt: 135.0,
    amountTtc: 162.0,
  },
];

// 🧾 Factures Officielles EDEN VERT 3D (SARL MJC 3D)
export const DEFAULT_PEST_INVOICES: PestInvoice[] = [
  {
    id: 'inv_eden_26_01207',
    invoiceNumber: 'F76-26-01207',
    invoiceDate: '09/06/2026',
    saleDate: '08/06/2026',
    contractNumber: 'CH-25-97',
    passageLabel: 'Passage N°1 sur 4 (Renouvellement 2026/2027)',
    object: 'DERATISATION',
    designation: 'Dératisation / Désinsectisation - CONTRAT HYGIENE',
    qty: 1,
    unitPriceHt: 135.0,
    totalHt: 135.0,
    tvaRate: 20,
    tvaAmount: 27.0,
    totalTtc: 162.0,
    isPaid: true,
    paymentMethod: 'Comptant (Virement bancaire)',
    paymentDueDate: '09/06/2026',
    bankName: 'BPVF MANTES GAMBETTA',
    iban: 'FR76 1870 7000 1231 6216 5787 808',
    bic: 'CCBPFRPPVER',
    deratisationText: 'Traitement préventif de l’établissement contre les rongeurs (rats et souris) réalisé à l’aide d’un rodonticide approprié à base d’une molécule anticoagulante conformément aux normes HACCP. Tous les postes seront contrôlés par nos techniciens et les produits consommés ou non seront changés à chaque passage.',
    desinsectisationText: 'Traitement de désinsectisation contre les blattes par la mise en place d’un gel insecticide à fort pouvoir rémanent placé aux endroits stratégiques de passage des nuisibles. Note : le 1er passage est un traitement de désinsectisation par pulvérisation d’un insecticide contact à fort pouvoir rémanent.',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur'],
    observations: 'Contrat annuel d’hygiène renouvelé. Tous nos techniciens sont agréés Certibiocide.',
  },
  {
    id: 'inv_eden_26_00642',
    invoiceNumber: 'F76-26-00642',
    invoiceDate: '31/03/2026',
    saleDate: '30/03/2026',
    contractNumber: 'CH-25-97',
    passageLabel: 'Passage(s) N°4 | sur un total de 4 passage(s)',
    object: 'DERATISATION',
    designation: 'Dératisation / Désinsectisation - CONTRAT HYGIENE',
    qty: 1,
    unitPriceHt: 135.0,
    totalHt: 135.0,
    tvaRate: 20,
    tvaAmount: 27.0,
    totalTtc: 162.0,
    isPaid: true,
    paymentMethod: 'Comptant (Virement bancaire)',
    paymentDueDate: '31/03/2026',
    bankName: 'BPVF MANTES GAMBETTA',
    iban: 'FR76 1870 7000 1231 6216 5787 808',
    bic: 'CCBPFRPPVER',
    deratisationText: 'Traitement préventif de l’établissement contre les rongeurs (rats et souris) réalisé à l’aide d’un rodonticide approprié à base d’une molécule anticoagulante conformément aux normes HACCP. Tous les postes seront contrôlés par nos techniciens et les produits consommés ou non seront changés à chaque passage.',
    desinsectisationText: 'Traitement de désinsectisation contre les blattes par la mise en place d’un gel insecticide à fort pouvoir rémanent placé aux endroits stratégiques de passage des nuisibles. Note : le 1er passage est un traitement de désinsectisation par pulvérisation d’un insecticide contact à fort pouvoir rémanent.',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur'],
    observations: 'Postes pvc souris consommation forte • Postes pvc rats consommation forte. Montant commande HT : 540,00 € • Montant restant HT : 0,00 € (Soldé).',
  },
  {
    id: 'inv_eden_25_01041',
    invoiceNumber: 'F76-25-01041',
    invoiceDate: '11/06/2025',
    saleDate: '09/06/2025',
    contractNumber: 'CH-25-97',
    passageLabel: 'Passage(s) N°1 | sur un total de 4 passage(s)',
    object: 'DERATISATION',
    designation: 'Dératisation / Désinsectisation - CONTRAT HYGIENE',
    qty: 1,
    unitPriceHt: 135.0,
    totalHt: 135.0,
    tvaRate: 20,
    tvaAmount: 27.0,
    totalTtc: 162.0,
    isPaid: true,
    paymentMethod: 'Comptant (Virement bancaire)',
    paymentDueDate: '11/06/2025',
    bankName: 'BPVF MANTES GAMBETTA',
    iban: 'FR76 1870 7000 1231 6216 5787 808',
    bic: 'CCBPFRPPVER',
    deratisationText: 'Traitement préventif de l’établissement contre les rongeurs (rats et souris) réalisé à l’aide d’un rodonticide approprié à base d’une molécule anticoagulante conformément aux normes HACCP. Tous les postes seront contrôlés par nos techniciens et les produits consommés ou non seront changés à chaque passage.',
    desinsectisationText: 'Traitement de désinsectisation contre les blattes par la mise en place d’un gel insecticide à fort pouvoir rémanent placé aux endroits stratégiques de passage des nuisibles. Note : le 1er passage est un traitement de désinsectisation par pulvérisation d’un insecticide contact à fort pouvoir rémanent.',
    locations: ['Local commercial', 'Cuisine - four et réfrigérateur'],
    observations: 'Passage initial N°1 du contrat annuel CH-25-97. Commande HT 540,00 €. Tous nos techniciens sont agréés Certibiocide.',
  },
];


// 🗑️ Suivi des Déchets & Invendus
export const DEFAULT_WASTE_LOGS: WasteLog[] = [
  {
    id: 'w_01',
    productName: 'Pâtons Baguettes Tradition (Sur-fermentation)',
    category: 'Pâtons / Pâte',
    quantityKg: 4.5,
    reason: 'Sur-fermentation',
    discardedAt: '18/08/2026 12:00',
    discardedBy: 'Hamza M.',
    method: 'Biodéchets Dédiés',
    notes: 'Pâte trop acide suite à coupure chambre de pousse.',
  },
  {
    id: 'w_02',
    productName: 'Reste Crème Pâtissière Chocolat J+2',
    category: 'Pâtisseries',
    quantityKg: 1.2,
    reason: 'DLC Dépassée',
    discardedAt: '19/08/2026 19:00',
    discardedBy: 'Said dz',
    method: 'Destruction Volontaire',
    notes: 'Dépassement des 48h réglementaires - jeté immédiatement.',
  }
];

// 🛡️ Points de Contrôle DDPP Préfecture
export const DEFAULT_DDPP_AUDIT_POINTS: DdpAuditPoint[] = [
  {
    id: 'ddpp_01',
    category: 'Lutte Nuisibles',
    title: 'Absence totale de traces de rongeurs ou insectes',
    description: 'Aucune crotte de souris, aucun cafard, farine protégée du sol.',
    fineRiskEur: 1500,
    isImmediateClosureRisk: true,
    status: 'Conforme',
    correctiveAdvice: 'Contrôler les 4 boîtes d’appâtage chaque semaine et maintenir le contrat 3D actif.',
  },
  {
    id: 'ddpp_02',
    category: 'Chaîne du Froid',
    title: 'Températures des vitrines et frigos < +4°C',
    description: 'Denrées sensibles maintenues en froid positif sans rupture.',
    fineRiskEur: 1500,
    isImmediateClosureRisk: true,
    status: 'Conforme',
    correctiveAdvice: 'Enregistrer le relevé matin et soir dans l’application.',
  },
  {
    id: 'ddpp_03',
    category: 'Hygiène Locaux & Lave-Mains',
    title: 'Poste lave-mains fonctionnel (Savon + Papier jetable)',
    description: 'Interdiction stricte des torchons en tissu pour s’essuyer les mains.',
    fineRiskEur: 750,
    isImmediateClosureRisk: false,
    status: 'Conforme',
    correctiveAdvice: 'Recharger le distributeur de papier et le savon bactéricide chaque matin.',
  },
  {
    id: 'ddpp_04',
    category: 'Traçabilité & DLC',
    title: 'Étiquetage des DLC secondaires sur tous les bacs au frigo',
    description: 'Tout produit entamé ou cuisiné doit avoir sa date limite.',
    fineRiskEur: 1500,
    isImmediateClosureRisk: false,
    status: 'Conforme',
    correctiveAdvice: 'Coller une étiquette DLC 2nde générée par l’appli sur chaque bac inox.',
  },
  {
    id: 'ddpp_05',
    category: 'PMS & Formation',
    title: 'Plan de Maîtrise Sanitaire & Formation HACCP du personnel',
    description: 'Au moins 1 personne formée HACCP et registres à jour.',
    fineRiskEur: 3000,
    isImmediateClosureRisk: false,
    status: 'Conforme',
    correctiveAdvice: 'Présenter le dossier de contrôle PDF généré en 1 clic à l’inspecteur.',
  }
];

export const STORAGE_KEYS = {
  USERS: 'sp_users',
  CURRENT_USER: 'sp_current_user',
  TEMPERATURE_TARGETS: 'sp_temp_targets',
  TEMPERATURE_RECORDS: 'sp_temp_records',
  CLEANING_TASKS: 'sp_cleaning_tasks',
  GOODS_RECEIPTS: 'sp_receipts',
  SECONDARY_DLC: 'sp_secondary_dlc',
  INCIDENTS: 'sp_incidents',
  PEST_STATIONS: 'sp_pest_stations',
  PEST_CONTRACT: 'sp_pest_contract',
  PEST_INTERVENTIONS: 'sp_pest_interventions',
  PEST_INVOICES: 'sp_pest_invoices',
  WASTE_LOGS: 'sp_waste_logs',
  DDPP_AUDIT_POINTS: 'sp_ddpp_audit_points',
};

export function getStoredData<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    const parsed = JSON.parse(raw);
    if (parsed === null || parsed === undefined) return defaultVal;
    if (Array.isArray(defaultVal) && !Array.isArray(parsed)) return defaultVal;
    if (typeof defaultVal === 'object' && !Array.isArray(defaultVal) && (typeof parsed !== 'object' || Array.isArray(parsed))) return defaultVal;
    return parsed as T;
  } catch {
    return defaultVal;
  }
}

export function setStoredData<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Error saving localStorage', e);
  }
}
