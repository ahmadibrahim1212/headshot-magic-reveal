
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
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would call Stripe checkout
      // For demo purposes, we'll simulate the checkout process
      
      setTimeout(() => {
        toast({
          title: "Redirecting to checkout...",
          description: "Processing LinkedIn Profile Makeover for $49",
        });
        
        // Simulate Stripe redirect
        setTimeout(() => {
          toast({
            title: "Payment successful!",
            description: "Thank you for your purchase. You'll receive your optimized profile within 48 hours.",
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
            <DialogTitle className="text-3xl font-bold">
              🎯 Fix Your LinkedIn Profile for $49
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xl text-gray-600">
            Upgrade your profile in 48 hours — and start attracting more recruiters, interviews, and job offers.
          </p>
        </DialogHeader>

        <div className="space-y-8">
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">One-time payment — no upsells, no fluff</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Built for job seekers, operators, consultants</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Backed by 2,000+ users with 4.9/5 rating</span>
            </div>
          </div>

          {/* What's Included */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">💼 What's Included:</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-blue-600 mb-2">🔹 Professional Headline Rewrite</h4>
                  <p className="text-gray-600">Crafted to stand out in search results and inboxes — get clicks from recruiters.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-purple-600 mb-2">🔹 Compelling "About" Section</h4>
                  <p className="text-gray-600">We rewrite your story to position you with clarity and confidence.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-green-600 mb-2">🔹 Experience Section Overhaul (Up to 3 Roles)</h4>
                  <p className="text-gray-600">Polished bullets that show impact, not just tasks — perfect for ATS + humans.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-yellow-600 mb-2">🔹 Skills & Endorsements Strategy</h4>
                  <p className="text-gray-600">We pick the right skills so you rank in recruiter searches and look credible at a glance.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-orange-600 mb-2">🔹 Industry Keyword Optimization</h4>
                  <p className="text-gray-600">We inject the keywords your dream job needs — to help you appear in more searches.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-red-600 mb-2">🔹 LinkedIn Messaging Templates</h4>
                  <p className="text-gray-600">Use our templates to reach hiring managers, expand your network, and get replies.</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-indigo-600 mb-2">🔹 Profile Visibility Tips</h4>
                  <p className="text-gray-600">Pro tweaks to help you get more views and boost ranking in LinkedIn's algorithm.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">💬 Bonus:</h3>
              <p className="text-gray-700">
                Recruiter-Ready Profile Score — We evaluate your profile across the 7 sections that matter most to hiring teams.
              </p>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">✅ 30-Day Guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600">⭐ 4.9/5 from 2,000+ users</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">🔒 Secure Checkout</span>
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
                    <strong>Nadine A.</strong> - Marketing Director at TechCorp
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full h-16 text-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                🔵 Fix My LinkedIn for $49
                <span className="block text-sm font-normal mt-1">
                  (one-time payment, delivered in 48 hours)
                </span>
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
