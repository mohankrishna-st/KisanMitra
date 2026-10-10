import React from 'react';
import { Sprout, Globe, Bookmark, BookOpen, HelpCircle, FlaskConical, Home } from 'lucide-react';

export function Header({
  language,
  setLanguage,
  savedCount = 0,
  onOpenSaved,
  onOpenHelp,
  onScrollToLearning,
  onStartSearch,
  viewMode = 'home',
  onStartSoilTest,
  onGoHome,
  t
}) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo & Brand Identity */}
        <div className="brand-wrap" onClick={onGoHome || onStartSearch} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <Sprout size={28} className="logo-sprout" />
          </div>
          <div>
            <h1 className="brand-title">{t.appTitle || 'KisanMitra'}</h1>
            <p className="brand-tagline">{t.appTagline || 'Intelligent Crop Advisory for Small Farmers'}</p>
          </div>
        </div>

        {/* Informational Disclaimer Badge */}
        <div className="header-disclaimer-pill" title="Informational advisory based on agronomic models">
          <span className="dot-pulse" />
          <span>{t.disclaimerBadge || 'Informational Agronomic Advisory • Not Guaranteed Yield'}</span>
        </div>

        {/* Top Navigation & Controls */}
        <div className="header-controls">
          {/* Quick "Test Soil" or "Home" Action */}
          {viewMode === 'home' ? (
            <button
              type="button"
              className="header-test-soil-pill-btn"
              onClick={onStartSoilTest}
              title="Test Soil & Climate"
              aria-label="Test Soil"
            >
              <FlaskConical size={16} />
              <span>{t.testSoilButton || 'Test Soil'}</span>
            </button>
          ) : (
            <button
              type="button"
              className="nav-icon-btn"
              onClick={onGoHome}
              title="Return to Home"
              aria-label="Home"
            >
              <Home size={18} />
              <span className="nav-btn-text">{t.backToHome || 'Home'}</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="language-select-wrapper">
            <Globe size={18} className="globe-icon" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select-dropdown"
              aria-label="Select Application Language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Help Button */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onOpenHelp}
            title="Soil Testing Help"
            aria-label="Soil Testing Help"
          >
            <HelpCircle size={18} />
            <span className="nav-btn-text">Soil Guide</span>
          </button>

          {/* Knowledge Hub Link */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onScrollToLearning}
            title="Farming Knowledge Hub"
            aria-label="Farming Knowledge Hub"
          >
            <BookOpen size={18} />
            <span className="nav-btn-text">Knowledge Hub</span>
          </button>

          {/* Saved Records Button */}
          <button
            type="button"
            className="nav-icon-btn saved-btn"
            onClick={onOpenSaved}
            title="Saved Farm Advisory Records"
            aria-label="Saved Records"
          >
            <Bookmark size={18} />
            <span className="nav-btn-text">Saved</span>
            {savedCount > 0 && <span className="saved-badge-count">{savedCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
