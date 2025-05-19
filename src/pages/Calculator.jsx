import React, { useState } from 'react';
import Footer from './Footer'
import Navbar from '../components/Navbar';
import MortgageFormula from '../components/MotagageFormula';
import Mortgage from "../components/MortgageText"
import LogicMor from '../components/LogicMor'
import Logic from '../components/Logic'
const Calculator = () => {
  const [showVideo, setShowVideo] = useState(false);


  return (
    <div>
      {/* //TODO:Add white color to Navbar */}

      <Navbar variant="light" changeColor={false} />
      <div className='bg-[#fefdfa]'>
       <LogicMor />
        <Logic/>

        <hr className="w-[77rem] max-w-full mx-auto border-t mt-10 border-[#d3d3d3]" />
        <Mortgage />
        <hr className="w-[77rem] max-w-full mx-auto border-t border-[#d3d3d3]" />
        <MortgageFormula />
      </div>

      <hr className="w-[77rem] max-w-full mx-auto border-t border-[#d3d3d3]" />

      <section className="bg-[#fefdfa] px-6 md:px-20 py-16 text-[#1e1e1e]">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How to use this mortgage calculator?
          </h2>

          {/* Paragraphs */}
          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              Play around with different home prices, locations, down payments, interest rates, and mortgage lengths to see how they impact your monthly mortgage payments.
            </p>

            <p>
              Increasing your down payment and decreasing your interest rate and mortgage term length will make your monthly payment go down. Taxes, insurance, and HOA fees will vary by location. If you enter a down payment amount that's less than 20% of the home price, private mortgage insurance (PMI) costs will be added to your monthly mortgage payment. As the costs of utilities can vary from county to county, we've included a utilities estimate that you can break down by service. If you're thinking about buying a condo or into a community with a Homeowners Association (HOA), you can add HOA fees.
            </p>

            <p>
              The only amounts we haven't included are the money you'll need to save for annual home maintenance/repairs or the costs of home improvements. To see how much home you can afford including these costs, take a look at the Better home affordability calculator.
            </p>

            <p>
              Fun fact: Property tax rates are extremely localized, so two homes of roughly the same size and quality on either side of a municipal border could have very different tax rates. Buying in an area with a lower property tax rate may make it easier for you to afford a higher-priced home.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Calculator
