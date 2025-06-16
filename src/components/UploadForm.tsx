
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadFormProps {
  onSubmit: (data: any, photoUrl: string) => void;
  onBack: () => void;
}

const UploadForm = ({ onSubmit, onBack }: UploadFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    industry: '',
    linkedinUrl: ''
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const industries = [
    "Technology", "Finance", "Healthcare", "Marketing", "Sales", "Education", 
    "Consulting", "Legal", "Real Estate", "Manufacturing", "Retail", "Other"
  ];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setPhoto(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!photo) {
      toast({
        title: "Photo required",
        description: "Please upload your LinkedIn photo",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.jobTitle) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload delay
    setTimeout(() => {
      onSubmit(formData, photoPreview!);
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
              Let's Create Your Perfect Headshot
            </CardTitle>
            <p className="text-gray-600">
              Fill in your details and upload your current photo to get started
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4 text-sm text-green-600">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure Upload</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>100% Free</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label htmlFor="photo" className="text-base font-semibold">
                  Upload Your Current LinkedIn Photo *
                </Label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center hover:border-blue-300 transition-colors">
                  {photoPreview ? (
                    <div className="space-y-4">
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-blue-200"
                      />
                      <p className="text-sm text-gray-600">Looking good! Ready to enhance this photo?</p>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => document.getElementById('photo')?.click()}
                      >
                        Change Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-blue-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">Click to upload your photo</p>
                        <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                      </div>
                      <Button type="button" variant="outline">
                        Choose File
                      </Button>
                    </div>
                  )}
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Smith"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@company.com"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                    placeholder="Marketing Manager"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
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

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL (Optional)</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="h-12"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubmitting ? (
                  "Processing Your Photo..."
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Generate My AI Headshot
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive your AI-generated headshot via email. 
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
