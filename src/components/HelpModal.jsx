import React from 'react';
import { X, HelpCircle, CheckCircle2 } from 'lucide-react';
import { MEASUREMENT_GUIDE } from '../data/educationalTips.js';

export function HelpModal({ isOpen, onClose, t }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog help-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <HelpCircle className="modal-header-icon" />
            <div>
              <h3 id="help-modal-title" className="modal-heading">
                Soil Testing & Measurement Guide
              </h3>
              <p className="modal-subheading">
                Simple methods to estimate soil conditions without an expensive laboratory.
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

        <div className="modal-body help-modal-body">
          <div className="help-guides-grid">
            {MEASUREMENT_GUIDE.map((guide, idx) => (
              <div key={idx} className="help-guide-card">
                <div className="guide-card-header">
                  <span className="guide-emoji">{guide.icon}</span>
                  <h4 className="guide-title">{guide.title}</h4>
                </div>
                <ol className="guide-steps-list">
                  {guide.steps.map((step, sIdx) => (
                    <li key={sIdx} className="guide-step-item">
                      <CheckCircle2 size={15} className="step-check-icon" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="help-disclaimer-box">
            <p>
              💡 <strong>Farmer Tip:</strong> Government agricultural centers (such as Krishi Vigyan Kendra or extension offices) frequently offer free or low-cost Soil Health Card testing. Bring 500g of dry composite topsoil from four corners of your field for an official test.
            </p>
          </div>
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
