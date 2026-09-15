import React from 'react';
import { ModalitySignal } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';
import { getSpectrumPosition } from '../utils/analysisHelpers';
import { Smile, Mic, FileText } from 'lucide-react';

interface EmotionSpectrumProps {
  signals: {
    face?: ModalitySignal;
    voice?: ModalitySignal;
    text?: ModalitySignal;
  };
}

export const EmotionSpectrum: React.FC<EmotionSpectrumProps> = ({ signals }) => {
  const signalList = [
    {
      key: 'face',
      label: 'WHAT I SEE',
      sublabel: 'Face',
      icon: <Smile size={16} className="text-[#FCD34D]" />,
      data: signals.face,
    },
    {
      key: 'voice',
      label: 'WHAT I HEAR',
      sublabel: 'Voice',
      icon: <Mic size={16} className="text-[#60A5FA]" />,
      data: signals.voice,
    },
    {
      key: 'text',
      label: 'WHAT I READ',
      sublabel: 'Text',
      icon: <FileText size={16} className="text-[#4ADE80]" />,
      data: signals.text,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold">
          Your Emotional Signals
        </span>
        <span className="text-xs text-[#8C9AB5]">Affective Spectrum (Valence Tendency)</span>
      </div>

      <div className="space-y-5">
        {signalList.map((item) => {
          if (!item.data) return null;
          const config = EMOTION_CONFIG[item.data.primaryEmotion];
          const pos = getSpectrumPosition(item.data.primaryEmotion, item.data.confidence);

          return (
            <div
              key={item.key}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-mono text-[#8C9AB5] uppercase text-[11px]">
                    {item.label} · {item.sublabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#F4F7FF] flex items-center gap-1">
                    <span>{config.emoji}</span>
                    <span>{config.label}</span>
                  </span>
                  <span className="font-mono text-[#8C9AB5]" style={{ color: config.color }}>
                    {Math.round(item.data.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Spectrum Axis */}
              <div className="relative pt-2 pb-1">
                {/* Horizontal Guide Track */}
                <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-[#60A5FA]/20 via-[#94A3B8]/15 to-[#FCD34D]/20 border border-white/5">
                  {/* Subtle center marker for neutral */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/20" />

                  {/* Emotional tendency node (dot) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#060B18] shadow-glow-sm transition-all duration-700 ease-out flex items-center justify-center"
                    style={{
                      left: `${pos}%`,
                      backgroundColor: config.color,
                      boxShadow: `0 0 12px ${config.color}80`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Range Labels */}
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8C9AB5] mt-2">
                  <span className="flex items-center gap-1">
                    <span>😢</span> Sad / Restrained
                  </span>
                  <span className="text-[#8C9AB5]/50">Neutral</span>
                  <span className="flex items-center gap-1">
                    <span>😊</span> Joyful / Expressive
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
