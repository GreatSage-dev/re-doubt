import React, { useEffect } from 'react';
import { Award, CheckCircle2, Shield, Share2, X, ExternalLink, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SimulatorState } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: SimulatorState;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, state }) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7738FF', '#D580FA', '#EBDEFA', '#ffffff']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const certId = 'ZEC-ORCHARD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const tweetText = encodeURIComponent(
    `I just completed the Zero-to-Shielded Flight Simulator on SHADOW-RUN! 🛡️⚡\n\nTested wallet vaulting, CEX transparent ingress, and Orchard zero-knowledge shielding with zero risk before touching real funds.\n\nReady for Zcash privacy. cc @zksnarks_ #ZECATHON`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0E0C1C] border border-[#7738FF]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(86,50,245,0.5)] text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#5632F5]/20 border border-[#7738FF]/40 flex items-center justify-center text-[#D580FA] shadow-[0_0_20px_rgba(119,56,255,0.4)]">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#5632F5]/20 text-[#EBDEFA] border border-[#5632F5]/40">
            Zcash Zero-Knowledge Flight School
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-2 tracking-tight">
            CERTIFICATE OF SHIELDED MASTERY
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Certification ID: <span className="text-[#D580FA] font-bold">{certId}</span>
          </p>
        </div>

        {/* Core Validated Skills */}
        <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 text-left space-y-2 text-xs">
          <div className="text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-1.5 uppercase">
            Validated Flight Competencies
          </div>
          <div className="space-y-1.5 text-zinc-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>BIP-39 Cryptographic Seed Generation & Vaulting</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>CEX Transparent Address Hygiene (t1...)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Halo 2 Orchard Zero-Knowledge Proof Compilation</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ZIP-302 Encrypted Memo Payload Construction</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>ZIP-316 Unified Address Receiver Deconstruction</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2.5">
          <a
            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-[#7738FF]/30"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Flight Certificate on X (@zksnarks_)</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs transition border border-zinc-800"
          >
            Return to Cockpit Simulator
          </button>
        </div>

      </div>
    </div>
  );
};
