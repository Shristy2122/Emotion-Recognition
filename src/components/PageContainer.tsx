import React from 'react';

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  children: React.ReactNode;
  maxWidth?: 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  tagline,
  children,
  maxWidth = 'max-w-6xl',
}) => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-[#4F8CFF]/10 via-[#49D6FF]/5 to-transparent blur-3xl -z-10" />

      <div className={`mx-auto ${maxWidth}`}>
        {(title || subtitle || tagline) && (
          <div className="mb-10 text-center md:text-left space-y-2.5">
            {tagline && (
              <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-[#49D6FF] bg-[#49D6FF]/10 px-3 py-1 rounded-full border border-[#49D6FF]/20 font-mono">
                {tagline}
              </span>
            )}
            {title && (
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FF]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-[#8C9AB5] text-sm sm:text-base max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
