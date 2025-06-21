
import React from 'react';
import { Camera } from "lucide-react";

const Footer = () => {
  return (
    <>
      {/* How Does It Work Footer */}
      <section className="py-8 bg-gray-900 text-white border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold">How Does It Work?</h3>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Camera className="h-6 w-6" />
            <span className="text-xl font-bold">HeadshotAI Pro</span>
          </div>
          <p className="text-gray-400 mb-4">Professional headshots for career success</p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
