import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Footer from "../pages/Footer";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";

const tabData = {
    "Our Products": [
        {
            title: "Pay Merchants Using Crypto",
            image: home1,
        },
        {
            title: "Scan Any UPI QR with Crypto",
            image: home2,
            description:
                "Customers can pay at any UPI-enabled merchant by simply scanning the QR code and paying via crypto, while merchants receive INR seamlessly.",
        },
        {
            title: "Secure Escrow-Based Settlement",
            image: home3,
            description:
                "Our proprietary escrow system securely transfers crypto to verified liquidity providers, who instantly settle payments to merchants in INR.",
        },
        {
            title: "Instant INR Payouts",
            image: "/assets/insurance.webp",
        },
    ],
    Calculators: [
        {
            title: "India’s Crypto Adoption Leadership",
            image: "/assets/mortgage-calculator.webp",
        },
        {
            title: "Rapid Market Growth",
            image: "/assets/affordability-calculator.webp",
            description:
                "India’s cryptocurrency market is projected to grow at a CAGR of 54.11% from 2024 to 2032, driven by fintech innovation and rising adoption.",
        },
        {
            title: "Massive User Base Opportunity",
            image: "/assets/heloc-calculator.webp",
            description:
                "With over 150 million crypto users, India represents one of the largest and fastest-growing digital asset markets globally.",
        },
        {
            title: "TAM, SAM & SOM Potential",
            image: "/assets/fixed-rate-calculator.webp",
        },
    ],
    "Guides & FAQs": [
        {
            title: "Why Crypto Payments Are Broken in India",
            image: "/assets/good-dti.webp",
        },
        {
            title: "Banking & P2P Risks Explained",
            image: home4,
            description:
                "Crypto users face banking restrictions, frozen accounts, fraud risks in P2P trading, and unreliable settlement processes.",
        },
        {
            title: "How KrizPay Solves These Problems",
            image: "/assets/loan-timeline.webp",
            description:
                "KrizPay enables transparent, real-time crypto-to-INR transactions, removing hidden fees, long delays, and complex conversions.",
        },
        {
            title: "Revenue & Monetization Model",
            image: "/assets/conventional-loan.webp",
        },
    ],
};

const tabs = Object.keys(tabData);

const BentoGrid = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const cards = tabData[activeTab];

    return (
        <>
            <div className="bg-[#fdfcf9] px-4 sm:px-6 md:px-10 py-8 overflow-x-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 md:gap-8 px-4 md:px-0">
                    <div className="text-left">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1e1e1e] leading-tight geist-imed">
                            Got Questions?
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#1e1e1e] leading-tight geist-imed">
                            We've got answers
                        </h2>
                    </div>

                    <div className="flex md:space-x-4 mt-4 md:mt-0 overflow-x-auto scrollbar-transition group">
                        <div className="flex space-x-4 min-w-max px-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 whitespace-nowrap cursor-pointer rounded-full border text-sm font-extrabold transition ${
                                        activeTab === tab
                                            ? "border-purple-800 border-3 geist-wlight text-purple-800 bg-white"
                                            : "border-gray-300 text-black bg-white geist-wlight hover:border-purple-800 hover:text-purple-800 hover:border-3"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-auto">
                    {cards.map((card, idx) => {
                        let colSpan = "lg:col-span-2";
                        if (idx === 1 || idx === 2) colSpan = "lg:col-span-4";

                        const isHorizontalLayout = idx === 1 || idx === 2;
                        const isImageRight = idx === 2;

                        return (
                            <div
                                key={idx}
                                className={`bg-[#eef7f0] rounded-xl p-6 shadow-sm hover:shadow-md transition ${colSpan}`}
                            >
                                <div
                                    className={`flex flex-col ${
                                        isHorizontalLayout
                                            ? `${isImageRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-start lg:items-center justify-between gap-6`
                                            : "justify-between gap-4"
                                    }`}
                                >
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

                                    {card.image && (
                                        <div className="p-3">
                                            <img
                                                src={card.image}
                                                alt={card.title}
                                                className={`rounded-lg mx-auto w-full max-w-[300px] h-auto ${
                                                    isHorizontalLayout
                                                        ? "w-[300px] h-[260px]"
                                                        : "w-[340px] h-[130px]"
                                                } ${
                                                    activeTab === "Our Products" ||
                                                    activeTab === "Guides & FAQs"
                                                        ? "object-cover"
                                                        : "object-contain"
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <hr className="text-[#d3d3d3]" />
                <Footer />
            </div>
        </>
    );
};

export default BentoGrid;
