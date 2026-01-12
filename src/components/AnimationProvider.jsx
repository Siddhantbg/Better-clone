import React, { createContext, useContext, useEffect, useState } from 'react';
import animationIntegrationManager from '../utils/AnimationIntegrationManager.js';
import animationManager from '../utils/AnimationManager.js';
import { useGlobalAnimationControls } from '../hooks/useAnimationIntegration.js';

// Create animation context
const AnimationContext = createContext({
  isInitialized: false,
  globalControls: {},
  performanceMetrics: {},
  pauseAll: () => {},
  resumeAll: () => {},
  toggleAll: () => {},
  setSpeed: () => {},
});

// Animation provider component
export const AnimationProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const [globalControls, setGlobalControls] = useState({});

  const {
    pauseAll,
    resumeAll,
    toggleAll,
    setSpeed,
    getStatus
  } = useGlobalAnimationControls();

  useEffect(() => {
    // Initialize animation systems
    const initializeAnimations = async () => {
      try {
        // Ensure animation manager is initialized
        if (!animationManager.isInitialized) {
          animationManager.init();
        }

        // Ensure integration manager is initialized
        if (!animationIntegrationManager.isInitialized) {
          animationIntegrationManager.init();
        }

        setIsInitialized(true);

        // Set up performance monitoring
        const updateMetrics = () => {
          const status = getStatus();
          setPerformanceMetrics(status.performanceMetrics || {});
          setGlobalControls(status.globalControls || {});
        };

        updateMetrics();
        const metricsInterval = setInterval(updateMetrics, 2000);

        return () => {
          clearInterval(metricsInterval);
        };
      } catch (error) {
        console.error('Failed to initialize animation systems:', error);
      }
    };

    initializeAnimations();
  }, [getStatus]);

  // Set up global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + Shift + A: Toggle all animations
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        toggleAll();
      }
      
      // Ctrl/Cmd + Shift + P: Pause all animations
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        pauseAll();
      }
      
      // Ctrl/Cmd + Shift + R: Resume all animations
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        resumeAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleAll, pauseAll, resumeAll]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAll();
      } else {
        resumeAll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pauseAll, resumeAll]);

  const contextValue = {
    isInitialized,
    globalControls,
    performanceMetrics,
    pauseAll,
    resumeAll,
    toggleAll,
    setSpeed,
    animationManager,
    integrationManager: animationIntegrationManager
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
      {/* Development animation controls (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <AnimationDevControls />
      )}
    </AnimationContext.Provider>
  );
};

// Development controls component
const AnimationDevControls = () => {
  const {
    globalControls,
    performanceMetrics,
    pauseAll,
    resumeAll,
    setSpeed
  } = useContext(AnimationContext);

  const [isVisible, setIsVisible] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const handleSpeedChange = (speed) => {
    setCurrentSpeed(speed);
    setSpeed(speed);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-violet-600 text-white px-3 py-2 rounded-lg text-sm z-50 opacity-50 hover:opacity-100"
        title="Show Animation Controls"
      >
        🎬
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg text-sm z-50 max-w-xs">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Animation Controls</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            onClick={pauseAll}
            className="bg-red-600 px-2 py-1 rounded text-xs"
          >
            Pause
          </button>
          <button
            onClick={resumeAll}
            className="bg-green-600 px-2 py-1 rounded text-xs"
          >
            Resume
          </button>
        </div>
        
        <div>
          <label className="block text-xs mb-1">Speed: {currentSpeed}x</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={currentSpeed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="text-xs text-gray-300">
          <div>FPS: {performanceMetrics.frameRate || 'N/A'}</div>
          <div>Paused: {globalControls.paused ? 'Yes' : 'No'}</div>
          <div>Reduced Motion: {globalControls.reducedMotion ? 'Yes' : 'No'}</div>
        </div>
        
        <div className="text-xs text-gray-400 mt-2">
          <div>Shortcuts:</div>
          <div>Ctrl+Shift+A: Toggle</div>
          <div>Ctrl+Shift+P: Pause</div>
          <div>Ctrl+Shift+R: Resume</div>
        </div>
      </div>
    </div>
  );
};

// Custom hook to use animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export default AnimationProvider;