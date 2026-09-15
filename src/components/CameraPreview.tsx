import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface CameraPreviewProps {
  isActive?: boolean;
  isFaceDetected?: boolean;
  uploadedImageSrc?: string | null;
  className?: string;
  onClearImage?: () => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  isActive = true,
  uploadedImageSrc = null,
  className = '',
  onClearImage,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // If an image is uploaded, stop any active camera stream
    if (uploadedImageSrc) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    // If camera is explicitly paused/turned off
    if (!isActive) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    let localStream: MediaStream | null = null;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
        })
        .then((mediaStream) => {
          localStream = mediaStream;
          setStream(mediaStream);
          setHasPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch(() => {});
          }
        })
        .catch((err) => {
          console.warn('Webcam access was denied or not found:', err);
          setHasPermission(false);
        });
    } else {
      setHasPermission(false);
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive, uploadedImageSrc]);

  return (
    <div
      className={`relative w-full aspect-video rounded-3xl bg-gradient-to-b from-[#0A1120] to-[#060B18] border border-white/10 overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      {/* 1. Mode: Uploaded Image Preview */}
      {uploadedImageSrc ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black/60">
          <img
            src={uploadedImageSrc}
            alt="Uploaded face sample"
            className="w-full h-full object-contain"
          />

          {/* Face landmark overlay on uploaded photo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-[48px] border-2 border-dashed border-[#49D6FF]/80 shadow-glow-cyan">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#060B18]/80 text-[10px] font-mono text-[#49D6FF]">
                Face Boundary Found
              </div>
            </div>
          </div>

          {/* Top Status */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#060B18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono">
            <ImageIcon size={13} className="text-[#49D6FF]" />
            <span className="text-[#F4F7FF]">Image Uploaded</span>
            <span className="flex items-center gap-1 text-[#4ADE80]">
              <CheckCircle2 size={12} /> Ready for Analysis ✓
            </span>
          </div>

          {onClearImage && (
            <button
              onClick={onClearImage}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-xs text-[#F4F7FF] border border-white/20 transition cursor-pointer"
            >
              Switch to Live Camera
            </button>
          )}
        </div>
      ) : isActive && hasPermission ? (
        /* 2. Mode: Live Real Webcam Stream */
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100"
          />

          {/* Aesthetic Face Mesh Scanning Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-44 h-60 sm:w-52 sm:h-72 rounded-[52px] border-2 border-dashed border-[#49D6FF]/70 shadow-glow-cyan flex flex-col items-center justify-center">
              {/* Eye points */}
              <div className="flex gap-12 sm:gap-14 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#49D6FF]/90 animate-pulse shadow-glow-cyan" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#49D6FF]/90 animate-pulse shadow-glow-cyan" />
              </div>
              {/* Nose/mouth guidelines */}
              <div className="w-3.5 h-3.5 rounded-full border-t-2 border-[#49D6FF]/70 mb-8" />
              <div className="w-12 h-3.5 border-b-2 border-[#49D6FF]/80 rounded-full" />
            </div>

            {/* Scanning Laser Beam */}
            <div className="absolute inset-x-12 h-0.5 bg-gradient-to-r from-transparent via-[#49D6FF] to-transparent animate-pulse opacity-80" />
          </div>

          {/* Top Status */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#060B18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono">
            <Camera size={13} className="text-[#49D6FF]" />
            <span className="text-[#F4F7FF]">Live Camera Feed</span>
            <span className="flex items-center gap-1 text-[#4ADE80]">
              <CheckCircle2 size={12} /> Face detected ✓
            </span>
          </div>
        </div>
      ) : (
        /* 3. Mode: Camera Paused / Simulation Fallback */
        <div className="relative flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#8C9AB5]">
            <CameraOff size={28} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#F4F7FF]">
              {isActive === false ? 'Camera is Paused' : 'Webcam Permission Standby'}
            </h4>
            <p className="text-xs text-[#8C9AB5] max-w-sm">
              {isActive === false
                ? 'Click "Start Camera" to re-activate your live webcam feed.'
                : 'Allow browser camera permission or use the "Upload Image" option below.'}
            </p>
          </div>

          {/* Top Status */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#060B18]/80 border border-white/10 backdrop-blur-md text-[11px] font-mono">
            <AlertCircle size={13} className="text-[#FCD34D]" />
            <span className="text-[#8C9AB5]">Camera Inactive</span>
          </div>
        </div>
      )}

      {/* Viewfinder Corner Brackets */}
      <div className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#49D6FF]/60 rounded-tl-lg" />
      <div className="pointer-events-none absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#49D6FF]/60 rounded-tr-lg" />
      <div className="pointer-events-none absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#49D6FF]/60 rounded-bl-lg" />
      <div className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#49D6FF]/60 rounded-br-lg" />
    </div>
  );
};
