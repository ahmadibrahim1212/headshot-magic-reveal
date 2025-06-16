
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Shield, Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

const UpsellModal = ({ isOpen, onClose, userData }: UpsellModalProps) => {
  const [selectedPackage, setSelectedPackage] = useState<'linkedin' | 'bundle'>('linkedin');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const packages = {
    linkedin: {
      name: "LinkedIn Profile Optimization",
      price: 49,
      originalPrice: 127,
      features: [
        "Professional headline rewrite",
        "Compelling summary optimization", 
        "Industry keyword optimization",
        "Skills & endorsements strategy",
        "LinkedIn messaging templates",
        "Profile visibility tips"
      ],
      badge: "Most Popular"
    },
    bundle: {
      name: "Complete Career Transformation Bundle",
      price: 99,
      originalPrice: 247,
      features: [
        "Everything in LinkedIn package",
        "Professional resume rewrite",
        "ATS-optimized formatting",
        "AI networking scripts library",
        "Interview preparation guide",
        "Salary negotiation templates",
        "30-day career coaching support"
      ],
      badge: "Best Value"
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would call Stripe checkout
      // For demo purposes, we'll simulate the checkout process
      
      setTimeout(() => {
        toast({
          title: "Redirecting to checkout...",
          description: `Processing ${packages[selectedPackage].name} for $${packages[selectedPackage].price}`,
        });
        
        // Simulate Stripe redirect
        setTimeout(() => {
          toast({
            title: "Payment successful!",
            description: "Thank you for your purchase. You'll receive your optimized materials within 24 hours.",
          });
          onClose();
          setIsProcessing(false);
        }, 2000);
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Checkout error",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Complete Your Career Transformation
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-600">
            Hi {userData?.name}! Your headshot is just the beginning. Choose the perfect package to maximize your professional impact.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(packages).map(([key, pkg]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPackage === key 
                    ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedPackage(key as 'linkedin' | 'bundle')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={
                      key === 'bundle' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }>
                      {pkg.badge}
                    </Badge>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      selectedPackage === key 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPackage === key && (
                        <CheckCircle className="h-4 w-4 text-white m-0.5" />
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-green-600">${pkg.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                    <div className="text-sm text-green-600">
                      Save ${pkg.originalPrice - pkg.price}!
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">30-Day Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600">4.9/5 from 2,000+ users</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Testimonial" 
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-700 italic mb-2">
                    "The LinkedIn optimization increased my profile views by 400% and I got 3 interview requests within a week!"
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Sarah Johnson</strong> - Marketing Director at TechCorp
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgency */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-800">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">
                Limited Time: 50% off expires in 24 hours!
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Secure Checkout - ${packages[selectedPackage].price}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By clicking checkout, you'll be redirected to our secure Stripe payment page. 
            Your purchase is protected by our 30-day money-back guarantee.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpsellModal;
