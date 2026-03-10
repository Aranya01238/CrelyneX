'use client';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20 pb-12">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Logo Animation */}
          <div className="flex justify-center">
            <div className="relative h-24 w-24 rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group hover:border-accent transition-all duration-300">
              <span className="text-5xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-accent transition-all">
                𝞓
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
                Innovating Tomorrow
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                with CrelyneX
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community for IoT projects, web development, events & courses. Where innovation meets technology.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent/50 text-accent hover:bg-accent/10 font-bold text-base px-8"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-12 max-w-md mx-auto">
            <div className="p-4 rounded-lg bg-card/50 border border-border/40 backdrop-blur">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-xs text-muted-foreground mt-1">Community Members</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/40 backdrop-blur">
              <div className="text-2xl font-bold text-secondary">4</div>
              <div className="text-xs text-muted-foreground mt-1">Core Services</div>
            </div>
            <div className="p-4 rounded-lg bg-card/50 border border-border/40 backdrop-blur">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs text-muted-foreground mt-1">Active Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
