import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('shristy@emotia.ai');
  const [password, setPassword] = useState('••••••••');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    navigate('/dashboard');
  };

  return (
    <PageContainer
      tagline="Account Access"
      title={isSignUp ? 'Create your Emotia Account' : 'Welcome back to Emotia'}
      subtitle="Access your multimodal emotional intelligence dashboard and history."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 pt-2 max-w-md mx-auto">
        <GlassCard className="p-8 space-y-6 border-white/10 shadow-2xl">
          {/* Quick Demo Access Badge */}
          <div className="p-3.5 rounded-2xl bg-[#4F8CFF]/10 border border-[#4F8CFF]/30 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[#49D6FF] font-medium font-mono">
              <Sparkles size={14} /> Instant Access Available
            </span>
            <button
              onClick={handleQuickDemo}
              className="text-[#F4F7FF] hover:text-[#49D6FF] font-semibold underline underline-offset-2 transition cursor-pointer"
            >
              1-Click Demo Login →
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href="#forgot"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] text-[#49D6FF] hover:underline"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition font-mono"
                />
              </div>
            </div>

            <Button size="lg" type="submit" className="w-full mt-4 shadow-glow-sm">
              {isSignUp ? 'Create Account' : 'Sign In to Dashboard'} <ArrowRight size={16} />
            </Button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="pt-2 text-center text-xs text-[#8C9AB5] border-t border-white/5">
            {isSignUp ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-[#49D6FF] font-semibold hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-[#49D6FF] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </span>
            )}
          </div>
        </GlassCard>

        {/* Privacy badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8C9AB5] font-mono">
          <ShieldCheck size={14} className="text-[#4ADE80]" />
          <span>Encrypted On-Device Session</span>
        </div>
      </div>
    </PageContainer>
  );
};
