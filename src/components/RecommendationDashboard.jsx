import React, { useState } from 'react';
import { HeroCropCard } from './HeroCropCard.jsx';
import { CropCard } from './CropCard.jsx';
import {
  RotateCcw,
  Scale,
  Bookmark,
  Share2,
  Filter,
  Info,
  Calendar,
  Check
} from 'lucide-react';

export function RecommendationDashboard({
  recommendations,
  inputs,
  onRecalculate,
  onOpenCompare,
  onSavePlan,
  onOpenShare,
  comparedCropIds = [],
  onToggleCompare,
  language = 'en',
  t,
  isSaved = false
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!recommendations) return null;

  const { topRecommendation, alternatives, allRecommendations } = recommendations;

  // Filter alternatives by category
  const categories = [
    { id: 'all', label: 'All Crops' },
    { id: 'cereal', label: 'Cereals & Millets' },
    { id: 'pulse', label: 'Pulses & Legumes' },
    { id: 'oilseed', label: 'Oilseeds' },
    { id: 'commercial', label: 'Commercial & Cash' },
    { id: 'vegetable', label: 'Vegetables & Tubers' }
  ];

  const filteredAlternatives = alternatives.filter((item) => {
    if (selectedCategory === 'all') return true;
    const cat = item.crop.category.toLowerCase();
    if (selectedCategory === 'cereal') return cat.includes('cereal') || cat.includes('millet');
    if (selectedCategory === 'pulse') return cat.includes('pulse') || cat.includes('legume');
    if (selectedCategory === 'oilseed') return cat.includes('oilseed');
    if (selectedCategory === 'commercial') return cat.includes('commercial') || cat.includes('fiber') || cat.includes('cash');
    if (selectedCategory === 'vegetable') return cat.includes('vegetable') || cat.includes('horticulture') || cat.includes('tuber');
    return true;
  });

  return (
    <section className="recommendation-dashboard-section" aria-label="Crop Recommendations">
      {/* Top Advisory Banner & Quick Actions */}
      <div className="dashboard-summary-bar">
        <div className="summary-left-info">
          <div className="summary-tag-item">
            <Calendar size={15} className="summary-icon" />
            <span>Season: <strong>{inputs.season?.toUpperCase()}</strong></span>
          </div>
          <div className="summary-tag-item">
            <span>Soil pH: <strong>{inputs.ph}</strong></span>
          </div>
          <div className="summary-tag-item">
            <span>Rain: <strong>{inputs.rainfall} mm</strong></span>
          </div>
          <div className="summary-tag-item">
            <span>Irrigation: <strong>{inputs.irrigation ? 'Yes' : 'Rainfed'}</strong></span>
          </div>
        </div>

        <div className="summary-action-buttons">
          <button
            type="button"
            className="dash-action-btn edit-btn"
            onClick={onRecalculate}
            title={t.recalculate || 'Edit Inputs & Recalculate'}
          >
            <RotateCcw size={16} />
            <span>{t.recalculate || 'Edit Inputs'}</span>
          </button>

          <button
            type="button"
            className={`dash-action-btn save-btn ${isSaved ? 'saved-active' : ''}`}
            onClick={onSavePlan}
            title={isSaved ? 'Plan Saved!' : t.savePlan || 'Save Farm Plan'}
          >
            {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
            <span>{isSaved ? 'Saved to Records' : t.savePlan || 'Save Plan'}</span>
          </button>

          <button
            type="button"
            className="dash-action-btn share-btn"
            onClick={onOpenShare}
            title={t.sharePlan || 'Share Advisory'}
          >
            <Share2 size={16} />
            <span>{t.sharePlan || 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Feature Hero Crop Card */}
      <div className="hero-recommendation-wrapper">
        <HeroCropCard
          recommendation={topRecommendation}
          onToggleCompare={onToggleCompare}
          isCompared={comparedCropIds.includes(topRecommendation?.crop?.id)}
          language={language}
          t={t}
        />
      </div>

      {/* Alternative Crops Section */}
      <div className="alternatives-section-wrapper">
        <div className="alternatives-header-bar">
          <div>
            <h3 className="alternatives-heading">
              {t.alternativeCrops || 'Alternative Suitable Crops'}
            </h3>
            <p className="alternatives-subheading">
              Ranked by compatibility with your soil nutrients, pH tolerance, rainfall, and season.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter-pills" role="toolbar" aria-label="Filter crops by category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Alternative Crop Cards Grid */}
        <div className="alternative-cards-grid">
          {filteredAlternatives.map((item) => (
            <CropCard
              key={item.crop.id}
              recommendation={item}
              onToggleCompare={onToggleCompare}
              isCompared={comparedCropIds.includes(item.crop.id)}
              t={t}
            />
          ))}
        </div>
      </div>

      {/* Persistent Floating Compare Bar if crops are selected */}
      {comparedCropIds.length > 0 && (
        <aside className="floating-compare-dock" aria-label="Comparison dock">
          <div className="compare-dock-inner">
            <div className="dock-left-content">
              <Scale size={20} className="dock-scale-icon" />
              <span>
                <strong>{comparedCropIds.length}</strong> {comparedCropIds.length === 1 ? 'crop' : 'crops'} selected for comparison
              </span>
            </div>
            <button
              type="button"
              className="btn-open-compare-modal"
              onClick={onOpenCompare}
            >
              <span>{t.compareCrops || 'Compare Crops'}</span>
              <span className="dock-arrow">→</span>
            </button>
          </div>
        </aside>
      )}

      {/* Transparent Agronomic Disclaimer Footer */}
      <div className="agronomic-disclaimer-card" role="note">
        <Info size={18} className="disclaimer-info-icon" />
        <p className="disclaimer-text">
          {t.disclaimerFooter ||
            'Note: Recommendations are informational guides synthesized from ICAR/FAO agronomic models and sample datasets. Weather patterns and local pest pressures vary. Consult your local agricultural officer before major investments.'}
        </p>
      </div>
    </section>
  );
}
