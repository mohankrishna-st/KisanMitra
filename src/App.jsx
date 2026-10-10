import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TRANSLATIONS } from './i18n/translations.js';
import { runRecommendationEngine } from './engine/recommendationEngine.js';

import { Header } from './components/Header.jsx';
import { HomePage } from './components/HomePage.jsx';
import { FallingLeaves } from './components/FallingLeaves.jsx';
import { FarmingProgress } from './components/FarmingProgress.jsx';
import { StepSoil } from './components/StepSoil.jsx';
import { StepClimate } from './components/StepClimate.jsx';
import { StepSeason } from './components/StepSeason.jsx';
import { RecommendationDashboard } from './components/RecommendationDashboard.jsx';
import { CropComparisonModal } from './components/CropComparisonModal.jsx';
import { SavedReportsModal } from './components/SavedReportsModal.jsx';
import { ShareModal } from './components/ShareModal.jsx';
import { HelpModal } from './components/HelpModal.jsx';
import { LearningSection } from './components/LearningSection.jsx';

import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export function App() {
  const [language, setLanguage] = useState('en');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Multi-step state: 1 (Soil), 2 (Climate), 3 (Season)
  const [currentStep, setCurrentStep] = useState(1);
  // View modes: 'home' (landing page), 'test-soil' (sub-page), 'results' (recommendation dashboard)
  const [viewMode, setViewMode] = useState('home');

  // Farmer Inputs State initialized with realistic default
  const [inputs, setInputs] = useState({
    unitSystem: 'metric',
    n: 95,
    p: 48,
    k: 50,
    ph: 6.5,
    rainfall: 850,
    temperature: 26,
    irrigation: true,
    season: 'kharif'
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Calculation Results
  const [recommendations, setRecommendations] = useState(null);

  // Comparison State
  const [comparedCropIds, setComparedCropIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Saved Records State (persisted in localStorage)
  const [savedReports, setSavedReports] = useState([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isPlanSaved, setIsPlanSaved] = useState(false);

  // Share and Help Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const learningSectionRef = useRef(null);

  // Dynamic climate & soil environment calculations
  const rainNum = parseFloat(inputs.rainfall) || 0;
  const tempNum = parseFloat(inputs.temperature) || 25;
  const rainCategory = rainNum < 500 ? 'arid' : rainNum <= 1100 ? 'moderate' : 'monsoon';
  const tempCategory = tempNum < 18 ? 'cool' : tempNum <= 30 ? 'pleasant' : 'hot';

  const rainLabel = rainNum < 500 ? 'Semi-Arid Dryland' : rainNum <= 1100 ? 'Moderate Showers' : 'Heavy Monsoon Rain';
  const tempLabel = tempNum < 18 ? 'Cool Season' : tempNum <= 30 ? 'Warm Vegetative' : 'High Solar Heat';
  const phNum = parseFloat(inputs.ph) || 7.0;
  const phLabel = phNum < 6.0 ? 'Acidic' : phNum <= 7.5 ? 'Neutral Sweet Spot' : 'Alkaline';

  // Load saved records from localStorage on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smart_crop_saved_reports');
      if (stored) {
        setSavedReports(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('LocalStorage access not available:', e);
    }
  }, []);

  // Save records to localStorage
  const persistSavedReports = (newList) => {
    setSavedReports(newList);
    try {
      localStorage.setItem('smart_crop_saved_reports', JSON.stringify(newList));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  // Step Validation Logic
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      const nVal = parseFloat(inputs.n);
      const pVal = parseFloat(inputs.p);
      const kVal = parseFloat(inputs.k);
      const phVal = parseFloat(inputs.ph);

      if (isNaN(nVal) || nVal < 0 || nVal > 350) {
        newErrors.n = 'Nitrogen should be a realistic value between 0 and 350 kg/ha.';
      }
      if (isNaN(pVal) || pVal < 0 || pVal > 250) {
        newErrors.p = 'Phosphorus should be a realistic value between 0 and 250 kg/ha.';
      }
      if (isNaN(kVal) || kVal < 0 || kVal > 300) {
        newErrors.k = 'Potassium should be a realistic value between 0 and 300 kg/ha.';
      }
      // User can input pH values from 0 to 14
      if (isNaN(phVal) || phVal < 0 || phVal > 14) {
        newErrors.ph = 'Soil pH must be between 0 and 14.';
      }
    }

    if (step === 2) {
      const rainVal = parseFloat(inputs.rainfall);
      const tempVal = parseFloat(inputs.temperature);

      if (isNaN(rainVal) || rainVal < 0) {
        newErrors.rainfall = 'Rainfall cannot be negative.';
      }
      if (isNaN(tempVal)) {
        newErrors.temperature = 'Please provide an average temperature.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStartSoilTest = () => {
    setViewMode('test-soil');
    setCurrentStep(1);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPresetFromHome = (preset) => {
    setInputs((prev) => ({ ...prev, ...preset.data }));
    setViewMode('test-soil');
    setCurrentStep(1);
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        handleCalculate();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleCalculate = () => {
    if (!validateStep(currentStep)) return;

    const results = runRecommendationEngine(inputs);
    setRecommendations(results);
    setViewMode('results');
    setIsPlanSaved(false);

    // Initial compare list with top 2 crops for convenience
    if (results.allRecommendations.length >= 2) {
      setComparedCropIds([
        results.topRecommendation.crop.id,
        results.alternatives[0]?.crop.id
      ]);
    }

    // Gentle celebration burst
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4CAF50', '#81C784', '#FDD835', '#2E7D32']
      });
    } catch (e) {
      // Ignore if unavailable
    }

    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleRecalculate = () => {
    setViewMode('test-soil');
    window.scrollTo({ top: 80, behavior: 'smooth' });
  };

  const handleSavePlan = () => {
    if (!recommendations) return;
    const newRecord = {
      id: 'report_' + Date.now(),
      savedAt: new Date().toISOString(),
      inputs: { ...inputs },
      topCropName: recommendations.topRecommendation?.crop?.name,
      topScore: recommendations.topRecommendation?.score
    };

    const updated = [newRecord, ...savedReports.slice(0, 19)];
    persistSavedReports(updated);
    setIsPlanSaved(true);
  };

  const handleLoadSavedReport = (record) => {
    setInputs(record.inputs);
    const results = runRecommendationEngine(record.inputs);
    setRecommendations(results);
    setViewMode('results');
    setIsPlanSaved(true);
  };

  const handleDeleteSavedReport = (id) => {
    const updated = savedReports.filter((r) => r.id !== id);
    persistSavedReports(updated);
  };

  const handleToggleCompare = (cropId) => {
    setComparedCropIds((prev) => {
      if (prev.includes(cropId)) {
        return prev.filter((id) => id !== cropId);
      } else {
        if (prev.length >= 3) {
          return [prev[0], prev[1], cropId];
        }
        return [...prev, cropId];
      }
    });
  };

  const handleRemoveCompareCrop = (cropId) => {
    setComparedCropIds((prev) => prev.filter((id) => id !== cropId));
  };

  const comparedCropsData = recommendations?.allRecommendations.filter((r) =>
    comparedCropIds.includes(r.crop.id)
  ) || [];

  const handleScrollToLearning = () => {
    if (viewMode !== 'home') {
      setViewMode('home');
      setTimeout(() => {
        learningSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      learningSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`app-root season-theme-${inputs.season || 'kharif'} subpage-season-${inputs.season || 'kharif'} climate-rain-${rainCategory} climate-temp-${tempCategory}`}
    >
      {/* Background Falling Leaves Ambient Effect */}
      <FallingLeaves
        season={inputs.season}
        rainfall={rainNum}
        temperature={tempNum}
      />

      {/* Ambient background light in corner for atmosphere */}
      <div className="ambient-corner-glow" aria-hidden="true" />

      {/* App Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        savedCount={savedReports.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onScrollToLearning={handleScrollToLearning}
        viewMode={viewMode}
        onStartSoilTest={handleStartSoilTest}
        onGoHome={handleGoHome}
        t={t}
      />

      <main className="main-content-container">
        {/* 1. Main Home Page */}
        {viewMode === 'home' ? (
          <>
            <HomePage
              onStartSoilTest={handleStartSoilTest}
              onSelectPreset={handleSelectPresetFromHome}
              onScrollToLearning={handleScrollToLearning}
              onOpenHelp={() => setIsHelpModalOpen(true)}
              savedCount={savedReports.length}
              onOpenSaved={() => setIsSavedModalOpen(true)}
              t={t}
            />

            {/* Learning Hub Section (Educational guides) */}
            <div ref={learningSectionRef}>
              <LearningSection t={t} />
            </div>
          </>
        ) : viewMode === 'test-soil' ? (
          /* 2. Soil Testing Sub-Page with Dynamic Atmosphere */
          <section className="subpage-container" aria-label="Soil & Climate Testing Sub-Page">
            {/* Sub-Page Top Navigation Bar & Dynamic Atmosphere Status */}
            <div className="subpage-top-bar">
              <button
                type="button"
                className="subpage-back-btn"
                onClick={handleGoHome}
                aria-label="Back to Home"
              >
                <ArrowLeft size={18} />
                <span>{t.backToHome || 'Back to Home'}</span>
              </button>

              <div className="subpage-ambience-strip" aria-label="Current Field Ambiance">
                <span className="ambience-title-tag">Field Ambiance:</span>
                <span className={`ambience-pill ambience-pill-season-${inputs.season}`}>
                  🗓️ {inputs.season?.toUpperCase()}
                </span>
                <span className="ambience-pill ambience-pill-rain">
                  🌦️ {rainNum} mm ({rainLabel})
                </span>
                <span className="ambience-pill ambience-pill-temp">
                  🌡️ {tempNum}°C ({tempLabel})
                </span>
                <span className="ambience-pill ambience-pill-ph">
                  🧪 pH {phNum.toFixed(1)} ({phLabel})
                </span>
              </div>
            </div>

            {/* Friendly Farming Progress Illustration Scene */}
            <FarmingProgress
              currentStep={currentStep}
              totalSteps={3}
              stepTitles={[t.step1, t.step2, t.step3]}
              onStepClick={(stNum) => {
                if (validateStep(currentStep)) {
                  setCurrentStep(stNum);
                }
              }}
            />

            {/* Validation Error Banner if any */}
            {Object.keys(errors).length > 0 && (
              <div className="validation-error-alert" role="alert">
                <AlertCircle size={20} className="error-alert-icon" />
                <div>
                  <strong>Please correct the following field values:</strong>
                  <ul>
                    {Object.values(errors).map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Dynamic Step Component */}
            <div className="step-card-container">
              {currentStep === 1 && (
                <StepSoil
                  inputs={inputs}
                  setInputs={setInputs}
                  t={t}
                  onOpenHelp={() => setIsHelpModalOpen(true)}
                />
              )}
              {currentStep === 2 && (
                <StepClimate inputs={inputs} setInputs={setInputs} t={t} />
              )}
              {currentStep === 3 && (
                <StepSeason inputs={inputs} setInputs={setInputs} t={t} />
              )}

              {/* Wizard Bottom Navigation Buttons */}
              <div className="step-navigation-bar">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="btn-wizard-prev"
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft size={18} />
                    <span>{t.prevStep || 'Previous Step'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-wizard-prev"
                    onClick={handleGoHome}
                  >
                    <ArrowLeft size={18} />
                    <span>{t.backToHome || 'Back to Home'}</span>
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    className="btn-wizard-next"
                    onClick={handleNextStep}
                  >
                    <span>{t.nextStep || 'Continue to Next Step'}</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-wizard-submit"
                    onClick={handleCalculate}
                  >
                    <Sparkles size={18} />
                    <span>{t.calculateResults || 'Calculate Crop Recommendations'}</span>
                  </button>
                )}
              </div>
            </div>
          </section>
        ) : (
          /* 3. Results Dashboard View */
          <>
            <div className="subpage-top-bar" style={{ marginBottom: '1.25rem' }}>
              <button
                type="button"
                className="subpage-back-btn"
                onClick={handleGoHome}
                aria-label="Back to Home"
              >
                <ArrowLeft size={18} />
                <span>{t.backToHome || 'Back to Home'}</span>
              </button>
              <button
                type="button"
                className="header-test-soil-pill-btn"
                onClick={handleRecalculate}
              >
                <Sparkles size={16} />
                <span>{t.recalculate || 'Edit Inputs & Recalculate'}</span>
              </button>
            </div>

            <RecommendationDashboard
              recommendations={recommendations}
              inputs={inputs}
              onRecalculate={handleRecalculate}
              onOpenCompare={() => setIsCompareModalOpen(true)}
              onSavePlan={handleSavePlan}
              onOpenShare={() => setIsShareModalOpen(true)}
              comparedCropIds={comparedCropIds}
              onToggleCompare={handleToggleCompare}
              language={language}
              t={t}
              isSaved={isPlanSaved}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">🌱 KisanMitra</span>
            <p className="footer-mission">
              Empowering small and marginal farmers with data-informed agronomic guidance, sustainable soil stewardship, and climate resilience.
            </p>
          </div>
          <div className="footer-links">
            <button type="button" onClick={() => setIsHelpModalOpen(true)}>
              DIY Soil Test Guide
            </button>
            <button type="button" onClick={handleScrollToLearning}>
              Farming Knowledge Hub
            </button>
            <button type="button" onClick={() => setIsSavedModalOpen(true)}>
              Saved Records ({savedReports.length})
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 KisanMitra • Agronomic Decision Support System</p>
        </div>
      </footer>

      {/* Modals */}
      <CropComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedCrops={comparedCropsData}
        onRemoveCrop={handleRemoveCompareCrop}
        t={t}
      />

      <SavedReportsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedReports={savedReports}
        onLoadReport={handleLoadSavedReport}
        onDeleteReport={handleDeleteSavedReport}
        t={t}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        recommendations={recommendations}
        inputs={inputs}
        t={t}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        t={t}
      />
    </div>
  );
}

export default App;
