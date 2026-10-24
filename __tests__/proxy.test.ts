import { config as proxyConfig, proxy } from '../src/proxy';
import type { NextRequest } from 'next/server';

jest.mock('next/server', () => {
  return {
    NextResponse: {
      next: () => {
        return {
          headers: new Headers(),
        };
      },
    },
  };
});

// Create a minimal mock NextRequest since we only test the returned response headers
const mockRequest = {} as NextRequest;

describe('proxy()', () => {
  it('sets required security headers on the response', () => {
    const response = proxy(mockRequest);

    // Assert Strict-Transport-Security
    expect(response.headers.get('Strict-Transport-Security')).toBe('max-age=31536000');

    // Assert X-Frame-Options
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');

    // Assert Content-Security-Policy contains frame-ancestors 'none'
    const csp = response.headers.get('Content-Security-Policy');
    expect(csp).toContain("frame-ancestors 'none'");
  });
});

describe('proxy matcher', () => {
  const matcher = new RegExp(`^${proxyConfig.matcher[0]}$`);

  it('runs for API routes so JSON responses also get security headers', () => {
    expect(matcher.test('/api/contact')).toBe(true);
  });

  it('runs for the plain-text llms.txt route', () => {
    expect(matcher.test('/llms.txt')).toBe(true);
  });

  it('skips static asset paths', () => {
    expect(matcher.test('/_next/static/chunk.js')).toBe(false);
    expect(matcher.test('/favicon.ico')).toBe(false);
  });
});
