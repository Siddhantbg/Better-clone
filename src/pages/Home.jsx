import { FaStopwatch, FaStar } from "react-icons/fa";
import phoneImg from '../assets/hero-variant.png';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import BentoGrid from "../components/BentoGrid.jsx";
import SecHome from '../components/SecHome.jsx';

const Home = () => {
  const testimonialRef = useRef();
  const [navbarLight, setNavbarLight] = useState(false);

  const bentoRef = useRef(null);
  const [isBentoVisible, setIsBentoVisible] = useState(false);

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
      (entries) => {
        handleScroll();
      },
      { threshold: 0 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);
    if (bentoRef.current) observer.observe(bentoRef.current);

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
        className="bg-[#591c76] text-white min-h-[700px] md:min-h-[861px] flex items-center justify-center relative px-4 md:px-10 py-12 md:py-20 overflow-hidden">

        <img
          src={phoneImg}
          alt="Phone UI"
          className="w-[402px] sm:w-[320px] md:w-[500px] absolute top-[25%] ml-5 sm:top-[28%] md:top-[24%] left-1/2 transform -translate-x-1/2 z-0"
        />

        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-10 text-center w-full px-4">

          <div className="hidden md:block">
            <h1 className="text-white text-[122px] md:text-[112px] font-bold leading-tight">
              Crypto Payment
            </h1>
            <h1 className="text-white text-[112px] font-bold leading-tight -mt-5">
              made simple
            </h1>
          </div>

          <div className="block md:hidden">
            <h1 className="text-green-400 text-[50px] relative bottom-10 font-bold leading-tight">
              Mortgages <br />made simple
            </h1>
          </div>
        </div>

        <div className="w-full px-6 md:px-10 z-10 mt-8 md:mt-0 md:absolute md:top-104">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

            <div className="flex flex-col items-center md:items-start absolute top-47.5 md:-top-5 md:left-72 text-center md:text-left">
              <button className="bg-purple-700 text-white font-medium px-10 py-4 rounded-full text-lg hover:bg-purple-400 transition text-[18px]">
                Start my approval
              </button>
              <div className="flex items-center gap-2 mt-2 text-sm text-white">
                <FaStopwatch />
                <span className="text-[14px] geist-light">3 min | No credit impact</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center text-white bg-black/80 px-4 py-3 rounded-xl 
        w-fit mx-auto absolute bottom-3 right-12 sm:bottom-15 md:bg-transparent md:right-90 md:-bottom-13 mt-8 md:mt-0">

              <div className="flex items-center gap-2">
                <img
                  src="/assets/google-icon-logo-svgrepo-com.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-[24px]" />
                ))}
              </div>
              <span className="mt-2 text-[16px] font-light">
                4.6 stars | 3177 Google reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fdfcf9]">

        <section ref={testimonialRef} id="secHome">
          <SecHome />
        </section>

        <section ref={bentoRef} id="bentoGrid">
          <BentoGrid />
        </section>

      </div>

    </>
  );
};

export default Home;
