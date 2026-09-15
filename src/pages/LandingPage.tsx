import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  FileText,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';

/**
 * Sophisticated Abstract Visual:
 * 3 signals (Face, Voice, Text) flowing through subtle animated blue/cyan
 * connections into a central "✦ AI" node, converging into "One Emotional Story".
 */
const HeroFlowVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F8CFF]/15 via-[#49D6FF]/10 to-transparent blur-3xl -z-10 rounded-full" />

      {/* Main glass enclosure */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0A1120]/85 border border-white/[0.08] backdrop-blur-2xl shadow-2xl overflow-hidden">
        
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #49D6FF 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* 1. TOP: Three Signals */}
        <div className="relative grid grid-cols-3 gap-2.5 sm:gap-3 z-10">
          {/* Signal 1: Face */}
          <div className="group p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#FCD34D]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-xl bg-[#FCD34D]/10 border border-[#FCD34D]/20 flex items-center justify-center text-[#FCD34D] mb-2 group-hover:scale-105 transition-transform">
              <Eye size={16} />
            </div>
            <div className="text-xs font-semibold text-[#F4F7FF] flex items-center gap-1">
              <span>👤</span>
              <span>Face</span>
            </div>
            <div className="text-[10px] text-[#8C9AB5] font-mono mt-0.5">
              Visual cues
            </div>
          </div>

          {/* Signal 2: Voice */}
          <div className="group p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#60A5FA]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-xl bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center text-[#60A5FA] mb-2 group-hover:scale-105 transition-transform">
              <Mic size={16} />
            </div>
            <div className="text-xs font-semibold text-[#F4F7FF] flex items-center gap-1">
              <span>🎙</span>
              <span>Voice</span>
            </div>
            <div className="text-[10px] text-[#8C9AB5] font-mono mt-0.5">
              Acoustic tone
            </div>
          </div>

          {/* Signal 3: Text */}
          <div className="group p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#4ADE80]/40 transition-all duration-300 text-center flex flex-col items-center">
            <div className="w-8 h-8 rounded-xl bg-[#4ADE80]/10 border border-[#4ADE80]/20 flex items-center justify-center text-[#4ADE80] mb-2 group-hover:scale-105 transition-transform">
              <FileText size={16} />
            </div>
            <div className="text-xs font-semibold text-[#F4F7FF] flex items-center gap-1">
              <span>📝</span>
              <span>Text</span>
            </div>
            <div className="text-[10px] text-[#8C9AB5] font-mono mt-0.5">
              Meaning
            </div>
          </div>
        </div>

        {/* 2. MIDDLE: Animated Flow Lines converging into ✦ AI */}
        <div className="relative my-2 sm:my-3 h-20 flex items-center justify-center">
          {/* SVG Animated Connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 320 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flowGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#49D6FF" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="flowGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#49D6FF" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="flowGrad3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#49D6FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Static background trace paths */}
            <path d="M 53 0 C 53 45, 160 30, 160 75" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M 160 0 L 160 75" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <path d="M 267 0 C 267 45, 160 30, 160 75" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* Animated flowing streams */}
            <path
              d="M 53 0 C 53 45, 160 30, 160 75"
              stroke="url(#flowGrad1)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flow-dash"
            />
            <path
              d="M 160 0 L 160 75"
              stroke="url(#flowGrad2)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flow-dash"
            />
            <path
              d="M 267 0 C 267 45, 160 30, 160 75"
              stroke="url(#flowGrad3)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flow-dash"
            />
          </svg>

          {/* Central AI Convergence Orb */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-12 h-12 rounded-full p-[1px] bg-gradient-to-b from-[#49D6FF] via-[#4F8CFF] to-transparent shadow-glow-cyan animate-pulse-subtle">
              <div className="w-full h-full rounded-full bg-[#060B18] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#49D6FF]" />
              </div>
            </div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#4F8CFF]/15 border border-[#49D6FF]/30 text-[10px] font-mono font-semibold tracking-widest text-[#49D6FF] uppercase">
              ✦ AI
            </div>
          </div>
        </div>

        {/* 3. STEM: Animated Flow downward to One Emotional Story */}
        <div className="flex flex-col items-center mb-3">
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#49D6FF] via-[#4F8CFF] to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white blur-[1px] animate-pulse" />
          </div>
          <div className="w-2 h-2 rounded-full bg-[#49D6FF] shadow-glow-cyan" />
        </div>

        {/* 4. OUTCOME: "One Emotional Story" */}
        <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#4F8CFF]/15 via-white/[0.03] to-[#49D6FF]/15 border border-[#4F8CFF]/40 text-center shadow-glow-sm transition-all duration-300 hover:border-[#49D6FF]/60">
          <div className="flex items-center justify-center gap-1.5 mb-1 text-[11px] font-mono text-[#8C9AB5] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-ping" />
            <span>Harmonized Output</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-[#F4F7FF] tracking-tight">
            "One Emotional Story"
          </h4>
          <p className="text-xs text-[#8C9AB5] mt-1 font-normal">
            A cohesive understanding synthesized from three independent signals.
          </p>
        </div>

      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden selection:bg-[#4F8CFF]/30 selection:text-[#49D6FF]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#4F8CFF]/15 via-[#49D6FF]/5 to-transparent blur-[130px] -z-10" />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#49D6FF]/25 bg-[#49D6FF]/5 text-xs text-[#49D6FF] font-mono tracking-wide">
              <Sparkles size={13} />
              <span>MULTIMODAL EMOTION RECOGNITION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F4F7FF] leading-[1.12]">
              Every emotion <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#6EA8FF] to-[#49D6FF] bg-clip-text text-transparent">
                tells a story.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#8C9AB5] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Understand what your face, voice and words reveal — together.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/analyze" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-glow-sm">
                  Start Analysis ✦
                </Button>
              </Link>
              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium rounded-xl text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 transition duration-200 cursor-pointer"
              >
                See How It Works →
              </button>
            </div>
          </div>

          {/* Right Column: Sophisticated Abstract Visual */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <HeroFlowVisual />
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. THREE SIGNALS SECTION                                  */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
            Modalities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            Three signals. One emotional story.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5] leading-relaxed">
            Human emotion isn't limited to a single channel. Emotia decodes the three distinct ways we express how we feel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Face */}
          <GlassCard hoverEffect className="space-y-4 p-7">
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
            <p className="text-sm text-[#8C9AB5] leading-relaxed font-normal">
              Observes micro-expressions, ocular movement, and subtle muscle shifts that surface naturally in the face.
            </p>
          </GlassCard>

          {/* Card 2: Voice */}
          <GlassCard hoverEffect className="space-y-4 p-7">
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
            <p className="text-sm text-[#8C9AB5] leading-relaxed font-normal">
              Listens to pitch variations, cadence, rhythmic hesitation, and vocal tone carried within spoken sound.
            </p>
          </GlassCard>

          {/* Card 3: Text */}
          <GlassCard hoverEffect className="space-y-4 p-7">
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
            <p className="text-sm text-[#8C9AB5] leading-relaxed font-normal">
              Reads context, sentiment nuance, and the deeper emotional resonance beneath the chosen words.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CORE DIFFERENTIATOR: CONFLICTING SIGNALS               */}
      {/* ========================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#49D6FF] font-semibold font-mono">
            Unique Capability
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            When emotions don't tell the same story.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5]">
            People frequently smile while feeling sorrow, or speak calmly while experiencing internal strain.
          </p>
        </div>

        {/* Visual Example of Divergence */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0A1120]/80 border border-white/[0.08] backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
            
            {/* Input Signals: Discrepancy */}
            <div className="md:col-span-5 space-y-3">
              {/* Face Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/80 border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😢</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Face →</div>
                    <div className="text-sm font-semibold text-[#60A5FA]">Sad</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">76%</span>
              </div>

              {/* Voice Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/80 border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😊</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Voice →</div>
                    <div className="text-sm font-semibold text-[#FCD34D]">Happy</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">69%</span>
              </div>

              {/* Text Card */}
              <div className="p-3.5 rounded-2xl bg-[#060B18]/80 border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">😢</span>
                  <div>
                    <div className="text-xs text-[#8C9AB5] font-mono">Text →</div>
                    <div className="text-sm font-semibold text-[#60A5FA]">Sad</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-medium text-[#F4F7FF]">72%</span>
              </div>
            </div>

            {/* Fusion Bridge */}
            <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
              <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-white/10 via-[#49D6FF] to-white/10" />
              <div className="my-3 px-3 py-1.5 rounded-full bg-[#4F8CFF]/20 border border-[#49D6FF]/40 text-[#49D6FF] text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-glow-sm">
                <Sparkles size={14} />
                <span>AI FUSION</span>
              </div>
              <div className="hidden md:block w-full h-0.5 bg-gradient-to-r from-white/10 via-[#49D6FF] to-white/10" />
            </div>

            {/* Synthesized Compound Result */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/15 via-white/[0.02] to-[#49D6FF]/10 border border-[#4F8CFF]/40 text-center space-y-2.5">
              <div className="text-3xl font-extrabold tracking-wider text-[#F4F7FF]">
                😢 + 😊
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#60A5FA] to-[#FCD34D] bg-clip-text text-transparent">
                Sad + Happy
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs text-[#8C9AB5]">
                Compound Emotion • Bittersweet
              </div>
            </div>

          </div>

          {/* Differentiator Statement */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-sm sm:text-base text-[#F4F7FF] max-w-2xl mx-auto font-medium">
              "Combined analysis can identify emotional signals that don't fully agree."
            </p>
            <p className="text-xs sm:text-sm text-[#8C9AB5] max-w-xl mx-auto mt-2 leading-relaxed">
              Instead of forcing a single contradictory guess, Emotia detects mixed emotions and provides explainable insights into what each signal conveys.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. HOW IT WORKS SECTION                                   */}
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
            Three straightforward steps to emotional understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <GlassCard className="relative p-8 space-y-3">
            <div className="text-4xl font-mono font-bold text-[#4F8CFF]/50">
              01
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF]">
              Choose
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Select an individual signal — Face, Voice, or Text — or launch the full Combined mode to analyze all three simultaneously.
            </p>
          </GlassCard>

          {/* Step 2 */}
          <GlassCard className="relative p-8 space-y-3">
            <div className="text-4xl font-mono font-bold text-[#49D6FF]/50">
              02
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF]">
              Analyze
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Provide your input naturally through your webcam, microphone, or typed text. Analysis runs smoothly and securely in real time.
            </p>
          </GlassCard>

          {/* Step 3 */}
          <GlassCard className="relative p-8 space-y-3">
            <div className="text-4xl font-mono font-bold text-[#6EA8FF]/50">
              03
            </div>
            <h3 className="text-xl font-bold text-[#F4F7FF]">
              Understand
            </h3>
            <p className="text-sm text-[#8C9AB5] leading-relaxed">
              Receive your holistic emotional story — discovering compound emotions, signal harmony, and explainable AI insights.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. MINIMAL SPACIOUS CTA                                   */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#4F8CFF]/10 via-[#0A1120] to-[#060B18] border border-[#4F8CFF]/25 shadow-glow-md space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
            Every emotion tells a story.
          </h2>
          <p className="text-sm sm:text-base text-[#8C9AB5] max-w-md mx-auto leading-relaxed">
            Ready to discover what your combined signals reveal?
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
