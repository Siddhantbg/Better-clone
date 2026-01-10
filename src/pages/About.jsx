import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { PlayCircle } from "lucide-react";
import Timelin from '../components/Timelin';
import thumnail from '../assets/thumb.png'; 

const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <Navbar variant="light" changeColor={false} />

      {/* Mission Section */}
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9] px-4 text-center">
        <div className='px-20'>
          <h2 className="text-[#773db9] text-3xl geist-modify font-bold mb-10">
            Our mission
          </h2>
          <h1 className="text-3xl md:text-5xl font-semibold geist-modify text-[#1e1e1e] leading-snug">
            We’re transforming how crypto is used in everyday payments — <br className="hidden md:block" />
            making transactions simple, secure, and accessible across India.
          </h1>
        </div>
      </div>

      {/* Problem Section */}
      <div className="bg-[#fcfcf9] py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e1e1e] mb-6">
              The status quo is broken
            </h2>
            <p className="text-sm md:text-base text-[#4a4a4a] mb-8 leading-relaxed">
              Despite India being a global leader in cryptocurrency adoption, using crypto for real-world payments
              remains complex and risky. Users face high taxation, banking restrictions, frozen accounts,
              unreliable peer-to-peer trades, hidden fees, and slow settlement processes.
              The current system benefits intermediaries — not everyday users or merchants.
            </p>
            <button className="bg-[#773db9] text-white font-semibold cursor-pointer px-6 py-3 rounded-md hover:bg-[#4D2FB2] transition">
              Read our journey
            </button>
          </div>

          {/* Video Section */}
          <div className="relative w-full">
            <img
              src={thumnail}
              alt="KrizPay mission"
              className="rounded-lg w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle
                onClick={() => setShowVideo(true)}
                className="w-16 h-16 text-white bg-black/40 rounded-full p-2 hover:scale-105 transition duration-200 cursor-pointer"
              />

              {showVideo && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl aspect-video relative">
                    <button
                      onClick={() => setShowVideo(false)}
                      className="absolute top-0 right-2 cursor-pointer text-white bg-transparent text-xl font-bold z-10"
                    >
                      ✕
                    </button>
                    
                    <iframe
                      src="https://www.youtube.com/embed/EI3aNclmBDg?si=1jBSbwNv9Dus4qV5"
                      title="KrizPay Vision"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-[#773db9] geist-modify text-white py-24 px-6 md:px-32">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            How we’re changing things
          </h2>

          <p className="text-sm md:text-base leading-relaxed mb-8">
            KrizPay bridges the gap between cryptocurrency and everyday commerce.
            By allowing users to scan any merchant’s UPI QR code and pay using crypto,
            we enable seamless crypto-to-INR transactions through trusted liquidity providers.
            Our proprietary escrow system ensures secure transfers and instant settlements.
          </p>

          <p className="text-lg md:text-xl leading-relaxed">
            We’re building a future where crypto isn’t just an investment —
            it’s a practical, transparent, and compliant payment method that works
            effortlessly for both users and merchants.
          </p>
        </div>
      </div>

      <Timelin />
      <Footer />
    </div>
  );
};

export default About;
