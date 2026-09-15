import React from 'react';
import { EmotionType } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';
import { GlassCard } from './GlassCard';

interface EmotionCardProps {
  emotion: EmotionType;
  confidence: number;
  label?: string;
}

export const EmotionCard: React.FC<EmotionCardProps> = ({
  emotion,
  confidence,
  label,
}) => {
  const config = EMOTION_CONFIG[emotion];
  const percentage = Math.round(confidence * 100);

  return (
    <GlassCard className="flex flex-col gap-2">
      {label && (
        <span className="text-xs text-[#8C9AB5] uppercase tracking-wider font-mono">
          {label}
        </span>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{config.emoji}</span>
          <span className="text-lg font-medium text-[#F4F7FF]">{config.label}</span>
        </div>
        <span className="text-sm font-semibold font-mono" style={{ color: config.color }}>
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden mt-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: config.color }}
        />
      </div>
    </GlassCard>
  );
};
