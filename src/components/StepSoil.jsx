import React from 'react';
import { PhScaleIndicator } from './PhScaleIndicator.jsx';
import { REGIONAL_PRESETS } from '../data/presets.js';
import { FlaskConical, HelpCircle, Sparkles, Check } from 'lucide-react';

export function StepSoil({ inputs, setInputs, t, onOpenHelp }) {
  const isMetric = inputs.unitSystem !== 'imperial';
  const unitLabel = isMetric ? 'kg/ha' : 'lbs/acre';

  const handleInputChange = (field, val) => {
    setInputs((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handlePresetSelect = (preset) => {
    setInputs((prev) => ({
      ...prev,
      ...preset.data
    }));
  };

  return (
    <div className="step-content-card">
      <div className="step-header-area">
        <div className="step-title-icon-wrap">
          <FlaskConical className="step-header-icon" />
          <div>
            <h2 className="step-heading">{t.soilTitle || 'Enter your soil test values'}</h2>
            <p className="step-subheading">
              {t.soilSubtitle || 'Check your official Soil Health Card, or enter estimated values for your field.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="help-pill-btn"
          onClick={onOpenHelp}
          aria-label="How to measure soil without a lab"
        >
          <HelpCircle size={16} />
          <span>{t.soilHelpButton || 'How to test soil without a lab?'}</span>
        </button>
      </div>

      {/* Quick-Fill Presets Section */}
      <div className="presets-container">
        <div className="presets-header">
          <Sparkles className="preset-sparkle-icon" size={18} />
          <span className="preset-header-title">{t.quickPresets || 'Quick Soil & Climate Scenarios:'}</span>
        </div>
        <p className="preset-instruction-text">
          {t.presetTip || 'Tap any scenario to autofill typical soil nutrients, pH, rainfall, and season:'}
        </p>

        <div className="presets-grid">
          {REGIONAL_PRESETS.map((preset) => {
            const isSelected =
              inputs.n === preset.data.n &&
              inputs.p === preset.data.p &&
              inputs.k === preset.data.k &&
              inputs.ph === preset.data.ph;

            return (
              <button
                key={preset.id}
                type="button"
                className={`preset-card-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handlePresetSelect(preset)}
              >
                <div className="preset-card-top">
                  <span className="preset-emoji">{preset.icon}</span>
                  <span className="preset-name">{preset.name}</span>
                  {isSelected && <Check size={16} className="preset-check" />}
                </div>
                <p className="preset-desc">{preset.description}</p>
                <div className="preset-tags">
                  <span className="preset-tag">pH: {preset.data.ph}</span>
                  <span className="preset-tag">Season: {preset.data.season.toUpperCase()}</span>
                  <span className="preset-tag">Rain: {preset.data.rainfall} mm</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Measurement Units Toggle */}
      <div className="form-group full-width" style={{ marginBottom: '1.75rem' }}>
        <label className="form-label">{t.units || 'Measurement Units'}</label>
        <div className="unit-toggle-group">
          <button
            type="button"
            className={`unit-toggle-btn ${inputs.unitSystem === 'metric' ? 'active' : ''}`}
            onClick={() => setInputs((prev) => ({ ...prev, unitSystem: 'metric' }))}
          >
            🌱 {t.metric || 'Metric (kg/ha, °C, mm)'}
          </button>
          <button
            type="button"
            className={`unit-toggle-btn ${inputs.unitSystem === 'imperial' ? 'active' : ''}`}
            onClick={() => setInputs((prev) => ({ ...prev, unitSystem: 'imperial' }))}
          >
            🌾 {t.imperial || 'Imperial (lbs/acre, °F, inches)'}
          </button>
        </div>
      </div>

      {/* Primary N-P-K Inputs Grid */}
      <div className="form-grid three-columns">
        {/* Nitrogen */}
        <div className="form-group">
          <div className="label-with-tooltip">
            <label htmlFor="n-input" className="form-label">
              {t.nitrogen || 'Nitrogen (N)'}
            </label>
            <span className="nutrient-purpose-tag n-tag">Leaf & Vegetative</span>
          </div>
          <div className="input-with-unit">
            <input
              id="n-input"
              type="number"
              min="0"
              max="350"
              step="5"
              className="number-input"
              value={inputs.n ?? ''}
              onChange={(e) => handleInputChange('n', e.target.value)}
              placeholder="e.g., 90"
            />
            <span className="unit-badge">{unitLabel}</span>
          </div>
          <span className="field-helper-text">
            Typical range: 40 - 140 {unitLabel}. Essential for vigorous leafy green growth.
          </span>
        </div>

        {/* Phosphorus */}
        <div className="form-group">
          <div className="label-with-tooltip">
            <label htmlFor="p-input" className="form-label">
              {t.phosphorus || 'Phosphorus (P)'}
            </label>
            <span className="nutrient-purpose-tag p-tag">Roots & Flowers</span>
          </div>
          <div className="input-with-unit">
            <input
              id="p-input"
              type="number"
              min="0"
              max="200"
              step="5"
              className="number-input"
              value={inputs.p ?? ''}
              onChange={(e) => handleInputChange('p', e.target.value)}
              placeholder="e.g., 45"
            />
            <span className="unit-badge">{unitLabel}</span>
          </div>
          <span className="field-helper-text">
            Typical range: 25 - 75 {unitLabel}. Fuels root branching and early establishment.
          </span>
        </div>

        {/* Potassium */}
        <div className="form-group">
          <div className="label-with-tooltip">
            <label htmlFor="k-input" className="form-label">
              {t.potassium || 'Potassium (K)'}
            </label>
            <span className="nutrient-purpose-tag k-tag">Stalk & Health</span>
          </div>
          <div className="input-with-unit">
            <input
              id="k-input"
              type="number"
              min="0"
              max="250"
              step="5"
              className="number-input"
              value={inputs.k ?? ''}
              onChange={(e) => handleInputChange('k', e.target.value)}
              placeholder="e.g., 50"
            />
            <span className="unit-badge">{unitLabel}</span>
          </div>
          <span className="field-helper-text">
            Typical range: 30 - 90 {unitLabel}. Improves disease immunity and grain weight.
          </span>
        </div>
      </div>

      {/* Soil pH Section with Real-Time PhScaleIndicator */}
      <div className="ph-section-wrapper">
        <div className="ph-input-header">
          <label htmlFor="ph-input" className="form-label ph-prominent-label">
            {t.soilPh || 'Soil pH Level'}
          </label>
          <div className="input-with-unit ph-number-container">
            <input
              id="ph-input"
              type="number"
              min="0"
              max="14"
              step="0.1"
              className="number-input ph-direct-input"
              value={inputs.ph ?? 7.0}
              onChange={(e) => handleInputChange('ph', e.target.value)}
              onBlur={(e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                  const clamped = Math.min(14, Math.max(0, val));
                  handleInputChange('ph', clamped);
                }
              }}
            />
            <span className="unit-badge">pH</span>
          </div>
        </div>

        {/* Interactive PhScaleIndicator */}
        <PhScaleIndicator
          value={inputs.ph}
          onChange={(newVal) => handleInputChange('ph', newVal)}
        />
      </div>
    </div>
  );
}
