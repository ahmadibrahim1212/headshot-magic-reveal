
import React from 'react';
import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onShowUpsell: () => void;
}

const FinalCTASection = ({ onShowUpsell }: FinalCTASectionProps) => {
  return (
    <section className="py-16 px-6 bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <p className="text-lg mb-2">We process 500 headshots/day.</p>
        <p className="text-3xl font-bold text-yellow-400 mb-4">8 profile spots left today</p>
        
        <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-2xl font-bold mb-6 inline-block">
          04:57
        </div>
        
        <p className="text-lg mb-6 italic">"This made me feel confident again—totally worth it."</p>
        
        <h2 className="text-4xl font-bold mb-4">Upgrade Your LinkedIn Before Midnight</h2>
        <p className="text-lg mb-8">We'll write a pro headline, custom About...</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Button 
            onClick={onShowUpsell}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Upgrade for $49 +FREE Bonuses
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full"
          >
            No thanks—just my headshot
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
