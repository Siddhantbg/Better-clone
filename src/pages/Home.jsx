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
  <div className="absolute top-[10%] z-10 text-center">
  <h1 className="text-green-400 text-[112px] font-bold leading-tight">
    Mortgages
  </h1>
  <h1 className="text-green-400 text-[112px] font-bold leading-tight -mt-5">
    made simple
  </h1>
</div>

{/* Bottom Section (CTA & Google Reviews) */}
<div className="absolute bottom-90 w-full px-6 md:px-10 z-10">
  <div className="max-w-4xl mx-auto flex justify-between items-center">
    {/* Left: CTA */}
    <div className="flex flex-col items-start">
      <button className="bg-[#7cf58f] text-black font-medium px-8 py-4 rounded-full text-lg hover:bg-[#6ee87d] transition text-[18px]">
        Start my approval
      </button>
      <div className="flex items-center gap-2 mt-2 text-sm text-white">
       &nbsp; <FaStopwatch/>
        <span className="text-[14px] geist-light">3 min | No credit impact</span>
      </div>
    </div>

    {/* Right: Google Reviews */}
<div className="flex flex-col items-start text-sm">
  <div className="flex items-center gap-1">
    <img
      src="/src/assets/google-icon-logo-svgrepo-com.svg"
      alt="Google"
      className="w-6 h-6"
    />
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className="text-yellow-400 text-[24px]" />
    ))}
  </div>
  <span className="mt-2 geist-light text-[16px]">4.6 stars | 3177 Google reviews</span>
</div>


  </div>
</div>

</div>


</>
  );
};

export default Home;
