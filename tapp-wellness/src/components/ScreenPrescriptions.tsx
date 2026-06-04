/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, ShoppingBag, Droplet, Check, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface ScreenPrescriptionsProps {
  onNavigate: (screen: any) => void;
  doctorName?: string;
  doctorAvatarUrl?: string;
}

export default function ScreenPrescriptions({ onNavigate, doctorName = "Dr. Adhikari", doctorAvatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBXYKfVAGVeRAdQI7dZ4DZUf9HK-sYB-xemnxAQNTOq7WcSJfYiNbXwAWpysdqhb8DUn9hEM7XNg-WDJUXvNRKEvBi4989CVfhVdGlcyrapRv7s-Q__Sn7jE02IRGKOLuGh7Pu1HAcPKSllW89EI33LAr56diweOd2vN363ZkOtHbilBMHqYs7I7QoHlUOQyS3PKks303VFDQOk8sLUkaiGQxCxxat2CPBDai9__S32qgiBV7o4_smFDff-sgz5uz49rRVFafkoQMo" }: ScreenPrescriptionsProps) {
  const [bookedStatus, setBookedStatus] = useState<'idle' | 'booked'>('idle');
  const [refillStatus, setRefillStatus] = useState<'idle' | 'ordered'>('idle');

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* Clinician Prescriber Header */}
        <section className="bg-white p-4 rounded-3xl border border-[#eaefed] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#bcc9c6]">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" 
                alt={doctorName} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[10px] text-[#3d4947] font-extrabold uppercase tracking-widest">Active Practitioner</p>
              <h4 className="font-extrabold text-sm text-[#00685f]">{doctorName}</h4>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('doctor-profile')}
            className="p-2 rounded-full hover:bg-slate-100 text-[#00685f]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* Title Block */}
        <section className="space-y-1 px-1">
          <h2 className="text-xl font-black text-[#171d1c] tracking-tight">Pending Actions</h2>
          <p className="text-xs text-[#3d4947] leading-relaxed">
            Your clinical specialist has prescribed updates to your Type 2 Diabetes treatment regimen. Complete the tasks below to sync with Cura or Foodmandu.
          </p>
        </section>

        {/* Prescription Task Bento list */}
        <div className="space-y-4">
          
          {/* Card 1: Lab Test diagnostics */}
          <div className="bg-white p-5 rounded-[24px] border border-[#eaefed] shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685f] flex-shrink-0">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-teal-700 tracking-wider uppercase">Diagnostic Check</span>
                <h4 className="font-bold text-sm text-[#171d1c]">HbA1c & Lipid Panel</h4>
              </div>
            </div>
            <p className="text-xs text-[#3d4947] leading-relaxed">
              Required for your quarterly review. Fasting for 8 - 10 hours is strongly advised prior to phlebotomy collection. Cura phlebotomists will visit your home in Kathmandu.
            </p>
            
            {bookedStatus === 'booked' ? (
              <div className="w-full py-4 bg-teal-50 border border-teal-100 text-[#00685f] rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00685f] fill-current text-white" />
                Cura Phlebotomist Dispatched
              </div>
            ) : (
              <button 
                onClick={() => {
                  setBookedStatus('booked');
                }}
                className="w-full py-4 bg-[#00685f] hover:bg-[#008378] text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-teal-900/10"
              >
                Book via Cura Health Setup
              </button>
            )}
          </div>

          {/* Card 2: Refill Medication */}
          <div className="bg-white p-5 rounded-[24px] border border-[#eaefed] shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00685f] flex-shrink-0">
                <Droplet className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-teal-700 tracking-wider uppercase">Prescribed Refill</span>
                <h4 className="font-bold text-sm text-[#171d1c]">Insulin Glargine Refill</h4>
              </div>
            </div>
            <p className="text-xs text-[#3d4947] leading-relaxed">
              Dosage instructions: 12 units at bedtime. Existing insulin script expires in 4 days. Instant lock-sync with partner Jeevee Pharmacy Kathmandu.
            </p>

            {refillStatus === 'ordered' ? (
              <div className="w-full py-4 bg-teal-50 border border-teal-100 text-[#00685f] rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                Prescription Ordered via Jeevee
              </div>
            ) : (
              <button 
                onClick={() => setRefillStatus('ordered')}
                className="w-full py-4 bg-[#55615a] hover:bg-[#3e4943] text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-zinc-600/10"
              >
                Order via Jeevee Pharmacy
              </button>
            )}
          </div>

          {/* Card 3: Lifestyle food menu */}
          <div className="bg-white p-5 rounded-[24px] border border-[#eaefed] shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d9e6dd] flex items-center justify-center text-[#55615a] flex-shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-extrabold text-zinc-600 tracking-wider uppercase">Lifestyle Goal</span>
                <h4 className="font-bold text-sm text-[#171d1c]">Dietary: Low Glycemic Meal</h4>
              </div>
            </div>
            <p className="text-xs text-[#3d4947] leading-relaxed">
              Aim for slow-release carbs and natural fibrous proteins to stabilize sugar peaks. Order doctor-approved traditional millet options directly linked to Foodmandu.
            </p>
            <button 
              onClick={() => onNavigate('foodmandu-detail')}
              className="w-full py-4 border-2 border-[#00685f] text-[#00685f] bg-transparent hover:bg-[#00685f]/5 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Find Foodmandu Options
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
