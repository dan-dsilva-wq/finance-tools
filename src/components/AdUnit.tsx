'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (adRef.current && !isAdLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Styles based on format
  const getFormatStyles = () => {
    switch (format) {
      case 'horizontal':
        return { display: 'block', minHeight: '90px' };
      case 'vertical':
        return { display: 'block', minHeight: '250px' };
      case 'rectangle':
        return { display: 'inline-block', width: '300px', height: '250px' };
      default:
        return { display: 'block' };
    }
  };

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getFormatStyles()}
        data-ad-client="ca-pub-7379575486597863"
        data-ad-slot={slot}
        data-ad-format={responsive ? 'auto' : format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

// Placeholder component to use before AdSense approval
export function AdPlaceholder({
  format = 'auto',
  className = '',
}: {
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}) {
  const getPlaceholderStyles = () => {
    switch (format) {
      case 'horizontal':
        return 'h-[90px]';
      case 'vertical':
        return 'h-[250px] w-[160px]';
      case 'rectangle':
        return 'h-[250px] w-[300px]';
      default:
        return 'h-[90px]';
    }
  };

  return (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getPlaceholderStyles()} ${className}`}
    >
      <span className="text-gray-400 text-sm">Ad Space</span>
    </div>
  );
}
