
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I finally felt proud of my profile. Got 3 recruiter DMs within a week — worth way more than $49.",
      name: "Sarah J.",
      role: "Marketing Manager",
      rating: 4
    },
    {
      quote: "The headshot was great, but the full LinkedIn upgrade is what helped me land two interviews. It felt like a personal rebrand.",
      name: "Michael G.",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "These profiles stand out immediately — better than most of what I see in applicant tracking systems.",
      name: "Emily R.",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "Open to Work? Your new profile will have recruiters flooding your inbox.",
      name: "LinkedIn",
      role: "Open to Work",
      rating: 5,
      isLinkedIn: true
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">What Professionals Are Saying</h2>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white border-0 shadow-lg h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic flex-1">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      {testimonial.isLinkedIn ? (
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">in</span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
