import React from 'react';
import { EmotionType } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';

interface ConfidenceBarProps {
  emotion: EmotionType;
  confidence: number;
  showLabel?: boolean;
}

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  emotion,
  confidence,
  showLabel = true,
}) => {
  const config = EMOTION_CONFIG[emotion];
  const pct = Math.round(confidence * 100);

  return (
    <div className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex justify-between text-xs font-medium">
          <span className="text-[#8C9AB5] flex items-center gap-1.5">
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </span>
          <span className="text-[#F4F7FF] font-mono">{pct}%</span>
        </div>
      )}
      <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: config.color }}
        />
      </div>
    </div>
  );
};
