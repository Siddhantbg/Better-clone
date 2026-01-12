import React, { useEffect, useRef } from 'react';
import { COLORS } from '../config/theme.js';

/**
 * AnimatedBorders Component
 * Creates animated borders and outlines for crypto-style containers
 * Requirements: 5.5
 */
const AnimatedBorders = ({
  children,
  borderType = 'gradient', // 'gradient', 'neon', 'circuit', 'hexagon', 'pulse'
  borderWidth = 2,
  borderRadius = 8,
  animationSpeed = 2,
  colors = [COLORS.VIOLET, COLORS.PURPLE, COLORS.GOLD],
  glowIntensity = 0.5,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Animation utilities
  const drawGradientBorder = (ctx, width, height, time) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    const colorCount = colors.length;
    
    // Animate gradient by shifting color positions
    colors.forEach((color, index) => {
      const position = ((index / colorCount) + (time * 0.001 * animationSpeed)) % 1;
      gradient.addColorStop(position, color);
    });
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
    
    // Add glow effect
    ctx.shadowColor = colors[0];
    ctx.shadowBlur = 10 * glowIntensity;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
    ctx.shadowBlur = 0;
  };

  const drawNeonBorder = (ctx, width, height, time) => {
    const pulseIntensity = 0.5 + 0.5 * Math.sin(time * 0.003 * animationSpeed);
    
    // Multiple glow layers for neon effect
    const glowLayers = [
      { blur: 20, alpha: 0.3 * pulseIntensity },
      { blur: 10, alpha: 0.5 * pulseIntensity },
      { blur: 5, alpha: 0.8 * pulseIntensity },
      { blur: 2, alpha: 1.0 * pulseIntensity },
    ];
    
    glowLayers.forEach(layer => {
      ctx.strokeStyle = `${colors[0]}${Math.floor(layer.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = borderWidth + layer.blur;
      ctx.shadowColor = colors[0];
      ctx.shadowBlur = layer.blur * glowIntensity;
      ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
    });
    
    ctx.shadowBlur = 0;
  };

  const drawCircuitBorder = (ctx, width, height, time) => {
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = borderWidth;
    
    const segmentLength = 20;
    const gap = 10;
    const totalLength = (width + height) * 2;
    const animationOffset = (time * 0.1 * animationSpeed) % (segmentLength + gap);
    
    // Draw animated dashed border
    ctx.setLineDash([segmentLength, gap]);
    ctx.lineDashOffset = -animationOffset;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth);
    
    // Draw corner nodes
    const nodeSize = 6;
    const corners = [
      [borderWidth / 2, borderWidth / 2],
      [width - borderWidth / 2, borderWidth / 2],
      [width - borderWidth / 2, height - borderWidth / 2],
      [borderWidth / 2, height - borderWidth / 2],
    ];
    
    ctx.fillStyle = colors[1];
    corners.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow to nodes
      ctx.shadowColor = colors[1];
      ctx.shadowBlur = 8 * glowIntensity;
      ctx.fill();
    });
    
    ctx.shadowBlur = 0;
    ctx.setLineDash([]);
  };

  const drawHexagonBorder = (ctx, width, height, time) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - borderWidth;
    
    // Draw hexagon path
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + (time * 0.001 * animationSpeed);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    
    // Animate colors
    const colorIndex = Math.floor((time * 0.001 * animationSpeed) % colors.length);
    const nextColorIndex = (colorIndex + 1) % colors.length;
    const blend = ((time * 0.001 * animationSpeed) % 1);
    
    // Create gradient between current and next color
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors[colorIndex]);
    gradient.addColorStop(1, colors[nextColorIndex]);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = borderWidth;
    ctx.stroke();
    
    // Add glow
    ctx.shadowColor = colors[colorIndex];
    ctx.shadowBlur = 15 * glowIntensity;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawPulseBorder = (ctx, width, height, time) => {
    const pulsePhase = (time * 0.002 * animationSpeed) % (Math.PI * 2);
    const pulseIntensity = 0.3 + 0.7 * (Math.sin(pulsePhase) * 0.5 + 0.5);
    
    // Multiple pulse rings
    const rings = 3;
    for (let ring = 0; ring < rings; ring++) {
      const ringPhase = pulsePhase + (ring * Math.PI * 2) / rings;
      const ringIntensity = 0.2 + 0.8 * (Math.sin(ringPhase) * 0.5 + 0.5);
      const ringWidth = borderWidth + ring * 2;
      
      ctx.strokeStyle = `${colors[ring % colors.length]}${Math.floor(ringIntensity * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = ringWidth;
      ctx.shadowColor = colors[ring % colors.length];
      ctx.shadowBlur = 10 * glowIntensity * ringIntensity;
      
      ctx.strokeRect(
        ringWidth / 2,
        ringWidth / 2,
        width - ringWidth,
        height - ringWidth
      );
    }
    
    ctx.shadowBlur = 0;
  };

  // Main animation loop
  const animate = (currentTime) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const rect = container.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw border based on type
    switch (borderType) {
      case 'gradient':
        drawGradientBorder(ctx, canvas.width, canvas.height, currentTime);
        break;
      case 'neon':
        drawNeonBorder(ctx, canvas.width, canvas.height, currentTime);
        break;
      case 'circuit':
        drawCircuitBorder(ctx, canvas.width, canvas.height, currentTime);
        break;
      case 'hexagon':
        drawHexagonBorder(ctx, canvas.width, canvas.height, currentTime);
        break;
      case 'pulse':
        drawPulseBorder(ctx, canvas.width, canvas.height, currentTime);
        break;
      default:
        drawGradientBorder(ctx, canvas.width, canvas.height, currentTime);
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    if (!canvas || !container) return;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [borderType, colors, animationSpeed, glowIntensity]);

  return (
    <div
      ref={containerRef}
      className={`animated-borders-container ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          borderRadius: `${borderRadius}px`,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: `${borderWidth * 2}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorders;