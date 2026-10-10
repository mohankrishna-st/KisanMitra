/**
 * Realistic agronomic presets representing major soil and climatic scenarios.
 * Allows instant testing and quick reference for farmers without typing lab numbers.
 */

export const REGIONAL_PRESETS = [
  {
    id: 'monsoon_paddy',
    name: 'Wet Season / Clay Loam (Rice & Pulses)',
    description: 'High rainfall, warm weather, fertile clay loam soil with neutral pH',
    icon: '🌾',
    data: {
      n: 95,
      p: 48,
      k: 52,
      ph: 6.4,
      rainfall: 1250,
      temperature: 29,
      season: 'kharif',
      irrigation: true,
      unitSystem: 'metric'
    }
  },
  {
    id: 'gangetic_wheat',
    name: 'Cool Season / Fertile Loam (Wheat & Mustard)',
    description: 'Cool winter, mild rainfall, well-aerated fertile alluvial loam',
    icon: '🥖',
    data: {
      n: 110,
      p: 55,
      k: 45,
      ph: 7.1,
      rainfall: 420,
      temperature: 18,
      season: 'rabi',
      irrigation: true,
      unitSystem: 'metric'
    }
  },
  {
    id: 'arid_millet',
    name: 'Dryland Sandy Soil (Bajra, Millets & Chana)',
    description: 'Low rainfall, hot climate, sandy soil with alkaline tendency',
    icon: '🏜️',
    data: {
      n: 45,
      p: 28,
      k: 32,
      ph: 7.8,
      rainfall: 380,
      temperature: 32,
      season: 'kharif',
      irrigation: false,
      unitSystem: 'metric'
    }
  },
  {
    id: 'black_cotton',
    name: 'Deep Black Soil (Cotton, Soybean & Tur)',
    description: 'Deep vertisol clay, moderate rainfall, warm temperatures',
    icon: '🌱',
    data: {
      n: 80,
      p: 42,
      k: 60,
      ph: 7.4,
      rainfall: 780,
      temperature: 28,
      season: 'kharif',
      irrigation: true,
      unitSystem: 'metric'
    }
  },
  {
    id: 'acidic_hills',
    name: 'Acidic Red Soil (Vegetables, Tubers & Maize)',
    description: 'Acidic soil (pH 5.4), good showers, mild temperatures',
    icon: '🥔',
    data: {
      n: 70,
      p: 35,
      k: 40,
      ph: 5.4,
      rainfall: 920,
      temperature: 22,
      season: 'rabi',
      irrigation: true,
      unitSystem: 'metric'
    }
  }
];
