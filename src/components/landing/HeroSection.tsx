
import React, { useState } from 'react';
import { ChevronDown } from "lucide-react";
import LinkedInScorecard from "@/components/LinkedInScorecard";
import LinkedInFormModal from "@/components/LinkedInFormModal";
import ScorecardInput from "@/components/hero/ScorecardInput";
import BeforeAfterShowcase from "@/components/hero/BeforeAfterShowcase";

interface HeroSectionProps {
  onStartUpload: () => void;
}

const HeroSection = ({ onStartUpload }: HeroSectionProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showError, setShowError] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const handleGetScorecard = () => {
    if (!linkedinUrl.trim()) {
      setShowError(true);
      return;
    }
    
    // Basic LinkedIn URL validation
    if (!linkedinUrl.includes('linkedin.com/in/')) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setShowScorecard(true);
  };

  const handleGetMakeover = () => {
    console.log('Opening LinkedIn form modal');
    setShowFormModal(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    setShowFormModal(false);
    onStartUpload();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedinUrl(e.target.value);
    if (showError) setShowError(false);
  };

  return (
    <>
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Stand Out. Get Noticed.<br />
            Land More Opportunities with LinkedIn.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium">
            Get a free scorecard that rates your headline, photo, and profile strength — and see how you stack up.
          </p>

          {!showScorecard && (
            <>
              <ScorecardInput
                linkedinUrl={linkedinUrl}
                showError={showError}
                onInputChange={handleInputChange}
                onGetScorecard={handleGetScorecard}
              />

              <BeforeAfterShowcase />

              <div className="flex justify-center items-center space-x-8 mb-16 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</div>
                  Upload LinkedIn URL
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</div>
                  Scorecard Generated
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</div>
                  Tips Delivered
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-500 font-medium">Trusted by 50,000+ professionals</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">See how it works</p>
                <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
              </div>
            </>
          )}

          {showScorecard && (
            <LinkedInScorecard 
              linkedinUrl={linkedinUrl} 
              onGetMakeover={handleGetMakeover}
            />
          )}
        </div>
      </section>

      <LinkedInFormModal 
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};

export default HeroSection;
