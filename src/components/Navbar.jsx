import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = ({ changeColor } ) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop + Mobile Nav */}
<nav className={`sticky top-0 z-50 px-14 py-8 flex items-center justify-between md:justify-normal transition-all duration-300 ${
  changeColor ? 'bg-[#fdfcf9] text-black' : 'bg-[#214534] text-white'
}`}>
        {/* Logo */}
        <div className="cursor-pointer text-2xl geist-heavy font-bold">Better</div>

        {/* Mobile: Call Icon + Continue + Hamburger */}
        <div className="flex items-center gap-3 ml-auto md:hidden">
      <button className="border-2 border-white rounded-full p-2 hover:bg-white hover:text-black transition cursor-pointer">
      <FaPhone className="w-4 h-4 transform scale-x-[-1]" />
      </button>


          <button className="bg-[#7cf58f] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#6ee87d] transition text-sm">
            Continue
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* Center Nav (Desktop only) */}
        <div className="hidden md:flex gap-10 ml-20 text-sm geist-light font-medium">
          <Link to="/about" className="px-6 py-3 rounded-full hover:bg-white hover:text-[#1c3b2d] transition">About Us</Link>
          <Link to="/calculator" className="px-6 py-3 rounded-full hover:bg-white hover:text-[#1c3b2d] transition">Mortgage Calculator</Link>
          <Link to="/start" className="px-6 py-3 rounded-full hover:bg-white hover:text-[#1c3b2d] transition">Start Page</Link>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <div className="border border-white rounded-full p-2 hover:bg-white hover:text-black transition cursor-pointer">
            <FaPhone className="w-6 h-6 transform scale-x-[-1]" />

          </div>
          <Link
            to="/signin"
            className="text-sm px-6 py-3 geist-light rounded-full hover:bg-white hover:text-black transition"
          >
            Sign in
          </Link>
          <button className="bg-[#7cf58f] geist-light cursor-pointer text-black font-semibold px-5 py-2 rounded-full hover:bg-[#214534] hover:text-white transition">
            Continue
          </button>

        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div className={`fixed top-0 left-0 h-full w-full z-50 transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full bg-white p-6 flex flex-col gap-6 text-black">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold geist-uheavy">Better</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-4 text-lg mt-8">
            <Link to="/about" className="geist-light pb-2">About Us</Link>
            <Link to="/calculator" className="geist-light pb-2">Mortgage Calculator</Link>
            <Link to="/start" className="geist-light pb-2">Start Page</Link>
          </div>

          <div className="bg-[#f0f8f4] text-black rounded-full py-3 px-4 flex items-center gap-3 mt-6">
  <FaPhone className="w-6 h-6 transform scale-x-[-1] ml-42" />
  <span className="geist-light">Call us anytime at (123)4567890</span>
</div>


          <button className="mt-auto w-full bg-green-400 geist-light text-black py-3 rounded-full font-semibold">
            Continue
          </button>
          <button className="w-full border geist-light border-gray-300 py-3 rounded-full flex justify-center items-center gap-2">
            Sign in <FaUser />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;