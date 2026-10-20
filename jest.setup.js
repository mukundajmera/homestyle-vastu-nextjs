import '@testing-library/jest-dom'
import * as React from 'react'
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;
window.ResizeObserver = ResizeObserver;

// Mock Request to fix API tests in jsdom environment
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = input;
      this.method = init?.method || 'GET';
      this.body = init?.body;
    }
    async json() {
      if (!this.body) return null;
      return JSON.parse(this.body);
    }
  };
}
if (typeof global.Response === 'undefined') {
  global.Response = class Response {};
}

jest.mock('lucide-react', () => ({
  ArrowRight: (props) => React.createElement('span', { ...props, 'data-testid': 'arrow-right-icon' }, '→'),
  Sparkles: (props) => React.createElement('span', { ...props, 'data-testid': 'sparkles-icon' }, '✨'),
  Menu: (props) => React.createElement('span', { ...props, 'data-testid': 'menu-icon' }, '☰'),
  Search: (props) => React.createElement('span', { ...props, 'data-testid': 'search-icon' }, '🔍'),
  ArrowLeft: (props) => React.createElement('span', { ...props, 'data-testid': 'arrow-left-icon' }, '←'),
  X: (props) => React.createElement('span', { ...props, 'data-testid': 'x-icon' }, '×'),
  Compass: (props) => React.createElement('span', { ...props, 'data-testid': 'compass-icon' }, '⌖'),
  MessageCircle: (props) => React.createElement('span', { ...props, 'data-testid': 'message-circle-icon' }, '💬'),
  Phone: (props) => React.createElement('span', { ...props, 'data-testid': 'phone-icon' }, '📞'),
  MapPin: (props) => React.createElement('span', { ...props, 'data-testid': 'map-pin-icon' }, '📍'),
  Home: (props) => React.createElement('span', { ...props, 'data-testid': 'home-icon' }, '🏠'),
  Building2: (props) => React.createElement('span', { ...props, 'data-testid': 'building-icon' }, '🏢'),
  Globe: (props) => React.createElement('span', { ...props, 'data-testid': 'globe-icon' }, '🌐'),
  Loader2: (props) => React.createElement('span', { ...props, 'data-testid': 'loader-icon' }, '↻'),
  Check: (props) => React.createElement('span', { ...props, 'data-testid': 'check-icon' }, '✓'),
  Circle: (props) => React.createElement('span', { ...props, 'data-testid': 'circle-icon' }, '○'),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props) {
    const { fill, priority, placeholder, blurDataURL, ...rest } = props
    return React.createElement('img', {
      ...rest,
      'data-fill': fill?.toString(),
      'data-priority': priority?.toString(),
      'data-placeholder': placeholder,
      'data-blur': blurDataURL ? 'true' : 'false'
    })
  }
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }) {
    return React.createElement('a', { href, ...props }, children)
  }
}))
