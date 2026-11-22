
import React from "react";

const TukTaxiLogo = ({ className = "w-16 h-16" }) => {
  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Tuk Taxi Jbeil logo"
    >
      <defs>
        <linearGradient id="taxiGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eed510" />
          <stop offset="50%" stopColor="#FFD500" />
          <stop offset="100%" stopColor="#EBA900" />
        </linearGradient>

        <clipPath id="checkerClip">
          <path d="M75 185 H245 L225 250 Q160 285 95 250 Z" />
        </clipPath>
      </defs>

      {/* Five stars */}
      {[92, 126, 160, 194, 228].map((x) => (
        <path
          key={x}
          d="M0 -12 L3.5 -4 L12 -4 L5.5 2 L8 11 L0 6 L-8 11 L-5.5 2 L-12 -4 L-3.5 -4 Z"
          transform={`translate(${x} 25)`}
          fill="url(#taxiGold)"
        />
      ))}

      {/* Outer shield */}
      <path
        d="M82 62 Q85 52 98 52 H222 Q235 52 238 62
           L273 120 L264 183 L214 264
           Q160 310 106 264 L56 183 L47 120 Z"
        fill="#111111"
        stroke="url(#taxiGold)"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Inner shield */}
      <path
        d="M91 69 H229 L258 124 L251 178 L205 251
           Q160 289 115 251 L69 178 L62 124 Z"
        fill="#111111"
        stroke="#FFD500"
        strokeWidth="2.5"
      />

      {/* Taxi roof */}
      <path
        d="M93 108 L111 76 H209 L227 108"
        fill="none"
        stroke="#FFD500"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M104 108 L118 84 H202 L216 108"
        fill="none"
        stroke="#FFD500"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Side ribbons */}
      <path d="M60 117 L28 105 L40 133 L27 150 L68 145 Z" fill="#FFD500" />
      <path d="M260 117 L292 105 L280 133 L293 150 L252 145 Z" fill="#FFD500" />

      {/* Logo banner */}
      <path
        d="M45 119 Q160 139 275 119 L271 165 Q160 185 49 165 Z"
        fill="#f2d70b"
        stroke="#FFD700"
        strokeWidth="2"
      />

      <text
        x="160"
        y="155"
        textAnchor="middle"
        fontSize="25"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        fill="#8B7000"
        textLength="204"
        lengthAdjust="spacingAndGlyphs"
      >
        Tuk Taxi Jbeil
      </text>

      {/* Checkerboard pattern */}
      <g clipPath="url(#checkerClip)">
        {Array.from({ length: 7 }, (_, row) =>
          Array.from({ length: 7 }, (_, col) =>
            (row + col) % 2 === 0 ? (
              <rect
                key={`${row}-${col}`}
                x={87 + col * 21}
                y={185 + row * 15}
                width="21"
                height="15"
                fill="#ead00e"
              />
            ) : null
          )
        )}
      </g>
    </svg>
  );
};

export default TukTaxiLogo;
