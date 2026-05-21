import React from 'react';
import { FAQSection, HeroSection, ProcessSection, ServicesSection, StatsSection, TestimonialsSection, TrackingSection, WhyUsSection } from '../components/Sections';
import { SEO, seoHome } from '../components/SEO';
import { pageUrl } from '../utils/site';

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'EuroVize Ana Sayfa',
    url: pageUrl('/'),
    description: seoHome.description,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EuroVize',
    url: pageUrl('/'),
    logo: pageUrl('/og-image.svg'),
    email: 'info@eurovize.com',
    telephone: '+90 212 555 0123',
  },
];

const Home: React.FC = () => (
  <main id="main-content" itemScope itemType="https://schema.org/WebPage">
    <SEO {...seoHome} schema={homeSchema} />
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
