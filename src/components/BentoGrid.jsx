import { FaArrowRight } from 'react-icons/fa';

const cards = [
  {
    title: 'Buying your first home with Better',
    image: '/src/assets/house.webp',
    text: '',
  },
  {
    title: 'One Day Mortgage',
    image: '/src/assets/oneday.webp',
    text: 'Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day.',
  },
  {
    title: 'Better HELOC',
    image: '/src/assets/heloc.webp',
    text: 'Introducing One Day HELOC™—your express lane to getting cash from your home with our Home Equity Line of Credit. Access up to 90% of your home equity as cash in as little as 7 days.',
  },
  {
    title: 'Insurance',
    image: '/src/assets/insurance.webp',
    text: '',
  },
];

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#fdfcf9]">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#edf7f0] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          {/* Left text block */}
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-[#1c3b2d] mb-2">{card.title}</h3>
            {card.text && <p className="text-sm text-[#1c3b2d]">{card.text}</p>}
          </div>

          {/* Icon and image */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="border border-[#cfe8da] rounded-full p-3 hover:bg-white transition cursor-pointer">
              <FaArrowRight className="text-[#1c3b2d]" />
            </div>
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className="w-48 h-auto rounded-xl object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;
