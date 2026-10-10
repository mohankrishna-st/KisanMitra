import React, { useState } from 'react';
import { VoiceReaderButton } from './VoiceReaderButton.jsx';
import {
  Sparkles,
  Droplets,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Scale,
  ChevronDown,
  ChevronUp,
  Check,
  BookOpen
} from 'lucide-react';

export function HeroCropCard({
  recommendation,
  onToggleCompare,
  isCompared,
  language = 'en',
  t
}) {
  const [imageError, setImageError] = useState(false);
  const [showFullCare, setShowFullCare] = useState(false);

  if (!recommendation) return null;

  const { crop, score, suitabilityTier, whyFits, suitableConditions, potentialConcerns } = recommendation;

  // Text string for voice narration
  const speechText = `${crop.name}. Suitability score ${score} percent, ${suitabilityTier}. ${whyFits} Expected growing duration is ${crop.durationText}. Expected yield is ${crop.yieldExpectation}.`;

  return (
    <article className="hero-crop-card" aria-label={`Top recommendation: ${crop.name}`}>
      {/* Top Banner Tag */}
      <div className="hero-feature-banner">
        <Sparkles size={18} className="banner-icon" />
        <span>Top Recommended Crop For Your Field</span>
      </div>

      <div className="hero-card-grid">
        {/* Left Column: Real-life Crop Image with graceful fallback */}
        <div className="hero-image-container">
          {!imageError ? (
            <img
              src={crop.image}
              alt={`Freshly harvested ${crop.name} in field`}
              className="hero-crop-img"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="hero-image-fallback"
              style={{ backgroundColor: crop.fallbackBg || '#2E7D32' }}
              aria-label={crop.name}
            >
              <span className="fallback-emoji">🌾</span>
              <span className="fallback-crop-name">{crop.name}</span>
              <span className="fallback-sci-name">{crop.scientificName}</span>
            </div>
          )}

          {/* Floating Badges on Image */}
          <div className="hero-floating-badges">
            <span className="hero-season-badge">
              🌱 {crop.seasons.map((s) => s.toUpperCase()).join(' / ')}
            </span>
            <span className="hero-category-badge">{crop.category}</span>
          </div>
        </div>

        {/* Right Column: Key Details & Suitability Score */}
        <div className="hero-content-container">
          <div className="hero-header-row">
            <div>
              <h3 className="hero-crop-title">{crop.name}</h3>
              <p className="hero-scientific-name">
                <em>{crop.scientificName}</em>
              </p>
            </div>

            {/* Suitability Score Circle / Pill */}
            <div className="hero-score-badge-wrap">
              <div className="hero-score-number">{score}%</div>
              <div className="hero-score-tier">{suitabilityTier}</div>
            </div>
          </div>

          {/* Plain-Language "Why This Fits" Section */}
          <div className="why-fits-box">
            <h4 className="why-fits-heading">
              🌾 {t.whyThisFits || 'Why this crop fits your farm'}:
            </h4>
            <p className="why-fits-text">{whyFits}</p>
          </div>

          {/* Quick Agronomic Metrics Bar */}
          <div className="agronomic-metrics-row">
            <div className="metric-item">
              <Droplets size={18} className="metric-icon text-blue" />
              <div>
                <span className="metric-label">{t.waterNeeds || 'Water Needs'}</span>
                <strong className="metric-value">{crop.waterNeed}</strong>
              </div>
            </div>

            <div className="metric-item">
              <Clock size={18} className="metric-icon text-amber" />
              <div>
                <span className="metric-label">{t.duration || 'Growing Duration'}</span>
                <strong className="metric-value">{crop.durationText}</strong>
              </div>
            </div>

            <div className="metric-item">
              <TrendingUp size={18} className="metric-icon text-green" />
              <div>
                <span className="metric-label">{t.expectedYield || 'Typical Yield'}</span>
                <strong className="metric-value">{crop.yieldExpectation}</strong>
              </div>
            </div>
          </div>

          {/* Conditions Lists: Suitable vs Watch-outs */}
          <div className="conditions-dual-grid">
            {/* Suitable conditions */}
            <div className="condition-column favorable">
              <h5 className="condition-title text-green">
                <CheckCircle size={16} />
                <span>{t.favorableFactors || 'Favorable Conditions'}</span>
              </h5>
              <ul className="condition-list">
                {suitableConditions.slice(0, 3).map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.label}:</strong> {item.detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential concerns / flags */}
            <div className="condition-column concerns">
              <h5 className="condition-title text-amber">
                <AlertTriangle size={16} />
                <span>{t.watchOut || 'Care & Watch-outs'}</span>
              </h5>
              {potentialConcerns.length > 0 ? (
                <ul className="condition-list">
                  {potentialConcerns.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.detail}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-concern-text">
                  ✓ No major agronomic stress factors identified for this field profile!
                </p>
              )}
            </div>
          </div>

          {/* Expandable Agronomic Care Tips */}
          {crop.careTips && crop.careTips.length > 0 && (
            <div className="hero-care-tips-wrapper">
              <button
                type="button"
                className="care-tips-toggle-btn"
                onClick={() => setShowFullCare(!showFullCare)}
                aria-expanded={showFullCare}
              >
                <BookOpen size={16} />
                <span>{showFullCare ? 'Hide Practical Field Tips' : 'View Practical Field Care Tips'}</span>
                {showFullCare ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showFullCare && (
                <ul className="care-tips-expanded-list">
                  {crop.careTips.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Hero Action Buttons */}
          <div className="hero-action-footer">
            <VoiceReaderButton
              textToRead={speechText}
              label={t.listenVoice || 'Listen to Advisory'}
              language={language}
            />

            <button
              type="button"
              className={`compare-toggle-btn ${isCompared ? 'active' : ''}`}
              onClick={() => onToggleCompare(crop.id)}
            >
              {isCompared ? (
                <>
                  <Check size={16} />
                  <span>Added to Compare</span>
                </>
              ) : (
                <>
                  <Scale size={16} />
                  <span>{t.addToCompare || 'Add to Compare'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
