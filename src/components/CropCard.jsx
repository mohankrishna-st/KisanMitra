import React, { useState } from 'react';
import {
  Droplets,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Scale,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function CropCard({
  recommendation,
  onToggleCompare,
  isCompared,
  t
}) {
  const [imageError, setImageError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!recommendation) return null;

  const { crop, score, suitabilityTier, whyFits, suitableConditions, potentialConcerns } = recommendation;

  return (
    <article className="crop-card-item" aria-label={`Alternative crop: ${crop.name}`}>
      {/* Top Media Bar */}
      <div className="crop-card-image-wrap">
        {!imageError ? (
          <img
            src={crop.image}
            alt={crop.name}
            className="crop-card-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="crop-card-fallback-bg"
            style={{ backgroundColor: crop.fallbackBg || '#4A7C59' }}
          >
            <span className="card-fallback-emoji">🌱</span>
            <span className="card-fallback-title">{crop.name}</span>
          </div>
        )}

        {/* Floating Season Tag */}
        <span className="crop-card-season-tag">
          {crop.seasons.map((s) => s.toUpperCase()).join(' • ')}
        </span>

        {/* Suitability Score Pill */}
        <div className={`crop-card-score-pill score-${score >= 80 ? 'high' : score >= 65 ? 'med' : 'low'}`}>
          <span className="pill-score">{score}%</span>
          <span className="pill-label">{suitabilityTier}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="crop-card-body">
        <div className="crop-card-titles">
          <h4 className="crop-name">{crop.name}</h4>
          <span className="crop-sci-name">
            <em>{crop.scientificName}</em> • {crop.category}
          </span>
        </div>

        {/* Short Summary Snippet */}
        <p className="crop-card-summary">{crop.summary}</p>

        {/* Quick Metrics Icons */}
        <div className="crop-card-specs-row">
          <span className="spec-badge" title="Water Needs">
            <Droplets size={14} className="spec-icon text-blue" />
            <span>{crop.waterNeed}</span>
          </span>
          <span className="spec-badge" title="Growing Duration">
            <Clock size={14} className="spec-icon text-amber" />
            <span>{crop.durationText}</span>
          </span>
          <span className="spec-badge" title="Typical Yield">
            <TrendingUp size={14} className="spec-icon text-green" />
            <span>{crop.yieldExpectation.split('/')[0]}</span>
          </span>
        </div>

        {/* Expandable "Why this fits" & Concerns Accordion */}
        <div className="crop-card-accordion-section">
          <button
            type="button"
            className="accordion-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Hide Suitability Breakdown' : 'Why this fits & Concerns'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isExpanded && (
            <div className="accordion-content-panel">
              <div className="accordion-why-text">
                <strong>Why it fits:</strong> {whyFits}
              </div>

              {/* Favorable highlights */}
              {suitableConditions.length > 0 && (
                <div className="mini-condition-group">
                  <span className="mini-condition-title text-green">
                    <CheckCircle size={14} /> Favorable factors:
                  </span>
                  <ul className="mini-condition-list">
                    {suitableConditions.slice(0, 2).map((item, idx) => (
                      <li key={idx}>• {item.label}: {item.detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns if any */}
              {potentialConcerns.length > 0 && (
                <div className="mini-condition-group">
                  <span className="mini-condition-title text-amber">
                    <AlertTriangle size={14} /> Things to watch:
                  </span>
                  <ul className="mini-condition-list">
                    {potentialConcerns.map((item, idx) => (
                      <li key={idx}>• {item.label}: {item.detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="crop-card-footer">
          <button
            type="button"
            className={`card-compare-btn ${isCompared ? 'selected' : ''}`}
            onClick={() => onToggleCompare(crop.id)}
            aria-pressed={isCompared}
          >
            {isCompared ? (
              <>
                <Check size={16} />
                <span>Selected for Compare</span>
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
    </article>
  );
}
