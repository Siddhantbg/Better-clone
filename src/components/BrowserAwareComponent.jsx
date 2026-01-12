import React, { useEffect, useRef } from 'react'
import { useBrowserFallbacks, useConditionalRender } from '../hooks/useBrowserFallbacks'
import { BrowserFeature, BrowserAware } from './BrowserCompatibilityProvider'

/**
 * Example component demonstrating browser compatibility patterns
 * This shows how to implement progressive enhancement and graceful degradation
 */
const BrowserAwareComponent = ({ 
  title = "Browser Aware Component",
  enableParticles = true,
  enableGlassmorphism = true,
  enableComplexAnimations = true
}) => {
  const containerRef = useRef(null)
  
  const { 
    getComponentProps, 
    getCSSClasses, 
    shouldEnableFeature,
    capabilities 
  } = useBrowserFallbacks('gsap-timeline')

  const { shouldRender: shouldRenderParticles } = useConditionalRender('particles')

  // Get browser-appropriate props
  const componentProps = getComponentProps({
    enableParticles,
    enableGlassmorphism,
    enableComplexAnimations
  })

  // Get CSS classes based on browser capabilities
  const cssClasses = getCSSClasses('browser-aware-component')

  useEffect(() => {
    // Initialize component based on browser capabilities
    if (containerRef.current) {
      // Apply appropriate initialization based on browser support
      if (capabilities.complexAnimations) {
        // Initialize complex animations
        console.log('Initializing complex animations')
      } else {
        // Use simple CSS animations
        console.log('Using simple CSS animations')
      }
    }
  }, [capabilities])

  return (
    <div 
      ref={containerRef}
      className={`relative p-6 rounded-lg ${cssClasses}`}
    >
      {/* Title with gradient text - falls back to solid color */}
      <BrowserFeature 
        feature="css-gradients"
        fallback={<h2 className="text-2xl font-bold text-violet-400 mb-4">{title}</h2>}
      >
        <h2 className="text-2xl font-bold gradient-text-primary mb-4">{title}</h2>
      </BrowserFeature>

      {/* Glassmorphism card - falls back to solid background */}
      <BrowserFeature
        feature="css-backdrop-filter"
        fallback={
          <div className="bg-slate-800 border border-violet-500 p-4 rounded-lg mb-4">
            <p className="text-gray-300">
              Solid background fallback for browsers without backdrop-filter support.
            </p>
          </div>
        }
      >
        <div className="glass-card p-4 rounded-lg mb-4">
          <p className="text-gray-300">
            Glassmorphism effect with backdrop blur and transparency.
          </p>
        </div>
      </BrowserFeature>

      {/* Particle system - only renders if WebGL is supported */}
      {shouldRenderParticles && enableParticles && (
        <BrowserFeature feature="webgl">
          <div className="particle-container relative h-32 mb-4 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-purple-900/20">
              <div className="particle-system">
                {/* Particle system would be initialized here */}
                <div className="text-center py-12 text-violet-300">
                  WebGL Particle System Active
                </div>
              </div>
            </div>
          </div>
        </BrowserFeature>
      )}

      {/* Fallback for no WebGL support */}
      <BrowserFeature 
        feature="webgl"
        fallback={
          enableParticles && (
            <div className="css-particle-fallback relative h-32 mb-4 overflow-hidden rounded-lg bg-gradient-to-r from-violet-900/20 to-purple-900/20">
              <div className="text-center py-12 text-violet-300">
                CSS Particle Fallback
              </div>
              {/* Simple CSS particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-violet-300 rounded-full animate-ping"></div>
            </div>
          )
        }
      />

      {/* 3D hover effects - falls back to 2D */}
      <BrowserAware
        modern={
          <div className="card-3d-hover p-4 bg-violet-900/20 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:rotate-1">
            <p className="text-violet-200">3D hover effects enabled</p>
          </div>
        }
        legacy={
          <div className="p-4 bg-violet-900/20 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-violet-800/30">
            <p className="text-violet-200">2D hover effects (fallback)</p>
          </div>
        }
      />

      {/* Browser capabilities display */}
      <div className="mt-6 p-4 bg-slate-900/50 rounded-lg">
        <h3 className="text-lg font-semibold text-violet-300 mb-2">Browser Capabilities</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className={`flex items-center ${capabilities.webgl ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.webgl ? '✓' : '✗'}</span>
            WebGL Support
          </div>
          <div className={`flex items-center ${capabilities.glassmorphism ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.glassmorphism ? '✓' : '✗'}</span>
            Backdrop Filter
          </div>
          <div className={`flex items-center ${capabilities.complexAnimations ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.complexAnimations ? '✓' : '✗'}</span>
            Complex Animations
          </div>
          <div className={`flex items-center ${capabilities.transforms ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.transforms ? '✓' : '✗'}</span>
            CSS Transforms
          </div>
          <div className={`flex items-center ${capabilities.animations ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.animations ? '✓' : '✗'}</span>
            CSS Animations
          </div>
          <div className={`flex items-center ${capabilities.customProperties ? 'text-green-400' : 'text-red-400'}`}>
            <span className="mr-2">{capabilities.customProperties ? '✓' : '✗'}</span>
            CSS Variables
          </div>
        </div>
      </div>

      {/* Feature-specific content */}
      <div className="mt-4 space-y-2">
        {shouldEnableFeature('particles') && (
          <div className="text-sm text-green-400">✓ Particle effects available</div>
        )}
        {shouldEnableFeature('glassmorphism') && (
          <div className="text-sm text-green-400">✓ Glassmorphism effects available</div>
        )}
        {shouldEnableFeature('complexAnimations') && (
          <div className="text-sm text-green-400">✓ Complex animations available</div>
        )}
        {!shouldEnableFeature('particles') && (
          <div className="text-sm text-yellow-400">⚠ Using particle fallbacks</div>
        )}
        {!shouldEnableFeature('glassmorphism') && (
          <div className="text-sm text-yellow-400">⚠ Using solid backgrounds</div>
        )}
        {!shouldEnableFeature('complexAnimations') && (
          <div className="text-sm text-yellow-400">⚠ Using simplified animations</div>
        )}
      </div>
    </div>
  )
}

export default BrowserAwareComponent