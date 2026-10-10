/**
 * Agronomic Learning Cards & Farmer Educational Guides
 * Clearly marked as general educational knowledge.
 */

export const EDUCATIONAL_TIPS = [
  {
    id: 'soil_npk',
    title: 'Demystifying Soil N-P-K',
    subtitle: 'What each nutrient does for your plant',
    category: 'Soil Health',
    icon: '🧪',
    summary: 'Think of Nitrogen as the leaf builder, Phosphorus as the root booster, and Potassium as the health shield.',
    details: [
      {
        heading: 'Nitrogen (N) - Vegetative Growth',
        text: 'Drives deep green foliage and rapid stem elongation. Stunted, yellowing lower leaves usually indicate nitrogen starvation.'
      },
      {
        heading: 'Phosphorus (P) - Roots & Early Vigor',
        text: 'Stimulates root branching, flower induction, and seed set. Crucial in early seedling establishment and legume nodulation.'
      },
      {
        heading: 'Potassium (K) - Quality & Water Regulation',
        text: 'Regulates stomatal opening, reduces plant water stress during dry spells, and boosts grain weight and disease resistance.'
      }
    ],
    farmerAction: 'Always apply Phosphorus and Potassium at seed sowing (basal dose), and split Nitrogen in 2 to 3 doses during active growth.'
  },
  {
    id: 'ph_management',
    title: 'Managing Soil pH & Liming',
    subtitle: 'Why soil acidity locks away fertilizers',
    category: 'Soil Chemistry',
    icon: '⚖️',
    summary: 'Soil pH controls whether plant roots can drink up fertilizer. In extreme acid (<5.5) or alkali (>8.5), nutrients become chemically trapped.',
    details: [
      {
        heading: 'Acidic Soils (pH < 6.0)',
        text: 'Often found in high-rainfall or laterite regions. Phosphorus gets locked by iron and aluminum. Remedy: Apply agricultural lime (calcium carbonate) or dolomite at 1-2 tonnes/ha once every 3 years.'
      },
      {
        heading: 'Optimal Sweet Spot (pH 6.2 - 7.2)',
        text: 'Maximum microbial activity and free availability of all 14 essential plant nutrients.'
      },
      {
        heading: 'Alkaline / Sodic Soils (pH > 8.0)',
        text: 'High sodium or free carbonates lock micronutrients (zinc, iron). Remedy: Incorporate agricultural gypsum, farmyard manure (FYM), and green manuring (dhaincha).'
      }
    ],
    farmerAction: 'Never mix lime directly with urea or diammonium phosphate (DAP) simultaneously — apply lime 2-3 weeks prior to sowing.'
  },
  {
    id: 'crop_rotation',
    title: 'The Art of Smart Crop Rotation',
    subtitle: 'Breaking pest cycles and regenerating free nitrogen',
    category: 'Regenerative Practices',
    icon: '🔄',
    summary: 'Rotating heavy nutrient feeders with nitrogen-fixing pulses cuts fertilizer expenses by up to 30%.',
    details: [
      {
        heading: 'Cereal followed by Legume',
        text: 'Rotate heavy feeders (Wheat, Maize, Rice) with legumes (Chickpea, Groundnut, Soybean, Lentil). Legumes naturally synthesize 30-60 kg N/ha from the air.'
      },
      {
        heading: 'Deep Root vs Shallow Root',
        text: 'Follow shallow-rooted crops (onion, cabbage) with deep taproots (cotton, pigeon pea, sunflower) to recycle nutrients from different soil strata.'
      },
      {
        heading: 'Disease Break',
        text: 'Never plant Solanaceous crops (tomato, potato, eggplant, chili) back-to-back in the same furrow to break nematode and bacterial wilt reservoirs.'
      }
    ],
    farmerAction: 'Plan a 2-year rotation schedule across your farm plots to naturally suppress persistent weeds and nematodes.'
  },
  {
    id: 'water_management',
    title: 'Water-Smart Irrigation & Mulching',
    subtitle: 'Maximize crop-per-drop in water-scarce seasons',
    category: 'Water Conservation',
    icon: '💧',
    summary: 'Over 60% of irrigation water in conventional flood irrigation is lost to deep percolation and surface evaporation.',
    details: [
      {
        heading: 'Ridge & Furrow Planting',
        text: 'Planting crops on raised ridges and running water through narrow furrows reduces water consumption by 25-35% and prevents root suffocation.'
      },
      {
        heading: 'Organic Straw Mulching',
        text: 'Spreading dry crop residues, paddy straw, or leaves 3-4 inches thick keeps soil temperature cooler and retains moisture for up to 10 extra days.'
      },
      {
        heading: 'Critical Irrigation Windows',
        text: 'Water at critical physiological stages (CRI in wheat, flowering in pulses, silking in maize) instead of arbitrary schedules.'
      }
    ],
    farmerAction: 'Irrigate during early mornings or evenings to drastically cut direct solar water evaporation.'
  },
  {
    id: 'organic_matter',
    title: 'Building Soil Organic Carbon (SOC)',
    subtitle: 'The natural sponge for moisture and nutrients',
    category: 'Soil Fertility',
    icon: '🪱',
    summary: 'Adding organic matter increases soil water-holding capacity: 1% increase in SOC allows soil to hold over 75,000 liters more water per hectare!',
    details: [
      {
        heading: 'Well-Decomposed Farmyard Manure (FYM)',
        text: 'Apply 8-10 tonnes/ha of well-rotted cow dung manure before final land preparation.'
      },
      {
        heading: 'In-situ Green Manuring',
        text: 'Sow sunn hemp (Crotalaria) or Sesbania (Dhaincha) with pre-monsoon showers and plow it under at 45 days before flowering.'
      },
      {
        heading: 'Avoid Crop Residue Burning',
        text: 'Burning straw destroys beneficial earthworms, beneficial mycorrhizae, and depletes carbon. Incorporate stubble or make compost.'
      }
    ],
    farmerAction: 'Incorporate compost at least 15 days before seed sowing so microbial heat does not harm delicate seedling roots.'
  }
];

export const MEASUREMENT_GUIDE = [
  {
    title: 'How to check Soil pH without an expensive meter',
    icon: '🧪',
    steps: [
      'Take 20g of dried topsoil from 15cm depth.',
      'Mix with 50ml clean drinking / distilled water in a clean glass.',
      'Stir vigorously for 2 minutes and let it settle for 15 minutes.',
      'Dip a standard agricultural pH indicator strip for 3 seconds and compare color against the scale.',
      'Alternatively, test with vinegar (fizzing = alkaline pH > 7.5) or baking soda slurry (fizzing = acidic pH < 6.0).'
    ]
  },
  {
    title: 'Estimating Rainfall & Climate values',
    icon: '🌧️',
    steps: [
      'Look at your local government agro-meteorological station bulletins.',
      '1 mm of rainfall equals 1 liter of water per square meter of field.',
      'If you have tube-well / canal irrigation, you can meet crop water needs even with lower natural rainfall.'
    ]
  },
  {
    title: 'NPK Lab Test vs Visual Field Signs',
    icon: '🌾',
    steps: [
      'Standard Soil Health Cards list N, P, K in kg/hectare.',
      'Low N: Pale light green or yellow leaves starting from older bottom leaves.',
      'Low P: Dark purplish/bronze tints on lower leaves, spindly slow roots.',
      'Low K: Burnt / scorched edges on leaf margins, weak stalks that fall over easily.'
    ]
  }
];
