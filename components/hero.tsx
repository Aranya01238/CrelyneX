"use client";

import { Button } from "@/components/ui/button";
import ThreeHeroScene from "@/components/three-hero-scene";
import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Members" },
  { value: 15, suffix: "+", label: "Workshops" },
  { value: 24, suffix: "/7", label: "Support" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

const floatingBadges = [
  { label: "IoT", delay: "0s", pos: "top-[15%] right-[8%]" },
  { label: "WebGL", delay: "1.2s", pos: "top-[35%] left-[5%]" },
  { label: "3D First", delay: "0.6s", pos: "bottom-[25%] right-[6%]" },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden min-h-screen flex items-center bg-[#060606] pt-20"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 z-0">
        {/* Static crimson grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dc26260a_1px,transparent_1px),linear-gradient(to_bottom,#dc26260a_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_50%,transparent_100%)]" />
        {/* Interactive hover grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#dc2626_1px,transparent_1px),linear-gradient(to_bottom,#dc2626_1px,transparent_1px)] bg-[size:36px_36px] opacity-0 transition-opacity duration-700 group-hover:opacity-50"
          style={{
            WebkitMaskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
        {/* Ambient glows */}
        <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-red-950/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-950/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating badges */}
      {floatingBadges.map((badge) => (
        <div
          key={badge.label}
          className={`absolute ${badge.pos} z-20 hidden xl:block`}
          style={{ animation: `float 5s ease-in-out ${badge.delay} infinite` }}
        >
          <div className="glass-red rounded-full px-4 py-2 text-xs font-bold tracking-widest text-red-400 uppercase shadow-[0_0_20px_rgba(220,38,38,0.1)]">
            {badge.label}
          </div>
        </div>
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 w-full py-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:gap-20 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left — Content */}
          <div className="space-y-10">

            {/* Live badge */}
            <div
              className="inline-flex items-center gap-2.5 glass-red rounded-full px-5 py-2 text-xs font-semibold tracking-wide text-zinc-300 shadow-[0_0_20px_rgba(220,38,38,0.08)]"
              style={{ animation: mounted ? "fadeInDown 0.6s 0.1s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              Interactive 3D · Live Experience
            </div>

            {/* Headline */}
            <div
              className="space-y-4"
              style={{ animation: mounted ? "fadeInUp 0.7s 0.2s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="text-white">Innovate</span>
                <br />
                <span className="text-white">The World</span>
                <br />
                <span className="text-gradient-crimson">with CrelyneX</span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg font-normal">
                Learn by building real IoT, web, and 3D‑first products. Join live cohorts, ship practical projects, and grow with a community that actually creates.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
              style={{ animation: mounted ? "fadeInUp 0.7s 0.35s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <Button
                asChild
                className="h-13 rounded-full bg-red-700 hover:bg-red-600 hover:scale-105 hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] px-8 text-sm font-bold tracking-wide border border-red-500/40 transition-all duration-300"
              >
                <Link href="/about">Start Learning →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-full border-white/10 bg-white/3 hover:bg-white/8 hover:border-red-500/30 px-8 text-sm font-bold tracking-wide text-zinc-300 transition-all duration-300 backdrop-blur-md"
              >
                <Link href="/events-courses">View Events</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-3 max-w-sm"
              style={{ animation: mounted ? "fadeInUp 0.7s 0.5s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-4 text-center hover:glass-red transition-all duration-300 group/stat"
                >
                  <div className="text-2xl font-black text-red-500 group-hover/stat:text-glow-red transition-all">
                    {mounted ? <CountUp target={stat.value} suffix={stat.suffix} /> : `${stat.value}${stat.suffix}`}
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Scene */}
          <div
            className="w-full flex justify-center lg:justify-end"
            style={{ animation: mounted ? "scaleIn 0.8s 0.3s cubic-bezier(.22,1,.36,1) both" : "none" }}
          >
            <div className="relative w-full max-w-xl">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-[36px] bg-red-600/10 blur-2xl animate-pulse-glow" />
              {/* Scene container */}
              <div className="relative overflow-hidden rounded-[32px] border border-white/8 glass aspect-square lg:aspect-auto lg:h-[520px] shadow-[0_0_60px_rgba(0,0,0,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/8 via-transparent to-black/40 pointer-events-none z-0" />
                <div className="absolute inset-0 z-10">
                  <ThreeHeroScene />
                </div>

                {/* Top badges */}
                <div className="absolute left-5 top-5 z-20 hidden sm:block">
                  <div className="glass rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest text-zinc-300">LIVE SCENE</div>
                </div>
                <div className="absolute right-5 top-5 z-20 hidden sm:block">
                  <div className="glass-red rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest text-red-400">WebGL</div>
                </div>

                {/* Bottom info bar */}
                <div className="absolute inset-x-4 bottom-4 z-20">
                  <div className="glass-strong rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">CrelyneX</div>
                        <div className="text-base font-bold text-white">Innovation Hub</div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full glass-red">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060606] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
