import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { animationManager } from '../utils/gsap';

export const useRouteTransition = (options = {}) => {
  const {
    exitDuration = 0.3,
    enterDuration = 0.4,
    exitEase = 'power2.in',
    enterEase = 'power3.out',
    exitTransform = { opacity: 0, y: -30, scale: 0.98 },
    enterTransform = { opacity: 1, y: 0, scale: 1 },
  } = options;

  const location = useLocation();
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const previousLocationRef = useRef(location);

  useEffect(() => {
    if (location.pathname !== previousLocationRef.current.pathname) {
      setIsTransitioning(true);
      
      if (containerRef.current) {
        const tl = animationManager.createTimeline('route-transition');
        
        // Exit animation
        tl.to(containerRef.current, {
          ...exitTransform,
          duration: exitDuration,
          ease: exitEase,
        })
        .call(() => {
          // Update display location after exit
          setDisplayLocation(location);
        })
        // Prepare for entrance
        .set(containerRef.current, {
          y: 30,
          opacity: 0,
          scale: 0.98,
        })
        // Enter animation
        .to(containerRef.current, {
          ...enterTransform,
          duration: enterDuration,
          ease: enterEase,
        })
        .call(() => {
          setIsTransitioning(false);
          previousLocationRef.current = location;
        });
      }
    }
  }, [location, exitDuration, enterDuration, exitEase, enterEase, exitTransform, enterTransform]);

  // Initial page load animation
  useEffect(() => {
    if (containerRef.current && !previousLocationRef.current) {
      const tl = animationManager.createTimeline('initial-load');
      
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
      
      previousLocationRef.current = location;
    }
  }, [location]);

  return {
    containerRef,
    isTransitioning,
    displayLocation,
    currentLocation: location,
  };
};

export default useRouteTransition;