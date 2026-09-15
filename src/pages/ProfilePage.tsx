import React, { useState } from 'react';
import { User, Shield, Moon, Trash2, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { analysisService } from '../services/analysisService';

export const ProfilePage: React.FC = () => {
  const [historyCleared, setHistoryCleared] = useState(false);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local emotion recognition history?')) {
      analysisService.clearHistory();
      setHistoryCleared(true);
      setTimeout(() => setHistoryCleared(false), 2500);
    }
  };

  return (
    <PageContainer
      tagline="Settings"
      title="Profile & Preferences"
      subtitle="Manage your identity, theme, and privacy configurations."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <GlassCard className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4F8CFF] to-[#49D6FF] flex items-center justify-center text-white shadow-glow-sm">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F4F7FF]">Shristy</h3>
              <p className="text-xs font-mono text-[#8C9AB5]">shristy@emotia.ai</p>
              <span className="inline-block mt-1 text-[10px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
                Active Client Session
              </span>
            </div>
          </div>
        </GlassCard>

        {/* Preferences & Theme Card */}
        <GlassCard className="space-y-5 p-6">
          <h4 className="text-sm font-semibold text-[#F4F7FF] flex items-center gap-2 border-b border-white/5 pb-3">
            <Moon size={16} className="text-[#49D6FF]" /> Preferences & Display
          </h4>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-1">
              <div>
                <span className="text-[#F4F7FF] font-medium block">Visual Theme</span>
                <span className="text-[#8C9AB5]">Signature dark navy system</span>
              </div>
              <span className="font-mono text-[#49D6FF] bg-[#49D6FF]/10 px-2.5 py-1 rounded-full border border-[#49D6FF]/20">
                #060B18 (Dark Navy)
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-white/5 pt-3">
              <div>
                <span className="text-[#F4F7FF] font-medium block">Compound Emotion Resolution</span>
                <span className="text-[#8C9AB5]">Synthesizes multi-signal affective blends</span>
              </div>
              <span className="font-mono text-[#4ADE80]">Enabled</span>
            </div>

            <div className="flex items-center justify-between py-1 border-t border-white/5 pt-3">
              <div>
                <span className="text-[#F4F7FF] font-medium block">Confidence Floor Threshold</span>
                <span className="text-[#8C9AB5]">Minimum probabilistic confidence cutoff</span>
              </div>
              <span className="font-mono text-[#F4F7FF]">60%</span>
            </div>
          </div>
        </GlassCard>

        {/* Privacy & Data Management */}
        <GlassCard className="space-y-5 p-6">
          <h4 className="text-sm font-semibold text-[#F4F7FF] flex items-center gap-2 border-b border-white/5 pb-3">
            <Shield size={16} className="text-[#4ADE80]" /> Privacy & Local Data
          </h4>

          <p className="text-xs text-[#8C9AB5] leading-relaxed">
            Emotia is built with an on-device first privacy philosophy. Your facial frames, microphone audio buffers, and text transcripts are analyzed in client memory and never persisted externally.
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-white/5">
            <div>
              <span className="text-xs text-[#F4F7FF] font-medium block">History Storage</span>
              <span className="text-[11px] text-[#8C9AB5]">Clear stored analysis sessions</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearHistory}
              className="border-[#F87171]/40 text-[#F87171] hover:bg-[#F87171]/10 gap-1.5"
            >
              {historyCleared ? (
                <>
                  <CheckCircle2 size={14} /> Cleared!
                </>
              ) : (
                <>
                  <Trash2 size={14} /> Delete History
                </>
              )}
            </Button>
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
};
