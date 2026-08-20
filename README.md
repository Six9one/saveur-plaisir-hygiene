# Saveur Plaisir • Application Hygiène & HACCP Boulangerie

Application Web & Tablette (PWA) de maîtrise sanitaire (PMS / HACCP) spécialement conçue pour les boulangeries-pâtisseries artisanales.

## 🌟 Les 5 Modules Essentiels Intégrés

1. **🌡️ Chaîne du Froid & Relevés de Températures :**
   - Suivi des chambres froides positives/négatives, chambres de pousse et vitrines.
   - Alertes visuelles instantanées si dépassement des seuils.
   - Saisie obligatoire d'une action corrective en cas d'anomalie.
2. **📦 Réception Marchandises & Traçabilité des Lots :**
   - Contrôle à la livraison (température camion, état emballage, DLC/DDM).
   - Archivage et recherche rapide des numéros de lots (Farine, Beurre, Ovoproduits, Viandes).
3. **🧼 Plan de Nettoyage & Désinfection (PND) :**
   - Checklists tactiles quotidiennes, hebdomadaires et mensuelles par zone (Fournil, Pâtisserie, Vente).
   - Protocoles de nettoyage détaillés et traçabilité de l'opérateur.
4. **🏷️ DLC Secondaires & Étiqueteuse Thermique :**
   - Calculateur automatique J+1 (24h), J+2 (48h), J+3 (72h) pour crèmes, ovoproduits ouverts et décongélations.
   - Génération et impression d'étiquettes de traçabilité format thermique.
5. **📋 Dossier Contrôle Sanitaire & Export PDF (Mode Inspecteur) :**
   - Vue consolidée certifiée pour les inspecteurs de l'hygiène (DDPP).
   - Registre des non-conformités et actions correctives.
   - Impression / export PDF officiel en 1 clic.

## 🚀 Démarrage Local

```bash
cd saveur-plaisir-hygiene
npm install
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) sur votre navigateur ou tablette.

## 🌐 Déploiement Gratuit sur Vercel

1. Installez Vercel CLI ou liez votre dépôt GitHub :
```bash
npm i -g vercel
vercel
```
2. Votre application sera instantanément disponible en ligne à l'adresse `https://saveur-plaisir-hygiene.vercel.app`.
