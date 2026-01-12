/**
 * Animation Fallbacks Utility
 * Provides graceful degradation for animations based on browser capabilities
 */

import browserCompatibilityManager from './BrowserCompatibilityManager.js'

class AnimationFallbacks {
  constructor() {
    this.fallbackStrategies = new Map()
    this.setupFallbackStrategies()
  }

  /**
   * Setup fallback strategies for different animation types
   */
  setupFallbackStrategies() {
    // GSAP Animation Fallbacks
    this.fallbackStrategies.set('gsap-timeline', {
      check: () => browserCompatibilityManager.isSupported('css-animations'),
      fallback: this.createCSSAnimationFallback
    })

    // WebGL Particle System Fallbacks
    this.fallbackStrategies.set('webgl-particles', {
      check: () => browserCompatibilityManager.isSupported('webgl'),
      fallback: this.createCSSParticleFallback
    })

    // 3D Transform Fallbacks
    this.fallbackStrategies.set('3d-transforms', {
      check: () => browserCompatibilityManager.isSupported('css-transforms'),
      fallback: this.create2DTransformFallback
    })

    // Backdrop Filter Fallbacks
    this.fallbackStrategies.set('backdrop-filter', {
      check: () => browserCompatibilityManager.isSupported('css-backdrop-filter'),
      fallback: this.createSolidBackgroundFallback
    })

    // Intersection Observer Fallbacks
    this.fallbackStrategies.set('intersection-observer', {
      check: () => browserCompatibilityManager.isSupported('intersection-observer'),
      fallback: this.createScrollListenerFallback
    })

    // Complex Gradient Fallbacks
    this.fallbackStrategies.set('animated-gradients', {
      check: () => browserCompatibilityManager.isSupported('css-gradients') && 
                   browserCompatibilityManager.isSupported('css-animations'),
      fallback: this.createStaticGradientFallback
    })

    // Custom Properties Fallbacks
    this.fallbackStrategies.set('css-custom-properties', {
      check: () => browserCompatibilityManager.isSupported('css-custom-properties'),
      fallback: this.createHardcodedValuesFallback
    })
  }

  /**
   * Get appropriate animation implementation based on browser capabilities
   * @param {string} animationType - Type of animation
   * @param {Object} options - Animation options
   * @returns {Object} Animation implementation
   */
  getAnimationImplementation(animationType, options = {}) {
    const strategy = this.fallbackStrategies.get(animationType)
    
    if (!strategy) {
      console.warn(`No fallback strategy found for animation type: ${animationType}`)
      return null
    }

    if (strategy.check()) {
      // Browser supports the feature, return modern implementation
      return this.getModernImplementation(animationType, options)
    } else {
      // Browser doesn't support the feature, return fallback
      return strategy.fallback(options)
    }
  }

  /**
   * Get modern implementation for supported browsers
   * @param {string} animationType - Type of animation
   * @param {Object} options - Animation options
   * @returns {Object} Modern animation implementation
   */
  getModernImplementation(animationType, options) {
    const implementations = {
      'gsap-timeline': () => ({
        type: 'gsap',
        create: (element, config) => {
          // Return GSAP timeline configuration
          return {
            element,
            config,
            library: 'gsap'
          }
        }
      }),

      'webgl-particles': () => ({
        type: 'webgl',
        create: (canvas, config) => {
          return {
            canvas,
            config,
            renderer: 'webgl'
          }
        }
      }),

      '3d-transforms': () => ({
        type: 'css-3d',
        create: (element, config) => {
          return {
            element,
            config,
            transforms: '3d'
          }
        }
      }),

      'backdrop-filter': () => ({
        type: 'backdrop-filter',
        create: (element, config) => {
          return {
            element,
            config,
            filter: 'backdrop'
          }
        }
      }),

      'intersection-observer': () => ({
        type: 'intersection-observer',
        create: (callback, config) => {
          return {
            callback,
            config,
            observer: 'native'
          }
        }
      }),

      'animated-gradients': () => ({
        type: 'css-gradients',
        create: (element, config) => {
          return {
            element,
            config,
            gradients: 'animated'
          }
        }
      }),

      'css-custom-properties': () => ({
        type: 'css-variables',
        create: (element, config) => {
          return {
            element,
            config,
            properties: 'custom'
          }
        }
      })
    }

    const implementation = implementations[animationType]
    return implementation ? implementation() : null
  }

  /**
   * Create CSS animation fallback for GSAP
   * @param {Object} options - Animation options
   * @returns {Object} CSS animation fallback
   */
  createCSSAnimationFallback = (options) => {
    return {
      type: 'css-fallback',
      create: (element, config) => {
        // Apply CSS classes for simple animations
        const animationClass = this.getCSSAnimationClass(config.type || 'fadeIn')
        
        return {
          element,
          config: {
            ...config,
            className: animationClass,
            duration: config.duration || '0.6s',
            easing: config.easing || 'ease-out'
          },
          apply: () => {
            if (element && element.classList) {
              element.classList.add(animationClass)
            }
          },
          cleanup: () => {
            if (element && element.classList) {
              element.classList.remove(animationClass)
            }
          }
        }
      }
    }
  }

  /**
   * Create CSS particle fallback for WebGL particles
   * @param {Object} options - Particle options
   * @returns {Object} CSS particle fallback
   */
  createCSSParticleFallback = (options) => {
    return {
      type: 'css-particles',
      create: (container, config) => {
        return {
          container,
          config,
          particles: [],
          init: () => {
            // Create simple CSS-based floating elements
            const particleCount = Math.min(config.particleCount || 10, 5) // Limit for performance
            
            for (let i = 0; i < particleCount; i++) {
              const particle = document.createElement('div')
              particle.className = 'css-particle'
              particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(124, 58, 237, 0.6);
                border-radius: 50%;
                animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
              `
              
              if (container) {
                container.appendChild(particle)
              }
            }
          },
          cleanup: () => {
            if (container) {
              const particles = container.querySelectorAll('.css-particle')
              particles.forEach(particle => particle.remove())
            }
          }
        }
      }
    }
  }

  /**
   * Create 2D transform fallback for 3D transforms
   * @param {Object} options - Transform options
   * @returns {Object} 2D transform fallback
   */
  create2DTransformFallback = (options) => {
    return {
      type: '2d-transforms',
      create: (element, config) => {
        return {
          element,
          config,
          apply: () => {
            if (!element || !element.style) return
            
            // Convert 3D transforms to 2D equivalents
            const transforms = []
            
            if (config.x || config.y) {
              transforms.push(`translate(${config.x || 0}px, ${config.y || 0}px)`)
            }
            
            if (config.scale) {
              transforms.push(`scale(${config.scale})`)
            }
            
            if (config.rotation) {
              transforms.push(`rotate(${config.rotation}deg)`)
            }
            
            element.style.transform = transforms.join(' ')
          }
        }
      }
    }
  }

  /**
   * Create solid background fallback for backdrop filter
   * @param {Object} options - Backdrop filter options
   * @returns {Object} Solid background fallback
   */
  createSolidBackgroundFallback = (options) => {
    return {
      type: 'solid-background',
      create: (element, config) => {
        return {
          element,
          config,
          apply: () => {
            if (!element || !element.style) return
            
            // Replace backdrop filter with solid background
            const opacity = config.opacity || 0.9
            const color = config.backgroundColor || 'rgba(26, 27, 58, ' + opacity + ')'
            
            element.style.backgroundColor = color
            element.style.backdropFilter = 'none'
            element.style.webkitBackdropFilter = 'none'
          }
        }
      }
    }
  }

  /**
   * Create scroll listener fallback for Intersection Observer
   * @param {Object} options - Observer options
   * @returns {Object} Scroll listener fallback
   */
  createScrollListenerFallback = (options) => {
    return {
      type: 'scroll-listener',
      create: (callback, config) => {
        let isListening = false
        let targets = new Set()
        
        const checkVisibility = () => {
          targets.forEach(target => {
            const rect = target.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0
            
            callback([{
              target,
              isIntersecting: isVisible,
              intersectionRatio: isVisible ? 1 : 0
            }])
          })
        }
        
        const throttledCheck = this.throttle(checkVisibility, 100)
        
        return {
          observe: (target) => {
            targets.add(target)
            if (!isListening) {
              window.addEventListener('scroll', throttledCheck)
              window.addEventListener('resize', throttledCheck)
              isListening = true
            }
            // Initial check
            setTimeout(throttledCheck, 0)
          },
          unobserve: (target) => {
            targets.delete(target)
            if (targets.size === 0 && isListening) {
              window.removeEventListener('scroll', throttledCheck)
              window.removeEventListener('resize', throttledCheck)
              isListening = false
            }
          },
          disconnect: () => {
            targets.clear()
            if (isListening) {
              window.removeEventListener('scroll', throttledCheck)
              window.removeEventListener('resize', throttledCheck)
              isListening = false
            }
          }
        }
      }
    }
  }

  /**
   * Create static gradient fallback for animated gradients
   * @param {Object} options - Gradient options
   * @returns {Object} Static gradient fallback
   */
  createStaticGradientFallback = (options) => {
    return {
      type: 'static-gradient',
      create: (element, config) => {
        return {
          element,
          config,
          apply: () => {
            if (!element || !element.style) return
            
            // Use static gradient instead of animated one
            const gradient = config.gradient || 'linear-gradient(45deg, #7C3AED, #8B5CF6)'
            element.style.background = gradient
            element.style.animation = 'none'
          }
        }
      }
    }
  }

  /**
   * Create hardcoded values fallback for CSS custom properties
   * @param {Object} options - Custom properties options
   * @returns {Object} Hardcoded values fallback
   */
  createHardcodedValuesFallback = (options) => {
    return {
      type: 'hardcoded-values',
      create: (element, config) => {
        const colorMap = {
          '--color-primary': '#7C3AED',
          '--color-secondary': '#8B5CF6',
          '--color-background': '#0F0F23',
          '--color-surface': '#1A1B3A',
          '--color-accent': '#F59E0B',
          '--color-text-primary': '#FFFFFF',
          '--color-text-secondary': '#A1A1AA'
        }
        
        return {
          element,
          config,
          apply: () => {
            if (!element || !element.style) return
            
            // Replace CSS custom properties with hardcoded values
            Object.entries(colorMap).forEach(([property, value]) => {
              if (config.properties && config.properties[property]) {
                element.style.setProperty(property.replace('--', ''), value)
              }
            })
          }
        }
      }
    }
  }

  /**
   * Get CSS animation class name for fallback animations
   * @param {string} animationType - Type of animation
   * @returns {string} CSS class name
   */
  getCSSAnimationClass(animationType) {
    const classMap = {
      fadeIn: 'simple-fade-in',
      slideUp: 'simple-slide-up',
      scaleIn: 'simple-scale-in',
      glow: 'simple-glow',
      gradient: 'simple-gradient'
    }
    
    return classMap[animationType] || 'simple-fade-in'
  }

  /**
   * Throttle function for performance
   * @param {Function} func - Function to throttle
   * @param {number} limit - Throttle limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  /**
   * Check if animation should be simplified for performance
   * @param {string} animationType - Type of animation
   * @returns {boolean} Whether animation should be simplified
   */
  shouldSimplifyAnimation(animationType) {
    const browserInfo = browserCompatibilityManager.getBrowserInfo()
    const isOldBrowser = browserCompatibilityManager.isOldBrowser()
    
    // Simplify animations for old browsers or mobile devices
    if (isOldBrowser || browserInfo.isMobile) {
      return true
    }
    
    // Check performance metrics
    const performanceMetrics = browserCompatibilityManager.getPerformanceMetrics?.() || {}
    if (performanceMetrics.frameRate && performanceMetrics.frameRate < 30) {
      return true
    }
    
    return false
  }

  /**
   * Get performance-appropriate animation configuration
   * @param {string} animationType - Type of animation
   * @param {Object} baseConfig - Base animation configuration
   * @returns {Object} Performance-optimized configuration
   */
  getPerformanceOptimizedConfig(animationType, baseConfig) {
    if (this.shouldSimplifyAnimation(animationType)) {
      return {
        ...baseConfig,
        duration: Math.min(baseConfig.duration || 0.6, 0.3),
        complexity: 'low',
        particleCount: Math.min(baseConfig.particleCount || 50, 10),
        quality: 'low'
      }
    }
    
    return baseConfig
  }
}

// Create singleton instance
const animationFallbacks = new AnimationFallbacks()

export default animationFallbacks
export { AnimationFallbacks }