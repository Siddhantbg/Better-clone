import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { animationConfig, performanceConfig } from '../config/animations.js'
import reducedMotionManager from './ReducedMotionManager.js'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

/**
 * Centralized GSAP Animation Manager
 * Provides timeline management, performance monitoring, and animation utilities
 */
class AnimationManager {
  constructor() {
    this.timelines = new Map()
    this.scrollTriggers = new Map()
    this.performanceMetrics = {
      frameRate: 60,
      animationCount: 0,
      memoryUsage: 0,
    }
    this.reducedMotion = reducedMotionManager.getReducedMotionPreference()
    this.isInitialized = false
    
    this.init()
  }

  /**
   * Initialize the animation manager
   */
  init() {
    if (this.isInitialized) return
    
    // Set up performance monitoring
    this.setupPerformanceMonitoring()
    
    // Listen for reduced motion preference changes
    this.setupReducedMotionListener()
    
    // Set up global GSAP defaults
    gsap.defaults({
      duration: animationConfig.durations.medium,
      ease: animationConfig.easings.smooth,
    })
    
    // Apply reduced motion settings if needed
    this.applyReducedMotionSettings()
    
    this.isInitialized = true
  }

  /**
   * Create a new named timeline
   * @param {string} name - Timeline identifier
   * @param {Object} options - GSAP timeline options
   * @returns {gsap.timeline} GSAP timeline instance
   */
  createTimeline(name, options = {}) {
    if (this.timelines.has(name)) {
      // Return existing timeline without warning in development
      // This is normal behavior when components re-render
      return this.timelines.get(name)
    }

    // Get animation config based on reduced motion preference
    const animConfig = reducedMotionManager.getAnimationConfig()
    
    const timeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: animConfig.duration || animationConfig.durations.medium,
        ease: animConfig.ease || animationConfig.easings.smooth,
      },
      ...options,
    })

    this.timelines.set(name, timeline)
    this.performanceMetrics.animationCount++
    
    return timeline
  }

  /**
   * Get an existing timeline by name
   * @param {string} name - Timeline identifier
   * @returns {gsap.timeline|null} Timeline instance or null
   */
  getTimeline(name) {
    return this.timelines.get(name) || null
  }

  /**
   * Register a ScrollTrigger with the manager
   * @param {string} name - ScrollTrigger identifier
   * @param {Element} element - Trigger element
   * @param {gsap.core.Animation} animation - Animation to trigger
   * @param {Object} options - ScrollTrigger options
   * @returns {ScrollTrigger} ScrollTrigger instance
   */
  registerScrollTrigger(name, element, animation, options = {}) {
    if (this.scrollTriggers.has(name)) {
      console.warn(`ScrollTrigger "${name}" already exists. Killing existing trigger.`)
      this.scrollTriggers.get(name).kill()
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || animationConfig.scrollTrigger.start,
      end: options.end || animationConfig.scrollTrigger.end,
      animation: animation,
      scrub: options.scrub !== undefined ? options.scrub : animationConfig.scrollTrigger.scrub,
      onEnter: () => this.onScrollTriggerEnter(name),
      onLeave: () => this.onScrollTriggerLeave(name),
      ...options,
    })

    this.scrollTriggers.set(name, scrollTrigger)
    return scrollTrigger
  }

  /**
   * Pause all animations
   */
  pauseAll() {
    this.timelines.forEach(timeline => timeline.pause())
    gsap.globalTimeline.pause()
  }

  /**
   * Resume all animations
   */
  resumeAll() {
    if (this.reducedMotion) return
    
    this.timelines.forEach(timeline => timeline.resume())
    gsap.globalTimeline.resume()
  }

  /**
   * Kill all animations and clean up
   */
  killAll() {
    this.timelines.forEach(timeline => timeline.kill())
    this.scrollTriggers.forEach(trigger => trigger.kill())
    
    this.timelines.clear()
    this.scrollTriggers.clear()
    
    gsap.killTweensOf('*')
    ScrollTrigger.killAll()
    
    this.performanceMetrics.animationCount = 0
  }

  /**
   * Set reduced motion preference
   * @param {boolean} enabled - Whether reduced motion is enabled
   */
  setReducedMotion(enabled) {
    this.reducedMotion = enabled
    reducedMotionManager.setReducedMotion(enabled)
    this.applyReducedMotionSettings()
  }

  /**
   * Apply reduced motion settings to GSAP
   */
  applyReducedMotionSettings() {
    if (this.reducedMotion) {
      // Pause all animations
      this.pauseAll()
      
      // Set GSAP defaults for reduced motion
      gsap.defaults({
        duration: 0.01,
        ease: 'none',
      })
      
      // Kill particle systems and continuous animations
      gsap.killTweensOf('.particle-system')
      gsap.killTweensOf('.animated-gradient')
      gsap.killTweensOf('.infinite-animation')
      
    } else {
      // Restore normal GSAP defaults
      gsap.defaults({
        duration: animationConfig.durations.medium,
        ease: animationConfig.easings.smooth,
      })
      
      this.resumeAll()
    }
  }

  /**
   * Get performance metrics
   * @returns {Object} Performance metrics object
   */
  getPerformanceMetrics() {
    return { ...this.performanceMetrics }
  }

  /**
   * Check if animations should be reduced based on user preference
   * @returns {boolean} Whether reduced motion is preferred
   */
  checkReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /**
   * Set up performance monitoring
   * @private
   */
  setupPerformanceMonitoring() {
    let lastTime = performance.now()
    let frameCount = 0
    let lastWarningTime = 0
    const WARNING_THROTTLE = 10000 // Only warn every 10 seconds (reduced frequency)

    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++

      if (currentTime - lastTime >= 1000) {
        this.performanceMetrics.frameRate = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        // Monitor memory usage if available
        if (performance.memory) {
          this.performanceMetrics.memoryUsage = performance.memory.usedJSHeapSize
        }

        // Only warn if performance is severely degraded and throttle warnings
        if (this.performanceMetrics.frameRate < 20 && currentTime - lastWarningTime > WARNING_THROTTLE) {
          console.warn('Animation performance severely degraded. Consider reducing animation complexity.')
          lastWarningTime = currentTime
        }
      }

      // Only continue monitoring if performance is acceptable
      if (this.performanceMetrics.frameRate > 15) {
        requestAnimationFrame(measurePerformance)
      }
    }

    requestAnimationFrame(measurePerformance)
  }

  /**
   * Set up reduced motion preference listener
   * @private
   */
  setupReducedMotionListener() {
    // Listen to the ReducedMotionManager for changes
    reducedMotionManager.addListener((isReduced) => {
      this.reducedMotion = isReduced
      this.applyReducedMotionSettings()
    })
  }

  /**
   * Handle ScrollTrigger enter event
   * @private
   */
  onScrollTriggerEnter(name) {
    // Performance tracking for scroll triggers
    console.debug(`ScrollTrigger "${name}" entered`)
  }

  /**
   * Handle ScrollTrigger leave event
   * @private
   */
  onScrollTriggerLeave(name) {
    // Performance tracking for scroll triggers
    console.debug(`ScrollTrigger "${name}" left`)
  }

  /**
   * Create common animation presets
   */
  presets = {
    fadeIn: (element, options = {}) => {
      const animConfig = reducedMotionManager.getSimplifiedAnimation('fadeIn')
      if (animConfig) {
        return gsap.fromTo(element, animConfig.from, animConfig.to)
      }
      
      return gsap.fromTo(element, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: options.duration || animationConfig.durations.medium,
          ease: options.ease || animationConfig.easings.smooth,
          ...options 
        }
      )
    },

    slideUp: (element, options = {}) => {
      const animConfig = reducedMotionManager.getSimplifiedAnimation('slideUp')
      if (animConfig) {
        return gsap.fromTo(element, animConfig.from, animConfig.to)
      }
      
      return gsap.fromTo(element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration || animationConfig.durations.medium,
          ease: options.ease || animationConfig.easings.smooth,
          ...options
        }
      )
    },

    scaleIn: (element, options = {}) => {
      const animConfig = reducedMotionManager.getSimplifiedAnimation('scaleIn')
      if (animConfig) {
        return gsap.fromTo(element, animConfig.from, animConfig.to)
      }
      
      return gsap.fromTo(element,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: options.duration || animationConfig.durations.medium,
          ease: options.ease || animationConfig.easings.bounce,
          ...options
        }
      )
    },

    staggerFadeIn: (elements, options = {}) => {
      const animConfig = reducedMotionManager.getSimplifiedAnimation('fadeIn')
      if (animConfig) {
        return gsap.fromTo(elements, animConfig.from, animConfig.to)
      }
      
      return gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || animationConfig.durations.medium,
          ease: options.ease || animationConfig.easings.smooth,
          stagger: options.stagger || 0.1,
          ...options
        }
      )
    }
  }
}

// Create singleton instance
const animationManager = new AnimationManager()

export default animationManager
export { AnimationManager }