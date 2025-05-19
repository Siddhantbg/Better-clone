import { Percent, DollarSign, Smartphone } from "lucide-react";

const Cards = () => {
    return (
        <div className="bg-[#fdfcf9]">
            <div className="bg-[#f1f7f1] max-w-xl geist-modfiy mx-auto rounded-xl px-8 py-6 text-center text-[#1e1e1e]">
                <p className="mb-4 font-medium">After a few questions, you'll unlock:</p>

                <div className="flex justify-center">
                    <div className="space-y-3 text-left">
                        <div className="flex items-center gap-3">
                            <Percent className="text-green-700 w-5 h-5" />
                            <span>Custom mortgage rates</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <DollarSign className="text-green-700 w-5 h-5" />
                            <span>Exclusive offers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Smartphone className="text-green-700 w-5 h-5" />
                            <span>A personalized dashboard</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cards;
