import { FaStopwatch , FaStar } from "react-icons/fa";
// import phone from "../assets/phone.png"; // Make sure image exists in src/assets
// import googleLogo from "../assets/google.png"; // Optional: add google icon
import phoneImg from '../assets/hero-variant.webp';

const Home = () => {
  return (
    <>

  <div className="bg-[#214534] text-white h-[861px] flex items-center justify-center relative px-4 md:px-10 py-12 md:py-20">

  {/* TODO:Animate phone using top */}
  <img src={phoneImg} alt="Phone UI" className="w-[500px] absolute top-[24%] z-0" />

  {/* Overlay Text */}
<div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-10 text-center w-full px-4">
  
  {/* 💻 Stacked version for desktop/laptop */}
  <div className="hidden md:block">
    <h1 className="text-green-400 text-[112px] font-bold leading-tight">
      Mortgages
    </h1>
    <h1 className="text-green-400 text-[112px] font-bold leading-tight -mt-5">
      made simple
    </h1>
  </div>

  {/* 📱 Inline version for mobile */}
  <div className="block md:hidden">
    <h1 className="text-green-400 absolute text-[36px] sm:text-[48px] sm:left-20 sm:-top-10 sm:align bg-center font-bold leading-tight">
      Mortgages made simple
    </h1>
  </div>

</div>




{/* Bottom Section (CTA & Google Reviews) */}
<div className="w-full px-6 md:px-10 z-10 mt-8 md:mt-0 md:absolute md:top-104">
  <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
    
    {/* Left: CTA */}
<div className="flex flex-col items-center md:items-start absolute sm:top-34 md:-top-5 md:left-75 text-center md:text-left">
      <button className="bg-[#7cf58f] text-black font-medium px-10 py-4 rounded-full text-lg hover:bg-[#6ee87d] transition text-[18px]">
        Start my approval
      </button>
      <div className="flex items-center gap-2 mt-2 text-sm text-white">
        <FaStopwatch />
        <span className="text-[14px] geist-light">3 min | No credit impact</span>
      </div>
    </div>

    {/* Right: Google Reviews */}

<div className="flex flex-col items-center md:items-start text-sm px-4 py-3 rounded-xl bg-black bg-opacity-90 md:bg-transparent md:px-0 md:py-0 w-fit mx-auto absolute md:right-90 md:-bottom-10 sm:bottom-55 md:mx-0 mt-8 md:mt-0">

  <div className="flex items-center gap-1">
    <img
      src="/src/assets/google-icon-logo-svgrepo-com.svg"
      alt="Google"
      className="w-5 h-5 sm:w-6 sm:h-6"
    />
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className="text-yellow-400 text-[20px] sm:text-[24px]" />
    ))}
  </div>

  <span className="mt-2 text-sm sm:text-base">4.6 stars | 3177 Google reviews</span>
</div>




  </div>
</div>

</div>


</>
  );
};

export default Home;
