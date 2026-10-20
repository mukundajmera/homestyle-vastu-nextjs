// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import * as React from 'react'

// Mock lucide-react icons
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
}))

// Mock Next.js Image component globally
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

// Mock Next.js Link component globally  
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, ...props }) {
    return React.createElement('a', { href, ...props }, children)
  }
}))
