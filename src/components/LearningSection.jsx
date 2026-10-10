import React, { useState } from 'react';
import { EDUCATIONAL_TIPS } from '../data/educationalTips.js';
import { BookOpen, AlertCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export function LearningSection({ t }) {
  const [expandedId, setExpandedId] = useState(EDUCATIONAL_TIPS[0]?.id);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="learning-section-container" aria-labelledby="learning-hub-heading">
      {/* Prominent Educational Distinction Banner */}
      <div className="educational-distinction-banner" role="note">
        <AlertCircle size={20} className="banner-icon-alert" />
        <div>
          <span className="banner-badge-title">General Agronomic Science & Good Agricultural Practices</span>
          <p className="banner-badge-desc">
            The knowledge guides below provide proven principles on soil health, crop rotation, and moisture conservation. These are <strong>general educational tips</strong> to empower your farming decisions and are distinct from the personalized crop recommendations generated above.
          </p>
        </div>
      </div>

      <div className="learning-section-header">
        <div className="section-title-wrap">
          <BookOpen className="section-header-icon" />
          <div>
            <h2 id="learning-hub-heading" className="learning-main-heading">
              {t.learningCenter || 'Farming Knowledge Hub'}
            </h2>
            <p className="learning-subheading">
              {t.learningSubtitle || 'Practical science-backed guides on soil health, rotation, and water conservation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Practical Learning Cards */}
      <div className="learning-cards-grid">
        {EDUCATIONAL_TIPS.map((tip) => {
          const isExpanded = expandedId === tip.id;

          return (
            <article
              key={tip.id}
              className={`learning-card-item ${isExpanded ? 'expanded' : ''}`}
            >
              <div
                className="learning-card-top"
                onClick={() => toggleExpand(tip.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(tip.id);
                  }
                }}
              >
                <div className="card-top-left">
                  <span className="card-emoji-avatar">{tip.icon}</span>
                  <div>
                    <span className="card-category-tag">{tip.category}</span>
                    <h3 className="learning-card-title">{tip.title}</h3>
                    <p className="learning-card-subtitle">{tip.subtitle}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="card-chevron-btn"
                  aria-label={isExpanded ? 'Collapse guide' : 'Expand guide'}
                >
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              <div className="learning-card-preview-summary">
                <p>{tip.summary}</p>
              </div>

              {isExpanded && (
                <div className="learning-card-expanded-body">
                  <div className="details-subsections-list">
                    {tip.details.map((det, dIdx) => (
                      <div key={dIdx} className="detail-item-box">
                        <h4 className="detail-heading">{det.heading}</h4>
                        <p className="detail-text">{det.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="farmer-action-callout">
                    <Sparkles size={16} className="sparkle-action-icon" />
                    <div>
                      <strong>Recommended Farmer Action:</strong>
                      <p>{tip.farmerAction}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
