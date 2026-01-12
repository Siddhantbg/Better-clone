import { useState, useEffect } from 'react'
import mobileOptimizationManager from '../utils/MobileOptimizationManager.js'

/**
 * React hook for mobile optimization
 * @returns {Object} Mobile optimization state and utilities
 */
export function useMobileOptimization() {
  const [deviceInfo, setDeviceInfo] = useState(
    mobileOptimizationManager.getDeviceInfo()
  )

  useEffect(() => {
    const handleDeviceChange = (newDeviceInfo) => {
      setDeviceInfo(newDeviceInfo)
    }

    // Add listener for device changes
    mobileOptimizationManager.addListener(handleDeviceChange)

    // Cleanup listener on unmount
    return () => {
      mobileOptimizationManager.removeListener(handleDeviceChange)
    }
  }, [])

  return {
    ...deviceInfo,
    animationConfig: mobileOptimizationManager.getMobileAnimationConfig(),
    touchConfig: mobileOptimizationManager.getTouchInteractionConfig(),
    responsiveScaling: mobileOptimizationManager.getResponsiveAnimationScaling(),
    createTouchHandlers: (options) => mobileOptimizationManager.createTouchHandlers(options)
  }
}

/**
 * Hook for mobile-specific animation classes
 * @param {string} desktopClass - Class for desktop
 * @param {string} mobileClass - Class for mobile
 * @param {string} tabletClass - Class for tablet (optional)
 * @returns {string} Appropriate class name
 */
export function useMobileClass(desktopClass, mobileClass, tabletClass = mobileClass) {
  const { isMobile, isTablet } = useMobileOptimization()
  
  if (isMobile) return mobileClass
  if (isTablet) return tabletClass
  return desktopClass
}

/**
 * Hook for mobile-specific animation styles
 * @param {Object} desktopStyles - Styles for desktop
 * @param {Object} mobileStyles - Styles for mobile
 * @param {Object} tabletStyles - Styles for tablet (optional)
 * @returns {Object} Appropriate styles object
 */
export function useMobileStyles(desktopStyles, mobileStyles, tabletStyles = mobileStyles) {
  const { isMobile, isTablet } = useMobileOptimization()
  
  if (isMobile) return { ...desktopStyles, ...mobileStyles }
  if (isTablet) return { ...desktopStyles, ...tabletStyles }
  return desktopStyles
}

/**
 * Hook for touch-friendly interactions
 * @param {Object} options - Touch interaction options
 * @returns {Object} Touch event handlers and utilities
 */
export function useTouchInteraction(options = {}) {
  const { isTouchDevice, touchConfig, createTouchHandlers } = useMobileOptimization()
  
  const touchHandlers = createTouchHandlers(options)
  
  return {
    isTouchDevice,
    touchConfig,
    ...touchHandlers,
    
    // Utility functions
    shouldShowHoverEffects: () => !isTouchDevice,
    shouldUseMagneticEffects: () => !isTouchDevice,
    getTouchTargetSize: () => touchConfig.minTouchTargetSize,
    
    // Touch gesture detection
    detectSwipe: (startTouch, endTouch) => {
      const deltaX = endTouch.clientX - startTouch.clientX
      const deltaY = endTouch.clientY - startTouch.clientY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      if (distance < touchConfig.swipeThreshold) return null
      
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
      
      if (Math.abs(angle) < 45) return 'right'
      if (Math.abs(angle) > 135) return 'left'
      if (angle > 0) return 'down'
      return 'up'
    },
    
    detectTap: (startTouch, endTouch) => {
      const deltaX = Math.abs(endTouch.clientX - startTouch.clientX)
      const deltaY = Math.abs(endTouch.clientY - startTouch.clientY)
      
      return deltaX < touchConfig.tapThreshold && deltaY < touchConfig.tapThreshold
    }
  }
}

/**
 * Hook for responsive animation configuration
 * @returns {Object} Responsive animation configuration
 */
export function useResponsiveAnimation() {
  const { isMobile, isTablet, animationConfig, responsiveScaling } = useMobileOptimization()
  
  return {
    shouldUseParallax: () => animationConfig.enableParallax,
    shouldUseParticles: () => animationConfig.enableParticles,
    getAnimationDuration: (baseMs = 600) => {
      if (isMobile) return Math.min(baseMs * 0.7, 400)
      if (isTablet) return Math.min(baseMs * 0.8, 500)
      return baseMs
    },
    getParticleCount: (baseCount = 100) => {
      return Math.floor(baseCount * (animationConfig.particleCount / 100))
    },
    getBlurIntensity: () => animationConfig.blurIntensity,
    getScaling: () => responsiveScaling,
    getMaxConcurrentAnimations: () => animationConfig.maxConcurrentAnimations
  }
}

/**
 * Hook for mobile-optimized form handling
 * @returns {Object} Mobile form utilities
 */
export function useMobileForm() {
  const { isMobile, touchConfig } = useMobileOptimization()
  
  return {
    getInputProps: () => ({
      style: {
        fontSize: isMobile ? '16px' : '14px', // Prevent zoom on iOS
        minHeight: touchConfig.minTouchTargetSize,
        padding: isMobile ? '12px 16px' : '8px 12px'
      }
    }),
    
    getButtonProps: () => ({
      style: {
        minHeight: touchConfig.minTouchTargetSize,
        minWidth: touchConfig.minTouchTargetSize,
        padding: isMobile ? '12px 24px' : '8px 16px'
      }
    }),
    
    shouldPreventZoom: () => isMobile,
    shouldUseNativeValidation: () => !isMobile, // Use custom validation on mobile
    getTouchDelay: () => touchConfig.touchDelay
  }
}

/**
 * Hook for mobile navigation optimization
 * @returns {Object} Mobile navigation utilities
 */
export function useMobileNavigation() {
  const { isMobile, isTablet, touchConfig } = useMobileOptimization()
  
  return {
    shouldUseBottomNav: () => isMobile,
    shouldUseHamburgerMenu: () => isMobile || isTablet,
    getNavItemSize: () => touchConfig.minTouchTargetSize,
    
    scrollToElement: (element, options = {}) => {
      const behavior = isMobile ? 'auto' : 'smooth'
      element.scrollIntoView({ behavior, ...options })
    },
    
    focusElement: (element) => {
      element.focus()
      
      // Scroll into view on mobile to ensure visibility
      if (isMobile) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'auto', block: 'center' })
        }, 100)
      }
    }
  }
}