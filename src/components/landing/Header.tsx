
import React from 'react';
import { Camera, Shield, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">
              HeadshotAI Pro
            </span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>SSL-secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>No login</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>50,000+ users</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
