import React from 'react';
import { NetworkStatus } from '../types';

interface HeaderProps {
  networkStatus: NetworkStatus;
  activeView: 'landing' | 'console';
  onNavigate: (view: 'landing' | 'console') => void;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({ networkStatus, activeView, onNavigate, currentStep }) => {
  const navItem = (view: 'landing' | 'console', label: string) => (
    <button
      onClick={() => onNavigate(view)}
      className={`rounded-lg px-3 py-1.5 transition-colors ${
        activeView === view ? 'bg-white/[0.06] text-[#ECEAF5]' : 'text-[#8E8BA3] hover:text-[#ECEAF5]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08070D]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5">
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

        {/* Live block height. Labelled as a checkpoint when the explorer API is unreachable — never pretend it's live. */}
        <div className="hidden items-center gap-2 font-mono text-[12px] tabular-nums text-[#8E8BA3] lg:flex">
          <span className={`h-1.5 w-1.5 rounded-full ${networkStatus.isLive ? 'bg-[#A16ADE]' : 'bg-[#4D3D75]'}`} />
          <span>{networkStatus.isLive ? 'Mainnet block' : 'Checkpoint'}</span>
          <span className="text-[#ECEAF5]">#{networkStatus.blockHeight.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-2">
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
            className="rounded-lg bg-[#ECEAF5] px-3.5 py-1.5 text-[13px] font-medium text-[#0B0A14] transition-colors hover:bg-white"
          >
            {activeView === 'landing' ? 'Launch flight deck' : 'Back to overview'}
          </button>
        </div>
      </div>
    </header>
  );
};
