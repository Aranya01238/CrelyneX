"use client";

import { Button } from "@/components/ui/button";
import ThreeHeroScene from "@/components/three-hero-scene";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-10 sm:pt-24 sm:pb-14">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,oklch(0.62_0.22_185_/_0.24),transparent_36%),radial-gradient(circle_at_82%_18%,oklch(0.55_0.25_310_/_0.2),transparent_35%),linear-gradient(to_bottom_right,oklch(0.14_0.03_280),oklch(0.12_0.01_280))]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-6 sm:gap-10 lg:min-h-[calc(100vh-110px)] lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="order-1 w-full space-y-5 text-left sm:space-y-8 lg:order-1 lg:px-0">
            <div className="hidden max-w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-accent sm:inline-flex">
              INTERACTIVE 3D EXPERIENCE
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-[10.5ch] text-[2.1rem] font-black leading-[0.92] tracking-tight [text-wrap:balance] sm:max-w-none sm:text-5xl md:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
                  Innovate The
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent">
                  World With CrelyneX
                </span>
              </h1>
              <p className="max-w-[21rem] text-base leading-8 text-muted-foreground sm:max-w-xl sm:text-lg lg:max-w-xl">
                Learn by building real IoT, web, and 3D-first products. Join
                live cohorts, ship practical projects, and grow with a community
                that actually creates.
              </p>
            </div>

            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="min-h-12 w-full rounded-2xl bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg shadow-accent/30 hover:bg-accent/90 sm:min-h-0 sm:w-auto sm:max-w-none sm:px-8"
              >
                <Link href="/about">Start Learning</Link>
              </Button>
            </div>

            <div className="grid w-full grid-cols-2 gap-2 sm:max-w-lg sm:grid-cols-3 sm:gap-3 lg:max-w-xl">
              <div className="rounded-2xl border border-border/50 bg-card/50 p-2.5 backdrop-blur sm:p-4">
                <div className="text-lg font-black text-accent sm:text-2xl">
                  500+
                </div>
                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Members
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/50 p-2.5 backdrop-blur sm:p-4">
                <div className="text-lg font-black text-secondary sm:text-2xl">
                  15+
                </div>
                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Live Workshops
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border border-border/50 bg-card/50 p-2.5 backdrop-blur sm:col-span-1 sm:p-4">
                <div className="text-lg font-black text-primary sm:text-2xl">
                  24/7
                </div>
                <div className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* 3D Brand Scene */}
          <div className="order-2 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative h-[136px] w-full max-w-xl overflow-hidden rounded-[1.75rem] border border-border/60 bg-gradient-to-br from-card/80 to-card/40 shadow-[0_20px_80px_-35px_oklch(0.62_0.22_185)] sm:h-[260px] sm:max-w-2xl lg:h-[380px]">
              <ThreeHeroScene />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.62_0.22_185_/_0.2),transparent_45%),radial-gradient(circle_at_80%_20%,oklch(0.55_0.25_310_/_0.22),transparent_40%)]" />
              <div className="absolute left-4 top-4 hidden rounded-xl border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-muted-foreground backdrop-blur sm:block">
                LIVE 3D SCENE
              </div>
              <div className="absolute right-4 top-4 hidden rounded-xl border border-accent/50 bg-accent/20 px-3 py-1 text-xs font-semibold text-accent backdrop-blur sm:block">
                WebGL
              </div>
              <div className="absolute inset-x-2 bottom-2 rounded-2xl border border-border/70 bg-background/78 p-2.5 backdrop-blur sm:left-4 sm:right-4 sm:bottom-4 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                      CrelyneX
                    </div>
                    <div className="text-sm font-black bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent sm:text-xl">
                      Innovation Hub
                    </div>
                  </div>
                  <div className="h-7 w-7 rounded-xl border border-accent/50 bg-accent/20 sm:h-10 sm:w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
