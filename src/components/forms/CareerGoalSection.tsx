
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CareerGoalSectionProps {
  linkedinUrl: string;
  careerGoal: string;
  targetRole: string;
  onLinkedinUrlChange: (value: string) => void;
  onCareerGoalChange: (value: string) => void;
  onTargetRoleChange: (value: string) => void;
}

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

const CareerGoalSection = ({
  linkedinUrl,
  careerGoal,
  targetRole,
  onLinkedinUrlChange,
  onCareerGoalChange,
  onTargetRoleChange
}: CareerGoalSectionProps) => {
  return (
    <>
      {/* LinkedIn URL */}
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl" className="text-base font-semibold text-blue-600">
          🟦 LinkedIn URL *
        </Label>
        <Input
          id="linkedinUrl"
          value={linkedinUrl}
          onChange={(e) => onLinkedinUrlChange(e.target.value)}
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
        <Select onValueChange={onCareerGoalChange} required>
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
          value={targetRole}
          onChange={(e) => onTargetRoleChange(e.target.value)}
          placeholder="Senior Marketing Manager, Product Director, etc."
          className="h-12"
          required
        />
      </div>
    </>
  );
};

export default CareerGoalSection;
