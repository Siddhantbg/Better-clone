import React from 'react';
import { useState } from 'react';
import Bentogrid from '../components/BentoGrid'
const testimonials = {
  Arian: {
    name: 'Arian',
    image: '/assets/arian.webp',
    quote:
      'The reason why I decided to go with Better is because after I did my research with the other lenders, Better was the ones that provided me with the lowest interest rate.',
    title: 'Better Mortgage customer',
  },
  Amanda: {
    name: 'Amanda',
    image: '/assets/amanda.webp',
    quote:
      'Better made the homebuying process incredibly smooth and stress-free. I’m so grateful for their support and transparency.',
    title: 'First-time buyer',
  },
  Paul: {
    name: 'Paul',
    image: '/assets/paul.webp',
    quote:
      'Getting approved through Better was fast and easy. They gave me the confidence I needed during a competitive market.',
    title: 'Refinance client',
  },
};
const SecHome = () => {
  const [selected, setSelected] = useState('Arian');
  const { image, quote, title, name } = testimonials[selected];

  return (
    <>
    <div className="bg-[#fdfcf9] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 md:gap-65">
      <div>
        {/*Image Section */}
        <div className="max-w-sm w-[341px] md:top-3 md:right-2 sm:top-70 relative rounded-2xl overflow-hidden mr-5 shadow-md">
          <img
            src={image}
            alt={name}
            className="w-[341px] h-[595px] object-cover"
          />
        </div>
        <div className="flex relative md:top-2 sm:bottom-100 space-x-4 mt-5 cursor-pointer">
          {Object.keys(testimonials).map((person) => (
            <button
              key={person}
              onClick={() => setSelected(person)}
              className={`px-6 py-2 hover:border-3 hover:text-[#2c6b45] hover:border-[#2c6b45] cursor-pointer rounded-full transition ${selected === person
                  ? 'border-3 border-[#2c6b45] text-[#2c6b45] bg-white shadow-md font-extrabold'
                  : 'border border-gray-300 text-gray-800 bg-white font-medium'
                }`}
            >
              {person}
            </button>
          ))}
        </div>

      

      </div>

      {/* 📄 Text Section */}
      <div className="text-center mt-15 md:text-left md:top-5 relative sm:bottom-200 max-w-xl">
        <h2 className="md:text-7xl sm:text-[47px] geist-imed font-bold text-[rgb(41,43,41)] leading-[80px] mb-6">
          Find out why <br className="hidden md:block" /> we're better
        </h2>


        <button className="bg-[#214534] geist-wlight sm:mt-0 text-white sm:px-40 sm:py-4 font-medium md:mt-5 md:px-12 md:py-4 rounded-full hover:bg-[#265d3c] transition mb-4">
          See all our stories
        </button>

        <div className="flex justify-center md:justify-start items-center gap-2 text-sm text-[#1e1e1e] font-medium ml-5">
          <span className="text-green-700 text-3xl absolute sm:right-101 sm:top-42 md:top-67 md:right-106">★</span>
          <span className="geist-wlight font-extrabold"><strong>Trustpilot</strong></span>
          <span className="geist-tlight">Excellent 4.4 </span>
          <span className="geist- light">out of 5</span>
        </div>
      </div>
    </div>
    bento
     <Bentogrid/>
     </>
  );
};

export default SecHome;
