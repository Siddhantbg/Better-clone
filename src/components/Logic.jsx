import { useState, useEffect } from "react";

const BreakdownBar = () => {
  const [principal, setPrincipal] = useState(1516.96);
  const [taxes, setTaxes] = useState(2900);
  const [insurance, setInsurance] = useState(132);
  const [hoa, setHOA] = useState(132);
  const [utilities, setUtilities] = useState(100);

  const total = principal + taxes + insurance + hoa + utilities;

  const segments = [
    { label: "Principal & interest", value: principal, color: "bg-[#1e4532]" },
    { label: "Property taxes", value: taxes, color: "bg-[#701a75]" },
    { label: "Homeowners insurance", value: insurance, color: "bg-pink-200" },
    { label: "HOA fees", value: hoa, color: "bg-yellow-300" },
    { label: "Utilities", value: utilities, color: "bg-orange-400" },
  ];

  return (
    <section className="bg-[#fefdfa] px-6 geist-modify md:px-20 py-16 text-[#1e1e1e]">
  <h3 className="text-xl font-medium mb-2">Monthly payment breakdown</h3>
  <h2 className="text-3xl font-bold mb-6">${total.toFixed(2)}/mo</h2>

  {/* Responsive Flex Layout: Bar + Labels + Inputs */}
  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-10">
    {/* Visual Bar */}
    <div className="flex-1">
      <div className="flex h-14 overflow-hidden rounded-full">
        {segments.map((seg, i) => (
          <div
            key={i}
            className={`${seg.color} h-full`}
            style={{
              width: `${(seg.value / total) * 100}%`,
              borderTopRightRadius: i === segments.length - 1 ? "9999px" : "0",
              borderBottomRightRadius: i === segments.length - 1 ? "9999px" : "0",
              borderTopLeftRadius: i === 0 ? "9999px" : "0",
              borderBottomLeftRadius: i === 0 ? "9999px" : "0",
            }}
          ></div>
        ))}
      </div>
    </div>

    {/* Labels + Inputs */}
    <div className="grid grid-cols-1 gap-4 w-full md:w-[350px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 rounded-sm bg-[#1f4637]"></div>
          <span className="text-sm text-[#1e1e1e]">Principal & interest</span>
        </div>
        <p className="font-semibold">${principal.toFixed(2)}</p>
      </div>

      {[
        { label: "Property taxes", value: taxes, setter: setTaxes, color: "bg-purple-800" },
        { label: "Homeowners insurance", value: insurance, setter: setInsurance, color: "bg-pink-200" },
        { label: "HOA fees", value: hoa, setter: setHOA, color: "bg-yellow-300" },
        { label: "Utilities", value: utilities, setter: setUtilities, color: "bg-orange-400" },
      ].map((item, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-6 rounded-sm ${item.color}`}></div>
            <span className="text-sm text-[#1e1e1e]">{item.label}</span>
          </div>
          <div className="flex items-center border rounded-lg px-2 py-3 w-33">
            <span className="text-sm text-gray-700">$</span>
            <input
              type="number"
              className="w-full outline-none bg-transparent pl-1 text-sm"
              value={item.value}
              onChange={(e) => item.setter(+e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  <button className="bg-[#f1f7f1] mt-4 md:ml-227 px-8 py-5 rounded-lg font-medium">
    Copy estimate link
  </button>
</section>

  );
};

export default BreakdownBar;
