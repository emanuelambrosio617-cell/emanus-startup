import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'EMANUS',
  priority = false,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F6F7F9] to-[#EAECEF] p-6 text-center ${className}`}
      >
        <Layers className="h-8 w-8 text-[#D91414] mb-3" strokeWidth={1.5} />
        <span className="font-display text-sm font-semibold text-[#0B0D12]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
