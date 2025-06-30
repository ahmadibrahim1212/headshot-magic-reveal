
import React, { useState } from 'react';
import UploadForm from "@/components/UploadForm";
import ProgressTracker from "@/components/ProgressTracker";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import UpsellModal from "@/components/UpsellModal";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import LinkedInBenefitsSection from "@/components/landing/LinkedInBenefitsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import LinkedInMakeoverSection from "@/components/landing/LinkedInMakeoverSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'processing' | 'results'>('landing');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [generatedPhoto, setGeneratedPhoto] = useState<string | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleStartUpload = () => {
    setCurrentStep('processing');
    
    setTimeout(() => {
      setGeneratedPhoto('/placeholder.svg');
      setCurrentStep('results');
    }, 5000);
  };

  const handleShowUpsell = () => {
    setShowUpsell(true);
  };

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
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection onStartUpload={handleStartUpload} />
      <LinkedInBenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <LinkedInMakeoverSection onShowUpsell={handleShowUpsell} />
      <FinalCTASection onShowUpsell={handleShowUpsell} />
      <Footer />
      
      <UpsellModal 
        isOpen={showUpsell} 
        onClose={() => setShowUpsell(false)}
        userData={userData}
      />
    </div>
  );
};

export default Index;
