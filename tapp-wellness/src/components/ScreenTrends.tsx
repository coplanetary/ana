/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { readingHistory } from '../mockData';
import { Reading } from '../types';
import { Activity, TrendingUp, BarChart2, MessageSquare, Shield, Droplets, ChevronRight, Eye, MoreVertical } from 'lucide-react';

interface ScreenTrendsProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

export default function ScreenTrends({ onBack, onNavigate }: ScreenTrendsProps) {
  const [period, setPeriod] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Custom data points for SVG path depending on period
  const chartData = {
    Daily: [
      { x: 5, y: 140, label: '12 AM' },
      { x: 25, y: 110, label: '6 AM' },
      { x: 45, y: 195, label: '12 PM' },
      { x: 65, y: 145, label: '6 PM' },
      { x: 85, y: 118, label: '9 PM' },
      { x: 95, y: 155, label: 'Now' },
    ],
    Weekly: [
      { x: 5, y: 130, label: 'Mon' },
      { x: 20, y: 145, label: 'Tue' },
      { x: 35, y: 118, label: 'Wed' },
      { x: 50, y: 165, label: 'Thu' },
      { x: 65, y: 110, label: 'Fri' },
      { x: 80, y: 140, label: 'Sat' },
      { x: 95, y: 114, label: 'Sun' },
    ],
    Monthly: [
      { x: 5, y: 120, label: 'Wk 1' },
      { x: 35, y: 150, label: 'Wk 2' },
      { x: 65, y: 112, label: 'Wk 3' },
      { x: 95, y: 125, label: 'Wk 4' },
    ]
  };

  const activePoints = chartData[period];

  // Convert reading value (mg/dL) to Y coordinate in SVG (where 0 is top, 300 is max)
  const valToY = (value: number) => {
    const minVal = 0;
    const maxVal = 300;
    const svgHeight = 220;
    // Inverse scale because SVG coordinates start from 0 at the top
    const relative = (value - minVal) / (maxVal - minVal);
    return Math.max(10, svgHeight - (relative * svgHeight) + 10);
  };

  // Convert x percentage (0 - 100) to actual SVG X coordinate
  const pctToX = (pct: number) => {
    const svgWidth = 320;
    return (pct / 100) * svgWidth;
  };

  // Create path description line
  const buildSvgPath = () => {
    if (activePoints.length === 0) return '';
    let d = `M ${pctToX(activePoints[0].x)} ${valToY(activePoints[0].y)}`;
    for (let i = 1; i < activePoints.length; i++) {
      const p = activePoints[i];
      const prev = activePoints[i - 1];
      // Create a smooth cubic curve between points
      const cpX1 = pctToX(prev.x + (p.x - prev.x) / 2);
      const cpY1 = valToY(prev.y);
      const cpX2 = pctToX(prev.x + (p.x - prev.x) / 2);
      const cpY2 = valToY(p.y);
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pctToX(p.x)} ${valToY(p.y)}`;
    }
    return d;
  };

  const linePath = buildSvgPath();
  const areaPath = linePath ? `${linePath} L ${pctToX(activePoints[activePoints.length - 1].x)} 230 L ${pctToX(activePoints[0].x)} 230 Z` : '';

  // Standard Target Range: 70mg/dL to 180mg/dL
  const targetRangeMinBgY = valToY(180);
  const targetRangeMaxBgY = valToY(70);
  const targetRangeHeight = targetRangeMaxBgY - targetRangeMinBgY;

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* Period Selector */}
        <section className="flex bg-[#eaefed] rounded-xl p-1 w-full max-w-md mx-auto">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPeriod(p);
                setHoveredIndex(null);
              }}
              className={`flex-grow py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                period === p 
                ? 'bg-white text-[#0d9488] shadow-sm' 
                : 'text-[#3d4947] hover:bg-[#e4e9e7]'
              }`}
            >
              {p}
            </button>
          ))}
        </section>

        {/* Bento Grid Layout */}
        <div className="space-y-4">
          
          {/* Main Chart Card */}
          <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 overflow-hidden flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-[#171d1c]">Glucose Overview</h3>
                <p className="text-[#3d4947] text-xs">
                  {period === 'Daily' ? 'Current period: Today, Oct 24' : period === 'Weekly' ? 'Current period: This Week' : 'Current period: Past 30 Days'}
                </p>
              </div>
              <button className="p-1 rounded-full hover:bg-slate-100 text-[#3d4947]">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Custom SVG Chart */}
            <div className="relative h-64 w-full mt-2 select-none">
              {/* Y Axis Guide indicators on right */}
              <div className="absolute inset-y-0 right-0 flex flex-col justify-between text-[10px] text-zinc-400 font-mono text-right pointer-events-none pr-1">
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>

              {/* Target Range Shading (70 to 180 mg/dL) */}
              <div 
                className="absolute left-0 right-8 bg-[#0d9488]/5 border-y border-dashed border-[#0d9488]/15 flex items-end px-3"
                style={{
                  top: `${targetRangeMinBgY}px`,
                  height: `${targetRangeHeight}px`
                }}
              >
                <span className="text-[9px] font-bold text-[#0d9488]/30 uppercase tracking-widest pb-1">Target Range</span>
              </div>

              {/* SVG Area */}
              <svg className="w-full h-[240px] absolute inset-x-0 top-0 overflow-visible" viewBox="0 0 320 240">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0d9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path d={areaPath} fill="url(#chartFill)" />

                {/* Spline line */}
                <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />

                {/* Dynamic Data Points */}
                {activePoints.map((p, idx) => {
                  const xCoord = pctToX(p.x);
                  const yCoord = valToY(p.y);
                  const isHovered = hoveredIndex === idx;

                  return (
                    <g key={idx} className="cursor-pointer" 
                       onMouseEnter={() => setHoveredIndex(idx)}
                       onMouseLeave={() => setHoveredIndex(null)}>
                      {isHovered && (
                        <>
                          {/* Anchor vertical dashed trace line */}
                          <line x1={xCoord} y1={yCoord} x2={xCoord} y2={230} stroke="#0d9488" strokeWidth="1" strokeDasharray="3,3" />
                          <circle cx={xCoord} cy={yCoord} r="10" fill="#0d9488" fillOpacity="0.15" />
                        </>
                      )}
                      <circle cx={xCoord} cy={yCoord} r={isHovered ? "5" : "4"} fill="#0d9488" stroke="white" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip Overlay */}
              {hoveredIndex !== null && (
                <div 
                  className="absolute z-20 bg-[#2c3130] text-[#edf2f0] py-1.5 px-3 rounded-xl text-xs font-bold shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full transition-all duration-150"
                  style={{
                    left: `${activePoints[hoveredIndex].x}%`,
                    top: `${valToY(activePoints[hoveredIndex].y) - 14}px`
                  }}
                >
                  <div className="text-[10px] text-zinc-300 font-normal leading-tight">
                    {activePoints[hoveredIndex].label}
                  </div>
                  <div className="font-mono">{activePoints[hoveredIndex].y} mg/dL</div>
                </div>
              )}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between px-2 pt-2 border-t border-[#dee4e1] text-[11px] font-semibold text-[#3d4947]">
              {activePoints.map((p, idx) => (
                <span key={idx} className="text-center" style={{ width: `${100 / activePoints.length}%` }}>
                  {p.label}
                </span>
              ))}
            </div>
          </section>

          {/* Time in Range Circular Gauge */}
          <section className="bg-[#0d9488] text-[#f4fffc] rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-white">Time in Range</h3>
              <p className="text-xs opacity-85 mt-0.5">Excellent stability today</p>
            </div>

            {/* Circle Graph */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" fill="transparent" stroke="rgba(255,255,255,0.12)" strokeWidth="11" />
                  <circle 
                    cx="80" 
                    cy="80" 
                    r="70" 
                    fill="transparent" 
                    stroke="white" 
                    strokeWidth="11" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * 82) / 100}
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold tracking-tight text-white">82<span className="text-xl opacity-80">%</span></span>
                  <span className="text-[10px] font-bold tracking-widest uppercase mt-0.5 opacity-80 text-white">IN TARGET</span>
                </div>
              </div>
            </div>

            {/* High/Range/Low Split Info */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center bg-white/10 rounded-xl py-2">
                <span className="text-[9px] uppercase font-bold text-teal-100">High</span>
                <span className="font-bold text-sm text-white">12%</span>
              </div>
              <div className="flex flex-col items-center bg-white/20 rounded-xl py-2">
                <span className="text-[9px] uppercase font-bold text-white">Range</span>
                <span className="font-bold text-sm text-yellow-105">82%</span>
              </div>
              <div className="flex flex-col items-center bg-white/10 rounded-xl py-2">
                <span className="text-[9px] uppercase font-bold text-teal-100">Low</span>
                <span className="font-bold text-sm text-white">6%</span>
              </div>
            </div>

            {/* Subtle design element background glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </section>
        </div>

        {/* Stats Summary Panel */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex flex-col gap-1 shadow-sm">
            <span className="text-[#3d4947] text-[11px] font-medium flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-teal-600" /> Avg Glucose
            </span>
            <div className="flex items-baseline gap-0.5 mt-auto">
              <span className="font-bold text-xl text-[#0d9488]">114</span>
              <span className="text-[9px] text-[#3d4947]">mg/dL</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-100 flex flex-col gap-1 shadow-sm">
            <span className="text-[#3d4947] text-[11px] font-medium flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-teal-600" /> GMI (A1c)
            </span>
            <div className="flex items-baseline gap-0.5 mt-auto">
              <span className="font-bold text-xl text-[#0d9488]">6.2</span>
              <span className="text-[9px] text-[#3d4947]">%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-100 flex flex-col gap-1 shadow-sm">
            <span className="text-[#3d4947] text-[11px] font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" /> Std. Dev
            </span>
            <div className="flex items-baseline gap-0.5 mt-auto">
              <span className="font-bold text-xl text-[#0d9488]">28</span>
              <span className="text-[9px] text-[#3d4947]">mg/dL</span>
            </div>
          </div>
        </section>

        {/* Recent Readings List */}
        <section className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <h3 className="font-bold text-[#171d1c]">Recent Readings</h3>
            <button className="text-[#0d9488] text-xs font-semibold hover:underline" onClick={() => onNavigate('home-dashboard')}>
              View All
            </button>
          </div>

          <div className="space-y-2">
            {readingHistory.map((reading) => (
              <div 
                key={reading.id}
                className="bg-white rounded-xl p-3.5 flex items-center justify-between border border-slate-100 hover:bg-[#f0f5f2] transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    reading.status === 'High' 
                    ? 'bg-rose-100 text-rose-600' 
                    : reading.status === 'Low'
                    ? 'bg-amber-100 text-amber-600' 
                    : 'bg-teal-50 text-[#0d9488] border border-teal-100'
                  }`}>
                    <Droplets className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#171d1c]">{reading.value} {reading.unit}</h4>
                    <p className="text-[#3d4947] text-xs">{reading.timeLabel} • {reading.mealContext}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    reading.status === 'High'
                    ? 'bg-rose-100 text-rose-700'
                    : reading.status === 'Low'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-teal-50 text-teal-700 border border-teal-200'
                  }`}>
                    {reading.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#3d4947] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Insight Card */}
        <section className="bg-white rounded-2xl p-5 border border-slate-100 relative overflow-hidden shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-teal-50 text-[#0d9488] border border-teal-100 px-2.5 py-1 rounded-full mb-2">
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Pro Insight</span>
              </div>
              <h4 className="font-bold text-md text-[#171d1c] mb-1">Steady Trends</h4>
              <p className="text-[#3d4947] text-xs leading-relaxed">
                Your glucose variability has decreased by 14% compared to last week. Maintaining this consistency helps reduce long-term complications and improves daily energy levels.
              </p>
            </div>
            
            {/* Health image */}
            <div className="w-full h-32 rounded-xl overflow-hidden relative shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600" 
                alt="Health Trends Fresh Vegetables" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
