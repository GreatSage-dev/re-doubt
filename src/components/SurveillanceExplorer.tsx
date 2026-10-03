import React, { useState } from 'react';
import { 
  Radio, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Terminal, 
  Lock, 
  Eye, 
  EyeOff, 
  FileCode, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { SimulatorState } from '../types';
import { inspectZcashAddress, CANONICAL_TEST_ADDRESSES } from '../crypto/zcash';

interface SurveillanceExplorerProps {
  state: SimulatorState;
}

export const SurveillanceExplorer: React.FC<SurveillanceExplorerProps> = ({ state }) => {
  const [addressInput, setAddressInput] = useState(state.transparentAddress);
  const [customAddress, setCustomAddress] = useState('');
  
  // Inspect user-typed custom address
  const decodedCustom = customAddress ? inspectZcashAddress(customAddress) : null;

  // Active state surveillance status
  const isCurrentlyShielded = state.currentStep >= 3 && state.shieldedBalance > 0;
  const latestTx = state.transactions[0];

  return (
    <div className="bg-[#0E0C1C]/90 border border-white/[0.08] rounded-3xl p-5 flex flex-col justify-between space-y-6 h-[780px] overflow-y-auto backdrop-blur-xl">
      
      {/* Top Header: Panopticon Explorer Status */}
      <div className="border-b border-white/[0.08] pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#D580FA]" />
            <h3 className="font-bold text-[#ECEAF5] text-sm tracking-wide uppercase font-mono">
              Live Ledger Diagnostic (The Panopticon)
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#5632F5]/20 text-[#EBDEFA] border border-[#5632F5]/40">
            Explorer Mirror
          </span>
        </div>
        <p className="text-xs text-[#9C99B0] mt-1">
          This panel shows what public block explorers (and surveillance firms) see in real-time as you transact.
        </p>
      </div>

      {/* CORE DYNAMIC SURVEILLANCE STATUS BANNER */}
      <div>
        {state.currentStep <= 2 ? (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-2 glow-rose">
            <div className="flex items-center space-x-2 font-bold text-xs uppercase font-mono">
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>SURVEILLANCE EXPOSURE: 100% PUBLIC</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              Your wallet is operating in <strong>Transparent Mode</strong> (<code className="text-rose-300 font-mono">t1...</code>). Anyone in the world can view your balance, trace your transaction history, and link your identity to exchange accounts.
            </p>
            <div className="text-[10px] font-mono bg-black/40 p-2 rounded-lg border border-rose-500/20 text-rose-300 space-y-0.5">
              <div>• Sender Address: <span className="text-white">EXPOSED</span></div>
              <div>• Recipient Address: <span className="text-white">EXPOSED</span></div>
              <div>• Transacted Amount: <span className="text-white">EXPOSED</span></div>
              <div>• Encrypted Memo: <span className="text-zinc-500">UNAVAILABLE (Transparent txs have no memo)</span></div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 glow-emerald">
            <div className="flex items-center space-x-2 font-bold text-xs uppercase font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>ZERO-KNOWLEDGE SHIELD ACTIVE: 100% PRIVATE</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Your funds are inside the <strong>Orchard ZK Pool</strong>. Zero-knowledge proofs (Halo 2) prove the transaction is valid mathematically without revealing a single byte of transaction metadata.
            </p>
            <div className="text-[10px] font-mono bg-black/40 p-2 rounded-lg border border-emerald-500/20 text-emerald-300 space-y-0.5">
              <div>• Sender Address: <span className="text-emerald-400">CLOAKED (Zero-Knowledge)</span></div>
              <div>• Recipient Address: <span className="text-emerald-400">MASKED (Decrypted only by recipient viewing key)</span></div>
              <div>• Transacted Amount: <span className="text-emerald-400">HIDDEN (Pedersen Commitment)</span></div>
              <div>• Memo Payload: <span className="text-emerald-400">CHACHA20-POLY1305 CIPHERTEXT</span></div>
            </div>
          </div>
        )}
      </div>

      {/* RECENT SIMULATED TRANSACTION TELEMETRY */}
      <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-zinc-400 text-[11px] border-b border-zinc-800 pb-2">
          <span>Latest Ledger Broadcast</span>
          <span className="text-zinc-500 text-[10px]">
            {latestTx ? new Date(latestTx.timestamp).toLocaleTimeString() : 'Awaiting flight command'}
          </span>
        </div>

        {latestTx ? (
          <div className="space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Tx Hash:</span>
              <span className="text-zinc-300 font-bold">{latestTx.id}</span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Proof Protocol:</span>
              <span className={latestTx.proofType === 'halo2_orchard_zk' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {latestTx.proofType === 'halo2_orchard_zk' ? 'Halo 2 (Orchard ZK)' : 'Naked Transparent (SHA256d)'}
              </span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-400">Public Visibility:</span>
              <span className={latestTx.isSurveillanceVisible ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                {latestTx.isSurveillanceVisible ? '⚠️ 100% Leaked on Explorer' : '🛡️ Completely Invisible'}
              </span>
            </div>

            {latestTx.memo && (
              <div className="mt-2 p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 block mb-0.5">Encrypted Memo State:</span>
                <div className="text-[11px] text-emerald-300 truncate font-mono">
                  {latestTx.memo}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center text-zinc-500 text-xs">
            Follow the steps on the virtual cockpit to trigger live transactions.
          </div>
        )}
      </div>

      {/* REAL UNIFIED ADDRESS (UA) DECONSTRUCTOR TOOL */}
      <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-zinc-200">
            <Search className="w-3.5 h-3.5 text-[#D580FA]" />
            <span>Interactive Address Deconstructor</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">ZIP 316 Live Parser</span>
        </div>

        <div className="space-y-1.5">
          <input
            type="text"
            placeholder="Paste any Zcash address (t1..., zs1..., u1...)"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2 text-xs font-mono text-zinc-200 focus:border-[#7738FF] focus:outline-none"
          />
          <div className="flex space-x-2 text-[10px]">
            <button
              onClick={() => setCustomAddress(CANONICAL_TEST_ADDRESSES.TRANSPARENT_SAMPLE)}
              className="text-[#D580FA] hover:underline"
            >
              Test t-addr
            </button>
            <span className="text-zinc-600">|</span>
            <button
              onClick={() => setCustomAddress(CANONICAL_TEST_ADDRESSES.UNIFIED_ORCHARD_SAMPLE)}
              className="text-[#D580FA] hover:underline"
            >
              Test Unified u-addr
            </button>
          </div>
        </div>

        {decodedCustom && (
          <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 font-mono text-[11px]">Address Type:</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                decodedCustom.type === 'unified_orchard'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : decodedCustom.type === 'transparent'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-zinc-800 text-zinc-300'
              }`}>
                {decodedCustom.type}
              </span>
            </div>

            <p className="text-[11px] text-zinc-300 leading-normal">
              {decodedCustom.details}
            </p>

            {decodedCustom.receivers && (
              <div className="grid grid-cols-3 gap-1 pt-1 border-t border-zinc-800 text-[10px] font-mono text-center">
                <div className={`p-1 rounded ${decodedCustom.receivers.orchard ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-950 text-zinc-600'}`}>
                  Orchard: {decodedCustom.receivers.orchard ? 'YES' : 'NO'}
                </div>
                <div className={`p-1 rounded ${decodedCustom.receivers.sapling ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-zinc-950 text-zinc-600'}`}>
                  Sapling: {decodedCustom.receivers.sapling ? 'YES' : 'NO'}
                </div>
                <div className={`p-1 rounded ${decodedCustom.receivers.transparent ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-950 text-zinc-600'}`}>
                  Transp: {decodedCustom.receivers.transparent ? 'YES' : 'NO'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
