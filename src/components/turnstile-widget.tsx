'use client';

import { useEffect, useRef, useState } from 'react';

const TURNSTILE_SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
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
export function TurnstileWidget({ action, onToken }: { action: string; onToken: (token: string | null) => void }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptReady, setIsScriptReady] = useState(() => typeof window !== 'undefined' && Boolean(window.turnstile));

  // Inject the Cloudflare script directly. The next/script onLoad callback did not fire in this app,
  // so the widget never rendered and the form had no captcha at all.
  useEffect(() => {
    if (!siteKey || window.turnstile) return;

    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    const markReady = () => setIsScriptReady(true);
    script.addEventListener('load', markReady);
    return () => script.removeEventListener('load', markReady);
  }, [siteKey]);

  useEffect(() => {
    if (!isScriptReady || !siteKey || !containerRef.current || !window.turnstile) return;

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      callback: (token) => onToken(token),
      'expired-callback': () => onToken(null),
      'error-callback': () => onToken(null),
    });

    return () => {
      window.turnstile?.remove(widgetId);
    };
  }, [isScriptReady, siteKey, action, onToken]);

  if (!siteKey) return null;

  return (
    <div ref={containerRef} className="flex justify-center" />
  );
}
