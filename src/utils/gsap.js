import animationManager from './AnimationManager.js'
import scrollTriggerSystem from './ScrollTriggerSystem.js'

// Re-export AnimationManager methods for backward compatibility
export const createTimeline = (name = 'default', options = {}) => {
  return animationManager.createTimeline(name, options)
}

export const fadeIn = (element, options = {}) => {
  return animationManager.presets.fadeIn(element, options)
}

export const slideUp = (element, options = {}) => {
  return animationManager.presets.slideUp(element, options)
}

export const scaleIn = (element, options = {}) => {
  return animationManager.presets.scaleIn(element, options)
}

export const staggerFadeIn = (elements, options = {}) => {
  return animationManager.presets.staggerFadeIn(elements, options)
}

export const scaleOnHover = (element) => {
  const tl = animationManager.createTimeline(`hover-${Date.now()}`)
  
  tl.to(element, {
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out',
  })
  
  return tl
}

// ScrollTrigger system methods
export const createScrollTrigger = (name, element, animationOptions, triggerOptions = {}) => {
  return scrollTriggerSystem.createScrollTrigger(name, element, animationOptions, triggerOptions)
}

export const createParallaxEffect = (name, element, options = {}) => {
  return scrollTriggerSystem.createParallaxEffect(name, element, options)
}

export const createContentReveal = (name, elements, options = {}) => {
  return scrollTriggerSystem.createContentReveal(name, elements, options)
}

export const createSectionAnimations = (sectionSelector, options = {}) => {
  return scrollTriggerSystem.createSectionAnimations(sectionSelector, options)
}

export const createHeroAnimations = (heroElement, options = {}) => {
  return scrollTriggerSystem.createHeroAnimations(heroElement, options)
}

// Cleanup function for animations
export const killAllAnimations = () => {
  animationManager.killAll()
  scrollTriggerSystem.killAll()
}

// Check for reduced motion preference
export const shouldReduceMotion = () => {
  return animationManager.checkReducedMotion()
}

// Refresh ScrollTriggers
export const refreshScrollTriggers = () => {
  scrollTriggerSystem.refresh()
}

// Export the manager instances
export { animationManager, scrollTriggerSystem }
export default animationManager