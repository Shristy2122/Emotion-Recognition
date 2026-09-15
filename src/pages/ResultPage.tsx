import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Mic, FileText, ArrowLeft, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { EmotionBadge } from '../components/EmotionBadge';
import { ConfidenceBar } from '../components/ConfidenceBar';
import { Button } from '../components/Button';
import { MOCK_ANALYSIS_RESULT } from '../data/mockData';

export const ResultPage: React.FC = () => {
  const result = MOCK_ANALYSIS_RESULT;

  return (
    <PageContainer
      tagline="Synthesized Analysis"
      title="One Emotional Story"
      subtitle="Multimodal fusion analysis and explainable AI insight comparing facial, vocal, and textual signals."
    >
      <div className="space-y-6">
        {/* Main Verdict Card */}
        <GlassCard className="border-[#4F8CFF]/40 bg-[#4F8CFF]/[0.05] shadow-glow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#49D6FF] font-mono font-semibold">
                <Sparkles size={14} /> Overall Affective State
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F7FF]">
                {result.overallEmotion.name || result.overallEmotion.primary}
              </h2>
              <p className="text-sm text-[#8C9AB5] max-w-2xl leading-relaxed">
                {result.explainableInsight}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0">
              <EmotionBadge
                emotion={result.overallEmotion.primary}
                secondaryEmotion={result.overallEmotion.secondary}
              />
              <span className="text-xs text-[#8C9AB5] font-mono">
                {Math.round(result.overallEmotion.confidence * 100)}% Confidence
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#FCD34D] bg-[#FCD34D]/10 border border-[#FCD34D]/25 px-2.5 py-0.5 rounded-full font-mono">
                <AlertCircle size={12} /> Cross-signal Divergence
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Signals Breakdown Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#F4F7FF]">
              Signal Breakdown
            </h3>
            <span className="text-xs text-[#8C9AB5] font-mono">
              3 Signals Compared
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {result.signals && result.signals.face && result.signals.voice && result.signals.text && (
              <>
                {/* Face Signal */}
                <GlassCard className="space-y-3 border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FCD34D]/10 flex items-center justify-center text-[#FCD34D]">
                        <Smile size={16} />
                      </div>
                      <span className="font-semibold text-sm text-[#F4F7FF]">Face Signal</span>
                    </div>
                    <EmotionBadge emotion={result.signals.face.primaryEmotion} size="sm" />
                  </div>
                  <div className="pt-2">
                    <ConfidenceBar
                      emotion={result.signals.face.primaryEmotion}
                      confidence={result.signals.face.confidence}
                    />
                  </div>
                  <p className="text-xs text-[#8C9AB5] pt-1">
                    Relaxed ocular contraction, micro-smile detected.
                  </p>
                </GlassCard>

                {/* Voice Signal */}
                <GlassCard className="space-y-3 border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                        <Mic size={16} />
                      </div>
                      <span className="font-semibold text-sm text-[#F4F7FF]">Voice Signal</span>
                    </div>
                    <EmotionBadge emotion={result.signals.voice.primaryEmotion} size="sm" />
                  </div>
                  <div className="pt-2">
                    <ConfidenceBar
                      emotion={result.signals.voice.primaryEmotion}
                      confidence={result.signals.voice.confidence}
                    />
                  </div>
                  <p className="text-xs text-[#8C9AB5] pt-1">
                    Low pitch contour, diminished vocal energy, prolonged pauses.
                  </p>
                </GlassCard>

                {/* Text Signal */}
                <GlassCard className="space-y-3 border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80]">
                        <FileText size={16} />
                      </div>
                      <span className="font-semibold text-sm text-[#F4F7FF]">Text Signal</span>
                    </div>
                    <EmotionBadge emotion={result.signals.text.primaryEmotion} size="sm" />
                  </div>
                  <div className="pt-2">
                    <ConfidenceBar
                      emotion={result.signals.text.primaryEmotion}
                      confidence={result.signals.text.confidence}
                    />
                  </div>
                  <p className="text-xs text-[#8C9AB5] pt-1">
                    Semantic sadness polarity: sentiment indicates grief/nostalgia.
                  </p>
                </GlassCard>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <Link to="/analyze" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto">
              <ArrowLeft size={16} /> New Analysis
            </Button>
          </Link>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/analyze/combined" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <RefreshCw size={16} /> Re-run Studio
              </Button>
            </Link>
            <Link to="/history" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                Save to History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
