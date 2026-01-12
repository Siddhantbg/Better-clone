import { useEffect, useRef } from 'react';

const ParticleSystem = ({
  particleCount = 100,
  mouseInteraction = true,
  particleSize = 2,
  connectionDistance = 150,
  particleSpeed = 0.5,
  colors = ['#7C3AED', '#8B5CF6', '#A855F7', '#C084FC']
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    // Particle class with physics-based movement
    class Particle {
      constructor() {
        this.reset();
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.originalVx = this.vx;
        this.originalVy = this.vy;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * particleSize + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.originalOpacity = this.opacity;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      update() {
        // Apply mouse interaction if enabled
        if (mouseInteraction && mouseRef.current.isActive) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = (200 - distance) / 200;
            const angle = Math.atan2(dy, dx);
            
            // Attract particles to mouse
            this.vx += Math.cos(angle) * force * 0.02;
            this.vy += Math.sin(angle) * force * 0.02;
            
            // Increase opacity near mouse
            this.opacity = Math.min(1, this.originalOpacity + force * 0.5);
          } else {
            // Return to original velocity when away from mouse
            this.vx += (this.originalVx - this.vx) * 0.02;
            this.vy += (this.originalVy - this.vy) * 0.02;
            this.opacity += (this.originalOpacity - this.opacity) * 0.02;
          }
        }

        // Apply velocity damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // Resize canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      ctx.scale(dpr, dpr);
      
      // Reset particles when canvas resizes
      if (particlesRef.current && Array.isArray(particlesRef.current)) {
        particlesRef.current.forEach(particle => {
          if (particle && particle.x > width || particle.y > height) {
            particle.reset();
          }
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      if (particlesRef.current && Array.isArray(particlesRef.current)) {
        particlesRef.current.forEach(particle => {
          if (particle && typeof particle.update === 'function' && typeof particle.draw === 'function') {
            particle.update();
            particle.draw();
          }
        });
      }
      
      // Draw connections
      drawConnections();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Setup
    resize();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resize);
    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, mouseInteraction, particleSize, connectionDistance, particleSpeed, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleSystem;