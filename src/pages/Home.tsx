import React from 'react';
import { SEO, seoHome } from '../components/SEO';
import { HeroSection, ServicesSection, StatsSection, WhyUsSection, TestimonialsSection, ProcessSection, TrackingSection, FAQSection } from '../components/Sections';

const Home: React.FC = () => (
  <main id="main-content" itemScope itemType="https://schema.org/WebPage">
    <SEO {...seoHome} />
    <HeroSection />
    <ServicesSection />
    <ProcessSection />
    <StatsSection />
    <WhyUsSection />
    <TestimonialsSection />
    <TrackingSection />
    <FAQSection />
  </main>
);

export default Home;
