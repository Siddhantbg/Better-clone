import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPhone, FaBars, FaTimes, FaUser } from "react-icons/fa";
// Temporarily disable React Bits components to fix navbar rendering
// import { AnimatedButton, MagneticButton, GradientButton } from "./ReactBitsButtons";
// import { animationManager } from "../utils/gsap";
import { themeConfig } from "../config/theme";

const Navbar = ({ changeColor, variant = "default" }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef(null);
  const location = useLocation();
  const isCustom = variant === "light";

  // Handle scroll for dynamic blur effect with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200; // Maximum scroll distance for full effect
      const progress = Math.min(scrollPosition / maxScroll, 1);
      
      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);

      // Apply dynamic blur and background opacity based on scroll
      if (navRef.current && !changeColor && variant !== 'light') {
        const blurAmount = progress * 16; // Max 16px blur
        const opacity = 0.6 + (progress * 0.3); // 0.6 to 0.9 opacity
        
        navRef.current.style.backdropFilter = `blur(${blurAmount}px)`;
        navRef.current.style.backgroundColor = `rgba(26, 27, 58, ${opacity})`;
        navRef.current.style.borderBottomColor = `rgba(124, 58, 237, ${progress * 0.3})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [changeColor, variant]);

  // Initialize navbar animations - temporarily disabled
  useEffect(() => {
    if (navRef.current) {
      // Simple CSS animation instead of GSAP
      navRef.current.style.transform = 'translateY(-100px)';
      navRef.current.style.opacity = '0';
      
      setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
          navRef.current.style.transform = 'translateY(0)';
          navRef.current.style.opacity = '1';
        }
      }, 100);
    }
  }, []);

  // Active link indicator animation
  const getActiveLinkClass = (path) => {
    const isActive = location.pathname === path;
    const baseClasses = "px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105";
    
    if (changeColor || variant === 'light') {
      return isActive 
        ? `${baseClasses} bg-gradient-to-r from-purple-600/30 to-purple-700/30 text-purple-700 border border-purple-500/30`
        : `${baseClasses} hover:bg-purple-600/20 hover:text-purple-700 text-[#4D2FB2]`;
    } else {
      return isActive 
        ? `${baseClasses} bg-gradient-to-r from-violet-600/30 to-purple-600/30 text-purple-300 border border-purple-500/30`
        : `${baseClasses} hover:bg-purple-600/20 hover:text-purple-300 text-white`;
    }
  };

  const getMobileActiveLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "geist-light pb-2 bg-gradient-to-r from-violet-600/30 to-purple-600/30 px-4 py-2 rounded-md flex items-center justify-between backdrop-blur-sm transition-all duration-300 border border-purple-500/30 text-purple-300"
      : "geist-light pb-2 hover:bg-purple-600/20 px-4 py-2 rounded-md flex items-center justify-between backdrop-blur-sm transition-all duration-300 hover:scale-105";
  };

  return (
    <>
      
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] px-6 md:px-14 py-4 md:py-6 flex items-center justify-between transition-all duration-500 border-b ${
        changeColor
          ? 'bg-white text-[#4D2FB2] border-gray-200'
          : variant === 'light'
            ? 'bg-white text-[#1e1e1e] border-gray-200'
            : scrolled 
              ? 'bg-[#1A1B3A]/90 backdrop-blur-lg border-purple-500/30 text-white shadow-lg shadow-purple-900/20'
              : 'bg-[#1A1B3A]/60 backdrop-blur-sm text-white border-purple-500/20'
        }`}
        style={{
          background: !changeColor && variant !== 'light' && scrolled 
            ? `linear-gradient(135deg, rgba(26, 27, 58, ${0.6 + scrollProgress * 0.3}) 0%, rgba(15, 15, 35, ${0.4 + scrollProgress * 0.4}) 100%)`
            : !changeColor && variant !== 'light' && !scrolled
              ? 'linear-gradient(135deg, rgba(26, 27, 58, 0.6) 0%, rgba(15, 15, 35, 0.4) 100%)'
              : undefined
        }}
      >

        <Link to="/">
          <div className={`cursor-pointer text-xl md:text-2xl geist-heavy font-bold transition ${
            changeColor || variant === 'light' 
              ? 'text-[#4D2FB2] hover:text-purple-600' 
              : 'text-white hover:text-purple-300'
          }`}>
            KrizPay
          </div>
        </Link>

        <div className="flex items-center gap-3 ml-auto md:hidden">
          <button className={`border-2 rounded-full p-2 transition cursor-pointer ${
            changeColor || variant === 'light'
              ? 'border-[#4D2FB2] text-[#4D2FB2] hover:bg-purple-100'
              : 'border-white text-white hover:bg-white/20'
          }`}>
            <FaPhone className="w-4 h-4 transform scale-x-[-1]" />
          </button>

          <button
            className="text-white font-semibold px-4 py-2 rounded-full text-sm hover:opacity-90 transition"
            style={{ background: 'linear-gradient(45deg, #7C3AED, #8B5CF6)' }}
          >
            Continue
          </button>
          
          <button
            onClick={() => setMenuOpen(true)}
            className={`text-xl transition hover:scale-110 ${changeColor || variant === 'light' ? 'text-[#4D2FB2]' : 'text-white'}`}
          >
            <FaBars />
          </button>
        </div>

        <div className="hidden md:flex gap-6 lg:gap-10 ml-8 lg:ml-20 text-sm geist-light font-medium">
          <Link to="/about" className={getActiveLinkClass("/about")}>About Us</Link>
          <Link to="/calculator" className={getActiveLinkClass("/calculator")}>Transaction Tool</Link>
          <Link to="/start" className={getActiveLinkClass("/start")}>Start</Link>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <button className={`border rounded-full p-2 transition cursor-pointer ${
            changeColor || variant === 'light'
              ? 'border-[#4D2FB2]/30 text-[#4D2FB2] hover:border-purple-400 hover:bg-purple-100'
              : 'border-white/30 text-white hover:border-purple-400 hover:bg-purple-600/20 hover:text-purple-300'
          }`}>
            <FaPhone className="w-6 h-6 transform scale-x-[-1]" />
          </button>
          
          <Link
            to="/signin"
            className={`text-sm px-6 py-3 geist-light rounded-full transition backdrop-blur-sm ${
              changeColor || variant === 'light'
                ? 'text-[#4D2FB2] hover:bg-purple-100 hover:text-purple-700'
                : 'text-white hover:bg-purple-600/20 hover:text-purple-300'
            }`}
          >
            Sign in
          </Link>
          
          <button
            className="geist-light cursor-pointer text-white font-bold px-5 py-2 rounded-full hover:opacity-90 transition"
            style={{ background: 'linear-gradient(45deg, #7C3AED, #8B5CF6)' }}
          >
            Continue
          </button>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 h-full w-full z-[10000] transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full bg-[#1A1B3A]/95 backdrop-blur-md p-6 flex flex-col gap-6 text-white border-r border-purple-500/20">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold geist-uheavy">KrizPay</h2>
            <button 
              onClick={() => setMenuOpen(false)} 
              className="text-2xl hover:text-purple-300 transition hover:rotate-90 transform duration-300"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-4 text-lg mt-8">
            <Link
              to="/about"
              className={getMobileActiveLinkClass("/about")}
            >
              About Us
              <img src="/assets/right-arrow-svgrepo-com.svg" className="h-3 filter invert" alt="arrow" />
            </Link>
            <Link
              to="/calculator"
              className={getMobileActiveLinkClass("/calculator")}
            >
              Transaction Efficiency Tool
              <img src="/assets/right-arrow-svgrepo-com.svg" className="h-3 filter invert" alt="arrow" />
            </Link>
            <Link
              to="/start"
              className={getMobileActiveLinkClass("/start")}
            >
              Start Page
              <img src="/assets/right-arrow-svgrepo-com.svg" className="h-3 filter invert" alt="arrow" />
            </Link>
          </div>


          <div className="bg-purple-900/30 backdrop-blur-sm text-white rounded-full py-3 px-4 flex items-center gap-3 mt-6 border border-purple-500/20">
            <FaPhone className="w-6 h-6 transform scale-x-[-1] ml-3 md:ml-42 text-purple-300" />
            <span className="geist-light">Call us anytime at (123)4567890</span>
          </div>


          <button
            className="mt-auto w-full geist-light text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            style={{ background: 'linear-gradient(45deg, #7C3AED, #8B5CF6)' }}
          >
            Continue
          </button>
          
          <button className="w-full border border-purple-500/50 geist-light py-3 rounded-full flex justify-center items-center gap-2 hover:bg-purple-600/20 transition backdrop-blur-sm text-white hover:scale-105 transform duration-300">
            Sign in <FaUser />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;