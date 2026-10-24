import React from 'react';

interface KnowledgeSymbolProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const KnowledgeSymbol: React.FC<KnowledgeSymbolProps> = ({
  className = '',
  size = 32,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="UPSC ZONE AI Knowledge Emblem"
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-[#F3AA45]/20 blur-md animate-pulse-glow pointer-events-none"
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-500 hover:rotate-12"
      >
        <defs>
          <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9D48B" />
            <stop offset="60%" stopColor="#F3AA45" />
            <stop offset="100%" stopColor="#D98220" />
          </linearGradient>
          <linearGradient id="emblemTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#63B8A5" />
          </linearGradient>
          <radialGradient id="emblemCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F3AA45" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10172A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Ring with subtle hash markings */}
        <circle cx="50" cy="50" r="46" stroke="url(#emblemGoldGrad)" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="42" stroke="#63B8A5" strokeWidth="0.8" opacity="0.6" />

        {/* 16 Radial Symmetry Geometric Spokes */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={i} transform={`rotate(${angle} 50 50)`}>
              {/* Spoke line */}
              <line
                x1="50"
                y1="18"
                x2="50"
                y2="38"
                stroke="url(#emblemGoldGrad)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Node dot on spoke */}
              <circle cx="50" cy="18" r="1.6" fill="#F3AA45" />
            </g>
          );
        })}

        {/* Interconnected Hexagonal / Octagonal Knowledge Matrix */}
        <polygon
          points="50,22 68,29 78,50 68,71 50,78 32,71 22,50 32,29"
          fill="none"
          stroke="url(#emblemTealGrad)"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* Inner Hub Ring */}
        <circle cx="50" cy="50" r="13" fill="#182746" stroke="url(#emblemGoldGrad)" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="10" fill="url(#emblemCoreGlow)" />
        {/* Core Diamond Point */}
        <polygon points="50,44 54,50 50,56 46,50" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
