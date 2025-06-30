
import React from 'react';
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResumeUploadSectionProps {
  resumeFile: File | null;
  onResumeFileChange: (file: File | null) => void;
  uploadingResume: boolean;
  onUploadingChange: (uploading: boolean) => void;
}

const ResumeUploadSection = ({
  resumeFile,
  onResumeFileChange,
  uploadingResume,
  onUploadingChange
}: ResumeUploadSectionProps) => {
  const { toast } = useToast();

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

    onUploadingChange(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      onResumeFileChange(file);
      
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
      onUploadingChange(false);
    }
  };

  return (
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
            {resumeFile ? 
              `Uploaded: ${resumeFile.name}` : 
              "Click to upload resume (PDF, DOC, DOCX - Max 5MB)"
            }
          </p>
        </label>
      </div>
    </div>
  );
};

export default ResumeUploadSection;
