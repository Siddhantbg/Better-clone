import { FaStopwatch, FaStar } from "react-icons/fa";
import phoneImg from '../assets/hero-variant.webp';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import BentoGrid from "../components/BentoGrid.jsx";
import SecHome from '../components/SecHome.jsx';

const Home = () => {
  const testimonialRef = useRef();
  const [navbarLight, setNavbarLight] = useState(false);

  const bentoRef = useRef(null);
  const [isBentoVisible, setIsBentoVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      setNavbarLight(visible);
    },
    {
      threshold: 0.57,               
      rootMargin: '0px 0px -200px'  
    }
  );

  if (testimonialRef.current) observer.observe(testimonialRef.current);
  if (bentoRef.current) observer.observe(bentoRef.current);

  return () => {
    if (testimonialRef.current) observer.unobserve(testimonialRef.current);
    if (bentoRef.current) observer.unobserve(bentoRef.current);
  };
}, []);



  return (
    <>
<Navbar changeColor={navbarLight} />
<div className="bg-[#214534] text-white h-[727px] md:min-h-[861px] flex items-center justify-center relative px-4 md:px-10 py-12 md:py-20">
  
  {/* Phone Image */}
  <img src={phoneImg} alt="Phone UI" className="w-[500px] absolute top-[10%] md:top-[24%] z-0" />

  {/* Overlay Text */}
  <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-10 text-center w-full px-4">
    {/* 💻 Desktop */}
    <div className="hidden md:block">
      <h1 className="text-green-400 text-[112px] font-bold leading-tight">
        Mortgages
      </h1>
      <h1 className="text-green-400 text-[112px] font-bold leading-tight -mt-5">
        made simple
      </h1>
    </div>

    {/* 📱 Mobile */}
    <div className="block md:hidden">
      <h1 className="text-green-400 text-[30px] sm:text-[48px] font-bold leading-tight">
        Mortgages made simple
      </h1>
    </div>
  </div>

  {/* Bottom CTA & Review */}
  <div className="w-full px-6 md:px-10 z-10 mt-8 md:mt-0 md:absolute md:top-104">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
      
      {/* ✅ CTA Button block */}
      <div className="flex flex-col items-center md:items-start absolute top-32 sm:top-34 md:-top-5 md:left-72 text-center md:text-left">
        <button className="bg-[#7cf58f] text-black font-medium px-10 py-4 rounded-full text-lg hover:bg-[#6ee87d] transition text-[18px]">
          Start my approval
        </button>
        <div className="flex items-center gap-2 mt-2 text-sm text-white">
          <FaStopwatch />
          <span className="text-[14px] geist-light">3 min | No credit impact</span>
        </div>
      </div>

      {/* ✅ Google Review block */}
      <div className="flex flex-col items-center text-center text-white bg-black/80 px-4 py-3 rounded-xl 
        w-fit mx-auto absolute bottom-10 right-23 sm:bottom-15 md:bg-transparent md:right-90 md:-bottom-13 mt-8 md:mt-0">
        
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


{/* Wrapper with background */}
<div className="bg-[#fdfcf9]">

  {/* Section 1 - Ref must stay here */}
  <section ref={testimonialRef}>
    <SecHome />
  </section>

  {/* Section 2 - Ref must stay here */}
  <section ref={bentoRef}>
    <BentoGrid />
  </section>

</div>

      
    </>
  );
};

export default Home;
