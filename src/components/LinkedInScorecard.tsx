
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, User, FileText, Briefcase, Award, Camera } from "lucide-react";

interface LinkedInScorecardProps {
  linkedinUrl: string;
  onGetMakeover: () => void;
}

interface ScoreSection {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
  icon: React.ReactNode;
}

const LinkedInScorecard = ({ linkedinUrl, onGetMakeover }: LinkedInScorecardProps) => {
  const [showCTA, setShowCTA] = useState(false);

  // Mock scoring logic - in reality, this would analyze the LinkedIn profile
  const calculateScore = (url: string): ScoreSection[] => {
    // Simple mock scoring based on URL length and common patterns
    const hasNumbers = /\d/.test(url);
    const hasHyphens = url.includes('-');
    const urlLength = url.length;
    
    return [
      {
        name: "Headline",
        score: hasNumbers ? 18 : 12,
        maxScore: 20,
        feedback: hasNumbers ? "Good use of specific metrics" : "Add specific role or achievements",
        icon: <User className="h-4 w-4" />
      },
      {
        name: "About Section",
        score: urlLength > 50 ? 16 : 10,
        maxScore: 20,
        feedback: urlLength > 50 ? "Well-detailed profile" : "Expand your story and value proposition",
        icon: <FileText className="h-4 w-4" />
      },
      {
        name: "Experience",
        score: hasHyphens ? 15 : 8,
        maxScore: 20,
        feedback: hasHyphens ? "Good job structure" : "Add more detailed work experience",
        icon: <Briefcase className="h-4 w-4" />
      },
      {
        name: "Skills",
        score: 14,
        maxScore: 20,
        feedback: "Add more relevant skills and get endorsements",
        icon: <Award className="h-4 w-4" />
      },
      {
        name: "Profile Photo",
        score: 11,
        maxScore: 20,
        feedback: "Use a professional headshot with better lighting",
        icon: <Camera className="h-4 w-4" />
      }
    ];
  };

  const sections = calculateScore(linkedinUrl);
  const totalScore = sections.reduce((sum, section) => sum + section.score, 0);
  const maxTotalScore = sections.reduce((sum, section) => sum + section.maxScore, 0);
  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number, maxScore: number) => {
    const percent = (score / maxScore) * 100;
    if (percent >= 80) return "text-green-600";
    if (percent >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percent = (score / maxScore) * 100;
    if (percent >= 80) return "Excellent";
    if (percent >= 60) return "Good";
    if (percent >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your LinkedIn Scorecard</h2>
        <p className="text-gray-600">Here's how your profile measures up</p>
      </div>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-50 rounded-full mb-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{percentage}</div>
            <div className="text-sm text-gray-600">out of 100</div>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <span className="text-lg font-semibold text-gray-900">
            {percentage >= 80 ? "Strong Profile" : percentage >= 60 ? "Good Foundation" : "Needs Improvement"}
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          You're in the {percentage >= 80 ? "top 20%" : percentage >= 60 ? "top 40%" : "bottom 60%"} of LinkedIn profiles
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Score Breakdown</h3>
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {section.icon}
                <span className="font-medium text-gray-900">{section.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${getScoreColor(section.score, section.maxScore)}`}>
                  {section.score}/{section.maxScore}
                </span>
                <Badge variant="outline" className={getScoreColor(section.score, section.maxScore)}>
                  {getScoreLabel(section.score, section.maxScore)}
                </Badge>
              </div>
            </div>
            <Progress value={(section.score / section.maxScore) * 100} className="mb-2" />
            <p className="text-sm text-gray-600">{section.feedback}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      {showCTA && (
        <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ready to Boost Your Score?
          </h3>
          <p className="text-gray-600 mb-6">
            Get a professional LinkedIn makeover that will help you stand out to recruiters and land better opportunities.
          </p>
          <Button 
            onClick={onGetMakeover}
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Get My LinkedIn Makeover - $49
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            ✓ Professional rewrite delivered in 48 hours
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkedInScorecard;
