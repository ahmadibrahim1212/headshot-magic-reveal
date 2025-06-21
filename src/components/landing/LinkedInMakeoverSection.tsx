
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, Clock } from "lucide-react";

interface LinkedInMakeoverSectionProps {
  onShowUpsell: () => void;
}

const LinkedInMakeoverSection = ({ onShowUpsell }: LinkedInMakeoverSectionProps) => {
  return (
    <section className="py-20 px-6 bg-white" id="linkedin-makeover">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-900">
          LinkedIn Makeover Offer
        </h2>
        
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-12">
          {/* Urgency Bar */}
          <div className="flex items-center justify-center mb-8">
            <Badge className="bg-red-100 text-red-800 px-6 py-3 text-lg font-semibold">
              <Clock className="h-5 w-5 mr-2" />
              Only 12 free headshots left today
            </Badge>
          </div>
          
          {/* Pricing */}
          <div className="mb-8">
            <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">$49 LinkedIn Profile Rewrite</p>
            <p className="text-xl text-gray-600 font-medium">$49 until midnight — $99 tomorrow</p>
          </div>
          
          {/* What's Included */}
          <div className="grid md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mb-12">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg font-medium">New headline</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg font-medium">Optimized About section</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg font-medium">Experience rewrite</span>
            </div>
          </div>
          
          <Button 
            onClick={onShowUpsell}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-12 w-full max-w-md"
          >
            Get LinkedIn Makeover - $49
          </Button>
          
          {/* Testimonial */}
          <Card className="bg-white border-0 shadow-lg max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="flex mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                "The upgrade was worth every penny. I feel more confident applying for jobs now!"
              </p>
              <div>
                <p className="font-bold text-lg">Sarah J.</p>
                <p className="text-gray-600">Marketing Manager</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LinkedInMakeoverSection;
