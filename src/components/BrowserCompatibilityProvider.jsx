import React, { createContext, useContext, useEffect, useState } from 'react'
import browserCompatibilityManager from '../utils/BrowserCompatibilityManager.js'

// Create context for browser compatibility
const BrowserCompatibilityContext = createContext(null)

/**
 * Browser Compatibility Provider Component
 * Provides browser feature detection and fallback management to child components
 */
export const BrowserCompatibilityProvider = ({ children }) => {
  const [compatibility, setCompatibility] = useState({
    isInitialized: false,
    features: {},
    browserInfo: {},
    animationConfig: {},
    isOldBrowser: false
  })

  const [showBrowserWarning, setShowBrowserWarning] = useState(false)

  useEffect(() => {
    // Initialize browser compatibility manager
    browserCompatibilityManager.init()

    // Get compatibility information
    const features = browserCompatibilityManager.getAllFeatures()
    const browserInfo = browserCompatibilityManager.getBrowserInfo()
    const animationConfig = browserCompatibilityManager.getAnimationConfig()
    const isOldBrowser = browserCompatibilityManager.isOldBrowser()

    setCompatibility({
      isInitialized: true,
      features,
      browserInfo,
      animationConfig,
      isOldBrowser
    })

    // Show warning for very old browsers
    if (isOldBrowser) {
      setShowBrowserWarning(true)
    }

    // Apply compatibility classes to document
    applyCompatibilityClasses(features, browserInfo, isOldBrowser)

    // Load fallback styles
    loadFallbackStyles()

  }, [])

  /**
   * Apply CSS classes based on browser capabilities
   */
  const applyCompatibilityClasses = (features, browserInfo, isOldBrowser) => {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Add feature support classes
    Object.entries(features).forEach(([feature, supported]) => {
      if (supported) {
        root.classList.add(`supports-${feature.replace('css-', '').replace('-', '')}`)
      } else {
        root.classList.add(`no-${feature.replace('css-', '').replace('-', '')}`)
      }
    })

    // Add browser-specific classes
    if (browserInfo) {
      if (browserInfo.isChrome) root.classList.add('chrome')
      if (browserInfo.isFirefox) root.classList.add('firefox')
      if (browserInfo.isSafari) root.classList.add('safari')
      if (browserInfo.isEdge) root.classList.add('edge')
      if (browserInfo.isIE) root.classList.add('ie')
      if (browserInfo.isMobile) root.classList.add('mobile')
    }

    // Add old browser class
    if (isOldBrowser) {
      root.classList.add('old-browser')
    }

    // Add JavaScript enabled class
    root.classList.add('js-enabled')
    root.classList.remove('no-js')
  }

  /**
   * Load fallback CSS styles
   */
  const loadFallbackStyles = () => {
    if (typeof document === 'undefined') return

    // Check if fallback styles are already loaded
    if (document.querySelector('#browser-fallbacks-css')) return

    // Create and append fallback styles link
    const link = document.createElement('link')
    link.id = 'browser-fallbacks-css'
    link.rel = 'stylesheet'
    link.href = '/src/styles/browser-fallbacks.css'
    document.head.appendChild(link)
  }

  /**
   * Close browser warning
   */
  const closeBrowserWarning = () => {
    setShowBrowserWarning(false)
    // Store preference to not show again this session
    sessionStorage.setItem('hideBrowserWarning', 'true')
  }

  /**
   * Check if a feature is supported
   */
  const isSupported = (feature) => {
    return compatibility.features[feature] || false
  }

  /**
   * Get fallback configuration for a feature
   */
  const getFallback = (feature) => {
    return browserCompatibilityManager.getFallback(feature)
  }

  /**
   * Get animation configuration based on browser capabilities
   */
  const getAnimationConfig = () => {
    return compatibility.animationConfig
  }

  /**
   * Check if complex animations should be enabled
   */
  const shouldUseComplexAnimations = () => {
    return compatibility.animationConfig.enableComplexAnimations && 
           !compatibility.isOldBrowser &&
           isSupported('css-animations') &&
           isSupported('css-transforms')
  }

  /**
   * Check if WebGL features should be enabled
   */
  const shouldUseWebGL = () => {
    return compatibility.animationConfig.useWebGL && 
           !compatibility.isOldBrowser &&
           isSupported('webgl')
  }

  /**
   * Check if glassmorphism effects should be enabled
   */
  const shouldUseGlassmorphism = () => {
    return compatibility.animationConfig.useBackdropFilter &&
           isSupported('css-backdrop-filter')
  }

  /**
   * Get CSS class names based on browser capabilities
   */
  const getCompatibilityClasses = () => {
    const classes = []

    if (compatibility.isOldBrowser) classes.push('old-browser')
    if (!isSupported('css-animations')) classes.push('no-animations')
    if (!isSupported('css-transforms')) classes.push('no-transforms')
    if (!isSupported('css-transitions')) classes.push('no-transitions')
    if (!isSupported('css-backdrop-filter')) classes.push('no-backdrop-filter')
    if (!isSupported('webgl')) classes.push('no-webgl')
    if (!isSupported('intersection-observer')) classes.push('no-intersection-observer')

    return classes.join(' ')
  }

  const contextValue = {
    ...compatibility,
    isSupported,
    getFallback,
    getAnimationConfig,
    shouldUseComplexAnimations,
    shouldUseWebGL,
    shouldUseGlassmorphism,
    getCompatibilityClasses
  }

  return (
    <BrowserCompatibilityContext.Provider value={contextValue}>
      {/* Browser Warning for Old Browsers */}
      {showBrowserWarning && compatibility.isOldBrowser && (
        <div className="browser-warning">
          <button 
            className="browser-warning-close"
            onClick={closeBrowserWarning}
            aria-label="Close browser warning"
          >
            ×
          </button>
          <div className="browser-warning-text">
            Your browser may not support all features of this website. 
            For the best experience, please update to a modern browser.
          </div>
        </div>
      )}
      
      {children}
    </BrowserCompatibilityContext.Provider>
  )
}

/**
 * Hook to use browser compatibility context
 */
export const useBrowserCompatibility = () => {
  const context = useContext(BrowserCompatibilityContext)
  
  if (!context) {
    throw new Error('useBrowserCompatibility must be used within a BrowserCompatibilityProvider')
  }
  
  return context
}

/**
 * Higher-order component for browser compatibility
 */
export const withBrowserCompatibility = (WrappedComponent) => {
  return function BrowserCompatibilityWrappedComponent(props) {
    return (
      <BrowserCompatibilityProvider>
        <WrappedComponent {...props} />
      </BrowserCompatibilityProvider>
    )
  }
}

/**
 * Hook for conditional rendering based on feature support
 */
export const useFeatureSupport = (feature) => {
  const { isSupported } = useBrowserCompatibility()
  return isSupported(feature)
}

/**
 * Hook for getting browser-appropriate animation configuration
 */
export const useAnimationCapabilities = () => {
  const { 
    shouldUseComplexAnimations, 
    shouldUseWebGL, 
    shouldUseGlassmorphism,
    getAnimationConfig 
  } = useBrowserCompatibility()
  
  return {
    complexAnimations: shouldUseComplexAnimations(),
    webgl: shouldUseWebGL(),
    glassmorphism: shouldUseGlassmorphism(),
    config: getAnimationConfig()
  }
}

/**
 * Component for conditional rendering based on browser capabilities
 */
export const BrowserFeature = ({ 
  feature, 
  fallback = null, 
  children 
}) => {
  const { isSupported } = useBrowserCompatibility()
  
  if (isSupported(feature)) {
    return children
  }
  
  return fallback
}

/**
 * Component for rendering different content based on browser age
 */
export const BrowserAware = ({ 
  modern, 
  legacy, 
  threshold = 'old' 
}) => {
  const { isOldBrowser, browserInfo } = useBrowserCompatibility()
  
  if (threshold === 'old' && isOldBrowser) {
    return legacy
  }
  
  if (threshold === 'mobile' && browserInfo.isMobile) {
    return legacy
  }
  
  return modern
}

export default BrowserCompatibilityProvider