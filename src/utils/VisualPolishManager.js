import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationConfig, colorTransitions, visualEffects } from '../config/animations.js';
import microInteractionManager from './MicroInteractionManager.js';
import reducedMotionManager from './ReducedMotionManager.js';

/**
 * Enhanced Visual Polish Manager
 * Coordinates all visual enhancements, animations, and micro-interactions
 * for a premium user experience
 */
class VisualPolishManager {
  constructor() {
    this.polishElements = new Map();
    this.colorTransitionTimelines = new Map();
    this.scrollIndicators = new Map();
    this.isInitialized = false;
    
    this.init();
  }

  /**
   * Initialize the visual polish manager
   */
  init() {
    if (this.isInitialized) return;
    
    // Setup scroll progress indicator
    this.setupScrollProgressIndicator();
    
    // Setup enhanced page transitions
    this.setupPageTransitions();
    
    // Setup global visual enhancements
    this.setupGlobalEnhancements();
    
    // Setup color transition system
    this.setupColorTransitionSystem();
    
    // Auto-enhance elements with data attributes
    this.autoEnhanceElements();
    
    this.isInitialized = true;
  }

  /**
   * Setup scroll progress indicator
   */
  setupScrollProgressIndicator() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator-enhanced';
    progressBar.id = 'scroll-progress-indicator';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    const updateProgress = () => {
      // Validate progressBar still exists in DOM
      if (!progressBar || !progressBar.parentNode) return;
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      
      gsap.to(progressBar, {
        scaleX: progress,
        duration: 0.1,
        ease: 'none',
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    
    this.scrollIndicators.set('main', { element: progressBar, updateProgress });
  }

  /**
   * Setup enhanced page transitions
   */
  setupPageTransitions() {
    // Page load animation
    const pageLoadTimeline = gsap.timeline();
    
    // Check if elements exist before animating
    const fadeInElements = document.querySelectorAll('[data-animate="fade-in"]');
    const slideUpElements = document.querySelectorAll('[data-animate="slide-up"]');
    
    pageLoadTimeline
      .from('body', {
        opacity: 0,
        duration: animationConfig.durations.fast,
        ease: animationConfig.easings.premium,
      });
    
    // Only animate if elements exist
    if (fadeInElements.length > 0) {
      pageLoadTimeline.from(fadeInElements, {
        opacity: 0,
        y: 30,
        duration: animationConfig.durations.medium,
        ease: animationConfig.easings.smooth,
        stagger: animationConfig.stagger.cards,
      }, '-=0.2');
    }
    
    if (slideUpElements.length > 0) {
      pageLoadTimeline.from(slideUpElements, {
        opacity: 0,
        y: 50,
        duration: animationConfig.durations.medium,
        ease: animationConfig.easings.bounceSubtle,
        stagger: animationConfig.stagger.text,
      }, '-=0.3');
    }

    // Store timeline for cleanup
    this.polishElements.set('page-load', pageLoadTimeline);
  }

  /**
   * Setup global visual enhancements
   */
  setupGlobalEnhancements() {
    // Enhanced focus management
    this.setupFocusManagement();
    
    // Enhanced loading states
    this.setupLoadingStates();
    
    // Enhanced tooltips
    this.setupTooltips();
    
    // Enhanced modal transitions
    this.setupModalTransitions();
  }

  /**
   * Setup enhanced focus management
   */
  setupFocusManagement() {
    let lastFocusedElement = null;

    document.addEventListener('focusin', (e) => {
      const element = e.target;
      
      // Skip if reduced motion is enabled or element is null
      if (reducedMotionManager.getReducedMotionPreference() || !element) return;
      
      // Add focus ring animation
      if (element.matches('button, input, select, textarea, a, [tabindex]')) {
        gsap.to(element, {
          boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.3)',
          duration: animationConfig.durations.ultraFast,
          ease: animationConfig.easings.premium,
        });
        
        lastFocusedElement = element;
      }
    });

    document.addEventListener('focusout', (e) => {
      const element = e.target;
      
      if (element === lastFocusedElement && element) {
        gsap.to(element, {
          boxShadow: 'none',
          duration: animationConfig.durations.ultraFast,
          ease: animationConfig.easings.premium,
        });
      }
    });
  }

  /**
   * Setup enhanced loading states
   */
  setupLoadingStates() {
    // Global loading overlay
    const createLoadingOverlay = () => {
      const overlay = document.createElement('div');
      overlay.className = 'loading-overlay-enhanced';
      overlay.innerHTML = `
        <div class="loading-spinner-enhanced">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
      `;
      
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 35, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      `;
      
      document.body.appendChild(overlay);
      return overlay;
    };

    // Store loading overlay creator
    this.polishElements.set('loading-overlay-creator', createLoadingOverlay);
  }

  /**
   * Setup enhanced tooltips
   */
  setupTooltips() {
    let activeTooltip = null;

    const showTooltip = (element, text) => {
      if (activeTooltip) {
        hideTooltip();
      }

      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip-enhanced';
      tooltip.textContent = text;
      
      document.body.appendChild(tooltip);
      
      // Position tooltip
      const rect = element.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
      
      // Show tooltip
      requestAnimationFrame(() => {
        tooltip.classList.add('show');
      });
      
      activeTooltip = tooltip;
    };

    const hideTooltip = () => {
      if (activeTooltip) {
        activeTooltip.classList.remove('show');
        setTimeout(() => {
          if (activeTooltip && activeTooltip.parentNode) {
            activeTooltip.parentNode.removeChild(activeTooltip);
          }
          activeTooltip = null;
        }, 200);
      }
    };

    // Setup tooltip listeners
    document.addEventListener('mouseenter', (e) => {
      const element = e.target;
      const tooltipText = element.getAttribute('data-tooltip');
      
      if (tooltipText) {
        showTooltip(element, tooltipText);
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      const element = e.target;
      
      if (element.hasAttribute('data-tooltip')) {
        hideTooltip();
      }
    }, true);
  }

  /**
   * Setup enhanced modal transitions
   */
  setupModalTransitions() {
    const showModal = (modal) => {
      if (!modal) return;
      
      const backdrop = modal.querySelector('.modal-backdrop-enhanced');
      const content = modal.querySelector('.modal-enhanced');
      
      if (backdrop) {
        gsap.set(backdrop, { opacity: 0 });
        gsap.to(backdrop, {
          opacity: 1,
          duration: animationConfig.durations.fast,
          ease: animationConfig.easings.premium,
        });
      }
      
      if (content) {
        gsap.set(content, { 
          opacity: 0, 
          scale: 0.95, 
          y: 20 
        });
        gsap.to(content, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: animationConfig.durations.medium,
          ease: animationConfig.easings.bounceSubtle,
          delay: 0.1,
        });
      }
    };

    const hideModal = (modal) => {
      if (!modal) return null;
      
      const backdrop = modal.querySelector('.modal-backdrop-enhanced');
      const content = modal.querySelector('.modal-enhanced');
      
      const timeline = gsap.timeline();
      
      if (content) {
        timeline.to(content, {
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: animationConfig.durations.fast,
          ease: animationConfig.easings.premium,
        });
      }
      
      if (backdrop) {
        timeline.to(backdrop, {
          opacity: 0,
          duration: animationConfig.durations.fast,
          ease: animationConfig.easings.premium,
        }, '-=0.1');
      }
      
      return timeline;
    };

    // Store modal functions
    this.polishElements.set('modal-functions', { showModal, hideModal });
  }

  /**
   * Setup color transition system
   */
  setupColorTransitionSystem() {
    const transitionColor = (element, fromColor, toColor, duration = colorTransitions.duration) => {
      const timeline = gsap.timeline();
      
      // Create temporary color object for interpolation
      const colorObj = { r: 0, g: 0, b: 0 };
      
      timeline.to(colorObj, {
        duration: duration,
        ease: colorTransitions.ease,
        onUpdate: () => {
          // Update element color based on interpolated values
          const interpolatedColor = this.interpolateColor(fromColor, toColor, timeline.progress());
          element.style.color = interpolatedColor;
        }
      });
      
      return timeline;
    };

    // Store color transition function
    this.polishElements.set('color-transition', transitionColor);
  }

  /**
   * Auto-enhance elements with data attributes
   */
  autoEnhanceElements() {
    // Enhanced buttons
    const buttons = document.querySelectorAll('[data-enhance="button"]');
    if (buttons.length > 0) {
      buttons.forEach(button => {
        microInteractionManager.enhanceButtonHover(button);
        microInteractionManager.enhanceClickFeedback(button);
      });
    }

    // Enhanced cards
    const cards = document.querySelectorAll('[data-enhance="card"]');
    if (cards.length > 0) {
      cards.forEach(card => {
        microInteractionManager.enhanceCardHover(card);
      });
    }

    // Enhanced inputs
    const inputs = document.querySelectorAll('[data-enhance="input"]');
    if (inputs.length > 0) {
      inputs.forEach(input => {
        microInteractionManager.enhanceInputFocus(input);
      });
    }

    // Enhanced magnetic elements
    const magneticElements = document.querySelectorAll('[data-enhance="magnetic"]');
    if (magneticElements.length > 0) {
      magneticElements.forEach(element => {
        microInteractionManager.addMagneticEffect(element);
      });
    }

    // Enhanced loading elements
    const loadingElements = document.querySelectorAll('[data-enhance="loading"]');
    if (loadingElements.length > 0) {
      loadingElements.forEach(element => {
        const type = element.getAttribute('data-loading-type') || 'pulse';
        microInteractionManager.enhanceLoadingState(element, { type });
      });
    }
  }

  /**
   * Interpolate between two colors
   * @param {string} color1 - Start color (hex)
   * @param {string} color2 - End color (hex)
   * @param {number} factor - Interpolation factor (0-1)
   * @returns {string} Interpolated color
   */
  interpolateColor(color1, color2, factor) {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Show loading overlay
   */
  showLoading() {
    const creator = this.polishElements.get('loading-overlay-creator');
    if (creator) {
      const overlay = creator();
      if (overlay) {
        gsap.to(overlay, {
          opacity: 1,
          pointerEvents: 'all',
          duration: animationConfig.durations.fast,
          ease: animationConfig.easings.premium,
        });
      }
      return overlay;
    }
  }

  /**
   * Hide loading overlay
   */
  hideLoading(overlay) {
    if (overlay && overlay.parentNode) {
      gsap.to(overlay, {
        opacity: 0,
        pointerEvents: 'none',
        duration: animationConfig.durations.fast,
        ease: animationConfig.easings.premium,
        onComplete: () => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }
      });
    }
  }

  /**
   * Show modal with enhanced transitions
   */
  showModal(modal) {
    const functions = this.polishElements.get('modal-functions');
    if (functions) {
      functions.showModal(modal);
    }
  }

  /**
   * Hide modal with enhanced transitions
   */
  hideModal(modal) {
    const functions = this.polishElements.get('modal-functions');
    if (functions) {
      return functions.hideModal(modal);
    }
  }

  /**
   * Transition element color
   */
  transitionColor(element, fromColor, toColor, duration) {
    const transitionFn = this.polishElements.get('color-transition');
    if (transitionFn) {
      return transitionFn(element, fromColor, toColor, duration);
    }
  }

  /**
   * Cleanup all visual polish elements
   */
  cleanup() {
    // Kill all timelines
    this.polishElements.forEach((element, key) => {
      if (element && typeof element.kill === 'function') {
        element.kill();
      }
    });

    // Remove scroll indicators
    this.scrollIndicators.forEach(({ element }) => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    // Clear maps
    this.polishElements.clear();
    this.colorTransitionTimelines.clear();
    this.scrollIndicators.clear();
  }

  /**
   * Get visual polish statistics
   */
  getStats() {
    return {
      polishElements: this.polishElements.size,
      colorTransitions: this.colorTransitionTimelines.size,
      scrollIndicators: this.scrollIndicators.size,
      isInitialized: this.isInitialized,
    };
  }
}

// Create singleton instance
const visualPolishManager = new VisualPolishManager();

export default visualPolishManager;
export { VisualPolishManager };