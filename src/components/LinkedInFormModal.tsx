
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PersonalInfoSection from "@/components/forms/PersonalInfoSection";
import CareerGoalSection from "@/components/forms/CareerGoalSection";
import ResumeUploadSection from "@/components/forms/ResumeUploadSection";

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
          <PersonalInfoSection
            fullName={formData.fullName}
            email={formData.email}
            onFullNameChange={(value) => setFormData({...formData, fullName: value})}
            onEmailChange={(value) => setFormData({...formData, email: value})}
          />

          <CareerGoalSection
            linkedinUrl={formData.linkedinUrl}
            careerGoal={formData.careerGoal}
            targetRole={formData.targetRole}
            onLinkedinUrlChange={(value) => setFormData({...formData, linkedinUrl: value})}
            onCareerGoalChange={(value) => setFormData({...formData, careerGoal: value})}
            onTargetRoleChange={(value) => setFormData({...formData, targetRole: value})}
          />

          <ResumeUploadSection
            resumeFile={formData.resumeFile}
            onResumeFileChange={(file) => setFormData({...formData, resumeFile: file})}
            uploadingResume={uploadingResume}
            onUploadingChange={setUploadingResume}
          />

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
