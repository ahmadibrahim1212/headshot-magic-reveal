
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-left">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Upload<br />Your Photo</h3>
            </div>
            <p className="text-gray-600 mb-4">No design skills?<br />No problem.</p>
            <div className="w-24 h-1 bg-gray-300 mb-8"></div>
          </div>
          
          <div className="text-left">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">We<br />Enhance It</h3>
            </div>
            <p className="text-gray-600 mb-4">We polish while<br />you sleep.</p>
            <div className="w-24 h-1 bg-gray-300 mb-8"></div>
          </div>
          
          <div className="text-left">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You<br />Stand Out</h3>
            </div>
            <p className="text-gray-600 mb-4">Copy + Paste<br />+ Shine</p>
            <div className="w-24 h-1 bg-gray-300 mb-8"></div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg italic text-gray-700 font-medium">
            „In a world of noise, clarity wins."
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
