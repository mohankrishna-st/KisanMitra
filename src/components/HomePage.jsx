import React from 'react';
import { REGIONAL_PRESETS } from '../data/presets.js';
import {
  FlaskConical,
  Sparkles,
  CloudRain,
  Calendar,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Droplets,
  Sprout
} from 'lucide-react';

/**
 * HomePage Component
 * Welcoming landing page for farmers.
 * Highlights the core value proposition and provides a prominent "Test Soil"
 * button to navigate directly to the Soil Testing sub-page.
 */
export function HomePage({
  onStartSoilTest,
  onSelectPreset,
  onScrollToLearning,
  onOpenHelp,
  savedCount = 0,
  onOpenSaved,
  t
}) {
  return (
    <div className="home-page-container">
      {/* Hero Welcome Banner */}
      <section className="home-hero-section" aria-label="Hero Overview">
        <div className="hero-badge-pill">
          <Sparkles size={16} className="hero-badge-icon" />
          <span>Small Farmer Science-Backed Agronomic Advisory</span>
        </div>

        <h1 className="home-hero-title">
          Know What Will Grow Best In <span className="highlight-text">Your Soil</span>
        </h1>

        <p className="home-hero-subtitle">
          Don't gamble with seed investments. Accurately test your field's soil nutrients
          (<strong>Nitrogen</strong>, <strong>Phosphorus</strong>, <strong>Potassium</strong>, and full <strong>0–14 Soil pH</strong>)
          against local seasonal rainfall and temperature to harvest the highest possible yield.
        </p>

        {/* Primary Call to Action Button: "Test Soil" */}
        <div className="home-cta-action-area">
          <button
            type="button"
            id="test-soil-main-btn"
            className="btn-main-test-soil pulse-glow"
            onClick={onStartSoilTest}
            aria-label="Start Soil Testing"
          >
            <div className="btn-test-soil-inner">
              <div className="btn-test-soil-icon-wrap">
                <FlaskConical size={28} className="btn-flask-icon" />
              </div>
              <div className="btn-test-soil-text">
                <span className="btn-primary-label">{t.testSoilButton || 'Test Soil'}</span>
                <span className="btn-secondary-label">
                  {t.testSoilSubtitle || 'Test soil N-P-K, pH (0–14), climate & season'}
                </span>
              </div>
              <ArrowRight size={24} className="btn-arrow-icon" />
            </div>
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="hero-trust-strip">
          <div className="trust-item">
            <CheckCircle2 size={16} className="trust-icon" />
            <span>Full 0 – 14 Soil pH scale & liming</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="trust-icon" />
            <span>Rainfall & seasonal temperature matching</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="trust-icon" />
            <span>16 ICAR / FAO verified regional crops</span>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={16} className="trust-icon" />
            <span>100% Free & works on all mobile screens</span>
          </div>
        </div>
      </section>

      {/* Quick Field Scenarios / Presets Section */}
      <section className="home-scenarios-section" aria-label="Quick Field Presets">
        <div className="section-title-wrap">
          <div className="section-title-icon-box">
            <Sparkles size={20} className="section-icon" />
          </div>
          <div>
            <h2 className="section-heading">Quick-Start Field Scenarios</h2>
            <p className="section-subheading">
              Tap any scenario to jump directly into the soil test sub-page with pre-filled lab values:
            </p>
          </div>
        </div>

        <div className="home-presets-grid">
          {REGIONAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="home-preset-card"
              onClick={() => onSelectPreset(preset)}
            >
              <div className="home-preset-card-top">
                <span className="preset-card-emoji">{preset.icon}</span>
                <span className="preset-card-title">{preset.name}</span>
              </div>
              <p className="preset-card-desc">{preset.description}</p>
              <div className="preset-card-metrics">
                <span className="metric-tag">pH: {preset.data.ph}</span>
                <span className="metric-tag">Season: {preset.data.season.toUpperCase()}</span>
                <span className="metric-tag">Rain: {preset.data.rainfall} mm</span>
              </div>
              <div className="preset-card-footer">
                <span>Test this scenario</span>
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3 Steps Testing Process Overview */}
      <section className="home-how-it-works-section" aria-label="How Soil Testing Works">
        <h2 className="section-heading centered">How The 3-Step Soil Advisory Works</h2>
        <p className="section-subheading centered">
          Designed specifically for smallholder and marginal farmers with zero agronomic jargon.
        </p>

        <div className="how-it-works-grid">
          <div className="how-card">
            <div className="how-step-num">1</div>
            <div className="how-icon-wrap soil-icon-wrap">
              <FlaskConical size={26} />
            </div>
            <h3 className="how-title">1. Soil Nutrients & pH</h3>
            <p className="how-text">
              Enter Nitrogen, Phosphorus, Potassium (kg/ha or lbs/acre) and soil pH on our interactive 0–14 gauge.
              Receive instant agricultural liming and gypsum corrections.
            </p>
          </div>

          <div className="how-card">
            <div className="how-step-num">2</div>
            <div className="how-icon-wrap climate-icon-wrap">
              <CloudRain size={26} />
            </div>
            <h3 className="how-title">2. Climate & Moisture</h3>
            <p className="how-text">
              Enter your anticipated seasonal rainfall (200–2500 mm), local temperatures, and whether you have
              tube-well or canal irrigation. Watch the sub-page atmosphere adapt dynamically!
            </p>
          </div>

          <div className="how-card">
            <div className="how-step-num">3</div>
            <div className="how-icon-wrap season-icon-wrap">
              <Calendar size={26} />
            </div>
            <h3 className="how-title">3. Planting Season</h3>
            <p className="how-text">
              Pick your target crop calendar (Kharif monsoon, Rabi winter, Zaid summer, or Spring).
              The system calculates suitability scores across 16 verified staple and cash crops.
            </p>
          </div>
        </div>

        {/* Secondary Test Soil CTA */}
        <div className="home-mid-cta centered">
          <button
            type="button"
            className="btn-wizard-next home-secondary-test-btn"
            onClick={onStartSoilTest}
          >
            <FlaskConical size={20} />
            <span>Launch Soil & Climate Test Sub-Page</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
