
import React from 'react';
import { Link, Target, Sparkles, ClipboardCopy } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Link className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Send Us Your LinkedIn<br />& Career Goal</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Drop your LinkedIn URL and tell us your dream role or career goal — we tailor your profile to it.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900">We Rewrite Your Profile<br />to Convert</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our expert team (with AI help) rewrites your Headline, About section, and suggests Skills that attract recruiters.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 mx-auto group-hover:scale-110 transition-transform duration-300">
              <ClipboardCopy className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900">You Copy + Paste<br />— And Shine</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              We deliver the polished result in 24–48 hrs. Just paste it into LinkedIn and start standing out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
