import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Smile, Mic, FileText, HelpCircle } from 'lucide-react';

interface WhyResultProps {
  explanation?: {
    faceCue: string;
    voiceCue: string;
    textCue: string;
    aiSynthesis: string;
  };
}

export const WhyResult: React.FC<WhyResultProps> = ({ explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  return (
    <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#4F8CFF]/10 text-[#49D6FF] border border-[#49D6FF]/20">
            <HelpCircle size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#F4F7FF]">
              Why this result?
            </h4>
            <p className="text-xs text-[#8C9AB5]">
              Explainable AI breakdown of how individual sensory channels were synthesized.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#49D6FF]">
          <span>{isOpen ? 'Collapse' : 'Explain'}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* What I See */}
            <div className="p-4 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FCD34D]">
                <Smile size={14} /> WHAT I SEE
              </div>
              <p className="text-xs text-[#8C9AB5] leading-relaxed">
                {explanation.faceCue}
              </p>
            </div>

            {/* What I Hear */}
            <div className="p-4 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#60A5FA]">
                <Mic size={14} /> WHAT I HEAR
              </div>
              <p className="text-xs text-[#8C9AB5] leading-relaxed">
                {explanation.voiceCue}
              </p>
            </div>

            {/* What I Read */}
            <div className="p-4 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#4ADE80]">
                <FileText size={14} /> WHAT I READ
              </div>
              <p className="text-xs text-[#8C9AB5] leading-relaxed">
                {explanation.textCue}
              </p>
            </div>
          </div>

          {/* What AI Understands */}
          <div className="p-5 rounded-2xl bg-[#4F8CFF]/[0.06] border border-[#4F8CFF]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#49D6FF] font-semibold">
              <Sparkles size={14} /> WHAT AI UNDERSTANDS
            </div>
            <p className="text-sm text-[#F4F7FF] leading-relaxed font-normal">
              "{explanation.aiSynthesis}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
