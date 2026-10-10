import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

export function StepSeason({ inputs, setInputs, t }) {
  const seasons = [
    {
      id: 'kharif',
      name: t.seasonMonsoon || 'Kharif / Monsoon',
      subtitle: 'June – October • Rainy Season',
      description: t.seasonMonsoonDesc || 'Abundant monsoon moisture, warm temperatures. Prime for heavy-feeding cereals and legumes.',
      cropsSample: 'Rice, Cotton, Soybean, Maize, Groundnut',
      badge: '🌧️ Monsoon Warmth',
      bgClass: 'season-tile-kharif'
    },
    {
      id: 'rabi',
      name: t.seasonWinter || 'Rabi / Winter',
      subtitle: 'October – March • Cool & Dry Season',
      description: t.seasonWinterDesc || 'Pleasant sunny days, cool crisp nights, and residual soil moisture. Low pest pressure.',
      cropsSample: 'Wheat, Mustard, Chickpea, Potato, Lentil',
      badge: '🌾 Cool Sunshine',
      bgClass: 'season-tile-rabi'
    },
    {
      id: 'zaid',
      name: t.seasonSummer || 'Zaid / Summer',
      subtitle: 'March – June • Warm Dry Season',
      description: t.seasonSummerDesc || 'High solar radiation, hot days. Requires irrigation or drought-hardy short cycle crops.',
      cropsSample: 'Sunflower, Bajra, Summer Moong, Melons',
      badge: '☀️ High Sun',
      bgClass: 'season-tile-zaid'
    },
    {
      id: 'spring',
      name: t.seasonSpring || 'Spring / All-Season',
      subtitle: 'Flexible Transition & Annuals',
      description: t.seasonSpringDesc || 'Moderate temperatures and flexible transition windows suitable for annuals and perennials.',
      cropsSample: 'Sugarcane, Tomato, Maize, Vegetables',
      badge: '🌱 Year-Round',
      bgClass: 'season-tile-spring'
    }
  ];

  const handleSelectSeason = (seasonId) => {
    setInputs((prev) => ({
      ...prev,
      season: seasonId
    }));
  };

  return (
    <div className="step-content-card">
      <div className="step-header-area">
        <div className="step-title-icon-wrap">
          <Calendar className="step-header-icon" />
          <div>
            <h2 className="step-heading">{t.seasonTitle || 'Which planting season are you planning for?'}</h2>
            <p className="step-subheading">
              {t.seasonSubtitle || 'Selecting your season tailors suggestions to local crop calendars and photo-periods.'}
            </p>
          </div>
        </div>
      </div>

      <div className="seasons-grid" role="radiogroup" aria-label="Select planting season">
        {seasons.map((s) => {
          const isSelected = inputs.season === s.id;
          return (
            <div
              key={s.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              className={`season-choice-card ${s.bgClass} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelectSeason(s.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSeason(s.id);
                }
              }}
            >
              <div className="season-card-header">
                <span className="season-badge-tag">{s.badge}</span>
                {isSelected && (
                  <span className="season-selected-indicator" aria-label="Selected">
                    <CheckCircle2 size={20} className="check-icon" />
                  </span>
                )}
              </div>

              <h3 className="season-name">{s.name}</h3>
              <p className="season-timeline">{s.subtitle}</p>
              <p className="season-body-desc">{s.description}</p>

              <div className="season-crops-preview">
                <span className="crops-preview-label">Common Crops:</span>
                <span className="crops-preview-list">{s.cropsSample}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
