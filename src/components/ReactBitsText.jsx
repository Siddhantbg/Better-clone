import React, { useState, useEffect } from 'react';
import { useTextAnimation } from '../hooks/useAnimationIntegration.js';

// AnimatedText component with fade-in and slide-up animation
export const AnimatedText = ({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 1000,
  animationType = 'fadeInUp' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animationType) {
      case 'fadeInUp':
        return isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8';
      case 'fadeInLeft':
        return isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform -translate-x-8';
      case 'fadeInRight':
        return isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform translate-x-8';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div 
      className={`transition-all ease-out ${className} ${getAnimationClass()}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

// TypewriterText component with character-by-character reveal
export const TypewriterText = ({ 
  text, 
  className = '', 
  speed = 100, 
  delay = 0,
  cursor = true,
  onComplete = () => {}
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      onComplete();
      if (!cursor) {
        setShowCursor(false);
      }
    }
  }, [currentIndex, text, speed, started, cursor, onComplete]);

  useEffect(() => {
    if (cursor) {
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
};

// GlitchText component with cyberpunk glitch effects
export const GlitchText = ({ 
  children, 
  className = '', 
  intensity = 'medium',
  trigger = 'hover',
  continuous = false 
}) => {
  const [isGlitching, setIsGlitching] = useState(continuous);

  useEffect(() => {
    if (continuous) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [continuous]);

  const getGlitchIntensity = () => {
    switch (intensity) {
      case 'low':
        return 'glitch-low';
      case 'high':
        return 'glitch-high';
      default:
        return 'glitch-medium';
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsGlitching(false);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }
  };

  return (
    <span 
      className={`relative inline-block ${className} ${isGlitching ? getGlitchIntensity() : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        '--glitch-color-1': '#ff0000',
        '--glitch-color-2': '#00ff00',
        '--glitch-color-3': '#0000ff',
      }}
    >
      {children}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 w-full h-full opacity-80"
            style={{
              color: 'var(--glitch-color-1)',
              transform: 'translate(-2px, 0)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 w-full h-full opacity-80"
            style={{
              color: 'var(--glitch-color-2)',
              transform: 'translate(2px, 0)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

// Enhanced AnimatedText with more animation options
export const EnhancedAnimatedText = ({ 
  children, 
  className = '', 
  animation = 'slideUp',
  delay = 0,
  duration = 800,
  stagger = 0,
  splitBy = 'word', // 'word', 'char', or 'line'
  gsapEnhanced = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Use animation integration hook
  const { ref: animationRef, registerComponent } = useTextAnimation({
    splitText: stagger > 0,
    staggerDelay: stagger / 1000, // Convert to seconds
    animationType: animation,
    scrollTrigger: gsapEnhanced,
    autoRegister: gsapEnhanced
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const splitText = (text) => {
    if (typeof text !== 'string') return [text];
    
    switch (splitBy) {
      case 'char':
        return text.split('');
      case 'word':
        return text.split(' ');
      case 'line':
        return text.split('\n');
      default:
        return [text];
    }
  };

  const getAnimationClass = (index = 0) => {
    const baseDelay = delay + (stagger * index);
    
    switch (animation) {
      case 'slideUp':
        return isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8';
      case 'slideDown':
        return isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform -translate-y-8';
      case 'slideLeft':
        return isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform translate-x-8';
      case 'slideRight':
        return isVisible 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform -translate-x-8';
      case 'scale':
        return isVisible 
          ? 'opacity-100 transform scale-100' 
          : 'opacity-0 transform scale-95';
      case 'rotate':
        return isVisible 
          ? 'opacity-100 transform rotate-0' 
          : 'opacity-0 transform rotate-12';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  if (stagger > 0 && typeof children === 'string') {
    const parts = splitText(children);
    
    return (
      <div ref={animationRef} className={className}>
        {parts.map((part, index) => (
          <span
            key={index}
            className={`inline-block transition-all ease-out ${getAnimationClass(index)}`}
            style={{ 
              transitionDuration: `${duration}ms`,
              transitionDelay: `${stagger * index}ms`
            }}
          >
            {part}
            {splitBy === 'word' && index < parts.length - 1 && ' '}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={animationRef}
      className={`transition-all ease-out ${className} ${getAnimationClass()}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};