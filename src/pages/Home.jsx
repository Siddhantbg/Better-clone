import { FaStopwatch, FaStar } from "react-icons/fa";
import phoneImg from '../assets/hero-variant.png';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import BentoGrid from "../components/BentoGrid.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import SecHome from '../components/SecHome.jsx';
import RouteTransitionWrapper from '../components/RouteTransitionWrapper';
import { getGradientStyles } from '../utils/gradients.js';
import { getGradientMeshConfig } from '../utils/gradientMesh.js';
import '../styles/animated-gradient-mesh.css';
import '../styles/crypto-visualizations.css';

// Lazy load heavy animation components for better performance
const Orb = lazy(() => import('../components/Orb'));
const ParticleSystem = lazy(() => import('../components/ParticleSystem'));
const AnimatedGradientMesh = lazy(() => import('../components/AnimatedGradientMesh'));
const CryptoDataVisualization = lazy(() => import('../components/CryptoDataVisualization'));
const CryptoVisualElements = lazy(() => import('../components/CryptoVisualElements'));
const AnimatedBorders = lazy(() => import('../components/AnimatedBorders'));

const Home = () => {
  const testimonialRef = useRef();
  const heroRef = useRef();
  const [navbarLight, setNavbarLight] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Performance check - disable heavy animations on lower-end devices
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  // Intersection observer for lazy loading animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Simple performance check
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setIsHighPerformance(false);
        return;
      }
      
      // Check for hardware acceleration
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer.includes('SwiftShader') || renderer.includes('Software')) {
          setIsHighPerformance(false);
        }
      }
      
      // Check device memory if available
      if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        setIsHighPerformance(false);
      }
    };
    
    checkPerformance();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const isDesktop = window.innerWidth >= 1024;
        const isHeroVisible = isDesktop
          ? rect.bottom > window.innerHeight * 0.1
          : rect.bottom > window.innerHeight * 0.15;

        setNavbarLight(!isHeroVisible);
      }
    };

    const scrollObserver = new IntersectionObserver(
      () => {
        handleScroll();
      },
      { threshold: 0 }
    );

    if (heroRef.current) scrollObserver.observe(heroRef.current);
    if (testimonialRef.current) scrollObserver.observe(testimonialRef.current);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      scrollObserver.disconnect();
    };
  }, []);


  return (
    <RouteTransitionWrapper>
      <Navbar changeColor={navbarLight} />
      <div
        ref={heroRef}
        id="heroSection"
        className="text-white h-screen max-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden hero-gradient gradient-mesh-container"
        style={getGradientStyles('hero', 'primary')}>

        {/* Background Layer - Z-Index 1 */}
        <div className="absolute inset-0 z-[1]">
          {/* Animated Gradient Mesh Background - Only load when in view */}
          {isIntersecting && (
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900" />}>
              <AnimatedGradientMesh
                {...getGradientMeshConfig('hero')}
                className="hero-gradient-mesh"
              />
            </Suspense>
          )}
          
          {/* Gradient Mesh Overlay */}
          <div className="gradient-mesh-overlay absolute inset-0 bg-black/20" />
        </div>

        {/* Interactive Background Effects - Z-Index 2 */}
        {isHighPerformance && isIntersecting && (
          <div className="absolute inset-0 z-[2]">
            {/* Particle System Background */}
            <Suspense fallback={null}>
              <ParticleSystem
                particleCount={30}
                mouseInteraction={true}
                particleSize={1.5}
                connectionDistance={80}
                particleSpeed={0.15}
                colors={['#7C3AED', '#8B5CF6', '#A855F7', '#C084FC']}
              />
            </Suspense>
            
            {/* Orb Background Effect */}
            <div className="absolute inset-0 opacity-15">
              <Suspense fallback={null}>
                <Orb
                  hoverIntensity={0.2}
                  rotateOnHover={true}
                  hue={280}
                  forceHoverState={false}
                  backgroundColor="transparent"
                  colorScheme="violet"
                  proximityRadius={0.8}
                  intensityMultiplier={0.6}
                />
              </Suspense>
            </div>
          </div>
        )}

        {/* Main Content Container - Z-Index 10 */}
        <div className="relative w-full max-w-7xl mx-auto h-full z-[10] flex flex-col pt-20 md:pt-24">
          
          {/* Header Text Section - Fixed positioning with higher z-index */}
          <div className="flex-shrink-0 text-center pt-4 md:pt-8 lg:pt-12 pb-2 relative z-20">
            <div className="hidden md:block">
              <h1 className="text-white text-[50px] lg:text-[70px] xl:text-[85px] font-bold leading-[0.9] tracking-tight drop-shadow-lg">
                Crypto Payment
              </h1>
              <h2 className="text-white text-[50px] lg:text-[70px] xl:text-[85px] font-bold leading-[0.9] tracking-tight -mt-2 drop-shadow-lg">
                made simple
              </h2>
            </div>

            <div className="block md:hidden px-4">
              <h1 className="text-white text-[28px] xs:text-[32px] sm:text-[36px] font-bold leading-tight drop-shadow-lg">
                Crypto Payment <br />
                made simple
              </h1>
            </div>
          </div>

          {/* Phone Image Container - Flexible grow with lower z-index */}
          <div className="flex-grow flex items-center justify-center relative min-h-0 py-2 z-10">
            <div className="relative w-full max-w-[700px] h-full flex items-center justify-center">
              <img
                src={phoneImg}
                alt="Phone UI"
                className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[520px] xl:max-w-[580px] h-auto object-contain"
                loading="eager"
              />
            </div>
          </div>

          {/* Bottom Action Section - Fixed positioning */}
          <div className="flex-shrink-0 pb-6 md:pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 px-4 md:px-8">
              
              {/* Start Approval Button */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <button
                  className="text-white font-medium px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full text-sm md:text-base lg:text-lg transition whitespace-nowrap shadow-lg gradient-button-primary neon-glow hover:scale-105 transform duration-300"
                  style={getGradientStyles('button', 'primary')}
                  data-enhance="button"
                  data-tooltip="Start your crypto approval process"
                  onClick={() => console.log('Start approval clicked')}
                >
                  Start my approval
                </button>
                <div className="flex items-center gap-2 mt-2 text-white/90">
                  <FaStopwatch className="text-xs md:text-sm" />
                  <span className="text-[11px] md:text-[13px] lg:text-[14px] geist-light">
                    3 min | No credit impact
                  </span>
                </div>
              </div>

              {/* Google Reviews */}
              <div className="flex flex-col items-center text-center text-white bg-black/80 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-lg glass-card border border-white/10">
                <div className="flex items-center gap-1 md:gap-2">
                  <img
                    src="/assets/google-icon-logo-svgrepo-com.svg"
                    alt="Google"
                    className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6"
                  />
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-[12px] md:text-[16px] lg:text-[18px]" />
                  ))}
                </div>
                <div className="mt-1 text-[10px] md:text-[12px] lg:text-[13px] font-light text-white/80">
                  Launching Soon | 10+ Unit Testing reviews
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Z-Index 15 - Removed to clean up navbar area */}
      </div>

      <div className="bg-[#fdfcf9] relative">

        <section ref={testimonialRef} id="secHome" className="gradient-mesh-container relative">
          {/* Subtle gradient mesh for testimonial section - Lazy loaded */}
          <Suspense fallback={null}>
            <AnimatedGradientMesh
              {...getGradientMeshConfig('section')}
              className="section-gradient-mesh"
            />
          </Suspense>
          
          {/* Crypto Data Visualization in corner - Lazy loaded */}
          <div className="absolute top-8 right-8 z-10 hidden lg:block">
            <div className="chart-container">
              <Suspense fallback={null}>
                <CryptoDataVisualization
                  type="line"
                  width={200}
                  height={100}
                  animated={true}
                  theme="violet"
                  showGrid={true}
                />
              </Suspense>
            </div>
          </div>
          
          <SecHome />
        </section>

        <section id="bentoGrid" className="gradient-mesh-container relative">
          {/* Card-style gradient mesh for bento grid - Lazy loaded */}
          <Suspense fallback={null}>
            <AnimatedGradientMesh
              {...getGradientMeshConfig('card')}
              className="card-gradient-mesh"
            />
          </Suspense>
          
          {/* Crypto Visual Elements - Lazy loaded */}
          <div className="absolute bottom-8 left-8 z-10 hidden md:block">
            <Suspense fallback={null}>
              <AnimatedBorders borderType="hexagon" borderWidth={3} glowIntensity={0.8}>
                <div className="p-4">
                  <CryptoVisualElements 
                    type="mining" 
                    size={60}
                    color="#F59E0B"
                    speed={1.5}
                  />
                </div>
              </AnimatedBorders>
            </Suspense>
          </div>
          
          <ErrorBoundary showDetails={false}>
            <BentoGrid />
          </ErrorBoundary>
        </section>

      </div>
    </RouteTransitionWrapper>
  );
};

export default Home;
