import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import { PlayCircle } from "lucide-react";
import Timelin from '../components/Timelin'


const About = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <Navbar variant="light" changeColor={false} />
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9] px-4 text-center">
        <div className='px-20'>
          <h2 className="text-[#2f6c45] text-3xl geist-modify font-bold mb-10">Our mission</h2>
          <h1 className="text-3xl md:text-5xl font-semibold geist-modify text-[#1e1e1e] leading-snug">
            We're making homeownership simpler, faster — <br className="hidden md:block" />
            and most importantly, more accessible for all Americans.
          </h1>
        </div>
      </div>


      <div className="bg-[#fcfcf9] py-20 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1e1e1e] mb-6">
              The status quo is broken
            </h2>
            <p className="text-sm md:text-base text-[#4a4a4a] mb-8 leading-relaxed">
              The traditional processes around homeownership are opaque and stressful. Fees aren't transparent and some are simply outrageous in size.
              Traditional mortgage lending is rife with unnecessary fees and slow, painful processes. It's a system set up to benefit insiders — not you.
              Better.com CEO, Vishal Garg, set out to change that.
            </p>
            <button className="bg-[#2f6c45] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#245a39] transition">
              Read Vishal's story
            </button>
          </div>

          <div className="relative w-full">
            <img
              src="/assets/vishal-mission.webp"
              alt="Vishal Garg"
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
                      src="https://www.youtube.com/embed/1KjYlLBM9j4"
                      title="Vishal's Story"
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

      <div className="bg-[#2f6c45] geist-modify text-white py-24 px-6 md:px-32">
        <div className="max-w-5xl mx-auto text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            How we're changing things
          </h2>

          <p className="text-sm md:text-base leading-relaxed mb-8">
            Homeownership is a huge part of our economy. Housing overall is a $33 trillion business, and mortgages account for $15 trillion.
            Yet home finance operates in the same way it has for decades — through opaque systems and expensive intermediaries
            whose interests are misaligned with consumers'.
          </p>

          <p className="text-lg md:text-xl leading-relaxed">
            That's why Better.com is redefining the homeownership process from the ground up. We're using technology to make it faster and more efficient,
            and humans to help make it friendly and enjoyable.
          </p>
        </div>
      </div>

      <Timelin />
      <Footer />
    </div>
  )
}

export default About
