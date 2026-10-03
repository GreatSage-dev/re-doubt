import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Copy, 
  Check, 
  Smartphone, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  FileText, 
  Sparkles,
  QrCode,
  Download,
  AlertCircle,
  ExternalLink,
  Award,
  Terminal,
  Zap,
  Key,
  Layers
} from 'lucide-react';
import QRCode from 'qrcode';
import { FlightStepId, SimulatorState } from '../types';
import { generateRealMnemonic } from '../crypto/bip39';
import { buildZip321Uri, CANONICAL_TEST_ADDRESSES, getMemoByteLength, inspectZcashAddress } from '../crypto/zcash';

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
  const [showSeed, setShowSeed] = useState(false);
  const [quizWordIndex, setQuizWordIndex] = useState(6);
  const [quizInput, setQuizInput] = useState('');
  const [quizError, setQuizError] = useState(false);

  // Send state
  const [recipientInput, setRecipientInput] = useState(CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE);
  const [sendAmount, setSendAmount] = useState('1.00');
  const [sendMemo, setSendMemo] = useState('Payment from Shadow-Run flight simulator 🚀');
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

  useEffect(() => {
    if (state.currentStep === 5) {
      const uri = buildZip321Uri({
        address: state.unifiedAddress || CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE,
        amount: 0.05,
        memo: 'Hello Zcash Shielded World - @zksnarks_'
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
  }, [state.currentStep, state.unifiedAddress]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateSeed = async () => {
    const { mnemonic } = await generateRealMnemonic(256);
    onUpdateState({ seedPhrase: mnemonic, isSeedBackedUp: false });
    setQuizWordIndex(Math.floor(Math.random() * 24));
    setQuizInput('');
    setQuizError(false);
    onLogEvent('BIP-39', 'Generated 256-bit fresh CSPRNG mnemonic (24 words)', 'info');
  };

  const handleVerifySeedQuiz = () => {
    const targetWord = state.seedPhrase[quizWordIndex];
    if (!targetWord) return;
    if (quizInput.trim().toLowerCase() === targetWord.toLowerCase()) {
      onUpdateState({ isSeedBackedUp: true });
      setQuizError(false);
      onLogEvent('BIP-39', `Verified seed backup challenge for word #${quizWordIndex + 1}`, 'success');
      onAdvanceStep(2);
    } else {
      setQuizError(true);
      onLogEvent('BIP-39', `Failed seed backup verification (input "${quizInput}")`, 'warn');
    }
  };

  // Step 2: CEX Ingress
  const handleCexWithdraw = () => {
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
      transactions: [newTx, ...state.transactions]
    });

    onLogEvent('MEMPOOL', `Simulated CEX withdrawal of 5.000 ZEC to ${state.transparentAddress.substring(0, 14)}...`, 'warn');
    onLogEvent('MEMPOOL', `ALERT: Balance 5.000 ZEC now 100% visible on public block explorer`, 'warn');
    onAdvanceStep(3);
  };

  // Step 3: Orchard Shielding
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
      const shieldTx = {
        id: txId,
        timestamp: Date.now(),
        type: 'shield_to_orchard' as const,
        amount: transparentToShield,
        fee: 0.0001,
        sender: state.transparentAddress,
        recipient: state.unifiedAddress + ' (Orchard Pool)',
        memo: 'Auto-Shielded via Halo 2 Circuit',
        status: 'confirmed' as const,
        proofType: 'halo2_orchard_zk' as const,
        isSurveillanceVisible: false
      };

      onUpdateState({
        isShieldingInProgress: false,
        zkProofProgress: 100,
        transparentBalance: 0,
        shieldedBalance: Math.max(0, transparentToShield - 0.0001),
        transactions: [shieldTx, ...state.transactions]
      });

      onLogEvent('HALO2', 'Proof compiled in 27ms! Sinsemilla Merkle tree commit generated.', 'success');
      onLogEvent('ORCHARD', `Transferred ${(transparentToShield - 0.0001).toFixed(4)} ZEC into Orchard Pool. Address & balance cloaked.`, 'success');
      onAdvanceStep(4);
    }, 1100);
  };

  // Step 4: z-to-z Send
  const handleSendShielded = () => {
    const amt = parseFloat(sendAmount);
    const memoBytes = getMemoByteLength(sendMemo);
    if (isNaN(amt) || amt <= 0 || amt > state.shieldedBalance - 0.0001 || memoBytes > 512 || isSending) {
      return;
    }

    setIsSending(true);
    onLogEvent('HALO2', `Constructing Action transfer for ${amt.toFixed(4)} ZEC with ${memoBytes}B in-band memo...`, 'circuit');

    timersRef.current.timeout = setTimeout(() => {
      setIsSending(false);
      const txId = 'tx_z2z_' + Math.random().toString(36).substring(2, 9);
      const sendTx = {
        id: txId,
        timestamp: Date.now(),
        type: 'shielded_send' as const,
        amount: amt,
        fee: 0.0001,
        sender: 'Orchard Shielded Note [CLOAKED]',
        recipient: recipientInput,
        memo: sendMemo,
        status: 'confirmed' as const,
        proofType: 'halo2_orchard_zk' as const,
        isSurveillanceVisible: false
      };

      onUpdateState({
        shieldedBalance: Math.max(0, state.shieldedBalance - amt - 0.0001),
        transactions: [sendTx, ...state.transactions]
      });

      onLogEvent('ORCHARD', `Shielded note sealed: Nullifier derived. Zero metadata broadcast.`, 'success');
      onAdvanceStep(5);
    }, 900);
  };

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[#0E0C1C]/95 p-6 flex flex-col justify-between h-[740px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.3)] backdrop-blur-xl relative overflow-hidden select-none">
      
      {/* Top Gradient Sheen */}
      <div 
        className="absolute inset-x-0 top-0 h-[80px] pointer-events-none opacity-80"
        style={{
          background: 'linear-gradient(180deg, rgba(161, 106, 222, 0.35) 0%, rgba(119, 56, 255, 0.1) 60%, transparent 100%)',
          mixBlendMode: 'plus-lighter',
        }}
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
              {state.currentStep === 1 && 'Cryptographic Vault'}
              {state.currentStep === 2 && 'CEX Ingress (t-address)'}
              {state.currentStep === 3 && 'Halo 2 Orchard Cloak'}
              {state.currentStep === 4 && 'z-to-z Encrypted Transfer'}
              {state.currentStep === 5 && 'Mobile Scan & Mastery'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#ECEAF5] mt-1 tracking-tight">
            {state.currentStep === 1 && 'BIP-39 Master Key Generation'}
            {state.currentStep === 2 && 'Exchange Ingress & Public Leakage'}
            {state.currentStep === 3 && 'Synthesizing the Orchard Shield'}
            {state.currentStep === 4 && 'Private z-to-z Note with In-Band Memo'}
            {state.currentStep === 5 && 'ZIP-321 Certified Mobile Readiness'}
          </h2>
        </div>

        <div className="text-right font-mono text-[11px]">
          <span className="text-zinc-500 block">Balance</span>
          <span className="font-bold text-emerald-400">
            {state.shieldedBalance > 0 ? `${state.shieldedBalance.toFixed(4)} ZEC (ZK)` : `${state.transparentBalance.toFixed(4)} ZEC`}
          </span>
        </div>
      </div>

      {/* ── Active Phase Viewport ─────────────────────────────────── */}
      <div className="relative z-10 flex-1 overflow-y-auto py-4 space-y-4">
        
        {/* ── PHASE 1: CRYPTOGRAPHIC SEED VAULT ────────────────────── */}
        {state.currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            {/* Client selector pills */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Target Client Profile:</span>
              <div className="flex space-x-1.5">
                <button
                  onClick={() => onUpdateState({ selectedWalletClient: 'zashi' })}
                  className={`px-3 py-1 rounded-lg border text-xs transition ${
                    state.selectedWalletClient === 'zashi'
                      ? 'border-[#7738FF] bg-[#5632F5]/25 text-[#ECEAF5] font-bold shadow-sm'
                      : 'border-white/5 bg-black/20 text-zinc-400'
                  }`}
                >
                  Zashi (Official ECC)
                </button>
                <button
                  onClick={() => onUpdateState({ selectedWalletClient: 'ywallet' })}
                  className={`px-3 py-1 rounded-lg border text-xs transition ${
                    state.selectedWalletClient === 'ywallet'
                      ? 'border-[#7738FF] bg-[#5632F5]/25 text-[#ECEAF5] font-bold shadow-sm'
                      : 'border-white/5 bg-black/20 text-zinc-400'
                  }`}
                >
                  Ywallet (Power-User)
                </button>
              </div>
            </div>

            {/* 24-Word Seed Grid Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Key className="w-3.5 h-3.5 text-[#D580FA]" />
                  <span className="text-zinc-300 font-semibold text-[11px]">256-Bit WebCrypto CSPRNG Master Mnemonic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSeed(!showSeed)}
                    className="text-zinc-400 hover:text-zinc-200 text-xs flex items-center space-x-1"
                  >
                    {showSeed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{showSeed ? 'Hide' : 'Reveal'}</span>
                  </button>
                  <button
                    onClick={handleRegenerateSeed}
                    title="Generate fresh cryptographic seed"
                    className="text-[#D580FA] hover:text-white p-1 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

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
            </div>

            {/* Seed Backup Challenge Verification */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-2.5 font-mono">
              <div className="text-xs text-zinc-300 font-medium">
                Flight Verification Challenge: What is word <span className="text-[#D580FA] font-bold">#{quizWordIndex + 1}</span>?
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type word to confirm..."
                  value={quizInput}
                  onChange={(e) => {
                    setQuizInput(e.target.value);
                    setQuizError(false);
                  }}
                  className="flex-1 bg-black/50 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-[#7738FF] focus:outline-none"
                />
                <button
                  onClick={handleVerifySeedQuiz}
                  className="px-5 py-2 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-semibold rounded-xl text-xs transition shadow-[0_0_15px_rgba(119,56,255,0.4)] cursor-pointer"
                >
                  Verify Key & Proceed →
                </button>
              </div>
              {quizError && (
                <p className="text-[11px] text-rose-400">
                  Word mismatch! (Word #{quizWordIndex + 1} is "{state.seedPhrase[quizWordIndex]}")
                </p>
              )}
            </div>
          </div>
        )}

        {/* ── PHASE 2: CEX INGRESS & PUBLIC LEAKAGE ────────────────── */}
        {state.currentStep === 2 && (
          <div className="space-y-4 animate-fade-in font-mono">
            {/* Transparent Address Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-white">Your Transparent Ingress Address (t1...)</span>
                <span className="text-rose-400 text-[10px] bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>100% PUBLIC EXPOSURE</span>
                </span>
              </div>
              <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-xs text-zinc-300 flex items-center justify-between select-all">
                <span className="truncate">{state.transparentAddress}</span>
                <button onClick={() => handleCopy(state.transparentAddress)} className="ml-2 text-zinc-400 hover:text-white">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Simulated CEX Ingress Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span>Simulated Exchange Ingress</span>
                <span className="text-[#D580FA]">Binance / Coinbase Hot Wallet</span>
              </div>

              <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-1.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Asset:</span>
                  <span className="text-white font-bold">ZEC (Zcash)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Withdrawal Amount:</span>
                  <span className="text-[#D580FA] font-bold">5.00000000 ZEC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Network:</span>
                  <span className="text-zinc-300">Zcash Transparent Protocol (t-address)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-sans leading-relaxed">
                ⚠️ <strong>The Transparent Trap:</strong> Centralized exchanges only pay out to transparent addresses. Anyone looking at block explorers can see your exact balance, transaction history, and exchange origin!
              </div>

              <button
                onClick={handleCexWithdraw}
                className="w-full py-3 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(119,56,255,0.4)] cursor-pointer"
              >
                <span>Execute Exchange Withdrawal (5.0 ZEC)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── PHASE 3: ORCHARD SHIELDING ENGINE ────────────────────── */}
        {state.currentStep === 3 && (
          <div className="space-y-4 animate-fade-in font-mono">
            {/* Balance Dual Meters */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl bg-[#0A0815]/90 p-4 border border-rose-500/30 text-center">
                <div className="text-[10px] text-rose-400 uppercase font-bold">Transparent Pool</div>
                <div className="text-xl font-bold text-white mt-1">
                  {state.transparentBalance.toFixed(4)} ZEC
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">Naked on Explorer</div>
              </div>

              <div className="rounded-2xl bg-[#0A0815]/90 p-4 border border-emerald-500/30 text-center">
                <div className="text-[10px] text-emerald-400 uppercase font-bold">Orchard Shielded</div>
                <div className="text-xl font-bold text-emerald-300 mt-1">
                  {state.shieldedBalance.toFixed(4)} ZEC
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">100% Zero-Knowledge</div>
              </div>
            </div>

            {/* Postcard vs Envelope Analogy */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 text-xs space-y-2 font-sans">
              <div className="flex items-start space-x-2.5">
                <FileText className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300">Transparent (Postcard):</strong> Anyone processing the block can inspect sender, receiver, balance, and timestamps.
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">Shielded (Sealed Envelope):</strong> Ownership commitments are converted into mathematical zero-knowledge proofs.
                </div>
              </div>
            </div>

            {/* Shield Action CTA */}
            {state.transparentBalance > 0 ? (
              <button
                onClick={handleExecuteShielding}
                disabled={state.isShieldingInProgress}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {state.isShieldingInProgress ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Compiling Halo 2 ZK Proof ({state.zkProofProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Shield {state.transparentBalance.toFixed(2)} ZEC into Orchard Pool</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <p className="text-xs text-emerald-300 font-medium">
                  ✓ Funds completely insulated inside Orchard zero-knowledge pool!
                </p>
                <button
                  onClick={() => onAdvanceStep(4)}
                  className="px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl text-xs cursor-pointer hover:bg-emerald-400 transition"
                >
                  Proceed to Step 4: Private z-to-z Send →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PHASE 4: PRIVATE Z-TO-Z TRANSFER & MEMO ─────────────── */}
        {state.currentStep === 4 && (
          <div className="space-y-3.5 animate-fade-in font-mono">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-3.5 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Available Orchard Balance:</span>
              <span className="font-bold text-emerald-400">{state.shieldedBalance.toFixed(4)} ZEC</span>
            </div>

            {/* Recipient Input */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Recipient Unified Address (u1...)</label>
              <input
                type="text"
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
                className="w-full bg-[#0A0815] border border-white/[0.1] rounded-xl p-2.5 text-xs text-zinc-200 truncate focus:border-[#7738FF] focus:outline-none"
              />
            </div>

            {/* Amount Input */}
            <div className="space-y-1">
              <label className="text-[11px] text-zinc-400">Amount (ZEC)</label>
              <input
                type="text"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full bg-[#0A0815] border border-white/[0.1] rounded-xl p-2.5 text-xs text-zinc-200 focus:border-[#7738FF] focus:outline-none"
              />
            </div>

            {/* In-Band Encrypted Memo */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-[#D580FA]" />
                  <span>512-Byte In-Band Encrypted Memo (ZIP-302)</span>
                </span>
                <span className={`text-[10px] ${getMemoByteLength(sendMemo) > 512 ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                  {getMemoByteLength(sendMemo)} / 512 bytes {getMemoByteLength(sendMemo) > 512 && '(Exceeds limit!)'}
                </span>
              </div>
              <textarea
                rows={2}
                value={sendMemo}
                onChange={(e) => setSendMemo(e.target.value)}
                className={`w-full bg-[#0A0815] border rounded-xl p-2.5 text-xs text-zinc-200 resize-none focus:outline-none ${
                  getMemoByteLength(sendMemo) > 512 ? 'border-rose-500/50' : 'border-white/[0.1] focus:border-[#7738FF]'
                }`}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendShielded}
              disabled={
                isSending || 
                state.shieldedBalance <= 0 || 
                getMemoByteLength(sendMemo) > 512 || 
                isNaN(parseFloat(sendAmount)) || 
                parseFloat(sendAmount) <= 0 || 
                parseFloat(sendAmount) > state.shieldedBalance - 0.0001
              }
              className="w-full py-3 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_20px_rgba(119,56,255,0.4)] disabled:opacity-40 cursor-pointer"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Broadcasting Encrypted Note...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Broadcast Shielded Transaction (Zero Surveillance)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* ── PHASE 5: REAL WORLD FLIGHT PLAN & CERTIFICATION ──────── */}
        {state.currentStep === 5 && (
          <div className="space-y-4 animate-fade-in text-center font-mono">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3">
              <div className="inline-flex p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">ZIP-321 Certified Mobile QR Code</h3>
              <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto">
                Scan directly using official mobile clients (Zashi or Ywallet) on iOS or Android.
              </p>

              {qrDataUrl && (
                <div className="flex justify-center my-2">
                  <div className="p-2 bg-white rounded-2xl shadow-xl">
                    <img src={qrDataUrl} alt="Zcash ZIP 321 QR Code" className="w-36 h-36" />
                  </div>
                </div>
              )}

              <div className="text-[11px] text-zinc-400 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span>Standard ZIP-321 URI with base64-encoded in-band memo payload verified.</span>
              </div>
            </div>

            <button
              onClick={onOpenCertificate}
              className="w-full py-3.5 bg-gradient-to-r from-[#7738FF] to-[#D580FA] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-[0_0_25px_rgba(119,56,255,0.5)] cursor-pointer hover:scale-[1.01]"
            >
              <Award className="w-4 h-4" />
              <span>Claim Your Shielded Flight Certificate 🏆</span>
            </button>
          </div>
        )}

      </div>

      {/* ── Cockpit Footer Actions ─────────────────────────────────── */}
      <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>WebCrypto Sandbox Active</span>
        </div>
        <div className="text-[10px] text-zinc-500">
          Zero capital at risk · Memory isolated
        </div>
      </div>

    </div>
  );
};
