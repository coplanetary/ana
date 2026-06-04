/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import ScreenHome from './components/ScreenHome';
import ScreenTrends from './components/ScreenTrends';
import ScreenCGMSetup from './components/ScreenCGMSetup';
import ScreenPrivacy from './components/ScreenPrivacy';
import ScreenPrescriptions from './components/ScreenPrescriptions';
import ScreenSpecialist from './components/ScreenSpecialist';
import ScreenCamera from './components/ScreenCamera';
import ScreenFoodVerification from './components/ScreenFoodVerification';
import ScreenLabVerification from './components/ScreenLabVerification';
import ScreenMarketplace from './components/ScreenMarketplace';
import ScreenFoodmanduDetail from './components/ScreenFoodmanduDetail';
import ScreenOnboarding from './components/ScreenOnboarding';

import { ActiveScreen } from './types';
import { 
  Heart, ShieldAlert, Sparkles, Smartphone, ShieldCheck, HelpCircle, 
  Settings, Home, Activity, ShoppingBag, Shield, BellRing, ChevronRight, Lock, Laptop, CheckCircle
} from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('onboarding');
  const [cameraResultMode, setCameraResultMode] = useState<'food' | 'lab'>('food');

  // Each fast-jump maps to the exact screen it should open (and, for the
  // viewfinder, which result mode the camera should produce). Keeping the
  // target screen here means navigation and active-state highlighting both
  // derive from the same source of truth.
  const fastJumps: {
    id: string;
    label: string;
    screen: ActiveScreen;
    cameraMode?: 'food' | 'lab';
  }[] = [
    { id: 'onboarding', label: '0. Welcome Onboarding', screen: 'onboarding' },
    { id: 'home-dashboard', label: '1. Home Dashboard', screen: 'home-dashboard' },
    { id: 'blood-sugar-trends', label: '2. Glucose Trends Chart', screen: 'blood-sugar-trends' },
    { id: 'cgm-setup', label: '3. Bluetooth CGM Setup', screen: 'cgm-setup' },
    { id: 'privacy', label: '4. Sovereign Enclave Key', screen: 'privacy' },
    { id: 'prescriptions-inbox', label: '5. Prescriptions Actions', screen: 'prescriptions' },
    { id: 'connect-dr-sarita', label: '6. Dr. Sarita Rana RD', screen: 'doctor-profile' },
    { id: 'open-viewfinder-food', label: '7. Scan Viewfinder (Food)', screen: 'camera', cameraMode: 'food' },
    { id: 'open-viewfinder-lab', label: '8. Scan Viewfinder (Lab)', screen: 'camera', cameraMode: 'lab' },
    { id: 'direct-food-result', label: '9. AI Food Verification', screen: 'ai-food-sheet' },
    { id: 'direct-lab-result', label: '10. Verify OCR Lab Report', screen: 'ai-lab-sheet' },
    { id: 'marketplace', label: '11. Marketplace Hub', screen: 'marketplace' },
    { id: 'foodmandu-dhido', label: '12. Foodmandu Meals', screen: 'foodmandu-detail' },
  ];

  const goToFastJump = (jump: (typeof fastJumps)[number]) => {
    if (jump.cameraMode) setCameraResultMode(jump.cameraMode);
    setActiveScreen(jump.screen);
  };

  const handleLaunchCamera = () => {
    setCameraResultMode('food');
    setActiveScreen('camera');
  };

  const handleCameraResult = (mode: 'food' | 'lab') => {
    if (mode === 'food') {
      setActiveScreen('ai-food-sheet');
    } else {
      setActiveScreen('ai-lab-sheet');
    }
  };

  const handleConfirmVerification = () => {
    setActiveScreen('home-dashboard');
  };

  return (
    <main className="min-h-screen bg-[#f5faf8] text-slate-800 font-sans antialiased flex flex-col md:flex-row">
      
      {/* LEFT: Sovereign Simulator Guidance Console Panel */}
      <section className="w-full md:w-[420px] lg:w-[480px] p-6 md:p-8 bg-white border-b md:border-b-0 md:border-r border-teal-100 flex flex-shrink-0 flex-col gap-6 overflow-y-auto max-h-screen shadow-sm">
        
        {/* Console Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0d9488]">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-slate-900 leading-tight">TApp Companion</h1>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-black">Interactive Sandbox</p>
          </div>
        </div>

        {/* Informative description */}
        <div className="bg-teal-50/40 rounded-2xl p-4 border border-teal-100 space-y-2 text-xs text-slate-600 leading-relaxed">
          <p>
            Welcome to the <strong>TApp Wellness (Nepal Beachhead)</strong> prototype simulation. TApp is structured around patient empowerment, on-device local companion AI, and cryptographic P2P health data sovereignty.
          </p>
          <p>
            Choose a quick navigation screen or trigger one of the diagnostic sequences using the scenario cards below.
          </p>
        </div>

        {/* Fast Jump Screen Selection Tabs */}
        <section className="space-y-2.5">
          <h4 className="text-[10px] uppercase tracking-wider font-bold text-teal-800">Scenario Fast Jumps (12 Screens)</h4>
          <div className="grid grid-cols-2 gap-2">
            {fastJumps.map(tab => {
              const isActive =
                activeScreen === tab.screen &&
                (tab.screen !== 'camera' || cameraResultMode === tab.cameraMode);
              return (
                <button
                  key={tab.id}
                  onClick={() => goToFastJump(tab)}
                  className={`py-2 px-3 rounded-lg text-left text-xs font-semibold tracking-wide transition-all border ${
                    isActive
                    ? 'bg-[#0d9488] text-white font-bold shadow-sm border-[#0d9488] pl-3'
                    : 'bg-slate-50 text-slate-600 border-slate-100 hover:text-slate-800 hover:bg-teal-50/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Clinical Design Values */}
        <section className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-wider font-bold text-teal-800">Clinical Focus Principles</h4>
          
          <div className="space-y-2">
            {/* Value 1 */}
            <div className="bg-slate-50/50 p-3.5 rounded-xl flex gap-3 border border-slate-100 shadow-sm">
              <div className="p-1.5 h-fit bg-teal-50 text-[#0d9488] border border-teal-100 rounded-lg flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-slate-800">Sovereignty Sandboxing</h5>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Toggle switches manually on clinical pipelines. No cloud server handles biometric parameters.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-slate-50/50 p-3.5 rounded-xl flex gap-3 border border-slate-100 shadow-sm">
              <div className="p-1.5 h-fit bg-teal-50 text-[#0d9488] border border-teal-100 rounded-lg flex-shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-slate-800">"Take-a-Picture" Ingestion</h5>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Reduces friction for Nepalese users managing chronic A1c levels. Photos feed OCR and food matter decoders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Sandbox footer */}
        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>TApp Nepal Applet V1.2</span>
          <span className="flex items-center gap-1 font-semibold text-teal-600">
            <CheckCircle className="w-3.5 h-3.5 text-[#0d9488]" /> P2P Active
          </span>
        </div>

      </section>

      {/* RIGHT: Pixel-Perfect High Contrast Phone Frame Chassis representation */}
      <section className="flex-1 flex items-center justify-center p-4 md:p-6 bg-[#eaefed] overflow-y-auto">
        
        {/* Device frame casing */}
        <div className="relative w-full max-w-sm md:max-w-[390px] h-[780px] bg-white rounded-[40px] shadow-[0_15px_45px_rgba(13,148,136,0.06)] border-8 border-slate-800 flex flex-col overflow-hidden">
          
          {/* Top Notch Area (Dynamic Island mockup) */}
          <div className="absolute top-0 inset-x-0 h-8 bg-slate-900 z-50 flex items-center justify-center">
            {/* Notch capsule */}
            <div className="w-24 h-4.5 bg-black rounded-full absolute top-1.5 flex items-center justify-center p-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-auto" />
              <div className="w-2 h-2 bg-neutral-900 rounded-full ml-auto" />
            </div>
            
            {/* Top Bar status details */}
            <div className="w-full px-5 flex justify-between text-[9px] text-slate-300 font-extrabold tracking-wider select-none pointer-events-none mt-1">
              <span>9:41 AM <span className="text-[8px] text-emerald-400 font-black">NPT</span></span>
              <span className="flex items-center gap-1.5">
                <span>P2P</span>
                <span>LTE</span>
                <span>82%</span>
              </span>
            </div>
          </div>

          {/* Device Nav Header Section (not shown in full-frame camera mode or onboarding) */}
          {activeScreen !== 'camera' && activeScreen !== 'onboarding' && (
            <header className="pt-10 pb-3 px-4 bg-white border-b border-[#eaefed] flex items-center justify-between z-30 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0d9488] rounded-full animate-ping" />
                <h1 className="font-extrabold text-[15px] tracking-tight text-slate-900">
                  TApp <span className="font-medium text-slate-500">Wellness</span>
                </h1>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 bg-[#eaefed] text-[#42504c] text-[10px] font-black uppercase rounded-full tracking-wider border border-[#dee4e1]">
                  P2P Secure
                </span>
                <span className="w-7 h-7 rounded-full overflow-hidden border border-[#bcc9c6] bg-slate-100 flex items-center justify-center text-xs font-bold text-zinc-600">
                  RK
                </span>
              </div>
            </header>
          )}

          {/* Active View viewport */}
          <div className="flex-1 flex flex-col overflow-hidden z-20 relative bg-[#f5faf8]">
            {activeScreen === 'onboarding' && (
              <ScreenOnboarding 
                onComplete={() => setActiveScreen('home-dashboard')} 
              />
            )}
            {activeScreen === 'home-dashboard' && (
              <ScreenHome 
                onNavigate={setActiveScreen} 
                onLaunchCamera={handleLaunchCamera} 
              />
            )}
            {activeScreen === 'blood-sugar-trends' && (
              <ScreenTrends 
                onBack={() => setActiveScreen('home-dashboard')} 
                onNavigate={setActiveScreen}
              />
            )}
            {activeScreen === 'cgm-setup' && (
              <ScreenCGMSetup 
                onBack={() => setActiveScreen('home-dashboard')} 
                onNavigate={setActiveScreen}
              />
            )}
            {activeScreen === 'privacy' && (
              <ScreenPrivacy />
            )}
            {activeScreen === 'prescriptions' && (
              <ScreenPrescriptions onNavigate={setActiveScreen} />
            )}
            {activeScreen === 'doctor-profile' && (
              <ScreenSpecialist />
            )}
            {activeScreen === 'camera' && (
              <ScreenCamera
                initialMode={cameraResultMode}
                onDismiss={() => setActiveScreen('home-dashboard')}
                onNavigateToResult={handleCameraResult}
              />
            )}
            {activeScreen === 'ai-food-sheet' && (
              <ScreenFoodVerification 
                onConfirm={handleConfirmVerification} 
                onNavigate={setActiveScreen} 
              />
            )}
            {activeScreen === 'ai-lab-sheet' && (
              <ScreenLabVerification 
                onConfirm={handleConfirmVerification} 
                onNavigate={setActiveScreen} 
              />
            )}
            {activeScreen === 'marketplace' && (
              <ScreenMarketplace onNavigate={setActiveScreen} />
            )}
            {activeScreen === 'foodmandu-detail' && (
              <ScreenFoodmanduDetail 
                onBack={() => setActiveScreen('marketplace')} 
                onNavigate={setActiveScreen} 
              />
            )}
          </div>

          {/* Bottom Native Shell tabbed navigation menu bar for phone frame (hidden on active camera and onboarding) */}
          {activeScreen !== 'camera' && activeScreen !== 'onboarding' && (
            <footer className="absolute bottom-0 inset-x-0 h-[68px] bg-white border-t border-[#dee4e1]/65 z-40 px-4 py-1.5 flex justify-between items-center select-none shadow-xl">
              
              {/* Home Tab */}
              <button 
                onClick={() => setActiveScreen('home-dashboard')}
                className={`flex flex-col items-center flex-1 py-1 gap-1 transition-colors ${
                  activeScreen === 'home-dashboard' ? 'text-[#0d9488]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Dashboard</span>
              </button>

              {/* Trends Tab */}
              <button 
                onClick={() => setActiveScreen('blood-sugar-trends')}
                className={`flex flex-col items-center flex-1 py-1 gap-1 transition-colors ${
                  activeScreen === 'blood-sugar-trends' ? 'text-[#0d9488]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Trends</span>
              </button>

              {/* Marketplace Tab */}
              <button 
                onClick={() => setActiveScreen('marketplace')}
                className={`flex flex-col items-center flex-grow flex-1 py-1 gap-1 transition-colors ${
                  activeScreen === 'marketplace' || activeScreen === 'foodmandu-detail' ? 'text-[#0d9488]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Market</span>
              </button>

              {/* Secure Privacy Tab */}
              <button 
                onClick={() => setActiveScreen('privacy')}
                className={`flex flex-col items-center flex-1 py-1 gap-1 transition-colors ${
                  activeScreen === 'privacy' ? 'text-[#0d9488]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Sovereign</span>
              </button>

              {/* Action checklist Inbox Tab */}
              <button 
                onClick={() => setActiveScreen('prescriptions')}
                className={`flex flex-col items-center flex-1 py-1 gap-1 transition-colors ${
                  activeScreen === 'prescriptions' ? 'text-[#0d9488]' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                <BellRing className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Actions</span>
              </button>

            </footer>
          )}

          {/* Bottom virtual home indicator notch marker */}
          <div className="absolute bottom-1 inset-x-0 h-1 flex justify-center z-50 pointer-events-none">
            <div className="w-28 h-1 bg-neutral-900 rounded-full" />
          </div>

        </div>

      </section>

    </main>
  );
}
