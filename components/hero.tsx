"use client";

import { Button } from "@/components/ui/button";
import ThreeHeroScene from "@/components/three-hero-scene";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24 pb-14">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,oklch(0.62_0.22_185_/_0.24),transparent_36%),radial-gradient(circle_at_82%_18%,oklch(0.55_0.25_310_/_0.2),transparent_35%),linear-gradient(to_bottom_right,oklch(0.14_0.03_280),oklch(0.12_0.01_280))]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid min-h-[calc(100vh-110px)] items-center gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-accent">
              INTERACTIVE 3D EXPERIENCE
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
                  Innovate The
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                  World With CrelyneX
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0 lg:max-w-xl">
                Learn by building real IoT, web, and 3D-first products. Join
                live cohorts, ship practical projects, and grow with a community
                that actually creates.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 hover:bg-accent/90"
              >
                <Link href="/about">Start Learning</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:max-w-lg sm:grid-cols-3 lg:max-w-xl">
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur">
                <div className="text-2xl font-black text-accent">500+</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Members
                </div>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur">
                <div className="text-2xl font-black text-secondary">15+</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Live Workshops
                </div>
              </div>
              <div className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur">
                <div className="text-2xl font-black text-primary">24/7</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* 3D Brand Scene */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[260px] w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-card/80 to-card/40 shadow-[0_20px_80px_-35px_oklch(0.62_0.22_185)] sm:h-[320px] lg:h-[380px]">
              <ThreeHeroScene />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.62_0.22_185_/_0.2),transparent_45%),radial-gradient(circle_at_80%_20%,oklch(0.55_0.25_310_/_0.22),transparent_40%)]" />
              <div className="absolute left-4 top-4 rounded-xl border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur">
                LIVE 3D SCENE
              </div>
              <div className="absolute right-4 top-4 rounded-xl border border-accent/50 bg-accent/20 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
                WebGL
              </div>
              <div className="absolute left-3 right-3 bottom-3 rounded-2xl border border-border/70 bg-background/70 p-3 backdrop-blur sm:left-4 sm:right-4 sm:bottom-4 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      CrelyneX
                    </div>
                    <div className="text-lg font-black bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent sm:text-xl">
                      Innovation Hub
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-xl border border-accent/50 bg-accent/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
