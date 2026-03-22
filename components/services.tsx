"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "IoT Project Consultancy",
    description:
      "Expert guidance on Internet of Things projects, architecture design, and implementation strategies.",
    icon: "📡",
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    accentColor: "text-primary",
  },
  {
    id: 2,
    title: "Web & App Development",
    description:
      "Full-stack web and mobile application development using cutting-edge technologies and frameworks.",
    icon: "💻",
    gradient: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    accentColor: "text-accent",
  },
  {
    id: 3,
    title: "Event Updates",
    description:
      "Stay connected with our community events, workshops, hackathons, and tech talks.",
    icon: "🎯",
    gradient: "from-primary/20 to-accent/5",
    borderColor: "border-primary/30",
    accentColor: "text-primary",
  },
  {
    id: 4,
    title: "Paid Online Courses",
    description:
      "Comprehensive learning programs covering IoT, development, cloud computing, and emerging technologies.",
    icon: "🎓",
    gradient: "from-secondary/20 to-secondary/5",
    borderColor: "border-secondary/30",
    accentColor: "text-secondary",
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-transparent px-4 py-16 sm:py-20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to accelerate your tech journey
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`group relative cursor-pointer overflow-hidden p-6 transition-all duration-300 sm:p-8 ${
                hoveredId === service.id
                  ? "shadow-2xl md:scale-[1.02]"
                  : "hover:shadow-lg"
              } bg-linear-to-br ${service.gradient} border ${service.borderColor}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Animated background glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                  hoveredId === service.id
                    ? `bg-linear-to-br ${service.gradient}`
                    : ""
                }`}
              />

              {/* Content */}
              <div className="relative z-10 space-y-4">
                <div
                  className={`text-4xl sm:text-5xl ${service.accentColor} transition-transform duration-300 group-hover:scale-110`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Animated border accent */}
                <div
                  className={`h-1 w-0 bg-linear-to-r ${service.accentColor === "text-accent" ? "from-accent to-secondary" : "from-primary to-accent"} group-hover:w-16 transition-all duration-300 mt-4`}
                />

                <button
                  className={`inline-flex items-center gap-1 text-sm font-semibold ${service.accentColor} transition-all hover:gap-2`}
                >
                  Learn more
                  <span>→</span>
                </button>
              </div>

              {/* Corner accent */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 ${service.borderColor} rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
