import { useRef, useEffect, useState } from 'react';

/**
 * Custom hook for 3D tilt effects based on mouse position
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 15)
 * @param {number} options.perspective - CSS perspective value (default: 1000)
 * @param {number} options.scale - Scale factor on hover (default: 1.02)
 * @param {number} options.speed - Animation speed (default: 300)
 * @param {boolean} options.glare - Enable glare effect (default: true)
 * @param {number} options.maxGlare - Maximum glare opacity (default: 0.3)
 * @returns {Object} - Ref and style objects for the 3D tilt effect
 */
export const use3DTilt = (options = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    speed = 300,
    glare = true,
    maxGlare = 0.3,
  } = options;

  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform('');
      setGlareStyle({});
    };

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      const transformString = `
        perspective(${perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
        translateZ(0)
      `.replace(/\s+/g, ' ').trim();
      
      setTransform(transformString);

      // Calculate glare effect
      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        const glareOpacity = Math.min(
          maxGlare,
          Math.abs(rotateX + rotateY) / (maxTilt * 2) * maxGlare
        );

        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
          opacity: glareOpacity,
        });
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, maxTilt, perspective, scale, glare, maxGlare]);

  const containerStyle = {
    transform,
    transition: isHovered ? 'none' : `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transformStyle: 'preserve-3d',
  };

  const glareElementStyle = glare ? {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    transition: isHovered ? 'none' : `opacity ${speed}ms ease-out`,
    ...glareStyle,
  } : {};

  return {
    ref: elementRef,
    style: containerStyle,
    glareStyle: glareElementStyle,
    isHovered,
  };
};

/**
 * Simplified 3D tilt hook for basic lift effects
 * @param {Object} options - Configuration options
 * @returns {Object} - Ref and style objects for basic 3D effects
 */
export const use3DLift = (options = {}) => {
  const {
    liftHeight = 12,
    rotateX = 5,
    rotateY = 5,
    scale = 1.02,
    speed = 400,
  } = options;

  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const containerStyle = {
    transform: isHovered 
      ? `translateY(-${liftHeight}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      : 'translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: `transform ${speed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transformStyle: 'preserve-3d',
  };

  return {
    ref: elementRef,
    style: containerStyle,
    isHovered,
  };
};

export default use3DTilt;