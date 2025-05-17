import React from 'react';

const SecHome = () => {
  return (
    <div className="bg-[#fdfcf9] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 md:gap-65">

      {/*Image Section */}
      <div className="max-w-sm w-[341px] relative rounded-2xl overflow-hidden mr-5 shadow-md">
        <img
          src="\src\assets\arian.webp"
          alt="Testimonial"
          className="w-[341px] h-[606px] object-cover"
        />

      </div>

      {/* 📄 Text Section */}
      <div className="text-center mt-15 md:text-left max-w-xl">
        <h2 className="text-4xl sm:text-5xl geist-med font-bold text-[rgb(41,43,41)] leading-[80px] mb-6">
          Find out why <br className="hidden md:block" /> we're better
        </h2>


        <button className="bg-[#214534] geist-wlight text-white font-medium mt-5 px-12 py-4 rounded-full hover:bg-[#265d3c] transition mb-4">
          See all our stories
        </button>

        <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-[#1e1e1e] font-medium">
          <span className="text-green-700 text-3xl absolute md:top-375 right-162">★</span>
          <span className="geist-wlight font-extrabold"><strong>Trustpilot</strong></span>
          <span className="geist-tlight">Excellent 4.4 </span>
          <span>out of 5</span>
        </div>
      </div>
    </div>
  );
};

export default SecHome;
