/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { foodmanduMenu } from '../mockData';
import { ShoppingCart, Check, ChevronLeft, Plus, Minus, CheckCircle2, MapPin, Sparkles, X, Heart, ShieldAlert } from 'lucide-react';

interface ScreenFoodmanduDetailProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

export default function ScreenFoodmanduDetail({ onBack, onNavigate }: ScreenFoodmanduDetailProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'm1': 1,
    'm2': 1,
  });
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const increment = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  };

  const totalItemCount: number = (Object.values(quantities) as number[]).reduce((acc: number, q: number) => acc + q, 0);
  const totalCost: number = foodmanduMenu.reduce((acc: number, meal) => {
    const q = quantities[meal.id] || 0;
    return acc + (meal.price * q);
  }, 0);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCheckoutModal(false);
      setOrderPlaced(false);
      setQuantities({ 'm1': 0, 'm2': 0 });
    }, 2800);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-32">
        
        {/* Banner Plugin Branding */}
        <section className="relative h-44 rounded-2xl overflow-hidden flex items-end p-5 shadow-inner">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600" 
              alt="Foodmandu Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
          </div>
          <div className="relative z-10 space-y-1">
            <div className="inline-flex bg-[#0d9488] text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold tracking-widest uppercase">
              OFFICIAL PARTNER
            </div>
            <h2 className="text-white text-lg font-black tracking-tight leading-tight">Foodmandu Healthy</h2>
            <p className="text-white/80 text-[11px]">Nepali precision nutrition delivered locally.</p>
          </div>
        </section>

        {/* Sync status prescription check row */}
        <section className="bg-teal-50 rounded-xl p-4 flex flex-col gap-3 border border-teal-100 shadow-sm">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-[#0d9488] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#171d1c]">Clinician Filter Active</h4>
              <p className="text-xs text-[#3d4947]">
                Personalized menu low-glycemic filter synchronized with <span className="font-extrabold text-[#0d9488]">Dr. Adhikari</span>.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-white px-2.5 py-1 text-[10px] font-bold rounded-full text-[#1c1d1d] border border-slate-100">
              Low Glycemic
            </span>
            <span className="bg-white px-2.5 py-1 text-[10px] font-bold rounded-full text-indigo-700 border border-indigo-250">
              Checklist Sync
            </span>
          </div>
        </section>

        {/* Food Menu bento list */}
        <section className="space-y-4">
          <h3 className="font-black text-md text-[#171d1c] px-0.5">Doctor-Prescribed Menu</h3>
          
          <div className="space-y-4">
            {foodmanduMenu.map(meal => {
              const currentQty = quantities[meal.id] || 0;

              return (
                <article 
                  key={meal.id}
                  className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col gap-4 overflow-hidden"
                >
                  <div className="h-44 rounded-xl overflow-hidden relative">
                    <img 
                      src={meal.imageUrl} 
                      alt={meal.imageAlt} 
                      className="w-full h-full object-cover"
                    />
                    {meal.isNepaliSpecialty && (
                      <span className="absolute top-3 left-3 bg-zinc-900/85 backdrop-blur text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                        NEPALI SPECIALTIES
                      </span>
                    )}

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] font-bold text-[#171d1c]">GI: Rating Green</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-black text-sm text-[#171d1c]">{meal.name}</h4>
                    <p className="text-[#3c475a] text-xs leading-relaxed">{meal.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-semibold">{meal.calories}</span>
                      <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-semibold">{meal.protein}</span>
                      <span className="bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded text-[10px] font-semibold">{meal.fiber}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#dee4e1]/40">
                    <span className="font-black text-sm text-[#0d9488]">Rs. {meal.price}</span>
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center bg-[#eaefed] rounded-full p-0.5">
                      <button 
                        onClick={() => decrement(meal.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#171d1c] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-[#1c1d1d]">
                        {currentQty}
                      </span>
                      <button 
                        onClick={() => increment(meal.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white text-[#171d1c] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Local Raw Items & Subscriptions */}
        <section className="grid grid-cols-1 gap-3">
          <div className="bg-[#bcc7de]/30 rounded-xl p-4 border border-[#bcc7de] space-y-3">
            <h4 className="font-extrabold text-xs text-[#3c475a] uppercase tracking-wider">Local Raw Ingredients</h4>
            <p className="text-xs text-[#3c475a] leading-relaxed">
              Order mountain-sourced organic rayo ko saag or premium high-altitude buckwheat direct to cook yourself.
            </p>
            <button className="w-full py-2.5 bg-white text-[#3c475a] border border-zinc-200 rounded-xl font-bold text-xs uppercase hover:bg-neutral-50/50">
              Browse Local Pantry
            </button>
          </div>

          <div className="bg-teal-50 rounded-xl p-4 border border-teal-100 space-y-3">
            <h4 className="font-extrabold text-xs text-[#5b6760] uppercase tracking-wider">Weekly Meal Plan</h4>
            <p className="text-xs text-[#5b6760] leading-relaxed">
              Let your physician’s checklists automatically populate your Kathmandu clinical lunch schedules.
            </p>
            <button className="w-full py-2.5 bg-slate-700 text-white rounded-xl font-bold text-xs uppercase hover:bg-slate-600 transition-colors">
              Subscribe via Foodmandu
            </button>
          </div>
        </section>

      </div>

      {/* Floating Cart FAB */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-20 left-0 right-0 p-4 z-40">
          <button 
            onClick={() => setCheckoutModal(true)}
            className="bg-[#0d9488] hover:bg-[#0f766e] w-full max-w-md mx-auto text-white h-14 rounded-full flex items-center justify-between px-6 shadow-xl shadow-teal-950/20 active:scale-95 duration-100 transition-all font-black text-xs"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 fill-current" />
              <span>Checkout Order ({totalItemCount})</span>
            </div>
            <span className="bg-[#0f766e] px-3 py-1.5 rounded-full border border-teal-500/20 font-mono text-xs">
              Rs. {totalCost}
            </span>
          </button>
        </div>
      )}

      {/* Checkout details pop-up overlay */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-5 border border-slate-100 relative shadow-2xl">
            
            {orderPlaced ? (
              <div className="py-8 text-center space-y-4 animate-scaleUp">
                <div className="w-16 h-16 bg-teal-50 text-[#0d9488] border border-teal-200 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-lg text-[#171d1c]">P2P Link Initiated</h4>
                  <p className="text-xs text-[#3d4947] leading-relaxed max-w-xs mx-auto">
                    Your Low-Glycemic menu has been verified & broadcasted. Foodmandu is prepping your delivery.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setCheckoutModal(false)}
                  className="absolute top-3 right-3 text-zinc-400 hover:text-[#171d1c]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <h4 className="font-black text-md text-[#171d1c]">Verify Receipt details</h4>
                  <p className="text-xs text-[#3d4947] leading-relaxed">
                    Review your doctor-curated meals prior to dispatching keys.
                  </p>
                </div>

                <div className="space-y-2 border-y border-[#dee4e1]/40 py-3">
                  {foodmanduMenu.map(meal => {
                    const qty = quantities[meal.id] || 0;
                    if (qty <= 0) return null;
                    return (
                      <div key={meal.id} className="flex justify-between text-xs">
                        <span className="font-bold text-[#171d1c]">
                          {qty}x {meal.name}
                        </span>
                        <span className="font-mono text-zinc-600">Rs. {meal.price * qty}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Logistics */}
                <div className="flex gap-2 text-xs text-[#3d4947] leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#0d9488] flex-shrink-0 mt-0.5" />
                  <span>
                    Lazimpat Area, Nord Enclave Road, <br/>
                    Kathmandu, Nepal (P2P Shared location hex)
                  </span>
                </div>

                {/* Cost */}
                <div className="flex justify-between items-center bg-[#f5faf8] p-3 rounded-xl text-xs font-extrabold border border-[#eaefed]">
                  <span>Total cost including vat</span>
                  <span className="font-mono text-[#0d9488]">Rs. {totalCost}</span>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow transition-colors"
                >
                  Secure Dispatch
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
