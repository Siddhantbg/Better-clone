import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import fc from 'fast-check'
import { MobileOptimizationManager } from '../utils/MobileOptimizationManager.js'

describe('Mobile Animation Optimization Properties', () => {
  let mobileOptimizationManager
  let mockWindow
  let mockNavigator
  let mockDocument

  beforeEach(() => {
    // Mock window object
    mockWindow = {
      innerWidth: 1024,
      innerHeight: 768,
      devicePixelRatio: 1,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      matchMedia: vi.fn(() => ({ matches: false, addEventListener: vi.fn() }))
    }

    // Mock navigator object
    mockNavigator = {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      maxTouchPoints: 0,
      connection: {
        effectiveType: '4g',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      },
      vibrate: vi.fn()
    }

    // Mock document object
    mockDocument = {
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

    // Set up global mocks
    global.window = mockWindow
    global.navigator = mockNavigator
    global.document = mockDocument

    mobileOptimizationManager = new MobileOptimizationManager()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // Feature: modern-crypto-ui-transformation, Property 20: Mobile Animation Optimization
  test('mobile-specific animation configurations are applied and touch-friendly interactions are implemented', () => {
    fc.assert(fc.property(
      fc.record({
        screenWidth: fc.integer({ min: 320, max: 1920 }),
        screenHeight: fc.integer({ min: 568, max: 1080 }),
        devicePixelRatio: fc.float({ min: 1, max: 3 }),
        userAgent: fc.constantFrom(
          'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
          'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
          'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36',
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        ),
        maxTouchPoints: fc.integer({ min: 0, max: 10 }),
        connectionType: fc.constantFrom('slow-2g', '2g', '3g', '4g', 'unknown')
      }),
      ({ screenWidth, screenHeight, devicePixelRatio, userAgent, maxTouchPoints, connectionType }) => {
        // Set up mock environment
        mockWindow.innerWidth = screenWidth
        mockWindow.innerHeight = screenHeight
        mockWindow.devicePixelRatio = devicePixelRatio
        mockNavigator.userAgent = userAgent
        mockNavigator.maxTouchPoints = maxTouchPoints
        if (mockNavigator.connection) {
          mockNavigator.connection.effectiveType = connectionType
        }

        // Create new manager with updated environment
        const manager = new MobileOptimizationManager()

        // Test 1: Device detection works correctly
        const deviceInfo = manager.getDeviceInfo()
        
        // Mobile detection based on screen width and user agent
        const expectedIsMobile = screenWidth <= 768 || 
                                userAgent.includes('iPhone') || 
                                userAgent.includes('Android')
        
        const expectedIsTablet = (screenWidth > 768 && screenWidth <= 1024) ||
                                userAgent.includes('iPad')
        
        const expectedIsTouchDevice = maxTouchPoints > 0 || userAgent.includes('iPhone') || 
                                     userAgent.includes('iPad') || userAgent.includes('Android')

        expect(deviceInfo.isMobile).toBe(expectedIsMobile)
        expect(deviceInfo.isTablet).toBe(expectedIsTablet)
        expect(deviceInfo.isTouchDevice).toBe(expectedIsTouchDevice)
        expect(deviceInfo.devicePixelRatio).toBe(isNaN(devicePixelRatio) ? 1 : devicePixelRatio)
        expect(deviceInfo.screenSize.width).toBe(screenWidth)
        expect(deviceInfo.screenSize.height).toBe(screenHeight)

        // Test 2: Mobile animation configuration is optimized
        const animConfig = manager.getMobileAnimationConfig()
        
        if (expectedIsMobile) {
          // Mobile devices should have reduced animation complexity
          expect(parseFloat(animConfig.duration)).toBeLessThanOrEqual(0.6)
          expect(animConfig.particleCount).toBeLessThanOrEqual(100)
          expect(animConfig.enableParallax).toBe(false)
          expect(animConfig.maxConcurrentAnimations).toBeLessThanOrEqual(10)
          
          // High DPI devices should have further reduced particle count
          if (devicePixelRatio > 2) {
            expect(animConfig.particleCount).toBeLessThan(50)
          }
        }

        // Test 3: Connection-based optimizations
        if (connectionType === 'slow-2g' || connectionType === '2g') {
          expect(animConfig.enableParticles).toBe(false)
          expect(animConfig.particleCount).toBe(0)
          expect(parseFloat(animConfig.duration)).toBeLessThanOrEqual(0.3)
        }

        // Test 4: Touch interaction configuration
        const touchConfig = manager.getTouchInteractionConfig()
        
        expect(touchConfig.minTouchTargetSize).toBeGreaterThanOrEqual(44) // iOS HIG recommendation
        expect(touchConfig.enableHoverEffects).toBe(!expectedIsTouchDevice)
        expect(touchConfig.enableMagneticEffects).toBe(!expectedIsMobile)
        expect(touchConfig.enableTouchFeedback).toBe(expectedIsTouchDevice)
        
        if (expectedIsMobile) {
          expect(touchConfig.touchDelay).toBeGreaterThan(0)
        }

        // Test 5: Responsive animation scaling
        const scaling = manager.getResponsiveAnimationScaling()
        
        if (expectedIsMobile) {
          expect(scaling.scale).toBeLessThan(1)
          expect(scaling.translateScale).toBeLessThan(1)
          expect(scaling.rotateScale).toBeLessThan(1)
          expect(scaling.transformTransitions).toBe(false)
        } else if (expectedIsTablet) {
          expect(scaling.scale).toBeLessThanOrEqual(0.95)
          expect(scaling.transformTransitions).toBe(true)
        } else {
          expect(scaling.scale).toBe(1)
          expect(scaling.transformTransitions).toBe(true)
        }

        // Test 6: CSS optimizations are applied
        if (expectedIsMobile) {
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('mobile-device')
          expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--mobile-animation-duration', 
            expect.any(String)
          )
          expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--mobile-particle-count', 
            expect.any(String)
          )
        }

        if (expectedIsTouchDevice) {
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('touch-device')
        }

        return true
      }
    ), { numRuns: 10 })
  })

  test('touch event handlers are properly configured for mobile devices', () => {
    fc.assert(fc.property(
      fc.record({
        isMobile: fc.boolean(),
        isTouchDevice: fc.boolean(),
        enableHaptic: fc.boolean(),
        hasVibrate: fc.boolean()
      }),
      ({ isMobile, isTouchDevice, enableHaptic, hasVibrate }) => {
        // Set up environment
        mockWindow.innerWidth = isMobile ? 375 : 1024
        mockNavigator.maxTouchPoints = isTouchDevice ? 5 : 0
        if (!hasVibrate) {
          delete mockNavigator.vibrate
        }

        const manager = new MobileOptimizationManager()
        
        // Create touch handlers
        const mockCallbacks = {
          onTouchStart: vi.fn(),
          onTouchEnd: vi.fn(),
          onTouchMove: vi.fn(),
          onClick: vi.fn()
        }

        const handlers = manager.createTouchHandlers({
          ...mockCallbacks,
          haptic: enableHaptic
        })

        // Test touch handlers exist
        expect(handlers).toHaveProperty('onTouchStart')
        expect(handlers).toHaveProperty('onTouchEnd')
        expect(handlers).toHaveProperty('onTouchMove')
        expect(handlers).toHaveProperty('onClick')

        // Test touch start behavior
        const mockTouchEvent = {
          target: { classList: { add: vi.fn(), remove: vi.fn() } }
        }

        handlers.onTouchStart(mockTouchEvent)
        
        const touchConfig = manager.getTouchInteractionConfig()
        if (touchConfig.enableTouchFeedback) {
          expect(mockTouchEvent.target.classList.add).toHaveBeenCalledWith('touch-active')
        }

        // Test haptic feedback
        if (enableHaptic && hasVibrate && mockNavigator.vibrate) {
          expect(mockNavigator.vibrate).toHaveBeenCalledWith(10)
        }

        // Test callback execution
        expect(mockCallbacks.onTouchStart).toHaveBeenCalledWith(mockTouchEvent)

        // Test touch end behavior
        handlers.onTouchEnd(mockTouchEvent)
        expect(mockCallbacks.onTouchEnd).toHaveBeenCalledWith(mockTouchEvent)

        return true
      }
    ), { numRuns: 10 })
  })

  test('animation durations and particle counts scale appropriately with device capabilities', () => {
    fc.assert(fc.property(
      fc.record({
        screenWidth: fc.integer({ min: 320, max: 1920 }),
        devicePixelRatio: fc.float({ min: 1, max: 3 }),
        connectionType: fc.constantFrom('slow-2g', '2g', '3g', '4g')
      }),
      ({ screenWidth, devicePixelRatio, connectionType }) => {
        // Set up environment
        mockWindow.innerWidth = screenWidth
        mockWindow.devicePixelRatio = devicePixelRatio
        if (mockNavigator.connection) {
          mockNavigator.connection.effectiveType = connectionType
        }

        const manager = new MobileOptimizationManager()
        const animConfig = manager.getMobileAnimationConfig()

        // Test animation duration scaling
        const duration = parseFloat(animConfig.duration)
        
        if (connectionType === 'slow-2g' || connectionType === '2g') {
          expect(duration).toBeLessThanOrEqual(0.2)
        } else if (screenWidth <= 768) { // Mobile
          expect(duration).toBeLessThanOrEqual(0.4)
        } else {
          expect(duration).toBeLessThanOrEqual(0.6)
        }

        // Test particle count scaling
        const particleCount = animConfig.particleCount
        
        if (connectionType === 'slow-2g' || connectionType === '2g') {
          expect(particleCount).toBe(0)
        } else if (screenWidth <= 768) { // Mobile
          expect(particleCount).toBeLessThanOrEqual(50)
          
          // High DPI should reduce particles further
          if (devicePixelRatio > 2) {
            expect(particleCount).toBeLessThanOrEqual(35)
          }
        } else if (screenWidth <= 1024) { // Tablet
          expect(particleCount).toBeLessThanOrEqual(75)
        } else { // Desktop
          expect(particleCount).toBeLessThanOrEqual(100)
        }

        // Test blur intensity scaling
        const blurIntensity = parseInt(animConfig.blurIntensity)
        
        if (screenWidth <= 768) { // Mobile
          expect(blurIntensity).toBeLessThanOrEqual(12)
          
          if (devicePixelRatio > 2) {
            expect(blurIntensity).toBeLessThanOrEqual(10)
          }
        } else {
          expect(blurIntensity).toBeLessThanOrEqual(16)
        }

        return true
      }
    ), { numRuns: 10 })
  })

  test('device orientation changes trigger proper reconfiguration', () => {
    fc.assert(fc.property(
      fc.record({
        initialWidth: fc.integer({ min: 320, max: 1024 }),
        initialHeight: fc.integer({ min: 568, max: 768 }),
        rotated: fc.boolean()
      }),
      ({ initialWidth, initialHeight, rotated }) => {
        // Set initial orientation
        mockWindow.innerWidth = initialWidth
        mockWindow.innerHeight = initialHeight

        const manager = new MobileOptimizationManager()
        const initialInfo = manager.getDeviceInfo()

        // Simulate orientation change
        if (rotated) {
          mockWindow.innerWidth = initialHeight
          mockWindow.innerHeight = initialWidth
        }

        // Trigger orientation change detection
        manager.detectDevice()
        const newInfo = manager.getDeviceInfo()

        // Test orientation detection
        const expectedInitialOrientation = initialWidth > initialHeight ? 'landscape' : 'portrait'
        const expectedNewOrientation = rotated && initialWidth !== initialHeight ? 
          (expectedInitialOrientation === 'landscape' ? 'portrait' : 'landscape') :
          expectedInitialOrientation

        expect(initialInfo.orientation).toBe(expectedInitialOrientation)
        expect(newInfo.orientation).toBe(expectedNewOrientation)

        // Test screen size updates
        expect(newInfo.screenSize.width).toBe(rotated ? initialHeight : initialWidth)
        expect(newInfo.screenSize.height).toBe(rotated ? initialWidth : initialHeight)

        return true
      }
    ), { numRuns: 10 })
  })

  test('listener notifications work correctly for device changes', () => {
    const manager = new MobileOptimizationManager()
    
    // Add mock listeners
    const listener1 = vi.fn()
    const listener2 = vi.fn()
    
    manager.addListener(listener1)
    manager.addListener(listener2)

    // Trigger a change
    const newDeviceInfo = {
      isMobile: true,
      isTablet: false,
      isTouchDevice: true,
      devicePixelRatio: 2,
      screenSize: { width: 375, height: 667 },
      orientation: 'portrait',
      connectionType: '4g'
    }

    manager.notifyListeners()

    // Verify listeners were called
    expect(listener1).toHaveBeenCalled()
    expect(listener2).toHaveBeenCalled()

    // Remove a listener
    manager.removeListener(listener1)
    
    // Trigger another change
    manager.notifyListeners()
    
    // Verify only remaining listener was called
    expect(listener2).toHaveBeenCalledTimes(2)
    expect(listener1).toHaveBeenCalledTimes(1) // Should not increase
  })

  test('CSS custom properties are set correctly for different device types', () => {
    fc.assert(fc.property(
      fc.record({
        deviceType: fc.constantFrom('mobile', 'tablet', 'desktop'),
        connectionSpeed: fc.constantFrom('slow', 'fast')
      }),
      ({ deviceType, connectionSpeed }) => {
        // Set up environment based on device type
        switch (deviceType) {
          case 'mobile':
            mockWindow.innerWidth = 375
            mockWindow.innerHeight = 667
            mockNavigator.maxTouchPoints = 5
            break
          case 'tablet':
            mockWindow.innerWidth = 768
            mockWindow.innerHeight = 1024
            mockNavigator.maxTouchPoints = 5
            break
          case 'desktop':
            mockWindow.innerWidth = 1920
            mockWindow.innerHeight = 1080
            mockNavigator.maxTouchPoints = 0
            break
        }

        if (mockNavigator.connection) {
          mockNavigator.connection.effectiveType = connectionSpeed === 'slow' ? 'slow-2g' : '4g'
        }

        const manager = new MobileOptimizationManager()

        // Verify CSS classes are applied correctly
        if (deviceType === 'mobile') {
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('mobile-device')
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('touch-device')
        } else if (deviceType === 'tablet') {
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('tablet-device')
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('touch-device')
        }

        if (connectionSpeed === 'slow') {
          expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('slow-connection')
        }

        // Verify CSS custom properties are set
        if (deviceType === 'mobile') {
          expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--mobile-animation-duration',
            expect.stringMatching(/^\d+(\.\d+)?s$/)
          )
          expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--mobile-particle-count',
            expect.stringMatching(/^\d+$/)
          )
          expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalledWith(
            '--mobile-blur-intensity',
            expect.stringMatching(/^\d+px$/)
          )
        }

        return true
      }
    ), { numRuns: 10 })
  })
})
