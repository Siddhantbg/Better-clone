// Enhanced Animation Configuration for GSAP and other libraries
export const animationConfig = {
  durations: {
    instant: 0.12,
    ultraFast: 0.18,
    fast: 0.25,
    medium: 0.45,
    slow: 0.8,
    extraSlow: 1.4,
    cinematic: 2.2,
  },
  easings: {
    // Refined standard easings for better feel
    smooth: 'power2.out',
    smoothIn: 'power2.in',
    smoothInOut: 'power2.inOut',
    
    // Enhanced bouncy easings with better spring feel
    bounce: 'back.out(1.4)',
    bounceIn: 'back.in(1.4)',
    bounceStrong: 'back.out(2.2)',
    bounceSubtle: 'back.out(1.1)',
    
    // Refined elastic easings for premium feel
    elastic: 'elastic.out(1, 0.25)',
    elasticStrong: 'elastic.out(1, 0.4)',
    elasticSubtle: 'elastic.out(1, 0.15)',
    elasticMedium: 'elastic.out(1, 0.3)',
    
    // Expo easings for dramatic effects
    expo: 'expo.out',
    expoIn: 'expo.in',
    expoInOut: 'expo.inOut',
    
    // Circ easings for smooth curves
    circ: 'circ.out',
    circIn: 'circ.in',
    circInOut: 'circ.inOut',
    
    // Premium cubic bezier curves for luxury feel
    premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
    luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    dramatic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    organic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  },
  scrollTrigger: {
    start: 'top 85%',
    end: 'bottom 15%',
    scrub: false,
    markers: false, // Set to true for debugging
    refreshPriority: 1,
    anticipatePin: 1,
  },
  // Enhanced micro-interaction timings with premium feel
  microInteractions: {
    hover: {
      duration: 0.18,
      ease: 'power2.out',
      scale: 1.03,
      lift: 4,
    },
    click: {
      duration: 0.08,
      ease: 'power2.out',
      scale: 0.97,
      feedback: 0.12,
    },
    focus: {
      duration: 0.25,
      ease: 'power2.out',
      glow: '0 0 25px rgba(124, 58, 237, 0.6)',
      ring: '0 0 0 3px rgba(124, 58, 237, 0.3)',
    },
    magnetic: {
      duration: 0.15,
      ease: 'power2.out',
      strength: 0.25,
      radius: 80,
    },
    ripple: {
      duration: 0.6,
      ease: 'power2.out',
      scale: 4,
      opacity: 0.3,
    },
  },
  // Enhanced stagger configurations for better rhythm
  stagger: {
    cards: 0.08,
    text: 0.03,
    buttons: 0.06,
    images: 0.12,
    listItems: 0.04,
    navigation: 0.05,
  },
}

// Enhanced Particle system configuration
export const particleConfig = {
  count: 100,
  size: {
    min: 1,
    max: 3,
  },
  speed: {
    min: 0.5,
    max: 2,
  },
  colors: ['#7C3AED', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4'],
  interactive: true,
  connectionDistance: 150,
  // Enhanced particle behaviors
  behaviors: {
    attraction: 0.02,
    repulsion: 0.01,
    alignment: 0.005,
    cohesion: 0.01,
  },
  // Visual effects
  effects: {
    glow: true,
    trails: false,
    connections: true,
    pulsing: true,
  },
}

// Enhanced Performance settings
export const performanceConfig = {
  reducedMotion: false,
  maxParticles: 200,
  animationQuality: 'high', // 'low', 'medium', 'high'
  enableGPUAcceleration: true,
  // Adaptive performance
  adaptive: {
    enabled: true,
    fpsThreshold: 30,
    qualityReduction: 0.5,
    particleReduction: 0.3,
  },
  // Memory management
  memory: {
    cleanup: true,
    cleanupInterval: 30000, // 30 seconds
    maxTimelineCount: 50,
  },
}

// Color transition configurations with enhanced smoothness
export const colorTransitions = {
  duration: 0.6,
  ease: 'power2.inOut',
  // Enhanced color schemes with more stops for smoother transitions
  schemes: {
    primary: {
      from: '#7C3AED',
      to: '#8B5CF6',
      stops: ['#7C3AED', '#8146F0', '#8B5CF6', '#9F7AEA'],
      animated: 'linear-gradient(45deg, #7C3AED 0%, #8146F0 25%, #8B5CF6 50%, #9F7AEA 75%, #7C3AED 100%)',
    },
    accent: {
      from: '#F59E0B',
      to: '#EAB308',
      stops: ['#F59E0B', '#F3A50C', '#EAB308', '#FBBF24'],
      animated: 'linear-gradient(45deg, #F59E0B 0%, #F3A50C 25%, #EAB308 50%, #FBBF24 75%, #F59E0B 100%)',
    },
    success: {
      from: '#10B981',
      to: '#059669',
      stops: ['#10B981', '#0CA678', '#059669', '#047857'],
      animated: 'linear-gradient(45deg, #10B981 0%, #0CA678 25%, #059669 50%, #047857 75%, #10B981 100%)',
    },
    danger: {
      from: '#EF4444',
      to: '#DC2626',
      stops: ['#EF4444', '#E53E3E', '#DC2626', '#B91C1C'],
      animated: 'linear-gradient(45deg, #EF4444 0%, #E53E3E 25%, #DC2626 50%, #B91C1C 75%, #EF4444 100%)',
    },
    rainbow: {
      from: '#7C3AED',
      to: '#F59E0B',
      stops: ['#7C3AED', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'],
      animated: 'linear-gradient(45deg, #7C3AED 0%, #8B5CF6 16%, #EC4899 33%, #F59E0B 50%, #10B981 66%, #3B82F6 83%, #7C3AED 100%)',
    },
  },
  // Enhanced transition effects
  effects: {
    fade: {
      duration: 0.4,
      ease: 'power2.inOut',
    },
    slide: {
      duration: 0.5,
      ease: 'power2.out',
    },
    scale: {
      duration: 0.3,
      ease: 'back.out(1.2)',
    },
    morph: {
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    },
  },
}

// Enhanced visual effects configuration with premium polish
export const visualEffects = {
  glow: {
    intensity: {
      subtle: '0 0 8px',
      medium: '0 0 16px',
      strong: '0 0 24px',
      dramatic: '0 0 40px',
      cinematic: '0 0 60px',
    },
    colors: {
      primary: 'rgba(124, 58, 237, 0.6)',
      secondary: 'rgba(139, 92, 246, 0.6)',
      accent: 'rgba(245, 158, 11, 0.6)',
      success: 'rgba(16, 185, 129, 0.6)',
      danger: 'rgba(239, 68, 68, 0.6)',
      info: 'rgba(59, 130, 246, 0.6)',
    },
    multiLayer: {
      subtle: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
      medium: '0 0 8px currentColor, 0 0 16px currentColor, 0 0 24px currentColor',
      strong: '0 0 12px currentColor, 0 0 24px currentColor, 0 0 36px currentColor, 0 0 48px currentColor',
    },
  },
  blur: {
    subtle: 'blur(1px)',
    light: 'blur(4px)',
    medium: 'blur(8px)',
    strong: 'blur(16px)',
    heavy: 'blur(24px)',
  },
  shadows: {
    subtle: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    colored: {
      primary: '0 8px 25px rgba(124, 58, 237, 0.25), 0 4px 10px rgba(124, 58, 237, 0.15)',
      accent: '0 8px 25px rgba(245, 158, 11, 0.25), 0 4px 10px rgba(245, 158, 11, 0.15)',
      success: '0 8px 25px rgba(16, 185, 129, 0.25), 0 4px 10px rgba(16, 185, 129, 0.15)',
    },
    inset: {
      subtle: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      medium: 'inset 0 2px 4px rgba(0, 0, 0, 0.15)',
      strong: 'inset 0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  transforms: {
    lift: {
      subtle: 'translateY(-2px)',
      medium: 'translateY(-4px)',
      strong: 'translateY(-8px)',
    },
    scale: {
      subtle: 'scale(1.02)',
      medium: 'scale(1.05)',
      strong: 'scale(1.08)',
    },
    rotate: {
      subtle: 'rotate(1deg)',
      medium: 'rotate(3deg)',
      strong: 'rotate(6deg)',
    },
  },
}