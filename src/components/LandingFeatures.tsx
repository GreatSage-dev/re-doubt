import React from 'react';
import { Shield, EyeOff, Lock, ArrowRight, Zap, CheckCircle2, Sparkles, Terminal, Activity, FileText, Send, Key } from 'lucide-react';

interface LandingFeaturesProps {
  onEnterConsole: () => void;
}

export const LandingFeatures: React.FC<LandingFeaturesProps> = ({ onEnterConsole }) => {
  return (
    <div className="relative z-10 w-full overflow-hidden select-none pb-28 space-y-28">
      
      {/* ─────────────────────────────────────────────────────────────
          1. FOUR GLOSSY METRIC CARDS (Exact match to Reference 2 top)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Stat Card 1 */}
          <div className="relative group overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#110D24]/90 p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:border-[#A16ADE]/40 shadow-[0_16px_36px_-12px_rgba(86,50,245,0.25)]">
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 50% 120%, rgba(161, 106, 222, 0.28) 0%, rgba(86, 50, 245, 0.12) 40%, transparent 75%)',
              }}
            />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#ECEAF5]">
                0 RISK
              </div>
              <div className="text-xs sm:text-[13px] text-[#A69FC6] mt-2 font-normal tracking-wide">
                Deterministic Sandbox
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="relative group overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#110D24]/90 p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:border-[#A16ADE]/40 shadow-[0_16px_36px_-12px_rgba(86,50,245,0.25)]">
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 50% 120%, rgba(161, 106, 222, 0.28) 0%, rgba(86, 50, 245, 0.12) 40%, transparent 75%)',
              }}
            />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#ECEAF5]">
                100% REAL
              </div>
              <div className="text-xs sm:text-[13px] text-[#A69FC6] mt-2 font-normal tracking-wide">
                BIP-39 & ZIP-316 Spec
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="relative group overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#110D24]/90 p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:border-[#A16ADE]/40 shadow-[0_16px_36px_-12px_rgba(86,50,245,0.25)]">
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 50% 120%, rgba(161, 106, 222, 0.28) 0%, rgba(86, 50, 245, 0.12) 40%, transparent 75%)',
              }}
            />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#ECEAF5]">
                27ms
              </div>
              <div className="text-xs sm:text-[13px] text-[#A69FC6] mt-2 font-normal tracking-wide">
                Halo 2 Proof Simulator
              </div>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="relative group overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#110D24]/90 p-6 sm:p-7 backdrop-blur-xl transition duration-300 hover:border-[#A16ADE]/40 shadow-[0_16px_36px_-12px_rgba(86,50,245,0.25)]">
            <div 
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 50% 120%, rgba(161, 106, 222, 0.28) 0%, rgba(86, 50, 245, 0.12) 40%, transparent 75%)',
              }}
            />
            <div className="relative z-10">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#ECEAF5]">
                100% PRIVATE
              </div>
              <div className="text-xs sm:text-[13px] text-[#A69FC6] mt-2 font-normal tracking-wide">
                Orchard Shielded Pool
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. BENTO SECTION: "Privacy Engineered Around Zero Knowledge"
          (Matching "Healthcare Designed Around Patients" in Reference 2)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#5632F5]/10 border border-[#5632F5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D580FA] animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#CFC6F0]">
              PRIVACY PRIMITIVES
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#ECEAF5] tracking-[-0.03em] max-w-2xl mx-auto leading-[1.15]">
            Privacy Engineered Around{' '}
            <span className="font-editorial italic font-normal text-[#D580FA] text-[1.12em]">
              Zero Knowledge
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9C99B0] max-w-lg mx-auto font-normal leading-relaxed">
            How mathematical shield pools insulate every layer of your financial sovereignty from public chain surveillance.
          </p>
        </div>

        {/* Bento Grid: 3 Top Cards + 2 Wide Bottom Cards */}
        <div className="space-y-6">
          
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Public Ledger Exposure (Bar Chart Graphic) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between h-[360px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition group">
              <div 
                className="absolute inset-x-0 top-0 h-[100px] pointer-events-none opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
                }}
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-medium text-[#ECEAF5]">Transparent Ledger Risk</h3>
                <p className="text-xs text-[#9C99B0] leading-relaxed">
                  Public explorers index every transparent balance, transaction graph, and timestamp permanently.
                </p>
              </div>

              {/* Graphic: Glowing Vertical Bar Chart matching Reference 2 */}
              <div className="relative z-10 pt-4 flex flex-col items-center justify-end flex-1">
                <div className="mb-4 px-3 py-1 rounded-full bg-[#5632F5]/20 border border-[#A16ADE]/30 text-[10px] font-mono text-[#EBDEFA]">
                  Explorer Surveillance Trends
                </div>
                <div className="flex items-end justify-center space-x-3 w-full h-32 px-4">
                  {[
                    { h: 'h-14', color: 'from-[#5632F5] to-[#7738FF]' },
                    { h: 'h-20', color: 'from-[#7738FF] to-[#A16ADE]' },
                    { h: 'h-28', color: 'from-[#A16ADE] to-[#D580FA]' },
                    { h: 'h-24', color: 'from-[#D580FA] to-[#EBDEFA]' },
                    { h: 'h-16', color: 'from-[#7738FF] to-[#A16ADE]' },
                    { h: 'h-22', color: 'from-[#5632F5] to-[#7738FF]' }
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group-hover:scale-y-105 transition origin-bottom">
                      <div className={`w-full rounded-t-lg bg-gradient-to-t ${bar.color} ${bar.h} shadow-[0_0_15px_rgba(161,106,222,0.3)]`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Unified Addresses (Orbiting Nodes Graphic) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between h-[360px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition group">
              <div 
                className="absolute inset-x-0 top-0 h-[100px] pointer-events-none opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
                }}
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-medium text-[#ECEAF5]">Unified Addresses (ZIP-316)</h3>
                <p className="text-xs text-[#9C99B0] leading-relaxed">
                  Single <code className="text-[#D580FA] font-mono">u1...</code> address orchestrating Orchard, Sapling & Transparent receivers automatically.
                </p>
              </div>

              {/* Graphic: Orbiting badge nodes connected to center */}
              <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-2">
                <div className="relative w-48 h-32 flex items-center justify-center">
                  {/* Subtle connection arcs */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 128" fill="none">
                    <path d="M 28 34 Q 96 64 96 92" stroke="#7738FF" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                    <path d="M 64 24 Q 96 54 96 92" stroke="#A16ADE" strokeWidth="1" strokeOpacity="0.4" />
                    <path d="M 128 24 Q 96 54 96 92" stroke="#A16ADE" strokeWidth="1" strokeOpacity="0.4" />
                    <path d="M 164 34 Q 96 64 96 92" stroke="#7738FF" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                  </svg>

                  {/* Satellite tags */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#5632F5]/20 border border-[#5632F5]/40 text-[9px] font-mono text-[#CFC6F0]">
                    Orchard
                  </div>
                  <div className="absolute top-0 left-16 px-2 py-0.5 rounded-lg bg-[#7738FF]/20 border border-[#7738FF]/40 text-[9px] font-mono text-[#EBDEFA]">
                    Sapling
                  </div>
                  <div className="absolute top-0 right-16 px-2 py-0.5 rounded-lg bg-[#7738FF]/20 border border-[#7738FF]/40 text-[9px] font-mono text-[#EBDEFA]">
                    Transparent
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-[#5632F5]/20 border border-[#5632F5]/40 text-[9px] font-mono text-[#CFC6F0]">
                    Memo
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7738FF]/40 to-[#0E0C1C] border border-[#D580FA]/50 flex items-center justify-center text-[#EBDEFA] shadow-[0_0_25px_rgba(161,106,222,0.4)]">
                    <Key className="w-5 h-5 text-[#D580FA]" />
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[#CFC6F0] bg-black/40 px-3 py-1 rounded-full border border-white/5">
                  ZIP-316 Multi-Receiver
                </div>
              </div>
            </div>

            {/* Card 3: Encrypted In-Band Memos (Pill Capsules Graphic) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between h-[360px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition group">
              <div 
                className="absolute inset-x-0 top-0 h-[100px] pointer-events-none opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
                }}
              />
              <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-medium text-[#ECEAF5]">Secure In-Band Memos</h3>
                <p className="text-xs text-[#9C99B0] leading-relaxed">
                  End-to-end encrypted 512-byte payload sealed directly inside the zero-knowledge transaction envelope.
                </p>
              </div>

              {/* Graphic: Stacked Frosted Purple Pills */}
              <div className="relative z-10 space-y-2.5 my-auto">
                <div className="p-3 rounded-xl bg-[#5632F5]/10 border border-[#7738FF]/30 backdrop-blur-md flex items-center justify-between text-xs text-[#EBDEFA] shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-3.5 h-3.5 text-[#D580FA]" />
                    <span className="font-mono text-[11px]">0xRecipient Note</span>
                  </div>
                  <span className="text-[10px] text-[#A69FC6] bg-[#7738FF]/20 px-2 py-0.5 rounded-full">Encrypted</span>
                </div>

                <div className="p-3 rounded-xl bg-[#5632F5]/15 border border-[#A16ADE]/40 backdrop-blur-md flex items-center justify-between text-xs text-[#EBDEFA] shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#D580FA]" />
                    <span className="font-mono text-[11px]">In-Band Payload</span>
                  </div>
                  <span className="text-[10px] text-[#A69FC6] bg-[#7738FF]/20 px-2 py-0.5 rounded-full">512 Bytes</span>
                </div>

                <div className="p-3 rounded-xl bg-[#5632F5]/10 border border-[#7738FF]/30 backdrop-blur-md flex items-center justify-between text-xs text-[#EBDEFA] shadow-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3.5 h-3.5 text-[#D580FA]" />
                    <span className="font-mono text-[11px]">Linkability Score</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">0.00%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Row: 2 Wide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Wide Card 1: Halo 2 Prover Engine (Frequency Bars Graphic) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition group">
              <div 
                className="absolute inset-x-0 top-0 h-[90px] pointer-events-none opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
                }}
              />
              <div className="relative z-10 space-y-1.5 mb-6">
                <h3 className="text-lg font-medium text-[#ECEAF5]">Halo 2 Zero-Knowledge Engine</h3>
                <p className="text-xs text-[#9C99B0] leading-relaxed">
                  Recursive PLONKish zero-knowledge prover without trusted setup. Compresses commitments into unlinkable proofs in milliseconds.
                </p>
              </div>

              {/* Graphic: Segmented frequency bars matching Reference 2 */}
              <div className="relative z-10 space-y-2.5 font-mono text-[11px] text-[#A69FC6] bg-black/30 p-4 rounded-2xl border border-white/[0.05]">
                <div className="flex items-center justify-between text-[10px] text-[#CFC6F0] border-b border-white/5 pb-1">
                  <span>CIRCUIT SYNTHESIS CHANNEL</span>
                  <span className="text-[#D580FA]">STATUS: VERIFIED</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 text-[10px]">100</span>
                    <div className="flex-1 flex space-x-0.5 h-3 overflow-hidden">
                      {Array.from({ length: 42 }).map((_, idx) => (
                        <div key={idx} className="w-1.5 h-full rounded-xs bg-[#D580FA]" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="w-8 text-[10px]">90</span>
                    <div className="flex-1 flex space-x-0.5 h-3 overflow-hidden">
                      {Array.from({ length: 32 }).map((_, idx) => (
                        <div key={idx} className="w-1.5 h-full rounded-xs bg-[#A16ADE]" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="w-8 text-[10px]">60</span>
                    <div className="flex-1 flex space-x-0.5 h-3 overflow-hidden">
                      {Array.from({ length: 22 }).map((_, idx) => (
                        <div key={idx} className="w-1.5 h-full rounded-xs bg-[#7738FF]" />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="w-8 text-[10px]">30</span>
                    <div className="flex-1 flex space-x-0.5 h-3 overflow-hidden">
                      {Array.from({ length: 12 }).map((_, idx) => (
                        <div key={idx} className="w-1.5 h-full rounded-xs bg-[#5632F5]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wide Card 2: Surveillance Sentinel (Alert Rows with Pill Buttons) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition group">
              <div 
                className="absolute inset-x-0 top-0 h-[90px] pointer-events-none opacity-60"
                style={{
                  background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
                }}
              />
              <div className="relative z-10 space-y-1.5 mb-6">
                <h3 className="text-lg font-medium text-[#ECEAF5]">Live Surveillance Sentinel</h3>
                <p className="text-xs text-[#9C99B0] leading-relaxed">
                  Real-time blockchain diagnostic analyzer detecting address re-use, unshielded balances, and metadata leaks.
                </p>
              </div>

              {/* Graphic: Alert rows with glowing purple pill buttons matching Reference 2 */}
              <div className="relative z-10 space-y-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-[#7738FF]/30 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-[#ECEAF5]">Transparent Mempool Alert</div>
                    <div className="text-[11px] text-[#A69FC6]">15 Address Linkages Detected for t1...</div>
                  </div>
                  <button 
                    onClick={onEnterConsole}
                    className="px-4 py-1.5 rounded-full bg-[#7738FF] hover:bg-[#8B4EFF] text-white text-xs font-medium transition shadow-[0_0_15px_rgba(119,56,255,0.5)] shrink-0"
                  >
                    Simulate Shield
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-[#5632F5]/30 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-[#ECEAF5]">Halo 2 Shielded Commitment</div>
                    <div className="text-[11px] text-[#A69FC6]">Pedersen Commitment Sealed in Orchard</div>
                  </div>
                  <button 
                    onClick={onEnterConsole}
                    className="px-4 py-1.5 rounded-full bg-[#5632F5] hover:bg-[#6841FF] text-white text-xs font-medium transition shadow-[0_0_15px_rgba(86,50,245,0.5)] shrink-0"
                  >
                    Verify State
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. THE CORE SIGNATURE SECTION: "Transforming privacy with zero-knowledge architecture"
          (Exact match to "Transforming care with patient-centric ai" in Reference 2)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#5632F5]/10 border border-[#5632F5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D580FA] animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#CFC6F0]">
              PROTOCOL GUIDE
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

        {/* Desktop Curved Arc Layout with Numbers and Staggered Cards */}
        <div className="relative min-h-[580px] max-w-4xl mx-auto">
          
          {/* SVG Curved Arc Spine (Desktop only) */}
          <div className="hidden lg:block absolute left-4 top-0 bottom-0 w-[240px] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 240 540" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="arcGlowGradient" x1="160" y1="50" x2="160" y2="490" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D580FA" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#7738FF" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#5632F5" stopOpacity="0.85" />
                </linearGradient>

                <filter id="arcNodeBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                </filter>
              </defs>

              {/* The Signature Continuous Curved Arc Spline */}
              <path
                d="M 155 65 C 25 180, 25 360, 155 475"
                stroke="url(#arcGlowGradient)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <path
                d="M 155 65 C 25 180, 25 360, 155 475"
                stroke="url(#arcGlowGradient)"
                strokeWidth="1.5"
              />

              {/* Horizontal Connecting Branch Lines */}
              <line x1="155" y1="65" x2="225" y2="65" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="58" y1="270" x2="225" y2="270" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="155" y1="475" x2="225" y2="475" stroke="#7738FF" strokeWidth="1.5" strokeOpacity="0.7" />

              {/* Glowing Nodes at 01, 02, 03 */}
              {/* Node 1 */}
              <circle cx="155" cy="65" r="9" fill="#D580FA" opacity="0.35" filter="url(#arcNodeBlur)" />
              <circle cx="155" cy="65" r="4.5" fill="#D580FA" />
              <circle cx="155" cy="65" r="2" fill="#FFFFFF" />

              {/* Node 2 */}
              <circle cx="58" cy="270" r="10" fill="#7738FF" opacity="0.45" filter="url(#arcNodeBlur)" />
              <circle cx="58" cy="270" r="5" fill="#A16ADE" />
              <circle cx="58" cy="270" r="2" fill="#FFFFFF" />

              {/* Node 3 */}
              <circle cx="155" cy="475" r="9" fill="#5632F5" opacity="0.35" filter="url(#arcNodeBlur)" />
              <circle cx="155" cy="475" r="4.5" fill="#7738FF" />
              <circle cx="155" cy="475" r="2" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Cards Stack with Reference 2 Staggering and Radiant Top Sheens */}
          <div className="space-y-12 lg:space-y-0 lg:absolute lg:inset-y-0 lg:right-0 lg:left-[190px] flex flex-col justify-between">
            
            {/* ── CARD 01: "Identify Patient Risk" -> "Identify Surveillance Risk" ── */}
            <div className="relative group lg:translate-x-0 transition duration-300">
              {/* Left Number Badge on Desktop */}
              <div className="hidden lg:flex absolute -left-[140px] top-6 items-center space-x-2 text-sm font-mono font-bold text-[#D580FA]">
                <span className="text-[14px] tracking-wider">01</span>
              </div>

              {/* The Signature Card Container */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/95 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.4)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
                
                {/* Top Gradient Sheen (Signature reference effect) */}
                <div 
                  className="absolute inset-x-0 top-0 h-[75px] pointer-events-none opacity-85"
                  style={{
                    background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.42) 0%, rgba(119, 56, 255, 0.14) 55%, transparent 100%)',
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
                        Identify Surveillance Risk
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                      <EyeOff className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                    Instantly screen for critical privacy leakages using real Web Crypto BIP-39 mnemonic generation and transparent address analysis before permanent blockchain indexing.
                  </p>
                </div>
              </div>
            </div>

            {/* ── CARD 02: "Optimize Care Plans" -> "Optimize Shielding Circuits" (STAGGERED RIGHT) ── */}
            <div className="relative group lg:translate-x-8 transition duration-300">
              {/* Left Number Badge on Desktop */}
              <div className="hidden lg:flex absolute -left-[240px] top-6 items-center space-x-2 text-sm font-mono font-bold text-[#A16ADE]">
                <span className="text-[14px] tracking-wider">02</span>
              </div>

              {/* The Signature Card Container */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/95 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.4)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
                
                {/* Top Gradient Sheen */}
                <div 
                  className="absolute inset-x-0 top-0 h-[75px] pointer-events-none opacity-85"
                  style={{
                    background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.42) 0%, rgba(119, 56, 255, 0.14) 55%, transparent 100%)',
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
                        Optimize Shielding Circuits
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                    Integrate individualized zero-knowledge proofs, Halo 2 recursive polynomial commitments, and real-time mempool obfuscation insights effortlessly.
                  </p>
                </div>
              </div>
            </div>

            {/* ── CARD 03: "Accelerate Health Outcomes" -> "Accelerate Privacy Adoption" ── */}
            <div className="relative group lg:translate-x-2 transition duration-300">
              {/* Left Number Badge on Desktop */}
              <div className="hidden lg:flex absolute -left-[140px] top-6 items-center space-x-2 text-sm font-mono font-bold text-[#7738FF]">
                <span className="text-[14px] tracking-wider">03</span>
              </div>

              {/* The Signature Card Container */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/95 p-[1px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.4)] backdrop-blur-xl transition duration-300 group-hover:border-[#A16ADE]/40">
                
                {/* Top Gradient Sheen */}
                <div 
                  className="absolute inset-x-0 top-0 h-[75px] pointer-events-none opacity-85"
                  style={{
                    background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.42) 0%, rgba(119, 56, 255, 0.14) 55%, transparent 100%)',
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
                        Accelerate Privacy Adoption
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-[#D580FA] shadow-inner">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9C99B0] leading-relaxed max-w-2xl font-normal">
                    Cryptographic simulation enhances early understanding and predicts real-world protocol safety for frictionless onboarding to official mobile wallets.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM SHOWCASE SECTION: "Your Zero-Risk Privacy Flight Deck"
          (Matching "Your Personal Health Assistant, Available 24/7" in Reference 2)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#5632F5]/10 border border-[#5632F5]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D580FA] animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#CFC6F0]">
              ZERO-RISK SANDBOX
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal text-[#ECEAF5] tracking-[-0.03em] max-w-2xl mx-auto leading-[1.15]">
            Your Zero-Risk Flight Deck,{' '}
            <span className="font-editorial italic font-normal text-[#D580FA] text-[1.12em]">
              Available 24/7
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9C99B0] max-w-lg mx-auto font-normal leading-relaxed">
            Rehearse wallet generation, simulated exchange withdrawals, and Orchard shielding before installing mobile apps.
          </p>
        </div>

        {/* 3 Bottom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: AI Flight Sentinel (Chat bubble feed) */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition">
            <div 
              className="absolute inset-x-0 top-0 h-[80px] pointer-events-none opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
              }}
            />
            <div className="relative z-10 space-y-1 mb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D580FA]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Flight Sentinel • Online</span>
              </div>
              <h3 className="text-base font-medium text-[#ECEAF5]">Telemetry Log</h3>
            </div>

            <div className="relative z-10 space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[#A69FC6] text-[11px] leading-relaxed">
                "Simulating CEX withdrawal of 5.0000 ZEC to t1a7YpP..."
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] leading-relaxed">
                "⚠️ Mempool Alert: Balance visible to chain observers."
              </div>
              <div className="p-2.5 rounded-xl bg-[#5632F5]/20 border border-[#7738FF]/30 text-[#EBDEFA] text-[11px] leading-relaxed">
                "Halo 2 Orchard proof synthesized in 27ms. Balance cloaked."
              </div>
            </div>
          </div>

          {/* Card 2: Flight Protocol Matrix (Tags & Specs) */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition">
            <div 
              className="absolute inset-x-0 top-0 h-[80px] pointer-events-none opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
              }}
            />
            <div className="relative z-10 space-y-1 mb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#A16ADE]">
                <Activity className="w-3.5 h-3.5" />
                <span>Specification Analysis</span>
              </div>
              <h3 className="text-base font-medium text-[#ECEAF5]">Protocol Standards</h3>
            </div>

            <div className="relative z-10 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-[#5632F5]/20 border border-[#5632F5]/30 text-[10px] font-mono text-[#EBDEFA]">
                  BIP-39 Vault
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#7738FF]/20 border border-[#7738FF]/30 text-[10px] font-mono text-[#EBDEFA]">
                  ZIP-316 Unified
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#A16ADE]/20 border border-[#A16ADE]/30 text-[10px] font-mono text-[#EBDEFA]">
                  Halo 2 Circuit
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#5632F5]/20 border border-[#5632F5]/30 text-[10px] font-mono text-[#EBDEFA]">
                  ZIP-321 Payment URI
                </span>
              </div>

              <div className="space-y-1.5 pt-2 text-[11px] font-mono text-[#A69FC6]">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Entropy Source:</span>
                  <span className="text-white">WebCrypto CSPRNG</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Mnemonic Checksum:</span>
                  <span className="text-emerald-400">SHA-256 Validated</span>
                </div>
                <div className="flex justify-between">
                  <span>Execution:</span>
                  <span className="text-[#D580FA]">Local Memory Only</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Privacy Health Score (Score gauge) */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0E0C1C]/90 p-6 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(86,50,245,0.25)] hover:border-[#A16ADE]/40 transition">
            <div 
              className="absolute inset-x-0 top-0 h-[80px] pointer-events-none opacity-60"
              style={{
                background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.3) 0%, rgba(119, 56, 255, 0.08) 60%, transparent 100%)',
              }}
            />
            <div className="relative z-10 space-y-1 mb-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D580FA]">
                <Shield className="w-3.5 h-3.5" />
                <span>Privacy Health Score</span>
              </div>
              <h3 className="text-base font-medium text-[#ECEAF5]">Shielding Status</h3>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-2">
              <div className="text-5xl font-extrabold text-[#ECEAF5] tracking-tight bg-gradient-to-r from-white via-[#EBDEFA] to-[#D580FA] bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-xs text-[#A69FC6] mt-1 font-mono">
                Zero Surveillance Exposure
              </div>
              <div className="mt-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                ● Low Risk · Orchard Pool Active
              </div>
            </div>
          </div>

        </div>

      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. CALL TO ACTION BANNER: "Launch Flight Deck Simulator"
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-[#7738FF]/40 bg-gradient-to-b from-[#18123A] to-[#0D0B1C] p-8 sm:p-12 text-center shadow-[0_25px_60px_-15px_rgba(86,50,245,0.5)]">
          
          {/* Ambient center light */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(213, 128, 250, 0.3) 0%, rgba(119, 56, 255, 0.15) 50%, transparent 80%)',
            }}
          />

          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-normal text-white tracking-tight leading-tight">
              Ready to fly your first{' '}
              <span className="font-editorial italic font-normal text-[#D580FA] text-[1.12em]">
                shielded
              </span>{' '}
              transaction?
            </h2>

            <p className="text-sm text-[#A69FC6] max-w-lg mx-auto leading-relaxed">
              Experience all 5 phases in an interactive, isolated flight simulator before installing official mobile wallets.
            </p>

            <div className="pt-2">
              <button
                onClick={onEnterConsole}
                className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded-full bg-[#7738FF] hover:bg-[#8B4EFF] text-white text-sm font-semibold tracking-wide transition shadow-[0_0_30px_rgba(119,56,255,0.6)] cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Launch Flight Deck Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
