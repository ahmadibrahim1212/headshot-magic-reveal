
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoSectionProps {
  fullName: string;
  email: string;
  onFullNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const PersonalInfoSection = ({ 
  fullName, 
  email, 
  onFullNameChange, 
  onEmailChange 
}: PersonalInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base font-semibold">
          👤 Full Name *
        </Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
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
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="john@company.com"
          className="h-12"
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
