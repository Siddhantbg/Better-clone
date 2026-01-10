import form1 from '../assets/form1.png';
const MortgageFormula = () => {
    return (
        <>
            <section className="bg-[#fefdfa] px-6 geist-modify md:px-20 py-16 text-[#1e1e1e]">
                <div className="max-w-6xl mx-auto">

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        How to calculate crypto payment settlements?
                    </h2>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                        When a customer pays using cryptocurrency, the final amount received by a merchant depends on
                        several components such as the transaction value, platform fees, network costs, liquidity
                        provider charges, and compliance-related deductions. While some of these costs are applied
                        automatically in the background, it’s important to understand how they affect the final
                        settlement amount in INR.
                    </p>

                    <h3 className="text-xl font-semibold mt-10 mb-4">
                        Formula for calculating crypto-to-INR settlement
                    </h3>

                    <p className="text-gray-700 mb-6">
                        The easiest way to estimate settlement amounts is by using a calculator, but for those who want
                        a deeper understanding, here’s a simplified formula that explains how crypto payments are
                        converted into real-world merchant settlements:
                    </p>

                    {/* <div className="bg-[#f8f8f5] rounded-xl md:px-6 py-8 text-center text-green-800 font-medium text-lg mx-auto max-w-3xl mb-10">
                        <div>
                            <img src="/assets/formula 1.webp" alt="Settlement Formula" />
                        </div>
                    </div> */}

                    <div className="text-gray-800 mb-6 md:ml-50 mx-auto max-w-xl">
                        <p className="md:mb-4 md:mr-106 font-medium text-[#767674]">
                            Where:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-left ml-7 text-[#545553] inline-block">
                            <li><strong>M</strong> is the final merchant settlement (INR)</li>
                            <li><strong>T</strong> is the total transaction value</li>
                            <li><strong>f</strong> is the combined platform and network fee rate</li>
                            <li><strong>n</strong> is the number of transactions</li>
                        </ul>
                        <p className="text-[#767674] font-medium md:mr-70 mt-4">
                            Here’s a simple example:
                        </p>
                    </div>

                    <div className="bg-[#f2efe1] max-w-2xl mx-auto rounded-xl p-6 flex flex-col md:flex-row justify-center gap-8 text-green-800 text-sm mb-2">
                        <img src={form1} alt="Settlement Example" />
                    </div>

                    <p className="text-gray-700">
                        This example assumes real-time settlement at current market prices.
                        Actual values may vary slightly depending on crypto price fluctuations,
                        network congestion, and regulatory or compliance requirements.
                        KrizPay is designed to minimize these uncertainties by enabling instant
                        and transparent crypto-to-INR conversions.
                    </p>
                </div>
            </section>
        </>
    );
};

export default MortgageFormula;
