/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Microscope, Check, Edit2, AlertOctagon, HelpCircle, ArrowRight, Sparkles, X } from 'lucide-react';

interface ScreenLabVerificationProps {
  onConfirm: () => void;
  onNavigate: (screen: any) => void;
}

export default function ScreenLabVerification({ onConfirm, onNavigate }: ScreenLabVerificationProps) {
  const [hba1c, setHba1c] = useState('6.2');
  const [glucose, setGlucose] = useState('110');
  const [isEditingH, setIsEditingH] = useState(false);
  const [isEditingG, setIsEditingG] = useState(false);

  return (
    <div className="flex-grow flex flex-col bg-[#171d1c]/40 backdrop-blur-sm shadow-2xl relative select-none justify-end min-h-screen">
      
      {/* Background Document preview representation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=700" 
          alt="AI Lab Report Document Background" 
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-neutral-900/40" />
      </div>

      {/* Target scanner line graphic overlay */}
      <div className="absolute inset-x-0 bottom-[45%] top-16 flex items-center justify-center pointer-events-none z-10">
        <div className="w-60 h-[300px] border border-teal-400/45 rounded-xl bg-teal-400/5 backdrop-blur-[1px] relative">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-teal-400/70 shadow-[0_0_15px_#34d399]" />
          
          {/* Mock targeted highlight bounding boxes around metrics */}
          <div className="absolute top-[32%] left-[10%] right-[10%] h-8 border border-white/50 bg-white/20 animate-pulse rounded-md" />
          <div className="absolute top-[48%] left-[10%] right-[10%] h-8 border border-white/50 bg-white/20 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Header Controls overlay */}
      <header className="absolute top-0 inset-x-0 p-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Microscope className="w-4 h-4 text-teal-300" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#171d1c] bg-white/95 px-2 py-0.5 rounded-full">OCR Parse</span>
        </div>
        <button 
          onClick={onConfirm}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/10"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* Extracted results bottom drawer sheet */}
      <div className="relative z-20 bg-white rounded-t-[32px] p-6 space-y-6 max-w-md mx-auto w-full border-t border-[#eaefed] shadow-2xl">
        
        {/* Pull handle */}
        <div className="flex justify-center -mt-2">
          <div className="w-12 h-1 bg-[#bcc9c6] rounded-full opacity-60" />
        </div>

        {/* Title */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#eaefed] flex items-center justify-center text-[#55615a] flex-shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-600 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#171d1c]">Data Extracted</h2>
            <p className="text-xs text-[#5b6760] font-semibold">2 diagnostic metrics parsed inside report</p>
          </div>
        </div>

        {/* Editable fields */}
        <div className="space-y-3">
          
          {/* HbA1c row */}
          <div className="bg-[#f0f5f2] rounded-2xl p-4 border border-transparent hover:border-[#dee4e1] transition-all flex justify-between items-center group">
            <div className="space-y-1 flex-1">
              <span className="block text-[10px] uppercase font-extrabold tracking-wider text-[#3d4947]">HbA1c Factor (A1c)</span>
              {isEditingH ? (
                <input 
                  type="text"
                  value={hba1c}
                  onChange={(e) => setHba1c(e.target.value)}
                  onBlur={() => setIsEditingH(false)}
                  autoFocus
                  className="bg-white border-2 border-[#00685f] rounded-lg px-2 py-1 text-sm font-bold text-[#171d1c] w-24 font-mono focus:outline-none"
                />
              ) : (
                <span onClick={() => setIsEditingH(true)} className="text-xl font-black text-[#171d1c] font-mono cursor-pointer underline decoration-dotted decoration-zinc-400">
                  {hba1c}%
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsEditingH(!isEditingH)}
              className="p-2 text-zinc-400 group-hover:text-[#00685f] rounded-full hover:bg-white/60 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Fasting sugar row */}
          <div className="bg-[#f0f5f2] rounded-2xl p-4 border border-transparent hover:border-[#dee4e1] transition-all flex justify-between items-center group">
            <div className="space-y-1 flex-1">
              <span className="block text-[10px] uppercase font-extrabold tracking-wider text-[#3d4947]">Fasting Blood Glucose</span>
              {isEditingG ? (
                <input 
                  type="text"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                  onBlur={() => setIsEditingG(false)}
                  autoFocus
                  className="bg-white border-2 border-[#00685f] rounded-lg px-2 py-1 text-sm font-bold text-[#171d1c] w-24 font-mono focus:outline-none"
                />
              ) : (
                <span onClick={() => setIsEditingG(true)} className="text-xl font-black text-[#171d1c] font-mono cursor-pointer underline decoration-dotted decoration-zinc-400">
                  {glucose} mg/dL
                </span>
              )}
            </div>
            <button 
              onClick={() => setIsEditingG(!isEditingG)}
              className="p-2 text-zinc-400 group-hover:text-[#00685f] rounded-full hover:bg-white/60 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Warning clinical checker */}
        <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex gap-2.5 items-start text-[11px] text-rose-700 leading-normal">
          <AlertOctagon className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>
            Please verify these extracted parameters against the raw hardcopy values on your physical laboratory sheet before locking records.
          </span>
        </div>

        {/* CTAs */}
        <button 
          onClick={onConfirm}
          className="w-full h-14 bg-[#00685f] hover:bg-[#008378] text-white rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          Confirm & Log to Records
        </button>

      </div>
    </div>
  );
}
