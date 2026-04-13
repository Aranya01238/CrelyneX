"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
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
        {/* Static purple grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#a855f70a_1px,transparent_1px),linear-gradient(to_bottom,#a855f70a_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_50%,transparent_100%)]" />
        {/* Interactive hover grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:36px_36px] opacity-0 transition-opacity duration-700 group-hover:opacity-50"
          style={{
            WebkitMaskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            maskImage: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
        {/* Ambient glows */}
        <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-purple-950/25 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-950/10 rounded-full blur-[120px]" />
      </div>

      {/* Floating badges */}
      {floatingBadges.map((badge) => (
        <div
          key={badge.label}
          className={`absolute ${badge.pos} z-20 hidden xl:block`}
          style={{ animation: `float 5s ease-in-out ${badge.delay} infinite` }}
        >
          <div className="border border-purple-500/20 bg-purple-500/5 backdrop-blur-md rounded-full px-4 py-2 text-[10px] font-black tracking-widest text-purple-400 uppercase shadow-[0_0_20px_rgba(168,85,247,0.1)]">
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
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-purple-400 uppercase shadow-[0_0_20px_rgba(168,85,247,0.1)]"
              style={{ animation: mounted ? "fadeInDown 0.6s 0.1s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <span className="text-purple-500">✦</span>
              Future of Innovation
            </div>

            {/* Headline */}
            <div
              className="space-y-2"
              style={{ animation: mounted ? "fadeInUp 0.7s 0.2s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <h1 className="text-6xl font-black leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl lg:text-[100px] uppercase italic">
                <span className="text-white">Innovate</span>
                <br />
                <span className="text-purple-500 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">The World</span>
                <br />
                <span className="text-zinc-400">with Crelynex</span>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base font-medium mt-6">
                Learn by building real IoT, web, and 3D‑first products. Join live cohorts, ship practical projects, and grow with a community that actually creates.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 pt-4"
              style={{ animation: mounted ? "fadeInUp 0.7s 0.35s cubic-bezier(.22,1,.36,1) both" : "none" }}
            >
              <Button
                asChild
                className="h-14 px-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-sm font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <Link href="/about">Start Learning →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 px-10 rounded-full border-zinc-800 bg-transparent hover:bg-zinc-900 text-sm font-black uppercase tracking-widest text-zinc-300 transition-all duration-300"
              >
                <Link href="/events-courses">Our Story</Link>
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
                  <div className="text-2xl font-black text-purple-500 group-hover/stat:text-glow-purple transition-all">
                    {mounted ? <CountUp target={stat.value} suffix={stat.suffix} /> : `${stat.value}${stat.suffix}`}
                  </div>
                  <div className="mt-1 text-[10px] text-zinc-500 font-medium tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual Hero Image */}
          <div
            className="w-full flex flex-col items-center lg:items-end justify-center pt-10 lg:pt-0"
            style={{ animation: mounted ? "scaleIn 0.8s 0.3s cubic-bezier(.22,1,.36,1) both" : "none" }}
          >
            <div className="relative group/hero-img flex flex-col items-center">
              {/* Massive Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
              
              {/* The Logo Graphic */}
              <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-transform duration-700 group-hover/hero-img:scale-105 group-hover/hero-img:rotate-12"
                   style={{ animation: "float 6s ease-in-out infinite" }}>
                <Image
                  src="/logo.png"
                  alt="CrelyneX Core"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Branding Text — Matches 'AI ZENERA' style */}
              <div className="mt-8 relative pt-4">
                <div className="absolute -inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <h2 className="text-5xl md:text-7xl font-black tracking-widest text-transparent uppercase italic">
                  <span className="bg-gradient-to-b from-white via-zinc-400 to-zinc-600 bg-clip-text drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    Crelynex
                  </span>
                </h2>
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
