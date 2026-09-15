import React from 'react';
import { Link } from 'react-router-dom';
import {
  Smile,
  Mic,
  FileText,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';

export const LandingPage: React.FC = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#4F8CFF]/15 via-[#49D6FF]/5 to-transparent blur-[120px] -z-10" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#49D6FF]/25 bg-[#49D6FF]/5 text-xs text-[#49D6FF] font-mono tracking-wide">
              <Sparkles size={14} /> MULTIMODAL EMOTION RECOGNITION
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F4F7FF] leading-[1.12]">
              Every emotion <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#6EA8FF] to-[#49D6FF] bg-clip-text text-transparent">
                tells a story.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#8C9AB5] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Understand what your face, voice and words reveal — together.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/analyze" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-glow-sm">
                  Start Analysis ✦
                </Button>
              </Link>
              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-xl text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/[0.04] transition duration-200 cursor-pointer"
              >
                How It Works →
              </button>
            </div>
          </div>

          {/* Right Column: Abstract Emotional Intelligence Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl">
              
              {/* Radial center glow */}
              <div className="absolute inset-0 bg-radial from-[#4F8CFF]/15 via-transparent to-transparent blur-2xl -z-10" />

              {/* Three floating signal origins */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition hover:border-[#FCD34D]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#FCD34D]/10 flex items-center justify-center text-[#FCD34D]">
                      <Smile size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F4F7FF]">👤 Face</div>
                      <div className="text-[11px] text-[#8C9AB5]">Facial expressions</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#FCD34D] bg-[#FCD34D]/10 px-2 py-0.5 rounded-full border border-[#FCD34D]/20">
                    Signal 01
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition hover:border-[#60A5FA]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                      <Mic size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F4F7FF]">🎙 Voice</div>
                      <div className="text-[11px] text-[#8C9AB5]">Acoustic cadence</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#60A5FA] bg-[#60A5FA]/10 px-2 py-0.5 rounded-full border border-[#60A5FA]/20">
                    Signal 02
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] transition hover:border-[#4ADE80]/40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80]">
                      <FileText size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F4F7FF]">📝 Text</div>
                      <div className="text-[11px] text-[#8C9AB5]">Spoken words</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
                    Signal 03
                  </span>
                </div>
              </div>

              {/* Converging Flow Indicator */}
              <div className="flex flex-col items-center my-3">
                <div className="h-5 w-0.5 bg-gradient-to-b from-white/20 to-[#49D6FF]" />
                <div className="my-2 p-2 rounded-full bg-[#4F8CFF]/20 border border-[#49D6FF]/40 text-[#49D6FF] shadow-glow-cyan">
                  <Sparkles size={16} className="animate-pulse" />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
                  ✦ AI Fusion
                </div>
                <div className="h-5 w-0.5 bg-gradient-to-b from-[#49D6FF] to-white/20" />
              </div>

              {/* Final Synthesis Outcome */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4F8CFF]/15 via-white/[0.03] to-[#49D6FF]/15 border border-[#4F8CFF]/40 text-center shadow-glow-sm">
                <span className="text-[10px] text-[#8C9AB5] uppercase tracking-wider block mb-1 font-mono">
                  Holistic Insight
                </span>
                <span className="text-base sm:text-lg font-bold text-[#F4F7FF] tracking-tight">
                  "One Emotional Story"
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THREE SIGNALS SECTION                                  */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
            Modalities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            Three signals. One emotional story.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5]">
            Emotia decodes the three foundational channels through which human affect is expressed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Signal 1: Face */}
          <GlassCard hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FCD34D]/10 border border-[#FCD34D]/20 flex items-center justify-center text-[#FCD34D]">
              <Eye size={22} />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C9AB5] block">
                👤 WHAT I SEE
              </span>
              <h3 className="text-xl font-semibold text-[#F4F7FF] mt-1">
                Facial expressions
              </h3>
            </div>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Detects micro-expressions, facial muscle movements, ocular markers, and eyebrow tension through computer vision.
            </p>
          </GlassCard>

          {/* Signal 2: Voice */}
          <GlassCard hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA]">
              <Mic size={22} />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C9AB5] block">
                🎙 WHAT I HEAR
              </span>
              <h3 className="text-xl font-semibold text-[#F4F7FF] mt-1">
                Vocal emotion
              </h3>
            </div>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Analyzes acoustic pitch, frequency inflection, speech cadence, and tremors across audio prosody waveforms.
            </p>
          </GlassCard>

          {/* Signal 3: Text */}
          <GlassCard hoverEffect className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center text-[#4ADE80]">
              <FileText size={22} />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C9AB5] block">
                📝 WHAT I READ
              </span>
              <h3 className="text-xl font-semibold text-[#F4F7FF] mt-1">
                Emotional meaning
              </h3>
            </div>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Extracts semantic sentiment, linguistic context, lexical subtlety, and subtext from spoken or transcribed words.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CORE DIFFERENTIATOR                                    */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
            Cross-Signal Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            When emotions don't tell the same story.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5]">
            Single-mode detectors miss what happens when facial cues, vocal tonality, and spoken language conflict.
          </p>
        </div>

        {/* Divergence & AI Fusion Visual */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Input Signals: Conflict */}
            <div className="md:col-span-5 space-y-3">
              {/* Face Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/70 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😢</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Face</div>
                    <div className="text-sm font-semibold text-[#60A5FA]">Sad</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">76%</span>
              </div>

              {/* Voice Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/70 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😊</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Voice</div>
                    <div className="text-sm font-semibold text-[#FCD34D]">Happy</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">69%</span>
              </div>

              {/* Text Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/70 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😢</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Text</div>
                    <div className="text-sm font-semibold text-[#60A5FA]">Sad</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">72%</span>
              </div>
            </div>

            {/* Fusion Bridge */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
              <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-white/10 via-[#49D6FF] to-white/10" />
              <div className="my-3 px-3 py-1.5 rounded-full bg-[#4F8CFF]/20 border border-[#49D6FF]/30 text-[#49D6FF] text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-glow-sm">
                <Sparkles size={14} /> AI FUSION
              </div>
              <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-white/10 via-[#49D6FF] to-white/10" />
            </div>

            {/* Compound Outcome */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/15 via-white/[0.02] to-[#49D6FF]/10 border border-[#4F8CFF]/40 text-center space-y-2.5">
              <div className="text-3xl font-extrabold tracking-wider text-[#F4F7FF]">
                😢 + 😊
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#FCD34D] bg-clip-text text-transparent">
                Sad · Happy
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-[#8C9AB5]">
                Compound Emotion (Bittersweet)
              </div>
            </div>

          </div>

          {/* Differentiator Explanation */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-sm text-[#8C9AB5] max-w-2xl mx-auto leading-relaxed">
              Combined analysis compares emotional signals across face, voice and text to understand complex emotional states.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HOW IT WORKS                                           */}
      {/* ========================================================= */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.04]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            How It Works
          </h2>
          <p className="text-sm text-[#8C9AB5]">
            From raw signals to psychological clarity in three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <GlassCard className="relative p-8">
            <div className="text-4xl font-mono font-bold text-[#4F8CFF]/40 mb-3">
              01
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF] mb-2">
              Choose
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Select an individual modality (Face, Voice, or Text), or activate the full Combined studio for synchronized multimodal analysis.
            </p>
          </GlassCard>

          {/* Step 2 */}
          <GlassCard className="relative p-8">
            <div className="text-4xl font-mono font-bold text-[#49D6FF]/40 mb-3">
              02
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF] mb-2">
              Analyze
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Emotia extracts micro-expressions, speech acoustic variance, and lexical intent simultaneously without cognitive friction.
            </p>
          </GlassCard>

          {/* Step 3 */}
          <GlassCard className="relative p-8">
            <div className="text-4xl font-mono font-bold text-[#6EA8FF]/40 mb-3">
              03
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF] mb-2">
              Understand
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Receive your holistic emotional story — identifying compound emotions, cross-signal harmony, and hidden emotional conflicts.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FINAL CTA                                              */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#4F8CFF]/10 via-[#0A1120] to-[#060B18] border border-[#4F8CFF]/30 shadow-glow-md space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F4F7FF] max-w-2xl mx-auto leading-tight">
            Ready to understand the emotion behind the moment?
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5] max-w-lg mx-auto">
            Experience how multimodal AI brings harmony to what your face, voice, and words say.
          </p>
          <div className="pt-2">
            <Link to="/analyze">
              <Button size="lg" className="px-8 shadow-glow-sm">
                Start Analysis ✦
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
