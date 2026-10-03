import React, { useState } from 'react';
import { NetworkStatus } from '../types';
import { HelpCircle, X, Shield, BookOpen } from 'lucide-react';

interface HeaderProps {
  networkStatus: NetworkStatus;
  activeView: 'landing' | 'console';
  onNavigate: (view: 'landing' | 'console') => void;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({ networkStatus, activeView, onNavigate, currentStep }) => {
  const [showPlainWords, setShowPlainWords] = useState(false);

  const navItem = (view: 'landing' | 'console', label: string) => (
    <button
      onClick={() => onNavigate(view)}
      className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
        activeView === view ? 'bg-white/[0.06] text-[#ECEAF5]' : 'text-[#8E8BA3] hover:text-[#ECEAF5]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08070D]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
          <div className="flex items-center gap-8">
            <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 cursor-pointer">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#5632F5] text-[13px] font-semibold text-white">
                Z
              </span>
              <span className="text-[14px] font-medium tracking-[-0.01em] text-[#ECEAF5]">Redoubt</span>
            </button>

            <nav className="hidden items-center gap-1 text-[13px] sm:flex">
              {navItem('landing', 'Overview')}
              {navItem('console', activeView === 'console' ? `Flight deck · ${currentStep}/5` : 'Flight deck')}
            </nav>
          </div>

          {/* Live block height & Plain Words Helper */}
          <div className="hidden items-center gap-4 font-mono text-[12px] lg:flex">
            <button
              onClick={() => setShowPlainWords(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D580FA]" />
              <span className="text-xs font-sans">Plain Words</span>
            </button>

            <div className="flex items-center gap-2 tabular-nums text-[#8E8BA3]">
              <span className={`h-1.5 w-1.5 rounded-full ${networkStatus.isLive ? 'bg-[#A16ADE]' : 'bg-[#4D3D75]'}`} />
              <span>{networkStatus.isLive ? 'Mainnet block' : 'Checkpoint'}</span>
              <span className="text-[#ECEAF5]">#{networkStatus.blockHeight.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPlainWords(true)}
              className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] text-zinc-300 text-xs flex items-center space-x-1 lg:hidden"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#D580FA]" />
              <span>Glossary</span>
            </button>

            <a
              href="https://x.com/zksnarks_"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden px-3 py-1.5 text-[13px] text-[#8E8BA3] transition-colors hover:text-[#ECEAF5] sm:block"
            >
              @zksnarks_
            </a>
            <button
              onClick={() => onNavigate(activeView === 'landing' ? 'console' : 'landing')}
              className="rounded-lg bg-[#ECEAF5] px-3.5 py-1.5 text-[13px] font-medium text-[#0B0A14] transition-colors hover:bg-white cursor-pointer"
            >
              {activeView === 'landing' ? 'Launch flight deck' : 'Back to overview'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Plain Words Modal ─────────────────────────────────────── */}
      {showPlainWords && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="relative w-full max-w-lg bg-[#0E0C1C] border border-[#7738FF]/40 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(86,50,245,0.5)] space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-[#D580FA]" />
                <h3 className="text-base font-bold text-white tracking-tight">Plain Words: Envelopes & Postcards</h3>
              </div>
              <button
                onClick={() => setShowPlainWords(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white bg-white/[0.05] transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono font-bold text-emerald-400">u1... (Private Shielded Address)</span>
                <p className="text-zinc-300">Your sealed envelope. What arrives here is completely encrypted in zero-knowledge. Only you can see the balance.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono font-bold text-rose-400">t1... (Public Transparent Address)</span>
                <p className="text-zinc-300">Your public postcard. Anyone on the internet or block explorer can see who sent money here and the balance.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono font-bold text-[#D580FA]">Shield (Public → Private)</span>
                <p className="text-zinc-300">Slipping your public postcard into the sealed envelope. Moves funds from transparent to Orchard.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono font-bold text-amber-400">Unshield (Private → Public)</span>
                <p className="text-zinc-300">Taking coins back out of the envelope to send to a transparent exchange. Leaks the transacted amount.</p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="font-mono font-bold text-[#A69FC6]">Encrypted Memo (The Letter)</span>
                <p className="text-zinc-300">A private note up to 512 bytes sealed inside a shielded send. Only the recipient's viewing key can decrypt it.</p>
              </div>
            </div>

            <button
              onClick={() => setShowPlainWords(false)}
              className="w-full py-2.5 rounded-xl bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-semibold text-xs transition cursor-pointer"
            >
              Got It · Return to Flight
            </button>
          </div>
        </div>
      )}
    </>
  );
};
