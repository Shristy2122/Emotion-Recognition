import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Bookmark, Sparkles, Check } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { EmotionSpectrum } from '../components/EmotionSpectrum';
import { SignalAlignment } from '../components/SignalAlignment';
import { EmotionBlend } from '../components/EmotionBlend';
import { WhyResult } from '../components/WhyResult';
import { EmotionalJourney } from '../components/EmotionalJourney';
import { analysisService } from '../services/analysisService';
import { EMOTION_CONFIG } from '../utils/emotionColors';

export const ResultPage: React.FC = () => {
  const result = analysisService.getCurrentResult();
  const [isSaved, setIsSaved] = useState(false);

  const primaryConfig = EMOTION_CONFIG[result.primaryEmotion];
  const secondaryConfig = result.secondaryEmotion ? EMOTION_CONFIG[result.secondaryEmotion] : null;
  const pct = Math.round(result.confidence * 100);

  const handleSave = () => {
    analysisService.saveResult(result);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <PageContainer
      tagline="Understand Your Emotional Story"
      title="Your Emotional State"
      subtitle="One cohesive emotional story synthesized from your face, voice, and words."
      maxWidth="max-w-5xl"
    >
      <div className="space-y-8">
        {/* ========================================================= */}
        {/* 1. FINAL EMOTION & CONFIDENCE (Primary Hierarchy)          */}
        {/* ========================================================= */}
        <GlassCard className="text-center py-10 sm:py-14 border-[#4F8CFF]/40 bg-gradient-to-b from-[#4F8CFF]/[0.08] to-transparent shadow-glow-sm relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-radial from-[#49D6FF]/10 via-transparent to-transparent blur-3xl -z-10" />

          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold block">
              ✦ One Emotional Story
            </span>

            {/* Dynamic Emoji Indicator */}
            <div className="text-5xl sm:text-6xl tracking-widest">
              {result.isCompound && secondaryConfig ? (
                <span>
                  {primaryConfig.emoji} + {secondaryConfig.emoji}
                </span>
              ) : (
                <span>{primaryConfig.emoji}</span>
              )}
            </div>

            {/* Headline State */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#60A5FA] via-[#F4F7FF] to-[#FCD34D] bg-clip-text text-transparent">
              {result.compoundName || primaryConfig.label}
            </h1>

            {/* Confidence Badge */}
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#49D6FF]/15 border border-[#49D6FF]/30 font-mono text-sm text-[#49D6FF] font-semibold shadow-glow-cyan">
                <Sparkles size={14} /> {pct}% Overall Confidence
              </span>
            </div>

            <p className="text-sm text-[#8C9AB5] max-w-md mx-auto pt-1">
              "{result.alignment?.headline || 'Sensory signals synthesized.'}"
            </p>
          </div>
        </GlassCard>

        {/* ========================================================= */}
        {/* 2. SIGNALS SPECTRUM (WHAT I SEE, WHAT I HEAR, WHAT I READ) */}
        {/* ========================================================= */}
        {result.signals && (
          <GlassCard className="p-6 sm:p-8">
            <EmotionSpectrum signals={result.signals} />
          </GlassCard>
        )}

        {/* ========================================================= */}
        {/* 3. SIGNAL ALIGNMENT (How your signals align)              */}
        {/* ========================================================= */}
        <SignalAlignment alignment={result.alignment} />

        {/* ========================================================= */}
        {/* 4. EMOTION BLEND (Color & Compound Convergence)           */}
        {/* ========================================================= */}
        <EmotionBlend
          primaryEmotion={result.primaryEmotion}
          secondaryEmotion={result.secondaryEmotion}
          confidence={result.confidence}
          isCompound={result.isCompound}
          compoundName={result.compoundName}
        />

        {/* ========================================================= */}
        {/* 5. WHY THIS RESULT (Expandable Explainable AI)            */}
        {/* ========================================================= */}
        <WhyResult explanation={result.whyExplanation} />

        {/* ========================================================= */}
        {/* 6. EMOTIONAL JOURNEY (Temporal Timeline Progression)      */}
        {/* ========================================================= */}
        <EmotionalJourney timeline={result.timeline} />

        {/* ========================================================= */}
        {/* 7. ACTIONS (Bottom Nav)                                   */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
          <Link to="/analyze" className="w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto gap-2">
              <ArrowLeft size={16} /> Back to Analyze
            </Button>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleSave}
              className="w-full sm:w-auto gap-2"
            >
              {isSaved ? (
                <>
                  <Check size={16} className="text-[#4ADE80]" /> Saved!
                </>
              ) : (
                <>
                  <Bookmark size={16} /> Save Result
                </>
              )}
            </Button>

            <Link to="/analyze/combined" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2 shadow-glow-sm">
                <RefreshCw size={16} /> Analyze Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
