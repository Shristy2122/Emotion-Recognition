import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Smile, Mic, FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

export const CombinedAnalysisPage: React.FC = () => {
  return (
    <PageContainer
      tagline="Flagship Multimodal Mode"
      title="Combined Analysis Studio"
      subtitle="Concurrently capture Face, Voice, and Text signals to detect compound emotions, cross-signal harmony, or emotional conflict."
    >
      <div className="space-y-6">
        {/* Three Signals Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <GlassCard className="text-center py-8 space-y-2 border-white/[0.08]">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#FCD34D]/10 flex items-center justify-center text-[#FCD34D] mb-2">
              <Smile size={24} />
            </div>
            <h4 className="text-base font-semibold text-[#F4F7FF]">Signal 1: Face</h4>
            <p className="text-xs text-[#8C9AB5]">Camera preview ready</p>
            <span className="inline-block mt-2 text-[10px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
              Standby
            </span>
          </GlassCard>

          <GlassCard className="text-center py-8 space-y-2 border-white/[0.08]">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA] mb-2">
              <Mic size={24} />
            </div>
            <h4 className="text-base font-semibold text-[#F4F7FF]">Signal 2: Voice</h4>
            <p className="text-xs text-[#8C9AB5]">Acoustic input ready</p>
            <span className="inline-block mt-2 text-[10px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
              Standby
            </span>
          </GlassCard>

          <GlassCard className="text-center py-8 space-y-2 border-white/[0.08]">
            <div className="w-12 h-12 mx-auto rounded-xl bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] mb-2">
              <FileText size={24} />
            </div>
            <h4 className="text-base font-semibold text-[#F4F7FF]">Signal 3: Text</h4>
            <p className="text-xs text-[#8C9AB5]">Speech-to-text listener ready</p>
            <span className="inline-block mt-2 text-[10px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
              Standby
            </span>
          </GlassCard>
        </div>

        {/* Multimodal Fusion Card */}
        <GlassCard className="text-center py-12 bg-[#4F8CFF]/[0.03] border-[#4F8CFF]/30 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4F8CFF]/15 border border-[#49D6FF]/40 flex items-center justify-center text-[#49D6FF] shadow-glow-cyan">
            <Sparkles size={28} />
          </div>
          <h3 className="text-xl font-bold text-[#F4F7FF]">
            Ready for Concurrent Capture
          </h3>
          <p className="text-sm text-[#8C9AB5] max-w-xl mx-auto leading-relaxed">
            When you run combined analysis, Emotia synchronizes facial expressions, audio frequency contours, and semantic vocabulary in a unified timeline.
          </p>
          <div className="pt-4 flex justify-center">
            <Link to="/result">
              <Button size="lg">
                Run Multimodal Analysis <ArrowRight size={16} />
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
