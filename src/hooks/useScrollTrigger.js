import { useEffect, useRef } from 'react'
import scrollTriggerSystem from '../utils/ScrollTriggerSystem.js'

/**
 * React hook for using ScrollTrigger animations
 * @param {Object} options - ScrollTrigger configuration
 * @returns {Object} Ref and control functions
 */
export const useScrollTrigger = (options = {}) => {
  const elementRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return

    const {
      name = `trigger-${Date.now()}`,
      animationType = 'fadeUp',
      triggerOptions = {},
      animationOptions = {},
    } = options

    // Create the scroll trigger
    triggerRef.current = scrollTriggerSystem.createScrollTrigger(
      name,
      elementRef.current,
      animationOptions,
      triggerOptions
    )

    // Cleanup on unmount
    return () => {
      if (triggerRef.current) {
        scrollTriggerSystem.removeScrollTrigger(name)
      }
    }
  }, [options])

  return {
    ref: elementRef,
    trigger: triggerRef.current,
    refresh: () => scrollTriggerSystem.refresh(),
  }
}

/**
 * React hook for parallax effects
 * @param {Object} options - Parallax configuration
 * @returns {Object} Ref and control functions
 */
export const useParallax = (options = {}) => {
  const elementRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return

    const {
      name = `parallax-${Date.now()}`,
      speed = 0.5,
      direction = 'vertical',
      ...parallaxOptions
    } = options

    // Create the parallax effect
    parallaxRef.current = scrollTriggerSystem.createParallaxEffect(
      name,
      elementRef.current,
      { speed, direction, ...parallaxOptions }
    )

    // Cleanup on unmount
    return () => {
      if (parallaxRef.current) {
        scrollTriggerSystem.removeParallaxEffect(name)
      }
    }
  }, [options])

  return {
    ref: elementRef,
    parallax: parallaxRef.current,
    refresh: () => scrollTriggerSystem.refresh(),
  }
}

/**
 * React hook for content reveal animations
 * @param {Object} options - Reveal configuration
 * @returns {Object} Ref and control functions
 */
export const useContentReveal = (options = {}) => {
  const elementRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    if (!elementRef.current) return

    const {
      name = `reveal-${Date.now()}`,
      animationType = 'fadeUp',
      stagger = 0.1,
      ...revealOptions
    } = options

    // Get all children or the element itself
    const elements = elementRef.current.children.length > 0 
      ? Array.from(elementRef.current.children)
      : [elementRef.current]

    // Create the reveal animation
    revealRef.current = scrollTriggerSystem.createContentReveal(
      name,
      elements,
      { animationType, stagger, ...revealOptions }
    )

    // Cleanup on unmount
    return () => {
      if (revealRef.current) {
        scrollTriggerSystem.removeContentReveal(name)
      }
    }
  }, [options])

  return {
    ref: elementRef,
    reveal: revealRef.current,
    refresh: () => scrollTriggerSystem.refresh(),
  }
}

/**
 * React hook for section-based animations
 * @param {string} sectionSelector - CSS selector for sections
 * @param {Object} options - Section animation options
 */
export const useSectionAnimations = (sectionSelector, options = {}) => {
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      scrollTriggerSystem.createSectionAnimations(sectionSelector, options)
    }, 100)

    return () => {
      clearTimeout(timer)
      // Note: Section animations are managed globally, 
      // so we don't clean them up individually here
    }
  }, [sectionSelector, options])

  return {
    refresh: () => scrollTriggerSystem.refresh(),
  }
}

/**
 * React hook for hero section animations
 * @param {Object} options - Hero animation options
 */
export const useHeroAnimations = (options = {}) => {
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      scrollTriggerSystem.createHeroAnimations(heroRef.current, options)
    }, 100)

    return () => {
      clearTimeout(timer)
      // Hero animations are cleaned up when the component unmounts
      scrollTriggerSystem.removeScrollTrigger('hero-bg')
      scrollTriggerSystem.removeContentReveal('hero-content')
      scrollTriggerSystem.removeScrollTrigger('hero-particles')
    }
  }, [options])

  return {
    ref: heroRef,
    refresh: () => scrollTriggerSystem.refresh(),
  }
}