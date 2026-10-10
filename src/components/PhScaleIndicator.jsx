import React from 'react';

/**
 * PhScaleIndicator Component
 * Visual, interactive soil pH scale showing acidic (red), neutral (green), and basic/alkaline (blue).
 * Features real-time position pointer, text badges, supported range validation, and farmer advice.
 */
export function PhScaleIndicator({ value, onChange }) {
  const numericVal = parseFloat(value);
  const safeVal = isNaN(numericVal) ? 7.0 : numericVal;

  // Clamped position for the pointer on 0-14 scale (0% to 100%)
  const clampedVal = Math.min(14, Math.max(0, safeVal));
  const pointerPercent = (clampedVal / 14) * 100;

  // Evaluation criteria
  let statusClass = 'neutral';
  let statusLabel = 'Neutral (Ideal Sweet Spot)';
  let statusExplanation = 'Nutrient availability is at maximum. Most crops thrive in this balanced range (6.5 - 7.5).';

  if (clampedVal < 4.5) {
    statusClass = 'strongly-acidic';
    statusLabel = 'Strongly Acidic (pH < 4.5)';
    statusExplanation = 'High risk of aluminum & manganese toxicity; phosphorus is locked. Heavy agricultural liming recommended.';
  } else if (clampedVal < 5.8) {
    statusClass = 'moderately-acidic';
    statusLabel = 'Moderately Acidic (pH 4.5 - 5.7)';
    statusExplanation = 'Phosphorus availability is reduced. Incorporate agricultural lime (calcium carbonate) or dolomite.';
  } else if (clampedVal < 6.5) {
    statusClass = 'slightly-acidic';
    statusLabel = 'Slightly Acidic (pH 5.8 - 6.4)';
    statusExplanation = 'Acceptable for most crops; very favorable for potato, rice, tea, and sweet potato.';
  } else if (clampedVal <= 7.5) {
    statusClass = 'neutral';
    statusLabel = 'Neutral (pH 6.5 - 7.5)';
    statusExplanation = 'Optimal root environment for almost all crops with peak beneficial soil bacteria activity.';
  } else if (clampedVal <= 8.5) {
    statusClass = 'moderately-alkaline';
    statusLabel = 'Moderately Alkaline (pH 7.6 - 8.5)';
    statusExplanation = 'Common in dry regions with calcium carbonate. Zinc and iron may become less available; apply compost.';
  } else {
    statusClass = 'strongly-alkaline';
    statusLabel = 'Strongly Alkaline / Sodic (pH > 8.5)';
    statusExplanation = 'High sodium hazard; soil structure may disperse. Apply agricultural gypsum and green manuring.';
  }

  // Extreme range validation notice
  const isExtreme = clampedVal < 3.5 || clampedVal > 9.5;

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && onChange) {
      const clamped = Math.min(14, Math.max(0, val));
      onChange(clamped);
    }
  };

  return (
    <div className="ph-indicator-card" aria-labelledby="ph-scale-heading">
      <div className="ph-indicator-header">
        <div>
          <span id="ph-scale-heading" className="ph-title-text">
            Soil Reaction (pH Scale)
          </span>
          <span className="ph-subtitle-text">
            Current Value: <strong>{clampedVal.toFixed(1)}</strong>
          </span>
        </div>

        {/* Text Badge so meaning is never communicated by color alone */}
        <div
          className={`ph-badge ph-badge-${statusClass}`}
          role="status"
          aria-live="polite"
        >
          <span className="ph-badge-icon" aria-hidden="true">
            {clampedVal < 6.5 ? '🔴' : clampedVal > 7.5 ? '🔵' : '🟢'}
          </span>
          <span className="ph-badge-label">{statusLabel}</span>
        </div>
      </div>

      {/* The Visual pH Gradient Scale (Range: 0 to 14) */}
      <div className="ph-scale-visual-container">
        {/* Scale labels above */}
        <div className="ph-zone-labels">
          <span className="zone-label acid-zone">
            Acidic <span className="zone-sub">(Red)</span>
          </span>
          <span className="zone-label neutral-zone">
            Neutral <span className="zone-sub">(Green)</span>
          </span>
          <span className="zone-label alkaline-zone">
            Basic / Alkaline <span className="zone-sub">(Blue)</span>
          </span>
        </div>

        {/* Gradient Track */}
        <div className="ph-gradient-track">
          {/* Neutral marker line */}
          <div className="ph-neutral-marker" style={{ left: '50%' }}>
            <span className="marker-line" />
            <span className="marker-text">Neutral 7.0</span>
          </div>

          {/* Sliding Indicator Needle */}
          <div
            className="ph-pointer-needle"
            style={{ left: `${pointerPercent}%` }}
            aria-hidden="true"
          >
            <div className="needle-head">
              <span className="needle-val">{clampedVal.toFixed(1)}</span>
            </div>
            <div className="needle-stem" />
          </div>
        </div>

        {/* Scale Numbers Ticks (0 to 14) */}
        <div className="ph-tick-marks" aria-hidden="true">
          <span>0</span>
          <span>2</span>
          <span>4</span>
          <span>6</span>
          <span className="tick-7">7</span>
          <span>8</span>
          <span>10</span>
          <span>12</span>
          <span>14</span>
        </div>

        {/* Accessible Range Slider Overlay across 0 to 14 */}
        <input
          type="range"
          min="0"
          max="14"
          step="0.1"
          value={clampedVal}
          onChange={handleSliderChange}
          aria-label="Soil pH adjustment slider"
          className="ph-slider-input"
        />
      </div>

      {/* Descriptive status & helpful farmer guidance */}
      <div className="ph-advice-box">
        <p className="ph-advice-text">{statusExplanation}</p>
        <span className="ph-note-caption">
          💡 Soil pH reflects soil chemical balance and nutrient availability; it is combined with rainfall, temperature, and nutrients for crop recommendations.
        </span>
      </div>

      {/* Validation warning if out of normal agricultural range */}
      {isExtreme && (
        <div className="ph-validation-warning" role="alert">
          <span className="warning-icon">⚠️</span>
          <span>
            {clampedVal < 3.5
              ? 'Soil pH under 3.5 is extremely rare in arable farm fields. Please verify your soil test report or re-calibrate your test strip.'
              : 'Soil pH above 9.5 indicates extreme alkalinity/salinity. Most crops struggle without gypsum treatment. Please verify your lab test.'}
          </span>
        </div>
      )}
    </div>
  );
}
