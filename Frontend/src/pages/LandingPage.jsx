import React from 'react';
import HeroSection from '../components/LandingPage/HeroSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import HowItWorksSection from '../components/LandingPage/HowItWorksSection';
import TestimonialsSection from '../components/LandingPage/TestimonialsSection';
import FAQSection from '../components/LandingPage/FAQSection';
import CTASection from '../components/LandingPage/CTASection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;