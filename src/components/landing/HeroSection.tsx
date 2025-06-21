
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface HeroSectionProps {
  onStartUpload: () => void;
}

const HeroSection = ({ onStartUpload }: HeroSectionProps) => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Your LinkedIn Photo<br />
          Might Be Costing You<br />
          Opportunities.
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Look instantly more credible with a free professional headshot. Join 50,000+ who've upgraded.
        </p>

        <Button 
          onClick={onStartUpload}
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
        >
          <Download className="mr-2 h-5 w-5" />
          Upload Your Photo — It's Free
        </Button>
        
        <p className="text-gray-500 text-sm mb-16">No credit card required.</p>

        {/* Before/After Preview */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Before – Your Current Photo</h3>
            <div className="relative max-w-sm mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="Before transformation" 
                className="rounded-xl shadow-lg w-full"
              />
              <Badge className="absolute top-4 left-4 bg-gray-200 text-gray-700">Original</Badge>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">After - Professionally Enhanced</h3>
            <div className="relative max-w-sm mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="After transformation" 
                className="rounded-xl shadow-lg w-full ring-4 ring-blue-200"
              />
              <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-700">Enhanced</Badge>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">↓ See how it works</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
