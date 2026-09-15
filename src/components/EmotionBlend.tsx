import React from 'react';
import { EmotionType } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';
import { Sparkles } from 'lucide-react';

interface EmotionBlendProps {
  primaryEmotion: EmotionType;
  secondaryEmotion?: EmotionType;
  confidence: number;
  isCompound?: boolean;
  compoundName?: string;
}

export const EmotionBlend: React.FC<EmotionBlendProps> = ({
  primaryEmotion,
  secondaryEmotion,
  confidence,
  isCompound = false,
  compoundName,
}) => {
  const primary = EMOTION_CONFIG[primaryEmotion];
  const secondary = secondaryEmotion ? EMOTION_CONFIG[secondaryEmotion] : null;
  const pct = Math.round(confidence * 100);

  if (!secondary || !isCompound) {
    // Single emotion presentation
    return (
      <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-md text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold block">
          Emotion State
        </span>
        <div className="text-5xl">{primary.emoji}</div>
        <h3 className="text-2xl font-extrabold text-[#F4F7FF]">{primary.label}</h3>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs border"
          style={{
            borderColor: `${primary.color}40`,
            backgroundColor: `${primary.color}15`,
            color: primary.color,
          }}
        >
          {pct}% Confidence
        </div>
      </div>
    );
  }

  // Dual/Compound emotion blend
  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-md text-center space-y-6 overflow-hidden">
      {/* Dynamic ambient blend aura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 blur-3xl -z-10"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${primary.color} 0%, transparent 60%), radial-gradient(circle at 70% 50%, ${secondary.color} 0%, transparent 60%)`,
        }}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold">
          Emotion Blend
        </span>
        <span className="text-xs text-[#8C9AB5] font-mono">Multimodal Synthesis</span>
      </div>

      {/* Visual Convergence */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center max-w-xl mx-auto py-2">
        {/* Signal A */}
        <div className="sm:col-span-3 p-4 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-1">
          <div className="text-3xl">{primary.emoji}</div>
          <div className="text-base font-bold" style={{ color: primary.color }}>
            {primary.label}
          </div>
          <div className="text-[11px] text-[#8C9AB5] font-mono">Dominant Signal</div>
        </div>

        {/* Fusion Node */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#4F8CFF]/20 border border-[#49D6FF]/40 flex items-center justify-center text-[#49D6FF] shadow-glow-cyan animate-pulse">
            <Sparkles size={18} />
          </div>
          <span className="text-[10px] font-mono text-[#49D6FF] mt-1 font-semibold">{pct}%</span>
        </div>

        {/* Signal B */}
        <div className="sm:col-span-3 p-4 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-1">
          <div className="text-3xl">{secondary.emoji}</div>
          <div className="text-base font-bold" style={{ color: secondary.color }}>
            {secondary.label}
          </div>
          <div className="text-[11px] text-[#8C9AB5] font-mono">Secondary Signal</div>
        </div>
      </div>

      {/* Synthesis Verdict */}
      <div className="pt-2 border-t border-white/[0.06] space-y-2">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span style={{ color: primary.color }}>{primary.label}</span>
          <span className="text-[#8C9AB5] mx-2">·</span>
          <span style={{ color: secondary.color }}>{secondary.label}</span>
        </div>
        <p className="text-xs text-[#8C9AB5] max-w-md mx-auto">
          {compoundName || 'Mixed emotional signals detected.'}
        </p>
      </div>
    </div>
  );
};
