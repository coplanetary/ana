/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { localConnections } from '../mockData';
import { ShieldAlert, Shield, ShieldCheck, Lock, Eye, Trash2, HelpCircle, CheckCircle2, ChevronRight, Share2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function ScreenPrivacy() {
  const [connections, setConnections] = useState(localConnections);
  const [deletionReceiptModal, setDeletionReceiptModal] = useState(false);
  const [auditLogActive, setAuditLogActive] = useState(false);

  const toggleConnection = (id: string) => {
    setConnections(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, active: !c.active };
      }
      return c;
    }));
  };

  const activeCount = connections.filter(c => c.active).length;

  return (
    <div className="flex-1 flex flex-col bg-[#f5faf8] min-h-screen text-[#171d1c]">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-24">
        
        {/* State Pill and Title */}
        <section className="space-y-2">
          <h2 className="text-2xl font-black text-[#171d1c] tracking-tight">
            My Data, My Control
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#131e19] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0d9488]" />
            Encryption Key: <span className="font-extrabold text-[#0d9488]">Active</span>
          </div>
        </section>

        {/* Bento Grid - Security Overview */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Encryption card */}
          <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div className="p-2 bg-teal-50 text-[#0d9488] border border-teal-100 rounded-lg">
                <Lock className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[9px] font-extrabold text-teal-700 tracking-widest">P2P SECURE</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#171d1c] mb-1">Local Vault</h4>
              <p className="text-[10px] text-[#3d4947] leading-relaxed">
                Biometrics never leave this device without explicit cryptographic handshake keys.
              </p>
            </div>
          </div>

          {/* Protection Strength Gauge */}
          <div className="p-4 bg-slate-700 text-white rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="mb-4">
              <Shield className="w-8 h-8 fill-current text-[#b8c6dc]" />
            </div>
            <div className="z-10">
              <h4 className="font-bold text-sm text-white mb-1">Sovereignty</h4>
              <div className="w-full bg-white/20 h-2 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-white h-full w-[92%] rounded-full" />
              </div>
              <p className="text-[10px] text-[#edf2f0] font-semibold mt-1">92% Protection Strength</p>
            </div>
            {/* Atmospheric design blob */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          </div>

        </div>

        {/* Sharing switches list */}
        <section className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-[#171d1c]">Active Connections</h3>
            <span className="text-xs font-semibold text-[#0d9488]">{activeCount} Managed</span>
          </div>

          <div className="space-y-3">
            {connections.map((c) => (
              <div 
                key={c.id}
                className={`p-4 rounded-xl bg-white border border-slate-100 flex flex-col gap-3 shadow-sm ${
                  !c.active ? 'opacity-65' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0d9488]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#171d1c]">{c.name}</h4>
                      <p className="text-[10px] text-[#3d4947] font-semibold flex items-center gap-1 mt-0.5">
                        {c.summaryOnly && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        {c.lastSync}
                      </p>
                    </div>
                  </div>

                  {/* Switch toggle control */}
                  <button 
                    onClick={() => toggleConnection(c.id)}
                    className="p-1 rounded-full text-zinc-400 hover:text-[#0d9488]"
                  >
                    {c.active ? (
                      <ToggleRight className="w-10 h-10 text-[#0d9488]" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-zinc-300" />
                    )}
                  </button>
                </div>

                {c.summaryOnly && (
                  <div className="pt-3 border-t border-[#dee4e1]/40 flex justify-end">
                    <button className="text-[#0d9488] text-xs font-bold flex items-center gap-0.5 hover:underline">
                      Edit Granular Permissions <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cryptographic Receipts Action Panel */}
        <section className="space-y-3 flex flex-col items-center">
          <button 
            onClick={() => setDeletionReceiptModal(true)}
            className="w-full py-4 rounded-xl border-2 border-[#ba1a1a] text-[#ba1a1a] hover:bg-rose-50 font-bold tracking-wide text-xs uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Request Deletion Receipt
          </button>
          <p className="text-[10px] text-[#3d4947] text-center max-w-[280px] leading-relaxed">
            Forces all downstream clinics/partners to purge cached diagnostics and provide cryptographic proof of deletion.
          </p>
        </section>

        {/* Cryptographer Technical Fabric Explanation */}
        <footer className="p-5 rounded-xl bg-teal-50 border border-teal-100 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[#0d9488]">
            <Share2 className="w-4 h-4" />
            <h5 className="font-extrabold text-[10px] tracking-wider uppercase">The P2P Fabric</h5>
          </div>
          <p className="text-[11px] text-[#3d4947] leading-relaxed">
            TApp operates on an offline-first architecture. Your data persists strictly inside your local secure sandbox. When sharing is authorized, a temporal Peer-to-Peer encrypted tunnel initiates directly to the remote clinician node. No centralized cloud hub retains or stores your unencrypted medical values.
          </p>
        </footer>

      </div>

      {/* Cryptographic deletion receipt confirmation popup window */}
      {deletionReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4 border border-slate-100 shadow-xl">
            <div className="w-12 h-12 bg-rose-100 text-[#ba1a1a] rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6 fill-current" />
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-black text-md text-[#171d1c]">Receipt Dispatched</h4>
              <p className="text-xs text-[#3d4947] leading-relaxed">
                TApp security enclaves have handshake-dispatched deletion receipts to Kathmandu Endo Clinic.
              </p>
            </div>

            <div className="p-3 bg-[#f5faf8] border border-dashed border-[#eaefed] rounded-xl font-mono text-[9px] text-zinc-500 overflow-x-auto select-all max-h-24">
              SECURE_HANDSHAKE: [0x5f9a_de7f] <br/>
              RECEIPT_ID: TAPP-KTM-8941 <br/>
              PURGE_CONFIRMED: TRUE <br/>
              HASH: 5e6dc7eaef61ab3bc01
            </div>

            <button 
              onClick={() => setDeletionReceiptModal(false)}
              className="w-full py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Secure Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
