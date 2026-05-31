'use client';

import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
