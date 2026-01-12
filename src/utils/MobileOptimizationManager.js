/**
 * Mobile Optimization Manager
 * Handles mobile-specific animation configurations and touch-friendly interactions
 */

class MobileOptimizationManager {
  constructor() {
    this.isMobile = false
    this.isTablet = false
    this.isTouchDevice = false
    this.devicePixelRatio = 1
    this.screenSize = { width: 0, height: 0 }
    this.orientation = 'portrait'
    this.connectionType = 'unknown'
    this.listeners = new Set()
    
    this.init()
  }

  /**
   * Initialize mobile optimization manager
   */
  init() {
    if (typeof window === 'undefined') return

    this.detectDevice()
    this.detectConnection()
    this.setupEventListeners()
    this.applyMobileOptimizations()
  }

  /**
   * Detect device type and capabilities
   */
  detectDevice() {
    if (typeof window === 'undefined') return

    // Detect screen size
    this.screenSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    // Detect device pixel ratio
    this.devicePixelRatio = window.devicePixelRatio || 1
    
    // Handle NaN case for devicePixelRatio
    if (isNaN(this.devicePixelRatio)) {
      this.devicePixelRatio = 1
    }

    // Detect orientation
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'

    // Detect mobile/tablet based on screen size and user agent
    const userAgent = navigator.userAgent.toLowerCase()
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'blackberry', 'windows phone']
    const tabletKeywords = ['ipad', 'tablet', 'kindle', 'playbook', 'silk']

    this.isMobile = this.screenSize.width <= 768 || 
                   mobileKeywords.some(keyword => userAgent.includes(keyword))
    
    this.isTablet = (this.screenSize.width > 768 && this.screenSize.width <= 1024) ||
                   tabletKeywords.some(keyword => userAgent.includes(keyword))

    // Detect touch capability
    // Check for touch events and touch points
    const hasTouchEvents = 'ontouchstart' in window
    const hasTouchPoints = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
    
    // Check user agent for known touch devices as fallback
    const touchDeviceKeywords = ['iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows phone', 'mobile']
    const isTouchDeviceByUserAgent = touchDeviceKeywords.some(keyword => userAgent.includes(keyword))
    
    this.isTouchDevice = hasTouchEvents || hasTouchPoints || isTouchDeviceByUserAgent
  }

  /**
   * Detect network connection type
   */
  detectConnection() {
    if (typeof navigator !== 'undefined' && navigator.connection) {
      const connection = navigator.connection
      this.connectionType = connection.effectiveType || connection.type || 'unknown'
    }
  }

  /**
   * Set up event listeners for device changes
   */
  setupEventListeners() {
    if (typeof window === 'undefined') return

    // Listen for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.detectDevice()
        this.applyMobileOptimizations()
        this.notifyListeners()
      }, 100) // Small delay to ensure dimensions are updated
    })

    // Listen for resize events
    window.addEventListener('resize', () => {
      this.detectDevice()
      this.applyMobileOptimizations()
      this.notifyListeners()
    })

    // Listen for connection changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', () => {
        this.detectConnection()
        this.applyMobileOptimizations()
        this.notifyListeners()
      })
    }
  }

  /**
   * Apply mobile-specific optimizations
   */
  applyMobileOptimizations() {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (this.isMobile) {
      root.classList.add('mobile-device')
      
      // Set mobile-specific CSS custom properties
      root.style.setProperty('--mobile-animation-duration', this.getMobileAnimationDuration())
      root.style.setProperty('--mobile-particle-count', this.getMobileParticleCount().toString())
      root.style.setProperty('--mobile-blur-intensity', this.getMobileBlurIntensity())
      root.style.setProperty('--mobile-touch-target-size', '44px')
      root.style.setProperty('--mobile-scroll-behavior', this.getMobileScrollBehavior())
      
    } else {
      root.classList.remove('mobile-device')
      
      // Remove mobile-specific properties
      root.style.removeProperty('--mobile-animation-duration')
      root.style.removeProperty('--mobile-particle-count')
      root.style.removeProperty('--mobile-blur-intensity')
      root.style.removeProperty('--mobile-touch-target-size')
      root.style.removeProperty('--mobile-scroll-behavior')
    }

    if (this.isTablet) {
      root.classList.add('tablet-device')
    } else {
      root.classList.remove('tablet-device')
    }

    if (this.isTouchDevice) {
      root.classList.add('touch-device')
    } else {
      root.classList.remove('touch-device')
    }

    // Apply connection-based optimizations
    if (this.connectionType === 'slow-2g' || this.connectionType === '2g') {
      root.classList.add('slow-connection')
    } else {
      root.classList.remove('slow-connection')
    }
  }

  /**
   * Get mobile-specific animation configuration
   * @returns {Object} Mobile animation configuration
   */
  getMobileAnimationConfig() {
    const baseConfig = {
      duration: this.getMobileAnimationDuration(),
      particleCount: this.getMobileParticleCount(),
      blurIntensity: this.getMobileBlurIntensity(),
      enableGPUAcceleration: true,
      enableParallax: !this.isMobile, // Disable parallax on mobile
      enableParticles: this.connectionType !== 'slow-2g' && this.connectionType !== '2g',
      maxConcurrentAnimations: this.isMobile ? 3 : 10
    }

    // Adjust based on device pixel ratio
    if (this.devicePixelRatio > 2) {
      baseConfig.particleCount = Math.floor(baseConfig.particleCount * 0.7)
      baseConfig.blurIntensity = Math.floor(parseInt(baseConfig.blurIntensity) * 0.8) + 'px'
    }

    return baseConfig
  }

  /**
   * Get mobile-specific animation duration
   * @returns {string} Animation duration
   */
  getMobileAnimationDuration() {
    if (this.connectionType === 'slow-2g' || this.connectionType === '2g') {
      return '0.2s'
    }
    return this.isMobile ? '0.4s' : '0.6s'
  }

  /**
   * Get mobile-specific particle count
   * @returns {number} Particle count
   */
  getMobileParticleCount() {
    if (this.connectionType === 'slow-2g' || this.connectionType === '2g') {
      return 0
    }
    
    if (this.isMobile) {
      return this.devicePixelRatio > 2 ? 30 : 50
    }
    
    if (this.isTablet) {
      return 75
    }
    
    return 100
  }

  /**
   * Get mobile-specific blur intensity
   * @returns {string} Blur intensity
   */
  getMobileBlurIntensity() {
    if (this.isMobile) {
      return this.devicePixelRatio > 2 ? '8px' : '12px'
    }
    return '16px'
  }

  /**
   * Get mobile scroll behavior
   * @returns {string} Scroll behavior
   */
  getMobileScrollBehavior() {
    // Use auto scroll on mobile for better performance
    return this.isMobile ? 'auto' : 'smooth'
  }

  /**
   * Get touch-friendly interaction configuration
   * @returns {Object} Touch interaction configuration
   */
  getTouchInteractionConfig() {
    return {
      minTouchTargetSize: 44, // iOS HIG recommendation
      touchDelay: this.isMobile ? 300 : 0, // Delay for touch events
      enableHoverEffects: !this.isTouchDevice,
      enableMagneticEffects: !this.isMobile,
      swipeThreshold: 50,
      tapThreshold: 10,
      longPressDelay: 500,
      enableTouchFeedback: this.isTouchDevice,
      enableHapticFeedback: 'vibrate' in navigator
    }
  }

  /**
   * Get responsive animation scaling
   * @returns {Object} Responsive scaling configuration
   */
  getResponsiveAnimationScaling() {
    const baseScale = 1
    
    if (this.isMobile) {
      return {
        scale: this.screenSize.width < 375 ? 0.8 : 0.9,
        translateScale: 0.7,
        rotateScale: 0.5,
        opacityTransitions: true,
        transformTransitions: false
      }
    }
    
    if (this.isTablet) {
      return {
        scale: 0.95,
        translateScale: 0.85,
        rotateScale: 0.75,
        opacityTransitions: true,
        transformTransitions: true
      }
    }
    
    return {
      scale: baseScale,
      translateScale: baseScale,
      rotateScale: baseScale,
      opacityTransitions: true,
      transformTransitions: true
    }
  }

  /**
   * Check if device is mobile
   * @returns {boolean} Whether device is mobile
   */
  getIsMobile() {
    return this.isMobile
  }

  /**
   * Check if device is tablet
   * @returns {boolean} Whether device is tablet
   */
  getIsTablet() {
    return this.isTablet
  }

  /**
   * Check if device supports touch
   * @returns {boolean} Whether device supports touch
   */
  getIsTouchDevice() {
    return this.isTouchDevice
  }

  /**
   * Get current device information
   * @returns {Object} Device information
   */
  getDeviceInfo() {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isTouchDevice: this.isTouchDevice,
      devicePixelRatio: this.devicePixelRatio,
      screenSize: { ...this.screenSize },
      orientation: this.orientation,
      connectionType: this.connectionType
    }
  }

  /**
   * Add listener for device changes
   * @param {Function} callback - Callback function
   */
  addListener(callback) {
    this.listeners.add(callback)
  }

  /**
   * Remove listener for device changes
   * @param {Function} callback - Callback function
   */
  removeListener(callback) {
    this.listeners.delete(callback)
  }

  /**
   * Notify all listeners of device changes
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.getDeviceInfo())
      } catch (error) {
        console.error('Error in mobile optimization listener:', error)
      }
    })
  }

  /**
   * Create touch-friendly event handlers
   * @param {Object} options - Event handler options
   * @returns {Object} Touch event handlers
   */
  createTouchHandlers(options = {}) {
    const config = this.getTouchInteractionConfig()
    
    return {
      onTouchStart: (e) => {
        if (config.enableTouchFeedback) {
          e.target.classList.add('touch-active')
        }
        
        if (config.enableHapticFeedback && options.haptic) {
          navigator.vibrate && navigator.vibrate(10)
        }
        
        if (options.onTouchStart) {
          options.onTouchStart(e)
        }
      },
      
      onTouchEnd: (e) => {
        if (config.enableTouchFeedback) {
          setTimeout(() => {
            e.target.classList.remove('touch-active')
          }, 150)
        }
        
        if (options.onTouchEnd) {
          options.onTouchEnd(e)
        }
      },
      
      onTouchMove: (e) => {
        if (options.onTouchMove) {
          options.onTouchMove(e)
        }
      },
      
      onClick: (e) => {
        // Add touch delay for mobile devices
        if (config.touchDelay > 0) {
          e.preventDefault()
          setTimeout(() => {
            if (options.onClick) {
              options.onClick(e)
            }
          }, config.touchDelay)
        } else if (options.onClick) {
          options.onClick(e)
        }
      }
    }
  }

  /**
   * Cleanup method
   */
  destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('orientationchange', this.detectDevice)
      window.removeEventListener('resize', this.detectDevice)
    }
    
    if (navigator.connection) {
      navigator.connection.removeEventListener('change', this.detectConnection)
    }
    
    this.listeners.clear()
  }
}

// Create singleton instance
const mobileOptimizationManager = new MobileOptimizationManager()

export default mobileOptimizationManager
export { MobileOptimizationManager }