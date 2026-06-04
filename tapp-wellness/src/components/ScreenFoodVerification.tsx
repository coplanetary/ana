/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ChefHat, CheckCircle2, ShieldCheck, ArrowRight, Salad, Edit, Sparkles, 
  Check, Info, RefreshCw, Smartphone, HelpCircle, Shield, ChevronRight, ShieldAlert
} from 'lucide-react';

interface ScreenFoodVerificationProps {
  onConfirm: () => void;
  onNavigate: (screen: any) => void;
}

interface FoodDetail {
  id: string;
  name: string;
  rating: 'Green' | 'Amber' | 'Red';
  ratingLabel: string;
  price: string;
  calories: string;
  protein: string;
  fiber: string;
  carbsType: string;
  description: string;
  ingredients: string[];
  clinicianAdvice: string;
}

const NEPAL_FOOD_EXAMPLES: FoodDetail[] = [
  {
    id: 'f1',
    name: 'Buckwheat Dhido & Mustard Greens',
    rating: 'Green',
    ratingLabel: 'Low Glycemic - Highly Safe',
    price: 'Rs. 520',
    calories: '340 kcal',
    protein: '11g',
    fiber: '14g',
    carbsType: 'Slow-Release Complex',
    description: 'Traditional Nepalese high-altitude buckwheat mash served with organic sautéed rayo ko saag (mustard greens) and thin vegetable broth.',
    ingredients: ['Buckwheat (Phapar)', 'Mustard Greens', 'Soybean oil', 'Garlic', 'Gundruk soup'],
    clinicianAdvice: 'Buckwheat is extremely rich in soluble fibers and d-chiro-inositol, which naturally sensitizes insulin receptors. Prevents post-meal spikes effectively.'
  },
  {
    // Fresh soybeans and fermented greens set
    id: 'f2',
    name: 'Gundruk & Bhatmas (Soybean) Salad',
    rating: 'Green',
    ratingLabel: 'Low Glycemic - Highly Safe',
    price: 'Rs. 280',
    calories: '180 kcal',
    protein: '14g',
    fiber: '12g',
    carbsType: 'Fiber & Protein First',
    description: 'Fermented leafy greens mixed with roasted crunchy black soybeans, mountain herbs, and a light squeeze of wild lemon.',
    ingredients: ['Fermented Gundruk', 'Bhatmas (Soybeans)', 'Ginger', 'Onion', 'Mustard oil seed'],
    clinicianAdvice: 'Essentially zero glycemic impact. Gundruk contains outstanding prebiotic enzymes, while Bhatmas supplies high-quality plant proteins.'
  },
  {
    id: 'f3',
    name: 'Chicken Thakali Set (White Rice)',
    rating: 'Amber',
    ratingLabel: 'Moderate Glycemic - Portioned Caution',
    price: 'Rs. 850',
    calories: '680 kcal',
    protein: '32g',
    fiber: '4g',
    carbsType: 'High Refined Carbs with Protein',
    description: 'Traditional Thakali meal set featuring premium chicken curry, black lantil soup (Maas ko daal), mixed pickles, and polished basmati white rice.',
    ingredients: ['Basmati White Rice', 'Chicken Curry', 'Maas ko Daal', 'Gundruk Pickle'],
    clinicianAdvice: 'The base of polished white rice is highly glycemic. However, pairing it with rich protein from chicken and fiber from Maas ko Daal moderates the absorption speed. Suggest swapping white rice for buckwheat (Dhido).'
  },
  {
    id: 'f4',
    name: 'Buff Steamed Momo Platter',
    rating: 'Red',
    ratingLabel: 'High Glycemic - High Spiking Risk',
    price: 'Rs. 450',
    calories: '550 kcal',
    protein: '18g',
    fiber: '1.5g',
    carbsType: 'Fast-Absorbing Simple Carbs',
    description: 'Nepalese steamed dumplings packed with minced buffalo meat and spices, served with a rich tangy tomato-sesame dipping sauce.',
    ingredients: ['Refined Flour (Maida) Wrapper', 'Minced Buff Meat', 'Onion ghee', 'Tomato dip chutney'],
    clinicianAdvice: 'The wrapper is made of highly refined Maida flour. Without adequate fibers, it converts rapidly to glucose, posing an acute spiking risk. Set portion control to 3-4 pieces, or pace with an insulin dose.'
  }
];

export default function ScreenFoodVerification({ onConfirm, onNavigate }: ScreenFoodVerificationProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedFoodId, setSelectedFoodId] = useState('f1');
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  
  const currentFood = NEPAL_FOOD_EXAMPLES.find(f => f.id === selectedFoodId) || NEPAL_FOOD_EXAMPLES[0];

  // Simulated AI local analysis logs on mount
  useEffect(() => {
    setIsAnalyzing(true);
    setAnalysisLogs([]);
    
    const logSteps = [
      'Scanning local camera viewfinder pixel array...',
      'Vision decoder: Extracting plate geometry & bio-matter color matrices...',
      'Matching food profiles using on-device lightweight MobileNet-Wellness...',
      'Local sovereign inference complete. Rendering glycemic weights.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logSteps.length) {
        setAnalysisLogs(prev => [...prev, logSteps[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 600);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [selectedFoodId]);

  return (
    <div className="flex-grow flex flex-col bg-[#171d1c]/40 backdrop-blur-xs shadow-2xl relative select-none justify-end min-h-screen text-[#171d1c]">
      
      {/* Background blurred meal */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=650" 
          alt="AI Background Plate" 
          className="w-full h-full object-cover blur-md"
        />
        <div className="absolute inset-0 bg-slate-900/65" />
      </div>

      {/* Target tracker scan crosshairs overlay */}
      <div className="absolute inset-x-0 bottom-[45%] top-16 flex items-center justify-center pointer-events-none z-10">
        <div className="w-52 h-52 border-2 border-white/20 rounded-xl relative">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-teal-400 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-teal-400 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-teal-400 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-teal-400 rounded-br-lg" />
        </div>
      </div>

      {/* Header Overlay */}
      <header className="absolute top-0 inset-x-0 p-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
          <Sparkles className="w-3.5 h-3.5 text-teal-300 fill-current" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-300">Sovereign Decoders</span>
        </div>
        <button 
          onClick={onConfirm}
          className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10"
        >
          ✕
        </button>
      </header>

      {/* BOTH SHEET - OVERLAY AND DETAIL CARDS */}
      <div className="relative z-20 bg-white rounded-t-2xl shadow-2xl p-5 space-y-4 max-w-md mx-auto w-full border-t border-slate-100 max-h-[82%] overflow-y-auto pb-10">
        
        {/* Handle */}
        <div className="flex justify-center -mt-2">
          <div className="w-8 h-1 bg-slate-250 rounded-full" />
        </div>

        {/* LOADING SCREEN COMPONENT: "AI Analyzing Overlay" */}
        {isAnalyzing ? (
          <div className="py-8 space-y-5 animate-fadeIn">
            <div className="flex flex-col items-center justify-center space-y-3.5 text-center">
              <div className="relative flex items-center justify-center">
                {/* Ping/Radar effect */}
                <div className="absolute w-14 h-14 bg-teal-100 rounded-full animate-ping opacity-75" />
                <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0d9488]">
                  <RefreshCw className="w-6 h-6 animate-spin" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">AI Locally Deciphering</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-0.5 leading-relaxed">
                  Parsing glucose impact coefficients using TApp client-side neural weight matrices.
                </p>
              </div>
            </div>

            {/* Simulated Live Scan Logs */}
            <div className="bg-[#171d1c] p-4 text-teal-400 font-mono text-[9px] rounded-lg space-y-1.5 border border-teal-950/40">
              <span className="text-slate-400 text-[8px] uppercase tracking-wider block font-bold border-b border-teal-900 pb-1 mb-1">
                Crypto Edge-AI logs
              </span>
              {analysisLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-1">
                  <span className="text-teal-600 select-none">✓</span>
                  <span className="leading-normal">{log}</span>
                </div>
              ))}
              <div className="w-2.5 h-3 bg-teal-400 animate-pulse inline-block" />
            </div>

            {/* Sovereignty Note */}
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex gap-2.5 items-start">
              <Smartphone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="font-extrabold text-[10px] text-slate-800 uppercase tracking-wider">Device Isolated Execution</h5>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Lightweight on-device AI handles image recognition. Avoids central cloud analytics to protect your diagnostic privacy entirely.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ANALYSIS COMPLETED CONTAINER */
          <div className="space-y-4 animate-scaleUp">
            
            {/* Simulation Selection Bar */}
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-150">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase block select-none">
                Interactive Food Switcher ( Nepal Region )
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 pt-1.5 scrollbar-none">
                {NEPAL_FOOD_EXAMPLES.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFoodId(food.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all uppercase flex-shrink-0 border ${
                      selectedFoodId === food.id
                      ? 'bg-[#0d9488] border-[#0d9488] text-white'
                      : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {food.id === 'f1' ? '🍲 Dhido' : food.id === 'f2' ? '🥗 Gundruk' : food.id === 'f3' ? '🍛 Thakali' : '🥟 Momo'}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Rating Banner */}
            <div className={`p-4 rounded-lg flex items-start gap-3 border ${
              currentFood.rating === 'Green'
              ? 'bg-teal-50/50 border-teal-100 text-teal-950'
              : currentFood.rating === 'Amber'
              ? 'bg-amber-50/70 border-amber-100 text-amber-950'
              : 'bg-rose-50/60 border-rose-100 text-rose-950'
            }`}>
              
              {/* Color Code Circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                currentFood.rating === 'Green'
                ? 'bg-teal-600 text-white'
                : currentFood.rating === 'Amber'
                ? 'bg-amber-500 text-white'
                : 'bg-rose-600 text-white'
              }`}>
                {currentFood.rating === 'Green' ? (
                  <CheckCircle2 className="w-5 h-5 fill-current" />
                ) : currentFood.rating === 'Amber' ? (
                  <Info className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#0d9488]">Glycemic Index Level</span>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  {currentFood.name}
                  <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black uppercase tracking-wider ${
                    currentFood.rating === 'Green'
                    ? 'bg-teal-500/10 text-teal-800'
                    : currentFood.rating === 'Amber'
                    ? 'bg-amber-500/15 text-amber-800'
                    : 'bg-rose-500/15 text-rose-800'
                  }`}>
                    {currentFood.rating} Rating
                  </span>
                </h3>
                <p className="text-xs font-semibold leading-snug mt-1 text-slate-700">
                  {currentFood.ratingLabel} - {currentFood.carbsType}
                </p>
              </div>
            </div>

            {/* Rating Explanations Block */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3.5 space-y-2">
              <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase block">
                Rating Classifications Explained:
              </span>
              <ul className="space-y-1.5 text-[10px] text-slate-600 leading-normal font-semibold">
                <li className="flex items-start gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Green Rating:</strong> Low-glycemic slow carbs. Fiber counters spike. Diabetic safe.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Amber Rating:</strong> Moderate glycemic carbs. Balance portions & pair with lean protein.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Red Rating:</strong> High glycemic danger. Refined starches/sugars, expects sharp spikes.</span>
                </li>
              </ul>
            </div>

            {/* Meal details text */}
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-tight">Food Description</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {currentFood.description}
              </p>
            </div>

            {/* Identified macro parameters */}
            <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-lg text-center border border-slate-100 font-mono text-[10px]">
              <div className="border-r border-slate-200">
                <span className="block text-slate-400 text-[8px] uppercase font-sans">Carbs</span>
                <span className="font-extrabold text-slate-800 leading-tight block mt-0.5">Slow</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="block text-slate-400 text-[8px] uppercase font-sans">Energy</span>
                <span className="font-extrabold text-slate-800 leading-tight block mt-0.5">{currentFood.calories}</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="block text-slate-400 text-[8px] uppercase font-sans">Protein</span>
                <span className="font-extrabold text-slate-800 leading-tight block mt-0.5">{currentFood.protein}</span>
              </div>
              <div>
                <span className="block text-slate-400 text-[8px] uppercase font-sans">Fiber</span>
                <span className="font-extrabold text-slate-800 leading-tight block mt-0.5">{currentFood.fiber}</span>
              </div>
            </div>

            {/* Ingredients Tags scroll */}
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Estimated ingredients (Local AI vision):</span>
              <div className="flex flex-wrap gap-1.5">
                {currentFood.ingredients.map((ing, i) => (
                  <span key={i} className="px-2.5 py-1 bg-teal-50/40 text-teal-950 font-semibold border border-teal-100 text-[10px] rounded-lg">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical clinician advice */}
            <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-lg flex items-start gap-2.5">
              <Info className="w-4.5 h-4.5 text-[#0d9488] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h5 className="font-extrabold text-[10px] text-slate-800 uppercase tracking-wider">Clinician Metabolic Tip</h5>
                <p className="text-[10px] text-slate-500 leading-relaxed">{currentFood.clinicianAdvice}</p>
              </div>
            </div>

            {/* Local Privacy Pledge Signature Row */}
            <div className="p-3 bg-[#171d1c] rounded-lg border border-teal-950 flex gap-2.5 items-start">
              <Shield className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
              <p className="text-[9px] text-[#b8c2bf] leading-normal font-mono uppercase tracking-wide">
                🔒 LOCAL ANALYSIS SECURED: THIS BIOMETRIC BIO-MATTER CLASSIFICATION COMPLETED ENTIRELY OFF-CLOUD ON HARDWARE ENGINE. ZERO CLOUD DATA TAMPERING INITIATED.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-2.5 space-y-2.5">
              <button 
                onClick={onConfirm}
                className="w-full py-3.5 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <span>Confirm & Log to Enclave</span>
                <CheckCircle2 className="w-4 h-4 fill-current text-teal-300" />
              </button>
              
              <button
                onClick={() => onNavigate('marketplace')}
                className="w-full py-2.5 border border-slate-250 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
              >
                Find Diabetic Suppliers in Market
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
