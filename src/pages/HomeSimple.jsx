import React from 'react';

const HomeSimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
      {/* Simple Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">KrizPay</div>
          <div className="hidden md:flex items-center gap-6 text-white">
            <a href="#" className="hover:text-purple-300 transition">About</a>
            <a href="#" className="hover:text-purple-300 transition">Calculator</a>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition">
              Continue
            </button>
          </div>
        </div>
      </nav>
      
      <div className="flex items-center justify-center min-h-screen text-white px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            Crypto Payment
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            made simple
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300">
            Experience the future of digital payments with our modern crypto platform
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start my approval
            </button>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>⏱️</span>
              <span>3 min | No credit impact</span>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-400">Launching Soon | 10+ Unit Testing reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSimple;