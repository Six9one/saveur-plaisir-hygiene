import React from 'react';

interface StepVisualProps {
  stepId: string;
  className?: string;
}

export const StepVisual: React.FC<StepVisualProps> = ({ stepId, className = 'w-full h-44' }) => {
  switch (stepId) {
    case 'matin':
      // Step 1: Baker checking fridge temperature & validating on smartphone
      return (
        <svg viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="b1-skin" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#FDBA74" />
              <stop offset="1" stopColor="#FB923C" />
            </linearGradient>
            <linearGradient id="b1-phone" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="b1-frigo" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#334155" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
            <filter id="b1-glow" x="200" y="50" width="130" height="90" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Background Laboratory Tiles pattern */}
          <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />

          {/* Stainless Commercial Refrigerator (Left) */}
          <rect x="25" y="20" width="105" height="150" rx="12" fill="url(#b1-frigo)" stroke="#64748B" strokeWidth="2" />
          <rect x="33" y="30" width="89" height="130" rx="8" fill="#0284C7" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Digital Cyan Thermometer screen on fridge door */}
          <rect x="42" y="38" width="70" height="24" rx="6" fill="#020617" stroke="#06B6D4" strokeWidth="1.5" />
          <circle cx="52" cy="50" r="3" fill="#10B981" />
          <text x="62" y="54" fill="#38BDF8" fontSize="11" fontWeight="900" fontFamily="monospace">+3.2°C</text>
          
          {/* Shelves & food inside */}
          <line x1="38" y1="80" x2="118" y2="80" stroke="#475569" strokeWidth="1.5" />
          <line x1="38" y1="120" x2="118" y2="120" stroke="#475569" strokeWidth="1.5" />
          <rect x="44" y="90" width="14" height="25" rx="3" fill="#FFFFFF" opacity="0.9" />
          <rect x="64" y="94" width="22" height="18" rx="3" fill="#FBBF24" opacity="0.9" />
          <rect x="92" y="88" width="18" height="26" rx="3" fill="#38BDF8" opacity="0.8" />

          {/* THE BAKER (Center-Right) */}
          {/* Baker Chef Hat (Toque blanche) */}
          <path d="M142 38 C142 22, 172 22, 172 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="145" y="36" width="24" height="10" fill="#FFFFFF" stroke="#E2E8F0" />
          
          {/* Baker Head */}
          <circle cx="157" cy="54" r="13" fill="url(#b1-skin)" />
          {/* Chef Mustache / Smile */}
          <path d="M152 57 Q157 61 162 57" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          
          {/* White Chef Apron & Body */}
          <path d="M140 70 L174 70 L180 160 L134 160 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="146" y="85" width="22" height="26" rx="4" fill="#E2E8F0" />
          
          {/* Baker Arm holding Smartphone */}
          <path d="M168 76 L205 92" stroke="#FB923C" strokeWidth="8" strokeLinecap="round" />

          {/* Smartphone in Baker's Hand */}
          <rect x="198" y="70" width="55" height="95" rx="10" fill="url(#b1-phone)" stroke="#38BDF8" strokeWidth="2" />
          <rect x="204" y="78" width="43" height="78" rx="6" fill="#020617" />
          
          {/* Phone Screen: Temperature App Validation */}
          <rect x="208" y="85" width="35" height="16" rx="4" fill="#0369A1" />
          <text x="212" y="96" fill="#FFFFFF" fontSize="7" fontWeight="bold">Frigo 1 : 3.2°C</text>
          
          {/* Big Green "Valider Tout (RAS)" Button on Phone Screen */}
          <rect x="208" y="108" width="35" height="24" rx="6" fill="#10B981" stroke="#34D399" strokeWidth="1" />
          <text x="214" y="119" fill="#FFFFFF" fontSize="6.5" fontWeight="900">VALIDER</text>
          <text x="218" y="127" fill="#D1FAE5" fontSize="6" fontWeight="bold">RAS ✓</text>

          {/* Finger Tap Ripple Effect */}
          <circle cx="238" cy="120" r="10" stroke="#34D399" strokeWidth="1.5" opacity="0.8" />
          <circle cx="238" cy="120" r="4" fill="#34D399" />

          {/* Floating Gold Check Badge */}
          <g filter="url(#b1-glow)">
            <circle cx="290" cy="90" r="22" fill="#10B981" fillOpacity="0.3" />
          </g>
          <circle cx="290" cy="90" r="18" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <text x="282" y="97" fill="#FFFFFF" fontSize="16" fontWeight="900">✓</text>
          <text x="268" y="122" fill="#34D399" fontSize="8.5" fontWeight="900">15 SECONDES</text>
        </svg>
      );

    case 'reception':
      // Step 2: Baker scanning delivery slip (BL) with smartphone from delivery driver
      return (
        <svg viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="b2-truck" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="b2-laser" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#06B6D4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#06B6D4" stopOpacity="1" />
              <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />

          {/* Refrigerated Delivery Truck (Left Background) */}
          <rect x="25" y="45" width="70" height="60" rx="8" fill="url(#b2-truck)" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M95 65 L118 65 C124 65, 128 70, 128 76 L128 105 L95 105 Z" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="50" cy="112" r="11" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="108" cy="112" r="11" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
          <text x="48" y="78" fill="#FFFFFF" fontSize="16">🚚</text>

          {/* Flour & Butter Delivery Boxes on Pallet */}
          <rect x="35" y="125" width="40" height="25" rx="3" fill="#D97706" stroke="#B45309" />
          <text x="44" y="141" fill="#FEF3C7" fontSize="8" fontWeight="bold">FARINE</text>
          <rect x="80" y="128" width="30" height="22" rx="3" fill="#FBBF24" stroke="#D97706" />
          <text x="86" y="142" fill="#78350F" fontSize="7" fontWeight="bold">BEURRE</text>

          {/* BAKER WITH CHEF HAT (Holding Phone & Scanning) */}
          {/* Chef Hat */}
          <path d="M152 38 C152 22, 182 22, 182 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="155" y="36" width="24" height="10" fill="#FFFFFF" stroke="#E2E8F0" />
          
          {/* Head */}
          <circle cx="167" cy="54" r="13" fill="#FDBA74" />
          {/* Apron */}
          <path d="M150 70 L184 70 L190 160 L144 160 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Arm holding Smartphone */}
          <path d="M178 76 L210 88" stroke="#FB923C" strokeWidth="8" strokeLinecap="round" />

          {/* Smartphone taking Photo */}
          <rect x="205" y="65" width="48" height="85" rx="8" fill="#1E293B" stroke="#06B6D4" strokeWidth="2" />
          <rect x="210" y="72" width="38" height="68" rx="5" fill="#020617" />
          <circle cx="229" cy="132" r="3" fill="#94A3B8" />

          {/* Delivery Note (BL Papier) in mid-air being scanned */}
          <g transform="rotate(-6 270 95)">
            <rect x="260" y="45" width="60" height="85" rx="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="266" y="52" width="48" height="8" rx="2" fill="#0284C7" />
            <text x="270" y="58" fill="#FFFFFF" fontSize="5" fontWeight="bold">BON LIVRAISON</text>
            <line x1="266" y1="66" x2="310" y2="66" stroke="#64748B" strokeWidth="1" />
            <line x1="266" y1="72" x2="305" y2="72" stroke="#94A3B8" strokeWidth="1" />
            
            {/* Barcode & Lot */}
            <rect x="266" y="80" width="48" height="18" rx="2" fill="#F1F5F9" />
            <line x1="270" y1="84" x2="270" y2="94" stroke="#0F172A" strokeWidth="2" />
            <line x1="275" y1="84" x2="275" y2="94" stroke="#0F172A" strokeWidth="1" />
            <line x1="280" y1="84" x2="280" y2="94" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="286" y1="84" x2="286" y2="94" stroke="#0F172A" strokeWidth="1.5" />
            <text x="294" y="91" fill="#0284C7" fontSize="5" fontWeight="bold">LOT ✓</text>
          </g>

          {/* Laser Scan Beam from Phone to BL */}
          <line x1="230" y1="85" x2="275" y2="90" stroke="#06B6D4" strokeWidth="3" strokeDasharray="3 2" />
          <circle cx="275" cy="90" r="4" fill="#06B6D4" />

          {/* Success Badge */}
          <rect x="250" y="140" width="75" height="24" rx="8" fill="#082F49" stroke="#06B6D4" strokeWidth="1" />
          <text x="256" y="156" fill="#38BDF8" fontSize="8" fontWeight="900">📸 SCAN 20 SEC</text>
        </svg>
      );

    case 'soir':
      // Step 3: Baker cleaning bakery equipment with spray Suma Bac D10
      return (
        <svg viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="b3-pétrin" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#F8FAFC" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="b3-spray" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />

          {/* Large Spiral Dough Mixer (Pétrin Inox) on Left */}
          <rect x="30" y="30" width="105" height="22" rx="6" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
          <path d="M40 50 L125 50 L120 115 C120 142, 45 142, 45 115 Z" fill="url(#b3-pétrin)" stroke="#64748B" strokeWidth="2" />
          <rect x="35" y="130" width="95" height="25" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

          {/* Glitter Sparkles on Clean Pétrin */}
          <text x="25" y="55" fill="#FBBF24" fontSize="18">✨</text>
          <text x="125" y="65" fill="#34D399" fontSize="22">✨</text>
          <text x="75" y="165" fill="#67E8F9" fontSize="16">✨</text>

          {/* BAKER (Center-Right) SPRAYING & WIPING */}
          {/* Chef Hat */}
          <path d="M152 38 C152 22, 182 22, 182 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="155" y="36" width="24" height="10" fill="#FFFFFF" stroke="#E2E8F0" />
          
          {/* Head */}
          <circle cx="167" cy="54" r="13" fill="#FDBA74" />
          {/* Apron */}
          <path d="M150 70 L184 70 L190 160 L144 160 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Baker Right Arm holding Suma Bac D10 Spray toward Pétrin */}
          <path d="M158 76 L130 90" stroke="#FB923C" strokeWidth="7" strokeLinecap="round" />

          {/* Suma Bac D10 Spray Bottle in Hand */}
          <rect x="108" y="80" width="26" height="42" rx="6" fill="url(#b3-spray)" stroke="#34D399" strokeWidth="1" />
          <path d="M114 68 L128 68 L130 80 L112 80 Z" fill="#047857" />
          <path d="M102 66 L118 64 L122 72 L106 72 Z" fill="#34D399" />
          <text x="111" y="98" fill="#34D399" fontSize="6" fontWeight="900">D10</text>
          <text x="111" y="106" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">INOX</text>

          {/* Disinfectant Mist Droplets onto Pétrin */}
          <circle cx="95" cy="72" r="3.5" fill="#6EE7B7" opacity="0.9" />
          <circle cx="85" cy="85" r="4" fill="#38BDF8" opacity="0.9" />
          <circle cx="78" cy="98" r="3" fill="#6EE7B7" opacity="0.9" />

          {/* Baker Left Arm holding Smartphone showing "Clôturé ✓" */}
          <path d="M178 76 L215 88" stroke="#FB923C" strokeWidth="7" strokeLinecap="round" />

          {/* Smartphone with Checklist Done */}
          <rect x="215" y="70" width="48" height="85" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <rect x="220" y="76" width="38" height="68" rx="5" fill="#020617" />
          <text x="224" y="88" fill="#34D399" fontSize="6.5" fontWeight="bold">NETTOYAGE</text>
          <text x="224" y="98" fill="#FFFFFF" fontSize="5.5">Pétrin : FAIT ✓</text>
          <text x="224" y="106" fill="#FFFFFF" fontSize="5.5">Diviseuse : FAIT ✓</text>
          <text x="224" y="114" fill="#FFFFFF" fontSize="5.5">Plonge : FAIT ✓</text>
          
          <rect x="224" y="122" width="30" height="14" rx="3" fill="#10B981" />
          <text x="227" y="132" fill="#FFFFFF" fontSize="6" fontWeight="bold">CLÔTURÉ</text>

          {/* Big Stamp on Right */}
          <rect x="270" y="90" width="60" height="45" rx="10" fill="#064E3B" stroke="#34D399" strokeWidth="1.5" />
          <text x="278" y="112" fill="#34D399" fontSize="18">🧼</text>
          <text x="274" y="126" fill="#A7F3D0" fontSize="7" fontWeight="bold">100% PROPRE</text>
        </svg>
      );

    case 'dlc':
      // Step 4: Pastry Chef labeling gastro container with J+3 Date
      return (
        <svg viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="b4-tag" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#A855F7" />
              <stop offset="1" stopColor="#6B21A8" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />

          {/* PASTRY CHEF (Left) STICKING DLC LABEL */}
          {/* Pastry Chef Toque */}
          <path d="M52 38 C52 22, 82 22, 82 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="55" y="36" width="24" height="10" fill="#FFFFFF" stroke="#E2E8F0" />
          
          {/* Head */}
          <circle cx="67" cy="54" r="13" fill="#FDBA74" />
          {/* Apron */}
          <path d="M50 70 L84 70 L90 160 L44 160 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Arm placing sticker */}
          <path d="M78 76 L118 90" stroke="#FB923C" strokeWidth="7" strokeLinecap="round" />

          {/* Gastro Container with Vanilla Pastry Cream & Berries */}
          <rect x="110" y="60" width="105" height="85" rx="10" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <rect x="118" y="70" width="89" height="65" rx="6" fill="#FEF08A" stroke="#FBBF24" strokeWidth="1" />
          <circle cx="140" cy="95" r="9" fill="#F43F5E" />
          <circle cx="165" cy="105" r="7" fill="#F43F5E" />
          <circle cx="185" cy="95" r="8" fill="#F43F5E" />
          <text x="130" y="125" fill="#854D0E" fontSize="9" fontWeight="900">Crème Pâtissière</text>

          {/* Big Neon DLC J+3 Label on Right */}
          <rect x="225" y="40" width="100" height="105" rx="14" fill="url(#b4-tag)" stroke="#E9D5FF" strokeWidth="2" />
          <text x="242" y="62" fill="#F3E8FF" fontSize="10" fontWeight="900">ÉTIQUETTE DLC</text>
          
          <rect x="235" y="70" width="80" height="62" rx="8" fill="#3B0764" stroke="#C084FC" strokeWidth="1" />
          <text x="242" y="86" fill="#E9D5FF" fontSize="8" fontWeight="bold">Ouvert : 21/08</text>
          <text x="242" y="106" fill="#FDE047" fontSize="16" fontWeight="900">J+3 MAX</text>
          <text x="242" y="122" fill="#A855F7" fontSize="8" fontWeight="bold">⏱️ 72h à +3°C</text>
        </svg>
      );

    case 'ddpp':
    default:
      // Step 5: Confident Baker showing official PDF tablet to sanitary inspector
      return (
        <svg viewBox="0 0 340 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="b5-shield" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#14B8A6" />
              <stop offset="1" stopColor="#0F766E" />
            </linearGradient>
            <linearGradient id="b5-tablet" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          {/* Ground */}
          <line x1="20" y1="170" x2="320" y2="170" stroke="#334155" strokeWidth="2" />

          {/* SMILING CONFIDENT BAKER (Left) */}
          {/* Chef Hat */}
          <path d="M52 38 C52 22, 82 22, 82 38 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="55" y="36" width="24" height="10" fill="#FFFFFF" stroke="#E2E8F0" />
          
          {/* Head with big smile */}
          <circle cx="67" cy="54" r="13" fill="#FDBA74" />
          <path d="M62 57 Q67 62 72 57" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Chef Apron */}
          <path d="M50 70 L84 70 L90 160 L44 160 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Baker Arm holding Digital Tablet toward Inspector */}
          <path d="M78 76 L120 90" stroke="#FB923C" strokeWidth="7" strokeLinecap="round" />

          {/* Digital Tablet showing Full DDPP PDF Report */}
          <rect x="110" y="45" width="95" height="110" rx="10" fill="url(#b5-tablet)" stroke="#2DD4BF" strokeWidth="2" />
          <rect x="116" y="52" width="83" height="92" rx="6" fill="#020617" />
          
          {/* PDF Ribbon Badge */}
          <rect x="122" y="60" width="30" height="12" rx="3" fill="#EF4444" />
          <text x="126" y="69" fill="#FFFFFF" fontSize="7" fontWeight="bold">PDF</text>
          
          <text x="122" y="84" fill="#FFFFFF" fontSize="8" fontWeight="bold">REGISTRE OFFICIEL</text>
          <text x="122" y="96" fill="#2DD4BF" fontSize="7">✓ Frigos Matin & Soir</text>
          <text x="122" y="106" fill="#2DD4BF" fontSize="7">✓ Traçabilité & BL</text>
          <text x="122" y="116" fill="#2DD4BF" fontSize="7">✓ EDEN VERT 3D 2026</text>
          
          <rect x="122" y="125" width="71" height="14" rx="4" fill="#0D9488" />
          <text x="127" y="135" fill="#FFFFFF" fontSize="6.5" fontWeight="900">100% CONFORME ✓</text>

          {/* SANITARY INSPECTOR (Right) GIVING THUMBS UP */}
          {/* Inspector Cap / Suit */}
          <circle cx="265" cy="54" r="13" fill="#FED7AA" />
          <rect x="252" y="38" width="26" height="8" rx="2" fill="#0369A1" />
          {/* Blue Official Suit */}
          <path d="M248 70 L282 70 L288 160 L242 160 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          
          {/* Inspector Arm Thumbs Up 👍 */}
          <path d="M255 76 L230 85" stroke="#FDBA74" strokeWidth="7" strokeLinecap="round" />
          <text x="215" y="88" fill="#FFFFFF" fontSize="18">👍</text>

          {/* Big Green DDPP Shield & Stars */}
          <g transform="translate(265, 90)">
            <path d="M30 0 L55 12 L55 35 C55 50, 30 60, 30 60 C30 60, 5 50, 5 35 L5 12 Z" fill="url(#b5-shield)" stroke="#5EEAD4" strokeWidth="1.5" />
            <text x="20" y="35" fill="#FFFFFF" fontSize="18">🛡️</text>
            <text x="8" y="52" fill="#FDE047" fontSize="8">⭐⭐⭐⭐⭐</text>
          </g>
        </svg>
      );
  }
};
