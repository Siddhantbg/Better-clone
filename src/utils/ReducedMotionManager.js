/**
 * Reduced Motion Manager
 * Handles accessibility preferences for users who prefer reduced motion
 */

class ReducedMotionManager {
  constructor() {
    this.isReducedMotion = false
    this.mediaQuery = null
    this.listeners = new Set()
    this.init()
  }

  /**
   * Initialize the reduced motion manager
   */
  init() {
    // Check for prefers-reduced-motion media query support
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      this.isReducedMotion = this.mediaQuery.matches
      
      // Listen for changes in motion preference
      this.mediaQuery.addEventListener('change', this.handleMotionPreferenceChange.bind(this))
      
      // Apply initial state
      this.applyReducedMotionStyles()
    }
  }

  /**
   * Handle changes in motion preference
   * @param {MediaQueryListEvent} event - Media query change event
   */
  handleMotionPreferenceChange(event) {
    this.isReducedMotion = event.matches
    this.applyReducedMotionStyles()
    this.notifyListeners()
  }

  /**
   * Get current reduced motion preference
   * @returns {boolean} Whether reduced motion is preferred
   */
  getReducedMotionPreference() {
    return this.isReducedMotion
  }

  /**
   * Manually set reduced motion preference (for testing or user override)
   * @param {boolean} enabled - Whether to enable reduced motion
   */
  setReducedMotion(enabled) {
    this.isReducedMotion = enabled
    this.applyReducedMotionStyles()
    this.notifyListeners()
  }

  /**
   * Apply reduced motion styles to the document
   */
  applyReducedMotionStyles() {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (this.isReducedMotion) {
      // Add reduced motion class to root
      root.classList.add('reduced-motion')
      
      // Apply CSS custom properties for reduced motion
      root.style.setProperty('--animation-duration-fast', '0.01ms')
      root.style.setProperty('--animation-duration-medium', '0.01ms')
      root.style.setProperty('--animation-duration-slow', '0.01ms')
      root.style.setProperty('--transition-duration', '0.01ms')
      root.style.setProperty('--scroll-behavior', 'auto')
      
      // Disable transform animations
      root.style.setProperty('--transform-scale', '1')
      root.style.setProperty('--transform-translate', '0')
      root.style.setProperty('--transform-rotate', '0deg')
      
      // Reduce opacity transitions
      root.style.setProperty('--opacity-transition', 'opacity 0.01ms')
      
    } else {
      // Remove reduced motion class
      root.classList.remove('reduced-motion')
      
      // Restore normal animation durations
      root.style.setProperty('--animation-duration-fast', '0.3s')
      root.style.setProperty('--animation-duration-medium', '0.6s')
      root.style.setProperty('--animation-duration-slow', '1.2s')
      root.style.setProperty('--transition-duration', '0.3s')
      root.style.setProperty('--scroll-behavior', 'smooth')
      
      // Restore transform animations
      root.style.removeProperty('--transform-scale')
      root.style.removeProperty('--transform-translate')
      root.style.removeProperty('--transform-rotate')
      
      // Restore opacity transitions
      root.style.setProperty('--opacity-transition', 'opacity 0.3s ease')
    }
  }

  /**
   * Add a listener for motion preference changes
   * @param {Function} callback - Callback function to execute on change
   */
  addListener(callback) {
    this.listeners.add(callback)
  }

  /**
   * Remove a listener for motion preference changes
   * @param {Function} callback - Callback function to remove
   */
  removeListener(callback) {
    this.listeners.delete(callback)
  }

  /**
   * Notify all listeners of motion preference change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.isReducedMotion)
      } catch (error) {
        console.error('Error in reduced motion listener:', error)
      }
    })
  }

  /**
   * Get animation configuration based on motion preference
   * @returns {Object} Animation configuration object
   */
  getAnimationConfig() {
    if (this.isReducedMotion) {
      return {
        duration: 0.01,
        ease: 'none',
        scale: 1,
        opacity: 1,
        transform: 'none',
        transition: 'none'
      }
    }

    return {
      duration: 0.6,
      ease: 'power2.out',
      scale: null,
      opacity: null,
      transform: null,
      transition: null
    }
  }

  /**
   * Create accessibility-friendly navigation options
   * @returns {Object} Navigation configuration
   */
  getNavigationConfig() {
    return {
      scrollBehavior: this.isReducedMotion ? 'auto' : 'smooth',
      focusIndicator: this.isReducedMotion ? 'static' : 'animated',
      pageTransitions: this.isReducedMotion ? false : true,
      hoverEffects: this.isReducedMotion ? false : true,
      parallaxEffects: this.isReducedMotion ? false : true
    }
  }

  /**
   * Get simplified animation alternatives for reduced motion
   * @param {string} animationType - Type of animation to simplify
   * @returns {Object} Simplified animation configuration
   */
  getSimplifiedAnimation(animationType) {
    if (!this.isReducedMotion) {
      return null // Use normal animations
    }

    const simplifiedAnimations = {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      slideUp: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      scaleIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      hover: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      pageTransition: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      scroll: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      parallax: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      particle: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      continuous: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      },
      infinite: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.01 }
      }
    }

    return simplifiedAnimations[animationType] || {
      from: { opacity: 0 },
      to: { opacity: 1, duration: 0.01 }
    }
  }

  /**
   * Check if a specific animation should be disabled
   * @param {string} animationType - Type of animation to check
   * @returns {boolean} Whether the animation should be disabled
   */
  shouldDisableAnimation(animationType) {
    if (!this.isReducedMotion) return false

    const disabledAnimations = [
      'parallax',
      'particle',
      'continuous',
      'infinite',
      'bounce',
      'elastic',
      'shake',
      'pulse',
      'rotate',
      'scale',
      'transform3d'
    ]

    return disabledAnimations.includes(animationType)
  }

  /**
   * Cleanup method
   */
  destroy() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', this.handleMotionPreferenceChange.bind(this))
    }
    this.listeners.clear()
  }
}

// Create singleton instance
const reducedMotionManager = new ReducedMotionManager()

export default reducedMotionManager
export { ReducedMotionManager }