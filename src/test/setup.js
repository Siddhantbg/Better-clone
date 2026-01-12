import '@testing-library/jest-dom'
import '../styles/neon-glow-effects.css'

// Mock GSAP for testing environment
global.gsap = {
  timeline: () => ({
    to: () => ({}),
    from: () => ({}),
    fromTo: () => ({}),
    set: () => ({}),
    play: () => ({}),
    pause: () => ({}),
    kill: () => ({}),
  }),
  to: () => ({}),
  from: () => ({}),
  fromTo: () => ({}),
  set: () => ({}),
  registerPlugin: () => ({}),
}

// Mock ScrollTrigger
global.ScrollTrigger = {
  create: () => ({}),
  refresh: () => ({}),
  kill: () => ({}),
}

// Mock window.matchMedia for reduced motion testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
})