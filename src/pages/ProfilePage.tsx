import React from 'react';
import { User, Shield, Sliders, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';

export const ProfilePage: React.FC = () => {
  return (
    <PageContainer
      tagline="Preferences"
      title="User Profile & Privacy"
      subtitle="Manage your multimodal session preferences, local telemetry, and privacy controls."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <GlassCard className="text-center py-8 space-y-3">
          <div className="w-18 h-18 mx-auto rounded-2xl bg-[#4F8CFF]/15 border border-[#4F8CFF]/30 flex items-center justify-center text-[#49D6FF] shadow-glow-sm">
            <User size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#F4F7FF]">Local Session</h3>
          <p className="text-xs text-[#8C9AB5] font-mono">Emotia Client v0.1.0</p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#4ADE80] bg-[#4ADE80]/10 px-2.5 py-1 rounded-full border border-[#4ADE80]/20 font-mono">
              <CheckCircle2 size={12} /> Privacy Shield Active
            </span>
          </div>
        </GlassCard>

        {/* Privacy & Settings Info */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F4F7FF]">
              <Shield size={18} className="text-[#49D6FF]" />
              On-Device Privacy First
            </div>
            <p className="text-xs text-[#8C9AB5] leading-relaxed">
              Emotia is designed with strict on-device and edge privacy architecture. Camera feeds, microphone frames, and transcribed audio remain in volatile memory and are never stored on external cloud infrastructure without explicit authorization.
            </p>
          </GlassCard>

          <GlassCard className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#F4F7FF]">
              <Sliders size={18} className="text-[#6EA8FF]" />
              Analysis Preferences
            </div>
            <div className="space-y-3 text-xs text-[#8C9AB5]">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-[#F4F7FF]">Compound Emotion Detection</span>
                <span className="text-[#4ADE80] font-mono">Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-[#F4F7FF]">Cross-Signal Conflict Resolution</span>
                <span className="text-[#4ADE80] font-mono">Dynamic AI</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#F4F7FF]">Confidence Threshold</span>
                <span className="text-[#F4F7FF] font-mono">60%</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
};
