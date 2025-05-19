import { Home, Link, DollarSign } from "lucide-react"; // Install via: npm install lucide-react

const Middle = () => {
  return (
    <section className="bg-[#fdfcf9] py-20 px-4 text-center -mt-20 geist-modify">
      {/* Heading */}
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-2">Hi, I'm Betsy!</h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1e1e1e] mb-2">What can I help you with?</h2>
      </div>

      {/* Options */}
      <div className="space-y-4 max-w-xl mx-auto mb-16">
        {/* Option 1 */}
        <div className="flex hover:border-green-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <Home className="text-green-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium text-lg hover:text-green-600">Buying a home</span>
        </div>

        {/* Option 2 */}
        <div className="flex hover:border-green-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <Link className="text-green-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium hover:text-green-600 text-lg">Refinance my mortgage</span>
        </div>

        {/* Option 3 */}
        <div className="flex hover:border-green-700 hover:border-3 items-center gap-4 px-6 py-4 border border-gray-300 rounded-xl bg-white hover:shadow transition cursor-pointer">
          <DollarSign className="text-green-700 w-6 h-6" />
          <span className="text-[#1e1e1e] font-medium hover:text-green-600 text-lg">Get cash from my home</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-16">
        <div>
          <h3 className="text-3xl font-bold text-[#1e1e1e]">$100B</h3>
          <p className="text-gray-600 text-sm mt-1">home loans funded entirely online</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#1e1e1e]">400K</h3>
          <p className="text-gray-600 text-sm mt-1">Customers who chose a Better Mortgage</p>
        </div>
      </div>
    </section>
  );
};

export default Middle;
