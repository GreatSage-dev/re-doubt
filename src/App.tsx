import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroPortal } from './components/HeroPortal';
import { LandingFeatures } from './components/LandingFeatures';
import { FlightNav } from './components/FlightNav';
import { ConsoleCockpit } from './components/ConsoleCockpit';
import { ConsoleInspector } from './components/ConsoleInspector';
import { ConsoleAuditLog, AuditLogEntry } from './components/ConsoleAuditLog';
import { CertificateModal } from './components/CertificateModal';
import { FlightStepId, SimulatorState, NetworkStatus } from './types';
import { generateRealMnemonic } from './crypto/bip39';
import { CANONICAL_TEST_ADDRESSES } from './crypto/zcash';
import { fetchLiveZcashStatus } from './services/explorer';
import { RotateCcw, Download, Shield, ExternalLink, Terminal, Sparkles, Activity, Cpu } from 'lucide-react';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'landing' | 'console'>('landing');

  // Live Zcash Network Telemetry
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    blockHeight: 2685120,
    network: 'mainnet',
    shieldedPoolZec: 4120850,
    latestBlockHash: '000000000078021b3d5b0c95ae8677c77c8e9b4da481fa73e6f921f6fa8b9e4a',
    lastUpdated: Date.now(),
    isLive: false
  });

  const [isCertOpen, setIsCertOpen] = useState(false);

  // Workstation Chronological Audit Log
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'boot_1',
      timestamp: new Date().toLocaleTimeString(),
      module: 'BOOT',
      message: 'Workstation crypto engine initialized via WebCrypto CSPRNG (zero network leakage)',
      type: 'info'
    },
    {
      id: 'boot_2',
      timestamp: new Date().toLocaleTimeString(),
      module: 'BIP-39',
      message: '256-bit entropy generated; master mnemonic ready in isolated browser memory',
      type: 'success'
    },
    {
      id: 'boot_3',
      timestamp: new Date().toLocaleTimeString(),
      module: 'ZIP-316',
      message: 'Unified Address standard mapped: Orchard (0x03), Sapling (0x02), and Transparent (0x00)',
      type: 'info'
    }
  ]);

  const handleLogEvent = (
    module: AuditLogEntry['module'],
    message: string,
    type: AuditLogEntry['type']
  ) => {
    setAuditLogs((prev) => [
      ...prev,
      {
        id: 'log_' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        module,
        message,
        type
      }
    ]);
  };

  // Main Simulator State
  const [state, setState] = useState<SimulatorState>({
    currentStep: 1,
    completedSteps: [],
    seedPhrase: [],
    isSeedBackedUp: false,
    transparentAddress: CANONICAL_TEST_ADDRESSES.TRANSPARENT_SAMPLE,
    unifiedAddress: CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE,
    transparentBalance: 0,
    shieldedBalance: 0,
    transactions: [],
    selectedWalletClient: 'zashi',
    isShieldingInProgress: false,
    zkProofProgress: 0,
    realAddressInput: '',
    realQrUri: ''
  });

  // Initial bootstrap: generate real seed & fetch real network telemetry
  useEffect(() => {
    generateRealMnemonic(256).then(({ mnemonic }) => {
      setState((prev) => ({ ...prev, seedPhrase: mnemonic }));
    });

    fetchLiveZcashStatus().then(setNetworkStatus);
  }, []);

  // Global Keyboard Shortcuts for Pro Workstation feel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '1' && e.key <= '5') {
        const step = parseInt(e.key) as FlightStepId;
        handleSelectStep(step);
      } else if (e.key === 'r' || e.key === 'R') {
        handleResetFlight();
      } else if (e.key === 'c' || e.key === 'C') {
        setIsCertOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.completedSteps]);

  const handleUpdateState = (partial: Partial<SimulatorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const handleAdvanceStep = (nextStep: FlightStepId) => {
    setState((prev) => {
      const updatedCompleted = Array.from(new Set([...prev.completedSteps, prev.currentStep]));
      return {
        ...prev,
        currentStep: nextStep,
        completedSteps: updatedCompleted
      };
    });
  };

  const handleSelectStep = (step: FlightStepId) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const handleResetFlight = async () => {
    const { mnemonic } = await generateRealMnemonic(256);
    setState({
      currentStep: 1,
      completedSteps: [],
      seedPhrase: mnemonic,
      isSeedBackedUp: false,
      transparentAddress: CANONICAL_TEST_ADDRESSES.TRANSPARENT_SAMPLE,
      unifiedAddress: CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE,
      transparentBalance: 0,
      shieldedBalance: 0,
      transactions: [],
      selectedWalletClient: 'zashi',
      isShieldingInProgress: false,
      zkProofProgress: 0,
      realAddressInput: '',
      realQrUri: ''
    });

    handleLogEvent('BOOT', 'Flight simulator reset. Fresh cryptographic parameters generated.', 'warn');
  };

  return (
    <div className="min-h-screen bg-[#08070D] text-zinc-100 flex flex-col justify-between selection:bg-[#5632F5] selection:text-white">
      
      {/* Top Telemetry & View Navigation Header */}
      <Header 
        networkStatus={networkStatus} 
        activeView={activeView}
        onNavigate={setActiveView}
        currentStep={state.currentStep} 
      />

      {/* VIEW 1: THE LANDING PAGE */}
      {activeView === 'landing' && (
        <div className="animate-fade-in flex-1">
          <HeroPortal onEnterConsole={() => setActiveView('console')} />
          <LandingFeatures onEnterConsole={() => setActiveView('console')} />
        </div>
      )}

      {/* VIEW 2: THE CONSOLE / FLIGHT DECK (Pro Developer Workstation) */}
      {activeView === 'console' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col justify-between animate-fade-in space-y-6">
          
          {/* Workstation Top Telemetry Strip */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Flight Deck Workstation
                </h1>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SANDBOX ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#9C99B0]">
                High-density zero-knowledge training environment · Real BIP-39 WebCrypto & ZIP-316 decoding.
              </p>
            </div>

            {/* Quick Metrics & Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0E0C1C] border border-white/[0.08] text-zinc-400">
                <span className="text-zinc-500">POOL:</span>
                <span className="text-[#D580FA] font-bold">4.12M ZEC</span>
              </div>

              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0E0C1C] border border-white/[0.08] text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-[#7738FF]" />
                <span className="text-[#ECEAF5]">Halo 2 (27ms)</span>
              </div>

              <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0E0C1C] border border-white/[0.08] text-zinc-500 text-[11px]">
                <span>Hotkeys:</span>
                <span className="text-zinc-300 bg-white/5 px-1.5 py-0.2 rounded">1-5</span>
                <span>•</span>
                <span className="text-zinc-300 bg-white/5 px-1.5 py-0.2 rounded">R reset</span>
                <span>•</span>
                <span className="text-zinc-300 bg-white/5 px-1.5 py-0.2 rounded">C cert</span>
              </div>

              <button
                onClick={handleResetFlight}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-zinc-300 text-xs border border-white/[0.08] transition cursor-pointer"
                title="Reset simulation parameters (Key: R)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D580FA]" />
                <span>Reset [R]</span>
              </button>
            </div>
          </div>

          {/* 5-Step Segmented Linear Navigator */}
          <FlightNav
            currentStep={state.currentStep}
            completedSteps={state.completedSteps}
            onSelectStep={handleSelectStep}
          />

          {/* Dual-Pane Pro Workstation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Pane: Interactive Flight Execution Cockpit */}
            <div className="lg:col-span-6">
              {state.seedPhrase.length > 0 ? (
                <ConsoleCockpit
                  state={state}
                  onUpdateState={handleUpdateState}
                  onAdvanceStep={handleAdvanceStep}
                  onOpenCertificate={() => setIsCertOpen(true)}
                  onLogEvent={handleLogEvent}
                />
              ) : (
                <div className="h-[740px] rounded-[28px] border border-white/[0.08] bg-[#0E0C1C] flex items-center justify-center">
                  <span className="text-xs font-mono text-zinc-500 animate-pulse">
                    Initializing cryptographic sandbox...
                  </span>
                </div>
              )}
            </div>

            {/* Right Pane: Multi-Tab Pro Diagnostics & Panopticon */}
            <div className="lg:col-span-6">
              <ConsoleInspector state={state} />
            </div>

          </div>

          {/* Bottom Full-Width Chronological Telemetry & Audit Stream */}
          <div className="pt-2">
            <ConsoleAuditLog 
              logs={auditLogs} 
              onClear={() => setAuditLogs([])} 
            />
          </div>

          {/* Real-World Wallet Gateways Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0C1C]/90 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_12px_32px_-10px_rgba(86,50,245,0.2)]">
            <div className="flex items-center space-x-3.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#5632F5] text-white font-bold shadow-[0_0_15px_rgba(86,50,245,0.4)]">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Graduate to Real-World Privacy</div>
                <div className="text-zinc-400 text-xs">
                  Once trained on the flight deck, install an official Zcash client to shield your actual funds.
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <a
                href="https://zashi.z.cash/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold transition shadow-lg shadow-[#7738FF]/30 cursor-pointer"
              >
                <span>Get Zashi (iOS & Android)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>

              <a
                href="https://ywallet.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold border border-white/[0.08] transition cursor-pointer"
              >
                <span>Get Ywallet</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

        </main>
      )}

      {/* Global Minimal Footer */}
      <footer className="border-t border-white/[0.06] bg-[#08070D] py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Built for <strong>ZECATHON ($100k Zcash Privacy Hackathon)</strong> Wildcard Track
          </div>
          <div className="flex items-center space-x-3 text-zinc-400">
            <span>Halo 2 (Orchard) & ZIP 316</span>
            <span>•</span>
            <a href="https://x.com/zksnarks_" target="_blank" rel="noopener noreferrer" className="hover:text-[#D580FA] transition">
              @zksnarks_
            </a>
          </div>
        </div>
      </footer>

      {/* Flight Certificate Celebration Modal */}
      <CertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        state={state}
      />

    </div>
  );
};
