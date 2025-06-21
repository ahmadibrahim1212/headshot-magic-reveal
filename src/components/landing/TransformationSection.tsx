
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface TransformationSectionProps {
  onScrollToUpsell: () => void;
}

const TransformationSection = ({ onScrollToUpsell }: TransformationSectionProps) => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          See the Transformation
        </h2>
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-12">
          {/* Before Photo */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-600">Before</h3>
            <div className="relative max-w-md mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="Before professional headshot transformation" 
                className="rounded-2xl shadow-lg w-full aspect-square object-cover"
              />
              <Badge className="absolute bottom-4 left-4 bg-white/90 text-gray-700 font-medium">
                Original Photo
              </Badge>
            </div>
          </div>
          
          {/* After Photo */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-blue-600">After</h3>
            <div className="relative max-w-md mx-auto">
              <img 
                src="/placeholder.svg" 
                alt="After professional headshot transformation" 
                className="rounded-2xl shadow-xl w-full aspect-square object-cover ring-4 ring-blue-200"
              />
              <Badge className="absolute bottom-4 left-4 bg-blue-100 text-blue-700 font-medium">
                Enhanced
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Permission Badge */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="bg-white border-gray-200 text-gray-600 px-4 py-2">
            ✓ Submitted with permission
          </Badge>
        </div>
        
        {/* Upsell Microcopy */}
        <div className="text-center">
          <button 
            onClick={onScrollToUpsell}
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg underline underline-offset-4 transition-colors"
          >
            Want to upgrade your entire profile too? →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
