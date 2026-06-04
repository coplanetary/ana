/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Camera, Lock, User, CheckCircle, ArrowRight, 
  Activity, Smartphone, Info, RefreshCw, MapPin, ShieldAlert, EyeOff, Layout
} from 'lucide-react';

interface ScreenOnboardingProps {
  onComplete: () => void;
}

export default function ScreenOnboarding({ onComplete }: ScreenOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1 states
  const [userName, setUserName] = useState('Risav Karna');
  const [userLocation, setUserLocation] = useState('Kathmandu');
  const [enclaveInitialized, setEnclaveInitialized] = useState(false);
  const [initializingLog, setInitializingLog] = useState('');

  // Step 2 states
  const [simulatedScanSubject, setSimulatedScanSubject] = useState<'food' | 'lab' | null>(null);
  const [isScanningSimulation, setIsScanningSimulation] = useState(false);
  const [scannedResult, setScannedResult] = useState<any>(null);

  // Step 3 states
  const [shareOnlyAverages, setShareOnlyAverages] = useState(true);
  const [blockAnalytics, setBlockAnalytics] = useState(true);
  const [physicianAgreement, setPhysicianAgreement] = useState(true);

  // Trigger local database initialization simulation
  const handleInitializeEnclave = () => {
    setEnclaveInitialized(false);
    setInitializingLog('Accessing hardware secure enclave...');
    setTimeout(() => {
      setInitializingLog('Generating private/public key pairs (ECDSA 256)...');
      setTimeout(() => {
        setInitializingLog('Structuring local on-device SQLite database container...');
        setTimeout(() => {
          setInitializingLog('Key 0x7e8f_da8a active. Cryptographic isolation online.');
          setEnclaveInitialized(true);
        }, 600);
      }, 600);
    }, 400);
  };

  // Trigger "Take-a-Picture" scanning simulator
  const handleSimulateScan = (type: 'food' | 'lab') => {
    setSimulatedScanSubject(type);
    setIsScanningSimulation(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanningSimulation(false);
      if (type === 'food') {
        setScannedResult({
          title: 'Buckwheat Dhido & Mustard Greens',
          rating: 'Green (Low Glycemic)',
          explanation: 'On-device vision model determined the dish is buckwheat-rich, high fiber, slow-digesting.',
          calories: '380 kcal',
          protein: '12g',
          fiber: '15g'
        });
      } else {
        setScannedResult({
          title: 'Kanti Labs Blood Report',
          rating: 'HbA1c = 5.9%',
          explanation: 'Local OCR engine read test results: Pre-diabetes range. Synchronizing with clinical checklists.',
          labUnit: 'HbA1c',
          conf: '99.4% OCR Confidence'
        });
      }
    }, 1800);
  };

  return (
    <div className="flex-grow flex flex-col bg-white overflow-y-auto select-none font-sans justify-between min-h-screen text-[#171d1c]">
      
      {/* Upper Content Frame */}
      <div className="flex-1 px-5 py-6 space-y-6">
        
        {/* Step Indicator Header */}
        <header className="flex justify-between items-center text-xs pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1 bg-teal-50 text-[#0d9488] px-2.5 py-1 rounded-lg border border-teal-150 font-bold uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Sovereign Guide</span>
          </div>
          <span className="font-extrabold text-[#0d9488] tracking-widest text-[10px] uppercase">
            Step {step} of {totalSteps}
          </span>
        </header>

        {/* Dynamic progress bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-lg overflow-hidden">
          <div 
            className="bg-[#0d9488] h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* STEP 1: WELCOME & ENCLAVE ARCHITECTURE */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950 tracking-tight leading-tight">
                Welcome to TApp Wellness
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Experience a premium high-fidelity clinic-grade interface designed purely for patient self-control, diabetic metabolic pacing, and complete data safety across Nepal.
              </p>
            </div>

            {/* Visual Callout for Enclave */}
            <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-lg space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#0d9488] tracking-wider block">Esthetic Environment</span>
              <h4 className="font-bold text-xs text-slate-800">Serene. Clinical. Safe.</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                We eschew unrequested advertisements, corporate logins, and database trackers. Every color and typography pairing is crafted for visual restfulness.
              </p>
            </div>

            {/* Interactive Section */}
            <div className="space-y-3.5 p-4 bg-slate-50 border border-slate-100 rounded-lg">
              <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <User className="w-4 h-4 text-teal-600" /> Choose Patient Sandbox Profile
              </h4>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Patient Name</label>
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Primary Region</label>
                  <select 
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#0d9488]"
                  >
                    <option value="Kathmandu">Kathmandu, Nepal</option>
                    <option value="Pokhara">Pokhara, Nepal</option>
                    <option value="Lalitpur">Lalitpur, Nepal</option>
                    <option value="Bhaktapur">Bhaktapur, Nepal</option>
                    <option value="Biratnagar">Biratnagar, Nepal</option>
                  </select>
                </div>

                {/* Secure Initialize button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleInitializeEnclave}
                    className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-slate-850"
                  >
                    <Lock className="w-3.5 h-3.5 text-teal-300" />
                    Initialize Local Vault
                  </button>

                  {initializingLog && (
                    <div className="mt-2.5 p-2 bg-[#171d1c] font-mono text-[9px] text-teal-400 rounded-lg leading-relaxed border border-teal-900 flex flex-col">
                      <span className="text-[8px] text-slate-400 uppercase mb-1">On-Device Provisioning logs:</span>
                      <span>&gt; {initializingLog}</span>
                      {enclaveInitialized && (
                        <span className="text-emerald-400 mt-1 font-bold flex items-center gap-1 text-[9px]">
                          <ShieldCheck className="w-3.5 h-3.5 fill-current" /> SECURE_HANDSHAKE: ACTIVE (0xAB42_E7FD)
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TAKE-A-PICTURE DATA ENTRY */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950 tracking-tight leading-tight flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#0d9488]" /> "Take-a-Picture" Friction Solution
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                TApp reduces chronic logging friction. Instead of manually inputting grams/units, snap a photo of food plates or physical clinician reports to parse biometric markers offline.
              </p>
            </div>

            {/* Interactive Sandbox Simulator */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-4">
              <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-teal-600" /> Simulate On-Device Camera Parser
              </h4>

              <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold">
                Tap an item to scan locally:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button"
                  onClick={() => handleSimulateScan('food')}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    simulatedScanSubject === 'food' 
                    ? 'bg-teal-50 border-[#0d9488] text-[#0d9488]' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xl mb-1">🍲</span>
                  <span className="font-bold text-xs block leading-tight">Buckwheat Dhido Plate</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Organic Nepali Meal</span>
                </button>

                <button 
                  type="button"
                  onClick={() => handleSimulateScan('lab')}
                  className={`p-3 border rounded-lg text-left transition-all ${
                    simulatedScanSubject === 'lab' 
                    ? 'bg-teal-50 border-[#0d9488] text-[#0d9488]' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xl mb-1">📑</span>
                  <span className="font-bold text-xs block leading-tight">HbA1c Lab Report</span>
                  <span className="text-[9px] text-slate-400 block mt-0.5">Kanti Health Labs</span>
                </button>
              </div>

              {/* Scanning state overlay simulation */}
              {isScanningSimulation && (
                <div className="p-4 bg-teal-950 text-white rounded-lg font-mono text-[10px] space-y-2 relative overflow-hidden animate-pulse border border-teal-500/20">
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_8px_#34d399] animate-[bounce_1.5s_infinite]" />
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-teal-400 animate-spin" />
                    <span>AI ANALYZING BIOPRINT LOCALLY...</span>
                  </div>
                  <p className="text-[8px] text-slate-400">Performing lightweight on-device vision classification. Core neural processing zero cloud data telemetry...</p>
                </div>
              )}

              {/* Scanned result card */}
              {scannedResult && !isScanningSimulation && (
                <div className="bg-white border border-teal-100 p-3.5 rounded-lg space-y-3 shadow-xs animate-scaleUp">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400">Captured Subject</span>
                      <h5 className="font-black text-xs text-slate-900 leading-tight">{scannedResult.title}</h5>
                    </div>
                    <span className="px-2 py-0.5 bg-teal-50 text-[#0d9488] border border-teal-100 text-[9px] font-black uppercase rounded-lg">
                      LOCAL AI DONE
                    </span>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-[10px] text-slate-600 leading-relaxed font-semibold">
                    <span className="text-[9px] font-extrabold uppercase text-[#0d9488] tracking-widest block mb-0.5">Metabolic Result</span>
                    {scannedResult.rating}
                  </div>

                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {scannedResult.explanation}
                  </p>

                  {scannedResult.calories && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center font-mono text-[9px] text-slate-500">
                      <div>
                        <span className="block text-slate-400 text-[8px] uppercase font-sans">Carbs</span>
                        <span className="font-bold text-slate-900">Slow Release</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-[8px] uppercase font-sans">Proteins</span>
                        <span className="font-bold text-slate-900">{scannedResult.protein}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-[8px] uppercase font-sans">Fiber</span>
                        <span className="font-dash text-slate-900">{scannedResult.fiber}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* STEP 3: PEER TO PEER SOVEREIGNTY PIPELINES */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-950 tracking-tight leading-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#0d9488]" /> P2P-First Data Sovereignty
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                TApp puts you in absolute control over your health telemetry. All data is written locally first, and you establish peer-to-peer tunnels to exchange insights with clinicians. No data leaves without permission.
              </p>
            </div>

            {/* Interactive Switches */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-4">
              <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-600" /> Sandboxed Pipeline Switches
              </h4>

              <div className="space-y-3">
                {/* Switch 1: Locked Enclave */}
                <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg">
                  <div className="space-y-0.5 pr-2">
                    <span className="font-bold text-[11px] text-slate-950 block">Local Device Sandbox</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">All glucose telemetry stays on client sandbox.</span>
                  </div>
                  <span className="px-2 py-1 bg-teal-100 text-[#0d9488] text-[9px] font-black uppercase rounded-lg">
                    Always On
                  </span>
                </div>

                {/* Switch 2: Share Averages */}
                <button
                  type="button"
                  onClick={() => setShareOnlyAverages(!shareOnlyAverages)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-left hover:border-teal-200 transition-all"
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="font-bold text-[11px] text-slate-950 block">Filter Sync Logs with Clinicians</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">Only peer-to-peer exchange summary averages (No raw micro-datums).</span>
                  </div>
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    shareOnlyAverages ? 'bg-[#0d9488]' : 'bg-slate-300'
                  }`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-150 ${
                      shareOnlyAverages ? 'translate-x-4' : ''
                    }`} />
                  </div>
                </button>

                {/* Switch 3: Prevent Cloud telemetry */}
                <button
                  type="button"
                  onClick={() => setBlockAnalytics(!blockAnalytics)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg text-left hover:border-teal-200 transition-all"
                >
                  <div className="space-y-0.5 pr-2">
                    <span className="font-bold text-[11px] text-slate-950 block">Fence Third-Party Telemetry</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">Strictly shield and ignore third-party Google or Apple analytical captures.</span>
                  </div>
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    blockAnalytics ? 'bg-[#0d9488]' : 'bg-slate-300'
                  }`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-150 ${
                      blockAnalytics ? 'translate-x-4' : ''
                    }`} />
                  </div>
                </button>
              </div>

              {/* Education Banner */}
              <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg text-[10px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                <p className="leading-normal">
                  Your cryptographic synchronization keys remain tied to your hardware secure elements, ensuring zero corporate leak pipelines.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION & VERIFICATION KICK OFF */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-2 text-center py-6">
              <div className="w-16 h-16 bg-teal-50 border border-teal-150 text-[#0d9488] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-9 h-9 fill-current" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-950 tracking-tight">Onboarding Verified</h2>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your sovereign patient sandbox is structured and secured locally. Let us protect your continuous glucose metabolic path!
                </p>
              </div>
            </div>

            {/* Structured Sandbox Overview */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3">
              <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400">Your Sandbox Settings</h4>
              
              <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  City Sanctuary: <span className="text-slate-500 ml-auto">{userLocation}, Nepal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Patient Profile: <span className="text-slate-500 ml-auto">{userName}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Sovereignty Guard: <span className="text-emerald-600 font-extrabold ml-auto">0xAB42_E7FD Local Key</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Sync Filters: <span className="text-slate-500 ml-auto">{shareOnlyAverages ? 'Filtered Averages Only' : 'Allow Full Telemetry'}</span>
                </li>
              </ul>
            </div>

            {/* Consent prompt */}
            <label className="flex items-start gap-2.5 p-3.5 bg-teal-50/50 border border-teal-100 rounded-lg cursor-pointer">
              <input 
                type="checkbox" 
                checked={physicianAgreement} 
                onChange={() => setPhysicianAgreement(!physicianAgreement)}
                className="mt-1 accent-[#0d9488]"
              />
              <span className="text-[10px] text-slate-600 leading-normal font-semibold">
                I understand that TApp acts solely as a peer-to-peer data sandbox. It is structured under data sovereignty guidelines and does not communicate biometric levels to central corporate servers.
              </span>
            </label>
          </div>
        )}

      </div>

      {/* Footer Navigation Buttons */}
      <footer className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider rounded-lg border border-slate-200 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Back
          </button>
        ) : (
          <div className="w-10" />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1 && !enclaveInitialized) {
                // Autoinitialize to prevent user blocking
                setEnclaveInitialized(true);
                setInitializingLog('Auto-generating sandbox environment key. Completed.');
              }
              setStep(step + 1);
            }}
            className="px-5 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onComplete}
            disabled={!physicianAgreement}
            className={`px-6 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors shadow ${
              physicianAgreement ? 'bg-[#0d9488] hover:bg-[#0f766e]' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Enter Ecosystem</span>
            <CheckCircle className="w-4 h-4 text-teal-300 fill-current" />
          </button>
        )}
      </footer>

    </div>
  );
}
