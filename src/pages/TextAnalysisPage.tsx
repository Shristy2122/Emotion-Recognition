import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

export const TextAnalysisPage: React.FC = () => {
  const [text, setText] = useState(
    'I was very happy to see everyone today, but leaving makes me feel profoundly sad.'
  );

  return (
    <PageContainer
      tagline="Single Modality"
      title="Text Emotion Analysis"
      subtitle="Analyze emotional meaning, nuance, and sentiment polarity in written text."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <GlassCard>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9AB5] mb-3">
            Input Statement / Dialogue
          </label>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste any text to analyze emotional cues..."
            className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl p-4 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition resize-none leading-relaxed"
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-[#8C9AB5] font-mono">
              {text.length} characters
            </span>
            <Link to="/result">
              <Button>
                Analyze Text <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </GlassCard>

        <div className="flex justify-between items-center text-sm">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-1.5 text-[#8C9AB5] hover:text-[#F4F7FF] transition"
          >
            <ArrowLeft size={16} /> Back to Mode Selection
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
