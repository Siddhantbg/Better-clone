import React, { useState } from 'react'
import { useMobileOptimization, useTouchInteraction, useResponsiveAnimation } from '../hooks/useMobileOptimization.js'

/**
 * Mobile-optimized button component with touch-friendly interactions
 */
export function MobileOptimizedButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary',
  size = 'medium',
  enableHaptic = false,
  className = '',
  ...props 
}) {
  const [isPressed, setIsPressed] = useState(false)
  const { isMobile, isTablet, isTouchDevice } = useMobileOptimization()
  const { shouldShowHoverEffects, shouldUseMagneticEffects } = useTouchInteraction()
  const { getAnimationDuration } = useResponsiveAnimation()

  const touchHandlers = useTouchInteraction({
    haptic: enableHaptic,
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onClick: onClick
  })

  // Get size-specific styles
  const getSizeStyles = () => {
    const baseStyles = {
      small: { padding: '8px 16px', fontSize: '14px', minHeight: '36px' },
      medium: { padding: '12px 24px', fontSize: '16px', minHeight: '44px' },
      large: { padding: '16px 32px', fontSize: '18px', minHeight: '52px' }
    }

    const mobileStyles = {
      small: { padding: '10px 18px', fontSize: '14px', minHeight: '44px' },
      medium: { padding: '14px 28px', fontSize: '16px', minHeight: '48px' },
      large: { padding: '18px 36px', fontSize: '18px', minHeight: '56px' }
    }

    return isMobile ? mobileStyles[size] : baseStyles[size]
  }

  // Get variant-specific styles
  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
        color: 'white',
        border: 'none'
      },
      secondary: {
        background: 'transparent',
        color: 'var(--color-primary)',
        border: '2px solid var(--color-primary)'
      },
      ghost: {
        background: 'transparent',
        color: 'var(--color-text-primary)',
        border: '1px solid rgba(124, 58, 237, 0.3)'
      }
    }

    return variants[variant] || variants.primary
  }

  const sizeStyles = getSizeStyles()
  const variantStyles = getVariantStyles()
  const animationDuration = getAnimationDuration(300)

  const buttonStyles = {
    ...sizeStyles,
    ...variantStyles,
    borderRadius: isMobile ? '12px' : '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all ${animationDuration}ms ease`,
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    boxShadow: isPressed 
      ? '0 2px 8px rgba(124, 58, 237, 0.2)' 
      : '0 4px 12px rgba(124, 58, 237, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    fontWeight: '600',
    textAlign: 'center',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    // Ensure minimum touch target size
    minWidth: isTouchDevice ? '44px' : 'auto'
  }

  const buttonClasses = `
    mobile-optimized-button
    ${variant}
    ${size}
    ${isMobile ? 'mobile' : ''}
    ${isTablet ? 'tablet' : ''}
    ${isTouchDevice ? 'touch-device' : ''}
    ${isPressed ? 'pressed' : ''}
    ${disabled ? 'disabled' : ''}
    ${className}
  `.trim()

  return (
    <button
      className={buttonClasses}
      style={buttonStyles}
      disabled={disabled}
      {...touchHandlers}
      {...props}
    >
      {/* Ripple effect for touch feedback */}
      {isTouchDevice && (
        <span 
          className="ripple-effect"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            opacity: isPressed ? 1 : 0,
            transform: isPressed ? 'scale(1)' : 'scale(0)',
            transition: `all ${animationDuration}ms ease`,
            pointerEvents: 'none',
            borderRadius: 'inherit'
          }}
        />
      )}
      
      {/* Button content */}
      <span 
        style={{ 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {children}
      </span>
      
      {/* Hover glow effect (desktop only) */}
      {shouldShowHoverEffects() && (
        <span 
          className="hover-glow"
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
            borderRadius: 'inherit',
            zIndex: -1,
            opacity: 0,
            transition: `opacity ${animationDuration}ms ease`
          }}
        />
      )}
    </button>
  )
}

/**
 * Mobile-optimized floating action button
 */
export function MobileFloatingActionButton({ 
  icon, 
  onClick, 
  position = 'bottom-right',
  className = '',
  ...props 
}) {
  const { isMobile } = useMobileOptimization()
  const touchHandlers = useTouchInteraction({ onClick, haptic: true })

  const positionStyles = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' }
  }

  const fabStyles = {
    position: 'fixed',
    ...positionStyles[position],
    width: isMobile ? '56px' : '48px',
    height: isMobile ? '56px' : '48px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '24px' : '20px'
  }

  return (
    <button
      className={`mobile-fab ${className}`}
      style={fabStyles}
      {...touchHandlers}
      {...props}
    >
      {icon}
    </button>
  )
}

export default MobileOptimizedButton