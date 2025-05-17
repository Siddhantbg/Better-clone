import { useState } from "react";

const BentoGrid = () => {
  const tabOptions = {
    "Our Products": [
      {
        title: "Buying your first home with Better",
        description: "Guiding you step by step through your first home purchase.",
        image: "/assets/home1.jpg",
      },
      {
        title: "One Day Mortgage",
        description: "Close faster than ever with our lightning-fast process.",
        image: "/assets/mortgage1.jpg",
      },
      {
        title: "Insurance",
        description: "Protect your new home with the best rates.",
        image: "/assets/insurance1.jpg",
      },
    ],
    "Calculators": [
      {
        title: "Mortgage Calculator",
        description: "See how much you can afford and what your monthly payment could be.",
        image: "/assets/calculator.jpg",
      },
      {
        title: "Refinance Calculator",
        description: "Estimate your savings if you refinance today.",
        image: "/assets/refinance.jpg",
      },
    ],
    "Guides & FAQs": [
      {
        title: "First-Time Buyer Guide",
        description: "Everything you need to know before buying your first home.",
        image: "/assets/guide.jpg",
      },
      {
        title: "Refinancing Explained",
        description: "Learn when and why to refinance your mortgage.",
        image: "/assets/faq.jpg",
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("Our Products");

  return (
    <>
      {/* Tabs */}
      <div className="bg-[#fdfcf9]">
      <div className="flex space-x-4 justify-center mt-8">
        {Object.keys(tabOptions).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full border transition font-medium ${
              activeTab === tab
                ? "border-green-700 text-green-700 font-bold"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 md:px-20">
        {tabOptions[activeTab].map((card, index) => (
          <div
            key={index}
            className="bg-[#f0f8f4] p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-[#1e3d2f] mb-2">{card.title}</h3>
            <p className="text-sm text-[#2f4f3c] mb-3">{card.description}</p>
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className="rounded-lg mt-4 w-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default BentoGrid;
