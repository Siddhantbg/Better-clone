// Gradient Mesh Utility Functions
import { COLORS } from '../config/theme.js';

/**
 * Gradient mesh configuration presets for different sections
 */
export const GRADIENT_MESH_PRESETS = {
  hero: {
    nodeCount: 8,
    connectionDistance: 200,
    animationSpeed: 0.5,
    colors: [COLORS.VIOLET, COLORS.PURPLE, COLORS.GOLD],
    opacity: 0.6,
    geometricPatterns: true,
    constellationLines: true,
  },
  
  section: {
    nodeCount: 6,
    connectionDistance: 150,
    animationSpeed: 0.3,
    colors: [COLORS.PURPLE, COLORS.VIOLET],
    opacity: 0.4,
    geometricPatterns: true,
    constellationLines: false,
  },
  
  card: {
    nodeCount: 4,
    connectionDistance: 100,
    animationSpeed: 0.2,
    colors: [COLORS.VIOLET, COLORS.PURPLE],
    opacity: 0.3,
    geometricPatterns: false,
    constellationLines: true,
  },
  
  subtle: {
    nodeCount: 3,
    connectionDistance: 80,
    animationSpeed: 0.1,
    colors: [COLORS.PURPLE],
    opacity: 0.2,
    geometricPatterns: false,
    constellationLines: false,
  },
  
  intense: {
    nodeCount: 12,
    connectionDistance: 250,
    animationSpeed: 0.8,
    colors: [COLORS.VIOLET, COLORS.PURPLE, COLORS.GOLD, COLORS.VIOLET],
    opacity: 0.8,
    geometricPatterns: true,
    constellationLines: true,
  },
};

/**
 * Get gradient mesh configuration for a specific preset
 * @param {string} preset - Preset name (hero, section, card, subtle, intense)
 * @returns {Object} Gradient mesh configuration
 */
export const getGradientMeshConfig = (preset = 'hero') => {
  const config = GRADIENT_MESH_PRESETS[preset];
  
  if (!config) {
    console.warn(`Gradient mesh preset not found: ${preset}. Using hero preset.`);
    return GRADIENT_MESH_PRESETS.hero;
  }
  
  return { ...config };
};

/**
 * Create custom gradient mesh configuration
 * @param {Object} options - Custom configuration options
 * @returns {Object} Gradient mesh configuration
 */
export const createGradientMeshConfig = (options = {}) => {
  const defaults = GRADIENT_MESH_PRESETS.hero;
  
  return {
    nodeCount: options.nodeCount || defaults.nodeCount,
    connectionDistance: options.connectionDistance || defaults.connectionDistance,
    animationSpeed: options.animationSpeed || defaults.animationSpeed,
    colors: options.colors || defaults.colors,
    opacity: options.opacity || defaults.opacity,
    geometricPatterns: options.geometricPatterns !== undefined ? options.geometricPatterns : defaults.geometricPatterns,
    constellationLines: options.constellationLines !== undefined ? options.constellationLines : defaults.constellationLines,
  };
};

/**
 * Validate gradient mesh configuration
 * @param {Object} config - Configuration to validate
 * @returns {boolean} True if configuration is valid
 */
export const validateGradientMeshConfig = (config) => {
  if (!config || typeof config !== 'object') {
    return false;
  }
  
  const requiredFields = ['nodeCount', 'connectionDistance', 'animationSpeed', 'colors', 'opacity'];
  
  for (const field of requiredFields) {
    if (!(field in config)) {
      console.warn(`Missing required field in gradient mesh config: ${field}`);
      return false;
    }
  }
  
  // Validate ranges
  if (config.nodeCount < 1 || config.nodeCount > 20) {
    console.warn('Node count should be between 1 and 20');
    return false;
  }
  
  if (config.connectionDistance < 50 || config.connectionDistance > 500) {
    console.warn('Connection distance should be between 50 and 500');
    return false;
  }
  
  if (config.animationSpeed < 0 || config.animationSpeed > 2) {
    console.warn('Animation speed should be between 0 and 2');
    return false;
  }
  
  if (config.opacity < 0 || config.opacity > 1) {
    console.warn('Opacity should be between 0 and 1');
    return false;
  }
  
  if (!Array.isArray(config.colors) || config.colors.length === 0) {
    console.warn('Colors should be a non-empty array');
    return false;
  }
  
  return true;
};

/**
 * Generate time-based gradient animation keyframes
 * @param {Array} colors - Array of color values
 * @param {number} steps - Number of animation steps
 * @returns {Array} Array of gradient configurations for animation
 */
export const generateGradientAnimationSteps = (colors, steps = 10) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error('At least 1 color required for gradient animation');
  }
  
  // If only one color, create variations by adjusting opacity and scale
  if (colors.length === 1) {
    const animationSteps = [];
    const baseColor = colors[0];
    
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      animationSteps.push({
        colors: [baseColor],
        opacity: 0.4 + 0.4 * Math.sin(progress * Math.PI * 2),
        scale: 0.8 + 0.4 * Math.cos(progress * Math.PI * 2),
      });
    }
    
    return animationSteps;
  }
  
  const animationSteps = [];
  
  for (let i = 0; i < steps; i++) {
    const progress = i / (steps - 1);
    const rotatedColors = [...colors];
    
    // Rotate colors based on progress
    const rotationIndex = Math.floor(progress * colors.length);
    for (let j = 0; j < rotationIndex; j++) {
      rotatedColors.push(rotatedColors.shift());
    }
    
    animationSteps.push({
      colors: rotatedColors,
      opacity: 0.4 + 0.4 * Math.sin(progress * Math.PI * 2),
      scale: 0.8 + 0.4 * Math.cos(progress * Math.PI * 2),
    });
  }
  
  return animationSteps;
};

/**
 * Calculate optimal node count based on container size
 * @param {number} width - Container width
 * @param {number} height - Container height
 * @returns {number} Optimal node count
 */
export const calculateOptimalNodeCount = (width, height) => {
  const area = width * height;
  const density = area / 50000; // Adjust density factor as needed
  
  return Math.max(3, Math.min(15, Math.floor(density)));
};

/**
 * Generate geometric pattern configurations
 * @param {string} patternType - Type of pattern (hexagon, triangle, circle, mixed)
 * @returns {Object} Pattern configuration
 */
export const generateGeometricPatternConfig = (patternType = 'mixed') => {
  const patterns = {
    hexagon: {
      shapes: ['hexagon'],
      sizes: [20, 30, 40],
      rotationSpeeds: [0.1, 0.15, 0.2],
    },
    triangle: {
      shapes: ['triangle'],
      sizes: [15, 25, 35],
      rotationSpeeds: [0.15, 0.2, 0.25],
    },
    circle: {
      shapes: ['circle'],
      sizes: [10, 20, 30],
      rotationSpeeds: [0.1, 0.12, 0.15],
    },
    mixed: {
      shapes: ['hexagon', 'triangle', 'circle'],
      sizes: [15, 20, 25, 30, 35],
      rotationSpeeds: [0.1, 0.15, 0.2, 0.25],
    },
  };
  
  return patterns[patternType] || patterns.mixed;
};

/**
 * Create constellation connection rules
 * @param {number} maxDistance - Maximum connection distance
 * @param {number} maxConnections - Maximum connections per node
 * @returns {Object} Connection rules
 */
export const createConstellationRules = (maxDistance = 200, maxConnections = 3) => {
  return {
    maxDistance,
    maxConnections,
    fadeDistance: maxDistance * 0.8,
    nodeSize: 2,
    lineWidth: 1,
    pulseSpeed: 0.5,
  };
};

/**
 * Performance optimization settings based on device capabilities
 * @returns {Object} Optimized settings
 */
export const getPerformanceOptimizedSettings = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  
  if (isMobile || isLowEnd) {
    return {
      nodeCount: 4,
      connectionDistance: 120,
      animationSpeed: 0.2,
      geometricPatterns: false,
      constellationLines: true,
      opacity: 0.4,
    };
  }
  
  return GRADIENT_MESH_PRESETS.hero;
};

// Export all utilities
export default {
  GRADIENT_MESH_PRESETS,
  getGradientMeshConfig,
  createGradientMeshConfig,
  validateGradientMeshConfig,
  generateGradientAnimationSteps,
  calculateOptimalNodeCount,
  generateGeometricPatternConfig,
  createConstellationRules,
  getPerformanceOptimizedSettings,
};