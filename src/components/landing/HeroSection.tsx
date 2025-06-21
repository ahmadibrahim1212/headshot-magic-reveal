
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onStartUpload: () => void;
}

const HeroSection = ({ onStartUpload }: HeroSectionProps) => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Your LinkedIn Photo Is Costing You<br />
          Opportunities. Let's Fix That — Free.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
          Get a pro-level headshot in 30 seconds. Trusted by 50,000+ professionals.
        </p>

        <Button 
          onClick={onStartUpload}
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-16 w-full max-w-md"
        >
          <Download className="mr-3 h-6 w-6" />
          Upload My Photo — It's FREE
        </Button>

        {/* Before/After Preview Thumbnails */}
        <div className="grid md:grid-cols-3 gap-8 items-center mb-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="relative max-w-xs mx-auto mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Before transformation 1" 
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-gray-100 text-gray-700 font-medium">Before</Badge>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative max-w-xs mx-auto mb-4">
              <img 
                src="/placeholder.svg" 
                alt="After transformation - featured" 
                className="rounded-2xl shadow-xl w-full aspect-square object-cover ring-4 ring-blue-200"
              />
              <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-700 font-medium">After</Badge>
            </div>
            <p className="text-sm font-semibold text-blue-600">Featured Transformation</p>
          </div>
          
          <div className="text-center">
            <div className="relative max-w-xs mx-auto mb-4">
              <img 
                src="/placeholder.svg" 
                alt="Before transformation 2" 
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-gray-100 text-gray-700 font-medium">Before</Badge>
            </div>
          </div>
        </div>
        
        {/* Scroll Cue */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">See the transformation</p>
          <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
