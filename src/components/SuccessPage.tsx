
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Mail, Home } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-6">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            🎉 Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase! We're excited to help transform your professional presence.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
            <h2 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Email confirmation sent</p>
                  <p className="text-sm text-blue-600">Check your inbox for order details and next steps</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Download className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Delivery within 24 hours</p>
                  <p className="text-sm text-blue-600">Your optimized materials will be delivered to your email</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={() => window.location.href = '/'}
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
            
            <p className="text-sm text-gray-500">
              Questions? Contact our support team at support@headshotaipro.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
