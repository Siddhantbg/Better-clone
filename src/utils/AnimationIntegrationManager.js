import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import animationManager from './AnimationManager.js'
import scrollTriggerSystem from './ScrollTriggerSystem.js'
import reducedMotionManager from './ReducedMotionManager.js'
import { animationConfig } from '../config/animations.js'

/**
 * Animation Integration Manager
 * Coordinates GSAP animations with React Bits components and provides global controls
 */
class AnimationIntegrationManager {
  constructor() {
    this.reactBitsComponents = new Map()
    this.globalTimeline = null
    this.isInitialized = false
    this.componentAnimations = new Map()
    this.globalControls = {
      paused: false,
      speed: 1,
      reducedMotion: false
    }
    
    this.init()
  }

  /**
   * Initialize the integration manager
   */
  init() {
    if (this.isInitialized) return
    
    // Create global master timeline
    this.globalTimeline = gsap.timeline({ paused: true })
    
    // Set up global animation controls
    this.setupGlobalControls()
    
    // Listen for reduced motion changes
    this.setupReducedMotionIntegration()
    
    // Set up performance monitoring integration
    this.setupPerformanceIntegration()
    
    this.isInitialized = true
  }

  /**
   * Register a React Bits component with GSAP integration
   * @param {string} componentId - Unique identifier for the component
   * @param {Element} element - DOM element of the component
   * @param {Object} options - Animation options
   */
  registerReactBitsComponent(componentId, element, options = {}) {
    if (!element || !element.parentNode) {
      console.warn('Cannot register component: element is null or not in DOM');
      return null;
    }

    const componentData = {
      element,
      options,
      gsapTimeline: null,
      isAnimating: false,
      animations: []
    }

    try {
      // Create GSAP timeline for this component
      const timeline = animationManager.createTimeline(`react-bits-${componentId}`)
      componentData.gsapTimeline = timeline

      // Apply initial GSAP enhancements based on component type
      this.enhanceReactBitsComponent(componentData, options)

      this.reactBitsComponents.set(componentId, componentData)
      return componentData
    } catch (error) {
      console.warn('Failed to register React Bits component:', error);
      return null;
    }
  }

  /**
   * Enhance React Bits component with GSAP animations
   * @param {Object} componentData - Component data object
   * @param {Object} options - Enhancement options
   */
  enhanceReactBitsComponent(componentData, options) {
    const { element, gsapTimeline } = componentData
    const { type, enhanceHover = true, enhanceClick = true, customAnimations = [] } = options

    // Apply type-specific enhancements
    switch (type) {
      case 'button':
        this.enhanceButton(element, gsapTimeline, { enhanceHover, enhanceClick })
        break
      case 'text':
        this.enhanceText(element, gsapTimeline, options)
        break
      case 'card':
        this.enhanceCard(element, gsapTimeline, options)
        break
      case 'particle':
        this.enhanceParticleSystem(element, gsapTimeline, options)
        break
      default:
        this.enhanceGeneric(element, gsapTimeline, options)
    }

    // Apply custom animations
    customAnimations.forEach(animation => {
      this.addCustomAnimation(element, gsapTimeline, animation)
    })
  }

  /**
   * Enhance button components with GSAP animations
   * @param {Element} element - Button element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} options - Enhancement options
   */
  enhanceButton(element, timeline, options) {
    const { enhanceHover, enhanceClick } = options

    if (enhanceHover) {
      // Enhanced hover animations
      element.addEventListener('mouseenter', () => {
        if (this.globalControls.reducedMotion) return
        
        gsap.to(element, {
          scale: 1.05,
          rotationY: 5,
          boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotationY: 0,
          boxShadow: '0 4px 15px rgba(124, 58, 237, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }

    if (enhanceClick) {
      // Enhanced click feedback
      element.addEventListener('mousedown', () => {
        if (this.globalControls.reducedMotion) return
        
        gsap.to(element, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out'
        })
      })

      element.addEventListener('mouseup', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.1,
          ease: 'power2.out'
        })
      })
    }
  }

  /**
   * Enhance text components with GSAP animations
   * @param {Element} element - Text element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} options - Enhancement options
   */
  enhanceText(element, timeline, options) {
    const { 
      splitText = false, 
      staggerDelay = 0.1, 
      animationType = 'fadeInUp',
      scrollTrigger = true 
    } = options

    if (splitText) {
      // Split text into spans for individual character/word animation
      const text = element.textContent
      const chars = text.split('').map(char => 
        char === ' ' ? '&nbsp;' : `<span class="char">${char}</span>`
      ).join('')
      
      element.innerHTML = chars
      const charElements = element.querySelectorAll('.char')

      // Animate characters with stagger
      timeline.fromTo(charElements, 
        { opacity: 0, y: 50, rotationX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'back.out(1.7)'
        }
      )
    } else {
      // Simple text animation
      timeline.fromTo(element,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    }

    if (scrollTrigger) {
      scrollTriggerSystem.createScrollTrigger(`text-${Date.now()}`, element, {
        from: { opacity: 0, y: 30, scale: 0.9 },
        to: { opacity: 1, y: 0, scale: 1 }
      }, {
        start: 'top 85%',
        end: 'bottom 15%'
      })
    }
  }

  /**
   * Enhance card components with GSAP animations
   * @param {Element} element - Card element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} options - Enhancement options
   */
  enhanceCard(element, timeline, options) {
    const { 
      hover3D = true, 
      parallaxElements = [], 
      glowEffect = true,
      scrollReveal = true 
    } = options

    if (hover3D) {
      // 3D tilt effect on hover
      element.addEventListener('mousemove', (e) => {
        if (this.globalControls.reducedMotion) return
        
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const rotateX = (e.clientY - centerY) / 10
        const rotateY = (centerX - e.clientX) / 10
        
        gsap.to(element, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out'
        })

        // Animate parallax elements
        parallaxElements.forEach((selector, index) => {
          const elements = element.querySelectorAll(selector)
          const multiplier = (index + 1) * 0.1
          
          gsap.to(elements, {
            x: rotateY * multiplier,
            y: -rotateX * multiplier,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        })

        // Reset parallax elements
        parallaxElements.forEach(selector => {
          const elements = element.querySelectorAll(selector)
          gsap.to(elements, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
          })
        })
      })
    }

    if (scrollReveal) {
      timeline.fromTo(element,
        { opacity: 0, y: 100, scale: 0.8, rotationX: -15 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotationX: 0,
          duration: 1,
          ease: 'power3.out'
        }
      )
      
      scrollTriggerSystem.createScrollTrigger(`card-${Date.now()}`, element, {
        from: { opacity: 0, y: 100, scale: 0.8, rotationX: -15 },
        to: { opacity: 1, y: 0, scale: 1, rotationX: 0 }
      }, {
        start: 'top 85%',
        end: 'bottom 15%'
      })
    }
  }

  /**
   * Enhance particle system components
   * @param {Element} element - Particle container element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} options - Enhancement options
   */
  enhanceParticleSystem(element, timeline, options) {
    const { 
      mouseInteraction = true, 
      continuousAnimation = true,
      particleCount = 50 
    } = options

    if (continuousAnimation) {
      // Create continuous floating animation for particles
      const particles = element.querySelectorAll('.particle')
      
      particles.forEach((particle, index) => {
        gsap.to(particle, {
          y: `+=${Math.random() * 20 - 10}`,
          x: `+=${Math.random() * 20 - 10}`,
          rotation: `+=${Math.random() * 360}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1
        })
      })
    }

    if (mouseInteraction) {
      element.addEventListener('mousemove', (e) => {
        if (this.globalControls.reducedMotion) return
        
        const rect = element.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        const particles = element.querySelectorAll('.particle')
        particles.forEach(particle => {
          const particleRect = particle.getBoundingClientRect()
          const particleX = particleRect.left - rect.left + particleRect.width / 2
          const particleY = particleRect.top - rect.top + particleRect.height / 2
          
          const distance = Math.sqrt(
            Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
          )
          
          if (distance < 100) {
            const force = (100 - distance) / 100
            const angle = Math.atan2(particleY - mouseY, particleX - mouseX)
            
            gsap.to(particle, {
              x: `+=${Math.cos(angle) * force * 20}`,
              y: `+=${Math.sin(angle) * force * 20}`,
              scale: 1 + force * 0.5,
              duration: 0.3,
              ease: 'power2.out'
            })
          }
        })
      })
    }
  }

  /**
   * Enhance generic components
   * @param {Element} element - Generic element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} options - Enhancement options
   */
  enhanceGeneric(element, timeline, options) {
    const { scrollReveal = true, hoverEffect = false } = options

    if (scrollReveal) {
      timeline.fromTo(element,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      )
      
      scrollTriggerSystem.createScrollTrigger(`generic-${Date.now()}`, element, {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 }
      }, {
        start: 'top 85%',
        end: 'bottom 15%'
      })
    }

    if (hoverEffect) {
      element.addEventListener('mouseenter', () => {
        if (this.globalControls.reducedMotion) return
        
        gsap.to(element, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }
  }

  /**
   * Add custom animation to component
   * @param {Element} element - Target element
   * @param {gsap.timeline} timeline - GSAP timeline
   * @param {Object} animation - Animation configuration
   */
  addCustomAnimation(element, timeline, animation) {
    const { 
      trigger = 'scroll', 
      from = {}, 
      to = {}, 
      duration = 1, 
      ease = 'power2.out',
      delay = 0 
    } = animation

    const animationTween = timeline.fromTo(element, from, {
      ...to,
      duration,
      ease,
      delay
    })

    if (trigger === 'scroll') {
      scrollTriggerSystem.createScrollTrigger(`custom-${Date.now()}`, element, {
        from,
        to: { ...to, duration, ease, delay }
      }, {
        start: 'top 85%',
        end: 'bottom 15%'
      })
    }
  }

  /**
   * Set up global animation controls
   */
  setupGlobalControls() {
    // Global play/pause control
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === ' ') {
        e.preventDefault()
        this.toggleGlobalAnimations()
      }
    })

    // Visibility change handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAllAnimations()
      } else {
        this.resumeAllAnimations()
      }
    })
  }

  /**
   * Set up reduced motion integration
   */
  setupReducedMotionIntegration() {
    reducedMotionManager.addListener((isReduced) => {
      this.globalControls.reducedMotion = isReduced
      
      if (isReduced) {
        this.simplifyAllAnimations()
      } else {
        this.restoreAllAnimations()
      }
    })
  }

  /**
   * Set up performance integration
   */
  setupPerformanceIntegration() {
    // Monitor performance and adjust animation quality
    setInterval(() => {
      const metrics = animationManager.getPerformanceMetrics()
      
      if (metrics.frameRate < 30) {
        this.reduceAnimationComplexity()
      } else if (metrics.frameRate > 55) {
        this.restoreAnimationComplexity()
      }
    }, 5000)
  }

  /**
   * Global animation controls
   */
  pauseAllAnimations() {
    this.globalControls.paused = true
    animationManager.pauseAll()
    this.reactBitsComponents.forEach(component => {
      if (component.gsapTimeline) {
        component.gsapTimeline.pause()
      }
    })
  }

  resumeAllAnimations() {
    if (this.globalControls.reducedMotion) return
    
    this.globalControls.paused = false
    animationManager.resumeAll()
    this.reactBitsComponents.forEach(component => {
      if (component.gsapTimeline) {
        component.gsapTimeline.resume()
      }
    })
  }

  toggleGlobalAnimations() {
    if (this.globalControls.paused) {
      this.resumeAllAnimations()
    } else {
      this.pauseAllAnimations()
    }
  }

  setGlobalSpeed(speed) {
    this.globalControls.speed = speed
    gsap.globalTimeline.timeScale(speed)
    
    this.reactBitsComponents.forEach(component => {
      if (component.gsapTimeline) {
        component.gsapTimeline.timeScale(speed)
      }
    })
  }

  /**
   * Simplify animations for reduced motion
   */
  simplifyAllAnimations() {
    this.reactBitsComponents.forEach(component => {
      const { element } = component
      
      // Remove complex transforms and use simple opacity changes
      gsap.set(element, {
        transform: 'none',
        filter: 'none'
      })
    })
  }

  /**
   * Restore full animations
   */
  restoreAllAnimations() {
    this.reactBitsComponents.forEach(component => {
      const { gsapTimeline } = component
      if (gsapTimeline) {
        gsapTimeline.restart()
      }
    })
  }

  /**
   * Reduce animation complexity for performance
   */
  reduceAnimationComplexity() {
    console.warn('Reducing animation complexity due to performance issues')
    
    // Disable particle systems
    gsap.killTweensOf('.particle')
    
    // Simplify hover effects
    this.reactBitsComponents.forEach(component => {
      const { element } = component
      element.style.willChange = 'auto'
    })
  }

  /**
   * Restore animation complexity
   */
  restoreAnimationComplexity() {
    // Re-enable full animation complexity
    this.reactBitsComponents.forEach(component => {
      const { element, options } = component
      element.style.willChange = 'transform, opacity'
      
      // Re-enhance component if needed
      if (options.type === 'particle') {
        this.enhanceParticleSystem(element, component.gsapTimeline, options)
      }
    })
  }

  /**
   * Unregister a React Bits component
   * @param {string} componentId - Component identifier
   */
  unregisterComponent(componentId) {
    const component = this.reactBitsComponents.get(componentId)
    if (component) {
      // Clean up timeline
      if (component.gsapTimeline) {
        component.gsapTimeline.kill()
      }
      
      // Remove event listeners
      const { element } = component
      element.removeEventListener('mouseenter', null)
      element.removeEventListener('mouseleave', null)
      element.removeEventListener('mousemove', null)
      
      this.reactBitsComponents.delete(componentId)
    }
  }

  /**
   * Get integration status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      componentCount: this.reactBitsComponents.size,
      globalControls: { ...this.globalControls },
      performanceMetrics: animationManager.getPerformanceMetrics()
    }
  }

  /**
   * Clean up all integrations
   */
  destroy() {
    // Clean up all components
    this.reactBitsComponents.forEach((component, id) => {
      this.unregisterComponent(id)
    })
    
    // Kill global timeline
    if (this.globalTimeline) {
      this.globalTimeline.kill()
    }
    
    // Remove event listeners
    window.removeEventListener('keydown', null)
    document.removeEventListener('visibilitychange', null)
    
    this.isInitialized = false
  }
}

// Create singleton instance
const animationIntegrationManager = new AnimationIntegrationManager()

export default animationIntegrationManager
export { AnimationIntegrationManager }
  