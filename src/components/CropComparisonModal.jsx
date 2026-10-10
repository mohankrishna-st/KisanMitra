import React from 'react';
import { X, Scale, Droplets, Clock, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

export function CropComparisonModal({
  isOpen,
  onClose,
  comparedCrops = [],
  onRemoveCrop,
  t
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog comparison-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Scale className="modal-header-icon" />
            <div>
              <h3 id="comparison-title" className="modal-heading">
                {t.compareTitle || 'Side-by-Side Crop Comparison'}
              </h3>
              <p className="modal-subheading">
                {t.compareSubtitle || 'Compare agronomic needs to choose the safest crop for your family.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body comparison-modal-body">
          {comparedCrops.length < 2 ? (
            <div className="comparison-empty-state">
              <Scale size={48} className="empty-icon" />
              <h4>{t.emptyCompare || 'Select at least 2 crops to compare side-by-side.'}</h4>
              <p>
                Click <strong>"Add to Compare"</strong> on any crop cards on the dashboard to build your comparison table.
              </p>
            </div>
          ) : (
            <div className="comparison-scroll-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="feature-col">Agronomic Feature</th>
                    {comparedCrops.map(({ crop, score, suitabilityTier }) => (
                      <th key={crop.id} className="crop-col">
                        <div className="crop-col-header">
                          <button
                            type="button"
                            className="remove-col-btn"
                            onClick={() => onRemoveCrop(crop.id)}
                            title="Remove from comparison"
                          >
                            <X size={14} /> Remove
                          </button>
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="compare-crop-thumb"
                          />
                          <h4 className="compare-crop-name">{crop.name}</h4>
                          <span className="compare-crop-category">{crop.category}</span>
                          <div className="compare-score-badge">
                            {score}% Match • {suitabilityTier}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Suitability Score */}
                  <tr>
                    <td className="feature-name">Suitability Match</td>
                    {comparedCrops.map(({ crop, score }) => (
                      <td key={crop.id}>
                        <div className="table-bar-container">
                          <div
                            className="table-bar-fill"
                            style={{ width: `${score}%` }}
                          />
                          <span className="table-bar-text">{score}%</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Sowing Season */}
                  <tr>
                    <td className="feature-name">Planting Season</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <span className="table-tag">
                          {crop.seasons.map((s) => s.toUpperCase()).join(', ')}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Water Needs */}
                  <tr>
                    <td className="feature-name">Water Demand</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <div className="flex-align">
                          <Droplets size={16} className="text-blue mr-1" />
                          <strong>{crop.waterNeed}</strong>
                        </div>
                        <span className="sub-detail">
                          ({crop.waterMmRange[0]} - {crop.waterMmRange[1]} mm)
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Growing Duration */}
                  <tr>
                    <td className="feature-name">Duration to Harvest</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <div className="flex-align">
                          <Clock size={16} className="text-amber mr-1" />
                          <strong>{crop.durationText}</strong>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Expected Yield */}
                  <tr>
                    <td className="feature-name">Expected Yield Range</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <div className="flex-align">
                          <TrendingUp size={16} className="text-green mr-1" />
                          <span>{crop.yieldExpectation}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Optimal Soil pH */}
                  <tr>
                    <td className="feature-name">Optimal Soil pH</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <strong>{crop.phRange.optimal[0]} – {crop.phRange.optimal[1]}</strong>
                        <span className="sub-detail">
                          (Tolerates {crop.phRange.min} - {crop.phRange.max})
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Drought / Flood Resilience */}
                  <tr>
                    <td className="feature-name">Drought Resilience</td>
                    {comparedCrops.map(({ crop }) => (
                      <td key={crop.id}>
                        <span className={`resilience-badge resilience-${crop.droughtTolerance.toLowerCase()}`}>
                          {crop.droughtTolerance}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Why it fits reason */}
                  <tr>
                    <td className="feature-name">Why this fits your field</td>
                    {comparedCrops.map(({ crop, whyFits }) => (
                      <td key={crop.id} className="table-why-cell">
                        <p className="table-why-desc">{whyFits}</p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            {t.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
