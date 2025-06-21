
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Shield, Star, CheckCircle, Users, Award, Camera, ArrowRight, Download } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
    
    setTimeout(() => {
      setGeneratedPhoto('/placeholder.svg');
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

  const testimonials = [
    {
      quote: "I finally felt proud of my profile. Got 3 recruiter DMs within a week — worth way more than $49.",
      name: "Sarah J.",
      role: "Marketing Manager",
      rating: 4
    },
    {
      quote: "The headshot was great, but the full LinkedIn upgrade is what helped me land two interviews. It felt like a personal rebrand.",
      name: "Michael G.",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "These profiles stand out immediately — better than most of what I see in applicant tracking systems.",
      name: "Emily R.",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "Open to Work? Your new profile will have recruiters flooding your inbox.",
      name: "LinkedIn",
      role: "Open to Work",
      rating: 5,
      isLinkedIn: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Camera className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">
                HeadshotAI Pro
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>SSL-secure</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>No login</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>50,00 + users</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Your LinkedIn Photo<br />
            Might Be Costing You<br />
            Opportunities.
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Look instantly more credible with a free professional headshot. Join 50,000+ who've upgraded.
          </p>

          <Button 
            onClick={handleStartUpload}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
          >
            <Download className="mr-2 h-5 w-5" />
            Upload Your Photo — It's Free
          </Button>
          
          <p className="text-gray-500 text-sm mb-16">No credit card required.</p>

          {/* Before/After Preview */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-600">Before – Your Current Photo</h3>
              <div className="relative max-w-sm mx-auto">
                <img 
                  src="/placeholder.svg" 
                  alt="Before transformation" 
                  className="rounded-xl shadow-lg w-full"
                />
                <Badge className="absolute top-4 left-4 bg-gray-200 text-gray-700">Original</Badge>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">After - Professionally Enhanced</h3>
              <div className="relative max-w-sm mx-auto">
                <img 
                  src="/placeholder.svg" 
                  alt="After transformation" 
                  className="rounded-xl shadow-lg w-full ring-4 ring-blue-200"
                />
                <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-700">Enhanced</Badge>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">↓ See how it works</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Upload<br />Your Photo</h3>
              </div>
              <p className="text-gray-600 mb-4">No design skills?<br />No problem.</p>
              <div className="w-24 h-1 bg-gray-300 mb-8"></div>
            </div>
            
            <div className="text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">We<br />Enhance It</h3>
              </div>
              <p className="text-gray-600 mb-4">We polish while<br />you sleep.</p>
              <div className="w-24 h-1 bg-gray-300 mb-8"></div>
            </div>
            
            <div className="text-left">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900">You<br />Stand Out</h3>
              </div>
              <p className="text-gray-600 mb-4">Copy + Paste<br />+ Shine</p>
              <div className="w-24 h-1 bg-gray-300 mb-8"></div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg italic text-gray-700 font-medium">
              „In a world of noise, clarity wins."
            </p>
          </div>
        </div>
      </section>

      {/* Your Profile Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Your Profile Isn't Just a Résumé.<br />
            It's a Sales Page
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Recruiters don't scroll. They scan. You have 7 seconds to win their trust.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">1 Billion Searches Per Year</h3>
                  <p className="text-gray-600">if your profile isn't optimized, you don't exist. The top 10% of profiles get 6 -8x more views.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">3× More Clicks</h3>
                  <p className="text-gray-600">Profiles with strong, specific headlines get way more attention. Don't blend in.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">58% Higher DM Responses</h3>
                  <p className="text-gray-600">People respond when your story is clear and compelling. Most About sections read like job descriptions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Story Sells. Fluff Fails.</h3>
                  <p className="text-gray-600">We help you sound smart, memorable, and hireable — not generic.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">You Only Get 7 Seconds</h3>
                  <p className="text-gray-600">That's how long recruiters give your profile. We help you win in that window.</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-20 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                  <div className="w-12 h-12 bg-blue-600 rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">John Doe</p>
                  <p className="text-xs text-gray-600">Software Engineer</p>
                </div>
              </div>
              
              <blockquote className="text-lg italic text-gray-700 font-medium text-center">
                "in a world get noise,<br />clarity wins."
                <footer className="text-sm font-normal mt-2">— Craig Clemens</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">What Professionals Are Saying</h2>
          
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white border-0 shadow-lg h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-4 italic flex-1">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-3">
                        {testimonial.isLinkedIn ? (
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">in</span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* LinkedIn Makeover Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Want the Full<br />LinkedIn Makeover?</h2>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                ⚡ Only 12 free headshots left today
              </Badge>
            </div>
            
            <p className="text-xl text-gray-700 mb-6">For $49, we'll supercharge your profile</p>
            
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
              onClick={handleShowUpsell}
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

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-lg mb-2">We process 500 headshots/day.</p>
          <p className="text-3xl font-bold text-yellow-400 mb-4">8 profile spots left today</p>
          
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-lg text-2xl font-bold mb-6 inline-block">
            04:57
          </div>
          
          <p className="text-lg mb-6 italic">"This made me feel confident again—totally worth it."</p>
          
          <h2 className="text-4xl font-bold mb-4">Upgrade Your LinkedIn Before Midnight</h2>
          <p className="text-lg mb-8">We'll write a pro headline, custom About...</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              onClick={handleShowUpsell}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Upgrade for $49 +FREE Bonuses
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full"
            >
              No thanks—just my headshot
            </Button>
          </div>
        </div>
      </section>

      {/* How Does It Work Footer */}
      <section className="py-8 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold">How Does It Work?</h3>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6" />
            <span className="text-xl font-bold">HeadshotAI Pro</span>
          </div>
          <p className="text-gray-400 mb-4">Professional headshots for career success</p>
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
