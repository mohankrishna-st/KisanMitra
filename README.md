# 🌱 KisanMitra — Intelligent Agricultural Advisory

> **A farmer-first, responsive web application designed for small and marginal farmers to explore suitable crops based on soil nutrients (N, P, K, pH), local climate (rainfall, temperature), irrigation support, and planting season.**

![KisanMitra](https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80)

---

## 🌾 1. Project & Problem Statement

### The Agricultural Problem
Small and marginal farmers often make crop selection decisions based purely on traditional habits or seed market speculation without assessing whether their field’s soil nutrients (**Nitrogen, Phosphorus, Potassium, and pH**), local **seasonal rainfall**, and **temperatures** match the crop's physiological demands. 

This mismatch frequently leads to stunted crop growth, wasted seed and fertilizer expenditure, high susceptibility to pest outbreaks, and devastating yield losses.

### The Proposed Solution
**KisanMitra** bridges this information gap by providing an accessible, intuitive web application that:
1. Guides farmers through a friendly **3-step field evaluation** (Soil & Presets, Climate, Season).
2. Features a dynamic **Soil pH gauge** distinguishing acidic (red), neutral (green), and alkaline (blue) soils with clear text labels and practical liming/gypsum remedies.
3. Computes transparent suitability scores and synthesizes **plain-language explanations** ("Why this crop fits your farm") without agronomic jargon.
4. Identifies both **favorable conditions** and **agronomic watch-outs** (e.g., phosphorus fixation, drainage risks, nitrogen starvation).
5. Provides **side-by-side crop comparisons**, **multi-language translations** (English, हिन्दी, తెలుగు), **audible text-to-speech advisory**, **saved farm records**, and **WhatsApp/print sharing**.

---

## 👨‍🌾 2. Target Users & Farmer-First UX

- **Small and Marginal Farmers:** Designed with minimum 48px touch targets, high-contrast typography, and readable text suited for low-cost mobile phones in bright outdoor sunlight.
- **Low Digital Literacy:** Step-by-step form with quick **1-click Presets** (e.g., *Wet Season / Clay Loam*, *Cool Season / Fertile Loam*, *Dryland Sandy Soil*, *Deep Black Soil*, *Acidic Red Soil*) so anyone can test and learn without typing lab reports.
- **Friendly Farming Progress Illustration:** An animated SVG scene depicting a farmer guiding an ox-drawn wooden plough across 3 field furrows. As each step is completed, the ploughed soil advances and lush green shoots sprout!
- **Zero Color-Only Communication:** Status is communicated through both distinct colors, icons, and explicit text labels (e.g., "Acidic pH < 4.5: Requires Heavy Agricultural Liming").
- **Voice Support:** Built-in Web Speech API voice reader button to read recommendations out loud for farmers who prefer listening.

---

## 🚜 3. Core Features & Capabilities

| Feature | Description |
| :--- | :--- |
| **Multi-Step Farmer Wizard** | 3 structured steps: Soil NPK & pH (with Presets) ➔ Climate & Irrigation ➔ Planting Season. |
| **Dynamic Soil pH Scale** | 4–10 interactive visual gauge. Smoothly glides pointer; labels acidic (red), neutral (green), and basic/alkaline (blue) with real-time agronomic management advice. |
| **Top Hero Crop Recommendation** | Prominently highlights the highest suitability crop with a high-resolution field image, match score, plain-language explanation, water requirements, duration, and yield expectations. |
| **Alternative Crops Grid** | Clean, uncluttered cards categorized into Cereals, Pulses, Oilseeds, Cash Crops, and Vegetables with expandable suitability breakdowns. |
| **Side-by-Side Crop Comparison** | Select 2–3 crops to inspect a side-by-side matrix comparing suitability, duration, water demand, soil pH tolerance, and risk factors. |
| **Multi-Language Support** | Instant switcher supporting **English**, **हिन्दी (Hindi)**, **తెలుగు (Telugu)**, **Español (Spanish)**, and **Kiswahili (Swahili)**. |
| **Audible Voice Advisory** | Text-to-speech engine speaks out crop suitability and why-fits reasoning in clear, natural cadence. |
| **Save & Share Records** | Save farm plans to `localStorage` for offline review. Export or share formatted advisory summaries directly via WhatsApp, SMS, Web Share API, or print-friendly card. |
| **Farming Knowledge Hub** | Practical educational guides on Soil N-P-K, pH & Liming, Crop Rotation, Water-smart Irrigation, Composting, and DIY soil testing methods. |

---

## 🏛️ 4. Architecture & Technology Stack

The project is built using a modern, lightweight, high-performance web architecture:

- **Frontend Framework:** React 19 + Vite 8 (Zero bundle bloat, blazing-fast HMR and production builds).
- **Styling:** Custom Vanilla CSS Design System with HSL tokens, warm cream and sand backgrounds (`#FAF7F2`), soil-brown typography (`#2B1C10`), leafy green accents (`#2E7D32`), and responsive breakpoints.
- **Visuals & Atmosphere:** Dynamic season-reactive gradients (Kharif monsoon emerald, Rabi golden wheat, Zaid sunny ochre), corner ambient light flare, and custom SVG farming illustrations.
- **Icons:** `lucide-react` for crisp agricultural and environmental glyphs.
- **State Management & Persistence:** React hooks with `localStorage` persistence for offline records and zero network latency.

### Folder Structure
```
c:\hackthon1\
├── public/                     # Static assets and icons
├── src/
│   ├── components/
│   │   ├── Header.jsx                  # Navigation, branding, language selector, saved count
│   │   ├── FarmingProgress.jsx         # Custom SVG farmer ploughing field progress scene
│   │   ├── StepSoil.jsx                # Step 1: Nitrogen, Phosphorus, Potassium, pH inputs & presets
│   │   ├── StepClimate.jsx             # Step 2: Rainfall, temperature, irrigation toggle cards
│   │   ├── StepSeason.jsx              # Step 3: Illustrated recognizable season tiles
│   │   ├── PhScaleIndicator.jsx        # Real-time visual pH gauge with acidic/neutral/alkaline zones
│   │   ├── RecommendationDashboard.jsx # Results dashboard with summary bar & category filters
│   │   ├── HeroCropCard.jsx            # Main feature card for top recommendation
│   │   ├── CropCard.jsx                # Alternative recommendation card with expandable accordion
│   │   ├── CropComparisonModal.jsx     # Side-by-side 2-3 crops comparison modal
│   │   ├── SavedReportsModal.jsx       # Farm plans review, load, and deletion drawer
│   │   ├── ShareModal.jsx              # WhatsApp share link, Web Share, clipboard, printable sheet
│   │   ├── HelpModal.jsx               # DIY soil testing guidance (pH strip, jar test)
│   │   ├── VoiceReaderButton.jsx       # Web Speech API text-to-speech component
│   │   └── LearningSection.jsx         # Educational guides with distinct disclaimer banner
│   ├── data/
│   │   ├── crops.js                    # Verified agronomic database (16 crops with NPK, pH, climate ranges)
│   │   ├── presets.js                  # 5 realistic agro-climatic presets for 1-click testing
│   │   └── educationalTips.js          # Agronomic knowledge guides and soil measurement tips
│   ├── engine/
│   │   └── recommendationEngine.js     # Multidimensional weighted agronomic evaluation algorithm
│   ├── i18n/
│   │   └── translations.js             # Translation dictionary for en, hi, te, es, sw
│   ├── App.jsx                         # Main wizard flow controller & state coordinator
│   ├── index.css                       # Master design system, color variables, typography, print CSS
│   └── main.jsx                        # React root entrypoint
├── test-engine.mjs                     # Automated Node.js agronomic engine test suite
├── .env.example                        # Configurable environment variable template
├── .gitignore                          # Clean gitignore excluding node_modules, .env, and dist
├── package.json                        # Project metadata and dependencies
└── README.md                           # Documentation
```

---

## 🧪 5. Agronomic Model & Data Transparency

The recommendation engine scores each candidate crop against the farmer's field profile across 5 agronomic dimensions:
1. **Season Alignment (25% weight):** Validates crop photoperiod and traditional sowing seasons (Kharif, Rabi, Zaid, Spring).
2. **Soil pH Compatibility (20% weight):** Assesses root nutrient bioavailability. Flags acidic soils requiring agricultural lime or alkaline soils requiring gypsum.
3. **Nutrient Demand (20% weight):** Evaluates N, P, and K. Pulses/legumes (Chickpea, Groundnut, Soybean, Lentil, Pigeon Pea) are smartly credited for fixing biological atmospheric nitrogen.
4. **Moisture & Irrigation Match (20% weight):** Checks rainfall against crop demand. If irrigation is toggled on, water deficits are treated as manageable rather than disqualifying.
5. **Thermal Comfort (15% weight):** Checks crop temperature boundaries for germination and vegetative growth.

> ⚠️ **Informational Guidance Disclaimer:**  
> All crop recommendations are synthesized from ICAR and FAO agronomic benchmarks and sample datasets. Weather patterns, unpredicted localized pest infestations, and micro-climates vary. These recommendations serve as informational decision support and **do not guarantee harvest yields**. Farmers are strongly encouraged to consult their local agricultural extension officer (Krishi Vigyan Kendra) before making major financial investments.

---

## 🚀 6. Setup, Local Run & Testing

### Prerequisites
- Node.js (v18 or higher recommended; developed on Node v24)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/smart-crop-guide.git
cd smart-crop-guide

# Install dependencies
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Running Automated Agronomic Engine Tests
```bash
node test-engine.mjs
```
Runs comprehensive automated verification across all 16 crops, presets, extreme soil pH values, and drought conditions.

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory ready for deployment.

---

## 🌐 7. Production Deployment Instructions

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root and follow the prompts.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### Deploy to Netlify
1. Connect repository in the Netlify dashboard.
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to Cloudflare Pages
1. Select repository in Cloudflare Pages.
2. Framework: **Vite**.
3. Build command: `npm run build`. Build output directory: `dist`.

---

## 📄 License
MIT License. Free for open-source agricultural development and rural extension services.
#   K i s a n M i t r a  
 #   K i s a n M i t r a  
 