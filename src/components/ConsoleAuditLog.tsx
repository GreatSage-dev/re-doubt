import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2, Shield, Activity } from 'lucide-react';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  module: 'BOOT' | 'BIP-39' | 'MEMPOOL' | 'HALO2' | 'ORCHARD' | 'ZIP-316' | 'RPC';
  message: string;
  type: 'info' | 'warn' | 'success' | 'circuit';
}

interface ConsoleAuditLogProps {
  logs: AuditLogEntry[];
  onClear: () => void;
}

export const ConsoleAuditLog: React.FC<ConsoleAuditLogProps> = ({ logs, onClear }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getModuleBadge = (mod: AuditLogEntry['module']) => {
    switch (mod) {
      case 'HALO2':
      case 'ORCHARD':
        return 'text-[#D580FA] bg-[#5632F5]/20 border-[#5632F5]/40';
      case 'MEMPOOL':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'BIP-39':
      case 'ZIP-316':
        return 'text-[#EBDEFA] bg-[#7738FF]/20 border-[#7738FF]/30';
      case 'RPC':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      default:
        return 'text-[#A69FC6] bg-white/5 border-white/10';
    }
  };

  const getTypeColor = (type: AuditLogEntry['type']) => {
    switch (type) {
      case 'warn':
        return 'text-rose-300';
      case 'success':
        return 'text-emerald-300';
      case 'circuit':
        return 'text-[#D580FA]';
      default:
        return 'text-[#CFC6F0]';
    }
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0A0814]/95 p-3.5 backdrop-blur-xl shadow-[0_12px_32px_-10px_rgba(86,50,245,0.2)] font-mono">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06] text-xs">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-[#D580FA]" />
          <span className="font-semibold text-[#ECEAF5] tracking-wide text-[11px] uppercase">
            Workstation Chronological Telemetry & Audit Stream
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          <span className="text-zinc-500 text-[10px]">{logs.length} events logged</span>
          <button
            onClick={onClear}
            className="text-zinc-500 hover:text-zinc-300 transition p-1 rounded hover:bg-white/5"
            title="Clear audit log"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Scrolling Log Stream */}
      <div
        ref={scrollRef}
        className="mt-2.5 h-28 overflow-y-auto space-y-1 text-[11px] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-1"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-2 leading-relaxed hover:bg-white/[0.02] px-1 py-0.5 rounded transition">
            <span className="text-zinc-500 shrink-0 text-[10px] tabular-nums">{log.timestamp}</span>
            <span className={`px-1.5 py-0.2 rounded border text-[9px] uppercase font-bold shrink-0 ${getModuleBadge(log.module)}`}>
              {log.module}
            </span>
            <span className={`break-all ${getTypeColor(log.type)}`}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
