import { useEffect, useRef, useCallback } from 'react'
import animationIntegrationManager from '../utils/AnimationIntegrationManager.js'
import { useTheme } from '../components/ThemeProvider.jsx'

/**
 * Custom hook for integrating React components with GSAP animations
 * @param {Object} options - Integration options
 * @returns {Object} Integration utilities
 */
export const useAnimationIntegration = (options = {}) => {
  const elementRef = useRef(null)
  const componentIdRef = useRef(null)
  const theme = useTheme()
  
  const {
    type = 'generic',
    enhanceHover = true,
    enhanceClick = true,
    scrollReveal = true,
    customAnimations = [],
    autoRegister = true,
    ...restOptions
  } = options

  // Generate unique component ID
  const generateComponentId = useCallback(() => {
    return `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Register component with animation system
  const registerComponent = useCallback((element = elementRef.current) => {
    if (!element || componentIdRef.current) return null

    try {
      const componentId = generateComponentId()
      componentIdRef.current = componentId

      const integrationOptions = {
        type,
        enhanceHover,
        enhanceClick,
        scrollReveal,
        customAnimations,
        theme,
        ...restOptions
      }

      return animationIntegrationManager.registerReactBitsComponent(
        componentId,
        element,
        integrationOptions
      )
    } catch (error) {
      console.warn('Failed to register animation component:', error)
      return null
    }
  }, [type, enhanceHover, enhanceClick, scrollReveal, customAnimations, theme, restOptions, generateComponentId])

  // Unregister component
  const unregisterComponent = useCallback(() => {
    if (componentIdRef.current) {
      animationIntegrationManager.unregisterComponent(componentIdRef.current)
      componentIdRef.current = null
    }
  }, [])

  // Update component options
  const updateOptions = useCallback((newOptions) => {
    if (componentIdRef.current && elementRef.current) {
      unregisterComponent()
      registerComponent(elementRef.current)
    }
  }, [registerComponent, unregisterComponent])

  // Auto-register on mount if enabled
  useEffect(() => {
    if (autoRegister && elementRef.current) {
      registerComponent()
    }

    return () => {
      unregisterComponent()
    }
  }, [autoRegister, registerComponent, unregisterComponent])

  // Provide animation controls
  const animationControls = {
    play: () => {
      const component = animationIntegrationManager.reactBitsComponents.get(componentIdRef.current)
      if (component?.gsapTimeline) {
        component.gsapTimeline.play()
      }
    },
    pause: () => {
      const component = animationIntegrationManager.reactBitsComponents.get(componentIdRef.current)
      if (component?.gsapTimeline) {
        component.gsapTimeline.pause()
      }
    },
    restart: () => {
      const component = animationIntegrationManager.reactBitsComponents.get(componentIdRef.current)
      if (component?.gsapTimeline) {
        component.gsapTimeline.restart()
      }
    },
    reverse: () => {
      const component = animationIntegrationManager.reactBitsComponents.get(componentIdRef.current)
      if (component?.gsapTimeline) {
        component.gsapTimeline.reverse()
      }
    }
  }

  return {
    ref: elementRef,
    componentId: componentIdRef.current,
    registerComponent,
    unregisterComponent,
    updateOptions,
    animationControls,
    isRegistered: !!componentIdRef.current
  }
}

/**
 * Hook for button-specific animation integration
 */
export const useButtonAnimation = (options = {}) => {
  return useAnimationIntegration({
    type: 'button',
    enhanceHover: true,
    enhanceClick: true,
    ...options
  })
}

/**
 * Hook for text-specific animation integration
 */
export const useTextAnimation = (options = {}) => {
  try {
    return useAnimationIntegration({
      type: 'text',
      splitText: false,
      staggerDelay: 0.1,
      animationType: 'fadeInUp',
      scrollTrigger: true,
      ...options
    })
  } catch (error) {
    console.warn('Text animation integration failed:', error)
    return {
      ref: { current: null },
      componentId: null,
      registerComponent: () => {},
      unregisterComponent: () => {},
      updateOptions: () => {},
      animationControls: {
        play: () => {},
        pause: () => {},
        restart: () => {},
        reverse: () => {}
      },
      isRegistered: false
    }
  }
}

/**
 * Hook for card-specific animation integration
 */
export const useCardAnimation = (options = {}) => {
  try {
    return useAnimationIntegration({
      type: 'card',
      hover3D: true,
      parallaxElements: [],
      glowEffect: true,
      scrollReveal: true,
      ...options
    })
  } catch (error) {
    console.warn('Card animation integration failed:', error)
    return {
      ref: { current: null },
      componentId: null,
      registerComponent: () => {},
      unregisterComponent: () => {},
      updateOptions: () => {},
      animationControls: {
        play: () => {},
        pause: () => {},
        restart: () => {},
        reverse: () => {}
      },
      isRegistered: false
    }
  }
}

/**
 * Hook for particle system animation integration
 */
export const useParticleAnimation = (options = {}) => {
  return useAnimationIntegration({
    type: 'particle',
    mouseInteraction: true,
    continuousAnimation: true,
    particleCount: 50,
    ...options
  })
}

/**
 * Hook for global animation controls
 */
export const useGlobalAnimationControls = () => {
  const pauseAll = useCallback(() => {
    animationIntegrationManager.pauseAllAnimations()
  }, [])

  const resumeAll = useCallback(() => {
    animationIntegrationManager.resumeAllAnimations()
  }, [])

  const toggleAll = useCallback(() => {
    animationIntegrationManager.toggleGlobalAnimations()
  }, [])

  const setSpeed = useCallback((speed) => {
    animationIntegrationManager.setGlobalSpeed(speed)
  }, [])

  const getStatus = useCallback(() => {
    return animationIntegrationManager.getStatus()
  }, [])

  return {
    pauseAll,
    resumeAll,
    toggleAll,
    setSpeed,
    getStatus
  }
}

export default useAnimationIntegration