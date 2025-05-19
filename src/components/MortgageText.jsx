const CalculatorHelp = () => {
  return (
    <>

    <section className="bg-[#fefdfa] px-6 md:px-20 py-16 text-[#1e1e1e]">
      
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          How does mortgage calculator help me?
        </h2>

        {/* Paragraph */}
        <p className="text-gray-700 text-lg -mb-20 leading-relaxed">
          When deciding how much house you can afford, one of the most important pieces to determine is whether a home will fit into your monthly budget.
          A mortgage calculator helps you understand the monthly cost of a home. And ours will allow you to enter different down payments and interest
          rates to help determine what is affordable for you.
        </p>
      </div>
    </section>
          <hr className="w-[77rem] max-w-full mx-auto border-t mt-10 border-[#d3d3d3]" />

         <section className="bg-[#fdfcf9] geist-modify px-6 md:px-20 py-16 text-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          How much monthly mortgage payment can I afford?
        </h2>

        {/* Intro Paragraphs */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Lenders determine how much you can afford on a monthly housing payment by calculating your debt-to-income ratio (DTI).
          The maximum DTI you can have in order to qualify for most mortgage loans is often between 45–50%, with your anticipated housing costs included.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Your DTI is the balance between your income and your debt. It helps lenders understand how safe or risky it is for them to approve your loan.
          A DTI ratio represents how much of your gross monthly income is spoken for by creditors, and how much of it is left over to you as disposable income.
          It's most commonly written as a percentage. For example, if you pay half your monthly income in debt payments, you would have a DTI of 50%.
        </p>

        {/* Formula Title */}
        <h3 className="text-xl font-semibold text-[#545553] ml-52 mb-4">
          Formula for calculating your debt-to-income (DTI) ratio:
        </h3>

        {/* Formula Image */}
        <div className="flex justify-center mb-4">
  <img
    src="/assets/dti-formula.webp"
    alt="DTI Formula"
    className="w-[720px] max-w-full rounded-xl"
  />
</div>


        {/* Example Heading */}
        <h3 className="text-lg ml-53 font-medium text-[#545553] mb-4">
          Here's an example of what calculating your DTI might look like:
        </h3>

        {/* Example Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/dti-example.webp" // Replace with your actual path or use imported image
            alt="DTI Example"
            className="max-w-full w-180 rounded-xl"
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default CalculatorHelp;
