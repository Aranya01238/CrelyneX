'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import CTA from '@/components/cta';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
}
