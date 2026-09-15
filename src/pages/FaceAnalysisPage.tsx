import React from 'react';
import { Link } from 'react-router-dom';
import { Video, ArrowLeft, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

export const FaceAnalysisPage: React.FC = () => {
  return (
    <PageContainer
      tagline="Single Modality"
      title="Face Emotion Analysis"
      subtitle="Analyze facial expressions using micro-expression landmark detection."
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <GlassCard className="text-center py-16 border-dashed border-white/20">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FCD34D]/10 flex items-center justify-center mb-4">
            <Video className="text-[#FCD34D]" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-[#F4F7FF]">
            Camera Stream
          </h3>
          <p className="text-sm text-[#8C9AB5] max-w-md mx-auto mt-2 leading-relaxed">
            Webcam stream and real-time landmark meshes will be initialized during the model integration phase.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/result">
              <Button>
                Simulate Face Analysis <ArrowRight size={16} />
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
