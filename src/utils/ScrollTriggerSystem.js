import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import animationManager from './AnimationManager.js'
import { animationConfig } from '../config/animations.js'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTrigger System for managing scroll-based animations
 * Provides parallax effects, content reveal animations, and scroll-based triggers
 */
class ScrollTriggerSystem {
  constructor() {
    this.triggers = new Map()
    this.parallaxElements = new Map()
    this.revealElements = new Map()
    this.isInitialized = false
    
    this.init()
  }

  /**
   * Initialize the ScrollTrigger system
   */
  init() {
    if (this.isInitialized) return
    
    // Refresh ScrollTrigger on window resize
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    })
    
    this.isInitialized = true
  }

  /**
   * Create a scroll-triggered animation
   * @param {string} name - Unique identifier for the trigger
   * @param {Element} element - Element to trigger on
   * @param {Object} animationOptions - Animation configuration
   * @param {Object} triggerOptions - ScrollTrigger configuration
   * @returns {ScrollTrigger} ScrollTrigger instance
   */
  createScrollTrigger(name, element, animationOptions = {}, triggerOptions = {}) {
    if (this.triggers.has(name)) {
      console.warn(`ScrollTrigger "${name}" already exists. Removing existing trigger.`)
      this.removeScrollTrigger(name)
    }

    const animation = this.createAnimation(element, animationOptions)
    
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: triggerOptions.start || animationConfig.scrollTrigger.start,
      end: triggerOptions.end || animationConfig.scrollTrigger.end,
      animation: animation,
      scrub: triggerOptions.scrub !== undefined ? triggerOptions.scrub : false,
      toggleActions: triggerOptions.toggleActions || 'play none none reverse',
      onEnter: () => this.onTriggerEnter(name, element),
      onLeave: () => this.onTriggerLeave(name, element),
      onEnterBack: () => this.onTriggerEnterBack(name, element),
      onLeaveBack: () => this.onTriggerLeaveBack(name, element),
      ...triggerOptions,
    })

    this.triggers.set(name, trigger)
    return trigger
  }

  /**
   * Create parallax effect for an element
   * @param {string} name - Unique identifier
   * @param {Element} element - Element to apply parallax to
   * @param {Object} options - Parallax configuration
   * @returns {ScrollTrigger} ScrollTrigger instance
   */
  createParallaxEffect(name, element, options = {}) {
    const {
      speed = 0.5,
      direction = 'vertical',
      start = 'top bottom',
      end = 'bottom top',
      scrub = true,
    } = options

    if (this.parallaxElements.has(name)) {
      console.warn(`Parallax element "${name}" already exists. Removing existing effect.`)
      this.removeParallaxEffect(name)
    }

    let animation
    if (direction === 'vertical') {
      animation = gsap.fromTo(element, 
        { y: -100 * speed },
        { y: 100 * speed, ease: 'none' }
      )
    } else if (direction === 'horizontal') {
      animation = gsap.fromTo(element,
        { x: -100 * speed },
        { x: 100 * speed, ease: 'none' }
      )
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      animation: animation,
      scrub: scrub,
    })

    this.parallaxElements.set(name, trigger)
    return trigger
  }

  /**
   * Create content reveal animation
   * @param {string} name - Unique identifier
   * @param {Element|NodeList} elements - Element(s) to reveal
   * @param {Object} options - Reveal configuration
   * @returns {ScrollTrigger} ScrollTrigger instance
   */
  createContentReveal(name, elements, options = {}) {
    const {
      animationType = 'fadeUp',
      stagger = 0.1,
      start = 'top 80%',
      end = 'bottom 20%',
      duration = animationConfig.durations.medium,
      ease = animationConfig.easings.smooth,
    } = options

    if (this.revealElements.has(name)) {
      console.warn(`Reveal animation "${name}" already exists. Removing existing animation.`)
      this.removeContentReveal(name)
    }

    let animation
    const elementsArray = Array.isArray(elements) ? elements : [elements]

    switch (animationType) {
      case 'fadeUp':
        animation = gsap.fromTo(elementsArray,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
        break
      
      case 'fadeIn':
        animation = gsap.fromTo(elementsArray,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
        break
      
      case 'slideLeft':
        animation = gsap.fromTo(elementsArray,
          { opacity: 0, x: 100 },
          { 
            opacity: 1, 
            x: 0, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
        break
      
      case 'slideRight':
        animation = gsap.fromTo(elementsArray,
          { opacity: 0, x: -100 },
          { 
            opacity: 1, 
            x: 0, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
        break
      
      case 'scaleIn':
        animation = gsap.fromTo(elementsArray,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
        break
      
      default:
        animation = gsap.fromTo(elementsArray,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: duration,
            ease: ease,
            stagger: stagger,
          }
        )
    }

    const trigger = ScrollTrigger.create({
      trigger: elementsArray[0],
      start: start,
      end: end,
      animation: animation,
      toggleActions: 'play none none reverse',
    })

    this.revealElements.set(name, trigger)
    return trigger
  }

  /**
   * Create section-based animations that trigger when sections come into view
   * @param {string} sectionSelector - CSS selector for sections
   * @param {Object} options - Animation options
   */
  createSectionAnimations(sectionSelector, options = {}) {
    const sections = document.querySelectorAll(sectionSelector)
    
    sections.forEach((section, index) => {
      const sectionName = `section-${index}`
      
      // Add parallax background if section has data-parallax attribute
      const parallaxBg = section.querySelector('[data-parallax]')
      if (parallaxBg) {
        this.createParallaxEffect(`${sectionName}-bg`, parallaxBg, {
          speed: 0.3,
          ...options.parallax,
        })
      }
      
      // Reveal section content
      const content = section.querySelectorAll('[data-reveal]')
      if (content.length > 0) {
        this.createContentReveal(`${sectionName}-content`, content, {
          animationType: section.dataset.revealType || 'fadeUp',
          stagger: 0.15,
          ...options.reveal,
        })
      }
      
      // Create section entrance animation
      this.createScrollTrigger(`${sectionName}-entrance`, section, {
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0 },
      }, {
        start: 'top 90%',
        end: 'top 70%',
        ...options.entrance,
      })
    })
  }

  /**
   * Create hero section parallax and animations
   * @param {Element} heroElement - Hero section element
   * @param {Object} options - Hero animation options
   */
  createHeroAnimations(heroElement, options = {}) {
    if (!heroElement) return

    // Hero background parallax
    const heroBg = heroElement.querySelector('.hero-bg, [data-hero-bg]')
    if (heroBg) {
      this.createParallaxEffect('hero-bg', heroBg, {
        speed: 0.2,
        start: 'top bottom',
        end: 'bottom top',
        ...options.background,
      })
    }

    // Hero content reveal
    const heroContent = heroElement.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, [data-hero-content]')
    if (heroContent.length > 0) {
      this.createContentReveal('hero-content', heroContent, {
        animationType: 'fadeUp',
        stagger: 0.2,
        start: 'top 80%',
        ...options.content,
      })
    }

    // Hero particles or interactive elements
    const heroParticles = heroElement.querySelector('.hero-particles, [data-hero-particles]')
    if (heroParticles) {
      this.createScrollTrigger('hero-particles', heroParticles, {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      }, {
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        ...options.particles,
      })
    }
  }

  /**
   * Remove a specific ScrollTrigger
   * @param {string} name - Trigger name to remove
   */
  removeScrollTrigger(name) {
    const trigger = this.triggers.get(name)
    if (trigger) {
      trigger.kill()
      this.triggers.delete(name)
    }
  }

  /**
   * Remove a parallax effect
   * @param {string} name - Parallax effect name to remove
   */
  removeParallaxEffect(name) {
    const trigger = this.parallaxElements.get(name)
    if (trigger) {
      trigger.kill()
      this.parallaxElements.delete(name)
    }
  }

  /**
   * Remove a content reveal animation
   * @param {string} name - Reveal animation name to remove
   */
  removeContentReveal(name) {
    const trigger = this.revealElements.get(name)
    if (trigger) {
      trigger.kill()
      this.revealElements.delete(name)
    }
  }

  /**
   * Refresh all ScrollTriggers
   */
  refresh() {
    ScrollTrigger.refresh()
  }

  /**
   * Kill all ScrollTriggers and clean up
   */
  killAll() {
    this.triggers.forEach(trigger => trigger.kill())
    this.parallaxElements.forEach(trigger => trigger.kill())
    this.revealElements.forEach(trigger => trigger.kill())
    
    this.triggers.clear()
    this.parallaxElements.clear()
    this.revealElements.clear()
    
    ScrollTrigger.killAll()
  }

  /**
   * Create animation based on options
   * @private
   */
  createAnimation(element, options) {
    const { from = {}, to = {}, duration = animationConfig.durations.medium } = options
    
    if (Object.keys(from).length > 0) {
      return gsap.fromTo(element, from, { ...to, duration })
    } else {
      return gsap.to(element, { ...to, duration })
    }
  }

  /**
   * ScrollTrigger event handlers
   * @private
   */
  onTriggerEnter(name, element) {
    console.debug(`ScrollTrigger "${name}" entered`)
    element.classList?.add('st-active')
  }

  onTriggerLeave(name, element) {
    console.debug(`ScrollTrigger "${name}" left`)
    element.classList?.remove('st-active')
  }

  onTriggerEnterBack(name, element) {
    console.debug(`ScrollTrigger "${name}" entered back`)
    element.classList?.add('st-active')
  }

  onTriggerLeaveBack(name, element) {
    console.debug(`ScrollTrigger "${name}" left back`)
    element.classList?.remove('st-active')
  }
}

// Create singleton instance
const scrollTriggerSystem = new ScrollTriggerSystem()

export default scrollTriggerSystem
export { ScrollTriggerSystem }