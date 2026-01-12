import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../config/theme.js';

/**
 * CryptoDataVisualization Component
 * Creates animated charts, graphs, and cryptocurrency-themed visual elements
 * Requirements: 5.3, 5.5
 */
const CryptoDataVisualization = ({
  type = 'line', // 'line', 'bar', 'candlestick', 'network', 'hexGrid'
  data = [],
  width = 400,
  height = 200,
  animated = true,
  theme = 'violet',
  showGrid = true,
  showLabels = true,
  animationDuration = 2000,
  className = '',
  style = {},
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Color schemes for different themes
  const colorSchemes = {
    violet: {
      primary: COLORS.VIOLET,
      secondary: COLORS.PURPLE,
      accent: COLORS.GOLD,
      grid: `${COLORS.VIOLET}40`,
      text: COLORS.WHITE,
    },
    purple: {
      primary: COLORS.PURPLE,
      secondary: COLORS.VIOLET,
      accent: COLORS.GOLD,
      grid: `${COLORS.PURPLE}40`,
      text: COLORS.WHITE,
    },
    gold: {
      primary: COLORS.GOLD,
      secondary: COLORS.VIOLET,
      accent: COLORS.PURPLE,
      grid: `${COLORS.GOLD}40`,
      text: COLORS.WHITE,
    },
  };

  const colors = colorSchemes[theme] || colorSchemes.violet;

  // Generate sample crypto data if none provided
  const generateSampleData = (type) => {
    const baseValue = 50000;
    const points = 50;
    
    switch (type) {
      case 'line':
        return Array.from({ length: points }, (_, i) => ({
          x: i,
          y: baseValue + Math.sin(i * 0.2) * 5000 + Math.random() * 2000 - 1000,
          timestamp: Date.now() - (points - i) * 60000,
        }));
      
      case 'bar':
        return Array.from({ length: 12 }, (_, i) => ({
          label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          value: Math.random() * 100000 + 20000,
          color: i % 2 === 0 ? colors.primary : colors.secondary,
        }));
      
      case 'candlestick':
        return Array.from({ length: 20 }, (_, i) => {
          const open = baseValue + Math.random() * 10000 - 5000;
          const close = open + Math.random() * 4000 - 2000;
          const high = Math.max(open, close) + Math.random() * 2000;
          const low = Math.min(open, close) - Math.random() * 2000;
          return { open, high, low, close, x: i };
        });
      
      case 'network':
        return Array.from({ length: 15 }, (_, i) => ({
          id: i,
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.8 + height * 0.1,
          connections: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () => 
            Math.floor(Math.random() * 15)
          ).filter(id => id !== i),
          value: Math.random() * 100,
        }));
      
      case 'hexGrid':
        const hexData = [];
        const hexSize = 20;
        const cols = Math.floor(width / (hexSize * 1.5));
        const rows = Math.floor(height / (hexSize * Math.sqrt(3)));
        
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
            const y = row * hexSize * Math.sqrt(3) * 0.5;
            hexData.push({
              x,
              y,
              size: hexSize,
              value: Math.random(),
              active: Math.random() > 0.7,
            });
          }
        }
        return hexData;
      
      default:
        return [];
    }
  };

  const chartData = data.length > 0 ? data : generateSampleData(type);

  // Animation utilities
  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Drawing functions for different chart types
  const drawLineChart = (ctx, data, progress) => {
    if (data.length === 0) return;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find data bounds
    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));
    const minX = Math.min(...data.map(d => d.x));
    const maxX = Math.max(...data.map(d => d.x));

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }
    }

    // Draw animated line
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.5, colors.secondary);
    gradient.addColorStop(1, colors.accent);
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    
    const visiblePoints = Math.floor(data.length * progress);
    
    for (let i = 0; i < visiblePoints; i++) {
      const point = data[i];
      const x = padding + ((point.x - minX) / (maxX - minX)) * chartWidth;
      const y = height - padding - ((point.y - minY) / (maxY - minY)) * chartHeight;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();

    // Draw glow effect
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw data points
    ctx.fillStyle = colors.accent;
    for (let i = 0; i < visiblePoints; i++) {
      const point = data[i];
      const x = padding + ((point.x - minX) / (maxX - minX)) * chartWidth;
      const y = height - padding - ((point.y - minY) / (maxY - minY)) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawBarChart = (ctx, data, progress) => {
    if (data.length === 0) return;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;

    const maxValue = Math.max(...data.map(d => d.value));

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // Draw animated bars
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight = (item.value / maxValue) * chartHeight * progress;
      const y = height - padding - barHeight;

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, item.color || colors.primary);
      gradient.addColorStop(1, `${item.color || colors.primary}80`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Add glow effect
      ctx.shadowColor = item.color || colors.primary;
      ctx.shadowBlur = 8;
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.shadowBlur = 0;

      // Draw labels
      if (showLabels && progress > 0.8) {
        ctx.fillStyle = colors.text;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + barWidth / 2, height - padding + 20);
      }
    });
  };

  const drawCandlestickChart = (ctx, data, progress) => {
    if (data.length === 0) return;

    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const candleWidth = chartWidth / data.length * 0.6;

    const allValues = data.flatMap(d => [d.open, d.high, d.low, d.close]);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    const visibleCandles = Math.floor(data.length * progress);

    // Draw grid
    if (showGrid) {
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
      }
    }

    // Draw candlesticks
    for (let i = 0; i < visibleCandles; i++) {
      const candle = data[i];
      const x = padding + (i + 0.5) * (chartWidth / data.length);
      
      const openY = height - padding - ((candle.open - minValue) / (maxValue - minValue)) * chartHeight;
      const closeY = height - padding - ((candle.close - minValue) / (maxValue - minValue)) * chartHeight;
      const highY = height - padding - ((candle.high - minValue) / (maxValue - minValue)) * chartHeight;
      const lowY = height - padding - ((candle.low - minValue) / (maxValue - minValue)) * chartHeight;

      const isGreen = candle.close > candle.open;
      const bodyColor = isGreen ? colors.accent : colors.secondary;
      const wickColor = colors.primary;

      // Draw wick
      ctx.strokeStyle = wickColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw body
      ctx.fillStyle = bodyColor;
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY);
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);

      // Add glow
      ctx.shadowColor = bodyColor;
      ctx.shadowBlur = 6;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      ctx.shadowBlur = 0;
    }
  };

  const drawNetworkChart = (ctx, data, progress) => {
    if (data.length === 0) return;

    const visibleNodes = Math.floor(data.length * progress);

    // Draw connections first
    ctx.strokeStyle = `${colors.primary}60`;
    ctx.lineWidth = 2;

    for (let i = 0; i < visibleNodes; i++) {
      const node = data[i];
      node.connections.forEach(connectionId => {
        if (connectionId < visibleNodes && connectionId < data.length) {
          const targetNode = data[connectionId];
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
        }
      });
    }

    // Draw nodes
    for (let i = 0; i < visibleNodes; i++) {
      const node = data[i];
      const radius = 8 + (node.value / 100) * 12;

      // Create radial gradient for node
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
      gradient.addColorStop(0, colors.accent);
      gradient.addColorStop(0.7, colors.primary);
      gradient.addColorStop(1, colors.secondary);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw inner circle
      ctx.fillStyle = colors.text;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawHexGrid = (ctx, data, progress) => {
    if (data.length === 0) return;

    const visibleHexes = Math.floor(data.length * progress);

    for (let i = 0; i < visibleHexes; i++) {
      const hex = data[i];
      
      // Draw hexagon
      ctx.beginPath();
      for (let j = 0; j < 6; j++) {
        const angle = (j * Math.PI) / 3;
        const x = hex.x + hex.size * Math.cos(angle);
        const y = hex.y + hex.size * Math.sin(angle);
        
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      // Fill based on value and active state
      if (hex.active) {
        const intensity = hex.value;
        ctx.fillStyle = `${colors.primary}${Math.floor(intensity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Add glow for active hexes
        ctx.shadowColor = colors.accent;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw border
      ctx.strokeStyle = `${colors.secondary}80`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  // Main drawing function
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    const progress = easeInOutCubic(animationProgress);

    switch (type) {
      case 'line':
        drawLineChart(ctx, chartData, progress);
        break;
      case 'bar':
        drawBarChart(ctx, chartData, progress);
        break;
      case 'candlestick':
        drawCandlestickChart(ctx, chartData, progress);
        break;
      case 'network':
        drawNetworkChart(ctx, chartData, progress);
        break;
      case 'hexGrid':
        drawHexGrid(ctx, chartData, progress);
        break;
      default:
        drawLineChart(ctx, chartData, progress);
    }
  };

  // Animation loop
  useEffect(() => {
    if (!animated) {
      setAnimationProgress(1);
      return;
    }

    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, animationDuration, type]);

  // Draw when progress changes
  useEffect(() => {
    draw();
  }, [animationProgress, chartData, type, theme]);

  return (
    <div className={`crypto-data-visualization ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'block',
        }}
      />
    </div>
  );
};

export default CryptoDataVisualization;