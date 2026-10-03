import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroPortal } from './components/HeroPortal';
import { LandingFeatures } from './components/LandingFeatures';
import { FlightNav } from './components/FlightNav';
import { VirtualPhone } from './components/VirtualPhone';
import { SurveillanceExplorer } from './components/SurveillanceExplorer';
import { CertificateModal } from './components/CertificateModal';
import { FlightStepId, SimulatorState, NetworkStatus } from './types';
import { generateRealMnemonic } from './crypto/bip39';
import { CANONICAL_TEST_ADDRESSES } from './crypto/zcash';
import { fetchLiveZcashStatus } from './services/explorer';
import { RotateCcw, Download, Shield, ExternalLink, Terminal, Sparkles } from 'lucide-react';

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
      setState(prev => ({ ...prev, seedPhrase: mnemonic }));
    });

    fetchLiveZcashStatus().then(setNetworkStatus);
  }, []);

  const handleUpdateState = (partial: Partial<SimulatorState>) => {
    setState(prev => ({ ...prev, ...partial }));
  };

  const handleAdvanceStep = (nextStep: FlightStepId) => {
    setState(prev => {
      const updatedCompleted = Array.from(new Set([...prev.completedSteps, prev.currentStep]));
      return {
        ...prev,
        currentStep: nextStep,
        completedSteps: updatedCompleted
      };
    });
  };

  const handleSelectStep = (step: FlightStepId) => {
    setState(prev => ({ ...prev, currentStep: step }));
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

      {/* VIEW 1: THE LANDING PAGE (Hero Light Portal + Bento Narrative) */}
      {activeView === 'landing' && (
        <div className="animate-fade-in flex-1">
          <HeroPortal onEnterConsole={() => setActiveView('console')} />
          <LandingFeatures onEnterConsole={() => setActiveView('console')} />
        </div>
      )}

      {/* VIEW 2: THE CONSOLE / FLIGHT DECK (Pro Workstation) */}
      {activeView === 'console' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full flex flex-col justify-between animate-fade-in">
          
          {/* Console Sub-Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-3 border-b border-white/[0.08] gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center space-x-2">
                <span>Flight Deck Control Station</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SANDBOX ACTIVE
                </span>
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Execute the 5 core Zcash onboarding phases in an isolated, real-cryptography training environment.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetFlight}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-white/[0.08] transition"
                title="Reset flight training"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                <span>Reset Simulation</span>
              </button>
            </div>
          </div>

          {/* 5-Step Navigation Indicator */}
          <FlightNav
            currentStep={state.currentStep}
            completedSteps={state.completedSteps}
            onSelectStep={handleSelectStep}
          />

          {/* Dual-Cylinder Viewport: Left = Virtual Phone | Right = Surveillance Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4 items-center">
            
            {/* Left Cylinder: Virtual Cockpit Device */}
            <div className="lg:col-span-5 flex justify-center">
              {state.seedPhrase.length > 0 ? (
                <VirtualPhone
                  state={state}
                  onUpdateState={handleUpdateState}
                  onAdvanceStep={handleAdvanceStep}
                  onOpenCertificate={() => setIsCertOpen(true)}
                />
              ) : (
                <div className="w-[380px] h-[780px] bg-zinc-950 rounded-[48px] border-4 border-zinc-800 flex items-center justify-center">
                  <span className="text-xs font-mono text-zinc-500 animate-pulse">Initializing cryptographic vault...</span>
                </div>
              )}
            </div>

            {/* Right Cylinder: Surveillance Explorer & Real Diagnostics */}
            <div className="lg:col-span-7">
              <SurveillanceExplorer state={state} />
            </div>

          </div>

          {/* Real-World Wallet Gateways Bar */}
          <div className="my-6 p-4 rounded-2xl bg-zinc-900/60 border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs">
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
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold transition shadow-lg shadow-[#7738FF]/30"
              >
                <span>Get Zashi (iOS & Android)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white" />
              </a>

              <a
                href="https://ywallet.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold border border-white/[0.08] transition"
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
