import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#4F8CFF] hover:bg-[#6EA8FF] text-[#F4F7FF] shadow-glow-sm hover:shadow-glow-md border border-[#6EA8FF]/30',
    secondary:
      'bg-white/[0.06] hover:bg-white/[0.12] text-[#F4F7FF] border border-white/10 hover:border-white/20',
    outline:
      'border border-[#4F8CFF]/50 text-[#6EA8FF] hover:bg-[#4F8CFF]/10 hover:border-[#4F8CFF]',
    ghost:
      'text-[#8C9AB5] hover:text-[#F4F7FF] hover:bg-white/[0.05]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
