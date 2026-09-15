import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Upload, Sparkles, Camera } from 'lucide-react';
import { PageContainer } from '../components/PageContainer';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { CameraPreview } from '../components/CameraPreview';

export const FaceAnalysisPage: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImageSrc(event.target?.result as string);
        setIsCameraActive(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = () => {
    setUploadedImageSrc(null);
    setIsCameraActive(true);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  const handleReset = () => {
    setAnalyzed(false);
  };

  return (
    <PageContainer
      tagline="Single Modality"
      title="Face Analysis"
      subtitle="Let your expression speak."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Hidden File Input for Real Image Upload */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {!analyzed ? (
          <div className="space-y-6">
            {/* Real Webcam or Uploaded Image Viewfinder */}
            <CameraPreview
              isActive={isCameraActive}
              uploadedImageSrc={uploadedImageSrc}
              onClearImage={handleClearImage}
              className="shadow-2xl"
            />

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="flex items-center gap-3">
                {uploadedImageSrc ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleClearImage}
                    className="gap-1.5"
                  >
                    <Camera size={14} /> Back to Live Camera
                  </Button>
                ) : (
                  <Button
                    variant={isCameraActive ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setIsCameraActive(!isCameraActive)}
                  >
                    {isCameraActive ? 'Pause Camera' : 'Start Camera'}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTriggerUpload}
                  className="gap-1.5"
                >
                  <Upload size={14} /> {uploadedImageSrc ? 'Change Image' : 'Upload Image'}
                </Button>
              </div>

              <Button
                size="md"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="shadow-glow-sm"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Analyzing Face...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Face Results State */
          <div className="space-y-6">
            {/* Current Emotion Card */}
            <GlassCard className="text-center py-10 space-y-4 border-[#60A5FA]/30 bg-[#60A5FA]/[0.04]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8C9AB5]">
                Current Emotion
              </span>
              <div className="text-6xl">😢</div>
              <h2 className="text-3xl font-extrabold text-[#F4F7FF]">Sad</h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#60A5FA]/15 border border-[#60A5FA]/30 font-mono text-sm text-[#60A5FA] font-semibold">
                78% Confidence
              </div>
            </GlassCard>

            {/* Simple Distribution */}
            <GlassCard className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C9AB5]">
                Emotion Distribution
              </h4>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😢 Sad</span>
                    <span className="text-[#60A5FA] font-mono">78%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#60A5FA] rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😊 Happy</span>
                    <span className="text-[#FCD34D] font-mono">18%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FCD34D] rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#F4F7FF]">😐 Neutral</span>
                    <span className="text-[#94A3B8] font-mono">4%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94A3B8] rounded-full" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Action */}
            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" onClick={handleReset} className="gap-2">
                <RefreshCw size={16} /> Analyze Again
              </Button>
              <Link to="/analyze">
                <Button variant="ghost">Other Modes</Button>
              </Link>
            </div>
          </div>
        )}

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
