/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Settings2, Image as ImageIcon, CheckCircle, Info, Sparkles } from 'lucide-react';

interface ScreenCameraProps {
  onDismiss: () => void;
  onNavigateToResult: (mode: 'food' | 'lab') => void;
  initialMode?: 'food' | 'lab';
}

export default function ScreenCamera({ onDismiss, onNavigateToResult, initialMode = 'food' }: ScreenCameraProps) {
  const [cameraMode, setCameraMode] = useState<'food' | 'lab'>(initialMode);
  const [shutterFlashing, setShutterFlashing] = useState(false);

  // Re-sync when a different fast-jump opens the viewfinder (component stays
  // mounted across food/lab switches, so the initial state alone is not enough).
  useEffect(() => {
    setCameraMode(initialMode);
  }, [initialMode]);

  const triggerCapture = () => {
    setShutterFlashing(true);
    setTimeout(() => {
      setShutterFlashing(false);
      onNavigateToResult(cameraMode);
    }, 450);
  };

  return (
    <div className="flex-1 flex flex-col bg-black min-h-screen text-white relative overflow-hidden select-none">
      
      {/* Target Viewfinder image background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <img 
          src={
            cameraMode === 'food' 
            ? "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800" // Fresh healthy vegetable plate
            : "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800" // Clinical testing report table sheet
          } 
          alt="Viewfinder Subject" 
          className="w-full h-full object-cover transition-all duration-300"
        />
      </div>

      {/* Camera Scanning Laser animation bar over the viewport */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_#34d399] animate-[bounce_4s_infinite] pointer-events-none z-10" />

      {/* Target scanning brackets overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-64 h-64 border-2 border-dashed border-white/40 rounded-[32px] relative flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-teal-400 rounded-tl-lg" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-teal-400 rounded-tr-lg" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-teal-400 rounded-bl-lg" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-teal-400 rounded-br-lg" />
          
          <div className="text-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-teal-300 border border-teal-500/20 max-w-[200px]">
            {cameraMode === 'food' ? 'Tracking Bio-matter...' : 'OCR Character Scan...'}
          </div>
        </div>
      </div>

      {/* Camera Viewfinder Header Options */}
      <header className="relative z-20 flex justify-between items-center p-4">
        <button 
          onClick={onDismiss}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-teal-300 fill-current" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-300">TApp Vision Active</span>
        </div>
      </header>

      {/* Frame Guidance alignment advice bubble */}
      <div className="flex-grow flex items-center justify-center text-center px-6 relative z-10 pointer-events-none mt-20">
        <p className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-4 py-2.5 rounded-full max-w-[260px] tracking-wide shadow-lg">
          {cameraMode === 'food' 
            ? 'Align your meal plate within the viewfinder' 
            : 'Align the prescription report text evenly'}
        </p>
      </div>

      {/* Bottom Mode Selectors & Controls */}
      <footer className="relative z-20 w-full pb-8 pt-4 px-6 flex flex-col items-center gap-6 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
        
        {/* Mode toggle chips */}
        <div className="flex p-0.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
          <button 
            type="button"
            onClick={() => setCameraMode('food')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              cameraMode === 'food' 
              ? 'bg-white text-teal-950 font-black shadow' 
              : 'text-zinc-300 hover:text-white'
            }`}
          >
            Food Plate
          </button>
          <button 
            type="button"
            onClick={() => setCameraMode('lab')}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              cameraMode === 'lab' 
              ? 'bg-white text-teal-950 font-black shadow' 
              : 'text-zinc-300 hover:text-white'
            }`}
          >
            Lab Report
          </button>
        </div>

        {/* Shutter core elements row */}
        <div className="flex items-center justify-between w-full max-w-xs">
          
          {/* Gallery placeholder */}
          <button 
            onClick={triggerCapture}
            className="w-12 h-12 rounded-xl border border-white/30 overflow-hidden relative active:scale-90 transition-transform bg-zinc-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150" 
              alt="Gallery thumbnail" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </button>

          {/* Core Shutter button */}
          <button 
            onClick={triggerCapture}
            className="relative flex items-center justify-center group active:scale-95 duration-100 transition-all"
          >
            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white group-hover:bg-zinc-100 transition-colors" />
            </div>
          </button>

          {/* Quick reverse camera or config icon */}
          <button className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/5 hover:bg-white/20 transition-all text-white">
            <Settings2 className="w-5 h-5" />
          </button>
        </div>

      </footer>

      {/* Absolute Success flashing shutter animation indicator */}
      <div 
        className={`fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-150 ${
          shutterFlashing ? 'opacity-100' : 'opacity-0'
        }`}
      />

    </div>
  );
}
