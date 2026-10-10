import React, { useMemo } from 'react';

/**
 * FallingLeaves Component
 * Ambient background animation featuring gently fluttering and swaying leaves.
 * Dynamically shifts leaf palettes and character based on the active season,
 * temperature, and rainfall conditions.
 */
export function FallingLeaves({ season = 'kharif', rainfall = 850, temperature = 26 }) {
  // Leaf palette configuration by season
  const leafPalette = useMemo(() => {
    switch (season) {
      case 'rabi':
        // Cool Season / Golden Harvest (Wheat, Golden Amber)
        return ['#D97706', '#F59E0B', '#B45309', '#FBBF24', '#78350F', '#FDE68A'];
      case 'zaid':
        // Summer / Sunlit Ochre & Bronze
        return ['#EA580C', '#D97706', '#C2410C', '#F59E0B', '#9A3412', '#FED7AA'];
      case 'spring':
        // Spring / Fresh Blossom & Vernal Green
        return ['#10B981', '#059669', '#34D399', '#6EE7B7', '#047857', '#A7F3D0'];
      case 'kharif':
      default:
        // Monsoon / Deep Lush Green & Emerald
        return ['#2E7D32', '#4CAF50', '#81C784', '#1B5E20', '#66BB6A', '#A5D6A7'];
    }
  }, [season]);

  // Generate 22 stable pseudo-random leaves with various sway speeds, sizes, and delays
  const leaves = useMemo(() => {
    const leafCount = 22;
    const items = [];
    for (let i = 0; i < leafCount; i++) {
      const left = ((i * 4.7 + 3) % 96).toFixed(1); // Spread across 0% - 96%
      const duration = (8 + (i % 7) * 2.2).toFixed(1); // 8s to ~23s
      const delay = ((i * 1.3) % 12).toFixed(1); // 0s to 12s stagger
      const size = (18 + (i % 5) * 6); // 18px to 42px
      const swayDuration = (3.5 + (i % 4) * 1.2).toFixed(1);
      const colorIndex = i % leafPalette.length;
      const initialRotate = (i * 37) % 360;
      const leafType = i % 3; // 3 distinct leaf silhouettes

      items.push({
        id: i,
        left: `${left}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        swayDuration: `${swayDuration}s`,
        size,
        color: leafPalette[colorIndex],
        initialRotate,
        leafType
      });
    }
    return items;
  }, [leafPalette]);

  return (
    <div className="falling-leaves-container" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf-wrapper"
          style={{
            left: leaf.left,
            animationDuration: leaf.duration,
            animationDelay: `${leaf.delay}`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`
          }}
        >
          <div
            className="falling-leaf-inner"
            style={{
              animationDuration: leaf.swayDuration,
              transform: `rotate(${leaf.initialRotate}deg)`
            }}
          >
            {leaf.leafType === 0 && (
              // Elliptical classic farm leaf with central vein
              <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
                <path
                  d="M20 2 C32 10, 36 26, 20 38 C4 26, 8 10, 20 2 Z"
                  fill={leaf.color}
                  fillOpacity="0.75"
                />
                <path
                  d="M20 5 L20 35 M20 14 Q25 18 28 20 M20 22 Q15 25 12 28"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {leaf.leafType === 1 && (
              // Curved flutter sprout leaf
              <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
                <path
                  d="M5 25 C10 10, 28 4, 35 15 C30 30, 15 32, 5 25 Z"
                  fill={leaf.color}
                  fillOpacity="0.68"
                />
                <path
                  d="M7 23 C16 18, 25 15, 33 16"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {leaf.leafType === 2 && (
              // Elongated wheat / cereal blade leaf
              <svg viewBox="0 0 30 50" width="100%" height="100%" fill="none">
                <path
                  d="M15 2 C22 14, 25 35, 15 48 C5 35, 8 14, 15 2 Z"
                  fill={leaf.color}
                  fillOpacity="0.7"
                />
                <path
                  d="M15 4 L15 46"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                />
              </svg>
            )}
          </div>
        </div>
      ))}

      {/* Gentle rainfall atmosphere if rain is high (> 1000 mm) */}
      {rainfall > 1000 && (
        <div className="monsoon-rain-mist-overlay" />
      )}
    </div>
  );
}
