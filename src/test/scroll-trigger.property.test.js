import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import fc from 'fast-check'

// Mock GSAP modules before importing ScrollTriggerSystem
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
    })),
    to: vi.fn(() => ({ kill: vi.fn() })),
    from: vi.fn(() => ({ kill: vi.fn() })),
    fromTo: vi.fn(() => ({ kill: vi.fn() })),
    set: vi.fn(),
    registerPlugin: vi.fn(),
  }
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({
      kill: vi.fn(),
      refresh: vi.fn(),
    })),
    refresh: vi.fn(),
    killAll: vi.fn(),
  }
}))

vi.mock('../utils/AnimationManager.js', () => ({
  default: {
    createTimeline: vi.fn(),
    registerScrollTrigger: vi.fn(),
  }
}))

vi.mock('../config/animations.js', () => ({
  animationConfig: {
    durations: {
      fast: 0.3,
      medium: 0.6,
      slow: 1.0,
    },
    easings: {
      smooth: 'power2.out',
      bounce: 'bounce.out',
      elastic: 'elastic.out',
    },
    scrollTrigger: {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
    },
  }
}))

// Import after mocking
import { ScrollTriggerSystem } from '../utils/ScrollTriggerSystem.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Feature: modern-crypto-ui-transformation, Property 7: Scroll Animation Triggering
// **Validates: Requirements 2.2**

describe('ScrollTrigger System Property Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks()
    
    // Mock DOM elements
    global.document = {
      querySelectorAll: vi.fn(() => []),
    }
    
    // Mock window
    global.window = {
      addEventListener: vi.fn(),
    }
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('Property 7: Scroll Animation Triggering - For any scroll event through sections, ScrollTrigger instances should activate animations at correct scroll positions', () => {
    fc.assert(fc.property(
      fc.record({
        triggerName: fc.string({ minLength: 1, maxLength: 30 }).filter(s => s.trim().length > 0),
        startPosition: fc.constantFrom('top 80%', 'center center', 'bottom 20%', 'top bottom'),
        endPosition: fc.constantFrom('bottom 20%', 'center top', 'top top', 'bottom top'),
        scrubEnabled: fc.boolean(),
        animationType: fc.constantFrom('fadeUp', 'fadeIn', 'slideLeft', 'slideRight', 'scaleIn')
      }),
      ({ triggerName, startPosition, endPosition, scrubEnabled, animationType }) => {
        // Create a fresh ScrollTriggerSystem instance for each test
        const system = new ScrollTriggerSystem()
        
        // Reset mocks for this test
        ScrollTrigger.create.mockClear()
        gsap.fromTo.mockClear()
        
        // Mock element
        const mockElement = {
          id: 'test-element',
          classList: {
            add: vi.fn(),
            remove: vi.fn(),
          },
        }
        
        // Test ScrollTrigger creation
        const trigger = system.createScrollTrigger(
          triggerName,
          mockElement,
          { from: { opacity: 0 }, to: { opacity: 1 } },
          { 
            start: startPosition, 
            end: endPosition, 
            scrub: scrubEnabled 
          }
        )
        
        // Verify ScrollTrigger.create was called with correct parameters
        expect(ScrollTrigger.create).toHaveBeenCalledWith(
          expect.objectContaining({
            trigger: mockElement,
            start: startPosition,
            end: endPosition,
            scrub: scrubEnabled,
            animation: expect.any(Object),
            toggleActions: expect.any(String),
            onEnter: expect.any(Function),
            onLeave: expect.any(Function),
            onEnterBack: expect.any(Function),
            onLeaveBack: expect.any(Function),
          })
        )
        
        // Verify animation was created
        expect(gsap.fromTo).toHaveBeenCalled()
        
        // Verify trigger is stored in system
        expect(trigger).toBeDefined()
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('Property Test: Parallax Effect Creation', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0),
        speed: fc.float().map(f => Math.fround(Math.max(0.1, Math.min(2.0, Math.abs(f))))), // Ensure 32-bit float in valid range
        direction: fc.constantFrom('vertical', 'horizontal')
      }),
      ({ name, speed, direction }) => {
        const system = new ScrollTriggerSystem()
        const mockElement = { id: 'parallax-element' }
        
        // Reset mocks for this test
        gsap.fromTo.mockClear()
        ScrollTrigger.create.mockClear()
        
        // Create parallax effect
        const parallax = system.createParallaxEffect(name, mockElement, {
          speed: speed,
          direction
        })
        
        // Verify GSAP animation was created
        expect(gsap.fromTo).toHaveBeenCalled()
        
        // Verify ScrollTrigger was created
        expect(ScrollTrigger.create).toHaveBeenCalledWith(
          expect.objectContaining({
            trigger: mockElement,
            scrub: true,
            animation: expect.any(Object),
          })
        )
        
        expect(parallax).toBeDefined()
        
        return true
      }
    ), { numRuns: 5 })
  })

  test('Property Test: Content Reveal Animation', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0),
        animationType: fc.constantFrom('fadeUp', 'fadeIn', 'slideLeft', 'slideRight', 'scaleIn'),
        elementCount: fc.integer({ min: 1, max: 5 }),
        stagger: fc.float().map(f => Math.fround(Math.max(0.05, Math.min(0.5, Math.abs(f))))) // Ensure 32-bit float in valid range
      }),
      ({ name, animationType, elementCount, stagger }) => {
        const system = new ScrollTriggerSystem()
        
        // Create mock elements
        const mockElements = Array.from({ length: elementCount }, (_, i) => ({
          id: `element-${i}`,
        }))
        
        // Reset mocks for this test
        gsap.fromTo.mockClear()
        ScrollTrigger.create.mockClear()
        
        // Create content reveal
        const reveal = system.createContentReveal(name, mockElements, {
          animationType,
          stagger: stagger,
        })
        
        // Verify GSAP animation was created with stagger
        expect(gsap.fromTo).toHaveBeenCalledWith(
          mockElements,
          expect.any(Object),
          expect.objectContaining({
            stagger: stagger,
          })
        )
        
        // Verify ScrollTrigger was created
        expect(ScrollTrigger.create).toHaveBeenCalled()
        
        expect(reveal).toBeDefined()
        
        return true
      }
    ), { numRuns: 5 })
  })

  test('Property Test: System Cleanup', () => {
    fc.assert(fc.property(
      fc.array(fc.string({ minLength: 1, maxLength: 15 }).filter(s => s.trim().length > 0), { minLength: 1, maxLength: 5 }),
      (triggerNames) => {
        const system = new ScrollTriggerSystem()
        const mockElement = { id: 'test-element', classList: { add: vi.fn(), remove: vi.fn() } }
        
        // Reset mocks for this test
        ScrollTrigger.create.mockClear()
        ScrollTrigger.killAll.mockClear()
        
        // Create multiple triggers
        triggerNames.forEach(name => {
          system.createScrollTrigger(name, mockElement, {}, {})
        })
        
        // Verify triggers were created
        expect(ScrollTrigger.create).toHaveBeenCalledTimes(triggerNames.length)
        
        // Test cleanup
        system.killAll()
        
        // Verify ScrollTrigger.killAll was called
        expect(ScrollTrigger.killAll).toHaveBeenCalledTimes(1)
        
        return true
      }
    ), { numRuns: 30 })
  })

  test('Property Test: Section Animation Setup', () => {
    fc.assert(fc.property(
      fc.record({
        sectionCount: fc.integer({ min: 1, max: 5 }),
        hasParallax: fc.boolean(),
        hasRevealContent: fc.boolean()
      }),
      ({ sectionCount, hasParallax, hasRevealContent }) => {
        const system = new ScrollTriggerSystem()
        
        // Reset mocks for this test
        ScrollTrigger.create.mockClear()
        
        // Mock sections
        const mockSections = Array.from({ length: sectionCount }, (_, i) => ({
          id: `section-${i}`,
          querySelector: vi.fn((selector) => {
            if (selector === '[data-parallax]' && hasParallax) {
              return { id: `parallax-${i}` }
            }
            return null
          }),
          querySelectorAll: vi.fn((selector) => {
            if (selector === '[data-reveal]' && hasRevealContent) {
              return [{ id: `content-${i}` }]
            }
            return []
          }),
          dataset: { revealType: 'fadeUp' }
        }))
        
        // Mock document.querySelectorAll
        global.document.querySelectorAll = vi.fn(() => mockSections)
        
        // Create section animations
        system.createSectionAnimations('.section')
        
        // Verify document.querySelectorAll was called
        expect(global.document.querySelectorAll).toHaveBeenCalledWith('.section')
        
        // Calculate expected calls: each section gets an entrance animation
        // Plus parallax if hasParallax, plus content reveal if hasRevealContent
        let expectedCalls = sectionCount // entrance animations
        if (hasParallax) expectedCalls += sectionCount // parallax effects
        if (hasRevealContent) expectedCalls += sectionCount // content reveals
        
        expect(ScrollTrigger.create).toHaveBeenCalledTimes(expectedCalls)
        
        return true
      }
    ), { numRuns: 30 })
  })
})
