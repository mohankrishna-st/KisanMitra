/**
 * KisanMitra Crop Recommendation Engine
 * Evaluates farmer inputs against agronomic requirements and generates
 * suitability scores with plain-language, transparent farmer explanations.
 */

import { CROPS_DATA } from '../data/crops.js';

export function runRecommendationEngine(farmerInputs) {
  const {
    n = 80,
    p = 40,
    k = 40,
    ph = 6.5,
    rainfall = 800,
    temperature = 25,
    season = 'kharif',
    irrigation = true,
    unitSystem = 'metric'
  } = farmerInputs;

  // Normalize inputs to metric if needed
  const normalizedTemp = unitSystem === 'imperial' ? ((temperature - 32) * 5) / 9 : Number(temperature);
  const normalizedRainfall = unitSystem === 'imperial' ? Number(rainfall) * 25.4 : Number(rainfall);
  const userN = Number(n);
  const userP = Number(p);
  const userK = Number(k);
  const userPh = Number(ph);

  const results = CROPS_DATA.map((crop) => {
    // 1. Season Match (Weight: 25)
    let seasonScore = 20;
    let seasonNote = '';
    const isSeasonMatch = crop.seasons.includes(season.toLowerCase());

    if (isSeasonMatch) {
      seasonScore = 100;
      seasonNote = `Sowing in ${capitalize(season)} is the optimal traditional season for ${crop.name}.`;
    } else if (crop.seasons.includes('all-season') || crop.seasons.includes('spring')) {
      seasonScore = 65;
      seasonNote = `${crop.name} has wide seasonal adaptability, though yield is best in ${crop.primarySeason}.`;
    } else {
      seasonScore = 30;
      seasonNote = `Off-season: traditionally planted during ${crop.seasons.map(capitalize).join(' or ')}.`;
    }

    // 2. pH Match (Weight: 20)
    let phScore = 40;
    let phStatus = 'unfavorable';
    let phNote = '';

    const [optPhMin, optPhMax] = crop.phRange.optimal;
    const { min: absPhMin, max: absPhMax } = crop.phRange;

    if (userPh >= optPhMin && userPh <= optPhMax) {
      phScore = 100;
      phStatus = 'optimal';
      phNote = `Soil pH ${userPh.toFixed(1)} is right in the sweet spot (${optPhMin} - ${optPhMax}) for root nutrient uptake.`;
    } else if (userPh >= absPhMin && userPh <= absPhMax) {
      phScore = 75;
      phStatus = 'tolerable';
      if (userPh < optPhMin) {
        phNote = `Soil pH ${userPh.toFixed(1)} is slightly acidic for ${crop.name}. Consider light agricultural lime application.`;
      } else {
        phNote = `Soil pH ${userPh.toFixed(1)} is slightly alkaline. Adding organic matter or gypsum will improve bioavailability.`;
      }
    } else {
      phScore = 30;
      phStatus = 'poor';
      if (userPh < absPhMin) {
        phNote = `Soil pH ${userPh.toFixed(1)} is too acidic (optimal ${optPhMin}-${optPhMax}). May cause aluminum toxicity and lock phosphorus.`;
      } else {
        phNote = `Soil pH ${userPh.toFixed(1)} is too alkaline (optimal ${optPhMin}-${optPhMax}). Micronutrient deficiency likely.`;
      }
    }

    // 3. Nutrient Match (N, P, K) (Weight: 20)
    const isLegume = crop.category.toLowerCase().includes('legume') || crop.category.toLowerCase().includes('pulse');
    
    // Evaluate N
    let nScore = 100;
    let nNote = '';
    const [optNMin, optNMax] = crop.npkOptimal.n;
    if (isLegume) {
      if (userN >= 15 && userN <= 70) {
        nScore = 100;
        nNote = `As a legume, ${crop.name} thrives on low soil nitrogen (${userN} kg/ha) by fixing its own atmospheric nitrogen.`;
      } else if (userN > 90) {
        nScore = 70;
        nNote = `High soil nitrogen (${userN} kg/ha) may reduce biological nitrogen fixation and promote excess foliage.`;
      } else {
        nScore = 80;
        nNote = `Requires a modest starter dose of nitrogen (20 kg/ha) at planting.`;
      }
    } else {
      if (userN >= optNMin && userN <= optNMax) {
        nScore = 100;
        nNote = `Nitrogen level (${userN} kg/ha) matches optimal foliage demand (${optNMin}-${optNMax} kg/ha).`;
      } else if (userN >= optNMin * 0.7 && userN <= optNMax * 1.3) {
        nScore = 80;
        nNote = userN < optNMin
          ? `Nitrogen is slightly low (${userN} kg/ha vs target ${optNMin}). Supplement with urea or compost.`
          : `Nitrogen is rich (${userN} kg/ha). Reduce additional top-dressings.`;
      } else {
        nScore = 50;
        nNote = userN < optNMin
          ? `Soil nitrogen (${userN} kg/ha) is deficient for high ${crop.name} yield. Needs split nitrogen fertilization.`
          : `Excessive nitrogen (${userN} kg/ha) risks lodging and vegetative delay.`;
      }
    }

    // Evaluate P
    let pScore = 100;
    const [optPMin, optPMax] = crop.npkOptimal.p;
    if (userP >= optPMin && userP <= optPMax) {
      pScore = 100;
    } else if (userP >= optPMin * 0.65 && userP <= optPMax * 1.4) {
      pScore = 80;
    } else {
      pScore = 55;
    }

    // Evaluate K
    let kScore = 100;
    const [optKMin, optKMax] = crop.npkOptimal.k;
    if (userK >= optKMin && userK <= optKMax) {
      kScore = 100;
    } else if (userK >= optKMin * 0.65 && userK <= optKMax * 1.4) {
      kScore = 80;
    } else {
      kScore = 55;
    }

    const nutrientScore = Math.round(nScore * 0.45 + pScore * 0.3 + kScore * 0.25);

    // 4. Climate & Rainfall Match (Weight: 20)
    let rainScore = 50;
    let rainNote = '';
    const [optRainMin, optRainMax] = crop.rainfallRange.optimal;
    const { min: absRainMin, max: absRainMax } = crop.rainfallRange;

    if (normalizedRainfall >= optRainMin && normalizedRainfall <= optRainMax) {
      rainScore = 100;
      rainNote = `Annual/seasonal rainfall (${Math.round(normalizedRainfall)} mm) perfectly meets water demand.`;
    } else if (normalizedRainfall < optRainMin) {
      if (irrigation) {
        rainScore = 85;
        rainNote = `Rainfall (${Math.round(normalizedRainfall)} mm) is below optimal (${optRainMin} mm), but your irrigation will bridge the deficit.`;
      } else if (normalizedRainfall >= absRainMin) {
        rainScore = 65;
        rainNote = `Rainfall is borderline (${Math.round(normalizedRainfall)} mm). Without irrigation, yield depends on rainfall timing.`;
      } else {
        rainScore = 30;
        rainNote = `Deficit moisture (${Math.round(normalizedRainfall)} mm vs needed ${optRainMin} mm). High drought risk without irrigation.`;
      }
    } else {
      // Rainfall > optRainMax
      if (crop.waterloggingTolerance === 'High') {
        rainScore = 95;
        rainNote = `High rainfall (${Math.round(normalizedRainfall)} mm) is well handled by ${crop.name}.`;
      } else if (normalizedRainfall <= absRainMax) {
        rainScore = 70;
        rainNote = `High rainfall (${Math.round(normalizedRainfall)} mm) requires field ridges and drainage furrows to prevent root rot.`;
      } else {
        rainScore = 40;
        rainNote = `Excessive rainfall exceeds tolerance. Water stagnation may damage roots.`;
      }
    }

    // 5. Temperature Match (Weight: 15)
    let tempScore = 50;
    let tempNote = '';
    const [optTempMin, optTempMax] = crop.tempRange.optimal;
    const { min: absTempMin, max: absTempMax } = crop.tempRange;

    if (normalizedTemp >= optTempMin && normalizedTemp <= optTempMax) {
      tempScore = 100;
      tempNote = `Temperature of ${normalizedTemp.toFixed(1)}°C provides prime thermal conditions (${optTempMin}-${optTempMax}°C).`;
    } else if (normalizedTemp >= absTempMin && normalizedTemp <= absTempMax) {
      tempScore = 75;
      tempNote = `Temperature of ${normalizedTemp.toFixed(1)}°C is within tolerable limits, though slight deviation from ideal (${optTempMin}-${optTempMax}°C).`;
    } else {
      tempScore = 30;
      if (normalizedTemp < absTempMin) {
        tempNote = `Cold stress: ${normalizedTemp.toFixed(1)}°C is below the minimum ${absTempMin}°C required for vigorous growth.`;
      } else {
        tempNote = `Heat stress: ${normalizedTemp.toFixed(1)}°C exceeds optimal comfort (${optTempMax}°C), risking pollen sterility.`;
      }
    }

    // Weighted Overall Score
    const weightedTotal = Math.round(
      seasonScore * 0.25 +
      phScore * 0.20 +
      nutrientScore * 0.20 +
      rainScore * 0.20 +
      tempScore * 0.15
    );

    // Build plain-language explanations
    const suitableConditions = [];
    const potentialConcerns = [];

    if (isSeasonMatch) {
      suitableConditions.push({
        label: 'Planting Season Match',
        detail: `Ideal planting in ${capitalize(season)} aligns with crop life cycle.`
      });
    } else {
      potentialConcerns.push({
        label: 'Off-Season Planting',
        detail: `Traditionally grown in ${crop.seasons.map(capitalize).join(', ')}. Off-season planting may yield lower.`
      });
    }

    if (phStatus === 'optimal') {
      suitableConditions.push({
        label: 'Soil pH in Sweet Spot',
        detail: `Soil pH ${userPh.toFixed(1)} allows roots to absorb all available nutrients.`
      });
    } else if (phStatus === 'tolerable') {
      suitableConditions.push({
        label: 'Tolerable Soil pH',
        detail: phNote
      });
    } else {
      potentialConcerns.push({
        label: 'Soil pH Warning',
        detail: phNote
      });
    }

    if (rainScore >= 80) {
      suitableConditions.push({
        label: 'Moisture Adequacy',
        detail: rainNote
      });
    } else {
      potentialConcerns.push({
        label: 'Moisture Concern',
        detail: rainNote
      });
    }

    if (tempScore >= 75) {
      suitableConditions.push({
        label: 'Thermal Comfort',
        detail: tempNote
      });
    } else {
      potentialConcerns.push({
        label: 'Temperature Stress',
        detail: tempNote
      });
    }

    if (nutrientScore >= 80) {
      suitableConditions.push({
        label: 'Nutrient Balance',
        detail: nNote
      });
    } else {
      potentialConcerns.push({
        label: 'Fertilizer Adjustment Needed',
        detail: nNote
      });
    }

    // Determine Suitability Tier
    let suitabilityTier = 'Marginal';
    let badgeColor = '#9E9D24';
    if (weightedTotal >= 80) {
      suitabilityTier = 'Highly Suitable';
      badgeColor = '#2E7D32';
    } else if (weightedTotal >= 65) {
      suitabilityTier = 'Moderately Suitable';
      badgeColor = '#388E3C';
    } else if (weightedTotal >= 50) {
      suitabilityTier = 'Conditional / Marginal';
      badgeColor = '#E65100';
    } else {
      suitabilityTier = 'Low Suitability';
      badgeColor = '#C62828';
    }

    // Plain-language farmer summary
    const whyFits = synthesizeFarmerSummary(crop, weightedTotal, isSeasonMatch, phStatus, normalizedTemp, normalizedRainfall, userN, irrigation);

    return {
      crop,
      score: weightedTotal,
      suitabilityTier,
      badgeColor,
      isSeasonMatch,
      breakdown: {
        season: seasonScore,
        ph: phScore,
        nutrients: nutrientScore,
        rainfall: rainScore,
        temperature: tempScore
      },
      whyFits,
      suitableConditions,
      potentialConcerns
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return {
    topRecommendation: results[0],
    alternatives: results.slice(1),
    allRecommendations: results,
    calculatedAt: new Date().toISOString()
  };
}

function synthesizeFarmerSummary(crop, score, isSeason, phStatus, temp, rain, n, irrigation) {
  if (score >= 82) {
    return `${crop.name} shows excellent compatibility with your farm. Your soil pH and regional temperature (${temp.toFixed(0)}°C) match its peak growing requirements. ${isSeason ? 'Planted in this season, it offers maximum yield potential.' : ''} Manage water and standard basal nutrition to secure a healthy harvest.`;
  }
  if (score >= 68) {
    return `${crop.name} is a very strong alternative for your field. Soil and moisture conditions are largely favorable, though paying attention to ${phStatus !== 'optimal' ? 'pH balancing' : 'balanced nitrogen top-dressing'} and steady irrigation will ensure high produce quality.`;
  }
  if (score >= 50) {
    return `${crop.name} can be cultivated with proactive field adjustments. While temperature and season are workable, you may need supplemental ${irrigation ? 'drainage or specialized fertilization' : 'irrigation and organic matter'} to mitigate field stress.`;
  }
  return `${crop.name} has notable mismatches with your current field parameters (temperature, pH, or moisture). Cultivation is risky without substantial soil amendments or micro-climate interventions.`;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
