import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import fc from 'fast-check'
import { ReducedMotionManager } from '../utils/ReducedMotionManager.js'

describe('Reduced Motion Accessibility Properties', () => {
  let reducedMotionManager
  let mockMediaQuery

  beforeEach(() => {
    // Mock matchMedia
    mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }
    
    global.matchMedia = vi.fn(() => mockMediaQuery)
    
    // Mock document and window
    global.document = {
      documentElement: {
        classList: {
          add: vi.fn(),
          remove: vi.fn()
        },
        style: {
          setProperty: vi.fn(),
          removeProperty: vi.fn()
        }
      }
    }
    
    global.window = {
      matchMedia: global.matchMedia
    }

    reducedMotionManager = new ReducedMotionManager()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // Feature: modern-crypto-ui-transformation, Property 19: Reduced Motion Accessibility
  test('reduced motion preferences are disabled or simplified appropriately', () => {
    fc.assert(fc.property(
      fc.record({
        userPreference: fc.boolean(),
        animationType: fc.constantFrom('fadeIn', 'slideUp', 'scaleIn', 'hover', 'pageTransition', 'scroll', 'parallax', 'particle', 'continuous', 'infinite'),
        componentType: fc.constantFrom('button', 'card', 'navbar', 'form', 'progress')
      }),
      ({ userPreference, animationType, componentType }) => {
        // Set the user's motion preference
        reducedMotionManager.setReducedMotion(userPreference)
        
        // Test 1: Reduced motion preference is correctly stored
        expect(reducedMotionManager.getReducedMotionPreference()).toBe(userPreference)
        
        // Test 2: Animation configuration reflects preference
        const animConfig = reducedMotionManager.getAnimationConfig()
        if (userPreference) {
          // When reduced motion is enabled, animations should be minimal
          expect(animConfig.duration).toBe(0.01)
          expect(animConfig.ease).toBe('none')
          expect(animConfig.scale).toBe(1)
          expect(animConfig.opacity).toBe(1)
          expect(animConfig.transform).toBe('none')
          expect(animConfig.transition).toBe('none')
        } else {
          // When reduced motion is disabled, animations should be normal
          expect(animConfig.duration).toBe(0.6)
          expect(animConfig.ease).toBe('power2.out')
          expect(animConfig.scale).toBe(null)
          expect(animConfig.opacity).toBe(null)
          expect(animConfig.transform).toBe(null)
          expect(animConfig.transition).toBe(null)
        }
        
        // Test 3: Navigation configuration reflects preference
        const navConfig = reducedMotionManager.getNavigationConfig()
        if (userPreference) {
          expect(navConfig.scrollBehavior).toBe('auto')
          expect(navConfig.focusIndicator).toBe('static')
          expect(navConfig.pageTransitions).toBe(false)
          expect(navConfig.hoverEffects).toBe(false)
          expect(navConfig.parallaxEffects).toBe(false)
        } else {
          expect(navConfig.scrollBehavior).toBe('smooth')
          expect(navConfig.focusIndicator).toBe('animated')
          expect(navConfig.pageTransitions).toBe(true)
          expect(navConfig.hoverEffects).toBe(true)
          expect(navConfig.parallaxEffects).toBe(true)
        }
        
        // Test 4: Simplified animations are provided when needed
        const simplifiedAnim = reducedMotionManager.getSimplifiedAnimation(animationType)
        if (userPreference) {
          expect(simplifiedAnim).toBeTruthy()
          expect(simplifiedAnim.to.duration).toBe(0.01)
          expect(simplifiedAnim.from.opacity).toBe(0)
          expect(simplifiedAnim.to.opacity).toBe(1)
        } else {
          expect(simplifiedAnim).toBe(null) // Use normal animations
        }
        
        // Test 5: Certain animation types should be disabled for reduced motion
        const disabledAnimations = ['parallax', 'particle', 'continuous', 'infinite', 'bounce', 'elastic', 'shake', 'pulse', 'rotate', 'scale', 'transform3d']
        const shouldDisable = reducedMotionManager.shouldDisableAnimation(animationType)
        
        if (userPreference && disabledAnimations.includes(animationType)) {
          expect(shouldDisable).toBe(true)
        } else if (!userPreference) {
          expect(shouldDisable).toBe(false)
        }
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('CSS custom properties are correctly applied for reduced motion', () => {
    fc.assert(fc.property(
      fc.boolean(),
      (reducedMotionEnabled) => {
        // Set reduced motion preference
        reducedMotionManager.setReducedMotion(reducedMotionEnabled)
        
        // Apply styles (this calls applyReducedMotionStyles internally)
        const root = document.documentElement
        
        if (reducedMotionEnabled) {
          // Verify reduced motion class is added
          expect(root.classList.add).toHaveBeenCalledWith('reduced-motion')
          
          // Verify CSS custom properties are set for reduced motion
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-fast', '0.01ms')
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-medium', '0.01ms')
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-slow', '0.01ms')
          expect(root.style.setProperty).toHaveBeenCalledWith('--transition-duration', '0.01ms')
          expect(root.style.setProperty).toHaveBeenCalledWith('--scroll-behavior', 'auto')
          
          // Verify transform properties are disabled
          expect(root.style.setProperty).toHaveBeenCalledWith('--transform-scale', '1')
          expect(root.style.setProperty).toHaveBeenCalledWith('--transform-translate', '0')
          expect(root.style.setProperty).toHaveBeenCalledWith('--transform-rotate', '0deg')
          
        } else {
          // Verify reduced motion class is removed
          expect(root.classList.remove).toHaveBeenCalledWith('reduced-motion')
          
          // Verify normal animation durations are restored
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-fast', '0.3s')
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-medium', '0.6s')
          expect(root.style.setProperty).toHaveBeenCalledWith('--animation-duration-slow', '1.2s')
          expect(root.style.setProperty).toHaveBeenCalledWith('--transition-duration', '0.3s')
          expect(root.style.setProperty).toHaveBeenCalledWith('--scroll-behavior', 'smooth')
        }
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('media query changes are properly handled', () => {
    fc.assert(fc.property(
      fc.boolean(),
      (initialPreference) => {
        // Clear previous mock calls
        vi.clearAllMocks()
        
        // Set initial preference on the mock before creating manager
        mockMediaQuery.matches = initialPreference
        
        // Update the global matchMedia mock to return our configured mock
        global.matchMedia = vi.fn(() => mockMediaQuery)
        global.window.matchMedia = global.matchMedia
        
        // Create new manager to test initialization
        const manager = new ReducedMotionManager()
        
        // Verify initial state matches media query
        expect(manager.getReducedMotionPreference()).toBe(initialPreference)
        
        // Simulate media query change
        const oppositePreference = !initialPreference
        const changeEvent = { matches: oppositePreference }
        
        // Get the change handler that was registered
        const addEventListenerCalls = mockMediaQuery.addEventListener.mock.calls
        const changeHandlerCall = addEventListenerCalls.find(call => call[0] === 'change')
        
        if (changeHandlerCall) {
          const changeHandler = changeHandlerCall[1]
          
          // Trigger the change
          changeHandler(changeEvent)
          
          // Verify preference was updated
          expect(manager.getReducedMotionPreference()).toBe(oppositePreference)
        }
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('listeners are properly notified of preference changes', () => {
    fc.assert(fc.property(
      fc.record({
        initialPreference: fc.boolean(),
        newPreference: fc.boolean()
      }),
      ({ initialPreference, newPreference }) => {
        // Set initial preference
        reducedMotionManager.setReducedMotion(initialPreference)
        
        // Add a mock listener
        const mockListener = vi.fn()
        reducedMotionManager.addListener(mockListener)
        
        // Change preference
        reducedMotionManager.setReducedMotion(newPreference)
        
        // Verify listener was called with new preference
        expect(mockListener).toHaveBeenCalledWith(newPreference)
        
        // Remove listener
        reducedMotionManager.removeListener(mockListener)
        
        // Change preference again
        reducedMotionManager.setReducedMotion(!newPreference)
        
        // Verify listener was not called after removal
        expect(mockListener).toHaveBeenCalledTimes(1)
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('animation type validation works correctly', () => {
    fc.assert(fc.property(
      fc.record({
        animationType: fc.constantFrom('fadeIn', 'slideUp', 'scaleIn', 'hover', 'pageTransition', 'scroll', 'parallax', 'particle', 'continuous', 'infinite', 'bounce', 'elastic', 'shake', 'pulse', 'rotate', 'scale', 'transform3d', 'unknown'),
        reducedMotion: fc.boolean()
      }),
      ({ animationType, reducedMotion }) => {
        reducedMotionManager.setReducedMotion(reducedMotion)
        
        const shouldDisable = reducedMotionManager.shouldDisableAnimation(animationType)
        
        // Define which animations should be disabled for reduced motion
        const disabledAnimations = [
          'parallax', 'particle', 'continuous', 'infinite', 'bounce', 
          'elastic', 'shake', 'pulse', 'rotate', 'scale', 'transform3d'
        ]
        
        if (reducedMotion && disabledAnimations.includes(animationType)) {
          expect(shouldDisable).toBe(true)
        } else {
          expect(shouldDisable).toBe(false)
        }
        
        // Test simplified animation generation
        const simplified = reducedMotionManager.getSimplifiedAnimation(animationType)
        
        if (reducedMotion) {
          expect(simplified).toBeTruthy()
          expect(simplified.to.duration).toBe(0.01)
          
          // All simplified animations should have opacity transition
          expect(simplified.from).toHaveProperty('opacity', 0)
          expect(simplified.to).toHaveProperty('opacity', 1)
        } else {
          expect(simplified).toBe(null)
        }
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('cleanup properly removes event listeners', () => {
    const manager = new ReducedMotionManager()
    
    // Verify addEventListener was called during initialization
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    
    // Add some listeners
    const listener1 = vi.fn()
    const listener2 = vi.fn()
    manager.addListener(listener1)
    manager.addListener(listener2)
    
    // Destroy the manager
    manager.destroy()
    
    // Verify removeEventListener was called
    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    
    // Verify listeners were cleared (we can't directly test this, but we can test that no errors occur)
    expect(() => manager.notifyListeners()).not.toThrow()
  })
})
