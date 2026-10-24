'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Cloudflare Turnstile check shown above the submit button. It reports a token when the visitor
 * passes, and null when the token expires or fails. The server verifies the token before saving.
 */
export function TurnstileWidget({ onToken }: { onToken: (token: string | null) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(() => typeof window !== 'undefined' && Boolean(window.turnstile));

  useEffect(() => {
    if (!isScriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onToken(token),
      'expired-callback': () => onToken(null),
      'error-callback': () => onToken(null),
    });

    return () => {
      window.turnstile?.remove(widgetId);
    };
  }, [isScriptReady, siteKey, onToken]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
      />
      <div ref={containerRef} className="flex justify-center" />
    </>
  );
}
