import React, { useState } from 'react';
import { X, Share2, Copy, Check, Printer, MessageCircle } from 'lucide-react';

export function ShareModal({
  isOpen,
  onClose,
  recommendations,
  inputs,
  t
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !recommendations) return null;

  const { topRecommendation, alternatives } = recommendations;
  const top = topRecommendation?.crop;
  const topScore = topRecommendation?.score;

  // Generate WhatsApp and SMS friendly formatted summary
  const summaryText = `🌾 *KisanMitra Farm Advisory Report*
---------------------------------------
🗓️ *Season:* ${inputs.season?.toUpperCase()}
🌱 *Soil Values:* N: ${inputs.n} kg/ha | P: ${inputs.p} kg/ha | K: ${inputs.k} kg/ha | pH: ${inputs.ph}
🌦️ *Climate:* ${inputs.rainfall} mm Rain | ${inputs.temperature}°C Temp | ${inputs.irrigation ? 'Irrigated' : 'Rainfed'}

🌟 *Top Recommended Crop:* ${top?.name || 'N/A'} (${topScore}% Suitability)
• *Growing Cycle:* ${top?.durationText}
• *Water Requirement:* ${top?.waterNeed}
• *Typical Yield:* ${top?.yieldExpectation}
• *Why this fits:* ${topRecommendation?.whyFits}

🌿 *Alternative Options:*
${alternatives?.slice(0, 3).map((a, i) => `${i + 1}. ${a.crop.name} (${a.score}% match - ${a.suitabilityTier})`).join('\n')}

⚠️ *Agronomic Notice:* Informational guidance based on ICAR/FAO agronomic models. Please cross-check with your local agricultural officer.
---------------------------------------
Generated via KisanMitra: Intelligent Agricultural Advisory`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(summaryText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `KisanMitra Advisory: ${top?.name}`,
          text: summaryText
        });
      } catch (err) {
        // Fallback to copy if cancelled or unsupported
      }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-dialog share-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Share2 className="modal-header-icon" />
            <div>
              <h3 id="share-modal-title" className="modal-heading">
                {t.sharePlan || 'Share Crop Advisory'}
              </h3>
              <p className="modal-subheading">
                Share this summary with your family or your local agricultural officer.
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
          {/* Quick Action Share Buttons */}
          <div className="share-quick-buttons-row">
            <button
              type="button"
              className="share-action-btn whatsapp-btn"
              onClick={handleWhatsAppShare}
            >
              <MessageCircle size={18} />
              <span>Share to WhatsApp</span>
            </button>

            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                type="button"
                className="share-action-btn native-share-btn"
                onClick={handleNativeShare}
              >
                <Share2 size={18} />
                <span>Mobile Share</span>
              </button>
            )}

            <button
              type="button"
              className="share-action-btn print-btn"
              onClick={handlePrint}
            >
              <Printer size={18} />
              <span>Print Farmer Summary</span>
            </button>
          </div>

          {/* Copyable Summary Box */}
          <div className="share-summary-preview">
            <div className="summary-preview-header">
              <span>Plain-Text Advisory Summary:</span>
              <button
                type="button"
                className="btn-copy-small"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-green" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <pre className="summary-pre-text">{summaryText}</pre>
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
