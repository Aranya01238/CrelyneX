"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const features = [
  "Access to exclusive IoT projects",
  "Learn from industry experts",
  "Network with 500+ tech professionals",
  "24/7 community support",
  "Early access to courses and events",
];

const stats = [
  { value: "500+", label: "Active Members", color: "text-red-500" },
  { value: "4", label: "Service Tracks", color: "text-purple-500" },
  { value: "∞", label: "Growth Potential", color: "text-emerald-500" },
];

export default function CTA() {
  return (
    <section
      id="community"
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-950/5 blur-[160px] rounded-full" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/5 blur-[120px] rounded-full" />
        
        {/* Particle/Dot background */}
        <div className="absolute inset-0 opacity-[0.15]" 
             style={{ backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Content Side */}
          <div className="space-y-10 reveal-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-red-400 uppercase">
                <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" /> Community
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                <span className="text-white">Join the </span>
                <span className="text-gradient-red">CrelyneX </span>
                <span className="text-white">Ecosystem</span>
              </h2>
              <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-light">
                Be part of an innovative community transforming the tech landscape. Connect with fellow developers, IoT enthusiasts, and tech innovators.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full glass-red border-red-500/20 group-hover:border-red-500/50 transition-colors">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  </div>
                  <span className="text-zinc-300 text-sm font-medium tracking-wide">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_45px_rgba(220,38,38,0.5)] transition-all hover:scale-105 duration-300"
              >
                <a href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" target="_blank" rel="noopener noreferrer">
                  Join Community Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 px-10 rounded-full border-white/10 glass hover:bg-white/10 hover:border-white/20 text-white font-bold transition-all duration-300"
              >
                <a href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W" target="_blank" rel="noopener noreferrer">
                  WhatsApp Group
                </a>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Showcase Side */}
          <div className="relative reveal-right delay-200">
            {/* Decorative Orbs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-600/20 blur-3xl animate-pulse" />

            <Card className="relative overflow-hidden rounded-[40px] border-white/10 bg-[#0a0a0a] p-8 sm:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.6)] group">
              {/* Internal Gradients */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 opacity-50" />
              <div className="absolute -inset-px bg-gradient-to-br from-red-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-black text-white tracking-tight">CrelyneX</h3>
                    <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">Community Access</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl glass-red flex items-center justify-center text-3xl">𝞓</div>
                </div>

                {/* Highlight Boxes */}
                <div className="space-y-4">
                  {[
                    { icon: "👥", title: "Active Daily", sub: "Real-time discussions", color: "bg-red-500/10 text-red-500" },
                    { icon: "🚀", title: "Opportunities", sub: "Project collaborations", color: "bg-purple-500/10 text-purple-500" },
                    { icon: "📚", title: "Resources", sub: "Premium materials", color: "bg-emerald-500/10 text-emerald-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-5 rounded-3xl glass border-white/5 hover:border-white/10 transition-all group/item">
                      <div className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-base font-bold text-white mb-0.5">{item.title}</div>
                        <div className="text-sm text-zinc-500">{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-6">
                  <Button className="w-full h-14 rounded-full bg-white text-black hover:bg-zinc-200 font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
                    Scan QR to Join
                  </Button>
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
                      In Association with <span className="text-red-500/80">HSS</span> & <span className="text-emerald-500/80">ZenEra</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-red-600/10 to-transparent rounded-bl-[120px] transition-all group-hover:scale-110" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
