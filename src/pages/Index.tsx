
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
    
    // Simulate processing
    setTimeout(() => {
      setGeneratedPhoto('/placeholder.svg'); // In real app, this would be the generated image
      setCurrentStep('results');
    }, 5000);
  };

  const handleShowUpsell = () => {
    setShowUpsell(true);
  };

  const scrollToLinkedInMakeover = () => {
    const element = document.getElementById('linkedin-makeover');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToUpgrade = () => {
    const element = document.getElementById('linkedin-makeover');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            🎉 Free Professional Headshots
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Look Instantly More Professional on LinkedIn
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get a polished, studio-quality headshot that elevates your online presence — trusted by 50,000+ professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button 
              onClick={handleStartUpload}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload My Photo – It's FREE!
            </Button>
          </div>
          <p className="text-gray-500 text-sm mb-12">No credit card required. Ready in 30 seconds.</p>

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
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-gray-500">Before – Your Current Photo</h3>
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
              <h3 className="text-xl font-semibold mb-4 text-blue-600">After – Professionally Enhanced</h3>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="After transformation" 
                  className="rounded-lg shadow-lg w-full max-w-sm mx-auto ring-4 ring-blue-200"
                />
                <Badge className="absolute top-4 left-4 bg-blue-100 text-blue-700">Enhanced</Badge>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={scrollToLinkedInMakeover}
              className="text-lg text-blue-600 font-medium hover:text-blue-700 transition-colors underline decoration-2 underline-offset-4 hover:underline-offset-8 transition-all duration-200"
            >
              👉 Want to upgrade your entire profile too? Scroll down.
            </button>
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
                name: "Sarah J.",
                title: "Marketing Manager",
                text: "I finally felt proud of my profile. Got 3 recruiter DMs within a week — worth way more than $49.",
                rating: 5
              },
              {
                name: "Michael G.",
                title: "Software Engineer", 
                text: "The headshot was great, but the full LinkedIn upgrade is what helped me land two interviews. It felt like a personal rebrand.",
                rating: 5
              },
              {
                name: "Emily R.",
                title: "HR Manager",
                text: "These profiles stand out immediately — better than most of what I see in applicant tracking systems.",
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
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Optimize Your LinkedIn? */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-6">Why Optimize Your LinkedIn?</h2>
          <p className="text-xl text-center text-gray-700 mb-12 font-medium">
            Your profile isn't just a résumé. It's your personal sales page.
          </p>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Recruiters search LinkedIn 1 billion times a year</h3>
                <p className="text-gray-600">If your profile isn't optimized, you don't exist. The top 10% of profiles get 6–8× more views.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Profiles with professional headlines get 3× more clicks</h3>
                <p className="text-gray-600">First impressions matter. "Software Engineer @ Meta" is forgettable. We rewrite headlines that spark curiosity and authority.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">DM response rates jump 58% with a strong About section</h3>
                <p className="text-gray-600">People reply when they understand what you do — and why it matters.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Story sells. Fluff fails.</h3>
                <p className="text-gray-600">Most LinkedIn summaries sound like job descriptions. We turn yours into a short, sharp narrative that gets remembered.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">You only get 7 seconds</h3>
                <p className="text-gray-600">That's how long the average recruiter scans your profile. We help you win in that window.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <blockquote className="text-xl italic text-gray-700 font-medium">
              "In a world of noise, clarity wins." — Craig Clemens
            </blockquote>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us About Your Goals",
                description: "Share your current LinkedIn link and a few quick details — whether you're job hunting, aiming for a promotion, or building your brand."
              },
              {
                step: "2", 
                title: "We Rewrite Your Profile",
                description: "Our team crafts a compelling new headline, About section, banner image, and skill recommendations tailored to your career direction."
              },
              {
                step: "3",
                title: "You Copy + Paste and Shine",
                description: "You'll receive a fully optimized profile in your inbox — ready to paste into LinkedIn and start standing out immediately."
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

      {/* LinkedIn Makeover Section */}
      <section id="linkedin-makeover" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Want the Full LinkedIn Makeover?</h2>
          
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-xl text-gray-700 mb-6">For $49, you get:</p>
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
                <span>A premium Banner Image</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>3 Recommended Skills based on your field</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">No guesswork. No fluff. Just a profile you'll be proud of.</p>
            <Button 
              onClick={handleShowUpsell}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Yes — Upgrade My Profile for $49
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your LinkedIn — Fast?</h2>
          <p className="text-xl mb-8 opacity-90">
            We'll give you a professional headshot for free — and if you want your entire profile to stand out, we'll upgrade that too.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              onClick={handleStartUpload}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="mr-2 h-5 w-5" />
              Get My Free Headshot
            </Button>
            <Button 
              onClick={scrollToUpgrade}
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Upgrade My LinkedIn for $49
            </Button>
          </div>
          <p className="text-sm opacity-75">
            Join 50,000+ professionals who now stand out online. This is the easiest way to instantly boost your credibility.
          </p>
        </div>
      </section>

      {/* Sticky Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-lg">
        <Button 
          onClick={scrollToUpgrade}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-full shadow-lg"
        >
          Upgrade My LinkedIn for $49
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 pb-20 md:pb-12">
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
