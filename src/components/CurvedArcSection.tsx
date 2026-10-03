import React from 'react';
import { EyeOff, Shield, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

interface CurvedArcSectionProps {
  onEnterConsole: () => void;
}

export const CurvedArcSection: React.FC<CurvedArcSectionProps> = ({ onEnterConsole }) => {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 select-none">
      
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#5632F5]/10 border border-[#5632F5]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D580FA] animate-pulse"></span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#CFC6F0]">
            ARCHITECTURE GUIDE
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-normal text-[#ECEAF5] tracking-[-0.03em] max-w-2xl mx-auto leading-[1.15]">
          Transforming privacy with{' '}
          <span className="font-editorial italic font-normal text-[#D580FA] text-[1.12em]">
            zero-knowledge
          </span>{' '}
          architecture
        </h2>

        <p className="text-sm sm:text-base text-[#9C99B0] max-w-lg mx-auto font-normal leading-relaxed">
          Step by step, see how mathematical zero-knowledge proofs insulate your financial sovereignty from public chain surveillance.
        </p>
      </div>

      {/* ── Desktop & Tablet Curved Arc Layout ──────────────────────── */}
      <div className="relative min-h-[580px] max-w-4xl mx-auto">
        
        {/* SVG Curved Arc Spine (Desktop only) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[240px] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 540" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="arcGlow" x1="180" y1="40" x2="180" y2="500" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D580FA" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#7738FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#5632F5" stopOpacity="0.8" />
              </linearGradient>

              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
            </defs>

            {/* 1. Main Curved Arc Path: Bends outward to the left */}
            <path
              d="M 170 65 C 20 180, 20 360, 170 475"
              stroke="url(#arcGlow)"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <path
              d="M 170 65 C 20 180, 20 360, 170 475"
              stroke="url(#arcGlow)"
              strokeWidth="1.5"
            />

            {/* 2. Horizontal Connector Branch Lines leading to cards */}
            <line x1="170" y1="65" x2="235" y2="65" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="58" y1="270" x2="235" y2="270" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="170" y1="475" x2="235" y2="475" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* 3. Glowing Connector Nodes */}
            {/* Node 1 */}
            <circle cx="170" cy="65" r="8" fill="#D580FA" opacity="0.3" filter="url(#nodeGlow)" />
            <circle cx="170" cy="65" r="4.5" fill="#D580FA" />
            <circle cx="170" cy="65" r="2" fill="#FFFFFF" />

            {/* Node 2 */}
            <circle cx="58" cy="270" r="10" fill="#7738FF" opacity="0.4" filter="url(#nodeGlow)" />
            <circle cx="58" cy="270" r="5" fill="#A16ADE" />
            <circle cx="58" cy="270" r="2" fill="#FFFFFF" />

            {/* Node 3 */}
            <circle cx="170" cy="475" r="8" fill="#5632F5" opacity="0.3" filter="url(#nodeGlow)" />
            <circle cx="170" cy="475" r="4.5" fill="#7738FF" />
            <circle cx="170" cy="475" r="2" fill="#FFFFFF" />
          </svg>
        </div>

        {/* ── Cards Stack ───────────────────────────────────────────── */}
        <div className="space-y-12 lg:space-y-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[190px] flex flex-col justify-between">
          
          {/* ── Card 01 ────────────────────────────────────────────── */}
          <div className="relative group">
            {/* Left Number Badge on Desktop */}
            <div className="hidden lg:flex absolute -left-[140px] top-6 items-center space-x-2 text-xs font-mono font-bold text-[#D580FA]">
              <span className="text-[13px] tracking-wider">01</span>
            </div>

            {/* The Signature Card Container */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.35)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
              
              {/* Top Gradient Sheen (Signature reference effect) */}
              <div 
                className="absolute inset-x-0 top-0 h-[70px] pointer-events-none opacity-80"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.35) 0%, rgba(119, 56, 255, 0.12) 60%, transparent 100%)',
                  mixBlendMode: 'plus-lighter',
                }}
              />
              <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#D580FA]/60 to-transparent" />

              <div className="relative z-10 p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="lg:hidden text-xs font-mono font-bold text-[#D580FA] bg-[#5632F5]/20 px-2 py-0.5 rounded-full border border-[#5632F5]/30">
                      01
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#ECEAF5]">
                      Sever Surveillance Exposure
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                    <EyeOff className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                  Intercept transparent exchange withdrawals (<code className="text-[#D580FA] font-mono text-xs">t1...</code>) before your address history and wallet balance can be permanently indexed by blockchain surveillance analytics.
                </p>
              </div>
            </div>
          </div>

          {/* ── Card 02 ────────────────────────────────────────────── */}
          <div className="relative group">
            {/* Left Number Badge on Desktop */}
            <div className="hidden lg:flex absolute -left-[240px] top-6 items-center space-x-2 text-xs font-mono font-bold text-[#A16ADE]">
              <span className="text-[13px] tracking-wider">02</span>
            </div>

            {/* The Signature Card Container */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.35)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
              
              {/* Top Gradient Sheen */}
              <div 
                className="absolute inset-x-0 top-0 h-[70px] pointer-events-none opacity-80"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.35) 0%, rgba(119, 56, 255, 0.12) 60%, transparent 100%)',
                  mixBlendMode: 'plus-lighter',
                }}
              />
              <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#D580FA]/60 to-transparent" />

              <div className="relative z-10 p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="lg:hidden text-xs font-mono font-bold text-[#A16ADE] bg-[#5632F5]/20 px-2 py-0.5 rounded-full border border-[#5632F5]/30">
                      02
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#ECEAF5]">
                      Compile Halo 2 Zero-Knowledge Proofs
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                  Zero trusted setup. Convert transparent UTXOs into cryptographic commitments inside the Orchard shielded pool. Balance amounts and sender keys vanish from public visibility.
                </p>
              </div>
            </div>
          </div>

          {/* ── Card 03 ────────────────────────────────────────────── */}
          <div className="relative group">
            {/* Left Number Badge on Desktop */}
            <div className="hidden lg:flex absolute -left-[140px] top-6 items-center space-x-2 text-xs font-mono font-bold text-[#7738FF]">
              <span className="text-[13px] tracking-wider">03</span>
            </div>

            {/* The Signature Card Container */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.35)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
              
              {/* Top Gradient Sheen */}
              <div 
                className="absolute inset-x-0 top-0 h-[70px] pointer-events-none opacity-80"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.35) 0%, rgba(119, 56, 255, 0.12) 60%, transparent 100%)',
                  mixBlendMode: 'plus-lighter',
                }}
              />
              <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#D580FA]/60 to-transparent" />

              <div className="relative z-10 p-6 sm:p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="lg:hidden text-xs font-mono font-bold text-[#7738FF] bg-[#5632F5]/20 px-2 py-0.5 rounded-full border border-[#5632F5]/30">
                      03
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#ECEAF5]">
                      Transmit Encrypted Shielded Notes
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                  Transmit private z-to-z transactions using ZIP-316 Unified Addresses (<code className="text-[#D580FA] font-mono text-xs">u1...</code>) with 512-byte encrypted memos. No observer can link the recipient to the transaction.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
