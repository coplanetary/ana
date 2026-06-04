/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bluetooth, ShieldAlert, Cpu, Activity, TrendingUp, BellRing, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScreenCGMSetupProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

export default function ScreenCGMSetup({ onBack, onNavigate }: ScreenCGMSetupProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pairingStatus, setPairingStatus] = useState<'idle' | 'searching' | 'connected'>('idle');

  const handleSyncClick = () => {
    setIsSyncing(true);
    setPairingStatus('searching');
    
    // Simulate Bluetooth Handshake cycle
    setTimeout(() => {
      setPairingStatus('connected');
      setIsSyncing(false);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* Left Column Graphic Area */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col items-center justify-center p-6 border border-slate-100 group">
            {/* Ambient grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="w-40 h-40 relative flex items-center justify-center">
                {/* Pulse ring animations */}
                <div className={`absolute inset-0 rounded-full bg-[#0d9488]/5 ${pairingStatus === 'searching' ? 'animate-ping' : ''}`} />
                <div className={`absolute -inset-4 border border-dashed border-[#0d9488]/20 rounded-full ${pairingStatus === 'searching' ? 'animate-spin [animation-duration:12s]' : ''}`} />
                
                {/* High fidelity image of device */}
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=350" 
                  alt="Modern Minimalist CGM Sensor" 
                  className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-[#eaefed]"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#171d1c]">
                  {pairingStatus === 'connected' ? 'Enclave Paired' : 'Ready to Sync'}
                </h3>
                <p className="text-[#3d4947] text-xs max-w-[240px] leading-relaxed">
                  {pairingStatus === 'connected' 
                    ? 'Your CGM is securely broadcasting with end-to-end local encryption.' 
                    : 'Keep your TApp secure sensor within 3 feet of your smartphone.'}
                </p>
              </div>
            </div>
          </div>

          {/* Connect Action Button with microinteraction states */}
          <button 
            onClick={handleSyncClick}
            disabled={pairingStatus === 'connected' || isSyncing}
            className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 duration-150 flex items-center justify-center gap-2 ${
              pairingStatus === 'connected'
              ? 'bg-[#0d9488] text-white shadow-none'
              : isSyncing
              ? 'bg-zinc-200 text-[#3d4947] cursor-wait'
              : 'bg-[#0d9488] hover:bg-[#0f766e] text-white'
            }`}
          >
            {pairingStatus === 'connected' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-teal-100 fill-current" />
                Sovereign Safe Linked
              </>
            ) : isSyncing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-[#3d4947]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Searching for BLE Broadcast...
              </>
            ) : (
              <>
                <Bluetooth className="w-5 h-5" />
                Sync via Bluetooth
              </>
            )}
          </button>

          {/* Secure enclave check row */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            <Lock className="w-3.5 h-3.5 text-[#0d9488]" />
            <span className="text-[11px] font-bold text-[#3d4947] uppercase tracking-wider">All data remains on-device first</span>
          </div>
        </div>

        {/* Dynamic Insights of CGM */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[#171d1c]">Connected Insights</h4>
            <p className="text-xs text-[#3d4947] leading-relaxed">
              Pairing your device unlocks real-time monitoring and advanced predictive analytics powered by local AI.
            </p>
          </div>

          <div className="space-y-3">
            {/* Feature 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 items-start hover:bg-[#e4e9e7] transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] border border-teal-100 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="font-bold text-sm text-[#171d1c]">Real-time Glucose Streaming</h5>
                <p className="text-xs text-[#3d4947] leading-relaxed">
                  Get reading updates automatically on your dashboard every 5 minutes without manual numeric logging.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 items-start hover:bg-[#e4e9e7] transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] border border-teal-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="font-bold text-sm text-[#171d1c]">Predictive Trend Alerts</h5>
                <p className="text-xs text-[#3d4947] leading-relaxed">
                  On-device models anticipate sugar spikes or lows up to 30 minutes in advance based on daily metabolism.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 items-start hover:bg-[#e4e9e7] transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d9488] border border-teal-100 flex items-center justify-center flex-shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="font-bold text-sm text-[#171d1c]">Smart Local Notifications</h5>
                <p className="text-xs text-[#3d4947] leading-relaxed">
                  Receive proactive visual cues for rapid changes, tailored strictly to the doctor’s personalized bounds.
                </p>
              </div>
            </div>
          </div>

          {/* Soft Privacy Agreement Warning */}
          <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#0d9488]">
              <Sparkles className="w-4 h-4 fill-current" />
              <h5 className="font-bold text-xs uppercase tracking-wider">Privacy-First Integration</h5>
            </div>
            <p className="text-[11px] text-[#3c475a] leading-relaxed">
              Your biometric data remains cryptographically boxed. Only anonymous, aggregate trends feed the local companion models unless you explicitly share specific diagnostic sets with Dr. Adhikari.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
