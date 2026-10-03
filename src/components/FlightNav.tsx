import { Eye, ArrowDownToLine, ShieldCheck, Mail, KeyRound, Award, CheckCircle2 } from 'lucide-react';
import { FlightStepId } from '../types';

interface FlightNavProps {
  currentStep: FlightStepId;
  completedSteps: FlightStepId[];
  onSelectStep: (step: FlightStepId) => void;
}

const STEPS = [
  { id: 1 as FlightStepId, num: '01', key: '1', label: '1. Radar Check', icon: Eye, desc: 'See the Contrast' },
  { id: 2 as FlightStepId, num: '02', key: '2', label: '2. Practice ZEC', icon: ArrowDownToLine, desc: 'Exchange Ingress' },
  { id: 3 as FlightStepId, num: '03', key: '3', label: '3. Shield Funds', icon: ShieldCheck, desc: 'Make It Private' },
  { id: 4 as FlightStepId, num: '04', key: '4', label: '4. Encrypted Memo', icon: Mail, desc: 'Sealed Dispatch' },
  { id: 5 as FlightStepId, num: '05', key: '5', label: '5. Graduate', icon: Award, desc: 'Flight Certified' },
];

export const FlightNav: React.FC<FlightNavProps> = ({ currentStep, completedSteps, onSelectStep }) => {
  return (
    <div className="bg-[#0E0C1C]/95 border border-white/[0.08] rounded-2xl p-2 my-4 backdrop-blur-xl shadow-[0_12px_30px_-10px_rgba(86,50,245,0.25)] select-none">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {STEPS.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.id;
          const isDone = completedSteps.includes(s.id);

          return (
            <button
              key={s.id}
              onClick={() => onSelectStep(s.id)}
              className={`relative flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-left transition duration-150 cursor-pointer ${
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium truncate">{s.label}</span>
                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                    isActive ? 'bg-black/30 text-white/90' : 'bg-white/5 text-zinc-500'
                  }`}>
                    {s.key}
                  </span>
                </div>
                <div className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-zinc-500'}`}>
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
