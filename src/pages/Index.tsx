
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Shield, Star, CheckCircle, Users, Award, Camera } from "lucide-react";
import UploadForm from "@/components/UploadForm";
import ProgressTracker from "@/components/ProgressTracker";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import UpsellModal from "@/components/UpsellModal";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'form' | 'processing' | 'results'>('landing');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [generatedPhoto, setGeneratedPhoto] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleStartUpload = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: any, photoUrl: string) => {
    setUserData(data);
    setUserPhoto(photoUrl);
    setCurrentStep('processing');
    
    // Simulate AI processing
    setTimeout(() => {
      setGeneratedPhoto('/placeholder.svg'); // In real app, this would be the AI-generated image
      setCurrentStep('results');
    }, 5000);
  };

  const handleShowUpsell = () => {
    setShowUpsell(true);
  };

  if (currentStep === 'form') {
    return <UploadForm onSubmit={handleFormSubmit} onBack={() => setCurrentStep('landing')} />;
  }

  if (currentStep === 'processing') {
    return <ProgressTracker />;
  }

  if (currentStep === 'results') {
    return (
      <>
        <BeforeAfterComparison 
          beforePhoto={userPhoto!} 
          afterPhoto={generatedPhoto!}
          onShowUpsell={handleShowUpsell}
          userData={userData}
        />
        <UpsellModal 
          isOpen={showUpsell} 
          onClose={() => setShowUpsell(false)}
          userData={userData}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HeadshotAI Pro
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>100% Secure Upload</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            🎉 Free AI Headshot Generator
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your LinkedIn Photo with
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
              Professional AI Magic
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Upload your current LinkedIn photo and get a stunning, AI-enhanced professional headshot 
            in seconds. Join 50,000+ professionals who've boosted their career prospects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleStartUpload}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload My Photo - It's FREE!
            </Button>
            <div className="flex items-center text-gray-500 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              No credit card required
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span>256-bit SSL Encrypted</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Users className="h-5 w-5 text-blue-500" />
              <span>50,000+ Happy Users</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Professional Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Preview */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">See the Transformation</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-500">Before: Regular Photo</h3>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Before transformation" 
                  className="rounded-lg shadow-lg w-full max-w-sm mx-auto"
                />
                <Badge className="absolute top-4 left-4 bg-red-100 text-red-700">Original</Badge>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">After: AI Enhanced</h3>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="After transformation" 
                  className="rounded-lg shadow-lg w-full max-w-sm mx-auto ring-4 ring-blue-200"
                />
                <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-700">AI Enhanced</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">What Professionals Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "Marketing Director",
                company: "TechCorp",
                text: "My LinkedIn views increased 300% after using this AI headshot. The quality is incredible!",
                rating: 5
              },
              {
                name: "Michael Chen",
                title: "Software Engineer", 
                company: "Google",
                text: "Professional photographers charge $500+. This gave me better results for free. Amazing!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                title: "HR Manager",
                company: "Fortune 500",
                text: "As someone who reviews LinkedIn profiles daily, these AI headshots definitely stand out.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.title} at {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Photo",
                description: "Share your current LinkedIn photo and basic professional details"
              },
              {
                step: "2", 
                title: "AI Enhancement",
                description: "Our advanced AI analyzes and enhances your photo for maximum professional impact"
              },
              {
                step: "3",
                title: "Download & Use",
                description: "Get your professional headshot instantly via email and update your LinkedIn"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Professional Image?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who've already enhanced their LinkedIn presence
          </p>
          <Button 
            onClick={handleStartUpload}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Upload className="mr-2 h-5 w-5" />
            Get My FREE AI Headshot Now
          </Button>
          <p className="mt-4 text-sm opacity-75">No spam, no credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6" />
            <span className="text-xl font-bold">HeadshotAI Pro</span>
          </div>
          <p className="text-gray-400 mb-4">Professional AI headshots for career success</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
