'use client';

import { useState } from 'react';
import { MortgageInputs } from '@/types';

interface ShareButtonProps {
  tool: 'mortgage' | 'savings' | 'inflation';
  countryCode: string;
  params: MortgageInputs;
}

export default function ShareButton({ tool, countryCode, params }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'copied' | 'error'>('idle');
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleShare = async () => {
    setStatus('loading');

    try {
      const response = await fetch('/api/scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool,
          country_code: countryCode,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create share link');
      }

      const data = await response.json();
      const url = `${window.location.origin}${data.url}`;
      setShareUrl(url);

      await navigator.clipboard.writeText(url);
      setStatus('copied');

      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Share error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleShare}
        disabled={status === 'loading'}
        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
          status === 'copied'
            ? 'bg-green-600 text-white'
            : status === 'error'
            ? 'bg-red-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {status === 'loading' && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {status === 'idle' && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        )}
        {status === 'copied' && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {status === 'error' && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {status === 'idle' && 'Share'}
        {status === 'loading' && 'Creating link...'}
        {status === 'copied' && 'Link copied!'}
        {status === 'error' && 'Failed to share'}
      </button>

      {shareUrl && status === 'copied' && (
        <p className="text-xs text-gray-500 truncate max-w-xs">{shareUrl}</p>
      )}
    </div>
  );
}
