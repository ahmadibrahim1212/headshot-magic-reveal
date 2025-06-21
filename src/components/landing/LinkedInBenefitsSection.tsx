
import React from 'react';
import { CheckCircle } from "lucide-react";

const LinkedInBenefitsSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          Your Profile Isn't Just a Résumé.<br />
          It's a Sales Page.
        </h2>
        <p className="text-center text-xl text-gray-600 mb-16 font-medium">
          Recruiters don't scroll. They scan. You have 7 seconds to win their trust.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">1 Billion Searches Per Year</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Top 10% get 6–8× more views</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">3× More Clicks</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Strong headlines win attention</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">58% Higher DM Replies</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Clear About section = more outreach success</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Story Sells. Fluff Fails.</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Most summaries are dull. We rewrite to be sharp + memorable.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Only 7 Seconds</h3>
                <p className="text-gray-600 text-lg leading-relaxed">That's all the time you have. We help you win that window.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quote Block */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-2xl text-center max-w-3xl mx-auto">
          <blockquote className="text-2xl md:text-3xl italic text-gray-700 font-medium mb-4">
            "In a world of noise, clarity wins."
          </blockquote>
          <cite className="text-lg text-gray-600 font-semibold">— Craig Clemens</cite>
        </div>
      </div>
    </section>
  );
};

export default LinkedInBenefitsSection;
