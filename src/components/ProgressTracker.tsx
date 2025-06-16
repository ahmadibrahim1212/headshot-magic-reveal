
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Camera, Zap, CheckCircle } from "lucide-react";

const ProgressTracker = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { 
      icon: Camera, 
      title: "Analyzing Your Photo", 
      description: "Our AI is examining your current headshot...",
      duration: 1000
    },
    { 
      icon: Sparkles, 
      title: "Enhancing Features", 
      description: "Optimizing lighting, background, and professional appeal...",
      duration: 1500
    },
    { 
      icon: Zap, 
      title: "Applying AI Magic", 
      description: "Fine-tuning details for maximum impact...",
      duration: 1500
    },
    { 
      icon: CheckCircle, 
      title: "Finalizing Your Headshot", 
      description: "Almost ready! Preparing your professional transformation...",
      duration: 1000
    }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;
    
    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);
      
      // Update current step based on progress
      let cumulativeDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        cumulativeDuration += steps[i].duration;
        if (elapsed < cumulativeDuration) {
          setCurrentStep(i);
          break;
        }
      }
      
      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                {React.createElement(steps[currentStep]?.icon || Camera, { 
                  className: "h-12 w-12 text-blue-600" 
                })}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Creating Your Perfect Headshot
            </h1>
            <p className="text-gray-600 text-lg">
              Our AI is working its magic on your photo...
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <Progress value={progress} className="h-3 mb-4" />
              <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div 
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                      isActive 
                        ? 'bg-blue-50 border-2 border-blue-200 transform scale-105' 
                        : isCompleted
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 border-2 border-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isActive 
                        ? 'bg-blue-600 text-white animate-pulse' 
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className={`font-semibold ${
                        isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Pro Tip</h3>
              <p className="text-blue-700 text-sm">
                While we're creating your headshot, studies show that professional photos 
                increase LinkedIn profile views by up to 300% and interview requests by 40%!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
