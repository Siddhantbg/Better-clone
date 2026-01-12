import React from 'react';
import { useState } from 'react';
import BentoGrid from './BentoGrid';
import arianImg from "../assets/arian.png";
import amandaImg from "../assets/amanda.png";
import paulImg from "../assets/paul.png";
import GlassCard from "./GlassCard";

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

      <div className="bg-gradient-to-br from-[#0F0F23] to-[#1A1B3A] min-h-screen flex geist-modify flex-col-reverse md:flex-row items-center justify-center px-6 py-16 gap-10 md:gap-24"
           style={{ background: 'var(--gradient-background-mesh)' }}>

        <div className="w-full max-w-sm mt-10 md:mt-0 md:mr-8">
          <GlassCard
            className="p-4"
            blurIntensity={8}
            opacity={0.1}
            borderGlow={true}
            hoverEffect="glow"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-auto md:w-[350px] md:h-[600px] rounded-2xl shadow-md object-cover"
            />
          </GlassCard>

          <div className="hidden md:flex justify-center space-x-4 mt-4 md:mr-10">
          {Object.keys(testimonials).map((person) => (
  <button
    key={person}
    onClick={() => setSelected(person)}
    className={`px-6 py-2 rounded-full transition border text-base backdrop-blur-sm ${
      selected === person
        ? 'border-2 border-purple-400 text-purple-300 font-extrabold shadow-sm bg-purple-900/30 neon-glow'
        : 'border border-gray-500 text-gray-300 font-medium bg-gray-800/30 hover:border-purple-400 hover:text-purple-300'
    }`}
  >
    {testimonials[person].name}
  </button>
))}
       
          </div>
        </div>

        <div className="text-center md:text-left max-w-xl md:ml-8">
          <h2 className="text-[38px] sm:text-[42px] md:text-6xl font-bold text-white leading-[1.2] mb-6">
            Find out why <br className="hidden md:block" /> we're better
          </h2>

          <button className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] cursor-pointer text-white font-medium px-10 py-3 md:px-12 md:py-4 rounded-full hover:from-[#8B5CF6] hover:to-[#7C3AED] transition mb-6 w-full sm:w-auto neon-glow">
            See all our stories
          </button>

          <div className="flex justify-center md:justify-start items-center gap-2 text-white font-medium">
            <span className="text-purple-400 text-2xl md:text-3xl">★</span>
            <span className="font-extrabold text-base md:text-lg">Unit Testing</span>
            <span className="geist-tlight text-sm md:text-sm text-gray-300">Excellent <strong className="text-purple-300">4.4</strong></span>
            <span className="text-sm md:text-sm text-gray-300">out of 5</span>
          </div>

          <div className="flex md:hidden justify-center space-x-4 mt-6">
            {Object.keys(testimonials).map((person) => (
              <button
                key={person}
                onClick={() => setSelected(person)}
                className={`px-6 py-2 rounded-full transition border text-base backdrop-blur-sm ${selected === person
                    ? 'border-2 border-purple-400 text-purple-300 font-extrabold shadow-sm bg-purple-900/30 neon-glow'
                    : 'border border-gray-500 text-gray-300 font-medium bg-gray-800/30 hover:border-purple-400 hover:text-purple-300'
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
