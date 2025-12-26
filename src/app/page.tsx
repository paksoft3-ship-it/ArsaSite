import HeroSection from '@/components/sections/HeroSection';
import FeaturedListings from '@/components/sections/FeaturedListings';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQPreview from '@/components/sections/FAQPreview';
import ContactCTA from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}
