import React from 'react';
import { useState } from 'react';

const testimonials = {
  Arian: {
    name: 'Arian',
    image: '/src/assets/arian.webp',
    quote:
      'The reason why I decided to go with Better is because after I did my research with the other lenders, Better was the ones that provided me with the lowest interest rate.',
    title: 'Better Mortgage customer',
  },
  Amanda: {
    name: 'Amanda',
    image: '/src/assets/amanda.webp',
    quote:
      'Better made the homebuying process incredibly smooth and stress-free. I’m so grateful for their support and transparency.',
    title: 'First-time buyer',
  },
  Paul: {
    name: 'Paul',
    image: '/src/assets/paul.webp',
    quote:
      'Getting approved through Better was fast and easy. They gave me the confidence I needed during a competitive market.',
    title: 'Refinance client',
  },
};
const SecHome = () => {
  const [selected, setSelected] = useState('Arian');
  const { image, quote, title, name } = testimonials[selected];

  return (
    <div className="bg-[#fdfcf9] min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 md:gap-65">
      <div>
        {/*Image Section */}
        <div className="max-w-sm w-[341px] relative rounded-2xl overflow-hidden mr-5 shadow-md">
          <img
            src={image}
            alt={name}
            className="w-[341px] h-[606px] object-cover"
          />
        </div>
        <div className="flex space-x-4 mt-5 cursor-pointer">
          {Object.keys(testimonials).map((person) => (
            <button
              key={person}
              onClick={() => setSelected(person)}
              className={`px-6 py-2 cursor-pointer rounded-full transition ${selected === person
                  ? 'border-2 border-[#2c6b45] text-[#2c6b45] bg-white shadow-md font-extrabold'
                  : 'border border-gray-300 text-gray-800 bg-white font-medium'
                }`}
            >
              {person}
            </button>
          ))}
        </div>


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
          <span className="text-green-700 text-3xl absolute md:top-379 right-162">★</span>
          <span className="geist-wlight font-extrabold"><strong>Trustpilot</strong></span>
          <span className="geist-tlight">Excellent 4.4 </span>
          <span className="geist- light">out of 5</span>
        </div>
      </div>
    </div>
  );
};

export default SecHome;
