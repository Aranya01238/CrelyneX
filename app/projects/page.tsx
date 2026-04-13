import type { Metadata } from "next";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | CrelyneX",
  description:
    "Explore CrelyneX projects across IoT, AI, web, and mobile development.",
};

const projects = [
  {
    title: "Smart Home IoT Hub",
    description:
      "A comprehensive IoT platform for managing smart home devices with real-time monitoring and automation.",
    technologies: ["Node.js", "React", "MQTT", "PostgreSQL"],
    status: "Completed",
    link: "#",
    category: "IoT",
  },
  {
    title: "AI-Powered Chatbot System",
    description:
      "Advanced conversational AI system for enterprise customer support with natural language processing.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    status: "In Development",
    link: "#",
    category: "AI/ML",
  },
  {
    title: "Industrial Sensor Dashboard",
    description:
      "Real-time visualization dashboard for industrial IoT sensors with predictive analytics.",
    technologies: ["Next.js", "TypeScript", "WebSocket", "InfluxDB"],
    status: "Completed",
    link: "#",
    category: "IoT",
  },
  {
    title: "Mobile Weather Station",
    description:
      "Mobile application for collecting and analyzing weather data from distributed sensors.",
    technologies: ["React Native", "Firebase", "Arduino", "Node.js"],
    status: "Completed",
    link: "#",
    category: "Mobile",
  },
  {
    title: "Web Analytics Platform",
    description:
      "Full-stack analytics platform for tracking user behavior and generating actionable insights.",
    technologies: ["Next.js", "D3.js", "Python", "PostgreSQL"],
    status: "In Development",
    link: "#",
    category: "Web",
  },
  {
    title: "Drone Management System",
    description:
      "Enterprise solution for managing and monitoring autonomous drone fleets.",
    technologies: ["React", "Node.js", "Docker", "Redis"],
    status: "Completed",
    link: "#",
    category: "IoT",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 sm:py-20">
          <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-secondary/10 to-accent/10" />
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="max-w-2xl">
                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Our{" "}
                  <span className="bg-linear-to-r from-accent to-secondary bg-clip-text text-transparent">
                    Projects
                  </span>
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Explore the innovative solutions we've built for IoT, web,
                  mobile, and AI technologies. Each project showcases our
                  expertise in cutting-edge development.
                </p>
              </div>
              <div className="relative mx-auto hidden h-52 w-full max-w-sm perspective-distant md:block">
                <div className="absolute inset-8 rounded-2xl border border-secondary/40 bg-secondary/10 transform-[rotateX(58deg)_rotateZ(-28deg)]" />
                <div className="absolute inset-0 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-xl backdrop-blur transform-[translate3d(0,0,80px)]">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Project Matrix
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    IoT, AI, Web, Mobile
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            {/* Filter Tags */}
            <div className="mb-12 flex flex-wrap gap-2">
              <Badge
                variant="default"
                className="bg-accent/20 text-accent hover:bg-accent/30"
              >
                All Projects
              </Badge>
              <Badge variant="outline">IoT</Badge>
              <Badge variant="outline">Web</Badge>
              <Badge variant="outline">Mobile</Badge>
              <Badge variant="outline">AI/ML</Badge>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="border-border/40 bg-card/50 backdrop-blur transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
                >
                  <CardHeader>
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {project.title}
                        </CardTitle>
                        <Badge className="mt-2 bg-primary/20 text-primary hover:bg-primary/30">
                          {project.category}
                        </Badge>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          project.status === "Completed"
                            ? "border-accent/50 text-accent"
                            : "border-secondary/50 text-secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-muted/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 pt-4 sm:flex-row">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex-1"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="w-full flex-1 bg-accent hover:bg-accent/90"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </div>
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
