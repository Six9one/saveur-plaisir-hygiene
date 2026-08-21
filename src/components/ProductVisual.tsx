import React from 'react';

interface ProductVisualProps {
  productId: string;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({ productId, className = 'w-full h-full' }) => {
  switch (productId) {
    case 'prod_suma_d10':
      return (
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="d10-body" x1="40" y1="50" x2="160" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8FAFC" />
              <stop offset="0.3" stopColor="#E2E8F0" />
              <stop offset="0.7" stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="d10-label" x1="50" y1="100" x2="150" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="d10-cap" x1="80" y1="20" x2="120" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0284C7" />
              <stop offset="1" stopColor="#075985" />
            </linearGradient>
            <filter id="d10-shadow" x="20" y="200" width="160" height="30" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          
          {/* Floor Shadow */}
          <ellipse cx="100" cy="218" rx="65" ry="12" fill="#000000" fillOpacity="0.35" filter="url(#d10-shadow)" />

          {/* 5L Bidon Handle & Body */}
          <path
            d="M55 70 C55 52, 70 48, 85 48 L115 48 C130 48, 145 52, 145 70 L148 195 C148 206, 138 212, 125 212 L75 212 C62 212, 52 206, 52 195 Z"
            fill="url(#d10-body)"
            stroke="#64748B"
            strokeWidth="1.5"
          />

          {/* Handle Cutout */}
          <path
            d="M75 62 C75 58, 82 56, 100 56 C118 56, 125 58, 125 62 C125 74, 118 78, 100 78 C82 78, 75 74, 75 62 Z"
            fill="#0F172A"
            fillOpacity="0.6"
            stroke="#94A3B8"
            strokeWidth="1"
          />

          {/* Blue Cap */}
          <rect x="86" y="26" width="28" height="18" rx="4" fill="url(#d10-cap)" stroke="#0369A1" strokeWidth="1" />
          <line x1="88" y1="32" x2="112" y2="32" stroke="#38BDF8" strokeWidth="1" strokeLinecap="round" />
          <line x1="88" y1="37" x2="112" y2="37" stroke="#075985" strokeWidth="1" strokeLinecap="round" />

          {/* Official Diversey Label */}
          <rect x="58" y="95" width="84" height="98" rx="6" fill="url(#d10-label)" stroke="#38BDF8" strokeWidth="1" />
          
          {/* Label Header Badge */}
          <rect x="64" y="102" width="48" height="11" rx="3" fill="#0F172A" />
          <text x="68" y="110" fill="#38BDF8" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">DIVERSEY</text>

          <text x="64" y="128" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">Suma</text>
          <text x="64" y="141" fill="#FEF08A" fontSize="11" fontWeight="900" fontFamily="sans-serif">Bac D10</text>

          <rect x="64" y="148" width="72" height="12" rx="3" fill="#0369A1" />
          <text x="67" y="156" fill="#E0F2FE" fontSize="5.5" fontWeight="800" fontFamily="sans-serif">DÉSINFECTANT DÉGRAISSANT</text>
          <text x="67" y="162" fill="#BAE6FD" fontSize="4.5" fontWeight="700" fontFamily="sans-serif">Surfaces Alimentaires • EN 1276</text>

          {/* 5 Litres volume pill */}
          <rect x="64" y="172" width="28" height="12" rx="3" fill="#0F172A" />
          <text x="70" y="180" fill="#38BDF8" fontSize="7" fontWeight="900" fontFamily="sans-serif">5 L</text>

          {/* D10 Big Number badge */}
          <circle cx="122" cy="178" r="9" fill="#F59E0B" />
          <text x="115" y="181.5" fill="#0F172A" fontSize="7.5" fontWeight="900" fontFamily="sans-serif">D10</text>
        </svg>
      );

    case 'prod_sirafan_speed':
      return (
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="sir-body" x1="60" y1="80" x2="140" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.4" stopColor="#F1F5F9" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="sir-trigger" x1="60" y1="30" x2="140" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0D9488" />
              <stop offset="0.6" stopColor="#0F766E" />
              <stop offset="1" stopColor="#115E59" />
            </linearGradient>
            <filter id="sir-shadow" x="30" y="200" width="140" height="30" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="100" cy="216" rx="45" ry="10" fill="#000000" fillOpacity="0.35" filter="url(#sir-shadow)" />

          {/* Spray Bottle Body */}
          <path
            d="M80 80 C80 75, 84 72, 92 72 L108 72 C116 72, 120 75, 120 80 L126 120 C128 135, 134 148, 134 165 L134 198 C134 208, 125 214, 114 214 L86 214 C75 214, 66 208, 66 198 L66 165 C66 148, 72 135, 74 120 Z"
            fill="url(#sir-body)"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />

          {/* Spray Trigger Head */}
          <path
            d="M86 42 L114 42 L118 72 L82 72 Z"
            fill="#0F766E"
            stroke="#0D9488"
            strokeWidth="1"
          />
          {/* Nozzle & Lever */}
          <path
            d="M60 40 L88 38 L94 48 L65 48 Z"
            fill="#14B8A6"
          />
          <circle cx="62" cy="44" r="3" fill="#0F172A" />
          
          {/* Ergonomic Trigger lever */}
          <path
            d="M78 52 C72 58, 72 70, 78 78 L82 76 C78 70, 78 60, 82 54 Z"
            fill="#0F172A"
          />

          {/* Top Head cap */}
          <path
            d="M88 32 C88 28, 94 25, 112 25 C124 25, 138 32, 142 42 L132 46 C128 38, 120 34, 112 34 C98 34, 96 38, 96 42 Z"
            fill="#115E59"
          />

          {/* Ecolab Official Label */}
          <rect x="72" y="112" width="56" height="88" rx="5" fill="#0F172A" stroke="#2DD4BF" strokeWidth="1" />
          
          {/* Ecolab Brand Tag */}
          <rect x="76" y="118" width="34" height="9" rx="2" fill="#E11D48" />
          <text x="79" y="125" fill="#FFFFFF" fontSize="6" fontWeight="900" fontFamily="sans-serif">ECOLAB</text>

          <text x="76" y="139" fill="#2DD4BF" fontSize="10" fontWeight="900" fontFamily="sans-serif">Sirafan</text>
          <text x="76" y="149" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">Speed</text>

          <rect x="76" y="154" width="48" height="18" rx="3" fill="#134E4A" />
          <text x="79" y="161" fill="#5EEAD4" fontSize="4.5" fontWeight="800" fontFamily="sans-serif">DÉSINFECTANT RAPIDE</text>
          <text x="79" y="166" fill="#CCFBF1" fontSize="4.2" fontWeight="700" fontFamily="sans-serif">Sans Rinçage • 60 sec</text>
          <text x="79" y="170" fill="#99F6E4" fontSize="3.8" fontWeight="600" fontFamily="sans-serif">EN 1276 / EN 13697</text>

          {/* 750 ml badge */}
          <rect x="76" y="184" width="24" height="9" rx="2" fill="#1E293B" />
          <text x="80" y="190.5" fill="#2DD4BF" fontSize="5.5" fontWeight="900" fontFamily="sans-serif">750 ml</text>
        </svg>
      );

    case 'prod_suma_d35':
      return (
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="d35-body" x1="40" y1="50" x2="160" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFBEB" />
              <stop offset="0.3" stopColor="#FEF3C7" />
              <stop offset="0.7" stopColor="#FDE68A" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="d35-label" x1="50" y1="100" x2="150" y2="190" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EA580C" />
              <stop offset="1" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="d35-cap" x1="80" y1="20" x2="120" y2="45" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EA580C" />
              <stop offset="1" stopColor="#9A3412" />
            </linearGradient>
            <filter id="d35-shadow" x="20" y="200" width="160" height="30" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="100" cy="218" rx="65" ry="12" fill="#000000" fillOpacity="0.35" filter="url(#d35-shadow)" />

          {/* 5L Bidon Heavy Degreaser */}
          <path
            d="M55 70 C55 52, 70 48, 85 48 L115 48 C130 48, 145 52, 145 70 L148 195 C148 206, 138 212, 125 212 L75 212 C62 212, 52 206, 52 195 Z"
            fill="url(#d35-body)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Handle Cutout */}
          <path
            d="M75 62 C75 58, 82 56, 100 56 C118 56, 125 58, 125 62 C125 74, 118 78, 100 78 C82 78, 75 74, 75 62 Z"
            fill="#0F172A"
            fillOpacity="0.6"
            stroke="#D97706"
            strokeWidth="1"
          />

          {/* Orange Cap */}
          <rect x="86" y="26" width="28" height="18" rx="4" fill="url(#d35-cap)" stroke="#9A3412" strokeWidth="1" />
          <line x1="88" y1="32" x2="112" y2="32" stroke="#FED7AA" strokeWidth="1" strokeLinecap="round" />
          <line x1="88" y1="37" x2="112" y2="37" stroke="#7C2D12" strokeWidth="1" strokeLinecap="round" />

          {/* Orange Diversey Label */}
          <rect x="58" y="95" width="84" height="98" rx="6" fill="url(#d35-label)" stroke="#FED7AA" strokeWidth="1" />

          {/* Diversey Logo badge */}
          <rect x="64" y="102" width="48" height="11" rx="3" fill="#0F172A" />
          <text x="68" y="110" fill="#FB923C" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">DIVERSEY</text>

          <text x="64" y="128" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">Suma</text>
          <text x="64" y="141" fill="#FEF08A" fontSize="10" fontWeight="900" fontFamily="sans-serif">Break Up</text>

          <rect x="64" y="148" width="72" height="12" rx="3" fill="#9A3412" />
          <text x="67" y="156" fill="#FFEDD5" fontSize="5.5" fontWeight="800" fontFamily="sans-serif">DÉGRAISSANT SURPUISSANT</text>
          <text x="67" y="162" fill="#FED7AA" fontSize="4.5" fontWeight="700" fontFamily="sans-serif">Sols & Plonge Fournil</text>

          {/* 5 Litres volume pill */}
          <rect x="64" y="172" width="28" height="12" rx="3" fill="#0F172A" />
          <text x="70" y="180" fill="#FB923C" fontSize="7" fontWeight="900" fontFamily="sans-serif">5 L</text>

          {/* D3.5 Big Number badge */}
          <circle cx="122" cy="178" r="9" fill="#FBBF24" />
          <text x="114" y="181.5" fill="#0F172A" fontSize="6.8" fontWeight="900" fontFamily="sans-serif">D3.5</text>
        </svg>
      );

    case 'prod_anios_manugerm':
    default:
      return (
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <defs>
            <linearGradient id="an-body" x1="60" y1="80" x2="140" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0FDF4" />
              <stop offset="0.4" stopColor="#DCFCE7" />
              <stop offset="1" stopColor="#86EFAC" />
            </linearGradient>
            <linearGradient id="an-pump" x1="80" y1="20" x2="120" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.6" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
            <filter id="an-shadow" x="35" y="200" width="130" height="30" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Floor Shadow */}
          <ellipse cx="100" cy="216" rx="46" ry="11" fill="#000000" fillOpacity="0.35" filter="url(#an-shadow)" />

          {/* Pump Bottle Body */}
          <rect x="70" y="75" width="60" height="138" rx="14" fill="url(#an-body)" stroke="#16A34A" strokeWidth="1.2" />

          {/* Dispenser Pump Top */}
          <rect x="91" y="56" width="18" height="20" fill="url(#an-pump)" stroke="#64748B" strokeWidth="1" />
          <path
            d="M82 40 C82 32, 92 28, 100 28 L124 28 C128 28, 130 32, 126 36 L118 42 L82 42 Z"
            fill="url(#an-pump)"
            stroke="#475569"
            strokeWidth="1"
          />
          <circle cx="84" cy="41" r="2.5" fill="#0F172A" />

          {/* Anios Label */}
          <rect x="74" y="98" width="52" height="102" rx="6" fill="#0F172A" stroke="#4ADE80" strokeWidth="1" />

          {/* Anios Medical Cross */}
          <rect x="80" y="106" width="12" height="12" rx="3" fill="#0284C7" />
          <path d="M86 109 L86 115 M83 112 L89 112" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          <text x="96" y="115" fill="#38BDF8" fontSize="7" fontWeight="900" fontFamily="sans-serif">ANIOS</text>

          <text x="80" y="132" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">Manugerm</text>
          <text x="80" y="141" fill="#4ADE80" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">Lave-Mains</text>

          <rect x="78" y="148" width="44" height="26" rx="3" fill="#14532D" />
          <text x="81" y="156" fill="#86EFAC" fontSize="4.5" fontWeight="800" fontFamily="sans-serif">SAVON DÉSINFECTANT</text>
          <text x="81" y="162" fill="#DCFCE7" fontSize="4.2" fontWeight="700" fontFamily="sans-serif">Bactéricide EN 1499</text>
          <text x="81" y="167" fill="#BBF7D0" fontSize="3.8" fontWeight="600" fontFamily="sans-serif">Lavage hygiénique 30s</text>
          <text x="81" y="172" fill="#86EFAC" fontSize="3.8" fontWeight="600" fontFamily="sans-serif">Hypoallergénique</text>

          {/* 1 Litre pill */}
          <rect x="80" y="184" width="22" height="9" rx="2" fill="#16A34A" />
          <text x="84" y="190.5" fill="#FFFFFF" fontSize="5.5" fontWeight="900" fontFamily="sans-serif">1 L</text>
        </svg>
      );
  }
};
