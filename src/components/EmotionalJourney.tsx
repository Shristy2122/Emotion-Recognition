import React, { useState } from 'react';
import { TimelineMilestone } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';
import { Clock } from 'lucide-react';

interface EmotionalJourneyProps {
  timeline?: TimelineMilestone[];
}

export const EmotionalJourney: React.FC<EmotionalJourneyProps> = ({ timeline }) => {
  const [selectedPoint, setSelectedPoint] = useState<TimelineMilestone | null>(
    timeline && timeline.length > 2 ? timeline[2] : null
  );

  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold block mb-1">
            Temporal Progression
          </span>
          <h3 className="text-xl font-bold text-[#F4F7FF]">
            Your Emotional Journey
          </h3>
          <p className="text-xs text-[#8C9AB5] mt-0.5">
            See how emotional signals shifted dynamically throughout the session.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#8C9AB5] flex items-center gap-1.5 self-start sm:self-center">
          <Clock size={14} /> 30-second window
        </span>
      </div>

      {/* Horizontal Timeline Track */}
      <div className="overflow-x-auto pb-4 pt-6">
        <div className="relative min-w-[520px] px-8">
          {/* Connecting Track Line */}
          <div className="absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-white/10 via-[#4F8CFF]/30 to-white/10 -z-0" />

          {/* Timeline Nodes */}
          <div className="relative z-10 flex justify-between items-start">
            {timeline.map((point) => {
              const config = EMOTION_CONFIG[point.primaryEmotion];
              const isSelected = selectedPoint?.timestamp === point.timestamp;

              return (
                <button
                  key={point.timestamp}
                  onClick={() => setSelectedPoint(point)}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  <span className="text-[11px] font-mono text-[#8C9AB5] mb-2">
                    {point.timestamp}
                  </span>

                  {/* Node Circle */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                      isSelected
                        ? 'border-2 scale-110 shadow-glow-sm'
                        : 'border border-white/15 bg-[#060B18] hover:border-white/40'
                    }`}
                    style={{
                      borderColor: isSelected ? config.color : undefined,
                      backgroundColor: isSelected ? `${config.color}20` : '#0A1120',
                    }}
                  >
                    {config.emoji}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium mt-2 transition ${
                      isSelected ? 'text-[#F4F7FF]' : 'text-[#8C9AB5] group-hover:text-[#F4F7FF]'
                    }`}
                  >
                    {point.overallEmotionLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Point Inspector */}
      {selectedPoint && (
        <div className="p-4 rounded-2xl bg-[#060B18]/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {EMOTION_CONFIG[selectedPoint.primaryEmotion].emoji}
            </span>
            <div>
              <span className="text-[11px] font-mono text-[#49D6FF] uppercase">
                Snapshot at {selectedPoint.timestamp}
              </span>
              <h4 className="text-sm font-bold text-[#F4F7FF]">
                {selectedPoint.overallEmotionLabel}
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[#8C9AB5]">
              👤 Face:{' '}
              <strong className="text-[#F4F7FF]">
                {EMOTION_CONFIG[selectedPoint.signals.face.emotion].label} (
                {Math.round(selectedPoint.signals.face.confidence * 100)}%)
              </strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[#8C9AB5]">
              🎙 Voice:{' '}
              <strong className="text-[#F4F7FF]">
                {EMOTION_CONFIG[selectedPoint.signals.voice.emotion].label} (
                {Math.round(selectedPoint.signals.voice.confidence * 100)}%)
              </strong>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-[#8C9AB5]">
              📝 Text:{' '}
              <strong className="text-[#F4F7FF]">
                {EMOTION_CONFIG[selectedPoint.signals.text.emotion].label} (
                {Math.round(selectedPoint.signals.text.confidence * 100)}%)
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
