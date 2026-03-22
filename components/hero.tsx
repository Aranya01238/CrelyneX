"use client";

import { Button } from "@/components/ui/button";
import ThreeHeroScene from "@/components/three-hero-scene";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Tracks the mouse for the interactive crimson grid reveal
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden bg-[#020202] pt-20 pb-10 sm:pt-24 sm:pb-14 min-h-screen flex items-center"
    >
      {/* Base Static Crimson Net Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#dc26260a_1px,transparent_1px),linear-gradient(to_bottom,#dc26260a_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Interactive Hover Crimson Net */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#dc2626_1px,transparent_1px),linear-gradient(to_bottom,#dc2626_1px,transparent_1px)] bg-size-[32px_32px] opacity-0 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          WebkitMaskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          maskImage: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      {/* Deep ambient red glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Column: Content */}
          <div className="order-1 w-full space-y-8 text-left lg:order-1 pointer-events-none">
            {/* Minimalist Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/3 px-4 py-1.5 text-xs font-medium tracking-wide text-gray-300 backdrop-blur-md pointer-events-auto shadow-[0_0_15px_rgba(220,38,38,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Interactive 3D Experience
            </div>

            {/* Typography */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-white drop-shadow-[0_2px_5px_rgba(220,38,38,0.3)]">
                  Innovate The
                </span>
                <br />
                {/* Fixed gradient and shadow to be sharp and premium */}
                <span className="bg-linear-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  World With CrelyneX
                </span>
              </h1>
              <p className="max-w-84 text-base leading-relaxed text-gray-400 sm:max-w-xl sm:text-lg font-light">
                Learn by building real IoT, web, and 3D-first products. Join
                live cohorts, ship practical projects, and grow with a community
                that actually creates.
              </p>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col justify-start gap-4 sm:flex-row pointer-events-auto">
              <Button
                asChild
                className="h-12 rounded-full bg-red-700 px-8 text-base font-semibold text-white transition-all hover:bg-red-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-500/50"
              >
                <Link href="/about">Start Learning</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid w-full grid-cols-3 gap-4 pt-6 sm:max-w-lg pointer-events-auto">
              {[
                { value: "500+", label: "Members" },
                { value: "15+", label: "Workshops" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/2 p-4 backdrop-blur-md transition-colors hover:bg-white/4"
                >
                  <div className="text-2xl font-bold text-red-500">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-400 font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Canvas Box */}
          <div className="order-2 w-full flex justify-center lg:justify-end">
            <div className="relative w-full overflow-hidden rounded-4xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(220,38,38,0.15)] transition-all duration-500 hover:border-red-500/30 sm:max-w-xl aspect-square lg:h-125">
              <div className="absolute inset-0 bg-linear-to-br from-red-900/10 via-transparent to-black pointer-events-none z-0" />

              {/* 3D Scene */}
              <div className="absolute inset-0 z-10">
                <ThreeHeroScene />
              </div>

              {/* Badges */}
              <div className="absolute left-6 top-6 z-20 hidden rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-bold tracking-widest text-gray-300 backdrop-blur-md sm:block">
                LIVE SCENE
              </div>
              <div className="absolute right-6 top-6 z-20 hidden rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-red-400 backdrop-blur-md sm:block">
                WebGL
              </div>

              {/* Bottom Footer Bar */}
              <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl supports-backdrop-filter:bg-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      CrelyneX
                    </div>
                    <div className="text-base font-semibold text-white sm:text-lg">
                      Innovation Hub
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
