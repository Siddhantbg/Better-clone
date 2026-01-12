import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import fc from 'fast-check'

// Mock GSAP modules before importing AnimationManager
vi.mock('gsap', () => ({
  gsap: {
    timeline: vi.fn(() => ({
      to: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      set: vi.fn(),
      play: vi.fn(),
      pause: vi.fn(),
      kill: vi.fn(),
      resume: vi.fn(),
    })),
    to: vi.fn(() => ({ play: vi.fn(), pause: vi.fn(), kill: vi.fn() })),
    from: vi.fn(() => ({ play: vi.fn(), pause: vi.fn(), kill: vi.fn() })),
    fromTo: vi.fn(() => ({ play: vi.fn(), pause: vi.fn(), kill: vi.fn() })),
    set: vi.fn(),
    defaults: vi.fn(),
    killTweensOf: vi.fn(),
    globalTimeline: {
      pause: vi.fn(),
      resume: vi.fn(),
    },
    registerPlugin: vi.fn(),
  }
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn((options) => ({
      kill: vi.fn(),
      refresh: vi.fn(),
      update: vi.fn(),
      enable: vi.fn(),
      disable: vi.fn(),
      trigger: options?.trigger,
      start: options?.start,
      end: options?.end,
      scrub: options?.scrub,
      animation: options?.animation,
    })),
    killAll: vi.fn(),
    refresh: vi.fn(),
    update: vi.fn(),
  }
}))

vi.mock('gsap/TextPlugin', () => ({
  TextPlugin: {}
}))

import { AnimationManager } from '../utils/AnimationManager.js'

// Feature: modern-crypto-ui-transformation, Property 6: Page Load Animation Initialization
// **Validates: Requirements 2.1**

describe('AnimationManager Property Tests', () => {
  let mockGsap
  let mockScrollTrigger
  
  beforeEach(async () => {
    // Get references to the mocked modules
    mockGsap = (await import('gsap')).gsap
    mockScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger
    
    // Clear all mocks
    vi.clearAllMocks()
    
    // Mock window.matchMedia for reduced motion
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })))
    
    // Mock performance API
    vi.stubGlobal('performance', {
      now: vi.fn(() => Date.now()),
      memory: {
        usedJSHeapSize: 1000000,
      },
    })
    
    // Mock requestAnimationFrame
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb) => setTimeout(cb, 16)))
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('Property 6: Page Load Animation Initialization - For any page load event, GSAP timeline animations should be created and elements should have animation properties applied', () => {
    fc.assert(fc.property(
      fc.record({
        timelineName: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
        animationType: fc.constantFrom('fadeIn', 'slideUp', 'scaleIn', 'staggerFadeIn'),
        duration: fc.double({ min: 0.1, max: 3.0 }),
        elementCount: fc.integer({ min: 1, max: 10 })
      }),
      ({ timelineName, animationType, duration, elementCount }) => {
        // Create a fresh AnimationManager instance for each test
        const manager = new AnimationManager()
        
        // Test timeline creation
        const timeline = manager.createTimeline(timelineName, { duration })
        
        // Verify timeline was created with GSAP
        expect(mockGsap.timeline).toHaveBeenCalled()
        expect(timeline).toBeDefined()
        
        // Test that timeline is stored in manager
        const retrievedTimeline = manager.getTimeline(timelineName)
        expect(retrievedTimeline).toBe(timeline)
        
        // Test animation presets initialization
        const mockElements = Array.from({ length: elementCount }, (_, i) => ({
          id: `element-${i}`,
          style: {},
        }))
        
        // Test that animation presets are callable and use GSAP
        const animationResult = manager.presets[animationType](mockElements[0], { duration })
        
        // Verify GSAP animation methods were called
        const gsapMethodCalls = [
          mockGsap.to.mock.calls.length,
          mockGsap.from.mock.calls.length,
          mockGsap.fromTo.mock.calls.length,
        ].reduce((sum, calls) => sum + calls, 0)
        
        expect(gsapMethodCalls).toBeGreaterThan(0)
        expect(animationResult).toBeDefined()
        
        // Test performance metrics are initialized
        const metrics = manager.getPerformanceMetrics()
        expect(metrics).toHaveProperty('frameRate')
        expect(metrics).toHaveProperty('animationCount')
        expect(metrics).toHaveProperty('memoryUsage')
        expect(metrics.animationCount).toBeGreaterThan(0)
        
        // Test manager initialization state
        expect(manager.isInitialized).toBe(true)
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('Property Test: Timeline Management Consistency', () => {
    fc.assert(fc.property(
      fc.array(fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 10 }),
      (timelineNames) => {
        const manager = new AnimationManager()
        const createdTimelines = new Map()
        
        // Create all timelines
        timelineNames.forEach(name => {
          const timeline = manager.createTimeline(name)
          createdTimelines.set(name, timeline)
        })
        
        // Verify all timelines can be retrieved
        timelineNames.forEach(name => {
          const retrieved = manager.getTimeline(name)
          expect(retrieved).toBe(createdTimelines.get(name))
        })
        
        // Test timeline count matches
        expect(manager.getPerformanceMetrics().animationCount).toBe(timelineNames.length)
        
        return true
      }
    ), { numRuns: 5 })
  })

  test('Property Test: Reduced Motion Handling', () => {
    fc.assert(fc.property(
      fc.boolean(),
      (reducedMotionEnabled) => {
        const manager = new AnimationManager()
        
        // Create some timelines
        const timeline1 = manager.createTimeline('test1')
        const timeline2 = manager.createTimeline('test2')
        
        // Clear previous calls to gsap.set
        mockGsap.set.mockClear()
        
        // Set reduced motion preference
        manager.setReducedMotion(reducedMotionEnabled)
        
        if (reducedMotionEnabled) {
          // Verify animations are paused/disabled through gsap.defaults
          expect(mockGsap.defaults).toHaveBeenCalledWith(expect.objectContaining({
            duration: 0.01,
            ease: 'none',
          }))
        } else {
          // Verify normal animation defaults are restored
          expect(mockGsap.defaults).toHaveBeenCalledWith(expect.objectContaining({
            duration: expect.any(Number),
            ease: expect.any(String),
          }))
        }
        
        // Test that reduced motion state is tracked
        expect(manager.reducedMotion).toBe(reducedMotionEnabled)
        
        return true
      }
    ), { numRuns: 20 })
  })

  test('Property Test: ScrollTrigger Registration', () => {
    fc.assert(fc.property(
      fc.record({
        triggerName: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
        startPosition: fc.constantFrom('top 80%', 'center center', 'bottom 20%'),
        scrubEnabled: fc.boolean()
      }),
      ({ triggerName, startPosition, scrubEnabled }) => {
        const manager = new AnimationManager()
        const mockElement = { id: 'test-element' }
        const mockAnimation = { play: vi.fn(), pause: vi.fn() }
        
        // Register ScrollTrigger
        const scrollTrigger = manager.registerScrollTrigger(
          triggerName,
          mockElement,
          mockAnimation,
          { start: startPosition, scrub: scrubEnabled }
        )
        
        // Verify ScrollTrigger.create was called with correct parameters
        expect(mockScrollTrigger.create).toHaveBeenCalledWith(
          expect.objectContaining({
            trigger: mockElement,
            start: startPosition,
            scrub: scrubEnabled,
            animation: mockAnimation,
          })
        )
        
        expect(scrollTrigger).toBeDefined()
        
        return true
      }
    ), { numRuns: 5 })
  })
})
