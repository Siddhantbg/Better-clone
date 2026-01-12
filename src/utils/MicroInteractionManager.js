import { gsap } from 'gsap';
import { animationConfig, visualEffects } from '../config/animations.js';
import reducedMotionManager from './ReducedMotionManager.js';

/**
 * Enhanced Micro-Interaction Manager for premium UI polish
 * Provides refined animations and interactions for buttons, cards, and form elements
 */
class MicroInteractionManager {
  constructor() {
    this.activeInteractions = new Map();
    this.hoverTimelines = new Map();
    this.clickTimelines = new Map();
    this.magneticElements = new Map();
    
    this.init();
  }

  init() {
    // Set up global interaction listeners
    this.setupGlobalListeners();
    
    // Initialize magnetic effects
    this.initializeMagneticEffects();
  }

  /**
   * Enhanced button hover effect with premium feel
   * @param {Element} element - Button element
   * @param {Object} options - Animation options
   */
  enhanceButtonHover(element, options = {}) {
    if (!element || reducedMotionManager.getReducedMotionPreference()) return;

    const config = {
      scale: options.scale || animationConfig.microInteractions.hover.scale,
      lift: options.lift || animationConfig.microInteractions.hover.lift,
      duration: options.duration || animationConfig.durations.ultraFast,
      ease: options.ease || animationConfig.easings.premium,
      glow: options.glow !== false,
      ...options
    };

    const timelineId = `button-hover-${element.id || Math.random()}`;
    
    // Create hover timeline
    const hoverTl = gsap.timeline({ paused: true });
    
    hoverTl
      .to(element, {
        scale: config.scale,
        y: -config.lift,
        duration: config.duration,
        ease: config.ease,
      })
      .to(element, {
        boxShadow: config.glow ? visualEffects.shadows.colored.primary : 'none',
        duration: config.duration * 0.8,
        ease: config.ease,
      }, 0);

    // Store timeline
    this.hoverTimelines.set(timelineId, hoverTl);

    // Add event listeners
    element.addEventListener('mouseenter', () => {
      hoverTl.play();
    });

    element.addEventListener('mouseleave', () => {
      hoverTl.reverse();
    });

    return timelineId;
  }

  /**
   * Enhanced click feedback with tactile response
   * @param {Element} element - Clickable element
   * @param {Object} options - Animation options
   */
  enhanceClickFeedback(element, options = {}) {
    if (!element || reducedMotionManager.getReducedMotionPreference()) return;

    const config = {
      scale: options.scale || animationConfig.microInteractions.click.scale,
      duration: options.duration || animationConfig.durations.instant,
      ease: options.ease || animationConfig.easings.snappy,
      ripple: options.ripple !== false,
      ...options
    };

    element.addEventListener('mousedown', (e) => {
      // Scale down animation
      gsap.to(element, {
        scale: config.scale,
        duration: config.duration,
        ease: config.ease,
      });

      // Ripple effect
      if (config.ripple) {
        this.createRippleEffect(element, e, options.rippleColor);
      }
    });

    element.addEventListener('mouseup', () => {
      // Scale back up
      gsap.to(element, {
        scale: 1,
        duration: config.duration * 1.5,
        ease: animationConfig.easings.bounceSubtle,
      });
    });

    element.addEventListener('mouseleave', () => {
      // Reset scale if mouse leaves during click
      gsap.to(element, {
        scale: 1,
        duration: config.duration,
        ease: config.ease,
      });
    });
  }

  /**
   * Create ripple effect on click
   * @param {Element} element - Target element
   * @param {Event} event - Click event
   * @param {string} color - Ripple color
   */
  createRippleEffect(element, event, color = 'rgba(255, 255, 255, 0.3)') {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      transform: scale(0);
    `;

    element.style.position = element.style.position || 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Animate ripple
    gsap.to(ripple, {
      scale: 1,
      opacity: 0,
      duration: animationConfig.microInteractions.ripple.duration,
      ease: animationConfig.easings.circOut,
      onComplete: () => {
        ripple.remove();
      }
    });
  }

  /**
   * Enhanced magnetic effect for premium interactions
   * @param {Element} element - Target element
   * @param {Object} options - Magnetic options
   */
  addMagneticEffect(element, options = {}) {
    if (!element || reducedMotionManager.getReducedMotionPreference()) return;

    const config = {
      strength: options.strength || animationConfig.microInteractions.magnetic.strength,
      radius: options.radius || animationConfig.microInteractions.magnetic.radius,
      duration: options.duration || animationConfig.durations.ultraFast,
      ease: options.ease || animationConfig.easings.premium,
      ...options
    };

    const magneticId = `magnetic-${element.id || Math.random()}`;
    let isActive = false;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < config.radius) {
        const strength = Math.max(0, 1 - distance / config.radius) * config.strength;
        const offsetX = deltaX * strength;
        const offsetY = deltaY * strength;
        
        gsap.to(element, {
          x: offsetX,
          y: offsetY,
          duration: config.duration,
          ease: config.ease,
        });
        
        isActive = true;
      } else if (isActive) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: config.duration * 1.5,
          ease: animationConfig.easings.elasticSubtle,
        });
        
        isActive = false;
      }
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: config.duration * 1.5,
        ease: animationConfig.easings.elasticSubtle,
      });
      isActive = false;
    };

    // Store listeners for cleanup
    this.magneticElements.set(magneticId, {
      element,
      handleMouseMove,
      handleMouseLeave,
    });

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return magneticId;
  }

  /**
   * Enhanced form input focus effects
   * @param {Element} input - Input element
   * @param {Object} options - Focus options
   */
  enhanceInputFocus(input, options = {}) {
    if (!input || reducedMotionManager.getReducedMotionPreference()) return;

    const config = {
      glowColor: options.glowColor || '#7C3AED',
      duration: options.duration || animationConfig.durations.fast,
      ease: options.ease || animationConfig.easings.premium,
      lift: options.lift !== false,
      ...options
    };

    const focusTimeline = gsap.timeline({ paused: true });
    
    focusTimeline
      .to(input, {
        boxShadow: `0 0 0 3px ${config.glowColor}40, 0 0 20px ${config.glowColor}20`,
        y: config.lift ? -2 : 0,
        duration: config.duration,
        ease: config.ease,
      });

    input.addEventListener('focus', () => {
      focusTimeline.play();
    });

    input.addEventListener('blur', () => {
      focusTimeline.reverse();
    });
  }

  /**
   * Enhanced card hover effects with 3D transforms
   * @param {Element} card - Card element
   * @param {Object} options - Card options
   */
  enhanceCardHover(card, options = {}) {
    if (!card || reducedMotionManager.getReducedMotionPreference()) return;

    const config = {
      lift: options.lift || 8,
      tilt: options.tilt || 2,
      scale: options.scale || 1.02,
      duration: options.duration || animationConfig.durations.fast,
      ease: options.ease || animationConfig.easings.premium,
      glow: options.glow !== false,
      ...options
    };

    const cardTimeline = gsap.timeline({ paused: true });
    
    cardTimeline
      .to(card, {
        y: -config.lift,
        rotateX: config.tilt,
        rotateY: config.tilt,
        scale: config.scale,
        duration: config.duration,
        ease: config.ease,
        transformPerspective: 1000,
      })
      .to(card, {
        boxShadow: config.glow ? visualEffects.shadows.xl : 'none',
        duration: config.duration * 0.8,
        ease: config.ease,
      }, 0);

    card.addEventListener('mouseenter', () => {
      cardTimeline.play();
    });

    card.addEventListener('mouseleave', () => {
      cardTimeline.reverse();
    });
  }

  /**
   * Enhanced loading state animations
   * @param {Element} element - Loading element
   * @param {Object} options - Loading options
   */
  enhanceLoadingState(element, options = {}) {
    if (!element) return;

    const config = {
      type: options.type || 'pulse', // 'pulse', 'shimmer', 'skeleton'
      duration: options.duration || 1.5,
      ease: options.ease || animationConfig.easings.smooth,
      ...options
    };

    let loadingAnimation;

    switch (config.type) {
      case 'pulse':
        loadingAnimation = gsap.to(element, {
          opacity: 0.5,
          duration: config.duration,
          ease: config.ease,
          yoyo: true,
          repeat: -1,
        });
        break;

      case 'shimmer':
        // Add shimmer gradient background
        element.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)';
        element.style.backgroundSize = '200% 100%';
        
        loadingAnimation = gsap.to(element, {
          backgroundPosition: '200% 0',
          duration: config.duration,
          ease: 'none',
          repeat: -1,
        });
        break;

      case 'skeleton':
        loadingAnimation = gsap.timeline({ repeat: -1 })
          .to(element, {
            opacity: 0.3,
            duration: config.duration / 2,
            ease: config.ease,
          })
          .to(element, {
            opacity: 0.7,
            duration: config.duration / 2,
            ease: config.ease,
          });
        break;
    }

    return {
      stop: () => {
        if (loadingAnimation) {
          loadingAnimation.kill();
        }
      }
    };
  }

  /**
   * Setup global interaction listeners
   */
  setupGlobalListeners() {
    // Auto-enhance buttons with data attributes
    document.addEventListener('DOMContentLoaded', () => {
      // Auto-enhance buttons
      document.querySelectorAll('[data-enhance="button"]').forEach(button => {
        this.enhanceButtonHover(button);
        this.enhanceClickFeedback(button);
      });

      // Auto-enhance magnetic elements
      document.querySelectorAll('[data-enhance="magnetic"]').forEach(element => {
        this.addMagneticEffect(element);
      });

      // Auto-enhance cards
      document.querySelectorAll('[data-enhance="card"]').forEach(card => {
        this.enhanceCardHover(card);
      });

      // Auto-enhance inputs
      document.querySelectorAll('[data-enhance="input"]').forEach(input => {
        this.enhanceInputFocus(input);
      });
    });
  }

  /**
   * Initialize magnetic effects for existing elements
   */
  initializeMagneticEffects() {
    // This will be called when the manager is initialized
    // Additional magnetic elements can be added here
  }

  /**
   * Cleanup all interactions
   */
  cleanup() {
    // Kill all timelines
    this.hoverTimelines.forEach(timeline => timeline.kill());
    this.clickTimelines.forEach(timeline => timeline.kill());
    
    // Remove magnetic listeners
    this.magneticElements.forEach(({ element, handleMouseMove, handleMouseLeave }) => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    });

    // Clear maps
    this.hoverTimelines.clear();
    this.clickTimelines.clear();
    this.magneticElements.clear();
  }

  /**
   * Get interaction statistics
   */
  getStats() {
    return {
      activeHoverTimelines: this.hoverTimelines.size,
      activeClickTimelines: this.clickTimelines.size,
      magneticElements: this.magneticElements.size,
    };
  }
}

// Create singleton instance
const microInteractionManager = new MicroInteractionManager();

export default microInteractionManager;
export { MicroInteractionManager };