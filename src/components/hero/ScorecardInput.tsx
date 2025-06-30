
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3 } from "lucide-react";

interface ScorecardInputProps {
  linkedinUrl: string;
  showError: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetScorecard: () => void;
}

const ScorecardInput = ({ 
  linkedinUrl, 
  showError, 
  onInputChange, 
  onGetScorecard 
}: ScorecardInputProps) => {
  return (
    <>
      <div className="max-w-md mx-auto mb-6">
        <Input
          type="text"
          placeholder="Paste your LinkedIn URL here..."
          value={linkedinUrl}
          onChange={onInputChange}
          className="w-full h-14 text-lg px-6 rounded-xl border-2 border-gray-200 focus:border-blue-600 shadow-sm"
        />
        {showError && (
          <p className="text-red-500 text-sm mt-2 text-left">
            Please enter a valid LinkedIn URL to continue.
          </p>
        )}
      </div>

      <Button 
        onClick={onGetScorecard}
        size="lg" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-16 w-full max-w-md"
      >
        <BarChart3 className="mr-3 h-6 w-6" />
        Get My Free LinkedIn Scorecard
      </Button>

      <p className="text-sm text-gray-500 mb-16">No credit card required</p>
    </>
  );
};

export default ScorecardInput;
