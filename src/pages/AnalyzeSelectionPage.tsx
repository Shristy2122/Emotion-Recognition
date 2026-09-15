import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Mic, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';

export const AnalyzeSelectionPage: React.FC = () => {
  const modes = [
    {
      id: 'combined',
      title: 'Combined Analysis',
      tagline: 'Flagship Multimodal',
      desc: 'Simultaneously process facial signals, vocal cues, and spoken words to uncover compound emotions and cross-signal conflicts.',
      icon: <Sparkles className="text-[#49D6FF]" size={26} />,
      path: '/analyze/combined',
      isFlagship: true,
    },
    {
      id: 'face',
      title: 'Face Analysis',
      tagline: 'Visual Expressions',
      desc: 'Track facial micro-movements, eye focus, and muscle activation from camera or video.',
      icon: <Smile className="text-[#FCD34D]" size={26} />,
      path: '/analyze/face',
      isFlagship: false,
    },
    {
      id: 'voice',
      title: 'Voice Analysis',
      tagline: 'Acoustic Cues',
      desc: 'Measure frequency inflection, pitch variance, pace, and vocal energy.',
      icon: <Mic className="text-[#60A5FA]" size={26} />,
      path: '/analyze/voice',
      isFlagship: false,
    },
    {
      id: 'text',
      title: 'Text Analysis',
      tagline: 'Linguistic Intent',
      desc: 'Uncover deeper sentiment, semantic nuance, and emotional polarity from written statements.',
      icon: <FileText className="text-[#4ADE80]" size={26} />,
      path: '/analyze/text',
      isFlagship: false,
    },
  ];

  return (
    <PageContainer
      tagline="Choose Mode"
      title="Select Analysis Mode"
      subtitle="Select an individual signal or experience the full power of multimodal combined analysis."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modes.map((mode) => (
          <Link key={mode.id} to={mode.path} className="group">
            <GlassCard
              hoverEffect
              className={`h-full flex flex-col justify-between ${
                mode.isFlagship
                  ? 'border-[#4F8CFF]/50 bg-[#4F8CFF]/[0.05] shadow-glow-sm'
                  : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10">
                    {mode.icon}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#49D6FF] bg-[#49D6FF]/10 px-2.5 py-0.5 rounded-full border border-[#49D6FF]/20">
                    {mode.tagline}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F4F7FF] group-hover:text-[#6EA8FF] transition">
                  {mode.title}
                </h3>
                <p className="text-sm text-[#8C9AB5] mt-2 leading-relaxed font-normal">
                  {mode.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-sm font-medium text-[#4F8CFF] group-hover:text-[#49D6FF] transition">
                <span>Enter {mode.title}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
};
