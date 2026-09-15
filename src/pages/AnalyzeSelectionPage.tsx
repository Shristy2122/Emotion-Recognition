import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Mic, FileText, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';

type ModeId = 'face' | 'voice' | 'text' | 'combined';

interface ModeOption {
  id: ModeId;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  path: string;
  isCombined?: boolean;
}

export const AnalyzeSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<ModeId>('combined');

  const modes: ModeOption[] = [
    {
      id: 'face',
      icon: <Smile size={28} className="text-[#FCD34D]" />,
      title: 'FACE',
      subtitle: 'Read facial expressions',
      path: '/analyze/face',
    },
    {
      id: 'voice',
      icon: <Mic size={28} className="text-[#60A5FA]" />,
      title: 'VOICE',
      subtitle: 'Understand vocal emotion',
      path: '/analyze/voice',
    },
    {
      id: 'text',
      icon: <FileText size={28} className="text-[#4ADE80]" />,
      title: 'TEXT',
      subtitle: 'Analyze emotional meaning',
      path: '/analyze/text',
    },
    {
      id: 'combined',
      icon: <Sparkles size={28} className="text-[#49D6FF]" />,
      title: 'COMBINED',
      subtitle: 'Connect all three signals',
      path: '/analyze/combined',
      isCombined: true,
    },
  ];

  const handleContinue = () => {
    const mode = modes.find((m) => m.id === selectedMode);
    if (mode) {
      navigate(mode.path);
    }
  };

  return (
    <PageContainer
      tagline="Step 1 of 3: Choose"
      title="How would you like to analyze?"
      subtitle="Choose a signal or combine them for a deeper emotional picture."
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {modes.map((mode) => {
          const isSelected = selectedMode === mode.id;

          if (mode.isCombined) {
            return (
              <div
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-[#49D6FF] bg-[#4F8CFF]/[0.08] shadow-glow-cyan ring-1 ring-[#49D6FF]/40'
                    : 'border border-[#4F8CFF]/30 bg-[#4F8CFF]/[0.04] hover:border-[#4F8CFF]/60 hover:shadow-glow-sm'
                }`}
              >
                {/* Combined Special Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 text-[#49D6FF]">
                      {mode.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#49D6FF] bg-[#49D6FF]/10 px-2.5 py-1 rounded-full border border-[#49D6FF]/30">
                        Full Picture
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#49D6FF] text-[#060B18]'
                            : 'border border-white/20 bg-white/5'
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#F4F7FF] mb-1">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-[#8C9AB5] mb-4">{mode.subtitle}</p>

                  <div className="p-3 rounded-2xl bg-[#060B18]/60 border border-white/10 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#F4F7FF]">
                      <span>👤</span> + <span>🎙</span> + <span>📝</span>
                      <span className="ml-1 text-[#49D6FF] font-semibold">
                        Face + Voice + Text
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C9AB5]">Mixed emotions supported</p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#49D6FF] font-mono">
                  <span>Selected Modality</span>
                  <span>Flagship AI Fusion</span>
                </div>
              </div>
            );
          }

          // Single Modality Cards (Face, Voice, Text)
          return (
            <div
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-2 border-[#49D6FF] bg-white/[0.06] shadow-glow-sm ring-1 ring-[#49D6FF]/40'
                  : 'border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10">
                    {mode.icon}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#49D6FF] text-[#060B18]'
                        : 'border border-white/20 bg-white/5'
                    }`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[#F4F7FF] mb-1">
                  {mode.title}
                </h3>
                <p className="text-sm text-[#8C9AB5]">{mode.subtitle}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 text-xs text-[#8C9AB5] font-mono">
                Single Signal Analysis
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-10 flex justify-center">
        <Button size="lg" onClick={handleContinue} className="px-10 shadow-glow-sm">
          Continue <ArrowRight size={18} />
        </Button>
      </div>
    </PageContainer>
  );
};
