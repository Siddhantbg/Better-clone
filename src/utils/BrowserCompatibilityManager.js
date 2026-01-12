/**
 * Browser Compatibility Manager
 * Handles feature detection, fallbacks, and graceful degradation for older browsers
 */

class BrowserCompatibilityManager {
  constructor() {
    this.features = new Map()
    this.fallbacks = new Map()
    this.isInitialized = false
    this.browserInfo = null
    
    this.init()
  }

  /**
   * Initialize the compatibility manager
   */
  init() {
    if (this.isInitialized) return
    
    this.detectBrowserInfo()
    this.detectFeatures()
    this.applyFallbacks()
    this.setupPolyfills()
    
    this.isInitialized = true
  }

  /**
   * Detect browser information
   */
  detectBrowserInfo() {
    if (typeof navigator === 'undefined') return

    const userAgent = navigator.userAgent.toLowerCase()
    
    this.browserInfo = {
      isIE: /msie|trident/.test(userAgent),
      isEdge: /edge/.test(userAgent),
      isChrome: /chrome/.test(userAgent) && !/edge/.test(userAgent),
      isFirefox: /firefox/.test(userAgent),
      isSafari: /safari/.test(userAgent) && !/chrome/.test(userAgent),
      isOpera: /opera|opr/.test(userAgent),
      isMobile: /mobile|android|iphone|ipad|ipod/.test(userAgent),
      version: this.extractBrowserVersion(userAgent)
    }
  }

  /**
   * Extract browser version from user agent
   * @param {string} userAgent - Browser user agent string
   * @returns {number} Browser version number
   */
  extractBrowserVersion(userAgent) {
    let version = 0
    
    if (this.browserInfo?.isChrome) {
      const match = userAgent.match(/chrome\/(\d+)/)
      version = match ? parseInt(match[1]) : 0
    } else if (this.browserInfo?.isFirefox) {
      const match = userAgent.match(/firefox\/(\d+)/)
      version = match ? parseInt(match[1]) : 0
    } else if (this.browserInfo?.isSafari) {
      const match = userAgent.match(/version\/(\d+)/)
      version = match ? parseInt(match[1]) : 0
    } else if (this.browserInfo?.isEdge) {
      const match = userAgent.match(/edge\/(\d+)/)
      version = match ? parseInt(match[1]) : 0
    }
    
    return version
  }

  /**
   * Detect browser feature support
   */
  detectFeatures() {
    if (typeof window === 'undefined') return

    // CSS Features
    this.features.set('css-grid', this.supportsCSS('display', 'grid'))
    this.features.set('css-flexbox', this.supportsCSS('display', 'flex'))
    this.features.set('css-transforms', this.supportsCSS('transform', 'translateX(1px)'))
    this.features.set('css-transitions', this.supportsCSS('transition', 'opacity 1s'))
    this.features.set('css-animations', this.supportsCSS('animation', 'none'))
    this.features.set('css-backdrop-filter', this.supportsCSS('backdrop-filter', 'blur(10px)'))
    this.features.set('css-clip-path', this.supportsCSS('clip-path', 'circle(50%)'))
    this.features.set('css-custom-properties', this.supportsCSSCustomProperties())
    this.features.set('css-gradients', this.supportsCSS('background', 'linear-gradient(red, blue)'))
    this.features.set('css-filters', this.supportsCSS('filter', 'blur(1px)'))

    // JavaScript Features
    this.features.set('intersection-observer', 'IntersectionObserver' in window)
    this.features.set('resize-observer', 'ResizeObserver' in window)
    this.features.set('mutation-observer', 'MutationObserver' in window)
    this.features.set('request-animation-frame', 'requestAnimationFrame' in window)
    this.features.set('web-animations', 'animate' in document.createElement('div'))
    this.features.set('webgl', this.supportsWebGL())
    this.features.set('webgl2', this.supportsWebGL2())
    this.features.set('canvas', 'getContext' in document.createElement('canvas'))

    // Modern JavaScript Features
    this.features.set('es6-modules', this.supportsES6Modules())
    this.features.set('es6-classes', this.supportsES6Classes())
    this.features.set('es6-arrow-functions', this.supportsArrowFunctions())
    this.features.set('promises', 'Promise' in window)
    this.features.set('fetch', 'fetch' in window)

    // Performance Features
    this.features.set('performance-observer', 'PerformanceObserver' in window)
    this.features.set('performance-memory', 'memory' in (window.performance || {}))

    // Touch and Input Features
    this.features.set('touch-events', 'ontouchstart' in window)
    this.features.set('pointer-events', 'onpointerdown' in window)
    this.features.set('device-orientation', 'DeviceOrientationEvent' in window)
  }

  /**
   * Check if CSS property/value is supported
   * @param {string} property - CSS property name
   * @param {string} value - CSS property value
   * @returns {boolean} Whether the CSS feature is supported
   */
  supportsCSS(property, value) {
    if (typeof document === 'undefined') return false
    
    const element = document.createElement('div')
    element.style[property] = value
    return element.style[property] === value
  }

  /**
   * Check if CSS custom properties are supported
   * @returns {boolean} Whether CSS custom properties are supported
   */
  supportsCSSCustomProperties() {
    if (typeof window === 'undefined') return false
    
    return window.CSS && window.CSS.supports && window.CSS.supports('color', 'var(--test)')
  }

  /**
   * Check WebGL support
   * @returns {boolean} Whether WebGL is supported
   */
  supportsWebGL() {
    if (typeof document === 'undefined') return false
    
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch (e) {
      return false
    }
  }

  /**
   * Check WebGL2 support
   * @returns {boolean} Whether WebGL2 is supported
   */
  supportsWebGL2() {
    if (typeof document === 'undefined') return false
    
    try {
      const canvas = document.createElement('canvas')
      return !!canvas.getContext('webgl2')
    } catch (e) {
      return false
    }
  }

  /**
   * Check ES6 modules support
   * @returns {boolean} Whether ES6 modules are supported
   */
  supportsES6Modules() {
    try {
      return typeof Symbol !== 'undefined' && typeof Symbol.iterator !== 'undefined'
    } catch (e) {
      return false
    }
  }

  /**
   * Check ES6 classes support
   * @returns {boolean} Whether ES6 classes are supported
   */
  supportsES6Classes() {
    try {
      eval('class TestClass {}')
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Check arrow functions support
   * @returns {boolean} Whether arrow functions are supported
   */
  supportsArrowFunctions() {
    try {
      eval('() => {}')
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * Apply fallbacks based on feature detection
   */
  applyFallbacks() {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Apply CSS class for feature detection
    root.classList.add('js-enabled')

    // CSS Grid fallback
    if (!this.features.get('css-grid')) {
      root.classList.add('no-css-grid')
      this.fallbacks.set('css-grid', 'flexbox')
    }

    // Flexbox fallback
    if (!this.features.get('css-flexbox')) {
      root.classList.add('no-flexbox')
      this.fallbacks.set('css-flexbox', 'float')
    }

    // CSS Transforms fallback
    if (!this.features.get('css-transforms')) {
      root.classList.add('no-transforms')
      this.fallbacks.set('css-transforms', 'position')
    }

    // CSS Transitions fallback
    if (!this.features.get('css-transitions')) {
      root.classList.add('no-transitions')
      this.fallbacks.set('css-transitions', 'instant')
    }

    // CSS Animations fallback
    if (!this.features.get('css-animations')) {
      root.classList.add('no-animations')
      this.fallbacks.set('css-animations', 'static')
    }

    // Backdrop filter fallback
    if (!this.features.get('css-backdrop-filter')) {
      root.classList.add('no-backdrop-filter')
      this.fallbacks.set('css-backdrop-filter', 'solid-background')
    }

    // Custom properties fallback
    if (!this.features.get('css-custom-properties')) {
      root.classList.add('no-custom-properties')
      this.fallbacks.set('css-custom-properties', 'hardcoded-values')
      this.applyHardcodedColors()
    }

    // WebGL fallback
    if (!this.features.get('webgl')) {
      root.classList.add('no-webgl')
      this.fallbacks.set('webgl', 'canvas-2d')
    }

    // Intersection Observer fallback
    if (!this.features.get('intersection-observer')) {
      root.classList.add('no-intersection-observer')
      this.fallbacks.set('intersection-observer', 'scroll-listener')
    }

    // Old browser detection
    if (this.isOldBrowser()) {
      root.classList.add('old-browser')
      this.applyOldBrowserFallbacks()
    }
  }

  /**
   * Apply hardcoded colors for browsers without CSS custom properties
   */
  applyHardcodedColors() {
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.textContent = `
      .no-custom-properties .gradient-hero-primary {
        background: radial-gradient(circle at 50% 50%, #7C3AED 0%, #8B5CF6 50%, #0F0F23 100%);
      }
      .no-custom-properties .gradient-button-primary {
        background: linear-gradient(45deg, #7C3AED, #8B5CF6);
      }
      .no-custom-properties .gradient-text-primary {
        background: linear-gradient(90deg, #7C3AED, #8B5CF6);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .no-custom-properties .glass-card {
        background: rgba(26, 27, 58, 0.8);
        border: 1px solid rgba(124, 58, 237, 0.2);
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Setup polyfills for missing features
   */
  setupPolyfills() {
    // Intersection Observer polyfill
    if (!this.features.get('intersection-observer')) {
      this.loadIntersectionObserverPolyfill()
    }

    // Request Animation Frame polyfill
    if (!this.features.get('request-animation-frame')) {
      this.setupRequestAnimationFramePolyfill()
    }

    // Fetch polyfill
    if (!this.features.get('fetch')) {
      this.setupFetchPolyfill()
    }
  }

  /**
   * Load Intersection Observer polyfill
   */
  loadIntersectionObserverPolyfill() {
    // Simple scroll-based fallback for Intersection Observer
    window.IntersectionObserver = class IntersectionObserverPolyfill {
      constructor(callback, options = {}) {
        this.callback = callback
        this.options = options
        this.targets = new Set()
        this.isObserving = false
      }

      observe(target) {
        this.targets.add(target)
        if (!this.isObserving) {
          this.startObserving()
        }
      }

      unobserve(target) {
        this.targets.delete(target)
        if (this.targets.size === 0) {
          this.stopObserving()
        }
      }

      disconnect() {
        this.targets.clear()
        this.stopObserving()
      }

      startObserving() {
        this.isObserving = true
        this.checkIntersections()
      }

      stopObserving() {
        this.isObserving = false
      }

      checkIntersections() {
        if (!this.isObserving) return

        const entries = []
        this.targets.forEach(target => {
          const rect = target.getBoundingClientRect()
          const isIntersecting = rect.top < window.innerHeight && rect.bottom > 0
          
          entries.push({
            target,
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
            boundingClientRect: rect
          })
        })

        if (entries.length > 0) {
          this.callback(entries)
        }

        if (this.isObserving) {
          setTimeout(() => this.checkIntersections(), 100)
        }
      }
    }
  }

  /**
   * Setup Request Animation Frame polyfill
   */
  setupRequestAnimationFramePolyfill() {
    let lastTime = 0
    
    window.requestAnimationFrame = function(callback) {
      const currentTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currentTime - lastTime))
      const id = window.setTimeout(() => {
        callback(currentTime + timeToCall)
      }, timeToCall)
      lastTime = currentTime + timeToCall
      return id
    }

    window.cancelAnimationFrame = function(id) {
      clearTimeout(id)
    }
  }

  /**
   * Setup basic fetch polyfill
   */
  setupFetchPolyfill() {
    window.fetch = function(url, options = {}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(options.method || 'GET', url)
        
        if (options.headers) {
          Object.keys(options.headers).forEach(key => {
            xhr.setRequestHeader(key, options.headers[key])
          })
        }

        xhr.onload = () => {
          resolve({
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            text: () => Promise.resolve(xhr.responseText),
            json: () => Promise.resolve(JSON.parse(xhr.responseText))
          })
        }

        xhr.onerror = () => reject(new Error('Network error'))
        xhr.send(options.body)
      })
    }
  }

  /**
   * Check if browser is considered old/unsupported
   * @returns {boolean} Whether browser is old
   */
  isOldBrowser() {
    if (!this.browserInfo) return false

    const { isIE, isChrome, isFirefox, isSafari, isEdge, version } = this.browserInfo

    // IE is always considered old
    if (isIE) return true

    // Check version thresholds for modern browsers
    if (isChrome && version < 60) return true
    if (isFirefox && version < 55) return true
    if (isSafari && version < 12) return true
    if (isEdge && version < 79) return true

    return false
  }

  /**
   * Apply fallbacks for old browsers
   */
  applyOldBrowserFallbacks() {
    if (typeof document === 'undefined') return

    const style = document.createElement('style')
    style.textContent = `
      /* Old browser fallbacks */
      .old-browser .gradient-hero-animated,
      .old-browser .gradient-button-animated,
      .old-browser .gradient-text-animated {
        animation: none !important;
      }

      .old-browser .glass-card {
        background: rgba(26, 27, 58, 0.9) !important;
        backdrop-filter: none !important;
      }

      .old-browser .particle-system,
      .old-browser .animated-gradient-mesh,
      .old-browser .orb-container {
        display: none !important;
      }

      .old-browser .card-3d-hover {
        transform: none !important;
      }

      .old-browser .magnetic-button {
        transform: none !important;
      }

      .old-browser .neon-glow {
        box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3) !important;
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Get feature support status
   * @param {string} feature - Feature name to check
   * @returns {boolean} Whether feature is supported
   */
  isSupported(feature) {
    return this.features.get(feature) || false
  }

  /**
   * Get fallback for a feature
   * @param {string} feature - Feature name
   * @returns {string|null} Fallback method or null
   */
  getFallback(feature) {
    return this.fallbacks.get(feature) || null
  }

  /**
   * Get browser information
   * @returns {Object} Browser information object
   */
  getBrowserInfo() {
    return { ...this.browserInfo }
  }

  /**
   * Get all feature support status
   * @returns {Object} Feature support map
   */
  getAllFeatures() {
    const features = {}
    this.features.forEach((value, key) => {
      features[key] = value
    })
    return features
  }

  /**
   * Create animation configuration based on browser capabilities
   * @returns {Object} Animation configuration
   */
  getAnimationConfig() {
    const config = {
      useGSAP: this.isSupported('css-animations') && this.isSupported('css-transforms'),
      useWebGL: this.isSupported('webgl'),
      useBackdropFilter: this.isSupported('css-backdrop-filter'),
      useCustomProperties: this.isSupported('css-custom-properties'),
      useIntersectionObserver: this.isSupported('intersection-observer'),
      enableParticles: this.isSupported('webgl') && this.isSupported('canvas'),
      enableComplexAnimations: !this.isOldBrowser() && this.isSupported('css-animations'),
      enableTransforms: this.isSupported('css-transforms'),
      enableTransitions: this.isSupported('css-transitions')
    }

    return config
  }

  /**
   * Cleanup method
   */
  destroy() {
    this.features.clear()
    this.fallbacks.clear()
    this.isInitialized = false
  }
}

// Create singleton instance
const browserCompatibilityManager = new BrowserCompatibilityManager()

export default browserCompatibilityManager
export { BrowserCompatibilityManager }