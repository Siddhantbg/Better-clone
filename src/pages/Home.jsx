import { FaStopwatch, FaStar } from "react-icons/fa";
import phoneImg from '../assets/hero-variant.png';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import BentoGrid from "../components/BentoGrid.jsx";
import SecHome from '../components/SecHome.jsx';

const Home = () => {
  const testimonialRef = useRef();
  const [navbarLight, setNavbarLight] = useState(false);

  const heroRef = useRef();
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

    const observer = new IntersectionObserver(
      () => {
        handleScroll();
      },
      { threshold: 0 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);


  return (
    <>
      <Navbar changeColor={navbarLight} />
      <div
        ref={heroRef}
        id="heroSection"
        className="bg-[#591c76] text-white h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden pt-20 md:pt-24">

        {/* Main Content Container - Full viewport height minus navbar */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
          
          {/* Main Heading - Positioned at top with higher z-index */}
          <div className="text-center z-20 absolute top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 w-full px-4">
            <div className="hidden md:block">
              <h1 className="text-white text-[70px] lg:text-[90px] xl:text-[110px] font-bold leading-tight">
                Crypto Payment
              </h1>
              <h1 className="text-white text-[70px] lg:text-[90px] xl:text-[110px] font-bold leading-tight -mt-2 lg:-mt-4">
                made simple
              </h1>
            </div>

            <div className="block md:hidden">
              <h1 className="text-white text-[32px] xs:text-[28px] sm:text-[36px] font-bold leading-tight px-2">
                Crypto Payment <br />made simple
              </h1>
            </div>
          </div>

          {/* Phone Image - Much higher positioning, 2x more above the text */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-5" style={{ top: '-20px' }}>
            <img
              src={phoneImg}
              alt="Phone UI"
              className="w-[420px] xs:w-[360px] sm:w-[460px] md:w-[580px] lg:w-[700px] xl:w-[800px] object-contain"
              style={{
                height: 'calc(100vh + 20px)', // Extend height to compensate for negative top
                objectFit: 'contain',
                objectPosition: 'bottom',
                transform: 'translateY(2px)', // Slight push to eliminate any gap at bottom
              }}
            />
          </div>

          {/* Action Buttons - Positioned over the image */}
          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 md:gap-6 px-6 md:px-12 lg:px-20 z-30">
            
            {/* Start Approval Button */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
              <button className="bg-[#773db9] text-white font-medium px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full text-sm md:text-base lg:text-lg hover:bg-[#B153D7] transition whitespace-nowrap shadow-lg">
                Start my approval
              </button>
              <div className="flex items-center gap-2 mt-2 text-white">
                <FaStopwatch className="text-xs md:text-sm" />
                <span className="text-[11px] md:text-[13px] lg:text-[14px] geist-light">3 min | No credit impact</span>
              </div>
            </div>

            {/* Google Reviews */}
            <div className="flex flex-col items-center text-center text-white bg-black/90 md:bg-black/70 backdrop-blur-sm px-3 md:px-4 py-2 md:py-3 rounded-xl w-fit order-1 md:order-2 shadow-lg">
              <div className="flex items-center gap-1 md:gap-2">
                <img
                  src="/assets/google-icon-logo-svgrepo-com.svg"
                  alt="Google"
                  className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6"
                />
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-[14px] md:text-[18px] lg:text-[22px]" />
                ))}
              </div>
              <span className="mt-1 md:mt-2 text-[10px] md:text-[12px] lg:text-[14px] font-light">
                Launching Soon | 10+ Unit Testing reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fdfcf9]">

        <section ref={testimonialRef} id="secHome">
          <SecHome />
        </section>

        <section id="bentoGrid">
          <BentoGrid />
        </section>

      </div>

    </>
  );
};

export default Home;
