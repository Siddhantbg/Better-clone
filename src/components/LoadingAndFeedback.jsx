import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * AnimatedProgressIndicator component for form submissions and loading states
 * @param {Object} props - Component props
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.color - Theme color ('primary', 'secondary', 'accent', 'success', 'error')
 * @param {string} props.size - Size variant ('small', 'medium', 'large')
 * @param {boolean} props.indeterminate - Indeterminate loading state
 * @param {string} props.label - Progress label text
 * @param {boolean} props.showPercentage - Show percentage text
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} AnimatedProgressIndicator component
 */
export const AnimatedProgressIndicator = ({
  progress = 0,
  color = 'primary',
  size = 'medium',
  indeterminate = false,
  label = '',
  showPercentage = true,
  className = '',
  ...props
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressRef = useRef(null);

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    info: '#3B82F6',
  };

  // Size mapping
  const sizeMap = {
    small: { height: '4px', fontSize: '0.75rem' },
    medium: { height: '8px', fontSize: '0.875rem' },
    large: { height: '12px', fontSize: '1rem' },
  };

  const currentColor = colorMap[color] || colorMap.primary;
  const currentSize = sizeMap[size] || sizeMap.medium;

  // Animate progress changes
  useEffect(() => {
    if (!indeterminate) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, indeterminate]);

  const containerStyles = {
    width: '100%',
    marginBottom: '1rem',
  };

  const labelStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    fontSize: currentSize.fontSize,
    color: '#ffffff',
  };

  const progressBarStyles = {
    width: '100%',
    height: currentSize.height,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: currentSize.height,
    overflow: 'hidden',
    position: 'relative',
    backdropFilter: 'blur(10px)',
  };

  const progressFillStyles = {
    height: '100%',
    width: indeterminate ? '30%' : `${animatedProgress}%`,
    background: indeterminate 
      ? `linear-gradient(90deg, transparent, ${currentColor}, transparent)`
      : `linear-gradient(90deg, ${currentColor}, ${currentColor}dd)`,
    borderRadius: currentSize.height,
    transition: indeterminate ? 'none' : 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: indeterminate ? 'progressIndeterminate 2s ease-in-out infinite' : 'none',
    boxShadow: `0 0 10px ${currentColor}40`,
  };

  const percentageStyles = {
    fontSize: currentSize.fontSize,
    color: currentColor,
    fontWeight: 'bold',
    textShadow: `0 0 5px ${currentColor}`,
  };

  return (
    <div style={containerStyles} className={className} {...props}>
      {(label || showPercentage) && (
        <div style={labelStyles}>
          <span>{label}</span>
          {showPercentage && !indeterminate && (
            <span style={percentageStyles}>{Math.round(animatedProgress)}%</span>
          )}
        </div>
      )}
      <div style={progressBarStyles}>
        <div ref={progressRef} style={progressFillStyles} />
      </div>
    </div>
  );
};

/**
 * FeedbackAnimation component for success and error states
 * @param {Object} props - Component props
 * @param {string} props.type - Feedback type ('success', 'error', 'warning', 'info')
 * @param {string} props.message - Feedback message
 * @param {boolean} props.visible - Visibility state
 * @param {Function} props.onClose - Close handler
 * @param {number} props.autoHideDuration - Auto-hide duration in ms (0 = no auto-hide)
 * @param {string} props.position - Position ('top', 'bottom', 'center')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} FeedbackAnimation component
 */
export const FeedbackAnimation = ({
  type = 'success',
  message = '',
  visible = false,
  onClose,
  autoHideDuration = 3000,
  position = 'top',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isAnimating, setIsAnimating] = useState(false);

  // Color and icon mapping
  const typeConfig = {
    success: {
      color: '#10B981',
      icon: '✓',
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    error: {
      color: '#EF4444',
      icon: '✕',
      bgColor: 'rgba(239, 68, 68, 0.1)',
    },
    warning: {
      color: '#F59E0B',
      icon: '⚠',
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    info: {
      color: '#3B82F6',
      icon: 'ℹ',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      setIsAnimating(true);
      
      if (autoHideDuration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [visible, autoHideDuration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const positionStyles = {
    top: { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    bottom: { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  };

  const containerStyles = {
    position: 'fixed',
    ...positionStyles[position],
    zIndex: 1000,
    padding: '1rem 1.5rem',
    backgroundColor: config.bgColor,
    backdropFilter: 'blur(10px)',
    border: `2px solid ${config.color}`,
    borderRadius: '0.5rem',
    color: '#ffffff',
    boxShadow: `0 0 20px ${config.color}40, 0 10px 25px rgba(0, 0, 0, 0.3)`,
    transform: isAnimating 
      ? positionStyles[position].transform 
      : `${positionStyles[position].transform} translateY(-20px)`,
    opacity: isAnimating ? 1 : 0,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '400px',
    minWidth: '200px',
  };

  const contentStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const iconStyles = {
    fontSize: '1.25rem',
    color: config.color,
    textShadow: `0 0 10px ${config.color}`,
  };

  const messageStyles = {
    flex: 1,
    fontSize: '0.875rem',
    lineHeight: '1.4',
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    transition: 'color 0.2s ease',
  };

  return (
    <div style={containerStyles} className={className} {...props}>
      <div style={contentStyles}>
        <span style={iconStyles}>{config.icon}</span>
        <span style={messageStyles}>{message}</span>
        {onClose && (
          <button
            style={closeButtonStyles}
            onClick={handleClose}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * FloatingActionButton component with magnetic effects
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.color - Theme color ('primary', 'secondary', 'accent')
 * @param {string} props.size - Size variant ('small', 'medium', 'large')
 * @param {string} props.position - Position ('bottom-right', 'bottom-left', 'top-right', 'top-left')
 * @param {boolean} props.magneticEffect - Enable magnetic hover effect
 * @param {number} props.magneticRadius - Magnetic effect radius in pixels
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} FloatingActionButton component
 */
export const FloatingActionButton = ({
  children,
  onClick,
  color = 'primary',
  size = 'medium',
  position = 'bottom-right',
  magneticEffect = true,
  magneticRadius = 50,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
  };

  // Size mapping
  const sizeMap = {
    small: { size: '48px', fontSize: '1rem' },
    medium: { size: '56px', fontSize: '1.25rem' },
    large: { size: '64px', fontSize: '1.5rem' },
  };

  // Position mapping
  const positionMap = {
    'bottom-right': { bottom: '2rem', right: '2rem' },
    'bottom-left': { bottom: '2rem', left: '2rem' },
    'top-right': { top: '2rem', right: '2rem' },
    'top-left': { top: '2rem', left: '2rem' },
  };

  const currentColor = colorMap[color] || colorMap.primary;
  const currentSize = sizeMap[size] || sizeMap.medium;
  const currentPosition = positionMap[position] || positionMap['bottom-right'];

  // Handle magnetic effect
  useEffect(() => {
    if (!magneticEffect || !buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < magneticRadius) {
        const strength = (magneticRadius - distance) / magneticRadius;
        const offsetX = (e.clientX - centerX) * strength * 0.3;
        const offsetY = (e.clientY - centerY) * strength * 0.3;
        
        setMagneticOffset({ x: offsetX, y: offsetY });
        setIsHovered(true);
      } else {
        setMagneticOffset({ x: 0, y: 0 });
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
      setIsHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticEffect, magneticRadius]);

  const buttonStyles = {
    position: 'fixed',
    ...currentPosition,
    width: currentSize.size,
    height: currentSize.size,
    borderRadius: '50%',
    border: 'none',
    background: disabled 
      ? 'rgba(255, 255, 255, 0.1)' 
      : `linear-gradient(135deg, ${currentColor}, ${currentColor}dd)`,
    color: disabled ? 'rgba(255, 255, 255, 0.5)' : '#ffffff',
    fontSize: currentSize.fontSize,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: disabled 
      ? 'none' 
      : `0 4px 20px ${currentColor}40, 0 0 0 0 ${currentColor}20`,
    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px) scale(${isHovered && !disabled ? 1.1 : 1})`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  };

  const rippleStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${currentColor}40 0%, transparent 70%)`,
    transform: 'translate(-50%, -50%) scale(0)',
    animation: isHovered && !disabled ? 'rippleEffect 0.6s ease-out' : 'none',
  };

  const handleClick = (e) => {
    if (!disabled) {
      onClick?.(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      <div style={rippleStyles} />
      {children}
    </button>
  );
};

/**
 * LoadingSpinner component for inline loading states
 * @param {Object} props - Component props
 * @param {string} props.color - Theme color
 * @param {string} props.size - Size variant ('small', 'medium', 'large')
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} LoadingSpinner component
 */
export const LoadingSpinner = ({
  color = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
  };

  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '32px',
  };

  const currentColor = colorMap[color] || colorMap.primary;
  const currentSize = sizeMap[size] || sizeMap.medium;

  const spinnerStyles = {
    width: currentSize,
    height: currentSize,
    border: `2px solid rgba(255, 255, 255, 0.1)`,
    borderTop: `2px solid ${currentColor}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
  };

  return (
    <div style={spinnerStyles} className={className} {...props} />
  );
};

export default {
  AnimatedProgressIndicator,
  FeedbackAnimation,
  FloatingActionButton,
  LoadingSpinner,
};