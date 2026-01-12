// React hook for managing gradient animations
import { useState, useEffect, useCallback, useRef } from 'react';
import { GRADIENT_PRESETS, createAnimatedGradient } from '../utils/gradients.js';

/**
 * Custom hook for managing gradient animations
 * @param {Object} options - Animation configuration options
 * @returns {Object} Gradient animation state and controls
 */
export const useGradientAnimation = (options = {}) => {
  const {
    category = 'hero',
    variant = 'primary',
    duration = '3s',
    autoStart = true,
    loop = true,
    reducedMotion = false
  } = options;

  const [isAnimating, setIsAnimating] = useState(autoStart);
  const [currentGradient, setCurrentGradient] = useState('');
  const animationRef = useRef(null);
  const elementRef = useRef(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    return reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [reducedMotion]);

  // Initialize gradient
  useEffect(() => {
    const gradient = GRADIENT_PRESETS[category]?.[variant] || GRADIENT_PRESETS.hero.primary;
    setCurrentGradient(gradient);
  }, [category, variant]);

  // Start animation
  const startAnimation = useCallback(() => {
    if (prefersReducedMotion()) return;
    
    setIsAnimating(true);
    
    if (elementRef.current) {
      const animatedStyles = createAnimatedGradient(currentGradient, {
        duration,
        iteration: loop ? 'infinite' : '1',
      });
      
      Object.assign(elementRef.current.style, animatedStyles);
    }
  }, [currentGradient, duration, loop, prefersReducedMotion]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    
    if (elementRef.current) {
      elementRef.current.style.animation = 'none';
      elementRef.current.style.background = currentGradient;
    }
  }, [currentGradient]);

  // Toggle animation
  const toggleAnimation = useCallback(() => {
    if (isAnimating) {
      stopAnimation();
    } else {
      startAnimation();
    }
  }, [isAnimating, startAnimation, stopAnimation]);

  // Update gradient
  const updateGradient = useCallback((newCategory, newVariant) => {
    const gradient = GRADIENT_PRESETS[newCategory]?.[newVariant];
    if (gradient) {
      setCurrentGradient(gradient);
      
      if (elementRef.current) {
        if (isAnimating && !prefersReducedMotion()) {
          const animatedStyles = createAnimatedGradient(gradient, { duration });
          Object.assign(elementRef.current.style, animatedStyles);
        } else {
          elementRef.current.style.background = gradient;
        }
      }
    }
  }, [duration, isAnimating, prefersReducedMotion]);

  // Auto-start effect
  useEffect(() => {
    if (autoStart && currentGradient) {
      startAnimation();
    }
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [autoStart, currentGradient, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementRef.current) {
        elementRef.current.style.animation = 'none';
      }
    };
  }, []);

  return {
    elementRef,
    currentGradient,
    isAnimating,
    startAnimation,
    stopAnimation,
    toggleAnimation,
    updateGradient,
    gradientStyles: {
      background: currentGradient,
      ...(isAnimating && !prefersReducedMotion() ? createAnimatedGradient(currentGradient, { duration }) : {})
    }
  };
};

/**
 * Hook for creating hover gradient effects
 * @param {string} baseGradient - Base gradient
 * @param {string} hoverGradient - Hover state gradient
 * @param {string} transition - Transition duration
 * @returns {Object} Hover gradient state and handlers
 */
export const useHoverGradient = (baseGradient, hoverGradient, transition = '0.3s ease') => {
  const [isHovered, setIsHovered] = useState(false);
  const elementRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (elementRef.current) {
      elementRef.current.style.background = hoverGradient;
    }
  }, [hoverGradient]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (elementRef.current) {
      elementRef.current.style.background = baseGradient;
    }
  }, [baseGradient]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.background = baseGradient;
      elementRef.current.style.transition = `background ${transition}`;
    }
  }, [baseGradient, transition]);

  return {
    elementRef,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    gradientStyles: {
      background: isHovered ? hoverGradient : baseGradient,
      transition: `background ${transition}`,
    }
  };
};

/**
 * Hook for managing gradient mesh backgrounds
 * @param {Array} positions - Array of gradient positions
 * @param {Object} options - Animation options
 * @returns {Object} Gradient mesh state and controls
 */
export const useGradientMesh = (positions = [], options = {}) => {
  const { animate = true, duration = '6s' } = options;
  const [meshGradient, setMeshGradient] = useState('');
  const elementRef = useRef(null);

  useEffect(() => {
    const createMesh = () => {
      if (positions.length === 0) {
        return GRADIENT_PRESETS.background.mesh;
      }

      const gradients = positions.map(pos => {
        const { x = 50, y = 50, color = '#7C3AED', size = 50, opacity = 0.3 } = pos;
        return `radial-gradient(circle at ${x}% ${y}%, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent ${size}%)`;
      });

      return gradients.join(', ');
    };

    const gradient = createMesh();
    setMeshGradient(gradient);

    if (elementRef.current) {
      elementRef.current.style.background = gradient;
      
      if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elementRef.current.style.animation = `gradientPulse ${duration} ease-in-out infinite`;
      }
    }
  }, [positions, animate, duration]);

  return {
    elementRef,
    meshGradient,
    meshStyles: {
      background: meshGradient,
      ...(animate ? { animation: `gradientPulse ${duration} ease-in-out infinite` } : {})
    }
  };
};

export default useGradientAnimation;