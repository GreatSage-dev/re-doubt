import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';
import QRCode from 'qrcode';
import { FlightStepId, SimulatorState } from '../types';
import { generateRealMnemonic } from '../crypto/bip39';
import { buildZip321Uri, CANONICAL_TEST_ADDRESSES } from '../crypto/zcash';

interface VirtualPhoneProps {
  state: SimulatorState;
  onUpdateState: (partial: Partial<SimulatorState>) => void;
  onAdvanceStep: (nextStep: FlightStepId) => void;
  onOpenCertificate: () => void;
}

export const VirtualPhone: React.FC<VirtualPhoneProps> = ({
  state,
  onUpdateState,
  onAdvanceStep,
  onOpenCertificate,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSeed, setShowSeed] = useState(false);
  const [quizWordIndex, setQuizWordIndex] = useState(6);
  const [quizInput, setQuizInput] = useState('');
  const [quizError, setQuizError] = useState(false);

  // Send screen state
  const [recipientInput, setRecipientInput] = useState(CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE);
  const [sendAmount, setSendAmount] = useState('1.00');
  const [sendMemo, setSendMemo] = useState('Payment from Shadow-Run flight simulator 🚀');
  const [isSending, setIsSending] = useState(false);

  // QR Code for Step 5
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Generate QR code when entering Step 5
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
  };

  const handleVerifySeedQuiz = () => {
    const targetWord = state.seedPhrase[quizWordIndex];
    if (quizInput.trim().toLowerCase() === targetWord.toLowerCase()) {
      onUpdateState({ isSeedBackedUp: true });
      setQuizError(false);
      onAdvanceStep(2);
    } else {
      setQuizError(true);
    }
  };

  // Step 2: Simulate CEX Funding
  const handleCexWithdraw = () => {
    const newTx = {
      id: 'tx_cex_' + Math.random().toString(36).substring(2, 9),
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

    onAdvanceStep(3);
  };

  // Step 3: Simulate Shielding into Orchard Pool
  const handleExecuteShielding = () => {
    onUpdateState({ isShieldingInProgress: true, zkProofProgress: 10 });

    const interval = setInterval(() => {
      onUpdateState({
        zkProofProgress: Math.min(100, state.zkProofProgress + 25)
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      const shieldTx = {
        id: 'tx_shield_' + Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        type: 'shield_to_orchard' as const,
        amount: state.transparentBalance,
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
        shieldedBalance: state.transparentBalance - 0.0001,
        transactions: [shieldTx, ...state.transactions]
      });

      onAdvanceStep(4);
    }, 1400);
  };

  // Step 4: Simulate Sending Private Shielded Note
  const handleSendShielded = () => {
    const amt = parseFloat(sendAmount) || 1.0;
    if (amt > state.shieldedBalance) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      const sendTx = {
        id: 'tx_z2z_' + Math.random().toString(36).substring(2, 9),
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
        shieldedBalance: state.shieldedBalance - amt - 0.0001,
        transactions: [sendTx, ...state.transactions]
      });

      onAdvanceStep(5);
    }, 1000);
  };

  return (
    <div className="w-full flex justify-center">
      {/* Smartphone Hardware Frame */}
      <div className="w-full max-w-[390px] h-[780px] bg-[#0E0C1C] rounded-[48px] border-4 border-[#4D3D75]/40 p-3 shadow-[0_25px_60px_-15px_rgba(86,50,245,0.35)] relative flex flex-col justify-between overflow-hidden">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-between px-3">
          <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700"></div>
        </div>

        {/* Inner Phone Screen */}
        <div className="w-full h-full bg-[#0A0815] rounded-[38px] pt-7 pb-4 px-4 flex flex-col justify-between overflow-y-auto relative">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2 border-b border-zinc-800/60 pb-2">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-zinc-300 font-semibold uppercase">{state.selectedWalletClient}</span>
            </span>
            <span className="text-[10px] bg-[#1A1538] px-2 py-0.5 rounded text-[#EBDEFA] border border-white/5">
              {state.currentStep === 1 && 'VAULT SETUP'}
              {state.currentStep === 2 && 'CEX INGRESS'}
              {state.currentStep === 3 && 'SHIELD ENGINE'}
              {state.currentStep === 4 && 'PRIVATE TRANSFER'}
              {state.currentStep === 5 && 'FLIGHT CERTIFIED'}
            </span>
          </div>

          {/* SCREEN CONTENT BY STEP */}
          <div className="flex-1 flex flex-col justify-center">

            {/* STEP 1: WALLET SETUP & SEED VAULT */}
            {state.currentStep === 1 && (
              <div className="space-y-3.5">
                <div className="text-center">
                  <div className="inline-flex p-2.5 rounded-2xl bg-[#5632F5]/20 text-[#D580FA] border border-[#5632F5]/40 mb-1.5 shadow-[0_0_15px_rgba(86,50,245,0.3)]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-bold text-white">Create Your Seed Vault</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Your 24-word cryptographic master key. Never share this with anyone.
                  </p>
                </div>

                {/* Wallet Selection toggle */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onUpdateState({ selectedWalletClient: 'zashi' })}
                    className={`py-1.5 px-2 rounded-lg border text-center transition ${
                      state.selectedWalletClient === 'zashi'
                        ? 'border-[#7738FF] bg-[#5632F5]/20 text-[#EBDEFA] font-semibold shadow-sm'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    Zashi (Official ECC)
                  </button>
                  <button
                    onClick={() => onUpdateState({ selectedWalletClient: 'ywallet' })}
                    className={`py-1.5 px-2 rounded-lg border text-center transition ${
                      state.selectedWalletClient === 'ywallet'
                        ? 'border-[#7738FF] bg-[#5632F5]/20 text-[#EBDEFA] font-semibold shadow-sm'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    Ywallet (Power-User)
                  </button>
                </div>

                {/* 24-Word Seed Grid */}
                <div className="bg-zinc-950 rounded-xl p-2.5 border border-zinc-800 max-h-[220px] overflow-y-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-zinc-400 font-mono">BIP-39 Standard Entropy</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowSeed(!showSeed)}
                        className="text-zinc-400 hover:text-zinc-200 text-xs flex items-center space-x-1"
                      >
                        {showSeed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        <span className="text-[10px]">{showSeed ? 'Hide' : 'Reveal'}</span>
                      </button>
                      <button
                        onClick={handleRegenerateSeed}
                        title="Generate fresh cryptographic seed"
                        className="text-[#D580FA] hover:text-[#EBDEFA] text-xs"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                    {state.seedPhrase.map((word, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900/80 px-1.5 py-1 rounded border border-zinc-800/80 text-zinc-300 flex items-center justify-between"
                      >
                        <span className="text-zinc-500 text-[9px]">{i + 1}</span>
                        <span className="truncate">{showSeed ? word : '••••'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seed Backup Challenge */}
                <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/80 space-y-2">
                  <div className="text-[11px] font-medium text-zinc-300">
                    Verify Backup: What is word <span className="text-[#D580FA] font-bold">#{quizWordIndex + 1}</span>?
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
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:border-[#7738FF] focus:outline-none"
                    />
                    <button
                      onClick={handleVerifySeedQuiz}
                      className="px-3 py-1 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-semibold rounded-lg text-xs transition shadow-sm"
                    >
                      Confirm
                    </button>
                  </div>
                  {quizError && (
                    <p className="text-[10px] text-rose-400">
                      Word doesn't match! (Check word #{quizWordIndex + 1}: "{state.seedPhrase[quizWordIndex]}")
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: GETTING ZEC & CEX INGRESS */}
            {state.currentStep === 2 && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex p-2.5 rounded-2xl bg-[#5632F5]/20 text-[#D580FA] border border-[#5632F5]/40 mb-1 shadow-[0_0_15px_rgba(86,50,245,0.3)]">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-bold text-white">Getting ZEC from Exchanges</h2>
                  <p className="text-xs text-zinc-400">
                    Why exchanges only give you transparent addresses (<code className="text-[#D580FA] font-mono">t1...</code>).
                  </p>
                </div>

                {/* Your Transparent Wallet Address */}
                <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span>Your Transparent Address</span>
                    <span className="text-rose-400 text-[10px] flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>PUBLIC</span>
                    </span>
                  </div>
                  <div className="font-mono text-xs text-zinc-200 bg-zinc-900 p-1.5 rounded truncate select-all flex items-center justify-between">
                    <span className="truncate">{state.transparentAddress}</span>
                    <button onClick={() => handleCopy(state.transparentAddress)} className="ml-2 text-zinc-400 hover:text-white">
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Simulated CEX Withdrawal Panel */}
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                    <span>Simulated Exchange Withdrawal</span>
                    <span className="text-[10px] font-mono text-[#D580FA]">Binance / Coinbase</span>
                  </div>

                  <div className="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800 text-xs space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Asset:</span>
                      <span className="text-white font-mono font-bold">ZEC (Zcash)</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Amount:</span>
                      <span className="text-[#D580FA] font-mono font-bold">5.00000000 ZEC</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Network:</span>
                      <span className="text-zinc-300 font-mono">Zcash Transparent</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-[#5632F5]/15 border border-[#7738FF]/30 text-[10px] text-[#EBDEFA] leading-relaxed">
                    💡 <strong>Crucial Lesson:</strong> Exchanges only withdraw to transparent addresses. Your funds are not private yet!
                  </div>

                  <button
                    onClick={handleCexWithdraw}
                    className="w-full py-2.5 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-[#7738FF]/30"
                  >
                    <span>Confirm Exchange Withdrawal (5.0 ZEC)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: UNDERSTANDING SHIELDING & UN-SHIELDING */}
            {state.currentStep === 3 && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex p-2.5 rounded-2xl bg-[#5632F5]/20 text-[#D580FA] border border-[#5632F5]/40 mb-1 shadow-[0_0_15px_rgba(86,50,245,0.3)]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-bold text-white">Shielding: The Postcard vs. Envelope</h2>
                  <p className="text-xs text-zinc-400">
                    Move your coins from the public ledger into the Orchard ZK Pool.
                  </p>
                </div>

                {/* Balances Card */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-rose-500/30 text-center">
                    <div className="text-[10px] text-rose-400 font-mono uppercase">Transparent</div>
                    <div className="text-base font-bold text-white font-mono mt-0.5">
                      {state.transparentBalance.toFixed(4)} ZEC
                    </div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">Naked on Explorer</div>
                  </div>

                  <div className="bg-zinc-950 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                    <div className="text-[10px] text-emerald-400 font-mono uppercase">Orchard Shielded</div>
                    <div className="text-base font-bold text-emerald-300 font-mono mt-0.5">
                      {state.shieldedBalance.toFixed(4)} ZEC
                    </div>
                    <div className="text-[9px] text-zinc-500 mt-0.5">100% Zero-Knowledge</div>
                  </div>
                </div>

                {/* Analogy Visual */}
                <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-[11px] space-y-1.5">
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-rose-300">Transparent (Postcard):</strong> Anyone handling the mail reads the amount, sender, and receiver.
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-300">Shielded (Sealed Envelope):</strong> Only you and your recipient possess the key to see inside.
                    </div>
                  </div>
                </div>

                {/* Action CTA: Shield Funds */}
                {state.transparentBalance > 0 ? (
                  <button
                    onClick={handleExecuteShielding}
                    disabled={state.isShieldingInProgress}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {state.isShieldingInProgress ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compiling Halo 2 ZK Proof ({state.zkProofProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Shield {state.transparentBalance.toFixed(2)} ZEC to Orchard Pool</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center space-y-2">
                    <p className="text-xs text-emerald-300 font-medium">
                      ✓ Funds are now completely shielded!
                    </p>
                    <button
                      onClick={() => onAdvanceStep(4)}
                      className="px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg text-xs"
                    >
                      Proceed to Step 4: Send Shielded Transaction →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: SENDING & RECEIVING SHIELDED ZEC */}
            {state.currentStep === 4 && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex p-2.5 rounded-2xl bg-[#5632F5]/20 text-[#D580FA] border border-[#5632F5]/40 mb-1 shadow-[0_0_15px_rgba(86,50,245,0.3)]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-base font-bold text-white">Send a Private z-to-z Note</h2>
                  <p className="text-xs text-zinc-400">
                    Send shielded funds with an encrypted memo. No public trace.
                  </p>
                </div>

                {/* Shielded Balance Available */}
                <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Shielded Balance:</span>
                  <span className="font-mono font-bold text-emerald-400">{state.shieldedBalance.toFixed(4)} ZEC</span>
                </div>

                {/* Recipient Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono">Recipient Unified Address (u1...)</label>
                  <input
                    type="text"
                    value={recipientInput}
                    onChange={(e) => setRecipientInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-zinc-200 truncate focus:border-[#7738FF] focus:outline-none"
                  />
                </div>

                {/* Amount Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono">Amount (ZEC)</label>
                  <input
                    type="text"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-zinc-200 focus:border-[#7738FF] focus:outline-none"
                  />
                </div>

                {/* Encrypted Memo */}
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-400 font-mono flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-[#D580FA]" />
                    <span>Encrypted Memo (ZIP-302, Max 512 Bytes)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={sendMemo}
                    onChange={(e) => setSendMemo(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs font-mono text-zinc-200 resize-none focus:border-[#7738FF] focus:outline-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendShielded}
                  disabled={isSending || state.shieldedBalance <= 0}
                  className="w-full py-2.5 bg-[#7738FF] hover:bg-[#8B4EFF] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-[#7738FF]/30 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Broadcasting Shielded Note...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Send Shielded Transaction</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STEP 5: REAL WORLD FLIGHT PLAN & CERTIFICATION */}
            {state.currentStep === 5 && (
              <div className="space-y-3 text-center">
                <div className="inline-flex p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <QrCode className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold text-white">Flight Certified: Real World Scan</h2>
                <p className="text-xs text-zinc-400">
                  Scan this real ZIP-321 QR code using Zashi or Ywallet on iOS / Android.
                </p>

                {/* Generated Real Scannable QR Code */}
                {qrDataUrl && (
                  <div className="flex justify-center my-2">
                    <div className="p-2 bg-white rounded-2xl shadow-xl">
                      <img src={qrDataUrl} alt="Zcash ZIP 321 QR Code" className="w-36 h-36" />
                    </div>
                  </div>
                )}

                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                  <span>Standard ZIP-321 URI with encrypted memo parameter ready for mobile scanning.</span>
                </div>

                {/* Flight Certificate Button */}
                <button
                  onClick={onOpenCertificate}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-500/20"
                >
                  <Award className="w-4 h-4" />
                  <span>Claim Your Shielded Flight Certificate</span>
                </button>
              </div>
            )}

          </div>

          {/* Bottom Home Indicator */}
          <div className="w-28 h-1 bg-zinc-700 rounded-full mx-auto mt-2"></div>
        </div>
      </div>
    </div>
  );
};
