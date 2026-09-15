import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { EmotionBadge } from '../components/EmotionBadge';
import { MOCK_HISTORY_LIST } from '../data/mockData';

export const HistoryPage: React.FC = () => {
  return (
    <PageContainer
      tagline="Archive"
      title="Analysis History"
      subtitle="Review past emotion assessments, compound states, and timestamped multi-signal insights."
    >
      <div className="space-y-4">
        {MOCK_HISTORY_LIST.map((item) => (
          <Link key={item.id} to="/result" className="block group">
            <GlassCard
              hoverEffect
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8C9AB5] flex items-center gap-1 font-mono">
                    <Clock size={12} /> {item.timestamp}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#49D6FF] bg-[#49D6FF]/10 px-2 py-0.5 rounded-full border border-[#49D6FF]/20">
                    {item.modality}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-[#F4F7FF] group-hover:text-[#6EA8FF] transition">
                  {item.summary}
                </h4>
                <p className="text-xs text-[#8C9AB5] line-clamp-1 leading-relaxed">
                  {item.explainableInsight}
                </p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                <EmotionBadge
                  emotion={item.overallEmotion.primary}
                  secondaryEmotion={item.overallEmotion.secondary}
                />
                <ArrowRight
                  size={16}
                  className="text-[#8C9AB5] group-hover:text-[#49D6FF] group-hover:translate-x-1 transition"
                />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};
