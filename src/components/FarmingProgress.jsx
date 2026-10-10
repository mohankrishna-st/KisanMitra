import React from 'react';

/**
 * FarmingProgress Component
 * Friendly farming illustration featuring a farmer ploughing a field with familiar tools.
 * As user completes each step, ploughed furrows and sprouting crops advance across the field.
 * Static/gentle CSS transition, accessible, readable without color alone.
 */
export function FarmingProgress({ currentStep, totalSteps = 3, stepTitles = [], onStepClick }) {
  const steps = [
    { num: 1, title: stepTitles[0] || 'Soil', icon: '🧪' },
    { num: 2, title: stepTitles[1] || 'Climate', icon: '🌦️' },
    { num: 3, title: stepTitles[2] || 'Season', icon: '🌱' }
  ];

  // Furrow progress percentage
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="farming-progress-wrapper" role="region" aria-label="Form completion progress">
      {/* Visual Farmer Ploughing Illustration Scene */}
      <div className="farming-scene-card">
        <svg
          viewBox="0 0 600 120"
          className="farming-illustration-svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>
            <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86EFAC" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
            <linearGradient id="unploughedGround" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2D9CE" />
              <stop offset="100%" stopColor="#C4B5A5" />
            </linearGradient>
            <linearGradient id="ploughedGround" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8D6E63" />
              <stop offset="100%" stopColor="#5D4037" />
            </linearGradient>
          </defs>

          {/* Sky Backdrop */}
          <rect x="0" y="0" width="600" height="70" fill="url(#skyGrad)" rx="8" />

          {/* Gentle Morning Sun */}
          <circle cx="520" cy="28" r="16" fill="#FBBF24" opacity="0.9" />
          <circle cx="520" cy="28" r="22" fill="#FDE68A" opacity="0.4" />

          {/* Distant Rolling Hills */}
          <path d="M0,58 Q120,40 260,54 T600,48 L600,70 L0,70 Z" fill="url(#hillGrad)" opacity="0.65" />
          <path d="M0,64 Q180,50 360,60 T600,56 L600,70 L0,70 Z" fill="#22C55E" opacity="0.5" />

          {/* Trees on the ridge */}
          <circle cx="140" cy="48" r="6" fill="#15803D" />
          <circle cx="148" cy="46" r="8" fill="#166534" />
          <circle cx="430" cy="45" r="7" fill="#166534" />
          <circle cx="438" cy="47" r="5" fill="#15803D" />

          {/* The Farm Field (Base unploughed earth) */}
          <rect x="0" y="70" width="600" height="50" fill="url(#unploughedGround)" rx="4" />

          {/* Unploughed grass tufts */}
          <g stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
            <path d="M420,85 L423,78 M423,85 L426,80" />
            <path d="M490,92 L493,86 M493,92 L496,88" />
            <path d="M550,88 L553,82 M553,88 L557,84" />
          </g>

          {/* Dynamic Ploughed Field Width based on current step */}
          <g className="ploughed-section-group">
            <rect
              x="0"
              y="70"
              width={Math.min(600, Math.max(160, (currentStep / 3) * 600))}
              height="50"
              fill="url(#ploughedGround)"
              className="ploughed-ground-rect"
            />

            {/* Ploughed Furrow Lines */}
            <path
              d={`M0,78 H${Math.min(600, (currentStep / 3) * 600)} M0,88 H${Math.min(600, (currentStep / 3) * 600)} M0,98 H${Math.min(600, (currentStep / 3) * 600)} M0,108 H${Math.min(600, (currentStep / 3) * 600)}`}
              stroke="#3E2723"
              strokeWidth="2.5"
              strokeDasharray="8 3"
              opacity="0.75"
            />

            {/* Growing Green Shoots in Completed Furrows */}
            {currentStep >= 1 && (
              <g fill="#4ADE80" stroke="#166534" strokeWidth="0.8">
                <path d="M50,82 C48,76 52,74 54,78 C56,74 60,76 58,82 Z" />
                <path d="M100,92 C98,86 102,84 104,88 C106,84 110,86 108,92 Z" />
              </g>
            )}
            {currentStep >= 2 && (
              <g fill="#4ADE80" stroke="#166534" strokeWidth="0.8">
                <path d="M190,82 C188,76 192,74 194,78 C196,74 200,76 198,82 Z" />
                <path d="M260,92 C258,86 262,84 264,88 C266,84 270,86 268,92 Z" />
                <path d="M330,102 C328,96 332,94 334,98 C336,94 340,96 338,102 Z" />
              </g>
            )}
            {currentStep >= 3 && (
              <g fill="#22C55E" stroke="#14532D" strokeWidth="1">
                <path d="M400,80 C398,72 404,70 406,76 C408,70 414,72 412,80 Z" />
                <path d="M460,90 C458,82 464,80 466,86 C468,80 474,82 472,90 Z" />
                <path d="M520,80 C518,72 524,70 526,76 C528,70 534,72 532,80 Z" />
              </g>
            )}
          </g>

          {/* Farmer & Traditional Wooden Plough / Oxen Representation at current position */}
          <g
            transform={`translate(${Math.min(520, Math.max(90, (currentStep / 3) * 580 - 60))}, 62)`}
            className="farmer-plough-avatar"
          >
            {/* Wooden Plough Shaft & Share */}
            <path d="M12,24 L26,38 L42,34" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
            <polygon points="24,40 30,42 27,35" fill="#374151" />

            {/* Farmer Figure */}
            <ellipse cx="6" cy="10" rx="9" ry="3" fill="#D97706" />
            <circle cx="6" cy="9" r="4.5" fill="#B45309" />
            <circle cx="6" cy="12" r="3.5" fill="#FBBF24" />
            <path d="M3,16 L9,16 L11,29 L1,29 Z" fill="#15803D" />
            <path d="M2,29 L5,42 M7,29 L10,41" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M7,19 L16,24" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />

            {/* Working Oxen */}
            <path d="M36,22 Q48,16 56,24 L56,36 Q46,38 36,36 Z" fill="#78350F" opacity="0.9" />
            <circle cx="58" cy="22" r="6" fill="#78350F" />
            <path d="M57,18 Q55,12 52,14 M61,18 Q63,12 66,14" stroke="#D1D5DB" strokeWidth="1.8" fill="none" />
            <path d="M38,36 L38,44 M42,36 L42,43 M50,36 L50,44 M54,36 L54,43" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>

        {/* Progress Narrative Badge */}
        <div className="farming-progress-status-bar">
          <div className="progress-status-info">
            <span className="step-counter-badge">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="step-narrative-text">
              {currentStep === 1 && 'Testing soil N, P, K & balancing pH levels...'}
              {currentStep === 2 && 'Measuring rainfall & seasonal temperatures...'}
              {currentStep === 3 && 'Selecting planting season & calculating harvest potential!'}
            </span>
          </div>

          <div className="progress-percent-indicator" aria-hidden="true">
            <span className="percent-num">{progressPercent}%</span> Ready
          </div>
        </div>
      </div>

      {/* Step Buttons / Navigation Tabs */}
      <nav className="step-indicator-nav" aria-label="Form Steps">
        <ol className="step-pills-list" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {steps.map((st) => {
            const isCompleted = st.num < currentStep;
            const isCurrent = st.num === currentStep;

            return (
              <li key={st.num} className="step-pill-item">
                <button
                  type="button"
                  className={`step-pill-btn ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => onStepClick && onStepClick(st.num)}
                  disabled={st.num > currentStep}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  <span className="step-pill-indicator">
                    {isCompleted ? '✓' : st.num}
                  </span>
                  <span className="step-pill-content">
                    <span className="step-pill-icon">{st.icon}</span>
                    <span className="step-pill-title">{st.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
