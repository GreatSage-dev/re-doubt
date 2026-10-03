import React from 'react';
import { KeyRound, ArrowDownToLine, ShieldAlert, Send, Award, CheckCircle2 } from 'lucide-react';
import { FlightStepId } from '../types';

interface FlightNavProps {
  currentStep: FlightStepId;
  completedSteps: FlightStepId[];
  onSelectStep: (step: FlightStepId) => void;
}

const STEPS = [
  { id: 1 as FlightStepId, label: '1. Wallet Setup', icon: KeyRound, desc: 'BIP-39 Vault' },
  { id: 2 as FlightStepId, label: '2. Getting ZEC', icon: ArrowDownToLine, desc: 'CEX Ingress (t-addr)' },
  { id: 3 as FlightStepId, label: '3. Shielding', icon: ShieldAlert, desc: 'Orchard ZK Pool' },
  { id: 4 as FlightStepId, label: '4. Sending', icon: Send, desc: 'z-to-z + Encrypted Memo' },
  { id: 5 as FlightStepId, label: '5. Real Flight Plan', icon: Award, desc: 'Mobile Scan & Cert' },
];

export const FlightNav: React.FC<FlightNavProps> = ({ currentStep, completedSteps, onSelectStep }) => {
  return (
    <div className="bg-[#0E0C1C]/90 border border-white/[0.08] rounded-2xl p-2 my-4 backdrop-blur-xl">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isDone = completedSteps.includes(s.id);

          return (
            <button
              key={s.id}
              onClick={() => onSelectStep(s.id)}
              className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-left transition duration-150 ${
                isActive
                  ? 'bg-[#7738FF] text-white font-semibold shadow-lg shadow-[#7738FF]/35'
                  : isDone
                  ? 'bg-[#181335] text-[#ECEAF5] hover:bg-[#201948] border border-white/5'
                  : 'text-[#8E8BA3] hover:text-[#ECEAF5] hover:bg-white/[0.04]'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 ${
                isActive
                  ? 'bg-black/20 text-white'
                  : isDone
                  ? 'bg-[#D580FA]/20 text-[#D580FA]'
                  : 'bg-white/[0.05] text-[#8E8BA3]'
              }`}>
                {isDone && !isActive ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium truncate">{s.label}</div>
                <div className={`text-[10px] truncate ${isActive ? 'text-black/80' : 'text-zinc-500'}`}>
                  {s.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
