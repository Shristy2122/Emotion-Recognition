import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-6 transition-all duration-300 ${
        hoverEffect
          ? 'hover:border-[#4F8CFF]/30 hover:bg-white/[0.06] hover:shadow-glow-sm cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
