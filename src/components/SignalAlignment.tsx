import React from 'react';
import { AlignmentType } from '../types/emotion';
import { GitMerge, CheckCircle2 } from 'lucide-react';

interface SignalAlignmentProps {
  alignment?: {
    type: AlignmentType;
    headline: string;
    description: string;
  };
}

export const SignalAlignment: React.FC<SignalAlignmentProps> = ({ alignment }) => {
  if (!alignment) return null;

  const isAgreement = alignment.type === 'agreement';

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md transition-all">
      <div className="flex items-start gap-4">
        {/* Calm blue/cyan indicator icon */}
        <div className="p-3 rounded-xl bg-[#4F8CFF]/15 border border-[#49D6FF]/30 text-[#49D6FF] shadow-glow-sm shrink-0">
          {isAgreement ? <CheckCircle2 size={22} /> : <GitMerge size={22} />}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#49D6FF] font-semibold">
              How Your Signals Align
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-[#8C9AB5]">
              {isAgreement ? 'Signals Agree' : 'Mixed Signals'}
            </span>
          </div>

          <h4 className="text-lg font-bold text-[#F4F7FF] tracking-tight">
            {alignment.headline}
          </h4>

          <p className="text-sm text-[#8C9AB5] leading-relaxed max-w-2xl font-normal">
            {alignment.description}
          </p>
        </div>
      </div>
    </div>
  );
};
