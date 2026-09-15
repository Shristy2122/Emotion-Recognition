import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Smile,
  Mic,
  FileText,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { analysisService } from '../services/analysisService';
import { authService } from '../services/authService';
import { EMOTION_CONFIG } from '../utils/emotionColors';

export const DashboardPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const latestResult = analysisService.getLatestCombinedResult();
  const history = analysisService.getHistory();

  const stats = [
    {
      label: 'Total Analyses',
      value: `${history.length + 18}`,
      icon: <Activity size={18} className="text-[#49D6FF]" />,
      change: '+14% this week',
    },
    {
      label: 'Dominant State',
      value: 'Sad · Happy',
      icon: <Layers size={18} className="text-[#FCD34D]" />,
      change: 'Mixed / Compound',
    },
    {
      label: 'Cross-Signal Harmony',
      value: '84%',
      icon: <TrendingUp size={18} className="text-[#4ADE80]" />,
      change: 'Signals in Agreement',
    },
    {
      label: 'Active Modalities',
      value: '4 / 4',
      icon: <Sparkles size={18} className="text-[#6EA8FF]" />,
      change: 'All Signals Ready',
    },
  ];

  const quickLaunch = [
    {
      title: 'Face Studio',
      desc: 'Micro-expression detection with camera or upload',
      icon: <Smile size={20} className="text-[#FCD34D]" />,
      path: '/analyze/face',
    },
    {
      title: 'Voice Studio',
      desc: 'Acoustic wave frequency & cadence recognition',
      icon: <Mic size={20} className="text-[#60A5FA]" />,
      path: '/analyze/voice',
    },
    {
      title: 'Text Studio',
      desc: 'Semantic sentiment & linguistic polarity analysis',
      icon: <FileText size={20} className="text-[#4ADE80]" />,
      path: '/analyze/text',
    },
    {
      title: 'Combined Studio',
      desc: 'Synchronous Face + Voice + Text AI fusion',
      icon: <Sparkles size={20} className="text-[#49D6FF]" />,
      path: '/analyze/combined',
      isFlagship: true,
    },
  ];

  return (
    <PageContainer maxWidth="max-w-6xl">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#49D6FF]">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              Live Workspace
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F7FF] tracking-tight">
              Welcome back, {currentUser?.name || 'Explorer'}
            </h1>
            <p className="text-xs sm:text-sm text-[#8C9AB5]">
              Here is your multimodal emotional intelligence dashboard and activity summary.
            </p>
          </div>

          <Link to="/analyze/combined">
            <Button size="lg" className="shadow-glow-sm gap-2">
              <Sparkles size={16} /> New Combined Session
            </Button>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                  {stat.label}
                </span>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  {stat.icon}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-[#F4F7FF] font-mono">{stat.value}</div>
                <div className="text-[11px] text-[#4ADE80] font-mono">{stat.change}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Featured Emotional Story Card */}
        <GlassCard className="p-6 sm:p-8 border-[#4F8CFF]/30 bg-gradient-to-r from-[#4F8CFF]/[0.08] via-[#0A1120] to-[#49D6FF]/[0.06] shadow-glow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#49D6FF] uppercase font-semibold">
                <Sparkles size={14} /> Latest Synthesized Story
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F7FF]">
                {latestResult.compoundName || 'Sad · Happy'}
              </h2>
              <p className="text-sm text-[#8C9AB5] leading-relaxed">
                "{latestResult.whyExplanation?.aiSynthesis || latestResult.alignment?.description}"
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-[#8C9AB5] pt-1">
                <span>👤 Face: Sad 76%</span>
                <span>·</span>
                <span>🎙 Voice: Happy 69%</span>
                <span>·</span>
                <span>📝 Text: Sad 72%</span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
              <div className="text-3xl font-mono font-bold text-[#49D6FF]">
                82% <span className="text-xs text-[#8C9AB5] font-normal">Confidence</span>
              </div>
              <Link to="/result">
                <Button variant="outline" className="gap-2">
                  View Full Report <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>

        {/* Quick Launch Hub */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#F4F7FF]">Quick Analysis Launch</h3>
            <Link to="/analyze" className="text-xs font-mono text-[#49D6FF] hover:underline">
              All Modes →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLaunch.map((item) => (
              <Link key={item.title} to={item.path} className="group">
                <GlassCard
                  hoverEffect
                  className={`h-full flex flex-col justify-between p-5 ${
                    item.isFlagship ? 'border-[#4F8CFF]/40 bg-[#4F8CFF]/[0.04]' : ''
                  }`}
                >
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 w-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#F4F7FF] group-hover:text-[#6EA8FF] transition">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#8C9AB5] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-[#4F8CFF] group-hover:text-[#49D6FF] transition">
                    <span>Launch</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent History Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#F4F7FF]">Recent Activity</h3>
            <Link to="/history" className="text-xs font-mono text-[#49D6FF] hover:underline">
              View History Archive →
            </Link>
          </div>

          <div className="space-y-3">
            {history.slice(0, 3).map((item) => {
              const primaryConfig = EMOTION_CONFIG[item.primaryEmotion];
              return (
                <Link key={item.id} to="/result" className="block group">
                  <GlassCard
                    hoverEffect
                    className="flex items-center justify-between p-4.5 rounded-2xl"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xl">{primaryConfig.emoji}</span>
                      <div>
                        <h5 className="text-sm font-bold text-[#F4F7FF] group-hover:text-[#6EA8FF] transition">
                          {item.compoundName || primaryConfig.label}
                        </h5>
                        <span className="text-[11px] font-mono text-[#8C9AB5] flex items-center gap-1.5 mt-0.5">
                          <Clock size={11} /> {item.timestamp} ·{' '}
                          <span className="uppercase text-[#49D6FF]">{item.modality}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#F4F7FF] font-semibold">
                        {Math.round(item.confidence * 100)}%
                      </span>
                      <ArrowRight size={14} className="text-[#8C9AB5]" />
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
