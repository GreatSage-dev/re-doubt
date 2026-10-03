import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroPortalProps {
  onEnterConsole: () => void;
}

/**
 * Exact palette lifted from the reference design sheet.
 * Light stack (all `plus-lighter`):
 *   L1  #FFFFFF linear 38%→100%   blur 15
 *   L2  #EBDEFA @ 66%             blur 56
 *   L3  #A16ADE @ 58%             blur 58
 *   L4  #5632F5 @ 100%            blur 170
 * Column gradient: #D580FA 0% → #7738FF 28% → #151257 61% → #000000 90%
 * Grid: stroke #4D3D75, 0.25 weight, masked circle
 */
const C = {
  white: '#FFFFFF',
  lavender: '#EBDEFA',
  orchid: '#A16ADE',
  indigo: '#5632F5',
  pink: '#D580FA',
  violet: '#7738FF',
  navy: '#151257',
  grid: '#4D3D75',
};

// Stage is drawn on a fixed 1000 x 560 coordinate system
const W = 1000;
const H = 560;
const HORIZON = 380;
const VP_Y = 300; // vanishing point sits above the horizon so lines don't bunch up
const CX = 500;

const radialLines = Array.from({ length: 41 }, (_, i) => -1500 + i * 100).map((xb) => {
  const t = (HORIZON - VP_Y) / (H - VP_Y);
  return { x1: CX + (xb - CX) * t, y1: HORIZON, x2: xb, y2: H };
});

const rowLines = Array.from({ length: 13 }, (_, i) => HORIZON + (H - HORIZON) * Math.pow((i + 1) / 13, 1.9));

const plus: React.CSSProperties = { mixBlendMode: 'plus-lighter' };

export const HeroPortal: React.FC<HeroPortalProps> = ({ onEnterConsole }) => {
  return (
    <section className="relative px-3 pt-3">
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0C0B17]">
        {/* ── Copy ─────────────────────────────────────────── */}
        <div className="relative z-20 mx-auto max-w-5xl px-6 pt-24 text-center">
          <span className="inline-flex items-center rounded-full border border-[#5632F5]/40 bg-[#5632F5]/10 px-3.5 py-1 text-[13px] text-[#CFC6F0]">
            Zcash Flight Simulator
          </span>

          <h1 className="mt-6 text-[40px] font-normal leading-[1.05] tracking-[-0.035em] text-[#ECEAF5] sm:text-[60px]">
            Your first{' '}
            <span className="font-editorial text-[1.08em] italic tracking-[-0.01em]">shielded</span>{' '}
            transaction
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.6] text-[#9C99B0]">
            Shadow-Run lets you rehearse wallet setup, exchange withdrawals and Orchard shielding with real
            cryptography, before a single real ZEC moves.
          </p>
        </div>

        {/* ── Stage ────────────────────────────────────────── */}
        <div
          className="relative left-1/2 -mt-14 h-[560px] w-[1000px] max-w-none -translate-x-1/2 origin-top max-md:scale-[0.72] max-md:-mb-[157px] max-sm:scale-[0.42] max-sm:-mb-[325px]"
          aria-hidden={false}
        >
          {/* Grid floor — #4D3D75 hairlines inside a masked circle */}
          <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
            <defs>
              <radialGradient id="sr-grid-fade" cx={CX} cy={450} r={430} gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#fff" stopOpacity="1" />
                <stop offset="0.55" stopColor="#fff" stopOpacity="0.45" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="sr-grid-mask">
                <rect width={W} height={H} fill="url(#sr-grid-fade)" />
              </mask>
            </defs>
            <g mask="url(#sr-grid-mask)" stroke={C.grid} strokeWidth={0.6}>
              {radialLines.map((l, i) => (
                <line key={`r${i}`} {...l} />
              ))}
              {rowLines.map((y, i) => (
                <line key={`h${i}`} x1={0} y1={y} x2={W} y2={y} />
              ))}
            </g>
          </svg>

          {/* L4 — #5632F5 100%, blur 170 (atmosphere) */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ ...plus, left: 150, top: 280, width: 700, height: 300, background: C.indigo, filter: 'blur(170px)' }}
          />

          {/* Light column descending from above */}
          <div
            className="pointer-events-none absolute"
            style={{
              ...plus,
              left: 390,
              top: 60,
              width: 220,
              height: 340,
              opacity: 0.55,
              background: `linear-gradient(to top, ${C.pink} 0%, ${C.violet} 28%, ${C.navy} 61%, #000000 90%)`,
              maskImage: 'linear-gradient(to top, #000 55%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, #000 55%, transparent 100%)',
            }}
          />
          {/* Soft vertical rays inside the column */}
          <div
            className="pointer-events-none absolute"
            style={{
              ...plus,
              left: 392,
              top: 60,
              width: 216,
              height: 340,
              background: `repeating-linear-gradient(90deg, rgba(161,106,222,0) 0px, rgba(161,106,222,0.45) 22px, rgba(161,106,222,0) 44px)`,
              filter: 'blur(7px)',
              maskImage: 'linear-gradient(to top, #000 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, #000 40%, transparent 100%)',
            }}
          />

          {/* Room geometry: side walls, back-wall panels, floor */}
          <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
            <defs>
              <linearGradient id="sr-wall-l" x1="318" y1="0" x2="390" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={C.indigo} stopOpacity="0.05" />
                <stop offset="1" stopColor={C.orchid} stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="sr-wall-r" x1="682" y1="0" x2="610" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={C.indigo} stopOpacity="0.05" />
                <stop offset="1" stopColor={C.orchid} stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="sr-panel" x1="0" y1="300" x2="0" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={C.lavender} stopOpacity="0" />
                <stop offset="1" stopColor={C.lavender} stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="sr-floor" x1="0" y1="400" x2="0" y2="490" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor={C.white} stopOpacity="0.9" />
                <stop offset="0.14" stopColor={C.lavender} stopOpacity="0.6" />
                <stop offset="0.45" stopColor={C.orchid} stopOpacity="0.5" />
                <stop offset="1" stopColor={C.indigo} stopOpacity="0.75" />
              </linearGradient>
              <filter id="sr-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" />
              </filter>
            </defs>

            <g style={plus}>
              {/* Side walls flare outward as they rise */}
              <polygon points="390,300 390,400 330,490 318,240" fill="url(#sr-wall-l)" />
              <polygon points="610,300 610,400 670,490 682,240" fill="url(#sr-wall-r)" />
              <polyline points="318,240 390,300 390,400 330,490" stroke={C.orchid} strokeOpacity="0.4" strokeWidth="1" />
              <polyline points="682,240 610,300 610,400 670,490" stroke={C.orchid} strokeOpacity="0.4" strokeWidth="1" />

              {/* Four back-wall panels */}
              {[398, 451, 504, 557].map((x) => (
                <rect key={x} x={x} y={300} width={44} height={100} fill="url(#sr-panel)" filter="url(#sr-soft)" />
              ))}

              {/* Floor */}
              <polygon points="390,400 610,400 670,490 330,490" fill="url(#sr-floor)" filter="url(#sr-soft)" />
            </g>
          </svg>

          {/* L3 — #A16ADE 58%, blur 58 */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ ...plus, left: 280, top: 345, width: 440, height: 150, background: 'rgba(161,106,222,0.58)', filter: 'blur(58px)' }}
          />
          {/* L2 — #EBDEFA 66%, blur 56 */}
          <div
            className="pointer-events-none absolute rounded-full"
            style={{ ...plus, left: 350, top: 362, width: 300, height: 80, background: 'rgba(235,222,250,0.66)', filter: 'blur(56px)' }}
          />
          {/* L1 — white linear 38%→100%, blur 15 (the hot band at the base of the back wall) */}
          <div
            className="pointer-events-none absolute"
            style={{
              ...plus,
              left: 392,
              top: 335,
              width: 216,
              height: 75,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 38%, #FFFFFF 100%)',
              filter: 'blur(15px)',
            }}
          />

          {/* Mirrored reflection of the card copy on the floor */}
          <div
            className="pointer-events-none absolute text-center text-[14px] leading-[22px] text-[#EBDEFA]"
            style={{
              left: 250,
              top: 418,
              width: 500,
              opacity: 0.16,
              transform: 'scaleY(-1)',
              filter: 'blur(0.4px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, #000 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 100%)',
            }}
          >
            <div>From zero to your first shielded transaction</div>
            <div>What actually happens when I shield ZEC from a t-address?</div>
          </div>

          {/* Floating glass card */}
          <button
            onClick={onEnterConsole}
            className="group absolute z-20 text-left"
            style={{ left: 200, top: 190, width: 600 }}
          >
            <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-[6px] shadow-[0_24px_80px_-24px_rgba(86,50,245,0.55)] backdrop-blur-xl transition-colors duration-300 group-hover:border-white/[0.14]">
              <div className="rounded-[15px] border border-white/[0.06] bg-[#0E0C1A]/85 px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[15px] font-medium tracking-[-0.01em] text-[#ECEAF5]">
                    From zero to your first shielded transaction
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[13px]">
                    <Sparkles className="h-3.5 w-3.5 text-[#D580FA]" />
                    <span className="bg-gradient-to-r from-[#D580FA] to-[#A16ADE] bg-clip-text text-transparent">
                      Click to start the flight
                    </span>
                  </span>
                </div>
                <div className="mt-4 flex gap-3">
                  <span className="w-[2px] shrink-0 rounded-full bg-white/25" />
                  <p className="text-[14px] text-[#A9A6BC]">What actually happens when I shield ZEC from a t-address?</p>
                </div>
              </div>
            </div>
          </button>

          {/* Fade the stage into the frame */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0C0B17]" />
        </div>
      </div>
    </section>
  );
};
