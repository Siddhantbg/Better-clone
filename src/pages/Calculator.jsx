import React, { useState } from 'react';
import Footer from './Footer'
import Navbar from '../components/Navbar';
import MortgageFormula from '../components/MotagageFormula';
import Mortgage from "../components/MortgageText"
import LogicMor from '../components/LogicMor'
import Logic from '../components/Logic'
import FormDemo from '../components/FormDemo';

const Calculator = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <Navbar variant="light" changeColor={false} />

      <div className='bg-[#fefdfa]'>
        <LogicMor />
        <Logic />

        <hr className="w-[77rem] max-w-full mx-auto border-t mt-10 border-[#d3d3d3]" />
        <Mortgage />
        <hr className="w-[77rem] max-w-full mx-auto border-t border-[#d3d3d3]" />
        <MortgageFormula />
      </div>

      <hr className="w-[77rem] max-w-full mx-auto border-t border-[#d3d3d3]" />

      {/* Enhanced Form Demo Section */}
      <FormDemo />

      {/* Content Section */}
      <section className="bg-[#fefdfa] px-6 md:px-20 py-16 text-[#1e1e1e]">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How to use this crypto payment calculator?
          </h2>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              Use this calculator to understand how crypto-based payments translate into real-world INR values.
              Adjust transaction amounts, crypto prices, and frequency to see how they impact the final settlement
              received by merchants.
            </p>

            <p>
              Changes in crypto market prices, transaction volume, and settlement frequency can affect the final INR
              amount. KrizPay’s system is designed to minimize uncertainty by enabling instant crypto-to-INR conversions
              through trusted liquidity providers, reducing exposure to volatility.
            </p>

            <p>
              Regulatory components such as transaction fees, applicable taxes, and network costs may vary depending
              on usage patterns. This calculator helps provide a transparent estimate, but actual values may differ
              slightly based on market conditions and compliance requirements.
            </p>

            <p>
              Fun fact: India is the global leader in cryptocurrency adoption, yet most crypto holders still struggle
              to use their assets for everyday payments. Tools like this calculator help bridge that gap by making
              crypto spending easier to understand and plan.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Calculator
