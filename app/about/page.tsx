"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Zap } from "lucide-react";

const team = [
  {
    name: "Founder & Lead",
    role: "Vision & Direction",
    bio: "Passionate about IoT and innovation",
    icon: "👨‍💼",
  },
  {
    name: "Technical Lead",
    role: "Development & Architecture",
    bio: "Expert in full-stack development",
    icon: "👨‍💻",
  },
  {
    name: "Community Manager",
    role: "Engagement & Growth",
    bio: "Building the CrelyneX community",
    icon: "👩‍💼",
  },
  {
    name: "Course Instructor",
    role: "Education & Training",
    bio: "Educating the next generation",
    icon: "👨‍🏫",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We believe in pushing boundaries and exploring cutting-edge technologies.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a supportive ecosystem for developers and innovators to thrive.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering high-quality projects and education.",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description:
      "Enabling individuals to learn, grow, and achieve their potential.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                  About{" "}
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    CrelyneX
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  CrelyneX is a community-driven platform dedicated to
                  innovation in IoT, web development, and advanced technologies.
                </p>
              </div>
              <div className="relative mx-auto hidden h-52 w-full max-w-sm md:block [perspective:1200px]">
                <div className="absolute inset-8 rounded-2xl border border-accent/40 bg-accent/10 [transform:rotateX(62deg)_rotateZ(-32deg)]" />
                <div className="absolute inset-0 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-xl backdrop-blur [transform:translate3d(0,0,70px)]">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    About Layer
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    People + Purpose + Product
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="border-b border-border/40 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-3xl font-bold">Our Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    CrelyneX was founded with a mission to bridge the gap
                    between education and industry. We recognized a need for a
                    community where developers, IoT enthusiasts, and innovators
                    could learn, collaborate, and create together.
                  </p>
                  <p>
                    What started as a small group of passionate developers has
                    grown into a vibrant community of over 250+ members. We've
                    hosted numerous events, launched successful projects, and
                    impacted thousands of lives through our education
                    initiatives.
                  </p>
                  <p>
                    Today, CrelyneX stands as a beacon for tech innovation,
                    offering world-class training, consulting services, and a
                    platform for turning ideas into reality.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-lg bg-gradient-to-br from-accent via-primary to-secondary opacity-30 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="border-b border-border/40 py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-3xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="border-border/40 bg-card/50 backdrop-blur"
                  >
                    <CardHeader>
                      <Icon className="mb-4 h-8 w-8 text-accent" />
                      <CardTitle>{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="border-b border-border/40 py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="rounded-lg border border-border/40 bg-card/50 p-8 backdrop-blur text-center">
                <div className="text-4xl font-bold text-accent">1000+</div>
                <div className="mt-2 text-muted-foreground">
                  Community Members
                </div>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-8 backdrop-blur text-center">
                <div className="text-4xl font-bold text-secondary">50+</div>
                <div className="mt-2 text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-8 backdrop-blur text-center">
                <div className="text-4xl font-bold text-primary">30+</div>
                <div className="mt-2 text-muted-foreground">Events Hosted</div>
              </div>
              <div className="rounded-lg border border-border/40 bg-card/50 p-8 backdrop-blur text-center">
                <div className="text-4xl font-bold text-accent">5000+</div>
                <div className="mt-2 text-muted-foreground">
                  Students Trained
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-3xl font-bold">Our Team</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="border-border/40 bg-card/50 backdrop-blur text-center"
                >
                  <CardHeader>
                    <div className="mb-4 text-4xl">{member.icon}</div>
                    <CardTitle>{member.name}</CardTitle>
                    <Badge className="mt-2 mx-auto w-fit bg-accent/20 text-accent hover:bg-accent/30">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{member.bio}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
