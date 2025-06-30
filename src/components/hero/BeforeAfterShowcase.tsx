
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const BeforeAfterShowcase = () => {
  return (
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
  );
};

export default BeforeAfterShowcase;
