import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Temporarily disable GSAP to isolate the issue
// import { animationManager } from '../utils/gsap';
import { themeConfig } from '../config/theme';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionLocation, setTransitionLocation] = useState(location);

  useEffect(() => {
    if (location !== transitionLocation) {
      setIsTransitioning(true);
      setTransitionLocation(location);
      
      // Simple timeout-based transition without GSAP
      setTimeout(() => {
        setDisplayLocation(transitionLocation);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  }, [location, transitionLocation]);

  // Simple CSS-based entrance animation
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          containerRef.current.style.opacity = '1';
          containerRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="page-transition-container min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${themeConfig.colors.background} 0%, ${themeConfig.colors.surface} 100%)`,
      }}
    >
      {/* Loading overlay during transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F23]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
                style={{
                  background: `conic-gradient(from 0deg, ${themeConfig.colors.primary}, ${themeConfig.colors.secondary}, ${themeConfig.colors.accent}, ${themeConfig.colors.primary})`,
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
                }}
              />
            </div>
            <div className="text-white text-sm geist-light opacity-80">
              Loading...
            </div>
          </div>
        </div>
      )}
      
      {/* Render children based on display location */}
      <div key={displayLocation.pathname}>
        {children}
      </div>
    </div>
  );
};

export default PageTransition;