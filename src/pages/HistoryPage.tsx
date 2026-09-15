import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { analysisService } from '../services/analysisService';
import { ModalityType } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';

type FilterTab = 'all' | ModalityType;

export const HistoryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const historyList = analysisService.getHistory();

  const filterTabs: Array<{ id: FilterTab; label: string }> = [
    { id: 'all', label: 'All' },
    { id: 'face', label: 'Face' },
    { id: 'voice', label: 'Voice' },
    { id: 'text', label: 'Text' },
    { id: 'combined', label: 'Combined' },
  ];

  const filteredItems = historyList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.modality === activeFilter;
  });

  return (
    <PageContainer
      tagline="Archive"
      title="Your Emotional History"
      subtitle="Explore how your emotional signals have changed over time."
      maxWidth="max-w-5xl"
    >
      <div className="space-y-6">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] w-fit">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#4F8CFF]/20 text-[#F4F7FF] border border-[#49D6FF]/40 shadow-glow-sm font-semibold'
                  : 'text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* History Cards List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const primaryConfig = EMOTION_CONFIG[item.primaryEmotion];
            const secondaryConfig = item.secondaryEmotion ? EMOTION_CONFIG[item.secondaryEmotion] : null;

            return (
              <Link key={item.id} to="/result" className="block group">
                <GlassCard
                  hoverEffect
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6"
                >
                  {/* Left: Emotion Emoji & Details */}
                  <div className="flex items-start sm:items-center gap-5">
                    {/* Emoji Cluster */}
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl shadow-sm shrink-0">
                      {item.isCompound && secondaryConfig ? (
                        <span>
                          {primaryConfig.emoji} + {secondaryConfig.emoji}
                        </span>
                      ) : (
                        <span>{primaryConfig.emoji}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#49D6FF] bg-[#49D6FF]/10 px-2.5 py-0.5 rounded-full border border-[#49D6FF]/20 font-semibold">
                          {item.modality}
                        </span>
                        <span className="text-xs font-mono text-[#8C9AB5] flex items-center gap-1">
                          <Clock size={12} /> {item.timestamp}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#F4F7FF] group-hover:text-[#6EA8FF] transition">
                        {item.compoundName || primaryConfig.label}
                      </h3>

                      {/* Small modality indicators if combined */}
                      {item.signals && (
                        <div className="flex items-center gap-3 pt-1 text-xs font-mono text-[#8C9AB5]">
                          <span className="flex items-center gap-1">
                            👤 {item.signals.face ? EMOTION_CONFIG[item.signals.face.primaryEmotion].emoji : '—'}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            🎙 {item.signals.voice ? EMOTION_CONFIG[item.signals.voice.primaryEmotion].emoji : '—'}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            📝 {item.signals.text ? EMOTION_CONFIG[item.signals.text.primaryEmotion].emoji : '—'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Confidence & Arrow */}
                  <div className="flex items-center gap-5 self-end sm:self-center shrink-0">
                    <div className="text-right font-mono">
                      <span className="text-lg font-bold text-[#F4F7FF]">
                        {Math.round(item.confidence * 100)}%
                      </span>
                      <span className="block text-[10px] text-[#8C9AB5] uppercase">
                        Confidence
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8C9AB5] group-hover:border-[#49D6FF] group-hover:text-[#49D6FF] group-hover:translate-x-1 transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-[#8C9AB5] space-y-2">
              <p>No history found for this modality filter.</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
