import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

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
        <>
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
                                                className={`rounded-lg mx-auto ${isHorizontalLayout ? "w-[300px] h-[260px]" : "w-[340px] h-[130px]"} ${(activeTab === "Our Products" || activeTab === "Guides & FAQs")
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
            <div>
                <hr className="text-[#d3d3d3]" />

                <footer className="bg-[#fdfcf9] text-[#214534] px-8 md:px-32 py-16">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">

                        {/* LEFT COLUMN */}
                        <div className="space-y-6 max-w-md geist-modify">
                            <h2 className="font-extrabold text-[#3c754c] text-4xl">Better</h2>
                            <p className="text-sm text-[#214534]">
                                Better is a family of companies serving all your homeownership needs.
                            </p>

                            <div className="space-y-6 geist-modify text-lg">
                                {[
                                    {
                                        title: "Mortgage",
                                        desc:
                                            "We can't wait to say “Welcome home.” Apply 100% online, with expert customer support.",
                                    },
                                    {
                                        title: "Real Estate",
                                        desc:
                                            "Connect with a local Better Real Estate Partner Agent to find out all the ways you can save.",
                                    },
                                    {
                                        title: "Cover",
                                        desc:
                                            "Shop, bundle, and save on insurance coverage for home, auto, life, and more.",
                                    },
                                    {
                                        title: "Inspect",
                                        desc:
                                            "Get free repair estimates, 24-hour turnarounds on reports, and rest easy with our 100-day inspection guarantee.",
                                    },
                                    {
                                        title: "Settlement Services",
                                        desc:
                                            "Get transparent rates when you shop for title insurance all in one convenient place.",
                                    },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <h4 className="font-bold text-[#214534]">
                                            Better{" "}
                                            <span className="font-normal text-[#9e9e9e]">
                                                {item.title}
                                            </span>
                                        </h4>
                                        <p className="text-gray-700 mt-1">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* MIDDLE COLUMN - RESOURCES */}
<div className="mt-10 geist-modify">
                            <h3 className="text-xl font-semibold mb-4">Resources</h3>
                            <ul className="flex flex-col gap-2 text-lg text-[#214534]">
                                {[
                                    "Home affordability calculator",
                                    "Mortgage calculator",
                                    "Free mortgage calculator",
                                    "Mortgage calculator with taxes",
                                    "Mortgage calculator with PMI",
                                    "Rent vs buy calculator",
                                    "HELOC payment calculator",
                                    "HELOC vs cash-out refinance calculator",
                                    "Buy a home",
                                    "Sell a home",
                                    "Get home inspection",
                                ].map((item, index) => (
                                    <li key={index} className="link-hover cursor-pointer w-fit">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* RIGHT COLUMN - COMPANY */}
<div className="mt-10 geist-modify">
                            <h3 className="text-xl font-semibold mb-4">Company</h3>
                            <ul className="flex flex-col gap-2 text-lg text-[#214534]">
                                {[
                                    "About Us",
                                    "Careers",
                                    "Media",
                                    "Patner with us",
                                    "Learning center",
                                    "FAQs",
                                    "Investor relations",
                                ].map((item, index) => (
                                    <li key={index} className="link-hover cursor-pointer w-fit">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    
                </footer>
<div className="bg-[#fdfcf9] geist-modify text-[#1e1e1e] px-8 md:px-32 py-12">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col gap-6 text-sm">
      
      {/* Contact Us */}
        <h4 className="text-xl font-semibold -mt-6">Contact Us</h4>
      <div className="text-base">
        <ul className="flex flex-col gap-2">
        <li className="cursor-pointer link-hover w-fit mb-4">hello@better.com</li>
        <li className="cursor-pointer link-hover w-fit mb-4">415-523-8837</li>
          <li className="cursor-pointer link-hover w-fit mb-4">FAQ</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Glossary</li>
        </ul>
      </div>

      {/* Legal */}
              <h4 className="text-xl font-semibold">Legal</h4>
      <div className="-mt-2 text-base">
        <ul className="flex flex-col gap-2">
          <li className="cursor-pointer link-hover w-fit mb-4">NMLS Consumer Access</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Privacy Policy</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Terms of use</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Disclosures & Licensing</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Affiliate Business</li>
          <li className="cursor-pointer link-hover w-fit mb-4">Browser Disclaimer</li>
        </ul>
      </div>
    </div>
  </div>
</div>
   <div className="bg-[#fdfcf9] px-8 md:px-32 pt-10 pb-16 text-[#1e1e1e] text-sm">
      
      {/* Social Icons */}
      <div className="flex gap-6 geist-modify mb-6">
  <FacebookIcon className="w-7 h-7 cursor-pointer hover:text-[#2f6c45] transition" />
  <InstagramIcon className="w-7 h-7 cursor-pointer hover:text-[#2f6c45] transition" />
  <LinkedinIcon className="w-7 h-7 cursor-pointer hover:text-[#2f6c45] transition" />
</div>


      {/* Paragraphs */}
      <div className="space-y-6 leading-[22px] geist-modify max-w-5xl text-[#414240]">
        <p>
          Better Mortgage's One Day Mortgage™ promotion offers qualified customers who provide
          certain required financial information/documentation to Better Mortgage within 4 hours of
          locking a rate on a mortgage loan the opportunity to receive an underwriting determination
          from Better Mortgage within 24 hours of their rate lock. The underwriting determination is
          subject to customary terms, including fraud and anti–money laundering checks, that take
          place pre-closing and which may trigger additional required documentation from the customer.
          Better Mortgage does not guarantee that initial underwriting approval will result in a final
          underwriting approval. See{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45] transition">
            One Day Mortgage™ Terms and Conditions.
          </a>
        </p>

        <p>
          Better Mortgage's One Day HELOC™ promotion offers qualified customers who provide certain
          required financial information/documentation to Better Mortgage within 4 hours of locking a
          rate on a HELOC loan the opportunity to receive an underwriting determination from Better
          Mortgage within 24 hours of their rate lock. The underwriting determination is subject to
          customary terms, including fraud and anti–money laundering checks, that take place
          pre-closing and which may trigger additional required documentation from the customer.
          Better Mortgage does not guarantee that initial underwriting approval will result in final
          underwriting approval. See{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45] transition">
            One Day Heloc™ Terms and Conditions.
          </a>
        </p>

        <p>
          Assumes borrowers are eligible for the Automated Valuation Model (AVM) to calculate their
          home value, their loan amount is less than $400,000, all required documents are uploaded to
          their Better Mortgage online account within 24 hours of application, closing is scheduled
          for the earliest available date and time, and a notary is readily available. Funding timelines
          may vary and may be longer if an appraisal is required to calculate a borrower's home value.
        </p>
      </div>
    </div>
                    <hr className="mx-auto w-full max-w-6xl border-t border-[#d3d3d3]" />


    <div className="bg-[#fdfcf9] px-6 md:px-32 py-12 text-sm text-[#414240] leading-relaxed geist-modify">
      <div className="max-w-7xl mx-auto leading-[22px] space-y-6 geist modfiy">
        
        <p>
          © 2025 Better Home & Finance Holding Company and/or its affiliates. Better is a family of companies.
          Better Mortgage Corporation provides home loans; Better Real Estate, LLC and Better Real Estate
          California Inc License # 02164055 provides real estate services; Better Cover, LLC sells insurance
          products; and Better Settlement Services provides title insurance services; and Better Inspect, LLC
          provides home inspection services. All rights reserved.
        </p>

        <p>
          Home lending products offered by Better Mortgage Corporation. Better Mortgage Corporation is a direct
          lender. NMLS #330511. 1 World Trade Center, 80th Floor, New York, NY 10007. Loans made or arranged
          pursuant to a California Finance Lenders Law License. Not available in all states. Equal Housing Lender.{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">NMLS Consumer Access</a>
        </p>

        <p>
          Better Real Estate, LLC dba BRE, Better Home Services, BRE Services, LLC and Better Real Estate, and
          operating in the State of California through its wholly owned subsidiary Better Real Estate California Inc.,
          is a licensed real estate brokerage and maintains its corporate headquarters at 325–41 Chestnut Street,
          Suite 826, Philadelphia, PA 19106. Here is a full listing of Better Real Estate, LLC's{" "}
          <a href="#" className="underline hover:text-[#2f6c45]">license numbers</a>. Better Real Estate, LLC
          provides access to real estate brokerage services via its nationwide network of partner brokerages and real
          estate agents (“Better Real Estate Partner Agents”). Equal Housing Opportunity. All rights reserved.
        </p>

        <p>
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">New York State Housing and Anti-Discrimination Notice</a>
        </p>

        <p>
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">New York Standard Operating Procedures</a>
        </p>

        <p>
          Texas Real Estate Commission:{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">Information About Brokerage Services</a> |{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">Consumer Protection Notice</a>
        </p>

        <p>
          Better Settlement Services, LLC. 325–41 Chestnut Street, Suite 803, Philadelphia, PA 19106.
        </p>

        <p>
          Homeowners insurance policies are offered through Better Cover, LLC, a Pennsylvania Resident Producer
          Agency. License #881593. 325–41 Chestnut Street, Suite 807, Philadelphia, PA 19106.
        </p>

        <p>
          Insurance quotes and policies are offered through Better Cover, LLC. A Pennsylvania Resident Producer
          Agency. License #881593. Here is a full listing of Better Cover, LLC's{" "}
          <a href="#" className="underline hover:no-underline hover:text-[#2f6c45]">license numbers</a>.
        </p>

        <p>
          Better Inspect, LLC maintains its corporate headquarters at 325–41 Chestnut Street, Suite 846,
          Philadelphia, PA 19106.
        </p>

        <p>
          Better Mortgage Corporation, Better Real Estate, LLC, Better Settlement Services, LLC, Better Cover,
          LLC, Better Connect, and Better Inspect, LLC are separate operating subsidiaries of Better Home &
          Finance Holding Company. Each company is a separate legal entity operated and managed through its own
          management and governance structure as required by its state of incorporation, and applicable and
          legal and regulatory requirements. Products not available in all states.
        </p>

        <p>
          Any unauthorized use of any proprietary or intellectual property is strictly prohibited. All trademarks,
          service marks, trade names, logos, icons, and domain names are proprietary to Better Home & Finance
          Holding Company. Better Home & Finance Holding Company trademarks are federally registered with the
          U.S. Patent and Trademark Office. Better Cover is a registered trademark with the U.S. Patent and
          Trademark Office and is owned by Better Cover, LLC.
        </p>
      </div>
    </div>



            </div>
        </>
    );
};

export default BentoGrid;
