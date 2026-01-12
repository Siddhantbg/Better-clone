import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../config/theme.js';

/**
 * AnimatedGradientMesh Component
 * Creates time-based gradient animations with geometric patterns and constellation lines
 * Requirements: 5.1, 5.2, 9.5
 */
const AnimatedGradientMesh = ({
  nodeCount = 8,
  connectionDistance = 200,
  animationSpeed = 0.5,
  geometricPatterns = true,
  constellationLines = true,
  colors = [COLORS.VIOLET, COLORS.PURPLE, COLORS.GOLD],
  opacity = 0.6,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize gradient nodes with random positions and velocities
  const initializeNodes = (width, height) => {
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        color: colors[i % colors.length],
        size: 100 + Math.random() * 100,
        phase: Math.random() * Math.PI * 2,
        frequency: 0.5 + Math.random() * 0.5,
      });
    }
    return nodes;
  };

  // Update node positions with boundary bouncing
  const updateNodes = (nodes, width, height, deltaTime) => {
    nodes.forEach(node => {
      // Update position
      node.x += node.vx * deltaTime * 60;
      node.y += node.vy * deltaTime * 60;

      // Bounce off boundaries
      if (node.x <= 0 || node.x >= width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(width, node.x));
      }
      if (node.y <= 0 || node.y >= height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(height, node.y));
      }

      // Update phase for pulsing effect
      node.phase += node.frequency * deltaTime;
    });
  };

  // Draw gradient mesh
  const drawGradientMesh = (ctx, nodes, width, height, time) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Create gradient mesh background
    nodes.forEach(node => {
      const pulseFactor = 0.8 + 0.2 * Math.sin(node.phase);
      const currentSize = node.size * pulseFactor;
      
      // Create radial gradient for each node
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, currentSize
      );
      
      // Parse color and add alpha
      const colorWithAlpha = hexToRgba(node.color, opacity * pulseFactor);
      gradient.addColorStop(0, colorWithAlpha);
      gradient.addColorStop(0.5, hexToRgba(node.color, opacity * 0.3 * pulseFactor));
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });

    // Draw geometric patterns if enabled
    if (geometricPatterns) {
      drawGeometricPatterns(ctx, nodes, time);
    }

    // Draw constellation lines if enabled
    if (constellationLines) {
      drawConstellationLines(ctx, nodes);
    }
  };

  // Draw geometric pattern overlays
  const drawGeometricPatterns = (ctx, nodes, time) => {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.strokeStyle = hexToRgba(COLORS.VIOLET, 0.2);
    ctx.lineWidth = 1;

    nodes.forEach((node, index) => {
      const rotationSpeed = 0.2 + (index % 3) * 0.1;
      const rotation = time * rotationSpeed;
      
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.rotate(rotation);

      // Draw hexagonal pattern
      if (index % 3 === 0) {
        drawHexagon(ctx, 0, 0, 30 + 10 * Math.sin(time + index));
      }
      // Draw triangular pattern
      else if (index % 3 === 1) {
        drawTriangle(ctx, 0, 0, 25 + 8 * Math.cos(time + index));
      }
      // Draw circular pattern
      else {
        drawCircle(ctx, 0, 0, 20 + 6 * Math.sin(time * 1.5 + index));
      }

      ctx.restore();
    });

    ctx.restore();
  };

  // Draw constellation connecting lines
  const drawConstellationLines = (ctx, nodes) => {
    ctx.save();
    ctx.strokeStyle = hexToRgba(COLORS.PURPLE, 0.3);
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const node1 = nodes[i];
        const node2 = nodes[j];
        const distance = Math.sqrt(
          Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
        );

        if (distance < connectionDistance) {
          const alpha = 1 - (distance / connectionDistance);
          ctx.strokeStyle = hexToRgba(COLORS.PURPLE, alpha * 0.4);
          
          ctx.beginPath();
          ctx.moveTo(node1.x, node1.y);
          ctx.lineTo(node2.x, node2.y);
          ctx.stroke();

          // Draw connection nodes
          const midX = (node1.x + node2.x) / 2;
          const midY = (node1.y + node2.y) / 2;
          ctx.fillStyle = hexToRgba(COLORS.GOLD, alpha * 0.6);
          ctx.beginPath();
          ctx.arc(midX, midY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  };

  // Geometric shape drawing functions
  const drawHexagon = (ctx, x, y, size) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  };

  const drawTriangle = (ctx, x, y, size) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size * 0.866, y + size * 0.5);
    ctx.lineTo(x + size * 0.866, y + size * 0.5);
    ctx.closePath();
    ctx.stroke();
  };

  const drawCircle = (ctx, x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  };

  // Utility function to convert hex to rgba
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Handle canvas resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    setDimensions({ width: rect.width, height: rect.height });
    
    // Reinitialize nodes with new dimensions
    nodesRef.current = initializeNodes(rect.width, rect.height);
  };

  // Animation loop
  const animate = (currentTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = dimensions;
    
    if (width === 0 || height === 0) return;

    const deltaTime = currentTime * 0.001; // Convert to seconds
    
    // Update node positions
    updateNodes(nodesRef.current, width, height, deltaTime * animationSpeed);
    
    // Draw the mesh
    drawGradientMesh(ctx, nodesRef.current, width, height, deltaTime);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize component
  useEffect(() => {
    handleResize();
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Update animation when props change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      nodesRef.current = initializeNodes(dimensions.width, dimensions.height);
    }
  }, [nodeCount, colors, animationSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className={`animated-gradient-mesh ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        ...style,
      }}
    />
  );
};

export default AnimatedGradientMesh;