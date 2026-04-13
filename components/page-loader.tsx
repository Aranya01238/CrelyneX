"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initializing");

  const steps = ["Initializing", "Loading assets", "Building interface", "Almost ready"];

  useEffect(() => {
    let step = 0;
    const totalDuration = 2200;
    const interval = 80;
    const totalSteps = totalDuration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const pct = Math.min(Math.round((current / totalSteps) * 100), 99);
      setProgress(pct);

      const stepIdx = Math.floor((pct / 100) * steps.length);
      setText(steps[Math.min(stepIdx, steps.length - 1)]);

      if (current >= totalSteps) {
        clearInterval(timer);
        setProgress(100);
        setText("Ready");
        setTimeout(() => setLoaded(true), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`page-loader${loaded ? " loaded" : ""}`}
      aria-hidden={loaded}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-950/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-purple-900/10 blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo */}
        <div
          className="relative flex items-center justify-center w-24 h-24 rounded-3xl border border-purple-500/20 bg-black/60 shadow-[0_0_60px_rgba(168,85,247,0.3)]"
          style={{ animation: "loader-logo 0.6s cubic-bezier(.22,1,.36,1) both" }}
        >
          {/* Spinning ring */}
          <div
            className="absolute inset-[-8px] rounded-[28px] border-2 border-transparent border-t-purple-600/80 animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
          <Image src="/logo.png" alt="CrelyneX" width={52} height={52} className="object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Brand name */}
        <div className="text-center" style={{ animation: "fadeInUp 0.6s 0.3s cubic-bezier(.22,1,.36,1) both" }}>
          <div className="text-3xl font-black tracking-widest text-gradient-plum mb-1">CrelyneX</div>
          <div className="text-xs tracking-[0.3em] text-zinc-500 uppercase font-medium">Innovation Hub</div>
        </div>

        {/* Progress bar */}
        <div
          className="w-64 space-y-3"
          style={{ animation: "fadeInUp 0.6s 0.5s cubic-bezier(.22,1,.36,1) both" }}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500 font-mono tracking-wide">{text}...</span>
            <span className="text-xs text-purple-500 font-mono font-bold">{progress}%</span>
          </div>
          <div className="h-0.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dots */}
        <div
          className="flex gap-2"
          style={{ animation: "fadeInUp 0.6s 0.7s cubic-bezier(.22,1,.36,1) both" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-purple-600"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
