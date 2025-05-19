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
    <section className="bg-[#fefdfa] px-6 md:px-20 py-16 text-[#1e1e1e]">
      <h3 className="text-xl font-medium mb-2">Monthly payment breakdown</h3>
      <h2 className="text-3xl font-bold mb-6">${total.toFixed(2)}/mo</h2>

      {/* Visual Bar */}
      <div className="flex h-14 overflow-hidden rounded-full mb-8">
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

      {/* Labels + Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-2 h-6 rounded-sm ${seg.color}`}></div>
              <p className="text-gray-700 text-sm">{seg.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-right font-semibold">${principal.toFixed(2)}</p>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={taxes}
            onChange={(e) => setTaxes(+e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border rounded-lg border-green-700"
            value={insurance}
            onChange={(e) => setInsurance(+e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={hoa}
            onChange={(e) => setHOA(+e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            value={utilities}
            onChange={(e) => setUtilities(+e.target.value)}
          />
          <button className="bg-[#f3f9f5] mt-4 px-6 py-3 rounded-lg font-medium w-full">
            Copy estimate link
          </button>
        </div>
      </div>
    </section>
  );
};

export default BreakdownBar;
