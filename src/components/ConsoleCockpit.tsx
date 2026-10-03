import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  Sparkles,
  QrCode,
  Download,
  ExternalLink,
  Award,
  Key,
  Layers,
  Radio,
  ArrowDownToLine,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import QRCode from 'qrcode';
import { FlightStepId, SimulatorState } from '../types';
import { generateRealMnemonic } from '../crypto/bip39';
import { buildZip321Uri, CANONICAL_TEST_ADDRESSES, getMemoByteLength } from '../crypto/zcash';

interface ConsoleCockpitProps {
  state: SimulatorState;
  onUpdateState: (partial: Partial<SimulatorState>) => void;
  onAdvanceStep: (nextStep: FlightStepId) => void;
  onOpenCertificate: () => void;
  onLogEvent: (module: 'BOOT' | 'BIP-39' | 'MEMPOOL' | 'HALO2' | 'ORCHARD' | 'ZIP-316' | 'RPC', message: string, type: 'info' | 'warn' | 'success' | 'circuit') => void;
}

export const ConsoleCockpit: React.FC<ConsoleCockpitProps> = ({
  state,
  onUpdateState,
  onAdvanceStep,
  onOpenCertificate,
  onLogEvent
}) => {
  const [copied, setCopied] = useState(false);
  const [showSeed, setShowSeed] = useState(true);
  const [isKeySaved, setIsKeySaved] = useState(false);

  // Time Capsule Send state (Step 4)
  const defaultLetter = 'Dear future me: Privacy is an inviolable human right. This letter was sealed with Zero-Knowledge proofs on Zcash.';
  const [sendMemo, setSendMemo] = useState(defaultLetter);
  const [isSending, setIsSending] = useState(false);

  // QR Code for Step 5
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Active timers reference to prevent memory leaks on unmount
  const timersRef = useRef<{ interval?: ReturnType<typeof setInterval>; timeout?: ReturnType<typeof setTimeout> }>({});

  useEffect(() => {
    return () => {
      if (timersRef.current.interval) clearInterval(timersRef.current.interval);
      if (timersRef.current.timeout) clearTimeout(timersRef.current.timeout);
    };
  }, []);

  // Update QR Code whenever on Step 5
  useEffect(() => {
    if (state.currentStep === 5) {
      const uri = buildZip321Uri({
        address: state.unifiedAddress || CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE,
        amount: 0.05,
        memo: state.practiceMemo || sendMemo
      });
      QRCode.toDataURL(uri, {
        width: 240,
        margin: 1,
        color: {
          dark: '#08070D',
          light: '#FFFFFF'
        }
      }).then(setQrDataUrl).catch(() => {});
    }
  }, [state.currentStep, state.unifiedAddress, state.practiceMemo, sendMemo]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateSeed = async () => {
    const { mnemonic } = await generateRealMnemonic(256);
    onUpdateState({ seedPhrase: mnemonic, isSeedBackedUp: false });
    onLogEvent('BIP-39', 'Generated 256-bit fresh CSPRNG mnemonic (24 words)', 'info');
  };

  // ── Step 1: Radar Check Toggle ──────────────────────────────────────────
  const handleToggleRadarPreview = (mode: 'transparent' | 'shielded') => {
    onUpdateState({ radarPreview: mode });
    onLogEvent(
      mode === 'transparent' ? 'MEMPOOL' : 'HALO2',
      `Switched radar preview to ${mode.toUpperCase()} view (${mode === 'transparent' ? 'The Postcard' : 'The Envelope'})`,
      mode === 'transparent' ? 'warn' : 'circuit'
    );
  };

  // ── Step 2: Claim Practice Coins (Exchange Ingress) ────────────────────
  const handleClaimPracticeCoins = () => {
    const txId = 'tx_cex_' + Math.random().toString(36).substring(2, 9);
    const newTx = {
      id: txId,
      timestamp: Date.now(),
      type: 'transparent_receive' as const,
      amount: 5.0,
      fee: 0.001,
      sender: 'Binance Hot Wallet (t1CEX998...)',
      recipient: state.transparentAddress,
      status: 'confirmed' as const,
      proofType: 'transparent_public' as const,
      isSurveillanceVisible: true
    };

    onUpdateState({
      transparentBalance: state.transparentBalance + 5.0,
      transactions: [newTx, ...state.transactions],
      radarPreview: 'transparent'
    });

    onLogEvent('MEMPOOL', `Simulated CEX withdrawal of 5.000 ZEC to ${state.transparentAddress.substring(0, 14)}...`, 'warn');
    onLogEvent('MEMPOOL', `ALERT: Balance 5.000 ZEC is now 100% visible on public block explorer`, 'warn');
    onAdvanceStep(3);
  };

  // ── Step 3: Orchard Shielding (Halo 2 Circuit) ─────────────────────────
  const handleExecuteShielding = () => {
    if (state.transparentBalance <= 0 || state.isShieldingInProgress) return;

    onUpdateState({ isShieldingInProgress: true, zkProofProgress: 10 });
    onLogEvent('HALO2', 'Initiating Halo 2 circuit synthesis (20,480 constraints)...', 'circuit');

    let currentProgress = 10;
    timersRef.current.interval = setInterval(() => {
      currentProgress = Math.min(95, currentProgress + 25);
      onUpdateState({ zkProofProgress: currentProgress });
    }, 250);

    const transparentToShield = state.transparentBalance;

    timersRef.current.timeout = setTimeout(() => {
      if (timersRef.current.interval) clearInterval(timersRef.current.interval);
      const txId = 'tx_shield_' + Math.random().toString(36).substring(2, 9);
      const newTx = {
        id: txId,
        timestamp: Date.now(),
        type: 'shield_to_orchard' as const,
        amount: transparentToShield,
        fee: 0.0001,
        sender: state.transparentAddress,
        recipient: state.unifiedAddress,
        status: 'confirmed' as const,
        proofType: 'halo2_orchard_zk' as const,
        isSurveillanceVisible: false
      };

      onUpdateState({
        transparentBalance: 0,
        shieldedBalance: Math.max(0, state.shieldedBalance + transparentToShield - 0.0001),
        isShieldingInProgress: false,
        zkProofProgress: 100,
        transactions: [newTx, ...state.transactions],
        radarPreview: 'shielded'
      });

      onLogEvent('HALO2', 'Halo 2 proof generated: Note commitment appended to Orchard Merkle tree', 'success');
      onLogEvent('ORCHARD', `Funds shielded: 0 ZEC transparent, ${(transparentToShield - 0.0001).toFixed(4)} ZEC cloaked`, 'success');
      onAdvanceStep(4);
    }, 1500);
  };

  // ── Step 4: Transmit Sealed Time Capsule (z-to-z Send) ──────────────────
  const handleSendPrivateMemo = () => {
    if (state.shieldedBalance < 1.0 || isSending) return;

    setIsSending(true);
    onLogEvent('ORCHARD', `Encrypting memo payload (${getMemoByteLength(sendMemo)} bytes) via ChaCha20-Poly1305...`, 'circuit');

    timersRef.current.timeout = setTimeout(() => {
      const txId = 'tx_z2z_' + Math.random().toString(36).substring(2, 9);
      const newTx = {
        id: txId,
        timestamp: Date.now(),
        type: 'shielded_send' as const,
        amount: 1.0,
        fee: 0.0001,
        sender: 'Orchard Shielded Pool (Anchor #2685120)',
        recipient: state.unifiedAddress,
        memo: sendMemo,
        status: 'confirmed' as const,
        proofType: 'halo2_orchard_zk' as const,
        isSurveillanceVisible: false
      };

      onUpdateState({
        shieldedBalance: Math.max(0, state.shieldedBalance - 0.0001),
        transactions: [newTx, ...state.transactions],
        practiceMemo: sendMemo
      });

      setIsSending(false);
      onLogEvent('ORCHARD', `z-to-z transmission complete: Note nullifier posted. Identity & memo 100% private.`, 'success');
      onAdvanceStep(5);
    }, 1200);
  };

  const memoByteCount = getMemoByteLength(sendMemo);
  const isMemoTooLong = memoByteCount > 512;

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[#0E0C1C]/95 p-6 flex flex-col justify-between h-[740px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.3)] backdrop-blur-xl relative overflow-hidden select-none">
      
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#5632F5]/15 blur-[120px]"
        style={{ mixBlendMode: 'plus-lighter' }}
      />
      <div className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#D580FA]/60 to-transparent" />

      {/* ── Cockpit Subheader ─────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D580FA] bg-[#5632F5]/20 px-2 py-0.5 rounded-full border border-[#5632F5]/40 font-bold">
              PHASE 0{state.currentStep}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {state.currentStep === 1 && 'Radar Check · See the Contrast'}
              {state.currentStep === 2 && 'Get Practice Coins · Exchange Withdrawal'}
              {state.currentStep === 3 && 'Make It Private · Slip into the Envelope'}
              {state.currentStep === 4 && 'Private Letter · Time Capsule Memo'}
              {state.currentStep === 5 && 'Flight Mastery · Certificate & Key'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#ECEAF5] mt-1 tracking-tight">
            {state.currentStep === 1 && 'The Postcard vs. The Envelope'}
            {state.currentStep === 2 && 'Claim 5.00 Free Practice Coins'}
            {state.currentStep === 3 && 'Shield 5.00 ZEC into the Private Pool'}
            {state.currentStep === 4 && 'Send a Sealed Letter to Future You'}
            {state.currentStep === 5 && 'You’re Flight Certified! Claim Your Award'}
          </h2>
        </div>

        <div className="text-right font-mono text-[11px]">
          <span className="text-zinc-500 block">Simulator Balance</span>
          <span className="font-bold text-emerald-400">
            {state.shieldedBalance > 0 
              ? `${state.shieldedBalance.toFixed(4)} ZEC (Shielded 🛡️)` 
              : `${state.transparentBalance.toFixed(4)} ZEC`}
          </span>
        </div>
      </div>

      {/* ── Active Phase Viewport ─────────────────────────────────── */}
      <div className="relative z-10 flex-1 overflow-y-auto py-3 space-y-4">
        
        {/* ── PHASE 1: RADAR CHECK (SEE THE DIFFERENCE) ────────────── */}
        {state.currentStep === 1 && (
          <div className="space-y-4 animate-fade-in font-sans">
            
            {/* Co-Pilot Briefing Card */}
            <div className="p-4 rounded-2xl bg-[#5632F5]/10 border border-[#7738FF]/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D580FA]">
                <Sparkles className="w-4 h-4 text-[#D580FA]" />
                <span>FLIGHT INSTRUCTOR BRIEFING</span>
              </div>
              <p className="text-xs text-[#ECEAF5] leading-relaxed">
                Before you touch real money, see the fundamental difference. Public blockchains work like <strong>postcards</strong>—anyone in the world can read who sent them and how much was moved. Zcash wraps your transaction inside an <strong>opaque cryptographic envelope</strong> where only the math is verified, but all identities and balances are hidden.
              </p>
            </div>

            {/* Interactive Toggle: Feel the Contrast */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                <span className="flex items-center space-x-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#D580FA] animate-pulse" />
                  <span>Interactive Test: Click to flip the radar mirror to the right</span>
                </span>
                <span className="text-[10px] text-[#A69FC6] font-mono hidden sm:inline">
                  LIVE REAL-TIME PREVIEW
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Option A: Transparent Postcard */}
                <button
                  type="button"
                  onClick={() => handleToggleRadarPreview('transparent')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 relative cursor-pointer ${
                    (state.radarPreview ?? 'transparent') === 'transparent'
                      ? 'border-rose-500 bg-rose-500/15 shadow-[0_0_30px_rgba(244,63,94,0.25)] ring-1 ring-rose-500/50 scale-[1.01]'
                      : 'border-white/[0.08] bg-[#0A0815]/80 hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>The Public Postcard (t1...)</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      (state.radarPreview ?? 'transparent') === 'transparent'
                        ? 'bg-rose-500 text-white'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {(state.radarPreview ?? 'transparent') === 'transparent' ? '● ACTIVE ON RADAR' : 'EXPOSED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-snug">
                    Sender, receiver, and balances are 100% visible to anyone with an internet connection.
                  </p>
                </button>

                {/* Option B: Shielded Envelope */}
                <button
                  type="button"
                  onClick={() => handleToggleRadarPreview('shielded')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 relative cursor-pointer ${
                    state.radarPreview === 'shielded'
                      ? 'border-emerald-500 bg-emerald-500/15 shadow-[0_0_30px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50 scale-[1.01]'
                      : 'border-white/[0.08] bg-[#0A0815]/80 hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>The Sealed Envelope (u1...)</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      state.radarPreview === 'shielded'
                        ? 'bg-emerald-500 text-black'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {state.radarPreview === 'shielded' ? '● ACTIVE ON RADAR' : 'MASKED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-snug">
                    Zero-Knowledge proofs verify valid coins without revealing amounts or identity. Completely cloaked.
                  </p>
                </button>
              </div>

              <div className="text-[11px] text-zinc-400 text-center flex items-center justify-center space-x-1.5 pt-1">
                <span>👉</span>
                <span>Look at the <strong>Surveillance Radar</strong> to the right as you toggle between both cards</span>
              </div>
            </div>

            {/* Reassuring Action Prompt */}
            <div className="pt-2">
              <button
                onClick={() => onAdvanceStep(2)}
                className="w-full py-3.5 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_25px_rgba(119,56,255,0.45)] cursor-pointer hover:scale-[1.01]"
              >
                <span>Ready to Practice: Claim 5.00 Test ZEC (Step 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-zinc-500 mt-2">
                Zero risk · No real funds touched · Practice sandbox
              </p>
            </div>
          </div>
        )}

        {/* ── PHASE 2: GET PRACTICE COINS (EXCHANGE INGRESS) ────────── */}
        {state.currentStep === 2 && (
          <div className="space-y-4 animate-fade-in font-sans">
            
            {/* Co-Pilot Briefing Card */}
            <div className="p-4 rounded-2xl bg-[#5632F5]/10 border border-[#7738FF]/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D580FA]">
                <Sparkles className="w-4 h-4 text-[#D580FA]" />
                <span>FLIGHT INSTRUCTOR BRIEFING</span>
              </div>
              <p className="text-xs text-[#ECEAF5] leading-relaxed">
                When you buy Zcash on major exchanges (Binance, Coinbase, Kraken), they default to sending funds to a <strong>Transparent address (<code className="text-rose-300 font-mono">t1...</code>)</strong>. Watch what happens to the surveillance radar the moment these coins arrive.
              </p>
            </div>

            {/* Practice Deposit Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/[0.06] pb-2">
                <span>Simulated Ingress Source</span>
                <span className="text-[#D580FA] font-bold">Binance Hot Wallet</span>
              </div>

              <div className="space-y-1.5 font-sans">
                <span className="text-[11px] text-zinc-400 block font-mono">Target Deposit Address:</span>
                <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px]">
                  <span className="text-rose-300 truncate mr-2">{state.transparentAddress}</span>
                  <button
                    onClick={() => handleCopy(state.transparentAddress)}
                    className="text-zinc-400 hover:text-white shrink-0 p-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-zinc-400 font-sans">Simulated Withdrawal Amount:</span>
                <span className="text-base font-bold text-white font-mono">5.0000 ZEC</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleClaimPracticeCoins}
                className="w-full py-3.5 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(119,56,255,0.4)] cursor-pointer hover:scale-[1.01]"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Claim 5.00 Free Practice ZEC from Simulated Exchange</span>
              </button>

              {state.transparentBalance > 0 && (
                <button
                  onClick={() => onAdvanceStep(3)}
                  className="w-full py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <span>Already claimed? Proceed to Shielding (Step 3) →</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── PHASE 3: SHIELD IT (ORCHARD ZK POOL) ──────────────────── */}
        {state.currentStep === 3 && (
          <div className="space-y-4 animate-fade-in font-sans">
            
            {/* Co-Pilot Briefing Card */}
            <div className="p-4 rounded-2xl bg-[#5632F5]/10 border border-[#7738FF]/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D580FA]">
                <Sparkles className="w-4 h-4 text-[#D580FA]" />
                <span>FLIGHT INSTRUCTOR BRIEFING</span>
              </div>
              <p className="text-xs text-[#ECEAF5] leading-relaxed">
                Notice the red alert on the radar: your 5.00 ZEC is currently visible to the entire world. Now let's slip it into the envelope. Shielding compiles a <strong>Halo 2 Zero-Knowledge Proof</strong> that verifies you have valid funds without revealing your balance or identity to the blockchain.
              </p>
            </div>

            {/* Shielding Breakdown Box */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
                <span>Shielding Operation</span>
                <span className="text-emerald-400 font-bold">Transparent → Orchard Pool</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Exposed Balance to Shield:</span>
                  <span className="text-rose-400 font-bold">{state.transparentBalance.toFixed(4)} ZEC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Network Shielding Fee:</span>
                  <span className="text-zinc-400">0.0001 ZEC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Zero-Knowledge Circuit:</span>
                  <span className="text-[#D580FA]">Halo 2 PLONKish (Orchard)</span>
                </div>
              </div>

              {/* Progress bar if in progress */}
              {state.isShieldingInProgress && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] text-[#EBDEFA]">
                    <span>Compiling Zero-Knowledge Proof...</span>
                    <span>{state.zkProofProgress}%</span>
                  </div>
                  <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-[#7738FF] to-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${state.zkProofProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Shield Action CTA */}
            <div className="pt-2">
              <button
                onClick={handleExecuteShielding}
                disabled={state.transparentBalance <= 0 || state.isShieldingInProgress}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer hover:scale-[1.01]"
              >
                <Shield className="w-4 h-4" />
                <span>
                  {state.isShieldingInProgress 
                    ? `Sealing into Envelope (${state.zkProofProgress}%)...` 
                    : `Shield ${state.transparentBalance.toFixed(4)} ZEC (Make It Invisible) 🛡️`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ── PHASE 4: TIME CAPSULE MEMO (PRIVATE SEND) ─────────────── */}
        {state.currentStep === 4 && (
          <div className="space-y-4 animate-fade-in font-sans">
            
            {/* Co-Pilot Briefing Card */}
            <div className="p-4 rounded-2xl bg-[#5632F5]/10 border border-[#7738FF]/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D580FA]">
                <Sparkles className="w-4 h-4 text-[#D580FA]" />
                <span>FLIGHT INSTRUCTOR BRIEFING</span>
              </div>
              <p className="text-xs text-[#ECEAF5] leading-relaxed">
                Now write a letter to your future self (or recipient). On Bitcoin or Ethereum, payment notes are public plaintext broadcast to the whole world. On Zcash, memos are <strong>sealed inside the private envelope</strong>—only the recipient can decrypt it.
              </p>
            </div>

            {/* Encrypted Letter Pad */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
                <span>Time Capsule Letter Pad</span>
                <span className={`text-[10px] ${isMemoTooLong ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                  {memoByteCount} / 512 bytes
                </span>
              </div>

              {/* Textarea */}
              <div className="space-y-1.5 font-sans">
                <textarea
                  rows={3}
                  value={sendMemo}
                  onChange={(e) => setSendMemo(e.target.value)}
                  placeholder="Write a message to your future self..."
                  className="w-full bg-black/50 border border-white/[0.1] rounded-xl p-3 text-xs text-white focus:border-[#7738FF] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Preset Quick Fill Buttons */}
              <div className="flex items-center space-x-2 font-sans">
                <button
                  type="button"
                  onClick={() => setSendMemo('Dear future me: Privacy is an inviolable human right. Sealed with Zero-Knowledge proofs on Zcash.')}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-zinc-300 transition cursor-pointer"
                >
                  ✉️ "Letter to Future Self"
                </button>
                <button
                  type="button"
                  onClick={() => setSendMemo('Payment verified: Sovereign transaction completed with Zero-Knowledge protection. cc @zksnarks_')}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-zinc-300 transition cursor-pointer"
                >
                  🛡️ "Sovereign Receipt"
                </button>
              </div>

              <div className="flex justify-between items-center text-[11px] pt-1 text-zinc-400">
                <span>Transaction Value:</span>
                <span className="font-bold text-white font-mono">1.0000 ZEC</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={handleSendPrivateMemo}
                disabled={isSending || isMemoTooLong}
                className="w-full py-3.5 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(119,56,255,0.4)] disabled:opacity-40 cursor-pointer hover:scale-[1.01]"
              >
                <Mail className="w-4 h-4" />
                <span>{isSending ? 'Encrypting & Transmitting...' : 'Transmit Sealed Letter (Private z-to-z Send) ✉️'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ── PHASE 5: GRADUATION (KEY VAULT & REAL FLIGHT) ─────────── */}
        {state.currentStep === 5 && (
          <div className="space-y-4 animate-fade-in font-sans">
            
            {/* Celebratory Award Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#5632F5]/25 via-[#7738FF]/20 to-[#D580FA]/15 border border-[#7738FF]/50 text-center space-y-3 shadow-[0_10px_30px_-10px_rgba(119,56,255,0.4)]">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#5632F5]/30 border border-[#7738FF]/50 flex items-center justify-center text-[#D580FA] shadow-[0_0_20px_rgba(119,56,255,0.4)]">
                <Award className="w-6 h-6 text-[#D580FA]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#5632F5]/30 text-[#EBDEFA] border border-[#5632F5]/50">
                  Mission Accomplished
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-1.5">You’re Flight Certified! 🏆</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto mt-1 leading-relaxed">
                  You successfully tested receiving coins, shielding into the envelope, and sending an encrypted time capsule with zero risk.
                </p>
              </div>

              <div className="pt-1 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  onClick={onOpenCertificate}
                  className="py-3 px-6 bg-gradient-to-r from-[#7738FF] to-[#D580FA] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_25px_rgba(119,56,255,0.5)] cursor-pointer hover:scale-[1.02]"
                >
                  <Award className="w-4 h-4" />
                  <span>View Flight Certificate & Share on X 🚀</span>
                </button>
              </div>
            </div>

            {/* Optional Practice 24-Word Master Key Vault */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-zinc-400">
                <div className="flex items-center space-x-1.5 font-sans">
                  <Key className="w-3.5 h-3.5 text-[#D580FA]" />
                  <span className="font-semibold text-white">Practice Recovery Key (24 Words)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSeed(!showSeed)}
                    className="text-zinc-400 hover:text-white text-[10px] flex items-center space-x-1 cursor-pointer"
                  >
                    {showSeed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSeed ? 'Hide' : 'Reveal'}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(state.seedPhrase.join(' '))}
                    className="text-[#D580FA] hover:text-white text-[10px] flex items-center space-x-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleRegenerateSeed}
                    title="Generate new 24 words"
                    className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 font-sans leading-normal">
                In real wallets like Zashi, your wallet generates a secret 24-word key like this. Write it down and never share it.
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 text-xs">
                {state.seedPhrase.map((word, i) => (
                  <div
                    key={i}
                    className="bg-black/40 px-2 py-1.5 rounded-lg border border-white/5 text-zinc-200 flex items-center justify-between"
                  >
                    <span className="text-zinc-500 text-[10px] font-mono">{i + 1}</span>
                    <span className="truncate font-mono">{showSeed ? word : '••••'}</span>
                  </div>
                ))}
              </div>

              {/* Wallet Profile Selection */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-sans">
                <span className="text-zinc-400">Target Mobile Client:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => onUpdateState({ selectedWalletClient: 'zashi' })}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition cursor-pointer ${
                      state.selectedWalletClient === 'zashi'
                        ? 'border-[#7738FF] bg-[#5632F5]/25 text-[#ECEAF5] font-bold'
                        : 'border-white/5 bg-black/20 text-zinc-400'
                    }`}
                  >
                    Zashi (Official ECC)
                  </button>
                  <button
                    onClick={() => onUpdateState({ selectedWalletClient: 'ywallet' })}
                    className={`px-2.5 py-1 rounded-lg border text-xs transition cursor-pointer ${
                      state.selectedWalletClient === 'ywallet'
                        ? 'border-[#7738FF] bg-[#5632F5]/25 text-[#ECEAF5] font-bold'
                        : 'border-white/5 bg-black/20 text-zinc-400'
                    }`}
                  >
                    Ywallet (Power User)
                  </button>
                </div>
              </div>
            </div>

            {/* Install Real Wallet Links */}
            <div className="pt-1">
              <a
                href={state.selectedWalletClient === 'zashi' ? 'https://zashi.org' : 'https://ywallet.app'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition"
              >
                <Download className="w-4 h-4 text-[#D580FA]" />
                <span>Install Official Mobile Wallet ({state.selectedWalletClient === 'zashi' ? 'Zashi' : 'Ywallet'})</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-1" />
              </a>
            </div>
          </div>
        )}

      </div>

      {/* ── Cockpit Footer Progress Indicator ─────────────────────── */}
      <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-zinc-400 font-sans">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono">
            {state.currentStep === 1 && 'Objective: Compare Transparent vs Shielded views on the radar'}
            {state.currentStep === 2 && 'Objective: Claim 5.00 practice coins into transparent address'}
            {state.currentStep === 3 && 'Objective: Seal coins into Orchard zero-knowledge pool'}
            {state.currentStep === 4 && 'Objective: Transmit encrypted time capsule note to future self'}
            {state.currentStep === 5 && 'Mastery Achieved: Ready for real-world shielded flight'}
          </span>
        </div>

        <span className="text-[11px] font-mono text-[#D580FA]">
          Step {state.currentStep} of 5
        </span>
      </div>

    </div>
  );
};
