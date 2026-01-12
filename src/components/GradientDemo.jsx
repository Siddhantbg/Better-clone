// Gradient Demo Component - showcases the gradient system
import React from 'react';
import { useGradientAnimation, useHoverGradient, useGradientMesh } from '../hooks/useGradientAnimation.js';
import { GRADIENT_PRESETS, getGradientStyles } from '../utils/gradients.js';

/**
 * Demo component showcasing the gradient system capabilities
 * This component demonstrates various gradient presets and animations
 */
const GradientDemo = () => {
  // Hero gradient animation
  const heroGradient = useGradientAnimation({
    category: 'hero',
    variant: 'animated',
    duration: '4s',
    autoStart: true
  });

  // Button hover gradient
  const buttonHover = useHoverGradient(
    GRADIENT_PRESETS.button.primary,
    GRADIENT_PRESETS.button.hover,
    '0.3s ease'
  );

  // Gradient mesh background
  const meshBackground = useGradientMesh([
    { x: 20, y: 80, color: '#7C3AED', size: 50, opacity: 0.3 },
    { x: 80, y: 20, color: '#8B5CF6', size: 60, opacity: 0.2 },
    { x: 50, y: 50, color: '#F59E0B', size: 40, opacity: 0.15 }
  ], { animate: true, duration: '6s' });

  return (
    <div className="gradient-demo-container p-8 space-y-8">
      <h2 className="text-3xl font-bold gradient-text-animated">
        Gradient System Demo
      </h2>

      {/* Hero Gradient Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Hero Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            ref={heroGradient.elementRef}
            className="h-32 rounded-lg flex items-center justify-center text-white font-medium"
          >
            Animated Hero
          </div>
          <div 
            className="h-32 rounded-lg flex items-center justify-center text-white font-medium"
            style={getGradientStyles('hero', 'primary')}
          >
            Static Hero
          </div>
          <div 
            className="h-32 rounded-lg flex items-center justify-center text-white font-medium"
            style={getGradientStyles('hero', 'particles')}
          >
            Particles Hero
          </div>
        </div>
      </div>

      {/* Card Gradients Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Card Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className="gradient-card-glass h-24 rounded-lg flex items-center justify-center text-white font-medium backdrop-blur-sm"
          >
            Glass Card
          </div>
          <div 
            className="gradient-card-hover h-24 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer"
          >
            Hover Card
          </div>
          <div 
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium gradient-border"
          >
            Border Card
          </div>
          <div 
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium"
            style={getGradientStyles('card', 'subtle')}
          >
            Subtle Card
          </div>
        </div>
      </div>

      {/* Button Gradients Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Button Gradients</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            ref={buttonHover.elementRef}
            onMouseEnter={buttonHover.handleMouseEnter}
            onMouseLeave={buttonHover.handleMouseLeave}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:transform hover:scale-105"
          >
            Hover Button
          </button>
          <button className="gradient-button-animated px-6 py-3 rounded-lg text-white font-medium">
            Animated Button
          </button>
          <button className="gradient-button-magnetic px-6 py-3 rounded-lg text-white font-medium">
            Magnetic Button
          </button>
          <button 
            className="px-6 py-3 rounded-lg text-white font-medium"
            style={getGradientStyles('button', 'primary')}
          >
            Static Button
          </button>
        </div>
      </div>

      {/* Text Gradients Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Text Gradients</h3>
        <div className="space-y-2">
          <p className="text-2xl font-bold gradient-text-primary">
            Primary Gradient Text
          </p>
          <p className="text-2xl font-bold gradient-text-animated">
            Animated Gradient Text
          </p>
          <p 
            className="text-2xl font-bold"
            style={{
              background: GRADIENT_PRESETS.text.accent,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Accent Gradient Text
          </p>
        </div>
      </div>

      {/* Background Gradients Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Background Gradients</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            ref={meshBackground.elementRef}
            className="h-32 rounded-lg flex items-center justify-center text-white font-medium relative overflow-hidden"
          >
            <div className="relative z-10">Gradient Mesh</div>
          </div>
          <div 
            className="h-32 rounded-lg flex items-center justify-center text-white font-medium relative"
            style={getGradientStyles('background', 'section')}
          >
            Section Background
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Animation Controls</h3>
        <div className="flex gap-4">
          <button
            onClick={heroGradient.toggleAnimation}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors"
          >
            {heroGradient.isAnimating ? 'Pause' : 'Play'} Hero Animation
          </button>
          <button
            onClick={() => heroGradient.updateGradient('hero', 'particles')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
          >
            Switch to Particles
          </button>
          <button
            onClick={() => heroGradient.updateGradient('hero', 'primary')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
          >
            Switch to Primary
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradientDemo;