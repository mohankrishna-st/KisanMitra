import React from 'react';
import { X, Bookmark, Calendar, ArrowRight, Trash2 } from 'lucide-react';

export function SavedReportsModal({
  isOpen,
  onClose,
  savedReports = [],
  onLoadReport,
  onDeleteReport,
  t
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog saved-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Bookmark className="modal-header-icon" />
            <div>
              <h3 id="saved-modal-title" className="modal-heading">
                {t.savedPlans || 'Saved Farm Advisory Records'}
              </h3>
              <p className="modal-subheading">
                Revisit previously evaluated soil and climate advisory reports.
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

        <div className="modal-body">
          {savedReports.length === 0 ? (
            <div className="saved-empty-state">
              <Bookmark size={44} className="empty-icon text-muted" />
              <h4>No Saved Farm Plans Yet</h4>
              <p>
                When you calculate crop recommendations, click <strong>"Save Farm Plan"</strong> to store your results for future reference or sharing.
              </p>
            </div>
          ) : (
            <div className="saved-cards-list">
              {savedReports.map((report) => (
                <div key={report.id} className="saved-report-card">
                  <div className="saved-card-left">
                    <span className="saved-date-tag">
                      <Calendar size={13} /> {new Date(report.savedAt).toLocaleDateString()}
                    </span>
                    <h4 className="saved-crop-name">
                      🌾 {report.topCropName} ({report.topScore}% Match)
                    </h4>
                    <p className="saved-params-summary">
                      <strong>Season:</strong> {report.inputs.season?.toUpperCase()} •{' '}
                      <strong>Soil pH:</strong> {report.inputs.ph} •{' '}
                      <strong>Rain:</strong> {report.inputs.rainfall} mm
                    </p>
                  </div>

                  <div className="saved-card-actions">
                    <button
                      type="button"
                      className="btn-load-report"
                      onClick={() => {
                        onLoadReport(report);
                        onClose();
                      }}
                      title="Load into advisory form"
                    >
                      <span>Load</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      type="button"
                      className="btn-delete-report"
                      onClick={() => onDeleteReport(report.id)}
                      title="Delete record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
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
