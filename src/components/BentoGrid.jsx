import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Footer from "../pages/Footer";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import home4 from "../assets/home4.png";
import Orb from "./Orb";
import GlassCard from "./GlassCard";
import { AnimatedButton, MagneticButton } from "./ReactBitsButtons";
import { EnhancedAnimatedText } from "./ReactBitsText";
import { useCardAnimation, useTextAnimation } from "../hooks/useAnimationIntegration.js";

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

    // Animation integration hooks with error handling
    let titleRef, gridRef;
    
    try {
        const titleAnimation = useTextAnimation({
            splitText: true,
            staggerDelay: 0.1,
            animationType: 'fadeInUp',
            scrollTrigger: true
        });
        titleRef = titleAnimation.ref;
    } catch (error) {
        console.warn('Text animation hook failed:', error);
        titleRef = { current: null };
    }

    try {
        const gridAnimation = useCardAnimation({
            hover3D: true,
            parallaxElements: ['.card-image', '.card-content'],
            glowEffect: true,
            scrollReveal: true
        });
        gridRef = gridAnimation.ref;
    } catch (error) {
        console.warn('Card animation hook failed:', error);
        gridRef = { current: null };
    }

    return (
        <>
            <div className="bg-gradient-to-br from-[#0F0F23] to-[#1A1B3A] px-4 sm:px-6 md:px-10 py-8 overflow-x-hidden relative min-h-screen"
                 style={{ background: 'var(--gradient-background-mesh)' }}>
                {/* Orb Background Effect */}
                <div className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none">
                    <Orb
                        hoverIntensity={0.3}
                        rotateOnHover={false}
                        hue={120}
                        forceHoverState={true}
                        backgroundColor="#fdfcf9"
                    />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 md:gap-8 px-4 md:px-0 relative z-10">
                    <div className="text-left" ref={titleRef}>
                        <EnhancedAnimatedText
                            className="text-3xl md:text-5xl font-bold text-white leading-tight geist-imed"
                            animation="slideUp"
                            delay={200}
                            stagger={100}
                            splitBy="word"
                            gsapEnhanced={true}
                        >
                            Got Questions?
                        </EnhancedAnimatedText>
                        <EnhancedAnimatedText
                            className="text-3xl md:text-5xl font-bold text-white leading-tight geist-imed"
                            animation="slideUp"
                            delay={600}
                            stagger={100}
                            splitBy="word"
                            gsapEnhanced={true}
                        >
                            We've got answers
                        </EnhancedAnimatedText>
                    </div>

                    <div className="flex md:space-x-4 mt-4 md:mt-0 overflow-x-auto scrollbar-transition group">
                        <div className="flex space-x-4 min-w-max px-1">
                            {tabs.map((tab, index) => (
                                <AnimatedButton
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-3 whitespace-nowrap cursor-pointer rounded-full border text-sm font-extrabold transition ${
                                        activeTab === tab
                                            ? "border-purple-400 border-2 geist-wlight text-purple-300 bg-purple-900/30 backdrop-blur-sm"
                                            : "border-gray-500 text-gray-300 bg-gray-800/30 backdrop-blur-sm geist-wlight hover:border-purple-400 hover:text-purple-300 hover:border-2"
                                    }`}
                                    animation="scale"
                                    clickFeedback={true}
                                    glowEffect={activeTab === tab}
                                    gsapEnhanced={true}
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {tab}
                                </AnimatedButton>
                            ))}
                        </div>
                    </div>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 auto-rows-auto relative z-10">
                    {cards.map((card, idx) => {
                        let colSpan = "lg:col-span-2";
                        if (idx === 1 || idx === 2) colSpan = "lg:col-span-4";

                        const isHorizontalLayout = idx === 1 || idx === 2;
                        const isImageRight = idx === 2;

                        return (
                            <GlassCard
                                key={`${activeTab}-${idx}`} // Key includes activeTab for proper re-rendering
                                className={`${colSpan} p-6 shadow-sm hover:shadow-md transition`}
                                enhancedInteractions={true}
                                data-enhance="card"
                                data-tooltip={card.title}
                                blurIntensity={12}
                                opacity={0.15}
                                borderGlow={true}
                                hoverEffect={idx === 1 || idx === 2 ? "tilt" : "lift"}
                                enable3D={true}
                                tiltOptions={{
                                    maxTilt: idx === 1 || idx === 2 ? 8 : 12,
                                    scale: 1.02,
                                    glare: true,
                                }}
                                style={{
                                    animationDelay: `${idx * 150}ms`
                                }}
                            >
                                <div
                                    className={`flex flex-col ${
                                        isHorizontalLayout
                                            ? `${isImageRight ? "lg:flex-row-reverse" : "lg:flex-row"} items-start lg:items-center justify-between gap-6`
                                            : "justify-between gap-4"
                                    }`}
                                >
                                    <div className="flex-1 card-content">
                                        <EnhancedAnimatedText
                                            className="text-xl font-semibold geist-bento text-white mb-3"
                                            animation="slideUp"
                                            delay={idx * 200 + 400}
                                            gsapEnhanced={true}
                                        >
                                            {card.title}
                                        </EnhancedAnimatedText>
                                        {card.description && (
                                            <EnhancedAnimatedText
                                                className="text-sm text-gray-300 geist-light mb-6"
                                                animation="fadeIn"
                                                delay={idx * 200 + 600}
                                                gsapEnhanced={true}
                                            >
                                                {card.description}
                                            </EnhancedAnimatedText>
                                        )}
                                        <MagneticButton 
                                            className="p-3 border border-purple-400 rounded-full hover:bg-purple-600/20 hover:border-purple-300 transition neon-glow neon-glow-primary neon-hover-strong"
                                            magneticStrength={0.3}
                                            magneticRadius={80}
                                            onClick={() => console.log(`Learn more about ${card.title}`)}
                                            gsapEnhanced={true}
                                        >
                                            <ArrowRight size={18} className="text-purple-300" />
                                        </MagneticButton>
                                    </div>

                                    {card.image && (
                                        <div className="p-3 card-image">
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
                                                style={{
                                                    filter: 'blur(0px)',
                                                    transition: 'filter 0.3s ease'
                                                }}
                                                onLoad={(e) => {
                                                    // Progressive image loading effect
                                                    e.target.style.filter = 'blur(0px)';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
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
