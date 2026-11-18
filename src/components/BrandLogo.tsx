import React from 'react';

export const BRAND_LOGO_SRC =
  '/assets/aistudio/d61cf1b3-371e-4bed-8398-5804d7fe7ec2_e48b7400.png';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  className?: string;
}

export function BrandLogo({ variant = 'dark', className = '' }: BrandLogoProps) {
  if (variant === 'light') {
    return (
      <span
        className={`inline-flex items-center rounded-xl bg-white px-3.5 py-2 whitespace-nowrap shrink-0 ${className}`}
      >
        <img
          src={BRAND_LOGO_SRC}
          alt="EMANUS"
          className="h-7 sm:h-8 w-auto object-contain select-none"
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center whitespace-nowrap shrink-0 ${className}`}>
      <img
        src={BRAND_LOGO_SRC}
        alt="EMANUS"
        className="h-8 sm:h-9 w-auto object-contain mix-blend-multiply select-none"
      />
    </span>
  );
}
