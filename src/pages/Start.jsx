import React from 'react'
import Footer from './Footer'
import { FaPhone } from "react-icons/fa";
import Middle from '../components/Middle';
import Cards from '../components/Cards';
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div className='sticky top-0 z-50'>
        <div className="bg-[#fdfcf9] py-6 px-4 border-t border-[#e8f2ec] relative">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left Section: Logo */}
            <Link to="/">
              <div>
                <h4 className="font-bold text-[#2f6c45] geist-modify text-lg">Better</h4>
                <p className="text-gray-600 geist-modify -mt-1 text-lg">Mortgage</p>
              </div>
            </Link>
            {/* Right Section: Phone */}
            <div className="flex items-center gap-3">
              {/* Phone Button */}
              <button className="p-2 rounded-full bg-[#d3e8d5]">
                <FaPhone className="w-5 h-5 text-[#1d3c34] geist-modify transform scale-x-[-1]" />
              </button>

              {/* Call Text */}
              <p className="text-[#1e1e1e] text-base">
                Need help? Call <span className="font-medium">(415) 523-8837</span>
              </p>
            </div>
          </div>

          <div className="relative w-full py-10 bg-[#fdfcf9]">
            {/* Horizontal Line */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[75rem] h-1 bg-[#e8f2ec]"></div>

            {/* Centered Image Overlapping the Line */}
            <div className="relative z-10 -top-5 flex justify-center">
              <div className="bg-white p-1 rounded-full shadow-sm">
                <img
                  src="/assets/betty1.webp"
                  alt="Agent"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      <Middle />
      <Cards />
      <Footer />
    </>
  )
}

export default Start
