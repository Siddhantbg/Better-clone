const MortgageFormula = () => {
    return (
        <section className="bg-[#fdfcf9] px-6 geist-modify md:px-20 py-16 text-[#1e1e1e]">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    How to calculate monthly mortgage payments?
                </h2>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Your monthly mortgage payment includes loan principal and interest, property taxes, homeowners insurance, and mortgage insurance (PMI), if applicable. While not typically included in your mortgage payment, homeowners also pay monthly utilities and sometimes pay homeowners association (HOA) fees, so it's a good idea to factor these into your monthly budget. This mortgage calculator factors in all these typical monthly costs so you can really crunch the numbers.
                </p>

                {/* Formula Section */}
                <h3 className="text-xl font-semibold mt-10 mb-4">
                    Formula for calculating monthly mortgage payments
                </h3>

                <p className="text-gray-700 mb-6">
                    The easiest way to calculate your mortgage payment is to use a calculator, but for the curious or mathematically inclined, here's the formula for calculating principal and interest yourself:
                </p>

                {/* Formula Box */}
                <div className="bg-[#f8f8f5] rounded-xl px-6 py-8 text-center text-green-800 font-medium text-lg mx-auto max-w-3xl mb-10">

                    <div>
                        <img src="/assets/formula 1.webp" alt="Formula" />
                    </div>
                </div>

                {/* Explanation */}
               <div className="text-gray-800 mb-6 ml-50 mx-auto max-w-xl">
  <p className="mb-4 mr-106 font-medium text-[#767674]">Where:</p>
  <ul className="list-disc list-inside space-y-2 text-left ml-7 text-[#545553] inline-block">
    <li><strong>M</strong> is monthly mortgage payments</li>
    <li><strong>P</strong> is the principal loan amount (the amount you borrow)</li>
    <li><strong>r</strong> is the monthly interest rate</li>
    <li><strong>n</strong> is the total number of payments in months</li>
  </ul>
<p className="text-[#767674] font-medium mr-70 mt-4">Here's a simple example:</p>
</div>
               
                <div className="bg-[#f8faf9] max-w-5xl mx-auto rounded-xl p-6 flex flex-col md:flex-row justify-center gap-8 text-green-800 text-sm mb-2">
                    <img src="/assets/formula 2.webp" alt="Formula2" />
                </div>

                {/* Disclaimer */}
                <p className="text-gray-700">
                    This formula assumes a fixed-rate mortgage, where the interest rate remains constant throughout the loan term. And remember, you’ll still need to add on taxes, insurance, utilities, and HOA fees if applicable.
                </p>
            </div>
        </section>
    );
};

export default MortgageFormula;
