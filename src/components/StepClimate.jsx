import React from 'react';
import { CloudRain, Thermometer, Droplets, ShieldCheck, SunMedium } from 'lucide-react';

export function StepClimate({ inputs, setInputs, t }) {
  const isMetric = inputs.unitSystem !== 'imperial';
  const rainUnit = isMetric ? 'mm' : 'inches';
  const tempUnit = isMetric ? '°C' : '°F';

  const handleInputChange = (field, val) => {
    setInputs((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  return (
    <div className="step-content-card">
      <div className="step-header-area">
        <div className="step-title-icon-wrap">
          <CloudRain className="step-header-icon" />
          <div>
            <h2 className="step-heading">{t.climateTitle || 'Local climate & moisture'}</h2>
            <p className="step-subheading">
              {t.climateSubtitle || 'Enter expected seasonal rainfall and average temperature for your crop cycle.'}
            </p>
          </div>
        </div>
      </div>

      <div className="form-grid two-columns">
        {/* Rainfall Input */}
        <div className="form-group">
          <div className="label-with-tooltip">
            <label htmlFor="rainfall-input" className="form-label">
              <Droplets size={16} className="inline-icon text-blue" />
              {t.rainfall || 'Average Seasonal Rainfall'}
            </label>
          </div>
          <div className="input-with-unit">
            <input
              id="rainfall-input"
              type="number"
              min="0"
              max={isMetric ? 4000 : 160}
              step="10"
              className="number-input"
              value={inputs.rainfall ?? ''}
              onChange={(e) => handleInputChange('rainfall', e.target.value)}
              placeholder={isMetric ? 'e.g., 850' : 'e.g., 34'}
            />
            <span className="unit-badge">{rainUnit}</span>
          </div>
          <span className="field-helper-text">
            {isMetric
              ? 'Arid zones: 200-500 mm • Moderate: 600-1100 mm • Heavy monsoon: 1200+ mm'
              : 'Arid: 8-20 in • Moderate: 24-44 in • Heavy: 48+ in'}
          </span>
        </div>

        {/* Temperature Input */}
        <div className="form-group">
          <div className="label-with-tooltip">
            <label htmlFor="temp-input" className="form-label">
              <Thermometer size={16} className="inline-icon text-amber" />
              {t.temperature || 'Average Temperature'}
            </label>
          </div>
          <div className="input-with-unit">
            <input
              id="temp-input"
              type="number"
              min={isMetric ? -5 : 20}
              max={isMetric ? 55 : 130}
              step="1"
              className="number-input"
              value={inputs.temperature ?? ''}
              onChange={(e) => handleInputChange('temperature', e.target.value)}
              placeholder={isMetric ? 'e.g., 26' : 'e.g., 78'}
            />
            <span className="unit-badge">{tempUnit}</span>
          </div>
          <span className="field-helper-text">
            {isMetric
              ? 'Cool season crops (Wheat/Mustard): 12-24°C • Warm crops (Rice/Cotton): 24-36°C'
              : 'Cool season: 54-75°F • Warm season: 75-96°F'}
          </span>
        </div>
      </div>

      {/* Irrigation Availability Option */}
      <div className="irrigation-card-group">
        <label className="form-label irrigation-main-label">
          {t.irrigationQuestion || 'Do you have irrigation access? (Tube-well, canal, farm pond, or drip)'}
        </label>

        <div className="irrigation-options-grid">
          <button
            type="button"
            className={`irrigation-select-card ${inputs.irrigation ? 'selected' : ''}`}
            onClick={() => handleInputChange('irrigation', true)}
          >
            <div className="irrigation-card-indicator">
              {inputs.irrigation && <ShieldCheck size={20} className="check-icon" />}
            </div>
            <div className="irrigation-card-content">
              <span className="irrigation-card-title">
                💧 {t.yesIrrigation || 'Yes, I have irrigation support'}
              </span>
              <p className="irrigation-card-desc">
                Enables water-intensive crops (Rice, Sugarcane, Vegetables) even when monsoon rainfall is irregular.
              </p>
            </div>
          </button>

          <button
            type="button"
            className={`irrigation-select-card ${!inputs.irrigation ? 'selected' : ''}`}
            onClick={() => handleInputChange('irrigation', false)}
          >
            <div className="irrigation-card-indicator">
              {!inputs.irrigation && <ShieldCheck size={20} className="check-icon" />}
            </div>
            <div className="irrigation-card-content">
              <span className="irrigation-card-title">
                ☀️ {t.noIrrigation || 'No, purely rainfed cultivation'}
              </span>
              <p className="irrigation-card-desc">
                Prioritizes climate-hardy, drought-resilient crops (Millets, Pulses, Chickpea, Sorghum) suited for dry soil.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
