/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { clinicianChecklistTasks } from '../mockData';
import { Check, Info, Droplets, Camera, CheckCircle2, ChevronRight, RefreshCw, Calendar, Tag, AlertCircle } from 'lucide-react';

interface ScreenHomeProps {
  onNavigate: (screen: any) => void;
  onLaunchCamera: () => void;
}

export default function ScreenHome({ onNavigate, onLaunchCamera }: ScreenHomeProps) {
  const [tasks, setTasks] = useState(clinicianChecklistTasks);
  const [selectedTaskInfo, setSelectedTaskInfo] = useState<string | null>(null);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* Hero: Time in Range Gauge Header */}
        <section className="flex flex-col items-center justify-center py-6 bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Outer backing track */}
            <div className="absolute inset-2 rounded-full border-[10px] border-[#eaefed]" />
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                className="text-[#0d9488]" 
                cx="88" 
                cy="88" 
                fill="transparent" 
                r="74" 
                stroke="currentColor" 
                strokeDasharray={465} 
                strokeDashoffset={465 - (465 * 82) / 100}
                strokeLinecap="round" 
                strokeWidth="10" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-[#171d1c]">82%</span>
              <span className="text-[10px] font-bold text-[#3d4947] uppercase tracking-widest mt-0.5">In Range</span>
            </div>
          </div>
          
          <div className="mt-4 text-center px-4">
            <h4 className="font-bold text-md text-[#171d1c]">Excellent Adherence</h4>
            <p className="text-xs text-[#3d4947] mt-1 leading-relaxed max-w-[280px]">
              You've been within your doctor target range for 19.5 hours today.
            </p>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-sm text-[#171d1c] uppercase tracking-wider">Recent Activity</h3>
            <button 
              onClick={() => onNavigate('blood-sugar-trends')}
              className="text-[#0d9488] text-xs font-semibold hover:underline flex items-center gap-0.5"
            >
              Trends View <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Last Reading Card */}
            <div 
              onClick={() => onNavigate('blood-sugar-trends')}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-slate-100 hover:bg-[#f0f5f2] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0d9488] border border-teal-100 flex items-center justify-center">
                  <Droplets className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-[#3d4947] font-medium">Last Reading (CGM)</p>
                  <p className="font-black text-xl text-[#171d1c]">
                    110 <span className="text-xs font-normal text-zinc-500">mg/dL</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#3d4947]">1h ago</span>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#0d9488] transition-colors" />
              </div>
            </div>

            {/* Meal Card */}
            <div 
              onClick={() => onNavigate('foodmandu-detail')}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-slate-100 hover:bg-[#f0f5f2] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=150" 
                    alt="Chicken Thakali Set Meal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-[#3d4947] font-medium">Lunch Log</p>
                  <p className="font-bold text-sm text-[#171d1c]">Chicken Thakali Set</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#d9e6dd] text-[#5b6760] font-bold rounded-full text-[10px] uppercase">
                  Protein
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#0d9488] transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Today's Plan Checklist */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-sm text-[#171d1c] uppercase tracking-wider">Today's Plan</h3>
            <span className="text-xs font-semibold text-[#3d4947]">
              {completedCount} of {tasks.length} done
            </span>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm divide-y divide-slate-100">
            {tasks.map((task) => (
              <div 
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-[#f5faf8] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Custom Checkbox */}
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      task.completed 
                      ? 'bg-[#0d9488] border-[#0d9488] text-white' 
                      : 'border-[#bcc9c6] hover:border-[#0d9488]'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="flex-1" onClick={() => toggleTask(task.id)}>
                    <p className={`font-semibold text-sm transition-all text-[#171d1c] ${
                      task.completed ? 'line-through opacity-45' : ''
                    }`}>
                      {task.title}
                    </p>
                  </div>
                </div>

                {/* Optional metadata or action */}
                <div className="flex items-center gap-2">
                  {task.timeStr && (
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded-full text-[10px]">
                      {task.timeStr}
                    </span>
                  )}
                  {task.hasInfo && (
                    <button 
                      onClick={() => setSelectedTaskInfo(selectedTaskInfo === task.id ? null : task.id)}
                      className={`p-1 rounded-full transition-colors ${
                        selectedTaskInfo === task.id ? 'bg-[#0d9488]/10 text-[#0d9488]' : 'text-zinc-400 hover:text-[#0d9488]'
                      }`}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Task Info Dialog Box */}
        {selectedTaskInfo && (() => {
          const matching = tasks.find(t => t.id === selectedTaskInfo);
          if (!matching) return null;
          return (
            <div className="bg-[#eaefed] p-4 rounded-xl border border-[#dee4e1] space-y-1 relative animate-fadeIn duration-150">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#0d9488] flex items-center gap-1">
                <AlertCircle className="w-4 h-4 fill-current text-[#0d9488] text-teal-100" />
                {matching.infoTitle || 'Clinician Tip'}
              </h5>
              <p className="text-xs text-[#3d4947] leading-relaxed">
                {matching.infoDetail || 'Consult doctor instructions.'}
              </p>
              <button 
                onClick={() => setSelectedTaskInfo(null)}
                className="absolute top-2 right-2 text-zinc-400 hover:text-[#171d1c] text-xs font-bold font-mono px-1"
              >
                ×
              </button>
            </div>
          );
        })()}

      </div>

      {/* Floating Action Button (Capture) */}
      <button 
        onClick={onLaunchCamera}
        className="fixed right-6 bottom-24 bg-[#0d9488] hover:bg-[#0f766e] text-white flex items-center gap-2 px-5 py-4 rounded-full shadow-lg shadow-teal-900/10 active:scale-95 duration-150 transition-all z-40"
      >
        <Camera className="w-5 h-5 fill-current" />
        <span className="font-bold text-xs tracking-wider uppercase">Capture</span>
      </button>

    </div>
  );
}
