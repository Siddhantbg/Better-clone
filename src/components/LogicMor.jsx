import { useState, useEffect } from "react";

const LogicMor = () => {
  const [homePrice, setHomePrice] = useState(50000); // Transaction value (₹)
  const [zip, setZip] = useState("302002"); // Merchant PIN
  const [downPayment, setDownPayment] = useState(20000); // Crypto paid upfront (₹)
  const [interestRate, setInterestRate] = useState(0.6); // Platform + network fee (%)
  const [loanTerm, setLoanTerm] = useState(30); // Transactions per month
  const [monthlyPayment, setMonthlyPayment] = useState(0); // Monthly settlement (₹)

  // Slider progress stays untouched
  useEffect(() => {
    const percent = ((homePrice - 50000) / (2000000 - 50000)) * 100;
    document.documentElement.style.setProperty("--range-progress", `${percent}%`);
  }, [homePrice]);

  // 🔁 UPDATED MATH: Crypto → INR monthly settlement
  useEffect(() => {
    const transactionValue = homePrice;
    const cryptoContribution = downPayment;
    const feeRate = interestRate / 100;

    const netPerTransaction =
      (transactionValue - cryptoContribution) * (1 - feeRate);

    const monthlySettlement = netPerTransaction * loanTerm;

    setMonthlyPayment(
      monthlySettlement > 0 ? monthlySettlement.toFixed(2) : 0
    );
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <section className="bg-[#f3f9f5] px-6 md:px-20 py-16 text-[#1e1e1e]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">
          Crypto payment calculator
        </h2>
        <p className="text-gray-600 mb-10">
          Estimate how much merchants receive when customers pay using crypto.
          This calculator accounts for platform fees, transaction frequency,
          and real-time crypto-to-INR settlement.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
          <div>
            <label className="block font-semibold mb-2">
              Transaction value (₹)
            </label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg text-2xl font-bold"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
            />
          </div>

          <div className="text-center">
            <p className="font-semibold mb-2">
              Monthly merchant settlement
            </p>
            <p className="text-3xl font-bold">
              ₹{monthlyPayment}/mo
            </p>
          </div>

          <div className="flex justify-end mt-6 md:mt-0">
            <button className="bg-[#4D2FB2] cursor-pointer text-white px-8 py-4 rounded-lg font-medium hover:bg-[#26573a] transition">
              Start accepting crypto
            </button>
          </div>
        </div>

        <input
          type="range"
          min="50000"
          max="2000000"
          step="1000"
          value={homePrice}
          onChange={(e) => setHomePrice(Number(e.target.value))}
          className="w-full mb-8 custom-range"
        />

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <label className="block font-medium mb-2">
              Merchant PIN code
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Crypto paid by customer (₹)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Platform + network fee (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Transactions per month
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full p-3 border rounded-lg"
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogicMor;
