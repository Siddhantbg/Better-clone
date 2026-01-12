import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../config/theme.js';

/**
 * CryptoVisualElements Component
 * Collection of cryptocurrency-themed visual elements and icons
 * Requirements: 5.3
 */

// Bitcoin-style icon component
export const BitcoinIcon = ({ size = 24, color = COLORS.GOLD, animated = false }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [animated]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <circle cx="12" cy="12" r="10" fill={color} opacity="0.2" />
      <path
        d="M15.5 10.5c0-1.5-1-2.5-2.5-2.5h-1v-1h-1v1h-1v-1h-1v1h-2v1h1v6h-1v1h2v1h1v-1h1v1h1v-1h1c1.5 0 2.5-1 2.5-2.5 0-1-0.5-1.5-1-2 0.5-0.5 1-1 1-2z"
        fill={color}
      />
      <rect x="10" y="9" width="3" height="1" fill="white" />
      <rect x="10" y="11" width="3" height="1" fill="white" />
      <rect x="10" y="13" width="3" height="1" fill="white" />
    </svg>
  );
};

// Ethereum-style icon component
export const EthereumIcon = ({ size = 24, color = COLORS.PURPLE, animated = false }) => {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setPulse(prev => prev === 1 ? 1.2 : 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [animated]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `scale(${pulse})`, transition: 'transform 0.3s ease' }}
    >
      <polygon
        points="12,2 12,9 18,12 12,15 12,22 6,12"
        fill={color}
        opacity="0.8"
      />
      <polygon
        points="12,2 18,12 12,9"
        fill={color}
        opacity="0.6"
      />
      <polygon
        points="12,15 18,12 12,22"
        fill={color}
        opacity="0.4"
      />
    </svg>
  );
};

// Blockchain network visualization
export const BlockchainNetwork = ({ 
  width = 200, 
  height = 100, 
  nodeCount = 8,
  animated = true,
  color = COLORS.VIOLET 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Initialize nodes
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: (width / (nodeCount - 1)) * i,
      y: height / 2 + Math.sin(i) * 20,
      originalY: height / 2 + Math.sin(i) * 20,
      phase: Math.random() * Math.PI * 2,
      connections: i < nodeCount - 1 ? [i + 1] : [],
    }));

    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Update node positions if animated
      if (animated) {
        nodesRef.current.forEach(node => {
          node.y = node.originalY + Math.sin(time * 0.002 + node.phase) * 10;
        });
      }

      // Draw connections
      ctx.strokeStyle = `${color}60`;
      ctx.lineWidth = 2;
      
      nodesRef.current.forEach(node => {
        node.connections.forEach(connId => {
          const targetNode = nodesRef.current[connId];
          if (targetNode) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node, index) => {
        const radius = 8;
        
        // Create gradient
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, `${color}80`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Add glow
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw block number
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, node.x, node.y + 3);
      });

      if (animated) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, nodeCount, animated, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block' }}
    />
  );
};

// Crypto price ticker
export const CryptoPriceTicker = ({ 
  symbols = ['BTC', 'ETH', 'ADA'],
  animated = true,
  color = COLORS.GOLD 
}) => {
  const [prices, setPrices] = useState({});
  const [changes, setChanges] = useState({});

  useEffect(() => {
    // Generate mock price data
    const generatePrices = () => {
      const newPrices = {};
      const newChanges = {};
      
      symbols.forEach(symbol => {
        const basePrice = { BTC: 45000, ETH: 3000, ADA: 1.2 }[symbol] || 100;
        const change = (Math.random() - 0.5) * 0.1; // ±5% change
        
        newPrices[symbol] = basePrice * (1 + change);
        newChanges[symbol] = change;
      });
      
      setPrices(newPrices);
      setChanges(newChanges);
    };

    generatePrices();

    if (animated) {
      const interval = setInterval(generatePrices, 3000);
      return () => clearInterval(interval);
    }
  }, [symbols, animated]);

  return (
    <div className="crypto-price-ticker" style={{ display: 'flex', gap: '20px' }}>
      {symbols.map(symbol => (
        <div key={symbol} className="price-item" style={{ textAlign: 'center' }}>
          <div style={{ color: color, fontWeight: 'bold', fontSize: '14px' }}>
            {symbol}
          </div>
          <div style={{ color: 'white', fontSize: '16px' }}>
            ${prices[symbol]?.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div style={{ 
            color: changes[symbol] >= 0 ? COLORS.GOLD : COLORS.PURPLE,
            fontSize: '12px'
          }}>
            {changes[symbol] >= 0 ? '+' : ''}{(changes[symbol] * 100).toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
};

// Hash visualization
export const HashVisualization = ({ 
  hash = "1a2b3c4d5e6f7890abcdef1234567890",
  animated = true,
  color = COLORS.VIOLET 
}) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!animated) {
      setVisibleChars(hash.length);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setVisibleChars(current);
      
      if (current >= hash.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [hash, animated]);

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      fontSize: '14px',
      color: color,
      letterSpacing: '2px',
      wordBreak: 'break-all'
    }}>
      {hash.slice(0, visibleChars)}
      {animated && visibleChars < hash.length && (
        <span style={{ animation: 'blink 1s infinite' }}>|</span>
      )}
    </div>
  );
};

// Mining animation
export const MiningAnimation = ({ 
  size = 100,
  color = COLORS.GOLD,
  speed = 1 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    const animate = (time) => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 3;

      // Draw rotating mining rings
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = radius - ring * 10;
        const rotation = (time * 0.001 * speed + ring * Math.PI / 3) % (Math.PI * 2);
        
        ctx.strokeStyle = `${color}${Math.floor((1 - ring * 0.3) * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 3;
        
        // Draw partial circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, rotation, rotation + Math.PI);
        ctx.stroke();
      }

      // Draw center hash symbol
      ctx.fillStyle = color;
      ctx.font = `${size / 4}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('#', centerX, centerY + size / 12);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, speed]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

// Main component that combines all elements
const CryptoVisualElements = ({ 
  type = 'network', // 'network', 'ticker', 'hash', 'mining', 'icons'
  ...props 
}) => {
  switch (type) {
    case 'network':
      return <BlockchainNetwork {...props} />;
    case 'ticker':
      return <CryptoPriceTicker {...props} />;
    case 'hash':
      return <HashVisualization {...props} />;
    case 'mining':
      return <MiningAnimation {...props} />;
    case 'bitcoin':
      return <BitcoinIcon {...props} />;
    case 'ethereum':
      return <EthereumIcon {...props} />;
    default:
      return <BlockchainNetwork {...props} />;
  }
};

export default CryptoVisualElements;