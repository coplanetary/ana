/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldAlert, Star, Users, Briefcase, Lock, CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export default function ScreenSpecialist() {
  const [sharingStatus, setSharingStatus] = useState<'idle' | 'pairing' | 'active'>('idle');

  const handleConnect = () => {
    setSharingStatus('pairing');
    setTimeout(() => {
      setSharingStatus('active');
    }, 1800);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-32">
        
        {/* Clinician Profile Header */}
        <section className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300" 
                alt="Dr. Sarita Rana" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-[#00685f] text-white p-1 rounded-full border-2 border-white shadow">
              <CheckCircle2 className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-[#171d1c] tracking-tight">Dr. Sarita Rana</h2>
            <div className="flex items-center gap-1.5 justify-center mb-1">
              <span className="px-2 py-0.5 bg-[#d9e6dd] text-[#131e19] rounded-full text-[10px] font-bold">RD, M.Sc. Nutrition</span>
              <span className="px-2 py-0.5 bg-teal-100 text-[#00685f] rounded-full text-[10px] font-bold">Metabolic Specialist</span>
            </div>
            <p className="text-[#3d4947] text-xs leading-relaxed max-w-xs mx-auto">
              Empowering Kathmandu patients with high-fidelity metabolic nutrition since 2012.
            </p>
          </div>

          {/* Core Clinician Metrics */}
          <div className="flex items-center gap-6 justify-center pt-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#00685f]" />
              <span className="text-xs font-semibold text-[#1c1d1d]">1.5k Patients</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-current" />
              <span className="text-xs font-semibold text-[#1c1d1d]">4.9 (310 Reviews)</span>
            </div>
          </div>
        </section>

        {/* Bento Details section */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* Response time indicator */}
          <div className="p-4 bg-[#008378] text-white rounded-2xl shadow-sm flex flex-col justify-center">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#f4fffc]/80 mb-0.5">Response Time</span>
            <p className="text-lg font-black leading-tight">&lt; 2 Hours</p>
            <p className="text-[10px] font-semibold text-[#f4fffc]/70 mt-0.5">During clinic hours (9 - 5 NPT)</p>
          </div>

          {/* Specialties filter */}
          <div className="p-4 bg-[#e4e9e7] rounded-2xl flex flex-col gap-2">
            <span className="text-[10px] font-black text-[#3d4947] tracking-wider uppercase">Practitioner Specialties</span>
            <div className="flex flex-wrap gap-1.5">
              {['Type 2 Diabetes', 'Gestational Care', 'Ketogenic Therapy', 'Local Meal Prep'].map((spec, i) => (
                <span 
                  key={i}
                  className="bg-white px-2.5 py-1 text-[10px] font-bold rounded-full text-[#1c1d1d] border border-zinc-200"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Bio philosophy */}
          <div className="p-5 bg-white rounded-3xl border border-[#eaefed] space-y-3 shadow-sm text-xs text-[#3d4947] leading-relaxed">
            <h4 className="font-extrabold text-sm text-[#171d1c]">Approach & Philosophy</h4>
            <p>
              My clinical work at Kathmandu Metabolic Center leverages "Humanist Precision" nutrition. We examine the real patterns behind standard blood sugar charts rather than abstract numbers.
            </p>
            <p>
              By establishing TApp's secure local sharing sandbox, patients can grant me transient access to daily glucose streaming curves and raw meal snapshots (like buckwheat dhido or lentil saag sets), assisting in hyper-customized coaching adjustments without exposing secrets.
            </p>
          </div>

          {/* Sharing Access Requirements details */}
          <div className="p-5 bg-[#f0f5f2] rounded-3xl border border-[#0d9488]/15 space-y-4">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-[#171d1c]">Requested Enclave Access</h4>
                <div className="bg-[#00685f]/15 px-2 py-0.5 border border-[#0d9488]/20 rounded-full text-[9px] text-[#00685f] font-bold uppercase tracking-wider">
                  READ-ONLY
                </div>
              </div>
              <p className="text-[11px] text-[#3d4947] leading-relaxed">
                To prescribe professional feedback, Dr. Rana requests permission keys to review:
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-xl flex items-center justify-between text-xs">
                <span className="font-bold text-[#171d1c]">Glucose Logs (Last 90 days)</span>
                <span className="text-[#00685f] font-bold text-[10px]">Read-Only</span>
              </div>
              <div className="p-3 bg-white rounded-xl flex items-center justify-between text-xs">
                <span className="font-bold text-[#171d1c]">Food Snapshot Logs</span>
                <span className="text-[#00685f] font-bold text-[10px]">Read-Only</span>
              </div>
              <div className="p-3 bg-white rounded-xl flex items-center justify-between text-xs">
                <span className="font-bold text-[#171d1c]">Activity Tracking Steps</span>
                <span className="text-[#00685f] font-bold text-[10px]">Read-Only</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#d9e6dd]/40 rounded-xl flex gap-2 items-start text-[11px] text-[#5b6760] leading-relaxed">
              <AlertCircle className="w-4 h-4 text-[#00685f] flex-shrink-0 mt-0.5" />
              <span>
                Your health parameters are never pushed to a remote server. Dr. Rana only views a transient locally-constructed portal. You can revoke access at any moment.
              </span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="p-5 bg-[#eaefed] rounded-3xl space-y-3">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="text-xs italic text-[#3d4947] leading-relaxed">
              "Dr. Rana helped me stabilize my post-breakfast sugar spikes within weeks without forcing me to abandon local meals. Adjusting rayo ko saag ratios was a complete game changer!"
            </blockquote>
            <cite className="block text-[10px] font-bold uppercase tracking-wider text-[#171d1c] not-italic">
              — Ramesh K., Patient for 6 months
            </cite>
          </div>

        </div>

      </div>

      {/* Fixed bottom connect active dock */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-[#dee4e1] z-40">
        <div className="max-w-md mx-auto space-y-2">
          {sharingStatus === 'active' ? (
            <div className="w-full py-4 bg-teal-50 border border-teal-100 text-[#00685f] text-center rounded-full font-bold text-sm uppercase flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 fill-current text-white text-teal-600" />
              Encrypted Vault Connection Active
            </div>
          ) : (
            <button 
              onClick={handleConnect}
              disabled={sharingStatus === 'pairing'}
              className="w-full h-14 bg-[#00685f] hover:bg-[#008378] text-white rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 duration-150 transition-all"
            >
              {sharingStatus === 'pairing' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Establishing Cryptographic Tunnel...
                </>
              ) : (
                'Connect & Share Enclave'
              )}
            </button>
          )}

          <p className="text-[10px] text-center text-[#3d4947] leading-tight">
            Connecting indicates agreement with our cryptographic <span className="underline cursor-pointer font-bold text-[#00685f]">Zero-Trust Data Sharing Compact</span>.
          </p>
        </div>
      </div>

    </div>
  );
}
