import React from 'react';
import { useState } from 'react';
import BentoGrid from './BentoGrid';
import arianImg from "../assets/arian.png";
import amandaImg from "../assets/amanda.png";
import paulImg from "../assets/paul.png";

const testimonials = {
  Arian: {
    name: "Crypto Exchange",
    image: arianImg,
    quote: "...",
    title: "Better Mortgage customer",
  },
  Amanda: {
    name: "DeFi Platform",
    image: amandaImg,
    quote: "...",
    title: "First-time buyer",
  },
  Paul: {
    name: "Smart Contract",
    image: paulImg,
    quote: "...",
    title: "Refinance client",
  },
};
const SecHome = () => {
  const [selected, setSelected] = useState('Arian');
  const { image, quote, title, name } = testimonials[selected];

  return (
    <>

      <div className="bg-[#fdfcf9] min-h-screen flex geist-modify flex-col-reverse md:flex-row items-center justify-center px-6 py-16 gap-10 md:gap-24">

        <div className="w-full max-w-sm mt-10 md:mt-0 md:mr-8">
          <img
            src={image}
            alt={name}
            className="w-full h-auto md:w-[350px] md:h-[600px] rounded-2xl shadow-md object-cover"
          />

          <div className="hidden md:flex justify-center space-x-4 mt-4 md:mr-10">
          {Object.keys(testimonials).map((person) => (
  <button
    key={person}
    onClick={() => setSelected(person)}
    className={`px-6 py-2 rounded-full transition border text-base ${
      selected === person
        ? 'border-2 border-[#4D2FB2] text-[#4D2FB2] font-extrabold shadow-sm'
        : 'border border-gray-300 text-gray-800 font-medium'
    }`}
  >
    {testimonials[person].name}
  </button>
))}
       
          </div>
        </div>

        <div className="text-center md:text-left max-w-xl md:ml-8">
          <h2 className="text-[38px] sm:text-[42px] md:text-6xl font-bold text-[#292b29] leading-[1.2] mb-6">
            Find out why <br className="hidden md:block" /> we're better
          </h2>

          <button className="bg-[#4D2FB2] text-white font-medium px-10 py-3 md:px-12 md:py-4 rounded-full hover:bg-[#265d3c] transition mb-6 w-full sm:w-auto">
            See all our stories
          </button>

          <div className="flex justify-center md:justify-start items-center gap-2 text-[#1e1e1e] font-medium">
            <span className="text-purple-700 text-2xl md:text-3xl">★</span>
            <span className="font-extrabold text-base md:text-lg">Trustpilot</span>
            <span className="geist-tlight text-sm md:text-sm">Excellent <strong>4.4</strong></span>
            <span className="text-sm md:text-sm">out of 5</span>
          </div>

          <div className="flex md:hidden justify-center space-x-4 mt-6">
            {Object.keys(testimonials).map((person) => (
              <button
                key={person}
                onClick={() => setSelected(person)}
                className={`px-6 py-2 rounded-full transition border text-base ${selected === person
                    ? 'border-2 border-[#4D2FB2] text-[#4D2FB2] font-extrabold shadow-sm'
                    : 'border border-gray-300 text-gray-800 font-medium'
                  }`}
              >
                {person}
              </button>
            ))}
          </div>
        </div>
      </div>


    </>
  );
};

export default SecHome;
