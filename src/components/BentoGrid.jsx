import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

// Define your data for each tab
const tabData = {
    "Our Products": [
        {
            title: "Buying your first home with Better",
            image: "/assets/first.webp",
        },
        {
            title: "One Day Mortgage",
            image: "/assets/one-day-mortgage.webp",
            description:
                "Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day.",
        },
        {
            title: "Better HELOC",
            image: "/assets/better-heloc.webp",
            description:
                "Introducing One Day HELOC™—your express lane to getting cash from your home with our Home Equity Line of Credit.",
        },
        {
            title: "Insurance",
            image: "/assets/insurance.webp",
        },
    ],
    Calculators: [
        {
            title: "Mortgage calculator",
            image: "/assets/mortgage-calculator.webp",
        },
        {
            title: "Affordability calculator",
            image: "/assets/affordability-calculator.webp",
            description:
                "Got homeownership dreams? Let's put some numbers behind them. Our affordability calculator estimates the maximum home you can afford.",
        },
        {
            title: "HELOC calculator",
            image: "/assets/heloc-calculator.webp",
            description:
                "Need cash? Quickly see how much equity you can borrow from your home and what your monthly payments might be.",
        },
        {
            title: "Fixed-rate loan comparison calculator",
            image: "/assets/fixed-rate-calculator.webp",
        },
    ],
    "Guides & FAQs": [
        {
            title: "What is a good debt-to-income ratio for a home loan?",
            image: "/assets/good-dti.webp",
        },
        {
            title: "Buying a house without realtor",
            image: "/assets/buy-house-without-realtor.webp",
            description:
                "Thinking about buying a house without a real estate agent? Read this first.",
        },
        {
            title: "Timeline for homebuying process",
            image: "/assets/loan-timeline.webp",
            description:
                "We broke it down into 8 easy steps to make your journey stress-free.",
        },
        {
            title: "Conventional loan requirements",
            image: "/assets/conventional-loan.webp",
        },
    ],
};

const tabs = Object.keys(tabData);

const BentoGrid = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const cards = tabData[activeTab];

    return (
        <div className="bg-[#fdfcf9] ml-5 px-4 md:px-10 py-8">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 md:gap-8 px-4 md:px-0">
                {/* Left: Headline text */}
                <div className="text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1e1e1e] leading-tight geist-imed">
                        Got Questions?
                    </h2>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1e1e1e] leading-tight geist-imed">
                        We've got answers
                    </h2>
                </div>

                {/* Right: Tab Buttons */}
                <div className="flex space-x-4 md:mt-0 mt-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-full border text-sm font-extrabold transition ${activeTab === tab
                                    ? "border-[#2f6c45] border-3 geist-wlight text-[#2f6c45] bg-white"
                                    : "border-gray-300 text-black bg-white geist-wlight hover:border-[#2f6c45] hover:text-[#2f6c45] hover:border-3"
                                }`}
                        >

                            {tab}
                        </button>
                    ))}
                </div>
            </div>


            {/* Grid */}
           <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-auto">

                {cards.map((card, idx) => {
                    // 🔲 Grid column span logic
                    let colSpan = "col-span-2";
                    if (idx === 1 || idx === 2) colSpan = "col-span-4";

                    // 📐 Layout type logic
                    const isHorizontalLayout = idx === 1 || idx === 2;
                    const isImageRight = idx === 2; // Better HELOC only

                    return (
                        <div
                            key={idx}
                            className={`bg-[#eef7f0] rounded-xl p-6 shadow-sm hover:shadow-md transition ${colSpan}`}
                        >
                            {/* Layout wrapper with direction control */}
                            <div
                                className={`flex flex-col ${isHorizontalLayout
                                    ? `${isImageRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-start lg:items-center justify-between gap-6`
                                    : "justify-between gap-4"
                                    }`}
                            >
                                {/* Text Section */}
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold geist-bento text-[#1e3d2f] mb-3">
                                        {card.title}
                                    </h2>
                                    {card.description && (
                                        <p className="text-sm text-[#2f4f3c] geist-light mb-6">
                                            {card.description}
                                        </p>
                                    )}
                                    <button className="p-3 border border-gray-300 rounded-full hover:bg-[#d2e8da] transition">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>

                                {/* Image Section */}
                                {card.image && (
                                    <div className="p-3">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className={`rounded-lg mx-auto 
      ${isHorizontalLayout ? "w-[300px] h-[260px]" : "w-[340px] h-[130px]"} 
      ${(activeTab === "Our Products" || activeTab === "Guides & FAQs") 
        ? "object-cover" 
        : "object-contain"}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BentoGrid;
