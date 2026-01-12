import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { use3DTilt, use3DLift } from '../hooks/use3DTilt';
import microInteractionManager from '../utils/MicroInteractionManager';

const GlassCard = ({
  children,
  blurIntensity = 16,
  opacity = 0.1,
  borderGlow = true,
  hoverEffect = 'lift',
  enable3D = true,
  enhancedInteractions = true,
  tiltOptions = {},
  className = '',
  style = {},
  ...props
}) => {
  const theme = useTheme();
  const cardRef = useRef(null);

  // 3D effect hooks
  const tilt3D = use3DTilt({
    maxTilt: 12,
    perspective: 1000,
    scale: 1.02,
    speed: 400,
    glare: true,
    maxGlare: 0.15,
    ...tiltOptions,
  });

  const lift3D = use3DLift({
    liftHeight: 8,
    rotateX: 3,
    rotateY: 3,
    scale: 1.02,
    speed: 300,
  });

  // Setup enhanced interactions
  useEffect(() => {
    if (enhancedInteractions && cardRef.current && enable3D) {
      microInteractionManager.enhanceCardHover(cardRef.current, {
        lift: hoverEffect === 'lift' ? 6 : 4,
        tilt: hoverEffect === 'tilt' ? 2 : 1,
        scale: 1.02,
        glow: borderGlow,
      });
    }
  }, [enhancedInteractions, enable3D, hoverEffect, borderGlow]);

  // Generate glassmorphism styles
  const glassStyles = {
    backdropFilter: `blur(${blurIntensity}px)`,
    WebkitBackdropFilter: `blur(${blurIntensity}px)`,
    background: `rgba(26, 27, 58, ${opacity})`,
    border: borderGlow ? theme.effects.glassmorphism.border : 'none',
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    transition: enhancedInteractions ? 'none' : 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    ...style,
  };

  // Determine which 3D effect to use (only if enhanced interactions are disabled)
  const get3DProps = () => {
    if (!enable3D || enhancedInteractions) return { ref: cardRef, style: {}, glareStyle: null };
    
    switch (hoverEffect) {
      case 'tilt':
        return { ...tilt3D, ref: cardRef };
      case 'lift':
      case 'glow':
      case 'scale':
      default:
        return { ...lift3D, ref: cardRef };
    }
  };

  const { ref: effect3DRef, style: effect3DStyle, glareStyle } = get3DProps();

  // Combine styles
  const combinedStyle = {
    ...glassStyles,
    ...effect3DStyle,
  };

  // Hover effect classes (for non-3D fallback and when enhanced interactions are disabled)
  const hoverClasses = {
    lift: (enable3D && !enhancedInteractions) ? '' : 'hover:transform hover:translateY-2 hover:scale-105 hover:shadow-2xl',
    glow: 'hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]',
    scale: (enable3D && !enhancedInteractions) ? '' : 'hover:scale-105',
    tilt: (enable3D && !enhancedInteractions) ? '' : 'hover:transform hover:translateY-2 hover:rotate-1',
  };

  const enhancedClass = enhancedInteractions ? 'card-enhanced' : '';

  return (
    <div
      ref={effect3DRef}
      className={`glass-card ${hoverClasses[hoverEffect]} ${enhancedClass} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {/* 3D Glare effect for tilt mode (only when enhanced interactions are disabled) */}
      {enable3D && hoverEffect === 'tilt' && glareStyle && !enhancedInteractions && (
        <div style={glareStyle} />
      )}

      {/* Animated border glow */}
      {borderGlow && (
        <div
          className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: theme.gradients.card.border,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            zIndex: -1,
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: theme.gradients.card.hover,
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default GlassCard;