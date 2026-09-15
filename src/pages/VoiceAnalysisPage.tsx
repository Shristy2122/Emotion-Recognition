import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, ArrowLeft, RefreshCw, Upload, Square } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Waveform } from '../components/Waveform';

export const VoiceAnalysisPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setDuration(0);
    } else {
      setIsRecording(false);
      // simulate instant analysis
      setAnalyzed(true);
    }
  };

  const handleReset = () => {
    setAnalyzed(false);
    setIsRecording(false);
    setDuration(0);
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <PageContainer
      tagline="Single Modality"
      title="Voice Analysis"
      subtitle="Sometimes emotion lives in the way we speak."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {!analyzed ? (
          <GlassCard className="text-center py-16 space-y-6">
            <div className="relative mx-auto w-24 h-24 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
              <Mic
                size={36}
                className={`transition-all ${
                  isRecording ? 'text-[#49D6FF] animate-pulse' : 'text-[#60A5FA]'
                }`}
              />
              {isRecording && (
                <div className="absolute inset-0 rounded-3xl border border-[#49D6FF] animate-ping opacity-25" />
              )}
            </div>

            {/* Waveform Visualization */}
            <Waveform isRecording={isRecording} />

            {/* Duration and Status */}
            <div className="space-y-1">
              <span className="text-2xl font-mono font-semibold text-[#F4F7FF]">
                {formatDuration(duration)}
              </span>
              <p className="text-xs font-mono text-[#8C9AB5]">
                {isRecording ? 'Listening...' : 'Ready to record'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                onClick={handleToggleRecord}
                variant={isRecording ? 'secondary' : 'primary'}
                className="gap-2 shadow-glow-sm"
              >
                {isRecording ? (
                  <>
                    <Square size={16} className="text-[#F87171]" /> Stop & Analyze
                  </>
                ) : (
                  <>
                    <Mic size={16} /> Start Recording
                  </>
                )}
              </Button>
              <Button variant="ghost" size="lg" className="gap-2">
                <Upload size={16} /> Upload Audio
              </Button>
            </div>
          </GlassCard>
        ) : (
          /* Voice Results State */
          <div className="space-y-6">
            {/* Current Emotion Card */}
            <GlassCard className="text-center py-10 space-y-4 border-[#FCD34D]/30 bg-[#FCD34D]/[0.04]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C9AB5]">
                Detected Vocal Emotion
              </span>
              <div className="text-6xl">😊</div>
              <h2 className="text-3xl font-extrabold text-[#F4F7FF]">Happy</h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#FCD34D]/15 border border-[#FCD34D]/30 font-mono text-sm text-[#FCD34D] font-semibold">
                71% Confidence
              </div>
            </GlassCard>

            {/* Simple Distribution */}
            <GlassCard className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                Acoustic Emotion Distribution
              </h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😊 Happy</span>
                    <span className="text-[#FCD34D] font-mono">71%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FCD34D] rounded-full" style={{ width: '71%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😢 Sad</span>
                    <span className="text-[#60A5FA] font-mono">14%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#60A5FA] rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😠 Angry</span>
                    <span className="text-[#F87171] font-mono">8%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F87171] rounded-full" style={{ width: '8%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😐 Neutral</span>
                    <span className="text-[#94A3B8] font-mono">7%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94A3B8] rounded-full" style={{ width: '7%' }} />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Action */}
            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" onClick={handleReset} className="gap-2">
                <RefreshCw size={16} /> Analyze Again
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
