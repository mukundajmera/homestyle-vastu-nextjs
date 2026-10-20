import '@testing-library/jest-dom';

// Next.js Request/Response mocks for Node environment
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = init?.headers || new Headers();
    }
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body;
    }
    static json(body, init) {
      return new Response(JSON.stringify(body), { ...init, headers: { 'content-type': 'application/json' } });
    }
  };
}

// Next.js NextResponse mock
jest.mock('next/server', () => {
  return {
    NextResponse: {
      json: (body, init) => {
        return new Response(JSON.stringify(body), { ...init, headers: { 'content-type': 'application/json' } });
      }
    }
  };
});

// Mock embla carousel for testing components
jest.mock('embla-carousel-react', () => {
  return jest.fn().mockReturnValue([
    jest.fn(),
    {
      on: jest.fn(),
      off: jest.fn(),
      canScrollNext: jest.fn().mockReturnValue(true),
      canScrollPrev: jest.fn().mockReturnValue(true),
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
    },
  ]);
});

// Polyfill for IntersectionObserver which isn't available in jsdom
class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Polyfill ResizeObserver
class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;
