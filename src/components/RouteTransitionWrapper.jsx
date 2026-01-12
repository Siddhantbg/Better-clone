import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { animationManager } from '../utils/gsap';

const RouteTransitionWrapper = ({ 
  children, 
  className = "",
  exitAnimation = { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' },
  enterAnimation = { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
}) => {
  const containerRef = useRef(null);
  const location = useLocation();

  // Page entrance animation
  useEffect(() => {
    if (containerRef.current) {
      const tl = animationManager.createTimeline(`page-enter-${location.pathname}`);
      
      // Set initial state
      tl.set(containerRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.98,
      })
      // Animate in
      .to(containerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: enterAnimation.duration,
        ease: enterAnimation.ease,
        delay: 0.1,
      });
    }
  }, [location.pathname, enterAnimation]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div 
      ref={containerRef}
      className={`route-transition-wrapper ${className}`}
    >
      {children}
    </div>
  );
};

export default RouteTransitionWrapper;