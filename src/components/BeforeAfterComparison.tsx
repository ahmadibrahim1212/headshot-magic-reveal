
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, ArrowRight, Star, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BeforeAfterComparisonProps {
  beforePhoto: string;
  afterPhoto: string;
  onShowUpsell: () => void;
  userData: any;
}

const BeforeAfterComparison = ({ beforePhoto, afterPhoto, onShowUpsell, userData }: BeforeAfterComparisonProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate sending email automatically
    const timer = setTimeout(() => {
      setEmailSent(true);
      toast({
        title: "Headshot sent to your email!",
        description: `We've sent your professional headshot to ${userData.email}`,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [userData.email, toast]);

  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    toast({
      title: "Download started",
      description: "Your professional headshot is downloading...",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            🎉 Your Professional Headshot is Ready!
          </h1>
          <p className="text-xl text-gray-600">
            Amazing transformation, {userData.name}! Check out your before and after comparison.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative">
              <img 
                src={beforePhoto} 
                alt="Before transformation" 
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-gray-100 text-gray-700">
                Before
              </Badge>
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-600">Your Original Photo</h3>
              <p className="text-sm text-gray-500">Good start, but we can do better!</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-xl ring-4 ring-blue-200">
            <div className="relative">
              <img 
                src={afterPhoto} 
                alt="After transformation" 
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                AI Enhanced
              </Badge>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-600">Your Professional Headshot</h3>
              <p className="text-sm text-blue-500">LinkedIn-ready and impressive!</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              onClick={handleDownload}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download High-Res Version
            </Button>
            
            {emailSent && (
              <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <Mail className="mr-2 h-4 w-4" />
                <span className="text-sm">Sent to {userData.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Upsell Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Love Your New Headshot? Let's Optimize Your Entire LinkedIn!
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Your headshot is just the beginning. Get a complete LinkedIn makeover 
                that attracts recruiters and opportunities.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* LinkedIn Optimization Offer */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">LinkedIn Profile Optimization</h3>
                      <Badge className="bg-yellow-400 text-yellow-900">Popular</Badge>
                    </div>
                    <ul className="text-left space-y-2 mb-6 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Professional headline writing</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Compelling summary optimization</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Keyword optimization for your industry</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Skills & endorsements strategy</li>
                    </ul>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">$49</span>
                      <span className="text-sm opacity-75 ml-2">one-time</span>
                    </div>
                    <Button 
                      onClick={onShowUpsell}
                      className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Yes, Optimize My LinkedIn
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Full Bundle Offer */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 ring-2 ring-yellow-400">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Complete Career Bundle</h3>
                      <Badge className="bg-yellow-400 text-yellow-900">Best Value</Badge>
                    </div>
                    <ul className="text-left space-y-2 mb-6 text-sm">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Everything in LinkedIn package</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Professional resume rewrite</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />AI networking scripts</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2" />Interview preparation guide</li>
                    </ul>
                    <div className="mb-4">
                      <span className="text-3xl font-bold">$99</span>
                      <span className="text-sm opacity-75 ml-2">Save $78!</span>
                    </div>
                    <Button 
                      onClick={onShowUpsell}
                      className="w-full bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
                    >
                      Upgrade to Full Bundle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center space-x-4 text-sm opacity-75">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>4.9/5 rating from 2,000+ professionals</span>
                </div>
                <span>•</span>
                <span>30-day money-back guarantee</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Join 50,000+ professionals who've transformed their careers
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <span>✓ Used by Fortune 500 executives</span>
            <span>✓ 40% increase in interview requests</span>
            <span>✓ 300% more profile views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
