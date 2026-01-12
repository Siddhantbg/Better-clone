import { useState, useEffect } from "react";
import { AnimatedInput, AnimatedSelect, FormValidationProvider } from './AnimatedFormInputs';
import '../styles/form-animations.css';

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
    <section className="bg-gradient-to-br from-[#0F0F23] via-[#1A1B3A] to-[#0F0F23] px-6 md:px-20 py-16 text-white form-slide-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">
          Crypto payment calculator
        </h2>
        <p className="text-gray-300 mb-10">
          Estimate how much merchants receive when customers pay using crypto.
          This calculator accounts for platform fees, transaction frequency,
          and real-time crypto-to-INR settlement.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center mb-6">
          <div>
            <AnimatedInput
              label="Transaction value (₹)"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              color="primary"
              className="text-2xl font-bold"
            />
          </div>

          <div className="text-center">
            <p className="font-semibold mb-2 text-white">
              Monthly merchant settlement
            </p>
            <p className="text-3xl font-bold text-white">
              ₹{monthlyPayment}/mo
            </p>
          </div>

          <div className="flex justify-end mt-6 md:mt-0">
            <button className="bg-[#4D2FB2] cursor-pointer text-white px-8 py-4 rounded-lg font-medium hover:bg-[#26573a] transition button-hover-effect">
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

        <FormValidationProvider
          validationRules={{
            zip: [
              { required: true, message: 'PIN code is required' },
              { pattern: /^\d{6}$/, message: 'PIN code must be 6 digits' }
            ],
            downPayment: [
              { required: true, message: 'Crypto amount is required' },
              { custom: (value) => value > 0, message: 'Amount must be greater than 0' }
            ],
            interestRate: [
              { required: true, message: 'Fee percentage is required' },
              { custom: (value) => value >= 0 && value <= 100, message: 'Fee must be between 0-100%' }
            ]
          }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            <AnimatedInput
              name="zip"
              label="Merchant PIN code"
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              color="secondary"
              required
            />

            <AnimatedInput
              name="downPayment"
              label="Crypto paid by customer (₹)"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              color="accent"
              required
            />

            <AnimatedInput
              name="interestRate"
              label="Platform + network fee (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              color="primary"
              required
            />

            <AnimatedSelect
              label="Transactions per month"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              color="secondary"
              options={[
                { value: 30, label: '30' },
                { value: 60, label: '60' },
                { value: 100, label: '100' }
              ]}
            />
          </div>
        </FormValidationProvider>
      </div>
    </section>
  );
};

export default LogicMor;
