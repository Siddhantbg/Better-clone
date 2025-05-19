import { useState, useEffect } from "react";

const LogicMor = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [zip, setZip] = useState("302002");
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(payment ? payment.toFixed(2) : 0);
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <section className="bg-[#f3f9f5] px-6 md:px-20 py-16 text-[#1e1e1e]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">Mortgage calculator</h2>
        <p className="text-gray-600 mb-10">
          Our mortgage calculator includes key factors like homeowners association fees, property taxes, and private mortgage insurance (PMI).
          Get the whole picture and calculate your total monthly payment.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
          {/* Home price input */}
          <div>
            <label className="block font-semibold mb-2">Home price</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-2xl font-bold"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
            />
          </div>

          {/* Monthly payment display */}
          <div className="text-center">
            <p className="font-semibold mb-2">Monthly payment</p>
            <p className="text-3xl font-bold">${monthlyPayment}/mo</p>
          </div>

          {/* Button */}
          <div className="flex justify-end mt-6 md:mt-0">
            <button className="bg-[#2f6c45] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#26573a] transition">
              Get pre-approved
            </button>
          </div>
        </div>

        {/* Home price slider */}
        <input
          type="range"
          min="50000"
          max="2000000"
          step="1000"
          value={homePrice}
          onChange={(e) => setHomePrice(Number(e.target.value))}
          className="w-full mb-8"
        />

        {/* Detail Inputs */}
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block font-medium mb-2">ZIP code</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Down payment</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Interest rate</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Length of loan (years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            >
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogicMor;
