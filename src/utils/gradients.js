// Gradient Utility Functions for Modern Crypto UI
import { themeConfig, COLORS } from '../config/theme.js';

/**
 * Gradient utility functions for creating and managing gradient effects
 * Supports hero sections, cards, buttons, and animated transitions
 */

// Gradient presets based on theme configuration
export const GRADIENT_PRESETS = {
  // Hero section gradients
  hero: {
    primary: `radial-gradient(circle at 50% 50%, ${COLORS.VIOLET} 0%, ${COLORS.PURPLE} 50%, ${COLORS.DARK_NAVY} 100%)`,
    animated: `radial-gradient(circle at var(--gradient-x, 50%) var(--gradient-y, 50%), ${COLORS.VIOLET} 0%, ${COLORS.PURPLE} 30%, ${COLORS.DARK_NAVY} 70%)`,
    particles: `conic-gradient(from 0deg at 50% 50%, ${COLORS.VIOLET}, ${COLORS.PURPLE}, ${COLORS.GOLD}, ${COLORS.VIOLET})`,
  },
  
  // Card gradients
  card: {
    glass: `linear-gradient(135deg, rgba(26, 27, 58, 0.8) 0%, rgba(15, 15, 35, 0.4) 100%)`,
    hover: `linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(15, 15, 35, 0.6) 100%)`,
    border: `linear-gradient(90deg, ${COLORS.VIOLET}, ${COLORS.PURPLE}, ${COLORS.GOLD})`,
    subtle: `linear-gradient(180deg, rgba(26, 27, 58, 0.6) 0%, rgba(15, 15, 35, 0.8) 100%)`,
  },
  
  // Button gradients
  button: {
    primary: `linear-gradient(45deg, ${COLORS.VIOLET}, ${COLORS.PURPLE})`,
    animated: `linear-gradient(45deg, ${COLORS.VIOLET}, ${COLORS.PURPLE}, ${COLORS.GOLD}, ${COLORS.VIOLET})`,
    hover: `linear-gradient(45deg, ${COLORS.PURPLE}, ${COLORS.VIOLET}, ${COLORS.GOLD})`,
    glow: `radial-gradient(circle, ${COLORS.VIOLET}40, transparent 70%)`,
  },
  
  // Text gradients
  text: {
    primary: `linear-gradient(90deg, ${COLORS.VIOLET}, ${COLORS.PURPLE})`,
    accent: `linear-gradient(90deg, ${COLORS.PURPLE}, ${COLORS.GOLD})`,
    rainbow: `linear-gradient(90deg, ${COLORS.VIOLET}, ${COLORS.PURPLE}, ${COLORS.GOLD}, ${COLORS.VIOLET})`,
  },
  
  // Background gradients
  background: {
    mesh: `radial-gradient(circle at 20% 80%, ${COLORS.VIOLET}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${COLORS.PURPLE}20 0%, transparent 50%)`,
    overlay: `linear-gradient(180deg, ${COLORS.DARK_NAVY}00 0%, ${COLORS.DARK_NAVY}80 100%)`,
    section: `linear-gradient(135deg, ${COLORS.DARK_NAVY} 0%, ${COLORS.DARK_BLUE} 100%)`,
  }
};

/**
 * Create a custom gradient with specified colors and direction
 * @param {Array} colors - Array of color values
 * @param {string} direction - Gradient direction (e.g., '45deg', 'to right')
 * @param {string} type - Gradient type ('linear' or 'radial')
 * @returns {string} CSS gradient string
 */
export const createGradient = (colors, direction = '45deg', type = 'linear') => {
  if (!Array.isArray(colors) || colors.length < 2) {
    throw new Error('Gradient requires at least 2 colors');
  }
  
  const colorStops = colors.join(', ');
  
  if (type === 'radial') {
    return `radial-gradient(${direction}, ${colorStops})`;
  }
  
  return `linear-gradient(${direction}, ${colorStops})`;
};

/**
 * Create an animated gradient with CSS custom properties
 * @param {string} baseGradient - Base gradient string
 * @param {Object} animationProps - Animation properties
 * @returns {Object} CSS properties for animated gradient
 */
export const createAnimatedGradient = (baseGradient, animationProps = {}) => {
  const {
    duration = '3s',
    timing = 'ease-in-out',
    iteration = 'infinite',
    direction = 'alternate'
  } = animationProps;
  
  return {
    background: baseGradient,
    backgroundSize: '200% 200%',
    animation: `gradientShift ${duration} ${timing} ${iteration} ${direction}`,
  };
};

/**
 * Get gradient CSS properties for a specific preset
 * @param {string} category - Gradient category (hero, card, button, etc.)
 * @param {string} variant - Gradient variant within category
 * @returns {Object} CSS properties object
 */
export const getGradientStyles = (category, variant = 'primary') => {
  const gradient = GRADIENT_PRESETS[category]?.[variant];
  
  if (!gradient) {
    console.warn(`Gradient preset not found: ${category}.${variant}`);
    return { background: COLORS.DARK_NAVY };
  }
  
  return {
    background: gradient,
  };
};

/**
 * Create a gradient with smooth color transitions
 * @param {Array} colorStops - Array of {color, position} objects
 * @param {string} direction - Gradient direction
 * @returns {string} CSS gradient with smooth transitions
 */
export const createSmoothGradient = (colorStops, direction = '45deg') => {
  if (!Array.isArray(colorStops) || colorStops.length < 2) {
    throw new Error('Smooth gradient requires at least 2 color stops');
  }
  
  const stops = colorStops.map(stop => {
    if (typeof stop === 'string') {
      return stop;
    }
    return `${stop.color} ${stop.position || ''}`.trim();
  }).join(', ');
  
  return `linear-gradient(${direction}, ${stops})`;
};

/**
 * Generate CSS keyframes for gradient animations
 * @param {string} name - Animation name
 * @param {Array} gradients - Array of gradient strings for keyframes
 * @returns {string} CSS keyframes string
 */
export const generateGradientKeyframes = (name, gradients) => {
  if (!Array.isArray(gradients) || gradients.length < 2) {
    throw new Error('Gradient animation requires at least 2 gradient states');
  }
  
  const step = 100 / (gradients.length - 1);
  const keyframes = gradients.map((gradient, index) => {
    const percentage = index * step;
    return `${percentage}% { background: ${gradient}; }`;
  }).join('\n  ');
  
  return `@keyframes ${name} {\n  ${keyframes}\n}`;
};

/**
 * Create hover gradient effect
 * @param {string} baseGradient - Base gradient
 * @param {string} hoverGradient - Hover state gradient
 * @param {string} transition - Transition duration
 * @returns {Object} CSS properties for hover effect
 */
export const createHoverGradient = (baseGradient, hoverGradient, transition = '0.3s ease') => {
  return {
    background: baseGradient,
    transition: `background ${transition}`,
    '&:hover': {
      background: hoverGradient,
    },
  };
};

/**
 * Validate gradient string format
 * @param {string} gradient - Gradient string to validate
 * @returns {boolean} True if valid gradient format
 */
export const validateGradient = (gradient) => {
  if (typeof gradient !== 'string') return false;
  
  const gradientRegex = /(linear-gradient|radial-gradient|conic-gradient)\s*\([^)]+\)/;
  return gradientRegex.test(gradient);
};

/**
 * Get all available gradient presets
 * @returns {Object} All gradient presets organized by category
 */
export const getAllGradientPresets = () => {
  return { ...GRADIENT_PRESETS };
};

/**
 * Create a gradient mesh background
 * @param {Array} positions - Array of {x, y, color, size} objects
 * @returns {string} CSS background with multiple radial gradients
 */
export const createGradientMesh = (positions) => {
  if (!Array.isArray(positions) || positions.length === 0) {
    return GRADIENT_PRESETS.background.mesh;
  }
  
  const gradients = positions.map(pos => {
    const { x = 50, y = 50, color = COLORS.VIOLET, size = 50 } = pos;
    return `radial-gradient(circle at ${x}% ${y}%, ${color}40 0%, transparent ${size}%)`;
  });
  
  return gradients.join(', ');
};

// Export default gradient utilities
export default {
  GRADIENT_PRESETS,
  createGradient,
  createAnimatedGradient,
  getGradientStyles,
  createSmoothGradient,
  generateGradientKeyframes,
  createHoverGradient,
  validateGradient,
  getAllGradientPresets,
  createGradientMesh,
};