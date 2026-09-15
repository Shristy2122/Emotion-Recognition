import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

export const TextAnalysisPage: React.FC = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1000);
  };

  const handleReset = () => {
    setAnalyzed(false);
    setText('');
  };

  return (
    <PageContainer
      tagline="Single Modality"
      title="Text Analysis"
      subtitle="Tell us what was said."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {!analyzed ? (
          <GlassCard className="space-y-4">
            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write or paste something here..."
              className="w-full bg-[#060B18]/70 border border-white/10 rounded-2xl p-5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition resize-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs font-mono text-[#8C9AB5]">
                {text.length} characters
              </span>

              <Button
                size="md"
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className="shadow-glow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Analyze Emotion ✦
                  </>
                )}
              </Button>
            </div>
          </GlassCard>
        ) : (
          /* Text Results State */
          <div className="space-y-6">
            {/* Current Emotion Card */}
            <GlassCard className="text-center py-10 space-y-4 border-[#60A5FA]/30 bg-[#60A5FA]/[0.04]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C9AB5]">
                Detected Text Emotion
              </span>
              <div className="text-6xl">😢</div>
              <h2 className="text-3xl font-extrabold text-[#F4F7FF]">Sad</h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#60A5FA]/15 border border-[#60A5FA]/30 font-mono text-sm text-[#60A5FA] font-semibold">
                64% Confidence
              </div>
            </GlassCard>

            {/* Simple Distribution */}
            <GlassCard className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                Emotional Meaning Breakdown
              </h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😢 Sad</span>
                    <span className="text-[#60A5FA] font-mono">64%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#60A5FA] rounded-full" style={{ width: '64%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😊 Happy</span>
                    <span className="text-[#FCD34D] font-mono">32%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FCD34D] rounded-full" style={{ width: '32%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😐 Neutral</span>
                    <span className="text-[#94A3B8] font-mono">4%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94A3B8] rounded-full" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Action */}
            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" onClick={handleReset} className="gap-2">
                <RefreshCw size={16} /> Analyze Another
              </Button>
              <Link to="/analyze">
                <Button variant="ghost">Other Modes</Button>
              </Link>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center text-sm pt-4">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-1.5 text-[#8C9AB5] hover:text-[#F4F7FF] transition"
          >
            <ArrowLeft size={16} /> Back to Selection
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
