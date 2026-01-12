import { useState, useEffect } from 'react'
import reducedMotionManager from '../utils/ReducedMotionManager.js'

/**
 * React hook for accessing reduced motion preferences
 * @returns {Object} Reduced motion state and utilities
 */
export function useReducedMotion() {
  const [isReducedMotion, setIsReducedMotion] = useState(
    reducedMotionManager.getReducedMotionPreference()
  )

  useEffect(() => {
    const handleMotionChange = (reduced) => {
      setIsReducedMotion(reduced)
    }

    // Add listener for motion preference changes
    reducedMotionManager.addListener(handleMotionChange)

    // Cleanup listener on unmount
    return () => {
      reducedMotionManager.removeListener(handleMotionChange)
    }
  }, [])

  return {
    isReducedMotion,
    animationConfig: reducedMotionManager.getAnimationConfig(),
    navigationConfig: reducedMotionManager.getNavigationConfig(),
    getSimplifiedAnimation: (type) => reducedMotionManager.getSimplifiedAnimation(type),
    shouldDisableAnimation: (type) => reducedMotionManager.shouldDisableAnimation(type)
  }
}

/**
 * Hook for conditional animation classes based on motion preference
 * @param {string} normalClass - Class to use for normal motion
 * @param {string} reducedClass - Class to use for reduced motion
 * @returns {string} Appropriate class name
 */
export function useMotionClass(normalClass, reducedClass = '') {
  const { isReducedMotion } = useReducedMotion()
  return isReducedMotion ? reducedClass : normalClass
}

/**
 * Hook for conditional animation styles based on motion preference
 * @param {Object} normalStyles - Styles to use for normal motion
 * @param {Object} reducedStyles - Styles to use for reduced motion
 * @returns {Object} Appropriate styles object
 */
export function useMotionStyles(normalStyles, reducedStyles = {}) {
  const { isReducedMotion } = useReducedMotion()
  return isReducedMotion ? { ...normalStyles, ...reducedStyles } : normalStyles
}

/**
 * Hook for accessibility-friendly navigation
 * @returns {Object} Navigation configuration
 */
export function useAccessibleNavigation() {
  const { navigationConfig } = useReducedMotion()
  
  return {
    scrollToElement: (element, options = {}) => {
      if (navigationConfig.scrollBehavior === 'auto') {
        element.scrollIntoView({ behavior: 'auto', ...options })
      } else {
        element.scrollIntoView({ behavior: 'smooth', ...options })
      }
    },
    
    focusElement: (element, options = {}) => {
      element.focus(options)
      
      // Add static focus indicator for reduced motion
      if (navigationConfig.focusIndicator === 'static') {
        element.classList.add('focus-ring')
        setTimeout(() => element.classList.remove('focus-ring'), 100)
      }
    },
    
    shouldUsePageTransitions: () => navigationConfig.pageTransitions,
    shouldUseHoverEffects: () => navigationConfig.hoverEffects,
    shouldUseParallax: () => navigationConfig.parallaxEffects
  }
}