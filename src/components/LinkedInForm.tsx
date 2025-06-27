
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LinkedInFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const LinkedInForm = ({ onSubmit, onBack }: LinkedInFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    jobTitle: '',
    careerGoal: '',
    industry: '',
    topSkills: [] as string[],
    targetRole: '',
    notes: '',
    resumeFile: null as File | null
  });
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
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
    "Other"
  ];

  const addSkill = () => {
    if (skillInput.trim() && formData.topSkills.length < 5) {
      setFormData(prev => ({
        ...prev,
        topSkills: [...prev.topSkills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      topSkills: prev.topSkills.filter((_, i) => i !== index)
    }));
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploadingResume(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      setFormData(prev => ({ ...prev, resumeFile: file }));
      
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully"
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.linkedinUrl || 
        !formData.careerGoal || !formData.targetRole) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // LinkedIn URL validation
    if (!formData.linkedinUrl.includes('linkedin.com/in/')) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let resumeUrl = null;
      if (formData.resumeFile) {
        const fileExt = formData.resumeFile.name.split('.').pop();
        const fileName = `${user?.id || 'guest'}/${Date.now()}.${fileExt}`;
        
        const { data } = await supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        resumeUrl = data.publicUrl;
      }

      const submissionData = {
        ...formData,
        resumeUrl
      };

      // Call payment creation function
      const { data, error } = await supabase.functions.invoke('create-linkedin-payment', {
        body: {
          submissionData,
          userEmail: formData.email,
          userId: user?.id || null
        }
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
      
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-6">
      <div className="container mx-auto max-w-3xl">
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
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base font-semibold">
                    👤 Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="John Smith"
                    className="h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold text-orange-600">
                    📧 Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com"
                    className="h-12"
                    required
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
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
                  required
                />
              </div>

              {/* Career Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-base font-semibold text-yellow-600">
                    🟨 Current Job Title (Optional)
                  </Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="Marketing Manager"
                    className="h-12"
                  />
                </div>

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
              </div>

              {/* Career Goal */}
              <div className="space-y-2">
                <Label htmlFor="careerGoal" className="text-base font-semibold text-purple-600">
                  🟪 Career Goal *
                </Label>
                <Select onValueChange={(value) => setFormData({...formData, careerGoal: value})} required>
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
              </div>

              {/* Target Role */}
              <div className="space-y-2">
                <Label htmlFor="targetRole" className="text-base font-semibold">
                  🎯 What role are you targeting? *
                </Label>
                <Input
                  id="targetRole"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  placeholder="Senior Marketing Manager, Product Director, etc."
                  className="h-12"
                  required
                />
              </div>

              {/* Top Skills */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  🛠️ Top Skills (Optional, max 5)
                </Label>
                <div className="flex space-x-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    className="h-12"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button 
                    type="button" 
                    onClick={addSkill}
                    disabled={formData.topSkills.length >= 5}
                    className="h-12"
                  >
                    Add
                  </Button>
                </div>
                {formData.topSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.topSkills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-semibold">
                  📝 Additional Notes or Context (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Any specific achievements, goals, or context you'd like us to know..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  📄 Upload Resume (Optional - PDF/Word)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.resumeFile ? 
                        `Uploaded: ${formData.resumeFile.name}` : 
                        "Click to upload resume (PDF, DOC, DOCX - Max 5MB)"
                      }
                    </p>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || uploadingResume}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? "Processing..." : "Continue to Payment ($49)"}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Secure payment processed by Stripe. You'll receive your optimized profile within 48 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkedInForm;
