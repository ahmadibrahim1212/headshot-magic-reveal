
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

interface LinkedInMakeoverSectionProps {
  onShowUpsell: () => void;
}

const LinkedInMakeoverSection = ({ onShowUpsell }: LinkedInMakeoverSectionProps) => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6">Want the Full<br />LinkedIn Makeover?</h2>
        
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
              ⚡ Only 12 free headshots left today
            </Badge>
          </div>
          
          <p className="text-xl text-gray-700 mb-6">$49 until midnight — $99 tomorrow</p>
          
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>A rewritten Headline that makes you stand out</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>A fresh, compelling About Section</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>3 Recommended Skills based on your field</span>
            </div>
          </div>
          
          <Button 
            onClick={onShowUpsell}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
          >
            Upgrade My Profile for $49
          </Button>
          
          <Card className="bg-white border-0 shadow-sm max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"The upgrade was worth every penny. I feel more confident applying for jobs now!"</p>
              <div>
                <p className="font-semibold">Sarah J.</p>
                <p className="text-sm text-gray-600">Marketing Manager</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LinkedInMakeoverSection;
