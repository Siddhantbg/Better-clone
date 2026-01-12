import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * NeonGlow component for applying dynamic neon glow effects
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child elements to apply glow to
 * @param {string} props.color - Glow color ('primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info')
 * @param {string} props.intensity - Glow intensity ('subtle', 'medium', 'strong', 'intense')
 * @param {string} props.animation - Animation type ('none', 'pulse', 'breathe', 'flicker')
 * @param {boolean} props.hoverEffect - Enable hover intensity increase
 * @param {string} props.hoverIntensity - Hover intensity level
 * @param {boolean} props.interactive - Enable interactive glow effects
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @returns {JSX.Element} NeonGlow component
 */
const NeonGlow = ({
  children,
  color = 'primary',
  intensity = 'medium',
  animation = 'none',
  hoverEffect = true,
  hoverIntensity = 'strong',
  interactive = false,
  className = '',
  style = {},
  ...props
}) => {
  const theme = useTheme();
  const elementRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  // Intensity mapping
  const intensityMap = {
    subtle: {
      boxShadow: '0 0 10px currentColor',
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
    },
    medium: {
      boxShadow: '0 0 20px currentColor, 0 0 30px currentColor',
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
    },
    strong: {
      boxShadow: '0 0 30px currentColor, 0 0 45px currentColor, 0 0 60px currentColor',
      textShadow: '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
    },
    intense: {
      boxShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor, 0 0 100px currentColor',
      textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor',
    },
  };

  // Animation classes
  const animationClasses = {
    none: '',
    pulse: 'neon-pulse',
    breathe: 'neon-breathe',
    flicker: 'neon-flicker',
  };

  // Handle mouse interactions for interactive mode
  useEffect(() => {
    if (!interactive || !elementRef.current) return;

    const element = elementRef.current;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setMousePosition({ x: 50, y: 50 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  // Generate dynamic styles
  const generateGlowStyles = () => {
    const baseColor = colorMap[color] || colorMap.primary;
    const currentIntensity = isHovered && hoverEffect ? hoverIntensity : intensity;
    const glowStyles = intensityMap[currentIntensity] || intensityMap.medium;

    let dynamicStyles = {
      color: baseColor,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      ...glowStyles,
      ...style,
    };

    // Add interactive glow positioning
    if (interactive && isHovered) {
      const { x, y } = mousePosition;
      dynamicStyles.background = `radial-gradient(circle at ${x}% ${y}%, ${baseColor}20 0%, transparent 50%)`;
      dynamicStyles.transform = 'translateY(-2px) scale(1.02)';
    }

    return dynamicStyles;
  };

  // Generate CSS classes
  const generateClasses = () => {
    const classes = [
      'neon-glow',
      `neon-glow-${color}`,
      animationClasses[animation],
      hoverEffect ? `neon-hover-${hoverIntensity}` : '',
      interactive ? 'neon-interactive' : '',
      className,
    ].filter(Boolean);

    return classes.join(' ');
  };

  return (
    <div
      ref={elementRef}
      className={generateClasses()}
      style={generateGlowStyles()}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * NeonButton component with built-in glow effects
 */
export const NeonButton = ({
  children,
  color = 'primary',
  intensity = 'medium',
  animation = 'none',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  // Intensity mapping for glow effects
  const intensityMap = {
    subtle: {
      boxShadow: '0 0 10px currentColor',
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
    },
    medium: {
      boxShadow: '0 0 20px currentColor, 0 0 30px currentColor',
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
    },
    strong: {
      boxShadow: '0 0 30px currentColor, 0 0 45px currentColor, 0 0 60px currentColor',
      textShadow: '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
    },
    intense: {
      boxShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor, 0 0 100px currentColor',
      textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor',
    },
  };

  const buttonClasses = [
    'neon-button',
    `neon-glow-${color}`,
    `neon-glow-${intensity}`,
    animation !== 'none' ? `neon-${animation}` : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    isPressed ? 'transform scale-95' : '',
    className,
  ].filter(Boolean).join(' ');

  // Generate inline styles for glow effects
  const buttonStyles = disabled ? {} : {
    color: colorMap[color] || colorMap.primary,
    border: `2px solid ${colorMap[color] || colorMap.primary}`,
    background: 'transparent',
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...intensityMap[intensity],
  };

  return (
    <button
      className={buttonClasses}
      style={buttonStyles}
      onClick={disabled ? undefined : onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * NeonCard component with glow effects
 */
export const NeonCard = ({
  children,
  color = 'primary',
  intensity = 'subtle',
  hoverIntensity = 'medium',
  className = '',
  ...props
}) => {
  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  // Intensity mapping for glow effects
  const intensityMap = {
    subtle: {
      boxShadow: '0 0 10px currentColor',
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
    },
    medium: {
      boxShadow: '0 0 20px currentColor, 0 0 30px currentColor',
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
    },
    strong: {
      boxShadow: '0 0 30px currentColor, 0 0 45px currentColor, 0 0 60px currentColor',
      textShadow: '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
    },
    intense: {
      boxShadow: '0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor, 0 0 100px currentColor',
      textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor',
    },
  };

  const cardClasses = [
    'neon-card',
    `neon-glow-${color}`,
    `neon-glow-${intensity}`,
    `neon-hover-${hoverIntensity}`,
    className,
  ].filter(Boolean).join(' ');

  // Generate inline styles for glow effects
  const cardStyles = {
    color: colorMap[color] || colorMap.primary,
    border: `1px solid ${colorMap[color] || colorMap.primary}`,
    borderRadius: '12px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    ...intensityMap[intensity],
  };

  return (
    <div className={cardClasses} style={cardStyles} {...props}>
      {children}
    </div>
  );
};

/**
 * NeonText component for glowing text effects
 */
export const NeonText = ({
  children,
  color = 'primary',
  intensity = 'medium',
  animation = 'none',
  className = '',
  as: Component = 'span',
  ...props
}) => {
  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  // Intensity mapping for glow effects
  const intensityMap = {
    subtle: {
      textShadow: '0 0 5px currentColor, 0 0 10px currentColor',
    },
    medium: {
      textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
    },
    strong: {
      textShadow: '0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor',
    },
    intense: {
      textShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor',
    },
  };

  const textClasses = [
    'neon-text',
    `neon-glow-${color}`,
    `neon-glow-${intensity}`,
    animation !== 'none' ? `neon-${animation}` : '',
    className,
  ].filter(Boolean).join(' ');

  // Generate inline styles for glow effects
  const textStyles = {
    color: colorMap[color] || colorMap.primary,
    transition: 'text-shadow 0.3s ease',
    ...intensityMap[intensity],
  };

  return (
    <Component className={textClasses} style={textStyles} {...props}>
      {children}
    </Component>
  );
};

/**
 * NeonIcon component for glowing icons
 */
export const NeonIcon = ({
  children,
  color = 'primary',
  intensity = 'medium',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const iconClasses = [
    'neon-icon',
    `neon-glow-${color}`,
    hoverEffect ? 'neon-hover-medium' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={iconClasses} {...props}>
      {children}
    </div>
  );
};

/**
 * NeonInput component for form inputs with glow effects
 */
export const NeonInput = ({
  color = 'primary',
  className = '',
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputClasses = [
    'neon-input',
    `neon-glow-${color}`,
    isFocused ? 'neon-glow-strong' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <input
      className={inputClasses}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default NeonGlow;