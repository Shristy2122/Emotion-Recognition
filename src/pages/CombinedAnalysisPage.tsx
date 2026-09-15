import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Smile, Mic, FileText, ArrowLeft, Square } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { CameraPreview } from '../components/CameraPreview';

export const CombinedAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessionPhase, setSessionPhase] = useState<'recording' | 'processing' | 'ready'>('recording');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any;
    if (sessionPhase === 'recording') {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionPhase]);

  const handleStopAndAnalyze = () => {
    setSessionPhase('processing');
    setTimeout(() => {
      navigate('/result');
    }, 1400);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = s % 60;
    return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer
      tagline="Flagship Multimodal Studio"
      title="Combined Analysis"
      subtitle="See what your face, voice and words are saying together."
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#49D6FF]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#49D6FF] animate-ping" />
              Live Concurrent Session
            </span>
            <span className="text-xs font-mono text-[#8C9AB5]">
              Duration: <strong className="text-[#F4F7FF]">{formatTimer(seconds)}</strong>
            </span>
          </div>

          <Button
            size="md"
            onClick={handleStopAndAnalyze}
            disabled={sessionPhase === 'processing'}
            className="gap-2 shadow-glow-sm"
          >
            {sessionPhase === 'processing' ? (
              <>
                <Sparkles size={16} className="animate-spin" /> Understanding Signals...
              </>
            ) : (
              <>
                <Square size={14} className="text-[#F87171]" /> Stop & Analyze ✦
              </>
            )}
          </Button>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Camera + Live Transcript */}
          <div className="lg:col-span-7 space-y-4">
            <CameraPreview isActive={true} isFaceDetected={true} className="shadow-2xl" />

            {/* Live Modality Status Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <Smile size={14} className="text-[#FCD34D]" /> Face
                </span>
                <span className="text-[#4ADE80] font-mono text-[11px]">Ready ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <Mic size={14} className="text-[#60A5FA]" /> Voice
                </span>
                <span className="text-[#4ADE80] font-mono text-[11px]">Ready ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <FileText size={14} className="text-[#4ADE80]" /> Text
                </span>
                <span className="text-[#49D6FF] font-mono text-[11px] animate-pulse">
                  Listening...
                </span>
              </div>
            </div>

            {/* Live Speech-to-Text Automatic Transcript */}
            <div className="p-4 rounded-2xl bg-[#060B18]/70 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C9AB5] block">
                Live Speech Transcript
              </span>
              <p className="text-sm font-medium text-[#F4F7FF] italic leading-relaxed">
                "I'm happy today, but I still feel a little sad."
              </p>
            </div>
          </div>

          {/* Right Column: Live Signals & AI Fusion Visual */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold">
                  Live Sensory Signals
                </span>
                <span className="text-[11px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full">
                  Synchronized
                </span>
              </div>

              {/* 3 Real-time Live Signal Readings */}
              <div className="space-y-3">
                {/* WHAT I SEE */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#FCD34D]/10 text-[#FCD34D]">
                      <Smile size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I SEE · Face
                      </span>
                      <span className="text-sm font-semibold text-[#60A5FA]">😢 Sad</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">76%</span>
                </div>

                {/* WHAT I HEAR */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#60A5FA]/10 text-[#60A5FA]">
                      <Mic size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I HEAR · Voice
                      </span>
                      <span className="text-sm font-semibold text-[#FCD34D]">😊 Happy</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">69%</span>
                </div>

                {/* WHAT I READ */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#4ADE80]/10 text-[#4ADE80]">
                      <FileText size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I READ · Text
                      </span>
                      <span className="text-sm font-semibold text-[#60A5FA]">😢 Sad</span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">72%</span>
                </div>
              </div>

              {/* Dynamic Animated AI Fusion Node */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4F8CFF]/15 via-[#0A1120] to-[#49D6FF]/15 border border-[#4F8CFF]/30 text-center space-y-2 shadow-glow-sm">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#49D6FF] font-semibold tracking-wider">
                    <Sparkles size={15} className="animate-spin text-[#49D6FF]" />
                    <span>AI FUSION ACTIVE</span>
                  </div>
                  <p className="text-xs text-[#8C9AB5]">
                    {sessionPhase === 'processing'
                      ? 'Connecting your signals...'
                      : 'Signals understood.'}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

        </div>

        {/* Back link */}
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
