"use client";

import { useState } from "react";

const services = [
  {
    id: 1,
    icon: "📡",
    title: "IoT Project Consultancy",
    description: "Expert guidance on Internet of Things architecture, embedded systems design, and real-world implementation strategies for smart devices.",
    tag: "IoT",
    gradient: "from-red-600/20 to-red-900/5",
    glow: "rgba(220,38,38,0.25)",
    border: "rgba(220,38,38,0.2)",
  },
  {
    id: 2,
    icon: "💻",
    title: "Web & App Development",
    description: "Full-stack web and mobile application development using cutting-edge frameworks, scalable backends, and beautiful interfaces.",
    tag: "Dev",
    gradient: "from-violet-600/15 to-purple-900/5",
    glow: "rgba(124,58,237,0.2)",
    border: "rgba(124,58,237,0.2)",
  },
  {
    id: 3,
    icon: "🎯",
    title: "Event Updates",
    description: "Stay connected with live community events, workshops, hackathons, and tech talks that fuel your growth.",
    tag: "Events",
    gradient: "from-amber-600/15 to-orange-900/5",
    glow: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    id: 4,
    icon: "🎓",
    title: "Paid Online Courses",
    description: "Comprehensive, instructor-led programs covering IoT, cloud computing, full-stack dev, and emerging technologies with certification.",
    tag: "Learn",
    gradient: "from-emerald-600/15 to-teal-900/5",
    glow: "rgba(16,185,129,0.2)",
    border: "rgba(16,185,129,0.2)",
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="services" className="relative px-4 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-red-950/10 blur-[150px] rounded-full" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple-950/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 sm:mb-20 text-center reveal">
          <div className="inline-flex items-center gap-2 glass-red rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-red-400 uppercase mb-6">
            <span className="w-1 h-1 rounded-full bg-red-500" /> What we offer
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-gradient-crimson">Services</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to accelerate your tech journey
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`reveal delay-${(i + 1) * 100}`}
            >
              <div
                className="group relative overflow-hidden rounded-3xl border p-7 sm:p-8 cursor-pointer transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.gradient.replace("from-", "").replace("to-", "").split(" ").join(", ")})`,
                  borderColor: hoveredId === service.id ? service.border : "rgba(255,255,255,0.06)",
                  boxShadow: hoveredId === service.id ? `0 0 40px ${service.glow}, 0 8px 32px rgba(0,0,0,0.3)` : "0 4px 24px rgba(0,0,0,0.2)",
                  transform: hoveredId === service.id ? "translateY(-4px)" : "translateY(0)",
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                      {service.icon}
                    </div>
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  {/* Animated underline */}
                  <div className="flex items-center gap-3 pt-2">
                    <div
                      className="h-px bg-gradient-to-r from-red-500 to-transparent transition-all duration-500"
                      style={{ width: hoveredId === service.id ? "60px" : "20px" }}
                    />
                    <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase group-hover:text-zinc-300 transition-colors">
                      Learn more →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
