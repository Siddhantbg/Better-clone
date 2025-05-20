import React from "react";

const CompanyTimeline = () => {
  const timeline = [
    {
      date: "2014",

      content: "After Vishal Garg's first attempt to purchase his own dream home, he quickly realized that the homebuying process is unnecessarily broken. This inspired him to found a technology-first company led by engineers and data experts with the mission of digitizing and automating home finance to make it cheaper, easier, and faster for all.",
    },
    {
      date: "2015",
      content: "Better Mortgage funds its first mortgage loan entirely online (without a single phone call!).",
    },
    {
      date: "2016",
      content: "Better Mortgage becomes a Fannie Mae approved seller + servicer and establishes relationships with top mortgage investors.",
    },
    {
      date: "2017",
      content: "Better expands into the real estate market with Better Real Estate.",
    },
    {
      date: "2018",
      content: "Better Mortgage partners with Ally Bank to build Ally powered by Better.",
    },
    {
      date: "2019",
      content: "Better Mortgage launches its pilot partnership with American Express to deliver a seamless homebuying experience to AMEX customers.",
    },
    {
      date: "2021",
      content: "Better acquires Trussle — The UK's most innovative online mortgage broker.",
    },
    {
      date: "2022",
      content: "Better Mortgage becomes the first fintech to fund $100B home loans entirely online.",
    },
    {
      date: "2023",
      content: "Better Mortgage launches One Day Mortgage¹: The first offering to customers to go from application to full mortgage Commitment Letter within 24 hours vs. typical industry process of 30+ days.",
    },
    {
      content: "Better Mortgage launches One Day Verified Approval Letter.",
    },
    {
      content: "Better Mortgage launches the fully digital 3-day HELOC².",
    },
    {
      date: "Today",
      content: "You become part of the story by joining tens of thousands of happy Better Mortgage borrowers..",
    },
  ];

  return (
    <section className="bg-[#fdfcf9] py-24 px-4 md:px-20">
      <h2 className="text-3xl md:text-5xl font-bold geist-modify text-center text-[#1e1e1e] mb-16">Company Timeline</h2>

      <ol className="relative space-y-16 before:absolute before:top-0 before:left-1/2 before:h-full before:w-1 before:-translate-x-1/2 before:rounded-full before:bg-[#d3d3d3]">
        {timeline.map((item, idx) => (
          <li key={idx} className="relative">

            {item.date && (
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <span className="px-8 py-3 text-xl geist-modify font-medium text-white rounded-full bg-[#2f6c45]">
                  {item.date}
                </span>
              </div>
            )}

            <div
              className={`mt-10 flex ${idx % 2 === 0
                  ? 'justify-end pr-20 pt-15'
                  : 'justify-start pl-20 pt-15'
                }`}
            >
              <div
                className={`relative max-w-md bg-[#e9eceb] p-6 rounded-lg shadow-sm ${idx % 2 === 0
                    ? 'mr-[calc(50%-8px)]'
                    : 'ml-[calc(50%-8px)]'
                  }`}
              >
                <p className="mt-1 text-sm geist-modify text-[#2f4f3c]">{item.content}</p>
                <p className="mt-1 text-sm geist-modify text-[#2f4f3c]">{item.content}</p>

                {item.date === "Today" && (
                  <button className="mt-4 inline-block geist-modify px-7 py-3 text-white bg-[#2f6c45] rounded-lg font-medium hover:bg-[#26553a] transition">
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
