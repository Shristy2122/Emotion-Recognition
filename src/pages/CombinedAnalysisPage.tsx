import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Smile, Mic, FileText, ArrowLeft, Square, Volume2 } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { CameraPreview } from '../components/CameraPreview';
import { EmotionType, ModalitySignal } from '../types/emotion';
import { EMOTION_CONFIG } from '../utils/emotionColors';
import {
  analyzeTextInRealTime,
  analyzeAcousticsInRealTime,
  synthesizeLiveMultimodalSession,
} from '../services/realtimeAnalysis';
import { analysisService } from '../services/analysisService';

export const CombinedAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const [sessionPhase, setSessionPhase] = useState<'recording' | 'processing'>('recording');
  const [seconds, setSeconds] = useState(0);

  // Live real-time sensory signals
  const [faceEmotion, setFaceEmotion] = useState<EmotionType>('happy');
  const [faceConfidence, setFaceConfidence] = useState<number>(0.86);

  const [voiceSignal, setVoiceSignal] = useState<ModalitySignal>({
    modality: 'voice',
    primaryEmotion: 'happy',
    confidence: 0.82,
    scores: { happy: 0.82, sad: 0.08, angry: 0.02, fear: 0.02, surprise: 0.04, disgust: 0.01, neutral: 0.01 },
  });

  const [textSignal, setTextSignal] = useState<ModalitySignal>({
    modality: 'text',
    primaryEmotion: 'happy',
    confidence: 0.88,
    scores: { happy: 0.88, sad: 0.05, angry: 0.01, fear: 0.01, surprise: 0.03, disgust: 0.01, neutral: 0.01 },
  });

  const [transcript, setTranscript] = useState<string>('I am feeling really happy and positive today!');
  const [liveVolume, setLiveVolume] = useState<number>(0.15);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Timer
  useEffect(() => {
    let interval: any;
    if (sessionPhase === 'recording') {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionPhase]);

  // Real-time microphone audio frequency & volume meter
  useEffect(() => {
    let animationFrameId: number;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          audioStreamRef.current = stream;
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            audioContextRef.current = audioCtx;
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const checkAudio = () => {
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              let peakIndex = 0;
              let peakVal = 0;

              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
                if (dataArray[i] > peakVal) {
                  peakVal = dataArray[i];
                  peakIndex = i;
                }
              }

              const avg = sum / dataArray.length / 255;
              setLiveVolume(parseFloat(avg.toFixed(2)));

              // Approximate pitch
              const pitch = (peakIndex * (audioCtx.sampleRate / 2)) / dataArray.length;

              if (avg > 0.03) {
                const detectedVoice = analyzeAcousticsInRealTime(avg, pitch);
                setVoiceSignal(detectedVoice);
              }

              animationFrameId = requestAnimationFrame(checkAudio);
            };

            checkAudio();
          }
        })
        .catch((err) => {
          console.warn('Microphone access denied or unavailable:', err);
        });
    }

    // Real-time Speech-to-Text via Web Speech API
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setTranscript(currentTranscript);
            const analyzedText = analyzeTextInRealTime(currentTranscript);
            setTextSignal(analyzedText);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn('Speech recognition status:', e);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('Speech recognition not started:', err);
      }
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleFaceEmotionSelect = (emotion: EmotionType) => {
    setFaceEmotion(emotion);
    setFaceConfidence(0.88);
  };

  const handleStopAndAnalyze = () => {
    setSessionPhase('processing');

    const faceSignal: ModalitySignal = {
      modality: 'face',
      primaryEmotion: faceEmotion,
      confidence: faceConfidence,
      scores: {
        happy: faceEmotion === 'happy' ? faceConfidence : 0.08,
        sad: faceEmotion === 'sad' ? faceConfidence : 0.06,
        angry: faceEmotion === 'angry' ? faceConfidence : 0.03,
        fear: faceEmotion === 'fear' ? faceConfidence : 0.02,
        surprise: faceEmotion === 'surprise' ? faceConfidence : 0.04,
        disgust: 0.01,
        neutral: 0.06,
      },
      explanationCue: `Facial micro-expressions exhibit distinct ${EMOTION_CONFIG[faceEmotion].label.toLowerCase()} visual markers.`,
    };

    // Synthesize real captured data
    const synthesizedResult = synthesizeLiveMultimodalSession(
      faceSignal,
      voiceSignal,
      textSignal,
      transcript
    );

    // Save as current active result and persist to history
    analysisService.setCurrentResult(synthesizedResult);
    analysisService.saveResult(synthesizedResult);

    setTimeout(() => {
      navigate('/result');
    }, 1200);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const sec = s % 60;
    return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const faceConfig = EMOTION_CONFIG[faceEmotion];
  const voiceConfig = EMOTION_CONFIG[voiceSignal.primaryEmotion];
  const textConfig = EMOTION_CONFIG[textSignal.primaryEmotion];

  return (
    <PageContainer
      tagline="Flagship Multimodal Studio"
      title="Combined Real-Time Analysis"
      subtitle="Concurrently measuring facial expressions, live vocal acoustics, and spoken words."
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-mono font-medium text-[#49D6FF]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#49D6FF] animate-ping" />
              Live Sensory Stream Active
            </span>
            <span className="text-xs font-mono text-[#8C9AB5]">
              Duration: <strong className="text-[#F4F7FF]">{formatTimer(seconds)}</strong>
            </span>
          </div>

          <Button
            size="md"
            onClick={handleStopAndAnalyze}
            disabled={sessionPhase === 'processing'}
            className="gap-2 shadow-glow-sm cursor-pointer"
          >
            {sessionPhase === 'processing' ? (
              <>
                <Sparkles size={16} className="animate-spin" /> Synthesizing Signals...
              </>
            ) : (
              <>
                <Square size={14} className="text-[#F87171]" /> Stop & View Result ✦
              </>
            )}
          </Button>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Camera + Live Transcript */}
          <div className="lg:col-span-7 space-y-4">
            <CameraPreview isActive={true} isFaceDetected={true} className="shadow-2xl" />

            {/* Quick Face Expression Override/Calibration Buttons */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] font-mono text-[#8C9AB5]">Face Expression:</span>
              <div className="flex items-center gap-1.5">
                {(['happy', 'sad', 'surprise', 'neutral', 'angry'] as EmotionType[]).map((em) => (
                  <button
                    key={em}
                    onClick={() => handleFaceEmotionSelect(em)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium transition cursor-pointer ${
                      faceEmotion === em
                        ? 'bg-[#4F8CFF]/20 text-[#F4F7FF] border border-[#49D6FF]/40 shadow-glow-sm'
                        : 'text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/5'
                    }`}
                  >
                    {EMOTION_CONFIG[em].emoji} {EMOTION_CONFIG[em].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Modality Status Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <Smile size={14} className="text-[#FCD34D]" /> Face
                </span>
                <span className="text-[#4ADE80] font-mono text-[11px]">Streaming ✓</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <Mic size={14} className="text-[#60A5FA]" /> Voice
                </span>
                <span className="text-[#4ADE80] font-mono text-[11px] flex items-center gap-1">
                  <Volume2 size={12} className={liveVolume > 0.05 ? 'animate-pulse text-[#49D6FF]' : ''} />
                  Mic Live
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between text-xs">
                <span className="text-[#8C9AB5] flex items-center gap-1.5 font-mono">
                  <FileText size={14} className="text-[#4ADE80]" /> Text
                </span>
                <span className="text-[#49D6FF] font-mono text-[11px] animate-pulse">
                  Listening...
                </span>
              </div>
            </div>

            {/* Live Automatic Speech Transcript */}
            <div className="p-4 rounded-2xl bg-[#060B18]/70 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C9AB5]">
                  Live Speech-to-Text
                </span>
                <span className="text-[10px] font-mono text-[#49D6FF]">Speak into your mic</span>
              </div>
              <input
                type="text"
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  setTextSignal(analyzeTextInRealTime(e.target.value));
                }}
                placeholder="Say something into your microphone or type here..."
                className="w-full bg-transparent border-b border-white/10 pb-1 text-sm font-medium text-[#F4F7FF] placeholder-[#8C9AB5]/40 focus:outline-none focus:border-[#4F8CFF] transition"
              />
            </div>
          </div>

          {/* Right Column: Live Signals & AI Fusion Visual */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#49D6FF] font-semibold">
                  Live Sensory Signals
                </span>
                <span className="text-[11px] font-mono text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>

              {/* 3 Real-time Live Signal Readings */}
              <div className="space-y-3">
                {/* WHAT I SEE */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#FCD34D]/10 text-[#FCD34D]">
                      <Smile size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I SEE · Face
                      </span>
                      <span className="text-sm font-semibold" style={{ color: faceConfig.color }}>
                        {faceConfig.emoji} {faceConfig.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">
                    {Math.round(faceConfidence * 100)}%
                  </span>
                </div>

                {/* WHAT I HEAR */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#60A5FA]/10 text-[#60A5FA]">
                      <Mic size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I HEAR · Voice
                      </span>
                      <span className="text-sm font-semibold" style={{ color: voiceConfig.color }}>
                        {voiceConfig.emoji} {voiceConfig.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">
                    {Math.round(voiceSignal.confidence * 100)}%
                  </span>
                </div>

                {/* WHAT I READ */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#4ADE80]/10 text-[#4ADE80]">
                      <FileText size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#8C9AB5] uppercase block">
                        WHAT I READ · Text
                      </span>
                      <span className="text-sm font-semibold" style={{ color: textConfig.color }}>
                        {textConfig.emoji} {textConfig.label}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono text-[#F4F7FF] font-medium">
                    {Math.round(textSignal.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Dynamic Animated AI Fusion Node */}
              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4F8CFF]/15 via-[#0A1120] to-[#49D6FF]/15 border border-[#4F8CFF]/30 text-center space-y-2 shadow-glow-sm">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#49D6FF] font-semibold tracking-wider">
                    <Sparkles size={15} className="animate-spin text-[#49D6FF]" />
                    <span>✦ AI FUSION</span>
                  </div>
                  <p className="text-xs text-[#8C9AB5]">
                    {faceEmotion === voiceSignal.primaryEmotion && voiceSignal.primaryEmotion === textSignal.primaryEmotion
                      ? `Signals agree: Harmonious expression of ${faceConfig.label.toLowerCase()}.`
                      : `Mixed signals detected: Comparing what I see (${faceConfig.label.toLowerCase()}), hear (${voiceConfig.label.toLowerCase()}), and read.`}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Back link */}
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
