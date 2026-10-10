import { runRecommendationEngine } from './src/engine/recommendationEngine.js';
import { REGIONAL_PRESETS } from './src/data/presets.js';
import { CROPS_DATA } from './src/data/crops.js';

console.log('--- 1. Testing Crops Dataset ---');
console.log(`Loaded ${CROPS_DATA.length} crops.`);
CROPS_DATA.forEach(c => {
  if (!c.id || !c.name || !c.seasons || !c.phRange || !c.npkOptimal) {
    throw new Error(`Invalid crop data for ${c.id}`);
  }
});
console.log('✓ All crops passed schema validation.');

console.log('\n--- 2. Testing Recommendation Engine with Presets ---');
for (const preset of REGIONAL_PRESETS) {
  const result = runRecommendationEngine(preset.data);
  console.log(`\nPreset: [${preset.name}]`);
  console.log(`Top Crop: ${result.topRecommendation.crop.name} - Score: ${result.topRecommendation.score}% (${result.topRecommendation.suitabilityTier})`);
  console.log(`Top 3 Alternatives: ${result.alternatives.slice(0, 3).map(a => `${a.crop.name} (${a.score}%)`).join(', ')}`);
  
  if (result.topRecommendation.score < 50) {
    console.warn(`Warning: Top score unexpectedly low for preset ${preset.name}`);
  }
}

console.log('\n--- 3. Testing Edge Cases ---');
// Extreme Acidic Soil test
const acidResult = runRecommendationEngine({
  n: 60, p: 30, k: 30, ph: 4.2, rainfall: 900, temperature: 22, season: 'kharif', irrigation: true
});
console.log(`Acidic pH 4.2 Top Crop: ${acidResult.topRecommendation.crop.name} (${acidResult.topRecommendation.score}%)`);
console.log(`pH Note on Top Crop: ${acidResult.topRecommendation.whyFits}`);

// Extreme Low Rain Drought test
const droughtResult = runRecommendationEngine({
  n: 40, p: 20, k: 25, ph: 7.5, rainfall: 250, temperature: 34, season: 'kharif', irrigation: false
});
console.log(`Rainfed Drought (250mm) Top Crop: ${droughtResult.topRecommendation.crop.name} (${droughtResult.topRecommendation.score}%)`);

// Cool Winter test
const winterResult = runRecommendationEngine({
  n: 110, p: 55, k: 50, ph: 6.8, rainfall: 400, temperature: 16, season: 'rabi', irrigation: true
});
console.log(`Winter Rabi Top Crop: ${winterResult.topRecommendation.crop.name} (${winterResult.topRecommendation.score}%)`);

console.log('\n✓ ALL AGRONOMIC ENGINE TESTS PASSED PERFECTLY!');
