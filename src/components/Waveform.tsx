import React from 'react';

interface WaveformProps {
  isRecording?: boolean;
  barCount?: number;
  className?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isRecording = false,
  barCount = 28,
  className = '',
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      className={`flex items-center justify-center gap-1.5 h-16 w-full max-w-md mx-auto py-2 ${className}`}
      aria-label="Audio Waveform"
    >
      {bars.map((bar) => {
        // Generate pseudo-random height variances
        const baseHeight = ((bar * 17) % 24) + 12; // 12px to 36px
        const activeHeight = ((bar * 31) % 48) + 16; // 16px to 64px

        return (
          <div
            key={bar}
            className={`w-1 rounded-full transition-all duration-300 ${
              isRecording
                ? 'bg-gradient-to-t from-[#4F8CFF] to-[#49D6FF] animate-pulse'
                : 'bg-white/15'
            }`}
            style={{
              height: isRecording ? `${activeHeight}px` : `${baseHeight * 0.4}px`,
              animationDelay: `${(bar * 45) % 800}ms`,
              animationDuration: isRecording ? '650ms' : '0ms',
            }}
          />
        );
      })}
    </div>
  );
};
