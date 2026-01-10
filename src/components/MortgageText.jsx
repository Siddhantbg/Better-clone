const CalculatorHelp = () => {
  return (
    <>
      <section className="bg-[#fefdfa] px-6 md:px-20 py-16 text-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How does this crypto payment calculator help me?
          </h2>

          <p className="text-gray-700 text-lg -mb-20 leading-relaxed">
            When using cryptocurrency for real-world payments, one of the most important things to understand is
            how much value actually reaches the merchant after fees, conversions, and settlement costs.
            This calculator helps you estimate the final INR amount by factoring in transaction value,
            platform fees, and settlement mechanics so you can make informed payment decisions.
          </p>
        </div>
      </section>

      <hr className="w-[77rem] max-w-full mx-auto border-t mt-10 border-[#d3d3d3]" />

      <section className="bg-[#fefdfa] geist-modify px-6 md:px-20 py-16 text-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How much value does a merchant actually receive?
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In crypto-based transactions, the final amount received by a merchant depends on several factors such as
            platform fees, network costs, liquidity provider charges, and compliance requirements.
            This calculator helps break down these components transparently so there are no hidden surprises.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Understanding this breakdown is critical for both users and merchants.
            Users gain clarity on how their crypto is spent, while merchants can better forecast settlements
            and manage cash flow with confidence. All values shown are estimates and may vary slightly based on
            real-time market conditions.
          </p>

          {/* <h3 className="text-xl text-[#545553] md:ml-52 mb-4">
            Simplified formula for crypto-to-INR settlement:
          </h3> */}

          {/* <div className="flex justify-center mb-4">
            <img
              src="/assets/dti-formula.webp"
              alt="Settlement Formula"
              className="w-[720px] max-w-full rounded-xl"
            />
          </div> */}

          {/* <h3 className="text-lg md:ml-53 font-medium text-[#545553] mb-4">
            Here’s an example of how a crypto payment is settled:
          </h3> */}

          {/* <div className="flex justify-center mb-6">
            <img
              src="/assets/dti-example.webp"
              alt="Settlement Example"
              className="max-w-full w-180 rounded-xl"
            />
          </div> */}
        </div>
      </section>
    </>
  );
};

export default CalculatorHelp;
