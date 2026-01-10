import { Home, Link, DollarSign } from "lucide-react"; // Install via: npm install lucide-react

const Middle = () => {
  return (
    <section className="bg-[#fdfcf9] py-20 px-4 text-center -mt-20 geist-modify">

      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-2">
          Hi, we’re KrizPay!
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1e1e1e] mb-2">
          How would you like to use crypto today?
        </h2>
      </div>

      <div className="space-y-4 max-w-xl mx-auto mb-16">

        <div className="flex hover:border-purple-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <Home className="text-purple-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium text-lg hover:text-purple-600">
            Pay merchants using crypto
          </span>
        </div>

        <div className="flex hover:border-purple-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <Link className="text-purple-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium hover:text-purple-600 text-lg">
            Convert crypto to INR instantly
          </span>
        </div>

        <div className="flex hover:border-purple-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <DollarSign className="text-purple-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium hover:text-purple-600 text-lg">
            Scan any UPI QR and pay
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-16">
        <div>
          <h3 className="text-3xl font-bold text-[#1e1e1e]">150M+</h3>
          <p className="text-gray-600 text-sm mt-1">
            crypto users in India
          </p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#1e1e1e]">54%</h3>
          <p className="text-gray-600 text-sm mt-1">
            projected market CAGR through 2032
          </p>
        </div>
      </div>
    </section>
  );
};

export default Middle;
