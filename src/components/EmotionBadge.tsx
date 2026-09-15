import React from 'react';
import { EmotionType } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';

interface EmotionBadgeProps {
  emotion: EmotionType;
  secondaryEmotion?: EmotionType;
  size?: 'sm' | 'md';
}

export const EmotionBadge: React.FC<EmotionBadgeProps> = ({
  emotion,
  secondaryEmotion,
  size = 'md',
}) => {
  const primary = EMOTION_CONFIG[emotion];
  const secondary = secondaryEmotion ? EMOTION_CONFIG[secondaryEmotion] : null;

  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3.5 py-1';

  if (secondary) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full font-medium border border-white/10 bg-white/[0.04] backdrop-blur-sm ${sizeClass}`}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: primary.color }}
          />
          <span style={{ color: primary.color }}>{primary.label}</span>
        </span>
        <span className="text-[#8C9AB5] text-xs">·</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: secondary.color }}
          />
          <span style={{ color: secondary.color }}>{secondary.label}</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${primary.bgClass} ${primary.borderClass} ${primary.textClass} ${sizeClass}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: primary.color }}
      />
      {primary.label}
    </span>
  );
};
