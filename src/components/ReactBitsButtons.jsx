import React, { useState, useRef, useEffect } from 'react';
import { NeonButton } from './NeonGlow.jsx';
import { useButtonAnimation } from '../hooks/useAnimationIntegration.js';
import microInteractionManager from '../utils/MicroInteractionManager.js';

// MagneticButton component with enhanced magnetic hover effects
export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick = () => {},
  magneticStrength = 0.25,
  magneticRadius = 80,
  style = {},
  disabled = false,
  gsapEnhanced = true,
  enhancedInteractions = true,
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use animation integration hook
  const { ref: animationRef, registerComponent } = useButtonAnimation({
    enhanceHover: gsapEnhanced,
    enhanceClick: gsapEnhanced,
    autoRegister: gsapEnhanced
  });

  // Combine refs and setup enhanced interactions
  useEffect(() => {
    if (buttonRef.current && animationRef.current !== buttonRef.current) {
      animationRef.current = buttonRef.current;
      if (gsapEnhanced) {
        registerComponent(buttonRef.current);
      }
      
      // Add enhanced micro-interactions
      if (enhancedInteractions && !disabled) {
        microInteractionManager.enhanceButtonHover(buttonRef.current, {
          scale: 1.03,
          lift: 4,
          glow: true,
        });
        microInteractionManager.enhanceClickFeedback(buttonRef.current, {
          ripple: true,
          scale: 0.97,
        });
        microInteractionManager.addMagneticEffect(buttonRef.current, {
          strength: magneticStrength,
          radius: magneticRadius,
        });
      }
    }
  }, [animationRef, registerComponent, gsapEnhanced, enhancedInteractions, disabled, magneticStrength, magneticRadius]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || disabled || enhancedInteractions) return; // Skip if enhanced interactions are enabled

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < magneticRadius) {
        const strength = Math.max(0, 1 - distance / magneticRadius) * magneticStrength;
        setMousePosition({
          x: deltaX * strength,
          y: deltaY * strength
        });
        setIsHovered(true);
      } else {
        setMousePosition({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: 0, y: 0 });
      setIsHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (button) {
        button.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [magneticStrength, magneticRadius, disabled, enhancedInteractions]);

  const buttonStyle = enhancedInteractions ? style : {
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    transition: isHovered ? 'none' : 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    ...style
  };

  const buttonClasses = `magnetic-button ${enhancedInteractions ? 'btn-enhanced magnetic-enhanced' : ''} ${className}`;

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// AnimatedButton with enhanced tactile click feedback
export const AnimatedButton = ({ 
  children, 
  className = '', 
  onClick = () => {},
  animation = 'scale',
  clickFeedback = true,
  glowEffect = true,
  rippleEffect = true,
  disabled = false,
  style = {},
  gsapEnhanced = true,
  enhancedInteractions = true,
  magneticStrength, // Remove from DOM props
  magneticRadius, // Remove from DOM props
  ...props 
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  // Use animation integration hook
  const { ref: animationRef, registerComponent } = useButtonAnimation({
    enhanceHover: gsapEnhanced,
    enhanceClick: gsapEnhanced,
    autoRegister: gsapEnhanced
  });

  // Combine refs and setup enhanced interactions
  useEffect(() => {
    if (buttonRef.current && animationRef.current !== buttonRef.current) {
      animationRef.current = buttonRef.current;
      if (gsapEnhanced) {
        registerComponent(buttonRef.current);
      }
      
      // Add enhanced micro-interactions
      if (enhancedInteractions && !disabled) {
        microInteractionManager.enhanceButtonHover(buttonRef.current, {
          scale: 1.03,
          lift: 3,
          glow: glowEffect,
        });
        microInteractionManager.enhanceClickFeedback(buttonRef.current, {
          ripple: rippleEffect,
          scale: 0.97,
        });
      }
    }
  }, [animationRef, registerComponent, gsapEnhanced, enhancedInteractions, disabled, glowEffect, rippleEffect]);

  const handleClick = (e) => {
    if (disabled) return;

    if (clickFeedback && !enhancedInteractions) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
    }

    if (rippleEffect && !enhancedInteractions) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        x,
        y,
        size,
        id: Date.now()
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick(e);
  };

  const getAnimationClass = () => {
    if (enhancedInteractions) return '';
    
    switch (animation) {
      case 'scale':
        return isClicked ? 'transform scale-95' : 'transform scale-100 hover:scale-105';
      case 'bounce':
        return isClicked ? 'animate-bounce' : 'hover:animate-pulse';
      case 'rotate':
        return isClicked ? 'transform rotate-3' : 'hover:rotate-1';
      case 'slide':
        return isClicked ? 'transform translate-y-1' : 'hover:-translate-y-1';
      default:
        return isClicked ? 'transform scale-95' : 'transform scale-100 hover:scale-105';
    }
  };

  const glowClass = glowEffect && !enhancedInteractions ? 'neon-glow neon-glow-primary neon-hover-medium' : '';
  const enhancedClass = enhancedInteractions ? 'btn-enhanced ripple-container' : '';

  return (
    <button
      ref={buttonRef}
      className={`animated-button relative overflow-hidden transition-all duration-200 ${getAnimationClass()} ${glowClass} ${enhancedClass} ${className}`}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
      
      {/* Ripple effects (legacy - only when enhanced interactions are disabled) */}
      {rippleEffect && !enhancedInteractions && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </button>
  );
};

// FloatingActionButton with enhanced effects
export const FloatingActionButton = ({ 
  children, 
  className = '', 
  onClick = () => {},
  position = 'bottom-right',
  size = 'medium',
  magnetic = true,
  pulse = false,
  disabled = false,
  style = {},
  ...props 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-12 h-12 text-sm';
      case 'large':
        return 'w-20 h-20 text-xl';
      default:
        return 'w-16 h-16 text-lg';
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-6 left-6';
      case 'bottom-right':
        return 'fixed bottom-6 right-6';
      case 'top-left':
        return 'fixed top-6 left-6';
      case 'top-right':
        return 'fixed top-6 right-6';
      default:
        return 'fixed bottom-6 right-6';
    }
  };

  const pulseClass = pulse ? 'animate-pulse' : '';

  const ButtonComponent = magnetic ? MagneticButton : AnimatedButton;

  return (
    <ButtonComponent
      className={`floating-action-button rounded-full shadow-lg ${getSizeClass()} ${getPositionClass()} ${pulseClass} ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...(magnetic && { 
        magneticStrength: 0.2,
        magneticRadius: 80 
      })}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

// GradientButton with animated gradients
export const GradientButton = ({ 
  children, 
  className = '', 
  onClick = () => {},
  gradientType = 'primary',
  animated = true,
  magnetic = false,
  disabled = false,
  style = {},
  ...props 
}) => {
  const getGradientClass = () => {
    switch (gradientType) {
      case 'primary':
        return 'bg-gradient-to-r from-violet-600 to-purple-600';
      case 'secondary':
        return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'accent':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-rose-500';
      case 'rainbow':
        return 'bg-gradient-to-r from-violet-600 via-purple-600 via-pink-600 to-amber-500';
      default:
        return 'bg-gradient-to-r from-violet-600 to-purple-600';
    }
  };

  const animatedClass = animated ? 'bg-size-200 hover:bg-pos-100 transition-all duration-500' : '';

  const ButtonComponent = magnetic ? MagneticButton : AnimatedButton;

  return (
    <ButtonComponent
      className={`gradient-button ${getGradientClass()} ${animatedClass} ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      {...(magnetic && { magneticStrength: 0.25 })}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

// GlowButton with enhanced neon glow effects
export const GlowButton = ({ 
  children, 
  className = '', 
  onClick = () => {},
  glowColor = 'primary',
  intensity = 'medium',
  animated = true,
  disabled = false,
  style = {},
  ...props 
}) => {
  return (
    <NeonButton
      className={`glow-button ${className}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      color={glowColor}
      intensity={intensity}
      animation={animated ? 'pulse' : 'none'}
      {...props}
    >
      {children}
    </NeonButton>
  );
};