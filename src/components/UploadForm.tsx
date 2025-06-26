
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFormProps {
  onSubmit: (data: any, photoUrl: string) => void;
  onBack: () => void;
}

const UploadForm = ({ onSubmit, onBack }: UploadFormProps) => {
  const [formData, setFormData] = useState({
    linkedinUrl: '',
    careerGoal: '',
    jobTitle: '',
    industry: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const industries = [
    "Technology", "Finance", "Healthcare", "Marketing", "Sales", "Education", 
    "Consulting", "Legal", "Real Estate", "Manufacturing", "Retail", "Other"
  ];

  const careerGoalOptions = [
    "Get more recruiter messages",
    "Land a promotion at my current company",
    "Switch to a new industry",
    "Find a remote job",
    "Increase my salary by 20%+",
    "Build my personal brand",
    "Network with industry leaders",
    "Other (please specify below)"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.linkedinUrl || !formData.careerGoal || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Basic LinkedIn URL validation
    if (!formData.linkedinUrl.includes('linkedin.com/in/')) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(formData, '');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-6">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold mb-2">
              Let's Fix Your LinkedIn Profile in 48 Hours
            </CardTitle>
            <p className="text-gray-600">
              Drop your details so we can upgrade your LinkedIn to attract better jobs — fast.
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4 text-sm text-green-600">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>48-Hour Delivery</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* LinkedIn URL - Required */}
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl" className="text-base font-semibold text-blue-600">
                  🟦 LinkedIn URL *
                </Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="h-12"
                />
              </div>

              {/* Career Goal - Required */}
              <div className="space-y-2">
                <Label htmlFor="careerGoal" className="text-base font-semibold text-purple-600">
                  🟪 Career Goal *
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, careerGoal: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="What's your main career goal?" />
                  </SelectTrigger>
                  <SelectContent>
                    {careerGoalOptions.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.careerGoal === "Other (please specify below)" && (
                  <Textarea
                    placeholder="Tell us about your specific career goal..."
                    value={formData.careerGoal}
                    onChange={(e) => setFormData({...formData, careerGoal: e.target.value})}
                    className="mt-2"
                  />
                )}
              </div>

              {/* Current Job Title - Optional */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-base font-semibold text-yellow-600">
                  🟨 Current Job Title (Optional)
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  placeholder="Marketing Manager, Software Engineer, etc."
                  className="h-12"
                />
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-base font-semibold text-green-600">
                  🟩 Industry
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, industry: value})}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Email - Required */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-orange-600">
                  🟧 Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@company.com"
                  className="h-12"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  "Processing Your Request..."
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-5 w-5" />
                    → Get My LinkedIn Fix
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive your LinkedIn profile analysis via email. 
                We respect your privacy and won't spam you.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadForm;
