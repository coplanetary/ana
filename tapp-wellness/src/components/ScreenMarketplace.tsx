/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { marketplacePlugins, imageFallback } from '../mockData';
import { Search, ChevronRight, Sparkles, Star, CheckCircle, Info } from 'lucide-react';

interface ScreenMarketplaceProps {
  onNavigate: (screen: any) => void;
}

export default function ScreenMarketplace({ onNavigate }: ScreenMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'clinics' | 'coaches' | 'devices' | 'nutrition' | 'all'>('all');

  const filteredPlugins = marketplacePlugins.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* Search Input Bar */}
        <section className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-zinc-400" />
          <input 
            type="text"
            placeholder="Search local clinics, coaches, or labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#eaefed] border-none rounded-lg py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#0d9488]/30 transition-all text-[#171d1c]"
          />
        </section>

        {/* Categories filters scroll */}
        <section className="space-y-3">
          <h4 className="font-extrabold text-[#3d4947] text-[10px] tracking-wider uppercase px-0.5">Browse Categories</h4>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all text-xs font-bold leading-tight flex-shrink-0 ${
                selectedCategory === 'all' ? 'bg-[#0d9488] text-white' : 'bg-white text-[#3d4947] border border-zinc-200'
              }`}
            >
              <span>All Hubs</span>
            </button>

            <button 
              onClick={() => setSelectedCategory('clinics')}
              className={`px-4 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all text-xs font-bold leading-tight flex-shrink-0 ${
                selectedCategory === 'clinics' ? 'bg-[#0d9488] text-white' : 'bg-white text-[#3d4947] border border-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1">🩺 Clinics</span>
            </button>

            <button 
              onClick={() => setSelectedCategory('coaches')}
              className={`px-4 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all text-xs font-bold leading-tight flex-shrink-0 ${
                selectedCategory === 'coaches' ? 'bg-[#0d9488] text-white' : 'bg-white text-[#3d4947] border border-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1">🏋️ Coaches</span>
            </button>

            <button 
              onClick={() => setSelectedCategory('devices')}
              className={`px-4 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all text-xs font-bold leading-tight flex-shrink-0 ${
                selectedCategory === 'devices' ? 'bg-[#0d9488] text-white' : 'bg-white text-[#3d4947] border border-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1">⌚ Devices</span>
            </button>

            <button 
              onClick={() => setSelectedCategory('nutrition')}
              className={`px-4 py-2.5 rounded-lg flex flex-col items-center justify-center transition-all text-xs font-bold leading-tight flex-shrink-0 ${
                selectedCategory === 'nutrition' ? 'bg-[#0d9488] text-white' : 'bg-white text-[#3d4947] border border-zinc-200'
              }`}
            >
              <span className="flex items-center gap-1">🥗 Nutrition</span>
            </button>

          </div>
        </section>

        {/* Plugins Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Nepal Partner Network</h3>
            <span className="text-xs text-[#3d4947] font-semibold">{filteredPlugins.length} services matches</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredPlugins.map(plugin => (
              <div 
                key={plugin.id}
                className="bg-white rounded-lg p-4 shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                {/* Visual placeholder with tag */}
                <div className="h-44 rounded-lg overflow-hidden relative mb-4">
                  <img
                    src={plugin.imageUrl}
                    alt={plugin.imageAlt}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = imageFallback; }}
                    className="w-full h-full object-cover"
                  />
                  {plugin.isTrending && (
                    <span className="absolute top-3 right-3 bg-[#0d9488] text-white px-2.5 py-0.5 rounded-lg text-[9px] font-bold tracking-wider uppercase">
                      TRENDING
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[#171d1c] line-clamp-1">{plugin.name}</h4>
                  <p className="text-[#3c475a] text-[11px] font-semibold">{plugin.provider}</p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                  <span className="font-black text-xs text-[#0d9488]">{plugin.priceTag}</span>
                  <button 
                    onClick={() => {
                      if (plugin.provider === 'Foodmandu') {
                        onNavigate('foodmandu-detail');
                      } else {
                        onNavigate('prescriptions');
                      }
                    }}
                    className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all active:scale-95"
                  >
                    View Hub
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Empathetic Precision Banner */}
        <section className="bg-teal-50 border border-teal-150 text-slate-800 rounded-lg p-5 relative overflow-hidden space-y-4 shadow-xs">
          <div className="space-y-2 z-10 relative">
            <div className="inline-flex items-center gap-1 bg-teal-100 text-[#0d9488] px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Sovereign Nepal Ecosystem
            </div>
            <h3 className="text-base font-black text-slate-950 leading-tight">Empathetic Precision in Kathmandu</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
              TApp coordinates locally with clinicians, medical hubs (Cura Health), and dietary platforms (Foodmandu) under zero-trust privacy switches to serve healthy chronic diabetic management.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('doctor-profile')}
            className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold px-4 py-2.5 rounded-lg relative z-10 shadow-xs"
          >
            Learn More
          </button>
        </section>

      </div>
    </div>
  );
}
