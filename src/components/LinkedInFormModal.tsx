
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LinkedInFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const LinkedInFormModal = ({ isOpen, onClose, onSubmit }: LinkedInFormModalProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedinUrl: '',
    careerGoal: '',
    targetRole: '',
    resumeFile: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const { toast } = useToast();

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Let's Fix Your LinkedIn Profile in 48 Hours
          </DialogTitle>
        </DialogHeader>
        
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
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInFormModal;
