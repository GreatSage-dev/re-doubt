import React, { useState } from 'react';
import { 
  EyeOff, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Terminal, 
  Cpu, 
  Layers, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink,
  Zap,
  Activity,
  Code2
} from 'lucide-react';
import { SimulatorState } from '../types';
import { inspectZcashAddress, CANONICAL_TEST_ADDRESSES } from '../crypto/zcash';

interface ConsoleInspectorProps {
  state: SimulatorState;
}

function textToHex(text: string): string {
  const bytes = new TextEncoder().encode(text);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export const ConsoleInspector: React.FC<ConsoleInspectorProps> = ({ state }) => {
  const [activeTab, setActiveTab] = useState<'panopticon' | 'circuits' | 'zip316' | 'rpc'>('panopticon');
  const [customAddress, setCustomAddress] = useState('');
  const [copiedRpc, setCopiedRpc] = useState(false);
  const [showTechnicalMatrix, setShowTechnicalMatrix] = useState(false);

  const decodedCustom = customAddress ? inspectZcashAddress(customAddress) : null;
  const latestTx = state.transactions[0];
  const isCurrentlyShielded = state.currentStep >= 3 && state.shieldedBalance > 0;

  // Real-world JSON-RPC payload matching current step
  const getRpcPayload = () => {
    switch (state.currentStep) {
      case 1:
        return JSON.stringify({
          jsonrpc: "2.0",
          id: "req_vault_init",
          method: "z_getnewaddress",
          params: ["orchard"]
        }, null, 2);
      case 2:
        return JSON.stringify({
          jsonrpc: "2.0",
          id: "req_cex_ingress",
          method: "getrawtransaction",
          params: [latestTx ? latestTx.id : "tx_cex_pending", 1]
        }, null, 2);
      case 3:
        return JSON.stringify({
          jsonrpc: "2.0",
          id: "req_halo2_shield",
          method: "z_shieldcoinbase",
          params: [
            state.transparentAddress,
            state.unifiedAddress,
            0.0001,
            1
          ]
        }, null, 2);
      case 4:
        return JSON.stringify({
          jsonrpc: "2.0",
          id: "req_z2z_send",
          method: "z_sendmany",
          params: [
            state.unifiedAddress,
            [{
              address: CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE,
              amount: 1.0,
              memo: textToHex("Payment from Redoubt flight simulator 🚀")
            }],
            1,
            0.0001
          ]
        }, null, 2);
      default:
        return JSON.stringify({
          jsonrpc: "2.0",
          id: "req_blockchain_info",
          method: "getblockchaininfo",
          params: []
        }, null, 2);
    }
  };

  const handleCopyRpc = () => {
    navigator.clipboard.writeText(getRpcPayload());
    setCopiedRpc(true);
    setTimeout(() => setCopiedRpc(false), 2000);
  };

  return (
    <div className="rounded-[28px] border border-white/[0.08] bg-[#0E0C1C]/95 flex flex-col h-[740px] shadow-[0_20px_50px_-20px_rgba(86,50,245,0.3)] backdrop-blur-xl overflow-hidden">
      
      {/* ── Inspector Tab Navigation Bar ─────────────────────────── */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/[0.08] bg-[#0A0815]/90">
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto">
          {[
            { id: 'panopticon', label: 'Panopticon Ledger', icon: EyeOff },
            { id: 'circuits', label: 'Halo 2 Circuit', icon: Cpu },
            { id: 'zip316', label: 'ZIP-316 Deconstructor', icon: Layers },
            { id: 'rpc', label: 'JSON-RPC Payload', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-mono transition whitespace-nowrap ${
                  isActive
                    ? 'bg-[#5632F5]/25 text-[#ECEAF5] border border-[#7738FF]/50 shadow-[0_0_15px_rgba(119,56,255,0.25)]'
                    : 'text-[#8E8BA3] hover:text-[#ECEAF5] hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D580FA]' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center space-x-2 font-mono text-[10px] text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>DIAGNOSTICS READY</span>
        </div>
      </div>

      {/* ── Content Viewport ────────────────────────────────────────── */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs font-mono">
        
        {/* ── TAB 1: PANOPTICON SURVEILLANCE LEDGER ──────────────────── */}
        {activeTab === 'panopticon' && (() => {
          const isShielded = state.currentStep === 1 
            ? state.radarPreview === 'shielded' 
            : state.currentStep >= 3;

          return (
            <div className="space-y-4 animate-fade-in">
              {/* Dynamic Status Alert Banner */}
              {state.currentStep === 1 ? (
                isShielded ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 font-bold text-xs uppercase">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>RADAR PREVIEW: THE ENVELOPE (SHIELDED u1...)</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">100% PRIVATE</span>
                    </div>
                    <p className="text-xs text-emerald-200/90 leading-relaxed font-sans">
                      In the <strong>Orchard Shielded Pool</strong>, your funds are sealed inside an opaque cryptographic envelope. Halo 2 zero-knowledge proofs verify that you have valid coins without revealing who you are, who received them, or how much was sent.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 font-bold text-xs uppercase">
                        <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                        <span>RADAR PREVIEW: THE POSTCARD (TRANSPARENT t1...)</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">100% PUBLIC</span>
                    </div>
                    <p className="text-xs text-rose-200/90 leading-relaxed font-sans">
                      A <strong>Transparent Address</strong> is like sending a postcard through the mail. Anyone running a block explorer, blockchain analytics firm, or government agency can see your balance, trace who you send money to, and link it to your exchange KYC identity.
                    </p>
                  </div>
                )
              ) : state.currentStep === 2 ? (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-xs uppercase">
                      <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span>SURVEILLANCE EXPOSED: 5.0000 ZEC LEAKED ON PUBLIC LEDGER</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono">PUBLIC</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed font-sans">
                    You withdrew from Binance into a transparent address (<code className="text-rose-300 font-mono">t1...</code>). Your 5.0000 ZEC balance is now public knowledge on the blockchain explorer below.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-bold text-xs uppercase">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <span>ZERO-KNOWLEDGE SHIELD ACTIVE: 100% PRIVATE</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">ORCHARD ZK</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed font-sans">
                    Your funds are sealed inside the <strong>Orchard Shielded Pool</strong>. Public balance is 0.00 ZEC. Halo 2 zero-knowledge proofs prove transaction validity mathematically without revealing sender, receiver, balance, or memo metadata.
                  </p>
                </div>
              )}

              {/* Step 4 Special: Time Capsule Dual View */}
              {state.currentStep === 4 && (
                <div className="rounded-2xl border border-[#7738FF]/40 bg-[#120E29] p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#D580FA]">
                    <span>TIME CAPSULE: SAME LETTER, TWO VIEWS</span>
                    <span className="text-[10px] text-zinc-400">ZIP-302 ENCRYPTED MEMO</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        ✓ What You and Recipient See:
                      </span>
                      <p className="text-zinc-200 font-sans italic text-xs leading-relaxed">
                        "{state.practiceMemo || 'Dear future me, privacy is a human right. Sealed with Zero-Knowledge.'}"
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-rose-500/30 space-y-1.5">
                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                        👁️ What Public Surveillance Sees:
                      </span>
                      <p className="text-zinc-500 font-mono text-[10px] break-all leading-relaxed">
                        0x8f2a9c41b802e3... [CIPHERTEXT ENCRYPTED · CHACHA20-POLY1305 · 0 BYTES LEAKED]
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Differential Matrix: Public Ledger vs Shielded Pool (Collapsible for Beginners) */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowTechnicalMatrix(!showTechnicalMatrix)}
                  className="w-full px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-semibold text-[#ECEAF5] hover:bg-white/[0.04] transition cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[#D580FA]">🔬</span>
                    <span>TECHNICAL RADAR DIFFERENTIAL MATRIX</span>
                  </div>
                  <span className="text-[10px] text-[#A69FC6] font-mono">
                    {showTechnicalMatrix ? 'Hide Details ▲' : 'Inspect Details (ZIP-316 Spec) ▼'}
                  </span>
                </button>

                {showTechnicalMatrix && (
                  <div className="divide-y divide-white/[0.06] text-[11px] animate-fade-in">
                    <div className="grid grid-cols-12 p-3 gap-2 items-center">
                      <span className="col-span-4 text-zinc-400 font-medium">Sender Address</span>
                      <span className={`col-span-4 ${!isShielded ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                        Exposed (t1CEX...)
                      </span>
                      <span className={`col-span-4 ${isShielded ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                        Cloaked (0-Knowledge)
                      </span>
                    </div>
                    <div className="grid grid-cols-12 p-3 gap-2 items-center">
                      <span className="col-span-4 text-zinc-400 font-medium">Recipient Target</span>
                      <span className={`col-span-4 ${!isShielded ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                        Exposed (t1...)
                      </span>
                      <span className={`col-span-4 ${isShielded ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                        Masked (Viewing Key)
                      </span>
                    </div>
                    <div className="grid grid-cols-12 p-3 gap-2 items-center">
                      <span className="col-span-4 text-zinc-400 font-medium">Transacted Amount</span>
                      <span className={`col-span-4 ${!isShielded ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                        5.0000 ZEC (Public)
                      </span>
                      <span className={`col-span-4 ${isShielded ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                        Hidden (Pedersen ZK)
                      </span>
                    </div>
                    <div className="grid grid-cols-12 p-3 gap-2 items-center">
                      <span className="col-span-4 text-zinc-400 font-medium">In-Band Memo</span>
                      <span className="col-span-4 text-zinc-500">Unavailable / Leaked</span>
                      <span className={`col-span-4 ${isShielded ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                        512B Authenticated
                      </span>
                    </div>
                    <div className="grid grid-cols-12 p-3 gap-2 items-center">
                      <span className="col-span-4 text-zinc-400 font-medium">Heuristic Linkability</span>
                      <span className={`col-span-4 ${!isShielded ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
                        100% Graph Linkable
                      </span>
                      <span className={`col-span-4 ${isShielded ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                        0.00% (Severed Pool)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Latest Broadcast Telemetry Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/80 p-4 space-y-3">
                <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-white/[0.06] pb-2">
                  <span className="font-semibold text-white">Latest Mempool Broadcast</span>
                  <span className="text-zinc-500 text-[10px]">
                    {latestTx ? new Date(latestTx.timestamp).toLocaleTimeString() : 'Awaiting flight command'}
                  </span>
                </div>

                {latestTx ? (
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Tx Hash:</span>
                      <span className="text-[#EBDEFA] font-bold">{latestTx.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Circuit Proof:</span>
                      <span className={latestTx.proofType === 'halo2_orchard_zk' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        {latestTx.proofType === 'halo2_orchard_zk' ? 'Halo 2 (Orchard ZK)' : 'Naked Transparent (SHA256d)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Surveillance Status:</span>
                      <span className={latestTx.isSurveillanceVisible ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                        {latestTx.isSurveillanceVisible ? '⚠️ 100% Publicly Exposed' : '🛡️ Completely Cloaked'}
                      </span>
                    </div>
                    {latestTx.memo && (
                      <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 space-y-1">
                        <span className="text-[10px] text-zinc-500 block">Encrypted Memo Ciphertext:</span>
                        <div className="text-[11px] text-emerald-300 font-mono truncate">
                          {latestTx.memo}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-4 text-center text-zinc-500 font-sans text-xs">
                    Execute practice commands on the flight deck to simulate live blockchain broadcast.
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ── TAB 2: HALO 2 ZERO-KNOWLEDGE CIRCUITS ───────────────────── */}
        {activeTab === 'circuits' && (
          <div className="space-y-4 animate-fade-in">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0815]/90 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[11px]">
                <span className="font-semibold text-white">Halo 2 Circuit Architecture</span>
                <span className="text-[#D580FA] bg-[#5632F5]/20 px-2 py-0.5 rounded-full border border-[#5632F5]/30">
                  Recursive PLONKish
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px]">Constraint Count:</span>
                  <div className="text-white font-bold text-sm">20,480 Custom Gates</div>
                  <span className="text-[10px] text-[#A69FC6]">UltraPLONK arithmetization</span>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-500 text-[10px]">Proving Curves:</span>
                  <div className="text-white font-bold text-sm">Pasta (Pallas / Vesta)</div>
                  <span className="text-[10px] text-emerald-400">Zero Trusted Setup</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="text-zinc-400 text-[11px] font-semibold">Orchard Action Circuit Stages:</div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300">1. Pedersen Value Commitment</span>
                    <span className="text-emerald-400">cm_v = [v]G + [rcv]H (Preserved)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300">2. Nullifier Derivation</span>
                    <span className="text-emerald-400">nf = DeriveNullifier(nk, ρ)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300">3. Merkle Membership Proof</span>
                    <span className="text-emerald-400">Sinsemilla Tree (Depth 32)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/30 border border-white/5 flex items-center justify-between">
                    <span className="text-zinc-300">4. Spend Authority Signature</span>
                    <span className="text-emerald-400">RedPallas Signature Validated</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#5632F5]/10 border border-[#7738FF]/30 text-[#EBDEFA] text-xs font-sans leading-relaxed">
              💡 <strong>Halo 2 Advantage:</strong> Unlike older SNARKs, Halo 2 requires no multi-party computation (MPC) ceremony or toxic waste. Proofs verify in ~27ms directly in memory.
            </div>
          </div>
        )}

        {/* ── TAB 3: ZIP-316 UNIFIED ADDRESS DECONSTRUCTOR ────────────── */}
        {activeTab === 'zip316' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-zinc-300 text-[11px] font-semibold flex items-center space-x-1.5">
                <Search className="w-3.5 h-3.5 text-[#D580FA]" />
                <span>Deconstruct Any Zcash Address</span>
              </label>

              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Paste address (t1..., zs1..., u1...)"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full bg-[#0A0815] border border-white/[0.1] rounded-xl p-2.5 text-xs font-mono text-[#ECEAF5] focus:border-[#7738FF] focus:outline-none"
                />

                <div className="flex space-x-2 text-[10px]">
                  <button
                    onClick={() => setCustomAddress(CANONICAL_TEST_ADDRESSES.TRANSPARENT_SAMPLE)}
                    className="text-[#D580FA] hover:underline"
                  >
                    Test t-address
                  </button>
                  <span className="text-zinc-600">|</span>
                  <button
                    onClick={() => setCustomAddress(CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE)}
                    className="text-[#D580FA] hover:underline"
                  >
                    Test Unified u-address
                  </button>
                </div>
              </div>
            </div>

            {decodedCustom && (
              <div className="p-4 rounded-2xl bg-[#0A0815]/90 border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-400 font-mono text-[11px]">Address Standard:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    decodedCustom.type === 'unified_orchard'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : decodedCustom.type === 'transparent'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : 'bg-[#5632F5]/20 text-[#D580FA] border border-[#5632F5]/40'
                  }`}>
                    {decodedCustom.type}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {decodedCustom.details}
                </p>

                {decodedCustom.receivers && (
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                    <div className={`p-2 rounded-xl border ${decodedCustom.receivers.orchard ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-black/30 border-white/5 text-zinc-600'}`}>
                      <div className="text-[9px] text-zinc-400">Orchard (0x03)</div>
                      <div className="font-bold text-xs mt-0.5">{decodedCustom.receivers.orchard ? 'ACTIVE' : 'NONE'}</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${decodedCustom.receivers.sapling ? 'bg-purple-500/10 border-purple-500/30 text-purple-400' : 'bg-black/30 border-white/5 text-zinc-600'}`}>
                      <div className="text-[9px] text-zinc-400">Sapling (0x02)</div>
                      <div className="font-bold text-xs mt-0.5">{decodedCustom.receivers.sapling ? 'ACTIVE' : 'NONE'}</div>
                    </div>
                    <div className={`p-2 rounded-xl border ${decodedCustom.receivers.transparent ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-black/30 border-white/5 text-zinc-600'}`}>
                      <div className="text-[9px] text-zinc-400">Transparent (0x00)</div>
                      <div className="font-bold text-xs mt-0.5">{decodedCustom.receivers.transparent ? 'ACTIVE' : 'NONE'}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: JSON-RPC LIVE PAYLOAD ───────────────────────────── */}
        {activeTab === 'rpc' && (
          <div className="space-y-3 animate-fade-in">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Real Node JSON-RPC Stream:</span>
              <button
                onClick={handleCopyRpc}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition"
              >
                {copiedRpc ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedRpc ? 'Copied' : 'Copy Payload'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-2xl bg-[#07060B] border border-white/[0.08] text-[#D580FA] text-[11px] overflow-x-auto leading-relaxed shadow-inner">
              {getRpcPayload()}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};
