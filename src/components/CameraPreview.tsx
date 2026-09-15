import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

interface CameraPreviewProps {
  isActive?: boolean;
  isFaceDetected?: boolean;
  className?: string;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  isActive = true,
  isFaceDetected = true,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full aspect-video rounded-3xl bg-gradient-to-b from-[#0A1120] to-[#060B18] border border-white/10 overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      {/* Viewfinder crosshairs & corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#49D6FF]/60 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#49D6FF]/60 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#49D6FF]/60 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#49D6FF]/60 rounded-br-lg" />

      {/* Center Simulated Face Landmark Mesh */}
      <div className="relative flex flex-col items-center justify-center p-8">
        <div
          className={`w-36 h-48 sm:w-44 sm:h-56 rounded-[48px] border-2 border-dashed flex flex-col items-center justify-center transition-all duration-500 ${
            isActive && isFaceDetected
              ? 'border-[#49D6FF]/70 bg-[#4F8CFF]/5 shadow-glow-cyan'
              : 'border-white/15 bg-white/[0.01]'
          }`}
        >
          {/* Eyes & mouth indicators */}
          <div className="flex gap-10 sm:gap-12 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#49D6FF]/80 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#49D6FF]/80 animate-pulse" />
          </div>
          <div className="w-3 h-3 rounded-full border-t-2 border-[#49D6FF]/60 mb-6" />
          <div className="w-10 h-3 border-b-2 border-[#49D6FF]/70 rounded-full" />
        </div>

        {/* Live scanning line */}
        {isActive && (
          <div className="absolute inset-x-8 h-0.5 bg-gradient-to-r from-transparent via-[#49D6FF] to-transparent animate-pulse opacity-70" />
        )}
      </div>

      {/* Top Status Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#060B18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono">
        <Camera size={13} className="text-[#49D6FF]" />
        <span className="text-[#F4F7FF]">Webcam Feed</span>
        {isFaceDetected ? (
          <span className="flex items-center gap-1 text-[#4ADE80]">
            <CheckCircle2 size={12} /> Face detected ✓
          </span>
        ) : (
          <span className="text-[#8C9AB5]">Aligning...</span>
        )}
      </div>
    </div>
  );
};
