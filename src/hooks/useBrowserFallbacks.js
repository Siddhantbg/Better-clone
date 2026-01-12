import { useEffect, useState, useCallback } from 'react'
import { useBrowserCompatibility } from '../components/BrowserCompatibilityProvider'
import animationFallbacks from '../utils/AnimationFallbacks'

/**
 * Hook for getting browser-appropriate animation implementations
 * @param {string} animationType - Type of animation needed
 * @param {Object} options - Animation options
 * @returns {Object} Animation implementation and utilities
 */
export const useBrowserFallbacks = (animationType, options = {}) => {
  const { 
    isSupported, 
    shouldUseComplexAnimations, 
    shouldUseWebGL,
    shouldUseGlassmorphism,
    isOldBrowser 
  } = useBrowserCompatibility()

  const [implementation, setImplementation] = useState(null)

  useEffect(() => {
    const impl = animationFallbacks.getAnimationImplementation(animationType, options)
    setImplementation(impl)
  }, [animationType, options])

  /**
   * Get appropriate component props based on browser capabilities
   */
  const getComponentProps = useCallback((baseProps = {}) => {
    const props = { ...baseProps }

    // Disable complex animations for old browsers
    if (isOldBrowser) {
      props.disableAnimations = true
      props.reduceMotion = true
    }

    // Disable WebGL features if not supported
    if (!shouldUseWebGL()) {
      props.disableWebGL = true
      props.useCanvasFallback = true
    }

    // Disable glassmorphism if not supported
    if (!shouldUseGlassmorphism()) {
      props.disableGlassmorphism = true
      props.useSolidBackground = true
    }

    // Disable complex animations if not supported
    if (!shouldUseComplexAnimations()) {
      props.useSimpleAnimations = true
      props.reducedComplexity = true
    }

    return props
  }, [isOldBrowser, shouldUseWebGL, shouldUseGlassmorphism, shouldUseComplexAnimations])

  /**
   * Get CSS classes based on browser capabilities
   */
  const getCSSClasses = useCallback((baseClasses = '') => {
    const classes = [baseClasses]

    if (isOldBrowser) {
      classes.push('old-browser-fallback')
    }

    if (!isSupported('css-animations')) {
      classes.push('no-css-animations')
    }

    if (!isSupported('css-transforms')) {
      classes.push('no-css-transforms')
    }

    if (!isSupported('css-backdrop-filter')) {
      classes.push('no-backdrop-filter')
    }

    if (!shouldUseWebGL()) {
      classes.push('no-webgl-fallback')
    }

    return classes.filter(Boolean).join(' ')
  }, [isOldBrowser, isSupported, shouldUseWebGL])

  /**
   * Get animation configuration optimized for browser
   */
  const getAnimationConfig = useCallback((baseConfig = {}) => {
    return animationFallbacks.getPerformanceOptimizedConfig(animationType, baseConfig)
  }, [animationType])

  /**
   * Check if a specific feature should be enabled
   */
  const shouldEnableFeature = useCallback((feature) => {
    const featureChecks = {
      particles: () => shouldUseWebGL() && !isOldBrowser,
      glassmorphism: () => shouldUseGlassmorphism(),
      complexAnimations: () => shouldUseComplexAnimations(),
      transforms3d: () => isSupported('css-transforms') && !isOldBrowser,
      gradientAnimations: () => isSupported('css-gradients') && isSupported('css-animations'),
      backdropFilter: () => isSupported('css-backdrop-filter'),
      intersectionObserver: () => isSupported('intersection-observer'),
      customProperties: () => isSupported('css-custom-properties')
    }

    const check = featureChecks[feature]
    return check ? check() : false
  }, [isSupported, shouldUseWebGL, shouldUseGlassmorphism, shouldUseComplexAnimations, isOldBrowser])

  return {
    implementation,
    getComponentProps,
    getCSSClasses,
    getAnimationConfig,
    shouldEnableFeature,
    isOldBrowser,
    capabilities: {
      webgl: shouldUseWebGL(),
      glassmorphism: shouldUseGlassmorphism(),
      complexAnimations: shouldUseComplexAnimations(),
      transforms: isSupported('css-transforms'),
      animations: isSupported('css-animations'),
      customProperties: isSupported('css-custom-properties')
    }
  }
}

/**
 * Hook for conditional component rendering based on browser capabilities
 * @param {string} feature - Feature to check
 * @returns {Object} Rendering utilities
 */
export const useConditionalRender = (feature) => {
  const { shouldEnableFeature } = useBrowserFallbacks()

  const shouldRender = shouldEnableFeature(feature)

  const ConditionalWrapper = ({ children, fallback = null }) => {
    return shouldRender ? children : fallback
  }

  return {
    shouldRender,
    ConditionalWrapper
  }
}

/**
 * Hook for progressive enhancement
 * @param {Object} features - Features to progressively enhance
 * @returns {Object} Enhanced configuration
 */
export const useProgressiveEnhancement = (features = {}) => {
  const { shouldEnableFeature, getComponentProps } = useBrowserFallbacks()

  const enhancedConfig = {}

  Object.entries(features).forEach(([key, config]) => {
    if (shouldEnableFeature(key)) {
      enhancedConfig[key] = config.enhanced || config
    } else {
      enhancedConfig[key] = config.fallback || null
    }
  })

  return {
    config: enhancedConfig,
    getProps: getComponentProps
  }
}

/**
 * Hook for animation performance monitoring
 * @returns {Object} Performance utilities
 */
export const useAnimationPerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    frameRate: 60,
    animationCount: 0,
    shouldOptimize: false
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId

    const measurePerformance = (currentTime) => {
      frameCount++

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        
        setPerformanceMetrics(prev => ({
          ...prev,
          frameRate: fps,
          shouldOptimize: fps < 30
        }))

        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measurePerformance)
    }

    animationId = requestAnimationFrame(measurePerformance)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const optimizeForPerformance = useCallback(() => {
    if (performanceMetrics.shouldOptimize) {
      // Reduce animation complexity
      document.documentElement.classList.add('performance-mode')
      
      // Disable heavy animations
      const heavyAnimations = document.querySelectorAll('.particle-system, .complex-animation')
      heavyAnimations.forEach(element => {
        element.style.display = 'none'
      })
    }
  }, [performanceMetrics.shouldOptimize])

  return {
    performanceMetrics,
    optimizeForPerformance,
    shouldOptimize: performanceMetrics.shouldOptimize
  }
}

export default useBrowserFallbacks