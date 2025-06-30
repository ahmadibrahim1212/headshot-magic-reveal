
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ChevronDown, TrendingUp } from "lucide-react";
import LinkedInScorecard from "@/components/LinkedInScorecard";

interface HeroSectionProps {
  onStartUpload: () => void;
}

const HeroSection = ({ onStartUpload }: HeroSectionProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showError, setShowError] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false);

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
    onStartUpload();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedinUrl(e.target.value);
    if (showError) setShowError(false);
  };

  return (
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
            <div className="max-w-md mx-auto mb-6">
              <Input
                type="text"
                placeholder="Paste your LinkedIn URL here..."
                value={linkedinUrl}
                onChange={handleInputChange}
                className="w-full h-14 text-lg px-6 rounded-xl border-2 border-gray-200 focus:border-blue-600 shadow-sm"
              />
              {showError && (
                <p className="text-red-500 text-sm mt-2 text-left">
                  Please enter a valid LinkedIn URL to continue.
                </p>
              )}
            </div>

            <Button 
              onClick={handleGetScorecard}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-16 w-full max-w-md"
            >
              <BarChart3 className="mr-3 h-6 w-6" />
              Get My Free LinkedIn Scorecard
            </Button>

            <p className="text-sm text-gray-500 mb-16">No credit card required</p>

            {/* Before/After Scorecard Preview */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16 max-w-5xl mx-auto">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-gray-600">Your Current Profile</h3>
                <div className="relative max-w-md mx-auto">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Profile Strength</span>
                        <span className="text-lg font-bold text-red-500">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Headline</span>
                          <span className="text-red-500 font-medium">Weak</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Photo</span>
                          <span className="text-yellow-500 font-medium">Fair</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">About Section</span>
                          <span className="text-red-500 font-medium">Poor</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute bottom-4 left-4 bg-white/90 text-gray-700 font-medium">
                    Before Analysis
                  </Badge>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Your Scorecard Results</h3>
                <div className="relative max-w-md mx-auto">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg ring-4 ring-blue-100">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Profile Strength</span>
                        <span className="text-lg font-bold text-green-500">87%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Headline</span>
                          <span className="text-green-500 font-medium">Strong</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Photo</span>
                          <span className="text-green-500 font-medium">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">About Section</span>
                          <span className="text-blue-600 font-medium">Optimized</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center text-green-700 text-sm">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          <span className="font-medium">Top 15% of profiles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute bottom-4 left-4 bg-blue-100 text-blue-700 font-medium">
                    After Analysis
                  </Badge>
                </div>
              </div>
            </div>

            {/* Process Steps */}
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

            {/* Trust Bar */}
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 font-medium">Trusted by 50,000+ professionals</p>
            </div>
            
            {/* Scroll Cue */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">See how it works</p>
              <ChevronDown className="h-6 w-6 text-gray-400 mx-auto animate-bounce" />
            </div>
          </>
        )}

        {/* Scorecard Display */}
        {showScorecard && (
          <LinkedInScorecard 
            linkedinUrl={linkedinUrl} 
            onGetMakeover={handleGetMakeover}
          />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
