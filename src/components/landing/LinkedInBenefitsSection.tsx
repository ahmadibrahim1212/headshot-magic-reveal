
import React from 'react';
import { CheckCircle } from "lucide-react";

const LinkedInBenefitsSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          Make Your LinkedIn Clear,<br />
          Confident, and Compelling
        </h2>
        <p className="text-center text-xl text-gray-600 mb-4 font-medium">
          You have 7 seconds to make it count.
        </p>
        <p className="text-center text-lg text-gray-600 mb-16">
          Recruiters don't scroll — they skim. You've got a narrow window to prove you're worth a closer look.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Appear in More Recruiter Searches</h3>
                <p className="text-gray-600 text-base leading-relaxed">Profiles with the right keywords show up in 6× more recruiter searches. We optimize yours to appear in global and regional (Gulf, EU, U.S.) opportunities.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Get Noticed — Fast</h3>
                <p className="text-gray-600 text-base leading-relaxed">Optimized headlines can generate 3× more clicks from recruiters and hiring managers. We write yours to stop the scroll.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Turn Views into Real Conversations</h3>
                <p className="text-gray-600 text-base leading-relaxed">Profiles with clear summaries and strong formatting receive 58% more recruiter messages. A polished profile helps turn views into real interview invites.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Stand Out From the Crowd</h3>
                <p className="text-gray-600 text-base leading-relaxed">There are over 1 billion LinkedIn profiles — and most sound the same. We make sure yours actually gets read.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Tell Your Story, Your Way</h3>
                <p className="text-gray-600 text-base leading-relaxed">We turn your experience — whether you're in Beirut, Riyadh, or Paris — into a compelling narrative that aligns with your career goals.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Get Closer to Your Career Dream</h3>
                <p className="text-gray-600 text-base leading-relaxed">Clients have reported 2×–5× more profile views and interview invites within 7–14 days of using our service. Every rewrite is built to help you land the right opportunity — faster.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInBenefitsSection;
