import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Phone,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { authService } from '../services/authService';

type AuthMode =
  | 'signin'
  | 'signup_details'
  | 'signup_otp'
  | 'signup_password'
  | 'forgot_email'
  | 'forgot_otp';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Active Screen Mode
  const [mode, setMode] = useState<AuthMode>('signin');

  // Sign In Form States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Sign Up Form States
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpOtp, setSignUpOtp] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  // Forgot Password Form States
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');

  // Generated OTP feedback
  const [activeOtpCode, setActiveOtpCode] = useState<string | null>(null);

  // Status & Error Messages
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const clearFeedback = () => setFeedback(null);

  // 1. Handle Sign In
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!signInEmail || !signInPassword) {
      setFeedback({ type: 'error', text: 'Please enter both your email and password.' });
      return;
    }

    const res = authService.loginUser(signInEmail, signInPassword);
    if (!res.success) {
      setFeedback({ type: 'error', text: res.message });
      return;
    }

    setFeedback({ type: 'success', text: 'Welcome back! Redirecting to dashboard...' });
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  // 2. Handle Sign Up Step 1: Details -> Send OTP
  const handleSignUpDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!signUpName.trim() || !signUpPhone.trim() || !signUpEmail.trim()) {
      setFeedback({ type: 'error', text: 'All fields (Name, Phone, Email) are required.' });
      return;
    }

    // Check if email already exists
    if (authService.findUserByEmail(signUpEmail)) {
      setFeedback({ type: 'error', text: 'An account with this email already exists. Please Sign In.' });
      return;
    }

    // Generate 6-digit OTP
    const generated = authService.generateOtp(signUpEmail);
    setActiveOtpCode(generated);
    setMode('signup_otp');
    setFeedback({
      type: 'success',
      text: `Verification OTP generated for ${signUpEmail}! (See notification below)`,
    });
  };

  // 3. Handle Sign Up Step 2: Verify OTP
  const handleSignUpOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!signUpOtp.trim()) {
      setFeedback({ type: 'error', text: 'Please enter the 6-digit verification code.' });
      return;
    }

    const isValid = authService.verifyOtp(signUpEmail, signUpOtp);
    if (!isValid) {
      setFeedback({ type: 'error', text: 'Invalid or expired OTP. Please check the code.' });
      return;
    }

    setFeedback({ type: 'success', text: 'OTP Verified successfully! Now set your password.' });
    setMode('signup_password');
  };

  // 4. Handle Sign Up Step 3: Set Password & Complete
  const handleSignUpPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (signUpPassword.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setFeedback({ type: 'error', text: 'Passwords do not match. Please re-enter.' });
      return;
    }

    // Save and register user
    authService.registerUser({
      name: signUpName,
      email: signUpEmail,
      phone: signUpPhone,
      password: signUpPassword,
    });

    setFeedback({ type: 'success', text: 'Account created successfully! Taking you to dashboard...' });
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  // 5. Handle Forgot Password Step 1: Send Reset OTP
  const handleForgotEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!forgotEmail.trim()) {
      setFeedback({ type: 'error', text: 'Please enter your registered email address.' });
      return;
    }

    const user = authService.findUserByEmail(forgotEmail);
    if (!user) {
      setFeedback({ type: 'error', text: 'No user account found with this email address.' });
      return;
    }

    const generated = authService.generateOtp(forgotEmail);
    setActiveOtpCode(generated);
    setMode('forgot_otp');
    setFeedback({
      type: 'success',
      text: `Password reset OTP generated for ${forgotEmail}! (See notification below)`,
    });
  };

  // 6. Handle Forgot Password Step 2: Verify OTP & Set New Password
  const handleForgotOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!forgotOtp.trim()) {
      setFeedback({ type: 'error', text: 'Please enter the 6-digit OTP.' });
      return;
    }

    const isValid = authService.verifyOtp(forgotEmail, forgotOtp);
    if (!isValid) {
      setFeedback({ type: 'error', text: 'Invalid or expired OTP code.' });
      return;
    }

    if (forgotNewPassword.length < 6) {
      setFeedback({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    authService.resetPassword(forgotEmail, forgotNewPassword);
    setFeedback({ type: 'success', text: 'Password reset successful! Please sign in with your new password.' });
    setSignInEmail(forgotEmail);
    setSignInPassword('');
    setMode('signin');
  };

  return (
    <PageContainer
      tagline="Account Authentication"
      title="Emotia Portal"
      subtitle="Secure multimodal emotional intelligence access for new and existing users."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 pt-2 max-w-md mx-auto">
        {/* Navigation Tabs (Sign In vs Sign Up) */}
        {(mode === 'signin' || mode === 'signup_details') && (
          <div className="flex rounded-2xl bg-white/[0.04] p-1 border border-white/[0.08]">
            <button
              onClick={() => {
                setMode('signin');
                clearFeedback();
              }}
              className={`flex-1 py-2 text-xs font-mono font-semibold rounded-xl transition cursor-pointer ${
                mode === 'signin'
                  ? 'bg-[#4F8CFF] text-white shadow-glow-sm'
                  : 'text-[#8C9AB5] hover:text-[#F4F7FF]'
              }`}
            >
              Sign In (Existing)
            </button>
            <button
              onClick={() => {
                setMode('signup_details');
                clearFeedback();
              }}
              className={`flex-1 py-2 text-xs font-mono font-semibold rounded-xl transition cursor-pointer ${
                mode === 'signup_details'
                  ? 'bg-[#4F8CFF] text-white shadow-glow-sm'
                  : 'text-[#8C9AB5] hover:text-[#F4F7FF]'
              }`}
            >
              Sign Up (New User)
            </button>
          </div>
        )}

        {/* Live OTP Toast Banner (Shows simulated OTP code on screen) */}
        {activeOtpCode && (mode === 'signup_otp' || mode === 'forgot_otp') && (
          <div className="p-4 rounded-2xl bg-[#49D6FF]/10 border border-[#49D6FF]/30 space-y-1 shadow-glow-cyan animate-pulse">
            <div className="flex items-center gap-2 text-xs font-mono text-[#49D6FF] font-bold uppercase">
              <KeyRound size={15} /> One-Time Password (OTP)
            </div>
            <div className="text-xl font-mono font-extrabold text-[#F4F7FF] tracking-widest">
              {activeOtpCode}
            </div>
            <p className="text-[11px] text-[#8C9AB5]">
              Simulated verification code sent to your email. Enter it below to continue.
            </p>
          </div>
        )}

        {/* Dynamic Feedback Message */}
        {feedback && (
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
              feedback.type === 'error'
                ? 'bg-[#F87171]/10 border-[#F87171]/30 text-[#F87171]'
                : 'bg-[#4ADE80]/10 border-[#4ADE80]/30 text-[#4ADE80]'
            }`}
          >
            {feedback.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        <GlassCard className="p-7 space-y-6 border-white/10 shadow-2xl">
          {/* ========================================================= */}
          {/* 1. SIGN IN (Existing User)                                */}
          {/* ========================================================= */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Sign In</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Enter your registered email and previous password.
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                    placeholder="e.g. shristy@emotia.ai"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition font-mono"
                  />
                </div>
              </div>

              <Button size="lg" type="submit" className="w-full mt-2 shadow-glow-sm">
                Sign In to Dashboard <ArrowRight size={16} />
              </Button>

              {/* Forgot Password Link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot_email');
                    clearFeedback();
                  }}
                  className="text-xs text-[#49D6FF] hover:underline font-mono cursor-pointer"
                >
                  Forgot Password? Reset via Email →
                </button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* 2. SIGN UP STEP 1: Name, Phone, Email                     */}
          {/* ========================================================= */}
          {mode === 'signup_details' && (
            <form onSubmit={handleSignUpDetailsSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Create Account</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Step 1 of 3: Enter your details to receive an OTP.
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                    placeholder="e.g. Shristy Sharma"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="tel"
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    required
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition font-mono"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                    placeholder="e.g. name@example.com"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              <Button size="lg" type="submit" className="w-full mt-2 shadow-glow-sm">
                Send Verification OTP <ArrowRight size={16} />
              </Button>
            </form>
          )}

          {/* ========================================================= */}
          {/* 3. SIGN UP STEP 2: Verify OTP                             */}
          {/* ========================================================= */}
          {mode === 'signup_otp' && (
            <form onSubmit={handleSignUpOtpSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Verify Email OTP</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Step 2 of 3: Enter the 6-digit code sent to <strong className="text-white">{signUpEmail}</strong>.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#49D6FF]" />
                  <input
                    type="text"
                    maxLength={6}
                    value={signUpOtp}
                    onChange={(e) => setSignUpOtp(e.target.value)}
                    required
                    placeholder="123456"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-base tracking-widest text-[#49D6FF] font-mono focus:outline-none focus:border-[#49D6FF] transition"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setMode('signup_details')}
                  className="gap-1.5"
                >
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button size="lg" type="submit" className="flex-1 shadow-glow-sm">
                  Verify OTP <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* 4. SIGN UP STEP 3: Set Password                           */}
          {/* ========================================================= */}
          {mode === 'signup_password' && (
            <form onSubmit={handleSignUpPasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Set Password</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Step 3 of 3: Choose a secure password for your account.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Create Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    placeholder="At least 6 characters"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] font-mono focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] font-mono focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              <Button size="lg" type="submit" className="w-full shadow-glow-sm">
                Complete Registration & Log In <CheckCircle2 size={16} />
              </Button>
            </form>
          )}

          {/* ========================================================= */}
          {/* 5. FORGOT PASSWORD STEP 1: Enter Email                    */}
          {/* ========================================================= */}
          {mode === 'forgot_email' && (
            <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Reset Password</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Enter your registered email address to receive a password reset OTP.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="e.g. shristy@emotia.ai"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setMode('signin');
                    clearFeedback();
                  }}
                  className="gap-1.5"
                >
                  <ArrowLeft size={16} /> Back to Sign In
                </Button>
                <Button size="lg" type="submit" className="flex-1 shadow-glow-sm">
                  Send Reset OTP <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* 6. FORGOT PASSWORD STEP 2: Verify OTP & New Password      */}
          {/* ========================================================= */}
          {mode === 'forgot_otp' && (
            <form onSubmit={handleForgotOtpSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#F4F7FF]">Set New Password</h3>
                <p className="text-xs text-[#8C9AB5]">
                  Enter the OTP sent to <strong className="text-white">{forgotEmail}</strong> and your new password.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#49D6FF]" />
                  <input
                    type="text"
                    maxLength={6}
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    required
                    placeholder="123456"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-base tracking-widest text-[#49D6FF] font-mono focus:outline-none focus:border-[#49D6FF] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-[#8C9AB5] uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C9AB5]" />
                  <input
                    type="password"
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    required
                    placeholder="At least 6 characters"
                    className="w-full bg-[#060B18]/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#F4F7FF] font-mono focus:outline-none focus:border-[#4F8CFF] transition"
                  />
                </div>
              </div>

              <Button size="lg" type="submit" className="w-full shadow-glow-sm">
                Reset Password & Continue to Login <CheckCircle2 size={16} />
              </Button>
            </form>
          )}
        </GlassCard>

        {/* Security Assurance footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#8C9AB5] font-mono">
          <ShieldCheck size={14} className="text-[#4ADE80]" />
          <span>Encrypted On-Device Credential Storage</span>
        </div>
      </div>
    </PageContainer>
  );
};
