import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, TrendingUp } from "lucide-react";

interface ScoreBreakdown {
  headline: number;
  about: number;
  experience: number;
  skills: number;
  photo: number;
}

interface ScorecardProps {
  linkedinUrl: string;
  onGetMakeover: () => void;
}

const LinkedInScorecard = ({ linkedinUrl, onGetMakeover }: ScorecardProps) => {
  const [scores, setScores] = useState<ScoreBreakdown | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  // Mock scoring logic - in a real app, this would analyze the actual LinkedIn profile
  const analyzeProfile = (url: string): ScoreBreakdown => {
    // Simple rule-based scoring for demo purposes
    const baseScores = {
      headline: Math.floor(Math.random() * 8) + 8, // 8-16 out of 20
      about: Math.floor(Math.random() * 10) + 6, // 6-16 out of 20
      experience: Math.floor(Math.random() * 12) + 8, // 8-20 out of 20
      skills: Math.floor(Math.random() * 8) + 10, // 10-18 out of 20
      photo: Math.floor(Math.random() * 10) + 8, // 8-18 out of 20
    };

    // Ensure total is realistic (typically 40-80)
    const total = Object.values(baseScores).reduce((sum, score) => sum + score, 0);
    if (total > 75) {
      // Reduce some scores to keep it realistic
      baseScores.headline = Math.max(6, baseScores.headline - 4);
      baseScores.about = Math.max(4, baseScores.about - 3);
    }

    return baseScores;
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (percentage >= 60) return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getScoreLabel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "Strong";
    if (percentage >= 60) return "Fair";
    return "Needs Work";
  };

  const getFeedback = (category: string, score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    
    const feedbackMap: Record<string, Record<string, string>> = {
      headline: {
        high: "Your headline effectively showcases your value proposition.",
        medium: "Your headline could be more compelling and keyword-rich.",
        low: "Your headline needs to better highlight your unique value and skills."
      },
      about: {
        high: "Your about section tells a compelling professional story.",
        medium: "Your about section could be more engaging and results-focused.",
        low: "Your about section needs more personality and specific achievements."
      },
      experience: {
        high: "Your experience section demonstrates clear career progression.",
        medium: "Your experience could highlight more specific accomplishments.",
        low: "Your experience section needs more detail and quantified results."
      },
      skills: {
        high: "You have a well-rounded skills section with relevant expertise.",
        medium: "Consider adding more industry-specific skills and endorsements.",
        low: "Your skills section needs expansion with relevant keywords."
      },
      photo: {
        high: "You have a professional, engaging profile photo.",
        medium: "Your photo could be more professional or higher quality.",
        low: "Consider updating to a more professional headshot."
      }
    };

    if (percentage >= 80) return feedbackMap[category].high;
    if (percentage >= 60) return feedbackMap[category].medium;
    return feedbackMap[category].low;
  };

  useEffect(() => {
    // Simulate analysis time
    const timer = setTimeout(() => {
      const breakdown = analyzeProfile(linkedinUrl);
      setScores(breakdown);
      const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
      setTotalScore(total);
      setIsAnalyzing(false);

      // Show CTA after a delay
      setTimeout(() => {
        setShowCTA(true);
      }, 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [linkedinUrl]);

  if (isAnalyzing) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Analyzing Your LinkedIn Profile...</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <p className="text-gray-600 mt-4">This will take just a moment...</p>
        </CardContent>
      </Card>
    );
  }

  if (!scores) return null;

  const totalPercentage = (totalScore / 100) * 100;

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {/* Overall Score */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl mb-4">Your LinkedIn Score</CardTitle>
          <div className="space-y-4">
            <div className="text-6xl font-bold text-blue-600">{totalScore}/100</div>
            <Progress value={totalPercentage} className="h-4 max-w-md mx-auto" />
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-medium">
                {totalPercentage >= 80 ? "Excellent" : 
                 totalPercentage >= 60 ? "Good" : 
                 totalPercentage >= 40 ? "Fair" : "Needs Improvement"}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(scores).map(([category, score]) => {
            const maxScore = 20;
            const percentage = (score / maxScore) * 100;
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getScoreIcon(score, maxScore)}
                    <span className="font-semibold text-lg">{categoryName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${getScoreColor(score, maxScore)}`}>
                      {score}/{maxScore}
                    </span>
                    <Badge variant="outline" className={getScoreColor(score, maxScore)}>
                      {getScoreLabel(score, maxScore)}
                    </Badge>
                  </div>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-gray-600 text-sm">
                  {getFeedback(category, score, maxScore)}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* CTA Section */}
      {showCTA && (
        <Card className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 animate-fade-in">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Want us to fix this for you?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Get your full LinkedIn profile professionally rewritten and optimized for just $49
            </p>
            <Button 
              onClick={onGetMakeover}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              → Get My LinkedIn Makeover
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Delivered in 48 hours • Money-back guarantee
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LinkedInScorecard;
