
import React from 'react';
import { CheckCircle, ArrowRight } from "lucide-react";

const LinkedInBenefitsSection = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Your Profile Isn't Just a Résumé.<br />
          It's a Sales Page
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Recruiters don't scroll. They scan. You have 7 seconds to win their trust.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">1 Billion Searches Per Year</h3>
                <p className="text-gray-600">if your profile isn't optimized, you don't exist. The top 10% of profiles get 6 -8x more views.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">3× More Clicks</h3>
                <p className="text-gray-600">Profiles with strong, specific headlines get way more attention. Don't blend in.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">58% Higher DM Responses</h3>
                <p className="text-gray-600">People respond when your story is clear and compelling. Most About sections read like job descriptions.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Story Sells. Fluff Fails.</h3>
                <p className="text-gray-600">We help you sound smart, memorable, and hireable — not generic.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">You Only Get 7 Seconds</h3>
                <p className="text-gray-600">That's how long recruiters give your profile. We help you win in that window.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="w-32 h-3 bg-gray-200 rounded"></div>
                </div>
                <ArrowRight className="h-6 w-6 text-gray-400" />
                <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">John Doe</p>
                <p className="text-xs text-gray-600">Software Engineer</p>
              </div>
            </div>
            
            <blockquote className="text-lg italic text-gray-700 font-medium text-center">
              "in a world get noise,<br />clarity wins."
              <footer className="text-sm font-normal mt-2">— Craig Clemens</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInBenefitsSection;
