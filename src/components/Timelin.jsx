import React from "react";

const CompanyTimeline = () => {
  const timeline = [
    {
      date: "2023",
      content:
        "The idea for KrizPay was born after observing the growing adoption of cryptocurrency in India alongside the lack of practical ways to use it for real-world payments. The founding team set out to bridge the gap between crypto holdings and everyday merchant transactions.",
    },
    {
      date: "2024",
      content:
        "Initial research and validation highlighted key challenges such as high taxation, banking restrictions, unreliable P2P trading, and complex crypto-to-INR conversions faced by Indian users.",
    },
    {
      date: "Early 2025",
      content:
        "KrizPay designed its core solution — enabling users to pay merchants using crypto by scanning existing UPI QR codes, backed by a secure escrow-based settlement system.",
    },
    {
      date: "Mid 2025",
      content:
        "Prototype development began with a strong focus on security, compliance, and real-time settlements through trusted liquidity providers.",
    },
    {
      date: "Late 2025",
      content:
        "The team refined the platform to ensure instant crypto-to-INR settlements for merchants, eliminating delays, hidden fees, and manual conversion processes.",
    },
    {
      date: "2026",
      content:
        "KrizPay initiated partnerships and discussions with exchanges, liquidity providers, and ecosystem players to support scalable adoption across India.",
    },
    {
      date: "Today",
      content:
        "KrizPay is building the future of crypto payments in India — making transactions simple, secure, and practical for both users and merchants.",
    },
  ];

  return (
    <section className="bg-[#fdfcf9] py-24 px-4 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold geist-modify text-center text-[#1e1e1e] mb-16">
        Company Timeline
      </h2>

      <ol className="relative space-y-16 before:absolute before:top-0 before:left-1/2 before:h-full before:w-1 before:-translate-x-1/2 before:rounded-full before:bg-[#d3d3d3]">
        {timeline.map((item, idx) => (
          <li key={idx} className="relative">
            {item.date && (
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <span className="px-8 py-3 text-xl geist-modify font-medium text-white rounded-full bg-[#4D2FB2]">
                  {item.date}
                </span>
              </div>
            )}

            <div
              className={`mt-10 flex ${
                idx % 2 === 0
                  ? "justify-end pr-20 pt-15"
                  : "justify-start pl-20 pt-15"
              }`}
            >
              <div
                className={`relative max-w-md bg-[#e9eceb] p-6 rounded-lg shadow-sm ${
                  idx % 2 === 0
                    ? "mr-[calc(50%-8px)]"
                    : "ml-[calc(50%-8px)]"
                }`}
              >
                <p className="mt-1 text-sm geist-modify text-[#0E21A0]">
                  {item.content}
                </p>

                {item.date === "Today" && (
                  <button className="mt-4 inline-block geist-modify px-7 py-3 text-white bg-[#4D2FB2] rounded-lg font-medium hover:bg-[#26553a] transition">
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CompanyTimeline;
